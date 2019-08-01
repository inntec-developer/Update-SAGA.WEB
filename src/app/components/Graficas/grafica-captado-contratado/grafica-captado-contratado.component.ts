import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ComponentsService } from './../../../service/Components/components.service';
import { SettingsService } from '../../../core/settings/settings.service';

@Component({
  selector: 'app-grafica-captado-contratado',
  templateUrl: './grafica-captado-contratado.component.html',
  styleUrls: ['./grafica-captado-contratado.component.scss']
})
export class GraficaCaptadoContratadoComponent implements OnInit {

  Chart: Chart;
  Data: any;
  private UsuarioId: any;
  public NumeroVacantes: number;
  public EstadoVacante: string;
  public ShowModal: boolean;
  public captado : number;
  public contratado : number;

  constructor(
    private servicio:ComponentsService,
    private settings: SettingsService
  ) { }

  ngOnInit() {

     var Onombre = [];
     var Opos = [];
     var Ocub = [];
     var Opunta = [];
     this.UsuarioId = this.settings.user['id'];
      document.oncontextmenu=null
   this.servicio.getCaptadoContratado(this.UsuarioId).subscribe(item =>{
 
    console.log(item);
     item.forEach(item2 => {
       Onombre.push(item2.nombre)
       Opos.push(item2.numeropos)
       Ocub.push(item2.cubiertas)
       Opunta.push(item2.puntaje)
      });

     this.Data = {
       labels: Onombre,
       datasets: [
         {
           label: "Captados",
           backgroundColor: "#FF8F35",
           data: Opos
         }, {
           label: "Enviados",
           backgroundColor: "#3cba9f",
           data: Ocub
         }
         , {
           label: "Cubiertos",
           backgroundColor: "#0FFF5B",
           data: Opunta
         }
       ]
     }
 
    this.Chart = new Chart('captadoContratado', {
      type: 'bar',
      data: this.Data,
      options: {
       title: {
         text: 'Population growth (millions)'
       },
       legend: {
               position: 'right',
               display: true,
               labels:{
                 fontSize: 9,
                 boxWidth: 10,
                 usePointStyle: true,
                 padding: 3
               }
             },
      },
    });
 
   })

  // this.servicio.getCaptadoContratado(this.UsuarioId).subscribe(item =>{
  //   this.captado = item['captado'];
  //   this.contratado = item['contratado'];
  //  this.Data = {
  //    datasets: [{
  //      backgroundColor: [
  //                      '#FF8F35',
  //                      '#3cba9f',
  //                       ],
  //      data: [
  //         this.captado,
  //         this.contratado 
  //      ]
  //    }],
  //    labels: [
  //      'Captado',
  //      'Contratado',
  //    ]
  //  }
  //  this.Chart = new Chart('captadoContratado', {
  //    type: 'pie',
  //    title: { text: 'Seguimiento de Vacantes' },
  //    data: this.Data,
  //    options: {
  //     onClick: this.detectedClick.bind(this),
  //      legend: {
  //        position: 'right',
  //        display: true,
  //        labels:{
  //          fontSize: 9,
  //          boxWidth: 10,
  //          usePointStyle: true,
  //          padding: 3
  //        }
  //      },
  //    },
  //  });
  // })
  }

}
