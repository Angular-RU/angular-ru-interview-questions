## Node.js

### Node.js basics

#### Junior

<details>
<summary>Что такое Node.js?</summary><br>
<table><tr><td>

Node.js — JavaScript runtime вне браузера, построенный вокруг V8 и системных API. Он используется для servers, CLI,
build tools и automation. Node предоставляет filesystem, processes и network APIs, которых нет в browser sandbox.

</td></tr></table>

</details>

<details>
<summary>Что такое ES Modules в Node.js?</summary><br>
<table><tr><td>

Это стандартная система `import`/`export`, включаемая расширением `.mjs` или `"type": "module"`. Она поддерживает static
analysis, top-level await и browser-compatible syntax. Resolution и interop с CommonJS имеют отдельные правила.

</td></tr></table>

</details>

<details>
<summary>Что такое <code>process.env</code>?</summary><br>
<table><tr><td>

Это объект environment variables текущего процесса. Значения являются строками или `undefined`, поэтому их нужно
валидировать и преобразовывать. Секреты server process нельзя автоматически встраивать во frontend bundle.

</td></tr></table>

</details>

<details>
<summary>Что такое child process?</summary><br>
<table><tr><td>

Это отдельный процесс операционной системы, запущенный из Node через `spawn`, `exec` или `fork`. Он имеет отдельную
память и может выполнять внешнюю команду. Нужно обрабатывать exit code, stderr, signals и размер output.

</td></tr></table>

</details>

#### Middle

<details>
<summary>Чем Node.js отличается от браузера?</summary><br>
<table><tr><td>

В Node нет DOM, `window` и browser security model, но доступны `process`, filesystem и server sockets. Browser имеет UI,
Web APIs и origin restrictions. Общий JavaScript syntax не гарантирует совместимость окружений.

</td></tr></table>

</details>

<details>
<summary>Почему Node.js называют event-driven runtime?</summary><br>
<table><tr><td>

Программа регистрирует handlers, а runtime вызывает их при событиях I/O, timers или завершении задач. Это позволяет
обслуживать много соединений без отдельного JavaScript thread на каждое. CPU-bound handler все равно блокирует event
loop.

</td></tr></table>

</details>

<details>
<summary>Чем <code>require</code> отличается от <code>import</code>?</summary><br>
<table><tr><td>

`require()` — CommonJS function с синхронной загрузкой и runtime-вызовом. Static `import` анализируется до выполнения и
работает в ESM. Dynamic `import()` асинхронен и доступен в обоих современных контекстах.

</td></tr></table>

</details>

#### Middle+ or Senior

<details>
<summary>Что такое V8?</summary><br>
<table><tr><td>

V8 — JavaScript engine от Chromium, который парсит, интерпретирует и JIT-компилирует код. Node использует V8 для
выполнения ECMAScript. Browser APIs и Node APIs находятся вокруг engine, а не внутри языка.

</td></tr></table>

</details>

<details>
<summary>Что такое libuv?</summary><br>
<table><tr><td>

libuv — библиотека Node для event loop, async I/O, timers, filesystem и thread pool. Она скрывает различия операционных
систем. Не все операции выполняются на главном JavaScript thread.

</td></tr></table>

</details>

<details>
<summary>Что такое event loop в Node.js?</summary><br>
<table><tr><td>

Event loop проходит фазы timers, pending callbacks, poll, check и close callbacks, обрабатывая готовые задачи.
Microtasks выполняются между соответствующими этапами. Детали важны при диагностике starvation и порядка callbacks.

</td></tr></table>

</details>

<details>
<summary>Чем event loop в Node.js отличается от browser event loop?</summary><br>
<table><tr><td>

Оба координируют tasks и microtasks, но источники событий и фазы различаются. Browser привязан к rendering frames и Web
APIs, Node — к libuv phases и server I/O. Нельзя механически переносить весь порядок callbacks между окружениями.

</td></tr></table>

</details>

<details>
<summary>Что такое CommonJS?</summary><br>
<table><tr><td>

CommonJS — историческая module system Node с `require()` и `module.exports`. Модули загружаются синхронно и имеют
собственный wrapper scope. Экосистема постепенно переходит на стандартные ES Modules.

</td></tr></table>

</details>

<details>
<summary>Что такое <code>__dirname</code> и почему его нет в ESM?</summary><br>
<table><tr><td>

В CommonJS это directory текущего module file. ESM использует стандартный `import.meta.url`, из которого путь получают
через `fileURLToPath`. Отсутствие `__dirname` связано с другой module model, а не с невозможностью работать с путями.

</td></tr></table>

</details>

<details>
<summary>Что такое stream?</summary><br>
<table><tr><td>

Stream обрабатывает данные частями вместо загрузки всего объема в память. Бывают readable, writable, duplex и transform
streams. Backpressure предотвращает переполнение медленного consumer.

