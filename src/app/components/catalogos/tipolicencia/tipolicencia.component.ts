import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
// Servicios
import { CatalogosService } from '../../../service/catalogos/catalogos.service';
// Modelos
import { catalogos } from '../../../models/catalogos/catalogos';

@Component({
  selector: 'app-tipolicencia',
  templateUrl: './tipolicencia.component.html',
  styleUrls: ['./tipolicencia.component.scss']
})
export class TipolicenciaComponent implements OnInit, OnChanges {

  @Input() SelectedTpLicencia: any;
  @Input() Log: any;
  @Output() UpTpLicencia = new EventEmitter<number>(); // Id de País para actualizar tabla.
  formTpLicencia: FormGroup;

  displayedColumns: string[] = ['id', 'usuario', 'fechaAct', 'tpMov'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private services: CatalogosService ) {  
    this.formTpLicencia = new FormGroup({
      id: new FormControl(),
      tipolicencia: new FormControl({value: '', disabled: true}, [Validators.required]),
      descripcion: new FormControl({value: '', disabled: true}, [Validators.required]),
      activo: new FormControl({value: '', disabled: true})
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.SelectedTpLicencia !== undefined) {
      this.Habilita(false);
      this.formTpLicencia.get('id').setValue(this.SelectedTpLicencia.id);
      this.formTpLicencia.get('tipolicencia').setValue(this.SelectedTpLicencia.tipoLicencia);
      this.formTpLicencia.get('descripcion').setValue(this.SelectedTpLicencia.descripcion);
      this.formTpLicencia.get('activo').setValue(this.SelectedTpLicencia.activo);
    }
    if (this.Log !== undefined) {
      this.dataSource = new MatTableDataSource(this.Log);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  New() {
    this.formTpLicencia.reset();
    this.Habilita(false);
    this.SelectedTpLicencia = '';
  }

  Save() {
    const catalogo: catalogos = new catalogos();
    this.SelectedTpLicencia !== '' ? catalogo.opt = 2 : catalogo.opt = 1;
    catalogo.usuario = sessionStorage.getItem('usuario');
    catalogo.Catalogos = {
      Id: 39,
      Nombre: 'Tipo Licencia',
      Descripcion: 'Catalogo de licencias',
      Activo: true
    };
    catalogo.TipoLicencia = [this.formTpLicencia.getRawValue()];
    console.log(catalogo);
    this.services.GuardaCatalogo(catalogo)
    .subscribe( result => { // Agregar
      result ? this.UpTpLicencia.emit(catalogo.Catalogos.Id) : console.log(result);
      this.Habilita(true);
    });
  }

  Limpiar() {
    this.formTpLicencia.reset();
  }

  Habilita(opt: boolean) {
    if (!opt) {
      this.formTpLicencia.get('tipolicencia').enable();
      this.formTpLicencia.get('descripcion').enable();
      this.formTpLicencia.get('activo').enable();
    } else {
      this.formTpLicencia.get('tipolicencia').disable();
      this.formTpLicencia.get('descripcion').disable();
      this.formTpLicencia.get('activo').disable();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
