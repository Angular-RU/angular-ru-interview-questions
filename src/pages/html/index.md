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

form объединяет controls и при submit формирует набор успешных пар name=value. Браузер валидирует controls, кодирует
данные и отправляет их на action выбранным method, если JavaScript не перехватил событие.

**Полный ответ**

`form` объединяет controls и при submit формирует набор успешных пар `name=value`. Браузер валидирует controls, кодирует
данные и отправляет их на `action` выбранным `method`, если JavaScript не перехватил событие.

</td></tr></table>

</details>

<details>
<summary>Что делают <code>action</code> и <code>method</code> у формы?</summary><br>
<table><tr><td>

**Короткий ответ**

action задает URL отправки, method — HTTP-метод get или post. При GET данные попадают в query string, при POST — в
request body. Для других HTTP-методов обычно используют JavaScript или backend method override.

**Полный ответ**

`action` задает URL отправки, `method` — HTTP-метод `get` или `post`. При `GET` данные попадают в query string, при
`POST` — в request body. Для других HTTP-методов обычно используют JavaScript или backend method override.

</td></tr></table>

</details>

<details>
<summary>Чем GET form отличается от POST form?</summary><br>
<table><tr><td>

**Короткий ответ**

GET подходит для безопасного поиска и фильтров: URL можно сохранить и повторить. POST используют для операций с побочным
эффектом и больших или чувствительных данных, но HTTPS все равно обязателен. Выбор метода не является
authorization-механизмом.

**Полный ответ**

GET подходит для безопасного поиска и фильтров: URL можно сохранить и повторить. POST используют для операций с побочным
эффектом и больших или чувствительных данных, но HTTPS все равно обязателен. Выбор метода не является
authorization-механизмом.

</td></tr></table>

</details>

<details>
<summary>Почему специализированные типы <code>input</code> полезнее <code>text</code>?</summary><br>
<table><tr><td>

**Короткий ответ**

Типы email, number, date, url, search, tel, checkbox и другие дают подходящую семантику, native validation, мобильную
клавиатуру и browser UI. Поддержка и локализация отдельных типов различаются, поэтому server validation все равно нужна.

**Полный ответ**

Типы `email`, `number`, `date`, `url`, `search`, `tel`, `checkbox` и другие дают подходящую семантику, native
validation, мобильную клавиатуру и browser UI. Поддержка и локализация отдельных типов различаются, поэтому server
validation все равно нужна.

</td></tr></table>

</details>

<details>
<summary>Что такое <code>label</code> и как связать его с control?</summary><br>
<table><tr><td>

**Короткий ответ**

label дает полю доступное имя и увеличивает clickable area. Его связывают атрибутом for, равным id control, или
вкладывают control внутрь label.

**Полный ответ**

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

**Короткий ответ**

Placeholder исчезает при вводе, часто имеет низкий contrast и не является надежной подписью для assistive technologies.
Он может показывать пример формата, но постоянное понятное имя поля должен задавать label.

**Полный ответ**

Placeholder исчезает при вводе, часто имеет низкий contrast и не является надежной подписью для assistive technologies.
Он может показывать пример формата, но постоянное понятное имя поля должен задавать label.

</td></tr></table>

</details>

<details>
<summary>Для чего нужен <code>name</code> у form control?</summary><br>
<table><tr><td>

**Короткий ответ**

name определяет ключ при native form submission и объединяет radio buttons в одну группу. Control без name обычно не
входит в отправляемый набор данных.

**Полный ответ**

`name` определяет ключ при native form submission и объединяет radio buttons в одну группу. Control без `name` обычно не
входит в отправляемый набор данных.

</td></tr></table>

</details>

<details>
<summary>Что такое native validation?</summary><br>
<table><tr><td>

**Короткий ответ**

Браузер проверяет constraints вроде required, min, max, minlength, maxlength, pattern и соответствие типу перед submit.
Это улучшает UX, но не заменяет backend validation, потому что клиентскую проверку можно обойти.

**Полный ответ**

Браузер проверяет constraints вроде `required`, `min`, `max`, `minlength`, `maxlength`, `pattern` и соответствие типу
перед submit. Это улучшает UX, но не заменяет backend validation, потому что клиентскую проверку можно обойти.

</td></tr></table>

</details>

<details>
<summary>Для чего нужен <code>autocomplete</code>?</summary><br>
<table><tr><td>

**Короткий ответ**

autocomplete подсказывает браузеру назначение поля, например name, email, current-password или one-time-code. Корректные
tokens ускоряют заполнение и помогают пользователям с когнитивными и моторными ограничениями.

