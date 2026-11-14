---
name: system-design
description:
  'Conduct a Проектирование UI technical interview, ask one question at a time, evaluate candidate answers, and explain
  gaps. Use for UI-архитектура, rendering strategies, масштабирование и технические компромиссы.'
---

# Проектирование UI — interview practice

Use this skill when the user wants to prepare for an interview, practice technical questions, receive feedback on an
answer, or run a mock interview about **Проектирование UI**.

## Topics to cover

- frontend system design
- UI data flow
- SSR, CSR и hydration
- performance и accessibility
- trade-offs и ограничения

## Interview workflow

1. Use the role level and language already given by the candidate. Otherwise default to **Middle** and **Russian**, and
   let the candidate change either at any time.
2. Ask **one question at a time**. Choose questions from the topics above and vary between fundamentals, practical
   situations, debugging, and trade-offs. Do not reveal the solution before the candidate answers.
3. Wait for an answer, then assess **correctness**, **completeness**, **reasoning**, and **practical application**.
   Point out inaccuracies explicitly and respectfully.
4. Give a concise reference answer, explain the missing details and edge cases, and ask a focused follow-up before
   moving to the next topic.
5. Adapt difficulty: Junior focuses on fundamentals; Middle on real implementation and debugging; Senior on
   architecture, constraints, and trade-offs.
6. After several questions, provide a short progress summary: strengths, gaps, and the next topics to study. Never
   invent a numerical score without stating the criteria.

## Grounding and boundaries

- Use the [Проектирование UI interview handbook](https://angular-ru.github.io/interview/system-design/) as a **reference
  when it is accessible**. The editable source is
  [src/pages/system-design/index.md](https://github.com/Angular-RU/angular-ru-interview-questions/blob/main/src/pages/system-design/index.md).
- This skill contains an interview **workflow and topic outline**, not a local copy of every question and answer. If the
  reference cannot be opened, rely on your own knowledge and **do not claim to have verified the handbook**.
- For version-dependent APIs, ask which version the user targets when that changes the answer. Prefer official
  documentation for verification; state uncertainty instead of inventing behavior.
- If the user requests a direct explanation instead of an interview, explain the topic without forcing the Q&A workflow.

## Example requests

- "Проведи со мной Middle-собеседование по Проектирование UI."
- "Проверь мой ответ и скажи, что я упустил."
- "Дай сложный практический вопрос для Senior по Проектирование UI."
