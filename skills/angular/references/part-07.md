# Angular — вопросы и ответы, часть 7

> Автоматически сгенерировано из src/pages/angular/index.md. Не редактируйте вручную.

### Angular libraries и design systems



#### Вопрос: Чем library code отличается от application code?

**Короткий ответ**

Application знает конкретный продукт, routes, backend и окружение. Library должна работать в разных приложениях и
версиях конфигурации.

**Полный ответ**

Application знает конкретный продукт, routes, backend и окружение. Library должна работать в разных приложениях и
версиях конфигурации.

Для библиотеки важнее:

- узкий public API;
- backward compatibility;
- accessibility и theming;
- отсутствие product-specific dependencies;
- tree shaking и peer dependencies;
- migrations и документация.





#### Вопрос: Что такое pattern library и зачем она нужна?

**Короткий ответ**

Pattern library описывает повторяемые UI patterns, компоненты, states, accessibility rules и примеры использования. В
Angular-мире эту роль часто выполняют Storybook, Docusaurus, documentation site design system или собственные examples.
Она помогает продуктовым командам не изобретать один и тот же интерфейс заново.

**Полный ответ**

Pattern library описывает повторяемые UI patterns, компоненты, states, accessibility rules и примеры использования. В
Angular-мире эту роль часто выполняют Storybook, Docusaurus, documentation site design system или собственные examples.
Она помогает продуктовым командам не изобретать один и тот же интерфейс заново.





#### Вопрос: Что такое public API Angular library и почему нельзя экспортировать все?

**Короткий ответ**

Public API — imports, components, directives, tokens и types, которые библиотека обещает поддерживать.

**Полный ответ**

Public API — imports, components, directives, tokens и types, которые библиотека обещает поддерживать.

Экспорт внутренних helpers:

- связывает руки рефакторингу;
- увеличивает документацию и test surface;
- создает случайные зависимости пользователей;
- усложняет breaking changes.

Потребители импортируют только из package entry points, а не из внутренних путей.





#### Вопрос: Почему Angular должен быть peerDependency библиотеки?

**Короткий ответ**

peerDependencies сообщает, что библиотека использует Angular instance приложения. Если положить Angular в обычные
dependencies, потребитель может получить дубли framework packages, DI/runtime incompatibility и больший bundle.

**Полный ответ**

`peerDependencies` сообщает, что библиотека использует Angular instance приложения. Если положить Angular в обычные
`dependencies`, потребитель может получить дубли framework packages, DI/runtime incompatibility и больший bundle.

Диапазон peer dependency должен отражать реально протестированные версии. Runtime dependencies оставляют только для
библиотек, которые действительно должны поставляться вместе с package.





#### Вопрос: Что такое secondary entry points и когда они нужны?

**Короткий ответ**

Secondary entry point позволяет импортировать отдельную область:

**Полный ответ**

Secondary entry point позволяет импортировать отдельную область:

```ts
import {Button} from 'ui-kit/button';
```

Он полезен для независимых feature packages и optional dependencies. Слишком много entry points увеличивает build,
release и compatibility surface.

Entry points не должны образовывать cycles и импортировать внутренности друг друга в обход публичных границ.





#### Вопрос: Что такое breaking change и как версионировать библиотеку?

**Короткий ответ**

Breaking change требует изменения кода потребителя: удаление export, изменение selector/input, поведения, CSS contract
или поддерживаемых версий.

**Полный ответ**

Breaking change требует изменения кода потребителя: удаление export, изменение selector/input, поведения, CSS contract
или поддерживаемых версий.

Semantic Versioning:

- patch — совместимое исправление;
- minor — совместимая функциональность;
- major — breaking changes.

Перед major нужны deprecation period, migration guide, schematics и automated tests совместимости.





#### Вопрос: Как проектировать конфигурируемый Angular-компонент?

**Короткий ответ**

Локальные параметры передают inputs. Общую конфигурацию библиотеки предоставляют через typed InjectionToken и provider
factory:

**Полный ответ**

Локальные параметры передают inputs. Общую конфигурацию библиотеки предоставляют через typed `InjectionToken` и provider
factory:

```ts
export const provideUiConfig = (config: UiConfig): EnvironmentProviders =>
  makeEnvironmentProviders([{provide: UI_CONFIG, useValue: config}]);
```

Defaults должны быть явными, config — readonly, а локальный input может переопределять глобальное значение. Не следует
превращать один компонент в десятки boolean flags; варианты моделируют union types.





#### Вопрос: Как проектировать theme, icon и overlay API?

**Короткий ответ**

Для overlay primitives предпочтителен Angular CDK, если библиотека не решает более низкоуровневую задачу.

**Полный ответ**

- Theme API опирается на semantic CSS custom properties/tokens, а не внутренние selectors.
- Icon API принимает понятный identifier или injectable registry и поддерживает tree shaking.
- Overlay API разделяет content, position, lifecycle, focus management и escape/outside click.
- Dialog/dropdown должны иметь keyboard navigation, focus trap/restore и ARIA contract.

Для overlay primitives предпочтителен Angular CDK, если библиотека не решает более низкоуровневую задачу.





#### Вопрос: Как guidelines помогают design system в Angular?

**Короткий ответ**

Guidelines связывают компоненты design system с реальным использованием в продуктах: naming, inputs/outputs,
accessibility, theming, tokens, layout patterns и правила расширения. Это снижает количество кастомных fork-like решений
и помогает разным командам использовать UI kit одинаково.

**Полный ответ**

