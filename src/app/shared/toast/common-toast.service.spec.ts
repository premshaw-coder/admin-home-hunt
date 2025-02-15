import { TestBed } from '@angular/core/testing';

import { CommonToastService } from './common-toast.service';

describe('CommonToastService', () => {
  let service: CommonToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
