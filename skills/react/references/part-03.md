# React — вопросы и ответы, часть 3

> Автоматически сгенерировано из src/pages/react/index.md. Не редактируйте вручную.

### Архитектурные вопросы



#### Вопрос: Как спроектировать структуру React-приложения?

**Короткий ответ**

Начать с features/pages/shared, отдельно выделить API layer, domain types, reusable UI и routing. Структура должна
помогать искать use cases, а не просто сортировать файлы по типу.

**Полный ответ**

Начать с features/pages/shared, отдельно выделить API layer, domain types, reusable UI и routing. Структура должна
помогать искать use cases, а не просто сортировать файлы по типу.





#### Вопрос: Где хранить бизнес-логику: component, hook, service/module function, store?

**Короткий ответ**

UI logic можно держать в component или hook. Pure domain logic лучше вынести в module functions. Shared client state - в
store. Server state - в query layer.

**Полный ответ**

UI logic можно держать в component или hook. Pure domain logic лучше вынести в module functions. Shared client state - в
store. Server state - в query layer.





#### Вопрос: Как сравнить Angular services и React custom hooks?

**Короткий ответ**

Angular service - injectable dependency с lifecycle в injector. Custom hook - reusable React logic, которая вызывается
внутри component tree.

**Полный ответ**

Angular service - injectable dependency с lifecycle в injector. Custom hook - reusable React logic, которая вызывается
внутри component tree.





#### Вопрос: Как сравнить Angular signals и React state/memoization?

**Короткий ответ**

Signals дают fine-grained reactivity, React чаще re-render-ит component function. useMemo и useCallback помогают
стабилизировать дорогие вычисления и ссылки, но не заменяют state.

**Полный ответ**

Signals дают fine-grained reactivity, React чаще re-render-ит component function. `useMemo` и `useCallback` помогают
стабилизировать дорогие вычисления и ссылки, но не заменяют state.





#### Вопрос: Как избежать лишних render-ов?

**Короткий ответ**

Держать state ближе к месту использования, не поднимать его без необходимости, использовать стабильные keys, избегать
лишнего Context value churn, применять memoization только там, где есть измеримая причина.

**Полный ответ**

Держать state ближе к месту использования, не поднимать его без необходимости, использовать стабильные keys, избегать
лишнего Context value churn, применять memoization только там, где есть измеримая причина.





#### Вопрос: Когда нужны useMemo и useCallback, а когда это premature optimization?

**Короткий ответ**

Они нужны для дорогих вычислений, стабильных props в memoized children и корректных dependencies. Если вычисление
дешевое и нет проблемы с render-ами, это лишний шум.

**Полный ответ**

Они нужны для дорогих вычислений, стабильных props в memoized children и корректных dependencies. Если вычисление
дешевое и нет проблемы с render-ами, это лишний шум.





#### Вопрос: Как проектировать reusable components?

**Короткий ответ**

Делать API маленьким, называть props по домену, не смешивать data fetching с presentation, оставлять escape hatches для
сложных cases.

**Полный ответ**

Делать API маленьким, называть props по домену, не смешивать data fetching с presentation, оставлять escape hatches для
сложных cases.





#### Вопрос: Как делать compound components?

**Короткий ответ**

Разделить большой компонент на согласованные части, например Tabs.Root, Tabs.List, Tabs.Trigger, Tabs.Content. Общее
состояние можно передать через Context внутри компонента.

**Полный ответ**

Разделить большой компонент на согласованные части, например `Tabs.Root`, `Tabs.List`, `Tabs.Trigger`, `Tabs.Content`.
Общее состояние можно передать через Context внутри компонента.





#### Вопрос: Как построить форму со сложной валидацией?

**Короткий ответ**

Выбрать form library, описать schema или validators отдельно от UI, разделить client validation, async validation и
server errors.

**Полный ответ**

Выбрать form library, описать schema или validators отдельно от UI, разделить client validation, async validation и
server errors.





#### Вопрос: Как выбрать между Redux, Zustand, Context и TanStack Query?

**Короткий ответ**

