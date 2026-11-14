# CSS — вопросы и ответы, часть 7

> Автоматически сгенерировано из src/pages/css/index.md. Не редактируйте вручную.

### CSS rendering pipeline



#### Вопрос: Что такое FOUC и как его уменьшить?

**Короткий ответ**

FOUC, Flash of Unstyled Content, возникает, когда HTML уже отрисован, а нужные CSS или fonts еще не применились.
Помогают critical CSS, корректное размещение stylesheet, preload важных fonts, стабильные fallback fonts и отказ от
поздней загрузки базовых стилей через JavaScript. В Angular также важно, чтобы server-rendered HTML и client styles
давали согласованный first render.

**Полный ответ**

FOUC — это момент, когда пользователь успевает увидеть документ до применения ожидаемых styles. Обычно проблема
возникает не потому, что CSS "медленный" сам по себе, а потому что critical styles стали доступны слишком поздно:
stylesheet загружается после первого render, подключается через JavaScript, спрятан за цепочкой `@import` или разбит
так, что базовый layout приезжает отдельным поздним chunk.

Например, такой подход повышает риск FOUC:

```html
<script>
  import('/styles/theme.js').then(({loadStyles}) => loadStyles());
</script>
```

Если эти styles определяют базовую typography, размеры и layout, browser уже может показать HTML в user-agent styles, а
после загрузки CSS резко перестроить страницу.

Практически помогают:

- подключать critical stylesheet обычным `<link rel="stylesheet">` как можно раньше в `<head>`;
- избегать длинных CSS dependency chains через `@import`;
- inline только небольшой действительно critical CSS, а не весь bundle;
- не откладывать базовые styles до client-side initialization;
- preload использовать только для реально приоритетных ресурсов, иначе он конкурирует за bandwidth;
- для fonts подбирать `font-display` и fallback с близкими metrics, чтобы уменьшить FOIT/FOUT и layout shift.

FOUC и FOUT связаны, но это не одно и то же: **FOUC относится к styles страницы в целом, FOUT — к временному показу
fallback font вместо web font**.

В SSR/Angular приложении отдельный edge case — разные styles между server и client. Если server HTML уже выглядит одним
образом, а client после hydration подключает другой theme или поздний style chunk, пользователь увидит flash даже при
быстром network.

Искать проблему удобно с throttling в DevTools: отключить cache, замедлить network/CPU и посмотреть waterfall вместе с
screenshots. Так видно, какой именно resource приходит после первого paint.

На интервью: **FOUC уменьшают не "магическим preload всего", а тем, что critical styles делают доступными до первого
render и не меняют базовый visual contract поздно на client**.





#### Вопрос: Как подключение custom fonts влияет на performance?

**Короткий ответ**

Custom fonts могут задерживать отображение текста, влиять на LCP и вызывать FOUT или FOIT. Нужно выбирать WOFF2,
font-display, preload только критичных начертаний, subset и fallback stack с близкими метриками. Чем больше font files и
weights, тем выше риск медленного first render.

**Полный ответ**

Custom font добавляет отдельный network и rendering dependency. Browser сначала должен понять, что конкретный face
нужен, загрузить font file, распарсить его и затем перерисовать текст. Поэтому влияние зависит не только от размера
файла, но и от того, **когда browser обнаруживает font и что показывает до его загрузки**.

Пример:

```css
@font-face {
  font-family: 'App Sans';
  src: url('/fonts/app-sans-latin.woff2') format('woff2');
  font-display: swap;
  font-weight: 400;
  font-style: normal;
}

body {
  font-family: 'App Sans', system-ui, sans-serif;
}
```

При `font-display: swap` browser быстро показывает fallback, а затем заменяет его web font. Это уменьшает риск invisible
text, но может вызвать FOUT и layout shift, если metrics сильно отличаются.

Для production обычно полезно:

1. использовать WOFF2;
2. не грузить начертания и character sets, которые не нужны странице;
3. делать subset по языкам и при необходимости применять `unicode-range`;
4. preload только font, который действительно нужен above the fold;
5. настроить долгий immutable cache для versioned font files;
6. подобрать fallback font с похожими metrics.

Для уменьшения CLS можно точнее согласовать fallback через metric overrides:

```css
@font-face {
  font-family: 'App Sans Fallback';
  src: local('Arial');
  size-adjust: 98%;
  ascent-override: 92%;
  descent-override: 24%;
  line-gap-override: 0%;
}
```

Preload не бесплатен: если preload-нуть пять weights "на всякий случай", они могут вытеснить CSS, JavaScript или LCP
image из network priority. Еще один частый промах — preload одного URL, а CSS затем запрашивает другой из-за неверного
`crossorigin`, format или path, и получается двойная загрузка.

На интервью: **оптимизация fonts — это баланс между временем появления текста, visual stability и качеством typography;
ключевые инструменты — subset, `font-display`, разумный preload и metric-compatible fallback**.





#### Вопрос: Что такое CSSOM и почему CSS может блокировать рендеринг?

