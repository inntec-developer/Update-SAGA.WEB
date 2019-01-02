import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { CatalogosService, ComponentsService } from './../../../service/index';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { DatePipe } from '@angular/common';
import { DialogEventComponent } from '../dialog-event/dialog-event.component';
import { EventoCalendario } from './../../../models/vtas/Requisicion';
import { MatDialog } from '@angular/material';
import { getMonth } from 'ngx-bootstrap/chronos';
import { toDate } from '@angular/common/src/i18n/format_date';

declare var $: any;
const swal = require('sweetalert');
@Component({
  selector: 'app-calendario-candidato',
  templateUrl: './calendario-candidato.component.html',
  styleUrls: ['./calendario-candidato.component.scss'],
  providers: [ComponentsService, CatalogosService, EventoCalendario,
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }, DatePipe
  ]
})
export class CalendarioCandidatoComponent implements OnInit {
  //Formulario para edición del Evento en Calendario.

  public getEventoCalendar: Array<any>;

  public formEvent: FormGroup;
  public fb: FormBuilder;
  /* * Variables * */
  private StartDate: any;
  public modalRef: BsModalRef;
  public EventSelected: boolean;
  public EditEventAction: boolean = false;
  public $calendar: any;
  public calendarEvents: Array<any> = this.getEventoCalendar;
  public selectedEvent = null;
  public minLimitDate: any;
  public allDaySelected: any;
  public hourStart: string = '12:00';
  public hourEnd: string = '14:00';
  public ReclutadorId: string;
  public touch: boolean = true;
  public toDay: Date;
  /* * Reference to the calendar element * */
  @ViewChild('fullcalendar') fullcalendar: ElementRef;


