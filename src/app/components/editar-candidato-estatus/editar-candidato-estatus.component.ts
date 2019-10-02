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

  @Input('estatusId') estatusId;
  @Input('candidatos') candidatos = [];

    // Varaibles del paginador
    public page = 1;
    public itemsPerPage = 20;
    public maxSize = 5;
    public numPages = 1;
    public length = 0;

  editing = {};
  comentario = '';
  confirmar = false;
  confirmar2 = false;
  rowAux: any = [];
  estatusAux: any = 0;

  public rows: Array<any> = [];
  public columns: Array<any> = [
    { title: 'Folio', className: 'text-success text-center', name: 'folio', filtering: { filterString: '', placeholder: 'Folio' } },
    { title: 'Solicitante', className: 'text-info text-center', name: 'reclutador',
    filtering: { filterString: '', placeholder: 'Solicitante' } },
    { title: 'Motivo', className: 'text-info text-center', name: 'motivo', filtering: { filterString: '', placeholder: 'Motivo' } },
    { title: 'Fecha incidencia', className: 'text-info text-center', name: 'fecha',
    filtering: { filterString: '', placeholder: 'aaaa-mm-dd' } },
    { title: 'Nombre candidato', className: 'text-info text-center', name: 'candidato',
    filtering: { filterString: '', placeholder: 'Candidato' } },
    { title: 'Estatus', className: 'text-info text-center', name: 'estatus', filtering: { filterString: '', placeholder: 'Estatus' } },
    { title: 'Descripcion incidencia', className: 'text-info text-center', name: 'comentario',
    filtering: { filterString: '', placeholder: 'Comentario' } }
  ];
  public config: any = {
    paging: true,
    filtering: { filterString: '' },
    className: ['table-hover mb-0 ']
  };
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
  constructor(
    private service: CandidatosService,
    public serviceComentarios: ComentariosService,
    private toasterService: ToasterService,
    private settings: SettingsService) { }

  ngOnInit() {
    this.onChangeTable(this.config);
  }
//#region paginador

public changePage(page: any, data: Array<any> = this.candidatos): Array<any> {
  let start = (page.page - 1) * page.itemsPerPage;
  let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
  return data.slice(start, end);
}
public changeFilter(data: any, config: any): any {
  let filteredData: Array<any> = data;
  this.columns.forEach((column: any) => {
    if (column.filtering.filterString !== '') {
      filteredData = filteredData.filter((item: any) => {
        if (item[column.name] != null) {
            return item[column.name].toString().toLowerCase().match(column.filtering.filterString.toLowerCase());
        }
      });
    }
  });

  return filteredData;
}

//#endregion

public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
  if (config.filtering) {
    (<any>Object).assign(this.config.filtering, config.filtering);
  }

  this.rows = this.candidatos;
  const filteredData = this.changeFilter(this.rows, this.config);
  this.rows = page && config.paging ? this.changePage(page, filteredData) : filteredData;
  this.length = filteredData.length;

}

public refresh() {

    this.columns.forEach(element => {
      element.filtering.filterString = '';
      (<HTMLInputElement>document.getElementById(element.name)).value = '';
    });
    this.editing = {};
    this.comentario = '';
    this.confirmar = false;
    this.confirmar2 = false;
    this.rowAux = [];
    this.estatusAux = 0;

    this.onChangeTable(this.config);
}

public clearfilters() {
  this.columns.forEach(element => {
    element.filtering.filterString = '';
    (<HTMLInputElement>document.getElementById(element.name)).value = '';
  });
  this.onChangeTable(this.config);

}

  GetCandidatosNR() {
    this.service.GetFoliosIncidencias(this.estatusId, this.settings.user['id']).subscribe(result => {
      this.candidatos = result;
      this.onChangeTable(this.config);
    });

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

    const Comentario = {
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

    const Comentario = {
      CandidatoId: row.candidatoId,
      Comentario: this.comentario,
      ComentarioId: row.comentarioId,
      Usuario: this.settings.user['usuario'],
      UsuarioId: this.settings.user['id'],
      RespuestaId: row.comentarioId,
      RequisicionId: row.requisicionId,
      MotivoId: row.motivoId,
      estatusId: estatus
    };

    const conf = false;
    if (modal == 1) {
      swal({
        title: '¿ESTÁS SEGURO?',
        text: '¡El candidato quedará como NR!. El proceso puede durar varios segundos. Por favor espere',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ec2121',
        confirmButtonText: '¡Si, validar como NR!',
        cancelButtonText: '¡No, cancelar!',
        closeOnConfirm: false,
        closeOnCancel: true
      }, (isConfirm) => {
        window.onkeydown = null;
        window.onfocus = null;
        if (isConfirm) {
          window.onkeydown = null;
          window.onfocus = null;
          this.serviceComentarios.AddRespuesta(Comentario).subscribe(data => {
            if (data === 200) {
              this.comentario = '';
              row.activar = false;
              const idx = this.candidatos.findIndex(x => x.candidatoId === row.candidatoId);
              this.candidatos.splice(idx, 1);
              this.onChangeTable(this.config);
              swal('¡Candidato NR!', 'Los datos se actualizaron con éxito.', 'success');

            }
          }, err => {

            console.log(err);
          });
        } else {
          swal('Cancelado', 'No se realizó ningún cambio', 'error');
        }

      });


    } else {
      swal({
        title: '¿ESTÁS SEGURO?',
        text: '¡El candidato quedará como liberado!. El proceso puede durar varios segundos. Por favor espere',
        type: 'warning',
        showCancelButton: true,
        confirmButtonClass: 'btn btn-success',
        confirmButtonColor: '#1e983b',
        confirmButtonText: '¡Si, candidato liberado!',
        cancelButtonText: '¡No, cancelar!',
        closeOnConfirm: false,
        closeOnCancel: false
      }, (isConfirm) => {
        window.onkeydown = null;
        window.onfocus = null;
        if (isConfirm) {
          this.serviceComentarios.AddRespuesta(Comentario).subscribe(data => {
            if (data === 200) {
              this.comentario = '';
              row.activar = false;
              const idx = this.candidatos.findIndex(x => x.candidatoId === row.candidatoId);
              this.candidatos.splice(idx, 1);
              this.onChangeTable(this.config);
              swal('¡Candidato Liberado!', 'Los datos se actualizaron con éxito.', 'success');

            }
          }, err => {

            console.log(err);
          });

        } else {
          swal('Cancelado', 'No se realizó ningún cambio', 'error');
        }
      });
    }
  }
  //#endregion


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
