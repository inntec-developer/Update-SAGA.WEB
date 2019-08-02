import { AfterContentChecked, Component, Input, SimpleChanges } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-dt-telefonos',
  templateUrl: './dt-telefonos.component.html',
  styleUrls: ['./dt-telefonos.component.scss']
})
export class DtTelefonosComponent  {
  @Input() Telefonos: any[];
  @Input() Perfil290: any;
  getPhone : boolean = false;
  public rows: Array<any> = [];
  rowAux = [];
  constructor() { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.Perfil290 = this.Perfil290 || false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.Telefonos && !changes.Telefonos.isFirstChange()){
      this.cargarTelefonos(this.Telefonos);
    }
  }

  cargarTelefonos(data){
    // if(!this.getPhone){
      this.rows = data;
    //   this.getPhone = true;
    // }
  }

  public columns: Array<any> = [
    {title: 'Dirección', className: 'text-success text-center'},
    {title: 'Tipo Teléfono', className: 'text-info text-center'},
    {title: 'Teléfono', className: 'text-info text-center'},
    {title: 'Extensión', className: 'text-info text-center'},
    {title: 'Activo', className: 'text-info text-center'},
    {title: 'Principal', className: 'text-info text-center'}
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
