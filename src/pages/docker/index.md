---
layout: ../../layouts/Layout.astro
title: Docker
description: Docker, containers, images, Dockerfile и Docker Compose для frontend-разработчика
category: DevOps
kind: questions
order: 76
---

## Docker

### Docker для frontend-разработчика

#### Middle+ or Senior

<details>
<summary>Что нужно знать frontend-разработчику о Docker?</summary><br>
<table><tr><td>

На уровне рабочего окружения достаточно понимать, что Docker фиксирует одинаковую среду для локального запуска, CI или
integration tests. Глубокие вопросы про image, container, Dockerfile, Compose и frontend multi-stage build раскрыты в
этом разделе.

</td></tr></table>

</details>

### Docker basics

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
