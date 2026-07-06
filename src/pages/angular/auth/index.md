---
layout: ../../../layouts/Layout.astro
title: Angular Auth, login/logout и router guards
description: Вопросы и ответы
category: Frontend
kind: questions
order: 121
---

## Angular Auth, login/logout и router guards

### Login, logout и guards

#### Middle+ or Senior

<details>
<summary>Как в Angular организовать login/logout и router guard для защищенных страниц?</summary><br>
<table><tr><td>

В Angular frontend обычно не "логинит пользователя сам", а вызывает backend или Identity Provider и хранит только
клиентское состояние сессии: кто пользователь, идет ли проверка сессии, можно ли открыть protected route.

Базовая схема:

1. `AuthService` инкапсулирует login, logout, session state и запрос текущего пользователя.
2. `HttpClient` отправляет запросы на backend auth endpoints.
3. `CanActivateFn` guard не пускает на protected routes, если пользователь не авторизован.
4. При logout frontend очищает локальное состояние и отправляет пользователя на login/public route.
5. Backend все равно обязан проверять session/token и права на каждом защищенном endpoint.

Упрощенный пример `AuthService`:

```ts
import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, map, Observable, of, tap } from "rxjs";

interface LoginDto {
  readonly email: string;
  readonly password: string;
}

interface User {
  readonly id: string;
  readonly email: string;
  readonly roles: readonly string[];
}

@Injectable({ providedIn: "root" })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly userState = signal<User | null>(null);
  readonly user = this.userState.asReadonly();

  readonly isAuthenticated = () => this.userState() !== null;

  login(dto: LoginDto): Observable<User> {
    return this.http
      .post<User>("/api/auth/login", dto)
      .pipe(tap((user) => this.userState.set(user)));
  }

  loadCurrentUser(): Observable<User | null> {
    return this.http.get<User>("/api/auth/me").pipe(
      tap((user) => this.userState.set(user)),
      catchError(() => {
        this.userState.set(null);
        return of(null);
      }),
    );
  }

  logout(): void {
    this.http
      .post("/api/auth/logout", {})
      .pipe(catchError(() => of(null)))
      .subscribe(() => {
        this.userState.set(null);
        void this.router.navigate(["/login"]);
      });
  }
}
```

Пример login component:

```ts
import { Component, inject, signal } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "./auth.service";

@Component({
  selector: "app-login-page",
  template: `
    <form (ngSubmit)="submit()">
      <input name="email" type="email" autocomplete="email" />
      <input name="password" type="password" autocomplete="current-password" />
      <button type="submit" [disabled]="isLoading()">Login</button>
    </form>
  `,
})
export class LoginPageComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly isLoading = signal(false);

  submit(): void {
    this.isLoading.set(true);

    this.auth
      .login({ email: "demo@example.com", password: "password" })
      .subscribe({
        next: () => {
          const returnUrl =
            this.route.snapshot.queryParamMap.get("returnUrl") ?? "/";
          void this.router.navigateByUrl(returnUrl);
        },
        error: () => this.isLoading.set(false),
      });
  }
}
```

Пример functional guard:

```ts
import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { map } from "rxjs";
import { AuthService } from "./auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthenticated()) {
    return true;
  }

  return auth.loadCurrentUser().pipe(
    map((user) => {
      if (user) {
        return true;
      }

      return router.createUrlTree(["/login"], {
        queryParams: { returnUrl: state.url },
      });
    }),
  );
};
```

Пример routes:

```ts
import { Routes } from "@angular/router";
import { authGuard } from "./auth.guard";

export const routes: Routes = [
  {
    path: "login",
    loadComponent: () =>
      import("./login-page.component").then((m) => m.LoginPageComponent),
  },
  {
    path: "account",
    canActivate: [authGuard],
    loadComponent: () =>
      import("./account-page.component").then((m) => m.AccountPageComponent),
  },
];
```

Кнопка logout:

```ts
import { Component, inject } from "@angular/core";
import { AuthService } from "./auth.service";

@Component({
  selector: "app-header",
  template: `<button type="button" (click)="logout()">Logout</button>`,
})
export class HeaderComponent {
  private readonly auth = inject(AuthService);

  logout(): void {
    this.auth.logout();
  }
}
```

Что важно сказать на собеседовании:

- guard защищает route только на frontend и нужен в первую очередь для UX;
- backend должен проверять сессию/token на каждом защищенном API-запросе;
- при logout нужно очистить frontend state и попросить backend инвалидировать session/refresh token;
- если используется cookie-based session, logout обычно очищает `HttpOnly` cookie через `Set-Cookie` с истекшим сроком;
- если используется OIDC/SSO, logout может требовать redirect на Identity Provider logout endpoint;
- после logout нельзя оставлять приватные данные в singleton services, caches, stores и component state;
- `returnUrl` нужно валидировать, чтобы не сделать open redirect на внешний domain.

Для production лучше не писать весь auth-flow руками, если команда использует OIDC/SSO provider. Обычно берут проверенную
OIDC-библиотеку или backend-for-frontend подход, а Angular-код оставляют тонким слоем над login/logout/session state.

</td></tr></table>

</details>
