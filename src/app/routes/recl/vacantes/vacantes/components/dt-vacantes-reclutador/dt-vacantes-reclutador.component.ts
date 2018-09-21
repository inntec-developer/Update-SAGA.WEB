import { Component, OnInit } from '@angular/core';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { DialogAssingRequiComponent } from '../dialogs/dialog-assing-requi/dialog-assing-requi.component';
import { DialogShowRequiComponent } from '../dialogs/dialog-show-requi/dialog-show-requi.component';
import { MatDialog } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { PostulateService } from './../../../../../../service/SeguimientoVacante/postulate.service';
import { RequisicionesService } from '../../../../../../service';
import { Router } from '@angular/router';

const swal = require('sweetalert');
declare var $: any;

@Component({
  selector: 'app-dt-vacantes-reclutador',
  templateUrl: './dt-vacantes-reclutador.component.html',
  styleUrls: ['./dt-vacantes-reclutador.component.scss'],
  providers: [RequisicionesService, PostulateService]
})
export class DtVacantesReclutadorComponent implements OnInit {
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
  element: any = null;
  confidencial: boolean = true;

  estatusId: any;
  enProceso: any;
  requi: { folio: any; id: any; vacante: string; };
  vBtra: any;
  id: any;
  folio: any;
  postulados: any;
  ShowDV: boolean;
  clienteId: any;

  //estatus vacantes

  bc = true; //busqueda candidato
  sc = true; //socieconomico
  ecc = true; //envío candidato cliente
  ec = true; //espera contratacion
  nbc = true; //nueva busqueda candidato
  pausa = true;
  asignar = true;
  disenador = true;
  aprobador: any;

  rowAux = [];
  selected: boolean = false;
  clearFilter: boolean = false;
  pds: boolean = true;
;

  constructor(
    private service: RequisicionesService,
    private postulateservice: PostulateService,
    private dialog: MatDialog,
    private _Router: Router,
    private spinner: NgxSpinnerService,
    private toasterService: ToasterService
  ) {
    this.enProceso = 0;
    this.postulados = 0;
  }

