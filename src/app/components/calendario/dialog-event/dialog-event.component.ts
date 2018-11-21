import { Component, Inject, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';

@Component({
  selector: 'app-dialog-event',
  templateUrl: './dialog-event.component.html',
  styleUrls: ['./dialog-event.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ]
})
export class DialogEventComponent implements OnInit {
  color: string;
  public evnt = {
    titulo: '',
    inicio: null,
    final: null,
    color: null,
    horaInicio: null,
    horaFinal: null,
    descripcion: '',
  } 

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogEvent: MatDialogRef<DialogEventComponent>
  ) {
    dialogEvent.disableClose = true;
    this.evnt.color = "#4290ff"
  }

  ngOnInit() {
    this.evnt.inicio = this.data;
  }

  onCloseDialog() {
    this.dialogEvent.close(false);
  }
  onCloseDialogInfo() {
    debugger;
    var dateInicio = new Date(this.evnt.inicio);
    var dateFinal = new Date(this.evnt.final);
    
    var ds = dateInicio.getDate(),
        ms = dateInicio.getMonth(),
        ys = dateInicio.getFullYear();
    var de = dateFinal.getDate(),
        me = dateFinal.getMonth(),
        ye = dateFinal.getFullYear();

    var Inicio = new Date(),
        Final = new Date(),
        hourStart: Array<any> = [],
        hourEnd: Array<any> =[];

    if (this.evnt.horaInicio != null && this.evnt.horaFinal != null) {
      hourStart = this.evnt.horaInicio.split(":");
      hourEnd = this.evnt.horaFinal.split(":");
      var hrs = hourStart[0];
      var mns = hourStart[1];
      var hre = hourEnd[0];
      var mne = hourEnd[1];
      Inicio = new Date(ys, ms, ds + 1, Number(hrs), Number(mns));
      Final = new Date(ye, me, de , Number(hre), Number(mne));
    } else {
      Inicio = new Date(ys, ms, ds + 1, 8, 0);
      Final = new Date(ye, me, de , 9, 0);
    }
    var data = {
      title: this.evnt.titulo,
      start: Inicio,
      end: Final,
      allDay: false,
      backgroundColor: this.evnt.color, //Info (aqua)
      borderColor: this.evnt.color, //Info (aqua)
      message: this.evnt.descripcion
    }
    this.dialogEvent.close(data);
  }

  

}