**Короткий ответ**

CSSOM — object model разобранных CSS rules. Браузеру нужен CSSOM, чтобы вычислить стили и построить render tree, поэтому
внешний stylesheet обычно является render-blocking resource для первого render.

**Полный ответ**

CSSOM — представление загруженных и разобранных CSS rules, с которым browser работает при selector matching, cascade и
вычислении styles.

Упрощенно:

```text
CSS bytes -> parsing -> CSSOM
DOM + CSSOM -> computed styles -> layout/paint
```

Пока critical stylesheet не загружен и не разобран, browser не может надежно вычислить final styles для первого render.
Поэтому обычный stylesheet в `<head>`:

```html
<link
  rel="stylesheet"
  href="/app.css"
/>
```

обычно задерживает first paint. При этом HTML parser может продолжать строить DOM; "render-blocking" не означает, что
вообще вся работа browser остановлена.

Задержку увеличивают:

- большой CSS bundle;
- slow origin/CDN;
- цепочки `@import`;
- styles, которые загружаются только после выполнения JavaScript;
- слишком большое количество route-independent CSS, хотя экран использует малую часть.

Не каждый stylesheet одинаково блокирует render. Например, stylesheet с media condition может не блокировать текущий
viewport так же, как unconditional critical CSS:

```html
<link
  rel="stylesheet"
  href="/print.css"
  media="print"
/>
```

Critical CSS может уменьшить время до первого meaningful render:

```html
<style>
  .app-shell {
    min-height: 100vh;
  }
</style>
<link
  rel="stylesheet"
  href="/app.css"
/>
```

Но aggressive inlining имеет trade-off: inline CSS увеличивает HTML и хуже переиспользуется из browser cache между
страницами. Поэтому цель — inline минимальный critical subset, а не весь stylesheet.

На интервью: **CSS блокирует render потому, что browser нужен результат cascade/computed styles до отрисовки;
оптимизация состоит в сокращении critical CSS path, а не просто в уменьшении количества CSS файлов**.





#### Вопрос: Что такое render tree?

**Короткий ответ**

Render tree — полезная концептуальная модель видимых layout/paint объектов, полученных из DOM и computed styles.
`display: none` не создает layout box, хотя node остается в DOM.

**Полный ответ**

Render tree часто объясняют как промежуточное представление между DOM/CSSOM и layout: browser берет DOM nodes, вычисляет
для них styles и создает internal objects, которые реально участвуют в rendering.

Концептуально:

```text
DOM + CSSOM
    ↓
computed styles
    ↓
render/layout objects
    ↓
layout -> paint -> composite
```

Важно не воспринимать render tree как один стандартизованный JavaScript-доступный объект: современные browser engines
могут хранить rendering data иначе. Для интервью это **модель**, которая помогает объяснить, почему DOM node не всегда
равен layout box.

Например:

```css
.hidden {
  display: none;
}
```

Element остается в DOM и доступен JavaScript, но не создает обычный layout box и не занимает место.

А при:

```css
.invisible {
  visibility: hidden;
}
```

место в layout сохраняется, хотя содержимое не рисуется обычным образом.

Есть и другие edge cases:

- pseudo-elements `::before` / `::after` могут создавать visual content, которого нет отдельным DOM node;
- `display: contents` может убрать собственный principal box элемента, оставив children участвовать в layout;
- text nodes тоже превращаются во внутренние layout objects;
- fixed/absolute positioned elements участвуют в rendering, хотя выпадают из normal flow.

Поэтому фраза "render tree содержит только видимые DOM nodes" слишком грубая. Точнее сказать: **browser строит internal
rendering representation на основе DOM и computed styles, а создание layout boxes зависит от display model и других
properties**.

На интервью хороший пример — сравнить `display: none` и `visibility: hidden`: DOM остается в обоих случаях, но их
участие в layout/paint разное.





#### Вопрос: Чем layout, paint и compositing отличаются друг от друга?

**Короткий ответ**

Layout, или reflow, вычисляет размеры и положение элементов. Paint превращает styled boxes, text, borders и shadows в
paint commands/rasterized content. Compositing собирает слои в итоговый кадр и иногда позволяет обновить кадр без нового
layout и paint.

**Полный ответ**

Это разные этапы rendering pipeline, и цена изменения зависит от того, до какого этапа browser должен вернуться.

**Layout** вычисляет geometry:

```css
.card {
  width: 50%;
  padding: 1rem;
}
```

Если изменить `width`, browser может потребоваться пересчитать размеры и положение этого элемента и зависимых элементов.

**Paint** определяет, как уже рассчитанные boxes выглядят: background, text, border, shadow и другие visual effects.
Например, изменение `background-color` обычно не меняет geometry, но требует repaint.

**Compositing** объединяет готовые layers в финальный frame. Изменения `transform` или `opacity` часто удается
обработать на compositor stage, если нужный content уже находится в подходящем layer.

Упрощенная стоимость:

