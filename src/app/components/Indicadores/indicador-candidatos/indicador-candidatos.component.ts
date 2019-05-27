import { Component, OnInit } from '@angular/core';

import { ComponentsService } from './../../../service/Components/components.service';
import { SettingsService } from '../../../core/settings/settings.service';

@Component({
  selector: 'app-indicador-candidatos',
  templateUrl: './indicador-candidatos.component.html',
  styleUrls: ['./indicador-candidatos.component.scss'],
  providers: [ComponentsService]
})
export class IndicadorCandidatosComponent implements OnInit {
  public Candidatos: number;

  constructor(
    private _ComponentService: ComponentsService
  ) { }

  ngOnInit() {
    this._ComponentService.getCandidatos().subscribe(result => {
      this.Candidatos = result;
    }, err => console.error(err))
  }

}
