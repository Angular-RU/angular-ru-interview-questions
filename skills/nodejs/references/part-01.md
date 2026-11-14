# Node.js — вопросы и ответы, часть 1

> Автоматически сгенерировано из src/pages/nodejs/index.md. Не редактируйте вручную.

## Node.js

### Node.js basics



#### Вопрос: Что такое Node.js?

**Короткий ответ**

Node.js — JavaScript runtime вне браузера, построенный вокруг V8 и системных API. Он используется для servers, CLI,
build tools и automation. Node предоставляет filesystem, processes и network APIs, которых нет в browser sandbox.

**Полный ответ**

Node.js — JavaScript runtime вне браузера, построенный вокруг V8 и системных API. Он используется для servers, CLI,
build tools и automation. Node предоставляет filesystem, processes и network APIs, которых нет в browser sandbox.





#### Вопрос: Что такое ES Modules в Node.js?

**Короткий ответ**

Это стандартная система import/export, включаемая расширением .mjs или "type": "module". Она поддерживает static
analysis, top-level await и browser-compatible syntax. Resolution и interop с CommonJS имеют отдельные правила.

**Полный ответ**

Это стандартная система `import`/`export`, включаемая расширением `.mjs` или `"type": "module"`. Она поддерживает static
analysis, top-level await и browser-compatible syntax. Resolution и interop с CommonJS имеют отдельные правила.





#### Вопрос: Что такое process.env?

**Короткий ответ**

Это объект environment variables текущего процесса. Значения являются строками или undefined, поэтому их нужно
валидировать и преобразовывать. Секреты server process нельзя автоматически встраивать во frontend bundle.

**Полный ответ**

Это объект environment variables текущего процесса. Значения являются строками или `undefined`, поэтому их нужно
валидировать и преобразовывать. Секреты server process нельзя автоматически встраивать во frontend bundle.





#### Вопрос: Что такое child process?

**Короткий ответ**

Это отдельный процесс операционной системы, запущенный из Node через spawn, exec или fork. Он имеет отдельную память и
может выполнять внешнюю команду. Нужно обрабатывать exit code, stderr, signals и размер output.

**Полный ответ**

Это отдельный процесс операционной системы, запущенный из Node через `spawn`, `exec` или `fork`. Он имеет отдельную
память и может выполнять внешнюю команду. Нужно обрабатывать exit code, stderr, signals и размер output.





#### Вопрос: Чем Node.js отличается от браузера?

**Короткий ответ**

В Node нет DOM, window и browser security model, но доступны process, filesystem и server sockets. Browser имеет UI, Web
APIs и origin restrictions. Общий JavaScript syntax не гарантирует совместимость окружений.

**Полный ответ**

В Node нет DOM, `window` и browser security model, но доступны `process`, filesystem и server sockets. Browser имеет UI,
Web APIs и origin restrictions. Общий JavaScript syntax не гарантирует совместимость окружений.





#### Вопрос: Почему Node.js называют event-driven runtime?

**Короткий ответ**

Программа регистрирует handlers, а runtime вызывает их при событиях I/O, timers или завершении задач. Это позволяет
обслуживать много соединений без отдельного JavaScript thread на каждое. CPU-bound handler все равно блокирует event
loop.

**Полный ответ**

Программа регистрирует handlers, а runtime вызывает их при событиях I/O, timers или завершении задач. Это позволяет
обслуживать много соединений без отдельного JavaScript thread на каждое. CPU-bound handler все равно блокирует event
loop.





#### Вопрос: Чем require отличается от import?

**Короткий ответ**

require() — CommonJS function с синхронной загрузкой и runtime-вызовом. Static import анализируется до выполнения и
работает в ESM. Dynamic import() асинхронен и доступен в обоих современных контекстах.

**Полный ответ**

`require()` — CommonJS function с синхронной загрузкой и runtime-вызовом. Static `import` анализируется до выполнения и
работает в ESM. Dynamic `import()` асинхронен и доступен в обоих современных контекстах.





