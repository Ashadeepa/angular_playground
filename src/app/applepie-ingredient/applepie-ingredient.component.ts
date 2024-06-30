import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-applepie-ingredient',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './applepie-ingredient.component.html',
  styleUrl: './applepie-ingredient.component.scss'
})
export class ApplepieIngredientComponent {
  ingredients = [
    {id: 1, name: '4-5 apples' },
    {id: 2, name: '1 cup sugar' },
    {id: 3, name: '1 tsp cinnamon'},
    {id: 4, name: '1 pie crust'},
    // ...More ingredients
  ]
}
