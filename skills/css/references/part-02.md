# CSS — вопросы и ответы, часть 2

> Автоматически сгенерировано из src/pages/css/index.md. Не редактируйте вручную.

#### Вопрос: Что такое overflow?

**Короткий ответ**

Overflow описывает поведение содержимого, выходящего за padding box. Он может обрезать содержимое или создать scroll
container. Это влияет на sticky positioning, доступность скрытого контента и layout.

**Полный ответ**

Overflow описывает, что происходит с содержимым, которое выходит за box в inline/block axis. Управление задается через
`overflow`, `overflow-x`/`overflow-y` и logical variants.

Initial value — `visible`: overflow может рисоваться за box, и сам box не становится scroll container.

```css
.code {
  overflow-x: auto;
}
```

В таком случае horizontal overflow можно прокрутить, не ломая ширину layout.

`hidden`, `auto` и `scroll` относятся к scrollable overflow values и создают scroll container. Для block box они также
устанавливают independent formatting context. `clip`, в отличие от `hidden`, не создает scroll container и не дает
программно прокручивать clipped content.

Overflow влияет не только на scrollbar:

- может обрезать shadows, focus rings и positioned descendants;
- меняет ближайший scroll container, что важно для `position: sticky`;
- влияет на scroll APIs и переход к focused descendant;
- может скрыть важный content от пользователя, если UI не дает способа его увидеть.

Отдельный edge case — axes взаимодействуют: если одна ось использует scrollable value, `visible`/`clip` другой оси могут
вычисляться иначе, чем ожидается. Поэтому `overflow-x: hidden; overflow-y: visible` не всегда означает независимые
behaviors.

Для длинного текста overflow часто не нужно скрывать: лучше сначала проверить `overflow-wrap`, `word-break`, intrinsic
sizing и `min-width: 0` во Flex/Grid.

На интервью: **overflow — это clipping + scroll-container semantics + влияние на formatting/sticky, а не просто
«показать scrollbar»**.





#### Вопрос: Чем отличаются overflow: hidden, auto, scroll и clip?

**Короткий ответ**

`hidden` обрезает content, но оставляет программную прокрутку и scroll-container semantics. `auto` дает scrolling UI при
необходимости, `scroll` запрашивает его всегда, `clip` обрезает без scroll container и запрещает scrolling. `clip` сам
по себе не создает formatting context.

**Полный ответ**

Все четыре значения работают с overflow по-разному.

**`hidden`** — content обрезается по padding box, пользовательский scrolling UI не показывается, но box остается scroll
container и его можно прокрутить программно:

```js
container.scrollTo({left: 100});
```

То есть `hidden` не означает «прокрутки не существует».

**`auto`** — box становится scroll container; scrolling UI появляется, когда есть scrollable overflow и platform
действительно показывает scrollbars.

**`scroll`** — тоже scroll container, но UA должен предоставлять scrolling mechanism даже когда overflow отсутствует. На
системах с overlay scrollbars это не обязательно означает постоянно занятую полосу layout.

**`clip`** — content обрезается по overflow clip edge, но box **не** становится scroll container и не поддерживает
programmatic scrolling. В отличие от `hidden`, сам `clip` не создает новый formatting context. Если нужны и clipping, и
formatting boundary:

```css
.box {
  overflow: clip;
  display: flow-root;
}
```

Практический выбор:

- scrollable panel/code/table — обычно `auto`;
- намеренно скрытая область, которую code может прокручивать — иногда `hidden`;
- жесткое clipping без scroll semantics — `clip`;
- `scroll` полезен, когда стабильное наличие scrolling mechanism важнее появления по необходимости; для layout stability
  также существует `scrollbar-gutter`.

Нельзя скрывать overflow только ради визуальной чистоты, если так пользователь теряет focusable или значимый content.

На интервью особенно важно различить **`hidden` vs `clip`: первый остается scroll container, второй запрещает scrolling
полностью**.





#### Вопрос: Что такое scroll-snap?

**Короткий ответ**

Scroll Snap позволяет контейнеру после прокрутки остановиться у заданных snap positions. Контейнер задает ось и
строгость, элементы — точки выравнивания. Это CSS-enhancement, а не замена доступной навигации carousel.

**Полный ответ**

CSS Scroll Snap позволяет scroll container после прокрутки выравниваться по заранее определенным snap positions вместо
остановки в произвольной точке.

Контейнер задает ось и строгость snapping:

```css
.carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x proximity;
}
```

А children объявляют, как их snap area должна выравниваться со snapport контейнера:

```css
.slide {
  flex: 0 0 80%;
  scroll-snap-align: start;
}
```

Важно различать два понятия:

- `scroll-snap-type` — включает snapping на container и выбирает axis/strictness;
- `scroll-snap-align` — задает snap position для item.

`proximity` оставляет browser больше свободы и обычно ощущается как enhancement обычной прокрутки. `mandatory` требует
завершать scroll на допустимой snap position, поэтому может быть слишком агрессивным для длинного или неоднородного
content.

На фактическую точку выравнивания также влияют `scroll-padding` и `scroll-margin`:

```css
.carousel {
  scroll-padding-inline: 1rem;
}

.slide {
  scroll-margin-inline: 0.5rem;
}
```

Это особенно полезно, если начало content не должно прилипать прямо к edge scrollport или сверху есть sticky header.

Scroll Snap применяется и к programmatic scrolling: browser выбирает итоговую snap position после поддерживаемой
операции прокрутки. Поэтому JavaScript-карусель не должна одновременно вручную «дотягивать» scroll и конкурировать с CSS
snapping без необходимости.

