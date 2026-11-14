# Angular — вопросы и ответы, часть 2

> Автоматически сгенерировано из src/pages/angular/index.md. Не редактируйте вручную.

### Компоненты, директивы, сервисы и pipes



#### Вопрос: Что такое директива, компонент, модуль, сервис, пайп в Angular и для чего они нужны?

**Короткий ответ**

Компонент — директива с собственным шаблоном. В Angular 19+ компоненты standalone по умолчанию и напрямую импортируют
зависимости шаблона в imports. - Директива добавляет поведение существующему элементу или шаблону. - Сервис
инкапсулирует состояние, бизнес-логику, data access или интеграцию и обычно получается через inject(). - Pipe выполняет
чистое преобразование значения для отображения в шаблоне.

**Полный ответ**

- **Компонент** — директива с собственным шаблоном. В Angular 19+ компоненты standalone по умолчанию и напрямую
  импортируют зависимости шаблона в `imports`.
- **Директива** добавляет поведение существующему элементу или шаблону.
- **Сервис** инкапсулирует состояние, бизнес-логику, data access или интеграцию и обычно получается через `inject()`.
- **Pipe** выполняет чистое преобразование значения для отображения в шаблоне.
- **NgModule** группирует declarations/providers в legacy-архитектуре. Он остается поддерживаемым, но для нового
  приложения базовой моделью являются standalone APIs, `bootstrapApplication()` и route-level providers.





#### Вопрос: Что такое директива и как создать собственную?

**Короткий ответ**

Директивы бывают трех видов: компонент, структурные и атрибутные (см. выше).

**Полный ответ**

Директивы бывают трех видов: компонент, структурные и атрибутные (см. выше).

Современная атрибутная директива использует `inject()`, signal input и объект `host`:

```ts
@Directive({
  selector: '[appHighlight]',
  host: {
    '(mouseenter)': 'active.set(true)',
    '(mouseleave)': 'active.set(false)',
    '[style.backgroundColor]': 'active() ? color() : null',
  },
})
export class HighlightDirective {
  readonly color = input('yellow', {alias: 'appHighlight'});
  readonly active = signal(false);
}
```

В новом коде объект `host` предпочтительнее `@HostBinding` и `@HostListener`. Прямое изменение DOM через
`ElementRef.nativeElement` используют только когда declarative binding или `Renderer2` не решают задачу.

Пользовательская структурная директива работает с `TemplateRef` и `ViewContainerRef`:

```ts
@Directive({
  selector: '[appUnless]',
})
export class UnlessDirective {
  private readonly template = inject(TemplateRef<unknown>);
  private readonly container = inject(ViewContainerRef);
  private readonly condition = input.required<boolean>({alias: 'appUnless'});

  constructor() {
    effect(() => {
      this.container.clear();

      if (!this.condition()) {
        this.container.createEmbeddedView(this.template);
      }
    });
  }
}
```

Для обычных условий собственная структурная директива не нужна: используйте `@if`. Она оправдана, когда инкапсулирует
повторяемое доменное поведение.

Через CLI директиву создают командой:

```bash
ng generate directive shared/highlight
```





#### Вопрос: Расскажите об основных параметрах @NgModule, @Component, @Directive, @Injectable, @Pipe

**Короткий ответ**

В Angular 19–22 основной подход — standalone. Компоненты, директивы и pipes standalone по умолчанию; standalone: true
обычно не пишут.

**Полный ответ**

В Angular 19–22 основной подход — standalone. Компоненты, директивы и pipes standalone по умолчанию; `standalone: true`
обычно не пишут.

Основные параметры:

- `@Component`: `selector`, `template`/`templateUrl`, `styles`/`styleUrl`, `imports`, `providers`, `viewProviders`,
  `changeDetection`, `encapsulation`, `host`.
- `@Directive`: `selector`, `providers`, `host`, `exportAs`.
- `@Injectable`: `providedIn`.
- `@Pipe`: `name`, `pure`.

Inputs, outputs и queries в новом коде объявляют в классе:

```ts
@Component({
  selector: 'app-user-card',
  imports: [DatePipe],
  templateUrl: './user-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.selected]': 'selected()',
  },
})
export class UserCardComponent {
  readonly user = input.required<User>();
  readonly selected = input(false);
  readonly selectedChange = output<boolean>();
  readonly menu = viewChild(MenuComponent);
}
```

`NgModule` остается поддерживаемым для legacy-кода и некоторых библиотек. Его основные поля: `declarations`, `imports`,
`exports`, `providers` и `bootstrap`. Ivy как отдельная тема собеседования сейчас скорее historical topic:
`entryComponents`, `ComponentFactoryResolver` и `moduleId` в современном Ivy-приложении не нужны.





#### Вопрос: Что такое динамические компоненты и как их можно использовать в Angular?

**Короткий ответ**

Динамические компоненты создаются во время выполнения. Типичные случаи: dialogs, overlays, notifications и
конфигурируемые widgets.

**Полный ответ**

Динамические компоненты создаются во время выполнения. Типичные случаи: dialogs, overlays, notifications и
конфигурируемые widgets.

В Angular 19–22 есть три основных варианта:

1. `@defer` — лениво загрузить тяжелую часть шаблона.
2. `NgComponentOutlet` — выбрать тип компонента в шаблоне.
3. `ViewContainerRef.createComponent()` — создать компонент императивно.

```ts
@Component({
  selector: 'app-dialog-host',
  template: `
    <ng-container #container />
  `,
})
export class DialogHostComponent {
  private readonly container = viewChild.required('container', {
    read: ViewContainerRef,
  });

  open(): void {
    const componentRef = this.container().createComponent(UserDialogComponent);

    componentRef.setInput('userId', '42');
    componentRef.instance.closed.subscribe(() => componentRef.destroy());
  }
}

export class UserDialogComponent {
  readonly userId = input.required<string>();
  readonly closed = output<void>();
}
```

