import { Component, Inject, OnInit, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { AdminServiceService } from './../../../../../service/AdminServicios/admin-service.service';
import { ComentariosService } from '../../../../../service/Comentarios/comentarios.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { RequisicionesService } from './../../../../../service/requisiciones/requisiciones.service';
import { SettingsService } from '../../../../../core/settings/settings.service';

const swal = require('sweetalert2');
@Component({
  selector: 'app-dlg-transfer',
  templateUrl: './dlg-transfer.component.html',
  styleUrls: ['./dlg-transfer.component.scss'],
  providers: [AdminServiceService, ComentariosService, RequisicionesService]
})
export class DlgTransferComponent implements OnInit {
  disabled = false;
  compact = false;
  invertX = false;
  invertY = false;
  shown = 'shown';
dataSource = [];
  coord = [];
  asig = [];
  asig2 = [];
  listaAsignar = [];
  dataSource1 = [];
  listaAsignar2 = [];
  dataSource2 = [];

  rowAux;
  coordId;
  coordNom = '';
  titulo = '';
  usuario = 0;
  verRecl = false;
  loading = false;
  public comentario = '';
  dataRowIndex: any;
  dataRowIndex2: any;
  rowAux2: any;

  constructor(
    private _sevice: AdminServiceService,
    private _requiService: RequisicionesService,
    private dialog : MatDialogRef<DlgTransferComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private serviceComentarios: ComentariosService,
    private settings: SettingsService) {
      dialog.disableClose = true;
    }

  ngOnInit() {
   this.GetCoordinadores();
  }
  setLista2() {
   this._sevice.GetByUsuario('Ejv-Recl').subscribe(result => {
        this.listaAsignar2 = JSON.parse(JSON.stringify(result));
        this.dataSource2 = JSON.parse(JSON.stringify(result));

      });
  }

  GetReclutadores($event) {
    if ($event.checked) {
      this._requiService.GetAsignados(this.data.id).subscribe(result => {
        this.listaAsignar = JSON.parse(JSON.stringify(result));
        this.dataSource1 = JSON.parse(JSON.stringify(result));

        this.setLista2();
        this.verRecl = true;
      this.usuario = this.data.usuario;
      this.data.usuario = 11;
      this.titulo = 'Reclutador';
      this.dataSource = [];
      this.coord = [];
      this.comentario = '';
        // this.setLista2();
      });
    } else {
      this.verRecl = false;
      this.data.usuario = this.usuario;
      this.asig = [];
      this.comentario = '';
      this.GetCoordinadores();
    }
  }
  GetCoordinadores() {
    this._sevice.GetByUsuario(this.data.depto).subscribe(data => {
      this.coord = JSON.parse(JSON.stringify(data));
      this.dataSource = JSON.parse(JSON.stringify(data));
      if (this.data.usuario === 4) {
        this.titulo = 'Coordinador';
      } else if (this.data.usuario === 5) {
        this.titulo = 'Lider';
      } else if (this.data.usuario === 10) {
        this.titulo = 'Ejecutivo de cuenta';
      } else if (this.data.usuario === 11) {
        this.titulo = 'Reclutador';
      } else {
        this.titulo = 'Ejecutivo';
      }
    });
  }

  onSelect(item: any, rowIndex) {
      const entidad = this.listaAsignar2.findIndex(x => x.reclutadorId === item.reclutadorId);

      if (entidad >= 0) {// para que no repita usuarios
         this.listaAsignar2.splice(entidad, 1);
      }

      if (this.rowAux) {
        // this.listaAsignar2.push(this.rowAux);
        this.asig.pop();
        this.rowAux.selected = false;

        this.dataRowIndex = rowIndex;
        this.rowAux = item;
        item.selected = true;
        this.asig.push(item);
      } else {
        this.rowAux = item;
        this.dataRowIndex = rowIndex;
        item.selected = true; // para poner el backgroun cuando seleccione
        this.asig.push(item);
      }
  }
  onSelect2(item: any, rowIndex) {
    const entidad = this.listaAsignar.findIndex(x => x.reclutadorId === item.reclutadorId);
    if (entidad >= 0) {
         this.listaAsignar.splice(entidad, 1);
    }

    if (this.dataRowIndex2 !== rowIndex) {
      if (this.rowAux2) {
          // this.listaAsignar.push(this.rowAux2);
          this.asig2.pop();
          this.rowAux2.selected = false;
        }
        this.dataRowIndex2 = rowIndex;
        this.rowAux2 = item;
        item.selected = true;
        this.asig2.push(item);
      } else {
        this.rowAux2 = item;
        this.dataRowIndex2 = rowIndex;
        item.selected = true;
        this.asig2.push(item);
      }
  }
  Seleccionar(row, rowIndex) {
    if (this.dataRowIndex !== rowIndex) {
      if (this.rowAux) {
        this.rowAux.selected = false;
      }
      this.dataRowIndex = rowIndex;
      this.rowAux = row;
      row.selected = true;
    } else {
      this.rowAux = row;
      this.dataRowIndex = rowIndex;
      row.selected = true;
    }

    this.coordId = row.id;
    this.coordNom = row.nombre;
  }

  AddComentario() {
    if (this.coordNom.length > 0 || this.asig.length > 0) {
      let tipo = 1; // cambio coordinador
      let usuarioAux = this.settings.user['id'];
      if (this.data.usuario === 10) {
        tipo = 2; // cambio ejecutivo
      } else if (this.data.usuario === 11) {
        tipo = 3; // cambio reclutador
        this.coordId = this.asig2[0].id;
        usuarioAux = this.asig[0].reclutadorId;
      }
      const Comentario = {
        Comentario: this.comentario,
        RequisicionId: this.data.id,
        MotivoId: 7,
        UsuarioAlta: this.settings.user['nombre'],
        ReclutadorId: this.settings.user['id'],
        EstatusId: 20,
        UsuarioTransferId: this.coordId,
        UsuarioAux: usuarioAux,
        Tipo: tipo
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
        html: '<h4>¡Se asignará la vacante con folio ' + this.data.folio + '!</h4>' +
        '<br><p>La transferencia puede durar varios segundos por favor espere</p>',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '¡SI, ASIGNAR!',
        cancelButtonText: 'CANCELAR',
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
                '¡La asignación se realizó con éxito!',
                'success' );
              this.dialog.close(true);
            } else {
              this.loading = false;

              swalWithBootstrapButtons.fire('ERROR', 'Ocurrió un error de conexión', 'error');
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

  public Search(data: any, opc, aux) {
    const search = data.target.value;
    const tempArray: Array<any> = [];

    const colFiltar: Array<any> = [{ title: 'nombre' }];

    aux.forEach(function (item) {
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

    if (opc === 1) {
      this.listaAsignar = tempArray;
    } else if (opc === 2) {
      this.listaAsignar2 = tempArray;
    } else {
      this.coord = tempArray;
    }
  }
}