```text
geometry change -> style -> layout -> paint -> composite
visual change   -> style -> paint -> composite
layer transform -> style -> composite
```

Это не жесткая таблица для всех browsers. Engine может оптимизировать invalidation, а compositor-only behavior зависит
от layer promotion, размера элемента, memory pressure и конкретного property.

Практический анти-паттерн:

```js
for (const item of items) {
  item.style.width = item.offsetWidth + 1 + 'px';
}
```

Здесь запись style чередуется с layout read, и browser может многократно форсировать synchronous layout. Лучше сначала
собрать measurements, затем сделать writes.

Также "GPU accelerated" не означает "бесплатно": много promoted layers потребляют memory, а большие translucent layers
могут быть дорогими для raster/composite.

На интервью: **сначала назвать роль каждого этапа, затем показать, что performance зависит от invalidation scope и
частоты изменений, а не от списка "хороших" и "плохих" CSS properties в вакууме**.





#### Вопрос: Что такое Critical Rendering Path?

**Короткий ответ**

Critical Rendering Path — цепочка работы, необходимой до появления начального контента: получить critical HTML/CSS,
построить DOM/CSSOM, вычислить styles, выполнить layout, paint и compositing. Blocking resources, parser-blocking
scripts и long tasks могут удлинять этот путь.

**Полный ответ**

Critical Rendering Path, CRP, описывает зависимости, которые должны быть обработаны до того, как browser сможет показать
пользователю начальный UI.

Упрощенная схема:

```text
HTML request
  ↓
HTML parsing -> DOM
       ↘ discover CSS -> CSSOM
DOM + CSSOM -> computed styles
             -> layout
             -> paint
             -> composite
             -> pixels
```

JavaScript может вмешиваться в этот path. Обычный synchronous script во время parsing останавливает HTML parser до
выполнения script:

```html
<script src="/app.js"></script>
```

`defer` позволяет продолжить parsing и выполнить script после построения документа, а `async` выполняется, когда
загрузка завершена, без сохранения порядка относительно других async scripts. Для application entrypoint выбор должен
соответствовать dependency model, а не правилу "async всегда быстрее".

CRP также связан с resource discovery. Если critical CSS или LCP image обнаруживается только после выполнения client
JavaScript, browser начинает загружать его позднее.

Практические способы сокращения path:

- быстрый server response и streaming там, где это оправдано;
- раннее обнаружение critical CSS;
- минимизация parser/render-blocking dependencies;
- `defer`/modules для scripts, которым не нужно блокировать parsing;
- preload только ресурсов, приоритет которых browser иначе определит слишком поздно;
- уменьшение long tasks перед first render.

Важно различать метрики. Улучшение CRP может ускорить FCP/LCP, но "меньше requests" не гарантирует лучший результат:
один огромный bundle может быть хуже нескольких хорошо приоритизированных chunks.

На интервью: **CRP — это dependency chain до pixels; оптимизировать нужно measured bottleneck в waterfall/main thread, а
не количество тегов само по себе**.





#### Вопрос: Что такое render-blocking resources?

**Короткий ответ**

Render-blocking resources задерживают первый render, пока browser не сможет применить или выполнить необходимый
resource. Обычно critical stylesheets блокируют render, а synchronous scripts в parsing path могут дополнительно
задерживать DOM и styles processing.

**Полный ответ**

Resource называют render-blocking, если browser откладывает initial rendering, пока этот resource не будет обработан.

Классический пример — stylesheet:

```html
<link
  rel="stylesheet"
  href="/app.css"
/>
```

Browser старается не показать страницу в заведомо неправильных styles, поэтому critical CSS должен быть загружен и
разобран до первого render.

Scripts имеют другой механизм: обычный script во время HTML parsing является **parser-blocking**. Он останавливает
parser, а значит косвенно может задержать и render:

```html
<script src="/vendor.js"></script>
```

Для некритичного JavaScript чаще подходит:

```html
<script
  src="/analytics.js"
  defer
></script>
```

или module script, который имеет defer-like execution semantics.

CSS можно разделять по conditions:

```html
<link
  rel="stylesheet"
  href="/screen.css"
/>
<link
  rel="stylesheet"
  href="/print.css"
  media="print"
/>
```

`print.css` не является таким же critical resource для screen rendering.

Типичные ошибки:

- добавлять `preload` всем assets и создавать priority contention;
- загружать base CSS через runtime JavaScript;
- считать любой JavaScript "render-blocking" без различия parser/execution behavior;
- дробить CSS настолько сильно, что появляется длинная waterfall chain.

Проверять нужно через Network + Performance: какой request реально находится на critical path и что изменилось в FCP/LCP
после оптимизации.

На интервью: **stylesheets и scripts блокируют разные части pipeline; важно объяснить, что именно блокируется и почему,
а затем выбрать `defer`, media conditions, critical CSS или preload по конкретной зависимости**.





#### Вопрос: Как улучшить scroll performance?

**Короткий ответ**

