# Angular — вопросы и ответы, часть 5

> Автоматически сгенерировано из src/pages/angular/index.md. Не редактируйте вручную.

### Security



#### Вопрос: Что такое OWASP?

**Короткий ответ**

OWASP - открытое сообщество и набор практических материалов по безопасности приложений. Frontend-разработчику полезны
OWASP Top 10, ASVS и Cheat Sheet Series.

**Полный ответ**

OWASP - открытое сообщество и набор практических материалов по безопасности приложений. Frontend-разработчику полезны
OWASP Top 10, ASVS и Cheat Sheet Series.

Это не scanner и не готовая сертификация, а база рисков, требований и рекомендаций.





#### Вопрос: Что такое XSS и как Angular защищает от XSS?

**Короткий ответ**

XSS, или Cross-Site Scripting, - атака, при которой злоумышленник добивается выполнения своего JavaScript в контексте
чужого сайта. Если такой код запустился, он выполняется как код этого сайта: может читать данные страницы, вызывать API
от имени пользователя и использовать обычные browser-возможности текущего origin.

**Полный ответ**

XSS, или Cross-Site Scripting, - атака, при которой злоумышленник добивается выполнения своего JavaScript в контексте
чужого сайта. Если такой код запустился, он выполняется как код этого сайта: может читать данные страницы, вызывать API
от имени пользователя и использовать обычные browser-возможности текущего origin.

Ожидаемый ответ на собеседовании: XSS возникает, когда пользовательская строка попадает в HTML/JavaScript context как
код, а не как данные. Самый простой пример без Angular - ручная вставка строки через `innerHTML`.

```js
const comment = new URLSearchParams(location.search).get('comment');

document.querySelector('#comments').innerHTML = comment;
```

Если пользователь откроет учебную ссылку:

```text
https://example.com?comment=<img src=x onerror="alert('XSS')">
```

браузер может распарсить значение `comment` как HTML и выполнить inline handler. Проблема не в `URLSearchParams`, а в
том, что значение из URL без проверки стало частью DOM как HTML.

Ожидаемый ответ на вопрос про `innerHTML`: `innerHTML` опасен тем, что парсит строку как HTML-разметку. Поэтому
пользовательская строка может превратиться в элемент, attribute, URL, inline handler или другой исполняемый browser
context. Даже если `<script>` в конкретном месте не выполнится, остаются другие опасные HTML-конструкции, поэтому нельзя
считать `innerHTML` безопасным для пользовательского ввода.

Безопаснее использовать `textContent`, когда нужно показать именно текст:

```js
const comment = new URLSearchParams(location.search).get('comment');

document.querySelector('#comments').textContent = comment;
```

Ожидаемый ответ на вопрос про `textContent`: `textContent` вставляет строку как текстовое содержимое node. Символы `<`,
`>`, кавычки и другие специальные символы не становятся HTML-разметкой, поэтому строка остается данными. Экранирование
работает по той же идее: оно не дает пользовательской строке перейти из data context в code context.

Angular по умолчанию защищает самые частые места вывода данных:

- interpolation `{{ value }}` выводит текст, а не HTML. Строка `<script>alert(1)</script>` будет показана как текст и не
  выполнится;
- property binding учитывает security context. Например, `[href]`, `[src]`, `[style]` и `[innerHTML]` проходят разные
  проверки;
- `[innerHTML]` не просто вставляет строку в DOM, а пропускает HTML через Angular sanitization и удаляет опасные части,
  например `script` и inline event handlers;
- Angular sanitization снижает риск, но не превращает произвольный пользовательский HTML в полностью безопасный формат.

Ожидаемый ответ на вопрос про Angular interpolation: `{{ comment }}` безопаснее ручной вставки HTML, потому что Angular
выводит значение как текст и экранирует опасные символы для HTML context.

```html
<div>{{ comment }}</div>
```

Такой binding подходит для комментариев, имен пользователей, заголовков и других обычных строк. Если `comment` равен
`<img src=x onerror="alert('XSS')">`, пользователь увидит текст, а не выполняемый HTML.

Ожидаемый ответ на вопрос про `[innerHTML]`: `[innerHTML]` допустим, когда приложение осознанно показывает
форматированный HTML: например, заранее проверенную статью из CMS, результат trusted markdown-пайплайна или HTML,
прошедший server-side sanitization по allowlist. Даже в этом случае нужно понимать, какие tags и attributes разрешены, и
желательно дополнительно использовать CSP.

```html
<div [innerHTML]="comment"></div>
```

Такой binding опасен, если `comment` - пользовательский ввод, параметр URL, текст из формы, непроверенный ответ внешнего
API или HTML из CMS без строгой очистки. Angular sanitizer удалит часть опасных конструкций, но разработчик все равно
перевел значение из простого text context в HTML context и расширил поверхность атаки.

Опасное место - `DomSanitizer.bypassSecurityTrustHtml`. Этот метод говорит Angular: "я уже проверил это значение, не
санитизируй его". Если туда попала строка от пользователя, CMS, markdown-parser или внешнего API без строгой серверной
очистки, защита Angular фактически отключается.

```ts
import {inject} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

export class ArticleComponent {
  private readonly sanitizer = inject(DomSanitizer);

  // Плохо: нельзя доверять HTML, который пришел от пользователя или внешнего API.
  readonly trustedHtml = this.sanitizer.bypassSecurityTrustHtml(this.articleFromApi.html);
}
```