#### Вопрос: Что такое V8?

**Короткий ответ**

V8 — JavaScript engine от Chromium, который парсит, интерпретирует и JIT-компилирует код. Node использует V8 для
выполнения ECMAScript. Browser APIs и Node APIs находятся вокруг engine, а не внутри языка.

**Полный ответ**

V8 — JavaScript engine от Chromium, который парсит, интерпретирует и JIT-компилирует код. Node использует V8 для
выполнения ECMAScript. Browser APIs и Node APIs находятся вокруг engine, а не внутри языка.





#### Вопрос: Что такое libuv?

**Короткий ответ**

libuv — библиотека Node для event loop, async I/O, timers, filesystem и thread pool. Она скрывает различия операционных
систем. Не все операции выполняются на главном JavaScript thread.

**Полный ответ**

libuv — библиотека Node для event loop, async I/O, timers, filesystem и thread pool. Она скрывает различия операционных
систем. Не все операции выполняются на главном JavaScript thread.





#### Вопрос: Что такое event loop в Node.js?

**Короткий ответ**

Event loop проходит фазы timers, pending callbacks, poll, check и close callbacks, обрабатывая готовые задачи.
Microtasks выполняются между соответствующими этапами. Детали важны при диагностике starvation и порядка callbacks.

**Полный ответ**

Event loop проходит фазы timers, pending callbacks, poll, check и close callbacks, обрабатывая готовые задачи.
Microtasks выполняются между соответствующими этапами. Детали важны при диагностике starvation и порядка callbacks.





#### Вопрос: Чем event loop в Node.js отличается от browser event loop?

**Короткий ответ**

Оба координируют tasks и microtasks, но источники событий и фазы различаются. Browser привязан к rendering frames и Web
APIs, Node — к libuv phases и server I/O. Нельзя механически переносить весь порядок callbacks между окружениями.

**Полный ответ**

Оба координируют tasks и microtasks, но источники событий и фазы различаются. Browser привязан к rendering frames и Web
APIs, Node — к libuv phases и server I/O. Нельзя механически переносить весь порядок callbacks между окружениями.





#### Вопрос: Что такое CommonJS?

**Короткий ответ**

CommonJS — историческая module system Node с require() и module.exports. Модули загружаются синхронно и имеют
собственный wrapper scope. Экосистема постепенно переходит на стандартные ES Modules.

**Полный ответ**

CommonJS — историческая module system Node с `require()` и `module.exports`. Модули загружаются синхронно и имеют
собственный wrapper scope. Экосистема постепенно переходит на стандартные ES Modules.





#### Вопрос: Что такое __dirname и почему его нет в ESM?

**Короткий ответ**

В CommonJS это directory текущего module file. ESM использует стандартный import.meta.url, из которого путь получают
через fileURLToPath. Отсутствие dirname связано с другой module model, а не с невозможностью работать с путями.

**Полный ответ**

В CommonJS это directory текущего module file. ESM использует стандартный `import.meta.url`, из которого путь получают
через `fileURLToPath`. Отсутствие `__dirname` связано с другой module model, а не с невозможностью работать с путями.





#### Вопрос: Что такое stream?

**Короткий ответ**

Stream обрабатывает данные частями вместо загрузки всего объема в память. Бывают readable, writable, duplex и transform
streams. Backpressure предотвращает переполнение медленного consumer.

**Полный ответ**

Stream обрабатывает данные частями вместо загрузки всего объема в память. Бывают readable, writable, duplex и transform
streams. Backpressure предотвращает переполнение медленного consumer.





#### Вопрос: Что такое Buffer?

**Короткий ответ**

Buffer представляет последовательность bytes в Node и используется для файлов, sockets и binary protocols. Encoding
нужно задавать явно при преобразовании в строку. В browser близкие primitives — ArrayBuffer и typed arrays.

**Полный ответ**

`Buffer` представляет последовательность bytes в Node и используется для файлов, sockets и binary protocols. Encoding
нужно задавать явно при преобразовании в строку. В browser близкие primitives — `ArrayBuffer` и typed arrays.





