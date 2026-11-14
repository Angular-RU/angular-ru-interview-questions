# React — вопросы и ответы, часть 2

> Автоматически сгенерировано из src/pages/react/index.md. Не редактируйте вручную.

### Data fetching



#### Вопрос: Что такое server state?

**Короткий ответ**

Server state принадлежит серверу, может устаревать, требует cache, refetch, retry, invalidation и обработки concurrent
updates. Это не то же самое, что global client state вроде открытого sidebar или выбранной темы.

**Полный ответ**

Server state принадлежит серверу, может устаревать, требует cache, refetch, retry, invalidation и обработки concurrent
updates. Это не то же самое, что global client state вроде открытого sidebar или выбранной темы.





#### Вопрос: Как выбрать data fetching?

**Короткий ответ**

Краткая суть раскрыта в полном ответе с кодом или практическим примером.

**Полный ответ**

| Ситуация                               | Подход                          |
| -------------------------------------- | ------------------------------- |
| Учебный пример                         | `useEffect + fetch`             |
| SPA с REST API и cache                 | TanStack Query                  |
| Проект уже на Redux Toolkit            | RTK Query                       |
| GraphQL app                            | Apollo Client / urql / Relay    |
| Fullstack TypeScript app               | tRPC                            |
| Next.js App Router с server components | Server-side data fetching / RSC |





#### Вопрос: Когда достаточно useEffect + fetch?

**Короткий ответ**

Для маленького учебного примера или одноразового запроса без cache, retry, invalidation и shared ownership. В продукте
эта схема быстро обрастает ручной логикой loading/error/refetch и начинает дублироваться.

**Полный ответ**

Для маленького учебного примера или одноразового запроса без cache, retry, invalidation и shared ownership. В продукте
эта схема быстро обрастает ручной логикой loading/error/refetch и начинает дублироваться.





#### Вопрос: Когда использовать RTK Query?

**Короткий ответ**

RTK Query логичен, если команда уже использует Redux Toolkit и хочет держать API layer рядом с Redux conventions. Если
Redux в проекте не нужен, TanStack Query часто будет проще как отдельный server-state layer.

**Полный ответ**

RTK Query логичен, если команда уже использует Redux Toolkit и хочет держать API layer рядом с Redux conventions. Если
Redux в проекте не нужен, TanStack Query часто будет проще как отдельный server-state layer.





#### Вопрос: Когда нужны Apollo Client, urql или Relay?

**Короткий ответ**

Это GraphQL-клиенты. Apollo часто выбирают за ecosystem и привычный DX, urql - за более легкий и модульный подход,
Relay - за строгую модель data requirements и масштабирование больших GraphQL-приложений.

**Полный ответ**

Это GraphQL-клиенты. Apollo часто выбирают за ecosystem и привычный DX, urql - за более легкий и модульный подход,
Relay - за строгую модель data requirements и масштабирование больших GraphQL-приложений.





#### Вопрос: Какие задачи решает TanStack Query?

**Короткий ответ**

TanStack Query управляет server state: loading/error, cache, refetch, invalidation, retries, pagination и optimistic
updates. Это не replacement для Redux Toolkit, потому что Redux Toolkit обычно отвечает за client state и business flow.

**Полный ответ**

TanStack Query управляет server state: loading/error, cache, refetch, invalidation, retries, pagination и optimistic
updates. Это не replacement для Redux Toolkit, потому что Redux Toolkit обычно отвечает за client state и business flow.





#### Вопрос: Как это сравнить с Angular HttpClient + service + RxJS?

**Короткий ответ**

В Angular запросы часто оформляют в services на HttpClient, а orchestration делают через RxJS или signals. В React нет
встроенного HttpClient, поэтому команда выбирает fetch, axios, query library, GraphQL client, tRPC или server functions.

**Полный ответ**

В Angular запросы часто оформляют в services на `HttpClient`, а orchestration делают через RxJS или signals. В React нет
встроенного `HttpClient`, поэтому команда выбирает `fetch`, axios, query library, GraphQL client, tRPC или server
functions.



### Forms



