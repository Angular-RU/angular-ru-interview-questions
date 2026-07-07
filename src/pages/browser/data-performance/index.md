---
layout: ../../../layouts/Layout.astro
title: Data loading and rendering performance
description: Вопросы и ответы
category: Frontend
kind: questions
order: 51
---

## Data loading and rendering performance

### Большие данные, сеть и rendering

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
