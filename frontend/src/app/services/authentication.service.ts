import { User } from './../models/user';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {
    baseUrl: string = 'http://localhost:4567';

    constructor (private router: Router,
                 private http: Http){}

    login(email: string): Observable<User> {
        const url = `${this.baseUrl}/users?email=${email}`;
        return this.http.get(url)
            .map(response => response.json() as User);
    }

    checkCredentials(){
        // try {
        //     if("user" in localStorage){
        //         alert('yes');
        //     } else {
        //         this.router.navigate(['/login']);
        //     }   
        // } catch (exception){

        // } finally {
        //     this.router.navigate(['/login']);
        // }
        var teste =sessionStorage.getItem("user");
        if (teste == null || teste == "null" || teste === null || teste === "null"){
            this.router.navigate(['/login']);
        }
     

    }
    checkCredentials2(){
        if (localStorage.getItem("user") === null){
            return false;
        }
        return true;
    }    

    logout(){
        localStorage.removeItem("user");
        this.router.navigate(['/login']);
    }
}