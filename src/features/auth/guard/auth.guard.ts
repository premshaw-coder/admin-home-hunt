import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RoutesPaths } from '../../../app/shared/application-routes/app-routes';
import { SubscriptionStatusService } from '../../property-listing/services/subscription-status.service';
import { map } from 'rxjs/internal/operators/map';
import { SubscriptionStatus } from '../../subscription/interface/subscription-status.interface';
import { SubscriptionService } from '../../subscription/services/subscription.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const subscriptionsStatusService = inject(SubscriptionStatusService);
  const subscriptionService = inject(SubscriptionService)
  const startDate = new Date();


  return subscriptionsStatusService.getSubscriptionStatus().pipe(
    map((userSubscription: SubscriptionStatus) => {
      if ((userSubscription?.subscriptionInfo?.startDate && userSubscription?.subscriptionInfo?.endDate) &&
        (startDate.getTime() > new Date(userSubscription.subscriptionInfo.endDate).getTime())) {
        console.log('date expired', startDate.getTime() > new Date(userSubscription.subscriptionInfo.endDate).getTime());
        const payload = {
          endDate: new Date(userSubscription.subscriptionInfo.endDate).toISOString()
        }
        console.log('payload', payload);
        if (userSubscription?.subscription_status === 'active') {
          subscriptionService.checkAndExpireSubscribedUser(userSubscription.userId, payload).subscribe()
        }
        router.navigate([RoutesPaths.basePath + RoutesPaths.subscription]);
        return false;
      }
      if (userSubscription?.subscription_status === 'active' && authService.isUserAuthenticated()) {
        return true;
      }
      if ((userSubscription?.subscription_status === 'inactive' || userSubscription.subscription_status === 'expired') && authService.isUserAuthenticated()) {
        router.navigate([RoutesPaths.basePath + RoutesPaths.subscription]);
        return false;
      }
      else {
        router.navigate([RoutesPaths.basePath + RoutesPaths.login]);
        return false;
      }

    })
  );
};
