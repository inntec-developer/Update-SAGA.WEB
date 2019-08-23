import { forEach } from '@angular/router/src/utils/collection';
import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil-prestaciones',
  templateUrl: './perfil-prestaciones.component.html',
  styleUrls: ['./perfil-prestaciones.component.scss']
})
export class PerfilPrestacionesComponent implements OnInit, OnChanges {
  @Input() IdFormato: any;
  @Input() Prestaciones: any[];
  @Output() PrestacionesEmt = new EventEmitter();

  PrestacionesNew = [];

  esNuevo = true;
  private Add: boolean;

  public PrestacionesArray: FormGroup;
  public prestacion: any;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.IdFormato = this.IdFormato || null;
    this.PrestacionesArray = this.fb.group({
      prestacion: this.fb.array([])
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.IdFormato != null) {
      this.esNuevo = false;
      if (this.Prestaciones.length > 0) {
        this.PopulateForm(this.Prestaciones);
      }
    }
  }

  private PopulateForm(observacion: any) {
    observacion.forEach(x => {
      this.AddPrestacion(1);
    });
    this.PrestacionesArray.patchValue({
      prestacion: this.Prestaciones
    });
  }

  AddPrestacion(Prestacion?: any) {
    if (this.Add) {
      this.Add = true;
      return;
    } else {
      Prestacion > 0 ? this.Add = false : this.Add = true;
      const control = <FormArray>this.PrestacionesArray.controls['prestacion'];
      const addCtrl = this.initPrestacion();
      control.push(addCtrl);
    }
  }

  initPrestacion() {
    return this.fb.group({
      id: ['0'],
      prestacion: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  Agregar(Value: boolean) {
    this.Add = false;
  }

  getRegistros(data: any) {
    if (!data['isEdit']) {
      this.PrestacionesNew.push({
        Prestamo: data['Prestacion'],
        UsuarioAlta: data['UsuarioAlta']
      });
    } else {
      const editRegistro = {
        Prestacion: data['Prestacion'],
        UsuarioAlta: data['UsuarioAlta']
      };
      this.PrestacionesNew[data['index']] = editRegistro;
    }
    this.PrestacionesEmt.emit(this.PrestacionesNew);
  }

  removePrestacion(i: number) {
    const control = <FormArray>this.PrestacionesArray.controls['prestacion'];
    control.removeAt(i);
    this.PrestacionesNew.splice(i, 1);
    this.PrestacionesEmt.emit(this.PrestacionesNew);
  }

}
