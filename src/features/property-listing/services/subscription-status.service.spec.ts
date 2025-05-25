import { TestBed } from '@angular/core/testing';

import { SubscriptionStatusService } from './subscription-status.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

describe('SubscriptionStatusService', () => {
  let service: SubscriptionStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([])),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(SubscriptionStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
