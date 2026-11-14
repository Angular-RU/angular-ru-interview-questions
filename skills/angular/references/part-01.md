# Angular — вопросы и ответы, часть 1

> Автоматически сгенерировано из src/pages/angular/index.md. Не редактируйте вручную.

## Angular

### Основные концепции



#### Вопрос: Что такое Angular?

**Короткий ответ**

Angular — TypeScript-платформа для создания web-приложений. Она включает compiler, declarative templates, components,
signals, DI, Router, forms, HttpClient, SSR/SSG/hydration, service worker, CLI и testing APIs.

**Полный ответ**

Angular — TypeScript-платформа для создания web-приложений. Она включает compiler, declarative templates, components,
signals, DI, Router, forms, HttpClient, SSR/SSG/hydration, service worker, CLI и testing APIs.

Современная модель Angular 19–22:

- standalone components, directives и pipes; с Angular 19 они standalone по умолчанию;
- `bootstrapApplication()` и functional providers;
- signals для локального и template-facing состояния;
- `input()`, `output()`, `model()` и signal queries;
- built-in control flow `@if`, `@for`, `@switch` и `@defer`;
- RxJS для сложных асинхронных потоков;
- zoneless change detection по умолчанию с Angular 21;
- server-side и hybrid rendering через `@angular/ssr`.

Плюсы: единая экосистема, строгая типизация шаблонов, предсказуемая архитектура, хороший tooling и масштабируемость.

Минусы: большой API surface, необходимость понимать DI, reactivity, Router, rendering и RxJS; неправильные границы
состояния или feature могут сделать приложение сложным независимо от выбранного state manager.





#### Вопрос: В чем разница между AngularJS и Angular?

**Короткий ответ**

AngularJS является фреймворком, который может помочь вам в разработке Single Page Application. Он появился в 2009 году и
с годами выяснилось, что имел много проблем. Angular (Angular 2+) же в свою очередь направлен на тоже самое, но дает
больше преимуществ по сравнению с AngularJS 1.x, включая лучшую производительность, ленивую загрузку, более простой API,
более легкую отладку.

**Полный ответ**

**AngularJS** является фреймворком, который может помочь вам в разработке Single Page Application. Он появился в 2009
году и с годами выяснилось, что имел много проблем. **Angular** (Angular 2+) же в свою очередь направлен на тоже самое,
но дает больше преимуществ по сравнению с AngularJS 1.x, включая лучшую производительность, ленивую загрузку, более
простой API, более легкую отладку.

**Что появилось в Angular**:

- Angular ориентирован на мобильные платформы и имеет лучшую производительность
- Angular имеет встроенные сервисы для поддержки интернационализации
- AngularJS проще настроить, чем Angular
- AngularJS использует контроллеры и $scope
- Angular имеет много способов определения локальных переменных
- В Angular новый синтаксис структурных директив (camelCase)
- Angular работает напрямую с свойствами и событиями DOM элементов
- Одностороннее связывание данных через [property]
- Двустороннее связывание данных через [(property)]
- Новый механизм DI, роутинга, запуска приложения

**Основные преимущества Angular**:

- Обратная совместимость Angular 2, 4, 5, ..
- TypeScript с улучшенной проверкой типов
- Встроенный компилятор с режимами JIT и AOT (+сокращение кода)
- Встроенные анимации





#### Вопрос: Что такое TypeScript и зачем он нужен Angular?

**Короткий ответ**

TypeScript — надмножество JavaScript со статической типизацией. Angular использует TypeScript для описания компонентов,
DI-контрактов, маршрутов, forms, HTTP DTO и strict template checking.

**Полный ответ**

TypeScript — надмножество JavaScript со статической типизацией. Angular использует TypeScript для описания компонентов,
DI-контрактов, маршрутов, forms, HTTP DTO и strict template checking.

Типы помогают находить ошибки до runtime:

- неправильный input или output компонента;
- неверную форму данных из API;
- nullable-состояния;
- несовместимый provider token;
- ошибку в template expression.

TypeScript не заменяет runtime-валидацию данных с backend, но делает код приложения явнее и безопаснее для рефакторинга.
В Angular особенно важны `strict`, `strictTemplates`, точные domain-типы и отказ от `any`.





#### Вопрос: Что такое Angular CLI?

**Короткий ответ**

Angular CLI — официальный инструмент для создания, сборки, разработки и обновления Angular-проектов. Через CLI обычно
запускают dev server, production build, schematics, migrations и тесты.

**Полный ответ**

Angular CLI — официальный инструмент для создания, сборки, разработки и обновления Angular-проектов. Через CLI обычно
запускают dev server, production build, schematics, migrations и тесты.

Примеры:

```bash
ng new app-name
ng generate component features/orders/order-card
ng build
ng update
```

CLI важен не только как генератор файлов. Он скрывает конфигурацию builder-а, TypeScript compilation, dev server,
production optimizations, assets, styles и migrations под единым API.





#### Вопрос: Что такое component, directive, template и metadata?

**Короткий ответ**

Компонент — директива с собственным шаблоном. Он описывает часть UI, принимает данные через inputs, сообщает события
через outputs и может иметь локальные providers.

**Полный ответ**

Компонент — директива с собственным шаблоном. Он описывает часть UI, принимает данные через inputs, сообщает события
через outputs и может иметь локальные providers.

Директива добавляет поведение существующему элементу или шаблону. Атрибутная директива меняет поведение элемента, а
структурная директива управляет embedded view. Для обычных условий и циклов в новом Angular чаще используют `@if` и
`@for`, а не custom structural directive.

Template — HTML-подобный шаблон Angular с bindings, control flow, pipes и template variables.

Metadata — конфигурация decorator-а, например `selector`, `imports`, `templateUrl`, `providers`, `host`:

```ts
@Component({
  selector: 'app-user-card',
  imports: [DatePipe],
  templateUrl: './user-card.html',
  host: {
    '[class.selected]': 'selected()',
  },
})
export class UserCardComponent {
  readonly selected = input(false);
}
```





#### Вопрос: Что такое platform, declarable и bootstrapped component?

**Короткий ответ**

Platform — слой Angular, который связывает приложение с окружением выполнения: browser, server, tests или custom
renderer. В browser-приложении bootstrapApplication() поднимает browser platform и создает root EnvironmentInjector.

**Полный ответ**

Platform — слой Angular, который связывает приложение с окружением выполнения: browser, server, tests или custom
renderer. В browser-приложении `bootstrapApplication()` поднимает browser platform и создает root `EnvironmentInjector`.

Declarable — исторический термин из NgModule-модели: component, directive или pipe, которые добавляли в `declarations`.
С standalone API эти сущности импортируются напрямую в `imports`, а не объявляются в NgModule.

Bootstrapped component — корневой компонент, с которого начинается component tree. В standalone-приложении это аргумент
`bootstrapApplication(AppComponent, appConfig)`. В legacy NgModule-приложении корневой компонент указывали в `bootstrap`
массива `@NgModule`.





#### Вопрос: Что такое MVVM и в чем разница перед MVC?

**Короткий ответ**

MVVM - шаблон проектирования архитектуры приложения. Состоит из 3 ключевых блоков: Model, View, ViewModel.

**Полный ответ**

**MVVM** - шаблон проектирования архитектуры приложения. Состоит из 3 ключевых блоков: Model, View, ViewModel.

Отличие от MVС заключаются в:

- View реагирует на действия пользователя и передает их во View Model через Data Binding.
- View Model, в отличие от контроллера в MVC, имеет особый механизм, автоматизирующий связь между View и связанными
  свойствами в ViewModel.

Привязка данных между View и ViewModel может быть односторонней или двусторонней (one-way, two-way data-binding).





#### Вопрос: Какая базовая архитектура Angular-приложения?

**Короткий ответ**

Современное Angular-приложение обычно состоит из:

**Полный ответ**

Современное Angular-приложение обычно состоит из:

- root component, который монтируется через `bootstrapApplication()`;
- `ApplicationConfig` с root providers;
- standalone components, directives и pipes;
- Router с lazy-loaded routes;
- services для data access, состояния и интеграций;
- forms, HttpClient, signals и RxJS;
- SSR/SSG/hydration, если приложению нужен быстрый first paint или SEO.

```ts
bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideHttpClient()],
});
```

Feature-код лучше группировать по доменам, а не только по техническим типам. NgModules остаются поддерживаемой
legacy/enterprise-compatible моделью: они встречаются в старых проектах, библиотеках и постепенных миграциях, но не
являются главным способом проектировать новое приложение.





#### Вопрос: Какой должна быть структура каталогов компонентов любого Angular приложения и почему?

**Короткий ответ**

Универсальной структуры нет: она зависит от размера продукта и команды. Для приложения обычно лучше группировка по
feature/domain, а не один глобальный каталог components, services, models.

**Полный ответ**

Универсальной структуры нет: она зависит от размера продукта и команды. Для приложения обычно лучше группировка по
feature/domain, а не один глобальный каталог `components`, `services`, `models`.

```text
src/app/
  core/
    auth/
    http/
  shared/
    ui/
    pipes/
  features/
    orders/
      data-access/
      ui/
      pages/
      orders.routes.ts
  app.config.ts
  app.routes.ts
```

- `features` содержит бизнес-функции и их локальные зависимости.
- `shared` содержит действительно переиспользуемые, не зависящие от продукта элементы.
- `core` содержит инфраструктуру приложения: авторизацию, конфигурацию, глобальные interceptors.
- Routes и lazy-loading задают явные границы feature.
- Файлы компонента обычно лежат рядом: `.ts`, `.html`, `.less`/`.css`, `.spec.ts`.

Главные критерии: связанный код находится рядом, публичный API узкий, зависимости направлены от feature к общим слоям, а
не между случайными feature.



### Angular Core

**DI + providers**



#### Вопрос: Что такое DI в Angular?

**Короткий ответ**

Angular DI — это система, через которую Angular создает и передает зависимости компонентам, директивам, сервисам и
другим сущностям. Сервисы можно регистрировать через providedIn, ApplicationConfig.providers, route providers или
component/directive providers; Angular DI при этом иерархическая, то есть ближайший injector может переопределить
зависимость для части дерева.

**Полный ответ**

Angular DI — это система, через которую Angular создает и передает зависимости компонентам, директивам, сервисам и
другим сущностям. Сервисы можно регистрировать через `providedIn`, `ApplicationConfig.providers`, route providers или
component/directive providers; Angular DI при этом иерархическая, то есть ближайший injector может переопределить
зависимость для части дерева.

```ts
@Injectable({
  providedIn: 'root',
})
export class UserService {}

@Component({
  selector: 'app-profile',
  template: `
    ...
  `,
})
export class ProfileComponent {
  private readonly userService = inject(UserService);
}
```

Legacy constructor injection тоже поддерживается, но в новом standalone-коде часто используют `inject()` в field
initializer, provider factory, guard, resolver или interceptor.





#### Вопрос: Что такое provider и чем отличаются useClass, useValue, useFactory и useExisting?

**Короткий ответ**

Provider связывает DI token со способом получения значения:

**Полный ответ**

Provider связывает DI token со способом получения значения:

```ts
providers: [
  {provide: Logger, useClass: ConsoleLogger},
  {provide: API_URL, useValue: '/api'},
  {
    provide: APP_CONFIG,
    useFactory: () => createConfig(inject(EnvironmentService)),
  },
  {provide: AbstractLogger, useExisting: Logger},
];
```

