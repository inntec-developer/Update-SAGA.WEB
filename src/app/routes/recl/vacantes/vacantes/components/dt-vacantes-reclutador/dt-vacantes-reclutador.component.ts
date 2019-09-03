import { debug } from 'util';
import { AfterViewChecked, Component, EventEmitter, OnInit, Output, ElementRef, ViewChild } from '@angular/core';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { CandidatosService } from './../../../../../../service/Candidatos/candidatos.service';
import { DatePipe } from '@angular/common';
import { DialogAssingRequiComponent } from '../dialogs/dialog-assing-requi/dialog-assing-requi.component';
import { DlgRegistroMasivoComponent } from './../../../../../../components/dlg-registro-masivo/dlg-registro-masivo.component';
import { DlgRequisicionPausaComponent } from './../../../../../../components/dlg-requisicion-pausa/dlg-requisicion-pausa.component';
import { DlgTransferComponent } from '../../../../../vtas/requisiciones/components/dlg-transfer/dlg-transfer.component';
import { ExcelService } from '../../../../../../service/ExcelService/excel.service';
import { MatDialog } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { PostulateService } from './../../../../../../service/SeguimientoVacante/postulate.service';
import { RequisicionesService } from '../../../../../../service';
import { Router } from '@angular/router';
import { SettingsService } from '../../../../../../core/settings/settings.service';
import * as jspdf from 'jspdf';
import * as html2canvas from 'html2canvas';

const swal = require('sweetalert');

@Component({
  selector: 'app-dt-vacantes-reclutador',
  templateUrl: './dt-vacantes-reclutador.component.html',
  styleUrls: ['./dt-vacantes-reclutador.component.scss'],
  providers: [RequisicionesService, PostulateService, DatePipe, CandidatosService]

})
export class DtVacantesReclutadorComponent implements OnInit {
  @Output('Imprimir') EmImprimir: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('content') el: ElementRef;

  public imprimir: boolean;

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

  // scroll
  public disabled = false;
  public invertX = false;
  public compact = false;
  public invertY = false;
  public shown = 'hover';


  public dataSource: Array<any> = [];
  // Varaibles del paginador
  public page = 1;
  public itemsPerPage = 20;
  public maxSize = 5;
  public numPages = 1;
  public length = 0;

  showFilterRow = true;
  registros: number;
  errorMessage: any;
  element: any = [];
  confidencial = true;

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
  historial = false;
  usuarioId: any = this.settings.user['id'];
  // estatus vacantes

  bc = true; // busqueda candidato
  sc = true; // socieconomico
  ecc = true; // envío candidato cliente
  ec = true; // espera contratacion
  nbc = true; // nueva busqueda candidato
  pausa = true;
  asignar = true;
  disenador = true;
  aprobador: any;
  coordinador: any;

  rowAux = [];
  selected = false;
  clearFilter = false;
  pds = true;
  numeroVacantes: any;
  procesoCandidato = false;
  candidatosNR: any = [];
  requisPausa: any = [];
  totalPos: any = 0;
  totalContratados = 0;

  // checkBox Seccion de impresion
  SelectiedSection = {
    Encabezado: true,
    Horarios: true,
    Cliente: true,
    ExpApt: true,
    Direccion: true,
    Beneficio: true,
    ActObsProd: true,
    Telefono: true,
    Contacto: true,
    DocPrest: true,
    Psicom: true,
    Competencia: true,
  };
  labelPosition = 'before';
  Encabezado = true;
  Horarios = true;
  Cliente = true;
  ExpApt = true;
  Direccion = true;
  Beneficio = true;
  ActObsProd = true;
  Telefono = false;
  Contacto = false;
  DocPrest = false;
  Psicom = false;
  Competencia = false;

