## Infrastructure

### Docker

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

### Frontend deployment

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
<summary>Почему assets часто кешируют долго?</summary><br>
<table><tr><td>

Content-hashed file не меняется под тем же URL, поэтому безопасен `Cache-Control: immutable` с большим TTL. Новый
release создает новое имя. Это повышает cache hit rate и ускоряет повторные visits.

</td></tr></table>

</details>

<details>
<summary>Почему <code>index.html</code> обычно кешируют осторожнее?</summary><br>
<table><tr><td>

Он содержит ссылки на chunks текущего release и должен быстро переключаться на новую версию. Устаревший HTML может
ссылаться на удаленные assets. Обычно применяют короткий TTL или revalidation.

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
<summary>Что такое kill switch?</summary><br>
<table><tr><td>

Kill switch — ops flag для быстрого отключения проблемной функциональности в production без нового деплоя. Например, им
можно вернуть старый checkout при росте ошибок оплаты. Переключение и fallback следует проверить заранее.

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