Для глобальных overlays обычно используют Angular CDK Overlay или API UI-kit. `ComponentFactoryResolver` и
`entryComponents` относятся к legacy-подходу.





#### Вопрос: Как применить анимацию к компонентам?

**Короткий ответ**

В Angular 20.2+ для нового кода рекомендуются CSS-анимации и compiler APIs animate.enter / animate.leave.

**Полный ответ**

В Angular 20.2+ для нового кода рекомендуются CSS-анимации и compiler APIs `animate.enter` / `animate.leave`.

<!-- prettier-ignore -->
```html
@if (isOpen()) {
  <section animate.enter="dialog-enter" animate.leave="dialog-leave">
    ...
  </section>
}
```

```css
.dialog-enter {
  animation: fade-in 180ms ease-out;
}

.dialog-leave {
  animation: fade-out 120ms ease-in;
}
```

Для сложной timeline-анимации можно передать функцию и интегрировать GSAP или другую библиотеку. Нужно учитывать
`prefers-reduced-motion`.

Legacy DSL из `@angular/animations` с `trigger`, `state` и `transition` deprecated, но может встречаться в существующих
приложениях.



### Angular low-level API



#### Вопрос: Что такое TemplateRef?

**Короткий ответ**

TemplateRef представляет неотрендеренный фрагмент шаблона, обычно содержимое . Сам по себе он ничего не показывает.

**Полный ответ**

`TemplateRef` представляет неотрендеренный фрагмент шаблона, обычно содержимое `<ng-template>`. Сам по себе он ничего не
показывает.

Его можно передать в компонент, получить через query или использовать в структурной директиве, а затем создать embedded
view через `ViewContainerRef`.





#### Вопрос: Что такое ViewContainerRef?

**Короткий ответ**

ViewContainerRef - контейнер для динамических views. Через него создают embedded views из TemplateRef или компоненты
через createComponent().

**Полный ответ**

`ViewContainerRef` - контейнер для динамических views. Через него создают embedded views из `TemplateRef` или компоненты
через `createComponent()`.

Типичные случаи: структурные директивы, dynamic dialogs, plugin-like UI и lazy widgets. Владелец контейнера также
управляет порядком, очисткой и уничтожением созданных views.





#### Вопрос: Чем ViewChild отличается от ContentChild?

**Короткий ответ**

ViewChild ищет элемент, директиву или компонент внутри собственного view шаблона компонента. ContentChild ищет в
контенте, который родитель спроецировал через .

**Полный ответ**

`ViewChild` ищет элемент, директиву или компонент внутри собственного view шаблона компонента. `ContentChild` ищет в
контенте, который родитель спроецировал через `<ng-content>`.

View queries доступны после инициализации view, content queries - после инициализации projected content. В новом коде
часто используют signal queries: `viewChild()`, `contentChild()`, `viewChildren()`, `contentChildren()`.





#### Вопрос: Когда можно использовать ElementRef?

**Короткий ответ**

ElementRef дает ссылку на host DOM node. Его используют для интеграции с browser API, focus management, измерений или
сторонней библиотекой.

**Полный ответ**

`ElementRef` дает ссылку на host DOM node. Его используют для интеграции с browser API, focus management, измерений или
сторонней библиотекой.

Нельзя без необходимости менять DOM через `nativeElement`: сначала стоит выбрать binding, directive, `Renderer2`, CDK
или template reference. Для пользовательских данных помните про XSS и sanitization.





#### Вопрос: Для чего нужен Renderer2?

**Короткий ответ**

Renderer2 - low-level API для создания элементов, установки свойств, классов, стилей и слушателей через абстракцию
Angular renderer.

**Полный ответ**

`Renderer2` - low-level API для создания элементов, установки свойств, классов, стилей и слушателей через абстракцию
Angular renderer.

Его используют редко: когда declarative bindings, host metadata или CDK API не подходят. Прямые DOM-операции через
`nativeElement` хуже для SSR, тестов и альтернативных renderers.





#### Вопрос: Зачем нужен Renderer2 и чем он помогает в отличие от ElementRef.nativeElement или declarative binding в host?

**Короткий ответ**

В большинстве host-взаимодействий лучше начинать с declarative bindings в host: они читаются как часть контракта
директивы, обновляются Angular и хорошо подходят для class, style, attributes, properties и событий host-элемента.

**Полный ответ**

В большинстве host-взаимодействий лучше начинать с declarative bindings в `host`: они читаются как часть контракта
директивы, обновляются Angular и хорошо подходят для class, style, attributes, properties и событий host-элемента.

```ts
@Directive({
  selector: '[appInvalidControl]',
  host: {
    '[attr.aria-invalid]': 'invalid()',
    '[class.invalid]': 'invalid()',
    '(blur)': 'markAsTouched()',
  },
})
export class InvalidControlDirective {
  readonly invalid = input(false);

  protected markAsTouched(): void {
    // ...
  }
}
```

`Renderer2` нужен, когда изменение DOM должно быть императивным: подписка на динамическую цель, создание или удаление
элементов, установка стилей по результатам измерений, интеграция с API, где binding неудобен. Он не делает код полностью
декларативным, но дает Angular renderer abstraction вместо прямой работы с DOM.

```ts
@Directive({
  selector: '[appAutofocus]',
})
export class AutofocusDirective {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);

  ngAfterViewInit(): void {
    this.renderer.setAttribute(this.host.nativeElement, 'tabindex', '-1');
    this.host.nativeElement.focus();
  }
}
```

Отличия:

- `host` bindings — первый выбор для host attributes, classes, styles, properties и listeners.
- `Renderer2` — fallback для императивных DOM-операций, когда binding, directive composition или CDK API не подходят.
- `ElementRef.nativeElement` — raw DOM node; его стоит оставлять для browser API, focus, measurements и сторонних
  библиотек.

