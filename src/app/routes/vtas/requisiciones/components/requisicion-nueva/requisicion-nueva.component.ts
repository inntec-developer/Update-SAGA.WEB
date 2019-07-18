import { ActivatedRoute, CanDeactivate, Router, } from '@angular/router';
import { CatalogosService, RequisicionesService } from '../../../../../service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { CreateRequisicion } from '../../../../../models/vtas/Requisicion';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { SettingsService } from '../../../../../core/settings/settings.service';
import { UpdateInfoRequiComponent } from '../update-info-requi/update-info-requi.component';

const swal = require('sweetalert');

@Component({
  selector: 'app-requisicion-nueva',
  templateUrl: './requisicion-nueva.component.html',
  styleUrls: ['./requisicion-nueva.component.scss'],
  providers: [CatalogosService, RequisicionesService]
})
export class RequisicionNuevaComponent implements OnInit {
  @ViewChild('updateRequi') updateRequi: UpdateInfoRequiComponent;

  public damfoId: string;
  public direccionId: string;
  public requisicionId: string;
  public folio: any[];
  public createRequi: boolean;
  public dataRequisicion: any[];
  public Horarios: any[];
  public EstatusRequi: any;
  public estatusId: any;
  public TipoReclutamiento: any;
  public confidencial: boolean = false;

  constructor(
    private settings: SettingsService,
    private serviceRequisiciones: RequisicionesService,
    private _Router: Router,
    private _Route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toasterService: ToasterService,
  ) {
    this.getParams();

  }
  ngOnInit() {
    this.spinner.show();
    if (this.createRequi) {
      //Manda la informacion para la creacion de la Requisicion.
      let datas: CreateRequisicion = new CreateRequisicion();
      datas.IdDamfo = this.damfoId;
      datas.IdAddress = this.direccionId;
      datas.IdEstatus = this.estatusId;
      datas.Usuario = this.settings.user['usuario'];
      datas.UsuarioId = this.settings.user['id'];
      datas.Confidencial = this.confidencial;
      this.serviceRequisiciones.createNewRequi(datas).subscribe(data => {
        if (data != 404) {
          swal('Requisición Generada!', 'Capture número de vacantes y asigne un Coordinador.', 'success');
          this.requisicionId = data['id'];
          this.folio = data['folio'];
          this.Horarios = data['horariosRequi'];
          this.EstatusRequi = data['estatusId']
          this.TipoReclutamiento = data['tipoReclutamientoId'];
          this.spinner.hide();

          setTimeout(() => {
            debugger;
            var sendEmail = {
              Email: this.settings['user']['email'],
              Folio: this.folio,
              VBtra: data['vBtra']
            }
            this.serviceRequisiciones.SendEmailNuevaRequi(sendEmail).subscribe(data => {
              if (data != 404) {
                this.popToast('success', 'Nueva Requisición', 'Se te ha enviado un correo notificando que has creado una requisición.');
                if (this.confidencial == false) {
                  this.serviceRequisiciones.PublicarNuevaRequisicion(this.requisicionId).subscribe(data => {
                    if (data != 404) {
                      this.popToast('success', 'Publicacion de Requisicion', 'Se ha publicado correctamente en Bolsa de Trabajo la requisición.');
                    }
                    else {
                      this.popToast('error', 'Nueva Requisicion', 'Error al intentar publicado en Bolsa de Trabajo la requisición.')
                    }
                  });
                }
              }
              else {
                this.popToast('error', 'Nueva Requisicion', 'Error al intentar notificar por medio de correo electrónico la creación de la requisición.')
              }
            });
          }, 10000);



        }
        else {
          this.spinner.hide();
          swal('Ups!', 'Algo salio mal al intentar generar la requisición.', 'error');
          this._Router.navigate(['/ventas/crearRequisicion']);
        }
      });
    }
    else {
      this.spinner.hide();
      swal('Ups!', 'Algo salio mal al intentar generar la requisición.', 'error');
      this._Router.navigate(['/ventas/crearRequisicion']);
    }
  }

  getParams() {
    debugger;
    this._Route.params.subscribe(params => {
      if (params['IdDamfo'] != null && params['IdDireccion'] != null) {
        this.damfoId = params['IdDamfo'];
        this.direccionId = params['IdDireccion'];
        this.estatusId = params['IdEstatus']
        this.confidencial = JSON.parse(params['Confidencial']);
        this.createRequi = true;
      } else {
        this.createRequi = false;
      }
    });
  }

  //------------------------------------------------------------------------------------
  // Toasts (Mensajes del sistema)
  //------------------------------------------------------------------------------------
  toaster: any;
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right',
    limit: 7,
    tapToDismiss: false,
    showCloseButton: true,
    mouseoverTimerStop: true,
  });

  popToast(type, title, body) {

    var toast: Toast = {
      type: type,
      title: title,
      timeout: 4000,
      body: body
    }
    this.toasterService.pop(toast);
  }
}
