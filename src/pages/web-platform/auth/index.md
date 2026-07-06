---
layout: ../../../layouts/Layout.astro
title: Auth, SSO, OAuth 2.0 и OpenID Connect
description: Вопросы и ответы
category: Frontend
kind: questions
order: 65
---

## Auth, SSO, OAuth 2.0 и OpenID Connect

### Auth и SSO

#### Middle+ or Senior

<details>
<summary>Что такое SSO и как оно обычно работает в frontend-приложении?</summary><br>
<table><tr><td>

SSO, или Single Sign-On, — подход, при котором пользователь проходит аутентификацию один раз у доверенного Identity
Provider, а затем получает доступ к нескольким приложениям без отдельного логина в каждом из них.

Важно различать термины:

- **authentication** — проверка, кто пользователь;
- **authorization** — проверка, что пользователю разрешено делать;
- **SSO** — пользовательский сценарий единого входа;
- **OAuth 2.0** — протокол выдачи ограниченного доступа к ресурсам;
- **OpenID Connect** — identity layer поверх OAuth 2.0, который добавляет `id_token` и стандартный способ узнать личность
  пользователя;
- **SAML** — XML-based протокол, который часто встречается в enterprise SSO.

Типичный вариант для современного SPA — Authorization Code Flow with PKCE через OpenID Connect:

1. Пользователь открывает приложение.
2. Приложение понимает, что локальной сессии нет, и перенаправляет пользователя на Identity Provider.
3. В redirect передаются `client_id`, `redirect_uri`, `scope`, `state`, `code_challenge` и другие параметры.
4. Пользователь логинится у Identity Provider, например через пароль, MFA или корпоративную учетную запись.
5. Identity Provider возвращает пользователя обратно в приложение с authorization code.
6. Приложение или backend меняет code на tokens.
7. Frontend получает состояние "пользователь вошел" и вызывает API с учетом выбранной session/token architecture.

Упрощенный пример redirect:

```text
https://idp.example.com/authorize?
  response_type=code&
  client_id=spa-client&
  redirect_uri=https://app.example.com/callback&
  scope=openid%20profile%20email&
  state=random-state&
  code_challenge=pkce-code-challenge&
  code_challenge_method=S256
```

Что важно сказать на собеседовании:

- frontend не должен хранить `client_secret`, потому что SPA является public client;
- `state` защищает от подмены/CSRF в login flow;
- PKCE снижает риск перехвата authorization code;
- `id_token` описывает аутентификацию пользователя, а `access_token` предназначен для доступа к API;
- route guards на frontend улучшают UX, но настоящая authorization проверяется на backend;
- tokens нельзя бездумно класть в `localStorage`: при XSS их сможет прочитать вредоносный script;
- в enterprise чаще встречаются интеграции через OIDC или SAML, а конкретные детали зависят от Identity Provider.

Практическая граница ответственности frontend-разработчика: правильно инициировать login/logout flow, обработать callback,
не хранить секреты в bundle, аккуратно работать с tokens/session state, закрывать routes для UX и понимать, что backend
обязан повторно проверять authentication, authorization, audience, issuer, expiry и scopes.

</td></tr></table>

</details>
