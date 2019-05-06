import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
// Servicios
import { CatalogosService } from '../../../service/catalogos/catalogos.service';
// Modelos
import { catalogos } from '../../../models/catalogos/catalogos';

@Component({
  selector: 'app-area-interes',
  templateUrl: './area-interes.component.html',
  styleUrls: ['./area-interes.component.scss']
})
export class AreaInteresComponent implements OnInit, OnChanges {

  @Input() SelectedAreaInteres: any;
  @Input() Log: any;
  @Input() areaExp: any[];
  @Output() UpAreaInteres = new EventEmitter<number>(); // Id de País para actualizar tabla.
  formAreaInt: FormGroup;

  displayedColumns: string[] = ['id', 'usuario', 'fechaAct', 'tpMov'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private services: CatalogosService ) {
    this.formAreaInt = new FormGroup({
      id: new FormControl(),
      areainteres: new FormControl({value: '', disabled: true}, [Validators.required]),
      areaexperiencia: new FormControl({value: '', disabled: true}, [Validators.required]),
      activo: new FormControl({value: '', disabled: true})
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.SelectedAreaInteres !== undefined) {
      this.Habilita(false);
      debugger;
      const idaexp = this.areaExp.find( p => p.areaExperiencia === this.SelectedAreaInteres.areaExperiencia ).id;
      this.formAreaInt.get('id').setValue(this.SelectedAreaInteres.id);
      this.formAreaInt.get('areainteres').setValue(this.SelectedAreaInteres.areaInteres);
      this.formAreaInt.get('areaexperiencia').setValue(idaexp);
      this.formAreaInt.get('activo').setValue(this.SelectedAreaInteres.activo);
    }
    if (this.Log !== undefined) {
      this.dataSource = new MatTableDataSource(this.Log);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  New() {
    this.formAreaInt.reset();
    this.Habilita(false);
    this.SelectedAreaInteres = '';
  }

  Save() {
    const catalogo: catalogos = new catalogos();
    this.SelectedAreaInteres !== '' ? catalogo.opt = 2 : catalogo.opt = 1;
    catalogo.usuario = sessionStorage.getItem('usuario');
    catalogo.Catalogos = {
      Id: 19,
      Nombre: 'Area interes',
      Descripcion: 'Catalogo de area interes',
      Activo: true
    };
    catalogo.AreaInteres = [this.formAreaInt.getRawValue()];
    console.log(catalogo);
    this.services.GuardaCatalogo(catalogo)
    .subscribe( result => { // Agregar
      result ? this.UpAreaInteres.emit(catalogo.Catalogos.Id) : console.log(result);
      this.Habilita(true);
    });
  }

  Limpiar() {
    this.formAreaInt.reset();
  }

  Habilita(opt: boolean) {
    if (!opt) {
      this.formAreaInt.get('areainteres').enable();
      this.formAreaInt.get('areaexperiencia').enable();
      this.formAreaInt.get('activo').enable();
    } else {
      this.formAreaInt.get('areainteres').disable();
      this.formAreaInt.get('areaexperiencia').disable();
      this.formAreaInt.get('activo').disable();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
