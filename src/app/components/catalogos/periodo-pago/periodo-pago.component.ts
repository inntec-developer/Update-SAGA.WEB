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
  selector: 'app-periodo-pago',
  templateUrl: './periodo-pago.component.html',
  styleUrls: ['./periodo-pago.component.scss']
})
export class PeriodoPagoComponent implements OnInit, OnChanges {

  @Input() SelectedPeriodo: any;
  @Input() Log: any;
  @Output() UpPeriodo = new EventEmitter<number>(); // Id de País para actualizar tabla.
  formPeriodo: FormGroup;

  displayedColumns: string[] = ['id', 'usuario', 'fechaAct', 'tpMov'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private services: CatalogosService, private settings: SettingsService ) {
    this.formPeriodo = new FormGroup({
      id: new FormControl(),
      periodoPago: new FormControl({value: '', disabled: true}, [Validators.required]),
      activo: new FormControl({value: '', disabled: true})
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.SelectedPeriodo !== undefined) {
      this.Habilita(false);
      this.formPeriodo.get('id').setValue(this.SelectedPeriodo.id);
      this.formPeriodo.get('periodoPago').setValue(this.SelectedPeriodo.periodoPago);
      this.formPeriodo.get('activo').setValue(this.SelectedPeriodo.activo);
    }
    if (this.Log !== undefined) {
      this.dataSource = new MatTableDataSource(this.Log);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  New() {
    this.formPeriodo.reset();
    this.Habilita(false);
    this.SelectedPeriodo = '';
  }

  Save() {
    const catalogo: catalogos = new catalogos();
    this.SelectedPeriodo !== '' ? catalogo.opt = 2 : catalogo.opt = 1;
    catalogo.usuario = this.settings.user['usuario'];
    catalogo.Catalogos = {
      Id: 26,
      Nombre: 'Periodo pagos',
      Descripcion: 'Catalogo de periodo de pago',
      Activo: true
    };
    catalogo.PeriodoPago = [this.formPeriodo.getRawValue()];

    this.services.GuardaCatalogo(catalogo)
    .subscribe( result => { // Agregar
      result ? this.UpPeriodo.emit(catalogo.Catalogos.Id) :  null;
      this.Habilita(true);
    });
  }

  Limpiar() {
    this.formPeriodo.reset();
  }

  Habilita(opt: boolean) {
    if (!opt) {
      this.formPeriodo.get('periodoPago').enable();
      this.formPeriodo.get('activo').enable();
    } else {
      this.formPeriodo.get('periodoPago').disable();
      this.formPeriodo.get('activo').disable();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
