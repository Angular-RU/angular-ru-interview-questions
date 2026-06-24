## HTTP, HTTPS и curl

### HTTP, HTTPS и curl

<details>
<summary>Что такое HTTP?</summary><br>
<table><tr><td>

HTTP — прикладной протокол обмена сообщениями между client и server. Он определяет методы, URL, headers, body и status
codes, но не диктует внутреннюю архитектуру backend. Сам протокол stateless, а состояние сессии строится поверх него.

</td></tr></table>

</details>

<details>
<summary>Что такое request и response?</summary><br>
<table><tr><td>

Request отправляет method, target, headers и при необходимости body. Response возвращает status, headers и body. Browser
DevTools Network показывает обе части и timing.

</td></tr></table>

</details>

<details>
<summary>Из чего состоит HTTP request?</summary><br>
<table><tr><td>

Request line содержит method, target и HTTP version, затем идут headers и optional body. URL включает path и query
params. Host, authorization и content metadata передаются headers.

</td></tr></table>

</details>

<details>
<summary>Из чего состоит HTTP response?</summary><br>
<table><tr><td>

Status line содержит HTTP version и status code, затем идут response headers и optional body. Headers описывают content,
cache, cookies и transport metadata. Body может содержать JSON, HTML, файл или stream.

</td></tr></table>

</details>

<details>
<summary>Что такое HTTP method?</summary><br>
<table><tr><td>

Method выражает намерение операции над resource. Семантика влияет на кеширование, idempotency, retries и поведение
proxies. Backend не должен использовать GET для изменения данных.

</td></tr></table>

</details>

<details>
<summary>Чем отличаются GET, POST, PUT, PATCH и DELETE?</summary><br>
<table><tr><td>

GET читает, POST создает ресурс или запускает команду, PUT полностью заменяет представление по известному URL, PATCH
частично изменяет, DELETE удаляет. Конкретный API документирует payload и повторяемость. Method сам по себе не заменяет
авторизацию.

</td></tr></table>

</details>

<details>
<summary>Что такое status code?</summary><br>
<table><tr><td>

Это трехзначный код результата HTTP response. Он позволяет client и инфраструктуре отличать успех, redirect,
пользовательскую ошибку и server failure. Body добавляет machine-readable details.

</td></tr></table>

</details>

<details>
<summary>Чем отличаются 2xx, 3xx, 4xx и 5xx?</summary><br>
<table><tr><td>

`2xx` означает успешную обработку, `3xx` — redirect или работу кеша, `4xx` — проблему запроса или доступа, `5xx` —
ошибку server. Retry зависит от конкретного кода и idempotency. Например, `404` и `503` требуют разной реакции.

</td></tr></table>

</details>

<details>
<summary>Что такое headers?</summary><br>
<table><tr><td>

Headers передают metadata: формат body, авторизацию, кеширование, cookies, content negotiation и tracing. Имена
регистронезависимы. Чувствительные значения нельзя логировать без фильтрации.

</td></tr></table>

</details>

<details>
<summary>Что такое body запроса?</summary><br>
<table><tr><td>

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

Это body, сериализованный в JSON и обычно помеченный `Content-Type: application/json`. Он поддерживает objects, arrays,
strings, numbers, booleans и `null`. Dates и другие domain types передаются по согласованному строковому или числовому
контракту.

</td></tr></table>

</details>

<details>
<summary>Что такое query params?</summary><br>
<table><tr><td>

Это пары после `?` в URL, например `?page=2&sort=name`. Они подходят для фильтров, пагинации и состояния, которое должно
попадать в ссылку. Значения нужно URL-encode и валидировать на server.

</td></tr></table>

</details>

<details>
<summary>Что такое path params?</summary><br>
<table><tr><td>

Это динамические сегменты пути, например `/users/:id`. Они обычно идентифицируют resource или иерархию. Query params
чаще задают опции представления, но это API convention, а не ограничение HTTP.

</td></tr></table>

</details>

<details>
<summary>Что такое Content-Type?</summary><br>
<table><tr><td>

Header описывает media type отправленного body, например `application/json`. Server использует его для выбора parser.
Для response он сообщает browser, как интерпретировать данные.

