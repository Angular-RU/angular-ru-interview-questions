# React — вопросы и ответы, часть 1

> Автоматически сгенерировано из src/pages/react/index.md. Не редактируйте вручную.

## React

### Зачем Angular-разработчику знать React



#### Вопрос: Зачем Angular-разработчику знать React?

**Короткий ответ**

React не заменяет Angular в этой подборке. Это соседняя модель UI, которую полезно понимать frontend-разработчику,
особенно если на интервью обсуждают не только Angular, но и архитектуру интерфейсов в целом.

**Полный ответ**

React не заменяет Angular в этой подборке. Это соседняя модель UI, которую полезно понимать frontend-разработчику,
особенно если на интервью обсуждают не только Angular, но и архитектуру интерфейсов в целом.

- React часто встречается в вакансиях и смежных командах.
- Даже если разработчик работает на Angular, полезно понимать другую модель UI и другой набор trade-offs.
- React помогает лучше понять state updates, immutability, controlled components и render как функцию от состояния.
- На архитектурных интервью могут спрашивать сравнение Angular и React.
- В enterprise-командах могут быть micro frontends, где часть приложений написана на Angular, а часть на React.
- Знание React помогает обсуждать trade-offs без фанатизма.



### Короткая карта Angular -> React



#### Вопрос: Как быстро сопоставить Angular-понятия с React?

**Короткий ответ**

Краткая суть раскрыта в полном ответе с кодом или практическим примером.

**Полный ответ**

| Angular                    | React                                 |
| -------------------------- | ------------------------------------- |
| `@Input()`                 | `props`                               |
| `@Output()`                | callback prop                         |
| template                   | JSX                                   |
| `@if` / `*ngIf`            | conditional rendering                 |
| `@for` / `*ngFor`          | `array.map()`                         |
| `trackBy`                  | `key`                                 |
| service + DI               | module function / hook / context      |
| `ngOnInit`                 | sometimes `useEffect`, but not always |
| Reactive Forms             | controlled / uncontrolled inputs      |
| Angular Router             | React Router                          |
| RxJS stream                | often Promise / hook / query library  |
| OnPush + immutable updates | React re-render + immutable state     |
| signals                    | state / derived values / memoization  |



### React Core



#### Вопрос: Что такое React component?

**Короткий ответ**

React component - это функция, которая возвращает JSX и описывает часть UI. Компонент получает входные данные через
props и может хранить локальное состояние через hooks.

**Полный ответ**

React component - это функция, которая возвращает JSX и описывает часть UI. Компонент получает входные данные через
props и может хранить локальное состояние через hooks.

```tsx
type TripCardProps = {
  title: string;
  country: string;
};

export function TripCard({title, country}: TripCardProps) {
  return (
    <article>
      <h3>{title}</h3>
      <p>{country}</p>
    </article>
  );
}
```





#### Вопрос: Что такое JSX?

**Короткий ответ**

JSX - это синтаксис, похожий на HTML внутри JavaScript или TypeScript. Он компилируется в вызовы React и позволяет
описывать UI рядом с логикой компонента.

**Полный ответ**

JSX - это синтаксис, похожий на HTML внутри JavaScript или TypeScript. Он компилируется в вызовы React и позволяет
описывать UI рядом с логикой компонента.





#### Вопрос: Что такое props?

**Короткий ответ**

Props - это входные данные компонента, практический аналог @Input() в Angular. Child component не должен менять props,
потому что они принадлежат parent component.

**Полный ответ**

Props - это входные данные компонента, практический аналог `@Input()` в Angular. Child component не должен менять props,
потому что они принадлежат parent component.





#### Вопрос: Как передать событие от child к parent?

**Короткий ответ**

Parent передает функцию через callback prop, а child вызывает ее в нужный момент. Это похоже на @Output(), но без
EventEmitter.

**Полный ответ**

Parent передает функцию через callback prop, а child вызывает ее в нужный момент. Это похоже на `@Output()`, но без
`EventEmitter`.

```tsx
type AddTripFormProps = {
  onAddTrip: (title: string) => void;
};
```





#### Вопрос: Как вывести список?

**Короткий ответ**

Обычно через array.map(). Для каждого элемента нужен стабильный key, чтобы React корректно сопоставлял элементы между
render-ами.

**Полный ответ**

Обычно через `array.map()`. Для каждого элемента нужен стабильный `key`, чтобы React корректно сопоставлял элементы
между render-ами.

```tsx
{
  trips.map((trip) => (
    <TripCard
      key={trip.id}
      title={trip.title}
      country={trip.country}
    />
  ));
}
```





#### Вопрос: Зачем нужен key?

**Короткий ответ**

key помогает React сопоставлять элементы между render-ами во время reconciliation. По смыслу это похоже на trackBy: ключ
нужен не для красоты, а для сохранения identity элемента.

**Полный ответ**

`key` помогает React сопоставлять элементы между render-ами во время reconciliation. По смыслу это похоже на `trackBy`:
ключ нужен не для красоты, а для сохранения identity элемента.



### State и rendering



#### Вопрос: Что такое state?

**Короткий ответ**

State - это данные компонента, изменение которых вызывает новый render. В function components state обычно создают через
useState.

**Полный ответ**

State - это данные компонента, изменение которых вызывает новый render. В function components state обычно создают через
`useState`.

```tsx
const [count, setCount] = useState(0);
```





