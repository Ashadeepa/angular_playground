import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DepartmentService } from './design-patterns/facade/department.service';
import { EmployeeService } from './design-patterns/facade/employee.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `<router-outlet></router-outlet>`,
  styles: ``,
})
export class AppComponent {
/*  constructor (private empSvc : EmployeeService, 
    private deptSvc: DepartmentService ) {
      this.empSvc.getEmployees().subscribe((empl) => {
        console.log(empl);
      });

      this.deptSvc.getDepartments().subscribe((dept) => {
        console.log(dept);
      });
  }*/
}
