import { Component, EventEmitter, OnInit, Output, } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { RequisicionesService } from '../../../../../service';
import { UpdateInfoRequiComponent } from '../update-info-requi/update-info-requi.component'
import { ViewCuerpoRequiComponent } from '../view-cuerpo-requi/view-cuerpo-requi.component';

@Component({
  selector: 'app-update-requisicion',
  templateUrl: './update-requisicion.component.html',
  styleUrls: ['./update-requisicion.component.scss'],
  providers: [RequisicionesService]
})
export class UpdateRequisicionComponent implements OnInit {
  public requiId : string;
  public folio: number;
  public Horarios: any;
  public EstatusRequi: any;
  public TipoReclutamiento: any;
  constructor( private _Router: ActivatedRoute, private _RequiService: RequisicionesService) {
    
  }
  ngOnInit(){
    this._Router.params.subscribe(params => {
      if(params['IdRequi'] != null){
        this.requiId = params['IdRequi'];
        this.folio = params['Folio'];
        this.EstatusRequi = params['EstatusId'],
        this.TipoReclutamiento = params['TipoReclutamientoId']
        this._RequiService.getRequiHorarios(this.requiId).subscribe(result => {
          this.Horarios = result;
        })
      }
      else{
        console.log("Error al Cargarla Información");
      }
    });
   }
}
