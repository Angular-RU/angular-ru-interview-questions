# Организация кода — вопросы и ответы, часть 2

> Автоматически сгенерировано из src/pages/frontend-architecture-patterns/index.md. Не редактируйте вручную.

### Полный каталог из исходного gist

Ниже собраны все оставшиеся паттерны и примеры из исходного материала. Примеры на React дополнены реализацией или
практическим эквивалентом для Angular.

#### Component-Based Architecture



#### Вопрос: Что такое Atomic Design?

**Короткий ответ**

Atomic Design делит design system на atoms (Button, Input), molecules (SearchField), organisms (Header), templates и
pages. Паттерн удобен для общего языка дизайнеров и разработчиков, но категории не должны влиять на domain boundaries:
ProductCard может быть organism в design system и одновременно частью feature catalog.

**Полный ответ**

Atomic Design делит design system на atoms (`Button`, `Input`), molecules (`SearchField`), organisms (`Header`),
templates и pages. Паттерн удобен для общего языка дизайнеров и разработчиков, но категории не должны влиять на domain
boundaries: `ProductCard` может быть organism в design system и одновременно частью feature `catalog`.

```text
shared/ui/
  button/            # atom
  search-field/      # molecule
  header/            # organism
features/catalog/
  product-page/      # page с реальными данными
```

В React и Angular иерархия одинакова. В Angular atoms обычно являются components, directives или pipes; templates и
pages часто соответствуют routed components.



#### State Management Patterns



#### Вопрос: Как устроены Flux и Redux?

**Короткий ответ**

Flux задает однонаправленный цикл: пользовательское событие создает action, dispatcher передает его store, store
вычисляет новое состояние, view отображает результат. Redux сводит идею к одному store, readonly state и чистым
reducers.

**Полный ответ**

Flux задает однонаправленный цикл: пользовательское событие создает action, dispatcher передает его store, store
вычисляет новое состояние, view отображает результат. Redux сводит идею к одному store, readonly state и чистым
reducers.

```ts
type CounterAction = {readonly type: 'increment'} | {readonly type: 'decrement'};

function counterReducer(state: number, action: CounterAction): number {
  switch (action.type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
  }
}
```

React обычно подключает Redux Toolkit через `useSelector()` и `useDispatch()`. В Angular тот же поток дает NgRx:
component выбирает данные selector-ом и отправляет event через `store.dispatch()`. Для небольшого feature достаточно
service с readonly signal и явными methods.

```ts title="Angular"
@Injectable({providedIn: 'root'})
export class CounterStore {
  private readonly countState = signal(0);
  readonly count = this.countState.asReadonly();

  increment(): void {
    this.countState.update((count) => count + 1);
  }
}
```





#### Вопрос: Чем React Context + Hooks отличается от Angular DI + signals?

**Короткий ответ**

В React provider передает значение через component tree, а custom hook инкапсулирует чтение context и проверку наличия
provider. В Angular эту задачу решают DI hierarchy и service. Provider на component или route дает scoped instance, а
providedIn: 'root' — application-wide instance.

**Полный ответ**

В React provider передает значение через component tree, а custom hook инкапсулирует чтение context и проверку наличия
provider. В Angular эту задачу решают DI hierarchy и service. Provider на component или route дает scoped instance, а
`providedIn: 'root'` — application-wide instance.

```tsx title="React"
const ThemeContext = createContext<ThemeContextValue | null>(null);

function ThemeProvider({children}: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>('light');
  const toggle = () => setTheme((value) => (value === 'light' ? 'dark' : 'light'));

  return <ThemeContext value={{theme, toggle}}>{children}</ThemeContext>;
}
```

```ts title="Angular"
@Injectable()
export class ThemeState {
  private readonly themeState = signal<'light' | 'dark'>('light');
  readonly theme = this.themeState.asReadonly();

  toggle(): void {
    this.themeState.update((theme) => (theme === 'light' ? 'dark' : 'light'));
  }
}

export const appRoutes: Routes = [
  {
    path: '',
    providers: [ThemeState],
    loadComponent: async () => (await import('./shell')).Shell,
  },
];
```

Context удобен для редко меняющихся cross-cutting values. Часто меняющийся server state лучше отдавать query/cache
layer, чтобы не провоцировать широкие rerenders.





#### Вопрос: Как реализовать state machine без набора противоречивых flags?

**Короткий ответ**

Состояние описывают discriminated union, а переходы — явной функцией. XState полезен для nested и parallel states,
guards, actors и визуализации; для небольшого flow достаточно TypeScript reducer.

**Полный ответ**

Состояние описывают discriminated union, а переходы — явной функцией. XState полезен для nested и parallel states,
guards, actors и визуализации; для небольшого flow достаточно TypeScript reducer.

```ts
type FetchState<T> =
  | {readonly status: 'idle'}
  | {readonly status: 'loading'}
  | {readonly status: 'success'; readonly data: T}
  | {readonly status: 'error'; readonly message: string};

type FetchEvent<T> =
  | {readonly type: 'fetch'}
  | {readonly type: 'resolve'; readonly data: T}
  | {readonly type: 'reject'; readonly message: string};
```

Такая модель одинаково используется в React reducer и Angular signal store и не позволяет одновременно получить
`isLoading: true` и `hasError: true`.



#### Design Patterns



#### Вопрос: Как Observer pattern проявляется в React и Angular?

