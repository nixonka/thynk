import { Injectable } from "@angular/core";
import { State, NgxsOnInit, Action, Selector, StateContext } from "@ngxs/store";
import { tap } from "rxjs/operators";

import {
    AddEmployee,
    DeleteEmployee,
    GetEmployees,
    SetCreatedEmployeeId,
    SetEditEmployeeMode,
    SetSelectedEmployee,
    UpdateEmployee
} from "./employees.action";
import { EmployeesService } from "./employees.service";
import { Employee } from "./employee.model";

export class EmployeeStateModel {
    employees?: {
        count?: number;
        data?: Employee[];
        errors?: any;
        message?: any;
        pageNumber?: number;
        pageSize?: number;
        succeeded?: boolean;
    };
    selectedEmployee: Employee = {} as Employee;
    createdEmployeeId?: number;
    editMode?: boolean;
}

@State<EmployeeStateModel>({
    name: "employee",
    defaults: {
        employees: {},
        selectedEmployee: {} as Employee,
        editMode: false
    }
})
@Injectable()
export class EmployeeState implements NgxsOnInit {
    @Selector()
    static getEmployeeList(state: EmployeeStateModel) {
        return state.employees?.data;
    }

    @Selector()
    static getSelectedEmployee(state: EmployeeStateModel) {
        return state.selectedEmployee;
    }

    @Selector()
    static getEditMode(state: EmployeeStateModel) {
        return state.editMode;
    }

    @Selector()
    static getSelectedEmployeeAsync(state: EmployeeStateModel): Promise<Employee> {
        return new Promise((resolve, reject) => {
            resolve(state.selectedEmployee);
        });
    }

    constructor(
        private employeesService: EmployeesService
    ) { }

    ngxsOnInit(ctx: StateContext<EmployeeStateModel>) {
    }

    @Action(GetEmployees)
    getEmployees({ getState, setState }: StateContext<EmployeeStateModel>, { filter }: GetEmployees) {
        return this.employeesService.fetch(filter?.pageNumber, filter?.pageSize).pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                employees: result
            });
        }));
    }

    @Action(AddEmployee)
    addEmployee({ getState, setState }: StateContext<EmployeeStateModel>, { payload }: AddEmployee) {
        return this.employeesService.add(payload).pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                createdEmployeeId: result.data
            });
        }));
    }

    @Action(UpdateEmployee)
    updateEmployee({ getState, setState }: StateContext<EmployeeStateModel>, { payload, id }: UpdateEmployee) {
        return this.employeesService.update(payload, id).pipe(tap((result) => {
            const state = getState();
            const employeesList = [...state.employees?.data || []];
            const employeeIndex = employeesList.findIndex(item => item.id === id);
            employeesList[employeeIndex] = result.data;
            setState({
                ...state,
                employees: { data: employeesList },
            });
        }));
    }


    @Action(DeleteEmployee)
    deleteEmployee({ getState, setState }: StateContext<EmployeeStateModel>, { id }: DeleteEmployee) {
        return this.employeesService.delete(id).pipe(tap(() => {
            const state = getState();
            const filteredArray = state.employees?.data?.filter(item => item.id !== id);
            setState({
                ...state,
                employees: { ...state.employees, data: filteredArray },
            });
        }));
    }

    @Action(SetSelectedEmployee)
    setSelectedEmployee({ getState, setState }: StateContext<EmployeeStateModel>, { payload }: SetSelectedEmployee) {
        const state = getState();
        setState({
            ...state,
            selectedEmployee: payload
        });
    }

    @Action(SetEditEmployeeMode)
    setEditEmployeeMode({ getState, setState }: StateContext<EmployeeStateModel>) {
        const state = getState();
        setState({
            ...state,
            editMode: !state.editMode
        });
    }

    @Action(SetCreatedEmployeeId)
    setCreatedEmployeeId({ getState, setState }: StateContext<EmployeeStateModel>, { id }: SetCreatedEmployeeId) {
        const state = getState();
        setState({
            ...state,
            createdEmployeeId: id
        });
    }

}
