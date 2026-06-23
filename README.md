# Вопросы на собеседовании по Angular

Вопросы помогают определить уровень Angular-разработчика: насколько глубоко он понимает Web-платформу, JavaScript,
TypeScript и устройство Angular-приложений.

Angular-ответы ориентированы на версии 19–22. Для нового кода используются standalone APIs, signals и functional
providers; поддерживаемые старые API помечены как legacy.

Дополнительные материалы:

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

## Как пользоваться

- **Junior**: Web Platform, основы JavaScript и TypeScript, базовые вопросы Angular, templates, DI и forms.
- **Middle**: дополнительно Engineering principles, Change Detection, Signals, RxJS, Router, HTTP, performance и
  testing.
- **Middle+/Senior**: архитектурные компромиссы, управление состоянием, SSR и hydration, security, libraries, design
  systems и tooling.

## Быстрый маршрут подготовки

- **Если есть 1 час**: Angular Core — components, DI, providers и lifecycle; Change Detection, OnPush и Signals; RxJS —
  Observable, Subject, `switchMap` и `mergeMap`; Forms, HTTP и Router; основы performance; Micro Frontends demo — host,
  remote, manifest, `remoteEntry.json` и fallback UI.
- **Если есть 1 день**: пройдите маршрут на 1 час, затем добавьте JavaScript, TypeScript, browser rendering, testing,
  security и SSR.
- **Если есть 3 дня**: изучите основные разделы по порядку, запустите примеры и отдельно повторите архитектурные
  trade-offs, production и вопросы уровня Middle+/Senior.

## Содержание

- [Web Platform](#web-platform)
  - [HTML](#html)
  - [Forms](#forms)
  - [Accessibility](#accessibility)
  - [SEO и metadata](#seo-и-metadata)
  - [SVG и media](#svg-и-media)
  - [CSS Core](#css-core)
  - [CSS Layout](#css-layout)
  - [CSS Flexbox](#css-flexbox)
  - [CSS Responsive](#css-responsive)
  - [CSS Architecture](#css-architecture)
  - [CSS Rendering и Performance](#css-rendering-и-performance)
  - [Modern CSS](#modern-css)
  - [Browser rendering и performance](#browser-rendering-и-performance)
  - [HTTP, HTTPS и curl](#http-https-и-curl)
- [Computer Science basics](#computer-science-basics)
  - [Архитектура компьютера](#архитектура-компьютера)
  - [Память, stack и heap](#память-stack-и-heap)
  - [GC и управление памятью](#gc-и-управление-памятью)
- [JavaScript](#javascript)
  - [Значения, ссылки и память](#значения-ссылки-и-память)
  - [Promise и асинхронность](#promise-и-асинхронность)
  - [Event Loop](#event-loop)
- [TypeScript](#typescript)
- [Основы программирования и проектирования](#основы-программирования-и-проектирования)
  - [Алгоритмы и структуры данных](#алгоритмы-и-структуры-данных)
- [State Management](#state-management)
  - [Redux](#redux)
  - [MobX](#mobx)
  - [Angular state management](#angular-state-management)
- [Node.js](#nodejs)
  - [Node.js basics](#nodejs-basics)
  - [npm и package scripts](#npm-и-package-scripts)
  - [Node.js для frontend tooling](#nodejs-для-frontend-tooling)
  - [Node.js observability и RPS monitoring](#nodejs-observability-и-rps-monitoring)
- [Infrastructure](#infrastructure)
  - [Docker](#docker)
  - [Docker Compose](#docker-compose)
  - [Frontend deployment](#frontend-deployment)
  - [Feature toggles](#feature-toggles)
- [Рабочее окружение frontend-разработчика](#рабочее-окружение-frontend-разработчика)
  - [Методологии и процессы](#методологии-и-процессы)
- [Soft skills и интервью](#soft-skills-и-интервью)
  - [Знакомство с командой](#знакомство-с-командой)
  - [Самопрезентация](#самопрезентация)
  - [STAR-подход](#star-подход)
  - [Мотивация и цели](#мотивация-и-цели)
  - [Вклад в проект](#вклад-в-проект)
  - [Технологический кругозор](#технологический-кругозор)
  - [Принятие решений](#принятие-решений)
  - [Работа в условиях неопределенности](#работа-в-условиях-неопределенности)
  - [Команда и процессы](#команда-и-процессы)
  - [Коммуникация и конфликты](#коммуникация-и-конфликты)
  - [Обратная связь](#обратная-связь)
  - [Ошибки, ответственность и развитие](#ошибки-ответственность-и-развитие)
  - [Вопросы команде](#вопросы-команде)
- [Angular](#angular)
  - [Angular Core](#angular-core)
  - [Angular PWA и Service Worker](#angular-pwa-и-service-worker)
  - [Основные концепции](#основные-концепции)
  - [Templates](#templates)
  - [Компоненты, директивы, сервисы и pipes](#компоненты-директивы-сервисы-и-pipes)
  - [Lifecycle и rendering](#lifecycle-и-rendering)
  - [Angular Change Detection](#angular-change-detection)
  - [Angular Signals](#angular-signals)
  - [RxJS](#rxjs)
  - [Dependency Injection](#dependency-injection)
  - [Управление состоянием](#управление-состоянием)
  - [Angular HTTP](#angular-http)
  - [Security](#security)
  - [Angular Router](#angular-router)
  - [Angular Forms](#angular-forms)
  - [Performance](#performance)
  - [SSR, hydration и SEO](#ssr-hydration-и-seo)
  - [Testing](#testing)
  - [Angular libraries и design systems](#angular-libraries-и-design-systems)
  - [Micro Frontends](#micro-frontends)
  - [Tooling](#tooling)

## Web Platform

### HTML

<details>
<summary>Что такое HTML и какую задачу он решает?</summary><br>
<table><tr><td>

HTML описывает структуру и смысл документа: заголовки, текст, навигацию, формы, ссылки и изображения. Браузер разбирает
разметку и строит DOM, который используют CSS, JavaScript, поисковые роботы и ассистивные технологии (assistive
technologies).

```html
<button>Buy</button>
```

![img.png](assets/webplatform/html/html-and-css-difference.png)

</td></tr></table>

</details>

<details>
<summary>Чем tag отличается от HTML element?</summary><br>
<table><tr><td>

![img.png](assets/webplatform/html/what-the-difference-between-tag-and-element.png)

Tag — синтаксическая часть разметки, например `<p>` или `</p>`. Element — целый узел: открывающий tag, attributes,
content и закрывающий tag. Void elements вроде `<img>` не имеют closing tag и содержимого.

</td></tr></table>

</details>

<details>
<summary>Что такое HTML attribute?</summary><br>
<table><tr><td>

![img.png](assets/webplatform/html/what-is-html-attribute.png)

Attribute задает дополнительную информацию или поведение element: `href`, `type`, `disabled`, `lang`. Global attributes
вроде `id`, `class`, `hidden` и `data-*` доступны большинству элементов, а часть attributes имеет смысл только для
определенных tags.

</td></tr></table>

</details>

<details>
<summary>Чем block element отличается от inline element?</summary><br>
<table><tr><td>

Исторически block elements начинали новую строку, а inline elements участвовали в строке текста. В современном CSS
реальное поведение задает `display`, поэтому семантическую категорию HTML-элемента нельзя использовать как замену знанию
layout.

</td></tr></table>

</details>

<details>
<summary>Что такое semantic HTML?</summary><br>
<table><tr><td>

Semantic HTML использует элементы по их назначению: `nav` для навигации, `main` для основного контента, `button` для
действия. Это делает структуру понятнее браузеру, разработчикам, поисковым системам и assistive technologies.

</td></tr></table>

</details>

<details>
<summary>Чем <code>section</code>, <code>article</code>, <code>main</code>, <code>aside</code> и <code>nav</code> отличаются друг от друга?</summary><br>
<table><tr><td>

`main` содержит основное уникальное содержимое страницы, `nav` — крупный блок навигации, `article` — самостоятельный
материал, пригодный для отдельного распространения, `section` — тематический раздел обычно с заголовком, `aside` —
связанный, но второстепенный контент.

</td></tr></table>

</details>

<details>
<summary>Когда использовать <code>button</code>, а когда <code>a</code>?</summary><br>
<table><tr><td>

`button` выполняет действие: отправляет форму, открывает dialog, меняет состояние. `a` с `href` выполняет навигацию к
URL. Правильный элемент сразу дает ожидаемые keyboard behavior, semantics и browser features вроде открытия ссылки в
новой вкладке.

</td></tr></table>

</details>

<details>
<summary>Почему clickable <code>div</code> — плохая практика?</summary><br>
<table><tr><td>

`div` не получает focus, keyboard activation, role и accessible name интерактивного элемента автоматически. Их ручная
имитация сложна и хрупка. Для действий следует использовать `button`, для переходов — `a`.

</td></tr></table>

</details>

<details>
<summary>Что такое document outline?</summary><br>
<table><tr><td>

Это логическая структура документа, прежде всего иерархия заголовков и landmarks. На практике нужно последовательно
использовать `h1`–`h6`, не полагаясь на давно предложенный, но не реализованный браузерами outline algorithm для
sectioning elements.

</td></tr></table>

</details>

<details>
<summary>Что такое <code>doctype</code> и зачем он нужен?</summary><br>
<table><tr><td>

`<!doctype html>` сообщает браузеру, что документ следует обрабатывать в standards mode. Без корректного doctype браузер
может включить quirks mode с устаревшими правилами layout и совместимости.

</td></tr></table>

</details>

<details>
<summary>Что делает атрибут <code>lang</code>?</summary><br>
<table><tr><td>

`lang` задает язык документа или фрагмента. Он помогает screen reader выбрать произношение, браузеру — проверку
орфографии и переносы, а поисковым системам — интерпретировать содержимое.

</td></tr></table>

</details>

<details>
<summary>Для чего нужны <code>data-*</code> attributes?</summary><br>
<table><tr><td>

Они хранят небольшие пользовательские данные прямо на element и доступны через `dataset`. Их используют для связи
разметки с поведением или тестами, но не как замену application state и не для секретных данных.

</td></tr></table>

</details>

<details>
<summary>Что такое custom elements?</summary><br>
<table><tr><td>

Custom Elements API позволяет регистрировать собственные HTML-элементы с именем через дефис и lifecycle callbacks. Это
часть Web Components; Shadow DOM и templates являются отдельными API и не включаются автоматически.

</td></tr></table>

</details>

### Forms

<details>
<summary>Как работает HTML form?</summary><br>
<table><tr><td>

`form` объединяет controls и при submit формирует набор успешных пар `name=value`. Браузер валидирует controls, кодирует
данные и отправляет их на `action` выбранным `method`, если JavaScript не перехватил событие.

</td></tr></table>

</details>

<details>
<summary>Что делают <code>action</code> и <code>method</code> у формы?</summary><br>
<table><tr><td>

`action` задает URL отправки, `method` — HTTP-метод `get` или `post`. При `GET` данные попадают в query string, при
`POST` — в request body. Для других HTTP-методов обычно используют JavaScript или backend method override.

</td></tr></table>

</details>

<details>
<summary>Чем GET form отличается от POST form?</summary><br>
<table><tr><td>

GET подходит для безопасного поиска и фильтров: URL можно сохранить и повторить. POST используют для операций с побочным
эффектом и больших или чувствительных данных, но HTTPS все равно обязателен. Выбор метода не является
authorization-механизмом.

</td></tr></table>

</details>

<details>
<summary>Почему специализированные типы <code>input</code> полезнее <code>text</code>?</summary><br>
<table><tr><td>

Типы `email`, `number`, `date`, `url`, `search`, `tel`, `checkbox` и другие дают подходящую семантику, native
validation, мобильную клавиатуру и browser UI. Поддержка и локализация отдельных типов различаются, поэтому server
validation все равно нужна.

</td></tr></table>

</details>

<details>
<summary>Что такое <code>label</code> и как связать его с control?</summary><br>
<table><tr><td>

`label` дает полю доступное имя и увеличивает clickable area. Его связывают атрибутом `for`, равным `id` control, или
вкладывают control внутрь label.

```html
<label for="email">Email</label>
<input
  id="email"
  name="email"
  type="email"
/>
```

</td></tr></table>

</details>

<details>
<summary>Почему <code>placeholder</code> не должен заменять <code>label</code>?</summary><br>
<table><tr><td>

Placeholder исчезает при вводе, часто имеет низкий contrast и не является надежной подписью для assistive technologies.
Он может показывать пример формата, но постоянное понятное имя поля должен задавать label.

</td></tr></table>

</details>

<details>
<summary>Для чего нужен <code>name</code> у form control?</summary><br>
<table><tr><td>

`name` определяет ключ при native form submission и объединяет radio buttons в одну группу. Control без `name` обычно не
входит в отправляемый набор данных.

</td></tr></table>

</details>

<details>
<summary>Что такое native validation?</summary><br>
<table><tr><td>

Браузер проверяет constraints вроде `required`, `min`, `max`, `minlength`, `maxlength`, `pattern` и соответствие типу
перед submit. Это улучшает UX, но не заменяет backend validation, потому что клиентскую проверку можно обойти.

</td></tr></table>

</details>

<details>
<summary>Для чего нужен <code>autocomplete</code>?</summary><br>
<table><tr><td>

`autocomplete` подсказывает браузеру назначение поля, например `name`, `email`, `current-password` или `one-time-code`.
Корректные tokens ускоряют заполнение и помогают пользователям с когнитивными и моторными ограничениями.

</td></tr></table>

</details>

<details>
<summary>Как сделать accessible error message для поля?</summary><br>
<table><tr><td>

Сообщение должно быть конкретным, видимым и связанным с полем через `aria-describedby`; невалидность можно обозначить
`aria-invalid="true"`. После submit focus переводят осмысленно, а динамическую сводку ошибок при необходимости объявляют
live region.

</td></tr></table>

</details>

<details>
<summary>Почему disabled field не отправляется вместе с формой?</summary><br>
<table><tr><td>

Disabled control исключается из focus order, validation и набора успешных controls при submit. Если значение должно
отправляться, используют другой способ моделирования; скрытое поле нельзя считать защитой от подмены данных.

</td></tr></table>

</details>

<details>
<summary>Чем <code>disabled</code> отличается от <code>readonly</code>?</summary><br>
<table><tr><td>

`disabled` control не фокусируется и не отправляется. `readonly` поддерживается только частью controls, остается
focusable и отправляет значение, но пользователь не может его изменить обычным вводом.

</td></tr></table>

</details>

<details>
<summary>Для чего нужны <code>fieldset</code> и <code>legend</code>?</summary><br>
<table><tr><td>

`fieldset` семантически группирует связанные controls, а `legend` дает группе доступное название. Это особенно важно для
radio buttons и checkbox groups, где отдельные labels не объясняют общий вопрос.

</td></tr></table>

</details>

<details>
<summary>Как группировать radio buttons?</summary><br>
<table><tr><td>

Radio buttons одной группы получают одинаковый `name`, уникальные `id` и собственные labels. Группу помещают в
`fieldset` с `legend`, чтобы ее назначение было понятно визуально и screen reader.

</td></tr></table>

</details>

### Accessibility

<details>
<summary>Что такое accessibility и WCAG?</summary><br>
<table><tr><td>

Accessibility, или a11y, — проектирование интерфейса так, чтобы им могли пользоваться люди с разными возможностями и
устройствами. WCAG — рекомендации W3C, сгруппированные по принципам perceivable, operable, understandable и robust, с
проверяемыми критериями уровней A, AA и AAA.

</td></tr></table>

</details>

<details>
<summary>Что такое keyboard navigation и visible focus?</summary><br>
<table><tr><td>

Все действия должны быть доступны с клавиатуры в логичном порядке. Текущий focus обязан быть заметен; нельзя убирать
outline без равноценной замены. Native controls уже поддерживают Tab, Enter, Space и ожидаемые паттерны.

</td></tr></table>

</details>

<details>
<summary>Что такое focus management и focus trap?</summary><br>
<table><tr><td>

Focus management переводит focus после значимого UI-события и возвращает его в понятное место. Modal dialog ограничивает
Tab внутри себя, устанавливает начальный focus и после закрытия возвращает его trigger. Focus trap не применяют к
немодальным областям без необходимости.

</td></tr></table>

</details>

<details>
<summary>Что такое screen reader?</summary><br>
<table><tr><td>

Screen reader озвучивает accessibility tree и позволяет перемещаться по headings, landmarks, controls и другим
семантическим узлам. Проверка только DOM или визуального вида не гарантирует корректный опыт screen reader.

</td></tr></table>

</details>

<details>
<summary>Что такое ARIA и когда ее использовать?</summary><br>
<table><tr><td>

ARIA добавляет roles, states и relationships в accessibility tree, но не создает keyboard behavior и не меняет семантику
для обычного UI автоматически. Сначала выбирают native HTML; ARIA используют, когда нужную семантику нельзя выразить
подходящим элементом.

</td></tr></table>

</details>

<details>
<summary>Что такое accessible name и как кнопка его получает?</summary><br>
<table><tr><td>

Accessible name — имя элемента в accessibility tree. Кнопка обычно получает его из видимого текста, затем могут
учитываться `aria-labelledby` или `aria-label`. Видимая подпись предпочтительнее скрытого имени, когда она уместна.

</td></tr></table>

</details>

<details>
<summary>Чем <code>aria-label</code>, <code>aria-labelledby</code> и <code>aria-describedby</code> отличаются?</summary><br>
<table><tr><td>

`aria-label` задает строку имени напрямую, `aria-labelledby` берет имя из текста других элементов, а `aria-describedby`
добавляет описание после имени. Они не взаимозаменяемы: label отвечает «что это», description — за дополнительную
инструкцию или ошибку.

</td></tr></table>

</details>

<details>
<summary>Для чего нужен <code>aria-hidden</code>?</summary><br>
<table><tr><td>

`aria-hidden="true"` скрывает element и его descendants от accessibility tree, не меняя визуальное отображение. Его
нельзя ставить на focusable element или его ancestor: keyboard focus окажется на узле, который screen reader не видит.

</td></tr></table>

</details>

<details>
<summary>Что такое live region и <code>role="alert"</code>?</summary><br>
<table><tr><td>

Live region сообщает assistive technologies о динамических изменениях без перемещения focus. `role="alert"` подходит для
срочных ошибок и обычно объявляется assertive; обычные статусы лучше сообщать через менее навязчивый `role="status"`.

</td></tr></table>

</details>

<details>
<summary>Как сделать доступное modal dialog?</summary><br>
<table><tr><td>

Нужны понятное имя, modal semantics, начальный focus, ограничение Tab внутри окна, закрытие Escape и возврат focus на
trigger. Native `<dialog>` решает часть поведения, но название, содержимое, trigger и тестирование остаются задачей
приложения.

</td></tr></table>

</details>

<details>
<summary>Как сделать доступные dropdown и tabs?</summary><br>
<table><tr><td>

Сначала выбирают правильный паттерн: disclosure, menu, listbox и combobox имеют разное поведение. Tabs используют
`tablist`, `tab`, `tabpanel`, arrow-key navigation и связи через `aria-controls`/`aria-labelledby`. Для сложных widgets
следуют WAI-ARIA Authoring Practices и тестируют клавиатурой и screen reader.

</td></tr></table>

</details>

<details>
<summary>Как сделать доступную icon button?</summary><br>
<table><tr><td>

Используют настоящий `button` с accessible name, например `aria-label="Закрыть"`; декоративную SVG внутри скрывают через
`aria-hidden="true"`. Нужны достаточный target size, visible focus и понятные hover/disabled states.

</td></tr></table>

</details>

<details>
<summary>Почему цвет не должен быть единственным способом передачи информации?</summary><br>
<table><tr><td>

Различие может быть незаметно пользователям с нарушением цветовосприятия или на плохом дисплее. Ошибку, статус или
выбранное состояние дублируют текстом, иконкой, формой или другим независимым признаком и обеспечивают достаточный
contrast.

</td></tr></table>

</details>

<details>
<summary>Для чего нужен атрибут lang?</summary><br>
<table><tr><td>

Атрибут `lang` задает язык документа или отдельного фрагмента текста.

```html
<html lang="ru"></html>
```

Он помогает:

- скринридерам выбрать правильное произношение;
- браузеру проверять орфографию и предлагать перевод;
- поисковым системам определить язык страницы;
- применять языковые правила переноса и типографики.

```html
<p>
  Я изучаю
  <span lang="en">frontend development</span>
  .
</p>
```

`lang` не меняет внешний вид напрямую, но помогает браузеру и assistive technologies правильно интерпретировать контент.

</td></tr></table>

</details>

<details>
<summary>Для чего нужны семантические HTML-теги?</summary><br>
<table><tr><td>

Семантические теги описывают назначение контента: `header`, `nav`, `main`, `article`, `button`.

Они улучшают accessibility, навигацию скринридеров, SEO и читаемость разметки. Семантика не заменяет корректную
структуру заголовков, подписи элементов форм и поддержку клавиатуры.

</td></tr></table>

</details>

### SEO и metadata

<details>
<summary>Для чего нужны <code>title</code> и meta description?</summary><br>
<table><tr><td>

`title` задает название документа во вкладке и часто заголовок поискового результата. Meta description кратко описывает
страницу и может использоваться как snippet. Они должны быть уникальными и соответствовать реальному содержимому.

</td></tr></table>

</details>

<details>
<summary>Зачем нужен <code>meta name="viewport"</code>?</summary><br>
<table><tr><td>

`<meta name="viewport" content="width=device-width, initial-scale=1">` сопоставляет layout viewport ширине устройства.
Без него мобильный браузер может отрендерить страницу в широком виртуальном viewport и уменьшить ее целиком.

</td></tr></table>

</details>

<details>
<summary>Что такое Open Graph?</summary><br>
<table><tr><td>

Open Graph metadata задает title, description, image и URL для preview при публикации ссылки в социальных сетях и
мессенджерах. Это не замена обычным HTML metadata; изображения должны иметь доступный URL и подходящие размеры.

</td></tr></table>

</details>

<details>
<summary>Что такое favicon?</summary><br>
<table><tr><td>

Favicon — набор иконок сайта для вкладок, bookmarks, history и устройств. Его подключают через `<link rel="icon">`, а
форматы и размеры выбирают с учетом целевых браузеров и manifest приложения.

</td></tr></table>

</details>

<details>
<summary>Что такое canonical URL?</summary><br>
<table><tr><td>

`<link rel="canonical" href="…">` указывает предпочтительный URL для страниц с одинаковым или очень похожим content. Это
сигнал поисковой системе против дублирования, а не redirect и не механизм безопасности.

</td></tr></table>

</details>

<details>
<summary>Как SSR влияет на SEO?</summary><br>
<table><tr><td>

SSR или prerender отдает содержательный HTML раньше JavaScript, упрощая индексацию и previews. Современные crawlers
могут выполнять JavaScript, но это требует времени и ресурсов; SPA без server-rendered content также хуже работает у
ботов без полного rendering support.

</td></tr></table>

</details>

<details>
<summary>Какие HTML-теги важны для поисковых систем?</summary><br>
<table><tr><td>

Важны содержательные `title`, headings, links с понятным текстом, semantic landmarks, `img alt`, canonical и metadata.
Семантика помогает понять структуру, но не компенсирует слабый content, закрытую индексацию или плохую доступность.

</td></tr></table>

</details>

<details>
<summary>Как правильно использовать заголовки <code>h1</code>–<code>h6</code>?</summary><br>
<table><tr><td>

Заголовки создают иерархию, а не выбираются ради размера шрифта. Обычно у страницы один основной `h1`, затем уровни идут
последовательно по структуре. Несколько `h1` технически допустимы, но один главный заголовок обычно понятнее
пользователям и инструментам.

</td></tr></table>

</details>

### SVG и media

<details>
<summary>Чем JPEG, PNG, WebP, AVIF и SVG отличаются друг от друга?</summary><br>
<table><tr><td>

JPEG подходит для фотографий без прозрачности, PNG — для lossless-графики и прозрачности, WebP и AVIF дают более
современное сжатие, SVG — векторную графику. Формат выбирают по типу изображения, качеству, размеру, transparency,
animation и browser support.

</td></tr></table>

</details>

<details>
<summary>Когда использовать SVG, а когда raster image?</summary><br>
<table><tr><td>

SVG подходит для иконок, схем и простой графики, которая должна масштабироваться и стилизоваться. Для фотографий и
сложных текстур raster format обычно компактнее и быстрее. Очень сложный SVG тоже может быть тяжелым для rendering.

</td></tr></table>

</details>

<details>
<summary>Что такое responsive images и как работают <code>srcset</code>/<code>sizes</code>?</summary><br>
<table><tr><td>

`srcset` перечисляет image candidates по ширине или density, а `sizes` сообщает ожидаемый layout size. Браузер выбирает
ресурс с учетом viewport, DPR, доступной ширины и других факторов, не загружая все варианты.

</td></tr></table>

</details>

<details>
<summary>Что делает <code>loading="lazy"</code>?</summary><br>
<table><tr><td>

Атрибут откладывает загрузку изображения или iframe, пока ресурс не приблизится к viewport. Это экономит сеть, но его не
ставят на вероятный LCP image. `width` и `height` задают заранее, чтобы сохранить место и избежать CLS.

</td></tr></table>

</details>

<details>
<summary>Что такое <code>alt</code> и когда он должен быть пустым?</summary><br>
<table><tr><td>

`alt` передает текстовую альтернативу смыслового изображения. У декоративного изображения используют `alt=""`, чтобы
screen reader его пропустил. Alt описывает назначение изображения в контексте, а не обязательно все визуальные детали.

</td></tr></table>

</details>

<details>
<summary>Для чего нужен элемент <code>picture</code>?</summary><br>
<table><tr><td>

`picture` позволяет задавать `source` для разных media conditions, crops и formats, сохраняя fallback `img`. Его
используют для art direction или выбора формата; обычное изменение resolution часто достаточно решить через `srcset`.

</td></tr></table>

</details>

<details>
<summary>Что такое SVG?</summary><br>
<table><tr><td>

SVG — векторный формат изображения, который описывает картинку через XML-разметку: линии, пути, фигуры, градиенты и
текст. В отличие от PNG и JPEG, SVG масштабируется без потери качества: браузер пересчитывает геометрию, а не
растягивает пиксели.

</td></tr></table>

</details>

<details>
<summary>Почему SVG подходит для scalable icons?</summary><br>
<table><tr><td>

SVG-иконка остается четкой при разных размерах и плотностях экрана. Один файл можно использовать в размерах `16px`,
`24px`, `48px` и на Retina-дисплеях без отдельного набора изображений.

</td></tr></table>

</details>

<details>
<summary>Как сделать SVG-иконку масштабируемой?</summary><br>
<table><tr><td>

Нужно задать `viewBox` и управлять внешними `width` и `height` атрибутами или через CSS:

```html
<svg
  viewBox="0 0 24 24"
  width="24"
  height="24"
  aria-hidden="true"
>
  <path d="M12 2L2 22h20L12 2z" />
</svg>
```

```css
.icon {
  width: 32px;
  height: 32px;
}
```

`viewBox` сохраняет внутреннюю систему координат, поэтому браузер корректно пересчитывает геометрию под новый размер.

</td></tr></table>

</details>

<details>
<summary>Что такое <code>viewBox</code> в SVG?</summary><br>
<table><tr><td>

`viewBox` задает координатную область SVG. Например, `viewBox="0 0 24 24"` означает виртуальную область шириной и
высотой 24 единицы. По ней браузер масштабирует содержимое SVG под внешний размер.

</td></tr></table>

</details>

<details>
<summary>Чем <code>width</code>/<code>height</code> отличаются от <code>viewBox</code>?</summary><br>
<table><tr><td>

`width` и `height` задают внешний размер SVG на странице, а `viewBox` — внутреннюю координатную систему. При наличии
`viewBox` внешний размер можно менять через CSS, сохраняя пропорции изображения.

</td></tr></table>

</details>

<details>
<summary>Как менять цвет SVG-иконки через CSS?</summary><br>
<table><tr><td>

Значение `currentColor` позволяет иконке наследовать CSS-свойство `color` родителя:

```html
<button class="button">
  <svg
    viewBox="0 0 24 24"
    class="icon"
    aria-hidden="true"
  >
    <path
      fill="currentColor"
      d="M12 2L2 22h20L12 2z"
    />
  </svg>
  Отправить
</button>
```

```css
.button {
  color: #4f46e5;
}

.icon {
  width: 24px;
  height: 24px;
}
```

</td></tr></table>

</details>

<details>
<summary>Что лучше для иконок: inline SVG, SVG sprite или <code>img</code>?</summary><br>
<table><tr><td>

Inline SVG удобен для управления цветом, состояниями и доступностью через CSS. SVG sprite подходит для переиспользования
большого набора символов. `<img src="icon.svg">` проще и хорошо кешируется, но не позволяет странице напрямую менять
стили внутренних элементов SVG.

</td></tr></table>

</details>

<details>
<summary>Как сделать SVG-иконку доступной?</summary><br>
<table><tr><td>

Декоративную иконку нужно скрыть от accessibility tree:

```html
<svg
  aria-hidden="true"
  focusable="false"
></svg>
```

Если иконка передает смысл, ей нужен доступный текст, например видимая подпись рядом или имя изображения:

```html
<svg
  role="img"
  aria-label="Поиск"
></svg>
```

Для кнопки только с иконкой доступное имя обычно задают самой кнопке.

</td></tr></table>

</details>

<details>
<summary>Какие ошибки часто делают при работе с SVG-иконками?</summary><br>
<table><tr><td>

- Забывают `viewBox`.
- Жестко задают размеры и затрудняют масштабирование.
- Не используют `currentColor`, когда цвет должен наследоваться.
- Подключают тяжелые SVG без оптимизации.
- Не учитывают accessibility.
- Оставляют лишние metadata из Figma и других редакторов.

</td></tr></table>

</details>

### CSS Core

<details>
<summary>Что такое CSS и как браузер применяет его к HTML?</summary><br>
<table><tr><td>

CSS описывает presentation документа. Браузер разбирает stylesheets в CSSOM, сопоставляет selectors с DOM, разрешает
cascade и inheritance, вычисляет значения, а затем использует их для layout, paint и compositing.

</td></tr></table>

</details>

<details>
<summary>Что такое selector и declaration?</summary><br>
<table><tr><td>

Selector выбирает элементы, declaration задает пару property/value внутри rule. Несколько selectors могут совпасть с
одним элементом, после чего cascade определяет победившее значение каждого property.

</td></tr></table>

</details>

<details>
<summary>Что такое cascade?</summary><br>
<table><tr><td>

Cascade разрешает конфликт declarations по relevance, origin и importance, cascade layer, specificity, scope proximity и
порядку. Specificity — только один этап, поэтому «самый тяжелый selector всегда побеждает» — неверное упрощение.

</td></tr></table>

</details>

<details>
<summary>Что такое inheritance в CSS?</summary><br>
<table><tr><td>

Некоторые properties, например `color` и `font-family`, по умолчанию наследуют computed value родителя; размеры и box
properties обычно нет. Наследование применяется после cascade, когда для элемента нет собственного выигравшего значения.

</td></tr></table>

</details>

<details>
<summary>Что такое initial value и что делают <code>inherit</code>, <code>initial</code>, <code>unset</code>, <code>revert</code>?</summary><br>
<table><tr><td>

Каждое property имеет initial value. `inherit` берет значение родителя, `initial` возвращает specification default,
`unset` выбирает inherit или initial по природе property, `revert` откатывает текущий cascade origin/layer к более
раннему результату.

</td></tr></table>

</details>

<details>
<summary>Что такое CSS box model?</summary><br>
<table><tr><td>

Box состоит из content, padding, border и margin. При `content-box` заданная ширина относится только к content, а при
`border-box` включает padding и border. Margin находится снаружи и не входит в размер border box.

</td></tr></table>

</details>

<details>
<summary>Чем единицы <code>em</code>, <code>rem</code>, <code>%</code>, <code>vw</code>, <code>vh</code> и <code>px</code> отличаются?</summary><br>
<table><tr><td>

`rem` зависит от root font size, `em` — от font size текущего контекста, `%` — от property-specific containing value,
viewport units — от viewport, `px` — CSS pixel. Выбор определяется тем, относительно чего размер должен изменяться.

</td></tr></table>

</details>

<details>
<summary>Что такое CSS custom properties?</summary><br>
<table><tr><td>

Custom properties объявляются как `--color` и читаются через `var()`. Они участвуют в cascade, наследуются и могут
меняться runtime. Sass variables вычисляются при сборке и не существуют в browser CSSOM после compilation.

</td></tr></table>

</details>

<details>
<summary>Что такое <code>currentColor</code>?</summary><br>
<table><tr><td>

`currentColor` означает вычисленное значение property `color`. Его удобно использовать для borders, shadows и SVG
иконок, чтобы они автоматически следовали цвету текста и состояниям компонента.

</td></tr></table>

</details>

<details>
<summary>Веса в CSS</summary><br>
<table><tr><td>

Специфичность селектора записывают как три числа: `ID - классы - типы`.

- универсальный селектор `*`: `0-0-0`;
- селектор типа `button`: `0-0-1`;
- class, attribute и pseudo-class: `0-1-0`;
- ID selector: `1-0-0`.

```css
button {
}

.button {
}

#button {
}
```

Если все три селектора подходят одному элементу, победит `#button` со специфичностью `1-0-0`, затем `.button` с `0-1-0`,
затем `button` с `0-0-1`. При одинаковой специфичности выигрывает правило, расположенное позже в cascade.

Inline style рассматривают отдельно: он сильнее обычной специфичности selector. `!important` тоже не является частью
специфичности: он меняет приоритет declaration в cascade, после чего сравниваются origin, layer, specificity и порядок.

![img.png](assets/webplatform/css/css-specificity.png)

</td></tr></table>

</details>

<details>
<summary>Что такое user agent style?</summary><br>
<table><tr><td>

То есть CSS, который браузер сам применяет к HTML-элементам, даже если ты не написал свой CSS.

```html
<h1>Hello</h1>
<p>Text</p>
<button>Click</button>
```

Даже без CSS у них уже есть внешний вид:

```css
h1 {
  font-size: 2em;
  font-weight: bold;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
}

button {
  appearance: auto;
}
```

</td></tr></table>

</details>

### CSS Layout

<details>
<summary>Что такое normal flow?</summary><br>
<table><tr><td>

Normal flow — стандартное размещение элементов без positioning, float и специальных layout-контекстов. Block-элементы
идут сверху вниз, inline-контент располагается внутри строк. Flex и Grid создают собственные правила раскладки для
дочерних элементов.

</td></tr></table>

</details>

<details>
<summary>Что такое block formatting context?</summary><br>
<table><tr><td>

BFC — изолированный контекст раскладки block-элементов. Он удерживает floats и предотвращает схлопывание внешних margin
с содержимым в ряде случаев. Его создают, например, `display: flow-root`, flex/grid containers и некоторые значения
`overflow`.

</td></tr></table>

</details>

<details>
<summary>Что такое inline formatting context?</summary><br>
<table><tr><td>

В нем текст и inline boxes формируют строки внутри контейнера. На расположение влияют `line-height`, baseline,
`vertical-align` и доступная ширина. Перенос строки создает новый line box.

</td></tr></table>

</details>

<details>
<summary>Чем <code>display: block</code>, <code>inline</code>, <code>inline-block</code>, <code>flex</code>, <code>grid</code> отличаются друг от друга?</summary><br>
<table><tr><td>

`block` занимает доступную строку, `inline` участвует в тексте и не принимает обычные width/height, `inline-block`
сохраняет inline-размещение с размером box. `flex` управляет элементами преимущественно по одной оси, `grid` — по
строкам и колонкам. Выбор определяется задачей layout, а не внешним видом элемента.

</td></tr></table>

</details>

### Практика по CSS

- [Примеры Flexbox](./examples/css/flexbox/)

### CSS Flexbox

Практический пример: [`examples/css/flexbox`](./examples/css/flexbox/)

<details>
<summary id="flexbox-what">Что такое Flexbox?</summary><br>
<table><tr><td>

Flexbox — одномерная модель раскладки для строки или колонки. Она распределяет свободное пространство, выравнивает
элементы и управляет их ростом и сжатием. Подходит для toolbar, sidebar/content и элементов компонента.

![img.png](assets/webplatform/flexbox.png)

```css
.layout {
  display: flex;
  gap: 16px;
}

.sidebar {
  flex: 0 0 280px;
}

.content {
  flex: 1 1 auto;
  min-width: 0;
}
```

Практика: [`Flexbox: оси и выравнивание`](./examples/css/flexbox/example1/)

</td></tr></table>

</details>

<details>
<summary id="flexbox-tasks">Какие задачи решает Flexbox?</summary><br>
<table><tr><td>

Flexbox помогает строить одномерные раскладки: строку, колонку, toolbar, группу кнопок, карточку или пару sidebar и
content. Он распределяет свободное место, выравнивает элементы, управляет переносом, ростом и сжатием flex items.

Практика: [`Flexbox: оси и выравнивание`](./examples/css/flexbox/example1/)

</td></tr></table>

</details>

<details>
<summary id="flexbox-axes">Что такое main axis и cross axis?</summary><br>
<table><tr><td>

Main axis задается `flex-direction`: горизонтально для `row` и вертикально для `column`. Cross axis перпендикулярна
главной. Поэтому смысл `justify-content` и `align-items` зависит от направления контейнера.

Практика: [`Flexbox: column direction`](./examples/css/flexbox/example2/)

</td></tr></table>

</details>

<details>
<summary id="flexbox-justify-align">Чем <code>justify-content</code> отличается от <code>align-items</code>?</summary><br>
<table><tr><td>

`justify-content` распределяет элементы и свободное пространство вдоль main axis. `align-items` выравнивает flex items
вдоль cross axis. Для отдельного элемента cross-axis выравнивание можно изменить через `align-self`.

Практика: [`Flexbox: justify-content и align-items`](./examples/css/flexbox/example1/)

</td></tr></table>

</details>

<details>
<summary id="flexbox-direction">Что делает <code>flex-direction</code>?</summary><br>
<table><tr><td>

`flex-direction` задает направление main axis: `row`, `row-reverse`, `column` или `column-reverse`. От него зависит,
куда раскладываются flex items и по какой оси работает `justify-content`.

Практика: [`Flexbox: column direction`](./examples/css/flexbox/example2/)

</td></tr></table>

</details>

<details>
<summary id="flexbox-wrap">Что делает <code>flex-wrap</code>?</summary><br>
<table><tr><td>

`flex-wrap` определяет, должны ли элементы оставаться в одной строке или могут переноситься на новые flex lines. При
переносе расстояния между строками можно контролировать через `row-gap`, а распределение строк — через `align-content`.

Практика: [`Flexbox: wrap`](./examples/css/flexbox/example3/)

</td></tr></table>

</details>

<details>
<summary id="flexbox-gap">Что делает <code>gap</code> во Flexbox?</summary><br>
<table><tr><td>

`gap` задает расстояние между flex items и между flex lines, если элементы переносятся. Он принадлежит контейнеру и не
добавляет внешний отступ по краям раскладки.

Практика: [`Flexbox: row-gap и column-gap`](./examples/css/flexbox/example4/)

</td></tr></table>

</details>

<details>
<summary id="flexbox-gap-vs-margin">Почему <code>gap</code> часто удобнее, чем margin между элементами?</summary><br>
<table><tr><td>

`gap` описывает внутреннее расстояние между соседними элементами на уровне контейнера. Не нужны отдельные правила для
первого или последнего элемента, отрицательные margin и компенсация краев. Margin лучше оставлять для внешнего
расстояния между независимыми блоками.

Практика: [`Flexbox: gap`](./examples/css/flexbox/example3/)

</td></tr></table>

</details>

<details>
<summary id="flexbox-grow-shrink-basis">Что делают <code>flex-grow</code>, <code>flex-shrink</code> и <code>flex-basis</code>?</summary><br>
<table><tr><td>

`flex-basis` задает базовый размер до распределения пространства. `flex-grow` определяет долю положительного свободного
места, `flex-shrink` — участие в сжатии при нехватке места. Итоговый размер также зависит от min/max constraints.

Практика: [`Flexbox: flex-grow`](./examples/css/flexbox/example8/) и
[`Flexbox: flex-shrink`](./examples/css/flexbox/example6/)

</td></tr></table>

</details>

<details>
<summary id="flexbox-flex-1">Что значит <code>flex: 1</code>?</summary><br>
<table><tr><td>

В современном CSS это обычно раскрывается примерно в `flex: 1 1 0%`. Элемент начинает с нулевого basis, может расти и
сжиматься, деля доступное пространство с соседями. Для контента часто дополнительно нужен `min-width: 0`.

Практика: [`Flexbox: flex-grow`](./examples/css/flexbox/example7/)

</td></tr></table>

</details>

<details>
<summary id="flexbox-basis-0-auto">Чем <code>flex-basis: 0</code> отличается от <code>flex-basis: auto</code>?</summary><br>
<table><tr><td>

`flex-basis: 0` начинает распределение свободного места от нулевой базы, поэтому элементы с одинаковым `flex-grow` чаще
получают равные доли. `flex-basis: auto` сначала учитывает `width`, `height` или размер содержимого, а уже потом
распределяет оставшееся пространство.

Практика: [`Flexbox: flex-grow`](./examples/css/flexbox/example8/)

</td></tr></table>

</details>

<details>
<summary id="flexbox-min-width-0">Почему во Flexbox часто нужен <code>min-width: 0</code>?</summary><br>
<table><tr><td>

Flex items по умолчанию имеют automatic minimum size, часто равный min-content width. Длинный текст или вложенный блок
может растягивать колонку и ломать layout. `min-width: 0` разрешает элементу сжиматься внутри flex-контейнера, после
чего работают wrapping, ellipsis или overflow.

Практика: [`Flexbox: flex-shrink`](./examples/css/flexbox/example6/)

</td></tr></table>

</details>

<details>
<summary id="flexbox-fixed-fluid-columns">Как сделать две колонки, где одна занимает фиксированную ширину, а вторая все остальное место?</summary><br>
<table><tr><td>

Контейнеру задают `display: flex`, фиксированной колонке — `flex: 0 0 280px`, а гибкой — `flex: 1 1 auto` и часто
`min-width: 0`. Так sidebar сохраняет ширину, а content занимает оставшееся пространство.

Практика: [`Flexbox: flex-grow`](./examples/css/flexbox/example7/)

</td></tr></table>

</details>

<details>
<summary id="flexbox-equal-columns">Как сделать равные колонки через Flexbox?</summary><br>
<table><tr><td>

Для равных колонок обычно задают элементам одинаковое сокращение, например `flex: 1 1 0`. Нулевой basis убирает влияние
начального размера контента, а одинаковый `flex-grow` делит свободное место поровну.

Практика: [`Flexbox: flex-grow`](./examples/css/flexbox/example7/)

</td></tr></table>

</details>

<details>
<summary id="flexbox-card-bottom">Как прижать кнопку или блок к низу карточки через Flexbox?</summary><br>
<table><tr><td>

Карточку делают flex-контейнером с `flex-direction: column`, а нужному нижнему блоку задают `margin-top: auto`. Auto
margin забирает свободное пространство и отталкивает блок к нижнему краю карточки.

Практика: [`Flexbox: auto margin`](./examples/css/flexbox/example10/)

</td></tr></table>

</details>

<details>
<summary id="flexbox-centering">Как центрировать элемент по горизонтали и вертикали через Flexbox?</summary><br>
<table><tr><td>

Контейнеру задают `display: flex`, `justify-content: center` и `align-items: center`. При `flex-direction: row`
горизонтальное центрирование идет по main axis, а вертикальное — по cross axis.

Практика: [`Flexbox: центрирование items`](./examples/css/flexbox/example5/)

</td></tr></table>

</details>

<details>
<summary id="flexbox-vs-grid-when">Когда лучше использовать Flexbox, а когда CSS Grid?</summary><br>
<table><tr><td>

Flexbox выбирают для строки, колонки, выравнивания и неизвестного числа элементов. Grid — когда важны согласованные
колонки, строки или двумерные области. Если приходится имитировать строки вложенными flex-контейнерами, Grid обычно
проще.

Практика: [`Flexbox: wrap`](./examples/css/flexbox/example3/)

</td></tr></table>

</details>

<details>
<summary id="flexbox-common-mistakes">Какие типичные ошибки бывают при использовании Flexbox?</summary><br>
<table><tr><td>

Частые ошибки: путать main axis и cross axis, ждать от Flexbox полноценной двумерной сетки, забывать про `flex-wrap`,
использовать margin вместо `gap` для внутренних расстояний, не учитывать `flex-shrink` и не задавать `min-width: 0` для
колонок с длинным контентом.

Практика: [`Примеры Flexbox`](./examples/css/flexbox/)

</td></tr></table>

</details>

<details>
<summary>Что такое CSS Grid?</summary><br>
<table><tr><td>

Grid — двумерная система раскладки со строками, колонками и областями. Она позволяет определить структуру контейнера, а
элементам — занимать одну или несколько ячеек. Grid удобен для карточек и page-level layout.

</td></tr></table>

</details>

<details>
<summary>Чем Grid отличается от Flexbox?</summary><br>
<table><tr><td>

Grid управляет двумя измерениями одновременно и начинает с структуры контейнера. Flexbox распределяет элементы вдоль
одной основной оси и лучше адаптируется к содержимому. Их часто комбинируют: Grid для страницы, Flexbox внутри
компонентов.

</td></tr></table>

</details>

<details>
<summary>Когда лучше использовать Grid вместо Flexbox?</summary><br>
<table><tr><td>

Grid лучше выбирать для двумерной структуры: согласованных строк, колонок, областей страницы и карточных сеток. Flexbox
удобнее для одномерного распределения элементов внутри компонента. Если layout одновременно зависит и от строк, и от
колонок, Grid обычно проще и устойчивее.

</td></tr></table>

</details>

<details>
<summary>Что делают <code>grid-template-columns</code> и <code>grid-template-rows</code>?</summary><br>
<table><tr><td>

Они описывают явные tracks сетки и их размеры. Можно использовать px, `%`, `fr`, `minmax()`, `repeat()` и intrinsic
keywords. Неявные tracks создаются автоматически для элементов вне заданной сетки.

</td></tr></table>

</details>

<details>
<summary>Что такое <code>minmax()</code>?</summary><br>
<table><tr><td>

`minmax(min, max)` задает диапазон размера grid track. Например, колонка может быть не уже `240px`, но растягиваться до
доли свободного пространства. Это основа многих responsive grids без media queries.

</td></tr></table>

</details>

<details>
<summary>Что такое <code>auto-fit</code> и <code>auto-fill</code>?</summary><br>
<table><tr><td>

Оба значения создают столько повторяющихся tracks, сколько помещается. `auto-fill` сохраняет пустые tracks, а `auto-fit`
схлопывает их и растягивает занятые. Разница заметна, когда элементов меньше доступных колонок.

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}
```

</td></tr></table>

</details>

<details>
<summary>Что такое gap?</summary><br>
<table><tr><td>

`gap` задает расстояние между строками и колонками flex/grid layout. Он не добавляет внешний отступ по краям контейнера.
Можно отдельно использовать `row-gap` и `column-gap`.

</td></tr></table>

</details>

<details>
<summary>Чем <code>gap</code> лучше margin для расстояний между элементами?</summary><br>
<table><tr><td>

Gap принадлежит контейнеру и появляется только между его элементами. Не нужны селекторы первого/последнего элемента,
отрицательные margin и компенсация краев. Margin остается полезен для внешнего расстояния между независимыми блоками.

</td></tr></table>

</details>

<details>
<summary>Что такое margin collapsing?</summary><br>
<table><tr><td>

Вертикальные margin соседних block boxes в normal flow могут объединиться в один margin вместо суммы. Обычно остается
наибольший положительный отступ, а отрицательные значения участвуют по отдельным правилам. Flex и Grid items не
схлопывают margin.

</td></tr></table>

</details>

<details>
<summary>Когда margin схлопывается?</summary><br>
<table><tr><td>

Между соседними block-элементами, а также между parent и первым или последним child при отсутствии border, padding,
inline content и разделяющей высоты. Может схлопываться margin пустого блока. Это относится к block formatting context.

</td></tr></table>

</details>

<details>
<summary>Когда margin не схлопывается?</summary><br>
<table><tr><td>

У flex/grid items, absolutely positioned elements, floats и элементов в разных BFC. Border, padding или inline content
между parent и child также разделяют margin. Горизонтальные margin не схлопываются.

</td></tr></table>

</details>

<details>
<summary>Как избежать схлопывания margin?</summary><br>
<table><tr><td>

Предпочесть `gap`, добавить осмысленный padding/border или создать BFC через `display: flow-root`. Не стоит добавлять
случайный `overflow: hidden`, если обрезание содержимого нежелательно. Решение должно соответствовать layout-смыслу.

</td></tr></table>

</details>

<details>
<summary>Что такое positioning в CSS?</summary><br>
<table><tr><td>

Свойство `position` определяет, участвует ли box в normal flow и относительно чего работают inset-свойства `top`,
`right`, `bottom`, `left`. Positioning используют для overlays, sticky headers и локального смещения. Основной layout
обычно лучше строить Flexbox или Grid.

</td></tr></table>

</details>

<details>
<summary>Чем отличаются <code>relative</code>, <code>absolute</code>, <code>fixed</code> и <code>sticky</code>?</summary><br>
<table><tr><td>

`relative` сохраняет место в flow и создает containing block для потомков. `absolute` исключается из flow, `fixed`
обычно привязан к viewport, `sticky` ведет себя как normal flow до заданного scroll threshold. Sticky требует
подходящего scroll container и inset, например `top: 0`.

</td></tr></table>

</details>

<details>
<summary>Что такое stacking context?</summary><br>
<table><tr><td>

Это локальная система наложения элементов. Новый context создают, например, positioned element с `z-index`, `opacity`
меньше 1, `transform` и `isolation: isolate`. Дочерний элемент не может выйти своим `z-index` за пределы context
родителя.

</td></tr></table>

</details>

<details>
<summary>Что такое z-index и почему он иногда не работает?</summary><br>
<table><tr><td>

`z-index` задает порядок внутри текущего stacking context, а не глобально на странице. Большое число проиграет элементу
из context, который целиком расположен выше. Нужно искать родителей, создающих contexts, а не увеличивать значение.

</td></tr></table>

</details>

<details>
<summary>Что такое overflow?</summary><br>
<table><tr><td>

Overflow описывает поведение содержимого, выходящего за padding box. Он может обрезать содержимое или создать scroll
container. Это влияет на sticky positioning, доступность скрытого контента и layout.

</td></tr></table>

</details>

<details>
<summary>Чем отличаются <code>overflow: hidden</code>, <code>auto</code>, <code>scroll</code> и <code>clip</code>?</summary><br>
<table><tr><td>

`hidden` обрезает содержимое, но контейнер остается программно прокручиваемым. `auto` показывает scrollbars при
необходимости, `scroll` резервирует прокрутку всегда, `clip` обрезает без scroll container. Выбор должен сохранять
доступность контента с клавиатуры.

</td></tr></table>

</details>

<details>
<summary>Что такое scroll-snap?</summary><br>
<table><tr><td>

Scroll Snap позволяет контейнеру после прокрутки остановиться у заданных snap positions. Контейнер задает ось и
строгость, элементы — точки выравнивания. Это CSS-enhancement, а не замена доступной навигации carousel.

```css
.carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}

.slide {
  flex: 0 0 100%;
  scroll-snap-align: start;
}
```

</td></tr></table>

</details>

<details>
<summary>Когда стоит использовать scroll-snap?</summary><br>
<table><tr><td>

Для горизонтальных галерей, paged sections и сценариев, где остановка на целом элементе ожидаема пользователем. Нужно
оставить обычную прокрутку и элементы управления. Для длинного читаемого контента mandatory snapping часто мешает.

</td></tr></table>

</details>

<details>
<summary>Какие проблемы бывают у scroll-snap на мобильных устройствах?</summary><br>
<table><tr><td>

Слишком строгий snap может бороться с жестом пользователя, затруднять диагональную прокрутку и перескакивать после
изменения размера контента. Safe areas и browser chrome меняют viewport. Поведение нужно проверять на touch devices и с
увеличенным шрифтом.

</td></tr></table>

</details>

<details>
<summary>Что такое containing block?</summary><br>
<table><tr><td>

Containing block — прямоугольник, относительно которого вычисляются position и percentage sizes элемента. Его источник
зависит от `position`, formatting context и properties ancestors; для absolute element это не всегда непосредственный
родитель.

</td></tr></table>

</details>

### CSS Responsive

<details>
<summary>Чем responsive design отличается от adaptive design?</summary><br>
<table><tr><td>

Responsive layout плавно подстраивается под доступное пространство, а adaptive обычно выбирает несколько заранее
подготовленных layouts для диапазонов устройств. На практике подходы комбинируют, а границы выбирают по content, не по
моделям телефонов.

</td></tr></table>

</details>

<details>
<summary>Что такое mobile-first?</summary><br>
<table><tr><td>

Mobile-first начинает с базового layout для узкого экрана и добавляет возможности через `min-width` queries. Это
помогает приоритизировать content и progressive enhancement, но не отменяет тестирование desktop, touch, keyboard и
разных input capabilities.

</td></tr></table>

</details>

<details>
<summary>Что такое media query?</summary><br>
<table><tr><td>

`@media` применяет rules при совпадении характеристик viewport или устройства: width, orientation, hover, pointer,
preferences пользователя. Breakpoints выбирают там, где ломается layout, а не по названиям устройств.

</td></tr></table>

</details>

<details>
<summary>Что такое container query и чем она отличается от media query?</summary><br>
<table><tr><td>

Media query смотрит на viewport или device features, container query — на размер или styles ближайшего query container.
Container queries делают компонент адаптивным к месту использования, независимо от ширины всей страницы.

</td></tr></table>

</details>

<details>
<summary>Что такое fluid typography и как работает <code>clamp()</code>?</summary><br>
<table><tr><td>

Fluid typography плавно меняет размер между границами. `clamp(min, preferred, max)` ограничивает вычисленное значение:

```css
.title {
  font-size: clamp(1.5rem, 1rem + 2vw, 3rem);
}
```

Границы сохраняют читаемость на очень узких и широких экранах.

</td></tr></table>

</details>

<details>
<summary>Что такое safe area?</summary><br>
<table><tr><td>

Safe area учитывает вырезы, скругления и системные overlays устройства. Значения `env(safe-area-inset-*)` добавляют
необходимые padding при подходящем viewport configuration, особенно для fixed controls у краев экрана.

</td></tr></table>

</details>

<details>
<summary>Как учитывать разные плотности экранов?</summary><br>
<table><tr><td>

Layout строят в CSS pixels, а raster assets предоставляют с подходящим resolution через `srcset` или image-set. SVG
масштабируется независимо от DPR. Не следует умножать все CSS-размеры на device pixel ratio вручную.

</td></tr></table>

</details>

<details>
<summary>Как responsive images связаны с responsive layout?</summary><br>
<table><tr><td>

Layout определяет отображаемую ширину, а `sizes` сообщает ее браузеру для выбора кандидата из `srcset`. Если `sizes` не
соответствует реальному layout, браузер может загрузить слишком большой или размытый ресурс.

</td></tr></table>

</details>

### CSS Architecture

<details>
<summary>Какие плюсы и минусы у БЭМ?</summary><br>
<table><tr><td>

БЭМ дает предсказуемые глобальные имена и явно показывает block, element и modifier. Цена — длинные class names,
дисциплина соглашений и возможное дублирование контекста там, где framework уже изолирует component styles.

</td></tr></table>

</details>

<details>
<summary>Чем CSS Modules, CSS-in-JS и utility-first CSS отличаются?</summary><br>
<table><tr><td>

CSS Modules генерируют локальные class names, CSS-in-JS связывает styles с JavaScript runtime или build step,
utility-first собирает UI из небольших готовых classes. Выбор влияет на isolation, runtime cost, theming, tooling,
server rendering и читаемость markup.

</td></tr></table>

</details>

<details>
<summary>Какие плюсы и минусы у Tailwind-подхода?</summary><br>
<table><tr><td>

Utilities ускоряют композицию, ограничивают произвольные значения и удаляют неиспользуемые rules при сборке. Минусы —
шумная markup, необходимость соглашений для повторяющихся patterns и риск смешать design decisions со случайными
utilities без tokens и component boundaries.

</td></tr></table>

</details>

<details>
<summary>Что такое design tokens?</summary><br>
<table><tr><td>

Tokens — именованные design decisions: colors, spacing, typography, radii, motion. Их хранят в нейтральном source of
truth и преобразуют в CSS custom properties, platform constants и design-tool variables. Семантические tokens вроде
`--color-danger` устойчивее прямых названий оттенков.

</td></tr></table>

</details>

<details>
<summary>Как сделать theme и dark theme?</summary><br>
<table><tr><td>

Компоненты используют semantic custom properties, а theme переопределяет их на root container. Начальный выбор может
учитывать `prefers-color-scheme`, пользовательская настройка должна иметь приоритет и сохраняться. Проверяют contrast,
media assets и browser controls через `color-scheme`.

</td></tr></table>

</details>

<details>
<summary>Почему глобальные стили могут быть проблемой?</summary><br>
<table><tr><td>

Широкие selectors создают неявные зависимости, conflicts и regressions в далеких features. Global layer оставляют для
reset, tokens, typography и действительно общих primitives; component и feature styles ограничивают понятными
boundaries.

</td></tr></table>

</details>

<details>
<summary>Что такое cascade layers <code>@layer</code>?</summary><br>
<table><tr><td>

Cascade layers задают явный порядок групп styles до сравнения specificity. Например, `reset`, `base`, `components` и
`utilities` можно упорядочить один раз, уменьшая войны selectors и `!important`.

</td></tr></table>

</details>

<details>
<summary>Что такое Shadow DOM style encapsulation?</summary><br>
<table><tr><td>

Shadow DOM создает отдельное tree boundary: обычные document selectors не проникают внутрь, а внутренние styles не
выходят наружу. Наследуемые properties, CSS custom properties, `::part` и `::slotted` формируют контролируемые точки
настройки.

</td></tr></table>

</details>

<details>
<summary>Чем Flexbox отличается от Grid?</summary><br>
<table><tr><td>

Flexbox в первую очередь решает одномерную раскладку по строке или колонке. Grid управляет строками и колонками
одновременно.

Flexbox подходит для toolbar, списка и выравнивания внутри компонента. Grid удобен для page layout и двумерных сеток. Их
часто используют вместе.

</td></tr></table>

</details>

<details>
<summary>Что такое BEM?</summary><br>
<table><tr><td>

BEM делит CSS-имена на block, element и modifier:

```css
.user-card {
}
.user-card__title {
}
.user-card--compact {
}
```

Соглашение делает связи явными и снижает конфликты глобальных стилей, но длинные имена и ручная дисциплина могут быть
избыточны при надежной component style isolation.

</td></tr></table>

</details>

<details>
<summary>Что делает box-sizing: border-box?</summary><br>
<table><tr><td>

При `border-box` заданные `width` и `height` уже включают padding и border. Это делает размеры элементов предсказуемее.

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

</td></tr></table>

</details>

<details>
<summary>Чем img отличается от picture?</summary><br>
<table><tr><td>

`img` отображает одно изображение и поддерживает responsive candidates через `srcset` и `sizes`.

`picture` позволяет задать несколько `source` по media query или формату, например отдельный crop для мобильного экрана
и AVIF/WebP fallback. Внутри `picture` всегда остается fallback `img`.

</td></tr></table>

</details>

<details>
<summary>Чем SCSS @import отличается от @use?</summary><br>
<table><tr><td>

Legacy `@import` глобально объединяет файлы, может загружать их повторно и создает конфликты имен.

`@use` загружает module один раз и предоставляет namespace:

```scss
@use 'tokens';

.button {
  color: tokens.$primary;
}
```

Для нового Sass-кода используют `@use` и `@forward`.

</td></tr></table>

</details>

<details>
<summary>Какие есть способы изоляции стилей?</summary><br>
<table><tr><td>

Основные варианты:

- соглашения именования, например BEM;
- Angular style encapsulation;
- CSS Modules;
- Shadow DOM;
- utility-классы;
- ограничение стилей через feature/component boundaries.

Изоляция уменьшает конфликты, но global tokens, typography и overlays все равно требуют продуманного общего слоя.

</td></tr></table>

</details>

<details>
<summary>Какие плюсы и минусы готового UI Kit?</summary><br>
<table><tr><td>

Плюсы: единый дизайн, accessibility primitives, быстрый старт, готовые сложные компоненты и меньше дублирования.

Минусы: ограниченная кастомизация, лишний bundle, зависимость от release cycle и сложные обновления. Перед выбором
проверяют accessibility, theming, SSR, forms integration, поддержку Angular-версий и качество API.

</td></tr></table>

</details>

### CSS Rendering и Performance

<details>
<summary>Что такое reflow/layout?</summary><br>
<table><tr><td>

Layout вычисляет геометрию render tree: размеры и координаты элементов. Изменение ширины, шрифта или структуры может
потребовать пересчета части или всей страницы. Стоимость растет с размером и связанностью layout.

</td></tr></table>

</details>

<details>
<summary>Почему GPU не делает любую анимацию бесплатной?</summary><br>
<table><tr><td>

Compositor может дешево перемещать готовый layer, но его сначала нужно rasterize и хранить в GPU memory. Большие layers,
filters, uploads и частые изменения content создают overhead. Производительность подтверждают trace, а не наличием
`transform: translateZ(0)`.

</td></tr></table>

</details>

<details>
<summary>Что делают <code>contain</code> и <code>content-visibility</code>?</summary><br>
<table><tr><td>

`contain` ограничивает влияние layout, paint, size или style элемента на остальную страницу. `content-visibility: auto`
позволяет пропускать rendering вне viewport, сохраняя content для поиска и accessibility tree. Для стабильной прокрутки
часто задают `contain-intrinsic-size`.

</td></tr></table>

</details>

<details>
<summary>Что такое repaint?</summary><br>
<table><tr><td>

Paint рисует пиксели для фона, текста, border, shadow и других визуальных свойств. Он может выполняться без нового
layout, если геометрия не изменилась. Большие painted areas и сложные эффекты увеличивают стоимость.

</td></tr></table>

</details>

<details>
<summary>Что такое compositing?</summary><br>
<table><tr><td>

Compositing собирает ранее нарисованные слои в итоговый кадр, применяя трансформации и прозрачность. Эту работу часто
можно передать compositor thread/GPU. Но создание и хранение слоев расходует память.

</td></tr></table>

</details>

<details>
<summary>Чем reflow отличается от repaint?</summary><br>
<table><tr><td>

Reflow пересчитывает геометрию и обычно приводит к последующему paint. Repaint меняет пиксели без обязательного
пересчета размеров. Compositing может обновить итоговый кадр без обоих этапов для подходящих свойств.

</td></tr></table>

</details>

<details>
<summary>Какие CSS-свойства чаще вызывают layout?</summary><br>
<table><tr><td>

Свойства размеров и геометрии: `width`, `height`, margin, padding, border, position offsets, font metrics и изменения
DOM. Точная область пересчета зависит от layout и containment. Проверять нужно в Performance panel.

</td></tr></table>

</details>

<details>
<summary>Какие CSS-свойства чаще вызывают paint?</summary><br>
<table><tr><td>

Цвета, backgrounds, borders, shadows и часть filters обычно требуют paint, но не layout. Чем больше область и сложнее
эффект, тем дороже операция. Реальная pipeline зависит от браузера и layer structure.

</td></tr></table>

</details>

<details>
<summary>Почему <code>transform</code> и <code>opacity</code> обычно лучше для анимаций?</summary><br>
<table><tr><td>

Они часто применяются на этапе compositing без повторного layout и paint содержимого. Это уменьшает работу main thread и
делает кадры стабильнее. Гарантии нет: сложная сцена и лишние layers тоже могут быть дорогими.

</td></tr></table>

</details>

<details>
<summary>Что выполняется на CPU, а что может уйти на GPU?</summary><br>
<table><tr><td>

JavaScript, style calculation и layout в основном выполняются CPU/main thread. GPU часто ускоряет rasterization и
compositing слоев. Он не делает произвольную CSS-анимацию бесплатной и не исправляет long JavaScript tasks.

</td></tr></table>

</details>

<details>
<summary>Что такое compositor layer?</summary><br>
<table><tr><td>

Это поверхность, которую браузер может независимо перемещать и смешивать при сборке кадра. Layers полезны для
анимируемых элементов, fixed content и video. Каждый слой требует памяти и может увеличить raster/compositing work.

</td></tr></table>

</details>

<details>
<summary>Что такое layer promotion?</summary><br>
<table><tr><td>

Браузер решает вынести элемент в отдельный compositor layer из-за transform, animation или других эвристик. Разработчик
может подсказать намерение через `will-change`, но итог контролирует engine. Promotion нужно подтверждать Layers panel.

</td></tr></table>

</details>

<details>
<summary>Что делает <code>will-change</code>?</summary><br>
<table><tr><td>

Он заранее сообщает браузеру, какое свойство скоро изменится, чтобы подготовить оптимизацию. Использовать его следует
незадолго до анимации и для ограниченного числа элементов. После завершения долгой подготовки hint можно убрать.

</td></tr></table>

</details>

<details>
<summary>Почему <code>will-change</code> нельзя ставить на все элементы?</summary><br>
<table><tr><td>

Браузер может создать слишком много слоев и потратить GPU memory. Это увеличивает rasterization, compositing и иногда
ухудшает производительность сильнее исходной проблемы. `will-change` — точечный hint, а не reset.

</td></tr></table>

</details>

<details>
<summary>Почему <code>top/left</code> часто хуже для анимаций, чем <code>transform</code>?</summary><br>
<table><tr><td>

Offsets меняют геометрию positioned element и могут запускать layout и paint. Transform обычно перемещает готовый слой
на этапе compositing. Итог зависит от элемента, поэтому анимацию измеряют.

```css
/* Плохо для частых анимаций */
.box {
  left: 100px;
}

/* Обычно лучше */
.box {
  transform: translateX(100px);
}
```

</td></tr></table>

</details>

<details>
<summary>Почему <code>box-shadow</code> и <code>filter</code> могут быть дорогими?</summary><br>
<table><tr><td>

Они требуют вычисления пикселей вокруг элемента, размытия и дополнительных offscreen surfaces. Большой blur radius и
анимация на крупной области особенно дороги. Иногда дешевле использовать подготовленный asset или меньшую область.

</td></tr></table>

</details>

<details>
<summary>Что такое layout thrashing?</summary><br>
<table><tr><td>

Это повторное чередование DOM writes и layout reads, вынуждающее браузер синхронно пересчитывать геометрию много раз за
кадр. Проблема часто возникает в циклах. Чтения и записи нужно группировать.

</td></tr></table>

</details>

<details>
<summary>Как избежать layout thrashing?</summary><br>
<table><tr><td>

Сначала прочитать необходимые размеры, затем пакетно изменить DOM. Для кадра использовать `requestAnimationFrame`, для
списков — class changes вместо множества inline writes. Профилировщик покажет forced synchronous layout.

</td></tr></table>

</details>

<details>
<summary>Почему чтение <code>offsetWidth</code> после записи стилей может быть проблемой?</summary><br>
<table><tr><td>

После write вычисленные размеры становятся устаревшими. Чтение `offsetWidth` требует актуального значения и заставляет
браузер немедленно завершить style/layout вместо отложенной пакетной работы. Повторение этого паттерна создает forced
reflow.

</td></tr></table>

</details>

<details>
<summary>Как DevTools Performance помогает искать reflow/repaint?</summary><br>
<table><tr><td>

Запись trace показывает scripting, style recalculation, layout, paint и compositing по кадрам. Можно открыть дорогой
event, увидеть call stack и affected nodes. Paint flashing и Layers дополняют анализ.

</td></tr></table>

</details>

<details>
<summary>Что такое FPS?</summary><br>
<table><tr><td>

FPS — число отображенных кадров в секунду. Низкий или нестабильный FPS заметен как рывки анимации и scrolling. Важно
смотреть не только среднее, но и пропущенные кадры.

</td></tr></table>

</details>

<details>
<summary>Почему 60 FPS означает бюджет около 16.6ms на кадр?</summary><br>
<table><tr><td>

Секунда делится на 60 интервалов: примерно `1000 / 60 = 16.6ms`. В этот бюджет входят input, JavaScript, style, layout,
paint и compositing. На дисплеях 120Hz бюджет еще меньше.

</td></tr></table>

</details>

<details>
<summary>Как <code>requestAnimationFrame</code> помогает с анимациями?</summary><br>
<table><tr><td>

Callback вызывается перед следующим paint и синхронизирует обновление с refresh cycle. Браузер может приостанавливать
его в фоновой вкладке. Тяжелая работа внутри callback все равно блокирует кадр.

</td></tr></table>

</details>

### Modern CSS

<details>
<summary>Что такое CSS nesting?</summary><br>
<table><tr><td>

Native nesting позволяет вкладывать relative selectors внутрь style rule. Оно уменьшает повторение context, но глубокая
вложенность повышает specificity и связанность. Синтаксис и результат следует отличать от дополнительных возможностей
Sass.

</td></tr></table>

</details>

<details>
<summary>Чем <code>:is()</code> отличается от <code>:where()</code>?</summary><br>
<table><tr><td>

Обе pseudo-classes группируют selectors. Specificity `:is()` равна самому специфичному аргументу, а `:where()` всегда
имеет нулевую specificity. Поэтому `:where()` удобен для легко переопределяемых defaults.

</td></tr></table>

</details>

<details>
<summary>Что такое <code>:has()</code>?</summary><br>
<table><tr><td>

`:has()` выбирает element по совпадению relative selector внутри или рядом, например form group с invalid input. Это
позволяет стилизовать parent без JavaScript, но слишком широкие selectors на больших деревьях следует применять
осознанно.

</td></tr></table>

</details>

<details>
<summary>Что такое style queries?</summary><br>
<table><tr><td>

Style container queries применяют rules по computed style container, прежде всего по custom properties. Это позволяет
компоненту реагировать на semantic state контекста. Поддержку конкретного синтаксиса нужно проверять для целевых
браузеров.

</td></tr></table>

</details>

<details>
<summary>Для чего нужны <code>accent-color</code> и <code>color-scheme</code>?</summary><br>
<table><tr><td>

`accent-color` настраивает accent native form controls, сохраняя их поведение. `color-scheme` сообщает браузеру, какие
цветовые схемы поддерживает область, чтобы он согласовал controls, scrollbars и системные colors.

</td></tr></table>

</details>

<details>
<summary>Как работают <code>prefers-color-scheme</code> и <code>prefers-reduced-motion</code>?</summary><br>
<table><tr><td>

Эти media features отражают системные предпочтения пользователя. Первая помогает выбрать начальную theme, вторая —
уменьшить необязательное движение. Reduced motion означает не «выключить все», а убрать потенциально проблемные эффекты,
сохранив понятную обратную связь.

</td></tr></table>

</details>

<details>
<summary>Что такое logical properties?</summary><br>
<table><tr><td>

Logical properties описывают flow-relative стороны: `margin-inline-start`, `padding-block`, `inset-inline-end`. В
отличие от `left` и `right`, они адаптируются к writing mode и направлению LTR/RTL, уменьшая отдельные overrides для
локализации.

</td></tr></table>

</details>

<details>
<summary>Для чего нужны <code>aspect-ratio</code> и <code>object-fit</code>?</summary><br>
<table><tr><td>

`aspect-ratio` задает предпочтительное соотношение сторон box и помогает резервировать место. `object-fit` определяет,
как replaced content вроде image или video вписывается в заданный box: `contain` сохраняет весь content, `cover`
заполняет область с crop.

</td></tr></table>

</details>

<details>
<summary>Что делают <code>overscroll-behavior</code> и <code>scrollbar-gutter</code>?</summary><br>
<table><tr><td>

`overscroll-behavior` управляет scroll chaining и browser overscroll actions на границах container. `scrollbar-gutter`
может заранее резервировать место под scrollbar, предотвращая layout shift. Оба свойства применяют точечно, не ломая
ожидаемую прокрутку страницы.

</td></tr></table>

</details>

### Frontend fundamentals

<details>
<summary>В чем отличие фреймворка от библиотеки (приведите примеры и отличия)?</summary><br>
<table><tr><td>

**Библиотека** решает отдельную задачу, а приложение само определяет архитектуру и момент вызова библиотеки. Примеры:
RxJS, Lodash, date-fns.

**Фреймворк** задает каркас приложения, жизненный цикл, правила организации кода и сам вызывает пользовательский код в
нужный момент. Это называют inversion of control. Примеры: Angular, NestJS.

Angular предоставляет не только рендеринг, но и DI, Router, формы, HTTP-клиент, компиляцию шаблонов, CLI и инструменты
тестирования. Поэтому Angular является платформой и фреймворком, а не просто UI-библиотекой.

</td></tr></table>

</details>

<details>
<summary>Какие популярные CSS, JS библиотеки вы знаете?</summary><br>
<table><tr><td>

Примеры, которые уместно назвать вместе с их назначением:

- UI и CSS: Angular Material, Taiga UI, Bootstrap, Tailwind CSS.
- Реактивность: RxJS.
- Работа с датами: date-fns, Luxon.
- Утилиты: Lodash.
- Графики: D3.js, Chart.js, ECharts.
- Тестирование: Vitest, Jest, Jasmine, Cypress, Playwright.
- Управление состоянием Angular: NgRx, NGXS.

На собеседовании важнее объяснить, какую проблему решает библиотека и почему она была выбрана, чем перечислить много
названий.

</td></tr></table>

</details>

### Browser rendering и performance

<details>
<summary>Как браузер рендерит HTML-страницу?</summary><br>
<table><tr><td>

Браузер строит DOM из HTML и CSSOM из CSS, объединяет их в render tree, вычисляет layout, выполняет paint и compositing.

JavaScript, стили, шрифты и изображения могут задерживать отдельные этапы. Производительность оценивают по реальному
critical rendering path, а не только по размеру файлов.

</td></tr></table>

</details>

<details>
<summary>Что такое DOM, CSSOM и render tree?</summary><br>
<table><tr><td>

- DOM представляет структуру HTML.
- CSSOM содержит разобранные CSS-правила.
- Render tree объединяет видимые DOM-узлы с вычисленными стилями.

Элементы вроде `display: none` не участвуют в render tree, хотя остаются в DOM.

</td></tr></table>

</details>

<details>
<summary>Что такое layout и repaint?</summary><br>
<table><tr><td>

Layout, или reflow, пересчитывает размеры и положение элементов. Repaint перерисовывает пиксели без обязательного
изменения геометрии.

Чередование чтения layout-свойств и записи стилей в цикле может вызвать layout thrashing. Операции лучше группировать и
измерять через browser Performance panel.

</td></tr></table>

</details>

<details>
<summary>Почему transform лучше top и left для анимаций?</summary><br>
<table><tr><td>

Изменение `top` и `left` часто требует layout и paint. `transform` обычно может обрабатываться на этапе compositing,
поэтому анимация получается плавнее.

Это не абсолютное правило: создание лишних layers расходует память, а итог нужно проверять профилировщиком.

</td></tr></table>

</details>

<details>
<summary>Почему не стоит использовать transition: all?</summary><br>
<table><tr><td>

`transition: all` анимирует любые изменившиеся свойства, включая неожиданные и дорогие для layout. Это усложняет
поддержку и может создавать случайные анимации.

Лучше явно перечислить свойства:

```css
.button {
  transition:
    transform 150ms ease,
    opacity 150ms ease;
}
```

</td></tr></table>

</details>

<details>
<summary>Блокирует ли CSS рендеринг?</summary><br>
<table><tr><td>

Внешний stylesheet обычно является render-blocking resource: браузеру нужен CSSOM, чтобы корректно выполнить первый
render.

CSS не обязательно останавливает загрузку всего документа, но может задержать отображение и выполнение scripts,
зависящих от стилей. Помогают небольшой critical CSS, удаление неиспользуемых стилей и корректное разделение bundles.

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
<summary>Как браузер обрабатывает index.html?</summary><br>
<table><tr><td>

Основные этапы Critical Rendering Path:

1. Браузер получает HTML и постепенно строит DOM.
2. При обнаружении CSS загружает его и строит CSSOM. CSS блокирует первый рендер.
3. Обычный синхронный `<script>` может остановить разбор HTML до загрузки и выполнения JavaScript.
4. DOM и CSSOM объединяются в render tree.
5. Layout вычисляет размеры и положение видимых элементов.
6. Paint рисует пиксели.
7. Compositing объединяет слои и выводит кадр на экран.

`defer` загружает скрипт параллельно и выполняет после разбора HTML с сохранением порядка. `async` выполняет скрипт
сразу после загрузки, поэтому порядок не гарантирован.

Для ускорения первого рендера уменьшают блокирующие CSS/JS, используют code splitting, оптимизируют шрифты и
изображения, кеширование и SSR/SSG там, где это оправдано.

</td></tr></table>

</details>

<details>
<summary>Что такое Critical Rendering Path?</summary><br>
<table><tr><td>

Это последовательность получения HTML/CSS, построения DOM и CSSOM, создания render tree, layout, paint и compositing до
появления пикселей. Блокирующие ресурсы и long tasks удлиняют путь. Оптимизация должна улучшать измеряемый LCP и первый
render, а не только число запросов.

</td></tr></table>

</details>

<details>
<summary>Что такое render-blocking resources?</summary><br>
<table><tr><td>

Это ресурсы, без обработки которых браузер откладывает первый render. К ним обычно относятся stylesheets и часть
синхронных scripts. Critical CSS, code splitting и корректные `defer`/`async` уменьшают блокировку.

</td></tr></table>

</details>

<details>
<summary>Почему CSS может блокировать первый render?</summary><br>
<table><tr><td>

Браузеру нужен CSSOM, чтобы вычислить стили и избежать отображения страницы с неверным оформлением. Большой или медленно
загружаемый stylesheet задерживает render tree. Следует удалять неиспользуемый CSS и делить стили по реальным границам.

</td></tr></table>

</details>

<details>
<summary>Почему синхронный JavaScript может блокировать parsing HTML?</summary><br>
<table><tr><td>

Обычный `<script>` останавливает parser, потому что код может вызвать `document.write()` или изменить уже построенный
DOM. Браузер должен загрузить и выполнить script перед продолжением. `defer` обычно подходит application scripts лучше.

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
<summary>Как изображения влияют на LCP?</summary><br>
<table><tr><td>

Hero image часто становится LCP element, поэтому его download, decode и размер напрямую влияют на метрику. Нужны
подходящий формат, responsive source, размеры в разметке и высокий приоритет только для реального LCP-кандидата.

</td></tr></table>

</details>

<details>
<summary>Что такое lazy loading images?</summary><br>
<table><tr><td>

`loading="lazy"` откладывает загрузку изображений вне viewport. Это экономит сеть и CPU, но его нельзя бездумно ставить
на LCP image. Размеры изображения задают заранее, чтобы избежать CLS.

</td></tr></table>

</details>

<details>
<summary>Что такое <code>srcset</code> и responsive images?</summary><br>
<table><tr><td>

`srcset` перечисляет кандидаты разного размера или pixel density, а `sizes` описывает ожидаемую ширину в layout. Браузер
выбирает подходящий файл с учетом viewport и DPR. `picture` дополнительно позволяет art direction и форматы.

</td></tr></table>

</details>

<details>
<summary>Что такое preload, prefetch и preconnect?</summary><br>
<table><tr><td>

`preload` приоритетно загружает ресурс текущей страницы, `prefetch` с низким приоритетом готовит вероятный следующий
переход, `preconnect` заранее устанавливает соединение с origin. Ошибочное применение расходует bandwidth и конкурирует
с критическими ресурсами.

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

### HTTP, HTTPS и curl

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
<summary>Из чего состоит HTTP request?</summary><br>
<table><tr><td>

Request line содержит method, target и HTTP version, затем идут headers и optional body. URL включает path и query
params. Host, authorization и content metadata передаются headers.

</td></tr></table>

</details>

<details>
<summary>Из чего состоит HTTP response?</summary><br>
<table><tr><td>

Status line содержит HTTP version и status code, затем идут response headers и optional body. Headers описывают content,
cache, cookies и transport metadata. Body может содержать JSON, HTML, файл или stream.

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
<summary>Чем отличаются GET, POST, PUT, PATCH и DELETE?</summary><br>
<table><tr><td>

GET читает, POST создает ресурс или запускает команду, PUT полностью заменяет представление по известному URL, PATCH
частично изменяет, DELETE удаляет. Конкретный API документирует payload и повторяемость. Method сам по себе не заменяет
авторизацию.

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
<summary>Чем отличаются 2xx, 3xx, 4xx и 5xx?</summary><br>
<table><tr><td>

`2xx` означает успешную обработку, `3xx` — redirect или работу кеша, `4xx` — проблему запроса или доступа, `5xx` —
ошибку server. Retry зависит от конкретного кода и idempotency. Например, `404` и `503` требуют разной реакции.

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
<summary>Что такое Authorization header?</summary><br>
<table><tr><td>

Header передает credentials или token по выбранной схеме. Пример: `Authorization: Bearer <token>`. Его отправляют только
по HTTPS доверенному origin и не выводят в логи.

</td></tr></table>

</details>

<details>
<summary>Что такое Bearer token?</summary><br>
<table><tr><td>

Это token, право использования которого получает любой владелец значения. Он не доказывает владение отдельным ключом,
поэтому утечка дает доступ до истечения или отзыва. Scope и срок жизни должны быть минимальными.

</td></tr></table>

</details>

<details>
<summary>Что такое preflight request?</summary><br>
<table><tr><td>

Browser отправляет `OPTIONS` перед некоторыми cross-origin requests, чтобы проверить разрешенные method и headers.
Server отвечает CORS headers. Preflight может кешироваться, но неправильная конфигурация блокирует основной запрос.

</td></tr></table>

</details>

<details>
<summary>Что такое cookie?</summary><br>
<table><tr><td>

Cookie — небольшая пара name/value, которую browser хранит для domain/path и автоматически отправляет подходящим
requests. Флаги `HttpOnly`, `Secure` и `SameSite` снижают часть рисков. Cookies имеют ограничения размера и требуют
продуманной CSRF-защиты.

</td></tr></table>

</details>

<details>
<summary>Чем cookie отличается от localStorage?</summary><br>
<table><tr><td>

Cookie автоматически участвует в HTTP и может быть `HttpOnly`; `localStorage` доступен JavaScript и не отправляется
автоматически. Оба механизма привязаны к origin/domain rules. Секретный token в localStorage уязвим при XSS.

</td></tr></table>

</details>

<details>
<summary>Что такое idempotency?</summary><br>
<table><tr><td>

Операция идемпотентна, если повтор одного и того же запроса имеет тот же ожидаемый итоговый эффект. Это важно для
retries при сетевой неопределенности. API может использовать idempotency key для безопасного повторения создания
платежа.

</td></tr></table>

</details>

<details>
<summary>Какие HTTP methods обычно идемпотентны?</summary><br>
<table><tr><td>

GET, HEAD, PUT, DELETE и OPTIONS определены как идемпотентные по семантике, PATCH может быть таким по контракту, POST
обычно нет. Идемпотентность не означает одинаковый response: DELETE повторно может вернуть другой status.

</td></tr></table>

</details>

<details>
<summary>Как использовать curl для проверки HTTP API?</summary><br>
<table><tr><td>

`curl` позволяет отправить запрос вне приложения и увидеть, проблема находится в API, сети или frontend-коде.

```bash
curl https://api.example.com/users
```

```bash
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Max","role":"frontend"}'
```

```bash
curl -X PATCH https://api.example.com/users/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer token" \
  -d '{"name":"Alex"}'
```

</td></tr></table>

</details>

<details>
<summary>Чем HTTP отличается от HTTPS?</summary><br>
<table><tr><td>

HTTPS передает HTTP внутри защищенного TLS-соединения. Оно шифрует трафик, подтверждает подлинность сервера сертификатом
и защищает данные от незаметного изменения в пути.

HTTPS не исправляет XSS, слабую авторизацию или утечку данных на сервере.

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
<summary>Что такое CORS?</summary><br>
<table><tr><td>

CORS - browser security mechanism, который ограничивает JavaScript-запросы между разными origins. Сервер разрешает
доступ через `Access-Control-Allow-*` headers, а для части запросов браузер сначала отправляет preflight `OPTIONS`.

Postman не применяет browser same-origin policy, поэтому запрос может работать там и блокироваться в браузере.
Исправление находится в server CORS configuration или same-origin proxy, а не в отключении защиты браузера.

</td></tr></table>

</details>

<details>
<summary>Что такое авторизация через токены?</summary><br>
<table><tr><td>

После аутентификации сервер выдает credential, например access token. Клиент прикладывает его к запросам, а сервер
проверяет подпись, срок действия и права.

Access token обычно живет недолго. Refresh token позволяет получить новый access token и требует более строгой защиты и
ротации.

</td></tr></table>

</details>

<details>
<summary>Где хранить access token и refresh token?</summary><br>
<table><tr><td>

Универсального ответа нет. Частый browser-подход:

- access token хранится в памяти приложения;
- refresh token находится в `HttpOnly`, `Secure`, `SameSite` cookie и недоступен JavaScript.

`localStorage` переживает перезагрузку, но доступен при XSS. Cookie автоматически отправляется браузером, поэтому
требует корректной CSRF-защиты. Решение зависит от backend, доменов и threat model.

</td></tr></table>

</details>

<details>
<summary>Чем WebSocket отличается от SSE?</summary><br>
<table><tr><td>

WebSocket предоставляет постоянный двусторонний канал и подходит для чатов, multiplayer и совместного редактирования.

SSE передает события только от сервера к клиенту поверх HTTP, автоматически переподключается и проще для уведомлений,
прогресса и live feed. SSE передает текстовые события и имеет browser-specific ограничения соединений.

</td></tr></table>

</details>

<details>
<summary>Когда выбрать polling, SSE или WebSocket?</summary><br>
<table><tr><td>

- Polling прост и подходит для редких обновлений, когда задержка допустима.
- SSE выбирают для постоянного потока server-to-client.
- WebSocket нужен для частого двустороннего обмена с низкой задержкой.

Учитывают инфраструктуру, reconnect, authentication, масштабирование, mobile network и реальную частоту событий.

</td></tr></table>

</details>

<details>
<summary>Как проектировать API layer и типизировать backend contracts?</summary><br>
<table><tr><td>

Data-access слой инкапсулирует endpoints, DTO, mapping и transport errors:

```ts
export class UsersApi {
  private readonly http = inject(HttpClient);

  getById(id: string): Observable<User> {
    return this.http.get<UserDto>(`/api/users/${id}`).pipe(map(mapUserDto));
  }
}
```

Generic в `HttpClient` — compile-time ожидание, а не runtime-валидация. Для внешних данных используют schema validation.
OpenAPI может генерировать DTO/client, но generated layer обычно оборачивают доменным API.

</td></tr></table>

</details>

<details>
<summary>Как устроены TCP/IP и HTTP?</summary><br>
<table><tr><td>

Упрощенная модель TCP/IP:

1. Прикладной уровень: HTTP, DNS, WebSocket.
2. Транспортный уровень: TCP или UDP.
3. Сетевой уровень: IP и маршрутизация пакетов.
4. Канальный уровень: передача кадров внутри локальной сети.

HTTP — протокол прикладного уровня с моделью request/response. Клиент отправляет метод, URL, заголовки и при
необходимости body; сервер возвращает status code, заголовки и body.

HTTPS — HTTP поверх защищенного TLS-соединения. TCP обеспечивает надежную упорядоченную доставку для HTTP/1.1 и HTTP/2;
HTTP/3 использует QUIC поверх UDP.

TCP устанавливает соединение, гарантирует порядок и повторную доставку потерянных данных. UDP отправляет datagrams без
таких гарантий, но с меньшими накладными расходами.

В модели OSI HTTP относится к прикладному уровню, TCP/UDP - к транспортному, IP - к сетевому.

Для frontend-разработчика важны методы, коды ответа, заголовки, кеширование, cookies, CORS, TLS, сжатие и понимание
того, что количество и размер запросов влияют на производительность.

</td></tr></table>

</details>

<details>
<summary>Что такое клиент-серверная архитектура?</summary><br>
<table><tr><td>

Клиент отвечает за интерфейс и отправляет запросы, сервер хранит данные, применяет бизнес-правила и возвращает ответы.

Граница не является границей доверия: server всегда повторно проверяет authentication, authorization и входные данные,
даже если frontend уже выполнил validation.

</td></tr></table>

</details>

<details>
<summary>Что происходит после ввода URL в браузере?</summary><br>
<table><tr><td>

Упрощенная последовательность:

1. Браузер разбирает URL и проверяет cache.
2. DNS находит IP-адрес.
3. Устанавливается транспортное и для HTTPS TLS-соединение.
4. Отправляется HTTP-запрос.
5. Браузер обрабатывает redirect и ответ.
6. HTML парсится, загружаются CSS, JavaScript и другие ресурсы.
7. Строятся DOM/CSSOM, layout, paint и compositing.

Service worker, HTTP cache, CDN и connection reuse могут изменить отдельные шаги.

</td></tr></table>

</details>

<details>
<summary>Из чего состоят HTTP-запрос и ответ?</summary><br>
<table><tr><td>

Запрос содержит method, URL, headers и необязательный body. Ответ содержит status code, headers и необязательный body.

Частые headers: `Content-Type`, `Accept`, `Authorization`, `Cache-Control`, `ETag`, `Cookie`, `Set-Cookie`, `Origin`.
Формат body описывает `Content-Type`.

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

### Security basics

<details>
<summary>Что такое XSS?</summary><br>
<table><tr><td>

XSS позволяет выполнить вредоносный script в контексте сайта. Причина обычно в выводе непроверенного HTML, опасных URL
или обходе sanitization.

Защита: escaping и sanitization, безопасные DOM APIs, CSP, запрет небезопасного `innerHTML` и осторожность с Angular
`DomSanitizer`.

</td></tr></table>

</details>

<details>
<summary>Что такое CSRF?</summary><br>
<table><tr><td>

CSRF заставляет browser авторизованного пользователя отправить нежелательный запрос, используя автоматически
прикладываемые cookies.

Защита: SameSite cookies, anti-CSRF token, проверка Origin/Referer и отсутствие state-changing операций через GET.

</td></tr></table>

</details>

<details>
<summary>Что такое OWASP?</summary><br>
<table><tr><td>

OWASP - открытое сообщество и набор практических материалов по безопасности приложений. Frontend-разработчику полезны
OWASP Top 10, ASVS и Cheat Sheet Series.

Это не scanner и не готовая сертификация, а база рисков, требований и рекомендаций.

</td></tr></table>

</details>

<details>
<summary>Какие меры защиты должен знать frontend-разработчик?</summary><br>
<table><tr><td>

- не вставлять непроверенный HTML;
- не хранить secrets в frontend bundle;
- использовать HTTPS и безопасные cookie attributes;
- учитывать XSS, CSRF, CORS и CSP;
- валидировать данные на клиенте для UX, но доверять только server validation;
- обновлять зависимости и проверять supply-chain риски;
- не раскрывать чувствительные данные в логах и URL.

Безопасность является общей ответственностью frontend, backend и инфраструктуры.

</td></tr></table>

</details>

### Performance и PWA

<details>
<summary>Для чего нужен PWA и какие плюсы?</summary><br>
<table><tr><td>

PWA — это сайт, который ведет себя почти как приложение

PWA = Progressive Web App.

Это обычное веб-приложение, но с дополнительными возможностями:

- можно установить на телефон/компьютер как приложение;
- может работать офлайн или при плохом интернете;
- может кешировать данные и ресурсы;
- может отправлять push-уведомления;
- открывается из иконки без обычного ощущения “я в браузере”.

Для чего нужен PWA:

PWA нужен, когда ты хочешь дать пользователю app-like experience, но без полноценной разработки под iOS/Android.

Главные плюсы PWA:

1. Можно установить без App Store / Google Play

Пользователь может нажать “Add to Home Screen” и получить иконку приложения.

Плюс для бизнеса:

- не нужно проходить модерацию стора;
- быстрее выкатывать обновления;
- один код для web/mobile/desktop.

PWA может кешировать:

- HTML;
- JS;
- CSS;
- картинки;
- шрифты;
- API-ответы.

Может работать офлайн

Например:

- открыть последнюю загруженную страницу;
- показать сохраненные данные;
- дать заполнить форму;
- отправить данные позже, когда интернет вернется.

Это особенно полезно для:

- путешествий;
- слабого интернета;
- мобильных пользователей;
- внутренних рабочих инструментов.

Push-уведомления:

PWA может отправлять уведомления, например: “Заказ доставлен”; “Новая задача”; “Скидка”; “Напоминание”; “Документ
согласован”.

Когда PWA подходит

PWA хорошо подходит, если:

- приложение в основном показывает данные;
- нужна установка на экран;
- важна скорость загрузки;
- нужен офлайн-режим;
- нет сложной работы с железом телефона;
- хочется быстро доставлять обновления.

CRM, todo app, dashboard, docs, e-commerce, booking app

Когда PWA не лучший выбор

PWA хуже подходит, если нужны:

- глубокие native API;
- сложная работа с Bluetooth/NFC;
- тяжелая графика;
- мощная фоновая работа;
- сложная интеграция с iOS/Android;
- максимальная производительность как у native.

</td></tr></table>

</details>

<details>
<summary>Какую роль в PWA играет Service Worker?</summary><br>
<table><tr><td>

Service Worker — это JS-файл, который браузер запускает отдельно от страницы и который стоит “между” приложением и
сетью.

Как работает обычный сайт: Page -> Network -> Server

PWA с Service Worker: Page -> Service Worker -> Cache / Network -> Server

Service Worker может перехватывать запросы:

Пользователь открыл страницу ↓ Браузер спрашивает Service Worker ↓ SW решает:

- взять файл из кеша
- сходить в сеть
- показать fallback-страницу

Ты открыл сайт первый раз:

- index.html
- main.js
- styles.css
- logo.png

Service Worker может сохранить эти файлы в Cache Storage.

Потом пользователь открывает сайт без интернета:

нет сети ↓ Service Worker берет файлы из кеша ↓ приложение все равно открывается

Для чего он нужен в PWA

1. Offline. Можно открыть приложение без интернета.
2. Faster load. Файлы уже лежат локально, поэтому приложение может открываться быстрее.
3. Cache strategy. Service Worker может выбирать стратегию:
   1. Cache first сначала кеш, потом сеть картинки, шрифты, статика
   2. Network first сначала сеть, если нет — кеш свежие данные
   3. Stale while revalidate быстро отдать кеш, потом обновить списки, статьи, каталоги
   4. Cache only только кеш заранее сохраненные ресурсы
   5. Network only только сеть критичные операции
4. Push notifications. Service Worker может принимать push-события даже когда вкладка закрыта. Server -> Push Service ->
   Service Worker -> Notification

Service Worker не имеет доступа к DOM. Он живет отдельно от страницы. Страница и Service Worker общаются через
события/messages.

Service Worker нужен в PWA, чтобы приложение могло кешировать ресурсы, быстрее загружаться, работать офлайн и получать
push-уведомления.

</td></tr></table>

</details>

## Computer Science basics

### Архитектура компьютера

<details>
<summary>Что такое принцип фон Неймана?</summary><br>
<table><tr><td>

Программа и данные хранятся в общей памяти, а процессор читает и выполняет инструкции последовательно, если управление
не изменено переходом. Классическая модель включает память, устройство управления, арифметико-логическое устройство и
ввод/вывод. Frontend-разработчику эта модель помогает понимать CPU-bound задачи, main thread и стоимость доступа к
памяти.

</td></tr></table>

</details>

<details>
<summary>Из каких основных частей состоит компьютер по архитектуре фон Неймана?</summary><br>
<table><tr><td>

Основные части: память, устройство управления, арифметико-логическое устройство, устройства ввода и вывода. CPU
объединяет управление и вычисления, RAM хранит активные инструкции и данные, а ввод/вывод связывает программу с внешним
миром. Современные компьютеры сложнее, но эта модель полезна как базовая абстракция.

</td></tr></table>

</details>

<details>
<summary>Почему frontend-разработчику полезно понимать базовое устройство компьютера?</summary><br>
<table><tr><td>

JavaScript выполняется не в вакууме: вычисления занимают CPU, объекты расходуют RAM, а сеть и диск работают существенно
медленнее регистров и кешей процессора. Это помогает объяснять long tasks, лаги main thread, memory leaks и пользу Web
Workers. Знание базы позволяет оптимизировать измеряемые узкие места, а не отдельные строки наугад.

</td></tr></table>

</details>

<details>
<summary>Что такое CPU, RAM и storage?</summary><br>
<table><tr><td>

CPU выполняет машинные инструкции и вычисления. RAM быстро хранит данные работающих процессов, но очищается после
выключения питания. Storage, например SSD, хранит файлы долговременно, но обычно имеет большую задержку доступа.

</td></tr></table>

</details>

<details>
<summary>Чем оперативная память отличается от диска?</summary><br>
<table><tr><td>

RAM быстрее и используется как рабочая память процессов, а диск предназначен для долговременного хранения. Данные с
диска обычно сначала читаются в память, после чего CPU может с ними работать. Недостаток RAM приводит к сборке мусора,
выгрузке страниц памяти и ухудшению отзывчивости.

</td></tr></table>

</details>

<details>
<summary>Что такое машинная инструкция?</summary><br>
<table><tr><td>

Это элементарная команда, которую CPU умеет декодировать и выполнять: загрузить данные, сложить значения, сравнить или
перейти к другому адресу. JavaScript сначала преобразуется движком в промежуточное представление и машинный код. Одна
строка исходника может потребовать много инструкций.

</td></tr></table>

</details>

<details>
<summary>Что такое процесс и поток?</summary><br>
<table><tr><td>

Процесс имеет собственное адресное пространство и ресурсы операционной системы. Поток выполняет последовательность
инструкций внутри процесса и разделяет его память с другими потоками. Браузер использует несколько процессов и потоков,
хотя JavaScript страницы обычно выполняется на одном main thread.

</td></tr></table>

</details>

<details>
<summary>Чем concurrency отличается от parallelism?</summary><br>
<table><tr><td>

Concurrency означает, что несколько задач находятся в работе и чередуются во времени. Parallelism означает их
фактическое одновременное выполнение на разных ядрах или процессорах. Browser event loop дает concurrency, а Web Workers
могут добавить parallelism для вычислений.

</td></tr></table>

</details>

### Память, stack и heap

<details>
<summary>Что такое stack и heap?</summary><br>
<table><tr><td>

Stack хранит frames вызовов функций и имеет строгий порядок LIFO. Heap используется для динамически создаваемых объектов
с менее предсказуемым временем жизни. Конкретная реализация зависит от JavaScript engine, но эта модель полезна для
понимания рекурсии и утечек.

</td></tr></table>

</details>

<details>
<summary>Что обычно хранится в stack?</summary><br>
<table><tr><td>

В stack обычно находятся call frames: адрес возврата, локальный контекст и служебные данные вызова. Небольшие значения
движок также может хранить рядом с frame, но спецификация JavaScript не закрепляет физическое размещение. Важно, что
глубина stack ограничена.

</td></tr></table>

</details>

<details>
<summary>Что обычно хранится в heap?</summary><br>
<table><tr><td>

В heap живут объекты, массивы, функции, замыкания и другие значения с динамическим lifetime. Сборщик мусора освобождает
их, когда они становятся недостижимыми. Большое число удерживаемых объектов увеличивает memory usage и паузы GC.

</td></tr></table>

</details>

<details>
<summary>Почему объекты обычно живут в heap?</summary><br>
<table><tr><td>

Размер и lifetime объекта часто неизвестны во время входа в функцию. Heap позволяет нескольким ссылкам указывать на один
объект и сохранять его после завершения создавшего вызова. Stack с LIFO-порядком для такого времени жизни неудобен.

</td></tr></table>

</details>

<details>
<summary>Почему рекурсия может привести к stack overflow?</summary><br>
<table><tr><td>

Каждый рекурсивный вызов добавляет новый frame. Если базовый случай отсутствует или глубина слишком велика, stack
заканчивается и runtime выбрасывает `RangeError`. Для больших входов используют итерацию, явный stack данных или
разбиение работы.

</td></tr></table>

</details>

<details>
<summary>Что такое memory leak?</summary><br>
<table><tr><td>

Это память, которая больше не нужна приложению, но остается достижимой и не освобождается GC. Утечка проявляется ростом
heap, замедлением работы и иногда падением вкладки. Причина обычно в забытых ссылках, а не в отсутствии сборщика мусора.

</td></tr></table>

</details>

<details>
<summary>Какие memory leaks бывают во frontend?</summary><br>
<table><tr><td>

Частые причины: неснятые event listeners, timers, subscriptions, глобальные коллекции, кеш без ограничения и detached
DOM nodes. Замыкание может удерживать большой объект через одну ненужную ссылку. Особенно важно очищать ресурсы
долгоживущих SPA-компонентов.

</td></tr></table>

</details>

<details>
<summary>Как найти memory leak в браузере?</summary><br>
<table><tr><td>

В Chrome DevTools используют Memory: Heap snapshot, Allocation instrumentation и сравнение snapshots после повторения
сценария. Ищут растущее число объектов, retaining paths и detached DOM nodes. Performance Monitor помогает увидеть
устойчивый рост JS heap и DOM nodes.

</td></tr></table>

</details>

### GC и управление памятью

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

</td></tr></table>

</details>

<details>
<summary>Что такое reachability?</summary><br>
<table><tr><td>

Reachability — возможность добраться до значения из корневых ссылок по цепочке объектов. Пока существует такая цепочка,
GC считает объект нужным. Поэтому одна ссылка из глобального кеша может удерживать большое дерево данных.

</td></tr></table>

</details>

<details>
<summary>Почему замыкания могут удерживать память?</summary><br>
<table><tr><td>

Функция сохраняет доступ к переменным внешней lexical scope даже после завершения внешнего вызова. Если callback живет
долго, связанные данные тоже могут оставаться достижимыми. Следует не захватывать крупный контекст без необходимости и
удалять долгоживущие callbacks.

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

</td></tr></table>

</details>

<details>
<summary>Почему detached DOM nodes могут быть проблемой?</summary><br>
<table><tr><td>

Узел удален из документа, но JavaScript-ссылка или listener продолжает удерживать его и дочернее дерево. Он не виден
пользователю, но занимает память. DevTools показывает такие узлы как detached elements и помогает найти retaining path.

</td></tr></table>

</details>

<details>
<summary>Как WeakMap и WeakSet помогают с памятью?</summary><br>
<table><tr><td>

Они не удерживают объект-ключ от сборки мусора. Это удобно для metadata и кеша, lifetime которого должен совпадать с
lifetime объекта. Их содержимое нельзя надежно перечислять, потому что GC работает недетерминированно.

</td></tr></table>

</details>

<details>
<summary>Можно ли вручную вызвать GC в JavaScript?</summary><br>
<table><tr><td>

В обычном web-коде нет стандартного API для принудительного GC. Движок сам выбирает момент сборки на основе давления на
память и внутренних эвристик. Правильное решение — удалить ненужные ссылки и ресурсы, а не пытаться управлять GC.

</td></tr></table>

</details>

## JavaScript

### Значения, ссылки и память

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
<summary>Что такое shallow copy и deep copy?</summary><br>
<table><tr><td>

Shallow copy создает новый верхний объект, но вложенные объекты остаются общими. Deep copy рекурсивно создает
независимые вложенные значения. Полное копирование может быть дорогим и не всегда имеет смысл для immutable updates.

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

### Типы, функции и область видимости

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

![img.png](assets/javascript/data-types.png)

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
<summary>В чем отличие нативных (Native) объектов от хост-объектов (Host objects)?</summary><br>
<table><tr><td>

#### Нативные объекты — часть спецификации языка. Они доступны нам вне зависимости от того, на каком клиенте исполняется наш код. Примеры: Array, Date и Math. Полный список нативных объектов.

```js
var users = Array(); // Array — нативный объект
```

Встроенные (Built-in): Array, Date, Math, String, Promise, Object. Пользовательские: Объекты, создаваемые вами через new
Object(), литералы {} или классы. Контекстные: Объект globalThis (или window в браузере, global в Node.js), Math и JSON.

#### Хост-объекты (Host objects)

Это объекты, предоставляемые средой выполнения (окружением), в которой запущен JavaScript (браузер, сервер Node.js и
т.д.).

Они не являются частью самого языка, зависят от платформы и могут различаться.

В браузере: window, document, location, history, XMLHTTPRequest, fetch, элементы DOM, localStorage.

В Node.js: Объекты для работы с файловой системой (fs), процессами (process), операционной системой (os).

</td></tr></table>

</details>

### Массивы, объекты и даты

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

### Дополнительные основы JavaScript

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

## TypeScript

<details>
<summary>Зачем нам нужны определения типов, где есть JavaScript c динамической типизацией?</summary><br>
<table><tr><td>

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

## Основы программирования и проектирования

### Принципы проектирования

<details>
<summary>Что такое SOLID?</summary><br>
<table><tr><td>

SOLID - пять принципов проектирования:

- **SRP**: у модуля должна быть одна основная причина для изменения.
- **OCP**: поведение лучше расширять через новые реализации, а не растущий `if`.
- **LSP**: реализация должна соблюдать контракт базового типа.
- **ISP**: лучше несколько узких интерфейсов, чем один универсальный.
- **DIP**: бизнес-логика должна зависеть от абстракций, а не от HTTP, storage или других деталей.

На практике SOLID помогает уменьшить связанность и упростить тестирование. Это ориентиры, а не требование создавать
отдельный класс для каждой функции.

</td></tr></table>

</details>

<details>
<summary>Что такое DRY?</summary><br>
<table><tr><td>

DRY означает, что одно бизнес-правило должно иметь один источник истины. Если порог бесплатной доставки используется в
нескольких местах, его лучше вынести в общую функцию или доменный сервис.

Одинаковые строки кода не всегда являются дублированием: два похожих сценария можно оставить раздельными, если они
меняются по разным причинам.

</td></tr></table>

</details>

<details>
<summary>Что такое KISS?</summary><br>
<table><tr><td>

KISS предлагает выбирать самое простое решение, которое корректно выполняет текущие требования.

Если обычной функции или небольшого компонента достаточно, не нужны фабрики, глубокое наследование и универсальная
конфигурация. Простота не отменяет типизацию, обработку ошибок и тесты.

</td></tr></table>

</details>

<details>
<summary>Что такое YAGNI?</summary><br>
<table><tr><td>

YAGNI означает: не реализовывать функциональность, пока для нее нет подтвержденной потребности.

Код «на будущее» увеличивает объем поддержки и часто основан на неверном прогнозе. При этом текущее решение должно
оставаться понятным и допускать безопасные изменения.

</td></tr></table>

</details>

<details>
<summary>Как могут конфликтовать SOLID, DRY, KISS и YAGNI?</summary><br>
<table><tr><td>

Принципы могут подталкивать к разным решениям:

- DRY предлагает вынести повторение, а KISS может оставить два простых независимых фрагмента.
- OCP предлагает точку расширения, а YAGNI не позволяет проектировать ее без реального сценария.
- SRP помогает разделить обязанности, но чрезмерное дробление ухудшает навигацию.

Приоритет отдают текущим требованиям и стоимости изменений. Сначала пишут ясное рабочее решение, а абстракцию добавляют
после появления устойчивого повторения или вариативности.

</td></tr></table>

</details>

<details>
<summary>Как применять инженерные принципы в Angular?</summary><br>
<table><tr><td>

- Компонент отвечает за UI и события пользователя.
- Сервис или facade координирует сценарий.
- Чистая функция содержит вычисления и преобразования.
- DI и `InjectionToken` позволяют заменить инфраструктурную реализацию.
- Signals подходят для локального синхронного состояния, RxJS - для сложных асинхронных потоков.

```ts
export interface UserRepository {
  findById(id: string): Observable<User>;
}

export const USER_REPOSITORY = new InjectionToken<UserRepository>('USER_REPOSITORY');

@Injectable({providedIn: 'root'})
export class UserFacade {
  private readonly repository = inject(USER_REPOSITORY);

  load(id: string): Observable<User> {
    return this.repository.findById(id);
  }
}
```

`UserFacade` зависит от узкого контракта, а HTTP-реализацию можно заменить provider-ом или тестовым fake.

</td></tr></table>

</details>

<details>
<summary>Что такое cohesion и coupling?</summary><br>
<table><tr><td>

**Cohesion** показывает, насколько логика внутри модуля относится к одной задаче. **Coupling** показывает, насколько
сильно модуль зависит от деталей других модулей.

Обычно стремятся к высокой cohesion и низкому явному coupling: например, состояние корзины и расчет суммы можно хранить
вместе, а аналитику и HTTP вынести за ее границы.

</td></tr></table>

</details>

<details>
<summary>Что лучше: композиция или наследование?</summary><br>
<table><tr><td>

Во frontend чаще выбирают композицию: компоненты, сервисы, директивы, content projection, host directives и DI можно
сочетать без глубокой иерархии классов.

Наследование уместно, когда существует устойчивое отношение «является» и подкласс полностью соблюдает контракт базового
типа.

</td></tr></table>

</details>

<details>
<summary>Что такое code smell и technical debt?</summary><br>
<table><tr><td>

Code smell - признак возможной проблемы дизайна: большой компонент, длинный список зависимостей, boolean-флаги с
противоречивыми состояниями или повторение бизнес-правил.

Technical debt - будущая стоимость сделанного упрощения. Он допустим как осознанный компромисс с ограниченным риском,
тестовой страховкой и планом пересмотра.

</td></tr></table>

</details>

<details>
<summary>Что такое рефакторинг?</summary><br>
<table><tr><td>

Рефакторинг улучшает внутреннюю структуру кода без изменения наблюдаемого поведения. Его выполняют небольшими шагами под
тестами.

Если небольшое бизнес-правило нельзя проверить без большого `TestBed`, его стоит отделить от I/O и Angular APIs,
например вынести в чистую функцию или узкий сервис.

</td></tr></table>

</details>

### Парадигмы и базовые CS-темы

<details>
<summary>Что такое функциональное программирование?</summary><br>
<table><tr><td>

Функциональное программирование строит вычисления вокруг функций и преобразований данных. Практические идеи:

- pure functions без скрытых side effects;
- immutable data;
- композиция небольших функций;
- декларативные операции `map`, `filter`, `reduce`;
- явное отделение вычислений от I/O.

Во frontend это упрощает тестирование и предсказуемость состояния. Полностью избегать мутаций не обязательно: важно
локализовать их на понятных границах.

</td></tr></table>

</details>

<details>
<summary>Назовите основные принципы ООП?</summary><br>
<table><tr><td>

- **Инкапсуляция** — объект скрывает внутреннее состояние и предоставляет контролируемый API.
- **Абстракция** — наружу выносится существенное поведение, детали реализации скрываются.
- **Наследование** — новый тип переиспользует и расширяет поведение базового типа.
- **Полиморфизм** — разные реализации используются через общий контракт.

ООП не требует применять наследование везде. В Angular чаще полезны композиция компонентов и сервисов, DI и небольшие
интерфейсы.

Пример сочетает четыре принципа:

```ts
interface NotificationChannel {
  send(message: string): void;
}

abstract class BaseNotificationChannel implements NotificationChannel {
  constructor(private readonly prefix: string) {}

  protected format(message: string): string {
    return `${this.prefix}: ${message}`;
  }

  abstract send(message: string): void;
}

class EmailChannel extends BaseNotificationChannel {
  send(message: string): void {
    sendEmail(this.format(message));
  }
}

class PushChannel extends BaseNotificationChannel {
  send(message: string): void {
    sendPush(this.format(message));
  }
}

function notify(channel: NotificationChannel, message: string): void {
  channel.send(message);
}
```

- `private prefix` демонстрирует инкапсуляцию.
- `NotificationChannel` и `BaseNotificationChannel` задают абстракцию.
- `EmailChannel` и `PushChannel` используют наследование.
- `notify()` работает полиморфно с любой реализацией контракта.

Отдельно часто спрашивают SOLID: пять принципов проектирования, которые помогают уменьшать связанность и делать код
расширяемым и тестируемым.

</td></tr></table>

</details>

### Алгоритмы и структуры данных

<details>
<summary>Что такое сложность алгоритмов?</summary><br>
<table><tr><td>

Big O показывает верхнюю асимптотическую границу роста времени или памяти при увеличении входных данных. Константы и
небольшие слагаемые обычно отбрасывают.

- `O(1)` - доступ к элементу `Map` в среднем;
- `O(log n)` - бинарный поиск в отсортированном массиве;
- `O(n)` - один проход по массиву;
- `O(n log n)` - типичная сортировка;
- `O(n²)` - вложенное сравнение всех элементов.

Один цикл по `n` элементам обычно имеет `O(n)`, два независимых последовательных цикла тоже `O(n)`, а два вложенных
цикла часто дают `O(n²)`.

</td></tr></table>

</details>

<details>
<summary>Чем Θ-нотация отличается от O-нотации?</summary><br>
<table><tr><td>

`O(f(n))` задает верхнюю границу роста, а `Θ(f(n))` - точную асимптотическую оценку сверху и снизу.

Например, полный проход по массиву всегда выполняет пропорциональное `n` число шагов: это `Θ(n)` и одновременно `O(n)`.
На frontend-собеседованиях чаще используют Big O, но важно понимать, что это оценка роста, а не точное время в
миллисекундах.

</td></tr></table>

</details>

<details>
<summary>Как измерять сложность алгоритма?</summary><br>
<table><tr><td>

Определяют размер входа `n`, считают наиболее часто выполняемые операции и оставляют доминирующий член.

Помимо времени учитывают память, реальные размеры данных и стоимость операций. Профилирование дополняет асимптотическую
оценку: алгоритм с лучшим Big O не всегда быстрее на маленьком входе.

</td></tr></table>

</details>

<details>
<summary>Как оптимизировать перебор двумя циклами?</summary><br>
<table><tr><td>

Часто один набор заранее индексируют через `Map` или `Set`, заменяя повторный линейный поиск на lookup:

```ts
const usersById = new Map(users.map((user) => [user.id, user]));

const ordersWithUsers = orders.map((order) => ({
  ...order,
  user: usersById.get(order.userId),
}));
```

Вместо примерно `O(n * m)` получается `O(n + m)` по времени ценой дополнительной памяти.

</td></tr></table>

</details>

<details>
<summary>Чем линейный поиск отличается от бинарного?</summary><br>
<table><tr><td>

Линейный поиск проверяет элементы последовательно и работает за `O(n)`. Он подходит для небольшого или
неотсортированного списка.

Бинарный поиск делит область поиска пополам и работает за `O(log n)`, но требует отсортированных данных и доступа по
индексу. Предварительная сортировка стоит `O(n log n)`, поэтому она не всегда окупается для одного поиска.

</td></tr></table>

</details>

<details>
<summary>Какова сложность доступа в основных структурах данных?</summary><br>
<table><tr><td>

- Массив: доступ по индексу `O(1)`, поиск по значению `O(n)`, вставка в середину `O(n)`.
- Связный список: доступ по позиции `O(n)`, вставка по известной ссылке `O(1)`.
- `Map` и `Set`: lookup, добавление и удаление в среднем `O(1)`.
- Стек и очередь: добавление и удаление с рабочего конца обычно `O(1)`.

В JavaScript для очереди частый `shift()` массива имеет `O(n)`. Для большой очереди лучше использовать индекс начала или
специализированную структуру.

</td></tr></table>

</details>

<details>
<summary>Какой алгоритм сортировки полезно знать?</summary><br>
<table><tr><td>

Merge sort делит массив пополам, сортирует части и сливает их. Временная сложность - `O(n log n)`, дополнительная
память - `O(n)`.

В прикладном frontend-коде обычно используют встроенный `toSorted(comparator)`. Важно уметь написать comparator и
понимать, что сортировка больших таблиц может потребовать memoization, worker или переноса на сервер.

</td></tr></table>

</details>

<details>
<summary>Что такое структура данных и какие виды вы знаете (Стек, etc)?</summary><br>
<table><tr><td>

Структура данных — способ организовать данные и операции над ними.

- Массив: быстрый доступ по индексу, последовательное хранение.
- Связный список: удобные вставки и удаления при наличии ссылки на узел.
- Стек: LIFO, пример — call stack.
- Очередь: FIFO, пример — очередь задач.
- `Map`: пары ключ-значение с ключами любого типа.
- `Set`: множество уникальных значений.
- Дерево: иерархия, пример — DOM и дерево компонентов.
- Граф: вершины и связи, пример — зависимости модулей.
- Heap: структура для быстрого получения минимального или максимального элемента.

На собеседовании полезно сравнить сложность основных операций по времени и памяти, а не только дать определения.

</td></tr></table>

</details>

<details>
<summary>Как следить за чистотой кода?</summary><br>
<table><tr><td>

Помогают небольшие функции, точные имена, строгие типы, явные состояния, отсутствие скрытых side effects и регулярное
удаление мертвого кода.

ESLint, Prettier и тесты автоматизируют проверки, но не заменяют ясные границы модулей и ответственность разработчика.

</td></tr></table>

</details>

## State Management

### Redux

<details>
<summary>Что такое Redux?</summary><br>
<table><tr><td>

Redux — библиотека управления состоянием с единым store и явными событиями. Новое состояние вычисляется reducers из
предыдущего состояния и action. Обычно используют Redux Toolkit, который уменьшает boilerplate и безопасно применяет
immutable updates.

</td></tr></table>

</details>

<details>
<summary>Какие основные идеи Redux?</summary><br>
<table><tr><td>

State хранится централизованно, изменения описываются actions, а reducers вычисляют следующий state предсказуемо.
Однонаправленный поток облегчает tracing и replay. Side effects выносят за пределы reducers.

</td></tr></table>

</details>

<details>
<summary>Что такое store?</summary><br>
<table><tr><td>

Store хранит текущее state tree, принимает actions через `dispatch` и уведомляет subscribers. Он также объединяет
reducers и middleware. Store не обязан содержать все локальное UI-состояние приложения.

</td></tr></table>

</details>

<details>
<summary>Что такое action?</summary><br>
<table><tr><td>

Action — обычный объект, описывающий произошедшее событие, обычно с полем `type` и payload. Хорошее имя отражает domain
event, а не инструкцию изменения каждого поля. Actions должны быть сериализуемыми, если важны DevTools и persistence.

</td></tr></table>

</details>

<details>
<summary>Что такое reducer?</summary><br>
<table><tr><td>

Reducer — функция `(state, action) => nextState`. Она обрабатывает известные actions и возвращает прежний state для
остальных. Reducer не выполняет HTTP, timers и случайные вычисления.

```js
function counterReducer(state = {count: 0}, action) {
  switch (action.type) {
    case 'increment':
      return {...state, count: state.count + 1};

    default:
      return state;
  }
}
```

</td></tr></table>

</details>

<details>
<summary>Почему reducer должен быть чистой функцией?</summary><br>
<table><tr><td>

Одинаковые входы должны давать одинаковый результат без внешних side effects. Это делает обновления тестируемыми,
поддерживает replay и time-travel debugging. I/O выполняет middleware или отдельный orchestration layer.

</td></tr></table>

</details>

<details>
<summary>Что такое immutable update?</summary><br>
<table><tr><td>

Это создание нового объекта для изменившейся ветки вместо мутации существующего state. Ссылочное сравнение позволяет
быстро определить изменения. Redux Toolkit использует Immer, поэтому внутри reducer можно писать mutation-like syntax с
immutable результатом.

</td></tr></table>

</details>

<details>
<summary>Что такое selector?</summary><br>
<table><tr><td>

Selector читает или вычисляет данные из store. Memoized selector не пересчитывает результат, пока его входные ссылки не
изменились. Сложную derivation logic лучше держать в selectors, а не компонентах.

</td></tr></table>

</details>

<details>
<summary>Что такое middleware?</summary><br>
<table><tr><td>

Middleware перехватывает dispatch между caller и reducer. Оно используется для async flows, logging, analytics и
обработки ошибок. Middleware не должно скрывать критичную бизнес-логику без наблюдаемых actions.

</td></tr></table>

</details>

<details>
<summary>Что такое side effects в Redux?</summary><br>
<table><tr><td>

Это HTTP, storage, timers, navigation, случайность и любое взаимодействие вне чистого reducer. Их реализуют thunk, saga,
observable middleware или listener middleware. Результат обычно возвращается в store новым action.

</td></tr></table>

</details>

<details>
<summary>Какие плюсы Redux?</summary><br>
<table><tr><td>

Явный поток данных, хорошие DevTools, предсказуемые updates, testability и удобная диагностика сложных сценариев.
Центральный event log полезен большим командам. Экосистема предлагает устойчивые patterns для normalized data.

</td></tr></table>

</details>

<details>
<summary>Какие минусы Redux?</summary><br>
<table><tr><td>

Дополнительные actions, reducers, selectors и async conventions увеличивают объем кода и порог входа. Глобальный store
легко перегрузить локальным state. Плохая granularity вызывает лишние updates и связанность features.

</td></tr></table>

</details>

<details>
<summary>Когда Redux оправдан?</summary><br>
<table><tr><td>

Когда много удаленных компонентов используют общее сложное состояние, важны audit/debugging и несколько команд меняют
одни domain entities. Он полезен для долгоживущих async workflows и normalized caches. Решение должно окупать
инфраструктуру.

</td></tr></table>

</details>

<details>
<summary>Когда Redux будет лишним усложнением?</summary><br>
<table><tr><td>

Для формы, раскрытия панели или данных одного feature часто достаточно component state или query cache. Если actions
лишь дублируют простые setters, архитектура не дает пользы. Начинать лучше с colocated state.

</td></tr></table>

</details>

### MobX

<details>
<summary>Что такое MobX?</summary><br>
<table><tr><td>

MobX — реактивная библиотека, которая отслеживает чтения observable state и автоматически обновляет зависящие
computations и views. Код часто выглядит как обычные объекты и методы. Связи формируются динамически во время
выполнения.

</td></tr></table>

</details>

<details>
<summary>Чем MobX отличается от Redux?</summary><br>
<table><tr><td>

Redux делает события и переходы состояния явными через actions/reducers. MobX больше опирается на observable graph и
автоматические reactions, поэтому бывает лаконичнее. При неаккуратном дизайне поток изменений сложнее проследить.

</td></tr></table>

</details>

<details>
<summary>Что такое observable state?</summary><br>
<table><tr><td>

Это состояние, чтения и изменения которого отслеживает MobX. Когда observable меняется, зависимые computed values и
reactions инвалидируются. Изменения обычно группируют в actions.

</td></tr></table>

</details>

<details>
<summary>Что такое computed value?</summary><br>
<table><tr><td>

Computed — производное значение из observables. MobX кеширует его и пересчитывает при изменении реально прочитанных
dependencies. Computed должен быть чистым и не выполнять I/O.

</td></tr></table>

</details>

<details>
<summary>Что такое reaction?</summary><br>
<table><tr><td>

Reaction запускает side effect при изменении наблюдаемого выражения. Его используют для persistence, analytics или
интеграции с внешним API. Reaction нужно уничтожать, когда заканчивается lifetime владельца.

</td></tr></table>

</details>

<details>
<summary>Какие плюсы MobX?</summary><br>
<table><tr><td>

Меньше boilerplate, естественная объектная модель и точные updates по фактически прочитанным dependencies. Удобен для
богатых domain models и сложных производных значений. Быстро внедряется в локальные features.

</td></tr></table>

</details>

<details>
<summary>Какие минусы MobX?</summary><br>
<table><tr><td>

Динамический dependency graph и скрытая реактивность могут усложнить tracing. Легко создать side effects с неочевидным
lifecycle или чрезмерно mutable shared model. Нужны соглашения о actions, ownership и disposal.

</td></tr></table>

</details>

<details>
<summary>Когда MobX может быть удобнее Redux?</summary><br>
<table><tr><td>

Когда важна лаконичная модель объектов, много computed dependencies и команда принимает runtime-реактивность. Redux
удобнее, если нужен строгий event log и максимально явный flow. Выбор зависит от требований к debugging и культуре
команды.

</td></tr></table>

</details>

### Angular state management

<details>
<summary>Какие способы управления состоянием есть в Angular?</summary><br>
<table><tr><td>

Локальные fields/signals, services с signals, RxJS services, Router/URL, query caches и stores вроде NgRx. Выбор зависит
от scope, lifetime, async complexity и числа consumers. Не все состояние должно быть глобальным.

</td></tr></table>

</details>

<details>
<summary>Когда достаточно component state?</summary><br>
<table><tr><td>

Когда состояние принадлежит одному component subtree: open/closed, выбранная вкладка, черновик формы. Оно легко
уничтожается вместе с UI и не создает глобальных зависимостей. При необходимости state можно поднять к ближайшему общему
владельцу.

</td></tr></table>

</details>

<details>
<summary>Когда достаточно сервиса с signal?</summary><br>
<table><tr><td>

Для синхронного feature state с несколькими consumers и понятными methods обновления. Сервис владеет writable signals и
наружу отдает readonly state/computed values. Scope provider определяет lifetime.

</td></tr></table>

</details>

<details>
<summary>Когда использовать RxJS store service?</summary><br>
<table><tr><td>

Когда состояние строится из HTTP, WebSocket, cancellation, debounce и нескольких async streams. RxJS хорошо выражает
время, конкуренцию и backpressure. Следует избегать ручных nested subscriptions и скрытого mutable state.

</td></tr></table>

</details>

<details>
<summary>Когда использовать NgRx?</summary><br>
<table><tr><td>

Для большого shared state, сложных effects, entity collections, строгих conventions и сильной потребности в DevTools.
NgRx полезен нескольким командам с общим domain flow. Для локального feature его ceremony может быть избыточной.

</td></tr></table>

</details>

<details>
<summary>Чем Signals отличаются от Redux-подхода?</summary><br>
<table><tr><td>

Signals — реактивный primitive чтения и записи, а не готовая архитектура событий. Redux задает store, actions, reducers
и однонаправленный event flow. На signals можно построить разные architectures, включая Redux-подобную.

</td></tr></table>

</details>

<details>
<summary>Чем NgRx отличается от обычного сервиса?</summary><br>
<table><tr><td>

NgRx предоставляет стандартизированные actions, reducers, selectors, effects, DevTools и entity tools. Сервис оставляет
структуру и discipline команде и обычно требует меньше кода. Чем больше contributors и workflows, тем ценнее единые
conventions.

</td></tr></table>

</details>

<details>
<summary>Что такое facade pattern в Angular state management?</summary><br>
<table><tr><td>

Facade предоставляет компонентам узкий API чтения состояния и выполнения use cases, скрывая store/RxJS/HTTP details. Это
уменьшает связанность UI с выбранной библиотекой. Facade не должна становиться механическим proxy без domain value.

</td></tr></table>

</details>

<details>
<summary>Как не превратить сервис состояния в god object?</summary><br>
<table><tr><td>

Разделять state по feature/domain ownership, держать commands узкими и выносить data access отдельно. Не смешивать
несвязанные формы, router, HTTP и analytics в одном singleton. Public API должен быть меньше внутренней реализации.

</td></tr></table>

</details>

## Node.js

### Node.js basics

<details>
<summary>Что такое Node.js?</summary><br>
<table><tr><td>

Node.js — JavaScript runtime вне браузера, построенный вокруг V8 и системных API. Он используется для servers, CLI,
build tools и automation. Node предоставляет filesystem, processes и network APIs, которых нет в browser sandbox.

</td></tr></table>

</details>

<details>
<summary>Чем Node.js отличается от браузера?</summary><br>
<table><tr><td>

В Node нет DOM, `window` и browser security model, но доступны `process`, filesystem и server sockets. Browser имеет UI,
Web APIs и origin restrictions. Общий JavaScript syntax не гарантирует совместимость окружений.

</td></tr></table>

</details>

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
<summary>Почему Node.js называют event-driven runtime?</summary><br>
<table><tr><td>

Программа регистрирует handlers, а runtime вызывает их при событиях I/O, timers или завершении задач. Это позволяет
обслуживать много соединений без отдельного JavaScript thread на каждое. CPU-bound handler все равно блокирует event
loop.

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
<summary>Что такое ES Modules в Node.js?</summary><br>
<table><tr><td>

Это стандартная система `import`/`export`, включаемая расширением `.mjs` или `"type": "module"`. Она поддерживает static
analysis, top-level await и browser-compatible syntax. Resolution и interop с CommonJS имеют отдельные правила.

</td></tr></table>

</details>

<details>
<summary>Чем <code>require</code> отличается от <code>import</code>?</summary><br>
<table><tr><td>

`require()` — CommonJS function с синхронной загрузкой и runtime-вызовом. Static `import` анализируется до выполнения и
работает в ESM. Dynamic `import()` асинхронен и доступен в обоих современных контекстах.

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
<summary>Что такое child process?</summary><br>
<table><tr><td>

Это отдельный процесс операционной системы, запущенный из Node через `spawn`, `exec` или `fork`. Он имеет отдельную
память и может выполнять внешнюю команду. Нужно обрабатывать exit code, stderr, signals и размер output.

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
<summary>Чем dependencies отличаются от devDependencies?</summary><br>
<table><tr><td>

`dependencies` нужны package во время runtime потребителя, `devDependencies` — для разработки, тестов и сборки. Для
frontend application обе группы обычно устанавливаются перед build. Для library правильная классификация влияет на
потребителя.

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
<summary>Что такое npm scripts?</summary><br>
<table><tr><td>

Это именованные shell-команды в поле `scripts`, запускаемые через `npm run`. npm добавляет локальные binaries из
`node_modules/.bin` в `PATH`. Lifecycle scripts могут запускаться автоматически, поэтому dependencies должны быть
доверенными.

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

### Node.js для frontend tooling

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
<summary>Что такое dev server?</summary><br>
<table><tr><td>

Локальный HTTP server для разработки с module transforms, source maps, watch и hot reload. Он оптимизирован для
feedback, а не безопасности, кеширования и production traffic. Его нельзя использовать как production hosting.

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

### Node.js observability и RPS monitoring

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

## Infrastructure

### Docker

<details>
<summary>Что такое Docker?</summary><br>
<table><tr><td>

Docker — инструменты и формат для сборки и запуска containers из reproducible images. Container упаковывает приложение,
runtime и filesystem dependencies. Это упрощает одинаковый запуск в CI, local и production.

</td></tr></table>

</details>

<details>
<summary>Чем container отличается от virtual machine?</summary><br>
<table><tr><td>

VM включает гостевую ОС и виртуализирует hardware, container разделяет kernel host OS и изолирует процессы. Containers
обычно запускаются быстрее и занимают меньше места. Изоляция отличается от полной VM и требует security hardening.

</td></tr></table>

</details>

<details>
<summary>Что такое Docker image?</summary><br>
<table><tr><td>

Image — immutable шаблон filesystem и metadata для запуска container. Он состоит из layers и обычно хранится в registry.
Один image можно запускать много раз с разной конфигурацией.

</td></tr></table>

</details>

<details>
<summary>Что такое Docker container?</summary><br>
<table><tr><td>

Container — запущенный instance image с writable layer, process и настройками сети. После удаления его локальные
изменения исчезают, если данные не вынесены в volume. Container должен быть заменяемым.

</td></tr></table>

</details>

<details>
<summary>Что такое Dockerfile?</summary><br>
<table><tr><td>

Это декларативная последовательность инструкций сборки image: base image, files, commands и startup metadata.
Multi-stage build отделяет тяжелую сборочную среду от компактного runtime image. Секреты нельзя записывать в layers.

```dockerfile
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
```

Путь `/app/dist` зависит от output path конкретного Angular-проекта и может содержать дополнительную browser directory.

</td></tr></table>

</details>

<details>
<summary>Что такое build context?</summary><br>
<table><tr><td>

Это directory и набор файлов, отправляемых Docker daemon/build engine для сборки. Инструкции `COPY` видят только
context. Слишком большой context замедляет build и может случайно включить секреты.

</td></tr></table>

</details>

<details>
<summary>Что такое layer в Docker image?</summary><br>
<table><tr><td>

Большинство Dockerfile instructions создают кешируемый immutable layer. Изменение раннего layer инвалидирует следующие.
Поэтому manifests копируют и устанавливают dependencies до копирования часто меняющегося source code.

</td></tr></table>

</details>

<details>
<summary>Что такое <code>.dockerignore</code>?</summary><br>
<table><tr><td>

Файл исключает пути из build context, например `node_modules`, `.git`, `dist` и local secrets. Это ускоряет передачу
context и уменьшает риск утечки. Он работает похоже на `.gitignore`, но правила относятся к Docker build.

</td></tr></table>

</details>

<details>
<summary>Что такое port mapping?</summary><br>
<table><tr><td>

Mapping публикует port container на host, например `-p 8080:80`. Приложение внутри должно слушать нужный interface и
container port. `EXPOSE` документирует port, но само mapping не создает.

</td></tr></table>

</details>

<details>
<summary>Что такое volume?</summary><br>
<table><tr><td>

Volume хранит данные вне writable layer container. Он переживает пересоздание container и может монтировать host
directory для разработки. Для static frontend production volume обычно не нужен, а backend/database используют его
часто.

</td></tr></table>

</details>

<details>
<summary>Что такое environment variables в Docker?</summary><br>
<table><tr><td>

Они передают runtime configuration процессу container через `-e`, Compose или platform settings. Значения не следует
встраивать в image как secrets. Browser frontend не может прочитать server environment после статической сборки без
runtime config механизма.

</td></tr></table>

</details>

<details>
<summary>Как собрать Docker image?</summary><br>
<table><tr><td>

Команда читает Dockerfile и build context, создавая image с заданным tag.

```bash
docker build -t frontend-app .
```

</td></tr></table>

</details>

<details>
<summary>Как запустить container?</summary><br>
<table><tr><td>

`--rm` удалит остановленный container, а `-p` опубликует port.

```bash
docker run --rm -p 8080:80 frontend-app
```

</td></tr></table>

</details>

<details>
<summary>Как посмотреть логи container?</summary><br>
<table><tr><td>

Сначала находят container, затем читают stdout/stderr. Приложение должно писать operational logs в стандартные streams.

```bash
docker ps
docker logs <container_id>
```

</td></tr></table>

</details>

<details>
<summary>Как остановить container?</summary><br>
<table><tr><td>

`docker stop` отправляет graceful signal и после timeout завершает process. Приложение должно корректно обрабатывать
shutdown.

```bash
docker stop <container_id>
```

</td></tr></table>

</details>

<details>
<summary>Как зайти внутрь container?</summary><br>
<table><tr><td>

`exec` запускает новый process в работающем container. Команда полезна для диагностики, но production fixes нужно
вносить в image, а не вручную.

```bash
docker exec -it <container_id> sh
```

</td></tr></table>

</details>

### Docker Compose

<details>
<summary>Что такое Docker Compose?</summary><br>
<table><tr><td>

Compose описывает несколько связанных containers, networks и volumes в YAML. Он удобен для локального окружения и
integration tests. Production orchestration может использовать другие платформы.

</td></tr></table>

</details>

<details>
<summary>Чем Docker Compose отличается от Docker?</summary><br>
<table><tr><td>

Docker CLI управляет отдельными images и containers, Compose — набором services как одним проектом. Compose вызывает тот
же container runtime. Он добавляет декларативную конфигурацию связей и lifecycle.

</td></tr></table>

</details>

<details>
<summary>Что такое service в docker-compose.yml?</summary><br>
<table><tr><td>

Service описывает image/build, command, ports, environment, volumes и dependencies одного типа container. Compose
создает container instances service. Имя service также работает как DNS hostname внутри default network.

</td></tr></table>

</details>

<details>
<summary>Что такое network в Docker Compose?</summary><br>
<table><tr><td>

Network соединяет services и изолирует их от других проектов. Containers обращаются друг к другу по service name и
внутреннему port. Host port mapping для межконтейнерной связи не нужен.

</td></tr></table>

</details>

<details>
<summary>Что такое volume в Docker Compose?</summary><br>
<table><tr><td>

Volume объявляет persistent или bind-mounted storage для services. Named volume управляется Docker, bind mount связывает
конкретный host path. Неправильный mount может скрыть файлы из image.

</td></tr></table>

</details>

<details>
<summary>Как запустить несколько сервисов одной командой?</summary><br>
<table><tr><td>

`up` создает network, builds нужные images и запускает services. `--build` принудительно учитывает изменения Dockerfile
и context.

```bash
docker compose up --build
```

</td></tr></table>

</details>

<details>
<summary>Как посмотреть логи через Docker Compose?</summary><br>
<table><tr><td>

Команда агрегирует logs всех services; можно указать имя одного service. `-f` продолжает следить за output.

```bash
docker compose logs -f
```

</td></tr></table>

</details>

<details>
<summary>Как остановить окружение?</summary><br>
<table><tr><td>

`down` останавливает и удаляет containers и project network. Named volumes сохраняются, если не добавить `--volumes`.

```bash
docker compose down
```

</td></tr></table>

</details>

<details>
<summary>Как Docker Compose помогает frontend-разработчику?</summary><br>
<table><tr><td>

Одной командой поднимает frontend, backend, database и mocks с согласованными адресами. Это уменьшает расхождения
локального окружения и onboarding. Health checks и seed data делают сценарий надежнее простого порядка запуска.

```yaml
services:
  frontend:
    build: .
    ports:
      - '4200:80'
    environment:
      API_URL: 'http://backend:3000'

  backend:
    image: node:22-alpine
    working_dir: /app
    command: npm start
    volumes:
      - ./backend:/app
    ports:
      - '3000:3000'
```

</td></tr></table>

</details>

### Frontend deployment

<details>
<summary>Что является артефактом frontend build?</summary><br>
<table><tr><td>

Обычно это `index.html`, hashed JavaScript/CSS chunks, images, fonts и manifests. SSR дополнительно создает server
bundle. Artifact должен быть immutable и одинаково проходить stage и production.

</td></tr></table>

</details>

<details>
<summary>Чем dev server отличается от production hosting?</summary><br>
<table><tr><td>

Dev server дает watch, source maps и HMR, но не рассчитан на security, compression, caching и нагрузку. Production
hosting раздает готовые artifacts через web server/CDN. Проверка только через dev server недостаточна.

</td></tr></table>

</details>

<details>
<summary>Где обычно хранят production frontend assets?</summary><br>
<table><tr><td>

В object storage, CDN origin, web server image или managed hosting. Static assets удобно хранить отдельно от backend.
Доступ должен поддерживать HTTPS, correct MIME types и cache headers.

</td></tr></table>

</details>

<details>
<summary>Что такое CDN?</summary><br>
<table><tr><td>

CDN кеширует и отдает content с edge servers ближе к пользователю. Он снижает latency и нагрузку на origin. Нужно
управлять cache keys, invalidation, compression и security headers.

</td></tr></table>

</details>

<details>
<summary>Почему assets часто кешируют долго?</summary><br>
<table><tr><td>

Content-hashed file не меняется под тем же URL, поэтому безопасен `Cache-Control: immutable` с большим TTL. Новый
release создает новое имя. Это повышает cache hit rate и ускоряет повторные visits.

</td></tr></table>

</details>

<details>
<summary>Почему <code>index.html</code> обычно кешируют осторожнее?</summary><br>
<table><tr><td>

Он содержит ссылки на chunks текущего release и должен быстро переключаться на новую версию. Устаревший HTML может
ссылаться на удаленные assets. Обычно применяют короткий TTL или revalidation.

</td></tr></table>

</details>

<details>
<summary>Что такое cache busting?</summary><br>
<table><tr><td>

Это изменение URL ресурса при изменении content, чтобы кеш не вернул старую версию. Наиболее надежный способ — content
hash в filename. Query string поддерживается не всеми cache policies одинаково.

</td></tr></table>

</details>

<details>
<summary>Как hash в имени файла помогает кешированию?</summary><br>
<table><tr><td>

Одинаковый content получает стабильный URL, измененный — новый URL. Старый и новый releases могут временно существовать
вместе. Это позволяет долго кешировать chunks без ручной invalidation.

</td></tr></table>

</details>

<details>
<summary>Как environment variables попадают во frontend?</summary><br>
<table><tr><td>

При build-time configuration bundler заменяет значения и они становятся частью публичного JavaScript. Static app не
читает environment server после загрузки. Секреты во frontend передавать нельзя.

</td></tr></table>

</details>

<details>
<summary>Почему runtime config иногда лучше build-time config?</summary><br>
<table><tr><td>

Один artifact можно продвигать между окружениями, меняя небольшой config JSON при старте или запросе. Это упрощает
rollback и снижает число сборок. Нужно обработать загрузку, schema validation и cache config.

</td></tr></table>

</details>

<details>
<summary>Как откатить frontend-релиз?</summary><br>
<table><tr><td>

Вернуть предыдущий immutable artifact или переключить pointer/route на него. Старые hashed assets сохраняют до истечения
активных сессий и cache TTL. Rollback проверяют как часть release process.

</td></tr></table>

</details>

<details>
<summary>Какие метрики важно смотреть после деплоя frontend?</summary><br>
<table><tr><td>

JavaScript errors, failed asset/API requests, Core Web Vitals, conversion и ключевые user flows. Метрики сравнивают по
release version и сегментам. Нужны alerts и быстрый способ отключить проблемную функцию.

</td></tr></table>

</details>

### Feature toggles

<details>
<summary>Что такое feature toggle?</summary><br>
<table><tr><td>

Feature toggle, или feature flag, — механизм включения и выключения функциональности без нового деплоя. Код уже может
находиться в production, но пользователи увидят фичу только после включения флага.

</td></tr></table>

</details>

<details>
<summary>Чем deploy отличается от release?</summary><br>
<table><tr><td>

Deploy — доставка кода в окружение, release — предоставление функциональности пользователям. Feature toggles разделяют
эти этапы: код можно задеплоить заранее, проверить и включить позднее.

</td></tr></table>

</details>

<details>
<summary>Зачем нужны feature toggles во frontend?</summary><br>
<table><tr><td>

Они позволяют постепенно выкатывать изменения, проводить A/B-тесты, давать доступ отдельным группам и быстро отключать
проблемный UI. Это уменьшает риск релиза, но требует контроля жизненного цикла флагов.

</td></tr></table>

</details>

<details>
<summary>Какие бывают типы feature toggles?</summary><br>
<table><tr><td>

- Release toggles временно скрывают незавершенную или постепенно выкатываемую фичу.
- Experiment toggles распределяют варианты A/B-теста.
- Ops toggles позволяют оперативно отключить функциональность.
- Permission toggles отражают доступ по роли, правам или тарифу.
- Environment toggles задают различия между dev, stage и production.

У типов разные владельцы и срок жизни: например, release flag обычно удаляют, а permission rule может быть постоянной.

</td></tr></table>

</details>

<details>
<summary>Чем feature toggle отличается от permission check?</summary><br>
<table><tr><td>

Feature toggle управляет выпуском или экспериментом, а permission check — правами конкретного пользователя. Условия
могут выглядеть похоже, но имеют разные причины изменения, владельцев и требования к безопасности.

</td></tr></table>

</details>

<details>
<summary>Чем feature toggle отличается от environment config?</summary><br>
<table><tr><td>

Environment config обычно фиксирован для dev, stage или production. Feature toggle может меняться во время работы и
зависеть от пользователя, роли, процента аудитории или варианта эксперимента.

</td></tr></table>

</details>

<details>
<summary>Что лучше: build-time flag или runtime flag?</summary><br>
<table><tr><td>

Build-time flag встраивается в bundle и требует новой сборки и деплоя для изменения. Runtime flag загружается при
запуске или обновляется во время работы. Для оперативного production rollout обычно нужен runtime flag, а build-time
подходит для постоянных различий сборок и dead-code elimination.

</td></tr></table>

</details>

<details>
<summary>Где хранить feature flags config?</summary><br>
<table><tr><td>

Флаги можно хранить в backend/config service, remote config, CMS, admin panel или feature-management service. Для
production предпочтителен централизованный источник с audit log, валидацией, контролем доступа и возможностью изменить
runtime-конфигурацию без нового frontend build.

</td></tr></table>

</details>

<details>
<summary>Как использовать feature toggle в Angular?</summary><br>
<table><tr><td>

Сервис может хранить загруженные флаги в signal и предоставлять узкий API проверки:

```ts
import {Injectable, signal} from '@angular/core';

type FeatureFlag = 'newCheckout';

@Injectable({providedIn: 'root'})
export class FeatureFlagsService {
  private readonly flags = signal<Readonly<Record<FeatureFlag, boolean>>>({
    newCheckout: false,
  });

  public isEnabled(flag: FeatureFlag): boolean {
    return this.flags()[flag];
  }

  public setFlags(flags: Readonly<Record<FeatureFlag, boolean>>): void {
    this.flags.set(flags);
  }
}
```

Для большого набора флагов полезны typed keys, schema validation и явные безопасные defaults.

</td></tr></table>

</details>

<details>
<summary>Как защитить route через feature toggle?</summary><br>
<table><tr><td>

Функциональный `CanMatchFn` не даст Router выбрать route с выключенной фичей:

```ts
import {inject} from '@angular/core';
import {CanMatchFn} from '@angular/router';

export const newCheckoutGuard: CanMatchFn = () => inject(FeatureFlagsService).isEnabled('newCheckout');
```

Flags config должен быть загружен до первой навигации или guard должен дождаться его асинхронно. Этот guard управляет
навигацией, но не заменяет backend authorization.

</td></tr></table>

</details>

<details>
<summary>Как использовать feature toggle в Angular-шаблоне?</summary><br>
<table><tr><td>

Компонент может предоставить вычисляемое состояние:

```ts
import {computed, inject} from '@angular/core';

export class CheckoutComponent {
  private readonly featureFlags = inject(FeatureFlagsService);

  protected readonly isNewCheckoutEnabled = computed(() => this.featureFlags.isEnabled('newCheckout'));
}
```

Шаблон отображает новую реализацию или fallback:

```html
@if (isNewCheckoutEnabled()) {
<app-new-checkout />
} @else {
<app-checkout />
}
```

Для повторяющегося UI-условия можно создать directive, но единичную проверку проще оставить явной.

</td></tr></table>

</details>

<details>
<summary>Какие риски есть у feature toggles?</summary><br>
<table><tr><td>

- Старые флаги забывают удалить.
- Условия усложняют код и увеличивают число сценариев.
- Разные пользователи видят разное поведение, что затрудняет диагностику.
- Сырую фичу можно включить ошибочно.
- Frontend flag ошибочно принимают за security boundary.

Нужны владелец, срок удаления, audit log, безопасное значение по умолчанию и наблюдаемость по варианту флага.

</td></tr></table>

</details>

<details>
<summary>Почему frontend feature toggle не заменяет backend authorization?</summary><br>
<table><tr><td>

Frontend-код и сетевые запросы можно изучить и изменить. Флаг может скрыть UI, но backend обязан независимо проверять
права на данные и операции. Иначе пользователь сможет обойти ограничение прямым API-запросом.

</td></tr></table>

</details>

<details>
<summary>Как тестировать feature toggles?</summary><br>
<table><tr><td>

Минимально тестируют включенный и выключенный флаг. Для критичной фичи также проверяют безопасный default, ошибку и
задержку загрузки config, права доступа, постепенный rollout и rollback. Тесты должны явно задавать набор флагов, чтобы
не зависеть от внешнего сервиса.

</td></tr></table>

</details>

<details>
<summary>Когда feature toggle нужно удалить?</summary><br>
<table><tr><td>

Release toggle удаляют после стабильного выката на всю аудиторию вместе с устаревшей веткой кода и тестами для нее.
Полезно заранее назначить владельца и дату удаления, иначе флаги превращаются в постоянный технический долг.

</td></tr></table>

</details>

<details>
<summary>Что такое kill switch?</summary><br>
<table><tr><td>

Kill switch — ops flag для быстрого отключения проблемной функциональности в production без нового деплоя. Например, им
можно вернуть старый checkout при росте ошибок оплаты. Переключение и fallback следует проверить заранее.

</td></tr></table>

</details>

<details>
<summary>Как feature toggles помогают с микрофронтендами?</summary><br>
<table><tr><td>

Host может скрыть вход в фичу, не загружать сломанный remote и показать fallback UI. Runtime flag позволяет сделать это
без срочного деплоя host-приложения, если решение о загрузке принимается до импорта remote.

</td></tr></table>

</details>

<details>
<summary>Что может пойти не так при загрузке feature flags?</summary><br>
<table><tr><td>

Config service может быть недоступен или ответить поздно; разные части приложения могут получить разные версии; UI может
сначала показать одну ветку, а затем другую. Нужны timeout, кеширование, согласованный snapshot конфигурации, schema
validation и явные fallback-значения.

</td></tr></table>

</details>

<details>
<summary>Что показывать, пока feature flags загружаются или если config недоступен?</summary><br>
<table><tr><td>

Выбор зависит от риска. Для некритичной UI-фичи подойдет безопасное default value. Для оплаты, прав доступа и других
критичных сценариев используют loading state или conservative fallback: новая функциональность остается выключенной,
пока конфигурация не подтверждена.

</td></tr></table>

</details>

## Рабочее окружение frontend-разработчика

### Git и командная разработка

<details>
<summary>Чем git revert отличается от git reset?</summary><br>
<table><tr><td>

`git revert` создает новый коммит, отменяющий изменения выбранного коммита. Он безопасен для общей ветки, потому что не
переписывает историю.

`git reset` перемещает указатель ветки. Варианты `--soft`, `--mixed` и `--hard` по-разному работают с index и рабочими
файлами. Reset опубликованной ветки требует последующего force push и может сломать работу коллег.

</td></tr></table>

</details>

<details>
<summary>Чем merge отличается от rebase?</summary><br>
<table><tr><td>

`merge` объединяет истории и обычно создает merge commit. Реальные commit hashes существующей ветки сохраняются.

`rebase` переносит коммиты на новую базу, создавая для них новые hashes и линейную историю. Rebase удобен для локальной
feature-ветки, но опубликованную общую историю без договоренности не переписывают.

</td></tr></table>

</details>

<details>
<summary>Как переключиться на hotfix с незакоммиченными изменениями?</summary><br>
<table><tr><td>

Безопасные варианты:

- сделать небольшой временный коммит в текущей ветке;
- выполнить `git stash push -u`, переключиться на hotfix, затем вернуть изменения через `git stash pop`;
- использовать отдельный `git worktree`, чтобы одновременно работать с двумя ветками.

Не стоит терять изменения через `reset --hard` или переносить незавершенный код в hotfix.

</td></tr></table>

</details>

<details>
<summary>Что происходит с коммитами при rebase на свежий develop?</summary><br>
<table><tr><td>

Git берет коммиты feature-ветки и последовательно применяет их поверх нового `develop`. Содержимое может сохраниться, но
commits получают новые parent links и hashes.

Конфликты разрешают по одному, продолжая `git rebase --continue`. После rebase уже опубликованной ветки обычно нужен
`git push --force-with-lease`, а не обычный force push.

</td></tr></table>

</details>

### Инфраструктура проекта

<details>
<summary>Что такое package.json?</summary><br>
<table><tr><td>

`package.json` описывает Node.js-проект: metadata, scripts, dependencies, devDependencies, engines и настройки
инструментов.

Версии в нем часто задаются диапазонами. Точный набор установленных пакетов фиксирует lock-файл.

</td></tr></table>

</details>

<details>
<summary>Чем отличаются npm, pnpm и Yarn?</summary><br>
<table><tr><td>

Все три инструмента устанавливают зависимости и запускают scripts из `package.json`.

- npm поставляется вместе с Node.js и использует `package-lock.json`.
- pnpm хранит пакеты в общем content-addressable store и строго связывает зависимости.
- Yarn предлагает собственные workflows и `yarn.lock`.

В проекте используют один package manager и коммитят его lock-файл. Смешивание lock-файлов делает установку
непредсказуемой.

</td></tr></table>

</details>

<details>
<summary>Зачем нужен package-lock.json?</summary><br>
<table><tr><td>

`package-lock.json` фиксирует точное дерево npm-зависимостей, их версии и integrity hashes. Его коммитят, чтобы
локальная разработка и CI получали воспроизводимую установку.

Lock-файл обновляют вместе с изменениями зависимостей и не редактируют вручную.

</td></tr></table>

</details>

<details>
<summary>Чем npm install отличается от npm ci?</summary><br>
<table><tr><td>

`npm install` устанавливает зависимости и может обновить `package-lock.json`, если он расходится с `package.json`.

`npm ci` требует существующий согласованный lock-файл, удаляет текущую `node_modules` и устанавливает зависимости строго
по lock-файлу. Поэтому его обычно используют в CI.

</td></tr></table>

</details>

<details>
<summary>Чем ESLint, Stylelint и Prettier отличаются?</summary><br>
<table><tr><td>

ESLint анализирует код и находит потенциальные ошибки, небезопасные конструкции и нарушения правил проекта.

Stylelint выполняет похожую проверку для CSS, SCSS и других стилей. Prettier отвечает за форматирование: отступы,
переносы и кавычки, но не заменяет semantic linting.

</td></tr></table>

</details>

<details>
<summary>Для чего нужен Husky?</summary><br>
<table><tr><td>

Husky настраивает Git hooks в проекте. Например, `pre-commit` может запускать lint-staged, а `commit-msg` - проверять
формат сообщения.

Hooks дают быстрый локальный feedback, но не заменяют CI: их можно пропустить или не установить.

</td></tr></table>

</details>

<details>
<summary>Чем Webpack отличается от Vite?</summary><br>
<table><tr><td>

Webpack строит dependency graph и создает bundles через loaders и plugins. Он гибкий, но development-сборка крупного
проекта может быть тяжелой.

Vite в development использует native ES modules и преобразует файлы по запросу, поэтому обычно быстрее запускается и
обновляет модули. Production-сборка использует отдельный bundling pipeline. В Angular конкретный инструмент часто скрыт
за CLI builder.

</td></tr></table>

</details>

<details>
<summary>Как код попадает в отдельный chunk?</summary><br>
<table><tr><td>

Основные сигналы для сборщика:

- отдельная entry point;
- динамический `import()`;
- lazy route;
- Angular `@defer`;
- правила code splitting в конфигурации сборщика.

Сборщик анализирует dependency graph и выносит асинхронную или общую часть в отдельный файл. Chunk полезен, если
уменьшает initial load, но слишком мелкое дробление увеличивает число запросов и служебные расходы.

</td></tr></table>

</details>

<details>
<summary>Что такое CI/CD?</summary><br>
<table><tr><td>

CI автоматически проверяет изменения: устанавливает зависимости, запускает type check, lint, tests и production build.

CD доставляет проверенную версию в staging или production автоматически либо после ручного подтверждения. Pipeline
должен быть воспроизводимым, быстрым и сохранять artifacts и диагностику ошибок.

</td></tr></table>

</details>

<details>
<summary>Что нужно знать frontend-разработчику о Docker?</summary><br>
<table><tr><td>

Docker image содержит приложение и его runtime-зависимости, а container является запущенным экземпляром image.

Для frontend Docker часто используют для одинакового Node.js-окружения в CI и multi-stage сборки: на первом этапе
собирают static assets, на втором отдают их через web server. В image не добавляют secrets и лишние build dependencies.

</td></tr></table>

</details>

### Методологии и процессы

<details>
<summary>Что такое Agile?</summary><br>
<table><tr><td>

Agile - набор принципов итеративной разработки: короткие циклы, частая поставка работающего результата, обратная связь и
готовность менять план.

Agile не означает отсутствие документации или сроков. Команда сохраняет необходимый процесс, но быстрее проверяет
гипотезы и снижает риск большой поставки в конце проекта.

</td></tr></table>

</details>

<details>
<summary>Чем waterfall отличается от agile-подхода?</summary><br>
<table><tr><td>

Waterfall последовательно проходит этапы требований, проектирования, разработки и тестирования. Он удобен при стабильных
требованиях и дорогих изменениях.

Agile-подход поставляет результат небольшими итерациями и уточняет требования по обратной связи. В реальных проектах
часто используют гибрид, а выбор зависит от продукта, регулирования и рисков.

</td></tr></table>

</details>

<details>
<summary>Что такое Scrum?</summary><br>
<table><tr><td>

Scrum организует работу короткими sprints. Есть product backlog, sprint planning, daily, review и retrospective; роли
включают product owner, scrum master и developers.

Для frontend-разработчика важны понятная цель sprint, согласованный объем и прозрачное обсуждение blockers.

</td></tr></table>

</details>

<details>
<summary>Что такое Kanban?</summary><br>
<table><tr><td>

Kanban визуализирует поток задач по состояниям и ограничивает work in progress. Новая задача берется, когда освободилась
пропускная способность.

Метод подходит для непрерывного потока support, bugs и небольших улучшений, где фиксированный sprint менее удобен.

</td></tr></table>

</details>

<details>
<summary>Что такое sprint и backlog?</summary><br>
<table><tr><td>

Sprint - ограниченный период, обычно одна-две недели, с конкретной целью и выбранными задачами.

Backlog - упорядоченный список product work: features, bugs, technical debt и исследования. Перед реализацией задачи
уточняют, декомпозируют и снабжают acceptance criteria.

</td></tr></table>

</details>

<details>
<summary>Для чего нужны daily и retrospective?</summary><br>
<table><tr><td>

Daily помогает синхронизировать движение к цели и быстро обнаружить blockers. Это не отчет руководителю и не место для
длинного технического обсуждения.

Retrospective проводится после итерации: команда выбирает, что сохранить, что улучшить и какое конкретное действие
проверить дальше.

</td></tr></table>

</details>

<details>
<summary>Что такое bug tracker?</summary><br>
<table><tr><td>

Bug tracker хранит задачи, defects, приоритеты, владельцев, статусы и историю обсуждения. Примеры: Jira, YouTrack,
GitHub Issues.

Хороший bug report содержит шаги воспроизведения, ожидаемый и фактический результат, окружение, severity и
диагностические материалы.

</td></tr></table>

</details>

<details>
<summary>Чем CI отличается от CD?</summary><br>
<table><tr><td>

CI регулярно объединяет изменения и автоматически запускает проверки. CD отвечает за доставку проверенного artifact в
окружения.

Continuous delivery оставляет production release под ручным подтверждением, а continuous deployment автоматически
публикует каждое прошедшее изменение.

</td></tr></table>

</details>

<details>
<summary>Чем отличаются GitFlow, GitHub Flow и Trunk-Based Development?</summary><br>
<table><tr><td>

- GitFlow использует долгоживущие `develop`, release и hotfix branches; процесс формальный, но интеграция может быть
  медленной.
- GitHub Flow использует короткие feature branches, pull requests и merge в основную ветку.
- Trunk-Based Development предполагает очень короткие branches или работу близко к trunk, частую интеграцию и feature
  flags.

Выбор зависит от release process, размера команды и автоматизации тестов.

</td></tr></table>

</details>

## Soft skills и интервью

Этот раздел помогает готовиться к финальному интервью, знакомству с командой и team fit этапу.

На такой встрече оценивают не только технический опыт, но и то, как кандидат думает, принимает решения, общается,
работает с неопределенностью, реагирует на обратную связь и понимает свою роль в команде.

Хорошая подготовка включает:

- короткую самопрезентацию;
- два-три сильных примера из опыта;
- понимание своих сильных сторон и зон развития;
- вопросы будущей команде;
- готовность обсуждать trade-offs, конфликты и ошибки.

### Знакомство с командой

<details>
<summary>Что обычно проверяют на знакомстве с командой?</summary><br>
<table><tr><td>

Команда смотрит на релевантный опыт, мотивацию, самостоятельность, стиль коммуникации и зрелость решений. Важно не
угадать «правильный характер», а показать, как вы работаете и чего ожидаете от роли. Несовпадение ожиданий лучше
обнаружить до выхода.

</td></tr></table>

</details>

<details>
<summary>Чем знакомство с командой отличается от технического интервью?</summary><br>
<table><tr><td>

Технический этап чаще проверяет знания и способ решения задач. На знакомстве обсуждают реальные рабочие ситуации,
ответственность, взаимодействие и причины выбора команды. Технические примеры полезны, но акцент делают на ваших
действиях и выводах.

</td></tr></table>

</details>

<details>
<summary>Почему кандидат тоже должен задавать вопросы команде?</summary><br>
<table><tr><td>

Интервью является двусторонней проверкой. Вопросы помогают понять задачи, процессы, качество обратной связи, ограничения
и риски проекта. Они также показывают, что кандидат осознанно выбирает среду, а не просто пытается получить любое
предложение.

</td></tr></table>

</details>

<details>
<summary>Как подготовиться к знакомству с командой?</summary><br>
<table><tr><td>

Изучите продукт и описание роли, подготовьте рассказ о себе и два-три примера по STAR. Заранее сформулируйте ожидания от
задач, ответственности и взаимодействия. Подготовьте вопросы, ответы на которые действительно повлияют на ваше решение.

</td></tr></table>

</details>

<details>
<summary>Какие темы лучше заранее продумать перед встречей?</summary><br>
<table><tr><td>

Нужны примеры результата, сложного решения, конфликта, ошибки, обратной связи и работы при неполных требованиях. Полезно
определить сильные зоны, ограничения и цель следующего шага. Каждый пример должен показывать личный вклад, а не только
действия команды.

</td></tr></table>

</details>

<details>
<summary>Как понять, что команда вам подходит?</summary><br>
<table><tr><td>

Сопоставьте реальные задачи, уровень автономности, темп, инженерные практики и стиль общения со своими ожиданиями.
Спросите, как выглядит обычная неделя и что считают успехом на испытательном сроке. Оценивайте конкретные ответы и
примеры, а не только общие обещания.

</td></tr></table>

</details>

<details>
<summary>Как понять, что ожидания команды и кандидата расходятся?</summary><br>
<table><tr><td>

Сигналы появляются, когда по-разному понимаются роль, приоритет скорости и качества, объем поддержки legacy или формат
коммуникации. Такие расхождения стоит проговорить прямо и проверить на примерах. Не каждое различие критично, но
замалчивать существенный конфликт ожиданий рискованно.

</td></tr></table>

</details>

### Самопрезентация

<details>
<summary>Как подготовить рассказ о себе на 5-7 минут?</summary><br>
<table><tr><td>

Соберите рассказ вокруг последнего релевантного опыта, сильных зон и результатов. Оставьте только факты, которые
помогают понять ваш уровень и пользу для этой роли. Проговорите текст вслух и сократите детали, не влияющие на вывод.

</td></tr></table>

</details>

<details>
<summary>Какая структура самопрезентации подходит frontend-разработчику?</summary><br>
<table><tr><td>

Структура самопрезентации:

1. Кто я и какая у меня основная роль.
2. В каких проектах и доменах работал.
3. Какие две-три сильные технические зоны у меня есть.
4. Какие результаты или улучшения я делал.
5. Что мне интересно дальше.
6. Почему мой опыт может быть полезен этой команде.

</td></tr></table>

</details>

<details>
<summary>Что стоит рассказать о последних двух-трех годах опыта?</summary><br>
<table><tr><td>

Выберите один-два проекта и объясните масштаб, свою ответственность, ключевые ограничения и результат. Для frontend
полезны примеры архитектуры, UI libraries, performance, testing, delivery и взаимодействия с продуктом. Перечень
технологий без контекста дает мало информации.

</td></tr></table>

</details>

<details>
<summary>Как рассказать о себе, если опыт большой, но кажется разрозненным?</summary><br>
<table><tr><td>

Сгруппируйте опыт по устойчивым темам: продуктовая разработка, design systems, качество, инфраструктура или лидерство
без people management. Покажите, как менялась глубина ответственности. Не нужно перечислять каждое место работы по
порядку.

</td></tr></table>

</details>

<details>
<summary>Как не пересказывать всю биографию на интервью?</summary><br>
<table><tr><td>

Связывайте каждый фрагмент с вакансией и пропускайте детали, которые не меняют оценку опыта. Удобная формула: контекст,
роль, результат, вывод. Полную хронологию интервьюер при необходимости уточнит сам.

</td></tr></table>

</details>

<details>
<summary>Какие две-три сильные зоны стоит выделить в самопрезентации?</summary><br>
<table><tr><td>

Выбирайте зоны, подтвержденные примерами и полезные команде: Angular architecture, reusable UI, testing, performance,
migration или DX. Для каждой подготовьте один результат. Общие качества вроде ответственности раскрывайте через
поведение, а не ярлык.

</td></tr></table>

</details>

<details>
<summary>Как связать свой опыт с задачами новой команды?</summary><br>
<table><tr><td>

Сопоставьте требования роли с похожими проблемами, которые уже решали. Объясните, что сможете применить сразу, а где
потребуется изучить контекст. Не обещайте точное решение до знакомства с системой.

</td></tr></table>

</details>

<details>
<summary>Как завершить самопрезентацию?</summary><br>
<table><tr><td>

Коротко назовите следующий профессиональный интерес и пользу для команды, затем предложите уточнить детали. Например:

> Я frontend-разработчик с опытом в Angular, UI libraries, design systems, tooling и testing. В последние годы больше
> работал с компонентными библиотеками, качеством кода, DX и переиспользуемыми решениями. Мне интересны задачи, где
> нужно не только написать экран, но и создать надежную основу для других разработчиков. В новой команде я могу быть
> полезен в frontend architecture, UI consistency, тестировании, миграциях и улучшении developer experience.

</td></tr></table>

</details>

### STAR-подход

<details>
<summary>Что такое STAR-подход?</summary><br>
<table><tr><td>

STAR структурирует пример через Situation, Target, Action и Result: контекст, цель, собственные действия и итог. Иногда
вторую часть называют Task, смысл остается тем же. Подход помогает отделить личный вклад от общей истории проекта.

</td></tr></table>

</details>

<details>
<summary>Когда использовать STAR на интервью?</summary><br>
<table><tr><td>

STAR полезен для вопросов о решениях, конфликтах, ошибках, влиянии и работе с неопределенностью. Для короткого
фактического вопроса полная схема не нужна. Ответ обычно занимает две-три минуты, после чего интервьюер уточняет детали.

</td></tr></table>

</details>

<details>
<summary>Почему STAR помогает отвечать структурно?</summary><br>
<table><tr><td>

Схема не дает застрять в длинном описании проекта и заставляет назвать результат. Она показывает связь между
ограничениями, действиями и последствиями. Интервьюеру проще оценить уровень самостоятельности и повторяемость опыта.

</td></tr></table>

</details>

<details>
<summary>Как выбрать пример для STAR-ответа?</summary><br>
<table><tr><td>

Берите недавнюю ситуацию, где понятны ваша роль, сложность выбора и результат. Пример должен быть достаточно конкретным,
но не требовать десятиминутного объяснения домена. Лучше честный небольшой результат, чем громкий проект без личного
вклада.

</td></tr></table>

</details>

<details>
<summary>Какие ошибки часто делают в STAR-ответах?</summary><br>
<table><tr><td>

Часто слишком долго описывают Situation, говорят только «мы», пропускают альтернативы или не называют Result. Еще одна
ошибка — выдавать за результат сам факт написания кода. Покажите изменение для пользователя, команды, надежности или
скорости работы.

</td></tr></table>

</details>

<details>
<summary>Как отвечать, если сложно вспомнить результат в цифрах?</summary><br>
<table><tr><td>

Не придумывайте метрики. Назовите наблюдаемый эффект: исчез класс регрессий, сократилось число ручных шагов, упростился
API или решение приняли другие команды. Уточните, как сейчас измерили бы результат точнее.

</td></tr></table>

</details>

<details>
<summary>Как выглядит STAR-пример для frontend-разработчика?</summary><br>
<table><tr><td>

**Situation:** в проекте были нестабильные UI-компоненты и много ручных проверок перед релизом.

**Target:** снизить число регрессий и упростить поддержку компонентов.

**Action:** я добавил тестовые сценарии, упростил структуру компонентов, согласовал правила review и вынес повторяющиеся
решения в utilities.

**Result:** ошибки стали находить раньше, изменения стало проще проверять, а поддержка UI стала предсказуемее.

</td></tr></table>

</details>

### Мотивация и цели

<details>
<summary>Почему вы рассматриваете новую команду или компанию?</summary><br>
<table><tr><td>

Ответ лучше строить от следующей задачи, а не от критики текущего места. Назовите желаемый масштаб, тип ответственности
или инженерную среду и свяжите их с вакансией. Причины ухода можно описать спокойно и без обвинений.

</td></tr></table>

</details>

<details>
<summary>Какие задачи вам интересны?</summary><br>
<table><tr><td>

Конкретизируйте тип проблем: сложные интерфейсы, Angular architecture, design system, performance, testing или tooling.
Объясните, почему они интересны и какой опыт уже есть. «Люблю сложные задачи» без примера звучит абстрактно.

</td></tr></table>

</details>

<details>
<summary>Что вас мотивирует в работе?</summary><br>
<table><tr><td>

Практичный ответ связывает мотивацию с видимым результатом, понятной ответственностью, качеством и развитием
компетенции. Полезно назвать условия, при которых мотивация сохраняется в рутинных задачах. Не обязательно стремиться к
people management, чтобы хотеть большего влияния.

</td></tr></table>

</details>

<details>
<summary>Что для вас важно в проекте и команде?</summary><br>
<table><tr><td>

Можно назвать понятные цели продукта, техническое качество, прозрачные приоритеты и безопасное обсуждение проблем.
Расставьте два-три приоритета, потому что идеальной среды не бывает. Объясните, какие компромиссы приемлемы.

</td></tr></table>

</details>

<details>
<summary>Какие задачи вам неинтересны?</summary><br>
<table><tr><td>

Не обесценивайте необходимую работу. Лучше назвать долгосрочный перекос, например роль только из ручной поддержки без
развития и ownership. Покажите готовность закрывать рутину, если понятны ее цель и доля.

</td></tr></table>

</details>

<details>
<summary>В какой роли вы видите себя в команде?</summary><br>
<table><tr><td>

Опишите уровень ownership и тип вклада: вести frontend feature, развивать платформенные решения, улучшать качество или
помогать коллегам. Отделяйте техническое влияние от формального управления людьми. Свяжите роль с потребностями
вакансии.

</td></tr></table>

</details>

<details>
<summary>Какие профессиональные цели у вас на ближайший год?</summary><br>
<table><tr><td>

Цель должна содержать область, практику и проверяемый результат. Например: углубить browser performance, провести
измерение на продукте и довести одно улучшение до production. Оставьте место для корректировки после знакомства с
командой.

</td></tr></table>

</details>

<details>
<summary>Какие зоны вы хотите развивать и что вам сейчас нужно подтянуть?</summary><br>
<table><tr><td>

Назовите реальный разрыв без самообесценивания и план работы с ним. Формула: меньше опыта в X, поэтому делаю Y и
проверяю прогресс через Z. Не маскируйте сильную сторону под искусственную слабость.

</td></tr></table>

</details>

<details>
<summary>Как вы понимаете, что работа вам подходит?</summary><br>
<table><tr><td>

Смотрите на содержание обычной недели, качество решений, возможность влиять и устойчивость темпа. Сверяйте это со своими
приоритетами после интервью и испытательного периода. Название роли само по себе мало что гарантирует.

</td></tr></table>

</details>

<details>
<summary>Что для вас важнее: стабильность, рост, интересные задачи или влияние на продукт?</summary><br>
<table><tr><td>

Расставьте приоритеты и объясните зависимость от этапа карьеры. Можно ценить несколько факторов, но стоит назвать
минимально необходимые условия и допустимые компромиссы. Ответ «одинаково важно все» не показывает способ выбора.

</td></tr></table>

</details>

<details>
<summary>Как отвечать про зарплатные ожидания?</summary><br>
<table><tr><td>

Заранее изучите рынок и назовите обоснованный диапазон с учетом роли, ответственности, формата и полного compensation
package. Можно сначала уточнить бюджет позиции. Не нужно оправдываться за ожидания или называть случайную сумму без
контекста.

</td></tr></table>

</details>

### Вклад в проект

<details>
<summary>Какой вклад вы можете принести нашей команде?</summary><br>
<table><tr><td>

Свяжите сильные стороны с проблемами вакансии и подтвердите похожим опытом. Не обещайте переделать систему до знакомства
с контекстом. Опишите пользу первых месяцев и более долгий вклад.

</td></tr></table>

</details>

<details>
<summary>Какие ваши навыки будут полезны проекту?</summary><br>
<table><tr><td>

Назовите две-три области: Angular, component API, design systems, testing, migration, performance или DX. Для каждой
покажите ситуацию, где навык изменил результат. Список технологий без применения менее убедителен.

</td></tr></table>

</details>

<details>
<summary>Как вы понимаете, где можете быть полезны?</summary><br>
<table><tr><td>

Сначала узнаю цели, bottlenecks и стоимость текущих проблем у команды и пользователей. Затем ищу пересечение со своим
опытом и проверяю гипотезу небольшим улучшением. Локальная техническая красота не всегда является главным приоритетом.

</td></tr></table>

</details>

<details>
<summary>Как вы обычно находите точки улучшения в проекте?</summary><br>
<table><tr><td>

Смотрю на повторяющиеся ошибки, время delivery, сложные API, flaky tests, incidents и обратную связь разработчиков.
Сравниваю частоту и влияние проблемы со стоимостью изменения. Улучшение должно иметь владельца и способ проверить
эффект.

</td></tr></table>

</details>

<details>
<summary>Как рассказать об улучшении качества кода или технического долга?</summary><br>
<table><tr><td>

Используйте STAR: покажите риск, ограничения, выбранный безопасный шаг и результат. Важно объяснить, почему долг стоило
закрывать именно тогда. Хороший итог — меньше дефектов, проще изменение или удаленный источник сложности.

</td></tr></table>

</details>

<details>
<summary>Как рассказать об улучшении developer experience?</summary><br>
<table><tr><td>

Опишите конкретную потерю времени: нестабильную сборку, ручную генерацию, непонятный component API или долгий feedback
loop. Покажите измерение до и после или наблюдаемый эффект. Учитывайте поддержку инструмента после внедрения.

</td></tr></table>

</details>

<details>
<summary>Как вы помогали команде ускориться?</summary><br>
<table><tr><td>

Ускорение может дать не только оптимизация кода, но и меньшие PR, шаблоны, автоматические проверки, документация и
снятие повторяющихся блокировок. Важно не переносить стоимость на QA или production incidents. Назовите устойчивый
эффект, а не разовый рывок.

</td></tr></table>

</details>

<details>
<summary>Как рассказать о решении, которым пользовались другие разработчики?</summary><br>
<table><tr><td>

Объясните, как изучили потребности потребителей, спроектировали API, документацию, migration path и поддержку. Adoption
является важнее самого факта публикации библиотеки. Упомяните обратную связь и изменения после первых пользователей.

</td></tr></table>

</details>

<details>
<summary>Как оценивать влияние своей работы?</summary><br>
<table><tr><td>

Выберите метрики, соответствующие цели: ошибки, latency, conversion, время сборки, число ручных шагов или adoption.
Дополните цифры качественной обратной связью и проверкой побочных эффектов. Не приписывайте себе результат, на который
повлияло много факторов.

</td></tr></table>

</details>

<details>
<summary>Как сформулировать общий ответ о пользе?</summary><br>
<table><tr><td>

Я стараюсь приносить пользу не только закрытием задач, но и улучшением среды разработки: API компонентов, тестов,
документации, tooling и стабильности сборки. Такие изменения ускоряют следующую работу и уменьшают стоимость поддержки.
Приоритет выбираю по реальной боли команды и продукта.

</td></tr></table>

</details>

### Технологический кругозор

<details>
<summary>Какие технологии вы использовали в последних проектах?</summary><br>
<table><tr><td>

Перечислите только ключевой stack и сразу поясните роль каждой технологии. Отделите ежедневный production-опыт от
знакомства в pet project. Укажите версии или ограничения, если они важны для вывода.

</td></tr></table>

</details>

<details>
<summary>В чем вы считаете себя сильным специалистом?</summary><br>
<table><tr><td>

Выберите область, где можете самостоятельно диагностировать сложные проблемы, принимать решения и помогать другим.
Подтвердите это несколькими разными ситуациями. Уверенность должна опираться на опыт, а не на широту терминов.

</td></tr></table>

</details>

<details>
<summary>В каких темах вы чувствуете себя менее уверенно?</summary><br>
<table><tr><td>

Назовите релевантную границу опыта и то, как снижаете риск: документация, консультация, prototype или review
специалиста. Не нужно изображать эксперта во всем. Важно показать способность учиться и вовремя привлекать помощь.

</td></tr></table>

</details>

<details>
<summary>Как вы изучаете новую технологию?</summary><br>
<table><tr><td>

Начинаю с задачи и официальной документации, затем собираю небольшой prototype и проверяю ключевые ограничения. После
этого сравниваю решение с текущим stack по поддержке, производительности и стоимости миграции. Tutorial является
стартом, а не доказательством production readiness.

</td></tr></table>

</details>

<details>
<summary>Как вы подходите к решению технической задачи?</summary><br>
<table><tr><td>

Уточняю ожидаемое поведение и ограничения, локализую неизвестность, рассматриваю несколько вариантов и проверяю самый
рискованный вопрос. Затем выбираю минимальное поддерживаемое решение и способ верификации. Для важного решения фиксирую
допущения.

</td></tr></table>

</details>

<details>
<summary>Как вы выбираете между несколькими техническими решениями?</summary><br>
<table><tr><td>

Сравниваю соответствие требованиям, сложность, риски, опыт команды, observability, migration и обратимость. Критерии
формулирую до спора о любимых инструментах. При высокой неопределенности делаю ограниченный prototype.

</td></tr></table>

</details>

<details>
<summary>Как вы понимаете trade-offs решения?</summary><br>
<table><tr><td>

У каждого варианта ищу выигрыш, цену сейчас, долгосрочную стоимость и условия, при которых выбор перестанет быть верным.
Учитываю не только runtime, но и обучение, debugging, deployment и поддержку. Trade-off должен быть связан с целью
проекта.

</td></tr></table>

</details>

<details>
<summary>Как вы объясняете техническое решение команде?</summary><br>
<table><tr><td>

Начинаю с проблемы и критериев, затем показываю варианты, последствия и рекомендацию. Отделяю факты, измерения и
допущения. Для сложного решения полезны короткий документ, схема или prototype.

</td></tr></table>

</details>

<details>
<summary>Как вы проверяете, что решение надежное?</summary><br>
<table><tr><td>

Проверяю happy path, ошибки, edge cases, нагрузку и observability в масштабе риска. Использую тесты, review, измерения и
постепенный rollout. Надежность включает возможность быстро обнаружить проблему и откатиться.

</td></tr></table>

</details>

<details>
<summary>Как вы решаете, делать быстро или архитектурно правильно?</summary><br>
<table><tr><td>

Это не всегда противоположности: сначала ищу простое решение, которое сохраняет важные границы и обратимость. Согласую
срок, риск и ожидаемый срок жизни кода. Осознанный временный компромисс фиксирую с условием пересмотра.

</td></tr></table>

</details>

<details>
<summary>Как вы относитесь к новым технологиям?</summary><br>
<table><tr><td>

С интересом, но без автоматического внедрения. Проверяю, какую проблему технология решает лучше текущего подхода,
насколько она стабильна и кто будет ее поддерживать. Новизна сама по себе не является ценностью.

</td></tr></table>

</details>

<details>
<summary>Как понять, что технология не нужна проекту?</summary><br>
<table><tr><td>

Если нет измеримой проблемы, выгода меньше migration и support cost или команда не сможет безопасно владеть решением,
внедрение стоит отложить. Полезно сравнить с улучшением существующего stack. Отказ от технологии тоже является
техническим решением.

</td></tr></table>

</details>

### Принятие решений

<details>
<summary>Как рассказать о сложном техническом решении?</summary><br>
<table><tr><td>

Опишите контекст, варианты, критерии, собственную роль и итог по STAR. Сложность может быть не в алгоритме, а в
ограничениях миграции, совместимости или риске для пользователей. Покажите, что было неизвестно на момент выбора.

</td></tr></table>

</details>

<details>
<summary>Какие критерии использовать при выборе решения?</summary><br>
<table><tr><td>

Учитывайте требования, сроки, безопасность, надежность, производительность, поддержку, опыт команды и обратимость.
Приоритет критериев зависит от задачи. Зафиксируйте, какие ограничения являются обязательными, а какие желательными.

</td></tr></table>

</details>

<details>
<summary>Как обсуждать решение с командой?</summary><br>
<table><tr><td>

Разошлите контекст заранее, сформулируйте варианты и открытые вопросы, затем соберите возражения. Не защищайте первый
вариант как личную позицию. Итог и причины решения нужно сделать доступными тем, кто не участвовал во встрече.

</td></tr></table>

</details>

<details>
<summary>Был ли случай, когда вы поменяли свое решение после обсуждения?</summary><br>
<table><tr><td>

Хороший пример показывает не слабость, а способность обновлять мнение при новых данных. Назовите аргумент или
эксперимент, который изменил выбор, и результат. Не нужно делать вид, что правильный ответ всегда был очевиден.

</td></tr></table>

</details>

<details>
<summary>Как вы действуете, если не уверены в правильном решении?</summary><br>
<table><tr><td>

Явно называю неопределенность, проверяю самый дорогой риск и ищу мнение людей с релевантным опытом. Выбираю обратимый
шаг или prototype. Для необратимого решения повышаю уровень проверки и согласования.

</td></tr></table>

</details>

<details>
<summary>Как принимать решение при неполной информации?</summary><br>
<table><tr><td>

Фиксирую известные факты, допущения и deadline решения. Собираю информацию до точки, где ее стоимость выше ожидаемой
пользы, затем выбираю безопасный вариант. Заранее определяю сигнал и дату пересмотра.

</td></tr></table>

</details>

<details>
<summary>Как балансировать качество, сроки и риски?</summary><br>
<table><tr><td>

Сначала защищаю обязательные свойства: корректность, безопасность и критическую надежность. Остальной scope делю на
необходимый сейчас и улучшаемый позже. Компромисс должен быть видим владельцам продукта, а не спрятан в коде.

</td></tr></table>

</details>

<details>
<summary>Как фиксировать важные технические решения?</summary><br>
<table><tr><td>

Для значимого выбора подходит короткий ADR: контекст, варианты, решение, последствия и дата. Документ должен быть
доступным и обновляться при изменении условий. Мелкое локальное решение не требует формальной церемонии.

</td></tr></table>

</details>

<details>
<summary>Что делать, если команда не согласна с вашим решением?</summary><br>
<table><tr><td>

Уточнить критерии расхождения, проверить данные и предложить эксперимент или ограниченный rollout. Если решение принято
ответственным участником и не создает критический риск, команда его поддерживает. Итог стоит зафиксировать без
продолжения скрытого спора.

</td></tr></table>

</details>

<details>
<summary>Как понять, что решение стоит пересмотреть?</summary><br>
<table><tr><td>

Сигналы: изменились требования, не выполняются метрики, растет стоимость поддержки или исходное допущение оказалось
ложным. Полезно заранее определить такие условия. Пересмотр не означает, что первое решение было ошибкой в прежнем
контексте.

</td></tr></table>

</details>

<details>
<summary>Как сформулировать общий принцип принятия решений?</summary><br>
<table><tr><td>

Хорошее решение учитывает не только красоту архитектуры, но и сроки, риски, поддержку, опыт команды и возможность
безопасно изменить выбор позже. При недостатке данных полезны явные допущения, prototype и точка пересмотра. Цель —
управляемый результат, а не идеальная схема.

</td></tr></table>

</details>

### Работа в условиях неопределенности

<details>
<summary>Как вы действуете, когда задача плохо описана?</summary><br>
<table><tr><td>

Сначала формулирую цель, пользователя и ожидаемый результат своими словами. Затем выписываю неизвестные условия и
предлагаю минимальные acceptance criteria. Не начинаю дорогую реализацию, пока не согласованы решения с высокой
стоимостью изменения.

</td></tr></table>

</details>

<details>
<summary>Что вы делаете, если требований недостаточно?</summary><br>
<table><tr><td>

Задаю конкретные вопросы с вариантами и последствиями, а не прошу «уточнить все». Отделяю блокирующую информацию от
деталей, которые можно решить безопасным default. Договоренности фиксирую в задаче.

</td></tr></table>

</details>

<details>
<summary>Как вы уточняете ожидания у команды или заказчика?</summary><br>
<table><tr><td>

Показываю сценарии пользователя, границы scope, примеры и критерии готовности. Пересказываю итог, чтобы обнаружить
разное понимание. Для спорного UI полезны prototype или макет с несколькими состояниями.

</td></tr></table>

</details>

<details>
<summary>Как вы работаете, если сроки меняются?</summary><br>
<table><tr><td>

Быстро пересчитываю scope, зависимости и риски, затем предлагаю варианты: уменьшить объем, изменить порядок или привлечь
помощь. Не обещаю сохранить все параметры одновременно. Новый план и исключенные части фиксирую явно.

</td></tr></table>

</details>

<details>
<summary>Как действовать при неполной информации?</summary><br>
<table><tr><td>

Выбираю обратимый шаг, ставлю ограничение по времени на исследование и собираю feedback как можно раньше. Критичные
допущения делаю видимыми. Для high-risk решения запрашиваю дополнительную проверку.

</td></tr></table>

</details>

<details>
<summary>Как рассказать об изменившихся условиях задачи?</summary><br>
<table><tr><td>

Используйте STAR и покажите, как обнаружили изменение, пересобрали план и сообщили последствия. Важно не только успешно
адаптироваться, но и защитить команду от скрытого scope growth. Назовите итог и урок для следующего планирования.

</td></tr></table>

</details>

<details>
<summary>Как снижать риски в неопределенной задаче?</summary><br>
<table><tr><td>

Декомпозирую по рискам, сначала проверяю неизвестные интеграции и делаю маленькие вертикальные slices. Добавляю
observability, fallback и возможность rollback. Регулярно сверяю промежуточный результат с владельцем задачи.

</td></tr></table>

</details>

<details>
<summary>Как декомпозировать непонятную задачу?</summary><br>
<table><tr><td>

Разделяю discovery, обязательные user flows, integrations, edge cases и delivery. Каждый шаг должен давать проверяемый
результат или новую информацию. Если часть остается туманной, выделяю ее как отдельный риск, а не прячу в общей оценке.

</td></tr></table>

</details>

<details>
<summary>Когда задавать вопросы, а когда начинать с прототипа?</summary><br>
<table><tr><td>

Вопрос нужен, если решение зависит от продуктового намерения или чужой зоны ответственности. Prototype полезен, когда
ответ проще получить проверкой технической гипотезы. Часто лучший ход — задать узкий вопрос и параллельно проверить
обратимую часть.

</td></tr></table>

</details>

<details>
<summary>Как сообщать о рисках заранее?</summary><br>
<table><tr><td>

Сообщаю факт, вероятность и влияние, а затем предлагаю варианты действий и момент следующего обновления. Не жду полной
уверенности, если задержка уже может повлиять на план. Риск без контекста пугает, а риск с вариантами помогает принять
решение.

</td></tr></table>

</details>

<details>
<summary>Что делать, если вы не успеваете к дедлайну?</summary><br>
<table><tr><td>

Сообщите о риске сразу после его обнаружения, покажите причину и оставшийся объем. Предложите варианты: сократить scope,
изменить порядок, перенести часть или привлечь помощь. Скрытая задержка до последнего обычно опаснее исходной ошибки
оценки.

</td></tr></table>

</details>

<details>
<summary>Как оценивать время для нескольких задач?</summary><br>
<table><tr><td>

Декомпозируйте работу, учтите зависимости, review, testing и неизвестность, затем согласуйте приоритеты. Оценку лучше
давать диапазоном и обновлять при новых данных. Ограничение work in progress уменьшает потери на context switching.

</td></tr></table>

</details>

### Команда и процессы

<details>
<summary>Как рассказать, в каких командах вы работали?</summary><br>
<table><tr><td>

Опишите размер, роли, распределение ответственности и способ delivery. Затем поясните свою позицию и изменения, которые
пришлось учитывать. Название процесса менее важно, чем реальная работа команды.

</td></tr></table>

</details>

<details>
<summary>Какие процессы вам нравились и какие мешали?</summary><br>
<table><tr><td>

Оценивайте процесс по проблеме, которую он решал, и стоимости для команды. Приведите пример полезного короткого feedback
loop и пример церемонии без результата. Покажите, как предлагали улучшение, а не только жаловались.

</td></tr></table>

</details>

<details>
<summary>Как обычно должна быть устроена постановка задач?</summary><br>
<table><tr><td>

Нужны цель, пользовательский результат, ограничения, acceptance criteria и доступ к владельцу решений. Технические
детали команда уточняет во время refinement. Размер описания зависит от риска, но ключевые договоренности не должны жить
только в разговоре.

</td></tr></table>

</details>

<details>
<summary>Как вы участвуете в code review?</summary><br>
<table><tr><td>

Проверяю корректность, edge cases, тесты, безопасность, accessibility и влияние на архитектуру. Комментарий связываю с
последствием и отмечаю, является ли он обязательным. Стиль и простые ошибки лучше автоматизировать.

</td></tr></table>

</details>

<details>
<summary>Как подготовить pull request к review?</summary><br>
<table><tr><td>

Делаю PR небольшим и цельным, проверяю diff, тесты и generated files. В описании указываю проблему, решение, способ
проверки, риски и screenshots для UI. Отдельно отмечаю спорные места, где нужен взгляд reviewer.

</td></tr></table>

</details>

<details>
<summary>Что для вас хороший pull request?</summary><br>
<table><tr><td>

Он решает одну понятную задачу, не содержит случайного refactoring и позволяет проверить поведение. Названия и описание
дают контекст, CI зеленый, а review не требует восстанавливать замысел по коду. Большое изменение разбито по безопасным
этапам.

</td></tr></table>

</details>

<details>
<summary>Как вы относитесь к daily, planning и retrospective?</summary><br>
<table><tr><td>

Церемония полезна, если помогает синхронизировать зависимости, принять решение или улучшить процесс. Daily не должен
превращаться в отчет одному человеку, planning — в ложную точность, retrospective — в список без владельцев. Формат
следует менять по потребности команды.

</td></tr></table>

</details>

<details>
<summary>Как взаимодействовать с дизайнерами и backend-разработчиками?</summary><br>
<table><tr><td>

С дизайнером заранее обсуждаю states, responsive, accessibility и ограничения компонентов. С backend согласую contract,
ошибки, versioning и observability. Ранний совместный prototype дешевле конфликтов в конце разработки.

</td></tr></table>

</details>

<details>
<summary>Что делать со сложным для реализации макетом?</summary><br>
<table><tr><td>

Уточните цель дизайна и покажите ограничения, accessibility, responsive risks и стоимость вариантов. Не стоит молча
упрощать макет или сразу говорить, что он невозможен. Небольшой prototype помогает совместно выбрать приемлемый
trade-off.

</td></tr></table>

</details>

<details>
<summary>Как взаимодействовать с аналитиками и QA?</summary><br>
<table><tr><td>

С аналитиком проверяю сценарии, данные и неоднозначные правила, с QA — риски, test strategy и диагностируемость.
Подключаю их до завершения кода, особенно для сложных flows. Качество не передается QA как отдельная финальная стадия.

</td></tr></table>

</details>

<details>
<summary>Что значит хорошая командная работа?</summary><br>
<table><tr><td>

Участники понимают общую цель, делают риски видимыми, выполняют договоренности и спокойно запрашивают помощь. Ownership
не означает одиночную работу. Успех команды важнее локальной оптимизации роли.

</td></tr></table>

</details>

<details>
<summary>Как помогать новым людям и делиться знаниями?</summary><br>
<table><tr><td>

Даю рабочий onboarding path, небольшой первый результат, контекст решений и человека для вопросов. Знания фиксирую в
документации, примерах, review и коротких обсуждениях. Проверяю, что материал реально помогает выполнить задачу.

</td></tr></table>

</details>

<details>
<summary>Что такое хорошее code review?</summary><br>
<table><tr><td>

Это проверка качества решения, а не поиск виноватого. Reviewer смотрит на читаемость, edge cases, тесты, архитектуру и
договоренности команды. Хороший комментарий конкретен, уважителен и объясняет причину замечания.

</td></tr></table>

</details>

### Коммуникация и конфликты

<details>
<summary>Какой стиль коммуникации для вас комфортен?</summary><br>
<table><tr><td>

Предпочитаю прозрачные асинхронные договоренности, доступность для вопросов и отдельное focus time. Для сложного или
эмоционального вопроса быстрее коротко поговорить и затем записать итог. Готов адаптироваться к разумному ритму команды.

</td></tr></table>

</details>

<details>
<summary>Что в коммуникации для вас сложно?</summary><br>
<table><tr><td>

Назовите конкретную ситуацию, а не ярлык характера, и способ компенсации. Например, при большом числе параллельных
обсуждений полезно фиксировать решения и приоритеты письменно. Ответ должен показывать самонаблюдение и прогресс.

</td></tr></table>

</details>

<details>
<summary>Как вы просите помощи?</summary><br>
<table><tr><td>

Сначала локализую проблему и собираю контекст: ожидание, фактическое поведение и уже проверенные гипотезы. Затем
обращаюсь к человеку с релевантным опытом и формулирую конкретный вопрос. Не жду часами без прогресса и не перекладываю
задачу целиком.

</td></tr></table>

</details>

<details>
<summary>Как сообщать о проблемах или рисках?</summary><br>
<table><tr><td>

Сообщаю рано, без драматизации и сокрытия. Описываю влияние, срочность, известные факты, варианты и следующую точку
обновления. Для production incident важнее общий канал статуса, чем множество личных сообщений.

</td></tr></table>

</details>

<details>
<summary>Как объяснить техническую проблему не-техническому специалисту?</summary><br>
<table><tr><td>

Начните с влияния на пользователя, сроки или бизнес-риск, а внутренние термины оставьте для деталей. Затем предложите
варианты с понятными последствиями. Проверьте, что собеседник понял решение, а не только услышал упрощенную метафору.

</td></tr></table>

</details>

<details>
<summary>Как действовать в конфликтной ситуации?</summary><br>
<table><tr><td>

Отделяю человека от проблемы, уточняю интересы сторон и возвращаю разговор к наблюдаемым фактам. Сначала стараюсь
обсудить вопрос напрямую и спокойно. Если затронуты безопасность или рабочая среда, подключаю руководителя или
подходящий процесс.

</td></tr></table>

</details>

<details>
<summary>Как рассказать о сложном обсуждении с коллегой?</summary><br>
<table><tr><td>

Используйте STAR и выберите пример с реальным разногласием, а не искусственным конфликтом. Покажите, как слушали, какие
критерии предложили и чем завершилось обсуждение. Важен вывод, который улучшил следующую коммуникацию.

</td></tr></table>

</details>

<details>
<summary>Что делать, если вы не согласны с решением команды?</summary><br>
<table><tr><td>

Формулирую риск и альтернативу с trade-offs, затем проверяю, услышаны ли аргументы. После принятого решения поддерживаю
его, если нет критического legal, security или reliability риска. При необходимости фиксирую условие пересмотра.

</td></tr></table>

</details>

<details>
<summary>Как спорить о техническом решении?</summary><br>
<table><tr><td>

Сравнивать требования, риски, стоимость поддержки, сроки, тестируемость и влияние на пользователя. Если данных мало,
полезен experiment или benchmark. Цель спора — лучшее решение, а не победа автора идеи.

</td></tr></table>

</details>

<details>
<summary>Как реагировать, если ваше решение критикуют?</summary><br>
<table><tr><td>

Сначала уточняю конкретную проблему и отделяю форму сообщения от полезного содержания. Проверяю аргумент и меняю решение
при новых данных. Если тон мешает работе, обсуждаю это отдельно, не смешивая с техническим вопросом.

</td></tr></table>

</details>

<details>
<summary>Как сохранять нейтральность и что делать, если конфликт стал личным?</summary><br>
<table><tr><td>

Не приписываю мотивы и использую конкретные события, влияние и ожидаемое поведение. Предлагаю паузу и разговор один на
один, если это безопасно. При повторении личных выпадов подключаю руководителя, потому что это уже вопрос рабочей среды.

</td></tr></table>

</details>

<details>
<summary>Как действовать, если вас не слышат?</summary><br>
<table><tr><td>

Проверяю, понятны ли влияние и срочность, фиксирую позицию письменно и обращаюсь к владельцу решения. Для существенного
риска использую принятую escalation path. Повторять один аргумент громче обычно менее эффективно, чем изменить форму
доказательства.

</td></tr></table>

</details>

<details>
<summary>Как сформулировать общий подход к конфликту?</summary><br>
<table><tr><td>

В техническом споре важно отделять человека от решения. Я обсуждаю требования, риски, стоимость поддержки, сроки и
влияние на пользователей. Если спор заходит в тупик, фиксирую варианты и предлагаю эксперимент или ответственного за
финальный выбор.

</td></tr></table>

</details>

### Обратная связь

<details>
<summary>Как вы принимаете обратную связь?</summary><br>
<table><tr><td>

Сначала стараюсь понять конкретное наблюдение и влияние, не отвечая защитно. Уточняю примеры и ожидаемое изменение,
затем решаю, какое действие проверить. Позже возвращаюсь с результатом, если тема существенная.

</td></tr></table>

</details>

<details>
<summary>Как вы даете обратную связь?</summary><br>
<table><tr><td>

Выбираю подходящее время и говорю о наблюдаемом поведении, его влиянии и желаемом следующем шаге. Критику личности и
публичное унижение исключаю. Положительный feedback также делаю конкретным.

</td></tr></table>

</details>

<details>
<summary>Как реагировать на резкий feedback?</summary><br>
<table><tr><td>

Отделяю содержание от неудачной формы и беру паузу, если разговор стал эмоциональным. Уточняю факты, а тон обсуждаю
отдельно и спокойно. Резкость не делает feedback автоматически верным или бесполезным.

</td></tr></table>

</details>

<details>
<summary>Как отличить полезную обратную связь от субъективного мнения?</summary><br>
<table><tr><td>

Проверяю наличие конкретного примера, связи с целью и возможности изменить поведение. Субъективное мнение тоже может
содержать сигнал, особенно если повторяется у разных людей. Важное решение не строю на одной расплывчатой оценке.

</td></tr></table>

</details>

<details>
<summary>Как менять работу после обратной связи?</summary><br>
<table><tr><td>

Формулирую одно наблюдаемое действие, срок и способ проверить прогресс. Например, раньше поднимать риски и сверять это
на one-to-one через месяц. Простого согласия с feedback недостаточно.

</td></tr></table>

</details>

<details>
<summary>Как рассказать, когда feedback помог улучшиться?</summary><br>
<table><tr><td>

По STAR покажите прежнее поведение, полученный сигнал, конкретное изменение и эффект. Не выбирайте пример, где feedback
ничего не изменил. Зрелый ответ не требует изображать исходную ошибку катастрофой.

</td></tr></table>

</details>

<details>
<summary>Как дать полезный feedback коллеге?</summary><br>
<table><tr><td>

Опирайтесь на ситуацию и влияние, спросите его взгляд и предложите совместный следующий шаг. Не ставьте диагноз и не
обобщайте через «всегда» или «никогда». Для серьезной темы оставьте человеку пространство ответить.

</td></tr></table>

</details>

<details>
<summary>Почему feedback лучше давать конкретно?</summary><br>
<table><tr><td>

Общие слова невозможно проверить и легко воспринимать как оценку личности. Конкретный пример объясняет, что произошло и
что можно изменить. Это снижает защитную реакцию и делает прогресс наблюдаемым.

</td></tr></table>

</details>

<details>
<summary>Что делать, если вы не согласны с feedback?</summary><br>
<table><tr><td>

Уточнить факты и ожидания, привести контекст и проверить, нет ли повторяющегося сигнала. Можно не согласиться с выводом,
но признать влияние на другого человека. Итоговую договоренность лучше зафиксировать.

</td></tr></table>

</details>

<details>
<summary>Как просить feedback у руководителя или команды?</summary><br>
<table><tr><td>

Запрашивать его регулярно и по конкретной области: review, коммуникация, ownership или качество решений. Вопрос «что мне
изменить, чтобы лучше вести feature?» дает больше пользы, чем «все нормально?». После ответа стоит показать, что вы с
ним сделали.

</td></tr></table>

</details>

<details>
<summary>Каким должен быть полезный feedback?</summary><br>
<table><tr><td>

Он конкретно описывает событие, влияние и возможное изменение. Если формулировка общая, нужно запросить пример и
ожидаемое поведение. Feedback помогает развитию только тогда, когда его можно превратить в действие.

</td></tr></table>

</details>

### Ошибки, ответственность и развитие

<details>
<summary>Как рассказать о своей ошибке на проекте?</summary><br>
<table><tr><td>

Выберите реальную ошибку, признайте свою часть и опишите влияние без оправданий. По STAR объясните исправление и
системный вывод. Не раскрывайте конфиденциальные детали и не перекладывайте ответственность на коллег.

</td></tr></table>

</details>

<details>
<summary>Как действовать после ошибки?</summary><br>
<table><tr><td>

Сначала остановить ущерб, сообщить статус и восстановить корректную работу. Затем найти причину, проверить исправление и
обновить заинтересованных людей. Разбор процесса идет после стабилизации.

</td></tr></table>

</details>

<details>
<summary>Что изменить, чтобы ошибка не повторилась?</summary><br>
<table><tr><td>

Выбирайте защиту, соответствующую причине: test, validation, monitoring, rollout, документацию или изменение review.
Формулировка «буду внимательнее» редко является надежной мерой. Проверьте, не создает ли защита лишнюю стоимость.

</td></tr></table>

</details>

<details>
<summary>Как относиться к production incidents?</summary><br>
<table><tr><td>

Спокойно приоритизировать влияние на пользователей, коммуникацию и восстановление. Во время incident не искать
виноватого и не делать несогласованные рискованные изменения. После восстановления нужен разбор и владельцы follow-up
действий.

</td></tr></table>

</details>

<details>
<summary>Как участвовать в разборе инцидентов?</summary><br>
<table><tr><td>

Собираю timeline и факты, отделяю непосредственную причину от условий системы и предлагаю ограниченный набор мер.
Хороший postmortem доступен команде и отслеживает выполнение действий. Цель — снизить вероятность или влияние
повторения.

</td></tr></table>

</details>

<details>
<summary>Что такое blameless postmortem?</summary><br>
<table><tr><td>

Это разбор, который изучает условия и решения в доступном на тот момент контексте, а не назначает виноватого. Blameless
не означает отсутствие ответственности или требований к поведению. Он помогает людям честно сообщать данные и улучшать
систему.

</td></tr></table>

</details>

<details>
<summary>Как вы понимаете свою ответственность в команде?</summary><br>
<table><tr><td>

Ownership означает понять результат, зависимости и риски, держать прозрачный статус и довести изменение до
согласованного Done. Это не обязанность делать все одному. Вовремя запросить помощь или эскалировать блокировку является
частью ответственности.

</td></tr></table>

</details>

<details>
<summary>Как понять, что задача готова?</summary><br>
<table><tr><td>

Проверьте acceptance criteria, основные и ошибочные сценарии, tests, accessibility, analytics и документацию, если они
нужны. Изменение должно пройти review и согласованный delivery pipeline. Done определяется командным Definition of Done,
а не только работой кода локально.

</td></tr></table>

</details>

<details>
<summary>Как планировать профессиональное развитие?</summary><br>
<table><tr><td>

Выбираю одну-две зоны на пересечении рабочих задач, интереса и следующего уровня ответственности. План включает
практику, feedback и результат, а не только чтение. Периодически пересматриваю цель по новым данным.

</td></tr></table>

</details>

<details>
<summary>Как выбирать, что учить дальше?</summary><br>
<table><tr><td>

Смотрю на повторяющиеся пробелы, задачи проекта и фундаментальные знания, которые расширяют число решаемых проблем. Не
следую каждому тренду. Предпочитаю тему, которую можно применить и получить feedback.

</td></tr></table>

</details>

<details>
<summary>Как оценивать свой уровень?</summary><br>
<table><tr><td>

Сравниваю не число технологий, а сложность задач, автономность, качество решений и влияние на команду. Использую
критерии роли, review результатов и feedback нескольких людей. Самооценка всегда имеет контекст конкретной компании.

</td></tr></table>

</details>

<details>
<summary>Что помогает расти как разработчику?</summary><br>
<table><tr><td>

Сложные, но посильные задачи, качественный review, наблюдение последствий своих решений и объяснение знаний другим.
Полезны первичные источники и регулярная практика. Рост требует времени на рефлексию, а не только большего объема задач.

</td></tr></table>

</details>

<details>
<summary>Как работать со слабыми зонами?</summary><br>
<table><tr><td>

Описываю конкретный навык и ситуации, где он мешает, затем выбираю маленькую практику и источник feedback. Отслеживаю
изменение поведения. Не пытаюсь одновременно исправить все и не превращаю зону роста в самооценку личности.

</td></tr></table>

</details>

<details>
<summary>Какой подход к ошибкам стоит показать на интервью?</summary><br>
<table><tr><td>

Важно не скрывать ошибку, а показать зрелую реакцию: признание, действия, результат и выводы. Сильный ответ
демонстрирует ответственность и улучшение процесса, а не поиск виноватых. Масштаб ошибки менее важен, чем качество
работы после нее.

</td></tr></table>

</details>

### Вопросы команде

Кандидату важно не только отвечать, но и задавать вопросы. Это помогает понять реальные ожидания, процессы, риски и то,
насколько команда подходит вам. Выберите пять-семь вопросов, которые влияют на ваше решение, а не задавайте весь список
механически.

<details>
<summary>О задачах и ожиданиях</summary><br>
<table><tr><td>

- Какие задачи я буду решать в первые один-три месяца?
- Какие ожидания от frontend-разработчика на старте?
- Что будет считаться успешным прохождением испытательного срока?
- Какая зона ответственности будет у меня в команде?
- Какие задачи сейчас самые приоритетные?
- Какие проблемы команда хочет решить в ближайшее время?

</td></tr></table>

</details>

<details>
<summary>О проекте и технологиях</summary><br>
<table><tr><td>

- Какие технологии используются в проекте и почему выбрали этот stack?
- Какие главные технические вызовы есть во frontend-части?
- Какой технический долг важно постепенно закрывать?
- Есть ли планы миграций или крупных изменений?
- Как команда принимает и фиксирует архитектурные решения?
- Как измеряют надежность и качество frontend?

</td></tr></table>

</details>

<details>
<summary>О процессах</summary><br>
<table><tr><td>

- Как проходит обычная неделя команды?
- Как устроены planning, daily, retrospective и review?
- Как проходит code review и сколько обычно занимает?
- Как часто происходят релизы?
- Как команда работает с incidents?
- Как планируется технический долг?

</td></tr></table>

</details>

<details>
<summary>О взаимодействии</summary><br>
<table><tr><td>

- Как frontend взаимодействует с backend, дизайнерами, аналитиками и QA?
- Как команда обсуждает спорные технические решения?
- Как принято просить помощь?
- Как устроен onboarding?
- Как распределяется ownership между участниками?
- Где фиксируются договоренности и знания?

</td></tr></table>

</details>

<details>
<summary>О росте и оценке</summary><br>
<table><tr><td>

- Как проходит performance review?
- Какие критерии роста у frontend-разработчика?
- Что помогает человеку хорошо встроиться в команду?
- Какие качества команда ценит в разработчиках?
- Какие ожидания есть от middle и senior?
- Можно ли развиваться как individual contributor без перехода в people management?

</td></tr></table>

</details>

<details>
<summary>О рисках и реальности проекта</summary><br>
<table><tr><td>

- Какие сложности есть в проекте сейчас?
- Что будет самым сложным для нового человека?
- Какие процессы работают неидеально?
- Что команда хотела бы улучшить?
- Почему открылась эта позиция?
- Что важно узнать о команде до принятия решения?

</td></tr></table>

</details>

### Чеклист подготовки к знакомству с командой

- Подготовить рассказ о себе на 5-7 минут.
- Выбрать два-три STAR-примера из опыта.
- Подготовить пример сложного технического решения.
- Подготовить пример конфликта или сложного обсуждения.
- Подготовить пример ошибки и выводов.
- Сформулировать свои сильные зоны.
- Сформулировать зоны развития без самообесценивания.
- Подготовить пять-семь вопросов будущей команде.
- Проверить, что ответы звучат конкретно, а не общими фразами.

## Angular

### Angular Core

#### DI + providers

<details>
<summary>Что такое provider и чем отличаются useClass, useValue, useFactory и useExisting?</summary><br>
<table><tr><td>

Provider связывает DI token со способом получения значения:

```ts
providers: [
  {provide: Logger, useClass: ConsoleLogger},
  {provide: API_URL, useValue: '/api'},
  {
    provide: APP_CONFIG,
    useFactory: () => createConfig(inject(EnvironmentService)),
  },
  {provide: AbstractLogger, useExisting: Logger},
];
```

- `useClass` создает экземпляр класса.
- `useValue` возвращает готовое значение.
- `useFactory` вычисляет dependency.
- `useExisting` создает alias на уже существующий instance.

`useClass` с двумя tokens создаст два instances, а `useExisting` — один общий.

</td></tr></table>

</details>

<details>
<summary>Что такое InjectionToken и когда он нужен?</summary><br>
<table><tr><td>

TypeScript interface отсутствует в runtime и не может быть DI token. `InjectionToken<T>` используют для конфигураций,
функций, primitives и абстрактных контрактов:

```ts
export interface AnalyticsConfig {
  readonly endpoint: string;
}

export const ANALYTICS_CONFIG = new InjectionToken<AnalyticsConfig>('ANALYTICS_CONFIG');
```

Описание токена должно быть уникальным и понятным. Для tree-shakable default можно передать `providedIn` и `factory`.

</td></tr></table>

</details>

<details>
<summary>Что такое inject() и injection context?</summary><br>
<table><tr><td>

`inject()` получает dependency без constructor parameter. Он работает только внутри injection context:

- field initializer или constructor создаваемого Angular class;
- provider factory;
- guard, resolver, interceptor;
- функция, запущенная через `runInInjectionContext()`.

```ts
export class UserStore {
  private readonly api = inject(UserApi);
}
```

Нельзя вызывать `inject()` позже в произвольном method или async callback. Для reusable helper можно использовать
`assertInInjectionContext()`.

</td></tr></table>

</details>

<details>
<summary>Как избежать circular dependency в Angular?</summary><br>
<table><tr><td>

Сначала проверяют архитектуру: циклическая DI или import-зависимость часто означает смешение ответственности.

Варианты исправления:

- вынести общий контракт или pure logic в более низкий слой;
- разделить API service, state service и orchestration facade;
- заменить двусторонние вызовы events/commands;
- использовать `InjectionToken`, если зависимость должна быть инвертирована;
- не лечить архитектурный цикл `forwardRef()` без необходимости.

Import cycles проверяют инструментами dependency graph и правилами ESLint/Nx.

</td></tr></table>

</details>

<details>
<summary>Как разделять API service, state service и facade?</summary><br>
<table><tr><td>

- API service знает HTTP DTO и endpoints, но не UI.
- State service хранит feature state и pure transitions.
- Facade координирует use cases и предоставляет удобный API компонентам.

Для маленькой feature три класса могут быть лишними. Разделение вводят, когда обязанности действительно различаются.
Компонент отвечает за rendering и UI events, а бизнес-правила не должны зависеть от DOM.

</td></tr></table>

</details>

<details>
<summary>Как подменять dependencies в Angular-тестах?</summary><br>
<table><tr><td>

```ts
TestBed.configureTestingModule({
  providers: [UserStore, {provide: UserApi, useValue: userApiMock}],
});

TestBed.overrideProvider(APP_CONFIG, {
  useValue: testConfig,
});
```

Предпочтительны небольшие fake/stub реализации с типом `Pick<Dependency, "...">`. Не нужно мокать каждую внутреннюю
функцию: подменяют внешние границы и проверяют observable behavior.

</td></tr></table>

</details>

<details>
<summary>Что такое DI в Angular?</summary><br>
<table><tr><td>

Angular DI — это система, через которую Angular создает и передает зависимости компонентам, директивам, сервисам и
другим сущностям. Сервисы можно регистрировать через providedIn, ApplicationConfig.providers, route providers или
component/directive providers; Angular DI при этом иерархическая, то есть ближайший injector может переопределить
зависимость для части дерева.

```ts
@Injectable({
  providedIn: 'root',
})
export class UserService {}

@Component({
  selector: 'app-profile',
  template: `
    ...
  `,
})
export class ProfileComponent {
  private readonly userService = inject(UserService);
}
```

Angular 22+

```ts
@Service()
export class UserService {}

@Component({
  selector: 'app-profile',
  template: `
    ...
  `,
})
export class ProfileComponent {
  private readonly userService = inject(UserService);
}
```

</td></tr></table>

</details>

<details>
<summary>Что делает <code>providedIn: 'root'</code>?</summary><br>
<table><tr><td>

`providedIn: "root"` регистрирует сервис в корневом `EnvironmentInjector`.

```ts
@Injectable({providedIn: 'root'})
export class AuthService {}
```

- Обычно во всем приложении создается один экземпляр сервиса.
- Сервис доступен без ручного добавления в `providers`.
- Неиспользуемый сервис может быть удален из production-сборки с помощью tree shaking.
- Экземпляр живет столько же, сколько приложение.

Это подход по умолчанию для stateless-сервисов, API-клиентов и общего состояния приложения.

</td></tr></table>

</details>

<details>
<summary>Чем отличается providedIn: 'root' от providers в компоненте?</summary><br>
<table><tr><td>

`providedIn: "root"` создает провайдер на уровне приложения, а `providers` компонента создает локальный провайдер в
`ElementInjector`.

```ts
@Component({
  selector: 'app-editor',
  providers: [DraftService],
})
export class EditorComponent {}
```

- Root-сервис обычно один на все приложение.
- Локальный сервис создается для каждого экземпляра компонента.
- Локальный экземпляр доступен компоненту и его потомкам по правилам иерархического DI.
- При уничтожении компонента уничтожается и его локальный экземпляр сервиса.

Локальный `providers` полезен для изолированного состояния виджета, формы или нескольких независимых экземпляров одного
компонента.

</td></tr></table>

</details>

<details>
<summary>Что будет, если один сервис есть и в root, и в providers компонента?</summary><br>
<table><tr><td>

Будут существовать разные экземпляры сервиса. Angular начинает поиск с ближайшего инжектора, поэтому компонент и его
потомки получат локальный экземпляр, а остальные части приложения продолжат использовать root-экземпляр.

Это называется shadowing провайдера.

```ts
@Injectable({providedIn: 'root'})
export class CounterService {}

@Component({
  providers: [CounterService],
})
export class LocalCounterComponent {
  readonly counter = inject(CounterService); // Локальный экземпляр
}
```

Такое поведение полезно для изоляции состояния, но может стать причиной ошибок, если разработчик ожидал настоящий
singleton.

</td></tr></table>

</details>

<details>
<summary>Объясните как работает Dependency Injection на примере SOLID</summary><br>
<table><tr><td>

Как мы помним Dependency Injection в Angular это механизм, при котором класс не создает зависимости сам, а получает их
снаружи.

То есть вместо:

```ts
class UserComponent {
  private api = new UserApiService();
}
```

мы пишем:

```ts
@Component({
  // ...
})
export class UserComponent {
  private readonly api = inject(UserApiService);
  // или через constructor:
  // constructor(private readonly api: UserApiService) {}
}
```

Angular сам найдет UserApiService, создаст экземпляр и передаст его в компонент.

##### Зачем это нужно?

Представь компонент:

```ts
@Component({
  // ...
})
export class ProfileComponent {
  loadProfile(): void {
    // Нужно сходить на backend
  }
}
```

Компоненту не хочется знать:

- как создается HTTP-клиент;
- где лежит API;
- как кешируются данные;
- как мокать API в тестах;
- как менять реализацию для dev/prod.

Компоненту нужно только сказать:

"Дай мне сервис, который умеет загружать профиль".

Это и есть идея Dependency Injection.

##### Без Dependency Injection

Плохой вариант:

```ts
export class ProfileComponent {
  private readonly service = new ProfileService();

  load(): void {
    this.service.loadProfile();
  }
}
```

Проблемы:

- ProfileComponent жестко связан с ProfileService.
- В тестах сложно подменить сервис на мок.
- Если ProfileService требует HttpClient, придется руками создавать и его.
- Компонент знает слишком много о создании зависимостей.

##### С Dependency Injection

Хороший вариант:

```ts
@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly http = inject(HttpClient);

  loadProfile() {
    return this.http.get('/api/profile');
  }
}
```

```ts
@Component({
  selector: 'app-profile',
  template: `
    ...
  `,
})
export class ProfileComponent {
  private readonly profileService = inject(ProfileService);

  load(): void {
    this.profileService.loadProfile().subscribe();
  }
}
```

Теперь ProfileComponent не создает ProfileService. Он только просит Angular:

“Найди мне зависимость типа ProfileService”.

Angular смотрит в injector и возвращает нужный экземпляр.

##### Как это связано с SOLID

###### 1. S — Single Responsibility Principle

Класс должен иметь одну основную ответственность. Без DI компонент часто делает слишком много:

```ts
export class ProfileComponent {
  private readonly http = new HttpClient(/* ... */);

  loadProfile() {
    return this.http.get('/api/profile');
  }

  renderProfile() {
    // UI logic
  }
}
```

Компонент отвечает и за UI, и за работу с API.

Лучше разделить:

```ts
@Injectable({
  providedIn: 'root',
})
export class ProfileApiService {
  private readonly http = inject(HttpClient);

  getProfile() {
    return this.http.get('/api/profile');
  }
}
```

```ts
@Component({
  //...
})
export class ProfileComponent {
  private readonly api = inject(ProfileApiService);

  load(): void {
    this.api.getProfile().subscribe();
  }
}
```

Теперь:

- ProfileComponent отвечает за UI;
- ProfileApiService отвечает за API.

DI помогает не смешивать ответственности.

###### 2. O — Open/Closed Principle

Код должен быть открыт для расширения, но закрыт для изменения.

Допустим, есть аналитика:

```ts
export class AnalyticsService {
  track(event: string): void {
    console.log(event);
  }
}
```

Компонент использует ее:

```ts
@Component({
  // ...
})
export class ButtonComponent {
  private readonly analytics = inject(AnalyticsService);

  click(): void {
    this.analytics.track('button_click');
  }
}
```

Если завтра нужно заменить ConsoleAnalyticsService на FirebaseAnalyticsService, не хочется переписывать все компоненты.

В Angular можно сделать абстракцию через InjectionToken:

```ts
export interface Analytics {
  track(event: string): void;
}

export const ANALYTICS = new InjectionToken<Analytics>('ANALYTICS');
```

Реализация:

```ts
@Injectable()
export class ConsoleAnalyticsService implements Analytics {
  track(event: string): void {
    console.log(event);
  }
}
```

Provider:

```ts
bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: ANALYTICS,
      useClass: ConsoleAnalyticsService,
    },
  ],
});
```

Использование:

```ts
@Component({
  // ...
})
export class ButtonComponent {
  private readonly analytics = inject(ANALYTICS);

  click(): void {
    this.analytics.track('button_click');
  }
}
```

Теперь компонент не зависит от конкретного класса. Можно заменить реализацию:

```ts
providers: [
  {
    provide: ANALYTICS,
    useClass: FirebaseAnalyticsService,
  },
];
```

Компонент не меняется.

###### 3. L — Liskov Substitution Principle

Любую реализацию интерфейса можно заменить другой, если она соблюдает тот же контракт.

Например, у нас есть контракт:

```ts
export interface AuthStorage {
  getToken(): string | null;
  setToken(token: string): void;
}
```

Одна реализация хранит токен в localStorage:

```ts
@Injectable()
export class LocalStorageAuthStorage implements AuthStorage {
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }
}
```

Другая — в памяти:

```ts
@Injectable()
export class MemoryAuthStorage implements AuthStorage {
  private token: string | null = null;

  getToken(): string | null {
    return this.token;
  }

  setToken(token: string): void {
    this.token = token;
  }
}
```

DI позволяет подставить любую реализацию:

```ts
export const AUTH_STORAGE = new InjectionToken<AuthStorage>('AUTH_STORAGE');

providers: [
  {
    provide: AUTH_STORAGE,
    useClass: LocalStorageAuthStorage,
  },
];
```

А потребитель не знает, какая реализация внутри:

```ts
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly storage = inject(AUTH_STORAGE);

  getToken(): string | null {
    return this.storage.getToken();
  }
}
```

Если заменить LocalStorageAuthStorage на MemoryAuthStorage, AuthService должен продолжить работать.

###### 4. I — Interface Segregation Principle

Не заставляй класс зависеть от методов, которые ему не нужны.

Плохо:

```ts
export interface UserFacade {
  loadUser(): Observable<User>;
  updateUser(user: User): Observable<User>;
  deleteUser(id: string): Observable<void>;
  exportUsers(): Observable<Blob>;
  sendMarketingEmail(): void;
}
```

Компоненту профиля нужен только loadUser, но он зависит от огромного интерфейса.

Лучше разделить:

```ts
export interface UserReader {
  loadUser(): Observable<User>;
}

export interface UserWriter {
  updateUser(user: User): Observable<User>;
}
```

Токен:

```ts
export const USER_READER = new InjectionToken<UserReader>('USER_READER');
```

Компонент:

```ts
@Component({
  // ...
})
export class ProfileComponent {
  private readonly userReader = inject(USER_READER);

  ngOnInit(): void {
    this.userReader.loadUser().subscribe();
  }
}
```

Компонент зависит только от того, что ему реально нужно.

###### 5. D — Dependency Inversion Principle

Это главный принцип, связанный с DI. Высокоуровневый код не должен зависеть от низкоуровневых деталей. Оба должны
зависеть от абстракций.

Плохо:

```ts
export class AuthService {
  private readonly storage = new LocalStorageAuthStorage();
}
```

AuthService зависит от конкретной детали: LocalStorageAuthStorage.

Лучше:

```ts
export interface AuthStorage {
  getToken(): string | null;
  setToken(token: string): void;
}

export const AUTH_STORAGE = new InjectionToken<AuthStorage>('AUTH_STORAGE');
```

```ts
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly storage = inject(AUTH_STORAGE);
}
```

```ts
providers: [
  {
    provide: AUTH_STORAGE,
    useClass: LocalStorageAuthStorage,
  },
];
```

Теперь AuthService зависит не от конкретной реализации, а от абстракции.

##### Главная мысль

DI в Angular — это не просто “удобно получить сервис”.

Это способ сделать код:

- менее связанным;
- проще тестируемым;
- легче расширяемым;
- более соответствующим SOLID;
- более безопасным для замены реализаций.

Самая важная связь с SOLID — это Dependency Inversion:

Компонент или сервис должен зависеть не от конкретной реализации, а от контракта/абстракции.

</td></tr></table>

</details>

### Angular PWA и Service Worker

<details>
<summary>Для чего нужны service worker?</summary><br>
<table><tr><td>

Service Worker — это фоновый слой между сайтом и сетью.

Service Worker — это JavaScript-файл, который браузер запускает отдельно от страницы. Он может перехватывать сетевые
запросы, работать с кешем, получать push-уведомления и помогать сайту работать офлайн.

</td></tr></table>

</details>

### Основные концепции

<details>
<summary>Что такое Angular?</summary><br>
<table><tr><td>

Angular — TypeScript-платформа для создания web-приложений. Она включает compiler, declarative templates, components,
signals, DI, Router, forms, HttpClient, SSR/SSG/hydration, service worker, CLI и testing APIs.

Современная модель Angular 19–22:

- standalone components, directives и pipes; с Angular 19 они standalone по умолчанию;
- `bootstrapApplication()` и functional providers;
- signals для локального и template-facing состояния;
- `input()`, `output()`, `model()` и signal queries;
- built-in control flow `@if`, `@for`, `@switch` и `@defer`;
- RxJS для сложных асинхронных потоков;
- zoneless change detection по умолчанию с Angular 21;
- server-side и hybrid rendering через `@angular/ssr`.

Плюсы: единая экосистема, строгая типизация шаблонов, предсказуемая архитектура, хороший tooling и масштабируемость.

Минусы: большой API surface, необходимость понимать DI, reactivity, Router, rendering и RxJS; неправильные границы
состояния или feature могут сделать приложение сложным независимо от выбранного state manager.

</td></tr></table>

</details>

<details>
<summary>В чем разница между AngularJS и Angular?</summary><br>
<table><tr><td>

**AngularJS** является фреймворком, который может помочь вам в разработке Single Page Application. Он появился в 2009
году и с годами выяснилось, что имел много проблем. **Angular** (Angular 2+) же в свою очередь направлен на тоже самое,
но дает больше преимуществ по сравнению с AngularJS 1.x, включая лучшую производительность, ленивую загрузку, более
простой API, более легкую отладку.

**Что появилось в Angular**:

- Angular ориентирован на мобильные платформы и имеет лучшую производительность
- Angular имеет встроенные сервисы для поддержки интернационализации
- AngularJS проще настроить, чем Angular
- AngularJS использует контроллеры и $scope
- Angular имеет много способов определения локальных переменных
- В Angular новый синтаксис структурных директив (camelCase)
- Angular работает напрямую с свойствами и событиями DOM элементов
- Одностороннее связывание данных через [property]
- Двустороннее связывание данных через [(property)]
- Новый механизм DI, роутинга, запуска приложения

**Основные преимущества Angular**:

- Обратная совместимость Angular 2, 4, 5, ..
- TypeScript с улучшенной проверкой типов
- Встроенный компилятор с режимами JIT и AOT (+сокращение кода)
- Встроенные анимации

</td></tr></table>

</details>

<details>
<summary>Какой должна быть структура каталогов компонентов любого Angular приложения и почему?</summary><br>
<table><tr><td>

Универсальной структуры нет: она зависит от размера продукта и команды. Для приложения обычно лучше группировка по
feature/domain, а не один глобальный каталог `components`, `services`, `models`.

```text
src/app/
  core/
    auth/
    http/
  shared/
    ui/
    pipes/
  features/
    orders/
      data-access/
      ui/
      pages/
      orders.routes.ts
  app.config.ts
  app.routes.ts
```

- `features` содержит бизнес-функции и их локальные зависимости.
- `shared` содержит действительно переиспользуемые, не зависящие от продукта элементы.
- `core` содержит инфраструктуру приложения: авторизацию, конфигурацию, глобальные interceptors.
- Routes и lazy-loading задают явные границы feature.
- Файлы компонента обычно лежат рядом: `.ts`, `.html`, `.less`/`.css`, `.spec.ts`.

Главные критерии: связанный код находится рядом, публичный API узкий, зависимости направлены от feature к общим слоям, а
не между случайными feature.

</td></tr></table>

</details>

<details>
<summary>Что такое MVVM и в чем разница перед MVC?</summary><br>
<table><tr><td>

**MVVM** - шаблон проектирования архитектуры приложения. Состоит из 3 ключевых блоков: Model, View, ViewModel.

Отличие от MVС заключаются в:

- View реагирует на действия пользователя и передает их во View Model через Data Binding.
- View Model, в отличие от контроллера в MVC, имеет особый механизм, автоматизирующий связь между View и связанными
  свойствами в ViewModel.

Привязка данных между View и ViewModel может быть односторонней или двусторонней (one-way, two-way data-binding).

</td></tr></table>

</details>

### Templates

<details>
<summary>Что такое standalone component и чем он отличается от NgModule-подхода?</summary><br>
<table><tr><td>

Standalone-компонент напрямую импортирует зависимости шаблона через `imports` и не требует объявления в `NgModule`.

```ts
@Component({
  selector: 'app-profile',
  imports: [DatePipe, RouterLink],
  templateUrl: './profile.html',
})
export class ProfileComponent {}
```

С Angular 19 компоненты, директивы и pipes standalone по умолчанию. Standalone упрощает lazy loading, локальные
зависимости и tree shaking. `NgModule` остается поддерживаемым для legacy-приложений и некоторых library APIs.

</td></tr></table>

</details>

<details>
<summary>Как работают @if, @for, @switch и @let?</summary><br>
<table><tr><td>

- `@if` условно создает view и поддерживает `@else`.
- `@for` повторяет view и требует `track`.
- `@switch` выбирает одну ветку без fallthrough.
- `@let` сохраняет результат template expression в локальную readonly-переменную.

<!-- prettier-ignore -->
```html
@let user = currentUser();

@if (user) {
  @switch (user.role) {
    @case ("admin") {
      <app-admin />
    }
    @default {
      <app-profile [user]="user" />
    }
  }
}
```

Built-in control flow не требует `CommonModule` и лучше анализируется компилятором, чем legacy `*ngIf/*ngFor`.

</td></tr></table>

</details>

<details>
<summary>Для чего нужен track в @for?</summary><br>
<table><tr><td>

`track` связывает элемент данных с DOM-view. При изменении массива Angular переиспользует существующие nodes и component
instances вместо пересоздания списка.

<!-- prettier-ignore -->
```html
@for (user of users(); track user.id) {
  <app-user [user]="user" />
}
```

Лучший ключ — стабильный уникальный id. `track $index` допустим только для статичного списка, где элементы не
вставляются, не удаляются и не сортируются.

</td></tr></table>

</details>

<details>
<summary>Что такое интерполяция в Angular?</summary><br>
<table><tr><td>

Разметка интерполяции с внедренными выражениями используется в Angular для присвоения данных текстовым нодам и значения
аттрибутов. Например:

```html
<a href="img/{{ username }}.jpg">Hello {{ username }}!</a>
```

</td></tr></table>

</details>

<details>
<summary>Какие способы использования шаблонов в Angular вы знаете?</summary><br>
<table><tr><td>

Шаблон можно задать:

- внешним файлом через `templateUrl`;
- inline-строкой через `template`;
- переиспользуемым фрагментом `<ng-template>`;
- переданным `TemplateRef`, например через content query или input;
- динамически вставленным через `ViewContainerRef`.

В шаблонах используются интерполяция, property/event binding, control flow `@if`, `@for`, `@switch`, pipes, template
reference variables и content projection через `<ng-content>`.

Для обычного компонента предпочтителен внешний `.html`, если шаблон не тривиален. Шаблон не должен содержать тяжелые
вычисления и побочные эффекты: подготовку данных лучше выполнять в компоненте, `computed()` или pipe.

</td></tr></table>

</details>

<details>
<summary>В чем разница между структурной и атрибутной директивой, назовите встроенные директивы?</summary><br>
<table><tr><td>

**Структурные директивы** управляют структурой представления: создают, удаляют или повторяют embedded views.
Классические примеры — `NgIf`, `NgFor`, `NgSwitch`, пользовательская директива на `<ng-template>`.

В Angular 19–22 для обычных условий и циклов используют встроенный control flow:

<!-- prettier-ignore -->
```html
@if (user()) {
  <app-profile [user]="user()" />
}

@for (item of items(); track item.id) {
  <app-item [item]="item" />
} @empty {
  <p>Список пуст</p>
}
```

`@if`, `@for` и `@switch` встроены в синтаксис шаблонов и не требуют импорта `CommonModule`.

**Атрибутные директивы** изменяют поведение или свойства существующего элемента. Примеры: `RouterLink`, `NgModel`,
собственная `appTooltip`.

Для классов и стилей предпочтительны прямые bindings:

```html
<button
  [class.active]="isActive()"
  [style.width.px]="width()"
>
  ...
</button>
```

`NgClass`, `NgStyle`, `*ngIf` и `*ngFor` остаются поддерживаемыми для существующего кода, но не являются первым выбором
для новых шаблонов.

</td></tr></table>

</details>

<details>
<summary>Для чего нужны директивы ng-template, ng-container, ng-content?</summary><br>
<table><tr><td>

В современном Angular:

- `<ng-template>` хранит неотрендеренный `TemplateRef`, который можно создать позже через `ViewContainerRef`,
  `NgTemplateOutlet` или пользовательскую структурную директиву.
- `<ng-container>` группирует элементы, не добавляя лишний DOM-узел. С `@if` и `@for` он нужен реже, но полезен для
  `ngTemplateOutlet`, `ngComponentOutlet` и DI-границ.
- `<ng-content>` задает compile-time content projection. Для нескольких областей используют `select`.

<!-- prettier-ignore -->
```html
@if (lessons(); as items) {
  @for (lesson of items; track lesson.id) {
    <app-lesson [lesson]="lesson" />
  }
} @else {
  <ng-container [ngTemplateOutlet]="loading" />
}

<ng-template #loading>Загрузка...</ng-template>
```

Ниже приведен legacy-синтаксис `*ngIf/*ngFor`, который все еще встречается в проектах до миграции на built-in control
flow.

#### 1. ng-template

`<template>` — это механизм для отложенного рендера клиентского контента, который не отображается во время загрузки, но
может быть инициализирован при помощи JavaScript.

Template можно представить себе как фрагмент контента, сохраненный для последующего использования в документе. Хотя
парсер и обрабатывает содержимое элемента `template` во время загрузки страницы, он делает это только чтобы убедиться в
валидности содержимого; само содержимое при этом не отображается.

`<ng-template>` - является имплементацией стандартного элемента template, данный элемент появился с четвертой версии
Angular, это было сделано с точки зрения совместимости со встраиваемыми на страницу template элементами, которые могли
попасть в шаблон ваших компонентов по тем или иным причинам.

Пример:

```html
<div
  class="lessons-list"
  *ngIf="lessons; else loading"
>
  ...
</div>

<ng-template #loading>
  <div>Loading...</div>
</ng-template>
```

#### 2. ng-container

`<ng-container>` - это логический контейнер, который может использоваться для группировки узлов, но не отображается в
дереве DOM как узел (node).

На самом деле структурные директивы (*ngIf, *ngFor, …) являются синтаксическим сахаром для наших шаблонов. В реальности,
данные шаблоны трансформируются в такие конструкции:

```html
<ng-template
  [ngIf]="lessons"
  [ngIfElse]="loading"
>
  <div class="lessons-list">...</div>
</ng-template>

<ng-template #loading>
  <div>Loading...</div>
</ng-template>
```

Но что делать, если я хочу применить несколько структурных директив? (спойлер: к сожалению, так нельзя сделать)

```html
<div
  class="lesson"
  *ngIf="lessons"
  *ngFor="let lesson of lessons"
>
  <div class="lesson-detail">{{ lesson | json }}</div>
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
  <div
    class="lesson"
    *ngFor="let lesson of lessons"
  >
    <div class="lesson-detail">{{ lesson | json }}</div>
  </div>
</div>
```

Однако, чтобы избежать необходимости создавать дополнительный div, мы можем вместо этого использовать директиву
ng-container:

```html
<ng-container *ngIf="lessons">
  <div
    class="lesson"
    *ngFor="let lesson of lessons"
  >
    <div class="lesson-detail">{{ lesson | json }}</div>
  </div>
</ng-container>
```

Как мы видим, директива ng-container предоставляет нам элемент, в котором мы можем использовать структурную директиву,
без необходимости создавать дополнительный элемент.

Еще пара примечательных примеров, если все же вы хотите использовать ng-template вместо ng-container, по определенным
правилам вы не сможете использовать полную конструкцию структурных директив.

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

#### 3. ng-content

`<ng-content>` - позволяет внедрять родительским компонентам html-код в дочерние компоненты.

Здесь на самом деле, немного сложнее уже чем с ng-template, ng-container. Так как ng-content решает задачу проецирования
контента в ваши веб-компоненты. Веб-компоненты состоят из нескольких отдельных технологий. Вы можете думать о
Веб-компонентах как о переиспользуемых виджетах пользовательского интерфейса, которые создаются с помощью открытых
веб-технологий. Они являются частью браузера и поэтому не нуждаются во внешних библиотеках, таких как jQuery или Dojo.
Существующий Веб-компонент может быть использован без написания кода, просто путем импорта выражения на HTML-страницу.
Веб-компоненты используют новые или разрабатываемые стандартные возможности браузера.

Давайте представим ситуацию от обратного, нам нужно параметризовать наш компонент. Мы хотим сделать так, чтобы на вход в
компонент мы могли передать какие-либо статичные данные. Это можно сделать несколькими способами.

comment.component.ts:

```ts
@Component({
  selector: 'comment',
  template: `
    <h1>Комментарий:</h1>
    <p>{{ data }}</p>
  `,
})
export class CommentComponent {
  readonly data = input.required<string>();
}
```

app.component.html

<!-- prettier-ignore -->
```html
@for (message of comments(); track message.id) {
  <comment [data]="message.text" />
}
```

Но можно поступить и другим путем.

comment.component.ts:

```ts
@Component({
  selector: 'comment',
  template: `
    <h1>Комментарий:</h1>
    <ng-content></ng-content>
  `,
})
export class CommentComponent {}
```

app.component.html

<!-- prettier-ignore -->
```html
@for (message of comments(); track message.id) {
  <comment>
    <p>{{ message.text }}</p>
  </comment>
}
```

Конечно, эти примеры плохо демонстрируют подводные камни, свои плюсы и минусы. Но второй способ демонстрирует подход при
работе, когда мы оперируем независимыми абстракциями и можем проецировать контент внутрь наших компонентов (подход
веб-компонентов).

</td></tr></table>

</details>

### Компоненты, директивы, сервисы и pipes

<details>
<summary>Что такое директива и как создать собственную?</summary><br>
<table><tr><td>

Директивы бывают трех видов: компонент, структурные и атрибутные (см. выше).

Современная атрибутная директива использует `inject()`, signal input и объект `host`:

```ts
@Directive({
  selector: '[appHighlight]',
  host: {
    '(mouseenter)': 'active.set(true)',
    '(mouseleave)': 'active.set(false)',
    '[style.backgroundColor]': 'active() ? color() : null',
  },
})
export class HighlightDirective {
  readonly color = input('yellow', {alias: 'appHighlight'});
  readonly active = signal(false);
}
```

В новом коде объект `host` предпочтительнее `@HostBinding` и `@HostListener`. Прямое изменение DOM через
`ElementRef.nativeElement` используют только когда declarative binding или `Renderer2` не решают задачу.

Пользовательская структурная директива работает с `TemplateRef` и `ViewContainerRef`:

```ts
@Directive({
  selector: '[appUnless]',
})
export class UnlessDirective {
  private readonly template = inject(TemplateRef<unknown>);
  private readonly container = inject(ViewContainerRef);
  private readonly condition = input.required<boolean>({alias: 'appUnless'});

  constructor() {
    effect(() => {
      this.container.clear();

      if (!this.condition()) {
        this.container.createEmbeddedView(this.template);
      }
    });
  }
}
```

Для обычных условий собственная структурная директива не нужна: используйте `@if`. Она оправдана, когда инкапсулирует
повторяемое доменное поведение.

</td></tr></table>

</details>

<details>
<summary>Что такое директива, компонент, модуль, сервис, пайп в Angular и для чего они нужны?</summary><br>
<table><tr><td>

- **Компонент** — директива с собственным шаблоном. В Angular 19+ компоненты standalone по умолчанию и напрямую
  импортируют зависимости шаблона в `imports`.
- **Директива** добавляет поведение существующему элементу или шаблону.
- **Сервис** инкапсулирует состояние, бизнес-логику, data access или интеграцию и обычно получается через `inject()`.
- **Pipe** выполняет чистое преобразование значения для отображения в шаблоне.
- **NgModule** группирует declarations/providers в legacy-архитектуре. Он остается поддерживаемым, но для нового
  приложения базовой моделью являются standalone APIs, `bootstrapApplication()` и route-level providers.

</td></tr></table>

</details>

<details>
<summary>Расскажите об основных параметрах @NgModule, @Component, @Directive, @Injectable, @Pipe</summary><br>
<table><tr><td>

В Angular 19–22 основной подход — standalone. Компоненты, директивы и pipes standalone по умолчанию; `standalone: true`
обычно не пишут.

Основные параметры:

- `@Component`: `selector`, `template`/`templateUrl`, `styles`/`styleUrl`, `imports`, `providers`, `viewProviders`,
  `changeDetection`, `encapsulation`, `host`.
- `@Directive`: `selector`, `providers`, `host`, `exportAs`.
- `@Injectable`: `providedIn`.
- `@Pipe`: `name`, `pure`.

Inputs, outputs и queries в новом коде объявляют в классе:

```ts
@Component({
  selector: 'app-user-card',
  imports: [DatePipe],
  templateUrl: './user-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.selected]': 'selected()',
  },
})
export class UserCardComponent {
  readonly user = input.required<User>();
  readonly selected = input(false);
  readonly selectedChange = output<boolean>();
  readonly menu = viewChild(MenuComponent);
}
```

`NgModule` остается поддерживаемым для legacy-кода и некоторых библиотек. Его основные поля: `declarations`, `imports`,
`exports`, `providers` и `bootstrap`. `entryComponents`, `ComponentFactoryResolver` и `moduleId` в современном
Ivy-приложении не нужны.

</td></tr></table>

</details>

<details>
<summary>Что такое динамические компоненты и как их можно использовать в Angular?</summary><br>
<table><tr><td>

Динамические компоненты создаются во время выполнения. Типичные случаи: dialogs, overlays, notifications и
конфигурируемые widgets.

В Angular 19–22 есть три основных варианта:

1. `@defer` — лениво загрузить тяжелую часть шаблона.
2. `NgComponentOutlet` — выбрать тип компонента в шаблоне.
3. `ViewContainerRef.createComponent()` — создать компонент императивно.

```ts
@Component({
  selector: 'app-dialog-host',
  template: `
    <ng-container #container />
  `,
})
export class DialogHostComponent {
  private readonly container = viewChild.required('container', {
    read: ViewContainerRef,
  });

  open(): void {
    const componentRef = this.container().createComponent(UserDialogComponent);

    componentRef.setInput('userId', '42');
    componentRef.instance.closed.subscribe(() => componentRef.destroy());
  }
}

export class UserDialogComponent {
  readonly userId = input.required<string>();
  readonly closed = output<void>();
}
```

Для глобальных overlays обычно используют Angular CDK Overlay или API UI-kit. `ComponentFactoryResolver` и
`entryComponents` относятся к legacy-подходу.

</td></tr></table>

</details>

<details>
<summary>Как применить анимацию к компонентам?</summary><br>
<table><tr><td>

В Angular 20.2+ для нового кода рекомендуются CSS-анимации и compiler APIs `animate.enter` / `animate.leave`.

<!-- prettier-ignore -->
```html
@if (isOpen()) {
  <section animate.enter="dialog-enter" animate.leave="dialog-leave">
    ...
  </section>
}
```

```css
.dialog-enter {
  animation: fade-in 180ms ease-out;
}

.dialog-leave {
  animation: fade-out 120ms ease-in;
}
```

Для сложной timeline-анимации можно передать функцию и интегрировать GSAP или другую библиотеку. Нужно учитывать
`prefers-reduced-motion`.

Legacy DSL из `@angular/animations` с `trigger`, `state` и `transition` deprecated, но может встречаться в существующих
приложениях.

</td></tr></table>

</details>

### Lifecycle и rendering

<details>
<summary>Объясните механизм загрузки (bootstrap) Angular-приложения в браузере?</summary><br>
<table><tr><td>

Современное standalone-приложение запускается через `bootstrapApplication()`:

```ts
import {bootstrapApplication} from '@angular/platform-browser';

import {AppComponent} from './app/app.component';
import {appConfig} from './app/app.config';

bootstrapApplication(AppComponent, appConfig).catch(reportError);
```

```ts
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(withInterceptors([authInterceptor]))],
};
```

Angular создает root `EnvironmentInjector`, регистрирует providers, создает корневой компонент и запускает первый
render.

NgModule-bootstrap через `platformBrowserDynamic().bootstrapModule(AppModule)` остается поддерживаемым для
legacy-приложений, но не является подходом по умолчанию для нового Angular 19–22 кода.

</td></tr></table>

</details>

<details>
<summary>Как происходит взаимодействие компонентов в Angular (опишите components view)?</summary><br>
<table><tr><td>

Основные способы взаимодействия:

1. **Родитель передает данные ребенку** через `input()`.
2. **Ребенок сообщает о событии** через `output()`.
3. **Двусторонний контракт** компонента объявляется через `model()`.
4. **Доступ к дочернему view** выполняется через signal queries: `viewChild()`, `viewChildren()`.
5. **Несвязанные компоненты** взаимодействуют через feature-сервис состояния, Router или общий store.

```ts
@Component({
  selector: 'app-parent',
  template: `
    <app-counter
      [count]="count()"
      (increment)="count.set($event)"
    />
  `,
})
export class ParentComponent {
  readonly count = signal(0);
}

@Component({
  selector: 'app-counter',
  template: `
    <button
      type="button"
      (click)="increment.emit(count() + 1)"
    >
      +1
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent {
  readonly count = input.required<number>();
  readonly increment = output<number>();
}
```

Для двухсторонней привязки:

```ts
export class QuantityComponent {
  readonly value = model(0);
}
```

```html
<app-quantity [(value)]="quantity" />
```

Для общего синхронного состояния сервис может инкапсулировать writable signal и наружу отдавать readonly signal. RxJS
используют для асинхронных потоков и сложной координации.

`@Input`, `@Output`, `EventEmitter` и decorator queries поддерживаются, но functional signal APIs предпочтительны для
нового кода.

</td></tr></table>

</details>

<details>
<summary>Каков жизненный цикл у компонентов?</summary><br>
<table><tr><td>

Angular 19–22 поддерживает классические lifecycle hooks и render callbacks.

Классические hooks:

- ngOnChanges() - вызывается когда Angular переприсваивает привязанные данные к input properties. Метод получает объект
  SimpleChanges, со старыми и новыми значениями. Вызывается перед NgOnInit и каждый раз, когда изменяется одно или
  несколько связанных свойств.
- ngOnInit() - инициализирует директиву/компонент после того, как Angular впервые отобразит связанные свойства и
  устанавливает входящие параметры.
- ngDoCheck() - при обнаружении изменений, которые Angular не может самостоятельно обнаружить, реагирует на них.
- ngAfterContentInit() - вызывается после того, как Angular спроецирует внешний контент в отображение компонента или
  отображение с директивой. Вызывается единожды, после первого ngDoCheck().
- ngAfterContentChecked() - реагирует на проверку Angular-ом проецируемого содержимого. Вызывается после
  ngAfterContentInit() и каждый последующий ngDoCheck().
- ngAfterViewInit() - вызывается после инициализации отображения компонента и дочерних/директив. Вызывается единожды,
  после первого ngAfterContentChecked().
- ngAfterViewChecked() - реагирует на проверку отображения компонента и дочерних/директив. Вызывается после
  ngAfterViewInit() и каждый последующий ngAfterContentChecked().
- ngOnDestroy() - после уничтожения директивы/компонента выполняется очистка. Отписывает Observables и отключает
  обработчики событий, чтобы избежать утечек памяти.

Современные render callbacks:

- `afterNextRender()` выполняется после следующего завершенного render.
- `afterEveryRender()` выполняется после каждого render.
- `afterRenderEffect()` связывает DOM side effect с signals.

Для cleanup удобно использовать `DestroyRef` и `takeUntilDestroyed()`:

```ts
export class SearchComponent {
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.search.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((query) => this.load(query));
  }
}
```

При signal inputs многие реакции выражаются через `computed()` или `effect()`, но `ngOnChanges` остается полезен, если
нужны одновременно previous и current values.

</td></tr></table>

</details>

<details>
<summary>Что такое Shadow DOM и как с ним работать в Angular?</summary><br>
<table><tr><td>

Shadow DOM — браузерный механизм инкапсуляции DOM-поддерева и стилей web component. Внешние стили по умолчанию не
проникают внутрь shadow tree, а внутренние не влияют на остальную страницу.

Angular поддерживает режимы `ViewEncapsulation`:

- `Emulated` — режим по умолчанию: Angular эмулирует изоляцию CSS с помощью служебных атрибутов.
- `ShadowDom` — создает настоящий shadow root средствами браузера.
- `None` — стили компонента становятся глобальными.

```ts
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrl: './player.component.css',
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class PlayerComponent {}
```

При `ShadowDom` нужно учитывать наследуемые CSS-свойства, CSS custom properties, slots/content projection, тестирование
и интеграцию с глобальной дизайн-системой. `::ng-deep` устарел и не должен быть основным способом стилизации.

</td></tr></table>

</details>

<details>
<summary>Что такое Data Binding и какие проблемы связанные с ним вы знаете?</summary><br>
<table><tr><td>

Data Binding связывает template expression со свойством, атрибутом, классом, стилем или событием.

```html
<h2>{{ user().name }}</h2>
<button
  [disabled]="saving()"
  (click)="save()"
>
  Сохранить
</button>
<div
  [attr.aria-label]="label()"
  [class.active]="active()"
></div>
```

Для component inputs и outputs используется тот же синтаксис:

```html
<app-editor
  [document]="document()"
  (saved)="handleSaved($event)"
/>
```

Двусторонняя привязка раскрывается в input + output `<name>Change`. В современном компоненте контракт удобно объявлять
через `model()`:

```ts
readonly value = model("");
```

```html
<app-editor [(value)]="draft" />
```

Типичные проблемы: тяжелые вычисления в шаблоне, вызовы методов с side effects, мутация объектов с OnPush, неявный
сложный two-way data flow и неправильное различение property binding и attribute binding.

</td></tr></table>

</details>

<details>
<summary>Как вы используете одностороннюю и двухстороннюю привязку данных?</summary><br>
<table><tr><td>

Односторонняя привязка имеет явное направление:

```html
<h2>{{ title }}</h2>
<button
  [disabled]="isSaving"
  (click)="save()"
>
  Сохранить
</button>
```

- `{{ value }}` и `[property]="value"` передают данные из компонента в представление.
- `(event)="handler($event)"` передает событие из представления в компонент.

Двусторонняя привязка объединяет property и event binding:

```html
<input [(ngModel)]="name" />
```

Для компонентов предпочтителен model input:

```ts
readonly value = model("");
```

`model()` автоматически создает input `value` и output `valueChange`. Two-way binding удобен для локального состояния
элемента управления, но при сложном data flow явные `input()`/`output()` или форма обычно легче для отладки.

</td></tr></table>

</details>

<details>
<summary>В чем преимущества и недостатки Regular DOM (Angular) перед Virtual DOM (React)?</summary><br>
<table><tr><td>

Формулировка упрощает реальность: и Angular, и React в итоге обновляют настоящий DOM, но используют разные модели
определения изменений.

Angular компилирует шаблон в точные инструкции создания и обновления узлов. Ему не обязательно каждый раз строить новое
виртуальное дерево и сравнивать его целиком. React обычно создает новое представление Virtual DOM и выполняет
reconciliation.

Преимущества подхода Angular:

- компилятор заранее знает, какие bindings нужно обновлять;
- предсказуемая структура шаблонов;
- хорошая интеграция change detection, signals и DI.

Возможные недостатки:

- лишние проверки при неудачно спроектированном change detection;
- сложнее интеграция ручных DOM-изменений;
- производительность сильно зависит от структуры компонентов, `track`, неизменяемых обновлений и границ реактивности.

Нельзя утверждать, что один подход всегда быстрее. Нужно измерять конкретный сценарий: большие списки, частые события,
startup, memory и стоимость обновления.

</td></tr></table>

</details>

<details>
<summary>Что такое ngZone?</summary><br>
<table><tr><td>

`NgZone` — сервис интеграции Angular с ZoneJS. В zone-based приложении ZoneJS патчит асинхронные browser APIs и помогает
Angular определить момент, когда может потребоваться синхронизация представления.

Важно для Angular 19–22:

- Angular 19 обычно использует ZoneJS, если приложение не настроено иначе.
- В Angular 20 zoneless включается через `provideZonelessChangeDetection()`.
- Начиная с Angular 21 zoneless является режимом по умолчанию.

В zoneless-приложении Angular получает точные уведомления от signals, template/host listeners, `AsyncPipe`,
`markForCheck()` и установки inputs.

`runOutsideAngular()` полезен в zone-based приложениях для частых событий сторонней библиотеки. В новом коде
предпочтительны точные реактивные уведомления, а не ручной глобальный `tick()`.

</td></tr></table>

</details>

<details>
<summary>Как обновлять представление, если ваша модель данных обновляется вне 'зоны'?</summary><br>
<table><tr><td>

В современном Angular предпочтительно записать новое значение в signal. Это работает и в zoneless-приложении:

```ts
export class ClockComponent {
  readonly time = signal(new Date());

  constructor() {
    setInterval(() => this.time.set(new Date()), 1000);
  }
}
```

Если сторонний callback изменяет обычное поле, можно вызвать `ChangeDetectorRef.markForCheck()`. `detectChanges()`
применяют для локальной немедленной проверки в специальных интеграционных сценариях.

`ApplicationRef.tick()` проверяет все приложение и почти никогда не должен быть обычным решением. `NgZone.run()`
актуален только для zone-based интеграций.

Ниже приведены legacy-варианты ручного запуска change detection.

1. Используя метод `ApplicationRef.prototype.tick`, который запустит `change detection` на всем дереве компонентов.

```ts
import {Component, ApplicationRef, NgZone} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Hello, {{ name }}!</h1>
  `,
})
export class AppComponent {
  public name: string = null;

  constructor(
    private app: ApplicationRef,
    private zone: NgZone,
  ) {
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

```ts
import {Component, NgZone} from '@angular/core';
import {SomeService} from './some.service';

@Component({
  selector: 'app-root',
  template: `
    <h1>Hello, {{ name }}!</h1>
  `,
  providers: [SomeService],
})
export class AppComponent {
  public name: string = null;

  constructor(
    private zone: NgZone,
    private service: SomeService,
  ) {
    this.zone.runOutsideAngular(() => {
      this.service.getName().then((name: string) => {
        this.zone.run(() => (this.name = name));
      });
    });
  }
}
```

Метод `run` под капотом сам вызывает `tick`, а параметром принимает функцию, которую нужно выполнить перед `tick`. То
есть:

```ts
this.zone.run(() => (this.name = name));

// идентично

this.name = name;
this.app.tick();
```

3. Используя метод `ChangeDetectorRef.prototype.detectChanges`, который запустит `change detection` на текущем
   компоненте и дочерних.

```ts
import {Component, NgZone, ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Hello, {{ name }}!</h1>
  `,
})
export class AppComponent {
  public name: string = null;

  constructor(
    private zone: NgZone,
    private ref: ChangeDetectorRef,
  ) {
    this.zone.runOutsideAngular(() => {
      this.name = window.prompt('What is your name?', 'Jake');
      this.ref.detectChanges();
    });
  }
}
```

</td></tr></table>

</details>

<details>
<summary>Что такое output(), EventEmitter и как подписываться на события?</summary><br>
<table><tr><td>

Для нового компонента custom event объявляют через `output()`:

```ts
export class SaveButtonComponent {
  readonly saved = output<SaveResult>();

  save(): void {
    this.saved.emit({status: 'success'});
  }
}
```

```html
<app-save-button (saved)="handleSaved($event)" />
```

`output()` возвращает `OutputEmitterRef`. На output динамического компонента можно подписаться программно:

```ts
const subscription = componentRef.instance.saved.subscribe(handleSaved);
subscription.unsubscribe();
```

Angular автоматически очищает подписки при уничтожении компонента. Outputs не всплывают по DOM.

`@Output() readonly saved = new EventEmitter<SaveResult>()` остается поддерживаемым legacy API. `EventEmitter` не
следует использовать как event bus в сервисах; для сервисов подходят signals или RxJS.

</td></tr></table>

</details>

### Angular Change Detection

<details>
<summary>Что такое Change Detection, как работает Change Detection Mechanism?</summary><br>
<table><tr><td>

Change Detection — синхронизация состояния приложения с DOM. Angular выполняет скомпилированные инструкции шаблона и
обновляет bindings, значения которых изменились.

Angular должен получить уведомление, что view может быть dirty. Основные источники:

- изменение signal, прочитанного шаблоном;
- установка input;
- template или host listener;
- новое значение в `AsyncPipe`;
- `ChangeDetectorRef.markForCheck()`;
- подключение или удаление view.

В zone-based приложении ZoneJS также планирует синхронизацию после async-задач. В zoneless Angular опирается на точные
уведомления; начиная с Angular 21 zoneless используется по умолчанию.

Во время одной проверки Angular обходит дерево views сверху вниз. Не следует менять уже проверенное состояние во время
рендера.

</td></tr></table>

</details>

<details>
<summary>Какие существуют стратегии обнаружения изменений?</summary><br>
<table><tr><td>

Есть две стратегии:

- `Default` (`CheckAlways`) — view участвует в каждой запланированной проверке.
- `OnPush` (`CheckOnce`) — Angular может пропустить subtree, пока компонент не получит уведомление об изменении.

`OnPush`-компонент проверяется, когда:

- изменился input по сравнению через `Object.is`;
- событие обработано в его subtree;
- изменился signal, прочитанный шаблоном;
- `AsyncPipe` получил значение;
- вызван `markForCheck()` или view создано/подключено.

```ts
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    {{ user().name }}
  `,
})
export class UserCardComponent {
  readonly user = input.required<User>();
}
```

Нельзя мутировать объект input на месте и ожидать новую ссылку. Предпочтительны immutable updates и signals.

</td></tr></table>

</details>

<details>
<summary>Сколько Change Detector(ов) может быть во всем приложении?</summary><br>
<table><tr><td>

У каждого component view есть собственное представление change detection, связанное в дерево views. В Ivy это внутренние
структуры `LView`/`TView`; `AbstractChangeDetector` не является актуальной моделью публичного API.

Через `ChangeDetectorRef` можно пометить view для проверки, локально проверить его, detach или reattach. Обычно signals
и bindings отправляют необходимые уведомления автоматически.

</td></tr></table>

</details>

<details>
<summary>Основное отличие constructor от ngOnInit?</summary><br>
<table><tr><td>

Конструктор — механизм JavaScript/TypeScript. Angular создает экземпляр класса и предоставляет injection context,
поэтому зависимости можно получать через `inject()` в инициализаторах полей.

`ngOnInit()` — lifecycle hook Angular. Он вызывается один раз после установки initial inputs и до проверки дочерних
views.

Signal inputs можно читать в `ngOnInit`, `computed()` и `effect()`. Для чистых производных значений лучше `computed()`,
а не копирование input в отдельное поле.

Для DOM-зависимой логики используют `afterNextRender()`/`afterEveryRender()` или after-view hooks.

</td></tr></table>

</details>

<details>
<summary>Чем markForCheck() отличается от detectChanges(), detach() и reattach()?</summary><br>
<table><tr><td>

- `markForCheck()` помечает view и предков для проверки в следующем scheduled change detection.
- `detectChanges()` немедленно проверяет текущую view и ее дочерние views.
- `detach()` исключает view из обычного дерева проверок.
- `reattach()` возвращает ее обратно.

Для OnPush обычно нужен `markForCheck()`. `detectChanges()` используют на узких интеграционных границах. `detach()`
оправдан для редко обновляемых тяжелых views, если команда явно управляет их обновлением.

</td></tr></table>

</details>

<details>
<summary>Что такое coalescing Change Detection и как найти лишние проверки?</summary><br>
<table><tr><td>

Coalescing объединяет несколько событий или вызовов `NgZone.run()` в одну проверку, уменьшая повторную работу в
zone-based приложении.

Диагностика:

- Angular DevTools Profiler показывает change detection и render cost;
- Chrome Performance помогает найти long tasks, layout и scripting;
- временный счетчик в development-сборке показывает частоту вызова hot-path;
- тяжелые template methods заменяют `computed()` или pure pipe;
- проверяют мутации, частые DOM events и слишком широкое общее состояние.

Сначала измеряют конкретный сценарий, затем оптимизируют component boundaries, список, вычисления или scheduling.

</td></tr></table>

</details>

### Angular Signals

<details>
<summary>Что такое Signals и когда их использовать?</summary><br>
<table><tr><td>

Signal — реактивный контейнер для значения. Angular отслеживает чтение signal и обновляет зависящие от него вычисления и
представления при изменении.

```ts
export class CounterComponent {
  readonly count = signal(0);
  readonly doubled = computed(() => this.count() * 2);

  increment(): void {
    this.count.update((value) => value + 1);
  }
}
```

- `signal()` хранит изменяемое состояние.
- `computed()` описывает чистое производное значение.
- `effect()` запускает побочный эффект и должен использоваться только для интеграции с внешними системами.
- Значение изменяют через `set()` или `update()`, не мутируя объект внутри signal напрямую.
- `linkedSignal()` создает writable state, которое пересчитывается при изменении источника, но может временно
  редактироваться пользователем.
- `resource()`/`httpResource()` описывают асинхронные данные в signal-модели; перед использованием нужно учитывать
  статус API в конкретной версии Angular.
- `toSignal()` и `toObservable()` связывают signals с RxJS на границах.
- `untracked()` читает signal без регистрации зависимости.

Inputs и queries также являются signals:

```ts
export class SearchComponent {
  readonly query = input('');
  readonly field = viewChild.required<ElementRef<HTMLInputElement>>('field');
  readonly normalizedQuery = computed(() => this.query().trim().toLowerCase());
}
```

Signals подходят для локального синхронного состояния, derived state и template-facing значений. RxJS удобнее для
отмены, событий во времени, WebSocket, polling и сложной оркестрации. Эти инструменты дополняют друг друга.

</td></tr></table>

</details>

<details>
<summary>В чем разница между input(), output() и model()?</summary><br>
<table><tr><td>

- `input()` принимает данные от родителя и возвращает readonly `InputSignal`.
- `output()` объявляет custom event и возвращает `OutputEmitterRef`.
- `model()` создает writable input для two-way binding и автоматически добавляет output `<name>Change`.

```ts
export class QuantityComponent {
  readonly min = input(1);
  readonly max = input.required<number>();
  readonly changed = output<number>();
  readonly value = model(1);

  increment(): void {
    const nextValue = Math.min(this.value() + 1, this.max());

    this.value.set(nextValue);
    this.changed.emit(nextValue);
  }
}
```

```html
<app-quantity
  [min]="1"
  [max]="10"
  [(value)]="quantity"
  (changed)="saveQuantity($event)"
/>
```

`input()` поддерживает required inputs, aliases и transforms. `model()` используют, когда ребенок действительно должен
изменять связанное значение; для обычного события достаточно `output()`.

`@Input` и `@Output` поддерживаются, но signal-based APIs рекомендуются для нового кода.

</td></tr></table>

</details>

<details>
<summary>В чем разница между computed(), effect() и linkedSignal()?</summary><br>
<table><tr><td>

`computed()` создает readonly производное значение. Вычисление lazy, memoized и не должно иметь side effects:

```ts
readonly fullName = computed(() => `${this.firstName()} ${this.lastName()}`);
```

`effect()` выполняет побочный эффект при изменении прочитанных signals:

```ts
effect(() => this.analytics.trackQuery(this.query()));
```

`effect()` не используют для копирования состояния из одного signal в другой: это может создать циклы и лишние renders.
Для derived state нужен `computed()`.

`linkedSignal()` подходит для writable state, которое зависит от источника, но может быть изменено пользователем.
Например, выбранный элемент сбрасывается при загрузке нового списка:

```ts
readonly options = input.required<ReadonlyArray<Option>>();
readonly selected = linkedSignal(() => this.options()[0] ?? null);
```

Кратко: `computed` — вычислить, `effect` — синхронизироваться с внешней системой, `linkedSignal` — хранить редактируемое
зависимое состояние.

</td></tr></table>

</details>

<details>
<summary>Когда использовать resource(), httpResource() и RxJS?</summary><br>
<table><tr><td>

`resource()` связывает async loader с signal-параметрами и предоставляет `value`, `status`, `error` и loading state.
`httpResource()` делает похожую модель для `HttpClient`.

Они удобны, когда компоненту нужен один текущий async-result, зависящий от signals:

```ts
readonly userId = input.required<string>();

readonly user = resource({
  params: () => ({id: this.userId()}),
  loader: ({params, abortSignal}) =>
    fetch(`/api/users/${params.id}`, {signal: abortSignal}).then((response) =>
      response.json(),
    ),
});
```

RxJS предпочтительнее для сложных событий во времени: WebSocket, polling, debounce, объединение потоков,
backpressure-подобные сценарии и явная композиция операторов.

`resource()` и `httpResource()` развиваются между Angular 19–22, поэтому перед использованием проверяют статус API в
целевой версии. На границе с существующим RxJS-кодом используют `toSignal()` и `toObservable()`.

</td></tr></table>

</details>

### RxJS

<details>
<summary>Чем cold Observable отличается от hot Observable?</summary><br>
<table><tr><td>

Cold Observable запускает producer отдельно для каждой подписки. `HttpClient` возвращает cold Observable: каждый
`subscribe()` отправляет новый запрос.

Hot Observable имеет общий producer для подписчиков. Примеры: DOM events, WebSocket, `Subject`.

`share()` превращает cold stream в совместно используемый hot stream на время подписчиков. `shareReplay()` дополнительно
повторяет последние значения новым подписчикам.

</td></tr></table>

</details>

<details>
<summary>Как выбрать switchMap, mergeMap, concatMap или exhaustMap?</summary><br>
<table><tr><td>

- `switchMap` отменяет предыдущую inner subscription: autocomplete, route params.
- `mergeMap` выполняет параллельно: независимые uploads или writes.
- `concatMap` сохраняет очередь и порядок: последовательные изменения.
- `exhaustMap` игнорирует новые события до завершения текущего: защита submit/login от двойного клика.

Для mutation-запросов `switchMap` опасен, если отмена предыдущей операции нарушает ожидания пользователя.

</td></tr></table>

</details>

<details>
<summary>Как построить autocomplete с отменой запроса?</summary><br>
<table><tr><td>

```ts
readonly results$ = this.search.valueChanges.pipe(
  map((value) => value.trim()),
  debounceTime(300),
  distinctUntilChanged(),
  switchMap((query) =>
    query.length < 2
      ? of([])
      : this.api.search(query).pipe(
          catchError(() => of([])),
        ),
  ),
);
```

`switchMap` отписывается от прошлого HTTP Observable, а Angular отменяет запрос. `catchError` находится внутри
`switchMap`, поэтому ошибка одного запроса не завершает поток пользовательского ввода.

</td></tr></table>

</details>

<details>
<summary>Где ставить catchError: внутри или снаружи switchMap?</summary><br>
<table><tr><td>

Внутри — если ошибка относится к одной inner operation и внешний поток должен продолжить работать:

```ts
source$.pipe(switchMap((value) => request(value).pipe(catchError(() => of(fallback)))));
```

Снаружи — если любая ошибка должна завершить или полностью заменить весь pipeline. Для UI events чаще нужен внутренний
`catchError`.

</td></tr></table>

</details>

<details>
<summary>Какие проблемы возможны у shareReplay()?</summary><br>
<table><tr><td>

`shareReplay({bufferSize: 1, refCount: true})` часто используют для дедупликации чтения.

Риски:

- Observable создается заново при каждом getter-вызове;
- кеш не инвалидируется после mutation/logout;
- без подходящего `refCount` источник может жить дольше подписчиков;
- большой buffer удерживает память;
- кеширование error/loading смешивается с кешированием данных.

Нужно явно определить ключ, срок жизни, refresh и очистку кеша.

</td></tr></table>

</details>

<details>
<summary>Когда нужна ручная отписка и что делает takeUntilDestroyed()?</summary><br>
<table><tr><td>

От finite streams (`HttpClient`, `first()`, `take(1)`) вручную отписываться не нужно. `AsyncPipe` и `toSignal()`
управляют подпиской автоматически.

От бесконечных streams в imperative subscription нужно отписаться:

```ts
private readonly destroyRef = inject(DestroyRef);

ngOnInit(): void {
  this.events$
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((event) => this.handle(event));
}
```

`takeUntilDestroyed()` завершает stream при уничтожении текущего injection context.

</td></tr></table>

</details>

<details>
<summary>Чем combineLatest, withLatestFrom и forkJoin отличаются?</summary><br>
<table><tr><td>

- `combineLatest` после initial values эмитит при изменении любого источника.
- `withLatestFrom` эмитит только когда срабатывает основной source, добавляя последние значения других streams.
- `forkJoin` ждет завершения всех источников и один раз возвращает их последние значения.

`forkJoin` подходит для параллельных finite HTTP-запросов, но никогда не завершится с бесконечным stream.

</td></tr></table>

</details>

<details>
<summary>Чем debounceTime, throttleTime и auditTime отличаются?</summary><br>
<table><tr><td>

- `debounceTime` ждет паузу: поиск после остановки ввода.
- `throttleTime` пропускает первое значение и ограничивает частоту следующих.
- `auditTime` после окна отдает последнее накопленное значение.

Для resize/scroll часто подходит `auditTime`, для autocomplete — `debounceTime`, для ограничения частых действий —
`throttleTime`.

</td></tr></table>

</details>

<details>
<summary>Для чего нужен RxJS и какую проблему он решает?</summary><br>
<table><tr><td>

RxJS предоставляет модель потоков для асинхронных значений и событий. Он помогает декларативно описывать:

- HTTP-запросы и их отмену;
- пользовательский ввод;
- WebSocket и polling;
- объединение нескольких источников;
- retry, timeout, debounce, кеширование;
- управление временем жизни подписок.

```ts
readonly users$ = this.search.valueChanges.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap((query) => this.api.search(query)),
);
```

Сила RxJS не в замене Promise, а в композиции последовательностей из нуля, одного или многих значений. Для простого
локального синхронного состояния в Angular чаще достаточно signals; для сложной асинхронной координации RxJS остается
подходящим инструментом.

</td></tr></table>

</details>

<details>
<summary>Что такое Observable?</summary><br>
<table><tr><td>

Observable - ленивый поток значений. Он начинает работу при подписке и может передать ноль, одно или несколько значений,
ошибку и сигнал завершения.

</td></tr></table>

</details>

<details>
<summary>В чем разница между Observable и Promise?</summary><br>
<table><tr><td>

Promise возвращает один будущий результат и начинает выполнение сразу после создания. Observable ленивый, может передать
несколько значений и предоставляет операторы для композиции, повторов и отмены через отписку.

Для одного простого результата подходит Promise. Для пользовательских событий, WebSocket, polling и сложной координации
потоков обычно используют RxJS.

</td></tr></table>

</details>

<details>
<summary>Чем Observable отличается от Subject?</summary><br>
<table><tr><td>

`Subject` одновременно является Observable и observer: в него можно передавать значения через `next()`, а один экземпляр
рассылает их нескольким подписчикам.

Обычный cold Observable обычно запускает producer отдельно для каждой подписки. `BehaviorSubject` требует начальное
значение и сразу передает новому подписчику текущее значение.

</td></tr></table>

</details>

<details>
<summary>В чем разница между Subject, BehaviorSubject, ReplaySubject, AsyncSubject?</summary><br>
<table><tr><td>

- `Subject` передает только новые значения после подписки.
- `BehaviorSubject` хранит текущее значение и сразу отдает его новому подписчику.
- `ReplaySubject` повторяет заданное число предыдущих значений.
- `AsyncSubject` после завершения передает последнее значение.

Для состояния Angular-компонента чаще используют signals. Subject остается полезен на RxJS-границах и для потоков
событий.

</td></tr></table>

</details>

<details>
<summary>Чем отличаются switchMap, mergeMap и concatMap?</summary><br>
<table><tr><td>

- `switchMap` отменяет предыдущий внутренний stream при новом значении. Подходит для поиска.
- `mergeMap` выполняет внутренние streams параллельно. Подходит для независимых операций.
- `concatMap` ставит внутренние streams в очередь и сохраняет порядок.

</td></tr></table>

</details>

<details>
<summary>Как бы вы кешировали наблюдаемые данные из потоков (stream)?</summary><br>
<table><tr><td>

Способ зависит от срока жизни, ключа и политики инвалидирования кеша. Для совместного использования результата
HTTP-запроса часто применяют `shareReplay`.

```ts
private readonly users$ = this.http.get<ReadonlyArray<User>>("/api/users").pipe(
  shareReplay({bufferSize: 1, refCount: true}),
);
```

Нужно учитывать:

- `shareReplay` кеширует результат конкретного экземпляра Observable, поэтому Observable нельзя создавать заново при
  каждом обращении.
- Ошибки, завершение и `refCount` влияют на повторную подписку.
- Для кеша по ключу используют `Map<Key, Observable<Value>>`.
- Нужна явная политика очистки: TTL, logout, mutation, manual refresh.
- Для данных, изменяемых командами, часто понятнее сервис-хранилище с signal/Subject, чем неявный вечный кеш.

На уровне HTTP также применяют browser cache, `Cache-Control`, `ETag` и service worker. Кеширование на разных уровнях
решает разные задачи.

</td></tr></table>

</details>

### Dependency Injection

<details>
<summary>Что такое Dependency Injection?</summary><br>
<table><tr><td>

Это важный паттерн шаблон проектирования приложений. В Angular внедрение зависимостей реализовано из-под капота.

Зависимости - это сервисы или объекты, которые нужны классу для выполнения своих функций. DI -позволяет запрашивать
зависимости от внешних источников.

</td></tr></table>

</details>

<details>
<summary>Что такое Singleton Service и с какой целью его используют в Angular?</summary><br>
<table><tr><td>

Это сервисы, объявленные в приложении и имеющие один экземпляр на все приложение. Его можно объявить двумя способами:

- `@Injectable({providedIn: "root"})` — предпочтительный tree-shakable вариант.
- Зарегистрировать provider в `ApplicationConfig` при `bootstrapApplication()`.

Provider в компоненте или route создает scoped instance, а не глобальный singleton. При lazy routes могут существовать
дочерние `EnvironmentInjector`.

```ts
@Injectable({providedIn: 'root'})
export class SessionService {
  private readonly userState = signal<User | null>(null);
  readonly user = this.userState.asReadonly();
}
```

NgModule `providers` остается legacy-вариантом.

</td></tr></table>

</details>

<details>
<summary>Как можно определить свой обработчик ErrorHandler, Logging, Cache в Angular?</summary><br>
<table><tr><td>

Глобальные необработанные ошибки можно направить в собственный `ErrorHandler`:

```ts
@Injectable()
export class AppErrorHandler implements ErrorHandler {
  handleError(error: unknown): void {
    reportError(error);
  }
}

export const appConfig: ApplicationConfig = {
  providers: [{provide: ErrorHandler, useClass: AppErrorHandler}],
};
```

HTTP-ошибки, logging и HTTP-cache удобно централизовать функциональными interceptors через
`provideHttpClient(withInterceptors([...]))`.

Важно разделять ответственность:

- ожидаемую ошибку обрабатывает ближайший feature и показывает понятное состояние UI;
- interceptor добавляет общий контекст, авторизацию, retry только для безопасных случаев;
- глобальный `ErrorHandler` является последней границей и отправляет диагностику;
- logger скрывается за собственным интерфейсом, чтобы заменить реализацию и отключить чувствительные данные.

Не следует автоматически повторять все запросы или кешировать мутации.

</td></tr></table>

</details>

### Управление состоянием

<details>
<summary>Что такое управление состоянием приложения?</summary><br>
<table><tr><td>

Управление состоянием — правила хранения, чтения и изменения данных, от которых зависит UI.

Состояние бывает:

- локальным состоянием компонента;
- состоянием feature;
- серверным состоянием и кешем;
- глобальным состоянием пользователя, настроек или сессии;
- состоянием URL и форм.

Для локального синхронного состояния подходят `signal()` и `computed()`. Общее состояние можно инкапсулировать в
сервисе. RxJS подходит для сложных асинхронных потоков. NgRx оправдан, когда нужны строгий однонаправленный data flow,
effects, devtools, event history и единые правила большой команды.

Хорошее хранилище имеет узкий readonly API, чистые преобразования, явные loading/error/empty states и не дублирует
данные, которые можно вычислить.

</td></tr></table>

</details>

<details>
<summary>В чем отличие между NGRX, NGXS, Akita и какую проблему они решают?</summary><br>
<table><tr><td>

Все эти решения помогают организовать общее состояние и предсказуемые изменения, но используют разные модели.

- **NgRx** следует Redux-подходу: actions, reducers, selectors, effects. Самый строгий и многословный вариант, с сильной
  экосистемой и devtools.
- **NGXS** использует классы состояния и decorators, требует меньше шаблонного кода, но сильнее опирается на собственные
  абстракции.
- **Akita** моделирует store/query/service и удобна для entity-состояния. Перед выбором нужно проверять актуальность
  поддержки и совместимость с версией Angular.

State manager не нужен автоматически. Для небольшого приложения signals и сервисов часто достаточно. Библиотека
оправдана, когда сложность координации, отладки и единообразия выше стоимости новой зависимости и дополнительного кода.

</td></tr></table>

</details>

### Angular HTTP

<details>
<summary>Как моделировать loading, error и data state HTTP-запроса?</summary><br>
<table><tr><td>

Состояния должны быть взаимоисключающими:

```ts
type RemoteData<T> =
  | {status: 'idle'}
  | {status: 'loading'}
  | {status: 'success'; data: T}
  | {status: 'error'; error: string};
```

Для signal-first чтения подходят `resource()`/`httpResource()`. Для RxJS — stream состояния через `switchMap`, `map`,
`catchError` и `startWith`. Не стоит хранить независимые `isLoading`, `data`, `error`, если они допускают противоречивые
комбинации.

</td></tr></table>

</details>

<details>
<summary>Как делать retry и отмену HTTP-запросов?</summary><br>
<table><tr><td>

`HttpClient` отменяет запрос при unsubscribe. Поэтому `switchMap` подходит поиску и route-driven loading.

Retry применяют только для временных и безопасных ошибок:

```ts
request$.pipe(
  retry({
    count: 2,
    delay: (_error, retryCount) => timer(retryCount * 500),
  }),
);
```

Нельзя бездумно повторять mutations и ошибки `4xx`. Нужны ограничение попыток, backoff и понятное состояние UI.

</td></tr></table>

</details>

<details>
<summary>Как реализовать refresh token без бесконечного цикла?</summary><br>
<table><tr><td>

Auth interceptor:

1. Не перехватывает login/refresh endpoints.
2. На `401` запускает только один общий refresh request.
3. Остальные запросы ждут его результат.
4. После успеха повторяются один раз с новым token.
5. При ошибке refresh очищается session и выполняется logout.

Нужно различать истекший token и отсутствие permissions. Счетчик/контекст запроса предотвращает повторный refresh loop.

</td></tr></table>

</details>

<details>
<summary>Как мокать HTTP в Angular-тестах?</summary><br>
<table><tr><td>

```ts
TestBed.configureTestingModule({
  providers: [provideHttpClient(), provideHttpClientTesting()],
});

const httpTesting = TestBed.inject(HttpTestingController);

service.getUser('42').subscribe((user) => expect(user.id).toBe('42'));

const request = httpTesting.expectOne('/api/users/42');
request.flush({id: '42', name: 'Ada'});
httpTesting.verify();
```

Тест проверяет method, URL, body, headers, mapping и error handling. Для development mocks используют отдельный mock
server, service worker mocking или proxy, не production interceptor.

</td></tr></table>

</details>

<details>
<summary>Как Angular-приложение взаимодействует с backend API?</summary><br>
<table><tr><td>

**Взаимодействие с API**

В экосистеме ангуляр существует пакет для общения с сервером (@angular/common/http), которого достаточно для
повседневной разработки. Его интерфейс основан на rxjs потоках, поэтому его легко использовать для работы с потоками
данных в приложении.

Кроме этого, как и в ванильной версии javascript, можно использовать XMLHttpRequest, fetch API, axios(или многие другие
библиотеки), но их использование вместо встроенного клиента, считается неоправданным и всячески возбраняется.

Существуют и другие способы взаимодействия с сервером(см. Веб-сокеты), но для них не существует каноничных встроенных
библиотек, поэтому используются сторонние библиотеки или собственные реалиации. Хорошей практикой здесь будет привести
интерфейс построенный на промисах и обратных вызовах(callback) к интерфейсу основанному на rxjs потоках, для
естественного использования в экосистеме Angular.

**Proxy**

Чтобы тестировать взаимодействие приложения с сервером, который должен находиться на том же домене, используется
<a href="https://angular.io/guide/build#proxying-to-a-backend-server"> функциональность в Angular CLI</a> для этого
нужно создать файл с конфигурацией прокси, где будут указаны:

- Контекст для проксирования
- Ссылка на работающий экземпляр API
- secure: false для работы в тестовой среде без сертификатов

Также большинство серверов не настроены для работы с разными
доменами(<a href="https://developer.mozilla.org/ru/docs/Web/HTTP/CORS">CORS</a>), поэтому для корректной работы на API
сервере, необходимо явно указать с какого домена(ов) можно принимать запросы.

</td></tr></table>

</details>

<details>
<summary>Что такое HTTP Interceptors?</summary><br>
<table><tr><td>

Interceptor — middleware для общих правил HTTP: auth headers, logging, timeout, retry, caching и индикаторы загрузки.

В Angular 19–22 рекомендуются функциональные interceptors: их порядок предсказуем и они могут использовать `inject()`.

```ts
export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = inject(AuthService).accessToken();
  const isApiRequest = request.url.startsWith(environment.apiUrl);

  if (token === null || !isApiRequest) {
    return next(request);
  }

  return next(
    request.clone({
      setHeaders: {Authorization: `Bearer ${token}`},
    }),
  );
};

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withInterceptors([authInterceptor, errorInterceptor]))],
};
```

Request и response immutable, поэтому запрос изменяют через `clone()`. Interceptors выполняются цепочкой в порядке
регистрации.

DI-based `HttpInterceptor` и `HTTP_INTERCEPTORS` остаются поддерживаемыми для legacy-кода, но для нового кода Angular
рекомендует functional interceptors.

</td></tr></table>

</details>

### Security

<details>
<summary>Как использовать Json Web Tokens для аутентификации при разработке на Angular?</summary><br>
<table><tr><td>

После входа сервер выдает access token, а клиент прикладывает его к API-запросам:

```ts
export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = inject(AuthService).accessToken();

  return next(token ? request.clone({setHeaders: {Authorization: `Bearer ${token}`}}) : request);
};
```

JWT состоит из header, payload и signature. Payload кодируется, но не шифруется, поэтому туда нельзя помещать секреты.

Практическая схема:

- короткоживущий access token хранится в памяти;
- refresh token безопаснее хранить в `HttpOnly`, `Secure`, `SameSite` cookie;
- refresh выполняется централизованно, с защитой от нескольких параллельных refresh-запросов;
- logout очищает сессию на сервере и локальное состояние;
- авторизацию всегда проверяет backend.

Route guard улучшает UX, но не является границей безопасности. Хранение долгоживущего токена в `localStorage` повышает
последствия XSS.

</td></tr></table>

</details>

<details>
<summary>Как обрабатываются атаки XSS и CSRF в Angular?</summary><br>
<table><tr><td>

**XSS** — выполнение внедренного злоумышленником кода. Angular экранирует интерполяцию и санитизирует значения в опасных
контекстах HTML и URL.

Правила защиты:

- не собирать шаблоны из пользовательских строк;
- не использовать прямой DOM API и `innerHTML` без необходимости;
- не вызывать `bypassSecurityTrust...` для недоверенных данных;
- включать CSP и Trusted Types;
- валидировать и экранировать данные также на сервере;
- не хранить чувствительные долгоживущие токены в доступном JavaScript хранилище.

**CSRF/XSRF** заставляет браузер авторизованного пользователя отправить нежелательный запрос, обычно с cookie. Защита:

- `SameSite` cookie;
- anti-CSRF token, который сервер выдает клиенту, а клиент возвращает в отдельном заголовке;
- проверка `Origin`/`Referer`;
- отсутствие изменений состояния через `GET`.

Angular `HttpClient` поддерживает XSRF-защиту для same-origin запросов с cookie, но backend должен корректно выдавать и
проверять токен.

</td></tr></table>

</details>

### Angular Router

<details>
<summary>Чем RouterLink, navigate() и navigateByUrl() отличаются?</summary><br>
<table><tr><td>

- `RouterLink` — декларативная доступная навигация в шаблоне.
- `navigate(commands, extras)` строит URL из command segments относительно route.
- `navigateByUrl(url, extras)` принимает готовый URL или `UrlTree`.

Для обычной ссылки используют `<a routerLink>`, сохраняя browser semantics. Programmatic navigation нужна после command:
submit, login, wizard step.

</td></tr></table>

</details>

<details>
<summary>Чем route params, query params и data отличаются?</summary><br>
<table><tr><td>

- Path params идентифицируют ресурс: `/users/:id`.
- Query params описывают фильтр, сортировку и pagination.
- Static `data` хранит route metadata.
- Resolver data загружается перед активацией.

`snapshot` подходит, если component instance гарантированно создается заново. При reuse одного компонента для другого
param значения подписываются на `paramMap`/`queryParamMap` или преобразуют их в signals.

</td></tr></table>

</details>

<details>
<summary>Когда resolver лучше загрузки внутри компонента?</summary><br>
<table><tr><td>

Resolver полезен, если route нельзя корректно показать без критических данных или redirect должен произойти до
активации.

Загрузка внутри компонента лучше, когда:

- данные необязательны;
- можно сразу показать shell/skeleton;
- запрос медленный;
- нужна независимая повторная загрузка.

Ошибку resolver обрабатывают локально через `catchError` с `RedirectCommand` или глобально через
`withNavigationErrorHandler()`.

</td></tr></table>

</details>

<details>
<summary>Что такое preloading strategy?</summary><br>
<table><tr><td>

Preloading загружает lazy chunks после initial navigation, чтобы будущий переход был быстрее.

- `NoPreloading` ничего не загружает заранее.
- `PreloadAllModules` загружает все lazy routes.
- Custom `PreloadingStrategy` учитывает route data, сеть, permissions и вероятность перехода.

Preloading не активирует route и не должен бесконтрольно загружать тяжелые admin features мобильному пользователю.

</td></tr></table>

</details>

<details>
<summary>Что такое nested, auxiliary routes и RouteReuseStrategy?</summary><br>
<table><tr><td>

Nested routes отображаются во вложенных `<router-outlet>` и наследуют часть route tree.

Auxiliary routes используют named outlets для независимых UI-областей, например persistent chat или side panel.

`RouteReuseStrategy` может detach и повторно attach route subtree, сохраняя component state. Это мощный, но сложный API:
нужно контролировать memory, invalidation и lifecycle. Часто состояние фильтра проще хранить в URL или feature store.

</td></tr></table>

</details>

<details>
<summary>Как тестировать Angular Router?</summary><br>
<table><tr><td>

Для integration-теста используют `RouterTestingHarness`:

```ts
TestBed.configureTestingModule({
  providers: [provideRouter(routes)],
});

const harness = await RouterTestingHarness.create();
await harness.navigateByUrl('/users/42', UserPage);

expect(harness.routeNativeElement?.textContent).toContain('Ada');
```

Отдельно тестируют functional guards/resolvers как функции в injection context. Проверяют URL, redirect, route inputs и
пользовательский результат, а не внутренние Router calls.

</td></tr></table>

</details>

<details>
<summary>Что такое роутинг и как его создать в Angular?</summary><br>
<table><tr><td>

Angular Router связывает URL с деревом активированных routes и компонентов. Современная standalone-конфигурация:

```ts
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadComponent: async () => (await import('./home/home.component')).HomeComponent,
  },
  {
    path: 'admin',
    canMatch: [adminGuard],
    providers: [AdminStore],
    loadChildren: async () => (await import('./admin/admin.routes')).ADMIN_ROUTES,
  },
  {path: '**', component: NotFoundComponent},
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withComponentInputBinding(), withPreloading(PreloadAllModules))],
};
```

В шаблоне используют `RouterLink`, `RouterLinkActive` и `<router-outlet />`. Для программного перехода —
`Router.navigate()` или `navigateByUrl()`.

`RouterModule.forRoot()` и `forChild()` остаются поддерживаемыми для NgModule-приложений.

</td></tr></table>

</details>

<details>
<summary>Каков жизненный цикл у Angular Router?</summary><br>
<table><tr><td>

Основные этапы успешной навигации:

1. `NavigationStart` — начало перехода.
2. `RoutesRecognized` — распознавание URL и redirects.
3. `GuardsCheckStart` / `GuardsCheckEnd` — выполнение guards.
4. `ResolveStart` / `ResolveEnd` — загрузка обязательных route data.
5. `ActivationStart` / `ActivationEnd` — активация компонентов в outlets.
6. `NavigationEnd` — успешное завершение.

Навигация также может завершиться событиями `NavigationCancel`, `NavigationSkipped` или `NavigationError`.

Современные guards и resolvers являются функциями:

```ts
export const authGuard: CanActivateFn = (_route, state) => {
  const auth = inject(AuthService);

  return auth.isAuthorized()
    ? true
    : inject(Router).createUrlTree(['/login'], {
        queryParams: {returnUrl: state.url},
      });
};

export const usersResolver: ResolveFn<ReadonlyArray<User>> = () => inject(UserApi).getUsers();
```

Guard должен вернуть `boolean`, `UrlTree`, `RedirectCommand`, Promise или Observable. Для redirect не нужно вызывать
`navigate()` внутри guard. Вместо старого `canLoad` используют `canMatch`.

</td></tr></table>

</details>

<details>
<summary>Что такое ленивая загрузка (Lazy-loading) и для чего она используется?</summary><br>
<table><tr><td>

Lazy-loading откладывает загрузку кода feature до момента, когда пользователь переходит на соответствующий route. Это
уменьшает initial bundle и ускоряет первую загрузку.

```ts
export const routes: Routes = [
  {
    path: 'orders',
    loadComponent: async () => (await import('./orders/orders.component')).OrdersComponent,
  },
  {
    path: 'admin',
    loadChildren: async () => (await import('./admin/admin.routes')).ADMIN_ROUTES,
  },
];
```

`loadComponent` загружает standalone-компонент, `loadChildren` — дочернюю конфигурацию routes или legacy-модуль.

Lazy-loading не означает, что каждый маленький компонент нужно выделить в отдельный chunk. Границы выбирают по
пользовательским сценариям и feature. Для вероятных следующих переходов можно настроить preloading.

</td></tr></table>

</details>

<details>
<summary>В чем разница между Routing и Navigation?</summary><br>
<table><tr><td>

**Routing** — конфигурация соответствия URL и состояния приложения: routes, параметры, guards, resolvers, outlets,
redirects и lazy-loading.

**Navigation** — конкретный процесс перехода из текущего URL/route state в новый. Он может начаться через `RouterLink`,
`router.navigate()`, кнопки браузера или изменение адреса.

Во время navigation Router распознает URL, выполняет redirects, guards и resolvers, активирует или переиспользует
компоненты, обновляет URL и публикует события. Навигация может завершиться успешно, быть отменена, пропущена или
завершиться ошибкой.

</td></tr></table>

</details>

<details>
<summary>Как загрузить данные до того как активируется роут?</summary><br>
<table><tr><td>

Для этого используется resolver. Современный вариант — функция `ResolveFn`.

```ts
export const userResolver: ResolveFn<User> = (route) => {
  const userId = route.paramMap.get('id');

  if (userId === null) {
    return inject(Router).parseUrl('/users');
  }

  return inject(UsersApi).getById(userId);
};

export const routes: Routes = [
  {
    path: 'users/:id',
    component: UserPageComponent,
    resolve: {user: userResolver},
  },
];
```

Router дождется значения или завершения Observable/Promise перед активацией route. Данные доступны через
`ActivatedRoute.data` или component input binding при соответствующей настройке Router.

Resolver подходит, когда экран нельзя корректно показать без данных. Для необязательных или медленных данных лучше
активировать страницу сразу и показать loading/skeleton, чтобы навигация не казалась зависшей.

</td></tr></table>

</details>

### Angular Forms

<details>
<summary>Чем Reactive Forms отличаются от template-driven forms?</summary><br>
<table><tr><td>

Reactive Forms создают model в TypeScript, дают typed controls, synchronous state и удобное тестирование. Они подходят
сложным формам и динамической структуре.

Template-driven forms создают model преимущественно через directives в шаблоне. Они удобны для небольших простых форм,
но хуже масштабируются.

В Angular 21–22 для нового signal-first кода доступны Signal Forms. Выбор зависит от версии и архитектуры существующего
проекта.

</td></tr></table>

</details>

<details>
<summary>Чем setValue отличается от patchValue и что делают emitEvent/onlySelf?</summary><br>
<table><tr><td>

- `setValue()` требует полную структуру control tree.
- `patchValue()` обновляет только переданные поля.
- `{emitEvent: false}` подавляет `valueChanges`, `statusChanges` и unified events.
- `{onlySelf: true}` не распространяет обновление validity/value к родителю.

Эти флаги используют осторожно: подавленное событие может оставить derived state несинхронизированным.

</td></tr></table>

</details>

<details>
<summary>Что такое ControlValueAccessor и когда писать свой CVA?</summary><br>
<table><tr><td>

`ControlValueAccessor` связывает Angular Forms с кастомным UI-контролом. Его пишут для date picker, rich editor, slider
или составного input, который должен работать с `formControl`, `formControlName` и `ngModel`.

Методы:

- `writeValue(value)` — получить значение модели;
- `registerOnChange(fn)` — сохранить callback изменения;
- `registerOnTouched(fn)` — сохранить callback touched;
- `setDisabledState(isDisabled)` — синхронизировать disabled.

Контрол регистрируется через multi-provider `NG_VALUE_ACCESSOR`. Нельзя вызывать `onChange` из `writeValue`, иначе
возникнет feedback loop.

</td></tr></table>

</details>

<details>
<summary>Как правильно реализовать disabled, touched и dirty в кастомном контроле?</summary><br>
<table><tr><td>

- `setDisabledState()` меняет доступность внутренних элементов.
- `onTouched()` вызывают при первом осмысленном blur/interaction.
- `onChange(value)` вызывают только при пользовательском изменении.
- `dirty` Angular устанавливает после `onChange`; вручную дублировать state обычно не нужно.
- Контрол должен сохранять keyboard navigation, label association и ARIA.

Для составного контрола нужно определить, когда группа считается touched и какое значение считается атомарным.

</td></tr></table>

</details>

<details>
<summary>Как строить nested и reusable forms без лишних подписок?</summary><br>
<table><tr><td>

Родитель может передать дочернему компоненту typed `FormGroup`, отдельные controls или доменную model. Дочерний reusable
control не должен искать родительскую форму через хрупкий DOM hierarchy без необходимости.

Derived validation и UI state лучше получать из control state или signals. Если нужна подписка на `valueChanges`,
используют `takeUntilDestroyed()`, `distinctUntilChanged()` и не создают одну подписку на каждую строку большого списка
без причины.

</td></tr></table>

</details>

<details>
<summary>Что такое FormGroup и FormControl и для чего они используются?</summary><br>
<table><tr><td>

В strictly typed Reactive Forms:

- `FormControl<T>` хранит значение, validation status и interaction state одного поля.
- `FormGroup<TControls>` объединяет именованные controls.
- `FormArray<TControl>` управляет динамическим списком controls.
- `FormRecord<TControl>` управляет группой с динамическими строковыми ключами.

```ts
readonly form = new FormGroup({
  email: new FormControl("", {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
  }),
  rememberMe: new FormControl(false, {nonNullable: true}),
});
```

`NonNullableFormBuilder` сокращает boilerplate. Типизированные формы доступны давно и должны использоваться без
`UntypedFormGroup`, если нет legacy-ограничений.

</td></tr></table>

</details>

<details>
<summary>Что такое реактивные формы в Angular?</summary><br>
<table><tr><td>

Reactive Forms — стабильный model-driven API на основе `AbstractControl`. Модель формы создается в TypeScript, имеет
синхронный доступ к value/status и Observable-потоки `valueChanges`/`statusChanges`.

В Angular 21+ также доступны Signal Forms из `@angular/forms/signals`. Они строятся вокруг signal-модели, `form()` и
директивы `[formField]`:

```ts
readonly loginModel = signal({
  email: "",
  password: "",
});

readonly loginForm = form(this.loginModel, (schema) => {
  required(schema.email);
  email(schema.email);
  required(schema.password);
});
```

```html
<input
  type="email"
  [formField]="loginForm.email"
/>
```

Signal Forms лучше подходят новым signal-first приложениям на Angular 21–22. Для Angular 19–20 и существующих
production-приложений strictly typed Reactive Forms остаются надежным выбором.

</td></tr></table>

</details>

<details>
<summary>Как применять валидацию для простых и сложных форм?</summary><br>
<table><tr><td>

В Reactive Forms валидаторы передают control при создании или через `setValidators`/`addValidators`.

- Синхронный `ValidatorFn` возвращает `ValidationErrors | null`.
- Асинхронный `AsyncValidatorFn` возвращает Promise/Observable и запускается после успешных синхронных проверок.
- Cross-field validator размещают на `FormGroup`.
- Ошибки показывают после `touched`/`dirty` или попытки submit, а не сразу при первом render.

```ts
const passwordsMatch: ValidatorFn = (control) => {
  const password = control.get('password')?.value;
  const confirmation = control.get('confirmation')?.value;

  return password === confirmation ? null : {passwordsMismatch: true};
};
```

Signal Forms используют schema validators: `required`, `email`, `minLength`, `validate`, `validateAsync` и правила для
cross-field logic.

Backend всегда повторно валидирует данные: frontend-валидация нужна для UX, а не является границей безопасности.

</td></tr></table>

</details>

### Performance

<details>
<summary>Как искать проблему производительности в Angular-приложении?</summary><br>
<table><tr><td>

Порядок работы:

1. Воспроизвести конкретный медленный сценарий.
2. Измерить Angular DevTools Profiler и Chrome Performance.
3. Определить bottleneck: network, JavaScript, change detection, layout, paint или memory.
4. Исправить наиболее дорогую причину.
5. Повторить измерение на production build и целевом устройстве.

Не следует начинать с `OnPush` или memoization без профиля. Частые причины: большой initial bundle, тяжелые списки,
template methods, layout thrashing и лишние запросы.

</td></tr></table>

</details>

<details>
<summary>Что такое initial bundle и как уменьшить bundle size?</summary><br>
<table><tr><td>

Initial bundle — JavaScript/CSS, необходимые для первой загрузки route.

Способы уменьшения:

- lazy routes и `@defer`;
- tree-shakable providers;
- удаление тяжелых/дублирующихся dependencies;
- точечные imports;
- production build и bundle budgets;
- проверка `sideEffects` библиотек;
- перенос необязательных polyfills и analytics из critical path.

Размер gzip/brotli важен, но также измеряют parse, compile и execution time.

</td></tr></table>

</details>

<details>
<summary>Что такое @defer и чем он отличается от lazy route?</summary><br>
<table><tr><td>

Lazy route откладывает целую route feature до навигации. `@defer` откладывает dependencies части текущего шаблона и
создает отдельный chunk.

<!-- prettier-ignore -->
```html
@defer (on viewport; prefetch on idle) {
  <app-heavy-chart />
} @placeholder {
  <div class="chart-skeleton"></div>
} @loading {
  <app-spinner />
} @error {
  <p>Не удалось загрузить график</p>
}
```

Triggers включают `idle`, `viewport`, `interaction`, `hover`, `timer` и `when`. Deferred dependencies должны быть
standalone и не использоваться eager в том же файле.

</td></tr></table>

</details>

<details>
<summary>Как оптимизировать большие списки?</summary><br>
<table><tr><td>

- стабильный `track item.id`;
- immutable updates;
- pagination или incremental loading;
- CDK virtual scroll для тысяч однотипных строк;
- отсутствие тяжелых методов и impure pipes в template;
- ограничение количества DOM nodes;
- OnPush/signals для локализации обновлений.

Virtual scroll нужен, когда DOM и rendering, а не загрузка данных, являются bottleneck. Для переменной высоты элементов
он сложнее и требует измерений.

</td></tr></table>

</details>

<details>
<summary>Что такое tree shaking и sideEffects в package.json?</summary><br>
<table><tr><td>

Tree shaking удаляет недостижимые ES module exports из production bundle.

`"sideEffects": false` сообщает bundler, что импорт файла не имеет обязательного побочного эффекта. Неверное значение
может удалить регистрацию custom elements, global styles или initialization code.

Angular libraries должны публиковать ESM, использовать tree-shakable providers и избегать выполнения логики на уровне
модуля.

</td></tr></table>

</details>

<details>
<summary>Как анализировать Angular bundle?</summary><br>
<table><tr><td>

Используют:

- CLI bundle budgets;
- build output и source maps;
- bundle visualizer/esbuild metafile совместимого builder;
- Chrome Coverage для неиспользуемого JS/CSS;
- сравнение до/после в CI.

Ищут крупные dependencies, дубликаты, случайно eager-loaded features, locale/data imports и библиотеки, которые можно
заменить browser API или точечным import.

</td></tr></table>

</details>

### SSR, hydration и SEO

<details>
<summary>Чем CSR, SSR и SSG отличаются?</summary><br>
<table><tr><td>

- CSR рендерит приложение в браузере после загрузки JavaScript.
- SSR генерирует HTML на сервере для каждого запроса.
- SSG/prerender генерирует HTML во время build.

SSR подходит динамическим SEO-страницам, SSG — статичному контенту, CSR — внутренним приложениям без SEO. Angular
поддерживает hybrid route-level render modes.

</td></tr></table>

</details>

<details>
<summary>Что такое hydration и какие проблемы она решает?</summary><br>
<table><tr><td>

Hydration подключает Angular к уже существующему server-rendered DOM вместо полного пересоздания.

Плюсы:

- меньше flicker;
- сохранение SSR HTML;
- улучшение LCP/CLS;
- event replay до завершения hydration.

Incremental hydration позволяет активировать deferred части позже. HTML сервера и клиента должен быть детерминированным,
иначе возникает hydration mismatch.

</td></tr></table>

</details>

<details>
<summary>Почему browser-only код нельзя выполнять на сервере?</summary><br>
<table><tr><td>

На сервере browser globals отсутствуют. Безопасные варианты:

- platform-neutral Angular APIs;
- DI abstraction для browser service;
- выполнение DOM-кода в `afterNextRender()`;
- проверка platform только на границе интеграции;
- lazy import browser-only библиотеки.

Компонент не должен генерировать разный initial DOM на сервере и клиенте без предусмотренного механизма.

</td></tr></table>

</details>

<details>
<summary>Что такое TransferState и HTTP transfer cache?</summary><br>
<table><tr><td>

TransferState передает сериализованные данные из server render клиенту, чтобы не повторять запрос сразу после hydration.

Angular SSR интегрирует transfer cache с `HttpClient` для подходящих GET/HEAD запросов. Нужно учитывать персональные
данные, auth headers, размер HTML и invalidation. Не все API responses безопасно встраивать в документ.

</td></tr></table>

</details>

<details>
<summary>Когда SSR не нужен?</summary><br>
<table><tr><td>

SSR может не окупиться для:

- auth-only dashboard;
- приложения без поискового трафика;
- тяжелого интерактивного editor;
- продукта, где server cost и complexity выше выигрыша первого render.

SSR улучшает delivery HTML, но не уменьшает автоматически client JavaScript. Решение принимают по SEO, Core Web Vitals,
инфраструктуре и пользовательскому сценарию.

</td></tr></table>

</details>

<details>
<summary>В чем разница между Angular CLI и Webpack Development Environment?</summary><br>
<table><tr><td>

Angular CLI — официальный интерфейс для создания, запуска, тестирования, обновления и сборки Angular-проектов. Он
управляет workspace-конфигурацией и вызывает настроенный builder.

Webpack — универсальный bundler. Исторически Angular CLI использовал Webpack внутри, но это деталь реализации:
современные builders могут использовать другие инструменты, например esbuild/Vite-based development server.

CLI дает:

- `ng new`, `ng generate`, `ng serve`, `ng build`, `ng test`, `ng update`;
- Angular-aware компиляцию шаблонов и AOT;
- production-оптимизации, budgets, environments и asset pipeline;
- согласованную конфигурацию и migrations.

Ручная Webpack-конфигурация дает больше низкоуровневого контроля, но увеличивает стоимость поддержки и обновлений. В
Angular-проекте сначала используют возможности CLI и custom builder, а eject/собственный pipeline выбирают только при
реальной необходимости.

</td></tr></table>

</details>

<details>
<summary>Что такое JIT и AOT, в чем их отличия и каковы сферы применения?</summary><br>
<table><tr><td>

**AOT** компилирует templates и decorators во время сборки. В современных Angular CLI проектах AOT является стандартным
режимом и для `ng build`, и для development server.

Плюсы AOT:

- ошибки шаблонов обнаруживаются при сборке;
- браузеру не нужен Angular compiler;
- меньше runtime-работы и лучше startup;
- доступны template type checking и production optimizations.

**JIT** компилирует Angular declarations во время выполнения. Он нужен редко: для специальных динамических сценариев,
tooling или legacy-конфигураций. Для обычной разработки переключаться на JIT не требуется.

`--prod` больше не является актуальным способом объяснять AOT. Используют named configurations, например
`ng build --configuration production`.

</td></tr></table>

</details>

### Testing

<details>
<summary>Что тестировать в Angular-компоненте, а что не нужно?</summary><br>
<table><tr><td>

Тестируют публичное поведение:

- rendered content и accessibility;
- реакцию на user events;
- inputs/outputs;
- loading/error/empty states;
- интеграцию с forms, Router и services.

Не тестируют Angular framework, private methods, внутреннее количество signals или точную структуру реализации без
контрактной причины.

</td></tr></table>

</details>

<details>
<summary>Как тестировать standalone component и мокать service?</summary><br>
<table><tr><td>

```ts
TestBed.configureTestingModule({
  imports: [UserCardComponent],
  providers: [{provide: UserApi, useValue: userApiStub}],
});
```

Standalone component добавляют в `imports`. При необходимости dependency собственного import компонента заменяют через
`TestBed.overrideComponent()`.

</td></tr></table>

</details>

<details>
<summary>Чем fakeAsync/tick отличается от waitForAsync?</summary><br>
<table><tr><td>

`fakeAsync()` виртуализирует timers и microtasks; `tick()` продвигает время, `flush()` очищает очередь.

`waitForAsync()` использует реальную async completion и `fixture.whenStable()`.

`fakeAsync` удобен для debounce/timers, но не поддерживает все browser APIs. В zoneless и signal-based тестах часто
достаточно `await fixture.whenStable()`.

</td></tr></table>

</details>

<details>
<summary>Как тестировать CVA и формы?</summary><br>
<table><tr><td>

CVA лучше тестировать через host form:

- model value попадает в control;
- пользовательское действие вызывает value update;
- blur передает touched;
- disabled state блокирует interaction;
- validation и keyboard behavior работают.

Отдельный вызов методов CVA не заменяет integration-тест с `FormControl`.

</td></tr></table>

</details>

<details>
<summary>Почему E2E-тесты флакают и как уменьшить flaky tests?</summary><br>
<table><tr><td>

Причины: sleeps, нестабильные данные, race conditions, animation, зависимость от порядка, слабые selectors.

Решения:

- locators по role/label/test id вместо CSS-классов;
- ожидание observable UI state, а не timeout;
- изолированные test data;
- deterministic network mocks;
- trace/screenshot/video при retry;
- исправление причины, а не увеличение retries.

Behavioral assertions важнее screenshot tests; screenshots полезны для ограниченного visual regression.

</td></tr></table>

</details>

<details>
<summary>Как организовать frontend tests в CI?</summary><br>
<table><tr><td>

Обычно:

1. Type check, lint и unit tests.
2. Build production.
3. Component/integration tests.
4. E2E по критическим flows в нескольких browsers.
5. Coverage и artifacts без превращения процента в самоцель.

Тесты параллелят, кешируют dependencies/build, сохраняют trace и разделяют быстрый PR pipeline с более широким nightly
suite.

</td></tr></table>

</details>

<details>
<summary>Какие виды тестирования используют в Angular?</summary><br>
<table><tr><td>

- **Unit-тест** проверяет небольшую единицу: функцию, pipe, service или компонент с изолированными зависимостями. Он
  быстрый и точно локализует ошибку.
- **Интеграционный тест** проверяет совместную работу нескольких частей: компонент с шаблоном, DI, Router или
  HTTP-слоем.
- **E2E-тест** запускает приложение в браузере и проверяет пользовательский сценарий через UI, часто вместе с реальным
  или тестовым backend.

В Angular unit/integration-тесты обычно используют TestBed, spies/fakes, HTTP testing utilities и Router testing
harness. E2E выполняют Playwright или Cypress.

Основу набора составляют быстрые unit и integration-тесты. E2E оставляют для критических сквозных сценариев: вход,
checkout, создание сущности. Тестируют наблюдаемое поведение, а не приватные методы и внутреннюю структуру компонента.

</td></tr></table>

</details>

<details>
<summary>Что такое Karma, Jasmine (зачем их используют совместно при разработке на Angular)?</summary><br>
<table><tr><td>

Это разные части тестового стека:

- **Jasmine** — test framework: `describe`, `it`, expectations, spies и hooks.
- **Karma** — test runner, который запускает тестовый bundle в браузерах, собирает результаты и следит за файлами.

Их использовали совместно, потому что Jasmine описывал тесты, а Karma предоставлял браузерное окружение и запуск.

Это исторически популярная конфигурация Angular CLI, но не единственный современный вариант. Проект может использовать
Vitest, Jest или другой runner. При выборе важны скорость, browser fidelity, поддержка Angular, debugging и интеграция с
CI.

</td></tr></table>

</details>

<details>
<summary>В чем разница между Jest и Karma?</summary><br>
<table><tr><td>

Сравнение не полностью симметрично:

- Karma — runner для запуска тестов в реальных браузерах.
- Jest — test framework и runner с assertions, mocks, coverage и обычно DOM-эмуляцией через jsdom.

Jest часто быстрее и проще для unit-тестов благодаря параллельному запуску, watch mode и встроенным инструментам. Karma
дает настоящее браузерное окружение, но обычно запускается и настраивается тяжелее.

Эмуляция DOM не воспроизводит все особенности layout, CSS и browser API. Поэтому даже при Jest/Vitest нужны component
integration и E2E-тесты в реальном браузере для поведения, зависящего от платформы.

</td></tr></table>

</details>

<details>
<summary>В чем разница между Protractor и Cypress?</summary><br>
<table><tr><td>

Protractor был Angular-ориентированным E2E-инструментом поверх WebDriver и умел автоматически ожидать Angular stability.
Проект Protractor снят с поддержки и не должен выбираться для новых приложений.

Cypress работает через собственный browser runner, дает удобный time-travel UI, автоматические ожидания, network
stubbing и хорошую диагностику. Его модель выполнения отличается от обычного WebDriver и имеет собственные ограничения,
например при работе с несколькими вкладками и некоторыми cross-origin сценариями.

Современная альтернатива также Playwright: он управляет Chromium, Firefox и WebKit, поддерживает несколько контекстов,
вкладок и параллельный запуск.

Для существующего проекта миграция должна сохранять критические сценарии и постепенно заменять Protractor-тесты, а не
переписывать весь набор одним большим изменением.

</td></tr></table>

</details>

<details>
<summary>Как протестировать входные параметры и всплывающие события компонентов?</summary><br>
<table><tr><td>

Лучше тестировать компонент через его публичный API и DOM.

```ts
it('renders the input and emits selection', () => {
  const fixture = TestBed.createComponent(UserCardComponent);
  const selected: string[] = [];

  fixture.componentRef.setInput('name', 'Alex');
  fixture.componentInstance.selected.subscribe((id) => selected.push(id));
  fixture.detectChanges();

  expect(fixture.nativeElement.textContent).toContain('Alex');

  fixture.nativeElement.querySelector('button').click();

  expect(selected).toEqual(['user-1']);
});
```

Для signal input используется тот же `componentRef.setInput()`. Output можно проверить подпиской на публичный output или
через host-компонент, если важен реальный template binding.

После изменения input нужно запустить change detection. Не следует напрямую вызывать приватные методы: клик по доступной
кнопке лучше отражает контракт компонента.

</td></tr></table>

</details>

### Angular libraries и design systems

<details>
<summary>Чем library code отличается от application code?</summary><br>
<table><tr><td>

Application знает конкретный продукт, routes, backend и окружение. Library должна работать в разных приложениях и
версиях конфигурации.

Для библиотеки важнее:

- узкий public API;
- backward compatibility;
- accessibility и theming;
- отсутствие product-specific dependencies;
- tree shaking и peer dependencies;
- migrations и документация.

</td></tr></table>

</details>

<details>
<summary>Что такое public API Angular library и почему нельзя экспортировать все?</summary><br>
<table><tr><td>

Public API — imports, components, directives, tokens и types, которые библиотека обещает поддерживать.

Экспорт внутренних helpers:

- связывает руки рефакторингу;
- увеличивает документацию и test surface;
- создает случайные зависимости пользователей;
- усложняет breaking changes.

Потребители импортируют только из package entry points, а не из внутренних путей.

</td></tr></table>

</details>

<details>
<summary>Что такое breaking change и как версионировать библиотеку?</summary><br>
<table><tr><td>

Breaking change требует изменения кода потребителя: удаление export, изменение selector/input, поведения, CSS contract
или поддерживаемых версий.

Semantic Versioning:

- patch — совместимое исправление;
- minor — совместимая функциональность;
- major — breaking changes.

Перед major нужны deprecation period, migration guide, schematics и automated tests совместимости.

</td></tr></table>

</details>

<details>
<summary>Почему Angular должен быть peerDependency библиотеки?</summary><br>
<table><tr><td>

`peerDependencies` сообщает, что библиотека использует Angular instance приложения. Если положить Angular в обычные
`dependencies`, потребитель может получить дубли framework packages, DI/runtime incompatibility и больший bundle.

Диапазон peer dependency должен отражать реально протестированные версии. Runtime dependencies оставляют только для
библиотек, которые действительно должны поставляться вместе с package.

</td></tr></table>

</details>

<details>
<summary>Как проектировать конфигурируемый Angular-компонент?</summary><br>
<table><tr><td>

Локальные параметры передают inputs. Общую конфигурацию библиотеки предоставляют через typed `InjectionToken` и provider
factory:

```ts
export const provideUiConfig = (config: UiConfig): EnvironmentProviders =>
  makeEnvironmentProviders([{provide: UI_CONFIG, useValue: config}]);
```

Defaults должны быть явными, config — readonly, а локальный input может переопределять глобальное значение. Не следует
превращать один компонент в десятки boolean flags; варианты моделируют union types.

</td></tr></table>

</details>

<details>
<summary>Как проектировать theme, icon и overlay API?</summary><br>
<table><tr><td>

- Theme API опирается на semantic CSS custom properties/tokens, а не внутренние selectors.
- Icon API принимает понятный identifier или injectable registry и поддерживает tree shaking.
- Overlay API разделяет content, position, lifecycle, focus management и escape/outside click.
- Dialog/dropdown должны иметь keyboard navigation, focus trap/restore и ARIA contract.

Для overlay primitives предпочтителен Angular CDK, если библиотека не решает более низкоуровневую задачу.

</td></tr></table>

</details>

<details>
<summary>Что такое secondary entry points и когда они нужны?</summary><br>
<table><tr><td>

Secondary entry point позволяет импортировать отдельную область:

```ts
import {Dialog} from '@company/ui/dialog';
```

Он полезен для независимых feature packages и optional dependencies. Слишком много entry points увеличивает build,
release и compatibility surface.

Entry points не должны образовывать cycles и импортировать внутренности друг друга в обход публичных границ.

</td></tr></table>

</details>

<details>
<summary>Зачем Angular library нужны migrations и schematics?</summary><br>
<table><tr><td>

Schematics автоматизируют изменения workspace и consumer code. Migration нужна, когда новая версия меняет API,
selectors, imports или конфигурацию.

Хорошая migration:

- идемпотентна;
- сохраняет форматирование и комментарии;
- имеет fixtures/snapshot tests;
- сообщает о случаях, которые нельзя исправить автоматически;
- не меняет несвязанный код.

</td></tr></table>

</details>

<details>
<summary>Как документировать и тестировать component library?</summary><br>
<table><tr><td>

Для каждого public component нужны:

- назначение и ограничения;
- imports/providers;
- inputs, outputs и examples;
- accessibility и keyboard behavior;
- theming contract;
- migration/deprecation notes.

Тестируют behavior, harness API, forms integration, overlays, SSR и visual states. Demo/documentation app одновременно
служит integration consumer, но не заменяет automated tests.

</td></tr></table>

</details>

### Micro Frontends

Практический пример: [`examples/micro-frontends`](./examples/micro-frontends).

В этом демо можно увидеть:

- host/shell приложение [`movie-ticket`](./examples/micro-frontends/movie-ticket);
- remote widgets [`movies`](./examples/micro-frontends/movies) и
  [`ticket-availability`](./examples/micro-frontends/ticket-availability);
- federation manifest и `remoteEntry.json`;
- runtime loading и host orchestration через Angular inputs/outputs;
- независимые loading/error states и fallback UI;
- SSR-safe browser-only mounting через `afterNextRender()`.

Инструкции по запуску находятся в [`examples/micro-frontends/README.md`](./examples/micro-frontends/README.md).

#### Базовые понятия

<details>
<summary>Что такое микрофронтенды и какую проблему они решают?</summary><br>
<table><tr><td>

Микрофронтенды разделяют frontend на автономные части, за которые могут отвечать разные команды. Они помогают независимо
разрабатывать и выпускать крупные продуктовые области, но добавляют распределенные контракты, инфраструктуру и риски
времени выполнения.

</td></tr></table>

</details>

<details>
<summary>Чем микрофронтенд отличается от обычного lazy-loaded Angular route?</summary><br>
<table><tr><td>

Lazy route остается частью одной сборки и одного release-процесса. Микрофронтенд может собираться, размещаться и
загружаться отдельно, поэтому его версия и доступность не обязательно совпадают с host.

</td></tr></table>

</details>

<details>
<summary>Что такое shell/host application?</summary><br>
<table><tr><td>

Host — приложение-контейнер. Оно задает общий layout, навигацию, интеграционные контракты и загружает remote-модули или
виджеты, а также обрабатывает их loading и error states.

</td></tr></table>

</details>

<details>
<summary>Что такое remote application?</summary><br>
<table><tr><td>

Remote — отдельно собираемое приложение, которое публикует доступные host части через federation metadata. Оно должно
иметь явный публичный контракт и по возможности не зависеть от внутренних деталей host.

</td></tr></table>

</details>

<details>
<summary>Когда микрофронтенды оправданы, а когда это лишнее усложнение?</summary><br>
<table><tr><td>

Они оправданы при нескольких автономных командах, независимых release cycles и устойчивых domain boundaries. Для
небольшой команды, единого продукта и общего деплоя modular monolith обычно дешевле и надежнее.

</td></tr></table>

</details>

<details>
<summary>Какие минусы есть у микрофронтенд-архитектуры?</summary><br>
<table><tr><td>

Основные минусы: сложнее локальная разработка, тестирование, наблюдаемость, versioning, shared state, согласование UX,
SSR и rollback. Также возможны дубли dependencies и дополнительная задержка runtime-загрузки.

</td></tr></table>

</details>

<details>
<summary>Почему микрофронтенды часто сложнее монолита?</summary><br>
<table><tr><td>

В монолите компилятор и единая сборка проверяют большую часть связей заранее. В микрофронтендах часть ошибок проявляется
только при интеграции конкретных независимо развернутых версий через сеть.

</td></tr></table>

</details>

<details>
<summary>Что такое independent deployment?</summary><br>
<table><tr><td>

Это возможность выпустить remote без обязательной пересборки и публикации host или других remote. Для этого нужны
совместимые контракты, отдельные pipelines, контролируемые URL и стратегия rollback.

</td></tr></table>

</details>

<details>
<summary>Какие границы микрофронтендов бывают: route-level, widget-level, domain-level?</summary><br>
<table><tr><td>

Route-level делит приложение по страницам, widget-level встраивает независимые блоки в одну страницу, domain-level
следует бизнес-областям. Domain boundary описывает ответственность, а route и widget — способ композиции UI.

</td></tr></table>

</details>

<details>
<summary>Чем route-level federation отличается от widget-level federation?</summary><br>
<table><tr><td>

Route-level загружает крупный экран при навигации и обычно проще изолирует команды. Widget-level компонует несколько
remote на одной странице, поэтому требует более точной оркестрации, layout-контрактов и независимых состояний ошибки.

</td></tr></table>

</details>

#### Native Federation и runtime loading

<details>
<summary>Что такое Native Federation?</summary><br>
<table><tr><td>

Native Federation — подход к runtime-композиции приложений на основе стандартных ES modules и import maps. Инструменты
генерируют metadata и согласуют shared dependencies, а браузер загружает модули без webpack runtime.

</td></tr></table>

</details>

<details>
<summary>Что такое <code>remoteEntry.json</code>?</summary><br>
<table><tr><td>

Это сгенерированный entry-файл remote с описанием exposed modules, shared packages и связанных chunks. Host читает его,
чтобы понять, откуда загрузить запрошенный export.

</td></tr></table>

</details>

<details>
<summary>Что такое federation manifest?</summary><br>
<table><tr><td>

Manifest — карта логических имен remote на URL их `remoteEntry.json`. Она отделяет код host от адресов окружения и
позволяет менять расположение remote без пересборки host, если manifest поставляется отдельно.

</td></tr></table>

</details>

<details>
<summary>Зачем host-приложению нужен manifest remote-приложений?</summary><br>
<table><tr><td>

Host использует manifest для разрешения имени remote в конкретный URL. Один и тот же build host может получать разные
адреса для local, stage, production или canary окружений.

</td></tr></table>

</details>

<details>
<summary>Чем runtime-загрузка remote отличается от обычного static import?</summary><br>
<table><tr><td>

Static import известен во время сборки и попадает в dependency graph общего bundle. Runtime-загрузка разрешает модуль
после запуска приложения, поэтому требует сетевой обработки ошибок и runtime-проверки контракта.

</td></tr></table>

</details>

<details>
<summary>Что делает <code>initFederation()</code>?</summary><br>
<table><tr><td>

`initFederation()` загружает federation metadata, подготавливает shared dependencies и import maps до bootstrap
приложения. После инициализации host может обращаться к remote по логическому имени.

</td></tr></table>

</details>

<details>
<summary>Что делает <code>loadRemoteModule()</code>?</summary><br>
<table><tr><td>

`loadRemoteModule()` находит remote через ранее загруженную конфигурацию, загружает его entry и exposed module, затем
возвращает namespace ES module. Наличие ожидаемого export приложение проверяет отдельно.

</td></tr></table>

</details>

<details>
<summary>Что такое shared dependencies?</summary><br>
<table><tr><td>

Это packages, которые host и remotes договариваются использовать совместно вместо загрузки отдельных копий. Sharing
уменьшает bundle, но требует совместимых версий и корректной настройки singleton-пакетов.

</td></tr></table>

</details>

<details>
<summary>Зачем нужны <code>singleton</code>, <code>strictVersion</code> и <code>requiredVersion</code>?</summary><br>
<table><tr><td>

`singleton` требует один runtime instance package, `requiredVersion` задает допустимую версию, а `strictVersion`
запрещает несовместимый fallback. Вместе они делают конфликт версий явной ошибкой вместо скрытого повреждения runtime.

</td></tr></table>

</details>

<details>
<summary>Что может пойти не так, если host и remote используют разные версии Angular?</summary><br>
<table><tr><td>

Возможны несовместимые runtime contracts, несколько Angular instances, ошибки DI, rendering и signals. Допустимость
версий должна проверяться federation-конфигурацией, CI и integration tests.

</td></tr></table>

</details>

<details>
<summary>Почему Angular и RxJS обычно шарят как singleton?</summary><br>
<table><tr><td>

Angular ожидает согласованный framework runtime и injector graph, а разделяемые RxJS-контракты проще поддерживать с
одной совместимой копией. Несколько версий увеличивают bundle и риск несовместимости типов и поведения.

</td></tr></table>

</details>

<details>
<summary>Что такое import map?</summary><br>
<table><tr><td>

Import map сопоставляет bare module specifiers с URL ES modules в браузере. Native Federation может формировать такую
карту для shared packages и remote-зависимостей.

</td></tr></table>

</details>

<details>
<summary>Почему браузер может не зарезолвить bare specifier вроде <code>@softarc/native-federation-orchestrator</code>?</summary><br>
<table><tr><td>

Браузер не знает npm resolution. Для bare specifier должен существовать import map или bundler-преобразование; иначе
возникает ошибка разрешения модуля. Также import map должна быть загружена до первого import.

</td></tr></table>

</details>

<details>
<summary>Почему deprecated API не всегда означает, что код немедленно сломан?</summary><br>
<table><tr><td>

Deprecated API пока может оставаться совместимым, но больше не рекомендуется и может быть удален позже. Нужно проверить
версию, migration path и фактическое поведение, а не заменять API вслепую.

</td></tr></table>

</details>

#### Dynamic components

<details>
<summary>Как динамически создать Angular-компонент через <code>ViewContainerRef.createComponent()</code>?</summary><br>
<table><tr><td>

Нужно получить `ViewContainerRef`, загрузить `Type<T>` компонента и вызвать `container.createComponent(componentType)`.
Метод вставит host view в контейнер и вернет `ComponentRef<T>` для дальнейшей настройки.

</td></tr></table>

</details>

<details>
<summary>Что такое <code>ComponentRef</code>?</summary><br>
<table><tr><td>

`ComponentRef` — ссылка на созданный экземпляр компонента и его host view. Через нее доступны `instance`, `setInput()`,
`changeDetectorRef`, lifecycle callback `onDestroy()` и метод `destroy()`.

</td></tr></table>

</details>

<details>
<summary>Как передать input в динамически созданный компонент?</summary><br>
<table><tr><td>

После создания вызывают `componentRef.setInput('inputName', value)`. Имя должно совпадать с публичным input или его
alias, а передаваемое значение — с интеграционным контрактом remote.

</td></tr></table>

</details>

<details>
<summary>Почему <code>ComponentRef.setInput()</code> лучше прямого присваивания свойства?</summary><br>
<table><tr><td>

`setInput()` проходит через Angular input pipeline, корректно обновляет signal inputs, учитывает transforms и помечает
view для проверки. Прямое присваивание обходит этот контракт и может не запустить ожидаемое обновление.

</td></tr></table>

</details>

<details>
<summary>Как подписаться на output динамически созданного компонента?</summary><br>
<table><tr><td>

Нужно получить публичный output с `componentRef.instance` и вызвать `subscribe()`. Подписку следует связать с lifecycle
компонента или host, например отписаться в callback `componentRef.onDestroy()`.

</td></tr></table>

</details>

<details>
<summary>Как правильно уничтожать динамически созданные компоненты?</summary><br>
<table><tr><td>

Компонент уничтожают через `ComponentRef.destroy()` или очистку владеющего `ViewContainerRef`. Одновременно нужно
освободить внешние subscriptions, listeners и другие ресурсы, которые Angular не контролирует.

</td></tr></table>

</details>

<details>
<summary>Зачем хранить <code>ComponentRef</code> и вызывать <code>destroy()</code>?</summary><br>
<table><tr><td>

Ссылка нужна для последующих inputs, подписки на outputs и явного lifecycle management. Без уничтожения могут остаться
view, subscriptions и ссылки на данные, что приводит к утечкам и повторной обработке событий.

</td></tr></table>

</details>

<details>
<summary>Почему <code>viewChild.required()</code> нельзя вызывать слишком рано?</summary><br>
<table><tr><td>

Query signal получает значение только после создания соответствующего элемента view. Чтение до завершения render
приведет к ошибке required query, поэтому DOM-зависимую работу откладывают до подходящей render phase.

</td></tr></table>

</details>

<details>
<summary>Зачем иногда передают <code>getContainer: () => ViewContainerRef</code>, а не сам <code>ViewContainerRef</code>?</summary><br>
<table><tr><td>

Функция откладывает чтение query до момента фактического монтирования. Это полезно, когда loader настраивается раньше,
чем Angular создал template container.

</td></tr></table>

</details>

#### Коммуникация между remote-приложениями

<details>
<summary>Как remote-приложения могут общаться между собой?</summary><br>
<table><tr><td>

Через host orchestration, URL, backend, shared event bus или browser events. Выбор зависит от lifetime состояния,
необходимости deep link, надежности и допустимой связанности между командами.

</td></tr></table>

</details>

<details>
<summary>Почему прямое общение remote-to-remote может быть проблемой?</summary><br>
<table><tr><td>

Один remote начинает знать API и lifecycle другого, из-за чего их нельзя независимо заменить или загрузить. Такая связь
также усложняет versioning, тестирование и обработку частичной недоступности.

</td></tr></table>

</details>

<details>
<summary>Что такое host orchestration?</summary><br>
<table><tr><td>

Host принимает события remote, применяет общую бизнес-навигацию и передает данные другим remote через их публичные
контракты. Remote при этом не импортируют и не ищут друг друга напрямую.

</td></tr></table>

</details>

<details>
<summary>Как host может связать output одного remote с input другого remote?</summary><br>
<table><tr><td>

Host подписывается на output первого `ComponentRef`, а в обработчике вызывает `setInput()` второго. В демо
`movieSelected` передает выбранный фильм в input `movie` виджета доступности билетов.

</td></tr></table>

</details>

<details>
<summary>Чем <code>CustomEvent</code> отличается от Angular <code>output()</code> / <code>input()</code> через host?</summary><br>
<table><tr><td>

Angular inputs/outputs типизированы и привязаны к component lifecycle. `CustomEvent` распространяется через DOM или
`window`, доступен вне Angular, но использует строковые имена и требует ручного listener management.

</td></tr></table>

</details>

<details>
<summary>Какие плюсы и минусы у коммуникации через <code>window.dispatchEvent()</code>?</summary><br>
<table><tr><td>

Плюсы — слабая технологическая связанность и простой межфреймворковый transport. Минусы — глобальное пространство имен,
слабая типизация, неявный поток данных, ручная очистка listeners и отсутствие browser globals при SSR.

</td></tr></table>

</details>

<details>
<summary>Почему <code>window.addEventListener()</code> может быть проблемой при SSR?</summary><br>
<table><tr><td>

На сервере `window` отсутствует, поэтому регистрация listener во время server render завершится ошибкой. Ее выполняют
только в browser phase и обязательно снимают при уничтожении владельца.

</td></tr></table>

</details>

<details>
<summary>Когда стоит использовать shared event bus?</summary><br>
<table><tr><td>

Когда нескольким независимо загружаемым частям нужен ограниченный набор асинхронных domain events. Bus должен иметь
версионированные типы, владельца и правила lifecycle, иначе он быстро превращается в неявное глобальное состояние.

</td></tr></table>

</details>

<details>
<summary>Когда лучше использовать URL/query params для состояния?</summary><br>
<table><tr><td>

Для состояния навигации, фильтров и выбранных сущностей, которое должно поддерживать deep link, back/forward и
перезагрузку страницы. Секретные или большие данные в URL помещать не следует.

</td></tr></table>

</details>

<details>
<summary>Когда состояние лучше хранить на backend?</summary><br>
<table><tr><td>

Когда оно должно переживать сессии, быть общим для устройств или пользователей, участвовать в транзакциях и иметь
серверную авторизацию. Frontend тогда хранит только идентификатор и локальное представление.

</td></tr></table>

</details>

<details>
<summary>Почему для микрофронтендов важны явные контракты?</summary><br>
<table><tr><td>

Remote выпускаются независимо, поэтому inputs, outputs, exposed modules и payload schemas заменяют compile-time связь.
Явные контракты можно версионировать, тестировать и сохранять совместимыми.

</td></tr></table>

</details>

#### Loading, error states и fallback

<details>
<summary>Что произойдет, если один remote недоступен?</summary><br>
<table><tr><td>

Его entry или chunks не загрузятся, и операция вернет ошибку. Host должен локализовать сбой в соответствующем slot,
показать fallback и не блокировать независимые части страницы.

</td></tr></table>

</details>

<details>
<summary>Чем required remote отличается от optional remote?</summary><br>
<table><tr><td>

Без required remote основной сценарий не имеет смысла, поэтому host может показать page-level error. Optional remote
дополняет сценарий: при сбое его slot скрывают или заменяют fallback, сохраняя остальную страницу.

</td></tr></table>

</details>

<details>
<summary>Почему <code>Promise.all()</code> может быть опасен при загрузке нескольких независимых remote?</summary><br>
<table><tr><td>

Он отклоняется после первой ошибки и не возвращает успешные результаты остальных promises. Если виджеты независимы,
общая операция может ошибочно превратить частичный сбой в отказ всей композиции.

</td></tr></table>

</details>

<details>
<summary>Когда лучше использовать <code>Promise.allSettled()</code>?</summary><br>
<table><tr><td>

Когда каждый remote имеет собственный loading/error state и успешные виджеты должны продолжить работу. Результаты
`fulfilled` и `rejected` обрабатывают по отдельности.

</td></tr></table>

</details>

<details>
<summary>Как host должен показывать loading/error state для каждого remote slot?</summary><br>
<table><tr><td>

Каждый slot имеет стабильный контейнер, собственный индикатор загрузки, доступное сообщение об ошибке и при
необходимости retry. Ошибка одного slot не должна визуально маскировать состояние другого.

</td></tr></table>

</details>

<details>
<summary>Почему у каждого remote widget должен быть свой status: <code>idle</code>, <code>loading</code>, <code>ready</code>, <code>error</code>?</summary><br>
<table><tr><td>

Явная state machine исключает неоднозначные комбинации boolean flags и упрощает template control flow. Она также
позволяет отдельно измерять время загрузки, ошибки и повторные попытки каждого remote.

</td></tr></table>

</details>

<details>
<summary>Что должен делать host, если <code>movies</code> загрузился, а <code>ticket-availability</code> нет?</summary><br>
<table><tr><td>

Показать список фильмов и fallback в slot доступности. Выбор фильма можно сохранить, но действие, зависящее от второго
remote, нужно отключить или объяснить пользователю.

</td></tr></table>

</details>

<details>
<summary>Что должен делать host, если <code>ticket-availability</code> загрузился, а <code>movies</code> нет?</summary><br>
<table><tr><td>

Показать fallback списка фильмов. Виджет доступности может остаться в empty state, если без выбранного фильма он не
имеет самостоятельного сценария.

</td></tr></table>

</details>

<details>
<summary>Как добавить retry для недоступного remote?</summary><br>
<table><tr><td>

Host повторно переводит конкретный slot в `loading` и запускает его mount после действия пользователя или ограниченного
backoff. Перед retry нужно очистить прежний `ComponentRef`, error и незавершенные subscriptions.

</td></tr></table>

</details>

<details>
<summary>Где лучше хранить статусы remote-виджетов: в компоненте, сервисе или store?</summary><br>
<table><tr><td>

Локальный slot state удобно хранить в host component или scoped loader service. Общий store нужен только если статус
используют удаленные части приложения, аналитика или централизованная recovery-логика.

</td></tr></table>

</details>

<details>
<summary>Почему сервис загрузки remote не должен знать бизнес-логику приложения?</summary><br>
<table><tr><td>

Loader отвечает за разрешение модуля, создание компонента и технический lifecycle. Решения о фильмах, бронировании и
доступности принадлежат host orchestration или domain services, иначе loader нельзя переиспользовать.

</td></tr></table>

</details>

#### SSR и hydration

<details>
<summary>Могут ли remote-приложения быть SSR?</summary><br>
<table><tr><td>

Да, но server renderer должен уметь разрешить remote, загрузить совместимый server bundle и согласовать HTML с
последующей hydration. Это заметно сложнее browser-only композиции.

</td></tr></table>

</details>

<details>
<summary>Какие дополнительные сложности появляются при SSR и micro frontends?</summary><br>
<table><tr><td>

Нужно согласовать server и browser entries, сетевую доступность remote с сервера, shared dependencies, latency,
кеширование, ошибки частичного render и детерминированный HTML для hydration.

</td></tr></table>

</details>

<details>
<summary>Почему при SSR возникает ошибка <code>window is not defined</code>?</summary><br>
<table><tr><td>

Server runtime не предоставляет browser global `window`. Ошибка возникает, если код обращается к нему при import,
создании компонента или server render до проверки платформы.

</td></tr></table>

</details>

<details>
<summary>Почему при SSR возникает ошибка <code>document is not defined</code>?</summary><br>
<table><tr><td>

Node server не имеет browser DOM `document`. Прямой DOM-код и browser-only libraries нужно изолировать от server path
или запускать после перехода в browser render phase.

</td></tr></table>

</details>

<details>
<summary>Почему <code>ngOnInit</code> не всегда подходит для загрузки remote widgets?</summary><br>
<table><tr><td>

`ngOnInit` выполняется и при SSR, а view containers могут быть еще не готовы. Browser-only remote лучше монтировать
после первого client render, когда доступны DOM и view queries.

</td></tr></table>

</details>

<details>
<summary>Когда использовать <code>afterNextRender()</code>?</summary><br>
<table><tr><td>

Когда интеграция требует созданного DOM, browser APIs или доступного `ViewContainerRef` после следующего render. Render
callbacks не выполняются на сервере, поэтому подходят для browser-only монтирования.

</td></tr></table>

</details>

<details>
<summary>Почему remote widgets часто монтируют только на клиенте, даже если shell поддерживает SSR?</summary><br>
<table><tr><td>

Так shell сохраняет SEO и быстрый initial HTML, а remote integration избегает server federation, browser globals и
hydration mismatch. Цена — placeholder до client mount и более поздняя готовность виджета.

</td></tr></table>

</details>

<details>
<summary>Как сделать SSR-safe код в Angular?</summary><br>
<table><tr><td>

Не обращаться к browser globals на уровне модуля, использовать platform-neutral APIs, изолировать browser services и
выполнять DOM-интеграции в render callbacks или после явной проверки платформы.

</td></tr></table>

</details>

<details>
<summary>Что такое <code>BootstrapContext</code> в server bootstrap?</summary><br>
<table><tr><td>

`BootstrapContext` передает Angular server bootstrap контекст конкретного запроса, включая platform injector. Он нужен
для корректной изоляции и настройки server-rendered приложения.

</td></tr></table>

</details>

<details>
<summary>Почему <code>bootstrapApplication</code> на сервере требует <code>BootstrapContext</code>?</summary><br>
<table><tr><td>

Server renderer создает контекст для запроса и ожидает, что bootstrap использует его. Без контекста приложение может
создать неподходящую platform instance или потерять request-scoped providers.

</td></tr></table>

</details>

<details>
<summary>Чем <code>main.ts</code> отличается от <code>main.server.ts</code>?</summary><br>
<table><tr><td>

Browser entry инициализирует приложение в DOM и может настраивать client federation. Server entry экспортирует bootstrap
для renderer, принимает `BootstrapContext` и не должен выполнять browser-only код.

</td></tr></table>

</details>

<details>
<summary>Почему manifest может открываться в браузере, но не загружаться во время SSR?</summary><br>
<table><tr><td>

URL `localhost` с точки зрения server process, container или cloud runtime может указывать не туда, куда в браузере.
Также мешают DNS, CORS-подобные gateway rules, TLS, network policy и отсутствие запущенного remote.

</td></tr></table>

</details>

<details>
<summary>Что такое hydration mismatch и как микрофронтенды могут его спровоцировать?</summary><br>
<table><tr><td>

Mismatch возникает, когда client ожидает DOM, отличный от server HTML. Remote может изменить разметку до hydration,
отрендерить разные данные или создать browser-only элементы в server-rendered области.

</td></tr></table>

</details>

#### Deployment, versioning и rollback

<details>
<summary>Как деплоить host и remote-приложения независимо?</summary><br>
<table><tr><td>

У каждого приложения должен быть отдельный build и release pipeline. Remote сначала публикует versioned assets, затем
контролируемо обновляется manifest; host выпускается отдельно и сохраняет совместимость с доступными версиями remote.

</td></tr></table>

</details>

<details>
<summary>Какие артефакты деплоит remote-приложение?</summary><br>
<table><tr><td>

`remoteEntry.json`, JavaScript chunks, styles, assets и при необходимости server bundle. Все ссылки из entry должны
оставаться доступными как единый согласованный release.

</td></tr></table>

</details>

<details>
<summary>Где должен лежать <code>remoteEntry.json</code> после деплоя?</summary><br>
<table><tr><td>

По стабильному HTTPS URL, доступному host и разрешенному security policy. Часто это CDN path, связанный с приложением
или версией, например `/movies/1.4.2/remoteEntry.json`.

</td></tr></table>

</details>

<details>
<summary>Где хранить manifest для dev/stage/prod?</summary><br>
<table><tr><td>

В environment-specific конфигурации или config service, управляемом deployment pipeline. Не следует вручную менять
production manifest без истории, валидации и возможности быстрого rollback.

</td></tr></table>

</details>

<details>
<summary>Как host узнает URL нового remote-приложения?</summary><br>
<table><tr><td>

Из manifest, который загружается при старте или встраивается для конкретного окружения. Обновление mapping переключает
host на новый remote без изменения его application code.

</td></tr></table>

</details>

<details>
<summary>Что будет, если host старый, а remote новый?</summary><br>
<table><tr><td>

Все продолжит работать только при backward-compatible remote contract. Удаленный export, переименованный input или
измененная payload schema приведут к runtime-ошибке старого host.

</td></tr></table>

</details>

<details>
<summary>Что будет, если remote старый, а host новый?</summary><br>
<table><tr><td>

Новый host может запросить отсутствующий export или передать неподдерживаемые данные. Поэтому host должен либо
поддерживать старый контракт, либо проверять capability/version до использования новой функции.

</td></tr></table>

</details>

<details>
<summary>Как версионировать контракты между host и remote?</summary><br>
<table><tr><td>

Версионируют exposed modules, TypeScript/schema package или capability metadata по SemVer. Breaking change получает
новую major-версию или новый параллельный contract identifier.

</td></tr></table>

</details>

<details>
<summary>Как организовать backward compatibility между host и remote?</summary><br>
<table><tr><td>

Сначала remote добавляет новый API, сохраняя старый, затем обновляются consumers, и только после измеренного перехода
удаляется legacy contract. Полезны defaults, optional fields и tolerant readers.

</td></tr></table>

</details>

<details>
<summary>Как безопасно изменить <code>exposedModule</code> или <code>exportName</code>?</summary><br>
<table><tr><td>

Временно публиковать старое и новое имя, обновить host, проверить production usage и только затем удалить alias.
Изменение должно проходить contract и integration tests.

</td></tr></table>

</details>

<details>
<summary>Почему нельзя бездумно переименовывать exposed module?</summary><br>
<table><tr><td>

Его имя — часть runtime API, записанная в host configuration. В отличие от внутреннего refactoring, компилятор remote не
найдет внешних consumers и не предупредит об их поломке.

</td></tr></table>

</details>

<details>
<summary>Как организовать rollback remote-приложения?</summary><br>
<table><tr><td>

Хранить предыдущие immutable releases и атомарно вернуть manifest mapping на проверенный `remoteEntry.json`. Старые
entry и chunks нельзя удалять до завершения cache TTL и активных сессий.

</td></tr></table>

</details>

<details>
<summary>Как организовать rollback host-приложения?</summary><br>
<table><tr><td>

Повторно активировать предыдущий host release и соответствующую конфигурацию manifest. Rollback должен учитывать, что
remote уже могли перейти вперед, поэтому их контракты обязаны быть backward-compatible.

</td></tr></table>

</details>

<details>
<summary>Какие риски есть у кеширования <code>remoteEntry.json</code>?</summary><br>
<table><tr><td>

Устаревший entry может ссылаться на удаленные chunks или старый контракт. Смешивание entry одного release с assets
другого вызывает ошибки импорта, которые трудно воспроизвести локально.

</td></tr></table>

</details>

<details>
<summary>Нужно ли кешировать federation manifest?</summary><br>
<table><tr><td>

Да, но обычно с коротким TTL, revalidation или управляемым versioned URL. Стратегия зависит от того, насколько быстро
нужно переключать remote и отключать аварийный release.

</td></tr></table>

</details>

<details>
<summary>Почему <code>remoteEntry.json</code> часто кешируют осторожнее, чем JS chunks?</summary><br>
<table><tr><td>

Entry является изменяемой картой текущего release, а content-hashed chunks immutable. Chunks можно кешировать надолго,
тогда как entry должен достаточно быстро указывать на актуальный набор файлов.

</td></tr></table>

</details>

<details>
<summary>Как CDN влияет на деплой микрофронтендов?</summary><br>
<table><tr><td>

CDN снижает latency и распределяет assets, но добавляет cache keys, propagation delay, CORS/CSP настройки и
invalidation. Release должен учитывать согласованность entry и chunks во всех edge locations.

</td></tr></table>

</details>

<details>
<summary>Как CDN cache может сломать загрузку remote?</summary><br>
<table><tr><td>

Очистка устаревшего entry может быстро переключить клиентов на исправление. Но удаление старых chunks или
несогласованная invalidation оставит открытые сессии с entry, ссылки которого больше не работают.

</td></tr></table>

</details>

<details>
<summary>Что такое canary deployment для remote-приложения?</summary><br>
<table><tr><td>

Это направление небольшой доли пользователей или внутренних сотрудников на новую версию remote. Manifest или edge
routing выбирает версию, а метрики сравниваются до полного rollout.

</td></tr></table>

</details>

<details>
<summary>Как feature flags помогают деплоить микрофронтенды?</summary><br>
<table><tr><td>

Flag может включить новый remote, contract path или функцию для выбранной аудитории без повторной сборки. Нужны
предсказуемый fallback, владелец flag и удаление завершенных флагов.

</td></tr></table>

</details>

<details>
<summary>Как откатить сломанный remote без деплоя host?</summary><br>
<table><tr><td>

Изменить управляемый manifest/config или remote feature flag так, чтобы host не монтировал виджет либо использовал
резервную версию. Host должен заранее поддерживать отсутствие optional remote.

</td></tr></table>

</details>

<details>
<summary>Что должен показывать host, если remote не загрузился после деплоя?</summary><br>
<table><tr><td>

Локальный доступный fallback с понятным сообщением и retry, если повтор может помочь. Критический remote может
переводить весь сценарий в error state, но не должен оставлять пустой экран без объяснения.

</td></tr></table>

</details>

<details>
<summary>Какие метрики и алерты нужны для микрофронтендов в production?</summary><br>
<table><tr><td>

Успешность и latency загрузки entry/chunks, mount time, ошибки по remote/version, fallback rate, contract errors и
влияние на Core Web Vitals. Алерт должен указывать конкретный remote и release.

</td></tr></table>

</details>

<details>
<summary>Как логировать ошибки загрузки remote-приложений?</summary><br>
<table><tr><td>

Добавлять remote name, entry URL, exposed module, host/remote versions, environment, этап загрузки и correlation ID.
Секреты и персональные payloads в client logs отправлять нельзя.

</td></tr></table>

</details>

<details>
<summary>Как проверять совместимость host и remote в CI?</summary><br>
<table><tr><td>

Собирать каждый remote, поднимать его artifacts и запускать contract/integration tests поддерживаемых host versions.
Также проверять shared dependency ranges и наличие всех exposed exports.

</td></tr></table>

</details>

<details>
<summary>Какие contract tests нужны для host и remote?</summary><br>
<table><tr><td>

Это автоматическая проверка публичного соглашения между producer remote и consumer host: имен exports, inputs, outputs,
payload schemas и обязательного поведения без полного E2E всех реализаций.

</td></tr></table>

</details>

<details>
<summary>Какие e2e-сценарии нужны перед выкладкой host и remotes?</summary><br>
<table><tr><td>

Загрузка каждого remote, основной cross-remote flow, partial failure, retry, старая/новая совместимая версия,
navigation, auth и rollback configuration. Проверяют также отсутствие блокировки host при optional remote failure.

</td></tr></table>

</details>

#### CSS, UI и Design System

<details>
<summary>Кто должен отвечать за layout: host или remote?</summary><br>
<table><tr><td>

Host отвечает за page layout, размеры и расположение slots. Remote отвечает за содержимое внутри выделенной области и
должен корректно работать в явно документированных responsive constraints.

</td></tr></table>

</details>

<details>
<summary>Кто должен отвечать за внутренние стили виджета: host или remote?</summary><br>
<table><tr><td>

Remote владеет своей внутренней разметкой и component styles. Host может передавать semantic design tokens и параметры
контейнера, но не должен зависеть от внутренних selectors remote.

</td></tr></table>

</details>

<details>
<summary>Почему host не должен глубоко стилизовать внутренности remote?</summary><br>
<table><tr><td>

Внутренний DOM не является публичным контрактом и может измениться при независимом release. Deep selectors создают
скрытую связанность и ломают encapsulation, тестирование и безопасный rollout.

</td></tr></table>

</details>

<details>
<summary>Какие проблемы со стилями бывают в микрофронтендах?</summary><br>
<table><tr><td>

Конфликты global selectors, разный reset, несовместимые tokens, дубли fonts/styles, различия responsive behavior и
z-index систем. Виджеты также могут менять layout после поздней загрузки.

</td></tr></table>

</details>

<details>
<summary>Как избежать конфликта глобальных CSS-стилей между remote-приложениями?</summary><br>
<table><tr><td>

Минимизировать globals, использовать Angular style encapsulation, scoped naming и согласованный reset в host. Общие
tokens публиковать через CSS custom properties, а не через selectors внутренних элементов.

</td></tr></table>

</details>

<details>
<summary>Как микрофронтенды могут использовать общую design system?</summary><br>
<table><tr><td>

Через versioned package компонентов и semantic tokens с документированным compatibility range. Angular package часто
настраивают как shared dependency, если все remote способны использовать совместимую runtime-версию.

</td></tr></table>

</details>

<details>
<summary>Какие риски есть у разных версий design system в разных remote?</summary><br>
<table><tr><td>

Визуальная несогласованность, разные accessibility fixes, duplicated code и конфликт global assets. При singleton
sharing несовместимые версии могут также привести к runtime-ошибке вместо изолированной копии.

</td></tr></table>

</details>

#### Testing и security

<details>
<summary>Как тестировать remote-приложение отдельно?</summary><br>
<table><tr><td>

Проверять компоненты и domain logic unit/integration-тестами, а exposed contract — через standalone harness или test
host. Remote также должен собираться и запускаться независимо от production host.

</td></tr></table>

</details>

<details>
<summary>Как тестировать host без реальных remote?</summary><br>
<table><tr><td>

Подменить abstraction загрузчика и вернуть локальные test components с теми же inputs/outputs. Так host orchestration и
fallback states тестируются детерминированно без сети и federation runtime.

</td></tr></table>

</details>

<details>
<summary>Как мокать remote widgets в тестах host-приложения?</summary><br>
<table><tr><td>

Создать минимальные standalone components, реализующие нужный публичный контракт, и настроить loader stub возвращать их
`Type`. Не нужно копировать внутренний UI настоящего remote.

</td></tr></table>

</details>

<details>
<summary>Как проверить fallback UI, если remote недоступен?</summary><br>
<table><tr><td>

Настроить loader mock на rejected promise или `null`, запустить mount и проверить доступное сообщение, status `error`,
наличие retry и сохранение работоспособности независимых slots.

</td></tr></table>

</details>

<details>
<summary>Как тестировать контракты между host и remote?</summary><br>
<table><tr><td>

Проверять наличие exposed export, совместимость input/output payloads и ожидаемую реакцию на события. Эти тесты
запускают как в producer pipeline, так и на матрице поддерживаемых consumer versions.

</td></tr></table>

</details>

<details>
<summary>Какие security-риски появляются при runtime-загрузке remote-кода?</summary><br>
<table><tr><td>

Host исполняет JavaScript с правами своего origin: remote может читать доступные данные, менять DOM и выполнять запросы.
Компрометация remote pipeline или CDN становится компрометацией host session.

</td></tr></table>

</details>

<details>
<summary>Почему host должен доверять только известным remoteEntry URL?</summary><br>
<table><tr><td>

URL определяет исполняемый код. Разрешение произвольного адреса из query params или пользовательского ввода превращает
federation loader в механизм удаленного выполнения недоверенного JavaScript.

</td></tr></table>

</details>

<details>
<summary>Что может пойти не так, если manifest можно изменить без контроля?</summary><br>
<table><tr><td>

Злоумышленник или ошибочная автоматизация может перенаправить host на вредоносный или несовместимый remote. Нужны
ограниченный доступ, audit log, validation, approvals и rollback.

</td></tr></table>

</details>

<details>
<summary>Как CSP влияет на загрузку remote-приложений?</summary><br>
<table><tr><td>

`script-src`, `connect-src` и связанные directives должны разрешать доверенные CDN и способы загрузки модулей. Слишком
широкая CSP ослабляет защиту, а слишком узкая блокирует entry, chunks или source maps.

</td></tr></table>

</details>

<details>
<summary>Что такое supply chain risk в микрофронтендах?</summary><br>
<table><tr><td>

Это риск компрометации dependency, build pipeline, registry, artifact storage или CDN одного remote. Из-за композиции во
время выполнения вредоносный release попадает в host без изменения его репозитория.

</td></tr></table>

</details>

<details>
<summary>Как ограничить влияние сломанного или небезопасного remote?</summary><br>
<table><tr><td>

Использовать allowlist URL, CSP, независимые permissions, минимальные публичные данные, мониторинг и аварийное
отключение. Для недоверенного кода нужна более сильная изоляция, например iframe с sandbox, а не обычный Angular
component.

</td></tr></table>

</details>

### Tooling

Feature toggles в Angular часто реализуют через service, guard, directive или provider. Общие типы флагов, lifecycle,
риски и fallback-стратегии описаны в разделе [Feature toggles](#feature-toggles).

<details>
<summary>Что такое TypeScript program?</summary><br>
<table><tr><td>

`Program` — модель набора source files, compiler options и module graph, которую создает TypeScript compiler API.
Compiler выполняет type checking только для файлов, входящих в этот graph. Angular compiler расширяет его анализом
decorators и templates.

</td></tr></table>

</details>

<details>
<summary>Почему Angular compiler требует, чтобы файл с <code>@Component</code> входил в TypeScript compilation?</summary><br>
<table><tr><td>

Angular анализирует component metadata в рамках TypeScript program. Если файл не является root и не достижим через
imports, compiler не создаст для него Angular definitions. Физического наличия файла в directory недостаточно.

</td></tr></table>

</details>

<details>
<summary>Чем <code>files</code> отличается от <code>include</code> в tsconfig?</summary><br>
<table><tr><td>

`files` перечисляет точные root files, а `include` выбирает их glob patterns. Imports из root files также входят в
program, если не исключены resolution rules. Узкий `files` легко случайно оставить без нового entry.

</td></tr></table>

</details>

<details>
<summary>Зачем нужен <code>tsconfig.app.json</code>?</summary><br>
<table><tr><td>

Он задает compiler options и roots именно application build, отделяя их от tests, tools и base `tsconfig.json`. Angular
builder получает его из `angular.json`. Разные targets могут использовать разные типы и entry files.

</td></tr></table>

</details>

<details>
<summary>Почему файл может физически существовать, но не входить в TypeScript compilation?</summary><br>
<table><tr><td>

Он может не совпадать с `files`/`include`, быть исключен или не импортироваться ни одним root file. Также builder может
использовать другой tsconfig, чем ожидает разработчик. Проверить состав помогает `tsc --listFiles`.

</td></tr></table>

</details>

<details>
<summary>Что такое Angular builder?</summary><br>
<table><tr><td>

Builder — реализация target вроде `build`, `serve` или `test`, настроенная в `angular.json`. Она получает options,
запускает compiler/bundler и возвращает результат CLI. Custom builder позволяет заменить или обернуть build pipeline.

</td></tr></table>

</details>

<details>
<summary>Что такое Vite dev server в Angular?</summary><br>
<table><tr><td>

Современный Angular development server использует Vite для быстрой раздачи и обновления приложения, оставаясь под
управлением Angular builder. Angular CLI настраивает compilation, assets и framework integration. Это не означает, что
проект обязан иметь ручной `vite.config`.

</td></tr></table>

</details>

<details>
<summary>Что такое esbuild?</summary><br>
<table><tr><td>

esbuild — быстрый bundler и transformer на Go. Angular application builder использует его как часть build pipeline для
bundling и оптимизаций вместе с Angular compiler. Он не заменяет template type checking.

</td></tr></table>

</details>

<details>
<summary>Что такое SSR entry?</summary><br>
<table><tr><td>

Это server-side entry, из которого builder создает bundle для обработки HTTP requests или prerender. Он подключает
server providers и экспортирует bootstrap/handler, а не монтирует приложение в browser DOM. Конкретное имя задается
workspace configuration.

</td></tr></table>

</details>

<details>
<summary>Требования к написанию кода на TypeScript</summary><br>
<table><tr><td>

На самом деле требования бывают разные и зависят от команды к команде. Самые эффективные для себя считаю использование
модификаторов доступа и принудительного указания типов данных для всех переменных, методов и членов класса, которые вы
используете в коде. Желательно все необходимые правила конвенции кода настраивать в ESLint.

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

</td></tr></table>

</details>

<details>
<summary>Зачем нужен ESLint (TSLint) и Prettier?</summary><br>
<table><tr><td>

**ESLint** анализирует код и находит потенциальные ошибки, небезопасные конструкции и нарушения соглашений. С TypeScript
он работает через typescript-eslint, а Angular-правила предоставляет angular-eslint.

**Prettier** отвечает за форматирование: отступы, переносы, кавычки и другие визуальные правила. Он не заменяет
семантический анализ ESLint.

**TSLint** устарел и больше не развивается; современные TypeScript-проекты используют ESLint.

Обычная схема:

- редактор форматирует Prettier;
- ESLint проверяет качество кода и Angular templates;
- CI запускает lint и format check;
- правила форматирования ESLint, конфликтующие с Prettier, отключаются.

Цель инструментов — быстрый автоматический feedback и единый стиль, а не максимальное количество строгих правил. Правило
должно предотвращать реальную проблему или поддерживать договоренность команды.

</td></tr></table>

</details>
