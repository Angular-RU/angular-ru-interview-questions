# Angular — вопросы и ответы, часть 8

> Автоматически сгенерировано из src/pages/angular/index.md. Не редактируйте вручную.

### Loading, error states и fallback



#### Вопрос: Чем required remote отличается от optional remote?

**Короткий ответ**

Без required remote основной сценарий не имеет смысла, поэтому host может показать page-level error. Optional remote
дополняет сценарий: при сбое его slot скрывают или заменяют fallback, сохраняя остальную страницу.

**Полный ответ**

Без required remote основной сценарий не имеет смысла, поэтому host может показать page-level error. Optional remote
дополняет сценарий: при сбое его slot скрывают или заменяют fallback, сохраняя остальную страницу.





#### Вопрос: Что произойдет, если один remote недоступен?

**Короткий ответ**

Его entry или chunks не загрузятся, и операция вернет ошибку. Host должен локализовать сбой в соответствующем slot,
показать fallback и не блокировать независимые части страницы.

**Полный ответ**

Его entry или chunks не загрузятся, и операция вернет ошибку. Host должен локализовать сбой в соответствующем slot,
показать fallback и не блокировать независимые части страницы.





#### Вопрос: Почему Promise.all() может быть опасен при загрузке нескольких независимых remote?

**Короткий ответ**

Он отклоняется после первой ошибки и не возвращает успешные результаты остальных promises. Если виджеты независимы,
общая операция может ошибочно превратить частичный сбой в отказ всей композиции.

**Полный ответ**

Он отклоняется после первой ошибки и не возвращает успешные результаты остальных promises. Если виджеты независимы,
общая операция может ошибочно превратить частичный сбой в отказ всей композиции.





#### Вопрос: Когда лучше использовать Promise.allSettled()?

**Короткий ответ**

Когда каждый remote имеет собственный loading/error state и успешные виджеты должны продолжить работу. Результаты
fulfilled и rejected обрабатывают по отдельности.

**Полный ответ**

Когда каждый remote имеет собственный loading/error state и успешные виджеты должны продолжить работу. Результаты
`fulfilled` и `rejected` обрабатывают по отдельности.





#### Вопрос: Почему у каждого remote widget должен быть свой status: idle, loading, ready, error?

**Короткий ответ**

Явная state machine исключает неоднозначные комбинации boolean flags и упрощает template control flow. Она также
позволяет отдельно измерять время загрузки, ошибки и повторные попытки каждого remote.

**Полный ответ**

Явная state machine исключает неоднозначные комбинации boolean flags и упрощает template control flow. Она также
позволяет отдельно измерять время загрузки, ошибки и повторные попытки каждого remote.





#### Вопрос: Как host должен показывать loading/error state для каждого remote slot?

**Короткий ответ**

Каждый slot имеет стабильный контейнер, собственный индикатор загрузки, доступное сообщение об ошибке и при
необходимости retry. Ошибка одного slot не должна визуально маскировать состояние другого.

**Полный ответ**

Каждый slot имеет стабильный контейнер, собственный индикатор загрузки, доступное сообщение об ошибке и при
необходимости retry. Ошибка одного slot не должна визуально маскировать состояние другого.





#### Вопрос: Что должен делать host, если movies загрузился, а ticket-availability нет?

**Короткий ответ**

Показать список фильмов и fallback в slot доступности. Выбор фильма можно сохранить, но действие, зависящее от второго
remote, нужно отключить или объяснить пользователю.

**Полный ответ**

Показать список фильмов и fallback в slot доступности. Выбор фильма можно сохранить, но действие, зависящее от второго
remote, нужно отключить или объяснить пользователю.





#### Вопрос: Что должен делать host, если ticket-availability загрузился, а movies нет?

**Короткий ответ**

Показать fallback списка фильмов. Виджет доступности может остаться в empty state, если без выбранного фильма он не
имеет самостоятельного сценария.

**Полный ответ**

Показать fallback списка фильмов. Виджет доступности может остаться в empty state, если без выбранного фильма он не
имеет самостоятельного сценария.





#### Вопрос: Как добавить retry для недоступного remote?

**Короткий ответ**

Host повторно переводит конкретный slot в loading и запускает его mount после действия пользователя или ограниченного
backoff. Перед retry нужно очистить прежний ComponentRef, error и незавершенные subscriptions.

**Полный ответ**

Host повторно переводит конкретный slot в `loading` и запускает его mount после действия пользователя или ограниченного
backoff. Перед retry нужно очистить прежний `ComponentRef`, error и незавершенные subscriptions.





#### Вопрос: Где лучше хранить статусы remote-виджетов: в компоненте, сервисе или store?

**Короткий ответ**

Локальный slot state удобно хранить в host component или scoped loader service. Общий store нужен только если статус
используют удаленные части приложения, аналитика или централизованная recovery-логика.

**Полный ответ**

Локальный slot state удобно хранить в host component или scoped loader service. Общий store нужен только если статус
используют удаленные части приложения, аналитика или централизованная recovery-логика.





#### Вопрос: Почему сервис загрузки remote не должен знать бизнес-логику приложения?

**Короткий ответ**

Loader отвечает за разрешение модуля, создание компонента и технический lifecycle. Решения о фильмах, бронировании и
доступности принадлежат host orchestration или domain services, иначе loader нельзя переиспользовать.

**Полный ответ**

