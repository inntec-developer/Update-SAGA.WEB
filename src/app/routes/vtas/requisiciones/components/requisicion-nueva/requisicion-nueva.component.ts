import { ActivatedRoute, CanDeactivate, Router, } from '@angular/router';
import { CatalogosService, RequisicionesService } from '../../../../../service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { CreateRequisicion } from '../../../../../models/vtas/Requisicion';

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
  public requisicionId = '';
  public folio: any[];
  public dataRequisicion: any[];
  public Horarios: any = [];
  public EstatusRequi: any;
  public estatusId: any;
  public TipoReclutamiento: any;
  public confidencial = false;
NumeroVacantes: any;
  toaster: any;
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right',
    limit: 7,
    tapToDismiss: false,
    showCloseButton: true,
    mouseoverTimerStop: true,
  });

  constructor(
    private settings: SettingsService,
    private serviceRequisiciones: RequisicionesService,
    private _Router: Router,
    private _Route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toasterService: ToasterService,
  ) {}

  ngOnInit() {
    this._Route.params.subscribe(params => {
      if (params['IdDamfo'] != null && params['IdDireccion'] != null) {
        this.damfoId = params['IdDamfo'];
        this.direccionId = params['IdDireccion'];
        this.estatusId = params['IdEstatus'];
        this.confidencial = JSON.parse(params['Confidencial']);
      } else {
        this._Route.queryParams.subscribe(params2 => {
          if (params2['id'] != null && params2['folio'] != null) {
            this.requisicionId = params2['id'];
            this.folio = params2['folio'];
            this.Horarios = JSON.parse(params2.horariosRequi);
            this.EstatusRequi = params2['estatusId'];
            this.TipoReclutamiento = params2['tipoReclutamientoId'];
          }
        });
      }
    });
  }

  // ------------------------------------------------------------------------------------
  // Toasts (Mensajes del sistema)
  // ------------------------------------------------------------------------------------
  popToast(type, title, body) {

    const toast: Toast = {
      type: type,
      title: title,
      timeout: 4000,
      body: body
    };
    this.toasterService.pop(toast);
  }
}
