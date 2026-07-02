## HTTP, HTTPS и curl

### HTTP, HTTPS и curl

#### Junior

<details>
<summary>Что такое HTTP?</summary><br>
<table><tr><td>

**Уровень:** Junior

HTTP — прикладной протокол обмена сообщениями между client и server. Он определяет методы, URL, headers, body и status
codes, но не диктует внутреннюю архитектуру backend. Сам протокол stateless, а состояние сессии строится поверх него.

</td></tr></table>

</details>

<details>
<summary>Что такое request и response?</summary><br>
<table><tr><td>

**Уровень:** Junior

Request отправляет method, target, headers и при необходимости body. Response возвращает status, headers и body. Browser
DevTools Network показывает обе части и timing.

</td></tr></table>

</details>

<details>
<summary>Что такое HTTP method?</summary><br>
<table><tr><td>

**Уровень:** Junior

Method выражает намерение операции над resource. Семантика влияет на кеширование, idempotency, retries и поведение
proxies. Backend не должен использовать GET для изменения данных.

</td></tr></table>

</details>

<details>
<summary>Что такое status code?</summary><br>
<table><tr><td>

**Уровень:** Junior

Это трехзначный код результата HTTP response. Он позволяет client и инфраструктуре отличать успех, redirect,
пользовательскую ошибку и server failure. Body добавляет machine-readable details.

</td></tr></table>

</details>

<details>
<summary>Что такое headers?</summary><br>
<table><tr><td>

**Уровень:** Junior

Headers передают metadata: формат body, авторизацию, кеширование, cookies, content negotiation и tracing. Имена
регистронезависимы. Чувствительные значения нельзя логировать без фильтрации.

</td></tr></table>

</details>

<details>
<summary>Что такое body запроса?</summary><br>
<table><tr><td>

**Уровень:** Junior

Body содержит данные операции, например JSON, form data или файл. Формат описывает `Content-Type`. GET/HEAD body не
следует использовать в обычном browser API.

```http
POST /users HTTP/1.1
Host: api.example.com
Content-Type: application/json

{
  "name": "Max",
  "role": "frontend"
}
```

</td></tr></table>

</details>

<details>
<summary>Что такое JSON body?</summary><br>
<table><tr><td>

**Уровень:** Junior

Это body, сериализованный в JSON и обычно помеченный `Content-Type: application/json`. Он поддерживает objects, arrays,
strings, numbers, booleans и `null`. Dates и другие domain types передаются по согласованному строковому или числовому
контракту.

</td></tr></table>

</details>

<details>
<summary>Что такое query params?</summary><br>
<table><tr><td>

**Уровень:** Junior

Это пары после `?` в URL, например `?page=2&sort=name`. Они подходят для фильтров, пагинации и состояния, которое должно
попадать в ссылку. Значения нужно URL-encode и валидировать на server.

</td></tr></table>

</details>

<details>
<summary>Что такое path params?</summary><br>
<table><tr><td>

**Уровень:** Junior

Это динамические сегменты пути, например `/users/:id`. Они обычно идентифицируют resource или иерархию. Query params
чаще задают опции представления, но это API convention, а не ограничение HTTP.

</td></tr></table>

</details>

<details>
<summary>Что такое Content-Type?</summary><br>
<table><tr><td>

**Уровень:** Junior

Header описывает media type отправленного body, например `application/json`. Server использует его для выбора parser.
Для response он сообщает browser, как интерпретировать данные.

</td></tr></table>

</details>

<details>
<summary>Что такое Authorization header?</summary><br>
<table><tr><td>

**Уровень:** Junior

Header передает credentials или token по выбранной схеме. Пример: `Authorization: Bearer <token>`. Его отправляют только
по HTTPS доверенному origin и не выводят в логи.

</td></tr></table>

</details>

<details>
<summary>Что такое Bearer token?</summary><br>
<table><tr><td>

**Уровень:** Junior

Это token, право использования которого получает любой владелец значения. Он не доказывает владение отдельным ключом,
поэтому утечка дает доступ до истечения или отзыва. Scope и срок жизни должны быть минимальными.

</td></tr></table>

</details>

<details>
<summary>Что такое preflight request?</summary><br>
<table><tr><td>

**Уровень:** Junior

