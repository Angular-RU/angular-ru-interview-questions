---
layout: ../../layouts/Layout.astro
title: QA
description:
  Вопросы и ответы по качеству, тестированию, отчетности и метрикам для Frontend и Node.js backend разработчика
category: Engineering
kind: questions
order: 135
icon: /logos/playwright.svg
---

## QA

### Quality mindset

#### Junior

<details>
<summary>Что такое QA и чем QA отличается от тестирования?</summary><br>
<table><tr><td>

QA, или Quality Assurance, — это подход к предотвращению дефектов в процессе разработки. Testing — часть QA, которая
проверяет уже реализованное поведение. Хороший разработчик думает о качестве раньше тестов: уточняет требования,
проверяет edge cases, пишет поддерживаемый код, добавляет автоматические проверки и делает поведение диагностируемым.

</td></tr></table>

</details>

<details>
<summary>Чем QA отличается от QC?</summary><br>
<table><tr><td>

QA отвечает за процесс и предотвращение проблем: требования, Definition of Done, test strategy, review, CI и quality
gates. QC, или Quality Control, проверяет результат: ручное тестирование, автотесты, acceptance checks, регрессию и
дефекты. В современной команде разработчик участвует в обоих направлениях.

</td></tr></table>

</details>

<details>
<summary>Какие уровни тестирования должен понимать Frontend или Node.js backend разработчик?</summary><br>
<table><tr><td>

- Unit tests проверяют маленькую единицу логики.
- Component tests проверяют UI-компонент или небольшой участок интерфейса.
- Integration tests проверяют совместную работу нескольких модулей, DI, HTTP, БД или очередей.
- Contract tests фиксируют совместимость между consumer и provider.
- E2E tests проверяют пользовательский или системный сценарий целиком.
- Visual regression tests ловят неожиданные изменения внешнего вида.
- Load tests проверяют поведение под нагрузкой.

Важно выбирать уровень по риску. Не нужно проверять простой mapper через E2E, а критичный checkout не стоит оставлять
только на unit-тестах.

</td></tr></table>

</details>

<details>
<summary>Что такое тестовая пирамида?</summary><br>
<table><tr><td>

Тестовая пирамида — принцип, по которому быстрых unit и integration tests должно быть больше, чем дорогих E2E tests.
Нижние уровни дают быстрый feedback и легко локализуют ошибку. Верхние уровни проверяют реальные пользовательские
сценарии, но дороже в поддержке и чаще флакают.

</td></tr></table>

</details>

#### Middle

<details>
<summary>Что разработчик должен проверить перед передачей задачи в QA?</summary><br>
<table><tr><td>

Минимум: требования, happy path, основные ошибки, loading/empty states, доступы, валидацию, responsive layout, сетевые
ошибки, миграции данных и обратную совместимость API. Также важно запустить релевантные unit, integration, E2E, lint,
typecheck и build. QA не должен быть первым человеком, который открыл новую фичу.

</td></tr></table>

</details>

<details>
<summary>Что такое Definition of Done с точки зрения качества?</summary><br>
<table><tr><td>

Definition of Done описывает, когда задача действительно готова: реализовано ожидаемое поведение, пройдены проверки,
обновлены тесты, обработаны ошибки, нет регрессий доступности и производительности, добавлена наблюдаемость, если она
нужна. Для backend также важны контракт API, миграции, безопасность и rollback plan.

</td></tr></table>

</details>

<details>
<summary>Как выбрать, какие тесты писать для новой фичи?</summary><br>
<table><tr><td>

Начинают с риска: что сломает пользователя, деньги, безопасность, данные или релиз. Pure logic удобно покрывать
unit-тестами. UI behavior — component или integration tests. Контракт frontend и backend — contract или API tests.
Критичный пользовательский путь — E2E. Нагрузку и отказоустойчивость проверяют отдельными performance tests.

</td></tr></table>

</details>

### Frontend QA

#### Junior

<details>
<summary>Какие инструменты используют для QA во frontend?</summary><br>
<table><tr><td>

Частый стек:

- Vitest, Jest, Jasmine, Karma — unit и integration tests;
- Testing Library, Angular Testing Library, React Testing Library — DOM-first проверки поведения;
- TestBed, Component Harnesses — Angular component testing;
- Playwright, Cypress — E2E и browser-level tests;
- Storybook — каталог состояний компонентов;
- Chromatic, Percy, Loki, Playwright screenshots — visual regression;
- MSW — mock server для frontend tests;
- Lighthouse, WebPageTest, Chrome DevTools Performance — performance;
- axe, pa11y, eslint-plugin-jsx-a11y, angular-eslint — accessibility;
- Sentry, LogRocket, OpenReplay — runtime диагностика.

Инструменты выбирают под проект, но важно понимать задачу каждого слоя.

</td></tr></table>

</details>

<details>
<summary>Что лучше проверять в frontend-тестах: реализацию или поведение?</summary><br>
<table><tr><td>

Обычно проверяют поведение: что пользователь видит, какие действия может выполнить и какой результат получает.
Внутренние поля, private methods, случайные CSS classes и точная структура DOM делают тесты хрупкими. Реализацию
проверяют только тогда, когда она сама является публичным контрактом.

</td></tr></table>

</details>

<details>
<summary>Как тестировать формы на frontend?</summary><br>
<table><tr><td>

Нужно проверить валидные данные, обязательные поля, ошибки формата, disabled states, server errors, повторную отправку,
keyboard flow и доступные labels. Для сложной формы полезны component или integration tests, а для критичного сценария
отправки — один E2E test.

</td></tr></table>

</details>

#### Middle

<details>
<summary>Когда frontend-команде нужен Playwright?</summary><br>
<table><tr><td>

Playwright нужен для browser-level сценариев: авторизация, checkout, routing, интеграция с backend, загрузка файлов,
проверка нескольких браузеров, tracing, screenshots и видео падений. Он особенно полезен, когда unit или component tests
не покрывают реальное поведение браузера и сетевого слоя.

</td></tr></table>

</details>

<details>
<summary>Что такое visual regression testing?</summary><br>
<table><tr><td>

Visual regression testing сравнивает screenshots или snapshots UI между прогонами и ловит неожиданные изменения верстки.
Он полезен для design systems, компонентных библиотек, сложных страниц и критичных визуальных состояний. Чтобы тесты не
флакали, фиксируют данные, viewport, шрифты, анимации и состояние окружения.

</td></tr></table>

</details>

<details>
<summary>Как проверять accessibility на frontend?</summary><br>
<table><tr><td>

Автоматически проверяют базовые нарушения через axe, eslint rules, Lighthouse или pa11y. Вручную проверяют keyboard
navigation, focus order, visible focus, labels, error messages, screen reader flow, contrast и состояние interactive
elements. Автотесты помогают, но не заменяют ручную проверку ключевых сценариев.

</td></tr></table>

</details>

<details>
<summary>Какие frontend performance-метрики стоит знать?</summary><br>
<table><tr><td>

Ключевые метрики: LCP для скорости основного контента, INP для отзывчивости, CLS для стабильности layout, TTFB для
ответа сервера, FCP для первого видимого контента и bundle size для стоимости загрузки. Важно смотреть не только lab
tests, но и real user monitoring, потому что реальные устройства и сети отличаются от CI.

</td></tr></table>

</details>

### Node.js backend QA

#### Junior

<details>
<summary>Какие инструменты используют для QA в Node.js backend?</summary><br>
<table><tr><td>

Частый стек:

- Vitest, Jest, Mocha, Node test runner — unit и integration tests;
- Supertest, PactumJS, Frisby — HTTP API tests;
- Testcontainers — тесты с реальными PostgreSQL, Redis, Kafka или RabbitMQ;
- Pact — consumer-driven contract testing;
- OpenAPI validators, Schemathesis, Dredd — проверка API-контрактов;
- k6, Artillery, autocannon, wrk — нагрузочные тесты;
- ESLint, TypeScript strict, Knip, dependency-cruiser — статический анализ;
- Snyk, npm audit, osv-scanner, Trivy — security и dependency checks;
- OpenTelemetry, Prometheus, Grafana, Sentry, Datadog — observability.

Разработчик должен понимать не только запуск тестов, но и какие риски каждый инструмент закрывает.

</td></tr></table>

</details>

<details>
<summary>Как тестировать REST API?</summary><br>
<table><tr><td>

