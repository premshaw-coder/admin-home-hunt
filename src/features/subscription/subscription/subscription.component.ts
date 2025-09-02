import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RoutesPaths } from '../../../app/shared/constants/application-routes/app-routes';
import { SubscriptionStatusService } from '../../property-listing/services/subscription-status.service';
import { AuthService } from '../../auth/services/auth.service';
import { AuthApiResponse } from '../../auth/interfaces/auth/auth-login.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { tap } from 'rxjs/internal/operators/tap';
import { RazorPayOrderCreation, RazorPayOrderCreationPayload } from '../interface/razorpay-payment-interface';
import { RazorpayPaymentService } from '../services/razorpay-payment.service';
import { SubscriptionStatus } from '../interface/subscription-status.interface';
import { SubscriptionInfoDetails } from '../interface/subscription-info-details.interface';
import { SubscriptionPlanService } from '../services/subscription-plan.service';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let Razorpay: any;

@Component({
  selector: 'app-subscription',
  imports: [ButtonModule],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.scss'
})
export class SubscriptionComponent implements OnInit {
  public loadingStates: Record<number, boolean> = {};
  public subscriptionEndDate = '';
  public subscriptionPlans: Record<string, SubscriptionInfoDetails[]> = {};
  public subscriptionPlansData: SubscriptionInfoDetails[] = [];
  public subscriptionPlanDurations: string[] = [];
  private subscriptionCategories: string[] = [];
  private subscriptionDetails: Partial<SubscriptionInfoDetails> = {};
  private readonly customSubscriptionCategoryOrder = ["free", "basic", "pro", "premium"];
  private readonly customSubscriptionPlanDuration = ["monthly", "quarterly", "half-yearly", "yearly"]

  private readonly userInfo: AuthApiResponse = JSON.parse(localStorage.getItem('UserInfo') ?? '{}')
  private readonly router = inject(Router)
  private readonly subscriptionStatusService = inject(SubscriptionStatusService)
  private readonly authService = inject(AuthService)
  private readonly destroyRef = inject(DestroyRef)
  private readonly razorpayPaymentService = inject(RazorpayPaymentService)
  private readonly subscriptionPlanService = inject(SubscriptionPlanService)

  ngOnInit(): void {
    this.subscriptionStatusService.getSubscriptionStatus().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res: SubscriptionStatus) => {
        this.subscriptionEndDate = new Date(res.subscriptionInfo?.endDate || '').toLocaleString();
      }
    })
    this.subscriptionPlanService.getSubscriptionPlanByUserCategory(this.userInfo?.id ?? '').pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (res: SubscriptionInfoDetails[]) => {
        res.forEach((plan: SubscriptionInfoDetails) => {
          if (!this.subscriptionCategories.includes(plan.subscriptionCategory))
            this.subscriptionCategories.push(plan.subscriptionCategory)
          if (!this.subscriptionPlanDurations.includes(plan.billingCycle))
            this.subscriptionPlanDurations.push(plan.billingCycle)
        })
        this.subscriptionPlanDurations = this.subscriptionPlanDurations.sort((a, b) => {
          return this.customSubscriptionPlanDuration.indexOf(a) - this.customSubscriptionPlanDuration.indexOf(b);
        });
        this.subscriptionPlans = Object.groupBy(res, ({ billingCycle }) => billingCycle) as Record<string, SubscriptionInfoDetails[]>;
        const sortedSubscriptionPlansByDuration: [string, SubscriptionInfoDetails[]][] = this.subscriptionPlanDurations
          .map((billingCycle: string) => {
            const subscriptionPlans = this.subscriptionPlans[billingCycle.trim()];
            const sortedSubscriptionPlansByTile = this.getSortedSubscriptionPlansByTile(subscriptionPlans);
            return [billingCycle, sortedSubscriptionPlansByTile];
          })
          .filter(([, value]) => Array.isArray(value) && value.length > 0) as [string, SubscriptionInfoDetails[]][];
        this.subscriptionPlans = Object.fromEntries(sortedSubscriptionPlansByDuration);
        this.subscriptionPlansData = structuredClone(this.subscriptionPlans[this.subscriptionPlanDurations[0]]);
      }
    })
    this.chooseDuration(this.subscriptionPlanDurations[0])
  }

  razorPayOptions = {
    "key": "p2MwtaUtgj7eeVc4JNK6ZXQm",
    "amount": 0,
    "currency": "INR",
    "name": "",
    "description": "Skartz Payment",
    "order_id": "",
    "handler": (res: RazorPayOrderCreation) => {
      try {
        /* This block of code is handling the process after a successful payment verification using
        Razorpay. Here's a breakdown of what each step is doing: */
        res={...res, billingCycle: this.subscriptionDetails.billingCycle, subscriptionCategory: this.subscriptionDetails.subscriptionCategory}
        this.razorpayPaymentService.verifyRazorpayPayment(res).pipe(
          switchMap(() => this.authService.regenerateJwtToken(this.userInfo.id ?? '')),
          tap((tokenResponse) => {
            localStorage.setItem('UserInfo', JSON.stringify(tokenResponse));
            this.subscriptionStatusService.refreshStatus();
          }),
          switchMap(() => this.subscriptionStatusService.getSubscriptionStatus()),
          takeUntilDestroyed(this.destroyRef)
        ).subscribe({
          next: () => {
            this.router.navigate([RoutesPaths.BasePath + 'property-listing/rent']);
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

  public buyRazorPay(amount: number, subscriptionDetails: SubscriptionInfoDetails): void {
    this.subscriptionDetails = subscriptionDetails;
    console.log('subscriptionDetails', this.subscriptionDetails)
    this.loadingStates[amount] = true;
    const payload: RazorPayOrderCreationPayload = {
      "amount": amount, "receipt": "sfbbs", "payment_capture": 1, "userId": this.userInfo.id ?? '',
    }
    this.razorpayPaymentService.createRazorpayOrder(payload).subscribe((res: RazorPayOrderCreation) => {
      this.razorPayOptions.key = 'rzp_test_F01quPXBiDbfVY';
      this.razorPayOptions.amount = res['amount'];
      this.razorPayOptions.name = "prem";
      this.razorPayOptions.order_id = res['id'] ?? ''
      const rzp1 = new Razorpay(this.razorPayOptions);
      rzp1.open()
      this.loadingStates[amount] = false;
    })
  }

  public chooseDuration(subscriptionPlanDuration: string): void {
    this.subscriptionPlansData = structuredClone(this.subscriptionPlans[subscriptionPlanDuration]);
  }

  private getSortedSubscriptionPlansByTile(subscriptionPlans: SubscriptionInfoDetails[]): SubscriptionInfoDetails[] {
    return this.subscriptionCategories.sort((a, b) => {
      return this.customSubscriptionCategoryOrder.indexOf(a) - this.customSubscriptionCategoryOrder.indexOf(b);
    }).map((category: string) => {
      const subscriptionPlansIndex = subscriptionPlans
        .findIndex((subscriptionPlan: SubscriptionInfoDetails) => subscriptionPlan.subscriptionCategory === category);
      return subscriptionPlans[subscriptionPlansIndex];
    }).filter(Boolean) as SubscriptionInfoDetails[];
  }
}