Нужно уменьшить работу во время scroll: избегать тяжелых handlers и forced layout, виртуализировать большие списки,
снижать paint cost и по возможности отдавать visual effects browser/CSS. Passive listeners помогают там, где event может
блокировать native scrolling, но не делают тяжелый handler быстрым.

**Полный ответ**

Scroll jank появляется, когда browser не успевает подготовить следующий frame: main thread занят JavaScript,
style/layout, paint или слишком тяжелой raster/compositing work.

Первое правило — не выполнять лишнюю работу на каждый `scroll`:

```js
window.addEventListener('scroll', () => {
  const rect = panel.getBoundingClientRect();
  panel.style.height = rect.height + 1 + 'px';
});
```

Такой handler одновременно читает layout и пишет style, что может создавать forced synchronous layout.

Если нужно реагировать на положение элементов, часто лучше `IntersectionObserver`:

```js
const observer = new IntersectionObserver(([entry]) => {
  entry.target.classList.toggle('is-visible', entry.isIntersecting);
});

observer.observe(card);
```

Для `touchstart` / `touchmove` / `wheel` passive listener сообщает browser, что handler не вызовет `preventDefault()`:

```js
element.addEventListener('touchmove', onMove, {passive: true});
```

Это может позволить browser начать scrolling без ожидания handler. Но `passive: true` **не уменьшает CPU cost самого
handler**.

Другие практические меры:

- виртуализировать тысячи rows/cards;
- не делать state update/change detection на каждый pixel scroll;
- использовать `requestAnimationFrame` для visual updates, если они действительно должны следовать frame cadence;
- уменьшать большие blur/shadow/filter regions;
- проверять sticky/parallax на low-end devices;
- применять `content-visibility` или containment там, где они реально уменьшают off-screen work;
- для простых scroll-linked effects рассмотреть native CSS scroll-driven animations, если target browsers подходят.

Throttle/debounce полезны не всегда: throttle уменьшает частоту тяжелой бизнес-логики, но visual animation обычно лучше
синхронизировать с `requestAnimationFrame`.

В Angular отдельная проблема — listener может провоцировать слишком частые application updates. Стоит отделять raw
scroll signal от редких semantic state changes и обновлять UI только когда значение действительно изменилось.

На интервью: **scroll performance диагностируют по main-thread flame chart и frames, затем уменьшают JS/layout/paint
work; passive listeners — только один точечный инструмент**.





#### Вопрос: Почему не стоит использовать transition: all?

**Короткий ответ**

`transition: all` делает transition контракт неявным: любое новое transitionable property может неожиданно начать
анимироваться, включая дорогие layout/paint changes. Лучше перечислять свойства явно.

**Полный ответ**

`transition: all` означает: "если изменится любое property, которое browser умеет transition-ить, попробуй его
анимировать". Проблема прежде всего в поддерживаемости: будущая правка CSS может случайно попасть в animation contract.

Например:

```css
.card {
  transition: all 200ms ease;
}

.card.expanded {
  width: 100%;
  box-shadow: 0 1rem 3rem rgb(0 0 0 / 20%);
  opacity: 1;
}
```

Здесь browser может анимировать не только `opacity`, но и `width`, вызывая layout на промежуточных frames, а
`box-shadow` добавит paint cost.

Явный вариант лучше:

```css
.card {
  transition:
    transform 200ms ease,
    opacity 200ms ease;
}
```

Так code review сразу показывает, какие visual changes являются частью interaction.

Есть и функциональные edge cases. Допустим, позже разработчик добавит:

```css
.card {
  color: var(--text);
}
```

При `transition: all` смена theme может неожиданно стать плавной только у части UI. Или изменение layout property будет
анимироваться там, где дизайн ожидал мгновенную перестройку.

Это не значит, что каждый `transition: all` всегда создает performance bug: browser анимирует только transitionable
properties, и конкретная стоимость зависит от property и rendering engine. Но explicit list дает более предсказуемый
performance и API component styles.

Также animation должна учитывать пользователя:

```css
@media (prefers-reduced-motion: reduce) {
  .card {
    transition-duration: 0.01ms;
  }
}
```

В реальном design system лучше централизованно определить reduced-motion strategy, а не копировать это буквально в
каждый component.

На интервью: **главный аргумент против `transition: all` — скрытый и расширяющийся contract; explicit properties
защищают и performance, и предсказуемость UI**.



### Modern CSS



#### Вопрос: Что такое CSS nesting?

**Короткий ответ**

Native nesting позволяет вкладывать relative selectors внутрь style rule. Оно уменьшает повторение context, но глубокая
вложенность повышает specificity и связанность. Синтаксис и результат следует отличать от дополнительных возможностей
Sass.

**Полный ответ**

CSS nesting позволяет описывать связанные selectors рядом с базовым rule без обязательного preprocessor.

Например:

```css
.card {
  padding: 1rem;

  &:hover {
    box-shadow: 0 0.5rem 1.5rem rgb(0 0 0 / 12%);
  }

  & > .title {
    font-weight: 600;
  }
}
```

