# CSS — вопросы и ответы, часть 5

> Автоматически сгенерировано из src/pages/css/index.md. Не редактируйте вручную.

### CSS Architecture



#### Вопрос: Что такое CSS methodology и зачем она нужна?

**Короткий ответ**

CSS methodology — это набор правил для организации CSS: например BEM, SMACSS, OOCSS, CSS Modules или utility-first
подход. Методология помогает договориться, как называть классы, где хранить styles и как ограничивать область влияния.
Важно не название методологии, а консистентность, понятные границы и documented exceptions.

**Полный ответ**

CSS methodology — это не конкретная библиотека, а **командный contract** о том, как строить и изменять styles так, чтобы
локальное изменение не превращалось в поиск случайных overrides по всему приложению.

Методология обычно отвечает сразу на несколько вопросов:

- как именовать classes и состояния;
- где проходит boundary component/feature/global styles;
- как переиспользовать declarations и composition;
- какой уровень specificity считается нормальным;
- где допустимы global rules;
- как оформлять variants, themes и responsive states;
- как подключать third-party styles и делать исключения.

Например, BEM делает связь block/element/modifier явной через имена:

```css
.user-card {
}

.user-card__title {
}

.user-card--compact {
}
```

CSS Modules решают другую часть той же задачи — автоматически делают class names локальными для module. Utility-first
подход переносит значительную часть composition в markup. Эти подходы **не взаимоисключающие**: проект может
использовать CSS Modules для isolation, design tokens для values и utilities для частых layout primitives.

Главная польза methodology проявляется не на первом компоненте, а после сотен изменений. Она снижает число неявных
зависимостей и дает разработчику ответ на вопрос: «куда положить style и чем я имею право его переопределить?».

Но слишком жесткая методология тоже вредна. Если правило заставляет писать сложнее без реальной защиты invariant,
команда начинает обходить его через исключения. Поэтому полезнее небольшой набор проверяемых principles, чем десятки
naming rules без объяснения причин.

Часть соглашений можно автоматизировать: stylelint, lint rules, code review, project boundaries. Остальное должно быть
описано как архитектурное решение с примерами и допустимыми exceptions.

На интервью: **CSS methodology — это способ контролировать naming, scope, composition и cascade в большой кодовой базе;
ценность не в названии BEM/SMACSS, а в предсказуемости изменений и явных boundaries**.





#### Вопрос: Что такое design tokens?

**Короткий ответ**

Tokens — именованные design decisions: colors, spacing, typography, radii, motion. Их хранят в нейтральном source of
truth и преобразуют в CSS custom properties, platform constants и design-tool variables. Семантические tokens вроде
--color-danger устойчивее прямых названий оттенков.

**Полный ответ**

Design tokens — это **именованные design decisions**, которые отделяют смысл значения от конкретной реализации. Вместо
того чтобы каждый component знал конкретный hex, radius или duration, он использует token с понятной ролью.

Обычно выделяют несколько уровней.

Primitive tokens описывают палитру/шкалу:

```css
:root {
  --blue-600: #2563eb;
  --space-2: 0.5rem;
}
```

Semantic tokens описывают назначение:

```css
:root {
  --color-text-primary: #111827;
  --color-action-primary: var(--blue-600);
  --space-control-gap: var(--space-2);
}
```

Component может использовать именно semantic contract:

```css
.button {
  color: white;
  background: var(--color-action-primary);
  gap: var(--space-control-gap);
}
```

Это позволяет theme поменять palette, не переписывая component rules:

```css
[data-theme='dark'] {
  --color-text-primary: #f9fafb;
  --color-action-primary: #60a5fa;
}
```

Важно: **token не равен CSS custom property**. Source of truth может храниться в JSON/дизайн-системе, а build pipeline
преобразует tokens в CSS variables, Sass values, Android/iOS constants или variables дизайн-инструмента. DTCG также
определяет vendor-neutral формат обмена tokens и aliases между инструментами.

Aliases полезны, когда semantic token ссылается на primitive: `action.primary` может указывать на `palette.blue.600`.
Тогда смена brand palette не требует искать raw color по всему продукту.

Антипаттерн — дать компонентам напрямую использовать только primitives вроде `--blue-600`. Такой код знает **как
выглядит** значение, но не **зачем оно нужно**, поэтому theme/refactoring сложнее. Другая крайность — создать token для
каждого одиночного числа и получить тысячи неуправляемых names.

Хорошая token architecture фиксирует ownership и уровни: primitives → semantic decisions → при необходимости
component-specific tokens.

На интервью: **design token — это переносимое именованное design decision; CSS custom property лишь один из возможных
runtime outputs. Semantic tokens уменьшают связь component с конкретной palette и упрощают themes/multi-platform design
systems**.





#### Вопрос: Что такое cascade layers @layer?

**Короткий ответ**

Cascade layers задают явный порядок групп styles до сравнения specificity. Например, reset, base, components и utilities
можно упорядочить один раз, уменьшая войны selectors и !important.

**Полный ответ**

Cascade layers позволяют явно задать **порядок приоритета групп author styles до сравнения specificity**.

Например:

```css
@layer reset, base, components, utilities, overrides;

@layer components {
  .button {
    color: blue;
  }
}

@layer utilities {
  .text-danger {
    color: red;
  }
}
```

Для обычных declarations более поздний layer имеет больший приоритет. Поэтому `.text-danger` из `utilities` может
победить `.button` из `components`, даже если selectors имеют одинаковую или меньшую specificity. Specificity
сравнивается уже **внутри одного cascade layer bucket**, а не между слоями.

