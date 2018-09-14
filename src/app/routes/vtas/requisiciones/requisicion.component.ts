import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { DtDamfoComponent } from './components/dt-damfo/dt-damfo.component'

// Componentes


@Component({
    selector: 'app-requisicion',
    templateUrl: './requisicion.component.html',
    styleUrls: ['./requisicion.component.scss'],
})

export class RequisicionComponent implements OnInit {
    ruta: any;
    constructor(
        private activateRoute : ActivatedRoute
    ) {
        this.ruta = this.activateRoute.snapshot.routeConfig.data;
        sessionStorage.setItem('ruta', this.ruta.componente);
    }
    //Varaibales Globales
    ngOnInit() {

    }
}
