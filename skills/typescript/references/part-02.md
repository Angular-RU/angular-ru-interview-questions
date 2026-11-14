# TypeScript — вопросы и ответы, часть 2

> Автоматически сгенерировано из src/pages/typescript/index.md. Не редактируйте вручную.

### Алгоритмы и структуры данных для frontend



#### Вопрос: Что такое дерево и где деревья встречаются в Angular-приложении?

**Короткий ответ**

Дерево — иерархическая структура из узлов, где у узла может быть родитель и дочерние узлы. Во frontend деревья
встречаются постоянно: DOM tree, accessibility tree, component tree, Angular Router tree, DI tree, Reactive Forms tree,
AST в TypeScript/ESLint/Babel.

**Полный ответ**

Дерево — иерархическая структура из узлов, где у узла может быть родитель и дочерние узлы. Во frontend деревья
встречаются постоянно: DOM tree, accessibility tree, component tree, Angular Router tree, DI tree, Reactive Forms tree,
AST в TypeScript/ESLint/Babel.

Обход дерева нужен для поиска узла, валидации вложенной формы, построения меню, анализа AST или сериализации состояния.
DFS удобно идет вглубь ветки, BFS обходит уровень за уровнем.

```ts
function collectInvalidControls(control: AbstractControl): AbstractControl[] {
  const invalidControls: AbstractControl[] = [];
  const stack: AbstractControl[] = [control];

  while (stack.length > 0) {
    const current = stack.pop();

    if (current === undefined) {
      continue;
    }

    if (current.invalid) {
      invalidControls.push(current);
    }

    if ('controls' in current) {
      stack.push(...Object.values(current.controls));
    }
  }

  return invalidControls;
}
```





#### Вопрос: Что такое граф и где графы встречаются во frontend-разработке?

**Короткий ответ**

Граф состоит из вершин и связей между ними. Directed graph имеет направленные ребра, undirected graph — связи без
направления. Граф может храниться как adjacency list или adjacency matrix.

**Полный ответ**

Граф состоит из вершин и связей между ними. Directed graph имеет направленные ребра, undirected graph — связи без
направления. Граф может храниться как adjacency list или adjacency matrix.

Во frontend графы встречаются в routing flows, state machines, dependency graph bundler-а, Nx affected graph, module
federation dependencies, диаграммах, permission models и формах с зависимыми полями.

Cycle в dependency graph часто означает архитектурную проблему: модули начинают зависеть друг от друга, сборка и тесты
становятся хрупкими. DFS помогает находить cycle, BFS — искать кратчайший путь по числу переходов в простом графе.





#### Вопрос: Что такое NP-complete и нужно ли это frontend-разработчику?

**Короткий ответ**

NP-complete — класс задач, для которых неизвестен быстрый алгоритм общего вида, а перебор вариантов быстро становится
непрактичным. Для frontend это редко повседневная тема, но идея полезна при обсуждении scheduling, layout, оптимизации
маршрутов, упаковки элементов и сложных combinatorial constraints.

**Полный ответ**

NP-complete — класс задач, для которых неизвестен быстрый алгоритм общего вида, а перебор вариантов быстро становится
непрактичным. Для frontend это редко повседневная тема, но идея полезна при обсуждении scheduling, layout, оптимизации
маршрутов, упаковки элементов и сложных combinatorial constraints.

На интервью достаточно объяснить практический вывод: если точное решение слишком дорогое, выбирают ограничения,
эвристики, приближенный алгоритм, предварительный расчет на сервере или упрощение продукта.





#### Вопрос: Почему Array.includes внутри filter может случайно дать O(n²)?

**Короткий ответ**

includes() ищет элемент линейно. Если вызвать его для каждого элемента другого массива, получится вложенный перебор. На
маленьком списке это нормально, но на тысячах строк таблицы может стать bottleneck.

**Полный ответ**

`includes()` ищет элемент линейно. Если вызвать его для каждого элемента другого массива, получится вложенный перебор.
На маленьком списке это нормально, но на тысячах строк таблицы может стать bottleneck.

```ts
const selectedUsers = users.filter((user) => selectedIds.includes(user.id));
```

Если `selectedIds` большой и используется многократно, лучше построить `Set` один раз:

```ts
const selectedIdSet = new Set(selectedIds);
const selectedUsers = users.filter((user) => selectedIdSet.has(user.id));
```

Так поиск по выбранным id становится в среднем `O(1)`, а общий проход — `O(n + m)` по времени ценой дополнительной
памяти.





#### Вопрос: Как выбрать между Array, Object, Map и Set?

**Короткий ответ**

Для UI-состояния структура должна выражать сценарий. Если список нужен для отображения, часто оставляют Array. Если
нужны частые проверки выбранности, рядом хранят Set id. Если нужно быстро получить сущность по id, добавляют Map.

**Полный ответ**

| Структура | Когда использовать                                                      | Важный компромисс                   |
| --------- | ----------------------------------------------------------------------- | ----------------------------------- |
| `Array`   | Упорядоченный список, rendering через `@for`, последовательный обход    | Поиск по значению обычно `O(n)`     |
| `Object`  | Простая JSON-like запись со строковыми ключами                          | Не подходит для произвольных ключей |
| `Map`     | Индекс по id, кеш по объекту или составному ключу, частые lookup/delete | Больше overhead, чем у plain object |
| `Set`     | Уникальные значения, проверка принадлежности, дедупликация              | Хранит только значения, без payload |

