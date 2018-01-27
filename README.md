## Вопросы на собеседовании по Angular  [![Angular-RU](https://img.shields.io/badge/Telegram_chat:-Angular_RU-216bc1.svg?style=flat)](https://t.me/angular_ru)

Вопросы подготовлены непосредственно для того, чтобы определить уровень разработчика, насколько глубоко, поверхностно или сносно он знает Angular. Вопросы для собеседования на знание JavaScript или Web-стека хорошо освещены в других местах, поэтому ниже будет добавлен список ресурсов по этой теме:

**Fundamentals**:

- [Coding Interview University](https://github.com/jwasham/coding-interview-university)
- [Awesome Interviews](https://github.com/alex/what-happens-when)

**Frontend**: 

- [Front-end Job Interview Questions](https://github.com/h5bp/Front-end-Developer-Interview-Questions)
- [The Best Frontend JavaScript Interview Questions](https://performancejs.com/post/hde6d32/The-Best-Frontend-JavaScript-Interview-Questions-(Written-by-a-Frontend-Engineer))
- [Frontend Guidelines Questionnaire](https://github.com/bradfrost/frontend-guidelines-questionnaire)
- [Подготовка к интервью на Front-end разработчика](https://proglib.io/p/frontend-interview/)

**Angular**:

##### Основные концепции

<details>
<summary>Что такое Angular?</summary>
<div>
  in progress..
</div>
</details>

<details>
<summary>В чем разница между AngularJS и Angular?</summary>
<div>
  in progress..
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
  in progress..
</div>
</details>


##### Angular Template синтаксис

<details>
<summary>Что такое интерполяция в Angular?</summary>
<div>
  in progress..
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
  in progress..
</div>
</details>



<details>
<summary>Для чего нужны директивы ng-template, ng-container, ng-content?</summary>
<div>
  <h4>1. ng-template</h4>
  &lt;template&gt; — это механизм для отложенного рендера клиентского контента, который не отображается во время загрузки, но может быть инициализирован при помощи JavaScript. <br><br>
  Template можно представить себе как фрагмент контента, сохранённый для последующего использования в документе. Хотя парсер и обрабатывает содержимое элемента &lt;template&gt; во время загрузки страницы, он делает это только чтобы убедиться в валидности содержимого; само содержимое при этом не отображается. <br><br>
  &lt;ng-template&gt; - является имплементацией стандартного элемента template, данный элемент появился с четвертой версии Angular, это было сделано с точки зрения совместимости со встраиваемыми на страницу template элементами, которые могли попасть в шаблон ваших компонентов по тем или иным причинам. <br><br>

Пример:
<pre>
&lt;div class="lessons-list" *ngIf="lessons else loading"&gt;
  ... 
&lt;/div&gt;

&lt;ng-template #loading&gt;
    &lt;div&gt;Loading...&lt;/div&gt;
&lt;/ng-template&gt;
</pre>

  <h4>2. ng-container</h4>
  
  &lt;ng-container"&gt; - это логический контейнер, который может использоваться для группировки узлов, но не отображается в дереве DOM как узел (node).

  На самом деле структурные директивы (*ngIf, *ngFor, ..) являются синтаксическим сахаром для наших шаблонов. В реальности, данные шаблоны трансформируются в такие конструкции:
  
<pre>
&lt;ng-template [ngIf]="lessons" [ngIfElse]="loading"&gt;
   &lt;div class="lessons-list"&gt;
     ... 
   &lt;/div&gt;
&lt;/div&gt;

&lt;ng-template #loading&gt;
    &lt;div&gt;Loading...&lt;/div&gt;
&lt;/ng-template&gt;
</pre>

Но что делать, если я хочу применить несколько структурных директив?
(спойлер: к сожалению, так нельзя сделать)

<pre>
&lt;div class="lesson" *ngIf="lessons" *ngFor="let lesson of lessons"&gt;
  &lt;div class="lesson-detail"&gt;
      {{lesson | json}}
  &lt;/div&gt;
&lt;/div&gt; 
</pre>

<pre>
Uncaught Error: Template parse errors:
Can't have multiple template bindings on one element. Use only one attribute 
named 'template' or prefixed with *
</pre>

Но можно сделать так:

<pre>
&lt;div *ngIf="lessons"&gt;
  &lt;div class="lesson" *ngFor="let lesson of lessons"&gt;
    &lt;div class="lesson-detail"&gt;
        {{lesson | json}}
    &lt;/div&gt;
  &lt;/div&gt; 
&lt;/div&gt;
</pre>

Однако, чтобы избежать необходимости создавать дополнительный div, мы можем вместо этого использовать директиву ng-container:

<pre>
&lt;ng-container *ngIf="lessons"&gt;
    &lt;div class="lesson" *ngFor="let lesson of lessons"&gt;
        &lt;div class="lesson-detail"&gt;
            {{lesson | json}}
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/ng-container&gt;
</pre>

Как мы видим, директива ng-container предоставляет нам элемент, в котором мы можем использовать структурную директиву, без необходимости создавать дополнительный элемент.

Еще пара примечательных примеров, если все же вы хотите использовать ng-template вместо ng-container, по определенным правилам вы не сможете использовать полную конструкцию структурных директив.

Вы можете писать либо так:
<pre>
&lt;div class="mainwrap"&gt;
    &lt;ng-container *ngIf="true"&gt;
        &lt;h2&gt;Title&lt;/h2&gt;
        &lt;div&gt;Content&lt;/div&gt;
    &lt;/ng-container&gt;
&lt;/div&gt;
</pre>

Либо так:
<pre>
&lt;div class="mainwrap"&gt;
    &lt;ng-template [ngIf]="true"&gt;
        &lt;h2&gt;Title&lt;/h2&gt;
        &lt;div&gt;Content&lt;/div&gt;
    &lt;/ng-template&gt;
&lt;/div&gt;
</pre>

На выходе, при рендеринге будет одно и тоже:
<pre>
&lt;div class="mainwrap"&gt;
      &lt;h2&gt;Title&lt;/h2&gt;
      &lt;div&gt;Content&lt;/div&gt;
&lt;/div&gt;
</pre>

 <h4>3. ng-content</h4>
 &lt;ng-content&gt; - позволяет внедрять родительским компонентам html-код в дочерние компоненты.
 
Здесь на самом деле, немного сложнее уже чем с ng-template, ng-container. Так как ng-content решает задачу проецирования контента в ваши веб-компоненты. Веб-компоненты состоят из нескольких отдельных технологий. Вы можете думать о Веб-компонентах как о переиспользуемых виджетах пользовательского интерфейса, которые создаются с помощью открытых веб-технологий. Они являются частью браузера и поэтому не нуждаются во внешних библиотеках, таких как jQuery или Dojo. Существующий Веб-компонент может быть использован без написания кода, просто путем импорта выражения на HTML-страницу. Веб-компоненты используют новые или разрабатываемые стандартные возможности браузера.

Давайте представим ситуацию от обратного, нам нужно параметризировать наш компонент. Мы хотим сделать так, чтобы на вход в компонент мы могли передать какие-либо статичные данные. Это можно сделать несколькими способами. 

comment.component.ts:
<pre>
@Component({
  selector: 'comment',
  template: `
    &lt;h1&gt;Комментарий: &lt;/h1&gt;
    &lt;p&gt;{{data}}&lt;/p&gt;
  `
})
export class CommentComponent {
  @Input() data: string = null;
}
</pre>

app.component.html
<pre>
&lt;div *ngFor="let message of comments"&gt;
  &lt;comment [data]="message"&gt;&lt;/comment&gt;
&lt;/div&gt;
</pre>

Но можно поступить и другим путем. <br>
comment.component.ts:
<pre>
@Component({
  selector: 'comment',
  template: `
    &lt;h1>Комментарий: &lt;/h1&gt;
    &lt;ng-content&gt;&lt;/ng-content&gt;
  `
})
export class CommentComponent { 
}
</pre>

app.component.html
<pre>
&lt;div *ngFor="let message of comments"&gt;
  &lt;comment>
    &lt;p&gt;{{message}}&lt;/p&gt;
  &lt;/comment&gt;
&lt;/div&gt;
</pre>

Конечно, эти примеры плохо демонстрируют подводные камни, свои плюсы и минусы. Но второй способ демонстрирует подход при работе, когда мы оперируем независимыми абстракциями и можем проецировать контент внутрь наших компонентов (подход веб-компонентов).

</div>
</details>

##### Angular development enviroments

<details>
<summary>Что такое директива и как создать собственную?</summary>
<div>
  in progress..
</div>
</details>


<details>
<summary>Что такое директива, компонент, модуль, сервис, пайп в Angular и для чего они нужны?</summary>
<div>
  in progress..
</div>
</details>


<details>
<summary>Расскажите об основных параметрах @NgModule, @Component, @Directive, @Injectable, @Pipe</summary>
<div>
  in progress..
</div>
</details>


<details>
<summary>Что такое динамические компоненты и как их можно использовать в Angular?</summary>
<div>
  in progress..
</div>
</details>


<details>
<summary>Как применить анимацию к компонентам?</summary>
<div>
  in progress..
</div>
</details>


##### Angular render lifecycle and core environments

<details>
<summary>Объясните механизм загрузки (bootstrap) Angular-приложения в браузере?</summary>
<div>
  in progress..
</div>
</details>

<details>
<summary>Как происходит взаимодействие компонентов в Angular (опишите components view)?</summary>
<div>
  in progress..
</div>
</details>

<details>
<summary>Каков жизненный цикл у компонентов?</summary>
<div>
  in progress..
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
<div>
  in progress..
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
  in progress..
</div>
</details>

<details>
<summary>Как обновлять представление, если ваша модель данных обновляется вне 'зоны'?</summary>
<div>
  in progress..
</div>
</details>


<details>
<summary>Что такое EventEmmiter и как подписываться на события?</summary>
<div>
  in progress..
</div>
</details>


##### Angular data flow

<details>
<summary>Что такое Dependency Injection?</summary>
<div>
  in progress..
</div>
</details>

<details>
<summary>Что такое Singleton Service и с какой целью его используют в Angular?</summary>
<div>
  in progress..
</div>
</details>

<details>
<summary>Как можно определить свой обработчик ErrorHandler, Logging, Cache в Angular?</summary>
<div>
  in progress..
</div>
</details>

<details>
<summary>Что такое Observable?</summary>
<div>
  in progress..
</div>
</details>

<details>
<summary>В чём разница между Observable и Promise?</summary>
<div>
  in progress..
</div>
</details>

<details>
<summary>В чём разница между Observable и BehaviorSubject/Subject?</summary>
<div>
  in progress..
</div>
</details>

##### Angular with Backend integrations

<details>
<summary>Какими способами можно взаимодействовать API бекенда, что требуется для проксирования запросов?</summary>
<div>
  in progress..
</div>
</details>

<details>
<summary>Что такое HTTP Interceptors?</summary>
<div>
  in progress..
</div>
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
  in progress..
</div>
</details>


<details>
<summary>Каков жизненный цикл у Angular Router?</summary>
<div>
  in progress..
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


##### Angular Forms (also big ui enterprise)

<details>
<summary>Что такое FormGroup и FormControl и для чего они используются?</summary>
<div>
  in progress..
</div>
</details>

<details>
<summary>Что такое реактивные формы в Angular?</summary>
<div>
  in progress..
</div>
</details>


<details>
<summary>Как применять валидацию для простых и сложных форм?</summary>
<div>
  in progress..
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
  in progress..
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
<summary>Что такое Karma, QUnit, Jasmine (зачем их используют совместно при разработке на Angular)?</summary>
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
