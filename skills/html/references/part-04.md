# HTML — вопросы и ответы, часть 4

> Автоматически сгенерировано из src/pages/html/index.md. Не редактируйте вручную.

### SEO и metadata



#### Вопрос: Зачем нужен meta name="viewport"?

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





#### Вопрос: Что такое favicon?

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





#### Вопрос: Что такое canonical URL?

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





#### Вопрос: Для чего нужны title и meta description?

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





#### Вопрос: Какие HTML-теги важны для поисковых систем?

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





#### Вопрос: Какие SEO-практики важны для frontend-разработчика?

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





#### Вопрос: Как правильно использовать заголовки h1–h6?

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





#### Вопрос: Что такое Open Graph?

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





#### Вопрос: Как SSR влияет на SEO?

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
