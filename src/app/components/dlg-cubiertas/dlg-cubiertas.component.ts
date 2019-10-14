import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SettingsService } from '../../core/settings/settings.service';
import { ComentariosService } from '../../service/Comentarios/comentarios.service';
const swal = require('sweetalert');
const swal2 = require('sweetalert2');
@Component({
  selector: 'app-dlg-cubiertas',
  templateUrl: './dlg-cubiertas.component.html',
  styleUrls: ['./dlg-cubiertas.component.scss']
})
export class DlgCubiertasComponent implements OnInit {

  seleccion = 0;
  ajustes = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private dialog: MatDialogRef<DlgCubiertasComponent>,
  private settings: SettingsService) { }

  ngOnInit() {
    console.log(this.data)
  }

  CubrirFolio() {
    if (this.seleccion > 0) {
      const estatus = this.data.filter(e => {
        if (e.id === this.seleccion) {
          e.ajustes = this.ajustes;
          return e;
        }
      });

      // if (this.data.puro) {
      //   const comment = {
      //     Comentario: this.ajustes,
      //     RequisicionId: this.data[0].requisicionId,
      //     UsuarioAlta: this.settings.user['usuario'],
      //     reclutadorId: this.settings.user['id'],
      //     MotivoId: 19,
      //     EstatusId: 0
      //   };
      //   swal2.queue([{
      //     title: '¿ESTÁS SEGURO?',
      //     confirmButtonText: '¡Si, cambiar estatus!',
      //     text: '¡La requisición cambiará a estatus ' + estatus[0].descripcion.toUpperCase(),
      //     showLoaderOnConfirm: true,
      //     preConfirm: () => {
      //       return this._ComentariosService.addComentarioVacante(comment).subscribe(data => {
      //         if (data === 200) {
      //           this.dialog.close(estatus[0]);
      //         }
      //       }, err => {
      //         swal2.insertQueueStep('ESTATUS', 'Ocurrió un error al intentar actualizar. Por favor intentelo de nuevo', 'error');
      //       });
      //     }
      //   }]);

          swal({
            title: '¿ESTÁS SEGURO?',
            text: '¡La requisición cambiará a estatus ' + estatus[0].descripcion.toUpperCase(),
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ec2121',
            confirmButtonText: '¡Si, cambiar estatus!',
            cancelButtonColor: '#ec2121',
            cancelButtonText: '¡No, cancelar!',
            closeOnConfirm: true,
            closeOnCancel: true
          }, (isConfirm) => {
            window.onkeydown = null;
            window.onfocus = null;
            if (isConfirm) {
              this.dialog.close(estatus[0]);
            } else  {
              swal('ESTATUS', 'NO SE REALIZÓ NINGÚN CAMBIO', 'warning');
            }
          });
         }
      // } else {
      //   this.dialog.close(estatus[0]);
      // }
  }
  CloseDlg() {
    this.dialog.close(0);
  }
}