Это полезно для architecture: вместо гонки `.page .dialog .button.primary` можно заранее решить, какие группы styles
имеют право переопределять другие.

Third-party CSS удобно намеренно опустить в ранний layer:

```css
@import url('vendor.css') layer(vendor);

@layer vendor, base, components, utilities;
```

Тогда собственные component styles могут переопределять library styles без искусственного повышения specificity.

Есть два важных edge cases.

**Unlayered normal styles** находятся после named layers и имеют больший приоритет, поэтому случайный global rule вне
`@layer` способен обойти всю layer architecture.

Для `!important` порядок **инвертируется**: important declarations в более ранних layers имеют больший приоритет, а
layered important declarations побеждают unlayered important. Это сделано, чтобы ранний защитный layer мог сохранять
важные invariants и чтобы `!important` не превращался просто в «еще один поздний override».

Порядок layer определяется моментом его первого создания. Поэтому его обычно объявляют один раз в начале:

```css
@layer reset, base, components, utilities, overrides;
```

`@layer` не заменяет component isolation и не отменяет необходимость разумной specificity. Он решает другой уровень
задачи — **какая группа styles сильнее другой**.

На интервью: **cascade layers добавляют явную ось приоритета между origin/importance и specificity; для normal rules
позже = сильнее, для important порядок layers обратный**.





#### Вопрос: Что такое Shadow DOM style encapsulation?

**Короткий ответ**

Shadow DOM создает отдельное tree boundary: обычные document selectors не проникают внутрь, а внутренние styles не
выходят наружу. Наследуемые properties, CSS custom properties, ::part и ::slotted формируют контролируемые точки
настройки.

**Полный ответ**

Shadow DOM создает отдельный **tree/style boundary**. Обычные selectors из document не выбирают descendants внутри
shadow tree, а внутренние selectors не начинают внезапно матчить элементы снаружи.

```js
const root = element.attachShadow({mode: 'open'});
root.innerHTML = `
  <style>
    .title { font-weight: 600; }
  </style>
  <h2 class="title"><slot></slot></h2>
`;
```

Global `.title { ... }` в document не переопределит внутреннюю `.title` только из-за совпадения class name. Это
существенно сильнее naming convention вроде BEM.

Но Shadow DOM — **не абсолютная style isolation**. Есть контролируемые каналы взаимодействия.

Inherited properties и CSS custom properties могут проходить через host:

```css
my-card {
  color: var(--color-text-primary);
  --card-radius: 1rem;
}
```

Внутри shadow tree component может использовать эти values как публичный theming contract.

Сам host можно стилизовать изнутри через `:host`:

```css
:host {
  display: block;
}
```

Для light-DOM content, переданного через `<slot>`, есть `::slotted()`:

```css
::slotted(a) {
  font-weight: 600;
}
```

При этом `::slotted()` выбирает сам slotted element, а не произвольных descendants глубже него.

Если component хочет намеренно разрешить styling внутреннего элемента снаружи, он экспортирует part:

```html
<button part="control">Save</button>
```

```css
my-button::part(control) {
  border-radius: 999px;
}
```

То есть `::part()` — явный public styling API, а не обход encapsulation. Для передачи parts через вложенные shadow
components существует `exportparts`.

Shadow DOM также не является security boundary: он организует DOM/styles и component API, но не предназначен для
сокрытия секретов или недоверенного кода.

На интервью: **Shadow DOM блокирует обычный selector matching через boundary, но оставляет намеренные contracts через
inheritance/custom properties, slots и exported parts**.





#### Вопрос: Что такое BEM?

**Короткий ответ**

BEM делит CSS-имена на block, element и modifier:

**Полный ответ**

BEM (Block, Element, Modifier) — naming convention, которая кодирует роль class прямо в имени и тем самым снижает
случайные collisions в global CSS.

Базовый пример:

```html
<article class="user-card user-card--compact">
  <h2 class="user-card__title">Max</h2>
</article>
```

```css
.user-card {
}

.user-card__title {
}

.user-card--compact {
}
```

**Block** — самостоятельная сущность, которую можно переиспользовать в другом месте: `user-card`.

**Element** — часть block, не имеющая того же смысла отдельно: `user-card__title`.

**Modifier** — вариант block/element: `user-card--compact`, `button--danger`.

Modifier обычно не заменяет base class, а дополняет его:

```html
<button class="button button--danger">Delete</button>
```

Полезная идея BEM — не отражать DOM nesting один в один. Если внутри title появился wrapper, не нужно превращать имя в
`user-card__header__title`. Element принадлежит block, поэтому обычно достаточно `user-card__title`. Это снижает связь
selectors с текущей HTML structure.

BEM также поощряет низкую specificity:

```css
.user-card__title {
}
```

обычно устойчивее, чем:

```css
.page .sidebar article > header > h2 {
}
```

Но BEM — **соглашение, а не настоящий scope mechanism**. Ошибочный global selector все равно способен затронуть block. В
проектах с CSS Modules, Shadow DOM или framework encapsulation часть задачи collision avoidance уже решена платформой,
поэтому полный BEM syntax может быть избыточен.

На интервью: **BEM делает component relation явной через block/element/modifier и уменьшает зависимость CSS от DOM
nesting; это naming discipline, а не физическая изоляция styles**.





#### Вопрос: Зачем команде нужны CSS principles?

**Короткий ответ**

CSS principles фиксируют подход к именованию, композиции, специфичности, layout, responsive design и переиспользованию.
Без таких правил CSS быстро превращается в набор случайных overrides. Хороший ответ должен упомянуть локальность стилей,
короткие selectors, осторожность с !important, общий base layer и понятные исключения.

