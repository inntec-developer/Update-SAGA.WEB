import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

import { DialogEventComponent } from './../../../components/calendario/dialog-event/dialog-event.component';
import { MatDialog } from '@angular/material';

declare var $: any;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    providers: []
})
export class HomeComponent implements OnInit {
    constructor(
    ) {
    }

    ngOnInit() {
      
    }
}