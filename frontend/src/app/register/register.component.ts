import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from "@angular/core";
import { RegisterService } from '../register.service';
import { User } from '../user';


@Component({
    selector: 'register-app',
    templateUrl: 'register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
    title = 'register';
    registerForm: FormGroup;
    errorMsg: string;
    reg: User;

    constructor (private formBuilder: FormBuilder,
                 private router: Router,
                private service: RegisterService){}
    
    ngOnInit(){
        this.registerForm = this.formBuilder.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],            
            cpf: ['', Validators.required],
            course: ['', Validators.required],
            institution: ['', Validators.required]
        });
        // this.registerForm = this.formBuilder.group({
        //     firstname: ['', Validators.required],
        //     lastname: ['', Validators.required],
        //     email: ['', Validators.required],
        //     // emailConfirmation: ['', Validators.required],
        //     password: ['', Validators.required],
        //     // passwordConfirmation: ['', Validators.required],
        //     cpf: ['', Validators.required],
        //     course: ['', Validators.required],
        //     institution: ['', Validators.required]
        // });
    }

    register(){
        this.reg = this.registerForm.value;
        console.log(this.reg);
        this.service.create(this.reg).subscribe(res =>{
            console.log;
        });
    }    
}