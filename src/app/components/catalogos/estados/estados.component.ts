import { Component, OnInit, Input, SimpleChanges, OnChanges, EventEmitter, Output } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
// Servicios
import { CatalogosService } from '../../../service/catalogos/catalogos.service';
// Modelos
import { catalogos } from '../../../models/catalogos/catalogos';

@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styleUrls: ['./estados.component.scss']
})
export class EstadosComponent implements OnInit, OnChanges {

  @Input() SelectedEstado: any;
  @Input() Paises: any[];
  @Output() UpEstados = new EventEmitter<number>(); // Id de Estado para actualizar tabla.
  formEstados: FormGroup;
  CPaises: any[];

  constructor( private services: CatalogosService ) {
    this.formEstados = new FormGroup({
      id: new FormControl(),
      pais: new FormControl({value: '', disabled: true}, [Validators.required]),
      estado: new FormControl({value: '', disabled: true}, [Validators.required]),
      clave: new FormControl({value: '', disabled: true}, [Validators.required]),
      activo: new FormControl({value: '', disabled: true})
    });
   }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['SelectedEstado'].firstChange) {
      this.Habilita(false);
      this.CPaises = this.Paises;
      const idpais = this.CPaises.find( p => p.pais === this.SelectedEstado.pais ).id;
      this.formEstados.get('pais').setValue(idpais);
      this.formEstados.get('id').setValue(this.SelectedEstado.id);
      this.formEstados.get('estado').setValue(this.SelectedEstado.estado);
      this.formEstados.get('clave').setValue(this.SelectedEstado.clave);
      this.formEstados.get('activo').setValue(this.SelectedEstado.activo);
    }
  }

  New() {
    this.formEstados.reset();
    this.CPaises = this.Paises;
    this.SelectedEstado = '';
    this.Habilita(false);
  }

  Save() {
    const catalogo: catalogos = new catalogos();
    this.SelectedEstado !== '' ? catalogo.opt = 2 : catalogo.opt = 1;
    catalogo.Catalogos = {
      Id: 2,
      Nombre: 'Estados',
      Descripcion: 'Catalogo de estados',
      Activo: true
    };
    catalogo.Estado =[this.formEstados.getRawValue()];
    const Municipios: Array<any> = [];
    catalogo.Municipio = Municipios;
    const Pais: Array<any> = [];
    catalogo.Pais = Pais;
    console.log(catalogo);
    this.services.GuardaCatalogo(catalogo)
    .subscribe( result => { // Agregar
      result ? this.UpEstados.emit(catalogo.Catalogos.Id) : console.log(result);
      this.Habilita(true);
    });
  }

  Limpiar() {
    this.formEstados.reset();
  }

  Habilita(opt: boolean) {
    if (!opt) {
      this.formEstados.get('pais').enable();
      this.formEstados.get('estado').enable();
      this.formEstados.get('clave').enable();
      this.formEstados.get('activo').enable();
    } else {
      this.formEstados.get('pais').disable();
      this.formEstados.get('estado').disable();
      this.formEstados.get('clave').disable();
      this.formEstados.get('activo').disable();
    }
  }

}
