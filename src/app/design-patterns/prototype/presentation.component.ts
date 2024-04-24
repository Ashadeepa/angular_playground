import { Component } from '@angular/core';
import { PresentationService } from './presentation.service';
import {PresentationPrototype} from "./presentation-prototype";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-presentation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>{{ presentation.title }}</h1>
    <ul>
      <li *ngFor="let slide of presentation.slides">{{ slide }}</li>
    </ul>
  `
})
export class PresentationComponent {
  presentation: PresentationPrototype;

  constructor(private presentationService: PresentationService) {
    this.presentation = this.presentationService.createPresentation('Angular Presentation', ['Slide 1', 'Slide 2', 'Slide 3']);
  }
}
