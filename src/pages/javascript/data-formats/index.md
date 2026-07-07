---
layout: ../../../layouts/Layout.astro
title: JavaScript data formats and binary data
description: Вопросы и ответы
category: Frontend
kind: questions
order: 71
---

## JavaScript data formats and binary data

### JSON, binary data и i18n

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
