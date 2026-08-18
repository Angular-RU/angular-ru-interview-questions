---
layout: ../../layouts/Layout.astro
title: HTML
description: Семантика HTML, формы, accessibility, SEO, metadata, SVG, media и устройство браузерного документа
category: Frontend
kind: questions
order: 30
---

## HTML

### HTML

<details>
<summary>Что такое HTML и какую задачу он решает?</summary><br>
<table><tr><td>

**Короткий ответ**

HTML описывает структуру и смысл документа: заголовки, текст, навигацию, формы, ссылки и изображения. Браузер разбирает
разметку и строит DOM, который используют CSS, JavaScript, поисковые роботы и assistive technologies.

**Полный ответ**

HTML, HyperText Markup Language, — язык разметки, который описывает **структуру и семантику** документа. Он не задает
бизнес-логику приложения и не отвечает за визуальный layout: обычно HTML описывает, _что это за контент_, CSS — как он
выглядит, а JavaScript — как меняется и реагирует на события.

Например:

```html
<article>
  <h2>Корзина</h2>
  <p>В корзине 3 товара</p>
  <button type="button">Оформить заказ</button>
</article>
```

Здесь браузер получает не просто набор строк. После parsing он создает DOM-узлы с типами и отношениями: `article`
содержит heading, paragraph и интерактивный `button`. На основе HTML и ARIA браузер также строит accessibility tree,
который используют screen readers.

HTML важен сразу нескольким потребителям:

- браузеру — для построения DOM и native behavior элементов;
- CSS — как дерево, к которому применяются selectors и layout rules;
- JavaScript — как API объектов DOM;
- assistive technologies — для ролей, имен и структуры интерфейса;
- поисковым системам — для понимания содержимого и связей;
- тестам и automation — для устойчивых semantic selectors.

Поэтому визуально одинаковые варианты не всегда эквивалентны:

```html
<div class="button">Купить</div>
<button type="button">Купить</button>
```

Оба можно стилизовать одинаково, но второй вариант уже имеет keyboard behavior, focusability, button semantics и
ожидаемое поведение формы.

Еще один важный момент: **HTML source и DOM — не одно и то же**. Parser может исправить часть невалидной вложенности,
добавить служебные узлы, а JavaScript позже меняет DOM динамически.

На интервью полезно связать HTML не только с тегами: **HTML — это контракт структуры и семантики страницы, из которого
браузер строит DOM и accessibility model; корректная разметка уменьшает объем CSS/JS, который приходится имитировать
вручную**.

</td></tr></table>

</details>

<details>
<summary>Что такое HTML attribute?</summary><br>
<table><tr><td>

**Короткий ответ**

Attribute задает дополнительную информацию, состояние или настройку HTML element: `href`, `type`, `disabled`, `lang`.
Global attributes вроде `id`, `class`, `hidden` и `data-*` доступны большинству элементов, а часть attributes имеет
смысл только для определенных элементов.

**Полный ответ**

HTML attribute — часть start tag, которая уточняет свойства элемента или его поведение.

```html
<a
  href="/profile"
  class="link"
  lang="en"
>
  Profile
</a>
```

Здесь:

- `href` задает destination ссылки;
- `class` добавляет значение, которое можно использовать в CSS/JS;
- `lang` меняет языковой контекст текста.

Attributes удобно разделять на несколько групп.

**Global attributes** доступны у большинства HTML elements: `id`, `class`, `title`, `hidden`, `tabindex`, `lang`, `dir`,
`data-*` и другие.

**Element-specific attributes** определены для конкретных элементов: `href` у `a`, `src` и `alt` у `img`, `type` у
`button`/`input`, `action` у `form`.

**Boolean attributes** работают по факту присутствия, а не по строковому значению:

```html
<button disabled>Save</button>
```

Для boolean attribute запись `disabled="false"` все равно означает disabled, потому что attribute присутствует. Чтобы
снять состояние, attribute нужно удалить.

Важно отличать **HTML attribute от DOM property**. Initial markup задает attributes, а browser создает DOM object с
properties. Для некоторых значений они отражают друг друга, но не всегда являются одной сущностью. Например, текущее
`input.value` может измениться после пользовательского ввода, тогда как attribute `value` продолжает описывать initial
value.

```html
<input value="initial" />
```

```js
input.value = 'current';
```

В framework-разработке эта разница особенно заметна при property binding и attribute binding.

Attributes также не являются безопасным хранилищем. Любые значения в DOM видны клиенту, поэтому в `data-*`, hidden
inputs и произвольные attributes нельзя помещать secrets или считать их trusted source.

На интервью хороший ответ включает три идеи: **attribute находится в markup, может влиять на semantics/native behavior,
а после parsing важно различать attribute и соответствующее DOM property**.

</td></tr></table>

</details>

<details>
<summary>Что такое semantic HTML?</summary><br>
<table><tr><td>

**Короткий ответ**

Semantic HTML использует элементы по их назначению: `nav` для навигации, `main` для основного контента, `button` для
действия. Это делает структуру понятнее браузеру, разработчикам, поисковым системам и assistive technologies.

**Полный ответ**

Semantic HTML означает, что элемент выбирают прежде всего по **смыслу и поведению**, а не по его default-стилям.

Например:

```html
<nav aria-label="Основная навигация">
  <a href="/catalog">Каталог</a>
</nav>

<main>
  <h1>Каталог</h1>
  <button type="button">Добавить товар</button>
</main>
```

`nav`, `main`, heading, link и button сообщают браузеру и assistive technologies, какую роль выполняет каждый кусок
интерфейса. Это дает несколько преимуществ.

**Accessibility**

Screen reader может быстро перемещаться по landmarks и headings, а native controls получают ожидаемый keyboard behavior
без ручной реализации.

**Поддерживаемость**

Разметка `<button>` понятнее, чем `<div class="clickable">`: следующему разработчику не нужно выяснять, является ли узел
действием, ссылкой или просто контейнером.

**Прогрессивное поведение браузера**

Native элементы уже умеют focus, form submission, link navigation, context menu, open in new tab и другие platform
features.

**SEO и machine-readable structure**

Семантика помогает crawler понять hierarchy и назначение частей документа, хотя сама по себе не является гарантией
ranking.

Типичная ошибка — использовать семантический элемент только из-за названия. Например, `section` не нужен вместо каждого
`div`: это тематический раздел документа, обычно с собственным heading. Для purely layout wrapper обычный `div` часто
корректнее.

Еще одна ошибка — считать framework component семантикой сам по себе:

```html
<app-action>Save</app-action>
```

Custom Angular component не превращается автоматически в accessible button. Внутри него все равно нужно выбрать
правильный native element и обеспечить contract компонента.

ARIA также не должна быть первым способом исправления markup. Правило «No ARIA is better than bad ARIA» практически
означает: сначала ищем native element, а роль и состояния добавляем вручную только когда platform primitive
недостаточно.

На интервью можно сформулировать так: **semantic HTML переносит часть поведения и смысла из пользовательского JavaScript
в стандартизированные browser primitives, поэтому интерфейс обычно получается доступнее, проще и устойчивее**.

</td></tr></table>

</details>

<details>
<summary>Что такое document outline?</summary><br>
<table><tr><td>

**Короткий ответ**

Это логическая структура документа, прежде всего иерархия `h1`–`h6` и landmarks. На практике headings нужно выстраивать
последовательно и не полагаться на старый HTML outline algorithm для sectioning elements: браузеры его не реализовали
как способ автоматически вычислять уровни заголовков.

**Полный ответ**

Под document outline на практике понимают **логическую иерархию содержимого страницы**: какой heading главный, какие
разделы вложены друг в друга и где находятся основные landmarks.

Например:

```html
<h1>Настройки аккаунта</h1>

<section>
  <h2>Безопасность</h2>

  <section>
    <h3>Двухфакторная аутентификация</h3>
  </section>
</section>

<section>
  <h2>Уведомления</h2>
</section>
```

Здесь уровни headings отражают информационную вложенность, а не размер шрифта. Визуальный размер всегда можно изменить
CSS.

Исторически спецификация HTML предлагала outline algorithm, в котором `section`, `article`, `nav` и `aside` должны были
автоматически влиять на уровень heading. На этот механизм нельзя рассчитывать: браузеры и assistive technologies не
реализовали его как надежную замену явной иерархии `h1`–`h6`.

Практические правила:

- у страницы должен быть понятный основной heading;
- следующий heading level выбирают по структуре, а не по CSS;
- пропуск уровня (`h2` сразу в `h4`) часто сигнализирует о неясной hierarchy, хотя сам по себе HTML не ломает;
- reusable component не должен жестко предполагать один heading level, если его можно использовать на разных уровнях;
- landmarks (`main`, `nav`, `aside`, `header`, `footer`) дополняют headings, а не заменяют их.

Для SPA важна еще и динамика: после route change document title, main heading и focus должны оставаться согласованными,
иначе визуально новая страница появилась, а пользователь screen reader продолжает находиться в старом контексте.

На интервью сильный ответ: **outline — это не магия sectioning tags, а явно спроектированная hierarchy headings и
landmarks, которая отражает структуру контента и помогает навигации**.

</td></tr></table>

</details>

<details>
<summary>Что такое <code>doctype</code> и зачем он нужен?</summary><br>
<table><tr><td>

**Короткий ответ**

`<!doctype html>` сообщает браузеру, что документ нужно обрабатывать в standards mode. Без корректного doctype браузер
может включить quirks mode с устаревшими правилами layout и совместимости.

**Полный ответ**

Современный HTML-документ обычно начинается так:

```html
<!doctype html>
<html lang="ru">
  <!-- ... -->
</html>
```

`<!doctype html>` — не обычный HTML element и не указание версии «HTML5» в runtime. Это declaration, которое прежде
всего нужно браузеру для выбора **rendering mode**.

Исторически сайты зависели от несовместимого поведения старых браузеров. Чтобы новые браузеры могли одновременно
поддерживать старые страницы и стандартизированное поведение, появились режимы:

- **standards mode** — современное поведение по стандартам;
- **quirks mode** — набор legacy-совместимостей;
- в некоторых случаях **limited quirks mode**.

Без корректного doctype браузер может перейти в quirks mode. Тогда различия затрагивают, например, вычисление layout и
часть CSS behavior. Такая проблема особенно неприятна тем, что HTML и CSS визуально выглядят корректно, но страница
ведет себя иначе из-за document mode.

Проверить режим можно через:

```js
document.compatMode;
```

В standards mode обычно будет `CSS1Compat`, в quirks mode — `BackCompat`.

Старые doctypes были длинными, потому что ссылались на DTD. В современном HTML достаточно короткого `<!doctype html>`.

На интервью полезно подчеркнуть: **doctype нужен не для загрузки спецификации и не является HTML-тегом; его практическая
роль — не дать браузеру случайно включить legacy quirks rendering**.

</td></tr></table>

</details>

<details>
<summary>Что такое custom elements?</summary><br>
<table><tr><td>

**Короткий ответ**

Custom Elements API позволяет регистрировать собственные HTML elements с именем через дефис и lifecycle callbacks. Это
часть Web Components; Shadow DOM, templates и slots — отдельные возможности и не включаются автоматически.

**Полный ответ**

Custom Elements — browser API для регистрации собственных элементов, которые участвуют в DOM как настоящие elements. Имя
autonomous custom element должно содержать дефис, чтобы не конфликтовать с будущими built-in HTML tags.

```js
class UserBadge extends HTMLElement {
  connectedCallback() {
    this.textContent ||= 'Guest';
  }
}

customElements.define('user-badge', UserBadge);
```

После регистрации markup можно использовать так:

```html
<user-badge></user-badge>
```

Основные lifecycle callbacks включают:

- `connectedCallback()` — element подключен к document;
- `disconnectedCallback()` — удален из document;
- `attributeChangedCallback()` — наблюдаемый attribute изменился;
- `adoptedCallback()` — element переместили между documents.

Важно: Custom Elements API **не означает Shadow DOM автоматически**. Компонент может остаться в обычном light DOM. Если
нужна style/DOM encapsulation, автор отдельно создает shadow root. Аналогично `<template>` и `<slot>` — связанные, но
самостоятельные primitives Web Components.

Есть несколько архитектурных trade-offs.

**Плюсы**

- platform-level contract без привязки потребителя к Angular/React;
- удобно для design system, который используется в разных stacks;
- lifecycle и attributes доступны непосредственно через browser API.

**Ограничения**

- attributes строковые по своей природе, а complex state требует properties/events;
- SSR/hydration и form integration требуют отдельного дизайна;
- Shadow DOM меняет правила styling, focus и testing;
- custom element сам по себе не получает semantics кнопки, input или другого native control.

Если `<my-button>` обрабатывает click, это еще не делает его доступной кнопкой. Часто внутри все равно нужен настоящий
`button`, либо более сложная реализация platform semantics.

В Angular custom elements могут быть interoperability boundary, но внутри одного Angular-приложения обычный Angular
component часто проще: у него уже есть DI, templates, signals/inputs и framework lifecycle.

На интервью полезно разделить понятия: **Custom Elements — регистрация нового DOM element; Web Components — более
широкий набор browser primitives, куда также относятся Shadow DOM и templates**.

</td></tr></table>

</details>

<details>
<summary>Чем tag отличается от HTML element?</summary><br>
<table><tr><td>

**Короткий ответ**

Tag — синтаксическая часть HTML source, например `<p>` или `</p>`. Element — сущность документа: start tag, attributes,
content и end tag, если он предусмотрен. Void elements вроде `<img>` или `<input>` не имеют end tag и child content.

**Полный ответ**

Термины часто используют как синонимы в разговоре, но технически они относятся к разным уровням.

**Tag** — токен в текстовой HTML-разметке:

```html
<p></p>
```

`<p>` — start tag, `</p>` — end tag.

**Element** — логическая сущность, которую описывает markup и из которой после parsing появляется DOM element:

```html
<p class="lead">
  Hello
  <strong>world</strong>
</p>
```

У `p` element есть start tag, attribute `class`, text/content, вложенный `strong` и end tag.

Не у всех элементов структура одинаковая. **Void elements** не могут иметь child nodes в HTML и не используют end tag:

```html
<img
  src="avatar.png"
  alt="User avatar"
/>
<input name="email" />
<br />
```

Слеш перед `>` в HTML для void element не создает «self-closing semantics» как в XML; `<img>` и `<img />` для HTML
parser по сути относятся к одному void element.

Есть также элементы, у которых end tag в source может быть опущен по правилам parser, например часть `li`, `p`, `td`.
DOM element при этом все равно существует как узел дерева.

Разница полезна при отладке parser behavior: source содержит tags, а DOM DevTools показывает уже построенные nodes.
Невалидная последовательность tags может быть исправлена parser-ом, поэтому получившееся element tree не всегда
буквально повторяет source.

На интервью достаточно сказать: **tag — это синтаксис разметки, element — объект структуры документа, который этот
синтаксис описывает**.

</td></tr></table>

</details>

<details>
<summary>Чем block element отличается от inline element?</summary><br>
<table><tr><td>

**Короткий ответ**

`block` и `inline` прежде всего описывают layout behavior CSS. У HTML elements есть historical/default display values,
но их можно изменить через `display`, поэтому семантику элемента нельзя определять по тому, начинается ли он с новой
строки.

**Полный ответ**

Термины «block element» и «inline element» исторически удобны, но в современном frontend важно не смешивать **HTML
semantics** и **CSS formatting behavior**.

User agent stylesheet обычно задает, например:

```css
p {
  display: block;
}

span {
  display: inline;
}
```

Block-level box обычно участвует в block formatting context и занимает строку в своем normal flow, а inline box
участвует в line formatting вместе с текстом.

Но CSS может изменить это:

```css
span.badge {
  display: inline-block;
}

nav.horizontal {
  display: flex;
}
```

`nav` после `display: flex` не перестает быть navigation landmark. `span` после `display: block` не приобретает
semantics `section` или `p`.

Есть и более сложные значения: `inline-block`, `flex`, `grid`, `flow-root`, `contents` и комбинации outer/inner display
types. Поэтому правило «div block, span inline» — только описание распространенных defaults, а не полноценная модель
layout.

Отдельный edge case — содержательная модель HTML. Нельзя рассуждать так: «если CSS сделал `span` block, теперь внутрь
можно помещать любую структуру». Content model и validity HTML не меняются из-за CSS.

Практический пример: для текста внутри paragraph можно использовать `span` и визуально сделать его badge. Для отдельного
раздела страницы лучше выбрать semantic container, даже если CSS у обоих будет одинаковый.

На интервью сильный ответ: **block/inline — это главным образом CSS formatting, semantic category HTML живет отдельно;
default display можно изменить, semantics от этого не меняются**.

</td></tr></table>

</details>

<details>
<summary>Зачем команде договариваться об HTML principles?</summary><br>
<table><tr><td>

**Короткий ответ**

HTML principles фиксируют повторяемые решения: native semantics, keyboard accessibility, heading/form structure, правила
для links/buttons и допустимое применение ARIA. Это уменьшает количество случайных решений в каждом PR и делает
интерфейс стабильнее для пользователей, тестов и поддержки.

**Полный ответ**

В большой codebase HTML редко ломается одной очевидной ошибкой. Чаще качество постепенно деградирует через сотни
локально «нормальных» решений: clickable `div`, heading ради размера текста, input без label, лишний ARIA, нестабильные
DOM selectors.

Поэтому team principles полезны как **общие invariants разметки**.

Например, команда может договориться:

- действие — `button`, навигация — `a[href]`;
- native HTML предпочтительнее custom role + JavaScript behavior;
- каждый form control получает корректное accessible name;
- headings отражают document hierarchy;
- `main`, `nav`, `aside` и другие landmarks используются по назначению;
- decorative images/SVG не засоряют accessibility tree;
- `data-testid` не заменяет semantics, если test может найти control по role/name;
- ARIA добавляется только с пониманием keyboard pattern;
- generated/CMS markup имеет документированный contract.

Лучшие правила подкрепляются tooling. Например, часть ошибок находят template lint rules, axe/component tests и browser
accessibility checks. Но lint не определит, правильно ли названо действие или логично ли устроена hierarchy, поэтому
review остается нужен.

Для component library principles особенно важны: одна ошибка в primitive размножается на десятки экранов. Если design
system `Button` внутри рендерит `div`, исправлять accessibility на уровне каждого consumer уже поздно.

Не стоит превращать guidelines в каталог запретов на сотни страниц. Сильная policy короткая, объясняет **почему**
правило существует и дает escape hatch для реальных edge cases.

На интервью можно привести пример: команда запрещает clickable `div` не из-за вкуса, а потому что native `button`
содержит keyboard/focus/form behavior, которое иначе придется поддерживать вручную.

</td></tr></table>

</details>

<details>
<summary>Чем <code>section</code>, <code>article</code>, <code>main</code>, <code>aside</code> и <code>nav</code> отличаются друг от друга?</summary><br>
<table><tr><td>

**Короткий ответ**

`main` содержит основное уникальное содержимое страницы, `nav` — крупную навигацию, `article` — самостоятельный
материал, `section` — тематический раздел обычно с heading, `aside` — связанный, но второстепенный контент.

**Полный ответ**

Эти элементы помогают описать **роль области документа**, но не являются взаимозаменяемыми «семантическими div».

**`main`**

Главное уникальное содержимое текущего document. Обычно пользователь ожидает один активный `main`, к которому можно
быстро перейти как к landmark.

```html
<main>
  <h1>Заказы</h1>
  <!-- основной контент страницы -->
</main>
```

**`nav`**

Крупный блок навигационных links: главное меню, навигация раздела, breadcrumbs. Не каждый набор из двух ссылок обязан
быть `nav`. Если landmarks несколько, полезно давать им различимые accessible names.

```html
<nav aria-label="Основная навигация">...</nav>
<nav aria-label="Навигация по документации">...</nav>
```

**`article`**