Guidelines связывают компоненты design system с реальным использованием в продуктах: naming, inputs/outputs,
accessibility, theming, tokens, layout patterns и правила расширения. Это снижает количество кастомных fork-like решений
и помогает разным командам использовать UI kit одинаково.





#### Вопрос: Почему Angular-команде важно документировать отклонения от UI kit или framework?

**Короткий ответ**

Отклонения появляются из-за нестандартных требований, legacy-кода или ограничений продукта. Если их не документировать,
новые разработчики будут копировать workaround как норму. Хорошая документация объясняет причину, область применения и
условия, при которых workaround можно удалить.

**Полный ответ**

Отклонения появляются из-за нестандартных требований, legacy-кода или ограничений продукта. Если их не документировать,
новые разработчики будут копировать workaround как норму. Хорошая документация объясняет причину, область применения и
условия, при которых workaround можно удалить.



### `sideEffects` в package.json и tree shaking



#### Вопрос: Что такое tree shaking?

**Короткий ответ**

Tree shaking — это оптимизация сборки, при которой bundler удаляет неиспользуемый код из итогового bundle. Лучше всего
это работает с ES modules, потому что import и export можно анализировать статически.

**Полный ответ**

Tree shaking — это оптимизация сборки, при которой bundler удаляет неиспользуемый код из итогового bundle. Лучше всего
это работает с ES modules, потому что `import` и `export` можно анализировать статически.

Пример: если приложение импортирует только `add` из `date-utils`, production build может не включить остальные
неиспользуемые exports этого модуля.





#### Вопрос: Что такое side effect в JavaScript-модуле?

**Короткий ответ**

Side effect — это действие, которое происходит просто при импорте модуля, даже если его exports не используются.

**Полный ответ**

Side effect — это действие, которое происходит просто при импорте модуля, даже если его exports не используются.

Примеры side effects:

- импорт CSS;
- регистрация polyfill;
- изменение global object;
- изменение prototype;
- регистрация custom element;
- запуск top-level initialization logic;
- добавление global event listener.

Модуль с side effect:

```ts
import './styles.css';

globalThis.__MY_LIBRARY_READY__ = true;
```

Модуль без side effects:

```ts
export function sum(a: number, b: number): number {
  return a + b;
}

export const DEFAULT_SIZE = 16;
```





#### Вопрос: Что делает "sideEffects": false в package.json?

**Короткий ответ**

"sideEffects": false сообщает bundler, что модули пакета не выполняют важных side effects при импорте. Если exports
модуля не используются, bundler может удалить такой код из production bundle.

**Полный ответ**

`"sideEffects": false` сообщает bundler, что модули пакета не выполняют важных side effects при импорте. Если exports
модуля не используются, bundler может удалить такой код из production bundle.

Пример:

```json
{
  "name": "my-library",
  "sideEffects": false
}
```





#### Вопрос: Почему "sideEffects": false помогает уменьшить bundle size?

**Короткий ответ**

Bundler не всегда может сам понять, безопасно ли удалить импортируемый модуль. Флаг "sideEffects": false дает подсказку:
если exports не используются, сам импорт модуля не нужен. Это помогает выкидывать лишний код из production build.

**Полный ответ**

Bundler не всегда может сам понять, безопасно ли удалить импортируемый модуль. Флаг `"sideEffects": false` дает
подсказку: если exports не используются, сам импорт модуля не нужен. Это помогает выкидывать лишний код из production
build.

Для shared package это особенно полезно, когда приложение использует один `button`, а рядом в пакете есть `input`,
helpers и optional integrations.





#### Вопрос: Почему этот флаг особенно важен для библиотек?

**Короткий ответ**

Библиотеки часто содержат много независимых компонентов, функций и entry points. Потребитель может импортировать только
одну часть библиотеки, и bundler должен иметь возможность удалить остальное. sideEffects помогает сделать package более
tree-shakable.

**Полный ответ**

Библиотеки часто содержат много независимых компонентов, функций и entry points. Потребитель может импортировать только
одну часть библиотеки, и bundler должен иметь возможность удалить остальное. `sideEffects` помогает сделать package
более tree-shakable.

Для Angular library это важно вместе с ESM output, secondary entry points, tree-shakable providers и аккуратными public
exports.





#### Вопрос: Чем опасен неправильный "sideEffects": false?

**Короткий ответ**

Если пакет помечен как side-effect-free, но внутри есть важные side effects, bundler может удалить нужный код. Ошибка
может проявиться только в production build: например, пропадут стили, не зарегистрируется polyfill или не выполнится
initialization logic.

**Полный ответ**

Если пакет помечен как side-effect-free, но внутри есть важные side effects, bundler может удалить нужный код. Ошибка
может проявиться только в production build: например, пропадут стили, не зарегистрируется polyfill или не выполнится
initialization logic.

Риск особенно неприятен для UI libraries: компонент может собраться без ошибок, но визуально сломаться из-за удаленного
CSS import.





#### Вопрос: Какие файлы нельзя бездумно считать side-effect-free?

**Короткий ответ**

Осторожно с файлами, которые:

**Полный ответ**

Осторожно с файлами, которые:

- импортируют CSS;
- регистрируют polyfills;
- меняют `window`, `document`, `globalThis`;
- меняют prototypes;
- регистрируют custom elements;
- добавляют global event listeners;
- запускают top-level initialization;
- патчат поведение сторонних библиотек.

Пример:

```ts
import './polyfill';

interface Array<T> {
  first(): T | undefined;
}

Array.prototype.first = function <T>(this: T[]): T | undefined {
  return this[0];
};
```

Такой файл имеет side effects.





