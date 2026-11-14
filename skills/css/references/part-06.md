# CSS — вопросы и ответы, часть 6

> Автоматически сгенерировано из src/pages/css/index.md. Не редактируйте вручную.

#### Вопрос: Что такое repaint?

**Короткий ответ**

Paint рисует пиксели для фона, текста, border, shadow и других визуальных свойств. Он может выполняться без нового
layout, если геометрия не изменилась. Большие painted areas и сложные эффекты увеличивают стоимость.

**Полный ответ**

Repaint — разговорное название повторного **paint** для области, чья визуальная часть изменилась, но geometry может
остаться прежней.

Например:

```css
.button.is-active {
  background: tomato;
}
```

Если размер и position button не меняются, новый layout обычно не нужен, но browser должен обновить ее visual output.

На paint stage engine формирует drawing commands для:

- backgrounds;
- text;
- borders;
- shadows;
- images;
- decorations.

Дальше эти commands могут rasterize-иться в pixels/tiles, а затем compositor собирает итоговый frame. Конкретное
разделение paint/raster/composite зависит от browser engine, поэтому полезно мыслить pipeline как модель, а не как
жесткие три функции.

Стоимость repaint зависит от **painted area и эффекта**, а не только от числа измененных properties. Маленькая смена
color на icon обычно дешева; большой blurred shadow/filter поверх viewport может быть заметно дороже.

Browser также умеет invalidation: при изменении одного element не обязательно repaint-ить весь document. Но large
overlapping areas, clipping и effects могут расширить affected region.

Paint можно увидеть в Performance tooling/paint flashing. Оптимизация без measurement часто приводит к лишним hacks.

На интервью: **repaint — повторная отрисовка visual pixels/paint commands без обязательного пересчета geometry; его цена
зависит от площади, effects и того, какую region engine признал invalid**.





#### Вопрос: Что такое compositing?

**Короткий ответ**

Compositing собирает ранее нарисованные слои в итоговый кадр, применяя трансформации и прозрачность. Эту работу часто
можно передать compositor thread/GPU. Но создание и хранение слоев расходует память.

**Полный ответ**

Compositing — этап, на котором browser собирает **ранее подготовленные painted/rasterized surfaces** в итоговый frame.

Упрощенно pipeline можно представить так:

```text
style -> layout -> paint -> raster -> composite
```

Но реальные engines могут делать часть работы параллельно и хранить content tiles/layers сложнее этой схемы.

Compositor особенно полезен, когда visual content не нужно рисовать заново, а достаточно изменить положение/opacity
готовой surface:

```css
.toast {
  transform: translateY(var(--offset));
  opacity: var(--opacity);
}
```

Если element находится на подходящем compositor layer, следующий frame может свестись к обновлению transform/opacity и
сборке layers.

Но layer — не бесплатная оптимизация:

- surface занимает memory;
- ее нужно rasterize;
- большие textures нужно хранить/upload-ить;
- overlaps/clip/filter могут усложнить composition;
- слишком много layers создают overhead.

Важно также не считать DOM element и compositor layer одним и тем же. Engine сам строит internal layer structure и может
объединять или разделять content по своим heuristics.

Поэтому «compositing происходит на GPU» тоже слишком грубое утверждение. GPU часто участвует в raster/composite, но
browser architecture и fallback path зависят от platform/engine.

На интервью: **compositing собирает готовые surfaces/layers в frame и иногда позволяет менять transform/opacity без
layout/paint, но promotion и hardware acceleration определяет browser, а layers имеют memory/raster cost**.





#### Вопрос: Чем reflow отличается от repaint?

**Короткий ответ**

Reflow пересчитывает геометрию и обычно приводит к последующему paint. Repaint меняет пиксели без обязательного
пересчета размеров. Compositing может обновить итоговый кадр без обоих этапов для подходящих свойств.

**Полный ответ**

Reflow/layout и repaint/paint меняют разные части rendering pipeline.

**Layout/reflow** отвечает за geometry:

- где находится box;
- какого он размера;
- как распределено доступное место;
- где переносятся строки;
- как вычисляются tracks/flex sizes.

**Paint/repaint** отвечает за visual appearance уже известной geometry:

- color/background;
- border;
- text drawing;
- shadow;
- images и decorations.

Например:

```js
element.style.width = '20rem';
```

изменяет geometry и обычно требует layout, после которого affected content может потребовать paint.

А:

```js
element.style.backgroundColor = 'tomato';
```

обычно не меняет geometry и может ограничиться paint.

Есть и третий важный путь — **compositing**. Для некоторых transforms/opacity browser может переиспользовать уже
rasterized layer и собрать новый frame без нового layout и без repaint его contents.

Полезная модель:

```text
geometry changed
  -> style/layout
  -> usually paint
  -> composite

visual pixels changed, geometry same
  -> paint
  -> composite

only compositor state changed
  -> composite
```

Это не абсолютная таблица CSS properties. Реальный engine может принять другое решение из-за layer structure, filters,
containment или implementation details. Поэтому списки «property X всегда вызывает только paint» полезны как ориентир,
но не как specification guarantee.

