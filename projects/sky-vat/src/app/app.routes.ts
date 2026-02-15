import { Routes } from '@angular/router';
import { loginGuard } from './core/auth/guards/login-guard';
import { NotFound } from './shared/components/not-found/not-found';
import { authGuard } from './core/auth/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./feature/auth/login/login').then((m) => m.Login),
    canActivate: [loginGuard],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./feature/components/dashboard/dashboard').then((m) => m.Dashboard),
    canActivate: [authGuard],
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./feature/auth/forgate-password/forgate-password').then((m) => m.ForgatePassword),
    canActivate: [loginGuard],
  },
  {
    path: 'change-password',
    loadComponent: () =>
      import('./feature/auth/change-password/change-password').then((m) => m.ChangePassword),
  },
  {
    path: 'not-found',
    component: NotFound,
  },
  // Wildcard route should be the last
  {
    path: '**',
    component: NotFound,
  },
];
