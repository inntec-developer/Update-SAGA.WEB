import { Component, OnInit, Input, OnChanges, AfterContentChecked } from '@angular/core';
import { MatTableDataSource } from '@angular/material'

@Component({
  selector: 'app-dt-psicometrias-cliente',
  templateUrl: './dt-psicometrias-cliente.component.html',
  styleUrls: ['./dt-psicometrias-cliente.component.scss']
})
export class DtPsicometriasClienteComponent implements OnInit, AfterContentChecked {

  @Input()  Psicometrias: any[];
  public rows: Array<any> = [];
  getPsicometria : boolean = false;
  constructor() { }

  ngOnInit() {
  }

  ngAfterContentChecked(){
    if(this.Psicometrias != null){
      this.cargarPsicometrias(this.Psicometrias)
    }
  }

  cargarPsicometrias(data){
    if(!this.getPsicometria){
      this.rows = data;
      this.getPsicometria = true;
    }
  }

  public columns: Array<any> = [
    {title: 'Psicometrias', className: 'text-info text-center'},
    {title: 'Descripcion', className: 'text-info text-center'},
  ];

  public config: any = {
    className: ['table-striped table-bordered mb-0 d-table-fixed']
  };
}
