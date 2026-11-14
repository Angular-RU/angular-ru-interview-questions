# Angular — вопросы и ответы, часть 4

> Автоматически сгенерировано из src/pages/angular/index.md. Не редактируйте вручную.

### Angular HTTP



#### Вопрос: Как Angular-приложение взаимодействует с backend API?

**Короткий ответ**

Взаимодействие с API

**Полный ответ**

**Взаимодействие с API**

В экосистеме ангуляр существует пакет для общения с сервером (@angular/common/http), которого достаточно для
повседневной разработки. Его интерфейс основан на rxjs потоках, поэтому его легко использовать для работы с потоками
данных в приложении.

Кроме этого, как и в ванильной версии javascript, можно использовать XMLHttpRequest, fetch API, axios(или многие другие
библиотеки), но их использование вместо встроенного клиента, считается неоправданным и всячески возбраняется.

Существуют и другие способы взаимодействия с сервером(см. Веб-сокеты), но для них не существует каноничных встроенных
библиотек, поэтому используются сторонние библиотеки или собственные реалиации. Хорошей практикой здесь будет привести
интерфейс построенный на промисах и обратных вызовах(callback) к интерфейсу основанному на rxjs потоках, для
естественного использования в экосистеме Angular.

**Proxy**

Чтобы тестировать взаимодействие приложения с сервером, который должен находиться на том же домене, используется
<a href="https://angular.io/guide/build#proxying-to-a-backend-server"> функциональность в Angular CLI</a> для этого
нужно создать файл с конфигурацией прокси, где будут указаны:

- Контекст для проксирования
- Ссылка на работающий экземпляр API
- secure: false для работы в тестовой среде без сертификатов

Также большинство серверов не настроены для работы с разными
доменами(<a href="https://developer.mozilla.org/ru/docs/Web/HTTP/CORS">CORS</a>), поэтому для корректной работы на API
сервере, необходимо явно указать с какого домена(ов) можно принимать запросы.





#### Вопрос: Как проектировать API layer и типизировать backend contracts?

**Короткий ответ**

Data-access слой инкапсулирует endpoints, DTO, mapping и transport errors:

**Полный ответ**

Data-access слой инкапсулирует endpoints, DTO, mapping и transport errors:

```ts
export class UsersApi {
  private readonly http = inject(HttpClient);

  getById(id: string): Observable<User> {
    return this.http.get<UserDto>(`/api/users/${id}`).pipe(map(mapUserDto));
  }
}
```

Generic в `HttpClient` — compile-time ожидание, а не runtime-валидация. Для внешних данных используют schema validation.
OpenAPI может генерировать DTO/client, но generated layer обычно оборачивают доменным API.





#### Вопрос: Как моделировать loading, error и data state HTTP-запроса?

**Короткий ответ**

Состояния должны быть взаимоисключающими:

**Полный ответ**

Состояния должны быть взаимоисключающими:

```ts
type RemoteData<T> =
  {status: 'idle'} | {status: 'loading'} | {status: 'success'; data: T} | {status: 'error'; error: string};
```

Для signal-first чтения подходят `resource()`/`httpResource()`. Для RxJS — stream состояния через `switchMap`, `map`,
`catchError` и `startWith`. Не стоит хранить независимые `isLoading`, `data`, `error`, если они допускают противоречивые
комбинации.





#### Вопрос: Что такое HTTP Interceptors?

**Короткий ответ**

Interceptor — middleware для общих правил HTTP: auth headers, logging, timeout, retry, caching и индикаторы загрузки.

**Полный ответ**

Interceptor — middleware для общих правил HTTP: auth headers, logging, timeout, retry, caching и индикаторы загрузки.

В Angular 19–22 рекомендуются функциональные interceptors: их порядок предсказуем и они могут использовать `inject()`.

```ts
export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = inject(AuthService).accessToken();
  const isApiRequest = request.url.startsWith(environment.apiUrl);

  if (token === null || !isApiRequest) {
    return next(request);
  }

  return next(
    request.clone({
      setHeaders: {Authorization: `Bearer ${token}`},
    }),
  );
};

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withInterceptors([authInterceptor, errorInterceptor]))],
};
```

Request и response immutable, поэтому запрос изменяют через `clone()`. Interceptors выполняются цепочкой в порядке
регистрации.

DI-based `HttpInterceptor` и `HTTP_INTERCEPTORS` остаются поддерживаемыми для legacy-кода, но для нового кода Angular
рекомендует functional interceptors.





#### Вопрос: Как делать retry и отмену HTTP-запросов?

**Короткий ответ**

HttpClient отменяет запрос при unsubscribe. Поэтому switchMap подходит поиску и route-driven loading.

**Полный ответ**

`HttpClient` отменяет запрос при unsubscribe. Поэтому `switchMap` подходит поиску и route-driven loading.

Retry применяют только для временных и безопасных ошибок:

```ts
request$.pipe(
  retry({
    count: 2,
    delay: (_error, retryCount) => timer(retryCount * 500),
  }),
);
```

Нельзя бездумно повторять mutations и ошибки `4xx`. Нужны ограничение попыток, backoff и понятное состояние UI.





#### Вопрос: Как мокать HTTP в Angular-тестах?

**Короткий ответ**

