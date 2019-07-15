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
  public Vigentes: number = 0;
  public PorVencer: number = 0;
  public Vencidas: number = 0;
  public UnidadNegocio: string;
  public totalPos: number = 0;

  ngOnInit() {
    this.UnidadNegocio = 'Mty'
    this.UsuarioId = this.settings.user['id'];
    this._ServiceComponente.getUnidadesNegocioMTY().subscribe(result => {
      if (result != 404) {
        this.RegistrosT = result['vigentes'].length + result['porVencer'].length + result['vencidas'].length;
        this.Vigentes = result['vigentes'].length;
        this.PorVencer = result['porVencer'].length;
        this.Vencidas = result['vencidas'].length;
        var vigentes = result['vigentes'];
        var porVencer = result['porVencer'];
        var vencidas = result['vencidas'];
        vigentes.forEach(vg => {
          this.totalPos += vg.vacantes;
        });
        porVencer.forEach(pv => {
          this.totalPos += pv.vacantes;
        });
        vencidas.forEach(vc => {
          this.totalPos += vc.vacantes;
        });

        this.Data = {
          labels: ["Vigentes", "Por Vencer", "Vencidas"],
          datasets: [{
            label: "Monterrey",
            lineTension: 0.1,
            backgroundColor: "rgba(102, 153, 204, 0.2)",
            borderColor: "rgba(102, 153, 204, 1)",
            pointBackgroundColor: "rgba(102, 153, 204, 1)",
            pointBorderColor: "#fff",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(102, 153, 204, 1)",
            data: [this.Vigentes, this.PorVencer, this.Vencidas],
          }]
        };

        var charOptions = {
          options: {
            scale: {
              angleLines: {
                display: true,
                lineWidth: 0.5,
                color: 'rgba(128, 128, 128, 0.2)'
              },
              pointLabels: {
                fontSize: 14,
                fontStyle: '300',
                fontColor: 'rgba(204, 204, 204, 1)',
                fontFamily: "'Lato', sans-serif"
              },
              ticks: {
                beginAtZero: true,
                maxTicksLimit: 3,
                min: 0,
                max: 3,
                display: false
              }
            }
          }
        }

        this.Chart = new Chart('canvasMty', {
          type: 'radar',
          data: this.Data,
          options: {
            charOptions,
            onClick: this.detectedClick.bind(this),
          }
        });
      }
    });
  }

  detectedClick(evt: any) {
    if (evt == 'todas') {
      this.EstadoVacante = 'Todas';
      this.NumeroVacantes = this.RegistrosT
      this.ShowModal = true;
    }
    else {
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

  updateChart() {
    this._ServiceComponente.getUnidadesNegocioMTY().subscribe(result => {
      if (result != 404) {
        this.RegistrosT = result['vigentes'].length + result['porVencer'].length + result['vencidas'].length;
        this.Vigentes = result['vigentes'].length;
        this.PorVencer = result['porVencer'].length;
        this.Vencidas = result['vencidas'].length;
        var vigentes = result['vigentes'];
        var porVencer = result['porVencer'];
        var vencidas = result['vencidas'];
        vigentes.forEach(vg => {
          this.totalPos += vg.vacantes;
        });
        porVencer.forEach(pv => {
          this.totalPos += pv.vacantes;
        });
        vencidas.forEach(vc => {
          this.totalPos += vc.vacantes;
        });
        this.Data = {
          labels: [["Vigentes"], ["Por Vencer"], ["Vencidas"]],
          datasets: [{
            label: "Monterrey",
            lineTension: 0.1,
            backgroundColor: "rgba(102, 153, 204, 0.2)",
            borderColor: "rgba(102, 153, 204, 1)",
            pointBackgroundColor: "rgba(102, 153, 204, 1)",
            pointBorderColor: "#fff",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(102, 153, 204, 1)",
            data: [this.Vigentes, this.PorVencer, this.Vencidas],
          }]
        };
        this.Chart.data = this.Data;
        this.Chart.update();
      }
    });
  }
}
