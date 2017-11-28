import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ModalComponent } from './../modal/modal.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './../models/user';


@Component({
    selector: 'login-app',
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {
    title = 'login';
    loginForm: FormGroup;
    user: User;
    users: User[] = [];
    errorMsg: string;

    constructor (private formBuilder: FormBuilder,
                 private router: Router,
                 private service: AuthenticationService,
                 private dialog: DialogService){}
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
                if(Object.keys(this.user).length != 0) {
                  if (user.password === this.user[0].password){
                    // console.log(this.user);
                    localStorage.setItem("user", JSON.stringify(this.user));
                    this.router.navigate(['/user']);
                }
              } else {
                this.dialog.addDialog(ModalComponent, {
                  title: "Erro de autenticação",
                  message: "E-mail ou senha incorretos!"
                });
              }
            });


    }
}
