# CSS — вопросы и ответы, часть 4

> Автоматически сгенерировано из src/pages/css/index.md. Не редактируйте вручную.

### CSS Grid

Практический пример: [`examples/css/grid`](/examples/css/grid/index.html)



#### Вопрос: Что такое CSS Grid?

**Короткий ответ**

Grid — двумерная система раскладки со строками, колонками и областями. Она позволяет определить структуру контейнера, а
элементам — занимать одну или несколько ячеек. Grid удобен для карточек и page-level layout.

**Полный ответ**

Grid — двумерная layout model, где container создает систему **columns и rows**, а items размещаются относительно grid
lines, cells или named areas.

```css
.layout {
  display: grid;
  grid-template-columns: 16rem minmax(0, 1fr);
  grid-template-rows: auto 1fr;
  gap: 1rem;
}
```

В отличие от обычного flow, несколько элементов могут выравниваться по одним и тем же границам tracks. Item может
занимать одну cell или несколько tracks через `grid-column` / `grid-row`.

Важно различать **explicit grid** и **implicit grid**. Explicit tracks объявляются через `grid-template-*`; если item
оказывается за их пределами, browser автоматически создает implicit tracks, размер которых можно контролировать через
`grid-auto-rows` и `grid-auto-columns`.

Grid не обязан быть жестким: tracks могут быть flexible и intrinsic — например `1fr`, `min-content`, `max-content`,
`minmax()` и `repeat(auto-fit, ...)`.

На практике Grid особенно удобен для page shells, dashboards, forms и card grids, где важны общие row/column boundaries.
Внутри отдельной grid cell при этом часто используют Flexbox или normal flow.

На интервью: **Grid — track-based двумерная модель; container определяет rows/columns, items размещаются по grid lines,
а explicit и implicit grid вместе формируют итоговую раскладку**. Практика:
[`CSS Grid: явная сетка 3 на 3`](/examples/css/grid/example1/index.html) и
[`CSS Grid: адаптивная сетка товаров`](/examples/css/grid/example11/index.html)





#### Вопрос: Что делают grid-template-columns и grid-template-rows?

**Короткий ответ**

Они описывают явные tracks сетки и их размеры. Можно использовать px, %, fr, minmax(), repeat() и intrinsic keywords.
Неявные tracks создаются автоматически для элементов вне заданной сетки.

**Полный ответ**

`grid-template-columns` и `grid-template-rows` задают **explicit tracks** и их sizing functions.

```css
.page {
  display: grid;
  grid-template-columns: 15rem minmax(0, 1fr);
  grid-template-rows: auto 1fr auto;
}
```

Track может быть fixed, flexible или intrinsic:

```css
.grid {
  grid-template-columns: 12rem 25% 1fr minmax(10rem, 2fr) max-content;
}
```

`fr` делит оставшееся free space после fixed/intrinsic tracks и gaps. `minmax()` задает диапазон, а `repeat()` сокращает
повторяющиеся definitions.

Если items выходят за explicit grid, создаются implicit tracks:

```css
.grid {
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(6rem, auto);
}
```

Четвертый и следующие ряды уже не перечислены в `grid-template-rows`, но получают размер через `grid-auto-rows`.

Частый production edge case — длинный content в `1fr` track. Automatic minimum может не дать колонке сжаться, поэтому
для остаточной области часто пишут `minmax(0, 1fr)`.

На интервью: **template properties описывают explicit grid, а implicit tracks настраиваются через `grid-auto-*`; track
sizing может быть fixed, intrinsic или flexible**. Практика:
[`CSS Grid: фиксированные tracks`](/examples/css/grid/example1/index.html) и
[`CSS Grid: fr-единицы`](/examples/css/grid/example2/index.html)





#### Вопрос: Когда лучше использовать Flexbox, а когда CSS Grid?

**Короткий ответ**

Flexbox выбирают для строки, колонки, выравнивания и неизвестного числа элементов. Grid — когда важны согласованные
колонки, строки или двумерные области. Если приходится имитировать строки вложенными flex-контейнерами, Grid обычно
проще.

**Полный ответ**

Выбор лучше начинать с главного layout constraint.

Flexbox обычно подходит, когда задача звучит как «распределить items вдоль одной main axis и позволить content влиять на
их размеры»:

```css
.toolbar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
```

