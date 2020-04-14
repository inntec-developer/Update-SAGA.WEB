// import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { CatalogosService, ComponentsService } from './../../../service/index';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { DatePipe } from '@angular/common';
import { DialogEventComponent } from '../dialog-event/dialog-event.component';
import { EventoCalendario } from './../../../models/vtas/Requisicion';
// import { MatDialog } from '@angular/material/dialog';
import { SettingsService } from '../../../core/settings/settings.service';
import { MatDialog } from '@angular/material/dialog';


declare var $: any;
const swal = require('sweetalert');
@Component({
  selector: 'app-calendario-candidato',
  templateUrl: './calendario-candidato.component.html',
  styleUrls: ['./calendario-candidato.component.scss'],
  providers: [ComponentsService, CatalogosService, EventoCalendario,
    { provide: MAT_DATE_LOCALE, useValue: 'es' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }, DatePipe
  ]
})
export class CalendarioCandidatoComponent implements OnInit {
  // Formulario para edición del Evento en Calendario.

  dateStart: any;
  dateEnd: any;

  public getEventoCalendar: Array<any>;

  public formEvent: FormGroup;
  public fb: FormBuilder;
  /* * Variables * */
  private minDate = new Date();

  public EventSelected: boolean;
  public EditEventAction = false;
  public $calendar: any;
  public calendarEvents: Array<any> = null;
  public selectedEvent = null;
  public minLimitDate: any;
  public allDaySelected: any;
  public hourStart = '12:00';
  public hourEnd = '14:00';
  public ReclutadorId: string;
  public touch = true;
  public toDay: Date;
  public start = new Date();
  /* * Reference to the calendar element * */
  @ViewChild('fullcalendar') fullcalendar: ElementRef;
  /* * Configuracion del de la vista del calendario * */
  calendarOptions: any = {
    // isRTL: true,
    timezone: 'America/Mexico_City',
    timeZoneImpl: 'UTC-coercion',
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril',
      'Mayo', 'Junio', 'Julio', 'Agosto',
      'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ],
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    noEventsMessage: 'No hay eventos para mostrar',
    locale: 'es',
    defaultView: 'month',
    visibleRange: { start: new Date(this.start.getFullYear(), this.start.getMonth(), this.start.getDate(), 0, 0) },
    eventLimit: 7,
    eventLimitText: 'Más',
    height: 300,
    contentHeight: 400,
    // editable: true,
    droppable: false,
    eventClick: this.eventClick.bind(this),
    dayClick: this.dayClick.bind(this),
    getEventsById: this,
    header: { // Información de encabezado del calendario
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay,listWeek, basicWeek'
    },
    buttonIcons: { // note the space at the beginning
      prev: ' fa fa-caret-left',
      next: ' fa fa-caret-right',
      prevYear: 'fa-angle-double-left',
      nextYear: 'fa-angle-double-right'
    },
    buttonText: { //  Texto de botones para visualizacion de calendario
      today: 'Hoy',
      month: 'Mes',
      week: 'Semana',
      day: 'Día',
      list: 'Lista',
      basicWeek: 'Básico'
    },
  };
  updateIndex: any;
  loading: boolean;
  ColorPicker: any;
  IdEvent: any;
  selectedDate: any;
  NotDateCalendar: boolean;
  Actividades: any;
  textValueActividad = '';
  Pendiente: boolean;
  Pendientes: any[];
  Hoy: any[];
  Siguientes: any[];




  constructor(
    private dialog: MatDialog,
    private eventoCalendario: EventoCalendario,
    private componenteService: ComponentsService,
    private _catalogotService: CatalogosService,
    private toasterService: ToasterService,
    private dateParse: DatePipe,
    private settings: SettingsService
  ) {
    this.ReclutadorId = this.settings.user['id'];
    this.getEvent();
    setTimeout(() => {
      this.formEvent = new FormGroup({
        Actividad: new FormControl('', [Validators.required]),
        Titulo: new FormControl('', Validators.required),
        Inicio: new FormControl('', Validators.required),
        Fin: new FormControl(''),
        HoraInicio: new FormControl('', Validators.required),
        HoraFin: new FormControl('', Validators.required),
        Descripcion: new FormControl('', Validators.maxLength(500)),
      });
    }, 1000);
  }

