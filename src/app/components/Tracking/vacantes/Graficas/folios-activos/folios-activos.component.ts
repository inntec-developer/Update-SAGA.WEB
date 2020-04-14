
import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { VacantesService } from '../../../../../service/TrackingVacantes/vacantes.service';
import { stripSummaryForJitFileSuffix } from '@angular/compiler/src/aot/util';
import { preserveWhitespacesDefault } from '@angular/compiler';
import { EquiposTrabajoService } from '../../../../../service/EquiposDeTrabajo/equipos-trabajo.service';
@Component({
  selector: 'app-folios-activos',
  templateUrl: './folios-activos.component.html',
  styleUrls: ['./folios-activos.component.scss']
})
export class FoliosActivosComponent implements OnInit {

  Chart: Chart;
  Chart2: Chart;
  Chart3: Chart;

  @Input() clienteId: any = [];
  @Input() flag = 0;

  Data: any;
  Data2: any;
  Data3: any;

  totalActivos = 0;
  total: any;
  totalPos = 0;
  dataInfoRequi: any;

  backgroundColor = [
    '#33B8FF',
    '#3361FF',
    '#E3FF33',
    '#15C946',
    '#8172EB',
    '#FAB637',
    '#FF0000',
    '#00FF00',
    '#FF8F35',
    '#0F3CFF',
    '#3e95cd',
    '#8e5ea2',
    '#3cba9f',
    '#e8c3b9',
    '#c45850',
    '#70FFD3',
    '#F335FF',
    '#C5FF60',
    '#85144b',
    '#F012BE',
    '#5D9CEC',
    '#23B7E5',
  ];
  constructor(private service: VacantesService, private _service: EquiposTrabajoService) { }

  ngOnInit() {
    if (this.flag === 0) {
      this.getInfoVacantes();
    } else {
      this.getInfoVacantes2();
    }
  }

  getInfoVacantes() {
    this.service.GetInformeRequisiciones(this.clienteId).subscribe(data => {
      this.dataInfoRequi = data;
      this.loadChart(this.dataInfoRequi);
    });
  }
  getInfoVacantes2() {
    this._service.GetInformeClientes(this.clienteId).subscribe(data => {
      this.dataInfoRequi = data;
      this.loadChart(this.dataInfoRequi);
    });
  }

