import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { SettingsService } from '../../../../../core/settings/settings.service';
import { ViewCuerpoRequiComponent } from '../view-cuerpo-requi/view-cuerpo-requi.component';
import { ViewInforRequiComponent } from '../view-info-requi/view-info-requi.component';

@Component({
  selector: 'app-view-requisicion',
  templateUrl: './view-requisicion.component.html',
  styleUrls: ['./view-requisicion.component.scss']
})
export class ViewRequisicionComponent implements OnInit {
  public imprimir: boolean;

  public RequisicionId: string;
  public Folio: number;
  public estatusId: number;
  public Vacante: any;
  public TipoReclutamiento: any;

  constructor(
    private _Router: Router,
    private _Route: ActivatedRoute,
    private settings: SettingsService
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

  print(){
    this.imprimir = true;
    if(!this.settings.layout.isCollapsed){
        this.settings.layout.isCollapsed = !this.settings.layout.isCollapsed;
    }
    setTimeout(() => {
      document.getElementById('content').style.marginLeft = "60px";
      document.getElementById('content').style.marginTop = "15px";
      document.getElementById('content').style.marginRight = "0px";
      document.getElementById('content').style.marginBottom = "15px";

      window.print();
    }, 500);
    setTimeout(() => {
      this.imprimir = false;
      document.getElementById('content').style.marginTop = "0";
      document.getElementById('content').style.marginLeft = "0";
    }, 500);
  }
}
