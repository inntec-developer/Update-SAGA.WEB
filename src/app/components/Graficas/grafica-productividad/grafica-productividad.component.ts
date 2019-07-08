import { Component, OnInit } from '@angular/core';

import { Chart } from 'chart.js';
import { ComponentsService } from './../../../service/Components/components.service';
import { SettingsService } from '../../../core/settings/settings.service';

@Component({
  selector: 'app-grafica-productividad',
  templateUrl: './grafica-productividad.component.html',
  styleUrls: ['./grafica-productividad.component.scss']
})
export class GraficaProductividadComponent implements OnInit {

  Chart: Chart;
  Data: any;
  private UsuarioId: any;
  public total : number;
  public General : any[];
  public nombres : string;
  public posiciones : string;
  public cubiertas : string;

  constructor(
    private servicio:ComponentsService,
    private settings: SettingsService
  ) { }

  ngOnInit() {

    var Onombre = [];
    var Opos = [];
    var Ocub = [];
    var Opunta = [];
    var cadena = "";
    this.UsuarioId = this.settings.user['id'];
     document.oncontextmenu=null
  this.servicio.getProductividad(this.UsuarioId).subscribe(item =>{
    this.General = item;

    item.forEach(item2 => {
      Onombre.push(item2.nombre)
      Opos.push(item2.numeropos)
      Ocub.push(item2.cubiertas)
      Opunta.push(item2.puntaje)
      // this.nombres += '"'+ item2.nombre +'"'+',';
      //  this.posiciones += item2.numeropos+',';
      //  this.cubiertas += item2.cubiertas+',';
     });
    //  this.nombres = this.nombres.substring(9,this.nombres.length-1)
    //  this.posiciones = this.posiciones.substring(9,this.posiciones.length-1)
    //  this.cubiertas = this.cubiertas.substring(9,this.cubiertas.length-1)
//  prueba = this.nombres;
    //  this.nombres = '[' + this.nombres.substring(9,this.nombres.length-1) +']'
    //  this.posiciones = '[' +  this.posiciones.substring(9,this.posiciones.length-1) +']'
    //  this.cubiertas = '[' +  this.cubiertas.substring(9,this.cubiertas.length-1) +']'

    this.Data = {
      labels: Onombre,
      datasets: [
        {
          label: "N. Posiciones",
          backgroundColor: "#6087FF",
          data: Opos
        }, {
          label: "Cubiertas",
          backgroundColor: "#FF4571",
          data: Ocub
        }
        , {
          label: "Puntaje",
          backgroundColor: "#0FFF5B",
          data: Opunta
        }
      ]
    }

   this.Chart = new Chart('productividad', {
     type: 'bar',
     data: this.Data,
     options: {
      title: {
        text: 'Population growth (millions)'
      }
     },
   });

   // cadena = "[" + this.nombres + "]";
  })


  //  this.Data = {
  //   labels: ["1900", "1950", "1999", "2050"],
  //   datasets: [
  //     {
  //       label: "Africa",
  //       backgroundColor: "#3e95cd",
  //       data: [133,221,783,2478]
  //     }, {
  //       label: "Europe",
  //       backgroundColor: "#8e5ea2",
  //       data: [408,547,675,734]
  //     }
  //   ]
  // }



  }
}
