---
layout: ../../layouts/Layout.astro
title: JavaScript
description: Типы, функции, память, Promise, Event Loop, DOM, fetch, browser runtime и практические JavaScript-задачи
category: Frontend
kind: questions
order: 70
---

## JavaScript

### Значения, ссылки и память

<details>
<summary>Что такое shallow copy и deep copy?</summary><br>
<table><tr><td>

Shallow copy создает новый верхний объект, но вложенные объекты остаются общими. Deep copy рекурсивно создает
независимые вложенные значения. Полное копирование может быть дорогим и не всегда имеет смысл для immutable updates.

</td></tr></table>

</details>

<details>
<summary>Чем примитивы отличаются от объектов?</summary><br>
<table><tr><td>

Примитивы — `string`, `number`, `bigint`, `boolean`, `symbol`, `undefined` и `null` — являются неизменяемыми значениями.
Объекты имеют identity, свойства и могут изменяться. Переменная с объектом хранит значение, позволяющее обратиться к
этому объекту.

</td></tr></table>

</details>

<details>
<summary>Что значит "передача по значению" в JavaScript?</summary><br>
<table><tr><td>

При вызове функции параметр получает копию значения аргумента. Для примитива копируется сам примитив, для объекта —
значение ссылки на объект. Переназначение параметра не меняет внешнюю переменную.

</td></tr></table>

</details>

<details>
<summary>Передаются ли объекты по ссылке в JavaScript?</summary><br>
<table><tr><td>

Точнее говорить: объекты тоже передаются по значению, но этим значением является ссылка на объект. Функция и вызывающий
код получают две копии ссылки на один объект. Поэтому мутация объекта видна снаружи, а переназначение параметра — нет.

</td></tr></table>

</details>

<details>
<summary>Чем отличается ссылка на объект от самого объекта?</summary><br>
<table><tr><td>

Объект содержит состояние в памяти, а ссылка позволяет найти конкретный объект. Несколько переменных могут содержать
ссылки на один объект. Изменение через любую из них будет наблюдаться через остальные.

</td></tr></table>

</details>

<details>
<summary>Почему изменение свойства объекта внутри функции видно снаружи?</summary><br>
<table><tr><td>

Скопированная ссылка параметра указывает на тот же объект, что и внешняя переменная. Запись свойства меняет этот общий
объект. Новый объект при этом не создается.

</td></tr></table>

</details>

<details>
<summary>Почему переназначение параметра внутри функции не меняет внешнюю переменную?</summary><br>
<table><tr><td>

Параметр — локальная переменная функции. Присваивание заменяет только локальную копию ссылки, а внешняя переменная
продолжает указывать на прежний объект.

```js
function changeUser(user) {
  user.name = 'Alex';
}

function replaceUser(user) {
  user = {name: 'Bob'};
}

const user = {name: 'Max'};

changeUser(user);
console.log(user.name); // Alex

replaceUser(user);
console.log(user.name); // Alex
```

</td></tr></table>

</details>

<details>
<summary>Как работает сравнение объектов через <code>===</code>?</summary><br>
<table><tr><td>

`===` для объектов сравнивает identity: указывают ли значения на один объект. Два отдельных объекта с одинаковыми
свойствами не равны. Для структурного сравнения нужна отдельная функция с правилами для конкретного domain.

</td></tr></table>

</details>

<details>
<summary>Чем отличаются spread, <code>Object.assign</code> и <code>structuredClone</code>?</summary><br>
<table><tr><td>

Spread и `Object.assign` создают shallow copy enumerable own properties; первый удобен декларативно, второй умеет писать
в заданный target. `structuredClone` выполняет deep clone поддерживаемых structured-clone типов и сохраняет cycles.
Функции, DOM nodes и некоторые class semantics он не копирует.

</td></tr></table>

</details>

<details>
<summary>Какие ограничения есть у <code>JSON.parse(JSON.stringify(...))</code> для deep copy?</summary><br>
<table><tr><td>

Метод теряет `undefined`, functions, symbols, prototype и типы вроде `Date`, `Map`, `Set`, а `BigInt` вызывает ошибку.
Циклические ссылки также не поддерживаются. Он подходит только для заведомо JSON-совместимых данных.

</td></tr></table>

</details>

<details>
<summary>Почему стоимость <code>JSON.parse</code> и <code>JSON.stringify</code> важна?</summary><br>
<table><tr><td>

`JSON.parse()` и `JSON.stringify()` выполняют синхронную работу и могут блокировать main thread на больших payload.
Большой ответ API может быть быстрым по сети, но затем зависнуть на parsing, нормализации и rendering.

Практические решения: уменьшать payload, использовать pagination, отдавать только нужные поля, переносить тяжелую
обработку в Web Worker, кешировать уже нормализованные данные или выбирать streaming/binary format там, где это
действительно оправдано.

</td></tr></table>

</details>

### Типы, функции и область видимости

<details>
<summary>Что такое область видимости в JS?</summary><br>
<table><tr><td>

Область видимости в JavaScript — это правило, которое определяет, где переменная, функция или класс доступны в коде.

```js
function test() {
  const name = 'Max';

  console.log(name); // доступна
}

console.log(name); // ошибка: name не видна снаружи
```

Основные виды scope в JS

1. Global scope

Доступно везде в файле/программе:

```js
const appName = 'My App';

function log() {
  console.log(appName);
}
```

2. Function scope

var виден внутри всей функции:

```js
function test() {
  var x = 1;

  if (true) {
    var y = 2;
  }

  console.log(y); // 2
}
```

3. Block scope

let и const видны только внутри блока {}:

```js
if (true) {
  const x = 1;
  let y = 2;
}

console.log(x); // ошибка
console.log(y); // ошибка
```

4. Module scope

В ES-модулях переменные не попадают в global scope:

```js
const value = 123;

export {value};
```

</td></tr></table>

</details>

<details>
<summary>Какие типы данных есть в JavaScript?</summary><br>
<table><tr><td>

В JavaScript есть семь примитивных типов: `string`, `number`, `bigint`, `boolean`, `undefined`, `symbol` и `null`.

Все остальные значения относятся к типу `object`: обычные объекты, массивы, функции, даты и коллекции. Примитивы
неизменяемы и сравниваются по значению, а переменные с объектами хранят ссылки.

```js
// Примитивные

string; // "hello"
number; // 123, 3.14, NaN, Infinity
bigint; // 123n
boolean; // true / false
undefined; // значение не задано
null; // пустое значение
symbol; // уникальный идентификатор

// Ссылочный тип

object; // {}, [], function, Date, Map, Set и т.д.
```

Важно:

```js
typeof null; // "object" — старая странность JS
typeof []; // "object"
typeof function () {}; // "function"
```

```js
typeof Symbol('id'); // "symbol"
```

![img.png](assets/data-types.png)

</td></tr></table>

</details>

<details>
<summary>В чем разница между call и apply, bind в JS?</summary><br>
<table><tr><td>

call и apply делают одно и то же: вызывают функцию с явно заданным this.

call

Аргументы передаются через запятую:

```js
function greet(city, age) {
  console.log(`${this.name}, ${city}, ${age}`);
}

const user = {name: 'Max'};

greet.call(user, 'Moscow', 32);
// Max, Moscow, 32

// fn.call(thisArg, arg1, arg2, arg3);
```

```js
function greet(city, age) {
  console.log(`${this.name}, ${city}, ${age}`);
}

const user = {name: 'Max'};

greet.apply(user, ['Moscow', 32]);
// Max, Moscow, 32
```

bind тоже работает с this, но не вызывает функцию сразу.

Он создает новую функцию, у которой this уже заранее привязан.

```js
function greet(city) {
  console.log(`${this.name} from ${city}`);
}

const user = {name: 'Max'};
```

call — вызывает сразу. apply — вызывает сразу, но аргументы массивом. bind — НЕ вызывает сразу

```js
const boundGreet = greet.bind(user);

boundGreet('Moscow');
// Max from Moscow
```

</td></tr></table>

</details>

<details>
<summary>В чем отличие нативных (Native) объектов от хост-объектов (Host objects)?</summary><br>
<table><tr><td>

**Нативные объекты** — часть спецификации языка. Они доступны нам вне зависимости от того, на каком клиенте исполняется
наш код. Примеры: Array, Date и Math. Полный список нативных объектов.

```js
var users = Array(); // Array — нативный объект
```

Встроенные (Built-in): Array, Date, Math, String, Promise, Object. Пользовательские: Объекты, создаваемые вами через new
Object(), литералы {} или классы. Контекстные: Объект globalThis (или window в браузере, global в Node.js), Math и JSON.

**Хост-объекты (Host objects)**

Это объекты, предоставляемые средой выполнения (окружением), в которой запущен JavaScript (браузер, сервер Node.js и
т.д.).

Они не являются частью самого языка, зависят от платформы и могут различаться.

В браузере: window, document, location, history, XMLHTTPRequest, fetch, элементы DOM, localStorage.

В Node.js: Объекты для работы с файловой системой (fs), процессами (process), операционной системой (os).

</td></tr></table>

</details>

### Массивы, объекты и даты

<details>
<summary>Что такое Object.fromEntries?</summary><br>
<table><tr><td>

`Object.fromEntries()` преобразует iterable пар `[key, value]` в объект. Это обратная операция к `Object.entries()`; ее
удобно сочетать с `map`, `filter`, `Map` и `URLSearchParams`.

```ts
const entries = [
  ['name', 'Max'],
  ['role', 'frontend'],
];

const user = Object.fromEntries(entries);
// { name: "Max", role: "frontend" }
```

Пример фильтрации свойств:

```ts
const params = {
  search: 'angular',
  page: 1,
  empty: undefined,
};

const cleaned = Object.fromEntries(Object.entries(params).filter(([, value]) => value !== undefined));

// { search: "angular", page: 1 }
```

</td></tr></table>

</details>

<details>
<summary>Что такое Array.prototype.reduce?</summary><br>
<table><tr><td>

`reduce()` последовательно сворачивает массив в одно значение. Результатом может быть число, объект, массив или `Map`.

```ts
const total = [10, 20, 30].reduce((sum, value) => sum + value, 0);
// 60
```

Initial value стоит задавать явно, особенно если массив может быть пустым:

```ts
const byYear = operations.reduce<Record<string, typeof operations>>((groups, operation) => {
  const year = operation.date.slice(0, 4);

  groups[year] ??= [];
  groups[year].push(operation);

  return groups;
}, {});
```

Не стоит использовать `reduce()`, если `map`, `filter`, `some`, `every` или `find` выражают намерение понятнее.

</td></tr></table>

</details>

<details>
<summary>Что такое sparse array?</summary><br>
<table><tr><td>

Sparse array, разреженный массив, содержит пустые слоты, в которых нет свойства с соответствующим индексом. Это не то же
самое, что явное значение `undefined`.

```ts
const sparse = [1, , 3];

0 in sparse; // true
1 in sparse; // false
sparse.length; // 3
```

Методы ведут себя по-разному: `map()` сохраняет пустой слот, `filter()`, `forEach()` и `flatMap()` не вызывают callback
для него, а spread и `Array.from()` превращают слот в `undefined`. В прикладном коде разреженных массивов обычно
избегают.

</td></tr></table>

</details>

<details>
<summary>Что такое ISO-формат даты?</summary><br>
<table><tr><td>

ISO 8601 - распространенный стандарт записи даты и времени. В JavaScript часто встречается формат
`YYYY-MM-DDTHH:mm:ss.sssZ`.

```ts
const iso = '2026-06-20T10:30:00.000Z';
```

`T` разделяет дату и время, а `Z` обозначает UTC. Важно не путать UTC с локальным временем пользователя.

</td></tr></table>

</details>

<details>
<summary>Что такое Object.groupBy и когда его использовать?</summary><br>
<table><tr><td>

`Object.groupBy()` группирует элементы iterable по ключу, который возвращает callback. Результат - объект, поэтому API
удобно использовать, когда ключи группировки можно представить строками или symbols.

```ts
const operations = [
  {date: '2017-07-31', amount: 5422},
  {date: '2018-03-31', amount: 5654},
  {date: '2017-08-31', amount: 5451},
];

const byYear = Object.groupBy(operations, ({date}) => date.slice(0, 4));

// {
//   "2017": [...],
//   "2018": [...]
// }
```

`Object.groupBy()` подходит, например, для группировки операций по году или задач по статусу. Возвращаемый объект имеет
`null` в качестве prototype, поэтому методы вроде `hasOwnProperty()` у него напрямую недоступны.

</td></tr></table>

</details>

<details>
<summary>Чем Object.groupBy отличается от Map.groupBy?</summary><br>
<table><tr><td>

`Object.groupBy()` возвращает объект и удобен для строковых ключей. `Map.groupBy()` возвращает `Map` и сохраняет ключ
без преобразования в строку: им может быть объект, дата или другое значение.

```ts
const active = {label: 'active'};
const archived = {label: 'archived'};

const users = [
  {name: 'Max', status: active},
  {name: 'Anna', status: archived},
  {name: 'Kate', status: active},
];

const grouped = Map.groupBy(users, ({status}) => status);

grouped.get(active);
// [{ name: "Max", ... }, { name: "Kate", ... }]
```

Выбор зависит от того, какие ключи нужны и будет ли результат дальше использоваться как объект или `Map`.

</td></tr></table>

</details>

<details>
<summary>Что делает Object.hasOwn?</summary><br>
<table><tr><td>

`Object.hasOwn(object, key)` проверяет, есть ли свойство непосредственно у объекта, а не в его prototype chain.

```ts
const user = Object.create({role: 'admin'}) as {
  name?: string;
  role: string;
};

user.name = 'Max';

Object.hasOwn(user, 'name'); // true
Object.hasOwn(user, 'role'); // false
'role' in user; // true
```

В отличие от `object.hasOwnProperty()`, статический метод работает с объектами без prototype и объектами,
переопределившими `hasOwnProperty`.

</td></tr></table>

</details>

<details>
<summary>Чем Object.hasOwn отличается от оператора in?</summary><br>
<table><tr><td>

`Object.hasOwn()` проверяет только собственное свойство. Оператор `in` ищет ключ и в самом объекте, и во всей prototype
chain.

`Object.hasOwn()` подходит для проверки входных данных и словарей. `in` полезен, когда наличие унаследованного свойства
тоже является частью контракта, а в TypeScript еще используется для narrowing union types.

</td></tr></table>

</details>

<details>
<summary>Чем Object.entries отличается от Object.fromEntries?</summary><br>
<table><tr><td>

