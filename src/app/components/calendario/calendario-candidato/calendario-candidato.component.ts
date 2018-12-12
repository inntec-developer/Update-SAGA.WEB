import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDialog } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';

import { AutoComplete } from 'primeng/primeng';
import { DialogEventComponent } from '../dialog-event/dialog-event.component';
import { EventoCalendario } from './../../../models/vtas/Requisicion';

declare var $: any;
@Component({
  selector: 'app-calendario-candidato',
  templateUrl: './calendario-candidato.component.html',
  styleUrls: ['./calendario-candidato.component.scss'],
  providers: [EventoCalendario,
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ]
})
export class CalendarioCandidatoComponent implements OnInit {
  //Formulario para edición del Evento en Calendario.

  createDemoEvents : Array<any> = [
    {
      id: 1,
      title: 'Firmas de Contratos',
      start: new Date(2018, 11, 20),
      backgroundColor: '#f39c12', //yellow
      borderColor: '#f39c12', //yellow
      allDay: true
    }, {
      id: 2,
      title: 'Entrevistas',
      start: new Date(2018, 11, 8 ),
      backgroundColor: '#f39c12', //yellow
      borderColor: '#f39c12', //yellow
      allDay: true,
    }, {
      id: 3,
      title: 'Contrataciones',
      start: new Date(2018, 11, 15),
      backgroundColor: '#f39c12', //yellow
      borderColor: '#f39c12', //yellow
      allDay: true
    },{
      id: 4,
      title: 'Entrevita Candidatos DiDi',
      start: new Date(2018, 11, 20),
      end: new Date(2018, 11, 23, 23, 59),
      message: 'Todo el dia',
      backgroundColor: '#f39c12', //yellow
      borderColor: '#f39c12', //yellow
      allDay: true
    },{
      id: 5,
      title: 'Firma de Contratos Unber',
      start: new Date(2018, 11, 20),
      backgroundColor: '#f39c12', //yellow
      borderColor: '#f39c12', //yellow
      allDay: true
    },
  ]

  public formEvent: FormGroup;
  public fb: FormBuilder;
  /* * Variables * */
  public modalRef: BsModalRef;
  public EventSelected: boolean;
  public EditEventAction: boolean;
  public $calendar: any;
  public calendarEvents: Array<any> = this.createDemoEvents;
  public selectedEvent = null;
  public minLimitDate: any;
  public allDaySelected: any;
  public hourStart: string = '12:00';
  public hourEnd: string = '14:00';
  /* * Reference to the calendar element * */
  @ViewChild('fullcalendar') fullcalendar: ElementRef;


