# HTML — вопросы и ответы, часть 2

> Автоматически сгенерировано из src/pages/html/index.md. Не редактируйте вручную.

### HTML parsing, compatibility и resources



#### Вопрос: Что происходит после получения HTML-документа?

**Короткий ответ**

Браузер начинает streaming parse HTML еще до полной загрузки документа: tokenizer и tree construction строят DOM,
preload scanner заранее обнаруживает ресурсы, параллельно загружаются CSS, JavaScript, изображения и fonts. Для первого
render браузеру нужны DOM и CSSOM, после чего идут style calculation, layout, paint и compositing.

**Полный ответ**

Получение HTML не означает, что браузер сначала скачивает весь файл, а потом начинает работать. Обычно обработка идет
потоково: новые байты приходят по сети и постепенно проходят decoding, tokenization и tree construction.

Упрощенная последовательность выглядит так:

1. **Network и decoding.** Браузер получает response, определяет encoding и превращает байты в символы.
2. **HTML tokenization.** Parser выделяет start tags, end tags, text, comments и другие tokens.
3. **Tree construction.** Из tokens строится DOM с учетом content model и правил error recovery.
4. **Resource discovery.** Parser и preload scanner находят stylesheets, scripts, images, fonts и другие зависимости.
5. **CSSOM.** Загруженные stylesheets разбираются в CSS object model.
6. **Style + layout.** Для видимых nodes вычисляются styles и геометрия.
7. **Paint + compositing.** Браузер рисует pixels и собирает слои в итоговый кадр.

Это не строго последовательный waterfall. Сеть, parsing и часть resource loading перекрываются по времени. Например,
preload scanner может найти `<img>` или `<link rel="stylesheet">` впереди основного parser и начать fetch раньше.

JavaScript способен менять эту картину. Классический parser-blocking script:

```html
<script src="app.js"></script>
```

может остановить HTML parser до загрузки и выполнения script, потому что JavaScript потенциально меняет документ через
DOM APIs или `document.write()`. `defer`, modules и подходящее placement уменьшают такой blocking.

CSS обычно не блокирует сам HTML parsing, но может задерживать render: браузеру нужен CSSOM, чтобы корректно посчитать
styles. Кроме того, script, который зависит от computed styles, тоже может косвенно ждать stylesheet.

Практический performance-вопрос поэтому звучит не «сколько весит HTML», а **что находится на Critical Rendering Path**:

- parser-blocking JavaScript;
- render-blocking CSS;
- web fonts;
- LCP image;
- long main-thread tasks;
- лишние redirects и connection setup.

В SSR/Angular сценарии server-rendered HTML может дать пользователю содержимое раньше bundle, но затем framework еще
должен bootstrap/hydrate приложение. Поэтому «HTML уже пришел» и «страница полностью интерактивна» — разные milestones.

На интервью полезно не перечислять весь browser engine: **HTML парсится потоково в DOM, ресурсы обнаруживаются и
загружаются параллельно, а первый render зависит от critical resources, CSSOM, layout и paint**.





#### Вопрос: Что такое progressive enhancement?

**Короткий ответ**

Progressive enhancement начинает с базового доступного HTML и основного пользовательского сценария, а затем добавляет
CSS, JavaScript и новые browser APIs как улучшения. Если enhancement недоступен или сломался, ключевой content и
действие по возможности остаются рабочими.

**Полный ответ**

Progressive enhancement — стратегия проектирования **от устойчивой базы к дополнительным возможностям**, а не список
fallback для старых браузеров.

Простой пример — поиск:

```html
<form
  action="/search"
  method="get"
>
  <label for="query">Поиск</label>
  <input
    id="query"
    name="q"
  />
  <button type="submit">Найти</button>
</form>
```

Без JavaScript form уже имеет понятную семантику и может отправить запрос. JavaScript затем может добавить autocomplete,
debounce, client-side validation или обновление результатов без full-page navigation.

Подход полезен по нескольким причинам.

**Resilience**

Bundle может не загрузиться из-за сети, CSP, CDN incident или runtime error. Если весь основной сценарий существует
только после JavaScript bootstrap, пользователь получает пустой или мертвый интерфейс.

**Accessibility**

Native HTML primitives уже содержат semantics, keyboard behavior и form behavior. Enhancement поверх них обычно
надежнее, чем custom widget с нуля.

**Performance**

Server-rendered или prerendered content может стать доступным до загрузки большого client bundle.

**Browser diversity**

Новый API можно включать через feature detection, не запрещая весь продукт пользователю, у которого нет одной advanced
capability.

Например:

```js
if ('share' in navigator) {
  showNativeShareButton();
}
```

При этом progressive enhancement не означает «приложение обязано полностью работать без JavaScript». Для сложного
редактора или IDE это может быть неразумно. Нужно определить **minimum viable experience**: что является core content и
какие действия должны переживать отсутствие конкретной enhancement.

Для Angular SSR это особенно полезная модель: SSR HTML дает ранний meaningful state, hydration добавляет client-side
interactivity, а отдельные advanced APIs подключаются только там, где доступны.

На интервью сильная формулировка: **progressive enhancement проектирует надежный baseline и делает сложность additive;
отказ одного слоя не должен без необходимости уничтожать весь пользовательский сценарий**.





#### Вопрос: Чем progressive enhancement отличается от graceful degradation?

**Короткий ответ**

