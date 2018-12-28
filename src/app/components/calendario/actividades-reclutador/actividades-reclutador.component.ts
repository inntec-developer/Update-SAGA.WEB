import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

import { log } from 'util';

@Component({
  selector: 'app-actividades-reclutador',
  templateUrl: './actividades-reclutador.component.html',
  styleUrls: ['./actividades-reclutador.component.scss']
})
export class ActividadesReclutadorComponent implements OnInit {
  @Input('Pendientes') Pendientes: any = [];
  @Input('Hoy') Hoy: any = [];
  @Input('Siguientes') Siguientes: any = [];

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // console.log('Pendientes', this.Pendientes)
    // console.log('Hoy',this.Hoy);
    // console.log('Siguientes',this.Siguientes);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.Pendientes && !changes.Pendientes.isFirstChange()) {
      console.log('Pendientes', this.Pendientes)
    }
    if (changes.Hoy && !changes.Hoy.isFirstChange()) {
      console.log('Hoy',this.Hoy);
    }
    if (changes.Siguientes && !changes.Siguientes.isFirstChange()) {
      console.log('Siguientes',this.Siguientes);
    }
  }

  /* Estructura y configuracion de tablas */
  public columns: Array<any> = [
    { title: 'Actividad', className: 'text-info text-center' },
    { title: 'Titulo', className: 'text-info text-center' },
    { title: 'Inicio', className: 'text-info text-center' },
    { title: 'Fin', className: 'text-info text-center' }
  ];

  public config: any = {
    className: ['table-striped table-bordered mb-0 d-table-fixed']
  };

  public onCellClick(data: any): any {
    console.log(data);
  }

}