Особенно опасно применять `bypassSecurityTrustHtml` к пользовательскому вводу:

```ts
this.sanitizer.bypassSecurityTrustHtml(comment);
```

Ожидаемый ответ: `bypassSecurityTrustHtml` - не sanitizer, а явное отключение sanitizer для конкретного значения. Его
можно использовать только для HTML, который создан приложением или прошел доверенную очистку до попадания в Angular. Для
комментариев, профилей, query params и HTML из непроверенного источника этот метод применять нельзя.

Ожидаемый ответ на вопрос про обход CSRF: XSS часто опаснее CSRF, потому что XSS-код выполняется уже внутри
`mysite.com`. Для браузера это same-origin JavaScript, а не запрос с чужого сайта. Поэтому такой код может читать
обычные cookie этого домена, получать DOM-данные и отправлять requests с теми же правами, что и легитимный frontend.

Учебный пример:

```js
fetch('/api/change-email', {
  method: 'POST',
  headers: {
    'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({email: 'attacker@example.com'}),
});
```

Если CSRF-token хранится в обычной cookie, которую должен читать frontend, XSS-код на этом же origin тоже может ее
прочитать и отправить header. `HttpOnly` защищает session cookie от чтения через JavaScript, но не отменяет XSS-риск
полностью: браузер все равно приложит session cookie к same-origin запросу, а вредный код сможет инициировать действие
от имени текущего пользователя. Поэтому CSRF-token, `SameSite` и `HttpOnly` важны, но они не заменяют защиту от XSS.

Backend тоже обязан участвовать в защите:

- валидировать входные данные и не хранить опасный HTML без необходимости;
- санитизировать пользовательский HTML allowlist-подходом, если форматированный HTML действительно нужен;
- экранировать данные при server-side rendering, генерации писем и HTML-страниц;
- отдавать Content Security Policy и по возможности включать Trusted Types;
- не возвращать секреты и долгоживущие токены в доступные JavaScript данные.





#### Вопрос: Что такое CSRF?

**Короткий ответ**

CSRF, или Cross-Site Request Forgery, - атака, при которой злоумышленник заставляет браузер авторизованного пользователя
отправить запрос на доверенный сайт.

**Полный ответ**

CSRF, или Cross-Site Request Forgery, - атака, при которой злоумышленник заставляет браузер авторизованного пользователя
отправить запрос на доверенный сайт.

Типичный сценарий:

1. Пользователь залогинен на `mysite.com`, а сессия хранится в cookie.
2. В этой же browser-сессии он открывает `bad-site.com`.
3. Плохой сайт не может прочитать cookie `mysite.com`: browser same-origin policy это запрещает.
4. Но плохой сайт может инициировать запрос на `https://mysite.com/api/transfer`.
5. Браузер автоматически приложит подходящие cookie `mysite.com` к запросу на `mysite.com`.

Если backend проверяет только наличие session cookie и не проверяет CSRF-token, `Origin`/`Referer` или `SameSite`,
запрос может выглядеть как действие настоящего пользователя.

CORS не является полноценной CSRF-защитой. CORS в первую очередь ограничивает чтение ответа JavaScript-кодом из другого
origin. Он не гарантирует, что state-changing request вообще не уйдет на сервер. Кроме того, простые requests могут быть
отправлены без preflight, а HTML-формы исторически умеют отправлять cross-site POST. Поэтому backend должен отдельно
защищать операции изменения состояния.





#### Вопрос: Когда создается CSRF-token?

**Короткий ответ**

CSRF-token создает backend. Обычно token появляется в один из моментов:

**Полный ответ**

CSRF-token создает backend. Обычно token появляется в один из моментов:

- при первом открытии сайта, когда сервер создает anonymous/session context;
- при логине, вместе с пользовательской сессией;
- через отдельный endpoint, например `GET /api/csrf`, если SPA сначала должна получить token перед mutating requests.

Token должен быть случайным, достаточно длинным и непредсказуемым. Обычно он привязан к server-side session или к
подписанному session context. Нельзя использовать захардкоженную строку вроде `csrf-token`, потому что злоумышленник
сможет отправить такой же header.

Пример идеи на backend:

```ts
app.get('/api/csrf', (request, response) => {
  const token = crypto.randomUUID();

  request.session.csrfToken = token;
  response.cookie('XSRF-TOKEN', token, {
    sameSite: 'lax',
    secure: true,
  });
  response.sendStatus(204);
});
```

В реальном приложении лучше использовать проверенную CSRF-библиотеку или framework middleware, потому что там уже учтены
rotation, session lifecycle и edge cases.





#### Вопрос: Как CSRF-защита выглядит в Angular?

**Короткий ответ**

Angular HttpClient умеет читать CSRF-token из cookie и отправлять его в отдельном header. В standalone-конфигурации это
настраивается через provideHttpClient и withXsrfConfiguration.

**Полный ответ**

Angular `HttpClient` умеет читать CSRF-token из cookie и отправлять его в отдельном header. В standalone-конфигурации
это настраивается через `provideHttpClient` и `withXsrfConfiguration`.

```ts
import {provideHttpClient, withXsrfConfiguration} from '@angular/common/http';

export const appConfig = {
  providers: [
    provideHttpClient(
      withXsrfConfiguration({
        cookieName: 'XSRF-TOKEN',
        headerName: 'X-XSRF-TOKEN',
      }),
    ),
  ],
};
```

При такой схеме:

