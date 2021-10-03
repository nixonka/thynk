import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Employee } from '../employee.model';
import { DeleteEmployee, SetEditEmployeeMode } from '../employees.action';
import { EmployeeState } from '../employees.state';

@Component({
  selector: 'app-employees-details',
  templateUrl: './employees-details.component.html',
  styleUrls: ['./employees-details.component.scss']
})
export class EmployeesDetailsComponent implements OnInit {
  @Select(EmployeeState.getSelectedEmployee) employee$: Observable<Employee> | undefined;
  @Select(EmployeeState.getEditMode) editMode$: Observable<boolean> | undefined;
  public employee: Employee | undefined;
  constructor(
    private store: Store,
  ) { }

  async ngOnInit(): Promise<void> {
    this.employee$?.subscribe((e) => {
      this.employee = e;
    });
  }

  public deleteEmployee(id?: number) {

    // add dialog
    if (id) {
      this.store.dispatch(new DeleteEmployee(id));
    }
  }

  public editEmployee(id?: number) {
    this.store.dispatch(new SetEditEmployeeMode());
  }

  public isUndefinedOrEmpty(item: any) {
    return !item?.id ? true : false
  }
}
