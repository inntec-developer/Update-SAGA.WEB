import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { FormGroup } from '@angular/forms';
import { RequisicionesService } from '../../../../../../service/requisiciones/requisiciones.service';
import { Vacante } from '../../../../../../models/vtas/Requisicion';

@Component({
  selector: 'app-dialog-edit-horario',
  templateUrl: './dialog-edit-horario.component.html',
  styleUrls: ['./dialog-edit-horario.component.scss'],
  providers: [RequisicionesService, Vacante]
})
export class DialogEditHorarioComponent implements OnInit {
  RequisicionId: any;
  HorarioId: any;
  vacanteN: any;
  result: any;
  msgDanger: boolean;
  textBtnCerrar: string;
  textBtnAceptar: string;
  loading: boolean;
  public formVacantes : FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service : RequisicionesService,
    private dialogVacantes : MatDialogRef<DialogEditHorarioComponent>,
    public Vacante : Vacante,
  ) {
    this.textBtnCerrar = 'Cancelar';
    this.textBtnAceptar = 'Guardar';
   }

  ngOnInit() {
    this.getInformacion();
  }

  getInformacion(){
    console.log(this.data);
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
      usuario : localStorage.getItem('usuario'),
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
      else{
        this.msgDanger = true;
        setTimeout(() =>{
          this.msgDanger = false;
          this.loading = false;
        },2000);
      }
    });
  }
}
