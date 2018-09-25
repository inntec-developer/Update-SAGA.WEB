import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { FormGroup } from '@angular/forms';
import { RequisicionesService } from '../../../../service';
import { Vacante } from '../../../../models/models';

@Component({
  selector: 'app-dialog-edit-horario',
  templateUrl: './dialog-edit-horario.component.html',
  styleUrls: ['./dialog-edit-horario.component.scss'],
  providers: [RequisicionesService, Vacante]
})
export class DialogEditHorarioComponent implements OnInit {
  RequisicionId: any;
  HorarioId: any;
  vacanteN: any = 0;
  result: any;
  msgDanger: boolean;
  msWarning: boolean;
  loading: boolean;
  public formVacantes : FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service : RequisicionesService,
    private dialogVacantes : MatDialogRef<DialogEditHorarioComponent>,
    public Vacante : Vacante,
  ) {
   }

  ngOnInit() {
    this.getInformacion();
  }

  getInformacion(){
    this.RequisicionId = this.data.requisicionId;
    this.HorarioId = this.data.id;
  }

  onCloseDialog(){
    this.dialogVacantes.close();
  }

  updateVacante(){
    this.loading = true;
    var vacante = {
      id : this.HorarioId,
      requisicionId : this.RequisicionId,
      usuario : sessionStorage.getItem('usuario'),
      numeroVacantes : this.vacanteN
    }
    this.Vacante = vacante;
    this.service.updateVacanates(this.Vacante).subscribe(data => {
      this.result = data;
      if(this.result == 200){
        setTimeout(() =>{
            this.service.getRequiHorarios(this.RequisicionId).subscribe(result =>{
              this.dialogVacantes.close(result);
              this.loading = false;
            });
        },2000);
      }
      if(this.result == 204){
        this.loading = false;
        this.msWarning = true;
        // setTimeout(() =>{
        //   this.msWarning = false;
        // },7000);
      }
      if(this.result == 404){
        this.loading = false;
        this.msgDanger = true;
        // setTimeout(() =>{
        //   this.msgDanger = false;
        // },7000);
      }
    });
  }
}
