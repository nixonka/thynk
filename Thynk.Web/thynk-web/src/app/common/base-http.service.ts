import { take } from "rxjs/operators";

import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";

export interface BaseHttpService<T> {
    fetch(): any;
    fetchById(id: string): any;
    delete(id: string): any;
    add(payload: T): any;
    update(payload: T, id: string): any;
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

export const baseUrl = "https://localhost:44369/api/v1";

export abstract class BaseHttpService<T> implements BaseHttpService<T> {

    protected abstract http: HttpClient;

    constructor(
        public entity: string
    ) {
        this.entity = entity;
    }

    public fetch(pageNumber?: number, pageSize?: number) {
        return (pageSize && pageNumber)
            ? this.http.get<any>(`${baseUrl}/${this.entity}/?pagenumber=${pageNumber}&pagesize=${pageSize}`)
            : this.http.get<any>(`${baseUrl}/${this.entity}`);
    }

    public fetchAsync() {
        return this.fetch().pipe(take(1)).toPromise();
    }

    public fetchById(id: number) {
        return this.http.get<T>(`${baseUrl}/${this.entity}/${id}`);
    }

    public fetchByIdAsync(id: number) {
        return this.fetchById(id).pipe(take(1)).toPromise();
    }

    public delete(id: number) {
        return this.http.delete(`${baseUrl}/${this.entity}/${id}`);
    }

    public add(payload: T) {
        return this.http.post<any>(`${baseUrl}/${this.entity}`, payload);
    }

    public update(payload: T, id: number) {
        return this.http.put<any>(`${baseUrl}/${this.entity}/${id}`, payload);
    }
}
