---
layout: ../../layouts/Layout.astro
title: Angular
description: Вопросы и ответы
category: Frontend
kind: questions
order: 120
---

## Angular

### Angular Core

**DI + providers**

#### Junior

<details>
<summary>Что такое InjectionToken и когда он нужен?</summary><br>
<table><tr><td>

TypeScript interface отсутствует в runtime и не может быть DI token. `InjectionToken<T>` используют для конфигураций,
функций, primitives и абстрактных контрактов:

```ts
export interface AnalyticsConfig {
  readonly endpoint: string;
}

export const ANALYTICS_CONFIG = new InjectionToken<AnalyticsConfig>('ANALYTICS_CONFIG');
```

Описание токена должно быть уникальным и понятным. Для tree-shakable default можно передать `providedIn` и `factory`.

</td></tr></table>

</details>

<details>
<summary>Что такое inject() и injection context?</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>

<details>
<summary>Как разделять API service, state service и facade?</summary><br>
<table><tr><td>

- API service знает HTTP DTO и endpoints, но не UI.
- State service хранит feature state и pure transitions.
- Facade координирует use cases и предоставляет удобный API компонентам.

Для маленькой feature три класса могут быть лишними. Разделение вводят, когда обязанности действительно различаются.
Компонент отвечает за rendering и UI events, а бизнес-правила не должны зависеть от DOM.

</td></tr></table>

</details>

<details>
<summary>Как подменять dependencies в Angular-тестах?</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>

<details>
<summary>Объясните как работает Dependency Injection на примере SOLID</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>

#### Middle

<details>
<summary>Как избежать circular dependency в Angular?</summary><br>
<table><tr><td>

Сначала проверяют архитектуру: циклическая DI или import-зависимость часто означает смешение ответственности.

Варианты исправления:

- вынести общий контракт или pure logic в более низкий слой;
- разделить API service, state service и orchestration facade;
- заменить двусторонние вызовы events/commands;
- использовать `InjectionToken`, если зависимость должна быть инвертирована;
- не лечить архитектурный цикл `forwardRef()` без необходимости.

Import cycles проверяют инструментами dependency graph и правилами ESLint/Nx.

</td></tr></table>

</details>

#### Middle+ or Senior

<details>
<summary>Что такое DI в Angular?</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>

<details>
<summary>Что такое provider и чем отличаются useClass, useValue, useFactory и useExisting?</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>

<details>
<summary>Что делает <code>providedIn: 'root'</code>?</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>

<details>
<summary>Чем отличается providedIn: 'root' от providers в компоненте?</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>

<details>
<summary>Что будет, если один сервис есть и в root, и в providers компонента?</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>

<details>
<summary>Как диагностировать provider scope и случайные разные instances?</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>

### Основные концепции

#### Junior

<details>
<summary>Что такое Angular?</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>

<details>
<summary>Что такое TypeScript и зачем он нужен Angular?</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>

<details>
<summary>Что такое Angular CLI?</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>

<details>
<summary>Что такое platform, declarable и bootstrapped component?</summary><br>
<table><tr><td>

Platform — слой Angular, который связывает приложение с окружением выполнения: browser, server, tests или custom
renderer. В browser-приложении `bootstrapApplication()` поднимает browser platform и создает root `EnvironmentInjector`.

Declarable — исторический термин из NgModule-модели: component, directive или pipe, которые добавляли в `declarations`.
С standalone API эти сущности импортируются напрямую в `imports`, а не объявляются в NgModule.

Bootstrapped component — корневой компонент, с которого начинается component tree. В standalone-приложении это аргумент
`bootstrapApplication(AppComponent, appConfig)`. В legacy NgModule-приложении корневой компонент указывали в `bootstrap`
массива `@NgModule`.

</td></tr></table>

</details>

<details>
<summary>Что такое MVVM и в чем разница перед MVC?</summary><br>
<table><tr><td>

**MVVM** - шаблон проектирования архитектуры приложения. Состоит из 3 ключевых блоков: Model, View, ViewModel.

Отличие от MVС заключаются в:

- View реагирует на действия пользователя и передает их во View Model через Data Binding.
- View Model, в отличие от контроллера в MVC, имеет особый механизм, автоматизирующий связь между View и связанными
  свойствами в ViewModel.

Привязка данных между View и ViewModel может быть односторонней или двусторонней (one-way, two-way data-binding).

</td></tr></table>

</details>

#### Middle

<details>
<summary>В чем разница между AngularJS и Angular?</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>

<details>
<summary>Какой должна быть структура каталогов компонентов любого Angular приложения и почему?</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>

#### Middle+ or Senior

<details>
<summary>Что такое component, directive, template и metadata?</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>

<details>
<summary>Какая базовая архитектура Angular-приложения?</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>

### Templates

#### Junior

<details>
<summary>Для чего нужен track в @for?</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>

<details>
<summary>Что такое интерполяция в Angular?</summary><br>
<table><tr><td>

Разметка интерполяции с внедренными выражениями используется в Angular для присвоения данных текстовым нодам и значения
аттрибутов. Например:

```html
<a href="img/{{ username }}.jpg">Hello {{ username }}!</a>
```

</td></tr></table>

</details>

#### Middle

<details>
<summary>Что такое standalone component и чем он отличается от NgModule-подхода?</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>

<details>
<summary>Как работают @if, @for, @switch и @let?</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>

<details>
<summary>Какие способы использования шаблонов в Angular вы знаете?</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>

<details>
<summary>В чем разница между структурной и атрибутной директивой, назовите встроенные директивы?</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>

<details>
<summary>Чем hidden отличается от @if или *ngIf?</summary><br>
<table><tr><td>

`[hidden]` оставляет элемент в DOM и обычно скрывает его CSS-правилом `display: none`. Компоненты, директивы, forms,
listeners и состояние внутри такого элемента продолжают существовать.

`@if` и legacy `*ngIf` создают или уничтожают embedded view. Когда условие false, DOM-узлы, дочерние компоненты и их
providers уничтожаются, а `ngOnDestroy`/cleanup выполняются.

Используйте `[hidden]`, если нужно быстро переключать видимость и сохранить состояние. Используйте `@if`, если блок не
должен существовать, не должен участвовать в accessibility tree или дорог в поддержании.

</td></tr></table>

</details>

<details>
<summary>Для чего нужны директивы ng-template, ng-container, ng-content?</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>

#### Middle+ or Senior

<details>
<summary>Что такое template expression, template statement и какие операторы доступны?</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>

### Templates и content projection

#### Junior

<details>
<summary>Что такое template reference variable?</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>

#### Middle

<details>
<summary>Почему вызов функции в template может быть проблемой?</summary><br>
<table><tr><td>

Template expression может выполняться много раз при проверках. Если функция тяжелая, создает новые объекты или имеет
побочные эффекты, UI станет медленнее и поведение будет непредсказуемым.

Лучше вынести вычисление в `computed()`, pure pipe или заранее подготовленное поле. Небольшой чистый getter допустим,
если его стоимость понятна.

</td></tr></table>

</details>

<details>
<summary>Что будет, если несколько раз использовать async pipe на одном cold Observable?</summary><br>
<table><tr><td>

Каждый `async` pipe создает отдельную подписку. Для cold Observable, например `HttpClient`, это может означать несколько
одинаковых запросов.

Решения: вынести значение через `@let`, подписаться один раз в родительском блоке или шарить источник через
`shareReplay({bufferSize: 1, refCount: true})` в сервисе.

</td></tr></table>

</details>

<details>
<summary>Чем ng-content, ng-container и ng-template отличаются друг от друга?</summary><br>
<table><tr><td>

`ng-content` проецирует внешний контент в компонент и не создает runtime-шаблон. `ng-container` группирует узлы без
лишнего DOM-элемента. `ng-template` хранит неотрендеренный `TemplateRef`, который можно создать позднее.

Коротко: `ng-content` - projection, `ng-container` - невидимая группа, `ng-template` - отложенный фрагмент view.

</td></tr></table>

</details>

<details>
<summary>Как использовать input/output aliasing?</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>

<details>
<summary>Как выбрать элемент внутри template и как работают ViewChild / ContentChild?</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>

#### Middle+ or Senior

<details>
<summary>Чем property binding отличается от interpolation?</summary><br>
<table><tr><td>

Interpolation `{{ value }}` удобна для текста и строковых значений. Property binding `[property]="value"` передает
значение в DOM property, directive input или component input без обязательного приведения к строке.

```html
<span>{{ title }}</span>
<button [disabled]="isSaving()">Сохранить</button>
```

Для boolean, object, array и component inputs обычно используют property binding.

</td></tr></table>

</details>

<details>
<summary>Чем property binding отличается от attribute binding?</summary><br>
<table><tr><td>

Property binding меняет runtime-свойство элемента или input директивы. Attribute binding `[attr.name]` меняет HTML
attribute и нужен там, где нет DOM property или важна именно строка атрибута, например ARIA и SVG.

```html
<button [disabled]="disabled()">...</button>
<div [attr.aria-expanded]="expanded()">...</div>
```

Если значение attribute равно `null`, Angular удалит атрибут.

</td></tr></table>

</details>

### Компоненты, директивы, сервисы и pipes

#### Junior

<details>
<summary>Что такое директива и как создать собственную?</summary><br>
<table><tr><td>

Директивы бывают трех видов: компонент, структурные и атрибутные (см. выше).

Современная атрибутная директива использует `inject()`, signal input и объект `host`:

```ts
@Directive({
  selector: '[appHighlight]',
  host: {
    '(mouseenter)': 'active.set(true)',
    '(mouseleave)': 'active.set(false)',
    '[style.backgroundColor]': 'active() ? color() : null',
  },
})
export class HighlightDirective {
  readonly color = input('yellow', {alias: 'appHighlight'});
  readonly active = signal(false);
}
```

В новом коде объект `host` предпочтительнее `@HostBinding` и `@HostListener`. Прямое изменение DOM через
`ElementRef.nativeElement` используют только когда declarative binding или `Renderer2` не решают задачу.

Пользовательская структурная директива работает с `TemplateRef` и `ViewContainerRef`:

```ts
@Directive({
  selector: '[appUnless]',
})
export class UnlessDirective {
  private readonly template = inject(TemplateRef<unknown>);
  private readonly container = inject(ViewContainerRef);
  private readonly condition = input.required<boolean>({alias: 'appUnless'});

  constructor() {
    effect(() => {
      this.container.clear();

      if (!this.condition()) {
        this.container.createEmbeddedView(this.template);
      }
    });
  }
}
```

Для обычных условий собственная структурная директива не нужна: используйте `@if`. Она оправдана, когда инкапсулирует
повторяемое доменное поведение.

Через CLI директиву создают командой:

```bash
ng generate directive shared/highlight
```

</td></tr></table>

</details>

<details>
<summary>Что такое директива, компонент, модуль, сервис, пайп в Angular и для чего они нужны?</summary><br>
<table><tr><td>

- **Компонент** — директива с собственным шаблоном. В Angular 19+ компоненты standalone по умолчанию и напрямую
  импортируют зависимости шаблона в `imports`.
- **Директива** добавляет поведение существующему элементу или шаблону.
- **Сервис** инкапсулирует состояние, бизнес-логику, data access или интеграцию и обычно получается через `inject()`.
- **Pipe** выполняет чистое преобразование значения для отображения в шаблоне.
- **NgModule** группирует declarations/providers в legacy-архитектуре. Он остается поддерживаемым, но для нового
  приложения базовой моделью являются standalone APIs, `bootstrapApplication()` и route-level providers.

</td></tr></table>

</details>

<details>
<summary>Что такое динамические компоненты и как их можно использовать в Angular?</summary><br>
<table><tr><td>

Динамические компоненты создаются во время выполнения. Типичные случаи: dialogs, overlays, notifications и
конфигурируемые widgets.

В Angular 19–22 есть три основных варианта:

1. `@defer` — лениво загрузить тяжелую часть шаблона.
2. `NgComponentOutlet` — выбрать тип компонента в шаблоне.
3. `ViewContainerRef.createComponent()` — создать компонент императивно.

```ts
@Component({
  selector: 'app-dialog-host',
  template: `
    <ng-container #container />
  `,
})
export class DialogHostComponent {
  private readonly container = viewChild.required('container', {
    read: ViewContainerRef,
  });

  open(): void {
    const componentRef = this.container().createComponent(UserDialogComponent);

    componentRef.setInput('userId', '42');
    componentRef.instance.closed.subscribe(() => componentRef.destroy());
  }
}

export class UserDialogComponent {
  readonly userId = input.required<string>();
  readonly closed = output<void>();
}
```

Для глобальных overlays обычно используют Angular CDK Overlay или API UI-kit. `ComponentFactoryResolver` и
`entryComponents` относятся к legacy-подходу.

</td></tr></table>

</details>

#### Middle

<details>
<summary>Как применить анимацию к компонентам?</summary><br>
<table><tr><td>

В Angular 20.2+ для нового кода рекомендуются CSS-анимации и compiler APIs `animate.enter` / `animate.leave`.

<!-- prettier-ignore -->
```html
@if (isOpen()) {
  <section animate.enter="dialog-enter" animate.leave="dialog-leave">
    ...
  </section>
}
```

```css
.dialog-enter {
  animation: fade-in 180ms ease-out;
}

.dialog-leave {
  animation: fade-out 120ms ease-in;
}
```

Для сложной timeline-анимации можно передать функцию и интегрировать GSAP или другую библиотеку. Нужно учитывать
`prefers-reduced-motion`.

Legacy DSL из `@angular/animations` с `trigger`, `state` и `transition` deprecated, но может встречаться в существующих
приложениях.

</td></tr></table>

</details>

#### Middle+ or Senior

<details>
<summary>Расскажите об основных параметрах @NgModule, @Component, @Directive, @Injectable, @Pipe</summary><br>
<table><tr><td>

В Angular 19–22 основной подход — standalone. Компоненты, директивы и pipes standalone по умолчанию; `standalone: true`
обычно не пишут.

Основные параметры:

- `@Component`: `selector`, `template`/`templateUrl`, `styles`/`styleUrl`, `imports`, `providers`, `viewProviders`,
  `changeDetection`, `encapsulation`, `host`.
- `@Directive`: `selector`, `providers`, `host`, `exportAs`.
- `@Injectable`: `providedIn`.
- `@Pipe`: `name`, `pure`.

Inputs, outputs и queries в новом коде объявляют в классе:

```ts
@Component({
  selector: 'app-user-card',
  imports: [DatePipe],
  templateUrl: './user-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.selected]': 'selected()',
  },
})
export class UserCardComponent {
  readonly user = input.required<User>();
  readonly selected = input(false);
  readonly selectedChange = output<boolean>();
  readonly menu = viewChild(MenuComponent);
}
```

`NgModule` остается поддерживаемым для legacy-кода и некоторых библиотек. Его основные поля: `declarations`, `imports`,
`exports`, `providers` и `bootstrap`. Ivy как отдельная тема собеседования сейчас скорее historical topic:
`entryComponents`, `ComponentFactoryResolver` и `moduleId` в современном Ivy-приложении не нужны.

</td></tr></table>

</details>

### Angular low-level API

#### Junior

<details>
<summary>Для чего нужен Renderer2?</summary><br>
<table><tr><td>

`Renderer2` - low-level API для создания элементов, установки свойств, классов, стилей и слушателей через абстракцию
Angular renderer.

Его используют редко: когда declarative bindings, host metadata или CDK API не подходят. Прямые DOM-операции через
`nativeElement` хуже для SSR, тестов и альтернативных renderers.

</td></tr></table>

</details>

<details>
<summary>Что такое TemplateRef?</summary><br>
<table><tr><td>

`TemplateRef` представляет неотрендеренный фрагмент шаблона, обычно содержимое `<ng-template>`. Сам по себе он ничего не
показывает.

Его можно передать в компонент, получить через query или использовать в структурной директиве, а затем создать embedded
view через `ViewContainerRef`.

</td></tr></table>

</details>

<details>
<summary>Что такое ViewContainerRef?</summary><br>
<table><tr><td>

`ViewContainerRef` - контейнер для динамических views. Через него создают embedded views из `TemplateRef` или компоненты
через `createComponent()`.

Типичные случаи: структурные директивы, dynamic dialogs, plugin-like UI и lazy widgets. Владелец контейнера также
управляет порядком, очисткой и уничтожением созданных views.

</td></tr></table>

</details>

#### Middle

<details>
<summary>Что такое HostListener и почему это legacy API?</summary><br>
<table><tr><td>

`@HostListener` подписывает директиву или компонент на событие host-элемента. API остается рабочим, но для нового кода
обычно используют `host: {'(event)': 'handler($event)'}` или обычные template listeners.

Host listener полезен для поведения директивы, которое принадлежит host-элементу, например hover, focus или keyboard
interaction.

</td></tr></table>

</details>

<details>
<summary>Когда можно использовать ElementRef?</summary><br>
<table><tr><td>

`ElementRef` дает ссылку на host DOM node. Его используют для интеграции с browser API, focus management, измерений или
сторонней библиотекой.

Нельзя без необходимости менять DOM через `nativeElement`: сначала стоит выбрать binding, directive, `Renderer2`, CDK
или template reference. Для пользовательских данных помните про XSS и sanitization.

</td></tr></table>

</details>

<details>
<summary>Чем ViewChild отличается от ContentChild?</summary><br>
<table><tr><td>

`ViewChild` ищет элемент, директиву или компонент внутри собственного view шаблона компонента. `ContentChild` ищет в
контенте, который родитель спроецировал через `<ng-content>`.

View queries доступны после инициализации view, content queries - после инициализации projected content. В новом коде
часто используют signal queries: `viewChild()`, `contentChild()`, `viewChildren()`, `contentChildren()`.

</td></tr></table>

</details>

#### Middle+ or Senior

<details>
<summary>Что такое HostBinding и почему это legacy API?</summary><br>
<table><tr><td>

`@HostBinding` связывает свойство класса со свойством, атрибутом, class или style host-элемента директивы/компонента.
API поддерживается, но для нового кода предпочтителен объект `host` в metadata.

```ts
@Directive({
  selector: '[appBusy]',
  host: {
    '[attr.aria-busy]': 'busy()',
    '[class.busy]': 'busy()',
  },
})
export class BusyDirective {
  readonly busy = input(false);
}
```

</td></tr></table>

</details>

<details>
<summary>Зачем использовать queueMicrotask внутри Angular host listener?</summary><br>
<table><tr><td>

`queueMicrotask()` ставит callback в очередь microtasks. Он выполнится после текущего call stack, но до следующего
`setTimeout(..., 0)` и других tasks. В Angular это иногда полезно, когда на один DOM event подписано несколько директив
или компонентов через host listeners, а код должен прочитать итоговое состояние после завершения всех синхронных
обработчиков текущего события.

Это не универсальное решение и не способ чинить плохую архитектуру. Если порядок действий важен для бизнес-логики, лучше
сделать явную orchestration-логику через сервис, store, output/input или отдельный event coordinator.

Пример неявной зависимости от порядка host listeners:

```ts
@Directive({
  selector: '[appSelectOption]',
  host: {
    '(click)': 'onClick()',
  },
})
export class SelectOptionDirective {
  private readonly selectState = inject(SelectState);

  protected onClick(): void {
    this.selectState.selectOption('first');
  }
}

@Directive({
  selector: '[appCloseDropdown]',
  host: {
    '(click)': 'onClick()',
  },
})
export class CloseDropdownDirective {
  private readonly selectState = inject(SelectState);

  protected onClick(): void {
    this.selectState.closeIfSelected();
  }
}
```

Если `closeIfSelected()` должен прочитать состояние после всех синхронных обработчиков текущего `click`, можно отложить
чтение в microtask:

```ts
@Directive({
  selector: '[appCloseDropdown]',
  host: {
    '(click)': 'onClick()',
  },
})
export class CloseDropdownDirective {
  private readonly selectState = inject(SelectState);

  protected onClick(): void {
    queueMicrotask(() => {
      this.selectState.closeIfSelected();
    });
  }
}
```

Разница с `setTimeout(..., 0)`:

```ts
console.log('start');

queueMicrotask(() => {
  console.log('microtask');
});

setTimeout(() => {
  console.log('timeout');
}, 0);

console.log('end');

// start
// end
// microtask
// timeout
```

Когда может быть полезно:

- дождаться завершения всех синхронных обработчиков текущего event;
- прочитать итоговое состояние после серии синхронных изменений;
- не зависеть от порядка нескольких host listeners на одном событии;
- выполнить легкую post-processing логику до следующего task.

Проблемы и риски:

- появляется скрытая асинхронность;
- сложнее читать и тестировать порядок выполнения;
- можно скрыть архитектурную проблему вместо явной orchestration-логики;
- длинная очередь microtasks может задержать render;
- ошибка внутри callback произойдет уже не в исходном синхронном месте;
- microtask не ждет `setTimeout`, HTTP, animation frame и другие tasks;
- для ожидания DOM render лучше использовать `afterNextRender()`, lifecycle hooks или `requestAnimationFrame()` по
  задаче.

Тестировать можно обычным async-тестом:

```ts
it('closes dropdown after click microtask', async () => {
  directive.onClick();

  await Promise.resolve();

  expect(selectState.isOpen()).toBe(false);
});
```

Или через Angular `fakeAsync`:

```ts
it('closes dropdown after click microtask', fakeAsync(() => {
  directive.onClick();

  flushMicrotasks();

  expect(selectState.isOpen()).toBe(false);
}));
```

</td></tr></table>

</details>

<details>
<summary>Зачем нужен Renderer2 и чем он помогает в отличие от ElementRef.nativeElement или declarative binding в host?</summary><br>
<table><tr><td>

В большинстве host-взаимодействий лучше начинать с declarative bindings в `host`: они читаются как часть контракта
директивы, обновляются Angular и хорошо подходят для class, style, attributes, properties и событий host-элемента.

```ts
@Directive({
  selector: '[appInvalidControl]',
  host: {
    '[attr.aria-invalid]': 'invalid()',
    '[class.invalid]': 'invalid()',
    '(blur)': 'markAsTouched()',
  },
})
export class InvalidControlDirective {
  readonly invalid = input(false);

  protected markAsTouched(): void {
    // ...
  }
}
```

`Renderer2` нужен, когда изменение DOM должно быть императивным: подписка на динамическую цель, создание или удаление
элементов, установка стилей по результатам измерений, интеграция с API, где binding неудобен. Он не делает код полностью
декларативным, но дает Angular renderer abstraction вместо прямой работы с DOM.

```ts
@Directive({
  selector: '[appAutofocus]',
})
export class AutofocusDirective {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);

  ngAfterViewInit(): void {
    this.renderer.setAttribute(this.host.nativeElement, 'tabindex', '-1');
    this.host.nativeElement.focus();
  }
}
```

Отличия:

- `host` bindings — первый выбор для host attributes, classes, styles, properties и listeners.
- `Renderer2` — fallback для императивных DOM-операций, когда binding, directive composition или CDK API не подходят.
- `ElementRef.nativeElement` — raw DOM node; его стоит оставлять для browser API, focus, measurements и сторонних
  библиотек.

Прямой `nativeElement` сильнее привязывает код к browser DOM, хуже переносится на SSR, сложнее тестируется и легче
приводит к небезопасным операциям вроде записи пользовательских данных в `innerHTML`. `Renderer2` уменьшает эти риски за
счет renderer abstraction, но не отменяет необходимость думать о XSS, cleanup и platform-specific поведении.

</td></tr></table>

</details>

<details>
<summary>Для чего нужен NgZone?</summary><br>
<table><tr><td>

`NgZone` связывает Angular change detection с ZoneJS в zone-based приложениях. `runOutsideAngular()` выносит частые
события наружу, а `run()` возвращает выполнение в Angular zone.

В zoneless Angular роль `NgZone` меньше: обновления чаще приходят от signals, template events, `AsyncPipe` и явных
уведомлений change detection.

</td></tr></table>

</details>

### NgModules legacy

#### Junior

<details>
<summary>Как standalone components заменили часть NgModule-сценариев?</summary><br>
<table><tr><td>

Standalone component сам объявляет template dependencies через `imports`. Routes могут lazy-load компонент напрямую и
иметь собственные providers.

```ts
export const routes: Routes = [
  {
    path: 'profile',
    loadComponent: async () => (await import('./profile.component')).ProfileComponent,
  },
];
```

Так меньше скрытых module boundaries, проще lazy loading и понятнее зависимости шаблона.

</td></tr></table>

</details>

#### Middle

<details>
<summary>Зачем раньше был нужен NgModule?</summary><br>
<table><tr><td>

`NgModule` был основной единицей сборки Angular: группировал components, directives, pipes, providers и bootstrap.
Standalone APIs заменили большую часть этих сценариев локальными `imports`, route-level providers и
`bootstrapApplication()`.

`NgModule` остается поддерживаемым legacy/historical topic и встречается в старых приложениях и некоторых libraries.

</td></tr></table>

</details>

<details>
<summary>Чем forRoot отличается от forChild?</summary><br>
<table><tr><td>

`forRoot()` регистрировал singleton providers и глобальную конфигурацию один раз в root module. `forChild()` подключал
директивы/routes без повторной регистрации singleton providers.

Это legacy pattern для NgModule-based libraries. В standalone Angular его часто заменяют `provideX()` functions и
route-level providers.

</td></tr></table>

</details>

<details>
<summary>Для чего использовали SharedModule?</summary><br>
<table><tr><td>

`SharedModule` собирал общие components, directives и pipes, чтобы feature modules могли импортировать их одним модулем.

В standalone-подходе чаще импортируют конкретные зависимости прямо в компонент или route. Это делает связи явнее и
уменьшает случайный общий API.

</td></tr></table>

</details>

<details>
<summary>Почему SharedModule не должен провайдить singleton services для lazy modules?</summary><br>
<table><tr><td>

Lazy module может получить собственный child injector. Если `SharedModule` содержит providers и импортируется в разных
lazy modules, сервис может создаться несколько раз вместо одного singleton.

Singleton services лучше объявлять через `@Injectable({providedIn: 'root'})`, root providers или явные feature/route
providers, если нужен scoped instance.

</td></tr></table>

</details>

#### Middle+ or Senior

<details>
<summary>Что означают declarations, imports, exports и providers в NgModule?</summary><br>
<table><tr><td>

`declarations` объявлял компоненты, директивы и pipes модуля. `imports` подключал другие modules. `exports` делал часть
declarations/imports доступной внешним modules. `providers` регистрировал зависимости в injector.

В standalone-компонентах большую часть `declarations/imports/exports` заменяют локальные `imports` у компонента или
route.

