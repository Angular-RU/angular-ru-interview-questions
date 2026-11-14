# CSS — вопросы и ответы, часть 3

> Автоматически сгенерировано из src/pages/css/index.md. Не редактируйте вручную.

#### Вопрос: Какие media types кроме screen существуют?

**Короткий ответ**

В Media Queries Level 4 актуальны `all`, `print` и `screen`. Старые `speech`, `handheld`, `tv`, `projection`, `tty`,
`braille`, `embossed`, `aural` deprecated: authors не должны их использовать, а user agents должны заставлять их match
nothing. Обычно важнее media features, чем media types.

**Полный ответ**

Современная Media Queries specification оставляет всего три media types:

- `all` — все устройства/среды;
- `print` — печать и Print Preview;
- `screen` — все устройства, которые не относятся к `print`.

Например, print stylesheet может убрать application chrome и настроить документ для бумаги:

```css
@media print {
  nav,
  .toolbar {
    display: none;
  }

  a[href]::after {
    content: ' (' attr(href) ')';
  }
}
```

`all` обычно писать не нужно: query без media type уже применяется ко всем media types, если его conditions true.

```css
@media (width >= 60rem) {
  /* effectively all + width condition */
}
```

Исторически существовали `tty`, `tv`, `projection`, `handheld`, `braille`, `embossed`, `aural`, `speech`. В Media
Queries Level 4 они **deprecated**. Specification требует, чтобы user agents распознавали их как valid media types, но
они должны match nothing. Поэтому совет «используйте `speech` для screen reader» сегодня неверен.

Почему старые categories ушли: device category слишком грубо описывает capabilities. Phone может иметь high-resolution
screen, mouse/keyboard и print support; desktop window может быть узким. Поэтому modern CSS чаще спрашивает конкретную
feature:

```css
@media (hover: hover) and (pointer: fine) {
  .menu-item:hover {
    text-decoration: underline;
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    scroll-behavior: auto;
  }
}
```

Media features отвечают на реальное условие лучше, чем попытка угадать тип устройства.

На интервью: **сейчас media types — `all`, `print`, `screen`; остальные исторические types deprecated и match nothing, а
device capabilities выражают media features**.





#### Вопрос: Что такое retina graphics и какие техники использовать?

**Короткий ответ**

Retina — marketing term для high-density displays. В web важно не название устройства, а effective pixel density. Для
растровых `<img>` используют `srcset`: `x` descriptors при фиксированном rendered size или `w` + `sizes`, когда размер
зависит от layout. Для vector graphics обычно подходит SVG; background images могут использовать `image-set()`.

**Полный ответ**

«Retina» — брендовый/исторический термин. Для web-разработки полезнее говорить о **high-density display** и соотношении
CSS pixels с device pixels.

Одна и та же картинка, растянутая на `200 × 100` CSS pixels, на high-density screen может потребовать resource с большей
intrinsic resolution, чтобы не выглядеть размытой.

Если rendered size известен, `srcset` с density descriptors описывает варианты одного изображения:

```html
<img
  src="avatar-200.jpg"
  srcset="avatar-200.jpg 1x, avatar-400.jpg 2x"
  width="200"
  height="200"
  alt="Профиль пользователя"
/>
```

User agent выбирает candidate не только по nominal screen density: HTML specification позволяет учитывать pixel density,
zoom и другие факторы, включая network conditions.

Если rendered width зависит от responsive layout, обычно правильнее `w` descriptors + `sizes`:

```html
<img
  src="photo-640.jpg"
  srcset="photo-480.jpg 480w, photo-960.jpg 960w, photo-1440.jpg 1440w"
  sizes="(width < 40rem) 100vw, 50vw"
  width="1440"
  height="900"
  alt="Городская площадь"
/>
```

Browser знает candidate intrinsic widths и ожидаемый rendered size, вычисляет effective density и сам выбирает resource.
Это лучше, чем JavaScript-проверка `devicePixelRatio` и ручная замена `src`: browser может начать image preload еще до
выполнения script.

Для SVG отдельный 2x asset обычно не нужен: vector geometry масштабируется без потери четкости. SVG хорошо подходит для
icons, logos и diagram-like graphics, но фотографию не следует превращать в SVG только ради density.

Для CSS background можно использовать `image-set()`:

```css
.hero {
  background-image: image-set(url('/hero.webp') 1x, url('/hero@2x.webp') 2x);
}
```

Не нужно всегда отправлять самый большой raster «на всякий случай»: high-resolution image увеличивает transfer/decode
cost. Responsive images позволяют browser выбрать достаточный, а не максимальный resource.

Также стоит задавать intrinsic `width`/`height` для `<img>`, чтобы browser мог зарезервировать aspect-ratio space до
загрузки и уменьшить layout shift.

На интервью: **retina-specific CSS почти не нужен; решайте задачу density через declarative responsive images,
используйте SVG для vector content и не заставляйте high-DPR devices всегда скачивать максимальный raster**.



