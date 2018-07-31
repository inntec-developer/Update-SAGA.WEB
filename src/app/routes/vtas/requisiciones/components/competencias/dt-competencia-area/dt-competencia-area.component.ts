import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material'

@Component({
  selector: 'app-dt-competencia-area',
  templateUrl: './dt-competencia-area.component.html',
  styleUrls: ['./dt-competencia-area.component.scss']
})
export class DtCompetenciaAreaComponent implements OnInit {
  @Input() Competencias: any[];
  public dataSource: MatTableDataSource<any[]>;
  getCompetencia : boolean = false;
  constructor() { }

  ngOnInit() {
  }
  ngAfterContentChecked(){
    if(this.Competencias != null){
      this.cargarCompetencia(this.Competencias);
    }
  }

  cargarCompetencia(data){
    if(!this.getCompetencia){
      this.dataSource = new MatTableDataSource(data);
      this.getCompetencia  = true;
    }
  }
  //*******************************-- GRID-- *********************************************//
  // Display para mostrar los objetos en el Grid
  displayedColumns = [
  'competencia',
  'nivel'
  ]

}

export interface Element{
  competencia: string;
  nivel: string;
}