Context - для передачи value. TanStack Query - для server state. Redux Toolkit - для сложного client state и строгого
debug flow. Zustand - для легкого shared client state.

**Полный ответ**

Context - для передачи value. TanStack Query - для server state. Redux Toolkit - для сложного client state и строгого
debug flow. Zustand - для легкого shared client state.





#### Вопрос: Как тестировать React-компоненты?

**Короткий ответ**

Проверять поведение через React Testing Library: что пользователь видит и делает. Внутренние hooks и functions
тестировать отдельно, если там есть самостоятельная логика.

**Полный ответ**

Проверять поведение через React Testing Library: что пользователь видит и делает. Внутренние hooks и functions
тестировать отдельно, если там есть самостоятельная логика.





#### Вопрос: Как устроить error boundary?

**Короткий ответ**

Error boundary ловит ошибки render-а ниже по дереву и показывает fallback UI. В React это class component API или
готовая библиотека-обертка.

**Полный ответ**

Error boundary ловит ошибки render-а ниже по дереву и показывает fallback UI. В React это class component API или
готовая библиотека-обертка.





#### Вопрос: Как делать lazy loading?

**Короткий ответ**

Через dynamic import, React.lazy, Suspense или lazy routes в router/framework.

**Полный ответ**

Через dynamic import, `React.lazy`, `Suspense` или lazy routes в router/framework.





#### Вопрос: Как React встраивается в micro frontend архитектуру рядом с Angular?

**Короткий ответ**

Через независимые bundles, module federation, web components или shell-level integration. Важно договориться о routing,
auth, design system, events и shared dependencies.

**Полный ответ**

Через независимые bundles, module federation, web components или shell-level integration. Важно договориться о routing,
auth, design system, events и shared dependencies.





#### Вопрос: Как выбрать React stack для продукта?

**Короткий ответ**

Начать с требований: SPA/SSR, SEO, forms, server state, design system, team skill, deployment, testing и accessibility.
Затем выбрать минимальный набор решений, который закрывает эти требования без лишней platform complexity.

**Полный ответ**

Начать с требований: SPA/SSR, SEO, forms, server state, design system, team skill, deployment, testing и accessibility.
Затем выбрать минимальный набор решений, который закрывает эти требования без лишней platform complexity.





#### Вопрос: Как спроектировать data layer?

**Короткий ответ**

Разделить API client, query keys, server state, mutations, invalidation и error model. UI-компоненты не должны знать
низкоуровневые детали endpoint-ов, а domain logic не должна зависеть от React без причины.

**Полный ответ**

Разделить API client, query keys, server state, mutations, invalidation и error model. UI-компоненты не должны знать
низкоуровневые детали endpoint-ов, а domain logic не должна зависеть от React без причины.





#### Вопрос: Как спроектировать forms layer?

**Короткий ответ**

Выбрать form library, договориться о schema validation, server errors, field components, accessibility и submit flow.
Для Angular-разработчика это аналог решения, где проходит граница между Reactive Forms model и UI.

**Полный ответ**

Выбрать form library, договориться о schema validation, server errors, field components, accessibility и submit flow.
Для Angular-разработчика это аналог решения, где проходит граница между Reactive Forms model и UI.





#### Вопрос: Как спроектировать UI layer?

**Короткий ответ**

Определить tokens, primitives, component API, theming, accessibility rules и ownership дизайн-системы. В mixed Angular +
React окружении лучше разделять общие tokens/specs и framework-specific adapters.

**Полный ответ**

Определить tokens, primitives, component API, theming, accessibility rules и ownership дизайн-системы. В mixed Angular +
React окружении лучше разделять общие tokens/specs и framework-specific adapters.





#### Вопрос: Как избежать хаоса в dependencies?

**Короткий ответ**

Фиксировать критерии выбора библиотек, назначать owners, обновлять зависимости регулярно и не добавлять новую library
для локальной задачи без review. Хороший React stack - это не максимальный список packages, а понятные boundaries.

**Полный ответ**

Фиксировать критерии выбора библиотек, назначать owners, обновлять зависимости регулярно и не добавлять новую library
для локальной задачи без review. Хороший React stack - это не максимальный список packages, а понятные boundaries.