На интервью: **reflow пересчитывает geometry, repaint обновляет visual output без обязательного layout, compositing
может переиспользовать готовые surfaces; layout обычно дороже из-за dependency geometry, но оптимизировать нужно по
trace**.





#### Вопрос: Какие CSS-свойства чаще вызывают layout?

**Короткий ответ**

Свойства размеров и геометрии: width, height, margin, padding, border, position offsets, font metrics и изменения DOM.
Точная область пересчета зависит от layout и containment. Проверять нужно в Performance panel.

**Полный ответ**

Layout нужен, когда изменение может поменять **геометрию** element или его соседей/descendants. Чаще всего это свойства
размеров, spacing, positioning и font metrics.

Типичные примеры:

- `width`, `height`, `min-*`, `max-*`;
- `margin`, `padding`, `border-width`;
- `top`, `right`, `bottom`, `left` для positioned elements;
- `display`, `position`;
- свойства Grid/Flexbox, меняющие tracks или распределение свободного места;
- `font-size`, `font-family`, `line-height`, если меняются text metrics;
- добавление/удаление DOM nodes.

Например:

```js
panel.style.width = '30rem';
```

может изменить ширину panel, перенос текста и размеры descendants, поэтому browser должен пересчитать affected layout.

Но список нельзя воспринимать как таблицу «property X всегда вызывает полный reflow страницы». Engine делает
invalidation и может пересчитать только часть layout tree. На scope влияют:

- тип layout;
- dependency между parent/child sizes;
- intrinsic sizing;
- containment;
- изменившийся subtree;
- implementation конкретного browser.

Например, `contain: layout` или `contain: size` может уменьшить область dependency, если semantics component позволяют
использовать containment.

Есть отдельная проблема **forced synchronous layout**. Browser обычно старается отложить geometry work до следующего
frame, но JavaScript может потребовать актуальный размер сразу:

```js
box.style.width = '20rem';
console.log(box.offsetWidth);
```

Тогда engine может выполнить style/layout немедленно, чтобы вернуть корректное значение.

Поэтому производительность оценивают не по одной строке CSS, а по trace: сколько layout events произошло, сколько они
заняли и какой subtree был затронут.

На интервью: **layout чаще вызывают свойства, меняющие geometry или layout dependencies; важно различать обычную
invalidation и forced synchronous layout, а реальный scope пересчета подтверждать Performance tooling**.





#### Вопрос: Какие CSS-свойства чаще вызывают paint?

**Короткий ответ**

Цвета, backgrounds, borders, shadows и часть filters обычно требуют paint, но не layout. Чем больше область и сложнее
эффект, тем дороже операция. Реальная pipeline зависит от браузера и layer structure.

**Полный ответ**

Paint нужен, когда geometry может остаться прежней, но меняется **визуальное содержимое pixels**.

Типичные кандидаты:

- `color` и `background-*`;
- `border-color` / часть border styling;
- `box-shadow`;
- `text-shadow`;
- gradients;
- outlines/decorations;
- часть filter/effect scenarios.

Например:

```css
.button.is-active {
  background: tomato;
  color: white;
}
```

Размер button может не измениться, но browser должен обновить ее visual output.

Цена paint зависит не столько от имени property, сколько от **области и сложности эффекта**. Перекрасить маленькую icon
обычно дешево. Большой blur/shadow или effect на большую часть viewport может быть заметно дороже.

Paint также связан с invalidation regions: engine старается перерисовать только нужную область, но overlaps, clipping,
filters и layer structure могут расширить work.

Важно не превращать списки вроде «background = paint» в specification guarantee. Rendering engines меняются, некоторые
эффекты могут быть cached или обработаны иначе, а animation конкретного property может иметь отдельную optimized path.

Практический способ проверить:

1. записать Performance trace;
2. найти Paint events;
3. посмотреть paint duration/affected region;
4. при необходимости включить Paint flashing/Layers tooling.

Если animation можно выразить через compositor-friendly transform/opacity без изменения pixels, browser иногда способен
обойти новый paint. Но это зависит от compositing setup.

На интервью: **paint чаще нужен при изменении visual pixels без новой geometry; его стоимость определяется площадью,
effects и invalidation region, поэтому проверять нужно реальный browser trace, а не только property checklist**.





#### Вопрос: Почему transform и opacity обычно лучше для анимаций?

**Короткий ответ**

Они часто применяются на этапе compositing без повторного layout и paint содержимого. Это уменьшает работу main thread и
делает кадры стабильнее. Гарантии нет: сложная сцена и лишние layers тоже могут быть дорогими.

**Полный ответ**

`transform` и `opacity` удобны для animation потому, что browser **часто может** менять их на compositor stage, не
пересчитывая geometry и не перерисовывая содержимое element для каждого frame.

Например:

```css
.card {
  transition:
    transform 180ms,
    opacity 180ms;
}

.card.is-leaving {
  transform: translateY(0.5rem);
  opacity: 0;
}
```

Если card находится на подходящей composited surface, frame может свестись к изменению transform/alpha этой surface и
повторному composite.

Сравните с animation ширины:

```css
.card {
  transition: width 180ms;
}
```

