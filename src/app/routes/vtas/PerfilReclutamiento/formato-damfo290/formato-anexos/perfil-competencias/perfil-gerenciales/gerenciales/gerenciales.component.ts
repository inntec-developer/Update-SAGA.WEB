import { AfterContentInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CatalogosService } from '../../../../../../../../service';
import { FormGroup } from '@angular/forms';
import { PerfilReclutamientoService } from '../../../../../../../../service/PerfilReclutamiento/perfil-reclutamiento.service';
import { SettingsService } from '../../../../../../../../core/settings/settings.service';

@Component({
  selector: 'app-gerenciales-p',
  templateUrl: './gerenciales.component.html',
  styleUrls: ['./gerenciales.component.scss'],
  providers: [CatalogosService, PerfilReclutamientoService]
})
export class GerencialesComponent implements OnInit, AfterContentInit {
  @Input('IdFormato') public IdFormato: any;
  @Input('competencia') public competencia: FormGroup;
  @Input('index') public index: number;
  @Output('remove') public remove = new EventEmitter();
  @Output('Add') public Add = new EventEmitter();
  @Output('Registros') public Registros = new EventEmitter();

  CompetenciaId: any;
  CompetenciaIdAux: any;

  Competencia: any;
  Nivel: any;
  CompetenciaAux: any;
  NivelAux: any;

  Edit = false;
  isActionEdit = false;
  ShowAlert = false;

  Competencias: any;
  Niveles = [
    { nivel: 'A' },
    { nivel: 'B' },
    { nivel: 'C' },
    { nivel: 'D' },
    { nivel: 'NO APLICA' }
  ];

  TypeAlert = '';
  MsgAlert = '';

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
      const obj = {
        Idex: this.index,
        isEdit: this.isActionEdit,
        id: this.competencia.get('id').value || null,
        CompetenciaId: this.competencia.get('competenciaId').value,
        Nivel: this.competencia.get('nivel').value,
        Usuario: this._setting.user.usuario,
        DAMFO290Id: this.IdFormato
      };
      obj['action'] = 'create';
      if (!this.isActionEdit) {
        this._servicePerfilR.CrudCompGerenciales(obj).subscribe(x => {
          if (x !== 404) {
            if (x !== 300) {
              this.Registros.emit(obj);
              this.competencia.controls['id'].setValue(x);
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
        this._servicePerfilR.CrudCompGerenciales(obj).subscribe(x => {
          if (x !== 404) {
            if (x !== 300) {
              this.Registros.emit(obj);
              this.Edit = false;
              this.isActionEdit = false;
              this.functionCreateAlert('success', true);
            } else {
              this.functionCreateAlert('info', true);
            }
          } else {
            this.functionCreateAlert('error');
          }
        });
      }
    } else {
      const data = {
        isEdit: this.isActionEdit,
        index: this.index,
        CompetenciaId: this.competencia.get('competenciaId').value,
        Nivel: this.competencia.get('nivel').value,
      };
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
    this._serviceCatalogos.getCatalogoForId(49).subscribe(element => {
      this.Competencias = element;
    });
  }

  ngAfterContentInit() {
    if (this.competencia.get('id').value !== '0') {
      this.CompetenciaId = this.competencia.get('competenciaId').value;
      this.Competencia = this.competencia.get('competencia').value;
      this.Nivel = this.competencia.get('nivel').value;
    } else {
      this.Edit = true;
    }
  }

  getCompetencia() {
    const index = this.Competencias.findIndex(x => x.id === this.competencia.get('competenciaId').value);
    this.CompetenciaIdAux = this.competencia.get('competenciaId').value;
    this.Competencia = this.Competencias[index]['competencia'];
  }
  getNivel() {
    this.Nivel = this.competencia.get('nivel').value;
  }

  OnEdit() {
    this.CompetenciaIdAux = this.CompetenciaId;
    this.CompetenciaIdAux = this.CompetenciaId;
    this.CompetenciaAux = this.Competencia;
    this.NivelAux = this.Nivel;
    this.isActionEdit = true;
  }

  Remove() {
    if (!this.isActionEdit) {
      this.remove.emit(this.index);
      this.Add.emit(false);
      if (this.IdFormato != null && this.competencia.get('id').value != null) {
        const obj = {
          id: this.competencia.get('id').value
        };
        obj['action'] = 'delete';
        this._servicePerfilR.CrudCompGerenciales(obj).subscribe(data => {
          if (data !== 404) {
            this.remove.emit(this.index);
            this.Add.emit(false);
          } else {
            this.functionCreateAlert('erro');
          }
        });
      }
    } else {
      this.Competencia = this.CompetenciaAux;
      this.Nivel = this.NivelAux;
      this.CompetenciaId = this.CompetenciaIdAux;
      this.competencia.controls['competenciaId'].setValue(this.CompetenciaIdAux);
      this.isActionEdit = false;
      this.Edit = false;
    }
  }

  functionCreateAlert(type: string, edit?: boolean) {
    this.ShowAlert = true;
    switch (type) {
      case 'success':
        if (edit) {
          this.MsgAlert = 'Se actualizo la competecia del Perfil de Reclutamiento.';
        } else {
          this.MsgAlert = 'Se agregó una nueva competecia el Perfil de Reclutamiento.';
        }
        this.TypeAlert = type;

        break;
      case 'error':
        this.TypeAlert = 'danger';
        this.MsgAlert = 'Algo salió mal, por favor intente de nuevo.';
        break;
      case 'info':
        this.TypeAlert = type;
        this.MsgAlert = 'La competecia ya existe, intente con otra';
        break;
    }
    setTimeout(() => {
      this.ShowAlert = false;
    }, 3000);
  }
}
