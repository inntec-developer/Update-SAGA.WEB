import { Component, OnInit } from '@angular/core';

import { ComponentsService } from './../../../service/Components/components.service';
import { SettingsService } from '../../../core/settings/settings.service';

@Component({
  selector: 'app-indicador-posiciones',
  templateUrl: './indicador-posiciones.component.html',
  styleUrls: ['./indicador-posiciones.component.scss'],
  providers: [ComponentsService]
})
export class IndicadorPosicionesComponent implements OnInit {

  public Posiciones: number;

  constructor(
    private _ComponentService: ComponentsService,
    private settings: SettingsService
  ) { }

  ngOnInit() {
    var user ={
      Id: this.settings.user['id'],
      TipoUsuarioId: this.settings.user['tipoUsuarioId']
    }
    this._ComponentService.getPosiciones(user).subscribe(result => {
      this.Posiciones = result;
    }, err => console.error(err));
  }

}
