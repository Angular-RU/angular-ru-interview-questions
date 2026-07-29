---
layout: ../../layouts/Layout.astro
title: Linux / Unix
description: Linux, Unix shell, популярные команды, права, процессы, сеть, отличия от macOS и Homebrew
category: Основы и инструменты
kind: questions
order: 19
icon: /logos/linux.svg
---

## Linux / Unix

### Unix, Linux и shell basics

<details>
<summary>Что такое Linux и чем он полезен frontend-разработчику?</summary><br>
<table><tr><td>

**Короткий ответ**

Linux — семейство Unix-like operating systems на базе Linux kernel. Для frontend-разработчика он важен потому, что
большая часть CI, Docker images, production servers и cloud-инфраструктуры работает именно в Linux-окружении.

**Полный ответ**

Linux — это kernel и экосистема операционных систем вокруг него. Готовые дистрибутивы, например Ubuntu, Debian или
Fedora, добавляют userland utilities, package manager, init system и набор системных настроек.

Frontend-разработчик обычно не администрирует Linux глубоко, но постоянно сталкивается с ним:

- CI runners выполняют `npm ci`, tests и production build в Linux;
- Docker containers чаще всего основаны на Linux images;
- static files и SSR-приложения запускаются на Linux servers;
- shell scripts, permissions, paths и native dependencies могут вести себя иначе, чем на macOS или Windows.

Например, import `./UserCard` может работать на case-insensitive filesystem macOS, но упасть в Linux CI, если файл
называется `user-card.ts`. Другой частый случай — script работает локально, но не запускается в CI из-за отсутствующего
execute permission.

Практический минимум: понимать filesystem, shell, environment variables, processes, permissions, ports и package
management. Этого достаточно, чтобы диагностировать большую часть проблем окружения, не превращаясь в системного
администратора.

</td></tr></table>

</details>

<details>
<summary>Что такое Unix-like system?</summary><br>
<table><tr><td>

**Короткий ответ**

Unix-like system следует идеям Unix: filesystem как дерево, процессы, текстовые streams, pipes, permissions и набор
маленьких утилит, которые можно комбинировать. Linux, macOS и BSD относятся к Unix-like системам, но используют разные
kernels, системные утилиты и package managers.

**Полный ответ**

Unix-like называют систему, которая повторяет основные модели и пользовательские интерфейсы Unix, даже если не является
оригинальной Unix-системой. Обычно это означает:

- единое дерево filesystem с root directory `/`;
- процессы с PID, environment и стандартными streams;
- модель owner/group/others и permissions;
- shell как основной интерфейс автоматизации;
- композицию маленьких программ через pipes;
- системные вызовы и API, похожие на POSIX.

Linux, macOS и BSD поэтому ощущаются похожими: везде доступны `cd`, `ls`, `grep`, pipes и shell scripts. Но
совместимость не абсолютная. Linux часто использует GNU utilities, macOS — BSD utilities, а kernels, service managers и
package managers у систем разные.

На интервью важно не говорить, что Linux и Unix — одно и то же. Linux является Unix-like системой, но не исходным Unix.
Также Unix-like не гарантирует, что любой shell script без изменений запустится во всех таких системах.

</td></tr></table>

</details>

<details>
<summary>Чем shell отличается от terminal?</summary><br>
<table><tr><td>

**Короткий ответ**

Terminal — приложение или интерфейс, который показывает текстовый ввод/вывод. Shell — программа, которая интерпретирует
команды: bash, zsh, fish.

**Полный ответ**

Terminal предоставляет пользовательский интерфейс: принимает нажатия клавиш, показывает текст и связывает ввод/вывод с
запущенным процессом. Современные Terminal, iTerm2, Windows Terminal и terminal в IDE являются terminal emulators.

Shell — отдельная программа, которая работает внутри terminal. Она:

1. читает командную строку;
2. раскрывает variables, globs и substitutions;
3. обрабатывает pipes и redirections;
4. находит executable через `PATH`;
5. запускает процессы и возвращает их exit code.

Например, одно окно iTerm2 может запускать `zsh`, а другое — `bash`. Terminal останется тем же, но syntax, startup
files, completion и некоторые возможности shell будут отличаться.

Shell может работать и без визуального terminal: CI запускает non-interactive shell для выполнения scripts. Поэтому
команда, которая работает в интерактивной сессии, иногда ломается в CI: там могут не загружаться `.zshrc`, aliases или
локальные environment variables.

</td></tr></table>

</details>

<details>
<summary>Что такое PATH?</summary><br>
<table><tr><td>

**Короткий ответ**

`PATH` — environment variable со списком directories, где shell ищет executable files. Когда выполняется `node`, shell
проходит по `PATH` слева направо и запускает первый найденный executable.

**Полный ответ**

`PATH` содержит directories, разделенные двоеточием в Linux и macOS. Когда пользователь вводит `node`, shell не ищет
команду по всему диску, а последовательно проверяет directories из `PATH` и запускает первое совпадение.

```bash
echo "$PATH"
command -v node
type -a node
```

Порядок имеет значение. Если version manager добавил свою directory перед `/usr/local/bin`, будет запущена его версия
Node.js. Поэтому `node --version` у двух терминалов может отличаться после изменения startup files.