#### Вопрос: Как выбрать forms layer?

**Короткий ответ**

Краткая суть раскрыта в полном ответе с кодом или практическим примером.

**Полный ответ**

| Ситуация                                  | Подход                    |
| ----------------------------------------- | ------------------------- |
| Простые поля и Junior-практика            | controlled inputs         |
| Большая форма без render на каждый символ | React Hook Form           |
| Shared schema validation                  | Zod                       |
| Type-safe form state и field API          | TanStack Form             |
| Server-first forms                        | Conform                   |
| Старый проект                             | Formik / React Final Form |





#### Вопрос: Что такое controlled и uncontrolled input?

**Короткий ответ**

Controlled input хранит значение в React state и обновляет его через onChange. Uncontrolled input хранит значение в DOM
и читается через ref или form submit. Junior должен понимать controlled input, но в больших формах не всегда нужно
контролировать каждый символ вручную.

**Полный ответ**

Controlled input хранит значение в React state и обновляет его через `onChange`. Uncontrolled input хранит значение в
DOM и читается через ref или form submit. Junior должен понимать controlled input, но в больших формах не всегда нужно
контролировать каждый символ вручную.





#### Вопрос: Почему большие формы неудобно писать только на useState?

**Короткий ответ**

Появляется много boilerplate: touched/dirty, validation, nested fields, arrays, server errors, submit state и
accessibility. Form library помогает держать эти состояния явно и не смешивать validation с JSX.

**Полный ответ**

Появляется много boilerplate: touched/dirty, validation, nested fields, arrays, server errors, submit state и
accessibility. Form library помогает держать эти состояния явно и не смешивать validation с JSX.





#### Вопрос: Что дает React Hook Form?

**Короткий ответ**

React Hook Form упрощает регистрацию полей, validation, errors и submit flow, часто с меньшим количеством re-render-ов.
Его часто комбинируют с Zod, чтобы одна schema описывала форму и типы.

**Полный ответ**

React Hook Form упрощает регистрацию полей, validation, errors и submit flow, часто с меньшим количеством re-render-ов.
Его часто комбинируют с Zod, чтобы одна schema описывала форму и типы.





#### Вопрос: Когда смотреть в сторону TanStack Form или Conform?

**Короткий ответ**

TanStack Form интересен, когда нужна строгая typed form model и хороший field-level API. Conform полезен в server-first
подходах, где form submission и validation тесно связаны с route actions или server actions.

**Полный ответ**

TanStack Form интересен, когда нужна строгая typed form model и хороший field-level API. Conform полезен в server-first
подходах, где form submission и validation тесно связаны с route actions или server actions.





#### Вопрос: Как выбирать form-подход в React после Angular Reactive Forms?

**Короткий ответ**

Angular Reactive Forms дают официальную модель FormControl, FormGroup, validators и statuses. React не имеет такого
встроенного слоя, поэтому команда выбирает между ручным state, uncontrolled-подходом и form libraries.

**Полный ответ**

Angular Reactive Forms дают официальную модель `FormControl`, `FormGroup`, validators и statuses. React не имеет такого
встроенного слоя, поэтому команда выбирает между ручным state, uncontrolled-подходом и form libraries.



### Styling и UI libraries



#### Вопрос: Что такое runtime CSS-in-JS и какие у него минусы?

**Короткий ответ**

Runtime CSS-in-JS генерирует стили во время выполнения приложения. В современных SSR/RSC-приложениях это может добавить
runtime cost, усложнить streaming/rendering и создать интеграционные ограничения. Поэтому CSS Modules, Tailwind и
build-time варианты часто проще.

**Полный ответ**

Runtime CSS-in-JS генерирует стили во время выполнения приложения. В современных SSR/RSC-приложениях это может добавить
runtime cost, усложнить streaming/rendering и создать интеграционные ограничения. Поэтому CSS Modules, Tailwind и
build-time варианты часто проще.





#### Вопрос: Как выбрать styling и UI layer?

**Короткий ответ**

Краткая суть раскрыта в полном ответе с кодом или практическим примером.

