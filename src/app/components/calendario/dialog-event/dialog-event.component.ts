import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { CatalogosService } from './../../../service/index';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dialog-event',
  templateUrl: './dialog-event.component.html',
  styleUrls: ['./dialog-event.component.scss'],
  providers: [CatalogosService,
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    DatePipe
  ]
})
export class DialogEventComponent implements OnInit {
  // Variables de Formulario
  public formEvent: FormGroup;
  public fb: FormBuilder;
  // Variables Globales
  public loading: boolean;
  public color: string;
  public ColorPicker: string;
  public allDaySelected: boolean;
  public minDate:any;
  public minLimitDate: any;
  public SeletedDayC: any;
  public Actividades: any;
  // public evnt = {
  //   titulo: '',
  //   inicio: null,
  //   final: null,
  //   color: null,
  //   horaInicio: null,
  //   horaFinal: null,
  //   descripcion: '',
  // }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _catalogotService: CatalogosService,
    private dialogEvent: MatDialogRef<DialogEventComponent>,
    private dateParse: DatePipe,
    private toasterService: ToasterService,
  ) {
    dialogEvent.disableClose = true;
    this.formEvent = new FormGroup({
      Actividad: new FormControl('', [Validators.required]),
      Titulo: new FormControl('', [Validators.required]),
      Inicio: new FormControl('', [Validators.required]),
      Fin: new FormControl('', [Validators.required]),
      HoraInicio: new FormControl('', [Validators.required]),
      HoraFin: new FormControl('', [Validators.required]),
      // AllDay: new FormControl(),
      Descripcion: new FormControl(''),
      Color: new FormControl('')
    });

  }

  ngOnInit() {
    var DateNow = new Date();
    this.minDate = DateNow;
    this.ColorPicker = '#4290ff'
    this.SeletedDayC = this.data;
    this.minLimitDate = this.SeletedDayC;
    this.loading = false;
    this._GetActivdadesReclutador();
    // this.formEvent = this.fb.group({
    //   Titulo: [{ value: '' }, Validators.required],
    //   Inicio: [{ value: this.SeletedDayC }, Validators.required],
    //   Fin: [{ value: '' }, Validators.required],
    //   HoraInicio: [{ value: '' }],
    //   HoraFin: [{ value: '' }],
    //   AllDay: [false],
    //   Descripcion: [{ value: '' }],
    // });
  }

  // ngAfterViewInit(): void {
  //   //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
  //   //Add 'implements AfterViewInit' to the class.
  //   // this.formEvent = this.fb.group({
  //   //   HoraInicio: [{ value: '6:00' }],
  //   //   HoraFin: [{ value: '18:00' }]
  //   // });
  // }
  public _CheckNuevaFecha() {
    this.minLimitDate = this.formEvent.get('Inicio').value;
  }

  public _CheckAllDay() {
    this.allDaySelected = this.formEvent.get('AllDay').value;
  }

  onCloseDialog() {
    this.dialogEvent.close(false);
  }
  onCloseDialogInfo() {
    this.loading = true;
    var dateInicio = new Date(this.formEvent.get('Inicio').value);
    var dateFinal = new Date(this.formEvent.get('Fin').value);

    var ds = dateInicio.getUTCDate(),
      ms = dateInicio.getMonth(),
      ys = dateInicio.getFullYear();
    var de = dateFinal.getUTCDate(),
      me = dateFinal.getMonth(),
      ye = dateFinal.getFullYear();

    var Inicio: String,
      Final: string,
      hourStart: Array<any> = [],
      hourEnd: Array<any> = [];

    if (!this.allDaySelected) {
      hourStart = this.formEvent.get('HoraInicio').value.split(":");
      hourEnd = this.formEvent.get('HoraFin').value.split(":");
      var hrs = parseInt(hourStart[0]);
      var mns = parseInt(hourStart[1]);
      var hre = parseInt(hourEnd[0]);
      var mne = parseInt(hourEnd[1]);
      if (hre < hrs) {
        this.popToast('warning', 'Calendario', 'La hora Final no debe ser menor a la hora Inicio.');
        this.loading = false;
        return;
      }
      let DInicio = new Date(ys, ms, ds).setUTCHours(hrs);
      DInicio = new Date(DInicio).setMinutes(mns);
      Inicio = new Date(DInicio).toUTCString();
      let DFinal = new Date(ye, me, de).setUTCHours(hre);
      DFinal = new Date(DFinal).setUTCMinutes(mne);
      Final = new Date(DFinal).toUTCString();
      // Inicio = new Date(ys, ms, ds , Number(hrs), Number(mns)).toJSON();
      // Final = new Date(ye, me, de , Number(hre), Number(mne)).toJSON();
    } else {
      // Inicio = new Date(ys, ms, ds, 0, 0).toJSON();
      // Final = new Date(ye, me, de, 0, 0).toJSON();
    }
    var data = {
      entidadId: sessionStorage.getItem('id'),
      TipoActividadId: this.formEvent.get('Actividad').value,
      title: this.formEvent.get('Titulo').value,
      start: Inicio,
      end: Final,
      allDay: this.allDaySelected,
      message: this.formEvent.get('Descripcion').value || 'Sin Descripción',
      backgroundColor: this.ColorPicker,
      borderColor: this.ColorPicker,
    }
    this.dialogEvent.close(data);
  }

  private _GetActivdadesReclutador() {
    this._catalogotService.getActividadesReclutador().subscribe(result => {
      this.Actividades = result;
    })
  }

  /*
 * Creacion de mensajes
 * */
  toaster: any;
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right',
    limit: 7, tapToDismiss: false,
    showCloseButton: true,
    mouseoverTimerStop: true,
  });
  popToast(type: any, title: any, body: any) {
    var toast: Toast = {
      type: type,
      title: title,
      timeout: 5000,
      body: body
    }
    this.toasterService.pop(toast);
  }
}
