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
    private _Service: AuthService,
    private settings: SettingsService) {
    this.user = {
      picture: sessionStorage.getItem('foto'),
      name: sessionStorage.getItem('nombre'),
      clave: sessionStorage.getItem('clave'),
      tipo: sessionStorage.getItem('tipo'),
      sucursal: sessionStorage.getItem('sucursal')
    };
  }

  ngOnInit() {
  }

  userBlockIsVisible() {
    return this.userblockService.getVisibility();
  }

  errorImg(){
    this.user['picture'] = '/assets/img/user/default.jpg';
  }
}