Grid лучше, когда нужны общие rows/columns, по которым должны выровняться несколько элементов:

```css
.form {
  display: grid;
  grid-template-columns: 10rem minmax(0, 1fr);
  gap: 0.75rem 1rem;
}
```

Сигналы в пользу Flexbox: toolbar, navigation, button group, avatar + text, распределение free space, auto margin.
Сигналы в пользу Grid: одинаковые column boundaries между rows, spanning, named areas, responsive число колонок,
двумерная структура.

`flex-wrap` не превращает Flexbox в Grid: каждая flex line рассчитывается отдельно. Если приходится вручную
синхронизировать widths между wrapped rows, это сильный сигнал проверить Grid.

Модели нормально комбинируются: page shell может быть Grid, а toolbar внутри одной area — Flexbox.

На интервью: **Flexbox — distribution-first вдоль одной оси, Grid — track/layout-first по двум осям; выбирать нужно по
constraint, а не по названию компонента**. Практика: [`Flexbox: wrap`](/examples/css/flexbox/example3/index.html) и
[`CSS Grid: адаптивная сетка товаров`](/examples/css/grid/example11/index.html)





#### Вопрос: Чем Grid отличается от Flexbox?

**Короткий ответ**

Grid управляет двумя измерениями одновременно и начинает с структуры контейнера. Flexbox распределяет элементы вдоль
одной основной оси и лучше адаптируется к содержимому. Их часто комбинируют: Grid для страницы, Flexbox внутри
компонентов.

**Полный ответ**

Главное различие — в алгоритме раскладки.

Flexbox берет items, определяет main axis и распределяет positive/negative free space между ними. Даже при `flex-wrap`
каждая line flex-ится отдельно. Grid сначала формирует rows/columns и их размеры, а затем размещает items относительно
общей системы grid lines.

```css
.toolbar {
  display: flex;
  gap: 1rem;
}

.dashboard {
  display: grid;
  grid-template-columns: 18rem minmax(0, 1fr);
  grid-template-rows: auto 1fr;
  gap: 1rem;
}
```

Поэтому wrapped Flexbox может дать последней строке другое распределение ширины, а Grid сохраняет общие column tracks
для всей сетки.

Но Grid не «лучше». Для простого push одного action к краю Flexbox с `margin-inline-start: auto` обычно понятнее, чем
создание grid tracks.

Обе модели поддерживают alignment, `gap`, intrinsic sizing и могут overflow-ить при неверных min-size constraints.
Правило «Grid для page, Flexbox для component» полезно только как эвристика.

На интервью: **Flexbox flex-ит items по одной основной оси, Grid size-ит общие tracks по двум осям; в реальном UI их
часто используют вместе**. Практика: [`CSS Grid: именованные области`](/examples/css/grid/example6/index.html) и
[`Flexbox: wrap`](/examples/css/flexbox/example3/index.html)





#### Вопрос: Когда лучше использовать Grid вместо Flexbox?

**Короткий ответ**

Grid лучше выбирать для двумерной структуры: согласованных строк, колонок, областей страницы и карточных сеток. Flexbox
удобнее для одномерного распределения элементов внутри компонента. Если layout одновременно зависит и от строк, и от
колонок, Grid обычно проще и устойчивее.

**Полный ответ**

Grid стоит выбирать, когда общая двумерная структура важнее индивидуального распределения каждого ряда.

```css
.page {
  display: grid;
  grid-template-areas:
    'header header'
    'sidebar main';
  grid-template-columns: 16rem minmax(0, 1fr);
  gap: 1rem;
}
```

Grid особенно удобен, если несколько rows должны делить одинаковые column tracks, элементы занимают несколько
rows/columns, layout естественно описывается areas или число колонок должно зависеть от доступной ширины.

