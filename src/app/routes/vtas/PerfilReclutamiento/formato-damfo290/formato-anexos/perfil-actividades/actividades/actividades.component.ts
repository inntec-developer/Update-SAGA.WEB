import { AfterContentInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { PerfilReclutamientoService } from './../../../../../../../service/PerfilReclutamiento/perfil-reclutamiento.service';
import { SettingsService } from './../../../../../../../core/settings/settings.service';

@Component({
  selector: 'app-actividades-p',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.scss']
})
export class ActividadesComponent implements OnInit, AfterContentInit {
  @Input('IdFormato') public IdFormato: any;
  @Input('actividad') public actividad: FormGroup;
  @Input('index') public index: number;
  @Output('remove') public remove = new EventEmitter();
  @Output('Add') public Add = new EventEmitter();
  @Output('Registros') public Registros = new EventEmitter();

  Actividad: any;

  ActividadAux: any;

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
    if (this.actividad.get('id').value !== '0') {
      this.Actividad = this.actividad.get('actividad').value;
    } else {
      this.Edit = true;
    }
  }

  Save() {
    if (this.IdFormato != null) {
      const obj = {
        Index: this.index,
        IsEdit: this.isActionEdit,
        id: this.actividad.get('id').value,
        actividades: this.actividad.get('actividad').value,
        Usuario: this._setting.user.usuario,
        DAMFO290Id: this.IdFormato
      };
      this.Actividad = obj['actividades'];
      if (!this.isActionEdit) {
        obj['action'] = 'create';
        this._servicePerfilR.CrudActividad(obj).subscribe(x => {
          if (x !== 404) {
            const objAux = {
              Index: this.index,
              IsEdit: this.isActionEdit,
              id: this.actividad.get('id').value,
              actividad: this.actividad.get('actividad').value,
              Usuario: this._setting.user.usuario,
              DAMFO290Id: this.IdFormato
            };
            this.Registros.emit(objAux);
            this.actividad.controls['id'].setValue(x);
            this.Edit = false;
            this.functionCreateAlert('success', false);
          } else {
            this.functionCreateAlert('error', false);
          }
        });
      } else {
        obj['action'] = 'update';
        this._servicePerfilR.CrudActividad(obj).subscribe(x => {
          if (x !== 404) {
            const objAux = {
              Index: this.index,
              IsEdit: this.isActionEdit,
              id: this.actividad.get('id').value,
              actividad: this.actividad.get('actividad').value,
              Usuario: this._setting.user.usuario,
              DAMFO290Id: this.IdFormato
            };
            this.Registros.emit(objAux);
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
        Index: this.index,
        actividad: this.actividad.get('actividad').value,
        UsuarioAlta: this._setting.user.usuario,
      };
      this.Actividad = data['actividad'];
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
    this.ActividadAux = this.Actividad;
    this.isActionEdit = true;
  }

  Remove() {
    if (!this.isActionEdit) {
      this.remove.emit(this.index);
      this.Add.emit(false);
      if (this.IdFormato != null && this.actividad.get('id').value != null) {
        const obj = {
          id: this.actividad.get('id').value,
          action: 'delete'
        };
        this._servicePerfilR.CrudActividad(obj).subscribe(data => {
          if (data !== 404) {
            this.remove.emit(false);
            this.Add.emit(false);
          } else {
            this.functionCreateAlert('error');
          }
        });
      }
    } else {
      this.Actividad = this.ActividadAux;
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
        this.TypeAlert = type;
        this.MsgAlert = 'Algo salió mal, por favor intente de nuevo.';
        break;
    }
    setTimeout(() => {
      this.ShowAlert = false;
    }, 3000);
  }

}
