import { Component, OnInit } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';
import { ReportesService } from '../../../service/Reporte/reportes.service';
import { SettingsService } from '../../../core/settings/settings.service';
import { ComponentsService } from './../../../service/Components/components.service';

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


  public totalFolio : number;
  public totalPos : number;
  public cubierto : number;
  public faltante : number;
  public apartado : number;
  public cita : number;
  public entrevista : number;
  public evaluacion : number;
  public finalist : number;
  public entrecliente : number;
  public fincliente : number;

  constructor(
    private service:ReportesService,
    private spinner: NgxSpinnerService,
    private settings: SettingsService,
    private servicio:ComponentsService,
    ) { }

    

  ngOnInit() {
   // this.spinner.show();
    this.UsuarioId = this.settings.user['id'];


    this.servicio.getVActiva(this.UsuarioId).subscribe(item =>{
   
     this.totalFolio = item['total'];
     this.totalPos = item['numeropos'];
     this.cubierto = item['cubierto'];
     this.faltante = item['faltante'];
     this.apartado = item['apartado'];
     this.cita = item['cita'];
     this.entrevista = item['entrevista'];
     this.evaluacion = item['evaluacion'];
     this.finalist = item['finalista'];
     this.entrecliente = item['entrecliente'];
     this.fincliente = item['fincliente'];

    });

    // this.service.getVRadial(this.UsuarioId).subscribe(item =>{

    //   this.Entrevistado = item['entrevi'];
    //   this.Entrevistadopor = item['entrevTotal'];

    //   this.Finalista = item['finalista'];
    //   this.Finalistapor = item['finaTotal'];

    //   this.Enviado = item['enviado'];
    //   this.Enviadopor = item['enviadoTotal'];

    //   this.Aceptado = item['aceptado'];
    //   this.Aceptadopor = item['acepTotal'];

    //   this.Rechazado = item['recha'];
    //   this.Rechazadopor = item['rechaTotal'];

    //   this.Contratado = item['contrata'];
    //   this.Contratadopor = item['contraTotal'];
    // })

  }

}
