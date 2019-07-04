import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Chart } from 'chart.js';
import { ComponentsService } from '../../../service';
import { SettingsService } from '../../../core/settings/settings.service';

@Component({
  selector: 'app-indicador-und-negocio-gdl',
  templateUrl: './indicador-und-negocio-gdl.component.html',
  styleUrls: ['./indicador-und-negocio-gdl.component.scss'],
  providers: [ComponentsService]
})
export class IndicadorUndNegocioGdlComponent implements OnInit {


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
  ngOnInit() {
    this.UsuarioId = this.settings.user['id'];
    Chart.defaults.scale.ticks.beginAtZero = true;
    this._ServiceComponente.getUnidadesNegocioGDL().subscribe(result => {
      if (result != 404) {
        this.RegistrosT = result['vigentes'] + result['porVencer'] + result['vencidas'];
        this.Vigentes = result['vigentes']
        this.PorVencer = result['porVencer']
        this.Vencidas = result['vencidas']
        this.Data = {
          labels: ["Vigentes", "Por Vencer", "Vencidas"],
          datasets: [{
            label: "Guadalajara",
            backgroundColor: "rgba(0,0,255,0.5)",
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
        this.Chart = new Chart('canvasGdl', {
          type: 'radar',
          data: this.Data,
          options: charOptions
        });
      }
    });
  }

  updateChart() {
    this._ServiceComponente.getUnidadesNegocioGDL().subscribe(result => {
      if (result != 404) {
        this.RegistrosT = result['vigentes'] + result['porVencer'] + result['vencidas'];
        this.Vigentes = result['vigentes']
        this.PorVencer = result['porVencer']
        this.Vencidas = result['vencidas']
        this.Data = {
          labels: ["Vigentes", "Por Vencer", "Vencidas"],
          datasets: [{
            label: "Guadalajara",
            backgroundColor: "rgba(0,0,255,0.5)",
            data: [this.Vigentes, this.PorVencer, this.Vencidas]
          }]
        };
        this.Chart.data = this.Data;
        this.Chart.update();
      }
    });
  }
}
