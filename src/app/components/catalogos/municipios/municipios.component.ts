import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// Servicios
import { CatalogosService } from '../../../service/catalogos/catalogos.service';
// Modelos
import { catalogos } from '../../../models/catalogos/catalogos';

@Component({
  selector: 'app-municipios',
  templateUrl: './municipios.component.html',
  styleUrls: ['./municipios.component.scss']
})
export class MunicipiosComponent implements OnInit, OnChanges {

  @Input() SelectedMunicipio: any;
  @Input() Log: any;
  @Input() Estados: any[];
  @Output() UpMunicipios = new EventEmitter<number>(); // Id de Estado para actualizar tabla.
  formMunicipio: FormGroup;
  CEstados: any[];

  displayedColumns: string[] = ['id', 'usuario', 'fechaAct', 'tpMov'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private services: CatalogosService ) {
    this.formMunicipio = new FormGroup({
      id: new FormControl(),
      municipio: new FormControl({value: '', disabled: true}, [Validators.required]),
      estado: new FormControl({value: '', disabled: true}, [Validators.required]),
      clave: new FormControl({value: '', disabled: true}, [Validators.required]),
      activo: new FormControl({value: '', disabled: true})
    });
   }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.SelectedMunicipio !== undefined) {
      this.Habilita(false);
      this.CEstados = this.Estados;
      const idestado = this.CEstados.find( p => p.estado === this.SelectedMunicipio.estado ).id;
      this.formMunicipio.get('id').setValue(this.SelectedMunicipio.id);
      this.formMunicipio.get('municipio').setValue(this.SelectedMunicipio.municipio);
      this.formMunicipio.get('estado').setValue(idestado);
      this.formMunicipio.get('activo').setValue(this.SelectedMunicipio.activo);
      this.formMunicipio.get('clave').setValue(this.SelectedMunicipio.clave);
    }
    if (this.Log !== undefined) {
      this.dataSource = new MatTableDataSource(this.Log);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  New() {
    this.formMunicipio.reset();
    this.SelectedMunicipio = '';
    this.Habilita(false);
  }

  Save() {
    let catalogo: catalogos = new catalogos();
    this.SelectedMunicipio !== '' ? catalogo.opt = 2 : catalogo.opt = 1;
    catalogo.usuario = sessionStorage.getItem('usuario');
    catalogo.Catalogos = {
      Id: 3,
      Nombre: 'Municipios',
      Descripcion: 'Catalogo de Municipios',
      Activo: true
    };
    catalogo.Municipio =[this.formMunicipio.getRawValue()];
    let Estados: Array<any> = [];
    catalogo.Estado = Estados;
    let Pais: Array<any> = [];
    catalogo.Pais = Pais;
    console.log(catalogo);
    this.services.GuardaCatalogo(catalogo)
    .subscribe( result => { // Agregar
      result ? this.UpMunicipios.emit(catalogo.Catalogos.Id) : console.log(result);
      this.Habilita(true);
    });
  }

  Limpiar() {
    this.formMunicipio.reset();
  }

  Habilita(opt: boolean) {
    if (!opt) {
      this.formMunicipio.get('id').enable();
      this.formMunicipio.get('municipio').enable();
      this.formMunicipio.get('estado').enable();
      this.formMunicipio.get('activo').enable();
      this.formMunicipio.get('clave').enable();
    } else {
      this.formMunicipio.get('id').disable();
      this.formMunicipio.get('municipio').disable();
      this.formMunicipio.get('estado').disable();
      this.formMunicipio.get('activo').disable();
      this.formMunicipio.get('clave').disable();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