- сервер выставляет cookie `XSRF-TOKEN`;
- Angular читает значение cookie;
- Angular добавляет header `X-XSRF-TOKEN` к mutating HTTP-запросам, для которых работает его XSRF-механизм;
- сервер сравнивает header с ожидаемым token и отклоняет запрос, если token отсутствует или не совпадает.

Важно: Angular не генерирует CSRF-token и не решает, валиден ли он. Он только переносит значение из cookie в header.
Генерация, привязка к сессии, срок жизни и проверка token - ответственность backend.





#### Вопрос: Что такое CSP?

**Короткий ответ**

CSP, или Content Security Policy, - HTTP header, который сообщает браузеру, откуда можно загружать scripts, styles,
images, fonts, frames и другие ресурсы. CSP снижает риск XSS: даже если в HTML попал вредоносный fragment, строгая
policy может запретить inline script или загрузку script с неизвестного домена.

**Полный ответ**

CSP, или Content Security Policy, - HTTP header, который сообщает браузеру, откуда можно загружать scripts, styles,
images, fonts, frames и другие ресурсы. CSP снижает риск XSS: даже если в HTML попал вредоносный fragment, строгая
policy может запретить inline script или загрузку script с неизвестного домена.

Минимальный пример:

```http
Content-Security-Policy: default-src 'self'; script-src 'self'
```

На практике policy часто шире: добавляют `style-src`, `img-src`, `connect-src`, `frame-ancestors`, reporting и nonce для
разрешенных inline scripts. CSP не заменяет escaping, sanitization и backend validation, но добавляет важный защитный
слой.





#### Вопрос: Как использовать Json Web Tokens для аутентификации при разработке на Angular?

**Короткий ответ**

После входа сервер выдает access token, а клиент прикладывает его к API-запросам:

**Полный ответ**

После входа сервер выдает access token, а клиент прикладывает его к API-запросам:

```ts
export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = inject(AuthService).accessToken();

  return next(token ? request.clone({setHeaders: {Authorization: `Bearer ${token}`}}) : request);
};
```

JWT состоит из header, payload и signature. Payload кодируется, но не шифруется, поэтому туда нельзя помещать секреты.

Практическая схема:

- короткоживущий access token хранится в памяти;
- refresh token безопаснее хранить в `HttpOnly`, `Secure`, `SameSite` cookie;
- refresh выполняется централизованно, с защитой от нескольких параллельных refresh-запросов;
- logout очищает сессию на сервере и локальное состояние;
- авторизацию всегда проверяет backend.

Route guard улучшает UX, но не является границей безопасности. Хранение долгоживущего токена в `localStorage` повышает
последствия XSS.





#### Вопрос: Чем cookie, HttpOnly cookie и LocalStorage отличаются с точки зрения безопасности?

**Короткий ответ**

localStorage доступен JavaScript-коду страницы. Это удобно для простого persistence, но опасно для секретов: при XSS
вредоносный script сможет прочитать token и отправить его злоумышленнику.

**Полный ответ**

`localStorage` доступен JavaScript-коду страницы. Это удобно для простого persistence, но опасно для секретов: при XSS
вредоносный script сможет прочитать token и отправить его злоумышленнику.

Обычная cookie доступна JavaScript через `document.cookie` в рамках своего domain/path и автоматически прикладывается
браузером к подходящим HTTP-запросам. Автоматическая отправка полезна для session cookies, но создает CSRF-риск, если
нет `SameSite` и anti-CSRF token.

`HttpOnly` cookie недоступна через `document.cookie`, поэтому XSS не может напрямую прочитать ее значение. Но браузер
все равно автоматически отправляет такую cookie на подходящий domain. Поэтому `HttpOnly` снижает риск кражи token через
XSS, но не отменяет CSRF-защиту.

CSRF-token cookie часто делают не `HttpOnly`, потому что Angular должен прочитать ее и отправить значение в
`X-XSRF-TOKEN`. При этом session cookie, например refresh token, наоборот обычно должна быть `HttpOnly`, `Secure` и
`SameSite`.





#### Вопрос: Что такое authorization check на backend?

**Короткий ответ**

Authorization check - серверная проверка, имеет ли текущий пользователь право выполнить действие или прочитать ресурс.
Frontend guards, скрытые кнопки и disabled controls улучшают UX, но не являются защитой: пользователь может вызвать API
напрямую через browser devtools, curl или измененный frontend.

**Полный ответ**

Authorization check - серверная проверка, имеет ли текущий пользователь право выполнить действие или прочитать ресурс.
Frontend guards, скрытые кнопки и disabled controls улучшают UX, но не являются защитой: пользователь может вызвать API
напрямую через browser devtools, curl или измененный frontend.

Backend обязан проверять права на каждый чувствительный endpoint. Классический пример IDOR:

```http
GET /api/users/123
```

Если пользователь с id `456` меняет URL на `/api/users/123`, сервер не должен возвращать чужой профиль только потому,
что request содержит валидную session cookie или JWT. Нужно проверить не только "кто пользователь", но и "имеет ли он
доступ именно к этому ресурсу".

```ts
app.get('/api/users/:id', requireAuth, async (request, response) => {
  const requestedUserId = request.params.id;

  if (request.user.id !== requestedUserId && !request.user.roles.includes('admin')) {
    response.sendStatus(403);
    return;
  }

  response.json(await usersService.findPublicProfile(requestedUserId));
});
```





#### Вопрос: Почему CORS не является authentication и authorization?

**Короткий ответ**