**Короткий ответ**

Observer подписывает потребителей на изменения source. DOM events, RxJS Observable, store subscriptions и signals —
разные реализации этой идеи. Вручную писать mutable массив observers обычно не нужно: важны teardown и lifetime.

**Полный ответ**

Observer подписывает потребителей на изменения source. DOM events, RxJS Observable, store subscriptions и signals —
разные реализации этой идеи. Вручную писать mutable массив observers обычно не нужно: важны teardown и lifetime.

```ts title="Angular"
const searchResults$ = queryControl.valueChanges.pipe(
  debounceTime(250),
  distinctUntilChanged(),
  switchMap((query) => searchApi.search(query)),
);
```

В Angular template может читать поток через `async` pipe или signal через `toSignal()`. В React внешние stores безопасно
подключаются через `useSyncExternalStore()`.





#### Вопрос: Когда нужен Factory pattern?

**Короткий ответ**

Factory централизует выбор реализации по type или configuration. В React это может быть mapping типа поля на component;
в Angular — mapping на dynamic component type или DI factory provider. Большой switch стоит заменить registry, если
варианты добавляют независимые модули.

**Полный ответ**

Factory централизует выбор реализации по type или configuration. В React это может быть mapping типа поля на component;
в Angular — mapping на dynamic component type или DI factory provider. Большой `switch` стоит заменить registry, если
варианты добавляют независимые модули.

```ts title="Angular"
type FieldKind = 'email' | 'password' | 'select';

const fieldByKind = {
  email: EmailField,
  password: PasswordField,
  select: SelectField,
} satisfies Record<FieldKind, Type<unknown>>;

function getFieldComponent(kind: FieldKind): Type<unknown> {
  return fieldByKind[kind];
}
```





#### Вопрос: Почему Singleton лучше получать через dependency injection?

**Короткий ответ**

Ручной getInstance() создает скрытый global state и усложняет тесты. В React singleton module допустим для stateless API
client, но зависимости проще передавать через provider. В Angular lifecycle singleton-а контролирует injector.

**Полный ответ**

Ручной `getInstance()` создает скрытый global state и усложняет тесты. В React singleton module допустим для stateless
API client, но зависимости проще передавать через provider. В Angular lifecycle singleton-а контролирует injector.

```ts title="Angular"
@Injectable({providedIn: 'root'})
export class ApiClient {
  private readonly http = inject(HttpClient);

  getUsers(): Observable<ReadonlyArray<User>> {
    return this.http.get<ReadonlyArray<User>>('/api/users');
  }
}
```

`providedIn: 'root'` создает один instance в root environment injector. Route или component provider намеренно создает
отдельный scoped instance, поэтому «singleton» всегда относится к конкретному injector.





#### Вопрос: Что дает Module pattern в современном TypeScript?

**Короткий ответ**

Исторически IIFE скрывал mutable variables в closure и возвращал public API. ES modules дают encapsulation напрямую:
неэкспортированные значения остаются private для файла.

**Полный ответ**

Исторически IIFE скрывал mutable variables в closure и возвращал public API. ES modules дают encapsulation напрямую:
неэкспортированные значения остаются private для файла.

```ts
let result = 0;
const history: string[] = [];

export function add(value: number): number {
  result += value;
  history.push(`add ${value}`);
  return result;
}

export function getHistory(): ReadonlyArray<string> {
  return [...history];
}
```

Для user-specific или test-specific state module singleton опасен. В Angular такое состояние лучше держать в service с
подходящим provider scope, в React — в component/provider state.



#### Architectural Styles



#### Вопрос: Чем MVC и MVVM полезны для понимания современного frontend?

**Короткий ответ**

MVC отделяет Model, View и Controller. MVVM добавляет ViewModel — подготовленное для binding состояние и команды view.
Современные React и Angular приложения редко реализуют эти паттерны буквально, но идея границ остается полезной.

**Полный ответ**

MVC отделяет Model, View и Controller. MVVM добавляет ViewModel — подготовленное для binding состояние и команды view.
Современные React и Angular приложения редко реализуют эти паттерны буквально, но идея границ остается полезной.

```ts
type UserViewModel = {
  readonly displayName: string;
  readonly canEdit: boolean;
};

const toUserViewModel = (user: User, permissions: Permissions): UserViewModel => ({
  displayName: user.name.toUpperCase(),
  canEdit: permissions.includes('user:edit'),
});
```

В React hook часто играет роль Controller/ViewModel. В Angular facade с `computed()` готовит view state, а template
остается View. Two-way binding не делает Angular «чистым MVVM»: архитектуру определяют границы, а не синтаксис binding.





#### Вопрос: Что такое Jamstack?

**Короткий ответ**

Jamstack отделяет заранее сгенерированный markup от динамических API и раздает static assets через CDN. Подходит для
контентных сайтов, документации и marketing pages; authenticated dashboard обычно требует CSR или hybrid rendering.

**Полный ответ**

Jamstack отделяет заранее сгенерированный markup от динамических API и раздает static assets через CDN. Подходит для
контентных сайтов, документации и marketing pages; authenticated dashboard обычно требует CSR или hybrid rendering.

```text
content + templates = static HTML at build time
static HTML = CDN
interactive actions = APIs or serverless functions
```

Примеры: Astro с content API, Next.js с CMS. Angular поддерживает аналогичный вариант через prerendering и route-based
render modes.





