import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { DialogEventComponent } from '../dialog-event/dialog-event.component';
import { MatDialog } from '@angular/material';

declare var $: any;
@Component({
  selector: 'app-calendario-candidato',
  templateUrl: './calendario-candidato.component.html',
  styleUrls: ['./calendario-candidato.component.scss']
})
export class CalendarioCandidatoComponent implements OnInit {
  modalRef: BsModalRef;
  EventSelected: boolean; 
  $calendar: any;
  /* 
  * 
      Configuracion del de la vista del calendario
  *
  */
  calendarOptions: any = {
    // isRTL: true,
    locale: 'es',
    lag: 'es',
    defaultView: 'month',
    eventLimit: 3,
    eventLimitText: 'Más',
    height: 300,
    contentHeight: 450,
    editable: true,
    droppable: true,
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

  calendarEvents: Array<any> = this.createDemoEvents();
  selectedEvent = null;

  // reference to the calendar element
  @ViewChild('fullcalendar') fullcalendar: ElementRef;

  constructor(
    private modalService: BsModalService,
    private dialog: MatDialog,
  ) {
    this.calendarOptions.events = this.calendarEvents;
  }

  ngOnInit() {
    this.EventSelected = false;
    this.$calendar = $(this.fullcalendar.nativeElement);
  }

  ngAfterViewInit() {
    // init calendar plugin
    this.$calendar.fullCalendar(this.calendarOptions);
  }

  addRandomEvent() {
    // add dynamically an event
    this.addEvent({
      title: 'Random Event',
      start: new Date((new Date).getFullYear(), (new Date).getMonth(), Math.random() * (30 - 1) + 1),
      backgroundColor: '#c594c5', //purple
      borderColor: '#c594c5' //purple
    });
  }

  eventClick(calEvent, jsEvent, view) {
    this.EventSelected = true;
    this.selectedEvent = {
      title: calEvent.title,
      start: calEvent.start,
      end: calEvent.end,
      message: calEvent.message
    };

    console.log(calEvent, jsEvent, view);

  }

  dayClick(date, jsEvent, view) {
    this.selectedEvent = {
      date: date.format()
    };
    this.openDialogEvent(date);
  }

  addEvent(event) {
    debugger;
    // store event
    this.calendarEvents.push(event);
    // display event in calendar
    this.$calendar.fullCalendar('renderEvent', event, true);
  }

  ngOnDestroy() {
    this.$calendar.fullCalendar('destroy')
  }


  openDialogEvent(date: any) {
    let dialogEvent = this.dialog.open(DialogEventComponent, {
      data: date
    })
    dialogEvent.afterClosed().subscribe(result => {
      if (result != false) {
        console.log(result)
        this.addEvent(result);
      }else{
        console.log('No se agrego nada a la agenda');
      }
    });


  }

  createDemoEvents() {
    // Date for the calendar events (dummy data)
    var date = new Date();
    var d = date.getDate(),
      m = date.getMonth(),
      y = date.getFullYear();

    return [{
      title: 'All Day Event',
      start: new Date(y, m, 2, 17, 30),
      backgroundColor: '#f56954', //red
      borderColor: '#f56954', //red
      message: 'Este es un mensaje de descripción.'
    }, {
      title: 'Long Event',
      start: new Date(2018, 10, 5),
      end: new Date(2018, 10, 10 + 1),
      backgroundColor: '#f39c12', //yellow
      borderColor: '#f39c12' //yellow
    }, {
      title: 'Meeting',
      start: new Date(y, m, d, 10, 30),
      end: new Date(y, m, d, 12, 30),
      allDay: false,
      backgroundColor: '#0073b7', //Blue
      borderColor: '#0073b7' //Blue
    }, {
      title: 'Lunch',
      start: new Date(y, m, d, 12, 0),
      end: new Date(y, m, d, 14, 0),
      allDay: false,
      backgroundColor: '#00c0ef', //Info (aqua)
      borderColor: '#00c0ef' //Info (aqua)
    }, {
      title: 'Lunch',
      start: new Date(y, m, d, 12, 0),
      end: new Date(y, m, d, 14, 0),
      allDay: false,
      backgroundColor: '#00c0ef', //Info (aqua)
      borderColor: '#00c0ef' //Info (aqua)
    }, {
      title: 'Lunch',
      start: new Date(y, m, d, 12, 0),
      end: new Date(y, m, d, 14, 0),
      allDay: false,
      backgroundColor: '#00c0ef', //Info (aqua)
      borderColor: '#00c0ef' //Info (aqua)
    }, {
      title: 'Birthday Party',
      start: new Date(y, m, d + 1, 19, 0),
      end: new Date(y, m, d + 1, 22, 30),
      allDay: false,
      backgroundColor: '#00a65a', //Success (green)
      borderColor: '#00a65a' //Success (green)
    }, {
      title: 'Open Google',
      start: new Date(y, m, 28),
      end: new Date(y, m, 29),
      url: '//google.com/',
      backgroundColor: '#3c8dbc', //Primary (light-blue)
      borderColor: '#3c8dbc' //Primary (light-blue)
    }];
  }
}
