import { inject, Injectable } from '@angular/core';
import { Observable, Subject, switchMap, shareReplay, startWith, defer } from 'rxjs';
import { SubscriptionService } from '../../subscription/services/subscription.service';
import { SubscriptionStatus } from '../../subscription/interface/subscription-status.interface';
import { AuthApiResponse } from '../../auth/interfaces/auth/auth-login.interface';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionStatusService {
  private readonly subscriptionService = inject(SubscriptionService);
  private readonly refreshTrigger$ = new Subject<void>();

  // Shared observable, invalidated when refreshTrigger$ emits
  private readonly status$: Observable<SubscriptionStatus> = this.refreshTrigger$.pipe(
    // Start with an immediate call (auto-fetch)
    startWith(void 0),
    switchMap(() =>
      defer(() => {
        const userInfo: AuthApiResponse = JSON.parse(localStorage.getItem('UserInfo') ?? '{}');
        return this.subscriptionService.subscriptionStatus(userInfo?.id ?? '');
      })
    ),
    shareReplay(1) // Cache the latest result for all subscribers
  );

  /** Get cached subscription status (auto-refreshed once) */
  getSubscriptionStatus(): Observable<SubscriptionStatus> {
    return this.status$;
  }

  /** Force refresh of subscription status */
  refreshStatus(): void {
    this.refreshTrigger$.next();
  }
}