  ngOnInit() {
    this.spinner.show();
    this.getVacantes();

  }

  ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    setTimeout(() => {
      this.onChangeTable(this.config);
    }, 1500);

  }

  getVacantes() {
    this.service.getRequiReclutador(sessionStorage.getItem('id')).subscribe(data => {
      this.dataSource = data;
    });
  }

  //estatus vacantes
  SetStatus(estatusId, estatus) {
    var datos = { estatusId: estatusId, requisicionId: this.requi.id };

    this.postulateservice.SetProcesoVacante(datos).subscribe(data => {
      if (data == 201) {
        var idx = this.rows.findIndex(x => x.id == this.requi.id);
        this.rows[idx]['estatus'] = estatus;
        this.rows[idx]['estatusId'] = estatusId;
        this.onChangeTable(this.config);
        this.popToast('success', 'Estatus', 'Los datos se actualizaron con éxito');

      }
      else {
        this.popToast('error', 'Estatus', 'Ocurrió un error al intentar actualizar los datos');
      }
    })
  }


  public rows: Array<any> = [];
  public columns: Array<any> = [
    { title: 'Folio', className: 'text-success text-center', name: 'folio', filtering: { filterString: '', placeholder: 'Folio' } },
    { title: 'Solicita', className: 'text-info text-center', name: 'solicita', filtering: { filterString: '', placeholder: 'Solicita' } },
    { title: 'Cliente', className: 'text-info text-center', name: 'cliente', filtering: { filterString: '', placeholder: 'Cliente' } },
    { title: 'Perfil', className: 'text-info text-center', name: 'vBtra', filtering: { filterString: '', placeholder: 'Perfil' } },
    { title: 'No. Vacantes', className: 'text-info text-center', name: 'vacantes', filtering: { filterString: '', placeholder: 'No. Vacantes' } },
    { title: 'Tipo Recl.', className: 'text-info text-center', name: 'tipoReclutamiento', filtering: { filterString: '', placeholder: 'Tipo' } },
    { title: 'Clase Recl.', className: 'text-info text-center', name: 'claseReclutamiento', filtering: { filterString: '', placeholder: 'Clase' } },
    { title: 'Sueldo Mínimo', className: 'text-info text-center', name: 'sueldoMinimo', filtering: { filterString: '', placeholder: 'Sueldo Min' } },
    { title: 'Sueldo Máximo', className: 'text-info text-center', name: 'sueldoMaximo', filtering: { filterString: '', placeholder: 'Sueldo Max' } },
    { title: 'Creación', className: 'text-info text-center', name: 'fch_Creacion', filtering: { filterString: '', placeholder: 'aaaa-mm-dd' } },
    { title: 'Cumplimiento', className: 'text-info text-center', name: 'fch_Cumplimiento', filtering: { filterString: '', placeholder: 'aaaa-mm-dd' } },
    { title: 'Estatus', className: 'text-info text-center', name: 'estatus', filtering: { filterString: '', placeholder: 'Estatus' } },
    { title: 'Prioridad', className: 'text-info text-center', name: 'prioridad', filtering: { filterString: '', placeholder: 'Prioridad' } },
    { title: 'Postulados', className: 'text-info text-center', name: 'postulados', filtering: { filterString: '', placeholder: 'Postulados' } },
    { title: 'En Proceso', className: 'text-info text-center', name: 'enProceso', filtering: { filterString: '', placeholder: 'Proceso' } },
  ];

  public config: any = {
    paging: true,
    //sorting: { columns: this.columns },
    filtering: { filterString: '' },
    className: ['table-hover mb-0 ']
  };

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
      this.clearFilter = true;
      if (column.filtering) {
        this.showFilterRow = true;
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
    this.registros = this.dataSource.length;
    this.rows = this.dataSource;
    let filteredData = this.changeFilter(this.dataSource, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
    setTimeout(() => {
      this.spinner.hide();
    }, 500);


  }

  public refreshTable() {
    this.getVacantes();
    setTimeout(() => {
      this.columns.forEach(element => {
        element.filtering.filterString = '';
        (<HTMLInputElement>document.getElementById(element.name)).value = '';
      });
      this.onChangeTable(this.config);
      this._reinciar();
    }, 800);
  }

  public clearfilters() {
    this.clearFilter = false;
    this.columns.forEach(element => {
      element.filtering.filterString = '';
      (<HTMLInputElement>document.getElementById(element.name)).value = '';
    });
    this.onChangeTable(this.config);
    if (!this.selected) {
      this._reinciar();
    }

  }



  public onCellClick(data: any): any {
    data.selected ? data.selected = false : data.selected = true;
    this.estatusId = data.estatusId;
    this.ValidarEstatus(this.estatusId)
    this.element = data;
    this.vBtra = data.vBtra;
    this.id = data.id;
    this.folio = data.folio;
    this.postulados = data.postulados;
    this.enProceso = data.enProceso;
    this.clienteId = data.clienteId;
    this.aprobador = data.aprobador;
    this.confidencial = data.confidencial
    if(this.enProceso > 0){
      this.pds = false;
    }else{
      this.pds = true;
    }
    this.requi = {
      folio: data.folio,
      vacante: data.cliente,
      id: data.id
    }

    if (!data.selected) {
      this._reinciar();
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

  private _reinciar() {
    this.element = null;
    this.postulados = null;
    this.bc = true; //busqueda candidato
    this.sc = true; //socieconomico
    this.ecc = true; //envío candidato cliente
    this.ec = true; //espera contratacion
    this.nbc = true; //nueva busqueda candidato
    this.pausa = true;
    this.asignar = true;
    this.disenador = true;
    this.pds = true;
  }

  ValidarEstatus(estatusId) {
    if (estatusId == 38) {
      /*estatus vacante */
      this.bc = false; //busqueda candidato
      this.sc = false; //socieconomico
      this.ecc = false; //envío candidato cliente
      this.ec = false; //espera contratacion
      this.nbc = false; //nueva busqueda candidato
      this.pausa = false;
      this.asignar = true;
      this.disenador = true;
    }
    else if (estatusId >= 34 && estatusId <= 37) {
      /*estatus vacante */
      this.bc = true; //busqueda candidato
      this.sc = true; //socieconomico
      this.ecc = true; //envío candidato cliente
      this.ec = true; //espera contratacion
      this.nbc = true; //nueva busqueda candidato
      this.pausa = true;
      this.asignar = true;
      this.disenador = true;
    }
    else if (estatusId == 4) {
      this.bc = true; //busqueda candidato
      this.sc = true; //socieconomico
      this.ecc = true; //envío candidato cliente
      this.ec = true; //espera contratacion
      this.nbc = true; //nueva busqueda candidato
      this.pausa = true;
      this.asignar = false;
      this.disenador = false;
    }
    else {
      this.bc = false; //busqueda candidato
      this.sc = false; //socieconomico
      this.ecc = false; //envío candidato cliente
      this.ec = false; //espera contratacion
      this.nbc = false; //nueva busqueda candidato
      this.pausa = false;
      this.asignar = false;
      this.disenador = false;
    }
  }

  /*
   * Funciones para la administracion de las requisiciones.
   * */
  openDialogShowRequi() {

    let dialogShow = this.dialog.open(DialogShowRequiComponent, {
      width: '200%',
      height: '100%',
      data: this.requi
    });
    dialogShow.afterClosed().subscribe(result => {
      this.refreshTable();
    });
  }
  openDialogAssingRequi() {
    let dialogAssing = this.dialog.open(DialogAssingRequiComponent, {
      width: '1200px',
      height: 'auto',
      data: this.element
    });
    dialogAssing.afterClosed().subscribe(result => {
      this.refreshTable();
    });
  }

  openDesignVacante() {
    if (this.aprobador === sessionStorage.getItem('usuario')) {
      this._Router.navigate(['/reclutamiento/configuracionVacante/', this.id, this.folio, this.vBtra], { skipLocationChange: true });
    } else {
      swal('Ops...!', 'Esta vacante solo puede ser diseñada por el aprobador (' + this.aprobador + ').', 'error');
    }

  }
  openViewPostulados() {
    if (this.id != null) {
      this._Router.navigate(['/reclutamiento/postulados', this.id, this.folio, this.vBtra], { skipLocationChange: true });
    }
  }

  seguimientoRequi() {
    this._Router.navigate(['/reclutamiento/gestionVacante', this.id, this.folio, this.vBtra, this.clienteId, this.enProceso], { skipLocationChange: true });
  }

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

  popToast(type, title, body) {
    var toast: Toast = {
      type: type,
      title: title,
      timeout: 4000,
      body: body
    }
    this.toasterService.pop(toast);

  }


  // Mensaje de Error, en caso de que el damfo no cuente con horarios activos.
  //  swal('Ops...!', 'Este formato DAM-FO-290 no cuenta con horarios activos. No es posible generar la requisición', 'error');

}

