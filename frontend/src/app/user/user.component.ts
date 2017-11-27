import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'user-app',
    templateUrl: 'user.component.html',
    styleUrls: ['./user.component.scss'],    
})

export class UserComponent implements OnInit{
    constructor (private service: AuthenticationService){ }
    
    ngOnInit(){
        // if (this.service.checkCredentials()){
        //     console.log("Operação não permitida");
        // }

    //     try {
    //         console.log(sessionStorage.getItem("unset"));
    //     if (sessionStorage.getItem("unset") === null) {
    //       alert("unset is null!");
    //     }
    // } catch(exception){

    // }
    }

}