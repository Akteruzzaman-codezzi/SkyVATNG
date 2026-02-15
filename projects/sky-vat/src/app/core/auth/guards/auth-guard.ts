import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../../service/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  if (auth.isAuthenticated()) return true;
  // optional: keep return url for after login
  return router.createUrlTree(['/'], {
    queryParams: { returnUrl: state.url },
  });
};
