## Browser rendering и performance

### Browser rendering и performance

<details>
<summary>Что происходит после получения HTML-документа?</summary><br>
<table><tr><td>

Браузер начинает streaming parse HTML еще до полной загрузки документа. Он строит DOM, заранее обнаруживает ресурсы
через preload scanner, загружает CSS, JavaScript, изображения, fonts и другие зависимости.

Для первого render нужны DOM, CSSOM и render tree. Затем browser выполняет layout, paint и compositing. JavaScript,
stylesheets, fonts и большие изображения могут задержать отдельные этапы, поэтому производительность оценивают по
реальному Critical Rendering Path.

</td></tr></table>

</details>

<details>
<summary>Что происходит после ввода URL в адресную строку браузера?</summary><br>
<table><tr><td>

Браузер разбирает URL, проверяет cache, HSTS и service worker, выполняет DNS lookup, устанавливает соединение TCP/TLS
или QUIC и отправляет HTTP-запрос. После ответа начинается parsing HTML, загрузка зависимостей, построение DOM и CSSOM,
layout, paint и compositing. На каждом этапе могут влиять redirects, CDN, browser cache, HTTP/2 multiplexing, HTTP/3 и
blocking resources.

</td></tr></table>

</details>

<details>
<summary>Что такое progressive enhancement?</summary><br>
<table><tr><td>

Progressive enhancement начинает с базового доступного HTML и постепенно добавляет CSS, JavaScript и продвинутые browser
features. Если часть улучшений недоступна, основной content и ключевые действия остаются рабочими. Для Angular это
особенно заметно в SSR/prerender сценариях: пользователь не должен видеть пустую страницу до загрузки bundle.

</td></tr></table>

</details>

<details>
<summary>Чем progressive enhancement отличается от graceful degradation?</summary><br>
<table><tr><td>

Progressive enhancement проектирует опыт от базового слоя к улучшениям. Graceful degradation обычно начинается с
полнофункционального варианта и пытается сохранить приемлемую работу при отсутствии части возможностей. Первый подход
лучше помогает accessibility, слабым устройствам и нестабильной сети, второй часто встречается при поддержке старых
браузеров.

</td></tr></table>

</details>

<details>
<summary>Что такое FOUC и как его уменьшить?</summary><br>
<table><tr><td>

FOUC, Flash of Unstyled Content, возникает, когда HTML уже отрисован, а нужные CSS или fonts еще не применились.
Помогают critical CSS, корректное размещение stylesheet, preload важных fonts, стабильные fallback fonts и отказ от
поздней загрузки базовых стилей через JavaScript. В Angular также важно, чтобы server-rendered HTML и client styles
давали согласованный first render.

</td></tr></table>

</details>

<details>
<summary>Почему HTML-парсер не падает на невалидной разметке?</summary><br>
<table><tr><td>

HTML parsing designed to be forgiving: браузеры десятилетиями должны были показывать страницы с ошибками разметки.
Спецификация описывает tokenization, tree construction и error recovery, поэтому parser исправляет многие случаи сам.

Например, браузер может автоматически закрыть тег, вставить пропущенный `<tbody>` или перестроить некорректную
вложенность. Поэтому DOM может отличаться от исходного HTML source.

</td></tr></table>

</details>

<details>
<summary>Чем DOM отличается от HTML source?</summary><br>
<table><tr><td>

HTML source — это текст, который пришел от сервера или был записан в документ. DOM — live object model, которую браузер
построил после parsing и error recovery, а затем может изменять JavaScript.

DOM может содержать автоматически добавленные узлы, нормализованную структуру, элементы из templates после runtime
rendering и изменения, которых не было в исходном HTML. На интервью важно не смешивать view-source и Elements panel.

</td></tr></table>

</details>

<details>
<summary>Что такое CSSOM и почему CSS может блокировать рендеринг?</summary><br>
<table><tr><td>

CSSOM — object model разобранных CSS rules. Браузеру нужен CSSOM, чтобы вычислить стили и построить render tree, поэтому
внешний stylesheet обычно является render-blocking resource для первого render.

