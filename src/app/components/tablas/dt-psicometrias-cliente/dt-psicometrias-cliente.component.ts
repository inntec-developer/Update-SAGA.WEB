import { AfterContentChecked, Component, Input, OnChanges, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dt-psicometrias-cliente',
  templateUrl: './dt-psicometrias-cliente.component.html',
  styleUrls: ['./dt-psicometrias-cliente.component.scss']
})
export class DtPsicometriasClienteComponent implements OnInit, AfterContentChecked {

  @Input() Psicometrias: any[];
  public rows: Array<any> = [];
  getPsicometria: boolean = false;
  rowAux = [];
  constructor() { }

  ngOnInit() {
  }

  ngAfterContentChecked() {
    if (this.Psicometrias != null) {
      this.cargarPsicometrias(this.Psicometrias)
    }
  }

  cargarPsicometrias(data) {
    if (!this.getPsicometria) {
      this.rows = data;
      this.getPsicometria = true;
    }
  }

  public columns: Array<any> = [
    { title: 'Psicometrías', className: 'text-info text-center' },
    { title: 'Descripción', className: 'text-info text-center' },
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
