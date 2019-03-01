import { Component, OnInit } from '@angular/core';

import { Chart } from 'chart.js';

@Component({
  selector: 'app-grafica-vacantes-pie',
  templateUrl: './grafica-vacantes-pie.component.html',
  styleUrls: ['./grafica-vacantes-pie.component.scss']
})


export class GraficaVacantesPieComponent implements OnInit {

  constructor() {
  }

  Chart: Chart;
  data = {
    datasets: [{
      label: 'Vacantes',
      backgroundColor: ['#00FF00', '#FFCC00', '#FF3300'],
      data: [10, 20, 30]
    }],
    // These labels appear in the legend and in the tooltips when hovering different arcs
    // labels: [
    //   'Activas',
    //   'Por Vencer',
    //   'Vencidas'
    // ]
  }

  ngOnInit() {
    var contenido = document.getElementById('canvas');
    console.log(contenido);
    Chart.defaults.scale.ticks.beginAtZero = true;
    this.Chart = new Chart(contenido, {
      type: 'polarArea',
      data: this.data,
      options: {onClick: this.detectedClick.bind(this)}
    });
  }

  detectedClick(evt) {
    let ActivatEvent = this.Chart.getElementAtEvent(evt);
    if (ActivatEvent[0]) {
      var chartData = ActivatEvent[0]['_chart'].config.data;
      var idx = ActivatEvent[0]['_index'];

      var label = chartData.labels[idx];
      var value = chartData.datasets[0].data[idx];

      
      alert(value);
    }
  }
}