CORS, или Cross-Origin Resource Sharing, - browser mechanism, который определяет, может ли JavaScript с одного origin
прочитать ответ от другого origin. Сервер управляет этим через Access-Control-Allow-Origin,
Access-Control-Allow-Methods, Access-Control-Allow-Headers и связанные headers.

**Полный ответ**

CORS, или Cross-Origin Resource Sharing, - browser mechanism, который определяет, может ли JavaScript с одного origin
прочитать ответ от другого origin. Сервер управляет этим через `Access-Control-Allow-Origin`,
`Access-Control-Allow-Methods`, `Access-Control-Allow-Headers` и связанные headers.

Главная мысль: CORS ограничивает чтение ответа браузером, а не заменяет authentication и authorization. Если endpoint
доступен без проверки прав, правильные CORS headers его не спасут. Если пользователь авторизован cookie, browser может
отправить запрос на нужный domain, поэтому для mutating операций все равно нужна CSRF-защита.

`origin: '*'` опасен для приватного API, потому что разрешает любому сайту читать ответы, если browser request проходит
остальные условия. Для API с пользовательскими данными нужно явно перечислять доверенные origins и аккуратно работать с
credentials.

```ts
app.enableCors({
  origin: ['https://app.example.com'],
  credentials: true,
});
```





#### Вопрос: Что такое SQL Injection?

**Короткий ответ**

SQL Injection - атака, при которой пользовательский ввод становится частью SQL-команды. Проблема возникает, когда запрос
собирают строкой:

**Полный ответ**

SQL Injection - атака, при которой пользовательский ввод становится частью SQL-команды. Проблема возникает, когда запрос
собирают строкой:

```ts
const user = await db.query(`SELECT * FROM users WHERE email = '${email}'`);
```

Если `email` содержит SQL-фрагмент, он может изменить смысл запроса. Вместо конкатенации нужно использовать
parameterized queries или ORM API, которые передают значения отдельно от SQL-кода.

```ts
const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
```

В ORM безопаснее использовать методы, где значения остаются данными:

```ts
const user = await prisma.user.findUnique({
  where: {email},
});
```

В TypeORM тот же принцип:

```ts
const user = await userRepository.findOneBy({email});
```

Raw SQL в ORM все равно требует параметров. Нельзя считать ORM автоматической защитой, если разработчик вручную
склеивает SQL-строку.





#### Вопрос: Какие меры защиты должен знать frontend-разработчик?

**Короткий ответ**

Frontend-разработчику важно понимать, где заканчивается клиентская ответственность и начинается обязательная серверная
проверка. Клиентская validation нужна для UX, но доверять можно только backend validation.

**Полный ответ**

Frontend-разработчику важно понимать, где заканчивается клиентская ответственность и начинается обязательная серверная
проверка. Клиентская validation нужна для UX, но доверять можно только backend validation.

Базовый набор backend-защит:

- validation и normalization входных данных на server side;
- rate limiting для login, password reset, expensive endpoints и публичных forms;
- password hashing через `bcrypt` или `argon2`, а не хранение паролей в открытом виде;
- HTTPS для всего production-трафика;
- secure cookie flags: `Secure`, `SameSite`, `HttpOnly` для session/refresh cookies;
- CSRF-защита для cookie-based authentication;
- authorization checks на каждый чувствительный endpoint;
- file upload validation: MIME/type sniffing, ограничения размера, allowlist extensions, antivirus/scan pipeline при
  необходимости, хранение uploads вне исполняемого web-root;
- обновление зависимостей и проверка supply-chain рисков;
- отсутствие secrets в frontend bundle, logs, URL и error messages.

Безопасность является общей ответственностью frontend, backend и инфраструктуры.



### Performance



#### Вопрос: Что такое initial bundle и как уменьшить bundle size?

**Короткий ответ**

Initial bundle — JavaScript/CSS, необходимые для первой загрузки route.

**Полный ответ**

Initial bundle — JavaScript/CSS, необходимые для первой загрузки route.

Способы уменьшения:

- lazy routes и `@defer`;
- tree-shakable providers;
- удаление тяжелых/дублирующихся dependencies;
- точечные imports;
- production build и bundle budgets;
- проверка `sideEffects` библиотек;
- перенос необязательных polyfills и analytics из critical path.

Размер gzip/brotli важен, но также измеряют parse, compile и execution time.





#### Вопрос: Как анализировать Angular bundle?

**Короткий ответ**

Используют:

**Полный ответ**

Используют:

- CLI bundle budgets;
- build output и source maps;
- bundle visualizer/esbuild metafile совместимого builder;
- Chrome Coverage для неиспользуемого JS/CSS;
- сравнение до/после в CI.

Ищут крупные dependencies, дубликаты, случайно eager-loaded features, locale/data imports и библиотеки, которые можно
заменить browser API или точечным import.





#### Вопрос: Как уменьшать размер frontend assets в Angular?

**Короткий ответ**

Основные способы: lazy routes, @defer, tree shaking, удаление неиспользуемых dependencies, аккуратные standalone
imports, image optimization, font subsetting, compression и перенос необязательных scripts из startup path. Изменение
нужно измерять до и после, потому что новый chunk или library могут ухудшить не только bundle size, но и parse/execute
time.

**Полный ответ**

Основные способы: lazy routes, `@defer`, tree shaking, удаление неиспользуемых dependencies, аккуратные standalone
imports, image optimization, font subsetting, compression и перенос необязательных scripts из startup path. Изменение
нужно измерять до и после, потому что новый chunk или library могут ухудшить не только bundle size, но и parse/execute
time.





