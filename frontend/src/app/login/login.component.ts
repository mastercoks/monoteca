import { AuthenticationService, User } from './../authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // login_old(){
    //     var user = this.loginForm.value as User;
    //     console.log(user);
    //     if(!this.service.login(user)){
    //         this.errorMsg = 'Failed to login';
    //     }
    //     console.log(this.service.login(user.username));
    // }

    login() {
        var user = this.loginForm.value as User;
        console.log(user.username);
        this.service.login(user.username)
            .subscribe(authenticatedUser => {
                this.user = authenticatedUser;
                console.log(this.user);
                localStorage.setItem("user", JSON.stringify(this.user));
            });

    }
}
