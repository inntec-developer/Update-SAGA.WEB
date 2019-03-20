import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-grafica-vacante-activa',
  templateUrl: './grafica-vacante-activa.component.html',
  styleUrls: ['./grafica-vacante-activa.component.scss']
})
export class GraficaVacanteActivaComponent implements OnInit {

  Chart: Chart;
  Data: any;
  private UsuarioId: any;

  constructor() { }

  ngOnInit() {

    this.UsuarioId = sessionStorage.getItem('id');
    // Chart.defaults.scale.ticks.beginAtZero = true;
    document.oncontextmenu=null
    this.Data = {
      datasets: [{
        backgroundColor: ['#0F3CFF', '#FF8F35'],
        data: [10, 3]
      }],
      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: [
        'Cubiertas',
        'No Cubiertas',
      ]
    }
    this.Chart = new Chart('canvas2', {
      type: 'pie',
      title: { text: 'Seguimiento de Vacantes' },
      data: this.Data,
      options: {
       
      }
    });
  }

}
