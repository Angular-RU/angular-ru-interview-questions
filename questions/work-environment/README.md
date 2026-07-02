## Рабочее окружение frontend-разработчика

### Git и командная разработка

#### Middle

<details>
<summary>Зачем команде version control workflow?</summary><br>
<table><tr><td>

**Уровень:** Middle

Version control workflow определяет, как создаются branches, pull requests, releases, hotfixes и rollback. Без общей
договоренности изменения сложнее ревьюить, релизы сложнее собирать, а история становится шумной. Workflow должен
соответствовать размеру команды, частоте релизов и риску продукта.

</td></tr></table>

</details>

<details>
<summary>Чем feature branch workflow отличается от trunk-based development?</summary><br>
<table><tr><td>

**Уровень:** Middle

Feature branch workflow держит изменения в отдельных ветках до merge. Trunk-based development предполагает маленькие
частые изменения в основной ветке, часто с feature flags и сильными automated checks. Первый подход проще для
изолированной работы, второй лучше для частых релизов и меньших merge conflicts.

</td></tr></table>

</details>

<details>
<summary>Кто должен отвечать за качество version-controlled code?</summary><br>
<table><tr><td>

**Уровень:** Middle

Ответственность разделена: автор отвечает за изменение, reviewer — за проверку, maintainers — за правила репозитория и
release process. Хорошая команда фиксирует branch protection, required checks, review rules и ownership, чтобы качество
не зависело только от внимательности одного человека.

</td></tr></table>

</details>

<details>
<summary>Где лучше вести issues и почему это важно?</summary><br>
<table><tr><td>

**Уровень:** Middle

Issues должны жить в одном понятном месте: GitHub Issues, Jira, YouTrack, Linear или другой системе. Важно, чтобы pull
requests, bugs, decisions и releases были связаны между собой. Иначе команда теряет контекст, почему изменение было
сделано и какие ограничения обсуждались.

</td></tr></table>

</details>

<details>
<summary>Чем git revert отличается от git reset?</summary><br>
<table><tr><td>

**Уровень:** Middle

`git revert` создает новый коммит, отменяющий изменения выбранного коммита. Он безопасен для общей ветки, потому что не
переписывает историю.

`git reset` перемещает указатель ветки. Варианты `--soft`, `--mixed` и `--hard` по-разному работают с index и рабочими
файлами. Reset опубликованной ветки требует последующего force push и может сломать работу коллег.

</td></tr></table>

</details>

<details>
<summary>Чем merge отличается от rebase?</summary><br>
<table><tr><td>

**Уровень:** Middle

`merge` объединяет истории и обычно создает merge commit. Реальные commit hashes существующей ветки сохраняются.

`rebase` переносит коммиты на новую базу, создавая для них новые hashes и линейную историю. Rebase удобен для локальной
feature-ветки, но опубликованную общую историю без договоренности не переписывают.

</td></tr></table>

</details>

<details>
<summary>Как переключиться на hotfix с незакоммиченными изменениями?</summary><br>
<table><tr><td>

**Уровень:** Middle

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

**Уровень:** Middle

Git берет коммиты feature-ветки и последовательно применяет их поверх нового `develop`. Содержимое может сохраниться, но
commits получают новые parent links и hashes.

Конфликты разрешают по одному, продолжая `git rebase --continue`. После rebase уже опубликованной ветки обычно нужен
`git push --force-with-lease`, а не обычный force push.

</td></tr></table>

</details>

### Инфраструктура проекта

#### Junior

<details>
<summary>Что такое package.json?</summary><br>
<table><tr><td>

**Уровень:** Junior

`package.json` — manifest Node.js-проекта. В рабочем окружении важно понимать, какие scripts запускать, какой package
manager закреплен в проекте и какой lock-файл должен быть единственным источником воспроизводимой установки.