Browser отправляет `OPTIONS` перед некоторыми cross-origin requests, чтобы проверить разрешенные method и headers.
Server отвечает CORS headers. Preflight может кешироваться, но неправильная конфигурация блокирует основной запрос.

</td></tr></table>

</details>

<details>
<summary>Что такое cookie?</summary><br>
<table><tr><td>

**Уровень:** Junior

Cookie — небольшая пара name/value, которую browser хранит для domain/path и автоматически отправляет подходящим
requests. Флаги `HttpOnly`, `Secure` и `SameSite` снижают часть рисков. Cookies имеют ограничения размера и требуют
продуманной CSRF-защиты.

</td></tr></table>

</details>

<details>
<summary>Что такое idempotency?</summary><br>
<table><tr><td>

**Уровень:** Junior

Операция идемпотентна, если повтор одного и того же запроса имеет тот же ожидаемый итоговый эффект. Это важно для
retries при сетевой неопределенности. API может использовать idempotency key для безопасного повторения создания
платежа.

</td></tr></table>

</details>

<details>
<summary>Что такое same-origin policy?</summary><br>
<table><tr><td>

**Уровень:** Junior

Same-origin policy ограничивает доступ JavaScript к данным другого origin, где origin определяется схемой, host и port.
Она защищает пользователя от чтения приватных данных с других сайтов через браузер. CORS не отключает эту модель, а
позволяет серверу явно разрешить отдельные cross-origin requests.

</td></tr></table>

</details>

<details>
<summary>Что такое авторизация через токены?</summary><br>
<table><tr><td>

**Уровень:** Junior

После аутентификации сервер выдает credential, например access token. Клиент прикладывает его к запросам, а сервер
проверяет подпись, срок действия и права.

Access token обычно живет недолго. Refresh token позволяет получить новый access token и требует более строгой защиты и
ротации.

</td></tr></table>

</details>

<details>
<summary>Что такое HSTS и зачем браузер проверяет HSTS list?</summary><br>
<table><tr><td>

**Уровень:** Junior

HSTS (HTTP Strict Transport Security) говорит браузеру обращаться к сайту только по HTTPS. Если domain есть в preloaded
HSTS list или браузер уже получил `Strict-Transport-Security`, попытка `http://` будет локально повышена до `https://`
до сетевого запроса.

Это защищает от downgrade attack и случайной отправки cookies по незащищенному соединению. Для frontend это важно при
диагностике "почему HTTP redirect не виден в Network" и при настройке production-доменов.

</td></tr></table>

</details>

<details>
<summary>Что такое <code>ETag</code>?</summary><br>
<table><tr><td>

**Уровень:** Junior

`ETag` — validator версии ресурса. Клиент может отправить `If-None-Match`, и сервер вернет `304 Not Modified`, если
ресурс не изменился. Это экономит body transfer, но оставляет network round trip, поэтому для content-hashed assets
часто выгоднее долгий cache lifetime.

</td></tr></table>

</details>

<details>
<summary>Что такое <code>Expires</code>?</summary><br>
<table><tr><td>

**Уровень:** Junior

`Expires` задает абсолютную дату, после которой response считается устаревшим. В современных приложениях чаще
предпочитают `Cache-Control`, потому что относительные правила проще и надежнее при разнице часов между системами. Если
оба header присутствуют, `Cache-Control` обычно имеет приоритет.

</td></tr></table>

</details>

<details>
<summary>Что делает <code>X-Frame-Options</code>?</summary><br>
<table><tr><td>

**Уровень:** Junior

`X-Frame-Options` запрещает или ограничивает встраивание страницы во frame, защищая от clickjacking. Современная
альтернатива — CSP directive `frame-ancestors`, она гибче и позволяет точнее задать разрешенные origins. Для Angular SPA
header обычно настраивают на уровне web server или CDN.

</td></tr></table>

</details>

<details>
<summary>Что такое CDN и зачем он нужен?</summary><br>
<table><tr><td>

**Уровень:** Junior

CDN хранит копии статических или кешируемых ресурсов ближе к пользователям и снижает latency, нагрузку на origin и риск
перегрузки. Для Angular deployment CDN особенно полезен для content-hashed assets, HTML delivery, security headers,
invalidation и rollback. Важно понимать, какие responses кешируются browser cache, а какие CDN cache.

