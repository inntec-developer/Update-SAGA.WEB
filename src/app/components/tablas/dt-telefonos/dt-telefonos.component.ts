import { AfterContentChecked, Component, Input, SimpleChanges, OnChanges, OnInit } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-dt-telefonos',
  templateUrl: './dt-telefonos.component.html',
  styleUrls: ['./dt-telefonos.component.scss']
})
export class DtTelefonosComponent implements OnInit, OnChanges {
  @Input() Telefonos: any[];
  @Input() Perfil290: any;
  getPhone = false;
  public rows: Array<any> = [];
  rowAux = [];
  public columns: Array<any> = [
    {title: 'Dirección', className: 'text-success text-center'},
    {title: 'Tipo Teléfono', className: 'text-center text-info'},
    {title: 'Teléfono', className: 'text-center text-info'},
    {title: 'Extensión', className: 'text-center text-info'},
    {title: 'Activo', className: 'text-center text-info'},
    {title: 'Principal', className: 'text-center text-info'}
  ];

  public config: any = {
    className: ['table-striped table-bordered mb-0 d-table-fixed']
  };
  constructor() { }

  ngOnInit(): void {
    this.Perfil290 = this.Perfil290 || false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.Telefonos && !changes.Telefonos.isFirstChange()) {
      this.cargarTelefonos(this.Telefonos);
    }
  }

  cargarTelefonos(data) {
      this.rows = data;
  }

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
