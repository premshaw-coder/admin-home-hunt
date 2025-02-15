import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: "/auth/login", pathMatch: 'full' },
    {
        path: 'auth',
        loadChildren: () => import('../features/auth/routes/auth.routes').then(c => c.authRoutes)
    }
];