</td></tr></table>

</details>

### Pipes

#### Junior

<details>
<summary>Что такое pure pipe?</summary><br>
<table><tr><td>

Pure pipe пересчитывается только когда меняется ссылка на input или primitive value. Это режим по умолчанию и лучший
выбор для чистых форматирований.

Pipe должен быть без side effects: одинаковый input дает одинаковый output.

</td></tr></table>

</details>

<details>
<summary>Что такое impure pipe?</summary><br>
<table><tr><td>

Impure pipe (`pure: false`) вызывается при каждой проверке change detection, даже если ссылка не изменилась. Он может
быть очень дорогим.

Используйте его только для редких случаев, где нельзя выразить обновление через signals, Observable, immutable update
или pure pipe.

</td></tr></table>

</details>

#### Middle

<details>
<summary>Что делает async pipe?</summary><br>
<table><tr><td>

`AsyncPipe` подписывается на Observable или Promise, возвращает последнее значение, помечает view для проверки при новом
значении и отписывается при уничтожении view.

Он удобен для template-facing streams, но несколько `async` pipe на одном cold Observable создают несколько подписок.

</td></tr></table>

</details>

<details>
<summary>Как создать custom pipe?</summary><br>
<table><tr><td>

Pipe объявляют через `@Pipe` и метод `transform`. В Angular 19+ pipe standalone по умолчанию и импортируется туда, где
используется.

```ts
@Pipe({name: 'initials'})
export class InitialsPipe implements PipeTransform {
  transform(value: string): string {
    return value
      .split(/\s+/)
      .filter(Boolean)
      .map((part) => part[0])
      .join('');
  }
}
```

</td></tr></table>

</details>

<details>
<summary>Когда pipe лучше computed() или helper function?</summary><br>
<table><tr><td>

Pipe хорош для отображения значения в шаблоне: форматирование даты, валюты, имени, статуса, короткого текста. Pure pipe
кеширует результат относительно входных значений и не смешивает rendering с бизнес-логикой.

`computed()` лучше, когда производное значение является частью состояния компонента, используется в нескольких местах
класса или зависит от signals.

Helper function допустима для маленькой чистой операции, но вызов из template может выполняться часто. Если функция
создает новые объекты, фильтрует большие массивы или делает тяжелую работу, лучше `computed()`, pure pipe или
предварительная нормализация данных.

Custom pipe не нужен, если преобразование используется один раз и проще читается как подготовленное поле в компоненте.
Impure pipe почти всегда сигнал, что состояние или поток данных спроектированы неудачно.

</td></tr></table>

</details>

#### Middle+ or Senior

<details>
<summary>Как pipes влияют на performance?</summary><br>
<table><tr><td>

Pure pipes помогают не выполнять одно и то же форматирование на каждом render, если input references стабильны. Impure
pipes и тяжелые преобразования в больших списках могут стать hot path.

Для дорогих вычислений используйте memoization, `computed()`, предварительную нормализацию данных или перенос работы в
сервис. Сначала измеряйте проблему в profiler.

</td></tr></table>

</details>

### Lifecycle и rendering

#### Middle+ or Senior

<details>
<summary>Объясните механизм загрузки (bootstrap) Angular-приложения в браузере?</summary><br>
<table><tr><td>

Современное standalone-приложение запускается через `bootstrapApplication()`:

```ts
import {bootstrapApplication} from '@angular/platform-browser';

import {AppComponent} from './app/app.component';
import {appConfig} from './app/app.config';

bootstrapApplication(AppComponent, appConfig).catch(reportError);
```

```ts
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(withInterceptors([authInterceptor]))],
};
```

Angular создает root `EnvironmentInjector`, регистрирует providers, создает корневой компонент и запускает первый
render.

NgModule-bootstrap через `platformBrowserDynamic().bootstrapModule(AppModule)` остается поддерживаемым для
legacy-приложений, но не является подходом по умолчанию для нового Angular 19–22 кода.

</td></tr></table>

</details>

<details>
<summary>Что происходит после загрузки Angular bundle?</summary><br>
<table><tr><td>

Браузер загружает, парсит и выполняет JavaScript bundle. Entry point вызывает `bootstrapApplication()` или legacy
`bootstrapModule()`, после чего Angular создает root injector (`EnvironmentInjector`), регистрирует root providers,
инициализирует platform services и создает root component.

Дальше запускается initial rendering: Angular строит component tree, выполняет bindings, создает DOM nodes и подключает
event listeners. Если подключен Router, стартовая навигация выбирает route, может загрузить lazy bundle, выполнить
guards/resolvers и отрендерить routed component.

При SSR/SSG пользователь может увидеть HTML до client bundle. После загрузки bundle Angular выполняет hydration:
связывает существующий DOM с component tree, providers и обработчиками событий. Large bundle, тяжелые initializers,
blocking guards или hydration mismatch задерживают интерактивность.

</td></tr></table>

</details>

<details>
<summary>Как происходит взаимодействие компонентов в Angular (опишите components view)?</summary><br>
<table><tr><td>

Основные способы взаимодействия:

1. **Родитель передает данные ребенку** через `input()`.
2. **Ребенок сообщает о событии** через `output()`.
3. **Двусторонний контракт** компонента объявляется через `model()`.
4. **Доступ к дочернему view** выполняется через signal queries: `viewChild()`, `viewChildren()`.
5. **Несвязанные компоненты** взаимодействуют через feature-сервис состояния, Router или общий store.

```ts
@Component({
  selector: 'app-parent',
  template: `
    <app-counter
      [count]="count()"
      (increment)="count.set($event)"
    />
  `,
})
export class ParentComponent {
  readonly count = signal(0);
}

@Component({
  selector: 'app-counter',
  template: `
    <button
      type="button"
      (click)="increment.emit(count() + 1)"
    >
      +1
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent {
  readonly count = input.required<number>();
  readonly increment = output<number>();
}
```

Для двухсторонней привязки:

```ts
export class QuantityComponent {
  readonly value = model(0);
}
```

```html
<app-quantity [(value)]="quantity" />
```

Для общего синхронного состояния сервис может инкапсулировать writable signal и наружу отдавать readonly signal. RxJS
используют для асинхронных потоков и сложной координации.

`@Input`, `@Output`, `EventEmitter` и decorator queries поддерживаются, но functional signal APIs предпочтительны для
нового кода.

</td></tr></table>

</details>

<details>
<summary>Каков жизненный цикл у компонентов?</summary><br>
<table><tr><td>

Angular 19–22 поддерживает классические lifecycle hooks и render callbacks.

Классические hooks:

- ngOnChanges() - вызывается когда Angular переприсваивает привязанные данные к input properties. Метод получает объект
  SimpleChanges, со старыми и новыми значениями. Вызывается перед NgOnInit и каждый раз, когда изменяется одно или
  несколько связанных свойств.
- ngOnInit() - инициализирует директиву/компонент после того, как Angular впервые отобразит связанные свойства и
  устанавливает входящие параметры.
- ngDoCheck() - при обнаружении изменений, которые Angular не может самостоятельно обнаружить, реагирует на них.
- ngAfterContentInit() - вызывается после того, как Angular спроецирует внешний контент в отображение компонента или
  отображение с директивой. Вызывается единожды, после первого ngDoCheck().
- ngAfterContentChecked() - реагирует на проверку Angular-ом проецируемого содержимого. Вызывается после
  ngAfterContentInit() и каждый последующий ngDoCheck().
- ngAfterViewInit() - вызывается после инициализации отображения компонента и дочерних/директив. Вызывается единожды,
  после первого ngAfterContentChecked().
- ngAfterViewChecked() - реагирует на проверку отображения компонента и дочерних/директив. Вызывается после
  ngAfterViewInit() и каждый последующий ngAfterContentChecked().
- ngOnDestroy() - после уничтожения директивы/компонента выполняется очистка. Отписывает Observables и отключает
  обработчики событий, чтобы избежать утечек памяти.

Современные render callbacks:

- `afterNextRender()` выполняется после следующего завершенного render.
- `afterEveryRender()` выполняется после каждого render.
- `afterRenderEffect()` связывает DOM side effect с signals.

Для cleanup удобно использовать `DestroyRef` и `takeUntilDestroyed()`:

```ts
export class SearchComponent {
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.search.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((query) => this.load(query));
  }
}
```

При signal inputs многие реакции выражаются через `computed()` или `effect()`, но `ngOnChanges` остается полезен, если
нужны одновременно previous и current values.

</td></tr></table>

</details>

<details>
<summary>В каком порядке вызываются lifecycle hooks?</summary><br>
<table><tr><td>

При первом render порядок обычно такой: `ngOnChanges`, `ngOnInit`, `ngDoCheck`, `ngAfterContentInit`,
`ngAfterContentChecked`, `ngAfterViewInit`, `ngAfterViewChecked`. При последующих проверках вызываются check hooks, а
при уничтожении - `ngOnDestroy`.

Render callbacks вроде `afterNextRender()` выполняются после завершенного render и удобны для DOM-зависимой логики.

</td></tr></table>

</details>

<details>
<summary>Для чего нужен ngOnChanges?</summary><br>
<table><tr><td>

`ngOnChanges` вызывается, когда Angular устанавливает или изменяет decorator inputs, и передает `SimpleChanges` с
previous/current values.

Он полезен, когда реакция зависит от сравнения старого и нового значения. В signal input коде часто хватает `computed()`
или `effect()`, если previous value не нужен.

</td></tr></table>

</details>

<details>
<summary>Когда использовать ngAfterViewInit?</summary><br>
<table><tr><td>

`ngAfterViewInit` вызывается после создания view компонента и его view children. Его используют для логики, которой
нужны view queries, DOM-элементы или child components.

Менять уже проверенное состояние прямо в этом hook опасно: можно получить ошибку проверки. Часто лучше использовать
`afterNextRender()`.

</td></tr></table>

</details>

<details>
<summary>Когда использовать ngAfterContentInit?</summary><br>
<table><tr><td>

`ngAfterContentInit` вызывается после инициализации контента, спроецированного через `<ng-content>`. Он подходит для
работы с `contentChild()` и `contentChildren()`.

Если нужен элемент из собственного шаблона компонента, это view lifecycle, а не content lifecycle.

</td></tr></table>

</details>

<details>
<summary>Чем view lifecycle отличается от content lifecycle?</summary><br>
<table><tr><td>

Content lifecycle относится к projected content, который родитель передал внутрь компонента. View lifecycle относится к
собственному шаблону компонента и его view children.

Поэтому `ContentChild` становится доступен раньше в content hooks, а `ViewChild` - в view hooks.

</td></tr></table>

</details>

<details>
<summary>Как lifecycle связан с subscriptions, effects и cleanup?</summary><br>
<table><tr><td>

Все, что живет дольше одного synchronous render, должно иметь понятный lifetime: подписки, DOM listeners, timers,
WebSocket, observer APIs и effects.

В Angular для cleanup используют:

- `ngOnDestroy`, если класс явно реализует lifecycle hook;
- `DestroyRef.onDestroy()`, если cleanup удобнее зарегистрировать рядом с setup;
- `takeUntilDestroyed()` для imperative RxJS subscriptions;
- cleanup-функцию внутри `effect()`, если effect создает внешний ресурс.

```ts
export class LiveSearchComponent {
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => this.search(value));

    const intervalId = window.setInterval(() => this.tick(), 1000);

    this.destroyRef.onDestroy(() => window.clearInterval(intervalId));
  }
}
```

`AsyncPipe`, `toSignal()` и finite `HttpClient` requests обычно управляют подпиской сами. Ручная подписка нужна, когда
есть imperative side effect или интеграция с внешним API.

</td></tr></table>

</details>

<details>
<summary>Что такое Shadow DOM и как с ним работать в Angular?</summary><br>
<table><tr><td>

Shadow DOM — браузерный механизм инкапсуляции DOM-поддерева и стилей web component. Внешние стили по умолчанию не
проникают внутрь shadow tree, а внутренние не влияют на остальную страницу.

Angular поддерживает режимы `ViewEncapsulation`:

- `Emulated` — режим по умолчанию: Angular эмулирует изоляцию CSS с помощью служебных атрибутов.
- `ShadowDom` — создает настоящий shadow root средствами браузера.
- `None` — стили компонента становятся глобальными.

```ts
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrl: './player.component.css',
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class PlayerComponent {}
```

При `ShadowDom` нужно учитывать наследуемые CSS-свойства, CSS custom properties, slots/content projection, тестирование
и интеграцию с глобальной дизайн-системой. `::ng-deep` устарел и не должен быть основным способом стилизации.

</td></tr></table>

</details>

<details>
<summary>Что такое Data Binding и какие проблемы связанные с ним вы знаете?</summary><br>
<table><tr><td>

Data Binding связывает template expression со свойством, атрибутом, классом, стилем или событием.

```html
<h2>{{ user().name }}</h2>
<button
  [disabled]="saving()"
  (click)="save()"
>
  Сохранить
</button>
<div
  [attr.aria-label]="label()"
  [class.active]="active()"
></div>
```

Для component inputs и outputs используется тот же синтаксис:

```html
<app-editor
  [document]="document()"
  (saved)="handleSaved($event)"
/>
```

Двусторонняя привязка раскрывается в input + output `<name>Change`. В современном компоненте контракт удобно объявлять
через `model()`:

```ts
readonly value = model("");
```

```html
<app-editor [(value)]="draft" />
```

Типичные проблемы: тяжелые вычисления в шаблоне, вызовы методов с side effects, мутация объектов с OnPush, неявный
сложный two-way data flow и неправильное различение property binding и attribute binding.

</td></tr></table>

</details>

<details>
<summary>Как вы используете одностороннюю и двухстороннюю привязку данных?</summary><br>
<table><tr><td>

Односторонняя привязка имеет явное направление:

```html
<h2>{{ title }}</h2>
<button
  [disabled]="isSaving"
  (click)="save()"
>
  Сохранить
</button>
```

- `{{ value }}` и `[property]="value"` передают данные из компонента в представление.
- `(event)="handler($event)"` передает событие из представления в компонент.

Двусторонняя привязка объединяет property и event binding:

```html
<input [(ngModel)]="name" />
```

Для компонентов предпочтителен model input:

```ts
readonly value = model("");
```

`model()` автоматически создает input `value` и output `valueChange`. Two-way binding удобен для локального состояния
элемента управления, но при сложном data flow явные `input()`/`output()` или форма обычно легче для отладки.

</td></tr></table>

</details>

<details>
<summary>В чем преимущества и недостатки Regular DOM (Angular) перед Virtual DOM (React)?</summary><br>
<table><tr><td>

Формулировка упрощает реальность: и Angular, и React в итоге обновляют настоящий DOM, но используют разные модели
определения изменений.

Angular компилирует шаблон в точные инструкции создания и обновления узлов. Ему не обязательно каждый раз строить новое
виртуальное дерево и сравнивать его целиком. React обычно создает новое представление Virtual DOM и выполняет
reconciliation.

Преимущества подхода Angular:

- компилятор заранее знает, какие bindings нужно обновлять;
- предсказуемая структура шаблонов;
- хорошая интеграция change detection, signals и DI.

Возможные недостатки:

- лишние проверки при неудачно спроектированном change detection;
- сложнее интеграция ручных DOM-изменений;
- производительность сильно зависит от структуры компонентов, `track`, неизменяемых обновлений и границ реактивности.

Нельзя утверждать, что один подход всегда быстрее. Нужно измерять конкретный сценарий: большие списки, частые события,
startup, memory и стоимость обновления.

</td></tr></table>

</details>

<details>
<summary>Что такое ngZone?</summary><br>
<table><tr><td>

`NgZone` — сервис интеграции Angular с ZoneJS. В zone-based приложении ZoneJS патчит асинхронные browser APIs и помогает
Angular определить момент, когда может потребоваться синхронизация представления.

Важно для Angular 19–22:

- Angular 19 обычно использует ZoneJS, если приложение не настроено иначе.
- В Angular 20 zoneless включается через `provideZonelessChangeDetection()`.
- Начиная с Angular 21 zoneless является режимом по умолчанию.

В zoneless-приложении Angular получает точные уведомления от signals, template/host listeners, `AsyncPipe`,
`markForCheck()` и установки inputs.

`runOutsideAngular()` полезен в zone-based приложениях для частых событий сторонней библиотеки. В новом коде
предпочтительны точные реактивные уведомления, а не ручной глобальный `tick()`.

</td></tr></table>

</details>

<details>
<summary>Как обновлять представление, если ваша модель данных обновляется вне 'зоны'?</summary><br>
<table><tr><td>

В современном Angular предпочтительно записать новое значение в signal. Это работает и в zoneless-приложении:

```ts
export class ClockComponent {
  readonly time = signal(new Date());

  constructor() {
    setInterval(() => this.time.set(new Date()), 1000);
  }
}
```

Если сторонний callback изменяет обычное поле, можно вызвать `ChangeDetectorRef.markForCheck()`. `detectChanges()`
применяют для локальной немедленной проверки в специальных интеграционных сценариях.

`ApplicationRef.tick()` проверяет все приложение и почти никогда не должен быть обычным решением. `NgZone.run()`
актуален только для zone-based интеграций.

Ниже приведены legacy-варианты ручного запуска change detection.

1. Используя метод `ApplicationRef.prototype.tick`, который запустит `change detection` на всем дереве компонентов.

```ts
import {Component, ApplicationRef, NgZone} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Hello, {{ name }}!</h1>
  `,
})
export class AppComponent {
  public name: string = null;

  constructor(
    private app: ApplicationRef,
    private zone: NgZone,
  ) {
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        this.name = window.prompt('What is your name?', 'Jake');
        this.app.tick();
      }, 5000);
    });
  }
}
```

2. Используя метод `NgZone.prototype.run`, который также запустит `change detection` на всем дереве.

```ts
import {Component, NgZone} from '@angular/core';
import {SomeService} from './some.service';

@Component({
  selector: 'app-root',
  template: `
    <h1>Hello, {{ name }}!</h1>
  `,
  providers: [SomeService],
})
export class AppComponent {
  public name: string = null;

  constructor(
    private zone: NgZone,
    private service: SomeService,
  ) {
    this.zone.runOutsideAngular(() => {
      this.service.getName().then((name: string) => {
        this.zone.run(() => (this.name = name));
      });
    });
  }
}
```

Метод `run` под капотом сам вызывает `tick`, а параметром принимает функцию, которую нужно выполнить перед `tick`. То
есть:

```ts
this.zone.run(() => (this.name = name));

// идентично

this.name = name;
this.app.tick();
```

3. Используя метод `ChangeDetectorRef.prototype.detectChanges`, который запустит `change detection` на текущем
   компоненте и дочерних.

```ts
import {Component, NgZone, ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Hello, {{ name }}!</h1>
  `,
})
export class AppComponent {
  public name: string = null;

  constructor(
    private zone: NgZone,
    private ref: ChangeDetectorRef,
  ) {
    this.zone.runOutsideAngular(() => {
      this.name = window.prompt('What is your name?', 'Jake');
      this.ref.detectChanges();
    });
  }
}
```

</td></tr></table>

</details>

<details>
<summary>Что такое output(), EventEmitter и как подписываться на события?</summary><br>
<table><tr><td>

Для нового компонента custom event объявляют через `output()`:

```ts
export class SaveButtonComponent {
  readonly saved = output<SaveResult>();

  save(): void {
    this.saved.emit({status: 'success'});
  }
}
```

```html
<app-save-button (saved)="handleSaved($event)" />
```

`output()` возвращает `OutputEmitterRef`. На output динамического компонента можно подписаться программно:

```ts
const subscription = componentRef.instance.saved.subscribe(handleSaved);
subscription.unsubscribe();
```

Angular автоматически очищает подписки при уничтожении компонента. Outputs не всплывают по DOM.

`@Output() readonly saved = new EventEmitter<SaveResult>()` остается поддерживаемым legacy API. `EventEmitter` не
следует использовать как event bus в сервисах; для сервисов подходят signals или RxJS.

</td></tr></table>

</details>

### Angular component styling

#### Junior

<details>
<summary>Для чего нужен :host в стилях компонента?</summary><br>
<table><tr><td>

`:host` выбирает host-элемент текущего компонента. Это удобно для layout, display, CSS custom properties и состояний,
которые принадлежат самому компоненту.

```css
:host {
  display: block;
}

:host(.compact) {
  --card-gap: 8px;
}
```

</td></tr></table>

</details>

<details>
<summary>Для чего нужен :host-context?</summary><br>
<table><tr><td>

`:host-context(.theme-dark)` применяет стиль компонента, если один из предков host-элемента соответствует selector. Его
используют для theme flags и интеграции с внешним layout context.

Не стоит строить на нем сложную зависимость от DOM-иерархии: темы обычно надежнее передавать через CSS custom properties
или явные classes.

</td></tr></table>

</details>

<details>
<summary>Что такое ViewEncapsulation?</summary><br>
<table><tr><td>

`ViewEncapsulation` управляет областью действия component styles: `Emulated` эмулирует изоляцию атрибутами, `ShadowDom`
использует настоящий shadow root, `None` делает стили глобальными.

Режим выбирают по требованиям дизайн-системы, SSR, theming и интеграции со сторонними стилями.

</td></tr></table>

</details>

<details>
<summary>Как стилизовать projected content?</summary><br>
<table><tr><td>

Projected content принадлежит родительскому view, поэтому стили дочернего компонента с encapsulation не всегда
применяются к внутренним элементам projection.

Надежные варианты: стилизовать wrapper вокруг `<ng-content>`, договориться о public classes/parts, передать CSS custom
properties или дать родителю управлять разметкой и стилями projected content.

</td></tr></table>

</details>

#### Middle

<details>
<summary>Почему ::ng-deep считают legacy escape hatch?</summary><br>
<table><tr><td>

`::ng-deep` пробивает style encapsulation и влияет на вложенные компоненты. Это legacy escape hatch для сложных
интеграций, а не основной инструмент дизайна.

Предпочтительнее public theming API, CSS variables, component inputs/classes, global styles для настоящих global rules
или настройка дизайн-системы.

</td></tr></table>

</details>

### Dependency Injection

#### Junior

<details>
<summary>Что такое Singleton Service и с какой целью его используют в Angular?</summary><br>
<table><tr><td>

Это сервисы, объявленные в приложении и имеющие один экземпляр на все приложение. Его можно объявить двумя способами:

- `@Injectable({providedIn: "root"})` — предпочтительный tree-shakable вариант.
- Зарегистрировать provider в `ApplicationConfig` при `bootstrapApplication()`.

Provider в компоненте или route создает scoped instance, а не глобальный singleton. При lazy routes могут существовать
дочерние `EnvironmentInjector`.

```ts
@Injectable({providedIn: 'root'})
export class SessionService {
  private readonly userState = signal<User | null>(null);
  readonly user = this.userState.asReadonly();
}
```

NgModule `providers` остается legacy-вариантом.

</td></tr></table>

</details>

#### Middle+ or Senior

<details>
<summary>Чем DI-паттерн отличается от Angular DI?</summary><br>
<table><tr><td>

Dependency Injection как паттерн означает, что класс не создает зависимости сам, а получает их снаружи. Это уменьшает
связанность и упрощает тестирование.

Angular DI — конкретная реализация этого паттерна: Angular хранит providers в иерархии injectors, находит dependency по
token и управляет lifetime экземпляров. Базовый пример Angular DI см. в вопросе
[«Что такое DI в Angular?»](#angular-core).

</td></tr></table>

</details>

<details>
<summary>Как можно определить свой обработчик ErrorHandler, Logging, Cache в Angular?</summary><br>
<table><tr><td>

Глобальные необработанные ошибки можно направить в собственный `ErrorHandler`:

```ts
@Injectable()
export class AppErrorHandler implements ErrorHandler {
  handleError(error: unknown): void {
    reportError(error);
  }
}

