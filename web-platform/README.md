## Web Platform

- [HTML, forms, accessibility, SEO и media](html/README.md)
- [CSS](../css/README.md)
- [Browser rendering и performance](browser/README.md)
- [HTTP, HTTPS и curl](http/README.md)

### Большие данные, сеть и browser APIs

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

<details>
<summary>Какие Unicode-проблемы встречаются в input, forms и URLs?</summary><br>
<table><tr><td>

Пользовательский ввод может содержать emoji, combining marks, разные формы нормализации Unicode и символы из разных
алфавитов, которые визуально похожи. Поэтому ограничение длины, validation, search и сравнение строк должны учитывать
продуктовый контекст.

Для URLs значения нужно кодировать через `encodeURIComponent` или API вроде `URLSearchParams`, а не склеивать строку
вручную.

```ts
const params = new URLSearchParams({query: searchQuery});
const url = `/api/search?${params.toString()}`;
```

Для форм важно не обрезать строку посередине surrogate pair или grapheme cluster, если интерфейс поддерживает emoji и
многоязычный ввод.

</td></tr></table>

</details>
