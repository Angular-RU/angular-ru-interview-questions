# Примеры Flexbox

Учебные примеры для подготовки к вопросам по CSS Flexbox.

## Что показывают примеры

- main axis и cross axis;
- `justify-content`;
- `align-items`;
- `flex-direction`;
- `flex-wrap`;
- `gap`;
- `flex-grow`;
- `flex-shrink`;
- `flex-basis`;
- `flex: 1`;
- `min-width: 0`;
- фиксированная и гибкая колонка;
- равные колонки;
- центрирование;
- прижатие элемента к низу карточки.

## Как открыть пример

Каждый пример состоит из обычных HTML/CSS-файлов. Открой нужный `index.html` в браузере:

```bash
open example1/index.html
```

Для другого сценария замени `example1` на нужную папку из карты примеров.

## Карта примеров

| Пример      | Что показывает                              | Связанные вопросы                                                                                                                                     |
| ----------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `example1`  | main axis, `justify-content`, `align-items` | [`main axis` и `cross axis`](../../../README.md#flexbox-axes), [отличие `justify-content` от `align-items`](../../../README.md#flexbox-justify-align) |
| `example2`  | `flex-direction: column`, смена main axis   | [`flex-direction`](../../../README.md#flexbox-direction), [`main axis` и `cross axis`](../../../README.md#flexbox-axes)                               |
| `example3`  | `flex-wrap`, `gap`, `align-content`         | [`flex-wrap`](../../../README.md#flexbox-wrap), [`gap`](../../../README.md#flexbox-gap)                                                               |
| `example4`  | `row-gap`, `column-gap`, перенос строк      | [`gap`](../../../README.md#flexbox-gap), [`gap` вместо margin](../../../README.md#flexbox-gap-vs-margin)                                              |
| `example5`  | центрирование flex-элементов                | [центрирование через Flexbox](../../../README.md#flexbox-centering)                                                                                   |
| `example6`  | `flex-shrink`, сжатие flex-элементов        | [`flex-grow`, `flex-shrink` и `flex-basis`](../../../README.md#flexbox-grow-shrink-basis), [`min-width: 0`](../../../README.md#flexbox-min-width-0)   |
| `example7`  | `flex-grow`, `align-self`, равные колонки   | [`flex: 1`](../../../README.md#flexbox-flex-1), [равные колонки](../../../README.md#flexbox-equal-columns)                                            |
| `example8`  | разные коэффициенты `flex-grow`             | [`flex-grow`](../../../README.md#flexbox-grow-shrink-basis), [`flex-basis: 0` vs `auto`](../../../README.md#flexbox-basis-0-auto)                     |
| `example10` | `margin-right: auto` во flex-контейнере     | [прижать блок к низу карточки](../../../README.md#flexbox-card-bottom), [типичные ошибки](../../../README.md#flexbox-common-mistakes)                 |

## Связанные вопросы

- [Что такое Flexbox?](../../../README.md#flexbox-what)
- [Какие задачи решает Flexbox?](../../../README.md#flexbox-tasks)
- [Что такое main axis и cross axis?](../../../README.md#flexbox-axes)
- [Чем `justify-content` отличается от `align-items`?](../../../README.md#flexbox-justify-align)
- [Что делает `flex-direction`?](../../../README.md#flexbox-direction)
- [Что делает `flex-wrap`?](../../../README.md#flexbox-wrap)
- [Что делает `gap` во Flexbox?](../../../README.md#flexbox-gap)
- [Почему `gap` часто удобнее, чем margin между элементами?](../../../README.md#flexbox-gap-vs-margin)
- [Что делают `flex-grow`, `flex-shrink` и `flex-basis`?](../../../README.md#flexbox-grow-shrink-basis)
- [Что значит `flex: 1`?](../../../README.md#flexbox-flex-1)
- [Чем `flex-basis: 0` отличается от `flex-basis: auto`?](../../../README.md#flexbox-basis-0-auto)
- [Почему во Flexbox часто нужен `min-width: 0`?](../../../README.md#flexbox-min-width-0)
- [Как сделать две колонки, где одна занимает фиксированную ширину, а вторая все остальное место?](../../../README.md#flexbox-fixed-fluid-columns)
- [Как сделать равные колонки через Flexbox?](../../../README.md#flexbox-equal-columns)
- [Как прижать кнопку или блок к низу карточки через Flexbox?](../../../README.md#flexbox-card-bottom)
- [Как центрировать элемент по горизонтали и вертикали через Flexbox?](../../../README.md#flexbox-centering)
- [Когда лучше использовать Flexbox, а когда CSS Grid?](../../../README.md#flexbox-vs-grid-when)
- [Какие типичные ошибки бывают при использовании Flexbox?](../../../README.md#flexbox-common-mistakes)
