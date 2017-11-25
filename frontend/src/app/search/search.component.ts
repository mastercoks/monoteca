import { Observable } from 'rxjs/Observable';
import { MonographService } from './../services/monograph.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Monograph } from '../models/monograph';

import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
    selector: 'search-app',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    providers: []
})
export class SearchComponent implements OnInit {
    @ViewChild('searchInput') searchInput: ElementRef;
    @ViewChild('suggestions') suggestions: ElementRef;
    title = 'register';
    // searchForm: FormGroup;
    // errorMsg: string;
    // mono: Monograph;
    monosList: Monograph[];
    monographs: Array<string> = [];
    searchInputTerm: string = '';

    @Output() search = new EventEmitter<string>();

    constructor(private formBuilder: FormBuilder,
        private router: Router,
        private service: MonographService) { }

    ngOnInit() {
        this.getMonos();
        Observable.fromEvent(this.searchInput.nativeElement, 'keyup')
            .debounceTime(400)
            .distinctUntilChanged()
            .map((event: KeyboardEvent) => (<HTMLInputElement>event.target).value)
            .switchMap(title => this.getBookTitles(title))
            .subscribe(bookTitles => this.monographs = bookTitles);

        Observable.fromEvent(this.suggestions.nativeElement, 'click')
            .map((event: KeyboardEvent) => (<HTMLInputElement>event.srcElement).innerText)
            .subscribe(res => {
                this.searchInputTerm = res;
                this.monographs = [];
            });
    }

    getMonos() {
        this.service.getMonos().
            subscribe(monos => this.monosList = monos);
    }

    getBookTitles(title: string): Observable<string[]> {
        return Observable.of(this.filterBooks(title).map(book => book.title));
    }
    filterBooks(title: string): Monograph[] {
        return title ?
            this.monosList.filter((book) => new RegExp(title, 'gi').test(book.title)) :
            [];
    }

    searchMonos() {
        this.monographs = [];
        this.search.emit(this.searchInputTerm);
    }
}