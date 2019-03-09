import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dlg-asignar-modulo',
  templateUrl: './dlg-asignar-modulo.component.html',
  styleUrls: ['./dlg-asignar-modulo.component.scss']
})
export class DlgAsignarModuloComponent implements OnInit {

  modulos = [];
  reclutador = sessionStorage.getItem('nombre');
  moduloId
  constructor(private _Router: Router) { }

  ngOnInit() {
    this.GetModulos();

  }

  GetModulos()
  {
    this.modulos.push({modulo: 'RECL01', tipo: 1, id: 1}, {modulo: 'EX01', tipo: 2, id: 2}, {modulo: 'EX02', tipo: 3, id: 3});
  }

  Iniciar(tipo, mod)
  {
    console.log(this.moduloId)
    console.log(tipo)
    sessionStorage.setItem('modulo', mod); 

    if(tipo == 1)
    {
      this._Router.navigate(['/tickets/turno'], { skipLocationChange: true });
    }
    else if(tipo==2)
    {
      this._Router.navigate(['/examenes/agregarResultPsico'], { skipLocationChange: true });
      
    }

  }
}