**Полный ответ**

CSS principles — это небольшой набор **архитектурных invariants**, по которым команда принимает решения, когда
конкретной naming rule или готового рецепта нет.

Например, команда может договориться:

1. **Local by default** — feature/component styles не должны случайно менять соседние features.
2. **Global intentionally** — reset, typography, tokens и действительно общие primitives имеют отдельный global layer.
3. **Low specificity** — classes и layer order предпочтительнее длинных descendant chains и `!important` escalation.
4. **Component owns internal layout** — parent определяет место component в page layout, а component владеет своей
   внутренней геометрией.
5. **Values через tokens** — повторяемые product/design decisions не копируются raw literals по коду.
6. **DOM structure не является API без необходимости** — selector не должен ломаться от дополнительного wrapper.
7. **Responsive по constraints** — breakpoints появляются там, где ломается content/layout, а не из списка моделей
   устройств.
8. **Exceptions explicit** — нестандартный override имеет причину и локальный scope.

Principles отличаются от methodology уровнем абстракции. BEM может сказать **как назвать** class, а principle «local by
default» объясняет **зачем** нужен predictable scope независимо от BEM/CSS Modules/Shadow DOM.

Хороший principle проверяем. Например, «не писать плохой CSS» бесполезно, а «не использовать ID selectors в component
styles» можно проверить stylelint rule. Другие invariants контролируются code review и architecture examples.

Principles также помогают миграциям. Команда может перейти с SCSS+BEM на CSS Modules или utilities, сохранив правила про
ownership, specificity, tokens и exceptions.

Слишком много principles превращаются в handbook, который никто не помнит. Лучше несколько правил с rationale, good/bad
examples и описанными exceptions.

На интервью: **CSS principles — устойчивые правила про scope, ownership, cascade и reuse, которые переживают смену
конкретного framework или naming methodology**.





#### Вопрос: Когда отклонение от CSS methodology допустимо?

**Короткий ответ**

Отклонение допустимо, если стандартный подход плохо решает конкретную задачу: интеграция с внешним UI kit, legacy-код,
performance-ограничение или нестандартный layout. Исключение должно быть локальным, объясненным и по возможности
задокументированным, иначе оно быстро становится новой неявной методологией.

**Полный ответ**

Отклонение допустимо, когда обычное правило **не решает реальную constraint** или создает больший риск, чем локальное
исключение. Важно отличать осознанное exception от удобного способа не следовать архитектуре.

Типичные причины:

- third-party widget не дает достаточного styling API;
- legacy markup пока нельзя изменить;
- browser bug требует workaround;
- performance measurement показал необходимость другого implementation;
- migration идет поэтапно и старый/new style systems временно сосуществуют;
- нестандартный layout действительно проще выразить иначе.

Например, override vendor CSS лучше ограничить wrapper/layer:

```css
@layer vendor, components, overrides;

@layer overrides {
  .payment-widget .vendor-button {
    min-inline-size: 10rem;
  }
}
```

чем добавлять глобальный `.vendor-button { ... }`, который станет скрытым contract для всего приложения.

Хорошее исключение имеет четыре свойства:

1. **Local scope** — понятно, какие элементы оно может затронуть.
2. **Rationale** — комментарий/issue объясняет, почему standard approach недостаточен.
3. **Owner/exit condition** — если workaround временный, понятно, когда его можно удалить.
4. **Не создает новый default** — один exception не означает, что теперь этот pattern разрешен везде.

Например:

```css
/* TODO(PROJ-123): remove after vendor exposes ::part(control) */
.checkout .third-party-control {
  /* narrow workaround */
}
```

Если исключение начинает повторяться в нескольких features, это сигнал пересмотреть methodology: возможно, правило не
отражает реальную architecture и новый pattern уже нужно оформить официально.

На интервью: **exception допустим при конкретной constraint, если он локализован, объяснен и имеет понятный lifecycle;
повторяющиеся exceptions — повод менять правило, а не плодить обходы**.





#### Вопрос: Как выбрать CSS framework для проекта?

**Короткий ответ**

CSS framework выбирают по требованиям продукта: скорость разработки, accessibility компонентов, кастомизация, bundle
size, качество документации, SSR-совместимость и связь с design system. Важно заранее решить, где команда следует
framework, а где пишет собственный слой, иначе проект обрастает хаотичными overrides.

**Полный ответ**

CSS framework выбирают не по популярности, а по **constraints продукта и команды**. Сначала полезно определить, что
именно нужно получить от framework: набор utilities, layout primitives, готовые accessible components, theming
infrastructure или полноценную design system.

Обычно оценивают несколько групп критериев.

**Product fit:**

- есть ли нужные components и states;
- насколько глубоко требуется brand customization;
- нужны ли SSR/hydration, RTL, responsive behavior и internationalization;
- какие browsers и input modes нужно поддерживать.

**Engineering fit:**

- bundle/runtime cost;
- качество TypeScript/API и документации;
- предсказуемость upgrades и release policy;
- возможность tree-shaking/code splitting;
- совместимость с текущим framework и build pipeline;
- тестируемость и удобство overrides.

**Design-system fit:**

- есть ли tokens и semantic theming API;
- можно ли менять typography, spacing, colors и states без копирования internal selectors;
- совпадают ли accessibility/interaction patterns с требованиями продукта.

Например, если библиотека требует такого override:

```css
.some-page .library-dialog > div:nth-child(2) button.primary {
  /* ... */
}
```

это плохой сигнал: application code зависит от private DOM structure library.