  ngOnInit() {
    this.toDay = new Date();
    this.EventSelected = false;
    this._GetActivdadesReclutador();
  }

  eventClick(calEvent: any, jsEvent: any, view: any) {
    this.EventSelected = true;
    this.EditEventAction = false;
    this.textValueActividad = calEvent.actividad;
    this.selectedEvent = {
      id: calEvent.id,
      entidadId: calEvent.entidadId,
      actividad: calEvent.actividad,
      tipoActividadId: calEvent.tipoActividadId,
      title: calEvent.title,
      start: calEvent.start.toJSON(),
      end: calEvent.end == null ? calEvent.start.toJSON() : calEvent.end.toJSON(),
      message: calEvent.message || 'Sin Descripción',
      allDay: calEvent.allDay,
      backgroundColor: calEvent.backgroundColor,
      borderColor: calEvent.borderColor,
      activo: calEvent.activo
    };
    if (new Date(this.selectedEvent.start) > this.toDay) {
      this.Pendiente = false;
    } else {
      this.Pendiente = true;
    }
  }

  dayClick(date, jsEvent, view) {
    this.selectedDate = date.toJSON();
    const hoy = new Date();
    const dia = hoy.getDate();
    const mes = hoy.getMonth();
    const anio = hoy.getFullYear();
    const fecha_actual = String(anio + '-' + (mes + 1) + '-' + dia);
    const DateNow = new Date(fecha_actual);
    const select = new Date(this.selectedDate);
    const sdia = select.getDate();
    const smes = select.getMonth();
    const sanio = select.getFullYear();
    const selected = String(sanio + '-' + (smes + 1) + '-' + (sdia + 1));
    const compare = new Date(selected);

    if (compare < DateNow) {
      this.popToast('warning', 'Calendario', 'No se permite agregar eventos con fechas menor del día actual');
      return;
    }
    this.selectedEvent = null;
    this.openDialogEvent(this.selectedDate);
  }

  getEvent() {
    this.componenteService.getCalendarEvent(this.ReclutadorId).subscribe(result => {
      if (result.length > 0) {
        this.getEventoCalendar = result;
        this.calendarEvents = result;
        this.calendarOptions.events = this.calendarEvents;
        this.$calendar = $(this.fullcalendar.nativeElement);
        this.$calendar.fullCalendar(this.calendarOptions);
        this.NotDateCalendar = false;
        this._Actividades();
      } else {
        this.popToast('warning', 'Calendario', 'No cuenta con evento para mostrar en el calendario.');
        this.NotDateCalendar = true;
      }
    });
  }

  addEvent(event: any) {
    const VerificarFechaInicio = new Date(event.start);
    const d = VerificarFechaInicio.getUTCDate();
    if (d === 1) {
      const m = VerificarFechaInicio.getUTCMonth();
      if (m === 11) {
        const y = VerificarFechaInicio.getUTCFullYear();
        VerificarFechaInicio.setUTCMonth(0);
        VerificarFechaInicio.setUTCFullYear(y + 1);
      } else {
        VerificarFechaInicio.setUTCMonth(m + 1);
      }
      event.start = VerificarFechaInicio;
    }
    this.componenteService
      .addCalendarEvent(event)
      .subscribe(result => {
        if (result === 200) {
          this.componenteService.getCalendarEvent(this.ReclutadorId).subscribe(x => {
            if (x.length > 0) {
              if (this.calendarEvents === null) {
                this.getEventoCalendar = x;
                this.calendarEvents = x;
                this.calendarOptions.events = this.calendarEvents;
                this.$calendar = $(this.fullcalendar.nativeElement);
                this.$calendar.fullCalendar(this.calendarOptions);
                this.NotDateCalendar = false;
                this.popToast('success', 'Calendario', 'Se agregó correctamente el evento en el calendario.');
                this._Actividades();
              } else {
                this.EventSelected = false;
                this.getEventoCalendar = x;
                this.calendarEvents = x;
                this.$calendar.fullCalendar('removeEvents');
                this.$calendar.fullCalendar('addEventSource', this.calendarEvents);
                this.popToast('success', 'Calendario', 'Se agregó correctamente el evento en el calendario.');
                this._Actividades();
              }
            } else {
              this.popToast('error', 'Calendario', 'Se produjo en error al recuparar la información de los eventos.');
            }
          });
        }
        if (result === 404) {
          this.popToast('error', 'Calendario', 'Ocurrio un error al intentar agregar el nuevo evento en el calendario.');
        }
      });
  }