Типичные проблемы:

- package установлен, но его directory отсутствует в `PATH`;
- старая версия executable находится раньше новой;
- IDE и terminal получают разный `PATH`;
- script зависит от alias, которого нет в non-interactive shell.

Добавлять current directory `.` в начало `PATH` небезопасно: команда может случайно запустить executable из
недоверенного проекта. Для локальных scripts лучше использовать явный путь `./script.sh`.

</td></tr></table>

</details>

<details>
<summary>Что такое stdin, stdout и stderr?</summary><br>
<table><tr><td>

**Короткий ответ**

У процесса есть три стандартных потока: `stdin` для ввода, `stdout` для обычного результата и `stderr` для ошибок и
диагностики.

**Полный ответ**

При запуске процесс обычно получает три открытых file descriptors:

- `0` — `stdin`, стандартный ввод;
- `1` — `stdout`, обычный результат;
- `2` — `stderr`, ошибки и диагностические сообщения.

Благодаря общему контракту программа не обязана знать, откуда пришли данные и куда уйдет результат. Ввод может поступать
с клавиатуры, из файла или от другой программы, а вывод — отображаться в terminal, записываться в файл или передаваться
дальше через pipe.

```bash
npm run build > build.log
npm run build 2> build-errors.log
npm run build > build.log 2>&1
```

Разделение `stdout` и `stderr` важно для автоматизации. Например, CLI может печатать JSON в `stdout`, а progress и
warnings — в `stderr`, чтобы другой процесс мог безопасно разобрать результат.

Pipe `|` по умолчанию передает только `stdout`. Если нужно передать и ошибки, redirection задают явно.

</td></tr></table>

</details>

<details>
<summary>Как работают pipes и redirection?</summary><br>
<table><tr><td>

**Короткий ответ**

Pipe `|` передает `stdout` одной команды в `stdin` следующей. Redirection перенаправляет стандартные потоки в файл, из
файла или в другой file descriptor.

**Полный ответ**

Shell создает процессы и связывает их file descriptors до запуска команд. В pipeline команды обычно работают
одновременно: первая пишет данные, а следующая читает их по мере поступления.

```bash
ps aux | grep node
cat package.json | jq '.scripts'
```

Основные redirections:

```bash
command > output.log       # перезаписать stdout
command >> output.log      # дописать stdout
command 2> errors.log      # записать stderr
command > all.log 2>&1     # объединить stdout и stderr
command < input.txt        # передать файл в stdin
```

Не всегда нужен `cat`: вместо `cat file | grep text` можно написать `grep text file`. Но pipeline полезен, когда данные
действительно проходят через несколько независимых преобразований.

В scripts важно учитывать exit codes pipeline. Без настройки shell итоговым обычно считается exit code последней
команды. В Bash `set -o pipefail` позволяет считать pipeline неуспешным, если упала любая его часть.

</td></tr></table>

</details>

### Filesystem и навигация

<details>
<summary>Что делают команды pwd, ls и cd?</summary><br>
<table><tr><td>

**Короткий ответ**

`pwd` показывает current working directory. `ls` выводит содержимое directory. `cd` меняет current directory текущего
shell.

**Полный ответ**

Каждый процесс имеет current working directory. Relative paths вычисляются относительно нее, поэтому перед запуском
script полезно понимать, где именно находится shell.

```bash
pwd
ls
ls -la
cd src/pages
cd ..
cd -
```

`ls -la` показывает hidden files, permissions, owner, group, size и timestamps. `cd -` возвращает в предыдущую
directory, а `cd` без аргументов обычно переходит в home directory.

Важно: `cd` изменяет directory только текущего shell. Отдельная программа не может изменить directory родительского
shell после завершения, поэтому `cd` обычно является built-in командой shell, а не внешним executable.

В scripts надежнее вычислять paths явно, особенно если script могут запускать из разных directories. Частая ошибка —
предполагать, что current working directory всегда совпадает с directory самого script.

</td></tr></table>

</details>

<details>
<summary>Что делают mkdir, touch, cp, mv и rm?</summary><br>
<table><tr><td>

**Короткий ответ**

`mkdir` создает directory, `touch` создает пустой файл или обновляет timestamp, `cp` копирует, `mv` перемещает или
переименовывает, а `rm` удаляет files и directories.

**Полный ответ**

Базовые операции выглядят так:

```bash
mkdir -p src/pages/linux
touch notes.md
cp source.txt copy.txt
cp -R assets assets-backup
mv old-name.txt new-name.txt
rm unused.txt
rm -R generated
```

Полезные детали:

- `mkdir -p` создает всю недостающую цепочку directories;
- `cp -R` нужен для directory;
- `mv` внутри одного filesystem обычно является быстрым rename, а между filesystems может потребовать копирования;
- `rm` удаляет сразу и обычно не использует корзину;
- `rm -R` рекурсивно удаляет directory, поэтому ошибка в path особенно опасна.

В automated scripts стоит использовать защитные проверки и quoted variables:

```bash
test -n "$BUILD_DIR" && rm -rf -- "$BUILD_DIR"
```