Тест проверяет method, URL, body, headers, mapping и error handling. Для development mocks используют отдельный mock
server, service worker mocking или proxy, не production interceptor.

**Полный ответ**

```ts
TestBed.configureTestingModule({
  providers: [provideHttpClient(), provideHttpClientTesting()],
});

const httpTesting = TestBed.inject(HttpTestingController);

service.getUser('42').subscribe((user) => expect(user.id).toBe('42'));

const request = httpTesting.expectOne('/api/users/42');
request.flush({id: '42', name: 'Ada'});
httpTesting.verify();
```

Тест проверяет method, URL, body, headers, mapping и error handling. Для development mocks используют отдельный mock
server, service worker mocking или proxy, не production interceptor.





#### Вопрос: Что такое авторизация через токены?

**Короткий ответ**

После аутентификации сервер выдает credential, например access token. Клиент прикладывает его к запросам, а сервер
проверяет подпись, срок действия и права.

**Полный ответ**

После аутентификации сервер выдает credential, например access token. Клиент прикладывает его к запросам, а сервер
проверяет подпись, срок действия и права.

Access token обычно живет недолго. Refresh token позволяет получить новый access token и требует более строгой защиты и
ротации.





#### Вопрос: Что такое Authorization header?

**Короткий ответ**

Header передает credentials или token по выбранной схеме. Пример: Authorization: Bearer . Его отправляют только по HTTPS
доверенному origin и не выводят в логи.

**Полный ответ**

Header передает credentials или token по выбранной схеме. Пример: `Authorization: Bearer <token>`. Его отправляют только
по HTTPS доверенному origin и не выводят в логи.





#### Вопрос: Что такое Bearer token?

**Короткий ответ**

Это token, право использования которого получает любой владелец значения. Он не доказывает владение отдельным ключом,
поэтому утечка дает доступ до истечения или отзыва. Scope и срок жизни должны быть минимальными.

**Полный ответ**

Это token, право использования которого получает любой владелец значения. Он не доказывает владение отдельным ключом,
поэтому утечка дает доступ до истечения или отзыва. Scope и срок жизни должны быть минимальными.





#### Вопрос: Что такое cookie?

**Короткий ответ**

Cookie — небольшая пара name/value, которую browser хранит для domain/path и автоматически отправляет подходящим
requests. Флаги HttpOnly, Secure и SameSite снижают часть рисков. Cookies имеют ограничения размера и требуют
продуманной CSRF-защиты.

**Полный ответ**

Cookie — небольшая пара name/value, которую browser хранит для domain/path и автоматически отправляет подходящим
requests. Флаги `HttpOnly`, `Secure` и `SameSite` снижают часть рисков. Cookies имеют ограничения размера и требуют
продуманной CSRF-защиты.





#### Вопрос: Чем cookie отличается от localStorage?

**Короткий ответ**

Cookie автоматически участвует в HTTP и может быть HttpOnly; localStorage доступен JavaScript и не отправляется
автоматически. Оба механизма привязаны к origin/domain rules. Секретный token в localStorage уязвим при XSS.

**Полный ответ**

Cookie автоматически участвует в HTTP и может быть `HttpOnly`; `localStorage` доступен JavaScript и не отправляется
автоматически. Оба механизма привязаны к origin/domain rules. Секретный token в localStorage уязвим при XSS.





#### Вопрос: Где хранить access token и refresh token?

**Короткий ответ**

Универсального ответа нет. Частый browser-подход:

**Полный ответ**

Универсального ответа нет. Частый browser-подход:

- access token хранится в памяти приложения;
- refresh token находится в `HttpOnly`, `Secure`, `SameSite` cookie и недоступен JavaScript.

`localStorage` переживает перезагрузку, но доступен при XSS. Cookie автоматически отправляется браузером, поэтому
требует корректной CSRF-защиты. Решение зависит от backend, доменов и threat model.





#### Вопрос: Как реализовать refresh token без бесконечного цикла?

**Короткий ответ**

Auth interceptor:

**Полный ответ**

Auth interceptor:

1. Не перехватывает login/refresh endpoints.
2. На `401` запускает только один общий refresh request.
3. Остальные запросы ждут его результат.
4. После успеха повторяются один раз с новым token.
5. При ошибке refresh очищается session и выполняется logout.

Нужно различать истекший token и отсутствие permissions. Счетчик/контекст запроса предотвращает повторный refresh loop.





#### Вопрос: Что такое preflight request?

**Короткий ответ**

Browser отправляет OPTIONS перед некоторыми cross-origin requests, чтобы проверить разрешенные method и headers. Server
отвечает CORS headers. Preflight может кешироваться, но неправильная конфигурация блокирует основной запрос.

**Полный ответ**

Browser отправляет `OPTIONS` перед некоторыми cross-origin requests, чтобы проверить разрешенные method и headers.
Server отвечает CORS headers. Preflight может кешироваться, но неправильная конфигурация блокирует основной запрос.





#### Вопрос: Почему CORS preflight может стать performance-проблемой?

**Короткий ответ**

Preflight - дополнительный OPTIONS запрос перед небезопасным cross-origin запросом. Он появляется из-за некоторых
methods, headers или content types. На плохой сети лишний round trip заметен, особенно для частых API-вызовов.

**Полный ответ**

