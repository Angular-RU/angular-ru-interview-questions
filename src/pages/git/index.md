---
layout: ../../layouts/Layout.astro
title: Git
description: Version control, branching, pull requests, rebase, merge, revert и командный workflow
category: Основы и инструменты
kind: questions
order: 20
---

## Git

### Version control и командный workflow

#### Middle

<details>
<summary>Зачем команде version control workflow?</summary><br>
<table><tr><td>

Version control workflow определяет, как создаются branches, pull requests, releases, hotfixes и rollback. Без общей
договоренности изменения сложнее ревьюить, релизы сложнее собирать, а история становится шумной. Workflow должен
соответствовать размеру команды, частоте релизов и риску продукта.

</td></tr></table>

</details>

<details>
<summary>Чем feature branch workflow отличается от trunk-based development?</summary><br>
<table><tr><td>

Feature branch workflow держит изменения в отдельных ветках до merge. Trunk-based development предполагает маленькие
частые изменения в основной ветке, часто с feature flags и сильными automated checks. Первый подход проще для
изолированной работы, второй лучше для частых релизов и меньших merge conflicts.

</td></tr></table>

</details>

<details>
<summary>Кто должен отвечать за качество version-controlled code?</summary><br>
<table><tr><td>

Ответственность разделена: автор отвечает за изменение, reviewer — за проверку, maintainers — за правила репозитория и
release process. Хорошая команда фиксирует branch protection, required checks, review rules и ownership, чтобы качество
не зависело только от внимательности одного человека.

</td></tr></table>

</details>

<details>
<summary>Где лучше вести issues и почему это важно?</summary><br>
<table><tr><td>

Issues должны жить в одном понятном месте: GitHub Issues, Jira, YouTrack, Linear или другой системе. Важно, чтобы pull
requests, bugs, decisions и releases были связаны между собой. Иначе команда теряет контекст, почему изменение было
сделано и какие ограничения обсуждались.

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
<summary>Какие version control systems вы использовали?</summary><br>
<table><tr><td>

Ожидается не только название Git, но и понимание ежедневных операций: branch, commit, merge, rebase, revert, conflict
resolution, pull request и code review. Если был опыт SVN, Mercurial или monorepo tooling, полезно объяснить, чем
отличались процессы и какие ограничения это создавало.

</td></tr></table>

</details>

### Git commands

#### Middle

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
