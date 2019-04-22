import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { CatalogosService } from '../../../service/catalogos/catalogos.service';


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
  selectedId: any;

  constructor( private serviceCatalogo: CatalogosService ) {
  }

  private step = 0;

  setStep(index: number) {
    this.step = index;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.idCatalogo !== undefined) {
      switch (this.idCatalogo) {
        case 1: // Paises
          this.serviceCatalogo.getCatalogo(this.idCatalogo)
          .subscribe( result => {
            this.fCatalogo = result;
            this.titulo = this.fCatalogo.catalogos.nombre;
            this.descripcion = this.fCatalogo.catalogos.descripcion;
            // Registros.
            this.HeadTable = new Array<String>('Id', 'Pais');
            this.DataTable = this.fCatalogo.pais;
           } );
          break;

        case 2: // Estados
          this.serviceCatalogo.getCatalogo(this.idCatalogo)
          .subscribe( result => {
            this.fCatalogo = result;
            this.titulo = this.fCatalogo.catalogos.nombre;
            this.descripcion = this.fCatalogo.catalogos.descripcion;
            // Registros.
            this.HeadTable = new Array<String>('Id', 'Estado', 'Clave', 'Pais');
            this.DataTable = this.fCatalogo.estado;
            this.paises = this.fCatalogo.pais;
           } );
          break;

        default:
          break;
      }
    }
  }

  ngOnInit() {
  }

  LoadIdReg(IdReg: number) {
    this.step++;
    this.selectedId = this.fCatalogo.pais.find( (p: { id: number; }) => p.id === IdReg);
  }

}
