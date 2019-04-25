import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, Validator } from '@angular/forms';
// Servicios
import { CatalogosService } from '../../../service/catalogos/catalogos.service';
// Modelos
import { catalogos } from '../../../models/catalogos/catalogos';

@Component({
  selector: 'app-tipo-usuario',
  templateUrl: './tipo-usuario.component.html',
  styleUrls: ['./tipo-usuario.component.scss']
})
export class TipoUsuarioComponent implements OnInit, OnChanges {

  @Input() SelectedTipoUsuario: any;
  @Output() UpTpUsuario = new EventEmitter<number>(); // Id de tipo de telefono para actualizar tabla.

  formTipoUsuario: FormGroup;

  constructor(private services: CatalogosService ) {
    this.formTipoUsuario = new FormGroup({
      id: new FormControl(),
      tipo: new FormControl({value: '', disabled: true}, [Validators.required])
    });
  }
  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.SelectedTipoUsuario !== undefined) {
// tslint:disable-next-line: no-debugger
      debugger;
      this.Habilita(false);
      this.formTipoUsuario.get('id').setValue(this.SelectedTipoUsuario.id);
      this.formTipoUsuario.get('tipo').setValue(this.SelectedTipoUsuario.tipo);
    }
  }

  New() {
    this.Habilita(false);
    this.formTipoUsuario.reset();
    this.SelectedTipoUsuario = '';
  }

  Save() {
    const catalogo: catalogos = new catalogos();
    this.SelectedTipoUsuario !== '' ? catalogo.opt = 2 : catalogo.opt = 1;
    catalogo.Catalogos = {
      Id: 41,
      Nombre: 'Tipo de usuarios',
      Descripcion: 'Catalogo de tipo de usuario',
      Activo: true
    };
    catalogo.TpUsuario = [this.formTipoUsuario.getRawValue()];
    debugger;
    this.services.GuardaCatalogo(catalogo)
    .subscribe( result => { // Agregar
      result ? this.UpTpUsuario.emit(catalogo.Catalogos.Id) : console.log(result);
      this.Habilita(true);
    });
  }

  Limpiar() {
    this.formTipoUsuario.reset();
  }

  Habilita(opt: boolean) {
    if (!opt) {
      this.formTipoUsuario.get('tipo').enable();
    } else {
      this.formTipoUsuario.get('tipo').disable();
    }
  }

}
