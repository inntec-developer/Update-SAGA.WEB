import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-dt-beneficios',
  templateUrl: './dt-beneficios.component.html',
  styleUrls: ['./dt-beneficios.component.scss']
})
export class DtBeneficiosComponent implements OnInit {
  @Input() Beneficios: any[];
  getBeneficio = false;
  public rows: Array<any> = [];
  rowAux = [];
  verTabla = true;
  constructor() { }

  ngOnInit() {
  }


  ngOnChanges(changes: SimpleChanges): void {
    if(changes.Beneficios && !changes.Beneficios.isFirstChange()){
      this.cargarBeneficios(this.Beneficios);
    }
  }

  cargarBeneficios(data){
    if(!this.getBeneficio){
      this.rows = data;
      this.getBeneficio = true;
    }
  }

  public columns: Array<any> = [
    {title: 'Beneficio', className: 'text-info'},
    {title: 'Cantidad', className: 'text-info'},
    {title: 'Observaciones', className: 'text-info'},
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

