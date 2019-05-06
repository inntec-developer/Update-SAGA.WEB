import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
// Servicios
import { CatalogosService } from '../../../service/catalogos/catalogos.service';
// Modelos
import { catalogos } from '../../../models/catalogos/catalogos';

@Component({
  selector: 'app-actividad-empresa',
  templateUrl: './actividad-empresa.component.html',
  styleUrls: ['./actividad-empresa.component.scss']
})
export class ActividadEmpresaComponent implements OnInit, OnChanges {

  @Input() SelectedActividad: any;
  @Input() Log: any;
  @Input() Giros: any;
  @Output() UpActividad = new EventEmitter<number>(); // Id de País para actualizar tabla.
  formActividades: FormGroup;

  displayedColumns: string[] = ['id', 'usuario', 'fechaAct', 'tpMov'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private services: CatalogosService ) {
    this.formActividades = new FormGroup({
      id: new FormControl(),
      giroempresa: new FormControl({value: '', disabled: true}, [Validators.required]),
      actividadempresa: new FormControl({value: '', disabled: true}, [Validators.required]),
      activo: new FormControl({value: '', disabled: true})
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.SelectedActividad !== undefined) {
      this.Habilita(false);
      const idgiro = this.Giros.find( p => p.giroEmpresa === this.SelectedActividad.giroEmpresa ).id;
      this.formActividades.get('id').setValue(this.SelectedActividad.id);
      this.formActividades.get('giroempresa').setValue(idgiro);
      this.formActividades.get('actividadempresa').setValue(this.SelectedActividad.actividadEmpresa);
      this.formActividades.get('activo').setValue(this.SelectedActividad.activo);
    }
    if (this.Log !== undefined) {
      this.dataSource = new MatTableDataSource(this.Log);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  New() {
    this.formActividades.reset();
    this.Habilita(false);
    this.SelectedActividad = '';
  }

  Save() {
    const catalogo: catalogos = new catalogos();
    this.SelectedActividad !== '' ? catalogo.opt = 2 : catalogo.opt = 1;
    catalogo.usuario = sessionStorage.getItem('usuario');
    catalogo.Catalogos = {
      Id: 9,
      Nombre: 'Actividades empresa',
      Descripcion: 'Catalogo de actividades empresa',
      Activo: true
    };
    catalogo.ActividadEmpresa = [this.formActividades.getRawValue()];
    console.log(catalogo);
    this.services.GuardaCatalogo(catalogo)
    .subscribe( result => { // Agregar
      result ? this.UpActividad.emit(catalogo.Catalogos.Id) : console.log(result);
      this.Habilita(true);
    });
  }

  Limpiar() {
    this.formActividades.reset();
  }

  Habilita(opt: boolean) {
    if (!opt) {
      this.formActividades.get('giroempresa').enable();
      this.formActividades.get('actividadempresa').enable();
      this.formActividades.get('activo').enable();
    } else {
      this.formActividades.get('giroempresa').disable();
      this.formActividades.get('actividadempresa').disable();
      this.formActividades.get('activo').disable();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