**Полный ответ**

| Ситуация                                    | Подход                                          |
| ------------------------------------------- | ----------------------------------------------- |
| Простая app-level стилизация                | plain CSS / CSS Modules                         |
| Быстрый product UI и utility-first workflow | Tailwind CSS + clsx                             |
| Typed build-time styles                     | vanilla-extract / PandaCSS                      |
| Готовые enterprise components               | MUI / Ant Design / PrimeReact                   |
| Собственная дизайн-система                  | Radix / Base UI / React Aria / Ark UI / Ariakit |
| Старый или специфичный стек                 | styled-components / Emotion                     |





#### Вопрос: Какие подходы к styling есть в React?

**Короткий ответ**

Обычный CSS, CSS Modules, Tailwind, build-time CSS-in-JS, runtime CSS-in-JS, design tokens и готовые UI libraries. Это
общие frontend-решения, не только React-темы; React лишь задает способ привязать их к component tree.

**Полный ответ**

Обычный CSS, CSS Modules, Tailwind, build-time CSS-in-JS, runtime CSS-in-JS, design tokens и готовые UI libraries. Это
общие frontend-решения, не только React-темы; React лишь задает способ привязать их к component tree.





#### Вопрос: Когда достаточно plain CSS или CSS Modules?

**Короткий ответ**

Plain CSS подходит для небольших проектов и глобальных слоев. CSS Modules дают локальный scope классов без runtime cost
и хорошо работают в долгоживущих продуктах, где не нужен тяжелый styling framework.

**Полный ответ**

Plain CSS подходит для небольших проектов и глобальных слоев. CSS Modules дают локальный scope классов без runtime cost
и хорошо работают в долгоживущих продуктах, где не нужен тяжелый styling framework.





#### Вопрос: Почему Tailwind часто выбирают в React-проектах?

**Короткий ответ**

Tailwind ускоряет сборку UI, хорошо сочетается с headless libraries и уменьшает переключение между JSX и CSS-файлами.
Минус - риск шумной разметки и необходимость дисциплины в design tokens и component boundaries.

**Полный ответ**

Tailwind ускоряет сборку UI, хорошо сочетается с headless libraries и уменьшает переключение между JSX и CSS-файлами.
Минус - риск шумной разметки и необходимость дисциплины в design tokens и component boundaries.





#### Вопрос: Чем component library отличается от headless UI library?

**Короткий ответ**

Component library вроде MUI, Ant Design, Mantine или PrimeReact дает готовый внешний вид и поведение.
Headless/primitives подход вроде Radix, Base UI, React Aria, Ark UI, Ariakit или Headless UI дает accessibility и state
behavior, но внешний вид команда строит сама.

**Полный ответ**

Component library вроде MUI, Ant Design, Mantine или PrimeReact дает готовый внешний вид и поведение.
Headless/primitives подход вроде Radix, Base UI, React Aria, Ark UI, Ariakit или Headless UI дает accessibility и state
behavior, но внешний вид команда строит сама.





#### Вопрос: Почему accessibility нельзя перекладывать только на UI library?

**Короткий ответ**

Library может помочь с keyboard behavior и ARIA patterns, но не знает ваш контент, labels, error messages, focus flow и
product context. Как и в Angular, ответственность за итоговую доступность остается у команды.

**Полный ответ**

Library может помочь с keyboard behavior и ARIA patterns, но не знает ваш контент, labels, error messages, focus flow и
product context. Как и в Angular, ответственность за итоговую доступность остается у команды.



### Animation и charts



#### Вопрос: Когда достаточно CSS animations?

**Короткий ответ**

Для hover/focus, простых transitions, skeletons и небольших enter/exit effects лучше начать с CSS. Animation library
нужна, когда есть сложные timelines, gestures, physics или координация нескольких элементов.

**Полный ответ**

Для hover/focus, простых transitions, skeletons и небольших enter/exit effects лучше начать с CSS. Animation library
нужна, когда есть сложные timelines, gestures, physics или координация нескольких элементов.





#### Вопрос: Чем Motion отличается от GSAP?

