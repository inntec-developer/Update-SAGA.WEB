import { Component, Input, OnInit } from '@angular/core';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { CandidatosService } from './../../service/Candidatos/candidatos.service';
import { ComentariosService } from './../../service/Comentarios/comentarios.service';
import { SettingsService } from '../../core/settings/settings.service';

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
  constructor(
    private service: CandidatosService,
    public serviceComentarios: ComentariosService,
    private toasterService: ToasterService,
    private settings: SettingsService) { }

  ngOnInit() {
    //this.GetCandidatosNR();
  }

  GetCandidatosNR() {
    this.service.GetFoliosIncidencias(this.estatusId, this.settings.user['id']).subscribe(result => {
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
      Usuario: this.settings.user['usuario'],
      UsuarioId: this.settings.user['id'],
      RespuestaId: row.comentarioId,
      RequisicionId: row.requisicionId,
      MotivoId: row.motivoId,
      estatusId: estatus
    }
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
      Usuario: this.settings.user['usuario'],
      UsuarioId: this.settings.user['id'],
      RespuestaId: row.comentarioId,
      RequisicionId: row.requisicionId,
      MotivoId: row.motivoId,
      estatusId: estatus
    }

    var conf = false;
    if (modal == 1) {
      swal({
        title: "¿ESTÁS SEGURO?",
        text: "¡El candidato quedará como NR!",
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
        title: "¿ESTÁS SEGURO?",
        text: "¡El candidato quedará como liberado!",
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
