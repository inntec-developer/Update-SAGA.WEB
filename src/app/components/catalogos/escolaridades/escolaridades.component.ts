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
  selector: 'app-escolaridades',
  templateUrl: './escolaridades.component.html',
  styleUrls: ['./escolaridades.component.scss']
})
export class EscolaridadesComponent implements OnInit, OnChanges {

  @Input() SelectedEscolaridad: any;
  @Input() Log: any;
  @Output() UpEscolaridad = new EventEmitter<number>(); // Id de Areas para actualizar tabla.
  formEscolaridad: FormGroup;

  displayedColumns: string[] = ['id', 'usuario', 'fechaAct', 'tpMov'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private services: CatalogosService, private settings: SettingsService ) {
    this.formEscolaridad = new FormGroup({
      id: new FormControl(),
      gradoEstudio: new FormControl({value: '', disabled: true}, [Validators.required])
    });
   }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.SelectedEscolaridad !== undefined) {
      this.Habilita(false);
      this.formEscolaridad.get('id').setValue(this.SelectedEscolaridad.id);
      this.formEscolaridad.get('gradoEstudio').setValue(this.SelectedEscolaridad.gradoEstudio);
    }
    if (this.Log !== undefined) {
      this.dataSource = new MatTableDataSource(this.Log);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  New() {
    this.formEscolaridad.reset();
    this.SelectedEscolaridad = '';
    this.Habilita(false);
  }

  Save() {
    const catalogo: catalogos = new catalogos();
    this.SelectedEscolaridad !== '' ? catalogo.opt = 2 : catalogo.opt = 1;
    catalogo.usuario = this.settings.user['usuario'];
    catalogo.Catalogos = {
      Id: 34,
      Nombre: 'Escolaridades',
      Descripcion: 'Catalogo de escolaridades',
      Activo: true
    };
    catalogo.Escolaridades = [this.formEscolaridad.getRawValue()];

    this.services.GuardaCatalogo(catalogo)
    .subscribe( result => { // Agregar
      result ? this.UpEscolaridad.emit(catalogo.Catalogos.Id) :  null;
      this.Habilita(true);
    });
  }

  Limpiar() {
    this.formEscolaridad.reset();
  }

  Habilita(opt: boolean) {
    if (!opt) {
      this.formEscolaridad.get('gradoEstudio').enable();
    } else {
      this.formEscolaridad.get('gradoEstudio').disable();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