Responsive card grid часто обходится без media query:

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(18rem, 100%), 1fr));
  gap: 1rem;
}
```

Flexbox лучше оставить для реально одномерных задач: toolbar, actions row, chips, avatar + text. Переход на Grid только
потому, что он «современнее», добавляет complexity без пользы.

На интервью: **если layout одновременно зависит от rows и columns или нужен общий track alignment, Grid обычно выражает
намерение устойчивее Flexbox**. Практика: [`CSS Grid: page layout`](/examples/css/grid/example3/index.html) и
[`CSS Grid: grid-template-areas`](/examples/css/grid/example6/index.html)





#### Вопрос: Что такое minmax()?

**Короткий ответ**

minmax(min, max) задает диапазон размера grid track. Например, колонка может быть не уже 240px, но растягиваться до доли
свободного пространства. Это основа многих responsive grids без media queries.

**Полный ответ**

`minmax(min, max)` задает нижнюю и верхнюю границу размера grid track.

```css
.layout {
  display: grid;
  grid-template-columns: minmax(12rem, 20rem) minmax(0, 1fr);
}
```

Первая колонка растет от `12rem` до `20rem`, а вторая получает остаток и может сжаться до `0`.

Популярный responsive pattern:

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  gap: 1rem;
}
```

Browser создает столько tracks, сколько помещается, каждый не уже `15rem`, а free space распределяется через `1fr`.

Edge case: container может стать уже `15rem` и получить horizontal overflow. Для reusable component безопаснее
`minmax(min(15rem, 100%), 1fr)`.

`minmax(0, 1fr)` тоже важен: обычный `1fr` имеет automatic minimum, связанный с intrinsic content size. Zero minimum
явно разрешает track сжаться ниже min-content.

На интервью: **`minmax()` задает диапазон track sizing; в связке с `fr` и `auto-fit/fill` это основа большинства
responsive Grid patterns**. Практика: [`CSS Grid: адаптивная сетка товаров`](/examples/css/grid/example11/index.html)





#### Вопрос: Что такое auto-fit и auto-fill?

**Короткий ответ**

Оба значения создают столько повторяющихся tracks, сколько помещается. auto-fill сохраняет пустые tracks, а auto-fit
схлопывает их и растягивает занятые. Разница заметна, когда элементов меньше доступных колонок.

**Полный ответ**

`auto-fill` и `auto-fit` используются внутри `repeat()` как auto-repeat: browser вычисляет, сколько повторяющихся tracks
помещается в доступный размер container.

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  gap: 1rem;
}
```

Пока items достаточно, оба варианта часто выглядят одинаково. Разница проявляется, когда свободных track positions
больше, чем элементов.

**`auto-fill`** сохраняет пустые tracks, поэтому grid продолжает резервировать column slots.

**`auto-fit`** схлопывает пустые tracks, а освободившееся место может перейти занятым `fr` tracks — карточки растянутся.

Практически `auto-fit` чаще используют для card grids, где существующие cards должны заполнить row. `auto-fill` полезен,
когда сама структура пустых column slots имеет смысл.

Это не аналог `flex-wrap`: keywords определяют число Grid tracks, а перенос items делает Grid auto-placement.

На интервью: **оба значения создают максимум auto-repeat tracks; `auto-fill` сохраняет пустые, `auto-fit` их схлопывает
и позволяет занятым tracks растянуться**. Практика:
[`CSS Grid: auto-fit и minmax`](/examples/css/grid/example11/index.html)





#### Вопрос: Что такое Grid stacking?

**Короткий ответ**

Grid stacking — прием, при котором несколько grid items размещают в одной и той же области сетки или в пересекающихся
grid lines. Элементы накладываются друг на друга, а порядок слоя определяется обычными правилами stacking context:
порядком в DOM, z-index, position, opacity, transform и другими свойствами.

**Полный ответ**

Grid позволяет нескольким items занимать одну и ту же cell или area, поэтому controlled overlap можно сделать без
обязательного `position: absolute`.

```css
.hero {
  display: grid;
}

.hero > img,
.hero > .content {
  grid-area: 1 / 1;
}
```

Оба элемента накладываются, но остаются grid items и продолжают участвовать в track sizing. Это важное отличие от
absolute-positioned element, который обычно out-of-flow.

Для grid items можно применять `z-index` даже без `position`:

```css
.hero > img {
  z-index: 0;
}

