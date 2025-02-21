import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentPropertyListingComponent } from './rent-property-listing.component';

describe('RentPropertyListingComponent', () => {
  let component: RentPropertyListingComponent;
  let fixture: ComponentFixture<RentPropertyListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentPropertyListingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentPropertyListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
