# State Management — вопросы и ответы, часть 1

> Автоматически сгенерировано из src/pages/state-management/index.md. Не редактируйте вручную.

## State Management

### Типы состояния



#### Вопрос: Чем client state отличается от server state?

**Короткий ответ**

Client state принадлежит интерфейсу: выбранная вкладка, открытый dropdown, черновик формы, текущий шаг wizard. Его
источник истины находится в приложении, поэтому UI сам решает lifetime, defaults и правила изменения.

**Полный ответ**

Client state принадлежит интерфейсу: выбранная вкладка, открытый dropdown, черновик формы, текущий шаг wizard. Его
источник истины находится в приложении, поэтому UI сам решает lifetime, defaults и правила изменения.

Server state приходит из backend: профиль пользователя, список заказов, права доступа, справочники. У него есть внешний
владелец, latency, ошибки, stale data, refetch, кеширование и конкуренция запросов.

Ошибочно хранить все server state как обычный client store. Для server state часто важнее query/cache layer:
invalidation, deduplication, retry, background refresh и optimistic updates. Для client state важнее понятные
transitions и близость к месту использования.





#### Вопрос: Что такое URL state, form state и cache state?

**Короткий ответ**

URL state - состояние, которое должно переживать refresh, copy link и browser navigation: route params, query params,
filters, pagination, selected tab, search string. Его лучше держать в URL, а не только в store.

**Полный ответ**

URL state - состояние, которое должно переживать refresh, copy link и browser navigation: route params, query params,
filters, pagination, selected tab, search string. Его лучше держать в URL, а не только в store.

Form state - значения, touched/dirty, validation errors, disabled/loading status и submit lifecycle. Для формы обычно
нужен специализированный form layer, потому что правила валидации и UX важнее глобального доступа.

Cache state - локальная копия server data с metadata: freshness, loading, error, last updated, inflight request,
pagination cursor. Cache state должен иметь понятные правила invalidation, иначе UI начинает показывать случайно
устаревшие данные.





#### Вопрос: Что такое normalized state?

**Короткий ответ**

Normalized state хранит entities по id и отдельно хранит списки id или связи между entities. Вместо вложенных копий
одного пользователя в десяти местах есть один users.byId[userId], а экраны собирают нужную форму через selectors.

**Полный ответ**

Normalized state хранит entities по id и отдельно хранит списки id или связи между entities. Вместо вложенных копий
одного пользователя в десяти местах есть один `users.byId[userId]`, а экраны собирают нужную форму через selectors.

Такой подход уменьшает дублирование, упрощает updates и помогает поддерживать consistency. Он особенно полезен для
сложных доменных данных: users, orders, comments, permissions, products.

Минус - больше инфраструктуры и selectors. Для простого экрана с одним response object normalization может быть лишней.
Нормализуют, когда одни и те же entities живут в нескольких views, часто обновляются независимо или участвуют в
отношениях.





#### Вопрос: Что такое state machine и когда смотреть на XState?

**Короткий ответ**

State machine описывает конечный набор состояний и допустимые переходы между ними. Вместо набора boolean flags вроде
isLoading, isOpen, hasError, isSubmitted модель явно говорит: idle, loading, success, error, confirming, submitted.

**Полный ответ**

State machine описывает конечный набор состояний и допустимые переходы между ними. Вместо набора boolean flags вроде
`isLoading`, `isOpen`, `hasError`, `isSubmitted` модель явно говорит: `idle`, `loading`, `success`, `error`,
`confirming`, `submitted`.

XState и похожие библиотеки полезны, когда flow имеет много шагов, guards, retries, параллельные состояния или строгие
переходы: checkout, onboarding, upload, auth, wizard, сложные модальные сценарии.

State machine не нужна для каждого dropdown или формы из двух полей. Ее стоимость окупается, когда текущий код уже
содержит противоречивые flags, неявные переходы и edge cases, которые сложно проверить тестами.





#### Вопрос: Когда не нужен state manager?

