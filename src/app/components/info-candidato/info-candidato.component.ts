import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { ApiConection } from './../../service/api-conection.service';
import { DialogLiberarCandidatoComponent } from '../dialog-liberar-candidato/dialog-liberar-candidato.component';
import { DirectorioEmpresarialComponent } from './../../routes/vtas/directorio-empresarial/directorio-empresarial.component';
import { DtCandidatosPostComponent } from './../../routes/recl/vacantes/vacantes/components/dt-candidatos-post/dt-candidatos-post.component';
import { ExamenesService } from '../../service/Examenes/examenes.service';
import { InfoCandidatoService } from '../../service/SeguimientoVacante/info-candidato.service';
import { ModalDirective } from 'ngx-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { SettingsService } from '../../core/settings/settings.service';
import { log } from 'util';

declare var $: any;


@Component({
  selector: 'app-info-candidato',
  templateUrl: './info-candidato.component.html',
  styleUrls: ['./info-candidato.component.scss'],
  providers: [InfoCandidatoService]
})
export class InfoCandidatoComponent implements OnInit {
  candidato: any;
  @Input('IdCandidato') CandidatoId: string;
  @Input('VerVacantes') VerVacantes: boolean = true;
  @Output('Estatus') EstatusEmitter: EventEmitter<any> = new EventEmitter();

  @ViewChild('modallib') modal;

  SelectedMisVacantes: boolean = true;
  selected: boolean = false;
  rowAux = [];

  public dataSource_v: Array<any> = [];
  public dataSource_p: Array<any> = [];

  objLiberar: Array<any> = [];
  /*
    Variables y funcionamiento para Tabla de Mis Vacantes.
  */
  public page_v: number = 1;
  public itemsPerPage_v: number = 5;
  public maxSize_v: number = 5;
  public numPages_v: number = 1;
  public length_v: number = 0;

  showFilterRow_v: boolean;
  registros_v: number;
  visible: boolean = true;
  requi: { folio: any; id: any; };
  vacante: any = null;
  usuario: string;
  usuarioId: string;
  Status: any = 0;
  RequisicionId: any = '';
  reclutador: any = '';
  reclutadorId;
  procesoCandidato: any = {};
  urlCV: any;
  msg: string;
  procesoCandidatoId: any = 0; // Recuperar el estatus en el que se encuetra el candidato.
  Estatus: any; // Toma el Id del procesoCandidato para realizar las afectaciones correspondientes.
  Emiter: { estatusId: number; estatus: string; candidatoId: string };
  infoRequiId: any = null;
  infoFolio: any = null;
  dlgLiberar = false;
  /*********************************************************/

  contratados = true;
  auxestatus = true;
  desapartar = true;
  loading: boolean;

  //examenes
  examen = { 'tecnicos': [], 'psicometricos': [] };
  modalExamen = false;
  ShowButtonCV: boolean = false;


  constructor(
    private _serviceCandidato: InfoCandidatoService,
    private toasterService: ToasterService,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private _serviceExamen: ExamenesService,
    private settings: SettingsService
  ) {
    this.registros_v = 0;
    this.registros_p = 0;
    this.vacante = {
      id: null,
      vBtra: null,
      folio: null
    }

    this.usuario = this.settings.user['nombre'];
    this.usuarioId = this.settings.user['id']
    this.getMisVacates();
  }