#### Вопрос: Что делать, если в пакете есть и pure modules, и файлы с side effects?

**Короткий ответ**

Можно указать не false, а массив файлов, которые имеют side effects.

**Полный ответ**

Можно указать не `false`, а массив файлов, которые имеют side effects.

Пример:

```json
{
  "name": "my-library",
  "sideEffects": ["./src/polyfills.ts", "./src/register-custom-elements.ts", "**/*.css"]
}
```

Так bundler сможет удалять pure modules, но сохранит файлы, которые важны из-за side effects.





#### Вопрос: Почему CSS imports часто указывают в sideEffects?

**Короткий ответ**

CSS import нужен не ради JavaScript export, а ради самого факта подключения стилей. Если bundler удалит такой import, UI
может сломаться.

**Полный ответ**

CSS import нужен не ради JavaScript export, а ради самого факта подключения стилей. Если bundler удалит такой import, UI
может сломаться.

Пример:

```json
{
  "sideEffects": ["**/*.css", "**/*.scss"]
}
```

Для design system это часто безопаснее, чем глобально ставить `"sideEffects": false` и надеяться, что все CSS останется
в bundle.





#### Вопрос: Как выглядит пример pure package?

**Короткий ответ**

Pure package экспортирует функции или значения и не выполняет важный код при импорте.

**Полный ответ**

Pure package экспортирует функции или значения и не выполняет важный код при импорте.

```ts filename="src/math.ts"
export function add(a: number, b: number): number {
  return a + b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}
```

```json
{
  "name": "date-utils",
  "type": "module",
  "sideEffects": false
}
```

Если приложение использует только `add`, bundler может удалить `multiply`.





#### Вопрос: Как выглядит package с CSS side effect?

**Короткий ответ**

Если поставить "sideEffects": false, bundler может удалить CSS import в некоторых сценариях.

**Полный ответ**

```ts filename="src/index.ts"
import './global-styles.css';

export {Button} from './button';
export {Input} from './input';
```

Если поставить `"sideEffects": false`, bundler может удалить CSS import в некоторых сценариях.

Безопаснее:

```json
{
  "name": "ui-kit",
  "sideEffects": ["**/*.css"]
}
```





#### Вопрос: Почему barrel file может неожиданно иметь side effect?

**Короткий ответ**

Barrel file выглядит как простой public API, но любой top-level import в нем выполняется при импорте entry point.

**Полный ответ**

Barrel file выглядит как простой public API, но любой top-level import в нем выполняется при импорте entry point.

```ts filename="src/index.ts"
import './init';

export * from './button';
export * from './input';
```

```ts filename="src/init.ts"
globalThis.__MY_LIBRARY_READY__ = true;
```

Такой `index.ts` уже не является полностью pure barrel, потому что импорт `./init` выполняет код на top-level. Лучше не
смешивать public exports и initialization logic.





#### Вопрос: Как sideEffects связан с Angular providers?

**Короткий ответ**

Фабрики providers обычно не являются side effects, если они просто экспортируются из файла. Side effect появляется, если
код выполняется сразу при импорте модуля, а не тогда, когда Angular реально использует provider.

**Полный ответ**

Фабрики providers обычно не являются side effects, если они просто экспортируются из файла. Side effect появляется, если
код выполняется сразу при импорте модуля, а не тогда, когда Angular реально использует provider.

Пример без top-level side effect:

```ts
export function provideFeature(options: FeatureOptions): Provider[] {
  return [
    {
      provide: FEATURE_OPTIONS,
      useValue: options,
    },
    FeatureService,
  ];
}
```





#### Вопрос: Почему важно не выполнять тяжелую логику на top-level в Angular library?

**Короткий ответ**

Top-level код выполняется сразу при импорте модуля. Это может мешать tree shaking, SSR и тестам. Для библиотек лучше
экспортировать функции, providers, классы и components, а выполнение логики оставлять приложению.

**Полный ответ**

Top-level код выполняется сразу при импорте модуля. Это может мешать tree shaking, SSR и тестам. Для библиотек лучше
экспортировать функции, providers, классы и components, а выполнение логики оставлять приложению.

Плохо:

```ts
startAnalytics();

export {AnalyticsService};
```

Лучше:

```ts
export function provideAnalytics(config: AnalyticsConfig): Provider[] {
  return [
    {
      provide: ANALYTICS_CONFIG,
      useValue: config,
    },
    AnalyticsService,
  ];
}
```





#### Вопрос: Почему пакет может попадать в bundle, хотя его компонент напрямую не используется?

**Короткий ответ**

Возможные причины:

**Полный ответ**

Возможные причины:

- пакет импортируется через barrel file;
- есть top-level side effects;
- bundler не уверен, что import можно удалить;
- `package.json` не содержит `sideEffects`;
- используется CommonJS;
- приложение импортирует слишком широкий entry point;
- dependency попала через другой используемый export.

Проверять нужно dependency graph и реальные imports consumer-приложения, а не только исходный код компонента.





#### Вопрос: Как проверить, что "sideEffects": false реально уменьшает bundle?

**Короткий ответ**

Нужно собрать production build и сравнить bundle stats до и после изменения.

**Полный ответ**

Нужно собрать production build и сравнить bundle stats до и после изменения.

Можно использовать:

- Angular build stats;
- source-map-explorer;
- webpack-bundle-analyzer;
- esbuild metafile;
- rollup visualizer.

Важно проверять не только размер bundle, но и работоспособность приложения: стили, SSR, lazy loading и initialization
logic.





#### Вопрос: Как проектировать библиотеку, чтобы она хорошо tree-shaking-илась?

