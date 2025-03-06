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
import {FactoryComponent} from "./design-patterns/factory/factory.component";
import {AdapterComponent} from "./design-patterns/adapter/adapter.component";
import {TodoListAppComponent} from "./todo-list-app/todo-list-app.component";
import { CssTricksComponent } from './css-tricks/css-tricks.component';
import { WorkshopProblemStatementComponent } from './workshop-problem-statement/workshop-problem-statement.component';
import { DebugTricksComponent } from './debug-tricks/debug-tricks.component';
import { AnimalClassifierComponent } from './animal-classifier/animal-classifier.component';
import { SentimentAnalysisComponent } from './sentiment-analysis/sentiment-analysis.component';
import { InnerHtmlBindingComponentComponent } from './inner-html-binding-component/inner-html-binding-component.component';
import { BypassSecurityComponentComponent } from './bypass-security-component/bypass-security-component.component';

export let routes: Routes;
// @ts-ignore
routes = [
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
    path: 'singleton',
    loadComponent: () => SingletonTestComponent
  },
  {
    path: 'prototype',
    loadComponent: () => PresentationComponent
  },
  {
    path: 'facade',
    loadComponent: () => FacadeTestComponent,
  },
  {
    path: 'factory',
    loadComponent: () => FactoryComponent
  },
  {
    path: 'adapter',
    loadComponent: () => AdapterComponent
  },
  {
    path: 'logging',
    loadComponent: () => LoggingComponent
  },
  {
    path: 'iterator',
    loadComponent: () => IteratorComponent
  },
  {
    path: 'state',
    loadComponent: () => StateComponent
  },
  {
    path: 'todo-list',
    component: TodoListAppComponent
  },
  {
    path: 'css-tricks',
    component: CssTricksComponent
  },
  {
    path: 'problem-statement',
    component: WorkshopProblemStatementComponent
  },
  {
    path: 'debug-tricks',
    component: DebugTricksComponent
  },
  {
    path: 'animal-classifier',
    component: AnimalClassifierComponent
  },
  {
    path: 'sentiment-analysis',
    component: SentimentAnalysisComponent
  },
  {
    path: 'html-binding',
    component: InnerHtmlBindingComponentComponent
  },
  {
    path: 'bypass-security',
    component: BypassSecurityComponentComponent
  }
];
