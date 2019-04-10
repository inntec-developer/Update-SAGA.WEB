import { Component, Input, OnInit } from '@angular/core';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { CandidatosService } from './../../service/Candidatos/candidatos.service';
import { ComentariosService } from './../../service/Comentarios/comentarios.service';

const swal = require('sweetalert');

@Component({
  selector: 'app-editar-candidato-estatus',
  templateUrl: './editar-candidato-estatus.component.html',
  styleUrls: ['./editar-candidato-estatus.component.scss'],
  providers: [CandidatosService, ComentariosService]
})
export class EditarCandidatoEstatusComponent implements OnInit {

  @Input("estatusId") estatusId;
  @Input("candidatosNR") candidatos = [];

  editing = {};
  comentario = "";
  confirmar: boolean = false;
  confirmar2: boolean = false;
  rowAux: any = [];
  estatusAux: any = 0;
  constructor(private service: CandidatosService, public serviceComentarios: ComentariosService, private toasterService: ToasterService) { }

  ngOnInit() {
    //this.GetCandidatosNR();
  }

  GetCandidatosNR() {
    this.service.GetFoliosIncidencias(this.estatusId).subscribe(result => {
      this.candidatos = result;
    })

  }

  updateValue(event, cell, rowIndex) {
    var aux;
    if (event.target.value !== '') {
      // var aux = this.candidatos[rowIndex]['comentario'];
      // aux.respuesta = event.target.value;
      this.candidatos[rowIndex]['respuesta'] = event.target.value;

      this.candidatos[rowIndex]['activar'] = true;
      this.comentario = event.target.value;
    }

    this.editing[rowIndex + '-' + cell] = false;
    this.candidatos = [...this.candidatos];

  }

  public AddComentario(row, estatus) {

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

    console.log(row)



    this.rowAux = [];
    this.estatusAux = 0;
    this.confirmar = false;
    this.confirmar2 = false;

  }


  //#region modal confirmar
  Confirmar(row, estatus, modal) {

    var Comentario = {
      CandidatoId: row.candidatoId,
      Comentario: this.comentario,
      ComentarioId: row.comentarioId,
      Usuario: sessionStorage.getItem('usuario'),
      UsuarioId: sessionStorage.getItem('id'),
      RespuestaId: row.comentarioId,
      RequisicionId: row.requisicionId,
      MotivoId: row.motivoId,
      estatusId: estatus
    }

    var conf = false;
    if (modal == 1) {
      swal({
        title: "¿ESTAS SEGURO?",
        text: "¡El candidato quedara como NR!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ec2121",
        confirmButtonText: "¡Si, validar como NR!",
        cancelButtonText: "¡No, cancelar!",
        closeOnConfirm: false,
        closeOnCancel: false
      }, (isConfirm) => {
        window.onkeydown = null;
        window.onfocus = null;
        if (isConfirm) {
          window.onkeydown = null;
          window.onfocus = null;
          this.serviceComentarios.AddRespuesta(Comentario).subscribe(data => {
            if (data == 200) {
              this.comentario = '';
              row.activar = false;
              if (estatus == 27) {


                row.estatus = 'Disponible';
              }
              else {

                row.estatus = 'NR';

              }
              swal("¡Candidato NR!", "Los datos se actualizaron con éxito.", "success");

            }
          }, err => {

            console.log(err);
          });
        }
        else {
          swal("Cancelado", "No se realizó ningún cambio", "error");
        }

      });


    }
    else {
      swal({
        title: "¿ESTAS SEGURO?",
        text: "¡El candidato quedara como liberado!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn btn-success",
        confirmButtonColor: "#1e983b",
        confirmButtonText: "¡Si, candidato liberado!",
        cancelButtonText: "¡No, cancelar!",
        closeOnConfirm: false,
        closeOnCancel: false
      }, (isConfirm) => {
        window.onkeydown = null;
        window.onfocus = null;
        if (isConfirm) {
          this.serviceComentarios.AddRespuesta(Comentario).subscribe(data => {
            if (data == 200) {
              this.comentario = '';
              row.activar = false;
              if (estatus == 27) {


                row.estatus = 'Disponible';
              }
              else {

                row.estatus = 'NR';

              }

              swal("¡Candidato Liberado!", "Los datos se actualizaron con éxito.", "success");

            }
          }, err => {

            console.log(err);
          });

        } else {
          swal("Cancelado", "No se realizó ningún cambio", "error");
        }
      });
    }
  }
  //#endregion




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