Перед выбором полезно сделать небольшой spike на 2–3 сложных сценариях: form с validation, dialog/overlay, table/grid,
dark theme, SSR. Именно на сложных components быстрее проявляются проблемы customization и integration.

Важно заранее определить **boundary**: где команда использует framework как public API, где разрешены wrappers/adapters
и где допустим собственный CSS. Иначе постепенно появляется второй неформальный framework из локальных overrides.

Lock-in сам по себе не всегда плох: готовая библиотека может экономить годы разработки. Риск начинается, когда замена
невозможна без переписывания business markup и application state. Поэтому полезнее оценивать не «есть ли dependency», а
насколько dependency контролирует architecture приложения.

На интервью: **выбор CSS/UI framework — это trade-off между delivery speed, accessibility/design-system coverage,
customization, runtime/build cost и долгосрочной стоимостью upgrades; проверять его лучше на реальных сложных сценариях,
а не по количеству stars**.





#### Вопрос: Какие плюсы и минусы у БЭМ?

**Короткий ответ**

БЭМ дает предсказуемые глобальные имена и явно показывает block, element и modifier. Цена — длинные class names,
дисциплина соглашений и возможное дублирование контекста там, где framework уже изолирует component styles.

**Полный ответ**

Сильная сторона БЭМ — предсказуемость **global CSS namespace**. По class name обычно видно, какому block принадлежит
element и является ли class вариантом состояния.

```css
.user-card {
}

.user-card__title {
}

.user-card--compact {
}
```

Плюсы:

- низкая и обычно одинаковая specificity;
- меньше зависимости от DOM nesting;
- class names служат документацией структуры component;
- global styles реже сталкиваются по случайно одинаковым именам;
- block проще переносить между страницами без page-specific selectors.

Например, selector:

```css
.user-card__title {
}
```

устойчивее к дополнительному wrapper, чем:

```css
.sidebar article > header > h2 {
}
```

Но цена тоже заметна.

**Длинные names.** В большой design system modifiers и nested concepts могут делать markup шумной.

**Ручная дисциплина.** Browser не запрещает случайно написать global `.title` или связать block с внешним DOM. БЭМ не
является настоящим scope mechanism.

**Избыточность при реальной encapsulation.** Если CSS Modules, Angular encapsulation или Shadow DOM уже обеспечивают
локальность selectors, повторение полного block prefix во всех classes может не давать прежней пользы.

**Не решает cascade architecture целиком.** БЭМ не определяет порядок layers, tokens, themes и ownership global styles.

Поэтому БЭМ особенно полезен там, где styles действительно живут в общем namespace. В component-scoped architecture
часто сохраняют идеи БЭМ — low specificity, явные states, независимость от DOM — но используют более короткие names.

На интервью: **БЭМ дает понятный naming contract и устойчивый global namespace, но требует дисциплины и может
дублировать работу framework-level style isolation; его ценность — в principles, а не в обязательной длине class name**.





#### Вопрос: Чем CSS Modules, CSS-in-JS и utility-first CSS отличаются?

**Короткий ответ**

CSS Modules генерируют локальные class names, CSS-in-JS связывает styles с JavaScript runtime или build step,
utility-first собирает UI из небольших готовых classes. Выбор влияет на isolation, runtime cost, theming, tooling,
server rendering и читаемость markup.

**Полный ответ**

Эти подходы решают разные части CSS architecture, поэтому их полезнее сравнивать не как три взаимоисключающих
«framework», а по **scope, generation и месту composition**.

### CSS Modules

CSS пишется в обычном файле, а build step преобразует локальные class names в уникальные identifiers:

```css
/* card.module.css */
.title {
  font-weight: 600;
}
```

Application импортирует mapping и получает compile/build-time isolation. Плюсы — обычный CSS model, хорошее browser
caching, отсутствие обязательного style runtime. Минусы — dynamic styling и cross-module composition требуют отдельных
patterns, а global styles все равно нужно проектировать отдельно.

### CSS-in-JS

Styles описываются из JavaScript/TypeScript API. Важно не сводить весь подход к runtime injection: одни libraries
генерируют styles во время выполнения, другие умеют static extraction/build-time output.

Плюсы:

- удобно связывать styles с component variants и typed API;
- colocated component code;
- powerful theming/composition abstractions.

Trade-offs зависят от реализации: runtime generation может стоить CPU и усложнять SSR/hydration, а build-time variants
уменьшают этот cost, но добавляют compiler/tooling constraints.

### Utility-first

Markup собирается из маленьких reusable classes:

```html
<button class="inline-flex items-center gap-2 rounded-md px-4 py-2">Save</button>
```

Composition переносится ближе к template. Это уменьшает число одноразовых selectors и делает allowed scales/tokens
видимыми через utility API. Цена — более насыщенная markup и необходимость отдельного решения для повторяющихся
component patterns.

Главные оси сравнения:

| Вопрос             | CSS Modules       | CSS-in-JS                | Utility-first               |
| ------------------ | ----------------- | ------------------------ | --------------------------- |
| Scope              | локальные classes | зависит от library       | utilities обычно глобальные |
| Runtime CSS cost   | обычно нет        | от нулевого до заметного | обычно нет                  |
| Dynamic variants   | через classes/CSS | часто очень удобно       | условная композиция classes |
| Markup verbosity   | низкая/средняя    | низкая                   | выше                        |
| Tooling dependency | build mapping     | library/compiler/runtime | generator/build tool        |

Подходы можно комбинировать: например CSS Modules для component styles, utilities для layout primitives и custom
properties для themes.