#### Вопрос: Что такое worker_threads?

**Короткий ответ**

Worker threads выполняют JavaScript параллельно внутри одного Node process с отдельными isolates. Они подходят для
CPU-bound вычислений, а не обычного async I/O. Обмен сообщениями и shared memory добавляют overhead.

**Полный ответ**

Worker threads выполняют JavaScript параллельно внутри одного Node process с отдельными isolates. Они подходят для
CPU-bound вычислений, а не обычного async I/O. Обмен сообщениями и shared memory добавляют overhead.



### Многопоточность и синхронизация



#### Вопрос: Однопоточен ли Node.js?

**Короткий ответ**

JavaScript-код внутри одного Node.js isolate обычно выполняется в одном потоке с одним event loop. Но сам runtime не
является полностью однопоточным: V8, libuv, операционная система и thread pool могут выполнять работу в других потоках.

**Полный ответ**

JavaScript-код внутри одного Node.js isolate обычно выполняется в одном потоке с одним event loop. Но сам runtime не
является полностью однопоточным: V8, libuv, операционная система и thread pool могут выполнять работу в других потоках.

Для параллельного выполнения JavaScript-кода Node.js предоставляет `worker_threads`. Поэтому точнее говорить: основной
JavaScript-поток однопоточен, но Node.js умеет использовать несколько потоков и процессов.





#### Вопрос: Чем concurrency отличается от parallelism?

**Короткий ответ**

Concurrency означает, что несколько задач находятся в работе одновременно и переключаются во времени. Например, один
event loop может ожидать несколько HTTP-запросов, не блокируя выполнение программы.

**Полный ответ**

Concurrency означает, что несколько задач находятся в работе одновременно и переключаются во времени. Например, один
event loop может ожидать несколько HTTP-запросов, не блокируя выполнение программы.

Parallelism означает физическое выполнение нескольких задач в один момент времени на разных CPU cores. Для параллельного
JavaScript-кода в Node.js обычно используют `worker_threads` или несколько процессов.

Асинхронность сама по себе не делает CPU-bound код параллельным. Тяжелый синхронный цикл все равно блокирует event loop.





#### Вопрос: Чем worker_threads отличаются от child_process и cluster?

**Короткий ответ**

Для CPU-bound вычислений внутри приложения обычно подходит pool из workerthreads. Для сильной изоляции и масштабирования
HTTP server по CPU cores часто используют несколько процессов или внешний process manager.

**Полный ответ**

- `worker_threads` запускают JavaScript параллельно внутри одного процесса. У каждого worker свой V8 isolate и event
  loop, но workers могут обмениваться сообщениями и использовать общую память через `SharedArrayBuffer`.
- `child_process` запускает отдельный процесс с отдельной памятью. Это полезно для изоляции, запуска внешних программ и
  независимого управления ресурсами.
- `cluster` запускает несколько Node.js processes и помогает распределять входящие соединения одного server port между
  ними.

Для CPU-bound вычислений внутри приложения обычно подходит pool из `worker_threads`. Для сильной изоляции и
масштабирования HTTP server по CPU cores часто используют несколько процессов или внешний process manager.





#### Вопрос: Как выполнить CPU-bound задачу в отдельном Worker Thread?

**Короткий ответ**

Основной поток создает Worker, передает входные данные и получает результат через message channel.

**Полный ответ**

Основной поток создает `Worker`, передает входные данные и получает результат через message channel.

`fibonacci-worker.mjs`:

```js
import {parentPort, workerData} from 'node:worker_threads';

const fibonacci = (value) => {
  if (value < 2) {
    return value;
  }

  return fibonacci(value - 1) + fibonacci(value - 2);
};

parentPort.postMessage(fibonacci(workerData));
```

`main.mjs`:

