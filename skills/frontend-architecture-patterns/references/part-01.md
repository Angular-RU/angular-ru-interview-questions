# Организация кода — вопросы и ответы, часть 1

> Автоматически сгенерировано из src/pages/frontend-architecture-patterns/index.md. Не редактируйте вручную.

## Организация кода

Архитектурный паттерн нужен не ради названия. Он фиксирует границы ответственности, направление зависимостей и правила
изменения приложения. Хороший выбор уменьшает связанность и делает feature проще для разработки, тестирования и
удаления. Начинать стоит с простого feature-first устройства и усложнять его, только когда это решает наблюдаемую
проблему команды.

### Границы и структура feature



#### Вопрос: Что такое feature-first структура и почему она обычно лучше папок по типу файлов?

**Короткий ответ**

Feature-first группирует код по пользовательской возможности: orders, profile, checkout. Внутри feature живут его UI,
маршруты, state, API-клиент и тесты. Папки components, services, models на весь проект кажутся простыми в начале, но со
временем смешивают несвязанные домены и делают ownership неясным.

**Полный ответ**

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





#### Вопрос: Как разделить presentational и container components?

**Короткий ответ**

Presentational component получает данные и callbacks через API, отображает UI и не знает, откуда пришли данные.
Container связывает route, use case, состояние и presentational UI. Это не жесткое правило: маленький component может
содержать оба слоя. Разделение окупается, когда UI переиспользуется, загрузка усложняется или component становится
трудно тестировать.

**Полный ответ**

Presentational component получает данные и callbacks через API, отображает UI и не знает, откуда пришли данные.
Container связывает route, use case, состояние и presentational UI. Это не жесткое правило: маленький component может
содержать оба слоя. Разделение окупается, когда UI переиспользуется, загрузка усложняется или component становится
трудно тестировать.

В React container обычно использует hook и передает props. В Angular container инжектирует facade или service, а
presentational component получает `input()` и отдает событие через `output()`.

```tsx filename="OrdersPage.tsx"
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

```ts filename="orders-list.component.ts"
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

```ts filename="orders-page.component.ts"
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





#### Вопрос: Что означает правило dependency direction?

**Короткий ответ**

Зависимости должны идти от внешних деталей к более стабильному коду: UI зависит от application use case, use case
зависит от domain-контракта, а HTTP-клиент реализует этот контракт. Тогда изменение React component, Angular template
или REST endpoint не заставляет менять business rule.

**Полный ответ**

Зависимости должны идти от внешних деталей к более стабильному коду: UI зависит от application use case, use case
зависит от domain-контракта, а HTTP-клиент реализует этот контракт. Тогда изменение React component, Angular template
или REST endpoint не заставляет менять business rule.

Практически это означает: не передавать `HttpClient`, React Query result или `ActivatedRoute` в domain-функции; DTO не
делать domain-моделью; не импортировать component из data-access слоя. Не каждой feature нужны все слои, но направление
зависимостей важно всегда.





#### Вопрос: Что такое facade pattern во frontend и чем он отличается от state manager?

**Короткий ответ**

Facade дает UI маленький API предметной области: данные для отображения и операции вроде load(), approve() или retry().
Она скрывает cache, store, HTTP и детали преобразования DTO. State manager хранит и изменяет состояние; facade может
использовать state manager, но не обязана.

**Полный ответ**

Facade дает UI маленький API предметной области: данные для отображения и операции вроде `load()`, `approve()` или
`retry()`. Она скрывает cache, store, HTTP и детали преобразования DTO. State manager хранит и изменяет состояние;
facade может использовать state manager, но не обязана.

В React эту роль часто играет custom hook. В Angular это обычно service с readonly signals или Observable API. UI не
должен вызывать `HttpClient` или dispatch произвольных actions напрямую.

```ts filename="orders.facade.ts"
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





#### Вопрос: Как отделить DTO от domain model?

**Короткий ответ**

DTO повторяет контракт транспорта и может содержать строки дат, nullable-поля или неудачные названия backend. Domain
model описывает данные, удобные и безопасные для приложения. Адаптер в data-access слое валидирует и преобразует DTO;
остальной код не зависит от формы ответа API.

**Полный ответ**

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



### Паттерны UI-композиции



#### Вопрос: Когда выбирать composition вместо множества boolean props?

**Короткий ответ**

Если API component разрастается до isCompact, showHeader, hasActions, isEditable и комбинации флагов создают разные
layouts, лучше передавать части интерфейса как children, slots или отдельные components. Composition делает допустимые
комбинации видимыми в месте использования и уменьшает число неявных режимов.

**Полный ответ**

Если API component разрастается до `isCompact`, `showHeader`, `hasActions`, `isEditable` и комбинации флагов создают
разные layouts, лучше передавать части интерфейса как children, slots или отдельные components. Composition делает
допустимые комбинации видимыми в месте использования и уменьшает число неявных режимов.

React использует `children` и compound components. Angular использует content projection (`ng-content`) и directives для
маркировки проецируемых частей.

```tsx title="React"
<Dialog>
  <Dialog.Title>Удалить заказ?</Dialog.Title>
  <Dialog.Actions>
    <button type="button">Удалить</button>
  </Dialog.Actions>
</Dialog>
```

```html title="Angular"
<app-dialog>
  <h2 dialog-title>Удалить заказ?</h2>
  <div dialog-actions><button type="button">Удалить</button></div>
</app-dialog>
```





