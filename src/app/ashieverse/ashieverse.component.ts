import {Component, signal} from '@angular/core';
import {ApplepieIngredientComponent} from "../applepie-ingredient/applepie-ingredient.component";
import {SurveyRecipeComponent} from "../applepie-survey-recipe/survey-recipe.component";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
type ItemType = {
  readonly id: number;
  readonly name: string;
};

type CollectionType = ReadonlyArray<ItemType>;
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
  ashieName = 'Ashieverse Art - Angular17 New Control Flows';
  isCompleted: any;
  canvasCollection: CollectionType = [
    { id: 1, name: 'Keep It Simple'},
    { id: 2, name: 'Butterfly Effect'},
    { id: 3, name: 'Sunset'},
    { id: 4, name: 'LightHouse'}
  ];
  emptyCollection: CollectionType = [];
  radioValue = signal(2);
}
