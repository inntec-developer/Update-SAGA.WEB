import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { ComponentsService } from './../../../service/Components/components.service';
import { DataTableModule } from 'primeng/primeng';


@Component({
  selector: 'app-grafica-vacante-cubierta',
  templateUrl: './grafica-vacante-cubierta.component.html',
  styleUrls: ['./grafica-vacante-cubierta.component.scss'],
  providers: [ComponentsService]
})

export class GraficaVacanteCubiertaComponent implements OnInit {
 
  constructor(private _ServiceComponente: ComponentsService) {
  }

  Chart: Chart;
  Data: any;
  private UsuarioId: any;
  private ShowModal: boolean;
  private EstadoVacante: string;
  private NumeroVacantes: number;
  ngOnInit() {
    this.UsuarioId = sessionStorage.getItem('id');
    // Chart.defaults.scale.ticks.beginAtZero = true;
    document.oncontextmenu=null
    this.Data = {
      datasets: [{
        backgroundColor: ['#00FF00', '#FF3300'],
        data: [10, 3]
      }],
      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: [
        'Cubiertas',
        'No Cubiertas',
      ]
    }
    this.Chart = new Chart('canvas', {
      type: 'pie',
      title: { text: 'Seguimiento de Vacantes' },
      data: this.Data,
      options: {
       
      }
    });

    
   
  }



}
