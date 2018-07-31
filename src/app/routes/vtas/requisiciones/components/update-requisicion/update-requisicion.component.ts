import { Component, OnInit, } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { UpdateInfoRequiComponent } from '../update-info-requi/update-info-requi.component'
import { ViewCuerpoRequiComponent } from '../view-cuerpo-requi/view-cuerpo-requi.component';

@Component({
  selector: 'app-update-requisicion',
  templateUrl: './update-requisicion.component.html',
  styleUrls: ['./update-requisicion.component.scss']
})
export class UpdateRequisicionComponent implements OnInit {
  public requiId : string;
  public folio: number;
  constructor( private _Router: ActivatedRoute) {
    
  }
  ngOnInit(){
    this._Router.params.subscribe(params => {
      if(params['IdRequi'] != null){
        this.requiId = params['IdRequi'];
        this.folio = params['Folio'];
      }
      else{
        console.log("Error al Cargarla Información");
      }
    });
   }
}
