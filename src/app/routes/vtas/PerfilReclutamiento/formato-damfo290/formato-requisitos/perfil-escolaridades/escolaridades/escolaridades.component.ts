import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CatalogosService } from './../../../../../../../service/catalogos/catalogos.service';
import { FormGroup } from '@angular/forms';
import { PerfilReclutamientoService } from './../../../../../../../service/PerfilReclutamiento/perfil-reclutamiento.service';
import { SettingsService } from '../../../../../../../core/settings/settings.service';

@Component({
  selector: 'escolaridades',
  templateUrl: './escolaridades.component.html',
  styleUrls: ['./escolaridades.component.scss'],
  providers: [CatalogosService, PerfilReclutamientoService]
})
export class EscolaridadesComponent implements OnInit {
  @Input('IdFormato') public IdFormato: any;
  @Input('group') public escolaridad: FormGroup;
  @Input('Index') public index: number;
  @Output('Remove') public remove = new EventEmitter();
  @Output('Add') public Add = new EventEmitter();
  @Output('Registros') public Registros = new EventEmitter();

  Escolaridad: any;
  Nivel: any;
  EscolaridadAux: any;
  NivelAux: any;

  Edit: boolean = false;
  isActionEdit: boolean = false;
  ShowAlert: boolean = false;

  Escolaridades: any;
  Niveles: any;

  TypeAlert: string = '';
  MsgAlert: string = '';

  constructor(
    private _serviceCatalogos: CatalogosService,
    private _servicePerfilR: PerfilReclutamientoService,
    private _setting: SettingsService,
  ) {
    this.getCatalogos();
  }

  ngOnInit() {
  }

  Save() {
    if (this.IdFormato != null) {
      var obj = {
        id: this.escolaridad.get('id').value || null,
        escolaridadId: this.escolaridad.get('escolaridadId').value,
        estadoEstudioId: this.escolaridad.get('nivelId').value,
        Usuario: this._setting.user.usuario,
        DAMFO290Id: this.IdFormato
      }
      if (!this.isActionEdit) {
        this._servicePerfilR.addEscolaridad(obj).subscribe(x => {
          if (x != 404) {
            this.escolaridad.controls['id'].setValue(x);
            this.Edit = false;
            this.functionCreateAlert('success', false);
          } else {
            this.functionCreateAlert('error');
          }
        });
      }
      else {
        this._servicePerfilR.editEscolaridad(obj).subscribe(x => {
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
        escolaridadId: this.escolaridad.get('escolaridadId').value,
        estadoEstudioId: this.escolaridad.get('nivelId').value,
      }
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

  getCatalogos() {
    this._serviceCatalogos.getCatalogoForId(34).subscribe(element => {
      this.Escolaridades = element;
      // let escolaridad = this.escolaridad.get('escolaridadId').value;
    });
    this._serviceCatalogos.getCatalogoForId(45).subscribe(element => {
      this.Niveles = element;
      // let nivel = this.escolaridad.get('nivelId').value;
    });
  }

  ngAfterContentInit() {
    if (this.escolaridad.get('id').value != 0) {
      this.Escolaridad = this.escolaridad.get('escolaridad').value;
      this.Nivel = this.escolaridad.get('nivel').value;
    } else {
      this.Edit = true;
    }
  }

  getEscolaridad() {
    let index = this.Escolaridades.findIndex(x => x.id == this.escolaridad.get('escolaridadId').value);
    this.Escolaridad = this.Escolaridades[index]['gradoEstudio']
  }
  getNivel() {
    let index = this.Niveles.findIndex(x => x.id == this.escolaridad.get('nivelId').value);
    this.Nivel = this.Niveles[index]['nivel']
  }

  OnEdit() {
    this.EscolaridadAux = this.Escolaridad;
    this.NivelAux = this.Nivel
    this.isActionEdit = true;
  }


  Remove() {
    if (!this.isActionEdit) {
      this.remove.emit(this.index);
      this.Add.emit(false);
      if (this.IdFormato != null && this.escolaridad.get('id').value != null) {
        var obj = {
          id: this.escolaridad.get('id').value
        }
        this._servicePerfilR.deleteEscolaridad(obj).subscribe(data => {
          if (data != 404) {
            this.remove.emit(this.index);
            this.Add.emit(false);
          }
          else {
            this.functionCreateAlert('erro');
          }
        });
      }
    } else {
      this.Escolaridad = this.EscolaridadAux;
      this.Nivel = this.NivelAux;
      this.isActionEdit = false;
      this.Edit = false;
    }

  }

  functionCreateAlert(type: string, edit?: boolean) {
    this.ShowAlert = true;
    switch (type) {
      case 'success':
        if (edit) {
          this.MsgAlert = 'Se actualizo la escolaridad del Perfil de Reclutamiento.'
        }
        else {
          this.MsgAlert = 'Se agregó una nueva escolaridad el Perfil de Reclutamiento.'
        }
        this.TypeAlert = type;

        break;
      case 'error':
        this.TypeAlert = type;
        this.MsgAlert = 'Algo salió mal, por favor intente de nuevo.'
        break;
      case 'info':
        this.TypeAlert = type;
        this.MsgAlert = 'La escolaridad se elimno correctamente.'
        break;
    }
    setTimeout(() => {
      this.ShowAlert = false;
    }, 3000);
  }

  //#region  CREACION DE Alerta

  //#endregion

}
