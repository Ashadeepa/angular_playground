import { Component } from '@angular/core';
import { SingletonService } from '../singletonservice/singleton.service';

@Component({
  selector: 'app-singleton-child2',
  standalone: true,
  imports: [],
  templateUrl: './singleton-child2.component.html',
  styleUrl: './singleton-child2.component.scss'
})
export class SingletonChild2Component {
  message: string = "";

  constructor(private singletonSvc : SingletonService) {}

  ngOnInit() {
    this.message = this.singletonSvc.getMessage("Singleton child #2222 ");
  }
}