  // ngOnDestroy() {
  //   this.$calendar.fullCalendar('destroy')
  // }


  openDialogEvent(date: any) {
    const dialogEvent = this.dialog.open(DialogEventComponent, {
      width: 'auto',
      height: 'auto',
      data: date
    });
    dialogEvent.afterClosed().subscribe(result => {
      if (result !== false) {
        this.addEvent(result);
      } else {
        this.popToast('info', 'Calendario', 'No se afectó el calendario.');
      }
    });
  }

  openDialogEventB() {
    const dialogEvent = this.dialog.open(DialogEventComponent, {
      width: 'auto',
      height: 'auto',
      data: new Date()
    });
    dialogEvent.afterClosed().subscribe(result => {
      if (result !== false) {
        this.componenteService
          .addCalendarEvent(result)
          .subscribe(data => {
            if (data === 200) {
              this.componenteService.getCalendarEvent(this.ReclutadorId).subscribe(x => {
                if (x.length > 0) {
                  if (this.calendarEvents == null) {
                    this.getEventoCalendar = x;
                    this.calendarEvents = x;
                    this.calendarOptions.events = this.calendarEvents;
                    this.$calendar = $(this.fullcalendar.nativeElement);
                    this.$calendar.fullCalendar(this.calendarOptions);
                    this.NotDateCalendar = false;
                    this.popToast('success', 'Calendario', 'Se agregó correctamente el evento en el calendario.');
                    this._Actividades();
                  } else {
                    this.EventSelected = false;
                    this.getEventoCalendar = x;
                    this.calendarEvents = x;
                    this.$calendar.fullCalendar('removeEvents');
                    this.$calendar.fullCalendar('addEventSource', this.calendarEvents);
                    this.popToast('success', 'Calendario', 'Se agregó correctamente el evento en el calendario.');
                    this._Actividades();
                  }
                } else {
                  this.popToast('error', 'Calendario', 'Se produjo en error al recuparar la información de los eventos.');
                }
              });
            }
            if (data === 404) {
              this.popToast('error', 'Calendario', 'Ocurrio un error al intentar agregar el nuevo evento en el calendario.');
            }
          });
      } else {
        this.popToast('info', 'Calendario', 'No se afectó el calendario.');
      }
    });
  }

  public EditEvent(data: any) {
    this.IdEvent = data.id;
    this.EditEventAction = true;
    this.ColorPicker = data.borderColor;

    let horasI = String(new Date(data.start).getHours());
    if (horasI.length === 1) {
      horasI = '0' + horasI;
    }
    let minutosI = String(new Date(data.start).getMinutes());
    if (minutosI.length === 1) {
      minutosI = '0' + minutosI;
    }
    this.hourStart = horasI + ':' + minutosI;

    let horasF = String(new Date(data.end).getHours());
    if (horasF.length === 1) {
      horasF = '0' + horasF;
    }
    let minutosF = String(new Date(data.end).getMinutes());
    if (minutosF.length === 1) {
      minutosF = '0' + minutosF;
    }
    this.hourEnd = horasF + ':' + minutosF;

    this.dateStart = new Date(data.start),
      this.dateEnd = new Date(data.end),

      this.formEvent.patchValue({
        Actividad: data.tipoActividadId,
        Titulo: data.title,
        Inicio: new Date(data.start),
        Fin: new Date(data.end),
        AllDay: data.allDay,
        Descripcion: data.message,
        HoraInicio: this.hourStart,
        HoraFin: this.hourEnd,
      });
    this.allDaySelected = false;
  }

  private CancelareditEvent() {
    this.EditEventAction = false;
  }

  // private _CheckAllDay() {
  //   this.allDaySelected = this.formEvent.get('AllDay').value;
  //   this.allDaySelected = this.allDaySelected.toISOString();
  // }

