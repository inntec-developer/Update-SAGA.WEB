import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { MatSort  } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { CatalogosService } from '../../../service/catalogos/catalogos.service';
import { SettingsService } from '../../../core/settings/settings.service';
import { catalogos } from '../../../models/catalogos/catalogos';

// Servicios

// Modelos


@Component({
  selector: 'app-tipo-telefono',
  templateUrl: './tipo-telefono.component.html',
  styleUrls: ['./tipo-telefono.component.scss']
})
export class TipoTelefonoComponent implements OnInit, OnChanges {

  @Input() SelectedTipoTelefono: any;
  @Input() Log: any;
  @Output() UpTpTelefono = new EventEmitter<number>(); // Id de tipo de telefono para actualizar tabla.
  formTipoTelefono: FormGroup;

  displayedColumns: string[] = ['id', 'usuario', 'fechaAct', 'tpMov'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private services: CatalogosService, private settings: SettingsService ) {
    this.formTipoTelefono = new FormGroup({
      id: new FormControl(),
      tipo: new FormControl({value: '', disabled: true}, [Validators.required]),
      activo: new FormControl({value: '', disabled: true}, [Validators.required])
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.SelectedTipoTelefono !== undefined) {
      this.Habilita(false);
      this.formTipoTelefono.get('id').setValue(this.SelectedTipoTelefono.id);
      this.formTipoTelefono.get('tipo').setValue(this.SelectedTipoTelefono.tipo);
      this.formTipoTelefono.get('activo').setValue(this.SelectedTipoTelefono.activo);
    }
    if (this.Log !== undefined) {
      this.dataSource = new MatTableDataSource(this.Log);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  New() {
    this.Habilita(false);
    this.formTipoTelefono.reset();
    this.SelectedTipoTelefono = '';
  }

  Save() {
    const catalogo: catalogos = new catalogos();
    this.SelectedTipoTelefono !== '' ? catalogo.opt = 2 : catalogo.opt = 1;
    catalogo.usuario = this.settings.user['usuario'];
    catalogo.Catalogos = {
      Id: 6,
      Nombre: 'Tipo de telefono',
      Descripcion: 'Catalogo de tipo de telefono',
      Activo: true
    };
    catalogo.TpTelefono = [this.formTipoTelefono.getRawValue()];
    this.services.GuardaCatalogo(catalogo)
    .subscribe( result => { // Agregar
      result ? this.UpTpTelefono.emit(catalogo.Catalogos.Id) :  null;
      this.Habilita(true);
    });
  }

  Limpiar() {
    this.formTipoTelefono.reset();
  }

  Habilita(opt: boolean) {
    if (!opt) {
      this.formTipoTelefono.get('tipo').enable();
      this.formTipoTelefono.get('activo').enable();
    } else {
      this.formTipoTelefono.get('tipo').disable();
      this.formTipoTelefono.get('activo').disable();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