Прямой `nativeElement` сильнее привязывает код к browser DOM, хуже переносится на SSR, сложнее тестируется и легче
приводит к небезопасным операциям вроде записи пользовательских данных в `innerHTML`. `Renderer2` уменьшает эти риски за
счет renderer abstraction, но не отменяет необходимость думать о XSS, cleanup и platform-specific поведении.





#### Вопрос: Что такое HostBinding и почему это legacy API?

**Короткий ответ**

@HostBinding связывает свойство класса со свойством, атрибутом, class или style host-элемента директивы/компонента. API
поддерживается, но для нового кода предпочтителен объект host в metadata.

**Полный ответ**

`@HostBinding` связывает свойство класса со свойством, атрибутом, class или style host-элемента директивы/компонента.
API поддерживается, но для нового кода предпочтителен объект `host` в metadata.

```ts
@Directive({
  selector: '[appBusy]',
  host: {
    '[attr.aria-busy]': 'busy()',
    '[class.busy]': 'busy()',
  },
})
export class BusyDirective {
  readonly busy = input(false);
}
```





#### Вопрос: Что такое HostListener и почему это legacy API?

**Короткий ответ**

@HostListener подписывает директиву или компонент на событие host-элемента. API остается рабочим, но для нового кода
обычно используют host: {'(event)': 'handler($event)'} или обычные template listeners.

**Полный ответ**

`@HostListener` подписывает директиву или компонент на событие host-элемента. API остается рабочим, но для нового кода
обычно используют `host: {'(event)': 'handler($event)'}` или обычные template listeners.

Host listener полезен для поведения директивы, которое принадлежит host-элементу, например hover, focus или keyboard
interaction.





#### Вопрос: Для чего нужен NgZone?

**Короткий ответ**

NgZone связывает Angular change detection с ZoneJS в zone-based приложениях. runOutsideAngular() выносит частые события
наружу, а run() возвращает выполнение в Angular zone.

**Полный ответ**

`NgZone` связывает Angular change detection с ZoneJS в zone-based приложениях. `runOutsideAngular()` выносит частые
события наружу, а `run()` возвращает выполнение в Angular zone.

В zoneless Angular роль `NgZone` меньше: обновления чаще приходят от signals, template events, `AsyncPipe` и явных
уведомлений change detection.





#### Вопрос: Зачем использовать queueMicrotask внутри Angular host listener?

**Короткий ответ**

queueMicrotask() ставит callback в очередь microtasks. Он выполнится после текущего call stack, но до следующего
setTimeout(..., 0) и других tasks. В Angular это иногда полезно, когда на один DOM event подписано несколько директив
или компонентов через host listeners, а код должен прочитать итоговое состояние после завершения всех синхронных
обработчиков текущего события.

**Полный ответ**

`queueMicrotask()` ставит callback в очередь microtasks. Он выполнится после текущего call stack, но до следующего
`setTimeout(..., 0)` и других tasks. В Angular это иногда полезно, когда на один DOM event подписано несколько директив
или компонентов через host listeners, а код должен прочитать итоговое состояние после завершения всех синхронных
обработчиков текущего события.

Это не универсальное решение и не способ чинить плохую архитектуру. Если порядок действий важен для бизнес-логики, лучше
сделать явную orchestration-логику через сервис, store, output/input или отдельный event coordinator.

Пример неявной зависимости от порядка host listeners:

```ts
@Directive({
  selector: '[appSelectOption]',
  host: {
    '(click)': 'onClick()',
  },
})
export class SelectOptionDirective {
  private readonly selectState = inject(SelectState);

  protected onClick(): void {
    this.selectState.selectOption('first');
  }
}

@Directive({
  selector: '[appCloseDropdown]',
  host: {
    '(click)': 'onClick()',
  },
})
export class CloseDropdownDirective {
  private readonly selectState = inject(SelectState);

  protected onClick(): void {
    this.selectState.closeIfSelected();
  }
}
```

Если `closeIfSelected()` должен прочитать состояние после всех синхронных обработчиков текущего `click`, можно отложить
чтение в microtask:

```ts
@Directive({
  selector: '[appCloseDropdown]',
  host: {
    '(click)': 'onClick()',
  },
})
export class CloseDropdownDirective {
  private readonly selectState = inject(SelectState);

  protected onClick(): void {
    queueMicrotask(() => {
      this.selectState.closeIfSelected();
    });
  }
}
```

Разница с `setTimeout(..., 0)`:

```ts
console.log('start');

queueMicrotask(() => {
  console.log('microtask');
});

setTimeout(() => {
  console.log('timeout');
}, 0);

console.log('end');

// start
// end
// microtask
// timeout
```

Когда может быть полезно:

- дождаться завершения всех синхронных обработчиков текущего event;
- прочитать итоговое состояние после серии синхронных изменений;
- не зависеть от порядка нескольких host listeners на одном событии;
- выполнить легкую post-processing логику до следующего task.

Проблемы и риски:

- появляется скрытая асинхронность;
- сложнее читать и тестировать порядок выполнения;
- можно скрыть архитектурную проблему вместо явной orchestration-логики;
- длинная очередь microtasks может задержать render;
- ошибка внутри callback произойдет уже не в исходном синхронном месте;
- microtask не ждет `setTimeout`, HTTP, animation frame и другие tasks;
- для ожидания DOM render лучше использовать `afterNextRender()`, lifecycle hooks или `requestAnimationFrame()` по
  задаче.

Тестировать можно обычным async-тестом:

```ts
it('closes dropdown after click microtask', async () => {
  directive.onClick();

  await Promise.resolve();

  expect(selectState.isOpen()).toBe(false);
});
```

Или через Angular `fakeAsync`:

```ts
it('closes dropdown after click microtask', fakeAsync(() => {
  directive.onClick();

  flushMicrotasks();

  expect(selectState.isOpen()).toBe(false);
}));
```