#### Вопрос: Чем props отличаются от state?

**Короткий ответ**

Props приходят снаружи и принадлежат parent component. State принадлежит самому компоненту. Если данные должен менять
child, обычно parent передает callback.

**Полный ответ**

Props приходят снаружи и принадлежат parent component. State принадлежит самому компоненту. Если данные должен менять
child, обычно parent передает callback.





#### Вопрос: Что такое render в React?

**Короткий ответ**

Render - это вычисление UI для текущих props и state. Важно думать о render как о чистом описании: при одних и тех же
входных данных компонент должен вернуть один и тот же UI.

**Полный ответ**

Render - это вычисление UI для текущих props и state. Важно думать о render как о чистом описании: при одних и тех же
входных данных компонент должен вернуть один и тот же UI.





#### Вопрос: Почему state считается snapshot?

**Короткий ответ**

Во время render-а значение state фиксировано. Если внутри одного обработчика написать несколько обновлений на основе
переменной count, все они видят один и тот же snapshot.

**Полный ответ**

Во время render-а значение state фиксировано. Если внутри одного обработчика написать несколько обновлений на основе
переменной `count`, все они видят один и тот же snapshot.

```tsx
const [count, setCount] = useState(0);

setCount(count + 1);
setCount(count + 1);
setCount(count + 1);
```

Если `count` был `0`, результат может быть `1`, а не `3`: каждое обновление ставит значение `1`, потому что читает тот
же snapshot `count`.





#### Вопрос: Когда использовать functional updater в setState?

**Короткий ответ**

Когда новое состояние зависит от предыдущего. Updater получает актуальное промежуточное значение, поэтому серия
обновлений работает предсказуемо.

**Полный ответ**

Когда новое состояние зависит от предыдущего. Updater получает актуальное промежуточное значение, поэтому серия
обновлений работает предсказуемо.

```tsx
setCount((current) => current + 1);
setCount((current) => current + 1);
setCount((current) => current + 1);
```

Такой код увеличит счетчик на `3`, потому что каждый updater применяется к результату предыдущего updater-а.





#### Вопрос: Как batching влияет на обновления state?

**Короткий ответ**

React может группировать несколько state updates в один render, чтобы не перерисовывать UI после каждого setter-а.
Batching не означает, что state мутируется сразу. Setter планирует обновление, а компонент получает новое значение на
следующем render-е.

**Полный ответ**

React может группировать несколько state updates в один render, чтобы не перерисовывать UI после каждого setter-а.
Batching не означает, что state мутируется сразу. Setter планирует обновление, а компонент получает новое значение на
следующем render-е.





#### Вопрос: Почему нельзя писать count++ и ждать корректный render?

**Короткий ответ**

count++ меняет локальную переменную из текущего render snapshot, но не сообщает React о новом состоянии. React не
узнает, что нужно сделать render. Состояние нужно обновлять через setter.

**Полный ответ**

`count++` меняет локальную переменную из текущего render snapshot, но не сообщает React о новом состоянии. React не
узнает, что нужно сделать render. Состояние нужно обновлять через setter.





#### Вопрос: Чем immutable update отличается от прямой мутации?

**Короткий ответ**

Прямая мутация меняет объект или массив на месте, но React сравнивает ссылки и планирует render через setter. Поэтому
массивы и объекты в state обновляют иммутабельно.

**Полный ответ**

Прямая мутация меняет объект или массив на месте, но React сравнивает ссылки и планирует render через setter. Поэтому
массивы и объекты в state обновляют иммутабельно.

```tsx
setTrips((current) => [...current, newTrip]);
```

В Angular signals похожая идея: лучше обновлять значение через `set` / `update` и возвращать новую ссылку для объектов и
массивов. В React роль явного входа в обновление выполняет setter из `useState`.





#### Вопрос: Как отфильтровать список без мутации?

**Короткий ответ**

filter возвращает новый массив и не меняет исходный state.

**Полный ответ**

`filter` возвращает новый массив и не меняет исходный state.

```tsx
const visibleTrips = trips.filter((trip) => trip.country.toLowerCase().includes(query.toLowerCase()));
```



### Hooks



#### Вопрос: Что такое hook?

**Короткий ответ**

Hook - это функция React, которая позволяет component или custom hook использовать state, effects, context и другие
возможности React. Hooks вызывают только на верхнем уровне component или другого hook.

**Полный ответ**

Hook - это функция React, которая позволяет component или custom hook использовать state, effects, context и другие
возможности React. Hooks вызывают только на верхнем уровне component или другого hook.





#### Вопрос: Что такое useEffect и когда он не нужен?

**Короткий ответ**

useEffect запускает side effect после render-а: подписку, запрос, синхронизацию с внешней системой, работу с DOM API. Он
не нужен для обычных вычислений, которые можно сделать во время render-а.

**Полный ответ**

`useEffect` запускает side effect после render-а: подписку, запрос, синхронизацию с внешней системой, работу с DOM API.
Он не нужен для обычных вычислений, которые можно сделать во время render-а.





#### Вопрос: Что такое custom hook?

**Короткий ответ**

Custom hook - это функция, которая выносит reusable stateful logic из компонентов. Это не сервис Angular один к одному:
hook живет в React-дереве и подчиняется правилам hooks.

**Полный ответ**

Custom hook - это функция, которая выносит reusable stateful logic из компонентов. Это не сервис Angular один к одному:
hook живет в React-дереве и подчиняется правилам hooks.

