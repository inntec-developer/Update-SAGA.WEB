import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-grafica-vacante-porvenc',
  templateUrl: './grafica-vacante-porvenc.component.html',
  styleUrls: ['./grafica-vacante-porvenc.component.scss']
})
export class GraficaVacantePorvencComponent implements OnInit {

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
        backgroundColor: ['#A09AFF', '#FF8E8E'],
        data: [10, 3]
      }],
      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: [
        'Cubiertas',
        'No Cubiertas',
      ]
    }
    this.Chart = new Chart('canvas3', {
      type: 'pie',
      title: { text: 'Seguimiento de Vacantes' },
      data: this.Data,
      options: {
       
      }
    });


  }

}
