import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild, ViewChildren, OnChanges } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { ApiConection } from './../../service/api-conection.service';
import { ExamenesService } from '../../service/Examenes/examenes.service';
import { InfoCandidatoService } from '../../service/SeguimientoVacante/info-candidato.service';
import { SettingsService } from '../../core/settings/settings.service';

declare var $: any;


@Component({
  selector: 'app-info-candidato',
  templateUrl: './info-candidato.component.html',
  styleUrls: ['./info-candidato.component.scss'],
  providers: [InfoCandidatoService]
})
export class InfoCandidatoComponent implements OnInit, OnChanges {
  candidato: any;
  @Input('IdCandidato') CandidatoId: string;
  @Input('VerVacantes') VerVacantes: boolean = true;
  @Output('Estatus') EstatusEmitter: EventEmitter<any> = new EventEmitter();

  @ViewChild('modallib') modal;

  SelectedMisVacantes = true;
  selected = false;
  rowAux = [];

  public dataSource_v: Array<any> = [];
  public dataSource_p: Array<any> = [];

  objLiberar: Array<any> = [];
  /*
    Variables y funcionamiento para Tabla de Mis Vacantes.
  */
  public page_v = 1;
  public itemsPerPage_v = 5;
  public maxSize_v = 5;
  public numPages_v = 1;
  public length_v = 0;

  spinner = false;
  showFilterRow_v: boolean;
  registros_v: number;
  visible = true;
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
  loading = false;

  btnNotificacion = false;
  // examenes
  examen = { 'tecnicos': [], 'psicometricos': [] };
  modalExamen = false;
  modalComentarios = false;
  ShowButtonCV = false;

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
/*
    Columnas para Tabla de Vacantes
  */
 public rows: Array<any> = [];
 public columns: Array<any> = [
   { title: 'Folio', className: 'text-success text-center', name: 'folio', filtering: { filterString: '', placeholder: 'Folio' } },
   { title: 'Perfil', className: 'text-info text-center', name: 'vBtra', filtering: { filterString: '', placeholder: 'Perfil' } },
   { title: 'Cliente', className: 'text-info text-center', name: 'cliente', filtering: { filterString: '', placeholder: 'Cliente' } },
   { title: 'Cub/Vac', className: 'text-info text-center', name: 'vacantes',
   filtering: { filterString: '', placeholder: 'Cubiertas/Vacantes' } },
   { title: 'Tipo Recl.', className: 'text-info text-center', name: 'tipoReclutamiento',
   filtering: { filterString: '', placeholder: 'Tipo' } },
   { title: 'Cumplimiento', className: 'text-info text-center', name: 'fch_Cumplimiento',
   filtering: { filterString: '', placeholder: 'aaaa-mm-dd' } },
   { title: 'Estatus', className: 'text-info text-center', name: 'estatus', filtering: { filterString: '', placeholder: 'Estatus' } },
 ];
 public config_v: any = {
  paging: true,
  filtering: { filterString: '' },
  className: ['table-hover mb-0']
  };
  public config_p: any = {
    className: ['table-striped table-bordered mb-0 d-table-fixed']
  };

  /**
   * configuracion para mensajes de acciones.
   */

  popToast(type, title, body) {
    const toast: Toast = {
      type: type,
      title: title,
      timeout: 4000,
      body: body
    };
    this.toasterService.pop(toast);
  }

  constructor(
    private _serviceCandidato: InfoCandidatoService,
    private toasterService: ToasterService,
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
    };

