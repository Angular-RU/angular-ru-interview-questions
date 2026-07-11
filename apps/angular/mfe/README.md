# Micro Frontends demo

Это учебный пример микрофронтендов на Angular и Native Federation, а не готовая production-архитектура. Он показывает
разделение на host и remote-приложения, загрузку виджетов во время выполнения, коммуникацию через Angular API, обработку
ошибок и SSR-safe монтирование на клиенте.

## Applications

| Application           | Role          | URL                     |
| --------------------- | ------------- | ----------------------- |
| `movie-ticket`        | host/shell    | `http://localhost:4200` |
| `movies`              | remote widget | `http://localhost:4201` |
| `ticket-availability` | remote widget | `http://localhost:4202` |

## What this demo shows

- Native Federation;
- host/remote architecture;
- federation manifest;
- `remoteEntry.json`;
- runtime loading;
- динамическое создание Angular-компонентов;
- `ComponentRef.setInput()`;
- Angular `output()`;
- host orchestration;
- loading/error states и fallback UI;
- SSR-safe browser-only mounting через `afterNextRender()`.

## Project structure

```text
examples/angular/mfe/
  movie-ticket/         # host/shell
  movies/               # remote со списком фильмов
  ticket-availability/  # remote с доступностью билетов
```

## How to run

Установите зависимости из корня репозитория. Корневой `package.json` подключает приложения как npm workspaces:

```bash
npm install
```

Запустите приложения в трех отдельных терминалах.

Remote со списком фильмов:

```bash
npm start -w movies
```

Remote с доступностью билетов:

```bash
npm start -w ticket-availability
```

Host:

```bash
npm start -w movie-ticket
```

Откройте host:

```text
http://localhost:4200
```

Проверьте remote entries:

```text
http://localhost:4201/remoteEntry.json
http://localhost:4202/remoteEntry.json
```

Проверьте manifest host-приложения:

```text
http://localhost:4200/federation.manifest.json
```

## Remote assets

Локальное демо разрешает относительные URL изображений через `import.meta.url`, поэтому assets загружаются с origin
remote, а не host. В production assets должны отдаваться с того же remote origin/CDN или через явно настроенный asset
base URL. Host не должен содержать hardcoded локальные URL assets remote-приложения.

## Communication flow

```text
movies remote
  emits movieSelected output

movie-ticket host
  subscribes to movieSelected
  passes selected movie to ticket-availability via ComponentRef.setInput()

ticket-availability remote
  receives movie input
  calculates available tickets
  emits bookingContinued output

movie-ticket host
  owns next booking step
```

Host управляет связью между виджетами: `movies` не зависит напрямую от `ticket-availability`, а оба remote сохраняют
явные input/output-контракты.

## SSR notes

В этом демо remote-виджеты монтируются только в браузере. Shell может быть отрендерен на сервере, но remote-компоненты
создаются после первого browser render через `afterNextRender()`.

Это предотвращает типичные SSR-ошибки:

- `window is not defined`;
- `document is not defined`.

Browser-only интеграции не следует запускать напрямую в `ngOnInit`. При необходимости используйте `afterNextRender()`
или проверку платформы на границе интеграции.

## Failure scenarios

Остановите один remote и перезагрузите host.

Ожидаемое поведение:

- host продолжает открываться;
- slot недоступного виджета показывает fallback error state;
- остальные виджеты могут работать, если не зависят от недоступного remote.

## Deployment notes

Host и remotes можно деплоить независимо. Каждый remote публикует свой `remoteEntry.json` и связанные JS chunks, а host
получает URL remote-приложений из manifest. Для dev, stage и prod обычно используют разные manifest-файлы.

Пример production manifest:

```json
{
  "movies": "https://cdn.example.com/movies/remoteEntry.json",
  "ticket-availability": "https://cdn.example.com/ticket-availability/remoteEntry.json"
}
```

`remoteEntry.json` и manifest нужно кешировать осторожно, чтобы host не получил устаревшую карту chunks или
несовместимый remote. Production-система также требует fallback UI, совместимых контрактов, мониторинга, rollback и
contract tests.

## Interview questions

Вопросы по этому демо находятся в основном README:

- [Angular / Micro Frontends](../../../src/pages/angular/index.md#micro-frontends)
