---
layout: ../../../layouts/Layout.astro
title: RTL in frontend interfaces
description: Вопросы и ответы
category: Frontend
kind: questions
order: 31
---

## RTL in frontend interfaces

### RTL, direction и CSS logical properties

#### Middle

<details>
<summary>Какие frontend-проблемы появляются при RTL?</summary><br>
<table><tr><td>

RTL влияет на direction, порядок inline content, иконки направления, отступы, scroll behavior, charts, drag and drop и
анимации. CSS logical properties (`margin-inline-start`, `inset-inline-end`) уменьшают количество отдельных overrides.

Нельзя просто поменять `text-align`. Нужно проверить keyboard navigation, focus order, truncation, mixed LTR/RTL text,
date/number formatting и screenshots основных экранов.

```css
.toolbar {
  padding-inline-start: 1rem;
  padding-inline-end: 0.5rem;
}
```

</td></tr></table>

</details>