**Короткий ответ**

State manager не нужен автоматически. Часто достаточно локального component state, URL, form layer, query/cache layer
или простого feature service.

**Полный ответ**

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





#### Вопрос: Как выбирать между signals, service, RxJS, NgRx, Redux, Zustand и TanStack Query?

**Короткий ответ**

Выбор начинается не с библиотеки, а с типа состояния и владельца данных.

**Полный ответ**

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



### Redux



#### Вопрос: Что такое Redux?

**Короткий ответ**

Redux — библиотека управления состоянием с единым store и явными событиями. Новое состояние вычисляется reducers из
предыдущего состояния и action. Обычно используют Redux Toolkit, который уменьшает boilerplate и безопасно применяет
immutable updates.

**Полный ответ**

Redux — библиотека управления состоянием с единым store и явными событиями. Новое состояние вычисляется reducers из
предыдущего состояния и action. Обычно используют Redux Toolkit, который уменьшает boilerplate и безопасно применяет
immutable updates.





#### Вопрос: Какие основные идеи Redux?

**Короткий ответ**

State хранится централизованно, изменения описываются actions, а reducers вычисляют следующий state предсказуемо.
Однонаправленный поток облегчает tracing и replay. Side effects выносят за пределы reducers.

**Полный ответ**

State хранится централизованно, изменения описываются actions, а reducers вычисляют следующий state предсказуемо.
Однонаправленный поток облегчает tracing и replay. Side effects выносят за пределы reducers.





#### Вопрос: Что такое store?

**Короткий ответ**

Store хранит текущее state tree, принимает actions через dispatch и уведомляет subscribers. Он также объединяет reducers
и middleware. Store не обязан содержать все локальное UI-состояние приложения.

**Полный ответ**

Store хранит текущее state tree, принимает actions через `dispatch` и уведомляет subscribers. Он также объединяет
reducers и middleware. Store не обязан содержать все локальное UI-состояние приложения.





#### Вопрос: Что такое action?

**Короткий ответ**

Action — обычный объект, описывающий произошедшее событие, обычно с полем type и payload. Хорошее имя отражает domain
event, а не инструкцию изменения каждого поля. Actions должны быть сериализуемыми, если важны DevTools и persistence.

**Полный ответ**

Action — обычный объект, описывающий произошедшее событие, обычно с полем `type` и payload. Хорошее имя отражает domain
event, а не инструкцию изменения каждого поля. Actions должны быть сериализуемыми, если важны DevTools и persistence.





#### Вопрос: Что такое reducer?

**Короткий ответ**

Reducer — функция (state, action) => nextState. Она обрабатывает известные actions и возвращает прежний state для
остальных. Reducer не выполняет HTTP, timers и случайные вычисления.

**Полный ответ**

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





#### Вопрос: Почему reducer должен быть чистой функцией?

**Короткий ответ**

Одинаковые входы должны давать одинаковый результат без внешних side effects. Это делает обновления тестируемыми,
поддерживает replay и time-travel debugging. I/O выполняет middleware или отдельный orchestration layer.

**Полный ответ**

Одинаковые входы должны давать одинаковый результат без внешних side effects. Это делает обновления тестируемыми,
поддерживает replay и time-travel debugging. I/O выполняет middleware или отдельный orchestration layer.





#### Вопрос: Что такое immutable update?

**Короткий ответ**

Это создание нового объекта для изменившейся ветки вместо мутации существующего state. Ссылочное сравнение позволяет
быстро определить изменения. Redux Toolkit использует Immer, поэтому внутри reducer можно писать mutation-like syntax с
immutable результатом.

**Полный ответ**

Это создание нового объекта для изменившейся ветки вместо мутации существующего state. Ссылочное сравнение позволяет
быстро определить изменения. Redux Toolkit использует Immer, поэтому внутри reducer можно писать mutation-like syntax с
immutable результатом.





#### Вопрос: Что такое selector?

**Короткий ответ**

