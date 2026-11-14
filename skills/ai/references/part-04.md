# AI — вопросы и ответы, часть 4

> Автоматически сгенерировано из src/pages/ai/index.md. Не редактируйте вручную.

### AI-инструменты разработки



#### Вопрос: Чем отличаются ChatGPT, Claude, Codex и AI IDE?

**Короткий ответ**

ChatGPT и Claude - универсальные AI-продукты, Codex и Claude Code - специализированные coding agents, а AI IDE - среда
разработки, где AI встроен прямо в редактор. Сравнивать нужно не только модель, но и orchestration: доступ к
репозиторию, tools, terminal, permissions, review и способ выполнения задач.

**Полный ответ**

Главная ошибка - смешивать модель, продукт и рабочую среду. Это разные уровни.

**ChatGPT** - универсальный AI-продукт. Он подходит для обсуждения архитектуры, анализа текста и файлов, исследования,
объяснений, черновиков и других задач, не ограниченных кодом. В экосистеме OpenAI Codex выделен отдельно как
специализированный coding agent.

**Claude** - универсальный AI-продукт и платформа Anthropic. Для разработки у Anthropic есть отдельный Claude Code,
который работает как agent в developer workflow.

**Codex** - coding agent OpenAI. Его задача не только ответить текстом, а работать с software project: изучать
репозиторий, менять файлы, запускать команды и тесты, анализировать результат и готовить изменения к review. Codex
доступен в нескольких developer surfaces, включая CLI, IDE integration и desktop app; часть задач можно делегировать в
изолированную cloud-среду.

**Claude Code** решает похожий класс agentic coding задач со стороны Anthropic: работает с проектом, редактирует файлы,
запускает команды, использует MCP и может автоматизироваться через CLI.

**AI IDE** - это редактор или IDE, где AI находится непосредственно рядом с кодом. Например, такой продукт может
совмещать autocomplete, inline edit, chat, repository search и agent mode. Его главное преимущество - минимальное
переключение контекста при ежедневном редактировании.

Важно, что один и тот же model family может вести себя по-разному в разных продуктах. Поведение определяет не только
модель, но и:

- system instructions;
- доступный context и retrieval;
- tools и MCP;
- sandbox и approvals;
- agent loop;
- интеграция с Git, terminal и CI;
- правила compaction и сохранения состояния.

Поэтому вопрос «что лучше: ChatGPT или Codex?» некорректен без задачи. Для обсуждения API или архитектурной идеи может
быть достаточно универсального assistant. Для изменения реального репозитория с тестами полезнее coding agent. Для
небольших правок во время ручной разработки удобнее AI IDE.

На интервью полезная формула: **модель отвечает за inference, продукт - за orchestration, а developer tool - за то,
какой контекст и какие действия реально доступны модели**.

