import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from '../employees/employees/employees.component';
import { EmployeesDetailsComponent } from '../employees/employees-details/employees-details.component';
import { EmployeesMasterComponent } from '../employees/employees-master/employees-master.component';


@NgModule({
  declarations: [
    EmployeesComponent,
    EmployeesDetailsComponent,
    EmployeesMasterComponent
  ],
  imports: [
    CommonModule
  ]
})
export class EmployeesModule { }