Самостоятельная единица контента, которую в принципе можно использовать или распространять отдельно: пост, новость,
комментарий, карточка публикации.

**`section`**

Тематическая часть документа. Обычно у нее есть heading. Если container нужен только для layout/styling и у него нет
отдельной темы, `div` часто лучше.

**`aside`**

Контент, связанный с окружающим материалом, но вторичный по отношению к основному потоку: related links, sidebar,
дополнительная справка.

Элементы могут вкладываться друг в друга. Например, `article` может содержать несколько `section`, а внутри `article`
может быть `aside` с дополнительной информацией.

`header` и `footer` тоже зависят от контекста: они могут относиться не только ко всей странице, но и к конкретному
`article`/`section`.

Главная ошибка — выбирать element по визуальному положению. Sidebar не всегда `aside`, а верхняя полоса не всегда
`header`: semantics определяются назначением content.

На интервью полезно объяснять через вопрос **«может ли этот кусок существовать самостоятельно и какую роль он играет в
структуре документа?»**, а не перечислять определения наизусть.

</td></tr></table>

</details>

<details>
<summary>Когда использовать <code>button</code>, а когда <code>a</code>?</summary><br>
<table><tr><td>

**Короткий ответ**

`button` выполняет действие в текущем интерфейсе: submit, открыть dialog, изменить состояние. `a` с `href` выполняет
навигацию к URL. Правильный элемент дает ожидаемые keyboard semantics и browser features без ручной имитации.

**Полный ответ**

Практическое правило простое: **если после активации меняется location/resource — ссылка; если выполняется команда в
текущем UI — кнопка**.

Навигация:

```html
<a href="/settings/security">Настройки безопасности</a>
```

Действие:

```html
<button type="button">Открыть фильтры</button>
```

Submit формы:

```html
<button type="submit">Сохранить</button>
```

Почему это важно не только для accessibility.

**Link дает browser navigation contract**

Пользователь может скопировать URL, открыть link в новой вкладке, использовать context menu, browser history и обычные
link shortcuts. `<button (click)="router.navigate(...)" />` может визуально перейти на страницу, но теряет часть этого
поведения.

**Button дает action contract**

Он focusable, активируется ожидаемыми keyboard keys, поддерживает `disabled`, участвует в forms и сообщает правильную
role assistive technologies.

Clickable `div` требует вручную добавить `tabindex`, role, keyboard handlers, focus styles и disabled semantics. Даже
после этого легко забыть edge case.

Есть случаи, где UI выглядит как button, но semantics остаются link: например CTA «Открыть отчет» ведет на `/report/42`.
CSS не должен определять HTML element.

И наоборот, «Назад» внутри wizard может быть button, если он меняет локальный step без navigation URL. Но если product
использует реальную browser history/route, link или navigation API может быть правильнее.

У `button` внутри form стоит явно задавать `type`, потому что default behavior может быть submit и вызвать неожиданный
form submission.

На интервью сильная формула: **`a` представляет destination, `button` — command. Выбор native primitive сохраняет
browser capabilities, keyboard behavior и semantics, которые дорого и рискованно воспроизводить JavaScript-ом**.

</td></tr></table>

</details>

<details>
<summary>Когда команда может использовать HTML preprocessor или template engine?</summary><br>
<table><tr><td>

**Короткий ответ**

HTML preprocessor или template engine полезны, когда разметка генерируется сервером, CMS, static site generator или
design system tooling. В Angular основным слоем обычно остаются Angular templates, но frontend-разработчик должен
понимать, откуда приходит HTML, какие fragments может вставлять backend и какие ограничения это создает для структуры,
styles и hydration.

**Полный ответ**

HTML preprocessor или template engine полезны, когда разметка генерируется сервером, CMS, static site generator или
design system tooling. В Angular основным слоем обычно остаются Angular templates, но frontend-разработчик должен
понимать, откуда приходит HTML, какие fragments может вставлять backend и какие ограничения это создает для структуры,
styles и hydration.

</td></tr></table>

</details>

<details>
<summary>Как backend или CMS может влиять на frontend markup?</summary><br>
<table><tr><td>

**Короткий ответ**

Backend или CMS могут добавлять wrappers, ids, classes, служебные attributes и готовые HTML-фрагменты. Эти соглашения
нужно учитывать, чтобы не сломать CSS, accessibility, analytics и автотесты. Хороший ответ включает мысль, что такие
контракты лучше документировать, а не выяснять по случайным DOM-структурам в production.

**Полный ответ**

Backend или CMS могут добавлять wrappers, ids, classes, служебные attributes и готовые HTML-фрагменты. Эти соглашения
нужно учитывать, чтобы не сломать CSS, accessibility, analytics и автотесты. Хороший ответ включает мысль, что такие
контракты лучше документировать, а не выяснять по случайным DOM-структурам в production.

</td></tr></table>

</details>

<details>
<summary>Как договориться о комментариях в HTML?</summary><br>
<table><tr><td>

**Короткий ответ**

HTML-комментарии стоит оставлять только для неочевидной структуры, интеграционного ограничения или временного
workaround. Они не должны пересказывать obvious markup. В Angular чаще лучше помогают понятные имена компонентов, inputs
и template blocks, а большой комментарий в template может быть сигналом, что код стоит упростить.

**Полный ответ**

HTML-комментарии стоит оставлять только для неочевидной структуры, интеграционного ограничения или временного
workaround. Они не должны пересказывать obvious markup. В Angular чаще лучше помогают понятные имена компонентов, inputs
и template blocks, а большой комментарий в template может быть сигналом, что код стоит упростить.

</td></tr></table>

</details>

<details>
<summary>Что делает атрибут <code>lang</code>?</summary><br>
<table><tr><td>

**Короткий ответ**

lang задает язык документа или фрагмента. Он помогает screen reader выбрать произношение, браузеру — проверку орфографии
и переносы, а поисковым системам — интерпретировать содержимое.

**Полный ответ**

`lang` задает язык документа или фрагмента. Он помогает screen reader выбрать произношение, браузеру — проверку
орфографии и переносы, а поисковым системам — интерпретировать содержимое.

</td></tr></table>

</details>

<details>
<summary>Для чего нужны <code>data-*</code> attributes?</summary><br>
<table><tr><td>

**Короткий ответ**

Они хранят небольшие пользовательские данные прямо на element и доступны через dataset. Их используют для связи разметки
с поведением или тестами, но не как замену application state и не для секретных данных.

**Полный ответ**

Они хранят небольшие пользовательские данные прямо на element и доступны через `dataset`. Их используют для связи
разметки с поведением или тестами, но не как замену application state и не для секретных данных.

</td></tr></table>

</details>

<details>
<summary>Из каких частей состоит HTML5 как open web platform?</summary><br>
<table><tr><td>

**Короткий ответ**

HTML5 в широком смысле часто называют набором Web Platform API: semantic HTML, forms, media, canvas, SVG, storage,
offline capabilities, history, drag and drop и messaging. На интервью важно не смешивать сам язык разметки с браузерными
API вокруг него. Для Angular-разработчика это база, на которую опираются компоненты, forms, routing и интеграции с
browser APIs.

**Полный ответ**

HTML5 в широком смысле часто называют набором Web Platform API: semantic HTML, forms, media, canvas, SVG, storage,
offline capabilities, history, drag and drop и messaging. На интервью важно не смешивать сам язык разметки с браузерными
API вокруг него. Для Angular-разработчика это база, на которую опираются компоненты, forms, routing и интеграции с
browser APIs.

</td></tr></table>

</details>

<details>
<summary>Чем cookie отличается от <code>sessionStorage</code> и <code>localStorage</code>?</summary><br>
<table><tr><td>

**Короткий ответ**

Cookie может автоматически отправляться с HTTP-запросами и иметь флаги HttpOnly, Secure, SameSite. localStorage и
sessionStorage доступны JavaScript, привязаны к origin и не отправляются автоматически; sessionStorage живет в рамках
вкладки, localStorage сохраняется дольше. Секретные tokens опасно хранить в Web Storage из-за XSS.

**Полный ответ**

Cookie может автоматически отправляться с HTTP-запросами и иметь флаги `HttpOnly`, `Secure`, `SameSite`. `localStorage`
и `sessionStorage` доступны JavaScript, привязаны к origin и не отправляются автоматически; `sessionStorage` живет в
рамках вкладки, `localStorage` сохраняется дольше. Секретные tokens опасно хранить в Web Storage из-за XSS.

</td></tr></table>

</details>

<details>
<summary>Чем <code>script</code>, <code>script async</code> и <code>script defer</code> отличаются?</summary><br>
<table><tr><td>

**Короткий ответ**

Обычный script блокирует HTML parsing до загрузки и выполнения. async загружается параллельно и выполняется сразу после
загрузки, поэтому порядок между async scripts не гарантирован. defer загружается параллельно, выполняется после parsing
в порядке объявления и обычно лучше подходит для application bundle.

**Полный ответ**

Обычный `script` блокирует HTML parsing до загрузки и выполнения. `async` загружается параллельно и выполняется сразу
после загрузки, поэтому порядок между async scripts не гарантирован. `defer` загружается параллельно, выполняется после
parsing в порядке объявления и обычно лучше подходит для application bundle.

</td></tr></table>

</details>

<details>
<summary>Почему clickable <code>div</code> — плохая практика?</summary><br>
<table><tr><td>

**Короткий ответ**

div не получает focus, keyboard activation, role и accessible name интерактивного элемента автоматически. Их ручная
имитация сложна и хрупка. Для действий следует использовать button, для переходов — a.

**Полный ответ**

`div` не получает focus, keyboard activation, role и accessible name интерактивного элемента автоматически. Их ручная
имитация сложна и хрупка. Для действий следует использовать `button`, для переходов — `a`.

</td></tr></table>

</details>

### HTML parsing, compatibility и resources

<details>
<summary>Что происходит после получения HTML-документа?</summary><br>
<table><tr><td>

**Короткий ответ**

Браузер начинает streaming parse HTML еще до полной загрузки документа: tokenizer и tree construction строят DOM,
preload scanner заранее обнаруживает ресурсы, параллельно загружаются CSS, JavaScript, изображения и fonts. Для первого
render браузеру нужны DOM и CSSOM, после чего идут style calculation, layout, paint и compositing.

**Полный ответ**

Получение HTML не означает, что браузер сначала скачивает весь файл, а потом начинает работать. Обычно обработка идет
потоково: новые байты приходят по сети и постепенно проходят decoding, tokenization и tree construction.

Упрощенная последовательность выглядит так:

1. **Network и decoding.** Браузер получает response, определяет encoding и превращает байты в символы.
2. **HTML tokenization.** Parser выделяет start tags, end tags, text, comments и другие tokens.
3. **Tree construction.** Из tokens строится DOM с учетом content model и правил error recovery.
4. **Resource discovery.** Parser и preload scanner находят stylesheets, scripts, images, fonts и другие зависимости.
5. **CSSOM.** Загруженные stylesheets разбираются в CSS object model.
6. **Style + layout.** Для видимых nodes вычисляются styles и геометрия.
7. **Paint + compositing.** Браузер рисует pixels и собирает слои в итоговый кадр.

Это не строго последовательный waterfall. Сеть, parsing и часть resource loading перекрываются по времени. Например,
preload scanner может найти `<img>` или `<link rel="stylesheet">` впереди основного parser и начать fetch раньше.

JavaScript способен менять эту картину. Классический parser-blocking script:

```html
<script src="app.js"></script>
```

может остановить HTML parser до загрузки и выполнения script, потому что JavaScript потенциально меняет документ через
DOM APIs или `document.write()`. `defer`, modules и подходящее placement уменьшают такой blocking.

CSS обычно не блокирует сам HTML parsing, но может задерживать render: браузеру нужен CSSOM, чтобы корректно посчитать
styles. Кроме того, script, который зависит от computed styles, тоже может косвенно ждать stylesheet.

Практический performance-вопрос поэтому звучит не «сколько весит HTML», а **что находится на Critical Rendering Path**:

- parser-blocking JavaScript;
- render-blocking CSS;
- web fonts;
- LCP image;
- long main-thread tasks;
- лишние redirects и connection setup.

В SSR/Angular сценарии server-rendered HTML может дать пользователю содержимое раньше bundle, но затем framework еще
должен bootstrap/hydrate приложение. Поэтому «HTML уже пришел» и «страница полностью интерактивна» — разные milestones.

На интервью полезно не перечислять весь browser engine: **HTML парсится потоково в DOM, ресурсы обнаруживаются и
загружаются параллельно, а первый render зависит от critical resources, CSSOM, layout и paint**.

</td></tr></table>

</details>

<details>
<summary>Что такое progressive enhancement?</summary><br>
<table><tr><td>

**Короткий ответ**

Progressive enhancement начинает с базового доступного HTML и основного пользовательского сценария, а затем добавляет
CSS, JavaScript и новые browser APIs как улучшения. Если enhancement недоступен или сломался, ключевой content и
действие по возможности остаются рабочими.

**Полный ответ**

Progressive enhancement — стратегия проектирования **от устойчивой базы к дополнительным возможностям**, а не список
fallback для старых браузеров.

Простой пример — поиск:

```html
<form
  action="/search"
  method="get"
>
  <label for="query">Поиск</label>
  <input
    id="query"
    name="q"
  />
  <button type="submit">Найти</button>
</form>
```

Без JavaScript form уже имеет понятную семантику и может отправить запрос. JavaScript затем может добавить autocomplete,
debounce, client-side validation или обновление результатов без full-page navigation.

Подход полезен по нескольким причинам.

**Resilience**

Bundle может не загрузиться из-за сети, CSP, CDN incident или runtime error. Если весь основной сценарий существует
только после JavaScript bootstrap, пользователь получает пустой или мертвый интерфейс.

**Accessibility**

Native HTML primitives уже содержат semantics, keyboard behavior и form behavior. Enhancement поверх них обычно
надежнее, чем custom widget с нуля.

**Performance**

Server-rendered или prerendered content может стать доступным до загрузки большого client bundle.

**Browser diversity**

Новый API можно включать через feature detection, не запрещая весь продукт пользователю, у которого нет одной advanced
capability.

Например:

```js
if ('share' in navigator) {
  showNativeShareButton();
}
```

При этом progressive enhancement не означает «приложение обязано полностью работать без JavaScript». Для сложного
редактора или IDE это может быть неразумно. Нужно определить **minimum viable experience**: что является core content и
какие действия должны переживать отсутствие конкретной enhancement.

Для Angular SSR это особенно полезная модель: SSR HTML дает ранний meaningful state, hydration добавляет client-side
interactivity, а отдельные advanced APIs подключаются только там, где доступны.

На интервью сильная формулировка: **progressive enhancement проектирует надежный baseline и делает сложность additive;
отказ одного слоя не должен без необходимости уничтожать весь пользовательский сценарий**.

</td></tr></table>

</details>

<details>
<summary>Чем progressive enhancement отличается от graceful degradation?</summary><br>
<table><tr><td>

**Короткий ответ**

Progressive enhancement проектирует продукт снизу вверх: сначала рабочий baseline, затем улучшения. Graceful degradation
обычно начинается с полнофункционального experience и определяет, как он упростится при отсутствии части возможностей.
Оба подхода стремятся сохранить полезный сценарий, но точка проектирования разная.

**Полный ответ**

Оба термина описывают устойчивость интерфейса при разных возможностях среды, но направление мышления отличается.

**Progressive enhancement:**

```text
semantic HTML -> CSS -> JavaScript -> advanced browser feature
```

Сначала проектируется минимальный надежный слой, а каждый следующий делает experience лучше.

**Graceful degradation:**

```text
full experience -> feature unavailable -> controlled fallback
```

Сначала существует богатый вариант, затем команда определяет приемлемое поведение для менее способной среды.

Например, редактор изображений может использовать WebGL как основной renderer. Полностью воспроизводить его без
JavaScript бессмысленно, но graceful degradation может дать preview, download original или понятное сообщение о
неподдерживаемой функции вместо crash.

А обычная форма регистрации естественно подходит progressive enhancement: native form работает сама, а JavaScript
добавляет password strength meter и inline validation.

Разница не означает, что один подход всегда «правильный», а второй устарел. Выбор зависит от продукта:

- content/service pages часто хорошо строятся progressive enhancement;
- specialized applications иногда логичнее проектировать full experience и явный degraded mode;
- отдельные компоненты могут использовать оба подхода одновременно.

Главная ошибка — называть graceful degradation ситуацию, когда unsupported browser просто получает белый экран. Degraded
experience все еще должен быть **преднамеренным и полезным**.

На интервью можно ответить через направление: **progressive enhancement добавляет capability к baseline, graceful
degradation снимает capability с full experience, стараясь сохранить core value**.

</td></tr></table>

</details>

<details>
<summary>Чем browser support отличается от browser optimization?</summary><br>
<table><tr><td>

**Короткий ответ**

Browser support — обещание, что в указанном окружении работает определенный набор пользовательских сценариев. Browser
optimization — дополнительная работа над скоростью, UX или использованием platform features для приоритетных окружений.
Поддерживать браузер не значит давать ему pixel-identical experience.

**Полный ответ**

Полезно разделять **contract корректности** и **уровень оптимизации**.

Browser support отвечает на вопрос:

> Может ли пользователь в этом browser/device выполнить обещанные продуктом сценарии с приемлемым качеством?

Например, support matrix может гарантировать login, поиск, оформление заявки и доступ к документам в последних двух
major versions Chrome, Edge, Firefox и Safari.

Browser optimization отвечает на другой вопрос:

> Где мы дополнительно тратим effort, чтобы experience был быстрее или богаче?

Например, приложение поддерживает Safari и Chrome, но для Chromium использует дополнительную производительную feature
только после feature detection. Safari получает тот же core scenario другим путем.

Поддержка не обязана означать:

- одинаковые animations;
- одинаковый native form UI;
- одинаковые fonts rasterization;
- поддержку каждой experimental API;
- pixel-perfect equality между engines.

Она должна описывать observable user outcome. Иначе QA получает бесконечную задачу «все должно быть одинаково везде».

Optimization также нельзя использовать как оправдание функциональной поломки. Если браузер заявлен supported, critical
flow должен работать даже без отдельных performance enhancements.

Практически полезно фиксировать:

- supported versions/devices;
- core scenarios;
- accessibility baseline;
- допустимые visual differences;
- advanced features с отдельным fallback;
- процесс снятия support.

На интервью сильный ответ: **support — это product contract на работоспособность, optimization — приоритизация качества
и performance поверх этого contract**.

</td></tr></table>

</details>

<details>
<summary>Как определить, какие браузеры поддерживать?</summary><br>
<table><tr><td>

**Короткий ответ**

Support matrix определяют по реальной аналитике аудитории, business/regulatory requirements, корпоративным ограничениям,
capabilities продукта и стоимости QA/разработки. Ее нужно версионировать и регулярно пересматривать, а не выбирать по
личным предпочтениям команды.

**Полный ответ**

Фраза «поддерживаем современные браузеры» почти бесполезна: она не определяет версии, устройства и критерий
работоспособности. Нужна явная support policy.

Решение обычно собирают из нескольких источников.

**Product analytics**

Какой процент active users использует конкретные browser/version/device combinations? Для B2B особенно важно смотреть не
на глобальную статистику, а на собственных клиентов.

**Business requirements**

Один enterprise customer со старым managed browser может быть важнее 0.2% общей аудитории.

**Regulatory и accessibility requirements**

Государственные или финансовые продукты могут иметь дополнительные требования к environments и assistive technologies.

**Required Web APIs**

Если ключевая функция зависит от WebAuthn, camera, WebGL или другой capability, нужно проверить поддержку и качество
реализации, а не только browser version.

**Cost of support**

Каждый дополнительный environment увеличивает test matrix, polyfills, workarounds и incident surface. Support имеет
цену, поэтому legacy browser не должен сохраняться «навсегда по привычке».