См. [ChatGPT Work and Codex](https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex),
[Using Codex with your ChatGPT plan](https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan) и
[Claude Code setup](https://docs.anthropic.com/en/docs/claude-code/getting-started).





#### Вопрос: Что лучше: AI IDE, desktop app или терминальный агент?

**Короткий ответ**

Нет универсально лучшего интерфейса. AI IDE оптимальна для tight feedback loop рядом с кодом, terminal agent - для
воспроизводимых repo/CLI-задач, desktop app - для нескольких параллельных задач и визуального контроля, cloud agent -
для делегирования изолированной долгой работы.

**Полный ответ**

Выбирать стоит по характеру работы, а не по тому, какой интерфейс выглядит современнее.

**AI IDE** сильна, когда человек сам остается основным driver разработки:

- пишет код и получает autocomplete;
- выделяет фрагмент и просит локальную правку;
- быстро открывает определения и соседние файлы;
- постоянно переключается между ручным edit и AI assistance;
- хочет видеть изменение сразу в editor diff.

Это хороший режим для коротких итераций, когда решение формируется во время написания кода.

**Терминальный agent** удобен, когда задача естественно выражается через repository и CLI:

- найти использование API по проекту;
- запустить tests/lint/build;
- выполнить codemod;
- исследовать git history;
- автоматизировать повторяемый workflow;
- работать через SSH или в dev container.

Terminal также легче включить в scripts и CI-like процессы. Например, Claude Code поддерживает non-interactive print
mode, а coding agents в целом хорошо сочетаются с Unix tooling.

**Desktop app** полезен, если работа состоит из нескольких agent tasks одновременно. В Codex app, например, developer
может держать разные задачи и проекты параллельно, использовать worktree-oriented workflow и отдельно просматривать
progress/diff, не превращая terminal tabs в диспетчер задач.

**Cloud agent** полезен, когда задачу можно делегировать в отдельную среду: агент получает repository
snapshot/environment, выполняет работу изолированно, а человек позже review результат. Это снижает необходимость держать
локальный terminal занятым, но повышает требования к reproducible setup и доступным secrets/dependencies.

Практичный workflow часто комбинирует поверхности:

1. Обсудить неясную часть задачи в chat.
2. Сделать локальные небольшие edits в IDE.
3. Делегировать большой механический refactor agent-у.
4. Проверить diff, tests и архитектуру вручную.

Критерии выбора: latency взаимодействия, доступ к локальному окружению, autonomy, permissions, удобство review,
parallelism и reproducibility.

На интервью сильный ответ не выбирает один UI навсегда: **surface должна соответствовать длине feedback loop и
требуемому уровню autonomy**.





#### Вопрос: В каких задачах Codex сильнее обычного чат-бота?

**Короткий ответ**

Codex полезнее там, где ответом должен быть проверенный результат в репозитории, а не только совет: найти связанный код,
изменить несколько файлов, запустить команды и тесты, проанализировать ошибки, проверить diff и повторить цикл до
выполнения критериев.

**Полный ответ**

Обычный chat хорошо решает задачи вида «объясни», «сравни», «предложи варианты» или «помоги продумать решение». Coding
agent добавляет к reasoning **action loop**.

Типичный agent loop выглядит так:

1. Изучить repository и инструкции проекта.
2. Найти релевантные файлы и зависимости.
3. Сформировать план.
4. Изменить код.
5. Запустить formatter, typecheck, tests или build.
6. Прочитать ошибки и скорректировать решение.
7. Проверить итоговый diff и сообщить, что реально было проверено.

Именно этот цикл делает Codex полезным для задач, где контекст распределен по проекту.

Примеры:

- найти причину regression, которая проходит через component, service и backend adapter;
- мигрировать устаревший API во многих файлах;
- воспроизвести падающий test и исправить причину;
- добавить feature вместе с tests и documentation;
- провести repository-aware code review;
- устранить review comments и повторно запустить проверки.

Coding agent также может пользоваться developer tools и подключенным внешним контекстом. Но это не означает, что ему
нужно давать максимальные permissions. Чем опаснее действие, тем важнее sandbox, approvals и узкие credentials.

Chat иногда даже лучше: если нужно только проверить идею, agent может создать лишний operational overhead. Не стоит
давать repository write access ради вопроса «какой тип лучше использовать?».

Текущая документация OpenAI описывает Codex именно как agent для write/review/ship code: он может работать с repository,
запускать commands/tests, а задачи могут выполняться локально или делегироваться в cloud sandbox.

На интервью полезно сказать: **чат оптимизирован для ответа, coding agent - для замкнутого observe -> act -> verify
цикла внутри engineering environment**.

См.
[Using Codex with your ChatGPT plan](https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan).





#### Вопрос: Когда Claude Code или Claude Desktop могут быть удобнее Codex?

**Короткий ответ**

Когда Anthropic ecosystem лучше совпадает с вашим workflow: Claude-модели проходят внутренние evals лучше, команда уже
стандартизировала Claude Code, нужны его CLI/permission patterns, MCP-интеграции или deployment через Anthropic API,
Bedrock или Vertex AI. Это выбор по workflow и ограничениям, а не по бренду.

**Полный ответ**

Правильный вопрос не «кто победил - Claude или Codex?», а **какой toolchain лучше проходит реальные задачи команды при
приемлемых security/cost constraints**.

Claude Code может оказаться удобнее, если:

- команда уже использует Claude models и Anthropic Console;
- существующие prompts/instructions заточены под Claude Code;
- важна Unix-style автоматизация через CLI и non-interactive режим;
- используется его permission model или MCP-конфигурация;
- enterprise inference уже идет через Amazon Bedrock или Google Vertex AI;
- внутренний eval показывает лучший task success именно на Claude Code workflow.

Anthropic документирует Claude Code как terminal coding agent, который может редактировать проект, выполнять команды,
работать с Git и MCP. CLI также поддерживает scripting-oriented режимы и выбор permission mode.

Claude Desktop может быть удобен как более общий Anthropic desktop surface, особенно когда работа объединяет
conversation, файлы и MCP-connected контекст, а не ограничивается одним repository workflow.

Codex, наоборот, может быть удобнее, если команда уже использует ChatGPT/OpenAI ecosystem, Codex app/CLI/IDE, repository
workflows и automatic code review, либо если его agent loop лучше проходит ваш eval.

Сравнивать стоит одинаковые задачи, например 20 реальных tickets:

- task success без ручного rescue;
- correctness после tests;
- размер и чистота diff;
- количество лишних tool calls;
- скорость;
- стоимость;
- удобство intervention;
- permissions и auditability;
- качество работы с монорепозиторием;
- стабильность на длинной сессии.

Не стоит выбирать tool только потому, что одна модель выиграла отдельный benchmark: product harness может изменить
результат сильнее, чем разница model score.

На интервью сильная позиция: **agent tool выбирается workload-specific eval-ом; модель, orchestration, integrations и
security controls оцениваются вместе**.

См. [Claude Code setup](https://docs.anthropic.com/en/docs/claude-code/getting-started) и
[Claude Code CLI reference](https://docs.anthropic.com/en/docs/claude-code/cli-usage).





#### Вопрос: Как сравнивать AI IDE и агентный инструмент?

**Короткий ответ**

AI IDE измеряйте как усилитель человека в коротком edit-loop, а agent - как систему делегирования многошаговой задачи.
Для IDE важны latency и качество inline help; для agent - task success, autonomy, verification, permissions,
recoverability и качество итогового diff.

**Полный ответ**

AI IDE и coding agent могут использовать похожие модели, но оптимизируют разный interaction model.

В **AI IDE** основной loop обычно такой:

`человек редактирует -> AI подсказывает -> человек сразу принимает/меняет`.

В **agent workflow**:

`человек ставит цель -> agent исследует -> выполняет несколько действий -> проверяет -> человек review результат`.

Поэтому один общий benchmark вроде «сколько строк кода было сгенерировано» почти бесполезен.

Для AI IDE полезно измерять:

- acceptance rate autocomplete/edit suggestions;
- time-to-first-useful-suggestion;
- сколько ручных исправлений нужно после suggestion;
- качество repository navigation;
- насколько AI мешает концентрации ложными подсказками;
- удобство inline diff и отмены изменения.

Для agent tool важнее:

- процент задач, завершенных без ручного rescue;
- корректность после tests/build;
- число итераций и tool calls;
- способность остановиться при неизвестности;
- размер и scope diff;
- качество summary и verification report;
- sandbox/approval model;
- rollback и возможность вмешаться по ходу задачи.

Есть и общие критерии: privacy, enterprise policy, context quality, cost, model availability и vendor lock-in.

Хороший team experiment не спрашивает разработчиков «что вам больше нравится?». Он дает одинаковый набор задач и
сравнивает time-to-verified-result. Например:

- локальный rename в одном component;
- bug fix через 5 файлов;
- dependency migration;
- исследование незнакомого repository;
- CI failure;
- review большого PR.

Часть задач почти наверняка выиграет IDE, часть - agent. Это нормально: инструменты дополняют друг друга.

На интервью полезная формула: **AI IDE оптимизирует pair-programming loop, agent - delegation loop; сравнивать нужно
end-to-end результат каждого loop**.





#### Вопрос: Как выбрать AI-инструменты для команды?

**Короткий ответ**

Начните не с списка популярных продуктов, а с 5-10 командных workflows и security constraints. Проведите pilot, измерьте
quality/time/cost, проверьте data policy, permissions, audit и integrations, затем стандартизируйте небольшой approved
toolset с понятными правилами использования.

**Полный ответ**

Командный выбор AI-tools - это platform decision, а не персональный конкурс интерфейсов.

Сначала нужно описать **use cases**:

- autocomplete и небольшие edits;
- codebase Q&A;
- feature implementation;
- refactoring/migrations;
- tests;
- PR review;
- documentation;
- incident/debugging;
- работа с Jira/Figma/GitHub/internal docs.

Затем зафиксировать **ограничения**:

- какие категории кода и данных можно отправлять provider;
- нужен ли data residency или zero-retention режим;
- разрешен ли cloud execution;
- какие tools могут иметь write access;
- можно ли использовать external MCP servers;
- какие actions требуют approval;
- нужны ли SSO, RBAC, admin policy и audit logs.

После этого проводится pilot на реальных задачах. Полезные метрики:

- time-to-verified-result;
- test/task success;
- reviewer findings;
- доля изменений, которые пришлось переписать;
- latency;
- inference/seat cost;
- support burden;
- количество security exceptions.

Для большой команды обычно полезнее **маленький стандартный набор**, чем десять инструментов без правил. Например: один
approved AI IDE для inline работы, один coding agent для delegated tasks и несколько centrally reviewed MCP
integrations.

Нужны также operating rules:

- инструкция по секретам и sensitive data;
- baseline sandbox/approval settings;
- обязательный human review;
- ограничения на production access;
- repository instructions/skills;
- onboarding и примеры хороших workflows;
- процесс обновления tool/model versions;
- способ собирать feedback и regressions.

Vendor lock-in тоже стоит оценивать заранее. Если все team knowledge хранится только в proprietary rules одного IDE,
миграция становится дорогой. Stable knowledge лучше держать в repository docs, tests, standard instruction files и
portable scripts, где это возможно.

На интервью сильный ответ: **выбор AI tool - это controlled rollout с use-case eval, security review и operating model,
а не закупка самого популярного assistant**.





#### Вопрос: Какие риски есть у AI IDE и coding agents?

**Короткий ответ**

Главные риски: утечка кода/секретов, prompt injection из недоверенного контента, слишком широкие tool permissions,
разрушительные команды, незаметные ошибки в больших diff, supply-chain изменения, vendor lock-in, рост стоимости и
деградация инженерных навыков.

**Полный ответ**

Coding agent увеличивает productivity, потому что может не только советовать, но и действовать. По той же причине ошибка
модели получает больший blast radius.

Риски удобно разделить на несколько групп.

**Data risk**

Agent может отправить provider содержимое файлов, logs, stack traces или данные из подключенного MCP. Если в context
попали secrets, PII или private customer data, проблема уже произошла независимо от качества кода.

**Prompt injection**

README, issue, web page, dependency metadata или другой недоверенный текст может содержать инструкцию, которую agent
ошибочно примет за команду. Риск становится выше, если у него одновременно есть credentials и write/network tools.

**Excessive permissions**

Tool вроде unrestricted shell, broad filesystem или production API превращает ошибочное reasoning в реальный side
effect. Least privilege и approval points здесь важнее формулировки prompt.

**Code quality risk**

Большой правдоподобный diff может:

- нарушить архитектурную границу;
- добавить race condition;
- скрыть breaking change;
- создать тесты, которые подтверждают ту же ошибочную гипотезу;
- дублировать уже существующий abstraction;
- оставить неиспользуемый workaround.

**Supply-chain risk**

Agent может предложить новую npm/pip dependency, выполнить install script или изменить lockfile. Dependency change нужно
review так же внимательно, как ручное.

**Operational risk**

Длинные agent loops могут неожиданно тратить tokens, CI minutes и API quota, а retries скрывать низкое качество базовой
модели.

**Organizational risk**

Если разработчик перестает самостоятельно читать код и строить mental model, краткосрочная скорость превращается в
зависимость от AI и слабый debugging/review skill.

Defense in depth включает:

- classification и minimization данных;
- sandbox;
- narrow tools/credentials;
- approvals для risky actions;
- network policy;
- secret scanning;
- dependency review;
- маленькие diffs;
- independent tests;
- human review;
- audit/telemetry;
- обучение команды.

На интервью важно связать autonomy и risk: **чем больше agent может делать сам, тем больше deterministic controls должно
окружать модель**.





#### Вопрос: Можно ли добавить AI-review для Pull Request или Merge Request?

**Короткий ответ**

Да. AI-review хорошо работает как дополнительный advisory layer: ищет подозрительные места, missing tests, security/edge
cases и нарушение repository rules. Но AI-comment не должен заменять required CI или human approval для рискованных
изменений.

**Полный ответ**

AI-review можно встроить в PR/MR lifecycle на разных этапах.

**До открытия PR**

Разработчик просит local agent проверить uncommitted diff. Это самый быстрый feedback loop и не создает шум для команды.

**По запросу в PR**

Reviewer или автор вручную вызывает AI-review только для сложных изменений. Такой режим хорошо подходит на старте
pilot-а.

**Автоматически**

Bot запускается для каждого PR или для выбранных paths/labels/risk levels. Здесь особенно важна фильтрация low-signal
comments, иначе команда быстро перестает читать review.

На GitHub есть готовые варианты. GitHub Copilot code review может быть запрошен как reviewer и поддерживает automatic
reviews. В актуальной документации GitHub его review остается типом `Comment`, а не `Approve` или `Request changes`,
поэтому он не заменяет required human approvals. OpenAI Codex также поддерживает automatic code review для GitHub
repositories.

Можно построить и собственный review service:

1. Получить PR diff и metadata.
2. Добавить issue/acceptance criteria и repository instructions.
3. Исключить generated/vendor files.
4. Разбить слишком большой diff на логические chunks.
5. Попросить модель вернуть structured findings: file, line, severity, reason, verification.
6. Дедуплицировать и отфильтровать low-confidence замечания.
7. Опубликовать только actionable comments.

AI особенно полезен для широкого первого прохода:

- забытые error states;
- подозрительное расширение permissions;
- missing tests;
- inconsistent null/error handling;
- accidental public API change;
- duplication;
- потенциальные injection points;
- несоответствие task description и diff.

Но есть пределы. Модель может давать false positives, не знать production invariant или неправильно понимать
бизнес-правило. Поэтому high-severity finding нужно воспроизвести или подтвердить человеком/tooling.

Хорошая метрика AI-review - не количество comments, а **precision и найденные реальные defects до merge**. Если bot
оставляет 30 замечаний и полезно одно, он ухудшает review process.

На интервью сильная позиция: **AI-review - это дополнительный reviewer с высокой шириной поиска, но ограниченной
authority; deterministic checks и accountable human остаются частью merge gate**.

См. [GitHub Copilot code review](https://docs.github.com/en/copilot/concepts/agents/code-review) и
[Using Codex with your ChatGPT plan](https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan).





#### Вопрос: Как безопасно настроить AI-review в GitHub или GitLab?

**Короткий ответ**

Давайте reviewer минимальные read-permissions, считайте PR title/body/diff недоверенным input, не передавайте secrets
модели, не исполняйте код PR в privileged workflow, публикуйте comments отдельным узким credential и оставляйте merge
decision за CI и людьми.

**Полный ответ**

AI-review pipeline нужно проектировать как security-sensitive integration: он обрабатывает текст и код, полностью
контролируемые автором PR, и при этом часто имеет доступ к repository API.

Безопасный flow можно разделить на этапы.

**1. Trigger без лишних привилегий**

Для обычного анализа кода предпочтителен `pull_request` с минимальным `GITHUB_TOKEN`. Fork PR по умолчанию получает
ограниченные permissions и не получает обычные repository secrets.

`pull_request_target` нельзя использовать как простой способ «получить secrets и потом checkout PR». Этот event работает
в trusted context base repository. Если privileged workflow затем checkout/execute недоверенный head code, атакующий
может попытаться украсть secrets или write token. GitHub отдельно предупреждает не использовать `pull_request_target`
для build/run недоверенного PR-кода.

Если нужен privileged второй этап, лучше разделять trust boundaries: untrusted job формирует inert artifact/result без
secrets, а отдельный trusted процесс валидирует данные и публикует comment, не выполняя код из PR.

**2. Least privilege**

Reviewer обычно не должен иметь `contents: write`, deployment, package publish или repository admin permissions. Для
чтения diff достаточно read access; право писать review comments должно быть отделено от прав менять код.

**3. PR content = untrusted data**

Недоверенными являются не только исходники, но и:

- PR title/body;
- branch name;
- commit messages;
- comments;
- filenames;
- README/docs внутри diff;
- test fixtures и generated logs.

Их нельзя напрямую интерполировать в shell scripts. Для модели этот контент также нужно маркировать как data, а не
instructions, чтобы уменьшать prompt injection risk.

**4. Context minimization**

Передавайте только то, что нужно review: diff, релевантные файлы, issue и стабильные repository rules. Исключайте
`.env`, credentials, private keys, production dumps и unrelated secrets.

**5. Structured findings**

Пусть модель возвращает schema вроде:

```json
{
  "file": "src/auth.ts",
  "line": 42,
  "severity": "high",
  "reason": "Authorization check removed",
  "verification": "Run authorization regression tests"
}
```

Host проверяет, что file/line действительно существуют в diff, ограничивает число comments и отклоняет malformed output.

**6. No autonomous merge**

AI-review не должен сам снимать branch protection, approve собственные изменения или выполнять merge только потому, что
не нашел проблем. Absence of findings не является доказательством корректности.

**7. Audit and evaluation**

Логируйте model/version, prompt version, reviewed commit SHA, findings и final disposition. Периодически измеряйте
precision: какие comments подтвердились, какие были noise и какие реальные bugs AI пропустил.

Для GitLab принципы те же: MR diff является untrusted input, job/service получает минимальный token, secrets изолируются
от выполнения недоверенного кода, а публикация discussion notes отделяется от merge authority.

На интервью полезно выделить главный invariant: **код, который контролирует автор PR, не должен исполняться в контексте,
где доступны privileged secrets или write credentials**.

См. [GitHub secure use reference](https://docs.github.com/en/actions/reference/security/secure-use) и
[Events that trigger workflows](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows).
