// import * as jsPDF from 'jspdf';

import { ActivatedRoute, Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { DialogdamfoComponent } from '../dialogdamfo/dialogdamfo.component'
import { MatDialog } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { RequisicionesService } from '../../../../../service/index';
import { SettingsService } from '../../../../../core/settings/settings.service';

@Component({
  selector: 'app-viewdamfo',
  templateUrl: './viewdamfo.component.html',
  styleUrls: ['./viewdamfo.component.scss'],
  providers: [RequisicionesService]
})
export class ViewdamfoComponent implements OnInit {

  @ViewChild('content') content: ElementRef;
  // Formularios

  //Variables
  public damfoId: string;
  public damfo290: any;

  public data: any;
  public ClienteInfo: any;
  public periodoPagoId: any;
  public cliente: any;

  public imprimir: boolean;





  constructor(
    private serviceRequisiciones: RequisicionesService,
    private dialog: MatDialog,
    private _Route: ActivatedRoute,
    private _Router: Router,
    private spinner: NgxSpinnerService,
    public settings: SettingsService,
    private toasterService: ToasterService,

  ) {
    this.getParams();
  }
  ngOnInit() {
    this.spinner.show();
    if (this.damfoId != null) {
      this.serviceRequisiciones.getDamfoById(this.damfoId)
        .subscribe(data => {
          if (data.TipoContratoId == null) {
            data.TipoContratoId = 0;
          }
          this.ClienteInfo = data['cliente'];
          this.periodoPagoId = data.periodoPagoId;
          this.damfo290 = data;
          this.spinner.hide();
        });
    }
  }

  getParams() {
    this._Route.params.subscribe(params => {
      if (params['IdDamfo'] != null) {
        this.damfoId = params['IdDamfo'];
      } else {
        this.popToast('error', 'Nueva Requisicion', 'Error al intentar notificar por medio de correo electrónico la creación de la requisición.');
        this._Router.navigate(['/ventas/crearRequisicion']);
      }
    });
  }

  openDialog() {
    this.data = {
      cliente: this.ClienteInfo['nombrecomercial'],
      claseReclutamiento: this.damfo290['claseReclutamiento'],
      tipoReclutamiento: this.damfo290['tipoReclutamiento'],
      sueldoMinimo: this.damfo290['sueldoMinimo'],
      sueldoMaximo: this.damfo290['sueldoMaximo'],
      nombrePerfil: this.damfo290['nombrePerfil'],
      id: this.damfoId
    }
    let dialogRef = this.dialog.open(DialogdamfoComponent, {
      width: '50%',
      height: 'auto',
      data: this.data
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }


  print() {
    this.imprimir = true;
    if (!this.settings.layout.isCollapsed) {
      this.settings.layout.isCollapsed = !this.settings.layout.isCollapsed;
    }
    setTimeout(() => {
      document.getElementById('content').style.marginLeft = "70px";
      document.getElementById('content').style.marginTop = "15px";
      document.getElementById('content').style.marginRight = "0px";
      document.getElementById('content').style.marginBottom = "15px";

      window.print();
    }, 500);
    setTimeout(() => {
      this.imprimir = false;
      document.getElementById('content').style.marginTop = "0";
      document.getElementById('content').style.marginLeft = "0";
    }, 500);

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
