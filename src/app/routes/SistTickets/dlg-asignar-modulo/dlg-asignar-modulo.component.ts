import { SistTicketsService } from './../../../service/SistTickets/sist-tickets.service';
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
  constructor(private _Router: Router, private _service: SistTicketsService) { }

  ngOnInit() {
    this.GetModulos();

  }

  GetModulos()
  {
    this._service.GetModulos().subscribe(data =>{
      this.modulos = data;
    })
  }

  Iniciar(tipo, mod)
  {
    console.log(this.moduloId)
    console.log(tipo)
    sessionStorage.setItem('modulo', mod); 
    sessionStorage.setItem('moduloId', this.moduloId)

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
