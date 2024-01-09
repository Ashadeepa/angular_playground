import { Injectable } from '@angular/core';
import { EmployeeService } from './employee.service';
import { DepartmentService } from './department.service';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacadeService {

  constructor(
    private empSvc : EmployeeService, 
    private deptSvc: DepartmentService) {    
  }

  getDeptAndEmpl() {
    return forkJoin ([
      this.empSvc.getEmployees(),
      this.deptSvc.getDepartments()
    ]);
  }
}
