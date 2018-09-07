import { ActivatedRoute, CanDeactivate, Router, } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vacantes-postulate',
  templateUrl: './vacantes-postulate.component.html',
  styleUrls: ['./vacantes-postulate.component.scss']
})
export class VacantesPostulateComponent implements OnInit {
  RequisicionId: any;
  Folio: any;
  Vacante: any;
  constructor(
    private _Router: Router,
    private _Route: ActivatedRoute,
  ) { 
    this._Route.params.subscribe(params => {
      if(params['VacanteId'] != null && params['Folio']  != null && params['VBtra']  != null ){
        this.RequisicionId = params['VacanteId'];
        this.Folio = params['Folio'];
        this.Vacante = params['VBtra'];
      }
    });
  }

  ngOnInit() {
  }

}
