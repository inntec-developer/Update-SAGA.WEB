import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { ReportesService } from '../../../service/Reporte/reportes.service';
import {Http} from '@angular/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.scss']
})
export class IndicadoresComponent implements OnInit {
 
  public UsuarioId: any;

  public Entrevistado: string = '0';
  public Enviado: string = '0';
  public Contratado: string = '0';

  public Entrevistadopor: string = '0';
  public Enviadopor: string = '0';
  public Contratadopor: string = '0';

  constructor(private service:ReportesService) { }

  ngOnInit() {
    this.UsuarioId = sessionStorage.getItem('id');
debugger;
    this.service.getVRadial(this.UsuarioId).subscribe(item =>{
      this.Entrevistado = item['entrevi'];
      this.Entrevistadopor = item['entrevTotal'];
      this.Enviadopor = item['enviadoTotal'];
      this.Enviado = item['enviado'];
      this.Contratadopor = item['contraTotal'];
      this.Contratado = item['contrata'];
    })
  }

}
