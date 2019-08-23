import { AfterContentInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CatalogosService } from '../../../../../../../service';
import { FormGroup } from '@angular/forms';
import { PerfilReclutamientoService } from '../../../../../../../service/PerfilReclutamiento/perfil-reclutamiento.service';
import { SettingsService } from '../../../../../../../core/settings/settings.service';

@Component({
  selector: 'app-pst-cliente',
  templateUrl: './pst-cliente.component.html',
  styleUrls: ['./pst-cliente.component.scss'],
  providers: [CatalogosService, PerfilReclutamientoService]
})
export class PstClienteComponent implements OnInit, AfterContentInit {

  @Input('IdFormato') public IdFormato: any;
  @Input('psicometriaC') public psicometriaC: FormGroup;
  @Input('index') public index: number;
  @Output('remove') public remove = new EventEmitter();
  @Output('Add') public Add = new EventEmitter();
  @Output('Registros') public Registros = new EventEmitter();

  Psicometrias: any;

  Psicometria: any;
  Descripcion: any;

  PsicometriaAux: any;
  DescipcionAux: any;

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
    if (this.psicometriaC.get('id').value !== '0') {
      this.Psicometria = this.psicometriaC.get('psicometria').value;
      this.Descripcion = this.psicometriaC.get('descripcion').value;
    } else {
      this.Edit = true;
    }
  }

  Save() {
    if (this.IdFormato != null) {
      const obj = {
        Index: this.index,
        isEdit: this.isActionEdit,
        id: this.psicometriaC.get('id').value || null,
        psicometria: this.psicometriaC.get('psicometria').value,
        descripcion: this.psicometriaC.get('descripcion').value,
        Usuario: this._setting.user.usuario,
        DAMFO290Id: this.IdFormato,
      };
      this.Psicometria = obj['psicometria'].toUpperCase();
      this.Descripcion = obj['descripcion'].toUpperCase();
      if (!this.isActionEdit) {
        obj['action'] = 'create';
        this._servicePerfilR.CrudPsicometriaCliente(obj).subscribe(x => {
          if (x !== 404) {
            if (x !== 300) {
              this.Registros.emit(obj);
              this.psicometriaC.controls['id'].setValue(x);
              this.Edit = false;
              this.functionCreateAlert('success', false);
            } else {
              this.functionCreateAlert('info', false);
            }
          } else {
            this.functionCreateAlert('error');
          }
        });
      } else {
        obj['action'] = 'update';
        this._servicePerfilR.CrudPsicometriaCliente(obj).subscribe(x => {
          if (x !== 404) {
            if (x !== 300) {
              this.Registros.emit(obj);
              this.Edit = false;
              this.isActionEdit = false;
              this.functionCreateAlert('success', true);
            } else {
              this.functionCreateAlert('info', false);
            }
          } else {
            this.functionCreateAlert('error');
          }
        });
      }
    } else {
      const data = {
        isEdit: this.isActionEdit,
        Index: this.index,
        psicometria: this.psicometriaC.get('psicometria').value,
        descripcion: this.psicometriaC.get('descripcion').value,
        UsuarioAlta: this._setting.user.usuario,
      };
      this.Psicometria = data['psicometria'].toUpperCase();
      this.Descripcion = data['descripcion'].toUpperCase();
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
    this.PsicometriaAux = this.Psicometria;
    this.DescipcionAux = this.Descripcion;
    this.psicometriaC.patchValue({
      psicometria: this.Psicometria,
      descripcion: this.Descripcion
    });
    this.isActionEdit = true;
  }

  Remove() {
    if (!this.isActionEdit) {
      this.remove.emit(this.index);
      this.Add.emit(false);
      if (this.IdFormato != null && this.psicometriaC.get('id').value != null) {
        const obj = {
          id: this.psicometriaC.get('id').value,
          action: 'delete'
        };
        this._servicePerfilR.CrudPsicometriaCliente(obj).subscribe(data => {
          if (data !== 404) {
            this.remove.emit(this.index);
            this.Add.emit(false);
          } else {
            this.functionCreateAlert('erro');
          }
        });
      }
    } else {
      this.Psicometria = this.PsicometriaAux;
      this.Descripcion = this.DescipcionAux;
      this.psicometriaC.patchValue({
        psicometria: this.Psicometria,
        descripcion: this.Descripcion
      });
      this.isActionEdit = false;
      this.Edit = false;
    }
  }

  functionCreateAlert(type, edit?: boolean) {
    this.ShowAlert = true;
    switch (type) {
      case 'success':
        if (edit) {
          this.MsgAlert = 'Se actualizo la Psicometría del Perfil de Reclutamiento.';
        } else {
          this.MsgAlert = 'Se agregó una nueva Psicometría el Perfil de Reclutamiento.';
        }
        this.TypeAlert = type;
        break;
      case 'error':
        this.MsgAlert = 'Algo salió mal, por favor intente de nuevo.';
        this.TypeAlert = 'danger';
        break;
      case 'info':
        this.MsgAlert = 'La Psicometría ya existe, intento con otro.';
        this.TypeAlert = type;
        break;
    }
    setTimeout(() => {
      this.ShowAlert = false;
    }, 3000);
  }

}
