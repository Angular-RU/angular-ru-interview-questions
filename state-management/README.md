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

### Связь с Angular

Этот раздел держит framework-agnostic теорию: Redux, MobX, store, actions, reducers, selectors, side effects и
immutability. Angular-specific применение вынесено в
[Управление состоянием в Angular](../angular/README.md#управление-состоянием): signals, scoped services, RxJS store
services, NgRx/NGXS/Akita и facade pattern.
