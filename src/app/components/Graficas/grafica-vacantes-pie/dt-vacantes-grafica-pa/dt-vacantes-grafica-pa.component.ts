import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

import { ComponentsService } from './../../../../service/Components/components.service';

@Component({
  selector: 'app-dt-vacantes-grafica-pa',
  templateUrl: './dt-vacantes-grafica-pa.component.html',
  styleUrls: ['./dt-vacantes-grafica-pa.component.scss'],
  providers: [ComponentsService]
})
export class DtVacantesGraficaPAComponent implements OnInit {
  @Input('EstadoVacante') EstadoVacante: any;

  private UsuarioId: string;

  //scroll
  disabled = false;
  compact = false;
  invertX = false;
  invertY = false;
  shown = 'hover';

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

  constructor(private _ComponentService: ComponentsService) { }

  public rows: Array<any> = [];
  public columns: Array<any> = [
    { title: 'Folio', sorting: 'desc', className: 'text-success text-center', name: 'folio', filtering: { filterString: '', placeholder: 'Folio' } },
    { title: 'Cliente', className: 'text-info text-center', name: 'cliente', filtering: { filterString: '', placeholder: 'Cliente' } },
    { title: 'Perfil', className: 'text-info text-center', name: 'vBtra', filtering: { filterString: '', placeholder: 'Perfil' } },
    { title: 'No. Vacantes', className: 'text-info text-center', name: 'vacantes', filtering: { filterString: '', placeholder: 'No. Vacantes' } },
    { title: 'Tipo Recl.', className: 'text-info text-center', name: 'tipoReclutamiento', filtering: { filterString: '', placeholder: 'Tipo' } },
    { title: 'Creación', className: 'text-info text-center', name: 'fch_Creacion', filtering: { filterString: '', placeholder: 'aaaa-mm-dd' } },
    { title: 'Fecha Cump.', className: 'text-info text-center', name: 'fch_Cumplimiento', filtering: { filterString: '', placeholder: 'aaaa-mm-dd' } },
    { title: 'Estatus', className: 'text-info text-center', name: 'estatus', filtering: { filterString: '', placeholder: 'Estatus' } },
    { title: 'Prioridad', className: 'text-info text-center', name: 'prioridad', filtering: { filterString: '', placeholder: 'Prioridad' } },
    { title: 'Propietario', className: 'text-info text-center', name: 'propietario', filtering: { filterString: '', placeholder: 'Propietario' } }
  ];

  ngOnInit() {
    this.UsuarioId = sessionStorage.getItem('id');
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.UsuarioId = sessionStorage.getItem('id');
    // if (changes.EstadoVacante && !changes.EstadoVacante.isFirstChange()) {
      this.getRequisiciones();
    // }
  }

  getRequisiciones() {
    this._ComponentService.getRequiGraficaPA(this.EstadoVacante, this.UsuarioId ).subscribe(data => {
      this.dataSource = data;
      this.onChangeTable(this.config);
    }, error => this.errorMessage = <any>error);
  }

  public config: any = {
    paging: true,
    //sorting: { columns: this.columns },
    filtering: { filterString: '' },
    className: ['table-hover  mb-0']
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

    this.rows = this.dataSource;
    let filteredData = this.changeFilter(this.dataSource, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
    this.registros = this.rows.length;
  }

}