Progressive enhancement проектирует продукт снизу вверх: сначала рабочий baseline, затем улучшения. Graceful degradation
обычно начинается с полнофункционального experience и определяет, как он упростится при отсутствии части возможностей.
Оба подхода стремятся сохранить полезный сценарий, но точка проектирования разная.

**Полный ответ**

Оба термина описывают устойчивость интерфейса при разных возможностях среды, но направление мышления отличается.

**Progressive enhancement:**

```text
semantic HTML -> CSS -> JavaScript -> advanced browser feature
```

Сначала проектируется минимальный надежный слой, а каждый следующий делает experience лучше.

**Graceful degradation:**

```text
full experience -> feature unavailable -> controlled fallback
```

Сначала существует богатый вариант, затем команда определяет приемлемое поведение для менее способной среды.

Например, редактор изображений может использовать WebGL как основной renderer. Полностью воспроизводить его без
JavaScript бессмысленно, но graceful degradation может дать preview, download original или понятное сообщение о
неподдерживаемой функции вместо crash.

А обычная форма регистрации естественно подходит progressive enhancement: native form работает сама, а JavaScript
добавляет password strength meter и inline validation.

Разница не означает, что один подход всегда «правильный», а второй устарел. Выбор зависит от продукта:

- content/service pages часто хорошо строятся progressive enhancement;
- specialized applications иногда логичнее проектировать full experience и явный degraded mode;
- отдельные компоненты могут использовать оба подхода одновременно.

Главная ошибка — называть graceful degradation ситуацию, когда unsupported browser просто получает белый экран. Degraded
experience все еще должен быть **преднамеренным и полезным**.

На интервью можно ответить через направление: **progressive enhancement добавляет capability к baseline, graceful
degradation снимает capability с full experience, стараясь сохранить core value**.





#### Вопрос: Чем browser support отличается от browser optimization?

**Короткий ответ**

Browser support — обещание, что в указанном окружении работает определенный набор пользовательских сценариев. Browser
optimization — дополнительная работа над скоростью, UX или использованием platform features для приоритетных окружений.
Поддерживать браузер не значит давать ему pixel-identical experience.

**Полный ответ**

Полезно разделять **contract корректности** и **уровень оптимизации**.

Browser support отвечает на вопрос:

> Может ли пользователь в этом browser/device выполнить обещанные продуктом сценарии с приемлемым качеством?

Например, support matrix может гарантировать login, поиск, оформление заявки и доступ к документам в последних двух
major versions Chrome, Edge, Firefox и Safari.

Browser optimization отвечает на другой вопрос:

> Где мы дополнительно тратим effort, чтобы experience был быстрее или богаче?

Например, приложение поддерживает Safari и Chrome, но для Chromium использует дополнительную производительную feature
только после feature detection. Safari получает тот же core scenario другим путем.

Поддержка не обязана означать:

- одинаковые animations;
- одинаковый native form UI;
- одинаковые fonts rasterization;
- поддержку каждой experimental API;
- pixel-perfect equality между engines.

Она должна описывать observable user outcome. Иначе QA получает бесконечную задачу «все должно быть одинаково везде».

Optimization также нельзя использовать как оправдание функциональной поломки. Если браузер заявлен supported, critical
flow должен работать даже без отдельных performance enhancements.

Практически полезно фиксировать:

- supported versions/devices;
- core scenarios;
- accessibility baseline;
- допустимые visual differences;
- advanced features с отдельным fallback;
- процесс снятия support.

На интервью сильный ответ: **support — это product contract на работоспособность, optimization — приоритизация качества
и performance поверх этого contract**.





#### Вопрос: Как определить, какие браузеры поддерживать?

**Короткий ответ**

Support matrix определяют по реальной аналитике аудитории, business/regulatory requirements, корпоративным ограничениям,
capabilities продукта и стоимости QA/разработки. Ее нужно версионировать и регулярно пересматривать, а не выбирать по
личным предпочтениям команды.

**Полный ответ**

Фраза «поддерживаем современные браузеры» почти бесполезна: она не определяет версии, устройства и критерий
работоспособности. Нужна явная support policy.

Решение обычно собирают из нескольких источников.

**Product analytics**

Какой процент active users использует конкретные browser/version/device combinations? Для B2B особенно важно смотреть не
на глобальную статистику, а на собственных клиентов.

**Business requirements**

Один enterprise customer со старым managed browser может быть важнее 0.2% общей аудитории.

**Regulatory и accessibility requirements**

Государственные или финансовые продукты могут иметь дополнительные требования к environments и assistive technologies.

**Required Web APIs**

Если ключевая функция зависит от WebAuthn, camera, WebGL или другой capability, нужно проверить поддержку и качество
реализации, а не только browser version.

**Cost of support**

Каждый дополнительный environment увеличивает test matrix, polyfills, workarounds и incident surface. Support имеет
цену, поэтому legacy browser не должен сохраняться «навсегда по привычке».

После решения policy связывают с tooling: Browserslist/targets, transpilation, polyfills, CI/e2e matrix и QA devices. Но
Browserslist сам по себе не является продуктовой policy: он описывает технические targets, а не полный набор user
scenarios.

Полезно заранее определить критерий удаления browser version: например, usage ниже порога несколько месяцев и отсутствие
contractual клиентов. Изменение support лучше анонсировать, а не обнаруживать после случайного dependency upgrade.

На интервью хорошо показать product thinking: **browser matrix — результат данных, обязательств и стоимости, после чего
она превращается в конкретные build/test targets**.