</td></tr></table>

</details>

<details>
<summary>Что такое REST API?</summary><br>
<table><tr><td>

**Уровень:** Junior

REST — архитектурный стиль, в котором ресурсы имеют URL, а стандартные HTTP-методы выражают операции:

- `GET /users/42` — получить ресурс;
- `POST /users` — создать;
- `PUT /users/42` — заменить;
- `PATCH /users/42` — частично изменить;
- `DELETE /users/42` — удалить.

`POST` обычно создает подчиненный ресурс или запускает команду. `PUT` полностью заменяет ресурс по известному URL, а
`PATCH` изменяет отдельные поля. `GET` читает данные и в browser `fetch` не может иметь body.

Основные группы статусов:

- `2xx`: успех, например `200`, `201`, `204`;
- `3xx`: перенаправление и кеш, например `301`, `304`;
- `4xx`: ошибка клиента, например `400`, `401`, `403`, `404`, `409`, `422`, `429`;
- `5xx`: ошибка сервера, например `500`, `502`, `503`.

Частые значения:

- `200 OK` - успешный ответ;
- `201 Created` - ресурс создан;
- `400 Bad Request` - некорректный запрос;
- `401 Unauthorized` - нет действительной аутентификации;
- `403 Forbidden` - пользователь распознан, но доступ запрещен;
- `404 Not Found` - ресурс не найден;
- `409 Conflict` - конфликт с текущим состоянием;
- `422 Unprocessable Content` - данные синтаксически корректны, но не проходят validation;
- `429 Too Many Requests` - превышен rate limit;
- `500 Internal Server Error` - внутренняя ошибка сервера.

Частые заголовки: `Content-Type`, `Accept`, `Authorization`, `Cache-Control`, `ETag`, `Cookie`, `Set-Cookie`,
CORS-заголовки.

REST предполагает stateless-взаимодействие: каждый запрос содержит достаточно контекста для обработки. Идемпотентность
означает, что повторный одинаковый запрос имеет тот же итоговый эффект; обычно `GET`, `PUT` и `DELETE` проектируют
идемпотентными.

</td></tr></table>

</details>

<details>
<summary>Что такое JSON и какие форматы body используются?</summary><br>
<table><tr><td>

**Уровень:** Junior

JSON представляет objects, arrays, strings, numbers, booleans и `null`. Он не хранит `Date`, `Map`, functions и
`undefined` как отдельные типы.

Кроме `application/json`, frontend встречает `multipart/form-data` для файлов, `application/x-www-form-urlencoded`,
plain text, binary data и streams. Клиент и сервер согласуют формат через `Content-Type` и `Accept`.

</td></tr></table>

</details>

#### Middle

<details>
<summary>Из чего состоит HTTP request?</summary><br>
<table><tr><td>

**Уровень:** Middle

Request line содержит method, target и HTTP version, затем идут headers и optional body. URL включает path и query
params. Host, authorization и content metadata передаются headers.

</td></tr></table>

</details>

<details>
<summary>Из чего состоит HTTP response?</summary><br>
<table><tr><td>

**Уровень:** Middle

Status line содержит HTTP version и status code, затем идут response headers и optional body. Headers описывают content,
cache, cookies и transport metadata. Body может содержать JSON, HTML, файл или stream.

</td></tr></table>

</details>

<details>
<summary>Чем отличаются GET, POST, PUT, PATCH и DELETE?</summary><br>
<table><tr><td>

**Уровень:** Middle

GET читает, POST создает ресурс или запускает команду, PUT полностью заменяет представление по известному URL, PATCH
частично изменяет, DELETE удаляет. Конкретный API документирует payload и повторяемость. Method сам по себе не заменяет
авторизацию.

</td></tr></table>

</details>

<details>
<summary>Чем <code>OPTIONS</code> и <code>HEAD</code> отличаются от основных HTTP methods?</summary><br>
<table><tr><td>

**Уровень:** Middle

`OPTIONS` запрашивает поддерживаемые возможности ресурса или используется браузером для CORS preflight. `HEAD` похож на
`GET`, но возвращает только headers без body, что полезно для проверки metadata, cache и доступности ресурса. Оба метода
важны для инфраструктуры, но редко являются основными product actions.

