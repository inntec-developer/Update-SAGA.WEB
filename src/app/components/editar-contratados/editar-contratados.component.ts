
import { CandidatosService } from './../../service/Candidatos/candidatos.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ExcelService } from '../../service/ExcelService/excel.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-editar-contratados',
  templateUrl: './editar-contratados.component.html',
  styleUrls: ['./editar-contratados.component.scss'],
  providers: [CandidatosService]
})
export class EditarContratadosComponent implements OnInit {

  form: FormGroup;

  public dataSource: Array<any> = [];
  editing = {};
  areas = [];
  medios = [];

  areasId: any = 0;
  mediosId: any = 0;

  // Varaibles del paginador
  public page: number = 1;
  public itemsPerPage: number = 20;
  public maxSize: number = 5;
  public numPages: number = 1;
  public length: number = 0;

  // variables tabla
  showFilterRow: boolean;
  registros: number;
  public rows: Array<any> = []
  public columns: Array<any> = [
    { title: 'Folio', className: 'text-primary', name: 'folio', filtering: { filterString: '', placeholder: 'Folio' } },
    { title: 'CURP', className: 'text-success', name: 'curp', filtering: { filterString: '', placeholder: 'CURP' } },
    { title: 'Nombre', className: 'text-primary', name: 'nombre', filtering: { filterString: '', placeholder: 'Nombre' } },
    { title: 'Apellido Paterno', className: 'text-primary', name: 'apellidoPaterno', filtering: { filterString: '', placeholder: 'Apellido Paterno' } },
    { title: 'Apellido Materno', className: 'text-primary', name: 'apellidoMaterno', filtering: { filterString: '', placeholder: 'Apellido Materno' } },
    { title: 'Area de reclutamiento', className: 'text-primary', name: 'areaReclutamiento', filtering: { filterString: '', placeholder: 'Area reclutamiento' } },
    { title: 'Fuente de reclutamiento', className: 'text-primary', name: 'fuenteReclutamiento', filtering: { filterString: '', placeholder: 'Fuente reclutamiento' } },
    { title: 'Sueldo', className: 'text-primary text-center', name: 'sueldoMinimo', filtering: { filterString: '', placeholder: 'Sueldo' } },
    { title: 'Usuario', className: 'text-primary', name: 'usuario', filtering: { filterString: '', placeholder: 'Usuario' } },
    { title: 'Fecha', className: 'text-primary', name: 'fecha', filtering: { filterString: '', placeholder: 'Fecha' } }
  ]

  public config: any = {
    paging: true,
    //sorting: { colums: this.columns },
    filtering: { filterString: '' },
    className: ['table-striped mb-0 d-table-fixed']
  }


  constructor( private service: CandidatosService,  
               private dialogEditar: MatDialogRef<EditarContratadosComponent>,  
               @Inject(MAT_DIALOG_DATA) public data: any, 
               private excelService: ExcelService, 
               private fb: FormBuilder ) { 

                this.form = this.fb.group({
                  curp: ['', Validators.compose([Validators.required, Validators.minLength(10)]) ]
                });

               }

  ngOnInit() {
    this.GetAreas();
    this.GetMedios();
  }

  //configuraciones de la tabla


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
  }

//configuraciones de la tabla
//////////////////

GetAreas()
{
  this.service.GetAreasRecl().subscribe(result => {
    this.areas = result;
  })
}

GetMedios()
{
  this.service.GetMediosRecl().subscribe(result => {
    this.medios = result;
  })
}
updateValue(event, cell, rowIndex)
{
  if (cell === "areaReclutamiento")
  {
    this.data[rowIndex]['areaReclutamiento'] = event.source.selected.viewValue;
    this.data[rowIndex]['areaReclutamientoId'] = event.value;
  }
  else if (cell === "fuenteReclutamiento")
  {
    this.data[rowIndex]['fuenteReclutamiento'] = event.source.selected.viewValue;
    this.data[rowIndex]['fuenteReclutamientoId'] = event.value;
  }
  else if(event.target.value !== '')
  {
    this.data[rowIndex][cell] = event.target.value;
  }
  else
  {
    this.data[rowIndex][cell] = this.data[rowIndex][cell];
  }

  this.editing[rowIndex + '-' + cell] = false;
  this.data = [...this.data];
}
UpdateData(form)
{

  console.log(form.value)

}

exportAsXLSX():void {

  var aux = [];

  this.data.forEach(element => {
    var d = new Date(element.fecha)
    aux.push( {
      FOLIO: element.folio,
      CURP: element.curp,
      NOMBRE: element.nombre,
      APELLIDO_PATERNO: element.apellidoPaterno,
      APELLIDO_MATERNO: element.apellidoMaterno,
      FUENTE_DE_RECLUTAMIENTO: element.fuenteReclutamiento,
      AREA_RECLUTAMIENTO: element.areaReclutamiento,
      SUELDO: element.sueldoMinimo,
      USUARIO: element.usuario,
      FECHA: d.getDate() + '/' + ( d.getMonth() + 1) + '/' +  d.getFullYear()
    });
  });


  this.excelService.exportAsExcelFile(aux, 'sample');
}

}