#### Вопрос: Как ввести React в Angular-команду?

**Короткий ответ**

Начать с ограниченного use case, shared coding guidelines, обучения React mental model и code review checklist. Особенно
важно проговорить отличия: hooks, immutable state, effects, Context и отсутствие встроенных Angular-like слоев.

**Полный ответ**

Начать с ограниченного use case, shared coding guidelines, обучения React mental model и code review checklist. Особенно
важно проговорить отличия: hooks, immutable state, effects, Context и отсутствие встроенных Angular-like слоев.





#### Вопрос: Как организовать monorepo с Angular и React?

**Короткий ответ**

Выделить apps и libs, запретить случайные зависимости между фреймворками, вынести framework-agnostic domain logic,
tokens и tooling. Nx часто удобен для Angular + React monorepo, потому что дает project graph и affected commands.

**Полный ответ**

Выделить apps и libs, запретить случайные зависимости между фреймворками, вынести framework-agnostic domain logic,
tokens и tooling. Nx часто удобен для Angular + React monorepo, потому что дает project graph и affected commands.





#### Вопрос: Как выбрать между Next.js, Vite SPA и Astro?

**Короткий ответ**

Vite SPA - для client-side приложений, Next.js - для SSR/SSG/fullstack и SEO, Astro - для content/static сайтов с
точечной интерактивностью. Выбор должен идти от продукта, а не от популярности framework-а.

**Полный ответ**

Vite SPA - для client-side приложений, Next.js - для SSR/SSG/fullstack и SEO, Astro - для content/static сайтов с
точечной интерактивностью. Выбор должен идти от продукта, а не от популярности framework-а.





#### Вопрос: Как оценить риски SSR/hydration?

**Короткий ответ**

Проверить browser-only code, auth/session model, cache, dates/locales/random values, third-party widgets и deployment
runtime. Hydration mismatch часто появляется там, где server render и первый client render видят разные данные.

**Полный ответ**

Проверить browser-only code, auth/session model, cache, dates/locales/random values, third-party widgets и deployment
runtime. Hydration mismatch часто появляется там, где server render и первый client render видят разные данные.





#### Вопрос: Какие архитектурные trade-offs есть между Angular и React?

**Короткий ответ**

Angular дает больше структуры и единых решений. React дает больше свободы выбора. Trade-off между предсказуемостью
платформы и гибкостью стека.

**Полный ответ**

Angular дает больше структуры и единых решений. React дает больше свободы выбора. Trade-off между предсказуемостью
платформы и гибкостью стека.





#### Вопрос: Почему Angular дает больше структуры из коробки, а React требует выбора стека?

**Короткий ответ**

Angular проектировался как framework. React фокусируется на UI layer, поэтому router, forms, server state, SSR и styling
команда выбирает отдельно.

**Полный ответ**

Angular проектировался как framework. React фокусируется на UI layer, поэтому router, forms, server state, SSR и styling
команда выбирает отдельно.





#### Вопрос: Как выбирать React-стек для enterprise-продукта?

**Короткий ответ**

Смотреть на требования к routing, SSR, формам, server state, дизайн-системе, найму, observability, testing и lifecycle
поддержки.

**Полный ответ**

Смотреть на требования к routing, SSR, формам, server state, дизайн-системе, найму, observability, testing и lifecycle
поддержки.





#### Вопрос: Когда React хуже подходит, чем Angular?

**Короткий ответ**

Когда команде нужна строгая единая платформа из коробки, много одинаковых enterprise-форм, сильная зависимость от DI и
желание минимизировать архитектурный выбор.

**Полный ответ**

Когда команде нужна строгая единая платформа из коробки, много одинаковых enterprise-форм, сильная зависимость от DI и
желание минимизировать архитектурный выбор.





#### Вопрос: Когда React лучше подходит, чем Angular?

**Короткий ответ**

Когда нужен легкий UI layer, гибкий подбор libraries, быстрая интеграция в существующий стек или команда уже сильна в
React ecosystem.

**Полный ответ**