</td></tr></table>

</details>

<details>
<summary>Чем отличаются 2xx, 3xx, 4xx и 5xx?</summary><br>
<table><tr><td>

**Уровень:** Middle

`2xx` означает успешную обработку, `3xx` — redirect или работу кеша, `4xx` — проблему запроса или доступа, `5xx` —
ошибку server. Retry зависит от конкретного кода и idempotency. Например, `404` и `503` требуют разной реакции.

</td></tr></table>

</details>

<details>
<summary>Чем cookie отличается от localStorage?</summary><br>
<table><tr><td>

**Уровень:** Middle

Cookie автоматически участвует в HTTP и может быть `HttpOnly`; `localStorage` доступен JavaScript и не отправляется
автоматически. Оба механизма привязаны к origin/domain rules. Секретный token в localStorage уязвим при XSS.

</td></tr></table>

</details>

<details>
<summary>Какие HTTP methods обычно идемпотентны?</summary><br>
<table><tr><td>

**Уровень:** Middle

GET, HEAD, PUT, DELETE и OPTIONS определены как идемпотентные по семантике, PATCH может быть таким по контракту, POST
обычно нет. Идемпотентность не означает одинаковый response: DELETE повторно может вернуть другой status.

</td></tr></table>

</details>

<details>
<summary>Как использовать curl для проверки HTTP API?</summary><br>
<table><tr><td>

**Уровень:** Middle

`curl` позволяет отправить запрос вне приложения и увидеть, проблема находится в API, сети или frontend-коде.

```bash
curl https://api.example.com/users
```

```bash
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Max","role":"frontend"}'
```

```bash
curl -X PATCH https://api.example.com/users/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer token" \
  -d '{"name":"Alex"}'
```

</td></tr></table>

</details>

<details>
<summary>Чем HTTP отличается от HTTPS?</summary><br>
<table><tr><td>

**Уровень:** Middle

HTTPS передает HTTP внутри защищенного TLS-соединения. Оно шифрует трафик, подтверждает подлинность сервера сертификатом
и защищает данные от незаметного изменения в пути.

HTTPS не исправляет XSS, слабую авторизацию или утечку данных на сервере.

</td></tr></table>

</details>

<details>
<summary>Может ли GET-запрос иметь body?</summary><br>
<table><tr><td>

**Уровень:** Middle

Семантика body у GET не определена для обычного web-взаимодействия, многие servers и proxies его игнорируют, а browser
`fetch` запрещает body для GET и HEAD.

Параметры чтения передают через URL. Если запрос слишком сложный или содержит чувствительную структуру, API обычно
проектируют отдельным POST endpoint для поиска.

</td></tr></table>

</details>

<details>
<summary>Где хранить access token и refresh token?</summary><br>
<table><tr><td>

**Уровень:** Middle

Универсального ответа нет. Частый browser-подход:

- access token хранится в памяти приложения;
- refresh token находится в `HttpOnly`, `Secure`, `SameSite` cookie и недоступен JavaScript.

`localStorage` переживает перезагрузку, но доступен при XSS. Cookie автоматически отправляется браузером, поэтому
требует корректной CSRF-защиты. Решение зависит от backend, доменов и threat model.

</td></tr></table>

</details>

<details>
<summary>Как проектировать API layer и типизировать backend contracts?</summary><br>
<table><tr><td>

**Уровень:** Middle

Data-access слой инкапсулирует endpoints, DTO, mapping и transport errors:

```ts
export class UsersApi {
  private readonly http = inject(HttpClient);

  getById(id: string): Observable<User> {
    return this.http.get<UserDto>(`/api/users/${id}`).pipe(map(mapUserDto));
  }
}
```

Generic в `HttpClient` — compile-time ожидание, а не runtime-валидация. Для внешних данных используют schema validation.
OpenAPI может генерировать DTO/client, но generated layer обычно оборачивают доменным API.

</td></tr></table>

</details>

<details>
<summary>Как устроены TCP/IP и HTTP?</summary><br>
<table><tr><td>

**Уровень:** Middle

Упрощенная модель TCP/IP:

1. Прикладной уровень: HTTP, DNS, WebSocket.
2. Транспортный уровень: TCP или UDP.
3. Сетевой уровень: IP и маршрутизация пакетов.
4. Канальный уровень: передача кадров внутри локальной сети.