Проверяют status codes, response schema, headers, authorization, validation errors, pagination, sorting, filtering,
idempotency и backward compatibility. Для handler logic можно использовать integration test с контролируемыми
dependencies. Для публичного API полезно проверять соответствие OpenAPI spec.

</td></tr></table>

</details>

<details>
<summary>Как тестировать работу backend с базой данных?</summary><br>
<table><tr><td>

Чистую domain logic тестируют без БД. Repository, migrations, transactions, constraints и SQL queries лучше проверять на
реальной тестовой БД через Testcontainers или отдельное test environment. Моки БД быстрее, но хуже ловят ошибки schema,
transaction isolation и несовместимость запросов.

</td></tr></table>

</details>

#### Middle

<details>
<summary>Что такое contract testing?</summary><br>
<table><tr><td>

Contract testing проверяет, что provider API совместим с ожиданиями consumer. Это особенно полезно, когда frontend и
backend релизятся независимо. Контракт фиксирует method, path, headers, request body, response body и ошибки. Такие
тесты не заменяют E2E, но уменьшают число поломок на границе сервисов.

</td></tr></table>

</details>

<details>
<summary>Как тестировать авторизацию и права доступа?</summary><br>
<table><tr><td>

Нужно проверять anonymous user, authenticated user, разные роли, чужие ресурсы, expired tokens, malformed tokens и
отсутствующие scopes. Важны негативные сценарии: пользователь не должен получить данные другого tenant, выполнить
запрещенную операцию или обойти проверку через прямой API-запрос.

</td></tr></table>

</details>

<details>
<summary>Как тестировать очереди, cron jobs и webhooks?</summary><br>
<table><tr><td>

Проверяют idempotency, retry policy, dead-letter queue, порядок обработки, дубликаты, подписи webhook, timeout и
частичную недоступность зависимостей. Для unit-теста выносят чистую обработку события в функцию. Для integration-теста
поднимают реальный broker или контролируемый fake.

</td></tr></table>

</details>

<details>
<summary>Какие backend performance-метрики важны для Node.js?</summary><br>
<table><tr><td>

Смотрят latency, p50, p95, p99, throughput, RPS, error rate, saturation, CPU, memory, GC pauses, event loop lag,
database query duration, queue depth и timeout rate. Среднее время ответа почти всегда недостаточно: p95 и p99 лучше
показывают, как система ведет себя для медленных пользователей и под нагрузкой.

</td></tr></table>

</details>

### Allure, reports and metrics

#### Junior

<details>
<summary>Что такое Allure Report?</summary><br>
<table><tr><td>

Allure Report — open-source инструмент для визуализации результатов автотестов. Он преобразует структурированные данные
о прогоне в интерактивный HTML-отчет с тестами, шагами, длительностью, ошибками, attachments, labels, историей и
аналитикой.

Allure не запускает тесты и не заменяет Playwright, Cypress, Jest, Vitest или другой test runner. Между test runner и
Allure обычно работает adapter или reporter, который записывает результаты в понятном Allure формате.

</td></tr></table>

</details>

<details>
<summary>Как Allure Report работает от запуска тестов до готового отчета?</summary><br>
<table><tr><td>

Упрощенный процесс:

1. Test runner запускает автотесты.
2. Allure adapter получает события test runner: начало и завершение тестов, ошибки, steps, labels и attachments.
3. Adapter записывает структурированные файлы в каталог `allure-results`.
4. Allure CLI читает результаты и генерирует HTML-отчет, обычно в каталоге `allure-report`.
5. Отчет открывают локально или публикуют как CI artifact либо статический сайт.

Сбор результатов и генерация HTML-отчета — два отдельных этапа.

</td></tr></table>

</details>

<details>
<summary>Чем allure-results отличается от allure-report?</summary><br>
<table><tr><td>

`allure-results` содержит исходные данные, созданные adapter во время выполнения тестов: test result files, containers,
attachments, environment и другие metadata.

`allure-report` — готовый HTML-сайт, сгенерированный из этих результатов. Его можно открыть в браузере, сохранить как
artifact или опубликовать на web server. Удаленный отчет можно сгенерировать заново, если сохранен `allure-results`.

</td></tr></table>

</details>

<details>
<summary>Какие сущности есть в Allure?</summary><br>
<table><tr><td>

Частые сущности:

- test case — отдельный тест;
- suite — группа тестов;
- step — шаг внутри теста;
- attachment — screenshot, trace, video, log, request или response;
- label — epic, feature, story, owner, severity, tag;
- status — passed, failed, broken, skipped;
- history — информация о предыдущих запусках.

Хорошая структура отчета помогает не читать весь CI log ради одной ошибки.

</td></tr></table>

</details>

<details>
<summary>Зачем нужны steps в Allure?</summary><br>
<table><tr><td>

Steps разбивают тест на понятные действия: открыть страницу, заполнить форму, отправить запрос, проверить результат. Они
помогают увидеть, на каком этапе произошла ошибка и сколько времени занял каждый этап.

Steps должны описывать бизнес-действия или значимые технические операции. Слишком мелкие steps создают шум, а один step
на весь тест не помогает локализовать проблему.

</td></tr></table>

</details>

<details>
<summary>Что такое attachments в Allure и что стоит прикладывать к падению?</summary><br>
<table><tr><td>

Attachment — файл или данные, связанные с тестом либо step. Для E2E-теста полезно сохранять screenshot, video,
Playwright trace, browser console logs и network logs. Для API-теста — request, response, headers и server logs. Для
visual regression — actual, expected и diff images.

Attachments должны помогать расследовать падение без повторного запуска. Нельзя публиковать access tokens, пароли,
cookies, персональные данные и другие секреты: их нужно удалять или маскировать.

</td></tr></table>

</details>

<details>
<summary>Чем статус failed отличается от broken в Allure?</summary><br>
<table><tr><td>

`failed` обычно означает, что assertion не прошел или проверяемое поведение не соответствует ожиданию. `broken` чаще
означает ошибку самого теста или инфраструктуры: exception в setup, ошибка fixture, timeout окружения или неподнятый
backend.

Точное преобразование ошибок в `failed` и `broken` зависит от конкретного adapter.

</td></tr></table>

</details>

#### Middle

<details>
<summary>Как подключить Allure к Playwright, Cypress, Jest или Vitest?</summary><br>
<table><tr><td>

Общий принцип одинаковый:

1. Установить совместимый с test runner Allure adapter или reporter.
2. Подключить его в конфигурации test runner.
3. Указать каталог для результатов.
4. Запустить тесты и проверить, что появились result files и attachments.
5. Сгенерировать или открыть отчет через Allure CLI.
6. В CI сохранить результаты и готовый отчет как artifacts либо опубликовать отчет.

Конкретные package names и options зависят от test runner и версии интеграции.

</td></tr></table>

</details>

<details>
<summary>Какие метрики смотреть в Allure?</summary><br>
<table><tr><td>

Полезные метрики:

- pass rate, fail rate, skip rate;
- количество failed и broken tests;
- duration всего прогона и отдельных тестов;
- trend по запускам;
- flaky tests и нестабильные suites;
- самые медленные тесты;
- падения по feature, story, owner, severity и tag;
- история конкретного теста.

Метрики нужны для решений: что чинить первым, где замедление и какие тесты перестали защищать продукт.

</td></tr></table>

</details>

<details>
<summary>Для чего нужны labels epic, feature, story, owner и severity?</summary><br>
<table><tr><td>

Labels позволяют искать, фильтровать и группировать тесты:

- `epic`, `feature`, `story` описывают продуктовую иерархию;
- `owner` показывает ответственную команду или человека;
- `severity` отражает критичность сценария;
- `tag` добавляет классификацию, например `smoke`, `regression` или `payments`.

Labels полезны, когда они стабильны и связаны с реальной структурой продукта.

</td></tr></table>

</details>

<details>
<summary>Как сохранить history и trends между CI-запусками?</summary><br>
<table><tr><td>

Для trends Allure должен получить history data предыдущего отчета при генерации следующего. Поэтому CI pipeline обычно:

1. Загружает history предыдущего отчета или artifact.
2. Добавляет эти данные к результатам нового запуска способом, который поддерживает используемая версия Allure.
3. Генерирует новый отчет.
4. Сохраняет новый отчет и его history для следующего запуска.

Если CI job всегда начинается с чистого workspace и history не восстанавливается, отчет покажет только текущий запуск.

</td></tr></table>

</details>

<details>
<summary>Как Allure связывает retries и историю одного теста?</summary><br>
<table><tr><td>

