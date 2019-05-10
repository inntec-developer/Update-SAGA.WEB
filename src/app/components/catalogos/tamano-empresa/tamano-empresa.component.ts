import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
// Servicios
import { CatalogosService } from '../../../service/catalogos/catalogos.service';
// Modelos
import { catalogos } from '../../../models/catalogos/catalogos';


@Component({
  selector: 'app-tamano-empresa',
  templateUrl: './tamano-empresa.component.html',
  styleUrls: ['./tamano-empresa.component.scss']
})
export class TamanoEmpresaComponent implements OnInit, OnChanges {

  @Input() SelectedTamano: any;
  @Input() Log: any;
  @Output() UpTamano = new EventEmitter<number>(); // Id de País para actualizar tabla.
  formTamano: FormGroup;

  displayedColumns: string[] = ['id', 'usuario', 'fechaAct', 'tpMov'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private services: CatalogosService ) {
    this.formTamano = new FormGroup({
      id: new FormControl(),
      tamanoempresa: new FormControl({value: '', disabled: true}, [Validators.required]),
      activo: new FormControl({value: '', disabled: true})
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.SelectedTamano !== undefined) {
      this.Habilita(false);
      this.formTamano.get('id').setValue(this.SelectedTamano.id);
      this.formTamano.get('tamanoempresa').setValue(this.SelectedTamano.tamanoEmpresa);
      this.formTamano.get('activo').setValue(this.SelectedTamano.activo);
    }
    if (this.Log !== undefined) {
      this.dataSource = new MatTableDataSource(this.Log);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  New() {
    this.formTamano.reset();
    this.Habilita(false);
    this.SelectedTamano = '';
  }

  Save() {
    const catalogo: catalogos = new catalogos();
    this.SelectedTamano !== '' ? catalogo.opt = 2 : catalogo.opt = 1;
    catalogo.usuario = sessionStorage.getItem('usuario');
    catalogo.Catalogos = {
      Id: 10,
      Nombre: 'Tamaño empresa',
      Descripcion: 'Catalogo de tamano de empresas',
      Activo: true
    };
    catalogo.TamanoEmpresa = [this.formTamano.getRawValue()];
    console.log(catalogo);
    this.services.GuardaCatalogo(catalogo)
    .subscribe( result => { // Agregar
      result ? this.UpTamano.emit(catalogo.Catalogos.Id) : console.log(result);
      this.Habilita(true);
    });
  }

  Limpiar() {
    this.formTamano.reset();
  }

  Habilita(opt: boolean) {
    if (!opt) {
      this.formTamano.get('tamanoempresa').enable();
      this.formTamano.get('activo').enable();
    } else {
      this.formTamano.get('tamanoempresa').disable();
      this.formTamano.get('activo').disable();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}