### NgModules legacy



#### Вопрос: Зачем раньше был нужен NgModule?

**Короткий ответ**

NgModule был основной единицей сборки Angular: группировал components, directives, pipes, providers и bootstrap.
Standalone APIs заменили большую часть этих сценариев локальными imports, route-level providers и
bootstrapApplication().

**Полный ответ**

`NgModule` был основной единицей сборки Angular: группировал components, directives, pipes, providers и bootstrap.
Standalone APIs заменили большую часть этих сценариев локальными `imports`, route-level providers и
`bootstrapApplication()`.

`NgModule` остается поддерживаемым legacy/historical topic и встречается в старых приложениях и некоторых libraries.





#### Вопрос: Что означают declarations, imports, exports и providers в NgModule?

**Короткий ответ**

declarations объявлял компоненты, директивы и pipes модуля. imports подключал другие modules. exports делал часть
declarations/imports доступной внешним modules. providers регистрировал зависимости в injector.

**Полный ответ**

`declarations` объявлял компоненты, директивы и pipes модуля. `imports` подключал другие modules. `exports` делал часть
declarations/imports доступной внешним modules. `providers` регистрировал зависимости в injector.

В standalone-компонентах большую часть `declarations/imports/exports` заменяют локальные `imports` у компонента или
route.





#### Вопрос: Для чего использовали SharedModule?

**Короткий ответ**

SharedModule собирал общие components, directives и pipes, чтобы feature modules могли импортировать их одним модулем.

**Полный ответ**

`SharedModule` собирал общие components, directives и pipes, чтобы feature modules могли импортировать их одним модулем.

В standalone-подходе чаще импортируют конкретные зависимости прямо в компонент или route. Это делает связи явнее и
уменьшает случайный общий API.





#### Вопрос: Чем forRoot отличается от forChild?

**Короткий ответ**

forRoot() регистрировал singleton providers и глобальную конфигурацию один раз в root module. forChild() подключал
директивы/routes без повторной регистрации singleton providers.

**Полный ответ**

`forRoot()` регистрировал singleton providers и глобальную конфигурацию один раз в root module. `forChild()` подключал
директивы/routes без повторной регистрации singleton providers.

Это legacy pattern для NgModule-based libraries. В standalone Angular его часто заменяют `provideX()` functions и
route-level providers.





#### Вопрос: Почему SharedModule не должен провайдить singleton services для lazy modules?

**Короткий ответ**

Lazy module может получить собственный child injector. Если SharedModule содержит providers и импортируется в разных
lazy modules, сервис может создаться несколько раз вместо одного singleton.

**Полный ответ**

Lazy module может получить собственный child injector. Если `SharedModule` содержит providers и импортируется в разных
lazy modules, сервис может создаться несколько раз вместо одного singleton.

Singleton services лучше объявлять через `@Injectable({providedIn: 'root'})`, root providers или явные feature/route
providers, если нужен scoped instance.





#### Вопрос: Как standalone components заменили часть NgModule-сценариев?

**Короткий ответ**

Standalone component сам объявляет template dependencies через imports. Routes могут lazy-load компонент напрямую и
иметь собственные providers.

**Полный ответ**

Standalone component сам объявляет template dependencies через `imports`. Routes могут lazy-load компонент напрямую и
иметь собственные providers.

```ts
export const routes: Routes = [
  {
    path: 'profile',
    loadComponent: async () => (await import('./profile.component')).ProfileComponent,
  },
];
```

Так меньше скрытых module boundaries, проще lazy loading и понятнее зависимости шаблона.



### Pipes



#### Вопрос: Что такое pure pipe?

**Короткий ответ**

Pure pipe пересчитывается только когда меняется ссылка на input или primitive value. Это режим по умолчанию и лучший
выбор для чистых форматирований.

**Полный ответ**

Pure pipe пересчитывается только когда меняется ссылка на input или primitive value. Это режим по умолчанию и лучший
выбор для чистых форматирований.

Pipe должен быть без side effects: одинаковый input дает одинаковый output.





#### Вопрос: Что такое impure pipe?

**Короткий ответ**

Impure pipe (pure: false) вызывается при каждой проверке change detection, даже если ссылка не изменилась. Он может быть
очень дорогим.

**Полный ответ**

Impure pipe (`pure: false`) вызывается при каждой проверке change detection, даже если ссылка не изменилась. Он может
быть очень дорогим.

Используйте его только для редких случаев, где нельзя выразить обновление через signals, Observable, immutable update
или pure pipe.





#### Вопрос: Что делает async pipe?

**Короткий ответ**

AsyncPipe подписывается на Observable или Promise, возвращает последнее значение, помечает view для проверки при новом
значении и отписывается при уничтожении view.

**Полный ответ**

`AsyncPipe` подписывается на Observable или Promise, возвращает последнее значение, помечает view для проверки при новом
значении и отписывается при уничтожении view.

Он удобен для template-facing streams, но несколько `async` pipe на одном cold Observable создают несколько подписок.





#### Вопрос: Как создать custom pipe?

**Короткий ответ**

Pipe объявляют через @Pipe и метод transform. В Angular 19+ pipe standalone по умолчанию и импортируется туда, где
используется.

**Полный ответ**

Pipe объявляют через `@Pipe` и метод `transform`. В Angular 19+ pipe standalone по умолчанию и импортируется туда, где
используется.

```ts
@Pipe({name: 'initials'})
export class InitialsPipe implements PipeTransform {
  transform(value: string): string {
    return value
      .split(/\s+/)
      .filter(Boolean)
      .map((part) => part[0])
      .join('');
  }
}
```





#### Вопрос: Когда pipe лучше computed() или helper function?

**Короткий ответ**

Pipe хорош для отображения значения в шаблоне: форматирование даты, валюты, имени, статуса, короткого текста. Pure pipe
кеширует результат относительно входных значений и не смешивает rendering с бизнес-логикой.

