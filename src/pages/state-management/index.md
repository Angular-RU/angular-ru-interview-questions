---
layout: ../../layouts/Layout.astro
title: State Management
description: Client state, server state, URL state, forms, cache, normalization и state managers
category: Frontend
kind: questions
order: 140
---

## State Management

### Типы состояния

<details>
<summary>Чем client state отличается от server state?</summary><br>
<table><tr><td>

Client state принадлежит интерфейсу: выбранная вкладка, открытый dropdown, черновик формы, текущий шаг wizard. Его
источник истины находится в приложении, поэтому UI сам решает lifetime, defaults и правила изменения.

Server state приходит из backend: профиль пользователя, список заказов, права доступа, справочники. У него есть внешний
владелец, latency, ошибки, stale data, refetch, кеширование и конкуренция запросов.

Ошибочно хранить все server state как обычный client store. Для server state часто важнее query/cache layer:
invalidation, deduplication, retry, background refresh и optimistic updates. Для client state важнее понятные
transitions и близость к месту использования.

</td></tr></table>

</details>

<details>
<summary>Что такое URL state, form state и cache state?</summary><br>
<table><tr><td>

URL state - состояние, которое должно переживать refresh, copy link и browser navigation: route params, query params,
filters, pagination, selected tab, search string. Его лучше держать в URL, а не только в store.

Form state - значения, touched/dirty, validation errors, disabled/loading status и submit lifecycle. Для формы обычно
нужен специализированный form layer, потому что правила валидации и UX важнее глобального доступа.

Cache state - локальная копия server data с metadata: freshness, loading, error, last updated, inflight request,
pagination cursor. Cache state должен иметь понятные правила invalidation, иначе UI начинает показывать случайно
устаревшие данные.

</td></tr></table>

</details>

<details>
<summary>Что такое normalized state?</summary><br>
<table><tr><td>

Normalized state хранит entities по id и отдельно хранит списки id или связи между entities. Вместо вложенных копий
одного пользователя в десяти местах есть один `users.byId[userId]`, а экраны собирают нужную форму через selectors.

Такой подход уменьшает дублирование, упрощает updates и помогает поддерживать consistency. Он особенно полезен для
сложных доменных данных: users, orders, comments, permissions, products.

Минус - больше инфраструктуры и selectors. Для простого экрана с одним response object normalization может быть лишней.
Нормализуют, когда одни и те же entities живут в нескольких views, часто обновляются независимо или участвуют в
отношениях.

</td></tr></table>

</details>

<details>
<summary>Что такое state machine и когда смотреть на XState?</summary><br>
<table><tr><td>

State machine описывает конечный набор состояний и допустимые переходы между ними. Вместо набора boolean flags вроде
`isLoading`, `isOpen`, `hasError`, `isSubmitted` модель явно говорит: `idle`, `loading`, `success`, `error`,
`confirming`, `submitted`.

XState и похожие библиотеки полезны, когда flow имеет много шагов, guards, retries, параллельные состояния или строгие
переходы: checkout, onboarding, upload, auth, wizard, сложные модальные сценарии.

State machine не нужна для каждого dropdown или формы из двух полей. Ее стоимость окупается, когда текущий код уже
содержит противоречивые flags, неявные переходы и edge cases, которые сложно проверить тестами.

</td></tr></table>

</details>

<details>
<summary>Когда не нужен state manager?</summary><br>
<table><tr><td>

State manager не нужен автоматически. Часто достаточно локального component state, URL, form layer, query/cache layer
или простого feature service.

Признаки, что отдельный manager будет лишним:

- state используется одним component subtree;
- данные полностью принадлежат форме;
- источник истины уже в URL;
- проблема в server cache, а не в client transitions;
- actions будут только повторять setters;
- команда не получает пользы от devtools, event history или единых conventions.

Хорошее правило: сначала colocated state и явный ownership, потом общий service или cache, и только затем полноценный
store, если появилась реальная координационная сложность.

</td></tr></table>

</details>

<details>
<summary>Как выбирать между signals, service, RxJS, NgRx, Redux, Zustand и TanStack Query?</summary><br>
<table><tr><td>

Выбор начинается не с библиотеки, а с типа состояния и владельца данных.

