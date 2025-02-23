import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentPropertyListingFormComponent } from './rent-property-listing-form.component';

describe('RentPropertyListingFormComponent', () => {
  let component: RentPropertyListingFormComponent;
  let fixture: ComponentFixture<RentPropertyListingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentPropertyListingFormComponent]
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
