import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
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

  public uploadImage(payload?: FormData): Observable<string> {
    return this.http.post<any>(`${environment.baseUrl}/${entity}/storage`, payload);
  }

  public image(image: string): string {
    return `${environment.baseUrl}/${entity}/storage/${image}`
  }
}