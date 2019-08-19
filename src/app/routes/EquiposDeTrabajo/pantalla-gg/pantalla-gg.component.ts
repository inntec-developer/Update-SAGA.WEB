import { GraficaResumenComponent } from './../../../components/Graficas/grafica-resumen/grafica-resumen.component';

import { ColorsService } from '../../../shared/colors/colors.service';
import { EquiposTrabajoService } from './../../../service/EquiposDeTrabajo/equipos-trabajo.service';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ApiConection } from '../../../service';
import { element } from 'protractor';

@Component({
  selector: 'app-pantalla-gg',
  templateUrl: './pantalla-gg.component.html',
  styleUrls: ['./pantalla-gg.component.scss']
})
export class PantallaGGComponent implements OnInit {
// config scroll
  disabled = false;
  compact = false;
  invertX = false;
  invertY = false;
  shown = 'hover';

  reporte = [];
  totalCub = 0;
  totalFal = 0;
  totalCump = 0;
  totalPos = 0;
  gerente = [];

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
  pieData: { labels: any[]; datasets: { data: any[]; }[]; };
  pieColors: { borderColor: any[]; backgroundColor: any[]; }[];
  pieOptions: { responsive: boolean; };

  pieData2: { labels: any[]; datasets: { data: any[]; }[]; };
  pieColors2: { borderColor: any[]; backgroundColor: any[]; }[];

  pieData3: { labels: any[]; datasets: { data: any[]; }[]; };
  pieColors3: { borderColor: any[]; backgroundColor: any[]; }[];

  pieData4: { labels: any[]; datasets: { data: any[]; }[]; };
  pieColors4: { borderColor: any[]; backgroundColor: any[]; }[];

  constructor(private _service: EquiposTrabajoService, public colors: ColorsService) { }

  ngOnInit() {
    this.GetRport();
  }

  GetRport() 
  {
    this._service.GetRportGG('FA6039C6-6497-E911-8993-B2AAD340F890').subscribe(result => {
      this.reporte = result;
    this.loadCharts(this.reporte);
    })

  }

  loadCharts(row)
  {
    const bg = [];
    const label = [];
    const totalPos = [];
    const bg2 = [];
    const label2 = [];
    const totalCub = [];
    const bg3 = [];
    const label3 = [];
    const totalFal = [];
    const bg4 = [];
    const label4 = [];
    const totalCump = [];
    let cont = 0;

    // tslint:disable-next-line: no-shadowed-variable
    row.forEach(element => {
      debugger;
      if ( element.resumen.length > 0 )
      {
        element.resumen.forEach(item => {
          if (item.resumen.length > 0)
          {
            item.resumen.forEach(i => {
              i.foto = this.urlFoto + i.clave + '.jpg';
              if ( i.resumen.length > 0)
              {
                i.resumen.forEach(ii => {
                  ii.foto = this.urlFoto + ii.clave + '.jpg';
                });
              }
            });
          }

          this.gerente.push(
            {
              nombre: item.nombre,
              foto: this.urlFoto + item.clave + '.jpg',
              resumen: item.resumen,
              totalPos: item.totalPos,
              totalCub: item.totalCub,
              totalFal: item.totalPos - item.totalCub,
              totalCump: item.totalCub * 100 / item.totalPos || 0,
              bg: this.backgroundColor[cont],
            }
          );

          totalPos.push(item.totalPos);
          label.push(item.nombre);
          bg.push(this.backgroundColor[cont]);
          totalCub.push(item.totalCub);
          label2.push(item.nombre);
          bg2.push(this.backgroundColor[cont]);

          totalFal.push(item.totalPos - item.totalCub);
          label3.push(item.nombre);
          bg3.push(this.backgroundColor[cont]);

          totalCump.push(item.totalCub * 100 / item.totalPos || 0);
          label4.push(item.nombre);
          bg4.push(this.backgroundColor[cont]);
          cont++;
        });
        this.totalPos = totalPos.reduce(function (valorAnterior, valorActual, indice, vector) {
            return valorAnterior + valorActual;
       }, 10);

        this.totalCub = totalCub.reduce(function (valorAnterior, valorActual, indice, vector) {
          return valorAnterior + valorActual;
     }, 10);

        this.totalFal = this.totalPos - this.totalCub;
        this.totalCump = this.totalCub * 100 / this.totalPos || 0;
      }
      // element.bg = this.backgroundColor[cont];
      // element.foto = this.urlFoto + element.clave + '.jpg';
      // element.resumen.forEach(item => {
      //   item.foto = this.urlFoto + item.clave + '.jpg';
      // });
      // this.totalPos = totalPos.reduce(function (valorAnterior, valorActual, indice, vector) {
      //   return valorAnterior + valorActual;
      // }, 10);

    });

    this.refreshGraficasPie(label, totalPos, bg, label2, totalCub, bg2, label3, totalFal, bg3, label4, totalCump, bg4)
    // this.pieData = {
    //   labels: label,
    //   datasets: [{
    //     data: totalPos
    //   }]
    // };

    // this.pieColors = [{
    //   borderColor: this.colors.byName('gray-light'),
    //   backgroundColor: bg,
    // }];

    // this.pieOptions = {
    //   responsive: true
    // };

    // this.pieData2 = {
    //   labels: label2,
    //   datasets: [{
    //     data: totalCub
    //   }]
    // };

    // this.pieColors2 = [{
    //   borderColor: this.colors.byName('gray-light'),
    //   backgroundColor: bg2,
    // }];

    // // this.totalCub = totalCub.reduce(function (valorAnterior, valorActual, indice, vector) {
    // //   return valorAnterior + valorActual;
    // // }, 10);

    // this.pieData3 = {
    //   labels: label3,
    //   datasets: [{
    //     data: totalFal
    //   }]
    // };

    // this.pieColors3 = [{
    //   borderColor: this.colors.byName('gray-light'),
    //   backgroundColor: bg3,
    // }];

    // // this.totalFal = totalFal.reduce(function (valorAnterior, valorActual, indice, vector) {
    // //   return valorAnterior + valorActual;
    // // }, 10);

    // this.pieData4 = {
    //   labels: label4,
    //   datasets: [{
    //     data: totalCump
    //   }]
    // };

    // this.pieColors4 = [{
    //   borderColor: this.colors.byName('gray-light'),
    //   backgroundColor: bg,
    // }];

    // this.totalCump = totalCump.reduce(function (valorAnterior, valorActual, indice, vector) {
    //   return valorAnterior + valorActual;
    // }, 10);

  }

