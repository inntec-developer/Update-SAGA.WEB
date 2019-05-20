import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { CatalogosService } from '../../../service/catalogos/catalogos.service';
import { SettingsService } from '../../../core/settings/settings.service';
import { catalogos } from '../../../models/catalogos/catalogos';

// Servicios

// Modelos


@Component({
  selector: 'app-area-exp',
  templateUrl: './area-exp.component.html',
  styleUrls: ['./area-exp.component.scss']
})
export class AreaExpComponent implements OnInit, OnChanges {

  @Input() SelectedAreaExp: any;
  @Input() Log: any;
  @Output() UpAreaExp = new EventEmitter<number>(); // Id de País para actualizar tabla.
  formareaexp: FormGroup;

  displayedColumns: string[] = ['id', 'usuario', 'fechaAct', 'tpMov'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private services: CatalogosService, private settings: SettingsService ) {
    this.formareaexp = new FormGroup({
      id: new FormControl(),
      areaexperiencia: new FormControl({value: '', disabled: true}, [Validators.required]),
      activo: new FormControl({value: '', disabled: true}),
      icono: new FormControl({value: '', disabled: true})
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.SelectedAreaExp !== undefined) {
      this.Habilita(false);
      this.formareaexp.get('id').setValue(this.SelectedAreaExp.id);
      this.formareaexp.get('areaexperiencia').setValue(this.SelectedAreaExp.areaExperiencia);
      this.formareaexp.get('activo').setValue(this.SelectedAreaExp.activo);
      this.formareaexp.get('icono').setValue(this.SelectedAreaExp.icono);
    }
    if (this.Log !== undefined) {
      this.dataSource = new MatTableDataSource(this.Log);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  New() {
    this.formareaexp.reset();
    this.Habilita(false);
    this.SelectedAreaExp = '';
  }

  Save() {
    const catalogo: catalogos = new catalogos();
    this.SelectedAreaExp !== '' ? catalogo.opt = 2 : catalogo.opt = 1;
    catalogo.usuario = this.settings.user['usuario'];
    catalogo.Catalogos = {
      Id: 18,
      Nombre: 'Area Exp',
      Descripcion: 'Catalogo de ara exp',
      Activo: true
    };
    catalogo.AreaExperiencia = [this.formareaexp.getRawValue()];
    console.log(catalogo);
    this.services.GuardaCatalogo(catalogo)
    .subscribe( result => { // Agregar
      result ? this.UpAreaExp.emit(catalogo.Catalogos.Id) : console.log(result);
      this.Habilita(true);
    });
  }

  Limpiar() {
    this.formareaexp.reset();
  }

  Habilita(opt: boolean) {
    if (!opt) {
      this.formareaexp.get('areaexperiencia').enable();
      this.formareaexp.get('activo').enable();
      this.formareaexp.get('icono').enable();
    } else {
      this.formareaexp.get('areaexperiencia').disable();
      this.formareaexp.get('icono').disable();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
