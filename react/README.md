# React для Angular-разработчика

## Зачем Angular-разработчику знать React

<details>
<summary>Зачем Angular-разработчику знать React?</summary><br>
<table><tr><td>

React не заменяет Angular в этой подборке. Это соседняя модель UI, которую полезно понимать frontend-разработчику,
особенно если на интервью обсуждают не только Angular, но и архитектуру интерфейсов в целом.

- React часто встречается в вакансиях и смежных командах.
- Даже если разработчик работает на Angular, полезно понимать другую модель UI и другой набор trade-offs.
- React помогает лучше понять state updates, immutability, controlled components и render как функцию от состояния.
- На архитектурных интервью могут спрашивать сравнение Angular и React.
- В enterprise-командах могут быть micro frontends, где часть приложений написана на Angular, а часть на React.
- Знание React помогает обсуждать trade-offs без фанатизма.

</td></tr></table>

</details>

## Короткая карта Angular -> React

<details>
<summary>Как быстро сопоставить Angular-понятия с React?</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>

## React Core

<details>
<summary>Что такое React component?</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>

<details>
<summary>Что такое JSX?</summary><br>
<table><tr><td>

JSX - это синтаксис, похожий на HTML внутри JavaScript или TypeScript. Он компилируется в вызовы React и позволяет
описывать UI рядом с логикой компонента.

</td></tr></table>

</details>

<details>
<summary>Что такое props?</summary><br>
<table><tr><td>

Props - это входные данные компонента, практический аналог `@Input()` в Angular. Child component не должен менять props,
потому что они принадлежат parent component.

</td></tr></table>

</details>

<details>
<summary>Как передать событие от child к parent?</summary><br>
<table><tr><td>

Parent передает функцию через callback prop, а child вызывает ее в нужный момент. Это похоже на `@Output()`, но без
`EventEmitter`.

```tsx
type AddTripFormProps = {
  onAddTrip: (title: string) => void;
};
```

</td></tr></table>

</details>

<details>
<summary>Как вывести список?</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>

<details>
<summary>Зачем нужен <code>key</code>?</summary><br>
<table><tr><td>

`key` помогает React сопоставлять элементы между render-ами во время reconciliation. По смыслу это похоже на `trackBy`:
ключ нужен не для красоты, а для сохранения identity элемента.

</td></tr></table>

</details>

## State и rendering

<details>
<summary>Что такое state?</summary><br>
<table><tr><td>

State - это данные компонента, изменение которых вызывает новый render. В function components state обычно создают через
`useState`.

```tsx
const [count, setCount] = useState(0);
```

</td></tr></table>

</details>

<details>
<summary>Чем props отличаются от state?</summary><br>
<table><tr><td>

Props приходят снаружи и принадлежат parent component. State принадлежит самому компоненту. Если данные должен менять
child, обычно parent передает callback.

</td></tr></table>

</details>

<details>
<summary>Что такое render в React?</summary><br>
<table><tr><td>

Render - это вычисление UI для текущих props и state. Важно думать о render как о чистом описании: при одних и тех же
входных данных компонент должен вернуть один и тот же UI.

</td></tr></table>

</details>

<details>
<summary>Почему state считается snapshot?</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>

<details>
<summary>Когда использовать functional updater в <code>setState</code>?</summary><br>
<table><tr><td>

Когда новое состояние зависит от предыдущего. Updater получает актуальное промежуточное значение, поэтому серия
обновлений работает предсказуемо.

```tsx
setCount((current) => current + 1);
setCount((current) => current + 1);
setCount((current) => current + 1);
```

Такой код увеличит счетчик на `3`, потому что каждый updater применяется к результату предыдущего updater-а.

</td></tr></table>

</details>

<details>
<summary>Как batching влияет на обновления state?</summary><br>
<table><tr><td>

React может группировать несколько state updates в один render, чтобы не перерисовывать UI после каждого setter-а.
Batching не означает, что state мутируется сразу. Setter планирует обновление, а компонент получает новое значение на
следующем render-е.

</td></tr></table>

</details>

<details>
<summary>Почему нельзя писать <code>count++</code> и ждать корректный render?</summary><br>
<table><tr><td>