  /* * Configuracion del de la vista del calendario * */
  calendarOptions: any = {
    // isRTL: true,
    timezone: "America/Mexico_City",
    timeZoneImpl: 'UTC-coercion',
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    noEventsMessage: "No hay eventos para mostrar",
    locale: 'es',
    defaultView: 'month',
    eventLimit: 5,
    eventLimitText: 'Más',
    height: 300,
    contentHeight: 400,
    //editable: true,
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
      basicWeek: 'Basico'
    },
  };
  updateIndex: any;
  loading: boolean;
  ColorPicker: any;
  IdEvent: any;
  selectedDate: any;
  NotDateCalendar: boolean;
  Actividades: any;
  textValueActividad: string = '';
  Pendiente: boolean;
  Pendientes: any[];
  Hoy: any[];
  Siguientes: any[];




  constructor(
    private modalService: BsModalService,
    private dialog: MatDialog,
    private eventoCalendario: EventoCalendario,
    private componenteService: ComponentsService,
    private _catalogotService: CatalogosService,
    private toasterService: ToasterService,
    private dateParse: DatePipe
  ) {
    this.ReclutadorId = sessionStorage.getItem('id');
    this.getEvent();
    setTimeout(() => {
      this.formEvent = new FormGroup({
        Actividad: new FormControl('', [Validators.required]),
        Titulo: new FormControl('', Validators.required),
        Inicio: new FormControl('', Validators.required),
        Fin: new FormControl(''),
        HoraInicio: new FormControl('', Validators.required),
        HoraFin: new FormControl('', Validators.required),
        //AllDay: new FormControl(),
        Descripcion: new FormControl('', Validators.maxLength(500)),
      });
    }, 1000);
  }

  ngOnInit() {
    this.toDay = new Date();
    this.EventSelected = false;
    this._GetActivdadesReclutador();
  }

  // ngAfterViewInit() {
  //   this.$calendar.fullCalendar(this.calendarOptions);
  // }

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
      start: calEvent.start,
      end: calEvent.end == null ? calEvent.start : calEvent.end,
      message: calEvent.message || 'Sin Descripción',
      allDay: calEvent.allDay,
      backgroundColor: calEvent.backgroundColor,
      borderColor: calEvent.borderColor,
      activo: calEvent.activo
    };
    if (new Date(this.selectedEvent.start) > this.toDay) {
      this.Pendiente = false;
    }
    else {
      this.Pendiente = true;
    }
    this.StartDate = this.dateParse.transform(calEvent.start.toJSON(), 'yyyy/MM/dd');
  }

  dayClick(date, jsEvent, view) {
    this.selectedDate = date.toJSON();
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
      }
      else {
        this.popToast('warning', 'Calendario', 'No cuenta con evento para mostrar en el calendario.');
        this.NotDateCalendar = true;
      }
    });
  }

  addEvent(event: any) {
    this.componenteService
      .addCalendarEvent(event)
      .subscribe(result => {
        if (result == 200) {
          this.componenteService.getCalendarEvent(this.ReclutadorId).subscribe(result => {
            if (result.length > 0) {
              this.EventSelected = false;
              this.getEventoCalendar = result;
              this.calendarEvents = result;
              this.$calendar.fullCalendar('removeEvents');
              this.$calendar.fullCalendar('addEventSource', this.calendarEvents);
              this.popToast('success', 'Calendario', 'Se agrego correctamente el evento en el calendario.');
              this._Actividades();
            }
            else {
              this.popToast('error', 'Calendario', 'Se produjo en error al recuparar la información de los eventos.');
            }
          })
        }
        if (result == 404) {
          this.popToast('error', 'Calendario', 'Ocurrio un error al intentar agregar el nuevo evento en el calendario.');
        }
      });
  }

  // ngOnDestroy() {
  //   this.$calendar.fullCalendar('destroy')
  // }


  openDialogEvent(date: any) {
    let dialogEvent = this.dialog.open(DialogEventComponent, {
      width: 'auto',
      height: 'auto',
      data: date
    })
    dialogEvent.afterClosed().subscribe(result => {
      if (result != false) {
        this.addEvent(result);
      } else {
        this.popToast('info', 'Calendario', 'No se afecto el calendario.');
      }
    });
  }

  openDialogEventB() {
    let dialogEvent = this.dialog.open(DialogEventComponent, {
      width: 'auto',
      height: 'auto',
      data: new Date()
    })
    dialogEvent.afterClosed().subscribe(result => {
      if (result != false) {
        this.componenteService
          .addCalendarEvent(result)
          .subscribe(result => {
            if (result == 200) {
              this.componenteService.getCalendarEvent(this.ReclutadorId).subscribe(result => {
                if (result.length > 0) {
                  this.getEventoCalendar = result;
                  this.calendarEvents = result;
                  this.calendarOptions.events = this.calendarEvents;
                  this.$calendar = $(this.fullcalendar.nativeElement);
                  this.$calendar.fullCalendar(this.calendarOptions);
                  this.NotDateCalendar = false;
                  this.popToast('success', 'Calendario', 'Se agrego correctamente el evento en el calendario.');
                }
                else {
                  this.popToast('error', 'Calendario', 'Se produjo en error al recuparar la información de los eventos.');
                }
              })
            }
            if (result == 404) {
              this.popToast('error', 'Calendario', 'Ocurrio un error al intentar agregar el nuevo evento en el calendario.');
            }
          });
      } else {
        this.popToast('info', 'Calendario', 'No se afecto el calendario.');
      }
    });
  }

  public EditEvent(data: any) {
    this.IdEvent = data.id;
    this.EditEventAction = true;
    this.ColorPicker = data.borderColor;

    let horasI = String(new Date(data.start).getHours());
    if (horasI.length == 1)
      horasI = '0' + horasI;
    let minutosI = String(new Date(data.start).getMinutes());
    if (minutosI.length == 1)
      minutosI = '0' + minutosI;
    this.hourStart = horasI + ':' + minutosI;

    let horasF = String(new Date(data.end).getHours());
    if (horasF.length == 1)
      horasF = '0' + horasF
    let minutosF = String(new Date(data.end).getMinutes());
    if (minutosF.length == 1)
      minutosF = '0' + minutosF
    this.hourEnd = horasF + ':' + minutosF

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
    setTimeout(() => {
      this.StartDate = this.formEvent.get('Inicio').value;
    }, 500);
    this.allDaySelected = false;
  }

  private CancelareditEvent() {
    this.EditEventAction = false;
  }

  // private _CheckAllDay() {
  //   this.allDaySelected = this.formEvent.get('AllDay').value;
  //   this.allDaySelected = this.allDaySelected.toISOString();
  // }

  private DeleteEvent(data: any) {
    this.componenteService.deleteCalendarEvent(data)
      .subscribe(result => {
        if (result == 200) {
          var deleteEvent = this.getEventoCalendar.findIndex(x => x.id === data.id);
          this.getEventoCalendar.splice(deleteEvent, 1);
          this.calendarEvents = this.getEventoCalendar;
          this.$calendar.fullCalendar('removeEvents');
          this.$calendar.fullCalendar('addEventSource', this.calendarEvents);
          this.popToast('success', 'Calendario', 'Se elimino corectamente el Evento.');
          swal('Eliminada', '', 'success');
          this.selectedEvent = null;
          this._Actividades();
        }
        if (result == 404) {
          this.popToast('error', 'Calenario', 'Ups!! No se puedo Eliminar el evento intanta de nuevo.');
        }
      });
  }

  private CulminarEvent(data: any) {
    this.componenteService.culminarElement(data.id)
      .subscribe(result => {
        if (result == 200) {
          this.updateIndex = this.getEventoCalendar.findIndex(event => event.id === data.id)
          this.getEventoCalendar[this.updateIndex]['activo'] = false;
          this.calendarEvents == this.getEventoCalendar;
          this.$calendar.fullCalendar('removeEvents');
          // Agrega la información actualizada al calendario sin la necesaridad de llamar el servicio Get. 
          this.$calendar.fullCalendar('addEventSource', this.calendarEvents);
          this.popToast('success', 'Calendario', 'Se actualizo correctamente el evento en el calendario.');
          this.selectedEvent = this.getEventoCalendar[this.updateIndex];
          swal('Culminado', '', 'success');
          this._Actividades();

        }
      });
  }

  private _Actividades() {
    let toDay = new Date();
    let compare = new Date(toDay.getFullYear(), toDay.getMonth(), toDay.getUTCDate(), 0, 0)
    this.Pendientes = this.calendarEvents.filter(event => 
      new Date(new Date(event.start).getFullYear(), new Date(event.start).getMonth(), new Date(event.start).getUTCDate(), 0, 0) < compare && event.activo === true);
    this.Hoy = this.calendarEvents.filter(event => 
     String(new Date(new Date(event.start).getFullYear(), new Date(event.start).getMonth(), new Date(event.start).getUTCDate(), 0, 0)) == String(compare) && event.activo === true);
    this.Siguientes = this.calendarEvents.filter(event => 
      new Date(new Date(event.start).getFullYear(), new Date(event.start).getMonth(), new Date(event.start).getUTCDate(), 0, 0) > compare && event.activo === true);
  }

  private Save() {
    this.loading = true;
    this.updateIndex = this.getEventoCalendar.findIndex(event => event.id === this.IdEvent)
    var dateInicio = new Date(this.formEvent.get('Inicio').value);
    var dateFinal = new Date(this.formEvent.get('Fin').value) || dateInicio;

    var ds = dateInicio.getUTCDate(),
      ms = dateInicio.getMonth(),
      ys = dateInicio.getFullYear();
    var de = dateFinal.getUTCDate(),
      me = dateFinal.getMonth(),
      ye = dateFinal.getFullYear();

    var Inicio = new Date(),
      Final = new Date(),
      hourStart: Array<any> = [],
      hourEnd: Array<any> = [];

    if (!this.allDaySelected) {
      hourStart = this.formEvent.get('HoraInicio').value.split(":");
      hourEnd = this.formEvent.get('HoraFin').value.split(":");
      var hrs = hourStart[0];
      var mns = hourStart[1];
      var hre = hourEnd[0];
      var mne = hourEnd[1];
      Inicio = new Date(ys, ms, ds, Number(hrs), Number(mns));
      Final = new Date(ye, me, de, Number(hre), Number(mne));
    } else {
      Inicio = new Date(ys, ms, ds, 0, 0);
      Final = new Date(ye, me, de, 0, 0);
    }
    if (Inicio > Final) {
      Final = Inicio;
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
    this.componenteService.updateCalendarEvent(this.getEventoCalendar[this.updateIndex]).subscribe(result => {
      if (result == 200) {
        // Elimina la informacion del calnedario para posterioemente cargarlo con la nueva información
        this.$calendar.fullCalendar('removeEvents');
        // Agrega la información actualizada al calendario sin la necesaridad de llamar el servicio Get. 
        this.$calendar.fullCalendar('addEventSource', this.calendarEvents);
        this.popToast('success', 'Calendario', 'Se actualizo correctamente el evento en el calendario.');
        this.loading = false;
        this.EditEventAction = false;
        this.selectedEvent = this.getEventoCalendar[this.updateIndex];
        this._Actividades();
      }
      if (result == 404) {
        this.popToast('error', 'Calendario', 'Ocurrió un error al actualizar el evento. Si el problema persiste favor de notificarlo a sistemas.');
      }
    })

  }
  /*
  * Calcular la fecha minima de fecha final
  */
  public EditLimitDate() {
    this.StartDate = this.formEvent.get('Inicio').value;
  }

  private _GetActivdadesReclutador() {
    this._catalogotService.getActividadesReclutador().subscribe(result => {
      this.Actividades = result;
    })
  }

  private selected(event: any) {
    this.textValueActividad = this.Actividades[event - 1].actividad;
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


  // Confirmacion para eliminar Evento
  sweetalertDeleteEvent(data: any) {
    swal({
      title: 'Eliminar evento del calendario',
      text: 'Esta seguro que desea eliminar el Evento ' + data.title,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Si, Eliminar.',
      cancelButtonText: 'No, Cancelar',
      closeOnConfirm: false,
      closeOnCancel: false,
    }, (isConfirm: boolean) => {
      if (isConfirm) {
        this.DeleteEvent(data);
      } else {
        swal('Cancelado', 'El Evento no se elimino.', 'error');
      }
    });
  }

  // Confirmar para culminar Evento
  sweetalertCulminarEvent(data: any) {
    swal({
      title: 'Culminar evento del calendario',
      text: 'Esta seguro que desea culminar el Evento ' + data.title,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Si, Culminar.',
      cancelButtonText: 'No, Cancelar',
      closeOnConfirm: false,
      closeOnCancel: false,
    }, (isConfirm: boolean) => {
      if (isConfirm) {
        this.CulminarEvent(data);
      } else {
        swal('Cancelado', 'El evento sigue activo.', 'error');
      }
    });
  }
}