Большой CSS, медленный CDN или `@import` могут задержать LCP. Помогают critical CSS, удаление unused CSS, разделение
styles по routes и аккуратная загрузка fonts.

</td></tr></table>

</details>

<details>
<summary>Что такое render tree?</summary><br>
<table><tr><td>

- DOM представляет структуру HTML.
- CSSOM содержит разобранные CSS-правила.
- Render tree объединяет видимые DOM-узлы с вычисленными стилями.

Элементы вроде `display: none` не участвуют в render tree, хотя остаются в DOM.

</td></tr></table>

</details>

<details>
<summary>Чем layout, paint и compositing отличаются друг от друга?</summary><br>
<table><tr><td>

Layout, или reflow, вычисляет размеры и положение элементов. Paint превращает styled boxes, text, borders и shadows в
пиксели или paint commands. Compositing собирает слои в итоговый кадр и часто может выполняться без нового layout и
paint.

Чередование чтения layout-свойств и записи стилей в цикле может вызвать layout thrashing. Операции лучше группировать и
измерять через browser Performance panel.

</td></tr></table>

</details>

<details>
<summary>Что такое forced synchronous layout?</summary><br>
<table><tr><td>

Forced synchronous layout возникает, когда JavaScript меняет styles, а затем сразу читает layout-свойства вроде
`offsetWidth` или `getBoundingClientRect()`. Браузер вынужден немедленно пересчитать layout, чтобы вернуть точное
значение. Чтобы избежать layout thrashing, группируют чтения и записи, используют observers и проверяют проблему в
DevTools Performance.

</td></tr></table>

</details>

<details>
<summary>Как DevTools Performance panel помогает найти long tasks?</summary><br>
<table><tr><td>

Performance panel показывает timeline main thread: scripting, style recalculation, layout, paint, long tasks и события
input. По flame chart можно увидеть, какая функция, framework render или forced layout заняли кадр. Для Angular полезно
сопоставлять эти данные с Angular DevTools Profiler и количеством change detection cycles.

</td></tr></table>

</details>

<details>
<summary>Как улучшить scroll performance?</summary><br>
<table><tr><td>

Нужно уменьшить работу на main thread во время scroll: использовать passive listeners, не читать и не писать layout в
каждом событии, виртуализировать большие списки и избегать тяжелых shadows/filters на множестве элементов. Sticky,
parallax и infinite scroll проверяют на реальных устройствах. В Angular важно не запускать лишние state updates и change
detection на каждый пиксель прокрутки.

</td></tr></table>

</details>

<details>
<summary>Как JavaScript может замедлить первый render?</summary><br>
<table><tr><td>

Синхронный `<script>` останавливает HTML parsing, потому что может изменить документ. Большой bundle также требует
download, parse, compile и execute на main thread, конкурируя со style calculation, layout и user input.

В Angular это проявляется как поздний initial rendering и длинные tasks до интерактивности. Помогают `defer`, code
splitting, lazy routes, уменьшение polyfills/dependencies, SSR/SSG и перенос тяжелой работы из startup path.

</td></tr></table>

</details>

<details>
<summary>Что происходит после загрузки Angular bundle?</summary><br>
<table><tr><td>

Browser выполняет JavaScript bundle, Angular запускает bootstrap, создает root injector, регистрирует providers, создает
root component и выполняет initial rendering. Если настроен Router, стартовая навигация выбирает route, загружает lazy
chunks и активирует guards/resolvers по конфигурации.

При SSR браузер получает готовый HTML раньше, а после загрузки bundle Angular выполняет hydration: связывает
существующий DOM с компонентами и обработчиками событий. Ошибки hydration, большой bundle или медленные initializers
могут задержать интерактивность.

</td></tr></table>

</details>

<details>
<summary>Почему transform лучше top и left для анимаций?</summary><br>
<table><tr><td>

Изменение `top` и `left` часто требует layout и paint. `transform` обычно может обрабатываться на этапе compositing,
поэтому анимация получается плавнее.

Это не абсолютное правило: создание лишних layers расходует память, а итог нужно проверять профилировщиком.

</td></tr></table>

</details>

<details>
<summary>Почему не стоит использовать transition: all?</summary><br>
<table><tr><td>

