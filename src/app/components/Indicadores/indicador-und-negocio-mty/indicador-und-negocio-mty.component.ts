import { Component, OnInit } from '@angular/core';

import { Chart } from 'chart.js';
import { ComponentsService } from '../../../service';
import { SettingsService } from '../../../core/settings/settings.service';

@Component({
  selector: 'app-indicador-und-negocio-mty',
  templateUrl: './indicador-und-negocio-mty.component.html',
  styleUrls: ['./indicador-und-negocio-mty.component.scss'],
  providers: [ComponentsService]
})
export class IndicadorUndNegocioMtyComponent implements OnInit {

  constructor(
    private _ServiceComponente: ComponentsService,
    private settings: SettingsService
  ) { }

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
    // this._ServiceComponente.getGraficaVPA(this.UsuarioId).subscribe(result => {
      let vigentes = 15;
      let porVecner = 35;
      let vencidas = 5;
      this.RegistrosT = vigentes + porVecner + vencidas;

      this.Data = {
        datasets: [{
          backgroundColor: ['#00FF00', '#FFCC00', '#FF3300'],
          borderColor: '#fff',
          data: [vigentes, porVecner, vencidas]
        }],
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
          'Vigentes',
          'Por Vencer',
          'Vencidas'
        ]
      }

      this.Chart = new Chart('canvasMty', {
        type: 'pie',
        data: this.Data,
        options: {
          hoverBorderColor: '#00000',
          responsive: true,
         // onClick: this.detectedClick.bind(this),
          // title: {
          //   text: 'Seguimiento Vacantes'
          //   display: true,
          // },
          // scale: {
          //   ticks: {
          //     scaleBeginAtZero: true,
          //     scaleStartValue: 0,
          //   },
          //   display: true,
          //   scaleShowLine: true,
          //   reverse: false
          // },
          animation: {
            animateRotate: true,
            animateScale: true
          },
          // startAngle: -Math.PI / -4,
          legend: {
            position: 'right',
            display: true,
            labels: {
              fontSize: 10,
              boxWidth: 10,
              usePointStyle: true,
              padding: 3
            }
          },
        }
      });
    // });
  }
}