#### Вопрос: Что такое graded browser support?

**Короткий ответ**

Graded browser support делит environments на уровни с разными гарантиями: например, full support, functional support и
unsupported/limited fallback. Это делает ожидания проверяемыми и не заставляет команду обещать одинаковый experience для
всех браузеров.

**Полный ответ**

Идея graded support — заменить бинарное «работает / не работает» несколькими **уровнями service contract**.

Пример:

| Tier        | Гарантия                                                                              |
| ----------- | ------------------------------------------------------------------------------------- |
| A           | Полный функционал, визуальная проверка, performance budget и регулярный e2e           |
| B           | Core flows и accessibility работают, minor visual differences допустимы               |
| C           | Readable content или explicit fallback без полного interactive experience             |
| Unsupported | Нет гарантии, показывается понятное требование обновить environment при необходимости |

Такой подход полезен, когда аудитория гетерогенна. Например, основной B2C трафик тестируется глубоко на актуальных
mobile Safari/Chrome, а редкий corporate browser сохраняет critical business flow без всех animation/performance
guarantees.

Tier должен описывать не название браузера, а **что именно команда проверяет**. Иначе «Tier B» превращается в красивую
метку без смысла.

Нужно также избегать вечного накопления tiers. Если environment почти не используется, поддержка должна иметь owner и
review date.

Graded support хорошо сочетается с progressive enhancement: lower tier может получить baseline, а richer capabilities
включаются в более сильных environments.

На интервью полезно сказать: **graded support управляет стоимостью compatibility через разные явные SLA опыта, а не
через случайный набор browser hacks**.





#### Вопрос: Когда компоненту нужна отдельная browser support policy?

**Короткий ответ**

Отдельная policy нужна, когда capability компонента уже общей матрицы приложения: camera, clipboard, WebGL, file system,
advanced drag-and-drop, heavy graphics или другой API с неодинаковой поддержкой. Тогда документируют feature detection,
fallback и environments, где гарантируется полный сценарий.

**Полный ответ**

Product-level support matrix не всегда достаточно. Страница может быть поддержана в Safari, но конкретный 3D editor,
camera scanner или advanced clipboard flow иметь более узкие технические требования.

Отдельная component/feature policy оправдана, если есть хотя бы одно из условий:

- зависимость от browser API с неоднородной поддержкой;
- существенная разница mobile/desktop input model;
- hardware requirement, например camera/GPU;
- performance threshold, без которого feature становится практически непригодной;
- permission model, которая сильно различается между environments;
- сложный fallback, который сам является отдельным продуктовым сценарием.

Например, общий продукт поддерживает iOS Safari, но bulk file editor требует File System Access API. Вместо ложного
«Safari unsupported» можно оставить приложение supported и дать editor другой flow: обычный `<input type="file">`,
download archive или server-side обработку.

Правильная реализация обычно использует **feature detection**, а не user-agent sniffing:

```js
if ('showOpenFilePicker' in window) {
  // enhanced flow
} else {
  // fallback
}
```

UA detection иногда нужен для известных engine bugs, но как основная capability model он хрупок.

Policy должна отвечать:

- где full experience;
- что является fallback;
- как сообщается недоступность;
- какие tests запускаются;
- кто владеет compatibility decision.

На интервью сильная мысль: **support матрица продукта описывает доступность продукта, а отдельная feature policy — более
узкий contract конкретной capability, не понижая без необходимости весь browser до unsupported**.





#### Вопрос: Почему HTML-парсер не падает на невалидной разметке?

**Короткий ответ**

HTML parser intentionally error-tolerant: спецификация задает deterministic tokenization, tree construction и error
recovery для множества невалидных случаев. Браузер строит исправленный DOM вместо того, чтобы прекращать отображение
страницы, поэтому DOM может отличаться от исходного source.

**Полный ответ**

HTML исторически должен был отображать огромный объем несовершенной разметки в интернете. Если бы одна ошибка закрытия
tag останавливала документ как строгий XML parser, web был бы значительно менее совместим.

Поэтому HTML parsing specification описывает не только valid syntax, но и **точные recovery rules**.

Например:

```html
<p>One</p>
<p>Two</p>
```

При встрече второго `p` parser автоматически закрывает предыдущий paragraph. В DOM получится два sibling `p`, хотя в
source нет явного `</p>` перед вторым.

Другой известный пример — таблицы: browser может добавить `tbody`, которого не было явно в source, или переставить nodes
из недопустимой позиции по правилам tree construction.

Это важно для разработки по нескольким причинам.

**DOM может не повторять source**

DevTools Elements показывает построенное tree, а View Source — исходный response.

**Невалидность не означает predictability**

«Браузер все исправит» — плохая стратегия. Recovery rules сложны, а разные контексты (`table`, `p`, formatting elements)
могут дать неожиданное tree.

**Framework hydration чувствительна к структуре**

Если server markup невалиден и parser перестроил DOM, client framework может получить hydration mismatch.

**Security/sanitization**

Нельзя проектировать sanitizer исходя из наивной строковой модели tags; parser behavior и DOM contexts имеют значение.

Поэтому validator/linter все еще полезен, хотя browser page визуально «работает».

На интервью стоит сказать: **HTML forgiving не потому, что ошибок нет, а потому что error recovery стандартизирован;
браузер продолжает parsing и строит определенный DOM, который иногда отличается от написанного source**.





