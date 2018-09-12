import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { InfoCandidatoService } from '../../service/SeguimientoVacante/info-candidato.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
  public dataSource_v: Array<any> = [];
  public dataSource_p: Array<any> = [];

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

  requi: { folio: any; id: any; };
  vacante: any;
  usuario: string;
  usuarioId: string;
  Status: any = 0;
  requisicionId: any = '';
  reclutador: any = '';
  procesoCandidato: any = {};
  msg: string;
  procesoCandidatoId: any; // Recuperar el estatus en el que se encuetra el candidato.
  Estatus: any; // Toma el Id del procesoCandidato para realizar las afectaciones correspondientes.
  /*********************************************************/


  constructor(
    private _serviceCandidato: InfoCandidatoService,
    private toasterService: ToasterService,
    private spinner: NgxSpinnerService,
  ) {
    this.registros_v = 0;
    this.registros_p = 0;
    this.vacante = {
      id: null,
      vBtra: null,
      folio: null
    }
    this.usuario = localStorage.getItem('nombre');
    this.usuarioId = localStorage.getItem('id')
    this.getMisVacates();
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes.CandidatoId && !changes.CandidatoId.isFirstChange()) {
      this.ngOnInit();
      this.getPostulaciones();
      this.vacante = {};
      this.procesoCandidatoId = 0;
      this.Status = '';
      this.requisicionId = '';
      this.reclutador = '';
    }

  }

  ngOnInit() {
    this.spinner.show();
    // this.CandidatoId = '4F65DAC1-C6A0-E811-80E8-9E274155325E'
    this._serviceCandidato.getInfoCandidato(this.CandidatoId).subscribe(data => {
      this.candidato = {
        id: data.id,
        picture: localStorage.getItem('ConexionBolsa') + data.foto,
        nombre: data.nombre,
        aboutMe: data.aboutMe.length != 0 ? data.aboutMe[0]['acercaDeMi'] : null,
        edad: data.edad,
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
        info: data.candidato
      }
      if (this.candidato.estatus) {
        this.Estatus = this.candidato.estatus.id;
        this.procesoCandidatoId = this.candidato.estatus.estatusId;
        this.Status = this.candidato.estatus.estatus.descripcion;
        this.requisicionId = this.candidato.estatus.requisicionId;
        this.reclutador = this.candidato.estatus.reclutador;
      }
      this.spinner.hide();
      console.log(this.candidato);
    });
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
    this._serviceCandidato.getMisVacantes(localStorage.getItem('id')).subscribe(data => {
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
      this.onChangeTable_v(this.config_v);
    }, 800);
    this.vacante = {};
  }

  public onCellClick_v(data: any): any {
    let index = this.dataSource_v.indexOf(data.row);
    this.vacante = {
      id: data.id,
      vBtra: data.vBtra,
      folio: data.folio
    }
    console.log(this.vacante);
    /* add an class 'active' on click */
    $('#resultDataTableVacantes').on('click', 'tr', function (event: any) {
      //noinspection TypeScriptUnresolvedFunction
      $(this).addClass('selected').siblings().removeClass('selected');
    });
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
    if (this.reclutador == this.usuario || !this.candidato.estatus) {
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
              this.ngOnInit();
              this.ngAfterViewInit();
              var msg = 'El candidato se aparto correctamente.';
              this.popToast('success', 'Apartado', msg);
              break;
            }
            case 304: {
              msg = 'El candidato ya esta apartado o en proceso.';
              this.popToast('info', 'Apartado', msg); ''
              break;
            }
            case 404: {
              var msg = 'Error el intentar apartar el candidato. Consulte al departamento de soporte si el problema persiste.';
              this.popToast('error', 'Apartado', msg);
              break;
            }
            default: {
              var msg = 'Error inesperado y desconocido, reporte el problema el departamento de soporte.';
              this.popToast('error', 'Oops!!', msg);
              break;
            }
          }
        }, err => {
          console.log(err);
        });
    }
    else {
      this.notAccess();
    }
  }

  _liberarCandidato() {
    if (this.reclutador == this.usuario || !this.candidato.estatus) {
      this._serviceCandidato.setLiberarCandidato(this.Estatus)
        .subscribe(data => {
          switch (data) {
            case 200: {
              this.ngOnInit();
              this.ngAfterViewInit();
              var msg = 'El candidato se libero correctamente.';
              this.popToast('warning', 'Liberado', msg);
              break;
            }
            case 404: {
              var msg = 'Error el intentar liberar el candidato. Consulte al departamento de soporte si el problema persiste.';
              this.popToast('error', 'Apartado', msg);
              break;
            }
          }
        })
    }
    else {
      this.notAccess();
    }
  }
}