.hero > .content {
  z-index: 1;
}
```

Обычные stacking context rules никуда не исчезают: descendant с большим `z-index` не может выйти за пределы stacking
context ancestor.

Grid stacking удобен для text-over-image, badge/decorative layers, skeleton/content transitions. Но visual overlap не
меняет DOM order, поэтому focus order и semantics должны оставаться понятными.

На интервью: **несколько grid items могут делить одну area и перекрываться, сохраняя участие в Grid sizing; layering
дальше подчиняется обычным stacking rules**. Практика:
[`CSS Grid: пересекающиеся линии`](/examples/css/grid/example9/index.html) и
[`CSS Grid: текст поверх изображения`](/examples/css/grid/example10/index.html)





#### Вопрос: Как сделать Grid wrapping?

**Короткий ответ**

В Grid нет прямого аналога flex-wrap, потому что grid items автоматически переходят в новые строки или колонки по
правилам auto-placement. Для карточных сеток обычно задают повторяющиеся колонки через repeat(), auto-fit или auto-fill,
а минимальный и максимальный размер колонки описывают через minmax().

**Полный ответ**

В Grid нет отдельного `flex-wrap`: визуальный перенос получается из **track definition + auto-placement**.

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(16rem, 100%), 1fr));
  gap: 1rem;
}
```

Browser определяет число columns, создает cells и размещает items по ним. Когда cells текущей row заканчиваются,
следующие items автоматически переходят в следующую row.

Это отличается от Flexbox wrapping: каждая flex line рассчитывается независимо, а Grid rows используют общую систему
column tracks.

Даже с фиксированным числом columns новые rows создаются автоматически:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(8rem, auto);
}
```

Четвертый item попадет в implicit row, размер которой задает `grid-auto-rows`.

`grid-auto-flow: column` может создавать implicit columns, а `grid-auto-flow: dense` заполняет holes более поздними
items. `dense` требует осторожности: visual order способен отличаться от DOM order, что важно для keyboard navigation.

На интервью: **Grid wrapping — это не отдельное property; tracks задают доступные cells, а auto-placement переносит
items в следующие rows или columns**. Практика: [`CSS Grid: auto-fit и minmax`](/examples/css/grid/example11/index.html)



### CSS Responsive



#### Вопрос: Чем responsive design отличается от adaptive design?

**Короткий ответ**

Responsive layout плавно подстраивается под доступное пространство, а adaptive обычно выбирает несколько заранее
подготовленных layouts для диапазонов устройств. На практике подходы комбинируют, а границы выбирают по content, не по
моделям телефонов.

**Полный ответ**

Термины responsive и adaptive используют скорее как **архитектурные подходы**, а не как жестко стандартизированные CSS
режимы.

**Responsive design** обычно означает, что layout непрерывно использует доступное пространство: flexible tracks,
проценты, `fr`, `minmax()`, `clamp()`, wrapping и media/container queries.

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(16rem, 100%), 1fr));
  gap: 1rem;
}
```

Здесь число колонок меняется из-за доступной ширины, а не потому, что код знает конкретную модель устройства.

**Adaptive design** чаще подразумевает несколько дискретных состояний layout:

```css
.page {
  display: grid;
  grid-template-columns: 1fr;
}

@media (width >= 64rem) {
  .page {
    grid-template-columns: 18rem minmax(0, 1fr);
  }
}
```

До breakpoint это один layout, после него — другой. Такой переход может быть правильнее плавного масштабирования, если
структура действительно должна измениться: например sidebar становится drawer, table превращается в cards, actions
переезжают в menu.

На практике современные интерфейсы почти всегда **гибридные**: размеры и gaps fluid, а в нескольких точках меняется
структура. Breakpoint лучше выбирать там, где content перестает помещаться или нарушается hierarchy, а не по названиям
`mobile/tablet/desktop` и не по конкретным моделям устройств.

Trade-off: слишком много adaptive breakpoints увеличивает число состояний для тестирования, а попытка сделать абсолютно
все fluid может оставить неудобную структуру на промежуточных размерах.

На интервью: **responsive — про непрерывную адаптацию к available space, adaptive — про несколько дискретных layout
states; в production обычно используют оба подхода вместе**.





#### Вопрос: Что такое mobile-first?

**Короткий ответ**

Mobile-first начинает с базового layout для узкого экрана и добавляет возможности через min-width queries. Это помогает
приоритизировать content и progressive enhancement, но не отменяет тестирование desktop, touch, keyboard и разных input
capabilities.

**Полный ответ**

Mobile-first — это **стратегия authoring**, при которой базовые styles подходят узкому viewport, а более просторные
варианты добавляются по мере появления места.

```css
.profile {
  display: grid;
  gap: 1rem;
}

@media (width >= 48rem) {
  .profile {
    grid-template-columns: 14rem minmax(0, 1fr);
  }
}
```

