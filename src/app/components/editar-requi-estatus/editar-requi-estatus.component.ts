import { Component, Input, OnInit } from '@angular/core';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { ComentariosService } from './../../service/Comentarios/comentarios.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { PostulateService } from '../../service/SeguimientoVacante/postulate.service';
import { RequisicionesService } from './../../service/requisiciones/requisiciones.service';
import { SettingsService } from '../../core/settings/settings.service';

@Component({
  selector: 'app-editar-requi-estatus',
  templateUrl: './editar-requi-estatus.component.html',
  styleUrls: ['./editar-requi-estatus.component.scss']
})
export class EditarRequiEstatusComponent implements OnInit {

  @Input('estatusId') estatusId;
  @Input('usuarioId') usuarioId;
  @Input('requisPausa') requis = [];

  editing = {};
  comentario: string = '';
  loading = false;

  //scroll
  public disabled = false;
  public invertX = false;
  public compact = false;
  public invertY = false;
  public shown = 'hover';

  // Varaibles del paginador
  public page: number = 1;
  public itemsPerPage: number = 20;
  public maxSize: number = 5;
  public numPages: number = 1;
  public length: number = 0;

  showFilterRow: boolean = true;
  registros: number;

  public rows: Array<any> = [];
  public columns: Array<any> = [
    { title: 'Folio', className: 'text-success text-center', name: 'folio',
     filtering: { filterString: '', placeholder: 'Folio', columnName: 'folio' } },
    { title: 'Perfil', className: 'text-info text-center', name: 'vBtra',
     filtering: { filterString: '', placeholder: 'Perfil', columnName: 'perfil' } },
    { title: 'Reclutador', className: 'text-info text-center', name: 'comentarioReclutador',
     filtering: { filterString: '', placeholder: 'Reclutador', columnName: 'reclutador' } },
    { title: 'Solicitante', className: 'text-info text-center', name: 'solicita',
     filtering: { filterString: '', placeholder: 'Solicitante', columnName: 'solicitante' } },
    { title: 'Coordinador', className: 'text-info text-center', name: 'coordinador',
     filtering: { filterString: '', placeholder: 'Coordinador', columnName: 'coordinador' } },
    { title: 'Motivo', className: 'text-info text-center', name: 'comentarioReclutador',
     filtering: { filterString: '', placeholder: 'Motivo', columnName: 'motivo' } },
    { title: 'Fecha Reporte.', className: 'text-info text-center', name: 'comentarioReclutador',
    filtering: { filterString: '', placeholder: 'aaaa-mm-dd', columnName: 'fecha' } },
    { title: 'Descripción Reporte', className: 'text-info text-center', name: 'comentarioReclutador',
    filtering: { filterString: '', placeholder: 'Descripción', columnName: 'comentario' } }
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
    private spinner: NgxSpinnerService,
    private service: RequisicionesService,
    private comentarioService: ComentariosService,
    private postulateService: PostulateService,
    private toasterService: ToasterService,
    private settings: SettingsService) { }

  ngOnInit() {
    this.onChangeTable(this.config);

  }

  //#region paginador

  public changePage(page: any, data: Array<any> = this.requis): Array<any> {
    const start = (page.page - 1) * page.itemsPerPage;
    const end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeFilter(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columns.forEach((column: any) => {
      if (column.filtering && column.filtering.filterString.toLowerCase() !== '') {
        filteredData = filteredData.filter((item: any) => {
            if (!Array.isArray(item[column.name]) && typeof item[column.name] !== 'object') {
              return item[column.name].toString().toLowerCase().match(column.filtering.filterString.toLowerCase());
            } else {
                const aux = item[column.name];
                const flag = false;
                if (aux[column.filtering.columnName].toString().toLowerCase().match(column.filtering.filterString.toLowerCase())) {
                  return item[column.name];
                }
            }
          }
        );
      }
    });

    return filteredData;
  }

  //#endregion

  public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
    if (config.filtering) {
      (<any>Object).assign(this.config.filtering, config.filtering);
    }

    this.rows = this.requis;
    const filteredData = this.changeFilter(this.rows, this.config);

    this.rows = page && config.paging ? this.changePage(page, filteredData) : filteredData;
    this.length = filteredData.length;
  }

  public refreshTable() {

      this.columns.forEach(element => {
        element.filtering.filterString = '';
        (<HTMLInputElement>document.getElementById(element.filtering.columnName + '_1')).value = '';
      });

      this.rows.forEach(e => {
        e.activar = false;
      });
      this.onChangeTable(this.config);
  }

  public clearfilters() {
    // (<HTMLInputElement>document.getElementById('filterInput')).value = '';
    this.columns.forEach(element => {
      element.filtering.filterString = '';
      (<HTMLInputElement>document.getElementById(element.filtering.columnName + '_1')).value = '';
    });
    this.onChangeTable(this.config);
  }

  onSelect(row, rowIndex) {

    row.selected ? row.selected = false : row.selected = true;

  }

  updateValue(event, cell, rowIndex) {

    let aux;
    if (event.target.value !== '') {
      aux = this.rows[rowIndex]['comentarioReclutador'];
      aux.respuesta = event.target.value;
      this.rows[rowIndex]['comentarioReclutador'] = aux;
      this.comentario = event.target.value;
      this.rows[rowIndex]['activar'] = true;
    }

    this.editing[rowIndex + '-' + cell] = false;
    this.rows = [...this.rows];
  }

  // estatus vacantes
  SetStatus(row, rowIndex) {
    this.loading = true;

    this.service.GetUltimoEstatusRequi(row.id).subscribe(result => {

      if (result !== 404) {
        const estatus = result.descripcion;

        const datos = { estatusId: result.estatusId, requisicionId: row.id };

        this.postulateService.SetProcesoVacante(datos).subscribe(data => {
          if (data === 201) {
            this.AddComentario(row, rowIndex, datos.estatusId);
          } else {
            this.loading = false;
            this.popToast('error', 'Estatus', 'Ocurrió un error al intentar actualizar los datos');
          }
        });
      }
    });
  }

  AddComentario(row, rowIndex, estatusId) {
    const Comentario = {
      Comentario: this.comentario,
      RequisicionId: row.id,
      MotivoId: 7,
      UsuarioAlta: this.settings.user['usuario'],
      ReclutadorId: this.settings.user['id'],
      RespuestaId: row.comentarioReclutador.id,
      EstatusId: estatusId
    };
    this.comentarioService.addComentarioVacante(Comentario).subscribe(data => {
      if (data === 200) {
        this.comentario = '';
        this.requis.splice(rowIndex, 1);

        this.refreshTable();
        this.loading = false;
        this.popToast('success', 'Estatus', 'Los datos se actualizaron con éxito');
        row.activar = false;
      }
    }, err => {

      console.log(err);
    });
  }

  popToast(type, title, body) {
    const toast: Toast = {
      type: type,
      title: title,
      timeout: 4000,
      body: body
    }
    this.toasterService.pop(toast);

  }
}