  public rows: Array<any> = [];
  public columns: Array<any> = [
    { title: 'Folio', className: 'text-success text-center', name: 'folio', filtering: { filterString: '', placeholder: 'Folio' } },
    { title: 'Solicitante', className: 'text-info text-center', name: 'solicita', filtering: { filterString: '', placeholder: 'Solicitante' } },
    { title: 'Cliente', className: 'text-info text-center', name: 'cliente', filtering: { filterString: '', placeholder: 'Cliente' } },
    { title: 'Perfil', className: 'text-info text-center', name: 'vBtra', filtering: { filterString: '', placeholder: 'Perfil' } },
    { title: 'Cub/Vac', className: 'text-info text-center', name: 'vacantes', filtering: { filterString: '', placeholder: 'No.' } },
    { title: 'Coordinación', className: 'text-info text-center', name: 'claseReclutamiento', filtering: { filterString: '', placeholder: 'Coordinación' } },
    // { title: 'Sueldo Mínimo', className: 'text-info text-center', name: 'sueldoMinimo', filtering: { filterString: '', placeholder: 'Sueldo Min' } },
    // { title: 'Sueldo Máximo', className: 'text-info text-center', name: 'sueldoMaximo', filtering: { filterString: '', placeholder: 'Sueldo Max' } },
    { title: 'Días Transc.', className: 'text-info text-center', name: 'diasTrans', filtering: { filterString: '', placeholder: 'Días' } },
    { title: 'Rango sueldo', className: 'text-info text-center', name: 'rango', filtering: { filterString: '', placeholder: 'Rango sueldo' } },
    { title: 'Estatus', className: 'text-info text-center', name: 'estatus', filtering: { filterString: '', placeholder: 'Estatus' } },
    { title: 'Coordinador', className: 'text-info text-center', name: 'coordinador', filtering: { filterString: '', placeholder: 'Coordinador', columnName: 'reclutadores' } },
    { title: 'Reclutador', className: 'text-info text-center', name: 'reclutadores', filtering: { filterString: '', placeholder: 'Reclutador', columnName: 'reclutadores' } },
    { title: 'Postulados', className: 'text-info text-center', name: 'postulados', filtering: { filterString: '', placeholder: 'Postulados' } },
    { title: 'En Proceso', className: 'text-info text-center', name: 'enProceso', filtering: { filterString: '', placeholder: 'Proceso' } },
  ];

  public config: any = {
    paging: true,
    filtering: { filterString: '' },
    className: ['table-hover mb-0 ']
  };
  constructor(
    private service: RequisicionesService,
    private postulateservice: PostulateService,
    private serviceCandidato: CandidatosService,
    private dialog: MatDialog,
    private _Router: Router,
    private spinner: NgxSpinnerService,
    private toasterService: ToasterService,
    private excelService: ExcelService,
    private pipe: DatePipe,
    private settings: SettingsService
  ) {
    this.enProceso = 0;
    this.postulados = 0;
  }

  ngOnInit() {
    this.spinner.show();
    this.getVacantes();
    // this.GetCandidatosNR();
    // this.GetRequisicionesPausa();
    // setTimeout(() => {
    //     this.spinner.hide();
    //    }, 3000);
  }

  getVacantes() {
    this.service.getRequiReclutador(this.settings.user['id']).subscribe(data => {
      if (data !== 404) {
        this.dataSource = data;
        const n = new Date;
        this.totalPos = 0;
        this.totalContratados = 0;
        this.dataSource.forEach(r => {
          r.rango = r.sueldoMinimo + '-' + r.sueldoMaximo;
          const daux = new Date(r.fch_Creacion);
          let diasTrans = 0;
          while (daux <= n) {
            if (daux.getDay() > 0 && daux.getDay() < 6) {
              diasTrans += 1;
            }
            daux.setDate(daux.getDate() + 1);
          }
          r.diasTrans = diasTrans;
          this.totalPos += r.vacantes;
          this.totalContratados += r.contratados;
        });
        this.GetCandidatosNR();
        this.GetRequisicionesPausa();

        this.onChangeTable(this.config);
        this.spinner.hide();
      } else {
        this.popToast('error', 'Vacantes', 'Algo salió mal al intentar recuperar la información de las vacantes, intente de nuevo.');
        this.spinner.hide();
      }
    });
}

  getRequiEstadisticos() {
    this.service.GetRequiEstadisticos(this.settings.user['id']).subscribe(data => {
    });
  }

  GetCandidatosNR() {
    this.serviceCandidato.GetFoliosIncidencias(28, this.settings.user['id']).subscribe(result => {
      this.candidatosNR = result;
    });

  }

