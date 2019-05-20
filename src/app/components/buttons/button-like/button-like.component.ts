import { Component, Input, OnInit } from '@angular/core';

import { SettingsService } from '../../../core/settings/settings.service';

@Component({
  selector: 'btn-like',
  templateUrl: './button-like.component.html',
  styleUrls: ['./button-like.component.scss']
})
export class ButtonLikeComponent implements OnInit {
  @Input('VacanteId') vacantesId : string;
  @Input('Status') Status: any;
  @Input('RequisicionId') requisicionId: string;
  @Input('Reclutador') Reclutador: string;
  Usuario : any;


  constructor(private settings: SettingsService) {
    this.Usuario = this.settings.user['nombre'];
    this.Reclutador == null ? '' : this.Reclutador
   }

  ngOnInit() {
  }

}