### Практика по CSS

- [Примеры Flexbox](/examples/css/flexbox/index.html)
- [Примеры CSS Grid](/examples/css/grid/index.html)

### CSS Flexbox

Практический пример: [`examples/css/flexbox`](/examples/css/flexbox/index.html)



#### Вопрос: Что такое Flexbox?

**Короткий ответ**

Flexbox — одномерная layout model для распределения и выравнивания flex items вдоль main axis с управлением cross-axis
alignment. `display: flex` делает in-flow children flex items; их размеры могут расти, сжиматься и учитывать доступное
пространство.

**Полный ответ**

Flexbox — отдельная CSS layout model, оптимизированная под интерфейсные раскладки. Элемент с `display: flex` становится
flex container, а его in-flow children — flex items.

Главная идея: container раскладывает items вдоль **main axis**, а затем позволяет управлять:

- направлением этой оси через `flex-direction`;
- переносом на несколько flex lines через `flex-wrap`;
- распределением свободного места через flex sizing;
- выравниванием по main/cross axis;
- расстояниями через `gap`.

```css
.toolbar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
```

Flexbox называют **одномерной** моделью не потому, что он всегда рисует одну физическую строку. `flex-wrap` может
создать несколько flex lines, но sizing и распределение элементов выполняются по каждой line отдельно. Между строками
нет общей системы tracks, как в Grid.

Например, карточка может сама быть column flex container:

```css
.card {
  display: flex;
  flex-direction: column;
}
```

а ее footer можно прижать вниз через auto margin. Это типичный пример того, что Flexbox хорошо решает component-level
layout, а не только горизонтальные menus.

Еще один важный момент: физические направления зависят от `writing-mode` и `direction`. `row` следует inline axis,
поэтому фраза «Flexbox — это горизонтальная раскладка» слишком упрощает модель.

На интервью: **Flexbox — одномерная модель, где container управляет main/cross axes, flexing и alignment своих items;
для независимых двухмерных tracks обычно лучше Grid**.

Практика: [`Flexbox: оси и выравнивание`](/examples/css/flexbox/example1/index.html)





#### Вопрос: Какие задачи решает Flexbox?

**Короткий ответ**

Flexbox лучше всего подходит для одномерных component layouts: toolbar, navigation, button group, sidebar/content,
вертикальной карточки и распределения свободного места. Если нужны согласованные строки и колонки одновременно, обычно
лучше Grid.

**Полный ответ**

Flexbox особенно удобен, когда главная задача формулируется как **«расположить набор элементов вдоль одной оси и
правильно распределить свободное место»**.

Типичные сценарии:

- toolbar или navigation row;
- группа кнопок с выравниванием;
- avatar + text + actions;
- sidebar + flexible content;
- вертикальная карточка, где footer должен уйти вниз;
- равномерное распределение items;
- переносимый список tags/chips.

Например, header с гибким центральным блоком:

```css
.header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header__title {
  flex: 1 1 auto;
  min-width: 0;
}
```

Flexbox полезен не только для визуального выравнивания. Его sizing algorithm умеет распределять **positive free space**
и **negative free space**, поэтому элементы могут расти и сжиматься относительно своей flex base size.

Но есть граница применения. Если элементы должны согласованно стоять по строкам **и** колонкам, например dashboard
matrix или таблицеподобный layout, Flexbox часто приводит к ручным widths и синхронизации между отдельными lines. Для
этого Grid обычно выражает намерение лучше.

Еще один anti-pattern — применять Flexbox только ради `display: flex` на каждом wrapper. Layout model стоит выбирать по
задаче: обычный document flow, Flexbox и Grid имеют разные algorithms и semantics размещения.

На интервью: **Flexbox выбирают для one-dimensional distribution/alignment; если появляется необходимость
синхронизировать обе оси, это сигнал проверить Grid**.

Практика: [`Flexbox: оси и выравнивание`](/examples/css/flexbox/example1/index.html)





#### Вопрос: Что такое main axis и cross axis?

**Короткий ответ**

Main axis — основная ось размещения flex items, cross axis ей перпендикулярна. Их физическое направление зависит от
`flex-direction`, `writing-mode` и `direction`: `row` следует inline axis, `column` — block axis.

**Полный ответ**

Flexbox использует flow-relative термины вместо жестких «horizontal/vertical».

**Main axis** — ось, вдоль которой раскладываются flex items. **Cross axis** ей перпендикулярна.

```css
.container {
  display: flex;
  flex-direction: row;
}
```

Для обычного horizontal writing mode `row` визуально идет слева направо при `direction: ltr`, поэтому main axis кажется
горизонтальной. Но формально `row` следует **inline axis**, а `column` — **block axis**.

Из-за этого нужно учитывать writing direction:

```css
.rtl-toolbar {
  direction: rtl;
  display: flex;
  flex-direction: row;
}
```

Здесь main-start находится с другой физической стороны, хотя `flex-direction` по-прежнему `row`.

Связь properties с axes:

