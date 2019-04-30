import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ClientesService } from '../../../../service/clientes/clientes.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SettingsService } from '../../../../core/settings/settings.service';

@Component({
  selector: 'app-ver-cliente',
  templateUrl: './ver-cliente.component.html',
  styleUrls: ['./ver-cliente.component.scss'],
  providers: [ClientesService]
})
export class VerClienteComponent implements OnInit {
  public ClienteId: any;
  public Cliente: any;
  public esCliente: boolean;

  //scroll
  public disabled = false;
  public compact = false;
  public invertX = false;
  public invertY = false;
  public shown = 'hover';
  public imprimir: boolean;
  constructor(
    private spinner: NgxSpinnerService,
    private _Router: Router,
    private _Route: ActivatedRoute,
    private _service: ClientesService,
    public settings: SettingsService,
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

  editarCliente(){
    this._Router.navigate(['/ventas/editarCliente', this.ClienteId], { skipLocationChange: true });
  }

  print(){
    this.imprimir = true;
    if(!this.settings.layout.isCollapsed){
        this.settings.layout.isCollapsed = !this.settings.layout.isCollapsed;
    }
    setTimeout(() => {
      document.getElementById('content').style.marginLeft = "60px";
      document.getElementById('content').style.marginTop = "25px";
      window.print();
    }, 500);
    setTimeout(() => {
      this.imprimir = false;
      document.getElementById('content').style.marginTop = "0";
      document.getElementById('content').style.marginLeft = "0";
    }, 500);

  }

}
