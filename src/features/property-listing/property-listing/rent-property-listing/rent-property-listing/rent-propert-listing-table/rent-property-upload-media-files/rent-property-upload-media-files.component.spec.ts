import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentPropertyUploadMediaFilesComponent } from './rent-property-upload-media-files.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('RentPropertyUploadMediaFilesComponent', () => {
  let component: RentPropertyUploadMediaFilesComponent;
  let fixture: ComponentFixture<RentPropertyUploadMediaFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentPropertyUploadMediaFilesComponent],
      providers: [
        provideAnimationsAsync(),
        provideHttpClient(withInterceptors([])),
        provideHttpClientTesting(),
        DynamicDialogConfig,
        DynamicDialogRef,
      ]
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
