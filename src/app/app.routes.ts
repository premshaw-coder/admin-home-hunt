import { Routes } from '@angular/router';
import { authGuard } from '../features/auth/guard/auth.guard';
import { RoutesPaths } from './shared/constants/application-routes/app-routes';

export const routes: Routes = [
    { path: '', redirectTo: RoutesPaths.Auth.login, pathMatch: 'full' },
    {
        path: RoutesPaths.Auth.base,
        loadChildren: () => import('../features/auth/routes/auth.routes').then(c => c.authRoutes)
    },

    {
        path: RoutesPaths.PropertyListing.create, canActivate: [authGuard],
        loadComponent: () => import('../features/property-listing/property-listing/property-listing.component')
            .then(c => c.PropertyListingComponent),
        children: [{
            path: '', loadChildren: () => import('../features/property-listing/property-listing-routes/property-listing-routes')
                .then(c => c.PropertyListingRoutes)
        }]

    },

    {
        path: RoutesPaths.Subscription, loadComponent: () => import('../features/subscription/subscription/subscription.component').then((c) => c.SubscriptionComponent)
    }
];