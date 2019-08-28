import { SettingsService } from './../../../core/settings/settings.service';

import { ColorsService } from '../../../shared/colors/colors.service';
import { EquiposTrabajoService } from './../../../service/EquiposDeTrabajo/equipos-trabajo.service';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';



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

  modal = false;
  usuarioId: any;
  orden: number;
  titulo = '';

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
  pieData: { labels: any[]; datasets: { data: any[], backgroundColor: any[], borderColor: any[] }[]; };
  pieData2: { labels: any[]; datasets: { data: any[], borderColor: any[]; backgroundColor: any[]; }[]; };
  pieData3: { labels: any[]; datasets: { data: any[], borderColor: any[]; backgroundColor: any[]; }[]; };
  pieData4: { labels: any[]; datasets: { data: any[], borderColor: any[]; backgroundColor: any[]; }[]; };

  Chart: Chart;
  Chart2: Chart;
  Chart3: Chart;
  Chart4: Chart;

  migas = [];
  migasId: any;
  lider: any;
  ant = [];
  sig = [];
  sub: any;
  migasDtos = [];
  usuarioLogin = this.settings.user['id'];
  constructor(private _service: EquiposTrabajoService, public colors: ColorsService, private settings: SettingsService) { }

  ngOnInit() {
    this.GetRport();
  }

  GetRport() {
    this._service.GetRportGG('FA6039C6-6497-E911-8993-B2AAD340F890').subscribe(result => {
      if (result !== 417) {

        this.reporte = result;
      this.loadCharts(this.reporte[0]);
      }
    });
  }

  loadCharts(row) {
    let cont = 0;
    this.gerente = [];
    this.usuarioId = row.reclutadorId;
    this.migasDtos.push(row);

    if (this.migas.length > 0) {
      this.lider = this.migas[this.migas.length - 1];
      this.sub = row.nombre;
      this.migas.push(row.nombre);
    } else {
      this.migas.push(row.nombre);
      this.lider = '';
      this.sub = row.nombre;
    }

    if (row.tipoUsuario === 4) {
      this.gerente.push({
        reclutadorId: row.reclutadorId,
        nombre: row.nombre,
        foto: row.foto,
        resumen: row.resumen,
        totalPos: row.totalPos,
        totalCub: row.totalCub,
        totalFal: row.totalPos - row.totalCub,
        totalCump: Math.round(row.totalCub * 100 / row.totalPos || 0),
        bg: this.backgroundColor[cont],
      });
      cont++;
    }
    if (row.resumen.length > 0) {
      row.resumen.forEach(element => {
        if (row.tipoUsuario === 4) {
        this.gerente[0]['totalPos'] = this.gerente[0]['totalPos'] - element.totalPos;
        this.gerente[0]['totalCub'] = this.gerente[0]['totalCub'] - element.totalCub;
        }
        this.gerente.push({
          reclutadorId: element.reclutadorId,
          nombre: element.nombre,
          foto: element.foto,
          resumen: element.resumen,
          totalPos: element.totalPos,
          totalCub: element.totalCub,
          totalFal: element.totalPos - element.totalCub,
          totalCump: Math.round(element.totalCub * 100 / element.totalPos || 0),
          bg: this.backgroundColor[cont],
        });
        cont++;
      });
      if (row.tipoUsuario === 4) {
      this.gerente[0]['totalFal'] = this.gerente[0]['totalPos'] - this.gerente[0]['totalCub'];
      this.gerente[0]['totalCump'] =  Math.round(this.gerente[0]['totalCub'] * 100 / this.gerente[0]['totalPos'] || 0);
      }
      this.totalPos = row.totalPos;
      this.totalCub = row.totalCub;
      this.totalFal = this.totalPos - this.totalCub;
      this.totalCump = Math.round(this.totalCub * 100 / this.totalPos || 0);
      //   this.totalPos = totalPos.reduce(function (valorAnterior, valorActual, indice, vector) {
      //       return valorAnterior + valorActual;
      //  }, 10);

      this.refreshGraficasPie(this.gerente);
    }
  }

  loadMigas(flag) {

    let aux = [];
    if (flag === 1) {
      this.migas = [];
      aux = this.migasDtos[0];
      this.migasDtos = [];
    } else {
      this.migas.pop();
      this.migas.pop();
      this.migasDtos.pop();

      aux = this.migasDtos[this.migasDtos.length - 1];
      this.migasDtos.pop();
    }
    this.loadCharts(aux);
  }

  refreshGraficasPie(data) {
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

    if (this.Chart)
    {
      this.Chart.destroy();
      this.Chart2.destroy();
      this.Chart3.destroy();
      this.Chart4.destroy();
    }

    data.forEach(item => {
      totalPos.push(item.totalPos);
      label.push(item.nombre);
      bg.push(this.backgroundColor[cont]);

      totalCub.push(item.totalCub);
      label2.push(item.nombre);
      bg2.push(this.backgroundColor[cont]);

      totalFal.push(item.totalPos - item.totalCub);
      label3.push(item.nombre);
      bg3.push(this.backgroundColor[cont]);

      totalCump.push(Math.round(item.totalCub * 100 / item.totalPos || 0));
      label4.push(item.nombre);
      bg4.push(this.backgroundColor[cont]);
      cont++;
    });

    this.pieData = {
      labels: label,
      datasets: [{
        backgroundColor: bg,
        data: totalPos,
        borderColor: this.colors.byName('gray-light')
      }]
    };

    this.Chart = new Chart('canvasPos', {
      type: 'pie',
      data: this.pieData,
      options: {
        legend: {
          display: false,
        },
      }
    });

    this.pieData2 = {
      labels: label2,
      datasets: [{
        backgroundColor: bg2,
        data: totalCub,
        borderColor: this.colors.byName('gray-light'),
      }]
    };

    this.Chart2 = new Chart('canvasCub', {
      type: 'pie',
      data: this.pieData2,
      options: {
        legend: {
          display: false,
        },
      }
    });

    this.pieData3 = {
      labels: label3,
      datasets: [{
        backgroundColor: bg3,
        data: totalFal,
        borderColor: this.colors.byName('gray-light'),
      }]
    };

    this.Chart3 = new Chart('canvasFal', {
      type: 'pie',
      data: this.pieData3,
      options: {
        legend: {
          display: false,
        },
      }
    });

    this.pieData4 = {
      labels: label4,
      datasets: [{
        backgroundColor: bg4,
        data: totalCump,
        borderColor: this.colors.byName('gray-light'),
      }]
    };

    this.Chart4 = new Chart('canvasCump', {
      type: 'pie',
      data: this.pieData4,
      options: {
       // onClick: this.detectedClick.bind(this, 4),
        legend: {
          display: false,
        },
      }
    });

  }

mocos() {
  this.modal = true;

}
round(value, precision): any {
  const rounder = Math.pow(10, precision);
  return (Math.round(value * rounder) / rounder).toFixed(precision);
}
  errorImg(item) {
  item.foto = '/assets/img/user/default.jpg';
  }
}