HTTP — протокол прикладного уровня с моделью request/response. Клиент отправляет метод, URL, заголовки и при
необходимости body; сервер возвращает status code, заголовки и body.

HTTPS — HTTP поверх защищенного TLS-соединения. TCP обеспечивает надежную упорядоченную доставку для HTTP/1.1 и HTTP/2;
HTTP/3 использует QUIC поверх UDP.

TCP устанавливает соединение, гарантирует порядок и повторную доставку потерянных данных. UDP отправляет datagrams без
таких гарантий, но с меньшими накладными расходами.

В модели OSI HTTP относится к прикладному уровню, TCP/UDP - к транспортному, IP - к сетевому.

Для frontend-разработчика важны методы, коды ответа, заголовки, кеширование, cookies, CORS, TLS, сжатие и понимание
того, что количество и размер запросов влияют на производительность.

</td></tr></table>

</details>

<details>
<summary>Что происходит после ввода URL в адресную строку браузера?</summary><br>
<table><tr><td>

**Уровень:** Middle

Упрощенная последовательность:

1. Браузер разбирает текст адресной строки и решает, это URL или поисковый запрос.
2. Проверяются HSTS policy, Service Worker, HTTP cache и возможность reuse существующего соединения.
3. DNS lookup находит IP-адрес.
4. Устанавливается транспортное соединение и для HTTPS выполняется TLS handshake.
5. Отправляется HTTP-запрос.
6. Браузер обрабатывает redirect и ответ.
7. HTML парсится, загружаются CSS, JavaScript и другие ресурсы.
8. Строятся DOM/CSSOM, layout, paint и compositing.

Service worker, HTTP cache, CDN и connection reuse могут изменить отдельные шаги.

</td></tr></table>

</details>

<details>
<summary>Как браузер понимает, URL это или поисковый запрос?</summary><br>
<table><tr><td>

**Уровень:** Middle

Браузер разбирает введенный текст: ищет явную схему (`https://`), валидный hostname, IP address, localhost, port, path и
другие URL-признаки. Если строка не выглядит как URL, она отправляется в поисковую систему по умолчанию.

Пограничные случаи зависят от браузера и настроек: `example`, `example.test`, пробелы, Unicode-домены и символы, которые
нужно percent-encode. Поэтому frontend-код не должен угадывать URL вручную там, где можно использовать `URL`.

</td></tr></table>

</details>

<details>
<summary>Как работает DNS lookup?</summary><br>
<table><tr><td>

**Уровень:** Middle

DNS lookup преобразует hostname в IP-адрес. Браузер и ОС сначала проверяют свои кеши, затем resolver обращается к
настроенному DNS-серверу, который может вернуть ответ из кеша или выполнить recursive lookup через DNS hierarchy.

Ответы имеют TTL, поэтому смена IP, CDN или DNS-записей может доходить до пользователей не мгновенно. В DevTools это
видно как DNS timing, если соединение не было переиспользовано.

</td></tr></table>

</details>

<details>
<summary>Зачем frontend-разработчику понимать DNS?</summary><br>
<table><tr><td>

**Уровень:** Middle

DNS влияет на latency первого запроса к origin, API, CDN, fonts и analytics. Много разных domains увеличивает число DNS
lookup, TCP/TLS setup и риск частичных сбоев.

Практически это помогает объяснять медленный first visit, выбирать `preconnect` только для действительно критичных
origins, диагностировать проблемы после смены CDN, CNAME или окружения API.

</td></tr></table>

</details>

<details>
<summary>Что происходит перед отправкой HTTP-запроса по HTTPS?</summary><br>
<table><tr><td>

**Уровень:** Middle

Браузер открывает или переиспользует соединение с origin. Если нового соединения избежать нельзя, сначала
устанавливается transport connection, затем выполняется TLS handshake: выбирается версия TLS и cipher suite, проверяется
certificate chain, согласуются ключи шифрования и имя сервера через SNI.

Только после успешного TLS handshake отправляется HTTP-запрос. Поэтому медленный HTTPS может быть связан не с API
handler, а с network latency, certificate проблемами, отсутствием connection reuse или слишком большим числом origins.

</td></tr></table>