Когда нужен легкий UI layer, гибкий подбор libraries, быстрая интеграция в существующий стек или команда уже сильна в
React ecosystem.





#### Вопрос: Как мигрировать часть Angular-приложения на React или наоборот?

**Короткий ответ**

Идти feature by feature, стабилизировать contracts, вынести domain logic, договориться о routing/auth/design system и не
переписывать все сразу без продуктовой причины.

**Полный ответ**

Идти feature by feature, стабилизировать contracts, вынести domain logic, договориться о routing/auth/design system и не
переписывать все сразу без продуктовой причины.





#### Вопрос: Как проектировать design system, который используют Angular и React?

**Короткий ответ**

Разделить tokens, accessibility contract, visual specs и framework adapters. Компоненты могут быть разными, но поведение
и дизайн-правила должны быть общими.

**Полный ответ**

Разделить tokens, accessibility contract, visual specs и framework adapters. Компоненты могут быть разными, но поведение
и дизайн-правила должны быть общими.





#### Вопрос: Как разделять domain logic и UI logic между разными frameworks?

**Короткий ответ**

Domain logic держать в pure TypeScript modules без зависимости от Angular или React. UI logic оставлять в components,
hooks, services и adapters конкретного framework.

**Полный ответ**

Domain logic держать в pure TypeScript modules без зависимости от Angular или React. UI logic оставлять в components,
hooks, services и adapters конкретного framework.





#### Вопрос: Как проектировать state model для долгоживущего продукта?

**Короткий ответ**

Разделять server state, client state, form drafts и derived values. Описывать ownership данных и правила invalidation.

**Полный ответ**

Разделять server state, client state, form drafts и derived values. Описывать ownership данных и правила invalidation.





#### Вопрос: Как оценивать риски Next.js / SSR / hydration?

**Короткий ответ**

Проверять, какие страницы реально требуют SSR, какие данные доступны на сервере, есть ли browser-only код, как устроены
cache, auth и deployment.

**Полный ответ**

Проверять, какие страницы реально требуют SSR, какие данные доступны на сервере, есть ли browser-only код, как устроены
cache, auth и deployment.





#### Вопрос: Какие проблемы бывают при hydration mismatch?

**Короткий ответ**

HTML с сервера не совпадает с первым client render: разные даты, random values, browser-only данные, условный rendering
по window, различия локали.

**Полный ответ**

HTML с сервера не совпадает с первым client render: разные даты, random values, browser-only данные, условный rendering
по `window`, различия локали.





#### Вопрос: Как контролировать bundle size?

**Короткий ответ**

Следить за dependencies, lazy loading, route splitting, tree shaking, design system imports и анализом bundle report.

**Полный ответ**

Следить за dependencies, lazy loading, route splitting, tree shaking, design system imports и анализом bundle report.





#### Вопрос: Как построить стратегию тестирования React-приложения?

**Короткий ответ**

Pure logic покрыть unit tests, components - behavior tests, critical flows - Playwright, data fetching - mock server или
query layer tests.

**Полный ответ**

Pure logic покрыть unit tests, components - behavior tests, critical flows - Playwright, data fetching - mock server или
query layer tests.





#### Вопрос: Как выстроить code review React-кода для Angular-команды?

**Короткий ответ**

Проверять data flow, immutable updates, корректные dependencies hooks, отсутствие лишних effects, доступность,
тестируемость и понятный выбор libraries.

**Полный ответ**

Проверять data flow, immutable updates, корректные dependencies hooks, отсутствие лишних effects, доступность,
тестируемость и понятный выбор libraries.





#### Вопрос: Какие вопросы задать команде перед переходом с Angular на React?

**Короткий ответ**

Зачем нужен переход, какие проблемы он решает, кто владеет архитектурой, какой стек выбран, как мигрировать без
остановки разработки и как обучать команду.

**Полный ответ**

Зачем нужен переход, какие проблемы он решает, кто владеет архитектурой, какой стек выбран, как мигрировать без
остановки разработки и как обучать команду.





#### Вопрос: Как принимать архитектурное решение о React-стеке?

**Короткий ответ**