Для UI-состояния структура должна выражать сценарий. Если список нужен для отображения, часто оставляют `Array`. Если
нужны частые проверки выбранности, рядом хранят `Set` id. Если нужно быстро получить сущность по id, добавляют `Map`.





#### Вопрос: Что значит stable sort и почему это важно для UI?

**Короткий ответ**

Stable sort сохраняет относительный порядок элементов, которые считаются равными comparator-ом. Это важно для таблиц:
если пользователь сначала отсортировал список по имени, а потом по роли, элементы с одинаковой ролью могут сохранить
предыдущий порядок по имени.

**Полный ответ**

Stable sort сохраняет относительный порядок элементов, которые считаются равными comparator-ом. Это важно для таблиц:
если пользователь сначала отсортировал список по имени, а потом по роли, элементы с одинаковой ролью могут сохранить
предыдущий порядок по имени.

Современный JavaScript требует стабильную сортировку `Array.prototype.sort`. Но comparator все равно должен быть
корректным: возвращать отрицательное число, ноль или положительное число согласованно и не зависеть от случайного
состояния.

```ts
const sorted = users.toSorted((first, second) => {
  const byRole = first.role.localeCompare(second.role);

  return byRole === 0 ? first.name.localeCompare(second.name) : byRole;
});
```





#### Вопрос: Чем отличаются preorder, inorder, postorder, DFS и BFS?

**Короткий ответ**

DFS идет в глубину. Preorder обрабатывает узел до детей, postorder — после детей, inorder применим прежде всего к
бинарным деревьям и обходит левую ветку, узел, правую ветку.

**Полный ответ**

DFS идет в глубину. Preorder обрабатывает узел до детей, postorder — после детей, inorder применим прежде всего к
бинарным деревьям и обходит левую ветку, узел, правую ветку.

BFS идет по уровням и обычно использует очередь. Он удобен, когда нужно найти ближайший подходящий узел или обработать
иерархию слоями.

В Angular-практике preorder похож на обработку route/config tree сверху вниз, postorder удобен для агрегации валидности
детей формы, а BFS может пригодиться для поиска ближайшего видимого пункта в древовидном UI.





#### Вопрос: Что такое BST и почему он не всегда дает O(log n)?

**Короткий ответ**

Binary Search Tree хранит меньшие значения в левом поддереве, большие — в правом. Если дерево сбалансировано, поиск,
вставка и удаление работают за O(log n).

**Полный ответ**

Binary Search Tree хранит меньшие значения в левом поддереве, большие — в правом. Если дерево сбалансировано, поиск,
вставка и удаление работают за `O(log n)`.

Если добавлять уже отсортированные значения в обычный BST без балансировки, дерево может выродиться в цепочку, и поиск
станет `O(n)`. Поэтому на практике используют самобалансирующиеся деревья или другие структуры.

Frontend-разработчику редко нужно писать BST руками. Важнее понимать идею упорядоченной структуры и почему обычный
массив с бинарным поиском, `Map` или серверный индекс часто практичнее.





#### Вопрос: Чем adjacency list отличается от adjacency matrix?

**Короткий ответ**

Adjacency list хранит для каждой вершины список соседей. Он обычно экономнее для sparse graph, где связей мало
относительно числа возможных связей.

**Полный ответ**

Adjacency list хранит для каждой вершины список соседей. Он обычно экономнее для sparse graph, где связей мало
относительно числа возможных связей.

Adjacency matrix хранит таблицу `n * n`, где быстро проверять наличие ребра между двумя вершинами, но память стоит
`O(n²)`. Для больших dependency graph это часто слишком дорого.

```ts
const dependencies = new Map<string, readonly string[]>([
  ['checkout', ['shared-ui', 'payments']],
  ['payments', ['shared-ui']],
]);
```

Для большинства frontend-задач adjacency list через `Map<string, string[]>` читаемее и дешевле.





#### Вопрос: Когда рекурсию лучше заменить итерацией во frontend-коде?

**Короткий ответ**

Рекурсия хорошо выражает дерево или вложенную структуру, но глубина call stack ограничена. Если данные могут прийти от
API и быть очень глубокими, рекурсивный обход рискует упасть с RangeError.

**Полный ответ**

Рекурсия хорошо выражает дерево или вложенную структуру, но глубина call stack ограничена. Если данные могут прийти от
API и быть очень глубокими, рекурсивный обход рискует упасть с `RangeError`.

Итерация с явным stack или queue безопаснее для больших структур и позволяет проще разбивать работу на chunks, чтобы не
блокировать main thread.

```ts
const stack: TreeNode[] = [root];

while (stack.length > 0) {
  const node = stack.pop();

  if (node === undefined) {
    continue;
  }

  processNode(node);
  stack.push(...node.children);
}
```





#### Вопрос: Что такое bitwise operations и почему в JavaScript с ними нужно быть осторожным?

**Короткий ответ**

Bitwise operations работают с битовым представлением числа: &, |, ^, , >, >>>. В JavaScript такие операции приводят
number к 32-bit integer, поэтому большие значения, дроби и NaN ведут себя не как обычная арифметика number.

**Полный ответ**

Bitwise operations работают с битовым представлением числа: `&`, `|`, `^`, `~`, `<<`, `>>`, `>>>`. В JavaScript такие
операции приводят `number` к 32-bit integer, поэтому большие значения, дроби и `NaN` ведут себя не как обычная
арифметика `number`.

