import { ComentariosService } from './../../service/Comentarios/comentarios.service';
import { CandidatosService } from './../../service/Candidatos/candidatos.service';
import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-dlg-comentarios-nr',
  templateUrl: './dlg-comentarios-nr.component.html',
  styleUrls: ['./dlg-comentarios-nr.component.scss'],
  providers: [CandidatosService]
})
export class DlgComentariosNRComponent implements OnInit, AfterViewInit {

  motivos;
  comentario: string;
  motivoId;
  loading = false;
  constructor(@Inject(MAT_DIALOG_DATA) public usuario: any,
   private serviceCandidato: CandidatosService, 
   private serviceComentarios: ComentariosService, 
   private toasterService: ToasterService,
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
  
  AddComentario()
  {
    this.loading = true;
    let Comentario = {
        Comentario: this.comentario,
        CandidatoId: this.usuario.CandidatoId,
        RequisicionId: this.usuario.requisicionId,
        MotivoId: this.motivoId,
        Usuario: sessionStorage.getItem('usuario'),
        UsuarioId: sessionStorage.getItem('id')
      }

      this.serviceComentarios.AddComentariosNR(Comentario).subscribe(data => {

        if (data == 200) {
          this.comentario = '';
          this.motivoId = 0;

          this.loading = false;
        //  this.popToast('success', 'Candidato posible NR', 'El comentario se agregó con éxito');
          this.dialog.close(true);
        }
        else
        {
          this.loading = false;
       
       //   this.popToast('error', 'Candidato posible NR', 'Ocurrio un error al intentar agregar comentario');
        
        this.dialog.close(false);

        }
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