Зафиксировать требования, альтернативы, trade-offs, риски, migration path и критерии пересмотра решения. Senior-ответ
должен показывать не вкус к библиотекам, а ownership и способность поддерживать стек несколько лет.

**Полный ответ**

Зафиксировать требования, альтернативы, trade-offs, риски, migration path и критерии пересмотра решения. Senior-ответ
должен показывать не вкус к библиотекам, а ownership и способность поддерживать стек несколько лет.





#### Вопрос: Как сравнить Angular platform и React ecosystem?

**Короткий ответ**

Angular platform дает единый framework contract и официальные решения для многих слоев. React ecosystem дает гибкость,
но требует больше локальных соглашений, dependency governance и архитектурного review.

**Полный ответ**

Angular platform дает единый framework contract и официальные решения для многих слоев. React ecosystem дает гибкость,
но требует больше локальных соглашений, dependency governance и архитектурного review.





#### Вопрос: Какие риски vendor lock-in в Next.js/Vercel?

**Короткий ответ**

Риск не в самом Next.js, а в использовании platform-specific функций без exit strategy: edge/runtime assumptions,
deployment APIs, cache behavior, analytics, image pipeline. Перед выбором нужно понять, насколько легко перенести app на
другой runtime.

**Полный ответ**

Риск не в самом Next.js, а в использовании platform-specific функций без exit strategy: edge/runtime assumptions,
deployment APIs, cache behavior, analytics, image pipeline. Перед выбором нужно понять, насколько легко перенести app на
другой runtime.





#### Вопрос: Когда React ecosystem становится минусом?

**Короткий ответ**

Когда команда постоянно меняет libraries, спорит о вкусе вместо требований, дублирует решения и не имеет platform
ownership. В таком контексте Angular-like единая платформа может быть продуктивнее.

**Полный ответ**

Когда команда постоянно меняет libraries, спорит о вкусе вместо требований, дублирует решения и не имеет platform
ownership. В таком контексте Angular-like единая платформа может быть продуктивнее.





#### Вопрос: Как контролировать dependency sprawl?

**Короткий ответ**

Вести approved stack, dependency review, bundle checks, upgrade policy и ownership. Любая новая library должна иметь
понятную проблему, альтернативы и план поддержки.

**Полный ответ**

Вести approved stack, dependency review, bundle checks, upgrade policy и ownership. Любая новая library должна иметь
понятную проблему, альтернативы и план поддержки.





#### Вопрос: Как сделать framework-agnostic domain layer?

**Короткий ответ**

Держать domain types, validation, business rules и pure transformations в TypeScript modules без React и Angular
imports. Framework-specific code должен быть adapter layer: components, hooks, services, effects и routing.

**Полный ответ**

Держать domain types, validation, business rules и pure transformations в TypeScript modules без React и Angular
imports. Framework-specific code должен быть adapter layer: components, hooks, services, effects и routing.





#### Вопрос: Как выбрать state/data/forms libraries на 3-5 лет?

**Короткий ответ**

Оценивать зрелость, maintenance, release cadence, TypeScript support, ecosystem, hiring, migration path и соответствие
продуктовым требованиям. Популярность важна, но не заменяет ownership cost.

**Полный ответ**

Оценивать зрелость, maintenance, release cadence, TypeScript support, ecosystem, hiring, migration path и соответствие
продуктовым требованиям. Популярность важна, но не заменяет ownership cost.





#### Вопрос: Как оценить зрелость библиотеки?

**Короткий ответ**

Смотреть на active maintenance, breaking changes, issue velocity, docs, adoption, bundle impact, testability, security
history и совместимость с текущим framework/runtime. Для critical path нужна более высокая планка, чем для dev-only
tooling.

**Полный ответ**

Смотреть на active maintenance, breaking changes, issue velocity, docs, adoption, bundle impact, testability, security
history и совместимость с текущим framework/runtime. Для critical path нужна более высокая планка, чем для dev-only
tooling.





#### Вопрос: Как выстроить frontend platform для нескольких стеков?

**Короткий ответ**

