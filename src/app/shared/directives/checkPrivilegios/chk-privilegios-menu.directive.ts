import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AfterViewInit, Directive } from '@angular/core';

import { SettingsService } from "../../../core/settings/settings.service";
import { forEach } from '@angular/router/src/utils/collection';

@Directive({
  selector: '[chkPrivilegiosMenu]'
})
export class ChkPrivilegiosMenuDirective implements AfterViewInit {

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private settings: SettingsService
    ) {

  }

  ngAfterViewInit() {
    debugger;
    var btncreate = document.querySelectorAll("#create");
    var btnupdate = document.querySelectorAll("#update");
    var btndelete = document.querySelectorAll("#delete");
    let privilegios = this.settings.user['privilegios'];
    let ruta = this.activeRoute.snapshot.routeConfig.data;

    var campos = privilegios.filter(function(row){
      return row.tipoEstructuraId === 4 && row.nombre == ruta.componente
       });

    campos.forEach(campo =>{
      if(btncreate != null && !campo.create)
      {
        for (var i = 0; i < btncreate.length; i++)
        {
          var cre = btncreate[i].querySelector("button");
          cre.setAttribute('disabled','')
        }
      }
      if(btnupdate != null && !campo.update)
      {
        for (var i = 0; i < btnupdate.length; i++)
        {
          var upd = btnupdate[i].querySelector("button");
          upd.setAttribute('disabled','')
        }
      }
      if(btndelete != null && !campo.delete)
      {
        for (var i = 0; i < btndelete.length; i++)
        {
          var dlt = btndelete[i].querySelector('button')
          dlt.setAttribute('disabled','')
        }
      }
    });
  }
}