```tsx
function useTrips() {
  const [trips, setTrips] = useState<Trip[]>([]);

  return {
    trips,
    setTrips,
  };
}
```





#### Вопрос: Чем useEffect(..., []) похож и не похож на ngOnInit?

**Короткий ответ**

Похож тем, что часто запускается один раз после первого render-а. Не похож тем, что useEffect завязан на render и
dependency array, а не на class lifecycle. В React многие вещи, которые Angular-разработчик положил бы в ngOnInit, лучше
вычислить прямо в render или вынести в hook.

**Полный ответ**

Похож тем, что часто запускается один раз после первого render-а. Не похож тем, что `useEffect` завязан на render и
dependency array, а не на class lifecycle. В React многие вещи, которые Angular-разработчик положил бы в `ngOnInit`,
лучше вычислить прямо в render или вынести в hook.





#### Вопрос: Как отменять fetch в useEffect?

**Короткий ответ**

Через AbortController и cleanup function.

**Полный ответ**

Через `AbortController` и cleanup function.

```tsx
useEffect(() => {
  const controller = new AbortController();

  fetch('/api/trips', {signal: controller.signal});

  return () => controller.abort();
}, []);
```



### Forms



#### Вопрос: Что такое controlled input?

**Короткий ответ**

Controlled input - это input, значение которого хранится в React state и обновляется через onChange.

**Полный ответ**

Controlled input - это input, значение которого хранится в React state и обновляется через `onChange`.

```tsx
const [title, setTitle] = useState('');

<input
  value={title}
  onChange={(event) => setTitle(event.target.value)}
/>;
```





#### Вопрос: Чем controlled forms отличаются от Angular Reactive Forms?

**Короткий ответ**

В Angular Reactive Forms есть отдельная модель формы: FormControl, FormGroup, validators, status, touched, dirty. В
React controlled form часто начинается с обычного state и обработчиков. Для сложных форм обычно берут React Hook Form
или другую form library.

**Полный ответ**

В Angular Reactive Forms есть отдельная модель формы: `FormControl`, `FormGroup`, validators, status, touched, dirty. В
React controlled form часто начинается с обычного state и обработчиков. Для сложных форм обычно берут React Hook Form
или другую form library.





#### Вопрос: Какие частые ошибки бывают при работе с forms в React?

**Короткий ответ**

Делать каждый field controlled без причины в большой форме и получать лишнюю сложность. - Мутировать объект формы
напрямую. - Держать validation rules вперемешку с разметкой, когда форма уже стала сложной. - Не различать submit state,
validation state и server error.

**Полный ответ**

- Делать каждый field controlled без причины в большой форме и получать лишнюю сложность.
- Мутировать объект формы напрямую.
- Держать validation rules вперемешку с разметкой, когда форма уже стала сложной.
- Не различать submit state, validation state и server error.



### Data fetching



#### Вопрос: Как организовать data fetching?

**Короткий ответ**

Для маленького примера достаточно useEffect + fetch. В приложении с cache, refetch, retry и синхронизацией server state
чаще используют TanStack Query или похожую библиотеку.

**Полный ответ**

Для маленького примера достаточно `useEffect + fetch`. В приложении с cache, refetch, retry и синхронизацией server
state чаще используют TanStack Query или похожую библиотеку.





#### Вопрос: Чем server state отличается от client state?

**Короткий ответ**

Server state приходит с сервера, может устаревать, требует cache, refetch и обработки loading/error. Client state
принадлежит UI: открытая панель, текущий фильтр, выбранная вкладка, локальный draft.

**Полный ответ**

Server state приходит с сервера, может устаревать, требует cache, refetch и обработки loading/error. Client state
принадлежит UI: открытая панель, текущий фильтр, выбранная вкладка, локальный draft.





#### Вопрос: Где хранить loading, error и empty?

**Короткий ответ**

Рядом с источником данных. Если запрос локальный для страницы, можно держать state в hook страницы. Если данные
переиспользуются, лучше вынести загрузку в custom hook или query layer.

**Полный ответ**

Рядом с источником данных. Если запрос локальный для страницы, можно держать state в hook страницы. Если данные
переиспользуются, лучше вынести загрузку в custom hook или query layer.



### Routing



#### Вопрос: Как React Router отличается от Angular Router?

**Короткий ответ**

Angular Router - часть Angular platform, он тесно связан с DI, guards, resolvers и lazy loading. React Router -
отдельная библиотека для client-side routing. Ее выбирают и настраивают отдельно от React.

**Полный ответ**

Angular Router - часть Angular platform, он тесно связан с DI, guards, resolvers и lazy loading. React Router -
отдельная библиотека для client-side routing. Ее выбирают и настраивают отдельно от React.

```tsx
createBrowserRouter([
  {path: '/trips', element: <TripsPage />},
  {path: '/trips/new', element: <NewTripPage />},
  {path: '/trips/:tripId', element: <TripDetailsPage />},
]);
```



### Context и state management



#### Вопрос: Когда нужен Context?

**Короткий ответ**

Context нужен, когда значение нужно передать глубоко по дереву без prop drilling: theme, locale, текущий пользователь,
настройки приложения. Это ближе к scoped provider, чем к полноценному store.

**Полный ответ**

Context нужен, когда значение нужно передать глубоко по дереву без prop drilling: theme, locale, текущий пользователь,
настройки приложения. Это ближе к scoped provider, чем к полноценному store.





