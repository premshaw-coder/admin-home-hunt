import { TestBed } from '@angular/core/testing';

import { RentPropertyFilesUploadService } from './rent-property-files-upload.service';

describe('RentPropertyFilesUploadService', () => {
  let service: RentPropertyFilesUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentPropertyFilesUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
