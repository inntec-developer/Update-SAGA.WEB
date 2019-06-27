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
    this.UsuarioId = this.settings.user['id'];
     document.oncontextmenu=null
  this.servicio.getCaptadoContratado(this.UsuarioId).subscribe(item =>{
 
    this.captado = item['captado'];
    this.contratado = item['contratado'];
   
   this.Data = {
     datasets: [{
       backgroundColor: [
                       '#FF8F35',
                       '#3cba9f',
                        ],
       data: [
          this.captado,
          this.contratado 
       ]
     }],
     labels: [
       'Captado',
       'Contratado',
     ]
   }
   this.Chart = new Chart('captadoContratado', {
     type: 'pie',
     title: { text: 'Seguimiento de Vacantes' },
     data: this.Data,
     options: {
      onClick: this.detectedClick.bind(this),
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
  }

  detectedClick(evt: any) {
    let ActivatEvent = this.Chart.getElementAtEvent(evt);
    if (ActivatEvent[0]) {
      var chartData = ActivatEvent[0]['_chart'].config.data;
      var idx = ActivatEvent[0]['_index'];
      this.EstadoVacante = chartData.labels[idx];
      this.NumeroVacantes = chartData.datasets[0].data[idx];
      this.ShowModal = true;
    }
  }

}
