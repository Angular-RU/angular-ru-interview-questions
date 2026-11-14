# Angular — вопросы и ответы, часть 6

> Автоматически сгенерировано из src/pages/angular/index.md. Не редактируйте вручную.

### Testing



#### Вопрос: Какие плюсы у тестирования frontend-кода?

**Короткий ответ**

Тесты быстро ловят regressions, фиксируют ожидания компонента или сервиса и помогают безопасно менять код. В Angular они
особенно полезны для forms, routing, DI, HTTP mapping, guards, pipes и сложных states. Хорошие тесты уменьшают страх
перед refactoring, но не заменяют ручную проверку UX и accessibility.

**Полный ответ**

Тесты быстро ловят regressions, фиксируют ожидания компонента или сервиса и помогают безопасно менять код. В Angular они
особенно полезны для forms, routing, DI, HTTP mapping, guards, pipes и сложных states. Хорошие тесты уменьшают страх
перед refactoring, но не заменяют ручную проверку UX и accessibility.





#### Вопрос: Какие минусы и trade-offs у тестов?

**Короткий ответ**

Тесты требуют времени на написание и поддержку, могут быть хрупкими и иногда закрепляют плохую архитектуру. Избыточные
mocks проверяют реализацию вместо поведения, а слишком много E2E замедляет feedback. Зрелый подход выбирает уровень
теста по риску: чистую функцию проверять unit-тестом, пользовательский сценарий — integration или E2E.

**Полный ответ**

Тесты требуют времени на написание и поддержку, могут быть хрупкими и иногда закрепляют плохую архитектуру. Избыточные
mocks проверяют реализацию вместо поведения, а слишком много E2E замедляет feedback. Зрелый подход выбирает уровень
теста по риску: чистую функцию проверять unit-тестом, пользовательский сценарий — integration или E2E.





#### Вопрос: Какие виды тестирования используют в Angular?

**Короткий ответ**

В Angular unit/integration-тесты обычно используют TestBed, spies/fakes, HTTP testing utilities и Router testing
harness. E2E выполняют Playwright или Cypress.

**Полный ответ**

- **Unit-тест** проверяет небольшую единицу: функцию, pipe, service или компонент с изолированными зависимостями. Он
  быстрый и точно локализует ошибку.
- **Интеграционный тест** проверяет совместную работу нескольких частей: компонент с шаблоном, DI, Router или
  HTTP-слоем.
- **E2E-тест** запускает приложение в браузере и проверяет пользовательский сценарий через UI, часто вместе с реальным
  или тестовым backend.

В Angular unit/integration-тесты обычно используют TestBed, spies/fakes, HTTP testing utilities и Router testing
harness. E2E выполняют Playwright или Cypress.

Основу набора составляют быстрые unit и integration-тесты. E2E оставляют для критических сквозных сценариев: вход,
checkout, создание сущности. Тестируют наблюдаемое поведение, а не приватные методы и внутреннюю структуру компонента.





#### Вопрос: Чем unit test отличается от integration test?

**Короткий ответ**

Unit test проверяет небольшую единицу с изолированными зависимостями: функцию, pipe, mapping или сервис. Integration
test проверяет совместную работу нескольких частей: компонент с template, DI, Router, forms или HTTP testing layer. В
Angular многие полезные component tests фактически являются integration tests, и это нормально.

**Полный ответ**

Unit test проверяет небольшую единицу с изолированными зависимостями: функцию, pipe, mapping или сервис. Integration
test проверяет совместную работу нескольких частей: компонент с template, DI, Router, forms или HTTP testing layer. В
Angular многие полезные component tests фактически являются integration tests, и это нормально.





#### Вопрос: Чем integration test отличается от e2e test?

**Короткий ответ**

Integration test запускает часть приложения в тестовой среде и контролирует зависимости. E2E test открывает приложение в
реальном браузере и проверяет пользовательский путь через UI, часто с network layer, auth и routing. E2E дает больше
уверенности в сценарии, но медленнее и дороже в поддержке.

**Полный ответ**

Integration test запускает часть приложения в тестовой среде и контролирует зависимости. E2E test открывает приложение в
реальном браузере и проверяет пользовательский путь через UI, часто с network layer, auth и routing. E2E дает больше
уверенности в сценарии, но медленнее и дороже в поддержке.





#### Вопрос: Какие testing best practices важны во frontend?

**Короткий ответ**

Проверять observable behavior, использовать role/label/test id selectors, избегать sleeps, стабилизировать данные и
тестировать loading/error/empty states. Не стоит проверять private methods, случайные CSS classes и внутреннее число
signals. Тест должен падать по понятной причине и помогать найти regression.

**Полный ответ**

Проверять observable behavior, использовать role/label/test id selectors, избегать sleeps, стабилизировать данные и
тестировать loading/error/empty states. Не стоит проверять private methods, случайные CSS classes и внутреннее число
signals. Тест должен падать по понятной причине и помогать найти regression.





#### Вопрос: Что тестировать в Angular-компоненте, а что не нужно?

**Короткий ответ**

Тестируют публичное поведение:

**Полный ответ**

Тестируют публичное поведение:

- rendered content и accessibility;
- реакцию на user events;
- inputs/outputs;
- loading/error/empty states;
- интеграцию с forms, Router и services.

Не тестируют Angular framework, private methods, внутреннее количество signals или точную структуру реализации без
контрактной причины.





#### Вопрос: Когда тестировать компонент через DOM, а когда тестировать чистую функцию?

