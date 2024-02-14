import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-newsletter-signup',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatInputModule, MatButtonModule],
  templateUrl: './newsletter-signup.component.html',
  styleUrl: './newsletter-signup.component.scss'
})
export class NewsletterSignupComponent {

}
