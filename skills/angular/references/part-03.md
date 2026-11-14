# Angular — вопросы и ответы, часть 3

> Автоматически сгенерировано из src/pages/angular/index.md. Не редактируйте вручную.

### Angular animations



#### Вопрос: Что такое trigger в Angular animations?

**Короткий ответ**

Trigger объединяет имя анимации, список состояний и переходов. В template его привязывали к элементу, а значение binding
определяло текущее состояние:

**Полный ответ**

Trigger объединяет имя анимации, список состояний и переходов. В template его привязывали к элементу, а значение binding
определяло текущее состояние:

```html
<section [@panel]="isOpen() ? 'expanded' : 'collapsed'"></section>
```

Для современного Angular стоит отдельно проговорить, что legacy trigger API может встретиться при поддержке старого
кода, а новые enter/leave и state-driven animation cases часто проще решить CSS transition, Web Animations API или
анимациями UI-kit.





#### Вопрос: Что такое wildcard-состояние в Angular animations?

**Короткий ответ**

Wildcard означает любое состояние. Его использовали, когда анимация должна сработать независимо от конкретного
начального или конечного значения:

**Полный ответ**

Wildcard `*` означает любое состояние. Его использовали, когда анимация должна сработать независимо от конкретного
начального или конечного значения:

```ts
transition('* => expanded', animate('200ms'));
transition('collapsed => *', animate('150ms'));
transition('* => *', animate('120ms'));
```

Такой transition удобен для fallback-логики, но в сложных компонентах может скрывать реальные состояния. Лучше явно
называть важные UI states и оставлять wildcard только для универсального поведения.





#### Вопрос: Как в legacy Angular animations определить переход между двумя состояниями?

**Короткий ответ**

В старом DSL из @angular/animations состояния описывали через state(), а переходы между ними через transition(). Такой
код все еще встречается в legacy-проектах, хотя для нового кода в Angular 20.2+ предпочтительнее CSS-анимации и
animate.enter / animate.leave.

**Полный ответ**

В старом DSL из `@angular/animations` состояния описывали через `state()`, а переходы между ними через `transition()`.
Такой код все еще встречается в legacy-проектах, хотя для нового кода в Angular 20.2+ предпочтительнее CSS-анимации и
`animate.enter` / `animate.leave`.

```ts
trigger('panel', [
  state('collapsed', style({height: '0'})),
  state('expanded', style({height: '*'})),
  transition('collapsed <=> expanded', animate('200ms ease-out')),
]);
```

На интервью важно объяснить не только синтаксис, но и жизненный цикл: Angular применяет trigger к элементу, сравнивает
предыдущее и новое состояние, затем запускает подходящий transition.



### Dependency Injection



#### Вопрос: Чем DI-паттерн отличается от Angular DI?

**Короткий ответ**

Dependency Injection как паттерн означает, что класс не создает зависимости сам, а получает их снаружи. Это уменьшает
связанность и упрощает тестирование.

**Полный ответ**

Dependency Injection как паттерн означает, что класс не создает зависимости сам, а получает их снаружи. Это уменьшает
связанность и упрощает тестирование.

