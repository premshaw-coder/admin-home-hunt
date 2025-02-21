import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TabsModule } from 'primeng/tabs';
import { RoutesPaths } from '../../../app/shared/application-routes/app-routes';

@Component({
  selector: 'app-property-listing',
  imports: [RouterOutlet, RouterLink, TabsModule],
  templateUrl: './property-listing.component.html',
  styleUrl: './property-listing.component.scss'
})
export class PropertyListingComponent {
  tabs: any[] = [];

  constructor() {
    this.tabs = [
      { label: 'Rent property', value: 0, route: RoutesPaths.rentPropertyListing },
      { label: 'Sell property', value: 1, route: RoutesPaths.sellPropertyListing },
      { label: 'Lease property', value: 2, route: RoutesPaths.leasePropertyListing },
    ];
  }
}
