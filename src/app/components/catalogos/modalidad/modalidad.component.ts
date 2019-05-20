import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { CatalogosService } from '../../../service/catalogos/catalogos.service';
import { SettingsService } from '../../../core/settings/settings.service';
import { catalogos } from '../../../models/catalogos/catalogos';

// Servicios

// Modelos



@Component({
  selector: 'app-modalidad',
  templateUrl: './modalidad.component.html',
  styleUrls: ['./modalidad.component.scss']
})
export class ModalidadComponent implements OnInit, OnChanges {

  @Input() SelectedModalidad: any;
  @Input() Log: any;
  @Output() UpModalidad = new EventEmitter<number>(); // Id de País para actualizar tabla.
  formModalidad: FormGroup;

  displayedColumns: string[] = ['id', 'usuario', 'fechaAct', 'tpMov'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private services: CatalogosService, private settings: SettingsService ) {
    this.formModalidad = new FormGroup({
      id: new FormControl(),
      modalidad: new FormControl({value: '', disabled: true}, [Validators.required]),
      orden: new FormControl({value: '', disabled: true}, [Validators.required]),
      activo: new FormControl({value: '', disabled: true})
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.SelectedModalidad !== undefined) {
      this.Habilita(false);
      this.formModalidad.get('id').setValue(this.SelectedModalidad.id);
      this.formModalidad.get('modalidad').setValue(this.SelectedModalidad.modalidad);
      this.formModalidad.get('orden').setValue(this.SelectedModalidad.orden);
      this.formModalidad.get('activo').setValue(this.SelectedModalidad.activo);
    }
    if (this.Log !== undefined) {
      this.dataSource = new MatTableDataSource(this.Log);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  New() {
    this.formModalidad.reset();
    this.Habilita(false);
    this.SelectedModalidad = '';
  }

  Save() {
    const catalogo: catalogos = new catalogos();
    this.SelectedModalidad !== '' ? catalogo.opt = 2 : catalogo.opt = 1;
    catalogo.usuario = this.settings.user['usuario'];
    catalogo.Catalogos = {
      Id: 21,
      Nombre: 'Tipo Modalidad',
      Descripcion: 'Catalogo de tipo modalidad',
      Activo: true
    };
    catalogo.TipoModalidad = [this.formModalidad.getRawValue()];
    console.log(catalogo);
    this.services.GuardaCatalogo(catalogo)
    .subscribe( result => { // Agregar
      result ? this.UpModalidad.emit(catalogo.Catalogos.Id) : console.log(result);
      this.Habilita(true);
    });
  }

  Limpiar() {
    this.formModalidad.reset();
  }

  Habilita(opt: boolean) {
    if (!opt) {
      this.formModalidad.get('modalidad').enable();
      this.formModalidad.get('orden').enable();
      this.formModalidad.get('activo').enable();
    } else {
      this.formModalidad.get('modalidad').disable();
      this.formModalidad.get('orden').disable();
      this.formModalidad.get('activo').disable();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
