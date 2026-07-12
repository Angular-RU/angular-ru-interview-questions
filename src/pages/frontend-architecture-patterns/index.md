---
layout: ../../layouts/Layout.astro
title: Организация кода
description: Организация frontend-кода, границы модулей, архитектурные паттерны и их реализация в React и Angular
category: Frontend
kind: questions
order: 145
---

## Организация кода

Архитектурный паттерн нужен не ради названия. Он фиксирует границы ответственности, направление зависимостей и правила
изменения приложения. Хороший выбор уменьшает связанность и делает feature проще для разработки, тестирования и
удаления. Начинать стоит с простого feature-first устройства и усложнять его, только когда это решает наблюдаемую
проблему команды.

### Границы и структура feature

#### Junior

<details>
<summary>Что такое feature-first структура и почему она обычно лучше папок по типу файлов?</summary><br>
<table><tr><td>

Feature-first группирует код по пользовательской возможности: `orders`, `profile`, `checkout`. Внутри feature живут его
UI, маршруты, state, API-клиент и тесты. Папки `components`, `services`, `models` на весь проект кажутся простыми в
начале, но со временем смешивают несвязанные домены и делают ownership неясным.

Общие элементы выносят в `shared` только после появления нескольких реальных потребителей. Domain-код одной feature не
должен импортировать внутренности другой feature: для этого нужен небольшой публичный API или явный orchestration слой.

```text
src/
  features/
    orders/
      api/
      model/
      ui/
      orders.routes.ts
    profile/
  shared/
    ui/
    lib/
```

</td></tr></table>

</details>

<details>
<summary>Как разделить presentational и container components?</summary><br>
<table><tr><td>

Presentational component получает данные и callbacks через API, отображает UI и не знает, откуда пришли данные.
Container связывает route, use case, состояние и presentational UI. Это не жесткое правило: маленький component может
содержать оба слоя. Разделение окупается, когда UI переиспользуется, загрузка усложняется или component становится
трудно тестировать.

В React container обычно использует hook и передает props. В Angular container инжектирует facade или service, а
presentational component получает `input()` и отдает событие через `output()`.

<fieldset>
<legend>React</legend>

```tsx
// React: OrdersPage.tsx
function OrdersPage() {
  const {orders, cancelOrder} = useOrders();

  return (
    <OrdersList
      orders={orders}
      onCancel={cancelOrder}
    />
  );
}
```

</fieldset>

<fieldset>
<legend>Angular</legend>

```ts
// Angular: orders-list.component.ts
@Component({
  selector: 'app-orders-list',
  template: `
    @for (order of orders(); track order.id) {
      <button
        type="button"
        (click)="cancel.emit(order.id)"
      >
        {{ order.number }}
      </button>
    }
  `,
})
export class OrdersListComponent {
  readonly orders = input.required<ReadonlyArray<Order>>();
  readonly cancel = output<string>();
}
```

```ts
// Angular: orders-page.component.ts
@Component({
  imports: [OrdersListComponent],
  template: `
    <app-orders-list
      [orders]="orders()"
      (cancel)="ordersFacade.cancel($event)"
    />
  `,
})
export class OrdersPageComponent {
  protected readonly ordersFacade = inject(OrdersFacade);
  protected readonly orders = this.ordersFacade.orders;
}
```

</fieldset>

</td></tr></table>

</details>

#### Middle

<details>
<summary>Что означает правило dependency direction?</summary><br>
<table><tr><td>

Зависимости должны идти от внешних деталей к более стабильному коду: UI зависит от application use case, use case
зависит от domain-контракта, а HTTP-клиент реализует этот контракт. Тогда изменение React component, Angular template
или REST endpoint не заставляет менять business rule.

Практически это означает: не передавать `HttpClient`, React Query result или `ActivatedRoute` в domain-функции; DTO не
делать domain-моделью; не импортировать component из data-access слоя. Не каждой feature нужны все слои, но направление
зависимостей важно всегда.

</td></tr></table>

</details>

<details>
<summary>Что такое facade pattern во frontend и чем он отличается от state manager?</summary><br>
<table><tr><td>

Facade дает UI маленький API предметной области: данные для отображения и операции вроде `load()`, `approve()` или
`retry()`. Она скрывает cache, store, HTTP и детали преобразования DTO. State manager хранит и изменяет состояние;
facade может использовать state manager, но не обязана.

В React эту роль часто играет custom hook. В Angular это обычно service с readonly signals или Observable API. UI не
должен вызывать `HttpClient` или dispatch произвольных actions напрямую.

<fieldset>
<legend>Angular</legend>

```ts
// Angular: orders.facade.ts
@Injectable({providedIn: 'root'})
export class OrdersFacade {
  private readonly api = inject(OrdersApi);
  private readonly state = signal<OrdersState>({orders: [], status: 'idle'});

  readonly orders = computed(() => this.state().orders);
  readonly isLoading = computed(() => this.state().status === 'loading');

  async load(): Promise<void> {
    this.state.update((state) => ({...state, status: 'loading'}));

    const orders = await this.api.getAll();
    this.state.set({orders, status: 'ready'});
  }
}
```

</fieldset>

</td></tr></table>

</details>

<details>
<summary>Как отделить DTO от domain model?</summary><br>
<table><tr><td>

DTO повторяет контракт транспорта и может содержать строки дат, nullable-поля или неудачные названия backend. Domain
model описывает данные, удобные и безопасные для приложения. Адаптер в data-access слое валидирует и преобразует DTO;
остальной код не зависит от формы ответа API.

```ts
type OrderDto = {
  created_at: string;
  id: string;
  total_cents: number;
};

type Order = {
  createdAt: Date;
  id: string;
  total: number;
};

const toOrder = (dto: OrderDto): Order => ({
  createdAt: new Date(dto.created_at),
  id: dto.id,
  total: dto.total_cents / 100,
});
```

И React, и Angular используют такой adapter одинаково: отличие только в том, кто вызывает repository или API service.

</td></tr></table>

</details>

### Паттерны UI-композиции

#### Middle

<details>
<summary>Когда выбирать composition вместо множества boolean props?</summary><br>
<table><tr><td>

