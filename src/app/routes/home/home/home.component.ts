import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

import { DialogEventComponent } from './../../../components/calendario/dialog-event/dialog-event.component';
import { MatDialog } from '@angular/material';
import { SettingsService } from '../../../core/settings/settings.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: []
})
export class HomeComponent implements OnInit {
  public UpdateFolios: any;
  public UpdatePosiciones: any;
  public GrtOrAud = [1, 3, 8, 12, 13, 14];
  public isGerenteOrAudito: boolean = false;
  constructor(private settings: SettingsService
  ) {
  }

  ngOnInit() {
    var tipoUsuserio = this.settings['user']['tipoUsuarioId']
    if (this.GrtOrAud.find(x => x == tipoUsuserio)) {
      this.isGerenteOrAudito = true
    }
  }

  changeFolios($event: any) {
    this.UpdateFolios = $event;
  }

  changePosiciones($event: any) {
    this.UpdatePosiciones = $event;
  }

}