Битовые маски могут пригодиться для компактного набора flags, permissions или низкоуровневой работы с binary data. Но в
обычном frontend-бизнес-коде читаемый объект, `Set` или enum-like union чаще безопаснее и понятнее.

```ts
const enum Permission {
  Read = 1 << 0,
  Write = 1 << 1,
}

const canWrite = (permissions: number): boolean => (permissions & Permission.Write) !== 0;
```





#### Вопрос: Зачем frontend-разработчику понимать Big O?

**Короткий ответ**

Big O помогает оценить, как растет стоимость операции при увеличении входных данных. Для frontend это не абстрактная
математика: фильтрация таблицы, группировка списка, сортировка на клиенте, поиск выбранных элементов и построение дерева
меню могут выполняться на main thread и напрямую влиять на отзывчивость UI.

**Полный ответ**

Big O помогает оценить, как растет стоимость операции при увеличении входных данных. Для frontend это не абстрактная
математика: фильтрация таблицы, группировка списка, сортировка на клиенте, поиск выбранных элементов и построение дерева
меню могут выполняться на main thread и напрямую влиять на отзывчивость UI.

Важно помнить, что Big O не заменяет профилирование. `O(n)` на маленьком массиве может быть незаметен, а `O(n log n)` с
дорогим comparator, большим DOM update или лишними allocation может давать long task. На практике сначала оценивают
порядок роста, затем подтверждают проблему Performance panel, профилировщиком Angular или пользовательскими метриками.





#### Вопрос: Как оценить сложность фильтрации, сортировки и группировки списка на клиенте?

**Короткий ответ**

Фильтрация одним проходом обычно стоит O(n). Группировка через Map тоже обычно O(n), если lookup по ключу
амортизированно константный. Сортировка чаще стоит O(n log n), но реальная стоимость зависит от comparator и размера
элементов.

**Полный ответ**

Фильтрация одним проходом обычно стоит `O(n)`. Группировка через `Map` тоже обычно `O(n)`, если lookup по ключу
амортизированно константный. Сортировка чаще стоит `O(n log n)`, но реальная стоимость зависит от comparator и размера
элементов.

```ts
const usersByRole = users.reduce((groups, user) => {
  const roleUsers = groups.get(user.role) ?? [];

  roleUsers.push(user);
  groups.set(user.role, roleUsers);

  return groups;
}, new Map<string, User[]>());
```

Для Angular важно не только вычисление, но и rendering. Даже быстрый алгоритм может привести к лагам, если после него
отрисовать тысячи DOM-узлов без virtual scroll, pagination или server-side filtering.





#### Вопрос: Где во frontend встречаются stack, queue и priority queue?

**Короткий ответ**

Stack работает по LIFO. Во frontend он встречается как call stack, undo/redo history, breadcrumbs навигации назад, обход
дерева DFS без рекурсии.

**Полный ответ**

Stack работает по LIFO. Во frontend он встречается как call stack, undo/redo history, breadcrumbs навигации назад, обход
дерева DFS без рекурсии.

Queue работает по FIFO. Примеры: очередь toast-уведомлений, upload tasks, последовательные save operations через
`concatMap`, message queue между main thread и Web Worker.

Priority queue отдает элемент с наибольшим или наименьшим приоритетом. В UI она нужна редко, но может пригодиться для
планирования фоновых задач, обработки событий по важности или алгоритмов графов. В обычном бизнес-коде часто лучше
начать с читаемого массива и сортировки, если объем маленький и профиль не показывает проблему.





#### Вопрос: Что такое binary search и где он может пригодиться во frontend?

**Короткий ответ**

Binary search ищет значение в отсортированном массиве, каждый шаг отбрасывая половину диапазона. Сложность поиска —
O(log n), но данные должны быть отсортированы и доступны по индексу.

**Полный ответ**

Binary search ищет значение в отсортированном массиве, каждый шаг отбрасывая половину диапазона. Сложность поиска —
`O(log n)`, но данные должны быть отсортированы и доступны по индексу.

Во frontend бинарный поиск редко нужен для обычных UI-списков. Он полезнее в больших данных: поиск позиции в timeline,
виртуальный скролл с переменной высотой строк, графики, диапазоны дат, nearest point на canvas.

```ts
function findFirstGreaterOrEqual(values: readonly number[], target: number): number {
  let left = 0;
  let right = values.length;

  while (left < right) {
    const middle = Math.floor((left + right) / 2);

    if (values[middle] < target) {
      left = middle + 1;
    } else {
      right = middle;
    }
  }

  return left;
}
```





#### Вопрос: Чем quicksort, mergesort и heapsort отличаются на уровне идеи?

**Короткий ответ**

Quicksort выбирает pivot и делит данные на элементы меньше и больше pivot. В среднем он быстрый, но плохой выбор pivot
может привести к O(n²).

**Полный ответ**

Quicksort выбирает pivot и делит данные на элементы меньше и больше pivot. В среднем он быстрый, но плохой выбор pivot
может привести к `O(n²)`.

Mergesort делит массив пополам, сортирует части и сливает их. Он стабильно дает `O(n log n)`, но обычно требует
дополнительную память `O(n)`.

Heapsort строит heap и последовательно извлекает минимум или максимум. Он работает за `O(n log n)` и может обходиться
малой дополнительной памятью, но часто менее дружелюбен к cache locality и стабильности порядка.

