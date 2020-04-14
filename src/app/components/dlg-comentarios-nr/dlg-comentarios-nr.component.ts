import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { CandidatosService } from './../../service/Candidatos/candidatos.service';
import { ComentariosService } from './../../service/Comentarios/comentarios.service';
import { SettingsService } from './../../core/settings/settings.service';

@Component({
  selector: 'app-dlg-comentarios-nr',
  templateUrl: './dlg-comentarios-nr.component.html',
  styleUrls: ['./dlg-comentarios-nr.component.scss'],
  providers: [CandidatosService]
})
export class DlgComentariosNRComponent implements OnInit, AfterViewInit {

  public motivos: any;
  public comentario: string;
  public motivoId: any;
  public loading = false;

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

  constructor(@Inject(MAT_DIALOG_DATA) public usuario: any,
   private serviceCandidato: CandidatosService,
   private serviceComentarios: ComentariosService,
   private toasterService: ToasterService,
   private settings: SettingsService,
   private dialog: MatDialogRef<DlgComentariosNRComponent>) { }

  ngOnInit() {

  }

  ngAfterViewInit()
  {
    this.GetMotivos();

  }

  GetMotivos()
  {
    this.serviceCandidato.GetMotivos(28).subscribe(result =>{
      this.motivos = result;
    })

  }

  AddComentario() {
    this.loading = true;
    const Comentario = {
        Comentario: this.comentario,
        CandidatoId: this.usuario.CandidatoId,
        RequisicionId: this.usuario.requisicionId,
        MotivoId: this.motivoId,
        Usuario: this.settings.user['usuario'],
        UsuarioId: this.settings.user['id']
      };
      this.serviceComentarios.AddComentariosNR(Comentario).subscribe(data => {
        if (data === 200) {
          this.comentario = '';
          this.motivoId = 0;

          this.loading = false;
        //  this.popToast('success', 'Candidato posible NR', 'El comentario se agregó con éxito');
          this.dialog.close(true);
        } else {
          this.loading = false;

       //   this.popToast('error', 'Candidato posible NR', 'Ocurrio un error al intentar agregar comentario');

        this.dialog.close(false);

        }
      });
    }

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
