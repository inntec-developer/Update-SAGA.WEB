import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
// Servicios
import { CatalogosService } from '../../../service/catalogos/catalogos.service';
// Modelos
import { catalogos } from '../../../models/catalogos/catalogos';

@Component({
  selector: 'app-giro-empresa',
  templateUrl: './giro-empresa.component.html',
  styleUrls: ['./giro-empresa.component.scss']
})
export class GiroEmpresaComponent implements OnInit, OnChanges {

  @Input() SelectedGiro: any;
  @Input() Log: any;
  @Output() UpGiro = new EventEmitter<number>(); // Id de País para actualizar tabla.
  formGiro: FormGroup;

  displayedColumns: string[] = ['id', 'usuario', 'fechaAct', 'tpMov'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private services: CatalogosService ) {
    this.formGiro = new FormGroup({
      id: new FormControl(),
      giroempresa: new FormControl({value: '', disabled: true}, [Validators.required]),
      activo: new FormControl({value: '', disabled: true})
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.SelectedGiro !== undefined) {
      this.Habilita(false);
      this.formGiro.get('id').setValue(this.SelectedGiro.id);
      this.formGiro.get('giroempresa').setValue(this.SelectedGiro.giroEmpresa);
      this.formGiro.get('activo').setValue(this.SelectedGiro.activo);
    }
    if (this.Log !== undefined) {
      this.dataSource = new MatTableDataSource(this.Log);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  New() {
    this.formGiro.reset();
    this.Habilita(false);
    this.SelectedGiro = '';
  }

  Save() {
    const catalogo: catalogos = new catalogos();
    this.SelectedGiro !== '' ? catalogo.opt = 2 : catalogo.opt = 1;
    catalogo.usuario = sessionStorage.getItem('usuario');
    catalogo.Catalogos = {
      Id: 8,
      Nombre: 'Giro Empresa',
      Descripcion: 'Catalogo de giro empresas',
      Activo: true
    };
    catalogo.GiroEmpresa = [this.formGiro.getRawValue()];
    console.log(catalogo);
    this.services.GuardaCatalogo(catalogo)
    .subscribe( result => { // Agregar
      result ? this.UpGiro.emit(catalogo.Catalogos.Id) : console.log(result);
      this.Habilita(true);
    });
  }

  Limpiar() {
    this.formGiro.reset();
  }

  Habilita(opt: boolean) {
    if (!opt) {
      this.formGiro.get('giroempresa').enable();
      this.formGiro.get('activo').enable();
    } else {
      this.formGiro.get('giroempresa').disable();
      this.formGiro.get('activo').disable();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
