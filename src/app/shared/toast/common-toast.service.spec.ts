import { TestBed } from '@angular/core/testing';

import { CommonToastService } from './common-toast.service';
import { MessageService } from 'primeng/api';

describe('CommonToastService', () => {
  let service: CommonToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MessageService // Add MessageService to providers
      ]
    });
    service = TestBed.inject(CommonToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