export const appConfig: ApplicationConfig = {
  providers: [{provide: ErrorHandler, useClass: AppErrorHandler}],
};
```

HTTP-ошибки, logging и HTTP-cache удобно централизовать функциональными interceptors через
`provideHttpClient(withInterceptors([...]))`.

Важно разделять ответственность:

- ожидаемую ошибку обрабатывает ближайший feature и показывает понятное состояние UI;
- interceptor добавляет общий контекст, авторизацию, retry только для безопасных случаев;
- глобальный `ErrorHandler` является последней границей и отправляет диагностику;
- logger скрывается за собственным интерфейсом, чтобы заменить реализацию и отключить чувствительные данные.

Не следует автоматически повторять все запросы или кешировать мутации.

</td></tr></table>

</details>

### Angular Change Detection

#### Middle+ or Senior

<details>
<summary>Что такое Change Detection, как работает Change Detection Mechanism?</summary><br>
<table><tr><td>

Change Detection — синхронизация состояния приложения с DOM. Angular выполняет скомпилированные инструкции шаблона и
обновляет bindings, значения которых изменились.

Angular должен получить уведомление, что view может быть dirty. Основные источники:

- изменение signal, прочитанного шаблоном;
- установка input;
- template или host listener;
- новое значение в `AsyncPipe`;
- `ChangeDetectorRef.markForCheck()`;
- подключение или удаление view.

В zone-based приложении ZoneJS также планирует синхронизацию после async-задач. В zoneless Angular опирается на точные
уведомления; начиная с Angular 21 zoneless используется по умолчанию.

Во время одной проверки Angular обходит дерево views сверху вниз. Не следует менять уже проверенное состояние во время
рендера.

</td></tr></table>

</details>

<details>
<summary>Сколько Change Detector(ов) может быть во всем приложении?</summary><br>
<table><tr><td>

У каждого component view есть собственное представление change detection, связанное в дерево views. Ivy как отдельная
тема является historical topic: сегодня это обычный runtime Angular, а его внутренние структуры `LView`/`TView` не
являются публичным API. `AbstractChangeDetector` не является актуальной моделью публичного API.

Через `ChangeDetectorRef` можно пометить view для проверки, локально проверить его, detach или reattach. Обычно signals
и bindings отправляют необходимые уведомления автоматически.

</td></tr></table>

</details>

<details>
<summary>Основное отличие constructor от ngOnInit?</summary><br>
<table><tr><td>

Конструктор — механизм JavaScript/TypeScript. Angular создает экземпляр класса и предоставляет injection context,
поэтому зависимости можно получать через `inject()` в инициализаторах полей.

`ngOnInit()` — lifecycle hook Angular. Он вызывается один раз после установки initial inputs и до проверки дочерних
views.

Signal inputs можно читать в `ngOnInit`, `computed()` и `effect()`. Для чистых производных значений лучше `computed()`,
а не копирование input в отдельное поле.

Для DOM-зависимой логики используют `afterNextRender()`/`afterEveryRender()` или after-view hooks.

</td></tr></table>

</details>

<details>
<summary>Чем markForCheck() отличается от detectChanges(), detach() и reattach()?</summary><br>
<table><tr><td>

- `markForCheck()` помечает view и предков для проверки в следующем scheduled change detection.
- `detectChanges()` немедленно проверяет текущую view и ее дочерние views.
- `detach()` исключает view из обычного дерева проверок.
- `reattach()` возвращает ее обратно.

Для OnPush обычно нужен `markForCheck()`. `detectChanges()` используют на узких интеграционных границах. `detach()`
оправдан для редко обновляемых тяжелых views, если команда явно управляет их обновлением.

</td></tr></table>

</details>

<details>
<summary>Что такое coalescing Change Detection и как найти лишние проверки?</summary><br>
<table><tr><td>

Coalescing объединяет несколько событий или вызовов `NgZone.run()` в одну проверку, уменьшая повторную работу в
zone-based приложении.

Диагностика:

- Angular DevTools Profiler показывает change detection и render cost;
- Chrome Performance помогает найти long tasks, layout и scripting;
- временный счетчик в development-сборке показывает частоту вызова hot-path;
- тяжелые template methods заменяют `computed()` или pure pipe;
- проверяют мутации, частые DOM events и слишком широкое общее состояние.

Сначала измеряют конкретный сценарий, затем оптимизируют component boundaries, список, вычисления или scheduling.

</td></tr></table>

</details>

<details>
<summary>Что такое zoneless Angular?</summary><br>
<table><tr><td>

Zoneless Angular — режим, в котором Angular не полагается на ZoneJS для глобального перехвата async APIs. Вместо этого
view помечается dirty точными уведомлениями:

- изменился signal, прочитанный шаблоном;
- сработал template или host listener;
- компонент получил новый input;
- `AsyncPipe` получил значение;
- вызван `markForCheck()`;
- view была создана, подключена или удалена.

В Angular 20 zoneless включали через `provideZonelessChangeDetection()`. Начиная с Angular 21 это режим по умолчанию для
новых приложений.

Практический смысл: меньше магии вокруг async tasks и больше явных реактивных источников. Код, который меняет обычное
поле из стороннего callback и рассчитывает на ZoneJS, нужно перевести на signal, `AsyncPipe` или явный
`ChangeDetectorRef.markForCheck()`.

</td></tr></table>

</details>

<details>
<summary>Какие существуют стратегии обнаружения изменений?</summary><br>
<table><tr><td>

Есть две стратегии:

- `Default` (`CheckAlways`) — view участвует в каждой запланированной проверке.
- `OnPush` (`CheckOnce`) — Angular может пропустить subtree, пока компонент не получит уведомление об изменении.

`OnPush`-компонент проверяется, когда:

- изменился input по сравнению через `Object.is`;
- событие обработано в его subtree;
- изменился signal, прочитанный шаблоном;
- `AsyncPipe` получил значение;
- вызван `markForCheck()` или view создано/подключено.

```ts
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    {{ user().name }}
  `,
})
export class UserCardComponent {
  readonly user = input.required<User>();
}
```

Нельзя мутировать объект input на месте и ожидать новую ссылку. Предпочтительны immutable updates и signals.

</td></tr></table>

</details>

### Angular Signals

#### Middle+ or Senior

<details>
<summary>Что такое Signals и когда их использовать?</summary><br>
<table><tr><td>

Signal — реактивный контейнер для значения. Angular отслеживает чтение signal и обновляет зависящие от него вычисления и
представления при изменении.

```ts
export class CounterComponent {
  readonly count = signal(0);
  readonly doubled = computed(() => this.count() * 2);

  increment(): void {
    this.count.update((value) => value + 1);
  }
}
```

- `signal()` хранит изменяемое состояние.
- `computed()` описывает чистое производное значение.
- `effect()` запускает побочный эффект и должен использоваться только для интеграции с внешними системами.
- Значение изменяют через `set()` или `update()`, не мутируя объект внутри signal напрямую.
- `linkedSignal()` создает writable state, которое пересчитывается при изменении источника, но может временно
  редактироваться пользователем.
- `resource()`/`httpResource()` описывают асинхронные данные в signal-модели; перед использованием нужно учитывать
  статус API в конкретной версии Angular.
- `toSignal()` и `toObservable()` связывают signals с RxJS на границах.
- `untracked()` читает signal без регистрации зависимости.

Inputs и queries также являются signals:

```ts
export class SearchComponent {
  readonly query = input('');
  readonly field = viewChild.required<ElementRef<HTMLInputElement>>('field');
  readonly normalizedQuery = computed(() => this.query().trim().toLowerCase());
}
```

Signals подходят для локального синхронного состояния, derived state и template-facing значений. RxJS удобнее для
отмены, событий во времени, WebSocket, polling и сложной оркестрации. Эти инструменты дополняют друг друга.

</td></tr></table>

</details>

<details>
<summary>В чем разница между input(), output() и model()?</summary><br>
<table><tr><td>

- `input()` принимает данные от родителя и возвращает readonly `InputSignal`.
- `output()` объявляет custom event и возвращает `OutputEmitterRef`.
- `model()` создает writable input для two-way binding и автоматически добавляет output `<name>Change`.

```ts
export class QuantityComponent {
  readonly min = input(1);
  readonly max = input.required<number>();
  readonly changed = output<number>();
  readonly value = model(1);

  increment(): void {
    const nextValue = Math.min(this.value() + 1, this.max());

    this.value.set(nextValue);
    this.changed.emit(nextValue);
  }
}
```

```html
<app-quantity
  [min]="1"
  [max]="10"
  [(value)]="quantity"
  (changed)="saveQuantity($event)"
/>
```

`input()` поддерживает required inputs, aliases и transforms. `model()` используют, когда ребенок действительно должен
изменять связанное значение; для обычного события достаточно `output()`.

`@Input` и `@Output` поддерживаются, но signal-based APIs рекомендуются для нового кода.

</td></tr></table>

</details>

<details>
<summary>В чем разница между computed(), effect() и linkedSignal()?</summary><br>
<table><tr><td>

`computed()` создает readonly производное значение. Вычисление lazy, memoized и не должно иметь side effects:

```ts
readonly fullName = computed(() => `${this.firstName()} ${this.lastName()}`);
```

`effect()` выполняет побочный эффект при изменении прочитанных signals:

```ts
effect(() => this.analytics.trackQuery(this.query()));
```

`effect()` не используют для копирования состояния из одного signal в другой: это может создать циклы и лишние renders.
Для derived state нужен `computed()`.

`linkedSignal()` подходит для writable state, которое зависит от источника, но может быть изменено пользователем.
Например, выбранный элемент сбрасывается при загрузке нового списка:

```ts
readonly options = input.required<ReadonlyArray<Option>>();
readonly selected = linkedSignal(() => this.options()[0] ?? null);
```

Кратко: `computed` — вычислить, `effect` — синхронизироваться с внешней системой, `linkedSignal` — хранить редактируемое
зависимое состояние.

</td></tr></table>

</details>

<details>
<summary>Когда использовать resource(), httpResource() и RxJS?</summary><br>
<table><tr><td>

`resource()` связывает async loader с signal-параметрами и предоставляет `value`, `status`, `error` и loading state.
`httpResource()` делает похожую модель для `HttpClient`.

Они удобны, когда компоненту нужен один текущий async-result, зависящий от signals:

```ts
readonly userId = input.required<string>();

readonly user = resource({
  params: () => ({id: this.userId()}),
  loader: ({params, abortSignal}) =>
    fetch(`/api/users/${params.id}`, {signal: abortSignal}).then((response) =>
      response.json(),
    ),
});
```

RxJS предпочтительнее для сложных событий во времени: WebSocket, polling, debounce, объединение потоков,
backpressure-подобные сценарии и явная композиция операторов.

`resource()` и `httpResource()` развиваются между Angular 19–22, поэтому перед использованием проверяют статус API в
целевой версии. На границе с существующим RxJS-кодом используют `toSignal()` и `toObservable()`.

</td></tr></table>

</details>

### RxJS

#### Middle+ or Senior

<details>
<summary>Чем cold Observable отличается от hot Observable?</summary><br>
<table><tr><td>

Cold Observable запускает producer отдельно для каждой подписки. `HttpClient` возвращает cold Observable: каждый
`subscribe()` отправляет новый запрос.

Hot Observable имеет общий producer для подписчиков. Примеры: DOM events, WebSocket, `Subject`.

`share()` превращает cold stream в совместно используемый hot stream на время подписчиков. `shareReplay()` дополнительно
повторяет последние значения новым подписчикам.

</td></tr></table>

</details>

<details>
<summary>Как выбрать switchMap, mergeMap, concatMap или exhaustMap?</summary><br>
<table><tr><td>

- `switchMap` отменяет предыдущую inner subscription: autocomplete, route params.
- `mergeMap` выполняет параллельно: независимые uploads или writes.
- `concatMap` сохраняет очередь и порядок: последовательные изменения.
- `exhaustMap` игнорирует новые события до завершения текущего: защита submit/login от двойного клика.

Для mutation-запросов `switchMap` опасен, если отмена предыдущей операции нарушает ожидания пользователя.

</td></tr></table>

</details>

<details>
<summary>Как построить autocomplete с отменой запроса?</summary><br>
<table><tr><td>

```ts
readonly results$ = this.search.valueChanges.pipe(
  map((value) => value.trim()),
  debounceTime(300),
  distinctUntilChanged(),
  switchMap((query) =>
    query.length < 2
      ? of([])
      : this.api.search(query).pipe(
          catchError(() => of([])),
        ),
  ),
);
```

`switchMap` отписывается от прошлого HTTP Observable, а Angular отменяет запрос. `catchError` находится внутри
`switchMap`, поэтому ошибка одного запроса не завершает поток пользовательского ввода.

</td></tr></table>

</details>

<details>
<summary>Где ставить catchError: внутри или снаружи switchMap?</summary><br>
<table><tr><td>

Внутри — если ошибка относится к одной inner operation и внешний поток должен продолжить работать:

```ts
source$.pipe(switchMap((value) => request(value).pipe(catchError(() => of(fallback)))));
```

Снаружи — если любая ошибка должна завершить или полностью заменить весь pipeline. Для UI events чаще нужен внутренний
`catchError`.

</td></tr></table>

</details>

<details>
<summary>Какие проблемы возможны у shareReplay()?</summary><br>
<table><tr><td>

`shareReplay({bufferSize: 1, refCount: true})` часто используют для дедупликации чтения.

Риски:

- Observable создается заново при каждом getter-вызове;
- кеш не инвалидируется после mutation/logout;
- без подходящего `refCount` источник может жить дольше подписчиков;
- большой buffer удерживает память;
- кеширование error/loading смешивается с кешированием данных.

Нужно явно определить ключ, срок жизни, refresh и очистку кеша.

</td></tr></table>

</details>

<details>
<summary>Когда нужна ручная отписка и что делает takeUntilDestroyed()?</summary><br>
<table><tr><td>

От finite streams (`HttpClient`, `first()`, `take(1)`) вручную отписываться не нужно. `AsyncPipe` и `toSignal()`
управляют подпиской автоматически.

От бесконечных streams в imperative subscription нужно отписаться:

```ts
private readonly destroyRef = inject(DestroyRef);

ngOnInit(): void {
  this.events$
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((event) => this.handle(event));
}
```

`takeUntilDestroyed()` завершает stream при уничтожении текущего injection context.

</td></tr></table>

</details>

<details>
<summary>Чем combineLatest, withLatestFrom и forkJoin отличаются?</summary><br>
<table><tr><td>

- `combineLatest` после initial values эмитит при изменении любого источника.
- `withLatestFrom` эмитит только когда срабатывает основной source, добавляя последние значения других streams.
- `forkJoin` ждет завершения всех источников и один раз возвращает их последние значения.

`forkJoin` подходит для параллельных finite HTTP-запросов, но никогда не завершится с бесконечным stream.

</td></tr></table>

</details>

<details>
<summary>Чем debounceTime, throttleTime и auditTime отличаются?</summary><br>
<table><tr><td>

- `debounceTime` ждет паузу: поиск после остановки ввода.
- `throttleTime` пропускает первое значение и ограничивает частоту следующих.
- `auditTime` после окна отдает последнее накопленное значение.

Для resize/scroll часто подходит `auditTime`, для autocomplete — `debounceTime`, для ограничения частых действий —
`throttleTime`.

</td></tr></table>

</details>

<details>
<summary>Для чего нужен RxJS и какую проблему он решает?</summary><br>
<table><tr><td>

RxJS предоставляет модель потоков для асинхронных значений и событий. Он помогает декларативно описывать:

- HTTP-запросы и их отмену;
- пользовательский ввод;
- WebSocket и polling;
- объединение нескольких источников;
- retry, timeout, debounce, кеширование;
- управление временем жизни подписок.

```ts
readonly users$ = this.search.valueChanges.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap((query) => this.api.search(query)),
);
```

Сила RxJS не в замене Promise, а в композиции последовательностей из нуля, одного или многих значений. Для простого
локального синхронного состояния в Angular чаще достаточно signals; для сложной асинхронной координации RxJS остается
подходящим инструментом.

</td></tr></table>

</details>

<details>
<summary>Что такое Observable?</summary><br>
<table><tr><td>

Observable - ленивый поток значений. Он начинает работу при подписке и может передать ноль, одно или несколько значений,
ошибку и сигнал завершения.

</td></tr></table>

</details>

<details>
<summary>Что такое Observer, subscription и обработка ошибок в Observable?</summary><br>
<table><tr><td>

Observer — объект или набор callbacks, который получает уведомления Observable:

- `next(value)` для очередного значения;
- `error(error)` для ошибки;
- `complete()` для завершения.

Subscription — результат `subscribe()`. Через него можно отменить выполнение и освободить ресурсы.

```ts
const subscription = source$.subscribe({
  next: (value) => this.handleValue(value),
  error: (error) => this.handleError(error),
  complete: () => this.finish(),
});

subscription.unsubscribe();
```

Если не передать `error` handler, ошибка все равно завершит stream и может попасть в глобальную обработку. В UI-коде
часто лучше обрабатывать ошибку оператором `catchError`, чтобы вернуть явное error-state или fallback-значение.

</td></tr></table>

</details>

<details>
<summary>Для чего нужны map, tap и filter в RxJS?</summary><br>
<table><tr><td>

`map` преобразует значение, `filter` пропускает только подходящие значения, `tap` выполняет побочный эффект без
изменения значения.

```ts
readonly activeUserNames$ = this.users$.pipe(
  map((users) => users.filter((user) => user.active)),
  tap((users) => this.metrics.reportVisibleUsers(users.length)),
  map((users) => users.map((user) => user.name)),
);
```

`tap` не должен становиться местом бизнес-трансформаций: если значение нужно изменить, используйте `map`. Для async
операций, возвращающих Observable, используют flattening operators: `switchMap`, `mergeMap`, `concatMap`, `exhaustMap`.

</td></tr></table>

</details>

<details>
<summary>В чем разница между Observable и Promise?</summary><br>
<table><tr><td>

Promise возвращает один будущий результат и начинает выполнение сразу после создания. Observable ленивый, может передать
несколько значений и предоставляет операторы для композиции, повторов и отмены через отписку.

Для одного простого результата подходит Promise. Для пользовательских событий, WebSocket, polling и сложной координации
потоков обычно используют RxJS.

</td></tr></table>

</details>

<details>
<summary>Чем Observable отличается от Subject?</summary><br>
<table><tr><td>

`Subject` одновременно является Observable и observer: в него можно передавать значения через `next()`, а один экземпляр
рассылает их нескольким подписчикам.

Обычный cold Observable обычно запускает producer отдельно для каждой подписки. `BehaviorSubject` требует начальное
значение и сразу передает новому подписчику текущее значение.

</td></tr></table>

</details>

<details>
<summary>В чем разница между Subject, BehaviorSubject, ReplaySubject, AsyncSubject?</summary><br>
<table><tr><td>

- `Subject` передает только новые значения после подписки.
- `BehaviorSubject` хранит текущее значение и сразу отдает его новому подписчику.
- `ReplaySubject` повторяет заданное число предыдущих значений.
- `AsyncSubject` после завершения передает последнее значение.

Для состояния Angular-компонента чаще используют signals. Subject остается полезен на RxJS-границах и для потоков
событий.

</td></tr></table>

</details>

<details>
<summary>Чем отличаются switchMap, mergeMap и concatMap?</summary><br>
<table><tr><td>

- `switchMap` отменяет предыдущий внутренний stream при новом значении. Подходит для поиска.
- `mergeMap` выполняет внутренние streams параллельно. Подходит для независимых операций.
- `concatMap` ставит внутренние streams в очередь и сохраняет порядок.

</td></tr></table>

</details>

<details>
<summary>Как бы вы кешировали наблюдаемые данные из потоков (stream)?</summary><br>
<table><tr><td>

Способ зависит от срока жизни, ключа и политики инвалидирования кеша. Для совместного использования результата
HTTP-запроса часто применяют `shareReplay`.

```ts
private readonly users$ = this.http.get<ReadonlyArray<User>>("/api/users").pipe(
  shareReplay({bufferSize: 1, refCount: true}),
);
```

Нужно учитывать:

- `shareReplay` кеширует результат конкретного экземпляра Observable, поэтому Observable нельзя создавать заново при
  каждом обращении.
- Ошибки, завершение и `refCount` влияют на повторную подписку.
- Для кеша по ключу используют `Map<Key, Observable<Value>>`.
- Нужна явная политика очистки: TTL, logout, mutation, manual refresh.
- Для данных, изменяемых командами, часто понятнее сервис-хранилище с signal/Subject, чем неявный вечный кеш.

На уровне HTTP также применяют browser cache, `Cache-Control`, `ETag` и service worker. Кеширование на разных уровнях
решает разные задачи.

</td></tr></table>

</details>

### RxJS practical cases

#### Middle+ or Senior

<details>
<summary>Как избежать race condition в RxJS-загрузке данных?</summary><br>
<table><tr><td>

Race condition возникает, когда более старый async result приходит позже нового и перезаписывает актуальное состояние.
Для route params, поиска и фильтров обычно используют `switchMap`, чтобы отменять прошлый запрос.

Для write operations чаще выбирают `concatMap` или `exhaustMap`, потому что отмена mutation может сломать
пользовательский сценарий.

</td></tr></table>

</details>

<details>
<summary>Как выполнить API-запросы строго по порядку?</summary><br>
<table><tr><td>

Используйте `concatMap`: он ставит inner Observables в очередь и запускает следующий только после завершения
предыдущего.

```ts
readonly saved$ = this.saveClicks.pipe(concatMap((draft) => this.api.save(draft)));
```

Для независимых запросов подойдет `mergeMap`, но порядок завершения там не гарантирован.

</td></tr></table>

</details>

<details>
<summary>Как переиспользовать результат запроса между routes?</summary><br>
<table><tr><td>

Вынесите загрузку и кеш в сервис, который живет дольше конкретного route component: root service, feature provider или
route-level provider на общем parent route.

Компоненты читают один и тот же stream/signal из сервиса. Ключ кеша должен учитывать params, пользователя и правила
инвалидирования.

</td></tr></table>

</details>

<details>
<summary>Как объединить route params и UI events?</summary><br>
<table><tr><td>

Route params и UI events превращают в streams и объединяют через `combineLatest` или `withLatestFrom`, затем загружают
данные через подходящий flattening operator.

```ts
readonly page$ = combineLatest([
  this.route.paramMap.pipe(map((params) => params.get('id'))),
  this.filtersChanged.pipe(startWith(defaultFilters)),
]).pipe(switchMap(([id, filters]) => this.api.load(id, filters)));
```

Важно задать initial value для UI stream, иначе `combineLatest` будет ждать первое событие.

</td></tr></table>

</details>

<details>
<summary>Чем scan отличается от reduce в RxJS?</summary><br>
<table><tr><td>

`scan` накапливает состояние и эмитит промежуточный результат на каждое входящее значение. Он подходит для UI state,
progress и event reducers.

`reduce` эмитит только один финальный результат после completion source. Для бесконечных streams вроде clicks или
WebSocket он не отдаст значение, пока stream не завершится.

</td></tr></table>

</details>

### Angular Forms

#### Middle+ or Senior

<details>
<summary>Чем Reactive Forms отличаются от template-driven forms?</summary><br>
<table><tr><td>

Reactive Forms создают model в TypeScript, дают typed controls, synchronous state и удобное тестирование. Они подходят
сложным формам и динамической структуре.

Template-driven forms создают model преимущественно через directives в шаблоне. Они удобны для небольших простых форм,
но хуже масштабируются.

В Angular 21–22 для нового signal-first кода доступны Signal Forms. Выбор зависит от версии и архитектуры существующего
проекта.

</td></tr></table>

</details>

<details>
<summary>Чем setValue отличается от patchValue и что делают emitEvent/onlySelf?</summary><br>
<table><tr><td>

- `setValue()` требует полную структуру control tree.
- `patchValue()` обновляет только переданные поля.
- `{emitEvent: false}` подавляет `valueChanges`, `statusChanges` и unified events.
- `{onlySelf: true}` не распространяет обновление validity/value к родителю.

Эти флаги используют осторожно: подавленное событие может оставить derived state несинхронизированным.

</td></tr></table>

</details>

<details>
<summary>Что такое ControlValueAccessor и когда писать свой CVA?</summary><br>
<table><tr><td>

`ControlValueAccessor` связывает Angular Forms с кастомным UI-контролом. Его пишут для date picker, rich editor, slider
или составного input, который должен работать с `formControl`, `formControlName` и `ngModel`.

Методы:

- `writeValue(value)` — получить значение модели;
- `registerOnChange(fn)` — сохранить callback изменения;
- `registerOnTouched(fn)` — сохранить callback touched;
- `setDisabledState(isDisabled)` — синхронизировать disabled.

Контрол регистрируется через multi-provider `NG_VALUE_ACCESSOR`. Нельзя вызывать `onChange` из `writeValue`, иначе
возникнет feedback loop.

</td></tr></table>

</details>

<details>
<summary>Как правильно реализовать disabled, touched и dirty в кастомном контроле?</summary><br>
<table><tr><td>

- `setDisabledState()` меняет доступность внутренних элементов.
- `onTouched()` вызывают при первом осмысленном blur/interaction.
- `onChange(value)` вызывают только при пользовательском изменении.
- `dirty` Angular устанавливает после `onChange`; вручную дублировать state обычно не нужно.
- Контрол должен сохранять keyboard navigation, label association и ARIA.

Для составного контрола нужно определить, когда группа считается touched и какое значение считается атомарным.

</td></tr></table>

</details>

<details>
<summary>Как строить nested и reusable forms без лишних подписок?</summary><br>
<table><tr><td>

Родитель может передать дочернему компоненту typed `FormGroup`, отдельные controls или доменную model. Дочерний reusable
control не должен искать родительскую форму через хрупкий DOM hierarchy без необходимости.

Derived validation и UI state лучше получать из control state или signals. Если нужна подписка на `valueChanges`,
используют `takeUntilDestroyed()`, `distinctUntilChanged()` и не создают одну подписку на каждую строку большого списка
без причины.

</td></tr></table>

</details>

<details>
<summary>Что такое FormGroup и FormControl и для чего они используются?</summary><br>
<table><tr><td>

В strictly typed Reactive Forms:

- `FormControl<T>` хранит значение, validation status и interaction state одного поля.
- `FormGroup<TControls>` объединяет именованные controls.
- `FormArray<TControl>` управляет динамическим списком controls.
- `FormRecord<TControl>` управляет группой с динамическими строковыми ключами.

```ts
readonly form = new FormGroup({
  email: new FormControl("", {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
  }),
  rememberMe: new FormControl(false, {nonNullable: true}),
});
```

`NonNullableFormBuilder` сокращает boilerplate. Типизированные формы доступны давно и должны использоваться без
`UntypedFormGroup`, если нет legacy-ограничений.

</td></tr></table>

</details>

<details>
<summary>Что такое реактивные формы в Angular?</summary><br>
<table><tr><td>

Reactive Forms — стабильный model-driven API на основе `AbstractControl`. Модель формы создается в TypeScript, имеет
синхронный доступ к value/status и Observable-потоки `valueChanges`/`statusChanges`.

В Angular 21+ также доступны Signal Forms из `@angular/forms/signals`. Они строятся вокруг signal-модели, `form()` и
директивы `[formField]`:

```ts
readonly loginModel = signal({
  email: "",
  password: "",
});

readonly loginForm = form(this.loginModel, (schema) => {
  required(schema.email);
  email(schema.email);
  required(schema.password);
});
```

```html
<input
  type="email"
  [formField]="loginForm.email"
/>
```

Signal Forms лучше подходят новым signal-first приложениям на Angular 21–22. Для Angular 19–20 и существующих
production-приложений strictly typed Reactive Forms остаются надежным выбором.

</td></tr></table>

</details>

<details>
<summary>Как применять валидацию для простых и сложных форм?</summary><br>
<table><tr><td>

В Reactive Forms валидаторы передают control при создании или через `setValidators`/`addValidators`.

- Синхронный `ValidatorFn` возвращает `ValidationErrors | null`.
- Асинхронный `AsyncValidatorFn` возвращает Promise/Observable и запускается после успешных синхронных проверок.
- Cross-field validator размещают на `FormGroup`.
- Ошибки показывают после `touched`/`dirty` или попытки submit, а не сразу при первом render.

```ts
const passwordsMatch: ValidatorFn = (control) => {
  const password = control.get('password')?.value;
  const confirmation = control.get('confirmation')?.value;

  return password === confirmation ? null : {passwordsMismatch: true};
};
```

Signal Forms используют schema validators: `required`, `email`, `minLength`, `validate`, `validateAsync` и правила для
cross-field logic.

Backend всегда повторно валидирует данные: frontend-валидация нужна для UX, а не является границей безопасности.

</td></tr></table>

</details>

<details>
<summary>Что такое NgForm?</summary><br>
<table><tr><td>

`NgForm` - директива template-driven forms, которая автоматически создает form model для `<form>` и собирает controls с
`ngModel`.

Она удобна для простых форм, но для сложной typed logic, динамических controls и тестирования чаще выбирают Reactive
Forms или Signal Forms в новых версиях Angular.

</td></tr></table>

</details>

