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
  $calendar: any;

  calendarOptions: any = {
    // isRTL: true,
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    },
    buttonIcons: { // note the space at the beginning
      prev: ' fa fa-caret-left',
      next: ' fa fa-caret-right',
      prevYear: 'fa-angle-double-left',
      nextYear: 'fa-angle-double-right'
    },
    buttonText: {
      today: 'Hoy',
      month: 'Mes',
      week: 'Semana',
      day: 'Día'
    },
    height: 700,
    contentHeight: 600,
    editable: true,
    droppable: true,
    eventClick: this.eventClick.bind(this),
    dayClick: this.dayClick.bind(this),
    getEventsById: this,

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
    this.selectedEvent = {
      title: calEvent.title,
      start: calEvent.start,
      url: calEvent.url || ''
    };

    console.log('Event: ' + calEvent.title);
    console.log('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
    console.log('View: ' + view.name);

  }

  dayClick(date, jsEvent, view) {
    this.selectedEvent = {
      date: date.format()
    };
    this.openDialogEvent(date);
  }

  addEvent(event) {
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
      if(result != null){
        console.log(result)
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
      start: new Date(y, m, 2),
      backgroundColor: '#f56954', //red
      borderColor: '#f56954' //red
    }, {
      title: 'Long Event',
      start: new Date(2018, 10, 5),
      end: new Date(2018, 10, 10 + 1),
      backgroundColor: '#f39c12', //yellow
      borderColor: '#f39c12' //yellow
    }, {
      title: 'Meeting',
      start: new Date(y, m, d, 10, 30),
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