`touch` не гарантирует создание parent directory и не является полноценным редактором файла. Его часто используют для
создания marker files или обновления modification time.

</td></tr></table>

</details>

<details>
<summary>Что делают cat, less, head и tail?</summary><br>
<table><tr><td>

**Короткий ответ**

`cat` печатает файл целиком, `less` открывает его постранично, `head` показывает начало, а `tail` — конец файла.

**Полный ответ**

Команду выбирают по размеру файла и задаче:

```bash
cat package.json
less README.md
head -n 20 server.log
tail -n 100 server.log
tail -f server.log
```

`cat` удобен для небольших text files или объединения нескольких файлов. Для большого log он может заполнить terminal
тысячами строк, поэтому лучше использовать `less`.

`less` не загружает весь файл в интерфейс сразу, поддерживает поиск через `/text` и выход по `q`. `head` и `tail`
полезны в scripts, когда нужны только первые или последние строки.

`tail -f` продолжает читать файл по мере добавления строк. Для log rotation иногда удобнее `tail -F`, который пытается
переоткрыть файл после его замены.

Эти utilities рассчитаны прежде всего на text data. Вывод binary file через `cat` может испортить отображение terminal.

</td></tr></table>

</details>

<details>
<summary>Что делают find, grep и ripgrep?</summary><br>
<table><tr><td>

**Короткий ответ**

`find` ищет filesystem objects по имени, типу и metadata. `grep` ищет строки по содержимому. `rg` или ripgrep — быстрый
инструмент поиска по проекту, который по умолчанию учитывает `.gitignore`.

**Полный ответ**

`find` обходит filesystem tree и фильтрует entries:

```bash
find src -type f -name "index.md"
find . -type f -mtime -1
```

`grep` ищет текст в переданных files или input stream:

```bash
grep -R "Docker" src/pages
grep -n "error" server.log
```

`rg` оптимизирован для source repositories:

```bash
rg "kind: questions" src
rg --files | rg "index\.md$"
```

Ripgrep обычно быстрее рекурсивного `grep`, пропускает ignored и hidden files, но это поведение можно изменить flags.
`find` лучше подходит, когда условие связано не с текстом, а с типом, размером, временем или permissions файла.

Для scripts полезны exit codes: `0` означает, что совпадение найдено, `1` — совпадений нет, а больше `1` — ошибка.
Отсутствие совпадений не всегда должно считаться падением бизнес-сценария.

</td></tr></table>

</details>

<details>
<summary>Что такое absolute и relative path?</summary><br>
<table><tr><td>

**Короткий ответ**

Absolute path начинается от root directory, например `/home/user/project`. Relative path вычисляется от current working
directory, например `src/pages` или `../README.md`.

**Полный ответ**

Absolute path однозначно указывает location внутри текущего filesystem namespace:

```text
/home/user/project/package.json
/var/log/nginx/access.log
```

Relative path зависит от current working directory:

```text
src/pages
../README.md
./scripts/build.sh
```

Из-за этого один и тот же relative path может указывать на разные files в зависимости от места запуска команды. Это
частая причина расхождений между local environment, IDE и CI.

Absolute paths удобны внутри конкретной машины, но плохо переносятся между пользователями и runners. В project scripts
обычно лучше строить path от repository root или directory самого script.

Symlinks добавляют еще один нюанс: текстовый path и физический location могут отличаться. `pwd -P` показывает physical
path без symlinks, а обычный `pwd` может сохранять logical path пользователя.

</td></tr></table>

</details>

<details>
<summary>Что означают символы ., .. и ~?</summary><br>
<table><tr><td>

**Короткий ответ**

`.` означает current directory, `..` — parent directory, а `~` обычно раскрывается shell в home directory текущего
пользователя.

**Полный ответ**

Эти обозначения используются при построении paths:

```bash
./scripts/build.sh
cd ..
cd ~/projects
```

`.` и `..` являются directory entries filesystem. `~` — не часть filesystem path сама по себе, а shell expansion. Shell
заменяет ее на значение home directory до запуска команды.

Поэтому поведение зависит от контекста:

```bash
echo ~
echo "~"
```

В первом случае shell раскроет home directory, во втором quoted string останется `~`. Config parser или API также не
обязаны понимать tilde, если они не используют shell expansion.

`.` в начале команды важно еще и потому, что current directory обычно отсутствует в `PATH`: `script.sh` может не
найтись, а `./script.sh` явно указывает нужный executable.

</td></tr></table>

</details>

### Permissions и пользователи

<details>
<summary>Как устроены Linux permissions?</summary><br>
<table><tr><td>

**Короткий ответ**

У filesystem object есть owner, group и permissions для трех категорий: owner, group и others. Базовые права — `r`
(read), `w` (write) и `x` (execute).

**Полный ответ**

Вывод `ls -l` может выглядеть так:

```text
-rwxr-xr-- 1 maxim developers 1200 Jul 28 build.sh
```

Первый символ обозначает тип объекта, следующие девять — права owner, group и others.

Для обычного файла:

- `r` позволяет читать содержимое;
- `w` позволяет изменять содержимое;
- `x` позволяет запускать файл как executable.

Для directory смысл отличается:

- `r` позволяет получить список имен;
- `w` позволяет создавать и удалять entries;
- `x` позволяет проходить через directory и обращаться к объектам внутри.

Права проверяются вместе с owner/group процесса. Новые files получают permissions с учетом `umask`, поэтому requested
mode может быть дополнительно ограничен.

Классические permissions не покрывают все случаи: существуют ACL, capabilities, SELinux и AppArmor. Но для frontend и CI
обычно достаточно уверенно читать `ls -l` и понимать разницу прав файла и directory.

</td></tr></table>

</details>

<details>
<summary>Что делают chmod, chown и chgrp?</summary><br>
<table><tr><td>

**Короткий ответ**

`chmod` меняет permissions, `chown` меняет owner, а `chgrp` меняет group filesystem object.

**Полный ответ**

`chmod` поддерживает symbolic и numeric notation:

```bash
chmod +x ./scripts/build.sh
chmod u=rw,g=r,o= README.md
chmod 644 README.md
chmod 755 ./scripts/build.sh
```

В numeric notation `4` означает read, `2` — write, `1` — execute. Значения складываются отдельно для owner, group и
others.

`chown` и `chgrp` меняют ownership:

```bash
sudo chown maxim:developers file.txt
sudo chgrp developers file.txt
```

Обычный пользователь обычно не может произвольно передать файл другому owner. Recursive flags нужно применять осторожно:
ошибка в target directory может изменить ownership большого участка filesystem.

Для frontend-разработчика частый случай — сохранить executable bit у shell script в Git. Если локально выполнить
`chmod +x script.sh` и закоммитить изменение mode, script сможет запускаться в Linux CI.

</td></tr></table>

</details>

<details>
<summary>Для чего нужен sudo?</summary><br>
<table><tr><td>

**Короткий ответ**

`sudo` запускает разрешенную команду с повышенными правами, обычно от `root`. Он нужен для системных операций, а не для
обычной работы внутри project directory.

**Полный ответ**

`sudo` проверяет policy, а затем запускает конкретную команду от другого пользователя, чаще всего `root`. Это не то же
самое, что постоянно работать в root shell: повышенные права применяются к ограниченной операции и могут
журналироваться.

Типичные случаи:

```bash
sudo apt install nginx
sudo systemctl restart nginx
sudo chown maxim:developers /srv/app
```

Использовать `sudo` нужно по принципу least privilege. Ошибочная команда от root может удалить системные files или
изменить permissions всего проекта.

Не стоит лечить `EACCES` через `sudo npm install`: после этого часть `node_modules` или cache может принадлежать root, и
обычные команды начнут падать. Лучше исправить ownership, настроить version manager или использовать user-space prefix.

На production доступ через `sudo` часто ограничивают списком разрешенных команд, а не предоставляют полный root access.

</td></tr></table>

</details>

### Processes и system information

<details>
<summary>Что делают ps, top, htop и kill?</summary><br>
<table><tr><td>

**Короткий ответ**

`ps` показывает snapshot процессов, `top` и `htop` отображают их в реальном времени, а `kill` отправляет process signal.

**Полный ответ**

`ps` удобен для фильтрации и scripts:

```bash
ps aux
ps aux | grep node
pgrep -af node
```

`top` и `htop` помогают видеть CPU, memory, load и наиболее тяжелые процессы. `htop` обычно удобнее интерактивно, но
может быть не установлен на сервере.

`kill` не обязательно "убивает" процесс: команда отправляет signal по PID.

```bash
kill 12345        # обычно SIGTERM
kill -INT 12345   # аналог прерывания
kill -9 12345     # SIGKILL
```

`SIGTERM` дает приложению возможность закрыть connections и записать данные. `SIGKILL` обрабатывается kernel немедленно,
поэтому cleanup выполнить нельзя. Его используют только когда корректное завершение не работает.

PID может быть переиспользован после завершения процесса, поэтому перед `kill` нужно убедиться, что выбран нужный
process.

</td></tr></table>

</details>

<details>
<summary>Как понять, какой процесс занял port?</summary><br>
<table><tr><td>

**Короткий ответ**

На Linux используют `ss`, `lsof` или `fuser`, а на macOS чаще всего `lsof`. Они показывают listening socket и PID
процесса.

**Полный ответ**

Примеры диагностики:

```bash
ss -ltnp | grep :3000
lsof -nP -iTCP:3000 -sTCP:LISTEN
fuser 3000/tcp
```

Важно отличать listening socket от обычного исходящего connection. Для ошибки `EADDRINUSE` обычно нужен процесс со
статусом `LISTEN`.

Socket привязан не только к port, но и к address. Процесс, слушающий `127.0.0.1:3000`, доступен только локально, а
`0.0.0.0:3000` принимает connections на всех IPv4 interfaces.

После нахождения PID можно проверить команду и owner процесса, затем корректно остановить его через `SIGTERM`. Не
следует автоматически применять `kill -9`: занятый port может принадлежать database, proxy или другому нужному service.

</td></tr></table>

</details>

<details>
<summary>Что показывают df, du и free?</summary><br>
<table><tr><td>

**Короткий ответ**

`df` показывает занятое место на mounted filesystems, `du` считает размер files и directories, а `free` показывает
использование RAM и swap в Linux.