Если API component разрастается до `isCompact`, `showHeader`, `hasActions`, `isEditable` и комбинации флагов создают
разные layouts, лучше передавать части интерфейса как children, slots или отдельные components. Composition делает
допустимые комбинации видимыми в месте использования и уменьшает число неявных режимов.

React использует `children` и compound components. Angular использует content projection (`ng-content`) и directives для
маркировки проецируемых частей.

<fieldset>
<legend>React</legend>

```tsx
// React
<Dialog>
  <Dialog.Title>Удалить заказ?</Dialog.Title>
  <Dialog.Actions>
    <button type="button">Удалить</button>
  </Dialog.Actions>
</Dialog>
```

</fieldset>

<fieldset>
<legend>Angular</legend>

```html
<!-- Angular -->
<app-dialog>
  <h2 dialog-title>Удалить заказ?</h2>
  <div dialog-actions><button type="button">Удалить</button></div>
</app-dialog>
```

</fieldset>

</td></tr></table>

</details>

<details>
<summary>Что такое custom hook в React и какой его аналог в Angular?</summary><br>
<table><tr><td>

Custom hook повторно использует stateful логику React: например, debounce, загрузку или взаимодействие с браузерным API.
Он подчиняется rules of hooks и вызывается только из React component или другого hook.

В Angular логику обычно выносят в service, функцию, использующую `inject()` в injection context, directive или pipe.
Выбор определяется lifetime: service может быть root-, route- или component-scoped, тогда как hook живет вместе с
вызвавшим его component.

<fieldset>
<legend>Angular</legend>

```ts
// Angular: component-scoped state
@Injectable()
export class SearchState {
  readonly query = signal('');
  readonly normalizedQuery = computed(() => this.query().trim().toLowerCase());
}

@Component({
  providers: [SearchState],
  template: `
    <input
      [value]="state.query()"
      (input)="setQuery($event)"
    />
  `,
})
export class SearchComponent {
  protected readonly state = inject(SearchState);

  protected setQuery(event: Event): void {
    const target = event.target;

    if (!(target instanceof HTMLInputElement)) {
      return;
    }

    this.state.query.set(target.value);
  }
}
```

</fieldset>

В production для сложной формы лучше использовать form control; пример показывает именно scoped lifetime состояния.

</td></tr></table>

</details>

<details>
<summary>Когда нужен compound component pattern?</summary><br>
<table><tr><td>

Compound components делят один составной виджет на согласованные части: `Tabs.List`, `Tabs.Panel`, `Select.Option`.
Родитель владеет общим состоянием и accessibility-правилами, а вложенные части получают контекст. Паттерн полезен для
переиспользуемых UI primitives, но избыточен для одноразовой разметки feature.

В React связь часто строят через Context. В Angular для этого подходят parent component, `contentChildren()`, DI по
element injector и directives. Особенно важно централизованно поддержать клавиатурную навигацию, focus и ARIA, а не
оставить это каждому consumer.

</td></tr></table>

</details>

### Слои и масштабирование

#### Middle+ or Senior

<details>
<summary>Что такое layered architecture и когда она достаточна?</summary><br>
<table><tr><td>

В простой layered architecture UI обращается к application/service слою, тот использует data-access, а domain содержит
типы и чистые правила. Она достаточно хороша для большинства frontend-приложений, если границы feature понятны и слои не
обходятся импортами.

```text
orders/
  ui/             # components и templates
  application/    # facade, use cases, orchestration
  domain/         # types, policies, pure functions
  data-access/    # HTTP, cache, DTO adapters
```

Не нужно создавать пустые папки и интерфейсы для каждого маленького component. Слой появляется, когда в нем появляется
самостоятельная ответственность.

</td></tr></table>

</details>

<details>
<summary>Что такое clean architecture во frontend и какой ее trade-off?</summary><br>
<table><tr><td>

Clean architecture отделяет domain и use cases от фреймворка, UI и инфраструктуры. Например, use case `placeOrder`
зависит от `OrdersRepository`, а Angular service или React API client реализует его через HTTP. Это упрощает тесты и
замену интеграций, когда правила действительно сложны и долгоживущи.

Trade-off — дополнительные interfaces, adapters и переходы между моделями. Для CRUD-экрана с небольшой логикой это может
скрыть простое действие за несколькими файлами. Правильный подход: оставить pure business rules независимыми, но вводить
полный набор портов и adapters только при реальной выгоде.

</td></tr></table>

</details>

<details>
<summary>Как организовать server state и client state в React и Angular?</summary><br>
<table><tr><td>

Server state принадлежит backend и требует cache, invalidation, retry и работы со stale-данными. В React для него часто
используют TanStack Query; локальный UI state оставляют в `useState`, reducer или небольшом store. В Angular server
state можно держать в service с `resource` или RxJS/query layer, а локальный UI state — в `signal()` рядом с component.

Не смешивайте эти роли в одном глобальном store без причины. Фильтр, который должен переживать ссылку, принадлежит URL;
черновик формы — form layer; данные заказа — cache/repository; открытая панель — локальному UI.

</td></tr></table>

</details>

<details>
<summary>Когда оправданы micro frontends?</summary><br>
<table><tr><td>

Micro frontends оправданы при независимых командах, релизных циклах и доменах, когда организационная граница важнее
стоимости интеграции. Они не являются способом автоматически разделить большой monolith: добавляют versioning,
наблюдаемость, design system, routing, shared auth, performance budget и контракт между host и remote.

Angular и React можно объединить через host, Web Components, Module Federation или другой runtime/build-time механизм.
Но данные лучше передавать через узкий versioned contract, а не через общий mutable global store. Если команды выпускают
продукт вместе, обычно дешевле остаться в modular monolith с feature boundaries.

Основные варианты интеграции из исходного материала:

| Вариант     | Пример                                  | Главный trade-off                                        |
| ----------- | --------------------------------------- | -------------------------------------------------------- |
| Build time  | versioned NPM package `@company/header` | простой runtime, но общий release cycle                  |
| Runtime     | Module Federation remote                | независимый deploy, но versioning и runtime failures     |
| Server side | ESI/server composition                  | мало client orchestration, но сложнее infrastructure     |
| Iframe      | isolated legacy widget                  | сильная изоляция, но сложные UX, routing и communication |