#### Вопрос: Чем DOM отличается от HTML source?

**Короткий ответ**

HTML source — исходный текст документа. DOM — текущее объектное дерево после parsing/error recovery и последующих
изменений JavaScript. Поэтому View Source и DevTools Elements могут показывать разную структуру и значения.

**Полный ответ**

HTML source и DOM относятся к разным этапам жизни страницы.

**HTML source** — текст, полученный по сети или записанный в документ:

```html
<ul id="list"></ul>
```

**DOM** — объектная модель, созданная parser и доступная через JavaScript:

```js
const list = document.querySelector('#list');
list.append(document.createElement('li'));
```

После этого DOM содержит `li`, хотя исходный server response его не содержал.

DOM может отличаться от source еще до JavaScript из-за parser recovery:

- optional tags;
- автоматически созданные nodes;
- исправленная вложенность;
- нормализация HTML-specific structure.

После запуска приложения различие становится еще сильнее: Angular/React добавляют и удаляют nodes, меняют attributes,
рендерят portals/overlays и обновляют text.

Практическое следствие для debugging:

- **View Source / network response** отвечает «что прислал server?»;
- **Elements panel / DOM APIs** отвечает «что browser имеет сейчас?».

Это особенно важно при SSR/hydration. Если ошибка существует уже в server HTML, нужно смотреть response/source. Если она
появляется после bootstrap, нужен current DOM и framework lifecycle.

DOM также не равен accessibility tree: accessibility model строится на основе DOM, semantics, styles и ARIA, но может
скрывать часть nodes или представлять их другими roles.

На интервью полезная формула: **source — serialization на входе parser, DOM — live runtime model после parser и
JavaScript**.





#### Вопрос: Что такое preload, prefetch и preconnect?

**Короткий ответ**

`preload` заранее загружает важный ресурс текущей navigation, `prefetch` с низким приоритетом готовит вероятный ресурс
для будущей navigation, `preconnect` заранее выполняет connection setup к origin. Все hints нужно применять выборочно:
лишние hints расходуют bandwidth, sockets и конкурируют с critical resources.

**Полный ответ**

Resource hints решают разные части latency, поэтому их нельзя считать тремя вариантами одного и того же.

**`preload` — «этот ресурс нужен текущей странице скоро»**

```html
<link
  rel="preload"
  href="/fonts/inter.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

Browser начинает fetch раньше обычного discovery. `as` важен для приоритета, CSP и cache matching. Неправильный preload
может привести к двойной загрузке или забрать bandwidth у реально critical resource.

Типичные кандидаты: critical font, hero/LCP image или ресурс, который browser иначе обнаружит слишком поздно. Но preload
не должен превращаться в список всех assets страницы.

**`prefetch` — «этот ресурс, вероятно, пригодится позже»**

```html
<link
  rel="prefetch"
  href="/next-page.js"
/>
```

Обычно имеет более низкий priority и полезен для вероятной следующей navigation. Browser может игнорировать hint в
зависимости от network/policy.

**`preconnect` — «скоро понадобится этот origin»**

```html
<link
  rel="preconnect"
  href="https://cdn.example.com"
  crossorigin
/>
```

Он заранее выполняет DNS/TCP/TLS connection setup, но не загружает конкретный файл. Это полезно для действительно
критичного third-party origin. Preconnect ко всем возможным доменам тратит sockets и ресурсы.

Есть также `dns-prefetch`, который делает только DNS lookup и дешевле полного preconnect.

Hints — **подсказки browser scheduler**, а не абсолютные команды. Их эффективность нужно проверять через waterfall,
Performance panel и реальные Web Vitals. То, что ускоряет desktop broadband, может ухудшить constrained mobile network.

На интервью сильный ответ: **preload двигает fetch текущего critical resource раньше, prefetch готовит вероятное
будущее, preconnect сокращает connection latency; каждый hint имеет opportunity cost**.



### Forms



#### Вопрос: Как работает HTML form?

**Короткий ответ**

`form` объединяет form controls и описывает native submit flow. При отправке браузер запускает constraint validation,
собирает успешные controls в пары `name=value`, кодирует данные и отправляет их на `action` выбранным `method`, если
JavaScript не отменил submit.

**Полный ответ**

HTML form — не просто контейнер для `input`. Это browser primitive, который связывает controls, validation, submit
semantics и формирование запроса.

Простейший пример:

```html
<form
  action="/search"
  method="get"
>
  <label for="query">Поиск</label>
  <input
    id="query"
    name="q"
    required
  />
  <button type="submit">Найти</button>