После решения policy связывают с tooling: Browserslist/targets, transpilation, polyfills, CI/e2e matrix и QA devices. Но
Browserslist сам по себе не является продуктовой policy: он описывает технические targets, а не полный набор user
scenarios.

Полезно заранее определить критерий удаления browser version: например, usage ниже порога несколько месяцев и отсутствие
contractual клиентов. Изменение support лучше анонсировать, а не обнаруживать после случайного dependency upgrade.

На интервью хорошо показать product thinking: **browser matrix — результат данных, обязательств и стоимости, после чего
она превращается в конкретные build/test targets**.

</td></tr></table>

</details>

<details>
<summary>Что такое graded browser support?</summary><br>
<table><tr><td>

**Короткий ответ**

Graded browser support делит environments на уровни с разными гарантиями: например, full support, functional support и
unsupported/limited fallback. Это делает ожидания проверяемыми и не заставляет команду обещать одинаковый experience для
всех браузеров.

**Полный ответ**

Идея graded support — заменить бинарное «работает / не работает» несколькими **уровнями service contract**.

Пример:

| Tier        | Гарантия                                                                              |
| ----------- | ------------------------------------------------------------------------------------- |
| A           | Полный функционал, визуальная проверка, performance budget и регулярный e2e           |
| B           | Core flows и accessibility работают, minor visual differences допустимы               |
| C           | Readable content или explicit fallback без полного interactive experience             |
| Unsupported | Нет гарантии, показывается понятное требование обновить environment при необходимости |

Такой подход полезен, когда аудитория гетерогенна. Например, основной B2C трафик тестируется глубоко на актуальных
mobile Safari/Chrome, а редкий corporate browser сохраняет critical business flow без всех animation/performance
guarantees.

Tier должен описывать не название браузера, а **что именно команда проверяет**. Иначе «Tier B» превращается в красивую
метку без смысла.

Нужно также избегать вечного накопления tiers. Если environment почти не используется, поддержка должна иметь owner и
review date.

Graded support хорошо сочетается с progressive enhancement: lower tier может получить baseline, а richer capabilities
включаются в более сильных environments.

На интервью полезно сказать: **graded support управляет стоимостью compatibility через разные явные SLA опыта, а не
через случайный набор browser hacks**.

</td></tr></table>

</details>

<details>
<summary>Когда компоненту нужна отдельная browser support policy?</summary><br>
<table><tr><td>

**Короткий ответ**

Отдельная policy нужна, когда capability компонента уже общей матрицы приложения: camera, clipboard, WebGL, file system,
advanced drag-and-drop, heavy graphics или другой API с неодинаковой поддержкой. Тогда документируют feature detection,
fallback и environments, где гарантируется полный сценарий.

**Полный ответ**

Product-level support matrix не всегда достаточно. Страница может быть поддержана в Safari, но конкретный 3D editor,
camera scanner или advanced clipboard flow иметь более узкие технические требования.

Отдельная component/feature policy оправдана, если есть хотя бы одно из условий:

- зависимость от browser API с неоднородной поддержкой;
- существенная разница mobile/desktop input model;
- hardware requirement, например camera/GPU;
- performance threshold, без которого feature становится практически непригодной;
- permission model, которая сильно различается между environments;
- сложный fallback, который сам является отдельным продуктовым сценарием.

Например, общий продукт поддерживает iOS Safari, но bulk file editor требует File System Access API. Вместо ложного
«Safari unsupported» можно оставить приложение supported и дать editor другой flow: обычный `<input type="file">`,
download archive или server-side обработку.

Правильная реализация обычно использует **feature detection**, а не user-agent sniffing:

```js
if ('showOpenFilePicker' in window) {
  // enhanced flow
} else {
  // fallback
}
```

UA detection иногда нужен для известных engine bugs, но как основная capability model он хрупок.

Policy должна отвечать:

- где full experience;
- что является fallback;
- как сообщается недоступность;
- какие tests запускаются;
- кто владеет compatibility decision.

На интервью сильная мысль: **support матрица продукта описывает доступность продукта, а отдельная feature policy — более
узкий contract конкретной capability, не понижая без необходимости весь browser до unsupported**.

</td></tr></table>

</details>

<details>
<summary>Почему HTML-парсер не падает на невалидной разметке?</summary><br>
<table><tr><td>

**Короткий ответ**

HTML parser intentionally error-tolerant: спецификация задает deterministic tokenization, tree construction и error
recovery для множества невалидных случаев. Браузер строит исправленный DOM вместо того, чтобы прекращать отображение
страницы, поэтому DOM может отличаться от исходного source.

**Полный ответ**

HTML исторически должен был отображать огромный объем несовершенной разметки в интернете. Если бы одна ошибка закрытия
tag останавливала документ как строгий XML parser, web был бы значительно менее совместим.

Поэтому HTML parsing specification описывает не только valid syntax, но и **точные recovery rules**.

Например:

```html
<p>One</p>
<p>Two</p>
```

При встрече второго `p` parser автоматически закрывает предыдущий paragraph. В DOM получится два sibling `p`, хотя в
source нет явного `</p>` перед вторым.

Другой известный пример — таблицы: browser может добавить `tbody`, которого не было явно в source, или переставить nodes
из недопустимой позиции по правилам tree construction.

Это важно для разработки по нескольким причинам.

**DOM может не повторять source**

DevTools Elements показывает построенное tree, а View Source — исходный response.

**Невалидность не означает predictability**

«Браузер все исправит» — плохая стратегия. Recovery rules сложны, а разные контексты (`table`, `p`, formatting elements)
могут дать неожиданное tree.

**Framework hydration чувствительна к структуре**

Если server markup невалиден и parser перестроил DOM, client framework может получить hydration mismatch.

**Security/sanitization**

Нельзя проектировать sanitizer исходя из наивной строковой модели tags; parser behavior и DOM contexts имеют значение.

Поэтому validator/linter все еще полезен, хотя browser page визуально «работает».

На интервью стоит сказать: **HTML forgiving не потому, что ошибок нет, а потому что error recovery стандартизирован;
браузер продолжает parsing и строит определенный DOM, который иногда отличается от написанного source**.

</td></tr></table>

</details>

<details>
<summary>Чем DOM отличается от HTML source?</summary><br>
<table><tr><td>

**Короткий ответ**

HTML source — исходный текст документа. DOM — текущее объектное дерево после parsing/error recovery и последующих
изменений JavaScript. Поэтому View Source и DevTools Elements могут показывать разную структуру и значения.

**Полный ответ**

HTML source и DOM относятся к разным этапам жизни страницы.

**HTML source** — текст, полученный по сети или записанный в документ:

```html
<ul id="list"></ul>
```

**DOM** — объектная модель, созданная parser и доступная через JavaScript:

```js
const list = document.querySelector('#list');
list.append(document.createElement('li'));
```

После этого DOM содержит `li`, хотя исходный server response его не содержал.

DOM может отличаться от source еще до JavaScript из-за parser recovery:

- optional tags;
- автоматически созданные nodes;
- исправленная вложенность;
- нормализация HTML-specific structure.

После запуска приложения различие становится еще сильнее: Angular/React добавляют и удаляют nodes, меняют attributes,
рендерят portals/overlays и обновляют text.

Практическое следствие для debugging:

- **View Source / network response** отвечает «что прислал server?»;
- **Elements panel / DOM APIs** отвечает «что browser имеет сейчас?».

Это особенно важно при SSR/hydration. Если ошибка существует уже в server HTML, нужно смотреть response/source. Если она
появляется после bootstrap, нужен current DOM и framework lifecycle.

DOM также не равен accessibility tree: accessibility model строится на основе DOM, semantics, styles и ARIA, но может
скрывать часть nodes или представлять их другими roles.

На интервью полезная формула: **source — serialization на входе parser, DOM — live runtime model после parser и
JavaScript**.

</td></tr></table>

</details>

<details>
<summary>Что такое preload, prefetch и preconnect?</summary><br>
<table><tr><td>

**Короткий ответ**

`preload` заранее загружает важный ресурс текущей navigation, `prefetch` с низким приоритетом готовит вероятный ресурс
для будущей navigation, `preconnect` заранее выполняет connection setup к origin. Все hints нужно применять выборочно:
лишние hints расходуют bandwidth, sockets и конкурируют с critical resources.

**Полный ответ**

Resource hints решают разные части latency, поэтому их нельзя считать тремя вариантами одного и того же.

**`preload` — «этот ресурс нужен текущей странице скоро»**

```html
<link
  rel="preload"
  href="/fonts/inter.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

Browser начинает fetch раньше обычного discovery. `as` важен для приоритета, CSP и cache matching. Неправильный preload
может привести к двойной загрузке или забрать bandwidth у реально critical resource.

Типичные кандидаты: critical font, hero/LCP image или ресурс, который browser иначе обнаружит слишком поздно. Но preload
не должен превращаться в список всех assets страницы.

**`prefetch` — «этот ресурс, вероятно, пригодится позже»**

```html
<link
  rel="prefetch"
  href="/next-page.js"
/>
```

Обычно имеет более низкий priority и полезен для вероятной следующей navigation. Browser может игнорировать hint в
зависимости от network/policy.

**`preconnect` — «скоро понадобится этот origin»**

```html
<link
  rel="preconnect"
  href="https://cdn.example.com"
  crossorigin
/>
```

Он заранее выполняет DNS/TCP/TLS connection setup, но не загружает конкретный файл. Это полезно для действительно
критичного third-party origin. Preconnect ко всем возможным доменам тратит sockets и ресурсы.

Есть также `dns-prefetch`, который делает только DNS lookup и дешевле полного preconnect.

Hints — **подсказки browser scheduler**, а не абсолютные команды. Их эффективность нужно проверять через waterfall,
Performance panel и реальные Web Vitals. То, что ускоряет desktop broadband, может ухудшить constrained mobile network.

На интервью сильный ответ: **preload двигает fetch текущего critical resource раньше, prefetch готовит вероятное
будущее, preconnect сокращает connection latency; каждый hint имеет opportunity cost**.

</td></tr></table>

</details>

### Forms

<details>
<summary>Как работает HTML form?</summary><br>
<table><tr><td>

**Короткий ответ**

`form` объединяет form controls и описывает native submit flow. При отправке браузер запускает constraint validation,
собирает успешные controls в пары `name=value`, кодирует данные и отправляет их на `action` выбранным `method`, если
JavaScript не отменил submit.

**Полный ответ**

HTML form — не просто контейнер для `input`. Это browser primitive, который связывает controls, validation, submit
semantics и формирование запроса.

Простейший пример:

```html
<form
  action="/search"
  method="get"
>
  <label for="query">Поиск</label>
  <input
    id="query"
    name="q"
    required
  />
  <button type="submit">Найти</button>
</form>
```

Native submit можно запустить кнопкой `type="submit"`, Enter в подходящем control или методом `requestSubmit()`. Перед
сетевой отправкой браузер обычно:

1. определяет submitter — кнопку, которая инициировала отправку;
2. выполняет constraint validation, если она не отключена;
3. создает form data set только из успешных controls;
4. выбирает URL, method и encoding;
5. генерирует `submit` event;
6. если event не отменен, выполняет navigation/request.

В набор данных обычно попадают controls с `name`. Не отправляются, например, `disabled` controls, unchecked
checkbox/radio и controls без `name`.

JavaScript может перехватить flow:

```js
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  // отправить через fetch или обработать локально
});
```

Но даже SPA выигрывает от настоящего `form`: остаются Enter-to-submit, semantics, native validation и понятный contract
между controls.

Важно различать `form.submit()` и `form.requestSubmit()`: `requestSubmit()` имитирует обычную отправку с validation и
`submit` event, а `submit()` обходит эти шаги и используется заметно реже.

Backend всегда должен повторно валидировать и авторизовывать данные. DOM, hidden fields и client validation контролирует
пользователь.

На интервью полезная формула: **form — это встроенный protocol браузера для группировки controls, validation и submit;
JavaScript может расширить или перехватить этот flow, но не обязан реализовывать его с нуля**.

</td></tr></table>

</details>

<details>
<summary>Что делают <code>action</code> и <code>method</code> у формы?</summary><br>
<table><tr><td>

**Короткий ответ**

`action` задает destination отправки, а `method` — способ submit. Для обычной HTTP-отправки HTML form использует `get`
или `post`: GET кодирует данные в URL, POST отправляет их в request body. Submit button может переопределить настройки
через `formaction` и `formmethod`.

**Полный ответ**

`action` отвечает на вопрос **куда отправлять form data**, а `method` — **как сформировать submission**.

```html
<form
  action="/orders"
  method="post"
>
  <input name="comment" />
  <button type="submit">Создать</button>
</form>
```

Если `action` не задан, form отправляется на URL текущего документа. Для network submission основные методы HTML — GET и
POST.

**GET** сериализует данные в query string:

```text
/search?q=angular&page=2
```

**POST** помещает form payload в request body. Его формат задает `enctype`; типичный default —
`application/x-www-form-urlencoded`, а для upload используют `multipart/form-data`.

```html
<form
  action="/avatar"
  method="post"
  enctype="multipart/form-data"
>
  <input
    type="file"
    name="avatar"
  />
  <button type="submit">Загрузить</button>
</form>
```

У submit buttons есть полезный override contract:

```html
<button type="submit">Сохранить</button>
<button
  type="submit"
  formaction="/preview"
  formmethod="post"
>
  Preview
</button>
```

Это позволяет одной форме иметь несколько осмысленных submit actions без ручного click-handler для каждой кнопки.

У `method` также существует `dialog` для form внутри `<dialog>`: он закрывает dialog и не делает обычный HTTP request.

HTML form не умеет напрямую отправлять `PUT`, `PATCH` или `DELETE`. Для них обычно используют JavaScript/fetch или
server-side method override.

И главное: method не является security boundary. POST не скрывает данные от сети без HTTPS и не заменяет authentication,
authorization или CSRF protection.

На интервью достаточно связать `action` с destination, `method` с HTTP semantics и упомянуть `enctype`/submitter
overrides как практические детали.

</td></tr></table>

</details>

<details>
<summary>Чем GET form отличается от POST form?</summary><br>
<table><tr><td>

**Короткий ответ**

GET подходит для безопасных операций вроде поиска и фильтров: параметры становятся частью URL, который можно сохранить,
скопировать и повторить. POST отправляет данные в body и обычно используется для изменений состояния. Ни POST, ни GET не
заменяют HTTPS, validation и authorization.

**Полный ответ**

Разница важнее, чем просто «query string против body»: выбор должен отражать **семантику операции**.

GET используют для чтения и поиска, которые не должны менять значимое server state:

```html
<form
  action="/catalog"
  method="get"
>
  <input name="query" />
  <button type="submit">Искать</button>
</form>
```

Получается URL вроде:

```text
/catalog?query=monitor
```

Плюсы GET для такого сценария:

- URL можно bookmark/share;
- browser history естественно хранит состояние фильтра;
- navigation можно повторять;
- HTTP caches и crawlers понимают read semantics лучше.

POST обычно выбирают для создания сущности, команды или передачи большого payload:

```html
<form
  action="/orders"
  method="post"
>
  ...
</form>
```

Но есть важные ограничения.

**POST не означает «секретно».** Body виден client tools, server logs/proxies могут его записывать, а транспорт защищает
HTTPS.

**GET не должен менять состояние.** Prefetcher, crawler или пользователь, повторив URL, не должен случайно удалить
запись или провести платеж.

**POST не гарантирует idempotency.** Double submit может создать два заказа, поэтому критические операции часто требуют
idempotency key или server-side deduplication.

**Метод не заменяет security.** И GET, и POST требуют server validation, authentication/authorization; state-changing
requests дополнительно проектируют с учетом CSRF.

На интервью сильный ответ: **GET моделирует безопасное чтение и делает параметры частью адреса ресурса, POST моделирует
submission/command; security определяется не тем, где лежат параметры**.

</td></tr></table>

</details>

<details>
<summary>Почему специализированные типы <code>input</code> полезнее <code>text</code>?</summary><br>
<table><tr><td>

**Короткий ответ**

`email`, `number`, `date`, `url`, `tel`, `search`, `checkbox` и другие типы дают браузеру больше смысла: подходящий UI,
mobile keyboard, value model и часть native validation. Но browser behavior различается, а server validation все равно
обязательна.

**Полный ответ**

`type` сообщает браузеру **какие данные ожидаются и какое native behavior можно дать пользователю**.

```html
<input
  type="email"
  name="email"
  autocomplete="email"
/>
<input
  type="date"
  name="birthday"
/>
<input
  type="number"
  name="count"
  min="1"
  max="10"
/>
```

Преимущества специализированных типов:

- подходящая экранная клавиатура на mobile;
- встроенные controls, например date picker;
- type-specific validation;
- корректный value contract;
- лучшее autofill поведение;
- дополнительная semantics для tooling и assistive technologies.

Но `type` нужно выбирать по **модели данных**, а не по желаемой клавиатуре. Например, телефон, ZIP code или номер карты
часто являются строками, а не числами: ведущие нули и формат имеют смысл. Для keyboard hint можно использовать
`inputmode`:

```html
<input
  name="otp"
  inputmode="numeric"
  autocomplete="one-time-code"
/>
```

`input type="number"` имеет собственные нюансы: stepper UI, `min/max/step`, locale-specific input и value parsing. Он не
является универсальным способом запретить все нецифровые символы.

Date/time controls также могут визуально различаться между браузерами и OS. Если product требует custom picker, native
input semantics и validation все равно стоит учитывать.

Client type validation нельзя считать security: request можно отправить напрямую, не используя форму.

На интервью полезно сказать: **specialized type переносит часть UX и validation в platform, но type должен отражать
семантику данных, а не заменять domain validation**.

</td></tr></table>

</details>

<details>
<summary>Что такое <code>label</code> и как связать его с control?</summary><br>
<table><tr><td>

**Короткий ответ**

`label` задает form control понятное имя и увеличивает clickable area. Надежный вариант — связать `label[for]` с
уникальным `id` control; также control можно вложить внутрь `label`.

**Полный ответ**

Form field должен иметь понятное **accessible name**, и для большинства обычных inputs лучший primitive — настоящий
`label`.

Явная связь:

```html
<label for="email">Email</label>
<input
  id="email"
  name="email"
  type="email"
/>
```

`for` содержит `id` control. При клике на label browser переводит focus/activation к связанному control, что особенно
полезно для checkbox и radio с маленькой визуальной областью.

Возможна implicit association:

```html
<label>
  Email
  <input
    name="email"
    type="email"
  />
</label>
```

Явная связь часто удобнее в component layout, потому что label и input могут находиться в разных wrappers.

Label — не место для длинной инструкции. Дополнительную подсказку обычно выводят отдельно и связывают через
`aria-describedby`:

```html
<label for="password">Пароль</label>
<input
  id="password"
  aria-describedby="password-hint"
/>
<p id="password-hint">Минимум 12 символов</p>
```

`aria-label` может дать accessible name icon-only/custom control, но для обычного видимого поля он хуже настоящей
видимой подписи: пользователь тоже должен понимать назначение control.

В component library важно проверить, что генерируемые `id` уникальны и wrapper-компонент не разрывает association.

На интервью: **label дает не просто текст рядом с input, а программно определимую связь между названием и control**.

</td></tr></table>

</details>

<details>
<summary>Почему <code>placeholder</code> не должен заменять <code>label</code>?</summary><br>
<table><tr><td>

**Короткий ответ**

Placeholder — временная подсказка внутри поля: он исчезает при вводе, может иметь слабый contrast и не является надежной
заменой постоянному accessible name. Его используют для примера значения, а назначение control задают label.

**Полный ответ**

UI вида

```html
<input placeholder="Email" />
```

выглядит компактно, но теряет важную информацию сразу после того, как пользователь начал вводить значение.

Проблемы placeholder-as-label:

- пользователь перестает видеть, что означает поле;
- трудно сравнить несколько заполненных fields;
- placeholder часто стилизуют менее контрастно;
- assistive technology behavior исторически неоднородно;
- текст внутри поля легко спутать с уже введенным значением;
- autofill может заполнить поле, оставив интерфейс без видимой подписи.

Правильнее:

```html
<label for="phone">Телефон</label>
<input
  id="phone"
  name="phone"
  placeholder="+372 5555 5555"
