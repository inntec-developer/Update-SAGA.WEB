import { ButtonsPostulacionesComponent } from './../buttons-postulaciones/buttons-postulaciones.component';

import {NgbCalendar, NgbDate, NgbDateStruct, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';

import { CandidatosService } from './../../service/Candidatos/candidatos.service';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ExcelService } from '../../service/ExcelService/excel.service';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-editar-contratados',
  templateUrl: './editar-contratados.component.html',
  styleUrls: ['./editar-contratados.component.scss'],
  providers: [CandidatosService, NgbDatepickerConfig, DatePipe]
})
export class EditarContratadosComponent implements OnInit {

  @Input('data') data;


  public dataSource: Array<any> = [];
  editing = {};
  areas = [];
  medios = [];
  areasId: any = 0;
  mediosId: any = 0;
  etiqueta = true;
  // Varaibles del paginador
  public page: number = 1;
  public itemsPerPage: number = 20;
  public maxSize: number = 5;
  public numPages: number = 1;
  public length: number = 0;

  modelCalendar: NgbDateStruct;
  date: {year: number, month: number};
  minDate: NgbDateStruct;
  // variables tabla
  showFilterRow: boolean;
  registros: number;
  public rows: Array<any> = []
  public columns: Array<any> = [
    { title: 'Folio', className: 'text-primary', name: 'folio', filtering: { filterString: '', placeholder: 'Folio' } },
    {  title: 'CURP', className: 'text-success', name: 'curp', filtering: { filterString: '', placeholder: 'CURP' } },
    { title: 'rfc', className: 'text-success', name: 'rfc', filtering: { filterString: '', placeholder: 'RFC' } },
    { title: 'nss', className: 'text-success', name: 'nss', filtering: { filterString: '', placeholder: 'NSS' } },
    { title: 'edad', className: 'text-primary', name: 'edad', filtering: { filterString: '', placeholder: 'Edad' } },
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
    private configCalendar: NgbDatepickerConfig,
               private excelService: ExcelService,
               private toasterService: ToasterService,
              //  @Inject(MAT_DIALOG_DATA) public data: any,
              private pipe: DatePipe,
              private btpostulaciones: ButtonsPostulacionesComponent
              ) {

                this.configCalendar.minDate = {year: 1960, month: 1, day: 1};
                 // days that don't belong to current month are not visible
                 this.configCalendar.outsideDays = 'hidden';
               }

