import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DuckCardComponent } from './duck-card/duck-card.component';
import { NewsletterSignupComponent } from './newsletter-signup/newsletter-signup.component';
import { duckImages } from '../duckImages';

@Component({
  selector: 'app-fe-02-workshop',
  standalone: true,
  imports: [CommonModule, DuckCardComponent, NewsletterSignupComponent],
  templateUrl: './fe-02-workshop.component.html',
  styleUrl: './fe-02-workshop.component.scss',
})
export class FE02WorkshopComponent {
  ducks = duckImages.assets;
}
