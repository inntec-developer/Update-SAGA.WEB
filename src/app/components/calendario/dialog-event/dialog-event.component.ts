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
  public evnt = {
    titulo: '',
    inicio: null,
    final: null,
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogEvent: MatDialogRef<DialogEventComponent>
  ) {
    dialogEvent.disableClose = true;
  }

  ngOnInit() {
    this.evnt.inicio = this.data;
    this.evnt.final = this.data;
  }

  onCloseDialog() {
    this.dialogEvent.close(false);
  }

}
