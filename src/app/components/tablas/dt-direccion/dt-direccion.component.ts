import { Component, Input, OnInit, } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-dt-direccion',
  templateUrl: './dt-direccion.component.html',
  styleUrls: ['./dt-direccion.component.scss']
})
export class DtDireccionComponent implements OnInit {
  @Input() Direcciones : any[];
  getAddress : boolean = false;
  public rows: Array<any> = [];
  constructor() { }

  ngOnInit() {
  }
  
  ngAfterContentChecked(){
    if(this.Direcciones != null){
      this.cargarDirecciones(this.Direcciones);
    }
  }

  cargarDirecciones(data){
    if(!this.getAddress){
        this.rows = data;
        this.getAddress = true;        
    }
  }

  
  
  public columns: Array<any> = [
    {title: 'Tipo Dirección', className: 'text-info text-center'},
    {title: 'País', className: 'text-info text-center'},
    {title: 'Estado', className: 'text-info text-center'},
    {title: 'Municipio', className: 'text-info text-center'},
    {title: 'Colonia', className: 'text-info text-center'},
    {title: 'Calle', className: 'text-info text-center'},
    {title: 'Número Ext.', className: 'text-info text-center'},
    {title: 'Número Int.', className: 'text-info text-center'},
    {title: 'Código Postal', className: 'text-info text-center'},
    {title: 'Activo', className: 'text-info text-center'},
    {title: 'Principal', className: 'text-info text-center'},
  ];

  public config: any = {
    className: ['table-striped table-bordered mb-0 d-table-fixed']
  };

  public onCellClick(data: any): any {
    data.selected ? data.selected = false : data.selected = true;
    /* add an class 'active' on click */
    // $('#resultDataTable').on('click', 'tr', function (event: any) {
    //     //noinspection TypeScriptUnresolvedFunction
    //     $(this).addClass('selected').siblings().removeClass('selected');
    // });
  }

}
