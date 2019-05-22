import { AdminServiceService } from './../../../../../service/AdminServicios/admin-service.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ComentariosService } from '../../../../../service/Comentarios/comentarios.service';
import { SettingsService } from '../../../../../core/settings/settings.service';
import { NgxSpinnerService } from 'ngx-spinner';
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
  rowAux;
  coordId;
  coordNom = "";
  titulo = "";
  loading: boolean = false;
  public comentario: string = "";
  dataRowIndex: any;
  constructor(
    private _sevice: AdminServiceService, 
    private dialog : MatDialogRef<DlgTransferComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private serviceComentarios: ComentariosService, 
    private settings: SettingsService) 
    {
      dialog.disableClose = true;
    }

  ngOnInit() {
   this.GetCoordinadores();
  }

  GetCoordinadores()
  {
    this._sevice.GetByUsuario(this.data.usuario).subscribe(data => {
      this.coord = data;
      if(this.data.usuario == 4)
      {
        this.titulo = "Coordinador";
      }
      else
      {
        this.titulo = "Ejecutivo";
      }
    });
  }

  Seleccionar(row, rowIndex)
  {
    if(this.dataRowIndex != rowIndex)
    {
      if(this.rowAux)
      {
        this.rowAux.selected = false;
      }
      this.dataRowIndex = rowIndex;
      this.rowAux = row;
      row.selected = true;
    }
    else
    {
      this.rowAux = row;
      this.dataRowIndex = rowIndex;
      row.selected = true; //para poner el backgroun cuando seleccione
    }

    this.coordId = row.id;
    this.coordNom = row.nombre;
  }

  AddComentario()
  {
    if(this.coordNom.length > 0)
    {
  
      let tipo = 1; //cambio coordinador
      if(this.data.usuario == 10)
      {
        tipo = 2 //cambio ejecutivo
      }
    let Comentario = {
        Comentario: this.comentario,
        RequisicionId: this.data.id,
        MotivoId: 7,
        UsuarioAlta: this.settings.user['nombre'],
        ReclutadorId: this.settings.user['id'],
        EstatusId: 20,
        UsuarioTransferId: this.coordId,
        Tipo: tipo
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
        closeOnConfirm: true,
        closeOnCancel: true
      }, (isConfirm) => {

        // window.onkeydown = null;
        // window.onfocus = null;
        if (isConfirm) {
          this.loading = true;
        
          this.serviceComentarios.addComentarioVacante(Comentario).subscribe(data => {
            if (data == 200) {
              this.comentario = '';
              this.rowAux.selected = false;
              this.loading = false;

              swal("TRANSFERIR", '¡La asignación se realizó con éxito!', 'success' );
              this.dialog.close(true);
            
            }
            else
            {
              this.loading = false;

              swal('ERROR', 'Ocurrio un error', 'error');
            }
          });
  
        }
        else {
          swal("Cancelado", "No se realizó ningún cambio", "error");
        }
      });
     
    }
    else
    {
      swal('ERROR', 'Debe seleccionar ejecutivo', 'error')
    }
  }

}