</td></tr></table>

</details>

<details>
<summary>Что такое Authorization header?</summary><br>
<table><tr><td>

Header передает credentials или token по выбранной схеме. Пример: `Authorization: Bearer <token>`. Его отправляют только
по HTTPS доверенному origin и не выводят в логи.

</td></tr></table>

</details>

<details>
<summary>Что такое Bearer token?</summary><br>
<table><tr><td>

Это token, право использования которого получает любой владелец значения. Он не доказывает владение отдельным ключом,
поэтому утечка дает доступ до истечения или отзыва. Scope и срок жизни должны быть минимальными.

</td></tr></table>

</details>

<details>
<summary>Что такое preflight request?</summary><br>
<table><tr><td>

Browser отправляет `OPTIONS` перед некоторыми cross-origin requests, чтобы проверить разрешенные method и headers.
Server отвечает CORS headers. Preflight может кешироваться, но неправильная конфигурация блокирует основной запрос.

</td></tr></table>

</details>

<details>
<summary>Что такое cookie?</summary><br>
<table><tr><td>

Cookie — небольшая пара name/value, которую browser хранит для domain/path и автоматически отправляет подходящим
requests. Флаги `HttpOnly`, `Secure` и `SameSite` снижают часть рисков. Cookies имеют ограничения размера и требуют
продуманной CSRF-защиты.

</td></tr></table>

</details>

<details>
<summary>Чем cookie отличается от localStorage?</summary><br>
<table><tr><td>

Cookie автоматически участвует в HTTP и может быть `HttpOnly`; `localStorage` доступен JavaScript и не отправляется
автоматически. Оба механизма привязаны к origin/domain rules. Секретный token в localStorage уязвим при XSS.

</td></tr></table>

</details>

<details>
<summary>Что такое idempotency?</summary><br>
<table><tr><td>

Операция идемпотентна, если повтор одного и того же запроса имеет тот же ожидаемый итоговый эффект. Это важно для
retries при сетевой неопределенности. API может использовать idempotency key для безопасного повторения создания
платежа.

</td></tr></table>

</details>

<details>
<summary>Какие HTTP methods обычно идемпотентны?</summary><br>
<table><tr><td>

GET, HEAD, PUT, DELETE и OPTIONS определены как идемпотентные по семантике, PATCH может быть таким по контракту, POST
обычно нет. Идемпотентность не означает одинаковый response: DELETE повторно может вернуть другой status.

</td></tr></table>

</details>

<details>
<summary>Как использовать curl для проверки HTTP API?</summary><br>
<table><tr><td>

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

HTTPS передает HTTP внутри защищенного TLS-соединения. Оно шифрует трафик, подтверждает подлинность сервера сертификатом
и защищает данные от незаметного изменения в пути.

HTTPS не исправляет XSS, слабую авторизацию или утечку данных на сервере.

</td></tr></table>

</details>

<details>
<summary>Может ли GET-запрос иметь body?</summary><br>
<table><tr><td>

Семантика body у GET не определена для обычного web-взаимодействия, многие servers и proxies его игнорируют, а browser
`fetch` запрещает body для GET и HEAD.

Параметры чтения передают через URL. Если запрос слишком сложный или содержит чувствительную структуру, API обычно
проектируют отдельным POST endpoint для поиска.

</td></tr></table>

</details>

<details>
<summary>Что такое CORS?</summary><br>
<table><tr><td>

CORS - browser security mechanism, который ограничивает JavaScript-запросы между разными origins. Сервер разрешает
доступ через `Access-Control-Allow-*` headers, а для части запросов браузер сначала отправляет preflight `OPTIONS`.

Postman не применяет browser same-origin policy, поэтому запрос может работать там и блокироваться в браузере.
Исправление находится в server CORS configuration или same-origin proxy, а не в отключении защиты браузера.

</td></tr></table>

</details>

<details>
<summary>Что такое авторизация через токены?</summary><br>
<table><tr><td>

После аутентификации сервер выдает credential, например access token. Клиент прикладывает его к запросам, а сервер
проверяет подпись, срок действия и права.

