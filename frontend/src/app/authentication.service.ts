import { User } from './user';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


// export class User {
//     constructor (
//         public username: string,
//         public password: string
//     ) {}
// }
// var users = [
//     new User('admin', '123456'),
//     new User('user', '123456')
// ];

@Injectable()
export class AuthenticationService {
    baseUrl: string = 'http://localhost:4567';

    constructor (private router: Router,
                 private http: Http){}
    // users: User [];

    getBook(id: number): Observable<User> {
    const url = `${this.baseUrl}/books/${id}`;
    return this.http.get(url)
    .map(response => response.json() as User);
    }

    // login_old(user){
    //     var authenticatedUser = users.find(u => u.username === user.username);
    //     if (authenticatedUser && authenticatedUser.password === user.password){
    //         localStorage.setItem("user", JSON.stringify(authenticatedUser));
    //         this.router.navigate(['/home']);
    //         return true;
    //     }
    //     return false;
    // }

    login(email: string): Observable<User> {
        const url = `${this.baseUrl}/users?email=${email}`;
        return this.http.get(url)
            .map(response => response.json() as User);
    }

    checkCredentials(){
        if (localStorage.getItem("user") === null){
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