Loader отвечает за разрешение модуля, создание компонента и технический lifecycle. Решения о фильмах, бронировании и
доступности принадлежат host orchestration или domain services, иначе loader нельзя переиспользовать.



### SSR и hydration



#### Вопрос: Могут ли remote-приложения быть SSR?

**Короткий ответ**

Да, но server renderer должен уметь разрешить remote, загрузить совместимый server bundle и согласовать HTML с
последующей hydration. Это заметно сложнее browser-only композиции.

**Полный ответ**

Да, но server renderer должен уметь разрешить remote, загрузить совместимый server bundle и согласовать HTML с
последующей hydration. Это заметно сложнее browser-only композиции.





#### Вопрос: Какие дополнительные сложности появляются при SSR и micro frontends?

**Короткий ответ**

Нужно согласовать server и browser entries, сетевую доступность remote с сервера, shared dependencies, latency,
кеширование, ошибки частичного render и детерминированный HTML для hydration.

**Полный ответ**

Нужно согласовать server и browser entries, сетевую доступность remote с сервера, shared dependencies, latency,
кеширование, ошибки частичного render и детерминированный HTML для hydration.





#### Вопрос: Чем main.ts отличается от main.server.ts?

**Короткий ответ**

Browser entry инициализирует приложение в DOM и может настраивать client federation. Server entry экспортирует bootstrap
для renderer, принимает BootstrapContext и не должен выполнять browser-only код.

**Полный ответ**

Browser entry инициализирует приложение в DOM и может настраивать client federation. Server entry экспортирует bootstrap
для renderer, принимает `BootstrapContext` и не должен выполнять browser-only код.





#### Вопрос: Что такое BootstrapContext в server bootstrap?

**Короткий ответ**

BootstrapContext передает Angular server bootstrap контекст конкретного запроса, включая platform injector. Он нужен для
корректной изоляции и настройки server-rendered приложения.

**Полный ответ**

`BootstrapContext` передает Angular server bootstrap контекст конкретного запроса, включая platform injector. Он нужен
для корректной изоляции и настройки server-rendered приложения.





#### Вопрос: Почему bootstrapApplication на сервере требует BootstrapContext?

**Короткий ответ**

Server renderer создает контекст для запроса и ожидает, что bootstrap использует его. Без контекста приложение может
создать неподходящую platform instance или потерять request-scoped providers.

**Полный ответ**

Server renderer создает контекст для запроса и ожидает, что bootstrap использует его. Без контекста приложение может
создать неподходящую platform instance или потерять request-scoped providers.





#### Вопрос: Почему при SSR возникает ошибка window is not defined?

**Короткий ответ**

Server runtime не предоставляет browser global window. Ошибка возникает, если код обращается к нему при import, создании
компонента или server render до проверки платформы.

**Полный ответ**

Server runtime не предоставляет browser global `window`. Ошибка возникает, если код обращается к нему при import,
создании компонента или server render до проверки платформы.





#### Вопрос: Почему при SSR возникает ошибка document is not defined?

**Короткий ответ**

Node server не имеет browser DOM document. Прямой DOM-код и browser-only libraries нужно изолировать от server path или
запускать после перехода в browser render phase.

**Полный ответ**

Node server не имеет browser DOM `document`. Прямой DOM-код и browser-only libraries нужно изолировать от server path
или запускать после перехода в browser render phase.





#### Вопрос: Почему ngOnInit не всегда подходит для загрузки remote widgets?

**Короткий ответ**

ngOnInit выполняется и при SSR, а view containers могут быть еще не готовы. Browser-only remote лучше монтировать после
первого client render, когда доступны DOM и view queries.

**Полный ответ**

`ngOnInit` выполняется и при SSR, а view containers могут быть еще не готовы. Browser-only remote лучше монтировать
после первого client render, когда доступны DOM и view queries.





#### Вопрос: Когда использовать afterNextRender()?

**Короткий ответ**

Когда интеграция требует созданного DOM, browser APIs или доступного ViewContainerRef после следующего render. Render
callbacks не выполняются на сервере, поэтому подходят для browser-only монтирования.

**Полный ответ**

Когда интеграция требует созданного DOM, browser APIs или доступного `ViewContainerRef` после следующего render. Render
callbacks не выполняются на сервере, поэтому подходят для browser-only монтирования.





#### Вопрос: Почему remote widgets часто монтируют только на клиенте, даже если shell поддерживает SSR?

**Короткий ответ**

Так shell сохраняет SEO и быстрый initial HTML, а remote integration избегает server federation, browser globals и
hydration mismatch. Цена — placeholder до client mount и более поздняя готовность виджета.

**Полный ответ**

Так shell сохраняет SEO и быстрый initial HTML, а remote integration избегает server federation, browser globals и
hydration mismatch. Цена — placeholder до client mount и более поздняя готовность виджета.





#### Вопрос: Как сделать SSR-safe код в Angular?

**Короткий ответ**

Не обращаться к browser globals на уровне модуля, использовать platform-neutral APIs, изолировать browser services и
выполнять DOM-интеграции в render callbacks или после явной проверки платформы.

**Полный ответ**

Не обращаться к browser globals на уровне модуля, использовать platform-neutral APIs, изолировать browser services и
выполнять DOM-интеграции в render callbacks или после явной проверки платформы.





#### Вопрос: Почему manifest может открываться в браузере, но не загружаться во время SSR?

**Короткий ответ**

