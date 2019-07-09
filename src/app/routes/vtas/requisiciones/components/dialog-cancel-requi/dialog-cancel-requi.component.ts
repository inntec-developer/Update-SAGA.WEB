import { ActivatedRoute, Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Toast, ToasterConfig } from 'angular2-toaster';

import { ComentariosService } from './../../../../../service/Comentarios/comentarios.service';
import { RequisicionesService } from '../../../../../service/requisiciones/requisiciones.service';
import { SettingsService } from '../../../../../core/settings/settings.service';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-dialog-cancel-requi',
  templateUrl: './dialog-cancel-requi.component.html',
  styleUrls: ['./dialog-cancel-requi.component.scss'],
  providers: [RequisicionesService, ComentariosService]
})
export class DialogCancelRequiComponent implements OnInit {
  // Varibales de control
  public requisicion: any[];
  public infoCancelRequi: any;
  public return: any;
  public folio: number;
  public loading: boolean;
  public formComentario: FormGroup;

  constructor(
    private dialogCancel: MatDialogRef<DialogCancelRequiComponent>,
    private _Router: Router,
    private _Route: ActivatedRoute,
    private toasterService: ToasterService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: RequisicionesService,
    private serviceComent: ComentariosService,
    private settings: SettingsService,
    public fb: FormBuilder
  ) {
    dialogCancel.disableClose = true;
    this.formComentario = new FormGroup({
      comentario: new FormControl('', [Validators.required, Validators.maxLength(500), Validators.minLength(50)])
    });
  }



  // Configuracion de mensaje
  public toaster: any;
  public ToasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right',
    limit: 7,
    tapToDismiss: false,
    showCloseButton: true,
    mouseoverTimerStop: true
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
    this.formComentario = this.fb.group({
      comentario: [{ value: '', disabled: false }, Validators.required]
    });
    this.requisicion = this.data;
    this.folio = this.data.folio;
    this.infoCancelRequi = {
      id: this.data.id,
      UsuarioMod: this.settings.user['usuario']
    }
  }

  cancelRequisicion() {
    var comentarioReclutador = this.formComentario.get('comentario').value.trim();
    this.loading = true;
    if(comentarioReclutador.length >= 30){
      this.service.cancelRequisicion(this.infoCancelRequi)
      .subscribe(data => {
        if (data == 200) {
          let comentario = {
            Comentario: comentarioReclutador,
            RequisicionId: this.data.id,
            UsuarioAlta: this.settings.user['usuario'],
            ReclutadorId: this.settings.user['id'],
            MotivoId: this.data.motivoId
          }
          this.serviceComent.addComentarioVacante(comentario).subscribe(data => {
            if (data == 200) {
              this.dialogCancel.close(data);
            }
          }, err => {
            console.log(err);
          });
        }
        else {
          this.popToast('warning', 'Requisición', 'Oops!! No se pudo cancelar la requisición ' + this.folio);
          this.loading = false;
        }
      }, err => {
        console.log(err);
      });
    }
    else{
      this.popToast('warning', 'Requisición', 'Los caracteres mínimos del motivo de cancelacion son 30 sin espacios en blanco al final.');
      this.loading = false;
    }

  }

  onCloseDialog() {
    this.dialogCancel.close(0);
  }

}