  loadChart(result) {
    this.totalActivos = 0;
    this.totalPos = 0;
    let contratados = 0;
    const datos = [];
    const lbls = [];
    const colors = [];
    if (this.Chart) {
      this.Chart.destroy();
      this.Chart2.destroy();
      this.Chart3.destroy();
    }

    const mocos_aprobada = result.filter(x => x.estatusId === 3 || x.estatusId === 6);
    if (mocos_aprobada.length > 0) {
      datos.push(mocos_aprobada.length);
      lbls.push(mocos_aprobada[0].estatus);
      colors.push(this.backgroundColor[0]);
    }
    const mocos_nueva = result.filter(x => x.estatusId === 4);
    if (mocos_nueva.length > 0) {
      datos.push(mocos_nueva.length);
      lbls.push(mocos_nueva[0].estatus);
      colors.push(this.backgroundColor[1]);
    }
    const mocos_p = result.filter(x => x.estatusId === 7);
    if (mocos_p.length > 0) {
      datos.push(mocos_p.length);
      lbls.push(mocos_p[0].estatus);
      colors.push(this.backgroundColor[2]);
    }
    const mocos_busc = result.filter(x => x.estatusId === 29);
    if (mocos_busc.length > 0) {
      datos.push(mocos_busc.length);
      lbls.push(mocos_busc[0].estatus);
      colors.push(this.backgroundColor[3]);
    }
    const mocos_envc = result.filter(x => x.estatusId === 30);
    if (mocos_envc.length > 0) {
      datos.push(mocos_envc.length);
      lbls.push(mocos_envc[0].estatus);
      colors.push(this.backgroundColor[4]);
    }
    const mocos_nub = result.filter(x => x.estatusId === 31);
    if (mocos_nub.length > 0) {
      datos.push(mocos_nub.length);
      lbls.push(mocos_nub[0].estatus);
      colors.push(this.backgroundColor[5]);
    }
    const mocos_soc = result.filter(x => x.estatusId === 32);
    if (mocos_soc.length > 0) {
      datos.push(mocos_soc.length);
      lbls.push(mocos_soc[0].estatus);
      colors.push(this.backgroundColor[6]);
    }
    const esp = result.filter(x => x.estatusId === 33);
    if (esp.length > 0) {
      datos.push(esp.length);
      lbls.push(esp[0].estatus);
      colors.push(this.backgroundColor[7]);
    }
    const paus = result.filter(x => x.estatusId === 39);
    if (paus.length > 0) {
      datos.push(paus.length);
      lbls.push(paus[0].estatus);
      colors.push(this.backgroundColor[8]);
    }
    const garan = result.filter(x => x.estatusId === 38);
    if (garan.length > 0) {
      datos.push(garan.length);
      lbls.push(garan[0].estatus);
      colors.push(this.backgroundColor[9]);
    }
    const mocos_pa = result.filter(x => x.estatusId === 43);
    if (mocos_pa.length > 0) {
      datos.push(mocos_pa.length);
      lbls.push(mocos_pa[0].estatus);
      colors.push(this.backgroundColor[10]);
    }
    const mocos_gg = result.filter(x => x.estatusId === 46);
    if (mocos_gg.length > 0) {
      datos.push(mocos_gg.length);
      lbls.push(mocos_gg[0].estatus);
      colors.push(this.backgroundColor[11]);
    }

    const cubierta = result.filter(x => x.estatusId === 34);
    const cubparcial = result.filter(x => x.estatusId === 35);
    const cubmedios = result.filter(x => x.estatusId === 36);
    const cubcliente = result.filter(x => x.estatusId === 37);
    const cubpromocion = result.filter(x => x.estatusId === 47);
    const cuboperaciones = result.filter(x => x.estatusId === 48);

    const total = result.filter(x =>
      (x.estatusId >= 34 && x.estatusId <= 37) || x.estatusId === 47 || x.estatusId === 48);
    this.total = total.length;
    this.totalActivos = result.length - this.total;

    this.totalPos = result.reduce(function (valorAnterior, valorActual, indice, vector) {
      return valorAnterior + valorActual.vacantes;
    }, 0);
    contratados = result.reduce(function (valorAnterior, valorActual, indice, vector) {
      return valorAnterior + valorActual.contratados;
    }, 0);

    this.Data = {
      datasets: [{
        backgroundColor: colors,
        borderColor: '#fff',
        data: datos
      }],
      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: lbls
    };

    this.Chart = new Chart('canvas', {
      type: 'pie',
      data: this.Data,
      options: {
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


    this.Data2 = {
      datasets: [{
        backgroundColor: [
          '#27C24C',
          '#F05050'
        ],
        borderColor: '#fff',
        data: [this.totalPos - contratados,
          contratados
        ]
      }],
      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: [
        'ACTIVAS',
        'CUBIERTAS'
      ]
    };
    this.Chart2 = new Chart('canvas2', {
      type: 'pie',
      data: this.Data2,
      options: {
        legend: {
          position: 'right',
          display: true,
          labels: {
            fontSize: 9,
            boxWidth: 10,
            usePointStyle: true,
            padding: 3
          }
        }
      }
    });

    this.Data3 = {
      datasets: [{
        backgroundColor: [
          '#27C24C',
          '#5D9CEC',
          '#23B7E5',
          '#0F3CFF',
          '#F335FF',
          '#70FFD3',
        ],
        borderColor: '#fff',
        data: [
          cubierta.length,
          cubparcial.length,
          cubmedios.length,
          cubcliente.length,
          cuboperaciones.length,
          cubpromocion.length
        ]
      }],
      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: [
        'CUBIERTAS',
        'PARCIALMENTE',
        'POR MEDIOS',
        'POR EL CLIENTE',
        'PROMOCION INTERNA',
        'OPERACIONES'
      ]
    };

    this.Chart3 = new Chart('canvas3', {
      type: 'pie',
      // title: { text: 'Seguimiento de Vacantes' },
      data: this.Data3,
      options: {
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
      }
    });
  }
  // result.forEach(element => {
  //     this.totalPos += element.vacantes;
  //     contratados += element.contratados;

  //     // switch (element.estatusId) {
  //     //   case 3:
  //     //     {
  //     //       aprobada += 1;
  //     //       this.totalActivos += 1;
  //     //       break;
  //     //     }
  //     //     case 6:
  //     //     {
  //     //       aprobada += 1;
  //     //       this.totalActivos += 1;
  //     //       break;
  //     //     }
  //     //   case 4:
  //     //     {
  //     //       nuevo += 1;
  //     //       this.totalActivos += 1;
  //     //       break;
  //     //     }
  //     //   case 7:
  //     //   {
  //     //     publicada += 1;
  //     //     this.totalActivos += 1;
  //     //     break;
  //     //   }
  //     //   case 29:
  //     //     {
  //     //       busCandidatos += 1;
  //     //       this.totalActivos += 1;
  //     //       break;
  //     //     }
  //     //   case 30:
  //     //     {
  //     //       envCliente += 1;
  //     //       this.totalActivos += 1;
  //     //       break;
  //     //     }
  //     //   case 31:
  //     //     {
  //     //       nuBusqueda += 1;
  //     //       this.totalActivos += 1;
  //     //       break;
  //     //     }
  //     //   case 32:
  //     //     {
  //     //       socioeconomicos += 1;
  //     //       this.totalActivos += 1;
  //     //       break;
  //     //     }
  //     //   case 33:
  //     //     {
  //     //       espera += 1;
  //     //       this.totalActivos += 1;
  //     //       break;
  //     //     }
  //     //   case 39:
  //     //     {
  //     //       pausada += 1;
  //     //       this.totalActivos += 1;
  //     //       break;
  //     //     }
  //     //   case 38:
  //     //     {
  //     //       garantia += 1;
  //     //       this.totalActivos += 1;
  //     //       break;
  //     //     }
  //     //   case 43:
  //     //       {
  //     //         pa += 1;
  //     //         this.totalActivos += 1;
  //     //         break;
  //     //       }
  //     //   case 46:
  //     //         {
  //     //           pgg += 1;
  //     //           this.totalActivos += 1;
  //     //           break;
  //     //         }
  //     //   case 34:
  //     //   {
  //     //     cubiertas += 1;
  //     //     this.total += 1;
  //     //     break;
  //     //   }
  //     //   case 35:
  //     //   {
  //     //     parcialmente += 1;
  //     //     this.total += 1;
  //     //     break;

  //     //   }
  //     //   case 36:
  //     //   {
  //     //     medios += 1;
  //     //     this.total += 1;
  //     //     break;
  //     //   }
  //     //   case 37:
  //     //   {
  //     //     cubiertacliente += 1;
  //     //     this.total += 1;
  //     //     break;
  //     //   }

  //     // }

  //   });


}
