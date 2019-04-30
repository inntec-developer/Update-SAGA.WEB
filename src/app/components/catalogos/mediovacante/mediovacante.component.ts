import { Component, OnInit, Input, SimpleChanges, OnChanges, EventEmitter, Output, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
// Servicios
import { CatalogosService } from '../../../service/catalogos/catalogos.service';
// Modelos
import { catalogos } from '../../../models/catalogos/catalogos';

@Component({
  selector: 'app-mediovacante',
  templateUrl: './mediovacante.component.html',
  styleUrls: ['./mediovacante.component.scss']
})
export class MediovacanteComponent implements OnInit, OnChanges {

  @Input() SelectedMedio: any;
  @Input() Log: any;
  @Output() UpMedios = new EventEmitter<number>(); // Id de Areas para actualizar tabla.
  formMedios: FormGroup;

  displayedColumns: string[] = ['id', 'usuario', 'fechaAct', 'tpMov'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private services: CatalogosService ) {
    this.formMedios = new FormGroup({
      id: new FormControl(),
      nombre: new FormControl({value: '', disabled: true}, [Validators.required]),
      activo: new FormControl({value: '', disabled: true})
    });
   }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.SelectedMedio !== undefined) {
      this.Habilita(false);
      this.formMedios.get('id').setValue(this.SelectedMedio.id);
      this.formMedios.get('nombre').setValue(this.SelectedMedio.nombre);
      this.formMedios.get('activo').setValue(this.SelectedMedio.activo);
    }
    if (this.Log !== undefined) {
      this.dataSource = new MatTableDataSource(this.Log);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  New() {
    this.formMedios.reset();
    this.SelectedMedio = '';
    this.Habilita(false);
  }

  Save() {
    const catalogo: catalogos = new catalogos();
    this.SelectedMedio !== '' ? catalogo.opt = 2 : catalogo.opt = 1;
    catalogo.usuario = sessionStorage.getItem('usuario');
    catalogo.Catalogos = {
      Id: 36,
      Nombre: 'Medios',
      Descripcion: 'Catalogo de medios',
      Activo: true
    };
    catalogo.Medio = [this.formMedios.getRawValue()];
    console.log(catalogo);
    this.services.GuardaCatalogo(catalogo)
    .subscribe( result => { // Agregar
      result ? this.UpMedios.emit(catalogo.Catalogos.Id) : console.log(result);
      this.Habilita(true);
    });
  }

  Limpiar() {
    this.formMedios.reset();
  }

  Habilita(opt: boolean) {
    if (!opt) {
      this.formMedios.get('nombre').enable();
      this.formMedios.get('activo').enable();
    } else {
      this.formMedios.get('nombre').disable();
      this.formMedios.get('activo').disable();
  }
}

applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
}