Изменение `width` влияет на geometry, поэтому может потребовать layout, затем paint и composite на каждом frame.

Однако формулировка «transform и opacity всегда выполняются на GPU» неверна.

- Browser сам решает, создавать ли отдельный layer.
- Layer сначала нужно paint/rasterize.
- Большие surfaces расходуют memory.
- Filters, clipping, descendants и overlaps могут усложнить pipeline.
- Одновременно тяжелый JavaScript на main thread все равно способен испортить responsiveness.
- Изменение content внутри layer может потребовать repaint/rasterization.

Есть и semantic difference: `transform` меняет visual position, но не участвует в обычном document flow. Если соседние
elements должны реально перестроиться, transform может быть просто неправильным инструментом.

Поэтому transform/opacity — хороший default для purely visual motion/fades, а не универсальная замена layout animations.

На интервью: **transform/opacity часто позволяют ограничить update compositing stage и избежать layout/paint contents,
но это browser optimization, а не гарантия GPU; применять их нужно там, где visual transform соответствует semantics
UI**.





#### Вопрос: Что выполняется на CPU, а что может уйти на GPU?

**Короткий ответ**

JavaScript, style calculation и layout в основном выполняются CPU/main thread. GPU часто ускоряет rasterization и
compositing слоев. Он не делает произвольную CSS-анимацию бесплатной и не исправляет long JavaScript tasks.

**Полный ответ**

У web rendering нет простой границы «CSS = GPU, JavaScript = CPU». Работа распределяется между main thread, compositor,
raster workers и GPU process в зависимости от browser architecture.

Упрощенная модель:

**Main thread / CPU** обычно занимается:

- JavaScript;
- style calculation;
- layout;
- построением paint records/display lists;
- частью DOM/event work.

**Raster/compositor infrastructure** может выполнять:

- rasterization tiles;
- загрузку/хранение textures;
- transforms и blending composited surfaces;
- final composition frame.

GPU часто ускоряет rasterization и compositing, но детали зависят от engine/platform. Поэтому лучше говорить «может быть
hardware accelerated», а не «это CSS-свойство выполняется на GPU».

Например, animation `transform` может быть compositor-friendly:

```css
.panel {
  transform: translateX(var(--x));
}
```

но если content panel постоянно меняется, browser все равно может repaint/rasterize surface.

Обратный пример: heavy JavaScript loop:

```js
while (performance.now() - start < 100) {
  // blocking work
}
```

не становится быстрее от GPU. Main thread остается занят, input/event handling и часть rendering pipeline могут
задерживаться.

Еще один trade-off — memory. Promotion большого количества elements в layers может снизить main-thread paint work, но
увеличить GPU/shared memory и compositing overhead.

Поэтому optimization strategy:

1. найти bottleneck в Performance trace;
2. понять, это scripting, style/layout, paint/raster или composite;
3. исправлять именно этот этап.

На интервью: **CPU/main thread обычно отвечает за JS, style и layout; GPU/compositor может ускорять raster/composite, но
граница implementation-specific. Hardware acceleration не исправляет long JS tasks и сама имеет memory/compositing
cost**.





#### Вопрос: Что такое compositor layer?

**Короткий ответ**

Это поверхность, которую браузер может независимо перемещать и смешивать при сборке кадра. Layers полезны для
анимируемых элементов, fixed content и video. Каждый слой требует памяти и может увеличить raster/compositing work.

**Полный ответ**

Compositor layer — внутренняя browser surface, которую engine может **rasterize отдельно и затем независимо
compositить** при сборке frame.

Важно: compositor layer не равен DOM element.

Один DOM subtree может попасть в одну surface, несколько elements могут быть объединены, а часть subtree может получить
отдельный layer из-за video, transform, scrolling, stacking/effects или других engine-specific причин.

Полезный сценарий — moving UI:

```css
.drawer {
  transform: translateX(var(--offset));
}
```

Если drawer уже rasterized в отдельной surface, compositor может двигать готовое изображение, не заставляя browser
перерисовывать все descendants для каждого frame.

Плюсы независимого layer:

- animation transform/opacity иногда обходится без layout/paint contents;
- repaint одного layer может меньше затрагивать соседние surfaces;
- часть work может происходить независимо от main-thread rendering.

Цена:

- layer занимает memory;
- его нужно rasterize;
- large surfaces создают texture/tile cost;
- слишком много layers увеличивают compositing complexity;
- при изменении содержимого surface может потребоваться новый raster.

Также отдельный layer способен менять практическое поведение stacking/overlap optimizations, поэтому искусственно
«промоутить» все elements бессмысленно.

В DevTools Layers/Performance можно посмотреть, какие surfaces создал конкретный browser и почему. Именно это надежнее
догадок по CSS source.

На интервью: **compositor layer — browser-managed raster surface для независимого compositing; он может ускорить visual
updates, но имеет memory/raster cost и не имеет отношения один-к-одному с DOM nodes**.





#### Вопрос: Что такое layer promotion?

**Короткий ответ**

