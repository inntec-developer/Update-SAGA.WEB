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
  public Finalista: string = '0';
  public Aceptado: string = '0';
  public Rechazado: string = '0';

  public Entrevistadopor: string = '0';
  public Enviadopor: string = '0';
  public Contratadopor: string = '0';
  public Finalistapor: string = '0';
  public Aceptadopor: string = '0';
  public Rechazadopor: string = '0';


  constructor(private service:ReportesService) { }

  ngOnInit() {
    this.UsuarioId = sessionStorage.getItem('id');

    this.service.getVRadial(this.UsuarioId).subscribe(item =>{
      this.Entrevistado = item['entrevi'];
      this.Entrevistadopor = item['entrevTotal'];

      this.Finalista = item['finalista'];
      this.Finalistapor = item['finaTotal'];

      this.Enviado = item['enviado'];
      this.Enviadopor = item['enviadoTotal'];

      this.Aceptado = item['aceptado'];
      this.Aceptadopor = item['acepTotal'];

      this.Rechazado = item['recha'];
      this.Rechazadopor = item['rechaTotal'];

      this.Contratado = item['contrata'];
      this.Contratadopor = item['contraTotal'];
     
      
     
    })
    // var cadena = this.Entrevistadopor;
    // let div = document.getElementById("RadialEntre");
    // console.log(cadena);
    // console.log(cadena.substring(0, 1));
    // let cade = cadena.substring(0, 1) + '0';
    // console.log('radial-bar-'+ cade);
    // div.classList.add('radial-bar-'+ cade);
   
  }

}
