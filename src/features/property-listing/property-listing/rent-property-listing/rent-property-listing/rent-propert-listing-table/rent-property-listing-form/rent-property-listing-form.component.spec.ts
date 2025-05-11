import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentPropertyListingFormComponent } from './rent-property-listing-form.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MessageService } from 'primeng/api';
describe('RentPropertyListingFormComponent', () => {
  let component: RentPropertyListingFormComponent;
  let fixture: ComponentFixture<RentPropertyListingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentPropertyListingFormComponent],
      providers: [
      provideAnimationsAsync(),
        DynamicDialogRef,
        DynamicDialogConfig,
        provideHttpClient(withInterceptors([])),
        provideHttpClientTesting(),
        MessageService,
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RentPropertyListingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


