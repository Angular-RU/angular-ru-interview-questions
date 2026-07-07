---
layout: ../../layouts/Layout.astro
title: React
description: Вопросы и ответы
category: Frontend
kind: questions
order: 130
---

# React

## Содержание

- [Зачем Angular-разработчику знать React](#зачем-angular-разработчику-знать-react)
- [Короткая карта Angular -> React](#короткая-карта-angular---react)
- [React Core](#react-core)
- [State и rendering](#state-и-rendering)
- [Hooks](#hooks)
- [Forms](#forms)
- [Data fetching](#data-fetching)
- [Routing](#routing)
- [Context и state management](#context-и-state-management)
- [Отличия React от Angular](#отличия-react-от-angular)
- [Разные React-стеки](#разные-react-стеки)
  - [Выбор React-стека](#выбор-react-стека)
  - [Старт проекта](#старт-проекта)
  - [Package manager и monorepo](#package-manager-и-monorepo)
  - [Routing и fullstack frameworks](#routing-и-fullstack-frameworks)
  - [State management](#state-management)
  - [Data fetching](#data-fetching-1)
  - [Forms](#forms-1)
  - [Styling и UI libraries](#styling-и-ui-libraries)
  - [Animation и charts](#animation-и-charts)
  - [Testing](#testing)
  - [Auth, backend и database](#auth-backend-и-database)
  - [Hosting](#hosting)
  - [i18n, rich text, upload и drag and drop](#i18n-rich-text-upload-и-drag-and-drop)
  - [Mobile и desktop](#mobile-и-desktop)
  - [Выбор стека на интервью](#выбор-стека-на-интервью)
- [Вопросы по уровням](#вопросы-по-уровням)
- [Практические задачки](#практические-задачки)
- [Мини-проект: Travel Planner](#мини-проект-travel-planner)
- [Что важно не перепутать на интервью](#что-важно-не-перепутать-на-интервью)
- [Рекомендуемый порядок изучения](#рекомендуемый-порядок-изучения)

## Зачем Angular-разработчику знать React

### Middle

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

### Middle

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

### Junior

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

### Middle+ or Senior

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

### Junior

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

### Middle

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

## Forms

### Middle+ or Senior

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

### Middle

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

### Middle+ or Senior

<details>
<summary>Где хранить loading, error и empty?</summary><br>
<table><tr><td>

Рядом с источником данных. Если запрос локальный для страницы, можно держать state в hook страницы. Если данные
переиспользуются, лучше вынести загрузку в custom hook или query layer.

</td></tr></table>

</details>

## Routing

### Middle+ or Senior

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

### Middle+ or Senior

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

### Junior

<details>
<summary>Чем props отличаются от <code>@Input()</code>?</summary><br>
<table><tr><td>

Обе механики передают данные сверху вниз. В Angular `@Input()` является частью component metadata и change detection
контракта. В React props - обычный объект аргументов component function.

</td></tr></table>

</details>

### Middle

<details>
<summary>Чем React component отличается от Angular component?</summary><br>
<table><tr><td>

В React это чаще function + JSX + hooks. В Angular - class + metadata + template + DI. React component обычно ближе к
функции отображения, а Angular component встроен в более широкий framework lifecycle.

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
<summary>Чем <code>useEffect</code> отличается от lifecycle hooks?</summary><br>
<table><tr><td>

Lifecycle hooks Angular привязаны к lifecycle class component/directive. `useEffect` описывает синхронизацию с внешним
миром после render-а и повторяется при изменении dependencies. Он не является полным аналогом `ngOnInit`.

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
<summary>Почему Angular-разработчику важно не пытаться писать React как Angular?</summary><br>
<table><tr><td>

Если переносить Angular-привычки напрямую, можно получить лишние service abstractions, неуместный Context, effects для
обычных вычислений и тяжелые формы без нужды. Лучше принять React-модель: props down, callbacks up, immutable state,
hooks для reusable UI logic.

</td></tr></table>

</details>

### Middle+ or Senior

<details>
<summary>React - это framework или library?</summary><br>
<table><tr><td>

React чаще называют library для UI layer. Он помогает описывать component tree и rendering, но routing, forms, HTTP,
state management и project architecture выбираются отдельно. Angular дает больше решений из коробки: router, forms, DI,
HTTP integration, CLI conventions.

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
<summary>Почему React-приложения чаще имеют больше вариантов архитектуры?</summary><br>
<table><tr><td>

React намеренно покрывает меньше слоев. Команда сама выбирает router, data fetching, forms, state manager, styling и SSR
framework. Это гибко, но требует явных соглашений.

</td></tr></table>

</details>

## Разные React-стеки

### Middle

<details>
<summary>Какие технологии чаще встречаются вокруг React?</summary><br>
<table><tr><td>

React сам по себе закрывает UI layer, поэтому вокруг него команда выбирает router, data fetching, forms, styling,
testing, auth, hosting и иногда fullstack framework. Это не список библиотек для заучивания. На интервью важнее
объяснить, какие требования продукта влияют на выбор и чем этот подход отличается от Angular platform.

</td></tr></table>

</details>

### Выбор React-стека

#### Middle

<details>
<summary>Почему в React нужно выбирать больше библиотек, чем в Angular?</summary><br>
<table><tr><td>

Angular - framework с большим количеством официальных решений: router, forms, DI, HTTP integration, CLI conventions.
React чаще является UI library, вокруг которой команда собирает стек. Поэтому в React-интервью часто спрашивают не
только React Core, но и routing, server state, forms, styling, testing, SSR, auth и hosting.

</td></tr></table>

</details>

<details>
<summary>Какие решения Angular дает из коробки, а React оставляет команде?</summary><br>
<table><tr><td>

Angular дает официальный router, forms API, DI, HttpClient, CLI, application builder и opinionated project structure. В
React обычно отдельно выбирают React Router или framework router, TanStack Query или другой data layer, form library,
styling strategy, test stack и deployment model.

</td></tr></table>

</details>

<details>
<summary>Почему это одновременно плюс и минус?</summary><br>
<table><tr><td>

Плюс в том, что можно подобрать стек под продукт: SPA, content site, dashboard, fullstack app или mobile. Минус в том,
что команда должна принимать больше архитектурных решений и поддерживать их consistency. Без соглашений React-проект
быстро превращается в набор локальных предпочтений.

</td></tr></table>

</details>

<details>
<summary>Как отвечать на интервью, если спрашивают "какой React-стек выбрать"?</summary><br>
<table><tr><td>

Начните с требований: SPA или SSR, SEO, сложность форм, объем server state, дизайн-система, уровень команды, monorepo,
deployment target, accessibility и testing. Хороший ответ не называет одну любимую библиотеку, а показывает критерии
выбора и trade-offs.

</td></tr></table>

</details>

<details>
<summary>Почему Angular-разработчику важно понимать React ecosystem?</summary><br>
<table><tr><td>

Даже без перехода на React это помогает обсуждать micro frontends, shared design systems, hiring, architecture reviews и
frontend platform decisions. Angular-разработчику важно понимать, где Angular дает встроенный контракт, а где React
команда создает контракт сама.

</td></tr></table>

</details>

### Старт проекта

#### Middle

<details>
<summary>Как выбрать старт проекта?</summary><br>
<table><tr><td>

| Ситуация                                           | Подход                      |
| -------------------------------------------------- | --------------------------- |
| SPA, админка, internal app                         | Vite + React + TypeScript   |
| SSR, SSG, SEO, fullstack routing                   | Next.js                     |
| Content/static site с минимумом JS                 | Astro                       |
| Type-safe fullstack routing вокруг TanStack Router | TanStack Start              |
| Router с loaders/actions и framework mode          | React Router framework mode |

</td></tr></table>

</details>

<details>
<summary>Когда выбрать Vite + React + TypeScript?</summary><br>
<table><tr><td>

Когда нужен быстрый SPA-проект: админка, внутренний интерфейс, кабинет, прототип или учебный проект. Vite дает простой
dev server и build setup, но не решает SSR, file-based routing и backend-задачи сам по себе.

</td></tr></table>

</details>

<details>
<summary>Когда выбрать Next.js?</summary><br>
<table><tr><td>

Next.js подходит, когда важны SSR, SSG, SEO, file-based routing, server-side data fetching или fullstack-подход в одном
репозитории. В отличие от Vite SPA, это framework вокруг React со своими routing, cache и deployment trade-offs.

</td></tr></table>

</details>

<details>
<summary>Чем Next.js отличается от Vite SPA?</summary><br>
<table><tr><td>

Vite SPA обычно рендерит приложение на клиенте и требует отдельного решения для routing/data/backend. Next.js добавляет
server rendering, file-based routing, server components и server functions. Это больше возможностей, но и больше
framework-specific правил.

</td></tr></table>

</details>

<details>
<summary>Когда может подойти Astro?</summary><br>
<table><tr><td>

Astro уместен для content-heavy и static сайтов, где важно доставлять минимум JavaScript. React-компоненты можно
использовать точечно как islands, но приложение не обязано становиться полноценной React SPA.

</td></tr></table>

</details>

<details>
<summary>Почему React fundamentals все равно нужны, даже если проект на Next.js?</summary><br>
<table><tr><td>

Next.js добавляет routing, server rendering, cache и fullstack conventions, но компоненты, props, state, hooks, events,
keys и composition остаются React. Без React fundamentals разработчик будет путать framework-specific правила с базовой
моделью UI.

</td></tr></table>

</details>

#### Middle+ or Senior

<details>
<summary>Что такое TanStack Start?</summary><br>
<table><tr><td>

TanStack Start - fullstack framework из TanStack ecosystem вокруг TanStack Router. Его обычно рассматривают, когда
команде важны type-safe routing, loaders и интеграция с TanStack Query без перехода в Next.js-модель.

</td></tr></table>

</details>

<details>
<summary>Чем React Router library mode отличается от framework mode?</summary><br>
<table><tr><td>

В library mode React Router - это router для client-side navigation внутри приложения. В framework mode он становится
ближе к application framework: появляются file routes, loaders, actions, server rendering и conventions вокруг данных.

</td></tr></table>

</details>

### Package manager и monorepo

#### Middle

<details>
<summary>Чем npm, pnpm и Bun отличаются на уровне выбора для проекта?</summary><br>
<table><tr><td>

`npm` - самый стандартный и предсказуемый выбор. `pnpm` часто выбирают за скорость, строгую модель зависимостей и
экономию места. Bun - более широкий toolchain, но перед выбором нужно оценить зрелость, совместимость и CI/deployment.

</td></tr></table>

</details>

<details>
<summary>Когда достаточно npm?</summary><br>
<table><tr><td>

Когда проект небольшой, команда не упирается в скорость install, нет сложного monorepo и важна максимальная
предсказуемость окружения. Для интервью это нормальный boring default, а не признак слабого стека.

</td></tr></table>

</details>

<details>
<summary>Когда pnpm может быть лучше?</summary><br>
<table><tr><td>

`pnpm` хорош для monorepo, больших dependency trees и команд, где важны быстрые install и строгая проверка неявных
зависимостей. Angular-разработчику это обычно понятно через workspace-мышление и shared tooling.

</td></tr></table>

</details>

<details>
<summary>Когда нужен monorepo?</summary><br>
<table><tr><td>

Когда несколько приложений и библиотек должны вместе версионироваться, переиспользовать design tokens, shared UI, domain
logic или tooling. Если в репозитории один маленький app, monorepo может добавить лишнюю сложность.

</td></tr></table>

</details>

<details>
<summary>Чем Turborepo отличается от Nx?</summary><br>
<table><tr><td>

Turborepo чаще воспринимается как task pipeline и cache для JS/TS monorepo. Nx - более полноценная monorepo platform с
project graph, generators, affected commands и сильной историей в Angular. Поэтому Angular-разработчику часто проще
понять Nx в mixed Angular + React workspace.

</td></tr></table>

</details>

<details>
<summary>Какие риски есть у monorepo?</summary><br>
<table><tr><td>

Риски: медленный CI без affected/cache, неясные boundaries, случайные зависимости между features, сложный ownership и
обновления tooling. Monorepo полезен только тогда, когда команда реально поддерживает правила архитектуры.

</td></tr></table>

</details>

### Routing и fullstack frameworks

#### Middle

<details>
<summary>Что выбрать для routing и fullstack?</summary><br>
<table><tr><td>

| Ситуация                                     | Подход                      |
| -------------------------------------------- | --------------------------- |
| Обычная SPA-навигация                        | React Router library mode   |
| Type-safe routes и loaders                   | TanStack Router             |
| SSR/SSG, SEO, App Router                     | Next.js                     |
| Loaders/actions/server rendering без Next.js | React Router framework mode |
| Content site с островами интерактива         | Astro                       |

</td></tr></table>

</details>

<details>
<summary>Что такое client-side routing?</summary><br>
<table><tr><td>

Это навигация, где URL меняется без полной перезагрузки страницы, а React перерисовывает нужный route на клиенте. Для
SPA это привычная модель, но SEO, initial load и data fetching нужно продумывать отдельно.

</td></tr></table>

</details>

<details>
<summary>Что такое file-based routing?</summary><br>
<table><tr><td>

Это подход, где структура файлов определяет routes. Он привычен в Next.js и некоторых fullstack/framework режимах:
меньше ручной конфигурации, но больше зависимости от conventions конкретного framework.

</td></tr></table>

</details>

<details>
<summary>Что такое loader/action подход?</summary><br>
<table><tr><td>

Loader загружает данные для route, action обрабатывает mutation или form submission. Это похоже на route-level contract:
данные и навигация проектируются вместе, а не размазываются по `useEffect` в компонентах.

</td></tr></table>

</details>

<details>
<summary>Что такое React Server Components?</summary><br>
<table><tr><td>

React Server Components позволяют части component tree выполняться на сервере и не попадать в client bundle. Это мощно
для data fetching и bundle size, но требует понимать границы server/client code, cache, serialization и ограничения
framework-а.

</td></tr></table>

</details>

<details>
<summary>Какие риски у RSC для команды?</summary><br>
<table><tr><td>

Риски: новая mental model, путаница server/client boundaries, framework lock-in, сложнее debugging и миграции. Перед
выбором важно понять, есть ли реальные требования к SSR, SEO, cache и bundle size.

</td></tr></table>

</details>

#### Middle+ or Senior

<details>
<summary>Чем React Router отличается от Angular Router?</summary><br>
<table><tr><td>

Angular Router - официальный router framework-а с DI, guards, resolvers и lazy loading. React Router - отдельная
библиотека или framework mode, которую команда подключает и настраивает отдельно от React Core.

</td></tr></table>

</details>

<details>
<summary>Что такое SSR и hydration?</summary><br>
<table><tr><td>

SSR рендерит HTML на сервере, чтобы пользователь и поисковик раньше получили содержимое. Hydration подключает React на
клиенте к уже полученному HTML. Риски начинаются, когда server HTML и первый client render не совпадают.

</td></tr></table>

</details>

<details>
<summary>Что спросить у команды перед выбором React Router, TanStack Router или Next.js?</summary><br>
<table><tr><td>

Нужны ли SSR/SSG, SEO, route-level data loading, type-safe routes, server functions, file-based routing и какой
deployment target. Если нужен только client-side routing, framework может быть лишним; если нужен fullstack rendering,
обычной router library может не хватить.

</td></tr></table>

</details>

### State management

#### Middle+ or Senior

<details>
<summary>Как выбрать state management?</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>

<details>
<summary>Когда достаточно <code>useState</code>?</summary><br>
<table><tr><td>

Когда состояние локально для одного компонента или небольшой ветки: открыта модалка, выбран tab, текст input. Если state
не нужен другим distant features, не стоит сразу добавлять global store.

</td></tr></table>

</details>

<details>
<summary>Когда нужен <code>useReducer</code>?</summary><br>
<table><tr><td>

Когда обновления связаны правилами и transitions становятся важнее отдельных setters: wizard, сложный фильтр, локальная
state machine. Это не замена Redux, а способ сделать локальные изменения предсказуемее.

</td></tr></table>

</details>

<details>
<summary>Когда выбрать Redux Toolkit, Zustand, Jotai или XState?</summary><br>
<table><tr><td>

Redux Toolkit подходит для сложного shared client state, strict conventions и devtools. Zustand проще для небольшого
shared state. Jotai может быть удобен для atom-based модели. XState стоит брать, когда домен естественно описывается
состояниями и переходами.

</td></tr></table>

</details>

<details>
<summary>Почему filters/pagination/tabs иногда лучше хранить в URL?</summary><br>
<table><tr><td>

URL state можно шарить ссылкой, восстанавливать после reload и использовать в browser history. Для React есть обычные
query params и специализированные helpers вроде `nuqs`; в Angular похожая идея живет в Router query params.

</td></tr></table>

</details>

<details>
<summary>Чем React state management отличается от Angular services + RxJS/signals?</summary><br>
<table><tr><td>

В Angular shared state часто живет в injectable services и опирается на RxJS или signals. В React shared state обычно
собирается из hooks, Context, store libraries и query layer. Главное в обоих мирах - разделять local UI state, server
state, URL state и domain transitions.

</td></tr></table>

</details>

### Data fetching

#### Junior

<details>
<summary>Что такое server state?</summary><br>
<table><tr><td>

Server state принадлежит серверу, может устаревать, требует cache, refetch, retry, invalidation и обработки concurrent
updates. Это не то же самое, что global client state вроде открытого sidebar или выбранной темы.

</td></tr></table>

</details>

#### Middle

<details>
<summary>Как выбрать data fetching?</summary><br>
<table><tr><td>

| Ситуация                               | Подход                          |
| -------------------------------------- | ------------------------------- |
| Учебный пример                         | `useEffect + fetch`             |
| SPA с REST API и cache                 | TanStack Query                  |
| Проект уже на Redux Toolkit            | RTK Query                       |
| GraphQL app                            | Apollo Client / urql / Relay    |
| Fullstack TypeScript app               | tRPC                            |
| Next.js App Router с server components | Server-side data fetching / RSC |

</td></tr></table>

</details>

<details>
<summary>Когда достаточно <code>useEffect + fetch</code>?</summary><br>
<table><tr><td>

Для маленького учебного примера или одноразового запроса без cache, retry, invalidation и shared ownership. В продукте
эта схема быстро обрастает ручной логикой loading/error/refetch и начинает дублироваться.

</td></tr></table>

</details>

<details>
<summary>Когда использовать RTK Query?</summary><br>
<table><tr><td>

RTK Query логичен, если команда уже использует Redux Toolkit и хочет держать API layer рядом с Redux conventions. Если
Redux в проекте не нужен, TanStack Query часто будет проще как отдельный server-state layer.

</td></tr></table>

</details>

<details>
<summary>Когда нужны Apollo Client, urql или Relay?</summary><br>
<table><tr><td>

Это GraphQL-клиенты. Apollo часто выбирают за ecosystem и привычный DX, urql - за более легкий и модульный подход,
Relay - за строгую модель data requirements и масштабирование больших GraphQL-приложений.

</td></tr></table>

</details>

#### Middle+ or Senior

<details>
<summary>Какие задачи решает TanStack Query?</summary><br>
<table><tr><td>

TanStack Query управляет server state: loading/error, cache, refetch, invalidation, retries, pagination и optimistic
updates. Это не replacement для Redux Toolkit, потому что Redux Toolkit обычно отвечает за client state и business flow.

</td></tr></table>

</details>

<details>
<summary>Как это сравнить с Angular <code>HttpClient</code> + service + RxJS?</summary><br>
<table><tr><td>

В Angular запросы часто оформляют в services на `HttpClient`, а orchestration делают через RxJS или signals. В React нет
встроенного `HttpClient`, поэтому команда выбирает `fetch`, axios, query library, GraphQL client, tRPC или server
functions.

</td></tr></table>

</details>

### Forms

#### Middle+ or Senior

<details>
<summary>Как выбрать forms layer?</summary><br>
<table><tr><td>

| Ситуация                                  | Подход                    |
| ----------------------------------------- | ------------------------- |
| Простые поля и Junior-практика            | controlled inputs         |
| Большая форма без render на каждый символ | React Hook Form           |
| Shared schema validation                  | Zod                       |
| Type-safe form state и field API          | TanStack Form             |
| Server-first forms                        | Conform                   |
| Старый проект                             | Formik / React Final Form |

</td></tr></table>

</details>

<details>
<summary>Что такое controlled и uncontrolled input?</summary><br>
<table><tr><td>

Controlled input хранит значение в React state и обновляет его через `onChange`. Uncontrolled input хранит значение в
DOM и читается через ref или form submit. Junior должен понимать controlled input, но в больших формах не всегда нужно
контролировать каждый символ вручную.

</td></tr></table>

</details>

<details>
<summary>Почему большие формы неудобно писать только на <code>useState</code>?</summary><br>
<table><tr><td>

Появляется много boilerplate: touched/dirty, validation, nested fields, arrays, server errors, submit state и
accessibility. Form library помогает держать эти состояния явно и не смешивать validation с JSX.

</td></tr></table>

</details>

<details>
<summary>Что дает React Hook Form?</summary><br>
<table><tr><td>

React Hook Form упрощает регистрацию полей, validation, errors и submit flow, часто с меньшим количеством re-render-ов.
Его часто комбинируют с Zod, чтобы одна schema описывала форму и типы.

</td></tr></table>

</details>

<details>
<summary>Когда смотреть в сторону TanStack Form или Conform?</summary><br>
<table><tr><td>

TanStack Form интересен, когда нужна строгая typed form model и хороший field-level API. Conform полезен в server-first
подходах, где form submission и validation тесно связаны с route actions или server actions.

</td></tr></table>

</details>

<details>
<summary>Чем React forms отличаются от Angular Reactive Forms?</summary><br>
<table><tr><td>

Angular Reactive Forms дают официальную модель `FormControl`, `FormGroup`, validators и statuses. React не имеет такого
встроенного слоя, поэтому команда выбирает между ручным state, uncontrolled-подходом и form libraries.

</td></tr></table>

</details>

### Styling и UI libraries

#### Junior

<details>
<summary>Что такое runtime CSS-in-JS и какие у него минусы?</summary><br>
<table><tr><td>

Runtime CSS-in-JS генерирует стили во время выполнения приложения. В современных SSR/RSC-приложениях это может добавить
runtime cost, усложнить streaming/rendering и создать интеграционные ограничения. Поэтому CSS Modules, Tailwind и
build-time варианты часто проще.

</td></tr></table>

</details>

#### Middle

<details>
<summary>Как выбрать styling и UI layer?</summary><br>
<table><tr><td>

| Ситуация                                    | Подход                                          |
| ------------------------------------------- | ----------------------------------------------- |
| Простая app-level стилизация                | plain CSS / CSS Modules                         |
| Быстрый product UI и utility-first workflow | Tailwind CSS + clsx                             |
| Typed build-time styles                     | vanilla-extract / PandaCSS                      |
| Готовые enterprise components               | MUI / Ant Design / PrimeReact                   |
| Собственная дизайн-система                  | Radix / Base UI / React Aria / Ark UI / Ariakit |
| Старый или специфичный стек                 | styled-components / Emotion                     |

</td></tr></table>

</details>

<details>
<summary>Какие подходы к styling есть в React?</summary><br>
<table><tr><td>

Обычный CSS, CSS Modules, Tailwind, build-time CSS-in-JS, runtime CSS-in-JS, design tokens и готовые UI libraries. Это
общие frontend-решения, не только React-темы; React лишь задает способ привязать их к component tree.

</td></tr></table>

</details>

<details>
<summary>Когда достаточно plain CSS или CSS Modules?</summary><br>
<table><tr><td>

Plain CSS подходит для небольших проектов и глобальных слоев. CSS Modules дают локальный scope классов без runtime cost
и хорошо работают в долгоживущих продуктах, где не нужен тяжелый styling framework.

</td></tr></table>

</details>

<details>
<summary>Почему Tailwind часто выбирают в React-проектах?</summary><br>
<table><tr><td>

Tailwind ускоряет сборку UI, хорошо сочетается с headless libraries и уменьшает переключение между JSX и CSS-файлами.
Минус - риск шумной разметки и необходимость дисциплины в design tokens и component boundaries.

</td></tr></table>

</details>

#### Middle+ or Senior

<details>
<summary>Чем component library отличается от headless UI library?</summary><br>
<table><tr><td>

Component library вроде MUI, Ant Design, Mantine или PrimeReact дает готовый внешний вид и поведение.
Headless/primitives подход вроде Radix, Base UI, React Aria, Ark UI, Ariakit или Headless UI дает accessibility и state
behavior, но внешний вид команда строит сама.

</td></tr></table>

</details>

<details>
<summary>Почему accessibility нельзя перекладывать только на UI library?</summary><br>
<table><tr><td>

Library может помочь с keyboard behavior и ARIA patterns, но не знает ваш контент, labels, error messages, focus flow и
product context. Как и в Angular, ответственность за итоговую доступность остается у команды.

</td></tr></table>

</details>

### Animation и charts

#### Middle

<details>
<summary>Когда достаточно CSS animations?</summary><br>
<table><tr><td>

Для hover/focus, простых transitions, skeletons и небольших enter/exit effects лучше начать с CSS. Animation library
нужна, когда есть сложные timelines, gestures, physics или координация нескольких элементов.

</td></tr></table>

</details>

<details>
<summary>Чем Motion отличается от GSAP?</summary><br>
<table><tr><td>

Motion хорошо ложится на React components и declarative UI transitions. GSAP сильнее в сложных timeline-анимациях,
скролл-сценариях и production motion design, но требует аккуратной интеграции с React lifecycle.

</td></tr></table>

</details>

<details>
<summary>Когда выбирать physics-based animation?</summary><br>
<table><tr><td>

Когда движение должно ощущаться как физическое: drag, spring transitions, gestures, interactive panels. Для обычного
fade/slide это часто лишняя зависимость и лишняя сложность.

</td></tr></table>

</details>

#### Middle+ or Senior

<details>
<summary>Когда использовать D3 напрямую, а когда chart library?</summary><br>
<table><tr><td>

D3 напрямую нужен для нестандартной визуализации, кастомных scales/layouts и полного контроля. Для dashboard чаще
быстрее взять Recharts, Tremor, nivo, Victory или react-chartjs. `visx` полезен, когда нужен D3-level контроль, но в
React-компонентной форме.

</td></tr></table>

</details>

<details>
<summary>Какие performance-риски есть у charts в React?</summary><br>
<table><tr><td>

Большие datasets, частые re-render-ы, тяжелые SVG trees, resize handlers и animations могут быстро стать hot path. Важно
агрегировать данные, memoize дорогие расчеты, виртуализировать списки рядом с charts и не пересоздавать config без
причины.

</td></tr></table>

</details>

### Testing

#### Middle+ or Senior

<details>
<summary>Как выбрать testing stack?</summary><br>
<table><tr><td>

| Ситуация                          | Подход                 |
| --------------------------------- | ---------------------- |
| Pure functions и hooks with logic | Vitest / Jest          |
| Component behavior                | React Testing Library  |
| Critical user flows               | Playwright / Cypress   |
| API mocking                       | MSW                    |
| Stable generated output           | Snapshot tests точечно |

</td></tr></table>

</details>

<details>
<summary>Чем Vitest отличается от Jest?</summary><br>
<table><tr><td>

Vitest хорошо интегрируется с Vite, быстрее стартует в Vite-проектах и использует похожий API. Jest остается зрелым
вариантом для старых проектов и ecosystem, но в новых Vite React apps Vitest часто проще.

</td></tr></table>

</details>

<details>
<summary>Что тестирует React Testing Library?</summary><br>
<table><tr><td>

RTL помогает тестировать поведение компонента глазами пользователя: текст, роли, формы, клики, ошибки. Она намеренно
отталкивает от проверки internal state и implementation details.

</td></tr></table>

</details>

<details>
<summary>Когда нужен Playwright?</summary><br>
<table><tr><td>

Для критичных end-to-end flows: login, checkout, создание сущности, routing, permissions, интеграция с backend или
browser APIs. Как и в Angular, E2E стоит использовать точечно, потому что они дороже unit/component tests.

</td></tr></table>

</details>

<details>
<summary>Что такое MSW и зачем он нужен?</summary><br>
<table><tr><td>

MSW перехватывает network requests и позволяет тестировать UI без настоящего backend. Это удобно для component и
integration tests, где важна реалистичная работа API layer.

</td></tr></table>

</details>

<details>
<summary>Когда snapshot tests полезны, а когда вредят?</summary><br>
<table><tr><td>

Полезны для стабильного generated output или маленьких структур, где snapshot действительно читают. Вредят, когда снимок
большой, часто обновляется и заменяет нормальные behavioral assertions.

</td></tr></table>

</details>

### Auth, backend и database

#### Middle+ or Senior

<details>
<summary>Почему auth - это не React-задача сама по себе?</summary><br>
<table><tr><td>

Auth связан с backend, cookies, sessions, OAuth/OIDC, CSRF/XSS, storage и deployment. React может показать login UI и
читать session state, но модель безопасности определяется сервером и инфраструктурой.

</td></tr></table>

</details>

<details>
<summary>Где хранить auth session?</summary><br>
<table><tr><td>

Для web-приложений часто безопаснее httpOnly cookies и server/session validation, чем хранить access token в
`localStorage`. В React state можно держать только derived UI state о пользователе, а не делать frontend единственным
источником правды.

</td></tr></table>

</details>

<details>
<summary>Когда использовать hosted auth provider?</summary><br>
<table><tr><td>

Clerk, Auth0, WorkOS AuthKit, Supabase Auth, Firebase Auth или AWS Cognito уместны, когда команда хочет быстрее получить
OAuth, SSO, MFA, user management и compliance features. Self-hosted auth оправдан, если есть сильные требования к
контролю, стоимости, данным или интеграции.

</td></tr></table>

</details>

<details>
<summary>Чем Next.js API routes отличаются от отдельного backend?</summary><br>
<table><tr><td>

API routes/server functions живут рядом с frontend и удобны для BFF, simple endpoints и server-side integration.
Отдельный backend лучше, когда есть независимый lifecycle, несколько клиентов, сложная domain model, очереди, фоновые
jobs или отдельная backend-команда.

</td></tr></table>

</details>

<details>
<summary>Когда Hono, Fastify, Express, NestJS или tRPC подходят для React-проекта?</summary><br>
<table><tr><td>

Hono/Fastify/Express подходят для легкого Node или edge backend. NestJS ближе Angular-разработчикам из-за DI, decorators
и module structure. tRPC особенно полезен, когда frontend и backend на TypeScript и команда хочет end-to-end type
safety.

</td></tr></table>

</details>

<details>
<summary>Чем Drizzle отличается от Prisma на уровне выбора?</summary><br>
<table><tr><td>

Prisma дает высокий DX, schema-first workflow и зрелый ecosystem. Drizzle ближе к SQL-like typed query builder и может
быть привлекательнее для команд, которым нужен более явный контроль SQL. В любом случае database layer не должен
зависеть от React.

</td></tr></table>

</details>

### Hosting

#### Middle

<details>
<summary>Как выбрать hosting?</summary><br>
<table><tr><td>

| Ситуация                            | Подход                                                 |
| ----------------------------------- | ------------------------------------------------------ |
| Static SPA                          | Firebase Hosting / Netlify / Vercel / Cloudflare Pages |
| Next.js с managed DX                | Vercel                                                 |
| Edge/serverless functions           | Cloudflare / Vercel / Netlify                          |
| Fullstack app с long-running server | Render / Fly.io / Railway                              |
| Больше контроля и дешевле infra     | VPS: DigitalOcean / Hetzner / Coolify                  |
| Enterprise cloud requirements       | AWS / Azure / Google Cloud                             |

</td></tr></table>

</details>

<details>
<summary>Почему Vercel часто выбирают для Next.js?</summary><br>
<table><tr><td>

Vercel тесно поддерживает Next.js features: SSR, ISR, App Router, serverless/edge functions и previews. Это хороший DX,
но важно понимать vendor lock-in и переносимость нестандартных возможностей.

</td></tr></table>

</details>

<details>
<summary>Когда Cloudflare интересен для React/fullstack React?</summary><br>
<table><tr><td>

Когда важны edge runtime, глобальная близость к пользователю, Cloudflare Pages/Workers и интеграция с KV, D1 или R2. Но
edge runtime имеет ограничения Node APIs, поэтому совместимость нужно проверять заранее.

</td></tr></table>

</details>

#### Middle+ or Senior

<details>
<summary>Чем hosting SPA отличается от hosting SSR-приложения?</summary><br>
<table><tr><td>

SPA можно раздать как static files через CDN. SSR-приложению нужен runtime: serverless functions, edge runtime или
long-running server. Это влияет на cache, secrets, logs, cold starts и стоимость.

</td></tr></table>

</details>

<details>
<summary>Что спросить перед выбором hosting provider?</summary><br>
<table><tr><td>

Нужен ли SSR, где живет backend, какие требования к regions, secrets, logs, previews, cache, compliance, budget и
rollback. Frontend-разработчик не обязан быть DevOps, но должен понимать, как deployment model влияет на React-стек.

</td></tr></table>

</details>

### i18n, rich text, upload и drag and drop

#### Middle+ or Senior

<details>
<summary>Почему i18n - это не просто словарь строк?</summary><br>
<table><tr><td>

i18n включает plural rules, dates, numbers, currencies, direction, fallback languages, routing, SEO и перевод контента.
Для React часто встречаются react-i18next, next-intl, Lingui и FormatJS, но базовые проблемы общие для всего frontend.

</td></tr></table>

</details>

<details>
<summary>Когда выбирать react-i18next или next-intl?</summary><br>
<table><tr><td>

react-i18next подходит для обычных React SPA и проектов, где нужен зрелый i18next ecosystem. next-intl логичен в
Next.js, особенно когда i18n связан с routing, server rendering и переводом metadata.

</td></tr></table>

</details>

<details>
<summary>Какие риски есть у rich text editor?</summary><br>
<table><tr><td>

Rich text - это schema, serialization, paste handling, history, collaboration, accessibility, security и migration
content model. Tiptap, BlockNote, Plate, Lexical и Slate выбирают не по названию, а по требованиям к редактору и данным.

</td></tr></table>

</details>

<details>
<summary>Как безопасно работать с HTML из rich text editor?</summary><br>
<table><tr><td>

Нужно sanitization, allowlist tags/attributes, осторожность с links/media и понимание, где HTML хранится и рендерится.
React escaping помогает для text nodes, но намеренный render HTML требует отдельной security проверки.

</td></tr></table>

</details>

<details>
<summary>Какие риски есть у file upload?</summary><br>
<table><tr><td>

Размеры файлов, типы, вирусы, private access, presigned URLs, retry, progress, cancellation и обработка ошибок. Иногда
достаточно native file input, иногда нужны Uppy, UploadThing или собственный flow через storage provider.

</td></tr></table>

</details>

<details>
<summary>Почему drag and drop сложнее, чем кажется?</summary><br>
<table><tr><td>

Нужно учитывать keyboard access, screen readers, touch devices, auto-scroll, collision detection, virtualization и
reordering state. dnd-kit часто лучше современного выбора, а react-beautiful-dnd стоит воспринимать как legacy context.

</td></tr></table>

</details>

### Mobile и desktop

#### Middle

<details>
<summary>Чем React Native отличается от React DOM?</summary><br>
<table><tr><td>

React Native использует React-модель компонентов, но рендерит native UI, а не DOM. Поэтому знание React помогает, но не
заменяет понимание mobile navigation, gestures, native modules, platform APIs и performance.

</td></tr></table>

</details>

<details>
<summary>Когда Expo упрощает разработку?</summary><br>
<table><tr><td>

Expo дает быстрый старт, managed workflow, OTA updates и готовые APIs для типовых mobile-задач. Он особенно полезен,
когда команда не хочет сразу погружаться в native build infrastructure.

</td></tr></table>

</details>

<details>
<summary>Когда нужен Electron, а когда Tauri может быть альтернативой?</summary><br>
<table><tr><td>

Electron подходит, когда нужно desktop-приложение на web stack и важна зрелая ecosystem. Tauri может быть легче по
ресурсам и размеру bundle, но требует учитывать Rust/backend integration и зрелость нужных plugins.

</td></tr></table>

</details>

<details>
<summary>Какие части можно переиспользовать между web и mobile?</summary><br>
<table><tr><td>

Обычно переиспользуют domain types, validation schemas, API client, query keys, business rules и design tokens. UI
components между React DOM и React Native обычно не переиспользуются напрямую, потому что primitives и accessibility
contracts разные.

</td></tr></table>

</details>

### Выбор стека на интервью

#### Middle

<details>
<summary>Какие требования продукта влияют на выбор React-стека?</summary><br>
<table><tr><td>

SPA или SSR, SEO или internal app, простые или enterprise forms, много server state или почти все локально, готовая UI
library или своя дизайн-система, monorepo или один app, deployment target, уровень команды, testing, accessibility,
performance и security.

</td></tr></table>

</details>

<details>
<summary>Как выбрать между Vite SPA, Next.js и Astro?</summary><br>
<table><tr><td>

Vite SPA - для client-side apps без сильных SEO/SSR требований. Next.js - для SSR/SSG/fullstack и routing conventions.
Astro - для content/static сайтов, где React нужен точечно и важно доставлять минимум JavaScript.

</td></tr></table>

</details>

<details>
<summary>Как объяснить trade-off между "меньше зависимостей" и "быстрее delivery"?</summary><br>
<table><tr><td>

Меньше зависимостей снижает maintenance и upgrade risk, но команда может тратить время на повторное изобретение сложных
вещей: forms, cache, accessibility primitives. Быстрее delivery через libraries оправдан, если команда понимает
стоимость ownership и exit strategy.

</td></tr></table>

</details>

<details>
<summary>Какие признаки overengineering и underengineering в React-проекте?</summary><br>
<table><tr><td>

Overengineering: global store для локальной кнопки, monorepo без нескольких packages, SSR без SEO/perf причины, слишком
много UI abstractions. Underengineering: ручной `fetch` без cache в большом продукте, формы без error model, styling без
tokens, отсутствие tests на критичные flows.

</td></tr></table>

</details>

#### Middle+ or Senior

<details>
<summary>Как выбрать data, state, forms, UI и testing libraries?</summary><br>
<table><tr><td>

Разделите ответственность: server state - query layer, client state - local/store, forms - отдельный form layer, UI -
design system или library, tests - pyramid от unit к E2E. Не выбирайте библиотеку, пока не понятно, какую проблему она
закрывает.

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

<details>
<summary>Что такое Vite?</summary><br>
<table><tr><td>

Vite - build tool и dev server, с которого часто начинают React SPA. Он не является React framework и не заменяет
router, data fetching или backend.

</td></tr></table>

</details>

<details>
<summary>Чем React Router отличается от React?</summary><br>
<table><tr><td>

React отвечает за component model и rendering. React Router - отдельная библиотека для навигации между страницами или
routes, поэтому ее нужно выбирать и настраивать отдельно.

</td></tr></table>

</details>

<details>
<summary>Что такое <code>fetch</code>?</summary><br>
<table><tr><td>

`fetch` - browser API для HTTP-запросов. В React его можно вызвать из effect или query layer, но сам React не дает
аналога Angular `HttpClient`.

</td></tr></table>

</details>

<details>
<summary>Что такое CSS Modules?</summary><br>
<table><tr><td>

CSS Modules позволяют писать обычный CSS с локальными class names для компонента. Это один из простых способов избежать
случайных конфликтов глобальных стилей.

</td></tr></table>

</details>

<details>
<summary>Что такое component library?</summary><br>
<table><tr><td>

Component library дает готовые UI-компоненты: buttons, dialogs, tables, forms и navigation. Важно понимать не только
внешний вид, но и accessibility, theming и ограничения API.

</td></tr></table>

</details>

<details>
<summary>Что такое React Hook Form на базовом уровне?</summary><br>
<table><tr><td>

React Hook Form - библиотека для форм, которая помогает регистрировать поля, валидировать данные, показывать ошибки и
обрабатывать submit. Ее обычно берут, когда ручной `useState` для формы становится шумным.

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

<details>
<summary>Когда выбирать TanStack Query?</summary><br>
<table><tr><td>

Когда приложение много работает с server state: cache, refetch, invalidation, retry, pagination, optimistic updates.
Если данные принадлежат серверу, query layer обычно лучше, чем складывать их в global client store.

</td></tr></table>

</details>

<details>
<summary>Когда нужен Zustand или Redux Toolkit?</summary><br>
<table><tr><td>

Zustand подходит для легкого shared client state без большого boilerplate. Redux Toolkit лучше, когда нужен строгий data
flow, devtools, middleware и единые conventions для сложного client state.

</td></tr></table>

</details>

<details>
<summary>Когда Context становится плохим решением?</summary><br>
<table><tr><td>

Когда через него пытаются хранить часто меняющийся большой state, cache server data или сложную business logic. Context
лучше использовать для передачи value вроде theme, locale или session summary.

</td></tr></table>

</details>

<details>
<summary>Чем server state отличается от global client state?</summary><br>
<table><tr><td>

Server state принадлежит backend и требует синхронизации. Global client state принадлежит UI или frontend domain flow:
например открытая панель, выбранные элементы, wizard state или локальные настройки.

</td></tr></table>

</details>

<details>
<summary>Как выбрать form library?</summary><br>
<table><tr><td>

Смотрите на размер формы, validation model, nested fields, server errors, accessibility, TypeScript DX и integration со
schema вроде Zod. Для простого input form library может быть лишней, для enterprise forms она часто окупается.

</td></tr></table>

</details>

<details>
<summary>Как тестировать React-компонент через RTL?</summary><br>
<table><tr><td>

Проверять то, что видит и делает пользователь: роли, labels, текст, ввод, click, submit, error messages. Не стоит
тестировать внутренний state компонента, если это не публичный contract.

</td></tr></table>

</details>

<details>
<summary>Когда нужен Playwright?</summary><br>
<table><tr><td>

Когда нужно проверить реальный пользовательский сценарий через browser: навигация, auth, формы, permissions, критичные
flows. Для маленькой pure-функции Playwright не нужен.

</td></tr></table>

</details>

<details>
<summary>Чем CSS Modules отличаются от Tailwind?</summary><br>
<table><tr><td>

CSS Modules дают локальный scope обычным CSS-классам. Tailwind дает utility classes и быстрый workflow прямо в JSX. Оба
подхода нормальны; выбор зависит от design process, команды и требований к UI consistency.

</td></tr></table>

</details>

<details>
<summary>Чем headless UI отличается от component library?</summary><br>
<table><tr><td>

Headless UI дает behavior, accessibility primitives и state API без готового визуального слоя. Component library дает
готовые компоненты с дизайном, но может сильнее ограничивать кастомизацию.

</td></tr></table>

</details>

### Middle+ or Senior

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

<details>
<summary>Как выбрать React stack для продукта?</summary><br>
<table><tr><td>

Начать с требований: SPA/SSR, SEO, forms, server state, design system, team skill, deployment, testing и accessibility.
Затем выбрать минимальный набор решений, который закрывает эти требования без лишней platform complexity.

</td></tr></table>

</details>

<details>
<summary>Как спроектировать data layer?</summary><br>
<table><tr><td>

Разделить API client, query keys, server state, mutations, invalidation и error model. UI-компоненты не должны знать
низкоуровневые детали endpoint-ов, а domain logic не должна зависеть от React без причины.

</td></tr></table>

</details>

<details>
<summary>Как спроектировать forms layer?</summary><br>
<table><tr><td>

Выбрать form library, договориться о schema validation, server errors, field components, accessibility и submit flow.
Для Angular-разработчика это аналог решения, где проходит граница между Reactive Forms model и UI.

</td></tr></table>

</details>

<details>
<summary>Как спроектировать UI layer?</summary><br>
<table><tr><td>

Определить tokens, primitives, component API, theming, accessibility rules и ownership дизайн-системы. В mixed Angular +
React окружении лучше разделять общие tokens/specs и framework-specific adapters.

</td></tr></table>

</details>

<details>
<summary>Как избежать хаоса в dependencies?</summary><br>
<table><tr><td>

Фиксировать критерии выбора библиотек, назначать owners, обновлять зависимости регулярно и не добавлять новую library
для локальной задачи без review. Хороший React stack - это не максимальный список packages, а понятные boundaries.

</td></tr></table>

</details>

<details>
<summary>Как ввести React в Angular-команду?</summary><br>
<table><tr><td>

Начать с ограниченного use case, shared coding guidelines, обучения React mental model и code review checklist. Особенно
важно проговорить отличия: hooks, immutable state, effects, Context и отсутствие встроенных Angular-like слоев.

</td></tr></table>

</details>

<details>
<summary>Как организовать monorepo с Angular и React?</summary><br>
<table><tr><td>

Выделить apps и libs, запретить случайные зависимости между фреймворками, вынести framework-agnostic domain logic,
tokens и tooling. Nx часто удобен для Angular + React monorepo, потому что дает project graph и affected commands.

</td></tr></table>

</details>

<details>
<summary>Как выбрать между Next.js, Vite SPA и Astro?</summary><br>
<table><tr><td>

Vite SPA - для client-side приложений, Next.js - для SSR/SSG/fullstack и SEO, Astro - для content/static сайтов с
точечной интерактивностью. Выбор должен идти от продукта, а не от популярности framework-а.

</td></tr></table>

</details>

<details>
<summary>Как оценить риски SSR/hydration?</summary><br>
<table><tr><td>

Проверить browser-only code, auth/session model, cache, dates/locales/random values, third-party widgets и deployment
runtime. Hydration mismatch часто появляется там, где server render и первый client render видят разные данные.

</td></tr></table>

</details>

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

<details>
<summary>Как принимать архитектурное решение о React-стеке?</summary><br>
<table><tr><td>

Зафиксировать требования, альтернативы, trade-offs, риски, migration path и критерии пересмотра решения. Senior-ответ
должен показывать не вкус к библиотекам, а ownership и способность поддерживать стек несколько лет.

</td></tr></table>

</details>

<details>
<summary>Как сравнить Angular platform и React ecosystem?</summary><br>
<table><tr><td>

Angular platform дает единый framework contract и официальные решения для многих слоев. React ecosystem дает гибкость,
но требует больше локальных соглашений, dependency governance и архитектурного review.

</td></tr></table>

</details>

<details>
<summary>Какие риски vendor lock-in в Next.js/Vercel?</summary><br>
<table><tr><td>

Риск не в самом Next.js, а в использовании platform-specific функций без exit strategy: edge/runtime assumptions,
deployment APIs, cache behavior, analytics, image pipeline. Перед выбором нужно понять, насколько легко перенести app на
другой runtime.

</td></tr></table>

</details>

<details>
<summary>Когда React ecosystem становится минусом?</summary><br>
<table><tr><td>

Когда команда постоянно меняет libraries, спорит о вкусе вместо требований, дублирует решения и не имеет platform
ownership. В таком контексте Angular-like единая платформа может быть продуктивнее.

</td></tr></table>

</details>

<details>
<summary>Как контролировать dependency sprawl?</summary><br>
<table><tr><td>

Вести approved stack, dependency review, bundle checks, upgrade policy и ownership. Любая новая library должна иметь
понятную проблему, альтернативы и план поддержки.

</td></tr></table>

</details>

<details>
<summary>Как сделать framework-agnostic domain layer?</summary><br>
<table><tr><td>

Держать domain types, validation, business rules и pure transformations в TypeScript modules без React и Angular
imports. Framework-specific code должен быть adapter layer: components, hooks, services, effects и routing.

</td></tr></table>

</details>

<details>
<summary>Как выбрать state/data/forms libraries на 3-5 лет?</summary><br>
<table><tr><td>

Оценивать зрелость, maintenance, release cadence, TypeScript support, ecosystem, hiring, migration path и соответствие
продуктовым требованиям. Популярность важна, но не заменяет ownership cost.

</td></tr></table>

</details>

<details>
<summary>Как оценить зрелость библиотеки?</summary><br>
<table><tr><td>

Смотреть на active maintenance, breaking changes, issue velocity, docs, adoption, bundle impact, testability, security
history и совместимость с текущим framework/runtime. Для critical path нужна более высокая планка, чем для dev-only
tooling.

</td></tr></table>

</details>

<details>
<summary>Как выстроить frontend platform для нескольких стеков?</summary><br>
<table><tr><td>

Разделить общие стандарты и framework adapters: design tokens, accessibility rules, CI, testing conventions,
observability, security и release process. Angular и React apps могут отличаться реализацией, но platform contract
должен оставаться единым.

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

### Middle+ or Senior

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

### Middle+ or Senior

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

## Рекомендуемый порядок изучения

### Middle+ or Senior

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

## React и Next.js

### Middle

<details>
<summary>Как сравнить Context, Redux и Zustand на интервью?</summary><br>
<table><tr><td>

Context удобен для редко меняющихся сквозных значений: theme, locale, current user. Он не является полноценным store:
при изменении value все consumers могут получить render work, если не разделить context или не мемоизировать value.

Redux уместен, когда важны предсказуемые transitions, devtools, middleware, time travel, строгие правила обновления и
большая команда. Zustand проще и легче для локальных client stores без большого boilerplate.

Angular-разработчику важно сравнить это не с DI, а с управлением состоянием: Angular service с signals или RxJS может
занимать ту же нишу, что store, а DI только доставляет зависимость.

```tsx
const ThemeContext = createContext<'light' | 'dark'>('light');

function Toolbar(): ReactNode {
  const theme = useContext(ThemeContext);

  return <button className={theme}>Save</button>;
}
```

</td></tr></table>

</details>

### Middle+ or Senior

<details>
<summary>Чем <code>useTransition</code> отличается от <code>useDeferredValue</code>?</summary><br>
<table><tr><td>

`useTransition` помечает state update как некритичный: React может отложить дорогой render, чтобы input, click и другие
срочные реакции оставались отзывчивыми. `useDeferredValue` откладывает потребление уже изменившегося значения, например
поисковую строку для тяжелого списка.

Для Angular-разработчика полезная аналогия: это не то же самое, что `debounceTime` в RxJS. Debounce меняет поток событий
и timing данных, а concurrent rendering управляет приоритетом rendering work внутри React.

```tsx
const [isPending, startTransition] = useTransition();
const deferredQuery = useDeferredValue(query);

function onChange(value: string): void {
  setQuery(value);
  startTransition(() => {
    setVisibleItems(filterItems(value));
  });
}
```

**Follow-up вопросы:**

- Почему эти hooks не ускоряют саму дорогую функцию?
- Как понять, что проблема именно в render, а не в network?
- Где лучше оставить обычную оптимизацию данных или virtualization?

</td></tr></table>

</details>

<details>
<summary>Что важно знать про Next.js App Router?</summary><br>
<table><tr><td>

App Router строится вокруг `app/`, nested layouts, Server Components, route handlers, loading/error states и cache
модели Next.js. Server Component выполняется на сервере и не попадает в client bundle, а Client Component нужен для
state, effects, browser APIs и event handlers.

С Angular SSR это похоже только верхнеуровнево: оба подхода могут отдавать HTML с сервера, но Next.js сильнее связывает
routing, data fetching, server/client boundary и deployment runtime с framework conventions.

```tsx
// app/users/[id]/page.tsx
export default async function UserPage({params}: {params: Promise<{id: string}>}) {
  const {id} = await params;
  const user = await loadUser(id);

  return <h1>{user.name}</h1>;
}
```

**Частые ошибки:**

- добавлять `'use client'` слишком высоко и раздувать client bundle;
- ожидать browser API в Server Component;
- путать route handler с client-side API layer;
- не понимать cache и revalidation.

</td></tr></table>

</details>

## Практика по React

### Middle

<details>
<summary>Практическая задача: напишите <code>useWindowSize</code> с SSR-safe поведением.</summary><br>
<table><tr><td>

**Что проверяет:** custom hooks, cleanup, SSR, browser APIs.

```ts
import {useEffect, useState} from 'react';

interface WindowSize {
  readonly width: number;
  readonly height: number;
}

const initialSize: WindowSize = {
  width: 0,
  height: 0,
};

export function useWindowSize(): WindowSize {
  const [size, setSize] = useState(initialSize);

  useEffect(() => {
    const updateSize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  return size;
}
```

На интервью стоит обсудить initial value для SSR, throttle/debounce для частых resize events и то, почему доступ к
`window` находится внутри `useEffect`.

</td></tr></table>

</details>

### Middle+ or Senior

<details>
<summary>Практическая задача: реализуйте autocomplete в React.</summary><br>
<table><tr><td>

Кандидат должен показать controlled input, loading/error/empty states, отмену устаревших запросов, keyboard navigation и
доступную разметку combobox/listbox. Минимальная production-форма:

- хранить `query`, `items`, `activeIndex`, `status`;
- отменять предыдущий `fetch` через `AbortController`;
- не показывать результат старого запроса после более нового;
- поддержать Arrow Up, Arrow Down, Enter и Escape;
- задать roles и доступное имя.

```tsx
const [query, setQuery] = useState('');
const [items, setItems] = useState<ReadonlyArray<Suggestion>>([]);

useEffect(() => {
  const controller = new AbortController();

  fetch(`/api/suggest?q=${encodeURIComponent(query)}`, {
    signal: controller.signal,
  })
    .then((response) => response.json())
    .then(setItems)
    .catch((error: unknown) => {
      if (!isAbortError(error)) {
        setItems([]);
      }
    });

  return () => {
    controller.abort();
  };
}, [query]);
```

Angular-разработчику можно предложить сравнить решение с Angular Signals + `HttpClient` + CDK a11y primitives.

</td></tr></table>

</details>