  closeModal() {
    this.modalExamen = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes.CandidatoId && !changes.CandidatoId.isFirstChange()) {
      this.SelectedMisVacantes = true;
      this.ngOnInit();
      this.getPostulaciones();
      this.refreshTable_v()
      this.vacante = {};
      this.procesoCandidatoId = 0;
      this.Status = '';
      this.RequisicionId = '';
      this.reclutador = '';
    }

  }

  validarFecha(fnac) : number{
    var fn = new Date(fnac);
    var date = new Date();
    var edad = date.getFullYear() - fn.getFullYear();

    if (date.getMonth() < fn.getMonth() - 1) {
      edad--;
    }
    if (((fn.getMonth() - 1) == date.getMonth()) && (date < fn)) {
      edad--;
    }
    return (edad);
  }

  GetInfoCandidato() {
    this.spinner.show();
    // this.CandidatoId = '4F65DAC1-C6A0-E811-80E8-9E274155325E'
    this._serviceCandidato.getInfoCandidato(this.CandidatoId).subscribe(data => {

      this.candidato = {
        id: data.id,
        picture: ApiConection.ServiceUrlBolsa + data.foto,
        nombre: data.nombre,
        aboutMe: data.aboutMe.length != 0 ? data.aboutMe[0]['acercaDeMi'] : null,
        edad: this.validarFecha(data.fechaNacimiento),
        genero: data.genero,
        correo: data.email ? data.email.email : null,
        telefonos: data.telefono,
        direccion: data.direccion,
        redSocial: data.redSocial,
        experiencias: data.experiencias,
        formaciones: data.formaciones,
        certificaciones: data.certificaciones,
        cursos: data.cursos,
        conocimientos: data.conocimientos,
        idiomas: data.idiomas,
        estatus: data.estatus,
        about: data.aboutMe[0],
        info: data.candidato,
        propietarioId: data.propietarioId,
        urlCv: data.urlCv
      }
      console.log('Candidato', this.candidato);
      if (this.candidato.urlCv != '') {
        this.urlCV = ApiConection.ServiceUrlBolsa + this.candidato.urlCv;
        this.ShowButtonCV = true;
      }
      else {
        this.urlCV = '';
        this.ShowButtonCV = false;
      }

      if (this.candidato.estatus) {
        debugger;
        this.Estatus = this.candidato.estatus.id;
        this.procesoCandidatoId = this.candidato.estatus.estatusId;
        this.Status = this.candidato.estatus.descripcion;
        this.RequisicionId = this.candidato.estatus.requisicionId;
        this.reclutador = this.candidato.estatus.reclutador;
        this.reclutadorId = this.candidato.estatus.reclutadorId;
      }
      this._serviceExamen.GetExamenCandidato(this.candidato.id).subscribe(exa => {
        this.examen.tecnicos = exa[0];
        this.examen.psicometricos = exa[1];
        this.spinner.hide();
      });
    });

  }
  ngOnInit() {
    this.GetInfoCandidato();
    this.desapartar = true;
    this.auxestatus = true;
  }

  ngAfterViewInit() {
    this.getPostulaciones();
    setTimeout(() => {
      this.onChangeTable_v(this.config_v);
    }, 1500);
  }

  /*
    Columnas para Tabla de Vacantes
  */
  public rows: Array<any> = [];
  public columns: Array<any> = [
    { title: 'Folio', className: 'text-success text-center', name: 'folio', filtering: { filterString: '', placeholder: 'Folio' } },
    { title: 'Perfil', className: 'text-info text-center', name: 'vBtra', filtering: { filterString: '', placeholder: 'Perfil' } },
    { title: 'Cliente', className: 'text-info text-center', name: 'cliente', filtering: { filterString: '', placeholder: 'Cliente' } },
    { title: 'No. Vacantes', className: 'text-info text-center', name: 'vacantes', filtering: { filterString: '', placeholder: 'No. Vacantes' } },
    { title: 'Tipo Recl.', className: 'text-info text-center', name: 'tipoReclutamiento', filtering: { filterString: '', placeholder: 'Tipo' } },
    { title: 'Cumplimiento', className: 'text-info text-center', name: 'fch_Cumplimiento', filtering: { filterString: '', placeholder: 'aaaa-mm-dd' } },
    { title: 'Estatus', className: 'text-info text-center', name: 'estatus', filtering: { filterString: '', placeholder: 'Estatus' } },
  ];

  getMisVacates() {
    this._serviceCandidato.getMisVacantes(this.settings.user['id']).subscribe(data => {
      this.dataSource_v = data;
    });
  }

  public config_v: any = {
    paging: true,
    //sorting: { columns: this.columns },
    filtering: { filterString: '' },
    className: ['table-hover mb-0']
  };

  public changePage_v(page: any, data: Array<any> = this.dataSource_v): Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort_v(data: any, config: any): any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config_v.sorting.columns || [];
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

  public changeFilter_v(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columns.forEach((column: any) => {
      if (column.filtering) {
        this.showFilterRow_v = true;
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
        item[config.filtering.columnName].toLowerCase().match(this.config_v.filtering.filterString.toLowerCase()));
    }

    let tempArray: Array<any> = [];
    filteredData.forEach((item: any) => {
      let flag = false;
      this.columns.forEach((column: any) => {
        if (item[column.name] == null) {
          flag = true;
        } else {
          if (item[column.name].toString().toLowerCase().match(this.config_v.filtering.filterString.toLowerCase())) {
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

  public onChangeTable_v(config: any, page: any = { page: this.page_v, itemsPerPage: this.itemsPerPage_v }): any {
    if (config.filtering) {
      (<any>Object).assign(this.config_v.filtering, config.filtering);
    }

    if (config.sorting) {
      (<any>Object).assign(this.config_v.sorting, config.sorting);
    }
    this.registros_v = this.dataSource_v.length;
    this.rows = this.dataSource_v;
    let filteredData = this.changeFilter_v(this.dataSource_v, this.config_v);
    let sortedData = this.changeSort_v(filteredData, this.config_v);
    this.rows = page && config.paging ? this.changePage_v(page, sortedData) : sortedData;
    this.length_v = sortedData.length;

  }

  public refreshTable_v() {
    this.getMisVacates();
    setTimeout(() => {
      this.columns.forEach(element => {
        element.filtering.filterString = '';
        (<HTMLInputElement>document.getElementById(element.title)).value = '';
      });
      this.infoRequiId = null;
      this.infoFolio = null;
      this.onChangeTable_v(this.config_v);
    }, 800);
    this.vacante = {};
  }
  public clearfilters() {
    debugger;
    this.columns.forEach(element => {
      element.filtering.filterString = '';
      (<HTMLInputElement>document.getElementById(element.title)).value = '';
    });
    this.onChangeTable_v(this.config_v);
    this.vacante = {};
    this.infoRequiId = null;
    this.infoFolio = null;
  }

  public onCellClick_v(data: any): any {
    data.selected ? data.selected = false : data.selected = true;

    if (!data.selected) {
      this.selected = false;
      this.auxestatus = true;
      this.desapartar = true;
    } else {
      this.selected = true;
      let index = this.dataSource_v.indexOf(data.row);
      this.vacante = {
        id: data.id,
        vBtra: data.vBtra,
        folio: data.folio
      }
      this.infoFolio = data.folio;
      this.infoRequiId = data.id;

      if (this.candidato.estatus != null) {
        data.vacantes == 0 || data.vacantes == data.contratados || data.estatusId == 39 || this.candidato.estatusId == 28 ||
          (this.candidato.estatus.requisicionId == data.id && this.candidato.estatus.estatusId == 26) ||
          (this.candidato.estatus.requisicionId == data.id && this.candidato.estatus.estatusId != 27 && this.candidato.estatus.estatusId != 40) ||
          (this.candidato.estatus.requisicionId != data.id && this.candidato.estatus.estatusId != 27 && this.candidato.estatus.estatusId != 26 && this.candidato.estatus.estatusId != 40) ? this.auxestatus = true : this.auxestatus = false;

        data.estatusId != 39 && (this.candidato.estatus.requisicionId == data.id && this.reclutadorId == this.usuarioId && this.candidato.estatus.estatusId != 27 && this.candidato.estatus.estatusId != 40 &&
          this.candidato.estatus.estatusId != 24 && this.candidato.estatus.estatusId != 26 && this.candidato.estatus.estatusId != 28 && this.candidato.estatus.estatusId != 42) ? this.desapartar = false : this.desapartar = true;
      }
      else {
        this.desapartar = true;

        data.vacantes > 0 && data.vacantes > data.contratados ? this.auxestatus = false : this.auxestatus = true;
        this.procesoCandidatoId = 27;

      }
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
    Tabla de postulaciones del candidato visualizado.
  */

  public rows_p: Array<any> = [];
  public columns_p: Array<any> = [
    { title: 'Folio', className: 'text-success text-center', name: 'folio', filtering: { filterString: '', placeholder: 'Folio' } },
    { title: 'Perfil', className: 'text-info text-center', name: 'vBtra', filtering: { filterString: '', placeholder: 'Perfil' } },
    { title: 'Estatus', className: 'text-info text-center', name: 'estatus', filtering: { filterString: '', placeholder: 'Estatus' } },
  ];
  /*
    Variables y funcionamiento para Tabla de Postulaciones de Candidato.
  */
  registros_p: number;

  getPostulaciones() {
    this._serviceCandidato.getPostulaciones(this.CandidatoId).subscribe(data => {
      this.dataSource_p = data
      this.rows_p = data;
      this.registros_p = this.rows_p.length;
    });
  }

  public refreshTable_p() {
    this.getMisVacates();
  }

  public config_p: any = {
    className: ['table-striped table-bordered mb-0 d-table-fixed']
  };

  /**
   * configuracion para mensajes de acciones.
   */

  popToast(type, title, body) {
    var toast: Toast = {
      type: type,
      title: title,
      timeout: 4000,
      body: body
    }
    this.toasterService.pop(toast);
  }
  notAccess() {
    var msg = 'Accion no permitada, el candidato se encuentra en proceso con ' + this.reclutador;
    this.popToast('error', 'No Autorizado', msg);
  }


  /**
   * Funcionalidades del componente
   */
  _apartarCandidato() {
    // if (this.reclutador === this.usuario || !this.candidato.estatus) {
    this.loading = true;
    this.procesoCandidato = {
      candidatoId: this.CandidatoId,
      requisicionId: this.vacante.id,
      folio: this.vacante.folio,
      reclutador: this.usuario,
      reclutadorId: this.usuarioId,
      estatusId: 12
    }
    this._serviceCandidato.setApartarCandidato(this.procesoCandidato)
      .subscribe(data => {
        switch (data) {
          case 200: {
            this.loading = false;
            this.GetInfoCandidato();
            this.auxestatus = true;
            this.desapartar = false;
            this.ngAfterViewInit();

            var msg = 'El candidato se aparto correctamente.';
            this.popToast('success', 'Apartado', msg);
            this.Emiter = {
              estatusId: 12,
              estatus: 'Apartado',
              candidatoId: this.CandidatoId
            };
            this.EstatusEmitter.emit(this.Emiter);
            break;
          }
          case 304: {
            msg = 'El candidato ya esta apartado o en proceso.';
            this.popToast('info', 'Apartado', msg); ''
            this.loading = false;
            this.auxestatus = true;
            this.desapartar = true;
            break;
          }
          case 404: {
            var msg = 'Error el intentar apartar el candidato. Consulte al departamento de soporte si el problema persiste.';
            this.popToast('error', 'Apartado', msg);
            this.loading = false;
            this.auxestatus = false;
            break;
          }
          default: {
            var msg = 'Error inesperado y desconocido, reporte el problema el departamento de soporte.';
            this.popToast('error', 'Oops!!', msg);
            this.loading = false;
            this.auxestatus = false;
            break;
          }
        }
      }, err => {
        console.log(err);
      });
    // }
    // else {
    //   this.notAccess();
    // }
  }



  onClose(value) {
    if (value == 200) {
      this.GetInfoCandidato();
      this.desapartar = true;
      this.auxestatus = false;

      this.ngAfterViewInit();

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

  LiberarPermisoEjecutivo() {
    this.objLiberar.push({
      RequisicionId: this.RequisicionId,
      CandidatoId: this.CandidatoId,
      ReclutadorId: this.settings.user['id'],
      ProcesoCandidatoId: this.Estatus,

    })

    this.dlgLiberar = true;
  }

  openDialogLiberar() {

    this.objLiberar.push({
      RequisicionId: this.vacante.id,
      CandidatoId: this.CandidatoId,
      ReclutadorId: this.settings.user['id'],
      ProcesoCandidatoId: this.Estatus,

    })

    this.dlgLiberar = true;

    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.autoFocus = true;
    // dialogConfig.hasBackdrop = true;
    // dialogConfig.width = '28%';
    // dialogConfig.height = 'auto';

    // //dialogConfig.position = {top: '100px'};

    // let dialogLiberar = this.dialog.open(DialogLiberarCandidatoComponent, dialogConfig);

    // dialogLiberar.afterClosed().subscribe(result =>{
    //   if(result){
    //     this._liberarCandidato(result);

    //   }
    //   else
    //   {

    //   }

    // });

  }
  _liberarCandidato(result) {

    if (this.reclutador == this.usuario || !this.candidato.estatus) {
      this.loading = true;
      var data = {
        RequisicionId: this.vacante.id,
        CandidatoId: this.CandidatoId,
        ReclutadorId: this.settings.user['id'],
        MotivoId: result.motivo,
        ProcesoCandidatoId: this.Estatus,
        Comentario: result.comentario,
      }
      this._serviceCandidato.setLiberarCandidato(data)
        .subscribe(data => {
          switch (data) {
            case 200: {
              this.GetInfoCandidato();
              this.desapartar = true;
              this.auxestatus = false;

              this.ngAfterViewInit();

              this.loading = false;

              var msg = 'El candidato se libero correctamente.';
              this.popToast('warning', 'Liberado', msg);
              this.Emiter = {
                estatusId: 27,
                estatus: 'Liberado',
                candidatoId: this.CandidatoId
              };
              this.EstatusEmitter.emit(this.Emiter);

              this.objLiberar = [];
              break;
            }
            case 404: {
              var msg = 'Error el intentar liberar el candidato. Consulte al departamento de soporte si el problema persiste.';
              this.desapartar = false;
              this.auxestatus = true;
              this.popToast('error', 'Apartado', msg);
              this.loading = false;
              break;
            }
          }
        });
    }
    else {
      this.notAccess();
    }
  }

  showCvCandidato() {
    var window290 = window.open(this.urlCV, "_blank",
      "toolbar=no,scrollbars=no,resizable=no,status=no,menubar=no,location=no,fullscreen=yes,directories=no");
  }

  ImgErrorCandidato() {
    this.candidato['picture'] = '/assets/img/user/default-user.png'
  }
}
