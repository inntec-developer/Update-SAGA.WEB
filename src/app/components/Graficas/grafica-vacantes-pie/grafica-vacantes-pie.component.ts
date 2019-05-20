import { Component, OnInit } from '@angular/core';

import { Chart } from 'chart.js';
import { ComponentsService } from './../../../service/Components/components.service';
import { DataTableModule } from 'primeng/primeng';
import { SettingsService } from '../../../core/settings/settings.service';

@Component({
  selector: 'app-grafica-vacantes-pie',
  templateUrl: './grafica-vacantes-pie.component.html',
  styleUrls: ['./grafica-vacantes-pie.component.scss'],
  providers: [ComponentsService]
})


export class GraficaVacantesPieComponent implements OnInit {

  constructor(private _ServiceComponente: ComponentsService, private settings: SettingsService) {
  }

  public Chart: Chart;
  public Data: any;
  public UsuarioId: any;
  public ShowModal: boolean;
  public EstadoVacante: string;
  public NumeroVacantes: number;
  public RegistrosT: number = 0;
  ngOnInit() {
    this.UsuarioId = this.settings.user['id'];
    Chart.defaults.scale.ticks.beginAtZero = true;
    this._ServiceComponente.getGraficaVPA(this.UsuarioId).subscribe(result => {
      let vigentes = result['vigentes'];
      let porVecner = result['porVencer'];
      let vencidas = result['vencidas'];
      this.RegistrosT = vigentes + porVecner + vencidas;

      this.Data = {
        datasets: [{
          backgroundColor: ['#00FF00', '#FFCC00', '#FF3300'],
          data: [vigentes, porVecner, vencidas]
        }],
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
          'Vigentes: ',
          'Por Vencer: ',
          'Vencidas: '
        ]
      }
      this.Chart = new Chart('canvas', {
        type: 'polarArea',
        title: { text: 'Seguimiento de Vacantes' },
        data: this.Data,
        options: {
          responsive: true,
          onClick: this.detectedClick.bind(this),
          scale: {
            display: true
          },
          legend: {
            position: 'right',
            display: true,
            labels:{
              fontSize: 12,
              boxWidth: 10,
              usePointStyle: true,
              padding: 5
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
