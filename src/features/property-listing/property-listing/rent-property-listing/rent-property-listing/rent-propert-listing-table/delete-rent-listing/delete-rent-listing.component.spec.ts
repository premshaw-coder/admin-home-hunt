import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRentListingComponent } from './delete-rent-listing.component';

describe('DeleteRentListingComponent', () => {
  let component: DeleteRentListingComponent;
  let fixture: ComponentFixture<DeleteRentListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteRentListingComponent]
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
