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
  ngOnInit() {
    this.UsuarioId = this.settings.user['id'];
    this._ServiceComponente.getVCubierta(this.UsuarioId).subscribe(result => {

      let cubiertas = result['cubiertas'];
      let parcialmente = result['parcialmente'];
      let medios = result['medios'];
      let cubiertacliente = result['cubiertacliente'];



    // Chart.defaults.scale.ticks.beginAtZero = true;
    document.oncontextmenu=null
  this.NumeroVacantes = result['total'];

  this.Data = {
    datasets: [{
      backgroundColor: [
        '#3F3CFF',
        '#F335FF',
        '#C5FF60',
        '#FF4B4B'
         ],
      data: [cubiertas,
            parcialmente,
            medios,
            cubiertacliente
          ]
    }],
    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
      'Cubiertas',
      'Cubiertas parcialmente',
      'Cubiertas por medios',
      'Cubiertas por el cliente'
    ]
  }

    this.Chart = new Chart('canvas', {
      type: 'pie',
      title: { text: 'Seguimiento de Vacantes' },
      data: this.Data,
      options: {
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
}