**Короткий ответ**

"sideEffects": false помогает, но не исправляет архитектуру пакета, если public API тянет лишние imports.

**Полный ответ**

- использовать ES modules;
- избегать top-level side effects;
- не смешивать initialization logic и public exports;
- делать secondary entry points;
- не экспортировать все через один тяжелый entry point;
- правильно настроить `exports`;
- правильно указать `sideEffects`;
- проверять production bundle в consumer-приложении.

`"sideEffects": false` помогает, но не исправляет архитектуру пакета, если public API тянет лишние imports.





#### Вопрос: Как secondary entry points помогают bundle size?

**Короткий ответ**

Secondary entry points позволяют импортировать отдельные части библиотеки:

**Полный ответ**

Secondary entry points позволяют импортировать отдельные части библиотеки:

```ts
import {Button} from 'ui-kit/button';
import {Input} from 'ui-kit/input';
```

Это может быть лучше, чем один большой entry point, который тянет много лишнего кода.

Secondary entry points полезны, когда части пакета независимы: например, `button`, `input`, `date-utils` или
`analytics`.





#### Вопрос: Как безопасно добавить "sideEffects": false в библиотеку?

**Короткий ответ**

Главная идея: сначала доказать, какие файлы действительно pure, и только потом менять package.json.

**Полный ответ**

- Проверить, что модули не выполняют важный код на top-level.
- Найти CSS, polyfill и registration файлы.
- Если side effects есть, указать их массивом.
- Собрать production build consumer-приложения.
- Сравнить bundle stats до и после.
- Проверить SSR, если библиотека используется в SSR.
- Проверить, что стили и initialization logic не пропали.
- Добавить regression test или demo scenario, если есть риск.

Главная идея: сначала доказать, какие файлы действительно pure, и только потом менять `package.json`.





#### Вопрос: Что спросить на code review, если в PR добавляют "sideEffects": false?

**Короткий ответ**

Стоит проверить не только уменьшение bundle size, но и безопасность изменения:

**Полный ответ**

Стоит проверить не только уменьшение bundle size, но и безопасность изменения:

- есть ли в пакете top-level side effects;
- есть ли CSS или polyfill imports;
- есть ли регистрация custom elements;
- есть ли global listeners;
- есть ли изменения prototypes или global objects;
- проверяли ли production build consumer-приложения;
- сравнили ли bundle stats до и после;
- не сломается ли SSR;
- нужно ли указать массив side-effect files вместо `false`.

На review важно просить evidence: stats, production build и короткий список файлов, которые считаются side-effectful.





#### Вопрос: Какой короткий вывод по sideEffects и tree shaking?

**Короткий ответ**

sideEffects — это contract между package author и bundler. Он может заметно уменьшить bundle size, но неправильная
настройка ломает production build. Для библиотек безопасная стратегия такая: ESM, маленькие entry points, минимум
top-level логики, явный список side-effect files и проверка результата в consumer-приложении.

**Полный ответ**

`sideEffects` — это contract между package author и bundler. Он может заметно уменьшить bundle size, но неправильная
настройка ломает production build. Для библиотек безопасная стратегия такая: ESM, маленькие entry points, минимум
top-level логики, явный список side-effect files и проверка результата в consumer-приложении.





#### Вопрос: Зачем Angular library нужны migrations и schematics?

**Короткий ответ**

Schematics автоматизируют изменения workspace и consumer code. Migration нужна, когда новая версия меняет API,
selectors, imports или конфигурацию.

**Полный ответ**

Schematics автоматизируют изменения workspace и consumer code. Migration нужна, когда новая версия меняет API,
selectors, imports или конфигурацию.

Хорошая migration:

- идемпотентна;
- сохраняет форматирование и комментарии;
- имеет fixtures/snapshot tests;
- сообщает о случаях, которые нельзя исправить автоматически;
- не меняет несвязанный код.





#### Вопрос: Как документировать и тестировать component library?

**Короткий ответ**

Для каждого public component нужны:

**Полный ответ**

Для каждого public component нужны:

- назначение и ограничения;
- imports/providers;
- inputs, outputs и examples;
- accessibility и keyboard behavior;
- theming contract;
- migration/deprecation notes.

Тестируют behavior, harness API, forms integration, overlays, SSR и visual states. Demo/documentation app одновременно
служит integration consumer, но не заменяет automated tests.





#### Вопрос: Почему "sideEffects": false не заменяет хорошую архитектуру пакета?

**Короткий ответ**

Этот флаг только дает bundler подсказку. Если пакет устроен как один большой entry point с тяжелыми imports,
неаккуратными barrels и top-level initialization, tree shaking все равно может быть хуже. Хорошая библиотека должна быть
спроектирована для статического анализа.

**Полный ответ**

Этот флаг только дает bundler подсказку. Если пакет устроен как один большой entry point с тяжелыми imports,
неаккуратными barrels и top-level initialization, tree shaking все равно может быть хуже. Хорошая библиотека должна быть
спроектирована для статического анализа.

Практичный ориентир: consumer должен иметь возможность импортировать маленькую часть API без загрузки всего `ui-kit`.



### Micro Frontends

Практический пример: [`examples/angular/mfe`](/examples/angular/mfe/movie-ticket/index.html).

В этом демо можно увидеть:

- host/shell приложение [`movie-ticket`](/examples/angular/mfe/movie-ticket/index.html);
- remote widgets [`movies`](/examples/angular/mfe/movies/index.html) и
  [`ticket-availability`](/examples/angular/mfe/ticket-availability/index.html);