`Object.entries()` превращает собственные enumerable string-keyed свойства объекта в массив пар `[key, value]`.
`Object.fromEntries()` выполняет обратное преобразование.

```ts
const user = {name: 'Max', role: 'frontend'};
const entries = Object.entries(user);
const copy = Object.fromEntries(entries);
```

Symbols не попадают в `Object.entries()`.

</td></tr></table>

</details>

<details>
<summary>Что возвращает Object.keys и в каком порядке?</summary><br>
<table><tr><td>

`Object.keys()` возвращает массив собственных enumerable строковых ключей. Symbol-ключи в результат не входят.

Integer-like ключи идут по возрастанию, остальные строковые ключи - в порядке добавления:

```ts
const value = {10: 'ten', 2: 'two', name: 'Max'};

Object.keys(value); // ["2", "10", "name"]
```

Порядок определен спецификацией, но бизнес-логику сортировки лучше выражать явно, а не связывать со способом хранения
объекта.

</td></tr></table>

</details>

<details>
<summary>Чем flat отличается от flatMap?</summary><br>
<table><tr><td>

`flat(depth)` создает новый массив, раскрывая вложенные массивы на указанную глубину. `flatMap(callback)` сначала
преобразует каждый элемент, затем раскрывает результат на один уровень.

```ts
const nested = [[1, 2], [3]];
nested.flat(); // [1, 2, 3]

const users = [
  {name: 'Max', roles: ['admin', 'editor']},
  {name: 'Anna', roles: ['viewer']},
];

const roles = users.flatMap(({roles}) => roles);
// ["admin", "editor", "viewer"]
```

</td></tr></table>

</details>

<details>
<summary>Когда использовать flatMap вместо map().flat()?</summary><br>
<table><tr><td>

`flatMap()` короче выражает преобразование, при котором один входной элемент дает ноль, один или несколько выходных
элементов.

```ts
const values = [1, -1, 2];
const positive = values.flatMap((value) => (value > 0 ? [value] : []));
// [1, 2]
```

`flatMap()` раскрывает только один уровень. Если нужна другая глубина или преобразование и flatten являются отдельными
шагами, понятнее использовать `map().flat(depth)`.

</td></tr></table>

</details>

<details>
<summary>Чем toSorted отличается от sort?</summary><br>
<table><tr><td>

`sort()` сортирует массив на месте, а `toSorted()` возвращает новый массив. `toSorted()` удобнее для immutable state,
Angular signals и Redux-подобных подходов.

```ts
const numbers = [10, 2, 30];
const sorted = numbers.toSorted((first, second) => first - second);

console.log(numbers); // [10, 2, 30]
console.log(sorted); // [2, 10, 30]
```

`sort()` изменяет исходный массив:

```ts
const numbers = [10, 2, 30];

numbers.sort((first, second) => first - second);

console.log(numbers); // [2, 10, 30]
```

Для чисел нужен comparator, иначе значения сортируются как строки.

</td></tr></table>

</details>

<details>
<summary>Чем reverse отличается от toReversed?</summary><br>
<table><tr><td>

`reverse()` меняет порядок элементов исходного массива. `toReversed()` возвращает новый массив и не мутирует источник.

```ts
const source = [1, 2, 3];
const reversed = source.toReversed();

console.log(source); // [1, 2, 3]
console.log(reversed); // [3, 2, 1]
```

</td></tr></table>

</details>

<details>
<summary>Чем splice отличается от toSpliced?</summary><br>
<table><tr><td>

`splice()` изменяет исходный массив и возвращает удаленные элементы. `toSpliced()` возвращает новый массив с примененным
изменением.

```ts
const source = ['a', 'b', 'c'];
const updated = source.toSpliced(1, 1, 'x');

console.log(source); // ["a", "b", "c"]
console.log(updated); // ["a", "x", "c"]
```

</td></tr></table>

</details>

<details>
<summary>Что делает array.with?</summary><br>
<table><tr><td>

`array.with(index, value)` возвращает копию массива с замененным элементом. Исходный массив не меняется; поддерживаются
и отрицательные индексы.

```ts
const source = ['draft', 'review', 'done'];
const updated = source.with(1, 'approved');

console.log(source); // ["draft", "review", "done"]
console.log(updated); // ["draft", "approved", "done"]
```

Недопустимый индекс приводит к `RangeError`.

</td></tr></table>

</details>

<details>
<summary>Почему immutable-методы массивов полезны в Angular?</summary><br>
<table><tr><td>

`toSorted()`, `toReversed()`, `toSpliced()` и `with()` создают новую ссылку. Это делает обновление signals,
OnPush-компонентов и store предсказуемым.

```ts
readonly users = signal<ReadonlyArray<User>>([]);

sortByName(): void {
  this.users.update((users) =>
    users.toSorted((first, second) => first.name.localeCompare(second.name)),
  );
}
```

Мутация массива на месте может не создать ожидаемого реактивного обновления и усложняет сравнение предыдущего и нового
состояния.

</td></tr></table>

</details>

<details>
<summary>Какие базовые API есть у Date?</summary><br>
<table><tr><td>

`Date` хранит момент времени, а не календарную дату без времени.

```ts
const now = new Date();

now.getFullYear();
now.getMonth(); // 0-11
now.getDate(); // День месяца

Date.now(); // Текущий timestamp в миллисекундах
now.getTime(); // Timestamp конкретной даты
```

`getFullYear()`, `getMonth()` и `getDate()` используют локальную таймзону. Их UTC-варианты: `getUTCFullYear()`,
`getUTCMonth()` и `getUTCDate()`.

</td></tr></table>

</details>

<details>
<summary>Что делает Date.prototype.toISOString?</summary><br>
<table><tr><td>

`toISOString()` возвращает строку в ISO-подобном формате `YYYY-MM-DDTHH:mm:ss.sssZ`. Результат всегда представлен в UTC.

```ts
const date = new Date('2026-06-20T10:30:00+03:00');

date.toISOString();
// "2026-06-20T07:30:00.000Z"
```

Метод удобен для API, логов, сериализации и приведения моментов времени к единому формату.

</td></tr></table>

</details>

<details>
<summary>Какие ошибки часто допускают при работе с Date?</summary><br>
<table><tr><td>

- Забывают, что `getMonth()` возвращает значения от `0` до `11`.
- Путают локальное время и UTC.
- Парсят строки нестандартного формата с зависимым от среды результатом.
- Сравнивают даты как локализованные строки.
- Не учитывают, что `setDate()`, `setMonth()` и `setFullYear()` мутируют объект.
- Ожидают, что `Date` хранит календарную дату без времени.

```ts
const date = new Date();

date.setDate(date.getDate() + 1); // Мутирует исходный объект
```

Для более сложной работы с датами развивается `Temporal`, но базовые вопросы обычно сфокусированы на `Date`.

</td></tr></table>

</details>

<details>
<summary>Как сравнивать даты в JavaScript?</summary><br>
<table><tr><td>

Моменты времени удобно сравнивать по timestamp через `getTime()`:

```ts
const first = new Date('2026-06-20T10:00:00.000Z');
const second = new Date('2026-06-20T12:00:00.000Z');

first.getTime() < second.getTime(); // true
```

Для API моменты времени обычно передают в ISO/UTC. Если значение является календарной датой без времени, например днем
рождения, его часто безопаснее хранить отдельной строкой `YYYY-MM-DD`, чтобы не получить сдвиг из-за таймзоны.

</td></tr></table>

</details>

### Promise и асинхронность

<details>
<summary>Что такое Promise.try?</summary><br>
<table><tr><td>

`Promise.try(callback, ...args)` синхронно вызывает callback и возвращает promise. Обычное значение становится
fulfillment, возвращенный promise ожидается, а синхронная ошибка превращается в rejection.

```ts
const result = await Promise.try(parseConfig, rawConfig);
```

API удобно на границе, где callback может быть синхронным или асинхронным. Это новый стандартный метод, поэтому перед
использованием нужно проверить поддержку целевых browsers и runtime.

</td></tr></table>

</details>

<details>
<summary>Чем Promise.all отличается от Promise.allSettled?</summary><br>
<table><tr><td>

`Promise.all()` успешно завершается, когда выполнены все promises, и возвращает значения в исходном порядке. При первом
rejection итоговый promise сразу отклоняется: это fail-fast поведение.

`Promise.allSettled()` ждет завершения всех операций и возвращает для каждой `{ status, value }` или
`{ status, reason }`. Он подходит для частично успешных независимых запросов.

```ts
const results = await Promise.allSettled([loadProfile(), loadRecommendations()]);

const successful = results.filter((result): result is PromiseFulfilledResult<unknown> => result.status === 'fulfilled');
```

`Promise.all([])` возвращает fulfilled promise со значением `[]`; обработчик `then` или продолжение после `await` все
равно выполняется асинхронно.

</td></tr></table>

</details>

<details>
<summary>Что произойдет при ошибке внутри Promise.all?</summary><br>
<table><tr><td>

Итоговый promise отклонится с причиной первого обнаруженного rejection. Остальные запущенные операции автоматически не
отменяются и могут продолжить работу.

Если допустим частичный результат, используют `Promise.allSettled()` или обрабатывают ошибку каждого promise отдельно.
Если операции нужно остановить, им передают общий `AbortSignal`.

</td></tr></table>

</details>

<details>
<summary>Когда использовать Promise.race?</summary><br>
<table><tr><td>

`Promise.race()` возвращает результат первого settled promise: как fulfilled, так и rejected. Метод подходит для выбора
первого ответа, соревнования альтернативных источников или timeout-сигнала.

Важно: проигравшие операции автоматически не отменяются.

</td></tr></table>

</details>

<details>
<summary>Чем Promise.any отличается от Promise.race?</summary><br>
<table><tr><td>

`Promise.any()` возвращает первый fulfilled результат и игнорирует промежуточные rejections. Если отклонены все
promises, он завершается `AggregateError`.

`Promise.race()` завершается при первом settled результате, поэтому первый rejection сразу отклонит итоговый promise.

`Promise.any()` полезен для нескольких взаимозаменяемых источников, где нужен первый успешный ответ.

</td></tr></table>

</details>

<details>
<summary>Что такое Promise.withResolvers?</summary><br>
<table><tr><td>

`Promise.withResolvers<T>()` создает promise и отдельно возвращает связанные функции `resolve` и `reject`.

```ts
const {promise, resolve, reject} = Promise.withResolvers<string>();

button.addEventListener('click', () => resolve('confirmed'), {once: true});

const result = await promise;
```

Метод удобен при адаптации callback/event API, но внешнее управление promise усложняет жизненный цикл. Для обычной
последовательной логики чаще проще `async/await`.

</td></tr></table>

</details>

### URL и query params

<details>
<summary>Что такое URL и URLSearchParams?</summary><br>
<table><tr><td>

`URL` разбирает и изменяет адрес через структурированные свойства. `URLSearchParams` работает с query parameters и
корректно кодирует имена и значения.

```ts
const url = new URL('/users', 'https://example.com');

url.searchParams.set('page', '2');
url.searchParams.set('search', 'Angular & RxJS');

url.toString();
// "https://example.com/users?page=2&search=Angular+%26+RxJS"
```

Это безопаснее и понятнее ручной конкатенации query string.

</td></tr></table>

</details>

<details>
<summary>Как добавлять, изменять и удалять query parameters?</summary><br>
<table><tr><td>

```ts
const params = new URLSearchParams('page=1');

params.set('page', '2');
params.append('tag', 'angular');
params.delete('page');

params.toString(); // "tag=angular"
```

`get(name)` возвращает первое значение или `null`, если параметра нет. Все значения хранятся как строки.

</td></tr></table>

</details>

<details>
<summary>Чем URLSearchParams.append отличается от set?</summary><br>
<table><tr><td>

`append()` добавляет еще одно значение и сохраняет существующие. `set()` заменяет все значения параметра одним новым
значением.

```ts
const params = new URLSearchParams();

params.append('tag', 'angular');
params.append('tag', 'rxjs');

params.get('tag'); // "angular"
params.getAll('tag'); // ["angular", "rxjs"]
```

Для multi-value параметров используют `append()` и `getAll()`.

</td></tr></table>

</details>

<details>
<summary>Какие Unicode-проблемы могут быть в URL?</summary><br>
<table><tr><td>

URL может содержать Unicode в hostname, path и query, но разные части кодируются по-разному. Hostname с не-ASCII
символами преобразуется через IDNA/Punycode, а path и query используют percent-encoding. Визуально похожие символы из
разных алфавитов могут создавать look-alike risks.

Также встречаются разные формы нормализации Unicode, combining marks и emoji. Поэтому validation, search, canonical URL
и сравнение ссылок должны учитывать продуктовый контекст, а не простое побайтовое равенство строк.

</td></tr></table>

</details>

<details>
<summary>Почему нельзя собирать URL простой конкатенацией строк?</summary><br>
<table><tr><td>

Конкатенация легко ломает encoding, `?`, `&`, `#`, пробелы, slash boundaries и значения с управляющими символами query.
Ошибочный URL может отправить неправильный query, сломать cache key, открыть redirect bug или привести к CORS-запросу не
на тот origin.

Для query используйте `URLSearchParams`, а для абсолютных адресов — `URL`:

```ts
const params = new URLSearchParams({
  page: String(page),
  query: searchQuery,
});

const url = new URL('/api/search', location.origin);
url.search = params.toString();

await fetch(url);
```

`URLSearchParams` сам закодирует пробелы, амперсанды, Unicode и другие специальные символы в значениях параметров.

</td></tr></table>

</details>

### Отмена асинхронных операций

<details>
<summary>Что такое AbortController и AbortSignal?</summary><br>
<table><tr><td>

`AbortController` управляет отменой, а его `signal` передается поддерживающей отмену операции. Вызов `abort()` переводит
signal в состояние `aborted` и сообщает причину наблюдателям.

```ts
const controller = new AbortController();

const request = fetch('/api/users', {
  signal: controller.signal,
});

controller.abort();
await request; // Rejection с AbortError
```

Один signal можно передать нескольким связанным операциям.

</td></tr></table>

</details>

<details>
<summary>Как сделать timeout для fetch?</summary><br>
<table><tr><td>

Современный вариант использует `AbortSignal.timeout()`:

```ts
const response = await fetch('/api/users', {
  signal: AbortSignal.timeout(5_000),
});
```

Если нужен ручной контроль, создают `AbortController`, вызывают `abort()` через timer и очищают timer в `finally`.

```ts
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 5_000);

try {
  return await fetch('/api/users', {signal: controller.signal});
} finally {
  clearTimeout(timeoutId);
}
```

