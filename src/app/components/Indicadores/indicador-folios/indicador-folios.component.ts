import { Component, OnInit } from '@angular/core';

import { ComponentsService } from './../../../service/Components/components.service';
import { SettingsService } from '../../../core/settings/settings.service';

@Component({
  selector: 'app-indicador-folios',
  templateUrl: './indicador-folios.component.html',
  styleUrls: ['./indicador-folios.component.scss'],
  providers: [ComponentsService]
})
export class IndicadorFoliosComponent implements OnInit {
  public Folios: number;
  constructor(
    private _ComponentService:  ComponentsService,
    private settings: SettingsService
  ) { }

  ngOnInit() {
    var user ={
      Id: this.settings.user['id'],
      TipoUsuarioId: this.settings.user['tipoUsuarioId']
    }
    this._ComponentService.getFolios(user).subscribe(result => {
      this.Folios = result
    }, err => console.error(err));
  }
}
