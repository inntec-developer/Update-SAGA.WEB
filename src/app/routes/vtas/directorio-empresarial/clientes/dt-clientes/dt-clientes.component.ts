import { Component, OnInit } from '@angular/core';

import { ClientesService } from './../../../../../service/clientes/clientes.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-dt-clientes',
  templateUrl: './dt-clientes.component.html',
  styleUrls: ['./dt-clientes.component.scss'],
  providers: [ClientesService],
})
export class DtClientesComponent implements OnInit {
  /* Configuración de Tabla */
  public rows: Array<any> = [];

  // scroll
  public disabled = false;
  public compact = false;
  public invertX = false;
  public invertY = false;
  public shown = 'hover';

  dataSource: Array<any> = [];
  public errorMessage: any;
  public showFilterRow: boolean;
  public clearFilter = false;
  public selected = false;

  /* Variables de Paginador */
  public page = 1;
  public itemsPerPage = 20;
  public maxSize = 5;
  public numPages = 1;
  public length = 0;

  public registros: number;
  public mouseEvent: boolean;
  public ClienteId: any;

  public rowAux = [];
  public element: any = null;
  public Loading: boolean;

  public config: any = {
    paging: true,
    filtering: { filterString: '' },
    className: ['table-hover mb-0']
  };
  public columns: Array<any> = [
    {
      title: 'RFC',
      sorting: 'desc',
      className: 'text-success text-center',
      name: 'rfc',
      filtering: { filterString: '', placeholder: 'RFC' }
    },
    {
      title: 'Razón Social',
      sorting: 'desc',
      className: 'text-success text-center',
      name: 'razonSocial',
      filtering: { filterString: '', placeholder: 'Razón Social' }
    },
    {
      title: 'Nombre Comercial',
      sorting: 'desc',
      className: 'text-success text-center',
      name: 'nombrecomercial',
      filtering: { filterString: '', placeholder: 'Nombre' }
    },
    {
      title: 'Giro',
      className: 'text-info text-center',
      name: 'giroEmpresa',
      filtering: { filterString: '', placeholder: 'Giro' }
    },
    {
      title: 'Actividad',
      className: 'text-info text-center',
      name: 'actividadEmpresa',
      filtering: { filterString: '', placeholder: 'Actividad' }
    },
    {
      title: 'Tamaño',
      className: 'text-info text-center',
      name: 'tamanoEmpresa',
      filtering: { filterString: '', placeholder: 'Tamaño' }
    },
    {
      title: 'Empleados',
      className: 'text-info text-center',
      name: 'numeroEmpleados',
      filtering: { filterString: '', placeholder: 'No. Empleados' }
    },
    {
      title: 'Clasificación',
      className: 'text-info text-center',
      name: 'clasificacion',
      filtering: { filterString: '', placeholder: 'Calsificación' }
    },
    {
      title: 'TipoEmpresa',
      className: 'text-info text-center',
      name: 'tipoEmpresa',
      filtering: { filterString: '', placeholder: 'Tipo' }
    },
  ];


  constructor(
    private _service: ClientesService,
    private _Router: Router,
  ) { }

  ngOnInit() {
    this.Loading = true;
    this.showFilterRow = true;
    this.getClientes();
  }

  getClientes() {
    this._service.getClientes().subscribe(data => {
      this.dataSource = data;
      this.onChangeTable(this.config);
    }, error => this.errorMessage = <any>error);
  }






  public changePage(page: any, data: Array<any> = this.dataSource): Array<any> {
    const start = (page.page - 1) * page.itemsPerPage;
    const end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data: any, config: any): any {
    if (!config.sorting) {
      return data;
    }

    const columns = this.config.sorting.columns || [];
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
          if (item[column.name] != null) {
            return item[column.name]
              .toString()
              .toLowerCase()
              .match(column.filtering.filterString.toLowerCase());
          }
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

    const tempArray: Array<any> = [];
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
    const filteredData = this.changeFilter(this.dataSource, this.config);
    // let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, filteredData) : filteredData;
    this.registros = this.rows.length;
    this.length = filteredData.length;
    this.Loading = false;
  }

  onCellClick(data: any) {
    data.selected ? data.selected = false : data.selected = true;
    this.element = data;

    if (!data.selected) {
      this.element = null;
      this.selected = false;
    } else {
      this.selected = true;
    }
    if (this.rowAux.length == 0) {
      this.rowAux = data;
    } else if (data.selected && this.rowAux != []) {
      const aux = data;
      data = this.rowAux;
      data.selected = false;
      aux.selected = true;
      this.rowAux = aux;
    }
  }

  refreshTable() {
    this.Loading = true;
    this.getClientes();
    setTimeout(() => {
      this.columns.forEach(element => {
        element.filtering.filterString = '';
      });
      this.onChangeTable(this.config);
    }, 500);
  }

  public clearfilters() {
    this.clearFilter = false;
    this.columns.forEach(element => {
      element.filtering.filterString = '';
      (<HTMLInputElement>document.getElementById(element.name)).value = '';
    });
    this.onChangeTable(this.config);
    if (!this.selected) {
      // this._reinciar();
    }
  }

  editarCliente() {
    this._Router.navigate(['/ventas/editarCliente', this.element['id']], { skipLocationChange: true });
  }
  visualizarCliente() {
    this._Router.navigate(['/ventas/visualizarCliente', this.element['id']], { skipLocationChange: true });
  }
}