Preflight - дополнительный `OPTIONS` запрос перед небезопасным cross-origin запросом. Он появляется из-за некоторых
methods, headers или content types. На плохой сети лишний round trip заметен, особенно для частых API-вызовов.

Решения: корректно кешировать preflight через `Access-Control-Max-Age`, избегать лишних custom headers, держать API на
том же origin через reverse proxy или проектировать batching. Нельзя "лечить" это отключением browser security.

```http
Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Methods: GET, POST
Access-Control-Max-Age: 600
```





#### Вопрос: Что делает X-Frame-Options?

**Короткий ответ**

X-Frame-Options запрещает или ограничивает встраивание страницы во frame, защищая от clickjacking. Современная
альтернатива — CSP directive frame-ancestors, она гибче и позволяет точнее задать разрешенные origins. Для Angular SPA
header обычно настраивают на уровне web server или CDN.

**Полный ответ**

`X-Frame-Options` запрещает или ограничивает встраивание страницы во frame, защищая от clickjacking. Современная
альтернатива — CSP directive `frame-ancestors`, она гибче и позволяет точнее задать разрешенные origins. Для Angular SPA
header обычно настраивают на уровне web server или CDN.





#### Вопрос: Что такое CDN и зачем он нужен?

**Короткий ответ**

CDN хранит копии статических или кешируемых ресурсов ближе к пользователям и снижает latency, нагрузку на origin и риск
перегрузки. Для Angular deployment CDN особенно полезен для content-hashed assets, HTML delivery, security headers,
invalidation и rollback. Важно понимать, какие responses кешируются browser cache, а какие CDN cache.

**Полный ответ**

CDN хранит копии статических или кешируемых ресурсов ближе к пользователям и снижает latency, нагрузку на origin и риск
перегрузки. Для Angular deployment CDN особенно полезен для content-hashed assets, HTML delivery, security headers,
invalidation и rollback. Важно понимать, какие responses кешируются browser cache, а какие CDN cache.



### Angular Router



#### Вопрос: Что такое роутинг и как его создать в Angular?

**Короткий ответ**

Angular Router связывает URL с деревом активированных routes и компонентов. Современная standalone-конфигурация:

**Полный ответ**

Angular Router связывает URL с деревом активированных routes и компонентов. Современная standalone-конфигурация:

```ts
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadComponent: async () => (await import('./home/home.component')).HomeComponent,
  },
  {
    path: 'admin',
    canMatch: [adminGuard],
    providers: [AdminStore],
    loadChildren: async () => (await import('./admin/admin.routes')).ADMIN_ROUTES,
  },
  {path: '**', component: NotFoundComponent},
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withComponentInputBinding(), withPreloading(PreloadAllModules))],
};
```

В шаблоне используют `RouterLink`, `RouterLinkActive` и `<router-outlet />`. Для программного перехода —
`Router.navigate()` или `navigateByUrl()`.

`RouterModule.forRoot()` и `forChild()` остаются поддерживаемыми для NgModule-приложений.





#### Вопрос: Что такое RouterOutlet?

**Короткий ответ**

RouterOutlet - placeholder в template, куда Angular Router вставляет component активного route.

**Полный ответ**

`RouterOutlet` - placeholder в template, куда Angular Router вставляет component активного route.

```html
<header>...</header>
<router-outlet />
```

У приложения может быть один основной outlet и named outlets для вспомогательных областей интерфейса. Важно не путать
`RouterOutlet` с lazy loading: outlet отвечает за место отображения, а lazy route - за момент загрузки route code.





#### Вопрос: Чем RouterLink, navigate() и navigateByUrl() отличаются?

**Короткий ответ**

Для обычной ссылки используют , сохраняя browser semantics. Programmatic navigation нужна после command: submit, login,
wizard step.

**Полный ответ**

- `RouterLink` — декларативная доступная навигация в шаблоне.
- `navigate(commands, extras)` строит URL из command segments относительно route.
- `navigateByUrl(url, extras)` принимает готовый URL или `UrlTree`.

Для обычной ссылки используют `<a routerLink>`, сохраняя browser semantics. Programmatic navigation нужна после command:
submit, login, wizard step.





#### Вопрос: Чем ActivatedRoute отличается от RouterState?

**Короткий ответ**

ActivatedRoute описывает конкретный активированный route segment рядом с компонентом: params, query params, data,
fragment, parent/children. Его используют внутри route component.

**Полный ответ**

`ActivatedRoute` описывает конкретный активированный route segment рядом с компонентом: params, query params, data,
fragment, parent/children. Его используют внутри route component.

`RouterState` описывает все дерево активных routes. Он нужен, когда важно видеть контекст навигации целиком: guards,
analytics, breadcrumbs, debug tooling или инфраструктурный routing code.

В компоненте обычно достаточно `ActivatedRoute`. Если приходится часто обходить весь `RouterState`, стоит проверить, не
смешана ли навигационная инфраструктура с feature UI.





#### Вопрос: Чем route params, query params и data отличаются?

**Короткий ответ**

snapshot подходит, если component instance гарантированно создается заново. При reuse одного компонента для другого
param значения подписываются на paramMap/queryParamMap или преобразуют их в signals.

**Полный ответ**

- Path params идентифицируют ресурс: `/users/:id`.
- Query params описывают фильтр, сортировку и pagination.
- Static `data` хранит route metadata.
- Resolver data загружается перед активацией.

