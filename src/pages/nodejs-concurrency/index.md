---
layout: ../../layouts/Layout.astro
title: 'Node.js: многопоточность и синхронизация'
description: Worker Threads, параллелизм, race condition, Atomics, mutex и semaphore в Node.js
category: Backend
kind: questions
order: 76
---

## Node.js: многопоточность и синхронизация

### Основы многопоточности

<details>
<summary>Однопоточен ли Node.js?</summary><br>
<table><tr><td>

JavaScript-код внутри одного Node.js isolate обычно выполняется в одном потоке с одним event loop. Но сам runtime не
является полностью однопоточным: V8, libuv, операционная система и thread pool могут выполнять работу в других потоках.

Для параллельного выполнения JavaScript-кода Node.js предоставляет `worker_threads`. Поэтому точнее говорить: основной
JavaScript-поток однопоточен, но Node.js умеет использовать несколько потоков и процессов.

</td></tr></table>
</details>

<details>
<summary>Чем concurrency отличается от parallelism?</summary><br>
<table><tr><td>

Concurrency означает, что несколько задач находятся в работе одновременно и переключаются во времени. Например, один
event loop может ожидать несколько HTTP-запросов, не блокируя выполнение программы.

Parallelism означает физическое выполнение нескольких задач в один момент времени на разных CPU cores. Для параллельного
JavaScript-кода в Node.js обычно используют `worker_threads` или несколько процессов.

Асинхронность сама по себе не делает CPU-bound код параллельным. Тяжелый синхронный цикл все равно блокирует event loop.

</td></tr></table>
</details>

<details>
<summary>Чем <code>worker_threads</code> отличаются от <code>child_process</code> и <code>cluster</code>?</summary><br>
<table><tr><td>

- `worker_threads` запускают JavaScript параллельно внутри одного процесса. У каждого worker свой V8 isolate и event
  loop, но workers могут обмениваться сообщениями и использовать общую память через `SharedArrayBuffer`.
- `child_process` запускает отдельный процесс с отдельной памятью. Это полезно для изоляции, запуска внешних программ и
  независимого управления ресурсами.
- `cluster` запускает несколько Node.js processes и помогает распределять входящие соединения одного server port между
  ними.

Для CPU-bound вычислений внутри приложения обычно подходит pool из `worker_threads`. Для сильной изоляции и
масштабирования HTTP server по CPU cores часто используют несколько процессов или внешний process manager.

</td></tr></table>
</details>

<details>
<summary>Как выполнить CPU-bound задачу в отдельном Worker Thread?</summary><br>
<table><tr><td>

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

</td></tr></table>
</details>

### Общая память и синхронизация

<details>
<summary>Как Worker Threads обмениваются данными?</summary><br>
<table><tr><td>

Основные варианты:

1. `postMessage()` копирует данные по правилам structured clone.
2. `ArrayBuffer` можно передать через transfer list без копирования, после чего исходная сторона теряет доступ к buffer.
3. `SharedArrayBuffer` доступен нескольким threads одновременно и требует явной синхронизации через `Atomics`.

Message passing обычно безопаснее и проще. Shared memory полезна только там, где стоимость копирования действительно
существенна и команда готова управлять race conditions.

</td></tr></table>
</details>

<details>
<summary>Что такое race condition в Node.js?</summary><br>
<table><tr><td>

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

</td></tr></table>
</details>

<details>
<summary>Что такое <code>Atomics</code> и зачем он нужен?</summary><br>
<table><tr><td>

`Atomics` предоставляет неделимые операции над integer typed arrays, созданными поверх `SharedArrayBuffer`. Например:

- `Atomics.load()` и `Atomics.store()` читают и записывают значение;
- `Atomics.add()` атомарно изменяет счетчик;
- `Atomics.compareExchange()` реализует compare-and-swap;
- `Atomics.wait()` приостанавливает thread до изменения значения;
- `Atomics.notify()` пробуждает ожидающие threads.

`Atomics.wait()` блокирует текущий thread, поэтому его не следует использовать в основном Node.js event loop. Обычно
ожидание выполняют внутри worker thread.

</td></tr></table>
</details>

<details>
<summary>Чем mutex отличается от semaphore?</summary><br>
<table><tr><td>

Mutex разрешает вход в критическую секцию только одному участнику. Обычно освободить mutex должен тот же участник,
который его захватил.

Semaphore хранит счетчик разрешений. Counting semaphore со значением `N` допускает одновременно до `N` участников.
Binary semaphore со значением `1` похож на mutex, но семантика владения может отличаться.

Примеры:

- mutex защищает изменение одного общего объекта;
- semaphore ограничивает pool из четырех database connections;
- semaphore ограничивает число одновременно выполняемых HTTP requests;
- semaphore между workers ограничивает доступ к дефицитному shared resource.

</td></tr></table>
</details>

<details>
<summary>Как реализовать асинхронный semaphore для ограничения Promise-задач?</summary><br>
<table><tr><td>

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

</td></tr></table>
</details>

<details>
<summary>Как реализовать semaphore между Worker Threads через <code>SharedArrayBuffer</code>?</summary><br>
<table><tr><td>

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

</td></tr></table>
</details>

<details>
<summary>Какие ошибки часто допускают при работе с многопоточностью в Node.js?</summary><br>
<table><tr><td>

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

</td></tr></table>
</details>
