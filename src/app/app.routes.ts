import { Routes } from '@angular/router';
import { authGuard } from '../features/auth/guard/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: "/auth/login", pathMatch: 'full' },
    {
        path: 'auth',
        loadChildren: () => import('../features/auth/routes/auth.routes').then(c => c.authRoutes)
    },

    { path: 'home', canActivate: [authGuard], loadComponent: () => import('../features/home/home/home.component').then(c => c.HomeComponent) },
];
