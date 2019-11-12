import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DtDamfoComponent } from './components/dt-damfo/dt-damfo.component'

// Componentes


@Component({
    selector: 'app-requisicion',
    templateUrl: './requisicion.component.html',
    styleUrls: ['./requisicion.component.scss'],
})

export class RequisicionComponent implements OnInit {
    ruta: any;
    folio = '';
    constructor(
        private activateRoute: ActivatedRoute
    ) {
        this.ruta = this.activateRoute.snapshot.routeConfig.data;
        sessionStorage.setItem('ruta', this.ruta.componente);
    }

    ngOnInit() {
        this.getParams();
    }

    getParams() {
        this.activateRoute.params.subscribe(params => {
          if (params['folio'] != null) {
            this.folio = params['folio'];
          }
        });
      }
}