#### Вопрос: Почему Context не всегда замена state manager?

**Короткий ответ**

Context решает передачу значения, но не дает из коробки нормализованную модель данных, devtools, middleware, cache,
optimistic updates или granular subscriptions. Для сложного client state чаще смотрят на Redux Toolkit или Zustand, а
для server state - на TanStack Query.

**Полный ответ**

Context решает передачу значения, но не дает из коробки нормализованную модель данных, devtools, middleware, cache,
optimistic updates или granular subscriptions. Для сложного client state чаще смотрят на Redux Toolkit или Zustand, а
для server state - на TanStack Query.





#### Вопрос: Как сравнить Angular DI и React Context?

**Короткий ответ**

Angular DI создает и резолвит зависимости по injector tree, умеет работать с class services, tokens и providers. React
Context передает value через component tree. В Context можно положить service-like object, но lifecycle и границы будут
React-овыми.

**Полный ответ**

Angular DI создает и резолвит зависимости по injector tree, умеет работать с class services, tokens и providers. React
Context передает value через component tree. В Context можно положить service-like object, но lifecycle и границы будут
React-овыми.



### Отличия React от Angular



#### Вопрос: Чем props отличаются от @Input()?

**Короткий ответ**

Обе механики передают данные сверху вниз. В Angular @Input() является частью component metadata и change detection
контракта. В React props - обычный объект аргументов component function.

**Полный ответ**

Обе механики передают данные сверху вниз. В Angular `@Input()` является частью component metadata и change detection
контракта. В React props - обычный объект аргументов component function.





#### Вопрос: Чем React component отличается от Angular component?

**Короткий ответ**

В React это чаще function + JSX + hooks. В Angular - class + metadata + template + DI. React component обычно ближе к
функции отображения, а Angular component встроен в более широкий framework lifecycle.

**Полный ответ**

В React это чаще function + JSX + hooks. В Angular - class + metadata + template + DI. React component обычно ближе к
функции отображения, а Angular component встроен в более широкий framework lifecycle.





#### Вопрос: Чем callback prop отличается от @Output()?

**Короткий ответ**

@Output() обычно основан на EventEmitter или output API Angular. В React parent передает функцию, child вызывает ее. Это
проще механически, но требует дисциплины в именовании и направлении data flow.

**Полный ответ**

`@Output()` обычно основан на `EventEmitter` или output API Angular. В React parent передает функцию, child вызывает ее.
Это проще механически, но требует дисциплины в именовании и направлении data flow.





#### Вопрос: Чем useEffect отличается от lifecycle hooks?

**Короткий ответ**

Lifecycle hooks Angular привязаны к lifecycle class component/directive. useEffect описывает синхронизацию с внешним
миром после render-а и повторяется при изменении dependencies. Он не является полным аналогом ngOnInit.

**Полный ответ**

Lifecycle hooks Angular привязаны к lifecycle class component/directive. `useEffect` описывает синхронизацию с внешним
миром после render-а и повторяется при изменении dependencies. Он не является полным аналогом `ngOnInit`.





#### Вопрос: Почему в React нельзя мутировать state напрямую?

**Короткий ответ**

React должен получить новое значение через setter, чтобы запланировать render. При мутации на месте ссылка может
остаться той же, а UI и memoization начнут вести себя непредсказуемо.

**Полный ответ**

React должен получить новое значение через setter, чтобы запланировать render. При мутации на месте ссылка может
остаться той же, а UI и memoization начнут вести себя непредсказуемо.





#### Вопрос: Почему Angular-разработчику важно не пытаться писать React как Angular?

**Короткий ответ**

Если переносить Angular-привычки напрямую, можно получить лишние service abstractions, неуместный Context, effects для
обычных вычислений и тяжелые формы без нужды. Лучше принять React-модель: props down, callbacks up, immutable state,
hooks для reusable UI logic.

**Полный ответ**

Если переносить Angular-привычки напрямую, можно получить лишние service abstractions, неуместный Context, effects для
обычных вычислений и тяжелые формы без нужды. Лучше принять React-модель: props down, callbacks up, immutable state,
hooks для reusable UI logic.





#### Вопрос: React - это framework или library?

**Короткий ответ**

React чаще называют library для UI layer. Он помогает описывать component tree и rendering, но routing, forms, HTTP,
state management и project architecture выбираются отдельно. Angular дает больше решений из коробки: router, forms, DI,
HTTP integration, CLI conventions.

**Полный ответ**

React чаще называют library для UI layer. Он помогает описывать component tree и rendering, но routing, forms, HTTP,
state management и project architecture выбираются отдельно. Angular дает больше решений из коробки: router, forms, DI,
HTTP integration, CLI conventions.





#### Вопрос: Чем React Context отличается от Angular DI?

**Короткий ответ**

Context передает конкретное значение через React tree. Angular DI резолвит зависимости через injectors и tokens. DI
лучше подходит для сервисов и инфраструктурных зависимостей, Context - для значений, связанных с UI-деревом.

**Полный ответ**

Context передает конкретное значение через React tree. Angular DI резолвит зависимости через injectors и tokens. DI
лучше подходит для сервисов и инфраструктурных зависимостей, Context - для значений, связанных с UI-деревом.





#### Вопрос: Чем React forms отличаются от Angular Reactive Forms?

**Короткий ответ**