`count++` меняет локальную переменную из текущего render snapshot, но не сообщает React о новом состоянии. React не
узнает, что нужно сделать render. Состояние нужно обновлять через setter.

</td></tr></table>

</details>

<details>
<summary>Чем immutable update отличается от прямой мутации?</summary><br>
<table><tr><td>

Прямая мутация меняет объект или массив на месте, но React сравнивает ссылки и планирует render через setter. Поэтому
массивы и объекты в state обновляют иммутабельно.

```tsx
setTrips((current) => [...current, newTrip]);
```

В Angular signals похожая идея: лучше обновлять значение через `set` / `update` и возвращать новую ссылку для объектов и
массивов. В React роль явного входа в обновление выполняет setter из `useState`.

</td></tr></table>

</details>

<details>
<summary>Как отфильтровать список без мутации?</summary><br>
<table><tr><td>

`filter` возвращает новый массив и не меняет исходный state.

```tsx
const visibleTrips = trips.filter((trip) => trip.country.toLowerCase().includes(query.toLowerCase()));
```

</td></tr></table>

</details>

## Hooks

<details>
<summary>Что такое hook?</summary><br>
<table><tr><td>

Hook - это функция React, которая позволяет component или custom hook использовать state, effects, context и другие
возможности React. Hooks вызывают только на верхнем уровне component или другого hook.

</td></tr></table>

</details>

<details>
<summary>Что такое <code>useEffect</code> и когда он не нужен?</summary><br>
<table><tr><td>

`useEffect` запускает side effect после render-а: подписку, запрос, синхронизацию с внешней системой, работу с DOM API.
Он не нужен для обычных вычислений, которые можно сделать во время render-а.

</td></tr></table>

</details>

<details>
<summary>Чем <code>useEffect(..., [])</code> похож и не похож на <code>ngOnInit</code>?</summary><br>
<table><tr><td>

Похож тем, что часто запускается один раз после первого render-а. Не похож тем, что `useEffect` завязан на render и
dependency array, а не на class lifecycle. В React многие вещи, которые Angular-разработчик положил бы в `ngOnInit`,
лучше вычислить прямо в render или вынести в hook.

</td></tr></table>

</details>

<details>
<summary>Как отменять fetch в <code>useEffect</code>?</summary><br>
<table><tr><td>

Через `AbortController` и cleanup function.

```tsx
useEffect(() => {
  const controller = new AbortController();

  fetch('/api/trips', {signal: controller.signal});

  return () => controller.abort();
}, []);
```

</td></tr></table>

</details>

<details>
<summary>Что такое custom hook?</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>

## Forms

<details>
<summary>Что такое controlled input?</summary><br>
<table><tr><td>

Controlled input - это input, значение которого хранится в React state и обновляется через `onChange`.

```tsx
const [title, setTitle] = useState('');

<input
  value={title}
  onChange={(event) => setTitle(event.target.value)}
/>;
```

</td></tr></table>

</details>

<details>
<summary>Чем controlled forms отличаются от Angular Reactive Forms?</summary><br>
<table><tr><td>

В Angular Reactive Forms есть отдельная модель формы: `FormControl`, `FormGroup`, validators, status, touched, dirty. В
React controlled form часто начинается с обычного state и обработчиков. Для сложных форм обычно берут React Hook Form
или другую form library.

</td></tr></table>

</details>

<details>
<summary>Какие частые ошибки бывают при работе с forms в React?</summary><br>
<table><tr><td>

- Делать каждый field controlled без причины в большой форме и получать лишнюю сложность.
- Мутировать объект формы напрямую.
- Держать validation rules вперемешку с разметкой, когда форма уже стала сложной.
- Не различать submit state, validation state и server error.

</td></tr></table>

</details>

## Data fetching

<details>
<summary>Как организовать data fetching?</summary><br>
<table><tr><td>

Для маленького примера достаточно `useEffect + fetch`. В приложении с cache, refetch, retry и синхронизацией server
state чаще используют TanStack Query или похожую библиотеку.

</td></tr></table>

</details>

<details>
<summary>Чем server state отличается от client state?</summary><br>
<table><tr><td>

Server state приходит с сервера, может устаревать, требует cache, refetch и обработки loading/error. Client state
принадлежит UI: открытая панель, текущий фильтр, выбранная вкладка, локальный draft.

