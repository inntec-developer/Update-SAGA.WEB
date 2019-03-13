import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { ComponentsService } from './../../../service/Components/components.service';
import { InfoCandidatoService } from '../../../service/SeguimientoVacante/info-candidato.service';

@Component({
  selector: 'app-reporte-candidatos',
  templateUrl: './reporte-candidatos.component.html',
  styleUrls: ['./reporte-candidatos.component.scss'],
  providers: [ComponentsService]
})
export class ReporteCandidatosComponent implements OnInit {
  @Input('RequisicionId') RequisicionId: any;
  @Input('EstatusId') EstatusId: any;
  @ViewChild('modallib') modal: any;


  private UsuarioId: string;
  private objLiberar: Array<any> = [];
  private CandidatoId: string;
  private ProcesoCandidatoId: any;
  private auxestatus = true;
  private desapartar = true;
  private loading: boolean;
  private dlgLiberar = false;
  private selected: boolean;
  private candidatos: boolean;
  private rowAux = [];


  // Varaibles del paginador
  public page: number = 1;
  public itemsPerPage: number = 20;
  public maxSize: number = 5;
  public numPages: number = 1;
  public length: number = 0;

  public showFilterRow: boolean;
  public dataSource: Array<any> = [];
  public errorMessage: any;
  public registros: number;
  public Liberar: boolean;


  constructor(
    private dialog: MatDialog,
    private toasterService: ToasterService,
    private _ServiceComponente: ComponentsService
  ) { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.RequisicionId && changes.RequisicionId.isFirstChange()) {
      this.UsuarioId = sessionStorage.getItem('id');
      this.getCandidatos();
      this.candidatos = false;
      if (this.EstatusId == 34 || this.EstatusId == 35 || this.EstatusId == 36 || this.EstatusId == 37 || this.EstatusId == 39) {
        this.Liberar = false;
      } else {
        this.Liberar = true;
      }
    }
  }

  getCandidatos() {
    this._ServiceComponente.getRPTCandVacante(this.RequisicionId).subscribe(data => {
      this.dataSource = [];
      data.forEach(element => {
        var perfil = {
          id: element.id,
          nombre: element.contratados[0]['nombre'] + ' ' + element.contratados[0]['apellidoPaterno'] + ' ' + element.contratados[0]['apellidoMaterno'],
          curp: element.contratados[0]['curp'],
          rfc: element.contratados[0]['rfc'],
          nss: element.contratados[0]['nss'], edad: element.contratados[0]['edad'],
          estatus: element.estatus,
          candidatoId: element.candidatoId,
          estatusId: element.estatusId
        }
        this.dataSource.push(perfil);
        this.showFilterRow = true;
        this.onChangeTable(this.config);
      }, error => this.errorMessage = <any>error)
    });
  }

  public refresh() {
    this.getCandidatos();
    setTimeout(() => {
      this.columns.forEach(element => {
        (<HTMLInputElement>document.getElementById(element.name)).value = '';
      });
    }, 1000);
  }

  public clearfilters() {
    this.columns.forEach(element => {
      element.filtering.filterString = '';
      (<HTMLInputElement>document.getElementById(element.name)).value = '';
    });
    this.candidatos = false;
    this.selected = false;
    this.getCandidatos();
  }

  openDialogLiberar() {
    this.objLiberar.push({
      RequisicionId: this.RequisicionId,
      CandidatoId: this.CandidatoId,
      ReclutadorId: this.UsuarioId,
      ProcesoCandidatoId: this.ProcesoCandidatoId,
    })
    this.dlgLiberar = true;
  }

  onClose(value: any) {
    if (value == 200) {
      this.getCandidatos();
      this.desapartar = true;
      this.auxestatus = false;
      var msg = 'El candidato se libero correctamente.';
      this.popToast('warning', 'Liberado', msg);
      this.modal.hide();
      this.dlgLiberar = false;
    }
    else if (value == 404) {
      var msg = 'Error el intentar liberar el candidato. Consulte al departamento de soporte si el problema persiste.';
      this.desapartar = false;
      this.auxestatus = true;
      this.popToast('error', 'Apartado', msg);
      this.modal.hide();
      this.dlgLiberar = false;
    }
    else {
      this.modal.hide();
      this.dlgLiberar = false;
    }

  }

  public onCellClick(data: any): any {

    data.selected ? data.selected = false : data.selected = true;
    this.CandidatoId = data.candidatoId;
    this.ProcesoCandidatoId = data.id;
    if (!data.selected) {
      this.selected = false;
      this.candidatos = false;
    } else {
      this.selected = true;
      this.candidatos = true;
    }

    if (this.rowAux.length == 0) {
      this.rowAux = data;
    }
    else if (data.selected && this.rowAux != []) {
      var aux = data;
      data = this.rowAux;
      data.selected = false;
      aux.selected = true;
      this.rowAux = aux;
    }
  }

  popToast(type: any, title: any, body: any) {
    var toast: Toast = {
      type: type,
      title: title,
      timeout: 4000,
      body: body
    }
    this.toasterService.pop(toast);
  }

  public rows: Array<any> = []
  public columns: Array<any> = [
    { title: 'Nombre Candidato', className: 'text-info', name: 'nombre', filtering: { filterString: '', placeholder: 'Nombre' } },
    { title: 'Fecha Nacimiento', className: 'text-info text-center', name: 'edad', filtering: { filterString: '', placeholder: 'Fecha Nacimiento' } },
    { title: 'CURP', className: 'text-success', name: 'curp', filtering: { filterString: '', placeholder: 'CURP' } },
    { title: 'RFC', className: 'text-success', name: 'rfc', filtering: { filterString: '', placeholder: 'RFC' } },
    { title: 'NSS', className: 'text-success', name: 'nss', filtering: { filterString: '', placeholder: 'NSS' } },
    // { title: 'Estatus', className: 'text-info text-center', name: 'estatus', filtering: { filterString: '', placeholder: 'Estatus' } }
  ]

  public config: any = {
    paging: true,
    //sorting: { colums: this.columns },
    filtering: { filterString: '' },
    className: ['table-hover  mb-0']
  }

  public changePage(page: any, data: Array<any> = this.dataSource): Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data: any, config: any): any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName: string = void 0;
    let sort: string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous: any, current: any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columns.forEach((column: any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item: any) => {
          if (item[column.name] != null)
            return item[column.name].toString().toLowerCase().match(column.filtering.filterString.toLowerCase());
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

  public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
    if (config.filtering) {
      (<any>Object).assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      (<any>Object).assign(this.config.sorting, config.sorting);
    }

    this.rows = this.dataSource;
    let filteredData = this.changeFilter(this.dataSource, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
    this.registros = this.rows.length;
  }

}