Selector читает или вычисляет данные из store. Memoized selector не пересчитывает результат, пока его входные ссылки не
изменились. Сложную derivation logic лучше держать в selectors, а не компонентах.

**Полный ответ**

Selector читает или вычисляет данные из store. Memoized selector не пересчитывает результат, пока его входные ссылки не
изменились. Сложную derivation logic лучше держать в selectors, а не компонентах.





#### Вопрос: Что такое middleware?

**Короткий ответ**

Middleware перехватывает dispatch между caller и reducer. Оно используется для async flows, logging, analytics и
обработки ошибок. Middleware не должно скрывать критичную бизнес-логику без наблюдаемых actions.

**Полный ответ**

Middleware перехватывает dispatch между caller и reducer. Оно используется для async flows, logging, analytics и
обработки ошибок. Middleware не должно скрывать критичную бизнес-логику без наблюдаемых actions.





#### Вопрос: Что такое side effects в Redux?

**Короткий ответ**

Это HTTP, storage, timers, navigation, случайность и любое взаимодействие вне чистого reducer. Их реализуют thunk, saga,
observable middleware или listener middleware. Результат обычно возвращается в store новым action.

**Полный ответ**

Это HTTP, storage, timers, navigation, случайность и любое взаимодействие вне чистого reducer. Их реализуют thunk, saga,
observable middleware или listener middleware. Результат обычно возвращается в store новым action.





#### Вопрос: Какие плюсы Redux?

**Короткий ответ**

Явный поток данных, хорошие DevTools, предсказуемые updates, testability и удобная диагностика сложных сценариев.
Центральный event log полезен большим командам. Экосистема предлагает устойчивые patterns для normalized data.

**Полный ответ**

Явный поток данных, хорошие DevTools, предсказуемые updates, testability и удобная диагностика сложных сценариев.
Центральный event log полезен большим командам. Экосистема предлагает устойчивые patterns для normalized data.





#### Вопрос: Какие минусы Redux?

**Короткий ответ**

Дополнительные actions, reducers, selectors и async conventions увеличивают объем кода и порог входа. Глобальный store
легко перегрузить локальным state. Плохая granularity вызывает лишние updates и связанность features.

**Полный ответ**

Дополнительные actions, reducers, selectors и async conventions увеличивают объем кода и порог входа. Глобальный store
легко перегрузить локальным state. Плохая granularity вызывает лишние updates и связанность features.





#### Вопрос: Когда Redux оправдан?

**Короткий ответ**

Когда много удаленных компонентов используют общее сложное состояние, важны audit/debugging и несколько команд меняют
одни domain entities. Он полезен для долгоживущих async workflows и normalized caches. Решение должно окупать
инфраструктуру.

**Полный ответ**

Когда много удаленных компонентов используют общее сложное состояние, важны audit/debugging и несколько команд меняют
одни domain entities. Он полезен для долгоживущих async workflows и normalized caches. Решение должно окупать
инфраструктуру.





#### Вопрос: Когда Redux будет лишним усложнением?

**Короткий ответ**

Для формы, раскрытия панели или данных одного feature часто достаточно component state или query cache. Если actions
лишь дублируют простые setters, архитектура не дает пользы. Начинать лучше с colocated state.

**Полный ответ**

Для формы, раскрытия панели или данных одного feature часто достаточно component state или query cache. Если actions
лишь дублируют простые setters, архитектура не дает пользы. Начинать лучше с colocated state.



### MobX



#### Вопрос: Что такое MobX?

**Короткий ответ**

MobX — реактивная библиотека, которая отслеживает чтения observable state и автоматически обновляет зависящие
computations и views. Код часто выглядит как обычные объекты и методы. Связи формируются динамически во время
выполнения.

**Полный ответ**

MobX — реактивная библиотека, которая отслеживает чтения observable state и автоматически обновляет зависящие
computations и views. Код часто выглядит как обычные объекты и методы. Связи формируются динамически во время
выполнения.





