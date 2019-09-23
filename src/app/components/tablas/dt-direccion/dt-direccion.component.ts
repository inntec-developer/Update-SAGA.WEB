import { Component, Input, OnChanges, OnInit, SimpleChanges, } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-dt-direccion',
  templateUrl: './dt-direccion.component.html',
  styleUrls: ['./dt-direccion.component.scss']
})
export class DtDireccionComponent implements OnInit, OnChanges {
  @Input() Direcciones: any[];
  @Input() Perfil290: boolean;
  ShowModal = false;
  public Direccion: string;
  public getAddress = false;
  public rows: Array<any> = [];
  public element: any = [];
  public damfoId: any;
  public rowAux = [];
  public selected = false;

  public columns: Array<any> = [
    { title: 'Tipo Dirección', className: 'text-info text-center' },
    { title: 'País', className: 'text-info text-center' },
    { title: 'Estado', className: 'text-info text-center' },
    { title: 'Municipio', className: 'text-info text-center' },
    { title: 'Colonia', className: 'text-info text-center' },
    { title: 'Calle', className: 'text-info text-center' },
    { title: 'Número Ext.', className: 'text-info text-center' },
    { title: 'Número Int.', className: 'text-info text-center' },
    { title: 'Código Postal', className: 'text-info text-center' },
    { title: 'Activo', className: 'text-info text-center' },
    { title: 'Principal', className: 'text-info text-center' },
  ];
  public config: any = {
    className: ['table-striped table-bordered mb-0 d-table-fixed']
  };
  constructor() { }

  ngOnInit() {
    this.Perfil290 = this.Perfil290 || false
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.Direcciones && !changes.Direcciones.isFirstChange()) {
      this.cargarDirecciones(this.Direcciones);
    }
  }

  cargarDirecciones(data) {
    this.rows = data;
  }
  public onCellClick(data: any): any {
    debugger;
    this.Direccion = data['calle'] + ' ' +
      data['numeroExterior'] + ', ' +
      data['colonia'] + ', ' +
      data['municipio'] + ', ' +
      data['estado'] + ', ' + data['pais'];
    this.element = data;
    this.damfoId = data.id;

    data.selected ? data.selected = false : data.selected = true;

    if (!data.selected) {
      this.selected = false;
    } else {
      this.selected = true;
    }

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