- `useClass` создает экземпляр класса.
- `useValue` возвращает готовое значение.
- `useFactory` вычисляет dependency.
- `useExisting` создает alias на уже существующий instance.

`useClass` с двумя tokens создаст два instances, а `useExisting` — один общий.





#### Вопрос: Что делает providedIn: 'root'?

**Короткий ответ**

providedIn: "root" регистрирует сервис в корневом EnvironmentInjector.

**Полный ответ**

`providedIn: "root"` регистрирует сервис в корневом `EnvironmentInjector`.

```ts
@Injectable({providedIn: 'root'})
export class AuthService {}
```

- Обычно во всем приложении создается один экземпляр сервиса.
- Сервис доступен без ручного добавления в `providers`.
- Неиспользуемый сервис может быть удален из production-сборки с помощью tree shaking.
- Экземпляр живет столько же, сколько приложение.

Это подход по умолчанию для stateless-сервисов, API-клиентов и общего состояния приложения.





#### Вопрос: Чем отличается providedIn: 'root' от providers в компоненте?

**Короткий ответ**

providedIn: "root" создает провайдер на уровне приложения, а providers компонента создает локальный провайдер в
ElementInjector.

**Полный ответ**

`providedIn: "root"` создает провайдер на уровне приложения, а `providers` компонента создает локальный провайдер в
`ElementInjector`.

```ts
@Component({
  selector: 'app-editor',
  providers: [DraftService],
})
export class EditorComponent {}
```

- Root-сервис обычно один на все приложение.
- Локальный сервис создается для каждого экземпляра компонента.
- Локальный экземпляр доступен компоненту и его потомкам по правилам иерархического DI.
- При уничтожении компонента уничтожается и его локальный экземпляр сервиса.

Локальный `providers` полезен для изолированного состояния виджета, формы или нескольких независимых экземпляров одного
компонента.





#### Вопрос: Что будет, если один сервис есть и в root, и в providers компонента?

**Короткий ответ**

Будут существовать разные экземпляры сервиса. Angular начинает поиск с ближайшего инжектора, поэтому компонент и его
потомки получат локальный экземпляр, а остальные части приложения продолжат использовать root-экземпляр.

**Полный ответ**

Будут существовать разные экземпляры сервиса. Angular начинает поиск с ближайшего инжектора, поэтому компонент и его
потомки получат локальный экземпляр, а остальные части приложения продолжат использовать root-экземпляр.

Это называется shadowing провайдера.

```ts
@Injectable({providedIn: 'root'})
export class CounterService {}

@Component({
  providers: [CounterService],
})
export class LocalCounterComponent {
  readonly counter = inject(CounterService); // Локальный экземпляр
}
```

Такое поведение полезно для изоляции состояния, но может стать причиной ошибок, если разработчик ожидал настоящий
singleton.





#### Вопрос: Что такое InjectionToken и когда он нужен?

**Короткий ответ**

TypeScript interface отсутствует в runtime и не может быть DI token. InjectionToken используют для конфигураций,
функций, primitives и абстрактных контрактов:

**Полный ответ**

TypeScript interface отсутствует в runtime и не может быть DI token. `InjectionToken<T>` используют для конфигураций,
функций, primitives и абстрактных контрактов:

```ts
export interface AnalyticsConfig {
  readonly endpoint: string;
}

export const ANALYTICS_CONFIG = new InjectionToken<AnalyticsConfig>('ANALYTICS_CONFIG');
```

Описание токена должно быть уникальным и понятным. Для tree-shakable default можно передать `providedIn` и `factory`.





#### Вопрос: Что такое inject() и injection context?

**Короткий ответ**

inject() получает dependency без constructor parameter. Он работает только внутри injection context:

**Полный ответ**

`inject()` получает dependency без constructor parameter. Он работает только внутри injection context:

- field initializer или constructor создаваемого Angular class;
- provider factory;
- guard, resolver, interceptor;
- функция, запущенная через `runInInjectionContext()`.

```ts
export class UserStore {
  private readonly api = inject(UserApi);
}
```

Нельзя вызывать `inject()` позже в произвольном method или async callback. Для reusable helper можно использовать
`assertInInjectionContext()`.





#### Вопрос: Как избежать circular dependency в Angular?

**Короткий ответ**

Сначала проверяют архитектуру: циклическая DI или import-зависимость часто означает смешение ответственности.

**Полный ответ**

Сначала проверяют архитектуру: циклическая DI или import-зависимость часто означает смешение ответственности.

Варианты исправления:

- вынести общий контракт или pure logic в более низкий слой;
- разделить API service, state service и orchestration facade;
- заменить двусторонние вызовы events/commands;
- использовать `InjectionToken`, если зависимость должна быть инвертирована;
- не лечить архитектурный цикл `forwardRef()` без необходимости.

Import cycles проверяют инструментами dependency graph и правилами ESLint/Nx.





#### Вопрос: Как подменять dependencies в Angular-тестах?

**Короткий ответ**

Предпочтительны небольшие fake/stub реализации с типом Pick . Не нужно мокать каждую внутреннюю функцию: подменяют
внешние границы и проверяют observable behavior.

**Полный ответ**

```ts
TestBed.configureTestingModule({
  providers: [UserStore, {provide: UserApi, useValue: userApiMock}],
});

TestBed.overrideProvider(APP_CONFIG, {
  useValue: testConfig,
});
```

Предпочтительны небольшие fake/stub реализации с типом `Pick<Dependency, "...">`. Не нужно мокать каждую внутреннюю
функцию: подменяют внешние границы и проверяют observable behavior.





#### Вопрос: Объясните как работает Dependency Injection на примере SOLID

**Короткий ответ**

Как мы помним Dependency Injection в Angular это механизм, при котором класс не создает зависимости сам, а получает их
снаружи.

**Полный ответ**