```html
<esi:include src="https://header.example.com/header" />
<iframe
  src="https://legacy.example.com/widget"
  title="Legacy widget"
></iframe>
```

</td></tr></table>

</details>

### Выбор паттерна

#### Middle+ or Senior

<details>
<summary>Как аргументировать архитектурный выбор на интервью?</summary><br>
<table><tr><td>

Начните с контекста: размер команды, число feature, сложность domain-правил, независимость релизов, требования к SSR,
кешу и тестированию. Затем назовите простое решение и критерии роста.

Например: «Для нового Angular feature я начну с route-level feature folder, presentational components и facade service с
signals. DTO останутся в data-access. Если появятся сложные async streams, добавлю RxJS; если нескольким командам
понадобятся единые transitions, selectors и DevTools, рассмотрю NgRx. Для React аналогично: feature folder, custom hook
как facade и query layer для server state, без глобального store до появления shared client state».

Такой ответ показывает, что паттерн выбран под ограничения, а не скопирован из другого проекта.

</td></tr></table>

</details>

### Полный каталог из исходного gist

Ниже собраны все оставшиеся паттерны и примеры из исходного материала. Примеры на React дополнены реализацией или
практическим эквивалентом для Angular.

#### Component-Based Architecture

<details>
<summary>Что такое Atomic Design?</summary><br>
<table><tr><td>

Atomic Design делит design system на atoms (`Button`, `Input`), molecules (`SearchField`), organisms (`Header`),
templates и pages. Паттерн удобен для общего языка дизайнеров и разработчиков, но категории не должны влиять на domain
boundaries: `ProductCard` может быть organism в design system и одновременно частью feature `catalog`.

```text
shared/ui/
  button/            # atom
  search-field/      # molecule
  header/            # organism
features/catalog/
  product-page/      # page с реальными данными
```

В React и Angular иерархия одинакова. В Angular atoms обычно являются components, directives или pipes; templates и
pages часто соответствуют routed components.

</td></tr></table>
</details>

#### State Management Patterns

<details>
<summary>Как устроены Flux и Redux?</summary><br>
<table><tr><td>

Flux задает однонаправленный цикл: пользовательское событие создает action, dispatcher передает его store, store
вычисляет новое состояние, view отображает результат. Redux сводит идею к одному store, readonly state и чистым
reducers.

```ts
type CounterAction = {readonly type: 'increment'} | {readonly type: 'decrement'};

function counterReducer(state: number, action: CounterAction): number {
  switch (action.type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
  }
}
```

React обычно подключает Redux Toolkit через `useSelector()` и `useDispatch()`. В Angular тот же поток дает NgRx:
component выбирает данные selector-ом и отправляет event через `store.dispatch()`. Для небольшого feature достаточно
service с readonly signal и явными methods.

<fieldset>
<legend>Angular</legend>

```ts
@Injectable({providedIn: 'root'})
export class CounterStore {
  private readonly countState = signal(0);
  readonly count = this.countState.asReadonly();

  increment(): void {
    this.countState.update((count) => count + 1);
  }
}
```

</fieldset>

</td></tr></table>
</details>

<details>
<summary>Чем React Context + Hooks отличается от Angular DI + signals?</summary><br>
<table><tr><td>

В React provider передает значение через component tree, а custom hook инкапсулирует чтение context и проверку наличия
provider. В Angular эту задачу решают DI hierarchy и service. Provider на component или route дает scoped instance, а
`providedIn: 'root'` — application-wide instance.

<fieldset>
<legend>React</legend>

```tsx
const ThemeContext = createContext<ThemeContextValue | null>(null);

function ThemeProvider({children}: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>('light');
  const toggle = () => setTheme((value) => (value === 'light' ? 'dark' : 'light'));

  return <ThemeContext value={{theme, toggle}}>{children}</ThemeContext>;
}
```

</fieldset>

<fieldset>
<legend>Angular</legend>

```ts
@Injectable()
export class ThemeState {
  private readonly themeState = signal<'light' | 'dark'>('light');
  readonly theme = this.themeState.asReadonly();

  toggle(): void {
    this.themeState.update((theme) => (theme === 'light' ? 'dark' : 'light'));
  }
}

export const appRoutes: Routes = [
  {
    path: '',
    providers: [ThemeState],
    loadComponent: async () => (await import('./shell')).Shell,
  },
];
```

</fieldset>

Context удобен для редко меняющихся cross-cutting values. Часто меняющийся server state лучше отдавать query/cache
layer, чтобы не провоцировать широкие rerenders.

</td></tr></table>
</details>

<details>
<summary>Как реализовать state machine без набора противоречивых flags?</summary><br>
<table><tr><td>

Состояние описывают discriminated union, а переходы — явной функцией. XState полезен для nested и parallel states,
guards, actors и визуализации; для небольшого flow достаточно TypeScript reducer.

```ts
type FetchState<T> =
  | {readonly status: 'idle'}
  | {readonly status: 'loading'}
  | {readonly status: 'success'; readonly data: T}
  | {readonly status: 'error'; readonly message: string};

type FetchEvent<T> =
  | {readonly type: 'fetch'}
  | {readonly type: 'resolve'; readonly data: T}
  | {readonly type: 'reject'; readonly message: string};
```

Такая модель одинаково используется в React reducer и Angular signal store и не позволяет одновременно получить
`isLoading: true` и `hasError: true`.

</td></tr></table>
</details>

#### Design Patterns

<details>
<summary>Как Observer pattern проявляется в React и Angular?</summary><br>
<table><tr><td>

Observer подписывает потребителей на изменения source. DOM events, RxJS Observable, store subscriptions и signals —
разные реализации этой идеи. Вручную писать mutable массив observers обычно не нужно: важны teardown и lifetime.

<fieldset>
<legend>Angular</legend>

```ts
const searchResults$ = queryControl.valueChanges.pipe(
  debounceTime(250),
  distinctUntilChanged(),
  switchMap((query) => searchApi.search(query)),
);
```

</fieldset>

В Angular template может читать поток через `async` pipe или signal через `toSignal()`. В React внешние stores безопасно
подключаются через `useSyncExternalStore()`.

