# CSS — вопросы и ответы, часть 8

> Автоматически сгенерировано из src/pages/css/index.md. Не редактируйте вручную.

### CSS layout и component tasks



#### Вопрос: Практическая задача: сделайте CSS-only star rating display.

**Короткий ответ**

Для read-only rating можно передать значение через custom property и визуально заполнить часть строки звезд gradient.
Если rating интерактивный, CSS-only display уже недостаточен: нужны настоящие form controls, keyboard interaction,
accessible name и понятное состояние для screen reader.

**Полный ответ**

Сначала нужно уточнить requirement: это **только отображение оценки** или пользователь должен ее менять.

Для read-only варианта можно оставить в DOM обычный текст для accessibility, а визуальную часть построить отдельно:

```html
<span
  class="rating"
  style="--rating: 3.5"
  aria-label="Рейтинг: 3.5 из 5"
>
  <span aria-hidden="true">★★★★★</span>
</span>
```

```css
.rating {
  --max-rating: 5;
  --percent: calc(var(--rating) / var(--max-rating) * 100%);

  display: inline-block;
  position: relative;
  font-size: 1.25rem;
  line-height: 1;
}

.rating > span {
  color: #c8c8c8;
}

.rating::after {
  content: '★★★★★';
  position: absolute;
  inset: 0;
  inline-size: var(--percent);
  overflow: hidden;
  color: currentColor;
  white-space: nowrap;
  pointer-events: none;
}
```

Здесь `--rating` задает data-driven value, а overlay показывает только нужную долю заполненных звезд.

Можно сделать и через text gradient:

```css
.rating > span {
  background: linear-gradient(90deg, currentColor var(--percent), #c8c8c8 var(--percent));
  background-clip: text;
  color: transparent;
}
```

Но важно помнить: gradient — presentation. Значение `3.5 из 5` должно оставаться доступным независимо от CSS.

Для fractional rating есть edge cases:

- значение нужно clamp-ить в диапазон `0..5` до передачи в style;
- при RTL direction простой gradient слева направо может заполнять звезды с неправильной стороны;
- icon font может иметь нестабильные metrics, поэтому SVG/icons часто предсказуемее;
- custom font со звездами не должен быть единственным носителем значения;
- нужно проверить forced colors/high contrast mode.

Например для RTL можно менять направление gradient:

```css
[dir='rtl'] .rating > span {
  background-image: linear-gradient(270deg, currentColor var(--percent), #c8c8c8 var(--percent));
}
```

Если задача **интерактивная**, pseudo-elements недостаточно. Нужен semantic input, например radio group:

```html
<fieldset>
  <legend>Оцените товар</legend>

  <label>
    <input
      type="radio"
      name="rating"
      value="1"
    />
    1
  </label>
  <label>
    <input
      type="radio"
      name="rating"
      value="2"
    />
    2
  </label>
  <label>
    <input
      type="radio"
      name="rating"
      value="3"
    />
    3
  </label>
  <label>
    <input
      type="radio"
      name="rating"
      value="4"
    />
    4
  </label>
  <label>
    <input
      type="radio"
      name="rating"
      value="5"
    />
    5
  </label>
</fieldset>
```

Затем CSS может визуально превратить controls в звезды, но keyboard navigation, checked state и form semantics уже
обеспечены нативными controls.

На интервью полезно проговорить ход решения:

1. определить read-only или interactive requirement;
2. отделить semantic value от decorative stars;
3. не хранить business value только в CSS;
4. проверить fractional values, RTL и accessibility;
5. для interactive variant использовать native controls, а CSS оставить presentation layer.

Сильный ответ — не просто показать gradient, а объяснить, **почему CSS-only подходит для display и где его граница как
interaction model**.





#### Вопрос: Практическая задача: сверстайте responsive card grid без JavaScript.

**Короткий ответ**

Для content-driven responsive grid подходит CSS Grid с `repeat(auto-fit, minmax(...))`: количество колонок меняется без
JavaScript и без жестких breakpoints. Нужно ограничить minimum track size так, чтобы grid не переполнял узкий container,
и отдельно обеспечить стабильные размеры media/content.

**Полный ответ**

Для начала можно решить задачу без media queries:

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
  gap: 1rem;
}

.card {
  min-inline-size: 0;
}
```

Главная часть:

```css
repeat(auto-fit, minmax(min(100%, 18rem), 1fr))
```

означает:

- `18rem` — желаемая minimum ширина карточки;
- `min(100%, 18rem)` не дает minimum track стать шире самого container;
- `1fr` позволяет доступному месту распределяться между колонками;
- `auto-fit` создает столько tracks, сколько помещается, и схлопывает пустые.

Поэтому layout естественно переходит, например, от четырех колонок к трем, двум и одной в зависимости от **реальной
ширины container**, а не от заранее выбранного viewport breakpoint.

Это особенно полезно для reusable component: один и тот же grid может находиться и на full-width page, и в sidebar.

Если container-relative behavior важен еще сильнее, можно добавить container query для деталей карточки:

```css
.cards {
  container-type: inline-size;
}

@container (width < 32rem) {
  .card {
    grid-template-columns: auto 1fr;
  }
}
```

Но сама раскладка колонок в простом случае уже решается Grid без JavaScript и без container query.

Почему не просто:

```css
grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
```

На container уже `18rem` minimum track может вызвать horizontal overflow. Обертка `min(100%, 18rem)` разрешает track
сжаться до container width.

Еще один common edge case — intrinsic minimum size descendants. Длинный URL, code или `white-space: nowrap` может
растянуть grid item. Поэтому у внутренних flex/grid children часто нужен:

```css
.card__content {
  min-inline-size: 0;
}
```

и корректная стратегия wrapping:

```css
.card__title {
  overflow-wrap: anywhere;
}
```

Для media нужно заранее резервировать место, чтобы изображения не создавали layout shift:

```css
.card__media {
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.card__media img {
  inline-size: 100%;
  block-size: 100%;
  object-fit: cover;
}
```

Еще важно понимать `auto-fit` vs `auto-fill`:

- `auto-fill` сохраняет потенциальные пустые tracks;
- `auto-fit` схлопывает пустые tracks, поэтому существующие cards чаще растягиваются на освободившееся место.

Например при трех карточках в широком container `auto-fit` может растянуть эти три columns, а `auto-fill` продолжит
учитывать место под потенциальную четвертую.

При выборе между Grid и Flexbox здесь Grid обычно лучше, потому что задача двумерная: cards должны формировать
согласованные rows/columns. Flexbox подходит, если нужен прежде всего одномерный flow и independent item widths.

Что стоит проверить:

- container шире и уже minimum card size;
- очень длинный title/content;
- одна карточка и неполная последняя row;
- изображения до/после загрузки;
- zoom и увеличенный text;
- RTL, если карточка содержит directional layout;
- отсутствие horizontal scroll на mobile.

На интервью сильный ответ выглядит так: **сначала дать рабочий Grid rule, затем объяснить `auto-fit`, `minmax()`,
intrinsic sizing и layout-shift prevention, а не просто воспроизвести snippet по памяти**.
