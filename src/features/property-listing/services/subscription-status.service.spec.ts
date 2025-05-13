import { TestBed } from '@angular/core/testing';

import { SubscriptionStatusService } from './subscription-status.service';

describe('SubscriptionStatusService', () => {
  let service: SubscriptionStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscriptionStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