</form>
```

Native submit можно запустить кнопкой `type="submit"`, Enter в подходящем control или методом `requestSubmit()`. Перед
сетевой отправкой браузер обычно:

1. определяет submitter — кнопку, которая инициировала отправку;
2. выполняет constraint validation, если она не отключена;
3. создает form data set только из успешных controls;
4. выбирает URL, method и encoding;
5. генерирует `submit` event;
6. если event не отменен, выполняет navigation/request.

В набор данных обычно попадают controls с `name`. Не отправляются, например, `disabled` controls, unchecked
checkbox/radio и controls без `name`.

JavaScript может перехватить flow:

```js
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  // отправить через fetch или обработать локально
});
```

Но даже SPA выигрывает от настоящего `form`: остаются Enter-to-submit, semantics, native validation и понятный contract
между controls.

Важно различать `form.submit()` и `form.requestSubmit()`: `requestSubmit()` имитирует обычную отправку с validation и
`submit` event, а `submit()` обходит эти шаги и используется заметно реже.

Backend всегда должен повторно валидировать и авторизовывать данные. DOM, hidden fields и client validation контролирует
пользователь.

На интервью полезная формула: **form — это встроенный protocol браузера для группировки controls, validation и submit;
JavaScript может расширить или перехватить этот flow, но не обязан реализовывать его с нуля**.





#### Вопрос: Что делают action и method у формы?

**Короткий ответ**

`action` задает destination отправки, а `method` — способ submit. Для обычной HTTP-отправки HTML form использует `get`
или `post`: GET кодирует данные в URL, POST отправляет их в request body. Submit button может переопределить настройки
через `formaction` и `formmethod`.

**Полный ответ**

`action` отвечает на вопрос **куда отправлять form data**, а `method` — **как сформировать submission**.

```html
<form
  action="/orders"
  method="post"
>
  <input name="comment" />
  <button type="submit">Создать</button>
</form>
```

Если `action` не задан, form отправляется на URL текущего документа. Для network submission основные методы HTML — GET и
POST.

**GET** сериализует данные в query string:

```text
/search?q=angular&page=2
```

**POST** помещает form payload в request body. Его формат задает `enctype`; типичный default —
`application/x-www-form-urlencoded`, а для upload используют `multipart/form-data`.

```html
<form
  action="/avatar"
  method="post"
  enctype="multipart/form-data"
>
  <input
    type="file"
    name="avatar"
  />
  <button type="submit">Загрузить</button>
</form>
```

У submit buttons есть полезный override contract:

```html
<button type="submit">Сохранить</button>
<button
  type="submit"
  formaction="/preview"
  formmethod="post"
>
  Preview
</button>
```

Это позволяет одной форме иметь несколько осмысленных submit actions без ручного click-handler для каждой кнопки.

У `method` также существует `dialog` для form внутри `<dialog>`: он закрывает dialog и не делает обычный HTTP request.

HTML form не умеет напрямую отправлять `PUT`, `PATCH` или `DELETE`. Для них обычно используют JavaScript/fetch или
server-side method override.

И главное: method не является security boundary. POST не скрывает данные от сети без HTTPS и не заменяет authentication,
authorization или CSRF protection.

На интервью достаточно связать `action` с destination, `method` с HTTP semantics и упомянуть `enctype`/submitter
overrides как практические детали.





#### Вопрос: Чем GET form отличается от POST form?

**Короткий ответ**

GET подходит для безопасных операций вроде поиска и фильтров: параметры становятся частью URL, который можно сохранить,
скопировать и повторить. POST отправляет данные в body и обычно используется для изменений состояния. Ни POST, ни GET не
заменяют HTTPS, validation и authorization.

**Полный ответ**

Разница важнее, чем просто «query string против body»: выбор должен отражать **семантику операции**.

GET используют для чтения и поиска, которые не должны менять значимое server state:

```html
<form
  action="/catalog"
  method="get"
>
  <input name="query" />
  <button type="submit">Искать</button>
</form>
```

Получается URL вроде:

```text
/catalog?query=monitor
```

Плюсы GET для такого сценария:

- URL можно bookmark/share;
- browser history естественно хранит состояние фильтра;
- navigation можно повторять;
- HTTP caches и crawlers понимают read semantics лучше.

POST обычно выбирают для создания сущности, команды или передачи большого payload:

```html
<form
  action="/orders"
  method="post"
>
  ...
</form>
```

Но есть важные ограничения.

**POST не означает «секретно».** Body виден client tools, server logs/proxies могут его записывать, а транспорт защищает
HTTPS.

**GET не должен менять состояние.** Prefetcher, crawler или пользователь, повторив URL, не должен случайно удалить
запись или провести платеж.

**POST не гарантирует idempotency.** Double submit может создать два заказа, поэтому критические операции часто требуют
idempotency key или server-side deduplication.

**Метод не заменяет security.** И GET, и POST требуют server validation, authentication/authorization; state-changing
requests дополнительно проектируют с учетом CSRF.

На интервью сильный ответ: **GET моделирует безопасное чтение и делает параметры частью адреса ресурса, POST моделирует
submission/command; security определяется не тем, где лежат параметры**.





#### Вопрос: Почему специализированные типы input полезнее text?

**Короткий ответ**

`email`, `number`, `date`, `url`, `tel`, `search`, `checkbox` и другие типы дают браузеру больше смысла: подходящий UI,
mobile keyboard, value model и часть native validation. Но browser behavior различается, а server validation все равно
обязательна.

**Полный ответ**

`type` сообщает браузеру **какие данные ожидаются и какое native behavior можно дать пользователю**.

```html
<input
  type="email"
  name="email"
  autocomplete="email"
/>
<input
  type="date"
  name="birthday"
/>
<input
  type="number"
  name="count"
  min="1"
  max="10"
/>
```

Преимущества специализированных типов:

- подходящая экранная клавиатура на mobile;
- встроенные controls, например date picker;
- type-specific validation;
- корректный value contract;
- лучшее autofill поведение;
- дополнительная semantics для tooling и assistive technologies.

Но `type` нужно выбирать по **модели данных**, а не по желаемой клавиатуре. Например, телефон, ZIP code или номер карты
часто являются строками, а не числами: ведущие нули и формат имеют смысл. Для keyboard hint можно использовать
`inputmode`:

```html
<input
  name="otp"
  inputmode="numeric"
  autocomplete="one-time-code"
