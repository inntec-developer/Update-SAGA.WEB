import { DlgBGArteComponent } from './../editor-arte-requisiciones/dlg-bgarte/dlg-bgarte.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-editor-arte-requisiciones',
  templateUrl: './editor-arte-requisiciones.component.html',
  styleUrls: ['./editor-arte-requisiciones.component.scss']
})
export class EditorArteRequisicionesComponent implements OnInit {

  vBtra: string = "Vacante prueba de Melina"
  descripcion: string = "Importante empresa solicita persona para puesto de " + this.vBtra + " en la Zona Metropolitana de Guadalajara";
  experiencia: string = "Experiencia inventada por Melina en mocos mocos mocos mocos";
  contacto: string = "Llama al 3333 3333 ext.666 o manda correo indicando el título de la vacante al correo mbonita@damsa.com.mx con atención a Melina Bonita";
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialogBG() {
    let dialogCnc = this.dialog.open(DlgBGArteComponent, {
      width: '90%',
      height: '90%',
    });
    dialogCnc.afterClosed().subscribe(result => {
      if(result)
      {
       
      }
    })
  }

}
