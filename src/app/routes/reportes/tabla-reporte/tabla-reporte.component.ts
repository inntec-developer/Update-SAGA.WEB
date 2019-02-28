import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import {ToasterConfig, ToasterService} from 'angular2-toaster';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { ReportesService } from '../../../service/Reporte/reportes.service';
import {Http} from '@angular/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiConection } from '../../../service/api-conection.service';



@Component({
  selector: 'app-tabla-reporte',
  templateUrl: './tabla-reporte.component.html',
  styleUrls: ['./tabla-reporte.component.scss'],
  providers:[ReportesService]
})
export class TablaReporteComponent implements OnInit {
  @Input('data') valor:any;
  public General : any[];
  constructor(
    private Servicio: ReportesService
  ) { }

  ngOnInit() {
  
  }

  Generar(){
    
    this.Servicio.GetInforme()
    .subscribe( data => {
    // this.popGenerico(data.mensaje,data.bandera,'Publicacion');
    this.General = data;
    console.log(this.General)
    });
  }

}
