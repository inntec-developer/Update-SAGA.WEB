import { filter } from 'rxjs-compat/operator/filter';
import { CandidatosService } from './../../service/Candidatos/candidatos.service';
import { ComentariosService } from './../../service/Comentarios/comentarios.service';
import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { SettingsService } from '../../core/settings/settings.service';
import { PostulateService } from '../../service/SeguimientoVacante/postulate.service';

const Swal = require('sweetalert2');

@Component({
  selector: 'app-dlg-candidato-to-requi',
  templateUrl: './dlg-candidato-to-requi.component.html',
  styleUrls: ['./dlg-candidato-to-requi.component.scss'],
  providers: [CandidatosService]
})
export class DlgCandidatoToRequiComponent implements OnInit, AfterViewInit {
  disabled = false;
  compact = false;
  invertX = false;
  invertY = false;
  shown = 'hover';

  dataSource: any = [];
  element: any = [];
  rowAux: any = [];
  filteredData: any = [];
  comentario: any;

  constructor(private _service: CandidatosService,
    private service: PostulateService,
    private settings: SettingsService,
    private serviceComentarios: ComentariosService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialogRef<DlgCandidatoToRequiComponent>) {
     }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getMisCandidatos();
  }

  getMisCandidatos() {
    this._service.getMisCandidatos(this.settings.user['id']).subscribe(result => {
      if (result !== 404) {
        this.dataSource = result.filter(element => {
            return element.estatusId === 27;
        });
        this.filteredData = JSON.parse(JSON.stringify(this.dataSource));
      }
    });
  }

  public onCellClick(data: any): any {
    data.selected ? data.selected = false : data.selected = true;
    this.element = data;
    if (this.rowAux.length === 0) {
      this.rowAux = data;
    } else if (data.selected && this.rowAux !== []) {
      const aux = data;
      data = this.rowAux;
      data.selected = false;
      aux.selected = true;
      this.rowAux = aux;
    }
  }
  public Search(data: any) {
    const search = data.target.value;
    const tempArray: Array<any> = [];
    this.filteredData = this.dataSource;
    const colFiltar: Array<any> = [{ title: 'curp' }, {title: 'vBtra'}, { title: 'nombre'}, {title: 'localidad'}];

    this.filteredData.forEach(function (item) {
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

      this.filteredData = tempArray;
  }

  ApartarCandidato(row) {
    const datos = {
      candidatoId: row.candidatoId,
      estatusId: 12,
      requisicionId: this.data.requisicionId,
      ReclutadorId: this.settings.user['id']
    };
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success ml-2',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: '¿ESTÁS SEGURO?',
        text: '¡El candidato ' + row.nombre + ' quedará apartado en la vacante ' + this.data.vBtra + '!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '¡SI, APARTAR!',
        cancelButtonText: '¡NO, CANCELAR!',
        reverseButtons: true
      }).then((isConfirm) => {
        if (isConfirm.value) {
          this.service.SetProceso(datos).subscribe(data => {
            if (data === 201) {
              this.rowAux.selected = false;
              this.dialog.close(1);

            } else if (data === 300) {
              Swal.fire('ERROR', 'El candidato se encuentra apartado. Por favor valide información', 'error');
              this.dialog.close(1);

            } else {
              Swal.fire('ERROR', 'Ocurrio un error al intentar actualizar datos. Por favor intentelo de nuevo', 'error');
              this.getMisCandidatos();
            }
          });

        }  else if (
          /* Read more about handling dismissals below */
          isConfirm.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'CANCELADO',
            'No se realizó ningún cambio',
            'error'
          );
        }
      });
  }
  close() {
    this.dialog.close(0);
  }

}