```js
import {Worker} from 'node:worker_threads';

const runFibonacci = (value) =>
  new Promise((resolve, reject) => {
    const worker = new Worker(new URL('./fibonacci-worker.mjs', import.meta.url), {
      workerData: value,
    });

    worker.once('message', resolve);
    worker.once('error', reject);
    worker.once('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`Worker завершился с кодом ${code}`));
      }
    });
  });

console.log(await runFibonacci(42));
```

Создавать новый worker для каждой маленькой задачи дорого. В production обычно используют постоянный worker pool и
очередь задач.



### Общая память и синхронизация



#### Вопрос: Как Worker Threads обмениваются данными?

**Короткий ответ**

Основные варианты:

**Полный ответ**

Основные варианты:

1. `postMessage()` копирует данные по правилам structured clone.
2. `ArrayBuffer` можно передать через transfer list без копирования, после чего исходная сторона теряет доступ к buffer.
3. `SharedArrayBuffer` доступен нескольким threads одновременно и требует явной синхронизации через `Atomics`.

Message passing обычно безопаснее и проще. Shared memory полезна только там, где стоимость копирования действительно
существенна и команда готова управлять race conditions.





#### Вопрос: Что такое race condition в Node.js?

**Короткий ответ**

Race condition возникает, когда результат зависит от порядка параллельного доступа к общему состоянию. Например,
операция counter[0] += 1 состоит из чтения, вычисления и записи. Два workers могут прочитать одно значение и потерять
одно из увеличений.

**Полный ответ**

Race condition возникает, когда результат зависит от порядка параллельного доступа к общему состоянию. Например,
операция `counter[0] += 1` состоит из чтения, вычисления и записи. Два workers могут прочитать одно значение и потерять
одно из увеличений.

Для счетчика в `SharedArrayBuffer` нужна атомарная операция:

```js
const buffer = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT);
const counter = new Int32Array(buffer);

Atomics.add(counter, 0, 1);
```

Для обычных async callbacks в одном event loop тоже возможны логические race conditions, если между чтением и записью
есть `await`. Но `Atomics` решает только синхронизацию shared memory между threads, а не любую ошибку конкурентного
доступа.





#### Вопрос: Что такое Atomics и зачем он нужен?

**Короткий ответ**

Atomics предоставляет неделимые операции над integer typed arrays, созданными поверх SharedArrayBuffer. Например:

**Полный ответ**

`Atomics` предоставляет неделимые операции над integer typed arrays, созданными поверх `SharedArrayBuffer`. Например:

- `Atomics.load()` и `Atomics.store()` читают и записывают значение;
- `Atomics.add()` атомарно изменяет счетчик;
- `Atomics.compareExchange()` реализует compare-and-swap;
- `Atomics.wait()` приостанавливает thread до изменения значения;
- `Atomics.notify()` пробуждает ожидающие threads.

`Atomics.wait()` блокирует текущий thread, поэтому его не следует использовать в основном Node.js event loop. Обычно
ожидание выполняют внутри worker thread.





#### Вопрос: Чем mutex отличается от semaphore?

**Короткий ответ**

Mutex разрешает вход в критическую секцию только одному участнику. Обычно освободить mutex должен тот же участник,
который его захватил.

**Полный ответ**

Mutex разрешает вход в критическую секцию только одному участнику. Обычно освободить mutex должен тот же участник,
который его захватил.

Semaphore хранит счетчик разрешений. Counting semaphore со значением `N` допускает одновременно до `N` участников.
Binary semaphore со значением `1` похож на mutex, но семантика владения может отличаться.

Примеры:

- mutex защищает изменение одного общего объекта;
- semaphore ограничивает pool из четырех database connections;
- semaphore ограничивает число одновременно выполняемых HTTP requests;
- semaphore между workers ограничивает доступ к дефицитному shared resource.





#### Вопрос: Как реализовать асинхронный semaphore для ограничения Promise-задач?

**Короткий ответ**

Такой semaphore ограничивает concurrency внутри одного event loop. Он полезен для HTTP requests, файловых операций или
доступа к connection pool, но не делает CPU-bound JavaScript параллельным.

**Полный ответ**

