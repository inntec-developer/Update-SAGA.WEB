import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ComponentsService } from './../../../service/Components/components.service';

@Component({
  selector: 'app-grafica-resumen',
  templateUrl: './grafica-resumen.component.html',
  styleUrls: ['./grafica-resumen.component.scss']
})
export class GraficaResumenComponent implements OnInit {

  Chart: Chart;
  Data: any;
  private UsuarioId: any;

  constructor(private servicio:ComponentsService) { }

  ngOnInit() {

    this.UsuarioId = sessionStorage.getItem('id');
    document.oncontextmenu=null
    this.servicio.getVResumen(this.UsuarioId).subscribe(item =>{

      let dia5Ent = item['dia5Entrevista'];
      let dia5Env = item['dia5Enviado'];
      let dia5Con = item['dia5Contratado'];
      let dia10Ent = item['dia10Entrevista'];
      let dia10Env = item['dia10Enviado'];
      let dia10Con = item['dia10Contratado'];
      let dia15Ent = item['dia15Entrevista'];
      let dia15Env = item['dia15Enviado'];
      let dia15Con = item['dia15Contratado'];
      let dia20Ent = item['dia20Entrevista'];
      let dia20Env = item['dia20Enviado'];
      let dia20Con = item['dia20Contratado'];
      let dia25Ent = item['dia25Entrevista'];
      let dia25Env = item['dia25Enviado'];
      let dia25Con = item['dia25Contratado'];
      let dia30Ent = item['dia30Entrevista'];
      let dia30Env = item['dia30Enviado'];
      let dia30Con = item['dia30Contratado'];

    this.Data = {
      labels: ['25 a 30 dias','20 a 25 dias','15 a 20 dias','10 a 15 dias','5 a 10 dias','hoy a 5 dias'],
    datasets: [{ 
        data: [dia30Ent,dia25Ent,dia20Ent,dia15Ent,dia10Ent,dia5Ent],
        label: "entrevistados",
        borderColor: "#1E37FF",
        fill: false
      }, { 
        data: [dia30Env,dia25Env,dia20Env,dia15Ent,dia10Env,dia5Env],
        label: "enviados",
        borderColor: "#FF4B4B",
        fill: false
      }, { 
        data: [dia30Con,dia25Con,dia20Con,dia15Con,dia10Con,dia5Con],
        label: "contrados",
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
