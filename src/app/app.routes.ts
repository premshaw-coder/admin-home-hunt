import { Routes } from '@angular/router';
import { authGuard } from '../features/auth/guard/auth.guard';
import { RoutesPaths } from './shared/application-routes/app-routes';

export const routes: Routes = [
    { path: '', redirectTo: RoutesPaths.login, pathMatch: 'full' },
    {
        path: RoutesPaths.auth,
        loadChildren: () => import('../features/auth/routes/auth.routes').then(c => c.authRoutes)
    },

    {
        path: RoutesPaths.createPropertyListing, canActivate: [authGuard],
        loadComponent: () => import('../features/property-listing/property-listing/property-listing.component')
            .then(c => c.PropertyListingComponent),
        children: [{
            path: '', loadChildren: () => import('../features/property-listing/routes/property-listing-routes')
                .then(c => c.PropertyListingRoutes)
        }]

    },
];

/*

import { Routes } from '@angular/router';
import { authGuard } from '../features/auth/guard/auth.guard';
import { RoutesPaths } from './shared/application-routes/app-routes';

export const routes: Routes = [
    {
        path: '',
        redirectTo: RoutesPaths.login,
        pathMatch: 'full'
    },
    {
        path: RoutesPaths.auth,
        loadChildren: () => import('../features/auth/routes/auth.routes').then(c => c.authRoutes)
    },
    {
        path: RoutesPaths.createPropertyListing,
        canActivate: [authGuard],
        loadComponent: () => import('../features/property-listing/property-listing/property-listing.component')
            .then(c => c.PropertyListingComponent),
        loadChildren: () => import('../features/property-listing/routes/property-listing-routes')
            .then(c => c.PropertyListingRoutes)
    }
];

*/
