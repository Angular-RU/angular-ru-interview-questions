## Рабочее окружение frontend-разработчика

### Git и командная разработка

<details>
<summary>Чем git revert отличается от git reset?</summary><br>
<table><tr><td>

`git revert` создает новый коммит, отменяющий изменения выбранного коммита. Он безопасен для общей ветки, потому что не
переписывает историю.

`git reset` перемещает указатель ветки. Варианты `--soft`, `--mixed` и `--hard` по-разному работают с index и рабочими
файлами. Reset опубликованной ветки требует последующего force push и может сломать работу коллег.

</td></tr></table>

</details>

<details>
<summary>Чем merge отличается от rebase?</summary><br>
<table><tr><td>

`merge` объединяет истории и обычно создает merge commit. Реальные commit hashes существующей ветки сохраняются.

`rebase` переносит коммиты на новую базу, создавая для них новые hashes и линейную историю. Rebase удобен для локальной
feature-ветки, но опубликованную общую историю без договоренности не переписывают.

</td></tr></table>

</details>

<details>
<summary>Как переключиться на hotfix с незакоммиченными изменениями?</summary><br>
<table><tr><td>

Безопасные варианты:

- сделать небольшой временный коммит в текущей ветке;
- выполнить `git stash push -u`, переключиться на hotfix, затем вернуть изменения через `git stash pop`;
- использовать отдельный `git worktree`, чтобы одновременно работать с двумя ветками.

Не стоит терять изменения через `reset --hard` или переносить незавершенный код в hotfix.

</td></tr></table>

</details>

<details>
<summary>Что происходит с коммитами при rebase на свежий develop?</summary><br>
<table><tr><td>

Git берет коммиты feature-ветки и последовательно применяет их поверх нового `develop`. Содержимое может сохраниться, но
commits получают новые parent links и hashes.

Конфликты разрешают по одному, продолжая `git rebase --continue`. После rebase уже опубликованной ветки обычно нужен
`git push --force-with-lease`, а не обычный force push.

</td></tr></table>

</details>

### Инфраструктура проекта

<details>
<summary>Что такое package.json?</summary><br>
<table><tr><td>

`package.json` описывает Node.js-проект: metadata, scripts, dependencies, devDependencies, engines и настройки
инструментов.

Версии в нем часто задаются диапазонами. Точный набор установленных пакетов фиксирует lock-файл.

</td></tr></table>

</details>

<details>
<summary>Чем отличаются npm, pnpm и Yarn?</summary><br>
<table><tr><td>

Все три инструмента устанавливают зависимости и запускают scripts из `package.json`.

- npm поставляется вместе с Node.js и использует `package-lock.json`.
- pnpm хранит пакеты в общем content-addressable store и строго связывает зависимости.
- Yarn предлагает собственные workflows и `yarn.lock`.

В проекте используют один package manager и коммитят его lock-файл. Смешивание lock-файлов делает установку
непредсказуемой.

</td></tr></table>

</details>

<details>
<summary>Зачем нужен package-lock.json?</summary><br>
<table><tr><td>

`package-lock.json` фиксирует точное дерево npm-зависимостей, их версии и integrity hashes. Его коммитят, чтобы
локальная разработка и CI получали воспроизводимую установку.

Lock-файл обновляют вместе с изменениями зависимостей и не редактируют вручную.

</td></tr></table>

</details>

<details>
<summary>Чем npm install отличается от npm ci?</summary><br>
<table><tr><td>

`npm install` устанавливает зависимости и может обновить `package-lock.json`, если он расходится с `package.json`.

`npm ci` требует существующий согласованный lock-файл, удаляет текущую `node_modules` и устанавливает зависимости строго
по lock-файлу. Поэтому его обычно используют в CI.

</td></tr></table>

</details>

<details>
<summary>Чем ESLint, Stylelint и Prettier отличаются?</summary><br>
<table><tr><td>

ESLint анализирует код и находит потенциальные ошибки, небезопасные конструкции и нарушения правил проекта.

Stylelint выполняет похожую проверку для CSS, SCSS и других стилей. Prettier отвечает за форматирование: отступы,
переносы и кавычки, но не заменяет semantic linting.

</td></tr></table>

</details>

<details>
<summary>Для чего нужен Husky?</summary><br>
<table><tr><td>

Husky настраивает Git hooks в проекте. Например, `pre-commit` может запускать lint-staged, а `commit-msg` - проверять
формат сообщения.

Hooks дают быстрый локальный feedback, но не заменяют CI: их можно пропустить или не установить.

</td></tr></table>

</details>

<details>
<summary>Чем Webpack отличается от Vite?</summary><br>
<table><tr><td>

Webpack строит dependency graph и создает bundles через loaders и plugins. Он гибкий, но development-сборка крупного
проекта может быть тяжелой.

Vite в development использует native ES modules и преобразует файлы по запросу, поэтому обычно быстрее запускается и
обновляет модули. Production-сборка использует отдельный bundling pipeline. В Angular конкретный инструмент часто скрыт
за CLI builder.

</td></tr></table>

</details>

<details>
<summary>Как код попадает в отдельный chunk?</summary><br>
<table><tr><td>

Основные сигналы для сборщика:

- отдельная entry point;
- динамический `import()`;
- lazy route;
- Angular `@defer`;
- правила code splitting в конфигурации сборщика.

Сборщик анализирует dependency graph и выносит асинхронную или общую часть в отдельный файл. Chunk полезен, если
уменьшает initial load, но слишком мелкое дробление увеличивает число запросов и служебные расходы.

</td></tr></table>

</details>

<details>
<summary>Что такое CI/CD?</summary><br>
<table><tr><td>

CI автоматически проверяет изменения: устанавливает зависимости, запускает type check, lint, tests и production build.

CD доставляет проверенную версию в staging или production автоматически либо после ручного подтверждения. Pipeline
должен быть воспроизводимым, быстрым и сохранять artifacts и диагностику ошибок.

</td></tr></table>

</details>

<details>
<summary>Что нужно знать frontend-разработчику о Docker?</summary><br>
<table><tr><td>

Docker image содержит приложение и его runtime-зависимости, а container является запущенным экземпляром image.

Для frontend Docker часто используют для одинакового Node.js-окружения в CI и multi-stage сборки: на первом этапе
собирают static assets, на втором отдают их через web server. В image не добавляют secrets и лишние build dependencies.

</td></tr></table>

</details>
