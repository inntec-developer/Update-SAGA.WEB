import { Component, Input, OnInit } from '@angular/core';
import { ExcelService } from '../../../service/ExcelService/excel.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReportesService } from '../../../service/Reporte/reportes.service';
import { SettingsService } from '../../../core/settings/settings.service';

@Component({
  selector: 'app-tabla-reporte',
  templateUrl: './tabla-reporte.component.html',
  styleUrls: ['./tabla-reporte.component.scss'],
  providers: [ReportesService]
})
export class TablaReporteComponent implements OnInit {

  private usuario: any;
  @Input('valor') valor;
  @Input('tipoReporte') tipoReporte;
  public General: any[];
  public palabra: string;

  public disabled = false;
  public compact = false;
  public invertX = true;
  public invertY = true;
  public shown = 'shown';
  
// spinner-material
  color = 'primary';
  mode = 'indeterminate';
  value = 60;
  spinner = false;
  alert = false;
  public rows: Array<any> = [];

  requisiciones = [];
  source: any = [];
  // Varaibles del paginador
  public page = 1;
  public itemsPerPage = 50;
  public maxSize = 5;
  public numPages = 1;
  public length = 0;
  public numPosiciones = 0;
  rowIndex = [1, 50];

  public config: any = {
    paging: false,
    filtering: { filterString: '' },
    className: ['table-hover  mb-0']
  };
  totalFolios: any;
  columns = [
    { title: 'Folio', className: 'text-success text-center', name: 'folio', filtering: { filterString: '', placeholder: 'Folio' } },
    { title: 'Solicitud', className: 'text-success text-center',
      name: 'fch_Creacion', filtering: { filterString: '', placeholder: 'aaaa-mm-dd' } },
    { title: 'Empresa', className: 'text-info text-center', name: 'empresa', filtering: { filterString: '', placeholder: 'Empresa' } },
    { title: 'Puesto', className: 'text-info text-center', name: 'vBtra', filtering: { filterString: '', placeholder: 'Puesto' } },
    { title: 'Estado', className: 'text-info text-center', name: 'estado', filtering: { filterString: '', placeholder: 'Estado' } },
    { title: 'No.', className: 'text-info text-center', name: 'numero', filtering: { filterString: '', placeholder: 'No. vacante' } },
    { title: 'Cubierta', className: 'text-info text-center',
      name: 'cubierta', filtering: { filterString: '', placeholder: 'Cubiertas..' } },
    { title: 'Cumplimiento', className: 'text-info text-center',
      name: 'porcentaje', filtering: { filterString: '', placeholder: 'Cumplimiento..' } },
    { title: 'Estatus', className: 'text-info text-center', name: 'estatus', filtering: { filterString: '', placeholder: 'Estatus' } },
    { title: 'Fecha Estatus', className: 'text-info text-center',
      name: 'fch_Modificacion', filtering: { filterString: '', placeholder: 'aaaa-mm-dd' } },
    { title: 'Coordinación', className: 'text-info text-center',
      name: 'clasesReclutamiento', filtering: { filterString: '', placeholder: 'Coordinacion' } },
    { title: 'Coordinador', className: 'text-info text-center',
      name: 'coordinador2', filtering: { filterString: '', placeholder: 'Coordinador' } },
    { title: 'Reclutador', className: 'text-info text-center',
      name: 'nombreReclutado', filtering: { filterString: '', placeholder: 'No. Reclutador' } },
    { title: 'Solicita', className: 'text-info text-center',
      name: 'propietario', filtering: { filterString: '', placeholder: 'Solicita' } }
  ];
  constructor(
    private Servicio: ReportesService,
    private Exel: ExcelService,
    private settings: SettingsService
  ) { }

  ngOnInit() {
    this.usuario = this.settings.user['id'];
  }

  Guardar(valor) {
    const dato = valor;
    const p = document.getElementById('palabra');
    const palabra = p['value'];
  }

  Generar(oficina, solicitante, reclutador, empresa, estatus, tiporeclu, tipocoord, usercoord) {
    this.spinner = true;
    this.rowIndex = [0, 49];

     document.getElementById('DivReportefil').classList.remove('ocultar');
    // document.getElementById('Divprincipal').classList.add('ocultar');
    // document.getElementById('DivDetalleCordi').classList.add('ocultar');
    // document.getElementById('DivDetalleReclu').classList.add('ocultar');
    // document.getElementById('DivProacti').classList.add('ocultar');

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

    this.GetInforme();
  }

