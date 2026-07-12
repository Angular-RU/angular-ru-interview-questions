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

#### Junior+ or Middle

<details>
<summary>Что такое Linux и чем он полезен frontend-разработчику?</summary><br>
<table><tr><td>

Linux — семейство Unix-like operating systems на базе Linux kernel. Для frontend-разработчика он важен потому, что
большая часть CI, Docker images, production servers и cloud-инфраструктуры работает именно в Linux-окружении.

Нужно уверенно ориентироваться в shell, filesystem, permissions, processes, network diagnostics и package managers. Это
помогает запускать проекты локально, читать CI logs, чинить окружение и понимать, почему команда работает в Docker или
на сервере иначе, чем на рабочем ноутбуке.

</td></tr></table>

</details>

<details>
<summary>Что такое Unix-like system?</summary><br>
<table><tr><td>

Unix-like system следует идеям Unix: filesystem как дерево, процессы, текстовые streams, pipes, permissions и набор
маленьких утилит, которые можно комбинировать. Linux, macOS и BSD относятся к Unix-like системам, но используют разные
kernels, системные утилиты и package managers.

</td></tr></table>

</details>

<details>
<summary>Чем shell отличается от terminal?</summary><br>
<table><tr><td>

Terminal — приложение или интерфейс, который показывает текстовый ввод/вывод. Shell — программа, которая интерпретирует
команды: `bash`, `zsh`, `fish`.

Например, в macOS Terminal или iTerm2 может запускать `zsh`, а в Linux terminal emulator может запускать `bash`. Разные
shells поддерживают похожий базовый синтаксис, но отличаются настройками, completion, history и расширениями.

</td></tr></table>

</details>

<details>
<summary>Что такое PATH?</summary><br>
<table><tr><td>

`PATH` — environment variable со списком directories, где shell ищет executable files. Когда выполняется `node`, shell
проходит по `PATH` слева направо и запускает первый найденный executable.

```bash
echo "$PATH"
which node
command -v npm
```

Если команда не находится, нужно проверить установку пакета, путь к executable и конфигурацию shell startup files.

</td></tr></table>

</details>

<details>
<summary>Что такое stdin, stdout и stderr?</summary><br>
<table><tr><td>

У процесса есть стандартные streams:

- `stdin` — входные данные;
- `stdout` — обычный вывод;
- `stderr` — вывод ошибок и diagnostics.

Такой контракт позволяет связывать команды через pipes и отдельно обрабатывать результат и ошибки.

```bash
cat package.json | grep scripts
npm run build > build.log 2> build-error.log
```

</td></tr></table>

</details>

<details>
<summary>Как работают pipes и redirection?</summary><br>
<table><tr><td>

Pipe `|` передает `stdout` одной команды в `stdin` следующей. Redirection записывает или читает stream из файла.

```bash
ps aux | grep node
ls -la > files.txt
npm test >> test.log
```

Это основа Unix-подхода: каждая утилита делает небольшую работу, а shell связывает их в workflow.

</td></tr></table>

</details>

### Filesystem и навигация

#### Junior+ or Middle

<details>
<summary>Что делают команды pwd, ls и cd?</summary><br>
<table><tr><td>

`pwd` показывает current working directory. `ls` выводит содержимое directory. `cd` меняет current directory.

```bash
pwd
ls
ls -la
cd src/pages
cd ..
cd -
```

`ls -la` часто используют, чтобы увидеть hidden files, permissions, owner, group, size и дату изменения.

</td></tr></table>

</details>

<details>
<summary>Что делают mkdir, touch, cp, mv и rm?</summary><br>
<table><tr><td>

Базовые команды для работы с файлами и directories:

- `mkdir` создает directory;
- `touch` создает пустой файл или обновляет timestamp;
- `cp` копирует файл или directory;
- `mv` перемещает или переименовывает;
- `rm` удаляет файл.

```bash
mkdir -p src/pages/linux
touch notes.md
cp source.txt copy.txt
mv old-name.txt new-name.txt
rm unused.txt
```

`rm -r` удаляет directory рекурсивно. Команду нужно использовать внимательно, потому что обычный `rm` не отправляет файл
в корзину.

</td></tr></table>

</details>

<details>
<summary>Что делают cat, less, head и tail?</summary><br>
<table><tr><td>

Эти команды читают файлы:

- `cat` печатает файл целиком;
- `less` открывает файл постранично;
- `head` показывает начало;
- `tail` показывает конец.

```bash
cat package.json
less README.md
head -20 src/pages/index.astro
tail -f server.log
```

