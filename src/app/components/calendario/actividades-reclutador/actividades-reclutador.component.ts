import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

import { log } from 'util';

@Component({
  selector: 'app-actividades-reclutador',
  templateUrl: './actividades-reclutador.component.html',
  styleUrls: ['./actividades-reclutador.component.scss']
})
export class ActividadesReclutadorComponent implements OnInit {
  @Input('Pendientes') Pendientes: any = [];
  @Input('Hoy') Hoy: any = [];
  @Input('Siguientes') Siguientes: any = [];
  @Output('Selected') Selected: EventEmitter<any> = new EventEmitter();

  /* Variables del Paginador */
  public page: number = 1;
  public itemsPerPage: number = 5;
  public maxSize: number = 5;


  public length_p: number = 0;
  public length_h: number = 0;
  public length_s: number = 0;

  registros_p: number;
  registros_h: number;
  registros_s: number;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.Pendientes != null) {
      setTimeout(() => {
        this.onChangeTablePendientes(this.config);
      }, 500);
    }
    if (changes.Hoy != null) {
      setTimeout(() => {
        this.onChangeTableHoy(this.config);
      }, 500);
    }
    if (changes.Siguientes != null) {
      setTimeout(() => {
        this.onChangeTableSiguientes(this.config);
      }, 500);
    }
  }

  

  /* Estructura y configuracion de tablas */
  public rows_p: Array<any> = [];
  public rows_h: Array<any> = [];
  public rows_s: Array<any> = [];
  public columns: Array<any> = [
    { title: 'Actividad', className: 'text-info text-center' },
    { title: 'Titulo', className: 'text-info text-center' },
    { title: 'Inicio', className: 'text-info text-center' },
    { title: 'Fin', className: 'text-info text-center' }
  ];

  public config: any = {
    paging: true,
    className: ['table-striped table-bordered mb-0 d-table-fixed']
  };

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

  /* Configuracion de pendientes*/
  public numPages_p: number = 0;

  public changePagePendientes(page: any, data: Array<any> = this.Pendientes): Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }
  public onChangeTablePendientes(config: any, page_p: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
    this.registros_p = this.Pendientes.length;
    this.rows_p = this.Pendientes;
    let filteredData = this.changeFilter(this.Pendientes, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows_p = page_p && config.paging ? this.changePagePendientes(page_p, sortedData) : sortedData;
    this.length_p = this.Pendientes.length;
  }

   /* Configuracion de Hoy*/
   public numPages_h: number = 0;

   public changePageHoy(page: any, data: Array<any> = this.Hoy): Array<any> {
     let start = (page.page - 1) * page.itemsPerPage;
     let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
     return data.slice(start, end);
   }
   public onChangeTableHoy(config: any, page_h: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
     this.registros_h = this.Hoy.length;
     this.rows_h = this.Hoy;
     let filteredData = this.changeFilter(this.Hoy, this.config);
     let sortedData = this.changeSort(filteredData, this.config);
     this.rows_h = page_h && config.paging ? this.changePageHoy(page_h, sortedData) : sortedData;
     this.length_h = this.Hoy.length;
   }

    /* Configuracion de Siguientes*/
    public numPages_s: number = 0;

    public changePageSiguientes(page: any, data: Array<any> = this.Siguientes): Array<any> {
      let start = (page.page - 1) * page.itemsPerPage;
      let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
      return data.slice(start, end);
    }
    public onChangeTableSiguientes(config: any, page_s: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
      this.registros_s = this.Siguientes.length;
      this.rows_s = this.Siguientes;
      let filteredData = this.changeFilter(this.Siguientes, this.config);
      let sortedData = this.changeSort(filteredData, this.config);
      this.rows_s = page_s && config.paging ? this.changePageHoy(page_s, sortedData) : sortedData;
      this.length_s = this.Siguientes.length;
    }


  public onCellClick(data: any): any {
    this.Selected.emit(data);
  }

}