Как мы помним Dependency Injection в Angular это механизм, при котором класс не создает зависимости сам, а получает их
снаружи.

То есть вместо:

```ts
class UserComponent {
  private api = new UserApiService();
}
```

мы пишем:

```ts
@Component({
  // ...
})
export class UserComponent {
  private readonly api = inject(UserApiService);
  // или через constructor:
  // constructor(private readonly api: UserApiService) {}
}
```

Angular сам найдет UserApiService, создаст экземпляр и передаст его в компонент.

Зачем это нужно:

Представь компонент:

```ts
@Component({
  // ...
})
export class ProfileComponent {
  loadProfile(): void {
    // Нужно сходить на backend
  }
}
```

Компоненту не хочется знать:

- как создается HTTP-клиент;
- где лежит API;
- как кешируются данные;
- как мокать API в тестах;
- как менять реализацию для dev/prod.

Компоненту нужно только сказать:

"Дай мне сервис, который умеет загружать профиль".

Это и есть идея Dependency Injection.

**Без Dependency Injection**

Плохой вариант:

```ts
export class ProfileComponent {
  private readonly service = new ProfileService();

  load(): void {
    this.service.loadProfile();
  }
}
```

Проблемы:

- ProfileComponent жестко связан с ProfileService.
- В тестах сложно подменить сервис на мок.
- Если ProfileService требует HttpClient, придется руками создавать и его.
- Компонент знает слишком много о создании зависимостей.

**С Dependency Injection**

Хороший вариант:

```ts
@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly http = inject(HttpClient);

  loadProfile() {
    return this.http.get('/api/profile');
  }
}
```

```ts
@Component({
  selector: 'app-profile',
  template: `
    ...
  `,
})
export class ProfileComponent {
  private readonly profileService = inject(ProfileService);

  load(): void {
    this.profileService.loadProfile().subscribe();
  }
}
```

Теперь ProfileComponent не создает ProfileService. Он только просит Angular:

“Найди мне зависимость типа ProfileService”.

Angular смотрит в injector и возвращает нужный экземпляр.

**Как это связано с SOLID**

**1. S — Single Responsibility Principle**

Класс должен иметь одну основную ответственность. Без DI компонент часто делает слишком много:

```ts
export class ProfileComponent {
  private readonly http = new HttpClient(/* ... */);

  loadProfile() {
    return this.http.get('/api/profile');
  }

  renderProfile() {
    // UI logic
  }
}
```

Компонент отвечает и за UI, и за работу с API.

Лучше разделить:

```ts
@Injectable({
  providedIn: 'root',
})
export class ProfileApiService {
  private readonly http = inject(HttpClient);

  getProfile() {
    return this.http.get('/api/profile');
  }
}
```

```ts
@Component({
  //...
})
export class ProfileComponent {
  private readonly api = inject(ProfileApiService);

  load(): void {
    this.api.getProfile().subscribe();
  }
}
```

Теперь:

- ProfileComponent отвечает за UI;
- ProfileApiService отвечает за API.

DI помогает не смешивать ответственности.

**2. O — Open/Closed Principle**

Код должен быть открыт для расширения, но закрыт для изменения.

Допустим, есть аналитика:

```ts
export class AnalyticsService {
  track(event: string): void {
    console.log(event);
  }
}
```

Компонент использует ее:

```ts
@Component({
  // ...
})
export class ButtonComponent {
  private readonly analytics = inject(AnalyticsService);

  click(): void {
    this.analytics.track('button_click');
  }
}
```

Если завтра нужно заменить ConsoleAnalyticsService на FirebaseAnalyticsService, не хочется переписывать все компоненты.

В Angular можно сделать абстракцию через InjectionToken:

```ts
export interface Analytics {
  track(event: string): void;
}

export const ANALYTICS = new InjectionToken<Analytics>('ANALYTICS');
```

Реализация:

```ts
@Injectable()
export class ConsoleAnalyticsService implements Analytics {
  track(event: string): void {
    console.log(event);
  }
}
```

Provider:

```ts
bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: ANALYTICS,
      useClass: ConsoleAnalyticsService,
    },
  ],
});
```

Использование:

```ts
@Component({
  // ...
})
export class ButtonComponent {
  private readonly analytics = inject(ANALYTICS);

  click(): void {
    this.analytics.track('button_click');
  }
}
```

Теперь компонент не зависит от конкретного класса. Можно заменить реализацию:

```ts
providers: [
  {
    provide: ANALYTICS,
    useClass: FirebaseAnalyticsService,
  },
];
```

Компонент не меняется.

**3. L — Liskov Substitution Principle**

Любую реализацию интерфейса можно заменить другой, если она соблюдает тот же контракт.

Например, у нас есть контракт:

```ts
export interface AuthStorage {
  getToken(): string | null;
  setToken(token: string): void;
}
```

Одна реализация хранит токен в localStorage:

```ts
@Injectable()
export class LocalStorageAuthStorage implements AuthStorage {
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }
}
```

Другая — в памяти:

```ts
@Injectable()
export class MemoryAuthStorage implements AuthStorage {
  private token: string | null = null;

  getToken(): string | null {
    return this.token;
  }

  setToken(token: string): void {
    this.token = token;
  }
}
```

DI позволяет подставить любую реализацию:

```ts
export const AUTH_STORAGE = new InjectionToken<AuthStorage>('AUTH_STORAGE');

providers: [
  {
    provide: AUTH_STORAGE,
    useClass: LocalStorageAuthStorage,
  },
];
```

А потребитель не знает, какая реализация внутри:

```ts
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly storage = inject(AUTH_STORAGE);

  getToken(): string | null {
    return this.storage.getToken();
  }
}
```

Если заменить LocalStorageAuthStorage на MemoryAuthStorage, AuthService должен продолжить работать.

