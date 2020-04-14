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

  constructor(private services: CatalogosService, private settings: SettingsService) {
    this.formMedios = new FormGroup({
      id: new FormControl(),
      nombre: new FormControl({ value: '', disabled: true }, [Validators.required]),
      activo: new FormControl({ value: '', disabled: true })
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
    catalogo.usuario = this.settings.user['usuario'];
    catalogo.Catalogos = {
      Id: 36,
      Nombre: 'Medios',
      Descripcion: 'Catalogo de medios',
      Activo: true
    };
    catalogo.Medio = [this.formMedios.getRawValue()];

    this.services.GuardaCatalogo(catalogo)
      .subscribe(result => { // Agregar
        result ? this.UpMedios.emit(catalogo.Catalogos.Id) :  null;
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
