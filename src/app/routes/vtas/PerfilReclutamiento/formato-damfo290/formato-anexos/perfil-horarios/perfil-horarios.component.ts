import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { SettingsService } from '../../../../../../core/settings/settings.service';

@Component({
  selector: 'app-perfil-horarios',
  templateUrl: './perfil-horarios.component.html',
  styleUrls: ['./perfil-horarios.component.scss']
})
export class PerfilHorariosComponent implements OnInit {
  @Input() IdFormato: any;
  @Input() Horarios: any[];
  @Output() HorariosEmt = new EventEmitter();
  HorariosNew = [];

  esNuevo: boolean = true;
  private Add: boolean;

  // public formEscolaridades: FormGroup;
  public HorarioArray: FormGroup;
  public horario: any;

  constructor(
    private _settings: SettingsService,
    private fb: FormBuilder

  ) { }

  ngOnInit() {
    this.IdFormato = this.IdFormato || null;
    this.HorarioArray = this.fb.group({
      horario: this.fb.array([])
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inj
    if (this.IdFormato != null) {
      this.esNuevo = false;
      if (this.Horarios != null) {
        this.PopulateForm(this.Horarios);
      }
    }
  }

  private PopulateForm(horario: any[]) {
    for (let x in horario) {
      this.AddHorario(1);
    }
    this.HorarioArray.patchValue({
      horario: this.Horarios,
    });
  }

  AddHorario(Horario?: any) {
    if (this.Add) {
      this.Add = true;
      return;
    }
    else {
      Horario > 0 ? this.Add = false : this.Add = true;
      const control = <FormArray>this.HorarioArray.controls['horario'];
      const addrCtrl = this.initHorario();
      control.push(addrCtrl);
    }
  }

  initHorario() {
    return this.fb.group({
      id: ['0'],
      deDia: [],
      aDia: [],
      nombre: [],
      horario: ['', Validators.required],
      deDiaId: ['', Validators.required],
      aDiaId: ['', Validators.required],
      deHora: ['', Validators.required],
      aHora: ['', Validators.required],
      vacantes: ['', [Validators.required, Validators.min(1)]],
      especificaciones: [''],
      activo: ['']
    });
  }

  Agregar(Value: boolean) {
    this.Add = false;
  }

  getRegistros(data: any) {
    if (!data['isEdit']) {

      this.HorariosNew.push({
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
      this.HorariosNew[data['index']] = editRegistro;
    }
    this.HorariosEmt.emit(this.HorariosNew);
  }

  removeHorario(i: number) {
    const control = <FormArray>this.HorarioArray.controls['horario'];
    control.removeAt(i);
    this.HorariosNew.splice(i, 1);
    this.HorariosEmt.emit(this.HorariosNew);
  }


}