Здесь `&` означает selector текущего rule. Browser сам разбирает nesting, поэтому для такого синтаксиса не нужен Sass
или другой compile step.

Nesting уменьшает повторение component selector и может сделать state styles заметнее:

```css
.button {
  &.is-loading {
    cursor: progress;
  }

  &[aria-disabled='true'] {
    opacity: 0.6;
  }
}
```

Но nesting не создает encapsulation. Вложенный rule по-прежнему становится обычным CSS selector и участвует в общей
cascade. Поэтому такая структура быстро становится хрупкой:

```css
.page {
  .sidebar {
    .navigation {
      .item {
        .label {
        }
      }
    }
  }
}
```

Она связывает style с конкретной DOM hierarchy и увеличивает сложность overrides. В component styles обычно лучше
ограничиваться одним-двумя уровнями и вкладывать прежде всего states, pseudo-classes и ближайшие structural relations.

Native CSS nesting также не равно Sass nesting: Sass дополнительно умеет variables, mixins, functions, modules и compile
time transformations. Если проект использует Sass только ради nesting, современный CSS может уменьшить зависимость от
preprocessor, но это отдельное архитектурное решение.

На интервью: **nesting уменьшает повторение selectors, но не меняет cascade и не дает component isolation; глубина
nesting должна отражать реальную связь, а не копировать всю DOM structure**.





#### Вопрос: Что такое :has()?

**Короткий ответ**

`:has()` выбирает element по совпадению relative selector внутри или рядом, например form group с invalid input. Это
позволяет выражать отношения, для которых раньше часто требовался JavaScript.

**Полный ответ**

`:has()` — relational pseudo-class. Она позволяет выбрать element, если относительно него совпадает переданный relative
selector.

Классический пример "parent selector":

```css
.field:has(input:invalid) {
  border-color: crimson;
}
```

`.field` получит style только тогда, когда внутри есть invalid `input`.

Но `:has()` умеет проверять не только descendants. Можно реагировать на соседний element:

```css
.heading:has(+ .description) {
  margin-bottom: 0.25rem;
}
```

Или на checked state:

```css
.card:has(> input[type='checkbox']:checked) {
  outline: 2px solid currentColor;
}
```

Specificity `:has()` определяется наиболее специфичным selector из ее argument list, похожим образом на `:is()` и
`:not()`. Поэтому в design system стоит следить, чтобы удобный relational selector случайно не создавал слишком сильный
override contract.

Performance тоже нельзя описывать правилом "`:has()` всегда медленный". Современные engines оптимизируют selector
matching и invalidation, но очень широкие conditions на большом subtree могут увеличивать объем работы при частых
DOM/state changes. Лучше выражать конкретную relation, а не использовать глобальные selectors без необходимости.

`:has()` особенно полезен для:

- validation state form groups;
- component variants, зависящих от optional child;
- layout, который меняется при наличии action/media;
- sibling-dependent spacing;
- CSS-only UI states, если accessibility и semantics уже обеспечены HTML controls.

При этом `:has()` не заменяет JavaScript для business state. Если состояние нужно отправлять на server, хранить,
валидировать или использовать вне presentation, оно должно существовать в application model, а CSS только отражает его.

На интервью: **`:has()` дает CSS возможность выбирать element по отношению к descendants/siblings, но использовать его
лучше для presentation state, а не как замену application logic**.





#### Вопрос: Что такое style queries?

**Короткий ответ**

Style container queries применяют rules по computed style container, прежде всего по custom properties. Это позволяет
component реагировать на semantic state контекста, а не только на размер container.

**Полный ответ**

Обычная size container query отвечает на вопрос "какой размер у container?". Style query отвечает на вопрос "какое
computed style value задано container?".

На практике особенно полезны custom properties как semantic contract:

```css
.panel {
  --density: compact;
}

@container style(--density: compact) {
  .item {
    min-height: 2rem;
    padding-block: 0.25rem;
  }
}
```

Здесь descendant реагирует не на конкретную ширину, а на semantic state `compact`. Parent может выбрать этот state из
theme, component input или другого CSS condition, а child не обязан знать, почему state был выбран.

Это отличается от media query:

```css
@media (width < 40rem) {
}
```

Media query смотрит на environment/viewport. Size container query смотрит на размер конкретного ancestor. Style query
смотрит на его computed style.

Практический use case — design-system component:

```css
.toolbar {
  --toolbar-variant: dense;
}

@container style(--toolbar-variant: dense) {
  .toolbar-button {
    padding-inline: 0.5rem;
  }
}
```

Такой подход уменьшает необходимость прокидывать одинаковый modifier class каждому descendant.

Есть ограничения. Style query должна выражать presentation contract, а не скрывать application state в CSS. Если
`--status: approved` нужно читать бизнес-логике, analytics или tests, надежнее иметь этот state в DOM/application model,
а custom property использовать только как производное presentation значение.

Также поддержку конкретного style-query syntax нужно проверять по browser matrix проекта и иметь понятный fallback, если
feature не входит в минимальный target.

