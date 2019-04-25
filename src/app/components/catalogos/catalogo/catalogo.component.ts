import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
// Servicios
import { CatalogosService } from '../../../service/catalogos/catalogos.service';
// Modelos
import { filtros } from '../../../models/catalogos/catalogos';

const swal = require('sweetalert');

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnChanges , OnInit {

  @Input() public idCatalogo: number;
  fCatalogo: any;
  titulo: string;
  descripcion: string;
  private DataTable: Array<any>;
  private HeadTable: Array<String>;
  private tableColName: Array<String>;
  paises: any[];
  estados: any[];
  municipios: any[];
  selectedId: any;

  constructor( private serviceCatalogo: CatalogosService ) {
  }

  private step = 0;

  setStep(index: number) {
    this.step = index;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.idCatalogo !== undefined) {
      this.idCatalogo === 3 || this.idCatalogo === 4 ? this.setStep(0) : this.setStep(1);
      this.idCatalogo !== 3 ? this.idCatalogo !== 4 ?
       this.loadData(this.idCatalogo) : console.log('No hay datos') :
        console.log('No hay datos');
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
        // Registros.
        this.HeadTable = new Array<String>('Id', 'Pais', 'Activo');
        this.DataTable = this.fCatalogo.pais;
       } );
      break;

    case 2: // Estados
      this.serviceCatalogo.getCatalogo(IdCat)
      .subscribe( result => {
        this.fCatalogo = result;
        this.titulo = this.fCatalogo.catalogos.nombre;
        this.descripcion = this.fCatalogo.catalogos.descripcion;
        // Registros.
        this.HeadTable = new Array<String>('Id', 'Estado', 'Clave', 'Pais', 'Activo');
        this.DataTable = this.fCatalogo.estado;
        this.paises = this.fCatalogo.pais;
        this.selectedId = this.fCatalogo.estado.find( (p: { id: number; }) => p.id === 1);
       } );
      break;

    case 3: // Municipios
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
        // this.selectedId = this.fCatalogo.municipio.find( (p: { id: number; }) => p.id === 1);
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
        // this.selectedId = this.fCatalogo.colonias.find( (p: { id: number; }) => p.id === 1);
       } );
      break;

    case 6: // Tipos de telefono
      this.serviceCatalogo.getCatalogo(IdCat)
      .subscribe( result => {
        this.fCatalogo = result;
        this.titulo = this.fCatalogo.catalogos.nombre;
        this.descripcion = this.fCatalogo.catalogos.descripcion;
        // Registros.
        this.HeadTable = new Array<String>('Id', 'Tipo', 'Activo');
        this.DataTable = this.fCatalogo.tpTelefono;
        // this.selectedId = this.fCatalogo.tpTelefono.find( (p: { id: number; }) => p.id === 1);
       } );
      break;

    case 7: // Estado civil
      this.serviceCatalogo.getCatalogo(IdCat)
      .subscribe( result => {
        this.fCatalogo = result;
        this.titulo = this.fCatalogo.catalogos.nombre;
        this.descripcion = this.fCatalogo.catalogos.descripcion;
        // Registros.
        this.HeadTable = new Array<String>('Id', 'Tipo', 'Activo');
        this.DataTable = this.fCatalogo.estadoCivil;
       } );
      break;

    case 41: // Tipos de usuario
      this.serviceCatalogo.getCatalogo(IdCat)
      .subscribe( result => {
        this.fCatalogo = result;
        this.titulo = this.fCatalogo.catalogos.nombre;
        this.descripcion = this.fCatalogo.catalogos.descripcion;
        // Registros.
        this.HeadTable = new Array<String>('Id', 'Tipo');
        this.DataTable = this.fCatalogo.tpUsuario;
        // this.selectedId = this.fCatalogo.tpTelefono.find( (p: { id: number; }) => p.id === 1);
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
