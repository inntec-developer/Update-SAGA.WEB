import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ComponentsService } from './../../../service/Components/components.service';
import { ReportesService } from '../../../service/Reporte/reportes.service';
import { SettingsService } from '../../../core/settings/settings.service';
import { ColorPicker } from 'primeng/primeng';
import { NgxSpinnerService } from 'ngx-spinner';
import { ColorPickerComponent } from 'ngx-color-picker/dist/lib/color-picker.component';

@Component({
  selector: 'app-grafica-resumen',
  templateUrl: './grafica-resumen.component.html',
  styleUrls: ['./grafica-resumen.component.scss']
})
export class GraficaResumenComponent implements OnInit {

  Chart: Chart;
  Data: any;
  private UsuarioId: any;
  public nombreCliente: string;

  constructor(
    private servicio: ReportesService,
    private settings: SettingsService,
    private spinner: NgxSpinnerService
    ) { }

    ngOnInit() {
    }

    Generar(empresa,cordina) {
      this.spinner.show();
      document.getElementById('DivVacante').classList.add('ocultar');
    document.getElementById('DivGraficaVacante').classList.remove('ocultar');

    var emp = '';
    var coo = '';
   
    if(this.Chart != null){
      this.Chart.destroy();
    }

    if(cordina != undefined){
      for (let item of cordina) {
        coo += item +',';
      }
    }

    coo = cordina == undefined?'0':coo;
    emp = empresa == undefined?'0':empresa;
  this.servicio.getVacante(emp,coo).subscribe(item => {
    if(item.length > 0) {
 this.nombreCliente = item[0].vacantenombre;
    var Onombre = [];
    var Opos = [];
    item.forEach(item2 => {
      Onombre.push(item2.perfil)
      Opos.push(item2.numeropos)
     });
     this.spinner.hide();
   this.Data = {
     datasets: [{
       backgroundColor:["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", 
       "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970","#AAAAAA", "#111111", 
       ColorPickerComponent],
       data: Opos
     }],
     labels: Onombre
   }
   this.Chart = new Chart('GraficaVacante', {
     type: 'pie',
    //  title: { text: 'Seguimiento de Vacantes' },
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
  } else {
    this.spinner.hide();
  }
  });
  }
}
