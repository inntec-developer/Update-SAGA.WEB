import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { RequisicionesService } from '../../../../../../../service';

declare var $: any;
@Component({
  selector: 'app-dialog-show-requi',
  templateUrl: './dialog-show-requi.component.html',
  styleUrls: ['./dialog-show-requi.component.scss'],
  providers: [RequisicionesService]
})
export class DialogShowRequiComponent implements OnInit {
  textBtnCerrar: string;
  folio: any;
  id: any;
  vacante: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data : any, private servce: RequisicionesService,
    public dialogShow : MatDialogRef<DialogShowRequiComponent>,
  ) { 
    this.folio = this.data.folio;
    this.id = this.data.id;
    this.vacante = this.data.vacante;
    this.textBtnCerrar = 'Cerrar'
  }

  ngOnInit() {}

  onCloseDialog(){
    this.dialogShow.close();
  }


}