/>
```

`input type="number"` имеет собственные нюансы: stepper UI, `min/max/step`, locale-specific input и value parsing. Он не
является универсальным способом запретить все нецифровые символы.

Date/time controls также могут визуально различаться между браузерами и OS. Если product требует custom picker, native
input semantics и validation все равно стоит учитывать.

Client type validation нельзя считать security: request можно отправить напрямую, не используя форму.

На интервью полезно сказать: **specialized type переносит часть UX и validation в platform, но type должен отражать
семантику данных, а не заменять domain validation**.





#### Вопрос: Что такое label и как связать его с control?

**Короткий ответ**

`label` задает form control понятное имя и увеличивает clickable area. Надежный вариант — связать `label[for]` с
уникальным `id` control; также control можно вложить внутрь `label`.

**Полный ответ**

Form field должен иметь понятное **accessible name**, и для большинства обычных inputs лучший primitive — настоящий
`label`.

Явная связь:

```html
<label for="email">Email</label>
<input
  id="email"
  name="email"
  type="email"
/>
```

`for` содержит `id` control. При клике на label browser переводит focus/activation к связанному control, что особенно
полезно для checkbox и radio с маленькой визуальной областью.

Возможна implicit association:

```html
<label>
  Email
  <input
    name="email"
    type="email"
  />
</label>
```

Явная связь часто удобнее в component layout, потому что label и input могут находиться в разных wrappers.

Label — не место для длинной инструкции. Дополнительную подсказку обычно выводят отдельно и связывают через
`aria-describedby`:

```html
<label for="password">Пароль</label>
<input
  id="password"
  aria-describedby="password-hint"
/>
<p id="password-hint">Минимум 12 символов</p>
```

`aria-label` может дать accessible name icon-only/custom control, но для обычного видимого поля он хуже настоящей
видимой подписи: пользователь тоже должен понимать назначение control.

В component library важно проверить, что генерируемые `id` уникальны и wrapper-компонент не разрывает association.

На интервью: **label дает не просто текст рядом с input, а программно определимую связь между названием и control**.





#### Вопрос: Почему placeholder не должен заменять label?

**Короткий ответ**

Placeholder — временная подсказка внутри поля: он исчезает при вводе, может иметь слабый contrast и не является надежной
заменой постоянному accessible name. Его используют для примера значения, а назначение control задают label.

**Полный ответ**

UI вида

```html
<input placeholder="Email" />
```

выглядит компактно, но теряет важную информацию сразу после того, как пользователь начал вводить значение.

Проблемы placeholder-as-label:

- пользователь перестает видеть, что означает поле;
- трудно сравнить несколько заполненных fields;
- placeholder часто стилизуют менее контрастно;
- assistive technology behavior исторически неоднородно;
- текст внутри поля легко спутать с уже введенным значением;
- autofill может заполнить поле, оставив интерфейс без видимой подписи.

Правильнее:

```html
<label for="phone">Телефон</label>
<input
  id="phone"
  name="phone"
  placeholder="+372 5555 5555"
/>
```

Здесь label отвечает **что это**, placeholder — **пример формата**.

Floating label pattern допустим, если подпись действительно остается видимой и программно связанной с control после
ввода, а не просто является placeholder с CSS-анимацией.

Если пример или инструкция важны для успешного ввода, их лучше не прятать в placeholder вообще: постоянный hint рядом с
полем устойчивее.

На интервью хороший ответ связывает placeholder не только с accessibility, но и с memory load: **пользователю не нужно
помнить назначение уже заполненного поля**.





#### Вопрос: Для чего нужен name у form control?

**Короткий ответ**

`name` задает ключ control при native form submission и используется для группировки radio buttons. Control без `name`
обычно не попадает в form data set, даже если у него есть `id`.

**Полный ответ**

`id` и `name` решают разные задачи:

- `id` идентифицирует DOM element и связывает его, например, с `label[for]`;
- `name` участвует в **form data contract**.

```html
<label for="email">Email</label>
<input
  id="email"
  name="email"
  value="user@example.com"
/>
```

При submit получится примерно:

```text
email=user%40example.com
```

Если убрать `name`, визуально поле продолжит работать, но browser не включит его значение в native submission/FormData.

Некоторые controls имеют дополнительные правила:

- unchecked checkbox не отправляется;
- checked checkbox без явного `value` обычно передает default value `on`;
- radio buttons с одинаковым `name` образуют одну группу и передают value выбранного варианта;
- `disabled` control не является successful control и не отправляется;
- несколько controls могут иметь одинаковый `name`, тогда form data содержит несколько значений.

Это полезно и без network submit:

```js
const data = new FormData(form);
console.log(data.get('email'));
```

Не стоит использовать `name` как security или globally unique identifier. Client может изменить любое значение перед
request.

На интервью формула: **`id` связывает DOM, `name` связывает control с form payload**.





#### Вопрос: Что такое native validation?

**Короткий ответ**

Constraint Validation API позволяет браузеру проверять `required`, type constraints, `min/max`, `minlength/maxlength`,
`pattern`, `step` и другие правила перед submit. Это UX-слой, а не security boundary: backend должен валидировать данные
заново.

**Полный ответ**

HTML controls умеют участвовать во встроенной constraint validation.

```html
<input
  type="email"
  name="email"
  required
  maxlength="120"