<details>
<summary>Для чего нужен FormBuilder?</summary><br>
<table><tr><td>

`FormBuilder` сокращает boilerplate при создании Reactive Forms. В строго типизированных формах часто используют
`NonNullableFormBuilder`, чтобы controls не получали `null` без явной причины.

```ts
readonly form = this.formBuilder.nonNullable.group({
  email: ['', [Validators.required, Validators.email]],
});
```

</td></tr></table>

</details>

<details>
<summary>Что означают dirty, touched и pristine в Angular Forms?</summary><br>
<table><tr><td>

`pristine` означает, что пользователь еще не менял значение control. `dirty` - значение было изменено пользователем.
`touched` - control потерял focus после взаимодействия.

Обычно validation errors показывают после `touched` или `dirty`, чтобы форма не ругалась сразу при первом render.

</td></tr></table>

</details>

<details>
<summary>Как показывать validation errors в template?</summary><br>
<table><tr><td>

Показывайте ошибку, когда control invalid и пользователь уже взаимодействовал с полем или отправил форму. Условие лучше
держать простым и не вызывать тяжелые функции в template.

<!-- prettier-ignore -->
```html
@if (email.invalid && (email.touched || submitted())) {
  @if (email.hasError('required')) {
    <p>Укажите email</p>
  }
}
```

Текст ошибки должен быть рядом с полем и связан с ним доступным способом, например через `aria-describedby`.

</td></tr></table>

</details>

<details>
<summary>Как работают async validators?</summary><br>
<table><tr><td>

Async validator возвращает Promise или Observable с `ValidationErrors | null`. Angular запускает его после успешных
синхронных validators и переводит control в статус `PENDING` до результата.

Типичный пример - проверка уникальности username. Внутри нужно отменять/ограничивать лишние запросы и не считать
frontend-валидацию границей безопасности.

</td></tr></table>

</details>

### Angular HTTP

#### Middle

<details>
<summary>Что такое Authorization header?</summary><br>
<table><tr><td>

Header передает credentials или token по выбранной схеме. Пример: `Authorization: Bearer <token>`. Его отправляют только
по HTTPS доверенному origin и не выводят в логи.

</td></tr></table>

</details>

<details>
<summary>Что такое Bearer token?</summary><br>
<table><tr><td>

Это token, право использования которого получает любой владелец значения. Он не доказывает владение отдельным ключом,
поэтому утечка дает доступ до истечения или отзыва. Scope и срок жизни должны быть минимальными.

</td></tr></table>

</details>

<details>
<summary>Что такое preflight request?</summary><br>
<table><tr><td>

Browser отправляет `OPTIONS` перед некоторыми cross-origin requests, чтобы проверить разрешенные method и headers.
Server отвечает CORS headers. Preflight может кешироваться, но неправильная конфигурация блокирует основной запрос.

</td></tr></table>

</details>

<details>
<summary>Что такое cookie?</summary><br>
<table><tr><td>

Cookie — небольшая пара name/value, которую browser хранит для domain/path и автоматически отправляет подходящим
requests. Флаги `HttpOnly`, `Secure` и `SameSite` снижают часть рисков. Cookies имеют ограничения размера и требуют
продуманной CSRF-защиты.

</td></tr></table>

</details>

<details>
<summary>Что такое авторизация через токены?</summary><br>
<table><tr><td>

После аутентификации сервер выдает credential, например access token. Клиент прикладывает его к запросам, а сервер
проверяет подпись, срок действия и права.

Access token обычно живет недолго. Refresh token позволяет получить новый access token и требует более строгой защиты и
ротации.

</td></tr></table>

</details>

<details>
<summary>Чем cookie отличается от localStorage?</summary><br>
<table><tr><td>

Cookie автоматически участвует в HTTP и может быть `HttpOnly`; `localStorage` доступен JavaScript и не отправляется
автоматически. Оба механизма привязаны к origin/domain rules. Секретный token в localStorage уязвим при XSS.

</td></tr></table>

</details>

<details>
<summary>Где хранить access token и refresh token?</summary><br>
<table><tr><td>

Универсального ответа нет. Частый browser-подход:

- access token хранится в памяти приложения;
- refresh token находится в `HttpOnly`, `Secure`, `SameSite` cookie и недоступен JavaScript.

`localStorage` переживает перезагрузку, но доступен при XSS. Cookie автоматически отправляется браузером, поэтому
требует корректной CSRF-защиты. Решение зависит от backend, доменов и threat model.

</td></tr></table>

</details>

<details>
<summary>Как проектировать API layer и типизировать backend contracts?</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>

<details>
<summary>Почему CORS preflight может стать performance-проблемой?</summary><br>
<table><tr><td>

Preflight - дополнительный `OPTIONS` запрос перед небезопасным cross-origin запросом. Он появляется из-за некоторых
methods, headers или content types. На плохой сети лишний round trip заметен, особенно для частых API-вызовов.

Решения: корректно кешировать preflight через `Access-Control-Max-Age`, избегать лишних custom headers, держать API на
том же origin через reverse proxy или проектировать batching. Нельзя "лечить" это отключением browser security.

```http
Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Methods: GET, POST
Access-Control-Max-Age: 600
```

</td></tr></table>

</details>

<details>
<summary>Что делает <code>X-Frame-Options</code>?</summary><br>
<table><tr><td>

`X-Frame-Options` запрещает или ограничивает встраивание страницы во frame, защищая от clickjacking. Современная
альтернатива — CSP directive `frame-ancestors`, она гибче и позволяет точнее задать разрешенные origins. Для Angular SPA
header обычно настраивают на уровне web server или CDN.

</td></tr></table>

</details>

<details>
<summary>Что такое CDN и зачем он нужен?</summary><br>
<table><tr><td>

CDN хранит копии статических или кешируемых ресурсов ближе к пользователям и снижает latency, нагрузку на origin и риск
перегрузки. Для Angular deployment CDN особенно полезен для content-hashed assets, HTML delivery, security headers,
invalidation и rollback. Важно понимать, какие responses кешируются browser cache, а какие CDN cache.

</td></tr></table>

</details>

<details>
<summary>Как делать retry и отмену HTTP-запросов?</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>

<details>
<summary>Как реализовать refresh token без бесконечного цикла?</summary><br>
<table><tr><td>

Auth interceptor:

1. Не перехватывает login/refresh endpoints.
2. На `401` запускает только один общий refresh request.
3. Остальные запросы ждут его результат.
4. После успеха повторяются один раз с новым token.
5. При ошибке refresh очищается session и выполняется logout.

Нужно различать истекший token и отсутствие permissions. Счетчик/контекст запроса предотвращает повторный refresh loop.

</td></tr></table>

</details>

<details>
<summary>Как мокать HTTP в Angular-тестах?</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>

<details>
<summary>Как Angular-приложение взаимодействует с backend API?</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>

#### Middle+ or Senior

<details>
<summary>Как моделировать loading, error и data state HTTP-запроса?</summary><br>
<table><tr><td>

Состояния должны быть взаимоисключающими:

```ts
type RemoteData<T> =
  | {status: 'idle'}
  | {status: 'loading'}
  | {status: 'success'; data: T}
  | {status: 'error'; error: string};
```

Для signal-first чтения подходят `resource()`/`httpResource()`. Для RxJS — stream состояния через `switchMap`, `map`,
`catchError` и `startWith`. Не стоит хранить независимые `isLoading`, `data`, `error`, если они допускают противоречивые
комбинации.

</td></tr></table>

</details>

<details>
<summary>Что такое HTTP Interceptors?</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>

### Angular Router

#### Middle+ or Senior

<details>
<summary>Чем RouterLink, navigate() и navigateByUrl() отличаются?</summary><br>
<table><tr><td>

- `RouterLink` — декларативная доступная навигация в шаблоне.
- `navigate(commands, extras)` строит URL из command segments относительно route.
- `navigateByUrl(url, extras)` принимает готовый URL или `UrlTree`.

Для обычной ссылки используют `<a routerLink>`, сохраняя browser semantics. Programmatic navigation нужна после command:
submit, login, wizard step.

</td></tr></table>

</details>

<details>
<summary>Чем route params, query params и data отличаются?</summary><br>
<table><tr><td>

- Path params идентифицируют ресурс: `/users/:id`.
- Query params описывают фильтр, сортировку и pagination.
- Static `data` хранит route metadata.
- Resolver data загружается перед активацией.

`snapshot` подходит, если component instance гарантированно создается заново. При reuse одного компонента для другого
param значения подписываются на `paramMap`/`queryParamMap` или преобразуют их в signals.

</td></tr></table>

</details>

<details>
<summary>Когда resolver лучше загрузки внутри компонента?</summary><br>
<table><tr><td>

Resolver полезен, если route нельзя корректно показать без критических данных или redirect должен произойти до
активации.

Загрузка внутри компонента лучше, когда:

- данные необязательны;
- можно сразу показать shell/skeleton;
- запрос медленный;
- нужна независимая повторная загрузка.

Ошибку resolver обрабатывают локально через `catchError` с `RedirectCommand` или глобально через
`withNavigationErrorHandler()`.

</td></tr></table>

</details>

<details>
<summary>Что такое preloading strategy?</summary><br>
<table><tr><td>

Preloading загружает lazy chunks после initial navigation, чтобы будущий переход был быстрее.

- `NoPreloading` ничего не загружает заранее.
- `PreloadAllModules` загружает все lazy routes.
- Custom `PreloadingStrategy` учитывает route data, сеть, permissions и вероятность перехода.

Preloading не активирует route и не должен бесконтрольно загружать тяжелые admin features мобильному пользователю.

</td></tr></table>

</details>

<details>
<summary>Что такое nested, auxiliary routes и RouteReuseStrategy?</summary><br>
<table><tr><td>

Nested routes отображаются во вложенных `<router-outlet>` и наследуют часть route tree.

Auxiliary routes используют named outlets для независимых UI-областей, например persistent chat или side panel.

`RouteReuseStrategy` может detach и повторно attach route subtree, сохраняя component state. Это мощный, но сложный API:
нужно контролировать memory, invalidation и lifecycle. Часто состояние фильтра проще хранить в URL или feature store.

</td></tr></table>

</details>

<details>
<summary>Как тестировать Angular Router?</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>

<details>
<summary>Что такое роутинг и как его создать в Angular?</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>

<details>
<summary>Каков жизненный цикл у Angular Router?</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>

### Login, logout и guards

#### Middle+ or Senior

<details>
<summary>Что такое SSO и как оно обычно работает в frontend-приложении?</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>

<details>
<summary>Как в Angular организовать login/logout и router guard для защищенных страниц?</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>

<details>
<summary>Что такое ленивая загрузка (Lazy-loading) и для чего она используется?</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>

<details>
<summary>В чем разница между Routing и Navigation?</summary><br>
<table><tr><td>

**Routing** — конфигурация соответствия URL и состояния приложения: routes, параметры, guards, resolvers, outlets,
redirects и lazy-loading.

**Navigation** — конкретный процесс перехода из текущего URL/route state в новый. Он может начаться через `RouterLink`,
`router.navigate()`, кнопки браузера или изменение адреса.

Во время navigation Router распознает URL, выполняет redirects, guards и resolvers, активирует или переиспользует
компоненты, обновляет URL и публикует события. Навигация может завершиться успешно, быть отменена, пропущена или
завершиться ошибкой.

</td></tr></table>

</details>

<details>
<summary>Как загрузить данные до того как активируется роут?</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>

### Feature toggles в Angular

#### Middle+ or Senior

<details>
<summary>Как использовать feature toggle в Angular?</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>

<details>
<summary>Как защитить route через feature toggle?</summary><br>
<table><tr><td>

Функциональный `CanMatchFn` не даст Router выбрать route с выключенной фичей:

```ts
import {inject} from '@angular/core';
import {CanMatchFn} from '@angular/router';

export const newCheckoutGuard: CanMatchFn = () => inject(FeatureFlagsService).isEnabled('newCheckout');
```

Flags config должен быть загружен до первой навигации или guard должен дождаться его асинхронно. Этот guard управляет
навигацией, но не заменяет backend authorization.

</td></tr></table>

</details>

<details>
<summary>Как использовать feature toggle в Angular-шаблоне?</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>

### Управление состоянием

#### Junior

<details>
<summary>Что такое управление состоянием приложения?</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>

<details>
<summary>Когда достаточно component state?</summary><br>
<table><tr><td>

Когда состояние принадлежит одному component subtree: open/closed, выбранная вкладка, черновик формы. Оно легко
уничтожается вместе с UI и не создает глобальных зависимостей. При необходимости state можно поднять к ближайшему общему
владельцу.

</td></tr></table>

</details>

#### Middle

<details>
<summary>Когда достаточно сервиса с signal?</summary><br>
<table><tr><td>

Для синхронного feature state с несколькими consumers и понятными methods обновления. Сервис владеет writable signals и
наружу отдает readonly state/computed values. Scope provider определяет lifetime.

</td></tr></table>

</details>

<details>
<summary>Как не превратить сервис состояния в god object?</summary><br>
<table><tr><td>

Разделять state по feature/domain ownership, держать commands узкими и выносить data access отдельно. Не смешивать
несвязанные формы, router, HTTP и analytics в одном singleton. Public API должен быть меньше внутренней реализации.

</td></tr></table>

</details>

#### Middle+ or Senior

<details>
<summary>Когда использовать RxJS store service?</summary><br>
<table><tr><td>

Когда состояние строится из HTTP, WebSocket, cancellation, debounce и нескольких async streams. RxJS хорошо выражает
время, конкуренцию и backpressure. Следует избегать ручных nested subscriptions и скрытого mutable state.

</td></tr></table>

</details>

<details>
<summary>Что такое facade pattern в Angular state management?</summary><br>
<table><tr><td>

Facade предоставляет компонентам узкий API чтения состояния и выполнения use cases, скрывая store/RxJS/HTTP details. Это
уменьшает связанность UI с выбранной библиотекой. Facade не должна становиться механическим proxy без domain value.

</td></tr></table>

</details>

<details>
<summary>В чем отличие между NGRX, NGXS, Akita и какую проблему они решают?</summary><br>
<table><tr><td>

Все эти решения помогают организовать общее состояние и предсказуемые изменения, но используют разные модели.

- **NgRx** следует Redux-подходу: actions, reducers, selectors, effects. Самый строгий и многословный вариант, с сильной
  экосистемой и devtools.
- **NGXS** использует классы состояния и decorators, требует меньше шаблонного кода, но сильнее опирается на собственные
  абстракции.
- **Akita** моделирует store/query/service и удобна для entity-состояния. Перед выбором нужно проверять актуальность
  поддержки и совместимость с версией Angular.

State manager не нужен автоматически. Для небольшого приложения signals и сервисов часто достаточно. Библиотека
оправдана, когда сложность координации, отладки и единообразия выше стоимости новой зависимости и дополнительного кода.

</td></tr></table>

</details>

### Security

#### Middle+ or Senior

<details>
<summary>Что такое XSS и как Angular защищает от XSS?</summary><br>
<table><tr><td>

XSS, или Cross-Site Scripting, - атака, при которой злоумышленник добивается выполнения своего JavaScript в контексте
чужого сайта. Если такой код запустился, он выполняется как код этого сайта: может читать данные страницы, вызывать API
от имени пользователя и использовать обычные browser-возможности текущего origin.

Ожидаемый ответ на собеседовании: XSS возникает, когда пользовательская строка попадает в HTML/JavaScript context как
код, а не как данные. Самый простой пример без Angular - ручная вставка строки через `innerHTML`.

```js
const comment = new URLSearchParams(location.search).get('comment');

document.querySelector('#comments').innerHTML = comment;
```

Если пользователь откроет учебную ссылку:

```text
https://example.com?comment=<img src=x onerror="alert('XSS')">
```

браузер может распарсить значение `comment` как HTML и выполнить inline handler. Проблема не в `URLSearchParams`, а в
том, что значение из URL без проверки стало частью DOM как HTML.

Ожидаемый ответ на вопрос про `innerHTML`: `innerHTML` опасен тем, что парсит строку как HTML-разметку. Поэтому
пользовательская строка может превратиться в элемент, attribute, URL, inline handler или другой исполняемый browser
context. Даже если `<script>` в конкретном месте не выполнится, остаются другие опасные HTML-конструкции, поэтому нельзя
считать `innerHTML` безопасным для пользовательского ввода.

Безопаснее использовать `textContent`, когда нужно показать именно текст:

```js
const comment = new URLSearchParams(location.search).get('comment');

document.querySelector('#comments').textContent = comment;
```

Ожидаемый ответ на вопрос про `textContent`: `textContent` вставляет строку как текстовое содержимое node. Символы `<`,
`>`, кавычки и другие специальные символы не становятся HTML-разметкой, поэтому строка остается данными. Экранирование
работает по той же идее: оно не дает пользовательской строке перейти из data context в code context.

Angular по умолчанию защищает самые частые места вывода данных:

- interpolation `{{ value }}` выводит текст, а не HTML. Строка `<script>alert(1)</script>` будет показана как текст и не
  выполнится;
- property binding учитывает security context. Например, `[href]`, `[src]`, `[style]` и `[innerHTML]` проходят разные
  проверки;
- `[innerHTML]` не просто вставляет строку в DOM, а пропускает HTML через Angular sanitization и удаляет опасные части,
  например `script` и inline event handlers;
- Angular sanitization снижает риск, но не превращает произвольный пользовательский HTML в полностью безопасный формат.

Ожидаемый ответ на вопрос про Angular interpolation: `{{ comment }}` безопаснее ручной вставки HTML, потому что Angular
выводит значение как текст и экранирует опасные символы для HTML context.

```html
<div>{{ comment }}</div>
```

Такой binding подходит для комментариев, имен пользователей, заголовков и других обычных строк. Если `comment` равен
`<img src=x onerror="alert('XSS')">`, пользователь увидит текст, а не выполняемый HTML.

Ожидаемый ответ на вопрос про `[innerHTML]`: `[innerHTML]` допустим, когда приложение осознанно показывает
форматированный HTML: например, заранее проверенную статью из CMS, результат trusted markdown-пайплайна или HTML,
прошедший server-side sanitization по allowlist. Даже в этом случае нужно понимать, какие tags и attributes разрешены, и
желательно дополнительно использовать CSP.

```html
<div [innerHTML]="comment"></div>
```

Такой binding опасен, если `comment` - пользовательский ввод, параметр URL, текст из формы, непроверенный ответ внешнего
API или HTML из CMS без строгой очистки. Angular sanitizer удалит часть опасных конструкций, но разработчик все равно
перевел значение из простого text context в HTML context и расширил поверхность атаки.

Опасное место - `DomSanitizer.bypassSecurityTrustHtml`. Этот метод говорит Angular: "я уже проверил это значение, не
санитизируй его". Если туда попала строка от пользователя, CMS, markdown-parser или внешнего API без строгой серверной
очистки, защита Angular фактически отключается.

```ts
import {inject} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

export class ArticleComponent {
  private readonly sanitizer = inject(DomSanitizer);

  // Плохо: нельзя доверять HTML, который пришел от пользователя или внешнего API.
  readonly trustedHtml = this.sanitizer.bypassSecurityTrustHtml(this.articleFromApi.html);
}
```

Особенно опасно применять `bypassSecurityTrustHtml` к пользовательскому вводу:

```ts
this.sanitizer.bypassSecurityTrustHtml(comment);
```

Ожидаемый ответ: `bypassSecurityTrustHtml` - не sanitizer, а явное отключение sanitizer для конкретного значения. Его
можно использовать только для HTML, который создан приложением или прошел доверенную очистку до попадания в Angular. Для
комментариев, профилей, query params и HTML из непроверенного источника этот метод применять нельзя.

Ожидаемый ответ на вопрос про обход CSRF: XSS часто опаснее CSRF, потому что XSS-код выполняется уже внутри
`mysite.com`. Для браузера это same-origin JavaScript, а не запрос с чужого сайта. Поэтому такой код может читать
обычные cookie этого домена, получать DOM-данные и отправлять requests с теми же правами, что и легитимный frontend.

Учебный пример:

```js
fetch('/api/change-email', {
  method: 'POST',
  headers: {
    'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({email: 'attacker@example.com'}),
});
```

Если CSRF-token хранится в обычной cookie, которую должен читать frontend, XSS-код на этом же origin тоже может ее
прочитать и отправить header. `HttpOnly` защищает session cookie от чтения через JavaScript, но не отменяет XSS-риск
полностью: браузер все равно приложит session cookie к same-origin запросу, а вредный код сможет инициировать действие
от имени текущего пользователя. Поэтому CSRF-token, `SameSite` и `HttpOnly` важны, но они не заменяют защиту от XSS.

Backend тоже обязан участвовать в защите:

- валидировать входные данные и не хранить опасный HTML без необходимости;
- санитизировать пользовательский HTML allowlist-подходом, если форматированный HTML действительно нужен;
- экранировать данные при server-side rendering, генерации писем и HTML-страниц;
- отдавать Content Security Policy и по возможности включать Trusted Types;
- не возвращать секреты и долгоживущие токены в доступные JavaScript данные.

</td></tr></table>

</details>

<details>
<summary>Что такое CSRF?</summary><br>
<table><tr><td>

CSRF, или Cross-Site Request Forgery, - атака, при которой злоумышленник заставляет браузер авторизованного пользователя
отправить запрос на доверенный сайт.

Типичный сценарий:

1. Пользователь залогинен на `mysite.com`, а сессия хранится в cookie.
2. В этой же browser-сессии он открывает `bad-site.com`.
3. Плохой сайт не может прочитать cookie `mysite.com`: browser same-origin policy это запрещает.
4. Но плохой сайт может инициировать запрос на `https://mysite.com/api/transfer`.
5. Браузер автоматически приложит подходящие cookie `mysite.com` к запросу на `mysite.com`.

Если backend проверяет только наличие session cookie и не проверяет CSRF-token, `Origin`/`Referer` или `SameSite`,
запрос может выглядеть как действие настоящего пользователя.

CORS не является полноценной CSRF-защитой. CORS в первую очередь ограничивает чтение ответа JavaScript-кодом из другого
origin. Он не гарантирует, что state-changing request вообще не уйдет на сервер. Кроме того, простые requests могут быть
отправлены без preflight, а HTML-формы исторически умеют отправлять cross-site POST. Поэтому backend должен отдельно
защищать операции изменения состояния.

</td></tr></table>

</details>

<details>
<summary>Как CSRF-защита выглядит в Angular?</summary><br>
<table><tr><td>

Angular `HttpClient` умеет читать CSRF-token из cookie и отправлять его в отдельном header. В standalone-конфигурации
это настраивается через `provideHttpClient` и `withXsrfConfiguration`.

```ts
import {provideHttpClient, withXsrfConfiguration} from '@angular/common/http';

export const appConfig = {
  providers: [
    provideHttpClient(
      withXsrfConfiguration({
        cookieName: 'XSRF-TOKEN',
        headerName: 'X-XSRF-TOKEN',
      }),
    ),
  ],
};
```

При такой схеме:

- сервер выставляет cookie `XSRF-TOKEN`;
- Angular читает значение cookie;
- Angular добавляет header `X-XSRF-TOKEN` к mutating HTTP-запросам, для которых работает его XSRF-механизм;
- сервер сравнивает header с ожидаемым token и отклоняет запрос, если token отсутствует или не совпадает.

Важно: Angular не генерирует CSRF-token и не решает, валиден ли он. Он только переносит значение из cookie в header.
Генерация, привязка к сессии, срок жизни и проверка token - ответственность backend.

</td></tr></table>

</details>

<details>
<summary>Когда создается CSRF-token?</summary><br>
<table><tr><td>

CSRF-token создает backend. Обычно token появляется в один из моментов:

- при первом открытии сайта, когда сервер создает anonymous/session context;
- при логине, вместе с пользовательской сессией;
- через отдельный endpoint, например `GET /api/csrf`, если SPA сначала должна получить token перед mutating requests.

Token должен быть случайным, достаточно длинным и непредсказуемым. Обычно он привязан к server-side session или к
подписанному session context. Нельзя использовать захардкоженную строку вроде `csrf-token`, потому что злоумышленник
сможет отправить такой же header.

Пример идеи на backend:

```ts
app.get('/api/csrf', (request, response) => {
  const token = crypto.randomUUID();

  request.session.csrfToken = token;
  response.cookie('XSRF-TOKEN', token, {
    sameSite: 'lax',
    secure: true,
  });
  response.sendStatus(204);
});
```

В реальном приложении лучше использовать проверенную CSRF-библиотеку или framework middleware, потому что там уже учтены
rotation, session lifecycle и edge cases.

</td></tr></table>

</details>

<details>
<summary>Чем cookie, HttpOnly cookie и LocalStorage отличаются с точки зрения безопасности?</summary><br>
<table><tr><td>

`localStorage` доступен JavaScript-коду страницы. Это удобно для простого persistence, но опасно для секретов: при XSS
вредоносный script сможет прочитать token и отправить его злоумышленнику.

Обычная cookie доступна JavaScript через `document.cookie` в рамках своего domain/path и автоматически прикладывается
браузером к подходящим HTTP-запросам. Автоматическая отправка полезна для session cookies, но создает CSRF-риск, если
нет `SameSite` и anti-CSRF token.

`HttpOnly` cookie недоступна через `document.cookie`, поэтому XSS не может напрямую прочитать ее значение. Но браузер
все равно автоматически отправляет такую cookie на подходящий domain. Поэтому `HttpOnly` снижает риск кражи token через
XSS, но не отменяет CSRF-защиту.

CSRF-token cookie часто делают не `HttpOnly`, потому что Angular должен прочитать ее и отправить значение в
`X-XSRF-TOKEN`. При этом session cookie, например refresh token, наоборот обычно должна быть `HttpOnly`, `Secure` и
`SameSite`.

</td></tr></table>

</details>

<details>
<summary>Как использовать Json Web Tokens для аутентификации при разработке на Angular?</summary><br>
<table><tr><td>

После входа сервер выдает access token, а клиент прикладывает его к API-запросам:

```ts
export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = inject(AuthService).accessToken();

  return next(token ? request.clone({setHeaders: {Authorization: `Bearer ${token}`}}) : request);
};
```

JWT состоит из header, payload и signature. Payload кодируется, но не шифруется, поэтому туда нельзя помещать секреты.

Практическая схема:

- короткоживущий access token хранится в памяти;
- refresh token безопаснее хранить в `HttpOnly`, `Secure`, `SameSite` cookie;
- refresh выполняется централизованно, с защитой от нескольких параллельных refresh-запросов;
- logout очищает сессию на сервере и локальное состояние;
- авторизацию всегда проверяет backend.

