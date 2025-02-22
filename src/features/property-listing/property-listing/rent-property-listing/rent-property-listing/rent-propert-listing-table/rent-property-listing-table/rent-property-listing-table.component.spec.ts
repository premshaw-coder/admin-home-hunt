import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentPropertyListingTableComponent } from './rent-property-listing-table.component';

describe('RentPropertyListingTableComponent', () => {
  let component: RentPropertyListingTableComponent;
  let fixture: ComponentFixture<RentPropertyListingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentPropertyListingTableComponent]
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