</td></tr></table>

</details>

<details>
<summary>Что такое Buffer?</summary><br>
<table><tr><td>

`Buffer` представляет последовательность bytes в Node и используется для файлов, sockets и binary protocols. Encoding
нужно задавать явно при преобразовании в строку. В browser близкие primitives — `ArrayBuffer` и typed arrays.

</td></tr></table>

</details>

<details>
<summary>Что такое worker_threads?</summary><br>
<table><tr><td>

Worker threads выполняют JavaScript параллельно внутри одного Node process с отдельными isolates. Они подходят для
CPU-bound вычислений, а не обычного async I/O. Обмен сообщениями и shared memory добавляют overhead.

</td></tr></table>

</details>

### npm и package scripts

#### Junior

<details>
<summary>Что такое npm package?</summary><br>
<table><tr><td>

Это directory или опубликованный artifact с `package.json` и кодом. Package может быть библиотекой, CLI или приложением.
Имя и version определяют его identity в registry.

</td></tr></table>

</details>

<details>
<summary>Что такое <code>package.json</code>?</summary><br>
<table><tr><td>

Manifest проекта описывает metadata, scripts, dependencies, package exports и настройки tools. Он не фиксирует точное
дерево transitive dependencies. Для этого нужен lock-файл.

</td></tr></table>

</details>

<details>
<summary>Что такое peerDependencies?</summary><br>
<table><tr><td>

Они объявляют, что package ожидает совместимую dependency от host-проекта. Это важно для frameworks и plugins, которым
нужен общий runtime instance. Например, Angular library обычно указывает Angular как peer dependency.

</td></tr></table>

</details>

<details>
<summary>Что такое npm scripts?</summary><br>
<table><tr><td>

Это именованные shell-команды в поле `scripts`, запускаемые через `npm run`. npm добавляет локальные binaries из
`node_modules/.bin` в `PATH`. Lifecycle scripts могут запускаться автоматически, поэтому dependencies должны быть
доверенными.

</td></tr></table>

</details>

<details>
<summary>Что такое semantic versioning?</summary><br>
<table><tr><td>

SemVer использует `major.minor.patch`: major для breaking changes, minor для совместимой функциональности, patch для
совместимых fixes. До `1.0.0` гарантии часто трактуются осторожнее. Versioning полезно только при честном публичном
контракте.

</td></tr></table>

</details>

<details>
<summary>Что значит <code>^</code>, <code>~</code> и exact version в package.json?</summary><br>
<table><tr><td>

Exact устанавливает только указанную version. `~1.2.3` допускает patch updates, `^1.2.3` — compatible minor и patch до
следующего major. Фактическую установленную версию фиксирует lock-файл.

</td></tr></table>

</details>

#### Middle

<details>
<summary>Чем dependencies отличаются от devDependencies?</summary><br>
<table><tr><td>

`dependencies` нужны package во время runtime потребителя, `devDependencies` — для разработки, тестов и сборки. Для
frontend application обе группы обычно устанавливаются перед build. Для library правильная классификация влияет на
потребителя.

</td></tr></table>

</details>

<details>
<summary>Что такое package-lock.json?</summary><br>
<table><tr><td>

Lock-файл фиксирует точные версии и integrity всего установленного dependency tree. Он делает installs воспроизводимыми.
Ручное редактирование обычно не требуется.

</td></tr></table>

</details>

<details>
<summary>Почему lock-файл важно коммитить?</summary><br>
<table><tr><td>

CI и разработчики получают одно и то же разрешенное дерево, а изменения dependencies видны в review. Без lock-файла
compatible ranges могут установить разные transitive versions. Это усложняет debugging и supply-chain audit.

</td></tr></table>

</details>

<details>
<summary>Что делает <code>npm install</code>?</summary><br>
<table><tr><td>

Разрешает dependencies, устанавливает их в `node_modules` и обновляет lock-файл при необходимости. Он подходит для
локальной разработки и добавления packages. Результат может изменить lock при рассинхронизации manifest.

</td></tr></table>

</details>

<details>
<summary>Что делает <code>npm ci</code>?</summary><br>
<table><tr><td>

Удаляет существующий `node_modules` и устанавливает точно по lock-файлу. Команда завершится ошибкой, если `package.json`
и lock не согласованы. Она не переписывает dependency tree.

</td></tr></table>

</details>

<details>
<summary>Чем <code>npm ci</code> лучше для CI?</summary><br>
<table><tr><td>

Дает чистую, воспроизводимую установку и быстро обнаруживает незакоммиченный lock update. Поведение меньше зависит от
предыдущего workspace state. Кеш npm downloads можно использовать отдельно от `node_modules`.

</td></tr></table>

</details>

<details>
<summary>Как npm scripts используются во frontend-проектах?</summary><br>
<table><tr><td>

