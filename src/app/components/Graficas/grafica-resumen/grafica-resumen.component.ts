import { Component, OnInit } from '@angular/core';

import { Chart } from 'chart.js';
import { ComponentsService } from './../../../service/Components/components.service';
import { SettingsService } from '../../../core/settings/settings.service';

@Component({
  selector: 'app-grafica-resumen',
  templateUrl: './grafica-resumen.component.html',
  styleUrls: ['./grafica-resumen.component.scss']
})
export class GraficaResumenComponent implements OnInit {

  Chart: Chart;
  Data: any;
  private UsuarioId: any;

  constructor(
    private servicio:ComponentsService,
    private settings: SettingsService
    ) { }

  ngOnInit() {

    this.UsuarioId = this.settings.user['id'];
    document.oncontextmenu=null
    this.servicio.getVResumen(this.UsuarioId).subscribe(item =>{

      let dia5Ent = item['mes1Entrevista'];
      let dia5Env = item['mes1Enviado'];
      let dia5Con = item['mes1Contratado'];
      let dia10Ent = item['mes2Entrevista'];
      let dia10Env = item['mes2Enviado'];
      let dia10Con = item['mes2Contratado'];
      let dia15Ent = item['mes3Entrevista'];
      let dia15Env = item['mes3Enviado'];
      let dia15Con = item['mes3Contratado'];



    this.Data = {
      labels: ['Mes 1','Mes 2','Mes 3'],
    datasets: [{
        data: [dia5Ent,dia10Ent,dia15Ent],
        label: "Entrevistados",
        borderColor: "#1E37FF",
        fill: false
      }, {
        data: [dia5Env,dia10Env,dia15Env],
        label: "Enviados",
        borderColor: "#FF4B4B",
        fill: false
      }, {
        data: [dia5Con,dia10Con,dia15Con],
        label: "Cubiertos",
        borderColor: "#0FFF5B",
        fill: false
      }
    ]
    }
    this.Chart = new Chart('canvas5', {
      type: 'line',
      title: { text: 'Seguimiento de Vacantes' },
      data: this.Data,
      options: {

      }
    });
  });



  }
}
