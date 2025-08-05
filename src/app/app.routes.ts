import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./features/auth/pages/login/login').then(m => m.Login),
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/pages/dashboard/dashboard').then(m => m.Dashboard),
    },
    {
        path: 'customers',
        loadComponent: () => import('./features/customers/pages/customers/customers').then(m => m.Customers),
    },
    {
        path: 'affiliates',
        loadComponent: () => import('./features/affiliates/pages/affiliates/affiliates').then(m => m.Affiliates),
    },
    {
        path: 'vehicles',
        loadComponent: () => import('./features/vehicles/pages/vehicles/vehicles').then(m => m.Vehicles),
    },
    {
        path: 'rates',
        loadComponent: () => import('./features/rates/pages/rates/rates').then(m => m.Rates),
    },
    {
        path: 'live-monitoring',
        loadComponent: () => import('./features/live-monitoring/pages/live-monitoring/live-monitoring').then(m => m.LiveMonitoring),
    },
    {
        path: 'trip-history',
        loadComponent: () => import('./features/trip-history/pages/trip-history/trip-history').then(m => m.TripHistory),
    },
    {
        path: 'ratings',
        loadComponent: () => import('./features/ratings/pages/ratings/ratings').then(m => m.Ratings),
    },
    {
        path: 'support',
        loadComponent: () => import('./features/support/pages/support/support').then(m => m.Support),
    },
    {
        path: 'reports',
        loadComponent: () => import('./features/reports/pages/reports/reports').then(m => m.Reports),
    },
    {
        path: 'benefits',
        loadComponent: () => import('./features/benefits/pages/benefits/benefits').then(m => m.Benefits),
    },
    {
        path: 'settings',
        loadComponent: () => import('./features/settings/pages/settings/settings').then(m => m.Settings),
    },
];