На интервью: **Scroll Snap описывает допустимые позиции завершения прокрутки; container управляет axis/strictness, items
— alignment, а `scroll-padding`/`scroll-margin` корректируют геометрию snapping**.





#### Вопрос: Когда стоит использовать scroll-snap?

**Короткий ответ**

Для горизонтальных галерей, paged sections и сценариев, где остановка на целом элементе ожидаема пользователем. Нужно
оставить обычную прокрутку и элементы управления. Для длинного читаемого контента mandatory snapping часто мешает.

**Полный ответ**

Scroll Snap полезен, когда content естественно состоит из дискретных visual units и пользователю ожидаемо
останавливаться на границе одного из них.

Хорошие сценарии:

- горизонтальная gallery/carousel;
- список карточек, где следующий item должен аккуратно входить в viewport;
- paged onboarding;
- короткие полноэкранные sections, если такой interaction действительно соответствует продукту.

Например:

```css
.gallery {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: min(80%, 24rem);
  overflow-x: auto;
  gap: 1rem;
  scroll-snap-type: inline proximity;
}

.gallery > * {
  scroll-snap-align: start;
}
```

Здесь `proximity` улучшает обычную horizontal scroll, но не заставляет пользователя обязательно перескакивать на
соседнюю карточку.

`mandatory` оправдан, когда каждая snap area действительно является отдельной page/state и промежуточное положение не
имеет пользы. Oversized snap area сама по себе обрабатывается UA: пока area полностью покрывает snapport, пользователь
может свободно прокручивать внутри нее. Риск возникает, если mandatory snap positions привязаны к далеко разнесенным
elements, например только к headings: content между snap areas может стать недоступным.

CSS snapping не заменяет controls и semantics carousel. Если пользователю нужны «назад/вперед», индикатор текущего
slide, keyboard navigation или announcement для assistive technologies, это отдельные interaction/accessibility задачи.

Также полезно сохранять базовую прокрутку рабочей без snapping: Scroll Snap должен улучшать layout, а не быть
единственным способом добраться до content.

На интервью: **использовать snap там, где UX уже дискретный по своей природе; для обычной ленты чаще начинать с
`proximity`, а не превращать каждую прокрутку в mandatory paging**.





#### Вопрос: Какие проблемы бывают у scroll-snap на мобильных устройствах?

**Короткий ответ**

Слишком строгий snap может бороться с жестом пользователя, затруднять диагональную прокрутку и перескакивать после
изменения размера контента. Safe areas и browser chrome меняют viewport. Поведение нужно проверять на touch devices и с
увеличенным шрифтом.

**Полный ответ**

На touch devices Scroll Snap взаимодействует не с отдельным mouse wheel tick, а с gesture, momentum scrolling, nested
scroll containers и меняющейся геометрией viewport/content. Поэтому слишком строгий snapping быстро становится заметным.

Типичный проблемный сценарий — horizontal carousel внутри вертикальной страницы:

```css
.carousel {
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}
```

Пользователь начинает диагональный gesture, browser выбирает scroll axis, а mandatory snap после momentum может увести
carousel дальше, чем ожидалось. Поэтому `proximity` часто дает более естественный результат.

Еще несколько edge cases:

- после lazy-loading image или изменения размера item browser может пересчитать snap positions и повторно выровнять
  container;
- sticky controls/header могут перекрыть snapped content — помогает `scroll-padding`;
- nested scroll containers усложняют понимание, какой container должен получить gesture;
- очень широкие/высокие snap areas плохо сочетаются с `mandatory`, потому что пользователь хочет читать content внутри
  item, а не постоянно возвращаться к его boundary;
- zoom, увеличенный text и orientation change меняют размеры карточек и доступные snap positions.

Не стоит блокировать native scrolling JavaScript-обработчиками `touchmove` только ради более «идеального» carousel. Это
легко ухудшает responsiveness и accessibility.

Проверять нужно не только эмуляцию desktop DevTools, но и реальные touch interactions: медленный drag, быстрый fling,
изменение orientation, zoom/text scaling и navigation controls.

На интервью: **главный trade-off Scroll Snap на mobile — баланс между предсказуемым alignment и сохранением контроля
пользователя над native scrolling**.





#### Вопрос: Что такое containing block?

**Короткий ответ**

Containing block — прямоугольник, относительно которого вычисляются position и percentage sizes элемента. Его источник
зависит от position, formatting context и properties ancestors; для absolute element это не всегда непосредственный
родитель.

**Полный ответ**

Containing block — reference rectangle, относительно которого CSS вычисляет геометрию некоторых descendants: percentage
sizes и inset coordinates positioned elements.

Это не обязательно непосредственный DOM parent.

Для обычного in-flow block percentage width обычно связан с containing block, сформированным content box его block
container:

```css
.parent {
  width: 600px;
}

.child {
  width: 50%;
}
```

`child` получает reference size из containing block и в простом случае становится `300px` шириной.

Для `position: absolute` containing block часто создается ближайшим ancestor, который устанавливает absolute-positioning
containing block. Классический пример:

```css
.card {
  position: relative;
}

.badge {
  position: absolute;
  inset-block-start: 0;
  inset-inline-end: 0;
}
```

`.card` здесь становится reference для offsets `.badge`.

Но правило «absolute всегда относительно ближайшего `position: relative`» — только удобное упрощение. Containing block
могут устанавливать и другие свойства/механизмы, например transforms или containment. Поэтому при странном positioning
нужно искать не просто DOM parent, а ancestor, который реально establishes containing block.

`position: fixed` обычно позиционируется относительно viewport/initial containing block, но некоторые ancestors,
например с transform, способны создать для fixed descendant другой containing block. Это объясняет распространенный баг
«fixed внезапно прокручивается вместе с component».

