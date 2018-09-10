import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seguimiento-vacante',
  templateUrl: './seguimiento-vacante.component.html',
  styleUrls: ['./seguimiento-vacante.component.scss']
})
export class SeguimientoVacanteComponent implements OnInit {
  RequisicionId: any;
  Folio: any;
  Vacante: any;
  ClienteId: any;
  enProceso: any;
  enProcesoMostrar: boolean;

  constructor(
    private _Router : ActivatedRoute
  ) { 
    this._Router.params.subscribe(params => {
      if(params['VacanteId'] != null && params['Folio']  != null && params['VBtra']  != null ){
        this.RequisicionId = params['VacanteId'];
        this.Folio = params['Folio'];
        this.Vacante = params['VBtra'];
        this.ClienteId = params['ClienteId'];
        this.enProceso = params['enProceso'];
      }
    });
  }

  ngOnInit() {
  }

}
