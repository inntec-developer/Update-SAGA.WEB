import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Cliente } from './../../../../models/vtas/Cliente';
import { ClientesService } from '../../../../service/clientes/clientes.service';
import { FileManagerComponent } from './../../../../components/file-manager/file-manager.component';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-editar-clientes',
  templateUrl: './editar-clientes.component.html',
  styleUrls: ['./editar-clientes.component.scss'],
  providers: [ClientesService]
})
export class EditarClientesComponent implements OnInit {
  private ClienteId: any;
  public Cliente: any = [];
  Direcciones: any = [];
  Telefonos: any = [];
  Emails: any = [];
  Contactos: any = [];
  EntidadId: any;
  ruta = 1;

  constructor(
    private spinner: NgxSpinnerService,
    private _Router: Router,
    private _Route: ActivatedRoute,
    private _service: ClientesService
  ) {
    // this.spinner.show();
    this._Route.queryParams.subscribe(params => {
      if (params['ClienteId'] != null) {
        this.ClienteId = params['ClienteId'];
        this.ruta = params['ruta'];
        this.getInfoCliente(this.ClienteId);
      } else {
        this._Router.navigate(['/ventas/directorio'], { queryParams: {ruta: this.ruta}, skipLocationChange: true});
      }
    });
  }

  ngOnInit() {
  }

//   regresar() {
//     const navigationExtras: NavigationExtras = {
//       queryParams: {
//          'ruta': this.ruta
//       },
//       skipLocationChange: true
//     };
//     debugger;
//     this._Router.navigate(['/ventas/directorio'], navigationExtras);
// }

  changeData(data) {
    const DireccionIndexUpdate = this.Direcciones.findIndex(x => x.id == data.id)
    if(DireccionIndexUpdate != null){
      this.Direcciones[DireccionIndexUpdate] = data;
    } else {
      this.Direcciones.push(data);
    }

    this.Telefonos.forEach(telefono =>{
      if(telefono['direccionId'] == data.id){
        telefono['calle'] = data.calle + ' No. ' + data.numeroExterior + ' C.P. ' + data.codigoPostal;
      }
    });

    this.Emails.forEach(email =>{
      if(email['direccionId'] == data.id){
        email['calle'] = data.calle + ' No. ' + data.numeroExterior + ' C.P. ' + data.codigoPostal;
      }
    });
  }

  deleteData(ClienteId){
    this.getInfoCliente(ClienteId)
  }

  getInfoCliente(ClienteId){
    this._service.getCliente(ClienteId).subscribe(result => {
      if (result != null) {
        this.Cliente = {
          Id: result.id,
          RazonSocial: result.razonSocial,
          NombreComercial: result.nombreComercial,
          RFC: result.rfc,
          TamanoEmpresa: result.tamanoEmpresa,
          NumeroEmpleados: result.numeroEmpleados,
          GiroEmpresa: result.giroEmpresa,
          ActividadEmpresa: result.actividadEmpresa,
          TipoEmpresa: result.tipoEmpresa,
          TipoBase: result.tipoBase,
          esCliente: result.esCliente,
          Clasificacion: result.clasificacion
        }
        this.EntidadId = result.id;
        this.Direcciones = result.direcciones;
        this.Telefonos = result.telefonos;
        this.Emails = result.correos;
        this.Contactos = result.contactos;
      }
    });
  }

}
