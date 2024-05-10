import { Injectable } from '@angular/core';
import {ChartingLibraryService} from "./charting-library.service";

@Injectable({
  providedIn: 'root'
})
export class ChartingAdapterService {
  private chartingLibrary: ChartingLibraryService;

  constructor() {
    this.chartingLibrary = new ChartingLibraryService();
  }

  public getData() {
    let data = this.chartingLibrary.getData();
    return data.map((d) => {
      return {
        id: d.name,
        price: d.value
      };
    });
  }
}
