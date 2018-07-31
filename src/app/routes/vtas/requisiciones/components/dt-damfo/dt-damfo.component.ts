import { ActivatedRoute, Router } from '@angular/router';
import { BodyOutputType, Toast, ToasterConfig, ToasterService } from 'angular2-toaster/angular2-toaster';
import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatTableDataSource, PageEvent} from '@angular/material';

import { DialogdamfoComponent } from '../dialogdamfo/dialogdamfo.component'
import { NgxSpinnerService } from 'ngx-spinner';
import { RequisicionesService } from '../../../../../service/index';

//Components


//Servicios


@Component({
  selector: 'app-dt-damfo',
  templateUrl: './dt-damfo.component.html',
  styleUrls: ['./dt-damfo.component.scss'],
  providers: [RequisicionesService]
})
export class DtDamfoComponent implements OnInit {

  constructor(
    private service: RequisicionesService,
    private dialog: MatDialog,
    private _Router: Router,
    private _Route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toasterService: ToasterService
  ) {}
  //Configuracion de mensaje.
  toaster: any;
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right',
    limit: 7,tapToDismiss: false,
    showCloseButton: true,
    mouseoverTimerStop: true,
  });
  //Crear el mensaje
   popToast(type, title, body ) {

     var toast : Toast = {
       type: type,
       title: title,
       timeout:5000,
       body: body
     }
     this.toasterService.pop(toast);
   }


  //Varaibales Globales
  damfo: any;
  arrayDamfo: any[];
  public dataSource: MatTableDataSource<any[]>;

  ngOnInit() {
    /** spinner starts on init */
    this.spinner.show();
    this.service.getDamgo290().subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.damfo = data;
        this.arrayDamfo = data;
        // this.pageCount = Math.round(this.damfo.length / this.rows);
        // this.TotalRecords = this.damfo.length;
        // this.paginador();
        this.spinner.hide();
      });
  }
  showDamfo(id){
    //mandamos la información por medio de la URL sin que esta se muestre en la liga.
    this._Router.navigate(['/ventas/visualizarDamfo290', id], {skipLocationChange:true});
  }

  openDialog(element){
    let dialogRef = this.dialog.open(DialogdamfoComponent,{
      width: '50%',
      height: 'auto',
      data: element
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

//*******************************-- GRID-- *********************************************//
  // // Paginador.
  // length = 0;
  // pageSize = 10;
  // pageSizeOptions = [10, 30, 50];

  // rows: number = 10;
  // first: number = 0;
  // page: number = 1;
  // pageCount: number = 0;
  // TotalRecords: number = 0;
  // paginate(event?: PageEvent){
  //     if(event.length > event.pageSize )
  //     {
  //       this.first = event.pageIndex;
  //       this.rows = event.pageSize;
  //       this.page = event.pageIndex;
  //       this.pageCount = event.length;
  //     }
  //     else{
  //       this.rows = event.length;
  //     }
  //     this.paginador();
  // }

  // paginador(){
  //     if (this.page < this.pageCount) {
  //         this.damfo = new Array(this.rows);
  //         for (var i = 0; i < this.rows; i++) {
  //             this.damfo[i] = this.arrayDamfo[this.first + i];
  //         }
  //     }
  //     else {
  //         let length = this.arrayDamfo.length - this.first;
  //         this.damfo = new Array(length);
  //         for (var i = 0; i < length; i++) {
  //             this.damfo[i] = this.arrayDamfo[this.first + i];
  //         }
  //     }
  //     this.dataSource =  new MatTableDataSource(this.damfo);
  // }
  //termina paginador

  // Display para mostrar los objetos en el Grid
  displayedColumns = [
    'cliente',
    'nombrePerfil',
    'empresa',
    'reclutamiento',
    'sueldoMinimo',
    'sueldoMaximo',
    'fch_Creacion',
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
  cliente: string;
  nombrePerfil: string;
  giroEmpresa: string;
  actividadEmpresa: string;
  tipoReclutamiento: string;
  claseReclutamiento: string;
  sueldoMinimo: string;
  sueldoMaximo: string;
  fch_Creacion: string;
}
