import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ComponentsService } from './../../../service/Components/components.service';
import { SettingsService } from '../../../core/settings/settings.service';

@Component({
  selector: 'app-grafica-captado-contratado',
  templateUrl: './grafica-captado-contratado.component.html',
  styleUrls: ['./grafica-captado-contratado.component.scss']
})
export class GraficaCaptadoContratadoComponent implements OnInit {

  Chart: Chart;
  Data: any;
  private UsuarioId: any;
  public total : number;

  constructor(
    private servicio:ComponentsService,
    private settings: SettingsService
  ) { }

  ngOnInit() {
    this.UsuarioId = this.settings.user['id'];
    // this.UsuarioId = '2217B0F2-5A6E-E811-80E1-9E274155325E';
     // Chart.defaults.scale.ticks.beginAtZero = true;
     document.oncontextmenu=null
  this.servicio.getVActiva(this.UsuarioId).subscribe(item =>{
 
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
   this.total = item['total'];
 
 
   this.Data = {
     datasets: [{
       backgroundColor: [
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
       data: [
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
   this.Chart = new Chart('captadoContratado', {
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
     },
 
   });
 
 
  })


  }

}