**Полный ответ**

`autocomplete` подсказывает браузеру назначение поля, например `name`, `email`, `current-password` или `one-time-code`.
Корректные tokens ускоряют заполнение и помогают пользователям с когнитивными и моторными ограничениями.

</td></tr></table>

</details>

<details>
<summary>Как сделать accessible error message для поля?</summary><br>
<table><tr><td>

**Короткий ответ**

Сообщение должно быть конкретным, видимым и связанным с полем через aria-describedby; невалидность можно обозначить
aria-invalid="true". После submit focus переводят осмысленно, а динамическую сводку ошибок при необходимости объявляют
live region.

**Полный ответ**

Сообщение должно быть конкретным, видимым и связанным с полем через `aria-describedby`; невалидность можно обозначить
`aria-invalid="true"`. После submit focus переводят осмысленно, а динамическую сводку ошибок при необходимости объявляют
live region.

</td></tr></table>

</details>

<details>
<summary>Почему disabled field не отправляется вместе с формой?</summary><br>
<table><tr><td>

**Короткий ответ**

Disabled control исключается из focus order, validation и набора успешных controls при submit. Если значение должно
отправляться, используют другой способ моделирования; скрытое поле нельзя считать защитой от подмены данных.

**Полный ответ**

Disabled control исключается из focus order, validation и набора успешных controls при submit. Если значение должно
отправляться, используют другой способ моделирования; скрытое поле нельзя считать защитой от подмены данных.

</td></tr></table>

</details>

<details>
<summary>Чем <code>disabled</code> отличается от <code>readonly</code>?</summary><br>
<table><tr><td>

**Короткий ответ**

disabled control не фокусируется и не отправляется. readonly поддерживается только частью controls, остается focusable и
отправляет значение, но пользователь не может его изменить обычным вводом.

**Полный ответ**

`disabled` control не фокусируется и не отправляется. `readonly` поддерживается только частью controls, остается
focusable и отправляет значение, но пользователь не может его изменить обычным вводом.

</td></tr></table>

</details>

<details>
<summary>Для чего нужны <code>fieldset</code> и <code>legend</code>?</summary><br>
<table><tr><td>

**Короткий ответ**

fieldset семантически группирует связанные controls, а legend дает группе доступное название. Это особенно важно для
radio buttons и checkbox groups, где отдельные labels не объясняют общий вопрос.

**Полный ответ**

`fieldset` семантически группирует связанные controls, а `legend` дает группе доступное название. Это особенно важно для
radio buttons и checkbox groups, где отдельные labels не объясняют общий вопрос.

</td></tr></table>

</details>

<details>
<summary>Как группировать radio buttons?</summary><br>
<table><tr><td>

**Короткий ответ**

Radio buttons одной группы получают одинаковый name, уникальные id и собственные labels. Группу помещают в fieldset с
legend, чтобы ее назначение было понятно визуально и screen reader.

**Полный ответ**

Radio buttons одной группы получают одинаковый `name`, уникальные `id` и собственные labels. Группу помещают в
`fieldset` с `legend`, чтобы ее назначение было понятно визуально и screen reader.

</td></tr></table>

</details>

### Accessibility

<details>
<summary>Что такое accessibility и WCAG?</summary><br>
<table><tr><td>

**Короткий ответ**

Accessibility, или a11y, — проектирование интерфейса так, чтобы им могли пользоваться люди с разными возможностями и
устройствами. WCAG — рекомендации W3C, сгруппированные по принципам perceivable, operable, understandable и robust, с
проверяемыми критериями уровней A, AA и AAA.

**Полный ответ**

Accessibility, или a11y, — проектирование интерфейса так, чтобы им могли пользоваться люди с разными возможностями и
устройствами. WCAG — рекомендации W3C, сгруппированные по принципам perceivable, operable, understandable и robust, с
проверяемыми критериями уровней A, AA и AAA.

</td></tr></table>

</details>

<details>
<summary>Что такое keyboard navigation и visible focus?</summary><br>
<table><tr><td>

**Короткий ответ**

Все действия должны быть доступны с клавиатуры в логичном порядке. Текущий focus обязан быть заметен; нельзя убирать
outline без равноценной замены. Native controls уже поддерживают Tab, Enter, Space и ожидаемые паттерны.

**Полный ответ**

Все действия должны быть доступны с клавиатуры в логичном порядке. Текущий focus обязан быть заметен; нельзя убирать
outline без равноценной замены. Native controls уже поддерживают Tab, Enter, Space и ожидаемые паттерны.