#### Вопрос: Что такое Islands Architecture?

**Короткий ответ**

Страница в основном состоит из static HTML, а независимые интерактивные islands гидратируются отдельно. В Astro это
выражают directives client:load, client:idle и client:visible.

**Полный ответ**

Страница в основном состоит из static HTML, а независимые интерактивные islands гидратируются отдельно. В Astro это
выражают directives `client:load`, `client:idle` и `client:visible`.

```astro title="Astro"
<Article content={post} />
<SearchBar client:load />
<Newsletter client:visible />
<Comments client:idle />
```

Angular не является islands framework, но incremental hydration и `@defer` решают похожую задачу при SSR: тяжелый блок
можно загрузить и гидратировать по viewport или interaction trigger.

```html title="Angular"
@defer (on viewport) {
<app-comments />
} @placeholder {
<app-comments-skeleton />
}
```





#### Вопрос: Как работает Module Federation?

**Короткий ответ**

Host загружает exposed modules независимо развернутого remote в build time или runtime. Shared dependencies требуют
совместимых версий; singleton: true снижает риск двух runtime framework, но не заменяет контракт версий.

**Полный ответ**

Host загружает exposed modules независимо развернутого remote в build time или runtime. Shared dependencies требуют
совместимых версий; `singleton: true` снижает риск двух runtime framework, но не заменяет контракт версий.

```js title="React"
new ModuleFederationPlugin({
  name: 'catalog',
  filename: 'remoteEntry.js',
  exposes: {'./ProductCard': './src/product-card'},
  shared: {react: {singleton: true}, 'react-dom': {singleton: true}},
});
```

Для Angular remote экспортирует routes или standalone component, а host подключает их через federation tooling. Shared
state remote-модулем создает сильную runtime coupling; предпочтительнее versioned events или API contracts.



#### Application Models



#### Вопрос: Чем SPA отличается от MPA?

**Короткий ответ**

SPA загружает application shell и переключает routes на клиенте; последующая навигация быстрая, но initial bundle,
JavaScript availability и client state становятся критичными. MPA получает новый HTML document для каждого перехода; она
проще, надежнее без JavaScript и естественно индексируется, но теряет in-memory state между страницами.

**Полный ответ**

SPA загружает application shell и переключает routes на клиенте; последующая навигация быстрая, но initial bundle,
JavaScript availability и client state становятся критичными. MPA получает новый HTML document для каждого перехода; она
проще, надежнее без JavaScript и естественно индексируется, но теряет in-memory state между страницами.

React Router и Angular Router строят SPA. Next.js, Astro и Angular SSR могут сочетать server navigation, hydration и
client navigation, поэтому реальный продукт часто является hybrid, а не чистой SPA или MPA.





#### Вопрос: Из чего состоит PWA?

**Короткий ответ**

PWA использует Web App Manifest для installability и service worker для offline cache, update и background behavior.
Cache strategy выбирают по типу ресурса; бездумный cache-first для API может показывать устаревшие данные.

**Полный ответ**

PWA использует Web App Manifest для installability и service worker для offline cache, update и background behavior.
Cache strategy выбирают по типу ресурса; бездумный cache-first для API может показывать устаревшие данные.

```js
self.addEventListener('fetch', (event) => {
  const request = event.request;

  event.respondWith(caches.match(request).then((cached) => cached ?? fetch(request)));
});
```

В Angular базовый service worker добавляет `ng add @angular/pwa`; правила assets и data groups задаются в
`ngsw-config.json`. React не содержит PWA layer, его настраивает build framework или Workbox.





#### Вопрос: Какие бывают hybrid applications?

**Короткий ответ**

Capacitor помещает web app в native shell и дает bridge к Camera, Filesystem и другим platform APIs. Ionic добавляет
mobile-oriented UI components. React Native использует JavaScript/TypeScript, но рендерит native views, а не DOM.

**Полный ответ**

Capacitor помещает web app в native shell и дает bridge к Camera, Filesystem и другим platform APIs. Ionic добавляет
mobile-oriented UI components. React Native использует JavaScript/TypeScript, но рендерит native views, а не DOM.

```ts
const photo = await Camera.getPhoto({
  allowEditing: true,
  quality: 90,
  resultType: CameraResultType.Uri,
});
```

Angular приложения часто используют Ionic + Capacitor. Контракт platform service лучше абстрагировать через DI, чтобы
browser tests могли подставить fake implementation.



#### Rendering Strategies



#### Вопрос: Как выбирать между CSR, SSR и SSG?

**Короткий ответ**

CSR рендерит после загрузки JavaScript и подходит authenticated applications с высокой интерактивностью. SSR создает
HTML на каждый initial request и подходит динамическим индексируемым страницам. SSG генерирует HTML на build time и
лучше всего работает для стабильного контента.

**Полный ответ**

CSR рендерит после загрузки JavaScript и подходит authenticated applications с высокой интерактивностью. SSR создает
HTML на каждый initial request и подходит динамическим индексируемым страницам. SSG генерирует HTML на build time и
лучше всего работает для стабильного контента.

```ts title="Angular"
export const serverRoutes: ServerRoute[] = [
  {path: 'dashboard', renderMode: RenderMode.Client},
  {path: 'products/:id', renderMode: RenderMode.Server},
  {path: 'about', renderMode: RenderMode.Prerender},
];
```

