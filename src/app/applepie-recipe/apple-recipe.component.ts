import {Component, signal} from '@angular/core';
import {NgForOf} from "@angular/common";
import {SurveyRecipeComponent} from "../applepie-survey-recipe/survey-recipe.component";
import {ApplepieIngredientComponent} from "../applepie-ingredient/applepie-ingredient.component";
@Component({
  selector: 'app-apple-recipe.component',
  standalone: true,
  imports: [
    NgForOf,
    SurveyRecipeComponent,
    ApplepieIngredientComponent
  ],
  templateUrl: './apple-recipe-component.html',
  styleUrl: './apple-recipe.component.scss'
})
export class AppleRecipeComponent {

  pieName = 'Apple Pie';
  pieImageUrl = '../../assets/apple-pie.jpg';
  isClicked = signal(false);
  instructions =
    [
      {id: 1, name: 'Peel and slice the apples.' },
      {id: 2, name: 'Mix apples with sugar and cinnamon.' },
      {id: 3, name: 'Place the mixture in the pie crust.'},
      {id: 4, name: 'Bake at 375°F for 45 minutes.'},
      // ...More steps
    ]
  recipeNote = 'Feel free to add a scoop of vanilla ice cream on top!';
}
