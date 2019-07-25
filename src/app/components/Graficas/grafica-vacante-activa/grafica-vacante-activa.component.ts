import { Component, OnInit } from '@angular/core';

import { Chart } from 'chart.js';
import { ComponentsService } from './../../../service/Components/components.service';
import { SettingsService } from '../../../core/settings/settings.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-grafica-vacante-activa',
  templateUrl: './grafica-vacante-activa.component.html',
  styleUrls: ['./grafica-vacante-activa.component.scss']
})
export class GraficaVacanteActivaComponent implements OnInit {

  Chart: Chart;
  Data: any;
  private UsuarioId: any;
  public total : number;
  public NumeroVacantes: number;
  public NumeroPos:number;
  public EstadoVacante: string;
  public ShowModal: boolean;

  constructor(
    private servicio:ComponentsService,
    private settings: SettingsService,
    private spinner: NgxSpinnerService,
    ) { }

  ngOnInit() {
    this.spinner.hide();
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
  this.NumeroVacantes = item['total'];
  this.NumeroPos = item['numeropos'];

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
  this.Chart = new Chart('canvas2', {
    type: 'pie',
    title: { text: 'Seguimiento de Vacantes' },
    data: this.Data,
    options: {
      onClick: this.detectedClick.bind(this),
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

  detectedClick(evt: any) {
   
    let ActivatEvent = this.Chart.getElementAtEvent(evt);
    if (ActivatEvent[0]) {
      var chartData = ActivatEvent[0]['_chart'].config.data;
      var idx = ActivatEvent[0]['_index'];
      this.EstadoVacante = chartData.labels[idx];
      this.NumeroVacantes = chartData.datasets[0].data[idx];
      this.ShowModal = true;
    }
  }

}
