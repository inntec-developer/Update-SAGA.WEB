import { CandidatosService } from './../../../../../../service/Candidatos/candidatos.service';
import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { DatePipe } from '@angular/common';
import { DialogAssingRequiComponent } from '../dialogs/dialog-assing-requi/dialog-assing-requi.component';
import { DialogShowRequiComponent } from '../dialogs/dialog-show-requi/dialog-show-requi.component';
import { DlgRequisicionPausaComponent } from './../../../../../../components/dlg-requisicion-pausa/dlg-requisicion-pausa.component';
import { EditarRequiEstatusComponent } from './../../../../../../components/editar-requi-estatus/editar-requi-estatus.component';
import { ExcelService } from '../../../../../../service/ExcelService/excel.service';
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
  providers: [RequisicionesService, PostulateService, DatePipe, CandidatosService]
})
export class DtVacantesReclutadorComponent implements OnInit, AfterViewChecked {
  //scroll
  disabled = false;
  compact = false;
  invertX = false;
  invertY = false;
  shown = 'hover';


  public dataSource: Array<any> = [];
  public dataInfoRequi: Array<any> = [];
  // Varaibles del paginador
  public page: number = 1;
  public pageInfo: number = 1;
  public itemsPerPage: number = 20;
  public itemsPerPageInfo: number = 20;
  public maxSize: number = 5;
  public maxSizeInfo: number = 5;
  public numPages: number = 1;
  public numPagesInfo: number = 1;
  public length: number = 0;
  public lengthInfo: number = 0;

  showFilterRow: boolean = true;
  showFilterRowInfo: boolean = true;
  registros: number;
  registrosInfo: number;
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
  editarRequi = false;
  editarNR = false;
  informeVacante = false;
  usuarioId: any = sessionStorage.getItem('id');
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
  numeroVacantes: any;
  procesoCandidato: boolean = false;
  candidatosNR: any = [];
  requisPausa: any = [];


  constructor(
    private service: RequisicionesService,
    private postulateservice: PostulateService,
    private serviceCandidato: CandidatosService,
    private dialog: MatDialog,
    private _Router: Router,
    private spinner: NgxSpinnerService,
    private toasterService: ToasterService,
    private excelService: ExcelService,
    private pipe: DatePipe
  ) {
    this.enProceso = 0;
    this.postulados = 0;
  }

