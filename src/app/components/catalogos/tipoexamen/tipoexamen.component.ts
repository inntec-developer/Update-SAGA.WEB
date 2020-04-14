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
  selector: 'app-tipoexamen',
  templateUrl: './tipoexamen.component.html',
  styleUrls: ['./tipoexamen.component.scss']
})
export class TipoexamenComponent implements OnInit, OnChanges {

  @Input() SelectedTpExamen: any;
  @Input() Log: any;
  @Output() UpTpExamen = new EventEmitter<number>(); // Id de País para actualizar tabla.
  formTpExamen: FormGroup;

  displayedColumns: string[] = ['id', 'usuario', 'fechaAct', 'tpMov'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private services: CatalogosService, private settings: SettingsService ) {
    this.formTpExamen = new FormGroup({
      id: new FormControl(),
      nombre: new FormControl({value: '', disabled: true}, [Validators.required]),
      descripcion: new FormControl({value: '', disabled: true}, [Validators.required]),
      activo: new FormControl({value: '', disabled: true})
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.SelectedTpExamen !== undefined) {
      this.Habilita(false);
      this.formTpExamen.get('id').setValue(this.SelectedTpExamen.id);
      this.formTpExamen.get('nombre').setValue(this.SelectedTpExamen.nombre);
      this.formTpExamen.get('descripcion').setValue(this.SelectedTpExamen.descripcion);
      this.formTpExamen.get('activo').setValue(this.SelectedTpExamen.activo);
    }
    if (this.Log !== undefined) {
      this.dataSource = new MatTableDataSource(this.Log);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  New() {
    this.formTpExamen.reset();
    this.Habilita(false);
    this.SelectedTpExamen = '';
  }

  Save() {
    const catalogo: catalogos = new catalogos();
    this.SelectedTpExamen !== '' ? catalogo.opt = 2 : catalogo.opt = 1;
    catalogo.usuario = this.settings.user['usuario'];
    catalogo.Catalogos = {
      Id: 40,
      Nombre: 'Tipo examen',
      Descripcion: 'Catalogo de examen',
      Activo: true
    };
    catalogo.TipoExamen = [this.formTpExamen.getRawValue()];

    this.services.GuardaCatalogo(catalogo)
    .subscribe( result => { // Agregar
      result ? this.UpTpExamen.emit(catalogo.Catalogos.Id) :  null;
      this.Habilita(true);
    });
  }

  Limpiar() {
    this.formTpExamen.reset();
  }

  Habilita(opt: boolean) {
    if (!opt) {
      this.formTpExamen.get('nombre').enable();
      this.formTpExamen.get('descripcion').enable();
      this.formTpExamen.get('activo').enable();
    } else {
      this.formTpExamen.get('nombre').disable();
      this.formTpExamen.get('descripcion').disable();
      this.formTpExamen.get('activo').disable();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