React выбирает эти режимы через framework вроде Next.js. Angular SSR поддерживает route-level CSR, SSR и prerendering;
после SSR hydration делает HTML интерактивным.





#### Вопрос: Что такое ISR и какой аналог есть вне Next.js?

**Короткий ответ**

ISR сохраняет производительность static page, но периодически или по событию регенерирует ее. Во время regeneration
пользователь может получить предыдущую версию, поэтому система допускает окно stale content.

**Полный ответ**

ISR сохраняет производительность static page, но периодически или по событию регенерирует ее. Во время regeneration
пользователь может получить предыдущую версию, поэтому система допускает окно stale content.

```ts title="React / Next.js"
export const revalidate = 60;

export default async function ProductPage() {
  const product = await getProduct();
  return <Product product={product} />;
}
```

Это не универсальная browser capability, а функция hosting/framework cache. В Angular похожую семантику строят через
prerender + deployment rebuild/webhook, CDN stale-while-revalidate или server cache вокруг SSR.





#### Вопрос: Чем React Server Components отличаются от Angular SSR?

**Короткий ответ**

RSC остаются server-only и не добавляют свой code в client bundle; client components нужны для state, events и browser
APIs. Angular SSR обычно выполняет те же components на server для initial HTML, а затем гидратирует их на client.

**Полный ответ**

RSC остаются server-only и не добавляют свой code в client bundle; client components нужны для state, events и browser
APIs. Angular SSR обычно выполняет те же components на server для initial HTML, а затем гидратирует их на client.

```tsx title="React"
async function BlogPost({id}: {readonly id: string}) {
  const post = await db.posts.findById(id);

  return (
    <article>
      <h1>{post.title}</h1>
      <LikeButton postId={id} />
    </article>
  );
}
```

Для Angular ближайшие инструменты — server routes, SSR/prerender, incremental hydration и `@defer`, но это не эквивалент
RSC protocol один к одному.





#### Вопрос: Что такое Edge Rendering?

**Короткий ответ**

Edge function выполняет SSR или personalization в CDN location рядом с пользователем. Это уменьшает network latency, но
runtime часто ограничивает Node.js APIs, execution time и package size.

**Полный ответ**

Edge function выполняет SSR или personalization в CDN location рядом с пользователем. Это уменьшает network latency, но
runtime часто ограничивает Node.js APIs, execution time и package size.

```ts
export default async function handler(request: Request): Promise<Response> {
  const city = new URL(request.url).searchParams.get('city') ?? 'Moscow';
  const weather = await fetch(`https://api.example.com/weather?city=${encodeURIComponent(city)}`);

  return Response.json(await weather.json());
}
```

React и Angular приложение может вызывать edge BFF одинаково. Возможность рендерить сам framework на edge зависит от
adapter и hosting provider, поэтому этот runtime нужно проверять отдельно.



#### Service Patterns



#### Вопрос: Когда нужен Backend for Frontend?

**Короткий ответ**

BFF агрегирует backend services и возвращает DTO, оптимизированный под конкретный UI. Например, web dashboard одним
запросом получает user, последние orders и recommendations, а mobile BFF возвращает более компактную модель.

**Полный ответ**

BFF агрегирует backend services и возвращает DTO, оптимизированный под конкретный UI. Например, web dashboard одним
запросом получает user, последние orders и recommendations, а mobile BFF возвращает более компактную модель.

```ts
app.get('/api/dashboard', async (request, response) => {
  const userId = request.auth.userId;
  const [user, orders, suggestions] = await Promise.all([
    userService.getUser(userId),
    orderService.getOrders(userId),
    recommendationService.getForUser(userId),
  ]);

  response.json({user, recentOrders: orders.slice(0, 5), suggestions});
});
```

BFF уменьшает waterfalls и скрывает topology microservices, но дублирование web/mobile BFF нужно контролировать. Для
React и Angular его контракт одинаков; frontend data-access adapter преобразует BFF DTO в domain model.





#### Вопрос: Чем GraphQL Gateway отличается от API Gateway?

**Короткий ответ**

GraphQL Gateway дает typed schema и позволяет client выбрать поля. Resolvers агрегируют data sources, но требуют защиты
от дорогих queries, DataLoader против N+1 и отдельной cache strategy. API Gateway маршрутизирует REST/gRPC/ WebSocket,
централизует auth, rate limits, observability и иногда response aggregation.

**Полный ответ**

GraphQL Gateway дает typed schema и позволяет client выбрать поля. Resolvers агрегируют data sources, но требуют защиты
от дорогих queries, DataLoader против N+1 и отдельной cache strategy. API Gateway маршрутизирует REST/gRPC/ WebSocket,
централизует auth, rate limits, observability и иногда response aggregation.

```graphql
query GetUser($id: ID!) {
  user(id: $id) {
    name
    posts {
      title
    }
  }
}
```

```ts
app.use('/api/users', createProxyMiddleware({target: 'http://user-service:3001'}));
app.use('/api/products', createProxyMiddleware({target: 'http://product-service:3002'}));
```

GraphQL client может использовать Apollo, urql или generated SDK. Angular получает SDK через DI service, React — через
provider/hook; schema types лучше генерировать, а не дублировать вручную.



#### Performance Patterns



#### Вопрос: Как реализовать code splitting?

**Короткий ответ**

Route-based splitting выносит feature в отдельный chunk. Component-based splitting откладывает тяжелый editor, chart или
dialog до момента использования.

**Полный ответ**

Route-based splitting выносит feature в отдельный chunk. Component-based splitting откладывает тяжелый editor, chart или
dialog до момента использования.

```tsx title="React"
const Dashboard = lazy(() => import('./dashboard'));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Dashboard />
    </Suspense>
  );
}
```

```ts title="Angular"
export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: async () => (await import('./dashboard/dashboard')).Dashboard,
  },
];
```

В Angular для части template используют `@defer`; для routes — `loadComponent` или `loadChildren`. Chunk boundary стоит
ставить по feature и реальной стоимости, иначе множество мелких requests ухудшит загрузку.





#### Вопрос: Чем lazy loading ресурсов отличается от code splitting?

**Короткий ответ**

Code splitting создает chunks, lazy loading определяет момент их загрузки. Изображения лениво загружаются нативным
loading="lazy", scripts используют defer или async, а произвольный resource можно связать с Intersection Observer.

**Полный ответ**

Code splitting создает chunks, lazy loading определяет момент их загрузки. Изображения лениво загружаются нативным
`loading="lazy"`, scripts используют `defer` или `async`, а произвольный resource можно связать с Intersection Observer.

```html
<img
  src="product.webp"
  loading="lazy"
  width="640"
  height="480"
  alt="Товар"