/>
```

Здесь label отвечает **что это**, placeholder — **пример формата**.

Floating label pattern допустим, если подпись действительно остается видимой и программно связанной с control после
ввода, а не просто является placeholder с CSS-анимацией.

Если пример или инструкция важны для успешного ввода, их лучше не прятать в placeholder вообще: постоянный hint рядом с
полем устойчивее.

На интервью хороший ответ связывает placeholder не только с accessibility, но и с memory load: **пользователю не нужно
помнить назначение уже заполненного поля**.

</td></tr></table>

</details>

<details>
<summary>Для чего нужен <code>name</code> у form control?</summary><br>
<table><tr><td>

**Короткий ответ**

`name` задает ключ control при native form submission и используется для группировки radio buttons. Control без `name`
обычно не попадает в form data set, даже если у него есть `id`.

**Полный ответ**

`id` и `name` решают разные задачи:

- `id` идентифицирует DOM element и связывает его, например, с `label[for]`;
- `name` участвует в **form data contract**.

```html
<label for="email">Email</label>
<input
  id="email"
  name="email"
  value="user@example.com"
/>
```

При submit получится примерно:

```text
email=user%40example.com
```

Если убрать `name`, визуально поле продолжит работать, но browser не включит его значение в native submission/FormData.

Некоторые controls имеют дополнительные правила:

- unchecked checkbox не отправляется;
- checked checkbox без явного `value` обычно передает default value `on`;
- radio buttons с одинаковым `name` образуют одну группу и передают value выбранного варианта;
- `disabled` control не является successful control и не отправляется;
- несколько controls могут иметь одинаковый `name`, тогда form data содержит несколько значений.

Это полезно и без network submit:

```js
const data = new FormData(form);
console.log(data.get('email'));
```

Не стоит использовать `name` как security или globally unique identifier. Client может изменить любое значение перед
request.

На интервью формула: **`id` связывает DOM, `name` связывает control с form payload**.

</td></tr></table>

</details>

<details>
<summary>Что такое native validation?</summary><br>
<table><tr><td>

**Короткий ответ**

Constraint Validation API позволяет браузеру проверять `required`, type constraints, `min/max`, `minlength/maxlength`,
`pattern`, `step` и другие правила перед submit. Это UX-слой, а не security boundary: backend должен валидировать данные
заново.

**Полный ответ**

HTML controls умеют участвовать во встроенной constraint validation.

```html
<input
  type="email"
  name="email"
  required
  maxlength="120"
/>
```

Browser вычисляет `validity` и может заблокировать native submit, если control нарушает constraint.

Основные состояния доступны через `ValidityState`: `valueMissing`, `typeMismatch`, `patternMismatch`, `tooShort`,
`rangeUnderflow`, `stepMismatch` и другие.

JavaScript API:

```js
input.checkValidity();
input.reportValidity();
input.setCustomValidity('Такой email уже используется');
```

`setCustomValidity()` нужно затем сбросить пустой строкой, иначе control продолжит считаться invalid.

Validation можно отключить у всей формы через `novalidate` или для конкретной submit button через `formnovalidate`.

CSS получает useful pseudo-classes вроде `:valid`, `:invalid`, `:user-valid`/`:user-invalid` там, где они
поддерживаются. Но показывать красные ошибки на первом render обычно плохой UX: validation должна учитывать момент
взаимодействия.

Native messages и UI зависят от browser/locale, поэтому design system иногда показывает собственные сообщения, но это не
обязывает выбрасывать platform validity model.

Самое важное ограничение: пользователь может удалить attributes в DevTools или отправить request напрямую. Server
validation проверяет domain rules, consistency и authorization независимо от client.

На интервью сильная мысль: **native validation дает бесплатный baseline и API для UX, но доверенной остается только
server-side проверка**.

</td></tr></table>

</details>

<details>
<summary>Для чего нужен <code>autocomplete</code>?</summary><br>
<table><tr><td>

**Короткий ответ**

`autocomplete` сообщает браузеру назначение поля: `name`, `email`, `username`, `current-password`, `new-password`,
`one-time-code`, `shipping` и другие tokens. Это улучшает autofill, password managers и доступность, если tokens
отражают реальный смысл данных.

**Полный ответ**

Browser не должен угадывать назначение каждого поля только по placeholder или CSS. `autocomplete` дает машинно-читаемый
hint.

```html
<input
  name="email"
  autocomplete="email"
/>
<input
  type="password"
  name="password"
  autocomplete="current-password"
/>
```

Для регистрации:

```html
<input
  name="username"
  autocomplete="username"
/>
<input
  type="password"
  name="password"
  autocomplete="new-password"
/>
```

Для адресов tokens можно уточнять контекстом `shipping`/`billing`, а `section-*` помогает различать несколько одинаковых
наборов fields на одной странице.

Плюсы:

- меньше ручного ввода;
- меньше опечаток;
- лучшее password-manager behavior;
- полезно пользователям с моторными или когнитивными ограничениями;
- mobile browser может предложить OTP через `one-time-code`.

`autocomplete="off"` не является надежным security mechanism: браузеры и password managers могут сознательно
игнорировать его для credentials, чтобы не поощрять слабые password practices.

Не стоит ставить неверный token ради желаемого UI: autofill может подставить чувствительные данные не в то поле.

На интервью: **autocomplete — semantic contract с browser autofill, а не просто on/off switch**.

</td></tr></table>

</details>

<details>
<summary>Как сделать accessible error message для поля?</summary><br>
<table><tr><td>

**Короткий ответ**

Ошибка должна быть конкретной, видимой и программно связанной с control, например через `aria-describedby`; invalid
state можно обозначить `aria-invalid="true"`. После submit нужен понятный focus/error-summary strategy, но focus не
стоит дергать на каждую ошибку во время ввода.

**Полный ответ**

Плохая ошибка сообщает только «неверное значение» или меняет цвет border. Хорошая отвечает **что не так и как
исправить**.

```html
<label for="email">Email</label>
<input
  id="email"
  name="email"
  aria-invalid="true"
  aria-describedby="email-error"
/>
<p id="email-error">Введите адрес в формате name@example.com</p>
```

Здесь сообщение:

- видно всем пользователям;
- связано с input в accessibility tree;
- не полагается только на цвет;
- содержит actionable instruction.

Если у поля одновременно hint и error, `aria-describedby` может ссылаться на оба ids.

После submit длинной формы полезен error summary с links к проблемным fields. Обычно focus переводят в summary или
первый invalid control **один раз после неуспешной отправки**, а не скачут focus-ом на каждом `input` event.

Для динамического появления ошибки live region используют осторожно. Если каждое нажатие клавиши вызывает assertive
announcement, screen reader experience становится шумным. Часто достаточно связи через description и сообщения после
blur/submit.

`aria-invalid` не выполняет validation само: это только accessibility state. Domain validation и business rules остаются
в коде/server.

На интервью полезно перечислить три слоя: **визуальное сообщение + programmatic relation + разумное focus/announcement
behavior**.

</td></tr></table>

</details>

<details>
<summary>Почему disabled field не отправляется вместе с формой?</summary><br>
<table><tr><td>

**Короткий ответ**

`disabled` control исключается из focus order, constraint validation и набора успешных controls при submit. Это часть
HTML semantics: disabled значение считается недоступным для взаимодействия, поэтому browser не включает его в form data.

**Полный ответ**

```html
<input
  name="plan"
  value="pro"
  disabled
/>
```

Визуально значение есть в DOM, но native submission не отправит `plan=pro`.

Это часто удивляет при форме редактирования: разработчик disables поле, чтобы запретить изменение, а backend перестает
получать значение.

Если значение должно быть отправлено, нужно выбрать подходящую модель:

- `readonly` для поддерживаемых текстовых controls, если пользователь должен видеть и отправлять значение;
- отдельный hidden control, если payload действительно требует это поле;
- лучше всего — server может сам восстановить trusted значение из сущности/session вместо доверия client.

```html
<input
  value="PRO"
  readonly
/>
<input
  type="hidden"
  name="planId"
  value="42"
/>
```

Hidden field **не становится защищенным**: его легко изменить через DevTools/request. Например, цену или роль нельзя
доверять только потому, что input скрыт или disabled.

`fieldset disabled` распространяет disabled state на большинство потомков; содержимое первого `legend` имеет специальное
исключение для взаимодействия.

На интервью сильный ответ: **disabled означает не только внешний вид, а исключение control из interaction и submission
model**.

</td></tr></table>

</details>

<details>
<summary>Чем <code>disabled</code> отличается от <code>readonly</code>?</summary><br>
<table><tr><td>

**Короткий ответ**

`disabled` control нельзя использовать, он обычно не получает focus и не отправляется. `readonly` применяется только к
поддерживаемым text-like controls: значение нельзя редактировать обычным вводом, но control остается focusable и
отправляется с формой.

**Полный ответ**

Оба состояния могут визуально означать «нельзя менять», но contract у них разный.

```html
<input
  name="id"
  value="A-42"
  readonly
/>
<input
  name="internal"
  value="secret"
  disabled
/>
```

**`disabled`:**

- control недоступен для обычного interaction;
- не участвует в Tab navigation в стандартном случае;
- не участвует в constraint validation;
- не входит в native form submission;
- поддерживается многими form controls.

**`readonly`:**

- пользователь не может изменить значение обычным вводом;
- control остается focusable;
- значение отправляется;
- readonly control не участвует в constraint validation;
- attribute применим к ограниченному набору controls, главным образом text-like `input` и `textarea`.

У checkbox, radio, select или button нет эквивалентного native `readonly`. Если product хочет «показывать выбор, но не
давать менять», иногда лучше вывести обычный текст вместо fake-disabled interactive control.

Еще один UX trade-off: disabled control часто имеет низкий contrast и не позволяет пользователю скопировать значение.
Readonly поле может быть лучше, если данные полезно выделить/copy.

Ни `disabled`, ни `readonly` не являются authorization. Client может создать собственный request с любым значением.

На интервью: **disabled убирает control из формы как активный участник; readonly сохраняет его как отправляемое
значение, но запрещает редактирование**.

</td></tr></table>

</details>

<details>
<summary>Для чего нужны <code>fieldset</code> и <code>legend</code>?</summary><br>
<table><tr><td>

**Короткий ответ**

`fieldset` семантически группирует связанные form controls, а `legend` дает группе общее название. Это особенно важно
для radio/checkbox groups, где отдельные labels называют варианты, но не объясняют общий вопрос.

**Полный ответ**

Представим группу:

```html
<fieldset>
  <legend>Способ доставки</legend>

  <label>
    <input
      type="radio"
      name="delivery"
      value="courier"
    />
    Курьер
  </label>
  <label>
    <input
      type="radio"
      name="delivery"
      value="pickup"
    />
    Самовывоз
  </label>
</fieldset>
```

Каждый radio имеет свой label, но `legend` сообщает контекст всей группы: **что именно пользователь выбирает**. Screen
reader может объявлять group name вместе с вариантами.

`fieldset` полезен не только для radio: им группируют связанные addresses, contact preferences или набор checkbox, если
группа имеет общий вопрос.

Есть и behavior: `fieldset disabled` disabled большинство form controls внутри группы. Это удобный native способ
заблокировать целый section формы.

```html
<fieldset disabled>
  <legend>Дополнительные настройки</legend>
  ...
</fieldset>
```

При этом спецификация имеет special case для descendants первого `legend`, поэтому не стоит моделировать disabled logic
только по внешнему виду.

Не каждый визуальный card должен становиться fieldset. Если внутри нет логически связанной группы form controls, обычный
container корректнее.

В design system важно не потерять `<legend>` при создании красивого group component: визуальный title и semantic group
name должны оставаться связанными.

На интервью: **label называет конкретный control, legend — вопрос/назначение группы controls**.

</td></tr></table>

</details>

<details>
<summary>Как группировать radio buttons?</summary><br>
<table><tr><td>

**Короткий ответ**

Radio buttons одного выбора получают одинаковый `name`, уникальные `id`, собственные `value` и labels. Группу обычно
оборачивают в `fieldset` с `legend`; native radio уже дает взаимное исключение и ожидаемую keyboard navigation.

**Полный ответ**

Правильная native группа:

```html
<fieldset>
  <legend>Тема</legend>

  <input
    id="theme-light"
    type="radio"
    name="theme"
    value="light"
    checked
  />
  <label for="theme-light">Светлая</label>

  <input
    id="theme-dark"
    type="radio"
    name="theme"
    value="dark"
  />
  <label for="theme-dark">Темная</label>
</fieldset>
```

Главное правило — **одинаковый `name`**. Browser гарантирует, что в группе выбран максимум один radio, а submit передает
value выбранного варианта:

```text
theme=dark
```

`id` нужен для label association и должен быть уникальным, а `value` должен быть стабильным machine-readable contract,
не обязательно совпадающим с локализованным текстом label.

Если выбор обязателен, `required` на radio делает обязательной группу с этим `name`; на практике достаточно constraint
на одном из controls группы.

Native radios также имеют ожидаемое keyboard behavior: Tab входит в группу, arrow keys меняют selection согласно
browser/platform conventions. При custom styling лучше визуально скрывать native input корректным способом, а не
заменять его набором `div` с ручным ARIA без необходимости.

Если options можно выбирать несколько одновременно, это уже checkbox group, а не radios.

На интервью сильная формулировка: **`name` создает логическую radio group, `value` описывает выбранный вариант,
`fieldset/legend` добавляют общий доступный контекст**.

</td></tr></table>

</details>

### Accessibility

<details>
<summary>Что такое accessibility и WCAG?</summary><br>
<table><tr><td>

**Короткий ответ**

Accessibility, или a11y, — проектирование интерфейса так, чтобы им могли пользоваться люди с разными возможностями,
устройствами и способами ввода. WCAG 2.2 — актуальная рекомендация W3C: success criteria организованы вокруг принципов
perceivable, operable, understandable и robust и имеют уровни A, AA и AAA.

**Полный ответ**

Accessibility — это не отдельная «поддержка screen reader», а качество продукта для пользователей с разными зрительными,
слуховыми, моторными, когнитивными особенностями и временными ограничениями. Сюда же попадают keyboard-only users, zoom,
high contrast, speech input и другие способы взаимодействия.

WCAG 2.2 группирует требования по четырем принципам **POUR**:

- **Perceivable** — информацию можно воспринять, например есть text alternatives и достаточный contrast;
- **Operable** — интерфейс работает с клавиатуры, focus заметен, нет keyboard traps;
- **Understandable** — navigation и controls предсказуемы, ошибки понятны;
- **Robust** — semantics корректно интерпретируются browsers и assistive technologies.

Уровни conformance:

- **A** — базовые требования;
- **AA** — типичная целевая планка для продукта и законодательства;
- **AAA** — дополнительные критерии, которые W3C не рекомендует требовать целиком для любого сайта.

Важно: WCAG — **не чеклист HTML attributes**. Один и тот же success criterion может выполняться разными техническими
способами, а часть критериев требует human evaluation.

Практический workflow: команда выбирает target, обычно WCAG 2.2 AA, превращает его в design/development rules,
автоматические проверки и ручные сценарии, а не пытается «проверить WCAG» одной кнопкой Lighthouse.

На интервью сильный ответ: **accessibility — свойство пользовательского сценария, WCAG — проверяемая модель требований,
а не конкретная библиотека или набор ARIA attributes**.

</td></tr></table>

</details>

<details>
<summary>Что такое keyboard navigation и visible focus?</summary><br>
<table><tr><td>

**Короткий ответ**

Ключевые действия должны выполняться без мыши в логичном focus order. Текущий focus обязан быть заметен; нельзя удалять
outline без равноценной замены. Native controls уже дают ожидаемые Tab/Shift+Tab и activation semantics, а composite
widgets дополнительно используют arrow keys по своему паттерну.

**Полный ответ**

Keyboard accessibility начинается с того, что пользователь может **дойти до интерактивного элемента, понять где
находится и выполнить действие**.

Для обычной страницы Tab перемещает focus по focusable controls, Shift+Tab — назад. Порядок обычно должен следовать DOM
и визуальной логике. Положительные `tabindex` (`1`, `2`, ...) почти всегда ухудшают поддержку: они создают отдельный
ручной focus order, который легко расходится с DOM.

```html
<button type="button">Сохранить</button>
<a href="/help">Помощь</a>
```

Native controls сразу получают keyboard semantics. `div tabindex="0"` не становится полноценной кнопкой: нужно вручную
реализовать activation keys, disabled state, role и другие детали.

Visible focus — отдельное требование. CSS вида

```css
:focus {
  outline: none;
}
```

без альтернативы делает интерфейс практически неуправляемым. Современный вариант часто строят на `:focus-visible`,
сохраняя сильный indicator для keyboard interaction.

Нужно проверять не только наличие кольца, но и что оно:

- не перекрыто sticky header/overlay;
- имеет достаточную видимость;
- не обрезается `overflow: hidden`;
- остается заметным в high contrast/forced colors.

У сложных widgets Tab обычно входит в компонент один раз, а внутреннее перемещение выполняется arrow keys согласно
выбранному WAI-ARIA pattern.

На интервью: **keyboard support — это focus order + видимый focus + ожидаемая activation/navigation model, а не просто
`tabindex=0`**.

</td></tr></table>

</details>

<details>
<summary>Что такое focus management и focus trap?</summary><br>
<table><tr><td>

**Короткий ответ**

Focus management осмысленно перемещает DOM focus после значимых UI-переходов и возвращает его туда, откуда пользователь
продолжит работу. Focus trap нужен для настоящего modal dialog, чтобы Tab не уходил в inert content; для обычных panels
и dropdown без модальности trap часто вреден.

**Полный ответ**

Focus сообщает пользователю keyboard/screen reader, **где сейчас находится точка взаимодействия**. При динамическом UI
браузер не всегда может сам выбрать правильное место, поэтому приложению иногда нужен focus management.

Типичные случаи:

- dialog открылся — focus перемещается внутрь;
- dialog закрылся — обычно возвращается trigger;
- после удаления item focus должен перейти к логичному соседу, а не исчезнуть в `body`;
- после client-side navigation иногда нужно перевести focus к main heading/container, чтобы screen reader понял смену
  страницы;
- после validation submit focus может перейти к error summary или первому invalid control.

`focus()` не следует вызывать на каждое render/update: неожиданный прыжок focus ломает ввод и screen reader navigation.

**Focus trap** означает, что Tab/Shift+Tab циклически остаются внутри modal context. Это корректно для modal dialog,
потому что content снаружи должен быть недоступен для взаимодействия. Но trap вокруг sidebar, dropdown или обычного card
создает keyboard trap — пользователь не может продолжить navigation.

Для modal dialog важны четыре части:

1. background действительно inert/non-interactive;
2. initial focus выбран по содержимому, а не всегда «первый input»;
3. Tab остается внутри;
4. после закрытия focus возвращается в осмысленное место.

На интервью полезная формула: **focus management следует за изменением пользовательского контекста; focus trap допустим
только там, где UI действительно modal**.

</td></tr></table>

</details>

<details>
<summary>Что такое screen reader?</summary><br>
<table><tr><td>

**Короткий ответ**

Screen reader озвучивает и позволяет исследовать accessibility tree: headings, landmarks, links, controls, names, states
и descriptions. Он не просто «читает DOM сверху вниз», поэтому визуально правильная страница может быть неудобной, если
semantics или focus model неверны.

**Полный ответ**

Screen reader — assistive technology, которая предоставляет интерфейс через речь и/или Braille. Пользователь может
читать текст последовательно, но часто работает намного быстрее через semantic navigation: прыгает по headings,
landmarks, links, form controls, tables и другим категориям.

Screen reader взаимодействует не напрямую с HTML source, а с **accessibility tree**, который browser строит из:

- native HTML semantics;
- accessible name/description;
- ARIA roles/states/properties;
- DOM state и некоторых CSS properties;
- platform accessibility APIs.

Например:

```html
<button aria-expanded="false">Фильтры</button>
```

может быть объявлен как button с именем «Фильтры» и состоянием collapsed.

Это объясняет, почему проверка Elements panel недостаточна. Element может присутствовать в DOM, но быть скрытым из
accessibility tree; наоборот, роль и имя могут отличаться от того, что визуально кажется очевидным.

Реальные screen readers также различаются по OS/browser combinations: VoiceOver + Safari, NVDA/JAWS + Chrome/Firefox и
т.д. Поэтому для critical flows полезно иметь поддерживаемую test matrix, а не проверять случайную комбинацию один раз.

Не нужно пытаться «озвучить все вручную» ARIA. Хорошая semantic разметка дает screen reader структурированную модель, в
которой пользователь сам выбирает способ navigation.

На интервью: **screen reader — клиент accessibility API, а качество опыта определяется semantics, name/state, focus и
keyboard behavior вместе**.

</td></tr></table>

</details>

<details>
<summary>Что такое ARIA и когда ее использовать?</summary><br>
<table><tr><td>

**Короткий ответ**

ARIA описывает roles, states и relationships для accessibility tree, когда native HTML недостаточно. Она не добавляет
keyboard behavior, focus management или визуальное состояние автоматически. Правило: сначала native HTML, затем
минимально необходимая ARIA для custom/dynamic widget.

**Полный ответ**

WAI-ARIA позволяет уточнять accessibility semantics через `role`, `aria-*` states и relationships.

Например custom disclosure может сообщать состояние:

```html
<button
  type="button"
  aria-expanded="false"
  aria-controls="filters"
