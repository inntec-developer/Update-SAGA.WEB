import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
// Servicios
import { CatalogosService } from '../../../service/catalogos/catalogos.service';
// Modelos
import { catalogos } from '../../../models/catalogos/catalogos';


@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styleUrls: ['./paises.component.scss']
})
export class PaisesComponent implements OnInit, OnChanges {

  @Input() SelectedPais: any;
  @Output() UpPaises = new EventEmitter<number>(); // Id de País para actualizar tabla.
  formPaises: FormGroup;

  constructor( private services: CatalogosService ) {
    this.formPaises = new FormGroup({
      id: new FormControl(),
      pais: new FormControl({value: '', disabled: true}, [Validators.required]),
      activo: new FormControl({value: '', disabled: true})
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['SelectedPais'].firstChange) {
      this.Habilita(false);
      this.formPaises.get('id').setValue(this.SelectedPais.id);
      this.formPaises.get('pais').setValue(this.SelectedPais.pais);
      this.formPaises.get('activo').setValue(this.SelectedPais.activo);
    }
  }

  New() {
    this.formPaises.reset();
    this.Habilita(false);
    this.SelectedPais = '';
  }

  Save() {
    let catalogo: catalogos = new catalogos();
    this.SelectedPais !== '' ? catalogo.opt = 2 : catalogo.opt = 1;
    catalogo.Catalogos = {
      Id: 1,
      Nombre: 'Paises',
      Descripcion: 'Catalogo de países',
      Activo: true
    };
    let Estados: Array<any> = [];
    catalogo.Estado = Estados;
    let Municipios: Array<any> = [];
    catalogo.Municipio = Municipios;
    catalogo.Pais = [this.formPaises.getRawValue()];
    console.log(catalogo);
    this.services.GuardaCatalogo(catalogo)
    .subscribe( result => { // Agregar
      result ? this.UpPaises.emit(catalogo.Catalogos.Id) : console.log(result);
      this.Habilita(true);
    });
  }

  Limpiar() {
    this.formPaises.reset();
  }

  Habilita(opt: boolean) {
    if (!opt) {
      this.formPaises.get('pais').enable();
      this.formPaises.get('activo').enable();
    } else {
      this.formPaises.get('pais').disable();
      this.formPaises.get('activo').disable();
    }
  }

}
