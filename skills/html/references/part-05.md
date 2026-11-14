# HTML — вопросы и ответы, часть 5

> Автоматически сгенерировано из src/pages/html/index.md. Не редактируйте вручную.

### SVG и media



#### Вопрос: Чем JPEG, PNG, WebP, AVIF и SVG отличаются друг от друга?

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





#### Вопрос: Когда использовать SVG, а когда raster image?

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





#### Вопрос: Что такое responsive images и как работают srcset/sizes?

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





#### Вопрос: Что делает loading="lazy"?

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





#### Вопрос: Что такое alt и когда он должен быть пустым?

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





#### Вопрос: Для чего нужен элемент picture?

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





#### Вопрос: Что такое SVG?

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





#### Вопрос: Почему SVG подходит для scalable icons?

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





#### Вопрос: Как сделать SVG-иконку масштабируемой?

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





#### Вопрос: Что такое viewBox в SVG?

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





#### Вопрос: Чем width/height отличаются от viewBox?

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





#### Вопрос: Как менять цвет SVG-иконки через CSS?

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





#### Вопрос: Что лучше для иконок: inline SVG, SVG sprite или img?

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





#### Вопрос: Какие проблемы появляются при локализации frontend-приложения?

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





#### Вопрос: Как сделать SVG-иконку доступной?

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





#### Вопрос: Какие ошибки часто делают при работе с SVG-иконками?

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



### Accessibility и SEO



#### Вопрос: Как рассчитывается accessible name?

**Короткий ответ**

Accessible name — программно вычисляемое имя объекта в accessibility tree. Browser получает его по Accessible Name and
Description Computation из связанных labels, видимого текста, `aria-labelledby`, `aria-label`, `alt` и других допустимых
источников с определенным precedence.

**Полный ответ**

Accessible name отвечает на вопрос **«как этот объект называется для accessibility API?»**. Role сообщает тип объекта —
например `button` или `textbox`, а name позволяет отличить конкретный control от остальных.

Для обычной кнопки имя часто берется из собственного текста:

```html
<button type="button">Сохранить</button>
```

Для form control надежный источник — связанный `label`:

```html
<label for="email">Email</label>
<input
  id="email"
  type="email"
/>
```

Если подходящий visible text уже существует в другом element, можно связать его через `aria-labelledby`:

```html
<h2 id="dialog-title">Удалить проект?</h2>
<div
  role="dialog"
  aria-labelledby="dialog-title"
>
  ...
</div>
```

Для icon-only control допустим literal name через `aria-label`:

```html
<button
  type="button"
  aria-label="Закрыть"
>
  <svg aria-hidden="true">...</svg>
</button>
```

У изображений одним из источников name является `alt`. Browser применяет стандартизированный алгоритм, который учитывает
тип элемента, ARIA relationships и допустимые источники в определенном порядке, а затем публикует вычисленное имя через
platform accessibility API.

Важный trade-off — **ARIA naming может переопределить native/visible naming**. Например:

```html
<button aria-label="Отправить">Сохранить</button>
```

визуально показывает «Сохранить», но accessible name может стать «Отправить». Такой рассинхрон затрудняет работу screen
reader и speech-input users. Поэтому сначала лучше использовать visible/native label, затем `aria-labelledby`, а
`aria-label` оставлять для случаев, где подходящего видимого источника нет.

`aria-describedby` решает другую задачу: добавляет description/context и не должен использоваться как замена имени. Если
`aria-labelledby` ссылается на несколько ids, их text alternatives формируют одно имя в порядке ссылок.

Практически computed name удобно проверять в Accessibility panel DevTools или через accessibility-oriented tests по
role/name. Это надежнее, чем угадывать результат только по DOM markup.

На интервью: **accessible name не является одной конкретной HTML-строкой — browser вычисляет его по стандартному
алгоритму из native и ARIA sources; главное понимать precedence и не расходить имя с видимым интерфейсом**.





#### Вопрос: Когда использовать aria-live?

**Короткий ответ**

`aria-live` используют для значимых динамических updates, которые происходят без перемещения focus: результат
сохранения, изменение числа результатов, завершение фоновой операции. `polite` обычно подходит для обычных status
updates, `assertive` — только для действительно срочных сообщений.

**Полный ответ**

Live region нужна, когда DOM изменился **вне текущей точки focus**, но пользователь assistive technology все равно
должен узнать об этом изменении.

Типичный вариант — стабильный status container:

```html
<p
  id="save-status"
  role="status"
></p>
```

После успешной операции приложение обновляет его text:

```js
document.querySelector('#save-status').textContent = 'Данные сохранены';
```

