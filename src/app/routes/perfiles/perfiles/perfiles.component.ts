import 'rxjs/add/operator/filter';

import { ActivatedRoute, CanDeactivate, Router, } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { SettingsService } from '../../../core/settings/settings.service';
import { settings } from 'cluster';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.scss']
})
export class PerfilesComponent implements OnInit {

  public foto:  string;
  public nombre:  string;
  public clave:  string;
  public tipo:  string;
  public sucursal:  string;
  public email:  string;
  public lider:  string;
  public departamento:  string;

  constructor(
    private _Route: ActivatedRoute,
    private settings: SettingsService
  ) { }

  ngOnInit() {
    this._Route.params.subscribe(params => {
      this.foto = params['picture'];
      this.nombre = params['name'];
      this.clave = params['clave'];
      this.tipo = params['tipo'];
      this.sucursal = params['sucursal'];
      this.email = params['email'];
      this.lider = params['lider'];
      this.departamento = params['departamento'];
      });
    }

    // let userName = this._Route.snapshot.paramMap.get('user');
      // this.settings.user.name = userName;

    // this._Route.params.forEach((params: Params) => {
    //   this.userName = params['user'];
    //   this.settings.user.name = this.userName;
    // });
  

}
