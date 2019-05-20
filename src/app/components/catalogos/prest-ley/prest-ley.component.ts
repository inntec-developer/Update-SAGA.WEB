import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { CatalogosService } from '../../../service/catalogos/catalogos.service';
import { SettingsService } from '../../../core/settings/settings.service';
import { catalogos } from '../../../models/catalogos/catalogos';

// Servicios

// Modelos


@Component({
  selector: 'app-prest-ley',
  templateUrl: './prest-ley.component.html',
  styleUrls: ['./prest-ley.component.scss']
})
export class PrestLeyComponent implements OnInit, OnChanges {

  @Input() SelectedPrestLey: any;
  @Input() Log: any;
  @Output() UpPrestLey = new EventEmitter<number>(); // Id de País para actualizar tabla.
  formPrestLey: FormGroup;

  displayedColumns: string[] = ['id', 'usuario', 'fechaAct', 'tpMov'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private services: CatalogosService, private settings: SettingsService ) {
    this.formPrestLey = new FormGroup({
      id: new FormControl(),
      prestacionLey: new FormControl({value: '', disabled: true}, [Validators.required]),
      activo: new FormControl({value: '', disabled: true})
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.SelectedPrestLey !== undefined) {
      this.Habilita(false);
      this.formPrestLey.get('id').setValue(this.SelectedPrestLey.id);
      this.formPrestLey.get('prestacionLey').setValue(this.SelectedPrestLey.prestacionLey);
      this.formPrestLey.get('activo').setValue(this.SelectedPrestLey.activo);
    }
    if (this.Log !== undefined) {
      this.dataSource = new MatTableDataSource(this.Log);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  New() {
    this.formPrestLey.reset();
    this.Habilita(false);
    this.SelectedPrestLey = '';
  }

  Save() {
    const catalogo: catalogos = new catalogos();
    this.SelectedPrestLey !== '' ? catalogo.opt = 2 : catalogo.opt = 1;
    catalogo.usuario = this.settings.user['usuario'];
    catalogo.Catalogos = {
      Id: 32,
      Nombre: 'Pretsaciones de ley',
      Descripcion: 'Catalogo de prestaciones de ley',
      Activo: true
    };
    catalogo.PrestacionesLey = [this.formPrestLey.getRawValue()];
    console.log(catalogo);
    this.services.GuardaCatalogo(catalogo)
    .subscribe( result => { // Agregar
      result ? this.UpPrestLey.emit(catalogo.Catalogos.Id) : console.log(result);
      this.Habilita(true);
    });
  }

  Limpiar() {
    this.formPrestLey.reset();
  }

  Habilita(opt: boolean) {
    if (!opt) {
      this.formPrestLey.get('prestacionLey').enable();
      this.formPrestLey.get('activo').enable();
    } else {
      this.formPrestLey.get('prestacionLey').disable();
      this.formPrestLey.get('activo').disable();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
