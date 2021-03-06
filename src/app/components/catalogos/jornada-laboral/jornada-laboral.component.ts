import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSort  } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { CatalogosService } from '../../../service/catalogos/catalogos.service';
import { SettingsService } from '../../../core/settings/settings.service';
import { catalogos } from '../../../models/catalogos/catalogos';

// Servicios

// Modelos


@Component({
  selector: 'app-jornada-laboral',
  templateUrl: './jornada-laboral.component.html',
  styleUrls: ['./jornada-laboral.component.scss']
})
export class JornadaLaboralComponent implements OnInit, OnChanges {

  @Input() SelectedJornada: any;
  @Input() Log: any;
  @Output() UpJornada = new EventEmitter<number>(); // Id de País para actualizar tabla.
  formJornada: FormGroup;

  displayedColumns: string[] = ['id', 'usuario', 'fechaAct', 'tpMov'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private services: CatalogosService, private settings: SettingsService ) {
    this.formJornada = new FormGroup({
      id: new FormControl(),
      jornada: new FormControl({value: '', disabled: true}, [Validators.required]),
      orden: new FormControl({value: '', disabled: true}, [Validators.required]),
      varioshorarios: new FormControl({value: '', disabled: true}),
      activo: new FormControl({value: '', disabled: true})
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.SelectedJornada !== undefined) {
      this.Habilita(false);
      this.formJornada.get('id').setValue(this.SelectedJornada.id);
      this.formJornada.get('jornada').setValue(this.SelectedJornada.jornada);
      this.formJornada.get('orden').setValue(this.SelectedJornada.orden);
      this.formJornada.get('varioshorarios').setValue(this.SelectedJornada.variosHorarios);
      this.formJornada.get('activo').setValue(this.SelectedJornada.activo);
    }
    if (this.Log !== undefined) {
      this.dataSource = new MatTableDataSource(this.Log);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  New() {
    this.formJornada.reset();
    this.Habilita(false);
    this.SelectedJornada = '';
  }

  Save() {
    const catalogo: catalogos = new catalogos();
    this.SelectedJornada !== '' ? catalogo.opt = 2 : catalogo.opt = 1;
    catalogo.usuario = this.settings.user['usuario'];
    catalogo.Catalogos = {
      Id: 20,
      Nombre: 'Jornadas',
      Descripcion: 'Catalogo de jornadas',
      Activo: true
    };
    catalogo.JornadaLaboral = [this.formJornada.getRawValue()];

    this.services.GuardaCatalogo(catalogo)
    .subscribe( result => { // Agregar
      result ? this.UpJornada.emit(catalogo.Catalogos.Id) :  null;
      this.Habilita(true);
    });
  }

  Limpiar() {
    this.formJornada.reset();
  }

  Habilita(opt: boolean) {
    if (!opt) {
      this.formJornada.get('jornada').enable();
      this.formJornada.get('orden').enable();
      this.formJornada.get('varioshorarios').enable();
      this.formJornada.get('activo').enable();
    } else {
      this.formJornada.get('jornada').disable();
      this.formJornada.get('orden').disable();
      this.formJornada.get('varioshorarios').disable();
      this.formJornada.get('activo').disable();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
