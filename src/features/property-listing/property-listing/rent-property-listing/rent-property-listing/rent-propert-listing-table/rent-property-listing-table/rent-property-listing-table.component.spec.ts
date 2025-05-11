import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentPropertyListingTableComponent } from './rent-property-listing-table.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
describe('RentPropertyListingTableComponent', () => {
  let component: RentPropertyListingTableComponent;
  let fixture: ComponentFixture<RentPropertyListingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentPropertyListingTableComponent],
      providers: [
        provideAnimationsAsync(),
        MessageService,
        ConfirmationService,
        provideHttpClient(withInterceptors([])),
        provideHttpClientTesting(),
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RentPropertyListingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