Allure должен стабильно идентифицировать один и тот же test case между попытками и запусками. Обычно идентификатор
зависит от framework, полного имени теста, параметров и metadata.

Если постоянно менять title, suite или параметры, Allure может воспринимать тест как новый, и история разорвется. Retry
может быть временным safety net, но не должен маскировать нестабильность теста.

</td></tr></table>

</details>

<details>
<summary>Как собрать единый Allure Report при parallel execution и sharding?</summary><br>
<table><tr><td>

Каждый worker или CI job генерирует свою часть Allure results. После выполнения shards результаты собирают в один
каталог, а отчет генерируют один раз из объединенного набора.

Обычно отдельный aggregate job скачивает artifacts всех shards, объединяет result files и запускает генератор. Важно не
потерять attachments и не перезаписать файлы результатами другого worker.

</td></tr></table>

</details>

<details>
<summary>Что такое flaky test?</summary><br>
<table><tr><td>

Flaky test иногда проходит, а иногда падает без изменения кода. Причины: race conditions, реальные timers, нестабильная
сеть, shared state, зависимость от порядка тестов, динамические данные, анимации, неявные ожидания и перегруженное CI
окружение. Flaky tests опасны, потому что команда перестает доверять проверкам.

</td></tr></table>

</details>

<details>
<summary>Как бороться с flaky tests?</summary><br>
<table><tr><td>

Нужно воспроизвести падение, изучить trace, video, screenshot и logs, затем убрать недетерминизм. Помогают стабильные
locators, явные ожидания состояния, изоляция данных, независимые тесты, test fixtures, mock network, отключение
анимаций, контролируемые часы и отказ от произвольных sleep. Retry не заменяет исправление причины.

</td></tr></table>

</details>

<details>
<summary>Как расследовать падение теста по Allure Report?</summary><br>
<table><tr><td>

Полезный порядок:

1. Проверить status, error message и stack trace.
2. Найти последний успешный step.
3. Открыть screenshot, trace, video и logs.
4. Сравнить environment, параметры и test data.
5. Посмотреть retries и историю теста.
6. Проверить, падают ли соседние тесты по той же причине.
7. Определить класс проблемы: product, test, data, environment или infrastructure.

Allure собирает признаки в одном месте, но инженер все равно должен проверить гипотезу и локализовать причину.

</td></tr></table>

</details>

<details>
<summary>Какие артефакты стоит сохранять после CI-прогона тестов?</summary><br>
<table><tr><td>

Для unit и integration tests полезны coverage, junit report и Allure results. Для E2E важны screenshots, videos,
Playwright traces, browser console logs, network logs и server logs. Для performance tests сохраняют summary,
thresholds, raw metrics и сравнение с baseline. Артефакты должны помогать расследовать проблему без повторного запуска.

</td></tr></table>

</details>

#### Middle+ or Senior

<details>
<summary>Чего Allure Report не заменяет?</summary><br>
<table><tr><td>

Allure Report не заменяет:

- test runner и сами автотесты;
- корректные assertions и test design;
- CI/CD pipeline;
- code coverage;
- логи приложения и observability;
- issue tracker и процесс triage;
- test management систему, если команде нужны test plans и manual cases.

Красивый отчет не исправляет flaky tests, слабые проверки или отсутствие важных сценариев.

</td></tr></table>

</details>

<details>
<summary>Можно ли использовать Allure как quality gate?</summary><br>
<table><tr><td>

Метрики отчета можно использовать как один из сигналов: количество failed и broken tests, pass rate, критичные сценарии,
длительность или рост нестабильности. Но merge или release gate должен опираться на надежные machine-readable
результаты, а не только на HTML-страницу.

Нельзя автоматически блокировать релиз по любой нестабильной метрике без анализа причин: flaky tests и ошибки
инфраструктуры могут остановить разработку.

</td></tr></table>

</details>

<details>
<summary>Какие риски безопасности есть при публикации Allure Report?</summary><br>
<table><tr><td>

Отчет и attachments могут содержать URL, headers, cookies, tokens, персональные данные, содержимое форм, screenshots
внутренних систем и stack traces. Перед публикацией нужно маскировать секреты, ограничивать доступ и задавать срок
хранения artifacts.

Особенно внимательно нужно проверять automatic request/response attachments: они часто сохраняют больше данных, чем
ожидает автор теста.

