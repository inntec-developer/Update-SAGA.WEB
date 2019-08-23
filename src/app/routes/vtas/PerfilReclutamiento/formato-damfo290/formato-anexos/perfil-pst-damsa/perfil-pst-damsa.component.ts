import { forEach } from '@angular/router/src/utils/collection';
import { Component, OnInit, EventEmitter, Output, Input, SimpleChanges, AfterViewInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ToasterConfig, ToasterService, Toast } from 'angular2-toaster';
import { SettingsService } from '../../../../../../core/settings/settings.service';

@Component({
  selector: 'app-perfil-pst-damsa',
  templateUrl: './perfil-pst-damsa.component.html',
  styleUrls: ['./perfil-pst-damsa.component.scss']
})
export class PerfilPstDamsaComponent implements OnInit, OnChanges {

  @Input() IdFormato: any;
  @Input() Psicometrias: any[];
  @Output() PsicometriasEmt = new EventEmitter();

  PsicometriasNew = [];

  esNuevo = true;

  private Add: boolean;

  public PsicometriasArray: FormGroup;
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
    private fb: FormBuilder,
    private toasterService: ToasterService,
  ) { }

  ngOnInit() {
    this.IdFormato = this.IdFormato || null;
    this.PsicometriasArray = this.fb.group({
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
    psicometria.forEach(x => {
      this.AddPsicometria(1);
    });
    this.PsicometriasArray.patchValue({
      psicometria: this.Psicometrias
    });
  }

  AddPsicometria(Psicometria?: any) {
    if (this.Add) {
      this.Add = true;
      return;
    } else {
      Psicometria > 0 ? this.Add = false : this.Add = true;
      const control = <FormArray>this.PsicometriasArray.controls['psicometria'];
      const addCtrl = this.initPsicometria();
      control.push(addCtrl);
    }
  }

  initPsicometria() {
    return this.fb.group({
      id: ['0'],
      psicometria: [],
      descripcion: [{ value: '', disabled: true }, [Validators.required]],
      psicometriaId: ['', [Validators.required, Validators.maxLength(200)]]
    });
  }

  Agregar(Value: boolean) {
    this.Add = false;
  }

  getRegistros(data: any) {
    if (!data['isEdit']) {
      let create = true;
      if (this.PsicometriasNew.length > 0) {
        this.PsicometriasNew.find(x => {
          if (x['psicometriaId'] === data['psicometriaId']) {
            return create = false;
          }
        });
      }
      if (create) {
        this.PsicometriasNew.push({
          Index: data['Index'],
          psicometriaId: data['psicometriaId'],
          UsuarioAlta: data['UsuarioAlta']
        });
      } else {
        this.removePsicometria(data['Index']);
        this.popToast('info', 'Psicometría Damsa', 'La psicometría ya existe, intente con otra.');
        this.AddPsicometria();
      }
    } else {
      let edit = true;
      this.PsicometriasNew.find(x => {
        if (x['psicometriaId'] === data['psicometriaId'] && x['Index'] !== data['Index']) {
          return edit = false;
        }
      });
      if (edit) {
        const editRegistro = {
          psicometriaId: data['psicometriaId'],
          UsuarioAlta: data['UsuarioAlta']
        };
        this.PsicometriasNew[data['index']] = editRegistro;
      } else {
        this.removePsicometria(data['Index']);
        this.popToast('info', 'Psicometría Damsa', 'La psicometría ya existe intente con otra.');
        this.AddPsicometria();
      }
    }
    this.PsicometriasEmt.emit(this.PsicometriasNew);
  }

  removePsicometria(i: number) {
    const control = <FormArray>this.PsicometriasArray.controls['psicometria'];
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
