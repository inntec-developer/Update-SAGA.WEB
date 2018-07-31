import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material'

@Component({
  selector: 'app-dt-beneficios',
  templateUrl: './dt-beneficios.component.html',
  styleUrls: ['./dt-beneficios.component.scss']
})
export class DtBeneficiosComponent implements OnInit {
  @Input() Beneficios : any[];
  public dataSource : MatTableDataSource<any[]>;
  getBeneficio : boolean = false;
  constructor() { }

  ngOnInit() {
  }

  ngAfterContentChecked(){
    if(this.Beneficios != null){
      this.cargarBeneficios(this.Beneficios);
    }
  }

  cargarBeneficios(data){
    if(!this.getBeneficio){
      this.dataSource = new MatTableDataSource(data);
      this.getBeneficio = true;
    }
  }

  //*******************************-- GRID-- *********************************************//
  // Display para mostrar los objetos en el Grid
  displayedColumns = [
  'beneficio',
  'cantidad',
  'observeciones'
  ]
}
export interface Element{
  beneficio: string;
  cantidad: number;
  observacion: string;
}
