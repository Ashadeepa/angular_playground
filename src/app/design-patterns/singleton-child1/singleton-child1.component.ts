import { Component } from '@angular/core';
import { SingletonService } from '../singletonservice/singleton.service';

@Component({
  selector: 'app-singleton-child1',
  standalone: true,
  imports: [],
  templateUrl: './singleton-child1.component.html',
  styleUrl: './singleton-child1.component.scss'
})
export class SingletonChild1Component {
  
  message: string = "";

  constructor(private singletonSvc : SingletonService) {}

  ngOnInit() {
    this.message = this.singletonSvc.getMessage("Singleton child #1111 ");
  }

}
