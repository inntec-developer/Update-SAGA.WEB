import { Component, Input, OnInit } from '@angular/core';

import { Chart } from 'chart.js';
import { ComponentsService } from './../../../service/Components/components.service';
import { DataTableModule } from 'primeng/primeng';
import { SettingsService } from '../../../core/settings/settings.service';

@Component({
  selector: 'app-grafica-vacante-cubierta',
  templateUrl: './grafica-vacante-cubierta.component.html',
  styleUrls: ['./grafica-vacante-cubierta.component.scss'],
  providers: [ComponentsService]
})

export class GraficaVacanteCubiertaComponent implements OnInit {

  constructor(
    private _ServiceComponente: ComponentsService,
    private settings: SettingsService
    ) {
  }

  Chart: Chart;
  Data: any;
  private UsuarioId: any;
  public NumeroVacantes: number;
  public EstadoVacante: string;
  public ShowModal: boolean;
  
  ngOnInit() {
    this.UsuarioId = this.settings.user['id'];
    this._ServiceComponente.getVCubierta(this.UsuarioId).subscribe(result => {

      let cubiertas = result['cubiertas'];
      let parcialmente = result['parcialmente'];
      let medios = result['medios'];
      let cubiertacliente = result['cubiertacliente'];
      let promocion = result['promocion'];
      let opera = result['opera'];



    // Chart.defaults.scale.ticks.beginAtZero = true;
    document.oncontextmenu=null
  this.NumeroVacantes = result['total'];

  this.Data = {
    datasets: [{
      backgroundColor: [
        '#3F3CFF',
        '#F335FF',
        '#C5FF60',
        '#FF4B4B',
        '#f7f707',
        '#30d356',
         ],
      data: [cubiertas,
            parcialmente,
            medios,
            cubiertacliente,
            promocion,
            opera
          ]
    }],
    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
      'Cubiertas',
      'Parcialmente',
      'Por Medios',
      'Por el Cliente',
      'Promocion Interna',
      'Operaciones'
    ]
  }

    this.Chart = new Chart('canvas', {
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
      }
    });

  });
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
