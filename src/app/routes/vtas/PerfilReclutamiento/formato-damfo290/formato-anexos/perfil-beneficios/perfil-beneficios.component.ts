import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { SettingsService } from '../../../../../../core/settings/settings.service';

@Component({
  selector: 'app-perfil-beneficios',
  templateUrl: './perfil-beneficios.component.html',
  styleUrls: ['./perfil-beneficios.component.scss']
})
export class PerfilBeneficiosComponent implements OnInit {
  @Input() IdFormato: any;
  @Input() Beneficios: any[];
  @Output() BeneficiosEmt = new EventEmitter();
  BeneficiosNew = [];

  esNuevo: boolean = true;
  private Add: boolean;

  // public formEscolaridades: FormGroup;
  public BeneficioArray: FormGroup;
  public beneficio: any;

  constructor(
    private _settings: SettingsService,
    private fb: FormBuilder

  ) { }

  ngOnInit() {
    this.IdFormato = this.IdFormato || null;
    this.BeneficioArray = this.fb.group({
      beneficio: this.fb.array([])
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inj
    if (this.IdFormato != null) {
      this.esNuevo = false;
      if (this.Beneficios != null) {
        this.PopulateForm(this.Beneficios);
      }
    }
  }

  private PopulateForm(beneficio: any[]) {
    for (let x in beneficio) {
      this.AddBeneficio(1);
    }
    this.BeneficioArray.patchValue({
      beneficio: this.Beneficios,
    });
  }

  AddBeneficio(Escolaridad?: any) {
    if (this.Add) {
      this.Add = true;
      return;
    }
    else {
      Escolaridad > 0 ? this.Add = false : this.Add = true;
      const control = <FormArray>this.BeneficioArray.controls['beneficio'];
      const addrCtrl = this.initBeneficio();
      control.push(addrCtrl);
    }
  }

  initBeneficio() {
    return this.fb.group({
      id: ['0'],
      beneficio: [],
      tipoBeneficio: [],
      cantidad: [],
      observaciones: [],
      tipoBeneficioId: ['', Validators.required],
      cantidadId: ['', Validators.required],
      observacionesId: ['']
    });
  }

  Agregar(Value: boolean) {
    this.Add = false;
  }

  getRegistros(data: any) {
    if (!data['isEdit']) {
      this.BeneficiosNew.push({
        TipobeneficioId: data['tipoBeneficioId'],
        Cantidad: data['cantidad'],
        Observaciones: data['observaciones'],
        UsuarioAlta: this._settings['user']['usuario']
      });
    } else {
      let editRegistro = {
        TipobeneficioId: data['tipoBeneficioId'],
        Cantidad: data['cantidad'],
        Observaciones: data['observaciones'],
        UsuarioAlta: this._settings['user']['usuario']
      };
      this.BeneficiosNew[data['index']] = editRegistro;
    }
    this.BeneficiosEmt.emit(this.BeneficiosNew);
  }

  removeBeneficio(i: number) {
    const control = <FormArray>this.BeneficioArray.controls['beneficio'];
    control.removeAt(i);
    this.BeneficiosNew.splice(i, 1);
    this.BeneficiosEmt.emit(this.BeneficiosNew);
  }

}
