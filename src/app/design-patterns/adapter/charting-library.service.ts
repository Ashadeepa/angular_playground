import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartingLibraryService {

  constructor() { }
  getData() {
    return [{
      name: 'Data 1',
      value: 100
    }, {
      name: 'Data 2',
      value: 200
    }];
  }
}