В прикладном JS/TS-коде обычно используют встроенный `toSorted()` или `sort()`, а на собеседовании важно понимать
trade-offs и уметь написать корректный comparator.





#### Вопрос: Что такое heap и как он связан с priority queue?

**Короткий ответ**

Heap — деревообразная структура, где родитель имеет приоритет не ниже или не выше детей. Binary heap обычно хранится в
массиве: для индекса i дети находятся около 2 i + 1 и 2 i + 2.

**Полный ответ**

Heap — деревообразная структура, где родитель имеет приоритет не ниже или не выше детей. Binary heap обычно хранится в
массиве: для индекса `i` дети находятся около `2 * i + 1` и `2 * i + 2`.

Priority queue часто реализуют через heap: вставка и извлечение приоритетного элемента стоят `O(log n)`, чтение верхнего
элемента — `O(1)`.

Во frontend это может пригодиться для планировщика фоновых задач, графовых алгоритмов или обработки большого потока
событий по приоритетам. Для обычного UI-состояния heap обычно избыточен.





#### Вопрос: Что такое memoization и чем она отличается от caching?

**Короткий ответ**

Memoization — частный случай кеширования результата чистой функции по ее аргументам. Если вход тот же, можно вернуть
сохраненный результат без повторного вычисления.

**Полный ответ**

Memoization — частный случай кеширования результата чистой функции по ее аргументам. Если вход тот же, можно вернуть
сохраненный результат без повторного вычисления.

Caching шире: можно кешировать HTTP-ответы, изображения, compiled templates, computed state или expensive selectors. У
кеша появляются вопросы invalidation, TTL, размера и прав доступа.

Во frontend memoization встречается в Angular `computed()`, selector-ах state management, pure pipes и ручных индексах
через `Map`. Она полезна только если вычисление дорогое или часто повторяется на тех же входах.





#### Вопрос: Что такое dynamic programming на базовом уровне?

**Короткий ответ**

Dynamic programming разбивает задачу на пересекающиеся подзадачи и переиспользует их результаты. Обычно это memoization
сверху вниз или табличное вычисление снизу вверх.

**Полный ответ**

Dynamic programming разбивает задачу на пересекающиеся подзадачи и переиспользует их результаты. Обычно это memoization
сверху вниз или табличное вычисление снизу вверх.

Для Angular-разработчика важнее не заучивать академические задачи, а узнавать паттерн: если одно и то же производное
значение пересчитывается много раз, можно сохранить результат по ключу.

```ts
const priceBySku = new Map<string, number>();

function getPrice(sku: string): number {
  const cachedPrice = priceBySku.get(sku);

  if (cachedPrice !== undefined) {
    return cachedPrice;
  }

  const price = calculatePrice(sku);
  priceBySku.set(sku, price);

  return price;
}
```





#### Вопрос: Что такое CPU cache и locality of reference?

**Короткий ответ**

CPU cache — быстрая память рядом с процессором. Она отличается от browser cache и HTTP cache: CPU cache ускоряет доступ
к данным в памяти во время вычислений, а browser/HTTP cache уменьшает сетевые загрузки и чтение ресурсов.

**Полный ответ**

CPU cache — быстрая память рядом с процессором. Она отличается от browser cache и HTTP cache: CPU cache ускоряет доступ
к данным в памяти во время вычислений, а browser/HTTP cache уменьшает сетевые загрузки и чтение ресурсов.

Locality of reference означает, что программа часто обращается к близким участкам памяти или повторно использует недавно
прочитанные данные. Последовательный обход массива обычно дружелюбнее к CPU cache, чем хаотичные переходы по ссылкам.

Во frontend это редко оптимизируют руками. Но понимание помогает объяснить, почему большие CPU-bound вычисления лучше
измерять, упрощать алгоритмически, переносить в Web Worker или выполнять на сервере.



### Практические задачи по алгоритмам и design primitives



#### Вопрос: Как спроектировать debounce и throttle как reusable utility?

**Короткий ответ**

Debounce откладывает вызов до паузы в событиях, throttle ограничивает частоту вызовов. Для reusable utility важно
заранее определить API: leading/trailing вызовы, cancel, flush, сохранение this, аргументы последнего вызова и тип
возвращаемого значения.

**Полный ответ**

Debounce откладывает вызов до паузы в событиях, throttle ограничивает частоту вызовов. Для reusable utility важно
заранее определить API: leading/trailing вызовы, `cancel`, `flush`, сохранение `this`, аргументы последнего вызова и тип
возвращаемого значения.

На frontend-интервью полезно привести примеры:

- debounce - search input, autosave, resize после остановки;
- throttle - scroll/drag metrics, pointer move, progress updates.

Частая ошибка - использовать одну технику для всех сценариев. Для network search debounce обычно лучше, а для scroll
position чаще нужен throttle или `requestAnimationFrame`.





#### Вопрос: Реализуйте LRU cache.

**Короткий ответ**

Что проверяет: Map, порядок доступа, сложность O(1).

**Полный ответ**

**Что проверяет:** `Map`, порядок доступа, сложность `O(1)`.

В JavaScript `Map` хранит порядок вставки, поэтому простую LRU cache можно реализовать через удаление и повторную
вставку ключа при чтении.