Containing block связан с sizing, а не со stacking order: его не нужно путать со stacking context. Один ancestor может
создавать оба механизма, но это разные обязанности CSS.

На интервью: **containing block — геометрическая система координат для sizing/positioning; конкретный ancestor зависит
от positioning scheme и properties, а не только от DOM hierarchy**.





#### Вопрос: Что такое float и почему сейчас его редко используют для layout?

**Короткий ответ**

float изначально нужен для обтекания изображений и вставок текстом. Раньше на нем строили колонки, но это требовало
clearfix, ломало высоты контейнеров и плохо выражало намерение layout. Для современной раскладки обычно выбирают Flexbox
или Grid, а float оставляют для настоящего text wrapping.

**Полный ответ**

`float` перемещает box к inline-start/inline-end стороне container, позволяя последующему inline content обтекать его.
Именно text wrapping вокруг media — исходный и до сих пор хороший use case.

```html
<article>
  <img
    class="photo"
    alt="..."
  />
  <p>Длинный текст статьи...</p>
</article>
```

```css
.photo {
  float: inline-start;
  inline-size: 10rem;
  margin-inline-end: 1rem;
}
```

Текстовые line boxes адаптируются вокруг float — это поведение сложно и бессмысленно воспроизводить Flexbox/Grid, потому
что здесь float выражает именно semantics layout.

Исторически floats использовали для колонок:

```css
.sidebar {
  float: left;
  width: 30%;
}

.content {
  float: left;
  width: 70%;
}
```

Но это был workaround до появления layout systems. Возникали проблемы:

- parent мог не расширяться визуально под floating children;
- требовались clearfix/`clear` hacks;
- vertical alignment и equal-height columns были неудобны;
- source order и wrapping влияли на layout неочевидно;
- responsive перестройка требовала больше специальных правил.

Flexbox и Grid напрямую моделируют rows/columns, alignment, gap, flexible sizing и order constraints, поэтому для
application layout они почти всегда выразительнее.

Важно не говорить, что float «устарел». Устарело использование float как универсальной grid system; для обтекания
editorial content это по-прежнему подходящий CSS primitive.

На интервью: **float нужен для flow-around-content; Flexbox/Grid вытеснили его из общего page layout, потому что
моделируют layout intent напрямую и не требуют clearing hacks**.





#### Вопрос: Какие способы clearing существуют и когда они нужны?

**Короткий ответ**

Clearing нужен, когда контейнер должен учитывать плавающие элементы. Исторически использовали clear: both и clearfix
через pseudo-element; современный простой вариант — создать BFC через display: flow-root. Лучше сначала проверить, нужен
ли float вообще, потому что Flexbox и Grid обычно снимают эту проблему.

**Полный ответ**

Clearing решает две связанные исторические задачи: остановить обтекание конкретного float и заставить container
корректно охватывать floating descendants.

Property `clear` применяется к следующему box:

```css
.footer {
  clear: both;
}
```

Так block начинает располагаться ниже соответствующих floats вместо обтекания рядом с ними.

Для container с floating children долго использовали clearfix:

```css
.container::after {
  content: '';
  display: table;
  clear: both;
}
```

Pseudo-element после floats заставляет parent layout учитывать нужную высоту. Это важно знать при поддержке legacy CSS,
но в новом коде обычно есть более прямой способ.

Современный вариант — явно создать block formatting context:

```css
.container {
  display: flow-root;
}
```

`flow-root` описывает намерение «этот element является root нового block formatting context» без искусственного
pseudo-element и без clipping side effects `overflow: hidden`.

`overflow: hidden/auto` исторически тоже использовали как clearfix, потому что они могут создать новый formatting
context, но это связывает две независимые задачи: float containment и overflow behavior. Если content должен выходить за
bounds, такой hack ломает интерфейс.

Если clearing понадобился только потому, что floats используются для columns/cards, лучший fix часто не clearfix, а
миграция layout на Flexbox/Grid. Но если float реально нужен для editorial wrapping, `clear` и `flow-root` остаются
корректными инструментами.

На интервью: **`clear` управляет отношением следующего box к float, clearfix — legacy pattern, `flow-root` — современная
явная boundary для float containment**.





#### Вопрос: Как решать browser-specific CSS issues?

**Короткий ответ**

Сначала нужно воспроизвести проблему в конкретном браузере, проверить поддержку свойства, cascade, computed styles и
минимальный пример. Затем выбирают feature detection через @supports, progressive enhancement, fallback или ограниченный
workaround. User agent sniffing оставляют как последний вариант для документированного browser bug.

**Полный ответ**

Начинать нужно не с browser hack, а с классификации проблемы: unsupported feature, различие defaults, ошибка
собственного cascade/layout или реальный browser bug.

Практический порядок:

1. воспроизвести проблему в минимальном example;
2. проверить computed styles и layout в DevTools;
3. сверить поддержку конкретного property/value/selector;
4. понять, можно ли дать рабочий baseline без новой возможности;
5. добавить enhancement через normal cascade или `@supports`;
6. только для подтвержденного engine bug использовать локальный документированный workaround.

CSS уже умеет graceful fallback через invalid-at-parse-time declarations:

```css
.card {
  width: 100%;
  width: min(100%, 40rem);
}
```

Browser, который не понимает второе value, игнорирует declaration и сохраняет первое.

Когда enhancement состоит из группы связанных rules, подходит feature query:

```css
.layout {
  display: block;
}

@supports (display: grid) {
  .layout {
    display: grid;
    grid-template-columns: 16rem 1fr;
  }
}
```

`@supports` проверяет, принимает ли implementation запрошенную syntax/property-value (а в modern syntax может проверять
selector support), но это не доказательство отсутствия behavioral bugs. Поэтому feature detection не отменяет testing.