>
  Фильтры
</button>
<div
  id="filters"
  hidden
>
  ...
</div>
```

Но ARIA **не реализует behavior**. Если написать:

```html
<div role="button">Save</div>
```

browser не добавит автоматически Tab focus, Space/Enter handling, disabled semantics и form behavior настоящего
`<button>`.

Поэтому приоритет обычно такой:

1. найти подходящий native element (`button`, `a`, `input`, `select`, `details`, `dialog` и т.д.);
2. использовать его semantics и platform behavior;
3. добавлять ARIA только для состояния, связи или паттерна, который native HTML не выражает полностью.

ARIA особенно нужна для custom composite widgets: tabs, tree, grid, combobox, menu. Но тогда разработчик берет на себя и
**keyboard interaction model** из соответствующего pattern.

Опасный anti-pattern — «улучшать» native element конфликтующей role. Например, превращать кнопку в link через role
вместо выбора настоящего элемента.

ARIA values должны синхронно отражать runtime state: `aria-expanded="true"` при закрытом popup хуже, чем отсутствие
attribute, потому что сообщает пользователю ложную информацию.

На интервью: **ARIA меняет accessibility contract, а не behavior; использовать ее нужно минимально и только поверх
правильно спроектированного interaction**.

</td></tr></table>

</details>

<details>
<summary>Как ARIA и screen reader связаны с accessibility?</summary><br>
<table><tr><td>

**Короткий ответ**

Browser преобразует HTML и ARIA в accessibility tree, который screen reader получает через platform accessibility API.
ARIA может уточнить role/name/state/relationship, но accessibility требует также keyboard behavior, focus, visual
affordances и понятный content.

**Полный ответ**

Полезно представить цепочку:

```text
HTML + CSS + ARIA + runtime state
            ↓
         Browser
            ↓
   Accessibility tree
            ↓
 Platform accessibility API
            ↓
      Screen reader
```

ARIA влияет прежде всего на слой semantics. Например:

```html
<button aria-pressed="true">Bold</button>
```

сообщает, что button является toggle control и сейчас pressed.

Но screen reader experience ломается, если visual state говорит одно, а `aria-pressed` другое. Поэтому ARIA state —
часть application state contract и должен обновляться атомарно с UI.

Еще один пример: `aria-describedby` может связать input с hint/error, но сам по себе не показывает сообщение визуально.
Accessibility требует, чтобы информация была доступна разными способами, а не только screen reader.

Не все users assistive technology используют speech. Accessibility tree также потребляют другие технологии и browser
automation. Поэтому корректная semantics полезна шире одной программы.

Главная ошибка — считать, что добавление `aria-label` делает любой component accessible. Если custom button не работает
с keyboard или dialog не управляет focus, name не исправляет interaction.

На интервью: **ARIA — входные данные для accessibility tree, screen reader — один из потребителей этого tree, а
полноценная accessibility включает semantics + interaction + perception**.

</td></tr></table>

</details>

<details>
<summary>Как сделать страницу доступнее без JavaScript?</summary><br>
<table><tr><td>

**Короткий ответ**

Начать с semantic HTML и native behavior: landmarks/headings, links, buttons, forms с labels, fieldset/legend, alt text,
language и нормальная document order. JavaScript должен улучшать baseline, а не заменять базовые navigation/form
semantics без необходимости.

**Полный ответ**

Большой объем accessibility можно получить **до первого JavaScript handler**.

Пример базовой страницы:

```html
<header>...</header>
<nav aria-label="Основная навигация">...</nav>
<main>
  <h1>Профиль</h1>
  <form
    action="/profile"
    method="post"
  >
    <label for="name">Имя</label>
    <input
      id="name"
      name="name"
      required
    />
    <button type="submit">Сохранить</button>
  </form>
</main>
```

Здесь уже есть:

- landmarks;
- heading structure;
- link/button semantics;
- keyboard support;
- accessible form name;
- native submission/validation.

Другие platform primitives: `<details>/<summary>` для disclosure, `<dialog>` как база dialog, `<audio>/<video>` с text
tracks, `<table>` для tabular data.

JavaScript затем может добавить client validation, SPA navigation, autocomplete или transitions, но progressive
enhancement снижает количество custom behavior, которое команда обязана воспроизводить и тестировать.

Это не означает, что любое SPA обязано полностью работать без JS. Важно другое: **не выбрасывать бесплатные browser
semantics только потому, что приложение использует framework**.

Для Angular component нужно смотреть конечный rendered DOM: `<app-button>` сам по себе ничего не гарантирует, если
внутри рендерится clickable `div`.

На интервью хороший ответ: **самый дешевый слой accessibility — правильные native primitives и document structure; JS
нужен для behavior, которого platform действительно не дает**.

</td></tr></table>

</details>

<details>
<summary>Зачем команде accessibility checklist?</summary><br>
<table><tr><td>

**Короткий ответ**

Checklist превращает accessibility из памяти отдельных разработчиков в повторяемый delivery process: semantics,
keyboard/focus, labels/names, color/contrast, dynamic announcements, responsive zoom и testing проверяются до merge. Но
checklist дополняет, а не заменяет WCAG и usability review.

**Полный ответ**

Accessibility деградирует не только из-за сложных bugs. Чаще это накопление мелочей: убрали focus ring, добавили
icon-only button без name, забыли label, сделали custom dropdown без arrows.

Checklist полезен как **definition of done для типовых изменений**.

Пример минимального review набора:

- правильный native element и semantics;
- keyboard-only critical flow;
- visible focus и logical order;
- accessible names для controls;
- form errors связаны с fields;
- color не единственный carrier информации;
- images/icons имеют корректный alternative strategy;
- dynamic status объявляется только когда нужно;
- zoom/reflow не ломает сценарий;
- automated axe/lint checks без новых violations.

Для component library checklist должен быть глубже: один bug в Button/Dialog/Select размножается по всему продукту.
Поэтому primitives имеет смысл тестировать и с screen reader/browser combinations.

Checklist не должен быть сотней пунктов для любого typo PR. Его можно делать risk-based: простая текстовая правка
проходит маленький набор, новый modal/combobox — полный interaction review.

Лучше связывать пункты с owners/tooling: что проверяет lint, что component tests, что reviewer, что QA/manual audit.

На интервью: **checklist стандартизирует повторяемые ошибки и переносит accessibility в обычный engineering workflow, а
не в аудит перед релизом**.

</td></tr></table>

</details>

<details>
<summary>Какие accessibility tools стоит использовать во frontend workflow?</summary><br>
<table><tr><td>

**Короткий ответ**

Комбинировать static/template lint, axe или аналогичные automated rules, browser Accessibility tree/DevTools, Lighthouse
как сигнал, component/e2e tests и ручные keyboard/screen-reader проверки. Ни один инструмент не покрывает accessibility
целиком.

**Полный ответ**

Tooling лучше строить слоями.

**На этапе кода**

Template lint rules ловят очевидные проблемы: missing labels, invalid attributes, event patterns. В Angular часть правил
можно проверять через Angular ESLint template rules.

**В component/e2e tests**

axe-core и похожие engines проверяют детерминированные rules: invalid ARIA, часть name/role проблем, contrast в
некоторых состояниях, landmarks и т.д. Их удобно запускать на ключевых screens/states.

**В browser DevTools**

Accessibility pane показывает computed role, name, description, states и tree — это часто быстрее, чем угадывать, почему
screen reader объявляет control странно.

**Lighthouse**

Полезен как smoke signal, но score 100 не означает WCAG conformance.

**Ручная проверка**

- пройти flow только клавиатурой;
- проверить zoom/reflow;
- проверить dialog/dropdown/tabs;
- для critical flow использовать поддерживаемый screen reader + browser.

Важно тестировать **states**, а не только initial page: validation error, loading, expanded popup, disabled state, route
change.

В CI не стоит блокировать релиз тысячами legacy violations без стратегии. Часто вводят baseline и правило «не добавлять
новые violations», параллельно сокращая debt.

На интервью: **automation дает быстрый deterministic coverage, DevTools помогает debugging, а manual interaction
проверяет смысл и behavior, которые машина не понимает**.

</td></tr></table>

</details>

<details>
<summary>Почему accessibility нельзя полностью проверить автоматическими тестами?</summary><br>
<table><tr><td>

**Короткий ответ**

Автоматизация хорошо ловит формальные нарушения, но не может надежно оценить смысл alternative text, логичность focus
order, понятность labels/errors, правильный widget pattern и реальный end-to-end опыт. WCAG требует сочетания
machine-checkable и human-evaluated проверок.

**Полный ответ**

Автотест видит структуру и вычислимые properties. Например, он может определить:

- button без accessible name;
- неизвестную ARIA role;
- `aria-hidden` на неподходящем subtree;
- часть contrast violations;
- отсутствие обязательной relationship.

Но он не знает **смысла интерфейса**.

```html
<img
  src="chart.png"
  alt="image"
/>
```

Формально `alt` есть, но такой alternative text может быть бесполезен.

Аналогично tool не всегда способен решить:

- соответствует ли focus order задаче пользователя;
- понятен ли текст link вне контекста;
- правильный ли initial focus у dialog;
- не слишком ли шумная live region;
- действительно ли custom combobox удобен с screen reader;
- логично ли объявляется route change в SPA.

Snapshot DOM test тоже недостаточен: behavior проявляется во времени и последовательности действий.

Лучший подход — pyramid:

1. lint/static rules — дешевые ошибки;
2. automated component/e2e accessibility checks — regression;
3. manual keyboard checks — interaction;
4. screen reader/usability testing для high-risk flows.

Автоматизация особенно ценна не как «сертификатор accessibility», а как защита от возврата уже известных classes bugs.

На интервью: **автотест отвечает на формальные вопросы, человек — на семантику и usability; conformance нельзя вывести
из одного accessibility score**.

</td></tr></table>

</details>

<details>
<summary>Что такое accessible name и как кнопка его получает?</summary><br>
<table><tr><td>

**Короткий ответ**

Accessible name — программно определимое имя control в accessibility tree. Для обычной button лучший источник — видимый
текст; имя также может вычисляться через `aria-labelledby` или `aria-label`. Icon-only button обязан получить понятное
имя отдельно.

**Полный ответ**

Role сообщает **что это**, а accessible name — **как этот конкретный control называется**.

```html
<button type="button">Удалить файл</button>
```

Browser вычисляет role `button` и name «Удалить файл» из text content.

Icon-only вариант:

```html
<button
  type="button"
  aria-label="Закрыть"
>
  <svg aria-hidden="true">...</svg>
</button>
```

`aria-label` здесь нужен, потому что полезного видимого текста нет.

Если на странице уже есть visible heading/label, часто лучше `aria-labelledby`:

```html
<h2 id="dialog-title">Удалить проект?</h2>
<div
  role="dialog"
  aria-labelledby="dialog-title"
>
  ...
</div>
```

Accessible Name and Description Computation имеет precedence rules: добавление `aria-label` может **переопределить** имя
из visible content. Поэтому без необходимости не стоит дублировать text:

```html
<button aria-label="Отправить">Сохранить</button>
```

Screen reader услышит «Отправить», а sighted user увидит «Сохранить» — это конфликт.

Имена должны быть устойчивыми и различимыми. Пять кнопок «Еще» могут технически иметь name, но пользователю сложно
понять, какая относится к конкретной карточке.

На интервью: **accessible name — computed semantic label control; сначала используем visible/native labeling,
`aria-label` — для случаев, где такого источника нет**.

</td></tr></table>

</details>

<details>
<summary>Чем <code>aria-label</code>, <code>aria-labelledby</code> и <code>aria-describedby</code> отличаются?</summary><br>
<table><tr><td>

**Короткий ответ**

`aria-label` задает accessible name строкой, `aria-labelledby` получает name из одного или нескольких DOM elements, а
`aria-describedby` добавляет дополнительное description. Name отвечает «что это», description — «что еще нужно знать».

**Полный ответ**

Эти attributes участвуют в разных частях accessibility contract.

**`aria-label`** — literal name:

```html
<button aria-label="Закрыть">×</button>
```

Полезен, когда нет подходящего visible text. Минус: строка скрыта от sighted users и ее легко забыть
локализовать/обновить.

**`aria-labelledby`** — name из существующего content:

```html
<h2 id="title">Настройки профиля</h2>
<section aria-labelledby="title">...</section>
```

Плюс — visible и accessible label используют один source of truth. Можно ссылаться на несколько ids.

**`aria-describedby`** — дополнительное описание после имени:

```html
<label for="password">Пароль</label>
<input
  id="password"
  aria-describedby="password-hint"
/>
<p id="password-hint">Минимум 12 символов</p>
```

Здесь name — «Пароль», description — инструкция.

Нельзя заменять name description-ом: control все равно должен иметь имя. И не нужно добавлять `aria-label` поверх
корректного visible label «для надежности» — это может изменить computed name.

Для сложного dialog длинный content не стоит целиком подключать через `aria-describedby`: screen reader может объявить
огромную строку без структуры. Лучше оставить semantic content доступным для обычной navigation.

На интервью: **label/labelledby создают identity, describedby добавляет context**.

</td></tr></table>

</details>

<details>
<summary>Для чего нужен <code>aria-hidden</code>?</summary><br>
<table><tr><td>

**Короткий ответ**

`aria-hidden="true"` исключает element и descendants из accessibility tree, не скрывая их визуально. Его используют для
дублирующего/декоративного content, но нельзя скрывать focusable interactive controls или ancestor, внутри которого
focus может оказаться.

**Полный ответ**

Типичный пример — decorative icon рядом с текстом:

```html
<button type="button">
  <svg aria-hidden="true">...</svg>
  Скачать
</button>
```

Если SVG не несет отдельного смысла, screen reader не должен объявлять его дополнительно.

`aria-hidden` **не равно** `hidden`, `display: none` или `visibility: hidden`:

- visual CSS/`hidden` обычно убирает content и визуально, и из accessibility representation;
- `aria-hidden="true"` оставляет content на экране, но скрывает от assistive technologies.

Опасный случай:

```html
<div aria-hidden="true">
  <button>Удалить</button>
</div>
```

Button может оставаться keyboard-focusable, но отсутствовать в accessibility tree. Пользователь screen reader получает
focus на «невидимом» semantic объекте.

Поэтому перед применением нужно ответить: content действительно **декоративный/дублирующий**, или мы пытаемся починить
структуру скрытием?

Для modal background лучше использовать native dialog/inert behavior, а не вручную раскидывать `aria-hidden` по
приложению: легко забыть восстановить state или скрыть сам dialog из-за portal structure.

На интервью: **aria-hidden управляет accessibility exposure, а не DOM/visual visibility; focusable descendants под ним —
серьезный anti-pattern**.

</td></tr></table>

</details>

<details>
<summary>Что такое live region и <code>role="alert"</code>?</summary><br>
<table><tr><td>

**Короткий ответ**

Live region сообщает assistive technologies о динамическом content без перевода focus. `role="status"` обычно подходит
для non-urgent updates, `role="alert"` — для срочных сообщений и ведет себя assertive. Объявлять нужно только значимые
изменения, иначе интерфейс становится шумным.

**Полный ответ**

SPA постоянно меняет DOM, но screen reader не должен озвучивать каждое изменение автоматически. Live regions позволяют
пометить **значимый asynchronous update**.

Для спокойного status:

```html
<div role="status">Файл сохранен</div>
```

`status` обычно имеет polite live behavior: announcement ждет подходящего момента.

Для срочной ошибки:

```html
<div role="alert">Соединение потеряно</div>
```

`alert` предназначен для important/time-sensitive message и обычно объявляется assertively.

Другие настройки: `aria-live="polite|assertive|off"`, а в специальных случаях `aria-atomic` и `aria-relevant` управляют
тем, какая часть изменения объявляется.

Частые ошибки:

- весь page container становится live region;
- loading counter обновляется десятки раз в секунду;
- каждое validation keystroke объявляет ошибку assertive;
- region создается одновременно с заполненным text, и конкретная AT/browser combination не успевает начать observation;
- focus уже перемещен к сообщению, но его дополнительно объявляют live, создавая duplicate speech.

Если пользователь сам переводится focus к error summary, live region может быть не нужна.

На интервью: **live region сообщает важное изменение без focus move; `alert` — редкий срочный вариант, а не
универсальный способ заставить screen reader читать текст**.

</td></tr></table>

</details>

<details>
<summary>Как сделать доступное modal dialog?</summary><br>
<table><tr><td>

**Короткий ответ**

Modal dialog должен иметь accessible name, modal semantics, корректный initial focus, Tab/Shift+Tab внутри dialog,
Escape/явную кнопку закрытия и разумный возврат focus после закрытия. Native `<dialog>` дает полезную базу, но content,
labeling и focus strategy все равно проектирует приложение.

**Полный ответ**

Доступный modal — это не `position: fixed` + overlay, а отдельный interaction context.

База на native element:

```html
<dialog aria-labelledby="confirm-title">
  <h2 id="confirm-title">Удалить проект?</h2>
  <p>Действие нельзя отменить.</p>
  <button type="button">Отмена</button>
  <button type="button">Удалить</button>
</dialog>
```

При `showModal()` browser дает modal behavior и делает outside content inert на platform level. Но приложению нужно
решить:

**Accessible name**

Обычно через visible title + `aria-labelledby`.

**Initial focus**

Не всегда первый button. Для длинного semantic content WAI-ARIA APG рекомендует иногда focus статический
heading/paragraph с `tabindex="-1"`, чтобы пользователь сначала воспринял контекст.

**Keyboard loop**

Tab и Shift+Tab не должны уходить в background. Escape обычно закрывает dialog, также нужна видимая close/cancel action.

**Return focus**

После закрытия — trigger или следующий логичный control, если trigger исчез.

**Nested/async states**

Loading и error внутри dialog не должны случайно красть focus.

`aria-modal="true"` само по себе не делает background inert и не создает focus trap. Если используется custom
`div role="dialog"`, все behavior нужно реализовать вручную.

На интервью: **modal accessibility — semantics + inert background + focus lifecycle + keyboard close, а не только role
dialog**.

</td></tr></table>

</details>

<details>
<summary>Как сделать доступные dropdown и tabs?</summary><br>
<table><tr><td>

**Короткий ответ**

Сначала определить настоящий widget pattern: disclosure, menu button, listbox и combobox выглядят похоже, но имеют
разную semantics/keyboard model. Tabs используют `tablist`/`tab`/`tabpanel`, `aria-selected`, relationships и arrow-key
navigation. Реализацию сверяют с WAI-ARIA APG.

**Полный ответ**

Слово «dropdown» слишком неоднозначно. До кода нужно понять задачу.

- показать/скрыть обычный content → **disclosure**;
- список команд → **menu button**;
- выбрать значение → native `select` или **listbox**;
- text input + suggestions → **combobox**.

Если поставить `role="menu"` на любой popup со ссылками, screen reader ожидает desktop-menu keyboard model, которую
приложение, скорее всего, не реализовало.

Для menu button trigger обычно сообщает `aria-haspopup="menu"` и `aria-expanded`; Enter/Space открывают menu, а внутри
работают arrow keys.

**Tabs** имеют отдельный pattern:

```html
<div
  role="tablist"
  aria-label="Настройки"
