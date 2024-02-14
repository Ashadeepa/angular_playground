import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {DuckImage} from "../../duckImages";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-duck-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './duck-card.component.html',
  styleUrl: './duck-card.component.scss'
})
export class DuckCardComponent {
  @Input() duck: DuckImage | undefined;
}
