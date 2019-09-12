import * as jspdf from 'jspdf';

import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';

declare var $: any;

@Injectable()
export class SettingsService {

  public user: any;
  public app: any;
  public layout: any;
  public actionPrint = false;

  constructor() {

    // User configuracion
    // -----------------------------------
    this.user = {
      id: '',
      nombre: '',
      usuario: '',
      email: '',
      clave: '',
      tipoUsuarioId: '',
      tipo: '',
      sucursal: '',
      privilegios: Array<any>(),
      foto: '',
      liderId: '',
      lider: '',
      departamentoId: '',
      departamento: '',
      unidadNegocioId: '',
      roles:  Array<any>()
    };

    // App Settings
    // -----------------------------------
    this.app = {
      vertionTime: '20190912_1030_DVP-SBI610/20190912_1030_DVP-SBI611',
      vertion: 'v2.0.109121120',
      environment: 'BETA',
      name: 'SAGA - Inntec',
      description: 'Sistema Administrativo de Gestión Avanzada',
      year: ((new Date()).getFullYear()),
      prefijo: 'DAL',
      email: 'inntec@damsa.com.mx',
      domain: 'damsa.com.mx'
    };

    // Layout Settings
    // -----------------------------------
    this.layout = {
      isFixed: true,
      isCollapsed: false,
      isBoxed: false,
      isRTL: false,
      horizontal: false,
      isFloat: false,
      asideHover: false,
      theme: null,
      asideScrollbar: false,
      isCollapsedText: false,
      useFullLayout: false,
      hiddenFooter: false,
      offsidebarOpen: false,
      asideToggled: false,
      viewAnimation: 'ng-fadeInUp',
      viewChevron: false
    };

  }

  getAppSetting(name) {
    return name ? this.app[name] : this.app;
  }
  getUserSetting(name) {
    return name ? this.user[name] : this.user;
  }
  getLayoutSetting(name) {
    return name ? this.layout[name] : this.layout;
  }
  setAppSetting(name, value) {
    if (typeof this.app[name] !== 'undefined') {
      this.app[name] = value;
    }
  }
  setUserSetting(name, value) {
    if (typeof this.user[name] !== 'undefined') {
      this.user[name] = value;
    }
  }
  setLayoutSetting(name, value) {
    if (typeof this.layout[name] !== 'undefined') {
      return this.layout[name] = value;
    }
  }

  toggleLayoutSetting(name) {
    return this.setLayoutSetting(name, !this.getLayoutSetting(name));
  }

}
