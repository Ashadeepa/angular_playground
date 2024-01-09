import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor() { }

  getDepartments() {
    return of ( [
      {
        id: "D1",
        name: "Sales"
      },
      {
        id: "D2",
        name: "R&D"    
      },
      {
        id: "D3",
        name: "Marketing"      
      }
    ] )
  }
}
