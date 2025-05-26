import { DestroyRef, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RoutesPaths } from '../../../app/shared/constants/application-routes/app-routes';
import { SubscriptionStatusService } from '../../property-listing/services/subscription-status.service';
import { map } from 'rxjs/internal/operators/map';
import { SubscriptionStatus } from '../../subscription/interface/subscription-status.interface';
import { SubscriptionService } from '../../subscription/services/subscription.service';
import { SUBSCRIPTION_STATUS } from '../../../app/shared/constants/subscription-status/subscription-status';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const subscriptionsStatusService = inject(SubscriptionStatusService);
  const subscriptionService = inject(SubscriptionService)
  const destroyRef = inject(DestroyRef);

  return subscriptionsStatusService.getSubscriptionStatus().pipe(
    map((userSubscription: SubscriptionStatus) => {
      const startDate = new Date();
      const userSubscriptionStatus = userSubscription?.subscription_status;
      const userSubscriptionEndDate = userSubscription?.subscriptionInfo?.endDate ?? new Date();

      if ((startDate.getTime() > new Date(userSubscriptionEndDate).getTime()) && userSubscriptionStatus === SUBSCRIPTION_STATUS.ACTIVE) {
        const payload = {
          endDate: new Date(userSubscriptionEndDate).toISOString()
        }
        subscriptionService.checkAndExpireSubscribedUser(userSubscription.userId, payload).pipe(takeUntilDestroyed(destroyRef)).subscribe()
        router.navigate([RoutesPaths.BasePath + RoutesPaths.Subscription]);
        return false;
      }
      if (userSubscriptionStatus === SUBSCRIPTION_STATUS.ACTIVE && authService.isUserAuthenticated()) {
        return true;
      }
      if ((userSubscriptionStatus === SUBSCRIPTION_STATUS.INACTIVE || userSubscriptionStatus === SUBSCRIPTION_STATUS.EXPIRED) && authService.isUserAuthenticated()) {
        router.navigate([RoutesPaths.BasePath + RoutesPaths.Subscription]);
        return false;
      }
      else {
        router.navigate([RoutesPaths.BasePath + RoutesPaths.Auth.login]);
        return false;
      }

    })
  );
};
