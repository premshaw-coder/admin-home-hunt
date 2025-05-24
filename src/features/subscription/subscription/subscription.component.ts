import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RoutesPaths } from '../../../app/shared/application-routes/app-routes';
import { SubscriptionStatusService } from '../../property-listing/services/subscription-status.service';
import { AuthService } from '../../auth/services/auth.service';
import { AuthApiResponse } from '../../auth/interfaces/auth/auth-login.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { tap } from 'rxjs/internal/operators/tap';
import { SubscriptionStatus } from '../interface/subscription-status.interface';
declare let Razorpay: any;

@Component({
  selector: 'app-subscription',
  imports: [ButtonModule],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.scss'
})
export class SubscriptionComponent {
  private userInfo: AuthApiResponse = JSON.parse(localStorage.getItem('UserInfo') || '{}')
  private http = inject(HttpClient)
  private router = inject(Router)
  private subscriptionStatusService = inject(SubscriptionStatusService)
  private authService = inject(AuthService)
  private destroyRef = inject(DestroyRef)

  razorPayOptions = {
    "key": "p2MwtaUtgj7eeVc4JNK6ZXQm",
    "amount": "",
    "currency": "INR",
    "name": "",
    "description": "Skartz Payment",
    "order_id": "",
    "handler": (res: any) => {
      console.log(res);
      try {
        /* This block of code is handling the process after a successful payment verification using
        Razorpay. Here's a breakdown of what each step is doing: */
        this.http.post('http://localhost:3000/razorpay/verify-payment', res).pipe(
          switchMap(() => this.authService.regenerateJwtToken(this.userInfo.id)),
          tap((tokenResponse) => {
            localStorage.setItem('UserInfo', JSON.stringify(tokenResponse));
            this.subscriptionStatusService.refreshStatus();
          }),
          switchMap(() => this.subscriptionStatusService.getSubscriptionStatus()),
          takeUntilDestroyed(this.destroyRef)
        ).subscribe({
          next: (response: SubscriptionStatus) => {
            console.log('Payment verified and JWT token regenerated:', response);
            this.router.navigate([RoutesPaths.basePath + 'property-listing/rent']);
          },
          error: (error) => {
            console.error('Error verifying payment or regenerating JWT token:', error);
          }
        });
      }
      catch (err) {
        console.error(err)
      }

    }
  }

  buyRazorPay(amount: number) {
    this.http.post('http://localhost:3000/razorpay/order', {
      "amount": amount, "receipt": "sfbbs", "payment_capture": 1, "userId": '682379c04c66f43865326c18'
    }).subscribe((res: any) => {
      console.log(res);
      this.razorPayOptions.key = 'rzp_test_F01quPXBiDbfVY';
      this.razorPayOptions.amount = res['amount'];
      this.razorPayOptions.name = "prem";
      this.razorPayOptions.order_id = res['id']
      // this.razorPayOptions.handler(res)
      const rzp1 = new Razorpay(this.razorPayOptions);
      rzp1.open()
    })
  }
}
