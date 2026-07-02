## TypeScript

<details>
<summary>Зачем нам нужны определения типов, где есть JavaScript c динамической типизацией?</summary><br>
<table><tr><td>

**Уровень:** Middle

Динамическая типизация удобна во время выполнения, но многие ошибки можно обнаружить раньше:

- неправильное имя свойства;
- передача аргумента неверного типа;
- забытая обработка `null`;
- несовместимое изменение публичного API.

TypeScript добавляет статический анализ, автодополнение, безопасный рефакторинг и явные контракты между частями
приложения. Типы не заменяют runtime-валидацию: данные от API, пользователя и внешних систем все равно считаются
недоверенными и должны проверяться.

После компиляции большинство типов удаляется, а браузер выполняет обычный JavaScript.

</td></tr></table>

</details>

<details>
<summary>Что такое пользовательский тип данных</summary><br>
<table><tr><td>

**Уровень:** Junior

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

</td></tr></table>

</details>

<details>
<summary>Что такое Union Type (тип объединения) и для чего используется?</summary><br>
<table><tr><td>

**Уровень:** Junior

Union type означает, что значение может принадлежать одному из нескольких типов:

```ts
type RequestState<T> =
  | {status: 'idle'}
  | {status: 'loading'}
  | {status: 'success'; data: T}
  | {status: 'error'; error: string};
```

Перед использованием специфичных свойств union нужно сузить тип через `typeof`, `instanceof`, оператор `in`, проверку
discriminant-поля или type guard.

Discriminated union часто лучше набора независимых boolean-флагов: он не позволяет одновременно представить
несовместимые состояния, например `loading` и `success`.

</td></tr></table>

</details>

<details>
<summary>Поддерживает ли TypeScript перегрузку методов?</summary><br>
<table><tr><td>

**Уровень:** Middle

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

</td></tr></table>

</details>

<details>
<summary>Возможна ли перегрузка конструктора в TypeScript?</summary><br>
<table><tr><td>

**Уровень:** Middle

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

</td></tr></table>

</details>

<details>
<summary>Поддерживает ли TypeScript перегрузку методов (конструкторов)?</summary><br>
<table><tr><td>

**Уровень:** Middle

TypeScript поддерживает перегрузку функций, методов и конструкторов на уровне типов. Сначала объявляются доступные
вызывающему коду сигнатуры, затем одна совместимая реализация.

В скомпилированном JavaScript остается одна функция или один конструктор. Поэтому перегрузка не выбирает разные
реализации автоматически: код должен сам сузить аргументы.

Перегрузки нужны, когда разные наборы аргументов дают разные, точно связанные возвращаемые типы. Для простых случаев
предпочтительнее union types, optional-параметры или объект параметров.

</td></tr></table>

</details>

<details>
<summary>Что такое декоратор и какие виды декораторов вы знаете?</summary><br>
<table><tr><td>

**Уровень:** Junior

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

</td></tr></table>

</details>

### Продвинутый TypeScript

<details>
<summary>Чем type отличается от interface и что такое intersection type?</summary><br>
<table><tr><td>

**Уровень:** Middle

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

</td></tr></table>

</details>

<details>
<summary>Что такое generics, generic constraints и keyof?</summary><br>
<table><tr><td>

**Уровень:** Middle+

Generic позволяет сохранить связь между входными и выходными типами:

```ts
function getProperty<T extends object, K extends keyof T>(value: T, key: K): T[K] {
  return value[key];
}
```

`T extends object` — constraint, ограничивающий допустимые типы. `keyof T` создает union ключей объекта, а `T[K]`
получает тип конкретного свойства.

Generics нужны для reusable API, но не должны превращать простой код в сложную type-level программу.

</td></tr></table>

</details>

<details>
<summary>Что такое mapped, conditional types и infer?</summary><br>
<table><tr><td>

**Уровень:** Middle+

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

</td></tr></table>

</details>

<details>
<summary>Чем satisfies отличается от as?</summary><br>
<table><tr><td>

**Уровень:** Middle+

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

</td></tr></table>

</details>

<details>
<summary>Почему unknown безопаснее any и как писать type guards?</summary><br>
<table><tr><td>

**Уровень:** Middle+

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

</td></tr></table>

</details>

<details>
<summary>Как типизировать состояние, API response и конфигурацию Angular-компонента?</summary><br>
<table><tr><td>

**Уровень:** Middle

Для состояний удобен discriminated union:

```ts
type LoadState<T> =
  | {status: 'idle'}
  | {status: 'loading'}
  | {status: 'success'; data: T}
  | {status: 'error'; error: string};
```

API DTO отделяют от доменной модели и преобразуют на data-access границе. Inputs типизируют максимально узко:

```ts
readonly user = input.required<Pick<User, "id" | "name">>();
```

Конфигурации проверяют через `satisfies`, readonly properties и explicit defaults. Generic-компонент оправдан, когда тип
элемента должен проходить через inputs, templates и outputs без потери связи.

</td></tr></table>

</details>

<details>
<summary>Как типами описать дерево в TypeScript?</summary><br>
<table><tr><td>

**Уровень:** Middle

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

</td></tr></table>

</details>

<details>
<summary>Как типизировать граф или dependency graph?</summary><br>
<table><tr><td>

**Уровень:** Middle+

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

</td></tr></table>

</details>

<details>
<summary>Когда generic data structure оправдана?</summary><br>
<table><tr><td>

**Уровень:** Middle+

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

</td></tr></table>

</details>

<details>
<summary>Зачем использовать readonly-типы для структур данных?</summary><br>
<table><tr><td>

**Уровень:** Middle

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

</td></tr></table>

</details>

### TypeScript и runtime-контракты

<details>
<summary>Почему generic type parameter не дает runtime safety?</summary><br>
<table><tr><td>

**Уровень:** Middle+

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

</td></tr></table>

</details>

<details>
<summary>Чем generic constraints отличаются от intersection types?</summary><br>
<table><tr><td>

**Уровень:** Middle

`T extends Constraint` ограничивает допустимые типы для generic и разрешает обращаться к полям constraint внутри
функции. `T & Constraint` создает новый intersection type, который требует свойства обеих частей у итогового значения.

```ts
function byId<T extends {readonly id: string}>(items: ReadonlyArray<T>): ReadonlyMap<string, T> {
  return new Map(items.map((item) => [item.id, item]));
}
```

Constraint говорит: "принимаю любой тип, но у него должен быть `id`". Intersection чаще используют, когда нужно описать
комбинированную форму данных. На интервью важно не заменять constraint на широкое assertion.

</td></tr></table>

</details>

<details>
<summary>Как типизировать тестовые double без <code>any</code>?</summary><br>
<table><tr><td>

**Уровень:** Middle

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

</td></tr></table>

</details>

<details>
<summary>Когда нужны declaration files <code>.d.ts</code>?</summary><br>
<table><tr><td>

**Уровень:** Middle

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

</td></tr></table>

</details>
