import { User } from './../models/user';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RegisterService {
    baseUrl: string = 'http://localhost:4567';

    constructor(private router: Router,
        private http: Http) { }

    create(user: User){
        const url = `${this.baseUrl}/users`;
        return this.http.post(url, user).map(response => {
            console.log('Cadastro realizado');
            response.json() as User;
        });
    }
}