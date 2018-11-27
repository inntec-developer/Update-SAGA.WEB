import { Component, OnInit, Inject } from '@angular/core';
import { ComentariosService } from './../../service/Comentarios/comentarios.service';
import { CandidatosService } from './../../service/Candidatos/candidatos.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-dlg-requisicion-pausa',
  templateUrl: './dlg-requisicion-pausa.component.html',
  styleUrls: ['./dlg-requisicion-pausa.component.scss'],
  providers: [CandidatosService, ComentariosService]
})
export class DlgRequisicionPausaComponent implements OnInit {

  motivos;
  comentario: string;
  motivoId;
  loading = false;
  constructor(@Inject(MAT_DIALOG_DATA) public requi: any,
  private serviceCandidato: CandidatosService, 
  private serviceComentarios: ComentariosService, 
  private toasterService: ToasterService,
  private dialog: MatDialogRef<DlgRequisicionPausaComponent>) { }

  ngOnInit() {
    this.GetMotivos();
  }

  GetMotivos()
  {
    this.serviceCandidato.GetMotivos(39).subscribe(result =>{
      this.motivos = result;
    })
  
  }

  AddComentario()
  {
    this.loading = true;
    let Comentario = {
        Comentario: this.comentario,
        RequisicionId: this.requi.requisicionId,
        MotivoId: this.motivoId,
        UsuarioAlta: sessionStorage.getItem('usuario'),
        ReclutadorId: sessionStorage.getItem('id'),
        EstatusId: 39
      }
      this.serviceComentarios.addComentarioVacante(Comentario).subscribe(data => {
        if (data == 200) {
          this.comentario = '';
          this.motivoId = 0;

          this.loading = false;
          this.popToast('success', 'Requisición en pausa', 'El comentario se agregó con éxito');
          this.dialog.close(1);
        }
      }, err => {
        this.loading = false;
        this.popToast('error', 'Requisición en pausa', err);
        console.log(err);
      });
    }
  
    
/**
   * configuracion para mensajes de acciones.
   */
  toaster: any;
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right',
    limit: 7,
    tapToDismiss: false,
    showCloseButton: true,
    mouseoverTimerStop: true,
    preventDuplicates: true,
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
