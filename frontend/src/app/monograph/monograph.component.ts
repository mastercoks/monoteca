import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ModalComponent } from './../modal/modal.component';
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
                 private route: ActivatedRoute,
                 private service: MonographService,
                 private dialog: DialogService){}
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
            this.dialog.addDialog(ModalComponent, {
                title: "Confirmação",
                message: "Monografia cadastrada com sucesso"
            }).subscribe(
                (isClosed)=>{
                    if(isClosed){
                        this.router.navigate(['user']);
                        // this.router.navigate(['../monograph'], { relativeTo: this.route })
                        // this.router.navigateByUrl('user/monograph');
                    }
                }
            )
        });
    }      
}