**Короткий ответ**

Motion хорошо ложится на React components и declarative UI transitions. GSAP сильнее в сложных timeline-анимациях,
скролл-сценариях и production motion design, но требует аккуратной интеграции с React lifecycle.

**Полный ответ**

Motion хорошо ложится на React components и declarative UI transitions. GSAP сильнее в сложных timeline-анимациях,
скролл-сценариях и production motion design, но требует аккуратной интеграции с React lifecycle.





#### Вопрос: Когда выбирать physics-based animation?

**Короткий ответ**

Когда движение должно ощущаться как физическое: drag, spring transitions, gestures, interactive panels. Для обычного
fade/slide это часто лишняя зависимость и лишняя сложность.

**Полный ответ**

Когда движение должно ощущаться как физическое: drag, spring transitions, gestures, interactive panels. Для обычного
fade/slide это часто лишняя зависимость и лишняя сложность.





#### Вопрос: Когда использовать D3 напрямую, а когда chart library?

**Короткий ответ**

D3 напрямую нужен для нестандартной визуализации, кастомных scales/layouts и полного контроля. Для dashboard чаще
быстрее взять Recharts, Tremor, nivo, Victory или react-chartjs. visx полезен, когда нужен D3-level контроль, но в
React-компонентной форме.

**Полный ответ**

D3 напрямую нужен для нестандартной визуализации, кастомных scales/layouts и полного контроля. Для dashboard чаще
быстрее взять Recharts, Tremor, nivo, Victory или react-chartjs. `visx` полезен, когда нужен D3-level контроль, но в
React-компонентной форме.





#### Вопрос: Какие performance-риски есть у charts в React?

**Короткий ответ**

Большие datasets, частые re-render-ы, тяжелые SVG trees, resize handlers и animations могут быстро стать hot path. Важно
агрегировать данные, memoize дорогие расчеты, виртуализировать списки рядом с charts и не пересоздавать config без
причины.

**Полный ответ**

Большие datasets, частые re-render-ы, тяжелые SVG trees, resize handlers и animations могут быстро стать hot path. Важно
агрегировать данные, memoize дорогие расчеты, виртуализировать списки рядом с charts и не пересоздавать config без
причины.



### Testing



#### Вопрос: Как выбрать testing stack?

**Короткий ответ**

Краткая суть раскрыта в полном ответе с кодом или практическим примером.

**Полный ответ**

| Ситуация                          | Подход                 |
| --------------------------------- | ---------------------- |
| Pure functions и hooks with logic | Vitest / Jest          |
| Component behavior                | React Testing Library  |
| Critical user flows               | Playwright / Cypress   |
| API mocking                       | MSW                    |
| Stable generated output           | Snapshot tests точечно |





#### Вопрос: Чем Vitest отличается от Jest?

**Короткий ответ**

Vitest хорошо интегрируется с Vite, быстрее стартует в Vite-проектах и использует похожий API. Jest остается зрелым
вариантом для старых проектов и ecosystem, но в новых Vite React apps Vitest часто проще.

**Полный ответ**

Vitest хорошо интегрируется с Vite, быстрее стартует в Vite-проектах и использует похожий API. Jest остается зрелым
вариантом для старых проектов и ecosystem, но в новых Vite React apps Vitest часто проще.





#### Вопрос: Что тестирует React Testing Library?

**Короткий ответ**

RTL помогает тестировать поведение компонента глазами пользователя: текст, роли, формы, клики, ошибки. Она намеренно
отталкивает от проверки internal state и implementation details.

**Полный ответ**

RTL помогает тестировать поведение компонента глазами пользователя: текст, роли, формы, клики, ошибки. Она намеренно
отталкивает от проверки internal state и implementation details.





#### Вопрос: Когда нужен Playwright?

**Короткий ответ**

Для критичных end-to-end flows: login, checkout, создание сущности, routing, permissions, интеграция с backend или
browser APIs. Как и в Angular, E2E стоит использовать точечно, потому что они дороже unit/component tests.

**Полный ответ**

