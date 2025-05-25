import { TestBed } from '@angular/core/testing';

import { RazorpayPaymentService } from './razorpay-payment.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('RazorpayPaymentService', () => {
  let service: RazorpayPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([])),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(RazorpayPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
