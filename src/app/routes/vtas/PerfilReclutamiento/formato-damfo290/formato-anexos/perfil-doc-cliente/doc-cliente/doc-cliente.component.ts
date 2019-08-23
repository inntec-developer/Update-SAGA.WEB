import { AfterContentInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { PerfilReclutamientoService } from '../../../../../../../service/PerfilReclutamiento/perfil-reclutamiento.service';
import { SettingsService } from '../../../../../../../core/settings/settings.service';

@Component({
  selector: 'app-doc-cliente',
  templateUrl: './doc-cliente.component.html',
  styleUrls: ['./doc-cliente.component.scss']
})
export class DocClienteComponent implements OnInit, AfterContentInit {
  @Input('IdFormato') public IdFormato: any;
  @Input('documento') public documento: FormGroup;
  @Input('index') public index: number;
  @Output('remove') public remove = new EventEmitter();
  @Output('Add') public Add = new EventEmitter();
  @Output('Registros') public Registros = new EventEmitter();

  Documento: any;

  DocumentoAux: any;

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
    if (this.documento.get('id').value !== '0') {
      this.Documento = this.documento.get('documento').value;
    } else {
      this.Edit = true;
    }
  }

  Save() {
    if (this.IdFormato != null) {
      const obj = {
        Index: this.index,
        isEdit: this.isActionEdit,
        id: this.documento.get('id').value,
        Documento: this.documento.get('documento').value.toUpperCase(),
        Usuario: this._setting.user.usuario,
        DAMFO290Id: this.IdFormato
      };
      this.Documento = obj['Documento'];
      if (!this.isActionEdit) {
        obj['action'] = 'create';
        this._servicePerfilR.CrudDocumentos(obj).subscribe(x => {
          if (x !== 404) {
            this.Registros.emit(obj);
            this.documento.controls['id'].setValue(x);
            this.Edit = false;
            this.functionCreateAlert('success', false);
          } else {
            this.functionCreateAlert('error', false);
          }
        });
      } else {
        obj['action'] = 'update';
        this._servicePerfilR.CrudDocumentos(obj).subscribe(x => {
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
        Documento: this.documento.get('documento').value.toUpperCase(),
        UsuarioAlta: this._setting.user.usuario,
      };
      this.Documento = data['Documento'];
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
    this.DocumentoAux = this.Documento;
    this.documento.patchValue({
      documento: this.Documento
    });
    this.isActionEdit = true;
  }

  Remove() {
    if (!this.isActionEdit) {
      this.remove.emit(this.index);
      this.Add.emit(false);
      if (this.IdFormato != null && this.documento.get('id').value != null) {
        const obj = {
          id: this.documento.get('id').value,
          action: 'delete'
        };
        this._servicePerfilR.CrudDocumentos(obj).subscribe(data => {
          if (data !== 404) {
            this.remove.emit(false);
            this.Add.emit(false);
          } else {
            this.functionCreateAlert('error');
          }
        });
      }
    } else {
      this.Documento = this.DocumentoAux;
      this.documento.patchValue({
        documento: this.DocumentoAux
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
          this.MsgAlert = 'Se actualizo el documento adicional del Perfil de Reclutamiento.';
        } else {
          this.MsgAlert = 'Se agregó un nuevo documento adicional el Perfil de Reclutamiento.';
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
