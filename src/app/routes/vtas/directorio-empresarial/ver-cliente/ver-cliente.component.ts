import { DirectorioEmpresarialComponent } from './../directorio-empresarial.component';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ClientesService } from '../../../../service/clientes/clientes.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SettingsService } from '../../../../core/settings/settings.service';

@Component({
  selector: 'app-ver-cliente',
  templateUrl: './ver-cliente.component.html',
  styleUrls: ['./ver-cliente.component.scss'],
  providers: [ClientesService, DirectorioEmpresarialComponent ]
})
export class VerClienteComponent implements OnInit {
  public ClienteId: any;
  public Cliente: any = [];
  public esCliente: boolean;
  public oneAtATime: boolean;

  isOpen1 = false;
  isOpen2 = false;
  isOpen3 = false;
  // scroll
  public disabled = false;
  public compact = false;
  public invertX = false;
  public invertY = false;
  public shown = 'hover';
  public imprimir: boolean;
  ruta: any;
  constructor(
    private spinner: NgxSpinnerService,
    private _Router: Router,
    private _Route: ActivatedRoute,
    private _service: ClientesService,
    public settings: SettingsService
  ) {
    this._Route.queryParams.subscribe(params => {
      if (params['ClienteId'] != null) {
        this.ClienteId = params['ClienteId'];
        this.ruta = params['ruta'];
       this.GetDtosClientes();
      } else {
        const navigationExtras: NavigationExtras = {
          queryParams: {
             'ruta': this.ruta
          },
          skipLocationChange: true
        };
        this._Router.navigate(['/ventas/directorio'], navigationExtras);
      }
    });
  }

  GetDtosClientes() {
    this._service.getCliente(this.ClienteId).subscribe(result => {
      this.spinner.hide();
      if (result != null) {
        this.Cliente = result;
        console.log(this.Cliente)
        this.esCliente = result['esCliente'];
      }
    });
  }
  regresar() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
         'ruta': this.ruta
      },
      skipLocationChange: true
    };
    this._Router.navigate(['/ventas/directorio'], navigationExtras);
  }
  ngOnInit() {
    this.spinner.show();
    this.oneAtATime = false;
  }

  editarCliente() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        'ClienteId': this.ClienteId,
         'ruta': this.ruta
      },
      skipLocationChange: true
    };
    this._Router.navigate(['/ventas/editarCliente'], navigationExtras);
  }

  print() {
    this.imprimir = true;
    if (!this.settings.layout.isCollapsed) {
        this.settings.layout.isCollapsed = !this.settings.layout.isCollapsed;
    }
    setTimeout(() => {
      document.getElementById('content').style.marginLeft = '60px';
      document.getElementById('content').style.marginTop = '25px';
      window.print();
    }, 500);
    setTimeout(() => {
      this.imprimir = false;
      document.getElementById('content').style.marginTop = '0';
      document.getElementById('content').style.marginLeft = '0';
    }, 500);

  }

}
