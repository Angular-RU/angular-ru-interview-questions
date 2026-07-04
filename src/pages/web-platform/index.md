---
layout: ../../layouts/Layout.astro
title: Web Platform
description: Вопросы и ответы
category: Frontend
kind: questions
order: 20
---

## Web Platform

- [HTML, forms, accessibility, SEO и media](html/)
- [CSS](../css/)
- [Browser rendering и performance](browser/)
- [HTTP, HTTPS и curl](http/)

### Большие данные, сеть и browser APIs

#### Middle

<details>
<summary>Почему стоимость <code>JSON.parse</code> и <code>JSON.stringify</code> важна?</summary><br>
<table><tr><td>

`JSON.parse()` и `JSON.stringify()` выполняют синхронную работу и могут блокировать main thread на больших payload.
Большой ответ API может быть быстрым по сети, но затем зависнуть на parsing, нормализации и rendering.

Практические решения: уменьшать payload, использовать pagination, отдавать только нужные поля, переносить тяжелую
обработку в Web Worker, кешировать уже нормализованные данные или выбирать streaming/binary format там, где это
действительно оправдано.

</td></tr></table>

</details>

<details>
<summary>Какие Unicode-проблемы могут быть в URL?</summary><br>
<table><tr><td>

URL может содержать Unicode в hostname, path и query, но разные части кодируются по-разному. Hostname с не-ASCII
символами преобразуется через IDNA/Punycode, а path и query используют percent-encoding. Визуально похожие символы из
разных алфавитов могут создавать phishing и homograph risks.

Также встречаются разные формы нормализации Unicode, combining marks и emoji. Поэтому validation, search, canonical URL
и сравнение ссылок должны учитывать продуктовый контекст, а не простое побайтовое равенство строк.

</td></tr></table>

</details>

<details>
<summary>Почему нельзя собирать URL простой конкатенацией строк?</summary><br>
<table><tr><td>

Конкатенация легко ломает encoding, `?`, `&`, `#`, пробелы, slash boundaries и значения вроде `a&role=admin`. Ошибочный
URL может отправить неправильный query, сломать cache key, открыть redirect bug или привести к CORS-запросу не на тот
origin.

Для query используйте `URLSearchParams`, а для абсолютных адресов — `URL`:

```ts
const params = new URLSearchParams({
  page: String(page),
  query: searchQuery,
});

const url = new URL('/api/search', location.origin);
url.search = params.toString();

await fetch(url);
```

`URLSearchParams` сам закодирует пробелы, амперсанды, Unicode и другие специальные символы в значениях параметров.

</td></tr></table>

</details>

#### Middle+ or Senior

<details>
<summary>Почему network latency не описывают через Big O?</summary><br>
<table><tr><td>

Big O описывает рост вычислительной сложности относительно размера входа. Network latency зависит от расстояния,
маршрута, TLS, состояния соединения, сервера, CDN и качества сети пользователя.

Frontend-разработчику важно разделять CPU-bound и I/O-bound проблемы. `O(n)` фильтрация может лагать из-за main thread,
а медленный API-запрос — из-за latency, throughput, backend queue или cache miss. Для первого помогают профилировщик,
алгоритм, virtual scroll и Web Worker; для второго — caching, batching, prefetch, pagination, timeout и retry policy.

</td></tr></table>

</details>

<details>
<summary>Когда нужны pagination, streaming или virtual scroll?</summary><br>
<table><tr><td>

Если данных много, проблема обычно не только в загрузке, но и в памяти, вычислениях и DOM rendering. Pagination
ограничивает размер страницы данных, streaming позволяет начать обработку до полного ответа, virtual scroll рендерит
только видимую часть списка.

В Angular large table часто начинают с server-side pagination/filtering/sorting. Если UX требует плавного просмотра
большого локального списка, добавляют virtual scroll и стабильный `track` в `@for`, чтобы не пересоздавать DOM без
необходимости.

</td></tr></table>

</details>

<details>
<summary>Для чего нужны <code>ArrayBuffer</code>, <code>TypedArray</code> и <code>Blob</code>?</summary><br>
<table><tr><td>

`ArrayBuffer` представляет участок бинарной памяти, `TypedArray` дает типизированный view поверх него, а `Blob` хранит
immutable file-like binary data. Эти API нужны для файлов, изображений, audio/video, WebSocket binary messages,
WebAssembly, canvas и stream processing.

```ts
const response = await fetch('/assets/report.pdf');
const file = await response.blob();

const url = URL.createObjectURL(file);
```

После `URL.createObjectURL()` важно вызвать `URL.revokeObjectURL(url)`, когда ссылка больше не нужна, чтобы не держать
память.

</td></tr></table>

</details>

### i18n и platform details

#### Middle

<details>
<summary>Как использовать Intl API в frontend-приложении?</summary><br>
<table><tr><td>

`Intl` дает стандартные formatter APIs для дат, чисел, валют, plural rules, relative time, lists и collation. Это лучше,
чем вручную собирать строки с датами и валютами.

```ts
const price = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
}).format(1250);
```

Важно не создавать formatter в горячем loop без необходимости: formatter можно кешировать по locale/options. Также нужно
учитывать timezone, fallback locale и тесты для разных языков.

</td></tr></table>

</details>

<details>
<summary>Какие frontend-проблемы появляются при RTL?</summary><br>
<table><tr><td>

RTL влияет на direction, порядок inline content, иконки направления, отступы, scroll behavior, charts, drag and drop и
анимации. CSS logical properties (`margin-inline-start`, `inset-inline-end`) уменьшают количество отдельных overrides.

Нельзя просто поменять `text-align`. Нужно проверить keyboard navigation, focus order, truncation, mixed LTR/RTL text,
date/number formatting и screenshots основных экранов.

```css
.toolbar {
  padding-inline-start: 1rem;
  padding-inline-end: 0.5rem;
}
```

</td></tr></table>

</details>
