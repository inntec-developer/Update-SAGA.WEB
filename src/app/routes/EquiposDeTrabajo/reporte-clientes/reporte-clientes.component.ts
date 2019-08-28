import { ColorsService } from './../../../shared/colors/colors.service';
import { EquiposTrabajoService } from './../../../service/EquiposDeTrabajo/equipos-trabajo.service';
import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../core/settings/settings.service';
import { element } from 'protractor';

@Component({
  selector: 'app-reporte-clientes',
  templateUrl: './reporte-clientes.component.html',
  styleUrls: ['./reporte-clientes.component.scss']
})
export class ReporteClientesComponent implements OnInit {
  // config scroll
  disabled = false;
  compact = false;
  invertX = false;
  invertY = false;
  shown = 'hover';

  reporte = [];
  totalPos = 0;
  totalCub = 0;
  totalFal = 0;
  totalCump = 0;
  usuarioLogin = '';
  titulo = '';
  clienteId: any;
  modal = false;
  modal2 = false;
  orden = 0;

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

  constructor(private _service: EquiposTrabajoService, private settings: SettingsService, public colors: ColorsService ) {
    this.usuarioLogin = this.settings.user['id']; // this.settings.user['id']; FA6039C6-6497-E911-8993-B2AAD340F890 gg
    // 6A0B5070-5797-E911-8993-B2AAD340F890 regional gdl
    // FAD3AB2A-5797-E911-8993-B2AAD340F890 regional mty
    // DA9F33E3-5697-E911-8993-B2AAD340F890 regional mx
   }

  ngOnInit() {
    this.GetReporteClientes();
  }

  GetReporteClientes() {
    this._service.GetRportClientes(this.usuarioLogin).subscribe(data => {
      this.reporte = data;
      this.totalCub = 0;
      this.totalPos = 0;
      this.totalFal = 0;
      this.totalCump = 0;
      console.log(this.reporte)
      this.reporte.forEach( element => {
        this.totalPos += element.totalPos;
        this.totalCub += element.totalCub;
        element.totalCump =  Math.round(element.totalPos > 0 ? element.totalCub * 100 / element.totalPos : 0);
        element.totalFal = element.totalPos - element.totalCub;

        // const distinctThings =   element.reclutadores.filter(
        //     (thing, i, arr) => arr.findIndex(t => t.reclutadorId === thing.reclutadorId) === i
        //   );
        // element.reclutadores = distinctThings;

      });

      this.totalCump = Math.round(this.totalPos > 0 ? this.totalCub * 100 / this.totalPos : 0);
      this.totalFal = this.totalPos - this.totalCub;

    });
  }

  errorImg(item) {
    item.foto = '/assets/img/user/default.jpg';
    }

}