#### Вопрос: Как lazy loading влияет на performance Angular-приложения?

**Короткий ответ**

Lazy routes и @defer уменьшают initial bundle, parse/compile time и работу на startup path. Цена — дополнительные
chunks, network latency при первом переходе и необходимость хороших loading/error states. Хороший результат проверяют по
LCP, INP, route transition timing и production bundle stats, а не только по числу файлов.

**Полный ответ**

Lazy routes и `@defer` уменьшают initial bundle, parse/compile time и работу на startup path. Цена — дополнительные
chunks, network latency при первом переходе и необходимость хороших loading/error states. Хороший результат проверяют по
LCP, INP, route transition timing и production bundle stats, а не только по числу файлов.





#### Вопрос: Что такое @defer и чем он отличается от lazy route?

**Короткий ответ**

Lazy route откладывает целую route feature до навигации. @defer откладывает dependencies части текущего шаблона и
создает отдельный chunk.

**Полный ответ**

Lazy route откладывает целую route feature до навигации. `@defer` откладывает dependencies части текущего шаблона и
создает отдельный chunk.

<!-- prettier-ignore -->
```html
@defer (on viewport; prefetch on idle) {
  <app-heavy-chart />
} @placeholder {
  <div class="chart-skeleton"></div>
} @loading {
  <app-spinner />
} @error {
  <p>Не удалось загрузить график</p>
}
```

Triggers включают `idle`, `viewport`, `interaction`, `hover`, `timer` и `when`. Deferred dependencies должны быть
standalone и не использоваться eager в том же файле.





#### Вопрос: Почему в performance-аудите проверяют sideEffects библиотек?

**Короткий ответ**

sideEffects влияет на то, сможет ли bundler удалить неиспользуемые файлы пакета из production bundle.

**Полный ответ**

`sideEffects` влияет на то, сможет ли bundler удалить неиспользуемые файлы пакета из production bundle.

Если библиотека не публикует ESM, содержит широкий entry point или неправильно описывает side effects, unused code может
остаться в initial bundle. Обратная ошибка тоже опасна: неверное `"sideEffects": false` может удалить global styles,
polyfill или initialization code.

Поэтому в performance-аудите проверяют не только размер dependency, но и ее `package.json`, imports, entry points и
production bundle stats.





#### Вопрос: Как Angular-приложение может создавать лишние render и change detection cycles?

**Короткий ответ**

Частые причины: частые events без ограничения, timers, подписки без фильтрации, template methods с тяжелой логикой,
изменение global state и обновления сигналов слишком высоко в дереве. В zone-based приложении async tasks могут
провоцировать широкую синхронизацию, а в zoneless код должен явно обновлять реактивные источники.

**Полный ответ**

Частые причины: частые events без ограничения, timers, подписки без фильтрации, template methods с тяжелой логикой,
изменение global state и обновления сигналов слишком высоко в дереве. В zone-based приложении async tasks могут
провоцировать широкую синхронизацию, а в zoneless код должен явно обновлять реактивные источники. Диагностируют это
через Angular DevTools Profiler и Chrome Performance, затем локализуют state, добавляют `track`, memoization, virtual
scroll или меняют архитектуру потока данных.





#### Вопрос: Как оптимизировать большие списки?

**Короткий ответ**

Virtual scroll нужен, когда DOM и rendering, а не загрузка данных, являются bottleneck. Для переменной высоты элементов
он сложнее и требует измерений.

**Полный ответ**

- стабильный `track item.id`;
- immutable updates;
- pagination или incremental loading;
- CDK virtual scroll для тысяч однотипных строк;
- отсутствие тяжелых методов и impure pipes в template;
- ограничение количества DOM nodes;
- OnPush/signals для локализации обновлений.

Virtual scroll нужен, когда DOM и rendering, а не загрузка данных, являются bottleneck. Для переменной высоты элементов
он сложнее и требует измерений.





#### Вопрос: Как virtual scroll помогает большим спискам в Angular?

**Короткий ответ**

Virtual scroll держит в DOM только видимую часть списка и небольшой buffer, поэтому уменьшаются layout, paint, memory
usage и change detection work. Он полезен для сотен или тысяч однотипных строк, но усложняет variable height, focus,
keyboard navigation и screen reader experience. Если bottleneck в API или фильтрации данных, virtual scroll не решит
корневую проблему.

**Полный ответ**

Virtual scroll держит в DOM только видимую часть списка и небольшой buffer, поэтому уменьшаются layout, paint, memory
usage и change detection work. Он полезен для сотен или тысяч однотипных строк, но усложняет variable height, focus,
keyboard navigation и screen reader experience. Если bottleneck в API или фильтрации данных, virtual scroll не решит
корневую проблему.





#### Вопрос: Как performance budget применяется в Angular-проекте?

**Короткий ответ**

В Angular performance budget обычно включает размер initial bundle, lazy chunks, CSS, LCP, CLS, INP и время до
интерактивности. Angular CLI поддерживает budgets для build artifacts, но этого недостаточно: нужно также измерять Web
Vitals на реальных страницах, следить за lazy routes, standalone imports, third-party dependencies и SSR/hydration
поведением.

**Полный ответ**

