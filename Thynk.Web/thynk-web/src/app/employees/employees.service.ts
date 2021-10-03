import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseHttpService } from "../common/base-http.service";

import { Employee } from "./employee.model";

const entity = "employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeesService extends BaseHttpService<Employee> {
    constructor(protected http: HttpClient) {
        super(entity);
    }
}