/>
<script
  src="analytics.js"
  defer
></script>
```

```html title="Angular"
@defer (on viewport; prefetch on idle) {
<app-recommendations />
} @placeholder {
<app-recommendations-skeleton />
}
```

Размеры изображения задают явно, чтобы lazy loading не создавал layout shift.





#### Вопрос: Когда memoization улучшает производительность?

**Короткий ответ**

Memoization полезна для измеримо дорогого pure calculation или стабильного selector. В React используют useMemo,
useCallback и memo; React Compiler может оптимизировать часть случаев автоматически. В Angular computed() лениво
кеширует значение до изменения зависимых signals, а pure pipe кеширует последний набор arguments.

**Полный ответ**

Memoization полезна для измеримо дорогого pure calculation или стабильного selector. В React используют `useMemo`,
`useCallback` и `memo`; React Compiler может оптимизировать часть случаев автоматически. В Angular `computed()` лениво
кеширует значение до изменения зависимых signals, а pure pipe кеширует последний набор arguments.

```tsx title="React"
const filtered = useMemo(
  () => products.filter((product) => categories.includes(product.category)),
  [products, categories],
);
```

```ts title="Angular"
readonly filteredProducts = computed(() => {
  const categories = this.selectedCategories();
  return this.products().filter((product) => categories.includes(product.category));
});
```

Memoization имеет стоимость сравнения, cache и усложнения dependencies. Применять ее ко всем значениям заранее не нужно.





#### Вопрос: Как работает virtualization больших списков?

**Короткий ответ**

Virtualization оставляет в DOM только видимое окно элементов и небольшой overscan. React использует react-window или
React Virtuoso; Angular — CDK virtual scrolling. Fixed item height проще и дешевле variable-height measurement.

**Полный ответ**

Virtualization оставляет в DOM только видимое окно элементов и небольшой overscan. React использует react-window или
React Virtuoso; Angular — CDK virtual scrolling. Fixed item height проще и дешевле variable-height measurement.

```tsx title="React"
<FixedSizeList
  height={600}
  itemCount={items.length}
  itemSize={50}
  width="100%"
>
  {({index, style}) => <div style={style}>{items[index].name}</div>}
</FixedSizeList>
```

```html title="Angular"
<cdk-virtual-scroll-viewport
  itemSize="50"
  class="viewport"
>
  <div *cdkVirtualFor="let item of items; trackBy: trackById">{{ item.name }}</div>
</cdk-virtual-scroll-viewport>
```

Паттерн нужен для таблиц, feeds, chat history и file trees с тысячами строк. Для десятков элементов стоимость библиотеки
обычно выше пользы.





#### Вопрос: Какие бывают prefetch и preload?

**Короткий ответ**

dns-prefetch заранее резолвит host, preconnect устанавливает DNS/TCP/TLS, prefetch получает вероятный будущий resource с
низким priority, а preload сообщает о critical resource текущей страницы.

**Полный ответ**

`dns-prefetch` заранее резолвит host, `preconnect` устанавливает DNS/TCP/TLS, `prefetch` получает вероятный будущий
resource с низким priority, а `preload` сообщает о critical resource текущей страницы.

```html
<link
  rel="preconnect"
  href="https://api.example.com"
/>
<link
  rel="prefetch"
  href="/chunks/dashboard.js"
/>
<link
  rel="preload"
  href="/fonts/inter.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

React Router/framework может prefetch route на hover или viewport. Angular Router поддерживает preloading strategies для
lazy routes; data можно prefetch через resolver или query cache. Aggressive prefetch конкурирует с critical resources и
трафиком пользователя.





#### Вопрос: Что такое progressive и incremental hydration?

**Короткий ответ**

Server сначала присылает готовый HTML, затем framework постепенно подключает event handlers и client state. Critical UI
гидратируется раньше, below-the-fold — при viewport/idle/interaction. React использует streaming и Suspense boundaries;
Astro — islands; Angular — incremental hydration с hydrate triggers у @defer.

**Полный ответ**