В Angular performance budget обычно включает размер initial bundle, lazy chunks, CSS, LCP, CLS, INP и время до
интерактивности. Angular CLI поддерживает budgets для build artifacts, но этого недостаточно: нужно также измерять Web
Vitals на реальных страницах, следить за lazy routes, standalone imports, third-party dependencies и SSR/hydration
поведением.





#### Вопрос: Как искать проблему производительности в Angular-приложении?

**Короткий ответ**

Порядок работы:

**Полный ответ**

Порядок работы:

1. Воспроизвести конкретный медленный сценарий.
2. Измерить Angular DevTools Profiler и Chrome Performance.
3. Определить bottleneck: network, JavaScript, change detection, layout, paint или memory.
4. Исправить наиболее дорогую причину.
5. Повторить измерение на production build и целевом устройстве.

Не следует начинать с `OnPush` или memoization без профиля. Частые причины: большой initial bundle, тяжелые списки,
template methods, layout thrashing и лишние запросы.



### SSR, hydration и SEO



#### Вопрос: Чем CSR, SSR и SSG отличаются?

**Короткий ответ**

SSR подходит динамическим SEO-страницам, SSG — статичному контенту, CSR — внутренним приложениям без SEO. Angular
поддерживает hybrid route-level render modes.

**Полный ответ**

- CSR рендерит приложение в браузере после загрузки JavaScript.
- SSR генерирует HTML на сервере для каждого запроса.
- SSG/prerender генерирует HTML во время build.

SSR подходит динамическим SEO-страницам, SSG — статичному контенту, CSR — внутренним приложениям без SEO. Angular
поддерживает hybrid route-level render modes.





#### Вопрос: Как SSR, hydration и prerender помогают Angular-приложению?

**Короткий ответ**

SSR отдает HTML на каждый запрос и помогает динамическим SEO-страницам, previews и first paint. Prerender генерирует
статические routes заранее и хорошо подходит для документации, landing pages и публичного контента. Hydration сохраняет
server-rendered DOM и подключает к нему Angular на клиенте, уменьшая flicker и риск лишней перерисовки.

**Полный ответ**

SSR отдает HTML на каждый запрос и помогает динамическим SEO-страницам, previews и first paint. Prerender генерирует
статические routes заранее и хорошо подходит для документации, landing pages и публичного контента. Hydration сохраняет
server-rendered DOM и подключает к нему Angular на клиенте, уменьшая flicker и риск лишней перерисовки.





#### Вопрос: Что такое hydration в Angular и какие проблемы она решает?

**Короткий ответ**

Hydration подключает Angular к уже существующему server-rendered DOM вместо полного пересоздания. Сервер отдает HTML,
пользователь видит содержимое до полной загрузки JavaScript, а Angular на клиенте сопоставляет этот DOM со своими
компонентами, восстанавливает bindings и подключает обработчики событий.

**Полный ответ**

Hydration подключает Angular к уже существующему server-rendered DOM вместо полного пересоздания. Сервер отдает HTML,
пользователь видит содержимое до полной загрузки JavaScript, а Angular на клиенте сопоставляет этот DOM со своими
компонентами, восстанавливает bindings и подключает обработчики событий.

Плюсы:

- меньше flicker;
- сохранение SSR HTML;
- улучшение LCP/CLS;
- event replay до завершения hydration.

Пример настройки:

```ts filename="app.config.ts"
import {ApplicationConfig} from '@angular/core';
import {provideClientHydration, withEventReplay} from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [provideClientHydration(withEventReplay())],
};
```

```ts filename="app.config.server.ts"
import {ApplicationConfig, mergeApplicationConfig} from '@angular/core';
import {provideServerRendering} from '@angular/ssr';

import {appConfig} from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering()],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
```

В Angular 22 `provideClientHydration()` включает базовую DOM hydration, HTTP transfer cache и incremental hydration по
умолчанию. `withEventReplay()` дополнительно сохраняет пользовательские события, произошедшие до окончания hydration, и
переигрывает их после подключения приложения.

HTML сервера и клиента должен быть детерминированным, иначе возникает hydration mismatch. Типичные причины: прямой
доступ к `window` во время render, случайные значения в шаблоне, разные даты/timezone, разные данные на сервере и
клиенте или ручное изменение DOM до завершения hydration.





#### Вопрос: Что такое TransferState и HTTP transfer cache?

**Короткий ответ**

TransferState передает сериализованные данные из server render клиенту, чтобы не повторять запрос сразу после hydration.

**Полный ответ**

TransferState передает сериализованные данные из server render клиенту, чтобы не повторять запрос сразу после hydration.

Angular SSR интегрирует transfer cache с `HttpClient` для подходящих GET/HEAD запросов. Нужно учитывать персональные
данные, auth headers, размер HTML и invalidation. Не все API responses безопасно встраивать в документ.





#### Вопрос: Почему browser-only код нельзя выполнять на сервере?

**Короткий ответ**

На сервере browser globals отсутствуют. Безопасные варианты:

**Полный ответ**

На сервере browser globals отсутствуют. Безопасные варианты:

- platform-neutral Angular APIs;
- DI abstraction для browser service;
- выполнение DOM-кода в `afterNextRender()`;
- проверка platform только на границе интеграции;
- lazy import browser-only библиотеки.

Компонент не должен генерировать разный initial DOM на сервере и клиенте без предусмотренного механизма.





#### Вопрос: Какие проблемы могут возникать при hydration в Angular?

**Короткий ответ**

