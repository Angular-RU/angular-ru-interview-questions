---
layout: ../../layouts/Layout.astro
title: Проектирование UI
description: Проектирование frontend-интерфейсов, UX-архитектура, rendering modes и trade-offs
category: Frontend
kind: questions
order: 890
---

## Проектирование UI

### Задачи проектирования UI

<details>
<summary>Какие system design вопросы могут задать senior frontend-разработчику?</summary><br>
<table><tr><td>

Чаще спрашивают не backend-детали, а границы frontend-архитектуры:

- как загрузить и показать таблицу на миллионы строк;
- где делать фильтрацию, сортировку и агрегацию;
- как кешировать API responses и инвалидировать stale data;
- как пережить частичную недоступность API;
- как проектировать retry, timeout, optimistic update и rollback;
- как разложить фичу между frontend app, CDN, BFF/API и backend jobs;
- как наблюдать ошибки, latency и деградацию UX после release.

Хороший ответ явно разделяет client, network, CDN, API и storage, называет trade-offs и предлагает graceful degradation.

</td></tr></table>

</details>

<details>
<summary>Как спроектировать modal/dialog на уровне системы?</summary><br>
<table><tr><td>

Dialog - не только overlay. Нужны focus trap, restore focus, Escape, click outside policy, scroll lock, aria attributes,
stacking, portal/root strategy, animation with reduced motion и cleanup. Для design system важно определить API:
controlled/uncontrolled open state, sizes, destructive actions, async submit, nested dialogs policy.

В Angular это часто решают CDK Overlay/Dialog или UI-kit. Самописный dialog оправдан только если команда готова
поддерживать accessibility contract и edge cases.

```html
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
>
  <h2 id="dialog-title">Удалить проект?</h2>
  <button type="button">Отмена</button>
  <button type="button">Удалить</button>
</div>
```

</td></tr></table>

</details>

<details>
<summary>Как спроектировать infinite scroll?</summary><br>
<table><tr><td>

Нужно описать API pagination contract, loading states, error retry, deduplication, scroll position, accessibility и
observability. На клиенте часто используют `IntersectionObserver` для sentinel-элемента, но API должен поддерживать
cursor pagination, иначе при изменении данных возможны пропуски и дубли.

```ts
const observer = new IntersectionObserver(([entry]) => {
  if (entry?.isIntersecting) {
    loadNextPage();
  }
});

observer.observe(sentinelElement);
```

Важные trade-offs:

- infinite scroll удобен для ленты, но хуже для поиска конкретной позиции;
- нужна возможность восстановить позицию при возврате назад;
- для больших списков может понадобиться virtualization;
- keyboard и screen reader users должны иметь понятную навигацию;
- analytics должны различать load more, error и abandon.

</td></tr></table>

</details>

<details>
<summary>Как выбрать CSR, SSR, SSG или ISR для frontend-продукта?</summary><br>
<table><tr><td>

CSR проще для authenticated dashboards и internal tools, где SEO почти не важен. SSR помогает first paint, SEO и preview
metadata, но добавляет server runtime, cache invalidation и hydration complexity. SSG хорош для стабильного content,
ISR - для контента, который должен обновляться без полного rebuild.

Решение принимают по типу страниц, freshness данных, SEO, personalization, hosting model, Core Web Vitals, стоимости
операций и ownership команды. На интервью важно не продавать один rendering mode как универсальный.

```ts
export const renderingByPageType = {
  dashboard: 'CSR',
  article: 'SSG',
  productPage: 'SSR',
  catalog: 'ISR',
} as const;
```

</td></tr></table>

</details>
