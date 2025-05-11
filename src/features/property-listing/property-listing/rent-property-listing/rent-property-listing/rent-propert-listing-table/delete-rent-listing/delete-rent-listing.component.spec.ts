import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRentListingComponent } from './delete-rent-listing.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
describe('DeleteRentListingComponent', () => {
  let component: DeleteRentListingComponent;
  let fixture: ComponentFixture<DeleteRentListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteRentListingComponent],
      providers: [
       provideAnimationsAsync(),
        ConfirmationService,
        MessageService,
        provideHttpClient(withInterceptors([])),
        provideHttpClientTesting(),
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DeleteRentListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