  /* * Configuracion del de la vista del calendario * */
  calendarOptions: any = {
    // isRTL: true,
    timezone: "America/Mexico_City",
    timeZoneImpl: 'UTC-coercion',
    locale: 'es',
    defaultView: 'month',
    eventLimit: 3,
    eventLimitText: 'Más',
    height: 300,
    contentHeight: 450,
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




  constructor(
    private modalService: BsModalService,
    private dialog: MatDialog,
    private eventoCalendario: EventoCalendario
  ) {
    this.calendarOptions.events = this.calendarEvents;
    this.formEvent = new FormGroup({
      Titulo: new FormControl('', [Validators.required]),
      Inicio: new FormControl('', [Validators.required]),
      Fin: new FormControl('', [Validators.required]),
      HoraInicio: new FormControl(''),
      HoraFin: new FormControl(''),
      AllDay: new FormControl(),
      Descripcion: new FormControl(''),
    });
  }

  ngOnInit() {
    this.EventSelected = false;
    this.$calendar = $(this.fullcalendar.nativeElement);
    this.formEvent = this.fb.group({
      Titulo: [{ value: '' }, Validators.required],
      Inicio: [{ value: '' }, Validators.required],
      Fin: [{ value: '' }, Validators.required],
      HoraInicio: [{ value: '' }],
      HoraFin: [{ value: '' }],
      AllDay: [false],
      Descripcion: [{ value: '' }],
    });
  }

  ngAfterViewInit() {
    // init calendar plugin
    this.$calendar.fullCalendar(this.calendarOptions);
  }

  addRandomEvent() {
    // add dynamically an event
    var fecha = new Date((new Date).getFullYear(), (new Date).getMonth(), Math.random() * (30 - 1) + 1);
    this.addEvent({
      title: 'Random Event',
      start: fecha,
      allDay: true,
      message: 'Sin mensaje de descripcion',
      backgroundColor: '#c594c5', //purple
      borderColor: '#c594c5' //purple
    });
  }

  eventClick(calEvent, jsEvent, view) {
    debugger;
    this.EventSelected = true;
    this.EditEventAction = false;
    this.selectedEvent = {
      id: calEvent.id,
      title: calEvent.title,
      start: calEvent.start.toJSON()  ,
      end: calEvent.end == null ? calEvent.start.toJSON() : calEvent.end.toJSON(),
      message: calEvent.message || 'Sin Descripción',
      allDay: calEvent.allDay,
      backgroundColor: calEvent.backgroundColor,
      borderColor: calEvent.borderColor
    };

    console.log(calEvent/* , jsEvent, view*/);

  }

  dayClick(date, jsEvent, view) {
    debugger;
    this.selectedDate = date.toJSON();
    this.selectedEvent = null;
    this.openDialogEvent(this.selectedDate);
  }

  addEvent(event) {
    // store event
    this.calendarEvents.push(event);
    // display event in calendar
    // this.$calendar.fullCalendar('renderEvent', event, true);
    this.$calendar.fullCalendar('removeEvents'); 
    this.$calendar.fullCalendar('addEventSource',   this.calendarEvents); 
  }

  ngOnDestroy() {
    this.$calendar.fullCalendar('destroy')
  }


  openDialogEvent(date: any) {
    let dialogEvent = this.dialog.open(DialogEventComponent, {
      width: 'auto',
      height: 'auto',
      data: date
    })
    dialogEvent.afterClosed().subscribe(result => {
      if (result != false) {
        console.log(result)
        this.addEvent(result);
      } else {
        console.log('No se agrego nada a la agenda');
      }
    });
  }

  public EditEvent(data) { debugger;
    this.IdEvent = data.id;
    this.minLimitDate = '';
    this.EditEventAction = true;
    this.ColorPicker = data.borderColor;
    console.log(data);

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
      Titulo: data.title,
      Inicio: new Date(data.start),
      Fin: new Date(data.end),
      AllDay: data.allDay,
      Descripcion: data.message,
      HoraInicio: this.hourStart,
      HoraFin: this.hourEnd,
    });
    this.minLimitDate = this.formEvent.get('Inicio').value;
    this.allDaySelected = this.formEvent.get('AllDay').value;
    console.log(this.formEvent);
  }

  private CancelareditEvent() {
    this.EditEventAction = false;
  }

  private _CheckNuevaFecha() {
    this.minLimitDate = this.formEvent.get('Inicio').value;
  }

  private _CheckAllDay() {
    this.allDaySelected = this.formEvent.get('AllDay').value;
    this.allDaySelected = this.allDaySelected.toISOString();
  }

  private DeleteEvent(data){
    var deleteEvent = this.createDemoEvents.findIndex(x => x.id === data.id);
    this.createDemoEvents.splice(deleteEvent, 1);
    this.calendarEvents = this.createDemoEvents;
    this.$calendar.fullCalendar('removeEvents'); 
    this.$calendar.fullCalendar('addEventSource',   this.calendarEvents); 
  }

  private Save() {
    this.loading = true;
    this.updateIndex = this.createDemoEvents.findIndex(event => event.id === this.IdEvent)
    var dateInicio = new Date(this.formEvent.get('Inicio').value);
    var dateFinal = new Date(this.formEvent.get('Fin').value);

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
    
    this.createDemoEvents[this.updateIndex]['title'] = this.formEvent.get('Titulo').value;
    this.createDemoEvents[this.updateIndex]['start'] = Inicio;
    this.createDemoEvents[this.updateIndex]['end'] = Final;
    this.createDemoEvents[this.updateIndex]['allDay'] = this.allDaySelected;
    this.createDemoEvents[this.updateIndex]['message'] = this.formEvent.get('Descripcion').value || 'Sin Descripción';
    this.createDemoEvents[this.updateIndex]['backgroundColor'] = this.ColorPicker;
    this.createDemoEvents[this.updateIndex]['borderColor'] = this.ColorPicker;
    this.calendarEvents = this.createDemoEvents;
    console.log(this.calendarEvents)
    this.$calendar.fullCalendar('removeEvents'); 
    this.$calendar.fullCalendar('addEventSource',   this.calendarEvents); 
    this.loading = false;
  }

  
}
  