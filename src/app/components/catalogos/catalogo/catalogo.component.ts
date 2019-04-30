import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { CatalogosService } from '../../../service/catalogos/catalogos.service';
import { filtros } from '../../../models/catalogos/catalogos';

// Servicios

// Modelos


const swal = require('sweetalert');

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnChanges , OnInit {

  @Input() public idCatalogo: number;
  public fCatalogo: any;
  public titulo: string;
  public descripcion: string;
  public DataTable: Array<any>;
  public HeadTable: Array<String>;
  public tableColName: Array<String>;
  public paises: any[];
  public estados: any[];
  public municipios: any[];
  public selectedId: any;
  public areas: any[];
  public step = 0;

  constructor( private serviceCatalogo: CatalogosService ) {
  }



  setStep(index: number) {
    this.step = index;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.idCatalogo !== undefined) {
      this.idCatalogo === 3 || this.idCatalogo === 4 ? this.setStep(0) : this.setStep(1);
      this.loadData(this.idCatalogo);
    }
  }

  ngOnInit() {
  }

  LoadIdReg(IdReg: number) {
    this.setStep(2);
    switch (this.idCatalogo) {
      //#region Sistema
      case 1:
        this.selectedId = this.fCatalogo.pais.find( (p: { id: number; }) => p.id === IdReg);
        break;
      case 2:
        this.selectedId = this.fCatalogo.estado.find( (p: { id: number; }) => p.id === IdReg);
        break;
      case 3:
        this.selectedId = this.fCatalogo.municipio.find( (p: { id: number; }) => p.id === IdReg);
        break;
      case 4:
        this.selectedId = this.fCatalogo.colonia.find( (p: { id: number; }) => p.id === IdReg);
        break;
      case 6:
        this.selectedId = this.fCatalogo.tpTelefono.find( (p: { id: number; }) => p.id === IdReg);
        break;
      case 7:
        this.selectedId = this.fCatalogo.estadoCivil.find( (p: { id: number; }) => p.id === IdReg);
        break;
      case 41:
        this.selectedId = this.fCatalogo.tpUsuario.find( (p: { id: number; }) => p.id === IdReg);
        break;
      case 42:
        this.selectedId = this.fCatalogo.departamentos.find( (p: { id: number; }) => p.id === IdReg);
        break;
      case 43:
      this.selectedId = this.fCatalogo.areas.find( (p: { id: number; }) => p.id === IdReg);
        break;
      //#endregion
      //#region Reclutamiento
      case 34:
      this.selectedId = this.fCatalogo.escolaridades.find( (p: { id: number; }) => p.id === IdReg);
        break;
      case 35:
      this.selectedId = this.fCatalogo.nivel.find( (p: { id: number; }) => p.id === IdReg);
        break;
      case 36:
      this.selectedId = this.fCatalogo.medio.find( (p: { id: number; }) => p.id === IdReg);
        break;
      case 37:
      this.selectedId = this.fCatalogo.idioma.find( (p: { id: number; }) => p.id === IdReg);
        break;
      //#endregion
      default:
        break;
    }
  }

  Refresh(IdRefresh: number) {
    this.loadData(IdRefresh);
    this.setStep(1);
    swal('Registro exitoso!', 'Haga click en el boton!', 'success');
  }

  loadData(IdCat: number) {
  switch (IdCat) {
    //#region Sistema
    case 1: // Paises
      this.serviceCatalogo.getCatalogo(IdCat)
      .subscribe( result => {
        this.fCatalogo = result;
        this.titulo = this.fCatalogo.catalogos.nombre;
        this.descripcion = this.fCatalogo.catalogos.descripcion;
        if (this.fCatalogo.pais.length === 0) {
                  // Registros.
          this.HeadTable = new Array<String>('');
          this.DataTable = [];
        } else {
                 // Registros.
          this.HeadTable = new Array<String>('Id', 'Pais', 'Activo');
          this.DataTable = this.fCatalogo.pais;
          this.log = this.fCatalogo.log; // Log de cada catalogo.
        }
       } );
      break;

    case 2: // Estados
      this.serviceCatalogo.getCatalogo(IdCat)
      .subscribe( result => {
        this.fCatalogo = result;
        this.titulo = this.fCatalogo.catalogos.nombre;
        this.descripcion = this.fCatalogo.catalogos.descripcion;
        if (this.fCatalogo.estado.length === 0) {
          // Registros.
          this.HeadTable = new Array<String>('');
          this.DataTable = [];
          this.paises = [];
        } else {
          // Registros.
          this.HeadTable = new Array<String>('Id', 'Estado', 'Clave', 'Pais', 'Activo');
          this.DataTable = this.fCatalogo.estado;
          this.paises = this.fCatalogo.pais;
          this.log = this.fCatalogo.log; // Log de cada catalogo.
        }

       } );
      break;

    case 3: // Municipios
      this.serviceCatalogo.getCatalogo(IdCat)
      .subscribe( result => {
        this.fCatalogo = result;
        this.titulo = this.fCatalogo.catalogos.nombre;
        this.descripcion = this.fCatalogo.catalogos.descripcion;
        // Registros.
        // this.HeadTable = new Array<String>('');
        // this.DataTable = [];
        this.paises = this.fCatalogo.pais;
        this.estados = this.fCatalogo.estado;
        this.log = this.fCatalogo.log; // Log de cada catalogo.
       } );
      break;

    case 4: // Colonias
      this.serviceCatalogo.getCatalogo(IdCat)
      .subscribe( result => {
        this.fCatalogo = result;
        this.titulo = this.fCatalogo.catalogos.nombre;
        this.descripcion = this.fCatalogo.catalogos.descripcion;
        // Registros.
        this.HeadTable = new Array<String>('');
        this.DataTable = [];
        this.paises = this.fCatalogo.pais;
        this.estados = this.fCatalogo.estado;
        this.municipios = this.fCatalogo.municipio;
        this.log = this.fCatalogo.log; // Log de cada catalogo.
        // this.selectedId = this.fCatalogo.colonias.find( (p: { id: number; }) => p.id === 1);
       } );
      break;

    case 6: // Tipos de telefono
      this.serviceCatalogo.getCatalogo(IdCat)
      .subscribe( result => {
        this.fCatalogo = result;
        this.titulo = this.fCatalogo.catalogos.nombre;
        this.descripcion = this.fCatalogo.catalogos.descripcion;
        if (this.fCatalogo.tpTelefono.length === 0) {
          // Registros.
          this.HeadTable = new Array<String>('');
          this.DataTable = [];
        } else {
          // Registros.
          this.HeadTable = new Array<String>('Id', 'Tipo', 'Activo');
          this.DataTable = this.fCatalogo.tpTelefono;
          this.log = this.fCatalogo.log; // Log de cada catalogo.
        }
        // this.selectedId = this.fCatalogo.tpTelefono.find( (p: { id: number; }) => p.id === 1);
       } );
      break;

    case 7: // Estado civil
      this.serviceCatalogo.getCatalogo(IdCat)
      .subscribe( result => {
        this.fCatalogo = result;
        this.titulo = this.fCatalogo.catalogos.nombre;
        this.descripcion = this.fCatalogo.catalogos.descripcion;
        if (this.fCatalogo.estadoCivil.length === 0) {
                  // Registros.
          this.HeadTable = new Array<String>('');
          this.DataTable = [];
        } else {
                  // Registros.
          this.HeadTable = new Array<String>('Id', 'Tipo', 'Activo');
          this.DataTable = this.fCatalogo.estadoCivil;
          this.log = this.fCatalogo.log; // Log de cada catalogo.
        }
       } );
      break;

    case 41: // Tipos de usuario
      this.serviceCatalogo.getCatalogo(IdCat)
      .subscribe( result => {
        this.fCatalogo = result;
        this.titulo = this.fCatalogo.catalogos.nombre;
        this.descripcion = this.fCatalogo.catalogos.descripcion;
        if (this.fCatalogo.tpUsuario.length === 0) {
                  // Registros.
          this.HeadTable = new Array<String>('');
          this.DataTable = [];
        } else {
                 // Registros.
          this.HeadTable = new Array<String>('Id', 'Tipo');
          this.DataTable = this.fCatalogo.tpUsuario;
          this.log = this.fCatalogo.log; // Log de cada catalogo.
        }
       } );
      break;

    case 42: // Departamentos
      this.serviceCatalogo.getCatalogo(IdCat)
      .subscribe( result => {
        this.fCatalogo = result;
        this.titulo = this.fCatalogo.catalogos.nombre;
        this.descripcion = this.fCatalogo.catalogos.descripcion;
        if (this.fCatalogo.departamentos.length === 0) {
                  // Registros.
          this.HeadTable = new Array<String>('');
          this.DataTable = [];
        } else {
                 // Registros.
          this.HeadTable = new Array<String>('Id', 'Nombre', 'Area', 'Clave', 'Orden');
          this.DataTable = this.fCatalogo.departamentos;
          this.log = this.fCatalogo.log; // Log de cada catalogo.
        }
        this.areas = this.fCatalogo.areas;
       } );
      break;

    case 43: // Areas
      this.serviceCatalogo.getCatalogo(IdCat)
      .subscribe( result => {
        this.fCatalogo = result;
        this.titulo = this.fCatalogo.catalogos.nombre;
        this.descripcion = this.fCatalogo.catalogos.descripcion;
        if (this.fCatalogo.areas.length === 0) {
                  // Registros.
          this.HeadTable = new Array<String>('');
          this.DataTable = [];
        } else {
                 // Registros.
          this.HeadTable = new Array<String>('Id', 'Nombre', 'Clave', 'Orden');
          this.DataTable = this.fCatalogo.areas;
          this.log = this.fCatalogo.log; // Log de cada catalogo.
        }
       } );
      break;
    //#endregion
    //#region Reclutamiento
    case 34: // Escolaridades
      this.serviceCatalogo.getCatalogo(IdCat)
      .subscribe( result => {
        this.fCatalogo = result;
        this.titulo = this.fCatalogo.catalogos.nombre;
        this.descripcion = this.fCatalogo.catalogos.descripcion;
        if (this.fCatalogo.escolaridades.length === 0) {
                  // Registros.
          this.HeadTable = new Array<String>('');
          this.DataTable = [];
        } else {
                 // Registros.
          this.HeadTable = new Array<String>('Id', 'Escolaridad');
          this.DataTable = this.fCatalogo.escolaridades;
          this.log = this.fCatalogo.log; // Log de cada catalogo.
        }
       } );
      break;

    case 35: // Nivel estudio
      this.serviceCatalogo.getCatalogo(IdCat)
      .subscribe( result => {
        this.fCatalogo = result;
        this.titulo = this.fCatalogo.catalogos.nombre;
        this.descripcion = this.fCatalogo.catalogos.descripcion;
        if (this.fCatalogo.nivel.length === 0) {
                  // Registros.
          this.HeadTable = new Array<String>('');
          this.DataTable = [];
        } else {
                 // Registros.
          this.HeadTable = new Array<String>('Id', 'Escolaridad');
          this.DataTable = this.fCatalogo.nivel;
          this.log = this.fCatalogo.log; // Log de cada catalogo.
        }
       } );
      break;

    case 36: // Medios
      this.serviceCatalogo.getCatalogo(IdCat)
      .subscribe( result => {
        this.fCatalogo = result;
        this.titulo = this.fCatalogo.catalogos.nombre;
        this.descripcion = this.fCatalogo.catalogos.descripcion;
        if (this.fCatalogo.medio.length === 0) {
                  // Registros.
          this.HeadTable = new Array<String>('');
          this.DataTable = [];
        } else {
                 // Registros.
          this.HeadTable = new Array<String>('Id', 'Medio', 'Activo');
          this.DataTable = this.fCatalogo.medio;
          this.log = this.fCatalogo.log; // Log de cada catalogo.
        }
       } );
      break;
    case 37: // Idiomas
      this.serviceCatalogo.getCatalogo(IdCat)
      .subscribe( result => {
        this.fCatalogo = result;
        this.titulo = this.fCatalogo.catalogos.nombre;
        this.descripcion = this.fCatalogo.catalogos.descripcion;
        if (this.fCatalogo.idioma.length === 0) {
                  // Registros.
          this.HeadTable = new Array<String>('');
          this.DataTable = [];
        } else {
                 // Registros.
          this.HeadTable = new Array<String>('Id', 'Idioma', 'Activo');
          this.DataTable = this.fCatalogo.idioma;
          this.log = this.fCatalogo.log; // Log de cada catalogo.
        }
       } );
      break;
    //#endregion
    default:
      break;
  }
  }

  Filtros(event: filtros) {
    this.serviceCatalogo.getCatalogoFilter(event)
    .subscribe( result => {
        // Registros.
        this.fCatalogo = result;
        if (event.IdCat === 3) {
          this.HeadTable = new Array<String>('Id', 'Municipio', 'Estado', 'Activo');
          this.DataTable = this.fCatalogo.municipio;
          this.selectedId = this.fCatalogo.municipio.find( (p: { id: number; }) => p.id === 1);
        } else {
          this.HeadTable = new Array<String>('Id', 'Colonia', 'CP', 'Tipo colonia', 'Municipio', 'Estado', 'País', 'Activo');
          this.DataTable = this.fCatalogo.colonia;
          this.selectedId = this.fCatalogo.colonia.find( (p: { id: number; }) => p.id === 1);
        }
    });
    this.setStep(1);
  }

  Save(IdCat: number, event: any) {
    console.log(IdCat, event);
  }

}
