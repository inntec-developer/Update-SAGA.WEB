import { forEach } from '@angular/router/src/utils/collection';

import { Directive, AfterViewInit } from '@angular/core';
import { Router,ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Directive({
  selector: '[chkPrivilegiosMenu]'
})
export class ChkPrivilegiosMenuDirective implements AfterViewInit {
  
  constructor(private router: Router, private activeRoute: ActivatedRoute ) {

     }

  ngAfterViewInit(){ 
    var btncreate = document.querySelectorAll("#create");
    var btnupdate = document.querySelectorAll("#update");
    var btndelete = document.querySelectorAll("#delete");

    console.log(btnupdate)

    let privilegios = JSON.parse(localStorage.getItem('privilegios'))
    let ruta = this.activeRoute.snapshot.routeConfig.data;

    var campos = privilegios.filter(function(row){
      return row.tipoEstructuraId === 4 && row.nombre == ruta.componente
       });

    console.log(ruta)
    console.log(campos)

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
