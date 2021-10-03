import { Employee } from "./employee.model";

export class AddEmployee {
    static readonly type = "[Employee] Add";

    constructor(public payload: Employee) { }
}

export class GetEmployees {
    static readonly type = "[Employee] Get";

    constructor(public filter?: any) { }
}

export class UpdateEmployee {
    static readonly type = "[Employee] Update";

    constructor(public payload: Employee, public id: number) { }
}

export class DeleteEmployee {
    static readonly type = "[Employee] Delete";

    constructor(public id: number) { }
}

export class SetSelectedEmployee {
    static readonly type = "[Employee] Set";

    constructor(public payload: Employee) { }
}

export class SetEditEmployeeMode {
    static readonly type = "[Employee] SetEditMode";
}

export class SetCreatedEmployeeId {
    static readonly type = "[Employee] SetCreatedEmployeeId";

    constructor(public id: number) { }
}