**Полный ответ**

Основные команды:

```bash
df -h
du -sh node_modules
du -h --max-depth=1 .
free -h
```

`df` смотрит на filesystem в целом, а `du` суммирует доступные ему directory entries. Их значения могут различаться,
например когда большой файл уже удален, но процесс продолжает держать его открытым.

`du` может быть медленным на directory с сотнями тысяч files, например `node_modules`. Также результат зависит от
permissions и поддержки sparse files.

В `free` поле `available` обычно полезнее простого `free`: Linux использует незанятую RAM для filesystem cache и может
освободить ее при необходимости. Высокое значение `used` само по себе не означает memory leak.

На macOS `free` обычно отсутствует, поэтому используют Activity Monitor, `vm_stat` или другие system tools.

</td></tr></table>

</details>

<details>
<summary>Что делают uname, whoami и env?</summary><br>
<table><tr><td>

**Короткий ответ**

`uname` показывает информацию о kernel и platform, `whoami` — effective user текущего процесса, а `env` — environment
variables.

**Полный ответ**

```bash
uname -a
uname -m
whoami
env
printenv PATH
```

`uname -m` помогает определить architecture, например `x86_64` или `arm64`. Это важно при установке native binaries и
диагностике несовместимых Docker images.

`whoami` показывает effective user, что полезно при проблемах permissions в CI или container. Процесс может быть запущен
не тем пользователем, которого разработчик ожидает.

`env` выводит environment и умеет запускать команду с временно измененными variables:

```bash
NODE_ENV=production npm run build
env -i PATH="$PATH" npm run test
```

Environment может содержать tokens и passwords, поэтому его нельзя бездумно печатать в public CI logs.

</td></tr></table>

</details>

### Network diagnostics

<details>
<summary>Что делают ping, curl и wget?</summary><br>
<table><tr><td>

**Короткий ответ**

`ping` проверяет ICMP-доступность host, `curl` выполняет network requests и показывает response, а `wget` ориентирован
на скачивание files.

**Полный ответ**

`ping` проверяет, доходят ли ICMP echo packets и какова примерная latency:

```bash
ping example.com
```

Но успешный `ping` не гарантирует работу HTTP, а неуспешный не доказывает недоступность server: ICMP часто блокируют
firewall rules.

`curl` позволяет проверять конкретный protocol и endpoint:

```bash
curl -I https://example.com
curl -v http://localhost:3000/health
curl -H 'Accept: application/json' https://api.example.com/users
```

С его помощью диагностируют DNS, TLS, redirects, headers, cookies, status codes и API payload.

`wget` удобен для downloads, recursive fetching и продолжения прерванной загрузки. Для CI важно проверять integrity
скачанного artifact, а не выполнять неизвестный script напрямую через `curl | sh`.

</td></tr></table>

</details>

<details>
<summary>Что делают ssh и scp?</summary><br>
<table><tr><td>

**Короткий ответ**

`ssh` создает защищенное соединение с удаленной машиной и запускает shell или command. `scp` копирует files через SSH.

**Полный ответ**

Базовое подключение:

```bash
ssh user@example.com
ssh user@example.com 'systemctl status app'
scp ./dist/app.tar.gz user@example.com:/tmp/app.tar.gz
```

SSH обычно использует key pair. Private key остается у клиента, а public key добавляется на server. При первом
подключении клиент проверяет host key и сохраняет его в `known_hosts`, чтобы снизить риск man-in-the-middle attack.

Для автоматизации применяют deploy keys, SSH agent и ограниченные credentials. Private keys нельзя хранить в repository
или печатать в CI logs.

`scp` подходит для простого копирования. Для синхронизации directories часто удобнее `rsync` поверх SSH, потому что он
передает только изменения и поддерживает дополнительные проверки.

Прямой SSH-доступ к production может быть запрещен, но понимание protocol полезно для Git, CI и диагностики servers.

</td></tr></table>

</details>

<details>
<summary>Чем ifconfig отличается от ip?</summary><br>
<table><tr><td>

**Короткий ответ**

`ifconfig` — legacy utility из `net-tools`. В современных Linux-дистрибутивах interfaces, addresses и routes обычно
настраивают через команду `ip` из `iproute2`.

**Полный ответ**

Современные Linux-команды:

```bash
ip addr
ip link
ip route
```

`ip addr` показывает addresses interfaces, `ip link` — состояние network links, `ip route` — routing table. `ifconfig`
покрывает часть этих задач, но развивается значительно меньше и может быть не установлен.

На macOS `ifconfig` остается стандартной командой, а Linux-вариант `ip` обычно отсутствует. Поэтому инструкции нужно
адаптировать под target OS.

Важно разделять уровни диагностики: interface может быть поднят, но route отсутствовать; route может работать, но DNS
быть сломан; DNS может разрешить имя, но application port быть закрыт. Одна команда не проверяет всю цепочку.

</td></tr></table>

</details>

### Package managers

<details>
<summary>Какие package managers бывают в Linux?</summary><br>
<table><tr><td>

**Короткий ответ**

Package manager зависит от дистрибутива: Debian/Ubuntu используют `apt`, Fedora/RHEL — `dnf`, Arch — `pacman`, openSUSE
— `zypper`.

