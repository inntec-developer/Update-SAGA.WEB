import * as jwt_decode from 'jwt-decode';

import { Component, OnInit, SimpleChanges } from '@angular/core';

import { ApiConection } from '../../../service/api-conection.service';
import { AuthService } from '../../../service/auth/auth.service';
import { SettingsService } from '../../../core/settings/settings.service';
import { UserblockService } from './userblock.service';

@Component({
  selector: 'app-userblock',
  templateUrl: './userblock.component.html',
  styleUrls: ['./userblock.component.scss'],
  providers: [AuthService]
})
export class UserblockComponent implements OnInit {
  user: any;
  default: string;
  constructor(
    public userblockService: UserblockService,
    private settings: SettingsService
  ) { }

  ngOnInit() {
    this.user = {
      picture: ApiConection.ServiceUrlFotoUser + this.settings.user['clave'] + '.jpg',
      name: this.settings.user['nombre'],
      clave: this.settings.user['clave'],
      tipo: this.settings.user['tipo'],
      sucursal: this.settings.user['sucursal'],
      email: this.settings.user['email'],
      lider: this.settings.user['lider'],
      departamento: this.settings.user['departamento'],
      roles: this.settings.user['roles']
    };
  }



  userBlockIsVisible() {
    return this.userblockService.getVisibility();
  }

  errorImg() {
    this.user['picture'] = '/assets/img/user/default.jpg';
  }
}
