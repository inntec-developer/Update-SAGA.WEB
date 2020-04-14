import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dlg-resultados-medicos',
  templateUrl: './dlg-resultados-medicos.component.html',
  styleUrls: ['./dlg-resultados-medicos.component.scss']
})
export class DlgResultadosMedicosComponent implements OnInit {
   //scroll
   public disabled = false;
   public invertX = false;
   public compact = false;
   public invertY = false;
   public shown = 'hover';
   

  catalogo: string[] = ['APTO','NO APTO'];
total = 0;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialogRef<DlgResultadosMedicosComponent>) { }

  ngOnInit() {
    this.data.examenes[0].forEach(element => {
      this.total += element.costo;
    });

    this.total = this.total * this.data.candidatos;
  }

  Close()
  {
    this.dialog.close("Ok");
  }

}
