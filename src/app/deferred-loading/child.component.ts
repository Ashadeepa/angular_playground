import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [CommonModule],
  template: `

    <h4 style="color: green">
      This is child component!
    </h4>
  `,
  styles: ``
})
export class ChildComponent {

}
