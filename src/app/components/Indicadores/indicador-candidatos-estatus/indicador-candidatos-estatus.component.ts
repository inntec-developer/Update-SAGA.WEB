import { Component, OnInit } from '@angular/core';

import { Chart } from 'chart.js';
import { ComponentsService } from './../../../service/Components/components.service';

@Component({
  selector: 'app-indicador-candidatos-estatus',
  templateUrl: './indicador-candidatos-estatus.component.html',
  styleUrls: ['./indicador-candidatos-estatus.component.scss'],
  providers: [ComponentsService]
})
export class IndicadorCandidatosEstatusComponent implements OnInit {

  constructor(
    private _ComponentService: ComponentsService
  ) { }


  public Chart: Chart;
  public Data: any;
  public RegistrosT: number = 0;
  ngOnInit() {
    Chart.defaults.scale.ticks.beginAtZero = true;
    this._ComponentService.getCandidatosInicio().subscribe(result => {
      let Postulado = result['postulado'];
      let Proceso = result['proceso'];
      let Entrevista = result['entrevista'];
      let Finalista = result['finalista'];
      let ProcesoFinalizado = result['procesoFinalizado'];
      let Revision = result['revision'];
      let NR = result['nr'];
      let Disponible = result['disponible'];
      this.RegistrosT = Postulado + Proceso + Entrevista + Finalista + ProcesoFinalizado + Revision + NR + Disponible;

      this.Data = {
        datasets: [{
          backgroundColor: ['#00FF00', '#33B8FF', '#3361FF', '#E3FF33', '#15C946', '#8172EB', '#FAB637', '#FF0000'],
          borderColor: '#fff',
          data: [
            Disponible,
            Postulado,
            Proceso,
            Entrevista,
            Finalista,
            ProcesoFinalizado,
            Revision,
            NR
          ]
        }],
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Disponible',
            'Postulado',
            'Proceso',
            'Entrevista',
            'Finalista',
            'Proceso Finalizado',
            'Revisión',
            'NR'
        ]
      }

      this.Chart = new Chart('canvasCandidatos', {
        type: 'pie',
        data: this.Data,
        options: {
          hoverBorderColor: '#00000',
          responsive: true,
          // onClick: this.detectedClick.bind(this),
          // title: {
          //   text: 'Seguimiento Vacantes'
          //   display: true,
          // },
          // scale: {
          //   ticks: {
          //     scaleBeginAtZero: true,
          //     scaleStartValue: 0,
          //   },
          //   display: true,
          //   scaleShowLine: true,
          //   reverse: false
          // },
          animation: {
            animateRotate: true,
            animateScale: true
          },
          // startAngle: -Math.PI / -4,
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
    }, err => console.log(err));
  }

}
