import { AdminServiceService } from './../../../../../service/AdminServicios/admin-service.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ComentariosService } from '../../../../../service/Comentarios/comentarios.service';
const swal = require('sweetalert');
@Component({
  selector: 'app-dlg-transfer',
  templateUrl: './dlg-transfer.component.html',
  styleUrls: ['./dlg-transfer.component.scss'], 
  providers: [AdminServiceService, ComentariosService]
})
export class DlgTransferComponent implements OnInit {
  disabled = false;
  compact = false;
  invertX = false;
  invertY = false;
  shown = 'hover';

  coord = [];
  coordId;
  coordNom = "";

  loading: boolean = false;
  public comentario: string = "";
  constructor(private _sevice: AdminServiceService,  @Inject(MAT_DIALOG_DATA) public data: any, private serviceComentarios: ComentariosService) { }

  ngOnInit() {
    this.GetCoordinadores();
  }

  GetCoordinadores()
  {
    this._sevice.GetByUsuario(4).subscribe(data => {
      this.coord = data;
      console.log(data);
    });
  }

  Seleccionar(coordId, coord)
  {
    this.coordId = coordId;
    this.coordNom = coord;
  }

  AddComentario()
  {
    this.loading = true;
    let Comentario = {
        Comentario: this.comentario,
        RequisicionId: this.data.id,
        MotivoId: 7,
        UsuarioAlta: sessionStorage.getItem('usuario'),
        ReclutadorId: sessionStorage.getItem('id'),
        EstatusId: 7
      }
      swal({
        title: "¿ESTÁS SEGURO?",
        text: "¡Se asignara la vacante con folio " + this.data.folio + " a coordinador " + this.coordNom + "!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ec2121",
        confirmButtonText: "Aceptar",
        cancelButtonColor: "#ec2121",
        cancelButtonText: "Cancelar",
        closeOnConfirm: false,
        closeOnCancel: false
      }, (isConfirm) => {
        window.onkeydown = null;
        window.onfocus = null;
        if (isConfirm) {
          this.serviceComentarios.addComentarioVacante(Comentario).subscribe(data => {
            if (data == 200) {
              this.comentario = '';
    
              this.loading = false;
              swal("TRANSFERIR", '¡La asignación se realizó con éxito!', 'success' );
            
            }
          }, err => {
            this.loading = false;
           swal('ERROR', 'Ocurrio un error', 'error');
            console.log(err);
          });
  
        }
        else {
          swal("Cancelado", "No se realizó ningún cambio", "error");
        }
      });
     
    }

}
