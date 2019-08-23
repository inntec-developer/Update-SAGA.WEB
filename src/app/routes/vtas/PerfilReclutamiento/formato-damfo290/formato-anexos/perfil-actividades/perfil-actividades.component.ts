import { forEach } from '@angular/router/src/utils/collection';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { SettingsService } from './../../../../../../core/settings/settings.service';
import { Component, OnInit, EventEmitter, Input, Output, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-perfil-actividades',
  templateUrl: './perfil-actividades.component.html',
  styleUrls: ['./perfil-actividades.component.scss']
})
export class PerfilActividadesComponent implements OnInit, OnChanges {
  @Input() IdFormato: any;
  @Input() Actividades: any[];
  @Output() ActividadesEmt = new EventEmitter();

  ActividadesNew = [];

  esNuevo = true;
  private Add: boolean;

  public ActividadArray: FormGroup;
  public activdad: any;

  constructor(
    private _setting: SettingsService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.IdFormato = this.IdFormato || null;
    this.ActividadArray = this.fb.group({
      actividad: this.fb.array([])
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.IdFormato != null) {
      this.esNuevo = false;
      if (this.Actividades.length > 0) {
        this.PopulateForm(this.Actividades);
      }
    }
  }

  private PopulateForm(actividad: any) {
    actividad.forEach(x => {
      this.AddActividad(1);
    });
    this.ActividadArray.patchValue({
      actividad: this.Actividades
    });
  }

  AddActividad(Actividad?: any) {
    if (this.Add) {
      this.Add = true;
      return;
    } else {
      Actividad > 0 ? this.Add = false : this.Add = true;
      const control = <FormArray>this.ActividadArray.controls['actividad'];
      const addCtrl = this.initActividad();
      control.push(addCtrl);
    }
  }

  initActividad() {
    return this.fb.group({
      id: ['0'],
      actividad: ['', [Validators.required, Validators.maxLength(200)]]
    });
  }

  Agregar(Value: boolean) {
    this.Add = false;
  }

  getRegistros(data: any) {
    if (!data['isEdit']) {
      this.ActividadesNew.push({
        Actividades: data['actividad'],
        UsuarioAlta: data['UsuarioAlta']
      });
    } else {
      const editRegistro = {
        Actividad: data['actividad'],
        UsuarioAlta: data['UsuarioAlta']
      };
      this.ActividadesNew[data['index']] = editRegistro;
    }
    this.ActividadesEmt.emit(this.ActividadesNew);
  }

  removeActivdad(i: number) {
    const control = <FormArray>this.ActividadArray.controls['actividad'];
    control.removeAt(i);
    this.ActividadesNew.splice(i, 1);
    this.ActividadesEmt.emit(this.ActividadesNew);
  }

}