</td></tr></table>

</details>

<details>
<summary>Где хранить loading, error и empty?</summary><br>
<table><tr><td>

Рядом с источником данных. Если запрос локальный для страницы, можно держать state в hook страницы. Если данные
переиспользуются, лучше вынести загрузку в custom hook или query layer.

</td></tr></table>

</details>

## Routing

<details>
<summary>Как React Router отличается от Angular Router?</summary><br>
<table><tr><td>

Angular Router - часть Angular platform, он тесно связан с DI, guards, resolvers и lazy loading. React Router -
отдельная библиотека для client-side routing. Ее выбирают и настраивают отдельно от React.

```tsx
createBrowserRouter([
  {path: '/trips', element: <TripsPage />},
  {path: '/trips/new', element: <NewTripPage />},
  {path: '/trips/:tripId', element: <TripDetailsPage />},
]);
```

</td></tr></table>

</details>

## Context и state management

<details>
<summary>Когда нужен Context?</summary><br>
<table><tr><td>

Context нужен, когда значение нужно передать глубоко по дереву без prop drilling: theme, locale, текущий пользователь,
настройки приложения. Это ближе к scoped provider, чем к полноценному store.

</td></tr></table>

</details>

<details>
<summary>Почему Context не всегда замена state manager?</summary><br>
<table><tr><td>

Context решает передачу значения, но не дает из коробки нормализованную модель данных, devtools, middleware, cache,
optimistic updates или granular subscriptions. Для сложного client state чаще смотрят на Redux Toolkit или Zustand, а
для server state - на TanStack Query.

</td></tr></table>

</details>

<details>
<summary>Как сравнить Angular DI и React Context?</summary><br>
<table><tr><td>

Angular DI создает и резолвит зависимости по injector tree, умеет работать с class services, tokens и providers. React
Context передает value через component tree. В Context можно положить service-like object, но lifecycle и границы будут
React-овыми.

</td></tr></table>

</details>

## Отличия React от Angular

<details>
<summary>React - это framework или library?</summary><br>
<table><tr><td>

React чаще называют library для UI layer. Он помогает описывать component tree и rendering, но routing, forms, HTTP,
state management и project architecture выбираются отдельно. Angular дает больше решений из коробки: router, forms, DI,
HTTP integration, CLI conventions.

</td></tr></table>

</details>

<details>
<summary>Чем React component отличается от Angular component?</summary><br>
<table><tr><td>

В React это чаще function + JSX + hooks. В Angular - class + metadata + template + DI. React component обычно ближе к
функции отображения, а Angular component встроен в более широкий framework lifecycle.

</td></tr></table>

</details>

<details>
<summary>Чем props отличаются от <code>@Input()</code>?</summary><br>
<table><tr><td>

Обе механики передают данные сверху вниз. В Angular `@Input()` является частью component metadata и change detection
контракта. В React props - обычный объект аргументов component function.

</td></tr></table>

</details>

<details>
<summary>Чем callback prop отличается от <code>@Output()</code>?</summary><br>
<table><tr><td>

`@Output()` обычно основан на `EventEmitter` или output API Angular. В React parent передает функцию, child вызывает ее.
Это проще механически, но требует дисциплины в именовании и направлении data flow.

</td></tr></table>

</details>

<details>
<summary>Чем React Context отличается от Angular DI?</summary><br>
<table><tr><td>

Context передает конкретное значение через React tree. Angular DI резолвит зависимости через injectors и tokens. DI
лучше подходит для сервисов и инфраструктурных зависимостей, Context - для значений, связанных с UI-деревом.

</td></tr></table>

</details>

<details>
<summary>Чем <code>useEffect</code> отличается от lifecycle hooks?</summary><br>
<table><tr><td>

Lifecycle hooks Angular привязаны к lifecycle class component/directive. `useEffect` описывает синхронизацию с внешним
миром после render-а и повторяется при изменении dependencies. Он не является полным аналогом `ngOnInit`.

</td></tr></table>

</details>

<details>
<summary>Чем React forms отличаются от Angular Reactive Forms?</summary><br>
<table><tr><td>

