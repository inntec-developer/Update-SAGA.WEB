import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dialog-event',
  templateUrl: './dialog-event.component.html',
  styleUrls: ['./dialog-event.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    DatePipe
  ]
})
export class DialogEventComponent implements OnInit, AfterViewInit {
  // Variables de Formulario  
  public formEvent: FormGroup;
  public fb: FormBuilder;
  // Variables Globales
  public loading : boolean;
  public color: string;
  public ColorPicker: string;
  public allDaySelected: boolean;
  public minLimitDate: any;
  public SeletedDayC: any;
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
    private dialogEvent: MatDialogRef<DialogEventComponent>,
    private dateParse : DatePipe
  ) {
    dialogEvent.disableClose = true;
    this.formEvent = new FormGroup({
      Titulo: new FormControl('', [Validators.required]),
      Inicio: new FormControl('', [Validators.required]),
      Fin: new FormControl('', [Validators.required]),
      HoraInicio: new FormControl(''),
      HoraFin: new FormControl(''),
      AllDay: new FormControl(),
      Descripcion: new FormControl(''),
      Color: new FormControl('')
    });
  }

  ngOnInit() {
    debugger;
    this.ColorPicker = '#4290ff'
    this.SeletedDayC = this.data;
    this.minLimitDate = this.SeletedDayC;
    this.loading = false;
    // this.formEvent = this.fb.group({
    //   Titulo: [{ value: '' }, Validators.required],
    //   Inicio: [{ value: this.SeletedDayC }, Validators.required],
    //   Fin: [{ value: '' }, Validators.required],
    //   HoraInicio: [{ value: '' }],
    //   HoraFin: [{ value: '' }],
    //   AllDay: [false],
    //   Descripcion: [{ value: '' }],
    // });
    // console.log(this.formEvent.value)
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    debugger;
    this.formEvent = this.fb.group({
      HoraInicio: [{ value: '6:00' }],
      HoraFin: [{ value: '18:00' }]
    });
  }
  private _CheckNuevaFecha(){
    this.minLimitDate = this.formEvent.get('Inicio').value;
  }
  
  private _CheckAllDay() {
    this.allDaySelected = this.formEvent.get('AllDay').value;
  }

  onCloseDialog() {
    this.dialogEvent.close(false);
  }
  onCloseDialogInfo() {debugger;
    this.loading = true;
    var dateInicio = new Date(this.minLimitDate);
    var dateFinal = this.formEvent.get('Fin').value;
    dateInicio = new Date(dateInicio);
    dateFinal = new Date(dateFinal);
    var ds = dateInicio.getUTCDate(),
    ms = dateInicio.getMonth(),
    ys = dateInicio.getFullYear();
  var de = dateFinal.getUTCDate(),
    me = dateFinal.getMonth(),
    ye = dateFinal.getFullYear();

    var Inicio ,
        Final,
        hourStart: Array<any> = [],
        hourEnd: Array<any> =[];

    if (!this.allDaySelected) {
      hourStart = this.formEvent.get('HoraInicio').value.split(":");
      hourEnd = this.formEvent.get('HoraFin').value.split(":");
      var hrs = hourStart[0];
      var mns = hourStart[1];
      var hre = hourEnd[0];
      var mne = hourEnd[1];
      Inicio = new Date(ys, ms, ds , Number(hrs), Number(mns));
      Final = new Date(ye, me, de , Number(hre), Number(mne));
    } else {
      Inicio = new Date(ys, ms, ds , 8, 30);
      Final = new Date(ye, me, de , 23, 59);
    }
    var data = {
      title: this.formEvent.get('Titulo').value,  
      start: Inicio,
      end: Final,
      allDay: this.allDaySelected, 
      message: this.formEvent.get('Descripcion').value || 'Sin Descripción',
      backgroundColor: this.ColorPicker,
      borderColor: this.ColorPicker, 
    }
    console.log(this.formEvent.value);
    this.dialogEvent.close(data);
  }

  

}
