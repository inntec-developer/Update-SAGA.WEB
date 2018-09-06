import { ActivatedRoute, CanDeactivate, Router, } from '@angular/router';
import {Component, OnInit} from '@angular/core';

import { debug } from 'util';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    providers: []
})
export class HomeComponent implements OnInit {
    usuario: string;
    constructor(
    ) { }
    ngOnInit() {
    }
    getIdCandidato(event){
        console.log(event);
    }
}
    