Разделить общие стандарты и framework adapters: design tokens, accessibility rules, CI, testing conventions,
observability, security и release process. Angular и React apps могут отличаться реализацией, но platform contract
должен оставаться единым.

**Полный ответ**

Разделить общие стандарты и framework adapters: design tokens, accessibility rules, CI, testing conventions,
observability, security и release process. Angular и React apps могут отличаться реализацией, но platform contract
должен оставаться единым.



### Практические задачки

Все задачи ниже связаны с мини-проектом Travel Planner.

- Создать компонент `TripCard`.
- Вывести список поездок через `map`.
- Добавить `key`.
- Добавить empty state.
- Добавить controlled input для поиска.
- Добавить форму добавления поездки.
- Передать обработчик `onAddTrip` из parent в child.
- Добавить простую фильтрацию по стране.

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

### Мини-проект: Travel Planner



#### Вопрос: Какие функции должен покрывать Travel Planner?

**Короткий ответ**

Travel Planner - небольшой проект для тренировки React-мышления без ухода в абстрактные примеры.

**Полный ответ**

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



### Что важно не перепутать на интервью



#### Вопрос: Какие React-вещи чаще всего путают на интервью?

**Короткий ответ**

useEffect не является полным аналогом ngOnInit. - props нельзя менять внутри child component. - state нельзя мутировать
напрямую. - setState асинхронен в практическом смысле: нельзя сразу после setter ожидать новое значение в той же
render-snapshot логике. - key нужен не для красоты, а для reconciliation. - Context не равен полноценному state
manager. - useMemo и useCallback не нужно ставить везде.

**Полный ответ**

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



### Рекомендуемый порядок изучения



#### Вопрос: В каком порядке изучать React Angular-разработчику?

**Короткий ответ**

JSX, components, props. 2. State, events, lists. 3. Forms and controlled inputs. 4. useEffect and data fetching. 5.
Custom hooks. 6. Routing. 7. Context and state management. 8. Angular vs React differences. 9. Testing. 10. Architecture
and stack choices.

**Полный ответ**

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



### React и Next.js



#### Вопрос: Как сравнить Context, Redux и Zustand на интервью?

**Короткий ответ**

Context удобен для редко меняющихся сквозных значений: theme, locale, current user. Он не является полноценным store:
при изменении value все consumers могут получить render work, если не разделить context или не мемоизировать value.

**Полный ответ**

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





#### Вопрос: Чем useTransition отличается от useDeferredValue?

**Короткий ответ**

useTransition помечает state update как некритичный: React может отложить дорогой render, чтобы input, click и другие
срочные реакции оставались отзывчивыми. useDeferredValue откладывает потребление уже изменившегося значения, например
поисковую строку для тяжелого списка.

**Полный ответ**

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





#### Вопрос: Что важно знать про Next.js App Router?

**Короткий ответ**

App Router строится вокруг app/, nested layouts, Server Components, route handlers, loading/error states и cache модели
Next.js. Server Component выполняется на сервере и не попадает в client bundle, а Client Component нужен для state,
effects, browser APIs и event handlers.

**Полный ответ**

App Router строится вокруг `app/`, nested layouts, Server Components, route handlers, loading/error states и cache
модели Next.js. Server Component выполняется на сервере и не попадает в client bundle, а Client Component нужен для
state, effects, browser APIs и event handlers.

С Angular SSR это похоже только верхнеуровнево: оба подхода могут отдавать HTML с сервера, но Next.js сильнее связывает
routing, data fetching, server/client boundary и deployment runtime с framework conventions.

```tsx filename="app/users/[id]/page.tsx"
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



### Практика по React



#### Вопрос: Практическая задача: напишите useWindowSize с SSR-safe поведением.

**Короткий ответ**

Что проверяет: custom hooks, cleanup, SSR, browser APIs.

**Полный ответ**

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





#### Вопрос: Практическая задача: реализуйте autocomplete в React.

**Короткий ответ**

Кандидат должен показать controlled input, loading/error/empty states, отмену устаревших запросов, keyboard navigation и
доступную разметку combobox/listbox. Минимальная production-форма:

**Полный ответ**

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