Браузер решает вынести элемент в отдельный compositor layer из-за transform, animation или других эвристик. Разработчик
может подсказать намерение через will-change, но итог контролирует engine. Promotion нужно подтверждать Layers panel.

**Полный ответ**

Layer promotion — ситуация, когда browser решает разместить content в **отдельной composited surface/layer**, чтобы
обрабатывать его независимо от части остальной страницы.

Причины могут включать:

- active transform/animation;
- video/canvas и другие special content types;
- scrolling/fixed content;
- overlap/stacking requirements;
- hints вроде `will-change`;
- внутренние heuristics engine.

Разработчик не управляет promotion напрямую через стандартный API. Даже популярный hack:

```css
.element {
  transform: translateZ(0);
}
```

не означает стандартизированную команду «создать GPU layer». Browser имеет право выбрать другую strategy.

Зачем promotion вообще полезен? Например, menu, который постоянно двигается:

```css
.menu {
  transform: translateY(var(--offset));
}
```

может быть rasterized заранее, а animation frames будут менять только положение surface.

Но promotion имеет startup cost: layer нужно подготовить, rasterize и сохранить в memory. Поэтому promotion в момент
первого frame animation тоже может вызвать jank — одна из причин, зачем существует `will-change` как advance hint.

Over-promotion вреден: десятки/сотни больших layers расходуют memory и увеличивают raster/composite work.

Проверять результат нужно через browser tooling, а не по наличию transform в stylesheet.

На интервью: **layer promotion — browser decision вынести content в отдельную composited surface; это optimization
heuristic, не гарантированный эффект конкретного CSS hack, и его выгода всегда сравнивается с memory/raster overhead**.





#### Вопрос: Что делает will-change?

**Короткий ответ**

Он заранее сообщает браузеру, какое свойство скоро изменится, чтобы подготовить оптимизацию. Использовать его следует
незадолго до анимации и для ограниченного числа элементов. После завершения долгой подготовки hint можно убрать.

**Полный ответ**

`will-change` — это **hint user agent**, какие свойства или тип поведения скоро изменятся. Он позволяет browser заранее
выполнить потенциально дорогую подготовку к update.

Например:

```css
.card.is-about-to-animate {
  will-change: transform;
}
```

Browser может заранее выбрать подходящую rendering strategy, подготовить compositing resources или выполнить другую
оптимизацию до начала animation.

Ключевое слово — **может**. Спецификация не требует конкретной optimization и тем более не обещает отдельный GPU layer.
Разные browsers и даже разные ситуации в одном browser могут использовать hint по-разному.

Правильный lifecycle обычно выглядит так:

1. определить реальную performance проблему;
2. незадолго до animation добавить `will-change`;
3. дать browser немного времени подготовиться;
4. выполнить animation;
5. убрать hint, когда постоянная оптимизация больше не нужна.

Например:

```js
card.addEventListener('pointerenter', () => {
  card.style.willChange = 'transform';

  requestAnimationFrame(() => {
    card.classList.add('is-open');
  });
});

card.addEventListener('transitionend', () => {
  card.style.willChange = 'auto';
});
```

В реальном component lifecycle timing может быть другим; смысл в том, чтобы не держать hint бесконечно без причины.

Еще один nuance: `will-change` может заранее создавать side effects, связанные с property. Например, для properties,
которые при non-initial value создают stacking context, browser может создать его заранее. MDN отдельно предупреждает об
этом.

Значения включают `auto`, `scroll-position`, `contents` и имена animatable features/properties.

На интервью: **`will-change` заранее сообщает browser о будущем изменении, но не диктует конкретную optimization; его
используют точечно после measurement и обычно включают незадолго до изменения, а не держат глобально постоянно**.





#### Вопрос: Почему will-change нельзя ставить на все элементы?

**Короткий ответ**

Браузер может создать слишком много слоев и потратить GPU memory. Это увеличивает rasterization, compositing и иногда
ухудшает производительность сильнее исходной проблемы. will-change — точечный hint, а не reset.

**Полный ответ**

`will-change` может заставить browser **дольше сохранять подготовленные optimization resources**, поэтому массовое
использование способно сделать страницу медленнее, а не быстрее.

Например, такой rule — антипаттерн:

```css
* {
  will-change: transform;
}
```

или:

```css
.card {
  will-change: transform;
}
```

если на странице тысячи cards, которые почти никогда не анимируются.

Почему это плохо:

**Memory.** Browser может держать дополнительные surfaces/layers/resources.

**Raster/compositing overhead.** Больше независимых surfaces означает больше работы по их подготовке и сборке.

**Optimization перестает быть временной.** Browser обычно сам включает/убирает internal optimizations по необходимости,
а permanent `will-change` говорит, что изменение ожидается постоянно.

**Visual side effects.** Некоторые hints могут заранее повлиять на stacking context/rendering behavior.

MDN рекомендует использовать `will-change` sparingly и как last resort для уже найденной performance проблемы, а не как
premature optimization.

Практический pattern:

```js
function prepare(element) {
  element.style.willChange = 'transform';
}

function cleanup(element) {
  element.style.willChange = 'auto';
}
```