</td></tr></table>

</details>

<details>
<summary>Что такое focus management и focus trap?</summary><br>
<table><tr><td>

**Короткий ответ**

Focus management переводит focus после значимого UI-события и возвращает его в понятное место. Modal dialog ограничивает
Tab внутри себя, устанавливает начальный focus и после закрытия возвращает его trigger. Focus trap не применяют к
немодальным областям без необходимости.

**Полный ответ**

Focus management переводит focus после значимого UI-события и возвращает его в понятное место. Modal dialog ограничивает
Tab внутри себя, устанавливает начальный focus и после закрытия возвращает его trigger. Focus trap не применяют к
немодальным областям без необходимости.

</td></tr></table>

</details>

<details>
<summary>Что такое screen reader?</summary><br>
<table><tr><td>

**Короткий ответ**

Screen reader озвучивает accessibility tree и позволяет перемещаться по headings, landmarks, controls и другим
семантическим узлам. Проверка только DOM или визуального вида не гарантирует корректный опыт screen reader.

**Полный ответ**

Screen reader озвучивает accessibility tree и позволяет перемещаться по headings, landmarks, controls и другим
семантическим узлам. Проверка только DOM или визуального вида не гарантирует корректный опыт screen reader.

</td></tr></table>

</details>

<details>
<summary>Что такое ARIA и когда ее использовать?</summary><br>
<table><tr><td>

**Короткий ответ**

ARIA добавляет roles, states и relationships в accessibility tree, но не создает keyboard behavior и не меняет семантику
для обычного UI автоматически. Сначала выбирают native HTML; ARIA используют, когда нужную семантику нельзя выразить
подходящим элементом.

**Полный ответ**

ARIA добавляет roles, states и relationships в accessibility tree, но не создает keyboard behavior и не меняет семантику
для обычного UI автоматически. Сначала выбирают native HTML; ARIA используют, когда нужную семантику нельзя выразить
подходящим элементом.

</td></tr></table>

</details>

<details>
<summary>Как ARIA и screen reader связаны с accessibility?</summary><br>
<table><tr><td>

**Короткий ответ**

Screen reader читает accessibility tree, который строится из HTML-семантики, текста, attributes и ARIA. ARIA может
добавить role, state или связь между элементами, но не добавляет поведение клавиатуры и не исправляет неверный элемент.
Поэтому сначала выбирают native HTML, а ARIA используют для сложных widgets и динамических состояний.

**Полный ответ**

Screen reader читает accessibility tree, который строится из HTML-семантики, текста, attributes и ARIA. ARIA может
добавить role, state или связь между элементами, но не добавляет поведение клавиатуры и не исправляет неверный элемент.
Поэтому сначала выбирают native HTML, а ARIA используют для сложных widgets и динамических состояний.

</td></tr></table>

</details>

<details>
<summary>Как сделать страницу доступнее без JavaScript?</summary><br>
<table><tr><td>

**Короткий ответ**

Использовать semantic landmarks, правильную иерархию заголовков, label, fieldset, legend, понятные ссылки, доступные
изображения и native form validation. Контент и основные действия должны быть доступны как HTML, а JavaScript добавляет
улучшения. Такой подход помогает progressive enhancement и снижает риск пустого интерфейса при ошибке bundle.

**Полный ответ**

Использовать semantic landmarks, правильную иерархию заголовков, `label`, `fieldset`, `legend`, понятные ссылки,
доступные изображения и native form validation. Контент и основные действия должны быть доступны как HTML, а JavaScript
добавляет улучшения. Такой подход помогает progressive enhancement и снижает риск пустого интерфейса при ошибке bundle.

</td></tr></table>

</details>

<details>
<summary>Зачем команде accessibility checklist?</summary><br>
<table><tr><td>

**Короткий ответ**

Accessibility checklist помогает не забывать базовые требования: semantic HTML, keyboard navigation, focus states,
labels, contrast, alt text и корректные ARIA attributes. В большой команде это превращает accessibility из личной памяти
отдельного разработчика в повторяемую часть review и testing workflow.

**Полный ответ**

Accessibility checklist помогает не забывать базовые требования: semantic HTML, keyboard navigation, focus states,
labels, contrast, alt text и корректные ARIA attributes. В большой команде это превращает accessibility из личной памяти
отдельного разработчика в повторяемую часть review и testing workflow.

</td></tr></table>

</details>

<details>
<summary>Какие accessibility tools стоит использовать во frontend workflow?</summary><br>
<table><tr><td>

**Короткий ответ**

