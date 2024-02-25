import { Routes } from '@angular/router';
import { ParentComponent } from './deferred-loading/parent.component';
import { SingletonTestComponent } from './design-patterns/singleton-test/singleton-test.component';
import { FacadeTestComponent } from './design-patterns/facade-test/facade-test.component';
import {ControlFlowComponent} from "./control-flows/control-flow/control-flow.component";

export const routes: Routes = [
  {
    path: 'control-flows',
    loadComponent: () => ControlFlowComponent,
  },
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
  }
];
