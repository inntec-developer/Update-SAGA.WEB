import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ApiConection } from './../../../service/api-conection.service';
import { CustomValidators } from 'ng2-validation';
import { SettingsService } from '../../../core/settings/settings.service';

@Component({
    selector: 'app-damfo',
    templateUrl: './damfo290.component.html',
    styleUrls: ['./damfo290.component.scss']
})

export class Damfo290Component implements OnInit {
  public URL: string;
  private UrlFormato = ApiConection.ServicioUrl290
  constructor(
    private settings : SettingsService
  ) { }

  ngOnInit(){
    this.goToDamfo();
  }

  goToDamfo(){
    var window290 = window.open(this.UrlFormato+localStorage.getItem('usuario'), "_blank", 
      "toolbar=no,scrollbars=no,resizable=no,status=no,menubar=no,location=no,fullscreen=yes,directories=no");
  }
}
