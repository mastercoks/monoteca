import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './../models/user';


@Component({
    selector: 'login-app',
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [AuthenticationService]
})
export class LoginComponent implements OnInit{
    title = 'login';
    loginForm: FormGroup;
    user: User;
    users: User[] = [];
    errorMsg: string;
    
    constructor (private formBuilder: FormBuilder,
                 private router: Router,
                 private service: AuthenticationService){}
    ngOnInit(){
        this.service.logout();
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    login() {
        var user = this.loginForm.value as User;
        // console.log(user.username);
        this.service.login(user.email)
            .subscribe(authenticatedUser => {
                this.user = authenticatedUser;
                if (user.password === this.user[0].password){
                    // console.log(this.user);
                    localStorage.setItem("user", JSON.stringify(this.user));
                    this.router.navigate(['/user']);
                } else{
                    console.log(user.password);
                    console.log(this.user[0].password);
                    console.log("E-mail ou senha incorreto");
                    this.errorMsg = 'E-mail ou senha incorreto';
                }

            });
        
        
    }
}