  public DeleteEvent(data: any) {
    this.componenteService.deleteCalendarEvent(data)
      .subscribe(result => {
        if (result === 200) {
          const deleteEvent = this.getEventoCalendar.findIndex(x => x.id === data.id);
          this.getEventoCalendar.splice(deleteEvent, 1);
          this.calendarEvents = this.getEventoCalendar;
          this.$calendar.fullCalendar('removeEvents');
          this.$calendar.fullCalendar('addEventSource', this.calendarEvents);
          this.popToast('success', 'Calendario', 'Se eliminó correctamente el Evento.');
          swal('Eliminada', '', 'success');
          this.selectedEvent = null;
          this._Actividades();
        }
        if (result === 404) {
          this.popToast('error', 'Calenario', 'Ups!! No se puedo Eliminar el evento intanta de nuevo.');
        }
      });
  }

  public CulminarEvent(data: any) {
    this.componenteService.culminarElement(data.id)
      .subscribe(result => {
        if (result === 200) {
          this.updateIndex = this.getEventoCalendar.findIndex(event => event.id === data.id);
          this.getEventoCalendar[this.updateIndex]['activo'] = false;
          this.calendarEvents == this.getEventoCalendar;
          this.$calendar.fullCalendar('removeEvents');
          // Agrega la información actualizada al calendario sin la necesaridad de llamar el servicio Get.
          this.$calendar.fullCalendar('addEventSource', this.calendarEvents);
          this.popToast('success', 'Calendario', 'Se actualizó correctamente el evento en el calendario.');
          this.selectedEvent = this.getEventoCalendar[this.updateIndex];
          swal('Culminado', '', 'success');
          this._Actividades();

        }
      });
  }

  private _Actividades() {
    const toDay = new Date();
    const compare = new Date(toDay.getFullYear(), toDay.getMonth(), toDay.getDate(), 0, 0)
    this.Pendientes = this.calendarEvents.filter(event =>
      new Date(new Date(event.start).getFullYear(), new Date(event.start).getMonth(),
      new Date(event.start).getDate(), 0, 0) < compare && event.activo === true);
    this.Hoy = this.calendarEvents.filter(event => {
      const DateCompare = new Date(new Date(event.start).getFullYear(),
      new Date(event.start).getMonth(), new Date(event.start).getDate(), 0, 0);
      if (String(DateCompare) === String(compare) && event.activo === true){
        return event;
      }
    });
    this.Siguientes = this.calendarEvents.filter(event =>
      new Date(new Date(event.start).getFullYear(), new Date(event.start).getMonth(), new Date(event.start).getDate(), 0, 0) > compare && event.activo === true);
  }

