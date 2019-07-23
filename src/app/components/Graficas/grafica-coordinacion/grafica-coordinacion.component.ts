import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ComponentsService } from './../../../service/Components/components.service';
import { SettingsService } from '../../../core/settings/settings.service';

@Component({
  selector: 'app-grafica-coordinacion',
  templateUrl: './grafica-coordinacion.component.html',
  styleUrls: ['./grafica-coordinacion.component.scss']
})
export class GraficaCoordinacionComponent implements OnInit {
  Chart: Chart;
  Data: any;
  private UsuarioId: any;
  public NumeroVacantes: number;
  public EstadoVacante: string;
  public ShowModal: boolean;
  public masivo : number;
  public especial : number;
  public operativo : number;
  public masivopos : number;
  public especialpos : number;
  public operativopos : number;

  constructor(
    private servicio:ComponentsService,
    private settings: SettingsService
  ) { }

  ngOnInit() {
    this.UsuarioId = this.settings.user['id'];
     document.oncontextmenu=null
  this.servicio.getCoordinacion(this.UsuarioId).subscribe(item =>{
 
    this.masivo = item['masivo'];
    this.operativo = item['operativo'];
    this.especial = item['ezpecial'];
    this.masivopos = item['masivopos'];
    this.operativopos = item['operativopos'];
    this.especialpos = item['especialpos'];
   
   this.Data = {
     datasets: [{
       backgroundColor: [
                       '#4F8AFF',
                       '#FF8F35',
                       '#FF495F',
                        ],
       data: [
          this.masivo,
          this.operativo, 
          this.especial 
       ]
     }],
     labels: [
       'Masivo',
       'Operativo',
       'Especializado',
     ]
   }
   this.Chart = new Chart('coordinacion', {
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
