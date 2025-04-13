import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellPropertyListingComponent } from './sell-property-listing.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('SellPropertyListingComponent', () => {
  let component: SellPropertyListingComponent;
  let fixture: ComponentFixture<SellPropertyListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellPropertyListingComponent],
      providers: [provideAnimationsAsync()]
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
