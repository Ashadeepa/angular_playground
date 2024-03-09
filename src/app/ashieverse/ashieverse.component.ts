import {Component, signal} from '@angular/core';
import {ApplepieIngredientComponent} from "../applepie-ingredient/applepie-ingredient.component";
import {SurveyRecipeComponent} from "../applepie-survey-recipe/survey-recipe.component";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-ashieverse',
  standalone: true,
  imports: [
    ApplepieIngredientComponent,
    SurveyRecipeComponent,
    FormsModule,
    NgIf
  ],
  templateUrl: './ashieverse.component.html',
  styleUrl: './ashieverse.component.scss'
})
export class AshieverseComponent {
  ashieImageUrl = '../../assets/ashieverse.jpg';
  ashieName = 'Ashieverse Art';
  isApple: boolean = false;
  toggleFruit() {
    this.isApple = !this.isApple;
  }
  isCompleted: any;
}