</details>

<details>
<summary>Чем TCP отличается от UDP в контексте HTTP?</summary><br>
<table><tr><td>

**Уровень:** Middle

TCP дает надежный упорядоченный byte stream: потерянные данные повторно передаются, а приложение получает их в порядке.
HTTP/1.1 и HTTP/2 обычно работают поверх TCP.

UDP не гарантирует доставку и порядок datagrams. HTTP/3 использует QUIC поверх UDP, добавляя надежность, шифрование и
мультиплексирование на своем уровне. Для frontend это проявляется в timing, connection setup и поведении при packet
loss.

</td></tr></table>

</details>

<details>
<summary>Что происходит, если сетевой пакет потерялся?</summary><br>
<table><tr><td>

**Уровень:** Middle

Для TCP потеря приводит к повторной передаче и увеличению latency; данные выше по стеку будут ждать недостающий кусок. В
HTTP/2 поверх TCP потеря может задержать несколько streams на одном соединении.

В QUIC/HTTP/3 потеря одного stream меньше блокирует остальные streams, но пользователь все равно видит задержку, timeout
или retry на уровне приложения. Frontend должен проектировать loading, timeout и idempotent retry с учетом этой
неопределенности.

</td></tr></table>

</details>

<details>
<summary>Как выглядит минимальный HTTP request?</summary><br>
<table><tr><td>

**Уровень:** Middle

Минимально важны method, request target, HTTP version и `Host` для HTTP/1.1:

```http
GET /products?limit=10 HTTP/1.1
Host: example.com
Accept: text/html
```

Реальный browser request добавит headers вроде `User-Agent`, `Accept-Encoding`, `Cookie`, `Sec-Fetch-*`, `If-None-Match`
или `Origin`. В HTTP/2 и HTTP/3 формат передачи другой, но семантика method, path, headers и body сохраняется.

</td></tr></table>

</details>

<details>
<summary>Что означают <code>Date</code> и <code>Age</code> в HTTP headers?</summary><br>
<table><tr><td>

**Уровень:** Middle

`Date` показывает время формирования response на сервере или proxy. `Age` показывает, сколько секунд response уже
находится в cache, например в CDN. Эти headers помогают понять, пришел ли ответ из cache и насколько он свежий.

</td></tr></table>

</details>

<details>
<summary>Почему раньше ассеты разносили по нескольким доменам?</summary><br>
<table><tr><td>

**Уровень:** Middle

В HTTP/1.1 браузеры ограничивали число одновременных соединений к одному host, поэтому domain sharding помогал качать
больше файлов параллельно. Цена — дополнительные DNS lookup, TLS handshakes, cookies и сложность кеширования. В
современных проектах этот прием чаще вреден.

</td></tr></table>

</details>

<details>
<summary>Что такое domain prefetch?</summary><br>
<table><tr><td>

**Уровень:** Middle

Domain prefetch заранее выполняет DNS lookup для origin, который скоро может понадобиться. Это может сократить задержку
первого запроса к стороннему домену, но лишние hints расходуют ресурсы и могут раскрывать будущие переходы. Для более
критичных ресурсов иногда уместнее `preconnect`.

</td></tr></table>

</details>

<details>
<summary>Что происходит, если HTML ссылается на ресурсы с других доменов?</summary><br>
<table><tr><td>

**Уровень:** Middle

Для каждого нового origin браузеру могут понадобиться отдельные DNS lookup, connection setup и TLS handshake. CSS,
scripts, images, fonts и API-запросы также подчиняются mixed content, CORS, CORP/CORB, CSP и cookie rules.

Практические проблемы: медленные third-party scripts задерживают render, fonts могут блокировать текст, API может упасть
из-за CORS, а cookies не отправятся без правильных `SameSite`, `Secure` и credentials settings.

</td></tr></table>

</details>

<details>
<summary>Что делает сервер после получения HTTP request?</summary><br>
<table><tr><td>

**Уровень:** Middle

Server или edge layer принимает request, разбирает method, path, headers и body, применяет routing, authentication,
authorization, validation, business logic и обращение к данным. Затем формирует status code, response headers и body.

До application code запрос могут обработать CDN, reverse proxy, WAF, cache или load balancer. Поэтому frontend
диагностика должна смотреть status, headers, timing, trace id и то, на каком слое возникла ошибка.