**4. I — Interface Segregation Principle**

Не заставляй класс зависеть от методов, которые ему не нужны.

Плохо:

```ts
export interface UserFacade {
  loadUser(): Observable<User>;
  updateUser(user: User): Observable<User>;
  deleteUser(id: string): Observable<void>;
  exportUsers(): Observable<Blob>;
  sendMarketingEmail(): void;
}
```

Компоненту профиля нужен только loadUser, но он зависит от огромного интерфейса.

Лучше разделить:

```ts
export interface UserReader {
  loadUser(): Observable<User>;
}

export interface UserWriter {
  updateUser(user: User): Observable<User>;
}
```

Токен:

```ts
export const USER_READER = new InjectionToken<UserReader>('USER_READER');
```

Компонент:

```ts
@Component({
  // ...
})
export class ProfileComponent {
  private readonly userReader = inject(USER_READER);

  ngOnInit(): void {
    this.userReader.loadUser().subscribe();
  }
}
```

Компонент зависит только от того, что ему реально нужно.

**5. D — Dependency Inversion Principle**

Это главный принцип, связанный с DI. Высокоуровневый код не должен зависеть от низкоуровневых деталей. Оба должны
зависеть от абстракций.

Плохо:

```ts
export class AuthService {
  private readonly storage = new LocalStorageAuthStorage();
}
```

AuthService зависит от конкретной детали: LocalStorageAuthStorage.

Лучше:

```ts
export interface AuthStorage {
  getToken(): string | null;
  setToken(token: string): void;
}

export const AUTH_STORAGE = new InjectionToken<AuthStorage>('AUTH_STORAGE');
```

```ts
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly storage = inject(AUTH_STORAGE);
}
```

```ts
providers: [
  {
    provide: AUTH_STORAGE,
    useClass: LocalStorageAuthStorage,
  },
];
```

Теперь AuthService зависит не от конкретной реализации, а от абстракции.

**Главная мысль**

DI в Angular — это не просто “удобно получить сервис”.

Это способ сделать код:

- менее связанным;
- проще тестируемым;
- легче расширяемым;
- более соответствующим SOLID;
- более безопасным для замены реализаций.

Самая важная связь с SOLID — это Dependency Inversion:

Компонент или сервис должен зависеть не от конкретной реализации, а от контракта/абстракции.





#### Вопрос: Как разделять API service, state service и facade?

**Короткий ответ**

Для маленькой feature три класса могут быть лишними. Разделение вводят, когда обязанности действительно различаются.
Компонент отвечает за rendering и UI events, а бизнес-правила не должны зависеть от DOM.

**Полный ответ**

- API service знает HTTP DTO и endpoints, но не UI.
- State service хранит feature state и pure transitions.
- Facade координирует use cases и предоставляет удобный API компонентам.

Для маленькой feature три класса могут быть лишними. Разделение вводят, когда обязанности действительно различаются.
Компонент отвечает за rendering и UI events, а бизнес-правила не должны зависеть от DOM.





#### Вопрос: Как диагностировать provider scope и случайные разные instances?

**Короткий ответ**

Если сервис неожиданно хранит разное состояние в разных частях приложения, сначала проверяют, где он зарегистрирован:

**Полный ответ**

Если сервис неожиданно хранит разное состояние в разных частях приложения, сначала проверяют, где он зарегистрирован:

- `@Injectable({providedIn: 'root'})`;
- `ApplicationConfig.providers`;
- route-level `providers`;
- `providers` или `viewProviders` компонента/директивы;
- legacy `NgModule.providers`.

Angular всегда берет ближайший подходящий provider в иерархии injectors. Поэтому component provider может скрыть root
provider, а route provider может создать отдельный instance для lazy feature.

Практическая диагностика:

- найти все регистрации token через поиск по проекту;
- временно добавить уникальный readonly id в сервис и проверить, где создаются разные instances;
- посмотреть injector tree и providers в Angular DevTools;
- проверить lazy routes и component `providers`;
- убедиться, что shared module или barrel не регистрирует singleton service повторно.

Если сервис должен быть singleton, обычно достаточно `providedIn: 'root'` и отсутствия локальных providers для этого же
token.



### Templates



#### Вопрос: Что такое интерполяция в Angular?

**Короткий ответ**

Разметка интерполяции с внедренными выражениями используется в Angular для присвоения данных текстовым нодам и значения
аттрибутов. Например:

**Полный ответ**

Разметка интерполяции с внедренными выражениями используется в Angular для присвоения данных текстовым нодам и значения
аттрибутов. Например:

```html
<a href="img/{{ username }}.jpg">Hello {{ username }}!</a>
```





#### Вопрос: Что такое template expression, template statement и какие операторы доступны?

**Короткий ответ**

Template expression вычисляет значение для interpolation, property binding, class/style binding или pipe:

**Полный ответ**

Template expression вычисляет значение для interpolation, property binding, class/style binding или pipe:

```html
<button [disabled]="saving() || !form.valid">{{ user()?.name ?? "Гость" }}</button>
```

Template statement выполняется в response на событие:

```html
<button (click)="save($event)">Сохранить</button>
```

В expression доступны обычные безопасные операции чтения: property access, method call без side effects, arithmetic,
comparison, logical operators, `??`, optional chaining, ternary operator, pipe operator. Нельзя писать assignments,
создавать declarations, использовать `new`, `typeof`, `instanceof`, bitwise operators и тяжелую бизнес-логику.

Pipe имеет более низкий приоритет, чем ternary, поэтому неоднозначные выражения лучше группировать скобками:

```html
{{ isAdmin ? (name | uppercase) : "guest" }}
```





#### Вопрос: Какие способы использования шаблонов в Angular вы знаете?

**Короткий ответ**

Шаблон можно задать:

**Полный ответ**

Шаблон можно задать:

- внешним файлом через `templateUrl`;
- inline-строкой через `template`;
- переиспользуемым фрагментом `<ng-template>`;
- переданным `TemplateRef`, например через content query или input;
- динамически вставленным через `ViewContainerRef`.

В шаблонах используются интерполяция, property/event binding, control flow `@if`, `@for`, `@switch`, pipes, template
reference variables и content projection через `<ng-content>`.

Для обычного компонента предпочтителен внешний `.html`, если шаблон не тривиален. Шаблон не должен содержать тяжелые
вычисления и побочные эффекты: подготовку данных лучше выполнять в компоненте, `computed()` или pipe.





#### Вопрос: Как работают @if, @for, @switch и @let?

**Короткий ответ**

Built-in control flow не требует CommonModule и лучше анализируется компилятором, чем legacy ngIf/ngFor.

**Полный ответ**

- `@if` условно создает view и поддерживает `@else`.
- `@for` повторяет view и требует `track`.
- `@switch` выбирает одну ветку без fallthrough.
- `@let` сохраняет результат template expression в локальную readonly-переменную.

<!-- prettier-ignore -->
```html
@let user = currentUser();

@if (user) {
  @switch (user.role) {
    @case ("admin") {
      <app-admin />
    }
    @default {
      <app-profile [user]="user" />
    }
  }
}
```

Built-in control flow не требует `CommonModule` и лучше анализируется компилятором, чем legacy `*ngIf/*ngFor`.





#### Вопрос: Для чего нужен track в @for?

**Короткий ответ**

track связывает элемент данных с DOM-view. При изменении массива Angular переиспользует существующие nodes и component
instances вместо пересоздания списка.

**Полный ответ**

`track` связывает элемент данных с DOM-view. При изменении массива Angular переиспользует существующие nodes и component
instances вместо пересоздания списка.

<!-- prettier-ignore -->
```html
@for (user of users(); track user.id) {
  <app-user [user]="user" />
}
```

Лучший ключ — стабильный уникальный id. `track $index` допустим только для статичного списка, где элементы не
вставляются, не удаляются и не сортируются.





#### Вопрос: В чем разница между структурной и атрибутной директивой, назовите встроенные директивы?

**Короткий ответ**

Структурные директивы управляют структурой представления: создают, удаляют или повторяют embedded views. Классические
примеры — NgIf, NgFor, NgSwitch, пользовательская директива на .

**Полный ответ**

**Структурные директивы** управляют структурой представления: создают, удаляют или повторяют embedded views.
Классические примеры — `NgIf`, `NgFor`, `NgSwitch`, пользовательская директива на `<ng-template>`.

В Angular 19–22 для обычных условий и циклов используют встроенный control flow:

<!-- prettier-ignore -->
```html
@if (user()) {
  <app-profile [user]="user()" />
}

@for (item of items(); track item.id) {
  <app-item [item]="item" />
} @empty {
  <p>Список пуст</p>
}
```

`@if`, `@for` и `@switch` встроены в синтаксис шаблонов и не требуют импорта `CommonModule`.

**Атрибутные директивы** изменяют поведение или свойства существующего элемента. Примеры: `RouterLink`, `NgModel`,
собственная `appTooltip`.

Для классов и стилей предпочтительны прямые bindings:

```html
<button
  [class.active]="isActive()"
  [style.width.px]="width()"
>
  ...
</button>
```

`NgClass`, `NgStyle`, `*ngIf` и `*ngFor` остаются поддерживаемыми для существующего кода, но не являются первым выбором
для новых шаблонов.





#### Вопрос: Чем hidden отличается от @if или *ngIf?

**Короткий ответ**

[hidden] оставляет элемент в DOM и обычно скрывает его CSS-правилом display: none. Компоненты, директивы, forms,
listeners и состояние внутри такого элемента продолжают существовать.

**Полный ответ**

`[hidden]` оставляет элемент в DOM и обычно скрывает его CSS-правилом `display: none`. Компоненты, директивы, forms,
listeners и состояние внутри такого элемента продолжают существовать.

`@if` и legacy `*ngIf` создают или уничтожают embedded view. Когда условие false, DOM-узлы, дочерние компоненты и их
providers уничтожаются, а `ngOnDestroy`/cleanup выполняются.

Используйте `[hidden]`, если нужно быстро переключать видимость и сохранить состояние. Используйте `@if`, если блок не
должен существовать, не должен участвовать в accessibility tree или дорог в поддержании.





#### Вопрос: Для чего нужны директивы ng-template, ng-container, ng-content?

**Короткий ответ**

В современном Angular:

**Полный ответ**

В современном Angular:

- `<ng-template>` хранит неотрендеренный `TemplateRef`, который можно создать позже через `ViewContainerRef`,
  `NgTemplateOutlet` или пользовательскую структурную директиву.
- `<ng-container>` группирует элементы, не добавляя лишний DOM-узел. С `@if` и `@for` он нужен реже, но полезен для
  `ngTemplateOutlet`, `ngComponentOutlet` и DI-границ.
- `<ng-content>` задает compile-time content projection. Для нескольких областей используют `select`.

<!-- prettier-ignore -->
```html
@if (lessons(); as items) {
  @for (lesson of items; track lesson.id) {
    <app-lesson [lesson]="lesson" />
  }
} @else {
  <ng-container [ngTemplateOutlet]="loading" />
}

<ng-template #loading>Загрузка...</ng-template>
```

Ниже приведен legacy-синтаксис `*ngIf/*ngFor`, который все еще встречается в проектах до миграции на built-in control
flow.

**1. ng-template**

`<template>` — это механизм для отложенного рендера клиентского контента, который не отображается во время загрузки, но
может быть инициализирован при помощи JavaScript.

