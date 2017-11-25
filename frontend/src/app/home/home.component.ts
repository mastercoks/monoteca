import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from './../authentication.service';
import { Component, OnInit } from '@angular/core';

export class Parametro {
    constructor (
        public mes: number,
        public minimo: number,
        public maximo: number,
        public resposta: string
    ) {}
}
var parametros = [
    new Parametro(1, 0, 80, 'Bom'),
    new Parametro(2, 0, 80, 'Bom'),
    new Parametro(3, 6, 80, 'Bom'),
    new Parametro(3, 0, 5, 'Regular'),
    new Parametro(4, 0, 5, 'Ruim'),
    new Parametro(4, 6, 10, 'Regular'),
    new Parametro(4, 11, 80, 'Bom'),
];

@Component({
    selector: 'home-app',
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit{
    title = 'home';
    avaliacaoForm: FormGroup;
    meses: number[];
    numeros: number[];
    filteredList: any[];

        

    constructor (private service: AuthenticationService,
                 private formBuilder: FormBuilder,
                 ){
                    this.meses = Array(30).fill(0).map((x,i)=>i+1);
                    this.numeros = Array.from(Array(41)).map((x, i) => i );
                 }
    
    ngOnInit(){
        // this.service.checkCredentials();
        this.avaliacaoForm = this.formBuilder.group({
            instrucao: [0],
            leitura: [0]
        });
        // console.log(JSON.parse(localStorage.getItem("user")));
    }

    logout(){
        this.service.logout();
    }
    aux: number;
    onChange(event: any){
        var values = event.target.options;
        var opt: any;
        var selected: number;


        

        for (var i=0, iLen = values.length; i<iLen; i++){
            opt = values[i];
            if (opt.selected){
                this.filteredList = parametros.filter(info => info.mes === parseInt(opt.value));
                console.log(this.avaliacaoForm.value[0]);
                // console.log(this.filteredList.filter(info => info.minimo <= this.avaliacaoForm[1]))
                console.log(parametros.filter(info => info.mes === parseInt(opt.value)));             
                console.log(parametros[opt.value].mes)
                // selected = opt.value;
                // console.log(opt.text);
                // console.log(opt.value);
                
                // console.log(parametros.filter(mes => mes.mes == selected));
            }
        }
        // this.filteredList=this.avaliacaoForm.value;
        // console.log(this.avaliacaoForm.value);
        // console.log(JSON.stringify(this.avaliacaoForm.value));
        // console.log(selected);
        // this.filteredList = parametros.filter(mes => mes.mes === (selected));
        // console.log(parametros.filter(mes => mes.mes === 1));
        // console.log(this.filteredList);
        // this.filteredList = parametros.filter(mes => mes.mes === this.avaliacaoForm.value[0][0]);
        // console.log(this.filteredList.filter(mes => mes.minimo >= 6));
    }
}