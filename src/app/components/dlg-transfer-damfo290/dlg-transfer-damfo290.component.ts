import { PerfilReclutamientoService } from './../../service/PerfilReclutamiento/perfil-reclutamiento.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { ComentariosService } from '../../service/Comentarios/comentarios.service';
import { SettingsService } from '../../core/settings/settings.service';

const swal = require('sweetalert2');
@Component({
  selector: 'app-dlg-transfer-damfo290',
  templateUrl: './dlg-transfer-damfo290.component.html',
  styleUrls: ['./dlg-transfer-damfo290.component.scss']
})
export class DlgTransferDamfo290Component implements OnInit {
  disabled = false;
  compact = false;
  invertX = false;
  invertY = false;
  shown = 'hover';

  usuarios = [];
  public comentario = '';
  rowAux: any = [];
  loading = false;
  rows: any = [];
  constructor(private dialog: MatDialogRef<DlgTransferDamfo290Component>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private serviceComentarios: ComentariosService,
    private _serviceDamfo: PerfilReclutamientoService,
    private settings: SettingsService) {
      dialog.disableClose = true;
    }

  ngOnInit() {
    this.GetSubordinados();
  }

  GetSubordinados() {
    this._serviceDamfo.GetSubOrdinados(this.settings.user['id']).subscribe( result => {
      this.usuarios = result;
      this.rows = Object.assign([], this.usuarios);
    });
  }
  onSelect(item: any) {
    if (this.rowAux) {
      this.rowAux = item;
      item.selected = true;
    } else {
      this.rowAux.selected = false;
      item.selected = true;
      this.rowAux = item;
    }
  }
  AddComentario() {
    if (this.rowAux) {
      const Comentario = {
        Comentario: this.comentario,
        RequisicionId: this.data.id,
        MotivoId: 7,
        UsuarioAlta: this.settings.user['nombre'],
        ReclutadorId: this.settings.user['id'],
        EstatusId: 20, // transferir
        UsuarioTransferId: this.rowAux.usuarioId,
        Tipo: 4
      };
      const swalWithBootstrapButtons = swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger mr-2'
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: '¿ESTÁS SEGURO?',
        html: '¡Se transferirá el DAMFO-290 a ' + this.rowAux.nombre + '!' + '<br/><br/>' +
        'La transferencia puede durar varios segundos por favor espere',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Transferir',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      }).then((isConfirm) => {
        if (isConfirm.value) {
          this.loading = true;

          this.serviceComentarios.addComentarioVacante(Comentario).subscribe(data => {
            if (data === 200) {
              this.comentario = '';
              this.rowAux.selected = false;
              this.loading = false;

              swalWithBootstrapButtons.fire(
                'TRANSFERIR',
                '¡La transferencia de DAMFO290 se realizó con éxito!',
                'success'
              );
              this.dialog.close(true);

            } else {
              this.loading = false;

              swalWithBootstrapButtons.fire('ERROR',
              'Ocurrió un error al intentar transferir DAMFO290. Por farvor intentelo de nuevo', 'error');
            }
          });

        } else if (
          /* Read more about handling dismissals below */
          isConfirm.dismiss === swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire('Cancelado', 'No se realizó ningún cambio', 'error');
        }
      });
    } else {
      swal.fire('ERROR', 'Debe seleccionar ejecutivo', 'error');
    }
  }
  public Search(data: any) {
    const search = data.target.value;
    const tempArray: Array<any> = [];

    const colFiltar: Array<any> = [{ title: 'nombre' }];

    this.usuarios.forEach(function (item) {
      let flag = false;
      colFiltar.forEach(function (c) {
        if (item[c.title].toString().toLowerCase().match(data.target.value.toLowerCase())) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    this.rows = tempArray;
  }
}
