import { Routes } from '@angular/router';

export const affiliatesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/affiliates/affiliates').then(m => m.Affiliates),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/affiliate-register/affiliate-register').then(m => m.AffiliateRegister),
  },
  // Futuras rutas que trabajaremos después:
  // {
  //   path: 'edit/:id',
  //   loadComponent: () => import('./pages/affiliate-edit/affiliate-edit').then(m => m.AffiliateEdit),
  // },
  // {
  //   path: 'detail/:id',
  //   loadComponent: () => import('./pages/affiliate-detail/affiliate-detail').then(m => m.AffiliateDetail),
  // },
  // {
  //   path: 'documents/:id',
  //   loadComponent: () => import('./pages/affiliate-documents/affiliate-documents').then(m => m.AffiliateDocuments),
  // }
];
