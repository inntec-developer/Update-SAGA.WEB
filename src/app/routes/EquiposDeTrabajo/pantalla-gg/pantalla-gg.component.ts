
import { ColorsService } from '../../../shared/colors/colors.service';
import { EquiposTrabajoService } from './../../../service/EquiposDeTrabajo/equipos-trabajo.service';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ApiConection } from '../../../service';

@Component({
  selector: 'app-pantalla-gg',
  templateUrl: './pantalla-gg.component.html',
  styleUrls: ['./pantalla-gg.component.scss']
})
export class PantallaGGComponent implements OnInit {

  reporte = [];
  Data: any;
  Chart: Chart;
  Chart2: Chart;
  Chart3: Chart;
  Chart4: Chart;
  totalCub = 0;
  totalFal = 0;
  totalCump = 0;
  totalPos = 0;
  backgroundColor = [
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
  ];
  urlFoto: string = ApiConection.ServiceUrlFotoUser;

  sparkOptionsInfo = {
    type: 'pie',
    sliceColors: [this.colors.byName('gray-lighter'), this.colors.byName('info')],
    height: 24
};

sparkOptionsWarning = {
    type: 'pie',
    sliceColors: [this.colors.byName('gray-lighter'), this.colors.byName('warning')],
    height: 24
};

sparkOptionsSuccess = {
    type: 'pie',
    sliceColors: [this.colors.byName('gray-lighter'), this.colors.byName('success')],
    height: 24
};

sparkOptionsDanger = {
    type: 'pie',
    sliceColors: [this.colors.byName('gray-lighter'), this.colors.byName('danger')],
    height: 24
};

  constructor(private _service: EquiposTrabajoService, public colors: ColorsService) { }

  ngOnInit() {
    this.GetRport();
  }

  GetRport() 
  {
    this._service.GetRportGG('FA6039C6-6497-E911-8993-B2AAD340F890').subscribe(result => {
      this.reporte = result;
    this.loadCharts();
      console.log(this.reporte)
    })

  }

  loadCharts()
  {
    let bg = [];
    let label = [];
    let totalPos = [];
    let bg2 = [];
    let label2 = [];
    let totalPos2 = [];
    let totalCub = [];
    let bg3 = [];
    let label3 = [];
    let totalPos3 = [];
    let totalFal = [];
    let bg4 = [];
    let label4 = [];
    let totalPos4 = [];
    let totalCump = [];
    let cont = 0;

    // tslint:disable-next-line: no-shadowed-variable
    this.reporte.forEach(element => {
      element.bg = this.backgroundColor[cont];

      totalPos.push(element.totalPos);
      label.push(element.nombre);
      bg.push(this.backgroundColor[cont]);
      totalCub.push(element.totalCub);
      label2.push(element.nombre);
      bg2.push(this.backgroundColor[cont]);

      totalFal.push(element.totalFal);
      label3.push(element.nombre);
      bg3.push(this.backgroundColor[cont]);

      totalCump.push(element.totalCump);
      label4.push(element.nombre);
      bg4.push(this.backgroundColor[cont]);
      this.totalPos = element.totalPos;

      cont++;
    });

    let data = {
      datasets: [{
        backgroundColor: bg,
        data: totalPos
      }],
      labels: label
    }

    this.totalPos = totalPos.reduce(function (valorAnterior, valorActual, indice, vector) {
      return valorAnterior + valorActual;
    }, 10);

    this.Chart = new Chart('canvas', {
      type: 'pie',
      //title: { text: 'Seguimiento de Vacantes' },
      data: data,
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
      },
    });

    data = {
      datasets: [{
        backgroundColor: bg2,
        data: totalCub
      }],
      labels: label2
    }

    this.totalCub = totalCub.reduce(function (valorAnterior, valorActual, indice, vector) {
      return valorAnterior + valorActual;
    }, 10);

    this.Chart2 = new Chart('canvas2', {
      type: 'pie',
      //title: { text: 'Seguimiento de Vacantes' },
      data: data,
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
      },

    });

    data = {
      datasets: [{
        backgroundColor: bg3,
        data: totalFal
      }],
      labels: label3
    };

    this.totalFal = totalFal.reduce(function (valorAnterior, valorActual, indice, vector) {
      return valorAnterior + valorActual;
    }, 10);


    this.Chart3 = new Chart('canvas3', {
      type: 'pie',
      //title: { text: 'Seguimiento de Vacantes' },
      data: data,
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
      },

    });

    data = {
      datasets: [{
        backgroundColor: bg4,
        data: totalCump
      }],
      labels: label4
    }

    this.totalCump = totalCump.reduce(function (valorAnterior, valorActual, indice, vector) {
      return valorAnterior + valorActual;
    }, 10);


    this.Chart4 = new Chart('canvas4', {
      type: 'pie',
      //title: { text: 'Seguimiento de Vacantes' },
      data: data,
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
      },

    });
  }
  errorImg(): string {
   return ApiConection.ServiceUrlFileManager + 'img/user/default.jpg';
  }



}