Для критичных end-to-end flows: login, checkout, создание сущности, routing, permissions, интеграция с backend или
browser APIs. Как и в Angular, E2E стоит использовать точечно, потому что они дороже unit/component tests.





#### Вопрос: Что такое MSW и зачем он нужен?

**Короткий ответ**

MSW перехватывает network requests и позволяет тестировать UI без настоящего backend. Это удобно для component и
integration tests, где важна реалистичная работа API layer.

**Полный ответ**

MSW перехватывает network requests и позволяет тестировать UI без настоящего backend. Это удобно для component и
integration tests, где важна реалистичная работа API layer.





#### Вопрос: Когда snapshot tests полезны, а когда вредят?

**Короткий ответ**

Полезны для стабильного generated output или маленьких структур, где snapshot действительно читают. Вредят, когда снимок
большой, часто обновляется и заменяет нормальные behavioral assertions.

**Полный ответ**

Полезны для стабильного generated output или маленьких структур, где snapshot действительно читают. Вредят, когда снимок
большой, часто обновляется и заменяет нормальные behavioral assertions.



### Auth, backend и database



#### Вопрос: Почему auth - это не React-задача сама по себе?

**Короткий ответ**

Auth связан с backend, cookies, sessions, OAuth/OIDC, CSRF/XSS, storage и deployment. React может показать login UI и
читать session state, но модель безопасности определяется сервером и инфраструктурой.

**Полный ответ**

Auth связан с backend, cookies, sessions, OAuth/OIDC, CSRF/XSS, storage и deployment. React может показать login UI и
читать session state, но модель безопасности определяется сервером и инфраструктурой.





#### Вопрос: Где хранить auth session?

**Короткий ответ**

Для web-приложений часто безопаснее httpOnly cookies и server/session validation, чем хранить access token в
localStorage. В React state можно держать только derived UI state о пользователе, а не делать frontend единственным
источником правды.

**Полный ответ**

Для web-приложений часто безопаснее httpOnly cookies и server/session validation, чем хранить access token в
`localStorage`. В React state можно держать только derived UI state о пользователе, а не делать frontend единственным
источником правды.





#### Вопрос: Когда использовать hosted auth provider?

**Короткий ответ**

Clerk, Auth0, WorkOS AuthKit, Supabase Auth, Firebase Auth или AWS Cognito уместны, когда команда хочет быстрее получить
OAuth, SSO, MFA, user management и compliance features. Self-hosted auth оправдан, если есть сильные требования к
контролю, стоимости, данным или интеграции.

**Полный ответ**

Clerk, Auth0, WorkOS AuthKit, Supabase Auth, Firebase Auth или AWS Cognito уместны, когда команда хочет быстрее получить
OAuth, SSO, MFA, user management и compliance features. Self-hosted auth оправдан, если есть сильные требования к
контролю, стоимости, данным или интеграции.





#### Вопрос: Чем Next.js API routes отличаются от отдельного backend?

**Короткий ответ**

API routes/server functions живут рядом с frontend и удобны для BFF, simple endpoints и server-side integration.
Отдельный backend лучше, когда есть независимый lifecycle, несколько клиентов, сложная domain model, очереди, фоновые
jobs или отдельная backend-команда.

**Полный ответ**

API routes/server functions живут рядом с frontend и удобны для BFF, simple endpoints и server-side integration.
Отдельный backend лучше, когда есть независимый lifecycle, несколько клиентов, сложная domain model, очереди, фоновые
jobs или отдельная backend-команда.





#### Вопрос: Когда Hono, Fastify, Express, NestJS или tRPC подходят для React-проекта?

**Короткий ответ**

Hono/Fastify/Express подходят для легкого Node или edge backend. NestJS ближе Angular-разработчикам из-за DI, decorators
и module structure. tRPC особенно полезен, когда frontend и backend на TypeScript и команда хочет end-to-end type
safety.

**Полный ответ**

Hono/Fastify/Express подходят для легкого Node или edge backend. NestJS ближе Angular-разработчикам из-за DI, decorators
и module structure. tRPC особенно полезен, когда frontend и backend на TypeScript и команда хочет end-to-end type
safety.





