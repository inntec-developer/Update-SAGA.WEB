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
  ShowModalRutas = false;
  public Direccion: string;
  public getAddress = false;
  public rows: any = [];
  public element: any = [];
  public damfoId: any;
  public rowAux = [];
  public selected = false;

  public columns: Array<any> = [
    { title: 'Tipo Dirección', className: 'text-center text-success' },
    { title: 'País', className: 'text-center text-info' },
    { title: 'Estado', className: 'text-center text-info' },
    { title: 'Municipio', className: 'text-center text-info' },
    { title: 'Colonia', className: 'text-center text-info' },
    { title: 'Calle', className: 'text-center text-info' },
    { title: 'Número Ext.', className: 'text-center text-info' },
    { title: 'Número Int.', className: 'text-center text-info' },
    { title: 'Código Postal', className: 'text-center text-info' },
    { title: 'Activo', className: 'text-center text-info' },
    { title: 'Principal', className: 'text-center text-info' },
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

    if (this.rowAux.length === 0) {
      this.rowAux = data;
    } else if (data.selected && this.rowAux !== []) {
      const aux = data;
      data = this.rowAux;
      data.selected = false;
      aux.selected = true;
      this.rowAux = aux;
    }
  }

}