#### Вопрос: Что такое observable state?

**Короткий ответ**

Это состояние, чтения и изменения которого отслеживает MobX. Когда observable меняется, зависимые computed values и
reactions инвалидируются. Изменения обычно группируют в actions.

**Полный ответ**

Это состояние, чтения и изменения которого отслеживает MobX. Когда observable меняется, зависимые computed values и
reactions инвалидируются. Изменения обычно группируют в actions.





#### Вопрос: Что такое computed value?

**Короткий ответ**

Computed — производное значение из observables. MobX кеширует его и пересчитывает при изменении реально прочитанных
dependencies. Computed должен быть чистым и не выполнять I/O.

**Полный ответ**

Computed — производное значение из observables. MobX кеширует его и пересчитывает при изменении реально прочитанных
dependencies. Computed должен быть чистым и не выполнять I/O.





#### Вопрос: Что такое reaction?

**Короткий ответ**

Reaction запускает side effect при изменении наблюдаемого выражения. Его используют для persistence, analytics или
интеграции с внешним API. Reaction нужно уничтожать, когда заканчивается lifetime владельца.

**Полный ответ**

Reaction запускает side effect при изменении наблюдаемого выражения. Его используют для persistence, analytics или
интеграции с внешним API. Reaction нужно уничтожать, когда заканчивается lifetime владельца.





#### Вопрос: Какие плюсы MobX?

**Короткий ответ**

Меньше boilerplate, естественная объектная модель и точные updates по фактически прочитанным dependencies. Удобен для
богатых domain models и сложных производных значений. Быстро внедряется в локальные features.

**Полный ответ**

Меньше boilerplate, естественная объектная модель и точные updates по фактически прочитанным dependencies. Удобен для
богатых domain models и сложных производных значений. Быстро внедряется в локальные features.





#### Вопрос: Какие минусы MobX?

**Короткий ответ**

Динамический dependency graph и скрытая реактивность могут усложнить tracing. Легко создать side effects с неочевидным
lifecycle или чрезмерно mutable shared model. Нужны соглашения о actions, ownership и disposal.

**Полный ответ**

Динамический dependency graph и скрытая реактивность могут усложнить tracing. Легко создать side effects с неочевидным
lifecycle или чрезмерно mutable shared model. Нужны соглашения о actions, ownership и disposal.





#### Вопрос: Чем MobX отличается от Redux?

**Короткий ответ**

Redux делает события и переходы состояния явными через actions/reducers. MobX больше опирается на observable graph и
автоматические reactions, поэтому бывает лаконичнее. При неаккуратном дизайне поток изменений сложнее проследить.

**Полный ответ**

Redux делает события и переходы состояния явными через actions/reducers. MobX больше опирается на observable graph и
автоматические reactions, поэтому бывает лаконичнее. При неаккуратном дизайне поток изменений сложнее проследить.





#### Вопрос: Когда MobX может быть удобнее Redux?

**Короткий ответ**

Когда важна лаконичная модель объектов, много computed dependencies и команда принимает runtime-реактивность. Redux
удобнее, если нужен строгий event log и максимально явный flow. Выбор зависит от требований к debugging и культуре
команды.

**Полный ответ**

Когда важна лаконичная модель объектов, много computed dependencies и команда принимает runtime-реактивность. Redux
удобнее, если нужен строгий event log и максимально явный flow. Выбор зависит от требований к debugging и культуре
команды.



### Связь с Angular и React

Этот раздел держит framework-agnostic теорию: Redux, MobX, store, actions, reducers, selectors, side effects и
immutability. Angular-specific применение вынесено в
[Управление состоянием в Angular](../angular/index.md#управление-состоянием): signals, scoped services, RxJS store
services, NgRx/NGXS/Akita и facade pattern. React-specific применение раскрыто в
[управлении состоянием React](../react/index.md#state-management): Context, Redux Toolkit, Zustand, TanStack Query и
границы между client state и server state.
