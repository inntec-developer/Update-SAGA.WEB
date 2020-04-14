import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ExcelService } from '../../service/ExcelService/excel.service';
import { RequisicionesService } from './../../service/requisiciones/requisiciones.service';
import { SettingsService } from '../../core/settings/settings.service';

@Component({
  selector: 'app-reporte70',
  templateUrl: './reporte70.component.html',
  styleUrls: ['./reporte70.component.scss'],
  providers: [RequisicionesService, DatePipe]
})
export class Reporte70Component implements OnInit {

  @Input('tipoReporte') tipoReporte;
  private usuario: any;
  public disabled = false;
  public compact = false;
  public invertX = true;
  public invertY = true;
  public shown = 'shown';

  public rows: Array<any> = [];

  public requisiciones = [];

  // Varaibles del paginador
  public page = 1;
  public itemsPerPage = 50;
  public maxSize = 5;
  public numPages = 1;
  public length = 50;
  public numPosiciones = 0;

  // spinner-material
  color = 'primary';
  mode = 'indeterminate';
  value = 60;
  spinner = false;
  alert = false;

  source: any = [];
  objusercoord: any = [];
  registros: any;
  showFilterRow: boolean;
  rowIndex = [1, 50];
  //#region filtros y paginador
  public config: any = {
    paging: false,
    filtering: { filterString: '' },
    className: ['table-hover  mb-0']
  };
  totalFolios: any;
  columns = [
    { title: 'Folio', className: 'text-success text-center', name: 'folio', filtering: { filterString: '', placeholder: 'Folio' } },
    {
      title: 'Fecha Solicitud', className: 'text-info text-center',
      name: 'fch_Creacion', filtering: { filterString: '', placeholder: 'aaaa-mm-dd' }
    },
    {
      title: 'Empresa', className: 'text-info text-center',
      name: 'nombrecomercial', filtering: { filterString: '', placeholder: 'Empresa' }
    },
    {
      width: '4%', title: 'Puesto', className: 'text-info text-center',
      name: 'vBtra', filtering: { filterString: '', placeholder: 'Puesto' }
    },
    {
      title: 'Sueldo', className: 'text-info text-center',
      name: 'sueldoMaximo', filtering: { filterString: '', placeholder: 'Sueldo' }
    },
    { title: 'Estado', className: 'text-info text-center', name: 'estado', filtering: { filterString: '', placeholder: 'Estado' } },
    {
      title: 'Domicilio Trabajo', className: 'text-info text-center',
      name: 'domicilio_trabajo', filtering: { filterString: '', placeholder: 'Domicilio Trabajo' }
    },
    {
      title: 'Reclutador', className: 'text-info text-center',
      name: 'reclutadores', filtering: { filterString: '', placeholder: 'Reclutador' }
    },
    {
      title: 'Sucursal', className: 'text-info text-center',
      name: 'razonSocial', filtering: { filterString: '', placeholder: 'Sucursal' }
    },
    {
      title: 'No.', className: 'text-info text-center',
      name: 'vacantes', filtering: { filterString: '', placeholder: 'No. Vacantes' }
    },
    {
      title: 'Enviado', className: 'text-info text-center',
      name: 'enProcesoEC', filtering: { filterString: '', placeholder: 'Enviado' }
    },
    {
      title: 'Aceptado', className: 'text-info text-center',
      name: 'enProcesoFC', filtering: { filterString: '', placeholder: 'Aceptado' }
    },
    {
      title: 'Cubiertos', className: 'text-info text-center',
      name: 'contratados', filtering: { filterString: '', placeholder: 'Cubiertos' }
    },
    {
      title: 'Faltante', className: 'text-info text-center',
      name: 'faltantes', filtering: { filterString: '', placeholder: 'Faltantes' }
    },
    {
      title: 'Cumplimiento', className: 'text-info text-center',
      name: 'porcentaje', filtering: { filterString: '', placeholder: 'Cumplimiento' }
    },
    {
      title: 'Dias Transcurridos', className: 'text-info text-center',
      name: 'diasTrans', filtering: { filterString: '', placeholder: 'Dias' }
    },
    { title: 'Estatus', className: 'text-info text-center', name: 'estatus', filtering: { filterString: '', placeholder: 'Estatus' } },
    {
      title: 'Tipo Reclutamiento', className: 'text-info text-center',
      name: 'tipoReclutamiento', filtering: { filterString: '', placeholder: 'Tipo reclutamiento' }
    },
    {
      title: 'Coordinación', className: 'text-info text-center',
      name: 'claseReclutamiento', filtering: { filterString: '', placeholder: 'Coordinación' }
    },
    {
      title: 'Com. Sol.', className: 'text-info text-center',
      name: 'comentarios_solicitante', filtering: { filterString: '', disabled: true }
    },
    {
      title: 'Com. Recl.', className: 'text-info text-center',
      name: 'comentarios_reclutador', filtering: { filterString: '', disabled: true }
    },
    {
      title: 'Coordinador', className: 'text-info text-center',
      name: 'coordinador', filtering: { filterString: '', placeholder: 'Coordinador' }
    },
    {
      title: 'Com. Coord.', className: 'text-info text-center',
      name: 'comentarios_coord', filtering: { filterString: '', placeholder: '', disabled: true }
    },
    {
      title: 'Solicita', className: 'text-info text-center',
      name: 'solicita', filtering: { filterString: '', placeholder: 'Solicita' }
    }
  ];