URL localhost с точки зрения server process, container или cloud runtime может указывать не туда, куда в браузере. Также
мешают DNS, CORS-подобные gateway rules, TLS, network policy и отсутствие запущенного remote.

**Полный ответ**

URL `localhost` с точки зрения server process, container или cloud runtime может указывать не туда, куда в браузере.
Также мешают DNS, CORS-подобные gateway rules, TLS, network policy и отсутствие запущенного remote.





#### Вопрос: Что такое hydration mismatch и как микрофронтенды могут его спровоцировать?

**Короткий ответ**

Mismatch возникает, когда client ожидает DOM, отличный от server HTML. Remote может изменить разметку до hydration,
отрендерить разные данные или создать browser-only элементы в server-rendered области.

**Полный ответ**

Mismatch возникает, когда client ожидает DOM, отличный от server HTML. Remote может изменить разметку до hydration,
отрендерить разные данные или создать browser-only элементы в server-rendered области.



### Deployment, versioning и rollback



#### Вопрос: Какие артефакты деплоит remote-приложение?

**Короткий ответ**

remoteEntry.json, JavaScript chunks, styles, assets и при необходимости server bundle. Все ссылки из entry должны
оставаться доступными как единый согласованный release.

**Полный ответ**

`remoteEntry.json`, JavaScript chunks, styles, assets и при необходимости server bundle. Все ссылки из entry должны
оставаться доступными как единый согласованный release.





#### Вопрос: Где должен лежать remoteEntry.json после деплоя?

**Короткий ответ**

По стабильному HTTPS URL, доступному host и разрешенному security policy. Часто это CDN path, связанный с приложением
или версией, например /movies/1.4.2/remoteEntry.json.

**Полный ответ**

По стабильному HTTPS URL, доступному host и разрешенному security policy. Часто это CDN path, связанный с приложением
или версией, например `/movies/1.4.2/remoteEntry.json`.





#### Вопрос: Где хранить manifest для dev/stage/prod?

**Короткий ответ**

В environment-specific конфигурации или config service, управляемом deployment pipeline. Не следует вручную менять
production manifest без истории, валидации и возможности быстрого rollback.

**Полный ответ**

В environment-specific конфигурации или config service, управляемом deployment pipeline. Не следует вручную менять
production manifest без истории, валидации и возможности быстрого rollback.





#### Вопрос: Как деплоить host и remote-приложения независимо?

**Короткий ответ**

У каждого приложения должен быть отдельный build и release pipeline. Remote сначала публикует versioned assets, затем
контролируемо обновляется manifest; host выпускается отдельно и сохраняет совместимость с доступными версиями remote.

**Полный ответ**

У каждого приложения должен быть отдельный build и release pipeline. Remote сначала публикует versioned assets, затем
контролируемо обновляется manifest; host выпускается отдельно и сохраняет совместимость с доступными версиями remote.





#### Вопрос: Как host узнает URL нового remote-приложения?

**Короткий ответ**

Из manifest, который загружается при старте или встраивается для конкретного окружения. Обновление mapping переключает
host на новый remote без изменения его application code.

**Полный ответ**

Из manifest, который загружается при старте или встраивается для конкретного окружения. Обновление mapping переключает
host на новый remote без изменения его application code.





#### Вопрос: Как версионировать контракты между host и remote?

**Короткий ответ**

Версионируют exposed modules, TypeScript/schema package или capability metadata по SemVer. Breaking change получает
новую major-версию или новый параллельный contract identifier.

**Полный ответ**

Версионируют exposed modules, TypeScript/schema package или capability metadata по SemVer. Breaking change получает
новую major-версию или новый параллельный contract identifier.





#### Вопрос: Как организовать backward compatibility между host и remote?

**Короткий ответ**

Сначала remote добавляет новый API, сохраняя старый, затем обновляются consumers, и только после измеренного перехода
удаляется legacy contract. Полезны defaults, optional fields и tolerant readers.

**Полный ответ**

Сначала remote добавляет новый API, сохраняя старый, затем обновляются consumers, и только после измеренного перехода
удаляется legacy contract. Полезны defaults, optional fields и tolerant readers.





#### Вопрос: Как безопасно изменить exposedModule или exportName?

**Короткий ответ**

Временно публиковать старое и новое имя, обновить host, проверить production usage и только затем удалить alias.
Изменение должно проходить contract и integration tests.

**Полный ответ**

Временно публиковать старое и новое имя, обновить host, проверить production usage и только затем удалить alias.
Изменение должно проходить contract и integration tests.





#### Вопрос: Почему нельзя бездумно переименовывать exposed module?

**Короткий ответ**

Его имя — часть runtime API, записанная в host configuration. В отличие от внутреннего refactoring, компилятор remote не
найдет внешних consumers и не предупредит об их поломке.

**Полный ответ**

Его имя — часть runtime API, записанная в host configuration. В отличие от внутреннего refactoring, компилятор remote не
найдет внешних consumers и не предупредит об их поломке.





#### Вопрос: Что будет, если host старый, а remote новый?

**Короткий ответ**

Все продолжит работать только при backward-compatible remote contract. Удаленный export, переименованный input или
измененная payload schema приведут к runtime-ошибке старого host.

**Полный ответ**

Все продолжит работать только при backward-compatible remote contract. Удаленный export, переименованный input или
измененная payload schema приведут к runtime-ошибке старого host.





#### Вопрос: Что будет, если remote старый, а host новый?

**Короткий ответ**