| Задача                                                 | Что обычно подходит                               |
| ------------------------------------------------------ | ------------------------------------------------- |
| Локальный synchronous UI state в Angular               | `signal()`, `computed()`                          |
| Shared feature state в Angular                         | service с readonly signals и узкими methods       |
| Async orchestration, cancellation, WebSocket, debounce | RxJS service                                      |
| Большое Angular-приложение со строгими conventions     | NgRx                                              |
| Большое React-приложение со строгими conventions       | Redux Toolkit                                     |
| Небольшой shared client state в React                  | Zustand                                           |
| Server state, cache, refetch, optimistic updates       | TanStack Query или framework-specific query layer |
| Явный многошаговый flow с ограниченными переходами     | state machine, например XState                    |

Signals и Zustand хорошо решают простой client state. RxJS силен там, где важны время и async streams. NgRx и Redux
Toolkit оправданы, когда нужны event log, devtools, selectors, normalized entities и единый подход большой команды.
TanStack Query не заменяет client store: она решает server state, cache и синхронизацию с backend.

На интервью полезно проговорить trade-off: чем сложнее инструмент, тем яснее должна быть проблема, которую он окупает.

</td></tr></table>

</details>

### Redux

<details>
<summary>Что такое Redux?</summary><br>
<table><tr><td>

Redux — библиотека управления состоянием с единым store и явными событиями. Новое состояние вычисляется reducers из
предыдущего состояния и action. Обычно используют Redux Toolkit, который уменьшает boilerplate и безопасно применяет
immutable updates.

</td></tr></table>

</details>

<details>
<summary>Какие основные идеи Redux?</summary><br>
<table><tr><td>

State хранится централизованно, изменения описываются actions, а reducers вычисляют следующий state предсказуемо.
Однонаправленный поток облегчает tracing и replay. Side effects выносят за пределы reducers.

</td></tr></table>

</details>

<details>
<summary>Что такое store?</summary><br>
<table><tr><td>

Store хранит текущее state tree, принимает actions через `dispatch` и уведомляет subscribers. Он также объединяет
reducers и middleware. Store не обязан содержать все локальное UI-состояние приложения.

</td></tr></table>

</details>

<details>
<summary>Что такое action?</summary><br>
<table><tr><td>

Action — обычный объект, описывающий произошедшее событие, обычно с полем `type` и payload. Хорошее имя отражает domain
event, а не инструкцию изменения каждого поля. Actions должны быть сериализуемыми, если важны DevTools и persistence.

</td></tr></table>

</details>

<details>
<summary>Что такое reducer?</summary><br>
<table><tr><td>

Reducer — функция `(state, action) => nextState`. Она обрабатывает известные actions и возвращает прежний state для
остальных. Reducer не выполняет HTTP, timers и случайные вычисления.

```js
function counterReducer(state = {count: 0}, action) {
  switch (action.type) {
    case 'increment':
      return {...state, count: state.count + 1};

    default:
      return state;
  }
}
```

</td></tr></table>

</details>

<details>
<summary>Почему reducer должен быть чистой функцией?</summary><br>
<table><tr><td>

Одинаковые входы должны давать одинаковый результат без внешних side effects. Это делает обновления тестируемыми,
поддерживает replay и time-travel debugging. I/O выполняет middleware или отдельный orchestration layer.

</td></tr></table>

</details>

<details>
<summary>Что такое immutable update?</summary><br>
<table><tr><td>

Это создание нового объекта для изменившейся ветки вместо мутации существующего state. Ссылочное сравнение позволяет
быстро определить изменения. Redux Toolkit использует Immer, поэтому внутри reducer можно писать mutation-like syntax с
immutable результатом.

</td></tr></table>

</details>

<details>
<summary>Что такое selector?</summary><br>
<table><tr><td>

Selector читает или вычисляет данные из store. Memoized selector не пересчитывает результат, пока его входные ссылки не
изменились. Сложную derivation logic лучше держать в selectors, а не компонентах.

</td></tr></table>

</details>

<details>
<summary>Что такое middleware?</summary><br>
<table><tr><td>

Middleware перехватывает dispatch между caller и reducer. Оно используется для async flows, logging, analytics и
обработки ошибок. Middleware не должно скрывать критичную бизнес-логику без наблюдаемых actions.

</td></tr></table>

</details>

<details>
<summary>Что такое side effects в Redux?</summary><br>
<table><tr><td>

Это HTTP, storage, timers, navigation, случайность и любое взаимодействие вне чистого reducer. Их реализуют thunk, saga,
observable middleware или listener middleware. Результат обычно возвращается в store новым action.

