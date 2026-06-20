# Вопросы на собеседовании по Angular

Вопросы помогают определить уровень Angular-разработчика: насколько глубоко он понимает Web-платформу, JavaScript, TypeScript и устройство Angular-приложений.

Angular-ответы ориентированы на версии 19–22. Для нового кода используются standalone APIs, signals и functional providers; поддерживаемые старые API помечены как legacy.

Дополнительные материалы:

**Fundamentals**:

- [Coding Interview University](https://github.com/jwasham/coding-interview-university)
- [Awesome Interviews](https://github.com/alex/what-happens-when)
- [Angular Interview Questions](https://github.com/sudheerj/angular-interview-questions)

**Frontend**:

- [Front-end Job Interview Questions](https://github.com/h5bp/Front-end-Developer-Interview-Questions)
- [The Best Frontend JavaScript Interview Questions](<https://performancejs.com/post/hde6d32/The-Best-Frontend-JavaScript-Interview-Questions-(Written-by-a-Frontend-Engineer)>)
- [Frontend Guidelines Questionnaire](https://github.com/bradfrost/frontend-guidelines-questionnaire)
- [Подготовка к интервью на Front-end разработчика](https://proglib.io/p/frontend-interview/)

**Angular**:

- [Angular Interview Questions by Google Developer Expert](https://github.com/Yonet/Angular-Interview-Questions)

## Web Platform

### HTML и CSS

<details>
<summary>Для чего нужен HTML/CSS?</summary>
- HTML нужен, чтобы описать структуру страницы: заголовки, текст, кнопки, формы, ссылки, картинки.

- CSS нужен, чтобы описать внешний вид: цвета, размеры, отступы, шрифты, расположение элементов.

```html
<button>Buy</button>
```

```css
button {
  color: white;
  background: blue;
}
```

</details>

### Accessibility

<details>
<summary>Для чего нужен атрибут lang и на что повлияет?</summary>
- HTML нужен, чтобы описать структуру страницы: заголовки, текст, кнопки, формы, ссылки, картинки.

- CSS нужен, чтобы описать внешний вид: цвета, размеры, отступы, шрифты, расположение элементов.

```html
<html lang="ru"></html>
```

Зачем нужен:

- Скринридеры. Читалки для людей с нарушением зрения правильно произносят текст.
- Переводчик в браузере. Браузер лучше понимает, нужно ли предлагать перевод.
- Поиск и SEO. Поисковики лучше понимают язык страницы.
- Орфография и автозамена
- Браузер может корректнее проверять текст в формах. Типографика и переносы
- Может влиять на переносы слов, кавычки, правила языка.

```html
<p>Я изучаю <span lang="en">frontend development</span>.</p>
```

lang не меняет внешний вид напрямую, но помогает браузеру, поисковикам и assistive technologies правильно понимать язык контента.

</details>

<details>
<summary>Для чего был добавлены в HTML семантические теги?</summary>
Для улучшение accessability (для людей с плохим зрением и какими-либо еще ограничениями).
</details>

### CSS

<details>
<summary>Веса в CSS</summary>

Веса в CSS — это специфичность, то есть приоритет селектора.

Пример весов:

```css
/* 0 (0,0,0) */
* {}

/* 1 (0,1,0) */
button {}

/* 10 (0,1,0) */
.button {}

/* 100 (1,0,0) */
#button {}

/* 1000 (1,0,0,0) */
style="color: red"
```

div, button, p - 1
.class, [attr], :hover - 10
#id - 100
inline style - 1000
!important - перебивает почти все

Пример:

```css
button {
  color: blue;
}

.button {
  color: red;
}
```

```html
<button class="button">Click</button>
```

Будет red, потому что .button весит больше, чем button. Чем селектор конкретнее, тем выше его вес.

</details>

<details>
<summary>Что такое user agent style?</summary>

То есть CSS, который браузер сам применяет к HTML-элементам, даже если ты не написал свой CSS.

```html
<h1>Hello</h1>
<p>Text</p>
<button>Click</button>
```

Даже без CSS у них уже есть внешний вид:

```css
h1 {
  font-size: 2em;
  font-weight: bold;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
}

button {
  appearance: auto;
}
```

</details>

### Performance и PWA

<details>
<summary>Для чего нужен PWA и какие плюсы?</summary>
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

PWA может отправлять уведомления, например: “Заказ доставлен”; “Новая задача”; “Скидка”; “Напоминание”; “Документ согласован”.

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

</details>

<details>
<summary>Какую роль в PWA играет Service Worker?</summary>
Service Worker — это JS-файл, который браузер запускает отдельно от страницы и который стоит “между” приложением и сетью.

Как работает обычный сайт: Page -> Network -> Server

PWA с Service Worker: Page -> Service Worker -> Cache / Network -> Server

Service Worker может перехватывать запросы:

Пользователь открыл страницу
↓
Браузер спрашивает Service Worker
↓
SW решает:

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

нет сети
↓
Service Worker берет файлы из кеша
↓
приложение все равно открывается

Для чего он нужен в PWA

1. Offline. Можно открыть приложение без интернета.
2. Faster load. Файлы уже лежат локально, поэтому приложение может открываться быстрее.
3. Cache strategy. Service Worker может выбирать стратегию:
   1. Cache first
      сначала кеш, потом сеть
      картинки, шрифты, статика
   2. Network first
      сначала сеть, если нет — кеш
      свежие данные
   3. Stale while revalidate
      быстро отдать кеш, потом обновить
      списки, статьи, каталоги
   4. Cache only
      только кеш
      заранее сохраненные ресурсы
   5. Network only
      только сеть
      критичные операции
4. Push notifications. Service Worker может принимать push-события даже когда вкладка закрыта.
   Server -> Push Service -> Service Worker -> Notification

Service Worker не имеет доступа к DOM. Он живет отдельно от страницы. Страница и Service Worker общаются через события/messages.

Service Worker нужен в PWA, чтобы приложение могло кешировать ресурсы, быстрее загружаться, работать офлайн и получать push-уведомления.

</details>

## JavaScript

### Типы, функции и область видимости

<details>
<summary>Какие типы данных есть в JavaScript?</summary>

```js
// Примитивные

string; // "hello"
number; // 123, 3.14, NaN, Infinity
bigint; // 123n
boolean; // true / false
undefined; // значение не задано
null; // пустое значение
symbol; // уникальный идентификатор

// Ссылочный тип

object; // {}, [], function, Date, Map, Set и т.д.
```

Важно:

```js
typeof null; // "object" — старая странность JS
typeof []; // "object"
typeof function () {}; // "function"
```

```js
typeof Symbol("id"); // "symbol"
```

![img.png](assets/data-types.png)

</details>

<details>
<summary>В чем разница между call и apply, bind в JS?</summary>

call и apply делают одно и то же: вызывают функцию с явно заданным this.

call

Аргументы передаются через запятую:

```js
function greet(city, age) {
  console.log(`${this.name}, ${city}, ${age}`);
}

const user = { name: "Max" };

greet.call(user, "Moscow", 32);
// Max, Moscow, 32

// fn.call(thisArg, arg1, arg2, arg3);
```

```js
function greet(city, age) {
  console.log(`${this.name}, ${city}, ${age}`);
}

const user = { name: "Max" };

greet.apply(user, ["Moscow", 32]);
// Max, Moscow, 32
```

bind тоже работает с this, но не вызывает функцию сразу.

Он создает новую функцию, у которой this уже заранее привязан.

```js
function greet(city) {
  console.log(`${this.name} from ${city}`);
}

const user = { name: "Max" };
```

call — вызывает сразу. apply — вызывает сразу, но аргументы массивом. bind — НЕ вызывает сразу

```js
const boundGreet = greet.bind(user);

boundGreet("Moscow");
// Max from Moscow
```

</details>

<details>
<summary>Что такое область видимости в JS?</summary>
Область видимости в JavaScript — это правило, которое определяет, где переменная, функция или класс доступны в коде.

```js
function test() {
  const name = "Max";

  console.log(name); // доступна
}

console.log(name); // ошибка: name не видна снаружи
```

Основные виды scope в JS

1. Global scope

Доступно везде в файле/программе:

```js
const appName = "My App";

function log() {
  console.log(appName);
}
```

2. Function scope

var виден внутри всей функции:

```js
function test() {
  var x = 1;

  if (true) {
    var y = 2;
  }

  console.log(y); // 2
}
```

3. Block scope

let и const видны только внутри блока {}:

```js
if (true) {
  const x = 1;
  let y = 2;
}

console.log(x); // ошибка
console.log(y); // ошибка
```

4. Module scope

В ES-модулях переменные не попадают в global scope:

```js
const value = 123;

export { value };
```

</details>

<details>
<summary>В чем отличие нативных (Native) объектов от хост-объектов (Host objects)?</summary>

#### Нативные объекты — часть спецификации языка. Они доступны нам вне зависимости от того, на каком клиенте исполняется наш код. Примеры: Array, Date и Math. Полный список нативных объектов.

```js
var users = Array(); // Array — нативный объект
```

Встроенные (Built-in): Array, Date, Math, String, Promise, Object.
Пользовательские: Объекты, создаваемые вами через new Object(), литералы {} или классы.
Контекстные: Объект globalThis (или window в браузере, global в Node.js), Math и JSON.

#### Хост-объекты (Host objects)

Это объекты, предоставляемые средой выполнения (окружением), в которой запущен JavaScript (браузер, сервер Node.js и т.д.).

Они не являются частью самого языка, зависят от платформы и могут различаться.

В браузере: window, document, location, history, XMLHTTPRequest, fetch, элементы DOM, localStorage.

В Node.js: Объекты для работы с файловой системой (fs), процессами (process), операционной системой (os).

</details>

### HTTP и REST

<details>
<summary>Что такое REST?</summary>
REST (Representational State Transfer) — это набор правил и принципов для построения взаимодействия между программами (клиентом и сервером) через интернет. Обычно клиент (например, браузер или мобильное приложение) запрашивает данные у сервера, а тот их возвращает, чаще всего по протоколу HTTP.

Ключевые принципы REST Клиент-серверная модель:

1. Четкое разделение: сервер хранит и обрабатывает данные, а клиент занимается интерфейсом и отправкой запросов.
2. Отсутствие состояния (Stateless): Каждый запрос от клиента содержит всю необходимую информацию для его обработки. Сервер не «помнит» клиента между запросами.
3. Использование стандартных методов HTTP:
   - Для управления данными используются определенные запросы (так называемый CRUD):
   - GET — получение данных
   - POST — создание новых данных
   - PUT или PATCH — обновление существующих данных
   - DELETE — удаление данных
4. Уникальные адреса (URI): Каждый ресурс или объект (пользователь, товар, статья) имеет свой уникальный адрес в сети (например, https://site.com).

</details>

<details>
<summary>Что было до REST и после?</summary>
REST (Representational State Transfer) — это набор правил и принципов для построения взаимодействия между программами (клиентом и сервером) через интернет. Обычно клиент (например, браузер или мобильное приложение) запрашивает данные у сервера, а тот их возвращает, чаще всего по протоколу HTTP.

Ключевые принципы REST Клиент-серверная модель:

1. RPC

Идея: клиент вызывает удаленную функцию как обычную функцию.

```ts
userService.getUser(123);
```

На уровне сети это превращалось в запрос к серверу.

Минус: клиент часто сильно завязан на серверные методы. То есть API выглядит как набор команд.

2. SOAP

SOAP — более формальный XML-based подход.

```xml
<soap:Envelope>
  <soap:Body>
    <GetUser>
      <UserId>123</UserId>
    </GetUser>
  </soap:Body>
</soap:Envelope>
```

Особенности:

- XML;
- строгие схемы;
- много формальности;
- часто использовался в enterprise, банках, госке, больших системах.

Минус: тяжеловесно, много boilerplate.

3. REST

REST стал популярным как более простой HTTP-подход.

```ts
call getUser(123)
```

Появляется ресурс:

```ts
GET / users / 123;
```

Вместо:

```ts
call deleteUser(123)
```

REST-стиль:

```
DELETE /users/123
```

Главная идея REST: API строится вокруг ресурсов, а HTTP-методы описывают действие.

REST никуда не исчез. Он до сих пор основной стандарт для обычных web API. Но рядом появились другие подходы.

4. GraphQL

Идея: клиент сам говорит, какие поля ему нужны.

```ts
query {
  user(id: 123) {
    name
    avatar
    posts {
      title
    }
  }
}
```

Плюсы:

- меньше лишних данных;
- удобно для сложных UI;
- frontend сам собирает нужную форму данных.

Минусы:

- сложнее кеширование;
- сложнее backend;
- легко сделать тяжелый запрос.

Хорошо подходит, когда UI сложный и REST начинает плодить много endpoint-ов.

5. gRPC

Идея: быстрые типизированные контракты между сервисами. Обычно используется не browser ↔ backend, а backend ↔ backend.

```ts
service UserService {
  rpc GetUser (GetUserRequest) returns (User);
}
```

Плюсы:

- быстро;
- строго типизировано;
- хорошо для микросервисов.

Минусы:

- менее удобно напрямую из браузера;
- хуже читается человеком, чем JSON/REST.

</details>

### Event Loop

<details>
<summary>Чем отличается queueMicrotask от setTimeout?</summary>

- queueMicrotask выполняет код после текущего синхронного кода, но до рендера и до setTimeout.
- setTimeout выполняет код в следующей macrotask, то есть позже: после microtasks, часто после рендера.

```js
console.log("1");

setTimeout(() => console.log("setTimeout"), 0);

queueMicrotask(() => console.log("queueMicrotask"));

console.log("2");
```

Вывод:

```js
1;
2;
queueMicrotask;
setTimeout;
```

</details>

<details>
<summary>Что такое Event loop?</summary>

JavaScript в браузере выполняется в основном в одном потоке. Поэтому ему нужен диспетчер, который по очереди обрабатывает:

- обычный синхронный код;
- клики, ввод, события;
- setTimeout;
- Promise.then;
- queueMicrotask;
- рендер страницы.

```text
┌──────────────────────────────┐
│        Call Stack             │
│  выполняется текущий JS-код   │
└───────────────┬──────────────┘
                │
                ▼
┌──────────────────────────────┐
│       Microtask Queue         │
│  Promise.then                 │
│  queueMicrotask               │
└───────────────┬──────────────┘
                │
                ▼
┌──────────────────────────────┐
│      Browser Rendering        │
│  layout / paint / update UI   │
└───────────────┬──────────────┘
                │
                ▼
┌──────────────────────────────┐
│         Task Queue            │
│  setTimeout                   │
│  click                        │
│  input                        │
│  network events               │
└───────────────┬──────────────┘
                │
                └─────── снова в Call Stack
```

```ts
console.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

Promise.resolve().then(() => {
  console.log("3");
});

queueMicrotask(() => {
  console.log("4");
});

console.log("5");
```

```ts
1;
5;
3;
4;
2;
```

</details>

## Angular: базовые вопросы

### DI + providers

<details>
<summary>Что такое DI в Angular?</summary>

Angular DI — это система, через которую Angular создает и передает зависимости компонентам, директивам, сервисам и другим сущностям. Сервисы можно регистрировать через providedIn, ApplicationConfig.providers, route providers или component/directive providers; Angular DI при этом иерархическая, то есть ближайший injector может переопределить зависимость для части дерева.

```ts
@Injectable({
  providedIn: "root",
})
export class UserService {}

@Component({
  selector: "app-profile",
  template: `...`,
})
export class ProfileComponent {
  private readonly userService = inject(UserService);
}
```

Angular 22+

```ts
@Service()
export class UserService {}

@Component({
  selector: "app-profile",
  template: `...`,
})
export class ProfileComponent {
  private readonly userService = inject(UserService);
}
```

</details>

<details>
<summary>Что делает `providedIn: 'root'`?</summary>

`providedIn: "root"` регистрирует сервис в корневом `EnvironmentInjector`.

```ts
@Injectable({ providedIn: "root" })
export class AuthService {}
```

- Обычно во всем приложении создается один экземпляр сервиса.
- Сервис доступен без ручного добавления в `providers`.
- Неиспользуемый сервис может быть удален из production-сборки с помощью tree shaking.
- Экземпляр живет столько же, сколько приложение.

Это подход по умолчанию для stateless-сервисов, API-клиентов и общего состояния приложения.

</details>

<details>
<summary>Чем отличается providedIn: 'root' от providers в компоненте?</summary>

`providedIn: "root"` создает провайдер на уровне приложения, а `providers` компонента создает локальный провайдер в `ElementInjector`.

```ts
@Component({
  selector: "app-editor",
  providers: [DraftService],
})
export class EditorComponent {}
```

- Root-сервис обычно один на все приложение.
- Локальный сервис создается для каждого экземпляра компонента.
- Локальный экземпляр доступен компоненту и его потомкам по правилам иерархического DI.
- При уничтожении компонента уничтожается и его локальный экземпляр сервиса.

Локальный `providers` полезен для изолированного состояния виджета, формы или нескольких независимых экземпляров одного компонента.

</details>

<details>
<summary>Что будет, если один сервис есть и в root, и в providers компонента?</summary>

Будут существовать разные экземпляры сервиса. Angular начинает поиск с ближайшего инжектора, поэтому компонент и его потомки получат локальный экземпляр, а остальные части приложения продолжат использовать root-экземпляр.

Это называется shadowing провайдера.

```ts
@Injectable({ providedIn: "root" })
export class CounterService {}

@Component({
  providers: [CounterService],
})
export class LocalCounterComponent {
  readonly counter = inject(CounterService); // Локальный экземпляр
}
```

Такое поведение полезно для изоляции состояния, но может стать причиной ошибок, если разработчик ожидал настоящий singleton.

</details>

<details>
<summary>Объясните как работает Dependency Injection на примере SOLID</summary>
Как мы помним Dependency Injection в Angular это механизм, при котором класс не создает зависимости сам, а получает их снаружи.

То есть вместо:

```ts
class UserComponent {
  private api = new UserApiService();
}
```

мы пишем:

```ts
@Component({
  // ...
})
export class UserComponent {
  private readonly api = inject(UserApiService);
  // или через constructor:
  // constructor(private readonly api: UserApiService) {}
}
```

Angular сам найдет UserApiService, создаст экземпляр и передаст его в компонент.

##### Зачем это нужно?

Представь компонент:

```ts
@Component({
  // ...
})
export class ProfileComponent {
  loadProfile(): void {
    // Нужно сходить на backend
  }
}
```

Компоненту не хочется знать:

- как создается HTTP-клиент;
- где лежит API;
- как кешируются данные;
- как мокать API в тестах;
- как менять реализацию для dev/prod.

Компоненту нужно только сказать:

"Дай мне сервис, который умеет загружать профиль".

Это и есть идея Dependency Injection.

##### Без Dependency Injection

Плохой вариант:

```ts
export class ProfileComponent {
  private readonly service = new ProfileService();

  load(): void {
    this.service.loadProfile();
  }
}
```

Проблемы:

- ProfileComponent жестко связан с ProfileService.
- В тестах сложно подменить сервис на мок.
- Если ProfileService требует HttpClient, придется руками создавать и его.
- Компонент знает слишком много о создании зависимостей.

##### С Dependency Injection

Хороший вариант:

```ts
@Injectable({
  providedIn: "root",
})
export class ProfileService {
  private readonly http = inject(HttpClient);

  loadProfile() {
    return this.http.get("/api/profile");
  }
}
```

```ts
@Component({
  selector: "app-profile",
  template: `...`,
})
export class ProfileComponent {
  private readonly profileService = inject(ProfileService);

  load(): void {
    this.profileService.loadProfile().subscribe();
  }
}
```

Теперь ProfileComponent не создает ProfileService. Он только просит Angular:

“Найди мне зависимость типа ProfileService”.

Angular смотрит в injector и возвращает нужный экземпляр.

##### Как это связано с SOLID

###### 1. S — Single Responsibility Principle

Класс должен иметь одну основную ответственность. Без DI компонент часто делает слишком много:

```ts
export class ProfileComponent {
  private readonly http = new HttpClient(/* ... */);

  loadProfile() {
    return this.http.get("/api/profile");
  }

  renderProfile() {
    // UI logic
  }
}
```

Компонент отвечает и за UI, и за работу с API.

Лучше разделить:

```ts
@Injectable({
  providedIn: "root",
})
export class ProfileApiService {
  private readonly http = inject(HttpClient);

  getProfile() {
    return this.http.get("/api/profile");
  }
}
```

```ts
@Component({
  //...
})
export class ProfileComponent {
  private readonly api = inject(ProfileApiService);

  load(): void {
    this.api.getProfile().subscribe();
  }
}
```

Теперь:

- ProfileComponent отвечает за UI;
- ProfileApiService отвечает за API.

DI помогает не смешивать ответственности.

###### 2. O — Open/Closed Principle

Код должен быть открыт для расширения, но закрыт для изменения.

Допустим, есть аналитика:

```ts
export class AnalyticsService {
  track(event: string): void {
    console.log(event);
  }
}
```

Компонент использует ее:

```ts
@Component({
  // ...
})
export class ButtonComponent {
  private readonly analytics = inject(AnalyticsService);

  click(): void {
    this.analytics.track("button_click");
  }
}
```

Если завтра нужно заменить ConsoleAnalyticsService на FirebaseAnalyticsService, не хочется переписывать все компоненты.

В Angular можно сделать абстракцию через InjectionToken:

```ts
export interface Analytics {
  track(event: string): void;
}

export const ANALYTICS = new InjectionToken<Analytics>("ANALYTICS");
```

Реализация:

```ts
@Injectable()
export class ConsoleAnalyticsService implements Analytics {
  track(event: string): void {
    console.log(event);
  }
}
```

Provider:

```ts
bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: ANALYTICS,
      useClass: ConsoleAnalyticsService,
    },
  ],
});
```

Использование:

```ts
@Component({
  // ...
})
export class ButtonComponent {
  private readonly analytics = inject(ANALYTICS);

  click(): void {
    this.analytics.track("button_click");
  }
}
```

Теперь компонент не зависит от конкретного класса. Можно заменить реализацию:

```ts
providers: [
  {
    provide: ANALYTICS,
    useClass: FirebaseAnalyticsService,
  },
];
```

Компонент не меняется.

###### 3. L — Liskov Substitution Principle

Любую реализацию интерфейса можно заменить другой, если она соблюдает тот же контракт.

Например, у нас есть контракт:

```ts
export interface AuthStorage {
  getToken(): string | null;
  setToken(token: string): void;
}
```

Одна реализация хранит токен в localStorage:

```ts
@Injectable()
export class LocalStorageAuthStorage implements AuthStorage {
  getToken(): string | null {
    return localStorage.getItem("token");
  }

  setToken(token: string): void {
    localStorage.setItem("token", token);
  }
}
```

Другая — в памяти:

```ts
@Injectable()
export class MemoryAuthStorage implements AuthStorage {
  private token: string | null = null;

  getToken(): string | null {
    return this.token;
  }

  setToken(token: string): void {
    this.token = token;
  }
}
```

DI позволяет подставить любую реализацию:

```ts
export const AUTH_STORAGE = new InjectionToken<AuthStorage>("AUTH_STORAGE");

providers: [
  {
    provide: AUTH_STORAGE,
    useClass: LocalStorageAuthStorage,
  },
];
```

А потребитель не знает, какая реализация внутри:

```ts
@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly storage = inject(AUTH_STORAGE);

  getToken(): string | null {
    return this.storage.getToken();
  }
}
```

Если заменить LocalStorageAuthStorage на MemoryAuthStorage, AuthService должен продолжить работать.

###### 4. I — Interface Segregation Principle

Не заставляй класс зависеть от методов, которые ему не нужны.

Плохо:

```ts
export interface UserFacade {
  loadUser(): Observable<User>;
  updateUser(user: User): Observable<User>;
  deleteUser(id: string): Observable<void>;
  exportUsers(): Observable<Blob>;
  sendMarketingEmail(): void;
}
```

Компоненту профиля нужен только loadUser, но он зависит от огромного интерфейса.

Лучше разделить:

```ts
export interface UserReader {
  loadUser(): Observable<User>;
}

export interface UserWriter {
  updateUser(user: User): Observable<User>;
}
```

Токен:

```ts
export const USER_READER = new InjectionToken<UserReader>("USER_READER");
```

Компонент:

```ts
@Component({
  // ...
})
export class ProfileComponent {
  private readonly userReader = inject(USER_READER);

  ngOnInit(): void {
    this.userReader.loadUser().subscribe();
  }
}
```

Компонент зависит только от того, что ему реально нужно.

###### 5. D — Dependency Inversion Principle

Это главный принцип, связанный с DI. Высокоуровневый код не должен зависеть от низкоуровневых деталей. Оба должны зависеть от абстракций.

Плохо:

```ts
export class AuthService {
  private readonly storage = new LocalStorageAuthStorage();
}
```

AuthService зависит от конкретной детали: LocalStorageAuthStorage.

Лучше:

```ts
export interface AuthStorage {
  getToken(): string | null;
  setToken(token: string): void;
}

export const AUTH_STORAGE = new InjectionToken<AuthStorage>("AUTH_STORAGE");
```

```ts
@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly storage = inject(AUTH_STORAGE);
}
```

```ts
providers: [
  {
    provide: AUTH_STORAGE,
    useClass: LocalStorageAuthStorage,
  },
];
```

Теперь AuthService зависит не от конкретной реализации, а от абстракции.

##### Главная мысль

DI в Angular — это не просто “удобно получить сервис”.

Это способ сделать код:

- менее связанным;
- проще тестируемым;
- легче расширяемым;
- более соответствующим SOLID;
- более безопасным для замены реализаций.

Самая важная связь с SOLID — это Dependency Inversion:

Компонент или сервис должен зависеть не от конкретной реализации, а от контракта/абстракции.

</details>

### Performance и PWA

<details>
<summary>Для чего нужны service worker?</summary>

Service Worker — это фоновый слой между сайтом и сетью.

Service Worker — это JavaScript-файл, который браузер запускает отдельно от страницы. Он может перехватывать сетевые запросы, работать с кешем, получать push-уведомления и помогать сайту работать офлайн.

</details>

## Базовые вопросы для Junior/Middle

### Frontend fundamentals

<details>
<summary>В чем отличие фреймворка от библиотеки (приведите примеры и отличия)?</summary>

**Библиотека** решает отдельную задачу, а приложение само определяет архитектуру и момент вызова библиотеки. Примеры: RxJS, Lodash, date-fns.

**Фреймворк** задает каркас приложения, жизненный цикл, правила организации кода и сам вызывает пользовательский код в нужный момент. Это называют inversion of control. Примеры: Angular, NestJS.

Angular предоставляет не только рендеринг, но и DI, Router, формы, HTTP-клиент, компиляцию шаблонов, CLI и инструменты тестирования. Поэтому Angular является платформой и фреймворком, а не просто UI-библиотекой.

</details>

<details>
<summary>Какие популярные CSS, JS библиотеки вы знаете?</summary>

Примеры, которые уместно назвать вместе с их назначением:

- UI и CSS: Angular Material, Taiga UI, Bootstrap, Tailwind CSS.
- Реактивность: RxJS.
- Работа с датами: date-fns, Luxon.
- Утилиты: Lodash.
- Графики: D3.js, Chart.js, ECharts.
- Тестирование: Vitest, Jest, Jasmine, Cypress, Playwright.
- Управление состоянием Angular: NgRx, NGXS.

На собеседовании важнее объяснить, какую проблему решает библиотека и почему она была выбрана, чем перечислить много названий.

</details>

### Browser rendering

<details>
<summary>Знаете ли вы как браузер обрабатывает index.html (расскажите про Critical Rendering Path)?</summary>

Основные этапы Critical Rendering Path:

1. Браузер получает HTML и постепенно строит DOM.
2. При обнаружении CSS загружает его и строит CSSOM. CSS блокирует первый рендер.
3. Обычный синхронный `<script>` может остановить разбор HTML до загрузки и выполнения JavaScript.
4. DOM и CSSOM объединяются в render tree.
5. Layout вычисляет размеры и положение видимых элементов.
6. Paint рисует пиксели.
7. Compositing объединяет слои и выводит кадр на экран.

`defer` загружает скрипт параллельно и выполняет после разбора HTML с сохранением порядка. `async` выполняет скрипт сразу после загрузки, поэтому порядок не гарантирован.

Для ускорения первого рендера уменьшают блокирующие CSS/JS, используют code splitting, оптимизируют шрифты и изображения, кеширование и SSR/SSG там, где это оправдано.

</details>

### JavaScript

<details>
<summary>Какие типы данных есть в JavaScript?</summary>

В JavaScript есть семь примитивных типов:

- `string`;
- `number`;
- `bigint`;
- `boolean`;
- `undefined`;
- `symbol`;
- `null`.

Все остальные значения относятся к типу `object`: обычные объекты, массивы, функции, даты, коллекции и другие встроенные объекты.

Примитивы неизменяемы и сравниваются по значению. Объекты изменяемы и переменные хранят ссылку на объект. Историческая особенность языка: `typeof null === "object"`.

</details>

<details>
<summary>Как устроена память в JavaScript (memory heap, memory stack)?</summary>

Упрощенная модель состоит из call stack и heap:

- В стеке находятся контексты вызова функций, параметры и локальные данные, необходимые текущему вызову.
- В heap динамически размещаются объекты, функции, замыкания и другие значения с произвольным временем жизни.
- Переменная с объектом фактически хранит ссылку на область памяти.

Сборщик мусора освобождает объекты, которые больше недостижимы от корней приложения. Основная идея современных сборщиков мусора — mark and sweep.

Типичные причины утечек: забытые подписки и обработчики, бесконечно растущий кеш, таймеры, замыкания и ссылки на удаленные DOM-узлы. В Angular для подписок можно использовать `AsyncPipe`, `toSignal()` или `takeUntilDestroyed()`.

</details>

<details>
<summary>Что такое this и расскажите про область видимости?</summary>

Область видимости определяет, где доступна переменная. В JavaScript есть глобальная, модульная, функциональная и блочная область видимости. `let` и `const` имеют блочную область, `var` — функциональную.

`this` определяется способом вызова функции:

- `obj.method()` — `this` обычно равен `obj`;
- `fn.call(value)` / `apply` / `bind` — значение задается явно;
- `new Constructor()` — `this` указывает на создаваемый объект;
- при обычном вызове в strict mode — `undefined`;
- стрелочная функция не имеет собственного `this` и берет его из внешней области.

```ts
class Counter {
  count = 0;

  increment = (): void => {
    this.count += 1;
  };
}
```

Нельзя определять `this` только по месту объявления обычной функции: важно место и форма вызова.

</details>

<details>
<summary>В чем отличие var от const, let?</summary>

- `var` имеет функциональную область видимости, допускает повторное объявление и поднимается с начальным значением `undefined`.
- `let` имеет блочную область видимости, допускает повторное присваивание, но не повторное объявление в том же блоке.
- `const` имеет блочную область видимости и требует значение при объявлении; повторное присваивание запрещено.

`let` и `const` тоже поднимаются, но до инициализации находятся в temporal dead zone.

`const` запрещает изменить саму ссылку, но не делает объект неизменяемым:

```ts
const user = { name: "Ann" };
user.name = "Kate"; // Допустимо
```

По умолчанию используют `const`, а `let` — только когда переменную действительно нужно переназначить. `var` в современном коде обычно не используют.

</details>

<details>
<summary>Объясните, как работает наследование прототипов, что такое цепочка прототипов, и когда появилось ключевое слова class в JS?</summary>

Каждый обычный объект может иметь внутреннюю ссылку `[[Prototype]]` на другой объект. Если свойства нет у самого объекта, JavaScript ищет его в прототипе, затем в прототипе прототипа и так далее до `null`. Это и есть цепочка прототипов.

```ts
const animal = { moves: true };
const dog = Object.create(animal);

dog.barks = true;
console.log(dog.moves); // Найдено в прототипе
```

Синтаксис `class` появился в ECMAScript 2015. Он делает создание конструкторов, методов и наследования удобнее, но в основе по-прежнему лежит прототипная модель.

Слишком глубокие и изменяемые цепочки усложняют код. В прикладной разработке часто предпочитают композицию небольших объектов наследованию.

</details>

<details>
<summary>Что такое структура данных и какие виды вы знаете (Стек, etc)?</summary>

Структура данных — способ организовать данные и операции над ними.

- Массив: быстрый доступ по индексу, последовательное хранение.
- Связный список: удобные вставки и удаления при наличии ссылки на узел.
- Стек: LIFO, пример — call stack.
- Очередь: FIFO, пример — очередь задач.
- `Map`: пары ключ-значение с ключами любого типа.
- `Set`: множество уникальных значений.
- Дерево: иерархия, пример — DOM и дерево компонентов.
- Граф: вершины и связи, пример — зависимости модулей.
- Heap: структура для быстрого получения минимального или максимального элемента.

На собеседовании полезно сравнить сложность основных операций по времени и памяти, а не только дать определения.

</details>

<details>
<summary>Что такое Promise и для чего используется в JS?</summary>

`Promise<T>` представляет будущий результат одной асинхронной операции. У него есть состояния `pending`, `fulfilled` и `rejected`; после выполнения состояние изменить нельзя.

```ts
fetch("/api/users")
  .then((response) => response.json())
  .catch((error: unknown) => handleError(error))
  .finally(() => hideLoader());
```

Обработчики `then`, `catch` и `finally` выполняются как microtasks. `async/await` — более читаемый синтаксис поверх Promise.

Для параллельной работы есть `Promise.all`, `allSettled`, `race` и `any`. Сам Promise не предоставляет универсальной отмены операции; для `fetch` используют `AbortController`.

</details>

<details>
<summary>Что такое call-stack, task-queue (приведите примеры работы)?</summary>

Call stack хранит активные вызовы функций. JavaScript выполняет верхний frame стека и снимает его после возврата из функции.

Task queue содержит готовые к выполнению задачи: таймеры, DOM-события и другие callbacks. Event loop передает следующую задачу в стек, когда стек пуст и обработаны microtasks.

```ts
console.log("A");

setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));

console.log("D");
```

Порядок вывода: `A`, `D`, `C`, `B`. Синхронный код выполняется первым, затем microtasks, затем следующая task.

</details>

<details>
<summary>Что такое макро и микро задачи в JS?</summary>

Термин task часто неформально называют macrotask.

- Tasks: выполнение скрипта, `setTimeout`, `setInterval`, события UI, сетевые callbacks.
- Microtasks: обработчики Promise, `queueMicrotask`, `MutationObserver`.

После завершения текущей task движок полностью очищает очередь microtasks и только затем может выполнить рендер и перейти к следующей task.

Если microtasks непрерывно добавляют новые microtasks, они могут задержать рендер и обработку событий. Поэтому тяжелую работу нельзя бесконечно дробить только через Promise или `queueMicrotask`.

</details>

<details>
<summary>Назовите основные принципы ООП?</summary>

- **Инкапсуляция** — объект скрывает внутреннее состояние и предоставляет контролируемый API.
- **Абстракция** — наружу выносится существенное поведение, детали реализации скрываются.
- **Наследование** — новый тип переиспользует и расширяет поведение базового типа.
- **Полиморфизм** — разные реализации используются через общий контракт.

ООП не требует применять наследование везде. В Angular чаще полезны композиция компонентов и сервисов, DI и небольшие интерфейсы.

Отдельно часто спрашивают SOLID: пять принципов проектирования, которые помогают уменьшать связанность и делать код расширяемым и тестируемым.

</details>

<details>
<summary>Что такое класс и интерфейс?</summary>

Класс описывает создание объектов, их состояние и поведение. Класс существует во время выполнения JavaScript.

Интерфейс TypeScript описывает контракт формы значения и используется только при проверке типов. После компиляции интерфейс исчезает.

```ts
interface UserRepository {
  findById(id: string): Promise<User | null>;
}

class HttpUserRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    return loadUser(id);
  }
}
```

Интерфейс нельзя напрямую использовать как Angular DI-токен, потому что его нет в runtime. Для DI используют класс, `InjectionToken` или другой runtime-токен.

</details>

<details>
<summary>Что такое конструктор класса?</summary>

Конструктор — специальный метод, который выполняется при создании экземпляра через `new`. Он инициализирует обязательное состояние объекта и принимает зависимости или параметры.

```ts
class User {
  constructor(readonly id: string, readonly name: string) {}
}
```

В производном классе до обращения к `this` нужно вызвать `super()`.

В Angular конструктор класса не является lifecycle hook. Для компонентов он должен оставаться простым: DI и базовая инициализация выполняются в конструкторе, а логика, зависящая от входных данных, размещается в соответствующем lifecycle hook или реактивной модели.

</details>

### HTTP

<details>
<summary>Расскажите про стек TCP/IP, а также более подробно про, что такое HTTP и какую роль он играет при разработке приложений?</summary>

Упрощенная модель TCP/IP:

1. Прикладной уровень: HTTP, DNS, WebSocket.
2. Транспортный уровень: TCP или UDP.
3. Сетевой уровень: IP и маршрутизация пакетов.
4. Канальный уровень: передача кадров внутри локальной сети.

HTTP — протокол прикладного уровня с моделью request/response. Клиент отправляет метод, URL, заголовки и при необходимости body; сервер возвращает status code, заголовки и body.

HTTPS — HTTP поверх защищенного TLS-соединения. TCP обеспечивает надежную упорядоченную доставку для HTTP/1.1 и HTTP/2; HTTP/3 использует QUIC поверх UDP.

Для frontend-разработчика важны методы, коды ответа, заголовки, кеширование, cookies, CORS, TLS, сжатие и понимание того, что количество и размер запросов влияют на производительность.

</details>

<details>
<summary>Что такое REST API, как происходит взаимодействие (расскажите про основные коды ошибок, заголовки пакетов и способы их отправки)?</summary>

REST — архитектурный стиль, в котором ресурсы имеют URL, а стандартные HTTP-методы выражают операции:

- `GET /users/42` — получить ресурс;
- `POST /users` — создать;
- `PUT /users/42` — заменить;
- `PATCH /users/42` — частично изменить;
- `DELETE /users/42` — удалить.

Основные группы статусов:

- `2xx`: успех, например `200`, `201`, `204`;
- `3xx`: перенаправление и кеш, например `301`, `304`;
- `4xx`: ошибка клиента, например `400`, `401`, `403`, `404`, `409`, `422`, `429`;
- `5xx`: ошибка сервера, например `500`, `502`, `503`.

Частые заголовки: `Content-Type`, `Accept`, `Authorization`, `Cache-Control`, `ETag`, `Cookie`, `Set-Cookie`, CORS-заголовки.

REST предполагает stateless-взаимодействие: каждый запрос содержит достаточно контекста для обработки. Идемпотентность означает, что повторный одинаковый запрос имеет тот же итоговый эффект; обычно `GET`, `PUT` и `DELETE` проектируют идемпотентными.

</details>

## TypeScript

<details>
<summary>Зачем нам нужны определения типов, где есть JavaScript c динамической типизацией?</summary>

Динамическая типизация удобна во время выполнения, но многие ошибки можно обнаружить раньше:

- неправильное имя свойства;
- передача аргумента неверного типа;
- забытая обработка `null`;
- несовместимое изменение публичного API.

TypeScript добавляет статический анализ, автодополнение, безопасный рефакторинг и явные контракты между частями приложения. Типы не заменяют runtime-валидацию: данные от API, пользователя и внешних систем все равно считаются недоверенными и должны проверяться.

После компиляции большинство типов удаляется, а браузер выполняет обычный JavaScript.

</details>

<details>
<summary>Что такое пользовательский тип данных</summary>

Пользовательский тип описывает доменную модель приложения с помощью `type`, `interface`, класса, enum или их комбинации.

```ts
type UserId = string;

interface User {
  readonly id: UserId;
  readonly name: string;
  readonly role: "admin" | "user";
}
```

Хороший тип выражает ограничения предметной области и делает недопустимые состояния трудными для представления. Для вариантов состояния удобно использовать discriminated union, а для runtime-поведения и DI — классы.

</details>

<details>
<summary>Что такое Union Type (тип объединения) и для чего используется?</summary>

Union type означает, что значение может принадлежать одному из нескольких типов:

```ts
type RequestState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: string };
```

Перед использованием специфичных свойств union нужно сузить тип через `typeof`, `instanceof`, оператор `in`, проверку discriminant-поля или type guard.

Discriminated union часто лучше набора независимых boolean-флагов: он не позволяет одновременно представить несовместимые состояния, например `loading` и `success`.

</details>

<details>
<summary>Поддерживает ли TypeScript перегрузку методов?</summary>

Да. TypeScript поддерживает несколько сигнатур перегрузки и одну общую реализацию.

```ts
function format(value: number): string;
function format(value: Date): string;
function format(value: number | Date): string {
  return value instanceof Date ? value.toISOString() : value.toFixed(2);
}
```

Сигнатура реализации не видна вызывающему коду и должна быть совместима со всеми перегрузками. В runtime существует только одна JavaScript-функция, поэтому различение вариантов выполняет сама реализация.

Если union-параметр дает такой же понятный API, обычно он проще перегрузок.

</details>

<details>
<summary>Возможна ли перегрузка конструктора в TypeScript?</summary>

Да, с тем же ограничением: можно описать несколько сигнатур, но реализация конструктора остается одна.

```ts
class Point {
  readonly x: number;
  readonly y: number;

  constructor();
  constructor(x: number, y: number);
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}
```

Нельзя написать несколько тел `constructor`, как в некоторых языках. При большом числе вариантов часто понятнее использовать именованные фабричные методы.

</details>

<details>
<summary>Поддерживает ли TypeScript перегрузку методов (конструкторов)?</summary>

TypeScript поддерживает перегрузку функций, методов и конструкторов на уровне типов. Сначала объявляются доступные вызывающему коду сигнатуры, затем одна совместимая реализация.

В скомпилированном JavaScript остается одна функция или один конструктор. Поэтому перегрузка не выбирает разные реализации автоматически: код должен сам сузить аргументы.

Перегрузки нужны, когда разные наборы аргументов дают разные, точно связанные возвращаемые типы. Для простых случаев предпочтительнее union types, optional-параметры или объект параметров.

</details>

<details>
<summary>Что такое декоратор и какие виды декораторов вы знаете?</summary>

Декоратор — способ добавления метаданных к объявлению класса. Это специальный вид объявления, который может быть присоединен к объявлению класса, методу, методу доступа, свойству или параметру.

Декораторы используют форму @expression, где expression - функция, которая будет вызываться во время выполнения с информацией о декорированном объявлении.

И, чтобы написать собственный декоратор, нам нужно сделать его factory и определить тип:

- ClassDecorator
- PropertyDecorator
- MethodDecorator
- ParameterDecorator

**Декоратор класса**

Вызывается перед объявлением класса, применяется к конструктору класса и может использоваться для наблюдения, изменения или замены определения класса. Expression декоратора класса будет вызываться как функция во время выполнения, при этом конструктор декорированного класса является единственным аргументом. Если класс декоратора возвращает значение, он заменит объявление класса вернувшимся значением.

```ts
export function logClass(target: Function) {
  // Сохранение ссылки на оригинальный конструктор
  const original = target;

  // Функция генерирует экземпляры класса
  function construct(constructor, args) {
    const c: any = function () {
      return constructor.apply(this, args);
    };
    c.prototype = constructor.prototype;
    return new c();
  }

  // Определение поведения нового конструктора
  const f: any = function (...args) {
    console.log(`New: ${original["name"]} is created`);
    //New: Employee создан
    return construct(original, args);
  };

  // Копирование прототипа, чтобы оператор intanceof работал
  f.prototype = original.prototype;

  // Возвращает новый конструктор, переписывающий оригинальный
  return f;
}

@logClass
class Employee {}

let emp = new Employee();
console.log("emp instanceof Employee");
//emp instanceof Employee
console.log(emp instanceof Employee);
//true
```

**Декоратор свойства**

Объявляется непосредственно перед объявлением метода. Будет вызываться как функция во время выполнения со следующими двумя аргументами:

- target - прототип текущего объекта, т.е. если Employee является объектом, Employee.prototype
- propertyKey - название свойства

```ts
function logParameter(target: Object, propertyName: string) {
  // Значение свойства
  let _val = this[propertyName];

  // Геттер свойства
  const getter = () => {
    console.log(`Get: ${propertyName} => ${_val}`);
    return _val;
  };

  // Сеттер свойства
  const setter = (newVal) => {
    console.log(`Set: ${propertyName} => ${newVal}`);
    _val = newVal;
  };

  // Удаление свойства
  if (delete this[propertyName]) {
    // Создает новое свойство с геттером и сеттером
    Object.defineProperty(target, propertyName, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  }
}

class Employee {
  @logParameter
  name: string;
}

const emp = new Employee();
emp.name = "Mohan Ram";
console.log(emp.name);

// Set: name => Mohan Ram
// Get: name => Mohan Ram
// Mohan Ram
```

**Декоратор метода**

Объявляется непосредственно перед объявлением метода. Будет вызываться как функция во время выполнения со следующими двумя аргументами:

- target - прототип текущего объекта, т.е. если Employee является объектом, Employee.prototype
- propertyName - название свойства
- descriptor - дескриптор свойства метода т.е. - Object.getOwnPropertyDescriptor (Employee.prototype, propertyName)

  ```ts
  export function logMethod(
    target: Object,
    propertyName: string,
    propertyDescriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const method = propertyDescriptor.value;

    propertyDescriptor.value = function (...args: any[]) {
      // Конвертация списка аргументов greet в строку
      const params = args.map((a) => JSON.stringify(a)).join();

      // Вызов greet() и получение вернувшегося значения
      const result = method.apply(this, args);

      // Конвертация результата в строку
      const r = JSON.stringify(result);

      // Отображение в консоли деталей вызова
      console.log(`Call: ${propertyName}(${params}) => ${r}`);

      // Возвращение результата вызова
      return result;
    };
    return propertyDescriptor;
  }

  class Employee {
    constructor(private firstName: string, private lastName: string) {}

    @logMethod
    greet(message: string): string {
      return `${this.firstName} ${this.lastName} says: ${message}`;
    }
  }

  const emp = new Employee("Mohan Ram", "Ratnakumar");
  emp.greet("hello");
  //Call: greet("hello") => "Mohan Ram Ratnakumar says: hello"
  ```

**Декоратор параметра**

Объявляется непосредственно перед объявлением метода. Будет вызываться как функция во время выполнения со следующими двумя аргументами:

- target - прототип текущего объекта, т.е. если Employee является объектом, Employee.prototype
- propertyKey - название свойства
- index - индекс параметра в массиве аргументов

```ts
function logParameter(target: Object, propertyName: string, index: number) {
  // Генерация метаданных для соответствующего метода
  // для сохранения позиции декорированных параметров
  const metadataKey = `log_${propertyName}_parameters`;

  if (Array.isArray(target[metadataKey])) {
    target[metadataKey].push(index);
  } else {
    target[metadataKey] = [index];
  }
}

class Employee {
  greet(@logParameter message: string): void {
    console.log(`hello ${message}`);
  }
}
const emp = new Employee();
emp.greet("world");
```

</details>

## Angular: основные темы

### Основные концепции

<details>
<summary>Что такое Angular?</summary>

Angular — TypeScript-платформа для создания web-приложений. Она включает compiler, declarative templates, components, signals, DI, Router, forms, HttpClient, SSR/SSG/hydration, service worker, CLI и testing APIs.

Современная модель Angular 19–22:

- standalone components, directives и pipes; с Angular 19 они standalone по умолчанию;
- `bootstrapApplication()` и functional providers;
- signals для локального и template-facing состояния;
- `input()`, `output()`, `model()` и signal queries;
- built-in control flow `@if`, `@for`, `@switch` и `@defer`;
- RxJS для сложных асинхронных потоков;
- zoneless change detection по умолчанию с Angular 21;
- server-side и hybrid rendering через `@angular/ssr`.

Плюсы: единая экосистема, строгая типизация шаблонов, предсказуемая архитектура, хороший tooling и масштабируемость.

Минусы: большой API surface, необходимость понимать DI, reactivity, Router, rendering и RxJS; неправильные границы состояния или feature могут сделать приложение сложным независимо от выбранного state manager.

</details>

<details>
<summary>В чем разница между AngularJS и Angular?</summary>

**AngularJS** является фреймворком, который может помочь вам в разработке Single Page Application. Он появился в 2009 году и с годами выяснилось, что имел много проблем. **Angular** (Angular 2+) же в свою очередь направлен на тоже самое, но дает больше преимуществ по сравнению с AngularJS 1.x, включая лучшую производительность, ленивую загрузку, более простой API, более легкую отладку.

**Что появилось в Angular**:

- Angular ориентирован на мобильные платформы и имеет лучшую производительность
- Angular имеет встроенные сервисы для поддержки интернационализации
- AngularJS проще настроить, чем Angular
- AngularJS использует контроллеры и $scope
- Angular имеет много способов определения локальных переменных
- В Angular новый синтаксис структурных директив (camelCase)
- Angular работает напрямую с свойствами и событиями DOM элементов
- Одностороннее связывание данных через [property]
- Двустороннее связывание данных через [(property)]
- Новый механизм DI, роутинга, запуска приложения

**Основные преимущества Angular**:

- Обратная совместимость Angular 2, 4, 5, ..
- TypeScript с улучшенной проверкой типов
- Встроенный компилятор с режимами JIT и AOT (+сокращение кода)
- Встроенные анимации

</details>

<details>
<summary>Какой должна быть структура каталогов компонентов любого Angular приложения и почему?</summary>

Универсальной структуры нет: она зависит от размера продукта и команды. Для приложения обычно лучше группировка по feature/domain, а не один глобальный каталог `components`, `services`, `models`.

```text
src/app/
  core/
    auth/
    http/
  shared/
    ui/
    pipes/
  features/
    orders/
      data-access/
      ui/
      pages/
      orders.routes.ts
  app.config.ts
  app.routes.ts
```

- `features` содержит бизнес-функции и их локальные зависимости.
- `shared` содержит действительно переиспользуемые, не зависящие от продукта элементы.
- `core` содержит инфраструктуру приложения: авторизацию, конфигурацию, глобальные interceptors.
- Routes и lazy-loading задают явные границы feature.
- Файлы компонента обычно лежат рядом: `.ts`, `.html`, `.less`/`.css`, `.spec.ts`.

Главные критерии: связанный код находится рядом, публичный API узкий, зависимости направлены от feature к общим слоям, а не между случайными feature.

</details>

<details>
<summary>Что такое MVVM и в чем разница перед MVC?</summary>
  
 **MVVM** - шаблон проектирования архитектуры приложения. Состоит из 3 ключевых блоков: Model, View, ViewModel.
  
Отличие от MVС заключаются в:

- View реагирует на действия пользователя и передает их во View Model через Data Binding.
- View Model, в отличие от контроллера в MVC, имеет особый механизм, автоматизирующий связь между View и связанными свойствами в ViewModel.

Привязка данных между View и ViewModel может быть односторонней или двусторонней (one-way, two-way data-binding).

</details>

### Templates

<details>
<summary>Что такое интерполяция в Angular?</summary>

Разметка интерполяции с внедренными выражениями используется в Angular для присвоения данных текстовым нодам и значения аттрибутов. Например:

```html
<a href="img/{{username}}.jpg">Hello {{username}}!</a>
```

</details>

<details>
<summary>Какие способы использования шаблонов в Angular вы знаете?</summary>

Шаблон можно задать:

- внешним файлом через `templateUrl`;
- inline-строкой через `template`;
- переиспользуемым фрагментом `<ng-template>`;
- переданным `TemplateRef`, например через content query или input;
- динамически вставленным через `ViewContainerRef`.

В шаблонах используются интерполяция, property/event binding, control flow `@if`, `@for`, `@switch`, pipes, template reference variables и content projection через `<ng-content>`.

Для обычного компонента предпочтителен внешний `.html`, если шаблон не тривиален. Шаблон не должен содержать тяжелые вычисления и побочные эффекты: подготовку данных лучше выполнять в компоненте, `computed()` или pipe.

</details>

<details>
<summary>В чем разница между структурной и атрибутной директивой, назовите встроенные директивы?</summary>

**Структурные директивы** управляют структурой представления: создают, удаляют или повторяют embedded views. Классические примеры — `NgIf`, `NgFor`, `NgSwitch`, пользовательская директива на `<ng-template>`.

В Angular 19–22 для обычных условий и циклов используют встроенный control flow:

```html
@if (user()) {
<app-profile [user]="user()" />
} @for (item of items(); track item.id) {
<app-item [item]="item" />
} @empty {
<p>Список пуст</p>
}
```

`@if`, `@for` и `@switch` встроены в синтаксис шаблонов и не требуют импорта `CommonModule`.

**Атрибутные директивы** изменяют поведение или свойства существующего элемента. Примеры: `RouterLink`, `NgModel`, собственная `appTooltip`.

Для классов и стилей предпочтительны прямые bindings:

```html
<button [class.active]="isActive()" [style.width.px]="width()">...</button>
```

`NgClass`, `NgStyle`, `*ngIf` и `*ngFor` остаются поддерживаемыми для существующего кода, но не являются первым выбором для новых шаблонов.

</details>

<details>
<summary>Для чего нужны директивы ng-template, ng-container, ng-content?</summary>
В современном Angular:

- `<ng-template>` хранит неотрендеренный `TemplateRef`, который можно создать позже через `ViewContainerRef`, `NgTemplateOutlet` или пользовательскую структурную директиву.
- `<ng-container>` группирует элементы, не добавляя лишний DOM-узел. С `@if` и `@for` он нужен реже, но полезен для `ngTemplateOutlet`, `ngComponentOutlet` и DI-границ.
- `<ng-content>` задает compile-time content projection. Для нескольких областей используют `select`.

```html
@if (lessons(); as items) { @for (lesson of items; track lesson.id) {
<app-lesson [lesson]="lesson" />
} } @else {
<ng-container [ngTemplateOutlet]="loading" />
}

<ng-template #loading>Загрузка...</ng-template>
```

Ниже приведен legacy-синтаксис `*ngIf/*ngFor`, который всё еще встречается в проектах до миграции на built-in control flow.

#### 1. ng-template

`<template>` — это механизм для отложенного рендера клиентского контента, который не отображается во время загрузки, но может быть инициализирован при помощи JavaScript.

Template можно представить себе как фрагмент контента, сохранённый для последующего использования в документе. Хотя парсер и обрабатывает содержимое элемента `template` во время загрузки страницы, он делает это только чтобы убедиться в валидности содержимого; само содержимое при этом не отображается.

`<ng-template>` - является имплементацией стандартного элемента template, данный элемент появился с четвертой версии Angular, это было сделано с точки зрения совместимости со встраиваемыми на страницу template элементами, которые могли попасть в шаблон ваших компонентов по тем или иным причинам.

Пример:

```html
<div class="lessons-list" *ngIf="lessons else loading">...</div>

<ng-template #loading>
  <div>Loading...</div>
</ng-template>
```

#### 2. ng-container

`<ng-container>` - это логический контейнер, который может использоваться для группировки узлов, но не отображается в дереве DOM как узел (node).

На самом деле структурные директивы (*ngIf, *ngFor, …) являются синтаксическим сахаром для наших шаблонов. В реальности, данные шаблоны трансформируются в такие конструкции:

```html
<ng-template [ngIf]="lessons" [ngIfElse]="loading">
   <div class="lessons-list">
     ...
   </div>
</div>

<ng-template #loading>
    <div>Loading...</div>
</ng-template>
```

Но что делать, если я хочу применить несколько структурных директив?
(спойлер: к сожалению, так нельзя сделать)

```html
<div class="lesson" *ngIf="lessons" *ngFor="let lesson of lessons">
  <div class="lesson-detail">{{lesson | json}}</div>
</div>
```

```
Uncaught Error: Template parse errors:
Can't have multiple template bindings on one element. Use only one attribute
named 'template' or prefixed with *
```

Но можно сделать так:

```html
<div *ngIf="lessons">
  <div class="lesson" *ngFor="let lesson of lessons">
    <div class="lesson-detail">{{lesson | json}}</div>
  </div>
</div>
```

Однако, чтобы избежать необходимости создавать дополнительный div, мы можем вместо этого использовать директиву ng-container:

```html
<ng-container *ngIf="lessons">
  <div class="lesson" *ngFor="let lesson of lessons">
    <div class="lesson-detail">{{lesson | json}}</div>
  </div>
</ng-container>
```

Как мы видим, директива ng-container предоставляет нам элемент, в котором мы можем использовать структурную директиву, без необходимости создавать дополнительный элемент.

Еще пара примечательных примеров, если все же вы хотите использовать ng-template вместо ng-container, по определенным правилам вы не сможете использовать полную конструкцию структурных директив.

Вы можете писать либо так:

```html
<div class="mainWrap">
  <ng-container *ngIf="true">
    <h2>Title</h2>
    <div>Content</div>
  </ng-container>
</div>
```

Либо так:

```html
<div class="mainWrap">
  <ng-template [ngIf]="true">
    <h2>Title</h2>
    <div>Content</div>
  </ng-template>
</div>
```

На выходе, при рендеринге будет одно и тоже:

```html
<div class="mainWrap">
  <h2>Title</h2>
  <div>Content</div>
</div>
```

#### 3. ng-content

`<ng-content>` - позволяет внедрять родительским компонентам html-код в дочерние компоненты.

Здесь на самом деле, немного сложнее уже чем с ng-template, ng-container. Так как ng-content решает задачу проецирования контента в ваши веб-компоненты. Веб-компоненты состоят из нескольких отдельных технологий. Вы можете думать о Веб-компонентах как о переиспользуемых виджетах пользовательского интерфейса, которые создаются с помощью открытых веб-технологий. Они являются частью браузера и поэтому не нуждаются во внешних библиотеках, таких как jQuery или Dojo. Существующий Веб-компонент может быть использован без написания кода, просто путем импорта выражения на HTML-страницу. Веб-компоненты используют новые или разрабатываемые стандартные возможности браузера.

Давайте представим ситуацию от обратного, нам нужно параметризовать наш компонент. Мы хотим сделать так, чтобы на вход в компонент мы могли передать какие-либо статичные данные. Это можно сделать несколькими способами.

comment.component.ts:

```ts
@Component({
  selector: "comment",
  template: `
    <h1>Комментарий:</h1>
    <p>{{ data }}</p>
  `,
})
export class CommentComponent {
  readonly data = input.required<string>();
}
```

app.component.html

```html
@for (message of comments(); track message.id) {
<comment [data]="message.text" />
}
```

Но можно поступить и другим путем.

comment.component.ts:

```ts
@Component({
  selector: "comment",
  template: `
    <h1>Комментарий:</h1>
    <ng-content></ng-content>
  `,
})
export class CommentComponent {}
```

app.component.html

```html
@for (message of comments(); track message.id) {
<comment>
  <p>{{ message.text }}</p>
</comment>
}
```

Конечно, эти примеры плохо демонстрируют подводные камни, свои плюсы и минусы. Но второй способ демонстрирует подход при работе, когда мы оперируем независимыми абстракциями и можем проецировать контент внутрь наших компонентов (подход веб-компонентов).

</details>

### Компоненты, директивы, сервисы и pipes

<details>
<summary>Что такое директива и как создать собственную?</summary>

Директивы бывают трех видов: компонент, структурные и атрибутные (см. выше).

Современная атрибутная директива использует `inject()`, signal input и объект `host`:

```ts
@Directive({
  selector: "[appHighlight]",
  host: {
    "(mouseenter)": "active.set(true)",
    "(mouseleave)": "active.set(false)",
    "[style.backgroundColor]": "active() ? color() : null",
  },
})
export class HighlightDirective {
  readonly color = input("yellow", { alias: "appHighlight" });
  readonly active = signal(false);
}
```

В новом коде объект `host` предпочтительнее `@HostBinding` и `@HostListener`. Прямое изменение DOM через `ElementRef.nativeElement` используют только когда declarative binding или `Renderer2` не решают задачу.

Пользовательская структурная директива работает с `TemplateRef` и `ViewContainerRef`:

```ts
@Directive({
  selector: "[appUnless]",
})
export class UnlessDirective {
  private readonly template = inject(TemplateRef<unknown>);
  private readonly container = inject(ViewContainerRef);
  private readonly condition = input.required<boolean>({alias: "appUnless"});

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

Для обычных условий собственная структурная директива не нужна: используйте `@if`. Она оправдана, когда инкапсулирует повторяемое доменное поведение.

</details>

<details>
<summary>Что такое директива, компонент, модуль, сервис, пайп в Angular и для чего они нужны?</summary>

- **Компонент** — директива с собственным шаблоном. В Angular 19+ компоненты standalone по умолчанию и напрямую импортируют зависимости шаблона в `imports`.
- **Директива** добавляет поведение существующему элементу или шаблону.
- **Сервис** инкапсулирует состояние, бизнес-логику, data access или интеграцию и обычно получается через `inject()`.
- **Pipe** выполняет чистое преобразование значения для отображения в шаблоне.
- **NgModule** группирует declarations/providers в legacy-архитектуре. Он остается поддерживаемым, но для нового приложения базовой моделью являются standalone APIs, `bootstrapApplication()` и route-level providers.

</details>

<details>
<summary>Расскажите об основных параметрах @NgModule, @Component, @Directive, @Injectable, @Pipe</summary>

В Angular 19–22 основной подход — standalone. Компоненты, директивы и pipes standalone по умолчанию; `standalone: true` обычно не пишут.

Основные параметры:

- `@Component`: `selector`, `template`/`templateUrl`, `styles`/`styleUrl`, `imports`, `providers`, `viewProviders`, `changeDetection`, `encapsulation`, `host`.
- `@Directive`: `selector`, `providers`, `host`, `exportAs`.
- `@Injectable`: `providedIn`.
- `@Pipe`: `name`, `pure`.

Inputs, outputs и queries в новом коде объявляют в классе:

```ts
@Component({
  selector: "app-user-card",
  imports: [DatePipe],
  templateUrl: "./user-card.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.selected]": "selected()",
  },
})
export class UserCardComponent {
  readonly user = input.required<User>();
  readonly selected = input(false);
  readonly selectedChange = output<boolean>();
  readonly menu = viewChild(MenuComponent);
}
```

`NgModule` остается поддерживаемым для legacy-кода и некоторых библиотек. Его основные поля: `declarations`, `imports`, `exports`, `providers` и `bootstrap`. `entryComponents`, `ComponentFactoryResolver` и `moduleId` в современном Ivy-приложении не нужны.

</details>

<details>
<summary>Что такое динамические компоненты и как их можно использовать в Angular?</summary>

Динамические компоненты создаются во время выполнения. Типичные случаи: dialogs, overlays, notifications и конфигурируемые widgets.

В Angular 19–22 есть три основных варианта:

1. `@defer` — лениво загрузить тяжелую часть шаблона.
2. `NgComponentOutlet` — выбрать тип компонента в шаблоне.
3. `ViewContainerRef.createComponent()` — создать компонент императивно.

```ts
@Component({
  selector: "app-dialog-host",
  template: `<ng-container #container />`,
})
export class DialogHostComponent {
  private readonly container = viewChild.required("container", {
    read: ViewContainerRef,
  });

  open(): void {
    const componentRef = this.container().createComponent(UserDialogComponent);

    componentRef.setInput("userId", "42");
    componentRef.instance.closed.subscribe(() => componentRef.destroy());
  }
}

export class UserDialogComponent {
  readonly userId = input.required<string>();
  readonly closed = output<void>();
}
```

Для глобальных overlays обычно используют Angular CDK Overlay или API UI-kit. `ComponentFactoryResolver` и `entryComponents` относятся к legacy-подходу.

</details>

<details>
<summary>Как применить анимацию к компонентам?</summary>

В Angular 20.2+ для нового кода рекомендуются CSS-анимации и compiler APIs `animate.enter` / `animate.leave`.

```html
@if (isOpen()) {
<section animate.enter="dialog-enter" animate.leave="dialog-leave">...</section>
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

Для сложной timeline-анимации можно передать функцию и интегрировать GSAP или другую библиотеку. Нужно учитывать `prefers-reduced-motion`.

Legacy DSL из `@angular/animations` с `trigger`, `state` и `transition` deprecated, но может встречаться в существующих приложениях.

</details>

### Lifecycle и rendering

<details>
<summary>Объясните механизм загрузки (bootstrap) Angular-приложения в браузере?</summary>

Современное standalone-приложение запускается через `bootstrapApplication()`:

```ts
import { bootstrapApplication } from "@angular/platform-browser";

import { AppComponent } from "./app/app.component";
import { appConfig } from "./app/app.config";

bootstrapApplication(AppComponent, appConfig).catch(reportError);
```

```ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
```

Angular создает root `EnvironmentInjector`, регистрирует providers, создает корневой компонент и запускает первый render.

NgModule-bootstrap через `platformBrowserDynamic().bootstrapModule(AppModule)` остается поддерживаемым для legacy-приложений, но не является подходом по умолчанию для нового Angular 19–22 кода.

</details>

<details>
<summary>Как происходит взаимодействие компонентов в Angular (опишите components view)?</summary>

Основные способы взаимодействия:

1. **Родитель передает данные ребенку** через `input()`.
2. **Ребенок сообщает о событии** через `output()`.
3. **Двусторонний контракт** компонента объявляется через `model()`.
4. **Доступ к дочернему view** выполняется через signal queries: `viewChild()`, `viewChildren()`.
5. **Несвязанные компоненты** взаимодействуют через feature-сервис состояния, Router или общий store.

```ts
@Component({
  selector: "app-parent",
  template: `
    <app-counter [count]="count()" (increment)="count.set($event)" />
  `,
})
export class ParentComponent {
  readonly count = signal(0);
}

@Component({
  selector: "app-counter",
  template: `
    <button type="button" (click)="increment.emit(count() + 1)">+1</button>
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

Для общего синхронного состояния сервис может инкапсулировать writable signal и наружу отдавать readonly signal. RxJS используют для асинхронных потоков и сложной координации.

`@Input`, `@Output`, `EventEmitter` и decorator queries поддерживаются, но functional signal APIs предпочтительны для нового кода.

</details>

<details>
<summary>Каков жизненный цикл у компонентов?</summary>

Angular 19–22 поддерживает классические lifecycle hooks и render callbacks.

Классические hooks:

- ngOnChanges() - вызывается когда Angular переприсваивает привязанные данные к input properties. Метод получает объект SimpleChanges, со старыми и новыми значениями. Вызывается перед NgOnInit и каждый раз, когда изменяется одно или несколько связанных свойств.
- ngOnInit() - инициализирует директиву/компонент после того, как Angular впервые отобразит связанные свойства и устанавливает входящие параметры.
- ngDoCheck() - при обнаружении изменений, которые Angular не может самостоятельно обнаружить, реагирует на них.
- ngAfterContentInit() - вызывается после того, как Angular спроецирует внешний контент в отображение компонента или отображение с директивой. Вызывается единожды, после первого ngDoCheck().
- ngAfterContentChecked() - реагирует на проверку Angular-ом проецируемого содержимого. Вызывается после ngAfterContentInit() и каждый последующий ngDoCheck().
- ngAfterViewInit() - вызывается после инициализации отображения компонента и дочерних/директив. Вызывается единожды, после первого ngAfterContentChecked().
- ngAfterViewChecked() - реагирует на проверку отображения компонента и дочерних/директив. Вызывается после ngAfterViewInit() и каждый последующий ngAfterContentChecked().
- ngOnDestroy() - после уничтожения директивы/компонента выполняется очистка. Отписывает Observables и отключает обработчики событий, чтобы избежать утечек памяти.

Современные render callbacks:

- `afterNextRender()` выполняется после следующего завершенного render.
- `afterEveryRender()` выполняется после каждого render.
- `afterRenderEffect()` связывает DOM side effect с signals.

Для cleanup удобно использовать `DestroyRef` и `takeUntilDestroyed()`:

```ts
export class SearchComponent {
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.search.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((query) => this.load(query));
  }
}
```

При signal inputs многие реакции выражаются через `computed()` или `effect()`, но `ngOnChanges` остается полезен, если нужны одновременно previous и current values.

</details>

<details>
<summary>Что такое Shadow DOM и как с ним работать в Angular?</summary>

Shadow DOM — браузерный механизм инкапсуляции DOM-поддерева и стилей web component. Внешние стили по умолчанию не проникают внутрь shadow tree, а внутренние не влияют на остальную страницу.

Angular поддерживает режимы `ViewEncapsulation`:

- `Emulated` — режим по умолчанию: Angular эмулирует изоляцию CSS с помощью служебных атрибутов.
- `ShadowDom` — создает настоящий shadow root средствами браузера.
- `None` — стили компонента становятся глобальными.

```ts
@Component({
  selector: "app-player",
  templateUrl: "./player.component.html",
  styleUrl: "./player.component.css",
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class PlayerComponent {}
```

При `ShadowDom` нужно учитывать наследуемые CSS-свойства, CSS custom properties, slots/content projection, тестирование и интеграцию с глобальной дизайн-системой. `::ng-deep` устарел и не должен быть основным способом стилизации.

</details>

<details>
<summary>Что такое Data Binding и какие проблемы связанные с ним вы знаете?</summary>

Data Binding связывает template expression со свойством, атрибутом, классом, стилем или событием.

```html
<h2>{{ user().name }}</h2>
<button [disabled]="saving()" (click)="save()">Сохранить</button>
<div [attr.aria-label]="label()" [class.active]="active()"></div>
```

Для component inputs и outputs используется тот же синтаксис:

```html
<app-editor [document]="document()" (saved)="handleSaved($event)" />
```

Двусторонняя привязка раскрывается в input + output `<name>Change`. В современном компоненте контракт удобно объявлять через `model()`:

```ts
readonly value = model("");
```

```html
<app-editor [(value)]="draft" />
```

Типичные проблемы: тяжелые вычисления в шаблоне, вызовы методов с side effects, мутация объектов с OnPush, неявный сложный two-way data flow и неправильное различение property binding и attribute binding.

</details>

<details>
<summary>Как вы используете одностороннюю и двухстороннюю привязку данных?</summary>

Односторонняя привязка имеет явное направление:

```html
<h2>{{ title }}</h2>
<button [disabled]="isSaving" (click)="save()">Сохранить</button>
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

`model()` автоматически создает input `value` и output `valueChange`. Two-way binding удобен для локального состояния элемента управления, но при сложном data flow явные `input()`/`output()` или форма обычно легче для отладки.

</details>

<details>
<summary>В чем преимущества и недостатки Regular DOM (Angular) перед Virtual DOM (React)?</summary>

Формулировка упрощает реальность: и Angular, и React в итоге обновляют настоящий DOM, но используют разные модели определения изменений.

Angular компилирует шаблон в точные инструкции создания и обновления узлов. Ему не обязательно каждый раз строить новое виртуальное дерево и сравнивать его целиком. React обычно создает новое представление Virtual DOM и выполняет reconciliation.

Преимущества подхода Angular:

- компилятор заранее знает, какие bindings нужно обновлять;
- предсказуемая структура шаблонов;
- хорошая интеграция change detection, signals и DI.

Возможные недостатки:

- лишние проверки при неудачно спроектированном change detection;
- сложнее интеграция ручных DOM-изменений;
- производительность сильно зависит от структуры компонентов, `track`, неизменяемых обновлений и границ реактивности.

Нельзя утверждать, что один подход всегда быстрее. Нужно измерять конкретный сценарий: большие списки, частые события, startup, memory и стоимость обновления.

</details>

<details>
<summary>Что такое ngZone?</summary>

`NgZone` — сервис интеграции Angular с ZoneJS. В zone-based приложении ZoneJS патчит асинхронные browser APIs и помогает Angular определить момент, когда может потребоваться синхронизация представления.

Важно для Angular 19–22:

- Angular 19 обычно использует ZoneJS, если приложение не настроено иначе.
- В Angular 20 zoneless включается через `provideZonelessChangeDetection()`.
- Начиная с Angular 21 zoneless является режимом по умолчанию.

В zoneless-приложении Angular получает точные уведомления от signals, template/host listeners, `AsyncPipe`, `markForCheck()` и установки inputs.

`runOutsideAngular()` полезен в zone-based приложениях для частых событий сторонней библиотеки. В новом коде предпочтительны точные реактивные уведомления, а не ручной глобальный `tick()`.

</details>

<details>
<summary>Как обновлять представление, если ваша модель данных обновляется вне 'зоны'?</summary>

В современном Angular предпочтительно записать новое значение в signal. Это работает и в zoneless-приложении:

```ts
export class ClockComponent {
  readonly time = signal(new Date());

  constructor() {
    setInterval(() => this.time.set(new Date()), 1000);
  }
}
```

Если сторонний callback изменяет обычное поле, можно вызвать `ChangeDetectorRef.markForCheck()`. `detectChanges()` применяют для локальной немедленной проверки в специальных интеграционных сценариях.

`ApplicationRef.tick()` проверяет всё приложение и почти никогда не должен быть обычным решением. `NgZone.run()` актуален только для zone-based интеграций.

Ниже приведены legacy-варианты ручного запуска change detection.

1. Используя метод `ApplicationRef.prototype.tick`, который запустит `change detection` на всем дереве компонентов.

```ts
import { Component, ApplicationRef, NgZone } from "@angular/core";

@Component({
  selector: "app-root",
  template: ` <h1>Hello, {{ name }}!</h1> `,
})
export class AppComponent {
  public name: string = null;

  constructor(private app: ApplicationRef, private zone: NgZone) {
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        this.name = window.prompt("What is your name?", "Jake");
        this.app.tick();
      }, 5000);
    });
  }
}
```

2. Используя метод `NgZone.prototype.run`, который также запустит `change detection` на всем дереве.

```ts
import { Component, NgZone } from "@angular/core";
import { SomeService } from "./some.service";

@Component({
  selector: "app-root",
  template: ` <h1>Hello, {{ name }}!</h1> `,
  providers: [SomeService],
})
export class AppComponent {
  public name: string = null;

  constructor(private zone: NgZone, private service: SomeService) {
    this.zone.runOutsideAngular(() => {
      this.service.getName().then((name: string) => {
        this.zone.run(() => (this.name = name));
      });
    });
  }
}
```

Метод `run` под капотом сам вызывает `tick`, а параметром принимает функцию, которую нужно выполнить перед `tick`. То есть:

```ts
this.zone.run(() => (this.name = name));

// идентично

this.name = name;
this.app.tick();
```

3. Используя метод `ChangeDetectorRef.prototype.detectChanges`, который запустит `change detection` на текущем компоненте и дочерних.

```ts
import { Component, NgZone, ChangeDetectorRef } from "@angular/core";

@Component({
  selector: "app-root",
  template: ` <h1>Hello, {{ name }}!</h1> `,
})
export class AppComponent {
  public name: string = null;

  constructor(private zone: NgZone, private ref: ChangeDetectorRef) {
    this.zone.runOutsideAngular(() => {
      this.name = window.prompt("What is your name?", "Jake");
      this.ref.detectChanges();
    });
  }
}
```

</details>

<details>
<summary>Что такое output(), EventEmitter и как подписываться на события?</summary>

Для нового компонента custom event объявляют через `output()`:

```ts
export class SaveButtonComponent {
  readonly saved = output<SaveResult>();

  save(): void {
    this.saved.emit({ status: "success" });
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

`@Output() readonly saved = new EventEmitter<SaveResult>()` остается поддерживаемым legacy API. `EventEmitter` не следует использовать как event bus в сервисах; для сервисов подходят signals или RxJS.

</details>

### Change Detection и OnPush

<details>
<summary>Что такое Change Detection, как работает Change Detection Mechanism?</summary>

Change Detection — синхронизация состояния приложения с DOM. Angular выполняет скомпилированные инструкции шаблона и обновляет bindings, значения которых изменились.

Angular должен получить уведомление, что view может быть dirty. Основные источники:

- изменение signal, прочитанного шаблоном;
- установка input;
- template или host listener;
- новое значение в `AsyncPipe`;
- `ChangeDetectorRef.markForCheck()`;
- подключение или удаление view.

В zone-based приложении ZoneJS также планирует синхронизацию после async-задач. В zoneless Angular опирается на точные уведомления; начиная с Angular 21 zoneless используется по умолчанию.

Во время одной проверки Angular обходит дерево views сверху вниз. Не следует менять уже проверенное состояние во время рендера.

</details>

<details>
<summary>Какие существуют стратегии обнаружения изменений?</summary>

Есть две стратегии:

- `Default` (`CheckAlways`) — view участвует в каждой запланированной проверке.
- `OnPush` (`CheckOnce`) — Angular может пропустить subtree, пока компонент не получит уведомление об изменении.

`OnPush`-компонент проверяется, когда:

- изменился input по сравнению через `Object.is`;
- событие обработано в его subtree;
- изменился signal, прочитанный шаблоном;
- `AsyncPipe` получил значение;
- вызван `markForCheck()` или view создано/подключено.

```ts
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `{{ user().name }}`,
})
export class UserCardComponent {
  readonly user = input.required<User>();
}
```

Нельзя мутировать объект input на месте и ожидать новую ссылку. Предпочтительны immutable updates и signals.

</details>

<details>
<summary>Сколько Change Detector(ов) может быть во всем приложении?</summary>
У каждого component view есть собственное представление change detection, связанное в дерево views. В Ivy это внутренние структуры `LView`/`TView`; `AbstractChangeDetector` не является актуальной моделью публичного API.

Через `ChangeDetectorRef` можно пометить view для проверки, локально проверить его, detach или reattach. Обычно signals и bindings отправляют необходимые уведомления автоматически.

</details>

<details>
<summary>Основное отличие constructor от ngOnInit?</summary>

Конструктор — механизм JavaScript/TypeScript. Angular создает экземпляр класса и предоставляет injection context, поэтому зависимости можно получать через `inject()` в инициализаторах полей.

`ngOnInit()` — lifecycle hook Angular. Он вызывается один раз после установки initial inputs и до проверки дочерних views.

Signal inputs можно читать в `ngOnInit`, `computed()` и `effect()`. Для чистых производных значений лучше `computed()`, а не копирование input в отдельное поле.

Для DOM-зависимой логики используют `afterNextRender()`/`afterEveryRender()` или after-view hooks.

</details>

### Signals

<details>
<summary>Что такое Signals и когда их использовать?</summary>

Signal — реактивный контейнер для значения. Angular отслеживает чтение signal и обновляет зависящие от него вычисления и представления при изменении.

```ts
export class CounterComponent {
  readonly count = signal(0);
  readonly doubled = computed(() => this.count() * 2);

  increment(): void {
    this.count.update((value) => value + 1);
  }
}
```

- `signal()` хранит изменяемое состояние.
- `computed()` описывает чистое производное значение.
- `effect()` запускает побочный эффект и должен использоваться только для интеграции с внешними системами.
- Значение изменяют через `set()` или `update()`, не мутируя объект внутри signal напрямую.
- `linkedSignal()` создает writable state, которое пересчитывается при изменении источника, но может временно редактироваться пользователем.
- `resource()`/`httpResource()` описывают асинхронные данные в signal-модели; перед использованием нужно учитывать статус API в конкретной версии Angular.
- `toSignal()` и `toObservable()` связывают signals с RxJS на границах.
- `untracked()` читает signal без регистрации зависимости.

Inputs и queries также являются signals:

```ts
export class SearchComponent {
  readonly query = input("");
  readonly field = viewChild.required<ElementRef<HTMLInputElement>>("field");
  readonly normalizedQuery = computed(() => this.query().trim().toLowerCase());
}
```

Signals подходят для локального синхронного состояния, derived state и template-facing значений. RxJS удобнее для отмены, событий во времени, WebSocket, polling и сложной оркестрации. Эти инструменты дополняют друг друга.

</details>

<details>
<summary>В чем разница между input(), output() и model()?</summary>

- `input()` принимает данные от родителя и возвращает readonly `InputSignal`.
- `output()` объявляет custom event и возвращает `OutputEmitterRef`.
- `model()` создает writable input для two-way binding и автоматически добавляет output `<name>Change`.

```ts
export class QuantityComponent {
  readonly min = input(1);
  readonly max = input.required<number>();
  readonly changed = output<number>();
  readonly value = model(1);

  increment(): void {
    const nextValue = Math.min(this.value() + 1, this.max());

    this.value.set(nextValue);
    this.changed.emit(nextValue);
  }
}
```

```html
<app-quantity
  [min]="1"
  [max]="10"
  [(value)]="quantity"
  (changed)="saveQuantity($event)"
/>
```

`input()` поддерживает required inputs, aliases и transforms. `model()` используют, когда ребенок действительно должен изменять связанное значение; для обычного события достаточно `output()`.

`@Input` и `@Output` поддерживаются, но signal-based APIs рекомендуются для нового кода.

</details>

<details>
<summary>В чем разница между computed(), effect() и linkedSignal()?</summary>

`computed()` создает readonly производное значение. Вычисление lazy, memoized и не должно иметь side effects:

```ts
readonly fullName = computed(() => `${this.firstName()} ${this.lastName()}`);
```

`effect()` выполняет побочный эффект при изменении прочитанных signals:

```ts
effect(() => this.analytics.trackQuery(this.query()));
```

`effect()` не используют для копирования состояния из одного signal в другой: это может создать циклы и лишние renders. Для derived state нужен `computed()`.

`linkedSignal()` подходит для writable state, которое зависит от источника, но может быть изменено пользователем. Например, выбранный элемент сбрасывается при загрузке нового списка:

```ts
readonly options = input.required<ReadonlyArray<Option>>();
readonly selected = linkedSignal(() => this.options()[0] ?? null);
```

Кратко: `computed` — вычислить, `effect` — синхронизироваться с внешней системой, `linkedSignal` — хранить редактируемое зависимое состояние.

</details>

<details>
<summary>Когда использовать resource(), httpResource() и RxJS?</summary>

`resource()` связывает async loader с signal-параметрами и предоставляет `value`, `status`, `error` и loading state. `httpResource()` делает похожую модель для `HttpClient`.

Они удобны, когда компоненту нужен один текущий async-result, зависящий от signals:

```ts
readonly userId = input.required<string>();

readonly user = resource({
  params: () => ({id: this.userId()}),
  loader: ({params, abortSignal}) =>
    fetch(`/api/users/${params.id}`, {signal: abortSignal}).then((response) =>
      response.json(),
    ),
});
```

RxJS предпочтительнее для сложных событий во времени: WebSocket, polling, debounce, объединение потоков, backpressure-подобные сценарии и явная композиция операторов.

`resource()` и `httpResource()` развиваются между Angular 19–22, поэтому перед использованием проверяют статус API в целевой версии. На границе с существующим RxJS-кодом используют `toSignal()` и `toObservable()`.

</details>

### RxJS operators

<details>
<summary>Для чего нужен RxJS и какую проблему он решает?</summary>

RxJS предоставляет модель потоков для асинхронных значений и событий. Он помогает декларативно описывать:

- HTTP-запросы и их отмену;
- пользовательский ввод;
- WebSocket и polling;
- объединение нескольких источников;
- retry, timeout, debounce, кеширование;
- управление временем жизни подписок.

```ts
readonly users$ = this.search.valueChanges.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap((query) => this.api.search(query)),
);
```

Сила RxJS не в замене Promise, а в композиции последовательностей из нуля, одного или многих значений. Для простого локального синхронного состояния в Angular чаще достаточно signals; для сложной асинхронной координации RxJS остается подходящим инструментом.

</details>

<details>
<summary>Что такое Observable?</summary>

Observable— это наблюдатель, который подписывается и реагирует на все события до момента отписки.

</details>

<details>
<summary>В чём разница между Observable и Promise?</summary>
Promise обрабатывает одно значение по завершению асинхронной операции, вне зависимости от ее исхода, и не поддерживают отмену операции.
Observable же является потоком, и позволяет передавать как ноль, так и несколько событий, когда callback вызывается для каждого события.
</details>

<details>
<summary>В чём разница между Observable и BehaviorSubject/Subject (Higher Order Observables)?</summary>

Subjects - специальные Observable. Представьте, что есть спикер с микрофоном, который выступает в комнате, полной людей.
Это и есть Subjects, их сообщение передается сразу нескольким получателям. Обычные же Observables можно сравнить с разговором 1 на 1.

- Subject - является multicast, то есть может передавать значение сразу нескольким подписчикам.
- BehaviorSubject - требует начальное значение и передает текущее значение новым подпискам.
</details>

<details>
<summary>В чем разница между Subject, BehaviorSubject, ReplaySubject, AsyncSubject?</summary>

- Subject - не хранит свои предыдущие состояния, зритель получает информацию только тогда, когда Subject сгенерирует новое событие, используя метод `.next()`.
- BehaviorSubject - при подписке поведенческий Subject уведомляет своего зрителя о последнем произошедшем в нём событии или, если в Subject-е не происходило событий, создаёт для зрителя событие с изначальной информацией, которая передаётся при создании Subject-а.
- ReplaySubject - при подписке повторяющийся Subject уведомляет своего нового зрителя о всех произошедшем в нём событиях с момента создания. Для оптимизации при создании повторяющегося Subject-а можно передать число последних событий, которые будут повторяться для каждого нового зрителя. Стоит отметить, что создание ReplaySubject-а c числом повторяющихся событий равное 1 эквивалетно созданию BehaviorSubject-а.
- AsyncSubject - асинхронный Subject уведомляет своих зрителей только о последнем произошедшем событии и только когда Subject успешно завершается. Если AsyncSubject завершится ошибкой, его зрители будут уведомлены только об ошибке.
</details>

<details>
<summary>В чём разница между операторами switchMap, mergeMap, concatMap?</summary>
- switchMap - отменит подписку на Observable, возвращенный ее аргументом project, как только он снова вызовет ее в новом элементе.
- mergeMap - в отличие от switchMap позволяет реализовать одновременно несколько внутренних подписок.
- concatMap - последовательно обрабатывает каждое событие, в отличие от mergeMap.
</details>

<details>
<summary>Как бы вы кешировали наблюдаемые данные из потоков (stream)?</summary>

Способ зависит от срока жизни, ключа и политики инвалидирования кеша. Для совместного использования результата HTTP-запроса часто применяют `shareReplay`.

```ts
private readonly users$ = this.http.get<ReadonlyArray<User>>("/api/users").pipe(
  shareReplay({bufferSize: 1, refCount: true}),
);
```

Нужно учитывать:

- `shareReplay` кеширует результат конкретного экземпляра Observable, поэтому Observable нельзя создавать заново при каждом обращении.
- Ошибки, завершение и `refCount` влияют на повторную подписку.
- Для кеша по ключу используют `Map<Key, Observable<Value>>`.
- Нужна явная политика очистки: TTL, logout, mutation, manual refresh.
- Для данных, изменяемых командами, часто понятнее сервис-хранилище с signal/Subject, чем неявный вечный кеш.

На уровне HTTP также применяют browser cache, `Cache-Control`, `ETag` и service worker. Кеширование на разных уровнях решает разные задачи.

</details>

### DI + providers

<details>
<summary>Что такое Dependency Injection?</summary>

Это важный паттерн шаблон проектирования приложений. В Angular внедрение зависимостей реализовано из-под капота.

Зависимости - это сервисы или объекты, которые нужны классу для выполнения своих функций. DI -позволяет запрашивать зависимости от внешних источников.

</details>

<details>
<summary>Что такое Singleton Service и с какой целью его используют в Angular?</summary>

Это сервисы, объявленные в приложении и имеющие один экземпляр на все приложение.
Его можно объявить двумя способами:

- `@Injectable({providedIn: "root"})` — предпочтительный tree-shakable вариант.
- Зарегистрировать provider в `ApplicationConfig` при `bootstrapApplication()`.

Provider в компоненте или route создает scoped instance, а не глобальный singleton. При lazy routes могут существовать дочерние `EnvironmentInjector`.

```ts
@Injectable({ providedIn: "root" })
export class SessionService {
  private readonly userState = signal<User | null>(null);
  readonly user = this.userState.asReadonly();
}
```

NgModule `providers` остается legacy-вариантом.

</details>

<details>
<summary>Как можно определить свой обработчик ErrorHandler, Logging, Cache в Angular?</summary>

Глобальные необработанные ошибки можно направить в собственный `ErrorHandler`:

```ts
@Injectable()
export class AppErrorHandler implements ErrorHandler {
  handleError(error: unknown): void {
    reportError(error);
  }
}

export const appConfig: ApplicationConfig = {
  providers: [{ provide: ErrorHandler, useClass: AppErrorHandler }],
};
```

HTTP-ошибки, logging и HTTP-cache удобно централизовать функциональными interceptors через `provideHttpClient(withInterceptors([...]))`.

Важно разделять ответственность:

- ожидаемую ошибку обрабатывает ближайший feature и показывает понятное состояние UI;
- interceptor добавляет общий контекст, авторизацию, retry только для безопасных случаев;
- глобальный `ErrorHandler` является последней границей и отправляет диагностику;
- logger скрывается за собственным интерфейсом, чтобы заменить реализацию и отключить чувствительные данные.

Не следует автоматически повторять все запросы или кешировать мутации.

</details>

### Управление состоянием

<details>
<summary>Что такое управление состоянием приложения?</summary>

Управление состоянием — правила хранения, чтения и изменения данных, от которых зависит UI.

Состояние бывает:

- локальным состоянием компонента;
- состоянием feature;
- серверным состоянием и кешем;
- глобальным состоянием пользователя, настроек или сессии;
- состоянием URL и форм.

Для локального синхронного состояния подходят `signal()` и `computed()`. Общее состояние можно инкапсулировать в сервисе. RxJS подходит для сложных асинхронных потоков. NgRx оправдан, когда нужны строгий однонаправленный data flow, effects, devtools, event history и единые правила большой команды.

Хорошее хранилище имеет узкий readonly API, чистые преобразования, явные loading/error/empty states и не дублирует данные, которые можно вычислить.

</details>

<details>
<summary>В чем отличие между NGRX, NGXS, Akita и какую проблему они решают?</summary>

Все эти решения помогают организовать общее состояние и предсказуемые изменения, но используют разные модели.

- **NgRx** следует Redux-подходу: actions, reducers, selectors, effects. Самый строгий и многословный вариант, с сильной экосистемой и devtools.
- **NGXS** использует классы состояния и decorators, требует меньше шаблонного кода, но сильнее опирается на собственные абстракции.
- **Akita** моделирует store/query/service и удобна для entity-состояния. Перед выбором нужно проверять актуальность поддержки и совместимость с версией Angular.

State manager не нужен автоматически. Для небольшого приложения signals и сервисов часто достаточно. Библиотека оправдана, когда сложность координации, отладки и единообразия выше стоимости новой зависимости и дополнительного кода.

</details>

### HTTP

<details>
<summary>Какими способами можно взаимодействовать с API бэкенда, что требуется для проксирования запросов?</summary>
  **Взаимодействие с API**

В экосистеме ангуляр существует пакет для общения с сервером
(@angular/common/http), которого достаточно для повседневной разработки. Его интерфейс основан на rxjs потоках, поэтому его легко использовать для работы с потоками данных в приложении.

Кроме этого, как и в ванильной версии javascript, можно использовать XMLHttpRequest, fetch API, axios(или многие другие библиотеки), но их использование вместо встроенного клиента, считается неоправданным и всячески возбраняется.

Существуют и другие способы взаимодействия с сервером(см. Веб-сокеты), но для них не существует каноничных встроенных библиотек, поэтому используются сторонние библиотеки или собственные реалиации. Хорошей практикой здесь будет привести интерфейс построенный на промисах и обратных вызовах(callback) к интерфейсу основанному на rxjs потоках, для естественного использования в экосистеме Angular.

**Proxy**

Чтобы тестировать взаимодействие приложения с сервером, который должен находиться на том же домене, используется <a href="https://angular.io/guide/build#proxying-to-a-backend-server"> функциональность в Angular CLI</a> для этого нужно создать файл с конфигурацией прокси, где будут указаны:

- Контекст для проксирования
- Ссылка на работающий экземпляр API
- secure: false для работы в тестовой среде без сертификатов

Также большинство серверов не настроены для работы с разными доменами(<a href="https://developer.mozilla.org/ru/docs/Web/HTTP/CORS">CORS</a>), поэтому для корректной работы на API сервере, необходимо явно указать с какого домена(ов) можно принимать запросы.

</details>

<details>
<summary>Что такое HTTP Interceptors?</summary>

Interceptor — middleware для общих правил HTTP: auth headers, logging, timeout, retry, caching и индикаторы загрузки.

В Angular 19–22 рекомендуются функциональные interceptors: их порядок предсказуем и они могут использовать `inject()`.

```ts
export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = inject(AuthService).accessToken();
  const isApiRequest = request.url.startsWith(environment.apiUrl);

  if (token === null || !isApiRequest) {
    return next(request);
  }

  return next(
    request.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    })
  );
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
  ],
};
```

Request и response immutable, поэтому запрос изменяют через `clone()`. Interceptors выполняются цепочкой в порядке регистрации.

DI-based `HttpInterceptor` и `HTTP_INTERCEPTORS` остаются поддерживаемыми для legacy-кода, но для нового кода Angular рекомендует functional interceptors.

</details>

### Security

<details>
<summary>Как использовать Json Web Tokens для аутентификации при разработке на Angular?</summary>

После входа сервер выдает access token, а клиент прикладывает его к API-запросам:

```ts
export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = inject(AuthService).accessToken();

  return next(
    token
      ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : request
  );
};
```

JWT состоит из header, payload и signature. Payload кодируется, но не шифруется, поэтому туда нельзя помещать секреты.

Практическая схема:

- короткоживущий access token хранится в памяти;
- refresh token безопаснее хранить в `HttpOnly`, `Secure`, `SameSite` cookie;
- refresh выполняется централизованно, с защитой от нескольких параллельных refresh-запросов;
- logout очищает сессию на сервере и локальное состояние;
- авторизацию всегда проверяет backend.

Route guard улучшает UX, но не является границей безопасности. Хранение долгоживущего токена в `localStorage` повышает последствия XSS.

</details>

<details>
<summary>Как обрабатываются атаки XSS и CSRF в Angular?</summary>

**XSS** — выполнение внедренного злоумышленником кода. Angular экранирует интерполяцию и санитизирует значения в опасных контекстах HTML и URL.

Правила защиты:

- не собирать шаблоны из пользовательских строк;
- не использовать прямой DOM API и `innerHTML` без необходимости;
- не вызывать `bypassSecurityTrust...` для недоверенных данных;
- включать CSP и Trusted Types;
- валидировать и экранировать данные также на сервере;
- не хранить чувствительные долгоживущие токены в доступном JavaScript хранилище.

**CSRF/XSRF** заставляет браузер авторизованного пользователя отправить нежелательный запрос, обычно с cookie. Защита:

- `SameSite` cookie;
- anti-CSRF token, который сервер выдает клиенту, а клиент возвращает в отдельном заголовке;
- проверка `Origin`/`Referer`;
- отсутствие изменений состояния через `GET`.

Angular `HttpClient` поддерживает XSRF-защиту для same-origin запросов с cookie, но backend должен корректно выдавать и проверять токен.

</details>

### Routing

<details>
<summary>Что такое роутинг и как его создать в Angular?</summary>

Angular Router связывает URL с деревом активированных routes и компонентов. Современная standalone-конфигурация:

```ts
export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "home",
  },
  {
    path: "home",
    loadComponent: async () =>
      (await import("./home/home.component")).HomeComponent,
  },
  {
    path: "admin",
    canMatch: [adminGuard],
    providers: [AdminStore],
    loadChildren: async () =>
      (await import("./admin/admin.routes")).ADMIN_ROUTES,
  },
  { path: "**", component: NotFoundComponent },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withComponentInputBinding(),
      withPreloading(PreloadAllModules)
    ),
  ],
};
```

В шаблоне используют `RouterLink`, `RouterLinkActive` и `<router-outlet />`. Для программного перехода — `Router.navigate()` или `navigateByUrl()`.

`RouterModule.forRoot()` и `forChild()` остаются поддерживаемыми для NgModule-приложений.

</details>

<details>
<summary>Каков жизненный цикл у Angular Router?</summary>

Основные этапы успешной навигации:

1. `NavigationStart` — начало перехода.
2. `RoutesRecognized` — распознавание URL и redirects.
3. `GuardsCheckStart` / `GuardsCheckEnd` — выполнение guards.
4. `ResolveStart` / `ResolveEnd` — загрузка обязательных route data.
5. `ActivationStart` / `ActivationEnd` — активация компонентов в outlets.
6. `NavigationEnd` — успешное завершение.

Навигация также может завершиться событиями `NavigationCancel`, `NavigationSkipped` или `NavigationError`.

Современные guards и resolvers являются функциями:

```ts
export const authGuard: CanActivateFn = (_route, state) => {
  const auth = inject(AuthService);

  return auth.isAuthorized()
    ? true
    : inject(Router).createUrlTree(["/login"], {
        queryParams: { returnUrl: state.url },
      });
};

export const usersResolver: ResolveFn<ReadonlyArray<User>> = () =>
  inject(UserApi).getUsers();
```

Guard должен вернуть `boolean`, `UrlTree`, `RedirectCommand`, Promise или Observable. Для redirect не нужно вызывать `navigate()` внутри guard. Вместо старого `canLoad` используют `canMatch`.

</details>

<details>
<summary>Что такое ленивая загрузка (Lazy-loading) и для чего она используется?</summary>

Lazy-loading откладывает загрузку кода feature до момента, когда пользователь переходит на соответствующий route. Это уменьшает initial bundle и ускоряет первую загрузку.

```ts
export const routes: Routes = [
  {
    path: "orders",
    loadComponent: async () =>
      (await import("./orders/orders.component")).OrdersComponent,
  },
  {
    path: "admin",
    loadChildren: async () =>
      (await import("./admin/admin.routes")).ADMIN_ROUTES,
  },
];
```

`loadComponent` загружает standalone-компонент, `loadChildren` — дочернюю конфигурацию routes или legacy-модуль.

Lazy-loading не означает, что каждый маленький компонент нужно выделить в отдельный chunk. Границы выбирают по пользовательским сценариям и feature. Для вероятных следующих переходов можно настроить preloading.

</details>

<details>
<summary>В чем разница между Routing и Navigation?</summary>

**Routing** — конфигурация соответствия URL и состояния приложения: routes, параметры, guards, resolvers, outlets, redirects и lazy-loading.

**Navigation** — конкретный процесс перехода из текущего URL/route state в новый. Он может начаться через `RouterLink`, `router.navigate()`, кнопки браузера или изменение адреса.

Во время navigation Router распознает URL, выполняет redirects, guards и resolvers, активирует или переиспользует компоненты, обновляет URL и публикует события. Навигация может завершиться успешно, быть отменена, пропущена или завершиться ошибкой.

</details>

<details>
<summary>Как загрузить данные до того как активируется роут?</summary>

Для этого используется resolver. Современный вариант — функция `ResolveFn`.

```ts
export const userResolver: ResolveFn<User> = (route) => {
  const userId = route.paramMap.get("id");

  if (userId === null) {
    return inject(Router).parseUrl("/users");
  }

  return inject(UsersApi).getById(userId);
};

export const routes: Routes = [
  {
    path: "users/:id",
    component: UserPageComponent,
    resolve: { user: userResolver },
  },
];
```

Router дождется значения или завершения Observable/Promise перед активацией route. Данные доступны через `ActivatedRoute.data` или component input binding при соответствующей настройке Router.

Resolver подходит, когда экран нельзя корректно показать без данных. Для необязательных или медленных данных лучше активировать страницу сразу и показать loading/skeleton, чтобы навигация не казалась зависшей.

</details>

### Forms

<details>
<summary>Что такое FormGroup и FormControl и для чего они используются?</summary>

В strictly typed Reactive Forms:

- `FormControl<T>` хранит значение, validation status и interaction state одного поля.
- `FormGroup<TControls>` объединяет именованные controls.
- `FormArray<TControl>` управляет динамическим списком controls.
- `FormRecord<TControl>` управляет группой с динамическими строковыми ключами.

```ts
readonly form = new FormGroup({
  email: new FormControl("", {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
  }),
  rememberMe: new FormControl(false, {nonNullable: true}),
});
```

`NonNullableFormBuilder` сокращает boilerplate. Типизированные формы доступны давно и должны использоваться без `UntypedFormGroup`, если нет legacy-ограничений.

</details>

<details>
<summary>Что такое реактивные формы в Angular?</summary>

Reactive Forms — стабильный model-driven API на основе `AbstractControl`. Модель формы создается в TypeScript, имеет синхронный доступ к value/status и Observable-потоки `valueChanges`/`statusChanges`.

В Angular 21+ также доступны Signal Forms из `@angular/forms/signals`. Они строятся вокруг signal-модели, `form()` и директивы `[formField]`:

```ts
readonly loginModel = signal({
  email: "",
  password: "",
});

readonly loginForm = form(this.loginModel, (schema) => {
  required(schema.email);
  email(schema.email);
  required(schema.password);
});
```

```html
<input type="email" [formField]="loginForm.email" />
```

Signal Forms лучше подходят новым signal-first приложениям на Angular 21–22. Для Angular 19–20 и существующих production-приложений strictly typed Reactive Forms остаются надежным выбором.

</details>

<details>
<summary>Как применять валидацию для простых и сложных форм?</summary>

В Reactive Forms валидаторы передают control при создании или через `setValidators`/`addValidators`.

- Синхронный `ValidatorFn` возвращает `ValidationErrors | null`.
- Асинхронный `AsyncValidatorFn` возвращает Promise/Observable и запускается после успешных синхронных проверок.
- Cross-field validator размещают на `FormGroup`.
- Ошибки показывают после `touched`/`dirty` или попытки submit, а не сразу при первом render.

```ts
const passwordsMatch: ValidatorFn = (control) => {
  const password = control.get("password")?.value;
  const confirmation = control.get("confirmation")?.value;

  return password === confirmation ? null : { passwordsMismatch: true };
};
```

Signal Forms используют schema validators: `required`, `email`, `minLength`, `validate`, `validateAsync` и правила для cross-field logic.

Backend всегда повторно валидирует данные: frontend-валидация нужна для UX, а не является границей безопасности.

</details>

### Performance

<details>
<summary>В чем разница между Angular CLI и Webpack Development Environment?</summary>

Angular CLI — официальный интерфейс для создания, запуска, тестирования, обновления и сборки Angular-проектов. Он управляет workspace-конфигурацией и вызывает настроенный builder.

Webpack — универсальный bundler. Исторически Angular CLI использовал Webpack внутри, но это деталь реализации: современные builders могут использовать другие инструменты, например esbuild/Vite-based development server.

CLI дает:

- `ng new`, `ng generate`, `ng serve`, `ng build`, `ng test`, `ng update`;
- Angular-aware компиляцию шаблонов и AOT;
- production-оптимизации, budgets, environments и asset pipeline;
- согласованную конфигурацию и migrations.

Ручная Webpack-конфигурация дает больше низкоуровневого контроля, но увеличивает стоимость поддержки и обновлений. В Angular-проекте сначала используют возможности CLI и custom builder, а eject/собственный pipeline выбирают только при реальной необходимости.

</details>

<details>
<summary>Что такое JIT и AOT, в чем их отличия и каковы сферы применения?</summary>

**AOT** компилирует templates и decorators во время сборки. В современных Angular CLI проектах AOT является стандартным режимом и для `ng build`, и для development server.

Плюсы AOT:

- ошибки шаблонов обнаруживаются при сборке;
- браузеру не нужен Angular compiler;
- меньше runtime-работы и лучше startup;
- доступны template type checking и production optimizations.

**JIT** компилирует Angular declarations во время выполнения. Он нужен редко: для специальных динамических сценариев, tooling или legacy-конфигураций. Для обычной разработки переключаться на JIT не требуется.

`--prod` больше не является актуальным способом объяснять AOT. Используют named configurations, например `ng build --configuration production`.

</details>

### Тестирование

<details>
<summary>Что такое Unit-тестирование, интеграционное, e2e-тестирование (End-to-End) и как оно применяется в Angular?</summary>

- **Unit-тест** проверяет небольшую единицу: функцию, pipe, service или компонент с изолированными зависимостями. Он быстрый и точно локализует ошибку.
- **Интеграционный тест** проверяет совместную работу нескольких частей: компонент с шаблоном, DI, Router или HTTP-слоем.
- **E2E-тест** запускает приложение в браузере и проверяет пользовательский сценарий через UI, часто вместе с реальным или тестовым backend.

В Angular unit/integration-тесты обычно используют TestBed, spies/fakes, HTTP testing utilities и Router testing harness. E2E выполняют Playwright или Cypress.

Основу набора составляют быстрые unit и integration-тесты. E2E оставляют для критических сквозных сценариев: вход, checkout, создание сущности. Тестируют наблюдаемое поведение, а не приватные методы и внутреннюю структуру компонента.

</details>

<details>
<summary>Что такое Karma, Jasmine (зачем их используют совместно при разработке на Angular)?</summary>

Это разные части тестового стека:

- **Jasmine** — test framework: `describe`, `it`, expectations, spies и hooks.
- **Karma** — test runner, который запускает тестовый bundle в браузерах, собирает результаты и следит за файлами.

Их использовали совместно, потому что Jasmine описывал тесты, а Karma предоставлял браузерное окружение и запуск.

Это исторически популярная конфигурация Angular CLI, но не единственный современный вариант. Проект может использовать Vitest, Jest или другой runner. При выборе важны скорость, browser fidelity, поддержка Angular, debugging и интеграция с CI.

</details>

<details>
<summary>В чем разница между Jest и Karma?</summary>

Сравнение не полностью симметрично:

- Karma — runner для запуска тестов в реальных браузерах.
- Jest — test framework и runner с assertions, mocks, coverage и обычно DOM-эмуляцией через jsdom.

Jest часто быстрее и проще для unit-тестов благодаря параллельному запуску, watch mode и встроенным инструментам. Karma дает настоящее браузерное окружение, но обычно запускается и настраивается тяжелее.

Эмуляция DOM не воспроизводит все особенности layout, CSS и browser API. Поэтому даже при Jest/Vitest нужны component integration и E2E-тесты в реальном браузере для поведения, зависящего от платформы.

</details>

<details>
<summary>В чем разница между Protractor и Cypress?</summary>

Protractor был Angular-ориентированным E2E-инструментом поверх WebDriver и умел автоматически ожидать Angular stability. Проект Protractor снят с поддержки и не должен выбираться для новых приложений.

Cypress работает через собственный browser runner, дает удобный time-travel UI, автоматические ожидания, network stubbing и хорошую диагностику. Его модель выполнения отличается от обычного WebDriver и имеет собственные ограничения, например при работе с несколькими вкладками и некоторыми cross-origin сценариями.

Современная альтернатива также Playwright: он управляет Chromium, Firefox и WebKit, поддерживает несколько контекстов, вкладок и параллельный запуск.

Для существующего проекта миграция должна сохранять критические сценарии и постепенно заменять Protractor-тесты, а не переписывать весь набор одним большим изменением.

</details>

<details>
<summary>Как протестировать входные параметры и всплывающие события компонентов?</summary>

Лучше тестировать компонент через его публичный API и DOM.

```ts
it("renders the input and emits selection", () => {
  const fixture = TestBed.createComponent(UserCardComponent);
  const selected: string[] = [];

  fixture.componentRef.setInput("name", "Alex");
  fixture.componentInstance.selected.subscribe((id) => selected.push(id));
  fixture.detectChanges();

  expect(fixture.nativeElement.textContent).toContain("Alex");

  fixture.nativeElement.querySelector("button").click();

  expect(selected).toEqual(["user-1"]);
});
```

Для signal input используется тот же `componentRef.setInput()`. Output можно проверить подпиской на публичный output или через host-компонент, если важен реальный template binding.

После изменения input нужно запустить change detection. Не следует напрямую вызывать приватные методы: клик по доступной кнопке лучше отражает контракт компонента.

</details>

### Code convention

<details>
<summary>Требования к написанию кода на TypeScript</summary>

На самом деле требования бывают разные и зависят от команды к команде.
Самые эффективные для себя считаю использование модификаторов доступа и принудительного указания типов данных для всех переменных,
методов и членов класса, которые вы используете в коде. Желательно все необходимые правила конвенции кода настраивать в ESLint.

```ts
// my.ts
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

</details>

<details>
<summary>Зачем нужен ESLint (TSLint) и Prettier?</summary>

**ESLint** анализирует код и находит потенциальные ошибки, небезопасные конструкции и нарушения соглашений. С TypeScript он работает через typescript-eslint, а Angular-правила предоставляет angular-eslint.

**Prettier** отвечает за форматирование: отступы, переносы, кавычки и другие визуальные правила. Он не заменяет семантический анализ ESLint.

**TSLint** устарел и больше не развивается; современные TypeScript-проекты используют ESLint.

Обычная схема:

- редактор форматирует Prettier;
- ESLint проверяет качество кода и Angular templates;
- CI запускает lint и format check;
- правила форматирования ESLint, конфликтующие с Prettier, отключаются.

Цель инструментов — быстрый автоматический feedback и единый стиль, а не максимальное количество строгих правил. Правило должно предотвращать реальную проблему или поддерживать договоренность команды.

</details>
