import { Component, OnInit } from '@angular/core';
import { CatalogosService } from '../../../service/catalogos/catalogos.service';
import { ActivatedRoute,Router} from '@angular/router';
import {Http} from '@angular/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiConection } from '../../../service/api-conection.service';
import {MatTableDataSource} from '@angular/material';
import { window } from 'rxjs-compat/operator/window';

@Component({
  selector: 'app-oficinas',
  templateUrl: './oficinas.component.html',
  styleUrls: ['./oficinas.component.scss']
})
export class OficinasComponent implements OnInit {
 
  public datos : any[];
  public dataSource: MatTableDataSource<any[]>;

  constructor(
    private Servicio: CatalogosService,
    private spinner: NgxSpinnerService,
    private router : Router
  ) { }

  ngOnInit() {
    this.Servicio.getSucursales().subscribe(item =>{
    this.dataSource = item;
    this.datos = item;
      console.log(item);
    })
    document.oncontextmenu=null
  }

  displayedColumns = [
    'nombre',
    'tipoOficina',
    'Direccion',
    'latitud',
    'longitud',
   'telefono',
    'accion'
  ];

  // Filtro dentro del Grid
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}

export interface Element {
  id: string;
  nombre: string;
  latitud: string;
  longitud: string;
  tipoOficina: string;
  estado: string;
  municipio: string;
  colonia: string;
  calle: string;
  numeroExt: string;
  telefono: string;
  correo: string;
}


// disabled = false;
// compact = false;
// invertX = false;
// invertY = false;
// shown = 'hover';

// public datos: any[];
// public dataSource: Array<any> = [];
// public errorMessage: any;
// public showFilterRow: boolean;
// public clearFilter: boolean = false;
// selected: boolean = false;


// public rows: Array<any> = [];
// public columns: Array<any> = [
//   { title: 'Oficina', sorting: 'desc', className: 'text-success text-center', name: 'nombre', filtering: { filterString: '', placeholder: 'RFC' } },
//   // { title: 'Razón Social', sorting: 'desc', className: 'text-success text-center', name: 'razonSocial', filtering: { filterString: '', placeholder: 'Razon Social' } },
//   // { title: 'Nombre Comercial', sorting: 'desc', className: 'text-success text-center', name: 'nombrecomercial', filtering: { filterString: '', placeholder: 'Nombre' } },
//   // { title: 'Giro', className: 'text-info text-center', name: 'giroEmpresa', filtering: { filterString: '', placeholder: 'Giro' } },
//   // { title: 'Actividad', className: 'text-info text-center', name: 'actividadEmpresa', filtering: { filterString: '', placeholder: 'Actividad' } },
//   // { title: 'Tamano', className: 'text-info text-center', name: 'tamanoEmpresa', filtering: { filterString: '', placeholder: 'Tamaño' } },
//   // { title: 'Empleados', className: 'text-info text-center', name: 'numeroEmpleados', filtering: { filterString: '', placeholder: 'No. Empleados' } },
//   // { title: 'Clasificación', className: 'text-info text-center', name: 'clasificacion', filtering: { filterString: '', placeholder: 'Calsificación' } },
//   // { title: 'TipoEmpresa', className: 'text-info text-center', name: 'tipoEmpresa', filtering: { filterString: '', placeholder: 'Tipo' } },
// ];

// public config: any = {
//   paging: true,
//   filtering: {filterString: ''},
//   className: ['table-hover mb-0']
// }


// public changeSort(data: any, config: any): any {
//   if (!config.sorting) {
//     return data;
//   }
//   let columns = this.config.sorting.columns || [];
//   let columnName: string = void 0;
//   let sort: string = void 0;

//   for (let i = 0; i < columns.length; i++) {
//     if (columns[i].sort !== '' && columns[i].sort !== false) {
//       columnName = columns[i].name;
//       sort = columns[i].sort;
//     }
//   }
//   if (!columnName) {
//     return data;
//   }
//   // simple sorting
//   return data.sort((previous: any, current: any) => {
//     if (previous[columnName] > current[columnName]) {
//       return sort === 'desc' ? -1 : 1;
//     } else if (previous[columnName] < current[columnName]) {
//       return sort === 'asc' ? -1 : 1;
//     }
//     return 0;
//   });
// }

// public changeFilter(data: any, config: any): any {
//   let filteredData: Array<any> = data;
//   this.columns.forEach((column: any) => {
//     this.clearFilter = true;
//     if (column.filtering) {
//       this.showFilterRow = true;
//       filteredData = filteredData.filter((item: any) => {
//         if (item[column.name] != null)
//           return item[column.name].toString().toLowerCase().match(column.filtering.filterString.toLowerCase());
//       });
//     }
//   });
//   if (!config.filtering) {
//     return filteredData;
//   }

//   if (config.filtering.columnName) {
//     return filteredData.filter((item: any) =>
//       item[config.filtering.columnName].toLowerCase().match(this.config.filtering.filterString.toLowerCase()));
//   }

//   let tempArray: Array<any> = [];
//   filteredData.forEach((item: any) => {
//     let flag = false;
//     this.columns.forEach((column: any) => {
//       if (item[column.name] == null) {
//         flag = true;
//       } else {
//         if (item[column.name].toString().toLowerCase().match(this.config.filtering.filterString.toLowerCase())) {
//           flag = true;
//         }
//       }
//     });
//     if (flag) {
//       tempArray.push(item);
//     }
//   });
//   filteredData = tempArray;
//   return filteredData;
// }

// public clearfilters() {
//   this.clearFilter = false;
//   this.columns.forEach(element => {
//     element.filtering.filterString = '';
//     (<HTMLInputElement>document.getElementById(element.name)).value = '';
//   });
//   this.onChangeTable(this.config);
//   if (!this.selected) {
//     // this._reinciar();
//   }
// }

// public onChangeTable(config: any): any {

//   if (config.filtering) {
//     (<any>Object).assign(this.config.filtering, config.filtering);
//   }

//   if (config.sorting) {
//     (<any>Object).assign(this.config.sorting, config.sorting);
//   }
//   this.rows = this.dataSource;
//   let filteredData = this.changeFilter(this.dataSource, this.config);
//   let sortedData = this.changeSort(filteredData, this.config);
//   // this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
//   // this.registros = this.rows.length;
//   // this.length = sortedData.length;
//   // this.spinner.hide();
// }