**Полный ответ**

Pipe хорош для отображения значения в шаблоне: форматирование даты, валюты, имени, статуса, короткого текста. Pure pipe
кеширует результат относительно входных значений и не смешивает rendering с бизнес-логикой.

`computed()` лучше, когда производное значение является частью состояния компонента, используется в нескольких местах
класса или зависит от signals.

Helper function допустима для маленькой чистой операции, но вызов из template может выполняться часто. Если функция
создает новые объекты, фильтрует большие массивы или делает тяжелую работу, лучше `computed()`, pure pipe или
предварительная нормализация данных.

Custom pipe не нужен, если преобразование используется один раз и проще читается как подготовленное поле в компоненте.
Impure pipe почти всегда сигнал, что состояние или поток данных спроектированы неудачно.





#### Вопрос: Как pipes влияют на performance?

**Короткий ответ**

Pure pipes помогают не выполнять одно и то же форматирование на каждом render, если input references стабильны. Impure
pipes и тяжелые преобразования в больших списках могут стать hot path.

**Полный ответ**

Pure pipes помогают не выполнять одно и то же форматирование на каждом render, если input references стабильны. Impure
pipes и тяжелые преобразования в больших списках могут стать hot path.

Для дорогих вычислений используйте memoization, `computed()`, предварительную нормализацию данных или перенос работы в
сервис. Сначала измеряйте проблему в profiler.



### Lifecycle и rendering



#### Вопрос: Объясните механизм загрузки (bootstrap) Angular-приложения в браузере?

**Короткий ответ**

Современное standalone-приложение запускается через bootstrapApplication():

**Полный ответ**

Современное standalone-приложение запускается через `bootstrapApplication()`:

```ts
import {bootstrapApplication} from '@angular/platform-browser';

import {AppComponent} from './app/app.component';
import {appConfig} from './app/app.config';

bootstrapApplication(AppComponent, appConfig).catch(reportError);
```

```ts
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(withInterceptors([authInterceptor]))],
};
```

Angular создает root `EnvironmentInjector`, регистрирует providers, создает корневой компонент и запускает первый
render.

NgModule-bootstrap через `platformBrowserDynamic().bootstrapModule(AppModule)` остается поддерживаемым для
legacy-приложений, но не является подходом по умолчанию для нового Angular 19–22 кода.





#### Вопрос: Что происходит после загрузки Angular bundle?

**Короткий ответ**

Браузер загружает, парсит и выполняет JavaScript bundle. Entry point вызывает bootstrapApplication() или legacy
bootstrapModule(), после чего Angular создает root injector (EnvironmentInjector), регистрирует root providers,
инициализирует platform services и создает root component.

**Полный ответ**

Браузер загружает, парсит и выполняет JavaScript bundle. Entry point вызывает `bootstrapApplication()` или legacy
`bootstrapModule()`, после чего Angular создает root injector (`EnvironmentInjector`), регистрирует root providers,
инициализирует platform services и создает root component.

Дальше запускается initial rendering: Angular строит component tree, выполняет bindings, создает DOM nodes и подключает
event listeners. Если подключен Router, стартовая навигация выбирает route, может загрузить lazy bundle, выполнить
guards/resolvers и отрендерить routed component.

При SSR/SSG пользователь может увидеть HTML до client bundle. После загрузки bundle Angular выполняет hydration:
связывает существующий DOM с component tree, providers и обработчиками событий. Large bundle, тяжелые initializers,
blocking guards или hydration mismatch задерживают интерактивность.





#### Вопрос: Как происходит взаимодействие компонентов в Angular (опишите components view)?

**Короткий ответ**

Основные способы взаимодействия:

**Полный ответ**

Основные способы взаимодействия:

1. **Родитель передает данные ребенку** через `input()`.
2. **Ребенок сообщает о событии** через `output()`.
3. **Двусторонний контракт** компонента объявляется через `model()`.
4. **Доступ к дочернему view** выполняется через signal queries: `viewChild()`, `viewChildren()`.
5. **Несвязанные компоненты** взаимодействуют через feature-сервис состояния, Router или общий store.

```ts
@Component({
  selector: 'app-parent',
  template: `
    <app-counter
      [count]="count()"
      (increment)="count.set($event)"
    />
  `,
})
export class ParentComponent {
  readonly count = signal(0);
}

@Component({
  selector: 'app-counter',
  template: `
    <button
      type="button"
      (click)="increment.emit(count() + 1)"
    >
      +1
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent {
  readonly count = input.required<number>();
  readonly increment = output<number>();
}
```

Для двухсторонней привязки:

```ts
export class QuantityComponent {
  readonly value = model(0);
}
```

```html
<app-quantity [(value)]="quantity" />
```

Для общего синхронного состояния сервис может инкапсулировать writable signal и наружу отдавать readonly signal. RxJS
используют для асинхронных потоков и сложной координации.

`@Input`, `@Output`, `EventEmitter` и decorator queries поддерживаются, но functional signal APIs предпочтительны для
нового кода.





#### Вопрос: Что такое Data Binding и какие проблемы связанные с ним вы знаете?

**Короткий ответ**

Data Binding связывает template expression со свойством, атрибутом, классом, стилем или событием.

**Полный ответ**

Data Binding связывает template expression со свойством, атрибутом, классом, стилем или событием.

```html
<h2>{{ user().name }}</h2>
<button
  [disabled]="saving()"
  (click)="save()"
>
  Сохранить
</button>
<div
  [attr.aria-label]="label()"
  [class.active]="active()"
></div>
```

Для component inputs и outputs используется тот же синтаксис:

```html
<app-editor
  [document]="document()"
  (saved)="handleSaved($event)"
