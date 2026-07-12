---
layout: ../../layouts/Layout.astro
title: DevOps
description: CI/CD, deployment, feature toggles и delivery frontend-приложений
category: Инфраструктура
kind: questions
order: 160
---

## DevOps

### CI/CD overview

<details>
<summary>Что такое CI/CD?</summary><br>
<table><tr><td>

На уровне командного процесса CI/CD отвечает за правило: каждое изменение должно проходить одинаковые автоматические
проверки, а доставка в окружения должна быть понятной и воспроизводимой.

CI регулярно объединяет изменения и автоматически запускает проверки. CD отвечает за доставку проверенного artifact в
окружения. Continuous delivery оставляет production release под ручным подтверждением, а continuous deployment
автоматически публикует каждое прошедшее изменение.

Deployment, artifacts, CDN cache и rollback описаны ниже в разделе [Frontend deployment](#frontend-deployment).

</td></tr></table>

</details>

### CI/CD для frontend delivery

<details>
<summary>Что проверяет frontend CI pipeline?</summary><br>
<table><tr><td>

Обычно pipeline устанавливает зависимости по lock-файлу, запускает type check, lint, unit/integration tests и production
build. Для критичных пользовательских flows добавляют E2E или component tests в браузере.

Важно сохранять artifacts диагностики: test reports, coverage, traces, screenshots и build logs.

</td></tr></table>

</details>

<details>
<summary>Что делает CD pipeline для frontend?</summary><br>
<table><tr><td>

CD берет уже проверенный build artifact и доставляет его в окружение: preview, staging или production. Хороший pipeline
не пересобирает произвольный другой код на этапе выкладки, а продвигает понятный artifact между окружениями.

Для static frontend важно настроить cache headers: hashed chunks можно кешировать долго, а `index.html` и runtime config
обычно обновляют осторожнее. Rollback должен возвращать совместимую версию `index.html`, assets и config.

</td></tr></table>

</details>

### Frontend deployment

<details>
<summary>Что значит интегрировать frontend code в production environment?</summary><br>
<table><tr><td>

Это значит не только собрать bundle, но и доставить его в окружение, где работают routing, API, CDN, cache, runtime
config, security headers, monitoring и rollback. Для SPA важно настроить fallback на `index.html`, версионирование
assets и стратегию cache invalidation, чтобы пользователь не получил несовместимые версии файлов.

</td></tr></table>

</details>

<details>
<summary>Какие вопросы нужно задать перед production deployment frontend-приложения?</summary><br>
<table><tr><td>

Нужно понять, где собирается приложение, где хранятся artifacts, как задаются environment variables, кто отвечает за
release, как работает rollback, какие checks обязательны и как мониторятся ошибки. Без этих ответов deployment остается
ручной и рискованной процедурой.

</td></tr></table>

</details>

<details>
<summary>Что является артефактом frontend build?</summary><br>
<table><tr><td>

Обычно это `index.html`, hashed JavaScript/CSS chunks, images, fonts и manifests. SSR дополнительно создает server
bundle. Artifact должен быть immutable и одинаково проходить stage и production.

</td></tr></table>

</details>

<details>
<summary>Чем dev server отличается от production hosting?</summary><br>
<table><tr><td>

Dev server дает watch, source maps и HMR, но не рассчитан на security, compression, caching и нагрузку. Production
hosting раздает готовые artifacts через web server/CDN. Проверка только через dev server недостаточна.

</td></tr></table>

</details>

<details>
<summary>Где обычно хранят production frontend assets?</summary><br>
<table><tr><td>

В object storage, CDN origin, web server image или managed hosting. Static assets удобно хранить отдельно от backend.
Доступ должен поддерживать HTTPS, correct MIME types и cache headers.

</td></tr></table>

</details>

<details>
<summary>Что такое CDN?</summary><br>
<table><tr><td>

CDN кеширует и отдает content с edge servers ближе к пользователю. Он снижает latency и нагрузку на origin. Нужно
управлять cache keys, invalidation, compression и security headers.

</td></tr></table>

</details>

<details>
<summary>Как CDN меняет путь от браузера до сервера?</summary><br>
<table><tr><td>

Браузер обычно идет не напрямую на origin server, а на ближайший edge node CDN. Edge может отдать cached response,
сделать TLS termination, применить redirects/security headers/compression или проксировать request дальше на origin.

Для frontend это меняет диагностику: низкий TTFB может означать cache hit на edge, высокий TTFB — cache miss, долгий
origin fetch или проблему географии. Важно смотреть response headers вроде `Cache-Control`, `Age`, `Via`, `X-Cache` и
trace id.

</td></tr></table>

</details>

<details>
<summary>Что такое load balancing?</summary><br>
<table><tr><td>

Load balancing распределяет запросы между несколькими instance приложения или сервиса. Он повышает доступность,
позволяет переживать рост нагрузки и выводить instance из rotation при проблемах.

Frontend-разработчику важно понимать последствия: запросы могут попадать на разные backend instance, поэтому нельзя
полагаться на локальную память одного сервера. Для UI это влияет на sticky sessions, WebSocket-подключения, retry и
диагностику ошибок по trace id.

</td></tr></table>

</details>

<details>
<summary>Как load balancer влияет на frontend?</summary><br>
<table><tr><td>

Load balancer может отправлять соседние API-запросы на разные backend instances. Поэтому frontend не должен полагаться
на состояние в памяти одного сервера, а backend должен хранить session/data в общем хранилище или использовать
осознанные sticky sessions.

Практические эффекты: WebSocket может требовать sticky routing, retries могут попасть на другой instance, часть ошибок
видна только на одном pod/server. Для расследования нужны request id, release version, region и понятные error headers.

</td></tr></table>

</details>

<details>
<summary>Что такое cache invalidation?</summary><br>
<table><tr><td>

Cache invalidation — правила, по которым кеш перестает считать данные актуальными. Это может быть TTL, revalidation
через `ETag`, purge в CDN, versioned URL или явное обновление application cache после mutation.

Во frontend важно понимать, какой слой кеша отвечает за данные: browser HTTP cache, Service Worker, CDN, клиентский
state manager или backend. Иначе можно исправить данные на сервере, но продолжать показывать stale UI из другого кеша.

Для deployment особенно важно разделять `index.html` и hashed assets: HTML обычно кешируют осторожно, а JS, CSS и media
с content hash можно кешировать дольше. Иначе браузер или CDN могут смешать старый HTML с новыми chunks или наоборот.

</td></tr></table>

</details>

<details>
<summary>Что такое queue или message broker на базовом уровне?</summary><br>
<table><tr><td>

Queue хранит сообщения или задачи до обработки consumer-ом. Message broker помогает передавать события между сервисами,
выравнивать пики нагрузки и повторять обработку при временных сбоях.

Для frontend это важно в сценариях, где пользователь отправил действие, а результат появится позже: генерация отчета,
импорт файла, отправка email, обработка платежа. UI должен показывать pending state, polling или push-обновления,
обрабатывать retry и не обещать мгновенный результат там, где система асинхронна.

</td></tr></table>

</details>

<details>
<summary>Что такое retry, timeout и backoff?</summary><br>
<table><tr><td>

Timeout ограничивает время ожидания операции. Retry повторяет запрос после временной ошибки. Backoff увеличивает паузу
между повторами, чтобы не усилить нагрузку на уже проблемный сервис.

Во frontend retry уместен для безопасных idempotent operations, например чтения данных. Для mutation-запросов нужно быть
осторожнее: повторная отправка формы может создать дубль, если backend не поддерживает idempotency key.

```ts
const idempotencyKey = crypto.randomUUID();

await fetch('/api/orders', {
  method: 'POST',
  headers: {'Idempotency-Key': idempotencyKey},
  body: JSON.stringify(orderDraft),
});
```

</td></tr></table>

</details>

<details>
<summary>Что такое idempotency и почему это важно для frontend forms?</summary><br>
<table><tr><td>

Idempotency означает, что повтор той же операции не меняет результат сверх первого успешного выполнения. Для форм это
критично при double click, retry после timeout, восстановлении сети и повторной отправке вкладкой.

UI помогает блокировкой submit, loading state и защитой от повторного клика, но настоящую гарантию должен давать backend
через idempotency key или уникальные constraints. Frontend не может надежно отличить "запрос не дошел" от "запрос дошел,
но ответ потерялся".

</td></tr></table>

</details>

<details>
<summary>Что такое CAP theorem на базовом уровне?</summary><br>
<table><tr><td>

CAP theorem говорит, что при network partition распределенная система выбирает компромисс между consistency и
availability. Это не значит, что всегда выбирают только две буквы из трех; важно понимать поведение системы во время
сбоев сети.

Frontend-разработчику это полезно для UX: данные могут быть временно stale, операция может быть принята асинхронно, а
разные пользователи могут некоторое время видеть разные состояния. UI должен явно показывать pending, conflict, refresh
и eventual update, а не притворяться, что распределенность не существует.

</td></tr></table>

</details>

<details>
<summary>Что такое sharding?</summary><br>
<table><tr><td>

Sharding делит данные на части по ключу, например по tenant, user id или региону. Это помогает масштабировать хранение и
нагрузку, но усложняет запросы, миграции, балансировку и операции между shard-ами.

Для frontend sharding обычно невидим, но его последствия проявляются в API constraints: нельзя быстро получить
глобальную сортировку по всем данным, некоторые отчеты становятся асинхронными, а cross-tenant операции требуют особой
архитектуры.

</td></tr></table>

</details>

<details>
<summary>Что такое eventual consistency?</summary><br>
<table><tr><td>

Eventual consistency означает, что система не обещает мгновенно одинаковое состояние во всех местах, но при отсутствии
новых изменений со временем сходится к согласованному результату.

Во frontend это влияет на optimistic updates, кеши, списки уведомлений, статусы заказов и read-after-write. Хороший UI
показывает "сохраняем", "обновляем", "данные появятся позже", умеет откатить optimistic update и не делает жестких
предположений о мгновенной синхронности.

</td></tr></table>

</details>

<details>
<summary>Почему <code>index.html</code> и hashed assets кешируют по-разному?</summary><br>
<table><tr><td>

Content-hashed assets не меняются под тем же URL, поэтому их безопасно кешировать долго:
`Cache-Control: public, max-age=31536000, immutable`. Новый release создает новые filenames, а старые assets можно
держать до окончания активных сессий.

`index.html` содержит ссылки на chunks текущего release и должен быстро переключаться на новую версию. Его обычно
кешируют с коротким TTL или revalidation (`no-cache`), иначе пользователь может получить старый HTML со ссылками на уже
удаленные assets.

</td></tr></table>

</details>

<details>
<summary>Что такое cache busting?</summary><br>
<table><tr><td>

Это изменение URL ресурса при изменении content, чтобы кеш не вернул старую версию. Наиболее надежный способ — content
hash в filename. Query string поддерживается не всеми cache policies одинаково.

</td></tr></table>

</details>

<details>
<summary>Как hash в имени файла помогает кешированию?</summary><br>
<table><tr><td>

Одинаковый content получает стабильный URL, измененный — новый URL. Старый и новый releases могут временно существовать
вместе. Это позволяет долго кешировать chunks без ручной invalidation.

</td></tr></table>

</details>

<details>
<summary>Как environment variables попадают во frontend?</summary><br>
<table><tr><td>

При build-time configuration bundler заменяет значения и они становятся частью публичного JavaScript. Static app не
читает environment server после загрузки. Секреты во frontend передавать нельзя.

</td></tr></table>

</details>

<details>
<summary>Почему runtime config иногда лучше build-time config?</summary><br>
<table><tr><td>

Один artifact можно продвигать между окружениями, меняя небольшой config JSON при старте или запросе. Это упрощает
rollback и снижает число сборок. Нужно обработать загрузку, schema validation и cache config.

</td></tr></table>

</details>

<details>
<summary>Как откатить frontend-релиз?</summary><br>
<table><tr><td>

Вернуть предыдущий immutable artifact или переключить pointer/route на него. Старые hashed assets сохраняют до истечения
активных сессий и cache TTL. Rollback проверяют как часть release process.

</td></tr></table>

</details>

<details>
<summary>Какие метрики важно смотреть после деплоя frontend?</summary><br>
<table><tr><td>

JavaScript errors, failed asset/API requests, Core Web Vitals, conversion и ключевые user flows. Метрики сравнивают по
release version и сегментам. Нужны alerts и быстрый способ отключить проблемную функцию.

</td></tr></table>

</details>

### Feature toggles

<details>
<summary>Что такое feature toggle?</summary><br>
<table><tr><td>

Feature toggle, или feature flag, — механизм включения и выключения функциональности без нового деплоя. Код уже может
находиться в production, но пользователи увидят фичу только после включения флага.

</td></tr></table>

</details>

<details>
<summary>Что такое kill switch?</summary><br>
<table><tr><td>

Kill switch — ops flag для быстрого отключения проблемной функциональности в production без нового деплоя. Например, им
можно вернуть старый checkout при росте ошибок оплаты. Переключение и fallback следует проверить заранее.

</td></tr></table>

</details>

<details>
<summary>Чем deploy отличается от release?</summary><br>
<table><tr><td>

Deploy — доставка кода в окружение, release — предоставление функциональности пользователям. Feature toggles разделяют
эти этапы: код можно задеплоить заранее, проверить и включить позднее.

</td></tr></table>

</details>

<details>
<summary>Зачем нужны feature toggles во frontend?</summary><br>
<table><tr><td>

Они позволяют постепенно выкатывать изменения, проводить A/B-тесты, давать доступ отдельным группам и быстро отключать
проблемный UI. Это уменьшает риск релиза, но требует контроля жизненного цикла флагов.

</td></tr></table>

</details>

<details>
<summary>Какие бывают типы feature toggles?</summary><br>
<table><tr><td>

- Release toggles временно скрывают незавершенную или постепенно выкатываемую фичу.
- Experiment toggles распределяют варианты A/B-теста.
- Ops toggles позволяют оперативно отключить функциональность.
- Permission toggles отражают доступ по роли, правам или тарифу.
- Environment toggles задают различия между dev, stage и production.

У типов разные владельцы и срок жизни: например, release flag обычно удаляют, а permission rule может быть постоянной.

</td></tr></table>

</details>

<details>
<summary>Чем feature toggle отличается от permission check?</summary><br>
<table><tr><td>

Feature toggle управляет выпуском или экспериментом, а permission check — правами конкретного пользователя. Условия
могут выглядеть похоже, но имеют разные причины изменения, владельцев и требования к безопасности.

</td></tr></table>

</details>

<details>
<summary>Чем feature toggle отличается от environment config?</summary><br>
<table><tr><td>

Environment config обычно фиксирован для dev, stage или production. Feature toggle может меняться во время работы и
зависеть от пользователя, роли, процента аудитории или варианта эксперимента.

</td></tr></table>

</details>

<details>
<summary>Что лучше: build-time flag или runtime flag?</summary><br>
<table><tr><td>

Build-time flag встраивается в bundle и требует новой сборки и деплоя для изменения. Runtime flag загружается при
запуске или обновляется во время работы. Для оперативного production rollout обычно нужен runtime flag, а build-time
подходит для постоянных различий сборок и dead-code elimination.

</td></tr></table>

</details>

<details>
<summary>Где хранить feature flags config?</summary><br>
<table><tr><td>

Флаги можно хранить в backend/config service, remote config, CMS, admin panel или feature-management service. Для
production предпочтителен централизованный источник с audit log, валидацией, контролем доступа и возможностью изменить
runtime-конфигурацию без нового frontend build.

</td></tr></table>

</details>

<details>
<summary>Какие риски есть у feature toggles?</summary><br>
<table><tr><td>

- Старые флаги забывают удалить.
- Условия усложняют код и увеличивают число сценариев.
- Разные пользователи видят разное поведение, что затрудняет диагностику.
- Сырую фичу можно включить ошибочно.
- Frontend flag ошибочно принимают за security boundary.

Нужны владелец, срок удаления, audit log, безопасное значение по умолчанию и наблюдаемость по варианту флага.

</td></tr></table>

</details>

<details>
<summary>Почему frontend feature toggle не заменяет backend authorization?</summary><br>
<table><tr><td>

Frontend-код и сетевые запросы можно изучить и изменить. Флаг может скрыть UI, но backend обязан независимо проверять
права на данные и операции. Иначе пользователь сможет обойти ограничение прямым API-запросом.

</td></tr></table>

</details>

<details>
<summary>Как тестировать feature toggles?</summary><br>
<table><tr><td>

Минимально тестируют включенный и выключенный флаг. Для критичной фичи также проверяют безопасный default, ошибку и
задержку загрузки config, права доступа, постепенный rollout и rollback. Тесты должны явно задавать набор флагов, чтобы
не зависеть от внешнего сервиса.

</td></tr></table>

</details>

<details>
<summary>Когда feature toggle нужно удалить?</summary><br>
<table><tr><td>

Release toggle удаляют после стабильного выката на всю аудиторию вместе с устаревшей веткой кода и тестами для нее.
Полезно заранее назначить владельца и дату удаления, иначе флаги превращаются в постоянный технический долг.

</td></tr></table>

</details>

<details>
<summary>Как feature toggles помогают с микрофронтендами?</summary><br>
<table><tr><td>

Host может скрыть вход в фичу, не загружать сломанный remote и показать fallback UI. Runtime flag позволяет сделать это
без срочного деплоя host-приложения, если решение о загрузке принимается до импорта remote.

</td></tr></table>

</details>

<details>
<summary>Что может пойти не так при загрузке feature flags?</summary><br>
<table><tr><td>

Config service может быть недоступен или ответить поздно; разные части приложения могут получить разные версии; UI может
сначала показать одну ветку, а затем другую. Нужны timeout, кеширование, согласованный snapshot конфигурации, schema
validation и явные fallback-значения.

</td></tr></table>

</details>

<details>
<summary>Что показывать, пока feature flags загружаются или если config недоступен?</summary><br>
<table><tr><td>

Выбор зависит от риска. Для некритичной UI-фичи подойдет безопасное default value. Для оплаты, прав доступа и других
критичных сценариев используют loading state или conservative fallback: новая функциональность остается выключенной,
пока конфигурация не подтверждена.

</td></tr></table>

</details>
