import { ActivatedRoute, CanDeactivate, Router, } from '@angular/router';
import { AfterViewChecked, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialog } from '@angular/material/dialog';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { InfoCandidatoComponent } from './../../../../../../components/info-candidato/info-candidato.component';
import { ModalDirective } from 'ngx-bootstrap/modal/public_api';
import { NgxSpinnerService } from 'ngx-spinner';
import { PostulateService } from '../../../../../../service/SeguimientoVacante/postulate.service';

declare var $: any;

@Component({
  selector: 'dt-candidatos-post',
  templateUrl: './dt-candidatos-post.component.html',
  styleUrls: ['./dt-candidatos-post.component.scss']
})
export class DtCandidatosPostComponent implements OnInit {
  @Input('RequisicionId') RequisicionId: any;
  @Input('Folio') Folio: any;
  @Input('Vacante') Vacante: any;

  @ViewChild('lgModal') modal;

  selected: boolean = false;
  rowAux = [];
  
  public dataSource: Array<any> = [];
  // Varaibles del paginador
  public page: number = 1;
  public itemsPerPage: number = 20;
  public maxSize: number = 5;
  public numPages: number = 1;
  public length: number = 0;

  showFilterRow: boolean;
  registros: number;
  errorMessage: any;
  element: any = {};
  idCandidato: any;
modalPrincipal = false;
  loading: boolean = true;

  constructor(
    private service: PostulateService,
    private dialog: MatDialog,
    private _Router: Router,
    private toasterService: ToasterService,
    private spinner: NgxSpinnerService,
  ) { }

  
  ngOnInit() {
    this.getpostulados()
    setTimeout(() => {
      this.onChangeTable(this.config);
    }, 1500);
  }

  getpostulados() {
    this.service.getPostulados(this.RequisicionId).subscribe(data => {
      this.dataSource = data;
    }, error => this.errorMessage = <any>error);
  }

  closeModal()
  {
    this.modal.hide();
    this.modalPrincipal = false;
  }

  public rows: Array<any> = []
  public columns: Array<any> = [
    { title: 'Nombre Candidato', className: 'text-center text-info', name: 'nombre', filtering: { filterString: '', placeholder: 'Nombre' } },
    { title: 'Área Experiencia', className: 'text-center text-info', name: 'areaExp', filtering: { filterString: '', placeholder: 'Experiencia' } },
    { title: 'Área Interes', className: 'text-center text-info', name: 'areaInt', filtering: { filterString: '', placeholder: 'Interes' } },
    { title: 'Localidad', className: 'text-center text-info', name: 'localidad', filtering: { filterString: '', placeholder: 'Localidad' } },
    { title: 'Sueldo Aceptable', className: 'text-info text-center', name: 'sueldoMinimo', filtering: { filterString: '', placeholder: 'Sueldo aceptable' } },
    { title: 'Fecha Nacimiento', className: 'text-info text-center', name: 'edad', filtering: { filterString: '', placeholder: 'Fecha Nacimiento' } },
    { title: 'CURP', className: 'text-center text-success', name: 'curp', filtering: { filterString: '', placeholder: 'CURP' } },
    { title: 'RFC', className: 'text-center text-success', name: 'rfc', filtering: { filterString: '', placeholder: 'RFC' } },
  ]

  public config: any = {
    paging: true,
    //sorting: { colums: this.columns },
    filtering: { filterString: '' },
    className: ['table-hover mb-0']
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
    this.showFilterRow = true;
    this.columns.forEach((column: any) => {
      if (column.filtering.filterString != "") {
        filteredData = filteredData.filter((item: any) => {
          if (item[column.name] != null)
            return item[column.name].toString().toLowerCase().match(column.filtering.filterString.toLowerCase());
        });
      }
    });

    // if (!config.filtering) {
    //   return filteredData;
    // }

    // if (config.filtering.columnName) {
    //   return filteredData.filter((item: any) =>
    //     item[config.filtering.columnName].toLowerCase().match(this.config.filtering.filterString.toLowerCase()));
    // }

    // let tempArray: Array<any> = [];
    // filteredData.forEach((item: any) => {
    //   let flag = false;
    //   this.columns.forEach((column: any) => {
    //     if (item[column.name] == null) {
    //       flag = true;
    //     } else {
    //       if (item[column.name].toString().toLowerCase().match(this.config.filtering.filterString.toLowerCase())) {
    //         flag = true;
    //       }
    //     }
    //   });
    //   if (flag) {
    //     tempArray.push(item);
    //   }
    // });
    // filteredData = tempArray;

    return filteredData;
  }

  public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
    if (config.filtering) {
      (<any>Object).assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      (<any>Object).assign(this.config.sorting, config.sorting);
    }
    this.registros = this.dataSource.length;
    this.rows = this.dataSource;
    let filteredData = this.changeFilter(this.dataSource, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
    this.loading = false;
  }

  public onCellClick(data: any): any {
    data.selected ? data.selected = false : data.selected = true;
    let index = this.dataSource.indexOf(data.row);
    this.element = data;
    this.idCandidato = data.candidatoId;
    /* add an class 'active' on click */
    if (!data.selected) {
      this.selected = false;
    } else {
      this.selected = true;
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


  /*
  * Funciones propias del componente.
  * */
  public refreshTable() {
    this.getpostulados()
    setTimeout(() => {
      this.columns.forEach(element => {
        element.filtering.filterString = '';
        (<HTMLInputElement>document.getElementById(element.name)).value = '';
      });
      this.onChangeTable(this.config);
    }, 1500);
  }

  public clearfilters(){
    this.columns.forEach(element => {
      element.filtering.filterString = '';
     (<HTMLInputElement>document.getElementById(element.name)).value = '';
    });
    this.onChangeTable(this.config);
  }

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
  popToast(type, title, body) {
    var toast: Toast = {
      type: type,
      title: title,
      timeout: 5000,
      body: body
    }
    this.toasterService.pop(toast);
  }
}