  GetInforme() {
    this.Servicio.GetInforme(this.source)
      .subscribe(data => {
        if (data !== 417) {
          if (data.length > 0) {
            this.requisiciones = data;
            this.totalFolios = this.requisiciones[0].totalFolios;
            this.numPosiciones = this.requisiciones[0].posActivas;
            this.alert = false;
            this.config.paging = false;
            this.onChangeTable(this.config);
          } else {
            this.alert = true;
          }
        } else {
          this.requisiciones = [];
          this.General = [];
          this.alert = true;
        }
        this.spinner = false;
      });
  }
  Exportar() {
    const obj = [];
    let reclutador = '';
    this.source.rowIndex = [0, this.totalFolios + 1];
    this.spinner = true;
    this.Servicio.GetInforme(this.source).subscribe(data => {
      if (data !== 417) {
        data.forEach(item => {
          if (item.nombreReclutado.length < 1) {
            reclutador = 'SIN ASIGNAR';
          } else if (item.nombreReclutado.length > 1) {
            item.nombreReclutado.forEach(element => {
              reclutador = reclutador + element + '\n';
            });
          } else {
            reclutador = item.nombreReclutado[0];
          }

          obj.push({
            'FOLIO': item.folio.toString(),
            'SOLICITUD': this.convertDateTime(item.fch_Creacion),
            'EMPRESA': item.empresa,
            'PUESTO': item.vBtra,
            'ESTADO': item.estado,

            'NO.': item.numero,
            'CUBIERTA': item.cubierta,
            'CUMPLIMIENTO': item.porcentaje + '%',
            'ESTATUS': item.estatus,
            'FECHA ESTATUS': this.convertDateTime(item.fch_Modificacion),
            'COORDINACÍON ': item.clasesReclutamiento,
            'COORDINADOR': item.estatusId === 4 ? reclutador : item.coordinador2,
            'RECLUTADOR': item.estatusId === 4 ? 'SIN ASIGNAR' : reclutador,
            'SOLICITA': item.nombreApellido,
          });

          reclutador = '';
        });

        this.Exel.exportAsExcelFile(obj, 'Reporte');
      }
      this.spinner = false;
    });
  }

  convertDateTime(dateTime) {
    if (dateTime !== undefined) {
      const res = dateTime.substring(0, 10);
      const date = res.split('-');
      const yyyy = date[0];
      const mm = date[1];
      const dd = date[2];
      const fecha = dd + '/' + mm + '/' + yyyy;
      return (fecha);
    }
    return ('');
  }

  public changePage(page: any, data: Array<any> = this.requisiciones) {
    this.spinner = true;
    const start = (page.page - 1) * page.itemsPerPage > 0 ? (page.page - 1) * page.itemsPerPage : 0;
    const end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : 50;

    this.source.rowIndex = [start, end - 1];
    this.Servicio.GetInforme(this.source).subscribe(result => {
      if (result !== 417) {
        if (result.length > 0) {
          this.requisiciones = result;
          this.totalFolios = this.requisiciones[0].totalFolios;
          this.numPosiciones = this.requisiciones[0].posActivas;
          this.rows = this.requisiciones;
          this.alert = false;
        } else {
          this.alert = true;
        }
      } else {
        this.requisiciones = [];
        this.General = [];
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
              let flag = false;
              if (item[column.name].length > 0) {
                item[column.name].forEach(element => {
                  if (element.toString().toLowerCase().match(column.filtering.filterString.toLowerCase())) {
                    flag = true;
                    return;
                  }
                });
                if (flag) {
                  return item[column.name];
                }
              } else {
                return item[column.name];
              }
            }
          } else {
            return 'sin asignar';
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
      this.changePage(page, this.rows);
      this.columns.forEach(element => {
        element.filtering.filterString = '';
        (<HTMLInputElement>document.getElementById(element.name)).value = '';
      });
    }
    const filteredData = this.changeFilter(this.requisiciones, this.config);
    this.rows = filteredData;
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

}