Route guard улучшает UX, но не является границей безопасности. Хранение долгоживущего токена в `localStorage` повышает
последствия XSS.

</td></tr></table>

</details>

<details>
<summary>Что такое SQL Injection?</summary><br>
<table><tr><td>

SQL Injection - атака, при которой пользовательский ввод становится частью SQL-команды. Проблема возникает, когда запрос
собирают строкой:

```ts
const user = await db.query(`SELECT * FROM users WHERE email = '${email}'`);
```

Если `email` содержит SQL-фрагмент, он может изменить смысл запроса. Вместо конкатенации нужно использовать
parameterized queries или ORM API, которые передают значения отдельно от SQL-кода.

```ts
const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
```

В ORM безопаснее использовать методы, где значения остаются данными:

```ts
const user = await prisma.user.findUnique({
  where: {email},
});
```

В TypeORM тот же принцип:

```ts
const user = await userRepository.findOneBy({email});
```

Raw SQL в ORM все равно требует параметров. Нельзя считать ORM автоматической защитой, если разработчик вручную
склеивает SQL-строку.

</td></tr></table>

</details>

<details>
<summary>Почему CORS не является authentication и authorization?</summary><br>
<table><tr><td>

CORS, или Cross-Origin Resource Sharing, - browser mechanism, который определяет, может ли JavaScript с одного origin
прочитать ответ от другого origin. Сервер управляет этим через `Access-Control-Allow-Origin`,
`Access-Control-Allow-Methods`, `Access-Control-Allow-Headers` и связанные headers.

Главная мысль: CORS ограничивает чтение ответа браузером, а не заменяет authentication и authorization. Если endpoint
доступен без проверки прав, правильные CORS headers его не спасут. Если пользователь авторизован cookie, browser может
отправить запрос на нужный domain, поэтому для mutating операций все равно нужна CSRF-защита.

`origin: '*'` опасен для приватного API, потому что разрешает любому сайту читать ответы, если browser request проходит
остальные условия. Для API с пользовательскими данными нужно явно перечислять доверенные origins и аккуратно работать с
credentials.

```ts
app.enableCors({
  origin: ['https://app.example.com'],
  credentials: true,
});
```

</td></tr></table>

</details>

<details>
<summary>Что такое CSP?</summary><br>
<table><tr><td>

CSP, или Content Security Policy, - HTTP header, который сообщает браузеру, откуда можно загружать scripts, styles,
images, fonts, frames и другие ресурсы. CSP снижает риск XSS: даже если в HTML попал вредоносный fragment, строгая
policy может запретить inline script или загрузку script с неизвестного домена.

Минимальный пример:

```http
Content-Security-Policy: default-src 'self'; script-src 'self'
```

На практике policy часто шире: добавляют `style-src`, `img-src`, `connect-src`, `frame-ancestors`, reporting и nonce для
разрешенных inline scripts. CSP не заменяет escaping, sanitization и backend validation, но добавляет важный защитный
слой.

</td></tr></table>

</details>

<details>
<summary>Что такое authorization check на backend?</summary><br>
<table><tr><td>

Authorization check - серверная проверка, имеет ли текущий пользователь право выполнить действие или прочитать ресурс.
Frontend guards, скрытые кнопки и disabled controls улучшают UX, но не являются защитой: пользователь может вызвать API
напрямую через browser devtools, curl или измененный frontend.

Backend обязан проверять права на каждый чувствительный endpoint. Классический пример IDOR:

```http
GET /api/users/123
```

Если пользователь с id `456` меняет URL на `/api/users/123`, сервер не должен возвращать чужой профиль только потому,
что request содержит валидную session cookie или JWT. Нужно проверить не только "кто пользователь", но и "имеет ли он
доступ именно к этому ресурсу".

```ts
app.get('/api/users/:id', requireAuth, async (request, response) => {
  const requestedUserId = request.params.id;

  if (request.user.id !== requestedUserId && !request.user.roles.includes('admin')) {
    response.sendStatus(403);
    return;
  }

  response.json(await usersService.findPublicProfile(requestedUserId));
});
```

</td></tr></table>

</details>

<details>
<summary>Что такое OWASP?</summary><br>
<table><tr><td>

OWASP - открытое сообщество и набор практических материалов по безопасности приложений. Frontend-разработчику полезны
OWASP Top 10, ASVS и Cheat Sheet Series.

Это не scanner и не готовая сертификация, а база рисков, требований и рекомендаций.

</td></tr></table>

</details>

<details>
<summary>Какие меры защиты должен знать frontend-разработчик?</summary><br>
<table><tr><td>

Frontend-разработчику важно понимать, где заканчивается клиентская ответственность и начинается обязательная серверная
проверка. Клиентская validation нужна для UX, но доверять можно только backend validation.

Базовый набор backend-защит:

- validation и normalization входных данных на server side;
- rate limiting для login, password reset, expensive endpoints и публичных forms;
- password hashing через `bcrypt` или `argon2`, а не хранение паролей в открытом виде;
- HTTPS для всего production-трафика;
- secure cookie flags: `Secure`, `SameSite`, `HttpOnly` для session/refresh cookies;
- CSRF-защита для cookie-based authentication;
- authorization checks на каждый чувствительный endpoint;
- file upload validation: MIME/type sniffing, ограничения размера, allowlist extensions, antivirus/scan pipeline при
  необходимости, хранение uploads вне исполняемого web-root;
- обновление зависимостей и проверка supply-chain рисков;
- отсутствие secrets в frontend bundle, logs, URL и error messages.

Безопасность является общей ответственностью frontend, backend и инфраструктуры.

</td></tr></table>

</details>

### Performance

#### Middle+ or Senior

<details>
<summary>Как performance budget применяется в Angular-проекте?</summary><br>
<table><tr><td>

В Angular performance budget обычно включает размер initial bundle, lazy chunks, CSS, LCP, CLS, INP и время до
интерактивности. Angular CLI поддерживает budgets для build artifacts, но этого недостаточно: нужно также измерять Web
Vitals на реальных страницах, следить за lazy routes, standalone imports, third-party dependencies и SSR/hydration
поведением.

</td></tr></table>

</details>

<details>
<summary>Как уменьшать размер frontend assets в Angular?</summary><br>
<table><tr><td>

Основные способы: lazy routes, `@defer`, tree shaking, удаление неиспользуемых dependencies, аккуратные standalone
imports, image optimization, font subsetting, compression и перенос необязательных scripts из startup path. Изменение
нужно измерять до и после, потому что новый chunk или library могут ухудшить не только bundle size, но и parse/execute
time.

</td></tr></table>

</details>

<details>
<summary>Как искать проблему производительности в Angular-приложении?</summary><br>
<table><tr><td>

Порядок работы:

1. Воспроизвести конкретный медленный сценарий.
2. Измерить Angular DevTools Profiler и Chrome Performance.
3. Определить bottleneck: network, JavaScript, change detection, layout, paint или memory.
4. Исправить наиболее дорогую причину.
5. Повторить измерение на production build и целевом устройстве.

Не следует начинать с `OnPush` или memoization без профиля. Частые причины: большой initial bundle, тяжелые списки,
template methods, layout thrashing и лишние запросы.

</td></tr></table>

</details>

<details>
<summary>Что такое initial bundle и как уменьшить bundle size?</summary><br>
<table><tr><td>

Initial bundle — JavaScript/CSS, необходимые для первой загрузки route.

Способы уменьшения:

- lazy routes и `@defer`;
- tree-shakable providers;
- удаление тяжелых/дублирующихся dependencies;
- точечные imports;
- production build и bundle budgets;
- проверка `sideEffects` библиотек;
- перенос необязательных polyfills и analytics из critical path.

Размер gzip/brotli важен, но также измеряют parse, compile и execution time.

</td></tr></table>

</details>

<details>
<summary>Что такое @defer и чем он отличается от lazy route?</summary><br>
<table><tr><td>

Lazy route откладывает целую route feature до навигации. `@defer` откладывает dependencies части текущего шаблона и
создает отдельный chunk.

<!-- prettier-ignore -->
```html
@defer (on viewport; prefetch on idle) {
  <app-heavy-chart />
} @placeholder {
  <div class="chart-skeleton"></div>
} @loading {
  <app-spinner />
} @error {
  <p>Не удалось загрузить график</p>
}
```

Triggers включают `idle`, `viewport`, `interaction`, `hover`, `timer` и `when`. Deferred dependencies должны быть
standalone и не использоваться eager в том же файле.

</td></tr></table>

</details>

<details>
<summary>Как оптимизировать большие списки?</summary><br>
<table><tr><td>

- стабильный `track item.id`;
- immutable updates;
- pagination или incremental loading;
- CDK virtual scroll для тысяч однотипных строк;
- отсутствие тяжелых методов и impure pipes в template;
- ограничение количества DOM nodes;
- OnPush/signals для локализации обновлений.

Virtual scroll нужен, когда DOM и rendering, а не загрузка данных, являются bottleneck. Для переменной высоты элементов
он сложнее и требует измерений.

</td></tr></table>

</details>

<details>
<summary>Как Angular-приложение может создавать лишние render и change detection cycles?</summary><br>
<table><tr><td>

Частые причины: частые events без ограничения, timers, подписки без фильтрации, template methods с тяжелой логикой,
изменение global state и обновления сигналов слишком высоко в дереве. В zone-based приложении async tasks могут
провоцировать широкую синхронизацию, а в zoneless код должен явно обновлять реактивные источники. Диагностируют это
через Angular DevTools Profiler и Chrome Performance, затем локализуют state, добавляют `track`, memoization, virtual
scroll или меняют архитектуру потока данных.

</td></tr></table>

</details>

<details>
<summary>Как lazy loading влияет на performance Angular-приложения?</summary><br>
<table><tr><td>

Lazy routes и `@defer` уменьшают initial bundle, parse/compile time и работу на startup path. Цена — дополнительные
chunks, network latency при первом переходе и необходимость хороших loading/error states. Хороший результат проверяют по
LCP, INP, route transition timing и production bundle stats, а не только по числу файлов.

</td></tr></table>

</details>

<details>
<summary>Как virtual scroll помогает большим спискам в Angular?</summary><br>
<table><tr><td>

Virtual scroll держит в DOM только видимую часть списка и небольшой buffer, поэтому уменьшаются layout, paint, memory
usage и change detection work. Он полезен для сотен или тысяч однотипных строк, но усложняет variable height, focus,
keyboard navigation и screen reader experience. Если bottleneck в API или фильтрации данных, virtual scroll не решит
корневую проблему.

</td></tr></table>

</details>

<details>
<summary>Почему в performance-аудите проверяют <code>sideEffects</code> библиотек?</summary><br>
<table><tr><td>

`sideEffects` влияет на то, сможет ли bundler удалить неиспользуемые файлы пакета из production bundle.

Если библиотека не публикует ESM, содержит широкий entry point или неправильно описывает side effects, unused code может
остаться в initial bundle. Обратная ошибка тоже опасна: неверное `"sideEffects": false` может удалить global styles,
polyfill или initialization code.

Поэтому в performance-аудите проверяют не только размер dependency, но и ее `package.json`, imports, entry points и
production bundle stats.

</td></tr></table>

</details>

<details>
<summary>Как анализировать Angular bundle?</summary><br>
<table><tr><td>

Используют:

- CLI bundle budgets;
- build output и source maps;
- bundle visualizer/esbuild metafile совместимого builder;
- Chrome Coverage для неиспользуемого JS/CSS;
- сравнение до/после в CI.

Ищут крупные dependencies, дубликаты, случайно eager-loaded features, locale/data imports и библиотеки, которые можно
заменить browser API или точечным import.

</td></tr></table>

</details>

### SSR, hydration и SEO

#### Middle+ or Senior

<details>
<summary>Как frontend guidelines помогают SSR, hydration и SEO в Angular?</summary><br>
<table><tr><td>

Guidelines фиксируют, какие страницы рендерятся через SSR или prerender, как подключаются critical CSS, fonts и media,
какие browser-only API нельзя вызывать во время server rendering и как проверяется hydration. Это снижает риск пустого
first render, layout shifts, hydration mismatch и случайного ухудшения SEO.

</td></tr></table>

</details>

<details>
<summary>Чем CSR, SSR и SSG отличаются?</summary><br>
<table><tr><td>

- CSR рендерит приложение в браузере после загрузки JavaScript.
- SSR генерирует HTML на сервере для каждого запроса.
- SSG/prerender генерирует HTML во время build.

SSR подходит динамическим SEO-страницам, SSG — статичному контенту, CSR — внутренним приложениям без SEO. Angular
поддерживает hybrid route-level render modes.

</td></tr></table>

</details>

<details>
<summary>Что такое hydration в Angular и какие проблемы она решает?</summary><br>
<table><tr><td>

Hydration подключает Angular к уже существующему server-rendered DOM вместо полного пересоздания. Сервер отдает HTML,
пользователь видит содержимое до полной загрузки JavaScript, а Angular на клиенте сопоставляет этот DOM со своими
компонентами, восстанавливает bindings и подключает обработчики событий.

Плюсы:

- меньше flicker;
- сохранение SSR HTML;
- улучшение LCP/CLS;
- event replay до завершения hydration.

Пример настройки:

```ts
// app.config.ts
import {ApplicationConfig} from '@angular/core';
import {provideClientHydration, withEventReplay} from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [provideClientHydration(withEventReplay())],
};
```

```ts
// app.config.server.ts
import {ApplicationConfig, mergeApplicationConfig} from '@angular/core';
import {provideServerRendering} from '@angular/ssr';

import {appConfig} from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering()],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
```

В Angular 22 `provideClientHydration()` включает базовую DOM hydration, HTTP transfer cache и incremental hydration по
умолчанию. `withEventReplay()` дополнительно сохраняет пользовательские события, произошедшие до окончания hydration, и
переигрывает их после подключения приложения.

HTML сервера и клиента должен быть детерминированным, иначе возникает hydration mismatch. Типичные причины: прямой
доступ к `window` во время render, случайные значения в шаблоне, разные даты/timezone, разные данные на сервере и
клиенте или ручное изменение DOM до завершения hydration.

</td></tr></table>

</details>

<details>
<summary>Почему browser-only код нельзя выполнять на сервере?</summary><br>
<table><tr><td>

На сервере browser globals отсутствуют. Безопасные варианты:

- platform-neutral Angular APIs;
- DI abstraction для browser service;
- выполнение DOM-кода в `afterNextRender()`;
- проверка platform только на границе интеграции;
- lazy import browser-only библиотеки.

Компонент не должен генерировать разный initial DOM на сервере и клиенте без предусмотренного механизма.

</td></tr></table>

</details>

<details>
<summary>Что такое TransferState и HTTP transfer cache?</summary><br>
<table><tr><td>

TransferState передает сериализованные данные из server render клиенту, чтобы не повторять запрос сразу после hydration.

Angular SSR интегрирует transfer cache с `HttpClient` для подходящих GET/HEAD запросов. Нужно учитывать персональные
данные, auth headers, размер HTML и invalidation. Не все API responses безопасно встраивать в документ.

</td></tr></table>

</details>

<details>
<summary>Когда SSR не нужен?</summary><br>
<table><tr><td>

SSR может не окупиться для:

- auth-only dashboard;
- приложения без поискового трафика;
- тяжелого интерактивного editor;
- продукта, где server cost и complexity выше выигрыша первого render.

SSR улучшает delivery HTML, но не уменьшает автоматически client JavaScript. Решение принимают по SEO, Core Web Vitals,
инфраструктуре и пользовательскому сценарию.

</td></tr></table>

</details>

<details>
<summary>Как SSR, hydration и prerender помогают Angular-приложению?</summary><br>
<table><tr><td>

SSR отдает HTML на каждый запрос и помогает динамическим SEO-страницам, previews и first paint. Prerender генерирует
статические routes заранее и хорошо подходит для документации, landing pages и публичного контента. Hydration сохраняет
server-rendered DOM и подключает к нему Angular на клиенте, уменьшая flicker и риск лишней перерисовки.

</td></tr></table>

</details>

<details>
<summary>Какие проблемы могут возникать при hydration в Angular?</summary><br>
<table><tr><td>

Основная проблема — hydration mismatch, когда server HTML не совпадает с первым client render. Причины: browser-only
globals во время render, случайные значения, даты и timezone, разные данные на сервере и клиенте, direct DOM mutation
или third-party widget до завершения hydration. Такие места изолируют, делают rendering детерминированным или переносят
browser-only работу в безопасную client-only фазу.

</td></tr></table>

</details>

<details>
<summary>Как Angular-приложение может избежать FOUC или плохого first render?</summary><br>
<table><tr><td>

Нужны server-rendered или prerendered HTML, critical CSS, стабильные fallback fonts, корректные размеры media, ранняя
загрузка LCP resource и отсутствие базовых стилей, которые приезжают только после JavaScript. Для Angular также важно,
чтобы global styles и component styles были доступны при первом render, а placeholders для `@defer` имели стабильные
размеры.

</td></tr></table>

</details>

<details>
<summary>В чем разница между Angular CLI и Webpack Development Environment?</summary><br>
<table><tr><td>

Angular CLI — официальный интерфейс для создания, запуска, тестирования, обновления и сборки Angular-проектов. Он
управляет workspace-конфигурацией и вызывает настроенный builder.

Webpack — универсальный bundler. Исторически Angular CLI использовал Webpack внутри, но это деталь реализации:
современные builders могут использовать другие инструменты, например esbuild/Vite-based development server.

CLI дает:

- `ng new`, `ng generate`, `ng serve`, `ng build`, `ng test`, `ng update`;
- Angular-aware компиляцию шаблонов и AOT;
- production-оптимизации, budgets, environments и asset pipeline;
- согласованную конфигурацию и migrations.

Ручная Webpack-конфигурация дает больше низкоуровневого контроля, но увеличивает стоимость поддержки и обновлений. В
Angular-проекте сначала используют возможности CLI и custom builder, а eject/собственный pipeline выбирают только при
реальной необходимости.

</td></tr></table>

</details>

<details>
<summary>Что такое JIT и AOT, в чем их отличия и каковы сферы применения?</summary><br>
<table><tr><td>

**AOT** компилирует templates и decorators во время сборки. В современных Angular CLI проектах AOT является стандартным
режимом и для `ng build`, и для development server.

Плюсы AOT:

- ошибки шаблонов обнаруживаются при сборке;
- браузеру не нужен Angular compiler;
- меньше runtime-работы и лучше startup;
- доступны template type checking и production optimizations.

**JIT** компилирует Angular declarations во время выполнения. Он нужен редко: для специальных динамических сценариев,
tooling или legacy-конфигураций. Для обычной разработки переключаться на JIT не требуется.

`--prod` больше не является актуальным способом объяснять AOT. Используют named configurations, например
`ng build --configuration production`.

</td></tr></table>

</details>

### Angular PWA и Service Worker

#### Middle+ or Senior

<details>
<summary>Как Angular помогает с localization?</summary><br>
<table><tr><td>

Angular предоставляет i18n-инструменты для извлечения и подстановки переводов, а также pipes для дат, чисел и валют с
учетом locale. Но команда все равно должна решить, где хранятся переводы, нужен ли runtime или build-time localization,
как тестируются языки и как компоненты переживают длинные строки, pluralization и RTL.

</td></tr></table>

</details>

<details>
<summary>Почему RTL нужно учитывать в layout и компонентах?</summary><br>
<table><tr><td>

RTL меняет направление текста и часто влияет на icons, arrows, spacing, alignment, keyboard navigation и animations.
Нельзя просто перевести строки и считать интерфейс готовым. Компоненты design system должны явно поддерживать LTR/RTL, а
CSS должен использовать logical properties там, где это упрощает поддержку.

</td></tr></table>

</details>

<details>
<summary>Для чего нужны service worker?</summary><br>
<table><tr><td>

Service Worker — это фоновый слой между сайтом и сетью.

Service Worker — это JavaScript-файл, который браузер запускает отдельно от страницы. Он может перехватывать сетевые
запросы, работать с кешем, получать push-уведомления и помогать сайту работать офлайн.

</td></tr></table>

</details>

<details>
<summary>Для чего нужен PWA и какие плюсы?</summary><br>
<table><tr><td>

PWA — это сайт, который ведет себя почти как приложение

PWA = Progressive Web App.

Это обычное веб-приложение, но с дополнительными возможностями:

- можно установить на телефон/компьютер как приложение;
- может работать офлайн или при плохом интернете;
- может кешировать данные и ресурсы;
- может отправлять push-уведомления;
- открывается из иконки без обычного ощущения “я в браузере”.

Для чего нужен PWA:

PWA нужен, когда ты хочешь дать пользователю app-like experience, но без полноценной разработки под iOS/Android.

Главные плюсы PWA:

1. Можно установить без App Store / Google Play

Пользователь может нажать “Add to Home Screen” и получить иконку приложения.

Плюс для бизнеса:

- не нужно проходить модерацию стора;
- быстрее выкатывать обновления;
- один код для web/mobile/desktop.

PWA может кешировать:

- HTML;
- JS;
- CSS;
- картинки;
- шрифты;
- API-ответы.

Может работать офлайн

Например:

- открыть последнюю загруженную страницу;
- показать сохраненные данные;
- дать заполнить форму;
- отправить данные позже, когда интернет вернется.

Это особенно полезно для:

- путешествий;
- слабого интернета;
- мобильных пользователей;
- внутренних рабочих инструментов.

Push-уведомления:

PWA может отправлять уведомления, например: “Заказ доставлен”; “Новая задача”; “Скидка”; “Напоминание”; “Документ
согласован”.

Когда PWA подходит

PWA хорошо подходит, если:

- приложение в основном показывает данные;
- нужна установка на экран;
- важна скорость загрузки;
- нужен офлайн-режим;
- нет сложной работы с железом телефона;
- хочется быстро доставлять обновления.

CRM, todo app, dashboard, docs, e-commerce, booking app

Когда PWA не лучший выбор

PWA хуже подходит, если нужны:

- глубокие native API;
- сложная работа с Bluetooth/NFC;
- тяжелая графика;
- мощная фоновая работа;
- сложная интеграция с iOS/Android;
- максимальная производительность как у native.

</td></tr></table>

</details>

<details>
<summary>Какую роль в PWA играет Service Worker?</summary><br>
<table><tr><td>

Service Worker — это JS-файл, который браузер запускает отдельно от страницы и который стоит “между” приложением и
сетью.

Как работает обычный сайт: Page -> Network -> Server

PWA с Service Worker: Page -> Service Worker -> Cache / Network -> Server

Service Worker может перехватывать запросы:

Пользователь открыл страницу ↓ Браузер спрашивает Service Worker ↓ SW решает:

- взять файл из кеша
- сходить в сеть
- показать fallback-страницу

Ты открыл сайт первый раз:

- index.html
- main.js
- styles.css
- logo.png

Service Worker может сохранить эти файлы в Cache Storage.

Потом пользователь открывает сайт без интернета:

нет сети ↓ Service Worker берет файлы из кеша ↓ приложение все равно открывается

Для чего он нужен в PWA

1. Offline. Можно открыть приложение без интернета.
2. Faster load. Файлы уже лежат локально, поэтому приложение может открываться быстрее.
3. Cache strategy. Service Worker может выбирать стратегию:
   1. Cache first сначала кеш, потом сеть картинки, шрифты, статика
   2. Network first сначала сеть, если нет — кеш свежие данные
   3. Stale while revalidate быстро отдать кеш, потом обновить списки, статьи, каталоги
   4. Cache only только кеш заранее сохраненные ресурсы
   5. Network only только сеть критичные операции
4. Push notifications. Service Worker может принимать push-события даже когда вкладка закрыта. Server -> Push Service ->
   Service Worker -> Notification

Service Worker не имеет доступа к DOM. Он живет отдельно от страницы. Страница и Service Worker общаются через
события/messages.

Service Worker нужен в PWA, чтобы приложение могло кешировать ресурсы, быстрее загружаться, работать офлайн и получать
push-уведомления.

</td></tr></table>

</details>

### Testing

#### Middle+ or Senior

<details>
<summary>Какие вопросы задать про тестирование Angular-кода в команде?</summary><br>
<table><tr><td>

Нужно понять, какие уровни тестов используются: unit, integration, component, e2e и visual regression. Также важно
выяснить, какие инструменты приняты: TestBed, Angular Testing Library, Component Harness, Cypress, Playwright, Jest,
Vitest или Karma. Хороший ответ объясняет не только инструменты, но и что именно ими проверяют и где проходит граница
между тестом, lint и ручной проверкой.

</td></tr></table>

</details>

<details>
<summary>Какие виды тестирования используют в Angular?</summary><br>
<table><tr><td>

- **Unit-тест** проверяет небольшую единицу: функцию, pipe, service или компонент с изолированными зависимостями. Он
  быстрый и точно локализует ошибку.
- **Интеграционный тест** проверяет совместную работу нескольких частей: компонент с шаблоном, DI, Router или
  HTTP-слоем.
- **E2E-тест** запускает приложение в браузере и проверяет пользовательский сценарий через UI, часто вместе с реальным
  или тестовым backend.

В Angular unit/integration-тесты обычно используют TestBed, spies/fakes, HTTP testing utilities и Router testing
harness. E2E выполняют Playwright или Cypress.

Основу набора составляют быстрые unit и integration-тесты. E2E оставляют для критических сквозных сценариев: вход,
checkout, создание сущности. Тестируют наблюдаемое поведение, а не приватные методы и внутреннюю структуру компонента.

</td></tr></table>

</details>

<details>
<summary>Какие плюсы у тестирования frontend-кода?</summary><br>
<table><tr><td>

Тесты быстро ловят regressions, фиксируют ожидания компонента или сервиса и помогают безопасно менять код. В Angular они
особенно полезны для forms, routing, DI, HTTP mapping, guards, pipes и сложных states. Хорошие тесты уменьшают страх
перед refactoring, но не заменяют ручную проверку UX и accessibility.

</td></tr></table>

</details>

<details>
<summary>Какие минусы и trade-offs у тестов?</summary><br>
<table><tr><td>

Тесты требуют времени на написание и поддержку, могут быть хрупкими и иногда закрепляют плохую архитектуру. Избыточные
mocks проверяют реализацию вместо поведения, а слишком много E2E замедляет feedback. Зрелый подход выбирает уровень
теста по риску: чистую функцию проверять unit-тестом, пользовательский сценарий — integration или E2E.

</td></tr></table>

</details>