- federation manifest и `remoteEntry.json`;
- runtime loading и host orchestration через Angular inputs/outputs;
- независимые loading/error states и fallback UI;
- SSR-safe browser-only mounting через `afterNextRender()`.

Инструкции по запуску находятся в [`examples/angular/mfe/README.md`](../../../apps/angular/mfe/README.md).

### Базовые понятия



#### Вопрос: Что такое микрофронтенды и какую проблему они решают?

**Короткий ответ**

Микрофронтенды разделяют frontend на автономные части, за которые могут отвечать разные команды. Они помогают независимо
разрабатывать и выпускать крупные продуктовые области, но добавляют распределенные контракты, инфраструктуру и риски
времени выполнения.

**Полный ответ**

Микрофронтенды разделяют frontend на автономные части, за которые могут отвечать разные команды. Они помогают независимо
разрабатывать и выпускать крупные продуктовые области, но добавляют распределенные контракты, инфраструктуру и риски
времени выполнения.





#### Вопрос: Что такое shell/host application?

**Короткий ответ**

Host — приложение-контейнер. Оно задает общий layout, навигацию, интеграционные контракты и загружает remote-модули или
виджеты, а также обрабатывает их loading и error states.

**Полный ответ**

Host — приложение-контейнер. Оно задает общий layout, навигацию, интеграционные контракты и загружает remote-модули или
виджеты, а также обрабатывает их loading и error states.





#### Вопрос: Что такое remote application?

**Короткий ответ**

Remote — отдельно собираемое приложение, которое публикует доступные host части через federation metadata. Оно должно
иметь явный публичный контракт и по возможности не зависеть от внутренних деталей host.

**Полный ответ**

Remote — отдельно собираемое приложение, которое публикует доступные host части через federation metadata. Оно должно
иметь явный публичный контракт и по возможности не зависеть от внутренних деталей host.





#### Вопрос: Что такое independent deployment?

**Короткий ответ**

Это возможность выпустить remote без обязательной пересборки и публикации host или других remote. Для этого нужны
совместимые контракты, отдельные pipelines, контролируемые URL и стратегия rollback.

**Полный ответ**

Это возможность выпустить remote без обязательной пересборки и публикации host или других remote. Для этого нужны
совместимые контракты, отдельные pipelines, контролируемые URL и стратегия rollback.





#### Вопрос: Чем микрофронтенд отличается от обычного lazy-loaded Angular route?

**Короткий ответ**

Lazy route остается частью одной сборки и одного release-процесса. Микрофронтенд может собираться, размещаться и
загружаться отдельно, поэтому его версия и доступность не обязательно совпадают с host.

**Полный ответ**

Lazy route остается частью одной сборки и одного release-процесса. Микрофронтенд может собираться, размещаться и
загружаться отдельно, поэтому его версия и доступность не обязательно совпадают с host.





#### Вопрос: Какие границы микрофронтендов бывают: route-level, widget-level, domain-level?

**Короткий ответ**

Route-level делит приложение по страницам, widget-level встраивает независимые блоки в одну страницу, domain-level
следует бизнес-областям. Domain boundary описывает ответственность, а route и widget — способ композиции UI.

**Полный ответ**

Route-level делит приложение по страницам, widget-level встраивает независимые блоки в одну страницу, domain-level
следует бизнес-областям. Domain boundary описывает ответственность, а route и widget — способ композиции UI.





#### Вопрос: Чем route-level federation отличается от widget-level federation?

**Короткий ответ**

Route-level загружает крупный экран при навигации и обычно проще изолирует команды. Widget-level компонует несколько
remote на одной странице, поэтому требует более точной оркестрации, layout-контрактов и независимых состояний ошибки.

**Полный ответ**

Route-level загружает крупный экран при навигации и обычно проще изолирует команды. Widget-level компонует несколько
remote на одной странице, поэтому требует более точной оркестрации, layout-контрактов и независимых состояний ошибки.





#### Вопрос: Когда микрофронтенды оправданы, а когда это лишнее усложнение?

**Короткий ответ**

Они оправданы при нескольких автономных командах, независимых release cycles и устойчивых domain boundaries. Для
небольшой команды, единого продукта и общего деплоя modular monolith обычно дешевле и надежнее.

**Полный ответ**

Они оправданы при нескольких автономных командах, независимых release cycles и устойчивых domain boundaries. Для
небольшой команды, единого продукта и общего деплоя modular monolith обычно дешевле и надежнее.





#### Вопрос: Почему микрофронтенды часто сложнее монолита?

**Короткий ответ**

В монолите компилятор и единая сборка проверяют большую часть связей заранее. В микрофронтендах часть ошибок проявляется
только при интеграции конкретных независимо развернутых версий через сеть.

**Полный ответ**

В монолите компилятор и единая сборка проверяют большую часть связей заранее. В микрофронтендах часть ошибок проявляется
только при интеграции конкретных независимо развернутых версий через сеть.





#### Вопрос: Какие минусы есть у микрофронтенд-архитектуры?

**Короткий ответ**

Основные минусы: сложнее локальная разработка, тестирование, наблюдаемость, versioning, shared state, согласование UX,
SSR и rollback. Также возможны дубли dependencies и дополнительная задержка runtime-загрузки.

**Полный ответ**

Основные минусы: сложнее локальная разработка, тестирование, наблюдаемость, versioning, shared state, согласование UX,
SSR и rollback. Также возможны дубли dependencies и дополнительная задержка runtime-загрузки.



### Native Federation и runtime loading



#### Вопрос: Что такое Native Federation?