Полезны axe, Lighthouse, browser DevTools, Angular ESLint template rules и component tests для важных состояний. Но
инструменты находят только часть проблем, поэтому их дополняют ручной проверкой keyboard flow, focus order и screen
reader поведения в ключевых сценариях.

**Полный ответ**

Полезны axe, Lighthouse, browser DevTools, Angular ESLint template rules и component tests для важных состояний. Но
инструменты находят только часть проблем, поэтому их дополняют ручной проверкой keyboard flow, focus order и screen
reader поведения в ключевых сценариях.

</td></tr></table>

</details>

<details>
<summary>Почему accessibility нельзя полностью проверить автоматическими тестами?</summary><br>
<table><tr><td>

**Короткий ответ**

Автотесты могут найти отсутствие label, часть ошибок ARIA, слабый contrast и очевидные нарушения semantics. Но они не
понимают смысл текста, удобство сценария, ожидаемый порядок focus и реальное восприятие screen reader. Поэтому хороший
workflow сочетает automated checks, ручную проверку и ревью компонентов design system.

**Полный ответ**

Автотесты могут найти отсутствие label, часть ошибок ARIA, слабый contrast и очевидные нарушения semantics. Но они не
понимают смысл текста, удобство сценария, ожидаемый порядок focus и реальное восприятие screen reader. Поэтому хороший
workflow сочетает automated checks, ручную проверку и ревью компонентов design system.

</td></tr></table>

</details>

<details>
<summary>Что такое accessible name и как кнопка его получает?</summary><br>
<table><tr><td>

**Короткий ответ**

Accessible name — имя элемента в accessibility tree. Кнопка обычно получает его из видимого текста, затем могут
учитываться aria-labelledby или aria-label. Видимая подпись предпочтительнее скрытого имени, когда она уместна.

**Полный ответ**

Accessible name — имя элемента в accessibility tree. Кнопка обычно получает его из видимого текста, затем могут
учитываться `aria-labelledby` или `aria-label`. Видимая подпись предпочтительнее скрытого имени, когда она уместна.

</td></tr></table>

</details>

<details>
<summary>Чем <code>aria-label</code>, <code>aria-labelledby</code> и <code>aria-describedby</code> отличаются?</summary><br>
<table><tr><td>

**Короткий ответ**

aria-label задает строку имени напрямую, aria-labelledby берет имя из текста других элементов, а aria-describedby
добавляет описание после имени. Они не взаимозаменяемы: label отвечает «что это», description — за дополнительную
инструкцию или ошибку.

**Полный ответ**

`aria-label` задает строку имени напрямую, `aria-labelledby` берет имя из текста других элементов, а `aria-describedby`
добавляет описание после имени. Они не взаимозаменяемы: label отвечает «что это», description — за дополнительную
инструкцию или ошибку.

</td></tr></table>

</details>

<details>
<summary>Для чего нужен <code>aria-hidden</code>?</summary><br>
<table><tr><td>

**Короткий ответ**

aria-hidden="true" скрывает element и его descendants от accessibility tree, не меняя визуальное отображение. Его нельзя
ставить на focusable element или его ancestor: keyboard focus окажется на узле, который screen reader не видит.

**Полный ответ**

`aria-hidden="true"` скрывает element и его descendants от accessibility tree, не меняя визуальное отображение. Его
нельзя ставить на focusable element или его ancestor: keyboard focus окажется на узле, который screen reader не видит.

</td></tr></table>

</details>

<details>
<summary>Что такое live region и <code>role="alert"</code>?</summary><br>
<table><tr><td>

**Короткий ответ**

Live region сообщает assistive technologies о динамических изменениях без перемещения focus. role="alert" подходит для
срочных ошибок и обычно объявляется assertive; обычные статусы лучше сообщать через менее навязчивый role="status".

**Полный ответ**

Live region сообщает assistive technologies о динамических изменениях без перемещения focus. `role="alert"` подходит для
срочных ошибок и обычно объявляется assertive; обычные статусы лучше сообщать через менее навязчивый `role="status"`.

</td></tr></table>

</details>

<details>
<summary>Как сделать доступное modal dialog?</summary><br>
<table><tr><td>

**Короткий ответ**

Нужны понятное имя, modal semantics, начальный focus, ограничение Tab внутри окна, закрытие Escape и возврат focus на
trigger. Native решает часть поведения, но название, содержимое, trigger и тестирование остаются задачей приложения.

**Полный ответ**

Нужны понятное имя, modal semantics, начальный focus, ограничение Tab внутри окна, закрытие Escape и возврат focus на
trigger. Native `<dialog>` решает часть поведения, но название, содержимое, trigger и тестирование остаются задачей
приложения.

