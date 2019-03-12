import { Component, OnInit } from '@angular/core';

import { ApiConection } from '../../../service/api-conection.service';
import { SettingsService } from '../../../core/settings/settings.service';
import { UserblockService } from './userblock.service';

@Component({
    selector: 'app-userblock',
    templateUrl: './userblock.component.html',
    styleUrls: ['./userblock.component.scss']
})
export class UserblockComponent implements OnInit {
    user: any;
    default: string;
    constructor(
        public userblockService: UserblockService,
        private settings : SettingsService) {
        this.user = {
            picture: ApiConection.ServiceUrlFoto + sessionStorage.getItem('foto'),
            name: sessionStorage.getItem('nombre'),
            clave: sessionStorage.getItem('clave'),
            tipo: sessionStorage.getItem('tipo'),
            sucursal: sessionStorage.getItem('sucursal')
        };
        if(this.user.picture == null || this.user.picture == '')
            this.user.picture = '/assets/img/user/default.jpg'
    }

    ngOnInit() {
    }

    userBlockIsVisible() {
        return this.userblockService.getVisibility();
    }

}