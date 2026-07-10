---
layout: ../../layouts/Layout.astro
title: Allure Report
description:
  Вопросы и ответы про Allure Report, результаты автотестов, attachments, history, retries и публикацию отчетов в CI
category: Engineering
kind: questions
order: 136
icon: /logos/testing.svg
---

## Allure Report

### Junior

<details>
<summary>Что такое Allure Report?</summary><br>
<table><tr><td>

Allure Report — open-source инструмент для визуализации результатов автотестов. Он получает структурированные данные о
прогоне и преобразует их в интерактивный HTML-отчет с тестами, шагами, длительностью, ошибками, attachments, labels,
историей и аналитикой.

Allure не запускает тесты и не заменяет Playwright, Cypress, Jest, Vitest или другой test runner. Между test runner и
Allure обычно работает специальный adapter или reporter, который записывает результаты тестов в понятном Allure формате.

</td></tr></table>

</details>

<details>
<summary>Как Allure Report работает от запуска тестов до готового отчета?</summary><br>
<table><tr><td>

Упрощенный процесс выглядит так:

1. Test runner запускает автотесты.
2. Allure adapter получает события test runner: начало и завершение тестов, ошибки, steps, labels и attachments.
3. Adapter записывает структурированные файлы в каталог результатов, обычно `allure-results`.
4. Allure CLI читает результаты и генерирует HTML-отчет, обычно в каталоге `allure-report`.
5. Отчет открывают локально или публикуют как CI artifact либо статический сайт.

Таким образом, сбор результатов и генерация HTML-отчета — два отдельных этапа.

</td></tr></table>

</details>

<details>
<summary>Чем allure-results отличается от allure-report?</summary><br>
<table><tr><td>

`allure-results` содержит исходные структурированные данные, созданные adapter во время выполнения тестов: test result
files, containers, attachments, environment и другие metadata.

`allure-report` — готовый HTML-сайт, сгенерированный из этих результатов. Его можно открыть в браузере, сохранить как
artifact или опубликовать на web server.

Если удалить `allure-results` до генерации, отчет построить не получится. Если удалить `allure-report`, его обычно можно
сгенерировать заново из сохраненных результатов.

</td></tr></table>

</details>

<details>
<summary>Какие данные можно увидеть в Allure Report?</summary><br>
<table><tr><td>

В отчете обычно доступны:

- suites и test cases;
- statuses и сообщения об ошибках;
- stack trace;
- длительность тестов и отдельных steps;
- retries и история запусков;
- attachments: screenshots, video, trace, logs, request и response;
- labels: epic, feature, story, owner, severity и tag;
- environment и информация о CI-запуске;
- графики, trends и категории падений.

Набор данных зависит от test adapter и от того, какие metadata добавляет команда.

</td></tr></table>

</details>

<details>
<summary>Зачем нужны steps в Allure?</summary><br>
<table><tr><td>

Steps разбивают тест на понятные действия: открыть страницу, заполнить форму, отправить запрос, проверить результат.
Они помогают увидеть, на каком этапе произошла ошибка и сколько времени занял каждый этап.

Steps должны описывать бизнес-действия или значимые технические операции. Слишком мелкие steps создают шум, а один step
на весь тест не помогает локализовать проблему.

</td></tr></table>

</details>

<details>
<summary>Что такое attachments в Allure и что стоит прикладывать к падению?</summary><br>
<table><tr><td>

Attachment — файл или данные, связанные с тестом либо step. Для E2E-теста полезно сохранять screenshot, video,
Playwright trace, browser console logs, network logs, request и response. Для API-теста — request, response, headers и
server logs. Для visual regression — actual, expected и diff images.

Attachments должны помогать расследовать падение без повторного запуска теста. При этом нельзя публиковать access tokens,
пароли, cookies, персональные данные и другие секреты: их нужно удалять или маскировать.

</td></tr></table>

</details>

<details>
<summary>Какие статусы тестов используются в Allure?</summary><br>
<table><tr><td>

Частые статусы:

- `passed` — тест успешно завершен;
- `failed` — assertion не прошел или проверяемое поведение не соответствует ожиданию;
- `broken` — тест не смог корректно выполниться из-за exception, setup, fixture или инфраструктуры;
- `skipped` — тест не запускался или был пропущен;
- `unknown` — adapter не смог корректно определить статус.

Точное преобразование ошибок в `failed` и `broken` зависит от конкретной интеграции.

</td></tr></table>

</details>

### Middle

<details>
<summary>Как подключить Allure к Playwright, Cypress, Jest или Vitest?</summary><br>
<table><tr><td>

Общий принцип одинаковый:

1. Установить совместимый с test runner Allure adapter или reporter.
2. Подключить его в конфигурации test runner.
3. Указать каталог для результатов.
4. Запустить тесты и проверить, что появились result files и attachments.
5. Сгенерировать или открыть отчет через Allure CLI.
6. В CI сохранить результаты и готовый отчет как artifacts либо опубликовать отчет.

Конкретные package names и options зависят от test runner и версии интеграции, поэтому их нужно сверять с документацией
adapter.

</td></tr></table>

</details>

<details>
<summary>Для чего нужны labels epic, feature, story, owner и severity?</summary><br>
<table><tr><td>

Labels позволяют искать, фильтровать и группировать тесты:

- `epic`, `feature`, `story` описывают продуктовую иерархию;
- `owner` показывает ответственную команду или человека;
- `severity` отражает критичность сценария;
- `tag` добавляет произвольную классификацию, например `smoke`, `regression` или `payments`.