На интервью: **style queries позволяют descendant styles зависеть от computed style container; особенно хорошо они
работают с custom properties как semantic design-system contract**.





#### Вопрос: Что такое logical properties?

**Короткий ответ**

Logical properties описывают стороны относительно text flow: `inline` и `block`, а не физические
`left/right/top/bottom`. Они адаптируются к `direction` и `writing-mode` и уменьшают отдельные overrides для RTL и
vertical writing modes.

**Полный ответ**

Physical properties привязаны к конкретным сторонам viewport:

```css
.card {
  margin-left: 1rem;
  padding-right: 0.5rem;
}
```

Logical properties описывают layout через axes документа:

```css
.card {
  margin-inline-start: 1rem;
  padding-inline-end: 0.5rem;
}
```

Для обычного horizontal LTR текста:

```text
inline-start = left
inline-end   = right
block-start  = top
block-end    = bottom
```

Для RTL inline sides меняются местами автоматически. При vertical writing mode меняется и mapping block/inline axes.

Кроме margins/padding существуют logical sizing и positioning properties:

```css
.dialog {
  inline-size: min(30rem, 100%);
  max-block-size: 80dvb;
  inset-inline-end: 1rem;
  border-start-start-radius: 1rem;
}
```

`inline-size` соответствует размеру вдоль inline axis, а `block-size` — вдоль block axis. Это делает component менее
зависимым от конкретного writing mode.

Logical properties особенно полезны в reusable UI и internationalized applications. Но они не означают, что physical
properties запрещены. Если дизайн действительно привязан к физической стороне — например decorative gradient должен
всегда идти слева направо независимо от языка — physical direction может быть правильнее.

Нужно также отдельно проверять icons и transforms: `margin-inline-start` адаптируется к RTL, а
`transform: translateX(...)` или стрелка "назад" сами по себе не зеркалятся по смыслу.

На интервью: **logical properties выражают layout через semantic flow axes и поэтому лучше масштабируются на RTL и
другие writing modes, но физические координаты остаются уместны для действительно physical design**.





#### Вопрос: Какие frontend-проблемы появляются при RTL?

**Короткий ответ**

RTL влияет не только на text alignment: меняются inline direction, spacing, directional icons, scrolling,
mixed-direction text и часть interaction patterns. Базу лучше строить на корректном `dir` и logical properties, а не на
наборе ручных `[dir='rtl']` overrides.

**Полный ответ**

Для RTL важно сначала задать направление семантически:

```html
<html
  lang="ar"
  dir="rtl"
>
  ...
</html>
```

HTML `dir` сообщает direction не только CSS, но и browser/text layout semantics. Простого `text-align: right`
недостаточно.

CSS лучше строить на logical properties:

```css
.toolbar {
  padding-inline: 1rem;
}

.icon {
  margin-inline-end: 0.5rem;
}
```

Тогда spacing автоматически меняется для LTR/RTL.

Но layout — только часть задачи. Нужно проверить:

- directional icons: back/forward arrows, chevrons, progress direction;
- mixed text: Arabic/Hebrew рядом с URL, email, code, numbers;
- truncation и ellipsis;
- carousels, horizontal scrolling и scroll position;
- drag and drop;
- charts/timelines, где направление может быть semantic, а не языковым;
- animations/transforms с hardcoded positive/negative X;
- screenshot/visual tests основных flows.

Нельзя механически зеркалить все. Например media controls "play" обычно не меняют направление, а chronological chart
может оставаться слева направо по product convention. Решение зависит от semantics конкретного control.

Также не стоит менять DOM order только ради visual RTL. Keyboard/focus order должен оставаться предсказуемым и
соответствовать meaningful reading/interaction order. CSS reordering через `order` или reverse layouts требует
accessibility проверки.

Для dynamic locale switch полезно иметь tests минимум на один LTR и один RTL locale, а не только набор CSS overrides без
реального content.

На интервью: **RTL — это bidi/layout/accessibility задача, а не "переставить left на right"; правильная основа — `dir`,
logical properties и проверка directional UI semantics**.





#### Вопрос: Чем :is() отличается от :where()?

**Короткий ответ**

Обе pseudo-classes группируют selectors. `:is()` получает specificity наиболее специфичного argument, а `:where()`
всегда имеет нулевую specificity. Поэтому `:where()` удобно использовать для легко переопределяемых defaults.

**Полный ответ**

Обе pseudo-classes уменьшают дублирование selector lists.

Без них:

```css
.card h2,
.card h3,
.card h4 {
  margin-block: 0;
}
```

С `:is()`:

```css
.card :is(h2, h3, h4) {
  margin-block: 0;
}
```

Главное отличие — specificity.

Для:

```css
.card :is(h2, #featured) {
}
```

specificity `:is(...)` определяется самым специфичным selector в списке, поэтому наличие `#featured` влияет на вес всего
selector.

`:where()` специально имеет zero specificity:

```css
:where(.prose h2, .prose h3) {
  margin-block: 1em 0.5em;
}
```