На интервью: **CSS Modules прежде всего решают local class scope, CSS-in-JS связывает styling API с JS execution/build
model, utility-first переносит composition в markup; выбирать нужно по runtime cost, theming, SSR, tooling и удобству
component ownership**.





#### Вопрос: Какие плюсы и минусы у Tailwind-подхода?

**Короткий ответ**

Utilities ускоряют композицию, ограничивают произвольные значения и удаляют неиспользуемые rules при сборке. Минусы —
шумная markup, необходимость соглашений для повторяющихся patterns и риск смешать design decisions со случайными
utilities без tokens и component boundaries.

**Полный ответ**

Tailwind — практическая реализация utility-first подхода: вместо создания selector почти для каждого component state
разработчик комбинирует готовые utilities непосредственно в markup.

```html
<button class="inline-flex items-center gap-2 rounded-md px-4 py-2 font-medium">Save</button>
```

Плюсы такого подхода:

- быстрый feedback без переключения между template и stylesheet;
- spacing, typography, colors и breakpoints можно ограничить общей шкалой;
- selectors не накапливают specificity и historical overrides;
- удаление component markup обычно удаляет и большую часть связанных styling references;
- responsive/state variants используют единый синтаксис.

Utility class также делает dependency локальной: увидев `gap-2` рядом с element, разработчик понимает источник spacing
без поиска selector в нескольких files.

Но есть trade-offs.

**Markup становится шумнее.** Сложный component может получить длинную строку classes, особенно при responsive/states.

**Повторение patterns.** Если одинаковая комбинация копируется десятки раз, нужен component boundary, template
abstraction или другой reuse mechanism. Иначе изменение pattern придется синхронизировать вручную.

**Arbitrary values могут разрушить system.** Возможность быстро написать произвольный размер полезна, но если `[37px]`
появляется повсюду, utility-first перестает ограничивать design decisions.

**Utilities не заменяют semantics.** Они хорошо описывают presentation, но состояние `danger` или `selected` все равно
должно иметь component API/semantic source of truth.

**Generated CSS зависит от source detection/configuration.** Динамически собранные class names могут быть невидимы build
tool, если generator не умеет их определить. Поэтому class construction должна соответствовать supported pattern.

Хорошая architecture обычно разделяет уровни: tokens определяют allowed values, utilities дают composition primitives,
components скрывают повторяющиеся product patterns.

На интервью: **Tailwind уменьшает custom selector/cascade overhead и ускоряет composition, но переносит complexity в
markup; качество решения зависит от tokens, component boundaries и дисциплины вокруг arbitrary/dynamic classes**.





#### Вопрос: Как сделать theme и dark theme?

**Короткий ответ**

Компоненты используют semantic custom properties, а theme переопределяет их на root container. Начальный выбор может
учитывать prefers-color-scheme, пользовательская настройка должна иметь приоритет и сохраняться. Проверяют contrast,
media assets и browser controls через color-scheme.

**Полный ответ**

Устойчивая theme architecture начинается с **semantic custom properties**. Component не должен знать, какой hex является
«dark blue»; он использует role вроде surface/text/action.

```css
:root {
  color-scheme: light;

  --color-surface: white;
  --color-text: #111827;
  --color-action: #2563eb;
}

[data-theme='dark'] {
  color-scheme: dark;

  --color-surface: #111827;
  --color-text: #f9fafb;
  --color-action: #60a5fa;
}

.card {
  color: var(--color-text);
  background: var(--color-surface);
}
```

`color-scheme` сообщает browser, какая схема поддерживается, чтобы встроенные controls, scrollbars и form elements могли
получить подходящее оформление.

System preference удобно использовать как **initial default**:

```css
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    color-scheme: dark;
    --color-surface: #111827;
    --color-text: #f9fafb;
  }
}
```

Но явный выбор пользователя обычно должен иметь приоритет над OS setting. Его можно хранить в account preference или
local storage и ставить `data-theme` на root element.

Критический edge case — flash неправильной theme при initial render. Если HTML сначала рисуется light, а JavaScript
после hydration читает storage и переключает dark, пользователь увидит заметный flash. Решения:

- определить theme на server, если preference известна;
- применить маленький inline bootstrap script до первого paint;
- не скрывать весь document до загрузки приложения.

Dark theme — не просто инверсия colors. Нужно отдельно проверить:

- contrast текста, borders и disabled states;
- images/logos/illustrations;
- focus indicators;
- shadows и overlays;
- native controls;
- forced-colors/high-contrast modes.

Semantic tokens позволяют иметь больше двух themes без переписывания components: brand/theme меняет mapping, component
API остается тем же.

На интервью: **theme строят через semantic tokens/custom properties, system preference используют как default, explicit
user choice хранится отдельно и имеет приоритет; `color-scheme` и first-paint strategy являются частью полноценной dark
theme реализации**.





#### Вопрос: Почему глобальные стили могут быть проблемой?

**Короткий ответ**

Широкие selectors создают неявные зависимости, conflicts и regressions в далеких features. Global layer оставляют для
reset, tokens, typography и действительно общих primitives; component и feature styles ограничивают понятными
boundaries.

**Полный ответ**

Global CSS имеет самый широкий **blast radius**: один selector может изменить элементы в features, о которых автор rule
не знает.

Например:

```css
button {
  border: 0;
}

.content h2 {
  margin-block: 0;
}
```

Такие rules легко становятся неявным API всего приложения. Новый component добавляется через год и неожиданно зависит от
старого order/specificity.

Типичные проблемы:

- name collisions;
- regressions в удаленных features;
- зависимость от source order;
- specificity escalation;
- сложность удаления: непонятно, кто использует rule;
- тесты component могут не воспроизводить полный набор global dependencies.