>
  <button
    role="tab"
    aria-selected="true"
    aria-controls="panel-general"
  >
    Общие
  </button>
  <button
    role="tab"
    aria-selected="false"
    aria-controls="panel-security"
  >
    Безопасность
  </button>
</div>
<div
  role="tabpanel"
  id="panel-general"
>
  ...
</div>
```

Обычно Tab входит в tablist один раз, Left/Right arrows перемещают active/focused tab, а `aria-selected` отражает
selection. Panel связан обратно через `aria-labelledby`.

Для combobox keyboard и focus model еще сложнее: DOM focus часто остается на input, а active option задается через
`aria-activedescendant`. Поэтому «сделать dropdown самому» может быть дорогим решением.

На интервью: **сначала выбираем interaction pattern, затем реализуем весь его keyboard/focus/ARIA contract; одинаковый
popup визуально не означает одинаковую роль**.

</td></tr></table>

</details>

<details>
<summary>Как сделать доступную icon button?</summary><br>
<table><tr><td>

**Короткий ответ**

Использовать настоящий `<button>` и дать ему accessible name, обычно visible text или `aria-label` для icon-only случая.
Decorative SVG скрывают через `aria-hidden="true"`; также нужны visible focus, достаточный target size и понятные
disabled/pressed states.

**Полный ответ**

Icon button часто выглядит минималистично, но semantic contract должен быть таким же полным, как у обычной кнопки.

```html
<button
  type="button"
  aria-label="Закрыть"
>
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
  >
    ...
  </svg>
</button>
```

Почему не `title` на SVG? Tooltip/`title` не является надежной заменой accessible name button и часто недоступен
touch/keyboard users.

Если icon имеет visible text рядом:

```html
<button type="button">
  <svg aria-hidden="true">...</svg>
  Скачать
</button>
```

дополнительный `aria-label` обычно не нужен: text уже создает name.

Для toggle icon button состояние следует сообщить явно:

```html
<button aria-pressed="true">...</button>
```

и синхронизировать со visual state.

WCAG 2.2 также делает важным target size для pointer interactions; product/design system должен не превращать 16×16
glyph в фактическую 16×16 hit area.

Icon-only controls особенно требуют различимых names: ряд buttons с name «Еще» мало помогает. Можно дать контекст,
например «Действия для отчета Q2».

На интервью: **SVG — decoration, button — interaction owner; name/state/focus должны принадлежать control, а не картинке
внутри него**.

</td></tr></table>

</details>

<details>
<summary>Почему цвет не должен быть единственным способом передачи информации?</summary><br>
<table><tr><td>

**Короткий ответ**

Цвет может быть неразличим при color-vision deficiency, low contrast, monochrome/high-contrast mode или плохом дисплее.
Error, selection и status нужно дублировать независимым сигналом: текстом, icon/shape, underline, pattern или semantics,
сохраняя достаточный contrast.

**Полный ответ**

Плохой пример — форма, где invalid input отличается только красной рамкой:

```text
[ Email ]  ← только border red
```

Пользователь может не различить red/green, не видеть border из-за forced colors или вообще не видеть экран.

Лучше одновременно дать:

- visible error text;
- icon/shape при необходимости;
- programmatic relation (`aria-describedby`);
- `aria-invalid` как semantic state;
- достаточный contrast.

То же относится к charts. Легенда «красный = revenue, зеленый = expenses» без labels/patterns требует различать цвет. В
графике полезны direct labels, markers, line styles.

Links внутри текста тоже не должны отличаться от surrounding text только оттенком, если contrast distinction
недостаточен; underline или другой non-color cue часто проще.

Важно различать два требования:

1. **Use of color** — информация не должна передаваться только цветом;
2. **Contrast** — foreground/background и UI indicators должны быть достаточно различимы.

Можно выполнить одно и нарушить другое.

Design tokens помогают централизовать contrast, но semantic redundancy остается задачей component design.

На интервью: **цвет — дополнительный channel, а critical meaning должен переживать ситуацию, где этот channel
недоступен**.

</td></tr></table>

</details>

<details>
<summary>Для чего нужен атрибут lang?</summary><br>
<table><tr><td>

**Короткий ответ**

`lang` задает язык документа или конкретного фрагмента. Это помогает screen reader выбрать pronunciation rules, а
browser — spellcheck, hyphenation и другую language-specific обработку. Основной язык ставят на `<html>`, переключения
языка отмечают локально.

**Полный ответ**

Базовая разметка:

```html
<html lang="ru"></html>
```

Если внутри появляется другой язык:

```html
<p>
  Документ называется
  <span lang="en">Web Content Accessibility Guidelines</span>
  .
</p>
```

Для screen reader это важно: speech engine может сменить voice/pronunciation model и не пытаться читать English по
русским фонетическим правилам.

`lang` также влияет на:

- spell checking;
- hyphenation и line breaking;
- некоторые CSS selectors (`:lang()`);
- browser translation/language tooling;
- search/indexing context.

`lang` — language code, а не locale настройки всего приложения. `lang="en"` не гарантирует формат даты USD или timezone;
localization данных решается отдельно через Intl/application logic.

Не нужно размечать каждый англицизм отдельным `lang`, если он естественно встроен в язык документа и переключение
произношения ухудшит опыт. Атрибут нужен для **реальных смен language context**.

В SPA route change обычно сохраняет `<html lang>`; если приложение переключает locale dynamically, attribute тоже должен
обновляться.

На интервью: **lang — semantic metadata для правильной интерпретации текста browser/AT, особенно pronunciation; основной
язык — на root, исключения — на fragments**.

</td></tr></table>

</details>

<details>
<summary>Для чего нужны семантические HTML-теги?</summary><br>
<table><tr><td>

**Короткий ответ**

Semantic HTML передает назначение content через platform primitives: `nav`, `main`, headings, `button`, `form`, `table`
и другие. Это дает browser и assistive technologies role/structure/native behavior без ручного ARIA и делает keyboard,
testing и поддержку надежнее.

**Полный ответ**

Semantic element выбирают по **назначению**, а не по default CSS.

```html
<nav aria-label="Основная навигация">...</nav>
<main>
  <h1>Отчеты</h1>
  <button type="button">Создать отчет</button>
</main>
```

Из этой разметки browser уже может построить:

- navigation/main landmarks;
- heading navigation;
- button role и keyboard activation;
- meaningful accessibility tree.

Эквивалент на `div` потребовал бы roles, tabindex, keyboard handlers и множества edge cases.

Semantics полезна не только screen reader:

- browser дает context menu/navigation behavior link;
- forms участвуют в autofill/validation/submission;
- testing libraries могут находить controls по role/name;
- code review быстрее понимает intent;
- SEO/parser лучше видит structure.

Но semantic tag не является магией. `<section>` без логической темы не лучше `div`, а `<nav>` вокруг любой группы links
создает лишний landmark. Выбор должен соответствовать content model.

Custom Angular component тоже не создает native semantics автоматически. Важен rendered primitive внутри design-system
component.

На интервью: **semantic HTML — первый accessibility layer: он дает корректный role/behavior из platform, а ARIA должна
дополнять, а не переписывать его**.

</td></tr></table>

</details>

### SEO и metadata

<details>
<summary>Зачем нужен <code>meta name="viewport"</code>?</summary><br>
<table><tr><td>

**Короткий ответ**

`<meta name="viewport" content="width=device-width, initial-scale=1">` связывает layout viewport с шириной устройства,
чтобы responsive CSS работал в ожидаемом масштабе. Без него мобильный browser может использовать широкий virtual
viewport и затем уменьшить страницу целиком.

**Полный ответ**

Mobile browser исторически мог рендерить desktop-oriented страницы в virtual viewport шириной около desktop layout, а
затем масштабировать результат, чтобы он помещался на маленький экран. Для responsive layout это приводит к тому, что
media queries видят не ту ширину, которую ожидает разработчик.

Типичная настройка:

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1"
/>
```

Здесь:

- `width=device-width` говорит использовать CSS viewport, соответствующий ширине устройства;
- `initial-scale=1` задает начальный zoom 1:1 между CSS pixels и initial viewport scale.

После этого обычный responsive CSS работает предсказуемее:

```css
@media (width <= 48rem) {
  .layout {
    grid-template-columns: 1fr;
  }
}
```

Важно не путать viewport meta с полноценной mobile optimization. Он не исправляет сам по себе:

- слишком мелкий текст;
- горизонтальный overflow;
- маленькие touch targets;
- тяжелые изображения;
- неудобную navigation.

Также не стоит без серьезной причины запрещать zoom настройками вроде `user-scalable=no` или жесткого `maximum-scale=1`:
пользователь может нуждаться в увеличении интерфейса из-за зрения или временных условий.

Есть дополнительные viewport directives, например `viewport-fit=cover` для устройств с display cutouts, но они нужны
только под конкретный layout и не заменяют safe-area handling.

Для SEO сам meta viewport не является «магическим ranking tag». Его ценность в корректном mobile experience и responsive
rendering. Search systems оценивают страницу шире, чем наличие одной строки metadata.

На интервью: **viewport meta задает browser модель layout viewport для mobile; после этого responsive design все равно
реализуется HTML/CSS и проверяется на реальных размерах и zoom**.

</td></tr></table>

</details>

<details>
<summary>Что такое favicon?</summary><br>
<table><tr><td>

**Короткий ответ**

Favicon — иконка сайта, которую browser и другие clients используют во вкладках, bookmarks, history и search UI.
Основной вариант подключают через `<link rel="icon" href="...">`; иконка должна иметь стабильный URL, подходящий формат
и размеры для целевых surfaces.

**Полный ответ**

Favicon — не одна обязательная картинка определенного формата, а **site icon**, которую разные clients могут
использовать в разных surfaces.

Базовый вариант:

```html
<link
  rel="icon"
  href="/favicon.svg"
  type="image/svg+xml"
/>
```

Можно дополнительно предоставить raster fallback или platform-specific icons:

```html
<link
  rel="icon"
  href="/favicon-32.png"
  sizes="32x32"
  type="image/png"
/>
<link
  rel="apple-touch-icon"
  href="/apple-touch-icon.png"
/>
```

Практические требования зависят от consumer. Browser tab, mobile home screen и search result могут выбирать разные
resources. Поэтому favicon pipeline обычно включает несколько размеров/formats, но не нужно генерировать десятки файлов
без понятной матрицы поддержки.

Для Google Search favicon задается через `link` на home page. Google требует square image не меньше 8×8 и рекомендует
более 48×48 для качества на разных surfaces; URL лучше держать стабильным, а home page и icon должны быть доступны
crawler.

Favicon не заменяет brand metadata и не гарантирует показ в search result: consumer сам решает, где и какую icon
отобразить.

Еще одна практическая ошибка — отдавать icon через URL, который требует auth/cookies. В public site favicon должен быть
доступен без пользовательской session.

На интервью: **favicon — ресурс идентификации сайта, подключаемый через `rel=icon`; важно различать browser support,
platform icons и требования конкретных search/social consumers**.

</td></tr></table>

</details>

<details>
<summary>Что такое canonical URL?</summary><br>
<table><tr><td>

**Короткий ответ**

`rel="canonical"` указывает предпочитаемый URL среди duplicate или очень похожих страниц. Для поисковой системы это
сильный canonicalization signal, но не redirect и не абсолютная директива: crawler может выбрать другой canonical, если
остальные сигналы противоречат.

**Полный ответ**

Один и тот же content часто доступен по нескольким URL:

```text
/products/42
/products/42?utm_source=email
/products/42?sort=popular
```

Если это фактически одна страница, можно указать representative URL:

```html
<link
  rel="canonical"
  href="https://example.com/products/42"
/>
```

Canonicalization нужна не только для «штрафа за duplicate content». Она помогает:

- консолидировать сигналы нескольких URL;
- уменьшить путаницу в аналитике/search results;
- выбрать URL, который лучше показывать пользователю;
- не тратить crawl effort без необходимости на параметры/duplicates.

Но `rel="canonical"` — **не redirect**. Пользователь остается на текущем URL, а поисковая система рассматривает
annotation как сигнал.

Для Google redirects и `rel="canonical"` являются сильными canonicalization signals, sitemap inclusion — более слабым.
Несколько согласованных сигналов усиливают preference, но Google все равно может выбрать другой canonical.

Практические правила:

- canonical URL обычно делают абсолютным;
- canonical page часто содержит self-referencing canonical;
- internal links лучше вести на canonical URL;
- sitemap должен быть согласован с canonical policy;
- нельзя случайно canonicalize разные по смыслу страницы в одну;
- canonical и `noindex` решают разные задачи.

Для JavaScript sites лучше отдать canonical уже в HTML source и не менять его на другое значение после bootstrap.
Multiple conflicting canonical tags делают поведение менее предсказуемым.

Если контент реально перемещен и старый URL больше не нужен, обычно лучше server redirect, а не canonical как имитация
redirect.

На интервью: **canonical — hint о representative duplicate URL, который должен быть согласован с redirects, links и
sitemap; он не меняет navigation и не гарантирует выбор поисковой системы**.

</td></tr></table>

</details>

<details>
<summary>Для чего нужны <code>title</code> и meta description?</summary><br>
<table><tr><td>

**Короткий ответ**

`<title>` задает название документа и является важным источником для title link, но поисковик может сформировать другой
заголовок. `meta name="description"` дает краткое описание страницы и иногда используется как search snippet; конкретный
snippet также не гарантирован.

**Полный ответ**

`title` и meta description находятся в `<head>`, но выполняют разные роли.

```html
<title>Angular signals: руководство и примеры | Example</title>
<meta
  name="description"
  content="Разбираем Angular signals, computed и effect на практических примерах."
/>
```

**`title`**

Browser показывает его во вкладке/history, а search engine использует как один из источников title link. Хороший title:

- уникален для страницы;
- кратко описывает primary content;
- не состоит из keyword stuffing;
- не повторяет одинаковый boilerplate в начале каждого URL;
- соответствует языку и фактическому содержимому страницы.

Важно: Google не обязан показывать `<title>` verbatim. Для title link он может учитывать main visual heading, `<h1>`,
`og:title`, prominent text, anchor text и другие sources, если считает их более подходящими.

**Meta description**

```html
<meta
  name="description"
  content="Практическое руководство по Angular signals с примерами state, computed values и effects."
/>
```

Это краткое описание candidate для snippet, но не фиксированный текст результата. Google primarily формирует snippet из
page content и использует meta description, когда она лучше описывает страницу для запроса.

Поэтому бессмысленно проектировать description как жесткий pixel-perfect search UI. Лучше делать ее:

- конкретной;
- page-specific;
- полезной человеку;
- без длинного списка keywords.

Для больших catalogs допустима качественная programmatic generation из page-specific data.

В SPA title/description должны меняться вместе с route content. Предпочтительно, чтобы public indexable route имел
корректную metadata уже при server/static rendering, а не зависел только от late client effect.

На интервью: **title и description влияют на представление страницы и понимание результата, но search engine сам
формирует финальный title link/snippet; задача frontend — дать точные и согласованные signals**.

</td></tr></table>

</details>

<details>
<summary>Какие HTML-теги важны для поисковых систем?</summary><br>
<table><tr><td>

**Короткий ответ**

Нет одного «SEO-тега». Поисковику важны доступный в DOM content, `<title>`, headings, обычные `<a href>`, semantic
structure, `<img alt>`, canonical/robots metadata и при необходимости structured data. Теги помогают понять content, но
не компенсируют слабую страницу или запрет crawling/indexing.

**Полный ответ**

SEO начинается не с коллекции специальных meta tags, а с **crawlable и понятного документа**.

Ключевые primitives:

**`<title>`** — важный source для названия страницы в search UI.

**Headings (`h1`–`h6`)** — показывают hierarchy и main topics документа.

```html
<h1>Angular forms</h1>
<h2>Reactive forms</h2>
```

**Links с настоящим `href`** — дают crawler discoverable navigation:

```html
<a href="/angular/forms">Angular forms</a>
```

`div` с click handler не является эквивалентом link для discovery/navigation semantics.

**`img` + `alt`** — помогает понять meaningful image и делает ее доступной. Google отдельно рекомендует standard HTML
image elements для image discovery; CSS background image не является тем же механизмом.

**`link rel="canonical"`** — canonicalization signal для duplicate URLs.

**`meta name="robots"`** — управляет indexing/snippet behavior, например `noindex`. При этом `robots.txt` и `noindex`
нельзя считать одним механизмом: если crawler не может fetch page из-за robots.txt, он может не увидеть page-level
`noindex`.

**Structured data** обычно задают JSON-LD внутри `<script type="application/ld+json">`. Оно не «повышает рейтинг само по
себе», а дает machine-readable facts и может сделать страницу eligible для отдельных rich features при соблюдении
guidelines.

Semantic elements (`main`, `article`, `nav`, tables/lists) улучшают структуру для browsers/users/crawlers, но поисковик
не ранжирует страницу только потому, что `div` заменили на `article`.

Также важно, **где находится content**. Google рекомендует держать индексируемый text в DOM; декоративный CSS `content`
не является надежным местом для substantive text.

На интервью: **SEO-friendly HTML — это прежде всего semantic, discoverable DOM с корректными links/content/metadata, а
не набор магических tags**.

</td></tr></table>

</details>

<details>
<summary>Какие SEO-практики важны для frontend-разработчика?</summary><br>
<table><tr><td>

**Короткий ответ**

Frontend отвечает за crawlable URLs и links, содержательный initial/rendered HTML, корректные title/metadata/canonical,
indexing directives, semantic content, structured data и performance. Все это нужно проверять на уровне реального URL и
rendered DOM, а не только component code.

**Полный ответ**

У frontend-разработчика SEO — это часть architecture и delivery, а не финальная установка meta description перед
release.

Практический checklist можно разделить по слоям.

**1. URL и navigation**

- каждый indexable view имеет стабильный URL;
- внутренние переходы представлены crawlable `<a href>`;
- SPA routing использует нормальные paths/History API, а не `#/product/42` как основной public URL contract;
- redirects для moved content задаются на server/CDN уровне, где возможно.

**2. Crawling и indexing**

- нужные pages возвращают успешный HTTP status;
- `robots.txt`, `meta robots` и auth не закрывают content случайно;
- 404/removed pages не маскируются вечным `200 OK`;
- canonical policy согласована с sitemap/internal links.

**3. Rendered content**

Google умеет выполнять JavaScript, но rendering имеет ограничения, а другие crawlers/social bots могут JS не исполнять.
Public content лучше проектировать так, чтобы critical text, links и metadata были доступны через SSR, prerender/static
rendering или другой надежный rendering strategy.

**4. Metadata**

- unique descriptive `title`;
- meaningful meta description;
- canonical;
- social metadata при необходимости;
- `lang` и locale/hreflang strategy для multilingual products.

**5. Content semantics**

- понятный main heading;
- logical heading hierarchy;
- descriptive anchor text;
- image alternatives;
- semantic tables/lists/content structure.