Server сначала присылает готовый HTML, затем framework постепенно подключает event handlers и client state. Critical UI
гидратируется раньше, below-the-fold — при viewport/idle/interaction. React использует streaming и Suspense boundaries;
Astro — islands; Angular — incremental hydration с hydrate triggers у `@defer`.

```html title="Angular"
@defer (hydrate on viewport) {
<app-comments />
} @placeholder {
<app-comments-skeleton />
}
```

Граница должна быть независимой и иметь стабильный server/client output. Иначе hydration mismatch или раннее событие
пользователя приведет к неожиданному UI.



#### Code Organization Strategies



#### Вопрос: Когда выбирать monorepo?

**Короткий ответ**

Monorepo хранит несколько applications и libraries в одном repository. Он полезен для atomic changes, общего design
system, shared types и единых CI rules. Цена — tooling, dependency graph, access control и необходимость affected cache.

**Полный ответ**

Monorepo хранит несколько applications и libraries в одном repository. Он полезен для atomic changes, общего design
system, shared types и единых CI rules. Цена — tooling, dependency graph, access control и необходимость affected cache.

```text
apps/
  web/
  admin/
  docs/
packages/
  ui/
  api-client/
  types/
  tooling/
```

Nx хорошо работает и с Angular, и с React; pnpm workspaces/Turborepo — framework-neutral варианты. Library boundary
должна отражать ownership и API, а не быть папкой ради папки.





#### Вопрос: Чем Vertical Slice отличается от feature-based structure?

**Короткий ответ**

Feature-based structure группирует связанный код по domain. Vertical Slice идет дальше: use case содержит все нужные
presentation, application и data-access части и минимально зависит от соседних slices.

**Полный ответ**

Feature-based structure группирует связанный код по domain. Vertical Slice идет дальше: use case содержит все нужные
presentation, application и data-access части и минимально зависит от соседних slices.

```text
features/
  checkout/
    place-order/
      place-order-page.ts
      place-order.facade.ts
      place-order.api.ts
      place-order.spec.ts
    order-history/
  shared/
```

В React `.tsx` components и hooks живут внутри slice. В Angular routed component, facade/service, resolver и data-access
могут находиться рядом. Barrel экспортирует только public API feature; deep imports из другой feature запрещают lint
rules.





#### Вопрос: Когда layer-based architecture полезна, а когда мешает?

**Короткий ответ**

Папки presentation, business, data, infrastructure хорошо показывают техническое направление зависимостей и подходят
небольшому приложению. В большом продукте одна feature оказывается разбросана по всему repository, а изменения
затрагивают несколько команд.

**Полный ответ**

Папки `presentation`, `business`, `data`, `infrastructure` хорошо показывают техническое направление зависимостей и
подходят небольшому приложению. В большом продукте одна feature оказывается разбросана по всему repository, а изменения
затрагивают несколько команд.

Компромисс — feature-first сверху и layers внутри крупной feature. Inner domain не импортирует UI или HttpClient;
data-access реализует ports; presentation зависит от application API.





#### Вопрос: Почему shared state через Module Federation опасен?

**Короткий ответ**

Remote store технически можно expose и подключить в нескольких applications, но это связывает release versions,
framework runtime и state schema. Ошибка загрузки remote блокирует всех consumers.

**Полный ответ**

Remote store технически можно expose и подключить в нескольких applications, но это связывает release versions,
framework runtime и state schema. Ошибка загрузки remote блокирует всех consumers.

```js title="React"
new ModuleFederationPlugin({
  name: 'sharedState',
  exposes: {'./store': './src/store'},
  shared: ['react', 'redux'],
});
```

Для cross-microfrontend communication предпочтительнее URL, backend state, versioned browser events или небольшой host
contract. Общий store допустим только при едином ownership и синхронном release policy.



#### Testing Patterns



#### Вопрос: Что такое Testing Trophy?

**Короткий ответ**

Testing Trophy делает foundation из static checks, затем использует unit tests для pure logic, больше integration tests
для взаимодействия частей и немного E2E для критических flows. Проценты не являются правилом: распределение зависит от
риска.

**Полный ответ**

Testing Trophy делает foundation из static checks, затем использует unit tests для pure logic, больше integration tests
для взаимодействия частей и немного E2E для критических flows. Проценты не являются правилом: распределение зависит от
риска.

```text
          E2E: few critical flows
       Integration: most behavior
          Unit: pure isolated logic
       Static: TypeScript and lint
```

React Testing Library и Angular Testing Library проверяют DOM behavior. Angular `TestBed` нужен для DI/templates, а
Playwright — для настоящего routing, browser APIs и integration с backend.





#### Вопрос: Как применять Arrange-Act-Assert в Angular и React?

**Короткий ответ**

Arrange готовит данные и dependencies, Act выполняет одно значимое действие, Assert проверяет observable result. В
zoneless Angular после действия нужно дождаться scheduled rendering.

**Полный ответ**

Arrange готовит данные и dependencies, Act выполняет одно значимое действие, Assert проверяет observable result. В
zoneless Angular после действия нужно дождаться scheduled rendering.

```ts title="Angular"
it('shows the updated title', async () => {
  const fixture = TestBed.createComponent(ProfileCard);
  fixture.componentInstance.title.set('Architect');

  await fixture.whenStable();

  expect(fixture.nativeElement.querySelector('h2')?.textContent).toContain('Architect');
});
```

