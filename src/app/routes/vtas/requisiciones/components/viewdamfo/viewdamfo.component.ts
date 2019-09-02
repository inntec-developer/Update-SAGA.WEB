// import * as jsPDF from 'jspdf';

import * as jspdf from 'jspdf';

import { ActivatedRoute, Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { DialogdamfoComponent } from '../dialogdamfo/dialogdamfo.component'
import { MatDialog } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { RequisicionesService } from '../../../../../service/index';
import { SettingsService } from '../../../../../core/settings/settings.service';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-viewdamfo',
  templateUrl: './viewdamfo.component.html',
  styleUrls: ['./viewdamfo.component.scss'],
  providers: [RequisicionesService]
})
export class ViewdamfoComponent implements OnInit {

  @ViewChild('content') content: ElementRef;

  public Perfil290: boolean;

  // Variables
  public damfoId: string;
  public damfo290: any;

  public data: any;
  public ClienteInfo: any;
  public periodoPagoId: any;
  public cliente: any;

  public imprimir: boolean;

  public isEditable: boolean;

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
          if (data['usuarioAlta'] === this.settings['user']['usuario']) {
            this.isEditable = true;
          } else {
            this.isEditable = false;
          }
          this.spinner.hide();
        });
    }
  }

  getParams() {
    this._Route.params.subscribe(params => {
      if (params['IdDamfo'] != null) {
        this.damfoId = params['IdDamfo'];
        this.Perfil290 = params['Perfil290'] || false;
      } else {
        this.popToast(
          'error',
          'Nueva Requisicion',
          'Error al intentar notificar por medio de correo electrónico la creación de la requisición.');
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
    };
    const dialogRef = this.dialog.open(DialogdamfoComponent, {
      width: '50%',
      height: 'auto',
      data: this.data
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  return() {
    if (!this.Perfil290) {
      this._Router.navigate(['/ventas/crearRequisicion']);
    } else {
      this._Router.navigate(['/reclutamiento/290']);
    }
  }

  editFormato() {
    this._Router.navigate(['/ventas/formato290', this.damfoId], { skipLocationChange: true })
  }


  print() {
    // this.imprimir = true;
    // this.settings.actionPrint = true;
    // if (!this.settings.layout.isCollapsed) {
    //   this.settings.layout.isCollapsed = !this.settings.layout.isCollapsed;
    // }
    // setTimeout(() => {
    //   document.getElementById('PrintDamfo').style.marginLeft = '70px';
    //   document.getElementById('PrintDamfo').style.marginTop = '15px';
    //   document.getElementById('PrintDamfo').style.marginRight = '0px';
    //   document.getElementById('PrintDamfo').style.marginBottom = '15px';
    //   window.print();
    // }, 500);
    // setTimeout(() => {
    //   this.imprimir = false;
    //   this.settings.actionPrint = false;
    //   document.getElementById('PrintDamfo').style.marginTop = '0';
    //   document.getElementById('PrintDamfo').style.marginLeft = '0';
    // }, 500);

    const data = document.getElementById('PrintDamfo');
    html2canvas(data, { windowWidth: 1500 }).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png')
      const pdf = new jspdf('p', 'pt', 'letter'); // A4 size page of PDF
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      const position = 0;
      pdf.addImage(contentDataURL, 'jpg', 0, position, width, height);
      pdf.save(this.damfo290['nombrePerfil'] + '.pdf'); // Generated PDF
    });



  }

  //  ------------------------------------------------------------------------------------
  // Toasts (Mensajes del sistema)
  //  ------------------------------------------------------------------------------------
  popToast(type, title, body) {

    const toast: Toast = {
      type: type,
      title: title,
      timeout: 4000,
      body: body
    }
    this.toasterService.pop(toast);
  }
}
