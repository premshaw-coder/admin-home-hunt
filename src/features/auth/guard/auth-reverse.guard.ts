import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RoutesPaths } from '../../../app/shared/application-routes/app-routes';

export const authReverseGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isUserAuthenticated()) {
    router.navigate([RoutesPaths.basePath + RoutesPaths.createPropertyListing]);
    return false
  }
  return true
};
