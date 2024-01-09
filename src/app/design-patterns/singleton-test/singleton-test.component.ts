import { Component } from '@angular/core';
import { SingletonChild1Component } from '../singleton-child1/singleton-child1.component';
import { SingletonChild2Component } from '../singleton-child2/singleton-child2.component';

@Component({
  selector: 'app-singleton-test',
  standalone: true,
  imports: [SingletonChild1Component, SingletonChild2Component],
  templateUrl: './singleton-test.component.html',
  styleUrl: './singleton-test.component.scss'
})
export class SingletonTestComponent {

}
