import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Toast, ToasterConfig } from 'angular2-toaster/angular2-toaster';

import { RequisicionesService } from './../../../../../service/requisiciones/requisiciones.service';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-dialog-activar-requi',
  templateUrl: './dialog-activar-requi.component.html',
  styleUrls: ['./dialog-activar-requi.component.scss'],
  providers : [RequisicionesService] 
})
export class DialogActivarRequiComponent implements OnInit {
  textBtnCerrar: string;
  textBtnAceptar: string;
  requisicion : any[];
  infoReactivarRequi : any;
  return: any;
  folio: number;
  loading : boolean;
  

  constructor(
    private dialogReActivar : MatDialogRef<DialogActivarRequiComponent>,
    private toasterService: ToasterService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service : RequisicionesService,
  ) { 
    this.textBtnCerrar = 'Cerrar';
    this.textBtnAceptar = 'Aceptar';
  }

  

  // Configuracion de mensaje
  toaster: any;
  ToasterConfig: any;
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
      UsuarioMod: localStorage.getItem('usuario')
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