#### Вопрос: Что такое custom hook в React и какой его аналог в Angular?

**Короткий ответ**

Custom hook повторно использует stateful логику React: например, debounce, загрузку или взаимодействие с браузерным API.
Он подчиняется rules of hooks и вызывается только из React component или другого hook.

**Полный ответ**

Custom hook повторно использует stateful логику React: например, debounce, загрузку или взаимодействие с браузерным API.
Он подчиняется rules of hooks и вызывается только из React component или другого hook.

В Angular логику обычно выносят в service, функцию, использующую `inject()` в injection context, directive или pipe.
Выбор определяется lifetime: service может быть root-, route- или component-scoped, тогда как hook живет вместе с
вызвавшим его component.

```ts title="Angular"
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

В production для сложной формы лучше использовать form control; пример показывает именно scoped lifetime состояния.





#### Вопрос: Когда нужен compound component pattern?

**Короткий ответ**

Compound components делят один составной виджет на согласованные части: Tabs.List, Tabs.Panel, Select.Option. Родитель
владеет общим состоянием и accessibility-правилами, а вложенные части получают контекст. Паттерн полезен для
переиспользуемых UI primitives, но избыточен для одноразовой разметки feature.

**Полный ответ**

Compound components делят один составной виджет на согласованные части: `Tabs.List`, `Tabs.Panel`, `Select.Option`.
Родитель владеет общим состоянием и accessibility-правилами, а вложенные части получают контекст. Паттерн полезен для
переиспользуемых UI primitives, но избыточен для одноразовой разметки feature.

В React связь часто строят через Context. В Angular для этого подходят parent component, `contentChildren()`, DI по
element injector и directives. Особенно важно централизованно поддержать клавиатурную навигацию, focus и ARIA, а не
оставить это каждому consumer.



### Слои и масштабирование



#### Вопрос: Что такое layered architecture и когда она достаточна?

**Короткий ответ**

В простой layered architecture UI обращается к application/service слою, тот использует data-access, а domain содержит
типы и чистые правила. Она достаточно хороша для большинства frontend-приложений, если границы feature понятны и слои не
обходятся импортами.

**Полный ответ**

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





#### Вопрос: Что такое clean architecture во frontend и какой ее trade-off?

**Короткий ответ**

Clean architecture отделяет domain и use cases от фреймворка, UI и инфраструктуры. Например, use case placeOrder зависит
от OrdersRepository, а Angular service или React API client реализует его через HTTP. Это упрощает тесты и замену
интеграций, когда правила действительно сложны и долгоживущи.

**Полный ответ**

Clean architecture отделяет domain и use cases от фреймворка, UI и инфраструктуры. Например, use case `placeOrder`
зависит от `OrdersRepository`, а Angular service или React API client реализует его через HTTP. Это упрощает тесты и
замену интеграций, когда правила действительно сложны и долгоживущи.

Trade-off — дополнительные interfaces, adapters и переходы между моделями. Для CRUD-экрана с небольшой логикой это может
скрыть простое действие за несколькими файлами. Правильный подход: оставить pure business rules независимыми, но вводить
полный набор портов и adapters только при реальной выгоде.





#### Вопрос: Как организовать server state и client state в React и Angular?

**Короткий ответ**

Server state принадлежит backend и требует cache, invalidation, retry и работы со stale-данными. В React для него часто
используют TanStack Query; локальный UI state оставляют в useState, reducer или небольшом store. В Angular server state
можно держать в service с resource или RxJS/query layer, а локальный UI state — в signal() рядом с component.

**Полный ответ**

Server state принадлежит backend и требует cache, invalidation, retry и работы со stale-данными. В React для него часто
используют TanStack Query; локальный UI state оставляют в `useState`, reducer или небольшом store. В Angular server
state можно держать в service с `resource` или RxJS/query layer, а локальный UI state — в `signal()` рядом с component.

Не смешивайте эти роли в одном глобальном store без причины. Фильтр, который должен переживать ссылку, принадлежит URL;
черновик формы — form layer; данные заказа — cache/repository; открытая панель — локальному UI.





#### Вопрос: Когда оправданы micro frontends?

**Короткий ответ**

Micro frontends оправданы при независимых командах, релизных циклах и доменах, когда организационная граница важнее
стоимости интеграции. Они не являются способом автоматически разделить большой monolith: добавляют versioning,
наблюдаемость, design system, routing, shared auth, performance budget и контракт между host и remote.

**Полный ответ**

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



### Выбор паттерна



#### Вопрос: Как аргументировать архитектурный выбор на интервью?

**Короткий ответ**

Начните с контекста: размер команды, число feature, сложность domain-правил, независимость релизов, требования к SSR,
кешу и тестированию. Затем назовите простое решение и критерии роста.

**Полный ответ**

Начните с контекста: размер команды, число feature, сложность domain-правил, независимость релизов, требования к SSR,
кешу и тестированию. Затем назовите простое решение и критерии роста.

Например: «Для нового Angular feature я начну с route-level feature folder, presentational components и facade service с
signals. DTO останутся в data-access. Если появятся сложные async streams, добавлю RxJS; если нескольким командам
понадобятся единые transitions, selectors и DevTools, рассмотрю NgRx. Для React аналогично: feature folder, custom hook
как facade и query layer для server state, без глобального store до появления shared client state».

Такой ответ показывает, что паттерн выбран под ограничения, а не скопирован из другого проекта.