</td></tr></table>
</details>

<details>
<summary>Когда нужен Factory pattern?</summary><br>
<table><tr><td>

Factory централизует выбор реализации по type или configuration. В React это может быть mapping типа поля на component;
в Angular — mapping на dynamic component type или DI factory provider. Большой `switch` стоит заменить registry, если
варианты добавляют независимые модули.

<fieldset>
<legend>Angular</legend>

```ts
type FieldKind = 'email' | 'password' | 'select';

const fieldByKind = {
  email: EmailField,
  password: PasswordField,
  select: SelectField,
} satisfies Record<FieldKind, Type<unknown>>;

function getFieldComponent(kind: FieldKind): Type<unknown> {
  return fieldByKind[kind];
}
```

</fieldset>

</td></tr></table>
</details>

<details>
<summary>Почему Singleton лучше получать через dependency injection?</summary><br>
<table><tr><td>

Ручной `getInstance()` создает скрытый global state и усложняет тесты. В React singleton module допустим для stateless
API client, но зависимости проще передавать через provider. В Angular lifecycle singleton-а контролирует injector.

<fieldset>
<legend>Angular</legend>

```ts
@Injectable({providedIn: 'root'})
export class ApiClient {
  private readonly http = inject(HttpClient);

  getUsers(): Observable<ReadonlyArray<User>> {
    return this.http.get<ReadonlyArray<User>>('/api/users');
  }
}
```

</fieldset>

`providedIn: 'root'` создает один instance в root environment injector. Route или component provider намеренно создает
отдельный scoped instance, поэтому «singleton» всегда относится к конкретному injector.

</td></tr></table>
</details>

<details>
<summary>Что дает Module pattern в современном TypeScript?</summary><br>
<table><tr><td>

Исторически IIFE скрывал mutable variables в closure и возвращал public API. ES modules дают encapsulation напрямую:
неэкспортированные значения остаются private для файла.

```ts
let result = 0;
const history: string[] = [];

export function add(value: number): number {
  result += value;
  history.push(`add ${value}`);
  return result;
}

export function getHistory(): ReadonlyArray<string> {
  return [...history];
}
```

Для user-specific или test-specific state module singleton опасен. В Angular такое состояние лучше держать в service с
подходящим provider scope, в React — в component/provider state.

</td></tr></table>
</details>

#### Architectural Styles

<details>
<summary>Чем MVC и MVVM полезны для понимания современного frontend?</summary><br>
<table><tr><td>

MVC отделяет Model, View и Controller. MVVM добавляет ViewModel — подготовленное для binding состояние и команды view.
Современные React и Angular приложения редко реализуют эти паттерны буквально, но идея границ остается полезной.

```ts
type UserViewModel = {
  readonly displayName: string;
  readonly canEdit: boolean;
};

const toUserViewModel = (user: User, permissions: Permissions): UserViewModel => ({
  displayName: user.name.toUpperCase(),
  canEdit: permissions.includes('user:edit'),
});
```

В React hook часто играет роль Controller/ViewModel. В Angular facade с `computed()` готовит view state, а template
остается View. Two-way binding не делает Angular «чистым MVVM»: архитектуру определяют границы, а не синтаксис binding.

</td></tr></table>
</details>

<details>
<summary>Что такое Jamstack?</summary><br>
<table><tr><td>

Jamstack отделяет заранее сгенерированный markup от динамических API и раздает static assets через CDN. Подходит для
контентных сайтов, документации и marketing pages; authenticated dashboard обычно требует CSR или hybrid rendering.

```text
content + templates = static HTML at build time
static HTML = CDN
interactive actions = APIs or serverless functions
```

Примеры: Astro с content API, Next.js с CMS. Angular поддерживает аналогичный вариант через prerendering и route-based
render modes.

</td></tr></table>
</details>

<details>
<summary>Что такое Islands Architecture?</summary><br>
<table><tr><td>

Страница в основном состоит из static HTML, а независимые интерактивные islands гидратируются отдельно. В Astro это
выражают directives `client:load`, `client:idle` и `client:visible`.

<fieldset>
<legend>Astro</legend>

```astro
<Article content={post} />
<SearchBar client:load />
<Newsletter client:visible />
<Comments client:idle />
```

</fieldset>

Angular не является islands framework, но incremental hydration и `@defer` решают похожую задачу при SSR: тяжелый блок
можно загрузить и гидратировать по viewport или interaction trigger.

<fieldset>
<legend>Angular</legend>

```html
@defer (on viewport) {
<app-comments />
} @placeholder {
<app-comments-skeleton />
}
```

</fieldset>

</td></tr></table>
</details>

<details>
<summary>Как работает Module Federation?</summary><br>
<table><tr><td>

Host загружает exposed modules независимо развернутого remote в build time или runtime. Shared dependencies требуют
совместимых версий; `singleton: true` снижает риск двух runtime framework, но не заменяет контракт версий.

<fieldset>
<legend>React</legend>

```js
new ModuleFederationPlugin({
  name: 'catalog',
  filename: 'remoteEntry.js',
  exposes: {'./ProductCard': './src/product-card'},
  shared: {react: {singleton: true}, 'react-dom': {singleton: true}},
});
```

</fieldset>

Для Angular remote экспортирует routes или standalone component, а host подключает их через federation tooling. Shared
state remote-модулем создает сильную runtime coupling; предпочтительнее versioned events или API contracts.

</td></tr></table>
</details>

#### Application Models

<details>
<summary>Чем SPA отличается от MPA?</summary><br>
<table><tr><td>

SPA загружает application shell и переключает routes на клиенте; последующая навигация быстрая, но initial bundle,
JavaScript availability и client state становятся критичными. MPA получает новый HTML document для каждого перехода; она
проще, надежнее без JavaScript и естественно индексируется, но теряет in-memory state между страницами.

React Router и Angular Router строят SPA. Next.js, Astro и Angular SSR могут сочетать server navigation, hydration и
client navigation, поэтому реальный продукт часто является hybrid, а не чистой SPA или MPA.

</td></tr></table>
</details>

<details>
<summary>Из чего состоит PWA?</summary><br>
<table><tr><td>