</td></tr></table>

</details>

<details>
<summary>Какие плюсы Redux?</summary><br>
<table><tr><td>

Явный поток данных, хорошие DevTools, предсказуемые updates, testability и удобная диагностика сложных сценариев.
Центральный event log полезен большим командам. Экосистема предлагает устойчивые patterns для normalized data.

</td></tr></table>

</details>

<details>
<summary>Какие минусы Redux?</summary><br>
<table><tr><td>

Дополнительные actions, reducers, selectors и async conventions увеличивают объем кода и порог входа. Глобальный store
легко перегрузить локальным state. Плохая granularity вызывает лишние updates и связанность features.

</td></tr></table>

</details>

<details>
<summary>Когда Redux оправдан?</summary><br>
<table><tr><td>

Когда много удаленных компонентов используют общее сложное состояние, важны audit/debugging и несколько команд меняют
одни domain entities. Он полезен для долгоживущих async workflows и normalized caches. Решение должно окупать
инфраструктуру.

</td></tr></table>

</details>

<details>
<summary>Когда Redux будет лишним усложнением?</summary><br>
<table><tr><td>

Для формы, раскрытия панели или данных одного feature часто достаточно component state или query cache. Если actions
лишь дублируют простые setters, архитектура не дает пользы. Начинать лучше с colocated state.

</td></tr></table>

</details>

### MobX

<details>
<summary>Что такое MobX?</summary><br>
<table><tr><td>

MobX — реактивная библиотека, которая отслеживает чтения observable state и автоматически обновляет зависящие
computations и views. Код часто выглядит как обычные объекты и методы. Связи формируются динамически во время
выполнения.

</td></tr></table>

</details>

<details>
<summary>Что такое observable state?</summary><br>
<table><tr><td>

Это состояние, чтения и изменения которого отслеживает MobX. Когда observable меняется, зависимые computed values и
reactions инвалидируются. Изменения обычно группируют в actions.

</td></tr></table>

</details>

<details>
<summary>Что такое computed value?</summary><br>
<table><tr><td>

Computed — производное значение из observables. MobX кеширует его и пересчитывает при изменении реально прочитанных
dependencies. Computed должен быть чистым и не выполнять I/O.

</td></tr></table>

</details>

<details>
<summary>Что такое reaction?</summary><br>
<table><tr><td>

Reaction запускает side effect при изменении наблюдаемого выражения. Его используют для persistence, analytics или
интеграции с внешним API. Reaction нужно уничтожать, когда заканчивается lifetime владельца.

</td></tr></table>

</details>

<details>
<summary>Какие плюсы MobX?</summary><br>
<table><tr><td>

Меньше boilerplate, естественная объектная модель и точные updates по фактически прочитанным dependencies. Удобен для
богатых domain models и сложных производных значений. Быстро внедряется в локальные features.

</td></tr></table>

</details>

<details>
<summary>Какие минусы MobX?</summary><br>
<table><tr><td>

Динамический dependency graph и скрытая реактивность могут усложнить tracing. Легко создать side effects с неочевидным
lifecycle или чрезмерно mutable shared model. Нужны соглашения о actions, ownership и disposal.

</td></tr></table>

</details>

<details>
<summary>Чем MobX отличается от Redux?</summary><br>
<table><tr><td>

Redux делает события и переходы состояния явными через actions/reducers. MobX больше опирается на observable graph и
автоматические reactions, поэтому бывает лаконичнее. При неаккуратном дизайне поток изменений сложнее проследить.

</td></tr></table>

</details>

<details>
<summary>Когда MobX может быть удобнее Redux?</summary><br>
<table><tr><td>

Когда важна лаконичная модель объектов, много computed dependencies и команда принимает runtime-реактивность. Redux
удобнее, если нужен строгий event log и максимально явный flow. Выбор зависит от требований к debugging и культуре
команды.

</td></tr></table>

</details>

### Связь с Angular и React

Этот раздел держит framework-agnostic теорию: Redux, MobX, store, actions, reducers, selectors, side effects и
immutability. Angular-specific применение вынесено в
[Управление состоянием в Angular](../angular/index.md#управление-состоянием): signals, scoped services, RxJS store
services, NgRx/NGXS/Akita и facade pattern. React-specific применение раскрыто в
[управлении состоянием React](../react/index.md#state-management): Context, Redux Toolkit, Zustand, TanStack Query и
границы между client state и server state.
