import { ExcelService } from './../../../service/ExcelService/excel.service';
import { AdminServiceService } from './../../../service/AdminServicios/admin-service.service';
import { CandidatosService } from './../../../service/Candidatos/candidatos.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportesService } from '../../../service/Reporte/reportes.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-files-contratados',
  templateUrl: './files-contratados.component.html',
  styleUrls: ['./files-contratados.component.scss'],
  providers: [CandidatosService]
})
export class FilesContratadosComponent implements OnInit {

  registrosInfo: number;
  filemanager = false;
  candidatoId: any;
  nom = '';
  spinner = false;
  // scroll
  public disabled = false;
  public invertX = false;
  public compact = false;
  public invertY = false;
  public shown = 'shown';

  public dataInfoRequi: Array<any> = [];
  public pageInfo = 1;
  public itemsPerPageInfo = 20;
  public maxSizeInfo = 5;
  public numPagesInfo = 1;
  public lengthInfo = 0;
  clearFilter = false;

  public rowsInfo: Array<any> = [];
  public columns: Array<any> = [
    { title: 'Folio', className: 'text-success text-center', name: 'folio', filtering: { filterString: '', placeholder: 'Folio' } },
    { title: 'Vacante', className: 'text-success text-center', name: 'vbtra', filtering: { filterString: '', placeholder: 'Vacante' } },
    { title: 'CURP', className: 'text-info text-center', name: 'curp', filtering: { filterString: '', placeholder: 'CURP' } },
    { title: 'edad', className: 'text-info text-center', name: 'edad', filtering: { filterString: '', placeholder: 'aaaa-mm-dd' } },
    { title: 'Nombre', className: 'text-info text-center', name: 'nombre', filtering: { filterString: '', placeholder: 'Nombre' } },
    {
      title: 'Fecha', className: 'text-info text-center', name: 'fch_Creacion',
      filtering: { filterString: '', placeholder: 'aaaa-mm-dd' }
    }
  ];
  element: any = [];
  rowAux: any = [];
  totalCandidatos = 0;
  totalFolios = 0;
  ruta = 'candidatos';
  value = '';
  filtro = '';
  public config: any = {
    paging: true,
    filtering: { filterString: '' },
    className: ['table-hover mb-0 ']
  };
  Clientes: any = [];
  clienteId: any;
  filteredClientes: any = [];
  reporte = 0;
  clientes: any;

  constructor(
    private service: CandidatosService,
    private adminService: AdminServiceService,
    private _Router: Router,
    private Servicio: ReportesService,
    private excelService: ExcelService,
    private activateRoute: ActivatedRoute,
    private pipe: DatePipe) {
    this.activateRoute.params.subscribe(params => {
      if (params['ruta'] != null) {
        this.reporte = +params['ruta'];
      }
    });
  }

  ngOnInit() {
    this.spinner = true;
    if (this.reporte === 0) {
      this.GetContratadosInfo();
      // this.GetClientes();
    } else {
      this.GetIngresos();

    }
  }
  GetClientes() {
    this.Servicio.GetEmpresas().subscribe(item => {
      this.Clientes = item;
      this.filterClientes('');
    });
  }
  fileManager() {
    this._Router.navigate(['/admin/fileManager',
      this.element.id,
      this.ruta,
      this.element.nombre,
      this.element.reclutador,
      this.element.folio,
      this.element.vbtra,
      this.element.foto
    ], { skipLocationChange: true });
  }
  capturaDtos() {
    this._Router.navigate(['/admin/capturaPersonal',
      this.element.candidatoId,
      this.element.folio,
      this.element.vbtra
    ], { skipLocationChange: true });
  }

