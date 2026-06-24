## Browser rendering и performance

### Browser rendering и performance

<details>
<summary>Как браузер рендерит HTML-страницу?</summary><br>
<table><tr><td>

Браузер строит DOM из HTML и CSSOM из CSS, объединяет их в render tree, вычисляет layout, выполняет paint и compositing.

JavaScript, стили, шрифты и изображения могут задерживать отдельные этапы. Производительность оценивают по реальному
critical rendering path, а не только по размеру файлов.

</td></tr></table>

</details>

<details>
<summary>Что такое DOM, CSSOM и render tree?</summary><br>
<table><tr><td>

- DOM представляет структуру HTML.
- CSSOM содержит разобранные CSS-правила.
- Render tree объединяет видимые DOM-узлы с вычисленными стилями.

Элементы вроде `display: none` не участвуют в render tree, хотя остаются в DOM.

</td></tr></table>

</details>

<details>
<summary>Что такое layout и repaint?</summary><br>
<table><tr><td>

Layout, или reflow, пересчитывает размеры и положение элементов. Repaint перерисовывает пиксели без обязательного
изменения геометрии.

Чередование чтения layout-свойств и записи стилей в цикле может вызвать layout thrashing. Операции лучше группировать и
измерять через browser Performance panel.

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
<summary>Блокирует ли CSS рендеринг?</summary><br>
<table><tr><td>

Внешний stylesheet обычно является render-blocking resource: браузеру нужен CSSOM, чтобы корректно выполнить первый
render.

CSS не обязательно останавливает загрузку всего документа, но может задержать отображение и выполнение scripts,
зависящих от стилей. Помогают небольшой critical CSS, удаление неиспользуемых стилей и корректное разделение bundles.

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
<summary>Как браузер обрабатывает index.html?</summary><br>
<table><tr><td>

Основные этапы Critical Rendering Path:

1. Браузер получает HTML и постепенно строит DOM.
2. При обнаружении CSS загружает его и строит CSSOM. CSS блокирует первый рендер.
3. Обычный синхронный `<script>` может остановить разбор HTML до загрузки и выполнения JavaScript.
4. DOM и CSSOM объединяются в render tree.
5. Layout вычисляет размеры и положение видимых элементов.
6. Paint рисует пиксели.
7. Compositing объединяет слои и выводит кадр на экран.

`defer` загружает скрипт параллельно и выполняет после разбора HTML с сохранением порядка. `async` выполняет скрипт
сразу после загрузки, поэтому порядок не гарантирован.

Для ускорения первого рендера уменьшают блокирующие CSS/JS, используют code splitting, оптимизируют шрифты и
изображения, кеширование и SSR/SSG там, где это оправдано.

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
<summary>Почему CSS может блокировать первый render?</summary><br>
<table><tr><td>

Браузеру нужен CSSOM, чтобы вычислить стили и избежать отображения страницы с неверным оформлением. Большой или медленно
загружаемый stylesheet задерживает render tree. Следует удалять неиспользуемый CSS и делить стили по реальным границам.

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