Подробности про manifest, зависимости, lock-файлы и npm-команды см. в разделе
[npm и package scripts](../../nodejs/README.md#npm-и-package-scripts).

</td></tr></table>

</details>

<details>
<summary>Для чего нужен Husky?</summary><br>
<table><tr><td>

**Уровень:** Junior

Husky настраивает Git hooks в проекте. Например, `pre-commit` может запускать lint-staged, а `commit-msg` - проверять
формат сообщения.

Hooks дают быстрый локальный feedback, но не заменяют CI: их можно пропустить или не установить.

</td></tr></table>

</details>

#### Middle

<details>
<summary>Зачем frontend-проекту единый tooling?</summary><br>
<table><tr><td>

**Уровень:** Middle

Единый tooling снижает расхождения между локальной разработкой, CI и production build. Команда должна понимать, какой
package manager используется, какие scripts являются основными, как запускать tests, lint, format, build и preview. Это
ускоряет onboarding и уменьшает проблемы класса works on my machine.

</td></tr></table>

</details>

<details>
<summary>Чем отличаются Bun, pnpm, Yarn и npm?</summary><br>
<table><tr><td>

**Уровень:** Middle

Все эти инструменты устанавливают зависимости, работают с `package.json`, запускают scripts и фиксируют результат через
lock-файл. Отличаются скоростью, моделью `node_modules`, строгостью dependency resolution, зрелостью экосистемы и
дополнительными возможностями.

- **npm** поставляется вместе с Node.js, использует `package-lock.json`, хорошо поддерживается большинством инструментов
  и понятен почти всем разработчикам. Плюсы: стандарт де-факто, простая интеграция, минимум сюрпризов. Минусы: обычно
  медленнее pnpm и Bun, а `node_modules` может занимать больше места.
- **pnpm** использует общий content-addressable store и связывает зависимости в `node_modules` через links. Плюсы:
  быстрая установка, экономия диска, строгая модель зависимостей, удобство для monorepo. Минусы: некоторые старые или
  некорректно написанные packages могут зависеть от плоского `node_modules` и требовать настройки.
- **Yarn** использует `yarn.lock`, поддерживает workspaces и может работать как с `node_modules`, так и с Plug'n'Play.
  Плюсы: сильные monorepo-workflows, гибкие политики установки, хороший контроль зависимостей. Минусы: различия между
  Yarn Classic и современным Yarn, а Plug'n'Play может требовать дополнительной настройки IDE, bundler и отдельных
  инструментов.
- **Bun** — более широкий toolkit: runtime, package manager, test runner и bundler. Плюсы: очень быстрая установка,
  удобные встроенные инструменты, совместимость с npm registry. Минусы: экосистема и совместимость с отдельными Node.js
  packages, native addons или enterprise tooling могут быть менее предсказуемыми, чем у npm/pnpm/Yarn.

Практическое правило: в одном проекте выбирают один package manager, фиксируют его через поле `packageManager`, коммитят
ровно один lock-файл и используют одинаковую команду в CI. Смешивание `package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`
и `bun.lock` делает установку непредсказуемой.

</td></tr></table>

</details>

<details>
<summary>Зачем нужен package-lock.json?</summary><br>
<table><tr><td>

**Уровень:** Middle

`package-lock.json` нужен для воспроизводимой установки npm-зависимостей в локальной разработке и CI.

Canonical-ответ: [Что такое package-lock.json?](../../nodejs/README.md#npm-и-package-scripts)

</td></tr></table>

</details>

<details>
<summary>Чем npm install отличается от npm ci?</summary><br>
<table><tr><td>

**Уровень:** Middle

В рабочем процессе важно правило: локально чаще используют установку по правилам проекта, а в CI предпочитают
воспроизводимую установку по lock-файлу.

Подробное сравнение см. в Node.js-разделе: [Что делает npm install?](../../nodejs/README.md#npm-и-package-scripts) и
[Что делает npm ci?](../../nodejs/README.md#npm-и-package-scripts).

</td></tr></table>

</details>

<details>
<summary>Чем ESLint, Stylelint и Prettier отличаются?</summary><br>
<table><tr><td>

**Уровень:** Middle

ESLint анализирует код и находит потенциальные ошибки, небезопасные конструкции и нарушения правил проекта.

Stylelint выполняет похожую проверку для CSS, SCSS и других стилей. Prettier отвечает за форматирование: отступы,
переносы и кавычки, но не заменяет semantic linting.

Вместе с EditorConfig эти инструменты автоматизируют механические правила и уменьшают споры в review. Важно запускать их
локально и в CI, иначе guidelines остаются документом без enforcement.

</td></tr></table>

</details>

<details>
<summary>Как вы поддерживаете единый стиль кода в команде?</summary><br>
<table><tr><td>

**Уровень:** Middle

Команда фиксирует правила в formatter, linting, editor config, pull request checklist и CI. Важно автоматизировать
механические споры, а в review обсуждать читаемость, архитектуру и поведение. Если правило не проверяется автоматически,
его стоит описать в локальных соглашениях или пересмотреть.

</td></tr></table>

</details>

<details>
<summary>Для чего нужен linting tool?</summary><br>
<table><tr><td>

**Уровень:** Middle

Linting tool находит ошибки и risky patterns до runtime: неиспользуемый код, неправильные imports, нарушение
accessibility, небезопасные конструкции и несогласованный стиль. Он не заменяет тесты и review, но дает быстрый feedback
и делает качество менее зависимым от памяти конкретного разработчика.

</td></tr></table>

</details>

<details>
<summary>Чем Webpack отличается от Vite?</summary><br>
<table><tr><td>

**Уровень:** Middle

Webpack строит dependency graph и создает bundles через loaders и plugins. Он гибкий, но development-сборка крупного
проекта может быть тяжелой.

Vite в development использует native ES modules и преобразует файлы по запросу, поэтому обычно быстрее запускается и
обновляет модули. Production-сборка использует отдельный bundling pipeline. В Angular конкретный инструмент часто скрыт
за CLI builder.

</td></tr></table>

</details>

#### Middle+ or Senior

<details>
<summary>Как код попадает в отдельный chunk?</summary><br>
<table><tr><td>

**Уровень:** Middle+

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

**Уровень:** Middle+

На уровне командного процесса CI/CD отвечает за правило: каждое изменение должно проходить одинаковые автоматические
проверки, а доставка в окружения должна быть понятной и воспроизводимой.

Разницу CI и CD как процесса см. в [Методологиях](../../methodologies/README.md#чем-ci-отличается-от-cd), а deployment,
artifacts, CDN cache и rollback — в [Infrastructure](../../infrastructure/README.md#frontend-deployment).

</td></tr></table>

</details>

<details>
<summary>Что нужно знать frontend-разработчику о Docker?</summary><br>
<table><tr><td>

**Уровень:** Middle+

На уровне рабочего окружения достаточно понимать, что Docker фиксирует одинаковую среду для локального запуска, CI или
integration tests. Глубокие вопросы про image, container, Dockerfile, Compose и frontend multi-stage build живут в
[Infrastructure](../../infrastructure/README.md#docker).

</td></tr></table>

</details>

### Workflow и рабочее окружение

#### Middle

<details>
<summary>Как выглядит обычный workflow при разработке страницы или фичи?</summary><br>
<table><tr><td>

**Уровень:** Middle

Сначала уточняют цель, состояния UI, acceptance criteria, API-контракт, accessibility и способ проверки. Затем делают
минимальный инкремент, запускают локальные проверки, добавляют нужные тесты и отправляют маленький pull request. Хороший
workflow оставляет следы: описание решения, известные ограничения и понятные шаги проверки.

</td></tr></table>

</details>

<details>
<summary>Какое рабочее окружение вы предпочитаете?</summary><br>
<table><tr><td>

**Уровень:** Middle

Хороший ответ описывает не любимую IDE как самоцель, а условия продуктивности: быстрый запуск проекта, стабильный
Node.js version, корректные extensions, formatter on save, debugger, терминал и доступ к DevTools. Важно уметь
подстроиться под командные стандарты, чтобы локальная среда не расходилась с CI.

</td></tr></table>

</details>

<details>
<summary>Что вы делаете, если проект использует tabs, а вы привыкли к spaces?</summary><br>
<table><tr><td>

**Уровень:** Middle

Нужно следовать проектным настройкам, а не личной привычке. Форматирование должны задавать `.editorconfig`, Prettier или
другой formatter, чтобы файлы не менялись случайно из-за IDE. Если правила мешают, их обсуждают отдельно, а не меняют
попутно в feature pull request.

</td></tr></table>

</details>

<details>
<summary>Зачем frontend-команде documentation guidelines?</summary><br>
<table><tr><td>

**Уровень:** Middle

Documentation guidelines объясняют, где описаны архитектура, conventions, design system, onboarding, troubleshooting и
решения по workflow. Без этого знания остаются в головах отдельных людей, а новые разработчики повторяют старые ошибки.
Практичный подход — обновлять docs вместе с кодом в том же pull request.

</td></tr></table>

</details>

<details>
<summary>Какие version control systems вы использовали?</summary><br>
<table><tr><td>

**Уровень:** Middle

Ожидается не только название Git, но и понимание ежедневных операций: branch, commit, merge, rebase, revert, conflict
resolution, pull request и code review. Если был опыт SVN, Mercurial или monorepo tooling, полезно объяснить, чем
отличались процессы и какие ограничения это создавало.

</td></tr></table>

</details>

#### Middle+ or Senior

<details>
<summary>Какие инструменты должны быть описаны в onboarding документации?</summary><br>
<table><tr><td>

**Уровень:** Middle+

Нужно описать Node.js version, package manager, install command, dev server, build, tests, lint, format, environment
variables, mock API и troubleshooting. Хорошая onboarding документация позволяет новому разработчику поднять проект без
долгих личных созвонов и не расходиться с CI.

</td></tr></table>

</details>