React не дает встроенной формы уровня Angular Reactive Forms. Можно собрать controlled inputs на state, использовать
uncontrolled inputs или взять библиотеку. В Angular Reactive Forms модель формы является частью framework API.

**Полный ответ**

React не дает встроенной формы уровня Angular Reactive Forms. Можно собрать controlled inputs на state, использовать
uncontrolled inputs или взять библиотеку. В Angular Reactive Forms модель формы является частью framework API.





#### Вопрос: Что важно учесть при выборе React Router после Angular Router?

**Короткий ответ**

React Router - отдельный выбор стека. Angular Router - официальный router с guards, resolvers, DI и lazy loading как
частью Angular architecture.

**Полный ответ**

React Router - отдельный выбор стека. Angular Router - официальный router с guards, resolvers, DI и lazy loading как
частью Angular architecture.





#### Вопрос: Чем React state отличается от Angular signals?

**Короткий ответ**

React state обновляется setter-ом и вызывает render component subtree. Angular signals хранят reactive value и точнее
связывают чтения с зависимостями. В обоих случаях важно не мутировать объекты незаметно.

**Полный ответ**

React state обновляется setter-ом и вызывает render component subtree. Angular signals хранят reactive value и точнее
связывают чтения с зависимостями. В обоих случаях важно не мутировать объекты незаметно.





#### Вопрос: Почему React-приложения чаще имеют больше вариантов архитектуры?

**Короткий ответ**

React намеренно покрывает меньше слоев. Команда сама выбирает router, data fetching, forms, state manager, styling и SSR
framework. Это гибко, но требует явных соглашений.

**Полный ответ**

React намеренно покрывает меньше слоев. Команда сама выбирает router, data fetching, forms, state manager, styling и SSR
framework. Это гибко, но требует явных соглашений.



### Разные React-стеки



#### Вопрос: Какие технологии чаще встречаются вокруг React?

**Короткий ответ**

React сам по себе закрывает UI layer, поэтому вокруг него команда выбирает router, data fetching, forms, styling,
testing, auth, hosting и иногда fullstack framework. Это не список библиотек для заучивания. На интервью важнее
объяснить, какие требования продукта влияют на выбор и чем этот подход отличается от Angular platform.

**Полный ответ**

React сам по себе закрывает UI layer, поэтому вокруг него команда выбирает router, data fetching, forms, styling,
testing, auth, hosting и иногда fullstack framework. Это не список библиотек для заучивания. На интервью важнее
объяснить, какие требования продукта влияют на выбор и чем этот подход отличается от Angular platform.



### Выбор React-стека



#### Вопрос: Почему в React нужно выбирать больше библиотек, чем в Angular?

**Короткий ответ**

Angular - framework с большим количеством официальных решений: router, forms, DI, HTTP integration, CLI conventions.
React чаще является UI library, вокруг которой команда собирает стек. Поэтому в React-интервью часто спрашивают не
только React Core, но и routing, server state, forms, styling, testing, SSR, auth и hosting.

**Полный ответ**

Angular - framework с большим количеством официальных решений: router, forms, DI, HTTP integration, CLI conventions.
React чаще является UI library, вокруг которой команда собирает стек. Поэтому в React-интервью часто спрашивают не
только React Core, но и routing, server state, forms, styling, testing, SSR, auth и hosting.





#### Вопрос: Какие решения Angular дает из коробки, а React оставляет команде?

**Короткий ответ**

Angular дает официальный router, forms API, DI, HttpClient, CLI, application builder и opinionated project structure. В
React обычно отдельно выбирают React Router или framework router, TanStack Query или другой data layer, form library,
styling strategy, test stack и deployment model.

**Полный ответ**

Angular дает официальный router, forms API, DI, HttpClient, CLI, application builder и opinionated project structure. В
React обычно отдельно выбирают React Router или framework router, TanStack Query или другой data layer, form library,
styling strategy, test stack и deployment model.





#### Вопрос: Почему это одновременно плюс и минус?

**Короткий ответ**

Плюс в том, что можно подобрать стек под продукт: SPA, content site, dashboard, fullstack app или mobile. Минус в том,
что команда должна принимать больше архитектурных решений и поддерживать их consistency. Без соглашений React-проект
быстро превращается в набор локальных предпочтений.

**Полный ответ**

Плюс в том, что можно подобрать стек под продукт: SPA, content site, dashboard, fullstack app или mobile. Минус в том,
что команда должна принимать больше архитектурных решений и поддерживать их consistency. Без соглашений React-проект
быстро превращается в набор локальных предпочтений.





#### Вопрос: Как отвечать на интервью, если спрашивают "какой React-стек выбрать"?

**Короткий ответ**

Начните с требований: SPA или SSR, SEO, сложность форм, объем server state, дизайн-система, уровень команды, monorepo,
deployment target, accessibility и testing. Хороший ответ не называет одну любимую библиотеку, а показывает критерии
выбора и trade-offs.

**Полный ответ**

Начните с требований: SPA или SSR, SEO, сложность форм, объем server state, дизайн-система, уровень команды, monorepo,
deployment target, accessibility и testing. Хороший ответ не называет одну любимую библиотеку, а показывает критерии
выбора и trade-offs.





#### Вопрос: Почему Angular-разработчику важно понимать React ecosystem?

**Короткий ответ**

