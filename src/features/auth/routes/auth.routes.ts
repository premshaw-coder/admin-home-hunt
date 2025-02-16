import { Routes } from '@angular/router';
import { authReverseGuard } from '../guard/auth-reverse.guard';

export const authRoutes: Routes = [
    {
        path: 'sign-up', canActivate: [authReverseGuard],
        loadComponent: () => import('../components/sign-up/sign-up.component').then(c => c.SignUpComponent)
    },
    {
        path: 'login', canActivate: [authReverseGuard],
        loadComponent: () => import('../components/login/login.component').then(c => c.LoginComponent)
    },
    {
        path: 'forgot-password',
        loadComponent: () => import('../components/forgot-password/forgot-password.component').then(c => c.ForgotPasswordComponent)
    },
    {
        path: 'reset-password',
        loadComponent: () => import('../components/reset-password/reset-password.component').then(c => c.ResetPasswordComponent)
    }
]