Новый host может запросить отсутствующий export или передать неподдерживаемые данные. Поэтому host должен либо
поддерживать старый контракт, либо проверять capability/version до использования новой функции.

**Полный ответ**

Новый host может запросить отсутствующий export или передать неподдерживаемые данные. Поэтому host должен либо
поддерживать старый контракт, либо проверять capability/version до использования новой функции.





#### Вопрос: Нужно ли кешировать federation manifest?

**Короткий ответ**

Да, но обычно с коротким TTL, revalidation или управляемым versioned URL. Стратегия зависит от того, насколько быстро
нужно переключать remote и отключать аварийный release.

**Полный ответ**

Да, но обычно с коротким TTL, revalidation или управляемым versioned URL. Стратегия зависит от того, насколько быстро
нужно переключать remote и отключать аварийный release.





#### Вопрос: Какие риски есть у кеширования remoteEntry.json?

**Короткий ответ**

Устаревший entry может ссылаться на удаленные chunks или старый контракт. Смешивание entry одного release с assets
другого вызывает ошибки импорта, которые трудно воспроизвести локально.

**Полный ответ**

Устаревший entry может ссылаться на удаленные chunks или старый контракт. Смешивание entry одного release с assets
другого вызывает ошибки импорта, которые трудно воспроизвести локально.





#### Вопрос: Почему remoteEntry.json часто кешируют осторожнее, чем JS chunks?

**Короткий ответ**

Entry является изменяемой картой текущего release, а content-hashed chunks immutable. Chunks можно кешировать надолго,
тогда как entry должен достаточно быстро указывать на актуальный набор файлов.

**Полный ответ**

Entry является изменяемой картой текущего release, а content-hashed chunks immutable. Chunks можно кешировать надолго,
тогда как entry должен достаточно быстро указывать на актуальный набор файлов.





#### Вопрос: Как CDN влияет на деплой микрофронтендов?

**Короткий ответ**

CDN снижает latency и распределяет assets, но добавляет cache keys, propagation delay, CORS/CSP настройки и
invalidation. Release должен учитывать согласованность entry и chunks во всех edge locations.

**Полный ответ**

CDN снижает latency и распределяет assets, но добавляет cache keys, propagation delay, CORS/CSP настройки и
invalidation. Release должен учитывать согласованность entry и chunks во всех edge locations.





#### Вопрос: Как CDN cache может сломать загрузку remote?

**Короткий ответ**

Очистка устаревшего entry может быстро переключить клиентов на исправление. Но удаление старых chunks или
несогласованная invalidation оставит открытые сессии с entry, ссылки которого больше не работают.

**Полный ответ**

Очистка устаревшего entry может быстро переключить клиентов на исправление. Но удаление старых chunks или
несогласованная invalidation оставит открытые сессии с entry, ссылки которого больше не работают.





#### Вопрос: Что такое canary deployment для remote-приложения?

**Короткий ответ**

Это направление небольшой доли пользователей или внутренних сотрудников на новую версию remote. Manifest или edge
routing выбирает версию, а метрики сравниваются до полного rollout.

**Полный ответ**

Это направление небольшой доли пользователей или внутренних сотрудников на новую версию remote. Manifest или edge
routing выбирает версию, а метрики сравниваются до полного rollout.





#### Вопрос: Как feature flags помогают деплоить микрофронтенды?

**Короткий ответ**

Flag может включить новый remote, contract path или функцию для выбранной аудитории без повторной сборки. Нужны
предсказуемый fallback, владелец flag и удаление завершенных флагов.

**Полный ответ**

Flag может включить новый remote, contract path или функцию для выбранной аудитории без повторной сборки. Нужны
предсказуемый fallback, владелец flag и удаление завершенных флагов.





#### Вопрос: Как организовать rollback remote-приложения?

**Короткий ответ**

Хранить предыдущие immutable releases и атомарно вернуть manifest mapping на проверенный remoteEntry.json. Старые entry
и chunks нельзя удалять до завершения cache TTL и активных сессий.

**Полный ответ**

Хранить предыдущие immutable releases и атомарно вернуть manifest mapping на проверенный `remoteEntry.json`. Старые
entry и chunks нельзя удалять до завершения cache TTL и активных сессий.





#### Вопрос: Как организовать rollback host-приложения?

**Короткий ответ**

Повторно активировать предыдущий host release и соответствующую конфигурацию manifest. Rollback должен учитывать, что
remote уже могли перейти вперед, поэтому их контракты обязаны быть backward-compatible.

**Полный ответ**

Повторно активировать предыдущий host release и соответствующую конфигурацию manifest. Rollback должен учитывать, что
remote уже могли перейти вперед, поэтому их контракты обязаны быть backward-compatible.





#### Вопрос: Как откатить сломанный remote без деплоя host?

**Короткий ответ**

Изменить управляемый manifest/config или remote feature flag так, чтобы host не монтировал виджет либо использовал
резервную версию. Host должен заранее поддерживать отсутствие optional remote.

**Полный ответ**

Изменить управляемый manifest/config или remote feature flag так, чтобы host не монтировал виджет либо использовал
резервную версию. Host должен заранее поддерживать отсутствие optional remote.





#### Вопрос: Что должен показывать host, если remote не загрузился после деплоя?

**Короткий ответ**

Локальный доступный fallback с понятным сообщением и retry, если повтор может помочь. Критический remote может
переводить весь сценарий в error state, но не должен оставлять пустой экран без объяснения.

**Полный ответ**

