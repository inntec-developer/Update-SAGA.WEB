import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
// Servicios
import { CatalogosService } from '../../../service/catalogos/catalogos.service';
// Modelos
import { catalogos } from '../../../models/catalogos/catalogos';

@Component({
  selector: 'app-dia-semana',
  templateUrl: './dia-semana.component.html',
  styleUrls: ['./dia-semana.component.scss']
})
export class DiaSemanaComponent implements OnInit, OnChanges {

  @Input() SelectedDia: any;
  @Input() Log: any;
  @Output() UpDias = new EventEmitter<number>(); // Id de País para actualizar tabla.
  formDias: FormGroup;

  displayedColumns: string[] = ['id', 'usuario', 'fechaAct', 'tpMov'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private services: CatalogosService ) {
    this.formDias = new FormGroup({
      id: new FormControl(),
      diaSemana: new FormControl({value: '', disabled: true}, [Validators.required]),
      activo: new FormControl({value: '', disabled: true})
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.SelectedDia !== undefined) {
      this.Habilita(false);
      this.formDias.get('id').setValue(this.SelectedDia.id);
      this.formDias.get('diaSemana').setValue(this.SelectedDia.diaSemana);
      this.formDias.get('activo').setValue(this.SelectedDia.activo);
    }
    if (this.Log !== undefined) {
      this.dataSource = new MatTableDataSource(this.Log);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  New() {
    this.formDias.reset();
    this.Habilita(false);
    this.SelectedDia = '';
  }

  Save() {
    const catalogo: catalogos = new catalogos();
    this.SelectedDia !== '' ? catalogo.opt = 2 : catalogo.opt = 1;
    catalogo.usuario = sessionStorage.getItem('usuario');
    catalogo.Catalogos = {
      Id: 23,
      Nombre: 'Dias de la semana',
      Descripcion: 'Catalogo de días de la semana',
      Activo: true
    };
    catalogo.DiasSemana = [this.formDias.getRawValue()];
    console.log(catalogo);
    this.services.GuardaCatalogo(catalogo)
    .subscribe( result => { // Agregar
      result ? this.UpDias.emit(catalogo.Catalogos.Id) : console.log(result);
      this.Habilita(true);
    });
  }

  Limpiar() {
    this.formDias.reset();
  }

  Habilita(opt: boolean) {
    if (!opt) {
      this.formDias.get('diaSemana').enable();
      this.formDias.get('activo').enable();
    } else {
      this.formDias.get('diaSemana').disable();
      this.formDias.get('activo').disable();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