`transition: all` анимирует любые изменившиеся свойства, включая неожиданные и дорогие для layout. Это усложняет
поддержку и может создавать случайные анимации.

Лучше явно перечислить свойства:

```css
.button {
  transition:
    transform 150ms ease,
    opacity 150ms ease;
}
```

</td></tr></table>

</details>

<details>
<summary>Что такое Web Vitals?</summary><br>
<table><tr><td>

Web Vitals - пользовательские метрики качества страницы:

- **LCP**: скорость отображения основного контента;
- **INP**: отзывчивость на взаимодействия;
- **CLS**: визуальная стабильность.

Метрики анализируют по полевым данным реальных пользователей и дополняют лабораторными измерениями Lighthouse и
DevTools.

</td></tr></table>

</details>

<details>
<summary>Какие инструменты использовать для поиска performance bug?</summary><br>
<table><tr><td>

Для диагностики используют Chrome DevTools Performance, Network, Lighthouse, Coverage, Memory, Angular DevTools и RUM
метрики из production. Lighthouse удобен как лабораторный smoke test, но реальные LCP, CLS и INP нужно смотреть по
пользовательским данным. Performance bug лучше искать от симптома и метрики, а не по случайной оптимизации bundle.

</td></tr></table>

</details>

<details>
<summary>Как уменьшить perceived load time?</summary><br>
<table><tr><td>

Perceived load time уменьшают ранним показом meaningful content, skeleton или стабильного placeholder, SSR/SSG, critical
CSS, приоритизацией LCP resource и отложенной загрузкой второстепенного кода. Важно не имитировать скорость спиннером, а
дать пользователю полезный первый экран и быстрый путь к интерактивности.

</td></tr></table>

</details>

<details>
<summary>Чем SSR отличается от CSR?</summary><br>
<table><tr><td>

CSR строит интерфейс в браузере после загрузки JavaScript, а SSR отдает HTML с сервера для текущего запроса. SSR может
улучшить first paint, SEO и previews, но добавляет серверную инфраструктуру, constraints на browser-only code и риск
hydration mismatch. CSR проще для внутренних приложений, где SEO и публичный first render не критичны.

</td></tr></table>

</details>

<details>
<summary>Что такое static rendering?</summary><br>
<table><tr><td>

Static rendering, или SSG/prerender, генерирует HTML заранее на build time или по заранее известным routes. Это хорошо
для документации, маркетинговых страниц и контента, который редко меняется. Для персонализированных данных нужен CSR,
SSR, incremental regeneration или отдельная загрузка данных на клиенте.

</td></tr></table>

</details>

<details>
<summary>Что такое hydration?</summary><br>
<table><tr><td>

Hydration связывает уже отрендеренный HTML с клиентским JavaScript: framework восстанавливает состояние компонентов,
навешивает handlers и продолжает работу без полной перерисовки. Если server HTML и client render не совпадают, возможен
hydration mismatch. Поэтому rendering должен быть детерминированным и не зависеть от случайных browser-only значений в
первом проходе.

</td></tr></table>

</details>

<details>
<summary>Что такое Critical Rendering Path?</summary><br>
<table><tr><td>

Это последовательность получения HTML/CSS, построения DOM и CSSOM, создания render tree, layout, paint и compositing до
появления пикселей. Блокирующие ресурсы и long tasks удлиняют путь. Оптимизация должна улучшать измеряемый LCP и первый
render, а не только число запросов.

</td></tr></table>

</details>

<details>
<summary>Что такое render-blocking resources?</summary><br>
<table><tr><td>

Это ресурсы, без обработки которых браузер откладывает первый render. К ним обычно относятся stylesheets и часть
синхронных scripts. Critical CSS, code splitting и корректные `defer`/`async` уменьшают блокировку.

</td></tr></table>

</details>

<details>
<summary>Почему синхронный JavaScript может блокировать parsing HTML?</summary><br>
<table><tr><td>

Обычный `<script>` останавливает parser, потому что код может вызвать `document.write()` или изменить уже построенный
DOM. Браузер должен загрузить и выполнить script перед продолжением. `defer` обычно подходит application scripts лучше.

</td></tr></table>

</details>