React не дает встроенной формы уровня Angular Reactive Forms. Можно собрать controlled inputs на state, использовать
uncontrolled inputs или взять библиотеку. В Angular Reactive Forms модель формы является частью framework API.

</td></tr></table>

</details>

<details>
<summary>Чем React Router отличается от Angular Router?</summary><br>
<table><tr><td>

React Router - отдельный выбор стека. Angular Router - официальный router с guards, resolvers, DI и lazy loading как
частью Angular architecture.

</td></tr></table>

</details>

<details>
<summary>Чем React state отличается от Angular signals?</summary><br>
<table><tr><td>

React state обновляется setter-ом и вызывает render component subtree. Angular signals хранят reactive value и точнее
связывают чтения с зависимостями. В обоих случаях важно не мутировать объекты незаметно.

</td></tr></table>

</details>

<details>
<summary>Почему в React нельзя мутировать state напрямую?</summary><br>
<table><tr><td>

React должен получить новое значение через setter, чтобы запланировать render. При мутации на месте ссылка может
остаться той же, а UI и memoization начнут вести себя непредсказуемо.

</td></tr></table>

</details>

<details>
<summary>Почему React-приложения чаще имеют больше вариантов архитектуры?</summary><br>
<table><tr><td>

React намеренно покрывает меньше слоев. Команда сама выбирает router, data fetching, forms, state manager, styling и SSR
framework. Это гибко, но требует явных соглашений.

</td></tr></table>

</details>

<details>
<summary>Почему Angular-разработчику важно не пытаться писать React как Angular?</summary><br>
<table><tr><td>

Если переносить Angular-привычки напрямую, можно получить лишние service abstractions, неуместный Context, effects для
обычных вычислений и тяжелые формы без нужды. Лучше принять React-модель: props down, callbacks up, immutable state,
hooks для reusable UI logic.

</td></tr></table>

</details>

## Разные React-стеки

<details>
<summary>Какие React-стеки чаще встречаются и когда они подходят?</summary><br>
<table><tr><td>

- **Vite + React + TypeScript**: SPA, админки, внутренние интерфейсы, обучение и быстрые прототипы.
- **React Router**: client-side routing; можно сравнить с Angular Router, но это отдельная библиотека.
- **Next.js**: SSR, SSG, SEO, file-based routing и fullstack/web framework подход.
- **TanStack Query**: server state, загрузка, cache, refetch, loading/error states и optimistic updates.
- **Redux Toolkit**: сложный client state, предсказуемые обновления и debug tooling.
- **Zustand**: более легкий client state без большого boilerplate.
- **React Hook Form**: формы, где controlled inputs на каждый символ могут быть не самым удобным вариантом.
- **Vitest + React Testing Library + Playwright**: unit, component и e2e testing.
- **CSS Modules / Tailwind / CSS-in-JS / design system**: разные подходы к стилям и theming.
- **React Native**: отдельный стек для мобильной разработки, не то же самое, что React DOM.

</td></tr></table>

</details>

## Вопросы по уровням

### Junior

<details>
<summary>Что такое React component?</summary><br>
<table><tr><td>

Функция, которая возвращает JSX и описывает часть UI.

</td></tr></table>

</details>

<details>
<summary>Что такое JSX?</summary><br>
<table><tr><td>

Синтаксис, похожий на HTML внутри JS/TS, который компилируется в вызовы React.

</td></tr></table>

</details>

<details>
<summary>Что такое props?</summary><br>
<table><tr><td>

Входные данные компонента, аналог `@Input()` в Angular.

</td></tr></table>

</details>

<details>
<summary>Что такое state?</summary><br>
<table><tr><td>

Данные компонента, изменение которых вызывает render.

</td></tr></table>

</details>

<details>
<summary>Чем props отличаются от state?</summary><br>
<table><tr><td>

Props приходят снаружи, state принадлежит компоненту.

</td></tr></table>

</details>

<details>
<summary>Как обработать click в React?</summary><br>
<table><tr><td>

Через `onClick`, передав функцию.

```tsx
<button onClick={() => setOpen(true)}>Open</button>
```

</td></tr></table>

</details>

<details>
<summary>Как вывести список?</summary><br>
<table><tr><td>

Через `array.map()` и обязательно указать `key`.

</td></tr></table>

</details>