В React Testing Library Act обычно выполняет `userEvent`, а Assert ищет accessible role/text. Комментарии AAA не нужны,
если структура короткого теста очевидна.





#### Вопрос: Чем stub, mock, spy и fake отличаются друг от друга?

**Короткий ответ**

В Angular fake подставляют через {provide: UsersRepository, useClass: FakeUsersRepository} или InjectionToken. В React
его передают provider-у/hook dependency. Проверять state/result предпочтительнее, чем каждый внутренний вызов.

**Полный ответ**

- Stub возвращает заранее заданное значение.
- Mock записывает interaction и проверяет protocol вызовов.
- Spy оборачивает реальную функцию и наблюдает за ней.
- Fake является упрощенной, но рабочей реализацией, например in-memory repository.

```ts
class FakeUsersRepository implements UsersRepository {
  private readonly users = new Map<string, User>();

  save(user: User): Promise<void> {
    this.users.set(user.id, user);
    return Promise.resolve();
  }

  findById(id: string): Promise<User | undefined> {
    return Promise.resolve(this.users.get(id));
  }
}
```

В Angular fake подставляют через `{provide: UsersRepository, useClass: FakeUsersRepository}` или InjectionToken. В React
его передают provider-у/hook dependency. Проверять state/result предпочтительнее, чем каждый внутренний вызов.





#### Вопрос: Что такое Page Object Model?

**Короткий ответ**

Page Object скрывает selectors и повторяемые действия E2E page. Он должен описывать user intent, а не превращаться в
копию всей DOM structure.

**Полный ответ**

Page Object скрывает selectors и повторяемые действия E2E page. Он должен описывать user intent, а не превращаться в
копию всей DOM structure.

```ts
class LoginPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto('/login');
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.getByLabel('Username').fill(username);
    await this.page.getByLabel('Password').fill(password);
    await this.page.getByRole('button', {name: 'Sign in'}).click();
  }
}
```

Один Page Object одинаково тестирует React и Angular UI, потому что работает с доступным browser contract, а не с
framework internals.



#### Best Practices and Guidelines



#### Вопрос: Как применять SOLID во frontend без over-engineering?

**Короткий ответ**

В React зависимость можно передать через props/context, в Angular — через DI. Не следует создавать interface для каждой
class: abstraction нужна на настоящей границе или при нескольких implementations.

**Полный ответ**

- SRP: component отображает profile, facade загружает user, formatter форматирует данные.
- OCP: новый variant добавляется через mapping или composition без переписывания consumers.
- LSP: API и cache repositories соблюдают одинаковый contract.
- ISP: card получает `Pick<User, 'id' | 'name'>`, а не огромный object со всеми полями.
- DIP: use case зависит от repository token/interface, infrastructure предоставляет implementation.

```ts title="Angular"
export const USERS_REPOSITORY = new InjectionToken<UsersRepository>('UsersRepository');

export const usersRepositoryProvider = {
  provide: USERS_REPOSITORY,
  useClass: HttpUsersRepository,
} satisfies Provider;
```

В React зависимость можно передать через props/context, в Angular — через DI. Не следует создавать interface для каждой
class: abstraction нужна на настоящей границе или при нескольких implementations.





#### Вопрос: Как Separation of Concerns выглядит на практике?

**Короткий ответ**

Data-access получает DTO, domain pure function сортирует и фильтрует products, application facade координирует loading,
а component отображает готовый view model.

**Полный ответ**

Data-access получает DTO, domain pure function сортирует и фильтрует products, application facade координирует loading,
а component отображает готовый view model.

```ts title="Angular"
const selectAvailableProducts = (products: ReadonlyArray<Product>): ReadonlyArray<Product> =>
  products.filter((product) => product.stock > 0).toSorted((left, right) => right.price - left.price);

@Injectable()
export class ProductsFacade {
  private readonly productsState = signal<ReadonlyArray<Product>>([]);
  readonly availableProducts = computed(() => selectAvailableProducts(this.productsState()));
}
```

React custom hook может быть application boundary, Angular service/facade — аналогом. Pure transformation остается
framework-neutral и тестируется без DOM/TestBed.





#### Вопрос: Где проходит граница DRY?

**Короткий ответ**

DRY устраняет повторение одного знания, а не похожий syntax. Универсальный useFetch(url) или DataService быстро теряет
cancellation, validation, cache keys и domain semantics. Абстракция полезна, когда повторился стабильный protocol.

**Полный ответ**

DRY устраняет повторение одного знания, а не похожий syntax. Универсальный `useFetch(url)` или `DataService<T>` быстро
теряет cancellation, validation, cache keys и domain semantics. Абстракция полезна, когда повторился стабильный
protocol.

```ts title="Angular"
const loadUser = () => http.get<UserDto>('/api/user').pipe(map(toUser));
const loadProducts = () => http.get<ReadonlyArray<ProductDto>>('/api/products').pipe(map(toProducts));
```

Эти функции похожи технически, но имеют разные contracts и invalidation rules. Query client или shared HTTP adapter
может убрать инфраструктурное повторение, не стирая domain names.





#### Вопрос: Как реализовать Progressive Enhancement?

**Короткий ответ**

Базовый HTML flow работает через browser navigation/form submit, JavaScript добавляет inline validation, optimistic UI и
submission без reload. Server остается источником проверки данных.