При этом не обязательно буквально переключать property для каждой короткой transition: если component постоянно и часто
анимируется, trade-off может быть другим. Решение принимают по measurement.

Также нельзя считать отсутствие `will-change` упущенной оптимизацией: modern browsers уже сами применяют rendering
heuristics. Спецификация описывает property именно как advance hint, а не обязательный механизм layer creation.

На интервью: **массовый `will-change` тратит memory/resources и может увеличить compositing complexity; это точечный
advance hint для измеренной проблемы, а не performance reset для всей страницы**.





#### Вопрос: Почему top/left часто хуже для анимаций, чем transform?

**Короткий ответ**

Offsets меняют геометрию positioned element и могут запускать layout и paint. Transform обычно перемещает готовый слой
на этапе compositing. Итог зависит от элемента, поэтому анимацию измеряют.

**Полный ответ**

`top`/`left` меняют **layout position** positioned element, поэтому animation этих offsets может потребовать layout и
последующий paint на каждом frame. `transform` меняет visual transform уже после layout и часто может обрабатываться на
compositor stage.

Например:

```css
/* geometry меняется */
.box {
  position: relative;
  left: 0;
  transition: left 200ms;
}

.box.is-open {
  left: 10rem;
}
```

Для такого transition browser должен учитывать новое положение box в layout model.

Вариант с transform:

```css
.box {
  transform: translateX(0);
  transition: transform 200ms;
}

.box.is-open {
  transform: translateX(10rem);
}
```

не меняет положение element в normal flow. Если browser может переиспользовать rasterized surface, animation иногда
ограничивается compositing.

Но «transform всегда быстрее» — слишком сильное правило.

**Semantics важнее optimization.** Если соседние elements действительно должны перестроиться, transform даст визуальное
смещение без изменения layout и будет неправильным решением.

**Promotion не гарантирован.** Browser сам выбирает layer strategy.

**Большие layers тоже дороги.** Moving huge surface может стоить заметного compositing/raster memory.

**Visual quality может отличаться.** Fractional transforms иногда меняют rasterization текста/edges; это нужно
проверять.

Поэтому для decorative motion, drawer, tooltip, toast, drag preview и fade/slide effects transform обычно хороший
default. Для настоящего layout transition сначала стоит проверить, нельзя ли изменить product interaction или
использовать современный механизм animation layout с приемлемой стоимостью.

На интервью: **`top`/`left` меняют geometry и часто ведут к layout/paint, а `transform` меняет visual presentation и
часто может остаться на compositing stage; выбирать transform нужно только когда visual movement соответствует
semantics**.





#### Вопрос: Почему box-shadow и filter могут быть дорогими?

**Короткий ответ**

Они требуют вычисления пикселей вокруг элемента, размытия и дополнительных offscreen surfaces. Большой blur radius и
анимация на крупной области особенно дороги. Иногда дешевле использовать подготовленный asset или меньшую область.

**Полный ответ**

`box-shadow` и `filter` могут быть дорогими, потому что их стоимость зависит от **числа обрабатываемых pixels**, blur
radius, размера области и частоты обновления.

Например, большой shadow:

```css
.card {
  box-shadow: 0 2rem 6rem rgb(0 0 0 / 0.35);
}
```

может заставить engine обрабатывать область заметно больше самого card. Чем больше blur/spread и painted area, тем выше
стоимость raster/paint.

С `filter: blur(...)` ситуация похожа:

```css
.backdrop {
  filter: blur(20px);
}
```

Blur требует учитывать соседние pixels для каждого output pixel. На большой surface и особенно при animation это может
стать bottleneck.

Важно не сводить правило к «shadow всегда CPU paint, filter всегда GPU». Современный browser может использовать разные
optimized paths, offscreen surfaces и hardware acceleration. Даже GPU shader остается вычислительной работой, и большой
blur может выйти за frame budget.

Особенно рискованные сценарии:

- animation blur radius;
- shadow/filter на fullscreen surface;
- несколько overlapping translucent layers;
- effect на content, который сам постоянно меняется;
- большие retina/high-density surfaces.

Практические способы уменьшить cost:

- уменьшить blur radius и affected area;
- не анимировать expensive effect каждый frame, если тот же visual result можно получить через opacity/transform;
- вынести static glow/shadow в pseudo-element и анимировать его opacity;
- использовать заранее подготовленный asset, если это действительно дешевле и не ухудшает responsive quality;
- измерять в Performance panel на target devices.

Например:

```css
.card::before {
  position: absolute;
  inset: 0;
  box-shadow: 0 2rem 6rem rgb(0 0 0 / 0.35);
  content: '';
  opacity: 0;
  transition: opacity 200ms;
}

.card:hover::before {
  opacity: 1;
}
```

Здесь сложный shadow можно rasterize как более стабильный visual layer, а animation свести к opacity — если конкретный
browser действительно выберет подходящую compositing strategy.

На интервью: **дорогими являются не названия `box-shadow`/`filter` сами по себе, а большая pixel area, blur и частые
updates; оптимизацию подтверждают trace, а не предположением CPU vs GPU**.





#### Вопрос: Что такое layout thrashing?

**Короткий ответ**