<details>
<summary>Какие инструменты использовать для тестирования Angular-кода?</summary><br>
<table><tr><td>

Для Angular обычно используют TestBed, Angular testing utilities, `provideHttpClientTesting()`, `HttpTestingController`,
Router testing harness, Component Harnesses и spies/fakes тестового раннера. Для пользовательских сценариев подходят
Playwright или Cypress, а Angular Testing Library удобна, когда команда предпочитает DOM-first проверки. Инструмент
выбирают по контракту, который нужно проверить.

</td></tr></table>

</details>

<details>
<summary>Чем unit test отличается от integration test?</summary><br>
<table><tr><td>

Unit test проверяет небольшую единицу с изолированными зависимостями: функцию, pipe, mapping или сервис. Integration
test проверяет совместную работу нескольких частей: компонент с template, DI, Router, forms или HTTP testing layer. В
Angular многие полезные component tests фактически являются integration tests, и это нормально.

</td></tr></table>

</details>

<details>
<summary>Чем integration test отличается от e2e test?</summary><br>
<table><tr><td>

Integration test запускает часть приложения в тестовой среде и контролирует зависимости. E2E test открывает приложение в
реальном браузере и проверяет пользовательский путь через UI, часто с network layer, auth и routing. E2E дает больше
уверенности в сценарии, но медленнее и дороже в поддержке.

</td></tr></table>

</details>

<details>
<summary>Какие testing best practices важны во frontend?</summary><br>
<table><tr><td>

Проверять observable behavior, использовать role/label/test id selectors, избегать sleeps, стабилизировать данные и
тестировать loading/error/empty states. Не стоит проверять private methods, случайные CSS classes и внутреннее число
signals. Тест должен падать по понятной причине и помогать найти regression.

</td></tr></table>

</details>

<details>
<summary>Когда тестировать компонент через DOM, а когда тестировать чистую функцию?</summary><br>
<table><tr><td>

Если контракт виден пользователю или другому компоненту через template, events, forms или accessibility, лучше проверять
через DOM. Если логика является чистым преобразованием данных, ее проще и быстрее тестировать как функцию. Хороший
дизайн часто выносит сложные вычисления из компонента, оставляя DOM-тесту только интеграцию.

</td></tr></table>

</details>

<details>
<summary>Что лучше тестировать в Angular service?</summary><br>
<table><tr><td>

В service тестируют mapping DTO в domain model, обработку ошибок, cache/invalidation, retries, guards against invalid
input и взаимодействие с HTTP или storage через контролируемые fakes. Не нужно тестировать сам `HttpClient`; достаточно
проверить URL, method, body, headers и реакцию на response.

</td></tr></table>

</details>

<details>
<summary>Когда использовать Angular Testing Library, TestBed, Component Harness, Cypress или Playwright?</summary><br>
<table><tr><td>

TestBed — базовый инструмент Angular для DI, components и services. Angular Testing Library удобна для behavior-first
component tests через DOM queries. Component Harness нужен для стабильного тестового API reusable UI components. Cypress
и Playwright используют для browser-level сценариев; Playwright особенно силен в multi-browser, tracing и parallel
execution.

</td></tr></table>

</details>

<details>
<summary>Какие тесты чаще всего получаются хрупкими?</summary><br>
<table><tr><td>

Хрупкими становятся тесты на CSS classes, внутреннюю структуру DOM, private methods, точные timers, реальные внешние
API, порядок независимых async events и snapshots больших компонентов. Их чинят через стабильные locators, ожидание
видимого состояния, deterministic data, fakes и перенос логики в тестируемые чистые функции.

</td></tr></table>

</details>

<details>
<summary>Что тестировать в Angular-компоненте, а что не нужно?</summary><br>
<table><tr><td>

Тестируют публичное поведение:

- rendered content и accessibility;
- реакцию на user events;
- inputs/outputs;
- loading/error/empty states;
- интеграцию с forms, Router и services.

Не тестируют Angular framework, private methods, внутреннее количество signals или точную структуру реализации без
контрактной причины.

</td></tr></table>

</details>

<details>
<summary>Как тестировать standalone component и мокать service?</summary><br>
<table><tr><td>

```ts
TestBed.configureTestingModule({
  imports: [UserCardComponent],
  providers: [{provide: UserApi, useValue: userApiStub}],
});
```

Standalone component добавляют в `imports`. При необходимости dependency собственного import компонента заменяют через
`TestBed.overrideComponent()`.

</td></tr></table>

</details>

<details>
<summary>Как мокать Angular module в тесте?</summary><br>
<table><tr><td>

Если тестируемый компонент зависит от NgModule-based library, можно импортировать настоящий testing module или заменить
тяжелую зависимость lightweight stub component/directive/pipe.

Для standalone components часто проще использовать `TestBed.overrideComponent()` и заменить конкретный import. Не
мокайте весь модуль, если достаточно замокать сервис или один UI-компонент.

</td></tr></table>

</details>

<details>
<summary>Как тестировать сервис с async dependency?</summary><br>
<table><tr><td>

Async dependency заменяют stub/fake, который возвращает контролируемый Promise или Observable. Тест должен явно
дождаться результата через `await`, `firstValueFrom`, `fakeAsync/tick` или testing utilities.

Для HTTP-зависимостей используйте `provideHttpClientTesting()` и `HttpTestingController`, чтобы проверить request и
вернуть ответ через `flush()`.

</td></tr></table>

</details>

<details>
<summary>Чем spy, fake, stub и mock отличаются?</summary><br>
<table><tr><td>

`Spy` записывает вызовы и может подменять реализацию. `Stub` возвращает заранее заданные значения. `Fake` имеет
упрощенную рабочую реализацию. `Mock` обычно содержит ожидания по взаимодействию.

В Angular-тестах чаще достаточно stub/fake service и проверки observable behavior через DOM или публичный API.

</td></tr></table>

</details>

<details>
<summary>Как тестировать content projection?</summary><br>
<table><tr><td>

Создайте host test component, который использует тестируемый компонент как реальный потребитель и передает projected
content между tags.

Так проверяются slots, selectors, content queries и пользовательский результат, а не внутренние детали реализации
компонента.

</td></tr></table>

</details>

<details>
<summary>Чем fakeAsync/tick отличается от waitForAsync?</summary><br>
<table><tr><td>

`fakeAsync()` виртуализирует timers и microtasks; `tick()` продвигает время, `flush()` очищает очередь.

`waitForAsync()` использует реальную async completion и `fixture.whenStable()`.

`fakeAsync` удобен для debounce/timers, но не поддерживает все browser APIs. В zoneless и signal-based тестах часто
достаточно `await fixture.whenStable()`.

</td></tr></table>

</details>

<details>
<summary>Как тестировать CVA и формы?</summary><br>
<table><tr><td>

CVA лучше тестировать через host form:

- model value попадает в control;
- пользовательское действие вызывает value update;
- blur передает touched;
- disabled state блокирует interaction;
- validation и keyboard behavior работают.

Отдельный вызов методов CVA не заменяет integration-тест с `FormControl`.

</td></tr></table>

</details>

<details>
<summary>Почему E2E-тесты флакают и как уменьшить flaky tests?</summary><br>
<table><tr><td>

Причины: sleeps, нестабильные данные, race conditions, animation, зависимость от порядка, слабые selectors.

Решения:

- locators по role/label/test id вместо CSS-классов;
- ожидание observable UI state, а не timeout;
- изолированные test data;
- deterministic network mocks;
- trace/screenshot/video при retry;
- исправление причины, а не увеличение retries.

Behavioral assertions важнее screenshot tests; screenshots полезны для ограниченного visual regression.

</td></tr></table>

</details>

<details>
<summary>Как организовать frontend tests в CI?</summary><br>
<table><tr><td>

Обычно:

1. Type check, lint и unit tests.
2. Build production.
3. Component/integration tests.
4. E2E по критическим flows в нескольких browsers.
5. Coverage и artifacts без превращения процента в самоцель.

Тесты параллелят, кешируют dependencies/build, сохраняют trace и разделяют быстрый PR pipeline с более широким nightly
suite.

</td></tr></table>

</details>

<details>
<summary>Что такое Karma, Jasmine (зачем их используют совместно при разработке на Angular)?</summary><br>
<table><tr><td>

Это разные части тестового стека:

- **Jasmine** — test framework: `describe`, `it`, expectations, spies и hooks.
- **Karma** — test runner, который запускает тестовый bundle в браузерах, собирает результаты и следит за файлами.

Их использовали совместно, потому что Jasmine описывал тесты, а Karma предоставлял браузерное окружение и запуск.

Это исторически популярная конфигурация Angular CLI, но не единственный современный вариант. Проект может использовать
Vitest, Jest или другой runner. При выборе важны скорость, browser fidelity, поддержка Angular, debugging и интеграция с
CI.

</td></tr></table>

</details>

<details>
<summary>В чем разница между Jest и Karma?</summary><br>
<table><tr><td>

Сравнение не полностью симметрично:

- Karma — runner для запуска тестов в реальных браузерах.
- Jest — test framework и runner с assertions, mocks, coverage и обычно DOM-эмуляцией через jsdom.

Jest часто быстрее и проще для unit-тестов благодаря параллельному запуску, watch mode и встроенным инструментам. Karma
дает настоящее браузерное окружение, но обычно запускается и настраивается тяжелее.

Эмуляция DOM не воспроизводит все особенности layout, CSS и browser API. Поэтому даже при Jest/Vitest нужны component
integration и E2E-тесты в реальном браузере для поведения, зависящего от платформы.

</td></tr></table>

</details>

<details>
<summary>В чем разница между Protractor и Cypress?</summary><br>
<table><tr><td>

Protractor был Angular-ориентированным E2E-инструментом поверх WebDriver и умел автоматически ожидать Angular stability.
Проект Protractor снят с поддержки и не должен выбираться для новых приложений.

Cypress работает через собственный browser runner, дает удобный time-travel UI, автоматические ожидания, network
stubbing и хорошую диагностику. Его модель выполнения отличается от обычного WebDriver и имеет собственные ограничения,
например при работе с несколькими вкладками и некоторыми cross-origin сценариями.

Современная альтернатива также Playwright: он управляет Chromium, Firefox и WebKit, поддерживает несколько контекстов,
вкладок и параллельный запуск.

Для существующего проекта миграция должна сохранять критические сценарии и постепенно заменять Protractor-тесты, а не
переписывать весь набор одним большим изменением.

</td></tr></table>

</details>

<details>
<summary>Как протестировать входные параметры и всплывающие события компонентов?</summary><br>
<table><tr><td>

Лучше тестировать компонент через его публичный API и DOM.

```ts
it('renders the input and emits selection', () => {
  const fixture = TestBed.createComponent(UserCardComponent);
  const selected: string[] = [];

  fixture.componentRef.setInput('name', 'Alex');
  fixture.componentInstance.selected.subscribe((id) => selected.push(id));
  fixture.detectChanges();

  expect(fixture.nativeElement.textContent).toContain('Alex');

  fixture.nativeElement.querySelector('button').click();

  expect(selected).toEqual(['user-1']);
});
```

Для signal input используется тот же `componentRef.setInput()`. Output можно проверить подпиской на публичный output или
через host-компонент, если важен реальный template binding.

После изменения input нужно запустить change detection. Не следует напрямую вызывать приватные методы: клик по доступной
кнопке лучше отражает контракт компонента.

</td></tr></table>

</details>

### Angular coding questions

#### Middle+ or Senior

<details>
<summary>Что отрендерит компонент с ContentChildren, Directive, QueryList, *ngIf и projected content?</summary><br>
<table><tr><td>

`*ngIf` здесь использован как legacy structural syntax, который все еще часто встречается в проектах.

```ts
@Directive({
  selector: '[appItem]',
})
export class ItemDirective {}

@Component({
  selector: 'app-panel',
  template: `
    <p>Найдено: {{ items?.length ?? 0 }}</p>
    <ng-content />
  `,
})
export class PanelComponent {
  protected items: QueryList<ItemDirective> | null = null;

  @ContentChildren(ItemDirective)
  set projectedItems(items: QueryList<ItemDirective>) {
    this.items = items;
  }
}
```

```html
<app-panel>
  <span appItem>А</span>
  <span
    *ngIf="false"
    appItem
  >
    Б
  </span>
  <ng-template>
    <span appItem>В</span>
  </ng-template>
</app-panel>
```

Короткий ответ: отрендерится `Найдено: 1` и текст `А`. Элемент `Б` не создан из-за `*ngIf="false"`, а содержимое
`ng-template` не создается само по себе, поэтому `ContentChildren` видит только один реально спроецированный
`ItemDirective`.

</td></tr></table>

</details>

### Angular libraries и design systems

#### Middle+ or Senior

<details>
<summary>Как guidelines помогают design system в Angular?</summary><br>
<table><tr><td>

Guidelines связывают компоненты design system с реальным использованием в продуктах: naming, inputs/outputs,
accessibility, theming, tokens, layout patterns и правила расширения. Это снижает количество кастомных fork-like решений
и помогает разным командам использовать UI kit одинаково.

</td></tr></table>

</details>

<details>
<summary>Почему Angular-команде важно документировать отклонения от UI kit или framework?</summary><br>
<table><tr><td>

Отклонения появляются из-за нестандартных требований, legacy-кода или ограничений продукта. Если их не документировать,
новые разработчики будут копировать workaround как норму. Хорошая документация объясняет причину, область применения и
условия, при которых workaround можно удалить.

</td></tr></table>

</details>

<details>
<summary>Что такое pattern library и зачем она нужна?</summary><br>
<table><tr><td>

Pattern library описывает повторяемые UI patterns, компоненты, states, accessibility rules и примеры использования. В
Angular-мире эту роль часто выполняют Storybook, Docusaurus, documentation site design system или собственные examples.
Она помогает продуктовым командам не изобретать один и тот же интерфейс заново.

</td></tr></table>

</details>

<details>
<summary>Чем library code отличается от application code?</summary><br>
<table><tr><td>

Application знает конкретный продукт, routes, backend и окружение. Library должна работать в разных приложениях и
версиях конфигурации.

Для библиотеки важнее:

- узкий public API;
- backward compatibility;
- accessibility и theming;
- отсутствие product-specific dependencies;
- tree shaking и peer dependencies;
- migrations и документация.

</td></tr></table>

</details>

<details>
<summary>Что такое public API Angular library и почему нельзя экспортировать все?</summary><br>
<table><tr><td>

Public API — imports, components, directives, tokens и types, которые библиотека обещает поддерживать.

Экспорт внутренних helpers:

- связывает руки рефакторингу;
- увеличивает документацию и test surface;
- создает случайные зависимости пользователей;
- усложняет breaking changes.

Потребители импортируют только из package entry points, а не из внутренних путей.

</td></tr></table>

</details>

<details>
<summary>Что такое breaking change и как версионировать библиотеку?</summary><br>
<table><tr><td>

Breaking change требует изменения кода потребителя: удаление export, изменение selector/input, поведения, CSS contract
или поддерживаемых версий.

Semantic Versioning:

- patch — совместимое исправление;
- minor — совместимая функциональность;
- major — breaking changes.

Перед major нужны deprecation period, migration guide, schematics и automated tests совместимости.

</td></tr></table>

</details>

<details>
<summary>Почему Angular должен быть peerDependency библиотеки?</summary><br>
<table><tr><td>

`peerDependencies` сообщает, что библиотека использует Angular instance приложения. Если положить Angular в обычные
`dependencies`, потребитель может получить дубли framework packages, DI/runtime incompatibility и больший bundle.

Диапазон peer dependency должен отражать реально протестированные версии. Runtime dependencies оставляют только для
библиотек, которые действительно должны поставляться вместе с package.

</td></tr></table>

</details>

<details>
<summary>Как проектировать конфигурируемый Angular-компонент?</summary><br>
<table><tr><td>

Локальные параметры передают inputs. Общую конфигурацию библиотеки предоставляют через typed `InjectionToken` и provider
factory:

```ts
export const provideUiConfig = (config: UiConfig): EnvironmentProviders =>
  makeEnvironmentProviders([{provide: UI_CONFIG, useValue: config}]);
```

Defaults должны быть явными, config — readonly, а локальный input может переопределять глобальное значение. Не следует
превращать один компонент в десятки boolean flags; варианты моделируют union types.

</td></tr></table>

</details>

<details>
<summary>Как проектировать theme, icon и overlay API?</summary><br>
<table><tr><td>

- Theme API опирается на semantic CSS custom properties/tokens, а не внутренние selectors.
- Icon API принимает понятный identifier или injectable registry и поддерживает tree shaking.
- Overlay API разделяет content, position, lifecycle, focus management и escape/outside click.
- Dialog/dropdown должны иметь keyboard navigation, focus trap/restore и ARIA contract.

Для overlay primitives предпочтителен Angular CDK, если библиотека не решает более низкоуровневую задачу.

</td></tr></table>

</details>

<details>
<summary>Что такое secondary entry points и когда они нужны?</summary><br>
<table><tr><td>

Secondary entry point позволяет импортировать отдельную область:

```ts
import {Button} from 'ui-kit/button';
```

Он полезен для независимых feature packages и optional dependencies. Слишком много entry points увеличивает build,
release и compatibility surface.

Entry points не должны образовывать cycles и импортировать внутренности друг друга в обход публичных границ.

</td></tr></table>

</details>

### `sideEffects` в package.json и tree shaking

#### Middle+ or Senior

<details>
<summary>Что такое tree shaking?</summary><br>
<table><tr><td>

Tree shaking — это оптимизация сборки, при которой bundler удаляет неиспользуемый код из итогового bundle. Лучше всего
это работает с ES modules, потому что `import` и `export` можно анализировать статически.

Пример: если приложение импортирует только `add` из `date-utils`, production build может не включить остальные
неиспользуемые exports этого модуля.

</td></tr></table>

</details>

<details>
<summary>Что такое side effect в JavaScript-модуле?</summary><br>
<table><tr><td>

Side effect — это действие, которое происходит просто при импорте модуля, даже если его exports не используются.

Примеры side effects:

- импорт CSS;
- регистрация polyfill;
- изменение global object;
- изменение prototype;
- регистрация custom element;
- запуск top-level initialization logic;
- добавление global event listener.

Модуль с side effect:

```ts
import './styles.css';

globalThis.__MY_LIBRARY_READY__ = true;
```

Модуль без side effects:

```ts
export function sum(a: number, b: number): number {
  return a + b;
}

export const DEFAULT_SIZE = 16;
```

</td></tr></table>

</details>

<details>
<summary>Что делает <code>"sideEffects": false</code> в <code>package.json</code>?</summary><br>
<table><tr><td>

`"sideEffects": false` сообщает bundler, что модули пакета не выполняют важных side effects при импорте. Если exports
модуля не используются, bundler может удалить такой код из production bundle.

Пример:

```json
{
  "name": "my-library",
  "sideEffects": false
}
```

</td></tr></table>

</details>

<details>
<summary>Почему <code>"sideEffects": false</code> помогает уменьшить bundle size?</summary><br>
<table><tr><td>

Bundler не всегда может сам понять, безопасно ли удалить импортируемый модуль. Флаг `"sideEffects": false` дает
подсказку: если exports не используются, сам импорт модуля не нужен. Это помогает выкидывать лишний код из production
build.

Для shared package это особенно полезно, когда приложение использует один `button`, а рядом в пакете есть `input`,
helpers и optional integrations.

</td></tr></table>

</details>

<details>
<summary>Почему этот флаг особенно важен для библиотек?</summary><br>
<table><tr><td>

Библиотеки часто содержат много независимых компонентов, функций и entry points. Потребитель может импортировать только
одну часть библиотеки, и bundler должен иметь возможность удалить остальное. `sideEffects` помогает сделать package
более tree-shakable.

Для Angular library это важно вместе с ESM output, secondary entry points, tree-shakable providers и аккуратными public
exports.

</td></tr></table>

</details>

<details>
<summary>Чем опасен неправильный <code>"sideEffects": false</code>?</summary><br>
<table><tr><td>

Если пакет помечен как side-effect-free, но внутри есть важные side effects, bundler может удалить нужный код. Ошибка
может проявиться только в production build: например, пропадут стили, не зарегистрируется polyfill или не выполнится
initialization logic.

Риск особенно неприятен для UI libraries: компонент может собраться без ошибок, но визуально сломаться из-за удаленного
CSS import.

</td></tr></table>

</details>

<details>
<summary>Какие файлы нельзя бездумно считать side-effect-free?</summary><br>
<table><tr><td>

Осторожно с файлами, которые:

- импортируют CSS;
- регистрируют polyfills;
- меняют `window`, `document`, `globalThis`;
- меняют prototypes;
- регистрируют custom elements;
- добавляют global event listeners;
- запускают top-level initialization;
- патчат поведение сторонних библиотек.

Пример:

```ts
import './polyfill';

interface Array<T> {
  first(): T | undefined;
}

Array.prototype.first = function <T>(this: T[]): T | undefined {
  return this[0];
};
```

Такой файл имеет side effects.

</td></tr></table>

</details>

<details>
<summary>Что делать, если в пакете есть и pure modules, и файлы с side effects?</summary><br>
<table><tr><td>

Можно указать не `false`, а массив файлов, которые имеют side effects.

Пример:

```json
{
  "name": "my-library",
  "sideEffects": ["./src/polyfills.ts", "./src/register-custom-elements.ts", "**/*.css"]
}
```

Так bundler сможет удалять pure modules, но сохранит файлы, которые важны из-за side effects.

</td></tr></table>

</details>

<details>
<summary>Почему CSS imports часто указывают в <code>sideEffects</code>?</summary><br>
<table><tr><td>

CSS import нужен не ради JavaScript export, а ради самого факта подключения стилей. Если bundler удалит такой import, UI
может сломаться.

Пример:

```json
{
  "sideEffects": ["**/*.css", "**/*.scss"]
}
```

Для design system это часто безопаснее, чем глобально ставить `"sideEffects": false` и надеяться, что все CSS останется
в bundle.

</td></tr></table>

</details>

<details>
<summary>Как выглядит пример pure package?</summary><br>
<table><tr><td>

Pure package экспортирует функции или значения и не выполняет важный код при импорте.

```ts
// src/math.ts
export function add(a: number, b: number): number {
  return a + b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}
```

```json
{
  "name": "date-utils",
  "type": "module",
  "sideEffects": false
}
```

Если приложение использует только `add`, bundler может удалить `multiply`.

</td></tr></table>

</details>

<details>
<summary>Как выглядит package с CSS side effect?</summary><br>
<table><tr><td>

```ts
// src/index.ts
import './global-styles.css';

export {Button} from './button';
export {Input} from './input';
```

Если поставить `"sideEffects": false`, bundler может удалить CSS import в некоторых сценариях.

Безопаснее:

```json
{
  "name": "ui-kit",
  "sideEffects": ["**/*.css"]
}
```

</td></tr></table>

</details>

<details>
<summary>Почему barrel file может неожиданно иметь side effect?</summary><br>
<table><tr><td>

Barrel file выглядит как простой public API, но любой top-level import в нем выполняется при импорте entry point.

```ts
// src/index.ts
import './init';

export * from './button';
export * from './input';
```

```ts
// src/init.ts
globalThis.__MY_LIBRARY_READY__ = true;
```

Такой `index.ts` уже не является полностью pure barrel, потому что импорт `./init` выполняет код на top-level. Лучше не
смешивать public exports и initialization logic.

</td></tr></table>

</details>

<details>
<summary>Как <code>sideEffects</code> связан с Angular providers?</summary><br>
<table><tr><td>

Фабрики providers обычно не являются side effects, если они просто экспортируются из файла. Side effect появляется, если
код выполняется сразу при импорте модуля, а не тогда, когда Angular реально использует provider.

Пример без top-level side effect:

```ts
export function provideFeature(options: FeatureOptions): Provider[] {
  return [
    {
      provide: FEATURE_OPTIONS,
      useValue: options,
    },
    FeatureService,
  ];
}
```

</td></tr></table>

</details>

<details>
<summary>Почему важно не выполнять тяжелую логику на top-level в Angular library?</summary><br>
<table><tr><td>

Top-level код выполняется сразу при импорте модуля. Это может мешать tree shaking, SSR и тестам. Для библиотек лучше
экспортировать функции, providers, классы и components, а выполнение логики оставлять приложению.

Плохо:

```ts
startAnalytics();

export {AnalyticsService};
```

Лучше:

```ts
export function provideAnalytics(config: AnalyticsConfig): Provider[] {
  return [
    {
      provide: ANALYTICS_CONFIG,
      useValue: config,
    },
    AnalyticsService,
  ];
}
```

</td></tr></table>

</details>

<details>
<summary>Почему пакет может попадать в bundle, хотя его компонент напрямую не используется?</summary><br>
<table><tr><td>

Возможные причины:

- пакет импортируется через barrel file;
- есть top-level side effects;
- bundler не уверен, что import можно удалить;
- `package.json` не содержит `sideEffects`;
- используется CommonJS;
- приложение импортирует слишком широкий entry point;
- dependency попала через другой используемый export.

Проверять нужно dependency graph и реальные imports consumer-приложения, а не только исходный код компонента.

</td></tr></table>

</details>

<details>
<summary>Как проверить, что <code>"sideEffects": false</code> реально уменьшает bundle?</summary><br>
<table><tr><td>

Нужно собрать production build и сравнить bundle stats до и после изменения.

Можно использовать:

- Angular build stats;
- source-map-explorer;
- webpack-bundle-analyzer;
- esbuild metafile;
- rollup visualizer.

Важно проверять не только размер bundle, но и работоспособность приложения: стили, SSR, lazy loading и initialization
logic.

</td></tr></table>

</details>

<details>
<summary>Как проектировать библиотеку, чтобы она хорошо tree-shaking-илась?</summary><br>
<table><tr><td>

- использовать ES modules;
- избегать top-level side effects;
- не смешивать initialization logic и public exports;
- делать secondary entry points;
- не экспортировать все через один тяжелый entry point;
- правильно настроить `exports`;
- правильно указать `sideEffects`;
- проверять production bundle в consumer-приложении.

`"sideEffects": false` помогает, но не исправляет архитектуру пакета, если public API тянет лишние imports.

</td></tr></table>

</details>

<details>
<summary>Как secondary entry points помогают bundle size?</summary><br>
<table><tr><td>

Secondary entry points позволяют импортировать отдельные части библиотеки:

```ts
import {Button} from 'ui-kit/button';
import {Input} from 'ui-kit/input';
```

Это может быть лучше, чем один большой entry point, который тянет много лишнего кода.