</td></tr></table>

</details>

<details>
<summary>Как сделать доступные dropdown и tabs?</summary><br>
<table><tr><td>

**Короткий ответ**

Сначала выбирают правильный паттерн: disclosure, menu, listbox и combobox имеют разное поведение. Tabs используют
tablist, tab, tabpanel, arrow-key navigation и связи через aria-controls/aria-labelledby. Для сложных widgets следуют
WAI-ARIA Authoring Practices и тестируют клавиатурой и screen reader.

**Полный ответ**

Сначала выбирают правильный паттерн: disclosure, menu, listbox и combobox имеют разное поведение. Tabs используют
`tablist`, `tab`, `tabpanel`, arrow-key navigation и связи через `aria-controls`/`aria-labelledby`. Для сложных widgets
следуют WAI-ARIA Authoring Practices и тестируют клавиатурой и screen reader.

</td></tr></table>

</details>

<details>
<summary>Как сделать доступную icon button?</summary><br>
<table><tr><td>

**Короткий ответ**

Используют настоящий button с accessible name, например aria-label="Закрыть"; декоративную SVG внутри скрывают через
aria-hidden="true". Нужны достаточный target size, visible focus и понятные hover/disabled states.

**Полный ответ**

Используют настоящий `button` с accessible name, например `aria-label="Закрыть"`; декоративную SVG внутри скрывают через
`aria-hidden="true"`. Нужны достаточный target size, visible focus и понятные hover/disabled states.

</td></tr></table>

</details>

<details>
<summary>Почему цвет не должен быть единственным способом передачи информации?</summary><br>
<table><tr><td>

**Короткий ответ**

Различие может быть незаметно пользователям с нарушением цветовосприятия или на плохом дисплее. Ошибку, статус или
выбранное состояние дублируют текстом, иконкой, формой или другим независимым признаком и обеспечивают достаточный
contrast.

**Полный ответ**

Различие может быть незаметно пользователям с нарушением цветовосприятия или на плохом дисплее. Ошибку, статус или
выбранное состояние дублируют текстом, иконкой, формой или другим независимым признаком и обеспечивают достаточный
contrast.

</td></tr></table>

</details>

<details>
<summary>Для чего нужен атрибут lang?</summary><br>
<table><tr><td>

**Короткий ответ**

Атрибут lang задает язык документа или отдельного фрагмента текста.

**Полный ответ**

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

**Короткий ответ**

Семантические теги описывают назначение контента: header, nav, main, article, button.

**Полный ответ**

Семантические теги описывают назначение контента: `header`, `nav`, `main`, `article`, `button`.

Они улучшают accessibility, навигацию скринридеров, SEO и читаемость разметки. Семантика не заменяет корректную
структуру заголовков, подписи элементов форм и поддержку клавиатуры.

</td></tr></table>

</details>

### SEO и metadata

<details>
<summary>Зачем нужен <code>meta name="viewport"</code>?</summary><br>
<table><tr><td>

**Короткий ответ**

сопоставляет layout viewport ширине устройства. Без него мобильный браузер может отрендерить страницу в широком
виртуальном viewport и уменьшить ее целиком.

**Полный ответ**

`<meta name="viewport" content="width=device-width, initial-scale=1">` сопоставляет layout viewport ширине устройства.
Без него мобильный браузер может отрендерить страницу в широком виртуальном viewport и уменьшить ее целиком.

</td></tr></table>

</details>

<details>
<summary>Что такое favicon?</summary><br>
<table><tr><td>

**Короткий ответ**

Favicon — набор иконок сайта для вкладок, bookmarks, history и устройств. Его подключают через , а форматы и размеры
выбирают с учетом целевых браузеров и manifest приложения.

**Полный ответ**

Favicon — набор иконок сайта для вкладок, bookmarks, history и устройств. Его подключают через `<link rel="icon">`, а
форматы и размеры выбирают с учетом целевых браузеров и manifest приложения.

</td></tr></table>

</details>

<details>
<summary>Что такое canonical URL?</summary><br>
<table><tr><td>

**Короткий ответ**

указывает предпочтительный URL для страниц с одинаковым или очень похожим content. Это сигнал поисковой системе против
дублирования, а не redirect и не механизм безопасности.

**Полный ответ**

`<link rel="canonical" href="…">` указывает предпочтительный URL для страниц с одинаковым или очень похожим content. Это
сигнал поисковой системе против дублирования, а не redirect и не механизм безопасности.

</td></tr></table>

