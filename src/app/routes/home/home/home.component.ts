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
    direccionId : string;
    constructor(
    ) {
        this.direccionId  =  '6d177620-7c54-e811-80e0-9e274155325e'
     }

    ngOnInit() {
    }
    getIdCandidato(event){
        console.log(event);
    }
}
    