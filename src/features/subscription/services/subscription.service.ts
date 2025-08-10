import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndPoints } from '../../../app/shared/constants/api-ends-points/admin-home-hunt-api-endpoints';
import { environment } from '../../../environments/environment.development';
import { SubscriptionStatus } from '../interface/subscription-status.interface';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  private readonly http = inject(HttpClient)

  public subscriptionStatus(userId: string): Observable<SubscriptionStatus> {
    return this.http.get<SubscriptionStatus>(environment.baseUrl + ApiEndPoints.Subscription.status + userId)
  }

  public checkAndExpireSubscribedUser(userId: string, payload: { endDate: string }): Observable<SubscriptionStatus> {
    return this.http.post<SubscriptionStatus>(environment.baseUrl + ApiEndPoints.Subscription.checkAndExpireUser + userId, payload)
  }
}
