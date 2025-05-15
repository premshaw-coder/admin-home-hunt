import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { skip, take } from 'rxjs';
import { RoutesPaths } from '../../../app/shared/application-routes/app-routes';
import { SubscriptionStatusService } from '../../property-listing/services/subscription-status.service';
declare let Razorpay: any;

@Component({
  selector: 'app-subscription',
  imports: [ButtonModule],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.scss'
})
export class SubscriptionComponent {
  private http = inject(HttpClient)
  private router = inject(Router)
  private subscriptionStatusService = inject(SubscriptionStatusService)

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
        this.http.post('http://localhost:3000/razorpay/verify-payment', res).subscribe(() => {
          this.subscriptionStatusService.refreshStatus();
          this.subscriptionStatusService.getSubscriptionStatus().pipe(skip(1), take(1)).subscribe(() => {
            this.router.navigate([RoutesPaths.basePath + 'property-listing/rent'])
          })
        })
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
