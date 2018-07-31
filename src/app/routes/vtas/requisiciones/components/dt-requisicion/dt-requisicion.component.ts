import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BodyOutputType, Toast, ToasterConfig, ToasterService } from 'angular2-toaster/angular2-toaster';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource, PageEvent} from '@angular/material';

import { DialogActivarRequiComponent } from './../dialog-activar-requi/dialog-activar-requi.component';
import { DialogCancelRequiComponent } from './../dialog-cancel-requi/dialog-cancel-requi.component';
import { DialogDeleteRequiComponent } from '../dialog-delete-requi/dialog-delete-requi.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { RequisicionesService } from '../../../../../service/index';
import { tap } from '../../../../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-dt-requisicion',
  templateUrl: './dt-requisicion.component.html',
  styleUrls: ['./dt-requisicion.component.scss'],
  providers: [RequisicionesService]
})

export class DtRequisicionComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // Variables Globales
  requisicion: any;
  arrayRequisicion: any[];
  public dataSource = new MatTableDataSource(<any>[]);
  public textBtnAdd: string;
  Vacantes: number = 0;

  constructor(
    private service: RequisicionesService,
    private dialog: MatDialog,
    private _Router: Router,
    private _Route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toasterService: ToasterService

  ) {
    this.textBtnAdd = 'Nueva Requisicion';
   }
  // Configuracion de mensaje.
  toaster: any;
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right',
    limit: 7,tapToDismiss: false,
    showCloseButton: true,
    mouseoverTimerStop: true,
  });
  // Creacion de mensaje
  popToast(type, title, body){
    var toast: Toast = {
      type: type,
      title: title,
      timeout: 5000,
      body: body
    }
    this.toasterService.pop(toast);
  }

  ngOnInit() {
    /** spinner starts on init */
    this.spinner.show();
    this.getDateRequisiciones();
    this.dataSource
  }

  getDateRequisiciones(){
    this.service.getRequisiciones(localStorage.getItem('usuario')).subscribe(data => {
      this.requisicion = data;
      this.dataSource =  new MatTableDataSource(this.requisicion);
      this.arrayRequisicion = this.requisicion;
      // this.pageCount = Math.round(this.requisicion.length / this.rows);
      // this.TotalRecords = this.requisicion.length
      // this.paginador();
      this.spinner.hide();

    });
  }

  showRequi(id, folio){
    this._Router.navigate(['/ventas/visualizarRequisicion/', id, folio], {skipLocationChange:true});
  }

  editRequi(id, folio){
    this._Router.navigate(['/ventas/edicionRequisicion/', id, folio], {skipLocationChange:true});
  }

  openDialogDelete(element){
    let dialogDlt = this.dialog.open(DialogDeleteRequiComponent,{
      width: '25%',
      height: 'auto',
      data: element
    });
    var window : Window
    dialogDlt.afterClosed().subscribe(result => {
      this.getDateRequisiciones();
    });
  }

  openDialogCancel(element){
    let dialogCnc = this.dialog.open(DialogCancelRequiComponent, {
      width: '25%',
      height: 'auto',
      data: element
    });
    var window : Window
    dialogCnc.afterClosed().subscribe(result => {
        this.getDateRequisiciones();
    })
  }

  openDialogReActivar(element){
    let dialogCnc = this.dialog.open(DialogActivarRequiComponent, {
      width: '25%',
      height: 'auto',
      data: element
    });
    var window : Window
    dialogCnc.afterClosed().subscribe(result => {
        this.getDateRequisiciones();
    })
  }

  ngAfterViewInit(){
  }


  //*******************************-- GRID-- *********************************************//
  // // Paginador.
  // length = 0;
  // pageSize = 10;
  // pageSizeOptions = [1,5,10, 30, 50]

  // pageEvent: PageEvent;

  // rows: number = 10;
  // first: number = 0;
  // page: number = 1;
  // pageCount: number = 0;
  // TotalRecords: number = 0;
  

  // paginate(event?: PageEvent){
  //   if(event.length > event.pageSize ){
  //     this.first = event.pageIndex;
  //     this.rows = event.pageSize;
  //     this.page = event.pageIndex;
  //     this.pageCount = event.length;
  //   }else{
  //     this.rows = event.length;
  //   }
  //   this.paginador();
  // }

  // paginador() {
  //   if(this.page < this.pageCount){
  //     this.requisicion = new Array(this.rows);
  //     for(var i = 0; i < this.rows; i++){
  //       this.requisicion[i] = this.arrayRequisicion[this.first + i];
  //     }
  //   }
  //   else{
  //     let length = this.arrayRequisicion.length - this.first;
  //     this.requisicion = new Array(length);
  //     for (var i = 0; i < length; i++) {
  //         this.requisicion[i] = this.arrayRequisicion[this.first + i];
  //     }
  //   }
  //   this.dataSource = new MatTableDataSource(this.requisicion);
  // }
  // Termino de Paginador


  // Display para mostrar los objetos en el Grid
  private _displayedColumns = [
    'folio',
    'cliente',
    'vBtra',
    'vacantes',
    'reclutamiento',
    'sueldoMinimo',
    'sueldoMaximo',
    'fch_Creacion',
    'fch_Cumplimiento',
    'estatus',
    'prioridad',
    'accion'
  ];
  public get displayedColumns() {
    return this._displayedColumns;
  }
  public set displayedColumns(value) {
    this._displayedColumns = value;
  }
  // Filtro dentro del Grid
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
export interface Element {
  folio: string;
  id: string;
  cliente: string;
  // rfc: string;
  vBtra: string;
  vacantes: number;
  tipoReclutamiento: string;
  claseReclutamiento: string;
  sueldoMinimo: string;
  sueldoMaximo: string;
  fch_Creacion: string;
  fch_Cumplimiento: string;
  estatus: number;
  prioridad: number;
}