Это не означает «global CSS запрещен». Есть вещи, которые по смыслу глобальны:

- reset/normalize;
- fonts;
- semantic design tokens;
- base typography;
- document-level theme;
- действительно общие utility/primitives.

Полезно выделить их явно:

```css
@layer reset, base, components, utilities;

@layer base {
  :root {
    --color-text: #111827;
  }

  body {
    margin: 0;
    font-family: system-ui, sans-serif;
  }
}
```

Component/feature styles при этом остаются внутри своего boundary.

Опасный pattern — использовать global stylesheet как место для «быстрого фикса», потому что local selector неудобно
переопределять. Со временем такой файл превращается в список exceptions, где любое изменение требует regression testing
всего приложения.

На интервью: **проблема global styles не в самом global scope, а в неявном ownership и большом blast radius; глобальными
стоит оставлять только действительно application-wide contracts, а feature/component rules локализовать**.





#### Вопрос: Чем SCSS @import отличается от @use?

**Короткий ответ**

Legacy @import глобально объединяет файлы, может загружать их повторно и создает конфликты имен.

**Полный ответ**

Sass `@import` — legacy module mechanism с **общим global namespace**. Импортированные variables, functions и mixins
становятся доступны без namespace, а один и тот же stylesheet может фактически загружаться несколько раз.

```scss
@import 'tokens';
@import 'buttons';

.button {
  color: $primary;
}
```

Из такого файла не видно, откуда пришел `$primary`, а два modules могут случайно объявить одинаковое имя.

Sass `@use` использует module system:

```scss
@use 'tokens';

.button {
  color: tokens.$primary;
}
```

Основные отличия:

- module загружается один раз;
- members доступны через namespace;
- private members не становятся случайным public API;
- dependencies проще анализировать tooling;
- module можно конфигурировать через `with (...)` при первом `@use`.

Для library facade есть `@forward`:

```scss
// _index.scss
@forward 'colors';
@forward 'spacing';
```

Consumer затем импортирует один public entry point.

По актуальной документации Sass, Sass `@import` deprecated начиная с Dart Sass 1.80.0; для нового Sass-кода используют
module system `@use`/`@forward`. Это относится именно к **Sass @import**, а не к стандартному CSS `@import` — у них
разные semantics.

Еще один practical difference: `@use` должен находиться до обычных style rules (кроме `@forward` и допустимой module
configuration), поэтому dependency graph становится более явным.

Migration не всегда сводится к замене строки `@import` на `@use`: код, который полагался на global variables/mixins,
нужно перевести на namespaces или осознанный `as *`, а public API library — оформить через `@forward`.

На интервью: **`@import` смешивает Sass modules в global namespace, `@use` загружает module один раз и дает explicit
namespace; `@forward` формирует public facade. Sass `@import` deprecated, CSS `@import` — отдельный механизм**.





#### Вопрос: Какие есть способы изоляции стилей?

**Короткий ответ**

Основные варианты:

**Полный ответ**

Style isolation бывает разной силы: от **соглашения именования** до настоящей browser boundary. Поэтому важно понимать,
какую проблему решает каждый механизм.

### Naming convention

BEM/feature prefix уменьшают collisions:

```css
.profile-card__title {
}
```

Но browser все еще видит global selector. Это discipline, а не физический scope.

### Angular ViewEncapsulation.Emulated

Angular по умолчанию переписывает component selectors и добавляет специальные attributes элементам template. Component
styles не должны матчить произвольные элементы в соседних templates, но global styles по-прежнему могут влиять на
component. Это framework-level emulation, не Shadow DOM.

### Shadow DOM

Native shadow root создает реальную selector boundary. Document selectors обычно не входят внутрь, внутренние styles не
выходят наружу. При этом остаются намеренные APIs: inheritance/custom properties, slots и `::part()`.

### CSS Modules

Build tool делает class names локальными для module:

```css
.title {
}
```

может скомпилироваться в уникальный generated class. Это хорошо решает collisions, но global reset/tokens все равно
существуют отдельно.

### Utility-first

Utilities уменьшают число custom selectors, но сами utility classes обычно находятся в общем namespace. Это другой
способ контролировать CSS surface, а не строгая encapsulation.

### Document boundary

Для недоверенного/полностью независимого content отдельный `iframe` дает гораздо более сильную document isolation, но
имеет цену: communication, sizing, accessibility integration и performance.

Также полезны architecture boundaries — отдельные feature entry points, cascade layers, stylelint rules. Они не создают
scope сами по себе, но предотвращают случайные cross-feature dependencies.

Выбор зависит от задачи: naming convention может быть достаточна для маленького статического сайта, CSS Modules/Angular
encapsulation удобны для application components, Shadow DOM — когда нужен web-component boundary с контролируемым public
styling API.

На интервью: **изоляция — это спектр: naming conventions < generated local scope/framework encapsulation < native Shadow
DOM/document boundary; tokens и global base styles при любом варианте требуют отдельного явного contract**.





#### Вопрос: Какие плюсы и минусы готового UI Kit?

**Короткий ответ**

Плюсы: единый дизайн, accessibility primitives, быстрый старт, готовые сложные компоненты и меньше дублирования.

**Полный ответ**

Готовый UI Kit покупает команде не просто CSS, а **готовые product primitives и накопленные решения**: component APIs,
states, keyboard interaction, overlays, forms, theming и документацию.

Плюсы:

- быстрее собирать типовые screens;
- единый visual language и behavior;
- меньше дублирования сложных controls;
- централизованные fixes и improvements;
- готовые primitives для focus/keyboard/accessibility — если library действительно качественно их реализует;
- проще распространять design-system changes через одну dependency.

Особенно заметна выгода на сложных components: dialog, combobox, date picker, table, menu, tooltip. Написать их
визуально несложно; поддержать keyboard model, focus management, positioning, touch и edge cases значительно дороже.

Минусы:

- dependency/upgrade cost;
- API ограничения и vendor lock-in;
- лишний code/CSS, если tree-shaking недостаточен;
- несовпадение design language с продуктом;
- сложные overrides, если library не дает tokens/public styling API;
- regressions при major migrations.

Важно не считать label «accessible» гарантией. Перед выбором проверяют реальные keyboard/focus behavior, ARIA semantics,
screen-reader scenarios и contrast.

Для Angular/SSR application полезный evaluation checklist:

1. Совместимые Angular/browser versions и понятный release policy.
2. SSR/hydration-safe overlays и DOM access.
3. Forms/control integration.
4. Theming через public API/tokens, а не private selectors.
5. Tree-shaking/lazy-loading сложных components.
6. RTL/i18n.
7. Testability и стабильные public contracts.

Wrapping каждого UI Kit component собственным «универсальным wrapper» тоже может стать проблемой: такой слой часто
скрывает новые возможности library и удваивает API surface. Adapter полезен там, где есть настоящий application
contract, а не автоматически вокруг каждой button.

Перед adoption полезен spike на нескольких самых сложных product scenarios и небольшой upgrade experiment.

На интервью: **UI Kit ускоряет delivery и централизует сложные UI/accessibility primitives, но добавляет dependency,
upgrade и customization cost; выбирать нужно по качеству public API, theming, accessibility и integration, а не только
по внешнему виду demo**.



### CSS Rendering и Performance



#### Вопрос: Что такое critical CSS?

**Короткий ответ**

Critical CSS — минимальный набор стилей, нужный для первого видимого экрана. Его можно встроить в HTML или выделить
отдельно, чтобы браузер быстрее показал initial view. В Angular SSR/prerender сценариях это может улучшить perceived
performance, но усложняет build pipeline, cache и диагностику визуальных regressions.

**Полный ответ**

Critical CSS — это минимальный набор styles, без которого browser не может корректно показать **первый meaningful
view**. Идея не в том, чтобы «встроить весь CSS в HTML», а в том, чтобы не заставлять first render ждать большой
stylesheet, если большая его часть нужна только ниже fold или на других routes.

Упрощенная схема:

1. Browser получает HTML.
2. Находит render-blocking stylesheet.
3. До построения styled/rendered representation должен получить и разобрать CSS.
4. Только после этого first paint может использовать нужные styles.

Если критичные rules маленькие, их можно inline-ить:

```html
<style>
  .app-shell {
    display: grid;
    min-block-size: 100dvh;
  }

  .hero {
    min-block-size: 20rem;
  }
</style>
```

а non-critical CSS загружать так, чтобы он не блокировал именно initial render. Просто оставить большой external
stylesheet\nrender-blocking и дополнительно inline-ить кусок из него недостаточно.

Потенциальные плюсы:

- меньше round trips на пути к first render;
- быстрее появляется above-the-fold content;
- можно улучшить perceived performance и иногда LCP.

Но есть и цена.

**HTML становится тяжелее.** Inline CSS повторяется в каждом document response и хуже использует отдельный browser
cache.

**Extraction сложнее.** Build должен понимать, какие rules действительно нужны конкретному route/initial state.

**Есть риск рассинхронизации.** Critical и full CSS не должны давать разные layout/state, иначе появятся FOUC или layout
shift.

**Слишком большой inline block вреден.** Он увеличивает HTML и может задержать parsing/transfer вместо выигрыша.

Для SPA/Angular приложение обычно важнее сначала измерить bottleneck. Если основной LCP тормозит image, data или long JS
task, critical CSS не даст магического ускорения. В SSR/prerender сценарии extraction особенно полезен, когда initial
HTML уже содержит meaningful content.

Также critical CSS не равен «CSS для viewport 1366×768». Initial view зависит от route, responsive state, theme, fonts и
user preferences, поэтому production extraction часто консервативнее теоретического минимума.

На интервью: **critical CSS сокращает render-blocking путь для первого экрана, но увеличивает complexity и может
ухудшить cache/maintainability; сначала измеряют bottleneck, затем оптимизируют только реально критичные styles**.





#### Вопрос: Что такое reflow/layout?

**Короткий ответ**

Layout вычисляет геометрию render tree: размеры и координаты элементов. Изменение ширины, шрифта или структуры может
потребовать пересчета части или всей страницы. Стоимость растет с размером и связанностью layout.

**Полный ответ**

Layout — этап rendering pipeline, на котором browser вычисляет **геометрию boxes**: их размеры и положение с учетом
display mode, containing blocks, intrinsic sizes, fonts, constraints и других layout rules.

Например, изменение width parent может потребовать пересчитать не только его самого:

```js
panel.style.width = '50%';
```

Если от ширины panel зависят grid tracks, wrapping текста и размеры descendants, invalidation распространяется дальше по
layout tree.

Не каждое CSS-изменение вызывает layout. Например, изменение только background color обычно требует paint, но не новой
геометрии. А свойства вроде:

- width/height;
- margin/padding/border;
- position offsets;
- font metrics;
- DOM insertion/removal;

часто влияют именно на geometry.

Важно различать **layout invalidation** и фактический пересчет. Browser старается batching-ить работу до момента, когда
она нужна для следующего frame.

