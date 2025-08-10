import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RoutesPaths } from '../../../app/shared/constants/application-routes/app-routes';

export const authReverseGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isUserAuthenticated()) {
    router.navigate([RoutesPaths.BasePath + RoutesPaths.PropertyListing.create]);
    return false
  }
  return true
};
