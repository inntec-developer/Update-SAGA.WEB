import { Injectable } from '@angular/core';

declare var $: any;

@Injectable()
export class SettingsService {

    public user: any;
    public app: any;
    public layout: any;

    constructor() {

        // User Settings
        // -----------------------------------
        this.user = {
            id : '',
            nombre : '',
            usuario : '',
            email : '',
            clave : '',
            tipoUsuarioId : '',
            tipo : '',
            sucursal : '',
            privilegios: Array<any>(),
            foto: '',
            liderId: '',
            lider: '',
            departamentoId: '',
            departamento: '',
            unidadNegocioId: ''
        };

        // App Settings
        // -----------------------------------
        this.app = {
            vertionTime: '20190822_925_DVP-SBI610/20190822_925_DVP-SBI611',
            vertion: 'v2.0.108220925',
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
