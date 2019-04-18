## Вопросы на собеседовании по Angular  [![Angular-RU](https://img.shields.io/badge/Telegram_chat:-Angular_RU-216bc1.svg?style=flat)](https://t.me/angular_ru)

Вопросы подготовлены непосредственно для того, чтобы определить уровень разработчика, насколько глубоко, поверхностно или сносно он знает Angular. Вопросы для собеседования на знание JavaScript или Web-стека хорошо освещены в других местах, поэтому ниже будет добавлен список ресурсов по этой теме:

**Fundamentals**:

- [Coding Interview University](https://github.com/jwasham/coding-interview-university)
- [Awesome Interviews](https://github.com/alex/what-happens-when)
- [Angular Interview Questions](https://github.com/sudheerj/angular-interview-questions)

**Frontend**: 

- [Front-end Job Interview Questions](https://github.com/h5bp/Front-end-Developer-Interview-Questions)
- [The Best Frontend JavaScript Interview Questions](https://performancejs.com/post/hde6d32/The-Best-Frontend-JavaScript-Interview-Questions-(Written-by-a-Frontend-Engineer))
- [Frontend Guidelines Questionnaire](https://github.com/bradfrost/frontend-guidelines-questionnaire)
- [Подготовка к интервью на Front-end разработчика](https://proglib.io/p/frontend-interview/)

**Angular**:

- [Angular Interview Questions by Google Developer Expert](https://github.com/Yonet/Angular-Interview-Questions)

##### Основные концепции

<details>
<summary>Что такое Angular?</summary>
<div><br>
<img src="https://d2eip9sf3oo6c2.cloudfront.net/series/square_covers/000/000/033/thumb/egghead-angular-material-course-sq.png" align="left"><p><b>Angular</b>&nbsp;&mdash; это платформа для разработки мобильных и&nbsp;десктопных веб-приложений. Наши приложения теперь представляют из&nbsp;себя &laquo;толстый клиент&raquo;, где управление отображением и&nbsp;часть логики перенесены на&nbsp;сторону браузера. Так сервер уделяет больше времени доставке данных, плюс пропадает необходимость в&nbsp;постоянной перерисовке. С&nbsp;Angular мы&nbsp;описываем структуру приложения декларативно, а&nbsp;с&nbsp;TypeScript начинаем допускать меньше ошибок, благодаря статической типизации. В&nbsp;Angular присутствует огромное количество возможностей из&nbsp;коробки. Это может быть одновременно и&nbsp;хорошо и&nbsp;плохо, в&nbsp;зависимости от&nbsp;того, что вам необходимо.</p><hr>
  
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
  <li>Выше порог вхождения из-за Observable (RxJS) и Dependency Injeciton</li>
  <li>Чтобы все работало хорошо и быстро нужно тратить время на дополнительные оптимизации 
    (он не супер быстрый, по умолчанию, но быстрее AngularJS во много раз)</li>
  <li>Если вы планируете разрабатывать большое enterprise-приложение, то в этом случае, у вас нет архитектуры из коробки - нужно добавлять Mobx, Redux, MVVM, CQRS/CQS или другой state-менеджер, чтобы потом не сломать себе мозг</li>
  <li>Angular-Univesal имеет много подводных камней</li>
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
  <li>Angular работает напрямую с свойства и собитиями DOM элементов</li>
  <li>Одностороннее связывание данных через [property]</li>
  <li>Двустороннее связывание данных через [(property)]</li>
  <li>Новый механизм DI, роутинга, запуска приложения</li>
</ul>

<b>Основные преимущества Angular</b>: <br>

<ul>
  <li>Обратная совместимость Angular 2, 4, 5, ..</li>
  <li>TypeScript с улучшенной проверкой типов</li>
  <li>Встроенный компилятор с режимами JIT и AOT (+ cокращение кода)</li>
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
  in progress..
</div>
</details>


##### Angular Template синтаксис

<details>
<summary>Что такое интерполяция в Angular?</summary>
<div><br>
  
Разметка интерполяции с внедренными выражениями используется в Angular для присвоение данных текстовым нодам и значения аттрибутов. Например:
  
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
  in progress..
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
<div class="lessons-list" *ngIf="lessons else loading">
  ... 
</div>

<ng-template #loading>
    <div>Loading...</div>
</ng-template>
```

  <h4>2. ng-container</h4>
  
  `<ng-container>` - это логический контейнер, который может использоваться для группировки узлов, но не отображается в дереве DOM как узел (node).

  На самом деле структурные директивы (*ngIf, *ngFor, ..) являются синтаксическим сахаром для наших шаблонов. В реальности, данные шаблоны трансформируются в такие конструкции:
  
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
  <div class="lesson-detail">
      {{lesson | json}}
  </div>
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
    <div class="lesson-detail">
        {{lesson | json}}
    </div>
  </div> 
</div>
```

Однако, чтобы избежать необходимости создавать дополнительный div, мы можем вместо этого использовать директиву ng-container:

```html
<ng-container *ngIf="lessons">
    <div class="lesson" *ngFor="let lesson of lessons">
        <div class="lesson-detail">
            {{lesson | json}}
        </div>
    </div>
</ng-container>
```

Как мы видим, директива ng-container предоставляет нам элемент, в котором мы можем использовать структурную директиву, без необходимости создавать дополнительный элемент.

Еще пара примечательных примеров, если все же вы хотите использовать ng-template вместо ng-container, по определенным правилам вы не сможете использовать полную конструкцию структурных директив.

Вы можете писать либо так:

```html
<div class="mainwrap">
    <ng-container *ngIf="true">
        <h2>Title</h2>
        <div>Content</div>
    </ng-container>
</div>
```

Либо так:

```html
<div class="mainwrap">
    <ng-template [ngIf]="true">
        <h2>Title</h2>
        <div>Content</div>
    </ng-template>
</div>
```

На выходе, при рендеринге будет одно и тоже:

```html
<div class="mainwrap">
      <h2>Title</h2>
      <div>Content</div>
</div>
```

 <h4>3. ng-content</h4>
 
 `<ng-content>` - позволяет внедрять родительским компонентам html-код в дочерние компоненты.
 
Здесь на самом деле, немного сложнее уже чем с ng-template, ng-container. Так как ng-content решает задачу проецирования контента в ваши веб-компоненты. Веб-компоненты состоят из нескольких отдельных технологий. Вы можете думать о Веб-компонентах как о переиспользуемых виджетах пользовательского интерфейса, которые создаются с помощью открытых веб-технологий. Они являются частью браузера и поэтому не нуждаются во внешних библиотеках, таких как jQuery или Dojo. Существующий Веб-компонент может быть использован без написания кода, просто путем импорта выражения на HTML-страницу. Веб-компоненты используют новые или разрабатываемые стандартные возможности браузера.

Давайте представим ситуацию от обратного, нам нужно параметризировать наш компонент. Мы хотим сделать так, чтобы на вход в компонент мы могли передать какие-либо статичные данные. Это можно сделать несколькими способами. 

comment.component.ts:

```ts
@Component({
  selector: 'comment',
  template: `
    <h1>Комментарий: </h1>
    <p>{{data}}</p>
  `
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
  selector: 'comment',
  template: `
    <h1>Комментарий: </h1>
    <ng-content></ng-content>
  `
})
export class CommentComponent { 
}
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
<br>

1. Используя метод `ApplicationRef.prototype.tick`, который запустит `change detection` на всем дереве компонентов.

```typescript
import { Component, ApplicationRef, NgZone } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <h1>Hello, {{ name }}!</h1>
    `
})
export class AppComponent {

    public name: string = null;

    constructor(private app: ApplicationRef, private zone: NgZone) {
        this.zone.runOutsideAngular(() => {
            setTimeout(() => {
                this.name = window.prompt('What is your name?', 'Jake');
                this.app.tick();
            }, 5000);
        });
    }
    
}
```

2. Используя метод `NgZone.prototype.run`, который также запустит `change detection` на всем дереве.

```typescript
import { Component, NgZone } from '@angular/core';
import { SomeService } from './some.service'

@Component({
    selector: 'app-root',
    template: `
        <h1>Hello, {{ name }}!</h1>
    `,
    providers: [SomeService]
})
export class AppComponent {

   public name: string = null;

   constructor(private zone: NgZone, private service: SomeService) {
       this.zone.runOutsideAngular(() => {
           this.service.getName().then((name: string) => {
               this.zone.run(() => this.name = name);
           });
       });
   }
   
}
```

Метод `run` под капотом сам вызывает `tick`, а параметром принимает функцию, которую нужно выполнить перед `tick`. То есть:

```typescript
this.zone.run(() => this.name = name);

// идентично

this.name = name;
this.app.tick();
```

3. Используя метод `ChangeDetectorRef.prototype.detectChanges`, который запустит `change detection` на текущем компоненте и дочерних.

```typescript
import { Component, NgZone, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <h1>Hello, {{ name }}!</h1>
    `
})
export class AppComponent {

   public name: string = null;

   constructor(private zone: NgZone, private ref: ChangeDetectorRef) {
       this.zone.runOutsideAngular(() => {
           this.name = window.prompt('What is your name?', 'Jake');
           this.ref.detectChanges();
       });
   }
   
}
```
</details>


<details>
<summary>Что такое EventEmmiter и как подписываться на события?</summary>
<div>
  in progress..
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
<summary>Сколько Change Detector'ов может быть во всем приложении?</summary>
У каждого компонента есть свой Change Detector, все Change Detector'ы наследуются от AbstractChangeDetector.
  
<br>
</details>

<details>
<summary>Основное отличие constructor от ngOnInit?</summary>
<br>
  
Конструктор сам по себе является фичей самого класса, а не Angular. Основная разница в том, что Angular запустит `ngOnInit`, после того, как закончит настройку компонента, то есть, это сигнал, благодаря которому свойства `@Input()` и другие байндинги, и декорируемые свойства доступны в `ngOnInit`, но не определены внутри конструктора, по дизайну.

<br>
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

<details>
<summary>В чём разница между switchMap, mergeMap, concatMap?</summary>
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
<br>

Interceptor (перехватчик) - просто причудливое слово для функции, которая получает запросы / ответы до того, как они будут обработаны / отправлены на сервер. Нужно использовать перехватчики, если имеет смысл предварительно обрабатывать многие типы запросов одним способом. Например нужно для всех запросов устанавливать хедер авторизации `Bearer`:

 token.interceptor.ts
 
```typescript
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token') as string;

        if (token) {
            req = req.clone({
                setHeaders: {
                    'Authorization': `Bearer ${token}`
                }
            });
        }

        return next.handle(req);
    }
}
```

И регистрируем перехватчик как синглтон в провайдерах модуля:

app.module.ts

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TokenInterceptor } from './token.interceptor';

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true // <--- может быть зарегистрирован массив перехватчиков
    }]
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
<summary>Что такое Karma, Jest, Jasmine (зачем их используют совместно при разработке на Angular)?</summary>
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
