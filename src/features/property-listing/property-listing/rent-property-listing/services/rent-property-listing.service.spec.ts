import { TestBed } from '@angular/core/testing';

import { RentPropertyListingService } from './rent-property-listing.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
describe('RentPropertyListingService', () => {
  let service: RentPropertyListingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([])),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(RentPropertyListingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