Даже без перехода на React это помогает обсуждать micro frontends, shared design systems, hiring, architecture reviews и
frontend platform decisions. Angular-разработчику важно понимать, где Angular дает встроенный контракт, а где React
команда создает контракт сама.

**Полный ответ**

Даже без перехода на React это помогает обсуждать micro frontends, shared design systems, hiring, architecture reviews и
frontend platform decisions. Angular-разработчику важно понимать, где Angular дает встроенный контракт, а где React
команда создает контракт сама.



### Старт проекта



#### Вопрос: Как выбрать старт проекта?

**Короткий ответ**

Краткая суть раскрыта в полном ответе с кодом или практическим примером.

**Полный ответ**

| Ситуация                                           | Подход                      |
| -------------------------------------------------- | --------------------------- |
| SPA, админка, internal app                         | Vite + React + TypeScript   |
| SSR, SSG, SEO, fullstack routing                   | Next.js                     |
| Content/static site с минимумом JS                 | Astro                       |
| Type-safe fullstack routing вокруг TanStack Router | TanStack Start              |
| Router с loaders/actions и framework mode          | React Router framework mode |





#### Вопрос: Когда выбрать Vite + React + TypeScript?

**Короткий ответ**

Когда нужен быстрый SPA-проект: админка, внутренний интерфейс, кабинет, прототип или учебный проект. Vite дает простой
dev server и build setup, но не решает SSR, file-based routing и backend-задачи сам по себе.

**Полный ответ**

Когда нужен быстрый SPA-проект: админка, внутренний интерфейс, кабинет, прототип или учебный проект. Vite дает простой
dev server и build setup, но не решает SSR, file-based routing и backend-задачи сам по себе.





#### Вопрос: Когда выбрать Next.js?

**Короткий ответ**

Next.js подходит, когда важны SSR, SSG, SEO, file-based routing, server-side data fetching или fullstack-подход в одном
репозитории. В отличие от Vite SPA, это framework вокруг React со своими routing, cache и deployment trade-offs.

**Полный ответ**

Next.js подходит, когда важны SSR, SSG, SEO, file-based routing, server-side data fetching или fullstack-подход в одном
репозитории. В отличие от Vite SPA, это framework вокруг React со своими routing, cache и deployment trade-offs.





#### Вопрос: Чем Next.js отличается от Vite SPA?

**Короткий ответ**

Vite SPA обычно рендерит приложение на клиенте и требует отдельного решения для routing/data/backend. Next.js добавляет
server rendering, file-based routing, server components и server functions. Это больше возможностей, но и больше
framework-specific правил.

**Полный ответ**

Vite SPA обычно рендерит приложение на клиенте и требует отдельного решения для routing/data/backend. Next.js добавляет
server rendering, file-based routing, server components и server functions. Это больше возможностей, но и больше
framework-specific правил.





#### Вопрос: Когда может подойти Astro?

**Короткий ответ**

Astro уместен для content-heavy и static сайтов, где важно доставлять минимум JavaScript. React-компоненты можно
использовать точечно как islands, но приложение не обязано становиться полноценной React SPA.

**Полный ответ**

Astro уместен для content-heavy и static сайтов, где важно доставлять минимум JavaScript. React-компоненты можно
использовать точечно как islands, но приложение не обязано становиться полноценной React SPA.





#### Вопрос: Почему React fundamentals все равно нужны, даже если проект на Next.js?

**Короткий ответ**

Next.js добавляет routing, server rendering, cache и fullstack conventions, но компоненты, props, state, hooks, events,
keys и composition остаются React. Без React fundamentals разработчик будет путать framework-specific правила с базовой
моделью UI.

**Полный ответ**

Next.js добавляет routing, server rendering, cache и fullstack conventions, но компоненты, props, state, hooks, events,
keys и composition остаются React. Без React fundamentals разработчик будет путать framework-specific правила с базовой
моделью UI.





#### Вопрос: Что такое TanStack Start?

**Короткий ответ**

TanStack Start - fullstack framework из TanStack ecosystem вокруг TanStack Router. Его обычно рассматривают, когда
команде важны type-safe routing, loaders и интеграция с TanStack Query без перехода в Next.js-модель.

**Полный ответ**

TanStack Start - fullstack framework из TanStack ecosystem вокруг TanStack Router. Его обычно рассматривают, когда
команде важны type-safe routing, loaders и интеграция с TanStack Query без перехода в Next.js-модель.





#### Вопрос: Чем React Router library mode отличается от framework mode?

**Короткий ответ**

В library mode React Router - это router для client-side navigation внутри приложения. В framework mode он становится
ближе к application framework: появляются file routes, loaders, actions, server rendering и conventions вокруг данных.

**Полный ответ**

В library mode React Router - это router для client-side navigation внутри приложения. В framework mode он становится
ближе к application framework: появляются file routes, loaders, actions, server rendering и conventions вокруг данных.



### Package manager и monorepo



#### Вопрос: Чем npm, pnpm и Bun отличаются на уровне выбора для проекта?

**Короткий ответ**

npm - самый стандартный и предсказуемый выбор. pnpm часто выбирают за скорость, строгую модель зависимостей и экономию
места. Bun - более широкий toolchain, но перед выбором нужно оценить зрелость, совместимость и CI/deployment.

**Полный ответ**

`npm` - самый стандартный и предсказуемый выбор. `pnpm` часто выбирают за скорость, строгую модель зависимостей и
экономию места. Bun - более широкий toolchain, но перед выбором нужно оценить зрелость, совместимость и CI/deployment.





