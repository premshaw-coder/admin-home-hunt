import { Routes } from '@angular/router';

export const authRoutes: Routes = [
    {
        path: 'sign-up',
        loadComponent: () => import('../components/sign-up/sign-up.component').then(c => c.SignUpComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('../components/login/login.component').then(c => c.LoginComponent)
    },
    {
        path: 'reset-password',
        loadComponent: () => import('../components/reset-password/reset-password.component').then(c => c.ResetPasswordComponent)
    }
]