```ts
class LruCache<TKey, TValue> {
  private readonly values = new Map<TKey, TValue>();

  constructor(private readonly capacity: number) {}

  get(key: TKey): TValue | undefined {
    if (!this.values.has(key)) {
      return undefined;
    }

    const value = this.values.get(key);

    if (value === undefined) {
      return undefined;
    }

    this.values.delete(key);
    this.values.set(key, value);

    return value;
  }

  set(key: TKey, value: TValue): void {
    if (this.values.has(key)) {
      this.values.delete(key);
    }

    this.values.set(key, value);

    if (this.values.size > this.capacity) {
      const oldestKey = this.values.keys().next().value;

      if (oldestKey !== undefined) {
        this.values.delete(oldestKey);
      }
    }
  }
}
```

На интервью стоит обсудить, почему `undefined` как значение усложняет `get`, как обработать `capacity <= 0`, и когда
нужен doubly linked list вместо reliance on `Map` order.





#### Вопрос: Что такое пользовательский тип данных

**Короткий ответ**

Пользовательский тип описывает доменную модель приложения с помощью type, interface, класса, enum или их комбинации.

**Полный ответ**

Пользовательский тип описывает доменную модель приложения с помощью `type`, `interface`, класса, enum или их комбинации.

```ts
type UserId = string;

interface User {
  readonly id: UserId;
  readonly name: string;
  readonly role: 'admin' | 'user';
}
```

Хороший тип выражает ограничения предметной области и делает недопустимые состояния трудными для представления. Для
вариантов состояния удобно использовать discriminated union, а для runtime-поведения и DI — классы.





#### Вопрос: Что такое Union Type (тип объединения) и для чего используется?

**Короткий ответ**

Union type означает, что значение может принадлежать одному из нескольких типов:

**Полный ответ**

Union type означает, что значение может принадлежать одному из нескольких типов:

```ts
type RequestState<T> =
  {status: 'idle'} | {status: 'loading'} | {status: 'success'; data: T} | {status: 'error'; error: string};
```

Перед использованием специфичных свойств union нужно сузить тип через `typeof`, `instanceof`, оператор `in`, проверку
discriminant-поля или type guard.

Discriminated union часто лучше набора независимых boolean-флагов: он не позволяет одновременно представить
несовместимые состояния, например `loading` и `success`.





#### Вопрос: Что такое декоратор и какие виды декораторов вы знаете?

**Короткий ответ**

Декоратор — способ добавления метаданных к объявлению класса. Это специальный вид объявления, который может быть
присоединен к объявлению класса, методу, методу доступа, свойству или параметру.

**Полный ответ**

Декоратор — способ добавления метаданных к объявлению класса. Это специальный вид объявления, который может быть
присоединен к объявлению класса, методу, методу доступа, свойству или параметру.

Декораторы используют форму @expression, где expression - функция, которая будет вызываться во время выполнения с
информацией о декорированном объявлении.

И, чтобы написать собственный декоратор, нам нужно сделать его factory и определить тип:

- ClassDecorator
- PropertyDecorator
- MethodDecorator
- ParameterDecorator

**Декоратор класса**

Вызывается перед объявлением класса, применяется к конструктору класса и может использоваться для наблюдения, изменения
или замены определения класса. Expression декоратора класса будет вызываться как функция во время выполнения, при этом
конструктор декорированного класса является единственным аргументом. Если класс декоратора возвращает значение, он
заменит объявление класса вернувшимся значением.

```ts
export function logClass(target: Function) {
  // Сохранение ссылки на оригинальный конструктор
  const original = target;

  // Функция генерирует экземпляры класса
  function construct(constructor, args) {
    const c: any = function () {
      return constructor.apply(this, args);
    };
    c.prototype = constructor.prototype;
    return new c();
  }

  // Определение поведения нового конструктора
  const f: any = function (...args) {
    console.log(`New: ${original['name']} is created`);
    //New: Employee создан
    return construct(original, args);
  };

  // Копирование прототипа, чтобы оператор intanceof работал
  f.prototype = original.prototype;

  // Возвращает новый конструктор, переписывающий оригинальный
  return f;
}

@logClass
class Employee {}

let emp = new Employee();
console.log('emp instanceof Employee');
//emp instanceof Employee
console.log(emp instanceof Employee);
//true
```

**Декоратор свойства**

Объявляется непосредственно перед объявлением метода. Будет вызываться как функция во время выполнения со следующими
двумя аргументами:

- target - прототип текущего объекта, т.е. если Employee является объектом, Employee.prototype
- propertyKey - название свойства

```ts
function logParameter(target: Object, propertyName: string) {
  // Значение свойства
  let _val = this[propertyName];

  // Геттер свойства
  const getter = () => {
    console.log(`Get: ${propertyName} => ${_val}`);
    return _val;
  };

  // Сеттер свойства
  const setter = (newVal) => {
    console.log(`Set: ${propertyName} => ${newVal}`);
    _val = newVal;
  };

  // Удаление свойства
  if (delete this[propertyName]) {
    // Создает новое свойство с геттером и сеттером
    Object.defineProperty(target, propertyName, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  }
}

class Employee {
  @logParameter
  name: string;
}

const emp = new Employee();
emp.name = 'Mohan Ram';
console.log(emp.name);

// Set: name => Mohan Ram
// Get: name => Mohan Ram
// Mohan Ram
```

**Декоратор метода**

Объявляется непосредственно перед объявлением метода. Будет вызываться как функция во время выполнения со следующими
двумя аргументами:

- target - прототип текущего объекта, т.е. если Employee является объектом, Employee.prototype
- propertyName - название свойства
- descriptor - дескриптор свойства метода т.е. - Object.getOwnPropertyDescriptor (Employee.prototype, propertyName)

  ```ts
  export function logMethod(
    target: Object,
    propertyName: string,
    propertyDescriptor: PropertyDescriptor,
  ): PropertyDescriptor {
    const method = propertyDescriptor.value;

    propertyDescriptor.value = function (...args: any[]) {
      // Конвертация списка аргументов greet в строку
      const params = args.map((a) => JSON.stringify(a)).join();

      // Вызов greet() и получение вернувшегося значения
      const result = method.apply(this, args);

      // Конвертация результата в строку
      const r = JSON.stringify(result);

      // Отображение в консоли деталей вызова
      console.log(`Call: ${propertyName}(${params}) => ${r}`);

      // Возвращение результата вызова
      return result;
    };
    return propertyDescriptor;
  }

  class Employee {
    constructor(
      private firstName: string,
      private lastName: string,
    ) {}

    @logMethod
    greet(message: string): string {
      return `${this.firstName} ${this.lastName} says: ${message}`;
    }
  }

  const emp = new Employee('Mohan Ram', 'Ratnakumar');
  emp.greet('hello');
  //Call: greet("hello") => "Mohan Ram Ratnakumar says: hello"
  ```

**Декоратор параметра**

Объявляется непосредственно перед объявлением метода. Будет вызываться как функция во время выполнения со следующими
двумя аргументами:

- target - прототип текущего объекта, т.е. если Employee является объектом, Employee.prototype
- propertyKey - название свойства
- index - индекс параметра в массиве аргументов

```ts
function logParameter(target: Object, propertyName: string, index: number) {
  // Генерация метаданных для соответствующего метода
  // для сохранения позиции декорированных параметров
  const metadataKey = `log_${propertyName}_parameters`;

  if (Array.isArray(target[metadataKey])) {
    target[metadataKey].push(index);
  } else {
    target[metadataKey] = [index];
  }
}

class Employee {
  greet(@logParameter message: string): void {
    console.log(`hello ${message}`);
  }
}
const emp = new Employee();
emp.greet('world');
```





#### Вопрос: Зачем нам нужны определения типов, где есть JavaScript c динамической типизацией?

**Короткий ответ**

Динамическая типизация удобна во время выполнения, но многие ошибки можно обнаружить раньше:

**Полный ответ**

Динамическая типизация удобна во время выполнения, но многие ошибки можно обнаружить раньше:

- неправильное имя свойства;
- передача аргумента неверного типа;
- забытая обработка `null`;
- несовместимое изменение публичного API.

TypeScript добавляет статический анализ, автодополнение, безопасный рефакторинг и явные контракты между частями
приложения. Типы не заменяют runtime-валидацию: данные от API, пользователя и внешних систем все равно считаются
недоверенными и должны проверяться.

После компиляции большинство типов удаляется, а браузер выполняет обычный JavaScript.





#### Вопрос: Поддерживает ли TypeScript перегрузку методов?

**Короткий ответ**

Да. TypeScript поддерживает несколько сигнатур перегрузки и одну общую реализацию.

**Полный ответ**

Да. TypeScript поддерживает несколько сигнатур перегрузки и одну общую реализацию.

```ts
function format(value: number): string;
function format(value: Date): string;
function format(value: number | Date): string {
  return value instanceof Date ? value.toISOString() : value.toFixed(2);
}
```

Сигнатура реализации не видна вызывающему коду и должна быть совместима со всеми перегрузками. В runtime существует
только одна JavaScript-функция, поэтому различение вариантов выполняет сама реализация.

Если union-параметр дает такой же понятный API, обычно он проще перегрузок.





#### Вопрос: Возможна ли перегрузка конструктора в TypeScript?

**Короткий ответ**

Да, с тем же ограничением: можно описать несколько сигнатур, но реализация конструктора остается одна.

**Полный ответ**

Да, с тем же ограничением: можно описать несколько сигнатур, но реализация конструктора остается одна.

```ts
class Point {
  readonly x: number;
  readonly y: number;

  constructor();
  constructor(x: number, y: number);
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}
```

Нельзя написать несколько тел `constructor`, как в некоторых языках. При большом числе вариантов часто понятнее
использовать именованные фабричные методы.





#### Вопрос: Поддерживает ли TypeScript перегрузку методов (конструкторов)?

**Короткий ответ**

TypeScript поддерживает перегрузку функций, методов и конструкторов на уровне типов. Сначала объявляются доступные
вызывающему коду сигнатуры, затем одна совместимая реализация.

**Полный ответ**

TypeScript поддерживает перегрузку функций, методов и конструкторов на уровне типов. Сначала объявляются доступные
вызывающему коду сигнатуры, затем одна совместимая реализация.

В скомпилированном JavaScript остается одна функция или один конструктор. Поэтому перегрузка не выбирает разные
реализации автоматически: код должен сам сузить аргументы.

Перегрузки нужны, когда разные наборы аргументов дают разные, точно связанные возвращаемые типы. Для простых случаев
предпочтительнее union types, optional-параметры или объект параметров.



### Продвинутый TypeScript



#### Вопрос: Чем type отличается от interface и что такое intersection type?

**Короткий ответ**

interface описывает форму объекта, поддерживает declaration merging и удобно расширяется через extends. type может
описывать не только объект, но и union, tuple, primitive alias, mapped или conditional type.