Access token обычно живет недолго. Refresh token позволяет получить новый access token и требует более строгой защиты и
ротации.

</td></tr></table>

</details>

<details>
<summary>Где хранить access token и refresh token?</summary><br>
<table><tr><td>

Универсального ответа нет. Частый browser-подход:

- access token хранится в памяти приложения;
- refresh token находится в `HttpOnly`, `Secure`, `SameSite` cookie и недоступен JavaScript.

`localStorage` переживает перезагрузку, но доступен при XSS. Cookie автоматически отправляется браузером, поэтому
требует корректной CSRF-защиты. Решение зависит от backend, доменов и threat model.

</td></tr></table>

</details>

<details>
<summary>Чем WebSocket отличается от SSE?</summary><br>
<table><tr><td>

WebSocket предоставляет постоянный двусторонний канал и подходит для чатов, multiplayer и совместного редактирования.

SSE передает события только от сервера к клиенту поверх HTTP, автоматически переподключается и проще для уведомлений,
прогресса и live feed. SSE передает текстовые события и имеет browser-specific ограничения соединений.

</td></tr></table>

</details>

<details>
<summary>Когда выбрать polling, SSE или WebSocket?</summary><br>
<table><tr><td>

- Polling прост и подходит для редких обновлений, когда задержка допустима.
- SSE выбирают для постоянного потока server-to-client.
- WebSocket нужен для частого двустороннего обмена с низкой задержкой.

Учитывают инфраструктуру, reconnect, authentication, масштабирование, mobile network и реальную частоту событий.

</td></tr></table>

</details>

<details>
<summary>Как проектировать API layer и типизировать backend contracts?</summary><br>
<table><tr><td>

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
<summary>Что такое клиент-серверная архитектура?</summary><br>
<table><tr><td>

Клиент отвечает за интерфейс и отправляет запросы, сервер хранит данные, применяет бизнес-правила и возвращает ответы.

Граница не является границей доверия: server всегда повторно проверяет authentication, authorization и входные данные,
даже если frontend уже выполнил validation.

</td></tr></table>

</details>

<details>
<summary>Что происходит после ввода URL в браузере?</summary><br>
<table><tr><td>

Упрощенная последовательность:

1. Браузер разбирает URL и проверяет cache.
2. DNS находит IP-адрес.
3. Устанавливается транспортное и для HTTPS TLS-соединение.
4. Отправляется HTTP-запрос.
5. Браузер обрабатывает redirect и ответ.
6. HTML парсится, загружаются CSS, JavaScript и другие ресурсы.
7. Строятся DOM/CSSOM, layout, paint и compositing.

Service worker, HTTP cache, CDN и connection reuse могут изменить отдельные шаги.

</td></tr></table>

</details>

<details>
<summary>Из чего состоят HTTP-запрос и ответ?</summary><br>
<table><tr><td>

Запрос содержит method, URL, headers и необязательный body. Ответ содержит status code, headers и необязательный body.

Частые headers: `Content-Type`, `Accept`, `Authorization`, `Cache-Control`, `ETag`, `Cookie`, `Set-Cookie`, `Origin`.
Формат body описывает `Content-Type`.

</td></tr></table>

</details>

<details>
<summary>Что такое REST API?</summary><br>
<table><tr><td>

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

JSON представляет objects, arrays, strings, numbers, booleans и `null`. Он не хранит `Date`, `Map`, functions и
`undefined` как отдельные типы.

Кроме `application/json`, frontend встречает `multipart/form-data` для файлов, `application/x-www-form-urlencoded`,
plain text, binary data и streams. Клиент и сервер согласуют формат через `Content-Type` и `Accept`.

</td></tr></table>

</details>

<details>
<summary>Какими способами frontend взаимодействует с backend?</summary><br>
<table><tr><td>

- REST/HTTP для обычных request-response операций;
- GraphQL для управляемой клиентом выборки;
- WebSocket для двустороннего realtime;
- SSE для потока server-to-client;
- polling для простых периодических обновлений;
- gRPC-web в отдельных инфраструктурах.

Выбор зависит от направления потока, задержки, cache, browser support и возможностей backend.

</td></tr></table>

</details>