`snapshot` подходит, если component instance гарантированно создается заново. При reuse одного компонента для другого
param значения подписываются на `paramMap`/`queryParamMap` или преобразуют их в signals.





#### Вопрос: Что такое nested, auxiliary routes и RouteReuseStrategy?

**Короткий ответ**

Nested routes отображаются во вложенных и наследуют часть route tree.

**Полный ответ**

Nested routes отображаются во вложенных `<router-outlet>` и наследуют часть route tree.

Auxiliary routes используют named outlets для независимых UI-областей, например persistent chat или side panel.

`RouteReuseStrategy` может detach и повторно attach route subtree, сохраняя component state. Это мощный, но сложный API:
нужно контролировать memory, invalidation и lifecycle. Часто состояние фильтра проще хранить в URL или feature store.





#### Вопрос: Каков жизненный цикл у Angular Router?

**Короткий ответ**

Основные этапы успешной навигации:

**Полный ответ**

Основные этапы успешной навигации:

1. `NavigationStart` — начало перехода.
2. `RoutesRecognized` — распознавание URL и redirects.
3. `GuardsCheckStart` / `GuardsCheckEnd` — выполнение guards.
4. `ResolveStart` / `ResolveEnd` — загрузка обязательных route data.
5. `ActivationStart` / `ActivationEnd` — активация компонентов в outlets.
6. `NavigationEnd` — успешное завершение.

Навигация также может завершиться событиями `NavigationCancel`, `NavigationSkipped` или `NavigationError`.

Современные guards и resolvers являются функциями:

```ts
export const authGuard: CanActivateFn = (_route, state) => {
  const auth = inject(AuthService);

  return auth.isAuthorized()
    ? true
    : inject(Router).createUrlTree(['/login'], {
        queryParams: {returnUrl: state.url},
      });
};

export const usersResolver: ResolveFn<ReadonlyArray<User>> = () => inject(UserApi).getUsers();
```

Guard должен вернуть `boolean`, `UrlTree`, `RedirectCommand`, Promise или Observable. Для redirect не нужно вызывать
`navigate()` внутри guard. Вместо старого `canLoad` используют `canMatch`.





#### Вопрос: Что такое preloading strategy?

**Короткий ответ**

Preloading загружает lazy chunks после initial navigation, чтобы будущий переход был быстрее.

**Полный ответ**

Preloading загружает lazy chunks после initial navigation, чтобы будущий переход был быстрее.

- `NoPreloading` ничего не загружает заранее.
- `PreloadAllModules` загружает все lazy routes.
- Custom `PreloadingStrategy` учитывает route data, сеть, permissions и вероятность перехода.

Preloading не активирует route и не должен бесконтрольно загружать тяжелые admin features мобильному пользователю.





#### Вопрос: Когда resolver лучше загрузки внутри компонента?

**Короткий ответ**

Resolver полезен, если route нельзя корректно показать без критических данных или redirect должен произойти до
активации.

**Полный ответ**

Resolver полезен, если route нельзя корректно показать без критических данных или redirect должен произойти до
активации.

Загрузка внутри компонента лучше, когда:

- данные необязательны;
- можно сразу показать shell/skeleton;
- запрос медленный;
- нужна независимая повторная загрузка.

Ошибку resolver обрабатывают локально через `catchError` с `RedirectCommand` или глобально через
`withNavigationErrorHandler()`.





#### Вопрос: Как тестировать Angular Router?

**Короткий ответ**

Для integration-теста используют RouterTestingHarness:

**Полный ответ**

Для integration-теста используют `RouterTestingHarness`:

```ts
TestBed.configureTestingModule({
  providers: [provideRouter(routes)],
});

const harness = await RouterTestingHarness.create();
await harness.navigateByUrl('/users/42', UserPage);

expect(harness.routeNativeElement?.textContent).toContain('Ada');
```

Отдельно тестируют functional guards/resolvers как функции в injection context. Проверяют URL, redirect, route inputs и
пользовательский результат, а не внутренние Router calls.



### Login, logout и guards



#### Вопрос: В чем разница между Routing и Navigation?

**Короткий ответ**

Routing — конфигурация соответствия URL и состояния приложения: routes, параметры, guards, resolvers, outlets, redirects
и lazy-loading.

**Полный ответ**

**Routing** — конфигурация соответствия URL и состояния приложения: routes, параметры, guards, resolvers, outlets,
redirects и lazy-loading.

**Navigation** — конкретный процесс перехода из текущего URL/route state в новый. Он может начаться через `RouterLink`,
`router.navigate()`, кнопки браузера или изменение адреса.

Во время navigation Router распознает URL, выполняет redirects, guards и resolvers, активирует или переиспользует
компоненты, обновляет URL и публикует события. Навигация может завершиться успешно, быть отменена, пропущена или
завершиться ошибкой.





#### Вопрос: Что такое ленивая загрузка (Lazy-loading) и для чего она используется?

**Короткий ответ**

Lazy-loading откладывает загрузку кода feature до момента, когда пользователь переходит на соответствующий route. Это
уменьшает initial bundle и ускоряет первую загрузку.

**Полный ответ**

Lazy-loading откладывает загрузку кода feature до момента, когда пользователь переходит на соответствующий route. Это
уменьшает initial bundle и ускоряет первую загрузку.

