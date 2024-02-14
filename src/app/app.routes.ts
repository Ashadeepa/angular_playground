import { Routes } from '@angular/router';
import { ParentComponent } from './deferred-loading/parent.component';
import { SingletonTestComponent } from './design-patterns/singleton-test/singleton-test.component';
import { FacadeTestComponent } from './design-patterns/facade-test/facade-test.component';
import { FE02WorkshopComponent } from './fe-02-workshop/fe-02-workshop.component';

export const routes: Routes = [
  {
    path: 'deferred-loading',
    loadComponent: () => ParentComponent,
  },
  {
    path: 'singleton',
    loadComponent: () => SingletonTestComponent,
  },
  {
    path: 'facade',
    loadComponent: () => FacadeTestComponent,
  },
  {
    path: 'fe-02-workshop',
    loadComponent: () => FE02WorkshopComponent,
  },
  {
    path: '',
    loadComponent: () => FE02WorkshopComponent,
  },
  {
    path: '**',
    loadComponent: () => FE02WorkshopComponent,
  },
];