Secondary entry points полезны, когда части пакета независимы: например, `button`, `input`, `date-utils` или
`analytics`.

</td></tr></table>

</details>

<details>
<summary>Как безопасно добавить <code>"sideEffects": false</code> в библиотеку?</summary><br>
<table><tr><td>

- Проверить, что модули не выполняют важный код на top-level.
- Найти CSS, polyfill и registration файлы.
- Если side effects есть, указать их массивом.
- Собрать production build consumer-приложения.
- Сравнить bundle stats до и после.
- Проверить SSR, если библиотека используется в SSR.
- Проверить, что стили и initialization logic не пропали.
- Добавить regression test или demo scenario, если есть риск.

Главная идея: сначала доказать, какие файлы действительно pure, и только потом менять `package.json`.

</td></tr></table>

</details>

<details>
<summary>Что спросить на code review, если в PR добавляют <code>"sideEffects": false</code>?</summary><br>
<table><tr><td>

Стоит проверить не только уменьшение bundle size, но и безопасность изменения:

- есть ли в пакете top-level side effects;
- есть ли CSS или polyfill imports;
- есть ли регистрация custom elements;
- есть ли global listeners;
- есть ли изменения prototypes или global objects;
- проверяли ли production build consumer-приложения;
- сравнили ли bundle stats до и после;
- не сломается ли SSR;
- нужно ли указать массив side-effect files вместо `false`.

На review важно просить evidence: stats, production build и короткий список файлов, которые считаются side-effectful.

</td></tr></table>

</details>

<details>
<summary>Какой короткий вывод по <code>sideEffects</code> и tree shaking?</summary><br>
<table><tr><td>

`sideEffects` — это contract между package author и bundler. Он может заметно уменьшить bundle size, но неправильная
настройка ломает production build. Для библиотек безопасная стратегия такая: ESM, маленькие entry points, минимум
top-level логики, явный список side-effect files и проверка результата в consumer-приложении.

</td></tr></table>

</details>

<details>
<summary>Зачем Angular library нужны migrations и schematics?</summary><br>
<table><tr><td>

Schematics автоматизируют изменения workspace и consumer code. Migration нужна, когда новая версия меняет API,
selectors, imports или конфигурацию.

Хорошая migration:

- идемпотентна;
- сохраняет форматирование и комментарии;
- имеет fixtures/snapshot tests;
- сообщает о случаях, которые нельзя исправить автоматически;
- не меняет несвязанный код.

</td></tr></table>

</details>

<details>
<summary>Как документировать и тестировать component library?</summary><br>
<table><tr><td>

Для каждого public component нужны:

- назначение и ограничения;
- imports/providers;
- inputs, outputs и examples;
- accessibility и keyboard behavior;
- theming contract;
- migration/deprecation notes.

Тестируют behavior, harness API, forms integration, overlays, SSR и visual states. Demo/documentation app одновременно
служит integration consumer, но не заменяет automated tests.

</td></tr></table>

</details>

<details>
<summary>Почему <code>"sideEffects": false</code> не заменяет хорошую архитектуру пакета?</summary><br>
<table><tr><td>

Этот флаг только дает bundler подсказку. Если пакет устроен как один большой entry point с тяжелыми imports,
неаккуратными barrels и top-level initialization, tree shaking все равно может быть хуже. Хорошая библиотека должна быть
спроектирована для статического анализа.

Практичный ориентир: consumer должен иметь возможность импортировать маленькую часть API без загрузки всего `ui-kit`.

</td></tr></table>

</details>

### Micro Frontends

Практический пример: [`examples/angular/mfe`](/examples/angular/mfe/movie-ticket/index.html).

В этом демо можно увидеть:

- host/shell приложение [`movie-ticket`](/examples/angular/mfe/movie-ticket/index.html);
- remote widgets [`movies`](/examples/angular/mfe/movies/index.html) и
  [`ticket-availability`](/examples/angular/mfe/ticket-availability/index.html);
- federation manifest и `remoteEntry.json`;
- runtime loading и host orchestration через Angular inputs/outputs;
- независимые loading/error states и fallback UI;
- SSR-safe browser-only mounting через `afterNextRender()`.

Инструкции по запуску находятся в [`examples/angular/mfe/README.md`](../../../apps/angular/mfe/README.md).

**Базовые понятия**

#### Middle+ or Senior

<details>
<summary>Что такое микрофронтенды и какую проблему они решают?</summary><br>
<table><tr><td>

Микрофронтенды разделяют frontend на автономные части, за которые могут отвечать разные команды. Они помогают независимо
разрабатывать и выпускать крупные продуктовые области, но добавляют распределенные контракты, инфраструктуру и риски
времени выполнения.

</td></tr></table>

</details>

<details>
<summary>Чем микрофронтенд отличается от обычного lazy-loaded Angular route?</summary><br>
<table><tr><td>

Lazy route остается частью одной сборки и одного release-процесса. Микрофронтенд может собираться, размещаться и
загружаться отдельно, поэтому его версия и доступность не обязательно совпадают с host.

</td></tr></table>

</details>

<details>
<summary>Что такое shell/host application?</summary><br>
<table><tr><td>

Host — приложение-контейнер. Оно задает общий layout, навигацию, интеграционные контракты и загружает remote-модули или
виджеты, а также обрабатывает их loading и error states.

</td></tr></table>

</details>

<details>
<summary>Что такое remote application?</summary><br>
<table><tr><td>

Remote — отдельно собираемое приложение, которое публикует доступные host части через federation metadata. Оно должно
иметь явный публичный контракт и по возможности не зависеть от внутренних деталей host.

</td></tr></table>

</details>

<details>
<summary>Когда микрофронтенды оправданы, а когда это лишнее усложнение?</summary><br>
<table><tr><td>

Они оправданы при нескольких автономных командах, независимых release cycles и устойчивых domain boundaries. Для
небольшой команды, единого продукта и общего деплоя modular monolith обычно дешевле и надежнее.

</td></tr></table>

</details>

<details>
<summary>Почему микрофронтенды часто сложнее монолита?</summary><br>
<table><tr><td>

В монолите компилятор и единая сборка проверяют большую часть связей заранее. В микрофронтендах часть ошибок проявляется
только при интеграции конкретных независимо развернутых версий через сеть.

</td></tr></table>

</details>

<details>
<summary>Что такое independent deployment?</summary><br>
<table><tr><td>

Это возможность выпустить remote без обязательной пересборки и публикации host или других remote. Для этого нужны
совместимые контракты, отдельные pipelines, контролируемые URL и стратегия rollback.

</td></tr></table>

</details>

<details>
<summary>Какие границы микрофронтендов бывают: route-level, widget-level, domain-level?</summary><br>
<table><tr><td>

Route-level делит приложение по страницам, widget-level встраивает независимые блоки в одну страницу, domain-level
следует бизнес-областям. Domain boundary описывает ответственность, а route и widget — способ композиции UI.

</td></tr></table>

</details>

<details>
<summary>Чем route-level federation отличается от widget-level federation?</summary><br>
<table><tr><td>

Route-level загружает крупный экран при навигации и обычно проще изолирует команды. Widget-level компонует несколько
remote на одной странице, поэтому требует более точной оркестрации, layout-контрактов и независимых состояний ошибки.

</td></tr></table>

</details>

<details>
<summary>Какие минусы есть у микрофронтенд-архитектуры?</summary><br>
<table><tr><td>

Основные минусы: сложнее локальная разработка, тестирование, наблюдаемость, versioning, shared state, согласование UX,
SSR и rollback. Также возможны дубли dependencies и дополнительная задержка runtime-загрузки.

</td></tr></table>

</details>

**Native Federation и runtime loading**

#### Middle+ or Senior

<details>
<summary>Что такое Native Federation?</summary><br>
<table><tr><td>

Native Federation — подход к runtime-композиции приложений на основе стандартных ES modules и import maps. Инструменты
генерируют metadata и согласуют shared dependencies, а браузер загружает модули без webpack runtime.

</td></tr></table>

</details>

<details>
<summary>Что такое <code>remoteEntry.json</code>?</summary><br>
<table><tr><td>

Это сгенерированный entry-файл remote с описанием exposed modules, shared packages и связанных chunks. Host читает его,
чтобы понять, откуда загрузить запрошенный export.

</td></tr></table>

</details>

<details>
<summary>Что такое federation manifest?</summary><br>
<table><tr><td>

Manifest — карта логических имен remote на URL их `remoteEntry.json`. Она отделяет код host от адресов окружения и
позволяет менять расположение remote без пересборки host, если manifest поставляется отдельно.

</td></tr></table>

</details>

<details>
<summary>Зачем host-приложению нужен manifest remote-приложений?</summary><br>
<table><tr><td>

Host использует manifest для разрешения имени remote в конкретный URL. Один и тот же build host может получать разные
адреса для local, stage, production или canary окружений.

</td></tr></table>

</details>

<details>
<summary>Чем runtime-загрузка remote отличается от обычного static import?</summary><br>
<table><tr><td>

Static import известен во время сборки и попадает в dependency graph общего bundle. Runtime-загрузка разрешает модуль
после запуска приложения, поэтому требует сетевой обработки ошибок и runtime-проверки контракта.

</td></tr></table>

</details>

<details>
<summary>Что делает <code>initFederation()</code>?</summary><br>
<table><tr><td>

`initFederation()` загружает federation metadata, подготавливает shared dependencies и import maps до bootstrap
приложения. После инициализации host может обращаться к remote по логическому имени.

</td></tr></table>

</details>

<details>
<summary>Что делает <code>loadRemoteModule()</code>?</summary><br>
<table><tr><td>

`loadRemoteModule()` находит remote через ранее загруженную конфигурацию, загружает его entry и exposed module, затем
возвращает namespace ES module. Наличие ожидаемого export приложение проверяет отдельно.

</td></tr></table>

</details>

<details>
<summary>Что такое shared dependencies?</summary><br>
<table><tr><td>

Это packages, которые host и remotes договариваются использовать совместно вместо загрузки отдельных копий. Sharing
уменьшает bundle, но требует совместимых версий и корректной настройки singleton-пакетов.

</td></tr></table>

</details>

<details>
<summary>Зачем нужны <code>singleton</code>, <code>strictVersion</code> и <code>requiredVersion</code>?</summary><br>
<table><tr><td>

`singleton` требует один runtime instance package, `requiredVersion` задает допустимую версию, а `strictVersion`
запрещает несовместимый fallback. Вместе они делают конфликт версий явной ошибкой вместо скрытого повреждения runtime.

</td></tr></table>

</details>

<details>
<summary>Что может пойти не так, если host и remote используют разные версии Angular?</summary><br>
<table><tr><td>

Возможны несовместимые runtime contracts, несколько Angular instances, ошибки DI, rendering и signals. Допустимость
версий должна проверяться federation-конфигурацией, CI и integration tests.

</td></tr></table>

</details>

<details>
<summary>Почему Angular и RxJS обычно шарят как singleton?</summary><br>
<table><tr><td>

Angular ожидает согласованный framework runtime и injector graph, а разделяемые RxJS-контракты проще поддерживать с
одной совместимой копией. Несколько версий увеличивают bundle и риск несовместимости типов и поведения.

</td></tr></table>

</details>

<details>
<summary>Что такое import map?</summary><br>
<table><tr><td>

Import map сопоставляет bare module specifiers с URL ES modules в браузере. Native Federation может формировать такую
карту для shared packages и remote-зависимостей.

</td></tr></table>

</details>

<details>
<summary>Почему браузер может не зарезолвить bare specifier вроде <code>@softarc/native-federation-orchestrator</code>?</summary><br>
<table><tr><td>

Браузер не знает npm resolution. Для bare specifier должен существовать import map или bundler-преобразование; иначе
возникает ошибка разрешения модуля. Также import map должна быть загружена до первого import.

</td></tr></table>

</details>

<details>
<summary>Почему deprecated API не всегда означает, что код немедленно сломан?</summary><br>
<table><tr><td>

Deprecated API пока может оставаться совместимым, но больше не рекомендуется и может быть удален позже. Нужно проверить
версию, migration path и фактическое поведение, а не заменять API вслепую.

</td></tr></table>

</details>

**Dynamic components**

#### Middle+ or Senior

<details>
<summary>Как динамически создать Angular-компонент через <code>ViewContainerRef.createComponent()</code>?</summary><br>
<table><tr><td>

Нужно получить `ViewContainerRef`, загрузить `Type<T>` компонента и вызвать `container.createComponent(componentType)`.
Метод вставит host view в контейнер и вернет `ComponentRef<T>` для дальнейшей настройки.

</td></tr></table>

</details>

<details>
<summary>Что такое <code>ComponentRef</code>?</summary><br>
<table><tr><td>

`ComponentRef` — ссылка на созданный экземпляр компонента и его host view. Через нее доступны `instance`, `setInput()`,
`changeDetectorRef`, lifecycle callback `onDestroy()` и метод `destroy()`.

</td></tr></table>

</details>

<details>
<summary>Как передать input в динамически созданный компонент?</summary><br>
<table><tr><td>

После создания вызывают `componentRef.setInput('inputName', value)`. Имя должно совпадать с публичным input или его
alias, а передаваемое значение — с интеграционным контрактом remote.

</td></tr></table>

</details>

<details>
<summary>Почему <code>ComponentRef.setInput()</code> лучше прямого присваивания свойства?</summary><br>
<table><tr><td>

`setInput()` проходит через Angular input pipeline, корректно обновляет signal inputs, учитывает transforms и помечает
view для проверки. Прямое присваивание обходит этот контракт и может не запустить ожидаемое обновление.

</td></tr></table>

</details>

<details>
<summary>Как подписаться на output динамически созданного компонента?</summary><br>
<table><tr><td>

Нужно получить публичный output с `componentRef.instance` и вызвать `subscribe()`. Подписку следует связать с lifecycle
компонента или host, например отписаться в callback `componentRef.onDestroy()`.

</td></tr></table>

</details>

<details>
<summary>Как правильно уничтожать динамически созданные компоненты?</summary><br>
<table><tr><td>

Компонент уничтожают через `ComponentRef.destroy()` или очистку владеющего `ViewContainerRef`. Одновременно нужно
освободить внешние subscriptions, listeners и другие ресурсы, которые Angular не контролирует.

</td></tr></table>

</details>

<details>
<summary>Зачем хранить <code>ComponentRef</code> и вызывать <code>destroy()</code>?</summary><br>
<table><tr><td>

Ссылка нужна для последующих inputs, подписки на outputs и явного lifecycle management. Без уничтожения могут остаться
view, subscriptions и ссылки на данные, что приводит к утечкам и повторной обработке событий.

</td></tr></table>

</details>

<details>
<summary>Почему <code>viewChild.required()</code> нельзя вызывать слишком рано?</summary><br>
<table><tr><td>

Query signal получает значение только после создания соответствующего элемента view. Чтение до завершения render
приведет к ошибке required query, поэтому DOM-зависимую работу откладывают до подходящей render phase.

</td></tr></table>

</details>

<details>
<summary>Зачем иногда передают <code>getContainer: () => ViewContainerRef</code>, а не сам <code>ViewContainerRef</code>?</summary><br>
<table><tr><td>

Функция откладывает чтение query до момента фактического монтирования. Это полезно, когда loader настраивается раньше,
чем Angular создал template container.

</td></tr></table>

</details>

**Коммуникация между remote-приложениями**

#### Middle+ or Senior

<details>
<summary>Как remote-приложения могут общаться между собой?</summary><br>
<table><tr><td>

Через host orchestration, URL, backend, shared event bus или browser events. Выбор зависит от lifetime состояния,
необходимости deep link, надежности и допустимой связанности между командами.

</td></tr></table>

</details>

<details>
<summary>Почему прямое общение remote-to-remote может быть проблемой?</summary><br>
<table><tr><td>

Один remote начинает знать API и lifecycle другого, из-за чего их нельзя независимо заменить или загрузить. Такая связь
также усложняет versioning, тестирование и обработку частичной недоступности.

</td></tr></table>

</details>

<details>
<summary>Что такое host orchestration?</summary><br>
<table><tr><td>

Host принимает события remote, применяет общую бизнес-навигацию и передает данные другим remote через их публичные
контракты. Remote при этом не импортируют и не ищут друг друга напрямую.

</td></tr></table>

</details>

<details>
<summary>Как host может связать output одного remote с input другого remote?</summary><br>
<table><tr><td>

Host подписывается на output первого `ComponentRef`, а в обработчике вызывает `setInput()` второго. В демо
`movieSelected` передает выбранный фильм в input `movie` виджета доступности билетов.

</td></tr></table>

</details>

<details>
<summary>Чем <code>CustomEvent</code> отличается от Angular <code>output()</code> / <code>input()</code> через host?</summary><br>
<table><tr><td>

Angular inputs/outputs типизированы и привязаны к component lifecycle. `CustomEvent` распространяется через DOM или
`window`, доступен вне Angular, но использует строковые имена и требует ручного listener management.

</td></tr></table>

</details>

<details>
<summary>Какие плюсы и минусы у коммуникации через <code>window.dispatchEvent()</code>?</summary><br>
<table><tr><td>

Плюсы — слабая технологическая связанность и простой межфреймворковый transport. Минусы — глобальное пространство имен,
слабая типизация, неявный поток данных, ручная очистка listeners и отсутствие browser globals при SSR.

</td></tr></table>

</details>

<details>
<summary>Почему <code>window.addEventListener()</code> может быть проблемой при SSR?</summary><br>
<table><tr><td>

На сервере `window` отсутствует, поэтому регистрация listener во время server render завершится ошибкой. Ее выполняют
только в browser phase и обязательно снимают при уничтожении владельца.

</td></tr></table>

</details>

<details>
<summary>Когда стоит использовать shared event bus?</summary><br>
<table><tr><td>

Когда нескольким независимо загружаемым частям нужен ограниченный набор асинхронных domain events. Bus должен иметь
версионированные типы, владельца и правила lifecycle, иначе он быстро превращается в неявное глобальное состояние.

</td></tr></table>

</details>

<details>
<summary>Когда лучше использовать URL/query params для состояния?</summary><br>
<table><tr><td>

Для состояния навигации, фильтров и выбранных сущностей, которое должно поддерживать deep link, back/forward и
перезагрузку страницы. Секретные или большие данные в URL помещать не следует.

</td></tr></table>

</details>

<details>
<summary>Когда состояние лучше хранить на backend?</summary><br>
<table><tr><td>

Когда оно должно переживать сессии, быть общим для устройств или пользователей, участвовать в транзакциях и иметь
серверную авторизацию. Frontend тогда хранит только идентификатор и локальное представление.

</td></tr></table>

</details>

<details>
<summary>Почему для микрофронтендов важны явные контракты?</summary><br>
<table><tr><td>

Remote выпускаются независимо, поэтому inputs, outputs, exposed modules и payload schemas заменяют compile-time связь.
Явные контракты можно версионировать, тестировать и сохранять совместимыми.

</td></tr></table>

</details>

**Loading, error states и fallback**

#### Middle+ or Senior

<details>
<summary>Что произойдет, если один remote недоступен?</summary><br>
<table><tr><td>

Его entry или chunks не загрузятся, и операция вернет ошибку. Host должен локализовать сбой в соответствующем slot,
показать fallback и не блокировать независимые части страницы.

</td></tr></table>

</details>

<details>
<summary>Чем required remote отличается от optional remote?</summary><br>
<table><tr><td>

Без required remote основной сценарий не имеет смысла, поэтому host может показать page-level error. Optional remote
дополняет сценарий: при сбое его slot скрывают или заменяют fallback, сохраняя остальную страницу.

</td></tr></table>

</details>

<details>
<summary>Почему <code>Promise.all()</code> может быть опасен при загрузке нескольких независимых remote?</summary><br>
<table><tr><td>

Он отклоняется после первой ошибки и не возвращает успешные результаты остальных promises. Если виджеты независимы,
общая операция может ошибочно превратить частичный сбой в отказ всей композиции.

</td></tr></table>

</details>

<details>
<summary>Когда лучше использовать <code>Promise.allSettled()</code>?</summary><br>
<table><tr><td>

Когда каждый remote имеет собственный loading/error state и успешные виджеты должны продолжить работу. Результаты
`fulfilled` и `rejected` обрабатывают по отдельности.

</td></tr></table>

</details>

<details>
<summary>Как host должен показывать loading/error state для каждого remote slot?</summary><br>
<table><tr><td>

Каждый slot имеет стабильный контейнер, собственный индикатор загрузки, доступное сообщение об ошибке и при
необходимости retry. Ошибка одного slot не должна визуально маскировать состояние другого.

</td></tr></table>

</details>

<details>
<summary>Почему у каждого remote widget должен быть свой status: <code>idle</code>, <code>loading</code>, <code>ready</code>, <code>error</code>?</summary><br>
<table><tr><td>

Явная state machine исключает неоднозначные комбинации boolean flags и упрощает template control flow. Она также
позволяет отдельно измерять время загрузки, ошибки и повторные попытки каждого remote.

</td></tr></table>

</details>

<details>
<summary>Что должен делать host, если <code>movies</code> загрузился, а <code>ticket-availability</code> нет?</summary><br>
<table><tr><td>

Показать список фильмов и fallback в slot доступности. Выбор фильма можно сохранить, но действие, зависящее от второго
remote, нужно отключить или объяснить пользователю.

</td></tr></table>

</details>

<details>
<summary>Что должен делать host, если <code>ticket-availability</code> загрузился, а <code>movies</code> нет?</summary><br>
<table><tr><td>

Показать fallback списка фильмов. Виджет доступности может остаться в empty state, если без выбранного фильма он не
имеет самостоятельного сценария.

</td></tr></table>

</details>

<details>
<summary>Как добавить retry для недоступного remote?</summary><br>
<table><tr><td>

Host повторно переводит конкретный slot в `loading` и запускает его mount после действия пользователя или ограниченного
backoff. Перед retry нужно очистить прежний `ComponentRef`, error и незавершенные subscriptions.

</td></tr></table>

</details>

<details>
<summary>Где лучше хранить статусы remote-виджетов: в компоненте, сервисе или store?</summary><br>
<table><tr><td>

Локальный slot state удобно хранить в host component или scoped loader service. Общий store нужен только если статус
используют удаленные части приложения, аналитика или централизованная recovery-логика.

</td></tr></table>

</details>

<details>
<summary>Почему сервис загрузки remote не должен знать бизнес-логику приложения?</summary><br>
<table><tr><td>

Loader отвечает за разрешение модуля, создание компонента и технический lifecycle. Решения о фильмах, бронировании и
доступности принадлежат host orchestration или domain services, иначе loader нельзя переиспользовать.

</td></tr></table>

</details>

**SSR и hydration**

#### Middle+ or Senior

<details>
<summary>Могут ли remote-приложения быть SSR?</summary><br>
<table><tr><td>

Да, но server renderer должен уметь разрешить remote, загрузить совместимый server bundle и согласовать HTML с
последующей hydration. Это заметно сложнее browser-only композиции.

</td></tr></table>

</details>

<details>
<summary>Какие дополнительные сложности появляются при SSR и micro frontends?</summary><br>
<table><tr><td>

Нужно согласовать server и browser entries, сетевую доступность remote с сервера, shared dependencies, latency,
кеширование, ошибки частичного render и детерминированный HTML для hydration.

</td></tr></table>

</details>

<details>
<summary>Почему при SSR возникает ошибка <code>window is not defined</code>?</summary><br>
<table><tr><td>

Server runtime не предоставляет browser global `window`. Ошибка возникает, если код обращается к нему при import,
создании компонента или server render до проверки платформы.

</td></tr></table>

</details>

<details>
<summary>Почему при SSR возникает ошибка <code>document is not defined</code>?</summary><br>
<table><tr><td>

Node server не имеет browser DOM `document`. Прямой DOM-код и browser-only libraries нужно изолировать от server path
или запускать после перехода в browser render phase.

</td></tr></table>

</details>

<details>
<summary>Почему <code>ngOnInit</code> не всегда подходит для загрузки remote widgets?</summary><br>
<table><tr><td>

`ngOnInit` выполняется и при SSR, а view containers могут быть еще не готовы. Browser-only remote лучше монтировать
после первого client render, когда доступны DOM и view queries.

</td></tr></table>

</details>

<details>
<summary>Когда использовать <code>afterNextRender()</code>?</summary><br>
<table><tr><td>

Когда интеграция требует созданного DOM, browser APIs или доступного `ViewContainerRef` после следующего render. Render
callbacks не выполняются на сервере, поэтому подходят для browser-only монтирования.

</td></tr></table>

</details>

<details>
<summary>Почему remote widgets часто монтируют только на клиенте, даже если shell поддерживает SSR?</summary><br>
<table><tr><td>

Так shell сохраняет SEO и быстрый initial HTML, а remote integration избегает server federation, browser globals и
hydration mismatch. Цена — placeholder до client mount и более поздняя готовность виджета.

</td></tr></table>

</details>

<details>
<summary>Как сделать SSR-safe код в Angular?</summary><br>
<table><tr><td>

Не обращаться к browser globals на уровне модуля, использовать platform-neutral APIs, изолировать browser services и
выполнять DOM-интеграции в render callbacks или после явной проверки платформы.

</td></tr></table>

</details>

<details>
<summary>Что такое <code>BootstrapContext</code> в server bootstrap?</summary><br>
<table><tr><td>

`BootstrapContext` передает Angular server bootstrap контекст конкретного запроса, включая platform injector. Он нужен
для корректной изоляции и настройки server-rendered приложения.

</td></tr></table>

</details>

<details>
<summary>Почему <code>bootstrapApplication</code> на сервере требует <code>BootstrapContext</code>?</summary><br>
<table><tr><td>

Server renderer создает контекст для запроса и ожидает, что bootstrap использует его. Без контекста приложение может
создать неподходящую platform instance или потерять request-scoped providers.

</td></tr></table>

</details>

<details>
<summary>Чем <code>main.ts</code> отличается от <code>main.server.ts</code>?</summary><br>
<table><tr><td>

Browser entry инициализирует приложение в DOM и может настраивать client federation. Server entry экспортирует bootstrap
для renderer, принимает `BootstrapContext` и не должен выполнять browser-only код.

</td></tr></table>

</details>

<details>
<summary>Почему manifest может открываться в браузере, но не загружаться во время SSR?</summary><br>
<table><tr><td>

URL `localhost` с точки зрения server process, container или cloud runtime может указывать не туда, куда в браузере.
Также мешают DNS, CORS-подобные gateway rules, TLS, network policy и отсутствие запущенного remote.

</td></tr></table>