`tail -f` полезен для live logs: он продолжает показывать новые строки, которые дописываются в файл.

</td></tr></table>

</details>

<details>
<summary>Что делают find, grep и ripgrep?</summary><br>
<table><tr><td>

`find` ищет файлы по имени, типу, времени изменения и другим признакам. `grep` ищет текст по содержимому. `rg` или
ripgrep — быстрый современный аналог `grep`, который по умолчанию уважает `.gitignore`.

```bash
find src -name "index.md"
grep -R "Docker" src/pages
rg "kind: questions" src
```

Для больших frontend-репозиториев `rg` обычно удобнее и быстрее, чем рекурсивный `grep`.

</td></tr></table>

</details>

<details>
<summary>Что такое absolute и relative path?</summary><br>
<table><tr><td>

Absolute path начинается от root directory, например `/Users/name/project` или `/var/log/nginx/access.log`. Relative
path считается от current working directory, например `src/pages` или `../README.md`.

В scripts и CI лучше явно понимать, откуда выполняется команда. Ошибки с relative paths часто появляются, когда локально
команду запускают из одной directory, а в CI из другой.

</td></tr></table>

</details>

<details>
<summary>Что означают символы ., .. и ~?</summary><br>
<table><tr><td>

`.` означает current directory. `..` означает parent directory. `~` обычно раскрывается в home directory текущего
пользователя.

```bash
ls .
cd ..
cd ~
```

В shell scripts важно помнить, что `~` раскрывается shell, а не любой программой. В quoted strings и config files это
может работать иначе.

</td></tr></table>

</details>

### Permissions и пользователи

#### Middle

<details>
<summary>Как устроены Linux permissions?</summary><br>
<table><tr><td>

У файла есть owner, group и permissions для трех наборов пользователей: owner, group, others. Базовые права:

- `r` — read;
- `w` — write;
- `x` — execute или возможность зайти в directory.

В выводе `ls -l` строка `-rwxr-xr--` показывает тип объекта и права. Для directory execute permission означает право
проходить через directory и обращаться к объектам внутри.

</td></tr></table>

</details>

<details>
<summary>Что делают chmod, chown и chgrp?</summary><br>
<table><tr><td>

`chmod` меняет permissions, `chown` меняет owner, `chgrp` меняет group.

```bash
chmod +x ./scripts/build.sh
chmod 644 README.md
chown user:group file.txt
chgrp developers file.txt
```

Для frontend-разработчика самый частый кейс — добавить execute permission script-файлу через `chmod +x`.

</td></tr></table>

</details>

<details>
<summary>Для чего нужен sudo?</summary><br>
<table><tr><td>

`sudo` запускает команду с повышенными правами, обычно от root. Это нужно для системных операций: установка системных
пакетов, изменение protected directories, управление services.

Не стоит использовать `sudo` для исправления проблем с обычными project files или `node_modules`: так легко получить
файлы, которыми владеет root, и сломать локальную разработку.

</td></tr></table>

</details>

### Processes и system information

#### Middle

<details>
<summary>Что делают ps, top, htop и kill?</summary><br>
<table><tr><td>

`ps` показывает processes snapshot. `top` и `htop` показывают процессы в интерактивном режиме. `kill` отправляет signal
процессу.

```bash
ps aux | grep node
top
kill 12345
kill -9 12345
```

Обычный `kill` отправляет `SIGTERM` и дает процессу шанс завершиться корректно. `kill -9` отправляет `SIGKILL`, который
нельзя обработать, поэтому его лучше оставлять для зависших процессов.

</td></tr></table>

</details>

<details>
<summary>Как понять, какой процесс занял port?</summary><br>
<table><tr><td>

На Linux часто используют `ss`, `lsof` или `fuser`. На macOS обычно доступен `lsof`.

```bash
ss -ltnp | grep :3000
lsof -i :3000
```

После этого можно остановить процесс по PID. Важно убедиться, что это действительно ненужный dev server, а не системный
service.

</td></tr></table>

</details>

<details>
<summary>Что показывают df, du и free?</summary><br>
<table><tr><td>

`df` показывает свободное место на mounted filesystems. `du` показывает размер files/directories. `free` показывает
использование памяти на Linux.

```bash
df -h
du -sh node_modules
free -h
```

На macOS команды могут иметь другие опции, а `free` обычно отсутствует.

</td></tr></table>

</details>

<details>
<summary>Что делают uname, whoami и env?</summary><br>
<table><tr><td>

