import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RazorPayOrderCreation, RazorPayOrderCreationPayload } from '../interface/razorpay-payment-interface';
import { ApiEndPoints } from '../../../app/shared/constants/api-ends-points/admin-home-hunt-api-endpoints';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class RazorpayPaymentService {

  private readonly http = inject(HttpClient)

  public createRazorpayOrder(payload: RazorPayOrderCreationPayload): Observable<RazorPayOrderCreation> {
    return this.http.post<RazorPayOrderCreation>(environment.baseUrl + ApiEndPoints.createRazorpayOrder, payload)
  }

  public verifyRazorpayPayment(res: RazorPayOrderCreation): Observable<RazorPayOrderCreation> {
    return this.http.post<RazorPayOrderCreation>(environment.baseUrl + ApiEndPoints.verifyRazorPayPayment, res)
  }
}