- `justify-content` работает вдоль main axis;
- `align-items` / `align-self` — вдоль cross axis;
- `align-content` распределяет flex lines вдоль cross axis у multi-line container.

Поэтому вопрос «почему `justify-content` вдруг центрирует по вертикали?» обычно означает, что container переключили на
`flex-direction: column`: main axis стала соответствовать block axis.

На интервью: **не привязывайте main axis к horizontal, а cross axis к vertical; сначала определите `flex-direction` +
writing mode, затем уже интерпретируйте alignment properties**.

Практика: [`Flexbox: column direction`](/examples/css/flexbox/example2/index.html)





#### Вопрос: Что делает flex-direction?

**Короткий ответ**

`flex-direction` задает main axis и ее направление: `row`, `row-reverse`, `column`, `column-reverse`. `row` следует
inline axis, `column` — block axis; `*-reverse` меняет визуальное направление, но не DOM/source order.

**Полный ответ**

`flex-direction` определяет, какая flow-relative ось станет main axis и где будут main-start/main-end.

Значения:

- `row` — main axis совпадает с inline axis;
- `row-reverse` — та же ось, но main-start/main-end меняются местами;
- `column` — main axis совпадает с block axis;
- `column-reverse` — block axis в обратном направлении.

```css
.stack {
  display: flex;
  flex-direction: column;
}
```

Такой container удобен для вертикального layout карточки или dialog content.

Важно: `row` не означает буквально «left → right». При RTL или другом `writing-mode` физическое направление будет иным.

`row-reverse` и `column-reverse` требуют осторожности:

```css
.actions {
  display: flex;
  flex-direction: row-reverse;
}
```

Они меняют **визуальное** направление flex items, но source order в DOM не переписывают. Screen readers, sequential
keyboard navigation и логический порядок документа могут по-прежнему следовать source order. Поэтому reverse/order не
стоит использовать, чтобы исправлять неправильную семантическую последовательность markup.

Если нужно одновременно задать direction и wrapping, есть shorthand:

```css
.list {
  display: flex;
  flex-flow: row wrap;
}
```

На интервью: **`flex-direction` управляет flow-relative main axis, а reverse — presentation tool, не замена правильному
DOM order**.

Практика: [`Flexbox: column direction`](/examples/css/flexbox/example2/index.html)





#### Вопрос: Что делает flex-wrap?

**Короткий ответ**

`flex-wrap` определяет, будет container single-line (`nowrap`) или сможет создавать несколько flex lines
(`wrap`/`wrap-reverse`). Каждая line выполняет flex sizing отдельно; `align-content` управляет распределением нескольких
lines по cross axis.

**Полный ответ**

По умолчанию flex container имеет `flex-wrap: nowrap`: все items пытаются остаться в одной flex line. Если суммарного
места не хватает, дальше вступают flex shrinking и min-size constraints.

```css
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
```

При `wrap` browser создает дополнительные flex lines, когда items больше не помещаются вдоль main axis.

Значения:

- `nowrap` — одна flex line;
- `wrap` — разрешены новые lines в обычном cross direction;
- `wrap-reverse` — разрешены lines, но cross-start/cross-end меняются местами.

Ключевой нюанс: multi-line Flexbox не превращается в Grid. Каждая flex line раскладывается независимо при распределении
свободного места. Поэтому items во второй строке не обязаны совпадать по ширине с items в первой.

```css
.cards {
  display: flex;
  flex-wrap: wrap;
}

.card {
  flex: 1 1 16rem;
}
```

Если последняя строка содержит меньше карточек, они могут растянуться иначе, чем элементы предыдущих строк. Если нужны
общие column tracks между строками, Grid обычно подходит лучше.

`align-content` относится к **flex lines**, а не отдельным items, и имеет смысл для multi-line container при наличии
свободного места по cross axis. `align-items` при этом продолжает выравнивать items внутри каждой line.

На интервью: **`flex-wrap` создает несколько независимых flex lines; wrapping решает перенос, но не дает двухмерную
track system Grid**.

Практика: [`Flexbox: wrap`](/examples/css/flexbox/example3/index.html)





#### Вопрос: Что делает gap во Flexbox?

**Короткий ответ**

`gap` задает минимальные gutters между flex items и flex lines без добавления отступа по внешним краям container. В row
flexbox `column-gap` разделяет items по main axis, `row-gap` — соседние lines по cross axis; для column направление
меняется.

**Полный ответ**

`gap`, `row-gap` и `column-gap` задают spacing **между** соседними boxes внутри layout context.

```css
.toolbar {
  display: flex;
  gap: 0.75rem;
}
```

В отличие от margin, `gap` принадлежит container и не добавляет такой же отступ перед первым или после последнего item.

Для row flex container:

```css
.tags {
  display: flex;
  flex-wrap: wrap;
  row-gap: 0.75rem;
  column-gap: 0.5rem;
}
```

