import { ActivatedRoute, CanDeactivate, Router, } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CustomValidators } from 'ng2-validation';

@Component({
    selector: 'app-prospecto',
    templateUrl: './prospecto.component.html',
    styleUrls: ['./prospecto.component.scss']
})

export class ProspectoComponent implements OnInit {
    constructor(
        private _Route: ActivatedRoute,
    ) { };
    ngOnInit() { 
    }
}   