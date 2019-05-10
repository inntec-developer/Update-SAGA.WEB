import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
// Servicios
import { CatalogosService } from '../../../service/catalogos/catalogos.service';
// Modelos
import { catalogos } from '../../../models/catalogos/catalogos';


@Component({
  selector: 'app-aptitud',
  templateUrl: './aptitud.component.html',
  styleUrls: ['./aptitud.component.scss']
})
export class AptitudComponent implements OnInit, OnChanges {

  @Input() SelectedAptitud: any;
  @Input() Log: any;
  @Output() UpAptitud = new EventEmitter<number>(); // Id de País para actualizar tabla.
  formAptitud: FormGroup;

  displayedColumns: string[] = ['id', 'usuario', 'fechaAct', 'tpMov'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private services: CatalogosService ) {
    this.formAptitud = new FormGroup({
      id: new FormControl(),
      aptitud: new FormControl({value: '', disabled: true}, [Validators.required]),
      activo: new FormControl({value: '', disabled: true})
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.SelectedAptitud !== undefined) {
      this.Habilita(false);
      this.formAptitud.get('id').setValue(this.SelectedAptitud.id);
      this.formAptitud.get('aptitud').setValue(this.SelectedAptitud.aptitud);
      this.formAptitud.get('activo').setValue(this.SelectedAptitud.activo);
    }
    if (this.Log !== undefined) {
      this.dataSource = new MatTableDataSource(this.Log);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  New() {
    this.formAptitud.reset();
    this.Habilita(false);
    this.SelectedAptitud = '';
  }

  Save() {
    const catalogo: catalogos = new catalogos();
    this.SelectedAptitud !== '' ? catalogo.opt = 2 : catalogo.opt = 1;
    catalogo.usuario = sessionStorage.getItem('usuario');
    catalogo.Catalogos = {
      Id: 17,
      Nombre: 'Aptitudes',
      Descripcion: 'Catalogo de aptitudes',
      Activo: true
    };
    catalogo.Aptitud = [this.formAptitud.getRawValue()];
    console.log(catalogo);
    this.services.GuardaCatalogo(catalogo)
    .subscribe( result => { // Agregar
      result ? this.UpAptitud.emit(catalogo.Catalogos.Id) : console.log(result);
      this.Habilita(true);
    });
  }

  Limpiar() {
    this.formAptitud.reset();
  }

  Habilita(opt: boolean) {
    if (!opt) {
      this.formAptitud.get('aptitud').enable();
      this.formAptitud.get('activo').enable();
    } else {
      this.formAptitud.get('aptitud').disable();
      this.formAptitud.get('activo').disable();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}