**Полный ответ**

`interface` описывает форму объекта, поддерживает declaration merging и удобно расширяется через `extends`. `type` может
описывать не только объект, но и union, tuple, primitive alias, mapped или conditional type.

```ts
interface Identifiable {
  readonly id: string;
}

type Timestamped = {
  readonly createdAt: Date;
};

type Entity = Identifiable & Timestamped;
```

Intersection `A & B` требует одновременно выполнить оба контракта. Для публичных объектных контрактов часто выбирают
`interface`, для композиции и type-level вычислений — `type`.





#### Вопрос: Как типизировать состояние, API response и конфигурацию Angular-компонента?

**Короткий ответ**

Для состояний удобен discriminated union:

**Полный ответ**

Для состояний удобен discriminated union:

```ts
type LoadState<T> =
  {status: 'idle'} | {status: 'loading'} | {status: 'success'; data: T} | {status: 'error'; error: string};
```

API DTO отделяют от доменной модели и преобразуют на data-access границе. Inputs типизируют максимально узко:

```ts
readonly user = input.required<Pick<User, "id" | "name">>();
```

Конфигурации проверяют через `satisfies`, readonly properties и explicit defaults. Generic-компонент оправдан, когда тип
элемента должен проходить через inputs, templates и outputs без потери связи.





#### Вопрос: Как типами описать дерево в TypeScript?

**Короткий ответ**

Для дерева обычно описывают узел с payload и дочерними узлами. Если структура readonly для потребителей, это стоит
отразить в типе:

**Полный ответ**

Для дерева обычно описывают узел с payload и дочерними узлами. Если структура readonly для потребителей, это стоит
отразить в типе:

```ts
interface TreeNode<T> {
  readonly value: T;
  readonly children: ReadonlyArray<TreeNode<T>>;
}
```

Такой тип подходит для меню, router-like конфигурации, дерева категорий или результата парсинга. Если у узлов бывают
разные виды, лучше использовать discriminated union.

```ts
type FormNode =
  | {readonly kind: 'group'; readonly controls: ReadonlyArray<FormNode>}
  | {readonly kind: 'field'; readonly name: string; readonly value: string};
```

Discriminant `kind` делает обход безопаснее: TypeScript сузит тип в `switch` и подскажет доступные поля.





#### Вопрос: Зачем использовать readonly-типы для структур данных?

**Короткий ответ**

readonly и ReadonlyArray показывают, что вызывающий код не должен менять структуру напрямую. Это особенно полезно для
Angular inputs, signals, store state и derived data.

**Полный ответ**

`readonly` и `ReadonlyArray<T>` показывают, что вызывающий код не должен менять структуру напрямую. Это особенно полезно
для Angular inputs, signals, store state и derived data.

```ts
interface TableState {
  readonly rows: ReadonlyArray<Row>;
  readonly selectedIds: ReadonlySet<string>;
}
```

Readonly-тип не делает данные глубоко immutable в runtime, но улучшает контракт и снижает риск случайной мутации.
Обновление состояния лучше выражать созданием новой структуры:

```ts
const nextRows = state.rows.toSorted((first, second) => first.name.localeCompare(second.name));
```





#### Вопрос: Что такое generics, generic constraints и keyof?

**Короткий ответ**

Generic позволяет сохранить связь между входными и выходными типами:

**Полный ответ**

Generic позволяет сохранить связь между входными и выходными типами:

```ts
function getProperty<T extends object, K extends keyof T>(value: T, key: K): T[K] {
  return value[key];
}
```

`T extends object` — constraint, ограничивающий допустимые типы. `keyof T` создает union ключей объекта, а `T[K]`
получает тип конкретного свойства.

Generics нужны для reusable API, но не должны превращать простой код в сложную type-level программу.





#### Вопрос: Что такое mapped, conditional types и infer?

**Короткий ответ**

Mapped type преобразует свойства существующего типа:

**Полный ответ**

Mapped type преобразует свойства существующего типа:

```ts
type ReadonlyState<T> = {
  readonly [K in keyof T]: T[K];
};
```

Conditional type выбирает тип по условию:

```ts
type ApiResult<T> = T extends Error ? {error: T} : {data: T};
```

`infer` извлекает часть типа внутри conditional type:

```ts
type AwaitedValue<T> = T extends Promise<infer Value> ? Value : T;
```

В прикладном коде сначала используют стандартные utility types: `Pick`, `Omit`, `Partial`, `Required`, `Record`,
`Parameters`, `ReturnType`, `Awaited`.





#### Вопрос: Чем satisfies отличается от as?

**Короткий ответ**

satisfies проверяет совместимость значения с типом, сохраняя максимально точный выведенный тип:

**Полный ответ**

`satisfies` проверяет совместимость значения с типом, сохраняя максимально точный выведенный тип:

```ts
const routes = {
  home: '/',
  profile: '/profile',
} satisfies Record<string, `/${string}`>;
```

`as` утверждает тип и может скрыть ошибку:

```ts
const config = value as AppConfig;
```

Для конфигураций, route maps и provider options предпочтителен `satisfies`. Type assertion используют только после
реального runtime narrowing или на узкой границе interop.





#### Вопрос: Почему unknown безопаснее any и как писать type guards?

**Короткий ответ**

any отключает проверку типов и распространяет небезопасность по коду. unknown требует сначала доказать форму значения.

