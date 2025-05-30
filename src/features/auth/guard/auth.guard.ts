import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RoutesPaths } from '../../../app/shared/application-routes/app-routes';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isUserAuthenticated()) return true
  else router.navigate([RoutesPaths.basePath + RoutesPaths.login]);
  return false
};