- `column-gap` оказывается на main axis и разделяет items внутри flex line;
- `row-gap` оказывается на cross axis и разделяет соседние flex lines.

Для `flex-direction: column` соответствие main/cross axes меняется, поэтому не стоит мысленно переводить `row-gap` в
«vertical gap для любого Flexbox».

Еще один нюанс: `gap` задает **минимальный gutter**. Distributed alignment вроде `justify-content: space-between` может
добавить дополнительное свободное пространство между items сверх указанного gap.

```css
.actions {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}
```

Здесь видимое расстояние между controls может быть больше `1rem`.

Margin все еще нужен, когда spacing относится к конкретному item или должен участвовать в auto-margin alignment. `gap`
лучше описывает регулярный внутренний ритм siblings.

На интервью: **`gap` — container-level gutter, а не замена всех margins; в Flexbox его row/column axes нужно
интерпретировать вместе с `flex-direction`**.

Практика: [`Flexbox: row-gap и column-gap`](/examples/css/flexbox/example4/index.html)





#### Вопрос: Что значит flex: 1?

**Короткий ответ**

`flex: 1` — числовая форма shorthand `flex`, концептуально `flex: 1 1 0`: item может расти и сжиматься, а распределение
начинается с нулевой flex basis. Это не означает `width: 100%`. Automatic minimum size все еще действует, поэтому для
сжимаемого контента часто нужен `min-width: 0`.

**Полный ответ**

`flex` — shorthand для трех свойств в порядке `flex-grow`, `flex-shrink`, `flex-basis`.

Для одного положительного числа:

```css
.item {
  flex: 1;
}
```

смысл соответствует:

```css
.item {
  flex: 1 1 0;
}
```

То есть:

- `flex-grow: 1` — item участвует в распределении positive free space;
- `flex-shrink: 1` — item может участвовать в распределении negative free space;
- `flex-basis: 0` — flexing начинается с нулевой базы, а не с preferred/content size.

Поэтому три одинаковых item обычно делят доступное main-axis пространство поровну:

```css
.columns {
  display: flex;
  gap: 1rem;
}

.column {
  flex: 1;
  min-width: 0;
}
```

Важно: `flex: 1` **не равно** `width: 100%`. `width` задает preferred main size, а `flex` участвует в отдельном
алгоритме, который сначала определяет flex base sizes, затем распределяет свободное пространство и применяет min/max
constraints.

Также нулевая basis не отменяет automatic minimum size flex item. Длинная строка, `white-space: nowrap` или широкий
вложенный элемент могут не дать колонке сжаться. Для row Flexbox типичный opt-out:

```css
.column {
  flex: 1;
  min-width: 0;
}
```

В DevTools/browser serialization числовой shorthand может отображаться с `0%` basis. Для понимания layout важнее идея:
**числовой `flex` использует нулевую basis**, в отличие от `flex: auto` (`1 1 auto`).

Сравнение частых shorthand:

```css
.initial {
  flex: initial;
} /* 0 1 auto */
.auto {
  flex: auto;
} /* 1 1 auto */
.none {
  flex: none;
} /* 0 0 auto */
.one {
  flex: 1;
} /* numeric flex, zero basis */
```

На интервью: **`flex: 1` означает не «занять всю ширину», а grow/shrink от нулевой flex basis; итоговый размер все равно
ограничивают siblings, gaps и min/max sizes**.

Практика: [`Flexbox: flex-grow`](/examples/css/flexbox/example7/index.html)





#### Вопрос: Как прижать кнопку или блок к низу карточки через Flexbox?

**Короткий ответ**

Карточку делают flex-контейнером с flex-direction: column, а нужному нижнему блоку задают margin-top: auto. Auto margin
забирает свободное пространство и отталкивает блок к нижнему краю карточки.

**Полный ответ**

Надежный pattern — сделать карточку column flex container, а нижнему блоку отдать свободное место перед ним через auto
margin:

```css
.card {
  display: flex;
  flex-direction: column;
  min-block-size: 18rem;
}

.card__actions {
  margin-block-start: auto;
}
```

В column Flexbox main axis идет по block direction. После того как browser вычислил размеры обычного content, оставшееся
**positive free space** может быть поглощено auto margin. Поэтому `margin-block-start: auto` растягивается и отталкивает
`.card__actions` к main-end.

Физическая запись `margin-top: auto` работает в обычном horizontal writing mode, но logical property лучше выражает
намерение и не привязывает component к конкретному writing mode.

Важно, чтобы у карточки действительно было свободное пространство. Если ее высота равна сумме content, auto margin будет
`0` и ничего визуально не сдвинет. В card grid одинаковую высоту часто дает сам Grid/Flex parent или явный
`min-block-size`.

Этот pattern обычно точнее, чем:

```css
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
```

`space-between` распределяет свободное место **между всеми** flex items. Если между заголовком, описанием и footer есть
несколько элементов, интервалы могут неожиданно растянуться. Auto margin создает один явный flexible separator перед
нужным блоком.

