## Infrastructure

### Docker

#### Middle+ or Senior

<details>
<summary>Что такое Docker?</summary><br>
<table><tr><td>

Docker — инструменты и формат для сборки и запуска containers из reproducible images. Container упаковывает приложение,
runtime и filesystem dependencies. Это упрощает одинаковый запуск в CI, local и production.

</td></tr></table>

</details>

<details>
<summary>Чем container отличается от virtual machine?</summary><br>
<table><tr><td>

VM включает гостевую ОС и виртуализирует hardware, container разделяет kernel host OS и изолирует процессы. Containers
обычно запускаются быстрее и занимают меньше места. Изоляция отличается от полной VM и требует security hardening.

</td></tr></table>

</details>

<details>
<summary>Что такое Docker image?</summary><br>
<table><tr><td>

Image — immutable шаблон filesystem и metadata для запуска container. Он состоит из layers и обычно хранится в registry.
Один image можно запускать много раз с разной конфигурацией.

</td></tr></table>

</details>

<details>
<summary>Что такое Docker container?</summary><br>
<table><tr><td>

Container — запущенный instance image с writable layer, process и настройками сети. После удаления его локальные
изменения исчезают, если данные не вынесены в volume. Container должен быть заменяемым.

</td></tr></table>

</details>

<details>
<summary>Что такое Dockerfile?</summary><br>
<table><tr><td>

Это декларативная последовательность инструкций сборки image: base image, files, commands и startup metadata.
Multi-stage build отделяет тяжелую сборочную среду от компактного runtime image. Секреты нельзя записывать в layers.

```dockerfile
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
```

Путь `/app/dist` зависит от output path конкретного Angular-проекта и может содержать дополнительную browser directory.

</td></tr></table>

</details>

<details>
<summary>Что такое build context?</summary><br>
<table><tr><td>

Это directory и набор файлов, отправляемых Docker daemon/build engine для сборки. Инструкции `COPY` видят только
context. Слишком большой context замедляет build и может случайно включить секреты.

</td></tr></table>

</details>

<details>
<summary>Что такое layer в Docker image?</summary><br>
<table><tr><td>

Большинство Dockerfile instructions создают кешируемый immutable layer. Изменение раннего layer инвалидирует следующие.
Поэтому manifests копируют и устанавливают dependencies до копирования часто меняющегося source code.

</td></tr></table>

</details>

<details>
<summary>Что такое <code>.dockerignore</code>?</summary><br>
<table><tr><td>

Файл исключает пути из build context, например `node_modules`, `.git`, `dist` и local secrets. Это ускоряет передачу
context и уменьшает риск утечки. Он работает похоже на `.gitignore`, но правила относятся к Docker build.

</td></tr></table>

</details>

<details>
<summary>Что такое port mapping?</summary><br>
<table><tr><td>

Mapping публикует port container на host, например `-p 8080:80`. Приложение внутри должно слушать нужный interface и
container port. `EXPOSE` документирует port, но само mapping не создает.

</td></tr></table>

</details>

<details>
<summary>Что такое volume?</summary><br>
<table><tr><td>

Volume хранит данные вне writable layer container. Он переживает пересоздание container и может монтировать host
directory для разработки. Для static frontend production volume обычно не нужен, а backend/database используют его
часто.

</td></tr></table>

</details>

<details>
<summary>Что такое environment variables в Docker?</summary><br>
<table><tr><td>

Они передают runtime configuration процессу container через `-e`, Compose или platform settings. Значения не следует
встраивать в image как secrets. Browser frontend не может прочитать server environment после статической сборки без
runtime config механизма.

</td></tr></table>

</details>

<details>
<summary>Как собрать Docker image?</summary><br>
<table><tr><td>

Команда читает Dockerfile и build context, создавая image с заданным tag.

```bash
docker build -t frontend-app .
```

</td></tr></table>

</details>

<details>
<summary>Как запустить container?</summary><br>
<table><tr><td>

`--rm` удалит остановленный container, а `-p` опубликует port.

```bash
docker run --rm -p 8080:80 frontend-app
```

</td></tr></table>

</details>

<details>
<summary>Как посмотреть логи container?</summary><br>
<table><tr><td>

Сначала находят container, затем читают stdout/stderr. Приложение должно писать operational logs в стандартные streams.

```bash
docker ps
docker logs <container_id>
```

</td></tr></table>

</details>

<details>
<summary>Как остановить container?</summary><br>
<table><tr><td>

`docker stop` отправляет graceful signal и после timeout завершает process. Приложение должно корректно обрабатывать
shutdown.

```bash
docker stop <container_id>
```

</td></tr></table>

</details>

