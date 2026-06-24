## State Management

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
<summary>Чем MobX отличается от Redux?</summary><br>
<table><tr><td>

Redux делает события и переходы состояния явными через actions/reducers. MobX больше опирается на observable graph и
автоматические reactions, поэтому бывает лаконичнее. При неаккуратном дизайне поток изменений сложнее проследить.

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
<summary>Когда MobX может быть удобнее Redux?</summary><br>
<table><tr><td>

Когда важна лаконичная модель объектов, много computed dependencies и команда принимает runtime-реактивность. Redux
удобнее, если нужен строгий event log и максимально явный flow. Выбор зависит от требований к debugging и культуре
команды.

</td></tr></table>

</details>

### Angular state management

<details>
<summary>Какие способы управления состоянием есть в Angular?</summary><br>
<table><tr><td>

Локальные fields/signals, services с signals, RxJS services, Router/URL, query caches и stores вроде NgRx. Выбор зависит
от scope, lifetime, async complexity и числа consumers. Не все состояние должно быть глобальным.

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

<details>
<summary>Когда достаточно сервиса с signal?</summary><br>
<table><tr><td>

Для синхронного feature state с несколькими consumers и понятными methods обновления. Сервис владеет writable signals и
наружу отдает readonly state/computed values. Scope provider определяет lifetime.

</td></tr></table>

</details>

<details>
<summary>Когда использовать RxJS store service?</summary><br>
<table><tr><td>

Когда состояние строится из HTTP, WebSocket, cancellation, debounce и нескольких async streams. RxJS хорошо выражает
время, конкуренцию и backpressure. Следует избегать ручных nested subscriptions и скрытого mutable state.

</td></tr></table>

</details>

<details>
<summary>Когда использовать NgRx?</summary><br>
<table><tr><td>

Для большого shared state, сложных effects, entity collections, строгих conventions и сильной потребности в DevTools.
NgRx полезен нескольким командам с общим domain flow. Для локального feature его ceremony может быть избыточной.

</td></tr></table>

</details>

<details>
<summary>Чем Signals отличаются от Redux-подхода?</summary><br>
<table><tr><td>

Signals — реактивный primitive чтения и записи, а не готовая архитектура событий. Redux задает store, actions, reducers
и однонаправленный event flow. На signals можно построить разные architectures, включая Redux-подобную.

</td></tr></table>

</details>

<details>
<summary>Чем NgRx отличается от обычного сервиса?</summary><br>
<table><tr><td>

NgRx предоставляет стандартизированные actions, reducers, selectors, effects, DevTools и entity tools. Сервис оставляет
структуру и discipline команде и обычно требует меньше кода. Чем больше contributors и workflows, тем ценнее единые
conventions.

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
<summary>Как не превратить сервис состояния в god object?</summary><br>
<table><tr><td>

Разделять state по feature/domain ownership, держать commands узкими и выносить data access отдельно. Не смешивать
несвязанные формы, router, HTTP и analytics в одном singleton. Public API должен быть меньше внутренней реализации.

</td></tr></table>

</details>
