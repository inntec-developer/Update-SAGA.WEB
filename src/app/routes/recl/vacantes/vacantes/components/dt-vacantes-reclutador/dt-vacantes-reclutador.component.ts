import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';

import { DialogAssingRequiComponent } from './../dialogs/dialog-assing-requi/dialog-assing-requi.component';
import { DialogShowRequiComponent } from './../dialogs/dialog-show-requi/dialog-show-requi.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { RequisicionesService } from '../../../../../../service';
import { ToasterService } from 'angular2-toaster';
import { element } from 'protractor';

@Component({
  selector: 'app-dt-vacantes-reclutador',
  templateUrl: './dt-vacantes-reclutador.component.html',
  styleUrls: ['./dt-vacantes-reclutador.component.scss'],
  providers: [RequisicionesService]
})
export class DtVacantesReclutadorComponent implements OnInit {
  requi: { folio: any; id: any; };
  ruta: any;

  constructor(
    private service: RequisicionesService,
    private dialog: MatDialog,
    private _Router: Router,
    private _Route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toasterService: ToasterService,
    private activateRoute : ActivatedRoute
  ) {
    this.ruta = this.activateRoute.snapshot.routeConfig.data;
    localStorage.setItem('ruta', this.ruta.componente);
   }
  // Variables Globales
  requisicion: any;
  arrayRequisicion: any[];
  public dataSource = new MatTableDataSource(<any>[]);

  ngOnInit() {
    this.getDataRequisiciones();
  }

  getDataRequisiciones(){
    this.service.getRequiReclutador(localStorage.getItem('id')).subscribe(data => {
      this.requisicion = data;
      this.dataSource =  new MatTableDataSource(this.requisicion);
      this.arrayRequisicion = this.requisicion;
      this.spinner.hide();
      console.log(this.requisicion);
    });
  }

  // Dialogs
  openDialogShowRequi(id, folio){
      this.requi = {
        folio : folio,
        id : id
      }
      let dialogShow = this.dialog.open(DialogShowRequiComponent, {
        width: '1200px',
        height: '700px',
        data: this.requi
      });    
      
  }

  openDialogAssingRequi(element){
    let dialogAssing = this.dialog.open(DialogAssingRequiComponent, {
      width: '1200px',
      height: 'auto',
      data: element
    });   
    dialogAssing.afterClosed().subscribe(result => {
      this.getDataRequisiciones();
    })
  }

  openDesignVacante(id,folio,vBtra){
    this._Router.navigate(['/reclutamiento/configuracionVacante/', id, folio, vBtra], {skipLocationChange:true});
    // this._Router.navigate(['/reclutamiento/configuracionVacante'], { queryParams: { Requi: id, Folio: folio, VBtra: vBtra } });
  }

   // Display para mostrar los objetos en el Grid
   private _displayedColumns = [
    'folio',
    'solicita',
    'cliente',
    // 'rfc',
    'vBtra',
    'vacantes',
    'reclutamiento',
    'sueldoMinimo',
    'sueldoMaximo',
    'fch_Creacion',
    'fch_Cumplimiento',
    'estatus',
    'prioridad',
    'postulados',
    'enProceso',
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
  solicita: string;
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
  postulados: number;
  enProceso: number;
}

