import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyListingComponent } from './property-listing.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('PropertyListingComponent', () => {
  let component: PropertyListingComponent;
  let fixture: ComponentFixture<PropertyListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyListingComponent],
      providers: [
        provideAnimationsAsync(),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: (key: string) => key === 'id' ? '123' : null }), // Mock paramMap
            queryParamMap: of({ get: (key: string) => key === 'queryParam' ? 'value' : null }) // Mock queryParamMap
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
