import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';

import { RequisicionesService } from '../../../service/requisiciones/requisiciones.service';
import { ModalDirective } from 'ngx-bootstrap/modal/public_api';

declare var $: any;

@Component({
  selector: 'app-dt-direcion-requi',
  templateUrl: './dt-direcion-requi.component.html',
  styleUrls: ['./dt-direcion-requi.component.scss'],
  providers: [RequisicionesService]
})
export class DtDirecionRequiComponent implements OnInit {
  @Input() DireccionId: string;
  @ViewChild('RutasModal') ShownModal: ModalDirective;
  getAddress: boolean;
  public rows: Array<any> = [];
  isModalRutasShown: boolean = false;
  rutasCamion: any;
  rowAux = [];
  constructor(private service: RequisicionesService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    if (this.DireccionId != null) {
      this.getDireccion(this.DireccionId);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes.DireccionId && !changes.DireccionId.isFirstChange()) {
      if (this.DireccionId != null) {
        this.getDireccion(this.DireccionId);
      }
    }

  }

  getDireccion(id) {
    this.service.getRequiDireccion(id)
      .subscribe(data => {
        this.rows = data;
      })
  }

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

  public onCellClick(data: any): any {
    data.selected ? data.selected = false : data.selected = true;

    if(this.rowAux.length == 0)
    {
      this.rowAux = data;
    }
    else if(data.selected && this.rowAux != [])
    {
      var aux = data;
      data = this.rowAux;
      data.selected = false;
      aux.selected = true;
      this.rowAux = aux;
    }
  }

  closeModalRutasCamion()
  {
    this.ShownModal.hide();
    this.isModalRutasShown = false;
  }

}
