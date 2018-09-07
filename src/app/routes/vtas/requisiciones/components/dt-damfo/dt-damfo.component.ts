import { ActivatedRoute, Router } from '@angular/router';
import { BodyOutputType, Toast, ToasterConfig, ToasterService } from 'angular2-toaster';
import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatTableDataSource, PageEvent} from '@angular/material';

import { DialogdamfoComponent } from '../dialogdamfo/dialogdamfo.component'
import { NgxSpinnerService } from 'ngx-spinner';
import { RequisicionesService } from '../../../../../service';
import { element } from 'protractor';

declare var $: any;

@Component({
  selector: 'app-dt-damfo',
  templateUrl: './dt-damfo.component.html',
  styleUrls: ['./dt-damfo.component.scss'],
  providers: [RequisicionesService]
})
export class DtDamfoComponent implements OnInit {
  //Varaibales Globales
  public dataSource : Array<any> = [];
  Vacantes: number = 0;

  // Varaibles del paginador
  public page: number = 1;
  public itemsPerPage: number = 20;
  public maxSize: number = 5;
  public numPages: number = 1;
  public length: number = 0;

  showFilterRow: boolean;
  registros: number;
  errorMessage: any;
  element: any;
  damfoId: any;

  constructor(
    private service: RequisicionesService,
    private dialog: MatDialog,
    private _Router: Router,
    private _Route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toasterService: ToasterService
  ) {}
  

  

  ngOnInit() {
     /** spinner starts on init */
    this.spinner.show();
    setTimeout(() => {
      this.onChangeTable(this.config);
    }, 300); 
  }

  public rows: Array<any> = [];
  public columns: Array<any> = [
      {title: 'Cliente', className: 'text-info text-center', name: 'cliente', filtering: { filterString: '', placeholder: 'Cliente' } },
      {title: 'Perfil', className: 'text-info text-center', name: 'nombrePerfil', filtering: { filterString: '', placeholder: 'Perfil' }},
      {title: 'No. Vacantes', className: 'text-info text-center', name: 'vacantes', filtering: { filterString: '', placeholder: 'No. Vacantes' }},
      {title: 'Sueldo Mínimo', className: 'text-info text-center', name: 'sueldoMinimo', filtering: { filterString: '', placeholder: 'Sueldo Min' }},
      {title: 'Sueldo Máximo', className: 'text-info text-center', name: 'sueldoMaximo', filtering: { filterString: '', placeholder: 'Sueldo Max' }},
      {title: 'Tipo Recl.', className: 'text-info text-center',name:'tipoReclutamiento', filtering: { filterString: '', placeholder: 'Tipo Recl.' }},
      {title: 'Clase Recl.', className: 'text-info text-center', name:'claseReclutamiento', filtering: { filterString: '', placeholder: 'Clase Recl.' }},
      {title: 'Creación', className: 'text-info text-center',name:'fch_Creacion', filtering: { filterString: '', placeholder: 'aaaa-mm-dd' }}
  ];

  public config: any = {
    paging: true,
    sorting: { columns: this.columns },
    filtering: { filterString: '' },
    className: ['table-striped mb-0']
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
            return sort === '' ? -1 : 1;
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
          if(item[column.name] == null){
            flag = true;
          }else{
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
    this.service.getDamgo290().subscribe(data => {
      this.dataSource = data;
      console.log(this.dataSource);
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
    this.damfoId = data.id
    /* add an class 'active' on click */
    $('#resultDataTable').on('click', 'tr', function (event: any) {
        //noinspection TypeScriptUnresolvedFunction
        $(this).addClass('selected').siblings().removeClass('selected');
    });
  }

  /*
  * Funciones para la administracion del 290
  * */
  showDamfo(){
    //mandamos la información por medio de la URL sin que esta se muestre en la liga.
    if(this.damfoId){
      this._Router.navigate(['/ventas/visualizarDamfo290', this.damfoId], {skipLocationChange:true});
    }
  }

  openDialog(){
    if(this.element){
      let dialogRef = this.dialog.open(DialogdamfoComponent,{
        width: '50%',
        height: 'auto',
        data: this.element
      });
    }
  }
  /*
  * Creacion de mensajes
  * */
 toaster: any;
 toasterConfig: any;
 toasterconfig: ToasterConfig = new ToasterConfig({
   positionClass: 'toast-bottom-right',
   limit: 7,tapToDismiss: false,
   showCloseButton: true,
   mouseoverTimerStop: true,
 });
  popToast(type, title, body ) {

    var toast : Toast = {
      type: type,
      title: title,
      timeout:5000,
      body: body
    }
    this.toasterService.pop(toast);
  }

}

