import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ComponentsService } from './../../service/Components/components.service';
import { MenuService } from '../../core/menu/menu.service';
import { SettingsService } from '../../core/settings/settings.service';
import { UserblockService } from '../sidebar/userblock/userblock.service';

const screenfull = require('screenfull');
const browser = require('jquery.browser');
declare var $: any;





@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    providers: [ComponentsService]
})
export class HeaderComponent implements OnInit {
    modalRef: BsModalRef;

    navCollapsed = true; // for horizontal layout
    menuItems = []; // for horizontal layout
    alertMessage: Array<any> = []
    allAlertMessage: Array<any> = []
    isNavSearchVisible: boolean;
    @ViewChild('fsbutton') fsbutton;  // the fullscreen button
    NotRead: Array<any> = [];
    alertIndex: number;
    alertAllIndex: number;
    private subscription: Subscription;
    UserId: string;

    text = renderActualizaciones;
    disabled = false;
    compact = false;
    invertX = false;
    invertY = false;

    constructor(
        public menu: MenuService,
        public userblockService: UserblockService,
        public settings: SettingsService,
        public _service: ComponentsService,
        private modalService: BsModalService) {
        // show only a few items on demo
        this.menuItems = menu.setEstructuraMenu().slice(0, 4); // for horizontal layout
        this.UserId = sessionStorage.getItem('id');

    }

    ngOnInit() {
        this.isNavSearchVisible = false;
        if (browser.msie) { // Not supported under IE
            this.fsbutton.nativeElement.style.display = 'none';
        }

        let timer = Observable.timer(2000, 10000);
        this.subscription = timer.subscribe(x => {
            this._service.getAlertStm(this.UserId).subscribe(elemnt => {
                this.alertMessage = elemnt;
            });
            this.getAllAlertStm();
        });
    }

    toggleUserBlock(event) {
        event.preventDefault();
        this.userblockService.toggleVisibility();
    }

    openNavSearch(event) {
        event.preventDefault();
        event.stopPropagation();
        this.setNavSearchVisible(true);
    }

    setNavSearchVisible(stat: boolean) {
        // console.log(stat);
        this.isNavSearchVisible = stat;
    }

    getNavSearchVisible() {
        return this.isNavSearchVisible;
    }

    toggleOffsidebar() {
        this.settings.layout.offsidebarOpen = !this.settings.layout.offsidebarOpen;
    }

    toggleCollapsedSideabar() {
        this.settings.layout.isCollapsed = !this.settings.layout.isCollapsed;
    }

    isCollapsedText() {
        return this.settings.layout.isCollapsedText;
    }

    toggleFullScreen(event) {

        if (screenfull.enabled) {
            screenfull.toggle();
        }
        // Switch icon indicator
        let el = $(this.fsbutton.nativeElement);
        if (screenfull.isFullscreen) {
            el.children('em').removeClass('fa-expand').addClass('fa-compress');
        }
        else {
            el.children('em').removeClass('fa-compress').addClass('fa-expand');
        }
    }
    leido(data: any) {
        this._service.deleteAlertStm(data.id, false).subscribe(element => {
            if (element === 200) {
                this.alertIndex = this.alertMessage.findIndex(item => item.id === data.id);
                this.alertMessage[this.alertIndex]['activo'] = false;

                this.alertAllIndex = this.allAlertMessage.findIndex(item => item.id === data.id);
                this.allAlertMessage[this.alertAllIndex]['activo'] = false;
                this.NotRead = this.allAlertMessage.filter(alert => alert.activo == true);
            }
        });

    }
    leidoTodo() {
        this._service.deleteAlertStm(sessionStorage.getItem('id'), true).subscribe(element => {
            if (element === 200) {
                for (let objeto in this.alertMessage) {
                    this.alertMessage[objeto]['activo'] = false;
                }
                this.NotRead = this.alertMessage.filter(alert => alert.activo == true);
            }
        })
    }

    getAllAlertStm() {
        this._service.getAllAlertStm(this.UserId).subscribe(result => {
            if (result != 400) {
                this.allAlertMessage = result;
                this.NotRead = this.allAlertMessage.filter(alert => alert.activo == true);
            }
        })
    }

    config = {
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'second'
    };

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template, this.config);
    }
}

const renderActualizaciones = `
<ul>
    <li>Modificaciones visuales en Tablas de contenido de información.</li>
    <li>El menú se puede ocultar o mostrar, presionando  el botón  <em class="fa fa-navicon"></em>  en la barra principal de opciones.</li>
    <li>Cambio de estatus de candidatos de Contratado a Cubierto.</li>
    <li>
        El Ejecutivo de Cuenta (Vtas) podrá liberar candidatos con estatus Cubierto en la sección de:
        <ol>
            <li>Reclutamiento -> Candidatos -> Buscar -> Detalle Candidato -> Información Principal -> Se mostrara el botón donde se especifica con que reclutador esta llevando el proceso 
            <a class="btn btn-xs btn-outline-danger"><i class="fa fa-thumbs-o-down"></i></a></li>
        </ol>   
        
    </li>
    <li>
        Flujo de trabaja para Reclutamiento Puro. 
        <ol>
            <li>Creación de Reclutamiento Puro.</li>
            <li>Notificar a Gerente correspondiente para solicitar factura.</li>
            <li>Autorizar una vez realizada la factura (Gerente).</li>
            <li>Asignar Coordinadores para dar el seguimiento a la Requisición (Ejecutivo Cuenta).</li>
            <li>Asignar Reclutadores para iniciar búsqueda de candidatos(Coordinador).</li>
        </ol>
    </li>
    <li>
        Ventas -> Requisiciones: Botón para <strong>Coordinadores</strong> y <strong>Auditores</strong> 
        <a class="btn btn-xs btn-outline-info"><i class="fa fa-file-text-o"></i></a> <strong>Reporte 70</strong>, 
        el cual mostrara un reporte de requisiciones activas.
    </li>
    <li>
        Reclutamiento -> Vacantes: Los Usuarios con Perfil <strong> AUDITOR </strong> podrán visualizar todas las vacantes activas. 
        En el botón <a class="btn btn-xs btn-outline-success"><i class="fa fa-download"></i></a> <strong>Reporte para Generar Estadísticos </strong> y 
        <a class="btn btn-xs btn-outline-info"><i class="fa fa-file-text-o"></i></a> <strong>Informe Vacantes</strong>, se mostraran todas las requisiciones o vacantes activas.
        
    </li>
    <li>
        Modificación en Estructura del Menú Principal.
    </li>
</ul>`;
