import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
// Servicios
import { CatalogosService } from '../../../service/catalogos/catalogos.service';
// Modelos
import { catalogos } from '../../../models/catalogos/catalogos';

@Component({
  selector: 'app-discapacidades',
  templateUrl: './discapacidades.component.html',
  styleUrls: ['./discapacidades.component.scss']
})
export class DiscapacidadesComponent implements OnInit, OnChanges {

  @Input() SelectedDiscapacidad: any;
  @Input() Log: any;
  @Output() UpDiscapacidad = new EventEmitter<number>(); // Id de País para actualizar tabla.
  formDiscapacidades: FormGroup;

  displayedColumns: string[] = ['id', 'usuario', 'fechaAct', 'tpMov'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private services: CatalogosService ) {
    this.formDiscapacidades = new FormGroup({
      id: new FormControl(),
      tipodiscapacidad: new FormControl({value: '', disabled: true}, [Validators.required]),
      activo: new FormControl({value: '', disabled: true})
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.SelectedDiscapacidad !== undefined) {
      this.Habilita(false);
      this.formDiscapacidades.get('id').setValue(this.SelectedDiscapacidad.id);
      this.formDiscapacidades.get('tipodiscapacidad').setValue(this.SelectedDiscapacidad.tipoDiscapacidad);
      this.formDiscapacidades.get('activo').setValue(this.SelectedDiscapacidad.activo);
    }
    if (this.Log !== undefined) {
      this.dataSource = new MatTableDataSource(this.Log);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  New() {
    this.formDiscapacidades.reset();
    this.Habilita(false);
    this.SelectedDiscapacidad = '';
  }

  Save() {
    const catalogo: catalogos = new catalogos();
    this.SelectedDiscapacidad !== '' ? catalogo.opt = 2 : catalogo.opt = 1;
    catalogo.usuario = sessionStorage.getItem('usuario');
    catalogo.Catalogos = {
      Id: 38,
      Nombre: 'Discapacidades',
      Descripcion: 'Catalogo de discapacidades',
      Activo: true
    };
    catalogo.Discapacidad = [this.formDiscapacidades.getRawValue()];
    console.log(catalogo);
    this.services.GuardaCatalogo(catalogo)
    .subscribe( result => { // Agregar
      result ? this.UpDiscapacidad.emit(catalogo.Catalogos.Id) : console.log(result);
      this.Habilita(true);
    });
  }

  Limpiar() {
    this.formDiscapacidades.reset();
  }

  Habilita(opt: boolean) {
    if (!opt) {
      this.formDiscapacidades.get('tipodiscapacidad').enable();
      this.formDiscapacidades.get('activo').enable();
    } else {
      this.formDiscapacidades.get('tipodiscapacidad').disable();
      this.formDiscapacidades.get('activo').disable();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