PWA использует Web App Manifest для installability и service worker для offline cache, update и background behavior.
Cache strategy выбирают по типу ресурса; бездумный cache-first для API может показывать устаревшие данные.

```js
self.addEventListener('fetch', (event) => {
  const request = event.request;

  event.respondWith(caches.match(request).then((cached) => cached ?? fetch(request)));
});
```

В Angular базовый service worker добавляет `ng add @angular/pwa`; правила assets и data groups задаются в
`ngsw-config.json`. React не содержит PWA layer, его настраивает build framework или Workbox.

</td></tr></table>
</details>

<details>
<summary>Какие бывают hybrid applications?</summary><br>
<table><tr><td>

Capacitor помещает web app в native shell и дает bridge к Camera, Filesystem и другим platform APIs. Ionic добавляет
mobile-oriented UI components. React Native использует JavaScript/TypeScript, но рендерит native views, а не DOM.

```ts
const photo = await Camera.getPhoto({
  allowEditing: true,
  quality: 90,
  resultType: CameraResultType.Uri,
});
```

Angular приложения часто используют Ionic + Capacitor. Контракт platform service лучше абстрагировать через DI, чтобы
browser tests могли подставить fake implementation.

</td></tr></table>
</details>

#### Rendering Strategies

<details>
<summary>Как выбирать между CSR, SSR и SSG?</summary><br>
<table><tr><td>

CSR рендерит после загрузки JavaScript и подходит authenticated applications с высокой интерактивностью. SSR создает
HTML на каждый initial request и подходит динамическим индексируемым страницам. SSG генерирует HTML на build time и
лучше всего работает для стабильного контента.

<fieldset>
<legend>Angular</legend>

```ts
export const serverRoutes: ServerRoute[] = [
  {path: 'dashboard', renderMode: RenderMode.Client},
  {path: 'products/:id', renderMode: RenderMode.Server},
  {path: 'about', renderMode: RenderMode.Prerender},
];
```

</fieldset>

React выбирает эти режимы через framework вроде Next.js. Angular SSR поддерживает route-level CSR, SSR и prerendering;
после SSR hydration делает HTML интерактивным.

</td></tr></table>
</details>

<details>
<summary>Что такое ISR и какой аналог есть вне Next.js?</summary><br>
<table><tr><td>

ISR сохраняет производительность static page, но периодически или по событию регенерирует ее. Во время regeneration
пользователь может получить предыдущую версию, поэтому система допускает окно stale content.

<fieldset>
<legend>React / Next.js</legend>

```ts
export const revalidate = 60;

export default async function ProductPage() {
  const product = await getProduct();
  return <Product product={product} />;
}
```

</fieldset>

Это не универсальная browser capability, а функция hosting/framework cache. В Angular похожую семантику строят через
prerender + deployment rebuild/webhook, CDN stale-while-revalidate или server cache вокруг SSR.

</td></tr></table>
</details>

<details>
<summary>Чем React Server Components отличаются от Angular SSR?</summary><br>
<table><tr><td>

RSC остаются server-only и не добавляют свой code в client bundle; client components нужны для state, events и browser
APIs. Angular SSR обычно выполняет те же components на server для initial HTML, а затем гидратирует их на client.

<fieldset>
<legend>React</legend>

```tsx
async function BlogPost({id}: {readonly id: string}) {
  const post = await db.posts.findById(id);

  return (
    <article>
      <h1>{post.title}</h1>
      <LikeButton postId={id} />
    </article>
  );
}
```

</fieldset>

Для Angular ближайшие инструменты — server routes, SSR/prerender, incremental hydration и `@defer`, но это не эквивалент
RSC protocol один к одному.

</td></tr></table>
</details>

<details>
<summary>Что такое Edge Rendering?</summary><br>
<table><tr><td>

Edge function выполняет SSR или personalization в CDN location рядом с пользователем. Это уменьшает network latency, но
runtime часто ограничивает Node.js APIs, execution time и package size.

```ts
export default async function handler(request: Request): Promise<Response> {
  const city = new URL(request.url).searchParams.get('city') ?? 'Moscow';
  const weather = await fetch(`https://api.example.com/weather?city=${encodeURIComponent(city)}`);

  return Response.json(await weather.json());
}
```

React и Angular приложение может вызывать edge BFF одинаково. Возможность рендерить сам framework на edge зависит от
adapter и hosting provider, поэтому этот runtime нужно проверять отдельно.

</td></tr></table>
</details>

#### Service Patterns

<details>
<summary>Когда нужен Backend for Frontend?</summary><br>
<table><tr><td>

BFF агрегирует backend services и возвращает DTO, оптимизированный под конкретный UI. Например, web dashboard одним
запросом получает user, последние orders и recommendations, а mobile BFF возвращает более компактную модель.

```ts
app.get('/api/dashboard', async (request, response) => {
  const userId = request.auth.userId;
  const [user, orders, suggestions] = await Promise.all([
    userService.getUser(userId),
    orderService.getOrders(userId),
    recommendationService.getForUser(userId),
  ]);

  response.json({user, recentOrders: orders.slice(0, 5), suggestions});
});
```

BFF уменьшает waterfalls и скрывает topology microservices, но дублирование web/mobile BFF нужно контролировать. Для
React и Angular его контракт одинаков; frontend data-access adapter преобразует BFF DTO в domain model.

</td></tr></table>
</details>

<details>
<summary>Чем GraphQL Gateway отличается от API Gateway?</summary><br>
<table><tr><td>

GraphQL Gateway дает typed schema и позволяет client выбрать поля. Resolvers агрегируют data sources, но требуют защиты
от дорогих queries, DataLoader против N+1 и отдельной cache strategy. API Gateway маршрутизирует REST/gRPC/ WebSocket,
централизует auth, rate limits, observability и иногда response aggregation.

```graphql
query GetUser($id: ID!) {
  user(id: $id) {
    name
    posts {
      title
    }
  }
}
```

```ts
app.use('/api/users', createProxyMiddleware({target: 'http://user-service:3001'}));
app.use('/api/products', createProxyMiddleware({target: 'http://product-service:3002'}));
```

GraphQL client может использовать Apollo, urql или generated SDK. Angular получает SDK через DI service, React — через
provider/hook; schema types лучше генерировать, а не дублировать вручную.

</td></tr></table>
</details>

#### Performance Patterns

<details>
<summary>Как реализовать code splitting?</summary><br>
<table><tr><td>

Route-based splitting выносит feature в отдельный chunk. Component-based splitting откладывает тяжелый editor, chart или
dialog до момента использования.

<fieldset>
<legend>React</legend>

```tsx
const Dashboard = lazy(() => import('./dashboard'));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Dashboard />
    </Suspense>
  );
}
```

</fieldset>

<fieldset>
<legend>Angular</legend>

```ts
export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: async () => (await import('./dashboard/dashboard')).Dashboard,
  },
];
```

</fieldset>

В Angular для части template используют `@defer`; для routes — `loadComponent` или `loadChildren`. Chunk boundary стоит
ставить по feature и реальной стоимости, иначе множество мелких requests ухудшит загрузку.

</td></tr></table>
</details>

<details>
<summary>Чем lazy loading ресурсов отличается от code splitting?</summary><br>
<table><tr><td>

Code splitting создает chunks, lazy loading определяет момент их загрузки. Изображения лениво загружаются нативным
`loading="lazy"`, scripts используют `defer` или `async`, а произвольный resource можно связать с Intersection Observer.

```html
<img
  src="product.webp"
  loading="lazy"
  width="640"
  height="480"
  alt="Товар"