  GetRequisicionesPausa() {
    this.service.GetRequisicionesEstatus(39, this.settings.user['id']).subscribe(result => {
      this.requisPausa = result;
    });
  }

  //estatus vacantes
  SetStatus(estatusId, estatus) {
    var datos = { estatusId: estatusId, requisicionId: this.requi.id, ReclutadorId: this.settings.user['id'] };

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




  //#region paginador


  public changePage(page: any, data: Array<any> = this.dataSource): Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }
  public changeFilter(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columns.forEach((column: any) => {
      this.clearFilter = true;
      if (column.filtering.filterString != '') {
        filteredData = filteredData.filter((item: any) => {
          if (item[column.name] != null) {
            if (!Array.isArray(item[column.name])) {
              return item[column.name].toString().toLowerCase().match(column.filtering.filterString.toLowerCase());
            } else {
              let aux = [];
              // if(column.filtering.columnName)
              // {
              //   aux = item[column.filtering.columnName];
              // }
              // else
              // {
              aux = item[column.name];
              // }
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
              }
              else {
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

  //#endregion

  public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
    if (config.filtering) {
      (<any>Object).assign(this.config.filtering, config.filtering);
    }

    this.rows = this.dataSource;
    const filteredData = this.changeFilter(this.dataSource, this.config);

    this.rows = page && config.paging ? this.changePage(page, filteredData) : filteredData;
    this.registros = this.rows.length;
    this.length = filteredData.length;
    setTimeout(() => {
      this.spinner.hide();
    }, 700);


  }

  public refreshTable() {
    this.spinner.show();
    this.getVacantes();

    setTimeout(() => {
      this.columns.forEach(element => {
        element.filtering.filterString = '';
        (<HTMLInputElement>document.getElementById(element.name)).value = '';
      });

      this._reinciar();
      this.spinner.hide();
    }, 1000);
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
    this.aprobador = data.aprobadorId || null;
    this.coordinador = data.coordinador || null;
    this.confidencial = data.confidencial;
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
      this.ValidarEstatus(9999)
      this._reinciar();
      this.selected = false;
    } else {
      this.selected = true;
    }

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

  private _reinciar() {
    this.element = [];
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
    this.page = 1;
  }

  ValidarEstatus(estatusId) {
    //revisar en pausa

    if (this.element.aprobada == 1 && this.element.aprobadorId == this.settings.user['id'] && this.element.contratados == 0 && (estatusId != 39 && estatusId != 34 && estatusId != 35 && estatusId != 36 && estatusId != 37) && this.element.vacantes > 0) {
      this.asignar = false
      this.disenador = false
    }
    else if (this.element.aprobada == 0 && this.element.contratados == 0 && (estatusId != 39 && estatusId != 34 && estatusId != 35 && estatusId != 36 && estatusId != 37) && this.element.vacantes > 0) {
      this.asignar = false
      this.disenador = false;
    }
    else {
      this.asignar = true;
      this.disenador = true;
    }

    // estatusId == 6 && this.element.propietarioId == this.settings.user['id'] && this.element.vacantes > 0 ? this.disenador = false : this.disenador = true;

    if (estatusId == 4 && this.element.vacantes > 0) //nueva
    {
      this.bc = true; //busqueda candidato
      this.sc = true; //socieconomico
      this.ecc = true; //envío candidato cliente
      this.ec = true; //espera contratacion
      this.nbc = true; //nueva busqueda candidato
      this.pausa = true;
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
    }
    else if (estatusId == 6 && this.element.vacantes > 0)// aprobada
    {
      this.bc = false; //busqueda candidato
      this.sc = true; //socieconomico
      this.ecc = true; //envío candidato cliente
      this.ec = true; //espera contratacion
      this.nbc = true; //nueva busqueda candidato
      this.pausa = true;
    }
    else if (estatusId == 7 && this.element.vacantes > 0 && this.element.enProceso == 0)// publicada
    {
      this.bc = false; //busqueda candidato
      this.sc = true; //socieconomico
      this.ecc = true; //envío candidato cliente
      this.ec = true; //espera contratacion
      this.nbc = true; //nueva busqueda candidato
    }
    else if (estatusId == 7 && this.element.vacantes > 0 && this.element.enProceso > 0 && this.element.enProcesoFC == 0 && this.element.enProcesoFR == 0)// publicada
    {
      this.bc = false; //busqueda candidato
      this.sc = true; //socieconomico
      this.ecc = true; //envío candidato cliente
      this.ec = true; //espera contratacion
      this.nbc = true; //nueva busqueda candidato
      this.pausa = false;
    }
    else if (estatusId == 7 && this.element.vacantes > 0 && this.element.enProcesoFC == 0 && this.element.enProcesoFR > 0)// publicada
    {
      this.bc = true; //busqueda candidato
      this.sc = true; //socieconomico
      this.ecc = false; //envío candidato cliente
      this.ec = true; //espera contratacion
      this.nbc = true; //nueva busqueda candidato
      this.pausa = false;
    }
    else if (estatusId == 7 && this.element.vacantes > 0 && this.element.enProcesoFC > 0)// publicada
    {
      this.bc = true; //busqueda candidato
      this.sc = false; //socieconomico
      this.ecc = true; //envío candidato cliente
      this.ec = false; //espera contratacion
      this.nbc = true; //nueva busqueda candidato
      this.pausa = true;
    }
    else if (estatusId == 29 && this.element.vacantes > 0 && this.element.enProcesoFC == 0 && this.element.enProcesoFR == 0 && this.element.enProceso == 0) //busqueda de candidatos
    {
      this.bc = true; //busqueda candidato
      this.sc = true; //socieconomico
      this.ecc = true; //envío candidato cliente
      this.ec = true; //espera contratacion
      this.nbc = true; //nueva busqueda candidato
      this.pausa = false;
    }
    else if (estatusId == 29 && this.element.vacantes > 0 && this.element.enProcesoFC == 0 && this.element.enProcesoFR == 0 && this.element.enProceso > 0) // busqueda de candidatos
    {
      this.bc = true; //busqueda candidato
      this.sc = true; //socieconomico
      this.ecc = true; //envío candidato cliente
      this.ec = true; //espera contratacion
      this.nbc = true; //nueva busqueda candidato
      this.pausa = false;
    }
    else if (estatusId == 29 && this.element.vacantes > 0 && this.element.enProcesoFC > 0)// busqueda de candidatos
    {
      this.bc = true; //busqueda candidato
      this.sc = false; //socieconomico
      this.ecc = true; //envío candidato cliente
      this.ec = false; //espera contratacion
      this.nbc = true; //nueva busqueda candidato
      this.pausa = true;
    }
    else if (estatusId == 29 && this.element.vacantes > 0 && this.element.enProcesoFR > 0) //busqueda de candidatos
    {
      this.bc = true; //busqueda candidato
      this.sc = true; //socieconomico
      this.ecc = false; //envío candidato cliente
      this.ec = true; //espera contratacion
      this.nbc = true; //nueva busqueda candidato
      this.pausa = false;
    }
    else if (estatusId == 38 && this.element.vacantes > 0) //garantia de busqueda
    {
      this.bc = true; //busqueda candidato
      this.sc = true; //socieconomico
      this.ecc = true; //envío candidato cliente
      this.ec = true; //espera contratacion
      this.nbc = false; //nueva busqueda candidato
      this.pausa = true;
    }
    else if (estatusId == 39 && this.element.vacantes > 0) //pausada
    {
      this.bc = true; //busqueda candidato
      this.sc = true; //socieconomico
      this.ecc = true; //envío candidato cliente
      this.ec = true; //espera contratacion
      this.nbc = true; //nueva busqueda candidato
      this.pausa = true;
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
    }
    else if ((estatusId == 5 || estatusId == 31) && this.element.vacantes > 0 && this.element.enProcesoFC == 0 && this.element.enProcesoFR == 0 && this.element.enProceso > 0) //reactivada   - garantia de busqueda - nueva busqueda -pausada
    {
      this.bc = true; //busqueda candidato
      this.sc = true; //socieconomico
      this.ecc = true; //envío candidato cliente
      this.ec = true; //espera contratacion
      this.nbc = true; //nueva busqueda candidato
      this.pausa = true;
    }

    else if ((estatusId == 5 || estatusId == 31) && this.element.vacantes > 0 && this.element.enProcesoFR > 0) //reactivada - publicada  - garantia de busqueda - nueva busqueda -pausada
    {
      this.bc = true; //busqueda candidato
      this.sc = true; //socieconomico
      this.ecc = false; //envío candidato cliente
      this.ec = true; //espera contratacion
      this.nbc = true; //nueva busqueda candidato
      this.pausa = true;
    }
    else if ((estatusId == 5 || estatusId == 31) && this.element.vacantes > 0 && this.element.contratados == this.element.vacantes) //reactivada - publicada - garantia de busqueda - nueva busqueda - pausada
    {
      this.bc = true; //busqueda candidato
      this.sc = true; //socieconomico
      this.ecc = true; //envío candidato cliente
      this.ec = true; //espera contratacion
      this.nbc = true; //nueva busqueda candidato
      this.pausa = true;
    }
    else if (estatusId == 30 && this.element.enProcesoFC == 0) //envio al cliente
    {
      this.bc = true; //busqueda candidato
      this.sc = true; //socieconomico
      this.ecc = true; //envío candidato cliente
      this.ec = true; //espera contratacion
      this.nbc = false; //nueva busqueda candidato
      this.pausa = false;
    }
    else if (estatusId == 30 && this.element.enProcesoFC > 0) //envio al cliente
    {
      this.bc = true; //busqueda candidato
      this.sc = false; //socieconomico
      this.ecc = true; //envío candidato cliente
      this.ec = false; //espera contratacion
      this.nbc = true; //nueva busqueda candidato
      this.pausa = false;
    }
    else if (estatusId == 32 && this.element.enProcesoFC > 0) //socioeconomico
    {
      this.bc = true; //busqueda candidato
      this.sc = true; //socieconomico
      this.ecc = true; //envío candidato cliente
      this.ec = false; //espera contratacion
      this.nbc = true; //nueva busqueda candidato
      this.pausa = true;
    }
    else if (estatusId == 32 && this.enProceso > 0 && this.element.contratados > 0 && this.element.contratados < this.element.vacantes) //socioeconomico
    {
      this.bc = true; //busqueda candidato
      this.sc = true; //socieconomico
      this.ecc = true; //envío candidato cliente
      this.ec = false; //espera contratacion
      this.nbc = false; //nueva busqueda candidato
      this.pausa = true;
    }
    else if (estatusId == 33 && this.element.contratados == 0) //espera de contratacion
    {
      this.bc = true; //busqueda candidato
      this.sc = false; //socieconomico
      this.ecc = true; //envío candidato cliente
      this.ec = true; //espera contratacion
      this.nbc = false; //nueva busqueda candidato
      this.pausa = true;
    }
    else if (estatusId == 33 && this.element.contratados > 0 && this.element.contratados < this.element.vacantes) //espera de contratacion
    {
      this.bc = true; //busqueda candidato
      this.sc = false; //socieconomico
      this.ecc = true; //envío candidato cliente
      this.ec = true; //espera contratacion
      this.nbc = false; //nueva busqueda candidato
      this.pausa = true;
    }
    else if (estatusId >= 34 && estatusId <= 37) { //cubierta
      /*estatus vacante */
      this.bc = true; //busqueda candidato
      this.sc = true; //socieconomico
      this.ecc = true; //envío candidato cliente
      this.ec = true; //espera contratacion
      this.nbc = true; //nueva busqueda candidato
      this.pausa = true;
    }
    else if (this.element.vacantes == 0) {
      this.bc = true; //busqueda candidato
      this.sc = true; //socieconomico
      this.ecc = true; //envío candidato cliente
      this.ec = true; //espera contratacion
      this.nbc = true; //nueva busqueda candidato
      this.pausa = true;
    }
    else {
      this.bc = true; //busqueda candidato
      this.sc = true; //socieconomico
      this.ecc = true; //envío candidato cliente
      this.ec = true; //espera contratacion
      this.nbc = true; //nueva busqueda candidato
      this.pausa = true;
      this.disenador = true;

    }
  }

  /*
   * Funciones para la administracion de las requisiciones.
   * */
  // openDialogShowRequi() {
  //   let dialogShow = this.dialog.open(DialogShowRequiComponent, {
  //     width: '200%',
  //     height: '100%',
  //     data: this.requi
  //   });
  //   dialogShow.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.refreshTable();
  //     }
  //   });
  // }

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

  openDialogTransfer() {
    this.element.usuario = 4;
    this.element.depto = 'Recl';
    let dialogCnc = this.dialog.open(DlgTransferComponent, {
      width: '50%',
      height: '95%',
      data: this.element
    });
    dialogCnc.afterClosed().subscribe(result => {
      if (result) {
        this.refreshTable();
      }
    })
  }

  OpenDialogRequiPausa(estatusId: any, estatus: any) {
    var aux = { requisicionId: this.requi.id, folio: this.requi.folio, cliente: this.requi.vacante, vacante: this.vBtra }
    let dialog = this.dialog.open(DlgRequisicionPausaComponent, {
      width: '50%',
      height: 'auto',
      data: aux
    });
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.postulateservice.SetProcesoVacante({ estatusId: estatusId, requisicionId: this.requi.id, ReclutadorId: this.settings.user['id'] }).subscribe(data => {
          if (data == 201) {
            var idx = this.rows.findIndex(x => x.id == this.requi.id);
            this.rows[idx]['estatus'] = estatus;
            this.rows[idx]['estatusId'] = estatusId;
            this.ValidarEstatus(estatusId);
            this.GetRequisicionesPausa();
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

  openDialogRegistro() {
    let dialogDlt = this.dialog.open(DlgRegistroMasivoComponent, {
      width: '95%',
      height: '95%',
      data: { requisicionId: this.requi.id, folio: this.requi.folio, cliente: this.element.cliente, vacante: this.vBtra, nv: this.element.vacantes, contratados: this.element.contratados },
      disableClose: true

    });

    dialogDlt.afterClosed().subscribe(result => {
      if (result == 0) {
        this.onChangeTable(this.config);
      }
      else if (result == 417) {
        this.popToast('error', 'Registro Masivo', 'Ocurrió un error al intentar registrar candidato');
      }
      else {
        swal({
          title: 'Registro Masivo de Candidatos',
          text: '¡Se registraron (' + result.length.toString() + ') candidatos con estatus cubierto para la vacante de ' + this.vBtra + '. ¿Desea enviar notificación a los candidatos registrados?. Esto puede tardar varios minutos',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#21a240',
          confirmButtonText: '¡Si, enviar notificación!',
          cancelButtonText: '¡No, cancelar!',
          closeOnConfirm: true,
          closeOnCancel: true
        }, (isConfirm) => {
          window.onkeydown = null;
          window.onfocus = null;
          if (isConfirm) {

            this.spinner.show();

            this.postulateservice.SendEmailContratados(result).subscribe(data => {
              this.spinner.hide();
              this.refreshTable();
            });
          }
          else {
            this.spinner.hide();
            swal('Cancelado', 'No se realizó ningún cambio', 'error');
            this.refreshTable();
          }
        });
        // this.popToast('success', 'Registro Masivo', 'El registro se realizó correctamente');
        // this.refreshTable();

      }
    });
  }
  closeModal(flag) {

    if (flag === 1) {
      this.informeVacante = false;
    } else {
      this.editarRequi = false;
      this.editarNR = false;
      this.GetCandidatosNR();
      this.GetRequisicionesPausa();
      this.onChangeTable(this.config);
    }

  }

  openDesignVacante() {
    const usuario = this.settings.user['id'];
    if (this.aprobador === usuario) {
      this._Router.navigate(['/reclutamiento/configuracionVacante/', this.id, this.folio, this.vBtra], { skipLocationChange: true });
    } else {
      if (this.coordinador != null) {
        swal('Ops...!', 'Esta vacante solo puede ser diseñada por el aprobador (' + this.coordinador + ').', 'error');
      } else {
        swal('Ops...!', 'Esta vacante aún no esta aprobada', 'error');
      }
    }

  }
  openViewPostulados() {
    if (this.id != null) {
      this._Router.navigate(['/reclutamiento/postulados', this.id, this.folio, this.vBtra], { skipLocationChange: true });
    }
  }

  seguimientoRequi() {
    if (this.numeroVacantes != 0 && (this.settings.user['tipoUsuarioId'] == '4' || this.settings.user['tipoUsuarioId'] == '3')) {
      this.procesoCandidato = true;
    } else if (this.numeroVacantes !== 0) {
      this._Router.navigate(['/reclutamiento/gestionVacante', this.id, this.folio, this.vBtra, this.clienteId, this.enProceso, this.estatusId], { skipLocationChange: true });
    } else {
      swal('Ops...!', 'Esta vacante no cuenta con posiciones disponibles esta en 0, cambie el número de vacantes disponibles.', 'error');
    }

  }

  exportAsXLSX() {

    if (this.dataSource.length > 0) {
      let aux = [];
      let comentarios = '';
      let reclutador = '';
      let coordinador = '';

      this.dataSource.forEach(row => {
        if (row.comentarioReclutador.length > 0) {
          row.comentarioReclutador.forEach(element => {
            comentarios = comentarios +
              element + '\n';
          });
        } else {
          comentarios = '';
        }
        const d = row.diasTrans;
        // var e = this.pipe.transform(new Date(row.fch_Modificacion), 'dd/MM/yyyy');

        if (!Array.isArray(row.reclutadores)) {
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
          'DIAS TRANSCURRIDOS': d,
          SOLICITANTE: row.solicita,
          EMPRESA: row.cliente,
          SUCURSAL: row.sucursal,
          NO: row.vacantes,
          CUBIERTOS: row.contratados,
          PUESTO: row.vBtra,
          SUELDO: row.sueldoMinimo.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) +
                  ' - ' + row.sueldoMaximo.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) ,
          ESTATUS: row.estatus,
          COORDINADOR: coordinador,
          RECLUTADOR: reclutador,
          'COMENTARIOS': comentarios
        });
        comentarios = '';
        reclutador = '';
      });

      //   })
      // })
      this.excelService.exportAsExcelFile(aux, 'Solicitud_de_reporte_para_generar_estadisticos');
      this.refreshTable();
    }
  }



  print() {
    this.imprimir = true;

    this.SelectiedSection = {
      Encabezado: this.Encabezado,
      Horarios: this.Horarios,
      Cliente: this.Cliente,
      ExpApt: this.ExpApt,
      Direccion: this.Direccion,
      Beneficio: this.Beneficio,
      ActObsProd: this.ActObsProd,
      Telefono: this.Telefono,
      Contacto: this.Contacto,
      DocPrest: this.DocPrest,
      Psicom: this.Psicom,
      Competencia: this.Competencia,
    };
    this.EmImprimir.emit(this.imprimir);
    if (!this.settings.layout.isCollapsed) {
      this.settings.layout.isCollapsed = !this.settings.layout.isCollapsed;
    }
    setTimeout(() => {
      const data = document.getElementById('content');
      html2canvas(data, { windowWidth: 1500 }).then(canvas => {
        const contentDataURL = canvas.toDataURL('image/png')
        const pdf = new jspdf('p', 'pt', 'letter'); // A4 size page of PDF
        const width = pdf.internal.pageSize.getWidth();
        const height = pdf.internal.pageSize.getHeight();
        const position = 0;
        pdf.addImage(contentDataURL, 'jpg', 0, position, width, height);
        pdf.save(this.folio + '.pdf'); // Generated PDF
      });


      // const pdf = new jspdf('1', 'pt', 'a4');
      // const options = {
      //   pagesplit: true
      // };
      // pdf.addHTML(data, 10, 10, options, () => {
      //   pdf.save(this.folio + '.pdf');
      // });


    }, 1000);

    setTimeout(() => {
      this.imprimir = false;
      this.EmImprimir.emit(this.imprimir);
    }, 1500);
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


  // Mensaje de Error, en caso de que el damfo no cuente con horarios activos.
  //  swal('Ops...!', 'Este formato DAM-FO-290 no cuenta con horarios activos. No es posible generar la requisición', 'error');

}
