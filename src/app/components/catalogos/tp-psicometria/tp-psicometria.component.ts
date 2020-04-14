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
  selector: 'app-tp-psicometria',
  templateUrl: './tp-psicometria.component.html',
  styleUrls: ['./tp-psicometria.component.scss']
})
export class TpPsicometriaComponent implements OnInit, OnChanges {

  @Input() SelectedPsicometria: any;
  @Input() Log: any;
  @Output() UpPsicometria = new EventEmitter<number>(); // Id de País para actualizar tabla.
  formPsicometria: FormGroup;

  displayedColumns: string[] = ['id', 'usuario', 'fechaAct', 'tpMov'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private services: CatalogosService, private settings: SettingsService ) {
    this.formPsicometria = new FormGroup({
      id: new FormControl(),
      tipoPsicometria: new FormControl({value: '', disabled: true}, [Validators.required]),
      descripcion: new FormControl({value: '', disabled: true}, [Validators.required]),
      activo: new FormControl({value: '', disabled: true})
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.SelectedPsicometria !== undefined) {
      this.Habilita(false);
      this.formPsicometria.get('id').setValue(this.SelectedPsicometria.id);
      this.formPsicometria.get('tipoPsicometria').setValue(this.SelectedPsicometria.tipoPsicometria);
      this.formPsicometria.get('descripcion').setValue(this.SelectedPsicometria.descripcion);
      this.formPsicometria.get('activo').setValue(this.SelectedPsicometria.activo);
    }
    if (this.Log !== undefined) {
      this.dataSource = new MatTableDataSource(this.Log);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  New() {
    this.formPsicometria.reset();
    this.Habilita(false);
    this.SelectedPsicometria = '';
  }

  Save() {
    const catalogo: catalogos = new catalogos();
    this.SelectedPsicometria !== '' ? catalogo.opt = 2 : catalogo.opt = 1;
    catalogo.usuario = this.settings.user['usuario'];
    catalogo.Catalogos = {
      Id: 22,
      Nombre: 'Psicometrias',
      Descripcion: 'Catalogo de psicometrias',
      Activo: true
    };
    catalogo.TipoPsicometria = [this.formPsicometria.getRawValue()];

    this.services.GuardaCatalogo(catalogo)
    .subscribe( result => { // Agregar
      result ? this.UpPsicometria.emit(catalogo.Catalogos.Id) :  null;
      this.Habilita(true);
    });
  }

  Limpiar() {
    this.formPsicometria.reset();
  }

  Habilita(opt: boolean) {
    if (!opt) {
      this.formPsicometria.get('tipoPsicometria').enable();
      this.formPsicometria.get('descripcion').enable();
      this.formPsicometria.get('activo').enable();
    } else {
      this.formPsicometria.get('tipoPsicometria').disable();
      this.formPsicometria.get('descripcion').disable();
      this.formPsicometria.get('activo').disable();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
