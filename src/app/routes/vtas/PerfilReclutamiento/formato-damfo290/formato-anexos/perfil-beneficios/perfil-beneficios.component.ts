import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges, OnChanges } from '@angular/core';
import { SettingsService } from '../../../../../../core/settings/settings.service';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-perfil-beneficios',
  templateUrl: './perfil-beneficios.component.html',
  styleUrls: ['./perfil-beneficios.component.scss']
})
export class PerfilBeneficiosComponent implements OnInit, OnChanges {
  @Input() IdFormato: any;
  @Input() Beneficios: any[];
  @Output() BeneficiosEmt = new EventEmitter();
  BeneficiosNew = [];

  esNuevo = true;
  private Add: boolean;

  // public formEscolaridades: FormGroup;
  public BeneficioArray: FormGroup;
  public beneficio: any;

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
    this.BeneficioArray = this.fb.group({
      beneficio: this.fb.array([])
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.IdFormato != null) {
      this.esNuevo = false;
      if (this.Beneficios.length > 0) {
        this.PopulateForm(this.Beneficios);
      }
    }
  }

  private PopulateForm(beneficio: any[]) {
    beneficio.forEach(x => {
      this.AddBeneficio(1);
    });
    this.BeneficioArray.patchValue({
      beneficio: this.Beneficios,
    });
  }

  AddBeneficio(Escolaridad?: any) {
    if (this.Add) {
      this.Add = true;
      return;
    } else {
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
      let create = true;
      if (this.BeneficiosNew.length > 0) {
        this.BeneficiosNew.find(x => {
          if (x['tipoBeneficioId'] === data['tipoBeneficioId']) {
            return create = false;
          }
        });
      }
      if (create) {
        this.BeneficiosNew.push({
          Index: data['Index'],
          tipoBeneficioId: data['tipoBeneficioId'],
          Cantidad: data['cantidad'],
          Observaciones: data['observaciones'].toUpperCase(),
          UsuarioAlta: data['UsuarioAlta']
        });
      } else {
        this.removeBeneficio(data['Index']);
        this.popToast('info', 'Beneficios', 'El Beneficio ya existe, intente con otra.');
        this.AddBeneficio();
      }
    } else {
      let edit = true;
      this.BeneficiosNew.find(x => {
        if (x['tipoBeneficioId'] === data['tipoBeneficioId'] && x['Index'] !== data['Index']) {
          return edit = false;
        }
      });
      if (edit) {
        const editRegistro = {
          Index: data['Index'],
          tipoBeneficioId: data['tipoBeneficioId'],
          Cantidad: data['cantidad'],
          Observaciones: data['observaciones'],
          UsuarioAlta: data['UsuarioAlta']
        };
        this.BeneficiosNew[data['index']] = editRegistro;
      } else {
        this.removeBeneficio(data['Index']);
        this.popToast('info', 'Beneficios', 'El Beneficio ya existe, intente con otra.');
        this.AddBeneficio();
      }
    }
    this.BeneficiosEmt.emit(this.BeneficiosNew);
  }

  removeBeneficio(i: number) {
    const control = <FormArray>this.BeneficioArray.controls['beneficio'];
    control.removeAt(i);
    this.BeneficiosNew.splice(i, 1);
    this.BeneficiosEmt.emit(this.BeneficiosNew);
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
