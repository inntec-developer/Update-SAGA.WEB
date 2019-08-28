
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
  total = 0;
  totalPos = 0;
  dataInfoRequi: any;
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
    let nuevo = 0;
    let aprobada = 0;
    let publicada = 0;
    let busCandidatos = 0;
    let envCliente = 0;
    let nuBusqueda = 0;
    let socioeconomicos = 0;
    let espera = 0;
    let pausada = 0;
    let garantia = 0;
    this.totalActivos = 0;
    let cubiertas = 0;
    let parcialmente = 0;
    let medios = 0;
    let cubiertacliente = 0;
    this.totalPos = 0;
    let contratados = 0;

    if (this.Chart)
    {
      this.Chart.destroy();
      this.Chart2.destroy();
      this.Chart3.destroy();
    }
    result.forEach(element => {
        this.totalPos += element.vacantes;
        contratados += element.contratados;

        switch (element.estatusId) {
          case 3:
            {
              aprobada += 1;
              this.totalActivos += 1;
              break;
            }
            case 6:
            {
              aprobada += 1;
              this.totalActivos += 1;
              break;
            }
          case 4:
            {
              nuevo += 1;
              this.totalActivos += 1;
              break;
            }
          case 7:
          {
            publicada += 1;
            this.totalActivos += 1;
            break;
          }
          case 29:
            {
              busCandidatos += 1;
              this.totalActivos += 1;
              break;
            }
          case 30:
            {
              envCliente += 1;
              this.totalActivos += 1;
              break;
            }
          case 31:
            {
              nuBusqueda += 1;
              this.totalActivos += 1;
              break;
            }
          case 32:
            {
              socioeconomicos += 1;
              this.totalActivos += 1;
              break;
            }
          case 33:
            {
              espera += 1;
              this.totalActivos += 1;
              break;
            }
          case 39:
            {
              pausada += 1;
              this.totalActivos += 1;
              break;
            }
          case 38:
            {
              garantia += 1;
              this.totalActivos += 1;
              break;
            }
          case 34:
          {
            cubiertas +=1;
            this.total += 1;
            break;
          }
          case 35:
          {
            parcialmente +=1;
            this.total +=1;
            break;

          }
          case 36:
          {
            medios += 1;
            this.total += 1;
            break;
          }
          case 37:
          {
            cubiertacliente += 1;
            this.total += 1;
            break;
          }

        }

      });

      this.Data = {
        datasets: [{
          backgroundColor: [
            '#FF8F35',
            '#0F3CFF',
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
            nuevo,
            aprobada,
            publicada,
            busCandidatos,
            envCliente,
            nuBusqueda,
            socioeconomicos,
            espera,
            pausada,
            garantia
          ]
        }],
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
          'Nuevas',
          'Aprobadas',
          'Publicadas',
          'Búsqueda de candidatos',
          'Envio al cliente',
          'Nueva busqueda',
          'Socioeconomicos',
          'En espera de contratación',
          'Pausadas',
          'Garantía de búsqueda',
        ]
      };

      this.Chart = new Chart('canvas', {
        type: 'pie',
        data: this.Data,
        options: {
          legend: {
            position: 'right',
            display: false,
            labels: {
              fontColor: 'white',
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
            '#3F3CFF',
            '#F335FF'
             ],
          data: [this.totalPos - contratados,
                contratados
              ]
        }],
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
          'No cubiertas',
          'Cubiertas'
        ]
      }
        this.Chart2 = new Chart('canvas2', {
          type: 'pie',
          // title: { text: 'Seguimiento de Vacantes' },
          data: this.Data2,
          options: {
            legend: {
              position: 'right',
              display: false,
              labels:{
                fontColor: 'white',
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
            '#3F3CFF',
            '#F335FF',
            '#C5FF60',
            '#FF4B4B'
             ],
          data: [cubiertas,
                parcialmente,
                medios,
                cubiertacliente
              ]
        }],
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
          'Cubiertas',
          'Cubiertas parcialmente',
          'Cubiertas por medios',
          'Cubiertas por el cliente'
        ]
      };

        this.Chart3 = new Chart('canvas3', {
          type: 'pie',
          // title: { text: 'Seguimiento de Vacantes' },
          data: this.Data3,
          options: {
            legend: {
              position: 'right',
              display: false,
              labels:{
                fontColor: 'white',
                fontSize: 9,
                boxWidth: 10,
                usePointStyle: true,
                padding: 3
              }
            },
          }
        });
  }
}