`role="status"` уже имеет подходящую live-region semantics для обычных non-urgent сообщений. Если используется
`aria-live` напрямую, основные значения такие:

- `polite` — объявить update при ближайшей удобной возможности, не перебивая текущую задачу без необходимости;
- `assertive` — сообщить изменение с высоким приоритетом; текущая речь может быть прервана;
- `off` — live announcement не запрашивается.

Поэтому `assertive` не подходит для обычного autosave, счетчика результатов или validation на каждый keystroke. Иначе
интерфейс начинает постоянно перебивать пользователя.

Для срочного события обычно лучше использовать подходящую semantics вроде `role="alert"`, а не ставить
`aria-live="assertive"` на большие containers.

Есть дополнительные настройки:

- `aria-atomic` определяет, нужно ли объявлять region целиком или только изменившуюся часть;
- `aria-relevant` уточняет, какие types DOM changes считаются релевантными.

Практический edge case: надежнее, когда live region уже существует в DOM, а приложение **обновляет ее содержимое**.
Создание нового element сразу с готовым текстом может вести себя неодинаково в разных browser/assistive-technology
combinations, потому что observer еще не обязательно начал отслеживать region.

Также live region не нужна автоматически для любого нового content. Если после submit focus переводится в error summary,
screen reader уже получит новый контекст через focus. Дополнительный live announcement может продублировать сообщение.

В Angular это обычно означает: держать небольшой status region стабильным в template и менять только его text/state, а
не создавать большой `aria-live` wrapper вокруг всего feature tree.

На интервью: **`aria-live` — канал для важных asynchronous updates без focus move; выбирать нужно минимальный region и
минимально достаточный priority, иначе accessibility превращается в поток лишних announcements**.





#### Вопрос: Что такое structured data и зачем нужен JSON-LD?

**Короткий ответ**

Structured data описывает entities и properties страницы в машинно-читаемом формате, обычно с vocabulary Schema.org.
Google поддерживает JSON-LD, Microdata и RDFa и рекомендует JSON-LD для Search features; корректная разметка может
сделать страницу eligible для rich results, но не гарантирует их показ.

**Полный ответ**

Structured data добавляет к странице **явную модель фактов**, которую crawler может обработать без попытки вывести все
relations только из визуального HTML. Например, страница статьи может отдельно сообщить headline, дату публикации и
author.

JSON-LD размещают в отдельном script block:

```html
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Frontend interview questions",
    "datePublished": "2026-08-19",
    "author": {
      "@type": "Organization",
      "name": "Angular-RU"
    }
  }
</script>
```

Плюс JSON-LD в том, что semantic graph отделен от layout markup. Компонентам не нужно размазывать `itemprop` по
вложенной DOM-структуре, а structured data можно генерировать из того же source of truth, что и visible content.

Но здесь важны несколько ограничений.

**Schema.org и Search feature — не одно и то же**

Schema.org описывает vocabulary. Для конкретного Google rich result нужно дополнительно соблюдать документацию и
required/recommended properties именно этого feature. Валидный произвольный Schema.org object сам по себе не обещает
расширенный search result.

**Markup должен соответствовать странице**

Structured data не должна заявлять rating, author, price или другие facts, которых нет или которые противоречат видимому
content. Иначе поисковая система может игнорировать markup или считать его нарушающим guidelines.

**Rich result не гарантирован**

Даже корректная разметка только делает страницу eligible. Search engine сам решает, показывать ли расширенный result для
конкретного query, device и context.

**Crawler должен получить страницу**

Правильный JSON-LD бесполезен, если URL закрыт от crawling/indexing или возвращает ошибочный HTTP contract. Для public
indexable routes structured data желательно отдавать уже в server/static HTML вместе с основной metadata, а не зависеть
без необходимости от позднего client effect.

В Angular/SSR удобно строить JSON-LD из route/domain data и следить, чтобы hydration не оставляла duplicate или
конфликтующие blocks при navigation.

Еще один engineering detail — serialization. Не стоит собирать JSON-LD строковой конкатенацией из CMS/user content:
нужно корректно сериализовать значения и учитывать HTML `<script>` context, чтобы не получить broken markup или XSS
через недоверенные строки.

Проверка production flow обычно включает Rich Results Test для поддерживаемого feature, проверку реального URL в Search
Console и мониторинг reports после deploy. Это важнее, чем просто увидеть зеленый JSON validator локально.

На интервью: **structured data — machine-readable semantic contract страницы; JSON-LD удобен как отдельный graph, но он
должен совпадать с visible content, соответствовать правилам конкретного search feature и не является shortcut к ranking
или гарантией rich results**.
