# JavaScript — вопросы и ответы, часть 5

> Автоматически сгенерировано из src/pages/javascript/index.md. Не редактируйте вручную.

### Практика по JavaScript



#### Вопрос: Реализуйте chunk(array, size).

**Короткий ответ**

Что проверяет: работу с массивами, границы цикла, edge cases.

**Полный ответ**

**Что проверяет:** работу с массивами, границы цикла, edge cases.

Функция должна разбить массив на группы длиной `size`. Последняя группа может быть короче.

```js
function chunk(items, size) {
  if (size <= 0) {
    throw new Error('Size must be positive');
  }

  const result = [];

  for (let index = 0; index < items.length; index += size) {
    result.push(items.slice(index, index + size));
  }

  return result;
}

chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
```

На интервью важно обсудить пустой массив, `size === 1`, некорректный `size` и то, что `slice` делает shallow copy.





#### Вопрос: Реализуйте retry для асинхронной операции.

**Короткий ответ**

Что проверяет: Promise, async/await, обработку ошибок, backoff и отмену.

**Полный ответ**

**Что проверяет:** Promise, `async/await`, обработку ошибок, backoff и отмену.

```js
async function retry(operation, options) {
  const {attempts, delayMs} = options;
  let attempt = 0;

  while (attempt < attempts) {
    try {
      return await operation();
    } catch (error) {
      attempt += 1;

      if (attempt >= attempts) {
        throw error;
      }

      await new Promise((resolve) => setTimeout(resolve, delayMs * attempt));
    }
  }
}
```

В production-версии стоит добавить `AbortSignal`, jitter, список retryable ошибок и лимит общего времени. Не все ошибки
нужно повторять: `400` обычно не retryable, а `429`, `502`, `503` могут быть retryable при корректном backoff.

**Follow-up вопросы:**

- Чем fixed delay отличается от exponential backoff?
- Как избежать thundering herd?
- Как сделать retry отменяемым?





#### Вопрос: Реализуйте простой EventEmitter.

**Короткий ответ**

Что проверяет: структуры данных, callbacks, cleanup подписок.

**Полный ответ**

**Что проверяет:** структуры данных, callbacks, cleanup подписок.

```js
class EventEmitter {
  #listeners = new Map();

  on(eventName, listener) {
    const listeners = this.#listeners.get(eventName) ?? new Set();
    listeners.add(listener);
    this.#listeners.set(eventName, listeners);

    return () => {
      listeners.delete(listener);
    };
  }

  emit(eventName, payload) {
    const listeners = this.#listeners.get(eventName);

    if (!listeners) {
      return;
    }

    for (const listener of [...listeners]) {
      listener(payload);
    }
  }
}
```

Копия `Set` при `emit` защищает от неожиданного изменения коллекции во время обхода. На интервью можно усложнить задачу:
`once`, wildcard events, порядок выполнения, обработка ошибок listener и удаление пустых наборов.





#### Вопрос: Реализуйте безопасное чтение значения по строковому пути.

**Короткий ответ**

Что проверяет: работу с объектами, optional access, защиту от некорректного пути.

**Полный ответ**

**Что проверяет:** работу с объектами, optional access, защиту от некорректного пути.

```js
function getByPath(source, path, fallback) {
  const parts = path.split('.');
  let current = source;

  for (const part of parts) {
    const canReadProperty = current !== null && typeof current === 'object' && Object.hasOwn(current, part);

    if (!canReadProperty) {
      return fallback;
    }

    current = current[part];
  }

  return current;
}

getByPath({user: {name: 'Ada'}}, 'user.name', ''); // 'Ada'
```

В ответе важно не использовать небезопасный `eval`. Для записи по пути отдельно обсуждают prototype pollution и запрет
ключей вроде `__proto__`, `constructor`, `prototype`.





#### Вопрос: Как реализовать polyfill для Promise.all?

**Короткий ответ**

Нужно сохранить порядок результатов, принять обычные значения вместе с promises и отклонить итоговый promise при первой
ошибке.

**Полный ответ**

Нужно сохранить порядок результатов, принять обычные значения вместе с promises и отклонить итоговый promise при первой
ошибке.

```js
function promiseAll(values) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;

    if (values.length === 0) {
      resolve([]);
      return;
    }

    values.forEach((value, index) => {
      Promise.resolve(value)
        .then((result) => {
          results[index] = result;
          completed += 1;

          if (completed === values.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
}
```

Частые ошибки: возвращать результаты в порядке завершения, забывать пустой массив, не оборачивать обычные значения через
`Promise.resolve`, пытаться отменять уже запущенные операции.