Это удобно для reset/base/component defaults, которые consumers должны легко переопределять обычным class selector без
specificity escalation.

Практический design-system pattern:

```css
:where(.button) {
  font: inherit;
  border: 0;
}
```

А state, который должен участвовать в normal cascade, можно выразить через `:is()`:

```css
.button:is(:hover, :focus-visible) {
  text-decoration: underline;
}
```

Важно: обе pseudo-classes группируют selectors, но сами по себе не создают scope и не меняют DOM relation. Выбор между
ними — прежде всего вопрос желаемого specificity contract.

На интервью: **`:is()` помогает группировать selectors с обычной specificity semantics, а `:where()` позволяет
группировать их без добавления specificity — это особенно полезно для override-friendly APIs**.





#### Вопрос: Для чего нужны accent-color и color-scheme?

**Короткий ответ**

`accent-color` задает accent для поддерживаемых native controls. `color-scheme` сообщает browser, какие light/dark
schemes поддерживает область, чтобы он мог согласовать native controls, scrollbars и system colors.

**Полный ответ**

`accent-color` позволяет брендировать часть native form controls без полной custom implementation:

```css
:root {
  accent-color: #5b5bd6;
}
```

Browser может применить этот accent к checkbox, radio, range и progress controls. Конкретный visual result остается
platform/browser dependent — это преимущество, если хочется сохранить native accessibility и interaction.

Если нужен полностью custom control, `accent-color` недостаточно. Но перед заменой native control стоит учитывать цену:
keyboard behavior, forced-colors, high contrast, focus styles и accessibility придется поддерживать самостоятельно.

`color-scheme` решает другую задачу:

```css
:root {
  color-scheme: light dark;
}
```

Это сообщает browser, что документ умеет работать в обеих schemes. User agent может согласовать default form controls,
scrollbars, canvas/background defaults и system colors с активной scheme.

Но `color-scheme: dark` не создает полноценную dark theme приложения. Custom colors все равно нужно определить:

```css
:root {
  color-scheme: light dark;
  --surface: light-dark(#fff, #171717);
  --text: light-dark(#171717, #f5f5f5);
}
```

Если design system поддерживает только light theme, объявлять `dark` только ради темных browser controls ошибочно:
native и custom UI могут начать выглядеть несогласованно.

На интервью: **`accent-color` меняет accent поддерживаемых native controls, а `color-scheme` описывает поддерживаемые
color environments для browser; ни одно из них не заменяет theme architecture приложения**.





#### Вопрос: Как работают prefers-color-scheme и prefers-reduced-motion?

**Короткий ответ**

Эти media features отражают user/system preferences. `prefers-color-scheme` помогает выбрать light/dark presentation, а
`prefers-reduced-motion` — уменьшить необязательное движение. User override приложения обычно должен иметь приоритет над
system default.

**Полный ответ**

`prefers-color-scheme` позволяет выбрать styles по системной light/dark preference:

```css
:root {
  --surface: #fff;
  --text: #111;
}

@media (prefers-color-scheme: dark) {
  :root {
    --surface: #171717;
    --text: #f5f5f5;
  }
}
```

Это хороший default для первого визита. Но если приложение дает theme switcher, выбор пользователя обычно нужно хранить
отдельно и ставить выше system preference.

SSR-приложения должны учитывать first render: если server всегда отправляет light theme, а client после startup читает
system/local storage и переключает dark, возникает flash. Theme contract лучше определить до первого paint насколько это
возможно для выбранной архитектуры.

`prefers-reduced-motion` означает, что пользователь просит уменьшить non-essential motion:

```css
@media (prefers-reduced-motion: reduce) {
  .dialog {
    animation: none;
  }

  .carousel {
    scroll-behavior: auto;
  }
}
```

Это не обязательно "выключить любую animation". Иногда motion объясняет spatial transition или state change. В таком
случае лучше заменить большую zoom/slide animation на короткий fade или другое менее интенсивное feedback.

Плохой generic reset вроде "все animations по 1 ms" может сломать logic, которая ошибочно зависит от `animationend`, или
сделать interaction визуально непонятным. Надежнее проектировать reduced-motion variant осознанно.

Обе preferences — входные signals, а не абсолютные business rules. Пользователь может выбрать theme внутри приложения, а
accessibility setting может влиять только на необязательное motion.

На интервью: **media preferences дают sensible default из OS/browser, но application override и accessible fallback
остаются частью UI architecture**.





#### Вопрос: Для чего нужны aspect-ratio и object-fit?

**Короткий ответ**

`aspect-ratio` задает preferred ratio box и помогает резервировать место. `object-fit` определяет, как replaced content
вроде image/video вписывается в уже заданный box: `contain` показывает весь content, `cover` заполняет область с crop.

**Полный ответ**

`aspect-ratio` участвует в sizing и позволяет сохранить пропорции, когда одна из dimensions определяется автоматически:

```css
.video {
  inline-size: 100%;
  aspect-ratio: 16 / 9;
}
```

