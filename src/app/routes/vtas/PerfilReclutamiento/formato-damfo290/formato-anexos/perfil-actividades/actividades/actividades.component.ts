import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { PerfilReclutamientoService } from './../../../../../../../service/PerfilReclutamiento/perfil-reclutamiento.service';
import { SettingsService } from './../../../../../../../core/settings/settings.service';

@Component({
  selector: 'actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.scss']
})
export class ActividadesComponent implements OnInit {
  @Input('IdFormato') public IdFormato: any;
  @Input('group') public actividad: FormGroup;
  @Input('Index') public index: number;
  @Output('Remove') public remove = new EventEmitter();
  @Output('Add') public Add = new EventEmitter();
  @Output('Registros') public Registros = new EventEmitter();

  Actividad: any;

  ActividadAux: any;

  Edit: boolean = false;
  isActionEdit: boolean = false;
  ShowAlert: boolean = false;


  TypeAlert: string = '';
  MsgAlert: string = '';

  constructor(
    private _servicePerfilR: PerfilReclutamientoService,
    private _setting: SettingsService,
  ) { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    if (this.actividad.get('id').value != 0) {
      this.Actividad = this.actividad.get('actividad').value;
    } else {
      this.Edit = true;
    }
  }

  Save() {
    if (this.IdFormato != null) {
      var obj = {
        id: this.actividad.get('id').value,
        actividad: this.actividad.get('actividad').value,
        Usuarios: this._setting.user.usuario,
        DAMFO290Id: this.IdFormato
      }
      this.Actividad = obj['actividad'];
      if (!this.isActionEdit) {
        obj['action'] = 'create';
        this._servicePerfilR.CrudActividad(obj).subscribe(x => {
          if (x != 404) {
            this.actividad.controls['id'].setValue(x);
            this.Edit = false;
            this.functionCreateAlert('success', false);
          } else {
            this.functionCreateAlert('error', false);
          }
        });
      }
      else {
        obj['action'] = 'update';
        this._servicePerfilR.CrudActividad(obj).subscribe(x => {
          if (x != 404) {
            this.Edit = false;
            this.isActionEdit = false;
            this.functionCreateAlert('success', true);
          } else {
            this.functionCreateAlert('error');
          }
        });
      }
    }
    else {
      var data = {
        isEdit: this.isActionEdit,
        index: this.index,
        actividad: this.actividad.get('actividad').value,
        UsuarioAlta: this._setting.user.usuario,
      }
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

OnEdit(){
  this.ActividadAux = this.Actividad;
  this.isActionEdit = true;
}

Remove(){
  if (!this.isActionEdit) {
    this.remove.emit(this.index);
    this.Add.emit(false);
    if (this.IdFormato != null && this.actividad.get('id').value != null) {
      var obj = {
        id: this.actividad.get('id').value,
        action: 'delete'
      }
      this._servicePerfilR.CrudActividad(obj).subscribe(data => {
        if (data != 404) {
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

functionCreateAlert(type: string, edit ?: boolean) {
  this.ShowAlert = true;
  switch (type) {
    case 'success':
      if (edit) {
        this.MsgAlert = 'Se actualizo la actividad del Perfil de Reclutamiento.'
        }
        else {
          this.MsgAlert = 'Se agregó una nueva actividad el Perfil de Reclutamiento.'
      }
      this.TypeAlert = type;

      break;
    case 'error':
      this.TypeAlert = type;
      this.MsgAlert = 'Algo salió mal, por favor intente de nuevo.'
      break;
  }
  setTimeout(() => {
    this.ShowAlert = false;
  }, 3000);
}

}