Локальный доступный fallback с понятным сообщением и retry, если повтор может помочь. Критический remote может
переводить весь сценарий в error state, но не должен оставлять пустой экран без объяснения.





#### Вопрос: Какие метрики и алерты нужны для микрофронтендов в production?

**Короткий ответ**

Успешность и latency загрузки entry/chunks, mount time, ошибки по remote/version, fallback rate, contract errors и
влияние на Core Web Vitals. Алерт должен указывать конкретный remote и release.

**Полный ответ**

Успешность и latency загрузки entry/chunks, mount time, ошибки по remote/version, fallback rate, contract errors и
влияние на Core Web Vitals. Алерт должен указывать конкретный remote и release.





#### Вопрос: Как логировать ошибки загрузки remote-приложений?

**Короткий ответ**

Добавлять remote name, entry URL, exposed module, host/remote versions, environment, этап загрузки и correlation ID.
Секреты и персональные payloads в client logs отправлять нельзя.

**Полный ответ**

Добавлять remote name, entry URL, exposed module, host/remote versions, environment, этап загрузки и correlation ID.
Секреты и персональные payloads в client logs отправлять нельзя.





#### Вопрос: Как проверять совместимость host и remote в CI?

**Короткий ответ**

Собирать каждый remote, поднимать его artifacts и запускать contract/integration tests поддерживаемых host versions.
Также проверять shared dependency ranges и наличие всех exposed exports.

**Полный ответ**

Собирать каждый remote, поднимать его artifacts и запускать contract/integration tests поддерживаемых host versions.
Также проверять shared dependency ranges и наличие всех exposed exports.





#### Вопрос: Какие contract tests нужны для host и remote?

**Короткий ответ**

Это автоматическая проверка публичного соглашения между producer remote и consumer host: имен exports, inputs, outputs,
payload schemas и обязательного поведения без полного E2E всех реализаций.

**Полный ответ**

Это автоматическая проверка публичного соглашения между producer remote и consumer host: имен exports, inputs, outputs,
payload schemas и обязательного поведения без полного E2E всех реализаций.





#### Вопрос: Какие e2e-сценарии нужны перед выкладкой host и remotes?

**Короткий ответ**

Загрузка каждого remote, основной cross-remote flow, partial failure, retry, старая/новая совместимая версия,
navigation, auth и rollback configuration. Проверяют также отсутствие блокировки host при optional remote failure.

**Полный ответ**

Загрузка каждого remote, основной cross-remote flow, partial failure, retry, старая/новая совместимая версия,
navigation, auth и rollback configuration. Проверяют также отсутствие блокировки host при optional remote failure.



### CSS, UI и Design System



#### Вопрос: Кто должен отвечать за layout: host или remote?

**Короткий ответ**

Host отвечает за page layout, размеры и расположение slots. Remote отвечает за содержимое внутри выделенной области и
должен корректно работать в явно документированных responsive constraints.

**Полный ответ**

Host отвечает за page layout, размеры и расположение slots. Remote отвечает за содержимое внутри выделенной области и
должен корректно работать в явно документированных responsive constraints.





#### Вопрос: Кто должен отвечать за внутренние стили виджета: host или remote?

**Короткий ответ**

Remote владеет своей внутренней разметкой и component styles. Host может передавать semantic design tokens и параметры
контейнера, но не должен зависеть от внутренних selectors remote.

**Полный ответ**

Remote владеет своей внутренней разметкой и component styles. Host может передавать semantic design tokens и параметры
контейнера, но не должен зависеть от внутренних selectors remote.





#### Вопрос: Почему host не должен глубоко стилизовать внутренности remote?

**Короткий ответ**

Внутренний DOM не является публичным контрактом и может измениться при независимом release. Deep selectors создают
скрытую связанность и ломают encapsulation, тестирование и безопасный rollout.

**Полный ответ**

Внутренний DOM не является публичным контрактом и может измениться при независимом release. Deep selectors создают
скрытую связанность и ломают encapsulation, тестирование и безопасный rollout.





#### Вопрос: Какие проблемы со стилями бывают в микрофронтендах?

**Короткий ответ**

Конфликты global selectors, разный reset, несовместимые tokens, дубли fonts/styles, различия responsive behavior и
z-index систем. Виджеты также могут менять layout после поздней загрузки.

**Полный ответ**

Конфликты global selectors, разный reset, несовместимые tokens, дубли fonts/styles, различия responsive behavior и
z-index систем. Виджеты также могут менять layout после поздней загрузки.





#### Вопрос: Как избежать конфликта глобальных CSS-стилей между remote-приложениями?

**Короткий ответ**

Минимизировать globals, использовать Angular style encapsulation, scoped naming и согласованный reset в host. Общие
tokens публиковать через CSS custom properties, а не через selectors внутренних элементов.

**Полный ответ**

Минимизировать globals, использовать Angular style encapsulation, scoped naming и согласованный reset в host. Общие
tokens публиковать через CSS custom properties, а не через selectors внутренних элементов.





#### Вопрос: Как микрофронтенды могут использовать общую design system?

**Короткий ответ**

Через versioned package компонентов и semantic tokens с документированным compatibility range. Angular package часто
настраивают как shared dependency, если все remote способны использовать совместимую runtime-версию.

**Полный ответ**

Через versioned package компонентов и semantic tokens с документированным compatibility range. Angular package часто
настраивают как shared dependency, если все remote способны использовать совместимую runtime-версию.





