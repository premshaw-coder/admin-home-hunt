import { TestBed } from '@angular/core/testing';

import { RentPropertyListingService } from './rent-property-listing.service';

describe('RentPropertyListingService', () => {
  let service: RentPropertyListingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentPropertyListingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
