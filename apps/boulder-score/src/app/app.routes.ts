import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./home/home.component') },
  { path: 'finals', loadChildren: () => import('./setup/setup.routes').then(m => m.setupRoutes) },
];
