import { Route } from '@angular/router';

export const setupRoutes: Route[] = [
  { path: 'setup', loadComponent: () => import('./setup.component') },
];