User-agent sniffing и browser-specific selectors/hacks хрупки: version string меняется, workaround переживает исходный
bug и начинает ломать будущие engines. Если без него нельзя, scope должен быть минимальным, с comment/link на bug и
условием удаления.

Также vendor prefixes лучше получать из toolchain/browser-support policy, а не писать вручную по памяти.

На интервью: **progressive enhancement и feature detection — default strategy; browser sniffing допустим только как
последний локальный workaround для подтвержденного engine bug**.





#### Вопрос: Что такое feature-constrained browser?

**Короткий ответ**

Это не стандартный CSS-термин. Обычно так называют browser/WebView с ограниченной поддержкой нужных platform features.
Базовый UI должен оставаться рабочим, а новые возможности добавляются через progressive enhancement и feature detection.
Слабое устройство само по себе — performance constraint, а не feature support.

**Полный ответ**

`feature-constrained browser` — не формальный термин CSS specification. В практическом разговоре так можно назвать
browser/WebView, который не поддерживает часть возможностей, на которые рассчитывает современный application.

Причины могут быть разными:

- старый engine в корпоративной среде;
- embedded WebView, обновляемый отдельно от system browser;
- kiosk/TV/in-app browser с ограниченным engine;
- target environment, где конкретное CSS/API feature отключено или еще не реализовано.

Важно отделять **feature support** от **device performance**. Слабый CPU или режим энергосбережения может сделать
animations дорогими, но сам по себе не означает, что browser «не поддерживает CSS Grid». Это уже performance constraint,
а не feature constraint.

Рабочая стратегия — baseline first:

```css
.toolbar {
  display: flex;
  flex-wrap: wrap;
}

@supports (container-type: inline-size) {
  .card-list {
    container-type: inline-size;
  }
}
```

Baseline должен сохранять content и основные действия. Новая feature добавляет удобство/layout enhancement, когда
environment ее понимает.

Но `@supports` нужен не всегда. CSS parsing уже игнорирует unsupported declarations, поэтому простой ordered fallback
часто дешевле:

```css
.title {
  color: #663399;
  color: oklch(50% 0.2 300);
}
```

Для product decision нужна явная browser support policy: какие environments поддерживаются, насколько деградация
допустима и какие сценарии обязательно тестируются. Иначе команда либо тащит бесконечные polyfills/hacks, либо случайно
ломает реальные user environments.

На интервью: **это скорее архитектурная категория environment constraints, а не специальный тип браузера; решение —
capability-based progressive enhancement и заранее определенный support contract**.





#### Вопрос: Какие плюсы и минусы у CSS preprocessors?

**Короткий ответ**

Sass/Less дают nesting, mixins, functions, modules и удобства для дизайн-систем. Минусы: дополнительная сборка, риск
глубокой вложенности, абстракций поверх CSS и расхождения с runtime-возможностями браузера. Многие задачи сегодня
закрывают native CSS custom properties, nesting, cascade layers и modern selectors.

**Полный ответ**

CSS preprocessor принимает source вроде Sass/Less и **до браузера** компилирует его в обычный CSS. Поэтому его
возможности делятся на две группы: удобный authoring syntax и compile-time programming.

Например, Sass может дать variables, mixins, functions, loops и modules:

```scss
$space: 8px;

@mixin focus-ring {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

.button {
  padding: $space $space * 2;

  &:focus-visible {
    @include focus-ring;
  }
}
```

После build browser видит только сгенерированный CSS. Sass variable `$space` уже не существует в runtime, поэтому
JavaScript, cascade или media query не могут изменить ее значение после загрузки страницы.

Это важное отличие от CSS custom properties:

```css
:root {
  --space: 0.5rem;
}

.card {
  padding: var(--space);
}
```

`--space` остается частью CSSOM, участвует в cascade/inheritance и может меняться в runtime. Поэтому Sass variables и
custom properties решают пересекающиеся, но не одинаковые задачи.

Плюсы preprocessors:

- compile-time functions/mixins помогают генерировать повторяющиеся patterns;
- modules позволяют организовать большую style codebase;
- зрелые ecosystems дают utilities для color/math и design-token generation;
- legacy projects могут иметь большой объем готовых Sass/Less abstractions.

Минусы:

- дополнительная build dependency и время compilation;
- source map/debugging сложнее прямого CSS;
- легко создать слишком глубокую nesting и огромный generated output;
- compile-time abstractions иногда скрывают реальную cascade/specificity;
- часть старых причин использовать preprocessor теперь закрывает native CSS.

Например, browser уже поддерживает CSS nesting:

```css
.card {
  padding: 1rem;

  & > .title {
    font-weight: 600;
  }
}
```

Но native nesting **не является Sass один-в-один**. Например, Sass-паттерн `&__title` конкатенирует selector name, а CSS
nesting так делать не умеет. Поэтому миграция с Sass не всегда сводится к удалению build step.

Современный выбор обычно такой: если проекту нужны в основном variables, nesting и cascade organization, стоит сначала
проверить native CSS custom properties, nesting и `@layer`. Если реально нужны compile-time loops, reusable functions
или существующая Sass ecosystem, preprocessor по-прежнему оправдан.

На интервью: **preprocessor — compile-time layer над CSS. Он полезен там, где нужна генерация/абстракция до browser, но
runtime theming и cascade лучше решать native CSS primitives**.





#### Вопрос: Зачем нужны CSS postprocessors?

**Короткий ответ**