```ts
export const routes: Routes = [
  {
    path: 'orders',
    loadComponent: async () => (await import('./orders/orders.component')).OrdersComponent,
  },
  {
    path: 'admin',
    loadChildren: async () => (await import('./admin/admin.routes')).ADMIN_ROUTES,
  },
];
```

`loadComponent` загружает standalone-компонент, `loadChildren` — дочернюю конфигурацию routes или legacy-модуль.

Lazy-loading не означает, что каждый маленький компонент нужно выделить в отдельный chunk. Границы выбирают по
пользовательским сценариям и feature. Для вероятных следующих переходов можно настроить preloading.





#### Вопрос: Как загрузить данные до того как активируется роут?

**Короткий ответ**

Для этого используется resolver. Современный вариант — функция ResolveFn.

**Полный ответ**

Для этого используется resolver. Современный вариант — функция `ResolveFn`.

```ts
export const userResolver: ResolveFn<User> = (route) => {
  const userId = route.paramMap.get('id');

  if (userId === null) {
    return inject(Router).parseUrl('/users');
  }

  return inject(UsersApi).getById(userId);
};

export const routes: Routes = [
  {
    path: 'users/:id',
    component: UserPageComponent,
    resolve: {user: userResolver},
  },
];
```

Router дождется значения или завершения Observable/Promise перед активацией route. Данные доступны через
`ActivatedRoute.data` или component input binding при соответствующей настройке Router.

Resolver подходит, когда экран нельзя корректно показать без данных. Для необязательных или медленных данных лучше
активировать страницу сразу и показать loading/skeleton, чтобы навигация не казалась зависшей.





#### Вопрос: Как в Angular организовать login/logout и router guard для защищенных страниц?

**Короткий ответ**

В Angular frontend обычно не "логинит пользователя сам", а вызывает backend или Identity Provider и хранит только
клиентское состояние сессии: кто пользователь, идет ли проверка сессии, можно ли открыть protected route.

**Полный ответ**

В Angular frontend обычно не "логинит пользователя сам", а вызывает backend или Identity Provider и хранит только
клиентское состояние сессии: кто пользователь, идет ли проверка сессии, можно ли открыть protected route.

Базовая схема:

1. `AuthService` инкапсулирует login, logout, session state и запрос текущего пользователя.
2. `HttpClient` отправляет запросы на backend auth endpoints.
3. `CanActivateFn` guard не пускает на protected routes, если пользователь не авторизован.
4. При logout frontend очищает локальное состояние и отправляет пользователя на login/public route.
5. Backend все равно обязан проверять session/token и права на каждом защищенном endpoint.

Упрощенный пример `AuthService`:

```ts
import {HttpClient} from '@angular/common/http';
import {inject, Injectable, signal} from '@angular/core';
import {Router} from '@angular/router';
import {catchError, Observable, of, tap} from 'rxjs';

interface LoginDto {
  readonly email: string;
  readonly password: string;
}

interface User {
  readonly id: string;
  readonly email: string;
  readonly roles: readonly string[];
}

@Injectable({providedIn: 'root'})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly userState = signal<User | null>(null);
  readonly user = this.userState.asReadonly();

  readonly isAuthenticated = () => this.userState() !== null;

  login(dto: LoginDto): Observable<User> {
    return this.http.post<User>('/api/auth/login', dto).pipe(tap((user) => this.userState.set(user)));
  }

  loadCurrentUser(): Observable<User | null> {
    return this.http.get<User>('/api/auth/me').pipe(
      tap((user) => this.userState.set(user)),
      catchError(() => {
        this.userState.set(null);
        return of(null);
      }),
    );
  }

  logout(): void {
    this.http
      .post('/api/auth/logout', {})
      .pipe(catchError(() => of(null)))
      .subscribe(() => {
        this.userState.set(null);
        void this.router.navigate(['/login']);
      });
  }
}
```

Пример login component:

```ts
import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-login-page',
  template: `
    <form (ngSubmit)="submit()">
      <input
        name="email"
        type="email"
        autocomplete="email"
      />
      <input
        name="password"
        type="password"
        autocomplete="current-password"
      />
      <button
        type="submit"
        [disabled]="isLoading()"
      >
        Login
      </button>
    </form>
  `,
})
export class LoginPageComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly isLoading = signal(false);

  submit(): void {
    this.isLoading.set(true);

    this.auth.login({email: 'demo@example.com', password: 'password'}).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/';
        void this.router.navigateByUrl(returnUrl);
      },
      error: () => this.isLoading.set(false),
    });
  }
}
```

Пример functional guard:

```ts
import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {map} from 'rxjs';
import {AuthService} from './auth.service';

export const authGuard: CanActivateFn = (_route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthenticated()) {
    return true;
  }

  return auth.loadCurrentUser().pipe(
    map((user) => {
      if (user) {
        return true;
      }

      return router.createUrlTree(['/login'], {
        queryParams: {returnUrl: state.url},
      });
    }),
  );
};
```

Пример routes:

```ts
import {Routes} from '@angular/router';
import {authGuard} from './auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login-page.component').then((m) => m.LoginPageComponent),
  },
  {
    path: 'account',
    canActivate: [authGuard],
    loadComponent: () => import('./account-page.component').then((m) => m.AccountPageComponent),
  },
];
```

