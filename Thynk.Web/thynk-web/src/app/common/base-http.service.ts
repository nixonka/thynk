import { take } from "rxjs/operators";

import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

export interface BaseHttpService<T> {
    fetch(): any;
    fetchById(id: number): any;
    delete(id: number): any;
    add(payload: T): any;
    update(payload: T, id: number): any;
}

export interface BaseResponse<T> {
    count: number;
    data: T[];
    errors: any;
    message: any;
    pageNumber: number;
    pageSize: number;
    succeeded: boolean;
}


export abstract class BaseHttpService<T> implements BaseHttpService<T> {

    protected abstract http: HttpClient;

    constructor(
        public entity: string
    ) {
        this.entity = entity;
    }

    public fetch(pageNumber?: number, pageSize?: number) {
        return (pageSize && pageNumber)
            ? this.http.get<any>(`${environment.baseUrl}/${this.entity}/?pagenumber=${pageNumber}&pagesize=${pageSize}`)
            : this.http.get<any>(`${environment.baseUrl}/${this.entity}`);
    }

    public fetchAsync() {
        return this.fetch().pipe(take(1)).toPromise();
    }

    public fetchById(id: number) {
        return this.http.get<T>(`${environment.baseUrl}/${this.entity}/${id}`);
    }

    public fetchByIdAsync(id: number) {
        return this.fetchById(id).pipe(take(1)).toPromise();
    }

    public delete(id: number) {
        return this.http.delete(`${environment.baseUrl}/${this.entity}/${id}`);
    }

    public add(payload: T) {
        return this.http.post<any>(`${environment.baseUrl}/${this.entity}`, payload);
    }

    public update(payload: T, id: number) {
        return this.http.put<any>(`${environment.baseUrl}/${this.entity}/${id}`, payload);
    }
}