Template можно представить себе как фрагмент контента, сохраненный для последующего использования в документе. Хотя
парсер и обрабатывает содержимое элемента `template` во время загрузки страницы, он делает это только чтобы убедиться в
валидности содержимого; само содержимое при этом не отображается.

`<ng-template>` - является имплементацией стандартного элемента template, данный элемент появился с четвертой версии
Angular, это было сделано с точки зрения совместимости со встраиваемыми на страницу template элементами, которые могли
попасть в шаблон ваших компонентов по тем или иным причинам.

Пример:

```html
<div
  class="lessons-list"
  *ngIf="lessons; else loading"
>
  ...
</div>

<ng-template #loading>
  <div>Loading...</div>
</ng-template>
```

**2. ng-container**

`<ng-container>` - это логический контейнер, который может использоваться для группировки узлов, но не отображается в
дереве DOM как узел (node).

На самом деле структурные директивы (*ngIf, *ngFor, …) являются синтаксическим сахаром для наших шаблонов. В реальности,
данные шаблоны трансформируются в такие конструкции:

```html
<ng-template
  [ngIf]="lessons"
  [ngIfElse]="loading"
>
  <div class="lessons-list">...</div>
</ng-template>

<ng-template #loading>
  <div>Loading...</div>
</ng-template>
```

Но что делать, если я хочу применить несколько структурных директив? (спойлер: к сожалению, так нельзя сделать)

```html
<div
  class="lesson"
  *ngIf="lessons"
  *ngFor="let lesson of lessons"
>
  <div class="lesson-detail">{{ lesson | json }}</div>
</div>
```

```
Uncaught Error: Template parse errors:
Can't have multiple template bindings on one element. Use only one attribute
named 'template' or prefixed with *
```

Но можно сделать так:

```html
<div *ngIf="lessons">
  <div
    class="lesson"
    *ngFor="let lesson of lessons"
  >
    <div class="lesson-detail">{{ lesson | json }}</div>
  </div>
</div>
```

Однако, чтобы избежать необходимости создавать дополнительный div, мы можем вместо этого использовать директиву
ng-container:

```html
<ng-container *ngIf="lessons">
  <div
    class="lesson"
    *ngFor="let lesson of lessons"
  >
    <div class="lesson-detail">{{ lesson | json }}</div>
  </div>
</ng-container>
```

Как мы видим, директива ng-container предоставляет нам элемент, в котором мы можем использовать структурную директиву,
без необходимости создавать дополнительный элемент.

Еще пара примечательных примеров, если все же вы хотите использовать ng-template вместо ng-container, по определенным
правилам вы не сможете использовать полную конструкцию структурных директив.

Вы можете писать либо так:

```html
<div class="mainWrap">
  <ng-container *ngIf="true">
    <h2>Title</h2>
    <div>Content</div>
  </ng-container>
</div>
```

Либо так:

```html
<div class="mainWrap">
  <ng-template [ngIf]="true">
    <h2>Title</h2>
    <div>Content</div>
  </ng-template>
</div>
```

На выходе, при рендеринге будет одно и тоже:

```html
<div class="mainWrap">
  <h2>Title</h2>
  <div>Content</div>
</div>
```

**3. ng-content**

`<ng-content>` - позволяет внедрять родительским компонентам html-код в дочерние компоненты.

Здесь на самом деле, немного сложнее уже чем с ng-template, ng-container. Так как ng-content решает задачу проецирования
контента в ваши веб-компоненты. Веб-компоненты состоят из нескольких отдельных технологий. Вы можете думать о
Веб-компонентах как о переиспользуемых виджетах пользовательского интерфейса, которые создаются с помощью открытых
веб-технологий. Они являются частью браузера и поэтому не нуждаются во внешних библиотеках, таких как jQuery или Dojo.
Существующий Веб-компонент может быть использован без написания кода, просто путем импорта выражения на HTML-страницу.
Веб-компоненты используют новые или разрабатываемые стандартные возможности браузера.

Давайте представим ситуацию от обратного, нам нужно параметризовать наш компонент. Мы хотим сделать так, чтобы на вход в
компонент мы могли передать какие-либо статичные данные. Это можно сделать несколькими способами.

comment.component.ts:

```ts
@Component({
  selector: 'comment',
  template: `
    <h1>Комментарий:</h1>
    <p>{{ data }}</p>
  `,
})
export class CommentComponent {
  readonly data = input.required<string>();
}
```

app.component.html

<!-- prettier-ignore -->
```html
@for (message of comments(); track message.id) {
  <comment [data]="message.text" />
}
```

Но можно поступить и другим путем.

comment.component.ts:

```ts
@Component({
  selector: 'comment',
  template: `
    <h1>Комментарий:</h1>
    <ng-content></ng-content>
  `,
})
export class CommentComponent {}
```

app.component.html

<!-- prettier-ignore -->
```html
@for (message of comments(); track message.id) {
  <comment>
    <p>{{ message.text }}</p>
  </comment>
}
```

Конечно, эти примеры плохо демонстрируют подводные камни, свои плюсы и минусы. Но второй способ демонстрирует подход при
работе, когда мы оперируем независимыми абстракциями и можем проецировать контент внутрь наших компонентов (подход
веб-компонентов).





#### Вопрос: Что такое standalone component и чем он отличается от NgModule-подхода?

**Короткий ответ**

Standalone-компонент напрямую импортирует зависимости шаблона через imports и не требует объявления в NgModule.

**Полный ответ**

Standalone-компонент напрямую импортирует зависимости шаблона через `imports` и не требует объявления в `NgModule`.

```ts
@Component({
  selector: 'app-profile',
  imports: [DatePipe, RouterLink],
  templateUrl: './profile.html',
})
export class ProfileComponent {}
```

С Angular 19 компоненты, директивы и pipes standalone по умолчанию. Standalone упрощает lazy loading, локальные
зависимости и tree shaking. `NgModule` остается поддерживаемым для legacy-приложений и некоторых library APIs.



