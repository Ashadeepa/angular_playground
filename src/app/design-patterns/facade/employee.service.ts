import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }
  getEmployees() {
    return of ( [
      {
        id: "123",
        name: "John Doe",
        email: "john.doe@abc.com"
      },
      {
        id: "234",
        name: "Jane Doe",
        email: "jane.doe@abc.com"        
      },
      {
        id: "345",
        name: "Richard Smith",
        email: "richard.smith@abc.com"        
      }
    ] );
  }
}
