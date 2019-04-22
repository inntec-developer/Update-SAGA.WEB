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
      let nuevo = item['nuevo'];
      let aprobada = item['aprobada'];
      let publicada = item['publicada'];
      let busCandidatos = item['busCandidatos'];
      let envCliente = item['envCliente'];
      let nuBusqueda = item['nuBusqueda'];
      let socioeconomicos = item['socioeconomicos'];
      let espera = item['espera'];
      let pausada = item['pausada'];
      let garantia = item['garantia'];
     

      this.Data = {
        datasets: [{
          backgroundColor: 
          [
             '#FFED3D',
             '#FF4B4B',
             '#0F3CFF', 
            '#FF8F35',
            '#3e95cd',
            '#8e5ea2',
            '#3cba9f',
            '#e8c3b9',
            '#c45850',
            '#70FFD3',
            '#F335FF',
            '#C5FF60'

          ],
          data: 
            [
                this.porVencer, 
                total,
                nuevo ,
                aprobada ,
                publicada ,
                busCandidatos,
                envCliente ,
                nuBusqueda,
                socioeconomicos,
                espera ,
                pausada ,
                garantia
            ]
        }],
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
          'Vacantes por vencer',
          'Vacantes vencidas',
          'Nuevas',
          'Aprobadas',
          'Publicadas',
          'Búsqueda de candidatos',
          'Envió al cliente',
          'Nueva busqueda',
          'Socioeconomicos',
          'En espera de contratación',
          'Pausadas',
          'Garantía de búsqueda',
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
