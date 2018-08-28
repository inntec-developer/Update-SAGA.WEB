import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dt-contactos',
  templateUrl: './dt-contactos.component.html',
  styleUrls: ['./dt-contactos.component.scss']
})
export class DtContactosComponent implements OnInit {
  @Input() Contactos: any[];
  getPhone : boolean = false;
  public rows: Array<any> = [];
  constructor() { }

  ngOnInit() {
  }

  ngAfterContentChecked(){
    if(this.Contactos != null){
      this.cargarContactos(this.Contactos);
    }
  }

  cargarContactos(data){
    if(!this.getPhone){
      this.rows =  data;
      this.getPhone = true;
    }
  }
  public columns: Array<any> = [
    {title: 'Nombre', className: 'text-info text-center'},
    {title: 'Puesto', className: 'text-info text-center'},
    {title: 'Tipo Teléfono', className: 'text-info text-center'},
    {title: 'Extensión', className: 'text-info text-center'},
    {title: 'Teléfono', className: 'text-info text-center'},
    {title: 'Email', className: 'text-info text-center'},
  ]
  public config: any = {
    className: ['table-striped table-bordered mb-0 d-table-fixed']
  };
}