</details>

<details>
<summary>Для чего нужны <code>title</code> и meta description?</summary><br>
<table><tr><td>

**Короткий ответ**

title задает название документа во вкладке и часто заголовок поискового результата. Meta description кратко описывает
страницу и может использоваться как snippet. Они должны быть уникальными и соответствовать реальному содержимому.

**Полный ответ**

`title` задает название документа во вкладке и часто заголовок поискового результата. Meta description кратко описывает
страницу и может использоваться как snippet. Они должны быть уникальными и соответствовать реальному содержимому.

</td></tr></table>

</details>

<details>
<summary>Какие HTML-теги важны для поисковых систем?</summary><br>
<table><tr><td>

**Короткий ответ**

Важны содержательные title, headings, links с понятным текстом, semantic landmarks, img alt, canonical и metadata.
Семантика помогает понять структуру, но не компенсирует слабый content, закрытую индексацию или плохую доступность.

**Полный ответ**

Важны содержательные `title`, headings, links с понятным текстом, semantic landmarks, `img alt`, canonical и metadata.
Семантика помогает понять структуру, но не компенсирует слабый content, закрытую индексацию или плохую доступность.

</td></tr></table>

</details>

<details>
<summary>Какие SEO-практики важны для frontend-разработчика?</summary><br>
<table><tr><td>

**Короткий ответ**

Frontend-разработчик отвечает за содержательный HTML, корректные title и metadata, canonical URL, semantic headings,
понятные links, alt у значимых изображений, robots rules и скорость first render. Для SPA важно, чтобы crawler получил
контент через SSR, prerender или другой поддерживаемый rendering strategy. SEO не заменяет качество контента и не должно
ломать accessibility.

**Полный ответ**

Frontend-разработчик отвечает за содержательный HTML, корректные `title` и metadata, canonical URL, semantic headings,
понятные links, `alt` у значимых изображений, robots rules и скорость first render. Для SPA важно, чтобы crawler получил
контент через SSR, prerender или другой поддерживаемый rendering strategy. SEO не заменяет качество контента и не должно
ломать accessibility.

</td></tr></table>

</details>

<details>
<summary>Как правильно использовать заголовки <code>h1</code>–<code>h6</code>?</summary><br>
<table><tr><td>

**Короткий ответ**

Заголовки создают иерархию, а не выбираются ради размера шрифта. Обычно у страницы один основной h1, затем уровни идут
последовательно по структуре. Несколько h1 технически допустимы, но один главный заголовок обычно понятнее пользователям
и инструментам.

**Полный ответ**

Заголовки создают иерархию, а не выбираются ради размера шрифта. Обычно у страницы один основной `h1`, затем уровни идут
последовательно по структуре. Несколько `h1` технически допустимы, но один главный заголовок обычно понятнее
пользователям и инструментам.

</td></tr></table>

</details>

<details>
<summary>Что такое Open Graph?</summary><br>
<table><tr><td>

**Короткий ответ**

Open Graph metadata задает title, description, image и URL для preview при публикации ссылки в социальных сетях и
мессенджерах. Это не замена обычным HTML metadata; изображения должны иметь доступный URL и подходящие размеры.

**Полный ответ**

Open Graph metadata задает title, description, image и URL для preview при публикации ссылки в социальных сетях и
мессенджерах. Это не замена обычным HTML metadata; изображения должны иметь доступный URL и подходящие размеры.

</td></tr></table>

</details>

<details>
<summary>Как SSR влияет на SEO?</summary><br>
<table><tr><td>

**Короткий ответ**

SSR или prerender отдает содержательный HTML раньше JavaScript, упрощая индексацию и previews. Современные crawlers
могут выполнять JavaScript, но это требует времени и ресурсов; SPA без server-rendered content также хуже работает у
ботов без полного rendering support.

**Полный ответ**

SSR или prerender отдает содержательный HTML раньше JavaScript, упрощая индексацию и previews. Современные crawlers
могут выполнять JavaScript, но это требует времени и ресурсов; SPA без server-rendered content также хуже работает у
ботов без полного rendering support.

</td></tr></table>

</details>

### SVG и media

<details>
<summary>Чем JPEG, PNG, WebP, AVIF и SVG отличаются друг от друга?</summary><br>
<table><tr><td>

**Короткий ответ**

JPEG подходит для фотографий без прозрачности, PNG — для lossless-графики и прозрачности, WebP и AVIF дают более
современное сжатие, SVG — векторную графику. Формат выбирают по типу изображения, качеству, размеру, transparency,
animation и browser support.

**Полный ответ**