CSS postprocessors обрабатывают уже написанный CSS: добавляют vendor prefixes, оптимизируют output, раскрывают
современный синтаксис или проверяют правила. Типичный пример — PostCSS с Autoprefixer. Это снижает ручную работу, но
должно опираться на реальную browser support policy, а не на настройки на всякий случай.

**Полный ответ**

CSS postprocessor работает с CSS как с входными данными и преобразует его в build pipeline. На практике чаще всего речь
идет об инструментах на базе PostCSS, которые разбирают CSS в AST и запускают plugins.

Классический пример — Autoprefixer:

```css
.example {
  user-select: none;
}
```

В зависимости от target browsers pipeline может добавить только реально необходимые vendor-prefixed declarations. Важно,
что решение принимается по browser support policy, обычно через Browserslist, а не по памяти разработчика.

Другие типичные задачи postprocessing:

- преобразование части нового CSS syntax для выбранных targets;
- minification и объединение безопасных rules;
- удаление comments/dead artifacts;
- linting или custom AST checks;
- нормализация output сторонних generators.

Например, `postcss-preset-env` может позволить писать часть современного CSS и преобразовать ее в форму, понятную target
browsers. Но такое преобразование не означает, что **любую** новую browser feature можно polyfill-ить
CSS-трансформацией. Если feature зависит от runtime layout algorithm или platform API, build tool может быть бессилен.

Postprocessor также не должен превращаться в безусловный набор «всех prefix на свете»:

```css
/* плохо поддерживать вручную */
-webkit-something: value;
-moz-something: value;
something: value;
```

Ручные prefixes устаревают вместе с browser matrix. Лучше иметь единую target policy и воспроизводимый pipeline.

Trade-offs тоже есть:

- больше plugins — больше complexity и update surface;
- transform может изменить semantics нового syntax или затруднить debugging;
- minifier должен сохранять observable behavior;
- source maps нужны, чтобы DevTools указывал на исходный source, а не только generated CSS.

Термин «postprocessor» исторический: современный PostCSS pipeline может стоять на разных этапах build и работать не
только «после всего CSS». Важнее понимать функцию — **AST transformation готового CSS syntax**.

На интервью: **postprocessing автоматизирует compatibility/optimization policy; Autoprefixer должен следовать target
browsers, а не заменять понимание browser support**.





#### Вопрос: Как подключать нестандартные шрифты?

**Короткий ответ**

Шрифты подключают через @font-face, задают font-family, src, font-weight, font-style и font-display. Используют WOFF2,
preload только для критичных начертаний и fallback stack с похожими метриками, чтобы снизить CLS. Слишком много
начертаний ухудшает LCP и first render.

**Полный ответ**

Web font обычно объявляют через `@font-face`, после чего используют его обычным `font-family`.

Минимальный пример:

```css
@font-face {
  font-family: 'Product Sans';
  src: url('/fonts/product-sans-regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

body {
  font-family: 'Product Sans', system-ui, sans-serif;
}
```

Для web обычно предпочитают WOFF2: он сжат специально для доставки fonts. Каждое реально используемое начертание должно
быть корректно описано через `font-weight`/`font-style`, иначе browser может синтезировать bold/italic или загрузить не
тот face.

Variable font способен покрыть диапазон weights одним resource:

```css
@font-face {
  font-family: 'Product Sans Variable';
  src: url('/fonts/product-sans.woff2') format('woff2');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
```

Но variable file не автоматически меньше любого набора static fonts: нужно сравнивать реальные assets/subsets.

`font-display` задает стратегию между invisible text, fallback font и поздней заменой. Часто выбирают `swap`, `fallback`
или `optional` в зависимости от важности brand font и допустимого layout shift.

Для performance важны не только CSS declarations:

- preload нужен только для действительно critical font resource, который понадобится на первом render;
- URL в preload должен совпадать с URL в `@font-face`;
- cross-origin правила должны быть настроены корректно;
- subset/`unicode-range` может не загружать glyphs, которые странице не нужны;
- не стоит загружать пять weights, если интерфейс использует два.

Web font способен вызвать layout shift, если fallback сильно отличается по metrics. Помимо выбора похожего system
fallback, CSS Fonts дает descriptors вроде `size-adjust`, `ascent-override`, `descent-override` и `line-gap-override`,
которыми можно приблизить fallback metrics к web font. Их поддержку нужно учитывать в target browsers.

```css
@font-face {
  font-family: 'Product Fallback';
  src: local('Arial');
  size-adjust: 102%;
}
```

Preload не нужно использовать «на всякий случай»: каждый preload конкурирует за network priority с CSS, images и другими
critical resources.

На интервью: **правильное подключение font — это не только `@font-face`: нужно описать faces, выбрать loading strategy,
минимизировать bytes и контролировать fallback metrics/CLS**.





#### Вопрос: Что такое FOUT и FOIT?

**Короткий ответ**

FOUT означает, что браузер сначала показывает fallback font, а потом заменяет его на custom font. FOIT означает, что
текст временно невидим, пока custom font не загрузится. Обычно этим управляют через font-display, preload только
критичных fonts, subset и fallback с близкими метриками.

**Полный ответ**

FOUT и FOIT описывают, что пользователь видит, пока downloadable web font еще не готов.

**FOIT — Flash of Invisible Text**: browser некоторое время скрывает glyphs, ожидая web font. Текст занимает место через
invisible fallback, но визуально пользователь его не видит.

**FOUT — Flash of Unstyled Text**: browser сразу показывает fallback font, а после загрузки заменяет его web font.
Контент доступен раньше, но при заметно разных metrics возможен layout shift.

Этим поведением управляет `font-display` внутри `@font-face`:

```css
@font-face {
  font-family: 'Brand';
  src: url('/brand.woff2') format('woff2');
  font-display: swap;
}
```

