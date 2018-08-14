import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import {ToasterConfig, ToasterService} from 'angular2-toaster';

import { Apartado } from '../../../../models/recl/candidatos';
import { ApiConection } from '../../../../service/api-conection.service';
import { BusquedaComponent } from '../busqueda/busqueda.component';
import { CandidatosService } from '../../../../service';
import { Comentarios } from '../../../../models/recl/candidatos';
import { DialogcandidatosComponent } from './dialogcandidatos/dialogcandidatos.component';
import { element } from 'protractor';
import { forEach } from '@angular/router/src/utils/collection';

// Modelos


// Componentes



// Servicios


@Component({
  selector: 'app-dt-candidatos',
  templateUrl: './dt-candidatos.component.html',
  styleUrls: ['./dt-candidatos.component.scss'],
  providers: [CandidatosService]
})
export class DtCandidatosComponent implements OnInit, AfterViewInit, OnChanges {

  // Variables utilizadas. ***
  @Input('Filtrado') FCandidatos: any; //Datos que reciben del filtro. ***
  candidatodtl: any[];
  candidatos: any;
  arraycandidatos: any[];
  arrayvacantes: any[];
  expandir: boolean;
  Status: any;
  Reclutador: any;
  requisicionId: string;
  StatusId: any;
  tpcontrato: any;
  vacantes: any[];
  NumVacantes: number;
  NumPostulaciones: number;
  private toasterService: ToasterService;
  toaster: any;
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
      positionClass: 'toast-bottom-right',
      showCloseButton: true
  });
  timerest: number;

  // Objeto para el apartado de candidato. ***
  public Apartado: FormGroup;

  // Estructura de las tablas a mostrar. ***
  // Columnas de tabla de Vacantes. ***
  displayedColumnsVacantes = ['Folio','Vacante', 'FechaCreacion', 'Cliente', 'Reclutamiento', 'Area', 'Accion'];
  public dataSourcev = new MatTableDataSource(<any>[]);
  // Columnas de tabla de Postulaciones. ***
  displayedColumnsp = ['Vacante', 'Estatus'];
  public dataSourcep = new MatTableDataSource(<any>[]);
  // Columnas de tabla de candidatos. ***
  displayedColumns = ['Candidato','Experiencias', 'AreaInteres', 'Curp', 'Rfc', 'accion'];
  public dataSource = new MatTableDataSource(<any>[]);

  @ViewChild(MatSort) sort: MatSort;

  // Variable para el consecutivo del detalle del candidato. ***
  step = 0;
  ConexionBolsa: string; // asignamos la conexion de bolsa de trabajo que se encuentra en el ApiConection;
  fotoCandidato: any; // Asignamos la ruta en la que se encuentra la foto del candidato; 
  comentarios: any[] = []; // Asignamos todos lo comentaios que tiene ese candidato;
  comentario: string; // [(ngModel)] para tomar el comentario que se va a ingresar;
  CountComent: number;
  txtBtnAddComent: string; // Mensajes en el boton de inserta conentario;
  msgError: boolean; // Mensajes a mostrar en la seccion de comentarios;
  msgSuccess: boolean; // Mensajes a mostrar en la seccion de comentarios;
  Usuario: string; // Asignamos el usario que ingreso al sistema en el constructor;
  infoCnd = 0;



  // Busqueda de candidatos y Visualizacion de candidatos, control de animacion
  setInfoCnd(index: number) {
    this.infoCnd = index;
  }

  setStep(index: number) {
    this.step = index;
  }

  SiguienteStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
 }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

 // Filtro de tabla de candidatos. ***
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
 // Filtro de tabla de vacantes. ***
  applyFilterv(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSourcev.filter = filterValue;
  }

  constructor(private service: CandidatosService, public dialog: MatDialog, private _Router: Router,
      private _Route: ActivatedRoute, toasterService: ToasterService) { 
        this.toasterService = toasterService;
        this.ConexionBolsa  = localStorage.getItem('ConexionBolsa');
        this.txtBtnAddComent = 'Comentar';
        this.Usuario = localStorage.getItem('nombre');
        this.getVacantesReqclutador();
      }

 // Captamos la variable de la busqueda de candidatos para ver si tiene cambios. ***
 ngOnChanges(changes: SimpleChanges){
       if(changes.FCandidatos && !changes.FCandidatos.isFirstChange()) {
        this.ngOnInit();
       }
 }

 // Agregamos la carga para la tabla de candidatos. ***
  ngOnInit() {
    this.dataSource =  new MatTableDataSource(this.FCandidatos);
    this.candidatos = this.FCandidatos;
    this.arraycandidatos = this.candidatos;
    this.pageCount = Math.round(this.candidatos.length / this.rows);
    this.TotalRecords = this.candidatos.length;
    this.paginador();
  }

  getVacantesReqclutador(){
    // Buscamos las vacantes de la celula o los asignados al reclutador. ***
    this.service.getvacantes(localStorage.getItem('id'))
    .subscribe(vacantes => {
      this.vacantes = vacantes;
      this.arrayvacantes = this.vacantes;
      this.pageCountv = Math.round(this.vacantes.length / this.rowsv);
      this.TotalRecordsv = this.vacantes.length;
      this.dataSourcev =  new MatTableDataSource(vacantes);
      this.NumVacantes = this.vacantes.length;
      this.paginadorv();
    });
  }
  // Boton de ver de la tabla de candidatos. ***
  vercandidato(id): void {
    // Buscamos el detalle del candidato seleccionado. ***
    this.service.getcandidatodtl(id)
    .subscribe(data => {
      this.candidatodtl = data;
      console.log(this.candidatodtl);
      this.fotoCandidato = this.ConexionBolsa + this.candidatodtl[0].candidato.imgProfileUrl;
      // Buscamos el estatus del candidato del apartado o liberado. ***
      this.service.getEstatusCandidato(this.candidatodtl[0].candidatoId)
          .subscribe(estatus => {
            console.log('Estatus: ', estatus);
            if (estatus.length == 0){
              this.Status = estatus.length;
              this.Reclutador = 'Candidato disponible';
              this.requisicionId = null;
            }else{
              this.Status = estatus[0].estatus;
              this.Reclutador = estatus[0].reclutador;
              this.requisicionId = estatus[0].requisicionId;
              this.StatusId = estatus[0].id;
              this.tpcontrato = estatus[0].tpContrato;
            }
        });
        // Buscamos las postulaciones del candidato. ***
        this.service.getpostulaciones(this.candidatodtl[0].candidatoId)
            .subscribe(postulaciones => {
              this.dataSourcep =  new MatTableDataSource(postulaciones);
              this.NumPostulaciones = postulaciones.length;
        });
        
        // Buscar los comentarios agregados al candidato. ***
        this.GetAllComments(id);
    });
    
    this.setInfoCnd(1); // Expandemos los detalles del candidato seleccionado. ***
    // this.expandir = true; // Expandemos los detalles del candidato seleccionado. ***

      // let dialogRef = this.dialog.open(DialogcandidatosComponent, {
      //   width: '1200px',
      //   height: '700px',
      //   data: this.candidatodtl
      // });
      // dialogRef.afterClosed().subscribe(result => {
      // });
  }

  // Funcion para obtener comentarios del candidato.
  GetAllComments(id){
    this.service.getComentarios(id)
      .subscribe(comentarios => {
        this.comentarios = comentarios;
        this.CountComent = this.comentarios.length; 
        console.log(comentarios);
        this.comentarios.forEach( element => {
            element.usuario.foto = ApiConection.ServiceUrlFoto +   element.usuario.foto;
        });
      })
  }

 // Abrimos el modal en donde mandamos el id de la requisicion para mostar los datos. ***
  OpenDtl(Id): void {
    let dialogRef = this.dialog.open(DialogcandidatosComponent, {
      width: '1200px',
      height: '700px',
      data: Id
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

 // Proceso de apartado del candidato. ***
  Apartar(idvct: any){
    let Apartar: Apartado = new Apartado();
    Apartar.CandidatoId = this.candidatodtl[0].candidatoId;
    Apartar.RequisicionId = idvct;
    Apartar.Reclutador = localStorage.getItem('nombre');
    Apartar.Estatus = 1;
    Apartar.TpContrato = 2;
    // Se manda el objeto con los datos necesarios para su inserción al servicio. ***
    this.service.postApartar(Apartar)
    .subscribe(data => {
      this.pop(data.mensaje, true, data.estatus, 'Apartado', data.reclutador);
      let diaEnMils = 1000 * 60 * 60 * 24;
      let fchapartado = new Date(data.fch_Creacion.substr(0, 10));
      fchapartado.setDate(fchapartado.getDate() + 1);
      let fchliberacion = new Date();
      fchliberacion.setDate(fchapartado.getDate() + 2);
      const hoy = new Date();
      this.timerest = Math.round((hoy.getTime() - fchliberacion.getTime()) / diaEnMils * -24);
    });
    // Recargamos de nuevo la vacante con el apartado. ***
    this.vercandidato(this.candidatodtl[0].candidatoId);
  }

  // Proceso de liberación del candidato. ***
  Liberar(idvct: any){
    this.service.Liberar(this.StatusId)
    .subscribe(data => {
      this.pop('Hola', false, 0, 'Liberado', data);
    })
    // Recargamos de nuevo la vacante con el borrado. ***
    this.vercandidato(this.candidatodtl[0].candidatoId);
  }

  // Agregar un nuevo comentaior para le candidato.
  AddComentario(){
    let Coment: Comentarios =  new Comentarios();
    Coment.Comentario = this.comentario;
    Coment.CandidatoId = this.candidatodtl[0].candidatoId;
    Coment.RequisicionId = this.requisicionId;
    Coment.Usuario = localStorage.getItem('usuario');
    this.service.postComentarios(Coment)
      .subscribe(data => {
        if(data == 200){
          this.msgSuccess = true;
          this.GetAllComments(this.candidatodtl[0].candidatoId)
          this.comentario = '';
          setTimeout(() => {
            this.msgSuccess = false;
          }, 2000)
        }
        if(data == 404){
          this.msgError = true;
          setTimeout(() => {
            this.msgError = false;
          }, 2000)
        }
      });
  }
  // Mensajes de confirmación o error. ***
  pop(mensaje:string,bandera:boolean,estatus:number,titulo:string,candidato:string) {
    if (bandera == true){ // mandamos la validación del apartado ***
      if (estatus > 0){
        var type = 'success';
        mensaje='Candidato apartado por: '+candidato;
      }else{
        var type = 'error';
        mensaje='El candidato no se pudo apartar correctamente.';
      }
    }else{ // mandamos la validación del liberado. ***
      if (estatus ==0){
      var type = 'error';
      mensaje='Candidato liberado';
    }else{
      var type = 'warning';
      mensaje='El candidato no se pudo liberar correctamente.';
    }
    }
      this.toasterService.pop(type, titulo, mensaje);
  }

  // Parametros para paginador candidatos. ***
  length = 0;
  pageSize = 10;
  pageSizeOptions = [2, 20, 30, 50];

  pageEvent: PageEvent;

  rows: number = 10;
  first: number = 0;
  page: number = 1;
  pageCount: number = 0;
  TotalRecords: number = 0;

  // Función de paginador para afectación de los numeros de registros y página.
  paginate(event?: PageEvent) {
   if (event.length > event.pageSize){
      this.first = event.pageIndex;
      this.rows = event.pageSize;
      this.page = event.pageIndex;
      this.pageCount = event.length;
    }else{
      this.rows = event.length;
    }
      this.paginador();
    }

    // Comienza el paginador. ***
    paginador(){
      if (this.page < this.pageCount) {
        this.candidatos = new Array(this.rows);
        for (var i = 0; i < this.rows; i++) {
          this.candidatos[i] = this.arraycandidatos[this.first + i];
        }
      }else {
        let lenght = this.arraycandidatos.length - this.first;
        this.candidatos = new Array(lenght);
        for (var i = 0; i < lenght; i++) {
          this.candidatos[i] = this.arraycandidatos[this.first + i];
        }
      }
        this.dataSource =  new MatTableDataSource(this.candidatos);
    }
    // Termina paginador

    // Parametros para paginador vacantes. ***
    lengthv = 0;
    pageSizev = 5;
    pageSizeOptionsv = [5, 10, 15, 20];

    pageEventv: PageEvent;

    rowsv: number = 5;
    firstv: number = 0;
    pagev: number = 1;
    pageCountv: number = 0;
    TotalRecordsv: number = 0;

    // Función de paginador para afectación de los numeros de registros y página.
    paginatev(eventv?: PageEvent) {
     if (eventv.length > eventv.pageSize){
        this.firstv = eventv.pageIndex;
        this.rowsv = eventv.pageSize;
        this.pagev = eventv.pageIndex;
        this.pageCountv = eventv.length;
      }else{
        this.rowsv = eventv.length;
      }
        this.paginadorv();
      }

      // Comienza el paginador. ***
      paginadorv(){
        if (this.pagev < this.pageCountv) {
          this.vacantes = new Array(this.rowsv);
          for (var i = 0; i < this.rowsv; i++) {
            this.vacantes[i] = this.arrayvacantes[this.firstv + i];
          }
        }else {
          let lenghtv = this.arrayvacantes.length - this.firstv;
          this.vacantes = new Array(lenghtv);
          for (var i = 0; i < lenghtv; i++) {
            this.vacantes[i] = this.arrayvacantes[this.firstv + i];
          }
        }
          this.dataSourcev =  new MatTableDataSource(this.vacantes);
      }
      // Termina paginador

      public ShowMessage($event){
        debugger;
        console.log($event);
      }

}
  // Interface de la tabla de candidatos. ***
  export interface Candidatos {
    Candidato: string;
    CodigoPostal: string;
    Curp: string;
    Rfc: string;
    Experiencias: string;
    AreaInteres: string;
  }
  // Interface de la tabla de postulaciones. ***
  export interface postulaciones {
    Vacante: string;
    Estatus: string;
  }
 // Interface de la tabla de vacantes. ***
  export interface vacantes {
    Folio: string;
    Vacante:   string;
    FechaCreacion: string;
    Cliente: string;
    Reclutamiento: string;
    Area: string;
  }
  