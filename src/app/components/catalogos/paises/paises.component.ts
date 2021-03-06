import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSort  } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { CatalogosService } from '../../../service/catalogos/catalogos.service';
import { SettingsService } from '../../../core/settings/settings.service';
import { catalogos } from '../../../models/catalogos/catalogos';
import { log } from 'util';

// Servicios

// Modelos



@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styleUrls: ['./paises.component.scss']
})
export class PaisesComponent implements OnInit, OnChanges {

  @Input() SelectedPais: any;
  @Input() Log: any;
  @Output() UpPaises = new EventEmitter<number>(); // Id de País para actualizar tabla.
  formPaises: FormGroup;
  Edicion: boolean;

  displayedColumns: string[] = ['id', 'usuario', 'fechaAct', 'tpMov'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private services: CatalogosService, private settings: SettingsService ) {
    this.formPaises = new FormGroup({
      id: new FormControl(),
      pais: new FormControl({value: '', disabled: true}, [Validators.required]),
      activo: new FormControl({value: '', disabled: true})
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.SelectedPais === undefined) {
      this.formPaises.reset();
      this.Edicion = true;
    }
    if (this.SelectedPais !== undefined) {
      this.Habilita(false);
      this.formPaises.get('id').setValue(this.SelectedPais.id);
      this.formPaises.get('pais').setValue(this.SelectedPais.pais);
      this.formPaises.get('activo').setValue(this.SelectedPais.activo);
    }
    if (this.Log !== undefined) {
      this.dataSource = new MatTableDataSource(this.Log);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  New() {
    this.formPaises.reset();
    this.Habilita(false);
    this.SelectedPais = undefined;
  }

  Save() {
    const catalogo: catalogos = new catalogos();
    this.SelectedPais !== '' && this.SelectedPais !== undefined ? catalogo.opt = 2 : catalogo.opt = 1;
    catalogo.usuario = this.settings.user['usuario'];
    catalogo.Catalogos = {
      Id: 1,
      Nombre: 'Paises',
      Descripcion: 'Catalogo de países',
      Activo: true
    };
    const Estados: Array<any> = [];
    catalogo.Estado = Estados;
    const Municipios: Array<any> = [];
    catalogo.Municipio = Municipios;
    catalogo.Pais = [this.formPaises.getRawValue()];

    this.services.GuardaCatalogo(catalogo)
    .subscribe( result => { // Agregar
      result ? this.UpPaises.emit(catalogo.Catalogos.Id) :  null;
      this.Edicion = true;
      this.Habilita(true);
      this.formPaises.reset();
    });
  }

  Limpiar() {
    this.formPaises.reset();
    this.Habilita(true);
    this.Edicion = false;
    this.SelectedPais = '';
  }

  Habilita(opt: boolean) {
    if (!opt) {
      this.formPaises.get('pais').enable();
      this.formPaises.get('activo').enable();
      this.Edicion = true;
    } else {
      this.formPaises.get('pais').disable();
      this.formPaises.get('activo').disable();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
