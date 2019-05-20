import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { RequisicionesService } from '../../../../service';
import { SettingsService } from '../../../../core/settings/settings.service';

@Component({
  selector: 'app-dialog-rutas',
  templateUrl: './dialog-rutas.component.html',
  styleUrls: ['./dialog-rutas.component.scss'],
  providers: [RequisicionesService]
})
export class DialogRutasComponent implements OnInit {
  RutaId: string;
  DireccionId: string;
  RutaCamion: string = '';
  ViaCamion: string = '';
  Accion: string;
  loading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private rutasService : RequisicionesService,
    private dialogRutas : MatDialogRef<DialogRutasComponent>,
    private toasterService: ToasterService,
    private settings: SettingsService
  ) {
    dialogRutas.disableClose = true;
  }

  ngOnInit() {
    if(!this.data.Edit){
      this.DireccionId = this.data.DireccionId;
      this.RutaCamion = '';
      this.ViaCamion = '';
      this.Accion = 'Agregar nueva ruta de camión'
    }
    else{
      this.RutaId = this.data.Id;
      this.DireccionId = this.data.DireccionId;
      this.RutaCamion = this.data.RutaCamion;
      this.ViaCamion = this.data.ViaCamion;
      this.Accion = 'Editar ruta de camión'
    }
  }

  onCloseDialog(){
    this.dialogRutas.close();
  }

  public _guardarRutas() {
    if (!this.data.Edit) {
      this._addRuta();
    } else {
      this._editRuta();
    }
  }

  public _addRuta() {
    this.loading = true;
    let rc = {
      DireccionId: this.DireccionId,
      Ruta: this.RutaCamion,
      Via: this.ViaCamion,
      Usuario: this.settings.user['usuario']
    }
    this.rutasService.addRutaCamion(rc).subscribe(data => {
      if (data == 200) {
        this.rutasService.getRequiRutasCamion(this.DireccionId).subscribe(result => {
          this.dialogRutas.close(result);
          let msg = 'La ruta de camión se registro correctamente.';
          this.popToast('success', 'Ruta de Camión', msg);
        }, err => {
          console.error(err)
        });
      } else if (data == 404) {
        let msg = 'Algo salio mal intenta de nuevo, si el problema persiste comunicate al departamento de TI.';
        this.popToast('error', 'Ruta de Camión', msg);
      }
    }, err => {
      let msg = err;
      this.popToast('error', 'Ruta de Camión', msg);
    });
  }

  public _editRuta() {
    this.loading = true;
    let rc = {
      Id: this.RutaId,
      DireccionId: this.DireccionId,
      Ruta: this.RutaCamion,
      Via: this.ViaCamion,
      Usuario: this.settings.user['usuario']
    }
    this.rutasService.updateRutaCamion(rc).subscribe(data => {
      if (data == 200) {
        this.rutasService.getRequiRutasCamion(this.DireccionId).subscribe(result => {
          this.dialogRutas.close(result);
          let msg = 'La ruta de camión se actualizó correctamente.';
          this.popToast('success', 'Ruta de Camión', msg);
        }, err => {
          console.error(err)
        });
      } else if (data == 404) {
        let msg = 'Algo salio mal intenta de nuevo, si el problema persiste comunicate al departamento de TI.';
        this.popToast('error', 'Ruta de Camión', msg);
      }
    }, err => {
      var msg = err;
      this.popToast('error', 'Ruta de Camión', msg);
    });
  }


   /*
  * Creacion de mensajes
  * */
 toaster: any;
 toasterConfig: any;
 toasterconfig: ToasterConfig = new ToasterConfig({
   positionClass: 'toast-bottom-right',
   limit: 7, tapToDismiss: false,
   showCloseButton: true,
   mouseoverTimerStop: true,
 });
 popToast(type, title, body) {
   var toast: Toast = {
     type: type,
     title: title,
     timeout: 5000,
     body: body
   }
   this.toasterService.pop(toast);
 }

}
