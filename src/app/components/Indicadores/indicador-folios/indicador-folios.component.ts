import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

import { ComponentsService } from './../../../service/Components/components.service';
import { SettingsService } from '../../../core/settings/settings.service';

@Component({
  selector: 'app-indicador-folios',
  templateUrl: './indicador-folios.component.html',
  styleUrls: ['./indicador-folios.component.scss'],
  providers: [ComponentsService]
})
export class IndicadorFoliosComponent implements OnInit {
  @Input('UpdateFolios') UpdateFolios: any;
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
      this.UpdateFolios = result;
      this.Folios = result
    }, err => console.error(err));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.UpdateFolios && !changes.UpdateFolios.isFirstChange()) {
      this.Folios = this.UpdateFolios;
    }
  }
}
