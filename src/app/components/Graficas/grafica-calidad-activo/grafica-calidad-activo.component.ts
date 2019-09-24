import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ComponentsService } from './../../../service/Components/components.service';
import { SettingsService } from '../../../core/settings/settings.service';

@Component({
  selector: 'app-grafica-calidad-activo',
  templateUrl: './grafica-calidad-activo.component.html',
  styleUrls: ['./grafica-calidad-activo.component.scss']
})
export class GraficaCalidadActivoComponent implements OnInit {

  Chart: Chart;
  Data: any;
  private UsuarioId: any;
  public NumeroVacantes: number;
  public EstadoVacante: string;
  public ShowModal: boolean;
  public vencidas : number;
  public vigentes : number;

  constructor(
    private servicio:ComponentsService,
    private settings: SettingsService
  ) { }

  ngOnInit() {
    this.UsuarioId = this.settings.user['id'];
     document.oncontextmenu=null
  this.servicio.getCalidadVigente(this.UsuarioId).subscribe(item =>{
 
    this.vencidas = item['vencidas'];
    this.vigentes = item['vigentes'];
   
   this.Data = {
     datasets: [{
       backgroundColor: [
                       '#0FFF5B',
                       '#FF495F',
                        ],
       data: [
          this.vigentes,
          this.vencidas, 
       ]
     }],
     labels: [
       'A un vigentes',
       'Ya vencidas',
     ]
   }
   this.Chart = new Chart('ActivaVic', {
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
