import { Component, Input, OnInit } from '@angular/core';

import { ApiConection } from './../../service/api-conection.service';
import { InfoCandidatoService } from '../../service/SeguimientoVacante/info-candidato.service';

declare var $: any;

@Component({
  selector: 'app-info-candidato',
  templateUrl: './info-candidato.component.html',
  styleUrls: ['./info-candidato.component.scss'],
  providers: [InfoCandidatoService]
})
export class InfoCandidatoComponent implements OnInit {
  candidato: any;
  @Input('Id') CandidatoId: string;
  public dataSource_v: Array<any> = [];
  public dataSource_p: Array<any> = [];

  /*
    Variables y funcionamiento para Tabla de Mis Vacantes.
  */
  public page_v: number = 1;
  public itemsPerPage_v: number = 20;
  public maxSize_v: number = 5;
  public numPages_v: number = 1;
  public length_v: number = 0;

  showFilterRow_v: boolean;
  registros_v: number;

  vBtra: any;
  id: any;
  folio: any;
  requi: { folio: any; id: any; };
  /*********************************************************/


  constructor(
    private _serviceCandidato: InfoCandidatoService
  ) {
    this.registros_v = 0;
    this.registros_p = 0;
  }

  ngOnInit() {
    this.CandidatoId = '4F65DAC1-C6A0-E811-80E8-9E274155325E'
    
    this._serviceCandidato.getInfoCandidato(this.CandidatoId).subscribe(data => {
      this.candidato = {
        id: data.id,
        picture: localStorage.getItem('ConexionBolsa') + data.foto,
        nombre: data.nombre,
        aboutMe: data.aboutMe[0]['acercaDeMi'],
        edad: data.edad,
        genero: data.genero,
        correo: data.email.email,
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
    });
  }

  ngAfterViewInit() {
    this.getMisVacates();
    this.getPostulaciones();
    setTimeout(() => {
      this.onChangeTable_v(this.config_v);
    }, 500);
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
      this.dataSource_v = data.sort();
    });
  }

  public config_v: any = {
    paging: true,
    sorting: { columns: this.columns },
    filtering: { filterString: '' },
    className: ['table-striped table-bordered mb-0 d-table-fixed']
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
    this.rows = this.dataSource_v.sort();
    let filteredData = this.changeFilter_v(this.dataSource_v, this.config_v);
    let sortedData = this.changeSort_v(filteredData, this.config_v);
    this.rows = page && config.paging ? this.changePage_v(page, sortedData) : sortedData;
    this.length_v = sortedData.length;
  }

  public refreshTable_v() {
    this.getMisVacates();
    setTimeout(() => {
      this.onChangeTable_v(this.config_v);
    }, 500);
    this.vBtra = null;
    this.id = null;
    this.folio = null;
  }

  public onCellClick_v(data: any): any {
    let index = this.dataSource_v.indexOf(data.row);
    this.vBtra = data.vBtra;
    this.id = data.id;
    this.folio = data.folio;
    this.requi = {
      folio: data.folio,
      id: data.id
    }
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

  public refreshTable_p(){
    this.getMisVacates();
  }

  public config_p: any = {
    className: ['table-striped table-bordered mb-0 d-table-fixed']
  };

  
}