/>
<script
  src="analytics.js"
  defer
></script>
```

<fieldset>
<legend>Angular</legend>

```html
@defer (on viewport; prefetch on idle) {
<app-recommendations />
} @placeholder {
<app-recommendations-skeleton />
}
```

</fieldset>

Размеры изображения задают явно, чтобы lazy loading не создавал layout shift.

</td></tr></table>
</details>

<details>
<summary>Когда memoization улучшает производительность?</summary><br>
<table><tr><td>

Memoization полезна для измеримо дорогого pure calculation или стабильного selector. В React используют `useMemo`,
`useCallback` и `memo`; React Compiler может оптимизировать часть случаев автоматически. В Angular `computed()` лениво
кеширует значение до изменения зависимых signals, а pure pipe кеширует последний набор arguments.

<fieldset>
<legend>React</legend>

```tsx
const filtered = useMemo(
  () => products.filter((product) => categories.includes(product.category)),
  [products, categories],
);
```

</fieldset>

<fieldset>
<legend>Angular</legend>

```ts
readonly filteredProducts = computed(() => {
  const categories = this.selectedCategories();
  return this.products().filter((product) => categories.includes(product.category));
});
```

</fieldset>

Memoization имеет стоимость сравнения, cache и усложнения dependencies. Применять ее ко всем значениям заранее не нужно.

</td></tr></table>
</details>

<details>
<summary>Как работает virtualization больших списков?</summary><br>
<table><tr><td>

Virtualization оставляет в DOM только видимое окно элементов и небольшой overscan. React использует react-window или
React Virtuoso; Angular — CDK virtual scrolling. Fixed item height проще и дешевле variable-height measurement.

<fieldset>
<legend>React</legend>

```tsx
<FixedSizeList
  height={600}
  itemCount={items.length}
  itemSize={50}
  width="100%"
>
  {({index, style}) => <div style={style}>{items[index].name}</div>}
</FixedSizeList>
```

</fieldset>

<fieldset>
<legend>Angular</legend>

```html
<cdk-virtual-scroll-viewport
  itemSize="50"
  class="viewport"
>
  <div *cdkVirtualFor="let item of items; trackBy: trackById">{{ item.name }}</div>
</cdk-virtual-scroll-viewport>
```

</fieldset>

Паттерн нужен для таблиц, feeds, chat history и file trees с тысячами строк. Для десятков элементов стоимость библиотеки
обычно выше пользы.

</td></tr></table>
</details>

<details>
<summary>Какие бывают prefetch и preload?</summary><br>
<table><tr><td>

`dns-prefetch` заранее резолвит host, `preconnect` устанавливает DNS/TCP/TLS, `prefetch` получает вероятный будущий
resource с низким priority, а `preload` сообщает о critical resource текущей страницы.

```html
<link
  rel="preconnect"
  href="https://api.example.com"
/>
<link
  rel="prefetch"
  href="/chunks/dashboard.js"
/>
<link
  rel="preload"
  href="/fonts/inter.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

React Router/framework может prefetch route на hover или viewport. Angular Router поддерживает preloading strategies для
lazy routes; data можно prefetch через resolver или query cache. Aggressive prefetch конкурирует с critical resources и
трафиком пользователя.

</td></tr></table>
</details>

<details>
<summary>Что такое progressive и incremental hydration?</summary><br>
<table><tr><td>

Server сначала присылает готовый HTML, затем framework постепенно подключает event handlers и client state. Critical UI
гидратируется раньше, below-the-fold — при viewport/idle/interaction. React использует streaming и Suspense boundaries;
Astro — islands; Angular — incremental hydration с hydrate triggers у `@defer`.

<fieldset>
<legend>Angular</legend>

```html
@defer (hydrate on viewport) {
<app-comments />
} @placeholder {
<app-comments-skeleton />
}
```

</fieldset>

Граница должна быть независимой и иметь стабильный server/client output. Иначе hydration mismatch или раннее событие
пользователя приведет к неожиданному UI.

</td></tr></table>
</details>

#### Code Organization Strategies

<details>
<summary>Когда выбирать monorepo?</summary><br>
<table><tr><td>

Monorepo хранит несколько applications и libraries в одном repository. Он полезен для atomic changes, общего design
system, shared types и единых CI rules. Цена — tooling, dependency graph, access control и необходимость affected cache.

```text
apps/
  web/
  admin/
  docs/
packages/
  ui/
  api-client/
  types/
  tooling/
```

Nx хорошо работает и с Angular, и с React; pnpm workspaces/Turborepo — framework-neutral варианты. Library boundary
должна отражать ownership и API, а не быть папкой ради папки.

</td></tr></table>
</details>

<details>
<summary>Чем Vertical Slice отличается от feature-based structure?</summary><br>
<table><tr><td>

