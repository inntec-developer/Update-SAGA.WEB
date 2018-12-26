import { CandidatosService } from './../../service/Candidatos/candidatos.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-horarios-conteo',
  templateUrl: './dialog-horarios-conteo.component.html',
  styleUrls: ['./dialog-horarios-conteo.component.scss'],
  providers: [CandidatosService]
})
export class DialogHorariosConteoComponent implements OnInit {

  medios = [];
  seleccion = 0;
  mediosId;
  constructor( private dialogHorarios: MatDialogRef<DialogHorariosConteoComponent>,  @Inject(MAT_DIALOG_DATA) public data: any, private service: CandidatosService ) { }

  ngOnInit() {
    this.GetMedios();

    if(this.data.length == 1)
    {
      if(this.data[0].id != 0)
      {
        this.seleccion = this.data[0].id;
      }
      console.log(this.seleccion)
    }
    else 
    {
      this.seleccion = 1;
    }
  }

  GetMedios()
  {
    this.service.GetMediosRecl().subscribe(result => {
      this.medios = result;
    })
  }

  EnviarDatos()
  {
    this.dialogHorarios.close({mediosId: this.mediosId, horarioId: this.seleccion});
  }

  onCloseDialog() {
    this.dialogHorarios.close(0);
  }
}
