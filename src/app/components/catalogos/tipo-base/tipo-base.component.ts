import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
// Servicios
import { CatalogosService } from '../../../service/catalogos/catalogos.service';
// Modelos
import { catalogos } from '../../../models/catalogos/catalogos';

@Component({
  selector: 'app-tipo-base',
  templateUrl: './tipo-base.component.html',
  styleUrls: ['./tipo-base.component.scss']
})
export class TipoBaseComponent implements OnInit, OnChanges {

  @Input() SelectedTipoBase: any;
  @Input() Log: any;
  @Output() UpTipoBase = new EventEmitter<number>(); // Id de País para actualizar tabla.
  formtpBase: FormGroup;

  displayedColumns: string[] = ['id', 'usuario', 'fechaAct', 'tpMov'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private services: CatalogosService ) {
    this.formtpBase = new FormGroup({
      id: new FormControl(),
      tipobase: new FormControl({value: '', disabled: true}, [Validators.required]),
      activo: new FormControl({value: '', disabled: true})
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.SelectedTipoBase !== undefined) {
      this.Habilita(false);
      this.formtpBase.get('id').setValue(this.SelectedTipoBase.id);
      this.formtpBase.get('tipobase').setValue(this.SelectedTipoBase.tipoBase);
      this.formtpBase.get('activo').setValue(this.SelectedTipoBase.activo);
    }
    if (this.Log !== undefined) {
      this.dataSource = new MatTableDataSource(this.Log);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  New() {
    this.formtpBase.reset();
    this.Habilita(false);
    this.SelectedTipoBase = '';
  }

  Save() {
    const catalogo: catalogos = new catalogos();
    this.SelectedTipoBase !== '' ? catalogo.opt = 2 : catalogo.opt = 1;
    catalogo.usuario = sessionStorage.getItem('usuario');
    catalogo.Catalogos = {
      Id: 11,
      Nombre: 'Tipo base',
      Descripcion: 'Catalogo de tipos base',
      Activo: true
    };
    catalogo.TiposBase = [this.formtpBase.getRawValue()];
    console.log(catalogo);
    this.services.GuardaCatalogo(catalogo)
    .subscribe( result => { // Agregar
      result ? this.UpTipoBase.emit(catalogo.Catalogos.Id) : console.log(result);
      this.Habilita(true);
    });
  }

  Limpiar() {
    this.formtpBase.reset();
  }

  Habilita(opt: boolean) {
    if (!opt) {
      this.formtpBase.get('tipobase').enable();
      this.formtpBase.get('activo').enable();
    } else {
      this.formtpBase.get('tipobase').disable();
      this.formtpBase.get('activo').disable();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
