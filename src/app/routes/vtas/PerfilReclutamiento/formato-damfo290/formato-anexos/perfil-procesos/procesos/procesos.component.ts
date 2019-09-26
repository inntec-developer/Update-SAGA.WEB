import { AfterContentInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { PerfilReclutamientoService } from '../../../../../../../service/PerfilReclutamiento/perfil-reclutamiento.service';
import { SettingsService } from '../../../../../../../core/settings/settings.service';

@Component({
  selector: 'app-procesos-p',
  templateUrl: './procesos.component.html',
  styleUrls: ['./procesos.component.scss']
})
export class ProcesosComponent implements OnInit, AfterContentInit {
  @Input('IdFormato') public IdFormato: any;
  @Input('proceso') public proceso: FormGroup;
  @Input('index') public index: number;
  @Output('remove') public remove = new EventEmitter();
  @Output('Add') public Add = new EventEmitter();
  @Output('Registros') public Registros = new EventEmitter();

  Proceso: any;

  ProcesoAux: any;

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
    if (this.proceso.get('id').value !== '0') {
      this.Proceso = this.proceso.get('proceso').value;
    } else {
      this.Edit = true;
    }
  }

  Save() {
    if (this.IdFormato != null) {
      const obj = {
        Index: this.index,
        isEdit: this.isActionEdit,
        id: this.proceso.get('id').value,
        Proceso: this.proceso.get('proceso').value.toUpperCase(),
        Usuario: this._setting.user.usuario,
        DAMFO290Id: this.IdFormato
      };
      this.Proceso = obj['Proceso'];
      if (!this.isActionEdit) {
        obj['action'] = 'create';
        this._servicePerfilR.CrudProcesos(obj).subscribe(x => {
          if (x !== 404) {
            this.Registros.emit(obj);
            this.proceso.controls['id'].setValue(x);
            this.Edit = false;
            this.functionCreateAlert('success', false);
          } else {
            this.functionCreateAlert('error', false);
          }
        });
      } else {
        obj['action'] = 'update';
        this._servicePerfilR.CrudProcesos(obj).subscribe(x => {
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
        Index: this.index,
        Proceso: this.proceso.get('proceso').value.toUpperCase(),
        UsuarioAlta: this._setting.user.usuario,
      };
      this.Proceso = data['Proceso'];
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
    this.ProcesoAux = this.Proceso;
    this.proceso.patchValue({
      proceso: this.Proceso
    });
    this.isActionEdit = true;
  }

  Remove() {
    if (!this.isActionEdit) {
      this.remove.emit(this.index);
      this.Add.emit(false);
      if (this.IdFormato != null && this.proceso.get('id').value != null) {
        const obj = {
          id: this.proceso.get('id').value,
          action: 'delete'
        };
        this._servicePerfilR.CrudProcesos(obj).subscribe(data => {
          if (data !== 404) {
            this.remove.emit(false);
            this.Add.emit(false);
          } else {
            this.functionCreateAlert('error');
          }
        });
      }
    } else {
      this.Proceso = this.ProcesoAux;
      this.proceso.patchValue({
        proceso: this.ProcesoAux
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
          this.MsgAlert = 'Se actualizo el proceso del Perfil de Reclutamiento.';
        } else {
          this.MsgAlert = 'Se agregó un nuevo proceso el Perfil de Reclutamiento.';
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
