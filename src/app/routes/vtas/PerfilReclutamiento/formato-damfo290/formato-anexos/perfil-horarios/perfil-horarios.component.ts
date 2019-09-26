import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { SettingsService } from '../../../../../../core/settings/settings.service';
import { ToasterService, ToasterConfig, Toast } from 'angular2-toaster';

@Component({
  selector: 'app-perfil-horarios',
  templateUrl: './perfil-horarios.component.html',
  styleUrls: ['./perfil-horarios.component.scss']
})
export class PerfilHorariosComponent implements OnInit, OnChanges {
  @Input() IdFormato: any;
  @Input() Horarios: any[];
  @Output() HorariosEmt = new EventEmitter();
  HorariosNew = [];

  esNuevo = true;
  private Add: boolean;

  // public formEscolaridades: FormGroup;
  public HorarioArray: FormGroup;
  public horario: any;

  // CREACION DE MENSAJES
  toaster: any;
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right',
    limit: 7, tapToDismiss: false,
    showCloseButton: true,
    mouseoverTimerStop: true,
  });

  constructor(
    private _settings: SettingsService,
    private fb: FormBuilder,
    private toasterService: ToasterService,
  ) { }

  ngOnInit() {
    this.IdFormato = this.IdFormato || null;
    this.HorarioArray = this.fb.group({
      horario: this.fb.array([])
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.IdFormato != null) {
      this.esNuevo = false;
      if (this.Horarios.length > 0) {
        this.HorariosNew = this.Horarios;
        this.PopulateForm(this.Horarios);
      }
    }
  }

  private PopulateForm(horario: any[]) {
    horario.forEach(x => {
      this.AddHorario(1);
    });
    this.HorarioArray.patchValue({
      horario: this.Horarios,
    });
  }

  AddHorario(Horario?: any) {
    if (this.Add) {
      this.Add = true;
      return;
    } else {
      Horario > 0 ? this.Add = false : this.Add = true;
      const control = <FormArray>this.HorarioArray.controls['horario'];
      const addrCtrl = this.initHorario();
      control.push(addrCtrl);
    }
  }

  initHorario() {
    return this.fb.group({
      id: ['0'],
      deDia: [],
      aDia: [],
      nombre: [],
      horario: ['', Validators.required],
      deDiaId: ['', Validators.required],
      aDiaId: ['', Validators.required],
      deHora: ['', Validators.required],
      aHora: ['', Validators.required],
      vacantes: ['', [Validators.required, Validators.min(1)]],
      especificaciones: [''],
      activo: [true]
    });
  }

  Agregar(Value: boolean) {
    this.Add = false;
  }

  getRegistros(data: any) {
    if (!data['isEdit']) {
      let create = true;
      if (this.HorariosNew.length > 0) {
        this.HorariosNew.find(x => {
          if (x['nombre'] === data['nombre']) {
            return create = false;
          }
        });
      }
      if (create) {
        this.HorariosNew.push({
          Index: data['Index'],
          id: data['id'],
          nombre: data['nombre'].toUpperCase(),
          deDiaId: data['deDiaId'],
          aDiaId: data['aDiaId'],
          deHora: data['deHora'],
          aHora: data['aHora'],
          numeroVacantes: data['numeroVacantes'],
          especificaciones: data['especificaciones'].toUpperCase(),
          activo: data['activo'],
          UsuarioAlta: data['Usuario']
        });
      } else {
        this.removeHorario(data['Index']);
        this.popToast('info', 'Horarios', 'El horarios ya existe, intente con otra.');
        this.AddHorario();
      }

    } else {
      let edit = true;
      this.HorariosNew.find(x => {
        if (x['nombre'] === data['nombre'] && x['Index'] !== data['Index']) {
          return edit = false;
        }
      });
      if (edit) {
        const editRegistro = {
          Index: data['Index'],
          id: data['id'],
          nombre: data['nombre'].toUpperCase(),
          deDiaId: data['deDiaId'],
          aDiaId: data['aDiaId'],
          deHora: data['deHora'],
          aHora: data['aHora'],
          numeroVacantes: data['vacantes'],
          especificaciones: data['especificaciones'].toUpperCase(),
          activo: data['activo'],
          UsuarioAlta: data['Usuario']
        };
        this.HorariosNew[data['Index']] = editRegistro;
      } else {
        this.removeHorario(data['Index']);
        this.popToast('info', 'Horarios', 'El horarios ya existe, intente con otra.');
        this.AddHorario();
      }

    }
    this.HorariosEmt.emit(this.HorariosNew);
  }

  removeHorario(i: number) {
    const control = <FormArray>this.HorarioArray.controls['horario'];
    control.removeAt(i);
    this.HorariosNew.splice(i, 1);
    this.HorariosEmt.emit(this.HorariosNew);
  }
  popToast(type: any, title: any, body: any) {
    const toast: Toast = {
      type: type,
      title: title,
      timeout: 5000,
      body: body
    };
    this.toasterService.pop(toast);
  }
}