</td></tr></table>

</details>

<details>
<summary>Чем отмена запроса отличается от игнорирования результата?</summary><br>
<table><tr><td>

Игнорирование результата не останавливает сетевую работу и обработку ответа. Настоящая отмена через `AbortSignal`
позволяет поддерживающему API прекратить ненужную операцию и освободить ресурсы раньше.

В Angular это встречается в autocomplete, навигации между страницами и уничтожении компонентов. `HttpClient` Observable
отменяет запрос при unsubscribe; `switchMap` использует это для отмены предыдущего поиска. Для `fetch` и других Web APIs
передают `AbortSignal`.

</td></tr></table>

</details>

### Browser HTTP и fetch

<details>
<summary>Что такое AJAX и для чего его используют?</summary><br>
<table><tr><td>

AJAX (Asynchronous JavaScript and XML) — подход к созданию интерактивных веб-приложений, при котором JavaScript
обменивается данными с сервером в фоновом режиме без полной перезагрузки страницы.

Браузер отправляет HTTP-запрос через `XMLHttpRequest` или современный `fetch`, получает ответ, обычно JSON, и обновляет
нужную часть интерфейса. XML использовать необязательно: он остался только в историческом названии подхода.

AJAX используют для подгрузки ленты и комментариев, autocomplete, отправки форм, серверной валидации и других
интерактивных сценариев без полной навигации страницы.

</td></tr></table>

</details>

<details>
<summary>Что такое HTTP?</summary><br>
<table><tr><td>

HTTP — прикладной протокол обмена сообщениями между client и server. Он определяет методы, URL, headers, body и status
codes, но не диктует внутреннюю архитектуру backend. Сам протокол stateless, а состояние сессии строится поверх него.

</td></tr></table>

</details>

<details>
<summary>Что такое request и response?</summary><br>
<table><tr><td>

Request отправляет method, target, headers и при необходимости body. Response возвращает status, headers и body. Browser
DevTools Network показывает обе части и timing.

</td></tr></table>

</details>

<details>
<summary>Что такое HTTP method?</summary><br>
<table><tr><td>

Method выражает намерение операции над resource. Семантика влияет на кеширование, idempotency, retries и поведение
proxies. Backend не должен использовать GET для изменения данных.

</td></tr></table>

</details>

<details>
<summary>Что такое status code?</summary><br>
<table><tr><td>

Это трехзначный код результата HTTP response. Он позволяет client и инфраструктуре отличать успех, redirect,
пользовательскую ошибку и server failure. Body добавляет machine-readable details.

</td></tr></table>

</details>

<details>
<summary>Что такое headers?</summary><br>
<table><tr><td>

Headers передают metadata: формат body, авторизацию, кеширование, cookies, content negotiation и tracing. Имена
регистронезависимы. Чувствительные значения нельзя логировать без фильтрации.

</td></tr></table>

</details>

<details>
<summary>Что такое body запроса?</summary><br>
<table><tr><td>

Body содержит данные операции, например JSON, form data или файл. Формат описывает `Content-Type`. GET/HEAD body не
следует использовать в обычном browser API.

```http
POST /users HTTP/1.1
Host: api.example.com
Content-Type: application/json

{
  "name": "Max",
  "role": "frontend"
}
```

</td></tr></table>

</details>

<details>
<summary>Что такое JSON body?</summary><br>
<table><tr><td>

Это body, сериализованный в JSON и обычно помеченный `Content-Type: application/json`. Он поддерживает objects, arrays,
strings, numbers, booleans и `null`. Dates и другие domain types передаются по согласованному строковому или числовому
контракту.

</td></tr></table>

</details>

<details>
<summary>Что такое query params?</summary><br>
<table><tr><td>

Это пары после `?` в URL, например `?page=2&sort=name`. Они подходят для фильтров, пагинации и состояния, которое должно
попадать в ссылку. Значения нужно URL-encode и валидировать на server.

</td></tr></table>

</details>

<details>
<summary>Что такое path params?</summary><br>
<table><tr><td>

Это динамические сегменты пути, например `/users/:id`. Они обычно идентифицируют resource или иерархию. Query params
чаще задают опции представления, но это API convention, а не ограничение HTTP.

</td></tr></table>

</details>

<details>
<summary>Что такое Content-Type?</summary><br>
<table><tr><td>

Header описывает media type отправленного body, например `application/json`. Server использует его для выбора parser.
Для response он сообщает browser, как интерпретировать данные.

</td></tr></table>

</details>

<details>
<summary>Что такое same-origin policy?</summary><br>
<table><tr><td>

Same-origin policy ограничивает доступ JavaScript к данным другого origin, где origin определяется схемой, host и port.
Она защищает пользователя от чтения приватных данных с других сайтов через браузер. CORS не отключает эту модель, а
позволяет серверу явно разрешить отдельные cross-origin requests.

</td></tr></table>

</details>

<details>
<summary>Что такое REST API?</summary><br>
<table><tr><td>

REST — архитектурный стиль, в котором ресурсы имеют URL, а стандартные HTTP-методы выражают операции:

- `GET /users/42` — получить ресурс;
- `POST /users` — создать;
- `PUT /users/42` — заменить;
- `PATCH /users/42` — частично изменить;
- `DELETE /users/42` — удалить.

`POST` обычно создает подчиненный ресурс или запускает команду. `PUT` полностью заменяет ресурс по известному URL, а
`PATCH` изменяет отдельные поля. `GET` читает данные и в browser `fetch` не может иметь body.

Основные группы статусов:

- `2xx`: успех, например `200`, `201`, `204`;
- `3xx`: перенаправление и кеш, например `301`, `304`;
- `4xx`: ошибка клиента, например `400`, `401`, `403`, `404`, `409`, `422`, `429`;
- `5xx`: ошибка сервера, например `500`, `502`, `503`.

Частые значения:

- `200 OK` - успешный ответ;
- `201 Created` - ресурс создан;
- `400 Bad Request` - некорректный запрос;
- `401 Unauthorized` - нет действительной аутентификации;
- `403 Forbidden` - пользователь распознан, но доступ запрещен;
- `404 Not Found` - ресурс не найден;
- `409 Conflict` - конфликт с текущим состоянием;
- `422 Unprocessable Content` - данные синтаксически корректны, но не проходят validation;
- `429 Too Many Requests` - превышен rate limit;
- `500 Internal Server Error` - внутренняя ошибка сервера.

Частые заголовки: `Content-Type`, `Accept`, `Authorization`, `Cache-Control`, `ETag`, `Cookie`, `Set-Cookie`,
CORS-заголовки.

REST предполагает stateless-взаимодействие: каждый запрос содержит достаточно контекста для обработки. Идемпотентность
означает, что повторный одинаковый запрос имеет тот же итоговый эффект; обычно `GET`, `PUT` и `DELETE` проектируют
идемпотентными.

</td></tr></table>

</details>

<details>
<summary>Что такое JSON и какие форматы body используются?</summary><br>
<table><tr><td>

JSON представляет objects, arrays, strings, numbers, booleans и `null`. Он не хранит `Date`, `Map`, functions и
`undefined` как отдельные типы.

Кроме `application/json`, frontend встречает `multipart/form-data` для файлов, `application/x-www-form-urlencoded`,
plain text, binary data и streams. Клиент и сервер согласуют формат через `Content-Type` и `Accept`.

</td></tr></table>

</details>

<details>
<summary>Чем отличаются GET, POST, PUT, PATCH и DELETE?</summary><br>
<table><tr><td>

GET читает, POST создает ресурс или запускает команду, PUT полностью заменяет представление по известному URL, PATCH
частично изменяет, DELETE удаляет. Конкретный API документирует payload и повторяемость. Method сам по себе не заменяет
авторизацию.

</td></tr></table>

</details>

<details>
<summary>Чем отличаются 2xx, 3xx, 4xx и 5xx?</summary><br>
<table><tr><td>

`2xx` означает успешную обработку, `3xx` — redirect или работу кеша, `4xx` — проблему запроса или доступа, `5xx` —
ошибку server. Retry зависит от конкретного кода и idempotency. Например, `404` и `503` требуют разной реакции.

</td></tr></table>

</details>

<details>
<summary>Может ли GET-запрос иметь body?</summary><br>
<table><tr><td>

Семантика body у GET не определена для обычного web-взаимодействия, многие servers и proxies его игнорируют, а browser
`fetch` запрещает body для GET и HEAD.

Параметры чтения передают через URL. Если запрос слишком сложный или содержит чувствительную структуру, API обычно
проектируют отдельным POST endpoint для поиска.

</td></tr></table>

</details>

<details>
<summary>Что происходит после ввода URL в адресную строку браузера?</summary><br>
<table><tr><td>

Упрощенная последовательность:

1. Браузер разбирает текст адресной строки и решает, это URL или поисковый запрос.
2. Проверяются HSTS policy, Service Worker, HTTP cache и возможность reuse существующего соединения.
3. DNS lookup находит IP-адрес.
4. Устанавливается транспортное соединение и для HTTPS выполняется TLS handshake.
5. Отправляется HTTP-запрос.
6. Браузер обрабатывает redirect и ответ.
7. HTML парсится, загружаются CSS, JavaScript и другие ресурсы.
8. Строятся DOM/CSSOM, layout, paint и compositing.

Service worker, HTTP cache, CDN и connection reuse могут изменить отдельные шаги.

</td></tr></table>

</details>

<details>
<summary>Как браузер понимает, URL это или поисковый запрос?</summary><br>
<table><tr><td>

Браузер разбирает введенный текст: ищет явную схему (`https://`), валидный hostname, IP address, localhost, port, path и
другие URL-признаки. Если строка не выглядит как URL, она отправляется в поисковую систему по умолчанию.

Пограничные случаи зависят от браузера и настроек: `example`, `example.test`, пробелы, Unicode-домены и символы, которые
нужно percent-encode. Поэтому frontend-код не должен угадывать URL вручную там, где можно использовать `URL`.

</td></tr></table>

</details>

<details>
<summary>Что такое CORS?</summary><br>
<table><tr><td>

CORS - browser security mechanism, который ограничивает JavaScript-запросы между разными origins. Сервер разрешает
доступ через `Access-Control-Allow-*` headers, а для части запросов браузер сначала отправляет preflight `OPTIONS`.

Postman не применяет browser same-origin policy, поэтому запрос может работать там и блокироваться в браузере.
Исправление находится в server CORS configuration или same-origin proxy, а не в отключении защиты браузера.

</td></tr></table>

</details>

<details>
<summary>Какими способами frontend взаимодействует с backend?</summary><br>
<table><tr><td>

- REST/HTTP для обычных request-response операций;
- GraphQL для управляемой клиентом выборки;
- WebSocket для двустороннего realtime;
- SSE для потока server-to-client;
- polling для простых периодических обновлений;
- gRPC-web в отдельных инфраструктурах.

Выбор зависит от направления потока, задержки, cache, browser support и возможностей backend.

</td></tr></table>

</details>

<details>
<summary>Как проектировать retry и timeout для frontend-запросов?</summary><br>
<table><tr><td>

Timeout ограничивает ожидание одного запроса, retry повторяет только ошибки, где повтор имеет смысл. Для frontend важно
не повторять неидемпотентные операции без idempotency key и не создавать лавину запросов при массовом сбое.

Практические правила:

- `GET` чаще retryable, `POST` - только при явном контракте;
- использовать exponential backoff и jitter;
- учитывать `Retry-After` для `429` и `503`;
- давать пользователю понятный fallback;
- отменять устаревшие запросы при смене экрана или query.

```ts
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 5000);

try {
  await fetch('/api/search', {signal: controller.signal});
} finally {
  clearTimeout(timeoutId);
}
```

</td></tr></table>

</details>

### HTTP и REST

<details>
<summary>Что такое REST?</summary><br>
<table><tr><td>

REST (Representational State Transfer) — это набор правил и принципов для построения взаимодействия между программами
(клиентом и сервером) через интернет. Обычно клиент (например, браузер или мобильное приложение) запрашивает данные у
сервера, а тот их возвращает, чаще всего по протоколу HTTP.

Ключевые принципы REST Клиент-серверная модель:

1. Четкое разделение: сервер хранит и обрабатывает данные, а клиент занимается интерфейсом и отправкой запросов.
2. Отсутствие состояния (Stateless): Каждый запрос от клиента содержит всю необходимую информацию для его обработки.
   Сервер не «помнит» клиента между запросами.
3. Использование стандартных методов HTTP:
   - Для управления данными используются определенные запросы (так называемый CRUD):
   - GET — получение данных
   - POST — создание новых данных
   - PUT или PATCH — обновление существующих данных
   - DELETE — удаление данных
