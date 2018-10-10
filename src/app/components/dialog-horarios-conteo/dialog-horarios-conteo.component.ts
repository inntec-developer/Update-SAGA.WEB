import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-horarios-conteo',
  templateUrl: './dialog-horarios-conteo.component.html',
  styleUrls: ['./dialog-horarios-conteo.component.scss']
})
export class DialogHorariosConteoComponent implements OnInit {

  constructor( private dialogHorarios: MatDialogRef<DialogHorariosConteoComponent>,  @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit() {
  }

  onCloseDialog() {
    this.dialogHorarios.close(0);
  }
}
