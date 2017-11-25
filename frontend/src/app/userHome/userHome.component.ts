import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from "@angular/core";
import { RegisterService } from '../register.service';
import { User } from '../user';


@Component({
    selector: 'userHome-app',
    templateUrl: 'userHome.component.html',
    styleUrls: ['./userHome.component.scss']
})
export class UserHomeComponent{
    title = 'register';
    registerForm: FormGroup;
    errorMsg: string;
    reg: User;

    public message: string = JSON.parse(localStorage.getItem('user'))[0].firstname;

}