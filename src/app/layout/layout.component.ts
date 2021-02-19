import { PopNotificacionesComponent } from './../components/pop-notificaciones/pop-notificaciones.component';
import { Component, OnInit } from '@angular/core';
import { Toast, ToasterConfig, ToasterService, BodyOutputType } from 'angular2-toaster';
import { ApiConection } from '../service/api-conection.service';
import { SettingsService } from '../core/settings/settings.service';
import { Observable, Subscription } from 'rxjs';
import { ComponentsService } from '../service';
declare var $: any;

const swal = require('sweetalert');

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  providers: [ComponentsService, PopNotificacionesComponent]
})
export class LayoutComponent implements OnInit {

  public Activo = true;
  private mouseStop = null;
  public lock: boolean;
  public print: boolean;
  private subscription: Subscription;
  idToast: string;

  popToast() {
    const toast: Toast = {
      type: 'warning',
      title: 'Notificaciones',
      timeout: 15000,
      body: PopNotificacionesComponent,
      bodyOutputType: BodyOutputType.Component
    };
    this.idToast = toast.toastId;
    this.toasterService.pop(toast);
  }

  constructor(
    private settings: SettingsService,
    private toasterService: ToasterService,
    public _service: ComponentsService) { }

  ngOnInit() {
    this.print = this.settings.actionPrint;
    const timer = Observable.timer(1000, 60000);
    this.subscription = timer.subscribe(x => {
      this.toasterService.clear(this.idToast);
      this._service.CheckAlertas(this.settings.user['id']).subscribe(elemnt => {
        if (elemnt > 0 && elemnt !== 404) {
          this.popToast();
        }
      });
    });
  }

  Sesion() {
    if (this.settings.user['usuario'] === 'DAMSA.JCERVANTES' || this.settings.user['usuario'] === 'DAMSA.MVENTURA'
      || this.settings.user['usuario'] === 'DAMSA.NINIGUEZ' || this.settings.user['usuario'] === 'DAMSA.IDELATORRE'
      || this.settings.user['usuario'] === 'DAMSA.BMORALES') {

      clearTimeout(this.mouseStop);
      this.mouseStop = setTimeout(() => {
        swal('!Hasta la vista baby!', 'Game Over', 'error');
      }, 2700000);

    } else {
      if (this.settings.user['id'] != null) { // Nos percatamos si ya inicio sesión.
        clearTimeout(this.mouseStop);
        this.mouseStop = setTimeout(() => {
          this.lock = true;
          swal({
            title: 'Tu sesión esta proxima a caducar',
            text: 'Tienes 20 segundos para confirmar',
            type: 'warning',
            showCancelButton: false,
            confirmButtonText: 'Permanecer',
            closeOnConfirm: true,
            showLoaderOnConfirm: true
          }, (isConfirm) => {
            window.onkeydown = null;
            window.onfocus = null;
            if (isConfirm) {
              this.lock = false;
              return;
            }
          });
          setTimeout(() => {
            if (this.lock) {
              swal({
                title: 'Tu sesión ha caducado',
                text: 'Inicia sesión nuevamente.',
                type: 'info',
                showCancelButton: false,
                confirmButtonText: 'Ok',
                closeOnConfirm: true,
                showLoaderOnConfirm: true
              }, (isConfirm: any) => {
                window.onkeydown = null;
                window.onfocus = null;
                if (isConfirm) {
                  window.location.href = ApiConection.ServiceUrlWeb + 'login';
                }
              });
            }
          }, 20000);
        }, 2700000);
      }
    }
  }
}