Проблема появляется, когда JavaScript после write сразу требует актуальную geometry:

```js
element.style.width = '20rem';
const width = element.offsetWidth;
```

Чтобы вернуть корректный `offsetWidth`, engine может быть вынужден синхронно завершить style/layout раньше
запланированного. Если такой pattern повторяется в цикле, получается forced synchronous layout/layout thrashing.

Стоимость зависит не только от числа nodes. На нее влияют layout model, dependency graph, fonts, intrinsic sizing,
containment и то, насколько широко распространилась invalidation.

Поэтому правило «layout всегда пересчитывает всю страницу» неверно. Engines умеют делать частичный re-layout, а свойства
`contain` могут ограничивать влияние subtree.

На интервью: **layout/reflow — пересчет geometry boxes; дорого не само наличие layout, а большой affected subtree и
частые forced synchronous recalculations, особенно при чередовании DOM writes и geometry reads**.





#### Вопрос: Почему GPU не делает любую анимацию бесплатной?

**Короткий ответ**

Compositor может дешево перемещать готовый layer, но его сначала нужно rasterize и хранить в GPU memory. Большие layers,
filters, uploads и частые изменения content создают overhead. Производительность подтверждают trace, а не наличием
transform: translateZ(0).

**Полный ответ**

GPU полезен прежде всего там, где browser может переиспользовать уже подготовленное изображение layer и изменить его при
compositing. Но до этого content нужно style/layout-ить, paint-ить, rasterize-ить и разместить в памяти.

Типичный удачный случай:

```css
.card {
  transition:
    transform 200ms,
    opacity 200ms;
}

.card:hover {
  transform: translateY(-0.25rem);
  opacity: 0.9;
}
```

Если engine вынес card в подходящий compositor layer, отдельные frames могут обновляться без нового layout и без
перерисовки всего содержимого.

Но «есть GPU» не означает «работа бесплатна».

**Layer нужно создать и rasterize.** Большая поверхность требует CPU/GPU work до первого composite.

**Layers занимают memory.** Сотни promoted элементов могут ухудшить performance и вызвать дополнительный raster/cache
pressure.

**Texture upload стоит времени.** Если content постоянно меняется, готовую texture нельзя просто двигать бесконечно.

**Filters и большие blur/shadow могут быть дороги.** Даже если часть работы выполняется GPU, пикселей все равно много.

**Compositing тоже имеет цену.** Engine должен собрать layers, учесть clipping, transforms, opacity и overlaps.

**Promotion не гарантируется API.** Browser сам выбирает compositing strategy; `transform: translateZ(0)` или
`will-change` — не контракт «включить GPU».

Также frame может быть потерян из-за JavaScript/main-thread work, даже если сама animation property compositor-friendly.

Правильная стратегия — смотреть Performance/Layers tooling и измерять конкретную сцену на target devices.

На интервью: **GPU ускоряет отдельные raster/compositing workloads, но layers требуют rasterization, memory и
compositing work; compositor-friendly property уменьшает часть pipeline, а не делает frame бесплатным**.





#### Вопрос: Что делают contain и content-visibility?

**Короткий ответ**

contain ограничивает влияние layout, paint, size или style элемента на остальную страницу. content-visibility: auto
позволяет пропускать rendering вне viewport, сохраняя content для поиска и accessibility tree. Для стабильной прокрутки
часто задают contain-intrinsic-size.

**Полный ответ**

`contain` позволяет явно сказать browser, что определенные аспекты subtree **не влияют на остальную страницу**. Это дает
engine возможность сильнее локализовать style/layout/paint work.

Основные виды containment включают:

- `size` — внешний размер не зависит от descendants;
- `inline-size` — containment по inline axis;
- `layout` — внутренний layout изолирован от внешнего;
- `paint` — descendants не рисуются за пределами containment box;
- `style` — некоторые style effects/counters scoped внутри subtree.

Например:

```css
.widget {
  contain: layout paint;
}
```

Но containment меняет semantics, поэтому ставить `contain: strict` на все подряд нельзя. Size containment, например,
может изменить вычисление размеров, если element не имеет подходящих explicit/intrinsic dimensions.

`content-visibility: auto` решает более high-level задачу для большого off-screen content:

```css
.feed-section {
  content-visibility: auto;
  contain-intrinsic-size: auto 30rem;
}
```

Browser применяет containment и может **пропускать rendering work**, включая layout/paint contents, пока section не
становится relevant пользователю. Это особенно полезно для длинных documents/feed sections.

Важный nuance: `content-visibility: auto` не равен `display: none`. Даже когда rendering содержимого пропущен, оно
остается semantic content документа: browser должен сохранять его для возможностей вроде find-in-page, tab navigation и
accessibility semantics.

`contain-intrinsic-size` дает placeholder/intrinsic estimate, чтобы off-screen section не схлопывалась до нуля и
scrollbar не прыгал при первом реальном layout. Вариант с `auto` позволяет использовать remembered size после того, как
element уже был отрендерен.

Есть и другой режим:

```css
.panel[hidden] {
  content-visibility: hidden;
}
```

Он ведет себя иначе: skipped content не должен участвовать в user-agent features вроде tab navigation/find-in-page.

Практически `content-visibility: auto` стоит применять к достаточно крупным самостоятельным sections. На маленьких
components overhead и complexity могут не окупиться.

На интервью: **`contain` вручную ограничивает dependency subtree, а `content-visibility: auto` позволяет browser
временно пропускать rendering неактуального content; при `auto` semantic/accessibility presence сохраняется, а
`contain-intrinsic-size` стабилизирует geometry**.
