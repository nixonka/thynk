import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from '../employees/employees/employees.component';
import { EmployeesDetailsComponent } from '../employees/employees-details/employees-details.component';
import { EmployeesMasterComponent } from '../employees/employees-master/employees-master.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeesRoutingModule } from './employee-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faPencilAlt, faSave } from '@fortawesome/free-solid-svg-icons';


@NgModule({
  declarations: [
    EmployeesComponent,
    EmployeesDetailsComponent,
    EmployeesMasterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    EmployeesRoutingModule,
    FontAwesomeModule
  ], 
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmployeesModule { 
  constructor(private library: FaIconLibrary) {
    library.addIcons(faTrashAlt, faPencilAlt, faSave);
  }
}