    this.usuario = this.settings.user['nombre'];
    this.usuarioId = this.settings.user['id'];
    // this.getMisVacates();
  }

  closeModal() {
    this.modalExamen = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // Add '${implements OnChanges}' to the class.
    if (changes.CandidatoId && !changes.CandidatoId.isFirstChange()) {
      this.SelectedMisVacantes = true;
      this.ngOnInit();
      this.getPostulaciones();
      this.refreshTable_v();
      this.vacante = {};
      this.procesoCandidatoId = 0;
      this.Status = '';
      this.RequisicionId = '';
      this.reclutador = '';
    }

  }

  validarFecha(fnac): number {
    const fn = new Date(fnac);
    const date = new Date();
    let edad = date.getFullYear() - fn.getFullYear();

    if (date.getMonth() < fn.getMonth() - 1) {
      edad--;
    }
    if (((fn.getMonth() - 1) == date.getMonth()) && (date < fn)) {
      edad--;
    }
    return (edad);
  }

  GetInfoCandidato() {
    // this.CandidatoId = '4F65DAC1-C6A0-E811-80E8-9E274155325E'
    this.loading = true;
    this._serviceCandidato.getInfoCandidato(this.CandidatoId).subscribe(data => {
      this.candidato = {
        id: data.id,
        picture: ApiConection.ServiceUrlBolsa + data.foto,
        nombre: data.nombre,
        aboutMe: data.aboutMe.length !== 0 ? data.aboutMe[0]['acercaDeMi'] : null,
        edad: this.validarFecha(data.fechaNacimiento),
        genero: data.genero,
        correo: data.email ? data.email : null,
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
      };
      if (this.candidato.urlCv !== '') {
        this.urlCV = ApiConection.ServiceUrlBolsa + this.candidato.urlCv;
        this.ShowButtonCV = true;
      } else {
        this.urlCV = '';
        this.ShowButtonCV = false;
      }
      if (this.candidato.estatus) {
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
        this.getPostulaciones();
      });
    });

  }
  ngOnInit() {
    this.GetInfoCandidato();
    this.desapartar = true;
    this.auxestatus = true;
  }

  // ngAfterViewInit() {
  //   this.getPostulaciones();
  //   setTimeout(() => {
  //     this.onChangeTable_v(this.config_v);
  //   }, 1500);
  // }

  getMisVacates() {
    this.spinner = true;
    this._serviceCandidato.getMisVacantes(this.settings.user['id']).subscribe(data => {
      this.dataSource_v = data;
      this.onChangeTable_v(this.config_v);
    });
  }

  public changePage_v(page: any, data: Array<any> = this.dataSource_v): Array<any> {
    const start = (page.page - 1) * page.itemsPerPage;
    const end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeFilter_v(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.showFilterRow_v = true;
    this.columns.forEach((column: any) => {
      if (column.filtering.filterString !== '') {
        filteredData = filteredData.filter((item: any) => {
          if (item[column.name] != null) {
            return item[column.name].toString().toLowerCase().match(column.filtering.filterString.toLowerCase());
          }
        });
      }
    });

    return filteredData;
  }

  public onChangeTable_v(config: any, page: any = { page: this.page_v, itemsPerPage: this.itemsPerPage_v }): any {
    if (config.filtering) {
      (<any>Object).assign(this.config_v.filtering, config.filtering);
    }

    this.registros_v = this.dataSource_v.length;
    this.rows = this.dataSource_v;
    const filteredData = this.changeFilter_v(this.dataSource_v, this.config_v);
    this.rows = page && config.paging ? this.changePage_v(page, filteredData) : filteredData;
    this.length_v = filteredData.length;
    this.spinner = false;
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
      const index = this.dataSource_v.indexOf(data.row);
      this.vacante = {
        id: data.id,
        vBtra: data.vBtra,
        folio: data.folio
      };
      this.infoFolio = data.folio;
      this.infoRequiId = data.id;

      if (this.candidato.estatus != null) {
        data.vacantes === 0 || data.vacantes === data.contratados || data.estatusId === 39 || this.candidato.estatusId === 28 ||
          (this.candidato.estatus.requisicionId === data.id && this.candidato.estatus.estatusId === 26) ||
          (this.candidato.estatus.requisicionId === data.id && this.candidato.estatus.estatusId !== 27 &&
          this.candidato.estatus.estatusId !== 40) ||
          (this.candidato.estatus.requisicionId !== data.id && this.candidato.estatus.estatusId !== 27 &&
          this.candidato.estatus.estatusId !== 26 &&
          this.candidato.estatus.estatusId !== 40) ? this.auxestatus = true : this.auxestatus = false;

        data.estatusId !== 39 && (this.candidato.estatus.requisicionId === data.id && this.reclutadorId === this.usuarioId &&
          this.candidato.estatus.estatusId !== 27 && this.candidato.estatus.estatusId !== 40 &&
          this.candidato.estatus.estatusId !== 24 && this.candidato.estatus.estatusId !== 26 &&
          this.candidato.estatus.estatusId !== 28 && this.candidato.estatus.estatusId !== 42) ?
          this.desapartar = false : this.desapartar = true;
      } else {
        this.desapartar = true;

        data.vacantes > 0 && data.vacantes > data.contratados ? this.auxestatus = false : this.auxestatus = true;
        this.procesoCandidatoId = 27;

      }
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

  getPostulaciones() {
    this._serviceCandidato.getPostulaciones(this.CandidatoId).subscribe(data => {
      this.dataSource_p = data;
      this.rows_p = data;
      this.registros_p = this.rows_p.length;
      this.loading = false;
    });
  }

  public refreshTable_p() {
    this.getMisVacates();
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
    this._serviceCandidato.setApartarCandidato(this.procesoCandidato) // controladores / infocandidato
      .subscribe(data => {
        switch (data) {
          case 200: {
            this.loading = false;
            this.GetInfoCandidato();
            this.auxestatus = true;
            this.desapartar = false;
            this.refreshTable_v();

            this.getPostulaciones();

            const msg = 'El candidato se aparto correctamente.';
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
            const msg = 'El candidato ya esta apartado o en proceso.';
            this.popToast('info', 'Apartado', msg);
            this.loading = false;
            this.auxestatus = true;
            this.desapartar = true;
            break;
          }
          case 404: {
            const msg = 'Error el intentar apartar el candidato. Consulte al departamento de soporte si el problema persiste.';
            this.popToast('error', 'Apartado', msg);
            this.loading = false;
            this.auxestatus = false;
            break;
          }
          default: {
            this.popToast('error', 'Oops!!', 'Error inesperado y desconocido, reporte el problema el departamento de soporte.');
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
    if (value === 200) {
      this.GetInfoCandidato();
      this.desapartar = true;
      this.auxestatus = false;

      this.refreshTable_v();
      this.getPostulaciones();
      this.popToast('warning', 'Liberado', 'El candidato se libero correctamente.');
      this.modal.hide();
      this.dlgLiberar = false;
    } else if (value === 404) {
      const msg = 'Error el intentar liberar el candidato. Consulte al departamento de soporte si el problema persiste.';
      this.desapartar = false;
      this.auxestatus = true;
      this.popToast('error', 'Apartado', msg);
      this.modal.hide();
      this.dlgLiberar = false;
    } else {
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

    });

    this.dlgLiberar = true;
  }

  openDialogLiberar() {

    this.objLiberar.push({
      RequisicionId: this.vacante.id,
      CandidatoId: this.CandidatoId,
      ReclutadorId: this.settings.user['id'],
      ProcesoCandidatoId: this.Estatus,

    });

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

    if (this.reclutador === this.usuario || !this.candidato.estatus) {
      this.loading = true;
      const data = {
        RequisicionId: this.vacante.id,
        CandidatoId: this.CandidatoId,
        ReclutadorId: this.settings.user['id'],
        MotivoId: result.motivo,
        ProcesoCandidatoId: this.Estatus,
        Comentario: result.comentario,
      };
      this._serviceCandidato.setLiberarCandidato(data)
        .subscribe(data => {
          switch (data) {
            case 200: {
              this.GetInfoCandidato();
              this.desapartar = true;
              this.auxestatus = false;

              this.getPostulaciones();

              this.loading = false;

              const msg = 'El candidato se libero correctamente.';
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
              const msg = 'Error el intentar liberar el candidato. Consulte al departamento de soporte si el problema persiste.';
              this.desapartar = false;
              this.auxestatus = true;
              this.popToast('error', 'Apartado', msg);
              this.loading = false;
              break;
            }
          }
        });
    } else {
      this.notAccess();
    }
  }

  showCvCandidato() {
    const window290 = window.open(this.urlCV, '_blank',
      'toolbar=no,scrollbars=no,resizable=no,status=no,menubar=no,location=no,fullscreen=yes,directories=no');
  }

  EnviarNotificacion() {
    this.btnNotificacion = true;
    const data = {
      ReclutadorId: this.reclutadorId,
      candidatoId: this.CandidatoId,
      requisicionId: this.RequisicionId,
      nombreCandidato: this.candidato.nombre,
      nombre: this.settings.user['nombre']
    };
    this._serviceCandidato.EmailPeticionLiberar(data).subscribe(r => {
      if (r === 200) {
        this.popToast('success', 'Correo liberación candidato', 'El correo para pedir liberación de candidato se envió con éxito');
      } else {
        this.popToast('error', 'Correo liberación candidato', 'Ocurrió un error al intentar enviar correo. Por favor intentelo de nuevo');
        this.btnNotificacion = false;
      }
    });
  }
  ImgErrorCandidato() {
    this.candidato['picture'] = '/assets/img/user/default-user.png';
  }
}
