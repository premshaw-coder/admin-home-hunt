import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentPropertyListingFormComponent } from './rent-property-listing-form.component';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
describe('RentPropertyListingFormComponent', () => {
  let component: RentPropertyListingFormComponent;
  let fixture: ComponentFixture<RentPropertyListingFormComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentPropertyListingFormComponent],
      providers: [
      provideAnimationsAsync(),
        DynamicDialogRef,
        DynamicDialogConfig,
        provideHttpClient(withInterceptors([])),
        provideHttpClientTesting(),
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RentPropertyListingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


