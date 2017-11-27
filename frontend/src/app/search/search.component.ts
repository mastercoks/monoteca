import { ModalComponent } from './../modal/modal.component';
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
import { DialogService } from 'ng2-bootstrap-modal/dist/dialog.service';

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
    filteredMonos: Monograph[];
    monographs: Array<string> = [];
    searchInputTerm: string = '';

    @Output() search = new EventEmitter<string>();

    constructor(private formBuilder: FormBuilder,
        private router: Router,
        private service: MonographService,
        private dialogService: DialogService) { }

    ngOnInit() {
        this.getMonos();
        Observable.fromEvent(this.searchInput.nativeElement, 'keyup')
            .debounceTime(400)
            .distinctUntilChanged()
            .map((event: KeyboardEvent) => (<HTMLInputElement>event.target).value)
            .switchMap(title => this.getMonoTitles(title))
            .subscribe(monoTitles => this.monographs = monoTitles);

        Observable.fromEvent(this.suggestions.nativeElement, 'click')
            .map((event: KeyboardEvent) => (<HTMLInputElement>event.target).innerText)
            .subscribe(res => {
                console.log("Clicado");
                console.log(res);
                this.searchInputTerm = res;
                this.monographs = [];
            });
    }

    getMonos() {
        this.service.getMonos().
            subscribe(monos => this.monosList = monos);
    }

    getMonoTitles(title: string): Observable<string[]> {
        return Observable.of(this.filterMonos(title).map(mono => mono.title));
    }

    filterMonos(title: string): Monograph[] {
        return title ?
            this.monosList.filter((mono) => new RegExp(title, 'gi').test(mono.title)) :
            [];
    }

    searchMonos() {
        this.monographs = [];
        this.filteredMonos = this.filterMonos(this.searchInputTerm.valueOf());

    }    

}