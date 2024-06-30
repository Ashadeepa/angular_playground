import { Component } from '@angular/core';
import { FacadeService } from '../facade/facade.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-facade-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './facade-test.component.html',
  styleUrl: './facade-test.component.scss'
})
export class FacadeTestComponent {
  employees :  any = [];
  departments: any = [];
  /*  constructor (private empSvc : EmployeeService, 
    private deptSvc: DepartmentService ) {
      this.empSvc.getEmployees().subscribe((empl) => {
        console.log(empl);
      });

      this.deptSvc.getDepartments().subscribe((dept) => {
        console.log(dept);
      });
  }*/
  constructor(private facadeSvc : FacadeService) {
    this.facadeSvc
      .getDeptAndEmpl()
      .subscribe(([empl, dept]:any) => {
        this.employees = empl;
        this.departments = dept;
        console.log("Employees: ", empl);
        console.log("Departments: ", dept);
    })
  }

}
