import { Component, OnInit } from '@angular/core';

import { Chart } from 'chart.js';
import { ComponentsService } from '../../../service';
import { SettingsService } from '../../../core/settings/settings.service';

@Component({
  selector: 'app-indicador-und-negocio-mx',
  templateUrl: './indicador-und-negocio-mx.component.html',
  styleUrls: ['./indicador-und-negocio-mx.component.scss'],
  providers: [ComponentsService]
})
export class IndicadorUndNegocioMxComponent implements OnInit {

  constructor(
    private _ServiceComponente: ComponentsService,
    private settings: SettingsService
  ) { }

  public Chart: Chart;
  public UsuarioId: any;
  public ShowModal: boolean;
  public EstadoVacante: string;
  public NumeroVacantes: number;
  public RegistrosT: number = 0;
  public Vigentes: number = 0;
  public PorVencer: number = 0;
  public Vencidas: number = 0;
  ngOnInit() {
    this.UsuarioId = this.settings.user['id'];
    Chart.defaults.scale.ticks.beginAtZero = true;
    this._ServiceComponente.getUnidadesNegocioMX().subscribe(result => {
      if (result != 404) {
        this.RegistrosT = result['vigentes'] + result['porVencer'] + result['vencidas'];
        this.Vigentes = result['vigentes']
        this.PorVencer = result['porVencer']
        this.Vencidas = result['vencidas']
        var marksData = {
          labels: ["Vigentes", "Por Vencer", "Vencidas"],
          datasets: [{
            label: "México",
            backgroundColor: "rgba(110,0,255,0.5)",
            data: [this.Vigentes, this.PorVencer, this.Vencidas]
          }]
        };

        var charOptions = {
          legend: {
            position: 'right',
            display: true,
            labels: {
              fontSize: 12,
              boxWidth: 10,
              usePointStyle: true,
              padding: 15
            }
          },
          scale: {
            display: true,
          }
        }

        Chart.defaults.scale.ticks.beginAtZero = true;
        this.Chart = new Chart('canvasMx', {
          type: 'radar',
          data: marksData,
          options: charOptions
        });
      }
    });
  }
}