Такой semaphore ограничивает concurrency внутри одного event loop. Он полезен для HTTP requests, файловых операций или
доступа к connection pool, но не делает CPU-bound JavaScript параллельным.

```js
class Semaphore {
  #available;
  #queue = [];

  constructor(limit) {
    if (!Number.isInteger(limit) || limit < 1) {
      throw new TypeError('Semaphore limit must be a positive integer');
    }

    this.#available = limit;
  }

  acquire() {
    if (this.#available > 0) {
      this.#available -= 1;

      return Promise.resolve(this.#createRelease());
    }

    return new Promise((resolve) => {
      this.#queue.push(resolve);
    });
  }

  async run(task) {
    const release = await this.acquire();

    try {
      return await task();
    } finally {
      release();
    }
  }

  #createRelease() {
    let released = false;

    return () => {
      if (released) {
        return;
      }

      released = true;

      const next = this.#queue.shift();

      if (next) {
        next(this.#createRelease());
      } else {
        this.#available += 1;
      }
    };
  }
}
```

Использование с максимум двумя одновременными запросами:

```js
const semaphore = new Semaphore(2);
const urls = ['https://a.example', 'https://b.example', 'https://c.example'];

const responses = await Promise.all(urls.map((url) => semaphore.run(() => fetch(url))));
```

Освобождение находится в `finally`, поэтому permit вернется даже при ошибке задачи.





#### Вопрос: Как реализовать semaphore между Worker Threads через SharedArrayBuffer?

**Короткий ответ**

В общей памяти можно хранить количество доступных permits. Захват выполняется через compare-and-swap, а ожидающие
workers блокируются через Atomics.wait().

**Полный ответ**

В общей памяти можно хранить количество доступных permits. Захват выполняется через compare-and-swap, а ожидающие
workers блокируются через `Atomics.wait()`.

`shared-semaphore.mjs`:

```js
export const acquire = (state) => {
  while (true) {
    const permits = Atomics.load(state, 0);

    if (permits > 0 && Atomics.compareExchange(state, 0, permits, permits - 1) === permits) {
      return;
    }

    Atomics.wait(state, 0, 0);
  }
};

export const release = (state) => {
  Atomics.add(state, 0, 1);
  Atomics.notify(state, 0, 1);
};
```

Основной поток создает shared state и передает его workers:

```js
import {Worker} from 'node:worker_threads';

const permits = 2;
const buffer = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT);
const state = new Int32Array(buffer);

Atomics.store(state, 0, permits);

const workers = Array.from(
  {length: 4},
  (_, id) =>
    new Worker(new URL('./worker.mjs', import.meta.url), {
      workerData: {id, semaphoreBuffer: buffer},
    }),
);

await Promise.all(
  workers.map(
    (worker) =>
      new Promise((resolve, reject) => {
        worker.once('exit', resolve);
        worker.once('error', reject);
      }),
  ),
);
```

`worker.mjs`:

```js
import {setTimeout} from 'node:timers/promises';
import {workerData} from 'node:worker_threads';
import {acquire, release} from './shared-semaphore.mjs';

const state = new Int32Array(workerData.semaphoreBuffer);

acquire(state);

try {
  console.log(`Worker ${workerData.id} получил permit`);
  await setTimeout(500);
} finally {
  release(state);
}
```

Этот пример учебный. В production нужно дополнительно продумать shutdown, timeout, cancellation, падение worker после
`acquire()`, максимальное число permits, fairness и восстановление утраченного permit.





#### Вопрос: Какие ошибки часто допускают при работе с многопоточностью в Node.js?

**Короткий ответ**

По умолчанию лучше использовать message passing и изолированное состояние. Shared memory и низкоуровневые primitives
нужны только после измерений и при понятной модели владения ресурсами.

**Полный ответ**

