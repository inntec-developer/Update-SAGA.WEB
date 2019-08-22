import { AfterContentInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { PerfilReclutamientoService } from '../../../../../../../service/PerfilReclutamiento/perfil-reclutamiento.service';
import { SettingsService } from '../../../../../../../core/settings/settings.service';

@Component({
  selector: 'app-observaciones-p',
  templateUrl: './observaciones.component.html',
  styleUrls: ['./observaciones.component.scss']
})
export class ObservacionesComponent implements OnInit, AfterContentInit {
  @Input('IdFormato') public IdFormato: any;
  @Input('observacion') public observacion: FormGroup;
  @Input('index') public index: number;
  @Output('remove') public remove = new EventEmitter();
  @Output('Add') public Add = new EventEmitter();
  @Output('Registros') public Registros = new EventEmitter();

  Observacion: any;

  ObservacionAux: any;

  Edit = false;
  isActionEdit = false;
  ShowAlert = false;


  TypeAlert = '';
  MsgAlert = '';

  constructor(
    private _servicePerfilR: PerfilReclutamientoService,
    private _setting: SettingsService,
  ) { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    if (this.observacion.get('id').value !== '0') {
      this.Observacion = this.observacion.get('observacion').value;
    } else {
      this.Edit = true;
    }
  }

  Save() {
    if (this.IdFormato != null) {
      const obj = {
        id: this.observacion.get('id').value,
        Observaciones: this.observacion.get('observacion').value.toUpperCase(),
        Usuario: this._setting.user.usuario,
        DAMFO290Id: this.IdFormato
      };
      this.Observacion = obj['Observaciones'];
      if (!this.isActionEdit) {
        obj['action'] = 'create';
        this._servicePerfilR.CrudObservacion(obj).subscribe(x => {
          if (x !== 404) {
            this.observacion.controls['id'].setValue(x);
            this.Edit = false;
            this.functionCreateAlert('success', false);
          } else {
            this.functionCreateAlert('error', false);
          }
        });
      } else {
        obj['action'] = 'update';
        this._servicePerfilR.CrudObservacion(obj).subscribe(x => {
          if (x !== 404) {
            this.Edit = false;
            this.isActionEdit = false;
            this.functionCreateAlert('success', true);
          } else {
            this.functionCreateAlert('error');
          }
        });
      }
    } else {
      const data = {
        isEdit: this.isActionEdit,
        index: this.index,
        observaciones: this.observacion.get('observacion').value,
        UsuarioAlta: this._setting.user.usuario,
      };
      this.Observacion = data['observaciones'];
      if (!this.isActionEdit) {
        this.Add.emit(false);
        this.Edit = false;
      } else {
        this.Edit = false;
        this.isActionEdit = false;
      }
      this.Registros.emit(data);
    }
    this.Add.emit(false);
  }

  OnEdit() {
    this.ObservacionAux = this.Observacion;
    this.isActionEdit = true;
  }

  Remove() {
    if (!this.isActionEdit) {
      this.remove.emit(this.index);
      this.Add.emit(false);
      if (this.IdFormato != null && this.observacion.get('id').value != null) {
        const obj = {
          id: this.observacion.get('id').value,
          action: 'delete'
        };
        this._servicePerfilR.CrudObservacion(obj).subscribe(data => {
          if (data !== 404) {
            this.remove.emit(false);
            this.Add.emit(false);
          } else {
            this.functionCreateAlert('error');
          }
        });
      }
    } else {
      this.Observacion = this.ObservacionAux;
      this.isActionEdit = false;
      this.Edit = false;
    }
  }

  functionCreateAlert(type: string, edit?: boolean) {
    this.ShowAlert = true;
    switch (type) {
      case 'success':
        if (edit) {
          this.MsgAlert = 'Se actualizo la actividad del Perfil de Reclutamiento.';
        } else {
          this.MsgAlert = 'Se agregó una nueva actividad el Perfil de Reclutamiento.';
        }
        this.TypeAlert = type;
        break;
      case 'error':
        this.TypeAlert = 'danger';
        this.MsgAlert = 'Algo salió mal, por favor intente de nuevo.';
        break;
    }
    setTimeout(() => {
      this.ShowAlert = false;
    }, 3000);
  }



}
