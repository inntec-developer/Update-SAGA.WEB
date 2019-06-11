import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dlg-resultados-medicos',
  templateUrl: './dlg-resultados-medicos.component.html',
  styleUrls: ['./dlg-resultados-medicos.component.scss']
})
export class DlgResultadosMedicosComponent implements OnInit {

  catalogo: string[] = ['APTO','NO APTO'];
total = 0;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.data.examenes[0].forEach(element => {
      this.total += element.costo;
    });

    this.total = this.total * this.data.candidatos;
  }

}
