import * as jwt_decode from 'jwt-decode';

import { Injectable } from '@angular/core';
import { SettingsService } from '../settings/settings.service';
const CerrarSesion = {
  text: 'Cerrar Sesión',
  link: '/pages/login',
  icon: 'fa fa-power-off',
};
@Injectable()
export class MenuService {
  menuItems: Array<any>;
  submenu: Array<any> = [];
  Priv : Array<any> = [];

  constructor(
    private settings: SettingsService
  ) {

    this.menuItems = [];
  }
  addMenu(items: Array<{
    text: string,
    heading?: boolean,
    link?: string,     // internal route links
    elink?: string,    // used only for external links
    target?: string,   // anchor target="_blank|_self|_parent|_top|framename"
    icon?: string,
    alert?: string,
    submenu?: Array<any>

  }>) {
    items.forEach((item) => {
      this.menuItems.push(item);
    });
  }

  getMenu() {
    return this.menuItems;
  }

  /*recursividad para generar el menu*/
  setSubMenu(modules, privilegios) {

    const menuList = [];

    modules.children = privilegios.filter(function (c) {
      return c.IdPadre === modules.EstructuraId && c.TipoEstructuraId !== 8;
    });

    if (modules.children != null) {
      modules.children.forEach(element => {
        if (modules.TipoEstructuraId < 4 && element.Read) { // para limitar lo que se puede ver en el menu
          if (element.IdPadre === modules.EstructuraId) {
            const submenu = { text: element.Nombre, link: element.Accion, submenu: this.setSubMenu(element, privilegios) };
            if (submenu.submenu.length === 0) {
              menuList.push({ text: submenu.text, link: submenu.link });
            } else {
              menuList.push(submenu);
            }
            // menuList.push({text: element.nombre, link: element.accion, submenu: this.otraSub(element, privilegios) })
          }
        }
      });
    }
    return menuList;

  }
  setEstructuraMenu() { // creo el menu dependiendo de los privilegios de usuario
    // let decode = this.getDecodedAccessToken(sessionStorage.getItem('access-token'));
    // this.Priv = JSON.parse(decode['role'])
    // var privilegios = this.Priv;

    const privilegios = this.settings.user['privilegios'];

    if (this.menuItems.length > 2) {
      this.menuItems.splice(2, this.menuItems.length - 2);
    }

    let modules = privilegios.filter(function (row) {
      return row.TipoEstructuraId === 2 && row.Read;
    });

    modules.forEach(element => {
      if (element.Accion === null) {
        this.menuItems.push({ text: element.Nombre, icon: element.Icono, submenu: this.setSubMenu(element, privilegios) });
      } else {
        this.menuItems.push({ text: element.Nombre, icon: element.Icono, link: element.Accion });
      }
    });

    modules = [];
    this.menuItems.push(CerrarSesion);
    return this.menuItems;
  }

  //   setEstructuraSubMenu(e: number)
  //     {
  //         return this.menuItems.forEach( x => x.submenu.estructura = e)

  //     }

  // getDecodedAccessToken(token: string): any {
  //   try {
  //     return jwt_decode(token);
  //   }
  //   catch (Error) {
  //     return null;
  //   }
  // }

}
