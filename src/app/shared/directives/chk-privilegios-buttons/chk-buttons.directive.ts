import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Directive, Input } from '@angular/core';

import { SettingsService } from '../../../core/settings/settings.service';

@Directive({
  selector: '[chkPrivilegiosButtons]'
})
export class ChkButtonsDirective implements AfterViewInit {
  @Input('ruta') ruta: any;
  constructor(
    private activeRoute: ActivatedRoute,
    private settings: SettingsService) {

  }

  ngAfterViewInit() {
    let ruta = null;

    const btncreate = document.querySelectorAll('#create');
    const btnupdate = document.querySelectorAll('#update');
    const btndelete = document.querySelectorAll('#delete');
    const btnspecial = document.querySelectorAll('#special');
    const privilegios = this.settings.user['privilegios'];

    ruta = this.activeRoute.snapshot.routeConfig.data ?
      this.activeRoute.snapshot.routeConfig.data.componente :
      sessionStorage.getItem('ruta');

    if (ruta == null) {
      ruta = this.activeRoute.snapshot.routeConfig.path;
    }
    // this.activeRoute.snapshot.routeConfig.path
    const campos = privilegios.filter(row => {
      // if(ruta == null)
      // {
      //   var idx = row.accion.lastIndexOf('/');
      //   ruta = row.accion.substring(idx + 1, row.accion.length).toUpperCase();
      // }
      if ((row.TipoEstructuraId === 3 || row.TipoEstructuraId === 4) &&
        row.Nombre.toLowerCase() === ruta.toLowerCase()) {
        return row;
      }
    });

    campos.forEach(campo => {
      if (btncreate.length > 0 && !campo.Create) {
        for (let i = 0; i < btncreate.length; i++) {
          btncreate[i].setAttribute('hidden', 'true');
          if (btncreate[i].childElementCount > 0) {
            btncreate[i].firstElementChild.removeAttribute('disabled');
          }
        }
      } else if (btncreate.length > 0 && campo.Create) {
        for (var i = 0; i < btncreate.length; i++) {
          btncreate[i].removeAttribute('hidden')
          if (btncreate[i].childElementCount > 0) {
            btncreate[i].firstElementChild.removeAttribute('disabled');
          }
        }
      }
      if (btnupdate.length > 0 && !campo.Update) {
        for (var i = 0; i < btnupdate.length; i++) {
          btnupdate[i].setAttribute('hidden', 'true')
          if (btnupdate[i].childElementCount > 0) {
            btnupdate[i].firstElementChild.removeAttribute('disabled')
          }
        }
      } else if (btnupdate.length > 0 && campo.Update) {
        for (var i = 0; i < btnupdate.length; i++) {
          btnupdate[i].removeAttribute('hidden');
          if (btnupdate[i].childElementCount > 0) {
            btnupdate[i].firstElementChild.removeAttribute('disabled');
          }
        }

      }
      if (btndelete.length > 0 && !campo.Delete) {
        for (var i = 0; i < btndelete.length; i++) {
          btndelete[i].setAttribute('hidden', 'true');
          if (btndelete[i].childElementCount > 0) {
            btndelete[i].firstElementChild.removeAttribute('disabled');
          }
        }
      } else if (btndelete.length > 0 && campo.Delete) {
        for (var i = 0; i < btndelete.length; i++) {
          btndelete[i].removeAttribute('hidden');
          if (btndelete[i].childElementCount > 0) {
            btndelete[i].firstElementChild.removeAttribute('disabled');
          }
        }
      }
      if (btnspecial.length > 0 && !campo.Especial) {
        for (var i = 0; i < btnspecial.length; i++) {
          btnspecial[i].setAttribute('hidden', 'true');
          if (btnspecial[i].childElementCount > 0) {
            btnspecial[i].firstElementChild.removeAttribute('disabled');
          }
        }
      } else if (btnspecial.length > 0 && campo.Especial) {
        for (var i = 0; i < btnspecial.length; i++) {
          btnspecial[i].removeAttribute('hidden');
          if (btnspecial[i].childElementCount > 0) {
            btnspecial[i].firstElementChild.removeAttribute('disabled');
          }
        }
      }
    });
  }
}