Кнопка logout:

```ts
import {Component, inject} from '@angular/core';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-header',
  template: `
    <button
      type="button"
      (click)="logout()"
    >
      Logout
    </button>
  `,
})
export class HeaderComponent {
  private readonly auth = inject(AuthService);

  logout(): void {
    this.auth.logout();
  }
}
```

Что важно сказать на собеседовании:

- guard защищает route только на frontend и нужен в первую очередь для UX;
- backend должен проверять сессию/token на каждом защищенном API-запросе;
- при logout нужно очистить frontend state и попросить backend инвалидировать session/refresh token;
- если используется cookie-based session, logout обычно очищает `HttpOnly` cookie через `Set-Cookie` с истекшим сроком;
- если используется OIDC/SSO, logout может требовать redirect на Identity Provider logout endpoint;
- после logout нельзя оставлять приватные данные в singleton services, caches, stores и component state;
- `returnUrl` нужно валидировать, чтобы не сделать open redirect на внешний domain.

Для production лучше не писать весь auth-flow руками, если команда использует OIDC/SSO provider. Обычно берут
проверенную OIDC-библиотеку или backend-for-frontend подход, а Angular-код оставляют тонким слоем над
login/logout/session state.





#### Вопрос: Что такое SSO и как оно обычно работает в frontend-приложении?

**Короткий ответ**

SSO, или Single Sign-On, — подход, при котором пользователь проходит аутентификацию один раз у доверенного Identity
Provider, а затем получает доступ к нескольким приложениям без отдельного логина в каждом из них.

**Полный ответ**

SSO, или Single Sign-On, — подход, при котором пользователь проходит аутентификацию один раз у доверенного Identity
Provider, а затем получает доступ к нескольким приложениям без отдельного логина в каждом из них.

Важно различать термины:

- **authentication** — проверка, кто пользователь;
- **authorization** — проверка, что пользователю разрешено делать;
- **SSO** — пользовательский сценарий единого входа;
- **OAuth 2.0** — протокол выдачи ограниченного доступа к ресурсам;
- **OpenID Connect** — identity layer поверх OAuth 2.0, который добавляет `id_token` и стандартный способ узнать
  личность пользователя;
- **SAML** — XML-based протокол, который часто встречается в enterprise SSO.

Типичный вариант для современного SPA — Authorization Code Flow with PKCE через OpenID Connect:

1. Пользователь открывает приложение.
2. Приложение понимает, что локальной сессии нет, и перенаправляет пользователя на Identity Provider.
3. В redirect передаются `client_id`, `redirect_uri`, `scope`, `state`, `code_challenge` и другие параметры.
4. Пользователь логинится у Identity Provider, например через пароль, MFA или корпоративную учетную запись.
5. Identity Provider возвращает пользователя обратно в приложение с authorization code.
6. Приложение или backend меняет code на tokens.
7. Frontend получает состояние "пользователь вошел" и вызывает API с учетом выбранной session/token architecture.

Упрощенный пример redirect:

```text
https://idp.example.com/authorize?
  response_type=code&
  client_id=spa-client&
  redirect_uri=https://app.example.com/callback&
  scope=openid%20profile%20email&
  state=random-state&
  code_challenge=pkce-code-challenge&
  code_challenge_method=S256
```

Что важно сказать на собеседовании:

- frontend не должен хранить `client_secret`, потому что SPA является public client;
- `state` защищает от подмены/CSRF в login flow;
- PKCE снижает риск перехвата authorization code;
- `id_token` описывает аутентификацию пользователя, а `access_token` предназначен для доступа к API;
- route guards на frontend улучшают UX, но настоящая authorization проверяется на backend;
- tokens нельзя бездумно класть в `localStorage`: при XSS их сможет прочитать вредоносный script;
- в enterprise чаще встречаются интеграции через OIDC или SAML, а конкретные детали зависят от Identity Provider.

Практическая граница ответственности frontend-разработчика: правильно инициировать login/logout flow, обработать
callback, не хранить секреты в bundle, аккуратно работать с tokens/session state, закрывать routes для UX и понимать,
что backend обязан повторно проверять authentication, authorization, audience, issuer, expiry и scopes.



### Feature toggles в Angular



#### Вопрос: Как использовать feature toggle в Angular?

**Короткий ответ**

Сервис может хранить загруженные флаги в signal и предоставлять узкий API проверки:

**Полный ответ**

Сервис может хранить загруженные флаги в signal и предоставлять узкий API проверки:

```ts
import {Injectable, signal} from '@angular/core';

type FeatureFlag = 'newCheckout';

@Injectable({providedIn: 'root'})
export class FeatureFlagsService {
  private readonly flags = signal<Readonly<Record<FeatureFlag, boolean>>>({
    newCheckout: false,
  });

  public isEnabled(flag: FeatureFlag): boolean {
    return this.flags()[flag];
  }

  public setFlags(flags: Readonly<Record<FeatureFlag, boolean>>): void {
    this.flags.set(flags);
  }
}
```

Для большого набора флагов полезны typed keys, schema validation и явные безопасные defaults.





#### Вопрос: Как использовать feature toggle в Angular-шаблоне?

**Короткий ответ**

Компонент может предоставить вычисляемое состояние:

**Полный ответ**

