import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class GenericControllers {

    constructor(public http: HttpClient, public router: Router) { }

    public get<TModel>(url: string): Promise<TModel> {
        return new Promise((resolve) => {
            this.http.get(url).subscribe(
                (response) => { resolve(response as TModel); },
                (error) => {
                    resolve(error);
                });
        });
    };

    public post<TModel>(url: string, obj: any[]): Promise<TModel> {
        return new Promise((resolve) => {
            this.http.post(url, obj).subscribe(
                (response) => { resolve(response as TModel); },
                (error) => {
                    resolve(error);
                });
        });
    };

};