**Полный ответ**

System package manager устанавливает packages из repositories дистрибутива, разрешает dependencies, проверяет signatures
и ведет database установленных files.

Основные семейства:

- Debian/Ubuntu — `apt` и `dpkg`;
- Fedora/RHEL — `dnf` и `rpm`;
- Arch Linux — `pacman`;
- openSUSE — `zypper`;
- Alpine Linux — `apk`.

Snap и Flatpak распространяют applications в более изолированном формате, но не заменяют system packages во всех
сценариях.

System package manager не следует путать с `npm`, `pnpm` или `pip`: первые управляют компонентами OS, вторые —
dependencies конкретной language ecosystem. В Docker image выбор команды зависит от base distribution: инструкция с
`apt` не сработает в `alpine`, где используется `apk`.

</td></tr></table>

</details>

<details>
<summary>Как работать с apt?</summary><br>
<table><tr><td>

**Короткий ответ**

`apt` обновляет package metadata, устанавливает, обновляет и удаляет packages в Debian и Ubuntu.

**Полный ответ**

Базовый workflow:

```bash
sudo apt update
sudo apt install git curl
apt search package-name
apt show package-name
sudo apt remove package-name
sudo apt upgrade
```

`apt update` не обновляет сами packages — он скачивает актуальные indexes repositories. После этого `apt install`
выбирает доступную version и устанавливает dependencies.

Для воспроизводимости важно понимать, что без version pinning одна и та же команда в разное время может установить
разные versions. В production images часто фиксируют base image digest или package version там, где это оправдано.

В Dockerfile обычно используют non-interactive `apt-get`, объединяют update и install в один layer и удаляют package
lists:

```dockerfile
RUN apt-get update \
    && apt-get install -y --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/*
```

Разделение `apt-get update` и install по разным cached layers может привести к устаревшим indexes.

</td></tr></table>

</details>

<details>
<summary>Чем apt отличается от apt-get?</summary><br>
<table><tr><td>

**Короткий ответ**

`apt` — удобный interactive CLI для человека. `apt-get` имеет более стабильный интерфейс и чаще используется в scripts и
Dockerfile.

**Полный ответ**

Обе команды работают поверх той же package management системы Debian. `apt` объединяет часто используемые возможности
`apt-get` и `apt-cache`, показывает progress и предоставляет более дружелюбный output.

`apt-get` исторически ориентирован на автоматизацию. Его output и options меньше зависят от interactive terminal,
поэтому он чаще встречается в CI и Dockerfile:

```bash
apt-get update
apt-get install -y --no-install-recommends curl
```

Это не означает, что `apt` нельзя использовать в script, но сама команда может предупреждать, что ее CLI не считается
стабильным для scripting.

На интервью достаточно объяснить разницу назначения: `apt` удобнее вручную, `apt-get` предсказуемее для automation.

</td></tr></table>

</details>

### Linux vs macOS

<details>
<summary>Чем Linux отличается от macOS?</summary><br>
<table><tr><td>

**Короткий ответ**

Linux использует Linux kernel и обычно GNU userland. macOS построена на Darwin с XNU kernel и BSD userland. Обе системы
Unix-like, но отличаются utilities, filesystem behavior, services, package management и security model.

**Полный ответ**

Сходство дает общий набор concepts: filesystem tree, processes, permissions, shell и POSIX-like APIs. Поэтому
frontend-разработчик может использовать похожие команды на macOS и Linux.

Различия проявляются в деталях:

- Linux distributions используют разные package managers, macOS обычно дополняют Homebrew;
- GNU и BSD utilities поддерживают разные flags;
- Linux services часто управляются `systemd`, macOS — `launchd`;
- Docker containers используют Linux kernel, даже когда Docker Desktop запущен на macOS через virtual machine;
- default filesystem macOS часто case-insensitive, Linux — case-sensitive;
- системные paths и security restrictions отличаются.

Практический вывод: macOS удобна как Unix-like developer environment, но не является точной копией Linux production.
Критичные scripts и builds нужно проверять в том окружении, где они будут выполняться, например в Linux CI container.

</td></tr></table>

</details>

<details>
<summary>Почему sed, date и другие команды ведут себя по-разному в Linux и macOS?</summary><br>
<table><tr><td>

**Короткий ответ**

Linux часто использует GNU utilities, а macOS — BSD variants. Названия команд похожи, но flags, regular expressions и
формат output могут отличаться.

**Полный ответ**

Стандарт описывает не все расширения CLI utilities. GNU и BSD implementations развивались отдельно и добавляли разные
options.

Например:

```bash
# GNU sed
sed -i 's/old/new/g' file.txt

# BSD sed в macOS
sed -i '' 's/old/new/g' file.txt
```

Различаться могут `date`, `find`, `xargs`, `stat`, `grep` и `readlink`. Script, написанный только под локальную macOS,
может упасть в Linux CI, и наоборот.

Варианты решения:

- использовать только переносимое подмножество POSIX;
- явно проверять OS через `uname`;
- устанавливать GNU utilities на macOS;
- заменять сложные shell transformations на Node.js script с tests.

