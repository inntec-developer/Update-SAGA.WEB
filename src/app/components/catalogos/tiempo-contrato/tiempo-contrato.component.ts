import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { CatalogosService } from '../../../service/catalogos/catalogos.service';
import { SettingsService } from '../../../core/settings/settings.service';
import { catalogos } from '../../../models/catalogos/catalogos';

// Servicios

// Modelos



@Component({
  selector: 'app-tiempo-contrato',
  templateUrl: './tiempo-contrato.component.html',
  styleUrls: ['./tiempo-contrato.component.scss']
})
export class TiempoContratoComponent implements OnInit, OnChanges {

  @Input() SelectedTiempoContrato: any;
  @Input() Log: any;
  @Output() UpTiempoCont = new EventEmitter<number>(); // Id de País para actualizar tabla.
  formTiempoCont: FormGroup;

  displayedColumns: string[] = ['id', 'usuario', 'fechaAct', 'tpMov'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private services: CatalogosService, private settings: SettingsService ) {
    this.formTiempoCont = new FormGroup({
      id: new FormControl(),
      tiempo: new FormControl({value: '', disabled: true}, [Validators.required]),
      orden: new FormControl({value: '', disabled: true}, [Validators.required]),
      activo: new FormControl({value: '', disabled: true})
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.SelectedTiempoContrato !== undefined) {
      this.Habilita(false);
      this.formTiempoCont.get('id').setValue(this.SelectedTiempoContrato.id);
      this.formTiempoCont.get('tiempo').setValue(this.SelectedTiempoContrato.tiempo);
      this.formTiempoCont.get('orden').setValue(this.SelectedTiempoContrato.orden);
      this.formTiempoCont.get('activo').setValue(this.SelectedTiempoContrato.activo);
    }
    if (this.Log !== undefined) {
      this.dataSource = new MatTableDataSource(this.Log);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  New() {
    this.formTiempoCont.reset();
    this.Habilita(false);
    this.SelectedTiempoContrato = '';
  }

  Save() {
    const catalogo: catalogos = new catalogos();
    this.SelectedTiempoContrato !== '' ? catalogo.opt = 2 : catalogo.opt = 1;
    catalogo.usuario = this.settings.user['usuario'];
    catalogo.Catalogos = {
      Id: 29,
      Nombre: 'Tiempo contrato',
      Descripcion: 'Catalogo de tiempos de contrato',
      Activo: true
    };
    catalogo.TiemposContrato = [this.formTiempoCont.getRawValue()];
    console.log(catalogo);
    this.services.GuardaCatalogo(catalogo)
    .subscribe( result => { // Agregar
      result ? this.UpTiempoCont.emit(catalogo.Catalogos.Id) : console.log(result);
      this.Habilita(true);
    });
  }

  Limpiar() {
    this.formTiempoCont.reset();
  }

  Habilita(opt: boolean) {
    if (!opt) {
      this.formTiempoCont.get('tiempo').enable();
      this.formTiempoCont.get('orden').enable();
      this.formTiempoCont.get('activo').enable();
    } else {
      this.formTiempoCont.get('tiempo').disable();
      this.formTiempoCont.get('orden').disable();
      this.formTiempoCont.get('activo').disable();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