#### Вопрос: Какие риски есть у разных версий design system в разных remote?

**Короткий ответ**

Визуальная несогласованность, разные accessibility fixes, duplicated code и конфликт global assets. При singleton
sharing несовместимые версии могут также привести к runtime-ошибке вместо изолированной копии.

**Полный ответ**

Визуальная несогласованность, разные accessibility fixes, duplicated code и конфликт global assets. При singleton
sharing несовместимые версии могут также привести к runtime-ошибке вместо изолированной копии.



### Testing и security



#### Вопрос: Как тестировать remote-приложение отдельно?

**Короткий ответ**

Проверять компоненты и domain logic unit/integration-тестами, а exposed contract — через standalone harness или test
host. Remote также должен собираться и запускаться независимо от production host.

**Полный ответ**

Проверять компоненты и domain logic unit/integration-тестами, а exposed contract — через standalone harness или test
host. Remote также должен собираться и запускаться независимо от production host.





#### Вопрос: Как тестировать host без реальных remote?

**Короткий ответ**

Подменить abstraction загрузчика и вернуть локальные test components с теми же inputs/outputs. Так host orchestration и
fallback states тестируются детерминированно без сети и federation runtime.

**Полный ответ**

Подменить abstraction загрузчика и вернуть локальные test components с теми же inputs/outputs. Так host orchestration и
fallback states тестируются детерминированно без сети и federation runtime.





#### Вопрос: Как мокать remote widgets в тестах host-приложения?

**Короткий ответ**

Создать минимальные standalone components, реализующие нужный публичный контракт, и настроить loader stub возвращать их
Type. Не нужно копировать внутренний UI настоящего remote.

**Полный ответ**

Создать минимальные standalone components, реализующие нужный публичный контракт, и настроить loader stub возвращать их
`Type`. Не нужно копировать внутренний UI настоящего remote.





#### Вопрос: Как проверить fallback UI, если remote недоступен?

**Короткий ответ**

Настроить loader mock на rejected promise или null, запустить mount и проверить доступное сообщение, status error,
наличие retry и сохранение работоспособности независимых slots.

**Полный ответ**

Настроить loader mock на rejected promise или `null`, запустить mount и проверить доступное сообщение, status `error`,
наличие retry и сохранение работоспособности независимых slots.





#### Вопрос: Как тестировать контракты между host и remote?

**Короткий ответ**

Проверять наличие exposed export, совместимость input/output payloads и ожидаемую реакцию на события. Эти тесты
запускают как в producer pipeline, так и на матрице поддерживаемых consumer versions.

**Полный ответ**

Проверять наличие exposed export, совместимость input/output payloads и ожидаемую реакцию на события. Эти тесты
запускают как в producer pipeline, так и на матрице поддерживаемых consumer versions.





#### Вопрос: Что такое supply chain risk в микрофронтендах?

**Короткий ответ**

Это риск компрометации dependency, build pipeline, registry, artifact storage или CDN одного remote. Из-за композиции во
время выполнения вредоносный release попадает в host без изменения его репозитория.

**Полный ответ**

Это риск компрометации dependency, build pipeline, registry, artifact storage или CDN одного remote. Из-за композиции во
время выполнения вредоносный release попадает в host без изменения его репозитория.





#### Вопрос: Какие security-риски появляются при runtime-загрузке remote-кода?

**Короткий ответ**

Host исполняет JavaScript с правами своего origin: remote может читать доступные данные, менять DOM и выполнять запросы.
Компрометация remote pipeline или CDN становится компрометацией host session.

**Полный ответ**

Host исполняет JavaScript с правами своего origin: remote может читать доступные данные, менять DOM и выполнять запросы.
Компрометация remote pipeline или CDN становится компрометацией host session.





#### Вопрос: Почему host должен доверять только известным remoteEntry URL?

**Короткий ответ**

URL определяет исполняемый код. Разрешение произвольного адреса из query params или пользовательского ввода превращает
federation loader в механизм удаленного выполнения недоверенного JavaScript.

**Полный ответ**

URL определяет исполняемый код. Разрешение произвольного адреса из query params или пользовательского ввода превращает
federation loader в механизм удаленного выполнения недоверенного JavaScript.





#### Вопрос: Что может пойти не так, если manifest можно изменить без контроля?

**Короткий ответ**

Злоумышленник или ошибочная автоматизация может перенаправить host на вредоносный или несовместимый remote. Нужны
ограниченный доступ, audit log, validation, approvals и rollback.

**Полный ответ**

Злоумышленник или ошибочная автоматизация может перенаправить host на вредоносный или несовместимый remote. Нужны
ограниченный доступ, audit log, validation, approvals и rollback.





#### Вопрос: Как CSP влияет на загрузку remote-приложений?

**Короткий ответ**

script-src, connect-src и связанные directives должны разрешать доверенные CDN и способы загрузки модулей. Слишком
широкая CSP ослабляет защиту, а слишком узкая блокирует entry, chunks или source maps.

**Полный ответ**

`script-src`, `connect-src` и связанные directives должны разрешать доверенные CDN и способы загрузки модулей. Слишком
широкая CSP ослабляет защиту, а слишком узкая блокирует entry, chunks или source maps.





#### Вопрос: Как ограничить влияние сломанного или небезопасного remote?

**Короткий ответ**

