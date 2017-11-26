import { MonographService } from './../services/monograph.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Monograph } from '../models/monograph';

@Component({
    selector: 'monograph-app',
    templateUrl: 'monograph.component.html',
    styleUrls: ['./monograph.component.scss'],    
})
export class MonographComponent implements OnInit{
    title = 'monograph';
    monographForm: FormGroup;
    mono: Monograph;
    errorMsg: string;
    
    constructor (private formBuilder: FormBuilder,
                 private router: Router,
                 private service: MonographService){}
    ngOnInit(){
        this.monographForm = this.formBuilder.group({
            title: ['', Validators.required],
            abstract: ['', Validators.required],
            author: ['', Validators.required]
        });
    }
    x: any;
    y: any[];
    submit(){
        this.mono = this.monographForm.value as Monograph;
        this.mono.sender = JSON.parse(localStorage.getItem('user'))[0].email;
        this.mono.date = new Date();
        // console.log(this.mono);
        this.service.create(this.mono).subscribe(res =>{
            console.log;
        });
    }      
}