  DetalleGerente(regionales)
  {

    const bg = [];
    const label = [];
    const totalPos = [];
    const bg2 = [];
    const label2 = [];
    const totalCub = [];
    const bg3 = [];
    const label3 = [];
    const totalFal = [];
    const bg4 = [];
    const label4 = [];
    const totalCump = [];

    this.gerente = [];
    let cont = 0;

      regionales.resumen.forEach(item => {
        this.gerente.push(
          {
            nombre: item.nombre,
            foto: this.urlFoto + item.clave + '.jpg',
            resumen: item.resumen,
            totalPos: item.totalPos,
            totalCub: item.totalCub,
            totalFal: item.totalPos - item.totalCub,
            totalCump: item.totalCub * 100 / item.totalPos || 0,
            bg: this.backgroundColor[cont],
          });
          totalPos.push(item.totalPos);
          label.push(item.nombre);
          bg.push(this.backgroundColor[cont]);

          totalCub.push(item.totalCub);
          label2.push(item.nombre);
          bg2.push(this.backgroundColor[cont]);

          totalFal.push(item.totalPos - item.totalCub);
          label3.push(item.nombre);
          bg3.push(this.backgroundColor[cont]);

          totalCump.push(item.totalCub * 100 / item.totalPos || 0);
          label4.push(item.nombre);
          bg4.push(this.backgroundColor[cont]);
          cont++;
      });

      this.totalPos = totalPos.reduce(function (valorAnterior, valorActual, indice, vector) {
        return valorAnterior + valorActual;
   }, 10);

    this.totalCub = totalCub.reduce(function (valorAnterior, valorActual, indice, vector) {
      return valorAnterior + valorActual;
 }, 10);

    this.totalFal = this.totalPos - this.totalCub;
    this.totalCump = this.totalCub * 100 / this.totalPos || 0;
  
        this.refreshGraficasPie(label, totalPos, bg, label2, totalCub, bg2, label3, totalFal, bg3, label4, totalCump, bg4);

  }

  refreshGraficasPie(label, totalPos, bg, label2, totalCub, bg2, label3, totalFal, bg3, label4, totalCump, bg4 )
  {
 
    this.pieData = {labels: [], datasets: []};

    this.pieData = {
      labels: label,
      datasets: [{
        data: totalPos
      }]
    };

    this.pieColors = [{
      borderColor: this.colors.byName('gray-light'),
      backgroundColor: bg,
    }];

    this.pieData2 = {
      labels: label2,
      datasets: [{
        data: totalCub
      }]
    };

    this.pieColors2 = [{
      borderColor: this.colors.byName('gray-light'),
      backgroundColor: bg2,
    }];

    this.pieData3 = {
      labels: label3,
      datasets: [{
        data: totalFal
      }]
    };

    this.pieColors3 = [{
      borderColor: this.colors.byName('gray-light'),
      backgroundColor: bg3,
    }];

    this.pieData4 = {
      labels: label4,
      datasets: [{
        data: totalCump
      }]
    };

    this.pieColors4 = [{
      borderColor: this.colors.byName('gray-light'),
      backgroundColor: bg4,
    }];
  }

  errorImg(item) {
  item.foto = '/assets/img/user/default.jpg';
  }
}