- отправляют обычный async I/O в workers, хотя event loop уже эффективно обрабатывает его;
- создают новый worker для каждой маленькой задачи вместо worker pool;
- копируют большие данные между threads и теряют выигрыш на serialization;
- изменяют `SharedArrayBuffer` без `Atomics`;
- вызывают blocking primitives в основном event loop;
- забывают освобождать mutex или semaphore в `finally`;
- не обрабатывают `error`, `exit`, timeout и отмену worker;
- предполагают, что semaphore автоматически гарантирует fairness и отсутствие deadlock.

По умолчанию лучше использовать message passing и изолированное состояние. Shared memory и низкоуровневые primitives
нужны только после измерений и при понятной модели владения ресурсами.



### npm и package scripts



#### Вопрос: Что такое npm package?

**Короткий ответ**

Это directory или опубликованный artifact с package.json и кодом. Package может быть библиотекой, CLI или приложением.
Имя и version определяют его identity в registry.

**Полный ответ**

Это directory или опубликованный artifact с `package.json` и кодом. Package может быть библиотекой, CLI или приложением.
Имя и version определяют его identity в registry.





#### Вопрос: Что такое package.json?

**Короткий ответ**

Manifest проекта описывает metadata, scripts, dependencies, package exports и настройки tools. Он не фиксирует точное
дерево transitive dependencies. Для этого нужен lock-файл.

**Полный ответ**

Manifest проекта описывает metadata, scripts, dependencies, package exports и настройки tools. Он не фиксирует точное
дерево transitive dependencies. Для этого нужен lock-файл.





#### Вопрос: Что такое peerDependencies?

**Короткий ответ**

Они объявляют, что package ожидает совместимую dependency от host-проекта. Это важно для frameworks и plugins, которым
нужен общий runtime instance. Например, Angular library обычно указывает Angular как peer dependency.

**Полный ответ**

Они объявляют, что package ожидает совместимую dependency от host-проекта. Это важно для frameworks и plugins, которым
нужен общий runtime instance. Например, Angular library обычно указывает Angular как peer dependency.





#### Вопрос: Что такое npm scripts?

**Короткий ответ**

Это именованные shell-команды в поле scripts, запускаемые через npm run. npm добавляет локальные binaries из
nodemodules/.bin в PATH. Lifecycle scripts могут запускаться автоматически, поэтому dependencies должны быть
доверенными.

**Полный ответ**

Это именованные shell-команды в поле `scripts`, запускаемые через `npm run`. npm добавляет локальные binaries из
`node_modules/.bin` в `PATH`. Lifecycle scripts могут запускаться автоматически, поэтому dependencies должны быть
доверенными.





#### Вопрос: Что такое semantic versioning?

**Короткий ответ**

SemVer использует major.minor.patch: major для breaking changes, minor для совместимой функциональности, patch для
совместимых fixes. До 1.0.0 гарантии часто трактуются осторожнее. Versioning полезно только при честном публичном
контракте.

**Полный ответ**

SemVer использует `major.minor.patch`: major для breaking changes, minor для совместимой функциональности, patch для
совместимых fixes. До `1.0.0` гарантии часто трактуются осторожнее. Versioning полезно только при честном публичном
контракте.





#### Вопрос: Что значит ^, ~ и exact version в package.json?

**Короткий ответ**

Exact устанавливает только указанную version. 1.2.3 допускает patch updates, ^1.2.3 — compatible minor и patch до
следующего major. Фактическую установленную версию фиксирует lock-файл.

**Полный ответ**

Exact устанавливает только указанную version. `~1.2.3` допускает patch updates, `^1.2.3` — compatible minor и patch до
следующего major. Фактическую установленную версию фиксирует lock-файл.





#### Вопрос: Чем dependencies отличаются от devDependencies?

**Короткий ответ**

dependencies нужны package во время runtime потребителя, devDependencies — для разработки, тестов и сборки. Для frontend
application обе группы обычно устанавливаются перед build. Для library правильная классификация влияет на потребителя.

**Полный ответ**

`dependencies` нужны package во время runtime потребителя, `devDependencies` — для разработки, тестов и сборки. Для
frontend application обе группы обычно устанавливаются перед build. Для library правильная классификация влияет на
потребителя.