</td></tr></table>

</details>

<details>
<summary>Из чего состоят HTTP-запрос и ответ?</summary><br>
<table><tr><td>

**Уровень:** Middle

Запрос содержит method, URL, headers и необязательный body. Ответ содержит status code, headers и необязательный body.

Частые headers: `Content-Type`, `Accept`, `Authorization`, `Cache-Control`, `ETag`, `Cookie`, `Set-Cookie`, `Origin`.
Формат body описывает `Content-Type`.

</td></tr></table>

</details>

<details>
<summary>Какими способами frontend взаимодействует с backend?</summary><br>
<table><tr><td>

**Уровень:** Middle

- REST/HTTP для обычных request-response операций;
- GraphQL для управляемой клиентом выборки;
- WebSocket для двустороннего realtime;
- SSE для потока server-to-client;
- polling для простых периодических обновлений;
- gRPC-web в отдельных инфраструктурах.

Выбор зависит от направления потока, задержки, cache, browser support и возможностей backend.

</td></tr></table>

</details>

#### Middle+ / Senior

<details>
<summary>Что такое CORS?</summary><br>
<table><tr><td>

**Уровень:** Middle+

CORS - browser security mechanism, который ограничивает JavaScript-запросы между разными origins. Сервер разрешает
доступ через `Access-Control-Allow-*` headers, а для части запросов браузер сначала отправляет preflight `OPTIONS`.

Postman не применяет browser same-origin policy, поэтому запрос может работать там и блокироваться в браузере.
Исправление находится в server CORS configuration или same-origin proxy, а не в отключении защиты браузера.

</td></tr></table>

</details>

<details>
<summary>Чем WebSocket отличается от SSE?</summary><br>
<table><tr><td>

**Уровень:** Middle+

WebSocket предоставляет постоянный двусторонний канал и подходит для чатов, multiplayer и совместного редактирования.

SSE передает события только от сервера к клиенту поверх HTTP, автоматически переподключается и проще для уведомлений,
прогресса и live feed. SSE передает текстовые события и имеет browser-specific ограничения соединений.

</td></tr></table>

</details>

<details>
<summary>Когда выбрать polling, SSE или WebSocket?</summary><br>
<table><tr><td>

**Уровень:** Middle+

- Polling прост и подходит для редких обновлений, когда задержка допустима.
- SSE выбирают для постоянного потока server-to-client.
- WebSocket нужен для частого двустороннего обмена с низкой задержкой.

Учитывают инфраструктуру, reconnect, authentication, масштабирование, mobile network и реальную частоту событий.

</td></tr></table>

</details>

<details>
<summary>Чем Long Polling, WebSocket и Server-Sent Events отличаются?</summary><br>
<table><tr><td>

**Уровень:** Middle+

Long Polling держит HTTP-запрос открытым до появления события, затем клиент сразу открывает следующий запрос. SSE дает
постоянный однонаправленный поток server-to-client поверх HTTP и хорошо подходит для уведомлений. WebSocket открывает
двусторонний канал с низкой задержкой, но требует отдельного управления reconnect, auth, scaling и проксированием.

</td></tr></table>

</details>

<details>
<summary>Что такое 304 Not Modified и как он связан с кешем?</summary><br>
<table><tr><td>

**Уровень:** Middle+

`304 Not Modified` означает, что cached response в browser HTTP cache еще можно использовать. Браузер отправляет
conditional request с `If-None-Match` или `If-Modified-Since`, а сервер отвечает `304` без полного body.

Это экономит bandwidth, но не убирает network round trip. Для hashed assets часто лучше долгий
`Cache-Control: immutable`, а для `index.html` — revalidation, чтобы быстрее получать новую версию приложения.

</td></tr></table>

</details>

<details>
<summary>Что такое <code>Cache-Control</code>?</summary><br>
<table><tr><td>

**Уровень:** Middle+

`Cache-Control` задает правила кеширования для browser cache, CDN и промежуточных caches: `max-age`, `s-maxage`,
`no-cache`, `no-store`, `public`, `private`, `immutable`. Для hashed assets обычно используют долгий `max-age` и
`immutable`, а для HTML SPA — короткое кеширование или revalidation, чтобы быстрее доставлять новые версии и rollback.