Компонент может предоставить вычисляемое состояние:

```ts
import {computed, inject} from '@angular/core';

export class CheckoutComponent {
  private readonly featureFlags = inject(FeatureFlagsService);

  protected readonly isNewCheckoutEnabled = computed(() => this.featureFlags.isEnabled('newCheckout'));
}
```

Шаблон отображает новую реализацию или fallback:

```html
@if (isNewCheckoutEnabled()) {
<app-new-checkout />
} @else {
<app-checkout />
}
```

Для повторяющегося UI-условия можно создать directive, но единичную проверку проще оставить явной.





#### Вопрос: Как защитить route через feature toggle?

**Короткий ответ**

Функциональный CanMatchFn не даст Router выбрать route с выключенной фичей:

**Полный ответ**

Функциональный `CanMatchFn` не даст Router выбрать route с выключенной фичей:

```ts
import {inject} from '@angular/core';
import {CanMatchFn} from '@angular/router';

export const newCheckoutGuard: CanMatchFn = () => inject(FeatureFlagsService).isEnabled('newCheckout');
```

Flags config должен быть загружен до первой навигации или guard должен дождаться его асинхронно. Этот guard управляет
навигацией, но не заменяет backend authorization.



### Управление состоянием



#### Вопрос: Что такое управление состоянием приложения?

**Короткий ответ**

Управление состоянием — правила хранения, чтения и изменения данных, от которых зависит UI.

**Полный ответ**

Управление состоянием — правила хранения, чтения и изменения данных, от которых зависит UI.

Состояние бывает:

- локальным состоянием компонента;
- состоянием feature;
- серверным состоянием и кешем;
- глобальным состоянием пользователя, настроек или сессии;
- состоянием URL и форм.

Для локального синхронного состояния подходят `signal()` и `computed()`. Общее состояние можно инкапсулировать в
сервисе. RxJS подходит для сложных асинхронных потоков. NgRx оправдан, когда нужны строгий однонаправленный data flow,
effects, devtools, event history и единые правила большой команды.

Хорошее хранилище имеет узкий readonly API, чистые преобразования, явные loading/error/empty states и не дублирует
данные, которые можно вычислить.





#### Вопрос: Когда достаточно component state?

**Короткий ответ**

Когда состояние принадлежит одному component subtree: open/closed, выбранная вкладка, черновик формы. Оно легко
уничтожается вместе с UI и не создает глобальных зависимостей. При необходимости state можно поднять к ближайшему общему
владельцу.

**Полный ответ**

Когда состояние принадлежит одному component subtree: open/closed, выбранная вкладка, черновик формы. Оно легко
уничтожается вместе с UI и не создает глобальных зависимостей. При необходимости state можно поднять к ближайшему общему
владельцу.





#### Вопрос: Когда достаточно сервиса с signal?

**Короткий ответ**

Для синхронного feature state с несколькими consumers и понятными methods обновления. Сервис владеет writable signals и
наружу отдает readonly state/computed values. Scope provider определяет lifetime.

**Полный ответ**

Для синхронного feature state с несколькими consumers и понятными methods обновления. Сервис владеет writable signals и
наружу отдает readonly state/computed values. Scope provider определяет lifetime.





#### Вопрос: Когда signal в сервисе перестает быть достаточным?

**Короткий ответ**

Сервис с signal хорош, пока state небольшой, ownership понятен, а transitions легко держать в нескольких methods.
Проблемы начинаются, когда появляются:

**Полный ответ**

Сервис с signal хорош, пока state небольшой, ownership понятен, а transitions легко держать в нескольких methods.
Проблемы начинаются, когда появляются:

- много derived values и связанных async commands;
- несколько distant features, которые пишут в одно состояние;
- требования к devtools, audit trail, undo/redo или replay;
- необходимость запретить внешнюю мутацию и формализовать update contract.

В modern Angular можно рассмотреть `@ngrx/signals` `signalStore()` как промежуточный вариант: структура store, computed
state и methods без полного Redux-style boilerplate. Classic NgRx выбирают, когда нужна вся дисциплина actions, reducers
и effects.





#### Вопрос: Когда использовать RxJS store service?

**Короткий ответ**

Когда состояние строится из HTTP, WebSocket, cancellation, debounce и нескольких async streams. RxJS хорошо выражает
время, конкуренцию и backpressure. Следует избегать ручных nested subscriptions и скрытого mutable state.

**Полный ответ**

Когда состояние строится из HTTP, WebSocket, cancellation, debounce и нескольких async streams. RxJS хорошо выражает
время, конкуренцию и backpressure. Следует избегать ручных nested subscriptions и скрытого mutable state.





#### Вопрос: Что такое facade pattern в Angular state management?

**Короткий ответ**

Facade предоставляет компонентам узкий API чтения состояния и выполнения use cases, скрывая store/RxJS/HTTP details. Это
уменьшает связанность UI с выбранной библиотекой. Facade не должна становиться механическим proxy без domain value.

**Полный ответ**

Facade предоставляет компонентам узкий API чтения состояния и выполнения use cases, скрывая store/RxJS/HTTP details. Это
уменьшает связанность UI с выбранной библиотекой. Facade не должна становиться механическим proxy без domain value.





#### Вопрос: Разница между smart и presentational компонентом?

**Короткий ответ**