У font loading есть block period, swap period и затем failure behavior. Конкретная продолжительность зависит от user
agent, поэтому не стоит заучивать одно универсальное число миллисекунд.

Основные стратегии:

- `block` допускает короткий период invisible text, затем длительный swap period;
- `swap` почти сразу показывает fallback и разрешает заменить его позже;
- `fallback` дает небольшой шанс font загрузиться быстро, но ограничивает поздний swap;
- `optional` минимизирует блокировку и может оставить fallback до следующей navigation/session, если font не пришел
  достаточно быстро;
- `auto` оставляет стратегию browser.

`swap` часто улучшает perceived availability текста, но не гарантирует лучший UX автоматически. Если brand font сильно
шире fallback, поздняя замена может двигать строки и элементы.

Для снижения проблемы комбинируют:

- небольшой WOFF2/subset;
- preload только critical face;
- хороший fallback stack;
- metric matching через `size-adjust` и font metric overrides там, где это подходит support policy;
- отказ от ненужных weights/styles.

FOIT/FOUT — не отдельные CSS bugs, а trade-off между **скоростью появления текста, визуальной стабильностью и brand
typography**.

На интервью: **`font-display` управляет timeline загрузки; FOUT показывает fallback раньше, FOIT временно скрывает text,
а оптимизация должна учитывать и readability, и CLS**.





#### Вопрос: Что такое pseudo-element?

**Короткий ответ**

Pseudo-element создает стилизуемую часть элемента, которой нет как отдельного DOM-узла: ::before, ::after, ::marker,
::placeholder, ::selection. Его используют для декоративного контента, markers и визуальных деталей. Смысловой текст
лучше хранить в HTML, чтобы он был доступен assistive technologies и копированию.

**Полный ответ**

Pseudo-element позволяет выбрать и стилизовать **часть/абстрактный элемент render tree**, которой не обязательно
соответствует отдельный DOM node.

Синтаксис использует двойное двоеточие:

```css
selector::pseudo-element {
  /* declarations */
}
```

Примеры решают разные задачи:

```css
li::marker {
  color: tomato;
}

input::placeholder {
  color: gray;
}

p::first-line {
  font-weight: 600;
}
```

`::marker` адресует marker list item, `::placeholder` — placeholder form control, `::first-line` — первую formatted
line. Это показывает, почему pseudo-element нельзя сводить только к «виртуальному `div`».

`::before` и `::after` создают generated boxes, когда `content` приводит к их генерации:

```css
.external-link::after {
  content: ' ↗';
}
```

Но meaningful content лучше не хранить только в CSS. Generated content может по-разному попадать в accessibility tree,
не всегда удобно копируется и исчезает вместе со styles. Для обязательной подписи/инструкции правильнее HTML.

Pseudo-element также не является обычным DOM `Element`:

```js
document.querySelector('.external-link::after'); // не возвращает pseudo-element
```

Его existence и допустимые properties определяются конкретной CSS specification. Например, набор свойств для
`::first-line` ограничен сильнее, чем для обычного element.

Ранние pseudo-elements исторически поддерживали syntax с одним colon (`:before`), но современная запись — `::before`,
чтобы визуально отличать pseudo-elements от pseudo-classes.

На интервью: **pseudo-element адресует часть formatting/render structure без отдельного DOM node; `::before`/`::after` —
только два частных примера**.





#### Вопрос: Что такое pseudo-class?

**Короткий ответ**

Pseudo-class выбирает элемент по состоянию или отношению: :hover, :focus-visible, :checked, :disabled, :first-child,
:has(). Она не создает новый box, а уточняет selector. Для accessibility особенно важны :focus-visible, disabled states
и состояния form controls.

**Полный ответ**

Pseudo-class добавляет к selector условие, которое определяется state, structure или relation элемента, а не отдельным
class attribute в markup.

Примеры state:

```css
button:hover {
}
button:focus-visible {
}
input:checked {
}
input:disabled {
}
```

Structural pseudo-classes описывают положение среди siblings:

```css
li:first-child {
}
li:nth-child(odd) {
}
```

Functional pseudo-classes могут выражать более сложные relations:

```css
.card:has(> img) {
}
:is(h1, h2, h3) > a {
}
button:not(:disabled) {
}
```

В отличие от pseudo-element, pseudo-class **не создает и не адресует отдельную часть render tree** — она уточняет, когда
сам element совпадает с selector.

Важно помнить specificity. Большинство pseudo-classes дают вес class selector. Но есть специальные rules:

- `:where(...)` всегда имеет нулевую specificity;
- `:is(...)`, `:not(...)` и `:has(...)` сами не добавляют обычный class-weight — итоговый вклад определяется наиболее
  специфичным selector из их аргументов.

Например:

```css
:where(.dialog, .popover) button {
  font: inherit;
}
```

удобен для low-specificity base rules, которые потом легко переопределять.

Accessibility edge case: `:hover` нельзя считать единственным способом открыть важное управление, потому что
touch/keyboard users могут не иметь hover. Для keyboard focus обычно нужен `:focus-visible`/`:focus-within` или явное
application state.

На интервью: **pseudo-class выбирает существующий element по состоянию/структуре/отношению; pseudo-element выбирает
часть formatting/render structure**.





#### Вопрос: Чем nth-child() отличается от nth-of-type()?

**Короткий ответ**

:nth-child() считает элемент среди всех siblings, а :nth-of-type() — только среди siblings того же tag name. Например,
p:nth-child(2) выберет p, только если он второй child вообще, а p:nth-of-type(2) выберет второй p. Разница важна, когда
структура содержит смешанные элементы.

**Полный ответ**