/>
```

Browser вычисляет `validity` и может заблокировать native submit, если control нарушает constraint.

Основные состояния доступны через `ValidityState`: `valueMissing`, `typeMismatch`, `patternMismatch`, `tooShort`,
`rangeUnderflow`, `stepMismatch` и другие.

JavaScript API:

```js
input.checkValidity();
input.reportValidity();
input.setCustomValidity('Такой email уже используется');
```

`setCustomValidity()` нужно затем сбросить пустой строкой, иначе control продолжит считаться invalid.

Validation можно отключить у всей формы через `novalidate` или для конкретной submit button через `formnovalidate`.

CSS получает useful pseudo-classes вроде `:valid`, `:invalid`, `:user-valid`/`:user-invalid` там, где они
поддерживаются. Но показывать красные ошибки на первом render обычно плохой UX: validation должна учитывать момент
взаимодействия.

Native messages и UI зависят от browser/locale, поэтому design system иногда показывает собственные сообщения, но это не
обязывает выбрасывать platform validity model.

Самое важное ограничение: пользователь может удалить attributes в DevTools или отправить request напрямую. Server
validation проверяет domain rules, consistency и authorization независимо от client.

На интервью сильная мысль: **native validation дает бесплатный baseline и API для UX, но доверенной остается только
server-side проверка**.





#### Вопрос: Для чего нужен autocomplete?

**Короткий ответ**

`autocomplete` сообщает браузеру назначение поля: `name`, `email`, `username`, `current-password`, `new-password`,
`one-time-code`, `shipping` и другие tokens. Это улучшает autofill, password managers и доступность, если tokens
отражают реальный смысл данных.

**Полный ответ**

Browser не должен угадывать назначение каждого поля только по placeholder или CSS. `autocomplete` дает машинно-читаемый
hint.

```html
<input
  name="email"
  autocomplete="email"
/>
<input
  type="password"
  name="password"
  autocomplete="current-password"
/>
```

Для регистрации:

```html
<input
  name="username"
  autocomplete="username"
/>
<input
  type="password"
  name="password"
  autocomplete="new-password"
/>
```

Для адресов tokens можно уточнять контекстом `shipping`/`billing`, а `section-*` помогает различать несколько одинаковых
наборов fields на одной странице.

Плюсы:

- меньше ручного ввода;
- меньше опечаток;
- лучшее password-manager behavior;
- полезно пользователям с моторными или когнитивными ограничениями;
- mobile browser может предложить OTP через `one-time-code`.

`autocomplete="off"` не является надежным security mechanism: браузеры и password managers могут сознательно
игнорировать его для credentials, чтобы не поощрять слабые password practices.

Не стоит ставить неверный token ради желаемого UI: autofill может подставить чувствительные данные не в то поле.

На интервью: **autocomplete — semantic contract с browser autofill, а не просто on/off switch**.





#### Вопрос: Как сделать accessible error message для поля?

**Короткий ответ**

Ошибка должна быть конкретной, видимой и программно связанной с control, например через `aria-describedby`; invalid
state можно обозначить `aria-invalid="true"`. После submit нужен понятный focus/error-summary strategy, но focus не
стоит дергать на каждую ошибку во время ввода.

**Полный ответ**

Плохая ошибка сообщает только «неверное значение» или меняет цвет border. Хорошая отвечает **что не так и как
исправить**.

```html
<label for="email">Email</label>
<input
  id="email"
  name="email"
  aria-invalid="true"
  aria-describedby="email-error"
/>
<p id="email-error">Введите адрес в формате name@example.com</p>
```

Здесь сообщение:

- видно всем пользователям;
- связано с input в accessibility tree;
- не полагается только на цвет;
- содержит actionable instruction.

Если у поля одновременно hint и error, `aria-describedby` может ссылаться на оба ids.

После submit длинной формы полезен error summary с links к проблемным fields. Обычно focus переводят в summary или
первый invalid control **один раз после неуспешной отправки**, а не скачут focus-ом на каждом `input` event.

Для динамического появления ошибки live region используют осторожно. Если каждое нажатие клавиши вызывает assertive
announcement, screen reader experience становится шумным. Часто достаточно связи через description и сообщения после
blur/submit.

`aria-invalid` не выполняет validation само: это только accessibility state. Domain validation и business rules остаются
в коде/server.

На интервью полезно перечислить три слоя: **визуальное сообщение + programmatic relation + разумное focus/announcement
behavior**.





#### Вопрос: Почему disabled field не отправляется вместе с формой?

**Короткий ответ**

`disabled` control исключается из focus order, constraint validation и набора успешных controls при submit. Это часть
HTML semantics: disabled значение считается недоступным для взаимодействия, поэтому browser не включает его в form data.

**Полный ответ**

```html
<input
  name="plan"
  value="pro"
  disabled
/>
```

Визуально значение есть в DOM, но native submission не отправит `plan=pro`.

Это часто удивляет при форме редактирования: разработчик disables поле, чтобы запретить изменение, а backend перестает
получать значение.

Если значение должно быть отправлено, нужно выбрать подходящую модель:

- `readonly` для поддерживаемых текстовых controls, если пользователь должен видеть и отправлять значение;
- отдельный hidden control, если payload действительно требует это поле;
- лучше всего — server может сам восстановить trusted значение из сущности/session вместо доверия client.

```html
<input
  value="PRO"
  readonly
