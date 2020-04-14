import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-dt-contactos',
  templateUrl: './dt-contactos.component.html',
  styleUrls: ['./dt-contactos.component.scss']
})
export class DtContactosComponent implements OnInit {
  @Input() Contactos: any[];
  getPhone = false;
  public rows: Array<any> = [];
  rowAux = [];

  public columns: Array<any> = [
    { title: 'Dirección', className: 'text-success text-center' },
    { title: 'Nombre', className: 'text-info text-center' },
    { title: 'Puesto', className: 'text-info text-center' },
    { title: 'Teléfono', className: 'text-info text-center' },
    { title: 'Email', className: 'text-info text-center' },
  ];
  public config: any = {
    className: ['table-striped table-bordered mb-0 d-table-fixed']
  };
  constructor() { }
  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.Contactos && !changes.Contactos.isFirstChange()) {
      this.cargarContactos(this.Contactos);
    }
  }

  cargarContactos(data) {
    //   if(!this.getPhone){
    this.rows = data;
    //   this.getPhone = true;
    // }
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

