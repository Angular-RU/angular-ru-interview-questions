---
layout: ../../../layouts/Layout.astro
title: URL and URLSearchParams
description: Вопросы и ответы
category: Frontend
kind: questions
order: 61
---

## URL and URLSearchParams

### URL encoding и сборка ссылок

#### Middle

<details>
<summary>Какие Unicode-проблемы могут быть в URL?</summary><br>
<table><tr><td>

URL может содержать Unicode в hostname, path и query, но разные части кодируются по-разному. Hostname с не-ASCII
символами преобразуется через IDNA/Punycode, а path и query используют percent-encoding. Визуально похожие символы из
разных алфавитов могут создавать look-alike risks.

Также встречаются разные формы нормализации Unicode, combining marks и emoji. Поэтому validation, search, canonical URL
и сравнение ссылок должны учитывать продуктовый контекст, а не простое побайтовое равенство строк.

</td></tr></table>

</details>

<details>
<summary>Почему нельзя собирать URL простой конкатенацией строк?</summary><br>
<table><tr><td>

Конкатенация легко ломает encoding, `?`, `&`, `#`, пробелы, slash boundaries и значения с управляющими символами query.
Ошибочный URL может отправить неправильный query, сломать cache key, открыть redirect bug или привести к CORS-запросу не
на тот origin.

Для query используйте `URLSearchParams`, а для абсолютных адресов — `URL`:

```ts
const params = new URLSearchParams({
  page: String(page),
  query: searchQuery,
});

const url = new URL('/api/search', location.origin);
url.search = params.toString();

await fetch(url);
```

`URLSearchParams` сам закодирует пробелы, амперсанды, Unicode и другие специальные символы в значениях параметров.

</td></tr></table>

</details>