Это повторное чередование DOM writes и layout reads, вынуждающее браузер синхронно пересчитывать геометрию много раз за
кадр. Проблема часто возникает в циклах. Чтения и записи нужно группировать.

**Полный ответ**

Layout thrashing — это серия **forced synchronous layouts**, возникающая при чередовании DOM/style writes и geometry
reads в одном task/цикле.

Плохой pattern:

```js
for (const item of items) {
  item.style.width = `${container.offsetWidth}px`;
}
```

На первой итерации browser читает `offsetWidth`. После записи `style.width` layout становится dirty. На следующей
итерации снова нужен актуальный `offsetWidth`, поэтому engine может синхронно применить pending style changes и
выполнить layout. Цикл превращается в:

```text
read -> write -> forced layout -> write -> forced layout -> ...
```

Это хуже обычного layout, потому что browser теряет возможность batching-ить работу до конца JavaScript task/начала
следующего frame.

Layout-triggering reads могут включать, в зависимости от ситуации:

- `offsetWidth` / `offsetHeight`;
- `clientWidth` / `clientHeight`;
- `getBoundingClientRect()`;
- часть computed style reads;
- другие geometry APIs, которым нужен актуальный layout.

Правильная стратегия — **read first, write later**:

```js
const width = container.offsetWidth;

for (const item of items) {
  item.style.width = `${width}px`;
}
```

Теперь geometry read выполняется один раз до invalidating writes.

Еще лучше — по возможности вообще не вычислять layout из JavaScript, если задачу можно выразить CSS:

```css
.list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
}
```

Современный Chrome DevTools умеет отдельно подсвечивать forced reflow/forced synchronous layout в Performance trace, что
помогает найти call stack, который инициировал проблему.

На интервью: **layout thrashing — repeated write/read cycles, которые заставляют browser делать layout синхронно много
раз вместо одного batched calculation; основной прием — сгруппировать reads перед writes и уменьшить JS-driven
geometry**.





#### Вопрос: Как избежать layout thrashing?

**Короткий ответ**

Сначала прочитать необходимые размеры, затем пакетно изменить DOM. Для кадра использовать requestAnimationFrame, для
списков — class changes вместо множества inline writes. Профилировщик покажет forced synchronous layout.

**Полный ответ**

Главное правило — **не чередовать geometry reads и DOM/style writes**.

Плохой код:

```js
for (const item of items) {
  item.classList.add('expanded');
  console.log(item.offsetHeight);
}
```

Каждый class write может invalidate layout, а следующий `offsetHeight` требует актуальную geometry.

Лучше сначала собрать reads:

```js
const heights = items.map((item) => item.offsetHeight);

items.forEach((item, index) => {
  item.style.setProperty('--previous-height', `${heights[index]}px`);
  item.classList.add('expanded');
});
```

Практические приемы:

1. **Batch reads, затем batch writes.** Не смешивать их в одном tight loop.
2. **Кэшировать geometry**, если значение не обязано быть пересчитано после каждого write.
3. **Использовать CSS layout** вместо ручного JS sizing, когда это возможно.
4. **Менять class/state целиком**, а не делать десятки последовательных inline writes.
5. **Использовать ResizeObserver** для реакции на реальное изменение size вместо polling/частых manual reads.
6. **Профилировать**, потому что не каждый geometry read обязательно вызывает layout: проблема возникает, когда layout
   уже invalidated и read требует свежего значения.

`requestAnimationFrame` полезен для синхронизации visual updates с frame, но сам по себе **не лечит thrashing**:

```js
requestAnimationFrame(() => {
  element.style.width = '20rem';
  console.log(element.offsetWidth); // все еще write -> read
});
```

Внутри одного callback по-прежнему можно принудительно запустить synchronous layout.

Если нужно разделить работу между frames/tasks, важно понимать UX cost: перенос write на следующий frame может добавить
visual latency. Поэтому first choice — правильно упорядочить reads/writes, а не механически добавлять timers.

На интервью: **избегают thrashing через read-before-write batching, CSS-native layout и кэширование geometry;
`requestAnimationFrame` помогает планировать frame work, но не отменяет forced layout при write-then-read внутри
callback**.





#### Вопрос: Почему чтение offsetWidth после записи стилей может быть проблемой?

**Короткий ответ**

После write вычисленные размеры становятся устаревшими. Чтение offsetWidth требует актуального значения и заставляет
браузер немедленно завершить style/layout вместо отложенной пакетной работы. Повторение этого паттерна создает forced
reflow.

**Полный ответ**

После изменения DOM/style browser обычно не обязан немедленно пересчитывать layout. Он может пометить geometry как dirty
и выполнить style/layout позже, ближе к rendering update.

Например:

```js
element.style.width = '20rem';
```

может только invalidate layout.

Но следующая строка требует **свежего вычисленного значения**:

```js
const width = element.offsetWidth;
```

Чтобы вернуть корректный `offsetWidth`, browser может быть вынужден прямо внутри JavaScript выполнить pending style
recalculation и layout. Это называют forced synchronous layout/forced reflow.

Само единичное чтение не обязательно проблема. Дорого становится, когда pattern повторяется:

```js
for (const item of items) {
  item.style.width = `${item.offsetWidth + 10}px`;
}
```

Здесь каждая итерация потенциально создает новый write -> read dependency.

Лучше:

```js
const widths = items.map((item) => item.offsetWidth);

items.forEach((item, index) => {
  item.style.width = `${widths[index] + 10}px`;
});
```

Все reads используют еще актуальную geometry до того, как writes сделали layout dirty.

Nuance: browser rendering pipeline оптимизирован и implementation-specific. Не каждое обращение к `offsetWidth`
запускает новый layout: если geometry уже актуальна, read может быть дешевым. Проблема именно в том, что **pending
invalidation + layout-dependent read** заставляет engine синхронизироваться раньше, чем он планировал.

В Performance trace стоит искать Layout/Recalculate Style рядом с JavaScript call stack; современные Chrome DevTools
также имеют Forced Reflow insight для таких случаев.

На интервью: **`offsetWidth` после layout-invalidating write может заставить browser немедленно завершить style/layout;
поэтому geometry читают до writes и избегают повторяющихся write-read cycles**.





#### Вопрос: Как DevTools Performance помогает искать reflow/repaint?

**Короткий ответ**

Запись trace показывает scripting, style recalculation, layout, paint и compositing по кадрам. Можно открыть дорогой
event, увидеть call stack и affected nodes. Paint flashing и Layers дополняют анализ.

**Полный ответ**

Performance panel показывает временную линию frame/runtime work: JavaScript, style recalculation, layout, paint,
raster/compositing-related activity и long tasks.

Базовый workflow:

1. открыть Performance;
2. записать interaction, где виден jank;
3. остановить trace;
4. найти длинный frame/task;
5. раскрыть события `Recalculate Style`, `Layout`, `Paint` и связанные call stacks;
6. проверить affected nodes/regions и повторить experiment после изменения кода.

Для layout проблем важно смотреть не только total time, но и **почему layout начался**. Forced synchronous layout часто
можно связать с конкретным JavaScript read вроде `offsetWidth` после DOM write. В актуальном Chrome DevTools есть Forced
Reflow insight, который помогает выделить такие call stacks.

Для paint можно использовать дополнительные rendering tools, например Paint flashing: browser подсвечивает regions,
которые реально перерисовываются. Это помогает увидеть неожиданно большую invalidation area.

Layers/compositing tooling полезен, когда проблема связана с animation:

- создан ли отдельный compositor layer;
- насколько он большой;
- не стало ли layers слишком много;
- происходит ли повторный raster вместо cheap composite.

Пример diagnostic sequence:

```text
janky click
  -> long task
  -> Layout 22ms
  -> call stack
  -> getBoundingClientRect()
  -> перед ним class/style write
  -> forced synchronous layout
```

После fix нужно записать **новый trace**, а не считать изменение успешным по коду. Performance optimization — это
hypothesis -> measurement -> change -> measurement.

Также полезно тестировать CPU throttling/медленные target devices: проблема, незаметная на developer laptop, может
сильно влиять на interaction latency у пользователя.

На интервью: **DevTools Performance позволяет связать дорогой style/layout/paint event с конкретным frame и call stack;
forced reflow, paint flashing и Layers помогают определить тип bottleneck, а результат fix подтверждают повторным
trace**.





#### Вопрос: Что такое FPS?

**Короткий ответ**

FPS — число отображенных кадров в секунду. Низкий или нестабильный FPS заметен как рывки анимации и scrolling. Важно
смотреть не только среднее, но и пропущенные кадры.

**Полный ответ**

FPS, frames per second, — сколько **готовых кадров реально отображается за секунду**. Для UI важен не только высокий
average FPS, но и равномерность frame delivery: редкие длинные frames заметны как jank даже при хорошем среднем
значении.

Важно отличать FPS от refresh rate display.

- 60 Hz display дает browser примерно 60 возможностей обновить экран в секунду.
- 120 Hz — примерно 120 возможностей.
- Application может выдавать меньше кадров, если не успевает подготовить их вовремя.
- Отрисовывать «90 FPS» на 60 Hz display обычно не означает, что пользователь увидит 90 уникальных refreshes.

Например, при 60 Hz последовательность durations:

```text
16ms, 16ms, 16ms, 70ms, 16ms, 16ms
```

имеет всего один тяжелый frame, но именно он создаст заметный рывок.

Поэтому performance analysis смотрит не только на число FPS, но и на:

- dropped/missed frames;
- long frames;
- main-thread long tasks;
- style/layout/paint cost;
- responsiveness во время scroll/input.

FPS также зависит от типа content. Static page не обязана постоянно «держать 60 FPS»: если ничего не меняется, browser
может вообще не строить новые frames. Метрика становится важной при animations, scrolling, dragging, games и других
continuous visual updates.

На high-refresh displays требования жестче. UI, который стабильно укладывается в 16 ms, может уже не выдавать новый
frame на каждый refresh при 120 Hz.

Практически FPS измеряют вместе с Performance trace/frame timeline, а не одной средней цифрой.

