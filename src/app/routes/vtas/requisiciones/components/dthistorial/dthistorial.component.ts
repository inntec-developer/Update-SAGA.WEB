import { Component, OnInit, Input } from '@angular/core';
import { RequisicionesService } from '../../../../../service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SettingsService } from '../../../../../core/settings/settings.service';
import { DatePipe } from '@angular/common';
import { ExcelService } from '../../../../../service/ExcelService/excel.service';
import { PostulateService } from '../../../../../service/SeguimientoVacante/postulate.service';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-dthistorial',
  templateUrl: './dthistorial.component.html',
  styleUrls: ['./dthistorial.component.scss']
})
export class DTHistorialComponent implements OnInit {
@Input() ventas = false;
  // scroll
  disabled = false;
  compact = false;
  invertX = false;
  invertY = false;
  shown = 'hover';

  // Variables Globales
  public dataSource: Array<any> = [];
  Vacantes = 0;

  // Varaibles del paginador
  public page = 1;
  public itemsPerPage = 20;
  public maxSize = 5;
  public numPages = 1;
  public length = 0;

  showFilterRow: boolean;
  registros: number;
  totalContratados = 0;
  clearFilter = false;
  element: any = [];
  rowAux: any = [];
  reporteCandidatos = false;

  public config: any = {
    paging: true,
    filtering: { filterString: '' },
    className: ['table-hover  mb-0']
  };