**Короткий ответ**

Native Federation — подход к runtime-композиции приложений на основе стандартных ES modules и import maps. Инструменты
генерируют metadata и согласуют shared dependencies, а браузер загружает модули без webpack runtime.

**Полный ответ**

Native Federation — подход к runtime-композиции приложений на основе стандартных ES modules и import maps. Инструменты
генерируют metadata и согласуют shared dependencies, а браузер загружает модули без webpack runtime.





#### Вопрос: Что такое remoteEntry.json?

**Короткий ответ**

Это сгенерированный entry-файл remote с описанием exposed modules, shared packages и связанных chunks. Host читает его,
чтобы понять, откуда загрузить запрошенный export.

**Полный ответ**

Это сгенерированный entry-файл remote с описанием exposed modules, shared packages и связанных chunks. Host читает его,
чтобы понять, откуда загрузить запрошенный export.





#### Вопрос: Что такое federation manifest?

**Короткий ответ**

Manifest — карта логических имен remote на URL их remoteEntry.json. Она отделяет код host от адресов окружения и
позволяет менять расположение remote без пересборки host, если manifest поставляется отдельно.

**Полный ответ**

Manifest — карта логических имен remote на URL их `remoteEntry.json`. Она отделяет код host от адресов окружения и
позволяет менять расположение remote без пересборки host, если manifest поставляется отдельно.





#### Вопрос: Зачем host-приложению нужен manifest remote-приложений?

**Короткий ответ**

Host использует manifest для разрешения имени remote в конкретный URL. Один и тот же build host может получать разные
адреса для local, stage, production или canary окружений.

**Полный ответ**

Host использует manifest для разрешения имени remote в конкретный URL. Один и тот же build host может получать разные
адреса для local, stage, production или canary окружений.





#### Вопрос: Что делает initFederation()?

**Короткий ответ**

initFederation() загружает federation metadata, подготавливает shared dependencies и import maps до bootstrap
приложения. После инициализации host может обращаться к remote по логическому имени.

**Полный ответ**

`initFederation()` загружает federation metadata, подготавливает shared dependencies и import maps до bootstrap
приложения. После инициализации host может обращаться к remote по логическому имени.





#### Вопрос: Что делает loadRemoteModule()?

**Короткий ответ**

loadRemoteModule() находит remote через ранее загруженную конфигурацию, загружает его entry и exposed module, затем
возвращает namespace ES module. Наличие ожидаемого export приложение проверяет отдельно.

**Полный ответ**

`loadRemoteModule()` находит remote через ранее загруженную конфигурацию, загружает его entry и exposed module, затем
возвращает namespace ES module. Наличие ожидаемого export приложение проверяет отдельно.





#### Вопрос: Чем runtime-загрузка remote отличается от обычного static import?

**Короткий ответ**

Static import известен во время сборки и попадает в dependency graph общего bundle. Runtime-загрузка разрешает модуль
после запуска приложения, поэтому требует сетевой обработки ошибок и runtime-проверки контракта.

**Полный ответ**

Static import известен во время сборки и попадает в dependency graph общего bundle. Runtime-загрузка разрешает модуль
после запуска приложения, поэтому требует сетевой обработки ошибок и runtime-проверки контракта.





#### Вопрос: Что такое shared dependencies?

**Короткий ответ**

Это packages, которые host и remotes договариваются использовать совместно вместо загрузки отдельных копий. Sharing
уменьшает bundle, но требует совместимых версий и корректной настройки singleton-пакетов.

**Полный ответ**

Это packages, которые host и remotes договариваются использовать совместно вместо загрузки отдельных копий. Sharing
уменьшает bundle, но требует совместимых версий и корректной настройки singleton-пакетов.





#### Вопрос: Зачем нужны singleton, strictVersion и requiredVersion?

**Короткий ответ**

singleton требует один runtime instance package, requiredVersion задает допустимую версию, а strictVersion запрещает
несовместимый fallback. Вместе они делают конфликт версий явной ошибкой вместо скрытого повреждения runtime.

**Полный ответ**

`singleton` требует один runtime instance package, `requiredVersion` задает допустимую версию, а `strictVersion`
запрещает несовместимый fallback. Вместе они делают конфликт версий явной ошибкой вместо скрытого повреждения runtime.





#### Вопрос: Почему Angular и RxJS обычно шарят как singleton?

**Короткий ответ**

Angular ожидает согласованный framework runtime и injector graph, а разделяемые RxJS-контракты проще поддерживать с
одной совместимой копией. Несколько версий увеличивают bundle и риск несовместимости типов и поведения.

**Полный ответ**

Angular ожидает согласованный framework runtime и injector graph, а разделяемые RxJS-контракты проще поддерживать с
одной совместимой копией. Несколько версий увеличивают bundle и риск несовместимости типов и поведения.





#### Вопрос: Что может пойти не так, если host и remote используют разные версии Angular?

**Короткий ответ**

Возможны несовместимые runtime contracts, несколько Angular instances, ошибки DI, rendering и signals. Допустимость
версий должна проверяться federation-конфигурацией, CI и integration tests.

**Полный ответ**

Возможны несовместимые runtime contracts, несколько Angular instances, ошибки DI, rendering и signals. Допустимость
версий должна проверяться federation-конфигурацией, CI и integration tests.





#### Вопрос: Что такое import map?

**Короткий ответ**

Import map сопоставляет bare module specifiers с URL ES modules в браузере. Native Federation может формировать такую
карту для shared packages и remote-зависимостей.

**Полный ответ**

