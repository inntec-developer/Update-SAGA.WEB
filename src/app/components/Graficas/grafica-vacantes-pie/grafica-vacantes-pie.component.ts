import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Chart } from 'chart.js';
import { ComponentsService } from './../../../service/Components/components.service';
import { SettingsService } from '../../../core/settings/settings.service';

@Component({
  selector: 'app-grafica-vacantes-pie',
  templateUrl: './grafica-vacantes-pie.component.html',
  styleUrls: ['./grafica-vacantes-pie.component.scss'],
  providers: [ComponentsService]
})


export class GraficaVacantesPieComponent implements OnInit {
  @Output('ChangeFolios') ChangeFolios: EventEmitter<any> = new EventEmitter();

  constructor(private _ServiceComponente: ComponentsService, private settings: SettingsService) {
  }

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


  this._ServiceComponente.getGraficaVPA(this.UsuarioId).subscribe(result => {
    this.Vigentes = result['vigentes'];
    this.PorVencer = result['porVencer'];
    this.Vencidas = result['vencidas'];
    this.RegistrosT = this.Vigentes + this.PorVencer + this.Vencidas;
    this.Data = {
      datasets: [{
        backgroundColor: ['rgba(0,255,0,0.7)', 'rgba(255,128,0,0.65)', 'rgba(255,66,0,0.65)'],
        borderColor: '#fff',
        data: [this.Vigentes, this.PorVencer, this.Vencidas]
      }],
      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: [
        'Vigentes',
        'Por Vencer',
        'Vencidas'
      ]
    }

    this.Chart = new Chart('cavasFoliosActivos', {
      type: 'pie',
      data: this.Data,
      options: {
        hoverBorderColor: '#00000',
        responsive: true,
        onClick: this.detectedClick.bind(this),
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
  this._ServiceComponente.getGraficaVPA(this.UsuarioId).subscribe(result => {
    this.Vigentes = result['vigentes'];
    this.PorVencer = result['porVencer'];
    this.Vencidas = result['vencidas'];
    this.RegistrosT = this.Vigentes + this.PorVencer + this.Vencidas;
    this.Data = {
      datasets: [{
        backgroundColor: ['rgba(0,255,0,0.7)', 'rgba(255,128,0,0.65)', 'rgba(255,66,0,0.65)'],
        borderColor: '#fff',
        data: [this.Vigentes, this.PorVencer, this.Vencidas]
      }],
      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: [
        'Vigentes',
        'Por Vencer',
        'Vencidas'
      ]
    }
    this.Chart.data = this.Data;
    this.Chart.update();
    this.ChangeFolios.emit(this.RegistrosT);
  });
}
}