<details>
<summary>Что такое main thread?</summary><br>
<table><tr><td>

Это поток renderer process, где выполняются JavaScript, style calculation, layout и часть paint. User input и rendering
конкурируют с application code за его время. Поэтому тяжелая синхронная работа ухудшает отзывчивость.

</td></tr></table>

</details>

<details>
<summary>Какие задачи конкурируют за main thread?</summary><br>
<table><tr><td>

Event handlers, timers, framework rendering, parsing, style/layout, часть paint и browser callbacks. Если одна задача
занимает поток надолго, input и следующий кадр ждут. Вычисления можно разбивать, откладывать или переносить в Worker.

</td></tr></table>

</details>

<details>
<summary>Что такое long task?</summary><br>
<table><tr><td>

Это задача main thread длительностью более 50ms. Внутри нее браузер не может своевременно обработать input или render.
Long Tasks API и Performance panel помогают найти источник.

</td></tr></table>

</details>

<details>
<summary>Как long task влияет на INP?</summary><br>
<table><tr><td>

Interaction может ждать окончания уже выполняющейся long task, а затем сам handler и render добавят задержку. INP
учитывает полную latency взаимодействия до следующего отображенного кадра. Нужно сокращать blocking time, а не только
handler выбранной кнопки.

</td></tr></table>

</details>

<details>
<summary>Что такое debounce и throttle с точки зрения performance?</summary><br>
<table><tr><td>

Debounce запускает работу после паузы в серии событий, throttle ограничивает частоту запусков. Они уменьшают число
дорогих обработок scroll, resize или input. Неправильная задержка может ухудшить ощущение отзывчивости и accessibility.

</td></tr></table>

</details>

<details>
<summary>Что такое virtualization списков?</summary><br>
<table><tr><td>

Virtualization рендерит только видимую часть большого списка и небольшой buffer. DOM остается компактным, уменьшая
layout, paint и memory usage. Нужно корректно поддержать высоты, прокрутку, focus и screen readers.

</td></tr></table>

</details>

<details>
<summary>Когда нужна виртуализация?</summary><br>
<table><tr><td>

Когда сотни или тысячи сложных строк заметно замедляют initial render и scrolling. Для короткого списка она добавляет
лишнюю сложность. Решение принимают после измерения DOM size и frame performance.

</td></tr></table>

</details>

<details>
<summary>Как изображения влияют на LCP?</summary><br>
<table><tr><td>

Hero image часто становится LCP element, поэтому его download, decode и размер напрямую влияют на метрику. Нужны
подходящий формат, responsive source, размеры в разметке и высокий приоритет только для реального LCP-кандидата.

</td></tr></table>

</details>

<details>
<summary>Что такое lazy loading images?</summary><br>
<table><tr><td>

`loading="lazy"` откладывает загрузку изображений вне viewport. Это экономит сеть и CPU, но его нельзя бездумно ставить
на LCP image. Размеры изображения задают заранее, чтобы избежать CLS.

</td></tr></table>

</details>

<details>
<summary>Что такое <code>srcset</code> и responsive images?</summary><br>
<table><tr><td>

`srcset` перечисляет кандидаты разного размера или pixel density, а `sizes` описывает ожидаемую ширину в layout. Браузер
выбирает подходящий файл с учетом viewport и DPR. `picture` дополнительно позволяет art direction и форматы.

</td></tr></table>

</details>

<details>
<summary>Что такое preload, prefetch и preconnect?</summary><br>
<table><tr><td>

`preload` приоритетно загружает ресурс текущей страницы, `prefetch` с низким приоритетом готовит вероятный следующий
переход, `preconnect` заранее устанавливает соединение с origin. Ошибочное применение расходует bandwidth и конкурирует
с критическими ресурсами.

</td></tr></table>

</details>

<details>
<summary>Чем Lighthouse отличается от реальных пользовательских метрик?</summary><br>
<table><tr><td>

Lighthouse выполняет воспроизводимый лабораторный запуск с заданным устройством и сетью. RUM показывает реальных
пользователей, устройства, кеши и взаимодействия, включая распределение Core Web Vitals. Для диагностики нужны оба
источника.

</td></tr></table>

</details>
