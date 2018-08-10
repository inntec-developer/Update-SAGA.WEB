import { Component, Input, OnChanges, AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-dt-psicometrias-damsa',
  templateUrl: './dt-psicometrias-damsa.component.html',
  styleUrls: ['./dt-psicometrias-damsa.component.scss']
})
export class DtPsicometriasDamsaComponent implements AfterContentChecked {

  @Input()  Psicometrias: any[];
  public rows: Array<any> = [];
  getPsicometria : boolean = false;
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
    {title: 'Psicometrias', className: 'text-info text-center'},
    {title: 'Descripcion', className: 'text-info text-center'},
  ];

  public config: any = {
    className: ['table-striped table-bordered mb-0 d-table-fixed']
  };
}
