import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
// Servicios
import { CatalogosService } from '../../../service/catalogos/catalogos.service';
// Modelos
import { catalogos } from '../../../models/catalogos/catalogos';

@Component({
  selector: 'app-tipo-beneficio',
  templateUrl: './tipo-beneficio.component.html',
  styleUrls: ['./tipo-beneficio.component.scss']
})
export class TipoBeneficioComponent implements OnInit, OnChanges {

  @Input() SelectedBeneficio: any;
  @Input() Log: any;
  @Output() UpBeneficio = new EventEmitter<number>(); // Id de País para actualizar tabla.
  formBeneficios: FormGroup;

  displayedColumns: string[] = ['id', 'usuario', 'fechaAct', 'tpMov'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private services: CatalogosService ) {
    this.formBeneficios = new FormGroup({
      id: new FormControl(),
      tipoBeneficio: new FormControl({value: '', disabled: true}, [Validators.required]),
      activo: new FormControl({value: '', disabled: true})
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.SelectedBeneficio !== undefined) {
      this.Habilita(false);
      this.formBeneficios.get('id').setValue(this.SelectedBeneficio.id);
      this.formBeneficios.get('tipoBeneficio').setValue(this.SelectedBeneficio.tipoBeneficio);
      this.formBeneficios.get('activo').setValue(this.SelectedBeneficio.activo);
    }
    if (this.Log !== undefined) {
      this.dataSource = new MatTableDataSource(this.Log);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  New() {
    this.formBeneficios.reset();
    this.Habilita(false);
    this.SelectedBeneficio = '';
  }

  Save() {
    const catalogo: catalogos = new catalogos();
    this.SelectedBeneficio !== '' ? catalogo.opt = 2 : catalogo.opt = 1;
    catalogo.usuario = sessionStorage.getItem('usuario');
    catalogo.Catalogos = {
      Id: 27,
      Nombre: 'Beneficios',
      Descripcion: 'Catalogo de tipos de beneficios',
      Activo: true
    };
    catalogo.BeneficioPerfil = [this.formBeneficios.getRawValue()];
    console.log(catalogo);
    this.services.GuardaCatalogo(catalogo)
    .subscribe( result => { // Agregar
      result ? this.UpBeneficio.emit(catalogo.Catalogos.Id) : console.log(result);
      this.Habilita(true);
    });
  }

  Limpiar() {
    this.formBeneficios.reset();
  }

  Habilita(opt: boolean) {
    if (!opt) {
      this.formBeneficios.get('tipoBeneficio').enable();
      this.formBeneficios.get('activo').enable();
    } else {
      this.formBeneficios.get('tipoBeneficio').disable();
      this.formBeneficios.get('activo').disable();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
