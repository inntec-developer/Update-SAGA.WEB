import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ComponentsService } from './../../../service/Components/components.service';
import { SettingsService } from '../../../core/settings/settings.service';
declare var $: any;

@Component({
  selector: 'app-grafica-calidad-vencida',
  templateUrl: './grafica-calidad-vencida.component.html',
  styleUrls: ['./grafica-calidad-vencida.component.scss']
})
export class GraficaCalidadVencidaComponent implements OnInit {

  constructor(
    private _ServiceComponente: ComponentsService,
    private settings: SettingsService
    ) {
  }

  Chart: Chart;
  Data: any;
  private UsuarioId: any;
  public NumeroVacantes: number;
  public TotalVacantes: number;
  public EstadoVacante: string;
  public ShowModal: boolean;
  
  ngOnInit() {
    this.UsuarioId = this.settings.user['id'];
    var Onombre = [];
     var Ocubierta = [];
     var Oparcial = [];
     var Ovalor = [];
   
    this._ServiceComponente.getCalidadEntiempo(this.UsuarioId).subscribe(result => {
      result.forEach(item2 => {
        Onombre.push(item2.nombre + " "+ item2.totalcubierta )
        Ocubierta.push(item2.cubierta)
        Oparcial.push(item2.parcial)
        Ovalor.push(item2.nombre + "1")
       });
    // Chart.defaults.scale.ticks.beginAtZero = true;
    document.oncontextmenu=null

    this.Chart = new Chart('canvas', {
      type: 'bar',
  data: {
    labels: Onombre,
    // value:Ovalor,
    datasets: [
      {
        label: 'Vencida',
        data: Oparcial,
        backgroundColor: [
          '#FF8F35',
          '#FF8F35',
          '#FF8F35',
          '#FF8F35',
          '#FF8F35',
          '#FF8F35',
          '#FF8F35'
        ],
        borderWidth: 2
      },
      {
        label: 'En tiempo',
        data: Ocubierta,
        backgroundColor: [
          '#0F3CFF',
          '#0F3CFF',
          '#0F3CFF',
          '#0F3CFF',
          '#0F3CFF',
          '#0F3CFF',
          '#0F3CFF'
        ],
        borderWidth: 2
      }
    ]
  },
      options: {
        onClick: this.detectedClick.bind(this),
        scales: {
          yAxes: [{
            stacked: true,
            ticks: {
              beginAtZero: true
            }
          }],
          xAxes: [{
            stacked: true,
            ticks: {
              beginAtZero: true
            }
          }]
        },
        legend: {
          position: 'right',
          display: true,
          labels: {
            fontSize: 9,
            boxWidth: 10,
            usePointStyle: true,
            padding: 3
          }
        },
      }
    });
  });
  }

  detectedClick(evt: any) {
    let ActivatEvent = this.Chart.getElementAtEvent(evt);
    if (ActivatEvent[0]) {
      var chartData = ActivatEvent[0]['_chart'].config.data;
      var idx = ActivatEvent[0]['_index'];
      this.EstadoVacante = chartData.value[idx];
      this.NumeroVacantes = 10;
      this.ShowModal = true;
    }
  }

}