**Полный ответ**

Базовый HTML flow работает через browser navigation/form submit, JavaScript добавляет inline validation, optimistic UI и
submission без reload. Server остается источником проверки данных.

```html
<form
  action="/api/contact"
  method="post"
>
  <label>
    Email
    <input
      name="email"
      type="email"
      required
    />
  </label>
  <textarea
    name="message"
    required
  ></textarea>
  <button type="submit">Отправить</button>
</form>
```

React framework action или Angular submit handler может перехватить форму после hydration. Если продукт является чистой
authenticated SPA, полноценный no-JS fallback может быть нецелесообразен, но semantic HTML и native behavior остаются
полезными.





#### Вопрос: Что входит в performance budget?

**Короткий ответ**

Budget задает проверяемые пределы для initial JavaScript/CSS, изображений, LCP, CLS, INP и server latency. Он должен
проверяться в CI и на real-user monitoring, потому что Lighthouse lab run не отражает всех устройств и сетей.

**Полный ответ**

Budget задает проверяемые пределы для initial JavaScript/CSS, изображений, LCP, CLS, INP и server latency. Он должен
проверяться в CI и на real-user monitoring, потому что Lighthouse lab run не отражает всех устройств и сетей.

```json
{
  "budgets": [
    {
      "type": "initial",
      "maximumWarning": "350kb",
      "maximumError": "500kb"
    }
  ]
}
```

Angular CLI поддерживает budgets в `angular.json`; React setup зависит от bundler/framework. Lighthouse CI может
проверять LCP, CLS и total blocking time, а bundle analyzer помогает найти причину превышения.





#### Вопрос: Что означает Accessibility First для component architecture?

**Короткий ответ**

Semantic element, accessible name, keyboard interaction, focus management и visible focus проектируются как часть API
component. Одного role="dialog" недостаточно: modal должен управлять initial focus, trap, Escape, background inert и
возвратом focus.

**Полный ответ**

Semantic element, accessible name, keyboard interaction, focus management и visible focus проектируются как часть API
component. Одного `role="dialog"` недостаточно: modal должен управлять initial focus, trap, Escape, background inert и
возвратом focus.

```html
<dialog
  #dialog
  aria-labelledby="dialog-title"
>
  <h2 id="dialog-title">Удалить заказ?</h2>
  <button
    type="button"
    (click)="dialog.close()"
  >
    Отмена
  </button>
</dialog>
```

React может использовать native elements или headless accessible library. В Angular для сложных widgets доступны CDK и
Angular Aria directives, которые реализуют focus и keyboard protocol; перед использованием `@angular/aria` нужно
добавить dependency и самостоятельно оформить visual states.



#### Choosing the Right Pattern



#### Вопрос: Как выглядит decision matrix из gist с поправкой на реальные ограничения?

**Короткий ответ**

Количество страниц само по себе не требует micro frontends. Главные сигналы — organizational ownership, coupling,
release cadence, performance profile и domain complexity.

**Полный ответ**

| Контекст                            | Стартовый выбор                                                                                 |
| ----------------------------------- | ----------------------------------------------------------------------------------------------- |
| Маленький продукт, 1–3 разработчика | feature folders, local state, CSR или SSG                                                       |
| Средний продукт, 4–10 разработчиков | public feature APIs, lazy routes, facade/query layer                                            |
| Большой продукт, несколько команд   | monorepo, enforced boundaries, vertical slices; micro frontends только при независимых releases |
| Статический индексируемый контент   | SSG/prerender + CDN                                                                             |
| Динамический индексируемый контент  | SSR + cache                                                                                     |
| Authenticated dashboard             | CSR/hybrid, code splitting, virtualization для больших grids                                    |
| Смешанный сайт                      | route-based rendering, islands или incremental hydration                                        |

Количество страниц само по себе не требует micro frontends. Главные сигналы — organizational ownership, coupling,
release cadence, performance profile и domain complexity.





#### Вопрос: Какие комбинации паттернов подходят типовым продуктам?

**Короткий ответ**

В Angular набор может выглядеть как standalone lazy routes + signals facade + HttpClient/RxJS + SSR/prerender. В React —
framework routes + hooks/query cache + server/client component boundaries. Паттерны выбирают независимо от бренда
framework.

**Полный ответ**

- E-commerce: component architecture, SSG/SSR для catalog, CSR для checkout, BFF, query cache и feature structure.
- SaaS dashboard: container/presentational, CSR, lazy routes, query layer, virtualization и vertical slices.
- Content platform: SSG, islands/incremental hydration, minimal client state и CDN.
- Enterprise application: monorepo, strict feature boundaries, facade/store; micro frontends только для автономных
  команд.
- Marketing site: Atomic Design/design system, SSG, image optimization, prefetch budget и progressive enhancement.

В Angular набор может выглядеть как standalone lazy routes + signals facade + HttpClient/RxJS + SSR/prerender. В React —
framework routes + hooks/query cache + server/client component boundaries. Паттерны выбирают независимо от бренда
framework.



### Связанные материалы

- [State Management](../state-management/index.md)
- [Angular: управление состоянием](../angular/index.md#управление-состоянием)
- [React: архитектурные вопросы](../react/index.md#архитектурные-вопросы)
- [Исходный список паттернов](https://gist.github.com/mosioc/d2f7fd3c7ef2b32a198fa6e693b74faa)
