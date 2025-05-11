import { TestBed } from '@angular/core/testing';

import { RentPropertyFilesUploadService } from './rent-property-files-upload.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

describe('RentPropertyFilesUploadService', () => {
  let service: RentPropertyFilesUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([])),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(RentPropertyFilesUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