Angular DI — конкретная реализация этого паттерна: Angular хранит providers в иерархии injectors, находит dependency по
token и управляет lifetime экземпляров. Базовый пример Angular DI см. в вопросе
[«Что такое DI в Angular?»](#angular-core).





#### Вопрос: Что такое Singleton Service и с какой целью его используют в Angular?

**Короткий ответ**

Это сервисы, объявленные в приложении и имеющие один экземпляр на все приложение. Его можно объявить двумя способами:

**Полный ответ**

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





#### Вопрос: Как можно определить свой обработчик ErrorHandler, Logging, Cache в Angular?

**Короткий ответ**

Глобальные необработанные ошибки можно направить в собственный ErrorHandler:

**Полный ответ**

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



### Angular Change Detection



#### Вопрос: Что такое Change Detection, как работает Change Detection Mechanism?

**Короткий ответ**

Change Detection — синхронизация состояния приложения с DOM. Angular выполняет скомпилированные инструкции шаблона и
обновляет bindings, значения которых изменились.

**Полный ответ**

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





#### Вопрос: Какие существуют стратегии обнаружения изменений?

**Короткий ответ**

Есть две стратегии:

**Полный ответ**

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





#### Вопрос: Сколько Change Detector(ов) может быть во всем приложении?

**Короткий ответ**

У каждого component view есть собственное представление change detection, связанное в дерево views. Ivy как отдельная
тема является historical topic: сегодня это обычный runtime Angular, а его внутренние структуры LView/TView не являются
публичным API. AbstractChangeDetector не является актуальной моделью публичного API.

**Полный ответ**

У каждого component view есть собственное представление change detection, связанное в дерево views. Ivy как отдельная
тема является historical topic: сегодня это обычный runtime Angular, а его внутренние структуры `LView`/`TView` не
являются публичным API. `AbstractChangeDetector` не является актуальной моделью публичного API.

Через `ChangeDetectorRef` можно пометить view для проверки, локально проверить его, detach или reattach. Обычно signals
и bindings отправляют необходимые уведомления автоматически.





#### Вопрос: Основное отличие constructor от ngOnInit?

**Короткий ответ**

Конструктор — механизм JavaScript/TypeScript. Angular создает экземпляр класса и предоставляет injection context,
поэтому зависимости можно получать через inject() в инициализаторах полей.

**Полный ответ**

Конструктор — механизм JavaScript/TypeScript. Angular создает экземпляр класса и предоставляет injection context,
поэтому зависимости можно получать через `inject()` в инициализаторах полей.

`ngOnInit()` — lifecycle hook Angular. Он вызывается один раз после установки initial inputs и до проверки дочерних
views.

Signal inputs можно читать в `ngOnInit`, `computed()` и `effect()`. Для чистых производных значений лучше `computed()`,
а не копирование input в отдельное поле.

Для DOM-зависимой логики используют `afterNextRender()`/`afterEveryRender()` или after-view hooks.





#### Вопрос: Чем markForCheck() отличается от detectChanges(), detach() и reattach()?

**Короткий ответ**

Для OnPush обычно нужен markForCheck(). detectChanges() используют на узких интеграционных границах. detach() оправдан
для редко обновляемых тяжелых views, если команда явно управляет их обновлением.

**Полный ответ**

- `markForCheck()` помечает view и предков для проверки в следующем scheduled change detection.
- `detectChanges()` немедленно проверяет текущую view и ее дочерние views.
- `detach()` исключает view из обычного дерева проверок.
- `reattach()` возвращает ее обратно.

Для OnPush обычно нужен `markForCheck()`. `detectChanges()` используют на узких интеграционных границах. `detach()`
оправдан для редко обновляемых тяжелых views, если команда явно управляет их обновлением.





#### Вопрос: Что такое coalescing Change Detection и как найти лишние проверки?

**Короткий ответ**

Coalescing объединяет несколько событий или вызовов NgZone.run() в одну проверку, уменьшая повторную работу в zone-based
приложении.

**Полный ответ**

Coalescing объединяет несколько событий или вызовов `NgZone.run()` в одну проверку, уменьшая повторную работу в
zone-based приложении.

Диагностика:

- Angular DevTools Profiler показывает change detection и render cost;
- Chrome Performance помогает найти long tasks, layout и scripting;
- временный счетчик в development-сборке показывает частоту вызова hot-path;
- тяжелые template methods заменяют `computed()` или pure pipe;
- проверяют мутации, частые DOM events и слишком широкое общее состояние.

Сначала измеряют конкретный сценарий, затем оптимизируют component boundaries, список, вычисления или scheduling.





#### Вопрос: Что такое zoneless Angular?

**Короткий ответ**

Zoneless Angular — режим, в котором Angular не полагается на ZoneJS для глобального перехвата async APIs. Вместо этого
view помечается dirty точными уведомлениями:

**Полный ответ**

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



### Angular Signals



#### Вопрос: Что такое Signals и когда их использовать?

**Короткий ответ**

Signal — реактивный контейнер для значения. Angular отслеживает чтение signal и обновляет зависящие от него вычисления и
представления при изменении.

**Полный ответ**

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





#### Вопрос: В чем разница между input(), output() и model()?

**Короткий ответ**

input() поддерживает required inputs, aliases и transforms. model() используют, когда ребенок действительно должен
изменять связанное значение; для обычного события достаточно output().

**Полный ответ**

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





#### Вопрос: В чем разница между computed(), effect() и linkedSignal()?

**Короткий ответ**

computed() создает readonly производное значение. Вычисление lazy, memoized и не должно иметь side effects:

**Полный ответ**

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





#### Вопрос: Когда использовать resource(), httpResource() и RxJS?

**Короткий ответ**

resource() связывает async loader с signal-параметрами и предоставляет value, status, error и loading state.
httpResource() делает похожую модель для HttpClient.

**Полный ответ**

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



### RxJS



#### Вопрос: Для чего нужен RxJS и какую проблему он решает?

**Короткий ответ**

RxJS предоставляет модель потоков для асинхронных значений и событий. Он помогает декларативно описывать:

**Полный ответ**

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





#### Вопрос: Что такое Observable?

**Короткий ответ**

Observable - ленивый поток значений. Он начинает работу при подписке и может передать ноль, одно или несколько значений,
ошибку и сигнал завершения.

**Полный ответ**

Observable - ленивый поток значений. Он начинает работу при подписке и может передать ноль, одно или несколько значений,
ошибку и сигнал завершения.





#### Вопрос: Что такое Observer, subscription и обработка ошибок в Observable?

**Короткий ответ**

Observer — объект или набор callbacks, который получает уведомления Observable:

**Полный ответ**

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





#### Вопрос: В чем разница между Observable и Promise?

**Короткий ответ**

Promise возвращает один будущий результат и начинает выполнение сразу после создания. Observable ленивый, может передать
несколько значений и предоставляет операторы для композиции, повторов и отмены через отписку.

**Полный ответ**

Promise возвращает один будущий результат и начинает выполнение сразу после создания. Observable ленивый, может передать
несколько значений и предоставляет операторы для композиции, повторов и отмены через отписку.

Для одного простого результата подходит Promise. Для пользовательских событий, WebSocket, polling и сложной координации
потоков обычно используют RxJS.





#### Вопрос: Чем cold Observable отличается от hot Observable?

**Короткий ответ**

Cold Observable запускает producer отдельно для каждой подписки. HttpClient возвращает cold Observable: каждый
subscribe() отправляет новый запрос.

**Полный ответ**

Cold Observable запускает producer отдельно для каждой подписки. `HttpClient` возвращает cold Observable: каждый
`subscribe()` отправляет новый запрос.

Hot Observable имеет общий producer для подписчиков. Примеры: DOM events, WebSocket, `Subject`.

`share()` превращает cold stream в совместно используемый hot stream на время подписчиков. `shareReplay()` дополнительно
повторяет последние значения новым подписчикам.





#### Вопрос: Чем Observable отличается от Subject?

**Короткий ответ**

Subject одновременно является Observable и observer: в него можно передавать значения через next(), а один экземпляр
рассылает их нескольким подписчикам.

**Полный ответ**

`Subject` одновременно является Observable и observer: в него можно передавать значения через `next()`, а один экземпляр
рассылает их нескольким подписчикам.

Обычный cold Observable обычно запускает producer отдельно для каждой подписки. `BehaviorSubject` требует начальное
значение и сразу передает новому подписчику текущее значение.





#### Вопрос: В чем разница между Subject, BehaviorSubject, ReplaySubject, AsyncSubject?

**Короткий ответ**

Для состояния Angular-компонента чаще используют signals. Subject остается полезен на RxJS-границах и для потоков
событий.

**Полный ответ**

- `Subject` передает только новые значения после подписки.
- `BehaviorSubject` хранит текущее значение и сразу отдает его новому подписчику.
- `ReplaySubject` повторяет заданное число предыдущих значений.
- `AsyncSubject` после завершения передает последнее значение.

Для состояния Angular-компонента чаще используют signals. Subject остается полезен на RxJS-границах и для потоков
событий.





#### Вопрос: Для чего нужны map, tap и filter в RxJS?

**Короткий ответ**

map преобразует значение, filter пропускает только подходящие значения, tap выполняет побочный эффект без изменения
значения.

**Полный ответ**

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





#### Вопрос: Чем отличаются switchMap, mergeMap и concatMap?

**Короткий ответ**

switchMap отменяет предыдущий внутренний stream при новом значении. Подходит для поиска. - mergeMap выполняет внутренние
streams параллельно. Подходит для независимых операций. - concatMap ставит внутренние streams в очередь и сохраняет
порядок.

**Полный ответ**

- `switchMap` отменяет предыдущий внутренний stream при новом значении. Подходит для поиска.
- `mergeMap` выполняет внутренние streams параллельно. Подходит для независимых операций.
- `concatMap` ставит внутренние streams в очередь и сохраняет порядок.





#### Вопрос: Как выбрать switchMap, mergeMap, concatMap или exhaustMap?

**Короткий ответ**

Для mutation-запросов switchMap опасен, если отмена предыдущей операции нарушает ожидания пользователя.

**Полный ответ**

- `switchMap` отменяет предыдущую inner subscription: autocomplete, route params.
- `mergeMap` выполняет параллельно: независимые uploads или writes.
- `concatMap` сохраняет очередь и порядок: последовательные изменения.
- `exhaustMap` игнорирует новые события до завершения текущего: защита submit/login от двойного клика.

Для mutation-запросов `switchMap` опасен, если отмена предыдущей операции нарушает ожидания пользователя.





#### Вопрос: Чем combineLatest, withLatestFrom и forkJoin отличаются?

**Короткий ответ**

forkJoin подходит для параллельных finite HTTP-запросов, но никогда не завершится с бесконечным stream.

**Полный ответ**

- `combineLatest` после initial values эмитит при изменении любого источника.
- `withLatestFrom` эмитит только когда срабатывает основной source, добавляя последние значения других streams.
- `forkJoin` ждет завершения всех источников и один раз возвращает их последние значения.

`forkJoin` подходит для параллельных finite HTTP-запросов, но никогда не завершится с бесконечным stream.





#### Вопрос: Чем debounceTime, throttleTime и auditTime отличаются?

**Короткий ответ**

Для resize/scroll часто подходит auditTime, для autocomplete — debounceTime, для ограничения частых действий —
throttleTime.

**Полный ответ**

- `debounceTime` ждет паузу: поиск после остановки ввода.
- `throttleTime` пропускает первое значение и ограничивает частоту следующих.
- `auditTime` после окна отдает последнее накопленное значение.

Для resize/scroll часто подходит `auditTime`, для autocomplete — `debounceTime`, для ограничения частых действий —
`throttleTime`.





#### Вопрос: Когда нужна ручная отписка и что делает takeUntilDestroyed()?

**Короткий ответ**

От finite streams (HttpClient, first(), take(1)) вручную отписываться не нужно. AsyncPipe и toSignal() управляют
подпиской автоматически.

**Полный ответ**

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





#### Вопрос: Как построить autocomplete с отменой запроса?

**Короткий ответ**

switchMap отписывается от прошлого HTTP Observable, а Angular отменяет запрос. catchError находится внутри switchMap,
поэтому ошибка одного запроса не завершает поток пользовательского ввода.

**Полный ответ**

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





#### Вопрос: Где ставить catchError: внутри или снаружи switchMap?

**Короткий ответ**

Внутри — если ошибка относится к одной inner operation и внешний поток должен продолжить работать:

**Полный ответ**

Внутри — если ошибка относится к одной inner operation и внешний поток должен продолжить работать:

```ts
source$.pipe(switchMap((value) => request(value).pipe(catchError(() => of(fallback)))));
```

Снаружи — если любая ошибка должна завершить или полностью заменить весь pipeline. Для UI events чаще нужен внутренний
`catchError`.





#### Вопрос: Какие проблемы возможны у shareReplay()?

**Короткий ответ**

shareReplay({bufferSize: 1, refCount: true}) часто используют для дедупликации чтения.

**Полный ответ**

`shareReplay({bufferSize: 1, refCount: true})` часто используют для дедупликации чтения.

Риски:

- Observable создается заново при каждом getter-вызове;
- кеш не инвалидируется после mutation/logout;
- без подходящего `refCount` источник может жить дольше подписчиков;
- большой buffer удерживает память;
- кеширование error/loading смешивается с кешированием данных.

Нужно явно определить ключ, срок жизни, refresh и очистку кеша.





#### Вопрос: Как бы вы кешировали наблюдаемые данные из потоков (stream)?

**Короткий ответ**

Способ зависит от срока жизни, ключа и политики инвалидирования кеша. Для совместного использования результата
HTTP-запроса часто применяют shareReplay.

**Полный ответ**

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



### RxJS practical cases



#### Вопрос: Что такое Observable высшего порядка?

**Короткий ответ**

Observable высшего порядка эмитит другие Observable. Это часто появляется, когда событие запускает async operation:
route param загружает HTTP-запрос, input value запускает search request, click запускает save.

**Полный ответ**

Observable высшего порядка эмитит другие Observable. Это часто появляется, когда событие запускает async operation:
route param загружает HTTP-запрос, input value запускает search request, click запускает save.

```ts
const requests$ = this.query.valueChanges.pipe(map((query) => this.api.search(query)));
```

С таким stream почти всегда нужен flattening operator: `switchMap`, `concatMap`, `mergeMap` или `exhaustMap`. Выбор
зависит от бизнес-смысла: отменять старое, выполнять параллельно, сохранять порядок или игнорировать новые события.





#### Вопрос: Что такое multicasting в RxJS?

**Короткий ответ**

Multicasting позволяет нескольким subscribers разделять один source execution. Без этого cold Observable, например
HttpClient request, может выполниться заново для каждой подписки.

**Полный ответ**

Multicasting позволяет нескольким subscribers разделять один source execution. Без этого cold Observable, например
`HttpClient` request, может выполниться заново для каждой подписки.

В Angular чаще всего встречается `share()` или `shareReplay()`, но их нельзя применять механически:

- `share()` не кеширует прошлое значение;
- `shareReplay()` может удерживать значение в памяти;
- без `refCount` долгоживущий source может не остановиться, когда подписчиков больше нет.

Хороший ответ объясняет, что именно шарится: результат HTTP-запроса, WebSocket connection, expensive computation или
template-facing stream.





#### Вопрос: В чем разница между of и from в RxJS?

**Короткий ответ**

of(value) эмитит переданные значения как есть. from(source) превращает iterable, Promise или Observable-like source в
Observable.

**Полный ответ**

`of(value)` эмитит переданные значения как есть. `from(source)` превращает iterable, Promise или Observable-like source
в Observable.

```ts
of([1, 2, 3]); // один emission: массив
from([1, 2, 3]); // три emission: 1, 2, 3
from(fetch('/api/users')); // emission результата Promise
```

На практике `of(fallback)` часто используют в `catchError`, а `from(promise)` нужен, когда Promise надо включить в RxJS
pipeline.





#### Вопрос: Чем scan отличается от reduce в RxJS?

**Короткий ответ**

scan накапливает состояние и эмитит промежуточный результат на каждое входящее значение. Он подходит для UI state,
progress и event reducers.

**Полный ответ**

`scan` накапливает состояние и эмитит промежуточный результат на каждое входящее значение. Он подходит для UI state,
progress и event reducers.

`reduce` эмитит только один финальный результат после completion source. Для бесконечных streams вроде clicks или
WebSocket он не отдаст значение, пока stream не завершится.





#### Вопрос: Когда использовать zip в RxJS?

**Короткий ответ**

zip объединяет emissions по порядковому номеру: первое значение первого stream с первым значением второго, второе со
вторым и так далее. Он ждет, пока каждый source отдаст значение для текущей позиции.

**Полный ответ**

`zip` объединяет emissions по порядковому номеру: первое значение первого stream с первым значением второго, второе со
вторым и так далее. Он ждет, пока каждый source отдаст значение для текущей позиции.

```ts
zip(userIds$, permissions$).subscribe(([userId, permissions]) => {
  // значения синхронизированы по позиции, а не по времени последнего изменения
});
```

Для UI чаще подходят `combineLatest`, `withLatestFrom` или `forkJoin`. `zip` уместен, когда streams представляют парные
последовательности и важно сопоставлять элементы именно по номеру emission.





#### Вопрос: Как выполнить API-запросы строго по порядку?

**Короткий ответ**

Используйте concatMap: он ставит inner Observables в очередь и запускает следующий только после завершения предыдущего.

**Полный ответ**

Используйте `concatMap`: он ставит inner Observables в очередь и запускает следующий только после завершения
предыдущего.

```ts
readonly saved$ = this.saveClicks.pipe(concatMap((draft) => this.api.save(draft)));
```

Для независимых запросов подойдет `mergeMap`, но порядок завершения там не гарантирован.





#### Вопрос: Как объединить route params и UI events?

**Короткий ответ**

Route params и UI events превращают в streams и объединяют через combineLatest или withLatestFrom, затем загружают
данные через подходящий flattening operator.

**Полный ответ**

Route params и UI events превращают в streams и объединяют через `combineLatest` или `withLatestFrom`, затем загружают
данные через подходящий flattening operator.

```ts
readonly page$ = combineLatest([
  this.route.paramMap.pipe(map((params) => params.get('id'))),
  this.filtersChanged.pipe(startWith(defaultFilters)),
]).pipe(switchMap(([id, filters]) => this.api.load(id, filters)));
```

Важно задать initial value для UI stream, иначе `combineLatest` будет ждать первое событие.





#### Вопрос: Как переиспользовать результат запроса между routes?

**Короткий ответ**

Вынесите загрузку и кеш в сервис, который живет дольше конкретного route component: root service, feature provider или
route-level provider на общем parent route.

**Полный ответ**

Вынесите загрузку и кеш в сервис, который живет дольше конкретного route component: root service, feature provider или
route-level provider на общем parent route.

Компоненты читают один и тот же stream/signal из сервиса. Ключ кеша должен учитывать params, пользователя и правила
инвалидирования.





#### Вопрос: Как избежать race condition в RxJS-загрузке данных?

**Короткий ответ**

Race condition возникает, когда более старый async result приходит позже нового и перезаписывает актуальное состояние.
Для route params, поиска и фильтров обычно используют switchMap, чтобы отменять прошлый запрос.

**Полный ответ**

Race condition возникает, когда более старый async result приходит позже нового и перезаписывает актуальное состояние.
Для route params, поиска и фильтров обычно используют `switchMap`, чтобы отменять прошлый запрос.

Для write operations чаще выбирают `concatMap` или `exhaustMap`, потому что отмена mutation может сломать
пользовательский сценарий.



### Angular Forms



#### Вопрос: Что такое реактивные формы в Angular?

**Короткий ответ**

Reactive Forms — стабильный model-driven API на основе AbstractControl. Модель формы создается в TypeScript, имеет
синхронный доступ к value/status и Observable-потоки valueChanges/statusChanges.

**Полный ответ**

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





#### Вопрос: Что такое FormGroup и FormControl и для чего они используются?

**Короткий ответ**

В strictly typed Reactive Forms:

**Полный ответ**

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





#### Вопрос: Что такое NgForm?

**Короткий ответ**

NgForm - директива template-driven forms, которая автоматически создает form model для и собирает controls с ngModel.

**Полный ответ**

`NgForm` - директива template-driven forms, которая автоматически создает form model для `<form>` и собирает controls с
`ngModel`.

Она удобна для простых форм, но для сложной typed logic, динамических controls и тестирования чаще выбирают Reactive
Forms или Signal Forms в новых версиях Angular.





#### Вопрос: Чем Reactive Forms отличаются от template-driven forms?

**Короткий ответ**

Reactive Forms создают model в TypeScript, дают typed controls, synchronous state и удобное тестирование. Они подходят
сложным формам и динамической структуре.

**Полный ответ**

Reactive Forms создают model в TypeScript, дают typed controls, synchronous state и удобное тестирование. Они подходят
сложным формам и динамической структуре.

Template-driven forms создают model преимущественно через directives в шаблоне. Они удобны для небольших простых форм,
но хуже масштабируются.

В Angular 21–22 для нового signal-first кода доступны Signal Forms. Выбор зависит от версии и архитектуры существующего
проекта.





#### Вопрос: Для чего нужен FormBuilder?

**Короткий ответ**

FormBuilder сокращает boilerplate при создании Reactive Forms. В строго типизированных формах часто используют
NonNullableFormBuilder, чтобы controls не получали null без явной причины.

**Полный ответ**

`FormBuilder` сокращает boilerplate при создании Reactive Forms. В строго типизированных формах часто используют
`NonNullableFormBuilder`, чтобы controls не получали `null` без явной причины.

```ts
readonly form = this.formBuilder.nonNullable.group({
  email: ['', [Validators.required, Validators.email]],
});
```





#### Вопрос: Чем setValue отличается от patchValue и что делают emitEvent/onlySelf?

**Короткий ответ**

Эти флаги используют осторожно: подавленное событие может оставить derived state несинхронизированным.

**Полный ответ**

- `setValue()` требует полную структуру control tree.
- `patchValue()` обновляет только переданные поля.
- `{emitEvent: false}` подавляет `valueChanges`, `statusChanges` и unified events.
- `{onlySelf: true}` не распространяет обновление validity/value к родителю.

Эти флаги используют осторожно: подавленное событие может оставить derived state несинхронизированным.





#### Вопрос: Что означают dirty, touched и pristine в Angular Forms?

**Короткий ответ**

pristine означает, что пользователь еще не менял значение control. dirty - значение было изменено пользователем.
touched - control потерял focus после взаимодействия.

**Полный ответ**

`pristine` означает, что пользователь еще не менял значение control. `dirty` - значение было изменено пользователем.
`touched` - control потерял focus после взаимодействия.

Обычно validation errors показывают после `touched` или `dirty`, чтобы форма не ругалась сразу при первом render.





#### Вопрос: Как применять валидацию для простых и сложных форм?

**Короткий ответ**

В Reactive Forms валидаторы передают control при создании или через setValidators/addValidators.

**Полный ответ**

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





#### Вопрос: Как показывать validation errors в template?

**Короткий ответ**

Показывайте ошибку, когда control invalid и пользователь уже взаимодействовал с полем или отправил форму. Условие лучше
держать простым и не вызывать тяжелые функции в template.

**Полный ответ**

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





#### Вопрос: Как работают async validators?

**Короткий ответ**

Async validator возвращает Promise или Observable с ValidationErrors | null. Angular запускает его после успешных
синхронных validators и переводит control в статус PENDING до результата.

**Полный ответ**

Async validator возвращает Promise или Observable с `ValidationErrors | null`. Angular запускает его после успешных
синхронных validators и переводит control в статус `PENDING` до результата.

Типичный пример - проверка уникальности username. Внутри нужно отменять/ограничивать лишние запросы и не считать
frontend-валидацию границей безопасности.





#### Вопрос: Что такое ControlValueAccessor и когда писать свой CVA?

**Короткий ответ**

ControlValueAccessor связывает Angular Forms с кастомным UI-контролом. Его пишут для date picker, rich editor, slider
или составного input, который должен работать с formControl, formControlName и ngModel.

**Полный ответ**

`ControlValueAccessor` связывает Angular Forms с кастомным UI-контролом. Его пишут для date picker, rich editor, slider
или составного input, который должен работать с `formControl`, `formControlName` и `ngModel`.

Методы:

- `writeValue(value)` — получить значение модели;
- `registerOnChange(fn)` — сохранить callback изменения;
- `registerOnTouched(fn)` — сохранить callback touched;
- `setDisabledState(isDisabled)` — синхронизировать disabled.

Контрол регистрируется через multi-provider `NG_VALUE_ACCESSOR`. Нельзя вызывать `onChange` из `writeValue`, иначе
возникнет feedback loop.





#### Вопрос: Как правильно реализовать disabled, touched и dirty в кастомном контроле?

**Короткий ответ**

Для составного контрола нужно определить, когда группа считается touched и какое значение считается атомарным.

**Полный ответ**

- `setDisabledState()` меняет доступность внутренних элементов.
- `onTouched()` вызывают при первом осмысленном blur/interaction.
- `onChange(value)` вызывают только при пользовательском изменении.
- `dirty` Angular устанавливает после `onChange`; вручную дублировать state обычно не нужно.
- Контрол должен сохранять keyboard navigation, label association и ARIA.

Для составного контрола нужно определить, когда группа считается touched и какое значение считается атомарным.





#### Вопрос: Как строить nested и reusable forms без лишних подписок?

**Короткий ответ**

Родитель может передать дочернему компоненту typed FormGroup, отдельные controls или доменную model. Дочерний reusable
control не должен искать родительскую форму через хрупкий DOM hierarchy без необходимости.

**Полный ответ**

Родитель может передать дочернему компоненту typed `FormGroup`, отдельные controls или доменную model. Дочерний reusable
control не должен искать родительскую форму через хрупкий DOM hierarchy без необходимости.

Derived validation и UI state лучше получать из control state или signals. Если нужна подписка на `valueChanges`,
используют `takeUntilDestroyed()`, `distinctUntilChanged()` и не создают одну подписку на каждую строку большого списка
без причины.
