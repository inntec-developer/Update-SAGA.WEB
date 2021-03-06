
import { AfterContentInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CatalogosService } from '../../../../../../../service';
import { FormGroup } from '@angular/forms';
import { PerfilReclutamientoService } from '../../../../../../../service/PerfilReclutamiento/perfil-reclutamiento.service';
import { SettingsService } from '../../../../../../../core/settings/settings.service';


@Component({
  selector: 'app-horarios-p',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.scss'],
  providers: [CatalogosService, PerfilReclutamientoService]
})
export class HorariosComponent implements OnInit, AfterContentInit {
  @Input('IdFormato') public IdFormato: any;
  @Input('horario') public horario: FormGroup;
  @Input('index') public index: number;
  @Output('remove') public remove = new EventEmitter();
  @Output('Add') public Add = new EventEmitter();
  @Output('Registros') public Registros = new EventEmitter();

  DiasSemana: any; // Get de la base de datos

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

  nombreAux: any;
  deDiaAux: any;
  aDiaAux: any;
  deDiaIdAux: any;
  aDiaIdAux: any;
  deHoraAux: any;
  aHoraAux: any;
  vacantesAux: any;
  especificacionesAux: any;
  activoAux: any;

  Edit = false;
  isActionEdit = false;
  ShowAlert = false;

  warn = 'warn';


  TypeAlert = '';
  MsgAlert = '';
  topHorarios: any;
  AuxOptions: any;
rowIndex: any;
  constructor(
    private _serviceCatalogos: CatalogosService,
    private _servicePerfilR: PerfilReclutamientoService,
    private _setting: SettingsService,
  ) {
    this.getCatalogos();
  }

