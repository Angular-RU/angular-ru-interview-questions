# Примеры CSS Grid

Учебные примеры для подготовки к вопросам по CSS Grid.

## Что показывают примеры

- явная сетка через `grid-template-columns` и `grid-template-rows`;
- распределение пространства через `fr`;
- фиксированная и гибкая колонка;
- выравнивание элементов и всей сетки;
- неявная сетка через `grid-auto-*`;
- именованные области через `grid-template-areas`;
- адаптивная перестройка областей в media queries;
- наложение элементов в одной grid-ячейке;
- Grid stacking через пересекающиеся линии и общую grid-ячейку;
- Grid wrapping через auto-placement, `auto-fit` и `minmax()`;
- responsive cards через `repeat()`, `auto-fit` и `minmax()`.

## Как открыть пример

Каждый пример состоит из обычных HTML/CSS-файлов. Открой нужный `index.html` в браузере:

```bash
open example1/index.html
```

Для другого сценария замени `example1` на нужную папку из карты примеров.

## Карта примеров

| Пример      | Что показывает                                          | Связанные вопросы                                                                                                                                                                                                  |
| ----------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `example1`  | явная сетка 3 на 3, фиксированные tracks, `gap`         | [CSS Grid basics](../../../../src/pages/css/index.md#grid-what), [`grid-template-columns` и `grid-template-rows`](../../../../src/pages/css/index.md#grid-template-tracks)                                         |
| `example2`  | распределение ширины через `fr`                         | [`grid-template-columns` и `grid-template-rows`](../../../../src/pages/css/index.md#grid-template-tracks), [когда выбирать Grid](../../../../src/pages/css/index.md#grid-when)                                     |
| `example3`  | двухколоночный layout: фиксированный sidebar и content  | [Grid вместо Flexbox](../../../../src/pages/css/index.md#grid-when), [Grid vs Flexbox](../../../../src/pages/css/index.md#grid-vs-flexbox)                                                                         |
| `example4`  | `justify-items`, `align-items`, `justify-content`       | [CSS Grid basics](../../../../src/pages/css/index.md#grid-what), [`grid-template-columns` и `grid-template-rows`](../../../../src/pages/css/index.md#grid-template-tracks)                                         |
| `example5`  | неявные tracks и `grid-auto-flow: column`               | [`grid-template-columns` и `grid-template-rows`](../../../../src/pages/css/index.md#grid-template-tracks)                                                                                                          |
| `example6`  | `grid-template-areas` и разные layouts в media queries  | [Grid вместо Flexbox](../../../../src/pages/css/index.md#grid-when), [Grid vs Flexbox](../../../../src/pages/css/index.md#grid-vs-flexbox)                                                                         |
| `example7`  | `grid-template-areas` с `grid-auto-rows` и fixed tracks | [Grid вместо Flexbox](../../../../src/pages/css/index.md#grid-when), [`grid-template-columns` и `grid-template-rows`](../../../../src/pages/css/index.md#grid-template-tracks)                                     |
| `example8`  | `grid-template-areas` с гибкими колонками `1fr`         | [Grid вместо Flexbox](../../../../src/pages/css/index.md#grid-when), [`grid-template-columns` и `grid-template-rows`](../../../../src/pages/css/index.md#grid-template-tracks)                                     |
| `example9`  | наложение grid items через пересекающиеся линии         | [Grid stacking](../../../../src/pages/css/index.md#grid-stacking), [CSS Grid basics](../../../../src/pages/css/index.md#grid-what)                                                                                 |
| `example10` | наложение текста поверх изображения в одной grid-ячейке | [Grid stacking](../../../../src/pages/css/index.md#grid-stacking), [CSS Grid basics](../../../../src/pages/css/index.md#grid-what)                                                                                 |
| `example11` | responsive product grid через `auto-fit` и `minmax()`   | [Grid wrapping](../../../../src/pages/css/index.md#grid-wrapping), [`minmax()`](../../../../src/pages/css/index.md#grid-minmax), [`auto-fit` и `auto-fill`](../../../../src/pages/css/index.md#grid-auto-fit-fill) |

## Связанные вопросы

- [Flexbox и CSS Grid](../../../../src/pages/css/index.md#flexbox-vs-grid-when)
- [CSS Grid basics](../../../../src/pages/css/index.md#grid-what)
- [Grid vs Flexbox](../../../../src/pages/css/index.md#grid-vs-flexbox)
- [Grid вместо Flexbox](../../../../src/pages/css/index.md#grid-when)
- [`grid-template-columns` и `grid-template-rows`](../../../../src/pages/css/index.md#grid-template-tracks)
- [`minmax()`](../../../../src/pages/css/index.md#grid-minmax)
- [`auto-fit` и `auto-fill`](../../../../src/pages/css/index.md#grid-auto-fit-fill)
- [Grid stacking](../../../../src/pages/css/index.md#grid-stacking)
- [Grid wrapping](../../../../src/pages/css/index.md#grid-wrapping)