Smart component координирует use case: читает route, вызывает facade/API, управляет loading/error state и передает
готовые данные вниз. Presentational component получает inputs, отправляет outputs и отвечает за rendering и локальное UI
поведение.

**Полный ответ**

Smart component координирует use case: читает route, вызывает facade/API, управляет loading/error state и передает
готовые данные вниз. Presentational component получает inputs, отправляет outputs и отвечает за rendering и локальное UI
поведение.

```txt
UserPageComponent
  читает route id, вызывает UserFacade
  передает userVm в UserCardComponent

UserCardComponent
  показывает userVm
  сообщает наружу о click/edit/delete
```

Такое разделение уменьшает связанность UI с data access и упрощает тесты. Это не догма: маленький компонент не нужно
насильно делить, если разделение не добавляет ясности.





#### Вопрос: В чем отличие между NGRX, NGXS, Akita и какую проблему они решают?

**Короткий ответ**

Все эти решения помогают организовать общее состояние и предсказуемые изменения, но используют разные модели.

**Полный ответ**

Все эти решения помогают организовать общее состояние и предсказуемые изменения, но используют разные модели.

- **NgRx** следует Redux-подходу: actions, reducers, selectors, effects. Самый строгий и многословный вариант, с сильной
  экосистемой и devtools.
- **NGXS** использует классы состояния и decorators, требует меньше шаблонного кода, но сильнее опирается на собственные
  абстракции.
- **Akita** моделирует store/query/service и удобна для entity-состояния. Перед выбором нужно проверять актуальность
  поддержки и совместимость с версией Angular.

State manager не нужен автоматически. Для небольшого приложения signals и сервисов часто достаточно. Библиотека
оправдана, когда сложность координации, отладки и единообразия выше стоимости новой зависимости и дополнительного кода.





#### Вопрос: Когда в Angular действительно нужен NgRx/store?

**Короткий ответ**

NgRx/store оправдан, когда приложение имеет сложное общее состояние, много независимых writers, эффекты, optimistic
updates, rollback, audit/debug history или несколько команд, которым нужны одинаковые правила изменений.

**Полный ответ**

NgRx/store оправдан, когда приложение имеет сложное общее состояние, много независимых writers, эффекты, optimistic
updates, rollback, audit/debug history или несколько команд, которым нужны одинаковые правила изменений.

Хороший пример: большой кабинет с правами пользователя, entity cache, websocket updates, drafts, optimistic save и
несколькими feature teams. В таком случае actions/selectors/effects дают общий язык и воспроизводимую отладку.

Плохой пример: простая форма или один экран с HTTP-запросом. Там `signal()` в компоненте, feature service или
`httpResource()` обычно проще и дешевле.





#### Вопрос: Как не превратить сервис состояния в god object?

**Короткий ответ**

Разделять state по feature/domain ownership, держать commands узкими и выносить data access отдельно. Не смешивать
несвязанные формы, router, HTTP и analytics в одном singleton. Public API должен быть меньше внутренней реализации.

**Полный ответ**

Разделять state по feature/domain ownership, держать commands узкими и выносить data access отдельно. Не смешивать
несвязанные формы, router, HTTP и analytics в одном singleton. Public API должен быть меньше внутренней реализации.





#### Вопрос: Как спроектировать слои Angular feature при использовании Signals?

**Короткий ответ**

Практичная схема:

**Полный ответ**

Практичная схема:

- route/container component связывает URL, permissions и feature lifecycle;
- facade или feature store владеет writable signals и commands;
- API service знает backend DTO и transport details;
- mapper переводит DTO в view/domain model;
- presentational components получают readonly data и events.

Важно не отдавать наружу writable signal без необходимости. Публичный API feature должен выражать намерения:
`selectUser(id)`, `saveDraft()`, `resetFilters()`, а не позволять любому consumer менять внутренние поля напрямую.





#### Вопрос: Как мигрировать Angular feature с @Input/@Output и RxJS к Signals без переписывания всего сразу?

**Короткий ответ**

Миграцию делают по границам, а не большим взрывом:

**Полный ответ**

Миграцию делают по границам, а не большим взрывом:

1. Оставить публичный contract компонента стабильным.
2. Перевести локальное синхронное состояние на `signal()` и `computed()`.
3. На границе Observable использовать `toSignal()` или оставить `async` pipe, если stream уже хорошо выражает async
   flow.
4. Новые inputs можно делать через `input()` там, где это не ломает consumers.
5. Удалять RxJS только там, где stream был заменой обычному synchronous state.

Главный критерий: код стал проще читать и тестировать. Если есть cancellation, debounce, WebSocket или сложная
конкуренция, RxJS может остаться правильным инструментом.





#### Вопрос: Какие анти-паттерны Signals часто встречаются в Angular?

**Короткий ответ**

Частые ошибки:

**Полный ответ**

Частые ошибки:

- писать side effects внутри `computed()`;
- мутировать объект или массив внутри signal in place;
- отдавать writable signal всем consumers;
- заменять RxJS signals там, где нужна отмена, backpressure или сложная async composition;
- делать один глобальный signal-store для несвязанных features;
- использовать `effect()` как скрытый orchestration layer вместо явных commands.

Хороший signal-код имеет чистые `computed()`, узкие commands, readonly public state и понятные границы ownership.