Базовый rule работает без media query, а `min-width` добавляет enhancement. Это часто дает более простой cascade: не
нужно сначала объявлять desktop layout, а потом отменять десятки declarations для narrow screen.

Плюсы подхода:

- заставляет рано определить приоритетный content и минимально рабочий UI;
- хорошо сочетается с progressive enhancement;
- часто уменьшает количество override rules;
- проще мыслить как «добавить возможности при появлении пространства».

Но mobile-first **сам по себе не является performance optimization**. Если CSS скрывает тяжелый desktop widget на
mobile, его JavaScript, data request или image все равно могут загрузиться. Performance зависит от loading strategy,
code splitting, responsive images и runtime architecture, а не от направления media queries.

Также width не описывает input device. Широкий touchscreen может иметь `hover: none`, а узкое desktop window — точный
mouse pointer. Для interaction capabilities есть отдельные queries:

```css
@media (hover: hover) and (pointer: fine) {
  .card:hover {
    box-shadow: 0 0.5rem 2rem rgb(0 0 0 / 0.15);
  }
}
```

Desktop-first тоже может быть оправдан, например при постепенном упрощении legacy desktop application. Важнее
предсказуемый cascade и проверенное поведение во всех relevant sizes.

На интервью: **mobile-first = базовый narrow layout + enhancements через `min-width`; это организация CSS, а не
автоматическая гарантия скорости или доступности**.





#### Вопрос: Что такое safe area?

**Короткий ответ**

Safe area учитывает вырезы, скругления и системные overlays устройства. Значения env(safe-area-inset-) добавляют
необходимые padding при подходящем viewport configuration, особенно для fixed controls у краев экрана.

**Полный ответ**

Safe area — область viewport, внутри которой важный content не перекрывается физической формой display или системными
элементами у края экрана. Browser предоставляет четыре environment variables:

- `safe-area-inset-top`;
- `safe-area-inset-right`;
- `safe-area-inset-bottom`;
- `safe-area-inset-left`.

Их читают через `env()`:

```css
.bottom-bar {
  padding: 0.75rem max(1rem, env(safe-area-inset-right)) max(0.75rem, env(safe-area-inset-bottom))
    max(1rem, env(safe-area-inset-left));
}
```

`max()` здесь сохраняет обычный design padding даже на устройстве, где inset равен `0`.

Safe area особенно важна для элементов, прижатых к viewport edge:

```css
.floating-action {
  position: fixed;
  right: max(1rem, env(safe-area-inset-right));
  bottom: max(1rem, env(safe-area-inset-bottom));
}
```

На iOS edge-to-edge layout исторически связан с viewport configuration вроде `viewport-fit=cover`; без выхода content к
краям необходимость компенсировать inset может вообще не возникнуть.

Важно не превращать safe-area padding в глобальное правило для каждого container. Обычно его применяют на boundary
component: page shell, fixed navigation, full-bleed media или bottom sheet.

Safe area также не равна «всем возможным перекрытиям UI». On-screen keyboard, dynamic browser chrome, fold/hinge и
multi-segment viewport имеют отдельные механизмы и могут требовать другой стратегии (`dvh`, viewport segments и т.д.).

На интервью: **safe-area insets — browser-provided environment values для edge-to-edge layout; применяйте их у краев, а
не как магический padding всего приложения**.





#### Вопрос: Как учитывать разные плотности экранов?

**Короткий ответ**

Layout строят в CSS pixels, а raster assets предоставляют с подходящим resolution через srcset или image-set. SVG
масштабируется независимо от DPR. Не следует умножать все CSS-размеры на device pixel ratio вручную.

**Полный ответ**

CSS layout строится в **CSS pixels**, а не напрямую в физических pixels display. На Hi-DPI screen одному CSS `px` может
соответствовать несколько device pixels. Отношение часто описывают через device pixel ratio, но оно не должно управлять
обычными размерами UI.

Неправильная идея:

```js
button.style.width = `${120 * window.devicePixelRatio}px`;
```

Browser уже абстрагирует physical density при layout. Такой код обычно делает интерфейс физически слишком большим и
ломает zoom behavior.

Density прежде всего важна для **raster resources**. Для изображения фиксированного visual size можно дать density
candidates:

```html
<img
  src="avatar.png"
  srcset="avatar.png 1x, avatar@2x.png 2x"
  width="64"
  height="64"
  alt=""
/>
```

