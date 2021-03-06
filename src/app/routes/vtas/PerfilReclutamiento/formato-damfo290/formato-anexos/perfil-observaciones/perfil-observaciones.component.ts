
import { Component, OnInit, EventEmitter, Input, Output, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil-observaciones',
  templateUrl: './perfil-observaciones.component.html',
  styleUrls: ['./perfil-observaciones.component.scss']
})
export class PerfilObservacionesComponent implements OnInit, OnChanges {

  @Input() IdFormato: any;
  @Input() Observaciones: any[];
  @Output() ObservacionesEmt = new EventEmitter();

  ObservacionesNew = [];

  esNuevo = true;
  private Add: boolean;

  public ObservacionesArray: FormGroup;
  public observacion: any;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.IdFormato = this.IdFormato || null;
    this.ObservacionesArray = this.fb.group({
      observacion: this.fb.array([])
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.IdFormato != null) {
      this.esNuevo = false;
      if (this.Observaciones.length > 0) {
        this.ObservacionesNew = this.Observaciones;
        this.PopulateForm(this.Observaciones);
      }
    }
  }

  private PopulateForm(observacion: any) {
    observacion.forEach(x => {
      this.AddObservacion(1);
    });
    this.ObservacionesArray.patchValue({
      observacion: this.Observaciones
    });
  }

  AddObservacion(Observaciones?: any) {
    if (this.Add) {
      this.Add = true;
      return;
    } else {
      Observaciones > 0 ? this.Add = false : this.Add = true;
      const control = <FormArray>this.ObservacionesArray.controls['observacion'];
      const addCtrl = this.initObservacion();
      control.push(addCtrl);
    }
  }

  initObservacion() {
    return this.fb.group({
      id: ['0'],
      observacion: ['', [Validators.required, Validators.maxLength(200)]]
    });
  }

  Agregar(Value: boolean) {
    this.Add = false;
  }

  getRegistros(data: any) {
    if (!data['isEdit']) {
      this.ObservacionesNew.push({
        observaciones: data['Observaciones'].toUpperCase(),
        UsuarioAlta: data['UsuarioAlta']
      });
    } else {
      const editRegistro = {
        observaciones: data['Observaciones'].toUpperCase(),
        UsuarioAlta: data['UsuarioAlta']
      };
      this.ObservacionesNew[data['Index']] = editRegistro;
    }
    this.ObservacionesEmt.emit(this.ObservacionesNew);
  }

  removeObservacion(i: number) {
    const control = <FormArray>this.ObservacionesArray.controls['observacion'];
    control.removeAt(i);
    this.ObservacionesNew.splice(i, 1);
    this.ObservacionesEmt.emit(this.ObservacionesNew);
  }

}
