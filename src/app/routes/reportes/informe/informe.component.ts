import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
//import {ToasterConfig, ToasterService} from 'angular2-toaster';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { ReportesService } from '../../../service/Reporte/reportes.service';
import {Http} from '@angular/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiConection } from '../../../service/api-conection.service';

@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.scss'],
  providers:[ReportesService],
})
export class InformeComponent implements OnInit {

  constructor(
    private Rutas: ActivatedRoute,
    private Servicio: ReportesService,
    private http: Http,
    private route: ActivatedRoute,
    private router: Router,
 //   private toasterService: ToasterService,
    private spinner: NgxSpinnerService
  ) {
  //  this.toasterService = toasterService;
   }

  ngOnInit() {
  }

  Publicar(){
  this.spinner.show();
  this.Servicio.GetInforme()
   .subscribe( data => {
   // this.popGenerico(data.mensaje,data.bandera,'Publicacion');
    this.spinner.hide();
   });
  }


}
