import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, OnChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingsService } from './../../../../../../core/settings/settings.service';

@Component({
  selector: 'app-perfil-escolaridades',
  templateUrl: './perfil-escolaridades.component.html',
  styleUrls: ['./perfil-escolaridades.component.scss']
})
export class PerfilEscolaridadesComponent implements OnInit, OnChanges {
  @Input() IdFormato: any;
  @Input() Escolaridades: any[];
  @Output() EscolaridadesEmt = new EventEmitter();
  EscolaridadesNew = [];

  esNuevo = true;
  private Add: boolean;

  // public formEscolaridades: FormGroup;
  public EscolaridadArray: FormGroup;
  public escolaridad: any;

  constructor(
    private _settings: SettingsService,
    private fb: FormBuilder

  ) { }

  ngOnInit() {
    this.IdFormato = this.IdFormato || null;
    this.EscolaridadArray = this.fb.group({
      escolaridad: this.fb.array([])
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.IdFormato != null) {
      this.esNuevo = false;
      if (this.Escolaridades.length > 0 && changes['Escolaridades'].previousValue.length === 0) {
        this.EscolaridadesNew = this.Escolaridades;
        this.PopulateForm(this.Escolaridades);
      }
    }
  }

  private PopulateForm(escolaridad: any) {
    escolaridad.forEach(x => {
      this.AddEscolaridad(1);
    });

     this.EscolaridadArray.controls['escolaridad'].setValue(this.Escolaridades);
  }

  AddEscolaridad(Escolaridad?: any) {
    if (this.Add) {
      this.Add = true;
      return;
    } else {
      Escolaridad > 0 ? this.Add = false : this.Add = true;
      const control = <FormArray>this.EscolaridadArray.controls['escolaridad'];
      const addrCtrl = this.initEscolaridad();
      control.push(addrCtrl);
    }
  }

  initEscolaridad() {
    return this.fb.group({
      id: ['0'],
      escolaridad: [],
      nivel: [],
      escolaridadId: ['', Validators.required],
      nivelId: ['', Validators.required]
    });
  }

  Agregar(Value: boolean) {
    this.Add = false;
  }

  getRegistros(data: any) {
    if (!data['isEdit']) {
      this.EscolaridadesNew.push({
        escolaridadId: data['escolaridadId'],
        estadoEstudioId: data['estadoEstudioId'],
        UsuarioAlta: this._settings['user']['usuario']
      });
    } else {
      const editRegistro = {
        escolaridadId: data['escolaridadId'],
        estadoEstudioId: data['estadoEstudioId'],
        UsuarioAlta: this._settings['user']['usuario']
      };
      this.EscolaridadesNew[data['Index']] = editRegistro;
    }
    this.EscolaridadesEmt.emit(this.EscolaridadesNew);
  }

  removeEscolaridad(i: number) {
    debugger;
    const control = <FormArray>this.EscolaridadArray.controls['escolaridad'];
    control.removeAt(i);
    this.EscolaridadesNew.splice(i, 1);
    this.EscolaridadesEmt.emit(this.EscolaridadesNew);
  }


}