<details>
<summary>Зачем нужен <code>key</code>?</summary><br>
<table><tr><td>

Он помогает React сопоставлять элементы между render-ами. По смыслу это похоже на идею `trackBy` в Angular.

</td></tr></table>

</details>

<details>
<summary>Что такое controlled input?</summary><br>
<table><tr><td>

Input, значение которого хранится в state и обновляется через `onChange`.

</td></tr></table>

</details>

<details>
<summary>Как передать событие от child к parent?</summary><br>
<table><tr><td>

Передать callback prop из parent в child.

</td></tr></table>

</details>

### Middle

<details>
<summary>Что такое render в React?</summary><br>
<table><tr><td>

Вычисление JSX для текущих props и state. Render должен быть предсказуемым и без side effects.

</td></tr></table>

</details>

<details>
<summary>Почему state считается snapshot?</summary><br>
<table><tr><td>

Каждый render видит фиксированные значения state. Setter не меняет переменную в уже выполняющемся render-е.

</td></tr></table>

</details>

<details>
<summary>Как работает batching обновлений state?</summary><br>
<table><tr><td>

React группирует несколько updates и делает один render. Поэтому сразу после setter-а нельзя полагаться на новое
значение в текущей snapshot-логике.

</td></tr></table>

</details>

<details>
<summary>Когда использовать functional updater в <code>setState</code>?</summary><br>
<table><tr><td>

Когда новое значение зависит от предыдущего: счетчики, добавление элемента, переключение boolean, обновление очереди.

</td></tr></table>

</details>

<details>
<summary>Что такое <code>useEffect</code> и когда он не нужен?</summary><br>
<table><tr><td>

`useEffect` нужен для синхронизации с внешним миром. Он не нужен для вычислений из props/state: такие значения лучше
посчитать во время render-а или через memoization, если это действительно дорого.

</td></tr></table>

</details>

<details>
<summary>Чем <code>useEffect(..., [])</code> похож и не похож на <code>ngOnInit</code>?</summary><br>
<table><tr><td>

Похож частым запуском один раз после mount. Не похож моделью dependencies, cleanup и тем, что React не требует класть
инициализацию UI state именно в effect.

</td></tr></table>

</details>

<details>
<summary>Как отменять fetch в <code>useEffect</code>?</summary><br>
<table><tr><td>

Создать `AbortController`, передать `signal` в `fetch`, а в cleanup вызвать `abort()`.

</td></tr></table>

</details>

<details>
<summary>Что такое custom hook?</summary><br>
<table><tr><td>

Функция с именем `use...`, которая выносит stateful logic и может использовать другие hooks.

</td></tr></table>

</details>

<details>
<summary>Когда нужен Context?</summary><br>
<table><tr><td>

Когда значение нужно многим вложенным компонентам: theme, locale, auth session, настройки приложения.

</td></tr></table>

</details>

<details>
<summary>Почему Context не всегда замена state manager?</summary><br>
<table><tr><td>

Он передает value, но не решает cache, нормализацию, debug tooling, optimistic updates и granular updates.

</td></tr></table>

</details>

<details>
<summary>Как организовать data fetching?</summary><br>
<table><tr><td>

Для простого случая - custom hook с `useEffect + fetch`. Для server state в продукте - query library, например TanStack
Query.

</td></tr></table>

</details>

<details>
<summary>Чем server state отличается от client state?</summary><br>
<table><tr><td>

Server state живет на сервере и может устаревать. Client state описывает локальное состояние UI и пользовательские
черновики.

</td></tr></table>

</details>

<details>
<summary>Как React Router отличается от Angular Router?</summary><br>
<table><tr><td>

React Router подключается отдельно и не является частью React. Angular Router - встроенная часть Angular ecosystem.

</td></tr></table>

</details>

<details>
<summary>Чем controlled forms отличаются от Angular Reactive Forms?</summary><br>
<table><tr><td>

Controlled forms держат значения в React state. Angular Reactive Forms дают готовую модель controls, groups, validators
и statuses.

</td></tr></table>

</details>

<details>
<summary>Какие частые ошибки бывают при работе с forms в React?</summary><br>
<table><tr><td>

Мутация form state, слишком много ручного boilerplate, смешение validation и rendering, отсутствие обработки server
errors.

