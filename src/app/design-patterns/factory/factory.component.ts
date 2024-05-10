import { Component } from '@angular/core';
import {FactoryService} from "./factory.service";

@Component({
  selector: 'app-factory',
  template: '<p> Object: {{factoryObject.message}} </p>',
  standalone: true,
  styleUrls: []
})
export class FactoryComponent {
  factoryObject: any;
  constructor(private factoryService: FactoryService) {
    this.factoryObject = this.factoryService.createObject('hello');
  }
}
