import { Component, OnInit, Input, SimpleChanges, OnChanges, EventEmitter, Output, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
// Servicios
import { CatalogosService } from '../../../service/catalogos/catalogos.service';
// Modelos
import { catalogos } from '../../../models/catalogos/catalogos';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.scss']
})
export class DepartamentosComponent implements OnInit, OnChanges {

  @Input() SelectedDepartamento: any;
  @Input() Log: any;
  @Input() Areas: any[];
  @Output() UpDepartamentos = new EventEmitter<number>(); // Id de Departamentos para actualizar tabla.
  formDepartamentos: FormGroup;
  CAreas: any[];

  displayedColumns: string[] = ['id', 'usuario', 'fechaAct', 'tpMov'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private services: CatalogosService ) {
    this.formDepartamentos = new FormGroup({
      id: new FormControl(),
      nombre: new FormControl({value: '', disabled: true}, [Validators.required]),
      area: new FormControl({value: '', disabled: true}, [Validators.required]),
      clave: new FormControl({value: '', disabled: true}, [Validators.required]),
      orden: new FormControl({value: '', disabled: true}, [Validators.required])
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.SelectedDepartamento !== undefined) {
      this.Habilita(false);
      this.CAreas = this.Areas;
      const idArea = this.CAreas.find( p => p.pais === this.SelectedDepartamento.pais ).id;
      this.formDepartamentos.get('area').setValue(idArea);
      this.formDepartamentos.get('id').setValue(this.SelectedDepartamento.id);
      this.formDepartamentos.get('nombre').setValue(this.SelectedDepartamento.nombre);
      this.formDepartamentos.get('clave').setValue(this.SelectedDepartamento.clave);
      this.formDepartamentos.get('orden').setValue(this.SelectedDepartamento.orden);
    }
    if (this.Log !== undefined) {
      this.dataSource = new MatTableDataSource(this.Log);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  New() {
    this.formDepartamentos.reset();
    this.CAreas = this.Areas;
    this.SelectedDepartamento = '';
    this.Habilita(false);
  }

  Save() {
    const catalogo: catalogos = new catalogos();
    this.SelectedDepartamento !== '' ? catalogo.opt = 2 : catalogo.opt = 1;
    catalogo.usuario = sessionStorage.getItem('usuario');
    catalogo.Catalogos = {
      Id: 42,
      Nombre: 'Departamentos',
      Descripcion: 'Catalogo de departamentos',
      Activo: true
    };
    catalogo.Departamentos =[this.formDepartamentos.getRawValue()];
    // const Municipios: Array<any> = [];
    // catalogo.Municipio = Municipios;
    // const Pais: Array<any> = [];
    // catalogo.Pais = Pais;
    console.log(catalogo);
    this.services.GuardaCatalogo(catalogo)
    .subscribe( result => { // Agregar
      result ? this.UpDepartamentos.emit(catalogo.Catalogos.Id) : console.log(result);
      this.Habilita(true);
    });
  }

  Limpiar() {
    this.formDepartamentos.reset();
  }

  Habilita(opt: boolean) {
    if (!opt) {
      this.formDepartamentos.get('area').enable();
      this.formDepartamentos.get('nombre').enable();
      this.formDepartamentos.get('clave').enable();
      this.formDepartamentos.get('orden').enable();
    } else {
      this.formDepartamentos.get('area').disable();
      this.formDepartamentos.get('nombre').disable();
      this.formDepartamentos.get('clave').disable();
      this.formDepartamentos.get('orden').disable();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
