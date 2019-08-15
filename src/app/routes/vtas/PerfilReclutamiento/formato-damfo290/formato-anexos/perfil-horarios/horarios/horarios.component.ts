import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CatalogosService } from '../../../../../../../service';
import { FormGroup } from '@angular/forms';
import { PerfilReclutamientoService } from '../../../../../../../service/PerfilReclutamiento/perfil-reclutamiento.service';
import { SettingsService } from '../../../../../../../core/settings/settings.service';
import { detectChanges } from '@angular/core/src/render3';

@Component({
  selector: 'horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.scss'],
  providers: [CatalogosService, PerfilReclutamientoService]
})
export class HorariosComponent implements OnInit {
  @Input('IdFormato') public IdFormato: any;
  @Input('group') public horario: FormGroup;
  @Input('Index') public index: number;
  @Output('Remove') public remove = new EventEmitter();
  @Output('Add') public Add = new EventEmitter();
  @Output('Registros') public Registros = new EventEmitter();

  DiasSemana: any; //Get de la base de datos

  nombre: any;
  deDia: any;
  aDia: any;
  deDiaId: any;
  aDiaId: any;
  deHora: any;
  aHora: any;
  vacantes: any;
  especificaciones: any;
  activo: any;

  nombreAux: any
  deDiaAux: any;
  aDiaAux: any;
  deDiaIdAux: any;
  aDiaIdAux: any;
  deHoraAux: any;
  aHoraAux: any;
  vacantesAux: any;
  especificacionesAux: any;
  activoAux: any;

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
    if (this.horario.get('id').value != 0) {
      this.nombre = this.horario.get('horario').value;
      this.deDia = this.horario.get('deDia').value;
      this.aDia = this.horario.get('aDia').value;
      this.deDiaId = this.horario.get('deDiaId').value;
      this.aDiaId = this.horario.get('aDiaId').value;
      this.deHora = this.horario.get('deHora').value;
      this.aHora = this.horario.get('aHora').value;
      this.vacantes = this.horario.get('vacantes').value;
      this.especificaciones = this.horario.get('especificaciones').value || 'S/E';
      this.activo = this.horario.get('activo').value;
    } else {
      this.Edit = true;
    }
  }

  Save() {
    if (this.IdFormato != null) {
      this.getDeDia();
      this.getADia();
      var obj = {
        id: this.horario.get('id').value || null,
        nombre: this.horario.get('horario').value,
        deDia: this.deDia,
        aDia: this.aDia,
        deDiaId: this.horario.get('deDiaId').value,
        aDiaid: this.horario.get('aDiaId').value,
        deHora: this.horario.get('deHora').value,
        aHora: this.horario.get('aHora').value,
        numeroVacantes: this.horario.get('vacantes').value,
        especificaciones: this.horario.get('especificaciones').value || 'S/E',
        activo: this.horario.get('activo').value,
        Usuario: this._setting.user.usuario,
        DAMFO290Id: this.IdFormato,
      }
      if (!this.isActionEdit) {
        obj['action'] = 'create';
        this._servicePerfilR.CrudHorarios(obj).subscribe(x => {
          if (x != 404) {
            if (x != 300) {
              var hStar = obj['deHora'].split(":");
              var hEnd = obj['aHora'].split(":");
              this.horario.controls['id'].setValue(x);
              this.nombre = obj['nombre'];
              this.deDia = obj['deDia'];
              this.aDia = obj['aDia'];
              this.deDiaId = obj['deDiaId'];
              this.aDiaId = obj['aDiaId'];
              this.deHora = new Date(0, 0, 0, hStar[0], hStar[1], 0);
              this.aHora = new Date(0, 0, 0, hEnd[0], hEnd[1], 0);
              this.vacantes = obj['numeroVacantes'];
              this.especificaciones = obj['especificaciones'];
              this.activo = obj['activo'];
              this.Edit = false;
              this.functionCreateAlert('success', false);
            }
            else {
              this.functionCreateAlert('info', false);
            }
          } else {
            this.functionCreateAlert('error');
          }
        });
      }
      else {
        obj['action'] = 'update';
        this._servicePerfilR.CrudHorarios(obj).subscribe(x => {
          if (x != 404) {
            if (x != 300) {
              this.nombre = x['nombre'];
              this.deDia = x['deDia']['diaSemana'];
              this.aDia = x['aDia']['diaSemana'];
              this.deDiaId = x['deDiaId'];
              this.aDiaId = x['aDiaId'];
              this.deHora = x['deHora'];
              this.aHora = x['aHora'];
              this.vacantes = x['numeroVacantes'];
              this.especificaciones = x['especificaciones'];
              this.activo = x['activo'];
              this.Edit = false;
              this.isActionEdit = false;
              this.functionCreateAlert('success', true);
            }
            else {
              this.functionCreateAlert('info', false);
            }
          } else {
            this.functionCreateAlert('error');
          }
        });
      }
    }
    else {
      var data = {
        id: this.horario.get('id').value || null,
        nombre: this.horario.get('horario').value,
        deDia: this.deDia,
        aDia: this.aDia,
        deDiaId: this.horario.get('deDiaId').value,
        aDiaId: this.horario.get('aDiaId').value,
        deHora: this.horario.get('deHora').value,
        aHora: this.horario.get('aHora').value,
        numeroVacantes: this.horario.get('vacantes').value,
        especificaciones: this.horario.get('especificaciones').value || 'S/E',
        activo: this.horario.get('activo').value,
        Usuario: this._setting.user.usuario,
        DAMFO290Id: this.IdFormato,
      }
      var hStar = data['deHora'].split(":");
      var hEnd = data['aHora'].split(":");
      this.nombre = data['nombre'];
      this.deDia = data['deDia'];
      this.aDia = data['aDia'];
      this.deDiaId = data['deDiaId'];
      this.aDiaId = data['aDiaId'];
      this.deHora = new Date(0, 0, 0, hStar[0], hStar[1], 0);
      this.aHora = new Date(0, 0, 0, hEnd[0], hEnd[1], 0);
      this.vacantes = data['numeroVacantes'];
      this.especificaciones = data['especificaciones'] || 'S/E';
      this.activo = data['activo'];
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
    let horasI = String(new Date(this.deHora).getHours());
    if (horasI.length == 1)
      horasI = '0' + horasI;
    let minutosI = String(new Date(this.deHora).getMinutes());
    if (minutosI.length == 1)
      minutosI = '0' + minutosI;
    let hourStart = horasI + ':' + minutosI;

    let horasF = String(new Date(this.aHora).getHours());
    if (horasF.length == 1)
      horasF = '0' + horasF
    let minutosF = String(new Date(this.aHora).getMinutes());
    if (minutosF.length == 1)
      minutosF = '0' + minutosF
    let hourEnd = horasF + ':' + minutosF

    this.horario.patchValue({
      deHora: hourStart,
      aHora: hourEnd
    })
    this.nombreAux = this.nombre;
    this.deDiaAux = this.deDia;
    this.aDiaAux = this.aDia;
    this.deDiaIdAux = this.deDiaId;
    this.aDiaIdAux = this.aDiaId;
    this.deHoraAux = this.deHora
    this.aHoraAux = this.aHora;
    this.vacantesAux = this.vacantes;
    this.especificacionesAux = this.especificaciones;
    this.isActionEdit = true;
  }

  getDeDia() {
    let index = this.DiasSemana.findIndex(x => x.id == this.horario.get('deDiaId').value);
    this.deDia = this.DiasSemana[index]['diaSemana'];
  }

  getADia() {
    let index = this.DiasSemana.findIndex(x => x.id == this.horario.get('aDiaId').value);
    this.aDia = this.DiasSemana[index]['diaSemana'];
  }

  Remove() {
    if (!this.isActionEdit) {
      this.remove.emit(this.index);
      this.Add.emit(false);
      if (this.IdFormato != null) {
        var obj = {
          id: this.horario.get('id').value,
          action: 'delete'
        }
        this._servicePerfilR.CrudHorarios(obj).subscribe(data => {
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
      this.nombre = this.nombreAux;
      this.deDia = this.deDiaAux;
      this.aDia = this.aDiaAux;
      this.deDiaId = this.deDiaIdAux;
      this.aDiaId = this.aDiaIdAux;
      this.deHora = this.deHoraAux;
      this.aHora = this.aHoraAux;
      this.vacantes = this.vacantesAux;
      this.especificaciones = this.especificacionesAux;
      this.isActionEdit = false;
      this.Edit = false;
    }

  }

  getCatalogos() {
    this._serviceCatalogos.getCatalogoForId(23).subscribe(element => {
      this.DiasSemana = element;
    });
  }


  functionCreateAlert(type: string, edit?: boolean) {
    this.ShowAlert = true;
    switch (type) {
      case 'success':
        if (edit) {
          this.MsgAlert = 'Se actualizo el horario del Perfil de Reclutamiento.'
        }
        else {
          this.MsgAlert = 'Se agregó un nuevo horario el Perfil de Reclutamiento.'
        }
        this.TypeAlert = type;

        break;
      case 'error':
        this.TypeAlert = type;
        this.MsgAlert = 'Algo salió mal, por favor intente de nuevo.'
        break;
      case 'info':
        this.TypeAlert = type;
        this.MsgAlert = 'El nombre del horarios ya existe, intento con otro.'
        break;
    }
    setTimeout(() => {
      this.ShowAlert = false;
    }, 3000);
  }


}