Обе pseudo-classes используют формулу `An+B`, но считают разные наборы siblings.

`p:nth-child(2)` означает: **element должен быть `p` и одновременно вторым child среди всех element siblings**.

```html
<section>
  <h2>Title</h2>
  <p>First paragraph</p>
  <p>Second paragraph</p>
</section>
```

```css
p:nth-child(2) {
  color: red;
}
```

Выберет `First paragraph`, потому что этот `p` — второй child вообще.

`p:nth-of-type(2)` сначала рассматривает siblings с тем же type selector `p` и выбирает второй из них:

```css
p:nth-of-type(2) {
  color: blue;
}
```

Здесь будет выбран `Second paragraph`.

Поэтому эти selectors легко перепутать, если между одинаковыми tags добавляется другой element: `:nth-child()` реагирует
на общую sibling structure, `:nth-of-type()` — на позицию среди того же element type.

У современного `:nth-child()` есть дополнительная форма `of <selector-list>`:

```css
tr:nth-child(even of :not([hidden])) {
  background: var(--stripe);
}
```

Она сначала фильтрует siblings по selector list, а затем применяет `An+B`. Это полезно для zebra striping, когда часть
rows скрыта: counting идет только по видимому subset.

Это не делает `:nth-of-type()` ненужным. `:nth-of-type()` лаконично выражает именно counting одного tag type;
`:nth-child(... of S)` умеет считать произвольный filtered set, например `.item:not(.disabled)`.

При динамическом DOM position пересчитывается автоматически, поэтому selector может начать matching другой element после
insert/remove sibling. Если выбор должен отражать business identity, positional pseudo-class не заменяет semantic
class/data attribute.

На интервью: **`nth-child` считает общий или явно отфильтрованный sibling set, `nth-of-type` — siblings того же element
type; сначала определите, какой набор вы вообще хотите нумеровать**.





#### Вопрос: Чем responsive layout отличается от mobile-first strategy?

**Короткий ответ**

Responsive layout — результат: интерфейс адаптируется к доступному пространству и возможностям среды. Mobile-first —
стратегия authoring, где базовый layout рассчитан на узкое пространство, а более широкие варианты добавляются через
`min-width`/range media queries. Mobile-first не обязателен для responsive UI и сам по себе не гарантирует performance.

**Полный ответ**

**Responsive design** и **mobile-first** отвечают на разные вопросы.

Responsive layout описывает **поведение интерфейса**: content и controls должны оставаться удобными при разных размерах
container/viewport, zoom, orientation и input capabilities.

Например, layout может плавно менять количество колонок без привязки к конкретным device names:

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(16rem, 100%), 1fr));
  gap: 1rem;
}
```

А когда нужен явный structural breakpoint, можно использовать media query:

```css
.page {
  display: block;
}

@media (width >= 48rem) {
  .page {
    display: grid;
    grid-template-columns: 16rem minmax(0, 1fr);
  }
}
```

Это **mobile-first authoring**: narrow layout является baseline, а правило для большего пространства добавляет новое
состояние.

Desktop-first тоже может быть responsive:

```css
.page {
  display: grid;
  grid-template-columns: 16rem minmax(0, 1fr);
}

@media (width < 48rem) {
  .page {
    display: block;
  }
}
```

Поэтому mobile-first — не требование responsive design, а способ организовать cascade.

Breakpoints лучше выбирать там, где **ломается content**, а не по каталогам «phone/tablet/desktop». Устройства меняются,
окна desktop browser могут быть узкими, а component может находиться в sidebar. Для component-level adaptation часто
лучше подходят container queries, потому что они реагируют на доступное пространство component, а не всего viewport.

Responsive design также не ограничивается width. Media features позволяют учитывать, например, `hover`, `pointer`,
`prefers-reduced-motion`, contrast/color preferences и другие возможности среды.

Важный trade-off: mobile-first **не означает автоматически более быстрый mobile page**. Browser все равно загружает
stylesheet, а network/images/JavaScript и rendering cost зависят от отдельной performance architecture. Его реальное
преимущество — удобный baseline и часто более простой progressive cascade, если продукт действительно проектируется от
минимально доступного пространства.

На интервью: **responsive — свойство результата, mobile-first — стратегия написания CSS; выбирайте breakpoints по
content constraints и не выдавайте mobile-first за performance optimization сам по себе**.





#### Вопрос: Что такое fixed, fluid и responsive layout?

**Короткий ответ**

Fixed layout опирается на жесткие размеры/constraints, fluid использует доступное пространство через flexible units, а
responsive меняет layout при изменении условий. На практике чаще используют hybrid: fluid sizing внутри `min`/`max`
constraints плюс media/container queries там, где действительно меняется структура.

**Полный ответ**

Эти термины описывают разные способы связывать layout с доступным пространством.

**Fixed layout** задает размеры, которые почти не зависят от viewport:

```css
.page {
  inline-size: 60rem;
}
```

Такой layout предсказуем, но на viewport уже `60rem` появится overflow или потребуется отдельная adaptation logic.
«Fixed» не обязательно означает только `px`: суть в жестком constraint, а не конкретной CSS unit.

**Fluid layout** использует flexible sizing:

```css
.page {
  inline-size: 100%;
}

.sidebar {
  inline-size: 30%;
}
```

Современный fluid CSS обычно богаче простых percentages:

```css
.page {
  inline-size: min(100% - 2rem, 75rem);
  margin-inline: auto;
}

.title {
  font-size: clamp(1.5rem, 1rem + 2vw, 3rem);
}
```

`min()`, `max()`, `clamp()`, `fr`, `minmax()` и intrinsic sizing позволяют layout плавно адаптироваться без большого
числа breakpoints.

**Responsive layout** меняет presentation в ответ на conditions:

```css
.layout {
  display: grid;
  grid-template-columns: 1fr;
}