#### Вопрос: Что такое package-lock.json?

**Короткий ответ**

Lock-файл фиксирует точные версии и integrity всего установленного dependency tree. Он делает installs воспроизводимыми.
Ручное редактирование обычно не требуется.

**Полный ответ**

Lock-файл фиксирует точные версии и integrity всего установленного dependency tree. Он делает installs воспроизводимыми.
Ручное редактирование обычно не требуется.





#### Вопрос: Почему lock-файл важно коммитить?

**Короткий ответ**

CI и разработчики получают одно и то же разрешенное дерево, а изменения dependencies видны в review. Без lock-файла
compatible ranges могут установить разные transitive versions. Это усложняет debugging и supply-chain audit.

**Полный ответ**

CI и разработчики получают одно и то же разрешенное дерево, а изменения dependencies видны в review. Без lock-файла
compatible ranges могут установить разные transitive versions. Это усложняет debugging и supply-chain audit.





#### Вопрос: Что делает npm install?

**Короткий ответ**

Разрешает dependencies, устанавливает их в nodemodules и обновляет lock-файл при необходимости. Он подходит для
локальной разработки и добавления packages. Результат может изменить lock при рассинхронизации manifest.

**Полный ответ**

Разрешает dependencies, устанавливает их в `node_modules` и обновляет lock-файл при необходимости. Он подходит для
локальной разработки и добавления packages. Результат может изменить lock при рассинхронизации manifest.





#### Вопрос: Что делает npm ci?

**Короткий ответ**

Удаляет существующий nodemodules и устанавливает точно по lock-файлу. Команда завершится ошибкой, если package.json и
lock не согласованы. Она не переписывает dependency tree.

**Полный ответ**

Удаляет существующий `node_modules` и устанавливает точно по lock-файлу. Команда завершится ошибкой, если `package.json`
и lock не согласованы. Она не переписывает dependency tree.





#### Вопрос: Чем npm ci лучше для CI?

**Короткий ответ**

Дает чистую, воспроизводимую установку и быстро обнаруживает незакоммиченный lock update. Поведение меньше зависит от
предыдущего workspace state. Кеш npm downloads можно использовать отдельно от nodemodules.

**Полный ответ**

Дает чистую, воспроизводимую установку и быстро обнаруживает незакоммиченный lock update. Поведение меньше зависит от
предыдущего workspace state. Кеш npm downloads можно использовать отдельно от `node_modules`.





#### Вопрос: Как npm scripts используются во frontend-проектах?

**Короткий ответ**

Для start, build, test, lint, format, code generation и deployment wrappers. Они дают команде единый interface поверх
Angular CLI, Vite и других tools. Scripts должны оставаться понятными и composable.

**Полный ответ**

Для `start`, `build`, `test`, `lint`, `format`, code generation и deployment wrappers. Они дают команде единый interface
поверх Angular CLI, Vite и других tools. Scripts должны оставаться понятными и composable.





#### Вопрос: Чем task runner отличается от package scripts?

**Короткий ответ**

Task runner вроде Gulp или Grunt описывает pipeline через отдельный инструмент и плагины. Package scripts запускают
команды напрямую через npm, pnpm, Yarn или Bun. В современных frontend-проектах многие задачи закрываются framework CLI,
bundler и package scripts, но legacy-проекты могут все еще использовать task runners для сборки assets или интеграции.

**Полный ответ**

Task runner вроде Gulp или Grunt описывает pipeline через отдельный инструмент и плагины. Package scripts запускают
команды напрямую через npm, pnpm, Yarn или Bun. В современных frontend-проектах многие задачи закрываются framework CLI,
bundler и package scripts, но legacy-проекты могут все еще использовать task runners для сборки assets или интеграции.



### Node.js для frontend tooling



#### Вопрос: Что такое dev server?

**Короткий ответ**

Локальный HTTP server для разработки с module transforms, source maps, watch и hot reload. Он оптимизирован для
feedback, а не безопасности, кеширования и production traffic. Его нельзя использовать как production hosting.

