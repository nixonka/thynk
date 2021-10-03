import { Employee } from './../employee.model';
import { EmployeeState } from './../employees.state';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DeleteEmployee, GetEmployees, SetSelectedEmployee } from '../employees.action';

@Component({
  selector: 'app-employees-master',
  templateUrl: './employees-master.component.html',
  styleUrls: ['./employees-master.component.scss']
})
export class EmployeesMasterComponent implements OnInit {
  @Select(EmployeeState.getEmployeeList) employees: Observable<Employee[]> | undefined;
  @Select(EmployeeState.getSelectedEmployee) employee$: Observable<Employee> | undefined;
  public selectedEmployee: Employee | undefined;

  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.employee$?.subscribe((e) => {
      this.selectedEmployee = e;
    });
    this.getEmployees();
  }

  public isUndefinedOrEmpty(data: any) {
    return data === undefined ? true : !data.length
  }

  public isSelected(id: number) {
    return this.selectedEmployee?.id === id;
  }

  public selectEmployee(employee: Employee) {
    this.store.dispatch(new SetSelectedEmployee(employee))
  }

  public deleteEmployee(id: number) {

    // add dialog

    this.store.dispatch(new DeleteEmployee(id));
  }

  private getEmployees(filter?: any) {
    this.store.dispatch(new GetEmployees());
  }
}