<details>
<summary>Как зайти внутрь container?</summary><br>
<table><tr><td>

`exec` запускает новый process в работающем container. Команда полезна для диагностики, но production fixes нужно
вносить в image, а не вручную.

```bash
docker exec -it <container_id> sh
```

</td></tr></table>

</details>

### Docker Compose

#### Middle+ or Senior

<details>
<summary>Что такое Docker Compose?</summary><br>
<table><tr><td>

Compose описывает несколько связанных containers, networks и volumes в YAML. Он удобен для локального окружения и
integration tests. Production orchestration может использовать другие платформы.

</td></tr></table>

</details>

<details>
<summary>Чем Docker Compose отличается от Docker?</summary><br>
<table><tr><td>

Docker CLI управляет отдельными images и containers, Compose — набором services как одним проектом. Compose вызывает тот
же container runtime. Он добавляет декларативную конфигурацию связей и lifecycle.

</td></tr></table>

</details>

<details>
<summary>Что такое service в docker-compose.yml?</summary><br>
<table><tr><td>

Service описывает image/build, command, ports, environment, volumes и dependencies одного типа container. Compose
создает container instances service. Имя service также работает как DNS hostname внутри default network.

</td></tr></table>

</details>

<details>
<summary>Что такое network в Docker Compose?</summary><br>
<table><tr><td>

Network соединяет services и изолирует их от других проектов. Containers обращаются друг к другу по service name и
внутреннему port. Host port mapping для межконтейнерной связи не нужен.

</td></tr></table>

</details>

<details>
<summary>Что такое volume в Docker Compose?</summary><br>
<table><tr><td>

Volume объявляет persistent или bind-mounted storage для services. Named volume управляется Docker, bind mount связывает
конкретный host path. Неправильный mount может скрыть файлы из image.

</td></tr></table>

</details>

<details>
<summary>Как запустить несколько сервисов одной командой?</summary><br>
<table><tr><td>

`up` создает network, builds нужные images и запускает services. `--build` принудительно учитывает изменения Dockerfile
и context.

```bash
docker compose up --build
```

</td></tr></table>

</details>

<details>
<summary>Как посмотреть логи через Docker Compose?</summary><br>
<table><tr><td>

Команда агрегирует logs всех services; можно указать имя одного service. `-f` продолжает следить за output.

```bash
docker compose logs -f
```

</td></tr></table>

</details>

<details>
<summary>Как остановить окружение?</summary><br>
<table><tr><td>

`down` останавливает и удаляет containers и project network. Named volumes сохраняются, если не добавить `--volumes`.

```bash
docker compose down
```

</td></tr></table>

</details>

<details>
<summary>Как Docker Compose помогает frontend-разработчику?</summary><br>
<table><tr><td>

Одной командой поднимает frontend, backend, database и mocks с согласованными адресами. Это уменьшает расхождения
локального окружения и onboarding. Health checks и seed data делают сценарий надежнее простого порядка запуска.

```yaml
services:
  frontend:
    build: .
    ports:
      - '4200:80'
    environment:
      API_URL: 'http://backend:3000'

  backend:
    image: node:22-alpine
    working_dir: /app
    command: npm start
    volumes:
      - ./backend:/app
    ports:
      - '3000:3000'
```

</td></tr></table>

</details>

### CI/CD для frontend delivery

#### Middle+ or Senior

<details>
<summary>Что проверяет frontend CI pipeline?</summary><br>
<table><tr><td>

Обычно pipeline устанавливает зависимости по lock-файлу, запускает type check, lint, unit/integration tests и production
build. Для критичных пользовательских flows добавляют E2E или component tests в браузере.

