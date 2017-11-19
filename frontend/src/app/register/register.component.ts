import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from "@angular/core";


@Component({
    selector: 'register-app',
    templateUrl: 'register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
    title = 'register';
    registerForm: FormGroup;
    errorMsg: string;

    constructor (private formBuilder: FormBuilder,
                 private router: Router){}
    
    ngOnInit(){
        this.registerForm = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            emailConfirmation: ['', Validators.required],
            password: ['', Validators.required],
            passwordConfirmation: ['', Validators.required],
            cpf: ['', Validators.required],
            course: ['', Validators.required],
            institution: ['', Validators.required]
        });
    }

    register(){
        var register = this.registerForm.value;
        console.log(register);
    }
}