  constructor(
    private _service: RequisicionesService,
    private pipe: DatePipe,
    private excelService: ExcelService,
    private settings: SettingsService
  ) { }

  ngOnInit() {
    this.usuario = this.settings.user['id'];
  }

  llamado(oficina, solicitante, reclutador, empresa, estatus, tiporeclu, tipocoord, usercoord) {
    this.spinner = true;
    this.rowIndex = [0, 50];

    document.getElementById('DivReportefil').classList.add('ocultar');
    document.getElementById('Divprincipal').classList.remove('ocultar');
    const inc = document.getElementById('fechaInicial');
    const fin = document.getElementById('fechaFinal');

    const inicio = inc['value'];
    const final = fin['value'];

    const usuarios = this.usuario;
    this.source = {
      rowIndex: this.rowIndex,
      clave: '',
      ofc: oficina,
      tipo: this.tipoReporte,
      fini: inicio,
      ffin: final,
      emp: empresa,
      sol: solicitante,
      trcl: tiporeclu,
      coord: tipocoord,
      stus: estatus,
      recl: reclutador,
      usercoor: usercoord,
      usuario: usuarios
    };
    this.GetReporte70();
  }

  GetReporte70() {
    this.requisiciones = [];
    this.spinner = true;

    this._service.GetReporte70(this.source).subscribe(result => {
      if (result !== 404) {
        if (result.length > 0) {
          this.alert = false;
          this.requisiciones = result;
          this.totalFolios = this.requisiciones[0].totalFolios;
          this.numPosiciones = this.requisiciones[0].posActivas;
          this.length = this.totalFolios;
          this.rows = this.requisiciones;

        } else {
          this.alert = true;
          this.requisiciones = [];
        }
      } else {
        this.alert = true;
        this.requisiciones = [];
      }
      this.spinner = false;
    });
  }

  public changePage(page: any, data: Array<any> = this.requisiciones) {
    this.spinner = true;
    const start = (page.page - 1) * page.itemsPerPage > 0 ? (page.page - 1) * page.itemsPerPage : 0;
    const end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : 50;

    this.source.rowIndex = [start, end - 1];
    this._service.GetReporte70(this.source).subscribe(result => {
      if (result !== 404) {
        if (result.length > 0) {
          this.alert = false;
          this.requisiciones = result;
          this.totalFolios = this.requisiciones[0].totalFolios;
          this.numPosiciones = this.requisiciones[0].posActivas;
          this.rows = this.requisiciones;
        } else {
          this.alert = true;
        }
      } else {
        this.alert = true;
      }
      this.spinner = false;
    });
  }

  public changeFilter(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columns.forEach((column: any) => {
      if (column.filtering.filterString !== '') {
        filteredData = filteredData.filter((item: any) => {
          if (item[column.name] != null) {
            if (!Array.isArray(item[column.name])) {
              return item[column.name].toString().toLowerCase().match(column.filtering.filterString.toLowerCase());
            } else {
              if (item[column.name].length > 0) {
                let aux = [];
                aux = item[column.name];

                let flag = false;
                aux.forEach(element => {
                  if (element.toString().toLowerCase().match(column.filtering.filterString.toLowerCase())) {
                    flag = true;
                    return;
                  }
                });

                if (flag) {
                  return item[column.name];
                }
              } else {
                if ('sin asignar'.match(column.filtering.filterString.toLowerCase())) {
                  return item[column.name];
                }
              }
            }
          }
        });
      }

    });

    return filteredData;
  }

