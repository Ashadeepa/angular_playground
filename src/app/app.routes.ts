import { Routes } from '@angular/router';
import { ParentComponent } from './deferred-loading/parent.component';

export const routes: Routes = [
  {
    path: 'deferred-loading',
    loadComponent: () => ParentComponent,
  }
];
