import { ActivatedRoute, Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { Toast, ToasterConfig } from 'angular2-toaster';

import { RequisicionesService } from '../../../../../service/requisiciones/requisiciones.service';
import { SettingsService } from '../../../../../core/settings/settings.service';
import { ToasterService } from 'angular2-toaster';
import { _createDefaultCookieXSRFStrategy } from '@angular/http/src/http_module';

@Component({
  selector: 'app-dialog-delete-requi',
  templateUrl: './dialog-delete-requi.component.html',
  styleUrls: ['./dialog-delete-requi.component.scss'],
  providers: [RequisicionesService]
})
export class DialogDeleteRequiComponent implements OnInit {
  // Varibales de contol
  public requisicion: any;
  public infoDeleteRequi: any;
  public return: any;
  public folio: number;
  public success: boolean;
  public loading: boolean;
  public textBtnCerrar: string;
  public textBtnAceptar: string;
  constructor(
    private dialogDelete: MatDialogRef<DialogDeleteRequiComponent>,
    private _Router: Router,
    private _Route: ActivatedRoute,
    private toasterService: ToasterService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: RequisicionesService,
    private settings: SettingsService
  ) {
    dialogDelete.disableClose = true;
    this.textBtnCerrar = 'Cerrar';
    this.textBtnAceptar = 'Aceptar';
  }

  // Configuracion de mensaje
  toaster: any;
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right',
    limit: 7, tapToDismiss: false,
    showCloseButton: true,
    mouseoverTimerStop: true,
  });

  // Creacion de mensaje
  popToast(type, title, body) {
    var toast: Toast = {
      type: type,
      title: title,
      timeout: 2000,
      body: body
    }
    this.toasterService.pop(toast);
  }

  ngOnInit() {
    this.requisicion = this.data;
    this.folio = this.data.folio;
    this.infoDeleteRequi = {
      Id: this.data.id,
      UsuarioMod: this.settings.user['usuario']
    }
  }

  deleteRequisicion() {
    this.loading = true;
    this.service.deleteRequisicion(this.infoDeleteRequi)
      .subscribe(data => {
        if (data == 200) {
          this.dialogDelete.close(data);
        }
        else {
          this.popToast('danger', 'Requisición', 'Oops!! No se puedo eliminar la requisición ' + this.folio);
          this.loading = false;;
        }
      });
  }

  onCloseDialog() {
    this.dialogDelete.close();
  }
}