Это удобно для placeholders, cards и responsive media, потому что browser может зарезервировать geometry до загрузки
content.

Для реальных images предпочтительно также указывать intrinsic dimensions в HTML:

```html
<img
  src="/photo.jpg"
  width="1200"
  height="800"
  alt=""
/>
```

Browser знает ratio уже из attributes и может уменьшить CLS еще до загрузки image metadata.

`object-fit` применяется к replaced elements внутри заданного content box:

```css
.avatar {
  inline-size: 4rem;
  block-size: 4rem;
  object-fit: cover;
  border-radius: 50%;
}
```

`cover` сохраняет ratio и полностью заполняет box, но часть image может быть обрезана. `contain` сохраняет весь image,
но может оставить свободное место.

Crop можно контролировать:

```css
.hero-image {
  object-fit: cover;
  object-position: 50% 20%;
}
```

Важно не путать эти properties: `aspect-ratio` влияет на preferred geometry самого box, а `object-fit` — на размещение
replaced content внутри уже рассчитанного box.

Для content images crop может быть нежелателен, если обрезается важная информация. Поэтому выбор `cover` — не только
layout decision, но и content/design contract.

На интервью: **`aspect-ratio` помогает browser рассчитать размер box, `object-fit` управляет содержимым внутри него; для
images HTML width/height остаются важны для early layout и CLS**.





#### Вопрос: Что делают overscroll-behavior и scrollbar-gutter?

**Короткий ответ**

`overscroll-behavior` управляет scroll chaining и overscroll actions на границе scroll container. `scrollbar-gutter`
может зарезервировать место под classic scrollbar, чтобы его появление не сдвигало layout.

**Полный ответ**

Когда вложенный scroll container доходит до края, дальнейший scroll gesture может передаться ancestor. Это называется
scroll chaining.

Например modal:

```css
.modal-content {
  overflow: auto;
  overscroll-behavior: contain;
}
```

`contain` не дает scroll продолжиться на page после достижения края modal, но сохраняет часть local overscroll behavior.

`overscroll-behavior: none` идет дальше и отключает chaining и некоторые platform overscroll effects. Применять его на
root без необходимости опасно: можно сломать ожидаемые navigation/refresh gestures конкретной platform.

Property можно задавать по axes:

```css
.carousel {
  overflow-x: auto;
  overscroll-behavior-inline: contain;
}
```

`scrollbar-gutter` решает другую проблему. При classic scrollbar его появление занимает часть inline size и может
сдвинуть content:

```css
.page {
  scrollbar-gutter: stable;
}
```

`stable` заранее резервирует gutter там, где scrollbar занимает layout space. Для symmetric layouts существует
`stable both-edges`.

На systems с overlay scrollbars отдельная полоса может не занимать layout space, поэтому visible effect будет другим.
Нельзя рассчитывать на `scrollbar-gutter` как на универсальный способ "всегда показать отступ справа".

Практически оба properties стоит применять локально: `overscroll-behavior` там, где chaining действительно мешает
interaction, а `scrollbar-gutter` там, где появление classic scrollbar вызывает заметный layout shift.

На интервью: **одно property управляет передачей scroll gesture между containers, другое — резервированием layout space
под scrollbar; это разные проблемы**.





#### Вопрос: Когда использовать subgrid?

**Короткий ответ**

`subgrid` нужен, когда nested grid должен использовать tracks родительского grid по rows или columns. Он полезен для
форм, карточек и табличных layouts, где внутренние элементы должны выравниваться по общей сетке.

**Полный ответ**

Обычный nested grid создает собственную независимую track system:

```css
.form-row {
  display: grid;
  grid-template-columns: 10rem 1fr;
}
```

Если каждая группа сама определяет columns, widths могут расходиться. `subgrid` позволяет nested grid продолжить tracks
родителя:

```css
.form {
  display: grid;
  grid-template-columns: max-content minmax(0, 1fr);
  gap: 0.75rem 1rem;
}

.form-group {
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: subgrid;
}
```

Теперь label/control внутри каждой `.form-group` используют те же columns, что и parent, поэтому labels выравниваются
между groups без дублирования track sizes.

Subgrid можно включить только по одной axis:

```css
.item {
  display: grid;
  grid-template-columns: subgrid;
  grid-template-rows: auto 1fr;
}
```

На subgridded axis nested grid не создает независимые explicit tracks — он участвует в track system parent. Gaps также
связаны с parent grid, хотя их можно переопределять в нужном scope.

`subgrid` полезен, когда alignment должен проходить через component boundary. Если nested layout полностью локальный и
не должен синхронизироваться с siblings, обычный Grid проще.

Нужно также проверить, что markup реально позволяет nested element span нужные parent tracks. Иногда попытка применить
`subgrid` к неподходящей hierarchy сложнее, чем небольшой redesign DOM/grid structure.

На интервью: **обычный nested Grid изолирует tracks, а `subgrid` наследует track definition по выбранной axis, что
решает cross-component alignment без дублирования размеров**.
