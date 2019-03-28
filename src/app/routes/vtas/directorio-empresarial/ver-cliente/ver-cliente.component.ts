import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ClientesService } from '../../../../service/clientes/clientes.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-ver-cliente',
  templateUrl: './ver-cliente.component.html',
  styleUrls: ['./ver-cliente.component.scss'],
  providers: [ClientesService]
})
export class VerClienteComponent implements OnInit {
  private ClienteId: any;
  private Cliente: any = [];
  private esCliente: boolean;

  //scroll
  disabled = false;
  compact = false;
  invertX = false;
  invertY = false;
  shown = 'hover';
  constructor(
    private spinner: NgxSpinnerService,
    private _Router: Router,
    private _Route: ActivatedRoute,
    private _service: ClientesService
  ) {
    this._Route.params.subscribe(params => {
      if (params['ClienteId'] != null) {
        this.ClienteId = params['ClienteId'];
        this._service.getCliente(this.ClienteId).subscribe(result => {
          if (result != null) {
            this.Cliente = result;
            this.esCliente = result['esCliente'];
            console.log(this.Cliente);
          }
        });
      } else {
        this._Router.navigate(['/ventas/directorio']);
      }
    });
  }

  ngOnInit() {
  }

}