4. Уникальные адреса (URI): Каждый ресурс или объект (пользователь, товар, статья) имеет свой уникальный адрес в сети
   (например, https://site.com).

</td></tr></table>

</details>

<details>
<summary>Что было до REST и после?</summary><br>
<table><tr><td>

REST (Representational State Transfer) — это набор правил и принципов для построения взаимодействия между программами
(клиентом и сервером) через интернет. Обычно клиент (например, браузер или мобильное приложение) запрашивает данные у
сервера, а тот их возвращает, чаще всего по протоколу HTTP.

Ключевые принципы REST Клиент-серверная модель:

1. RPC

Идея: клиент вызывает удаленную функцию как обычную функцию.

```ts
userService.getUser(123);
```

На уровне сети это превращалось в запрос к серверу.

Минус: клиент часто сильно завязан на серверные методы. То есть API выглядит как набор команд.

2. SOAP

SOAP — более формальный XML-based подход.

```xml
<soap:Envelope>
  <soap:Body>
    <GetUser>
      <UserId>123</UserId>
    </GetUser>
  </soap:Body>
</soap:Envelope>
```

Особенности:

- XML;
- строгие схемы;
- много формальности;
- часто использовался в enterprise, банках, госке, больших системах.

Минус: тяжеловесно, много boilerplate.

3. REST

REST стал популярным как более простой HTTP-подход.

```ts
call getUser(123)
```

Появляется ресурс:

```ts
GET / users / 123;
```

Вместо:

```ts
call deleteUser(123)
```

REST-стиль:

```
DELETE /users/123
```

Главная идея REST: API строится вокруг ресурсов, а HTTP-методы описывают действие.

REST никуда не исчез. Он до сих пор основной стандарт для обычных web API. Но рядом появились другие подходы.

4. GraphQL

Идея: клиент сам говорит, какие поля ему нужны.

```ts
query {
  user(id: 123) {
    name
    avatar
    posts {
      title
    }
  }
}
```

Плюсы:

- меньше лишних данных;
- удобно для сложных UI;
- frontend сам собирает нужную форму данных.

Минусы:

- сложнее кеширование;
- сложнее backend;
- легко сделать тяжелый запрос.

Хорошо подходит, когда UI сложный и REST начинает плодить много endpoint-ов.

5. gRPC

Идея: быстрые типизированные контракты между сервисами. Обычно используется не browser ↔ backend, а backend ↔ backend.

```ts
service UserService {
  rpc GetUser (GetUserRequest) returns (User);
}
```

Плюсы:

- быстро;
- строго типизировано;
- хорошо для микросервисов.

Минусы:

- менее удобно напрямую из браузера;
- хуже читается человеком, чем JSON/REST.

</td></tr></table>

</details>

### DOM, SSR и hydration

<details>
<summary>Что такое hydration в JavaScript?</summary><br>
<table><tr><td>

Hydration — это процесс, при котором JavaScript подключает интерактивное поведение к уже существующей HTML-разметке,
обычно полученной с сервера через SSR или prerender. Браузер сначала показывает готовый HTML, а затем клиентский код
находит нужные DOM-узлы, восстанавливает состояние и навешивает обработчики событий.

Упрощенный пример:

```html
<button
  id="counter"
  data-count="0"
>
  0
</button>

<script type="module">
  const button = document.querySelector('#counter');

  if (button instanceof HTMLButtonElement) {
    let count = Number(button.dataset.count ?? 0);

    button.addEventListener('click', () => {
      count += 1;
      button.dataset.count = String(count);
      button.textContent = String(count);
    });
  }
</script>
```

До выполнения скрипта кнопка уже видна пользователю, но еще не интерактивна. После hydration обработчик `click`
подключается к существующей кнопке, а не создает ее заново.

Главное требование — клиентский код должен ожидать такую же начальную разметку, какую отдал сервер. Если сервер
отрендерил `0`, а клиент при старте ожидает `1`, framework может получить hydration mismatch и пересоздать часть DOM.

</td></tr></table>

</details>

### JavaScript runtime, CPU и потоки

<details>
<summary>Что CPU-bound задача?</summary><br>
<table><tr><td>

- **CPU-bound** — это состояние системы или задачи в информатике, при котором время её выполнения определяется
  преимущественно скоростью центрального процессора (CPU), а не другими ресурсами системы, такими как память или
  операции ввода-вывода (I/O). При этом загрузка процессора высока, зачастую достигая 100% в течение нескольких секунд
  или минут.
- **Примеры CPU-bound-задач**:
  - сложные математические вычисления;
  - обработка больших массивов данных;
  - шифрование и сжатие информации;
  - парсинг больших структур данных;
  - рендеринг сложной графики;
  - научные вычисления;
  - обработка изображений;
  - задачи в системах машинного обучения, где требуется постоянная обработка больших объёмов информации.

![img.png](assets/cpu-bound.png)

</td></tr></table>

</details>

<details>
<summary>Что такое процесс и поток?</summary><br>
<table><tr><td>

Процесс имеет собственное адресное пространство и ресурсы операционной системы. Поток выполняет последовательность
инструкций внутри процесса и разделяет его память с другими потоками. Браузер использует несколько процессов и потоков,
хотя JavaScript страницы обычно выполняется на одном main thread.

![img.png](assets/process-vs-thread.png)

</td></tr></table>

</details>

<details>
<summary>Чем concurrency (конкурентность) отличается от parallelism (параллелизм)?</summary><br>
<table><tr><td>

![img.png](assets/concurrency-vs-parallelism.png)

- Concurrency (конкурентность или одновременность) означает, что несколько задач находятся в работе и чередуются во
  времени.

- Parallelism (параллелизм) означает их фактическое одновременное выполнение на разных ядрах или процессорах. Browser
  event loop дает concurrency, а Web Workers могут добавить parallelism для вычислений.

![img.png](assets/concurrency-vs-parallelism.png)

</td></tr></table>

</details>

### Event Loop

<details>
<summary>Чем отличается queueMicrotask от setTimeout?</summary><br>
<table><tr><td>

- queueMicrotask выполняет код после текущего синхронного кода, но до рендера и до setTimeout.
- setTimeout выполняет код в следующей macrotask, то есть позже: после microtasks, часто после рендера.

```js
console.log('1');

setTimeout(() => console.log('setTimeout'), 0);

queueMicrotask(() => console.log('queueMicrotask'));

console.log('2');
```

Вывод:

```js
1;
2;
queueMicrotask;
setTimeout;
```

</td></tr></table>

</details>

<details>
<summary>Что такое Event loop?</summary><br>
<table><tr><td>

JavaScript в браузере выполняется в основном в одном потоке. Поэтому ему нужен диспетчер, который по очереди
обрабатывает:

- обычный синхронный код;
- клики, ввод, события;
- setTimeout;
- Promise.then;
- queueMicrotask;
- рендер страницы.

```text
┌──────────────────────────────┐
│        Call Stack             │
│  выполняется текущий JS-код   │
└───────────────┬──────────────┘
                │
                ▼
┌──────────────────────────────┐
│       Microtask Queue         │
│  Promise.then                 │
│  queueMicrotask               │
└───────────────┬──────────────┘
                │
                ▼
┌──────────────────────────────┐
│      Browser Rendering        │
│  layout / paint / update UI   │
└───────────────┬──────────────┘
                │
                ▼
┌──────────────────────────────┐
│         Task Queue            │
│  setTimeout                   │
│  click                        │
│  input                        │
│  network events               │
└───────────────┬──────────────┘
                │
                └─────── снова в Call Stack
```

```ts
console.log('1');

setTimeout(() => {
  console.log('2');
}, 0);

Promise.resolve().then(() => {
  console.log('3');
});

queueMicrotask(() => {
  console.log('4');
});

console.log('5');
```

```ts
1;
5;
3;
4;
2;
```

</td></tr></table>

</details>

### Расширенные основы JavaScript

<details>
<summary>Что такое this и расскажите про область видимости?</summary><br>
<table><tr><td>

Область видимости определяет, где доступна переменная. В JavaScript есть глобальная, модульная, функциональная и блочная
область видимости. `let` и `const` имеют блочную область, `var` — функциональную.

`this` определяется способом вызова функции:

- `obj.method()` — `this` обычно равен `obj`;
- `fn.call(value)` / `apply` / `bind` — значение задается явно;
- `new Constructor()` — `this` указывает на создаваемый объект;
- при обычном вызове в strict mode — `undefined`;
- стрелочная функция не имеет собственного `this` и берет его из внешней области.

```ts
class Counter {
  count = 0;

  increment = (): void => {
    this.count += 1;
  };
}
```

Нельзя определять `this` только по месту объявления обычной функции: важно место и форма вызова.

</td></tr></table>

</details>

<details>
<summary>Что такое Promise и для чего используется в JS?</summary><br>
<table><tr><td>

`Promise<T>` представляет будущий результат одной асинхронной операции. У него есть состояния `pending`, `fulfilled` и
`rejected`; после выполнения состояние изменить нельзя.

```ts
fetch('/api/users')
  .then((response) => response.json())
  .catch((error: unknown) => handleError(error))
  .finally(() => hideLoader());
```

Обработчики `then`, `catch` и `finally` выполняются как microtasks. `async/await` — более читаемый синтаксис поверх
Promise.

Для параллельной работы есть `Promise.all`, `allSettled`, `race` и `any`. Сам Promise не предоставляет универсальной
отмены операции; для `fetch` используют `AbortController`.

</td></tr></table>

</details>

<details>
<summary>Что такое макро и микро задачи в JS?</summary><br>
<table><tr><td>

Термин task часто неформально называют macrotask.

- Tasks: выполнение скрипта, `setTimeout`, `setInterval`, события UI, сетевые callbacks.
- Microtasks: обработчики Promise, `queueMicrotask`, `MutationObserver`.

После завершения текущей task движок полностью очищает очередь microtasks и только затем может выполнить рендер и
перейти к следующей task.

Если microtasks непрерывно добавляют новые microtasks, они могут задержать рендер и обработку событий. Поэтому тяжелую
работу нельзя бесконечно дробить только через Promise или `queueMicrotask`.

</td></tr></table>

</details>

<details>
<summary>Что такое класс и интерфейс?</summary><br>
<table><tr><td>

Класс описывает создание объектов, их состояние и поведение. Класс существует во время выполнения JavaScript.

Интерфейс TypeScript описывает контракт формы значения и используется только при проверке типов. После компиляции
интерфейс исчезает.

```ts
interface UserRepository {
  findById(id: string): Promise<User | null>;
}

class HttpUserRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    return loadUser(id);
  }
}
```

Интерфейс нельзя напрямую использовать как Angular DI-токен, потому что его нет в runtime. Для DI используют класс,
`InjectionToken` или другой runtime-токен.

</td></tr></table>

</details>

<details>
<summary>Что такое конструктор класса?</summary><br>
<table><tr><td>

Конструктор — специальный метод, который выполняется при создании экземпляра через `new`. Он инициализирует обязательное
состояние объекта и принимает зависимости или параметры.

```ts
class User {
  constructor(
    readonly id: string,
    readonly name: string,
  ) {}
}
```

В производном классе до обращения к `this` нужно вызвать `super()`.

В Angular конструктор класса не является lifecycle hook. Для компонентов он должен оставаться простым: DI и базовая
инициализация выполняются в конструкторе, а логика, зависящая от входных данных, размещается в соответствующем lifecycle
hook или реактивной модели.

</td></tr></table>

</details>

<details>
<summary>В чем отличие var от const, let?</summary><br>
<table><tr><td>

- `var` имеет функциональную область видимости, допускает повторное объявление и поднимается с начальным значением
  `undefined`.
- `let` имеет блочную область видимости, допускает повторное присваивание, но не повторное объявление в том же блоке.
- `const` имеет блочную область видимости и требует значение при объявлении; повторное присваивание запрещено.

`let` и `const` тоже поднимаются, но до инициализации находятся в temporal dead zone.

`const` запрещает изменить саму ссылку, но не делает объект неизменяемым:

```ts
const user = {name: 'Ann'};
user.name = 'Kate'; // Допустимо
```

По умолчанию используют `const`, а `let` — только когда переменную действительно нужно переназначить. `var` в
современном коде обычно не используют.

</td></tr></table>

</details>

<details>
<summary>Как устроено прототипное наследование в JavaScript?</summary><br>
<table><tr><td>

Каждый обычный объект может иметь внутреннюю ссылку `[[Prototype]]` на другой объект. Если свойства нет у самого
объекта, JavaScript ищет его в прототипе, затем в прототипе прототипа и так далее до `null`. Это и есть цепочка
прототипов.

```ts
const animal = {moves: true};
const dog = Object.create(animal);

dog.barks = true;
console.log(dog.moves); // Найдено в прототипе
```

Синтаксис `class` появился в ECMAScript 2015. Он делает создание конструкторов, методов и наследования удобнее, но в
основе по-прежнему лежит прототипная модель.

Слишком глубокие и изменяемые цепочки усложняют код. В прикладной разработке часто предпочитают композицию небольших
объектов наследованию.

</td></tr></table>

</details>

<details>
<summary>Почему <code>Set.has</code> часто лучше <code>Array.includes</code> для частых проверок?</summary><br>
<table><tr><td>

`Array.includes()` проходит массив линейно, поэтому одна проверка стоит `O(n)`. Если проверять принадлежность внутри
`filter()` или `map()` для большого списка, легко получить лишний вложенный перебор.

`Set.has()` в среднем работает за `O(1)`, но сначала нужно построить `Set`. Поэтому замена полезна, когда набор
проверяется много раз или достаточно большой.

```ts
const visibleIds = new Set(filters.visibleIds);

const visibleRows = rows.filter((row) => visibleIds.has(row.id));
```

Для одного короткого списка `includes()` часто читабельнее и быстрее за счет меньшего overhead. Решение стоит
подтверждать профилем, если это hot path.

</td></tr></table>

</details>

<details>
<summary>Когда <code>Map</code> лучше обычного объекта?</summary><br>
<table><tr><td>

`Map` полезен, когда ключи не только строки, когда важны частые `set/get/delete`, когда нужно сохранять порядок вставки
или явно хранить коллекцию пар ключ-значение.

Обычный объект удобен для JSON-like данных и фиксированной формы:

```ts
const user = {
  id: '42',
  name: 'Ann',
};
```

`Map` лучше подходит для индекса:

```ts
const usersById = new Map(users.map((user) => [user.id, user]));
const currentUser = usersById.get(currentUserId);
```

В Angular-состоянии часто хранят и `ids: string[]` для порядка, и `entities: Map<string, User>` или plain object для
быстрого доступа по id.

</td></tr></table>

</details>

<details>
<summary>Какие ошибки часто бывают в comparator для <code>sort</code>?</summary><br>
<table><tr><td>

Comparator должен возвращать отрицательное число, ноль или положительное число и быть согласованным. Частые ошибки:
возвращать boolean, мутировать элементы, зависеть от внешнего меняющегося состояния, забывать числовой comparator или не
обрабатывать равенство.

```ts
const wrong = prices.toSorted((first, second) => (first.price > second.price ? 1 : -1));

const correct = prices.toSorted((first, second) => first.price - second.price);
```

Для строк лучше использовать `localeCompare()` или `Intl.Collator`, особенно если важны язык, регистр и числа внутри
строк. Для больших таблиц сортировку иногда переносят на сервер или делают в Web Worker, чтобы не блокировать main
thread.

</td></tr></table>

</details>

<details>
<summary>Почему <code>string.length</code> в JavaScript не всегда равен количеству видимых символов?</summary><br>
<table><tr><td>

`string.length` считает UTF-16 code units, а не пользовательские символы. Emoji, некоторые редкие символы и символы с
combining marks могут занимать несколько code units.

```ts
'😄'.length; // 2
Array.from('😄').length; // 1 code point
```

Даже code point не всегда равен видимому символу: один grapheme cluster может состоять из нескольких code points.
Поэтому обрезка пользовательского имени, textarea limit или preview текста должны учитывать Unicode, если продукт
работает с emoji и разными языками. Для пользовательских символов можно использовать `Intl.Segmenter`, когда он
доступен.

</td></tr></table>

</details>

<details>
<summary>Почему <code>0.1 + 0.2 !== 0.3</code>?</summary><br>
<table><tr><td>

JavaScript `number` использует IEEE 754 double precision floating point. Многие десятичные дроби нельзя представить
точно в двоичной форме, поэтому результат вычисления содержит маленькую погрешность.

```ts
0.1 + 0.2; // 0.30000000000000004
```

Для отображения используют округление, например `Intl.NumberFormat`. Для денег лучше хранить minor units, например
копейки или центы целым числом, либо использовать decimal-библиотеку на границе расчетов.

```ts
const totalCents = 10 + 20;
const formatted = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
}).format(totalCents / 100);
```

</td></tr></table>

</details>

<details>
<summary>Как использовать Intl API в frontend-приложении?</summary><br>
<table><tr><td>

`Intl` дает стандартные formatter APIs для дат, чисел, валют, plural rules, relative time, lists и collation. Это лучше,
чем вручную собирать строки с датами и валютами.

```ts
const price = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
}).format(1250);
```

Важно не создавать formatter в горячем loop без необходимости: formatter можно кешировать по locale/options. Также нужно
учитывать timezone, fallback locale и тесты для разных языков.

</td></tr></table>

</details>

<details>
<summary>Какие ограничения есть у bitwise operators в JavaScript?</summary><br>
<table><tr><td>

Bitwise operators приводят значения к 32-bit signed integer, кроме `>>>`, который возвращает unsigned 32-bit результат.
Из-за этого они могут неожиданно обрезать большие числа и дробную часть.

```ts
Math.pow(2, 40) | 0; // 0
```

Битовые операции уместны для flags, binary protocols, canvas/image processing и TypedArray. Для обычного UI-кода
читаемая структура вроде `Set<Permission>` часто лучше битовой маски.

</td></tr></table>

</details>

<details>
<summary>Для чего нужны <code>ArrayBuffer</code>, <code>TypedArray</code> и <code>Blob</code>?</summary><br>
<table><tr><td>

`ArrayBuffer` представляет участок бинарной памяти, `TypedArray` дает типизированный view поверх него, а `Blob` хранит
immutable file-like binary data. Эти API нужны для файлов, изображений, audio/video, WebSocket binary messages,
WebAssembly, canvas и stream processing.

```ts
const response = await fetch('/assets/report.pdf');
const file = await response.blob();

const url = URL.createObjectURL(file);
```

После `URL.createObjectURL()` важно вызвать `URL.revokeObjectURL(url)`, когда ссылка больше не нужна, чтобы не держать
память.

</td></tr></table>

</details>

### Память, stack, heap и GC

<details>
<summary>Что такое stack и heap?</summary><br>
<table><tr><td>

Stack хранит frames вызовов функций и имеет строгий порядок LIFO. Heap используется для динамически создаваемых объектов
с менее предсказуемым временем жизни. Конкретная реализация зависит от JavaScript engine, но эта модель полезна для
понимания рекурсии и утечек.

![img.png](assets/stack-vs-heap.png)

</td></tr></table>

</details>

<details>
<summary>Что обычно хранится в stack?</summary><br>
<table><tr><td>

В stack обычно находятся call frames: адрес возврата, локальный контекст и служебные данные вызова. Небольшие значения
движок также может хранить рядом с frame, но спецификация JavaScript не закрепляет физическое размещение. Важно, что
глубина stack ограничена.

![img.png](assets/stack.png)

</td></tr></table>

</details>

<details>
<summary>Что обычно хранится в heap?</summary><br>
<table><tr><td>

В heap живут объекты, массивы, функции, замыкания и другие значения с динамическим lifetime. Сборщик мусора освобождает
их, когда они становятся недостижимыми. Большое число удерживаемых объектов увеличивает memory usage и паузы GC.

![img.png](assets/heap.png)

</td></tr></table>

</details>

<details>
<summary>Почему объекты обычно живут в heap?</summary><br>
<table><tr><td>

Размер и lifetime объекта часто неизвестны во время входа в функцию. Heap позволяет нескольким ссылкам указывать на один
объект и сохранять его после завершения создавшего вызова. Stack с LIFO-порядком для такого времени жизни неудобен.

![img.png](assets/data-in-heap.png)

</td></tr></table>

</details>

<details>
<summary>Почему рекурсия может привести к stack overflow?</summary><br>
<table><tr><td>

Каждый рекурсивный вызов добавляет новый frame. Если базовый случай отсутствует или глубина слишком велика, stack
заканчивается и runtime выбрасывает `RangeError`. Для больших входов используют итерацию, явный stack данных или
разбиение работы.

![img.png](assets/maximum-recursive.png)

</td></tr></table>

</details>

<details>
<summary>Что такое memory leak?</summary><br>
<table><tr><td>

Это память, которая больше не нужна приложению, но остается достижимой и не освобождается GC. Утечка проявляется ростом
heap, замедлением работы и иногда падением вкладки. Причина обычно в забытых ссылках, а не в отсутствии сборщика мусора.

![img.png](assets/memory-leak.png)

</td></tr></table>

</details>

<details>
<summary>Какие memory leaks бывают во frontend?</summary><br>
<table><tr><td>

Частые причины: неснятые event listeners, timers, subscriptions, глобальные коллекции, кеш без ограничения и detached
DOM nodes. Замыкание может удерживать большой объект через одну ненужную ссылку. Особенно важно очищать ресурсы
долгоживущих SPA-компонентов.

![img.png](assets/memory-leak-example-1.png)

</td></tr></table>

</details>

<details>
<summary>Как найти memory leak в браузере?</summary><br>
<table><tr><td>

В Chrome DevTools используют Memory: Heap snapshot, Allocation instrumentation и сравнение snapshots после повторения
сценария. Ищут растущее число объектов, retaining paths и detached DOM nodes. Performance Monitor помогает увидеть
устойчивый рост JS heap и DOM nodes.

![img.png](assets/find-memory-leak.png)

#### Пример с Detached Elements

Откройте [пример с карточками](/examples/computer-science/example1/memory-leak.html).

- **Шаг 1**. Открой: DevTools → Memory → Heap snapshot. Сделай первый snapshot.
- **Шаг 2**. Нажми: Create 20 leaky cards. Подожди, пока карточки исчезнут.
- **Шаг 3**. Сделай второй snapshot. Выбери: Comparison. Ищи: Detached HTMLDivElement
- **Шаг 4**. Нажми: Clear leaks. Потом в DevTools нажми: Collect garbage. Сделай третий snapshot. После этого количество
  удерживаемых объектов должно уменьшиться.

![img.png](assets/detached.png)

###### Главная мысль

Элемент исчез со страницы ≠ объект исчез из памяти. Утечка возникает не из-за setTimeout, а из-за этой строки:

```js
window.__leaks.push({
  node,
  payload,
  handleClick,
});
```

Именно она оставляет объект достижимым.

#### Пример с setInterval

Откройте [пример с setInterval](/examples/computer-science/example2/memory-leak-set-interval.html). Проделайте
аналогичные шаги примеру 1.

![img.png](assets/detached-dom-timer.png)

Главные строки:

```text
LeakyIntervalCard         # Delta +20
DOMTimer                  # Delta +20
ScheduledAction           # Delta +20
V8Function                # Delta +20
system / Context / scope  # Delta +20
Detached <div>            # Delta +20
```

| Строка в Heap snapshot         | Что означает                                                                                     | Почему важна для поиска leak                                                                                                              |
| ------------------------------ | ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `LeakyIntervalCard`            | Instance нашего JS-класса. В примере каждая карточка создается как `new LeakyIntervalCard(...)`. | Если `# Delta +20`, значит после сценария в памяти осталось 20 instance класса. Это прямой признак, что объекты приложения не очистились. |
| `DOMTimer`                     | Внутренний объект браузера для `setInterval` / `setTimeout`.                                     | Если `DOMTimer # Delta +20`, значит появилось 20 активных timer/interval. Для `setInterval` leak это важный маркер.                       |
| `ScheduledAction`              | Запланированное действие, которое браузер должен выполнить по timer.                             | Показывает, что callback интервала все еще запланирован и не очищен.                                                                      |
| `V8Function`                   | JS-функция внутри движка V8. В нашем примере это callback, переданный в `setInterval`.           | Callback держит замыкание. Через него могут удерживаться `this`, `payload`, DOM node и другие данные.                                     |
| `system / Context / scope`     | Scope / closure, где хранятся захваченные переменные callback-функции.                           | Очень важный признак: interval callback может держать `this`, а `this` держит весь объект `LeakyIntervalCard`.                            |
| `Detached <div>`               | DOM-элемент `div`, который удален со страницы, но все еще находится в памяти.                    | Если `Detached <div> # Delta +20`, значит 20 карточек исчезли из DOM, но не были очищены GC.                                              |
| `Detached Text`                | Текстовый DOM-узел внутри удаленного DOM-элемента.                                               | Обычно идет рядом с `Detached <div>`. Сам по себе не главная причина, а следствие удержания DOM-элемента.                                 |
| `Detached CSSStyleDeclaration` | Внутренний объект стилей для удаленного DOM-элемента.                                            | Часто появляется вместе с detached DOM node. Это сопутствующий объект, а не основная причина leak.                                        |
| `Detached DOMTokenList`        | Объект для `classList` удаленного DOM-элемента.                                                  | В нашем примере карточка имеет классы `card`, `leaky`, `removing`, поэтому DevTools показывает связанный `DOMTokenList`.                  |
| `(concatenated string)`        | Строки, созданные через конкатенацию или template string.                                        | В примере большой `payload` создает много строк. Если они растут вместе с leak, значит данные тоже удерживаются в памяти.                 |
| `(string)`                     | Обычные строки в heap.                                                                           | Может быть частью payload, логов, текста DOM или служебных данных. Смотреть стоит только если `Size Delta` стабильно растет.              |
| `{id, index, marker, text}`    | Объекты payload из нашего примера.                                                               | Если таких объектов стало `+20001`, значит массивы данных остались в памяти вместе с `LeakyIntervalCard`.                                 |
| `Array` / `(array)`            | Массивы JS. В примере это массив `payload`.                                                      | Само по себе не значит leak. Нужно смотреть `# Delta`, `Size Delta` и `Retainers`.                                                        |
| `Object`                       | Обычные JS-объекты.                                                                              | Слишком общий тип. Полезен только вместе с `Retainers`, чтобы понять, кто держит эти объекты.                                             |
| `Function`                     | JS-функции.                                                                                      | Может указывать на callback, listener или closure. В interval leak полезно смотреть рядом с `DOMTimer` и `V8Function`.                    |
| `InternalNode`                 | Внутренний объект браузера / V8 / Blink.                                                         | Часто это шум DevTools или служебные структуры. Не считать leak без анализа `Retainers` и стабильного роста.                              |
| `Detached InternalNode`        | Внутренний объект браузера, который помечен как detached.                                        | Может выглядеть подозрительно, но часто не относится к твоему коду. Важнее смотреть на размер, рост и `Retainers`.                        |

| Что смотреть первым | Зачем                                                       |
| ------------------- | ----------------------------------------------------------- |
| `LeakyIntervalCard` | Показывает, что живы объекты твоего приложения              |
| `DOMTimer`          | Показывает, что interval не очищен                          |
| `Detached <div>`    | Показывает, что DOM удален со страницы, но остался в памяти |
| `# Delta`           | Показывает прирост количества объектов                      |
| `Size Delta`        | Показывает прирост памяти                                   |
| `Retainers`         | Показывает, кто именно держит объект                        |

![img.png](assets/retainers.png)

| Что видно в Retainers                   | Что означает                                                 | Почему это важно                                                                                         |
| --------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| `this in system / Context / scope`      | В замыкании callback-функции сохранен `this`.                | Это главный признак: callback интервала держит instance `LeakyIntervalCard`.                             |
| `context in ()`                         | Scope / closure callback-функции.                            | В этом scope лежат захваченные значения, включая `this`.                                                 |
| `memory-leak-set-interval.html?...:125` | Строка кода, где создана или используется callback-функция.  | Это полезная привязка к исходному коду. Скорее всего, это место с `setInterval(() => this.tick(), ...)`. |
| `V8Function`                            | JS-функция внутри движка V8.                                 | Это callback, который браузер должен периодически выполнять.                                             |
| `ScheduledAction`                       | Запланированное действие таймера.                            | Показывает, что callback все еще запланирован и не очищен.                                               |
| `DOMTimer`                              | Внутренний объект браузера для `setInterval` / `setTimeout`. | Главный маркер interval leak. Пока `DOMTimer` жив, callback тоже жив.                                    |
| `Window / http://localhost:63342`       | Глобальный объект страницы.                                  | Через `Window` браузер держит активные таймеры страницы.                                                 |
| `LeakyIntervalCard @...`                | Instance твоего класса.                                      | Он не очищается, потому что его держит callback интервала.                                               |
| `node :: Detached <div ...>`            | DOM-элемент удален со страницы, но остался в памяти.         | Instance `LeakyIntervalCard` держит его через поле `this.node`.                                          |
| `intervalId :: smi number`              | ID активного interval.                                       | По нему можно вызвать `clearInterval(intervalId)`.                                                       |

</td></tr></table>

</details>

<details>
<summary>Что такое Garbage Collector?</summary><br>
<table><tr><td>

GC автоматически находит и освобождает память недостижимых объектов. Современные движки используют несколько поколений и
инкрементальные фазы, чтобы уменьшить длинные паузы. Автоматическая очистка не защищает от логически ненужных, но
достижимых данных.

</td></tr></table>

</details>

<details>
<summary>Как GC понимает, что объект больше не нужен?</summary><br>
<table><tr><td>

Движок начинает с roots: global objects, stack frames и внутренних ссылок runtime. Затем отмечает все объекты, до
которых можно дойти по ссылкам. Неотмеченные объекты считаются недостижимыми и могут быть освобождены.

![img.png](assets/gc.png)

</td></tr></table>

</details>

<details>
<summary>Что такое reachability?</summary><br>
<table><tr><td>

Reachability — возможность добраться до значения из корневых ссылок по цепочке объектов. Пока существует такая цепочка,
GC считает объект нужным. Поэтому одна ссылка из глобального кеша может удерживать большое дерево данных.

![img.png](assets/reachability.png)

</td></tr></table>

</details>

<details>
<summary>Почему замыкания могут удерживать память?</summary><br>
<table><tr><td>

Функция сохраняет доступ к переменным внешней lexical scope даже после завершения внешнего вызова. Если callback живет
долго, связанные данные тоже могут оставаться достижимыми. Следует не захватывать крупный контекст без необходимости и
удалять долгоживущие callbacks.

![img.png](assets/closure-gc.png)

</td></tr></table>

</details>

<details>
<summary>Как event listeners могут создавать memory leaks?</summary><br>
<table><tr><td>

Event target хранит ссылку на handler, а handler через замыкание может удерживать компонент и данные. Listener нужно
удалять тем же function reference или регистрировать с `AbortSignal`.

```js
const handler = () => updateLargeViewModel();

window.addEventListener('resize', handler);

// При уничтожении владельца:
window.removeEventListener('resize', handler);
```

![img.png](assets/event-listener-gc.png)

</td></tr></table>

</details>

<details>
<summary>Почему detached DOM nodes могут быть проблемой?</summary><br>
<table><tr><td>

Узел удален из документа, но JavaScript-ссылка или listener продолжает удерживать его и дочернее дерево. Он не виден
пользователю, но занимает память. DevTools показывает такие узлы как detached elements и помогает найти retaining path.

![img.png](assets/detached-example.png)

</td></tr></table>

</details>

<details>
<summary>Как WeakMap и WeakSet помогают с памятью?</summary><br>
<table><tr><td>

Они не удерживают объект-ключ от сборки мусора. Это удобно для metadata и кеша, lifetime которого должен совпадать с
lifetime объекта. Их содержимое нельзя надежно перечислять, потому что GC работает недетерминированно.

![img.png](assets/weak-map-vs-weak-set.png)

</td></tr></table>

</details>

<details>
<summary>Можно ли вручную вызвать GC в JavaScript?</summary><br>
<table><tr><td>

В обычном web-коде нет стандартного API для принудительного GC. Движок сам выбирает момент сборки на основе давления на
память и внутренних эвристик. Правильное решение — удалить ненужные ссылки и ресурсы, а не пытаться управлять GC.

</td></tr></table>

</details>

<details>
<summary>Как устроена память в JavaScript (memory heap, memory stack)?</summary><br>
<table><tr><td>

Упрощенная модель состоит из call stack и heap:

- В стеке находятся контексты вызова функций, параметры и локальные данные, необходимые текущему вызову.
- В heap динамически размещаются объекты, функции, замыкания и другие значения с произвольным временем жизни.
- Переменная с объектом фактически хранит ссылку на область памяти.

Сборщик мусора освобождает объекты, которые больше недостижимы от корней приложения. Основная идея современных сборщиков
мусора — mark and sweep.

Типичные причины утечек: забытые подписки и обработчики, бесконечно растущий кеш, таймеры, замыкания и ссылки на
удаленные DOM-узлы. В Angular для подписок можно использовать `AsyncPipe`, `toSignal()` или `takeUntilDestroyed()`.

</td></tr></table>

</details>

<details>
<summary>Что такое call-stack, task-queue (приведите примеры работы)?</summary><br>
<table><tr><td>

Call stack хранит активные вызовы функций. JavaScript выполняет верхний frame стека и снимает его после возврата из
функции.

Task queue содержит готовые к выполнению задачи: таймеры, DOM-события и другие callbacks. Event loop передает следующую
задачу в стек, когда стек пуст и обработаны microtasks.

```ts
console.log('A');

setTimeout(() => console.log('B'), 0);
Promise.resolve().then(() => console.log('C'));

console.log('D');
```

Порядок вывода: `A`, `D`, `C`, `B`. Синхронный код выполняется первым, затем microtasks, затем следующая task.

</td></tr></table>

</details>

<details>
<summary>Почему event loop не спасает от плохой алгоритмической сложности?</summary><br>
<table><tr><td>

Event loop умеет чередовать задачи, но синхронный JavaScript все равно выполняется на main thread до завершения текущей
task. Если обработчик клика сортирует, фильтрует и рендерит огромный список за сотни миллисекунд, браузер не сможет
обработать input и paint посередине этой работы.

Решения зависят от причины: улучшить алгоритм, заранее построить индекс через `Map`, добавить pagination/virtual scroll,
разбить работу на chunks, перенести CPU-bound часть в Web Worker или выполнить тяжелую агрегацию на сервере.

</td></tr></table>

</details>

<details>
<summary>Почему network latency не описывают через Big O?</summary><br>
<table><tr><td>

Big O описывает рост вычислительной сложности относительно размера входа. Network latency зависит от расстояния,
маршрута, TLS, состояния соединения, сервера, CDN и качества сети пользователя.

Frontend-разработчику важно разделять CPU-bound и I/O-bound проблемы. `O(n)` фильтрация может лагать из-за main thread,
а медленный API-запрос — из-за latency, throughput, backend queue или cache miss. Для первого помогают профилировщик,
алгоритм, virtual scroll и Web Worker; для второго — caching, batching, prefetch, pagination, timeout и retry policy.

</td></tr></table>

</details>

<details>
<summary>Когда нужны pagination, streaming или virtual scroll?</summary><br>
<table><tr><td>

Если данных много, проблема обычно не только в загрузке, но и в памяти, вычислениях и DOM rendering. Pagination
ограничивает размер страницы данных, streaming позволяет начать обработку до полного ответа, virtual scroll рендерит
только видимую часть списка.

В Angular large table часто начинают с server-side pagination/filtering/sorting. Если UX требует плавного просмотра
большого локального списка, добавляют virtual scroll и стабильный `track` в `@for`, чтобы не пересоздавать DOM без
необходимости.

</td></tr></table>

</details>

### JavaScript performance

<details>
<summary>Как DevTools Performance panel помогает найти long tasks?</summary><br>
<table><tr><td>

Performance panel показывает timeline main thread: scripting, style recalculation, layout, paint, long tasks и события
input. По flame chart можно увидеть, какая функция, framework render или forced layout заняли кадр. Для Angular полезно
сопоставлять эти данные с Angular DevTools Profiler и количеством change detection cycles.

</td></tr></table>

</details>

<details>
<summary>Как JavaScript может замедлить первый render?</summary><br>
<table><tr><td>

Синхронный `<script>` останавливает HTML parsing, потому что может изменить документ. Большой bundle также требует
download, parse, compile и execute на main thread, конкурируя со style calculation, layout и user input.

В Angular это проявляется как поздний initial rendering и длинные tasks до интерактивности. Помогают `defer`, code
splitting, lazy routes, уменьшение polyfills/dependencies, SSR/SSG и перенос тяжелой работы из startup path.

</td></tr></table>

</details>

<details>
<summary>Что такое performance budget?</summary><br>
<table><tr><td>

Performance budget — заранее заданный лимит на важные показатели: bundle size, LCP, CLS, INP, TTFB, количество запросов,
вес изображений или размер CSS. Он помогает не ухудшать продукт незаметно от релиза к релизу. Хороший budget проверяется
в CI, monitoring или регулярных performance reviews, а не только вручную перед релизом.

</td></tr></table>

</details>

<details>
<summary>Какие метрики подходят для frontend performance budget?</summary><br>
<table><tr><td>

Для пользовательского опыта важны LCP, CLS, INP и TTFB. Для инженерного контроля полезны bundle size, количество
JavaScript, размер CSS, вес изображений и число network requests. Набор метрик зависит от продукта: content site,
dashboard, SPA, e-commerce, docs или design system.

</td></tr></table>

</details>

<details>
<summary>Какими инструментами измерять frontend performance?</summary><br>
<table><tr><td>

Для лабораторных проверок подходят Lighthouse, WebPageTest и Chrome DevTools Performance. Для реальных пользователей
нужны RUM-инструменты и Web Vitals. Важно смотреть не только локальные замеры на мощном ноутбуке, но и реальные
устройства, сеть, регионы и браузеры пользователей.

</td></tr></table>

</details>

<details>
<summary>Почему performance tools должны быть частью workflow?</summary><br>
<table><tr><td>

Если performance проверяется только перед релизом, проблемы находят слишком поздно. Лучше встроить проверки в pull
request, CI, monitoring или регулярные performance reviews. Тогда performance становится частью engineering process, а
не разовой оптимизацией после жалоб пользователей.

</td></tr></table>

</details>

<details>
<summary>Что такое Web Vitals?</summary><br>
<table><tr><td>

Web Vitals - пользовательские метрики качества страницы:

- **LCP**: скорость отображения основного контента;
- **INP**: отзывчивость на взаимодействия;
- **CLS**: визуальная стабильность.

Метрики анализируют по полевым данным реальных пользователей и дополняют лабораторными измерениями Lighthouse и
DevTools.

</td></tr></table>

</details>

<details>
<summary>Какие инструменты использовать для поиска performance bug?</summary><br>
<table><tr><td>

Для диагностики используют Chrome DevTools Performance, Network, Lighthouse, Coverage, Memory, Angular DevTools и RUM
метрики из production. Lighthouse удобен как лабораторный smoke test, но реальные LCP, CLS и INP нужно смотреть по
пользовательским данным. Performance bug лучше искать от симптома и метрики, а не по случайной оптимизации bundle.

</td></tr></table>

</details>

<details>
<summary>Как уменьшить perceived load time?</summary><br>
<table><tr><td>

Perceived load time уменьшают ранним показом meaningful content, skeleton или стабильного placeholder, SSR/SSG, critical
CSS, приоритизацией LCP resource и отложенной загрузкой второстепенного кода. Важно не имитировать скорость спиннером, а
дать пользователю полезный первый экран и быстрый путь к интерактивности.

</td></tr></table>

</details>

<details>
<summary>Чем SSR отличается от CSR?</summary><br>
<table><tr><td>

CSR строит интерфейс в браузере после загрузки JavaScript, а SSR отдает HTML с сервера для текущего запроса. SSR может
улучшить first paint, SEO и previews, но добавляет серверную инфраструктуру, constraints на browser-only code и риск
hydration mismatch. CSR проще для внутренних приложений, где SEO и публичный first render не критичны.

</td></tr></table>

</details>

<details>
<summary>Что такое static rendering?</summary><br>
<table><tr><td>

Static rendering, или SSG/prerender, генерирует HTML заранее на build time или по заранее известным routes. Это хорошо
для документации, маркетинговых страниц и контента, который редко меняется. Для персонализированных данных нужен CSR,
SSR, incremental regeneration или отдельная загрузка данных на клиенте.

</td></tr></table>

</details>

<details>
<summary>Что такое main thread?</summary><br>
<table><tr><td>

Это поток renderer process, где выполняются JavaScript, style calculation, layout и часть paint. User input и rendering
конкурируют с application code за его время. Поэтому тяжелая синхронная работа ухудшает отзывчивость.

</td></tr></table>

</details>

<details>
<summary>Какие задачи конкурируют за main thread?</summary><br>
<table><tr><td>

Event handlers, timers, framework rendering, parsing, style/layout, часть paint и browser callbacks. Если одна задача
занимает поток надолго, input и следующий кадр ждут. Вычисления можно разбивать, откладывать или переносить в Worker.

</td></tr></table>

</details>

<details>
<summary>Что такое long task?</summary><br>
<table><tr><td>

Это задача main thread длительностью более 50ms. Внутри нее браузер не может своевременно обработать input или render.
Long Tasks API и Performance panel помогают найти источник.

</td></tr></table>

</details>

<details>
<summary>Как long task влияет на INP?</summary><br>
<table><tr><td>

Interaction может ждать окончания уже выполняющейся long task, а затем сам handler и render добавят задержку. INP
учитывает полную latency взаимодействия до следующего отображенного кадра. Нужно сокращать blocking time, а не только
handler выбранной кнопки.

</td></tr></table>

</details>

<details>
<summary>Что такое debounce и throttle с точки зрения performance?</summary><br>
<table><tr><td>

Debounce запускает работу после паузы в серии событий, throttle ограничивает частоту запусков. Они уменьшают число
дорогих обработок scroll, resize или input. Неправильная задержка может ухудшить ощущение отзывчивости и accessibility.

</td></tr></table>

</details>

<details>
<summary>Что такое virtualization списков?</summary><br>
<table><tr><td>

Virtualization рендерит только видимую часть большого списка и небольшой buffer. DOM остается компактным, уменьшая
layout, paint и memory usage. Нужно корректно поддержать высоты, прокрутку, focus и screen readers.

</td></tr></table>

</details>

<details>
<summary>Когда нужна виртуализация?</summary><br>
<table><tr><td>

Когда сотни или тысячи сложных строк заметно замедляют initial render и scrolling. Для короткого списка она добавляет
лишнюю сложность. Решение принимают после измерения DOM size и frame performance.

</td></tr></table>

</details>

<details>
<summary>Чем Lighthouse отличается от реальных пользовательских метрик?</summary><br>
<table><tr><td>

Lighthouse выполняет воспроизводимый лабораторный запуск с заданным устройством и сетью. RUM показывает реальных
пользователей, устройства, кеши и взаимодействия, включая распределение Core Web Vitals. Для диагностики нужны оба
источника.

</td></tr></table>

</details>

<details>
<summary>Как искать memory leak в frontend-приложении?</summary><br>
<table><tr><td>

Сначала воспроизводят сценарий роста памяти: навигация туда-обратно, открытие и закрытие modal, длинный список, polling.
Затем сравнивают heap snapshots, смотрят retained objects и allocation timeline.

Частые причины:

- забытые event listeners;
- timers и subscriptions без cleanup;
- closures, удерживающие большие объекты;
- кеши без eviction;
- `URL.createObjectURL()` без `URL.revokeObjectURL()`;
- detached DOM nodes.

```ts
const controller = new AbortController();
window.addEventListener('resize', onResize, {signal: controller.signal});

controller.abort();
```

В Angular дополнительно проверяют RxJS subscriptions, long-lived services и effects. В React - cleanup в `useEffect` и
устаревшие async callbacks.

</td></tr></table>

</details>

<details>
<summary>Как построить performance budget для frontend?</summary><br>
<table><tr><td>

Performance budget фиксирует допустимые границы до релиза: размер initial JS/CSS, количество requests, LCP, INP, CLS,
время hydration, memory на ключевом flow. Бюджет должен быть связан с реальными устройствами и рынком продукта, а не
только с локальной машиной разработчика.

Хорошая практика - проверять budget в CI для bundle size и в production через RUM для Core Web Vitals. Если бюджет
нарушен, команда принимает явный trade-off: оптимизация, lazy loading, перенос feature, split chunk или изменение UX.

```json
{
  "budgets": {
    "initialJsKb": 180,
    "lcpMsP75": 2500,
    "clsP75": 0.1
  }
}
```

</td></tr></table>

</details>

### JavaScript interview questions

<details>
<summary>Что такое event delegation?</summary><br>
<table><tr><td>

Event delegation — это прием, при котором обработчик события ставят на общего родителя, а не на каждый дочерний элемент.
Событие всплывает вверх по DOM, а обработчик определяет исходный элемент через `event.target`. Это уменьшает число
listeners и удобно для динамических списков; в Angular template bindings обычно скрывают детали, но понимание DOM events
помогает писать directives и интеграции.

```js
list.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-id]');

  if (!button || !list.contains(button)) {
    return;
  }

  selectItem(button.dataset.id);
});
```

</td></tr></table>

</details>

<details>
<summary>Как работает prototypal inheritance?</summary><br>
<table><tr><td>

Объект имеет internal prototype, по которому JavaScript ищет свойство, если его нет на самом объекте. Этот поиск идет по
prototype chain до `null`. `class` в JavaScript — синтаксис поверх prototype model, а не отдельная модель наследования.

</td></tr></table>

</details>

<details>
<summary>Что такое closure и когда она полезна?</summary><br>
<table><tr><td>

Closure возникает, когда функция сохраняет доступ к переменным внешней lexical scope после завершения внешней функции.
Она полезна для callbacks, factories, инкапсуляции состояния и partial application. Нужно помнить, что closure
удерживает ссылки на значения и может продлить их жизнь в памяти.

</td></tr></table>

</details>

<details>
<summary>Что такое hoisting?</summary><br>
<table><tr><td>

Hoisting — поведение, при котором declarations обрабатываются до выполнения кода в scope. Function declarations доступны
до объявления, `var` создается со значением `undefined`, а `let`, `const` и `class` находятся в temporal dead zone до
строки объявления. Поэтому порядок кода все равно важен для читаемости и корректности.

</td></tr></table>

</details>

<details>
<summary>Что такое type coercion?</summary><br>
<table><tr><td>

Type coercion — неявное или явное преобразование значения к другому типу. JavaScript делает это в арифметике,
сравнениях, string concatenation и boolean context. Неявные правила бывают неожиданными, поэтому в application code
лучше явно преобразовывать данные на границах.

</td></tr></table>

</details>

<details>
<summary>Что такое event bubbling?</summary><br>
<table><tr><td>

Bubbling — фаза события, когда оно идет от target вверх по ancestors до document/window. На этом основан event
delegation. Обработчик должен проверять `event.target`, `event.currentTarget` и границы контейнера, чтобы не обработать
чужой элемент.

</td></tr></table>

</details>

<details>
<summary>Что такое event capturing?</summary><br>
<table><tr><td>

Capturing — фаза события до target, когда событие идет сверху вниз от window/document к целевому элементу. Обработчик
подключают через `{capture: true}`. Этот режим используют реже, например для инфраструктурного перехвата или сложных UI,
где порядок bubbling недостаточен.

</td></tr></table>

</details>

<details>
<summary>Что такое strict mode?</summary><br>
<table><tr><td>

Strict mode включает более строгие правила JavaScript: запрещает часть неявных globals, меняет `this` в обычном вызове
на `undefined`, делает некоторые ошибки явными и блокирует устаревшие конструкции. ES modules и class body работают в
strict mode автоматически. Минус обычно только в том, что старый небрежный код начинает падать раньше.

</td></tr></table>

</details>

<details>
<summary>Что такое mutable и immutable objects?</summary><br>
<table><tr><td>

Mutable object можно изменить на месте, сохранив ту же ссылку. Immutable-подход создает новое значение при изменении. В
Angular immutability помогает predictable state, signals, OnPush/change detection и простое сравнение предыдущего и
нового состояния.

</td></tr></table>

</details>

<details>
<summary>Что такое higher-order function?</summary><br>
<table><tr><td>

Higher-order function принимает функцию как аргумент или возвращает функцию. Примеры: `map`, `filter`, middleware,
decorators и factories. Такой подход позволяет отделять общий алгоритм от конкретного действия, но чрезмерная
вложенность ухудшает читаемость.

</td></tr></table>

</details>

<details>
<summary>Что такое destructuring?</summary><br>
<table><tr><td>

Destructuring извлекает значения из массива или объекта в переменные по структуре. Он удобен для параметров функции, DTO
mapping и работы с tuples. Важно помнить про defaults и то, что destructuring не делает deep clone.

```js
const user = {name: 'Max', role: 'admin'};
const {name, role = 'user'} = user;
```

</td></tr></table>

</details>

<details>
<summary>Что такое template literal?</summary><br>
<table><tr><td>

Template literal — строка в backticks с interpolation через `${...}` и поддержкой многострочного текста. Он удобен для
сборки человекочитаемых строк, но не должен использоваться для небезопасной вставки HTML или SQL без escaping. Tagged
templates позволяют библиотекам контролировать обработку частей строки.

</td></tr></table>

</details>

<details>
<summary>Что такое currying?</summary><br>
<table><tr><td>

Currying превращает функцию от нескольких аргументов в цепочку функций по одному аргументу. Это удобно для частичного
применения, factories и композиции. В обычном application code его стоит использовать там, где он реально делает вызовы
понятнее, а не ради функционального стиля.

</td></tr></table>

</details>

<details>
<summary>Что такое Promise?</summary><br>
<table><tr><td>

Promise представляет будущий результат asynchronous operation: pending, fulfilled или rejected. Он позволяет строить
цепочки через `then`, обрабатывать ошибки через `catch` и писать последовательный async-код через `async/await`. Promise
не отменяет операцию сам по себе; для fetch используют `AbortController`.

</td></tr></table>

</details>

<details>
<summary>Зачем команде нужны JavaScript principles?</summary><br>
<table><tr><td>

JavaScript principles фиксируют базовые договоренности: как писать modules, работать с async code, обрабатывать ошибки,
именовать функции, избегать side effects и организовывать shared utilities. Это уменьшает хаос в больших проектах и
делает поведение кода предсказуемым для review, testing и production debugging.

</td></tr></table>

</details>

<details>
<summary>Когда проекту нужны polyfills или shims?</summary><br>
<table><tr><td>

Polyfills нужны, когда приложение использует JavaScript-возможность или Web API, которых нет в целевых браузерах. Их
список должен зависеть от browser support policy и реальной аналитики, а не добавляться на всякий случай. Лишние
polyfills увеличивают bundle size и могут ухудшать startup performance.

</td></tr></table>

</details>

<details>
<summary>Почему third-party scripts нужно контролировать?</summary><br>
<table><tr><td>

Third-party scripts влияют на performance, security, privacy и стабильность приложения. Analytics, maps, chats, A/B
tools и widgets часто грузятся вне основного lifecycle приложения. Их нужно инвентаризировать, ограничивать, мониторить
и по возможности загружать лениво или после согласия пользователя.

</td></tr></table>

</details>

<details>
<summary>Зачем команде договариваться о JavaScript commenting?</summary><br>
<table><tr><td>

Комментарии должны объяснять причину решения, ограничение, invariant или важный edge case, а не очевидный синтаксис.
Если код требует много комментариев, возможно, его стоит упростить. Для публичных API, shared utilities и сложной
бизнес-логики полезны JSDoc или TSDoc, если они поддерживаются командным workflow.

</td></tr></table>

</details>

<details>
<summary>Что значит следовать JavaScript patterns?</summary><br>
<table><tr><td>

Это значит использовать узнаваемые подходы к организации кода: modules, factories, observers, adapters, dependency
injection, immutable updates и другие patterns. Pattern полезен, когда упрощает понимание и расширение кода. Если он
добавляет только церемонию и не решает реальную проблему, maintainability ухудшается.

</td></tr></table>

</details>

<details>
<summary>Как работает <code>this</code> в JavaScript?</summary><br>
<table><tr><td>

`this` определяется способом вызова функции: как method, через `call`/`apply`/`bind`, через `new` или как обычная
функция. В strict mode обычный вызов дает `undefined`, а не global object. Для Angular это важно, когда class method
передают callback без привязки контекста.

</td></tr></table>

</details>

<details>
<summary>Как arrow function меняет поведение <code>this</code>?</summary><br>
<table><tr><td>

Arrow function не имеет собственного `this`, `arguments` и `prototype`; она лексически берет `this` из внешней области.
Это удобно для callbacks, где нужно сохранить context, но плохо подходит для prototype methods и constructors. В class
fields arrow methods создаются на instance, а не на prototype.

</td></tr></table>

</details>

<details>
<summary>Чем <code>null</code>, <code>undefined</code> и undeclared variable отличаются?</summary><br>
<table><tr><td>

`undefined` означает, что значение не было задано или свойство отсутствует. `null` обычно явно выражает пустое значение.
Undeclared variable вообще не объявлена в доступной области; чтение такой переменной вызывает `ReferenceError`, кроме
безопасной проверки через `typeof`.

</td></tr></table>

</details>

<details>
<summary>Какие способы итерации по массивам и объектам есть в JavaScript?</summary><br>
<table><tr><td>

Для массивов используют `for`, `for...of`, `forEach`, `map`, `filter`, `reduce`, `some`, `every`, `find` и другие
методы. Для объектов часто применяют `Object.keys`, `Object.values`, `Object.entries` или `for...in` с проверкой own
properties. Выбор должен выражать намерение: преобразование, поиск, проверку или побочный эффект.

</td></tr></table>

</details>

<details>
<summary>Чем <code>forEach()</code> отличается от <code>map()</code>?</summary><br>
<table><tr><td>

`forEach()` выполняет callback ради побочного эффекта и возвращает `undefined`. `map()` возвращает новый массив той же
длины с результатами преобразования. Если результат не используется, `map()` обычно выбран неправильно.

</td></tr></table>

</details>

<details>
<summary>Когда использовать anonymous function?</summary><br>
<table><tr><td>

Anonymous function уместна для короткого одноразового callback, когда имя не добавляет смысла. Для сложной логики,
recursion, stack traces и тестирования лучше именованная функция. В review хороший критерий простой: понятно ли действие
из окружающего кода без отдельного имени.

</td></tr></table>

</details>

<details>
<summary>Что происходит при вызове функции с <code>new</code>?</summary><br>
<table><tr><td>

`new` создает новый объект, связывает его prototype с `Constructor.prototype`, вызывает функцию с `this`, указывающим на
новый объект, и возвращает этот объект, если constructor явно не вернул другой объект. Вызов constructor без `new` может
сломать `this` или вернуть обычный результат функции.

</td></tr></table>

</details>

<details>
<summary>Чем function declaration отличается от function expression?</summary><br>
<table><tr><td>

Function declaration поднимается целиком и доступна до места объявления. Function expression создается во время
выполнения выражения; если она присвоена `const` или `let`, доступ до объявления попадает в temporal dead zone. Named
function expression улучшает stack traces.

</td></tr></table>

</details>

<details>
<summary>Чем feature detection отличается от проверки user agent?</summary><br>
<table><tr><td>

Feature detection проверяет наличие нужной возможности, например через `CSS.supports()` или
`'IntersectionObserver' in window`. User agent sniffing пытается угадать браузер по строке и часто ломается из-за
spoofing, версий и embedded webviews. Проверка возможности обычно надежнее и лучше сочетается с progressive enhancement.

</td></tr></table>

</details>

<details>
<summary>Почему <code>==</code> может быть опасен?</summary><br>
<table><tr><td>

`==` сравнивает значения после неявного преобразования типов, что дает неожиданные результаты вроде `'' == 0` и
`false == 0`. `===` сравнивает без такого приведения и обычно безопаснее. Исключения должны быть осознанными и
локальными, например проверка `value == null` для `null` или `undefined`.

</td></tr></table>

</details>

<details>
<summary>Чем HTML attribute отличается от DOM property?</summary><br>
<table><tr><td>

Attribute — текстовое значение в HTML-разметке, а DOM property — свойство объекта в памяти браузера. Некоторые значения
отражаются друг в друга, но не всегда одинаково: `input.value` меняется при вводе, а attribute `value` остается
начальным. В Angular property binding `[value]` обычно работает с DOM property, а attribute binding `[attr.aria-label]`
пишет attribute.

</td></tr></table>

</details>

<details>
<summary>Почему не стоит расширять built-in prototypes?</summary><br>
<table><tr><td>

Добавление методов в `Array.prototype` или `Object.prototype` может конфликтовать с будущими стандартами, библиотеками и
чужим кодом. Такие изменения глобальны и трудны для диагностики. Лучше использовать обычные функции, modules или
локальные wrappers.

</td></tr></table>

</details>

<details>
<summary>Какие плюсы и минусы у языков, которые компилируются в JavaScript?</summary><br>
<table><tr><td>

TypeScript, Elm, ClojureScript и другие языки могут дать типы, иные модели архитектуры и tooling. Цена — build step,
source maps, зависимость от компилятора и необходимость понимать итоговый JavaScript при debugging. Для Angular
TypeScript является стандартным выбором, но runtime-поведение все равно определяется JavaScript и браузером.

</td></tr></table>

</details>

<details>
<summary>Какие плюсы и минусы у immutability?</summary><br>
<table><tr><td>

Плюсы: проще reasoning, undo/redo, memoization, change detection и тестирование. Минусы: дополнительные allocations,
копирование больших структур и необходимость дисциплины при вложенных обновлениях. На практике immutable updates часто
сочетают с нормализованными данными и точечным controlled mutation внутри локального алгоритма.

</td></tr></table>

</details>

<details>
<summary>Чем synchronous и asynchronous functions отличаются?</summary><br>
<table><tr><td>

Synchronous function выполняется до завершения в текущей task и блокирует следующий код. Asynchronous function планирует
продолжение через Promise, callback, timer, event или stream, позволяя event loop выполнять другие задачи. Асинхронность
не означает parallelism: CPU-heavy работа все равно может блокировать main thread.

</td></tr></table>

</details>

<details>
<summary>Можно ли изменить объект, объявленный через <code>const</code>?</summary><br>
<table><tr><td>

`const` запрещает переназначить binding, но не делает объект immutable. Свойства объекта или элементы массива можно
изменить, если сам объект не заморожен и property descriptors позволяют запись. Для защиты используют `Object.freeze`,
readonly types в TypeScript и дисциплину immutable updates.

</td></tr></table>

</details>

<details>
<summary>Чем ES6 class отличается от ES5 constructor function?</summary><br>
<table><tr><td>

ES6 `class` дает более строгий и читаемый синтаксис для constructor, prototype methods, inheritance, `super`, static
members и private fields. Под капотом methods все равно живут на prototype. Class нельзя вызвать без `new`, а class body
всегда strict mode.

</td></tr></table>

</details>

<details>
<summary>Чем spread отличается от rest?</summary><br>
<table><tr><td>

Spread раскладывает iterable или свойства объекта в месте вызова или создания значения: `fn(...args)`, `[...items]`.
Rest собирает оставшиеся аргументы или свойства в одну переменную: `function fn(...args)` или `const {id, ...rest}`.
Одинаковый синтаксис `...` означает противоположные направления данных в зависимости от контекста.

</td></tr></table>

</details>

<details>
<summary>Как делить код между файлами?</summary><br>
<table><tr><td>

В modern JavaScript используют ES modules: `export` и `import`. Module scope не загрязняет global object, а bundler
может делать tree shaking и code splitting. В Angular это основа lazy routes, standalone components и разделения feature
code.

</td></tr></table>

</details>

<details>
<summary>Для чего нужны static class members?</summary><br>
<table><tr><td>

Static members принадлежат class constructor, а не instance. Их используют для factories, constants, cache, utility
methods и metadata, которая относится к типу в целом. Важно не превращать static state в скрытое глобальное состояние,
которое мешает тестам и SSR.

</td></tr></table>

</details>

<details>
<summary>Чем <code>while</code> отличается от <code>do while</code>?</summary><br>
<table><tr><td>

`while` проверяет условие перед первой итерацией, поэтому тело может не выполниться ни разу. `do while` выполняет тело
сначала и проверяет условие после, значит минимум одна итерация будет всегда. В прикладном коде важно явно показать exit
condition, чтобы цикл не стал бесконечным.

</td></tr></table>

</details>

<details>
<summary>Чем <code>event.target</code> отличается от <code>event.currentTarget</code>?</summary><br>
<table><tr><td>

`event.target` — исходный элемент, на котором произошло событие. `event.currentTarget` — элемент, чей обработчик
выполняется сейчас. При bubbling и event delegation эти значения часто разные.

</td></tr></table>

</details>

<details>
<summary>Чем <code>preventDefault()</code> отличается от <code>stopPropagation()</code>?</summary><br>
<table><tr><td>

`preventDefault()` отменяет browser default action, например отправку формы или переход по ссылке. `stopPropagation()`
останавливает дальнейшее распространение события по DOM. Эти методы решают разные задачи и не должны использоваться
автоматически в каждом обработчике.

</td></tr></table>

</details>

<details>
<summary>Что такое generator function и когда она полезна?</summary><br>
<table><tr><td>

Generator function объявляется через `function*` и может приостанавливать выполнение оператором `yield`. Ее вызов
возвращает iterator, у которого метод `next()` продолжает функцию до следующего `yield` и возвращает объект с полями
`value` и `done`.

Генераторы полезны для ленивых последовательностей, обхода сложных структур и реализации custom iterable без создания
всей коллекции в памяти. Для обычной асинхронной логики чаще понятнее `async`/`await`; для асинхронного потока значений
существуют async generators и `for await...of`.

</td></tr></table>

</details>

<details>
<summary>Как правильно обрабатывать исключения в JavaScript?</summary><br>
<table><tr><td>

Синхронные исключения обрабатывают через `try`/`catch`/`finally`, а Promise rejection — через `await` внутри `try` или
через `.catch()`. В `catch` значение ошибки следует считать `unknown`: JavaScript позволяет выбросить не только
экземпляр `Error`.

Ловить ошибку стоит там, где код может добавить контекст, восстановиться или преобразовать ее в понятный результат.
Пустой `catch` скрывает дефект. `finally` подходит для освобождения ресурсов и выполняется независимо от результата, но
возврат из `finally` может затереть исходный результат или исключение.

</td></tr></table>

</details>

<details>
<summary>Чем private fields класса отличаются от обычных свойств?</summary><br>
<table><tr><td>

Поле с именем `#value` имеет runtime-приватность: обратиться к нему можно только из тела объявившего его класса. Оно не
является обычным строковым свойством, не доступно через bracket notation и не перечисляется методами вроде
`Object.keys()`.

Обычное свойство с соглашением `_value` остается публичным. TypeScript-модификатор `private` без `#` обычно защищает
доступ только во время проверки типов и не создает такую же runtime-границу. Private fields полезны для настоящего
инварианта класса, но чрезмерная скрытость может усложнить композицию и тестирование.

</td></tr></table>

</details>

<details>
<summary>Когда использовать Web Worker?</summary><br>
<table><tr><td>

Web Worker выполняет JavaScript в отдельном потоке и подходит для CPU-bound работы: парсинга больших данных, сложных
вычислений или обработки изображений. Это помогает не блокировать main thread и пользовательский ввод.

Worker не имеет прямого доступа к DOM. Page и worker обмениваются сообщениями через `postMessage`; данные обычно
копируются structured clone algorithm, а transferable objects можно передать без копирования. Worker не ускоряет network
request сам по себе, а расходы на запуск и передачу данных делают его невыгодным для мелких операций.

</td></tr></table>

</details>

<details>
<summary>Чем <code>localStorage</code> отличается от <code>sessionStorage</code>?</summary><br>
<table><tr><td>

Оба API хранят строки в рамках origin и работают синхронно. `localStorage` сохраняется между сессиями браузера, а
`sessionStorage` привязан к конкретной вкладке и очищается после завершения ее сессии.

Изменение storage может вызвать событие `storage` в других документах того же origin, но не в документе, выполнившем
запись. Эти хранилища не подходят для секретов: JavaScript страницы может прочитать их при XSS. Для больших объемов и
асинхронной работы лучше IndexedDB.

</td></tr></table>

</details>

<details>
<summary>Когда WebSocket лучше обычных HTTP-запросов?</summary><br>
<table><tr><td>

WebSocket создает долговременный двусторонний канал между клиентом и сервером. Он полезен для чатов, совместного
редактирования, игр и других сценариев, где обе стороны часто отправляют события с низкой задержкой.

Для редких запросов обычный HTTP проще, легче кешируется и дешевле в эксплуатации. WebSocket-протокол приложения должен
сам определить формат сообщений, authentication, heartbeat, reconnect с backoff, восстановление пропущенных событий и
backpressure. Само открытое соединение не гарантирует доставку бизнес-события ровно один раз.

</td></tr></table>

</details>

<details>
<summary>Как выбирать JavaScript framework или library для проекта?</summary><br>
<table><tr><td>

Framework или library выбирают по задаче, экосистеме, поддержке команды, долгосрочной maintainability, performance и
стоимости миграции. Хороший ответ сравнивает не только developer experience, но и риски: lock-in, bundle size,
тестируемость, accessibility, SSR и доступность специалистов.

</td></tr></table>

</details>

<details>
<summary>Чем call stack отличается от task queue?</summary><br>
<table><tr><td>

Call stack хранит текущую цепочку синхронных вызовов. Task queue содержит задачи, которые event loop возьмет позже:
timers, events, network callbacks. Promise callbacks попадают в microtask queue и выполняются после текущего stack перед
следующей macrotask.

</td></tr></table>

</details>

### JavaScript coding questions

<details>
<summary>Что вернет <code>10 + '20'</code> и почему?</summary><br>
<table><tr><td>

Выражение вернет строку `'1020'`. Оператор `+` с участием строки выполняет string concatenation, поэтому число `10`
приводится к строке. Для числового сложения нужно явно преобразовать строку: `10 + Number('20')`.

</td></tr></table>

</details>

<details>
<summary>Почему <code>0.1 + 0.2 === 0.3</code> возвращает <code>false</code>?</summary><br>
<table><tr><td>

Десятичные дроби `0.1` и `0.2` нельзя точно представить в binary floating point IEEE 754. Результат равен
`0.30000000000000004`, поэтому строгое сравнение с `0.3` ложно. Для денег используют целые minor units или decimal
подход, а для display — округление.

</td></tr></table>

</details>

<details>
<summary>Реализуйте <code>add(2, 5)</code> и <code>add(2)(5)</code>.</summary><br>
<table><tr><td>

Функция может проверить, передан ли второй аргумент, и вернуть либо сумму, либо функцию, ожидающую второй операнд.

```js
function add(first, second) {
  if (second !== undefined) {
    return first + second;
  }

  return (next) => first + next;
}
```

Такой пример проверяет closures, arity и аккуратное отношение к falsy values.

</td></tr></table>

</details>

<details>
<summary>Как развернуть строку через <code>split</code>, <code>reverse</code>, <code>join</code> и какие ограничения у такого подхода?</summary><br>
<table><tr><td>

Базовый вариант:

```js
const reversed = 'hello'.split('').reverse().join('');
```

Он работает для простых BMP-символов, но может ломать emoji, surrogate pairs и combining marks. Для пользовательского
текста лучше учитывать Unicode grapheme clusters, например через `Intl.Segmenter`, если это важно для продукта.

</td></tr></table>

</details>

<details>
<summary>Что делает выражение <code>window.foo || (window.foo = 'bar')</code>?</summary><br>
<table><tr><td>

Если `window.foo` truthy, выражение вернет его значение и присваивание не выполнится из-за short-circuit. Если значение
falsy, будет выполнено присваивание `'bar'`, и результатом станет `'bar'`. Такой прием короткий, но в application code
часто понятнее явный `if` или `??=`, если нужно учитывать только `null` и `undefined`.

</td></tr></table>

</details>

<details>
<summary>Почему переменная из IIFE недоступна снаружи?</summary><br>
<table><tr><td>

IIFE создает собственную function scope, поэтому переменные внутри нее не попадают во внешнюю область. До ES modules и
`let`/`const` это часто использовали для инкапсуляции и защиты от global pollution.

```js
(function () {
  const secret = 42;
})();
```

</td></tr></table>

</details>

<details>
<summary>Что будет с <code>foo.length</code> после двух <code>push</code>?</summary><br>
<table><tr><td>

Если `foo` — массив, каждый `push` добавляет элемент в конец и увеличивает `length` на 1. Метод возвращает новую длину
массива. Например, после `const foo = []; foo.push(1); foo.push(2);` значение `foo.length` будет `2`.

</td></tr></table>

</details>

<details>
<summary>Что произойдет в выражении <code>foo.x = foo = {n: 2}</code>?</summary><br>
<table><tr><td>

Левая ссылка `foo.x` вычисляется до переназначения `foo`. Затем `foo` начинает указывать на новый объект `{n: 2}`, а
свойство `x` записывается в старый объект, на который `foo` больше не указывает. Пример проверяет порядок вычисления
assignment expressions и отличие ссылки на объект от переменной.

</td></tr></table>

</details>

<details>
<summary>В каком порядке выведутся <code>console.log</code>, <code>setTimeout</code> и <code>Promise.then</code>?</summary><br>
<table><tr><td>

```js
console.log('one');

setTimeout(() => {
  console.log('two');
}, 0);

Promise.resolve().then(() => {
  console.log('three');
});

console.log('four');
```

Порядок: `one`, `four`, `three`, `two`. Сначала выполняется синхронный код, затем microtask из `Promise.then`, затем
macrotask из `setTimeout`.

</td></tr></table>

</details>

<details>
<summary>Чем отличаются promise chain с <code>return</code>, без <code>return</code>, с вызовом функции и с передачей функции?</summary><br>
<table><tr><td>

Если `then` возвращает Promise или значение, следующий шаг ждет и получает этот результат. Если `return` забыли,
следующий `then` продолжится с `undefined` и не дождется вложенной async-операции. `then(doWork)` передает функцию для
будущего вызова, а `then(doWork())` вызывает ее сразу и передает результат.

</td></tr></table>

</details>

<details>
<summary>Почему <code>var a = b = 3</code> может создать implicit global?</summary><br>
<table><tr><td>

Выражение читается как `var a = (b = 3)`. Если `b` не объявлена, в sloppy mode присваивание создаст global property, что
приводит к утечке состояния. В strict mode такой код выбросит `ReferenceError`, поэтому переменные нужно объявлять явно.

</td></tr></table>

</details>

<details>
<summary>Почему <code>return</code> и объект на следующей строке могут сломаться из-за ASI?</summary><br>
<table><tr><td>

Automatic Semicolon Insertion вставит semicolon после `return`, если expression начинается на следующей строке. Функция
вернет `undefined`, а object literal станет отдельным недостижимым блоком. Объект нужно писать на той же строке или
оборачивать перенос правильно.

```js
function getUser() {
  return {
    name: 'Max',
  };
}
```

</td></tr></table>

</details>

<details>
<summary>Реализуйте <code>duplicate([1, 2, 3])</code>, чтобы получить <code>[1, 2, 3, 1, 2, 3]</code>.</summary><br>
<table><tr><td>

```js
function duplicate(items) {
  return [...items, ...items];
}
```

Это shallow copy: вложенные объекты не клонируются, а остаются теми же ссылками.

</td></tr></table>

</details>

<details>
<summary>Реализуйте FizzBuzz до 100.</summary><br>
<table><tr><td>

```js
for (let value = 1; value <= 100; value += 1) {
  const isFizz = value % 3 === 0;
  const isBuzz = value % 5 === 0;

  if (isFizz && isBuzz) {
    console.log('fizzbuzz');
  } else if (isFizz) {
    console.log('fizz');
  } else if (isBuzz) {
    console.log('buzz');
  } else {
    console.log(value);
  }
}
```

Задача проверяет порядок условий, modulo и читаемую структуру ветвлений.

</td></tr></table>

</details>

<details>
<summary>Что вернут выражения <code>'hello' || 'world'</code> и <code>'foo' && 'bar'</code>?</summary><br>
<table><tr><td>

`'hello' || 'world'` вернет `'hello'`, потому что `||` возвращает первое truthy значение. `'foo' && 'bar'` вернет
`'bar'`, потому что `&&` возвращает первое falsy значение или последний operand, если все truthy. Эти операторы
возвращают исходные значения, а не обязательно boolean.

</td></tr></table>

</details>

<details>
<summary>Напишите IIFE и объясните, зачем она раньше использовалась.</summary><br>
<table><tr><td>

```js
(function () {
  const localValue = 'hidden';

  window.appName = 'Demo';
})();
```

IIFE выполняется сразу и создает отдельную scope для локальных переменных. До ES modules ее часто использовали, чтобы не
загрязнять global scope и скрывать implementation details.

</td></tr></table>

</details>

### Практика по JavaScript

<details>
<summary>Реализуйте <code>chunk(array, size)</code>.</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>

<details>
<summary>Реализуйте retry для асинхронной операции.</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>

<details>
<summary>Реализуйте простой <code>EventEmitter</code>.</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>

<details>
<summary>Реализуйте безопасное чтение значения по строковому пути.</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>

<details>
<summary>Как реализовать polyfill для <code>Promise.all</code>?</summary><br>
<table><tr><td>

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

</td></tr></table>

</details>