**Короткий ответ**

Если контракт виден пользователю или другому компоненту через template, events, forms или accessibility, лучше проверять
через DOM. Если логика является чистым преобразованием данных, ее проще и быстрее тестировать как функцию. Хороший
дизайн часто выносит сложные вычисления из компонента, оставляя DOM-тесту только интеграцию.

**Полный ответ**

Если контракт виден пользователю или другому компоненту через template, events, forms или accessibility, лучше проверять
через DOM. Если логика является чистым преобразованием данных, ее проще и быстрее тестировать как функцию. Хороший
дизайн часто выносит сложные вычисления из компонента, оставляя DOM-тесту только интеграцию.





#### Вопрос: Что лучше тестировать в Angular service?

**Короткий ответ**

В service тестируют mapping DTO в domain model, обработку ошибок, cache/invalidation, retries, guards against invalid
input и взаимодействие с HTTP или storage через контролируемые fakes. Не нужно тестировать сам HttpClient; достаточно
проверить URL, method, body, headers и реакцию на response.

**Полный ответ**

В service тестируют mapping DTO в domain model, обработку ошибок, cache/invalidation, retries, guards against invalid
input и взаимодействие с HTTP или storage через контролируемые fakes. Не нужно тестировать сам `HttpClient`; достаточно
проверить URL, method, body, headers и реакцию на response.





#### Вопрос: Какие инструменты использовать для тестирования Angular-кода?

**Короткий ответ**

Для Angular обычно используют TestBed, Angular testing utilities, provideHttpClientTesting(), HttpTestingController,
Router testing harness, Component Harnesses и spies/fakes тестового раннера. Для пользовательских сценариев подходят
Playwright или Cypress, а Angular Testing Library удобна, когда команда предпочитает DOM-first проверки. Инструмент
выбирают по контракту, который нужно проверить.

**Полный ответ**

Для Angular обычно используют TestBed, Angular testing utilities, `provideHttpClientTesting()`, `HttpTestingController`,
Router testing harness, Component Harnesses и spies/fakes тестового раннера. Для пользовательских сценариев подходят
Playwright или Cypress, а Angular Testing Library удобна, когда команда предпочитает DOM-first проверки. Инструмент
выбирают по контракту, который нужно проверить.





#### Вопрос: Когда использовать Angular Testing Library, TestBed, Component Harness, Cypress или Playwright?

**Короткий ответ**

TestBed — базовый инструмент Angular для DI, components и services. Angular Testing Library удобна для behavior-first
component tests через DOM queries. Component Harness нужен для стабильного тестового API reusable UI components. Cypress
и Playwright используют для browser-level сценариев; Playwright особенно силен в multi-browser, tracing и parallel
execution.

**Полный ответ**

TestBed — базовый инструмент Angular для DI, components и services. Angular Testing Library удобна для behavior-first
component tests через DOM queries. Component Harness нужен для стабильного тестового API reusable UI components. Cypress
и Playwright используют для browser-level сценариев; Playwright особенно силен в multi-browser, tracing и parallel
execution.





#### Вопрос: Чем spy, fake, stub и mock отличаются?

**Короткий ответ**

Spy записывает вызовы и может подменять реализацию. Stub возвращает заранее заданные значения. Fake имеет упрощенную
рабочую реализацию. Mock обычно содержит ожидания по взаимодействию.

**Полный ответ**

`Spy` записывает вызовы и может подменять реализацию. `Stub` возвращает заранее заданные значения. `Fake` имеет
упрощенную рабочую реализацию. `Mock` обычно содержит ожидания по взаимодействию.

В Angular-тестах чаще достаточно stub/fake service и проверки observable behavior через DOM или публичный API.





#### Вопрос: Как тестировать standalone component и мокать service?

**Короткий ответ**

Standalone component добавляют в imports. При необходимости dependency собственного import компонента заменяют через
TestBed.overrideComponent().

**Полный ответ**

```ts
TestBed.configureTestingModule({
  imports: [UserCardComponent],
  providers: [{provide: UserApi, useValue: userApiStub}],
});
```

Standalone component добавляют в `imports`. При необходимости dependency собственного import компонента заменяют через
`TestBed.overrideComponent()`.





#### Вопрос: Как протестировать входные параметры и всплывающие события компонентов?

**Короткий ответ**

Лучше тестировать компонент через его публичный API и DOM.

**Полный ответ**

Лучше тестировать компонент через его публичный API и DOM.

```ts
it('renders the input and emits selection', () => {
  const fixture = TestBed.createComponent(UserCardComponent);
  const selected: string[] = [];

  fixture.componentRef.setInput('name', 'Alex');
  fixture.componentInstance.selected.subscribe((id) => selected.push(id));
  fixture.detectChanges();

  expect(fixture.nativeElement.textContent).toContain('Alex');

  fixture.nativeElement.querySelector('button').click();

  expect(selected).toEqual(['user-1']);
});
```

Для signal input используется тот же `componentRef.setInput()`. Output можно проверить подпиской на публичный output или
через host-компонент, если важен реальный template binding.

После изменения input нужно запустить change detection. Не следует напрямую вызывать приватные методы: клик по доступной
кнопке лучше отражает контракт компонента.





#### Вопрос: Как тестировать content projection?

**Короткий ответ**

Создайте host test component, который использует тестируемый компонент как реальный потребитель и передает projected
content между tags.

**Полный ответ**

Создайте host test component, который использует тестируемый компонент как реальный потребитель и передает projected
content между tags.

