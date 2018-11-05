import { CandidatosService } from './../../service/Candidatos/candidatos.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { CatalogosService } from './../../service/catalogos/catalogos.service';

@Component({
  selector: 'app-dialog-liberar-candidato',
  templateUrl: './dialog-liberar-candidato.component.html',
  styleUrls: ['./dialog-liberar-candidato.component.scss'],
  providers: [CandidatosService]
})
export class DialogLiberarCandidatoComponent implements OnInit {
  element: any;
  liberar = {
    motivo: null,
    comentario: null
  }

  constructor(
    private service: CandidatosService,
    private DialogLiberar: MatDialogRef<DialogLiberarCandidatoComponent>, 
     @Inject(MAT_DIALOG_DATA) public data: any,) { 
      DialogLiberar.disableClose = true;  
     }

  ngOnInit() {
    this.liberar.comentario = '';
    this.service.GetMotivos(27).subscribe(data => {
      this.element = data;
    }, err => {
      console.log(err);
    });
  }
  onCloseDialog() {
    this.DialogLiberar.close(0);
  }

}
