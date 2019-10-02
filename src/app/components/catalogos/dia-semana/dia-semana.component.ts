import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { CatalogosService } from '../../../service/catalogos/catalogos.service';
import { SettingsService } from '../../../core/settings/settings.service';
import { catalogos } from '../../../models/catalogos/catalogos';

// Servicios

// Modelos



@Component({
  selector: 'app-dia-semana',
  templateUrl: './dia-semana.component.html',
  styleUrls: ['./dia-semana.component.scss']
})
export class DiaSemanaComponent implements OnInit, OnChanges {

  @Input() SelectedDia: any;
  @Input() Log: any;
  @Output() UpDias = new EventEmitter<number>(); // Id de País para actualizar tabla.
  formDias: FormGroup;

  displayedColumns: string[] = ['id', 'usuario', 'fechaAct', 'tpMov'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private services: CatalogosService, private settings: SettingsService ) {
    this.formDias = new FormGroup({
      id: new FormControl(),
      diaSemana: new FormControl({value: '', disabled: true}, [Validators.required]),
      tipo: new FormControl({value: '', disabled: true}, [Validators.required]),
      activo: new FormControl({value: '', disabled: true})
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.SelectedDia !== undefined) {
      this.Habilita(false);
      this.formDias.get('id').setValue(this.SelectedDia.id);
      this.formDias.get('diaSemana').setValue(this.SelectedDia.diaSemana);
      this.formDias.get('tipo').setValue(this.SelectedDia.tipo);
      this.formDias.get('activo').setValue(this.SelectedDia.activo);
    }
    if (this.Log !== undefined) {
      this.dataSource = new MatTableDataSource(this.Log);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  New() {
    this.formDias.reset();
    this.Habilita(false);
    this.SelectedDia = '';
  }

  Save() {
    const catalogo: catalogos = new catalogos();
    this.SelectedDia !== '' ? catalogo.opt = 2 : catalogo.opt = 1;
    catalogo.usuario = this.settings.user['usuario'];
    catalogo.Catalogos = {
      Id: 23,
      Nombre: 'Dias de la semana',
      Descripcion: 'Catalogo de días de la semana',
      Activo: true
    };
    catalogo.DiasSemana = [this.formDias.getRawValue()];

    this.services.GuardaCatalogo(catalogo)
    .subscribe( result => { // Agregar
      result ? this.UpDias.emit(catalogo.Catalogos.Id) :  null;
      this.Habilita(true);
    });
  }

  Limpiar() {
    this.formDias.reset();
  }

  Habilita(opt: boolean) {
    if (!opt) {
      this.formDias.get('diaSemana').enable();
      this.formDias.get('tipo').enable();
      this.formDias.get('activo').enable();
    } else {
      this.formDias.get('diaSemana').disable();
      this.formDias.get('tipo').disable();
      this.formDias.get('activo').disable();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