JPEG подходит для фотографий без прозрачности, PNG — для lossless-графики и прозрачности, WebP и AVIF дают более
современное сжатие, SVG — векторную графику. Формат выбирают по типу изображения, качеству, размеру, transparency,
animation и browser support.

</td></tr></table>

</details>

<details>
<summary>Когда использовать SVG, а когда raster image?</summary><br>
<table><tr><td>

**Короткий ответ**

SVG подходит для иконок, схем и простой графики, которая должна масштабироваться и стилизоваться. Для фотографий и
сложных текстур raster format обычно компактнее и быстрее. Очень сложный SVG тоже может быть тяжелым для rendering.

**Полный ответ**

SVG подходит для иконок, схем и простой графики, которая должна масштабироваться и стилизоваться. Для фотографий и
сложных текстур raster format обычно компактнее и быстрее. Очень сложный SVG тоже может быть тяжелым для rendering.

</td></tr></table>

</details>

<details>
<summary>Что такое responsive images и как работают <code>srcset</code>/<code>sizes</code>?</summary><br>
<table><tr><td>

**Короткий ответ**

srcset перечисляет image candidates по ширине или density, а sizes сообщает ожидаемый layout size. Браузер выбирает
ресурс с учетом viewport, DPR, доступной ширины и других факторов, не загружая все варианты.

**Полный ответ**

`srcset` перечисляет image candidates по ширине или density, а `sizes` сообщает ожидаемый layout size. Браузер выбирает
ресурс с учетом viewport, DPR, доступной ширины и других факторов, не загружая все варианты.

На уровне командных guidelines стоит договориться, когда использовать `srcset`, `sizes`, `picture`, lazy loading и
отдельные форматы. Responsive images нужны не ради синтаксиса, а чтобы мобильный пользователь не скачивал тяжелую
desktop-картинку и не платил за это LCP, трафиком и battery usage.

</td></tr></table>

</details>

<details>
<summary>Что делает <code>loading="lazy"</code>?</summary><br>
<table><tr><td>

**Короткий ответ**

Атрибут откладывает загрузку изображения или iframe, пока ресурс не приблизится к viewport. Это экономит сеть, но его не
ставят на вероятный LCP image. width и height задают заранее, чтобы сохранить место и избежать CLS.

**Полный ответ**

Атрибут откладывает загрузку изображения или iframe, пока ресурс не приблизится к viewport. Это экономит сеть, но его не
ставят на вероятный LCP image. `width` и `height` задают заранее, чтобы сохранить место и избежать CLS.

</td></tr></table>

</details>

<details>
<summary>Что такое <code>alt</code> и когда он должен быть пустым?</summary><br>
<table><tr><td>

**Короткий ответ**

alt передает текстовую альтернативу смыслового изображения. У декоративного изображения используют alt="", чтобы screen
reader его пропустил. Alt описывает назначение изображения в контексте, а не обязательно все визуальные детали.

**Полный ответ**

`alt` передает текстовую альтернативу смыслового изображения. У декоративного изображения используют `alt=""`, чтобы
screen reader его пропустил. Alt описывает назначение изображения в контексте, а не обязательно все визуальные детали.

</td></tr></table>

</details>

<details>
<summary>Для чего нужен элемент <code>picture</code>?</summary><br>
<table><tr><td>

**Короткий ответ**

picture позволяет задавать source для разных media conditions, crops и formats, сохраняя fallback img. Его используют
для art direction или выбора формата; обычное изменение resolution часто достаточно решить через srcset.

**Полный ответ**

`picture` позволяет задавать `source` для разных media conditions, crops и formats, сохраняя fallback `img`. Его
используют для art direction или выбора формата; обычное изменение resolution часто достаточно решить через `srcset`.

</td></tr></table>

</details>

<details>
<summary>Что такое SVG?</summary><br>
<table><tr><td>

**Короткий ответ**

SVG — векторный формат изображения, который описывает картинку через XML-разметку: линии, пути, фигуры, градиенты и
текст. В отличие от PNG и JPEG, SVG масштабируется без потери качества: браузер пересчитывает геометрию, а не
растягивает пиксели.

**Полный ответ**

SVG — векторный формат изображения, который описывает картинку через XML-разметку: линии, пути, фигуры, градиенты и
текст. В отличие от PNG и JPEG, SVG масштабируется без потери качества: браузер пересчитывает геометрию, а не
растягивает пиксели.

</td></tr></table>

</details>

<details>
<summary>Почему SVG подходит для scalable icons?</summary><br>
<table><tr><td>

