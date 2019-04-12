import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ViewCuerpoRequiComponent } from '../view-cuerpo-requi/view-cuerpo-requi.component';
import { ViewInforRequiComponent } from '../view-info-requi/view-info-requi.component';

@Component({
  selector: 'app-view-requisicion',
  templateUrl: './view-requisicion.component.html',
  styleUrls: ['./view-requisicion.component.scss']
})
export class ViewRequisicionComponent implements OnInit {

  public RequisicionId: string;
  public Folio: number;
  public estatusId: number;
  public Vacante: any;
  public TipoReclutamiento: any;

  constructor(
    private _Router: Router,
    private _Route: ActivatedRoute,
  ) {
    this._Route.params.subscribe(params => {
      if (params['IdRequi'] != null && params['Folio'] != null) {
        this.RequisicionId = params['IdRequi'];
        this.Folio = params['Folio'];
        this.Vacante = params['Vacante'];
        this.TipoReclutamiento = params['TipoReclutamientoId']
      }
    });
  }
  ngOnInit() { }

  editRequi() {
    this._Router.navigate(['/ventas/edicionRequisicion', this.RequisicionId, this.Folio, this.estatusId, this.TipoReclutamiento], { skipLocationChange: true });
  }

  getEstatusRequi(event) {
    this.estatusId = event;
  }
}
