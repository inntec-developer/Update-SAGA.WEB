import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ClientesService } from '../../../../../service/clientes/clientes.service';
import { NgxSpinnerService } from 'ngx-spinner';

declare var $: any;

@Component({
  selector: 'app-dt-prospectos',
  templateUrl: './dt-prospectos.component.html',
  styleUrls: ['./dt-prospectos.component.scss'],
  providers: [ClientesService]
})
export class DtProspectosComponent implements OnInit {
  public dataSource: Array<any> = [];
  errorMessage: any;
  showFilterRow: boolean;
  // Varaibles del paginador
  public page: number = 1;
  public itemsPerPage: number = 20;
  public maxSize: number = 5;
  public numPages: number = 1;
  public length: number = 0;
  registros: number;
  mouseEvent: boolean;
  ProspectoId: any;

  constructor(
    private _Route: ActivatedRoute,
    private _service: ClientesService,
    private spinner: NgxSpinnerService
  ) { }
  ngOnInit() {
    this.spinner.show();
    this.getProspectos();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      
      this.onChangeTable(this.config);
    }, 1500);
  }

  getProspectos() {
    this._service.getProspectos().subscribe(data => {
      
      this.dataSource = data;
    }, error => this.errorMessage = <any>error);
  };

  /* Configuración de tabla */
  public rows: Array<any> = [];
  public columns: Array<any> = [
    { title: 'Nombre Comercial', sorting: 'desc', className: 'text-success text-center', name: 'nombrecomercial', filtering: { filterString: '', placeholder: 'Nombre' } },
    { title: 'Giro', className: 'text-info text-center', name: 'giroEmpresa', filtering: { filterString: '', placeholder: 'Giro' } },
    { title: 'Actividad', className: 'text-info text-center', name: 'actividadEmpresa', filtering: { filterString: '', placeholder: 'Actividad' } },
    { title: 'Tamano', className: 'text-info text-center', name: 'tamanoEmpresa', filtering: { filterString: '', placeholder: 'Tamaño' } },
    { title: 'Empleados', className: 'text-info text-center', name: 'numeroEmpleados', filtering: { filterString: '', placeholder: 'No. Empleados' } },
    { title: 'Clasificación', className: 'text-info text-center', name: 'clasificacion', filtering: { filterString: '', placeholder: 'Calsificación' } },
    { title: 'TipoEmpresa', className: 'text-info text-center', name: 'tipoEmpresa', filtering: { filterString: '', placeholder: 'Tipo' } },
  ];
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
    this.registros = this.dataSource.length;
    this.rows = this.dataSource;
    let filteredData = this.changeFilter(this.dataSource, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
    this.spinner.hide();
  }

  /* Funciones secundarias */
  onCellClick(row: any){
    this.ProspectoId = row.id;
    console.log(this.ProspectoId)
    $('#prospectosDataTable').on('click', 'tr', function (event: any) {
      //noinspection TypeScriptUnresolvedFunction
      $(this).addClass('selected').siblings().removeClass('selected');
    });
  }

}