</details>

<details>
<summary>Что такое hydration mismatch и как микрофронтенды могут его спровоцировать?</summary><br>
<table><tr><td>

Mismatch возникает, когда client ожидает DOM, отличный от server HTML. Remote может изменить разметку до hydration,
отрендерить разные данные или создать browser-only элементы в server-rendered области.

</td></tr></table>

</details>

**Deployment, versioning и rollback**

#### Middle+ or Senior

<details>
<summary>Как деплоить host и remote-приложения независимо?</summary><br>
<table><tr><td>

У каждого приложения должен быть отдельный build и release pipeline. Remote сначала публикует versioned assets, затем
контролируемо обновляется manifest; host выпускается отдельно и сохраняет совместимость с доступными версиями remote.

</td></tr></table>

</details>

<details>
<summary>Какие артефакты деплоит remote-приложение?</summary><br>
<table><tr><td>

`remoteEntry.json`, JavaScript chunks, styles, assets и при необходимости server bundle. Все ссылки из entry должны
оставаться доступными как единый согласованный release.

</td></tr></table>

</details>

<details>
<summary>Где должен лежать <code>remoteEntry.json</code> после деплоя?</summary><br>
<table><tr><td>

По стабильному HTTPS URL, доступному host и разрешенному security policy. Часто это CDN path, связанный с приложением
или версией, например `/movies/1.4.2/remoteEntry.json`.

</td></tr></table>

</details>

<details>
<summary>Где хранить manifest для dev/stage/prod?</summary><br>
<table><tr><td>

В environment-specific конфигурации или config service, управляемом deployment pipeline. Не следует вручную менять
production manifest без истории, валидации и возможности быстрого rollback.

</td></tr></table>

</details>

<details>
<summary>Как host узнает URL нового remote-приложения?</summary><br>
<table><tr><td>

Из manifest, который загружается при старте или встраивается для конкретного окружения. Обновление mapping переключает
host на новый remote без изменения его application code.

</td></tr></table>

</details>

<details>
<summary>Что будет, если host старый, а remote новый?</summary><br>
<table><tr><td>

Все продолжит работать только при backward-compatible remote contract. Удаленный export, переименованный input или
измененная payload schema приведут к runtime-ошибке старого host.

</td></tr></table>

</details>

<details>
<summary>Что будет, если remote старый, а host новый?</summary><br>
<table><tr><td>

Новый host может запросить отсутствующий export или передать неподдерживаемые данные. Поэтому host должен либо
поддерживать старый контракт, либо проверять capability/version до использования новой функции.

</td></tr></table>

</details>

<details>
<summary>Как версионировать контракты между host и remote?</summary><br>
<table><tr><td>

Версионируют exposed modules, TypeScript/schema package или capability metadata по SemVer. Breaking change получает
новую major-версию или новый параллельный contract identifier.

</td></tr></table>

</details>

<details>
<summary>Как организовать backward compatibility между host и remote?</summary><br>
<table><tr><td>

Сначала remote добавляет новый API, сохраняя старый, затем обновляются consumers, и только после измеренного перехода
удаляется legacy contract. Полезны defaults, optional fields и tolerant readers.

</td></tr></table>

</details>

<details>
<summary>Как безопасно изменить <code>exposedModule</code> или <code>exportName</code>?</summary><br>
<table><tr><td>

Временно публиковать старое и новое имя, обновить host, проверить production usage и только затем удалить alias.
Изменение должно проходить contract и integration tests.

</td></tr></table>

</details>

<details>
<summary>Почему нельзя бездумно переименовывать exposed module?</summary><br>
<table><tr><td>

Его имя — часть runtime API, записанная в host configuration. В отличие от внутреннего refactoring, компилятор remote не
найдет внешних consumers и не предупредит об их поломке.

</td></tr></table>

</details>

<details>
<summary>Как организовать rollback remote-приложения?</summary><br>
<table><tr><td>

Хранить предыдущие immutable releases и атомарно вернуть manifest mapping на проверенный `remoteEntry.json`. Старые
entry и chunks нельзя удалять до завершения cache TTL и активных сессий.

</td></tr></table>

</details>

<details>
<summary>Как организовать rollback host-приложения?</summary><br>
<table><tr><td>

Повторно активировать предыдущий host release и соответствующую конфигурацию manifest. Rollback должен учитывать, что
remote уже могли перейти вперед, поэтому их контракты обязаны быть backward-compatible.

</td></tr></table>

</details>

<details>
<summary>Какие риски есть у кеширования <code>remoteEntry.json</code>?</summary><br>
<table><tr><td>

Устаревший entry может ссылаться на удаленные chunks или старый контракт. Смешивание entry одного release с assets
другого вызывает ошибки импорта, которые трудно воспроизвести локально.

</td></tr></table>

</details>

<details>
<summary>Нужно ли кешировать federation manifest?</summary><br>
<table><tr><td>

Да, но обычно с коротким TTL, revalidation или управляемым versioned URL. Стратегия зависит от того, насколько быстро
нужно переключать remote и отключать аварийный release.

</td></tr></table>

</details>

<details>
<summary>Почему <code>remoteEntry.json</code> часто кешируют осторожнее, чем JS chunks?</summary><br>
<table><tr><td>

Entry является изменяемой картой текущего release, а content-hashed chunks immutable. Chunks можно кешировать надолго,
тогда как entry должен достаточно быстро указывать на актуальный набор файлов.

</td></tr></table>

</details>

<details>
<summary>Как CDN влияет на деплой микрофронтендов?</summary><br>
<table><tr><td>

CDN снижает latency и распределяет assets, но добавляет cache keys, propagation delay, CORS/CSP настройки и
invalidation. Release должен учитывать согласованность entry и chunks во всех edge locations.

</td></tr></table>

</details>

<details>
<summary>Как CDN cache может сломать загрузку remote?</summary><br>
<table><tr><td>

Очистка устаревшего entry может быстро переключить клиентов на исправление. Но удаление старых chunks или
несогласованная invalidation оставит открытые сессии с entry, ссылки которого больше не работают.

</td></tr></table>

</details>

<details>
<summary>Что такое canary deployment для remote-приложения?</summary><br>
<table><tr><td>

Это направление небольшой доли пользователей или внутренних сотрудников на новую версию remote. Manifest или edge
routing выбирает версию, а метрики сравниваются до полного rollout.

</td></tr></table>

</details>

<details>
<summary>Как feature flags помогают деплоить микрофронтенды?</summary><br>
<table><tr><td>

Flag может включить новый remote, contract path или функцию для выбранной аудитории без повторной сборки. Нужны
предсказуемый fallback, владелец flag и удаление завершенных флагов.

</td></tr></table>

</details>

<details>
<summary>Как откатить сломанный remote без деплоя host?</summary><br>
<table><tr><td>

Изменить управляемый manifest/config или remote feature flag так, чтобы host не монтировал виджет либо использовал
резервную версию. Host должен заранее поддерживать отсутствие optional remote.

</td></tr></table>

</details>

<details>
<summary>Что должен показывать host, если remote не загрузился после деплоя?</summary><br>
<table><tr><td>

Локальный доступный fallback с понятным сообщением и retry, если повтор может помочь. Критический remote может
переводить весь сценарий в error state, но не должен оставлять пустой экран без объяснения.

</td></tr></table>

</details>

<details>
<summary>Какие метрики и алерты нужны для микрофронтендов в production?</summary><br>
<table><tr><td>

Успешность и latency загрузки entry/chunks, mount time, ошибки по remote/version, fallback rate, contract errors и
влияние на Core Web Vitals. Алерт должен указывать конкретный remote и release.

</td></tr></table>

</details>

<details>
<summary>Как логировать ошибки загрузки remote-приложений?</summary><br>
<table><tr><td>

Добавлять remote name, entry URL, exposed module, host/remote versions, environment, этап загрузки и correlation ID.
Секреты и персональные payloads в client logs отправлять нельзя.

</td></tr></table>

</details>

<details>
<summary>Как проверять совместимость host и remote в CI?</summary><br>
<table><tr><td>

Собирать каждый remote, поднимать его artifacts и запускать contract/integration tests поддерживаемых host versions.
Также проверять shared dependency ranges и наличие всех exposed exports.

</td></tr></table>

</details>

<details>
<summary>Какие contract tests нужны для host и remote?</summary><br>
<table><tr><td>

Это автоматическая проверка публичного соглашения между producer remote и consumer host: имен exports, inputs, outputs,
payload schemas и обязательного поведения без полного E2E всех реализаций.

</td></tr></table>

</details>

<details>
<summary>Какие e2e-сценарии нужны перед выкладкой host и remotes?</summary><br>
<table><tr><td>

Загрузка каждого remote, основной cross-remote flow, partial failure, retry, старая/новая совместимая версия,
navigation, auth и rollback configuration. Проверяют также отсутствие блокировки host при optional remote failure.

</td></tr></table>

</details>

**CSS, UI и Design System**

#### Middle+ or Senior

<details>
<summary>Кто должен отвечать за layout: host или remote?</summary><br>
<table><tr><td>

Host отвечает за page layout, размеры и расположение slots. Remote отвечает за содержимое внутри выделенной области и
должен корректно работать в явно документированных responsive constraints.

</td></tr></table>

</details>

<details>
<summary>Кто должен отвечать за внутренние стили виджета: host или remote?</summary><br>
<table><tr><td>

Remote владеет своей внутренней разметкой и component styles. Host может передавать semantic design tokens и параметры
контейнера, но не должен зависеть от внутренних selectors remote.

</td></tr></table>

</details>

<details>
<summary>Почему host не должен глубоко стилизовать внутренности remote?</summary><br>
<table><tr><td>

Внутренний DOM не является публичным контрактом и может измениться при независимом release. Deep selectors создают
скрытую связанность и ломают encapsulation, тестирование и безопасный rollout.

</td></tr></table>

</details>

<details>
<summary>Какие проблемы со стилями бывают в микрофронтендах?</summary><br>
<table><tr><td>

Конфликты global selectors, разный reset, несовместимые tokens, дубли fonts/styles, различия responsive behavior и
z-index систем. Виджеты также могут менять layout после поздней загрузки.

</td></tr></table>

</details>

<details>
<summary>Как избежать конфликта глобальных CSS-стилей между remote-приложениями?</summary><br>
<table><tr><td>

Минимизировать globals, использовать Angular style encapsulation, scoped naming и согласованный reset в host. Общие
tokens публиковать через CSS custom properties, а не через selectors внутренних элементов.

</td></tr></table>

</details>

<details>
<summary>Как микрофронтенды могут использовать общую design system?</summary><br>
<table><tr><td>

Через versioned package компонентов и semantic tokens с документированным compatibility range. Angular package часто
настраивают как shared dependency, если все remote способны использовать совместимую runtime-версию.

</td></tr></table>

</details>

<details>
<summary>Какие риски есть у разных версий design system в разных remote?</summary><br>
<table><tr><td>

Визуальная несогласованность, разные accessibility fixes, duplicated code и конфликт global assets. При singleton
sharing несовместимые версии могут также привести к runtime-ошибке вместо изолированной копии.

</td></tr></table>

</details>

**Testing и security**

#### Middle+ or Senior

<details>
<summary>Как тестировать remote-приложение отдельно?</summary><br>
<table><tr><td>

Проверять компоненты и domain logic unit/integration-тестами, а exposed contract — через standalone harness или test
host. Remote также должен собираться и запускаться независимо от production host.

</td></tr></table>

</details>

<details>
<summary>Как тестировать host без реальных remote?</summary><br>
<table><tr><td>

Подменить abstraction загрузчика и вернуть локальные test components с теми же inputs/outputs. Так host orchestration и
fallback states тестируются детерминированно без сети и federation runtime.

</td></tr></table>

</details>

<details>
<summary>Как мокать remote widgets в тестах host-приложения?</summary><br>
<table><tr><td>

Создать минимальные standalone components, реализующие нужный публичный контракт, и настроить loader stub возвращать их
`Type`. Не нужно копировать внутренний UI настоящего remote.

</td></tr></table>

</details>

<details>
<summary>Как проверить fallback UI, если remote недоступен?</summary><br>
<table><tr><td>

Настроить loader mock на rejected promise или `null`, запустить mount и проверить доступное сообщение, status `error`,
наличие retry и сохранение работоспособности независимых slots.

</td></tr></table>

</details>

<details>
<summary>Как тестировать контракты между host и remote?</summary><br>
<table><tr><td>

Проверять наличие exposed export, совместимость input/output payloads и ожидаемую реакцию на события. Эти тесты
запускают как в producer pipeline, так и на матрице поддерживаемых consumer versions.

</td></tr></table>

</details>

<details>
<summary>Какие security-риски появляются при runtime-загрузке remote-кода?</summary><br>
<table><tr><td>

Host исполняет JavaScript с правами своего origin: remote может читать доступные данные, менять DOM и выполнять запросы.
Компрометация remote pipeline или CDN становится компрометацией host session.

</td></tr></table>

</details>

<details>
<summary>Почему host должен доверять только известным remoteEntry URL?</summary><br>
<table><tr><td>

URL определяет исполняемый код. Разрешение произвольного адреса из query params или пользовательского ввода превращает
federation loader в механизм удаленного выполнения недоверенного JavaScript.

</td></tr></table>

</details>

<details>
<summary>Что может пойти не так, если manifest можно изменить без контроля?</summary><br>
<table><tr><td>

Злоумышленник или ошибочная автоматизация может перенаправить host на вредоносный или несовместимый remote. Нужны
ограниченный доступ, audit log, validation, approvals и rollback.

</td></tr></table>

</details>

<details>
<summary>Как CSP влияет на загрузку remote-приложений?</summary><br>
<table><tr><td>

`script-src`, `connect-src` и связанные directives должны разрешать доверенные CDN и способы загрузки модулей. Слишком
широкая CSP ослабляет защиту, а слишком узкая блокирует entry, chunks или source maps.

</td></tr></table>

</details>

<details>
<summary>Что такое supply chain risk в микрофронтендах?</summary><br>
<table><tr><td>

Это риск компрометации dependency, build pipeline, registry, artifact storage или CDN одного remote. Из-за композиции во
время выполнения вредоносный release попадает в host без изменения его репозитория.

</td></tr></table>

</details>

<details>
<summary>Как ограничить влияние сломанного или небезопасного remote?</summary><br>
<table><tr><td>

Использовать allowlist URL, CSP, независимые permissions, минимальные публичные данные, мониторинг и аварийное
отключение. Для недоверенного кода нужна более сильная изоляция, например iframe с sandbox, а не обычный Angular
component.

</td></tr></table>

</details>

### Tooling

Feature toggles в Angular часто реализуют через service, guard, directive или provider. Общие типы флагов, lifecycle,
риски и fallback-стратегии описаны в разделе [Feature toggles](../infrastructure/index.md#feature-toggles).

#### Junior

<details>
<summary>Что такое TypeScript program?</summary><br>
<table><tr><td>

`Program` — модель набора source files, compiler options и module graph, которую создает TypeScript compiler API.
Compiler выполняет type checking только для файлов, входящих в этот graph. Angular compiler расширяет его анализом
decorators и templates.

</td></tr></table>

</details>

<details>
<summary>Зачем нужен <code>tsconfig.app.json</code>?</summary><br>
<table><tr><td>

Он задает compiler options и roots именно application build, отделяя их от tests, tools и base `tsconfig.json`. Angular
builder получает его из `angular.json`. Разные targets могут использовать разные типы и entry files.

</td></tr></table>

</details>

<details>
<summary>Что такое Angular builder?</summary><br>
<table><tr><td>

Builder — реализация target вроде `build`, `serve` или `test`, настроенная в `angular.json`. Она получает options,
запускает compiler/bundler и возвращает результат CLI. Custom builder позволяет заменить или обернуть build pipeline.

</td></tr></table>

</details>

#### Middle

<details>
<summary>Какие frontend guidelines особенно важны для Angular-проекта?</summary><br>
<table><tr><td>

Для Angular-проекта важны соглашения о структуре standalone components, signals и RxJS, smart/presentational components,
forms, HTTP services, error handling, lazy loading, testing и naming. Без таких правил разные части приложения начинают
выглядеть как разные frameworks внутри одного репозитория.

</td></tr></table>

</details>

<details>
<summary>Почему Angular compiler требует, чтобы файл с <code>@Component</code> входил в TypeScript compilation?</summary><br>
<table><tr><td>

Angular анализирует component metadata в рамках TypeScript program. Если файл не является root и не достижим через
imports, compiler не создаст для него Angular definitions. Физического наличия файла в directory недостаточно.

</td></tr></table>

</details>

<details>
<summary>Чем <code>files</code> отличается от <code>include</code> в tsconfig?</summary><br>
<table><tr><td>

`files` перечисляет точные root files, а `include` выбирает их glob patterns. Imports из root files также входят в
program, если не исключены resolution rules. Узкий `files` легко случайно оставить без нового entry.

</td></tr></table>

</details>

<details>
<summary>Почему файл может физически существовать, но не входить в TypeScript compilation?</summary><br>
<table><tr><td>

Он может не совпадать с `files`/`include`, быть исключен или не импортироваться ни одним root file. Также builder может
использовать другой tsconfig, чем ожидает разработчик. Проверить состав помогает `tsc --listFiles`.

</td></tr></table>

</details>

<details>
<summary>Что такое Vite dev server в Angular?</summary><br>
<table><tr><td>

Современный Angular development server использует Vite для быстрой раздачи и обновления приложения, оставаясь под
управлением Angular builder. Angular CLI настраивает compilation, assets и framework integration. Это не означает, что
проект обязан иметь ручной `vite.config`.

</td></tr></table>

</details>

#### Middle+ or Senior

<details>
<summary>Что стоит фиксировать в Angular coding guidelines?</summary><br>
<table><tr><td>

Стоит фиксировать структуру feature folders, правила для components, services, directives и pipes, подход к state
management, forms, error handling, loading states и тестированию. Также полезно описать, когда использовать signals,
когда RxJS, а когда обычные class fields или pure functions.

</td></tr></table>

</details>

### Frontend topics в Angular

#### Junior

<details>
<summary>Что такое esbuild?</summary><br>
<table><tr><td>

esbuild — быстрый bundler и transformer на Go. Angular application builder использует его как часть build pipeline для
bundling и оптимизаций вместе с Angular compiler. Он не заменяет template type checking.

</td></tr></table>

</details>

#### Middle

<details>
<summary>Как тестировать Angular-компонент с async data fetching?</summary><br>
<table><tr><td>

Проверяют не внутренний вызов метода, а observable behavior: loading state, успешный render, empty state, error state и
отмену устаревшего запроса, если она является частью контракта.

Подходы:

- pure logic вынести и покрыть unit tests;
- компонент проверить через TestBed или Angular Testing Library;
- HTTP boundary подменить fake service или `HttpTestingController`;
- для reusable UI components использовать Component Harness;
- critical user flow проверить Playwright/Cypress.

```ts
TestBed.configureTestingModule({
  providers: [{provide: UserApi, useValue: userApiStub}],
});

const fixture = TestBed.createComponent(UserCardComponent);
fixture.componentRef.setInput('userId', '42');
fixture.detectChanges();

expect(fixture.nativeElement.textContent).toContain('Загрузка');
```

Тест должен управлять временем и данными явно, а не ждать произвольные delays.

</td></tr></table>

</details>

<details>
<summary>Требования к написанию кода на TypeScript</summary><br>
<table><tr><td>

На самом деле требования бывают разные и зависят от команды к команде. Самые эффективные для себя считаю использование
модификаторов доступа и принудительного указания типов данных для всех переменных, методов и членов класса, которые вы
используете в коде. Желательно все необходимые правила конвенции кода настраивать в ESLint.

```ts
// my.ts
export interface My {}

// my-impl.ts
export class MyImp implements My {
  public field: string;

  public myMethod(): void {
    // ...
  }

  private myProtectedMethod(): Date {
    return new Date();
  }

  private myPrivateMethod(): MyClassImpl {
    // ...

    return this;
  }
}
```

</td></tr></table>

</details>

<details>
<summary>Зачем нужен ESLint (TSLint) и Prettier?</summary><br>
<table><tr><td>

**ESLint** анализирует код и находит потенциальные ошибки, небезопасные конструкции и нарушения соглашений. С TypeScript
он работает через typescript-eslint, а Angular-правила предоставляет angular-eslint.

**Prettier** отвечает за форматирование: отступы, переносы, кавычки и другие визуальные правила. Он не заменяет
семантический анализ ESLint.

**TSLint** устарел и больше не развивается; современные TypeScript-проекты используют ESLint.

Обычная схема:

- редактор форматирует Prettier;
- ESLint проверяет качество кода и Angular templates;
- CI запускает lint и format check;
- правила форматирования ESLint, конфликтующие с Prettier, отключаются.

Цель инструментов — быстрый автоматический feedback и единый стиль, а не максимальное количество строгих правил. Правило
должно предотвращать реальную проблему или поддерживать договоренность команды.

</td></tr></table>

</details>

#### Middle+ or Senior

<details>
<summary>Как объяснить Angular PWA cache strategies на интервью?</summary><br>
<table><tr><td>

Нужно разделить app shell, static assets и data requests. App shell и versioned assets можно кешировать агрессивнее,
потому что их имена меняются при build. API data требует отдельной стратегии: freshness, performance, timeout, maxAge,
fallback и правила инвалидирования.

В Angular Service Worker конфигурация описывает asset groups и data groups. Хороший ответ упоминает update flow, offline
fallback, риски stale data и то, что Service Worker не заменяет backend authorization.

```json
{
  "dataGroups": [
    {
      "name": "api",
      "urls": ["/api/**"],
      "cacheConfig": {
        "strategy": "freshness",
        "maxAge": "5m",
        "timeout": "3s"
      }
    }
  ]
}
```

</td></tr></table>

</details>

<details>
<summary>Что такое SSR entry?</summary><br>
<table><tr><td>

Это server-side entry, из которого builder создает bundle для обработки HTTP requests или prerender. Он подключает
server providers и экспортирует bootstrap/handler, а не монтирует приложение в browser DOM. Конкретное имя задается
workspace configuration.

</td></tr></table>

</details>

### Frontend system design

#### Middle+ or Senior

<details>
<summary>Какие system design вопросы могут задать senior frontend или Angular-разработчику?</summary><br>
<table><tr><td>

Чаще спрашивают не backend-детали, а границы frontend-архитектуры:

- как загрузить и показать таблицу на миллионы строк;
- где делать фильтрацию, сортировку и агрегацию;
- как кешировать API responses и инвалидировать stale data;
- как пережить частичную недоступность API;
- как проектировать retry, timeout, optimistic update и rollback;
- как разложить фичу между Angular app, CDN, BFF/API и backend jobs;
- как наблюдать ошибки, latency и деградацию UX после release.

Хороший ответ явно разделяет client, network, CDN, API и storage, называет trade-offs и предлагает graceful degradation.

</td></tr></table>

</details>

<details>
<summary>Как спроектировать modal/dialog на уровне системы?</summary><br>
<table><tr><td>

Dialog - не только overlay. Нужны focus trap, restore focus, Escape, click outside policy, scroll lock, aria attributes,
stacking, portal/root strategy, animation with reduced motion и cleanup. Для design system важно определить API:
controlled/uncontrolled open state, sizes, destructive actions, async submit, nested dialogs policy.

В Angular это часто решают CDK Overlay/Dialog или UI-kit. Самописный dialog оправдан только если команда готова
поддерживать accessibility contract и edge cases.

```html
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
>
  <h2 id="dialog-title">Удалить проект?</h2>
  <button type="button">Отмена</button>
  <button type="button">Удалить</button>
</div>
```

</td></tr></table>

</details>

<details>
<summary>Как спроектировать infinite scroll?</summary><br>
<table><tr><td>

Нужно описать API pagination contract, loading states, error retry, deduplication, scroll position, accessibility и
observability. На клиенте часто используют `IntersectionObserver` для sentinel-элемента, но API должен поддерживать
cursor pagination, иначе при изменении данных возможны пропуски и дубли.

```ts
const observer = new IntersectionObserver(([entry]) => {
  if (entry?.isIntersecting) {
    loadNextPage();
  }
});

observer.observe(sentinelElement);
```

Важные trade-offs:

- infinite scroll удобен для ленты, но хуже для поиска конкретной позиции;
- нужна возможность восстановить позицию при возврате назад;
- для больших списков может понадобиться virtualization;
- keyboard и screen reader users должны иметь понятную навигацию;
- analytics должны различать load more, error и abandon.

</td></tr></table>

</details>

<details>
<summary>Как выбрать CSR, SSR, SSG или ISR для frontend-продукта?</summary><br>
<table><tr><td>

CSR проще для authenticated dashboards и internal tools, где SEO почти не важен. SSR помогает first paint, SEO и preview
metadata, но добавляет server runtime, cache invalidation и hydration complexity. SSG хорош для стабильного content,
ISR - для контента, который должен обновляться без полного rebuild.

Решение принимают по типу страниц, freshness данных, SEO, personalization, hosting model, Core Web Vitals, стоимости
операций и ownership команды. На интервью важно не продавать один rendering mode как универсальный.

```ts
export const renderingByPageType = {
  dashboard: 'CSR',
  article: 'SSG',
  productPage: 'SSR',
  catalog: 'ISR',
} as const;
```

</td></tr></table>

</details>

### Практика по Angular frontend tasks

#### Middle+ or Senior

<details>
<summary>Практическая задача: перенесите autocomplete в Angular.</summary><br>
<table><tr><td>

**Что проверяет:** typed forms, RxJS cancellation, состояния загрузки, accessibility.

В Angular autocomplete обычно раскладывают на typed form/control state, поток поиска, отмену запросов и доступный UI.
Для async query хорошо подходят RxJS operators: `debounceTime`, `distinctUntilChanged`, `switchMap`, `catchError`.
`switchMap` отменяет подписку на предыдущий request, а `HttpClient` умеет отменять underlying request при unsubscribe.

```ts
readonly query = new FormControl('', {nonNullable: true});

readonly items$ = this.query.valueChanges.pipe(
  debounceTime(250),
  distinctUntilChanged(),
  switchMap((query) =>
    this.searchApi.search(query).pipe(
      catchError(() => of([])),
    ),
  ),
);
```

Компонент должен явно иметь состояния `idle`, `loading`, `success`, `empty`, `error`, поддерживать keyboard navigation и
не смешивать API DTO с view model. Для accessibility можно использовать CDK a11y primitives или готовый UI-kit с
combobox/listbox contract.

</td></tr></table>

</details>
