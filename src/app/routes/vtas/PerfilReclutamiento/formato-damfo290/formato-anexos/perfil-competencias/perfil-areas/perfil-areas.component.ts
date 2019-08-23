import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { SettingsService } from '../../../../../../../core/settings/settings.service';
import { ToasterConfig, Toast, ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-perfil-areas',
  templateUrl: './perfil-areas.component.html',
  styleUrls: ['./perfil-areas.component.scss']
})
export class PerfilAreasComponent implements OnInit, OnChanges {
  @Input() IdFormato: any;
  @Input() Competencias: any[];
  @Output() CompetenciaEmt = new EventEmitter();
  CompetenciaNew = [];

  esNuevo = true;
  private Add: boolean;

  // public formEscolaridades: FormGroup;
  public CompetenciaArray: FormGroup;
  public competencia: any;
  // CREACION DE MENSAJES
  toaster: any;
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right',
    limit: 7, tapToDismiss: false,
    showCloseButton: true,
    mouseoverTimerStop: true,
  });

  constructor(
    private _settings: SettingsService,
    private fb: FormBuilder,
    private toasterService: ToasterService,
  ) { }

  ngOnInit() {
    this.IdFormato = this.IdFormato || null;
    this.CompetenciaArray = this.fb.group({
      competencia: this.fb.array([])
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.IdFormato != null) {
      this.esNuevo = false;
      if (this.Competencias.length > 0) {
        this.PopulateForm(this.Competencias);
      }
    }
  }

  private PopulateForm(escolaridad: any[]) {
    escolaridad.forEach(element => {
      this.AddCompetencia(1);
    });
    this.CompetenciaArray.patchValue({
      competencia: this.Competencias,
    });
  }

  AddCompetencia(Competencia?: number) {
    if (this.Add) {
      this.Add = true;
      return;
    } else {
      Competencia > 0 ? this.Add = false : this.Add = true;
      const control = <FormArray>this.CompetenciaArray.controls['competencia'];
      const addrCtrl = this.initCompetencia();
      control.push(addrCtrl);
    }
  }

  initCompetencia() {
    return this.fb.group({
      id: ['0'],
      competencia: [],
      competenciaId: ['', Validators.required],
      nivel: ['', Validators.required]
    });
  }

  Agregar(Value: boolean) {
    this.Add = false;
  }

  getRegistros(data: any) {
    if (!data['isEdit']) {
      let create = true;
      if (this.CompetenciaNew.length > 0) {
        this.CompetenciaNew.find(x => {
          if (x['CompetenciaId'] === data['CompetenciaId']) {
            return create = false;
          }
        });
      }
      if (create) {
        this.CompetenciaNew.push({
          Index: data['Index'],
          CompetenciaId: data['CompetenciaId'],
          Nivel: data['Nivel'],
          UsuarioAlta: this._settings['user']['usuario']
        });
      } else {
        this.removeCompetencia(data['Index']);
        this.popToast('info', 'Competecia Area', 'La competencia ya existe, intente con otra.');
        this.AddCompetencia();
      }
    } else {
      let edit = true;
      this.CompetenciaNew.find(x => {
        if (x['CompetenciaId'] === data['CompetenciaId'] && x['Index'] !== data['Index']) {
          return edit = false;
        }
      });
      if (edit) {
        const editRegistro = {
          Index: data['Index'],
          CompetenciaId: data['CompetenciaId'],
          Nivel: data['Nivel'],
          UsuarioAlta: this._settings['user']['usuario']
        };
        this.CompetenciaNew[data['index']] = editRegistro;
      } else {
        this.removeCompetencia(data['Index']);
        this.popToast('info', 'Competecia Area', 'La competencia ya existe, intente con otra.');
        this.AddCompetencia();
      }
    }
    this.CompetenciaEmt.emit(this.CompetenciaNew);
  }

  removeCompetencia(i: number) {
    const control = <FormArray>this.CompetenciaArray.controls['competencia'];
    control.removeAt(i);
    this.CompetenciaNew.splice(i, 1);
    this.CompetenciaEmt.emit(this.CompetenciaNew);
  }

  popToast(type: any, title: any, body: any) {
    const toast: Toast = {
      type: type,
      title: title,
      timeout: 5000,
      body: body
    };
    this.toasterService.pop(toast);
  }
}
