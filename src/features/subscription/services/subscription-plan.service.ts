import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndPoints } from '../../../app/shared/constants/api-ends-points/admin-home-hunt-api-endpoints';
import { environment } from '../../../environments/environment.development';
import { SubscriptionInfoDetails } from '../interface/subscription-info-details.interface';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionPlanService {

  private readonly http = inject(HttpClient)

  public getSubscriptionPlanByUserCategory(userId: string): Observable<SubscriptionInfoDetails[]> {
    return this.http.get<SubscriptionInfoDetails[]>(environment.baseUrl + ApiEndPoints.Subscription.subscriptionPlanByUserCategory + userId)
  }
}
