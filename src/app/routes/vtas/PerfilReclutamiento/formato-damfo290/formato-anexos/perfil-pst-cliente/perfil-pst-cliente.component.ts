import { forEach } from '@angular/router/src/utils/collection';
import { Component, OnInit, EventEmitter, Output, Input, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';
import { SettingsService } from '../../../../../../core/settings/settings.service';

@Component({
  selector: 'app-perfil-pst-cliente',
  templateUrl: './perfil-pst-cliente.component.html',
  styleUrls: ['./perfil-pst-cliente.component.scss']
})
export class PerfilPstClienteComponent implements OnInit, OnChanges {
  @Input() IdFormato: any;
  @Input() Psicometrias: any[];
  @Output() PsicometriasEmt = new EventEmitter();

  PsicometriasNew = [];

  esNuevo = true;

  private Add: boolean;

  public PsicometriasCArray: FormGroup;
  public pscometrias: any;


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
    this.PsicometriasCArray = this.fb.group({
      psicometria: this.fb.array([])
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.IdFormato != null) {
      this.esNuevo = false;
      if (this.Psicometrias.length > 0) {
        this.PsicometriasNew = this.Psicometrias;
        this.PopulateForm(this.Psicometrias);
      }
    }
  }

  private PopulateForm(psicometria: any) {
    psicometria.forEach(elemet => {
      this.AddPsicometria(1);
    });
    this.PsicometriasCArray.patchValue({
      psicometria: this.Psicometrias
    });
  }

  AddPsicometria(Psicometria?: any) {
    if (this.Add) {
      this.Add = true;
      return;
    } else {
      Psicometria > 0 ? this.Add = false : this.Add = true;
      const control = <FormArray>this.PsicometriasCArray.controls['psicometria'];
      const addCtrl = this.initPsicometria();
      control.push(addCtrl);
    }
  }

  initPsicometria() {
    return this.fb.group({
      id: ['0'],
      psicometria: ['', [Validators.required, Validators.maxLength(50)]],
      descripcion: ['', [Validators.required, Validators.maxLength(200)]],
    });
  }

  Agregar(Value: boolean) {
    this.Add = false;
  }

  getRegistros(data: any) {
    if (!data['isEdit']) {
      let create = true;
      if (this.PsicometriasNew.length > 0) {
        this.PsicometriasNew.find(element => {
          if (element['psicometria'] === data['psicometria']) {
            return create = false;
          }
        });
      }
      if (create) {
        this.PsicometriasNew.push({
          Index: data['Index'],
          psicometria: data['psicometria'],
          descripcion: data['descripcion'],
          UsuarioAlta: data['UsuarioAlta']
        });
      } else {
        this.removePsicometria(data['Index']);
        this.popToast('info', 'Psicometría Cliente', 'La psicometría ya existe, intente con otra.');
        this.AddPsicometria();
      }
    } else {
      let edit = true;
      this.PsicometriasNew.find(x => {
        if (x['psicometria'] === data['psicometria'] && x['Index'] !== data['Index']) {
          return edit = false;
        }
      });
      if (edit) {
        const editRegistro = {
          Index: data['Index'],
          psicometria: data['psicometria'],
          descripcion: data['descripcion'],
          UsuarioAlta: data['UsuarioAlta']
        };
        this.PsicometriasNew[data['index']] = editRegistro;
      } else {
        this.removePsicometria(data['Index']);
        this.popToast('info', 'Psicometría Cliente', 'La psicometría ya existe, intente con otra.');
        this.AddPsicometria();
      }

    }
    this.PsicometriasEmt.emit(this.PsicometriasNew);
  }

  removePsicometria(i: number) {
    const control = <FormArray>this.PsicometriasCArray.controls['psicometria'];
    control.removeAt(i);
    this.PsicometriasNew.splice(i, 1);
    this.PsicometriasEmt.emit(this.PsicometriasNew);
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
