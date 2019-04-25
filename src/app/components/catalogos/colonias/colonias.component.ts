import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// Servicios
import { CatalogosService } from '../../../service/catalogos/catalogos.service';
// Modelos
import { catalogos } from '../../../models/catalogos/catalogos';

@Component({
  selector: 'app-colonias',
  templateUrl: './colonias.component.html',
  styleUrls: ['./colonias.component.scss']
})
export class ColoniasComponent implements OnInit, OnChanges {

  @Input() SelectedColonia: any;
  @Input() Paises: any[];
  @Input() Estados: any[];
  @Input() Municipios: any[];
  @Output() UpColonia = new EventEmitter<number>(); // Id de colonia para actualizar tabla.
  formColonia: FormGroup;
  CPaises: any[];
  CEstados: any[];
  CMunicipios: any[];

  constructor( private services: CatalogosService ) {
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
      debugger;
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
      result ? this.UpColonia.emit(catalogo.Catalogos.Id) : console.log(result);
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
}