  GetContratadosInfo() {
    this.service.GetInfoContratados().subscribe(result => {
      this.totalFolios = result.length;
      this.totalCandidatos = 0;

      this.dataInfoRequi = [];
      result.forEach(element => {
        if (element.info.length > 0) {
          element.info.forEach(item => {
            // row.forEach(item => {
            if (item.length > 0) {
              this.dataInfoRequi.push({
                id: item[0].id,
                candidatoId: item[0].candidatoId,
                nombre: item[0].nombre,
                edad: item[0].edad,
                rfc: item[0].rfc,
                curp: item[0].curp,
                nss: item[0].nss,
                paisNacimiento: item[0].paisNacimiento,
                estadoNacimiento: item[0].estadoNacimiento,
                municipioNacimiento: item[0].municipioNacimiento,
                localidad: item[0].localidad,
                generoId: item[0].generoId,
                fch_Creacion: item[0].fch_Creacion,
                fch_Modificacion: item[0].fch_Modificacion,
                folio: item[0].folio,
                vbtra: item[0].vbtra,
                reclutador: item[0].reclutador,
                foto: item[0].foto,
                clienteId: item[0].clienteId,
                nombrecomercial: item[0].nombrecomercial,
                razonSocial: item[0].razonSocial
              });

              this.Clientes.push({
                id: item[0].clienteId,
                nombrecomercial: item[0].nombrecomercial,
                razonSocial: item[0].razonSocial
              });
            }
            // });
          });
        }
      });

      this.Clientes = this.Clientes.filter(
        (item, i, arr) => arr.findIndex(t => t.id === item.id) === i
      );
      this.Clientes.sort(this.compare);
      this.filterClientes('');

      this.totalCandidatos = this.dataInfoRequi.length;
      this.onChangeTableInfo(this.config);
    });
  }
  GetIngresos() {
    this.adminService.GetDatosIngresos().subscribe(result => {
      this.totalFolios = result.length;
      this.totalCandidatos = 0;
      this.dataInfoRequi = result;
      const aux = [];

      result.forEach(item => {
        aux.push({
          id: item.clienteId,
          nombrecomercial: item.nombrecomercial,
          razonSocial: item.razonSocial
        });
      });

      this.Clientes = aux.filter(
        (item, i, arr) => arr.findIndex(t => t.id === item.id) === i
      );
      this.Clientes.sort(this.compare);
      this.filterClientes('');

      this.totalCandidatos = this.dataInfoRequi.length;
      this.onChangeTableInfo(this.config);
    });
  }
  clienteChange(config: any = this.config, page: any = { page: this.pageInfo, itemsPerPage: this.itemsPerPageInfo }) {
    this.spinner = true;
    const aux = this.dataInfoRequi.filter(element => element.clienteId === this.clienteId);
    this.rowsInfo = aux;
    const filteredData = this.changeFilterInfo(this.rowsInfo, this.config);
    this.rowsInfo = page && config.paging ? this.changePageInfo(page, filteredData) : filteredData;
    this.lengthInfo = filteredData.length;
    this.totalCandidatos = this.rowsInfo.length;
    this.spinner = false;
  }
  filterClientes(data: any) {
    this.filtro = '';
    if (!this.Clientes || data === '') {
      this.filteredClientes = JSON.parse(JSON.stringify(this.Clientes));
      return;
    }

    const search = data;
    const tempArray: Array<any> = [];

    const colFiltar: Array<any> = [{ title: 'nombrecomercial' }];

    this.Clientes.forEach(function (item) {
      let flag = false;
      colFiltar.forEach(function (c) {
        if (item[c.title].toString().toLowerCase().match(search.toLowerCase())) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    if (tempArray.length === 0) {
      this.filtro = 'No se encontraron resultados';
    }
    this.filteredClientes = tempArray;
  }
  compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const nom = a.nombrecomercial.toUpperCase();
    const nom2 = b.nombrecomercial.toUpperCase();

    let comparison = 0;
    if (nom > nom2) {
      comparison = 1;
    } else if (nom < nom2) {
      comparison = -1;
    }
    return comparison;
  }
  closeModal() {
    this.filemanager = false;
  }
  public refreshTableInfo() {
    this.spinner = true;
    this.filterClientes('');
    if (this.reporte === 1) {
      this.GetIngresos();
      this.columns.forEach(element => {
        element.filtering.filterString = '';
        (<HTMLInputElement>document.getElementById(element.name)).value = '';
      });
      this.onChangeTableInfo(this.config);
    } else {
      this.GetContratadosInfo();
      setTimeout(() => {
        this.columns.forEach(element => {
          element.filtering.filterString = '';
          (<HTMLInputElement>document.getElementById(element.name)).value = '';
        });

        this.onChangeTableInfo(this.config);
      }, 400);
    }
  }
  public onChangeTableInfo(config: any, page: any = { page: this.pageInfo, itemsPerPage: this.itemsPerPageInfo }): any {

    if (config.filtering) {
      (<any>Object).assign(this.config.filtering, config.filtering);
    }

    this.registrosInfo = this.dataInfoRequi.length;
    this.rowsInfo = this.dataInfoRequi;
    const filteredData = this.changeFilterInfo(this.rowsInfo, this.config);
    this.rowsInfo = page && config.paging ? this.changePageInfo(page, filteredData) : filteredData;
    this.lengthInfo = filteredData.length;
    this.spinner = false;
  }
  public changeFilterInfo(data: any, config: any): any {

    let filteredData: Array<any> = data;
    this.columns.forEach((column: any) => {
      this.clearFilter = true;
      if (column.filtering.filterString !== '') {
        // this.showFilterRow = true;
        filteredData = filteredData.filter((item: any) => {
          if (item[column.name] != null) {
            return item[column.name].toString().toLowerCase().match(column.filtering.filterString.toLowerCase());
          }
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item: any) =>
        item[config.filtering.columnName].toLowerCase().match(this.config.filtering.filterString.toLowerCase()));
    }

    let tempArray: Array<any> = [];
    filteredData.forEach((item: any) => {
      let flag = false;
      this.columns.forEach((column: any) => {
        if (item[column.name] == null) {
          flag = true;
        } else {
          if (item[column.name].toString().toLowerCase().match(this.config.filtering.filterString.toLowerCase())) {
            flag = true;
          }
        }
      });
      if (flag) {

        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }
  public changePageInfo(page: any, data: Array<any> = this.dataInfoRequi): Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }
  public onCellClick(data: any): any {

    data.selected ? data.selected = false : data.selected = true;

    this.element = data;

    if (this.rowAux.length == 0) {
      this.rowAux = data;
    } else if (data.selected && this.rowAux != []) {
      var aux = data;
      data = this.rowAux;
      data.selected = false;
      aux.selected = true;
      this.rowAux = aux;
    }

  }
  public clearfilters() {
    this.clearFilter = false;
    // (<HTMLInputElement>document.getElementById('filterInput')).value = '';
    this.columns.forEach(element => {
      element.filtering.filterString = '';
      (<HTMLInputElement>document.getElementById(element.name)).value = '';
    });
    this.onChangeTableInfo(this.config);
  }

  exportAsXLSX() {
    if (this.rowsInfo.length > 0) {
      this.spinner = true;
      const aux = [];
      this.rowsInfo.forEach(row => {

        const c = this.pipe.transform(new Date(row.fch_Creacion), 'dd-MMM-yyyy');
        const e = this.pipe.transform(new Date(row.edad), 'dd/MM/yyyy');

        aux.push({
          FOLIO: row.folio.toString(),
          EMPRESA: row.nombrecomercial,
          PUESTO: row.vbtra,
          CURP: row.curp,
          EDAD: e,
          NOMBRE: row.nombre,
          'FECHA INGRESO': c,
        });
      });

      this.excelService.exportAsExcelFile(aux, 'reporte_ingresos');
      this.spinner = false;
    }
  }

}