@media (width >= 60rem) {
  .layout {
    grid-template-columns: 18rem minmax(0, 1fr);
  }
}
```

Для reusable component условием может быть container, а не viewport:

```css
.card-list {
  container-type: inline-size;
}

@container (width >= 40rem) {
  .card {
    grid-template-columns: 12rem 1fr;
  }
}
```

В production эти подходы обычно смешиваются: wrapper имеет fluid width с `max-inline-size`, typography использует
`clamp()`, Grid/Flexbox распределяют свободное пространство, а media/container query применяется только в точке, где
нужна **структурная** перестройка.

Нежелательный pattern — десятки breakpoints только потому, что существует много device resolutions. Это привязывает CSS
к каталогу устройств вместо реальных constraints интерфейса.

На интервью: **fixed = жесткие constraints, fluid = плавное использование доступного пространства, responsive = смена
layout state по conditions; современный UI обычно hybrid**.





#### Вопрос: Чем display: block, inline, inline-block, flex, grid отличаются друг от друга?

**Короткий ответ**

`display` определяет и внешнюю роль box в layout родителя, и внутренний formatting context для children. `block` —
block-level flow box, `inline` — inline flow, `inline-block` — inline-level `flow-root`, `flex` — block-level flex
container, `grid` — block-level grid container.

**Полный ответ**

Полезнее понимать `display` не как список несвязанных keywords, а как комбинацию **outer** и **inner display type**.

- outer type отвечает, как principal box участвует в layout родителя;
- inner type определяет formatting context для descendants.

CSS Display описывает common значения так:

| Короткая запись | Концептуально      | Что происходит                                           |
| --------------- | ------------------ | -------------------------------------------------------- |
| `block`         | `block flow`       | block-level box, children используют normal flow         |
| `inline`        | `inline flow`      | inline box внутри line boxes родителя                    |
| `inline-block`  | `inline flow-root` | atomic inline-level box с собственным formatting context |
| `flex`          | `block flex`       | block-level flex container                               |
| `grid`          | `block grid`       | block-level grid container                               |

`block` в обычном horizontal writing mode с `inline-size: auto` часто растягивается на доступную ширину, но фраза «block
всегда занимает всю строку» — упрощение. Его реальная роль — block-level participation в flow layout.

```css
.block {
  display: block;
}
```

Non-replaced `inline` участвует в inline formatting context и может разбиваться по строкам. Обычные `width`/`height` не
задают ему box size так же, как block box:

```css
.label {
  display: inline;
}
```

`inline-block` остается единым atomic inline-level box рядом с текстом, но внутри создает `flow-root`, поэтому ему
удобно задавать dimensions/padding:

```css
.badge {
  display: inline-block;
  inline-size: 6rem;
}
```

`flex` и `grid` отличаются прежде всего **inner layout model**:

```css
.toolbar {
  display: flex;
}

.dashboard {
  display: grid;
}
```

Flex formatting context оптимизирован под распределение items преимущественно по одной main axis с cross-axis alignment.
Grid моделирует tracks по двум осям и relationships rows/columns.

Если container должен сам быть inline-level, существуют `inline-flex` и `inline-grid`: меняется outer participation, но
внутри остается flex/grid formatting context.

`display` не меняет semantic meaning HTML element. Например, `nav { display: grid }` остается navigation landmark;
layout и document semantics — разные уровни.

На интервью: **`display` задает outer participation + inner formatting context; поэтому `inline-block` — не просто
«inline, которому разрешили width», а `inline flow-root`, а `flex/grid` меняют layout model children**.





#### Вопрос: Как визуально скрыть элемент, но оставить его доступным для screen reader?

**Короткий ответ**

Используют visually-hidden pattern: элемент остается в DOM/accessibility tree, но его visual box сводят к 1px и
clipping. `display: none`, `visibility: hidden`, `hidden` и `aria-hidden="true"` не подходят, если content должен
читаться assistive technology. Focusable skip-link должен становиться видимым при focus.

**Полный ответ**

Если content нужен assistive technology, но не должен занимать visual space, используют специальный visually-hidden
utility, а не `display: none`.

Один из patterns, приведенных WAI:

```css
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(100%);
  white-space: nowrap;
}
```

Так element остается в document/accessibility tree, но visual box становится практически незаметным и не влияет на
обычный layout.

Важно не подменять эту задачу другими способами скрытия:

```css
.hidden {
  display: none;
}
```

`display: none` убирает subtree из box tree и в обычном случае из accessibility presentation. Аналогично
`visibility: hidden` не является screen-reader-only pattern. `aria-hidden="true"` прямо сообщает accessibility API, что
content нужно скрыть от assistive technology — это противоположная задача.

`opacity: 0` тоже плохая generic замена: element продолжает занимать место, а interactive control может остаться
невидимо focusable/clickable.

Особый случай — skip link. Keyboard user должен **увидеть** control, когда тот получает focus:

```css
.skip-link:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(100%);
  white-space: nowrap;
}

.skip-link:focus {
  position: fixed;
  inset: 1rem auto auto 1rem;
}
```

WAI отдельно отмечает, что скрытый skip link допустим, если при keyboard focus он становится хорошо видимым.

Не стоит превращать visually-hidden в способ дублировать весь visual UI для screen readers. Semantic HTML, корректные
labels и accessible names обычно лучше отдельного параллельного текста.

На интервью: **screen-reader-only pattern визуально clips content, но сохраняет его для AT; interactive hidden content
требует отдельного focus behavior, а `display:none`/`aria-hidden` решают обратную задачу**.
