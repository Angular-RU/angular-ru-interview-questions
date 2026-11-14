# Angular — вопросы и ответы, часть 9

> Автоматически сгенерировано из src/pages/angular/index.md. Не редактируйте вручную.

### Практика по Angular frontend tasks



#### Вопрос: Практическая задача: перенесите autocomplete в Angular.

**Короткий ответ**

Что проверяет: typed forms, RxJS cancellation, состояния загрузки, accessibility.

**Полный ответ**

**Что проверяет:** typed forms, RxJS cancellation, состояния загрузки, accessibility.

В Angular autocomplete обычно раскладывают на typed form/control state, поток поиска, отмену запросов и доступный UI.
Для async query хорошо подходят RxJS operators: `debounceTime`, `distinctUntilChanged`, `switchMap`, `catchError`.
`switchMap` отменяет подписку на предыдущий request, а `HttpClient` умеет отменять underlying request при unsubscribe.

```ts
readonly query = new FormControl('', {nonNullable: true});

readonly items$ = this.query.valueChanges.pipe(
  debounceTime(250),
  distinctUntilChanged(),
  switchMap((query) =>
    this.searchApi.search(query).pipe(
      catchError(() => of([])),
    ),
  ),
);
```

Компонент должен явно иметь состояния `idle`, `loading`, `success`, `empty`, `error`, поддерживать keyboard navigation и
не смешивать API DTO с view model. Для accessibility можно использовать CDK a11y primitives или готовый UI-kit с
combobox/listbox contract.





#### Вопрос: Практическая задача: упростите RxJS-chain, который только переключает boolean.

**Короткий ответ**

Что проверяет: умение не использовать RxJS по привычке.

**Полный ответ**

**Что проверяет:** умение не использовать RxJS по привычке.

Условие: в компоненте есть 30 строк RxJS, которые по click меняют `expanded` с `true` на `false` и обратно.

Лучшее решение почти всегда проще:

```ts
readonly expanded = signal(false);

toggle(): void {
  this.expanded.update((value) => !value);
}
```

RxJS стоит оставить, если click участвует во времени: debounce, throttle, async request, cancellation, retry, WebSocket
или coordination с другими streams. Если это обычное synchronous UI state, signal или простое поле читаются лучше.





#### Вопрос: Практическая задача: выберите RxJS operators для поиска и сохранения формы.

**Короткий ответ**

Что проверяет: выбор switchMap, concatMap, mergeMap, exhaustMap по бизнес-смыслу.

**Полный ответ**

**Что проверяет:** выбор `switchMap`, `concatMap`, `mergeMap`, `exhaustMap` по бизнес-смыслу.

Условие: на странице есть autocomplete search и кнопка Save. Пользователь быстро печатает и может несколько раз нажать
Save.

Ожидаемое рассуждение:

- search: `debounceTime`, `distinctUntilChanged`, `switchMap`, потому что старые запросы больше не нужны;
- save с очередью: `concatMap`, если каждое сохранение должно дойти до backend по порядку;
- save без дублей: `exhaustMap`, если повторный click во время in-flight запроса нужно игнорировать;
- `mergeMap` подходит для независимых операций, но может создать гонки и дубли при save.

Сильный ответ называет failure mode: stale search result, отмененный write, двойная отправка или перегрузка backend.





#### Вопрос: Практическая задача: спроектируйте компонент для показа ошибок формы.

**Короткий ответ**

Что проверяет: forms, reusable UI, accessibility, presentational component boundaries.

**Полный ответ**

**Что проверяет:** forms, reusable UI, accessibility, presentational component boundaries.

Компонент не должен сам искать произвольную форму в DOM и знать backend DTO. Лучше передать ему готовую view model
ошибок или typed control, если это локальный form-field component.

Минимальные требования:

- показывать ошибки только после `touched`, submit attempt или явного внешнего флага;
- иметь стабильные `id` для связи input и error через `aria-describedby`;
- поддерживать server errors отдельно от sync validators;
- не дублировать business validation, если она уже выражена в form schema;
- оставаться presentational, а orchestration submit/loading/error держать выше.

Такой вопрос хорошо показывает, умеет ли кандидат проектировать маленький компонент как часть большого Angular flow.





#### Вопрос: Практическая задача: смоделируйте detail panel с выбором элемента и локальным редактированием.

**Короткий ответ**

Что проверяет: linkedSignal(), resource()/httpResource(), draft state.

**Полный ответ**

**Что проверяет:** `linkedSignal()`, `resource()`/`httpResource()`, draft state.

Условие: пользователь выбирает элемент в списке. Справа открывается detail panel. Данные подгружаются с API, но до Save
пользователь редактирует локальный draft.

Подход:

- selected id хранить как signal;
- details грузить через `resource()`/`httpResource()` или RxJS, если нужны операторы;
- draft сделать writable state, связанный с выбранным item;
- при смене selected id сбрасывать draft на данные нового item;
- save явно отправляет draft, а не мутирует server data при каждом keypress.

`computed()` не подходит для draft, если пользователь должен менять значение вручную: computed readonly и должен
оставаться чистой производной.





#### Вопрос: Практическая задача: исправьте stale view в OnPush-компоненте.

**Короткий ответ**

