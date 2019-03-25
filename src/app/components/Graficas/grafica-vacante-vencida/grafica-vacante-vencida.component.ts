import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-grafica-vacante-vencida',
  templateUrl: './grafica-vacante-vencida.component.html',
  styleUrls: ['./grafica-vacante-vencida.component.scss']
})
export class GraficaVacanteVencidaComponent implements OnInit {


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
        backgroundColor: ['#0FFF3C', '#FF4B4B'],
        data: [10, 3]
      }],
      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: [
        'Cubiertas',
        'No Cubiertas',
      ]
    }
    this.Chart = new Chart('canvas4', {
      type: 'pie',
      title: { text: 'Seguimiento de Vacantes' },
      data: this.Data,
      options: {
       
      }
    });


  }

}
