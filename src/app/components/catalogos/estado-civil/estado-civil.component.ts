import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, Validator } from '@angular/forms';
// Servicios
import { CatalogosService } from '../../../service/catalogos/catalogos.service';
// Modelos
import { catalogos } from '../../../models/catalogos/catalogos';

@Component({
  selector: 'app-estado-civil',
  templateUrl: './estado-civil.component.html',
  styleUrls: ['./estado-civil.component.scss']
})
export class EstadoCivilComponent implements OnInit, OnChanges {

  @Input() SelectedEstadoCivil: any;
  @Output() UpEstadoCivil = new EventEmitter<number>(); // Id de tipo de telefono para actualizar tabla.

  formEstadoCivil: FormGroup;

  constructor( private services: CatalogosService ) {
    this.formEstadoCivil = new FormGroup({
      id: new FormControl(),
      estadoCivil: new FormControl({value: '', disabled: true}, [Validators.required]),
      activo: new FormControl({value: '', disabled: true}, [Validators.required])
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    debugger;
    if (this.SelectedEstadoCivil !== undefined) {
      this.Habilita(false);
      this.formEstadoCivil.get('id').setValue(this.SelectedEstadoCivil.id);
      this.formEstadoCivil.get('estadoCivil').setValue(this.SelectedEstadoCivil.estadoCivil);
      this.formEstadoCivil.get('activo').setValue(this.SelectedEstadoCivil.activo);
    }
  }

  New() {
    this.Habilita(false);
    this.formEstadoCivil.reset();
    this.SelectedEstadoCivil = '';
  }

  Save() {
    const catalogo: catalogos = new catalogos();
    this.SelectedEstadoCivil !== '' ? catalogo.opt = 2 : catalogo.opt = 1;
    catalogo.Catalogos = {
      Id: 7,
      Nombre: 'Estado Civil',
      Descripcion: 'Catalogo de estados civiles',
      Activo: true
    };
    catalogo.EstadoCivil = [this.formEstadoCivil.getRawValue()];
    this.services.GuardaCatalogo(catalogo)
    .subscribe( result => { // Agregar
      result ? this.UpEstadoCivil.emit(catalogo.Catalogos.Id) : console.log(result);
      this.Habilita(true);
    });
  }

  Limpiar() {
    this.formEstadoCivil.reset();
  }

  Habilita(opt: boolean) {
    if (!opt) {
      this.formEstadoCivil.get('estadoCivil').enable();
      this.formEstadoCivil.get('activo').enable();
    } else {
      this.formEstadoCivil.get('estadoCivil').disable();
      this.formEstadoCivil.get('activo').disable();
    }
  }

}