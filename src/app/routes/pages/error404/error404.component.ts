import { Component, OnInit } from '@angular/core';

import { SettingsService } from '../../../core/settings/settings.service';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss']
})
export class Error404Component implements OnInit {
  usuario: string;

  constructor(public settings: SettingsService) { }

  ngOnInit() {
    this.usuario = localStorage.getItem('usuario');
  }

}
