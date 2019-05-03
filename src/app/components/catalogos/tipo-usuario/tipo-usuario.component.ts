import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { CatalogosService } from '../../../service/catalogos/catalogos.service';
import { catalogos } from '../../../models/catalogos/catalogos';

// Servicios

// Modelos


@Component({
  selector: 'app-tipo-usuario',
  templateUrl: './tipo-usuario.component.html',
  styleUrls: ['./tipo-usuario.component.scss']
})
export class TipoUsuarioComponent implements OnInit, OnChanges {

  @Input() SelectedTipoUsuario: any;
  @Input() Log: any;
  @Output() UpTpUsuario = new EventEmitter<number>(); // Id de tipo de telefono para actualizar tabla.
  formTipoUsuario: FormGroup;

  displayedColumns: string[] = ['id', 'usuario', 'fechaAct', 'tpMov'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private services: CatalogosService ) {
    this.formTipoUsuario = new FormGroup({
      id: new FormControl(),
      tipo: new FormControl({value: '', disabled: true}, [Validators.required])
    });
  }
  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.SelectedTipoUsuario !== undefined) {
      this.Habilita(false);
      this.formTipoUsuario.get('id').setValue(this.SelectedTipoUsuario.id);
      this.formTipoUsuario.get('tipo').setValue(this.SelectedTipoUsuario.tipo);
    }
    if (this.Log !== undefined) {
      this.dataSource = new MatTableDataSource(this.Log);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  New() {
    this.Habilita(false);
    this.formTipoUsuario.reset();
    this.SelectedTipoUsuario = '';
  }

  Save() {
    const catalogo: catalogos = new catalogos();
    this.SelectedTipoUsuario !== '' ? catalogo.opt = 2 : catalogo.opt = 1;
    catalogo.usuario = sessionStorage.getItem('usuario');
    catalogo.Catalogos = {
      Id: 41,
      Nombre: 'Tipo de usuarios',
      Descripcion: 'Catalogo de tipo de usuario',
      Activo: true
    };
    catalogo.TpUsuario = [this.formTipoUsuario.getRawValue()];
    this.services.GuardaCatalogo(catalogo)
    .subscribe( result => { // Agregar
      result ? this.UpTpUsuario.emit(catalogo.Catalogos.Id) : console.log(result);
      this.Habilita(true);
    });
  }

  Limpiar() {
    this.formTipoUsuario.reset();
  }

  Habilita(opt: boolean) {
    if (!opt) {
      this.formTipoUsuario.get('tipo').enable();
    } else {
      this.formTipoUsuario.get('tipo').disable();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