  public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
    if (config.filtering) {
      (<any>Object).assign(this.config.filtering, config.filtering);
    }
    if (config.paging) {
      this.columns.forEach(element => {
        element.filtering.filterString = '';
        (<HTMLInputElement>document.getElementById(element.name)).value = '';
      });
      this.changePage(page, this.rows);
    }
    this.rows = this.requisiciones;
    this.rows = this.changeFilter(this.rows, this.config);
    this.length = this.rows[0].totalFolios;
  }
  //#endregion

  public refreshTable() {
    this.config.paging = true;
    this.onChangeTable(this.config);
  }

  public clearfilters() {
    this.columns.forEach(element => {
      element.filtering.filterString = '';
      (<HTMLInputElement>document.getElementById(element.name)).value = '';
    });
    this.config.paging = false;
    this.onChangeTable(this.config);

  }

  exportAsXLSX() {
    this.source.rowIndex = [0, this.totalFolios + 1];
    this.spinner = true;
    this._service.GetReporte70(this.source).subscribe(result => {
      if (result !== 404) {
        if (result.length > 0) {
          const requis = result;
          const aux = [];
          let comentariosSol = '';
          let comentariosRecl = '';
          let comentariosCoord = '';
          let reclutador = '';
          let fecha = '';
          requis.forEach(row => {
            if (row.comentarios_coord.length > 0) {
              row.comentarios_coord.forEach(element => {
                comentariosCoord = comentariosCoord + element + '\n';
              });

            } else {
              comentariosCoord = '';
            }

            if (row.comentarios_solicitante.length > 0) {
              row.comentarios_solicitante.forEach(element => {
                comentariosSol = comentariosSol + element + ', \n';
              });

            } else {
              comentariosSol = '';
            }

            if (row.comentarios_reclutador.length > 0) {
              row.comentarios_reclutador.forEach(element => {
                element.comentario.forEach(el => {
                  if (element.fch_Creacion != null) {
                    fecha = this.pipe.transform(new Date(element.fch_Creacion), 'dd/MM/yyyy');
                  }

                  comentariosRecl = comentariosRecl + fecha + ' ' + el.comentario + '\n';
                });
                comentariosRecl = element.reclutador + '\n' + comentariosRecl + '\n';

              });
            } else {
              comentariosRecl = '';
            }

            if (row.reclutadores.length < 1) {
              reclutador = 'SIN ASIGNAR';
            } else if (row.reclutadores.length > 1) {
              row.reclutadores.forEach(element => {
                reclutador = reclutador + element + '\n';
              });
            } else {
              reclutador = row.reclutadores[0].reclutador;
            }

            const estatus = row.estatus[row.estatus.length - 1].estatus;
            let d = this.pipe.transform(new Date(), 'dd/MM/yyyy');
            if (row.fch_Creacion != null) {
              d = this.pipe.transform(new Date(row.fch_Creacion), 'dd/MM/yyyy');
            }
            let e = this.pipe.transform(new Date(), 'dd/MM/yyyy');
            if (row.fch_Modificacion != null) {
              e = this.pipe.transform(new Date(row.fch_Modificacion), 'dd/MM/yyyy');
            }

            aux.push({
              FOLIO: row.folio.toString(),
              'FECHA SOLICITUD': d,
              EMPRESA: row.nombrecomercial,
              PUESTO: row.vBtra,
              'SUELDO FINAL': row.sueldoMaximo.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
              ESTADO: row.estado,
              'DOMICILIO TRABAJO': row.domicilio_trabajo,
              RECLUTADOR: reclutador,
              SUCURSAL: row.razonSocial,
              NO: row.vacantes,
              ENVIADO: row.enProcesoEC,
              ACEPTADO: row.enProcesoFC,
              CONTRATADOS: row.contratados,
              FALTANTES: row.faltante,
              CUMPLIMIENTO: row.porcentaje,
              'DIAS TRANSCURRIDOS': row.estatus[0].diasTotal,
              ESTATUS: estatus,
              'FECHA ESTATUS': e,
              'TIPO RECLUTAMIENTO': row.tipoReclutamiento,
              'COORDINACION': row.clasesReclutamiento,
              'COMENTARIOS SOLICITANTE': comentariosSol,
              'COMENTARIOS RECLUTADORES': comentariosRecl,
              COORDINADOR: row.estatusId === 4 ? reclutador : row.coordinador,
              'COMENTARIOS COORDINADOR': comentariosCoord,
              SOLICITA: row.solicita,
            });
            comentariosSol = '';
            comentariosRecl = '';
            comentariosCoord = '';
            reclutador = '';
          });
          this.excelService.exportAsExcelFile(aux, 'ReporteGeneral');
          this.spinner = false;
        }
      }
    });
  }

}
