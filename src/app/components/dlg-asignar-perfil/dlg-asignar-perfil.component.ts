import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dlg-asignar-perfil',
  templateUrl: './dlg-asignar-perfil.component.html',
  styleUrls: ['./dlg-asignar-perfil.component.scss']
})
export class DlgAsignarPerfilComponent implements OnInit {

  reclutadorId;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogHorarios: MatDialogRef<DlgAsignarPerfilComponent>) { }

  ngOnInit() {
  }

  enviarDatos(r)
  {
    this.dialogHorarios.close(r);

  }
}
