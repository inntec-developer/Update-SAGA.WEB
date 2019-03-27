import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ClientesService } from '../../../../service/clientes/clientes.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-editar-clientes',
  templateUrl: './editar-clientes.component.html',
  styleUrls: ['./editar-clientes.component.scss'],
  providers: [ClientesService]
})
export class EditarClientesComponent implements OnInit {
  private ClienteId: any;
  private Cliente: any = [];

  constructor(
    private spinner: NgxSpinnerService,
    private _Router: Router,
    private _Route: ActivatedRoute,
    private _service: ClientesService
  ) {
    // this.spinner.show();
    this._Route.params.subscribe(params => {
      if (params['ClienteId'] != null) {
        this.ClienteId = params['ClienteId'];
        this._service.getCliente(this.ClienteId).subscribe(result => {
          debugger;
          if (result != null) {
            this.Cliente = result;
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