Feature-based structure группирует связанный код по domain. Vertical Slice идет дальше: use case содержит все нужные
presentation, application и data-access части и минимально зависит от соседних slices.

```text
features/
  checkout/
    place-order/
      place-order-page.ts
      place-order.facade.ts
      place-order.api.ts
      place-order.spec.ts
    order-history/
  shared/
```

В React `.tsx` components и hooks живут внутри slice. В Angular routed component, facade/service, resolver и data-access
могут находиться рядом. Barrel экспортирует только public API feature; deep imports из другой feature запрещают lint
rules.

</td></tr></table>
</details>

<details>
<summary>Когда layer-based architecture полезна, а когда мешает?</summary><br>
<table><tr><td>

Папки `presentation`, `business`, `data`, `infrastructure` хорошо показывают техническое направление зависимостей и
подходят небольшому приложению. В большом продукте одна feature оказывается разбросана по всему repository, а изменения
затрагивают несколько команд.

Компромисс — feature-first сверху и layers внутри крупной feature. Inner domain не импортирует UI или HttpClient;
data-access реализует ports; presentation зависит от application API.

</td></tr></table>
</details>

<details>
<summary>Почему shared state через Module Federation опасен?</summary><br>
<table><tr><td>

Remote store технически можно expose и подключить в нескольких applications, но это связывает release versions,
framework runtime и state schema. Ошибка загрузки remote блокирует всех consumers.

<fieldset>
<legend>React</legend>

```js
new ModuleFederationPlugin({
  name: 'sharedState',
  exposes: {'./store': './src/store'},
  shared: ['react', 'redux'],
});
```

</fieldset>

Для cross-microfrontend communication предпочтительнее URL, backend state, versioned browser events или небольшой host
contract. Общий store допустим только при едином ownership и синхронном release policy.

</td></tr></table>
</details>

#### Testing Patterns

<details>
<summary>Что такое Testing Trophy?</summary><br>
<table><tr><td>

Testing Trophy делает foundation из static checks, затем использует unit tests для pure logic, больше integration tests
для взаимодействия частей и немного E2E для критических flows. Проценты не являются правилом: распределение зависит от
риска.

```text
          E2E: few critical flows
       Integration: most behavior
          Unit: pure isolated logic
       Static: TypeScript and lint
```

React Testing Library и Angular Testing Library проверяют DOM behavior. Angular `TestBed` нужен для DI/templates, а
Playwright — для настоящего routing, browser APIs и integration с backend.

</td></tr></table>
</details>

<details>
<summary>Как применять Arrange-Act-Assert в Angular и React?</summary><br>
<table><tr><td>

Arrange готовит данные и dependencies, Act выполняет одно значимое действие, Assert проверяет observable result. В
zoneless Angular после действия нужно дождаться scheduled rendering.

<fieldset>
<legend>Angular</legend>

```ts
it('shows the updated title', async () => {
  const fixture = TestBed.createComponent(ProfileCard);
  fixture.componentInstance.title.set('Architect');

  await fixture.whenStable();

  expect(fixture.nativeElement.querySelector('h2')?.textContent).toContain('Architect');
});
```

</fieldset>

В React Testing Library Act обычно выполняет `userEvent`, а Assert ищет accessible role/text. Комментарии AAA не нужны,
если структура короткого теста очевидна.

</td></tr></table>
</details>

<details>
<summary>Чем stub, mock, spy и fake отличаются друг от друга?</summary><br>
<table><tr><td>

- Stub возвращает заранее заданное значение.
- Mock записывает interaction и проверяет protocol вызовов.
- Spy оборачивает реальную функцию и наблюдает за ней.
- Fake является упрощенной, но рабочей реализацией, например in-memory repository.

```ts
class FakeUsersRepository implements UsersRepository {
  private readonly users = new Map<string, User>();

  save(user: User): Promise<void> {
    this.users.set(user.id, user);
    return Promise.resolve();
  }

  findById(id: string): Promise<User | undefined> {
    return Promise.resolve(this.users.get(id));
  }
}
```

В Angular fake подставляют через `{provide: UsersRepository, useClass: FakeUsersRepository}` или InjectionToken. В React
его передают provider-у/hook dependency. Проверять state/result предпочтительнее, чем каждый внутренний вызов.

</td></tr></table>
</details>

<details>
<summary>Что такое Page Object Model?</summary><br>
<table><tr><td>

Page Object скрывает selectors и повторяемые действия E2E page. Он должен описывать user intent, а не превращаться в
копию всей DOM structure.

```ts
class LoginPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto('/login');
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.getByLabel('Username').fill(username);
    await this.page.getByLabel('Password').fill(password);
    await this.page.getByRole('button', {name: 'Sign in'}).click();
  }
}
```

Один Page Object одинаково тестирует React и Angular UI, потому что работает с доступным browser contract, а не с
framework internals.

</td></tr></table>
</details>

#### Best Practices and Guidelines

<details>
<summary>Как применять SOLID во frontend без over-engineering?</summary><br>
<table><tr><td>

- SRP: component отображает profile, facade загружает user, formatter форматирует данные.
- OCP: новый variant добавляется через mapping или composition без переписывания consumers.
- LSP: API и cache repositories соблюдают одинаковый contract.
- ISP: card получает `Pick<User, 'id' | 'name'>`, а не огромный object со всеми полями.
- DIP: use case зависит от repository token/interface, infrastructure предоставляет implementation.

<fieldset>
<legend>Angular</legend>

```ts
export const USERS_REPOSITORY = new InjectionToken<UsersRepository>('UsersRepository');

export const usersRepositoryProvider = {
  provide: USERS_REPOSITORY,
  useClass: HttpUsersRepository,
} satisfies Provider;
```

</fieldset>

В React зависимость можно передать через props/context, в Angular — через DI. Не следует создавать interface для каждой
class: abstraction нужна на настоящей границе или при нескольких implementations.

</td></tr></table>
</details>

<details>
<summary>Как Separation of Concerns выглядит на практике?</summary><br>
<table><tr><td>

Data-access получает DTO, domain pure function сортирует и фильтрует products, application facade координирует loading,
а component отображает готовый view model.

