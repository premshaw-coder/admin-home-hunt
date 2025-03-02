import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentPropertyUploadMediaFilesComponent } from './rent-property-upload-media-files.component';

describe('RentPropertyUploadMediaFilesComponent', () => {
  let component: RentPropertyUploadMediaFilesComponent;
  let fixture: ComponentFixture<RentPropertyUploadMediaFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentPropertyUploadMediaFilesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentPropertyUploadMediaFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
