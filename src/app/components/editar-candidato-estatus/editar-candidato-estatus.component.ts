import { ComentariosService } from './../../service/Comentarios/comentarios.service';
import { CandidatosService } from './../../service/Candidatos/candidatos.service';
import { Component, OnInit, Input } from '@angular/core';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-editar-candidato-estatus',
  templateUrl: './editar-candidato-estatus.component.html',
  styleUrls: ['./editar-candidato-estatus.component.scss'],
  providers: [CandidatosService, ComentariosService]
})
export class EditarCandidatoEstatusComponent implements OnInit {

  @Input("estatusId") estatusId;
  candidatos: any = [];
  editing = {};
  comentario = "";
  constructor(private service: CandidatosService, private serviceComentarios: ComentariosService, private toasterService: ToasterService) { }

  ngOnInit() {
    this.GetCandidatosNR();
  }

  GetCandidatosNR()
  {
    this.service.GetFoliosIncidencias(this.estatusId).subscribe(result =>{
      this.candidatos = result;
      console.log(this.candidatos)
    })

  }

  updateValue(event, cell, rowIndex) 
  {
    var aux;
    if(event.target.value !== '')
    {
      // var aux = this.candidatos[rowIndex]['comentario'];
      // aux.respuesta = event.target.value;
      this.candidatos[rowIndex]['respuesta'] = event.target.value;
      
      this.candidatos[rowIndex]['activar'] = true;
      this.comentario = event.target.value;
    }

    this.editing[rowIndex + '-' + cell] = false;
    this.candidatos = [...this.candidatos];

  }

  AddComentario(row, estatus)
  {
    let Comentario = {
        CandidatoId: row.candidatoId,
        Comentario: this.comentario,
        ComentarioId: row.id,
        Usuario: sessionStorage.getItem('usuario'),
        UsuarioId: sessionStorage.getItem('id'), 
        RespuestaId: row.comentarioId,
        RequisicionId: row.requisicionId,
        MotivoId: row.motivoId,
        estatusId: estatus

      }
      this.serviceComentarios.AddRespuesta(Comentario).subscribe(data => {
        if (data == 200) {
          this.comentario = '';
          row.activar = false;
          if(estatus == 27)
          {
           

            row.estatus = 'Disponible';
          }
          else
          {

            row.estatus = 'NR';

          }
          
          this.popToast('success', 'Estatus', 'Los datos se actualizaron con éxito');
   
        }
      }, err => {
        this.popToast('error', 'Estatus', 'Ocurrió un error al intentar actualizar los datos');
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
