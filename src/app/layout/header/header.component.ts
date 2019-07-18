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
  tipoUsuario = this.settings.user['tipoUsuarioId'];

  constructor(
    public menu: MenuService,
    public userblockService: UserblockService,
    public settings: SettingsService,
    public _service: ComponentsService,
    private modalService: BsModalService) {
  }

  ngOnInit() {
    this.isNavSearchVisible = false;
    if (browser.msie) { // Not supported under IE
      this.fsbutton.nativeElement.style.display = 'none';
    }

    let timer = Observable.timer(1000, 60000);
    this.subscription = timer.subscribe(x => {
      this._service.getAlertStm(this.settings.user['id']).subscribe(elemnt => {
        this.alertMessage = elemnt;
        this.NotRead = elemnt;
      });
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
    this._service.deleteAlertStm(this.settings.user['id'], true).subscribe(element => {
      if (element === 200) {
        for (let objeto in this.alertMessage) {
          this.alertMessage[objeto]['activo'] = false;
        }
        this.NotRead = this.alertMessage.filter(alert => alert.activo == true);
      }
    })
  }

  getAllAlertStm() {
    this._service.getAllAlertStm(this.settings.user['id']).subscribe(result => {
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
    <li><strong>Periodo de inactividad</strong></li>
    <li><strong>Restablecer contraseña</strong></li>
    <li><strong>Autorización GG (anticipos menores al 50%)</strong></li>
    <li><strong>Coincidencias de Candidatos por email al asignar folio. </strong></li>
    <li><strong>Aviso a Redes Sociales de Publicar vacantes a Redes Sociales</strong></li>
    <li><strong>Vista del diseño de Vacantes</strong></li>
    <li><strong>Sincronización Calendario con Outlook y Thunderbird</strong></li>
    <li><strong>Reporte y Grafica de productividad</strong></li>
    <li><strong>Reporte Detalle de Coordinadores</strong></li>
    <li><strong>Reporte Detalle de Reclutadores</strong></li>
    <li><strong>Reporte de Candidatos en Bolsa de Trabajo</strong></li>
    <li><strong>Visualizar Requisición al momento de darle clic en el n&uacute;mero de folio que se muestra en el correo electr&oacute;nico. </strong></li>
    <li><strong>Reporte por Coordinación</strong></li>
    <li><strong>Indicador Captados & Contratados</strong></li>
    <li><strong>Visualización de Subordinados – Sistema->Usuarios</strong></li>
    <li><strong>Visualización de Perfil en el módulo de Foto.</strong></li>
    <li><strong>Transferencia de folios</strong></li>
    <li><strong>Indicadores de Inicio por folio, por posiciones y candidatos</strong></li>
    <li><strong>Impresión Perfil para Solicitar Reclutamiento</strong></li>
</ul>`;
// <ol>
//       <li>Menú Principal -> Reportes -> Reporte</li>
//       <li>Para hacer uso del mimos, es necesario utilixar los filtros para que la busqueda,
//       se efectiva y especifica, al momnento de filtrar o mostrar los resultados.</li>
//       </ol>
