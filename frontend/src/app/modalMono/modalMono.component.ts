import { Monograph } from './../models/monograph';
import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
export interface ConfirmModel {
  title:string;
  message:string;
}
@Component({  
    selector: 'confirm',
    templateUrl: "modalMono.component.html"
})
export class ModalMonoComponent extends DialogComponent<Monograph, boolean> implements Monograph {

    title: string;
    abstract: string;
    author: string;    
    sender: string;
    date: Date;

  constructor(dialogService: DialogService) {
    super(dialogService);
  }

  onClose(){
    // console.log("Fechado");
    this.result = true;
    this.close();
  }
}