# HTML — вопросы и ответы, часть 1

> Автоматически сгенерировано из src/pages/html/index.md. Не редактируйте вручную.

## HTML

### HTML



#### Вопрос: Что такое HTML и какую задачу он решает?

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





#### Вопрос: Что такое HTML attribute?

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





#### Вопрос: Что такое semantic HTML?

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





#### Вопрос: Что такое document outline?

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





#### Вопрос: Что такое doctype и зачем он нужен?

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





#### Вопрос: Что такое custom elements?

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





#### Вопрос: Чем tag отличается от HTML element?

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





#### Вопрос: Чем block element отличается от inline element?

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





#### Вопрос: Зачем команде договариваться об HTML principles?

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





#### Вопрос: Чем section, article, main, aside и nav отличаются друг от друга?

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





#### Вопрос: Когда использовать button, а когда a?

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





#### Вопрос: Когда команда может использовать HTML preprocessor или template engine?

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





#### Вопрос: Как backend или CMS может влиять на frontend markup?

**Короткий ответ**

Backend или CMS могут добавлять wrappers, ids, classes, служебные attributes и готовые HTML-фрагменты. Эти соглашения
нужно учитывать, чтобы не сломать CSS, accessibility, analytics и автотесты. Хороший ответ включает мысль, что такие
контракты лучше документировать, а не выяснять по случайным DOM-структурам в production.

**Полный ответ**

Backend или CMS могут добавлять wrappers, ids, classes, служебные attributes и готовые HTML-фрагменты. Эти соглашения
нужно учитывать, чтобы не сломать CSS, accessibility, analytics и автотесты. Хороший ответ включает мысль, что такие
контракты лучше документировать, а не выяснять по случайным DOM-структурам в production.





#### Вопрос: Как договориться о комментариях в HTML?

**Короткий ответ**

HTML-комментарии стоит оставлять только для неочевидной структуры, интеграционного ограничения или временного
workaround. Они не должны пересказывать obvious markup. В Angular чаще лучше помогают понятные имена компонентов, inputs
и template blocks, а большой комментарий в template может быть сигналом, что код стоит упростить.

**Полный ответ**

HTML-комментарии стоит оставлять только для неочевидной структуры, интеграционного ограничения или временного
workaround. Они не должны пересказывать obvious markup. В Angular чаще лучше помогают понятные имена компонентов, inputs
и template blocks, а большой комментарий в template может быть сигналом, что код стоит упростить.





#### Вопрос: Что делает атрибут lang?

**Короткий ответ**

lang задает язык документа или фрагмента. Он помогает screen reader выбрать произношение, браузеру — проверку орфографии
и переносы, а поисковым системам — интерпретировать содержимое.

**Полный ответ**

`lang` задает язык документа или фрагмента. Он помогает screen reader выбрать произношение, браузеру — проверку
орфографии и переносы, а поисковым системам — интерпретировать содержимое.





#### Вопрос: Для чего нужны data-* attributes?

**Короткий ответ**

Они хранят небольшие пользовательские данные прямо на element и доступны через dataset. Их используют для связи разметки
с поведением или тестами, но не как замену application state и не для секретных данных.

**Полный ответ**

Они хранят небольшие пользовательские данные прямо на element и доступны через `dataset`. Их используют для связи
разметки с поведением или тестами, но не как замену application state и не для секретных данных.





#### Вопрос: Из каких частей состоит HTML5 как open web platform?

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





#### Вопрос: Чем cookie отличается от sessionStorage и localStorage?

**Короткий ответ**

Cookie может автоматически отправляться с HTTP-запросами и иметь флаги HttpOnly, Secure, SameSite. localStorage и
sessionStorage доступны JavaScript, привязаны к origin и не отправляются автоматически; sessionStorage живет в рамках
вкладки, localStorage сохраняется дольше. Секретные tokens опасно хранить в Web Storage из-за XSS.

**Полный ответ**

Cookie может автоматически отправляться с HTTP-запросами и иметь флаги `HttpOnly`, `Secure`, `SameSite`. `localStorage`
и `sessionStorage` доступны JavaScript, привязаны к origin и не отправляются автоматически; `sessionStorage` живет в
рамках вкладки, `localStorage` сохраняется дольше. Секретные tokens опасно хранить в Web Storage из-за XSS.





#### Вопрос: Чем script, script async и script defer отличаются?

**Короткий ответ**

Обычный script блокирует HTML parsing до загрузки и выполнения. async загружается параллельно и выполняется сразу после
загрузки, поэтому порядок между async scripts не гарантирован. defer загружается параллельно, выполняется после parsing
в порядке объявления и обычно лучше подходит для application bundle.

**Полный ответ**

Обычный `script` блокирует HTML parsing до загрузки и выполнения. `async` загружается параллельно и выполняется сразу
после загрузки, поэтому порядок между async scripts не гарантирован. `defer` загружается параллельно, выполняется после
parsing в порядке объявления и обычно лучше подходит для application bundle.





#### Вопрос: Почему clickable div — плохая практика?

**Короткий ответ**

div не получает focus, keyboard activation, role и accessible name интерактивного элемента автоматически. Их ручная
имитация сложна и хрупка. Для действий следует использовать button, для переходов — a.

**Полный ответ**

`div` не получает focus, keyboard activation, role и accessible name интерактивного элемента автоматически. Их ручная
имитация сложна и хрупка. Для действий следует использовать `button`, для переходов — `a`.
