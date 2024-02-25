import {Component, signal} from '@angular/core';
import {NgIf} from "@angular/common";
type ItemType = {
  readonly id: number;
  readonly name: string;
};

type CollectionType = ReadonlyArray<ItemType>;
@Component({
  selector: 'app-control-flow',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './control-flow.component.html',
  styleUrl: './control-flow.component.scss'
})
export class ControlFlowComponent {
  isChecked = signal(true);

  collection: CollectionType = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' }
  ];
  emptyCollection: CollectionType = [];

  radioValue = signal(1);
}
