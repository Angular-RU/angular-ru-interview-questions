# HTML — вопросы и ответы, часть 3

> Автоматически сгенерировано из src/pages/html/index.md. Не редактируйте вручную.

### Accessibility



#### Вопрос: Что такое accessibility и WCAG?

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





#### Вопрос: Что такое keyboard navigation и visible focus?

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





#### Вопрос: Что такое focus management и focus trap?

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





#### Вопрос: Что такое screen reader?

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





#### Вопрос: Что такое ARIA и когда ее использовать?

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





#### Вопрос: Как ARIA и screen reader связаны с accessibility?

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





#### Вопрос: Как сделать страницу доступнее без JavaScript?

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





#### Вопрос: Зачем команде accessibility checklist?

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





#### Вопрос: Какие accessibility tools стоит использовать во frontend workflow?

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





#### Вопрос: Почему accessibility нельзя полностью проверить автоматическими тестами?

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





#### Вопрос: Что такое accessible name и как кнопка его получает?

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





#### Вопрос: Чем aria-label, aria-labelledby и aria-describedby отличаются?

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





#### Вопрос: Для чего нужен aria-hidden?

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





#### Вопрос: Что такое live region и role="alert"?

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





#### Вопрос: Как сделать доступное modal dialog?

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





#### Вопрос: Как сделать доступные dropdown и tabs?

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





#### Вопрос: Как сделать доступную icon button?

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





#### Вопрос: Почему цвет не должен быть единственным способом передачи информации?

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





#### Вопрос: Для чего нужен атрибут lang?

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





#### Вопрос: Для чего нужны семантические HTML-теги?

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