#### Вопрос: Чем Drizzle отличается от Prisma на уровне выбора?

**Короткий ответ**

Prisma дает высокий DX, schema-first workflow и зрелый ecosystem. Drizzle ближе к SQL-like typed query builder и может
быть привлекательнее для команд, которым нужен более явный контроль SQL. В любом случае database layer не должен
зависеть от React.

**Полный ответ**

Prisma дает высокий DX, schema-first workflow и зрелый ecosystem. Drizzle ближе к SQL-like typed query builder и может
быть привлекательнее для команд, которым нужен более явный контроль SQL. В любом случае database layer не должен
зависеть от React.



### Hosting



#### Вопрос: Как выбрать hosting?

**Короткий ответ**

Краткая суть раскрыта в полном ответе с кодом или практическим примером.

**Полный ответ**

| Ситуация                            | Подход                                                 |
| ----------------------------------- | ------------------------------------------------------ |
| Static SPA                          | Firebase Hosting / Netlify / Vercel / Cloudflare Pages |
| Next.js с managed DX                | Vercel                                                 |
| Edge/serverless functions           | Cloudflare / Vercel / Netlify                          |
| Fullstack app с long-running server | Render / Fly.io / Railway                              |
| Больше контроля и дешевле infra     | VPS: DigitalOcean / Hetzner / Coolify                  |
| Enterprise cloud requirements       | AWS / Azure / Google Cloud                             |





#### Вопрос: Почему Vercel часто выбирают для Next.js?

**Короткий ответ**

Vercel тесно поддерживает Next.js features: SSR, ISR, App Router, serverless/edge functions и previews. Это хороший DX,
но важно понимать vendor lock-in и переносимость нестандартных возможностей.

**Полный ответ**

Vercel тесно поддерживает Next.js features: SSR, ISR, App Router, serverless/edge functions и previews. Это хороший DX,
но важно понимать vendor lock-in и переносимость нестандартных возможностей.





#### Вопрос: Когда Cloudflare интересен для React/fullstack React?

**Короткий ответ**

Когда важны edge runtime, глобальная близость к пользователю, Cloudflare Pages/Workers и интеграция с KV, D1 или R2. Но
edge runtime имеет ограничения Node APIs, поэтому совместимость нужно проверять заранее.

**Полный ответ**

Когда важны edge runtime, глобальная близость к пользователю, Cloudflare Pages/Workers и интеграция с KV, D1 или R2. Но
edge runtime имеет ограничения Node APIs, поэтому совместимость нужно проверять заранее.





#### Вопрос: Чем hosting SPA отличается от hosting SSR-приложения?

**Короткий ответ**

SPA можно раздать как static files через CDN. SSR-приложению нужен runtime: serverless functions, edge runtime или
long-running server. Это влияет на cache, secrets, logs, cold starts и стоимость.

**Полный ответ**

SPA можно раздать как static files через CDN. SSR-приложению нужен runtime: serverless functions, edge runtime или
long-running server. Это влияет на cache, secrets, logs, cold starts и стоимость.





#### Вопрос: Что спросить перед выбором hosting provider?

**Короткий ответ**

Нужен ли SSR, где живет backend, какие требования к regions, secrets, logs, previews, cache, compliance, budget и
rollback. Frontend-разработчик не обязан быть DevOps, но должен понимать, как deployment model влияет на React-стек.

**Полный ответ**

Нужен ли SSR, где живет backend, какие требования к regions, secrets, logs, previews, cache, compliance, budget и
rollback. Frontend-разработчик не обязан быть DevOps, но должен понимать, как deployment model влияет на React-стек.



### i18n, rich text, upload и drag and drop



#### Вопрос: Почему i18n - это не просто словарь строк?

**Короткий ответ**

i18n включает plural rules, dates, numbers, currencies, direction, fallback languages, routing, SEO и перевод контента.
Для React часто встречаются react-i18next, next-intl, Lingui и FormatJS, но базовые проблемы общие для всего frontend.

**Полный ответ**