Кроссплатформенность нужно выбирать осознанно: внутренний Linux-only deploy script не обязан поддерживать macOS, но
project bootstrap для всей команды обычно должен.

</td></tr></table>

</details>

<details>
<summary>Чем отличаются filesystem paths в Linux и macOS?</summary><br>
<table><tr><td>

**Короткий ответ**

В Linux home directory обычно находится в `/home/user`, а в macOS — в `/Users/user`. Также отличаются locations
applications, system config и logs.

**Полный ответ**

Типичные Linux paths:

```text
/home/user
/etc
/var/log
/usr/bin
/opt
```

Типичные macOS paths:

```text
/Users/user
/Applications
/Library
/System
/opt/homebrew
```

Hardcoded absolute path почти всегда плохо переносится между машинами. В scripts используют `$HOME`, temporary
directories и project-relative paths.

Существенное отличие — case sensitivity. Default APFS installation macOS часто case-insensitive, поэтому
`import './Button'` может найти `button.ts`. На Linux такой import упадет.

Кроме того, macOS защищает часть system directories через System Integrity Protection. Даже root не должен изменять их
обычным способом. Developer tools лучше устанавливать в поддерживаемые prefixes, а не копировать binaries вручную в
system locations.

</td></tr></table>

</details>

<details>
<summary>Чем отличаются launchd и systemd?</summary><br>
<table><tr><td>

**Короткий ответ**

`systemd` — распространенный service manager и init system в Linux. `launchd` управляет daemons и agents в macOS.

**Полный ответ**

Обе системы запускают background services, следят за lifecycle и могут автоматически стартовать процессы после boot или
login. Но formats и команды у них разные.

В Linux с `systemd` используют:

```bash
systemctl status nginx
sudo systemctl restart nginx
journalctl -u nginx
```

В macOS `launchd` читает property list files и управляется через `launchctl`. Homebrew services также интегрируются с
`launchd`:

```bash
brew services start postgresql
```

Инструкция `systemctl restart ...` не применима к macOS. Для диагностики нужно сначала понять, кто запустил процесс:
service manager, Docker, IDE, login item или обычный shell.

Frontend-разработчик сталкивается с этим при локальных databases, reverse proxies, SSR services и CI runners.

</td></tr></table>

</details>

### Homebrew

<details>
<summary>Что такое Homebrew?</summary><br>
<table><tr><td>

**Короткий ответ**

Homebrew — package manager, популярный на macOS и доступный на Linux. Он устанавливает CLI tools, libraries и desktop
applications без ручного управления archives и paths.

**Полный ответ**

Homebrew скачивает готовые bottles или собирает packages по recipes, размещает versions в собственном prefix и создает
symlinks на активные executables.

Основные области применения:

- CLI tools: `git`, `jq`, `ripgrep`, `nginx`;
- libraries и services: `openssl`, `postgresql`, `redis`;
- macOS applications через casks;
- одинаковый developer setup на нескольких machines.

Homebrew не является частью macOS и не управляет самой операционной системой. Установленные tools могут конфликтовать с
system versions, поэтому важно понимать порядок `PATH`.

Для командной воспроизводимости одного списка устных инструкций недостаточно. Можно использовать `Brewfile`, version
managers и project bootstrap scripts, но обновления все равно нужно тестировать.

</td></tr></table>

</details>

<details>
<summary>Для чего нужен brew install?</summary><br>
<table><tr><td>

**Короткий ответ**

`brew install` устанавливает formula и ее dependencies, используя готовый bottle или локальную сборку.

**Полный ответ**

Примеры:

```bash
brew install git
brew install jq
brew install ripgrep
```

Homebrew находит formula, выбирает совместимый bottle для OS и architecture, скачивает dependencies и устанавливает
package в Cellar. Затем executable связывается с Homebrew prefix.

Если bottle недоступен, package может собираться из source, что дольше и требует build tools. После установки
`brew info` показывает version, dependencies и caveats.

`brew install` без version policy может поставить новую major version после обновления formula. Для project runtime,
например Node.js, часто надежнее version manager, который привязывает version к repository.

</td></tr></table>

</details>

<details>
<summary>Что такое formula, cask и tap в Homebrew?</summary><br>
<table><tr><td>

**Короткий ответ**

Formula описывает CLI tool или library. Cask описывает macOS application, font или binary package. Tap — дополнительный
repository с formulae и casks.

**Полный ответ**

Formula содержит metadata, source или bottle, dependencies и инструкции установки:

```bash
brew install node
```

Cask предназначен для applications и других macOS artifacts:

```bash
brew install --cask visual-studio-code
```

Tap подключает внешний repository:

```bash
brew tap owner/repository
```

После подключения его packages участвуют в обычном поиске и установке. Это удобно для internal tools и packages, которых
нет в Homebrew core.

Tap является источником executable code, поэтому подключать случайный repository небезопасно. В корпоративной среде
важны review, ownership и обновление сторонних taps.

</td></tr></table>

</details>

<details>
<summary>Как обновлять пакеты через Homebrew?</summary><br>
<table><tr><td>

**Короткий ответ**

`brew update` обновляет metadata, `brew outdated` показывает устаревшие packages, `brew upgrade` обновляет их, а
`brew cleanup` удаляет старые versions и cache.

