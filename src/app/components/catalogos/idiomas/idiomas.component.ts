import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { CatalogosService } from '../../../service/catalogos/catalogos.service';
import { SettingsService } from '../../../core/settings/settings.service';
import { catalogos } from '../../../models/catalogos/catalogos';

// Servicios

// Modelos


@Component({
  selector: 'app-idiomas',
  templateUrl: './idiomas.component.html',
  styleUrls: ['./idiomas.component.scss']
})
export class IdiomasComponent implements OnInit, OnChanges {

  @Input() SelectedIdioma: any;
  @Input() Log: any;
  @Output() UpIdioma = new EventEmitter<number>(); // Id de Areas para actualizar tabla.
  formIdiomas: FormGroup;

  displayedColumns: string[] = ['id', 'usuario', 'fechaAct', 'tpMov'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private services: CatalogosService, private settings: SettingsService ) {
    this.formIdiomas = new FormGroup({
      id: new FormControl(),
      idioma: new FormControl({value: '', disabled: true}, [Validators.required]),
      activo: new FormControl({value: '', disabled: true})
    });
   }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.SelectedIdioma !== undefined) {
      this.Habilita(false);
      this.formIdiomas.get('id').setValue(this.SelectedIdioma.id);
      this.formIdiomas.get('idioma').setValue(this.SelectedIdioma.idioma);
      this.formIdiomas.get('activo').setValue(this.SelectedIdioma.activo);
    }
    if (this.Log !== undefined) {
      this.dataSource = new MatTableDataSource(this.Log);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  New() {
    this.formIdiomas.reset();
    this.SelectedIdioma = '';
    this.Habilita(false);
  }

  Save() {
    const catalogo: catalogos = new catalogos();
    this.SelectedIdioma !== '' ? catalogo.opt = 2 : catalogo.opt = 1;
    catalogo.usuario = this.settings.user['usuario'];
    catalogo.Catalogos = {
      Id: 37,
      Nombre: 'Idiomas',
      Descripcion: 'Catalogo de idiomas',
      Activo: true
    };
    catalogo.Idioma = [this.formIdiomas.getRawValue()];
    console.log(catalogo);
    this.services.GuardaCatalogo(catalogo)
    .subscribe( result => { // Agregar
      result ? this.UpIdioma.emit(catalogo.Catalogos.Id) : console.log(result);
      this.Habilita(true);
    });
  }

  Limpiar() {
    this.formIdiomas.reset();
  }

  Habilita(opt: boolean) {
    if (!opt) {
      this.formIdiomas.get('idioma').enable();
      this.formIdiomas.get('activo').enable();
    } else {
      this.formIdiomas.get('idioma').disable();
      this.formIdiomas.get('activo').disable();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
