import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { CatalogosService } from '../../../service/catalogos/catalogos.service';
import { SettingsService } from '../../../core/settings/settings.service';
import { catalogos } from '../../../models/catalogos/catalogos';

// Servicios

// Modelos



@Component({
  selector: 'app-colonias',
  templateUrl: './colonias.component.html',
  styleUrls: ['./colonias.component.scss']
})
export class ColoniasComponent implements OnInit, OnChanges {

  @Input() SelectedColonia: any;
  @Input() Log: any;
  @Input() Paises: any[];
  @Input() Estados: any[];
  @Input() Municipios: any[];
  @Output() UpColonia = new EventEmitter<number>(); // Id de colonia para actualizar tabla.
  formColonia: FormGroup;
  CPaises: any[];
  CEstados: any[];
  CMunicipios: any[];

  displayedColumns: string[] = ['id', 'usuario', 'fechaAct', 'tpMov'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private services: CatalogosService, private settings: SettingsService ) {
    this.formColonia = new FormGroup({
      id: new FormControl(),
      colonia: new FormControl({value: '', disabled: true}, [Validators.required]),
      TipoColonia: new FormControl({value: '', disabled: true}, [Validators.required]),
      municipio: new FormControl({value: '', disabled: true}, [Validators.required]),
      estado: new FormControl({value: '', disabled: true}, [Validators.required]),
      cp: new FormControl({value: '', disabled: true}, [Validators.required]),
      pais: new FormControl({value: '', disabled: true}, [Validators.required]),
      activo: new FormControl({value: '', disabled: true})
    });
   }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.SelectedColonia !== undefined) {
      this.Habilita(false);
      this.CEstados = this.Estados;
      const idestado = this.CEstados.find( p => p.estado === this.SelectedColonia.estado ).id;
      this.CPaises = this.Paises;
      const idpais = this.CPaises.find( p => p.pais === this.SelectedColonia.pais ).id;
      this.CMunicipios = this.Municipios;
      const idmunicipio = this.CMunicipios.find( p => p.municipio === this.SelectedColonia.municipio ).id;
      this.formColonia.get('id').setValue(this.SelectedColonia.id);
      this.formColonia.get('municipio').setValue(idmunicipio);
      this.formColonia.get('estado').setValue(idestado);
      this.formColonia.get('pais').setValue(idpais);
      this.formColonia.get('colonia').setValue(this.SelectedColonia.colonia);
      this.formColonia.get('cp').setValue(this.SelectedColonia.cp);
      this.formColonia.get('TipoColonia').setValue(this.SelectedColonia.tipoColonia);
      this.formColonia.get('activo').setValue(this.SelectedColonia.activo);
    }
    if (this.Log !== undefined) {
      this.dataSource = new MatTableDataSource(this.Log);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  New() {
    this.Habilita(false);
    this.formColonia.reset();
    this.SelectedColonia = '';
    this.CPaises = this.Paises;
    this.CEstados = this.Estados;
    this.CMunicipios = this.Municipios;
  }

  Save() {
    const catalogo: catalogos = new catalogos();
    this.SelectedColonia !== '' ? catalogo.opt = 2 : catalogo.opt = 1;
    catalogo.usuario = this.settings.user['usuario'];
    catalogo.Catalogos = {
      Id: 4,
      Nombre: 'Colonias',
      Descripcion: 'Catalogo de colonias',
      Activo: true
    };
    catalogo.Colonia = [this.formColonia.getRawValue()];
    const municipio: Array<any> = [];
    catalogo.Municipio = municipio;
    const estados: Array<any> = [];
    catalogo.Estado = estados;
    const Pais: Array<any> = [];
    catalogo.Pais = Pais;
    this.services.GuardaCatalogo(catalogo)
    .subscribe( result => { // Agregar
      result ? this.UpColonia.emit(catalogo.Catalogos.Id) :  null;
      this.Habilita(true);
    });
  }

  Limpiar() {
    this.formColonia.reset();
  }

  ChPais(Pais: string) {
    this.CEstados = this.Estados.filter( e => e.pais === Pais);
    this.CMunicipios = [];
  }

  ChEstado(Estado: number) {
    this.CMunicipios = this.Municipios.filter( e => e.estado === Estado);
  }

  Habilita(opt: boolean) {
    if (!opt) {
      this.formColonia.get('pais').enable();
      this.formColonia.get('colonia').enable();
      this.formColonia.get('TipoColonia').enable();
      this.formColonia.get('municipio').enable();
      this.formColonia.get('estado').enable();
      this.formColonia.get('cp').enable();
      this.formColonia.get('activo').enable();
    } else {
      this.formColonia.get('pais').disable();
      this.formColonia.get('colonia').disable();
      this.formColonia.get('TipoColonia').disable();
      this.formColonia.get('municipio').disable();
      this.formColonia.get('estado').disable();
      this.formColonia.get('cp').disable();
      this.formColonia.get('activo').disable();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