i18n включает plural rules, dates, numbers, currencies, direction, fallback languages, routing, SEO и перевод контента.
Для React часто встречаются react-i18next, next-intl, Lingui и FormatJS, но базовые проблемы общие для всего frontend.





#### Вопрос: Когда выбирать react-i18next или next-intl?

**Короткий ответ**

react-i18next подходит для обычных React SPA и проектов, где нужен зрелый i18next ecosystem. next-intl логичен в
Next.js, особенно когда i18n связан с routing, server rendering и переводом metadata.

**Полный ответ**

react-i18next подходит для обычных React SPA и проектов, где нужен зрелый i18next ecosystem. next-intl логичен в
Next.js, особенно когда i18n связан с routing, server rendering и переводом metadata.





#### Вопрос: Какие риски есть у rich text editor?

**Короткий ответ**

Rich text - это schema, serialization, paste handling, history, collaboration, accessibility, security и migration
content model. Tiptap, BlockNote, Plate, Lexical и Slate выбирают не по названию, а по требованиям к редактору и данным.

**Полный ответ**

Rich text - это schema, serialization, paste handling, history, collaboration, accessibility, security и migration
content model. Tiptap, BlockNote, Plate, Lexical и Slate выбирают не по названию, а по требованиям к редактору и данным.





#### Вопрос: Как безопасно работать с HTML из rich text editor?

**Короткий ответ**

Нужно sanitization, allowlist tags/attributes, осторожность с links/media и понимание, где HTML хранится и рендерится.
React escaping помогает для text nodes, но намеренный render HTML требует отдельной security проверки.

**Полный ответ**

Нужно sanitization, allowlist tags/attributes, осторожность с links/media и понимание, где HTML хранится и рендерится.
React escaping помогает для text nodes, но намеренный render HTML требует отдельной security проверки.





#### Вопрос: Какие риски есть у file upload?

**Короткий ответ**

Размеры файлов, типы, вирусы, private access, presigned URLs, retry, progress, cancellation и обработка ошибок. Иногда
достаточно native file input, иногда нужны Uppy, UploadThing или собственный flow через storage provider.

**Полный ответ**

Размеры файлов, типы, вирусы, private access, presigned URLs, retry, progress, cancellation и обработка ошибок. Иногда
достаточно native file input, иногда нужны Uppy, UploadThing или собственный flow через storage provider.





#### Вопрос: Почему drag and drop сложнее, чем кажется?

**Короткий ответ**

Нужно учитывать keyboard access, screen readers, touch devices, auto-scroll, collision detection, virtualization и
reordering state. dnd-kit часто лучше современного выбора, а react-beautiful-dnd стоит воспринимать как legacy context.

**Полный ответ**

Нужно учитывать keyboard access, screen readers, touch devices, auto-scroll, collision detection, virtualization и
reordering state. dnd-kit часто лучше современного выбора, а react-beautiful-dnd стоит воспринимать как legacy context.



### Mobile и desktop



#### Вопрос: Чем React Native отличается от React DOM?

**Короткий ответ**

React Native использует React-модель компонентов, но рендерит native UI, а не DOM. Поэтому знание React помогает, но не
заменяет понимание mobile navigation, gestures, native modules, platform APIs и performance.

**Полный ответ**

React Native использует React-модель компонентов, но рендерит native UI, а не DOM. Поэтому знание React помогает, но не
заменяет понимание mobile navigation, gestures, native modules, platform APIs и performance.





#### Вопрос: Когда Expo упрощает разработку?

**Короткий ответ**

Expo дает быстрый старт, managed workflow, OTA updates и готовые APIs для типовых mobile-задач. Он особенно полезен,
когда команда не хочет сразу погружаться в native build infrastructure.

**Полный ответ**

Expo дает быстрый старт, managed workflow, OTA updates и готовые APIs для типовых mobile-задач. Он особенно полезен,
когда команда не хочет сразу погружаться в native build infrastructure.





#### Вопрос: Когда нужен Electron, а когда Tauri может быть альтернативой?

**Короткий ответ**

