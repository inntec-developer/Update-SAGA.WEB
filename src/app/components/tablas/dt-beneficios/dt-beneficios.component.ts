import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dt-beneficios',
  templateUrl: './dt-beneficios.component.html',
  styleUrls: ['./dt-beneficios.component.scss']
})
export class DtBeneficiosComponent implements OnInit {
  @Input() Beneficios : any[];
  getBeneficio : boolean = false;
  public rows: Array<any> = [];
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
      this.rows = data;
      this.getBeneficio = true;
    }
  }

  public columns: Array<any> = [
    {title: 'Beneficio', className: 'text-info text-center'},
    {title: 'Cantidad', className: 'text-info text-center'},
    {title: 'Observaciones', className: 'text-info text-center'},
  ];

  public config: any = {
    className: ['table-striped table-bordered mb-0 d-table-fixed']
  };
}

