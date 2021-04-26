## Вопросы на собеседовании по Angular [![Angular-RU](https://img.shields.io/badge/Telegram_chat:-Angular_RU-216bc1.svg?style=flat)](https://t.me/angular_ru)

Вопросы подготовлены непосредственно для того, чтобы определить уровень разработчика, насколько глубоко, поверхностно или сносно он знает Angular. Вопросы для собеседования на знание JavaScript или Web-стека хорошо освещены в других местах, поэтому ниже будет добавлен список ресурсов по этой теме:

**Fundamentals**:

- [Coding Interview University](https://github.com/jwasham/coding-interview-university)
- [Awesome Interviews](https://github.com/alex/what-happens-when)
- [Angular Interview Questions](https://github.com/sudheerj/angular-interview-questions)

**Frontend**:

- [Front-end Job Interview Questions](https://github.com/h5bp/Front-end-Developer-Interview-Questions)
- [The Best Frontend JavaScript Interview Questions](<https://performancejs.com/post/hde6d32/The-Best-Frontend-JavaScript-Interview-Questions-(Written-by-a-Frontend-Engineer)>)
- [Frontend Guidelines Questionnaire](https://github.com/bradfrost/frontend-guidelines-questionnaire)
- [Подготовка к интервью на Front-end разработчика](https://proglib.io/p/frontend-interview/)

**Angular**:

- [Angular Interview Questions by Google Developer Expert](https://github.com/Yonet/Angular-Interview-Questions)

##### Базовые вопросы для Junior/Middle

<details>
<summary>В чем отличие фреймворка от библиотеки (приведите примеры и отличия)?</summary>
<div>
  in progress..
</div>
</details>

<details>
<summary>Какие популярные CSS, JS библиотеки вы знаете?</summary>
<div>
  in progress..
</div>
</details>

<details>
<summary>Знаете ли вы как браузер обрабатывает index.html (расскажите про Critical Rendering Path)?</summary>
<div>
  in progress..
</div>
</details>

<details>
<summary>Какие типы данных есть в JavaScript?</summary>
<div>
  in progress..
</div>
</details>

<details>
<summary>Как устроена память в JavaScript (memory heap, memory stack)?</summary>
<div>
  in progress..
</div>
</details>

<details>
<summary>Что такое this и расскажите про область видимости?</summary>
<div>
  in progress..
</div>
</details>

<details>
<summary>В чем отличие var от const, let?</summary>
<div>
  in progress..
</div>
</details>

<details>
<summary>Объясните, как работает наследование прототипов, что такое цепочка прототипов, и когда появилось ключевое слова class в JS?</summary>
<div>
  in progress..
</div>
</details>

<details>
<summary>Что такое структура данных и какие виды вы знаете (Стек, etc)?</summary>
<div>
  in progress..
</div>
</details>

<details>
<summary>Что такое Promise и для чего используется в JS?</summary>
<div>
  in progress..
</div>
</details>

<details>
<summary>Что такое call-stack, task-queue (приведите примеры работы)?</summary>
<div>
  in progress..
</div>
</details>

<details>
<summary>Что такое макро и микро задачи в JS?</summary>
<div>
  in progress..
</div>
</details>

<details>
<summary>Назовите основные принципы ООП?</summary>
<div>
  in progress..
</div>
</details>

<details>
<summary>Что такое класс и интерфейс?</summary>
<div>
  in progress..
</div>
</details>

<details>
<summary>Что такое конструктор класса?</summary>
<div>
  in progress..
</div>
</details>

<details>
<summary>Расскажите про стек TCP/IP, а также более подробно про, что такое HTTP и какую роль он играет при разработке приложений?</summary>
<div>
  in progress..
</div>
</details>

<details>
<summary>Что такое REST API, как происходит взаимодействие (расскажите про основные коды ошибок, заголовки пакетов и способы их отправки)?</summary>
<div>
  in progress..
</div>
</details>

##### Основны TypeScript

<details>
<summary>Зачем нам нужны определения типов, где есть JavaScript c динамической типизацией?</summary>
<div>
  in progress..
</div>
</details>

<details>
<summary>Что такое пользовательский тип данных</summary>
<div>
  in progress..
</div>
</details>

<details>
<summary>Что такое Union Type (тип объединения) и для чего используется?</summary>
<div>
  in progress..
</div>
</details>

<details>
<summary>Поддерживает ли TypeScript перегрузку методов?</summary>
<div>
  in progress..
</div>
</details>

<details>
<summary>Возможна ли перегрузка конструктора в TypeScript?</summary>
<div>
  in progress..
</div>
</details>

<details>
<summary>Поддерживает ли TypeScript перегрузку методов (конструкторов)?</summary>
<div>
  in progress..
</div>
</details>

<details>
<summary>Что такое декоратор и какие виды декораторов вы знаете?</summary>

<br>

Декоратор — способ добавления метаданных к объявлению класса. Это специальный вид объявления, который может быть присоединен к объявлению класса, методу, методу доступа, свойству или параметру. <br>
<br>Декораторы используют форму @expression, где expression - функция, которая будет вызываться во время выполнения с информацией о декорированном объявлении.<br>
<br>И, чтобы написать собственный декоратор, нам нужно сделать его factory и определить тип:

  <ul>
    <li>ClassDecorator</li>
    <li>PropertyDecorator</li>
    <li>MethodDecorator</li>
    <li>ParameterDecorator</li>
  </ul>
    
  <b>Декоратор класса</b>
  <div>

Вызывается перед объявлением класса, применяется к конструктору класса и может использоваться для наблюдения, изменения или замены определения класса. Expression декоратора класса будет вызываться как функция во время выполнения, при этом конструктор декорированного класса является единственным аргументом. Если класс декоратора возвращает значение, он заменит объявление класса вернувшимся значением. <br>

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
    console.log(`New: ${original["name"]} is created`);
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
console.log("emp instanceof Employee");
//emp instanceof Employee
console.log(emp instanceof Employee);
//true
```

  </div>
  
  <br><b>Декоратор свойства</b>
  
  <div>
  
  Объявляется непосредственно перед объявлением метода. Будет вызываться как функция во время выполнения со следующими двумя аргументами:
 
  <ul>
    <li>target - прототип текущего объекта, т.е. если Employee является объектом, Employee.prototype</li>
    <li>propertyKey - название свойства</li>
  </ul>

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
emp.name = "Mohan Ram";
console.log(emp.name);

// Set: name => Mohan Ram
// Get: name => Mohan Ram
// Mohan Ram
```

  </div>
  
  <br><b>Декоратор метода</b>
 
  <div>
  
  Объявляется непосредственно перед объявлением метода. Будет вызываться как функция во время выполнения со следующими двумя аргументами:
 
  <ul>
    <li>target - прототип текущего объекта, т.е. если Employee является объектом, Employee.prototype</li>
    <li>propertyName - название свойства</li>
    <li>descriptor - дескриптор свойства метода т.е. - Object.getOwnPropertyDescriptor (Employee.prototype, propertyName)</li>
  </ul>
 
   ```ts
    export function logMethod(
        target: Object,
        propertyName: string,
        propertyDescriptor: PropertyDescriptor): PropertyDescriptor {
        const method = propertyDescriptor.value;
    
        propertyDescriptor.value = function (...args: any[]) {
    
            // Конвертация списка аргументов greet в строку
            const params = args.map(a => JSON.stringify(a)).join();
    
            // Вызов greet() и получение вернувшегося значения
            const result = method.apply(this, args);
    
            // Конвертация результата в строку
            const r = JSON.stringify(result);
    
            // Отображение в консоли деталей вызова
            console.log(`Call: ${propertyName}(${params}) => ${r}`);
    
            // Возвращение результата вызова
            return result;
        }
        return propertyDescriptor;
    }
    
    class Employee {
    
        constructor(
            private firstName: string,
            private lastName: string
        ) {
        }
    
        @logMethod
        greet(message: string): string {
            return `${this.firstName} ${this.lastName} says: ${message}`;
        }
    
    }
    
    const emp = new Employee('Mohan Ram', 'Ratnakumar');
    emp.greet('hello');
    //Call: greet("hello") => "Mohan Ram Ratnakumar says: hello"
   ```
   </div>
   
   <br><b>Декоратор параметра</b>

<div>

Объявляется непосредственно перед объявлением метода. Будет вызываться как функция во время выполнения со следующими двумя аргументами:

  <ul>
    <li>target - прототип текущего объекта, т.е. если Employee является объектом, Employee.prototype</li>
    <li>propertyKey - название свойства</li>
    <li>index - индекс параметра в массиве аргументов</li>
  </ul>
  
</div>

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
emp.greet("world");
```

</details>

##### Основные концепции

<details>
<summary>Что такое Angular?</summary>
<div><br>
<img src="https://d2eip9sf3oo6c2.cloudfront.net/series/square_covers/000/000/033/thumb/egghead-angular-material-course-sq.png" align="left" alt=""><p><b>Angular</b>&nbsp;&mdash; это платформа для разработки мобильных и&nbsp;десктопных веб-приложений. Наши приложения теперь представляют из&nbsp;себя &laquo;толстый клиент&raquo;, где управление отображением и&nbsp;часть логики перенесены на&nbsp;сторону браузера. Так сервер уделяет больше времени доставке данных, плюс пропадает необходимость в&nbsp;постоянной перерисовке. С&nbsp;Angular мы&nbsp;описываем структуру приложения декларативно, а&nbsp;с&nbsp;TypeScript начинаем допускать меньше ошибок, благодаря статической типизации. В&nbsp;Angular присутствует огромное количество возможностей из&nbsp;коробки. Это может быть одновременно и&nbsp;хорошо и&nbsp;плохо, в&nbsp;зависимости от&nbsp;того, что вам необходимо.</p><hr>
  
<b>Какие плюсы можно выделить</b>:
<ul>
  <li>Поддержка Google, Microsoft</li>
  <li>Инструменты разработчика (CLI)</li>
  <li>Typescript из коробки</li>
  <li>Реактивное программирование с RxJS</li>
  <li>Единственный фреймворк с Dependency Injection из коробки</li>
  <li>Шаблоны, основанные на расширении HTML</li>
  <li>Кроссбраузерный Shadow DOM из коробки (либо его эмуляция) </li>
  <li>Кроссбраузерная поддержка HTTP, WebSockets, Service Workers</li>
  <li>Не нужно ничего дополнительно настраивать. Больше никаких оберток. jQuery плагины и D3 можно использовать на прямую</li>
  <li>Более современный фреймворк, чем AngularJS (на уровне React, Vue)</li>
  <li>Большое комьюнити</li>
</ul>

<b>Минусы</b>:

<ul>
  <li>Выше порог вхождения из-за Observable (RxJS) и Dependency Injection</li>
  <li>Чтобы все работало хорошо и быстро нужно тратить время на дополнительные оптимизации 
    (он не супер быстрый, по умолчанию, но быстрее AngularJS во много раз)</li>
  <li>Если вы планируете разрабатывать большое enterprise-приложение, то в этом случае, у вас нет архитектуры из коробки - нужно добавлять Mobx, Redux, MVVM, CQRS/CQS или другой state-менеджер, чтобы потом не сломать себе мозг</li>
  <li>Angular-Universal имеет много подводных камней</li>
  <li>Динамическое создание компонентов оказывается нетривиальной задачей</li>
</ul>

</div>
</details>

<details>
<summary>В чем разница между AngularJS и Angular?</summary>
<div>
  
<br><b>AngularJS</b> является фреймворком, который может помочь вам в разработке Single Page Application. Он появился в 2009 году и с годами выяснилось, что имел много проблем. <b>Angular</b> (Angular 2+) же в свою очередь направлен на тоже самое, но дает больше преимуществ по сравнению с AngularJS 1.x, включая лучшую производительность, ленивую загрузку, более простой API, более легкую отладку.

<b>Что появилось в Angular</b>: <br>

<ul>
  <li>Angular ориентирован на мобильные платформы и имеет лучшую производительность</li>  
  <li>Angular имеет встроенные сервисы для поддержки интернационализации</li>
  <li>AngularJS проще настроить, чем Angular</li>
  <li>AngularJS использует контроллеры и $scope</li>
  <li>Angular имеет много способов определения локальных переменных</li>
  <li>В Angular новый синтаксис структурных директив (camelCase)</li>
  <li>Angular работает напрямую с свойствами и событиями DOM элементов</li>
  <li>Одностороннее связывание данных через [property]</li>
  <li>Двустороннее связывание данных через [(property)]</li>
  <li>Новый механизм DI, роутинга, запуска приложения</li>
</ul>

<b>Основные преимущества Angular</b>: <br>

<ul>
  <li>Обратная совместимость Angular 2, 4, 5, ..</li>
  <li>TypeScript с улучшенной проверкой типов</li>
  <li>Встроенный компилятор с режимами JIT и AOT (+сокращение кода)</li>
  <li>Встроенные анимации</li>
</ul>

</div>
</details>

<details>
<summary>Какой должна быть структура каталогов компонентов любого Angular приложения и почему?</summary>
<div>
  in progress..
</div>
</details>

<details>
<summary>Что такое MVVM и в чем разница перед MVC?</summary>
<div>
  <br> <b>MVVM</b> - шаблон проектирования архитектуры приложения. Состоит из 3 ключевых блоков: Model, View, ViewModel.
  <br>Отличие от MVС заключаются в: <br> <br>
  
  <li>View реагирует на действия пользователя и передает их во View Model через Data Binding.</li>
  <li>View Model, в отличие от контроллера в MVC, имеет особый механизм, автоматизирующий связь между View и связанными свойствами в ViewModel.</li>
  
  <br>Привязка данных между View и ViewModel может быть односторонней или двусторонней (one-way, two-way data-binding).
</div>
</details>

##### Angular Template синтаксис

<details>
<summary>Что такое интерполяция в Angular?</summary>
<div><br>
  
Разметка интерполяции с внедренными выражениями используется в Angular для присвоения данных текстовым нодам и значения аттрибутов. Например:
  
  ```html
    <a href="img/{{username}}.jpg">Hello {{username}}!</a>
  ```
  
<br>
</div>

</details>

<details>
<summary>Какие способы использования шаблонов в Angular вы знаете?</summary>
<div>
  in progress..
</div>
</details>

<details>
<summary>В чем разница между структурной и атрибутной директивой, назовите встроенные директивы?</summary>
<div>
  <br><li>Структурные директивы влияют на DOM и могут добавлять/удалять элементы  <br> (ng-template, NgIf, NgFor, NgSwitch, etc) </li>
  <li>Атрибутные директивы меняют внешний вид или поведение элементов, компонентов или других директив  <br> (NgStyle, NgClass, etc).</li>
</div>
</details>

<details>
<summary>Для чего нужны директивы ng-template, ng-container, ng-content?</summary>
<div>
  <h4>1. ng-template</h4>
  
  `<template>` — это механизм для отложенного рендера клиентского контента, который не отображается во время загрузки, но может быть инициализирован при помощи JavaScript. <br><br>
  Template можно представить себе как фрагмент контента, сохранённый для последующего использования в документе. Хотя парсер и обрабатывает содержимое элемента `template` во время загрузки страницы, он делает это только чтобы убедиться в валидности содержимого; само содержимое при этом не отображается. <br><br>
  
  `<ng-template>` - является имплементацией стандартного элемента template, данный элемент появился с четвертой версии Angular, это было сделано с точки зрения совместимости со встраиваемыми на страницу template элементами, которые могли попасть в шаблон ваших компонентов по тем или иным причинам. <br><br>

Пример:

```html
<div class="lessons-list" *ngIf="lessons else loading">...</div>

<ng-template #loading>
  <div>Loading...</div>
</ng-template>
```

  <h4>2. ng-container</h4>
  
  `<ng-container>` - это логический контейнер, который может использоваться для группировки узлов, но не отображается в дереве DOM как узел (node).

На самом деле структурные директивы (*ngIf, *ngFor, …) являются синтаксическим сахаром для наших шаблонов. В реальности, данные шаблоны трансформируются в такие конструкции:

```html
<ng-template [ngIf]="lessons" [ngIfElse]="loading">
   <div class="lessons-list">
     ...
   </div>
</div>

<ng-template #loading>
    <div>Loading...</div>
</ng-template>
```

Но что делать, если я хочу применить несколько структурных директив?
(спойлер: к сожалению, так нельзя сделать)

```html
<div class="lesson" *ngIf="lessons" *ngFor="let lesson of lessons">
  <div class="lesson-detail">{{lesson | json}}</div>
</div>
```

```
Uncaught Error: Template parse errors:
Can't have multiple template bindings on one element. Use only one attribute
named 'template' or prefixed with *
```

Но можно сделать так:

```html
<div *ngIf="lessons">
  <div class="lesson" *ngFor="let lesson of lessons">
    <div class="lesson-detail">{{lesson | json}}</div>
  </div>
</div>
```

Однако, чтобы избежать необходимости создавать дополнительный div, мы можем вместо этого использовать директиву ng-container:

```html
<ng-container *ngIf="lessons">
  <div class="lesson" *ngFor="let lesson of lessons">
    <div class="lesson-detail">{{lesson | json}}</div>
  </div>
</ng-container>
```

Как мы видим, директива ng-container предоставляет нам элемент, в котором мы можем использовать структурную директиву, без необходимости создавать дополнительный элемент.

Еще пара примечательных примеров, если все же вы хотите использовать ng-template вместо ng-container, по определенным правилам вы не сможете использовать полную конструкцию структурных директив.

Вы можете писать либо так:

```html
<div class="mainWrap">
  <ng-container *ngIf="true">
    <h2>Title</h2>
    <div>Content</div>
  </ng-container>
</div>
```

Либо так:

```html
<div class="mainWrap">
  <ng-template [ngIf]="true">
    <h2>Title</h2>
    <div>Content</div>
  </ng-template>
</div>
```

На выходе, при рендеринге будет одно и тоже:

```html
<div class="mainWrap">
  <h2>Title</h2>
  <div>Content</div>
</div>
```

 <h4>3. ng-content</h4>
 
`<ng-content>` - позволяет внедрять родительским компонентам html-код в дочерние компоненты.
 
Здесь на самом деле, немного сложнее уже чем с ng-template, ng-container. Так как ng-content решает задачу проецирования контента в ваши веб-компоненты. Веб-компоненты состоят из нескольких отдельных технологий. Вы можете думать о Веб-компонентах как о переиспользуемых виджетах пользовательского интерфейса, которые создаются с помощью открытых веб-технологий. Они являются частью браузера и поэтому не нуждаются во внешних библиотеках, таких как jQuery или Dojo. Существующий Веб-компонент может быть использован без написания кода, просто путем импорта выражения на HTML-страницу. Веб-компоненты используют новые или разрабатываемые стандартные возможности браузера.

Давайте представим ситуацию от обратного, нам нужно параметризовать наш компонент. Мы хотим сделать так, чтобы на вход в компонент мы могли передать какие-либо статичные данные. Это можно сделать несколькими способами.

comment.component.ts:

```ts
@Component({
  selector: "comment",
  template: `
    <h1>Комментарий:</h1>
    <p>{{ data }}</p>
  `,
})
export class CommentComponent {
  @Input() data: string = null;
}
```

app.component.html

```html
<div *ngFor="let message of comments">
  <comment [data]="message"></comment>
</div>
```

Но можно поступить и другим путем. <br>
comment.component.ts:

```ts
@Component({
  selector: "comment",
  template: `
    <h1>Комментарий:</h1>
    <ng-content></ng-content>
  `,
})
export class CommentComponent {}
```

app.component.html

```html
<div *ngFor="let message of comments">
  <comment>
    <p>{{message}}</p>
  </comment>
</div>
```

Конечно, эти примеры плохо демонстрируют подводные камни, свои плюсы и минусы. Но второй способ демонстрирует подход при работе, когда мы оперируем независимыми абстракциями и можем проецировать контент внутрь наших компонентов (подход веб-компонентов).

</div>
</details>

##### Angular development environments

<details>
<summary>Что такое директива и как создать собственную?</summary>
<div>

<br>

Директивы бывают трех видов: компонент, структурные и атрибутные (см. выше).

<h4>Создание атрибутных директив:</h4>
  
```ts
@Directive({ 
   selector: '[appHighlight]' 
})
export class HighlightDirective {  }
```

<br>

Декоратор определяет селектор атрибута [appHighlight], [] - указывают что это селектор атрибута. Angular найдет каждый элемент в шаблоне с этим атрибутом и применит к ним логику директивы.

```ts
@Directive({
  selector: "[appHighlight]",
})
export class HighlightDirective {
  constructor(el: ElementRef) {
    el.nativeElement.style.backgroundColor = "yellow";
  }
}
```

<br>Необходимо указать в конструкторе ElementRef, чтобы через его свойство nativeElement иметь прямой доступ к DOM элементу, который должен быть изменен.
<br>Теперь, используя @HostListener, можно добавить обработчики событий, взаимодействующие с декоратором.

```ts
@Component()
class EtcComponent {
  @HostListener("mouseenter")
  public onMouseEnter(): void {
    this.highlight("yellow");
  }

  @HostListener("mouseleave")
  public onMouseLeave(): void {
    this.highlight(null);
  }

  private highlight(color: string): void {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
```

<h4>Структурные директивы создаются так:</h4>

Напишем UnlessDirective, которая будет противоположна NgIf.
<br>Необходимо использовать @Directive, и импортировать Input, TemplateRef, и ViewContainerRef. Они вам понадобятся при воздании любой структурной директивы.

```ts
import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({ selector: "[appUnless]" })
export class UnlessDirective {}
```

В конструкторе мы получаем доступ к view container и содержимое <ng-template>.

```
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) { }
```

Наша директива предполагает работу с true/false. Для этого нужно свойство appUnless, добавленное через @Input.

```ts
@Directive({ selector: "[appUnless]" })
export class UnlessDirective {
  @Input() public set appUnless(condition: boolean) {
    if (!condition && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (condition && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
```

</div>
</details>

<details>
<summary>Что такое директива, компонент, модуль, сервис, пайп в Angular и для чего они нужны?</summary>

<div>
    <br>
    <ul>
      <li>Директива - см. выше.</li>
      <li>Компонент контролирует участок экрана, т.н. view.</li>
      <li>Сервис это класс с узкой, четко определенной целью. Это может быть значение, функция, запрос, etc. Главное в них то, что они повторно используются, отделяя чистую функциональность компонента. </li>
      <li>Пайп преобразует отображение значений в шаблоне, к примеру отображение дат в разных локалях или изменяют в отображении регистр строк.</li>
    </ul>
</div>

</details>

<details>
<summary>Расскажите об основных параметрах @NgModule, @Component, @Directive, @Injectable, @Pipe</summary>
<div>
 <br>
 
 Декораторы динамически подключают дополнительное поведение к объекту. Они помечают класс и предоставляют конфигурационные метаданные.
 <h4>@NgModule может содержать следующие параметры:</h4>
 <li>providers - список инжектируемых объектов, которые добавляются в этот модуль</li>
 <li>declarations - компоненты, директивы и пайпы, принадлежащие этому модулю</li>
 <li>imports - модули, которые экспортируются декларируемыми и доступны в шаблоне этого модуля</li>
 <li>exports - компоненты, директивы и пайпы, которые объявлены декларируемыми, и могут быть им пользованы в шаблоне любого компонента, которые принадлежит NgModule импортирующему их.</li>
 <li>entryComponent - компилируемые компоненты при определении NgModule, для динамической загрузки в view.</li>
 <li>bootstrap - компоненты, которые загружаются при загрузке этого модуля, автоматически добавляются в entryComponent. </li>
 <li>schemas - набор схем, объявляющих разрешенные элементы в MgModules</li>
 <li>id - имя или путь, уникальный идентификатор этого NgModule в getModuleFactory. Если не заполнять - не будет там зарегистрирован.</li>
 <li>jit - если true, то этот модуль будет пропущен компилятором AOT и всегда будет компилироваться JIT.</li>
 
 <h4>@Component может содержать следующие параметры:</h4>
 <li>changeDetection - стратегия обнаружения изменений, используемая для этого компонента</li>
 <li>viewProviders - инжектируемые объекты, которые видны DOM children этого компонента. </li>
 <li>moduleId - id модуля, к которому относится компонент.</li>
 <li>templateUrl - относительный путь или абсолютный URL к шаблону компонента.</li>
 <li>template - инлайн шаблон для этого компонента.</li>
 <li>styleUrls - один и более путь до файла, содержащего CSS, абсолютный или относительный.</li>
 <li>styles - инлайн CSS, используемые в этом компоненте.</li>
 <li>animations - один и более вызовов анимации trigger(), содержащих state() и transition(). </li>
 <li>encapsulation - правила инкапсуляции для шаблона и CSS.</li>
 <li>interpolation - переопределение базовых знаков интерполяции.</li>
 <li>entryComponents - компоненты, которые должны быть скомпилированы вместе с этим компонентом. Для каждого упомянутого здесь компонента создается ComponentFactory и сохраняется в ComponentFactoryResolver.</li>
 <li>preserveWhitespaces - при значении true удаляются потенциально лишние пробелы из скомпилированного шаблона. </li>
 
 <h4>@Directive может содержать следующие параметры:</h4>
  <li>selector - CSS-селектор, который идентифицирует эту директиву в шаблоне и запускает создание этой директивы.</li>
  <li>inputs - свойство для определения значение @Input() параметра. Значение из inputs можно сразу использовать в шаблоне, без объявления переменной в классе. Пример объявления: inputs: ['name', 'id: id-from-parent']. Значение в inputs массиве может состоять из:
    <ul>
      <li> directiveProperty - наименование свойства @Input, которое будет использоваться в дочернем компоненте для вывода в шаблоне и использования в самом классе.
      <li> bindingProperty - наименование свойства, из которого будет производится чтение и запись в directiveProperty. Не обязательное. При отсутсвии параметра значение будет браться из directiveProperty
    </ul>
    Пример использования:

```ts
@Component({
  selector: "child-component",
  template: `Name {{ name }} Id {{ id }}`,
  inputs: ["name", "id: parentId"],
})
export class ChildComponent {}

@Component({
  selector: "parent-component",
  template: `
    <child-component
      [name]="parentName"
      [parentId]="parentIdValue"
    ></child-component>
  `,
})
export class Parent {
  public parentIdValue = "123";
  public parentName = "Name";
}
```

  </li>
  <li>outputs - свойство для определения @Output. В отличии от inputs, объявление свойства в классе обязательно. Пример:

```ts
@Component({
  selector: "child-dir",
  outputs: ["bankNameChange"],
  template: `<input (input)="bankNameChange.emit($event.target.value)" />`,
})
class ChildDir {
  bankNameChange: EventEmitter<string> = new EventEmitter<string>();
}

@Component({
  selector: "main",
  template: `
    {{ bankName }}
    <child-dir (bankNameChange)="onBankNameChange($event)"></child-dir>
  `,
})
class MainComponent {
  bankName: string;

  onBankNameChange(bankName: string) {
    this.bankName = bankName;
  }
}
```

  </li>
  <li>providers - настраивает инжектор этой директивы или компонента с помощью токена.</li>
  <li>exportAs - определяет имя, которое можно использовать в шаблоне для присвоения этой директивы переменной.</li>
  <li>queries - настраивает запросы, которые могут быть инжектированы в директиву.</li>
  <li>host - составляет свойства класса со сбайнженными элементами для свойств, атрибутов и ивентов. </li>
  <li>jit - если true, то этот модуль будет пропущен компилятором AOT и всегда будет компилироваться JIT.</li>
  
  <h4>@Injectable может содержать следующие параметры:</h4>
  <li>providedIn - определяет, где будет заинжектировано, либо, если объявлено "root" распространится на все приложение. </li>
  
  <h4>@Pipe может содержать следующие параметры:</h4>
  <li>name - имя пайпа, которое будет использовано в шаблоне.</li>
  <li>pure - если true, то пайп считается "чистым", и метод transform() вызовется только при изменении его входных агрументов. По умолчанию стоит true. </li>
 
</div>
</details>

<details>
<summary>Что такое динамические компоненты и как их можно использовать в Angular?</summary>
<div>
<br>

  <p>Динамические компоненты - компоненты, которые добавляются на страницу во время выполнения приложения (runtime). Динамические компоненты можно использовать в тех случаях, когда компонент можно отобразить не сразу при загрузке страницы. Например: диалоговые окна, нотификации, контент в табах.</p>
  <p>Для того, чтобы использовать динамические компоненты, необходимо убедиться, что:
    <ol>
      <li> добавлен элемент ("якорь") - ng-container/ng-template - на нужной странице/в шаблоне, куда будет помещен динамический компонент. Именно в этот элемент будет загружаться динамический компонент.</li>
      <li> в классе компонента определено свойство для хранения ng-container/ng-template. Например:

```ts
@Component({
  template: `<div>
    <ng-container #dynamicContent></ng-container>
  </div> `,
})
export class AppComponent {
  @ViewChild("dynamicContent", { read: ViewContainerRef })
  public dynamicContainer: ViewContainerRef;
}
```

  </li>
  <li> при загрузке страницы ng-container/ng-template определен и загружен. Проверить загрузку и определение "якоря" можно в хуке ngAfterViewInit()</li>
  </ol>

  <p>
    В динамический компонент можно внедрить зависимости. Зависимости могут понадобится для общения основного и динамического компонентов. Перед внедрением зависимости нужно создать injector. Создание injector похоже на определение параметра providers в @NgModule. Пример создания Injector:

```ts
// класс, который будет использоваться в constructor
export abstract class IDynamicComponentProps {
  public abstract onClickDynamicComponent(): void;
  public abstract items: Array<string>;
}

// Использование зависимости в динамическом компоненте
@Component({
  template: `
    <span *ngFor='let item of dynamicItems'>{{item}}</span>
    <button (click)='onClick()'></button>
  `
})
export class DynamicComponent {
  public dynamicItems: Array<string> =
    this.dynamicComponentProps.items;
  constructor(
    private dynamicComponentProps: IDynamicComponentProps,
  ) {}

  public onClick(): void {
    this.dynamicComponentProps.onClickDynamicComponent();
  }
}

// Создание инжектора в сервисе или родительском компоненте
@Component({
  ...
})
export class ParentComponent {
  public onClickHandler: EventEmitter<number> = new EventEmitter();
  public parentItems: Array<string> = ['str1', 'str2'];
  constructor(
    private injector: Injector,
  ) {}

  public createInjector() {
    const injector: Injector = Injector.create(
        [
          {
            provide: IDynamicComponentProps,
            useValue:{
              onClickDynamicComponent: () => { this.onClickHandler.emit(0) },
              items: this.parentItems
            }
          }
        ],
        this.injector
      );
  }
}
```

  </p>
  <h4>Последовательность действий для отображения динамического компонента</h4>
  <ol>
    <li> Добавить в шаблон "якорь" для компонента, объявить переменную для работы с этим элементом</li>
    <li> Очистить содержимое динамического компонента (при необходимости)</li>
    <li> Создать ComponentFactory с помощью resolveComponentFactory()</li>
    <li> Вызвать метод из созданного ComponentFactory для создания компонента на странице.</li>
  </ol>
  <p>Примечание: Для динамического компонента не обязательно создавать Injector. Обязательным параметром для метода createComponent является только ComponentFactory.</p>
  <p>Ниже указана последовательность действий, реализованная кодом. В примере используется Основной компонент (MainComponent), динамический компонент (DynamicCompoent) и сервис для рендера (MainComponentService)</p>

```ts
//основной компонент
@Component({
  selector: "main-component",
  template: `<h1>Dynamic Component Example</h1>
    <ng-container #dynamicComponent></ng-container> `,
})
export class MainComponent {
  @ViewChild("dynamicComponent", { read: ViewContainerRef })
  public dynamicContainer: ViewContainerRef;

  public parentItems: Array<string> = ["str1", "str2"];
  constructor(private mainComponentService: MainComponentService) {
    this.mainComponentService.onClickHandler().subscribe((x) => console.log(x));
    // console - 0 form dynamic component
  }

  public ngAfterViewInit(): void {
    this.mainComponentService.render(this.dynamicContainer, this.parentItems);
  }
}

// класс для DI
export abstract class IDynamicComponentProps {
  public abstract onClickDynamicComponent(): void;
  public abstract items: Array<string>;
}

// сервис для рендера
@Injectable()
export class MainComponentService {
  public onClickHandler: EventEmitter<number> = new EventEmitter();
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  public render(container: ViewContainerRef, parentItems: Array<string>): void {
    if (!isUndefined(container)) {
      container.clear();
    }

    const injector: Injector = Injector.create(
      [
        {
          provide: IDynamicComponentProps,
          useValue: {
            onClickDynamicComponent: () => {
              this.onClickHandler.emit(0);
            },
            items: parentItems,
          },
        },
      ],
      this.injector
    );

    const factory = this.componentFactoryResolver.resolveComponentFactory(
      DynamicCompoent
    );

    container.createComponent(factory, 0, injector);
  }
}

//динамический компонент
@Component({
  template: `
    <span *ngFor="let item of dynamicItems">{{ item }}</span>
    <button (click)="onClick()"></button>
  `,
})
export class DynamicComponent {
  public dynamicItems: Array<string> = this.dynamicComponentProps.items;
  constructor(private dynamicComponentProps: IDynamicComponentProps) {}

  public onClick(): void {
    this.dynamicComponentProps.onClickDynamicComponent();
  }
}
```

</div>
</details>

<details>
<summary>Как применить анимацию к компонентам?</summary>
<div>
<br>

  <p>Анимации в Angular построены на основе функциональности CSS. При работе с анимациями нужно иметь ввиду, что применять анимацию можно только к тем свойствам, которые можно анимировать.</p>
  
  Перед началом создания анимаций нужно:
    <ul>
      <li> Подключить модуль BrowserAnimationsModule в основной модуль приложения (root)</li>
      <li> Подключить функции для анимации в нужном компоненте: 
    </ul>

```js
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from "@angular/animations";
```

<li>Добавить свойство animations в декоратор компонента @Component():</li><br>

```ts
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  animations: [
    // animation triggers go here
  ]
})
```

  <p>
    Анимация состоит из:
    <ol>
      <li>триггера - событие, по которому возникает анимация. Для инициализации триггера используется функция <b>trigger()</b>. В параметрах функции нужно указать событие, которое будет указано в компоненте и к которому будет привязана анимация. Так же, указывается массив из функций <b>state()</b> и <b>transition()</b> </li>
      <li>состояний в конце перехода - стили, которые будут применятся к элементу в конце анимации. Для объявления состояний используется функция <b>state()</b>. В функции нужно указать название состояния, указать стили состояния с помощью функции <b>style()</b>. Если анимация отключена (<b>[@.disabled]='true'</b>), то стили конечных состояний нужно прописать.</li>
      <li>промежуточных состояний - стилей, которые применяются к элементу между окончательными состояниями. С помощью промежуточных состояний можно анимировать переходы. Для этого используется функция <b>transition()</b>. В функции нужно прописать выражение, в котором указано направление между состояниями и функции для определения стилей между состояниями, анимации.</li>
    </ol>

  <p>Для объявления триггера, нужно прописать функцию <b>trigger()</b> в метаданных компонента, в свойстве <b>animations</b>. Первым параметром нужно указать событие, которое будет привязано в шаблоне к элементу. Вторым параметром нужно указать состояние <b>state()</b> и анимации в <b>transition()</b>. Например:

```ts
@Component({
  selector: "example",
  animations: [
    trigger("toggle", [
      state(
        "open",
        style({
          height: "200px",
          opacity: 1,
          backgroundColor: "yellow",
        })
      ),
      state(
        "closed",
        style({
          height: "100px",
          opacity: 0.5,
          backgroundColor: "green",
        })
      ),
      transition("open => closed", [animate("1s")]),
      transition("closed => open", [animate("0.5s")]),
      //...
    ]),
  ],
  template: `<div [@toggle]="isOpen ? 'open' : 'closed'"></div>`,
})
export class ExampleComponent {}
```

  </p>
  <h4>Дополнительные состояния переходов</h4>
  <p>При работе с переходами можно указывать не только состояния, указанные в функции state(). Анимации в Angular поддерживают следующие состояния:
    <ul>
      <li><b>*</b> - любое состояние. Полезно для определения переходов, которые применяются независимо от начального или конечного состояния HTML-элемента. Можно использовать конструкцию <b>* => *</b>, для того, чтобы определить переходы тем состояниям, у которых не назначена анимация. Эту конструкцию можно добавить после того, как будут перечислены конкретные переходы состояний.</li>
      <li><b>void</b> - состояние, когда элемент появляется в DOM или удаляется из него. Например, при ngIf. Void входит в состояние *. </li>
    </ul>

```ts
animations: [
  trigger("openClose", [
    state(
      "open",
      style({
        height: "200px",
        opacity: 1,
        backgroundColor: "yellow",
      })
    ),
    state(
      "closed",
      style({
        height: "100px",
        opacity: 0.5,
        backgroundColor: "green",
      })
    ),
    transition("open => closed", [animate("1s")]),
    transition("closed => open", [animate("0.5s")]),
    transition("* => closed", [animate("1s")]),
    transition("* => open", [animate("0.5s")]),
    transition("* => open", [animate("1s", style({ opacity: "*" }))]),
    transition("* => *", [animate("1s")]),
  ]),
];
```

<p>
    Два вышеперечисленных состояния можно использовать вместе - <b>void => *</b> и <b> * => void</b>. У этих конструкций есть алиасы - :enter (void => *) и :leave (* => void). Например:
</p>

```ts
const animation = trigger("eventTrigger", [
  transition("void => *", [
    style({ opacity: 0 }),
    animate("5s", style({ opacity: 1 })),
  ]),
  // or
  transition(":enter", [
    style({ opacity: 0 }),
    animate("5s", style({ opacity: 1 })),
  ]),

  //-------------//

  transition("* => void", [animate("5s", style({ opacity: 0 }))]),
  //or
  transition(":leave", [animate("5s", style({ opacity: 0 }))]),
]);
```

  <p>Для работы с переходами можно использовать числовые и булевы значения. При работе с числовыми значениями, можно использовать алиасы :increment и :decrement. С булевыми значениями можно просто прописать true/false. Например:

```ts
@Component({
  selector: "toggle",
  animations: [
    trigger("isOpen", [
      state("true", style({ height: "*" })),
      state("false", style({ height: "0px" })),
      transition("true <=> false", [animate("1s")]),
    ]),
  ],
  template: `<div [@isOpen]="isOpen ? true : false"></div>`,
})
export class ToggleComponent {
  public isOpen: boolean = true;
}

@Component({
  template: `<ul class="heroes" [@filterAnimation]="heroTotal"></ul>`,
  animations: [
    trigger("filterAnimation", [
      transition(":enter, * => 0, * => -1", []),
      transition(":increment", [
        query(
          ":enter",
          [
            style({ opacity: 0, width: "0px" }),
            stagger(50, [
              animate("300ms ease-out", style({ opacity: 1, width: "*" })),
            ]),
          ],
          { optional: true }
        ),
      ]),
      transition(":decrement", [
        query(":leave", [
          stagger(50, [
            animate("300ms ease-out", style({ opacity: 0, width: "0px" })),
          ]),
        ]),
      ]),
    ]),
  ],
})
export class HeroListPageComponent implements OnInit {
  public heroTotal: number = -1;
}
```

  </p>
  
<p><b>Примечание:</b> хорошей практикой является перенос анимаций в отдельные файлы *.animation.ts. Эта практика уменьшит размер файла компонента, обеспечит декомпозицию, даст возможность переиспользования анимаций.</p>
  
[Гайд ангуляра по переиспользованию анимаций](https://angular.io/guide/reusable-animations)

<h4>Отключение анимации</h4>
<p>Анимацию можно принудительно отключить как в отдельном компоненте, так и во всем приложении.</p>
<p>Для отключения анимации в компоненте нужно указать [@.disabled]='isDisabled' в нужной ноде компонента. Например:

```html
<div [@.disabled]="isDisabled"></div>
```

</p>

<p>Для отключения анимации во всем приложении, нужно указать @HostBinding('@.disabled') в корневом компоненте. Например:

```ts
@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.css"],
  animations: [
    // animation  go here
  ],
})
export class AppComponent {
  @HostBinding("@.disabled")
  public animationsDisabled = true;
}
```

  </p>
  <h4>Дополнительная функциональность для анимаций</h4>
  <p>Можно указывать конкретные значения стилей в определенный промежуток времени с помощью <b>keyframes()</b></p>
  <p>Есть возможность запускать анимации параллельно, указав их в функции <b>group()</b>. Запускать последовательно с помощью функции <b>sequence()</b>.</p>
  <p>Анимацию можно применять к конкретному селектору, который можно указать в параметрах фукнции <b>query()</b>. Так же. можно управлять анимациями дочерних элементов с помощью <b>animateChild()</b> (только для анимаций, описанных с помощью Angular)</p>
</div>
</details>

##### Angular render lifecycle and core environments

<details>
<summary>Объясните механизм загрузки (bootstrap) Angular-приложения в браузере?</summary>
<div>
<br>
<p>Запуск Angular приложения начинается с файла <b>main.ts</b>. Этот файл содержит в себе примерно следующее:</p>

```ts
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";

const platform = platformBrowserDynamic();

platform.bootstrapModule(AppModule);
```

<p>platformBrowserDynamic запускает AppModule. После этого, начинает работать логика в AppModule. </p>
<p>В AppModule обычно задается компонент, который будет использоваться для отображения при загрузке. Компонент находится в параметре <b>bootstrap</b></p>

```ts
@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

</div>
</details>

<details>
<summary>Как происходит взаимодействие компонентов в Angular (опишите components view)?</summary>
<br>

<div>
  <p>Взаимодействие компонентов может быть: </p>
  <ul>
    <li><b>между родительским и дочерним компонентом</b> - селектор одного компонента объявлен в шаблоне другого</li>
    <li><b>между компонентами одного уровня</b> - селекторы компонентов не вложенные</li>
  </ul>
  <p></p>
  <h4>Способы взаимодействия</h4>
  <ol>
    <li>
      <p><b>@Input()/@Output() декораторы свойств</b> - используются между дочерним и родительским компонентами. В @Input() можно получить значение из родителя. Через @Output() отправить данные из дочернего в родительский компонент.</p>
      <p>В шаблоне родительского компонента ставится селектор дочернего. В селекторе дочернего компонента прописываются атрибуты, через которые будут передаваться данные в переменные @Input()/@Output(). Для обозначения @Input свойства в селекторе нужно прописать <child [title]='parentTitle'></child>. Для обозначения @Output свойства в селекторе нужно прописать <child (getChanges)='onGetChanges($event)'></child>.</p>
      <p>В классе родительского компонента нужно обозначить public свойства/методы, которые будут прописаны в атрибутах дочернего селектора.</p>
      <p>В классе дочернего компонента нужно прописать public свойства с декораторами @Input()/@Output(). Названия свойств должны совпадать с именами в атрибутах дочернего селектора. В @Input() можно передать значения как обычных типов данных (string, number, Array и тп), так и потоки (Subject, Observable). В @Output обычно используется EventEmitter. Через него можно отправить значения в функцию родительского компонента, которая прописана в атрибуте селектора.</p>
      <p>Пример</p>

```ts
@Component({
  selector: "parent",
  template: `
    <div>
      <child [count]="value" (increment)="onInstement($event)"></child>
    </div>
  `,
})
export class ParentComponent {
  public value: number = 0;

  public onIncrement(value: number): void {
    // actions with child's value
  }
}

@Component({
  selector: "child",
  template: `
    <div>
      <button type="button" (click)="onClickIncrement()">+1</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush, //см пункт "Какие существуют стратегии обнаружения изменений?"
})
export class ChildComponent {
  @Input() public count: number;

  @Output() public increment: EventEmitter<number> = new EventEmitter();

  public onClickIncrement(): void {
    const result = this.count++;
    this.increment.emit(result);
  }
}
```

  </li>
  <li>
    <p><b>@ViewChild() директива</b> - получение доступа к свойствам дочернего компонента. В родительском шаблоне нужно указать селектор дочернего. Так же, в родительском компоненте нужно обозначить public свойство с директивой @ViewChild().</p>
    <p>По умолчанию, доступ к свойствам @ViewChild() можно получить в хуке ngAfterViewInit(). Так же, нужно учитывать свойство <b>static</b> при использовании @ViewChild(). <b>static</b> параметр указывает, когда можно получить доступ к ViewChild() - до или после change detection. Это может понадобится, когда @ViewChild используется в циклах (*ngFor) или доступен только по условию (*ngIf). Если static = false, то доступ можно получить до change detection в хуке ngAfterViewInit(). </p>
    <p>Примеры</p>

```ts
@Component({
  selector: "parent",
  template: `<child #childRef *ngIf="isShowChild"></child>`,
})
export class ParentComponent {
  @ViewChild("childRef", { static: false }) public viewChild: ChildComponent;

  public isShowChild: boolean = false;

  public ngAfterViewInit(): void {
    console.log(this.viewChild.title);
  }
}

@Component({
  selector: "parent",
  template: `<child #childRef></child>`,
})
export class ParentComponent {
  @ViewChild("childRef", { static: false }) public viewChild: ChildComponent;

  public ngAfterViewInit(): void {
    console.log(this.viewChild.title);
  }
}
```

  </li>
  <li>
    <p><b>Через сервис</b> - передача данных между компонентами через единый сервис. Этим способом можно взаимодействовать с компонентами одного уровня. Так же, можно избавиться от иерархии зависимостей и не использовать всплывающие события (Output)</p>
    <p>Необходимо создать общий сервис, который объявляется в параметре providers в общем модуле соединяемых компонентов. В сервисе можно создать public свойства и методы для передачи данных. Можно использовать Observable и Subjects для передачи данных. Пример:</p>

```ts
@Injectable()
export class CountService {
  private count$: BehaviorSubject<number> = new BehaviorSubject(0);

  public get value$(): Observable<number> {
    return this.count$.asObservable();
  }

  public get value(): number {
    return this.count$.getValue();
  }

  public setState(value: number): void {
    this.count$.next(value);
  }

  public reset(): void {
    this.count$.next(0);
  }
}

@Component({
  selector: "counter",
  template: `
     value = {{ counter.value$ | async }}  <br/>
    <button type='button' (click)='counter.setState(counter.value + 1)>+1</button>
    <button type='button' (click)='counter.setState(counter.value - 1)>-1</button>
    <button type='reset' (click)='counter.reset()>reset</button>
  `,
})
export class CounterComponent {
  constructor(private counter: CountService) {}
}
```

  </li>
  </ol>
</div>
</details>

<details>
<summary>Каков жизненный цикл у компонентов?</summary>
<div>
<br>

<b>После</b> создания компонента или директивы через вызов конструктора, Angular вызывает методы жизненного цикла в следующей последовательности в строго определенные моменты:

  <li>ngOnChanges() - вызывается когда Angular переприсваивает привязанные данные к input properties. Метод получает объект SimpleChanges, со старыми и новыми значениями. Вызывается перед NgOnInit и каждый раз, когда изменяется одно или несколько связанных свойств.</li>
  <li>ngOnInit() - инициализирует директиву/компонент после того, как Angular впервые отобразит связанные свойства и устанавливает входящие параметры.</li>
  <li>ngDoCheck() - при обнаружении изменений, которые Angular не может самостоятельно обнаружить, реагирует на них. </li>
  <li>ngAfterContentInit() - вызывается после того, как Angular спроецирует внешний контент в отображение компонента или отображение с директивой. Вызывается единожды, после первого ngDoCheck().</li>
  <li>ngAfterContentChecked() - реагирует на проверку Angular-ом проецируемого содержимого. Вызывается после ngAfterContentInit() и каждый последующий ngDoCheck().</li>
  <li>ngAfterViewInit() - вызывается после инициализации отображения компонента и дочерних/директив. Вызывается единожды, после первого ngAfterContentChecked().</li>
  <li>ngAfterViewChecked() - реагирует на проверку отображения компонента и дочерних/директив. Вызывается после ngAfterViewInit() и каждый последующий ngAfterContentChecked().</li>
  <li>ngOnDestroy() - после уничтожения директивы/компонента выполняется очистка. Отписывает Observables и отключает обработчики событий, чтобы избежать утечек памяти.</li>
  
</div>
</details>

<details>
<summary>Что такое Shadow DOM и как с ним работать в Angular?</summary>
<div>
  in progress..
</div>
</details>

<details>
<summary>Что такое Data Binding и какие проблемы связанные с ним вы знаете?</summary>
<br>

<div>
  Angular поддерживает одностороннюю и двустороннюю Data Binding. Это механизм координации частей шаблона с частями компонента. 
  <br>Добавление специальной разметки сообщает Angular как соединять обе стороны. Следующая диаграмма показывает четыре формы привязки данных.
  <br>Односторонние:
  <li>От компонента к DOM с привязкой значения: {{hero.name}}</li>
  <li>От компонента к DOM с привязкой свойства и присвоением значения: [hero]="selectedHero"</li>
  <li>От DOM к компоненту с привязкой на ивент: (click)="selectHero(hero)"</li>
  
  <br>Двусторонняя в основном используется в template-driven forms, сочетает в себе параметр и ивент. Вот пример, использующий привязку с директивой ngModel.
  
  ```html
    <input [(ngModel)]="hero.name">
  ```
  <br>Здесь значение попадает в input из компонента, как при привязке значения, но при изменении юзером значения новое передается в компонент и переопределяется. 
 
</div>
</details>

<details>
<summary>Как вы используете одностороннюю и двухстороннюю привязку данных?</summary>
<div>
  in progress..
</div>
</details>

<details>
<summary>В чем преимущества и недостатки Regular DOM (Angular) перед Virtual DOM (React)?</summary>
<div>
  in progress..
</div>
</details>

<details>
<summary>Что такое ngZone?</summary>
<div>
  <br>

<a href="https://angular.io/api/core/NgZone">NgZone</a> - это сервис, который является обёрткой над zone.js, для выполнения кода внутри или вне зоны Angular. Этот сервис создаёт зону с именем angular для автоматического запуска обнаружения изменений, когда выполняются следующие условия:

  <li>Когда выполняется синхронная или асинхронная функция</li>
  <li>Когда нет запланированной микро-задачи в очереди</li>

<br>Наиболее распространённое применение NgZone — это оптимизация производительности посредством выполнения асинхронной логики вне зоны Angular (метод <code>runOutsideAngular</code>), тем самым не вызывая обнаружение изменений или обработку ошибок. Или наоборот, данный сервис может использоваться для выполнения логики внутри зоны (метод <code>run</code>), что в конечном итоге приведёт к тому, что Angular снова вызовет обнаружение изменений и при необходимости перерисует представление.

</div>
</details>

<details>
<summary>Как обновлять представление, если ваша модель данных обновляется вне 'зоны'?</summary>
<br>

1. Используя метод `ApplicationRef.prototype.tick`, который запустит `change detection` на всем дереве компонентов.

```ts
import { Component, ApplicationRef, NgZone } from "@angular/core";

@Component({
  selector: "app-root",
  template: ` <h1>Hello, {{ name }}!</h1> `,
})
export class AppComponent {
  public name: string = null;

  constructor(private app: ApplicationRef, private zone: NgZone) {
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        this.name = window.prompt("What is your name?", "Jake");
        this.app.tick();
      }, 5000);
    });
  }
}
```

2. Используя метод `NgZone.prototype.run`, который также запустит `change detection` на всем дереве.

```ts
import { Component, NgZone } from "@angular/core";
import { SomeService } from "./some.service";

@Component({
  selector: "app-root",
  template: ` <h1>Hello, {{ name }}!</h1> `,
  providers: [SomeService],
})
export class AppComponent {
  public name: string = null;

  constructor(private zone: NgZone, private service: SomeService) {
    this.zone.runOutsideAngular(() => {
      this.service.getName().then((name: string) => {
        this.zone.run(() => (this.name = name));
      });
    });
  }
}
```

Метод `run` под капотом сам вызывает `tick`, а параметром принимает функцию, которую нужно выполнить перед `tick`. То есть:

```ts
this.zone.run(() => (this.name = name));

// идентично

this.name = name;
this.app.tick();
```

3. Используя метод `ChangeDetectorRef.prototype.detectChanges`, который запустит `change detection` на текущем компоненте и дочерних.

```ts
import { Component, NgZone, ChangeDetectorRef } from "@angular/core";

@Component({
  selector: "app-root",
  template: ` <h1>Hello, {{ name }}!</h1> `,
})
export class AppComponent {
  public name: string = null;

  constructor(private zone: NgZone, private ref: ChangeDetectorRef) {
    this.zone.runOutsideAngular(() => {
      this.name = window.prompt("What is your name?", "Jake");
      this.ref.detectChanges();
    });
  }
}
```

</details>

<details>
<summary>Что такое EventEmitter и как подписываться на события?</summary>
<div>
<br>
Используется в директивах и компонентах для подписки на пользовательские ивенты синхронно или асинхронно, и регистрации обработчиков для этих ивентов.
</div>
</details>

<details>
<summary>Что такое Change Detection, как работает Change Detection Mechanism?</summary>

<h4>1. Change Detection</h4>
  
Change Detection - процесс синхронизации модели с представлением. В Angular поток информации однонаправленный, даже при использовании `ngModel` для реализации двустороннего связывания, которая является синтаксическим сахаром поверх однонаправленного потока.

<h4>2. Change Detection Mechanism </h4>

Change Detection Mechanism - продвигается только вперед и никогда не оглядывается назад, начиная с корневого (рут) компонента до последнего. В этом и есть смысл одностороннего потока данных. Архитектура Angular приложения очень проста — дерево компонентов. Каждый компонент указывает на дочерний, но дочерний не указывает на родительский. Односторонний поток устраняет необходимость `$digest` цикла.

<br>
</details>

<details>
<summary>Какие существуют стратегии обнаружения изменений?</summary>
<br>

Всего есть две стратегии - `Default` и `OnPush`. Если все компоненты используют первую стратегию, то `Zone` проверяет все дерево независимо от того, где произошло изменение. Чтобы сообщить Angular, что мы будем соблюдать условия повышения производительности нужно использовать стратегию обнаружения изменений `OnPush`. Это сообщит Angular, что наш компонент зависит только от входных данных и любой объект, который передается ему должен считаться immutable. Это все построено на принципе автомата Мили, где текущее состояние зависит только от входных значений.

<br>

</details>

<details>
<summary>Сколько Change Detector(ов) может быть во всем приложении?</summary>
<br>
У каждого компонента есть свой Change Detector, все Change Detector(ы) наследуются от AbstractChangeDetector.  
<br>
</details>

<details>
<summary>Основное отличие constructor от ngOnInit?</summary>
<br>
  
Конструктор сам по себе является фичей самого класса, а не Angular. Основная разница в том, что Angular запустит `ngOnInit`, после того, как закончит настройку компонента, то есть, это сигнал, благодаря которому свойства `@Input()` и другие байндинги, и декорируемые свойства доступны в `ngOnInit`, но не определены внутри конструктора, по дизайну.

<br>
</details>

##### RxJS

<details>
<summary>Для чего нужен RxJS и какую проблему он решает?</summary>
<div>
  in progress..
</div>
</details>

<details>
<summary>Что такое Observable?</summary>
<div>
  <br>Observable— это наблюдатель, который подписывается и реагирует на все события до момента отписки. 
</div>
</details>

<details>
<summary>В чём разница между Observable и Promise?</summary>
<div>
 <br>
 <p>Promise обрабатывает одно значение по завершению асинхронной операции, вне зависимости от ее исхода, и не поддерживают отмену операции.</p>
 <p>Observable же является потоком, и позволяет передавать как ноль, так и несколько событий, когда callback вызывается для каждого события.</p>
</div>
</details>

<details>
<summary>В чём разница между Observable и BehaviorSubject/Subject (Higher Order Observables)?</summary>
<div>
<br>

<p>Subjects - специальные Observable. Представьте, что есть спикер с микрофоном, который выступает в комнате, полной людей. 
Это и есть Subjects, их сообщение передается сразу нескольким получателям. Обычные же Observables можно сравнить с разговором 1 на 1.</p>

<ul>
    <li>Subject - является multicast, то есть может передавать значение сразу нескольким подписчикам.</li>
    <li>BehaviorSubject - требует начальное значение и передает текущее значение новым подпискам.</li>
</ul>
</div>
</details>

<details>
<summary>В чем разница между Subject, BehaviorSubject, ReplaySubject, AsyncSubject?</summary>
<div>
  <br>

  <ul>
    <li>Subject - не хранит свои предыдущие состояния, зритель получает информацию только тогда, когда Subject сгенерирует новое событие, используя метод <code>.next()</code>.</li>
    <li>BehaviorSubject - при подписке поведенческий Subject уведомляет своего зрителя о последнем произошедшем в нём событии или, если в Subject-е не происходило событий, создаёт для зрителя событие с изначальной информацией, которая передаётся при создании Subject-а.</li>
    <li>ReplaySubject - при подписке повторяющийся Subject уведомляет своего нового зрителя о всех произошедшем в нём событиях с момента создания. Для оптимизации при создании повторяющегося Subject-а можно передать число последних событий, которые будут повторяться для каждого нового зрителя. Стоит отметить, что создание ReplaySubject-а c числом повторяющихся событий равное 1 эквивалетно созданию BehaviorSubject-а.</li>
    <li>AsyncSubject - асинхронный Subject уведомляет своих зрителей только о последнем произошедшем событии и только когда Subject успешно завершается. Если AsyncSubject завершится ошибкой, его зрители будут уведомлены только об ошибке.
    </li>
  </ul>
</div>
</details>

<details>
<summary>В чём разница между операторами switchMap, mergeMap, concatMap?</summary>
<div>
  <br>
  <ul>  
      <li>switchMap - отменит подписку на Observable, возвращенный ее аргументом project, как только он снова вызовет ее в новом элементе.</li>
      <li>mergeMap - в отличие от switchMap позволяет реализовать одновременно несколько внутренних подписок. </li>
      <li>concatMap - последовательно обрабатывает каждое событие, в отличие от mergeMap.</li>
  </ul>
</div>
</details>

<details>
<summary>Как бы вы кешировали наблюдаемые данные из потоков (stream)?</summary>
<div>
  in progress..
</div>
</details>

##### Angular data flow

<details>
<summary>Что такое Dependency Injection?</summary>
<div>
<br>Это важный паттерн шаблон проектирования приложений. В Angular внедрение зависимостей реализовано из-под капота.<br>
<br>Зависимости - это сервисы или объекты, которые нужны классу для выполнения своих функций. DI -позволяет запрашивать зависимости от внешних источников.
</div>
</details>

<details>
<summary>Что такое Singleton Service и с какой целью его используют в Angular?</summary>
<div>
<br>

Это сервисы, объявленные в приложении и имеющие один экземпляр на все приложение.
Его можно объявить двумя способами:

  <li>Объявить его @Injectable(root)</li>
  <li>Включить его в AppModule в providers, либо в единственный модуль импортируемый в AppModule.</li>
</div>
</details>

<details>
<summary>Как можно определить свой обработчик ErrorHandler, Logging, Cache в Angular?</summary>
<div>
  in progress..
</div>
</details>

<details>
<summary>Что такое управление состоянием приложения?</summary>
<div>
  in progress..
</div>
</details>

<details>
<summary>В чем отличие между NGRX, NGXS, Akita и какую проблему они решают?</summary>
<div>
  in progress..
</div>
</details>

##### Angular with Backend integrations

<details>
<summary>Какими способами можно взаимодействовать с API бэкенда, что требуется для проксирования запросов?</summary>
<div>
  <br>
  <b>Взаимодействие с API</b>

В экосистеме ангуляр существует пакет для общения с сервером
(@angular/common/http), которого достаточно для повседневной разработки. Его интерфейс основан на rxjs потоках, поэтому его легко использовать для работы с потоками данных в приложении.
<br>

Кроме этого, как и в ванильной версии javascript, можно использовать XMLHttpRequest, fetch API, axios(или многие другие библиотеки), но их использование вместо встроенного клиента, считается неоправданным и всячески возбраняется.

Существуют и другие способы взаимодействия с сервером(см. Веб-сокеты), но для них не существует каноничных встроенных библиотек, поэтому используются сторонние библиотеки или собственные реалиации. Хорошей практикой здесь будет привести интерфейс построенный на промисах и обратных вызовах(callback) к интерфейсу основанному на rxjs потоках, для естественного использования в экосистеме Angular.

  <br>
  <b>Proxy</b>

Чтобы тестировать взаимодействие приложения с сервером, который должен находиться на том же домене, используется <a href="https://angular.io/guide/build#proxying-to-a-backend-server"> функциональность в Angular CLI</a> для этого нужно создать файл с конфигурацией прокси, где будут указаны:

  <ul>
    <li>Контекст для проксирования</li>
    <li>Ссылка на работающий экземпляр API</li>
    <li>secure: false для работы в тестовой среде без сертификатов</li>
  </ul>

Также большинство серверов не настроены для работы с разными доменами(<a href="https://developer.mozilla.org/ru/docs/Web/HTTP/CORS">CORS</a>), поэтому для корректной работы на API сервере, необходимо явно указать с какого домена(ов) можно принимать запросы.

</div>
</details>

<details>
<summary>Что такое HTTP Interceptors?</summary>
<br>
<br>
Interceptor (перехватчик) - просто причудливое слово для функции, которая получает запросы / ответы до того, как они будут обработаны / отправлены на сервер. Нужно использовать перехватчики, если имеет смысл предварительно обрабатывать многие типы запросов одним способом. Например нужно для всех запросов устанавливать хедер авторизации `Bearer`:

token.interceptor.ts

```ts
import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("token") as string;

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(req);
  }
}
```

И регистрируем перехватчик как синглтон в провайдерах модуля:

app.module.ts

```ts
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { TokenInterceptor } from "./token.interceptor";

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true, // <--- может быть зарегистрирован массив перехватчиков
    },
  ],
})
export class AppModule {}
```

<br>

</details>

<details>
<summary>Как использовать Json Web Tokens для аутентификации при разработке на Angular?</summary>
<div>
  in progress..
</div>
</details>

<details>
<summary>Как обрабатываются атаки XSS и CSRF в Angular?</summary>
<div>
  in progress..
</div>
</details>

##### Angular routing

<details>
<summary>Что такое роутинг и как его создать в Angular?</summary>
<div>
  <br>
  Роутинг позволяет реализовать навигацию от одного view приложения к другому при работе пользователя с приложением.
  <br>Это реализовано через взаимодействие с адресной строкой, Angular Router интерпретирует ее как инструкцию по переходу между view. Возможна передача параметров вспомогательному компоненту для конкретизирования предоставляемого контента. Навигация может осуществлять по ссылкам на странице, кнопкам или другим элементам, как кнопки "вперед-назад" в браузере.
  <br>Для создания роутинга первым делом необходимо импортировать "RouterModule" и "Routes" в AppModule.
  <br>Затем необходимо реализовать конфигурацию по приложению, определить path и относящие к ним компоненты, и в метод RouterModule.forRoot() передать конфигурацию.
  <br>Наконец необходимо добавить routerLink в шаблон.
</div>
</details>

<details>
<summary>Каков жизненный цикл у Angular Router?</summary>
<div>
  <br>
  <p>
    <img src='https://susdev.ru/wp-content/uploads/2019/02/router-navigation-lifecycle.png'  alt=""/>
    <a href='https://susdev.ru/angular-router-series-router-navigation-cycle/'>Источник информации</a>
  </p>
  <p>
    <ol>
      <li><b>NavigationStart</b> - начало навигации. Возникает во время нажатия на директиву <b>router link</b>, вызове функций <b>navigate</b> и <b>navigateByUrl</b></li>
      <li><b>RoutesRecognized</b> - cопоставление URL-адресов и редиректы. Роутер сопоставляет URL-адрес навигации из первого события с одним из свойств path в конфигурации, применяя любые редиректы по-пути.</li>
      <li><b>GuardsCheckStart, GuardsCheckEnd</b> - функции, которые использует роутер для определения может ли он выполнить навигацию. Пример:

```ts
// router configuration
const config = {
  path: "users",
  /* ... */
  canActivate: [CanActivateGuard],
};

