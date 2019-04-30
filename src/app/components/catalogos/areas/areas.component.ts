import { Component, OnInit, Input, SimpleChanges, OnChanges, EventEmitter, Output, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
// Servicios
import { CatalogosService } from '../../../service/catalogos/catalogos.service';
// Modelos
import { catalogos } from '../../../models/catalogos/catalogos';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss']
})
export class AreasComponent implements OnInit, OnChanges {

  @Input() SelectedArea: any;
  @Input() Log: any;
  @Output() UpAreas = new EventEmitter<number>(); // Id de Areas para actualizar tabla.
  formAreas: FormGroup;

  displayedColumns: string[] = ['id', 'usuario', 'fechaAct', 'tpMov'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private services: CatalogosService ) {
    this.formAreas = new FormGroup({
      id: new FormControl(),
      nombre: new FormControl({value: '', disabled: true}, [Validators.required]),
      clave: new FormControl({value: '', disabled: true}, [Validators.required]),
      orden: new FormControl({value: '', disabled: true}, [Validators.required])
    });
   }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.SelectedArea !== undefined) {
      this.Habilita(false);
      this.formAreas.get('id').setValue(this.SelectedArea.id);
      this.formAreas.get('nombre').setValue(this.SelectedArea.nombre);
      this.formAreas.get('clave').setValue(this.SelectedArea.clave);
      this.formAreas.get('orden').setValue(this.SelectedArea.orden);
    }
    if (this.Log !== undefined) {
      this.dataSource = new MatTableDataSource(this.Log);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  New() {
    this.formAreas.reset();
    this.SelectedArea = '';
    this.Habilita(false);
  }

  Save() {
    const catalogo: catalogos = new catalogos();
    this.SelectedArea !== '' ? catalogo.opt = 2 : catalogo.opt = 1;
    catalogo.Catalogos = {
      Id: 43,
      Nombre: 'Areas',
      Descripcion: 'Catalogo de areas',
      Activo: true
    };
    catalogo.Areas = [this.formAreas.getRawValue()];
    // const Municipios: Array<any> = [];
    // catalogo.Municipio = Municipios;
    // const Pais: Array<any> = [];
    // catalogo.Pais = Pais;
    console.log(catalogo);
    this.services.GuardaCatalogo(catalogo)
    .subscribe( result => { // Agregar
      result ? this.UpAreas.emit(catalogo.Catalogos.Id) : console.log(result);
      this.Habilita(true);
    });
  }

  Limpiar() {
    this.formAreas.reset();
  }

  Habilita(opt: boolean) {
    if (!opt) {
      this.formAreas.get('nombre').enable();
      this.formAreas.get('clave').enable();
      this.formAreas.get('orden').enable();
    } else {
      this.formAreas.get('nombre').disable();
      this.formAreas.get('clave').disable();
      this.formAreas.get('orden').disable();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
