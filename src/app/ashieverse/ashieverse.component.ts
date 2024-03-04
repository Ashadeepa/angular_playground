import { Component } from '@angular/core';
import {ApplepieIngredientComponent} from "../applepie-ingredient/applepie-ingredient.component";
import {SurveyRecipeComponent} from "../applepie-survey-recipe/survey-recipe.component";

@Component({
  selector: 'app-ashieverse',
  standalone: true,
    imports: [
        ApplepieIngredientComponent,
        SurveyRecipeComponent
    ],
  templateUrl: './ashieverse.component.html',
  styleUrl: './ashieverse.component.scss'
})
export class AshieverseComponent {
  ashieImageUrl = '../../assets/ashieverse.jpg';
  ashieName = 'Ashieverse Art';
}
