import { Component, OnInit, Input } from '@angular/core';
import { PostulateService } from '../../service/SeguimientoVacante/postulate.service';
import { ApiConection } from './../../service/api-conection.service';

@Component({
  selector: 'app-candidatos-en-proceso',
  templateUrl: './candidatos-en-proceso.component.html',
  styleUrls: ['./candidatos-en-proceso.component.scss'],
  providers: [PostulateService]
})
export class CandidatosEnProcesoComponent implements OnInit {

  @Input() RequisicionId;

  // Varaibles del paginador
  public page: number = 1;
  public itemsPerPage: number = 20;
  public maxSize: number = 5;
  public numPages: number = 1;
  public length: number = 0;
  showFilterRow: boolean;
  registros: number;
  clearFilter: boolean = false;
  dataSource = [];

  public rows: Array<any> = []
  public columns: Array<any> = [
    { title: 'Horario', className: 'text-info', name: 'horario', filtering: { filterString: '', placeholder: 'Horario' } },
    { title: 'Nombre Candidato', className: 'text-info', name: 'nombre', filtering: { filterString: '', placeholder: 'Nombre' } },
    { title: 'Área Experiencia', className: 'text-info', name: 'areaExp', filtering: { filterString: '', placeholder: 'Experiencia' } },
    { title: 'Área Interes', className: 'text-info', name: 'areaInt', filtering: { filterString: '', placeholder: 'Interes' } },
    { title: 'Localidad', className: 'text-info', name: 'localidad', filtering: { filterString: '', placeholder: 'Localidad' } },
    { title: 'Sueldo Aceptable', className: 'text-info text-center', name: 'sueldoMinimo', filtering: { filterString: '', placeholder: 'Sueldo aceptable' } },
    { title: 'Fecha Nacimiento', className: 'text-info text-center', name: 'edad', filtering: { filterString: '', placeholder: 'Fecha Nacimiento' } },
    { title: 'CURP', className: 'text-success', name: 'curp', filtering: { filterString: '', placeholder: 'CURP' } },
    { title: 'RFC', className: 'text-success', name: 'rfc', filtering: { filterString: '', placeholder: 'RFC' } },
    { title: 'NSS', className: 'text-success', name: 'nss', filtering: { filterString: '', placeholder: 'NSS' } },
    { title: 'Estatus', className: 'text-info text-center', name: 'estatus', filtering: { filterString: '', placeholder: 'Estatus' } }
  ]

  
  constructor(private service: PostulateService) { }

  ngOnInit() {
    this.GetEnProceso();
  }

  GetEnProceso() 
  {
    this.service.GetProceso(this.RequisicionId, sessionStorage.getItem('id')).subscribe(data => {
      this.dataSource = [];

      data.forEach(element => {
        var perfil = {
          id: element.id,
          horarioId: element.horarioId,
          horario: element.horario,
          foto: ApiConection.ServiceUrlFoto + element.perfil[0]['foto'],
          nombre: element.perfil[0]['nombre'],
          apellidoPaterno: element.perfil[0]['apellidoPaterno'],
          apellidoMaterno: element.perfil[0]['apellidoMaterno'],
          areaExp: element.perfil[0]['areaExp'],
          areaInt: element.perfil[0]['areaInt'],
          curp: element.perfil[0]['curp'],
          rfc: element.perfil[0]['rfc'],
          nss: element.perfil[0]['nss'],
          edad: element.perfil[0]['edad'],
          localidad: element.perfil[0]['localidad'],
          sueldoMinimo: element.perfil[0]['sueldoMinimo'],
          estatus: element.estatus,
          candidatoId: element.candidatoId,
          estatusId: element.estatusId,
          folio: element.folio,
          usuario: element.usuario,
          usuarioId: element.usuarioId,
          fecha:element.fecha, 
          areaReclutamiento: element.areaReclutamiento, 
          areaReclutamientoId: element.areaReclutamientoId,
          fuenteReclutamiento: element.fuenteReclutamiento,
          fuenteReclutamientoId: element.fuenteReclutamientoId,
          requisicionId: this.RequisicionId,
          paisNacimiento: element.perfil[0]['paisNacimiento'] != null ? element.perfil[0]['paisNacimiento'] : 0, 
          estadoNacimiento: element.perfil[0]['estadoNacimiento'] != null ? element.perfil[0]['estadoNacimiento'] : 0,
          municipioNacimiento: element.perfil[0]['municipioNacimiento'] != null ? element.perfil[0]['municipioNacimiento'] : 0, 
          generoId: element.perfil[0]['generoId'],
          editarCURP: false
        }
        if( element.contratados.length > 0)
        {
          perfil.nombre = element.contratados[0]['nombre'];
          perfil.apellidoPaterno = element.contratados[0]['apellidoPaterno'];
          perfil.apellidoMaterno = element.contratados[0]['apellidoMaterno'];
          perfil.curp = element.contratados[0]['curp'];
          perfil.rfc = element.contratados[0]['rfc'];
          perfil.nss = element.contratados[0]['nss'];
          perfil.edad = element.contratados[0]['edad'];
          perfil.editarCURP = true;
        }

        this.dataSource.push(perfil);
        this.onChangeTable(this.config);
      });
    }); 
  }

  //#region filtros y paginacion

  public config: any = {
    paging: true,
    //sorting: { colums: this.columns },
    filtering: { filterString: '' },
    className: ['table-striped mb-0 d-table-fixed']
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
  }

  public clearfilters() {
    this.clearFilter = false;
    // (<HTMLInputElement>document.getElementById('filterInput')).value = '';
    this.columns.forEach(element => {
      element.filtering.filterString = '';
      (<HTMLInputElement>document.getElementById(element.name)).value = '';
    });
    this.onChangeTable(this.config);
  }

  //#endregion




}