Для background images есть `image-set()`:

```css
.logo {
  background-image: image-set(url('/logo.png') 1x, url('/logo@2x.png') 2x);
}
```

Для responsive images с меняющейся rendered width обычно лучше width descriptors (`480w`, `960w`) + `sizes`, потому что
browser сможет учитывать и slot size, и effective density.

SVG для logos/icons часто не требует отдельных 2x/3x файлов: vector geometry масштабируется без привязки к raster
resolution.

Если style действительно зависит от output density, существует стандартный media feature `resolution`:

```css
@media (resolution >= 2dppx) {
  /* density-specific detail */
}
```

Но это редкая задача. Не стоит использовать density query вместо responsive image selection или для масштабирования
layout.

На интервью: **CSS px отвечает за layout, density — в основном за достаточное raster resolution; resource selection
лучше делегировать `srcset`/`image-set()`, а не ручному `devicePixelRatio`**.





#### Вопрос: Как responsive images связаны с responsive layout?

**Короткий ответ**

Layout определяет отображаемую ширину, а sizes сообщает ее браузеру для выбора кандидата из srcset. Если sizes не
соответствует реальному layout, браузер может загрузить слишком большой или размытый ресурс.

**Полный ответ**

Responsive layout определяет, **какой slot** получит изображение, а responsive images позволяют browser выбрать
подходящий raster resource для этого slot и текущей density.

Пример с width descriptors:

```html
<img
  src="photo-960.jpg"
  srcset="photo-480.jpg 480w, photo-960.jpg 960w, photo-1440.jpg 1440w"
  sizes="(width < 48rem) 100vw, 50vw"
  width="1440"
  height="900"
  alt="Городская площадь"
/>
```

`srcset` сообщает intrinsic widths candidates. `sizes` описывает ожидаемую **rendered slot width** по media conditions.
Browser сопоставляет slot, available candidates, effective pixel density и другие факторы и выбирает resource.

Важно: `sizes` не измеряет элемент после layout. Эта информация нужна browser **до загрузки image**, поэтому она должна
правдоподобно описывать CSS layout. Если реальная колонка занимает `50vw`, а `sizes` всегда говорит `100vw`, browser
может регулярно скачивать слишком большой asset.

Для фиксированного rendered size можно использовать density descriptors:

```html
<img
  src="icon.png"
  srcset="icon.png 1x, icon@2x.png 2x"
  width="32"
  height="32"
  alt=""
/>
```

Не смешивают `w` и `x` descriptors в одном `srcset`.

`<picture>` решает другую задачу — **art direction** или format choice:

```html
<picture>
  <source
    media="(width < 40rem)"
    srcset="hero-crop-mobile.avif"
  />
  <source
    type="image/avif"
    srcset="hero.avif"
  />
  <img
    src="hero.jpg"
    alt="Команда в офисе"
  />
</picture>
```

Задавайте intrinsic `width`/`height`, чтобы browser мог зарезервировать aspect-ratio space и уменьшить layout shift.

На интервью: **CSS определяет slot, `sizes` описывает его browser, `srcset` дает candidates; `<picture>` нужен, когда
меняется не только resolution, но и сам content/crop/format**.





#### Вопрос: Что такое media query?

**Короткий ответ**

@media применяет rules при совпадении характеристик viewport, устройства или предпочтений пользователя: width,
orientation, hover, pointer, prefers-reduced-motion, prefers-color-scheme и других признаков. Media queries используют
не только для breakpoints, но и для адаптации input, motion и contrast. Breakpoints выбирают там, где ломается layout, а
не по названиям устройств.

**Полный ответ**

`@media` условно включает CSS rules по media type и media features. Самый известный случай — viewport size:

```css
@media (width >= 48rem) {
  .layout {
    grid-template-columns: 16rem minmax(0, 1fr);
  }
}
```

Современная range syntax (`width >= 48rem`) выражает условие напрямую; `min-width`/`max-width` остаются валидными и
распространенными.

Media queries не ограничены шириной. Они могут описывать input capabilities:

```css
@media (hover: hover) and (pointer: fine) {
  .card:hover {
    box-shadow: 0 0.5rem 2rem rgb(0 0 0 / 0.15);
  }
}
```

или user preferences:

```css
@media (prefers-reduced-motion: reduce) {
  .animated {
    animation: none;
    scroll-behavior: auto;
  }
}
```

