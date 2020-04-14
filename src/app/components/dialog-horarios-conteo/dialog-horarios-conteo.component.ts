import { CandidatosService } from './../../service/Candidatos/candidatos.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
  constructor( private dialogHorarios: MatDialogRef<DialogHorariosConteoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private service: CandidatosService ) { }

  ngOnInit() {
    this.GetMedios();
    const aux = this.data.filter(x => x.editar);
    console.log(aux)
    if (aux.length > 0 ) {
      this.seleccion = aux[0].id;
      this.mediosId = aux[0].mediosId;
    }
    if (this.data.length === 1) {
      if (this.data[0].id !== 0) {
        this.seleccion = this.data[0].id;
      }
    } else {
      this.seleccion = 1;
    }
  }

  GetMedios() {
    this.service.GetMediosRecl().subscribe(result => {
      this.medios = result;
    });
  }

  EnviarDatos() {
    const nom = this.data.filter( d => {
      if ( d.id === this.seleccion ) {
        return d.nombre;
      }
    });

    this.dialogHorarios.close({mediosId: this.mediosId, horarioId: this.seleccion, horario: nom[0].nombre });
  }

  onCloseDialog() {
    this.dialogHorarios.close(0);
  }
}
