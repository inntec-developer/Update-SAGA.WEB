import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ComponentsService } from './../../../service/Components/components.service';
import { SettingsService } from '../../../core/settings/settings.service';
declare var $: any;

@Component({
  selector: 'app-grafica-vacante-cubierta',
  templateUrl: './grafica-vacante-cubierta.component.html',
  styleUrls: ['./grafica-vacante-cubierta.component.scss'],
  providers: [ComponentsService]
})

export class GraficaVacanteCubiertaComponent implements OnInit {

  constructor(
    private _ServiceComponente: ComponentsService,
    private settings: SettingsService
    ) {
  }

  Chart: Chart;
  Data: any;
  private UsuarioId: any;
  public NumeroVacantes: number;
  public TotalVacantes: number;
  public EstadoVacante: string;
  public ShowModal: boolean;
  
  ngOnInit() {
    this.UsuarioId = this.settings.user['id'];
    var Onombre = [];
     var Ocubierta = [];
     var Omedios = [];
     var Oparcial = [];
     var Ocliente = [];
     var Operacion = [];
     var Opromo = [];
     var Opostotal = [];
     var Ocubiertotal = [];
     var prueba = [];
    this._ServiceComponente.getVCubierta(this.UsuarioId).subscribe(result => {

      result.forEach(item2 => {
        Onombre.push(item2.nombre + " "+item2.totalcubierta+"/"+ item2.possicion)
        Ocubierta.push(item2.cubierta)
        Omedios.push(item2.medios)
        Oparcial.push(item2.parcial)
        Ocliente.push(item2.cliente)
        Operacion.push(item2.operacion)
        Opromo.push(item2.promo)
        Opostotal.push(item2.possicion)
        Ocubiertotal.push(item2.Totalcubierta)
        prueba.push(item2.nombre)
       });
    // Chart.defaults.scale.ticks.beginAtZero = true;
    document.oncontextmenu=null

    this.Chart = new Chart('canvas', {
      type: 'bar',
  data: {
    labels: Onombre,
    // value:prueba,
    datasets: [{
        label: 'Folio Cubierto',
        data: Ocubierta,
        backgroundColor: [
          '#0F3CFF',
          '#0F3CFF',
          '#0F3CFF',
          '#0F3CFF',
          '#0F3CFF',
          '#0F3CFF',
          '#0F3CFF'
        ],
        borderWidth: 2
      },
      {
        label: 'Folio Medios',
        data: Omedios,
        backgroundColor: [
          '#FF8F35',
          '#FF8F35',
          '#FF8F35',
          '#FF8F35',
          '#FF8F35',
          '#FF8F35',
          '#FF8F35'
        ],
        borderWidth: 2
      },
      {
        label: 'Folio Parcial',
        data: Oparcial,
        backgroundColor: [
          '#3cba9f',
          '#3cba9f',
          '#3cba9f',
          '#3cba9f',
          '#3cba9f',
          '#3cba9f',
          '#3cba9f'
        ],
        borderWidth: 2
      },
      {
        label: 'Folio Cliente',
        data: Ocliente,
        backgroundColor: [
          '#0FFF5B',
          '#0FFF5B',
          '#0FFF5B',
          '#0FFF5B',
          '#0FFF5B',
          '#0FFF5B',
          '#0FFF5B'
        ],
        borderWidth: 2
      },
      {
        label: 'Folio Operacion',
        data: Operacion,
        backgroundColor: [
          '#C560FF',
          '#C560FF',
          '#C560FF',
          '#C560FF',
          '#C560FF',
          '#C560FF',
          '#C560FF'
        ],
        borderWidth: 2
      },
      {
        label: 'Folio Promocion',
        data: Opromo,
        backgroundColor: [
          '#FF49A3',
          '#FF49A3',
          '#FF49A3',
          '#FF49A3',
          '#FF49A3',
          '#FF49A3',
          '#FF49A3'
        ],
        borderWidth: 2
      }
    ]
  },
  options: {
    onClick: this.detectedClick.bind(this),
    scales: {
      yAxes: [{
        stacked: true,
        ticks: {
          beginAtZero: true
        }
      }],
      xAxes: [{
        stacked: true,
        ticks: {
          beginAtZero: true
        }
      }]

    },
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




  });
  }

  detectedClick(evt: any) {
    let ActivatEvent = this.Chart.getElementAtEvent(evt);
    
    if (ActivatEvent[0]) {
      var chartData = ActivatEvent[0]['_chart'].config.data;
      var idx = ActivatEvent[0]['_index'];
      this.EstadoVacante = chartData.value[idx];
      this.NumeroVacantes = 10;
      this.ShowModal = true;
    }
  }






}