**6. Performance и UX**

Core Web Vitals — не единственный фактор SEO, но slow layout, huge JS и delayed LCP одновременно ухудшают real user
experience и могут влиять на search performance. Оптимизацию нужно проверять по field/lab data, а не «потому что SEO
любит SSR».

**7. Structured data**

Добавляют только schemas, реально соответствующие видимому content, и валидируют их. Fake reviews/metadata — не
shortcut.

**8. Verification**

Проверяют Network response, rendered DOM, URL Inspection/Search Console, structured data validators и реальные pages
после deploy.

На интервью сильный ответ: **frontend SEO — обеспечить crawler тот же надежный product contract: URL → HTTP → render →
content → links → metadata, а затем измерять реальный результат**.

</td></tr></table>

</details>

<details>
<summary>Как правильно использовать заголовки <code>h1</code>–<code>h6</code>?</summary><br>
<table><tr><td>

**Короткий ответ**

Heading levels описывают структуру документа, а не размер текста. Обычно удобно иметь один ясный main `h1`, затем
строить `h2`/`h3` по вложенности тем и не выбирать уровень ради CSS. Multiple `h1` технически возможны, но простая
иерархия понятнее пользователям, assistive technologies и crawlers.

**Полный ответ**

Headings решают две задачи одновременно: помогают человеку быстро scan content и дают machine-readable hierarchy.

```html
<h1>Настройки аккаунта</h1>

<h2>Безопасность</h2>
<h3>Двухфакторная аутентификация</h3>

<h2>Уведомления</h2>
```

Это лучше, чем выбирать тег по размеру текста:

```html
<h4>Настройки аккаунта</h4>
<!-- только потому что визуально нужен 20px -->
```

Visual style должен задаваться CSS/design system независимо от semantic level.

Практический подход:

- `h1` отражает основную тему page/view;
- `h2` — крупные subsections;
- `h3` — вложенные subsections и т.д.;
- пустые headings и headings ради spacing не используют;
- лучше не прыгать по уровням без structural причины.

Исторический HTML outline algorithm для sectioning elements не стал browser reality, поэтому `<section><h1>` не создает
автоматически безопасную многоуровневую outline model. Уровни headings нужно выбирать явно.

Поисковая система не обязана считать `h1` единственным title. Например, Google использует headings и prominent visual
text как один из sources для title links. Поэтому heading должен описывать фактический content, а не быть keyword
container.

Несколько `h1` в HTML синтаксически допустимы в определенных contexts, но для обычной application/content page **один
четкий main heading** обычно дает самый простой mental/accessibility/search contract.

В component-based UI есть архитектурная проблема: reusable card не должен hardcode `h1`. Heading level часто
определяется местом компонента в page hierarchy, поэтому design system либо принимает level/context, либо разделяет
visual title и semantic heading primitive.

На интервью: **heading hierarchy — document architecture; CSS отвечает за appearance, а component abstraction не должна
ломать semantic level страницы**.

</td></tr></table>

</details>

<details>
<summary>Что такое Open Graph?</summary><br>
<table><tr><td>

**Короткий ответ**

Open Graph — набор `<meta property="og:...">` для описания страницы внешним consumers, прежде всего social/link preview
systems. Базовые properties — `og:title`, `og:type`, `og:image`, `og:url`; часто добавляют description и site name. Это
отдельный contract и не замена обычным `<title>`/description.

**Полный ответ**

Open Graph Protocol позволяет странице сообщить social crawler, **как представить URL при share/unfurl**.

Базовый пример:

```html
<meta
  property="og:title"
  content="Angular signals: практическое руководство"
/>
<meta
  property="og:type"
  content="article"
/>
<meta
  property="og:url"
  content="https://example.com/angular/signals"
/>
<meta
  property="og:image"
  content="https://example.com/assets/signals-cover.png"
/>
<meta
  property="og:description"
  content="Signals, computed и effect на практических примерах."
/>
```

По Open Graph базовыми required properties являются `og:title`, `og:type`, `og:image` и `og:url`. В реальном product
часто добавляют:

- `og:description`;
- `og:site_name`;
- image dimensions/type;
- locale;
- type-specific properties для article/video и т.д.

Open Graph и обычная SEO metadata пересекаются, но не идентичны:

```html
<title>...</title>
<meta
  name="description"
  content="..."
/>
<meta
  property="og:title"
  content="..."
/>
```

Search engine может использовать свои signals, social network — Open Graph, messenger — собственные rules/fallbacks.

Важно учитывать **crawler rendering model**. Многие link unfurl bots не запускают полноценное SPA приложение, поэтому OG
metadata лучше выдавать в initial HTML response. Если server отдает один generic `og:title` на все client routes, share
preview может быть неправильным даже при идеальном UI после hydration.

`og:image` должен быть public, стабильным и доступным crawler без auth. Также полезно тестировать real preview на target
platforms, потому что crop, size limits и caching различаются.

Open Graph не заменяет accessible `alt` на `<img>` внутри самой страницы и не является ranking guarantee.

На интервью: **OG — внешний metadata contract для link preview; его проектируют per URL и обычно отдают server-side,
потому что consumer может не исполнять application JavaScript**.

</td></tr></table>

</details>

<details>
<summary>Как SSR влияет на SEO?</summary><br>
<table><tr><td>

**Короткий ответ**

SSR/prerender отдает meaningful HTML, links и metadata уже в initial response, поэтому crawler меньше зависит от
JavaScript rendering. Google умеет выполнять JavaScript, но рекомендует SSR/static rendering/hydration как надежные
решения; другие bots могут JS не выполнять вообще.

**Полный ответ**

CSR-only приложение может сначала вернуть:

```html
<div id="app"></div>
<script src="app.js"></script>
```

а реальный content создать только после download/execute/API calls. Пользовательский browser обычно справляется, но для
crawler появляется дополнительная dependency chain:

```text
crawl HTML -> fetch JS -> execute -> fetch data -> render DOM -> index
```

SSR или prerender сокращает этот путь:

```html
<main>
  <h1>Angular signals</h1>
  <p>...</p>
  <a href="/angular/effects">Effects</a>
</main>
```

Crawler сразу видит primary text, links, title/canonical/social metadata. JavaScript затем может hydrate existing markup
и добавить interactivity.

Важно не превращать тезис в миф «Google не индексирует JavaScript». Google Search использует Web Rendering Service и
выполняет JavaScript. Но официальная документация все равно отмечает limitations и рекомендует server-side rendering,
static rendering или hydration вместо dynamic rendering как постоянного workaround.

Плюсы SSR/prerender для SEO architecture:

- content доступен раньше;
- metadata per route проще сделать корректной;
- social/unfurl crawlers без JS получают usable document;
- links доступны сразу;
- меньше риск, что API/runtime error оставит crawler с пустым shell.

Но SSR сам по себе не гарантирует SEO:

- server может вернуть неправильный canonical;
- content может быть thin/duplicate;
- robots/noindex могут закрыть страницу;
- HTTP status может быть ошибочным;
- hydration может удалить server content;
- performance может быть плохой из-за slow TTFB или огромного bundle.

Нужно также сохранять **content parity**: server version для crawler и hydrated UI для пользователя должны представлять
один и тот же meaningful content. Специальная radically different bot version может превратиться в cloaking problem.

Для Angular выбор между SSR, prerender и CSR делают по product requirements: public indexable pages часто выигрывают от
server/static HTML, private dashboards за auth могут вообще не нуждаться в search indexing.

На интервью: **SSR уменьшает зависимость indexing от client execution и улучшает reliability, но SEO определяется полным
URL/HTTP/content/metadata contract, а не самим фактом server render**.

</td></tr></table>

</details>

### SVG и media

<details>
<summary>Чем JPEG, PNG, WebP, AVIF и SVG отличаются друг от друга?</summary><br>
<table><tr><td>

**Короткий ответ**

JPEG обычно выбирают для фотографий, PNG — для lossless-графики и alpha transparency, WebP/AVIF — для более эффективного
raster compression, SVG — для векторной графики. Выбор зависит от типа контента, качества, размера файла, прозрачности,
animation и delivery strategy.

**Полный ответ**

Главное различие — **как хранится изображение и какой trade-off между качеством, размером и возможностями**.

**JPEG**

- raster format с lossy compression;
- хорошо подходит для фотографий и сложных natural images;
- не поддерживает alpha transparency;
- плохо подходит для line art/text/screenshots с резкими границами.

**PNG**

- raster + lossless compression;
- поддерживает alpha transparency;
- хорош для UI screenshots, diagrams и изображений, где важны точные pixels;
- для фотографий часто заметно тяжелее lossy formats.

**WebP**

- raster format с lossy и lossless modes;
- поддерживает transparency и animation;
- часто дает меньший файл, чем JPEG/PNG при сопоставимом visual quality.

**AVIF**

- современный raster format на базе AV1 image coding;
- особенно эффективен для фотографий и high-quality compression;
- поддерживает transparency и HDR-related capabilities;
- encode/decode cost и tooling нужно учитывать в pipeline.

**SVG**

- vector/XML format;
- хранит paths, shapes, text, gradients и transforms вместо pixel grid;
- отлично масштабируется для icons/logos/diagrams;
- не является универсальной заменой raster: сложная фотография как SVG обычно бессмысленна и может быть тяжелой.

Практический production pipeline часто использует `<picture>` или server/CDN image service: браузеру предлагают
AVIF/WebP и fallback, а размер подбирают через responsive images.

Нельзя выбирать format только по расширению. Нужно измерять **реальный byte size + visual quality + decode/render cost +
cache strategy** на типичных assets.

На интервью: **raster formats кодируют pixels, SVG — geometry; JPEG/PNG решают разные legacy/use-case задачи, WebP/AVIF
обычно улучшают delivery, но формат выбирают по конкретному контенту и инфраструктуре**.

</td></tr></table>

</details>

<details>
<summary>Когда использовать SVG, а когда raster image?</summary><br>
<table><tr><td>

**Короткий ответ**

SVG подходит для logos, icons, charts и простой графики, которая должна масштабироваться или стилизоваться. Raster image
лучше для фотографий, сложных текстур и pixel-based content. Сложный SVG тоже может быть тяжелым, поэтому vector не
означает автоматически быстрее.

**Полный ответ**

Выбор начинается с природы изображения.

**SVG хорош, когда изображение описывается небольшим количеством геометрических primitives:**

- icons;
- logos;
- simple illustrations;
- diagrams;
- charts;
- maps/schemes;
- shapes, которые нужно recolor через CSS.

Пример icon:

```html
<svg
  viewBox="0 0 24 24"
  aria-hidden="true"
>
  <path d="..." />
</svg>
```

Плюсы SVG:

- resolution-independent scaling;
- DOM/CSS styling для inline SVG;
- обычно один asset для разных DPR;
- text/geometry можно сделать semantic/interactive при необходимости.

**Raster лучше, когда content по природе pixel-rich:**

- photos;
- screenshots;
- textures;
- complex paintings/renders;
- camera-generated images.

Попытка превратить фотографию в тысячи vector paths увеличит markup, memory и paint cost. И наоборот, маленький
monochrome icon в PNG потребует нескольких resolutions и хуже адаптируется к `currentColor`.

Есть промежуточные случаи. Например, сложная illustration может быть меньше как optimized WebP/AVIF, чем SVG с тысячами
nodes. Поэтому performance проверяют измерением, а не правилом «SVG всегда легче».

Security тоже отличается: SVG — XML document format с потенциально сложным содержимым. Untrusted SVG нельзя бездумно
вставлять inline; upload pipeline должен sanitise/serve его согласно threat model.

На интервью: **SVG выбирают за geometry/scalability/styling, raster — за efficient representation сложного pixel
content; окончательный выбор подтверждают размером и rendering cost**.

</td></tr></table>

</details>

<details>
<summary>Что такое responsive images и как работают <code>srcset</code>/<code>sizes</code>?</summary><br>
<table><tr><td>

**Короткий ответ**

Responsive images позволяют браузеру выбрать подходящий image resource вместо загрузки одного большого файла всем
устройствам. `srcset` описывает candidates, а `sizes` сообщает ожидаемый layout width при `w` descriptors; browser
учитывает viewport, DPR и собственные heuristics.

**Полный ответ**

Проблема обычного `<img src="hero-2000.jpg">` в том, что mobile screen может скачать asset, рассчитанный на
desktop/retina, хотя визуально ему достаточно гораздо меньшего файла.

Для resolution switching используют `srcset` с width descriptors:

```html
<img
  src="photo-800.jpg"
  srcset="photo-480.jpg 480w, photo-800.jpg 800w, photo-1600.jpg 1600w"
  sizes="(max-width: 40rem) 100vw, 50vw"
  width="1600"
  height="900"
  alt="Команда за рабочим столом"
/>
```

Здесь:

- `480w`, `800w`, `1600w` — intrinsic widths candidates;
- `sizes` описывает примерную **display width** image в layout;
- browser сопоставляет display width, device pixel ratio, доступные candidates и может выбрать resource сам.

Важно: `sizes` — не команда «загрузи этот файл при таком breakpoint». Это информация о layout size. При `w` descriptors
без корректного `sizes` browser может принять неверное решение и скачать слишком большой ресурс.

Для fixed-size icon/avatar можно использовать density descriptors:

```html
<img
  src="avatar.png"
  srcset="avatar.png 1x, avatar@2x.png 2x"
  width="48"
  height="48"
  alt="Максим"
/>
```

Responsive images особенно полезны для LCP/large content images. Они уменьшают network bytes без ручного JavaScript
media-query loader.

Нужно помнить:

- `src` остается fallback и участвует в source selection;
- `width`/`height` помогают заранее зарезервировать aspect ratio;
- не нужно генерировать десятки почти одинаковых widths без измеримой пользы;
- image CDN может автоматизировать resize/format conversion.

На интервью: **`srcset` дает браузеру набор candidates, `sizes` описывает место изображения в layout, а окончательный
resource выбирает browser — это declarative negotiation, а не JS breakpoint switch**.

</td></tr></table>

</details>

<details>
<summary>Что делает <code>loading="lazy"</code>?</summary><br>
<table><tr><td>

**Короткий ответ**

`loading="lazy"` разрешает браузеру отложить загрузку offscreen `img`/`iframe`, пока ресурс не приблизится к viewport.
Это экономит network/CPU, но его не ставят на вероятный LCP/above-the-fold image; для images также задают
`width`/`height`, чтобы избежать layout shifts.

**Полный ответ**

Без lazy loading длинная страница может сразу инициировать десятки image requests, хотя пользователь увидит только
первые несколько.

```html
<img
  src="gallery-12.jpg"
  loading="lazy"
  width="800"
  height="600"
  alt="Зал музея"
/>
```

`loading="lazy"` — **browser hint/state**, а не точный pixel threshold contract. User agent сам решает, насколько
заранее начать fetch с учетом connection, viewport и implementation heuristics.

Что дает lazy loading:

- меньше initial network competition;
- меньше bytes для пользователя, который не дошел до нижней части page;
- быстрее освобождаются resources для critical CSS/JS/LCP asset.

Но есть важный anti-pattern:

```html
<img
  src="hero.jpg"
  loading="lazy"
  alt="..."
/>
```

если `hero.jpg` — главный above-the-fold/LCP candidate. Его lazy loading может задержать discovery/fetch и ухудшить LCP.
Critical image обычно грузят eagerly, а при необходимости используют `fetchpriority="high"` только после измерения.

Для lazy-loaded images полезно задавать dimensions:

```html
<img
  src="card.jpg"
  loading="lazy"
  width="640"
  height="360"
  alt="..."
/>
```

Browser может вычислить aspect ratio и зарезервировать место до download, снижая CLS.

Также lazy loading не исправляет oversized image: offscreen 5 MB photo останется 5 MB после начала загрузки. Его
комбинируют с `srcset`, compression и CDN resizing.

На интервью: **lazy loading управляет моментом fetch, responsive images — размером выбранного resource; для хорошего
performance нужны оба уровня и нельзя lazy-load critical LCP image без причины**.

</td></tr></table>

</details>

<details>
<summary>Что такое <code>alt</code> и когда он должен быть пустым?</summary><br>
<table><tr><td>

**Короткий ответ**

`alt` задает text alternative для `<img>`. Для meaningful image он передает эквивалентный смысл/функцию в контексте; для
purely decorative image используют `alt=""`, чтобы assistive technologies могли его пропустить. Filename и описание всех
визуальных деталей обычно не нужны.

**Полный ответ**

Хороший `alt` отвечает не на вопрос «что нарисовано вообще», а **что пользователь должен получить из изображения в этом
контексте**.

Meaningful image:

```html
<img
  src="chart.png"
  alt="Продажи выросли с 12 до 18 млн рублей за второй квартал"
/>
```

Если chart содержит complex data, одного alt может быть недостаточно: рядом нужен text/table explanation.

Decorative image:

```html
<img
  src="separator.svg"
  alt=""
/>
```

Пустой `alt` говорит, что image не добавляет meaningful information. Это отличается от **отсутствующего `alt`**: без
attribute user agent/AT может пытаться восстановить alternative из filename или других signals.

Если image уже дублирует соседний text:

```html
<a href="/download">
  <img
    src="download.svg"
    alt=""
  />
  Скачать отчет
</a>
```

иконка декоративна, потому что link уже имеет понятное accessible name из текста.

Если image является единственным content ссылки/кнопки, alt должен передавать **функцию**, а не форму:

```html
<a href="/home">
  <img
    src="logo.svg"
    alt="Компания Example — на главную"
  />
</a>
```

Типичные ошибки:

- `alt="image123.png"`;
- keyword stuffing ради SEO;
- повтор caption слово в слово без пользы;
- описание декоративных flourishes;
- пустой alt у meaningful content.

На интервью: **alt — functional/text equivalent image в данном context; `alt=""` сознательно помечает decoration, а
отсутствие alt — совсем другой semantic state**.

</td></tr></table>

</details>

<details>
<summary>Для чего нужен элемент <code>picture</code>?</summary><br>
<table><tr><td>

**Короткий ответ**

`<picture>` позволяет выбрать разные `<source>` по media/type, сохраняя обязательный fallback `<img>`. Его используют
для art direction или format negotiation; если отличаются только resolutions одного изображения, часто достаточно
`img[srcset][sizes]`.

**Полный ответ**

`picture` — контейнер для нескольких возможных image sources. Само изображение все равно представляет вложенный `<img>`.

**Format selection:**

```html
<picture>
  <source
    srcset="hero.avif"
    type="image/avif"
  />
  <source
    srcset="hero.webp"
    type="image/webp"
  />
  <img
    src="hero.jpg"
    width="1600"
    height="900"
    alt="Город ночью"
  />
</picture>
```

Browser выбирает первый подходящий source, который соответствует conditions/capabilities; `img` остается fallback и
владельцем `alt`, dimensions и большей части semantics.

**Art direction:** mobile может требовать не просто меньший файл, а другой crop/composition.

```html
<picture>
  <source
    media="(max-width: 40rem)"
    srcset="portrait-crop.jpg"
  />
  <img
    src="wide.jpg"
    alt="Спикер на сцене"
  />
</picture>
```

Здесь images визуально различаются по composition, но должны сохранять тот же meaningful content/alt contract.

Когда `picture` не нужен:

```html
<img
  srcset="photo-480.jpg 480w, photo-960.jpg 960w"
  sizes="100vw"
  src="photo-960.jpg"
  alt="..."
/>
```

Если задача только выбрать resolution одной и той же картинки, `srcset` проще.

На интервью: **`picture` выбирает source strategy (format/art direction), а `img` остается semantic fallback; для
простого resolution switching обычно достаточно `srcset/sizes`**.

</td></tr></table>

</details>

<details>
<summary>Что такое SVG?</summary><br>
<table><tr><td>

**Короткий ответ**

