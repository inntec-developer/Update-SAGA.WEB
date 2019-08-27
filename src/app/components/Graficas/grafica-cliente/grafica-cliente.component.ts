import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ComponentsService } from './../../../service/Components/components.service';
import { ReportesService } from '../../../service/Reporte/reportes.service';
import { SettingsService } from '../../../core/settings/settings.service';
import { ColorPicker } from 'primeng/primeng';
import { NgxSpinnerService } from 'ngx-spinner';
import { ColorPickerComponent } from 'ngx-color-picker/dist/lib/color-picker.component';

@Component({
  selector: 'app-grafica-cliente',
  templateUrl: './grafica-cliente.component.html',
  styleUrls: ['./grafica-cliente.component.scss']
})
export class GraficaClienteComponent implements OnInit {

  Chart: Chart;
  Data: any;
  private UsuarioId: any;
  public nombreCliente:string;

  constructor(
    private servicio:ReportesService,
    private settings: SettingsService,
    private spinner:NgxSpinnerService
    ) { }

    ngOnInit(){

    }

    Generar(empresa,cordina) {
      this.spinner.show();
      document.getElementById('DivClientes').classList.add('ocultar');
    document.getElementById('DivGraficaCliente').classList.remove('ocultar');

    let inc = document.getElementById('fechaInicial')['value'];
    let fin = document.getElementById('fechaFinal')['value'];

  this.servicio.getClientes(inc,fin,"2").subscribe(item =>{

    if(this.Chart != null){
      this.Chart.destroy();
    }
 
    var Onombre = [];
    var Opos = [];
    item.forEach(item2 => {
      Onombre.push(item2.nombre)
      Opos.push(item2.numeropos)
     });
     this.spinner.hide();
   this.Data = {
     datasets: [{
       backgroundColor:["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", 
       "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970","#111111","#AAAAAA" , 
       ColorPickerComponent],
       data: Opos
     }],
     labels: Onombre
   }
   this.Chart = new Chart('GraficaClientes', {
     type: 'pie',
     title: { text: 'Seguimiento de Vacantes' },
     data: this.Data,
     options: {
     // onClick: this.detectedClick.bind(this),
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
     },
 
   });
  })

  }

}
