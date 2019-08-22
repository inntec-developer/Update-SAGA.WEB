import { AfterContentInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CatalogosService } from '../../../../../../../service';
import { FormGroup } from '@angular/forms';
import { PerfilReclutamientoService } from '../../../../../../../service/PerfilReclutamiento/perfil-reclutamiento.service';
import { SettingsService } from '../../../../../../../core/settings/settings.service';

@Component({
  selector: 'app-pst-damsa',
  templateUrl: './pst-damsa.component.html',
  styleUrls: ['./pst-damsa.component.scss'],
  providers: [CatalogosService, PerfilReclutamientoService]
})
export class PstDamsaComponent implements OnInit, AfterContentInit {
  @Input('IdFormato') public IdFormato: any;
  @Input('psicometria') public psicometria: FormGroup;
  @Input('index') public index: number;
  @Output('remove') public remove = new EventEmitter();
  @Output('Add') public Add = new EventEmitter();
  @Output('Registros') public Registros = new EventEmitter();

  Psicometrias: any;

  PsicometriaId: any;
  Psicometria: any;
  Descripcion: any;

  PsicometriaIdAux: any;
  PsicometriaAux: any;
  DescipcionAux: any;

  Edit = false;
  isActionEdit = false;
  ShowAlert = false;


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

  ngAfterContentInit(): void {
    if (this.psicometria.get('id').value !== '0') {
      this.Psicometria = this.psicometria.get('psicometria').value;
      this.Descripcion = this.psicometria.get('descripcion').value;
      this.PsicometriaId = this.psicometria.get('psicometriaId').value;
    } else {
      this.Edit = true;
    }
  }

  Save() {
    if (this.IdFormato != null) {
      const obj = {
        id: this.psicometria.get('id').value || null,
        psicometriaId: this.psicometria.get('psicometriaId').value,
        Usuario: this._setting.user.usuario,
        DAMFO290Id: this.IdFormato,
      };
      this.PsicometriaId = obj['psicometriaId'];
      if (!this.isActionEdit) {
        obj['action'] = 'create';
        this._servicePerfilR.CrudPsicometriaDamsa(obj).subscribe(x => {
          if (x !== 404) {
            if (x !== 300) {
              this.psicometria.controls['id'].setValue(x);
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
        this._servicePerfilR.CrudPsicometriaDamsa(obj).subscribe(x => {
          if (x !== 404) {
            if (x !== 300) {
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
        psicometriaId: this.psicometria.get('psicometriaId').value,
        UsuarioAlta: this._setting.user.usuario,
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

  OnEdit() {
    this.PsicometriaAux = this.Psicometria;
    this.DescipcionAux = this.Descripcion;
    this.PsicometriaIdAux = this.PsicometriaId;
    this.psicometria.patchValue({
      psicometriaId: this.PsicometriaId,
      descripcion: this.Descripcion
    });
    this.isActionEdit = true;
  }

  getPsicometria() {
    const index = this.Psicometrias.findIndex(x => x.id === this.psicometria.get('psicometriaId').value);
    this.PsicometriaId = this.psicometria.get('psicometriaId').value;
    this.Psicometria = this.Psicometrias[index]['tipoPsicometria'];
    this.Descripcion = this.Psicometrias[index]['descripcion'];
    this.psicometria.patchValue({
      descripcion: this.Descripcion
    });
  }

  Remove() {
    if (!this.isActionEdit) {
      this.remove.emit(this.index);
      this.Add.emit(false);
      if (this.IdFormato != null && this.psicometria.get('id').value != null) {
        const obj = {
          id: this.psicometria.get('id').value,
          action: 'delete'
        };
        this._servicePerfilR.CrudPsicometriaDamsa(obj).subscribe(data => {
          if (data !== 404) {
            this.remove.emit(this.index);
            this.Add.emit(false);
          } else {
            this.functionCreateAlert('erro');
          }
        });
      }
    } else {
      this.PsicometriaId = this.PsicometriaIdAux;
      this.Psicometria = this.PsicometriaAux;
      this.Descripcion = this.DescipcionAux;
      this.psicometria.patchValue({
        psicometriaId: this.PsicometriaId,
        descripcion: this.Descripcion
      });
      this.isActionEdit = false;
      this.Edit = false;
    }
  }

  getCatalogos() {
    this._serviceCatalogos.getCatalogoForId(22).subscribe(element => {
      this.Psicometrias = element;
    });
  }

  functionCreateAlert(type: string, edit?: boolean) {
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