**Полный ответ**

Локальный HTTP server для разработки с module transforms, source maps, watch и hot reload. Он оптимизирован для
feedback, а не безопасности, кеширования и production traffic. Его нельзя использовать как production hosting.





#### Вопрос: Почему frontend-проекту нужен Node.js?

**Короткий ответ**

Node запускает package manager, compiler, linter, tests, dev server и production build. Результат затем выполняется в
browser и может не зависеть от Node. SSR-приложение дополнительно использует Node во время runtime.

**Полный ответ**

Node запускает package manager, compiler, linter, tests, dev server и production build. Результат затем выполняется в
browser и может не зависеть от Node. SSR-приложение дополнительно использует Node во время runtime.





#### Вопрос: Как Node.js используется в Angular CLI?

**Короткий ответ**

CLI запускается как Node program, читает workspace config и вызывает builders. TypeScript/Angular compiler, dev server и
test runner также работают в Node. Поддерживаемая Node version зависит от Angular version.

**Полный ответ**

CLI запускается как Node program, читает workspace config и вызывает builders. TypeScript/Angular compiler, dev server и
test runner также работают в Node. Поддерживаемая Node version зависит от Angular version.





#### Вопрос: Как Node.js используется в Vite/Webpack/esbuild?

**Короткий ответ**

Он запускает bundler process, читает файлы, разрешает modules и обслуживает plugins. Vite предоставляет dev server,
Webpack строит module graph, esbuild выполняет быстрые transforms/bundling. Production output предназначен для browser
или server target.

**Полный ответ**

Он запускает bundler process, читает файлы, разрешает modules и обслуживает plugins. Vite предоставляет dev server,
Webpack строит module graph, esbuild выполняет быстрые transforms/bundling. Production output предназначен для browser
или server target.





#### Вопрос: Чем dev server отличается от production build?

**Короткий ответ**

Dev server часто преобразует modules по запросу и хранит часть данных в памяти. Production build минифицирует, хеширует,
оптимизирует и записывает deployable artifacts. Поведение окружения нужно проверять production build.

**Полный ответ**

Dev server часто преобразует modules по запросу и хранит часть данных в памяти. Production build минифицирует, хеширует,
оптимизирует и записывает deployable artifacts. Поведение окружения нужно проверять production build.





#### Вопрос: Почему код, который работает в Node.js, может не работать в браузере?

**Короткий ответ**

Browser не предоставляет fs, process, CommonJS resolution и unrestricted sockets. Также действуют CORS, CSP и sandbox.
Bundler polyfills не следует считать автоматическими или бесплатными.

**Полный ответ**

Browser не предоставляет `fs`, `process`, CommonJS resolution и unrestricted sockets. Также действуют CORS, CSP и
sandbox. Bundler polyfills не следует считать автоматическими или бесплатными.





#### Вопрос: Почему код, который работает в браузере, может не работать в Node.js?

**Короткий ответ**

В Node обычно нет window, document, DOM, layout и browser storage. SSR-код должен изолировать browser-only API.
Некоторые Web APIs появляются в новых Node versions, но их поддержку нужно проверять.

**Полный ответ**

В Node обычно нет `window`, `document`, DOM, layout и browser storage. SSR-код должен изолировать browser-only API.
Некоторые Web APIs появляются в новых Node versions, но их поддержку нужно проверять.





#### Вопрос: Когда scaffolding tools полезны, а когда вредят?

**Короткий ответ**

Scaffolding tools полезны, когда создают повторяемую структуру components, features, libraries или tests по текущим
командным conventions. Они вредят, если генерируют много непонятного boilerplate или закрепляют устаревшую архитектуру.
Генератор должен отражать живую codebase, а не исторические привычки.

**Полный ответ**

Scaffolding tools полезны, когда создают повторяемую структуру components, features, libraries или tests по текущим
командным conventions. Они вредят, если генерируют много непонятного boilerplate или закрепляют устаревшую архитектуру.
Генератор должен отражать живую codebase, а не исторические привычки.
