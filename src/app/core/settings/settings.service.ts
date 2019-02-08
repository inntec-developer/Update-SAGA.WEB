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
            name: '',
            job: 'USUARIO',
            picture: '',
            privilegios: Array<any>()
        };

        // App Settings
        // -----------------------------------
        this.app = {
            vertionTime: '20190208_1733_DVP-SBI610/20190208_1733_DVP-SBI611',
            vertion: 'v1.0.21',
            name: 'SAGA - Inntec',
            description: 'Sistema Administrativo de Gestión Avanzada',
            year: ((new Date()).getFullYear()),
            prefijo: 'DAL'
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
            viewAnimation: 'ng-fadeInUp'
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
