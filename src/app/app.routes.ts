import { Routes } from '@angular/router';
import { ParentComponent } from './deferred-loading/parent.component';
import { SingletonTestComponent } from './design-patterns/singleton-test/singleton-test.component';
import { FacadeTestComponent } from './design-patterns/facade-test/facade-test.component';
import {ControlFlowComponent} from "./control-flows/control-flow.component";
import {AppleRecipeComponent} from "./applepie-recipe/apple-recipe.component";

export const routes: Routes = [
  {
    path: 'apple-pie-recipe',
    loadComponent: () => AppleRecipeComponent,
  },
  {
    path: 'control-flows',
    loadComponent: () => ControlFlowComponent,
  },
  {
    path: 'deferred-loading',
    loadComponent: () => ParentComponent,
  },
  {
    path: 'facade',
    loadComponent: () => FacadeTestComponent,
  },
  {
    path: 'singleton',
    loadComponent: () => SingletonTestComponent
  }
];