Import map сопоставляет bare module specifiers с URL ES modules в браузере. Native Federation может формировать такую
карту для shared packages и remote-зависимостей.





#### Вопрос: Почему браузер может не зарезолвить bare specifier вроде @softarc/native-federation-orchestrator?

**Короткий ответ**

Браузер не знает npm resolution. Для bare specifier должен существовать import map или bundler-преобразование; иначе
возникает ошибка разрешения модуля. Также import map должна быть загружена до первого import.

**Полный ответ**

Браузер не знает npm resolution. Для bare specifier должен существовать import map или bundler-преобразование; иначе
возникает ошибка разрешения модуля. Также import map должна быть загружена до первого import.





#### Вопрос: Почему deprecated API не всегда означает, что код немедленно сломан?

**Короткий ответ**

Deprecated API пока может оставаться совместимым, но больше не рекомендуется и может быть удален позже. Нужно проверить
версию, migration path и фактическое поведение, а не заменять API вслепую.

**Полный ответ**

Deprecated API пока может оставаться совместимым, но больше не рекомендуется и может быть удален позже. Нужно проверить
версию, migration path и фактическое поведение, а не заменять API вслепую.



### Dynamic components



#### Вопрос: Что такое ComponentRef?

**Короткий ответ**

ComponentRef — ссылка на созданный экземпляр компонента и его host view. Через нее доступны instance, setInput(),
changeDetectorRef, lifecycle callback onDestroy() и метод destroy().

**Полный ответ**

`ComponentRef` — ссылка на созданный экземпляр компонента и его host view. Через нее доступны `instance`, `setInput()`,
`changeDetectorRef`, lifecycle callback `onDestroy()` и метод `destroy()`.





#### Вопрос: Как динамически создать Angular-компонент через ViewContainerRef.createComponent()?

**Короткий ответ**

Нужно получить ViewContainerRef, загрузить Type компонента и вызвать container.createComponent(componentType). Метод
вставит host view в контейнер и вернет ComponentRef для дальнейшей настройки.

**Полный ответ**

Нужно получить `ViewContainerRef`, загрузить `Type<T>` компонента и вызвать `container.createComponent(componentType)`.
Метод вставит host view в контейнер и вернет `ComponentRef<T>` для дальнейшей настройки.





#### Вопрос: Как передать input в динамически созданный компонент?

**Короткий ответ**

После создания вызывают componentRef.setInput('inputName', value). Имя должно совпадать с публичным input или его alias,
а передаваемое значение — с интеграционным контрактом remote.

**Полный ответ**

После создания вызывают `componentRef.setInput('inputName', value)`. Имя должно совпадать с публичным input или его
alias, а передаваемое значение — с интеграционным контрактом remote.





#### Вопрос: Почему ComponentRef.setInput() лучше прямого присваивания свойства?

**Короткий ответ**

setInput() проходит через Angular input pipeline, корректно обновляет signal inputs, учитывает transforms и помечает
view для проверки. Прямое присваивание обходит этот контракт и может не запустить ожидаемое обновление.

**Полный ответ**

`setInput()` проходит через Angular input pipeline, корректно обновляет signal inputs, учитывает transforms и помечает
view для проверки. Прямое присваивание обходит этот контракт и может не запустить ожидаемое обновление.





#### Вопрос: Как подписаться на output динамически созданного компонента?

**Короткий ответ**

Нужно получить публичный output с componentRef.instance и вызвать subscribe(). Подписку следует связать с lifecycle
компонента или host, например отписаться в callback componentRef.onDestroy().

**Полный ответ**

Нужно получить публичный output с `componentRef.instance` и вызвать `subscribe()`. Подписку следует связать с lifecycle
компонента или host, например отписаться в callback `componentRef.onDestroy()`.





#### Вопрос: Зачем хранить ComponentRef и вызывать destroy()?

**Короткий ответ**

Ссылка нужна для последующих inputs, подписки на outputs и явного lifecycle management. Без уничтожения могут остаться
view, subscriptions и ссылки на данные, что приводит к утечкам и повторной обработке событий.

**Полный ответ**

Ссылка нужна для последующих inputs, подписки на outputs и явного lifecycle management. Без уничтожения могут остаться
view, subscriptions и ссылки на данные, что приводит к утечкам и повторной обработке событий.





#### Вопрос: Как правильно уничтожать динамически созданные компоненты?

**Короткий ответ**

Компонент уничтожают через ComponentRef.destroy() или очистку владеющего ViewContainerRef. Одновременно нужно освободить
внешние subscriptions, listeners и другие ресурсы, которые Angular не контролирует.

**Полный ответ**

Компонент уничтожают через `ComponentRef.destroy()` или очистку владеющего `ViewContainerRef`. Одновременно нужно
освободить внешние subscriptions, listeners и другие ресурсы, которые Angular не контролирует.





#### Вопрос: Почему viewChild.required() нельзя вызывать слишком рано?

**Короткий ответ**

Query signal получает значение только после создания соответствующего элемента view. Чтение до завершения render
приведет к ошибке required query, поэтому DOM-зависимую работу откладывают до подходящей render phase.

**Полный ответ**

Query signal получает значение только после создания соответствующего элемента view. Чтение до завершения render
приведет к ошибке required query, поэтому DOM-зависимую работу откладывают до подходящей render phase.





#### Вопрос: Зачем иногда передают getContainer: () => ViewContainerRef, а не сам ViewContainerRef?

**Короткий ответ**

Функция откладывает чтение query до момента фактического монтирования. Это полезно, когда loader настраивается раньше,
чем Angular создал template container.

**Полный ответ**

