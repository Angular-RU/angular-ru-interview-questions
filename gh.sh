#!/usr/bin/env bash

set -euo pipefail

export LC_ALL=C

TARGET="${1:-xiaoluoboding}"
DELAY="${DELAY:-2}"
YES="${YES:-0}"
API_VERSION="${GITHUB_API_VERSION:-2026-03-10}"

command -v gh >/dev/null 2>&1 || {
    echo "Ошибка: GitHub CLI не установлен."
    exit 1
}

gh auth status -h github.com >/dev/null 2>&1 || {
    echo "Ошибка: сначала авторизуйся через gh auth login."
    exit 1
}

gh_api() {
    gh api \
        -H "Accept: application/vnd.github+json" \
        -H "X-GitHub-Api-Version: ${API_VERSION}" \
        "$@"
}

CURRENT_USER="$(gh_api user --jq '.login')"

FOLLOWERS_FILE="$(mktemp)"
FOLLOWING_FILE="$(mktemp)"
TODO_FILE="$(mktemp)"

cleanup() {
    rm -f "$FOLLOWERS_FILE" "$FOLLOWING_FILE" "$TODO_FILE"
}

trap cleanup EXIT

echo "Активный аккаунт: @${CURRENT_USER}"
echo "Получаю фолловеров @${TARGET}..."

gh_api \
    --paginate \
    "users/${TARGET}/followers?per_page=100" \
    --jq '.[].login' |
    sort -u >"$FOLLOWERS_FILE"

echo "Получаю текущие подписки @${CURRENT_USER}..."

gh_api \
    --paginate \
    'user/following?per_page=100' \
    --jq '.[].login' |
    sort -u >"$FOLLOWING_FILE"

# Оставляем только тех пользователей, на которых еще нет подписки.
# Дополнительно исключаем собственный аккаунт.
comm -23 "$FOLLOWERS_FILE" "$FOLLOWING_FILE" |
    awk -v current_user="$CURRENT_USER" '$0 != current_user' \
        >"$TODO_FILE"

TOTAL="$(wc -l <"$TODO_FILE" | tr -d '[:space:]')"

if [[ "$TOTAL" -eq 0 ]]; then
    echo "Новых пользователей для подписки нет."
    exit 0
fi

echo
echo "Будет выполнена подписка на ${TOTAL} пользователей."
echo "Пауза между запросами: ${DELAY} сек."

if [[ "$YES" != "1" ]]; then
    read -r -p "Продолжить? [y/N] " ANSWER

    if [[ ! "$ANSWER" =~ ^[Yy]$ ]]; then
        echo "Отменено."
        exit 0
    fi
fi

SUCCESS=0

while IFS= read -r USERNAME; do
    [[ -z "$USERNAME" ]] && continue

    printf 'Подписка на @%s... ' "$USERNAME"

    if gh_api \
        --method PUT \
        "user/following/${USERNAME}" \
        --silent; then
        echo "OK"
        SUCCESS=$((SUCCESS + 1))
    else
        echo "ERROR"
        echo
        echo "Скрипт остановлен после ошибки."
        echo "Успешно обработано: ${SUCCESS} из ${TOTAL}."
        exit 1
    fi

    sleep "$DELAY"
done <"$TODO_FILE"

echo
echo "Готово. Новых подписок: ${SUCCESS}."
