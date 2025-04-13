import { TestBed } from '@angular/core/testing';

import { RentPropertyListingService } from './rent-property-listing.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
describe('RentPropertyListingService', () => {
  let service: RentPropertyListingService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([])),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(RentPropertyListingService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
