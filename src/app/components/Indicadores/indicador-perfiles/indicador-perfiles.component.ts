import { Component, OnInit } from '@angular/core';

import { ComponentsService } from './../../../service/Components/components.service';
import { SettingsService } from '../../../core/settings/settings.service';

@Component({
  selector: 'app-indicador-perfiles',
  templateUrl: './indicador-perfiles.component.html',
  styleUrls: ['./indicador-perfiles.component.scss'],
  providers: [ComponentsService]
})
export class IndicadorPerfilesComponent implements OnInit {
  public Perfiles : number;
  constructor(
    private _ComponeteServices:  ComponentsService,
    private settings: SettingsService
  ) { }

  ngOnInit() {
    this._ComponeteServices.getPerfiles().subscribe(result =>{
      debugger;
      this.Perfiles = result
    }, err => console.error(err));
  }

}