Labels полезны, когда они стабильны и связаны с реальной структурой продукта. Если каждый тест размечен по-разному,
фильтры и аналитика быстро теряют ценность.

</td></tr></table>

</details>

<details>
<summary>Как сохранить history и trends между CI-запусками?</summary><br>
<table><tr><td>

Для trends Allure должен получить history data предыдущего отчета при генерации следующего. Поэтому CI pipeline обычно:

1. Загружает history предыдущего успешного отчета или artifact.
2. Добавляет эти данные к результатам нового запуска способом, который поддерживает используемая версия Allure.
3. Генерирует новый отчет.
4. Сохраняет новый отчет и его history для следующего запуска.

Если каждый CI job начинается с полностью чистого workspace и предыдущая history не восстанавливается, отчет покажет
только текущий запуск без нормального trend.

</td></tr></table>

</details>

<details>
<summary>Как Allure связывает retries и историю одного теста?</summary><br>
<table><tr><td>

Allure должен стабильно идентифицировать один и тот же test case между попытками и запусками. Обычно идентификатор зависит
от framework, полного имени теста, параметров и metadata.

Если постоянно менять title, suite или параметры теста, Allure может воспринимать его как новый тест, и история
разорвется. Поэтому названия и параметры должны быть детерминированными, а retry не должен маскировать реальную
нестабильность.

</td></tr></table>

</details>

<details>
<summary>Как собрать единый Allure Report при parallel execution и sharding?</summary><br>
<table><tr><td>

Каждый worker или CI job генерирует свою часть Allure results. После выполнения shards результаты собирают в один каталог,
а отчет генерируют один раз уже из объединенного набора.

В CI это обычно означает upload artifacts из каждого shard, отдельный aggregate job, download всех artifacts, объединение
result files и запуск генератора. Важно не потерять attachments и не перезаписывать файлы результатами другого worker.

</td></tr></table>

</details>

<details>
<summary>Как использовать categories для группировки падений?</summary><br>
<table><tr><td>

Categories группируют падения по известным причинам, например product defect, assertion failure, timeout, environment
problem, network error или test data issue. Правила могут анализировать status, message и stack trace.

Категории ускоряют triage, но требуют поддержки. Слишком широкое правило может скрыть разные проблемы под одной меткой,
поэтому категории нужно регулярно проверять и уточнять.

</td></tr></table>

</details>

<details>
<summary>Как расследовать падение теста по Allure Report?</summary><br>
<table><tr><td>

Полезный порядок:

1. Проверить status, error message и stack trace.
2. Найти последний успешный step.
3. Открыть screenshot, trace, video и logs.
4. Сравнить environment, параметры и test data.
5. Посмотреть retries и историю теста.
6. Проверить, падают ли соседние тесты по той же причине.
7. Определить класс проблемы: product, test, data, environment или infrastructure.

Allure помогает собрать признаки в одном месте, но инженер все равно должен проверить гипотезу и локализовать причину.

</td></tr></table>

</details>

### Middle+ or Senior

<details>
<summary>Чего Allure Report не заменяет?</summary><br>
<table><tr><td>

Allure Report не заменяет:

- test runner и сами автотесты;
- корректные assertions и test design;
- CI/CD pipeline;
- code coverage;
- логи приложения и observability;
- issue tracker и процесс triage;
- полноценную test management систему, если команде нужны test plans, manual cases и централизованная аналитика.

Красивый отчет не исправляет flaky tests, слабые проверки или отсутствие важных сценариев.

</td></tr></table>

</details>

<details>
<summary>Можно ли использовать Allure как quality gate?</summary><br>
<table><tr><td>

Да, метрики отчета можно использовать как один из сигналов: количество failed и broken tests, pass rate, критичные
сценарии, длительность или рост нестабильности. Но merge или release gate должен опираться на надежные machine-readable
результаты, а не только на HTML-страницу.

Нельзя автоматически блокировать релиз по любой нестабильной метрике без понимания причин. Иначе flaky tests и ошибки
инфраструктуры остановят разработку, а команда начнет обходить gate.

</td></tr></table>

</details>

<details>
<summary>Как сделать Allure Report полезным для большой команды?</summary><br>
<table><tr><td>

Нужны единые правила:

- стабильные названия tests, suites и labels;
- понятные business-level steps;
- обязательные attachments для критичных падений;
- owners и severity для triage;
- единая классификация product, test и infrastructure failures;
- сохранение history;
- ограниченная retention policy;
- быстрые ссылки из CI, pull request и issue tracker;
- регулярная работа с flaky и медленными тестами.

Цель отчета — сократить время от падения до понимания причины, а не увеличить количество metadata.

</td></tr></table>

</details>

<details>
<summary>Какие риски безопасности есть при публикации Allure Report?</summary><br>
<table><tr><td>

Отчет и attachments могут содержать URL, headers, cookies, tokens, персональные данные, содержимое форм, screenshots
внутренних систем и stack traces. Поэтому перед публикацией нужно маскировать секреты, ограничивать доступ, задавать срок
хранения artifacts и не размещать внутренние отчеты в публичном хостинге.

Особенно внимательно нужно проверять automatic request/response attachments: они часто сохраняют больше данных, чем
ожидает автор теста.

</td></tr></table>

</details>

### Полезные материалы

- [Allure Report Documentation](https://allurereport.org/docs/)
- [How Allure Report works](https://allurereport.org/docs/how-it-works/)
- [Attachments](https://allurereport.org/docs/attachments/)
- [History and retries](https://allurereport.org/docs/history-and-retries/)