Что проверяет: reference identity, immutable updates, OnPush и signals.

**Полный ответ**

**Что проверяет:** reference identity, immutable updates, OnPush и signals.

Условие: parent мутирует объект пользователя in place, child с OnPush не обновляет имя.

Плохой вариант:

```ts
this.user.name = nextName;
```

Лучше создать новую ссылку:

```ts
this.user = {...this.user, name: nextName};
```

Если состояние хранится в signal:

```ts
this.user.update((user) => ({...user, name: nextName}));
```

`ChangeDetectorRef.detectChanges()` не должен быть первым решением. Он может замаскировать нарушение ownership и
immutable update contract.





#### Вопрос: Практическая задача: найдите утечки в долгоживущем dashboard.

**Короткий ответ**

Что проверяет: lifecycle, takeUntilDestroyed(), WebSocket/polling cleanup, partial failure handling.

**Полный ответ**

**Что проверяет:** lifecycle, `takeUntilDestroyed()`, WebSocket/polling cleanup, partial failure handling.

Условие: dashboard живет всю пользовательскую сессию. Внутри есть три WebSocket stream, два polling interval и ручные
subscriptions в обработчиках. Через 20 минут вкладка начинает потреблять слишком много памяти.

Хорошее решение:

- найти все manual `subscribe()`, `setInterval`, DOM listeners и сторонние callbacks;
- перевести template-facing streams на `async` pipe или signal boundary;
- для ручных subscriptions использовать `takeUntilDestroyed()` рядом с местом подписки;
- закрывать WebSocket/service resources при logout, а не только при destroy компонента;
- проверить heap snapshots и Angular DevTools Profiler после фикса.

Отдельно стоит обработать ошибки каждого stream локально. Один упавший источник не должен превращать весь dashboard в
пустой экран.





#### Вопрос: Практическая задача: решите, где использовать lazy route, а где @defer.

**Короткий ответ**

Что проверяет: bundle splitting, startup path, waterfall loading.

**Полный ответ**

**Что проверяет:** bundle splitting, startup path, waterfall loading.

Условие: на странице заказа есть основной checkout, тяжелый график аналитики ниже fold и route `/admin`, доступный
только сотрудникам.

Решение:

- `/admin` вынести в lazy route, потому что это отдельная feature boundary;
- график внутри checkout отложить через `@defer`, например по viewport или interaction;
- заранее продумать placeholder/loading state с устойчивой высотой, чтобы не получить layout shift;
- измерить, не создает ли дробление waterfall на слабой сети;
- для SSR/hydration проверить, что deferred block не ломает first paint и interactivity.

Lazy loading не равно performance автоматически. Оно помогает, когда отложенный код не нужен на критическом пути.





#### Вопрос: Практическая задача: оптимизируйте таблицу на 10 000 строк.

**Короткий ответ**

Что проверяет: profiling, rendering cost, track, virtual scroll, template hot paths.

**Полный ответ**

**Что проверяет:** profiling, rendering cost, `track`, virtual scroll, template hot paths.

План:

1. Сначала измерить: Angular DevTools Profiler, Chrome Performance, production build.
2. Проверить стабильные keys: `@for (row of rows(); track row.id)`.
3. Убрать тяжелые template methods и impure pipes.
4. Вынести derived data в `computed()` или подготовленную view model.
5. Для больших однотипных списков использовать CDK virtual scroll.
6. Проверить, не пересоздаются ли массивы/handlers на каждый render без необходимости.

Важно не начинать с микротюнинга. Если bottleneck в API, сортировке на клиенте или layout thrashing, один `track` не
спасет интерфейс.





#### Вопрос: Практическая задача: подготовьте feature к zoneless Angular.

**Короткий ответ**

Что проверяет: понимание Zone.js-era кода, signals, third-party integrations.

**Полный ответ**

**Что проверяет:** понимание Zone.js-era кода, signals, third-party integrations.

План проверки:

- найти места, где UI обновляется через обычные поля из сторонних callbacks;
- заменить локальное состояние на signals или явно вызвать `markForCheck()` на интеграционной границе;
- пересмотреть `NgZone.runOutsideAngular()` и ручные `detectChanges()`;
- проверить third-party libraries, которые рассчитывают на Zone.js;
- покрыть сценарии async UI тестами, где ожидание идет через stable state, а не через случайные sleeps.

В zoneless режиме обновления должны приходить из понятных источников: signals, template events, `AsyncPipe`, explicit
change detection boundaries.





#### Вопрос: Практическая задача: разделите Angular-приложение между двумя командами.

**Короткий ответ**

Что проверяет: feature boundaries, lazy routes, public API, ownership.

**Полный ответ**

**Что проверяет:** feature boundaries, lazy routes, public API, ownership.

Условие: приложение выросло, две команды постоянно конфликтуют в одних service и shared folders.

Хороший план:

- выделить domain/feature routes и lazy-loaded boundaries;
- определить owners для feature folders;
- оставить shared layer маленьким и dependency-light;
- запретить feature-to-feature imports без публичного contract;
- вынести reusable UI в library/design system, а product-specific logic оставить в feature;
- договориться о правилах state ownership, DTO mapping и public API.

Цель не в количестве папок, а в том, чтобы команды могли менять свою область без случайной связности с соседней.