Важно сохранять artifacts диагностики: test reports, coverage, traces, screenshots и build logs. Процессное отличие CI и
CD см. в [Методологиях](../methodologies/README.md#чем-ci-отличается-от-cd).

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

#### Middle+ or Senior

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

<details>
<summary>Какие system design вопросы могут задать senior frontend или Angular-разработчику?</summary><br>
<table><tr><td>

Чаще спрашивают не backend-детали, а границы frontend-архитектуры:

- как загрузить и показать таблицу на миллионы строк;
- где делать фильтрацию, сортировку и агрегацию;
- как кешировать API responses и инвалидировать stale data;
- как пережить частичную недоступность API;
- как проектировать retry, timeout, optimistic update и rollback;
- как разложить фичу между Angular app, CDN, BFF/API и backend jobs;
- как наблюдать ошибки, latency и деградацию UX после release.

Хороший ответ явно разделяет client, network, CDN, API и storage, называет trade-offs и предлагает graceful degradation.

</td></tr></table>

</details>

### Feature toggles

#### Junior

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

#### Middle

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
<summary>Как использовать feature toggle в Angular?</summary><br>
<table><tr><td>

Сервис может хранить загруженные флаги в signal и предоставлять узкий API проверки:

```ts
import {Injectable, signal} from '@angular/core';

type FeatureFlag = 'newCheckout';

@Injectable({providedIn: 'root'})
export class FeatureFlagsService {
  private readonly flags = signal<Readonly<Record<FeatureFlag, boolean>>>({
    newCheckout: false,
  });

  public isEnabled(flag: FeatureFlag): boolean {
    return this.flags()[flag];
  }

  public setFlags(flags: Readonly<Record<FeatureFlag, boolean>>): void {
    this.flags.set(flags);
  }
}
```

Для большого набора флагов полезны typed keys, schema validation и явные безопасные defaults.

</td></tr></table>

</details>

<details>
<summary>Как защитить route через feature toggle?</summary><br>
<table><tr><td>

Функциональный `CanMatchFn` не даст Router выбрать route с выключенной фичей:

```ts
import {inject} from '@angular/core';
import {CanMatchFn} from '@angular/router';

export const newCheckoutGuard: CanMatchFn = () => inject(FeatureFlagsService).isEnabled('newCheckout');
```

Flags config должен быть загружен до первой навигации или guard должен дождаться его асинхронно. Этот guard управляет
навигацией, но не заменяет backend authorization.

</td></tr></table>

</details>

<details>
<summary>Как использовать feature toggle в Angular-шаблоне?</summary><br>
<table><tr><td>

Компонент может предоставить вычисляемое состояние:

```ts
import {computed, inject} from '@angular/core';

export class CheckoutComponent {
  private readonly featureFlags = inject(FeatureFlagsService);

  protected readonly isNewCheckoutEnabled = computed(() => this.featureFlags.isEnabled('newCheckout'));
}
```

Шаблон отображает новую реализацию или fallback:

```html
@if (isNewCheckoutEnabled()) {
<app-new-checkout />
} @else {
<app-checkout />
}
```

Для повторяющегося UI-условия можно создать directive, но единичную проверку проще оставить явной.

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

### Frontend system design

#### Middle+ or Senior

<details>
<summary>Как спроектировать modal/dialog на уровне системы?</summary><br>
<table><tr><td>

Dialog - не только overlay. Нужны focus trap, restore focus, Escape, click outside policy, scroll lock, aria attributes,
stacking, portal/root strategy, animation with reduced motion и cleanup. Для design system важно определить API:
controlled/uncontrolled open state, sizes, destructive actions, async submit, nested dialogs policy.

В Angular это часто решают CDK Overlay/Dialog или UI-kit. Самописный dialog оправдан только если команда готова
поддерживать accessibility contract и edge cases.

```html
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
>
  <h2 id="dialog-title">Удалить проект?</h2>
  <button type="button">Отмена</button>
  <button type="button">Удалить</button>
</div>
```

</td></tr></table>

</details>

<details>
<summary>Как спроектировать infinite scroll?</summary><br>
<table><tr><td>

Нужно описать API pagination contract, loading states, error retry, deduplication, scroll position, accessibility и
observability. На клиенте часто используют `IntersectionObserver` для sentinel-элемента, но API должен поддерживать
cursor pagination, иначе при изменении данных возможны пропуски и дубли.

```ts
const observer = new IntersectionObserver(([entry]) => {
  if (entry?.isIntersecting) {
    loadNextPage();
  }
});

observer.observe(sentinelElement);
```

Важные trade-offs:

- infinite scroll удобен для ленты, но хуже для поиска конкретной позиции;
- нужна возможность восстановить позицию при возврате назад;
- для больших списков может понадобиться virtualization;
- keyboard и screen reader users должны иметь понятную навигацию;
- analytics должны различать load more, error и abandon.

</td></tr></table>

</details>

<details>
<summary>Как выбрать CSR, SSR, SSG или ISR для frontend-продукта?</summary><br>
<table><tr><td>

CSR проще для authenticated dashboards и internal tools, где SEO почти не важен. SSR помогает first paint, SEO и preview
metadata, но добавляет server runtime, cache invalidation и hydration complexity. SSG хорош для стабильного content,
ISR - для контента, который должен обновляться без полного rebuild.

Решение принимают по типу страниц, freshness данных, SEO, personalization, hosting model, Core Web Vitals, стоимости
операций и ownership команды. На интервью важно не продавать один rendering mode как универсальный.

```ts
export const renderingByPageType = {
  dashboard: 'CSR',
  article: 'SSG',
  productPage: 'SSR',
  catalog: 'ISR',
} as const;
```

</td></tr></table>

</details>
