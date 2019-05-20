import { Component, Input, OnInit } from '@angular/core';

import { SettingsService } from '../../../core/settings/settings.service';

@Component({
  selector: 'btn-dislike',
  templateUrl: './button-dislike.component.html',
  styleUrls: ['./button-dislike.component.scss']
})
export class ButtonDislikeComponent implements OnInit {
  @Input('VacanteId') vacantesId : string;
  @Input('Status') Status: any;;
  @Input('RequisicionId') requisicionId: string;
  @Input('Reclutador') Reclutador: string;
  Usuario : any;


  constructor(private settings: SettingsService) {
    this.Usuario = this.settings.user['nombre'];
   }

  ngOnInit() {
  }

}
