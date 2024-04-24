import { Routes } from '@angular/router';
import { ParentComponent } from './deferred-loading/parent.component';
import { SingletonTestComponent } from './design-patterns/singleton-test/singleton-test.component';
import { FacadeTestComponent } from './design-patterns/facade-test/facade-test.component';
import {ControlFlowComponent} from "./control-flows/control-flow.component";
import {AppleRecipeComponent} from "./applepie-recipe/apple-recipe.component";
import {AshieverseComponent} from "./ashieverse/ashieverse.component";
import {PresentationComponent} from "./design-patterns/prototype/presentation.component";
import {LoggingComponent} from "./design-patterns/decorator/logging.component";
import { IteratorComponent } from './design-patterns/behavioural-design-pattern/iterator-pattern/iterator.component';
import { StateComponent } from './design-patterns/behavioural-design-pattern/state-pattern/state.component';

export const routes: Routes = [
  {
    path: 'apple-pie-recipe',
    loadComponent: () => AppleRecipeComponent,
  },
  {
    path: 'ashieverse-art',
    loadComponent: () => AshieverseComponent,
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
  },
  {
    path: 'prototype',
    loadComponent: () => PresentationComponent
  },
  {
    path: 'logging',
    loadComponent: () => LoggingComponent
  }
    path: 'iterator',
    loadComponent: () => IteratorComponent
  },
  {
    path: 'state',
    loadComponent: () => StateComponent
  }  
];
