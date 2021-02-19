import { Component, Input, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dt-competencia-area',
  templateUrl: './dt-competencia-area.component.html',
  styleUrls: ['./dt-competencia-area.component.scss']
})
export class DtCompetenciaAreaComponent implements OnInit {
  @Input() Competencias: any[];
  public rows: Array<any> = [];
  getCompetencia : boolean = false;
  rowAux = [];
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
      this.rows = data;
      this.getCompetencia  = true;
    }
  }
  
  public columns: Array<any> = [
    {title: 'Competencia', className: 'text-info text-center'},
    {title: 'Nivel', className: 'text-info text-center'},
  ];

  public config: any = {
    className: ['table-striped table-bordered mb-0 d-table-fixed']
  };

  public onCellClick(data: any): any {
    data.selected ? data.selected = false : data.selected = true;
    if (this.rowAux.length == 0) {
      this.rowAux = data;
    }
    else if (data.selected && this.rowAux != []) {
      var aux = data;
      data = this.rowAux;
      data.selected = false;
      aux.selected = true;
      this.rowAux = aux;
    }
  }

}
