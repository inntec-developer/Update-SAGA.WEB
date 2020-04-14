import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSort  } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

// Servicios
import { CatalogosService } from '../../../service/catalogos/catalogos.service';
import { SettingsService } from '../../../core/settings/settings.service';

// Modelos
import { catalogos } from '../../../models/catalogos/catalogos';
@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit, OnChanges {

  @Input() SelectedRol: any;
  @Input() Log: any;
  @Output() UpRol = new EventEmitter<number>(); // Id de País para actualizar tabla.
  formRol: FormGroup;

  displayedColumns: string[] = ['id', 'usuario', 'fechaAct', 'tpMov'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private services: CatalogosService, private settings: SettingsService ) {
    this.formRol = new FormGroup({
      id: new FormControl(),
      rol: new FormControl({value: '', disabled: true}, [Validators.required]),
      activo: new FormControl({value: '', disabled: true})
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.SelectedRol !== undefined) {
      this.Habilita(false);
      this.formRol.get('id').setValue(this.SelectedRol.id);
      this.formRol.get('rol').setValue(this.SelectedRol.rol);
      this.formRol.get('activo').setValue(this.SelectedRol.activo);
    }
    if (this.Log !== undefined) {
      this.dataSource = new MatTableDataSource(this.Log);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  New() {
    this.formRol.reset();
    this.Habilita(false);
    this.SelectedRol = '';
  }

  Save() {
    const catalogo: catalogos = new catalogos();
    this.SelectedRol !== '' ? catalogo.opt = 2 : catalogo.opt = 1;
    catalogo.usuario = this.settings.user['usuario'];
    catalogo.Catalogos = {
      Id: 44,
      Nombre: 'Roles',
      Descripcion: 'Catalogo de roles',
      Activo: true
    };
    catalogo.Roles = [this.formRol.getRawValue()];
    console.log(catalogo);
    this.services.GuardaCatalogo(catalogo)
    .subscribe( result => { // Agregar
      result ? this.UpRol.emit(catalogo.Catalogos.Id) : console.log(result);
      this.Habilita(true);
    });
  }

  Limpiar() {
    this.formRol.reset();
  }

  Habilita(opt: boolean) {
    if (!opt) {
      this.formRol.get('rol').enable();
      this.formRol.get('activo').enable();
    } else {
      this.formRol.get('rol').disable();
      this.formRol.get('activo').disable();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}