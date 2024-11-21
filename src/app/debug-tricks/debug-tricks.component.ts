import { Component } from '@angular/core';
import { DebugDemoComponent } from "./debug-demo/debug-demo.component";
import { SecCounterComponent } from "./sec-counter/sec-counter.component";


@Component({
  selector: 'app-debug-tricks',
  standalone: true,
  imports: [SecCounterComponent, DebugDemoComponent],
  templateUrl: './debug-tricks.component.html',
  styleUrl: './debug-tricks.component.scss'
})
export class DebugTricksComponent {

}