Функция откладывает чтение query до момента фактического монтирования. Это полезно, когда loader настраивается раньше,
чем Angular создал template container.



### Коммуникация между remote-приложениями



#### Вопрос: Как remote-приложения могут общаться между собой?

**Короткий ответ**

Через host orchestration, URL, backend, shared event bus или browser events. Выбор зависит от lifetime состояния,
необходимости deep link, надежности и допустимой связанности между командами.

**Полный ответ**

Через host orchestration, URL, backend, shared event bus или browser events. Выбор зависит от lifetime состояния,
необходимости deep link, надежности и допустимой связанности между командами.





#### Вопрос: Что такое host orchestration?

**Короткий ответ**

Host принимает события remote, применяет общую бизнес-навигацию и передает данные другим remote через их публичные
контракты. Remote при этом не импортируют и не ищут друг друга напрямую.

**Полный ответ**

Host принимает события remote, применяет общую бизнес-навигацию и передает данные другим remote через их публичные
контракты. Remote при этом не импортируют и не ищут друг друга напрямую.





#### Вопрос: Как host может связать output одного remote с input другого remote?

**Короткий ответ**

Host подписывается на output первого ComponentRef, а в обработчике вызывает setInput() второго. В демо movieSelected
передает выбранный фильм в input movie виджета доступности билетов.

**Полный ответ**

Host подписывается на output первого `ComponentRef`, а в обработчике вызывает `setInput()` второго. В демо
`movieSelected` передает выбранный фильм в input `movie` виджета доступности билетов.





#### Вопрос: Чем CustomEvent отличается от Angular output() / input() через host?

**Короткий ответ**

Angular inputs/outputs типизированы и привязаны к component lifecycle. CustomEvent распространяется через DOM или
window, доступен вне Angular, но использует строковые имена и требует ручного listener management.

**Полный ответ**

Angular inputs/outputs типизированы и привязаны к component lifecycle. `CustomEvent` распространяется через DOM или
`window`, доступен вне Angular, но использует строковые имена и требует ручного listener management.





#### Вопрос: Какие плюсы и минусы у коммуникации через window.dispatchEvent()?

**Короткий ответ**

Плюсы — слабая технологическая связанность и простой межфреймворковый transport. Минусы — глобальное пространство имен,
слабая типизация, неявный поток данных, ручная очистка listeners и отсутствие browser globals при SSR.

**Полный ответ**

Плюсы — слабая технологическая связанность и простой межфреймворковый transport. Минусы — глобальное пространство имен,
слабая типизация, неявный поток данных, ручная очистка listeners и отсутствие browser globals при SSR.





#### Вопрос: Почему window.addEventListener() может быть проблемой при SSR?

**Короткий ответ**

На сервере window отсутствует, поэтому регистрация listener во время server render завершится ошибкой. Ее выполняют
только в browser phase и обязательно снимают при уничтожении владельца.

**Полный ответ**

На сервере `window` отсутствует, поэтому регистрация listener во время server render завершится ошибкой. Ее выполняют
только в browser phase и обязательно снимают при уничтожении владельца.





#### Вопрос: Когда стоит использовать shared event bus?

**Короткий ответ**

Когда нескольким независимо загружаемым частям нужен ограниченный набор асинхронных domain events. Bus должен иметь
версионированные типы, владельца и правила lifecycle, иначе он быстро превращается в неявное глобальное состояние.

**Полный ответ**

Когда нескольким независимо загружаемым частям нужен ограниченный набор асинхронных domain events. Bus должен иметь
версионированные типы, владельца и правила lifecycle, иначе он быстро превращается в неявное глобальное состояние.





#### Вопрос: Когда лучше использовать URL/query params для состояния?

**Короткий ответ**

Для состояния навигации, фильтров и выбранных сущностей, которое должно поддерживать deep link, back/forward и
перезагрузку страницы. Секретные или большие данные в URL помещать не следует.

**Полный ответ**

Для состояния навигации, фильтров и выбранных сущностей, которое должно поддерживать deep link, back/forward и
перезагрузку страницы. Секретные или большие данные в URL помещать не следует.





#### Вопрос: Когда состояние лучше хранить на backend?

**Короткий ответ**

Когда оно должно переживать сессии, быть общим для устройств или пользователей, участвовать в транзакциях и иметь
серверную авторизацию. Frontend тогда хранит только идентификатор и локальное представление.

**Полный ответ**

Когда оно должно переживать сессии, быть общим для устройств или пользователей, участвовать в транзакциях и иметь
серверную авторизацию. Frontend тогда хранит только идентификатор и локальное представление.





#### Вопрос: Почему для микрофронтендов важны явные контракты?

**Короткий ответ**

Remote выпускаются независимо, поэтому inputs, outputs, exposed modules и payload schemas заменяют compile-time связь.
Явные контракты можно версионировать, тестировать и сохранять совместимыми.

**Полный ответ**

Remote выпускаются независимо, поэтому inputs, outputs, exposed modules и payload schemas заменяют compile-time связь.
Явные контракты можно версионировать, тестировать и сохранять совместимыми.





#### Вопрос: Почему прямое общение remote-to-remote может быть проблемой?

**Короткий ответ**

Один remote начинает знать API и lifecycle другого, из-за чего их нельзя независимо заменить или загрузить. Такая связь
также усложняет versioning, тестирование и обработку частичной недоступности.

**Полный ответ**

Один remote начинает знать API и lifecycle другого, из-за чего их нельзя независимо заменить или загрузить. Такая связь
также усложняет versioning, тестирование и обработку частичной недоступности.
