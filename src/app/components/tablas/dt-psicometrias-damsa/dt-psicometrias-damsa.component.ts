import { AfterContentChecked, Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-dt-psicometrias-damsa',
  templateUrl: './dt-psicometrias-damsa.component.html',
  styleUrls: ['./dt-psicometrias-damsa.component.scss']
})
export class DtPsicometriasDamsaComponent implements AfterContentChecked {

  @Input()  Psicometrias: any[];
  public rows: Array<any> = [];
  getPsicometria : boolean = false;
  rowAux = [];
  constructor() { }

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
    {title: 'Psicometrías', className: 'text-info text-center'},
    {title: 'Descripción', className: 'text-info text-center'},
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
