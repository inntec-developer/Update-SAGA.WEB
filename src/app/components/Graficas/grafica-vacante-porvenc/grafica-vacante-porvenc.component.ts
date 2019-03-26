import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ComponentsService } from './../../../service/Components/components.service';

@Component({
  selector: 'app-grafica-vacante-porvenc',
  templateUrl: './grafica-vacante-porvenc.component.html',
  styleUrls: ['./grafica-vacante-porvenc.component.scss']
})
export class GraficaVacantePorvencComponent implements OnInit {

  Chart: Chart;
  Data: any;
  private UsuarioId: any;
  private porVencer : number;

  constructor(private servicio : ComponentsService ) { }

  ngOnInit() {

    this.UsuarioId = sessionStorage.getItem('id');
    // Chart.defaults.scale.ticks.beginAtZero = true;
    this.servicio.getVPorVencer(this.UsuarioId).subscribe(item =>{

      this.porVencer = item['porVencer'];
      let total = item['total'];
     

      this.Data = {
        datasets: [{
          backgroundColor: ['#FF8F35', '#3cba9f'],
          data: [this.porVencer, total]
        }],
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
          'Vacantes por vencer',
          'Vacantes proximas',
        ]
      }
      this.Chart = new Chart('canvas3', {
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
  
    })
    document.oncontextmenu=null
   

  }

}