</td></tr></table>

</details>

<details>
<summary>Для чего нужны <code>If-Modified-Since</code> и <code>If-None-Match</code>?</summary><br>
<table><tr><td>

**Уровень:** Middle+

Это conditional request headers для revalidation. `If-Modified-Since` сравнивает дату изменения ресурса, а
`If-None-Match` сравнивает `ETag` и обычно точнее. Если ресурс не изменился, сервер отвечает `304` без body, сохраняя
bandwidth.

</td></tr></table>

</details>

<details>
<summary>Что такое <code>Transfer-Encoding</code>?</summary><br>
<table><tr><td>

**Уровень:** Middle+

`Transfer-Encoding` описывает, как body передается по соединению, например chunked encoding в HTTP/1.1. Chunked response
позволяет начинать отправку до того, как известен полный размер body. В HTTP/2 и HTTP/3 framing устроен иначе, но
семантика streaming response остается важной.

</td></tr></table>

</details>

<details>
<summary>Как HTTP/2 и HTTP/3 изменили подход к domain sharding?</summary><br>
<table><tr><td>

**Уровень:** Middle+

HTTP/2 добавил multiplexing нескольких streams в одном соединении, а HTTP/3 поверх QUIC уменьшает влияние части
transport-level задержек. Поэтому много доменов обычно хуже: теряется reuse соединения и усложняется приоритизация.
Оптимизация сместилась к правильному кешированию, размеру ресурсов и CDN, а не к искусственному дроблению origins.

</td></tr></table>

</details>

<details>
<summary>Что такое клиент-серверная архитектура?</summary><br>
<table><tr><td>

**Уровень:** Senior

Клиент отвечает за интерфейс и отправляет запросы, сервер хранит данные, применяет бизнес-правила и возвращает ответы.

Граница не является границей доверия: server всегда повторно проверяет authentication, authorization и входные данные,
даже если frontend уже выполнил validation.

</td></tr></table>

</details>

### Networking

#### Middle

<details>
<summary>Чем CDN cache отличается от browser cache?</summary><br>
<table><tr><td>

**Уровень:** Middle

Browser cache находится у конкретного пользователя и ускоряет повторные посещения. CDN cache находится ближе к
пользователям на edge-узлах и снижает latency, трафик до origin и нагрузку на backend.

Для static assets обычно используют content hash и долгий `Cache-Control`. Для HTML чаще нужен короткий TTL или
revalidation, чтобы пользователь быстро получил новую версию приложения. Важно понимать cache key: URL, headers, cookies
и query params могут менять попадание в кеш.

```http
Cache-Control: public, max-age=31536000, immutable
```

</td></tr></table>

</details>

<details>
<summary>Почему CORS preflight может стать performance-проблемой?</summary><br>
<table><tr><td>

**Уровень:** Middle

Preflight - дополнительный `OPTIONS` запрос перед небезопасным cross-origin запросом. Он появляется из-за некоторых
methods, headers или content types. На плохой сети лишний round trip заметен, особенно для частых API-вызовов.

Решения: корректно кешировать preflight через `Access-Control-Max-Age`, избегать лишних custom headers, держать API на
том же origin через reverse proxy или проектировать batching. Нельзя "лечить" это отключением browser security.

```http
Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Methods: GET, POST
Access-Control-Max-Age: 600
```

</td></tr></table>

</details>

#### Middle+ / Senior

<details>
<summary>Как проектировать retry и timeout для frontend-запросов?</summary><br>
<table><tr><td>

**Уровень:** Middle+

Timeout ограничивает ожидание одного запроса, retry повторяет только ошибки, где повтор имеет смысл. Для frontend важно
не повторять неидемпотентные операции без idempotency key и не создавать лавину запросов при массовом сбое.

Практические правила:

- `GET` чаще retryable, `POST` - только при явном контракте;
- использовать exponential backoff и jitter;
- учитывать `Retry-After` для `429` и `503`;
- давать пользователю понятный fallback;
- отменять устаревшие запросы при смене экрана или query.

```ts
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 5000);

try {
  await fetch('/api/search', {signal: controller.signal});
} finally {
  clearTimeout(timeoutId);
}
```

</td></tr></table>

</details>