</td></tr></table>

</details>

### Middle+

<details>
<summary>Как спроектировать структуру React-приложения?</summary><br>
<table><tr><td>

Начать с features/pages/shared, отдельно выделить API layer, domain types, reusable UI и routing. Структура должна
помогать искать use cases, а не просто сортировать файлы по типу.

</td></tr></table>

</details>

<details>
<summary>Где хранить бизнес-логику: component, hook, service/module function, store?</summary><br>
<table><tr><td>

UI logic можно держать в component или hook. Pure domain logic лучше вынести в module functions. Shared client state - в
store. Server state - в query layer.

</td></tr></table>

</details>

<details>
<summary>Как сравнить Angular DI и React Context?</summary><br>
<table><tr><td>

DI - система зависимостей с tokens и injectors. Context - передача value через React tree. Они пересекаются по задачам,
но не являются одинаковыми механизмами.

</td></tr></table>

</details>

<details>
<summary>Как сравнить Angular services и React custom hooks?</summary><br>
<table><tr><td>

Angular service - injectable dependency с lifecycle в injector. Custom hook - reusable React logic, которая вызывается
внутри component tree.

</td></tr></table>

</details>

<details>
<summary>Как сравнить Angular signals и React state/memoization?</summary><br>
<table><tr><td>

Signals дают fine-grained reactivity, React чаще re-render-ит component function. `useMemo` и `useCallback` помогают
стабилизировать дорогие вычисления и ссылки, но не заменяют state.

</td></tr></table>

</details>

<details>
<summary>Как избежать лишних render-ов?</summary><br>
<table><tr><td>

Держать state ближе к месту использования, не поднимать его без необходимости, использовать стабильные keys, избегать
лишнего Context value churn, применять memoization только там, где есть измеримая причина.

</td></tr></table>

</details>

<details>
<summary>Когда нужны <code>useMemo</code> и <code>useCallback</code>, а когда это premature optimization?</summary><br>
<table><tr><td>

Они нужны для дорогих вычислений, стабильных props в memoized children и корректных dependencies. Если вычисление
дешевое и нет проблемы с render-ами, это лишний шум.

</td></tr></table>

</details>

<details>
<summary>Как проектировать reusable components?</summary><br>
<table><tr><td>

Делать API маленьким, называть props по домену, не смешивать data fetching с presentation, оставлять escape hatches для
сложных cases.

</td></tr></table>

</details>

<details>
<summary>Как делать compound components?</summary><br>
<table><tr><td>

Разделить большой компонент на согласованные части, например `Tabs.Root`, `Tabs.List`, `Tabs.Trigger`, `Tabs.Content`.
Общее состояние можно передать через Context внутри компонента.

</td></tr></table>

</details>

<details>
<summary>Как построить форму со сложной валидацией?</summary><br>
<table><tr><td>

Выбрать form library, описать schema или validators отдельно от UI, разделить client validation, async validation и
server errors.

</td></tr></table>

</details>

<details>
<summary>Как выбрать между Redux, Zustand, Context и TanStack Query?</summary><br>
<table><tr><td>

Context - для передачи value. TanStack Query - для server state. Redux Toolkit - для сложного client state и строгого
debug flow. Zustand - для легкого shared client state.

</td></tr></table>

</details>

<details>
<summary>Как тестировать React-компоненты?</summary><br>
<table><tr><td>

Проверять поведение через React Testing Library: что пользователь видит и делает. Внутренние hooks и functions
тестировать отдельно, если там есть самостоятельная логика.

</td></tr></table>

</details>

<details>
<summary>Как устроить error boundary?</summary><br>
<table><tr><td>

Error boundary ловит ошибки render-а ниже по дереву и показывает fallback UI. В React это class component API или
готовая библиотека-обертка.

</td></tr></table>

</details>

<details>
<summary>Как делать lazy loading?</summary><br>
<table><tr><td>

Через dynamic import, `React.lazy`, `Suspense` или lazy routes в router/framework.

</td></tr></table>

</details>

<details>
<summary>Как React встраивается в micro frontend архитектуру рядом с Angular?</summary><br>
<table><tr><td>

Через независимые bundles, module federation, web components или shell-level integration. Важно договориться о routing,
auth, design system, events и shared dependencies.

