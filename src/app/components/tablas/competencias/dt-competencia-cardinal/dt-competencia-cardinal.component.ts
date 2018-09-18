import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material'

@Component({
  selector: 'app-dt-competencia-cardinal',
  templateUrl: './dt-competencia-cardinal.component.html',
  styleUrls: ['./dt-competencia-cardinal.component.scss']
})
export class DtCompetenciaCardinalComponent implements OnInit {
  @Input() Competencias: any[];
  public rows: Array<any> = [];
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
}