**Короткий ответ**

SVG-иконка остается четкой при разных размерах и плотностях экрана. Один файл можно использовать в размерах 16px, 24px,
48px и на Retina-дисплеях без отдельного набора изображений.

**Полный ответ**

SVG-иконка остается четкой при разных размерах и плотностях экрана. Один файл можно использовать в размерах `16px`,
`24px`, `48px` и на Retina-дисплеях без отдельного набора изображений.

</td></tr></table>

</details>

<details>
<summary>Как сделать SVG-иконку масштабируемой?</summary><br>
<table><tr><td>

**Короткий ответ**

Нужно задать viewBox и управлять внешними width и height атрибутами или через CSS:

**Полный ответ**

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

**Короткий ответ**

viewBox задает координатную область SVG. Например, viewBox="0 0 24 24" означает виртуальную область шириной и высотой 24
единицы. По ней браузер масштабирует содержимое SVG под внешний размер.

**Полный ответ**

`viewBox` задает координатную область SVG. Например, `viewBox="0 0 24 24"` означает виртуальную область шириной и
высотой 24 единицы. По ней браузер масштабирует содержимое SVG под внешний размер.

</td></tr></table>

</details>

<details>
<summary>Чем <code>width</code>/<code>height</code> отличаются от <code>viewBox</code>?</summary><br>
<table><tr><td>

**Короткий ответ**

width и height задают внешний размер SVG на странице, а viewBox — внутреннюю координатную систему. При наличии viewBox
внешний размер можно менять через CSS, сохраняя пропорции изображения.

**Полный ответ**

`width` и `height` задают внешний размер SVG на странице, а `viewBox` — внутреннюю координатную систему. При наличии
`viewBox` внешний размер можно менять через CSS, сохраняя пропорции изображения.

</td></tr></table>

</details>

<details>
<summary>Как менять цвет SVG-иконки через CSS?</summary><br>
<table><tr><td>

**Короткий ответ**

Значение currentColor позволяет иконке наследовать CSS-свойство color родителя:

**Полный ответ**

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

**Короткий ответ**

Inline SVG удобен для управления цветом, состояниями и доступностью через CSS. SVG sprite подходит для переиспользования
большого набора символов. проще и хорошо кешируется, но не позволяет странице напрямую менять стили внутренних элементов
SVG.

**Полный ответ**

Inline SVG удобен для управления цветом, состояниями и доступностью через CSS. SVG sprite подходит для переиспользования
большого набора символов. `<img src="icon.svg">` проще и хорошо кешируется, но не позволяет странице напрямую менять
стили внутренних элементов SVG.

Команда должна заранее договориться, где живут иконки, кто отвечает за оптимизацию, как задаются имена и как
обрабатываются декоративные и смысловые icons. SVG обычно предпочтительнее icon font, потому что лучше контролирует
accessibility, цвет, размер и не зависит от font loading.

</td></tr></table>

</details>

<details>
<summary>Какие проблемы появляются при локализации frontend-приложения?</summary><br>
<table><tr><td>

**Короткий ответ**

Локализация влияет не только на перевод строк. Нужно учитывать длину текста, pluralization, даты, числа, валюты,
сортировку, переносы, шрифты, SEO, accessibility и направление LTR/RTL. Если компоненты не проверять на разных locale,
интерфейс может сломаться из-за длинных labels или другого порядка слов.

**Полный ответ**

Локализация влияет не только на перевод строк. Нужно учитывать длину текста, pluralization, даты, числа, валюты,
сортировку, переносы, шрифты, SEO, accessibility и направление LTR/RTL. Если компоненты не проверять на разных locale,
интерфейс может сломаться из-за длинных labels или другого порядка слов.

</td></tr></table>

</details>

<details>
<summary>Как сделать SVG-иконку доступной?</summary><br>
<table><tr><td>

**Короткий ответ**

Декоративную иконку нужно скрыть от accessibility tree:

**Полный ответ**

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

**Короткий ответ**

Забывают viewBox. - Жестко задают размеры и затрудняют масштабирование. - Не используют currentColor, когда цвет должен
наследоваться. - Подключают тяжелые SVG без оптимизации. - Не учитывают accessibility. - Оставляют лишние metadata из
Figma и других редакторов.

**Полный ответ**

- Забывают `viewBox`.
- Жестко задают размеры и затрудняют масштабирование.
- Не используют `currentColor`, когда цвет должен наследоваться.
- Подключают тяжелые SVG без оптимизации.
- Не учитывают accessibility.
- Оставляют лишние metadata из Figma и других редакторов.

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