Если content становится выше карточки, footer не накладывается на него: свободного места больше нет, и нижний блок идет
после content в normal flex flow. Если дизайн требует фиксированную высоту с прокруткой body, это уже отдельный
contract: обычно scrollable section получает `min-height: 0` и `overflow: auto`.

На интервью: **auto margin во Flexbox поглощает оставшееся пространство по main axis; для footer карточки это локальнее
и предсказуемее, чем распределять весь content через `space-between`**.

Практика: [`Flexbox: auto margin`](/examples/css/flexbox/example10/index.html)





#### Вопрос: Как центрировать элемент по горизонтали и вертикали через Flexbox?

**Короткий ответ**

Для обычного `flex-direction: row` центрирование по обеим осям задают `justify-content: center` и `align-items: center`.
Но корректнее мыслить main/cross axes: при `column` те же properties поменяют физические направления.

**Полный ответ**

Базовый рецепт центрирования flex item:

```css
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

Но важно понимать **почему** он работает:

- `justify-content: center` распределяет свободное пространство вдоль main axis;
- `align-items: center` задает cross-axis alignment flex items.

При default `flex-direction: row` в horizontal writing mode main axis обычно горизонтальная, а cross axis вертикальная.
Поэтому визуально получается центрирование по X и Y.

Если направление изменить:

```css
.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
```

`justify-content` теперь центрирует вдоль block/main axis, а `align-items` — вдоль inline/cross axis. CSS не меняет
meaning properties на «horizontal/vertical» — меняется mapping axes.

Для вертикального центрирования container должен иметь **свободное пространство** по нужной оси:

```css
.viewport-center {
  min-block-size: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

Если высота container равна высоте content, распределять по вертикали просто нечего.

Для одного item cross-axis alignment можно переопределить через `align-self`. А иногда вместо `justify-content` нужен
auto margin, если надо прижать один элемент к краю, а не распределять всю группу.

На интервью: **центрирование Flexbox — это center по main + cross axes при наличии свободного пространства, а не
магическая пара horizontal/vertical properties**.

Практика: [`Flexbox: центрирование items`](/examples/css/flexbox/example5/index.html)





#### Вопрос: Чем justify-content отличается от align-items?

**Короткий ответ**

`justify-content` распределяет flex items и свободное пространство в каждой flex line вдоль main axis. `align-items`
задает default cross-axis alignment items внутри line; отдельный item может переопределить его через `align-self`.

**Полный ответ**

Главное различие — **какая axis и какой alignment subject**.

`justify-content` работает вдоль main axis и распределяет items **внутри каждой flex line** после того, как sizing
algorithm определил их размеры.

```css
.toolbar {
  display: flex;
  justify-content: space-between;
}
```

Если после sizing осталось положительное свободное место, оно может быть размещено в начале, конце, по центру или
распределено между items.

`align-items` задает default alignment flex items вдоль cross axis:

```css
.toolbar {
  display: flex;
  align-items: center;
}
```

Для отдельного item есть `align-self`:

```css
.toolbar__badge {
  align-self: flex-start;
}
```

Важно не путать `align-items` и `align-content`:

- `align-items` — items внутри flex line;
- `align-content` — сами flex lines внутри multi-line flex container.

Еще один нюанс: `justify-content` не заменяет flex sizing. Если `flex-grow` уже поглотил все positive free space,
`justify-content` может практически не иметь пространства для распределения.

```css
.item {
  flex: 1 1 0;
}
```

Несколько таких items могут занять всю main axis, поэтому `justify-content: space-between` уже нечего распределять между
ними.

На интервью: **`justify-content` = content distribution по main axis; `align-items` = default self-alignment items по
cross axis; `align-content` = alignment flex lines**.

Практика: [`Flexbox: justify-content и align-items`](/examples/css/flexbox/example1/index.html)





#### Вопрос: Почему gap часто удобнее, чем margin между элементами?

**Короткий ответ**

`gap` описывает внутреннее расстояние между соседними элементами на уровне контейнера. Не нужны отдельные правила для
первого или последнего элемента, отрицательные margin и компенсация краев. Margin лучше оставлять для внешнего
расстояния между независимыми блоками.

**Полный ответ**

`gap` принадлежит layout container и задает регулярный gutter **между** соседними flex items или flex lines:

```css
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
```

Если item добавится, удалится или перейдет на следующую line, browser сам сохранит spacing там, где есть соседство. Не
нужны selectors вроде `:not(:last-child)`, отрицательные margins или компенсация внешних краев.

С margin тот же layout часто требует item-level rules:

```css
.actions > *:not(:last-child) {
  margin-inline-end: 0.75rem;
}
```

Такой вариант хуже переживает `flex-wrap`: последний item визуальной строки не обязательно является `:last-child`,
поэтому горизонтальный margin может остаться в неожиданном месте. `gap` знает структуру flex lines и решает эту задачу
на уровне layout algorithm.

Еще одно различие — **ownership**. `gap` говорит: «этот container управляет ритмом своих children». Margin говорит:
«конкретный item требует пространство вокруг себя». Для component architecture первое часто устойчивее: reusable child
не обязан знать, с каким расстоянием его поставят рядом с siblings.

Но `gap` не заменяет margin полностью. Margin нужен, например, когда:

- отступ относится только к одному item;
- нужно внешнее расстояние между независимыми blocks;
- используется auto margin для поглощения free space;
- нужен intentional negative offset.

Также `gap` задает минимальный gutter. Если container использует `justify-content: space-between`, distributed free
space добавится **сверх** gap, поэтому фактическое расстояние между items может быть больше указанного значения.

На интервью: **`gap` — container-owned spacing между items/lines, margin — property конкретного box; для регулярного
внутреннего ритма `gap` обычно проще и лучше переживает динамический content и wrapping**.

Практика: [`Flexbox: gap`](/examples/css/flexbox/example3/index.html)





#### Вопрос: Что делают flex-grow, flex-shrink и flex-basis?

**Короткий ответ**

`flex-basis` задает исходную main size для flexing. Если после bases остается positive free space, его распределяет
`flex-grow`; если места не хватает, negative free space распределяется через `flex-shrink`. Итог дополнительно
ограничивается min/max sizes и automatic minimum size.

**Полный ответ**

Три свойства описывают разные части flex sizing algorithm:

```css
.item {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 12rem;
}
```

### `flex-basis`

Это стартовая **main-axis base size**, от которой алгоритм считает свободное пространство.

Для row container basis относится к width/main size, для column — к height/main size.

```css
.item {
  flex-basis: 12rem;
}
```

До flexing два таких item условно запрашивают по `12rem`.

### `flex-grow`

Работает, когда после учета flex bases остается **positive free space**:

```css
.a {
  flex: 1 1 10rem;
}
.b {
  flex: 2 1 10rem;
}
```

Если есть свободное место, `.b` получает его вдвое быстрее `.a` по отношению grow factors `1:2`. Это отношение долей
**свободного пространства**, а не обещание, что итоговая ширина `.b` всегда будет ровно в два раза больше `.a`.

### `flex-shrink`

Работает, когда сумма bases больше доступной main size и появляется **negative free space**.

```css
.a {
  flex: 0 1 20rem;
}
.b {
  flex: 0 2 20rem;
}
```

Shrink распределяется не только по raw factor. Алгоритм учитывает scaled shrink factor: `flex-shrink × flex base size`.
Это нужно, чтобы маленький item с тем же factor не терял столько же абсолютных pixels, сколько большой.

После распределения item может быть заморожен на `min-width`, `max-width`, `min-height`, `max-height` или automatic
minimum size. Поэтому формула grow/shrink не является последним шагом.

На практике лучше задавать согласованный shorthand:

```css
.sidebar {
  flex: 0 0 18rem;
}
.content {
  flex: 1 1 auto;
}
```

чем менять один longhand и случайно оставить старые значения двух других.

На интервью: **basis определяет старт, grow делит positive free space, shrink делит negative free space; финальный used
size получается после flexing и min/max clamping**.

Практика: [`Flexbox: flex-grow`](/examples/css/flexbox/example8/index.html) и
[`Flexbox: flex-shrink`](/examples/css/flexbox/example6/index.html)





#### Вопрос: Чем flex-basis: 0 отличается от flex-basis: auto?

**Короткий ответ**

`flex-basis: 0` начинает flexing с нулевой базы, поэтому одинаковые grow factors стремятся делить доступное пространство
независимо от preferred width/content size. `flex-basis: auto` сначала берет main-size property (`width`/`height`), а
если она `auto` — content-based size, и уже затем распределяет free space.

**Полный ответ**

Разница в том, **какую стартовую main size item приносит в flex algorithm**.

### `flex-basis: 0`

```css
.item {
  flex: 1 1 0;
}
```

Basis равна нулю. Если несколько items имеют одинаковый grow factor и одинаковые constraints, доступное пространство
распределяется от одинаковой стартовой базы. Это типичный прием для равных колонок.

### `flex-basis: auto`

```css
.item {
  flex: 1 1 auto;
  width: 20rem;
}
```

`auto` сначала берет main-size property: для row Flexbox это обычно `width`, для column — `height`. Если main-size
property сама `auto`, basis становится content-based.

Из-за этого два `flex: 1 1 auto` item с разным содержимым могут закончить flexing с разными размерами:

```css
.short {
  flex: 1 1 auto;
}
.long {
  flex: 1 1 auto;
}
```

Одинаковый `flex-grow: 1` добавляет им одинаковую **долю free space поверх разных bases**, а не делает итоговые размеры
одинаковыми.

С нулевой basis намерение другое:

```css
.short,
.long {
  flex: 1 1 0;
  min-width: 0;
}
```

Теперь starting basis одинакова, но min/max constraints и automatic minimum size по-прежнему могут нарушить визуальное
равенство. Поэтому `min-width: 0` часто идет вместе с этим pattern.

Отдельный edge case: `0` как definite length и `0%` как percentage не абсолютно идентичны при **indefinite main size**
container. Percentage `flex-basis` в таком случае может перейти к content-based sizing. Поэтому в явной трехкомпонентной
записи `flex: 1 1 0` хорошо выражает именно definite zero basis.

На интервью: **`0` говорит «не учитывай preferred/content size как стартовую базу», `auto` говорит «начни с main-size
property или content»**.

Практика: [`Flexbox: flex-grow`](/examples/css/flexbox/example8/index.html)





#### Вопрос: Почему во Flexbox часто нужен min-width: 0?

**Короткий ответ**

У flex item `min-width: auto` по умолчанию. В main axis для non-scrollable item это может дать content-based automatic
minimum size, из-за которой item не сжимается до доступной ширины. `min-width: 0` снимает этот минимум для row Flexbox;
для column аналогичная проблема обычно решается `min-height: 0`.

**Полный ответ**

Частая ситуация:

```css
.row {
  display: flex;
}

.content {
  flex: 1;
}
```

Внутри `.content` появляется длинный URL, `white-space: nowrap`, table или другой элемент с большой intrinsic width — и
родитель неожиданно начинает overflow.

Причина не обязательно в `flex-shrink`. У flex item initial `min-width` равен `auto`, а automatic minimum size в main
axis для non-scrollable item может быть **content-based**. То есть item имеет право сказать flex algorithm: «меньше этой
границы меня не сжимай».

Явный opt-out:

```css
.content {
  flex: 1 1 auto;
  min-width: 0;
}
```

После этого flex item может стать уже своего content-based minimum, а уже внутри можно выбирать нужное overflow
behavior:

```css
.title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

Важно разделять уровни: `min-width: 0` разрешает **flex item** сжаться, а `overflow`/wrapping определяет, что делать с
его **content** после сжатия.

Для column container проблема переезжает в main/block axis:

```css
.page {
  display: flex;
  flex-direction: column;
  block-size: 100dvh;
}

.main {
  flex: 1;
  min-height: 0;
  overflow: auto;
}
```

Здесь `min-height: 0` позволяет `.main` занять оставшуюся высоту вместо растягивания всей страницы содержимым.

Есть нюанс: для flex item с scrollable overflow automatic minimum size в main axis может и так стать zero. Но полагаться
на побочный эффект `overflow` вместо явного sizing intent обычно хуже для читаемости layout.

На интервью: **`min-width: 0` нужен не потому, что Flexbox «плохо shrink-ится», а потому что automatic minimum size
может ограничивать результат flex-shrink**.

Практика: [`Flexbox: flex-shrink`](/examples/css/flexbox/example6/index.html)





#### Вопрос: Как сделать две колонки, где одна занимает фиксированную ширину, а вторая все остальное место?

**Короткий ответ**

Контейнеру задают `display: flex`, sidebar — `flex: 0 0 17.5rem`, а content — `flex: 1 1 auto` и `min-width: 0`. Sidebar
не растет и не сжимается, content получает оставшееся пространство. На узких экранах fixed basis нужно отдельно
адаптировать, иначе layout может overflow.

**Полный ответ**

Базовый pattern:

```css
.layout {
  display: flex;
  gap: 1rem;
}

.sidebar {
  flex: 0 0 17.5rem;
}

.content {
  flex: 1 1 auto;
  min-width: 0;
}
```

`sidebar` расшифровывается так:

- `flex-grow: 0` — не забирает дополнительное свободное место;
- `flex-shrink: 0` — не отдает свою basis при нехватке места;
- `flex-basis: 17.5rem` — стартовая и фактически фиксированная main size.

`content` с `flex: 1 1 auto` может расти и сжиматься. `min-width: 0` важен, если внутри есть длинный content, который
иначе удерживает automatic minimum size.

Этот pattern не означает, что sidebar обязан быть фиксированным на всех viewport. При очень узком container
`flex-shrink: 0` способен вызвать overflow. В responsive UI можно переключить layout:

```css
@media (width < 48rem) {
  .layout {
    flex-direction: column;
  }

  .sidebar {
    flex-basis: auto;
  }
}
```

или сделать sidebar ограниченно гибким через `clamp()`/другую basis, если продукт этого требует.

Если sidebar **разрешено** сжимать, нельзя механически использовать `0 0`: например `flex: 0 1 17.5rem` оставляет grow
выключенным, но разрешает shrink.

На интервью: **fixed + fluid columns — это разные flex contracts: sidebar с контролируемой basis/factors и content,
который поглощает остаток; отдельно продумайте narrow-container behavior**.

Практика: [`Flexbox: flex-grow`](/examples/css/flexbox/example7/index.html)





#### Вопрос: Как сделать равные колонки через Flexbox?

**Короткий ответ**

Для равных flex-колонок обычно используют одинаковый `flex: 1 1 0` и `min-width: 0`. Zero basis убирает влияние
preferred/content width из стартового распределения, а одинаковый grow factor делит free space поровну. Min/max sizes,
padding и intrinsic constraints все еще могут повлиять на фактический внешний размер.

**Полный ответ**

Типичный вариант:

```css
.columns {
  display: flex;
  gap: 1rem;
}

.column {
  flex: 1 1 0;
  min-width: 0;
}
```

Почему не просто `flex-grow: 1`?

У initial `flex-basis` значение `auto`, поэтому разные content/preferred sizes сначала дадут разные bases, и одинаковый
grow factor лишь добавит одинаковую долю оставшегося пространства поверх них.

`flex: 1 1 0` начинает все items с одинаковой нулевой basis. При одинаковых grow factors positive free space делится
равными долями.

Но «равные flex values» не отменяют constraints:

```css
.column--featured {
  min-width: 20rem;
}
```

Такой item может быть зафиксирован minimum size, после чего алгоритм перераспределит пространство между остальными.
Automatic minimum size делает похожее неявно, поэтому для контентных колонок часто нужен `min-width: 0`.

Padding/borders тоже относятся к box model. Если у колонок разное оформление, одинаковый flexed content size не всегда
означает одинаковую визуальную outer width. Для строгого равенства лучше держать одинаковую box structure или переносить
разное внутреннее оформление во вложенный элемент.

Если задача именно «N согласованных равных tracks», особенно между несколькими строками, Grid выражает ее прямее:

```css
.columns {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}
```

Flexbox удобен, когда это одна flex line или когда content distribution важнее общей двухмерной сетки.

На интервью: **для равных flex items используйте одинаковый grow + zero basis, но помните, что min/max/automatic minimum
sizes могут вмешаться; для настоящих равных tracks часто лучше Grid**.

Практика: [`Flexbox: flex-grow`](/examples/css/flexbox/example7/index.html)





#### Вопрос: Какие типичные ошибки бывают при использовании Flexbox?

**Короткий ответ**

Частые ошибки: путать main axis и cross axis, ждать от Flexbox полноценной двумерной сетки, забывать про flex-wrap,
использовать margin вместо gap для внутренних расстояний, не учитывать flex-shrink и не задавать min-width: 0 для
колонок с длинным контентом.

**Полный ответ**

Типичные Flexbox bugs обычно появляются не из-за одного «плохого property», а из-за неправильной mental model layout.

**1. Путать физические направления с main/cross axes.**

`justify-content` не означает «по горизонтали», а `align-items` — «по вертикали». После `flex-direction: column` mapping
меняется. Сначала нужно определить main axis, потом выбирать alignment property.

**2. Использовать Flexbox как двухмерную сетку.**

`flex-wrap` создает несколько независимых flex lines. Колонки между строками не образуют общие tracks, поэтому карточки
могут иметь разные widths в разных lines. Если нужно согласование и rows, и columns, обычно лучше Grid.

**3. Забывать про wrapping и shrink.**

По умолчанию container имеет `flex-wrap: nowrap`, а items — `flex-shrink: 1`. Поэтому controls могут неожиданно сжаться
вместо переноса:

```css
.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
```

Если конкретный item нельзя сжимать, это тоже нужно выразить явно через подходящий `flex` contract, а не случайный
`width`.

**4. Считать `flex-shrink` единственной причиной overflow.**

Даже item с разрешенным shrink может удерживаться automatic minimum size:

```css
.content {
  flex: 1 1 auto;
  min-width: 0;
}
```

Для column Flexbox аналогичная проблема часто требует `min-height: 0`. Это особенно заметно с длинными строками, tables,
images и вложенными scroll containers.

**5. Ожидать, что `flex: 1` автоматически делает любые элементы визуально одинаковыми.**

На итоговый размер все еще влияют min/max constraints, automatic minimum size, padding/borders и выбранная flex basis.
Для равных columns намерение лучше выразить согласованным `flex: 1 1 0` + подходящими min-size constraints или перейти
на Grid, если нужны настоящие tracks.

**6. Использовать `order` или `*-reverse` для исправления неправильного DOM order.**

Flexbox может поменять visual order, но это не переписывает source order. Keyboard navigation и assistive technologies
могут сохранить логическую последовательность DOM, поэтому semantic order должен быть правильным без CSS-reordering.

**7. Решать container spacing item-level margins без необходимости.**

Для регулярного расстояния между siblings `gap` обычно проще и лучше работает с wrapping. Margin остается правильным,
когда отступ принадлежит конкретному item или нужен auto margin.

При отладке полезно проверять не только declarations самого item, но и `flex-direction`, `flex-wrap`, computed
`flex-basis`, min/max sizes и наличие реального free space в container.

На интервью: **сильный ответ связывает симптомы с алгоритмом: axes → alignment, basis/grow/shrink → sizing, automatic
minimum size → overflow, flex lines → wrapping, source order → accessibility**.

Практика: [`Примеры Flexbox`](/examples/css/flexbox/index.html)