  ngOnInit() {
    this.GetAreas();
    this.GetMedios();
this.GetContratadosInfo();
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

GetContratadosInfo()
{
  var candidatos= [];
  var contador = 0;
   this.data.forEach(element => {
    candidatos.push(element.candidatoId);
  });

  this.service.GetContratados(candidatos).subscribe(result =>{
   var aux = result.filter(element => {
     this.data.forEach(row => {
       if( row.candidatoId === element.candidatoId )
       {
          row.curp = element.curp;
          row.rfc = element.rfc;
          row.nss = element.nss;
          row.edad = element.edad;
          row.nombre = element.nombre;
          row.apellidoPaterno = element.apellidoPaterno;
          row.apellidoMaterno = element.apellidoMaterno;

          if(element.fch_Creacion == element.fch_Modificacion)
          {
            row.editCURP = false;
          }
          else
          {
            row.editCURP = true;
            contador++;
          }

          return;
      //  element.editCURP = true;
      }
    });

  })
  contador == this.data.length ? this.etiqueta = false : this.etiqueta = true;

  })
}

updateValue(event, cell, rowIndex)
{
  if (cell === "areaReclutamiento")
  {
    var nomslc = this.areas.find(x => x.id === event.target.value);

    this.data[rowIndex]['areaReclutamiento'] = nomslc.nombre;
    this.data[rowIndex]['areaReclutamientoId'] = event.target.value;
  }
  else if (cell === "fuenteReclutamiento")
  {
      this.medios.forEach( element => {
      var idx = element.medios.findIndex(x => x.tipoMediosId == event.target.value)
      if(idx > -1)
      {
        this.data[rowIndex]['fuenteReclutamiento'] = element.medios[idx]['tipoNombre'];
        return true;
      }
    });

    this.data[rowIndex]['fuenteReclutamientoId'] = event.target.value;
  }
  else if (cell === "edad")
  {
    var d = event;
    this.data[rowIndex][cell] = d.year + '-' + d.month + '-' + d.day;
  }
  else if(event.target.value !== '')
  {
    this.data[rowIndex][cell] = event.target.value;
  }
  else
  {
    this.data[rowIndex][cell] = '-';
  }

  this.editing[rowIndex + '-' + cell] = false;
  this.data = [...this.data];
}
UpdateData(row)
{

var data = {
     candidatoId: row.candidatoId,
     curp: row.curp,
     rfc: row.rfc,
     nss: row.nss,
     generoId: row.generoId,
     fechaNacimiento: row.edad,
     nombreCandidato: row.nombre,
     apellidoPaterno: row.apellidoPaterno,
     apellidoMaterno: row.apellidoMaterno,
     tipoMediosId: row.fuenteReclutamientoId,
     departamentoId: row.areaReclutamientoId,
     requisicionId: row.requisicionId,
     paisNacimiento: row.paisNacimiento,
     estadoNacimiento: row.estadoNacimiento,
     municipioNacimiento: row.municipioNacimiento,
     ReclutadorId: row.usuarioId
    }

this.service.UpdateContratados(JSON.stringify(data)).subscribe(result => {

  if(result == 201)
  {
    row.editCURP = true;
    row.classCURP = false;
    this.btpostulaciones.dataContratados = data;
    this.btpostulaciones.actualizoContratados = true;
    this.btpostulaciones.closeModal(2)
    this.popToast('success', 'Editar personal cubierto', 'Los datos se actualizaron con éxito');

  }
  else
  {
    this.btpostulaciones.actualizoContratados = false;
    this.popToast('error', 'Editar personal cubierto', 'Ocurrió un error al intentar actualizar');

  }
})

}

exportAsXLSX() {
  var aux = [];
  var flag = true;

  this.data.forEach(element => {
    if(!element.editCURP)
    {
      element.classCURP = true;
      this.etiqueta = true;
      this.popToast('error', 'Editar personal cubierto', 'Debes editar CURP para poder descargar archivo');

      return flag = false;
    }
    else
    {
      element.classCURP = false;
      this.etiqueta = false;
      var d = this.pipe.transform(new Date(element.fecha), 'yyyy-MM-dd');
      var e = this.pipe.transform(new Date(element.edad), 'yyyy-MM-dd');
      aux.push( {
        FOLIO: element.folio.toString(),
        CURP: element.curp,
        RFC: element.rfc,
        NSS: element.nss,
        'FECHA DE NACIMIENTO': e,
        NOMBRE: element.nombre,
        'APELLIDO PATERNO': element.apellidoPaterno,
        'APELLIDO MATERNO': element.apellidoMaterno,
        'FUENTE DE RECLUTAMIENTO': element.fuenteReclutamiento,
        'AREA RECLUTAMIENTO': element.areaReclutamiento,
        SUELDO: element.sueldoMinimo.toLocaleString('en-US', {style: 'currency', currency: 'USD'}),
        USUARIO: element.usuario,
        FECHA: d
      });
    }
  });

  if(flag)
  {
    this.excelService.exportAsExcelFile(aux, 'Personal_Contratado');
  }

}


/**
   * configuracion para mensajes de acciones.
   */
  toaster: any;
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right',
    limit: 7,
    tapToDismiss: false,
    showCloseButton: true,
    mouseoverTimerStop: true,
    preventDuplicates: true,
  });

  popToast(type, title, body) {
    var toast: Toast = {
      type: type,
      title: title,
      timeout: 4000,
      body: body
    }
    this.toasterService.pop(toast);

  }
}