  public rows: Array<any> = [];
  public columns: Array<any> = [
    { title: 'Folio', sorting: 'desc', className: 'text-success text-center',
    name: 'folio', filtering: { filterString: '', placeholder: 'Folio' } },
    { title: 'Cliente', className: 'text-info text-center', name: 'cliente', filtering: { filterString: '', placeholder: 'Cliente' } },
    { title: 'Perfil', className: 'text-info text-center', name: 'vBtra', filtering: { filterString: '', placeholder: 'Perfil' } },
    { title: 'Cub/Vac', className: 'text-info text-center', name: 'vacantes', filtering: { filterString: '', placeholder: 'No.' } },
    { title: 'Coordinacion', className: 'text-info text-center',
    name: 'claseReclutamiento', filtering: { filterString: '', placeholder: 'Coordinacion' } },
    { title: 'Creación', className: 'text-info text-center', name: 'fch_Creacion',
    filtering: { filterString: '', placeholder: 'aaaa-mm-dd' } },
    { title: 'Fecha Cump.', className: 'text-info text-center', name: 'fch_Cumplimiento',
    filtering: { filterString: '', placeholder: 'aaaa-mm-dd' } },
    { title: 'Fecha Modificación.', className: 'text-info text-center', name: 'fch_Modificacion',
    filtering: { filterString: '', placeholder: 'aaaa-mm-dd' } },
    { title: 'Estatus', className: 'text-info text-center', name: 'estatus', filtering: { filterString: '', placeholder: 'Estatus' } },
    { title: 'Coordinador', className: 'text-info text-center', name: 'coordinador',
    filtering: { filterString: '', placeholder: 'Coordinador' } },
    { title: 'Solicitante', className: 'text-info text-center', name: 'propietario',
    filtering: { filterString: '', placeholder: 'Solicitante' } },
    { title: 'Reclutador', className: 'text-info text-center', name: 'reclutadores',
    filtering: { filterString: '', placeholder: 'Reclutador' } },
  ];
  /*
 * Creacion de mensajes
 * */
  toaster: any;
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right',
    limit: 7, tapToDismiss: false,
    showCloseButton: true,
    mouseoverTimerStop: true,
  });
  constructor( private service: RequisicionesService, private spinner: NgxSpinnerService,
    private settings: SettingsService,
    private excelService: ExcelService,
    private postulacionservice: PostulateService,
    private toasterService: ToasterService,
    private pipe: DatePipe ) { }

  ngOnInit() {
    this.spinner.show();
    this.getRequisiciones();
  }

  getRequisiciones() {
    this.service.GetRequisicionesHistorial(this.settings.user['id']).subscribe(data => {
      this.dataSource = data;
      this.totalContratados = 0;
      this.dataSource.forEach(r => {
        this.totalContratados += r.contratados;
      });
     this.onChangeTable(this.config);
    });
  }

  public changePage(page: any, data: Array<any> = this.dataSource): Array<any> {
    const start = (page.page - 1) * page.itemsPerPage;
    const end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeFilter(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.showFilterRow = true;
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
                    if(element.toString().toLowerCase().match(column.filtering.filterString.toLowerCase())) {
                      flag = true;
                      return;
                    }
                  });

                  if (flag) {
                    return item[column.name];
                  }
                } else {
                  if ( 'sin asignar'.match(column.filtering.filterString.toLowerCase())) {
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

    this.rows = this.dataSource;
    const filteredData = this.changeFilter(this.rows, this.config);

    this.rows = page && config.paging ? this.changePage(page, filteredData) : filteredData;
    this.length = filteredData.length;
    this.registros = this.rows.length;
    this.spinner.hide();
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
  public refreshTable() {
    this.spinner.show();
    this.getRequisiciones();

    setTimeout(() => {
      this.columns.forEach(element => {
        element.filtering.filterString = '';
        (<HTMLInputElement>document.getElementById(element.name + '1')).value = '';
      });
      this.spinner.hide();
    }, 800);
    this.onChangeTable(this.config);
  }

  public clearfilters() {
    this.columns.forEach(element => {
      element.filtering.filterString = '';
      (<HTMLInputElement>document.getElementById(element.name + '1')).value = '';
    });
    this.onChangeTable(this.config);

  }
  updataStatus(estatusId, estatus) {
    const datos = { estatusId: estatusId, requisicionId: this.element.id };
      this.postulacionservice.SetProcesoVacante(datos).subscribe(data => {
        if (data === 201) {
          this.refreshTable();
          this.popToast('success', 'Estatus', 'Los datos se actualizaron con éxito');

        } else {
          this.popToast('error', 'Estatus', 'Ocurrió un error al intentar actualizar los datos');
        }

      });
    }

  exportAsXLSX() {

    if (this.dataSource.length > 0) {
      const aux = [];
      let reclutador = '';
      let coordinador = '';

      this.dataSource.forEach(row => {
        const d = this.pipe.transform(new Date(row.fch_Creacion), 'dd/MM/yyyy');
        const e = this.pipe.transform(new Date(row.fch_Cumplimiento), 'dd/MM/yyyy');
        const m = this.pipe.transform(new Date(row.fch_Modificacion), 'dd/MM/yyyy');


        if (!Array.isArray(row.reclutadores) ) {
          reclutador = 'SIN ASIGNAR';
        } else if (row.reclutadores.length > 1) {
          row.reclutadores.forEach(element => {
            reclutador = reclutador + element + ', \n';
          });
        } else {
          reclutador = row.reclutadores[0];
        }

        if (row.estatusId === 4) {
          coordinador = reclutador;
          reclutador = 'SIN ASIGNAR';

        } else {
          coordinador = row.coordinador;
        }

        aux.push({
          FOLIO: row.folio.toString(),
          EMPRESA: row.cliente,
          PUESTO: row.vBtra,
          NO: row.vacantes,
          CUBIERTOS: row.contratados,
          COORDINACION: row.claseReclutamiento,
          'FECHA CREACIÓN': d, // new Date(d.getFullYear() + '-' + (d.getMonth()) + '-' + d.getDate()).toString(),
          'FECHA CUMPLIMIENTO': e,
          'FECHA MODIFICACIÓN': m,
          ESTATUS: row.estatus,
          COORDINADOR: coordinador,
          SOLICITANTE: row.solicita,
          RECLUTADOR: reclutador,
        });
        reclutador = '';
      });

      this.excelService.exportAsExcelFile(aux, 'Historico');
      this.refreshTable();
    }
  }
  popToast(type, title, body) {
    const toast: Toast = {
      type: type,
      title: title,
      timeout: 5000,
      body: body
    };
    this.toasterService.pop(toast);
  }
}
