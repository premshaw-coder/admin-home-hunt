import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellPropertyListingComponent } from './sell-property-listing.component';

describe('SellPropertyListingComponent', () => {
  let component: SellPropertyListingComponent;
  let fixture: ComponentFixture<SellPropertyListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellPropertyListingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellPropertyListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