/>
<input
  type="hidden"
  name="planId"
  value="42"
/>
```

Hidden field **не становится защищенным**: его легко изменить через DevTools/request. Например, цену или роль нельзя
доверять только потому, что input скрыт или disabled.

`fieldset disabled` распространяет disabled state на большинство потомков; содержимое первого `legend` имеет специальное
исключение для взаимодействия.

На интервью сильный ответ: **disabled означает не только внешний вид, а исключение control из interaction и submission
model**.





#### Вопрос: Чем disabled отличается от readonly?

**Короткий ответ**

`disabled` control нельзя использовать, он обычно не получает focus и не отправляется. `readonly` применяется только к
поддерживаемым text-like controls: значение нельзя редактировать обычным вводом, но control остается focusable и
отправляется с формой.

**Полный ответ**

Оба состояния могут визуально означать «нельзя менять», но contract у них разный.

```html
<input
  name="id"
  value="A-42"
  readonly
/>
<input
  name="internal"
  value="secret"
  disabled
/>
```

**`disabled`:**

- control недоступен для обычного interaction;
- не участвует в Tab navigation в стандартном случае;
- не участвует в constraint validation;
- не входит в native form submission;
- поддерживается многими form controls.

**`readonly`:**

- пользователь не может изменить значение обычным вводом;
- control остается focusable;
- значение отправляется;
- readonly control не участвует в constraint validation;
- attribute применим к ограниченному набору controls, главным образом text-like `input` и `textarea`.

У checkbox, radio, select или button нет эквивалентного native `readonly`. Если product хочет «показывать выбор, но не
давать менять», иногда лучше вывести обычный текст вместо fake-disabled interactive control.

Еще один UX trade-off: disabled control часто имеет низкий contrast и не позволяет пользователю скопировать значение.
Readonly поле может быть лучше, если данные полезно выделить/copy.

Ни `disabled`, ни `readonly` не являются authorization. Client может создать собственный request с любым значением.

На интервью: **disabled убирает control из формы как активный участник; readonly сохраняет его как отправляемое
значение, но запрещает редактирование**.





#### Вопрос: Для чего нужны fieldset и legend?

**Короткий ответ**

`fieldset` семантически группирует связанные form controls, а `legend` дает группе общее название. Это особенно важно
для radio/checkbox groups, где отдельные labels называют варианты, но не объясняют общий вопрос.

**Полный ответ**

Представим группу:

```html
<fieldset>
  <legend>Способ доставки</legend>

  <label>
    <input
      type="radio"
      name="delivery"
      value="courier"
    />
    Курьер
  </label>
  <label>
    <input
      type="radio"
      name="delivery"
      value="pickup"
    />
    Самовывоз
  </label>
</fieldset>
```

Каждый radio имеет свой label, но `legend` сообщает контекст всей группы: **что именно пользователь выбирает**. Screen
reader может объявлять group name вместе с вариантами.

`fieldset` полезен не только для radio: им группируют связанные addresses, contact preferences или набор checkbox, если
группа имеет общий вопрос.

Есть и behavior: `fieldset disabled` disabled большинство form controls внутри группы. Это удобный native способ
заблокировать целый section формы.

```html
<fieldset disabled>
  <legend>Дополнительные настройки</legend>
  ...
</fieldset>
```

При этом спецификация имеет special case для descendants первого `legend`, поэтому не стоит моделировать disabled logic
только по внешнему виду.

Не каждый визуальный card должен становиться fieldset. Если внутри нет логически связанной группы form controls, обычный
container корректнее.

В design system важно не потерять `<legend>` при создании красивого group component: визуальный title и semantic group
name должны оставаться связанными.

На интервью: **label называет конкретный control, legend — вопрос/назначение группы controls**.





#### Вопрос: Как группировать radio buttons?

**Короткий ответ**

Radio buttons одного выбора получают одинаковый `name`, уникальные `id`, собственные `value` и labels. Группу обычно
оборачивают в `fieldset` с `legend`; native radio уже дает взаимное исключение и ожидаемую keyboard navigation.

**Полный ответ**

Правильная native группа:

```html
<fieldset>
  <legend>Тема</legend>

  <input
    id="theme-light"
    type="radio"
    name="theme"
    value="light"
    checked
  />
  <label for="theme-light">Светлая</label>

  <input
    id="theme-dark"
    type="radio"
    name="theme"
    value="dark"
  />
  <label for="theme-dark">Темная</label>
</fieldset>
```

Главное правило — **одинаковый `name`**. Browser гарантирует, что в группе выбран максимум один radio, а submit передает
value выбранного варианта:

```text
theme=dark
```

`id` нужен для label association и должен быть уникальным, а `value` должен быть стабильным machine-readable contract,
не обязательно совпадающим с локализованным текстом label.

Если выбор обязателен, `required` на radio делает обязательной группу с этим `name`; на практике достаточно constraint
на одном из controls группы.

Native radios также имеют ожидаемое keyboard behavior: Tab входит в группу, arrow keys меняют selection согласно
browser/platform conventions. При custom styling лучше визуально скрывать native input корректным способом, а не
заменять его набором `div` с ручным ARIA без необходимости.

Если options можно выбирать несколько одновременно, это уже checkbox group, а не radios.

На интервью сильная формулировка: **`name` создает логическую radio group, `value` описывает выбранный вариант,
`fieldset/legend` добавляют общий доступный контекст**.
