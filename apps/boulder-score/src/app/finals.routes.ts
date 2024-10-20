import { inject } from '@angular/core';
import { ResolveFn, Route } from '@angular/router';
import { SetupService } from './setup/data-access/setup.service';
import { EMPTY } from 'rxjs';

export const validFormResolverFn: ResolveFn<boolean> = () => {
  return inject(SetupService).formGroup.invalid && EMPTY;
};

export const finalsRoutes: Route[] = [
  { path: 'setup', loadComponent: () => import('./setup/setup.component') },
  {
    path: 'during',
    loadComponent: () => import('./during/during.component'),
    resolve: { validFormResolverFn },
  },
];