</td></tr></table>

</details>

### CI/CD and quality gates

#### Middle

<details>
<summary>Какие проверки должны запускаться в CI?</summary><br>
<table><tr><td>

Обычно запускают format check, lint, typecheck, unit tests, integration tests, build, dependency audit, secret scan,
coverage, contract tests и E2E для критичных flows. Для frontend также полезны accessibility и visual regression checks.
Для backend — migrations check, API schema validation и smoke tests.

</td></tr></table>

</details>

<details>
<summary>Что такое quality gate?</summary><br>
<table><tr><td>

Quality gate — набор условий, без которых изменение нельзя слить или выпустить. Например: нет failed tests, build
проходит, coverage не падает ниже порога, нет critical vulnerabilities, API contract совместим, p95 latency не хуже
baseline. Gate должен защищать продукт, а не просто имитировать строгость.

</td></tr></table>

</details>

<details>
<summary>Как ускорять медленный тестовый pipeline?</summary><br>
<table><tr><td>

Сначала измеряют, где время: install, build, unit, integration, E2E, browser setup или artifacts. Затем используют
cache, parallelization, test sharding, affected tests, отдельные suites по риску, быстрые smoke checks и nightly full
regression. Удалять важные проверки без замены опасно: лучше менять уровень теста или улучшать инфраструктуру.

</td></tr></table>

</details>

<details>
<summary>Что делать, если E2E-тест падает только в CI?</summary><br>
<table><tr><td>

Нужно сравнить окружение: viewport, browser version, timezone, locale, CPU, network, test data, feature flags и backend.
Дальше смотреть trace, screenshot, video, console и network logs. Частые причины — race condition, слишком слабое
ожидание, тестовые данные, анимации, порядок тестов и недостаточная изоляция state.

</td></tr></table>

</details>

### Coverage and risk

#### Junior

<details>
<summary>Что такое code coverage?</summary><br>
<table><tr><td>

Code coverage показывает, какая часть кода была выполнена тестами. Частые метрики: statements, branches, functions и
lines. Coverage полезен как индикатор непроверенных зон, но не доказывает качество: тест может выполнить строку и не
проверить важное поведение.

</td></tr></table>

</details>

<details>
<summary>Почему 100% coverage не гарантирует качество?</summary><br>
<table><tr><td>

Coverage не говорит, были ли правильные assertions, проверены ли edge cases, соответствуют ли тесты требованиям и ловят
ли они реальные регрессии. Можно получить высокий coverage тестами, которые повторяют реализацию или проверяют только
happy path. Качество тестов важнее красивого процента.

</td></tr></table>

</details>

#### Middle+ or Senior

<details>
<summary>Как оценивать качество тестового набора?</summary><br>
<table><tr><td>

Смотрят, какие риски покрыты, насколько быстро тесты дают feedback, легко ли понять падение, насколько они стабильны и
не мешают рефакторингу. Хороший набор ловит важные регрессии, локализует проблему, не завязан на случайные детали
реализации и поддерживается вместе с продуктовым кодом.

</td></tr></table>

</details>

<details>
<summary>Как построить QA-стратегию для новой фичи?</summary><br>
<table><tr><td>

Нужно разобрать требования, риски, пользователей, данные, интеграции, права доступа, observability и rollback. Затем
выбрать минимальный набор проверок: unit для логики, integration для границ, contract для API, E2E для критичного пути,
manual exploratory testing для новых UX-сценариев. После релиза важны мониторинг, error alerts и быстрый feedback loop.

</td></tr></table>

</details>

<details>
<summary>Какие вопросы задать кандидату про QA на практическом интервью?</summary><br>
<table><tr><td>

Хорошие сценарии:

- E2E падает только в CI. Как расследовать?
- После релиза вырос error rate. Какие действия?
- Тесты стали идти в три раза дольше. Что измерять?
- Пользователь видит баг, но локально он не воспроизводится. Что делать?
- Как протестировать авторизацию, upload file, поиск, оплату или webhook?
- Какие проверки поставить в CI для frontend и Node.js backend?
- Какие метрики посмотреть в Allure после нестабильного релиза?

Ответ должен показывать инженерное мышление: риск, изоляцию причины, артефакты, проверку гипотез и понятный следующий
шаг.

</td></tr></table>

</details>
