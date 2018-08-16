import { ActivatedRoute, CanDeactivate, Router, } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { MatDialog } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { PostulateService } from '../../../../../../service/SeguimientoVacante/postulate.service';

declare var $: any;

@Component({
  selector: 'dt-candidatos-post',
  templateUrl: './dt-candidatos-post.component.html',
  styleUrls: ['./dt-candidatos-post.component.scss']
})
export class DtCandidatosPostComponent implements OnInit {
  @Input() VacanteId : any;
  public dataSource : Array<any> = [];
   // Varaibles del paginador
   public page: number = 1;
   public itemsPerPage: number = 20;
   public maxSize: number = 5;
   public numPages: number = 1;
   public length: number = 0;

  showFilterRow: boolean;
  registros: number;
  errorMessage: any;
  element: any = {};
  constructor(
    private service : PostulateService,
    private dialog: MatDialog,
    private _Router: Router,
    private spinner: NgxSpinnerService,
    private toasterService: ToasterService
  ) { }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.onChangeTable(this.config);
    }, 1500);
    
  }

  public rows: Array<any> = []
  public columns: Array<any> = [
    {title: 'Nombre candidato', className: 'text-info', name: 'nombre' , filtering: {filterString: '', placeholder: 'Nombre'} },
    {title: 'Área experiencia', className: 'text-info', name: 'areaExp', filtering: {filterString: '', placeholder: 'Experiencia'} },
    {title: 'Área interes', className: 'text-info' , name: 'areaInt' , filtering: {filterString: '', placeholder: 'Interes'} },
    {title: 'Localidad', className: 'text-info' , name: 'localidad' , filtering: {filterString: '', placeholder: 'Localidad'} },
    {title: 'Sueldo aceptable', className: 'text-info' , name: 'sueldoMinimo' , filtering: {filterString: '', placeholder: 'Sueldo aceptable'} },
    {title: 'Fecha nacimiento', className: 'text-info' , name: 'edad' , filtering: {filterString: '', placeholder: 'Interes'} },
    {title: 'CURP' , className: 'text-success' , name: 'curp', filtering: {filterString: '', placeholder: 'CURP'} },
    {title: 'RFC' , className: 'text-success', name: 'rfc' , filtering: {filterString: '', placeholder: 'RFC'} },
  ]

  public config: any = {
    paging: true,
    sorting: { colums: this.columns },
    filtering: { filterString: '' },
    className: [ 'table-striped table-bordered mb-0 d-table-fixed' ]
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
            // return sort === false ? -1 : 1;
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
              if(item[column.name] != null)
                return item[column.name].toString().match(column.filtering.filterString);
            });
        }
    });

    if (!config.filtering) {
        return filteredData;
    }

    if (config.filtering.columnName) {
        return filteredData.filter((item: any) =>
            item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    let tempArray: Array<any> = [];
    filteredData.forEach((item: any) => {
        let flag = false;
        this.columns.forEach((column: any) => {
          if(item[column.name] == null){
            flag = true;
          }else{
            if (item[column.name].toString().match(this.config.filtering.filterString)) {
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
    this.service.getPostulados(this.VacanteId).subscribe(data => {
      this.dataSource = data;
      this.registros = this.dataSource.length;
      this.rows = this.dataSource;
      let filteredData = this.changeFilter(this.dataSource, this.config);
      let sortedData = this.changeSort(filteredData, this.config);
      this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
      this.length = sortedData.length;
      this.spinner.hide();
    }, error => this.errorMessage = <any>error );
  }

  public onCellClick(data: any): any {
    let index = this.dataSource.indexOf(data.row);
    this.element = data;
    /* add an class 'active' on click */
    $('#resultDataTable').on('click', 'tr', function (event: any) {
        //noinspection TypeScriptUnresolvedFunction
        $(this).addClass('selected').siblings().removeClass('selected');
    });
  }

  /*
  * Funciones propias del componente.
  * */


   /*
  * Creacion de mensajes
  * */
 toaster: any;
 toasterConfig: any;
 toasterconfig: ToasterConfig = new ToasterConfig({
   positionClass: 'toast-bottom-right',
   limit: 7, tapToDismiss: false,
   showCloseButton: true,
   mouseoverTimerStop: true,
 });
 popToast(type, title, body) {
   var toast: Toast = {
     type: type,
     title: title,
     timeout: 5000,
     body: body
   }
   this.toasterService.pop(toast);
 }
}
