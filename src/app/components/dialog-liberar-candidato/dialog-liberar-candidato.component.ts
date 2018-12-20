import { InfoCandidatoService } from './../../service/SeguimientoVacante/info-candidato.service';
import { CandidatosService } from './../../service/Candidatos/candidatos.service';
import { Component, Inject, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { CatalogosService } from './../../service/catalogos/catalogos.service';

@Component({
  selector: 'app-dialog-liberar-candidato',
  templateUrl: './dialog-liberar-candidato.component.html',
  styleUrls: ['./dialog-liberar-candidato.component.scss'],
  providers: [CandidatosService, InfoCandidatoService]
})
export class DialogLiberarCandidatoComponent implements OnInit {
  @Input('objLiberar') objLiberar;
  @Output() close:  EventEmitter<any> =  new EventEmitter();

  element: any;
  liberar = {
    motivo: null,
    comentario: null
  }
  loading = false;

  constructor(
    private service: CandidatosService,
    private _serviceCandidato: InfoCandidatoService
    ) { 
      
     }

  ngOnInit() {
    this.liberar.comentario = '';
    this.service.GetMotivos(27).subscribe(data => {
      this.element = data;
      console.log(this.objLiberar)
    }, err => {
      console.log(err);
    });
  }
  onCloseDialog() {
    this.close.emit(0);
  }

  _liberarCandidato() {
debugger;
      this.loading = true;
     
      var data = {
        RequisicionId: this.objLiberar[0].RequisicionId,
        CandidatoId: this.objLiberar[0].CandidatoId,
        ReclutadorId: this.objLiberar[0].ReclutadorId,
        MotivoId: this.liberar.motivo,
        ProcesoCandidatoId: this.objLiberar[0].ProcesoCandidatoId,
        Comentario: this.liberar.comentario
      }

      this._serviceCandidato.setLiberarCandidato(data)
        .subscribe(result => {
   
            if( result == 200) {
              this.loading = false;

              this.close.emit(200);
            }
            else
            {
              this.loading = false;
              this.close.emit(404);
            }
      });
    }
}
