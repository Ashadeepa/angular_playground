import { PresentationPrototype } from './presentation-prototype';
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class PresentationService {
  private prototype: PresentationPrototype;

  constructor() {
    // Initialize the prototype object
    this.prototype = new PresentationPrototype('Default Title', ['Slide 1', 'Slide 2']);
  }

  createPresentation(title: string, slides: string[]): PresentationPrototype {
    // Clone the prototype and modify as needed
    const presentation = this.prototype.clone();
    presentation.title = title;
    presentation.slides = slides;
    return presentation;
  }
}
