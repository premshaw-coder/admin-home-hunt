import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeasePropertyListingComponent } from './lease-property-listing.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('LeasePropertyListingComponent', () => {
  let component: LeasePropertyListingComponent;
  let fixture: ComponentFixture<LeasePropertyListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeasePropertyListingComponent],
      providers: [provideAnimationsAsync()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeasePropertyListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