<fieldset>
<legend>Angular</legend>

```ts
const selectAvailableProducts = (products: ReadonlyArray<Product>): ReadonlyArray<Product> =>
  products.filter((product) => product.stock > 0).toSorted((left, right) => right.price - left.price);

@Injectable()
export class ProductsFacade {
  private readonly productsState = signal<ReadonlyArray<Product>>([]);
  readonly availableProducts = computed(() => selectAvailableProducts(this.productsState()));
}
```

</fieldset>

React custom hook может быть application boundary, Angular service/facade — аналогом. Pure transformation остается
framework-neutral и тестируется без DOM/TestBed.

</td></tr></table>
</details>

<details>
<summary>Где проходит граница DRY?</summary><br>
<table><tr><td>

DRY устраняет повторение одного знания, а не похожий syntax. Универсальный `useFetch(url)` или `DataService<T>` быстро
теряет cancellation, validation, cache keys и domain semantics. Абстракция полезна, когда повторился стабильный
protocol.

<fieldset>
<legend>Angular</legend>

```ts
const loadUser = () => http.get<UserDto>('/api/user').pipe(map(toUser));
const loadProducts = () => http.get<ReadonlyArray<ProductDto>>('/api/products').pipe(map(toProducts));
```

</fieldset>

Эти функции похожи технически, но имеют разные contracts и invalidation rules. Query client или shared HTTP adapter
может убрать инфраструктурное повторение, не стирая domain names.

</td></tr></table>
</details>

<details>
<summary>Как реализовать Progressive Enhancement?</summary><br>
<table><tr><td>

Базовый HTML flow работает через browser navigation/form submit, JavaScript добавляет inline validation, optimistic UI и
submission без reload. Server остается источником проверки данных.

```html
<form
  action="/api/contact"
  method="post"
>
  <label>
    Email
    <input
      name="email"
      type="email"
      required
    />
  </label>
  <textarea
    name="message"
    required
  ></textarea>
  <button type="submit">Отправить</button>
</form>
```

React framework action или Angular submit handler может перехватить форму после hydration. Если продукт является чистой
authenticated SPA, полноценный no-JS fallback может быть нецелесообразен, но semantic HTML и native behavior остаются
полезными.

</td></tr></table>
</details>

<details>
<summary>Что входит в performance budget?</summary><br>
<table><tr><td>

Budget задает проверяемые пределы для initial JavaScript/CSS, изображений, LCP, CLS, INP и server latency. Он должен
проверяться в CI и на real-user monitoring, потому что Lighthouse lab run не отражает всех устройств и сетей.

```json
{
  "budgets": [
    {
      "type": "initial",
      "maximumWarning": "350kb",
      "maximumError": "500kb"
    }
  ]
}
```

Angular CLI поддерживает budgets в `angular.json`; React setup зависит от bundler/framework. Lighthouse CI может
проверять LCP, CLS и total blocking time, а bundle analyzer помогает найти причину превышения.

</td></tr></table>
</details>

<details>
<summary>Что означает Accessibility First для component architecture?</summary><br>
<table><tr><td>

Semantic element, accessible name, keyboard interaction, focus management и visible focus проектируются как часть API
component. Одного `role="dialog"` недостаточно: modal должен управлять initial focus, trap, Escape, background inert и
возвратом focus.

```html
<dialog
  #dialog
  aria-labelledby="dialog-title"
>
  <h2 id="dialog-title">Удалить заказ?</h2>
  <button
    type="button"
    (click)="dialog.close()"
  >
    Отмена
  </button>
</dialog>
```

React может использовать native elements или headless accessible library. В Angular для сложных widgets доступны CDK и
Angular Aria directives, которые реализуют focus и keyboard protocol; перед использованием `@angular/aria` нужно
добавить dependency и самостоятельно оформить visual states.

</td></tr></table>
</details>

#### Choosing the Right Pattern

<details>
<summary>Как выглядит decision matrix из gist с поправкой на реальные ограничения?</summary><br>
<table><tr><td>

| Контекст                            | Стартовый выбор                                                                                 |
| ----------------------------------- | ----------------------------------------------------------------------------------------------- |
| Маленький продукт, 1–3 разработчика | feature folders, local state, CSR или SSG                                                       |
| Средний продукт, 4–10 разработчиков | public feature APIs, lazy routes, facade/query layer                                            |
| Большой продукт, несколько команд   | monorepo, enforced boundaries, vertical slices; micro frontends только при независимых releases |
| Статический индексируемый контент   | SSG/prerender + CDN                                                                             |
| Динамический индексируемый контент  | SSR + cache                                                                                     |
| Authenticated dashboard             | CSR/hybrid, code splitting, virtualization для больших grids                                    |
| Смешанный сайт                      | route-based rendering, islands или incremental hydration                                        |

Количество страниц само по себе не требует micro frontends. Главные сигналы — organizational ownership, coupling,
release cadence, performance profile и domain complexity.

</td></tr></table>
</details>

<details>
<summary>Какие комбинации паттернов подходят типовым продуктам?</summary><br>
<table><tr><td>

- E-commerce: component architecture, SSG/SSR для catalog, CSR для checkout, BFF, query cache и feature structure.
- SaaS dashboard: container/presentational, CSR, lazy routes, query layer, virtualization и vertical slices.
- Content platform: SSG, islands/incremental hydration, minimal client state и CDN.
- Enterprise application: monorepo, strict feature boundaries, facade/store; micro frontends только для автономных
  команд.
- Marketing site: Atomic Design/design system, SSG, image optimization, prefetch budget и progressive enhancement.

В Angular набор может выглядеть как standalone lazy routes + signals facade + HttpClient/RxJS + SSR/prerender. В React —
framework routes + hooks/query cache + server/client component boundaries. Паттерны выбирают независимо от бренда
framework.

</td></tr></table>
</details>

### Связанные материалы

- [State Management](../state-management/index.md)
- [Angular: управление состоянием](../angular/index.md#управление-состоянием)
- [React: архитектурные вопросы](../react/index.md#архитектурные-вопросы)
- [Исходный список паттернов](https://gist.github.com/mosioc/d2f7fd3c7ef2b32a198fa6e693b74faa)
