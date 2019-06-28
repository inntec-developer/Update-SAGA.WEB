import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { SettingsService } from '../../../core/settings/settings.service';
import { SistTicketsService } from './../../../service/SistTickets/sist-tickets.service';

@Component({
  selector: 'app-dlg-asignar-modulo',
  templateUrl: './dlg-asignar-modulo.component.html',
  styleUrls: ['./dlg-asignar-modulo.component.scss']
})
export class DlgAsignarModuloComponent implements OnInit {

  modulos = [];
  reclutador = this.settings.user['nombre'];
  tipoModulo = '';
  mod: any;
  tipo: any;
  constructor(private _Router: Router, private _service: SistTicketsService, private settings: SettingsService) { }

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

    sessionStorage.setItem('modulo', mod);
    sessionStorage.setItem('tipoModulo', this.tipoModulo)

    if(tipo == 1 || tipo == 2)
    {
      this._Router.navigate(['/tickets/turno'], { skipLocationChange: true });
    }
    else if(tipo == 3)
    {
      this._Router.navigate(['/tickets/Examenes'], { skipLocationChange: true });

    }

  }
}
