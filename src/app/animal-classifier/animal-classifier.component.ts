import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-animal-classifier',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './animal-classifier.component.html',
  styleUrl: './animal-classifier.component.scss'
})
export class AnimalClassifierComponent {
  @ViewChild('imageUpload', { static: false }) imageUpload!: ElementRef;
  imageSrc: string | ArrayBuffer | null = null;
  predictions: { className: string, probability: number }[] = [];
  modelLoaded = false;
  model: mobilenet.MobileNet | null = null;

  async ngOnInit() {
    await tf.ready();
    this.model = await mobilenet.load();
    this.modelLoaded = true;
  }

  async onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result;
        this.classifyImage();
      };
      reader.readAsDataURL(file);
    }
  }

  async classifyImage() {
    if (!this.imageSrc || !this.model) return;

    const imgElement = new Image();
    imgElement.src = this.imageSrc as string;
    imgElement.onload = async () => {
      const predictions = await this.model!.classify(imgElement);
      console.log(predictions);
      this.predictions = predictions.map(pred => ({
        className: pred.className,
        probability: Math.round(pred.probability * 100)
      }));
    };
  }
}