/>
```

Двусторонняя привязка раскрывается в input + output `<name>Change`. В современном компоненте контракт удобно объявлять
через `model()`:

```ts
readonly value = model("");
```

```html
<app-editor [(value)]="draft" />
```

Типичные проблемы: тяжелые вычисления в шаблоне, вызовы методов с side effects, мутация объектов с OnPush, неявный
сложный two-way data flow и неправильное различение property binding и attribute binding.





#### Вопрос: Как вы используете одностороннюю и двухстороннюю привязку данных?

**Короткий ответ**

Односторонняя привязка имеет явное направление:

**Полный ответ**

Односторонняя привязка имеет явное направление:

```html
<h2>{{ title }}</h2>
<button
  [disabled]="isSaving"
  (click)="save()"
>
  Сохранить
</button>
```

- `{{ value }}` и `[property]="value"` передают данные из компонента в представление.
- `(event)="handler($event)"` передает событие из представления в компонент.

Двусторонняя привязка объединяет property и event binding:

```html
<input [(ngModel)]="name" />
```

Для компонентов предпочтителен model input:

```ts
readonly value = model("");
```

`model()` автоматически создает input `value` и output `valueChange`. Two-way binding удобен для локального состояния
элемента управления, но при сложном data flow явные `input()`/`output()` или форма обычно легче для отладки.





#### Вопрос: Что такое output(), EventEmitter и как подписываться на события?

**Короткий ответ**

Для нового компонента custom event объявляют через output():

**Полный ответ**

Для нового компонента custom event объявляют через `output()`:

```ts
export class SaveButtonComponent {
  readonly saved = output<SaveResult>();

  save(): void {
    this.saved.emit({status: 'success'});
  }
}
```

```html
<app-save-button (saved)="handleSaved($event)" />
```

`output()` возвращает `OutputEmitterRef`. На output динамического компонента можно подписаться программно:

```ts
const subscription = componentRef.instance.saved.subscribe(handleSaved);
subscription.unsubscribe();
```

Angular автоматически очищает подписки при уничтожении компонента. Outputs не всплывают по DOM.

`@Output() readonly saved = new EventEmitter<SaveResult>()` остается поддерживаемым legacy API. `EventEmitter` не
следует использовать как event bus в сервисах; для сервисов подходят signals или RxJS.





#### Вопрос: Каков жизненный цикл у компонентов?

**Короткий ответ**

Angular 19–22 поддерживает классические lifecycle hooks и render callbacks.

**Полный ответ**

Angular 19–22 поддерживает классические lifecycle hooks и render callbacks.

Классические hooks:

- ngOnChanges() - вызывается когда Angular переприсваивает привязанные данные к input properties. Метод получает объект
  SimpleChanges, со старыми и новыми значениями. Вызывается перед NgOnInit и каждый раз, когда изменяется одно или
  несколько связанных свойств.
- ngOnInit() - инициализирует директиву/компонент после того, как Angular впервые отобразит связанные свойства и
  устанавливает входящие параметры.
- ngDoCheck() - при обнаружении изменений, которые Angular не может самостоятельно обнаружить, реагирует на них.
- ngAfterContentInit() - вызывается после того, как Angular спроецирует внешний контент в отображение компонента или
  отображение с директивой. Вызывается единожды, после первого ngDoCheck().
- ngAfterContentChecked() - реагирует на проверку Angular-ом проецируемого содержимого. Вызывается после
  ngAfterContentInit() и каждый последующий ngDoCheck().
- ngAfterViewInit() - вызывается после инициализации отображения компонента и дочерних/директив. Вызывается единожды,
  после первого ngAfterContentChecked().
- ngAfterViewChecked() - реагирует на проверку отображения компонента и дочерних/директив. Вызывается после
  ngAfterViewInit() и каждый последующий ngAfterContentChecked().
- ngOnDestroy() - после уничтожения директивы/компонента выполняется очистка. Отписывает Observables и отключает
  обработчики событий, чтобы избежать утечек памяти.

Современные render callbacks:

- `afterNextRender()` выполняется после следующего завершенного render.
- `afterEveryRender()` выполняется после каждого render.
- `afterRenderEffect()` связывает DOM side effect с signals.

Для cleanup удобно использовать `DestroyRef` и `takeUntilDestroyed()`:

```ts
export class SearchComponent {
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.search.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((query) => this.load(query));
  }
}
```

При signal inputs многие реакции выражаются через `computed()` или `effect()`, но `ngOnChanges` остается полезен, если
нужны одновременно previous и current values.





#### Вопрос: В каком порядке вызываются lifecycle hooks?

**Короткий ответ**

При первом render порядок обычно такой: ngOnChanges, ngOnInit, ngDoCheck, ngAfterContentInit, ngAfterContentChecked,
ngAfterViewInit, ngAfterViewChecked. При последующих проверках вызываются check hooks, а при уничтожении - ngOnDestroy.

**Полный ответ**

При первом render порядок обычно такой: `ngOnChanges`, `ngOnInit`, `ngDoCheck`, `ngAfterContentInit`,
`ngAfterContentChecked`, `ngAfterViewInit`, `ngAfterViewChecked`. При последующих проверках вызываются check hooks, а
при уничтожении - `ngOnDestroy`.

Render callbacks вроде `afterNextRender()` выполняются после завершенного render и удобны для DOM-зависимой логики.





#### Вопрос: Для чего нужен ngOnChanges?

**Короткий ответ**

ngOnChanges вызывается, когда Angular устанавливает или изменяет decorator inputs, и передает SimpleChanges с
previous/current values.

**Полный ответ**

`ngOnChanges` вызывается, когда Angular устанавливает или изменяет decorator inputs, и передает `SimpleChanges` с
previous/current values.

Он полезен, когда реакция зависит от сравнения старого и нового значения. В signal input коде часто хватает `computed()`
или `effect()`, если previous value не нужен.





#### Вопрос: Чем view lifecycle отличается от content lifecycle?

**Короткий ответ**

Content lifecycle относится к projected content, который родитель передал внутрь компонента. View lifecycle относится к
собственному шаблону компонента и его view children.

**Полный ответ**

Content lifecycle относится к projected content, который родитель передал внутрь компонента. View lifecycle относится к
собственному шаблону компонента и его view children.

Поэтому `ContentChild` становится доступен раньше в content hooks, а `ViewChild` - в view hooks.





#### Вопрос: Когда использовать ngAfterContentInit?

**Короткий ответ**

ngAfterContentInit вызывается после инициализации контента, спроецированного через . Он подходит для работы с
contentChild() и contentChildren().

**Полный ответ**

`ngAfterContentInit` вызывается после инициализации контента, спроецированного через `<ng-content>`. Он подходит для
работы с `contentChild()` и `contentChildren()`.

Если нужен элемент из собственного шаблона компонента, это view lifecycle, а не content lifecycle.





#### Вопрос: Когда использовать ngAfterViewInit?

**Короткий ответ**

ngAfterViewInit вызывается после создания view компонента и его view children. Его используют для логики, которой нужны
view queries, DOM-элементы или child components.

**Полный ответ**

`ngAfterViewInit` вызывается после создания view компонента и его view children. Его используют для логики, которой
нужны view queries, DOM-элементы или child components.

Менять уже проверенное состояние прямо в этом hook опасно: можно получить ошибку проверки. Часто лучше использовать
`afterNextRender()`.





#### Вопрос: Как lifecycle связан с subscriptions, effects и cleanup?

**Короткий ответ**

Все, что живет дольше одного synchronous render, должно иметь понятный lifetime: подписки, DOM listeners, timers,
WebSocket, observer APIs и effects.

**Полный ответ**

Все, что живет дольше одного synchronous render, должно иметь понятный lifetime: подписки, DOM listeners, timers,
WebSocket, observer APIs и effects.

В Angular для cleanup используют:

- `ngOnDestroy`, если класс явно реализует lifecycle hook;
- `DestroyRef.onDestroy()`, если cleanup удобнее зарегистрировать рядом с setup;
- `takeUntilDestroyed()` для imperative RxJS subscriptions;
- cleanup-функцию внутри `effect()`, если effect создает внешний ресурс.

```ts
export class LiveSearchComponent {
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => this.search(value));

    const intervalId = window.setInterval(() => this.tick(), 1000);

    this.destroyRef.onDestroy(() => window.clearInterval(intervalId));
  }
}
```

`AsyncPipe`, `toSignal()` и finite `HttpClient` requests обычно управляют подпиской сами. Ручная подписка нужна, когда
есть imperative side effect или интеграция с внешним API.





#### Вопрос: Что такое ngZone?

**Короткий ответ**

NgZone — сервис интеграции Angular с ZoneJS. В zone-based приложении ZoneJS патчит асинхронные browser APIs и помогает
Angular определить момент, когда может потребоваться синхронизация представления.

**Полный ответ**

`NgZone` — сервис интеграции Angular с ZoneJS. В zone-based приложении ZoneJS патчит асинхронные browser APIs и помогает
Angular определить момент, когда может потребоваться синхронизация представления.

Важно для Angular 19–22:

- Angular 19 обычно использует ZoneJS, если приложение не настроено иначе.
- В Angular 20 zoneless включается через `provideZonelessChangeDetection()`.
- Начиная с Angular 21 zoneless является режимом по умолчанию.

В zoneless-приложении Angular получает точные уведомления от signals, template/host listeners, `AsyncPipe`,
`markForCheck()` и установки inputs.

`runOutsideAngular()` полезен в zone-based приложениях для частых событий сторонней библиотеки. В новом коде
предпочтительны точные реактивные уведомления, а не ручной глобальный `tick()`.





#### Вопрос: Как обновлять представление, если ваша модель данных обновляется вне 'зоны'?

**Короткий ответ**

В современном Angular предпочтительно записать новое значение в signal. Это работает и в zoneless-приложении:

**Полный ответ**

В современном Angular предпочтительно записать новое значение в signal. Это работает и в zoneless-приложении:

```ts
export class ClockComponent {
  readonly time = signal(new Date());