**Полный ответ**

Типичный workflow:

```bash
brew update
brew outdated
brew upgrade
brew cleanup
```

`brew update` обновляет definitions formulae и casks, но не установленные packages. `brew upgrade` устанавливает новые
versions. `brew cleanup` освобождает disk space.

Массовый upgrade может одновременно изменить Node.js, database, compiler и CLI tools. На рабочей машине безопаснее
сначала посмотреть `brew outdated`, обновлять критичные packages отдельно и проверить projects.

Homebrew не заменяет lockfile приложения: package manager OS фиксирует tools окружения, а `package-lock.json` или
`pnpm-lock.yaml` — JavaScript dependencies.

Если package временно нельзя обновлять, существуют versioned formulae и pinning, но долгосрочно лучше устранить
несовместимость, а не бесконечно удерживать старую version.

</td></tr></table>

</details>

<details>
<summary>Как диагностировать проблемы Homebrew?</summary><br>
<table><tr><td>

**Короткий ответ**

Для диагностики используют `brew doctor`, `brew config`, `brew info`, `brew list` и проверку `PATH`.

**Полный ответ**

Полезные команды:

```bash
brew doctor
brew config
brew info node
brew list
brew --prefix
command -v node
```

`brew doctor` ищет типичные конфликты permissions, unsupported files и проблемы configuration. Его warnings нужно
оценивать по контексту: не каждый warning блокирует работу.

`brew config` показывает OS, architecture, developer tools и prefix. Это помогает понять различия Intel и Apple Silicon.
`brew info` показывает active version, dependencies и caveats.

Частая проблема — package установлен, но shell запускает другой executable. Тогда проверяют `command -v`, `type -a` и
порядок `PATH`. Другая проблема — одновременно установлены version manager и Homebrew version одного runtime.

Не стоит исправлять Homebrew через случайный `sudo chown -R` без понимания target: можно повредить permissions system
directories или shared machine.

</td></tr></table>

</details>

<details>
<summary>Где Homebrew устанавливает пакеты?</summary><br>
<table><tr><td>

**Короткий ответ**

На Apple Silicon macOS Homebrew обычно использует `/opt/homebrew`, на Intel macOS — `/usr/local`, а на Linux —
`/home/linuxbrew/.linuxbrew`.

**Полный ответ**

Конкретный prefix лучше узнавать командой:

```bash
brew --prefix
brew --prefix node
```

Packages хранятся versioned directories внутри Cellar, а active executables доступны через symlinks в `bin`. Такая
структура позволяет Homebrew переключать versions и удалять старые packages.

Shell должен добавить Homebrew prefix в `PATH`. Рекомендуемую настройку можно получить через:

```bash
brew shellenv
```

На Apple Silicon и Intel hardcoded path отличается, поэтому bootstrap script не должен без необходимости предполагать
`/usr/local/bin`.

Если system tool и Homebrew tool имеют одинаковое имя, порядок `PATH` определяет, какой executable будет запущен.

</td></tr></table>

</details>

<details>
<summary>Чем Homebrew отличается от apt?</summary><br>
<table><tr><td>

**Короткий ответ**

`apt` — system package manager Debian/Ubuntu, тесно связанный с OS repositories. Homebrew — user-space package manager
для developer tools, libraries и macOS applications.

**Полный ответ**

`apt` управляет частью Linux system: устанавливает packages в стандартные system paths, интегрируется с security updates
и использует repositories дистрибутива. Для его операций обычно нужны root privileges.

Homebrew устанавливается в отдельный prefix и часто работает без `sudo`. Он ориентирован на developer tooling и дает
более свежие versions многих utilities.

На Linux server обычно используют native package manager, потому что он лучше интегрирован с OS lifecycle и security
policy. На developer machine Homebrew удобен для одинакового набора CLI tools на macOS и Linux.

Смешивание managers требует осторожности: две версии `openssl`, `python` или `node` могут одновременно существовать в
разных paths, а фактически используемую определит `PATH`.

</td></tr></table>

</details>

<details>
<summary>Когда не стоит ставить Node.js через Homebrew?</summary><br>
<table><tr><td>

**Короткий ответ**

Если проекты требуют разные версии Node.js, удобнее использовать version manager: `nvm`, `fnm`, `volta` или похожий
инструмент.

**Полный ответ**

Homebrew хорошо подходит, когда на machine нужна одна актуальная version Node.js. Но frontend-разработчик часто
поддерживает несколько repositories с разными требованиями.

Version manager позволяет:

- переключать Node.js per shell или per project;
- читать `.nvmrc` или `.node-version`;
- устанавливать одинаковую version локально и в CI;
- обновлять один project независимо от других.

Нужно сверять несколько источников:

```text
.nvmrc
.node-version
package.json -> engines
CI configuration
Dockerfile
```

Если они расходятся, локальная успешная сборка не гарантирует успех CI. Homebrew можно использовать для установки самого
version manager, но project runtime лучше закреплять рядом с кодом.

Volta дополнительно умеет фиксировать package manager и global CLI tools, а `nvm` и `fnm` чаще управляют прежде всего
Node.js versions. Выбор зависит от workflow команды.

</td></tr></table>

</details>