Для `start`, `build`, `test`, `lint`, `format`, code generation и deployment wrappers. Они дают команде единый interface
поверх Angular CLI, Vite и других tools. Scripts должны оставаться понятными и composable.

</td></tr></table>

</details>

<details>
<summary>Чем task runner отличается от package scripts?</summary><br>
<table><tr><td>

Task runner вроде Gulp или Grunt описывает pipeline через отдельный инструмент и плагины. Package scripts запускают
команды напрямую через npm, pnpm, Yarn или Bun. В современных frontend-проектах многие задачи закрываются framework CLI,
bundler и package scripts, но legacy-проекты могут все еще использовать task runners для сборки assets или интеграции.

</td></tr></table>

</details>

### Node.js для frontend tooling

#### Junior

<details>
<summary>Что такое dev server?</summary><br>
<table><tr><td>

Локальный HTTP server для разработки с module transforms, source maps, watch и hot reload. Он оптимизирован для
feedback, а не безопасности, кеширования и production traffic. Его нельзя использовать как production hosting.

</td></tr></table>

</details>

#### Middle

<details>
<summary>Почему frontend-проекту нужен Node.js?</summary><br>
<table><tr><td>

Node запускает package manager, compiler, linter, tests, dev server и production build. Результат затем выполняется в
browser и может не зависеть от Node. SSR-приложение дополнительно использует Node во время runtime.

</td></tr></table>

</details>

<details>
<summary>Как Node.js используется в Angular CLI?</summary><br>
<table><tr><td>

CLI запускается как Node program, читает workspace config и вызывает builders. TypeScript/Angular compiler, dev server и
test runner также работают в Node. Поддерживаемая Node version зависит от Angular version.

</td></tr></table>

</details>

<details>
<summary>Как Node.js используется в Vite/Webpack/esbuild?</summary><br>
<table><tr><td>

Он запускает bundler process, читает файлы, разрешает modules и обслуживает plugins. Vite предоставляет dev server,
Webpack строит module graph, esbuild выполняет быстрые transforms/bundling. Production output предназначен для browser
или server target.

</td></tr></table>

</details>

<details>
<summary>Чем dev server отличается от production build?</summary><br>
<table><tr><td>

Dev server часто преобразует modules по запросу и хранит часть данных в памяти. Production build минифицирует, хеширует,
оптимизирует и записывает deployable artifacts. Поведение окружения нужно проверять production build.

</td></tr></table>

</details>

<details>
<summary>Почему код, который работает в Node.js, может не работать в браузере?</summary><br>
<table><tr><td>

Browser не предоставляет `fs`, `process`, CommonJS resolution и unrestricted sockets. Также действуют CORS, CSP и
sandbox. Bundler polyfills не следует считать автоматическими или бесплатными.

</td></tr></table>

</details>

<details>
<summary>Почему код, который работает в браузере, может не работать в Node.js?</summary><br>
<table><tr><td>

В Node обычно нет `window`, `document`, DOM, layout и browser storage. SSR-код должен изолировать browser-only API.
Некоторые Web APIs появляются в новых Node versions, но их поддержку нужно проверять.

</td></tr></table>

</details>

#### Middle+ or Senior

<details>
<summary>Когда scaffolding tools полезны, а когда вредят?</summary><br>
<table><tr><td>

Scaffolding tools полезны, когда создают повторяемую структуру components, features, libraries или tests по текущим
командным conventions. Они вредят, если генерируют много непонятного boilerplate или закрепляют устаревшую архитектуру.
Генератор должен отражать живую codebase, а не исторические привычки.

</td></tr></table>

</details>

### Node.js observability и RPS monitoring

#### Middle+ or Senior

<details>
<summary>Что такое RPS?</summary><br>
<table><tr><td>

RPS, или Requests Per Second, — количество запросов, которое сервер обрабатывает за секунду. Например, `120 RPS`
означает, что сервер в среднем обрабатывает 120 HTTP-запросов в секунду.

</td></tr></table>

</details>

<details>
<summary>Что такое RPS monitor?</summary><br>
<table><tr><td>

RPS monitor измеряет количество запросов за единицу времени. Он помогает увидеть текущую нагрузку, всплески трафика и
связать их с деградацией производительности или доступности.

</td></tr></table>

</details>

<details>
<summary>Зачем frontend-разработчику понимать RPS?</summary><br>
<table><tr><td>

Frontend-разработчик может работать с SSR, BFF, dev server, Node.js tooling и API-интеграциями. RPS помогает оценивать
нагрузку на SSR, rate limits, кеширование, retry-логику и влияние frontend-кода на backend.

</td></tr></table>

</details>

<details>
<summary>Как может выглядеть простой RPS monitor в Node.js?</summary><br>
<table><tr><td>

