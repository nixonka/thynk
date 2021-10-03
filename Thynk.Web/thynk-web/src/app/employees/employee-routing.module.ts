import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';

const employeeRoutes: Routes = [
    {
        path: "employees",
        children: [
            {
                path: "",
                component: EmployeesComponent,
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(employeeRoutes)],
    exports: [RouterModule]
})
export class EmployeesRoutingModule { }