#### Вопрос: Когда достаточно npm?

**Короткий ответ**

Когда проект небольшой, команда не упирается в скорость install, нет сложного monorepo и важна максимальная
предсказуемость окружения. Для интервью это нормальный boring default, а не признак слабого стека.

**Полный ответ**

Когда проект небольшой, команда не упирается в скорость install, нет сложного monorepo и важна максимальная
предсказуемость окружения. Для интервью это нормальный boring default, а не признак слабого стека.





#### Вопрос: Когда pnpm может быть лучше?

**Короткий ответ**

pnpm хорош для monorepo, больших dependency trees и команд, где важны быстрые install и строгая проверка неявных
зависимостей. Angular-разработчику это обычно понятно через workspace-мышление и shared tooling.

**Полный ответ**

`pnpm` хорош для monorepo, больших dependency trees и команд, где важны быстрые install и строгая проверка неявных
зависимостей. Angular-разработчику это обычно понятно через workspace-мышление и shared tooling.





#### Вопрос: Когда нужен monorepo?

**Короткий ответ**

Когда несколько приложений и библиотек должны вместе версионироваться, переиспользовать design tokens, shared UI, domain
logic или tooling. Если в репозитории один маленький app, monorepo может добавить лишнюю сложность.

**Полный ответ**

Когда несколько приложений и библиотек должны вместе версионироваться, переиспользовать design tokens, shared UI, domain
logic или tooling. Если в репозитории один маленький app, monorepo может добавить лишнюю сложность.





#### Вопрос: Чем Turborepo отличается от Nx?

**Короткий ответ**

Turborepo чаще воспринимается как task pipeline и cache для JS/TS monorepo. Nx - более полноценная monorepo platform с
project graph, generators, affected commands и сильной историей в Angular. Поэтому Angular-разработчику часто проще
понять Nx в mixed Angular + React workspace.

**Полный ответ**

Turborepo чаще воспринимается как task pipeline и cache для JS/TS monorepo. Nx - более полноценная monorepo platform с
project graph, generators, affected commands и сильной историей в Angular. Поэтому Angular-разработчику часто проще
понять Nx в mixed Angular + React workspace.





#### Вопрос: Какие риски есть у monorepo?

**Короткий ответ**

Риски: медленный CI без affected/cache, неясные boundaries, случайные зависимости между features, сложный ownership и
обновления tooling. Monorepo полезен только тогда, когда команда реально поддерживает правила архитектуры.

**Полный ответ**

Риски: медленный CI без affected/cache, неясные boundaries, случайные зависимости между features, сложный ownership и
обновления tooling. Monorepo полезен только тогда, когда команда реально поддерживает правила архитектуры.



### Routing и fullstack frameworks



#### Вопрос: Что выбрать для routing и fullstack?

**Короткий ответ**

Краткая суть раскрыта в полном ответе с кодом или практическим примером.

**Полный ответ**

| Ситуация                                     | Подход                      |
| -------------------------------------------- | --------------------------- |
| Обычная SPA-навигация                        | React Router library mode   |
| Type-safe routes и loaders                   | TanStack Router             |
| SSR/SSG, SEO, App Router                     | Next.js                     |
| Loaders/actions/server rendering без Next.js | React Router framework mode |
| Content site с островами интерактива         | Astro                       |





#### Вопрос: Что такое client-side routing?

**Короткий ответ**

Это навигация, где URL меняется без полной перезагрузки страницы, а React перерисовывает нужный route на клиенте. Для
SPA это привычная модель, но SEO, initial load и data fetching нужно продумывать отдельно.

**Полный ответ**

Это навигация, где URL меняется без полной перезагрузки страницы, а React перерисовывает нужный route на клиенте. Для
SPA это привычная модель, но SEO, initial load и data fetching нужно продумывать отдельно.





#### Вопрос: Что такое file-based routing?

**Короткий ответ**

Это подход, где структура файлов определяет routes. Он привычен в Next.js и некоторых fullstack/framework режимах:
меньше ручной конфигурации, но больше зависимости от conventions конкретного framework.

**Полный ответ**

Это подход, где структура файлов определяет routes. Он привычен в Next.js и некоторых fullstack/framework режимах:
меньше ручной конфигурации, но больше зависимости от conventions конкретного framework.





#### Вопрос: Что такое loader/action подход?

**Короткий ответ**

Loader загружает данные для route, action обрабатывает mutation или form submission. Это похоже на route-level contract:
данные и навигация проектируются вместе, а не размазываются по useEffect в компонентах.

**Полный ответ**

Loader загружает данные для route, action обрабатывает mutation или form submission. Это похоже на route-level contract:
данные и навигация проектируются вместе, а не размазываются по `useEffect` в компонентах.





#### Вопрос: Что такое React Server Components?

**Короткий ответ**

React Server Components позволяют части component tree выполняться на сервере и не попадать в client bundle. Это мощно
для data fetching и bundle size, но требует понимать границы server/client code, cache, serialization и ограничения
framework-а.

**Полный ответ**

React Server Components позволяют части component tree выполняться на сервере и не попадать в client bundle. Это мощно
для data fetching и bundle size, но требует понимать границы server/client code, cache, serialization и ограничения
framework-а.





#### Вопрос: Какие риски у RSC для команды?

**Короткий ответ**

