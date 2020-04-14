import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ComponentsService } from './../../../service/Components/components.service';
import { SettingsService } from '../../../core/settings/settings.service';


@Component({
  selector: 'app-grafica-vacante-activa',
  templateUrl: './grafica-vacante-activa.component.html',
  styleUrls: ['./grafica-vacante-activa.component.scss']
})
export class GraficaVacanteActivaComponent implements OnInit {

  Chart: Chart;
  Data: any;
  private UsuarioId: any;
  public total: number;
  public NumeroVacantes: number;
  public NumeroPos: number;
  public EstadoVacante: string;
  public ShowModal: boolean;

  colors = {
    nuevo: '#0F3CFF',
    aprobada: '#FF8F35',
    publicada: '#3e95cd',
    busCandidatos: '#8e5ea2',
    envCliente: '#3cba9f',
    nuBusqueda: '#e8c3b9',
    socioeconomicos: '#c45850',
    espera: '#70FFD3',
    pausada: '#F335FF',
    garantia: '#C5FF60',
    pendiente: '#FF4136',
    pendientegg: '#FFDC00'
  };

  labels = {
    nuevo: 'Nuevas',
    aprobada: 'Aprobadas',
    publicada: 'Publicadas',
    busCandidatos: 'Búsqueda de candidatos',
    envCliente: 'Envió al cliente',
    nuBusqueda: 'Nueva busqueda',
    socioeconomicos: 'Socioeconomicos',
    espera: 'En espera de contratación',
    pausada: 'Pausadas',
    garantia: 'Garantía de búsqueda',
    pendiente: 'Pendiente',
    pendientegg: 'PendienteGG'
  };

  constructor(
    private servicio: ComponentsService,
    private settings: SettingsService,
  ) { }

  ngOnInit() {
    this.UsuarioId = this.settings.user['id'];
    document.oncontextmenu = null;
    this.servicio.getVActiva(this.UsuarioId).subscribe(item => {
      const keys = Object.keys(item);
      const datos = [];
      const bg = [];
      const lbls = [];
      keys.forEach(k => {
        if (k !== 'total' && k !== 'numeropos' && k !== 'cubierto'
        && k !== 'faltante' && k !== 'apartado' && k !== 'cita'
        && k !== 'entrevista' && k !== 'evaluacion' && k !== 'finalista'
        && k !== 'entrecliente' && k !== 'fincliente' && item[k] > 0) {
          datos.push(item[k]);
          bg.push(this.colors[k]);
          lbls.push(this.labels[k]);
        }
      });

      // let nuevo = item['nuevo'];
      // let aprobada = item['aprobada'];
      // let publicada = item['publicada'];
      // let busCandidatos = item['busCandidatos'];
      // let envCliente = item['envCliente'];
      // let nuBusqueda = item['nuBusqueda'];
      // let socioeconomicos = item['socioeconomicos'];
      // let espera = item['espera'];
      // let pausada = item['pausada'];
      // let garantia = item['garantia'];
      // let Pendiente = item['pendiente'];
      // let Pendientegg = item['pendientegg'];
      this.total = item['total'];
      // this.NumeroVacantes = item['total'];
      this.NumeroPos = item['numeropos'];

      this.Data = {
        datasets: [{
          backgroundColor: bg,
          data: datos
        }],
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: lbls
    };
      this.Chart = new Chart('activaIndi', {
        type: 'pie',
        // title: { text: 'Seguimiento de Vacantes' },
        data: this.Data,
        options: {
          onClick: this.detectedClick.bind(this),
          responsive: true,
          animation: {
            animateRotate: true,
            animateScale: true
          },
          legend: {
            position: 'right',
            display: true,
            labels: {
              fontSize: 9,
              boxWidth: 10,
              usePointStyle: true,
              padding: 3
            }
          },
        },

      });
    });
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
