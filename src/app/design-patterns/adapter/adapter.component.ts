import { Component } from '@angular/core';
import {ChartingAdapterService} from "./charting-adapter.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-adapter',
  standalone: true,
  imports: [
    NgForOf
  ],
  template: `
    <div *ngFor="let obj of adapterObj">
      <p> ID: {{obj.id}} </p>
      <p> Price: {{obj.price}} </p>
    </div>
  `
})
export class AdapterComponent {
  adapterObj : any[];
  constructor(private chartingAdapterService: ChartingAdapterService) {
    this.adapterObj = this.chartingAdapterService.getData();
  }
  ngOnInit() {
    console.log(this.adapterObj);
  }
}
