export class PresentationPrototype {
  title: string;
  slides: string[];

  constructor(title: string, slides: string[]) {
    this.title = title;
    this.slides = slides;
  }

  clone(): PresentationPrototype {
    // Create a new instance and copy properties
    return new PresentationPrototype(this.title, this.slides.slice());
  }
}
