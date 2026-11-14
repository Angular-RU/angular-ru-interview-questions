#!/usr/bin/env bash
set -euo pipefail

out="dist/skill-archives"
mkdir -p "$out"
rm -f "$out"/*.zip

shopt -s nullglob
skill_dirs=(skills/*/)
if (( ${#skill_dirs[@]} == 0 )); then
    echo "No generated skill directories found." >&2
    exit 1
fi

for skill_dir in "${skill_dirs[@]}"; do
    slug="${skill_dir#skills/}"
    slug="${slug%/}"

    if [[ ! -f "skills/$slug/SKILL.md" ]]; then
        echo "Missing generated SKILL.md for $slug" >&2
        exit 1
    fi

    (cd skills && zip -q -r -X "../$out/$slug.zip" "$slug")
    unzip -tq "$out/$slug.zip" >/dev/null
done

(cd skills && zip -q -r -X "../$out/all.zip" */)
unzip -tq "$out/all.zip" >/dev/null
echo "Packaged ${#skill_dirs[@]} skills and the full bundle."