SVG (Scalable Vector Graphics) — XML-based vector graphics format: изображение описывается shapes, paths, text,
gradients и transforms. Browser масштабирует geometry в заданный viewport, поэтому SVG хорошо подходит для
icons/logos/diagrams и может быть частью DOM при inline usage.

**Полный ответ**

SVG — это не просто «картинка без пикселей». Это отдельная vector graphics model.

Минимальный пример:

```html
<svg
  viewBox="0 0 24 24"
  width="24"
  height="24"
  aria-hidden="true"
>
  <circle
    cx="12"
    cy="12"
    r="10"
  />
</svg>
```

Внутри можно описывать:

- `path`, `circle`, `rect`, `line`, `polygon`;
- fills/strokes;
- gradients;
- transforms;
- clipping/masks;
- text;
- reusable symbols.

`viewBox` задает internal coordinate system. Внешний `width`/`height` определяет, сколько места SVG занимает в layout, а
browser преобразует внутренние координаты к этому viewport.

SVG можно доставлять по-разному:

```html
<img
  src="logo.svg"
  alt="Example"
/>
```

или inline:

```html
<svg viewBox="0 0 24 24">...</svg>
```

Inline вариант становится частью DOM и дает больше CSS/control; external `<img>` проще кешируется/изолирует internals.

Слово Scalable не означает бесплатный rendering. SVG с тысячами paths, filters и animations может быть тяжелым по
CPU/memory. Optimization удаляет editor metadata, упрощает paths и уменьшает precision, но должна сохранять
semantics/visual result.

На интервью: **SVG хранит vector scene, а browser rasterizes ее под текущий viewport; это делает format удобным для
scalable UI graphics, но complexity scene все равно влияет на performance**.

</td></tr></table>

</details>

<details>
<summary>Почему SVG подходит для scalable icons?</summary><br>
<table><tr><td>

**Короткий ответ**

SVG icon описывает geometry в логической coordinate system, поэтому один asset можно отрисовать в 16px, 24px, 48px и на
high-DPR screen без отдельных bitmap resolutions. `viewBox` сохраняет proportions, а `currentColor` позволяет встроить
icon в design-system color contract.

**Полный ответ**

Bitmap icon хранит конкретную pixel grid. Если растянуть маленький PNG, browser интерполирует pixels, а для разных DPR
часто нужны отдельные assets.

SVG задает geometry:

```html
<svg
  viewBox="0 0 24 24"
  class="icon"
  aria-hidden="true"
>
  <path
    d="..."
    fill="currentColor"
  />
</svg>
```

```css
.icon {
  inline-size: 1.5rem;
  block-size: 1.5rem;
}
```

`viewBox="0 0 24 24"` остается той же coordinate system независимо от CSS size. Browser масштабирует path в 16, 24, 32
или 48 CSS px, а затем rasterizes для physical device pixels.

Это удобно для design system:

- один symbol/asset на размеры;
- цвет наследуется от `color`;
- hover/disabled state не требует нового файла;
- icon можно встроить в button/text flow;
- не нужен font loading как у icon fonts.

Но визуально хороший scalable icon иногда требует **optical variants**. Очень тонкий 24px icon, уменьшенный до 12px,
может потерять читаемость. Тогда design system хранит несколько intentional glyph variants, даже если технически SVG
масштабируется бесконечно.

На интервью: **SVG масштабируется математически благодаря geometry/viewBox, но product-quality iconography все равно
учитывает stroke weight, optical size и rendering complexity**.

</td></tr></table>

</details>

<details>
<summary>Как сделать SVG-иконку масштабируемой?</summary><br>
<table><tr><td>

**Короткий ответ**

Задать корректный `viewBox`, не привязывать geometry к одному CSS-size и управлять внешними `width`/`height` через
attributes или CSS. Обычно сохраняют aspect ratio, а для icon component задают один logical size и `currentColor`.

**Полный ответ**

Базовый scalable icon:

```html
<svg
  class="icon"
  viewBox="0 0 24 24"
  aria-hidden="true"
>
  <path
    fill="currentColor"
    d="..."
  />
</svg>
```

```css
.icon {
  width: 1.5rem;
  height: 1.5rem;
}
```

Ключевая часть — `viewBox`. Он описывает internal canvas, например `0 0 24 24`. CSS size может меняться, а browser
знает, как преобразовать координаты path.

Если `viewBox` отсутствует, SVG может иметь fixed intrinsic dimensions, но reusable scaling становится менее
предсказуемым, особенно для generated assets.

В component API полезно отделить:

- **geometry** — fixed в SVG asset;
- **layout size** — CSS/token/prop;
- **color** — `currentColor`;
- **semantics** — decorative vs meaningful.

Например:

```css
.icon--s {
  width: 1rem;
  height: 1rem;
}
.icon--m {
  width: 1.5rem;
  height: 1.5rem;
}
.icon--l {
  width: 2rem;
  height: 2rem;
}
```

Не стоит удалять `viewBox` во время SVG optimization: это одна из типичных причин «иконка перестала масштабироваться».

На интервью: **масштабируемость = стабильная internal coordinate system через `viewBox` + независимый external CSS
size**.

</td></tr></table>

</details>

<details>
<summary>Что такое <code>viewBox</code> в SVG?</summary><br>
<table><tr><td>

**Короткий ответ**

`viewBox="min-x min-y width height"` задает прямоугольник внутренней coordinate system SVG, который отображается во
внешний viewport. Например `0 0 24 24` означает logical canvas 24×24 units; browser масштабирует его под фактический
`width`/`height`.

**Полный ответ**

Разберем:

```html
<svg
  viewBox="0 0 24 24"
  width="48"
  height="48"
>
  <circle
    cx="12"
    cy="12"
    r="10"
  />
</svg>
```

`viewBox` содержит четыре числа:

```text
min-x min-y width height
```

Для `0 0 24 24` internal coordinates идут от `0` до `24` по обеим axes. Внешний viewport здесь 48×48 CSS px, поэтому
geometry масштабируется примерно в 2 раза.

Это позволяет path оставаться таким же:

```html
<path d="M4 12h16" />
```

а размер icon менять через CSS.

`viewBox` также может иметь non-zero origin:

```html
<svg viewBox="-12 -12 24 24">...</svg>
```

Это полезно для coordinate systems вокруг center.

Как content вписывается во viewport, дополнительно контролирует `preserveAspectRatio`. Default обычно сохраняет aspect
ratio и центрирует content; для специальных graphics поведение можно изменить.

Важно не путать `viewBox` с physical/image size. Он не говорит «SVG шириной 24px». Это **logical coordinate window**.

На интервью: **`viewBox` связывает внутреннюю geometry и внешний viewport; благодаря этому SVG можно resize без
переписывания coordinates**.

</td></tr></table>

</details>

<details>
<summary>Чем <code>width</code>/<code>height</code> отличаются от <code>viewBox</code>?</summary><br>
<table><tr><td>

**Короткий ответ**

`width`/`height` задают внешний viewport/intrinsic layout size SVG, а `viewBox` — внутреннюю coordinate system, которую
browser вписывает в этот viewport. Поэтому `viewBox="0 0 24 24"` может отображаться как 16×16, 24×24 или 64×64 CSS px.

**Полный ответ**

Пример:

```html
<svg
  viewBox="0 0 24 24"
  width="48"
  height="48"
>
  ...
</svg>
```

Здесь:

- internal drawing space — 24×24 logical units;
- layout viewport — 48×48 CSS px;
- browser выполняет transform между ними.

Если поменять:

```css
svg {
  width: 2rem;
  height: 2rem;
}
```

geometry не меняется; меняется только space, в который она rasterizes.

Почему полезно указывать `width`/`height` у external images? Они помогают browser заранее знать aspect ratio/intrinsic
dimensions и резервировать layout space.

Для inline icon component часто dimensions задает CSS, а attributes можно опустить или использовать как sensible
defaults. Но `viewBox` обычно сохраняют в asset.

Если external viewport имеет другой aspect ratio, вступает `preserveAspectRatio`: browser решает, letterbox/crop/stretch
ли geometry.

На интервью: **`viewBox` отвечает «в каких координатах нарисовано», width/height — «какого размера это место в
layout»**.

</td></tr></table>

</details>

<details>
<summary>Как менять цвет SVG-иконки через CSS?</summary><br>
<table><tr><td>

**Короткий ответ**

Для monochrome icon обычно используют `fill="currentColor"` или `stroke="currentColor"`. `currentColor` берет computed
CSS `color` текущего element, поэтому icon автоматически следует text/hover/disabled theme без отдельных asset variants.

**Полный ответ**

Пример:

```html
<button class="action">
  <svg
    class="icon"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fill="currentColor"
      d="..."
    />
  </svg>
  Сохранить
</button>
```

```css
.action {
  color: var(--text-action);
}

.action:hover {
  color: var(--text-action-hover);
}
```

SVG path наследует current `color` через `currentColor`.

Для stroke icon:

```html
<path
  d="..."
  fill="none"
  stroke="currentColor"
  stroke-width="2"
/>
```

Преимущества:

- меньше duplicate SVG variants;
- theme/high-contrast styles проще централизовать;
- icon и label остаются синхронными;
- CSS states работают естественно.

Но это работает только если SVG доступен для styling. Inline SVG/symbol обычно позволяет управлять internal paint.
`<img src="icon.svg">` воспринимается как replaced image: CSS страницы не может просто выбрать path внутри external
document.

Multi-color illustration не нужно насильно сводить к `currentColor`; там лучше semantic CSS custom properties или
фиксированная palette в зависимости от component contract.

На интервью: **`currentColor` связывает SVG paint с CSS `color`, поэтому monochrome icon становится частью обычного
typography/state contract**.

</td></tr></table>

</details>

<details>
<summary>Что лучше для иконок: inline SVG, SVG sprite или <code>img</code>?</summary><br>
<table><tr><td>

**Короткий ответ**

Нет универсального победителя. Inline SVG проще стилизовать и делать stateful, sprite уменьшает дублирование geometry
для большого icon set, `<img src="...svg">` хорошо кешируется и изолирует internals. Выбор делают на уровне
design-system pipeline, учитывая cache, theming, accessibility и bundle size.

**Полный ответ**

**Inline SVG**

```html
<svg
  viewBox="0 0 24 24"
  aria-hidden="true"
>
  <path
    fill="currentColor"
    d="..."
  />
</svg>
```

Плюсы:

- `currentColor`, CSS variables и animation;
- semantics рядом с control;
- нет отдельного request при inlined bundle/template.

Минусы:

- geometry повторяется в DOM, если icon используется сотни раз;
- увеличивает HTML/JS template payload.

**SVG sprite**

```html
<svg aria-hidden="true">
  <use href="#icon-search" />
</svg>
```

Плюсы:

- reusable symbols;
- единый icon catalog;
- меньше duplicate path markup.

Trade-offs:

- build/runtime pipeline сложнее;
- external sprite/CORS/caching behavior нужно продумать;
- accessibility обычно задается на consuming control, не symbol.

**`img`**

```html
<img
  src="/icons/search.svg"
  alt=""
/>
```

Плюсы:

- простой resource;
- browser cache;
- internal SVG не загрязняет DOM.

Минус: parent page не может обычным CSS изменить individual path fill/stroke external SVG.

В современном component library часто icon component скрывает strategy от product code:

```html
<tui-icon name="search" />
```

а pipeline решает sprite/inline/caching.

Icon fonts обычно проигрывают SVG по semantics, fallback и control over geometry, хотя могут встречаться в legacy
systems.

На интервью: **выбирают не syntax, а delivery architecture: inline — control, sprite — reuse, img — isolation/cache;
design system должен унифицировать API и accessibility**.

</td></tr></table>

</details>

<details>
<summary>Какие проблемы появляются при локализации frontend-приложения?</summary><br>
<table><tr><td>

**Короткий ответ**

Localization затрагивает layout, plural rules, dates/numbers/currency, sorting, fonts, line breaking, LTR/RTL,
accessibility и metadata — не только перевод строк. Компоненты должны выдерживать длинные labels, другой word order и
разные locale formats без hardcoded widths/concatenated phrases.

**Полный ответ**

Типичный anti-pattern — считать i18n заменой строки:

```ts
button = locale === 'ru' ? 'Сохранить' : 'Save';
```

Реальный localization contract шире.

**Длина текста**

German/Finnish/Russian translation может быть заметно длиннее English. Fixed-width button/card начинает overflow.

**Grammar/pluralization**

```text
1 item / 2 items
```

нельзя надежно собирать простым `count + word`. Используют ICU/message format или locale-aware translation system.

**Date/time/number/currency**

`12/08/2026`, decimal separators, grouping, timezone и currency display различаются. Форматируют через `Intl`, а не
string concatenation.

**Word order**

Нельзя переводить fragments отдельно:

```text
'Delete ' + userName + '?'
```

Другой язык может требовать иной порядок/склонение.

**RTL**

Arabic/Hebrew требуют logical CSS properties (`margin-inline-start`, `inset-inline-end`), корректных directional icons и
проверки mixed LTR/RTL content.

**Fonts**

Выбранный font может не содержать Cyrillic/CJK/Arabic glyphs или иметь другой metrics, меняющий layout.

**Accessibility/metadata**

Обновляются `lang`, accessible labels, validation messages, title/description/OG metadata.

**Images**

Не стоит вшивать текст в raster/SVG asset без localization pipeline. Text в image хуже переводится, масштабируется и
читается assistive technologies.

Практический workflow включает pseudo-localization: искусственно удлиняют strings и тестируют accented/RTL content до
реальных переводов.

На интервью: **localization — изменение assumptions интерфейса о text, grammar, direction и formatting; resilient
component не зависит от длины и порядка English strings**.

</td></tr></table>

</details>

<details>
<summary>Как сделать SVG-иконку доступной?</summary><br>
<table><tr><td>

**Короткий ответ**

Сначала определить, несет ли icon собственный смысл. Decorative SVG скрывают через `aria-hidden="true"` (accessible name
дает окружающий control/text). Meaningful standalone graphic получает role/name, например `role="img"` +
`aria-labelledby`; icon-only button должен иметь имя на самой кнопке.

**Полный ответ**

**Decorative icon внутри подписанной кнопки:**

```html
<button type="button">
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    ...
  </svg>
  Поиск
</button>
```

Button уже имеет accessible name «Поиск», поэтому отдельное объявление SVG только дублировало бы информацию.

**Icon-only button:**

```html
<button
  type="button"
  aria-label="Закрыть"
>
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    ...
  </svg>
</button>
```

Interaction owner — button, значит name принадлежит **button**, а не внутреннему path/SVG.

**Meaningful standalone SVG:**

```html
<svg
  role="img"
  aria-labelledby="chart-title chart-desc"
  viewBox="0 0 400 200"
>
  <title id="chart-title">Динамика выручки</title>
  <desc id="chart-desc">Рост на 24% за квартал</desc>
  ...
</svg>
```

Для complex chart SVG name/description редко достаточно: рядом нужен readable data/table summary.

`focusable="false"` иногда встречается как legacy interoperability measure, но современная стратегия должна исходить из
actual support matrix. Главное — декоративный SVG не должен становиться отдельной focus stop без interaction.

Нельзя ставить `aria-hidden="true"` на SVG, если он сам является единственным meaningful interactive object.

На интервью: **accessibility SVG определяется ролью в UI: decoration скрываем, interaction name задаем control,
standalone meaningful graphic получает semantic name/description**.

</td></tr></table>

</details>

<details>
<summary>Какие ошибки часто делают при работе с SVG-иконками?</summary><br>
<table><tr><td>

**Короткий ответ**

Частые ошибки: удаленный/неверный `viewBox`, hardcoded fill вместо `currentColor`, лишняя editor metadata, слишком
сложные paths, дублирование accessible names, отсутствие icon pipeline и небезопасный inline untrusted SVG. Иконка
должна иметь единый geometry/style/accessibility contract.

**Полный ответ**

Практический checklist.

**1. Теряют `viewBox`**

После optimizer/export icon перестает нормально resize или получает unexpected crop.

**2. Hardcode цвета**

```html
<path fill="#000" />
```

Theme/hover/disabled states требуют новых assets. Для monochrome icon чаще подходит `currentColor`.

**3. Оставляют editor noise**

Figma/Illustrator export может содержать metadata, unnecessary groups, transforms, huge coordinate precision.
Optimization уменьшает bytes/DOM complexity.

**4. Переоптимизируют**

Aggressive path simplification может визуально изменить glyph или удалить нужные ids/viewBox. Optimizer config должен
тестироваться на real icon set.

**5. Неверная accessibility**

Decorative SVG озвучивается рядом с text или icon-only button вообще не имеет name.

**6. Дублируют geometry в application code**

Десятки teams копируют raw paths. Лучше central icon registry/component/package.

**7. Огромный sprite**

Если single sprite содержит тысячи icons, пользователь может скачать большой unused payload. Нужно смотреть bundle/cache
usage.

**8. Небезопасно вставляют external SVG markup**

SVG — markup format. Untrusted uploaded SVG нельзя вставлять как trusted inline HTML без sanitization/threat analysis.

**9. Путают visual size и hit target**

16×16 icon внутри button не означает, что pointer target должен быть 16×16. Interaction sizing — задача button
component.

**10. Не тестируют forced colors/themes**

Hardcoded fills/strokes могут исчезнуть в high-contrast theme.

На интервью: **хорошая SVG-система — не коллекция файлов, а pipeline: optimize geometry, preserve viewBox, unify
color/size, define accessibility ownership и контролировать security/cache**.

</td></tr></table>

</details>

### Accessibility и SEO

<details>
<summary>Как рассчитывается accessible name?</summary><br>
<table><tr><td>

**Короткий ответ**

Accessible name - имя элемента в accessibility tree. Его могут задавать видимый текст, aria-labelledby, aria-label, alt,
label элемента формы и другие источники по алгоритму браузера.

**Полный ответ**

Accessible name - имя элемента в accessibility tree. Его могут задавать видимый текст, `aria-labelledby`, `aria-label`,
`alt`, label элемента формы и другие источники по алгоритму браузера.

```html
<button aria-label="Закрыть">
  <svg aria-hidden="true"></svg>
</button>
```

Лучше предпочитать видимый текст или `aria-labelledby`, потому что они синхронизированы с интерфейсом. `aria-label`
полезен для icon-only controls, но его легко забыть обновить при переводе.

</td></tr></table>

</details>

<details>
<summary>Когда использовать <code>aria-live</code>?</summary><br>
<table><tr><td>

**Короткий ответ**

aria-live сообщает screen reader об изменениях, которые происходят без перемещения focus: ошибка сохранения, результат
поиска, завершение загрузки. Для обычного контента, который появляется после действия и получает focus, live region
часто не нужна.

**Полный ответ**

`aria-live` сообщает screen reader об изменениях, которые происходят без перемещения focus: ошибка сохранения, результат
поиска, завершение загрузки. Для обычного контента, который появляется после действия и получает focus, live region
часто не нужна.

```html
<p
  role="status"
  aria-live="polite"
>
  Данные сохранены
</p>
```

`polite` не перебивает текущую речь, `assertive` используют редко и только для срочных сообщений. Частая ошибка -
объявлять слишком много изменений и создавать шум.

</td></tr></table>

</details>

<details>
<summary>Что такое structured data и зачем нужен JSON-LD?</summary><br>
<table><tr><td>

**Короткий ответ**

Structured data описывает смысл страницы машинно-читаемым способом: article, product, breadcrumbs, FAQ, organization.
JSON-LD удобно добавлять отдельным script block, не смешивая schema-разметку с HTML-структурой.

**Полный ответ**

Structured data описывает смысл страницы машинно-читаемым способом: article, product, breadcrumbs, FAQ, organization.
JSON-LD удобно добавлять отдельным script block, не смешивая schema-разметку с HTML-структурой.

```html
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Frontend interview questions"
  }
</script>
```

JSON-LD не гарантирует rich results. Данные должны соответствовать видимому контенту страницы, иначе поисковая система
может их игнорировать.

</td></tr></table>

</details>