### Templates и content projection



#### Вопрос: Что такое template reference variable?

**Короткий ответ**

Template reference variable объявляется через #name и дает доступ к DOM-элементу, директиве, компоненту или
экспортированному API директивы внутри текущего шаблона.

**Полный ответ**

Template reference variable объявляется через `#name` и дает доступ к DOM-элементу, директиве, компоненту или
экспортированному API директивы внутри текущего шаблона.

```html
<input #emailInput />
<button
  type="button"
  (click)="emailInput.focus()"
>
  Фокус
</button>
```

Для работы из класса компонента используют queries, например `viewChild()`. Не стоит превращать template variable в
способ хранить бизнес-состояние.





#### Вопрос: Чем property binding отличается от interpolation?

**Короткий ответ**

Interpolation {{ value }} удобна для текста и строковых значений. Property binding [property]="value" передает значение
в DOM property, directive input или component input без обязательного приведения к строке.

**Полный ответ**

Interpolation `{{ value }}` удобна для текста и строковых значений. Property binding `[property]="value"` передает
значение в DOM property, directive input или component input без обязательного приведения к строке.

```html
<span>{{ title }}</span>
<button [disabled]="isSaving()">Сохранить</button>
```

Для boolean, object, array и component inputs обычно используют property binding.





#### Вопрос: Чем property binding отличается от attribute binding?

**Короткий ответ**

Property binding меняет runtime-свойство элемента или input директивы. Attribute binding [attr.name] меняет HTML
attribute и нужен там, где нет DOM property или важна именно строка атрибута, например ARIA и SVG.

**Полный ответ**

Property binding меняет runtime-свойство элемента или input директивы. Attribute binding `[attr.name]` меняет HTML
attribute и нужен там, где нет DOM property или важна именно строка атрибута, например ARIA и SVG.

```html
<button [disabled]="disabled()">...</button>
<div [attr.aria-expanded]="expanded()">...</div>
```

Если значение attribute равно `null`, Angular удалит атрибут.





#### Вопрос: Как использовать input/output aliasing?

**Короткий ответ**

Alias меняет публичное имя binding-а в шаблоне, но не имя свойства в классе. Это полезно для совместимости, более
понятного template API или директив, где input совпадает с selector.

**Полный ответ**

Alias меняет публичное имя binding-а в шаблоне, но не имя свойства в классе. Это полезно для совместимости, более
понятного template API или директив, где input совпадает с selector.

```ts
@Component({
  selector: 'app-rating',
  templateUrl: './rating.html',
})
export class RatingComponent {
  readonly value = input(0, {alias: 'rating'});
  readonly valueChange = output<number>({alias: 'ratingChange'});
}
```

```html
<app-rating
  [rating]="score()"
  (ratingChange)="score.set($event)"
/>
```

Alias не стоит использовать без причины: разные имена в class API и template API усложняют поиск и рефакторинг.





#### Вопрос: Чем ng-content, ng-container и ng-template отличаются друг от друга?

**Короткий ответ**

ng-content проецирует внешний контент в компонент и не создает runtime-шаблон. ng-container группирует узлы без лишнего
DOM-элемента. ng-template хранит неотрендеренный TemplateRef, который можно создать позднее.

**Полный ответ**

`ng-content` проецирует внешний контент в компонент и не создает runtime-шаблон. `ng-container` группирует узлы без
лишнего DOM-элемента. `ng-template` хранит неотрендеренный `TemplateRef`, который можно создать позднее.

Коротко: `ng-content` - projection, `ng-container` - невидимая группа, `ng-template` - отложенный фрагмент view.





#### Вопрос: Как выбрать элемент внутри template и как работают ViewChild / ContentChild?

**Короткий ответ**

Для доступа к элементу внутри шаблона можно использовать template reference variable:

**Полный ответ**

Для доступа к элементу внутри шаблона можно использовать template reference variable:

```html
<input #searchInput />
```

Из класса компонента используют view queries для собственного шаблона и content queries для projected content:

```ts
export class SearchComponent {
  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');
  readonly projectedAction = contentChild(ActionDirective);
}
```

`ViewChild`/`viewChild()` ищет в view компонента. `ContentChild`/`contentChild()` ищет в контенте, переданном через
`<ng-content>`.

В новых компонентах signal queries обычно удобнее decorator queries: они типизированы как signals и обновляются
реактивно. В legacy `@ViewChild` флаг `static` нужен был для выбора момента разрешения query; в современном коде часто
проще перейти на signal queries или читать decorator query после соответствующего lifecycle hook.





#### Вопрос: Почему вызов функции в template может быть проблемой?

**Короткий ответ**

Template expression может выполняться много раз при проверках. Если функция тяжелая, создает новые объекты или имеет
побочные эффекты, UI станет медленнее и поведение будет непредсказуемым.

**Полный ответ**

Template expression может выполняться много раз при проверках. Если функция тяжелая, создает новые объекты или имеет
побочные эффекты, UI станет медленнее и поведение будет непредсказуемым.

Лучше вынести вычисление в `computed()`, pure pipe или заранее подготовленное поле. Небольшой чистый getter допустим,
если его стоимость понятна.





#### Вопрос: Что будет, если несколько раз использовать async pipe на одном cold Observable?

**Короткий ответ**

Каждый async pipe создает отдельную подписку. Для cold Observable, например HttpClient, это может означать несколько
одинаковых запросов.

**Полный ответ**

Каждый `async` pipe создает отдельную подписку. Для cold Observable, например `HttpClient`, это может означать несколько
одинаковых запросов.

Решения: вынести значение через `@let`, подписаться один раз в родительском блоке или шарить источник через
`shareReplay({bufferSize: 1, refCount: true})` в сервисе.
