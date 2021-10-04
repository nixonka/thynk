import { EmployeesService } from './../employees.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FormBase } from 'src/app/common/form-base';
import { Employee } from '../employee.model';
import { AddEmployee, DeleteEmployee, SetEditEmployeeMode, UpdateEmployee } from '../employees.action';
import { EmployeeState } from '../employees.state';

const formGroup = (dataItem?: Employee) => {
  const fg = new FormGroup(
    {
      ...((dataItem && dataItem.id) && { id: new FormControl(dataItem.id) }),
      ...{
        name: new FormControl(
          dataItem && dataItem.name ? dataItem.name : null, Validators.required),
        job: new FormControl(
          dataItem && dataItem.job ? dataItem.job : null),
        motto: new FormControl(
          dataItem && dataItem.motto ? dataItem.motto : null),
        hobbies: new FormControl(
          dataItem && dataItem.hobbies ? dataItem.hobbies : null),
        hometown: new FormControl(
          dataItem && dataItem.hometown ? dataItem.hometown : null),
        personalBlog: new FormControl(
          dataItem && dataItem.personalBlog ? dataItem.personalBlog : null),
        image: new FormControl(
          dataItem && dataItem.image ? dataItem.image : null),
      }
    }
  );
  return fg;
};

@Component({
  selector: 'app-employees-details',
  templateUrl: './employees-details.component.html',
  styleUrls: ['./employees-details.component.scss']
})
export class EmployeesDetailsComponent implements OnInit {
  @Select(EmployeeState.getSelectedEmployee) employee$: Observable<Employee> | undefined;
  @Select(EmployeeState.getEditMode) editMode$: Observable<boolean> | undefined;

  public employeeForm: FormBase<Employee>;
  public employee: Employee = {} as Employee;
  public formError: string = "";

  public get editMode(): boolean {
    return this.store.selectSnapshot(EmployeeState.editMode);
  }

  public get isEmployeeSelected(): boolean {
    return this.store.selectSnapshot(EmployeeState.isEmployeeSelected);
  }

  public get imagePath(): string {
    return this.employeeService.image(this.employee.image);
  }

  constructor(
    private store: Store,
    private employeeService: EmployeesService
  ) { }

  async ngOnInit(): Promise<void> {


    this.employee$?.subscribe((e) => {
      this.employee = e;
      this.employeeForm = new FormBase(
        formGroup(e)
      );
    });
  }

  public deleteEmployee(id?: number) {

    // add dialog
    if (id) {
      this.store.dispatch(new DeleteEmployee(id));
    }
  }



  public async editSaveEmployee(id?: number) {
    if (this.editMode) {
      this.save();
    } else {
      this.store.dispatch(new SetEditEmployeeMode());
    }
  }

  public async save() {
    if (this.employeeForm.form.valid) {
      this.employeeService.uploadImage(this.employeeForm.files).subscribe((resp: any) => {
        console.log(resp);
        this.employeeForm.form.controls.image.patchValue(resp.data.path)

        if (this.employeeForm.value.id) {
          this.store.dispatch(new UpdateEmployee(this.employeeForm.value, this.employeeForm.value.id))
        } else {
          this.store.dispatch(new AddEmployee(this.employeeForm.value))
        }
      });
    } else {
      this.formError = "Name is required";
    }
  }

  public isUndefinedOrEmpty() {
    return !this.isEmployeeSelected ? true : false
  }

  public uploader(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.employeeForm.files = new FormData();
      this.employeeForm.files.append("file", file, file.name);
    }

    console.log(this.employeeForm.files);

  }
}