</td></tr></table>

</details>

### Senior

<details>
<summary>Какие архитектурные trade-offs есть между Angular и React?</summary><br>
<table><tr><td>

Angular дает больше структуры и единых решений. React дает больше свободы выбора. Trade-off между предсказуемостью
платформы и гибкостью стека.

</td></tr></table>

</details>

<details>
<summary>Почему Angular дает больше структуры из коробки, а React требует выбора стека?</summary><br>
<table><tr><td>

Angular проектировался как framework. React фокусируется на UI layer, поэтому router, forms, server state, SSR и styling
команда выбирает отдельно.

</td></tr></table>

</details>

<details>
<summary>Как выбирать React-стек для enterprise-продукта?</summary><br>
<table><tr><td>

Смотреть на требования к routing, SSR, формам, server state, дизайн-системе, найму, observability, testing и lifecycle
поддержки.

</td></tr></table>

</details>

<details>
<summary>Когда React хуже подходит, чем Angular?</summary><br>
<table><tr><td>

Когда команде нужна строгая единая платформа из коробки, много одинаковых enterprise-форм, сильная зависимость от DI и
желание минимизировать архитектурный выбор.

</td></tr></table>

</details>

<details>
<summary>Когда React лучше подходит, чем Angular?</summary><br>
<table><tr><td>

Когда нужен легкий UI layer, гибкий подбор libraries, быстрая интеграция в существующий стек или команда уже сильна в
React ecosystem.

</td></tr></table>

</details>

<details>
<summary>Как мигрировать часть Angular-приложения на React или наоборот?</summary><br>
<table><tr><td>

Идти feature by feature, стабилизировать contracts, вынести domain logic, договориться о routing/auth/design system и не
переписывать все сразу без продуктовой причины.

</td></tr></table>

</details>

<details>
<summary>Как проектировать design system, который используют Angular и React?</summary><br>
<table><tr><td>

Разделить tokens, accessibility contract, visual specs и framework adapters. Компоненты могут быть разными, но поведение
и дизайн-правила должны быть общими.

</td></tr></table>

</details>

<details>
<summary>Как разделять domain logic и UI logic между разными frameworks?</summary><br>
<table><tr><td>

Domain logic держать в pure TypeScript modules без зависимости от Angular или React. UI logic оставлять в components,
hooks, services и adapters конкретного framework.

</td></tr></table>

</details>

<details>
<summary>Как проектировать state model для долгоживущего продукта?</summary><br>
<table><tr><td>

Разделять server state, client state, form drafts и derived values. Описывать ownership данных и правила invalidation.

</td></tr></table>

</details>

<details>
<summary>Как оценивать риски Next.js / SSR / hydration?</summary><br>
<table><tr><td>

Проверять, какие страницы реально требуют SSR, какие данные доступны на сервере, есть ли browser-only код, как устроены
cache, auth и deployment.

</td></tr></table>

</details>

<details>
<summary>Какие проблемы бывают при hydration mismatch?</summary><br>
<table><tr><td>

HTML с сервера не совпадает с первым client render: разные даты, random values, browser-only данные, условный rendering
по `window`, различия локали.

</td></tr></table>

</details>

<details>
<summary>Как контролировать bundle size?</summary><br>
<table><tr><td>

Следить за dependencies, lazy loading, route splitting, tree shaking, design system imports и анализом bundle report.

</td></tr></table>

</details>

<details>
<summary>Как построить стратегию тестирования React-приложения?</summary><br>
<table><tr><td>

Pure logic покрыть unit tests, components - behavior tests, critical flows - Playwright, data fetching - mock server или
query layer tests.

</td></tr></table>

</details>

<details>
<summary>Как выстроить code review React-кода для Angular-команды?</summary><br>
<table><tr><td>

Проверять data flow, immutable updates, корректные dependencies hooks, отсутствие лишних effects, доступность,
тестируемость и понятный выбор libraries.

</td></tr></table>

</details>

<details>
<summary>Какие вопросы задать команде перед переходом с Angular на React?</summary><br>
<table><tr><td>

Зачем нужен переход, какие проблемы он решает, кто владеет архитектурой, какой стек выбран, как мигрировать без
остановки разработки и как обучать команду.

</td></tr></table>