Этот учебный HTTP-сервер считает запросы за последнюю секунду и выводит результат в консоль:

```js
import http from 'node:http';

let requests = 0;

setInterval(() => {
  console.log(`RPS: ${requests}`);
  requests = 0;
}, 1000);

const server = http.createServer((request, response) => {
  requests += 1;

  response.writeHead(200, {'Content-Type': 'application/json'});
  response.end(JSON.stringify({ok: true}));
});

server.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
```

</td></tr></table>

</details>

<details>
<summary>Как проверить RPS monitor через curl?</summary><br>
<table><tr><td>

После запуска сервера можно отправить несколько запросов вручную:

```bash
curl http://localhost:3000
curl http://localhost:3000
curl http://localhost:3000
```

В следующем секундном интервале сервер выведет количество полученных запросов.

</td></tr></table>

</details>

<details>
<summary>Почему такой RPS monitor не production-ready?</summary><br>
<table><tr><td>

Он хранит счетчик только в памяти одного процесса и теряет данные при перезапуске. Несколько процессов или containers
будут считать RPS независимо. В production метрики агрегируют через Prometheus, OpenTelemetry, APM или другую систему
observability и визуализируют, например, в Grafana.

</td></tr></table>

</details>

<details>
<summary>Какие метрики кроме RPS важны для Node.js сервера?</summary><br>
<table><tr><td>

- Latency и p95/p99 response time.
- Error rate и количество ответов 4xx/5xx.
- CPU и memory usage.
- Event loop delay.
- Active connections.
- Throughput.

Метрики полезно связывать между собой: один RPS не объясняет состояние системы.

</td></tr></table>

</details>

<details>
<summary>Чем RPS отличается от latency?</summary><br>
<table><tr><td>

RPS показывает количество обработанных запросов в секунду, а latency — время обработки отдельного запроса. Высокий RPS
сам по себе не является проблемой, но рост latency и error rate вместе с ним может указывать на перегрузку.

</td></tr></table>

</details>

<details>
<summary>Что такое p95 и p99 latency?</summary><br>
<table><tr><td>

`p95` — значение, быстрее которого завершились 95% запросов; `p99` аналогично описывает 99% запросов. Перцентили лучше
среднего показывают медленный хвост распределения, хотя для полной картины также нужны размер выборки и временное окно.

</td></tr></table>

</details>

<details>
<summary>Как event loop delay связан с производительностью Node.js?</summary><br>
<table><tr><td>

JavaScript выполняется в основном потоке Node.js. CPU-bound работа и долгие синхронные операции блокируют event loop,
из-за чего callbacks и обработчики запросов запускаются позже. Event loop delay измеряет эту задержку и помогает найти
такие блокировки.

</td></tr></table>

</details>

<details>
<summary>Что может увеличить RPS capacity Node.js приложения?</summary><br>
<table><tr><td>

- Кеширование и использование reverse proxy или CDN.
- Уменьшение CPU-bound работы в request handler.
- Горизонтальное масштабирование и несколько процессов.
- Оптимизация запросов к базе и connection pooling.
- Уменьшение лишнего logging на горячем пути.

Изменения нужно подтверждать нагрузочными тестами: увеличение RPS не должно ухудшать latency и error rate сверх SLO.

</td></tr></table>

</details>

### Frontend tooling

#### Middle

<details>
<summary>Чем Babel, SWC, esbuild и TypeScript compiler отличаются в frontend toolchain?</summary><br>
<table><tr><td>

TypeScript compiler умеет type checking и emit, но в современных frontend-сборках часто разделяют type checking и
transpile. Babel трансформирует syntax через plugins, SWC и esbuild делают быстрые transforms на native-реализациях.

Важно различать:

- transpilation - преобразование syntax;
- type checking - проверка типов;
- bundling - построение graph и output chunks;
- minification - уменьшение output.

Angular CLI скрывает большую часть деталей, но разработчик должен понимать, где искать проблему: в `tsconfig`, bundler,
polyfills, browserslist или plugin pipeline.

```json
{
  "scripts": {
    "typecheck": "tsc --noEmit",
    "build": "vite build"
  }
}
```

</td></tr></table>

</details>

<details>
<summary>Как объяснить Vite, Webpack и Rollup на интервью?</summary><br>
<table><tr><td>

Webpack - универсальный bundler с большим plugin ecosystem и исторически богатой настройкой. Rollup силен для libraries
и tree shaking ES modules. Vite использует быстрый dev server на native ESM и собирает production через Rollup-пайплайн
или framework-specific integration.

Хороший ответ не сводится к "Vite быстрее". Нужно объяснить dev server, HMR, module graph, code splitting, CSS/assets
pipeline, source maps и то, как framework CLI ограничивает или расширяет доступ к настройкам.

```ts
export default {
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
};
```

</td></tr></table>

</details>
