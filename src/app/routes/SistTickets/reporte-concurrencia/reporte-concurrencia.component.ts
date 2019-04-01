import { SistTicketsService } from './../../../service/SistTickets/sist-tickets.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reporte-concurrencia',
  templateUrl: './reporte-concurrencia.component.html',
  styleUrls: ['./reporte-concurrencia.component.scss']
})
export class ReporteConcurrenciaComponent implements OnInit {

  disabled = false;
  compact = false;
  invertX = true;
  invertY = true;

  shown = 'hover';

  public rows: Array<any> = [];

  reporte = [];

  // Varaibles del paginador
  public page: number = 1;
  public itemsPerPage: number = 20;
  public maxSize: number = 5;
  public numPages: number = 1;
  public length: number = 0;

  registros: any;
  showFilterRow: boolean = true;
  constructor(private _service: SistTicketsService) { }

  ngOnInit() {
    this.GetReporte();
  }

  public columns: Array<any> = [
    { title: 'Fecha', className: 'text-success text-center', name: 'fecha', filtering: { filterString: '',  placeholder: 'dd-mm-yyyy' } },
    { title: 'Hora Atención', className: 'text-info text-center', name: 'hora', filtering: { filterString: '', placeholder: 'HH:MM' } },
    { title: 'Usuario', className: 'text-info text-center', name: 'usuario', filtering: { filterString: '', placeholder: 'Usuario' } },
    { title: 'Modulo', className: 'text-info text-center', name: 'modulo', filtering: { filterString: '', placeholder: 'Modulo' } },
    { title: 'No. Turno', className: 'text-info text-center', name: 'turno', filtering: { filterString: '', placeholder: 'Turno' } },
    { title: 'Estatus', className: 'text-info text-center', name: 'estatus' },
    { title: 'Tiempo en Atencion', className: 'text-info text-center', name: 'tiempo', filtering: { filterString: '', placeholder: 'Tiempo' } }
  ];

  GetReporte()
  {


    this._service.GetConcurrenciaReporte().subscribe(result => {
      this.reporte = result;
      this.rows = this.reporte;
      this.onChangeTable(this.config);
console.log(this.rows)
    })
  }

  //#region filtros y paginador
  public config: any = {
    paging: true,
    //sorting: { columns: this.columns },
    filtering: { filterString: '' },
    className: ['table-hover  mb-0']
  };

  public changePage(page: any, data: Array<any> = this.reporte): Array<any> {
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

    this.registros = this.reporte.length;
    this.rows = this.reporte;
    let filteredData = this.changeFilter(this.reporte, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }
//#endregion



  public clearfilters() {
    this.columns.forEach(element => {
      element.filtering.filterString = '';
      (<HTMLInputElement>document.getElementById(element.name)).value = '';
    });
    this.onChangeTable(this.config);

  }

}
