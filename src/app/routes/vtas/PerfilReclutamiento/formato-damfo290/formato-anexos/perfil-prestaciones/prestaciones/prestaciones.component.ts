import { AfterContentInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { PerfilReclutamientoService } from '../../../../../../../service/PerfilReclutamiento/perfil-reclutamiento.service';
import { SettingsService } from '../../../../../../../core/settings/settings.service';

@Component({
  selector: 'app-prestaciones-p',
  templateUrl: './prestaciones.component.html',
  styleUrls: ['./prestaciones.component.scss']
})
export class PrestacionesComponent implements OnInit, AfterContentInit {
  @Input('IdFormato') public IdFormato: any;
  @Input('prestacion') public prestacion: FormGroup;
  @Input('index') public index: number;
  @Output('remove') public remove = new EventEmitter();
  @Output('Add') public Add = new EventEmitter();
  @Output('Registros') public Registros = new EventEmitter();

  Prestacion: any;

  PrestacionAux: any;

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
    if (this.prestacion.get('id').value !== '0') {
      this.Prestacion = this.prestacion.get('prestacion').value;
    } else {
      this.Edit = true;
    }
  }

  Save() {
    if (this.IdFormato != null) {
      const obj = {
        Index: this.index,
        isEdit: this.isActionEdit,
        id: this.prestacion.get('id').value,
        Prestacion: this.prestacion.get('prestacion').value.toUpperCase(),
        Usuario: this._setting.user.usuario,
        DAMFO290Id: this.IdFormato
      };
      this.Prestacion = obj['Prestacion'];
      if (!this.isActionEdit) {
        obj['action'] = 'create';
        this._servicePerfilR.CrudPrestaciones(obj).subscribe(x => {
          if (x !== 404) {
            this.Registros.emit(obj);
            this.prestacion.controls['id'].setValue(x);
            this.Edit = false;
            this.functionCreateAlert('success', false);
          } else {
            this.functionCreateAlert('error', false);
          }
        });
      } else {
        obj['action'] = 'update';
        this._servicePerfilR.CrudPrestaciones(obj).subscribe(x => {
          if (x !== 404) {
            this.Registros.emit(obj);
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
        Prestacion: this.prestacion.get('prestacion').value,
        UsuarioAlta: this._setting.user.usuario,
      };
      this.Prestacion = data['Prestacion'];
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
    this.PrestacionAux = this.Prestacion;
    this.prestacion.patchValue({
      prestacion: this.Prestacion
    });
    this.isActionEdit = true;
  }

  Remove() {
    if (!this.isActionEdit) {
      this.remove.emit(this.index);
      this.Add.emit(false);
      if (this.IdFormato != null && this.prestacion.get('id').value != null) {
        const obj = {
          id: this.prestacion.get('id').value,
          action: 'delete'
        };
        this._servicePerfilR.CrudPrestaciones(obj).subscribe(data => {
          if (data !== 404) {
            this.remove.emit(false);
            this.Add.emit(false);
          } else {
            this.functionCreateAlert('error');
          }
        });
      }
    } else {
      this.Prestacion = this.PrestacionAux;
      this.prestacion.patchValue({
        prestacion: this.PrestacionAux
      });
      this.isActionEdit = false;
      this.Edit = false;
    }
  }

  functionCreateAlert(type: string, edit?: boolean) {
    this.ShowAlert = true;
    switch (type) {
      case 'success':
        if (edit) {
          this.MsgAlert = 'Se actualizo la prestación del Perfil de Reclutamiento.';
        } else {
          this.MsgAlert = 'Se agregó una nueva prestación el Perfil de Reclutamiento.';
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
