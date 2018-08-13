import { Component, Input, OnInit } from '@angular/core';

import { RequisicionesService } from './../../../../../service/requisiciones/requisiciones.service';

declare var $: any;

@Component({
  selector: 'app-dt-direcion-requi',
  templateUrl: './dt-direcion-requi.component.html',
  styleUrls: ['./dt-direcion-requi.component.scss'],
  providers: [RequisicionesService]
})
export class DtDirecionRequiComponent implements OnInit {
  @Input() DireccionId: string;
  getAddress : boolean;
  public rows: Array<any> = [];
  constructor(private service: RequisicionesService) { }

  ngOnInit() {
  }

  ngAfterContentChecked() {
    if(this.DireccionId != null){
      this.getDireccion(this.DireccionId);
    }
  }

  getDireccion(id){
    if(!this.getAddress){
      this.service.getRequiDireccion(id)
      .subscribe(data => {
        this.rows = data;
        this.getAddress = true;
        console.log(this.rows);
      })
      this.getAddress = true;
    }
  }

  public columns: Array<any> = [
    {title: 'Tipo Dirección', className: 'text-info text-center'},
    {title: 'Pais', className: 'text-info text-center'},
    {title: 'Estado', className: 'text-info text-center'},
    {title: 'Municipio', className: 'text-info text-center'},
    {title: 'Colonia', className: 'text-info text-center'},
    {title: 'Calle', className: 'text-info text-center'},
    {title: 'Numero Ext.', className: 'text-info text-center'},
    {title: 'Numero Int.', className: 'text-info text-center'},
    {title: 'Codigo Postal', className: 'text-info text-center'},
    {title: 'Activo', className: 'text-info text-center'},
    {title: 'Principal', className: 'text-info text-center'},
  ];

  public config: any = {
    className: ['table-striped table-bordered mb-0 d-table-fixed']
  };

  public onCellClick(data: any): any {
    /* add an class 'active' on click */
    $('#resultDataTable').on('click', 'tr', function (event: any) {
        //noinspection TypeScriptUnresolvedFunction
        $(this).addClass('selected').siblings().removeClass('selected');
    });
  }

}
