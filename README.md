# VatWorkspace

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.3.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

Folder Structure Example:

---
##
/src
├── app
│   ├── core
│   │   ├── interceptors
│   │   │   └── auth.interceptor.ts
│   │   ├── guards
│   │   │   └── auth.guard.ts
│   │   ├── auth.service.ts
│   │   └── user.service.ts
│   ├── shared
│   │   ├── components
│   │   │   └── navbar/
│   │   │   └── sidebar/
│   │   ├── directives
│   │   │   └── debounce.directive.ts
│   │   ├── pipes
│   │   │   └── currency-format.pipe.ts
│   │   └── shared.module.ts
│   ├── features
│   │   ├── admin
│   │   │   ├── components
│   │   │   │   └── admin-dashboard.component.ts
│   │   │   ├── services
│   │   │   │   └── admin.service.ts
│   │   │   ├── admin.module.ts
│   │   │   └── admin-routing.module.ts
│   │   ├── user
│   │   │   ├── components
│   │   │   │   └── user-profile.component.ts
│   │   │   │   └── user-settings.component.ts
│   │   │   ├── services
│   │   │   │   └── user.service.ts
│   │   │   ├── user.module.ts
│   │   │   └── user-routing.module.ts
│   │   ├── products
│   │   │   ├── components
│   │   │   │   └── product-list.component.ts
│   │   │   │   └── product-details.component.ts
│   │   │   ├── services
│   │   │   │   └── product.service.ts
│   │   │   ├── products.module.ts
│   │   │   └── products-routing.module.ts
│   │   └── state
│   │       ├── reducers
│   │       │   └── auth.reducer.ts
│   │       │   └── user.reducer.ts
│   │       └── actions
│   │           └── auth.actions.ts
│   │           └── user.actions.ts
│   ├── app.component.ts
│   ├── app.module.ts
│   └── app-routing.module.ts
├── public
├── environments
├── styles
├── main.ts
└── index.html
###
---