</details>

## Практические задачки

Все задачи ниже связаны с мини-проектом Travel Planner.

### Junior tasks

- Создать компонент `TripCard`.
- Вывести список поездок через `map`.
- Добавить `key`.
- Добавить empty state.
- Добавить controlled input для поиска.
- Добавить форму добавления поездки.
- Передать обработчик `onAddTrip` из parent в child.
- Добавить простую фильтрацию по стране.

### Middle tasks

- Вынести типы `Trip` и `Place`.
- Вынести логику в `useTrips`.
- Добавить загрузку mock data через `fetch`.
- Добавить `loading`, `error`, `empty`.
- Добавить отмену запроса через `AbortController`.
- Добавить React Router routes: `/trips`, `/trips/new`, `/trips/:tripId`.
- Добавить `localStorage`.
- Добавить custom hook `useLocalStorage`.
- Добавить валидацию формы.
- Добавить optimistic update для добавления поездки, если уместно.

### Middle+ tasks

- Разделить приложение на `pages`, `entities`, `features`, `shared`.
- Добавить слой API.
- Добавить TanStack Query вместо ручного `useEffect + fetch`.
- Добавить Context для настроек приложения.
- Сравнить, что должно быть в Context, а что в Query/cache/store.
- Добавить tests для формы, списка и hook.
- Добавить error boundary.
- Добавить lazy route для страницы деталей.
- Добавить debounce для фильтра.
- Добавить сортировку поездок без мутации массива.

### Senior tasks

- Описать архитектурные решения в README.
- Объяснить, как этот проект выглядел бы на Angular.
- Объяснить, что изменится при переходе на Next.js.
- Объяснить, как разделить domain logic так, чтобы ее можно было переиспользовать между Angular и React.
- Спроектировать design system components: `Button`, `TextField`, `Card`.
- Описать стратегию тестирования.
- Описать риски SSR/hydration, если проект перенести на Next.js.
- Описать, где нужен global state, а где достаточно local state.
- Описать trade-offs между Redux Toolkit, Zustand, Context и TanStack Query.
- Описать, как провести code review React-кода для Angular-разработчика.

## Мини-проект: Travel Planner

<details>
<summary>Какие функции должен покрывать Travel Planner?</summary><br>
<table><tr><td>

Travel Planner - небольшой проект для тренировки React-мышления без ухода в абстрактные примеры.

Функции:

1. Список поездок.
2. Добавление поездки.
3. Страница деталей поездки.
4. Список мест внутри поездки.
5. Фильтр по стране/городу.
6. Загрузка mock data через `fetch`.
7. Состояния `loading` / `error` / `empty`.
8. Роутинг.
9. Простая форма.
10. Сохранение в `localStorage`.

Минимальная модель данных:

```ts
type Place = {
  id: string;
  title: string;
  city: string;
};

type Trip = {
  id: string;
  title: string;
  country: string;
  places: Place[];
};
```

</td></tr></table>

</details>

## Что важно не перепутать на интервью

<details>
<summary>Какие React-вещи чаще всего путают на интервью?</summary><br>
<table><tr><td>

- `useEffect` не является полным аналогом `ngOnInit`.
- `props` нельзя менять внутри child component.
- `state` нельзя мутировать напрямую.
- `setState` асинхронен в практическом смысле: нельзя сразу после setter ожидать новое значение в той же render-snapshot
  логике.
- `key` нужен не для красоты, а для reconciliation.
- Context не равен полноценному state manager.
- `useMemo` и `useCallback` не нужно ставить везде.
- React Router не является частью самого React.
- Next.js не равен React.
- Server state и client state лучше разделять.
- Controlled input не всегда лучший выбор для больших форм.
- React дает меньше структуры из коробки, поэтому архитектуру нужно выбирать осознанно.

</td></tr></table>

</details>

<details>
<summary>В каком порядке изучать React Angular-разработчику?</summary><br>
<table><tr><td>

1. JSX, components, props.
2. State, events, lists.
3. Forms and controlled inputs.
4. `useEffect` and data fetching.
5. Custom hooks.
6. Routing.
7. Context and state management.
8. Angular vs React differences.
9. Testing.
10. Architecture and stack choices.

</td></tr></table>

</details>