  ngOnInit() {
    this.markFormGroupTouched(this.horario);
  }
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  ngAfterContentInit(): void {
    if (this.horario.get('id').value !== '0') {
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

  filter($event) {
    if ($event.keyCode !== 40 && $event.keyCode !== 38) {
      const filter = this.horario.get('horario').value;
      if (filter !== '' || filter != null && filter.length > 3) {
        this._servicePerfilR.getClientes(filter).subscribe(data => {
          if (data != null && data.length > 0 && data !== 404) {
            this.AuxOptions = this.topHorarios.filter(element => {
              return element['nombre'].toString().toLowerCase().match(filter.toString().toLowerCase());
            });
          }
        });
      } else if (filter === '') {
      }
    }
  }

  selected(event: any, rowIndex) {
    const select = event['option']['value'];
    const horario = this.AuxOptions.filter(element => {
      return element['nombre'].toString().toLowerCase().match(select.nombre.toString().toLowerCase())
      && element['deDia'].toString().toLowerCase().match(select.deDia.toString().toLowerCase()) &&
      element['aDia'].toString().toLowerCase().match(select.aDia.toString().toLowerCase()) &&
      element['deHora'].toString().toLowerCase().match(select.deHora.toString().toLowerCase()) &&
      element['aHora'].toString().toLowerCase().match(select.aHora.toString().toLowerCase());
    });
     this.horario.controls['horario'].setValue(horario[0]['nombre'].toUpperCase());
     this.horario.controls['deDiaId'].setValue(horario[0]['deDiaId']);
     this.horario.controls['aDiaId'].setValue(horario[0]['aDiaId']);


    this.nombre = horario[0]['nombre'];
    this.deDia = horario[0]['deDia'];
    this.aDia = horario[0]['aDia'];
    this.deDiaId = horario[0]['deDiaId'];
    this.aDiaId = horario[0]['aDiaId'];
    this.deHora =  horario[0]['deHora'];
    this.aHora =  horario[0]['aHora'];
    this.vacantes = 0;
    // this.OnEdit();
    let horasI = String(new Date(this.deHora).getHours());
    if (horasI.length === 1) {
      horasI = '0' + horasI;
    }
    let minutosI = String(new Date(this.deHora).getMinutes());
    if (minutosI.length === 1) {
      minutosI = '0' + minutosI;
    }
    const hourStart = horasI + ':' + minutosI;
    let horasF = String(new Date(this.aHora).getHours());
    if (horasF.length === 1) {
      horasF = '0' + horasF;
    }
    let minutosF = String(new Date(this.aHora).getMinutes());
    if (minutosF.length === 1) {
      minutosF = '0' + minutosF;
    }
    const hourEnd = horasF + ':' + minutosF;

    this.horario.patchValue({
      deHora: hourStart,
      aHora: hourEnd
    });

  }
  mocos($event) {

    const horaInicio = this.horario.get('deHora').value.split(':');
    const horaFinal = $event.target.value.split(':');

    const deHora = new Date(0, 0, 0, horaInicio[0], horaInicio[1], 0);
    const aHora = new Date(0, 0, 0, horaFinal[0], horaFinal[1], 0);

    if (horaInicio[0] < 12 && deHora > aHora) {
      this.horario.get('aHora').markAsUntouched();
      this.horario.get('aHora').reset();
    }
  }

  Save() {
    if (this.IdFormato != null) {
      this.getDeDia();
      this.getADia();
      const obj = {
        Index: this.index,
        isEdit: this.isActionEdit,
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
      };
      if (!this.isActionEdit) {
        obj['action'] = 'create';
        this._servicePerfilR.CrudHorarios(obj).subscribe(x => {
          if (x !== 404) {
            if (x !== 300) {
              this.Registros.emit(obj);
              const horaInicio = obj['deHora'].split(':');
              const horaFinal = obj['aHora'].split(':');
              this.horario.controls['id'].setValue(x);
              this.nombre = obj['nombre'];
              this.deDia = obj['deDia'];
              this.aDia = obj['aDia'];
              this.deDiaId = obj['deDiaId'];
              this.aDiaId = obj['aDiaId'];
              this.deHora = new Date(0, 0, 0, horaInicio[0], horaInicio[1], 0);
              this.aHora = new Date(0, 0, 0, horaFinal[0], horaFinal[1], 0);
              this.vacantes = obj['numeroVacantes'];
              this.especificaciones = obj['especificaciones'];
              this.activo = obj['activo'];
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
        this._servicePerfilR.CrudHorarios(obj).subscribe(x => {
          if (x !== 404) {
            if (x !== 300) {
              this.Registros.emit(obj);
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
      };
      const horariosIncio = data['deHora'].split(':');
      const horarioFinal = data['aHora'].split(':');
      this.nombre = data['nombre'].toUpperCase();
      this.deDia = data['deDia'];
      this.aDia = data['aDia'];
      this.deDiaId = data['deDiaId'];
      this.aDiaId = data['aDiaId'];
      this.deHora = new Date(0, 0, 0, horariosIncio[0], horariosIncio[1], 0);
      this.aHora = new Date(0, 0, 0, horarioFinal[0], horarioFinal[1], 0);
      this.vacantes = data['numeroVacantes'];
      this.especificaciones = data['especificaciones'].toUpperCase() || 'S/E';
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
    if (horasI.length === 1) {
      horasI = '0' + horasI;
    }
    let minutosI = String(new Date(this.deHora).getMinutes());
    if (minutosI.length === 1) {
      minutosI = '0' + minutosI;
    }
    const hourStart = horasI + ':' + minutosI;
    let horasF = String(new Date(this.aHora).getHours());
    if (horasF.length === 1) {
      horasF = '0' + horasF;
    }
    let minutosF = String(new Date(this.aHora).getMinutes());
    if (minutosF.length === 1) {
      minutosF = '0' + minutosF;
    }
    const hourEnd = horasF + ':' + minutosF;

    this.horario.patchValue({
      deHora: hourStart,
      aHora: hourEnd
    });
    this.nombreAux = this.nombre;
    this.deDiaAux = this.deDia;
    this.aDiaAux = this.aDia;
    this.deDiaIdAux = this.deDiaId;
    this.aDiaIdAux = this.aDiaId;
    this.deHoraAux = this.deHora;
    this.aHoraAux = this.aHora;
    this.vacantesAux = this.vacantes;
    this.especificacionesAux = this.especificaciones;
    this.isActionEdit = true;
  }

  getDeDia() {
    const index = this.DiasSemana.findIndex(x => x.id === this.horario.get('deDiaId').value);
    this.deDia = this.DiasSemana[index]['diaSemana'];
  }

  getADia() {
    const index = this.DiasSemana.findIndex(x => x.id === this.horario.get('aDiaId').value);
    this.aDia = this.DiasSemana[index]['diaSemana'];
  }

  Remove() {
    if (!this.isActionEdit) {
      this.remove.emit(this.index);
      this.Add.emit(false);
      if (this.IdFormato != null) {
        const obj = {
          id: this.horario.get('id').value,
          action: 'delete'
        };
        this._servicePerfilR.CrudHorarios(obj).subscribe(data => {
          if (data !== 404) {
            this.remove.emit(this.index);
            this.Add.emit(false);
          } else {
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
      this.DiasSemana = element.filter(x => x.tipo === 3);
      this._servicePerfilR.getTopHorarios().subscribe(result => {
        this.topHorarios = result;
      });
    });
  }


  functionCreateAlert(type: string, edit?: boolean) {
    this.ShowAlert = true;
    switch (type) {
      case 'success':
        if (edit) {
          this.MsgAlert = 'Se actualizo el horario del Perfil de Reclutamiento.';
        } else {
          this.MsgAlert = 'Se agregó un nuevo horario el Perfil de Reclutamiento.';
        }
        this.TypeAlert = type;

        break;
      case 'error':
        this.TypeAlert = 'danger';
        this.MsgAlert = 'Algo salió mal, por favor intente de nuevo.';
        break;
      case 'info':
        this.TypeAlert = type;
        this.MsgAlert = 'El nombre del horarios ya existe, intento con otro.';
        break;
    }
    setTimeout(() => {
      this.ShowAlert = false;
    }, 3000);
  }


}
