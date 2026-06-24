## Методологии и процессы

<details>
<summary>Что такое Agile?</summary><br>
<table><tr><td>

![img.png](./assets/agile.png)

Agile - набор принципов итеративной разработки: короткие циклы, частая поставка работающего результата, обратная связь и
готовность менять план.

Agile не означает отсутствие документации или сроков. Команда сохраняет необходимый процесс, но быстрее проверяет
гипотезы и снижает риск большой поставки в конце проекта.

</td></tr></table>

</details>

<details>
<summary>Чем waterfall отличается от agile-подхода?</summary><br>
<table><tr><td>

![img.png](./assets/waterfall-vs-agile.png)

Waterfall последовательно проходит этапы требований, проектирования, разработки и тестирования. Он удобен при стабильных
требованиях и дорогих изменениях.

Agile-подход поставляет результат небольшими итерациями и уточняет требования по обратной связи. В реальных проектах
часто используют гибрид, а выбор зависит от продукта, регулирования и рисков.

Формально в классическом Waterfall спринтов нет. Waterfall — это последовательная модель:

Требования -> Проектирование -> Разработка -> Тестирование -> Релиз

Каждый этап обычно заканчивается перед началом следующего. Поэтому там чаще говорят:

```text
этапы
фазы
milestones / контрольные точки
план-график
релизные даты
```

А спринт — это термин из Scrum / Agile. Спринт означает короткую итерацию, например 1–2 недели, внутри которой команда
планирует, разрабатывает, тестирует и получает обратную связь.

```text
Sprint 1 -> результат -> feedback
Sprint 2 -> результат -> feedback
Sprint 3 -> результат -> feedback
```

</td></tr></table>

</details>

<details>
<summary>Что такое Scrum?</summary><br>
<table><tr><td>

![img.png](./assets/scrum.png)

Scrum организует работу короткими sprints. Есть product backlog, sprint planning, daily, review и retrospective; роли
включают product owner, scrum master и developers.

Для frontend-разработчика важны понятная цель спринта, согласованный объем и прозрачное обсуждение блокеров.

</td></tr></table>

</details>

<details>
<summary>Что такое Kanban?</summary><br>
<table><tr><td>

Kanban визуализирует поток задач по состояниям и ограничивает work in progress. Новая задача берется, когда освободилась
пропускная способность.

Метод подходит для непрерывного потока support, bugs и небольших улучшений, где фиксированный sprint менее удобен.

</td></tr></table>

</details>

<details>
<summary>Что такое sprint и backlog?</summary><br>
<table><tr><td>

Sprint - ограниченный период, обычно одна-две недели, с конкретной целью и выбранными задачами.

Backlog - упорядоченный список product work: features, bugs, technical debt и исследования. Перед реализацией задачи
уточняют, декомпозируют и снабжают acceptance criteria.

</td></tr></table>

</details>

<details>
<summary>Для чего нужны daily и retrospective?</summary><br>
<table><tr><td>

Daily помогает синхронизировать движение к цели и быстро обнаружить blockers. Это не отчет руководителю и не место для
длинного технического обсуждения.

Retrospective проводится после итерации: команда выбирает, что сохранить, что улучшить и какое конкретное действие
проверить дальше.

</td></tr></table>

</details>

<details>
<summary>Что такое bug tracker?</summary><br>
<table><tr><td>

Bug tracker хранит задачи, defects, приоритеты, владельцев, статусы и историю обсуждения. Примеры: Jira, YouTrack,
GitHub Issues.

Хороший bug report содержит шаги воспроизведения, ожидаемый и фактический результат, окружение, severity и
диагностические материалы.

</td></tr></table>

</details>

<details>
<summary>Чем CI отличается от CD?</summary><br>
<table><tr><td>

CI регулярно объединяет изменения и автоматически запускает проверки. CD отвечает за доставку проверенного artifact в
окружения.

Continuous delivery оставляет production release под ручным подтверждением, а continuous deployment автоматически
публикует каждое прошедшее изменение.

</td></tr></table>

</details>

<details>
<summary>Чем отличаются GitFlow, GitHub Flow и Trunk-Based Development?</summary><br>
<table><tr><td>

- GitFlow использует долгоживущие `develop`, release и hotfix branches; процесс формальный, но интеграция может быть
  медленной.
- GitHub Flow использует короткие feature branches, pull requests и merge в основную ветку.
- Trunk-Based Development предполагает очень короткие branches или работу близко к trunk, частую интеграцию и feature
  flags.

Выбор зависит от release process, размера команды и автоматизации тестов.

</td></tr></table>

</details>