Использовать allowlist URL, CSP, независимые permissions, минимальные публичные данные, мониторинг и аварийное
отключение. Для недоверенного кода нужна более сильная изоляция, например iframe с sandbox, а не обычный Angular
component.

**Полный ответ**

Использовать allowlist URL, CSP, независимые permissions, минимальные публичные данные, мониторинг и аварийное
отключение. Для недоверенного кода нужна более сильная изоляция, например iframe с sandbox, а не обычный Angular
component.



### Tooling

Feature toggles в Angular часто реализуют через service, guard, directive или provider. Общие типы флагов, lifecycle,
риски и fallback-стратегии описаны в разделе [Feature toggles](../infrastructure/index.md#feature-toggles).



#### Вопрос: Что такое TypeScript program?

**Короткий ответ**

Program — модель набора source files, compiler options и module graph, которую создает TypeScript compiler API. Compiler
выполняет type checking только для файлов, входящих в этот graph. Angular compiler расширяет его анализом decorators и
templates.

**Полный ответ**

`Program` — модель набора source files, compiler options и module graph, которую создает TypeScript compiler API.
Compiler выполняет type checking только для файлов, входящих в этот graph. Angular compiler расширяет его анализом
decorators и templates.





#### Вопрос: Зачем нужен tsconfig.app.json?

**Короткий ответ**

Он задает compiler options и roots именно application build, отделяя их от tests, tools и base tsconfig.json. Angular
builder получает его из angular.json. Разные targets могут использовать разные типы и entry files.

**Полный ответ**

Он задает compiler options и roots именно application build, отделяя их от tests, tools и base `tsconfig.json`. Angular
builder получает его из `angular.json`. Разные targets могут использовать разные типы и entry files.





#### Вопрос: Чем files отличается от include в tsconfig?

**Короткий ответ**

files перечисляет точные root files, а include выбирает их glob patterns. Imports из root files также входят в program,
если не исключены resolution rules. Узкий files легко случайно оставить без нового entry.

**Полный ответ**

`files` перечисляет точные root files, а `include` выбирает их glob patterns. Imports из root files также входят в
program, если не исключены resolution rules. Узкий `files` легко случайно оставить без нового entry.





#### Вопрос: Почему файл может физически существовать, но не входить в TypeScript compilation?

**Короткий ответ**

Он может не совпадать с files/include, быть исключен или не импортироваться ни одним root file. Также builder может
использовать другой tsconfig, чем ожидает разработчик. Проверить состав помогает tsc --listFiles.

**Полный ответ**

Он может не совпадать с `files`/`include`, быть исключен или не импортироваться ни одним root file. Также builder может
использовать другой tsconfig, чем ожидает разработчик. Проверить состав помогает `tsc --listFiles`.





#### Вопрос: Почему Angular compiler требует, чтобы файл с @Component входил в TypeScript compilation?

**Короткий ответ**

Angular анализирует component metadata в рамках TypeScript program. Если файл не является root и не достижим через
imports, compiler не создаст для него Angular definitions. Физического наличия файла в directory недостаточно.

**Полный ответ**

Angular анализирует component metadata в рамках TypeScript program. Если файл не является root и не достижим через
imports, compiler не создаст для него Angular definitions. Физического наличия файла в directory недостаточно.





#### Вопрос: Что такое Angular builder?

**Короткий ответ**

Builder — реализация target вроде build, serve или test, настроенная в angular.json. Она получает options, запускает
compiler/bundler и возвращает результат CLI. Custom builder позволяет заменить или обернуть build pipeline.

**Полный ответ**

Builder — реализация target вроде `build`, `serve` или `test`, настроенная в `angular.json`. Она получает options,
запускает compiler/bundler и возвращает результат CLI. Custom builder позволяет заменить или обернуть build pipeline.





#### Вопрос: Что такое Vite dev server в Angular?

**Короткий ответ**

Современный Angular development server использует Vite для быстрой раздачи и обновления приложения, оставаясь под
управлением Angular builder. Angular CLI настраивает compilation, assets и framework integration. Это не означает, что
проект обязан иметь ручной vite.config.

**Полный ответ**

Современный Angular development server использует Vite для быстрой раздачи и обновления приложения, оставаясь под
управлением Angular builder. Angular CLI настраивает compilation, assets и framework integration. Это не означает, что
проект обязан иметь ручной `vite.config`.





#### Вопрос: Какие frontend guidelines особенно важны для Angular-проекта?

**Короткий ответ**

Для Angular-проекта важны соглашения о структуре standalone components, signals и RxJS, smart/presentational components,
forms, HTTP services, error handling, lazy loading, testing и naming. Без таких правил разные части приложения начинают
выглядеть как разные frameworks внутри одного репозитория.

**Полный ответ**

Для Angular-проекта важны соглашения о структуре standalone components, signals и RxJS, smart/presentational components,
forms, HTTP services, error handling, lazy loading, testing и naming. Без таких правил разные части приложения начинают
выглядеть как разные frameworks внутри одного репозитория.





#### Вопрос: Что стоит фиксировать в Angular coding guidelines?

**Короткий ответ**

Стоит фиксировать структуру feature folders, правила для components, services, directives и pipes, подход к state
management, forms, error handling, loading states и тестированию. Также полезно описать, когда использовать signals,
когда RxJS, а когда обычные class fields или pure functions.

**Полный ответ**

Стоит фиксировать структуру feature folders, правила для components, services, directives и pipes, подход к state
management, forms, error handling, loading states и тестированию. Также полезно описать, когда использовать signals,
когда RxJS, а когда обычные class fields или pure functions.



### Frontend topics в Angular



#### Вопрос: Требования к написанию кода на TypeScript

**Короткий ответ**

На самом деле требования бывают разные и зависят от команды к команде. Самые эффективные для себя считаю использование
модификаторов доступа и принудительного указания типов данных для всех переменных, методов и членов класса, которые вы
используете в коде. Желательно все необходимые правила конвенции кода настраивать в ESLint.

**Полный ответ**

На самом деле требования бывают разные и зависят от команды к команде. Самые эффективные для себя считаю использование
модификаторов доступа и принудительного указания типов данных для всех переменных, методов и членов класса, которые вы
используете в коде. Желательно все необходимые правила конвенции кода настраивать в ESLint.

```ts filename="my.ts"
export interface My {}

// my-impl.ts
export class MyImp implements My {
  public field: string;

  public myMethod(): void {
    // ...
  }

  private myProtectedMethod(): Date {
    return new Date();
  }

  private myPrivateMethod(): MyClassImpl {
    // ...

    return this;
  }
}
```





#### Вопрос: Зачем нужен ESLint (TSLint) и Prettier?

**Короткий ответ**

ESLint анализирует код и находит потенциальные ошибки, небезопасные конструкции и нарушения соглашений. С TypeScript он
работает через typescript-eslint, а Angular-правила предоставляет angular-eslint.

**Полный ответ**

**ESLint** анализирует код и находит потенциальные ошибки, небезопасные конструкции и нарушения соглашений. С TypeScript
он работает через typescript-eslint, а Angular-правила предоставляет angular-eslint.

**Prettier** отвечает за форматирование: отступы, переносы, кавычки и другие визуальные правила. Он не заменяет
семантический анализ ESLint.

**TSLint** устарел и больше не развивается; современные TypeScript-проекты используют ESLint.

Обычная схема:

- редактор форматирует Prettier;
- ESLint проверяет качество кода и Angular templates;
- CI запускает lint и format check;
- правила форматирования ESLint, конфликтующие с Prettier, отключаются.

Цель инструментов — быстрый автоматический feedback и единый стиль, а не максимальное количество строгих правил. Правило
должно предотвращать реальную проблему или поддерживать договоренность команды.





#### Вопрос: Что такое esbuild?

**Короткий ответ**

esbuild — быстрый bundler и transformer на Go. Angular application builder использует его как часть build pipeline для
bundling и оптимизаций вместе с Angular compiler. Он не заменяет template type checking.

**Полный ответ**

esbuild — быстрый bundler и transformer на Go. Angular application builder использует его как часть build pipeline для
bundling и оптимизаций вместе с Angular compiler. Он не заменяет template type checking.





#### Вопрос: Что такое SSR entry?

**Короткий ответ**

Это server-side entry, из которого builder создает bundle для обработки HTTP requests или prerender. Он подключает
server providers и экспортирует bootstrap/handler, а не монтирует приложение в browser DOM. Конкретное имя задается
workspace configuration.

**Полный ответ**

Это server-side entry, из которого builder создает bundle для обработки HTTP requests или prerender. Он подключает
server providers и экспортирует bootstrap/handler, а не монтирует приложение в browser DOM. Конкретное имя задается
workspace configuration.





#### Вопрос: Как тестировать Angular-компонент с async data fetching?

**Короткий ответ**

Проверяют не внутренний вызов метода, а observable behavior: loading state, успешный render, empty state, error state и
отмену устаревшего запроса, если она является частью контракта.

**Полный ответ**

Проверяют не внутренний вызов метода, а observable behavior: loading state, успешный render, empty state, error state и
отмену устаревшего запроса, если она является частью контракта.

Подходы:

- pure logic вынести и покрыть unit tests;
- компонент проверить через TestBed или Angular Testing Library;
- HTTP boundary подменить fake service или `HttpTestingController`;
- для reusable UI components использовать Component Harness;
- critical user flow проверить Playwright/Cypress.

```ts
TestBed.configureTestingModule({
  providers: [{provide: UserApi, useValue: userApiStub}],
});

const fixture = TestBed.createComponent(UserCardComponent);
fixture.componentRef.setInput('userId', '42');
fixture.detectChanges();

expect(fixture.nativeElement.textContent).toContain('Загрузка');
```

Тест должен управлять временем и данными явно, а не ждать произвольные delays.





#### Вопрос: Как объяснить Angular PWA cache strategies на интервью?

**Короткий ответ**

Нужно разделить app shell, static assets и data requests. App shell и versioned assets можно кешировать агрессивнее,
потому что их имена меняются при build. API data требует отдельной стратегии: freshness, performance, timeout, maxAge,
fallback и правила инвалидирования.

**Полный ответ**

Нужно разделить app shell, static assets и data requests. App shell и versioned assets можно кешировать агрессивнее,
потому что их имена меняются при build. API data требует отдельной стратегии: freshness, performance, timeout, maxAge,
fallback и правила инвалидирования.

В Angular Service Worker конфигурация описывает asset groups и data groups. Хороший ответ упоминает update flow, offline
fallback, риски stale data и то, что Service Worker не заменяет backend authorization.

```json
{
  "dataGroups": [
    {
      "name": "api",
      "urls": ["/api/**"],
      "cacheConfig": {
        "strategy": "freshness",
        "maxAge": "5m",
        "timeout": "3s"
      }
    }
  ]
}
```
