import { Component, OnInit } from '@angular/core';

import { Chart } from 'chart.js';
import { ComponentsService } from './../../../service/Components/components.service';
import { SettingsService } from './../../../core/settings/settings.service';

@Component({
  selector: 'app-indicador-posiciones-activas',
  templateUrl: './indicador-posiciones-activas.component.html',
  styleUrls: ['./indicador-posiciones-activas.component.scss'],
  providers: [ComponentsService]
})
export class IndicadorPosicionesActivasComponent implements OnInit {

  constructor(
    private _ComponentService: ComponentsService,
    private settings: SettingsService
  ) { }

  public Chart: Chart;
  public Data: any;
  public RegistrosT: number = 0;

  ngOnInit() {
    Chart.defaults.scale.ticks.beginAtZero = true;
    var user ={
      Id: this.settings.user['id'],
      TipoUsuarioId: this.settings.user['tipoUsuarioId']
    }
    this._ComponentService.getPosicionesActivas(user).subscribe(result => {
      let vacantes = result['vacantes'];
      let contratados = result['contratados'];
      this.RegistrosT = vacantes + contratados;

      this.Data = {
        datasets: [{
          backgroundColor: ['#07B4F0','#EAF10F'],
          borderColor: '#fff',
          data: [
            contratados,
            vacantes,
          ]
        }],
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Cubiertos',
            'No Cumbiertos'
        ]
      }

      this.Chart = new Chart('canvasPosicionesActivas', {
        type: 'pie',
        data: this.Data,
        options: {
          hoverBorderColor: '#00000',
          responsive: true,
          animation: {
            animateRotate: true,
            animateScale: true
          },
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
    }, err => console.log(err));
  }
}