Так проверяются slots, selectors, content queries и пользовательский результат, а не внутренние детали реализации
компонента.





#### Вопрос: Как тестировать CVA и формы?

**Короткий ответ**

CVA лучше тестировать через host form:

**Полный ответ**

CVA лучше тестировать через host form:

- model value попадает в control;
- пользовательское действие вызывает value update;
- blur передает touched;
- disabled state блокирует interaction;
- validation и keyboard behavior работают.

Отдельный вызов методов CVA не заменяет integration-тест с `FormControl`.





#### Вопрос: Как тестировать сервис с async dependency?

**Короткий ответ**

Async dependency заменяют stub/fake, который возвращает контролируемый Promise или Observable. Тест должен явно
дождаться результата через await, firstValueFrom, fakeAsync/tick или testing utilities.

**Полный ответ**

Async dependency заменяют stub/fake, который возвращает контролируемый Promise или Observable. Тест должен явно
дождаться результата через `await`, `firstValueFrom`, `fakeAsync/tick` или testing utilities.

Для HTTP-зависимостей используйте `provideHttpClientTesting()` и `HttpTestingController`, чтобы проверить request и
вернуть ответ через `flush()`.





#### Вопрос: Чем fakeAsync/tick отличается от waitForAsync?

**Короткий ответ**

fakeAsync() виртуализирует timers и microtasks; tick() продвигает время, flush() очищает очередь.

**Полный ответ**

`fakeAsync()` виртуализирует timers и microtasks; `tick()` продвигает время, `flush()` очищает очередь.

`waitForAsync()` использует реальную async completion и `fixture.whenStable()`.

`fakeAsync` удобен для debounce/timers, но не поддерживает все browser APIs. В zoneless и signal-based тестах часто
достаточно `await fixture.whenStable()`.





#### Вопрос: Как мокать Angular module в тесте?

**Короткий ответ**

Если тестируемый компонент зависит от NgModule-based library, можно импортировать настоящий testing module или заменить
тяжелую зависимость lightweight stub component/directive/pipe.

**Полный ответ**

Если тестируемый компонент зависит от NgModule-based library, можно импортировать настоящий testing module или заменить
тяжелую зависимость lightweight stub component/directive/pipe.

Для standalone components часто проще использовать `TestBed.overrideComponent()` и заменить конкретный import. Не
мокайте весь модуль, если достаточно замокать сервис или один UI-компонент.





#### Вопрос: Какие тесты чаще всего получаются хрупкими?

**Короткий ответ**

Хрупкими становятся тесты на CSS classes, внутреннюю структуру DOM, private methods, точные timers, реальные внешние
API, порядок независимых async events и snapshots больших компонентов. Их чинят через стабильные locators, ожидание
видимого состояния, deterministic data, fakes и перенос логики в тестируемые чистые функции.

**Полный ответ**

Хрупкими становятся тесты на CSS classes, внутреннюю структуру DOM, private methods, точные timers, реальные внешние
API, порядок независимых async events и snapshots больших компонентов. Их чинят через стабильные locators, ожидание
видимого состояния, deterministic data, fakes и перенос логики в тестируемые чистые функции.





#### Вопрос: Почему E2E-тесты флакают и как уменьшить flaky tests?

**Короткий ответ**

Причины: sleeps, нестабильные данные, race conditions, animation, зависимость от порядка, слабые selectors.

**Полный ответ**

Причины: sleeps, нестабильные данные, race conditions, animation, зависимость от порядка, слабые selectors.

Решения:

- locators по role/label/test id вместо CSS-классов;
- ожидание observable UI state, а не timeout;
- изолированные test data;
- deterministic network mocks;
- trace/screenshot/video при retry;
- исправление причины, а не увеличение retries.

Behavioral assertions важнее screenshot tests; screenshots полезны для ограниченного visual regression.





#### Вопрос: Как организовать frontend tests в CI?

**Короткий ответ**

Обычно:

**Полный ответ**

Обычно:

1. Type check, lint и unit tests.
2. Build production.
3. Component/integration tests.
4. E2E по критическим flows в нескольких browsers.
5. Coverage и artifacts без превращения процента в самоцель.

Тесты параллелят, кешируют dependencies/build, сохраняют trace и разделяют быстрый PR pipeline с более широким nightly
suite.





#### Вопрос: Какие вопросы задать про тестирование Angular-кода в команде?

**Короткий ответ**

Нужно понять, какие уровни тестов используются: unit, integration, component, e2e и visual regression. Также важно
выяснить, какие инструменты приняты: TestBed, Angular Testing Library, Component Harness, Cypress, Playwright, Jest,
Vitest или Karma. Хороший ответ объясняет не только инструменты, но и что именно ими проверяют и где проходит граница
между тестом, lint и ручной проверкой.

**Полный ответ**

Нужно понять, какие уровни тестов используются: unit, integration, component, e2e и visual regression. Также важно
выяснить, какие инструменты приняты: TestBed, Angular Testing Library, Component Harness, Cypress, Playwright, Jest,
Vitest или Karma. Хороший ответ объясняет не только инструменты, но и что именно ими проверяют и где проходит граница
между тестом, lint и ручной проверкой.





#### Вопрос: Что такое Karma, Jasmine (зачем их используют совместно при разработке на Angular)?

**Короткий ответ**

Это разные части тестового стека:

**Полный ответ**

Это разные части тестового стека:

- **Jasmine** — test framework: `describe`, `it`, expectations, spies и hooks.
- **Karma** — test runner, который запускает тестовый bundle в браузерах, собирает результаты и следит за файлами.

Их использовали совместно, потому что Jasmine описывал тесты, а Karma предоставлял браузерное окружение и запуск.

Это исторически популярная конфигурация Angular CLI, но не единственный современный вариант. Проект может использовать
Vitest, Jest или другой runner. При выборе важны скорость, browser fidelity, поддержка Angular, debugging и интеграция с
CI.





#### Вопрос: В чем разница между Jest и Karma?

**Короткий ответ**

Сравнение не полностью симметрично:

**Полный ответ**

Сравнение не полностью симметрично:

- Karma — runner для запуска тестов в реальных браузерах.
- Jest — test framework и runner с assertions, mocks, coverage и обычно DOM-эмуляцией через jsdom.

Jest часто быстрее и проще для unit-тестов благодаря параллельному запуску, watch mode и встроенным инструментам. Karma
дает настоящее браузерное окружение, но обычно запускается и настраивается тяжелее.

Эмуляция DOM не воспроизводит все особенности layout, CSS и browser API. Поэтому даже при Jest/Vitest нужны component
integration и E2E-тесты в реальном браузере для поведения, зависящего от платформы.





#### Вопрос: В чем разница между Protractor и Cypress?

**Короткий ответ**

Protractor был Angular-ориентированным E2E-инструментом поверх WebDriver и умел автоматически ожидать Angular stability.
Проект Protractor снят с поддержки и не должен выбираться для новых приложений.

**Полный ответ**

Protractor был Angular-ориентированным E2E-инструментом поверх WebDriver и умел автоматически ожидать Angular stability.
Проект Protractor снят с поддержки и не должен выбираться для новых приложений.

Cypress работает через собственный browser runner, дает удобный time-travel UI, автоматические ожидания, network
stubbing и хорошую диагностику. Его модель выполнения отличается от обычного WebDriver и имеет собственные ограничения,
например при работе с несколькими вкладками и некоторыми cross-origin сценариями.

Современная альтернатива также Playwright: он управляет Chromium, Firefox и WebKit, поддерживает несколько контекстов,
вкладок и параллельный запуск.

Для существующего проекта миграция должна сохранять критические сценарии и постепенно заменять Protractor-тесты, а не
переписывать весь набор одним большим изменением.



### Angular coding questions



#### Вопрос: Что отрендерит компонент с ContentChildren, Directive, QueryList, *ngIf и projected content?

**Короткий ответ**

ngIf здесь использован как legacy structural syntax, который все еще часто встречается в проектах.

**Полный ответ**

`*ngIf` здесь использован как legacy structural syntax, который все еще часто встречается в проектах.

```ts
@Directive({
  selector: '[appItem]',
})
export class ItemDirective {}

@Component({
  selector: 'app-panel',
  template: `
    <p>Найдено: {{ items?.length ?? 0 }}</p>
    <ng-content />
  `,
})
export class PanelComponent {
  protected items: QueryList<ItemDirective> | null = null;

  @ContentChildren(ItemDirective)
  set projectedItems(items: QueryList<ItemDirective>) {
    this.items = items;
  }
}
```

```html
<app-panel>
  <span appItem>А</span>
  <span
    *ngIf="false"
    appItem
  >
    Б
  </span>
  <ng-template>
    <span appItem>В</span>
  </ng-template>
</app-panel>
```

Короткий ответ: отрендерится `Найдено: 1` и текст `А`. Элемент `Б` не создан из-за `*ngIf="false"`, а содержимое
`ng-template` не создается само по себе, поэтому `ContentChildren` видит только один реально спроецированный
`ItemDirective`.



### Архитектура Angular-приложений

Общие определения feature-first, dependency direction, facade, DTO/domain model и presentational/container components
даны в разделе [«Организация кода»](../frontend-architecture-patterns/index.md). Ниже акцент сделан на том, как провести
эти границы с помощью standalone routes, lazy loading, Angular DI, signals и инструментов monorepo.



#### Вопрос: Какие архитектурные подходы применяются в Angular-приложениях?

**Короткий ответ**

Angular не предписывает единственную архитектуру приложения. Он предоставляет components, Router, DI и reactive APIs, а
команда выбирает границы и правила зависимостей под продукт:

**Полный ответ**

Angular не предписывает единственную архитектуру приложения. Он предоставляет components, Router, DI и reactive APIs, а
команда выбирает границы и правила зависимостей под продукт:

| Подход                           | Основная единица и практическое применение в Angular                                                                                                                  |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Feature-first                    | Код группируется по пользовательским возможностям; общие принципы описаны на [общей странице](../frontend-architecture-patterns/index.md#границы-и-структура-feature) |
| Route-first                      | Standalone routes задают крупные lazy boundaries через `loadComponent()` и `loadChildren()`                                                                           |
| Vertical Slice Architecture      | Один use case хранит рядом route/component, state, data-access и тесты                                                                                                |
| Nx domain scopes и project types | Scope (`employees`) выражает бизнес-владельца, type (`feature`, `data-access`, `ui`, `util`) — техническую роль                                                       |
| Layered Architecture             | UI, application, data-access и model разделены направлением imports                                                                                                   |
| Clean / Hexagonal Architecture   | Сложные domain rules зависят от ports, а HTTP и Angular DI предоставляют adapters                                                                                     |
| DDD и bounded contexts           | Границы библиотек отражают бизнес-язык и ownership, а не только тип файлов                                                                                            |
| Feature-Sliced Design            | `app`, `pages`, `widgets`, `features`, `entities`, `shared` задают уровни и import rules                                                                              |
| Microfrontends                   | Отдельно выпускаемые части интегрируются host-приложением                                                                                                             |
| Angular Enterprise Architecture  | Opinionated набор типов, границ и проверок, предложенный Tomas Trajan                                                                                                 |

Подходы не обязаны конкурировать. Enterprise-приложение может использовать route-first для lazy boundaries,
feature-first для организации кода, vertical slices внутри крупной feature, Nx tags для проверки imports и элементы
Clean Architecture только в доменах со сложными правилами. Название папок без ownership и проверяемого направления
зависимостей ещё не образует архитектуру.





#### Вопрос: Чем feature-first отличается от route-first?

**Короткий ответ**

Feature-first группирует код по пользовательской возможности независимо от способа входа в неё. Route-first использует
маршруты как основные границы загрузки и lifetime. Поэтому route-first часто является частным случаем feature-first, но
не каждая feature обязана иметь URL: reusable picker или сценарий редактирования может подключаться обычным standalone
component.

**Полный ответ**

Feature-first группирует код по пользовательской возможности независимо от способа входа в неё. Route-first использует
маршруты как основные границы загрузки и lifetime. Поэтому route-first часто является частным случаем feature-first, но
не каждая feature обязана иметь URL: reusable picker или сценарий редактирования может подключаться обычным standalone
component.

```text
src/app/
  employees/
    list/
      employees-list.component.ts
    details/
      employee-details.component.ts
    employee-picker/
      employee-picker.component.ts
    employees.routes.ts
  administration/
    administration.routes.ts
```

```ts
export const routes: Routes = [
  {
    path: 'employees',
    loadChildren: async () => (await import('./employees/employees.routes')).EMPLOYEES_ROUTES,
  },
  {
    path: 'administration',
    loadChildren: async () => (await import('./administration/administration.routes')).ADMINISTRATION_ROUTES,
  },
];

export const EMPLOYEES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: async () => (await import('./list/employees-list.component')).EmployeesListComponent,
  },
  {
    path: ':id',
    loadComponent: async () => (await import('./details/employee-details.component')).EmployeeDetailsComponent,
  },
];
```

`employee-picker` остаётся частью employees domain, хотя не является route. `loadChildren()` создаёт lazy route graph, а
`loadComponent()` подходит для отдельного routed component. Само наличие dynamic import создаёт chunk, но разумная
граница также должна учитывать ownership и частоту совместного использования кода.





#### Вопрос: Что должно находиться в core Angular-приложения?

**Короткий ответ**

core — application-wide infrastructure и bootstrap concerns:

**Полный ответ**

`core` — application-wide infrastructure и bootstrap concerns:

- authentication/session;
- functional HTTP interceptors;
- runtime configuration через typed `InjectionToken`;
- global error handling;
- logging и telemetry;
- инфраструктурные adapters, используемые всем приложением.

В standalone-приложении `core` не обязан быть `CoreModule`. Чаще это providers и функции конфигурации:

```ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor, telemetryInterceptor])),
    {provide: ErrorHandler, useClass: AppErrorHandler},
    provideRuntimeConfig(),
  ],
};
```

NgModule-based `CoreModule` — legacy-подход, нужный в старых приложениях или для совместимости с NgModule libraries.

В `core` не следует помещать proposal business rules, compensation calculations, permissions одной feature, feature
stores и справочники одного домена. **Core Dump** возникает, когда `core` означает «важный код» и начинает зависеть от
всех продуктовых областей. Тогда он становится скрытым god module, ломает dependency direction и часто попадает в
initial bundle независимо от реального сценария.





#### Вопрос: Что должно находиться в shared Angular-приложения?

**Короткий ответ**

В shared помещают код без конкретного бизнес-владельца, с несколькими реальными consumers и стабильным публичным API: UI
primitives, общие pipes/directives, маленькие framework-neutral utilities и технические types. Standalone component
импортируется напрямую; создавать SharedModule ради re-export всех declarables не нужно. Такой module допустим как
legacy-граница старого NgModule-приложения.

**Полный ответ**

В `shared` помещают код без конкретного бизнес-владельца, с несколькими реальными consumers и стабильным публичным API:
UI primitives, общие pipes/directives, маленькие framework-neutral utilities и технические types. Standalone component
импортируется напрямую; создавать `SharedModule` ради re-export всех declarables не нужно. Такой module допустим как
legacy-граница старого NgModule-приложения.

**Shared Dump** — папка, куда отправляют всё, что встретилось дважды или не нашло владельца. В ней смешиваются business
models, HTTP clients, UI и случайные helpers; изменение «общего» кода неожиданно затрагивает несвязанные features.

Перед выносом полезно проверить:

1. Consumers повторяют одно знание или только похожий syntax?
2. Совпадают ли semantics, lifecycle и темп изменений?
3. Кто владеет API и отвечает за breaking changes?
4. Можно ли назвать abstraction без слов `common`, `base` и `helper`?

Если ответы неясны, небольшое дублирование сохраняет независимость и часто дешевле преждевременной abstraction.





#### Вопрос: Что в Nx означает domain, а что означает feature?

**Короткий ответ**

В Nx обычно полезно классифицировать project двумя независимыми координатами:

**Полный ответ**

В Nx обычно полезно классифицировать project двумя независимыми координатами:

- **scope/domain** отвечает на вопрос «какой бизнес-области принадлежит код»: `employees`, `administration`,
  `compensation`;
- **type** отвечает на вопрос «какую роль выполняет project»: `feature`, `data-access`, `ui`, `util`, иногда `domain`.

```text
libs/
  employees/
    feature-list/
    feature-details/
    data-access/
    ui/
  compensation/
    domain/
    data-access/
```

Например, `scope:employees` и `type:feature` могут быть двумя tags одной library. Правило разрешает employee features
зависеть от `employees:data-access` и общего UI, но запрещает deep import во внутренности `compensation`. Поэтому папки
`features` и `domains` не обязательно конкурируют: domain задаёт business scope, feature — тип building block внутри
него. Конкретные имена менее важны, чем единая классификация и `@nx/enforce-module-boundaries` в CI.





#### Вопрос: Где должен находиться общий код двух feature?

**Короткий ответ**

Применяют принцип ближайшего общего владельца: поднимают код настолько высоко, насколько нужно реальным consumers, но не
выше.

**Полный ответ**

Применяют принцип ближайшего общего владельца: поднимают код настолько высоко, насколько нужно реальным consumers, но не
выше.

| Кто использует код                          | Предпочтительное место                                     |
| ------------------------------------------- | ---------------------------------------------------------- |
| Два components одной подфичи                | Рядом с подфичей, то есть `feature-local`                  |
| Две подфичи одного route-раздела            | Общая папка или provider внутри родительской route feature |
| Две верхнеуровневые feature одного domain   | `domain-shared` library с владельцем и публичным API       |
| Несколько доменов используют технический UI | `application-shared/ui` или отдельный UI kit               |
| Всё приложение использует инфраструктуру    | `core`/application providers                               |

`feature-local` можно менять вместе с одной feature. `domain-shared` выражает бизнес-знание конкретного bounded context.
`application-shared` не имеет конкретного бизнес-владельца и обслуживает несколько областей. `core` содержит глобальную
инфраструктуру и bootstrap concerns, а не любой повторившийся код.

Два похожих consumers — сигнал проверить abstraction, а не команда немедленно перенести её в `shared` или `core`. Иногда
две маленькие локальные реализации дешевле преждевременного общего API, который связывает разные use cases.





#### Вопрос: Где хранить состояние, используемое несколькими feature?

**Короткий ответ**

Сначала определяют владельца и lifetime, а затем библиотеку или папку:

**Полный ответ**

Сначала определяют владельца и lifetime, а затем библиотеку или папку:

| Вид состояния            | Типичный владелец и scope                                                     |
| ------------------------ | ----------------------------------------------------------------------------- |
| Component state          | Один component subtree; обычный field или `signal()`                          |
| Feature state            | Feature store, предоставленный component или feature route                    |
| Parent route state       | Provider родительского route, общий для его child routes                      |
| Domain state             | Domain service/cache с явным API и несколькими feature-consumers              |
| Global application state | Session, locale, runtime settings; root provider                              |
| Server state             | Repository/query cache с invalidation, refresh и server как источником истины |
| Workflow state           | Конкретный wizard/review flow; route- или component-scoped store              |

```ts
@Component({
  providers: [FeatureStore],
  templateUrl: './feature.component.html',
})
export class FeatureComponent {
  protected readonly store = inject(FeatureStore);
}
```

```ts
export const PARENT_ROUTES: Routes = [
  {
    path: '',
    providers: [ParentFeatureStore],
    children: [
      {path: '', loadComponent: () => import('./list/list.component').then((m) => m.ListComponent)},
      {path: ':id', loadComponent: () => import('./details/details.component').then((m) => m.DetailsComponent)},
    ],
  },
];
```

Расположение файла и lifetime service — разные вещи: service из `libs/employees/data-access` может быть root-scoped,
route-scoped или component-scoped в зависимости от места provider. `providedIn: 'root'` оправдан для одного
application-wide экземпляра, например session или разделяемого cache. Route-level provider безопаснее для фильтров,
выбора и workflow state: экземпляр изолирован от соседних feature и уничтожается вместе с route environment injector.

Server state нельзя автоматически считать workflow state. Список сотрудников может кешироваться domain repository, а
выбранная строка и несохранённые фильтры принадлежат конкретному экрану.





#### Вопрос: Как организовать зависимости между слоями Angular-приложения?

**Короткий ответ**

Практичное базовое направление imports:

**Полный ответ**

Практичное базовое направление imports:

```text
app -> feature -> data-access -> domain/model -> shared
                 feature -> ui
                 feature -> shared
```

`app` композирует routes и application providers. `feature` координирует use case. `data-access` работает с HTTP,
storage, DTO и adapters. `domain/model` содержит стабильные types и pure rules. `ui` получает данные через inputs и
отдаёт события через outputs. Допустимые стрелки настраивают под проект; важна их однозначность.

Обычно запрещают:

- `feature A` импортировать внутренности `feature B`;
- `shared` зависеть от product feature;
- `domain` зависеть от feature или Angular Router;
- generic `ui` инжектировать feature store;
- `core` зависеть от конкретной продуктовой feature.

Правила должны проверяться автоматически: Nx tags с `@nx/enforce-module-boundaries`, ESLint
`no-restricted-imports`/`eslint-plugin-boundaries`, узкие public entry points, TypeScript project references или
отдельные libraries. Barrel не является защитой сам по себе: lint/build должны запрещать deep imports. Исключение
оформляют явно с владельцем и причиной, иначе документация быстро расходится с реальным dependency graph.





#### Вопрос: Нужны ли папки ui, data-access, model и util в каждой feature?

**Короткий ответ**

Нет. Структура должна следовать появившимся ответственностям, а не создавать пустые слои заранее. Для небольшого CRUD
экрана достаточно:

**Полный ответ**

Нет. Структура должна следовать появившимся ответственностям, а не создавать пустые слои заранее. Для небольшого CRUD
экрана достаточно:

```text
orders/
  orders.component.ts
  orders.api.ts
```

Когда появляются независимые routes, общий data-access и reusable domain UI, структура может вырасти:

```text
orders/
  feature-list/
  feature-details/
  data-access/
  model/
  ui/
```

Папка `util` особенно легко теряет смысл: лучше имя по назначению, например `price-formatting` или `date-range`. Новый
project/library оправдан, если нужны отдельный public API, dependency rules, ownership или независимая проверка. Один
файл не обязан становиться library только ради симметрии дерева.





#### Вопрос: Как соотносятся Store, Repository и Facade?

**Короткий ответ**

Это роли, а не обязательный комплект классов:

**Полный ответ**

Это роли, а не обязательный комплект классов:

- **Repository** работает с внешним источником, transport errors и DTO, возвращая model, понятную приложению.
- **Store** владеет состоянием и transitions; наружу обычно отдаёт readonly signals или Observables.
- **Facade** предоставляет UI API пользовательских сценариев и координирует store, repository и side effects.
- **Domain model** содержит business invariants и pure rules, не зависящие от Angular component или HTTP.
- **Form adapter** преобразует domain model в form value и обратно, не заставляя domain model повторять форму.

Общее описание facade и разделения DTO/model есть на
[странице организации кода](../frontend-architecture-patterns/index.md#границы-и-структура-feature). Angular-специфика
заключается в lifetime: facade/store можно предоставить на route, repository-cache — в root, а dependencies получить
через `inject()`.

Для маленькой feature один `OrdersService` может загрузить данные и держать пару signals. Это допустимо, пока у него
одна связная ответственность, узкий API и понятный lifetime. Разделение нужно, когда независимо меняются transport,
state transitions или несколько use cases, а не потому, что архитектурная схема требует три файла.





#### Вопрос: Что такое Angular Enterprise Architecture Tomas Trajan?

**Короткий ответ**

Это opinionated architecture и набор tooling practices от Tomas Trajan, а не официальный стандарт Angular. Современная
версия подхода ориентирована на standalone APIs, изоляцию features и автоматическую проверку boundaries. В связанных
материалах встречаются building blocks core, layouts, features, ui и patterns, а routes выделяют lazy feature
boundaries.

**Полный ответ**

Это opinionated architecture и набор tooling practices от Tomas Trajan, а не официальный стандарт Angular. Современная
версия подхода ориентирована на standalone APIs, изоляцию features и автоматическую проверку boundaries. В связанных
материалах встречаются building blocks `core`, `layouts`, `features`, `ui` и `patterns`, а routes выделяют lazy feature
boundaries.

Сильные стороны подхода:

- явные типы building blocks и направления зависимостей;
- feature isolation и предсказуемый public API;
- lazy loading через route boundaries;
- ESLint-based validation вместо соглашений только в документации;
- повторяемая структура для нескольких команд.

Ограничения и риски:

- `core` без строгого определения превращается в Core Dump;
- граница между reusable `pattern` и product `feature` бывает неочевидной;
- имя папки не определяет bundling: chunk появляется из реального lazy import graph;
- абсолютный запрет `inject()` в любом UI слишком категоричен — generic UI не должен знать feature store, но DI уместен
  для `ElementRef`, locale, accessibility primitives или theme tokens;
- shared code нельзя определять только количеством consumers: важны semantics, owner и стабильность API.

Подход полезен как стартовая система ограничений, которую команда адаптирует под свои bounded contexts и tooling, а не
как универсальный шаблон для любого размера приложения.





#### Вопрос: Как выбрать архитектуру для нового Angular-проекта?

**Короткий ответ**

Начинают с минимальной структуры и усложняют её по наблюдаемым причинам:

**Полный ответ**

Начинают с минимальной структуры и усложняют её по наблюдаемым причинам:

| Контекст                      | Практичный старт                                                                                                                        |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Маленькое приложение          | Feature-first, standalone components, локальные services/signals, без формальных application/domain слоёв                               |
| Среднее приложение            | Route-first lazy features, vertical slices, feature-local state, небольшой `shared`                                                     |
| Большое enterprise-приложение | Business scopes, lazy route boundaries, domain-shared libraries, Nx/ESLint boundaries, route-scoped state, selective Clean Architecture |
| Несколько независимых команд  | Monorepo с domain boundaries; microfrontends только при требовании независимого deployment                                              |

Порядок решения на старте:

1. Назвать business areas, owners и критические use cases.
2. Совместить крупные areas с `loadChildren()` boundaries, не дробя каждый component в отдельный chunk.
3. По умолчанию держать state и providers ближе к feature; в root поднять только действительно application-wide state.
4. Зафиксировать разрешённые imports в ESLint/Nx до роста команды.
5. Вводить repository ports, domain layer или facade только там, где есть сложная логика или меняющиеся integrations.
6. Пересматривать границы по dependency graph, времени изменений и ownership, а не ради симметрии папок.

Standalone routing, functional providers, `inject()`, signals и современный control flow уменьшают framework
boilerplate, но сами по себе не выбирают архитектуру.





#### Вопрос: Какие архитектурные ошибки часто встречаются в Angular?

**Короткий ответ**

Также опасно считать любой lazy route независимой feature: lazy loading описывает момент загрузки, но не ownership и
разрешённые dependencies. Обратная ошибка — сделать всё root-scoped ради переиспользования и затем вручную очищать state
при каждой навигации. Обычно корректный DI scope выражает lifecycle надёжнее такого cleanup protocol.

**Полный ответ**

- Глобальные каталоги `components`, `services`, `models`, скрывающие domain ownership.
- Core Dump и Shared Dump.
- `providedIn: 'root'` для любого состояния, из-за чего фильтры и drafts переживают feature и конфликтуют между tabs.
- Прямые и особенно deep imports между features.
- Один огромный facade/store для несвязанных сценариев.
- Backend DTO, используемый одновременно как form value и domain model.
- Универсальный `BaseService<T>` с CRUD, который стирает endpoints, validation, cache и error semantics.
- Wrapper над каждым компонентом UI-библиотеки без дополнительного контракта или accessibility value.
- Преждевременная Clean Architecture с ports/adapters для простого локального CRUD.
- Архитектурные правила только в wiki без lint/build проверки.

Также опасно считать любой lazy route независимой feature: lazy loading описывает момент загрузки, но не ownership и
разрешённые dependencies. Обратная ошибка — сделать всё root-scoped ради переиспользования и затем вручную очищать state
при каждой навигации. Обычно корректный DI scope выражает lifecycle надёжнее такого cleanup protocol.





#### Вопрос: Когда выбирать microfrontends для Angular-приложения?

**Короткий ответ**

Размер кодовой базы сам по себе недостаточен. Microfrontends оправданы, когда устойчивые product/domain boundaries
совпадают с независимыми командами, ownership, release cycles и необходимостью отдельных deployments. Если команды всё
равно синхронно тестируют и выпускают продукт, modular monolith с Nx boundaries обычно проще.

**Полный ответ**

Размер кодовой базы сам по себе недостаточен. Microfrontends оправданы, когда устойчивые product/domain boundaries
совпадают с независимыми командами, ownership, release cycles и необходимостью отдельных deployments. Если команды всё
равно синхронно тестируют и выпускают продукт, modular monolith с Nx boundaries обычно проще.

Цена автономии включает runtime integration, совместимость версий Angular и contracts, shared dependencies, routing,
authentication, observability, rollback и согласованность UI. Module Federation или Native Federation решает механизм
загрузки, но не ownership и domain coupling. Нужно заранее определить поведение host при недоступности remote и
совместимость независимо развёрнутых версий.

Подробности про host/remote, route-level и widget-level integration, SSR, security и testing находятся в разделе
[«Micro Frontends»](#micro-frontends); здесь критерий выбора приведён только в архитектурном контексте.





#### Вопрос: Какую практическую задачу по архитектуре Angular можно дать на интервью?

**Короткий ответ**

Условие

**Полный ответ**

**Условие**

Есть Angular-приложение с разделами `employees`, `administration`, `proposals` и `statistics`.

- `employees` и `administration` используют данные сотрудников;
- `proposals` и `statistics` используют выбранный review;
- у каждого раздела есть собственные фильтры таблиц.

Предложите структуру и объясните:

1. Какие данные должны быть feature-local?
2. Какое состояние может быть domain-shared?
3. Что должно находиться в `core`?
4. Где разместить repositories?
5. Какие зависимости запретить?
6. Где предоставить stores через Angular DI?

**Пример сильного ответа**

Фильтры таблиц принадлежат каждому route-разделу: их держат в query params, если нужны deep links, либо в route-scoped
store. Один общий `TableFiltersStore` в root не нужен. UI selection, dialogs и drafts также остаются feature-local.

Employee entities и cache могут принадлежать `employees/data-access` или отдельной `employees/domain` library с узким
repository API, которое используют `employees` и `administration`. Это не означает, что administration импортирует
components или store employees feature. Выбранный review делают domain-shared только если это действительно общий
business context для proposals и statistics и его lifetime переживает переход между ними. Если selection нужен лишь
одному parent workflow, безопаснее provider на общем parent route; если выбор должен воспроизводиться ссылкой, его id
хранят в URL, а entity загружает repository.

В `core` остаются session/auth, runtime config, interceptors, error reporting и telemetry. Employee и review
repositories находятся в data-access libraries соответствующих domains: они знают DTO и transport, но не table filters.
Запрещают deep imports и зависимости `employees feature -> administration feature`, `shared -> feature`,
`domain -> feature`; разрешённую композицию делает app/parent route.

```ts
export const REVIEW_ROUTES: Routes = [
  {
    path: '',
    providers: [SelectedReviewStore],
    children: [
      {
        path: 'proposals',
        loadChildren: async () => (await import('./proposals.routes')).PROPOSALS_ROUTES,
      },
      {
        path: 'statistics',
        loadChildren: async () => (await import('./statistics.routes')).STATISTICS_ROUTES,
      },
    ],
  },
];
```

Каждый routed component или его route получает собственный filters store. `SelectedReviewStore` живёт у ближайшего
общего route-owner. Root provider выбирают только если review является настоящим application-wide context. Ответ должен
обосновывать ownership, lifetime и dependency rules; конкретные названия папок вторичны.
