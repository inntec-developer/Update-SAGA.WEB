import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CatalogosService } from '../../../../../../../service';
import { FormGroup } from '@angular/forms';
import { PerfilReclutamientoService } from '../../../../../../../service/PerfilReclutamiento/perfil-reclutamiento.service';
import { SettingsService } from '../../../../../../../core/settings/settings.service';

@Component({
  selector: 'beneficios',
  templateUrl: './beneficios.component.html',
  styleUrls: ['./beneficios.component.scss'],
  providers: [CatalogosService, PerfilReclutamientoService]
})
export class BeneficiosComponent implements OnInit {
  @Input('IdFormato') public IdFormato: any;
  @Input('group') public beneficio: FormGroup;
  @Input('Index') public index: number;
  @Output('Remove') public remove = new EventEmitter();
  @Output('Add') public Add = new EventEmitter();
  @Output('Registros') public Registros = new EventEmitter();

  TiposBeneficios: any; //Get de la base de datos

  TipoBeneficio: any
  Cantidad: any;
  Observaciones: any;

  TipoBeneficioAux: any;
  CantidadAux: any;
  ObservacionesAux: any;

  Edit: boolean = false;
  isActionEdit: boolean = false;
  ShowAlert: boolean = false;


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

  ngAfterContentInit(): void {
    if (this.beneficio.get('id').value != 0) {
      this.TipoBeneficio = this.beneficio.get('tipoBeneficio').value;
      this.Cantidad = this.beneficio.get('cantidad').value;
      this.Observaciones = this.beneficio.get('observaciones').value;
    } else {
      this.Edit = true;
    }
  }

  Save() {
    if (this.IdFormato != null) {
      var obj = {
        id: this.beneficio.get('id').value || null,
        tipoBeneficioId: this.beneficio.get('tipoBeneficioId').value,
        cantidad: this.beneficio.get('cantidadId').value,
        observaciones: this.beneficio.get('observacionesId').value,
        Usuario: this._setting.user.usuario,
        DAMFO290Id: this.IdFormato,
      }
      this.Cantidad = obj['cantidad'];
      this.Observaciones = obj['observaciones'];
      if (!this.isActionEdit) {
        obj['action'] = 'create';
        this._servicePerfilR.CrudBeneficio(obj).subscribe(x => {
          if (x != 404) {
            this.beneficio.controls['id'].setValue(x);
            this.Edit = false;
            this.functionCreateAlert('success', false);
          } else {
            this.functionCreateAlert('error');
          }
        });
      }
      else {
        obj['action'] = 'update';
        this._servicePerfilR.CrudBeneficio(obj).subscribe(x => {
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
        tipoBeneficioId: this.beneficio.get('tipoBeneficioId').value,
        cantidad: this.beneficio.get('cantidadId').value,
        observaciones: this.beneficio.get('observacionesId').value || 'S/R',
        UsuarioAlta: this._setting.user.usuario,
      }
      this.Cantidad = data['cantidad'];
      this.Observaciones = data['observaciones'];
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
    this.beneficio.controls['cantidadId'].setValue(this.Cantidad);
    this.beneficio.controls['observacionesId'].setValue(this.Observaciones);

    this.TipoBeneficioAux = this.TipoBeneficio;
    this.CantidadAux = this.Cantidad;
    this.ObservacionesAux = this.Observaciones;
    this.isActionEdit = true;
  }

  getTipoBeneficio() {
    let index = this.TiposBeneficios.findIndex(x => x.id == this.beneficio.get('tipoBeneficioId').value);
    this.TipoBeneficio = this.TiposBeneficios[index]['tipoBeneficio'];
  }

  Remove() {
    if (!this.isActionEdit) {
      this.remove.emit(this.index);
      this.Add.emit(false);
      if (this.IdFormato != null && this.beneficio.get('id').value != null) {
        var obj = {
          id: this.beneficio.get('id').value,
          action: 'delete'
        }
        this._servicePerfilR.CrudBeneficio(obj).subscribe(data => {
          if (data != 404) {
            this.remove.emit(this.index);
            this.Add.emit(false);
          } else {
            this.functionCreateAlert('erro');
          }
        });
      }
    } else {
      this.TipoBeneficio = this.TipoBeneficioAux;
      this.Cantidad = this.CantidadAux;
      this.Observaciones = this.ObservacionesAux || 'S/R';
      this.isActionEdit = false;
      this.Edit = false;
    }

  }

  getCatalogos() {
    this._serviceCatalogos.getCatalogoForId(27).subscribe(element => {
      this.TiposBeneficios = element;
    });
  }

  functionCreateAlert(type: string, edit?: boolean) {
    this.ShowAlert = true;
    switch (type) {
      case 'success':
        if (edit) {
          this.MsgAlert = 'Se actualizo el beneficio del Perfil de Reclutamiento.'
        }
        else {
          this.MsgAlert = 'Se agregó un nuevo beneficio el Perfil de Reclutamiento.'
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
