import { Component, EventEmitter, Input, OnInit, Output, AfterViewInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CandidatosService } from './../../service/Candidatos/candidatos.service';
import { SettingsService } from '../../core/settings/settings.service';
import { ExcelService } from '../../service/ExcelService/excel.service';

declare var $: any;

@Component({
  selector: 'app-dt-mis-candidatos',
  templateUrl: './dt-mis-candidatos.component.html',
  styleUrls: ['./dt-mis-candidatos.component.scss'],
  providers: [CandidatosService, DatePipe]
})
export class DtMisCandidatosComponent implements OnInit, AfterViewInit {
  @Output('CandidatoId') CandidatoId: EventEmitter<any> = new EventEmitter<any>();
  disabled = false;
  compact = false;
  invertX = false;
  invertY = false;
  shown = 'hover';

  public dataSource: Array<any> = [];
  // Varaibles del paginador
  public page = 1;
  public itemsPerPage = 20;
  public maxSize = 5;
  public numPages = 1;
  public length = 0;

  selected = false;
  rowAux = [];

  showFilterRow: boolean;
  registros: number;
  errorMessage: any;
  element: any = {};

  ReclutadorId: string;
  public rows: Array<any> = [];
  public columns: Array<any> = [
    { title: 'Folio', className: 'text-success text-center', name: 'folio', filtering: { filterString: '', placeholder: 'Folio' } },
    { title: 'Estatus', className: 'text-info text-center', name: 'estatus', filtering: { filterString: '', placeholder: 'Estatus' } },
    { title: 'Vacante', className: 'text-info text-center', name: 'vBtra', filtering: { filterString: '', placeholder: 'Vacante' } },
    { title: 'Nombre Candidato', className: 'text-info text-center', name: 'nombre', filtering: { filterString: '', placeholder: 'Nombre' } },
    { title: 'Área Experiencia', className: 'text-info text-center', name: 'areaExp', filtering: { filterString: '', placeholder: 'Experiencia' } },
    { title: 'Área Interes', className: 'text-info text-center', name: 'areaInt', filtering: { filterString: '', placeholder: 'Interes' } },
    { title: 'Localidad', className: 'text-info text-center', name: 'localidad', filtering: { filterString: '', placeholder: 'Localidad' } },
    { title: 'Sueldo Aceptable', className: 'text-info text-center', name: 'sueldoMinimo', filtering: { filterString: '', placeholder: 'Sueldo aceptable' } },
    { title: 'Fecha Nacimiento', className: 'text-info text-center', name: 'edad', filtering: { filterString: '', placeholder: 'Fecha Nacimiento' } },
    { title: 'CURP', className: 'text-success text-center', name: 'curp', filtering: { filterString: '', placeholder: 'CURP' } },
    { title: 'RFC', className: 'text-success text-center', name: 'rfc', filtering: { filterString: '', placeholder: 'RFC' } },
  ];
  public config: any = {
    paging: true,
    filtering: { filterString: '' },
    className: ['table-hover mb-0']
  };
  constructor(
    private service: CandidatosService,
    private settings: SettingsService,
    private excelService: ExcelService,
    private pipe: DatePipe) {
    this.ReclutadorId = this.settings.user['id'];
    this.misCandidatos();
   }

  ngOnInit() {
    // this.ReclutadorId = this.settings.user['id'];
    // this.onChangeTable(this.config);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.onChangeTable(this.config);
    }, 1500);
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

  public getCleanedString(cadena: string) : string
{
  cadena = cadena.replace(/á/gi,"a");
  cadena = cadena.replace(/é/gi,"e");
  cadena = cadena.replace(/í/gi,"i");
  cadena = cadena.replace(/ó/gi,"o");
  cadena = cadena.replace(/ú/gi,"u");
  cadena = cadena.replace(/ñ/gi,"n");

  return cadena;
}
  public changeFilter(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.showFilterRow = true;
    this.columns.forEach((column: any) => {
      if (column.filtering.filterString != "") {
  
        filteredData = filteredData.filter((item: any) => {
          if (item[column.name] != null){

          let itemAux = this.getCleanedString(item[column.name].toString().toLowerCase());
          let itemAux2 = this.getCleanedString(column.filtering.filterString.toLowerCase());

          if(itemAux.match(itemAux2))
          {
            return item;
          }
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

  public onCellClick(data: any): any {
    data.selected ? data.selected = false : data.selected = true;
    let index = this.dataSource.indexOf(data.row);
    this.element = data;
    if (!data.selected) {
      this.selected = false;
    } else {
      this.selected = true;
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

  public getCandidato(event) {
    this.CandidatoId.emit(event);
  }

  public misCandidatos() {
    this.service.getMisCandidatos(this.ReclutadorId).subscribe(data => {
      this.dataSource = data;
    });
  }

  public refreshTable() {
    this.misCandidatos();
    setTimeout(() => {
      // this.columns.forEach(element => {
      //   element.filtering.filterString = '';
      //  (<HTMLInputElement>document.getElementById(element.name)).value = '';
      // });
      this.registros = 0;
      this.onChangeTable(this.config);
    }, 800);
  }

  public clearfilters() {
    this.columns.forEach(element => {
      element.filtering.filterString = '';
     (<HTMLInputElement>document.getElementById(element.name + 'v')).value = '';
    });
    this.onChangeTable(this.config);
  }
  exportAsXLSX() {
    if (this.dataSource.length > 0) {
      const aux = [];
      this.dataSource.forEach(row => {
        const edad = this.pipe.transform(new Date(row.edad), 'dd/MM/yyyy');

        aux.push({
          ESTATUS: row.estatus,
          NOMBRE: row.nombre,
          'ÁREA EXPERIENCIA': row.areaExp,
          'ÁREA INTERES': row.vBtra,
          'SUELDO ACEPTABLE': row.sueldoMinimo.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
          'FECHA NACIMIENTO': edad,
          'CURP': row.curp,
          'RFC': row.rfc,
        });
      });

      //    })
      //  })
      this.excelService.exportAsExcelFile(aux, 'Resultado_Busqueda_Candidatos');
    }
  }
}