  private Save() {
    this.loading = true;
    this.updateIndex = this.getEventoCalendar.findIndex(event => event.id === this.IdEvent)
    let dateInicio = this.formEvent.get('Inicio').value as Date;
    let dateFinal = this.formEvent.get('Fin').value as Date || dateInicio;
    dateInicio = new Date(dateInicio as Date);
    dateFinal = new Date(dateFinal as Date);

    const ds = dateInicio.getDate(),
      ms = dateInicio.getMonth(),
      ys = dateInicio.getFullYear();
    const de = dateFinal.getDate(),
      me = dateFinal.getMonth(),
      ye = dateFinal.getFullYear();

    let Inicio = new Date(),
      Final = new Date(),
      InicioD: string,
      FinalD: string,
      hourStart: Array<string> = [],
      hourEnd: Array<string> = [];

    if (!this.allDaySelected) {
      hourStart = this.formEvent.get('HoraInicio').value.split(":");
      hourEnd = this.formEvent.get('HoraFin').value.split(":");
      var hrs = parseInt(hourStart[0]);
      var mns = parseInt(hourStart[1]);
      var hre = parseInt(hourEnd[0]);
      var mne = parseInt(hourEnd[1]);
      let DInicio = new Date(ys, ms, ds).setUTCHours(hrs);
      DInicio = new Date(DInicio).setMinutes(mns);
      InicioD = new Date(DInicio).toJSON();
      let DFinal = new Date(ye, me, de).setUTCHours(hre);
      DFinal = new Date(DFinal).setUTCMinutes(mne);
      FinalD = new Date(DFinal).toJSON();
      Inicio = new Date(ys, ms, ds, hrs, mns);
      Final = new Date(ye, me, de, hre, mne);
    } else {
      // Inicio = new Date(ys, ms, ds, 0, 0);
      // Final = new Date(ye, me, de, 0, 0);
    }
    if (Inicio < Final) {
      this.popToast('warning', 'Calendario', 'La fecha Final no debe ser mayor a la fecha Inicio.');
      this.loading = false;
      return;
    }
    if (hre < hrs) {
      this.popToast('warning', 'Calendario', 'La hora Final no debe ser menor a la hora Inicio.');
      this.loading = false;
      return;
    }

    this.getEventoCalendar[this.updateIndex]['actividad'] = this.textValueActividad;
    this.getEventoCalendar[this.updateIndex]['tipoActividadId'] = this.formEvent.get('Actividad').value;
    this.getEventoCalendar[this.updateIndex]['title'] = this.formEvent.get('Titulo').value;
    this.getEventoCalendar[this.updateIndex]['start'] = Inicio;
    this.getEventoCalendar[this.updateIndex]['end'] = Final;
    this.getEventoCalendar[this.updateIndex]['allDay'] = this.allDaySelected;
    this.getEventoCalendar[this.updateIndex]['message'] = this.formEvent.get('Descripcion').value || 'Sin Descripción';
    this.getEventoCalendar[this.updateIndex]['backgroundColor'] = this.ColorPicker;
    this.getEventoCalendar[this.updateIndex]['borderColor'] = this.ColorPicker;
    this.calendarEvents = this.getEventoCalendar;
    var newDate = {
      id: this.getEventoCalendar[this.updateIndex]['id'],
      entidadId: this.getEventoCalendar[this.updateIndex]['entidadId'],
      tipoActividadId: this.formEvent.get('Actividad').value,
      title: this.formEvent.get('Titulo').value,
      start: InicioD,
      end: FinalD,
      allDay: this.allDaySelected,
      message: this.formEvent.get('Descripcion').value || 'Sin Descripción',
      backgroundColor: this.ColorPicker,
      borderColor: this.ColorPicker
    }



    this.componenteService.updateCalendarEvent(newDate).subscribe(result => {
      if (result === 200) {
        // Elimina la informacion del calnedario para posterioemente cargarlo con la nueva información
        this.$calendar.fullCalendar('removeEvents');
        // Agrega la información actualizada al calendario sin la necesaridad de llamar el servicio Get.
        this.$calendar.fullCalendar('addEventSource', this.calendarEvents);
        this.popToast('success', 'Calendario', 'Se actualizó correctamente el evento en el calendario.');
        this.loading = false;
        this.EditEventAction = false;
        this.selectedClick(this.getEventoCalendar[this.updateIndex]);
        this._Actividades();
      }
      if (result === 404) {
        this.popToast('error', 'Calendario', 'Ocurrió un error al actualizar el evento.' +
        'Si el problema persiste favor de notificarlo a sistemas.');
      }
    })

  }
  /*
  * Calcular la fecha minima de fecha final
  */

  private _GetActivdadesReclutador() {
    this._catalogotService.getActividadesReclutador().subscribe(result => {
      this.Actividades = result;
    })
  }

  private selected(event: any) {
    this.textValueActividad = this.Actividades[event - 1].actividad;
  }

  selectedClick(data) {
    this.EventSelected = true;
    this.EditEventAction = false;
    this.textValueActividad = data.actividad;
    this.selectedEvent = {
      id: data.id,
      entidadId: data.entidadId,
      actividad: data.actividad,
      tipoActividadId: data.tipoActividadId,
      title: data.title,
      start: data.start,
      end: data.end,
      message: data.message || 'Sin Descripción',
      allDay: data.allDay,
      backgroundColor: data.backgroundColor,
      borderColor: data.borderColor,
      activo: data.activo
    };
    if (new Date(this.selectedEvent.start) > this.toDay) {
      this.Pendiente = false;
    }
    else {
      this.Pendiente = true;
    }
  }

  /*
 * Creacion de mensajes
 * */
  public toaster: any;
  public toasterConfig: any;
  public toasterconfig: ToasterConfig = new ToasterConfig({
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
