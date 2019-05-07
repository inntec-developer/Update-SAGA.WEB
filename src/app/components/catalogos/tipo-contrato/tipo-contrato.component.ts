import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
// Servicios
import { CatalogosService } from '../../../service/catalogos/catalogos.service';
// Modelos
import { catalogos } from '../../../models/catalogos/catalogos';
@Component({
  selector: 'app-tipo-contrato',
  templateUrl: './tipo-contrato.component.html',
  styleUrls: ['./tipo-contrato.component.scss']
})
export class TipoContratoComponent implements OnInit, OnChanges {

  @Input() SelectedTpContrato: any;
  @Input() Log: any;
  @Output() UpTpContrato = new EventEmitter<number>(); // Id de País para actualizar tabla.
  formTpContrato: FormGroup;

  displayedColumns: string[] = ['id', 'usuario', 'fechaAct', 'tpMov'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private services: CatalogosService ) {
    this.formTpContrato = new FormGroup({
      id: new FormControl(),
      tipoContrato: new FormControl({value: '', disabled: true}, [Validators.required]),
      periodoPrueba: new FormControl({value: '', disabled: true}, [Validators.required]),
      activo: new FormControl({value: '', disabled: true})
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.SelectedTpContrato !== undefined) {
      this.Habilita(false);
      this.formTpContrato.get('id').setValue(this.SelectedTpContrato.id);
      this.formTpContrato.get('tipoContrato').setValue(this.SelectedTpContrato.tipoContrato);
      this.formTpContrato.get('periodoPrueba').setValue(this.SelectedTpContrato.periodoPrueba);
      this.formTpContrato.get('activo').setValue(this.SelectedTpContrato.activo);
    }
    if (this.Log !== undefined) {
      this.dataSource = new MatTableDataSource(this.Log);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  New() {
    this.formTpContrato.reset();
    this.Habilita(false);
    this.SelectedTpContrato = '';
  }

  Save() {
    const catalogo: catalogos = new catalogos();
    this.SelectedTpContrato !== '' ? catalogo.opt = 2 : catalogo.opt = 1;
    catalogo.usuario = sessionStorage.getItem('usuario');
    catalogo.Catalogos = {
      Id: 28,
      Nombre: 'Tipo contrato',
      Descripcion: 'Catalogo de tipos de contrato',
      Activo: true
    };
    catalogo.TipoContrato = [this.formTpContrato.getRawValue()];
    console.log(catalogo);
    this.services.GuardaCatalogo(catalogo)
    .subscribe( result => { // Agregar
      result ? this.UpTpContrato.emit(catalogo.Catalogos.Id) : console.log(result);
      this.Habilita(true);
    });
  }

  Limpiar() {
    this.formTpContrato.reset();
  }

  Habilita(opt: boolean) {
    if (!opt) {
      this.formTpContrato.get('tipoContrato').enable();
      this.formTpContrato.get('periodoPrueba').enable();
      this.formTpContrato.get('activo').enable();
    } else {
      this.formTpContrato.get('tipoContrato').disable();
      this.formTpContrato.get('periodoPrueba').disable();
      this.formTpContrato.get('activo').disable();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
