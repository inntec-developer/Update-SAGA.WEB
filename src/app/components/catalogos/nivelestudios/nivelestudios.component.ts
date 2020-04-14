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
  selector: 'app-nivelestudios',
  templateUrl: './nivelestudios.component.html',
  styleUrls: ['./nivelestudios.component.scss']
})
export class NivelestudiosComponent implements OnInit, OnChanges {

  @Input() SelectedNivel: any;
  @Input() Log: any;
  @Output() UpNivel = new EventEmitter<number>(); // Id de Niveles para actualizar tabla.
  formNivel: FormGroup;

  displayedColumns: string[] = ['id', 'usuario', 'fechaAct', 'tpMov'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private services: CatalogosService, private settings: SettingsService ) {
    this.formNivel = new FormGroup({
      id: new FormControl(),
      nivel: new FormControl({value: '', disabled: true}, [Validators.required])
    });
   }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.SelectedNivel !== undefined) {
      this.Habilita(false);
      this.formNivel.get('id').setValue(this.SelectedNivel.id);
      this.formNivel.get('nivel').setValue(this.SelectedNivel.nivel);
    }
    if (this.Log !== undefined) {
      this.dataSource = new MatTableDataSource(this.Log);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  New() {
    this.formNivel.reset();
    this.SelectedNivel = '';
    this.Habilita(false);
  }

  Save() {
    const catalogo: catalogos = new catalogos();
    this.SelectedNivel !== '' ? catalogo.opt = 2 : catalogo.opt = 1;
    catalogo.usuario = this.settings.user['usuario'];
    catalogo.Catalogos = {
      Id: 35,
      Nombre: 'Niveles',
      Descripcion: 'Catalogo de nivel',
      Activo: true
    };
    catalogo.Nivel = [this.formNivel.getRawValue()];

    this.services.GuardaCatalogo(catalogo)
    .subscribe( result => { // Agregar
      result ? this.UpNivel.emit(catalogo.Catalogos.Id) :  null;
      this.Habilita(true);
    });
  }

  Limpiar() {
    this.formNivel.reset();
  }

  Habilita(opt: boolean) {
    if (!opt) {
      this.formNivel.get('nivel').enable();
    } else {
      this.formNivel.get('nivel').disable();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