`hover`/`pointer` относятся к primary pointing device; если важна возможность **любого** доступного pointer, есть
`any-hover` и `any-pointer`.

Breakpoint лучше определять по layout constraint: например cards становятся слишком узкими, navigation перестает
помещаться, form labels требуют другую структуру. Device catalog быстро устаревает, а одно устройство может работать в
portrait/landscape, split view или desktop window.

Media query не заменяет feature detection. Если нужно узнать поддержку CSS syntax/property, для этого обычно подходит
`@supports`, а не `@media`.

На интервью: **media queries проверяют environment/user preferences; width breakpoints — только один из сценариев, а
границы layout лучше выбирать по content constraints**.





#### Вопрос: Что такое container query и чем она отличается от media query?

**Короткий ответ**

Media query смотрит на viewport или device features, container query — на размер или styles ближайшего query container.
Container queries делают компонент адаптивным к месту использования, независимо от ширины всей страницы.

**Полный ответ**

Media query отвечает на вопрос про **environment страницы**: viewport width, orientation, pointer, color scheme и т.д.
Container query позволяет компоненту реагировать на **контекст размещения** — например на inline-size ближайшего query
container.

Для size query сначала объявляют container:

```css
.sidebar-slot {
  container-type: inline-size;
}
```

а внутри component styles используют `@container`:

```css
.card {
  display: grid;
  gap: 0.75rem;
}

@container (width >= 30rem) {
  .card {
    grid-template-columns: 8rem minmax(0, 1fr);
  }
}
```

Один и тот же `.card` теперь может быть horizontal в широкой content area и vertical в узком sidebar **при одинаковой
viewport width**.

Для reusable components это уменьшает связь с page-level breakpoints. Component не должен знать, находится он в modal,
sidebar или dashboard — ему важна доступная ширина.

Containers можно именовать:

```css
.workspace {
  container: workspace / inline-size;
}

@container workspace (width >= 50rem) {
  .panel {
    grid-template-columns: 1fr 1fr;
  }
}
```

Size queries требуют `container-type: inline-size` или `size`, потому что browser должен разорвать потенциальную
feedback loop между размером container и styles descendants. `inline-size` обычно практичнее: компонент чаще
адаптируется по одной inline axis.

Есть также container query units (`cqi`, `cqw` и др.) и другие виды container queries, но для everyday responsive
components size query — основной паттерн.

На интервью: **media query адаптирует страницу к environment, container query адаптирует component к available space его
container; size query требует объявленного size-container**.





#### Вопрос: Что такое fluid typography и как работает clamp()?

**Короткий ответ**

Fluid typography плавно меняет размер между границами. clamp(min, preferred, max) ограничивает вычисленное значение:

**Полный ответ**

Fluid typography позволяет font size изменяться вместе с available space, но оставаться внутри безопасного диапазона.
Для этого удобно использовать `clamp(min, preferred, max)`:

```css
.title {
  font-size: clamp(1.5rem, 1rem + 2vw, 3rem);
}
```

Browser вычисляет preferred expression `1rem + 2vw`, но результат не может стать меньше `1.5rem` или больше `3rem`. Это
часто заменяет несколько typography breakpoints.

Важно не использовать pure viewport scaling без границ:

```css
.title {
  font-size: 4vw;
}
```

На широком screen текст может стать чрезмерно большим, на узком — слишком маленьким. Кроме того, viewport-only formula
может хуже реагировать на text zoom. Смешивание relative font unit (`rem`) и viewport contribution сохраняет связь и с
user font/zoom settings, и с available width.

Для component-level typography preferred part можно связать с container query unit:

```css
.card-title {
  font-size: clamp(1.125rem, 1rem + 1cqi, 1.75rem);
}
```

Это особенно полезно внутри reusable component, но нужно убедиться, что component имеет подходящий query container.

`clamp()` применим не только к typography:

```css
.page {
  padding-inline: clamp(1rem, 4vw, 4rem);
}
```

Accessibility остается отдельным constraint: minimum не должен быть слишком маленьким, maximum не должен мешать
увеличению текста, а layout обязан выдерживать zoom и увеличение font size без потери content.

На интервью: **`clamp()` задает lower bound, fluid preferred value и upper bound; хороший fluid type использует relative
units и все равно тестируется при zoom/large text**.