На интервью: **FPS показывает частоту реально отображаемых frames, но smoothness определяется еще и равномерностью frame
times; refresh rate задает возможности display, а application может пропускать их, если rendering work не укладывается в
доступный интервал**.





#### Вопрос: Почему 60 FPS означает бюджет около 16.6ms на кадр?

**Короткий ответ**

Секунда делится на 60 интервалов: примерно 1000 / 60 = 16.6ms. В этот бюджет входят input, JavaScript, style, layout,
paint и compositing. На дисплеях 120Hz бюджет еще меньше.

**Полный ответ**

Display с refresh rate 60 Hz обновляется примерно 60 раз в секунду:

```text
1000 ms / 60 ≈ 16.67 ms
```

Поэтому, если application хочет подготовить **новый frame к каждому refresh**, вся необходимая работа должна уложиться
примерно в этот интервал.

В frame могут попадать:

- input/event handling;
- JavaScript;
- style calculation;
- layout;
- paint/raster work;
- compositing;
- browser/OS overhead.

Важно: 16.67 ms — не гарантированный «CPU budget для вашего JavaScript». Часть интервала уже может быть занята browser,
другими tasks и rendering work. Поэтому practical target для application code обычно должен иметь запас.

Для 120 Hz окно вдвое меньше:

```text
1000 ms / 120 ≈ 8.33 ms
```

Для 144 Hz:

```text
1000 ms / 144 ≈ 6.94 ms
```

Отсюда две важные вещи.

**Нельзя hardcode-ить animation шаг на 16.6 ms.** На 120/144 Hz animation иначе будет двигаться с неправильной
скоростью.

**Один long task легко съедает несколько frames.** Например, 50 ms blocking JavaScript при 60 Hz перекрывает примерно
три refresh intervals.

```text
50 / 16.67 ≈ 3
```

При этом browser scheduling не обязан идеально совпадать с простой арифметикой: реальные frame boundaries, compositor
work и OS scheduling сложнее. 16.67 ms — удобная модель budget, а не жесткий SLA.

Для animation progress лучше использовать elapsed time/timestamp, а не «прибавлять один фиксированный шаг на каждый
callback».

На интервью: **60 Hz дает около 16.67 ms между refresh opportunities, 120 Hz — около 8.33 ms; это общий frame interval,
а не полностью доступный JS budget, поэтому work нужно минимизировать и рассчитывать animation по времени, а не по
фиксированному числу кадров**.





#### Вопрос: Как requestAnimationFrame помогает с анимациями?

**Короткий ответ**

Callback вызывается перед следующим paint и синхронизирует обновление с refresh cycle. Браузер может приостанавливать
его в фоновой вкладке. Тяжелая работа внутри callback все равно блокирует кадр.

**Полный ответ**

`requestAnimationFrame(callback)` просит browser вызвать callback **перед следующим repaint**, когда наступит подходящий
animation frame. Это связывает JavaScript animation с refresh cycle display лучше, чем произвольный таймер.

Базовый loop:

```js
let start;

function animate(timestamp) {
  start ??= timestamp;

  const elapsed = timestamp - start;
  const progress = Math.min(elapsed / 300, 1);

  element.style.transform = `translateX(${progress * 200}px)`;

  if (progress < 1) {
    requestAnimationFrame(animate);
  }
}

requestAnimationFrame(animate);
```

Есть несколько важных свойств API.

**Вызов one-shot.** Один `requestAnimationFrame()` планирует один callback. Для следующего frame его нужно запросить
снова.

**Частота обычно соответствует display refresh rate.** На 120/144 Hz callbacks могут приходить чаще, чем на 60 Hz.

**Нужно использовать timestamp/elapsed time.** Если просто прибавлять фиксированное расстояние на каждый callback,
animation ускорится на high-refresh display.

**Background tabs обычно throttled/paused.** Большинство browsers приостанавливает `requestAnimationFrame` в background
tabs или hidden iframes, что экономит CPU/battery.

Но `requestAnimationFrame` не делает тяжелую работу дешевой:

```js
requestAnimationFrame(() => {
  doExpensiveWorkFor40Ms();
});
```

Такой callback все равно может пропустить frame. API помогает **schedule-ить** visual work, но не ускоряет JavaScript,
layout или paint.

Он также не лечит layout thrashing автоматически:

```js
requestAnimationFrame(() => {
  element.style.width = '20rem';
  console.log(element.offsetWidth);
});
```

write -> geometry read внутри callback все еще может вызвать forced synchronous layout.

Если в одном frame зарегистрировано несколько rAF callbacks, browser может передать им одинаковый frame timestamp. Это
еще одна причина строить animation от времени, а не от количества callback calls.

Для declarative transitions/animations лучше часто оставить animation CSS/Web Animations engine; `requestAnimationFrame`
особенно полезен, когда visual state зависит от JavaScript simulation, pointer/scroll state, canvas или custom timing.

На интервью: **`requestAnimationFrame` синхронизирует JS update с animation frames и обычно с refresh rate display, но
он one-shot и не создает бесплатный performance budget; progress считают по timestamp, а тяжелый JS или forced layout
внутри callback все равно вызывают jank**.