Риски: новая mental model, путаница server/client boundaries, framework lock-in, сложнее debugging и миграции. Перед
выбором важно понять, есть ли реальные требования к SSR, SEO, cache и bundle size.

**Полный ответ**

Риски: новая mental model, путаница server/client boundaries, framework lock-in, сложнее debugging и миграции. Перед
выбором важно понять, есть ли реальные требования к SSR, SEO, cache и bundle size.





#### Вопрос: Чем React Router отличается от Angular Router?

**Короткий ответ**

Angular Router - официальный router framework-а с DI, guards, resolvers и lazy loading. React Router - отдельная
библиотека или framework mode, которую команда подключает и настраивает отдельно от React Core.

**Полный ответ**

Angular Router - официальный router framework-а с DI, guards, resolvers и lazy loading. React Router - отдельная
библиотека или framework mode, которую команда подключает и настраивает отдельно от React Core.





#### Вопрос: Что такое SSR и hydration?

**Короткий ответ**

SSR рендерит HTML на сервере, чтобы пользователь и поисковик раньше получили содержимое. Hydration подключает React на
клиенте к уже полученному HTML. Риски начинаются, когда server HTML и первый client render не совпадают.

**Полный ответ**

SSR рендерит HTML на сервере, чтобы пользователь и поисковик раньше получили содержимое. Hydration подключает React на
клиенте к уже полученному HTML. Риски начинаются, когда server HTML и первый client render не совпадают.





#### Вопрос: Что спросить у команды перед выбором React Router, TanStack Router или Next.js?

**Короткий ответ**

Нужны ли SSR/SSG, SEO, route-level data loading, type-safe routes, server functions, file-based routing и какой
deployment target. Если нужен только client-side routing, framework может быть лишним; если нужен fullstack rendering,
обычной router library может не хватить.

**Полный ответ**

Нужны ли SSR/SSG, SEO, route-level data loading, type-safe routes, server functions, file-based routing и какой
deployment target. Если нужен только client-side routing, framework может быть лишним; если нужен fullstack rendering,
обычной router library может не хватить.



### State management



#### Вопрос: Как выбрать state management?

**Короткий ответ**

Краткая суть раскрыта в полном ответе с кодом или практическим примером.

**Полный ответ**

| Ситуация                                     | Подход              |
| -------------------------------------------- | ------------------- |
| Local UI state                               | `useState`          |
| Несколько связанных transitions              | `useReducer`        |
| Theme, locale, current user value            | Context             |
| Shared client state без большого boilerplate | Zustand             |
| Сложный client state, debug flow, middleware | Redux Toolkit       |
| Server state                                 | TanStack Query      |
| Filters, pagination, tabs в URL              | query params / nuqs |
| Явная state machine                          | XState              |





#### Вопрос: Когда достаточно useState?

**Короткий ответ**

Когда состояние локально для одного компонента или небольшой ветки: открыта модалка, выбран tab, текст input. Если state
не нужен другим distant features, не стоит сразу добавлять global store.

**Полный ответ**

Когда состояние локально для одного компонента или небольшой ветки: открыта модалка, выбран tab, текст input. Если state
не нужен другим distant features, не стоит сразу добавлять global store.





#### Вопрос: Когда нужен useReducer?

**Короткий ответ**

Когда обновления связаны правилами и transitions становятся важнее отдельных setters: wizard, сложный фильтр, локальная
state machine. Это не замена Redux, а способ сделать локальные изменения предсказуемее.

**Полный ответ**

Когда обновления связаны правилами и transitions становятся важнее отдельных setters: wizard, сложный фильтр, локальная
state machine. Это не замена Redux, а способ сделать локальные изменения предсказуемее.





#### Вопрос: Когда выбрать Redux Toolkit, Zustand, Jotai или XState?

**Короткий ответ**

Redux Toolkit подходит для сложного shared client state, strict conventions и devtools. Zustand проще для небольшого
shared state. Jotai может быть удобен для atom-based модели. XState стоит брать, когда домен естественно описывается
состояниями и переходами.

**Полный ответ**

Redux Toolkit подходит для сложного shared client state, strict conventions и devtools. Zustand проще для небольшого
shared state. Jotai может быть удобен для atom-based модели. XState стоит брать, когда домен естественно описывается
состояниями и переходами.





#### Вопрос: Почему filters/pagination/tabs иногда лучше хранить в URL?

**Короткий ответ**

URL state можно шарить ссылкой, восстанавливать после reload и использовать в browser history. Для React есть обычные
query params и специализированные helpers вроде nuqs; в Angular похожая идея живет в Router query params.

**Полный ответ**

URL state можно шарить ссылкой, восстанавливать после reload и использовать в browser history. Для React есть обычные
query params и специализированные helpers вроде `nuqs`; в Angular похожая идея живет в Router query params.





#### Вопрос: Чем React state management отличается от Angular services + RxJS/signals?

**Короткий ответ**

В Angular shared state часто живет в injectable services и опирается на RxJS или signals. В React shared state обычно
собирается из hooks, Context, store libraries и query layer. Главное в обоих мирах - разделять local UI state, server
state, URL state и domain transitions.

**Полный ответ**

В Angular shared state часто живет в injectable services и опирается на RxJS или signals. В React shared state обычно
собирается из hooks, Context, store libraries и query layer. Главное в обоих мирах - разделять local UI state, server
state, URL state и domain transitions.
