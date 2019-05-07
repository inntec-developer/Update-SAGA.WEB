import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
// Servicios
import { CatalogosService } from '../../../service/catalogos/catalogos.service';
// Modelos
import { catalogos } from '../../../models/catalogos/catalogos';


@Component({
  selector: 'app-doc-damsa',
  templateUrl: './doc-damsa.component.html',
  styleUrls: ['./doc-damsa.component.scss']
})
export class DocDamsaComponent implements OnInit, OnChanges {

  @Input() SelectedDocDamsa: any;
  @Input() Log: any;
  @Output() UpDocDamsa = new EventEmitter<number>(); // Id de País para actualizar tabla.
  formDocDamsa: FormGroup;

  displayedColumns: string[] = ['id', 'usuario', 'fechaAct', 'tpMov'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private services: CatalogosService ) {
    this.formDocDamsa = new FormGroup({
      id: new FormControl(),
      documentoDamsa: new FormControl({value: '', disabled: true}, [Validators.required]),
      activo: new FormControl({value: '', disabled: true})
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.SelectedDocDamsa !== undefined) {
      this.Habilita(false);
      this.formDocDamsa.get('id').setValue(this.SelectedDocDamsa.id);
      this.formDocDamsa.get('documentoDamsa').setValue(this.SelectedDocDamsa.documentoDamsa);
      this.formDocDamsa.get('activo').setValue(this.SelectedDocDamsa.activo);
    }
    if (this.Log !== undefined) {
      this.dataSource = new MatTableDataSource(this.Log);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  New() {
    this.formDocDamsa.reset();
    this.Habilita(false);
    this.SelectedDocDamsa = '';
  }

  Save() {
    const catalogo: catalogos = new catalogos();
    this.SelectedDocDamsa !== '' ? catalogo.opt = 2 : catalogo.opt = 1;
    catalogo.usuario = sessionStorage.getItem('usuario');
    catalogo.Catalogos = {
      Id: 31,
      Nombre: 'Documentos DAMSA',
      Descripcion: 'Catalogo de Documentos Damsa',
      Activo: true
    };
    catalogo.DocDamsa = [this.formDocDamsa.getRawValue()];
    console.log(catalogo);
    this.services.GuardaCatalogo(catalogo)
    .subscribe( result => { // Agregar
      result ? this.UpDocDamsa.emit(catalogo.Catalogos.Id) : console.log(result);
      this.Habilita(true);
    });
  }

  Limpiar() {
    this.formDocDamsa.reset();
  }

  Habilita(opt: boolean) {
    if (!opt) {
      this.formDocDamsa.get('documentoDamsa').enable();
      this.formDocDamsa.get('activo').enable();
    } else {
      this.formDocDamsa.get('documentoDamsa').disable();
      this.formDocDamsa.get('activo').disable();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
