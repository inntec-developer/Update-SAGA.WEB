import { Component, OnInit } from '@angular/core';

import { Chart } from 'chart.js';
import { ComponentsService } from './../../../service/Components/components.service';
import { SettingsService } from '../../../core/settings/settings.service';

@Component({
  selector: 'app-grafica-vacante-vencida',
  templateUrl: './grafica-vacante-vencida.component.html',
  styleUrls: ['./grafica-vacante-vencida.component.scss']
})
export class GraficaVacanteVencidaComponent implements OnInit {


  Chart: Chart;
  Data: any;
  private UsuarioId: any;
  public Vencidas:number;

  constructor(private service: ComponentsService, private settings: SettingsService) { }

  ngOnInit() {

    this.UsuarioId = this.settings.user['id'];
    // Chart.defaults.scale.ticks.beginAtZero = true;
    document.oncontextmenu=null

    this.service.getVVencida(this.UsuarioId).subscribe(item =>{


    this.Vencidas = item['vencidas'];
      let total = item['total'];

    this.Data = {
      datasets: [{
        backgroundColor: ['#FF8F35', '#FF4B4B'],
        data: [total, this.Vencidas]
      }],
      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: [
        'Total de vacantes',
        'Vacantes vencidas',
      ]
    }
    this.Chart = new Chart('canvas4', {
      type: 'pie',
      // title: { text: 'Seguimiento de Vacantes' },
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