**Полный ответ**

`any` отключает проверку типов и распространяет небезопасность по коду. `unknown` требует сначала доказать форму
значения.

```ts
function isUser(value: unknown): value is User {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  return 'id' in value && 'name' in value;
}
```

Type guard с предикатом `value is User` сужает тип. Данные API нужно валидировать в runtime: TypeScript не проверяет
JSON после загрузки.





#### Вопрос: Как типизировать граф или dependency graph?

**Короткий ответ**

Для adjacency list удобно использовать ReadonlyMap или Record, если ключи строковые и данные приходят из JSON.

**Полный ответ**

Для adjacency list удобно использовать `ReadonlyMap` или `Record`, если ключи строковые и данные приходят из JSON.

```ts
type ProjectName = string;

type DependencyGraph = ReadonlyMap<ProjectName, ReadonlyArray<ProjectName>>;
```

Если нужно хранить дополнительные данные о ребре, вводят отдельный тип:

```ts
interface DependencyEdge {
  readonly from: ProjectName;
  readonly to: ProjectName;
  readonly type: 'static' | 'dynamic';
}
```

В frontend такие типы встречаются в визуализации зависимостей, build tooling, state machines и flows навигации. Типы
фиксируют форму данных, но cycle detection и валидация внешнего JSON все равно остаются runtime-логикой.





#### Вопрос: Когда generic data structure оправдана?

**Короткий ответ**

Generic-структура оправдана, когда один алгоритм действительно работает с разными типами значений и сохраняет связь
между входом и выходом.

**Полный ответ**

Generic-структура оправдана, когда один алгоритм действительно работает с разными типами значений и сохраняет связь
между входом и выходом.

```ts
interface Queue<T> {
  enqueue(value: T): void;
  dequeue(): T | undefined;
  readonly size: number;
}
```

Если структура нужна только для одного доменного типа, отдельный generic может быть лишним. Например,
`NotificationQueue` с явными полями и правилами приоритета часто понятнее универсальной `Queue<T>` плюс набор внешних
условий.



### TypeScript и runtime-контракты



#### Вопрос: Чем generic constraints отличаются от intersection types?

**Короткий ответ**

T extends Constraint ограничивает допустимые типы для generic и разрешает обращаться к полям constraint внутри функции.
T & Constraint создает новый intersection type, который требует свойства обеих частей у итогового значения.

**Полный ответ**

`T extends Constraint` ограничивает допустимые типы для generic и разрешает обращаться к полям constraint внутри
функции. `T & Constraint` создает новый intersection type, который требует свойства обеих частей у итогового значения.

```ts
function byId<T extends {readonly id: string}>(items: ReadonlyArray<T>): ReadonlyMap<string, T> {
  return new Map(items.map((item) => [item.id, item]));
}
```

Constraint говорит: "принимаю любой тип, но у него должен быть `id`". Intersection чаще используют, когда нужно описать
комбинированную форму данных. На интервью важно не заменять constraint на широкое assertion.





#### Вопрос: Как типизировать тестовые double без any?

**Короткий ответ**

Для stub обычно достаточно Pick или satisfies, чтобы описать только используемую часть зависимости.

**Полный ответ**

Для stub обычно достаточно `Pick` или `satisfies`, чтобы описать только используемую часть зависимости.

```ts
interface UserApi {
  loadUser(id: string): Promise<User>;
  saveUser(user: User): Promise<void>;
}

const userApiStub = {
  loadUser: async () => ({id: '1', name: 'Ada'}),
} satisfies Pick<UserApi, 'loadUser'>;
```

Так тест не зависит от лишних методов и не теряет типовую проверку. Если mock framework возвращает широкие типы, лучше
изолировать unsafe interop в маленьком helper и не распространять `any` по тестам.





#### Вопрос: Когда нужны declaration files .d.ts?

**Короткий ответ**

.d.ts описывает типы для JavaScript-кода, внешнего global API, CSS modules, assets или пакета без собственных типов.
Файл не содержит runtime-кода и не должен обещать то, чего нет в реализации.

**Полный ответ**

`.d.ts` описывает типы для JavaScript-кода, внешнего global API, CSS modules, assets или пакета без собственных типов.
Файл не содержит runtime-кода и не должен обещать то, чего нет в реализации.

```ts
declare module '*.module.css' {
  const classes: Readonly<Record<string, string>>;
  export default classes;
}
```

В библиотеке declaration files являются частью публичного API. Их нужно проверять вместе с build и не использовать для
скрытия реальных несовпадений между TypeScript и runtime.





#### Вопрос: Почему generic type parameter не дает runtime safety?

**Короткий ответ**

Generic существует только на этапе компиляции и стирается в JavaScript. Если данные приходят из API, T не проверяет
форму ответа в runtime.

**Полный ответ**

Generic существует только на этапе компиляции и стирается в JavaScript. Если данные приходят из API, `T` не проверяет
форму ответа в runtime.

```ts
async function loadJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  return response.json() as Promise<T>;
}
```

Такой helper удобен, но он доверяет внешним данным. Для важных контрактов нужна runtime validation: schema, hand-written
guard или adapter на границе API. Хороший ответ разделяет compile-time типы и проверку данных, которые пришли извне.

**Follow-up вопросы:**

- Что происходит с generic после компиляции?
- Когда достаточно generic, а когда нужна schema validation?
- Почему `as T` может создать ложное чувство безопасности?
