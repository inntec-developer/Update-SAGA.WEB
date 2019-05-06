import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
// Servicios
import { CatalogosService } from '../../../service/catalogos/catalogos.service';
// Modelos
import { catalogos } from '../../../models/catalogos/catalogos';

@Component({
  selector: 'app-tp-nomina',
  templateUrl: './tp-nomina.component.html',
  styleUrls: ['./tp-nomina.component.scss']
})
export class TpNominaComponent implements OnInit, OnChanges {

  @Input() SelectedNomina: any;
  @Input() Log: any;
  @Output() UpNomina = new EventEmitter<number>(); // Id de País para actualizar tabla.
  formNomina: FormGroup;

  displayedColumns: string[] = ['id', 'usuario', 'fechaAct', 'tpMov'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private services: CatalogosService ) {
    this.formNomina = new FormGroup({
      id: new FormControl(),
      tipoDeNomina: new FormControl({value: '', disabled: true}, [Validators.required]),
      activo: new FormControl({value: '', disabled: true})
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.SelectedNomina !== undefined) {
      this.Habilita(false);
      this.formNomina.get('id').setValue(this.SelectedNomina.id);
      this.formNomina.get('tipoDeNomina').setValue(this.SelectedNomina.tipoDeNomina);
      this.formNomina.get('activo').setValue(this.SelectedNomina.activo);
    }
    if (this.Log !== undefined) {
      this.dataSource = new MatTableDataSource(this.Log);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  New() {
    this.formNomina.reset();
    this.Habilita(false);
    this.SelectedNomina = '';
  }

  Save() {
    const catalogo: catalogos = new catalogos();
    this.SelectedNomina !== '' ? catalogo.opt = 2 : catalogo.opt = 1;
    catalogo.usuario = sessionStorage.getItem('usuario');
    catalogo.Catalogos = {
      Id: 24,
      Nombre: 'Tipo de Nomina',
      Descripcion: 'Catalogo de Tipo de nomina',
      Activo: true
    };
    catalogo.TipoNomina = [this.formNomina.getRawValue()];
    console.log(catalogo);
    this.services.GuardaCatalogo(catalogo)
    .subscribe( result => { // Agregar
      result ? this.UpNomina.emit(catalogo.Catalogos.Id) : console.log(result);
      this.Habilita(true);
    });
  }

  Limpiar() {
    this.formNomina.reset();
  }

  Habilita(opt: boolean) {
    if (!opt) {
      this.formNomina.get('tipoDeNomina').enable();
      this.formNomina.get('activo').enable();
    } else {
      this.formNomina.get('tipoDeNomina').disable();
      this.formNomina.get('activo').disable();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