  ngOnInit() {
    this.spinner.show();
    this.getVacantes();
    this.GetCandidatosNR();
    this.GetRequisicionesPausa();

  }
  ngAfterViewChecked() {

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
     
     // this.getRequiEstadisticos()
    });
  }

  getRequiEstadisticos() {
    this.service.GetRequiEstadisticos(sessionStorage.getItem('id')).subscribe(data => {
    });
  }


  getInfoVacantes() {
    this.service.GetInformeRequisiciones(sessionStorage.getItem('id')).subscribe(data => {
      this.dataInfoRequi = data;
    });
  }

  GetCandidatosNR()
  {
    this.serviceCandidato.GetFoliosIncidencias(28).subscribe(result =>{
      this.candidatosNR = result;
      console.log(this.candidatosNR)
    })

  }

  GetRequisicionesPausa() {
    this.service.GetRequisicionesEstatus(39, this.usuarioId).subscribe(result => {

      this.requisPausa = result;
      console.log(this.requisPausa)
      // this.requis.forEach(element => {
      //   element.activar = false;
      // });

    })
  }

  //estatus vacantes
  SetStatus(estatusId, estatus) {
    var datos = { estatusId: estatusId, requisicionId: this.requi.id, ReclutadorId: sessionStorage.getItem('id') };

    if (estatusId == 39) {
      this.OpenDialogRequiPausa(estatusId, estatus);
    }
    else {
      this.postulateservice.SetProcesoVacante(datos).subscribe(data => {
        if (data == 201) {
          var idx = this.rows.findIndex(x => x.id == this.requi.id);
          this.rows[idx]['estatus'] = estatus;
          this.rows[idx]['estatusId'] = estatusId;
          this.ValidarEstatus(estatusId)
          this.onChangeTable(this.config);
          this.popToast('success', 'Estatus', 'Los datos se actualizaron con éxito');

        }
        else {
          this.popToast('error', 'Estatus', 'Ocurrió un error al intentar actualizar los datos');
        }
      })
    }
  }


  public rows: Array<any> = [];
  public rowsInfo: Array<any> = [];
  public columns: Array<any> = [
    { title: 'Folio', className: 'text-success text-center', name: 'folio', filtering: { filterString: '', placeholder: 'Folio' } },
    { title: 'Solicita', className: 'text-info text-center', name: 'solicita', filtering: { filterString: '', placeholder: 'Solicita' } },
    { title: 'Cliente', className: 'text-info text-center', name: 'cliente', filtering: { filterString: '', placeholder: 'Cliente' } },
    { title: 'Perfil', className: 'text-info text-center', name: 'vBtra', filtering: { filterString: '', placeholder: 'Perfil' } },
    { title: 'No. Vacantes', className: 'text-info text-center', name: 'vacantes', filtering: { filterString: '', placeholder: 'No. Vacantes' } },
    { title: 'Tipo Recl.', className: 'text-info text-center', name: 'tipoReclutamiento', filtering: { filterString: '', placeholder: 'Tipo' } },
    { title: 'Clase Recl.', className: 'text-info text-center', name: 'claseReclutamiento', filtering: { filterString: '', placeholder: 'Clase' } },
    // { title: 'Sueldo Mínimo', className: 'text-info text-center', name: 'sueldoMinimo', filtering: { filterString: '', placeholder: 'Sueldo Min' } },
    // { title: 'Sueldo Máximo', className: 'text-info text-center', name: 'sueldoMaximo', filtering: { filterString: '', placeholder: 'Sueldo Max' } },
    { title: 'Creación', className: 'text-info text-center', name: 'fch_Creacion', filtering: { filterString: '', placeholder: 'aaaa-mm-dd' } },
    { title: 'Fecha Cump.', className: 'text-info text-center', name: 'fch_Cumplimiento', filtering: { filterString: '', placeholder: 'aaaa-mm-dd' } },
    { title: 'Estatus', className: 'text-info text-center', name: 'estatus', filtering: { filterString: '', placeholder: 'Estatus' } },
    { title: 'Prioridad', className: 'text-info text-center', name: 'prioridad', filtering: { filterString: '', placeholder: 'Prioridad' } },
    { title: 'Postulados', className: 'text-info text-center', name: 'postulados', filtering: { filterString: '', placeholder: 'Postulados' } },
    { title: 'En Proceso', className: 'text-info text-center', name: 'enProceso', filtering: { filterString: '', placeholder: 'Proceso' } },
  ];

  public columnsInfo: Array<any> = [
    { title: 'FOLIO', className: 'text-success text-center', name: 'folio', filtering: { filterString: '', placeholder: 'FOLIO' } },
    { title: 'VACANTE', className: 'text-info text-center', name: 'vBtra', filtering: { filterString: '', placeholder: 'VACANTE' } },
    { title: 'CLIENTE', className: 'text-info text-center', name: 'cliente', filtering: { filterString: '', placeholder: 'CLIENTE' } },
    { title: 'FECHA LIMITE', className: 'text-info text-center', name: 'fch_limite', filtering: { filterString: '', placeholder: 'FECHA LIMITE' } },
    { title: 'ESTATUS', className: 'text-info text-center', name: 'estatus', filtering: { filterString: '', placeholder: 'ESTATUS' } },
    { title: '# VACANTES', className: 'text-info text-center', name: 'vacantes', filtering: { filterString: '', placeholder: '# VACANTES' } },
    { title: '% AVANCE', className: 'text-info text-center', name: 'porcentaje', filtering: { filterString: '', placeholder: '% AVANCE' } },
    { title: 'POSTULADOS', className: 'text-info text-center', name: 'postulados', filtering: { filterString: '', placeholder: 'POSTULADOS' } },
    { title: 'ENTREVISTADOS', className: 'text-info text-center', name: 'entrevista', filtering: { filterString: '', placeholder: 'ENTREVISTADOS' } },
    { title: 'ABANDONÓ PROCESO', className: 'text-info text-center', name: 'abandono', filtering: { filterString: '', placeholder: 'ABANDONÓ PROCESO' } },
    { title: 'DESCARTADOS', className: 'text-info text-center', name: 'descartados', filtering: { filterString: '', placeholder: 'DESCARTADOS' } },
    { title: 'ENVIADO CLIENTE', className: 'text-info text-center', name: 'enviados', filtering: { filterString: '', placeholder: 'ENVIADO CLIENTE' } },
    { title: 'RECHAZADOS', className: 'text-info text-center', name: 'rechazados', filtering: { filterString: '', placeholder: 'RECHAZADOS' } },
    { title: 'CONTRATADOS', className: 'text-info text-center', name: 'contratados', filtering: { filterString: '', placeholder: 'CONTRATADOS' } }
  ];

  public config: any = {
    paging: true,
    //sorting: { columns: this.columns },
    filtering: { filterString: '' },
    className: ['table-hover mb-0 ']
  };

  // public configInfo: any = {
  //   paging: true,
  //   //sorting: { columns: this.columns },
  //   filtering: { filterString: '' },
  //   className: ['table-hover mb-0 ']
  // };

  public changePage(page: any, data: Array<any> = this.dataSource): Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changePageInfo(page: any, data: Array<any> = this.dataInfoRequi): Array<any> {
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

  public changeFilterInfo(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columnsInfo.forEach((column: any) => {
      this.clearFilter = true;
      if (column.filtering) {
        // this.showFilterRowInfo = true;
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
    this.registros = this.rows.length;
    this.length = sortedData.length;
    setTimeout(() => {
      this.spinner.hide();
    }, 500);


  }

  public onChangeTableInfo(config: any, page: any = { page: this.pageInfo, itemsPerPage: this.itemsPerPageInfo }): any {
    if (config.filtering) {
      (<any>Object).assign(this.config.filtering, config.filtering);
    }

    // if (config.sorting) {
    //   (<any>Object).assign(this.config.sorting, config.sorting);
    // }

    this.registrosInfo = this.dataInfoRequi.length;
    this.rowsInfo = this.dataInfoRequi;
    let filteredData = this.changeFilterInfo(this.dataInfoRequi, this.config);
    //let sortedData = this.changeSort(filteredData, this.config);
    this.rowsInfo = page && config.paging ? this.changePageInfo(page, filteredData) : filteredData;
    this.lengthInfo = filteredData.length;
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

  public refreshTableInfo() {
    this.getInfoVacantes();
    setTimeout(() => {
      this.columnsInfo.forEach(element => {
        element.filtering.filterString = '';
        (<HTMLInputElement>document.getElementById(element.name)).value = '';
      });
      let page: any = { page: 1, itemsPerPage: this.itemsPerPageInfo }
      this.onChangeTableInfo(this.config, page);
    }, 400);
  }

  public clearfilters() {
    this.clearFilter = false;
    // (<HTMLInputElement>document.getElementById('filterInput')).value = '';
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
    this.element = data;
    this.vBtra = data.vBtra;
    this.id = data.id;
    this.folio = data.folio;
    this.postulados = data.postulados;
    this.numeroVacantes = data.vacantes;
    this.enProceso = data.enProceso;
    this.clienteId = data.clienteId;
    this.aprobador = data.aprobador;
    this.confidencial = data.confidencial
    this.ValidarEstatus(this.estatusId)

    if (this.enProceso > 0) {
      this.pds = false;
    } else {
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
    //revisar en pausa

    if (estatusId == 4 && this.element.vacantes > 0) //nueva
    {
      this.bc = true; //busqueda candidato
      this.sc = true; //socieconomico
      this.ecc = true; //envío candidato cliente
      this.ec = true; //espera contratacion
      this.nbc = true; //nueva busqueda candidato
      this.pausa = true;
      this.asignar = false;
      this.disenador = true;
    }
    else if (estatusId == 6 && this.element.vacantes > 0 && this.element.confidencial)// aprobada
    {
      this.bc = false; //busqueda candidato
      this.sc = true; //socieconomico
      this.ecc = true; //envío candidato cliente
      this.ec = true; //espera contratacion
      this.nbc = true; //nueva busqueda candidato
      this.pausa = true;
      this.asignar = false;
      this.disenador = true;
    }
    else if (estatusId == 6 && this.element.vacantes > 0)// aprobada
    {
      this.bc = true; //busqueda candidato
      this.sc = true; //socieconomico
      this.ecc = true; //envío candidato cliente
      this.ec = true; //espera contratacion
      this.nbc = true; //nueva busqueda candidato
      this.pausa = true;
      this.asignar = false;
      this.disenador = false;
    }
    else if (estatusId == 7 && this.element.vacantes > 0 && this.element.enProceso == 0)// publicada
    {
      this.bc = false; //busqueda candidato
      this.sc = true; //socieconomico
      this.ecc = true; //envío candidato cliente
      this.ec = true; //espera contratacion
      this.nbc = true; //nueva busqueda candidato
      this.pausa = false;
      this.asignar = false;
      this.disenador = true;
    }
    else if (estatusId == 7 && this.element.vacantes > 0 && this.element.enProceso > 0 && this.element.enProcesoFC == 0 && this.element.enProcesoFR == 0)// publicada
    {
      this.bc = false; //busqueda candidato
      this.sc = true; //socieconomico
      this.ecc = true; //envío candidato cliente
      this.ec = true; //espera contratacion
      this.nbc = true; //nueva busqueda candidato
      this.pausa = false;
      this.asignar = false;
      this.disenador = true;
    }
    else if (estatusId == 7 && this.element.vacantes > 0 && this.element.enProcesoFC == 0 && this.element.enProcesoFR > 0)// publicada
    {
      this.bc = true; //busqueda candidato
      this.sc = true; //socieconomico
      this.ecc = false; //envío candidato cliente
      this.ec = true; //espera contratacion
      this.nbc = true; //nueva busqueda candidato
      this.pausa = false;
      this.asignar = false;
      this.disenador = true;
    }
    else if (estatusId == 7 && this.element.vacantes > 0 && this.element.enProcesoFC > 0)// publicada
    {
      this.bc = true; //busqueda candidato
      this.sc = false; //socieconomico
      this.ecc = true; //envío candidato cliente
      this.ec = false; //espera contratacion
      this.nbc = true; //nueva busqueda candidato
      this.pausa = true;
      this.asignar = false;
      this.disenador = true;
    }
    else if (estatusId == 29 && this.element.vacantes > 0 && this.element.enProcesoFC == 0 && this.element.enProcesoFR == 0 && this.element.enProceso == 0) //busqueda de candidatos
    {
      this.bc = true; //busqueda candidato
      this.sc = true; //socieconomico
      this.ecc = true; //envío candidato cliente
      this.ec = true; //espera contratacion
      this.nbc = true; //nueva busqueda candidato
      this.pausa = false;
      this.asignar = false;
      this.disenador = true;
    }
    else if (estatusId == 29 && this.element.vacantes > 0 && this.element.enProcesoFC == 0 && this.element.enProcesoFR == 0 && this.element.enProceso > 0) // busqueda de candidatos
    {
      this.bc = true; //busqueda candidato
      this.sc = true; //socieconomico
      this.ecc = true; //envío candidato cliente
      this.ec = true; //espera contratacion
      this.nbc = true; //nueva busqueda candidato
      this.pausa = false;
      this.asignar = false;
      this.disenador = true;
    }
    else if (estatusId == 29 && this.element.vacantes > 0 && this.element.enProcesoFC > 0)// busqueda de candidatos
    {
      this.bc = true; //busqueda candidato
      this.sc = false; //socieconomico
      this.ecc = true; //envío candidato cliente
      this.ec = false; //espera contratacion
      this.nbc = true; //nueva busqueda candidato
      this.pausa = true;
      this.asignar = false;
      this.disenador = true;
    }
    else if (estatusId == 29 && this.element.vacantes > 0 && this.element.enProcesoFR > 0) //busqueda de candidatos
    {
      this.bc = true; //busqueda candidato
      this.sc = true; //socieconomico
      this.ecc = false; //envío candidato cliente
      this.ec = true; //espera contratacion
      this.nbc = true; //nueva busqueda candidato
      this.pausa = false;
      this.asignar = false;
      this.disenador = true;
    }
    else if (estatusId == 38 && this.element.vacantes > 0) //garantia de busqueda
    {
      this.bc = true; //busqueda candidato
      this.sc = true; //socieconomico
      this.ecc = true; //envío candidato cliente
      this.ec = true; //espera contratacion
      this.nbc = false; //nueva busqueda candidato
      this.pausa = true;
      this.asignar = false;
      this.disenador = true;
    }
    else if (estatusId == 39 && this.element.vacantes > 0) //pausada
    {
      this.bc = true; //busqueda candidato
      this.sc = true; //socieconomico
      this.ecc = true; //envío candidato cliente
      this.ec = true; //espera contratacion
      this.nbc = true; //nueva busqueda candidato
      this.pausa = true;
      this.asignar = true;
      this.disenador = true;
    }
    else if ((estatusId == 5 || estatusId == 31) &&
      this.element.vacantes > 0 && this.element.enProceso == 0 && this.element.enProcesoFC == 0 && this.element.enProcesoFR == 0) //reactivada  - garantia de busqueda - nueva busqueda
    {
      this.bc = true; //busqueda candidato
      this.sc = true; //socieconomico
      this.ecc = true; //envío candidato cliente
      this.ec = true; //espera contratacion
      this.nbc = true; //nueva busqueda candidato
      this.pausa = true;
      this.asignar = true;
      this.disenador = true;
    }
    else if ((estatusId == 5 || estatusId == 31) && this.element.vacantes > 0 && this.element.enProcesoFC == 0 && this.element.enProcesoFR == 0 && this.element.enProceso > 0) //reactivada   - garantia de busqueda - nueva busqueda -pausada
    {
      this.bc = true; //busqueda candidato
      this.sc = true; //socieconomico
      this.ecc = true; //envío candidato cliente
      this.ec = true; //espera contratacion
      this.nbc = true; //nueva busqueda candidato
      this.pausa = true;
      this.asignar = true;
      this.disenador = true;
    }

    else if ((estatusId == 5 || estatusId == 31) && this.element.vacantes > 0 && this.element.enProcesoFR > 0) //reactivada - publicada  - garantia de busqueda - nueva busqueda -pausada
    {
      this.bc = true; //busqueda candidato
      this.sc = true; //socieconomico
      this.ecc = false; //envío candidato cliente
      this.ec = true; //espera contratacion
      this.nbc = true; //nueva busqueda candidato
      this.pausa = true;
      this.asignar = true;
      this.disenador = true;
    }
    else if ((estatusId == 5 || estatusId == 31) && this.element.vacantes > 0 && this.element.contratados == this.element.vacantes) //reactivada - publicada - garantia de busqueda - nueva busqueda - pausada
    {
      this.bc = true; //busqueda candidato
      this.sc = true; //socieconomico
      this.ecc = true; //envío candidato cliente
      this.ec = true; //espera contratacion
      this.nbc = true; //nueva busqueda candidato
      this.pausa = true;
      this.asignar = true;
      this.disenador = true;
    }
    else if (estatusId == 30 && this.element.enProcesoFC == 0) //envio al cliente
    {
      this.bc = true; //busqueda candidato
      this.sc = true; //socieconomico
      this.ecc = true; //envío candidato cliente
      this.ec = true; //espera contratacion
      this.nbc = false; //nueva busqueda candidato
      this.pausa = false;
      this.asignar = false;
      this.disenador = true;
    }
    else if (estatusId == 30 && this.element.enProcesoFC > 0) //envio al cliente
    {
      this.bc = true; //busqueda candidato
      this.sc = false; //socieconomico
      this.ecc = true; //envío candidato cliente
      this.ec = false; //espera contratacion
      this.nbc = true; //nueva busqueda candidato
      this.pausa = false;
      this.asignar = false;
      this.disenador = true;
    }
    else if (estatusId == 32 && this.element.enProcesoFC > 0) //socioeconomico
    {
      this.bc = true; //busqueda candidato
      this.sc = true; //socieconomico
      this.ecc = true; //envío candidato cliente
      this.ec = false; //espera contratacion
      this.nbc = true; //nueva busqueda candidato
      this.pausa = true;
      this.asignar = false;
      this.disenador = true;
    }
    else if (estatusId == 32 && this.enProceso > 0 && this.element.contratados > 0 && this.element.contratados < this.element.vacantes) //socioeconomico
    {
      this.bc = true; //busqueda candidato
      this.sc = true; //socieconomico
      this.ecc = true; //envío candidato cliente
      this.ec = false; //espera contratacion
      this.nbc = false; //nueva busqueda candidato
      this.pausa = true;
      this.asignar = false;
      this.disenador = true;
    }
    else if (estatusId == 33 && this.element.contratados == 0) //espera de contratacion
    {
      this.bc = true; //busqueda candidato
      this.sc = false; //socieconomico
      this.ecc = true; //envío candidato cliente
      this.ec = true; //espera contratacion
      this.nbc = false; //nueva busqueda candidato
      this.pausa = true;
      this.asignar = false;
      this.disenador = true;
    }
    else if (estatusId == 33 && this.element.contratados > 0 && this.element.contratados < this.element.vacantes) //espera de contratacion
    {
      this.bc = true; //busqueda candidato
      this.sc = false; //socieconomico
      this.ecc = true; //envío candidato cliente
      this.ec = true; //espera contratacion
      this.nbc = false; //nueva busqueda candidato
      this.pausa = true;
      this.asignar = false;
      this.disenador = true;
    }
    else if (estatusId >= 34 && estatusId <= 37) { //cubierta
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
    else if (this.element.vacantes == 0) {
      this.bc = true; //busqueda candidato
      this.sc = true; //socieconomico
      this.ecc = true; //envío candidato cliente
      this.ec = true; //espera contratacion
      this.nbc = true; //nueva busqueda candidato
      this.pausa = true;
      this.asignar = true;
      this.disenador = true;
    }
    else {
      this.bc = true; //busqueda candidato
      this.sc = true; //socieconomico
      this.ecc = true; //envío candidato cliente
      this.ec = true; //espera contratacion
      this.nbc = true; //nueva busqueda candidato
      this.pausa = true;
      this.asignar = false;
      this.disenador = true;

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
      if (result) {
        this.refreshTable();
      }
    });
  }
  openDialogAssingRequi() {
    let dialogAssing = this.dialog.open(DialogAssingRequiComponent, {
      data: this.element
    });
    dialogAssing.afterClosed().subscribe(result => {
      if (result) {
        this.refreshTable();
      }
    });
  }

  OpenDialogRequiPausa(estatusId, estatus) {
    var aux = { requisicionId: this.requi.id, folio: this.requi.folio, cliente: this.requi.vacante, vacante: this.vBtra }
    let dialog = this.dialog.open(DlgRequisicionPausaComponent, {
      width: '50%',
      height: 'auto',
      data: aux
    });
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.postulateservice.SetProcesoVacante({ estatusId: estatusId, requisicionId: this.requi.id, ReclutadorId: sessionStorage.getItem('id') }).subscribe(data => {
          if (data == 201) {
            var idx = this.rows.findIndex(x => x.id == this.requi.id);
            this.rows[idx]['estatus'] = estatus;
            this.rows[idx]['estatusId'] = estatusId;
            this.ValidarEstatus(estatusId)
            this.onChangeTable(this.config);

            this.popToast('success', 'Estatus', 'Los datos se actualizaron con éxito');

          }
          else {
            this.popToast('error', 'Estatus', 'Ocurrió un error al intentar actualizar los datos');
          }
        });
      }
    })


  }

  closeModal(flag) {

    if (flag == 1) {
      this.informeVacante = false;
      this.pageInfo = 1;
      this.itemsPerPage = 20;

      let page: any = { page: 1, itemsPerPage: this.itemsPerPageInfo }
      this.onChangeTableInfo(this.config, page)
    }
    else {
      this.editarRequi = false;
      this.editarNR = false;
      this.GetCandidatosNR();
      this.refreshTable();
    }

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

    if (this.numeroVacantes != 0 && sessionStorage.getItem('tipoUsuario') == '4')
    {
      this.procesoCandidato = true;
    }
    else if(this.numeroVacantes != 0 ){
      this._Router.navigate(['/reclutamiento/gestionVacante', this.id, this.folio, this.vBtra, this.clienteId, this.enProceso, this.estatusId], { skipLocationChange: true });
    } else {
      swal('Ops...!', 'Esta vacante no cuenta con posiciones disponibles esta en 0, cambie el número de vacantes disponibles.', 'error');
    }

  }

  exportAsXLSX() {

    if (this.dataSource.length > 0) {
      var aux = [];
      var comentarios = "";
      this.dataSource.forEach(row => {
        if (row.comentarioReclutador.length > 0) {
          row.comentarioReclutador.forEach(element => {
            comentarios = comentarios +
              element + '\n'
          });
        }
        else {
          comentarios = "";
        }
        var d = this.pipe.transform(new Date(row.fch_Creacion), 'yyyy-MM-dd');
        // var mocos = (d.getFullYear() + '-' + (d.getMonth()) + '-' + d.getDate()).toString()
        var e = this.pipe.transform(new Date(row.fch_Modificacion), 'yyyy-MM-dd');

        aux.push({
          FOLIO: row.folio.toString(),
          'FECHA SOLICITUD': d,//new Date(d.getFullYear() + '-' + (d.getMonth()) + '-' + d.getDate()).toString(),
          SOLICITANTE: row.solicita,
          EMPRESA: row.cliente,
          SUCURSAL: row.sucursal,
          NO: row.vacantes,
          PUESTO: row.vBtra,
          SUELDO: row.sueldoMinimo.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
          ESTATUS: row.estatus,
          'FECHA ESTATUS': e,
          RECLUTADOR: row.reclutador,
          'COMENTARIOS': comentarios
        })
        comentarios = "";
      });

      //   })
      // })
      this.excelService.exportAsExcelFile(aux, 'Solicitud_de_reporte_para_generar_estadisticos');
      this.refreshTable();
    }
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
