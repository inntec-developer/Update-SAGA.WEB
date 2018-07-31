import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Directive, Input } from '@angular/core';

import { style } from '@angular/animations';

@Directive({
  selector: '[chkPrivilegiosButtons]'
})
export class ChkButtonsDirective implements AfterViewInit {
  @Input('ruta') ruta: any;
  constructor(private router: Router, private activeRoute: ActivatedRoute ) {

     }

  ngAfterViewInit(){ 
    var ruta; 
    var btncreate = document.querySelectorAll("#create");
    var btnupdate = document.querySelectorAll("#update");
    var btndelete = document.querySelectorAll("#delete");
    var btnspecial = document.querySelectorAll("#special");
    let privilegios = JSON.parse(localStorage.getItem('privilegios'))
     ruta = this.activeRoute.snapshot.routeConfig ? 
     this.activeRoute.routeConfig.data.componente : 
     localStorage.getItem('ruta')

    

    var campos = privilegios.filter(function(row){
      return row.tipoEstructuraId === 4 && row.nombre == ruta
       });

    campos.forEach(campo =>{
      if(btncreate.length > 0 && !campo.create)
      {
        for (var i = 0; i < btncreate.length; i++)
        {
          btncreate[i].setAttribute('hidden', 'true')
          if( btnupdate[i].childElementCount > 0)
          {
            btnupdate[i].firstElementChild.removeAttribute('disabled')
          }
        }
      }
      else if(btncreate.length > 0 && campo.create)
      {
        for (var i = 0; i < btncreate.length; i++)
        {
          btncreate[i].removeAttribute('hidden')
          if( btncreate[i].childElementCount > 0)
          {
            btncreate[i].firstElementChild.removeAttribute('disabled')
          }
        }
      }
      if(btnupdate.length > 0 && !campo.update)
      {
        for (var i = 0; i < btnupdate.length; i++) 
        {
          btnupdate[i].setAttribute('hidden', 'true')
          if(btnupdate[i].childElementCount > 0)
          {
            btnupdate[i].firstElementChild.removeAttribute('disabled')
          }
          
        }
      }
      else if(btnupdate.length > 0 && campo.update)
      {
        for (var i = 0; i < btnupdate.length; i++) 
        {
          btnupdate[i].removeAttribute('hidden')
          if(btnupdate[i].childElementCount > 0)
          {
            btnupdate[i].firstElementChild.removeAttribute('disabled')
          }
        }

      }
      if(btndelete.length > 0 && !campo.delete)
      {
  
        for (var i = 0; i < btndelete.length; i++)
        {
          btndelete[i].setAttribute('hidden', 'true')
          if( btndelete[i].childElementCount > 0)
          {
            btndelete[i].firstElementChild.removeAttribute('disabled')
          }
        }
      }
      else if(btndelete.length > 0 && campo.delete)
      {
        for (var i = 0; i < btndelete.length; i++)
        {
          btndelete[i].removeAttribute('hidden')
          if(btndelete[i].childElementCount > 0)
          {
            btndelete[i].firstElementChild.removeAttribute('disabled')
          }
        }

      }
      if(btnspecial.length > 0 && !campo.especial)
      {
        for (var i = 0; i < btnspecial.length; i++)
        {
          btnspecial[i].setAttribute('hidden', 'true')
          if(btnspecial[i].childElementCount > 0)
          {
            btnspecial[i].firstElementChild.removeAttribute('disabled')
          }
        }
      }
      else if(btnspecial.length > 0 && campo.especial)
      {
        for (var i = 0; i < btnspecial.length; i++)
        {
          btnspecial[i].removeAttribute('hidden')
          if(btnspecial[i].childElementCount > 0)
          {
            btnspecial[i].firstElementChild.removeAttribute('disabled')
          }
        }

      }
    });
}

  
      
}