`uname` показывает информацию о системе и kernel. `whoami` показывает текущего пользователя. `env` выводит environment
variables.

```bash
uname -a
whoami
env
```

Эти команды помогают быстро понять, где выполняется script: локально, в Docker, в Linux CI runner или на macOS.

</td></tr></table>

</details>

### Network diagnostics

#### Middle

<details>
<summary>Что делают ping, curl и wget?</summary><br>
<table><tr><td>

`ping` проверяет базовую сетевую доступность через ICMP. `curl` выполняет HTTP и другие network requests. `wget` часто
используют для скачивания файлов.

```bash
ping example.com
curl -I https://example.com
curl http://localhost:3000/health
wget https://example.com/file.tar.gz
```

Для frontend-разработчика `curl` особенно полезен при проверке API, redirects, headers, cookies и local dev servers.

</td></tr></table>

</details>

<details>
<summary>Что делают ssh и scp?</summary><br>
<table><tr><td>

`ssh` подключается к удаленной машине по secure shell. `scp` копирует файлы через SSH.

```bash
ssh user@example.com
scp ./dist/app.tar.gz user@example.com:/tmp/app.tar.gz
```

В современной инфраструктуре прямой доступ на production может быть ограничен, но понимание SSH полезно для debugging,
CI secrets, deploy keys и работы с private Git repositories.

</td></tr></table>

</details>

<details>
<summary>Чем ifconfig отличается от ip?</summary><br>
<table><tr><td>

`ifconfig` — старая команда из net-tools. В современных Linux-дистрибутивах чаще используют `ip` из iproute2.

```bash
ip addr
ip route
```

На macOS `ifconfig` все еще обычный инструмент. Поэтому network commands часто отличаются между Linux и macOS, хотя
общие Unix-принципы похожи.

</td></tr></table>

</details>

### Package managers

#### Middle

<details>
<summary>Какие package managers бывают в Linux?</summary><br>
<table><tr><td>

Package manager зависит от дистрибутива:

- Debian/Ubuntu используют `apt`;
- Fedora/RHEL используют `dnf` или `yum`;
- Arch Linux использует `pacman`;
- openSUSE использует `zypper`;
- Snap и Flatpak распространяют приложения в более изолированном формате.

Frontend-разработчик чаще всего встречает `apt` в Docker images и CI.

</td></tr></table>

</details>

<details>
<summary>Как работать с apt?</summary><br>
<table><tr><td>

`apt` устанавливает, обновляет и удаляет packages в Debian/Ubuntu.

```bash
sudo apt update
sudo apt install git curl
sudo apt upgrade
sudo apt remove package-name
apt search package-name
```

В Dockerfile обычно объединяют `apt-get update` и `apt-get install` в один layer и чистят cache, чтобы image был меньше.

</td></tr></table>

</details>

<details>
<summary>Чем apt отличается от apt-get?</summary><br>
<table><tr><td>

`apt-get` — более стабильный низкоуровневый CLI, который часто используют в scripts и Dockerfile. `apt` — более удобный
интерактивный интерфейс для человека, с progress и более дружелюбным выводом.

Для локальной работы обычно достаточно `apt`. Для automated scripts часто выбирают `apt-get`, потому что его поведение
меньше ориентировано на интерактивность.

</td></tr></table>

</details>

### Linux vs macOS

#### Middle+ or Senior

<details>
<summary>Чем Linux отличается от macOS?</summary><br>
<table><tr><td>

Linux использует Linux kernel и обычно GNU userland. macOS использует Darwin/XNU kernel и BSD userland. Обе системы
Unix-like, поэтому базовые команды похожи, но опции утилит, filesystem behavior, services, package management и security
model могут отличаться.

Практический вывод: shell scripts, которые работают в Linux CI, могут ломаться на macOS из-за разных версий `sed`,
`date`, `xargs`, `find`, `grep` и других utilities.

</td></tr></table>

</details>

<details>
<summary>Почему sed, date и другие команды ведут себя по-разному в Linux и macOS?</summary><br>
<table><tr><td>

В Linux часто установлены GNU coreutils, а в macOS — BSD variants. Они реализуют похожие команды, но не всегда
поддерживают одинаковые flags.

Например, `sed -i` в GNU sed может принимать выражение без backup suffix, а BSD sed на macOS обычно требует явно
передать suffix или пустую строку. Для portable scripts нужно проверять target environment или использовать
кроссплатформенные инструменты вроде Node.js scripts.

</td></tr></table>

</details>

<details>
<summary>Чем отличаются filesystem paths в Linux и macOS?</summary><br>
<table><tr><td>