Основная проблема — hydration mismatch, когда server HTML не совпадает с первым client render. Причины: browser-only
globals во время render, случайные значения, даты и timezone, разные данные на сервере и клиенте, direct DOM mutation
или third-party widget до завершения hydration. Такие места изолируют, делают rendering детерминированным или переносят
browser-only работу в безопасную client-only фазу.

**Полный ответ**

Основная проблема — hydration mismatch, когда server HTML не совпадает с первым client render. Причины: browser-only
globals во время render, случайные значения, даты и timezone, разные данные на сервере и клиенте, direct DOM mutation
или third-party widget до завершения hydration. Такие места изолируют, делают rendering детерминированным или переносят
browser-only работу в безопасную client-only фазу.





#### Вопрос: Как Angular-приложение может избежать FOUC или плохого first render?

**Короткий ответ**

Нужны server-rendered или prerendered HTML, critical CSS, стабильные fallback fonts, корректные размеры media, ранняя
загрузка LCP resource и отсутствие базовых стилей, которые приезжают только после JavaScript. Для Angular также важно,
чтобы global styles и component styles были доступны при первом render, а placeholders для @defer имели стабильные
размеры.

**Полный ответ**

Нужны server-rendered или prerendered HTML, critical CSS, стабильные fallback fonts, корректные размеры media, ранняя
загрузка LCP resource и отсутствие базовых стилей, которые приезжают только после JavaScript. Для Angular также важно,
чтобы global styles и component styles были доступны при первом render, а placeholders для `@defer` имели стабильные
размеры.





#### Вопрос: Когда SSR не нужен?

**Короткий ответ**

SSR может не окупиться для:

**Полный ответ**

SSR может не окупиться для:

- auth-only dashboard;
- приложения без поискового трафика;
- тяжелого интерактивного editor;
- продукта, где server cost и complexity выше выигрыша первого render.

SSR улучшает delivery HTML, но не уменьшает автоматически client JavaScript. Решение принимают по SEO, Core Web Vitals,
инфраструктуре и пользовательскому сценарию.





#### Вопрос: Как frontend guidelines помогают SSR, hydration и SEO в Angular?

**Короткий ответ**

Guidelines фиксируют, какие страницы рендерятся через SSR или prerender, как подключаются critical CSS, fonts и media,
какие browser-only API нельзя вызывать во время server rendering и как проверяется hydration. Это снижает риск пустого
first render, layout shifts, hydration mismatch и случайного ухудшения SEO.

**Полный ответ**

Guidelines фиксируют, какие страницы рендерятся через SSR или prerender, как подключаются critical CSS, fonts и media,
какие browser-only API нельзя вызывать во время server rendering и как проверяется hydration. Это снижает риск пустого
first render, layout shifts, hydration mismatch и случайного ухудшения SEO.





#### Вопрос: Что такое JIT и AOT, в чем их отличия и каковы сферы применения?

**Короткий ответ**

AOT компилирует templates и decorators во время сборки. В современных Angular CLI проектах AOT является стандартным
режимом и для ng build, и для development server.

**Полный ответ**

**AOT** компилирует templates и decorators во время сборки. В современных Angular CLI проектах AOT является стандартным
режимом и для `ng build`, и для development server.

Плюсы AOT:

- ошибки шаблонов обнаруживаются при сборке;
- браузеру не нужен Angular compiler;
- меньше runtime-работы и лучше startup;
- доступны template type checking и production optimizations.

**JIT** компилирует Angular declarations во время выполнения. Он нужен редко: для специальных динамических сценариев,
tooling или legacy-конфигураций. Для обычной разработки переключаться на JIT не требуется.

`--prod` больше не является актуальным способом объяснять AOT. Используют named configurations, например
`ng build --configuration production`.





#### Вопрос: В чем разница между Angular CLI и Webpack Development Environment?

**Короткий ответ**

Angular CLI — официальный интерфейс для создания, запуска, тестирования, обновления и сборки Angular-проектов. Он
управляет workspace-конфигурацией и вызывает настроенный builder.

**Полный ответ**

Angular CLI — официальный интерфейс для создания, запуска, тестирования, обновления и сборки Angular-проектов. Он
управляет workspace-конфигурацией и вызывает настроенный builder.

Webpack — универсальный bundler. Исторически Angular CLI использовал Webpack внутри, но это деталь реализации:
современные builders могут использовать другие инструменты, например esbuild/Vite-based development server.

CLI дает:

- `ng new`, `ng generate`, `ng serve`, `ng build`, `ng test`, `ng update`;
- Angular-aware компиляцию шаблонов и AOT;
- production-оптимизации, budgets, environments и asset pipeline;
- согласованную конфигурацию и migrations.

Ручная Webpack-конфигурация дает больше низкоуровневого контроля, но увеличивает стоимость поддержки и обновлений. В
Angular-проекте сначала используют возможности CLI и custom builder, а eject/собственный pipeline выбирают только при
реальной необходимости.



### Angular PWA и Service Worker



#### Вопрос: Для чего нужен PWA и какие плюсы?

**Короткий ответ**

PWA — это сайт, который ведет себя почти как приложение

**Полный ответ**

PWA — это сайт, который ведет себя почти как приложение

PWA = Progressive Web App.

Это обычное веб-приложение, но с дополнительными возможностями:

- можно установить на телефон/компьютер как приложение;
- может работать офлайн или при плохом интернете;
- может кешировать данные и ресурсы;
- может отправлять push-уведомления;
- открывается из иконки без обычного ощущения “я в браузере”.

Для чего нужен PWA:

PWA нужен, когда ты хочешь дать пользователю app-like experience, но без полноценной разработки под iOS/Android.

Главные плюсы PWA:

1. Можно установить без App Store / Google Play

Пользователь может нажать “Add to Home Screen” и получить иконку приложения.

Плюс для бизнеса:

- не нужно проходить модерацию стора;
- быстрее выкатывать обновления;
- один код для web/mobile/desktop.

PWA может кешировать:

- HTML;
- JS;
- CSS;
- картинки;
- шрифты;
- API-ответы.

Может работать офлайн

Например:

- открыть последнюю загруженную страницу;
- показать сохраненные данные;
- дать заполнить форму;
- отправить данные позже, когда интернет вернется.

Это особенно полезно для:

- путешествий;
- слабого интернета;
- мобильных пользователей;
- внутренних рабочих инструментов.

Push-уведомления:

PWA может отправлять уведомления, например: “Заказ доставлен”; “Новая задача”; “Скидка”; “Напоминание”; “Документ
согласован”.

Когда PWA подходит

PWA хорошо подходит, если:

- приложение в основном показывает данные;
- нужна установка на экран;
- важна скорость загрузки;
- нужен офлайн-режим;
- нет сложной работы с железом телефона;
- хочется быстро доставлять обновления.

CRM, todo app, dashboard, docs, e-commerce, booking app

Когда PWA не лучший выбор

PWA хуже подходит, если нужны:

- глубокие native API;
- сложная работа с Bluetooth/NFC;
- тяжелая графика;
- мощная фоновая работа;
- сложная интеграция с iOS/Android;
- максимальная производительность как у native.





#### Вопрос: Для чего нужны service worker?

**Короткий ответ**

Service Worker — это фоновый слой между сайтом и сетью.

**Полный ответ**

Service Worker — это фоновый слой между сайтом и сетью.

Service Worker — это JavaScript-файл, который браузер запускает отдельно от страницы. Он может перехватывать сетевые
запросы, работать с кешем, получать push-уведомления и помогать сайту работать офлайн.





#### Вопрос: Какую роль в PWA играет Service Worker?

**Короткий ответ**

Service Worker — это JS-файл, который браузер запускает отдельно от страницы и который стоит “между” приложением и
сетью.

**Полный ответ**

Service Worker — это JS-файл, который браузер запускает отдельно от страницы и который стоит “между” приложением и
сетью.

Как работает обычный сайт: Page -> Network -> Server

PWA с Service Worker: Page -> Service Worker -> Cache / Network -> Server

Service Worker может перехватывать запросы:

Пользователь открыл страницу ↓ Браузер спрашивает Service Worker ↓ SW решает:

- взять файл из кеша
- сходить в сеть
- показать fallback-страницу

Ты открыл сайт первый раз:

- index.html
- main.js
- styles.css
- logo.png

Service Worker может сохранить эти файлы в Cache Storage.

Потом пользователь открывает сайт без интернета:

нет сети ↓ Service Worker берет файлы из кеша ↓ приложение все равно открывается

Для чего он нужен в PWA

1. Offline. Можно открыть приложение без интернета.
2. Faster load. Файлы уже лежат локально, поэтому приложение может открываться быстрее.
3. Cache strategy. Service Worker может выбирать стратегию:
   1. Cache first сначала кеш, потом сеть картинки, шрифты, статика
   2. Network first сначала сеть, если нет — кеш свежие данные
   3. Stale while revalidate быстро отдать кеш, потом обновить списки, статьи, каталоги
   4. Cache only только кеш заранее сохраненные ресурсы
   5. Network only только сеть критичные операции
4. Push notifications. Service Worker может принимать push-события даже когда вкладка закрыта. Server -> Push Service ->
   Service Worker -> Notification

Service Worker не имеет доступа к DOM. Он живет отдельно от страницы. Страница и Service Worker общаются через
события/messages.

Service Worker нужен в PWA, чтобы приложение могло кешировать ресурсы, быстрее загружаться, работать офлайн и получать
push-уведомления.





#### Вопрос: Как Angular помогает с localization?

**Короткий ответ**

Angular предоставляет i18n-инструменты для извлечения и подстановки переводов, а также pipes для дат, чисел и валют с
учетом locale. Но команда все равно должна решить, где хранятся переводы, нужен ли runtime или build-time localization,
как тестируются языки и как компоненты переживают длинные строки, pluralization и RTL.

**Полный ответ**

Angular предоставляет i18n-инструменты для извлечения и подстановки переводов, а также pipes для дат, чисел и валют с
учетом locale. Но команда все равно должна решить, где хранятся переводы, нужен ли runtime или build-time localization,
как тестируются языки и как компоненты переживают длинные строки, pluralization и RTL.





#### Вопрос: Почему RTL нужно учитывать в layout и компонентах?

**Короткий ответ**

RTL меняет направление текста и часто влияет на icons, arrows, spacing, alignment, keyboard navigation и animations.
Нельзя просто перевести строки и считать интерфейс готовым. Компоненты design system должны явно поддерживать LTR/RTL, а
CSS должен использовать logical properties там, где это упрощает поддержку.

**Полный ответ**

RTL меняет направление текста и часто влияет на icons, arrows, spacing, alignment, keyboard navigation и animations.
Нельзя просто перевести строки и считать интерфейс готовым. Компоненты design system должны явно поддерживать LTR/RTL, а
CSS должен использовать logical properties там, где это упрощает поддержку.