class Guard {
  // router guard implementation
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.auth.isAuthorized(route.queryParams.login);
  }
}
```

  <br />

Если вызов `isAuthorized(route.queryParams.login)` возвращает true, guard завершится успехом. В противном случае guard упадет, роутер сгенерирует событие `NavigationCancel` и отменит всю дальнейшую навигацию.
<br />

Другие guard включают `canLoad` (должен ли модуль быть лениво загружен или нет). `canActivateChild` и `canDeactivate` (которые полезны для предотвращения ухода пользователя со страницы, например, при заполнении формы).

  </li>
  <li><b>ResolveStart, ResolveEnd</b> - функции, которые мы можем использовать для подгрузки данных во время навигации. Например:

```ts
// router configuration
const config = {
  path: "users",
  /* ... */
  resolve: { users: UserResolver },
};

// router resolver implementation
export class UserResolver implements Resolve<Observable<any>> {
  constructor(private userService: MockUserDataService) {}
  resolve(): Observable<any> {
    return this.userService.getUsers();
  }
}
```

<br/>

Результат, то есть данные, будет положен в `data` объект сервиса `ActivatedRoute` с ключом `users`. Данная информация может быть прочитаны с помощью подписки на `data` `observable`.

```ts
export class UsersComponent implements OnInit {
  public users = [];
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.data
      .pipe(first())
      .subscribe((data) => (this.users = data.users));
  }
}
```

  </li>
  <li><b>ActivationStart, ActivationEnd, ChildActivationStart, ChildActivationEnd</b> - события, во время которых активируются компоненты и отображаются их с помощью <router-outlet>.Роутер может извлечь необходимую информацию о компоненте из дерева ActivatedRouteSnapshots. Он был построен в предыдущие шаги навигационного цикла.</li>
  <li><b>Updating the URL</b> - последний шаг в навигационном цикле — это обновление URL-адреса в address bar</li>
  </ol>

</div>
</details>

<details>
<summary>Что такое ленивая загрузка (Lazy-loading) и для чего она используется?</summary>
<div>
  in progress..
</div>
</details>

<details>
<summary>В чем разница между Routing и Navigation?</summary>
<div>
  in progress..
</div>
</details>

<details>
<summary>Как загрузить данные до того как активируется роут?</summary>
<div>
  in progress..
</div>
</details>

##### Angular Forms (also big ui enterprise)

<details>
<summary>Что такое FormGroup и FormControl и для чего они используются?</summary>
<div>
  <br>
  <li>FormControl - отслеживает значение и статус валидации отдельного элемента формы.</li>
  <li>FormGroup - отслеживает состояние и статус валидации группы FormControl </li>
  <br>Они используются для создания и работы с формами.
</div>
</details>

<details>
<summary>Что такое реактивные формы в Angular?</summary>
<div>
  Реактивные формы обеспечивают управляемый моделями подход к обработке входных данных форм, значения которых могут меняться со временем. Они строятся вокруг наблюдаемых потоков, где входные данные и значения форм предоставляются в виде потоков входных значений, к которым можно получить синхронный доступ. 
</div>
</details>

<details>
<summary>Как применять валидацию для простых и сложных форм?</summary>
<div>
  В реактивных формах валидация реализуется в компоненте. Есть два типа валидаторов: синхронные и асинхронные.
  <br>Можно использовать встроенные валидаторы, либо создать свои. Валидаторы добавляются 
</div>
</details>

##### Build environments

<details>
<summary>В чем разница между Angular CLI и Webpack Development Environment?</summary>
<div>
  in progress..
</div>
</details>

<details>
<summary>Что такое JIT и AOT, в чем их отличия и каковы сферы применения?</summary>
<div>
  <br>
  <p>Angular приложение можно скомпилировать с помощью команд <b>ng serve</b> и <b>ng build</b>. При этом, можно работать с разными видами компиляции:
  <ul>
    <li> <b>JIT</b> - (Just-In-Time compilation) - компиляция "на лету", динамическая компиляция. В Angular используется по умолчанию.</li>
    <li> <b>AOT</b> -  (Ahead-Of-Time compilation) - компиляции перед исполнением.</li>
  </ul>
  <p>Основные различия:</p>
  <table>
    <thead>
      <tr><td>Параметры</td><td>JIT</td><td>AOT</td></tr>
    </thead>
    <tbody>
      <tr>
        <td>Когда компилируется</td>
        <td>в момент запуска приложения в браузере</td>
        <td>в момент сборки приложения</td>
      </tr>
      <tr>
        <td>Рекомендуется использовать для</td>
        <td>локальной разработки</td>
        <td>создания продуктовой сборки</td>
      </tr>
      <tr>
        <td>Как включить</td>
        <td>Не нужно выставлять дополнительных флагов</td>
        <td>Нужно добавить флаг --aot или --prod</td>
      </tr>
      <tr>
        <td>Скорость</td>
        <td>Скорость компиляции быстрее, загрузка в браузере дольше</td>
        <td>Скорость компиляции дольше, загрузка в браузере быстрее</td>
      </tr>
      <tr>
        <td>Размер бандла</td>
        <td>Бандл имеет большой размер из-за включенного в бандл компилятора.</td>
        <td>Бандл имеет небольшой размер, тк содержит полностью скомпилированный и оптимизированный код.</td>
      </tr>
      <tr>
        <td>Выявление ошибок</td>
        <td>Ошибки отобразятся во время запуска приложения в браузере</td>
        <td>Выявление ошибок во время компиляции</td>
      </tr>
      <tr>
        <td>Работа с файлами</td>
        <td>Может компилировать только измененные файлы отдельно</td>
        <td>Компилирует сразу все файлы приложения</td>
      </tr>
    </tbody>
  </table>
</div>
</details>

##### Test development

<details>
<summary>Что такое Unit-тестирование, интеграционное, e2e-тестирование (End-to-End) и как оно применяется в Angular?</summary>
<div>
  in progress..
</div>
</details>

<details>
<summary>Что такое Karma, Jasmine (зачем их используют совместно при разработке на Angular)?</summary>
<div>
  in progress..
</div>
</details>

<details>
<summary>В чем разница между Jest и Karma?</summary>
<div>
  in progress..
</div>
</details>

<details>
<summary>В чем разница между Protractor и Cypress?</summary>
<div>
  in progress..
</div>
</details>

<details>
<summary>Как протестировать входные параметры и всплывающие события компонентов?</summary>
<div>
  in progress..
</div>
</details>

##### Code convention

<details>
<summary>Требования к написанию кода на TypeScript</summary>
<div>
  
<br>

На самом деле требования бывают разные и зависят от команды к команде.
Самые эффективные для себя считаю использование модификаторов доступа и принудительного указания типов данных для всех переменных,
методов и членов класса, которые вы используете в коде. Желательно все необходимые правила конвенции кода настраивать в ESLint.

```ts
// my.ts
export interface My {}

// my-impl.ts
export class MyImp implements My {
  public field: string;

  public myMethod(): void {
    // ...
  }

  private myProtectedMethod(): Date {
    return new Date();
  }

  private myPrivateMethod(): MyClassImpl {
    // ...

    return this;
  }
}
```

</div>
</details>

<details>
<summary>Зачем нужен ESLint (TSLint) и Prettier?</summary>
<div>
  in progress..
</div>
</details>