В Linux часто встречаются paths вроде `/home/user`, `/etc`, `/var/log`, `/usr/bin`. В macOS home directory обычно
находится в `/Users/user`, а приложения часто живут в `/Applications`.

Еще одно отличие — default filesystem behavior. macOS часто использует case-insensitive filesystem, а Linux servers и
Docker images обычно case-sensitive. Поэтому import path с неправильным регистром может работать локально на macOS, но
ломаться в Linux CI.

</td></tr></table>

</details>

<details>
<summary>Чем отличаются launchd и systemd?</summary><br>
<table><tr><td>

`systemd` — распространенная init/service manager система в Linux. `launchd` выполняет похожую роль в macOS.

Для frontend-разработчика это важно, когда нужно понять, почему service запущен автоматически, как читаются logs, где
настроены daemons и почему инструкция для Linux server не применима напрямую к macOS.

</td></tr></table>

</details>

### Homebrew

#### Junior+ or Middle

<details>
<summary>Что такое Homebrew?</summary><br>
<table><tr><td>

Homebrew — package manager, популярный на macOS и доступный на Linux. Он устанавливает CLI tools, libraries и desktop
applications без ручного скачивания архивов и настройки paths.

Для frontend-разработчика Homebrew часто используется для установки `node`, `git`, `pnpm`, `nginx`, `postgresql`,
`watchman`, `jq`, `ripgrep` и других инструментов разработки.

</td></tr></table>

</details>

<details>
<summary>Для чего нужен brew install?</summary><br>
<table><tr><td>

`brew install` устанавливает package или CLI tool из formula.

```bash
brew install git
brew install jq
brew install ripgrep
```

Formula описывает, где взять source или binary bottle, какие dependencies нужны и как установить tool в Homebrew prefix.

</td></tr></table>

</details>

<details>
<summary>Что такое formula, cask и tap в Homebrew?</summary><br>
<table><tr><td>

Formula обычно описывает CLI tool или library. Cask описывает macOS application, font или более крупный binary package.
Tap — дополнительный repository с formulae и casks.

```bash
brew install node
brew install --cask visual-studio-code
brew tap owner/repository
```

Для командной разработки чаще используют formulae, для приложений — casks.

</td></tr></table>

</details>

<details>
<summary>Как обновлять пакеты через Homebrew?</summary><br>
<table><tr><td>

Базовый workflow:

```bash
brew update
brew outdated
brew upgrade
brew cleanup
```

`brew update` обновляет metadata Homebrew. `brew upgrade` обновляет установленные packages. `brew cleanup` удаляет
старые версии и cache, освобождая место.

</td></tr></table>

</details>

<details>
<summary>Как диагностировать проблемы Homebrew?</summary><br>
<table><tr><td>

Полезные команды:

```bash
brew doctor
brew config
brew info node
brew list
```

`brew doctor` проверяет типичные проблемы окружения. `brew info` показывает installed version, dependencies и caveats.
`brew config` полезен, когда нужно понять architecture, prefix и версию Homebrew.

</td></tr></table>

</details>

<details>
<summary>Где Homebrew устанавливает пакеты?</summary><br>
<table><tr><td>

На Apple Silicon macOS Homebrew обычно использует prefix `/opt/homebrew`. На Intel macOS часто используется
`/usr/local`. На Linux обычно используется `/home/linuxbrew/.linuxbrew`.

Из-за этого важен `PATH`: shell должен видеть Homebrew executables раньше или позже системных tools в зависимости от
ожидаемого поведения.

</td></tr></table>

</details>

<details>
<summary>Чем Homebrew отличается от apt?</summary><br>
<table><tr><td>

`apt` — системный package manager Debian/Ubuntu, тесно связанный с OS repositories и system packages. Homebrew —
user-space package manager, который чаще используют для developer tools и macOS applications.

На Linux servers обычно предпочитают системный package manager дистрибутива. На developer machines Homebrew удобен для
получения свежих CLI tools и одинакового setup между macOS и Linux.

</td></tr></table>

</details>

<details>
<summary>Когда не стоит ставить Node.js через Homebrew?</summary><br>
<table><tr><td>

Если проекту нужны разные версии Node.js, удобнее использовать version manager: `nvm`, `fnm`, `volta` или похожий
инструмент. Homebrew ставит system-wide developer tool, а version manager позволяет закреплять версию per project.

Для командной разработки важно сверять `.nvmrc`, `.node-version`, `engines` в `package.json` и настройки CI.

</td></tr></table>

</details>
