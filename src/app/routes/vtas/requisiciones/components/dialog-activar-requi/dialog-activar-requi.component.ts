import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Toast, ToasterConfig } from 'angular2-toaster';

import { RequisicionesService } from '../../../../../service/requisiciones/requisiciones.service';
import { SettingsService } from '../../../../../core/settings/settings.service';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-dialog-activar-requi',
  templateUrl: './dialog-activar-requi.component.html',
  styleUrls: ['./dialog-activar-requi.component.scss'],
  providers : [RequisicionesService]
})
export class DialogActivarRequiComponent implements OnInit {
  public textBtnCerrar: string;
  public textBtnAceptar: string;
  public requisicion : any;
  public infoReactivarRequi : any;
  public return: any;
  public folio: number;
  public loading : boolean;


  constructor(
    private dialogReActivar : MatDialogRef<DialogActivarRequiComponent>,
    private toasterService: ToasterService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service : RequisicionesService,
    private settings: SettingsService
  ) {
    this.textBtnCerrar = 'Cerrar';
    this.textBtnAceptar = 'Aceptar';
  }



  // Configuracion de mensaje
  public toaster: any;
  public ToasterConfig: any;
  toasterconfig: ToasterConfig =  new ToasterConfig({
    positionClass: 'toast-bottom-right',
    limit: 7,
    tapToDismiss: false,
    showCloseButton: true,
    mouseoverTimerStop: true
  });
  // Creacion de mensaje
  popToast(type, title, body){
    var toast : Toast = {
      type:type,
      title: title,
      timeout: 2000,
      body: body
    }
    this.toasterService.pop(toast);
  }

  ngOnInit() {
    this.requisicion = this.data;
    this.folio = this.data.folio;
    this.infoReactivarRequi = {
      id : this.data.id,
      UsuarioMod: this.settings.user['usuario']
    }
  }

  reActivarRequisicion(){
    this.loading = true;
    this.service.reActivarRequisicion(this.infoReactivarRequi)
    .subscribe(data => {
      if(data == 200){
        this.dialogReActivar.close();
      }
      else{
        this.popToast('danger', 'Requisición','Oops!! No se puedo cancelar la requisición ' + this.folio);
        this.loading = false;
      }
    })
  }

  onCloseDialog(){
    this.dialogReActivar.close();
  }
}
