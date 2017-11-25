import { Monograph } from '../models/monograph';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';


@Injectable()
export class MonographService {
    baseUrl: string = 'http://localhost:4567';

    constructor(private router: Router,
        private http: Http) { }

    create(mono: Monograph){
        const url = `${this.baseUrl}/monographs`;
        return this.http.post(url, mono).map(response => {
            console.log('Cadastro realizado');
            response.json() as Monograph;
        });
    }

    // getBookTitles(title: string): Observable<string[]> {
    //     return Observable.of(this.filterBooks(title).map(book => book.title));
    //   }
    
    //   filterBooks(title: string): Monograph[] {
    //     var booksList: Monograph[] = this.getMonos();
    //     return title ?
    //       booksList.filter((book) => new RegExp(title, 'gi').test(book.title)) :
    //       [];
    //   }
    
    getMonos() {
        const url = `${this.baseUrl}/monographs`;
        return this.http.get(url)
            .map(response => response.json() as Monograph[]);
    }
}