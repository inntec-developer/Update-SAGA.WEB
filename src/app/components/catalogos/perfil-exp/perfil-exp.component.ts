import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
// Servicios
import { CatalogosService } from '../../../service/catalogos/catalogos.service';
// Modelos
import { catalogos } from '../../../models/catalogos/catalogos';

@Component({
  selector: 'app-perfil-exp',
  templateUrl: './perfil-exp.component.html',
  styleUrls: ['./perfil-exp.component.scss']
})
export class PerfilExpComponent implements OnInit, OnChanges {

  @Input() SelectedPerfil: any;
  @Input() Log: any;
  @Output() UpPerfil = new EventEmitter<number>(); // Id de País para actualizar tabla.
  formPerfil: FormGroup;

  displayedColumns: string[] = ['id', 'usuario', 'fechaAct', 'tpMov'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private services: CatalogosService ) {
    this.formPerfil = new FormGroup({
      id: new FormControl(),
      perfilexperiencia: new FormControl({value: '', disabled: true}, [Validators.required]),
      activo: new FormControl({value: '', disabled: true})
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.SelectedPerfil !== undefined) {
      this.Habilita(false);
      this.formPerfil.get('id').setValue(this.SelectedPerfil.id);
      this.formPerfil.get('perfilexperiencia').setValue(this.SelectedPerfil.perfilExperiencia);
      this.formPerfil.get('activo').setValue(this.SelectedPerfil.activo);
    }
    if (this.Log !== undefined) {
      this.dataSource = new MatTableDataSource(this.Log);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  New() {
    this.formPerfil.reset();
    this.Habilita(false);
    this.SelectedPerfil = '';
  }

  Save() {
    const catalogo: catalogos = new catalogos();
    this.SelectedPerfil !== '' ? catalogo.opt = 2 : catalogo.opt = 1;
    catalogo.usuario = sessionStorage.getItem('usuario');
    catalogo.Catalogos = {
      Id: 16,
      Nombre: 'Perfil experiencia',
      Descripcion: 'Catalogo de perfil experiencia',
      Activo: true
    };
    catalogo.PerfilExperiencia = [this.formPerfil.getRawValue()];
    console.log(catalogo);
    this.services.GuardaCatalogo(catalogo)
    .subscribe( result => { // Agregar
      result ? this.UpPerfil.emit(catalogo.Catalogos.Id) : console.log(result);
      this.Habilita(true);
    });
  }

  Limpiar() {
    this.formPerfil.reset();
  }

  Habilita(opt: boolean) {
    if (!opt) {
      this.formPerfil.get('perfilexperiencia').enable();
      this.formPerfil.get('activo').enable();
    } else {
      this.formPerfil.get('perfilexperiencia').disable();
      this.formPerfil.get('activo').disable();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