Electron подходит, когда нужно desktop-приложение на web stack и важна зрелая ecosystem. Tauri может быть легче по
ресурсам и размеру bundle, но требует учитывать Rust/backend integration и зрелость нужных plugins.

**Полный ответ**

Electron подходит, когда нужно desktop-приложение на web stack и важна зрелая ecosystem. Tauri может быть легче по
ресурсам и размеру bundle, но требует учитывать Rust/backend integration и зрелость нужных plugins.





#### Вопрос: Какие части можно переиспользовать между web и mobile?

**Короткий ответ**

Обычно переиспользуют domain types, validation schemas, API client, query keys, business rules и design tokens. UI
components между React DOM и React Native обычно не переиспользуются напрямую, потому что primitives и accessibility
contracts разные.

**Полный ответ**

Обычно переиспользуют domain types, validation schemas, API client, query keys, business rules и design tokens. UI
components между React DOM и React Native обычно не переиспользуются напрямую, потому что primitives и accessibility
contracts разные.



### Выбор стека на интервью



#### Вопрос: Какие требования продукта влияют на выбор React-стека?

**Короткий ответ**

SPA или SSR, SEO или internal app, простые или enterprise forms, много server state или почти все локально, готовая UI
library или своя дизайн-система, monorepo или один app, deployment target, уровень команды, testing, accessibility,
performance и security.

**Полный ответ**

SPA или SSR, SEO или internal app, простые или enterprise forms, много server state или почти все локально, готовая UI
library или своя дизайн-система, monorepo или один app, deployment target, уровень команды, testing, accessibility,
performance и security.





#### Вопрос: Как выбрать между Vite SPA, Next.js и Astro?

**Короткий ответ**

Vite SPA - для client-side apps без сильных SEO/SSR требований. Next.js - для SSR/SSG/fullstack и routing conventions.
Astro - для content/static сайтов, где React нужен точечно и важно доставлять минимум JavaScript.

**Полный ответ**

Vite SPA - для client-side apps без сильных SEO/SSR требований. Next.js - для SSR/SSG/fullstack и routing conventions.
Astro - для content/static сайтов, где React нужен точечно и важно доставлять минимум JavaScript.





#### Вопрос: Как объяснить trade-off между "меньше зависимостей" и "быстрее delivery"?

**Короткий ответ**

Меньше зависимостей снижает maintenance и upgrade risk, но команда может тратить время на повторное изобретение сложных
вещей: forms, cache, accessibility primitives. Быстрее delivery через libraries оправдан, если команда понимает
стоимость ownership и exit strategy.

**Полный ответ**

Меньше зависимостей снижает maintenance и upgrade risk, но команда может тратить время на повторное изобретение сложных
вещей: forms, cache, accessibility primitives. Быстрее delivery через libraries оправдан, если команда понимает
стоимость ownership и exit strategy.





#### Вопрос: Какие признаки overengineering и underengineering в React-проекте?

**Короткий ответ**

Overengineering: global store для локальной кнопки, monorepo без нескольких packages, SSR без SEO/perf причины, слишком
много UI abstractions. Underengineering: ручной fetch без cache в большом продукте, формы без error model, styling без
tokens, отсутствие tests на критичные flows.

**Полный ответ**

Overengineering: global store для локальной кнопки, monorepo без нескольких packages, SSR без SEO/perf причины, слишком
много UI abstractions. Underengineering: ручной `fetch` без cache в большом продукте, формы без error model, styling без
tokens, отсутствие tests на критичные flows.





#### Вопрос: Как выбрать data, state, forms, UI и testing libraries?

**Короткий ответ**

Разделите ответственность: server state - query layer, client state - local/store, forms - отдельный form layer, UI -
design system или library, tests - pyramid от unit к E2E. Не выбирайте библиотеку, пока не понятно, какую проблему она
закрывает.

**Полный ответ**

Разделите ответственность: server state - query layer, client state - local/store, forms - отдельный form layer, UI -
design system или library, tests - pyramid от unit к E2E. Не выбирайте библиотеку, пока не понятно, какую проблему она
закрывает.