  constructor() {
    setInterval(() => this.time.set(new Date()), 1000);
  }
}
```

Если сторонний callback изменяет обычное поле, можно вызвать `ChangeDetectorRef.markForCheck()`. `detectChanges()`
применяют для локальной немедленной проверки в специальных интеграционных сценариях.

`ApplicationRef.tick()` проверяет все приложение и почти никогда не должен быть обычным решением. `NgZone.run()`
актуален только для zone-based интеграций.

Ниже приведены legacy-варианты ручного запуска change detection.

1. Используя метод `ApplicationRef.prototype.tick`, который запустит `change detection` на всем дереве компонентов.

```ts
import {Component, ApplicationRef, NgZone} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Hello, {{ name }}!</h1>
  `,
})
export class AppComponent {
  public name: string = null;

  constructor(
    private app: ApplicationRef,
    private zone: NgZone,
  ) {
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        this.name = window.prompt('What is your name?', 'Jake');
        this.app.tick();
      }, 5000);
    });
  }
}
```

2. Используя метод `NgZone.prototype.run`, который также запустит `change detection` на всем дереве.

```ts
import {Component, NgZone} from '@angular/core';
import {SomeService} from './some.service';

@Component({
  selector: 'app-root',
  template: `
    <h1>Hello, {{ name }}!</h1>
  `,
  providers: [SomeService],
})
export class AppComponent {
  public name: string = null;

  constructor(
    private zone: NgZone,
    private service: SomeService,
  ) {
    this.zone.runOutsideAngular(() => {
      this.service.getName().then((name: string) => {
        this.zone.run(() => (this.name = name));
      });
    });
  }
}
```

Метод `run` под капотом сам вызывает `tick`, а параметром принимает функцию, которую нужно выполнить перед `tick`. То
есть:

```ts
this.zone.run(() => (this.name = name));

// идентично

this.name = name;
this.app.tick();
```

3. Используя метод `ChangeDetectorRef.prototype.detectChanges`, который запустит `change detection` на текущем
   компоненте и дочерних.

```ts
import {Component, NgZone, ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Hello, {{ name }}!</h1>
  `,
})
export class AppComponent {
  public name: string = null;

  constructor(
    private zone: NgZone,
    private ref: ChangeDetectorRef,
  ) {
    this.zone.runOutsideAngular(() => {
      this.name = window.prompt('What is your name?', 'Jake');
      this.ref.detectChanges();
    });
  }
}
```





#### Вопрос: Что такое Shadow DOM и как с ним работать в Angular?

**Короткий ответ**

Shadow DOM — браузерный механизм инкапсуляции DOM-поддерева и стилей web component. Внешние стили по умолчанию не
проникают внутрь shadow tree, а внутренние не влияют на остальную страницу.

**Полный ответ**

Shadow DOM — браузерный механизм инкапсуляции DOM-поддерева и стилей web component. Внешние стили по умолчанию не
проникают внутрь shadow tree, а внутренние не влияют на остальную страницу.

Angular поддерживает режимы `ViewEncapsulation`:

- `Emulated` — режим по умолчанию: Angular эмулирует изоляцию CSS с помощью служебных атрибутов.
- `ShadowDom` — создает настоящий shadow root средствами браузера.
- `None` — стили компонента становятся глобальными.

```ts
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrl: './player.component.css',
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class PlayerComponent {}
```

При `ShadowDom` нужно учитывать наследуемые CSS-свойства, CSS custom properties, slots/content projection, тестирование
и интеграцию с глобальной дизайн-системой. `::ng-deep` устарел и не должен быть основным способом стилизации.





#### Вопрос: В чем преимущества и недостатки Regular DOM (Angular) перед Virtual DOM (React)?

**Короткий ответ**

Формулировка упрощает реальность: и Angular, и React в итоге обновляют настоящий DOM, но используют разные модели
определения изменений.

**Полный ответ**

Формулировка упрощает реальность: и Angular, и React в итоге обновляют настоящий DOM, но используют разные модели
определения изменений.

Angular компилирует шаблон в точные инструкции создания и обновления узлов. Ему не обязательно каждый раз строить новое
виртуальное дерево и сравнивать его целиком. React обычно создает новое представление Virtual DOM и выполняет
reconciliation.

Преимущества подхода Angular:

- компилятор заранее знает, какие bindings нужно обновлять;
- предсказуемая структура шаблонов;
- хорошая интеграция change detection, signals и DI.

Возможные недостатки:

- лишние проверки при неудачно спроектированном change detection;
- сложнее интеграция ручных DOM-изменений;
- производительность сильно зависит от структуры компонентов, `track`, неизменяемых обновлений и границ реактивности.

Нельзя утверждать, что один подход всегда быстрее. Нужно измерять конкретный сценарий: большие списки, частые события,
startup, memory и стоимость обновления.



### Angular component styling



#### Вопрос: Что такое ViewEncapsulation?

**Короткий ответ**

ViewEncapsulation управляет областью действия component styles: Emulated эмулирует изоляцию атрибутами, ShadowDom
использует настоящий shadow root, None делает стили глобальными.

**Полный ответ**

`ViewEncapsulation` управляет областью действия component styles: `Emulated` эмулирует изоляцию атрибутами, `ShadowDom`
использует настоящий shadow root, `None` делает стили глобальными.

Режим выбирают по требованиям дизайн-системы, SSR, theming и интеграции со сторонними стилями.





#### Вопрос: Для чего нужен :host в стилях компонента?

**Короткий ответ**

:host выбирает host-элемент текущего компонента. Это удобно для layout, display, CSS custom properties и состояний,
которые принадлежат самому компоненту.

**Полный ответ**

`:host` выбирает host-элемент текущего компонента. Это удобно для layout, display, CSS custom properties и состояний,
которые принадлежат самому компоненту.

```css
:host {
  display: block;
}

:host(.compact) {
  --card-gap: 8px;
}
```





#### Вопрос: Для чего нужен :host-context?

**Короткий ответ**

:host-context(.theme-dark) применяет стиль компонента, если один из предков host-элемента соответствует selector. Его
используют для theme flags и интеграции с внешним layout context.

**Полный ответ**

`:host-context(.theme-dark)` применяет стиль компонента, если один из предков host-элемента соответствует selector. Его
используют для theme flags и интеграции с внешним layout context.

Не стоит строить на нем сложную зависимость от DOM-иерархии: темы обычно надежнее передавать через CSS custom properties
или явные classes.





#### Вопрос: Как стилизовать projected content?

**Короткий ответ**

Projected content принадлежит родительскому view, поэтому стили дочернего компонента с encapsulation не всегда
применяются к внутренним элементам projection.

**Полный ответ**

Projected content принадлежит родительскому view, поэтому стили дочернего компонента с encapsulation не всегда
применяются к внутренним элементам projection.

Надежные варианты: стилизовать wrapper вокруг `<ng-content>`, договориться о public classes/parts, передать CSS custom
properties или дать родителю управлять разметкой и стилями projected content.





#### Вопрос: Почему ::ng-deep считают legacy escape hatch?

**Короткий ответ**

::ng-deep пробивает style encapsulation и влияет на вложенные компоненты. Это legacy escape hatch для сложных
интеграций, а не основной инструмент дизайна.

**Полный ответ**

`::ng-deep` пробивает style encapsulation и влияет на вложенные компоненты. Это legacy escape hatch для сложных
интеграций, а не основной инструмент дизайна.

Предпочтительнее public theming API, CSS variables, component inputs/classes, global styles для настоящих global rules
или настройка дизайн-системы.
