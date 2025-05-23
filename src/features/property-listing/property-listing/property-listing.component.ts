import { Component, DestroyRef, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { TabsModule } from 'primeng/tabs';
import { RoutesPaths } from '../../../app/shared/application-routes/app-routes';
import { filter, map } from 'rxjs/operators';
import { PropertyListingTabsInterface } from '../property-listing-interfaces/property-listing-tabs-interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-property-listing',
  imports: [RouterOutlet, RouterLink, TabsModule],
  templateUrl: './property-listing.component.html',
  styleUrl: './property-listing.component.scss'
})
export class PropertyListingComponent {
  tabs: PropertyListingTabsInterface[] = [];
  private router = inject(Router)
  currentUrl!: string;
  private destroyRef = inject(DestroyRef)

  constructor() {
    this.tabs = [
      { label: 'Rent property', value: 0, route: RoutesPaths.rentPropertyListing },
      { label: 'Sell property', value: 1, route: RoutesPaths.sellPropertyListing },
      { label: 'Lease property', value: 2, route: RoutesPaths.leasePropertyListing },
    ];

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.router.url)
    ).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(url => {
      this.currentUrl = url.split('/').pop() || '';
    });
  }
}
