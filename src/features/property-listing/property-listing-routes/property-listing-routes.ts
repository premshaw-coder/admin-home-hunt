import { Routes } from '@angular/router';
import { RoutesPaths } from '../../../app/shared/constants/application-routes/app-routes';

export const PropertyListingRoutes: Routes = [
    { path: '', redirectTo: RoutesPaths.rentPropertyListing, pathMatch: 'full' },
    {
        path: RoutesPaths.rentPropertyListing,
        loadComponent: () => import('../property-listing/rent-property-listing/rent-property-listing/rent-property-listing.component').then(c => c.RentPropertyListingComponent)
    },
    {
        path: RoutesPaths.sellPropertyListing,
        loadComponent: () => import('../property-listing/sell-property-listing/sell-property-listing/sell-property-listing.component').then(c => c.SellPropertyListingComponent)
    },
    {
        path: RoutesPaths.leasePropertyListing,
        loadComponent: () => import('../property-listing/lease-property-listing/lease-property-listing/lease-property-listing.component').then(c => c.LeasePropertyListingComponent)
    }
]