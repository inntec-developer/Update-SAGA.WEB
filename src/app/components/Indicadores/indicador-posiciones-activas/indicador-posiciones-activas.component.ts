import { Component, EventEmitter, OnInit, Output } from '@angular/core';

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
  @Output('ChangePosiciones') ChangePosiciones: EventEmitter<any> = new EventEmitter();

  constructor(
    private _ComponentService: ComponentsService,
    private settings: SettingsService
  ) { }

  public Chart: Chart;
  public Data: any;
  public RegistrosT: number = 0;
  public Cubiertos: number = 0;
  public NoCubiertos: number = 0;
  public user: any;

  public NumeroVacantes: number;
  public EstadoVacante: string;
  public ShowModal: boolean;

  ngOnInit() {
    Chart.defaults.scale.ticks.beginAtZero = true;
    this.user = {
      Id: this.settings.user['id'],
      TipoUsuarioId: this.settings.user['tipoUsuarioId']
    }
    this._ComponentService.getPosicionesActivas(this.user).subscribe(result => {
      this.NoCubiertos = result['vacantes'];
      this.Cubiertos = result['contratados'];
      this.RegistrosT = this.Cubiertos + this.NoCubiertos;

      this.Data = {
        datasets: [{
          backgroundColor: ['#07B4F0', 'rgba(255,128,0,0.65)'],
          borderColor: '#fff',
          data: [
            this.Cubiertos,
            this.NoCubiertos,
          ]
        }],
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
          'Cubiertos',
          'No Cubiertos'
        ]
      }

      this.Chart = new Chart('canvasPosicionesActivas', {
        type: 'pie',
        data: this.Data,
        options: {
          onClick: this.detectedClick.bind(this),
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

  updateChart() {
    this._ComponentService.getPosicionesActivas(this.user).subscribe(result => {
      this.NoCubiertos = result['vacantes'];
      this.Cubiertos = result['contratados'];
      this.RegistrosT = this.Cubiertos + this.NoCubiertos;

      this.Data = {
        datasets: [{
          backgroundColor: ['#07B4F0', 'rgba(255,128,0,0.65)'],
          borderColor: '#fff',
          data: [
            this.Cubiertos,
            this.NoCubiertos,
          ]
        }],
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
          'Cubiertos',
          'No Cubiertos'
        ]
      }
      this.Chart.data = this.Data;
      this.Chart.update();
      this.ChangePosiciones.emit(this.RegistrosT);
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
