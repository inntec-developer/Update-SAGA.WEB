import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ClientesService } from '../../../../service/clientes/clientes.service';
import { FileManagerComponent } from './../../../../components/file-manager/file-manager.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-editar-clientes',
  templateUrl: './editar-clientes.component.html',
  styleUrls: ['./editar-clientes.component.scss'],
  providers: [ClientesService]
})
export class EditarClientesComponent implements OnInit {
  private ClienteId: any;
  private Cliente: any = [];
  Direcciones: any = [];
  Telefonos: any = [];
  Emails: any = [];
  Contactos: any = [];
  EntidadId: any;

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
        this.getInfoCliente(this.ClienteId)
      } else {
        this._Router.navigate(['/ventas/directorio']);
      }
    });
  }

  ngOnInit() {
  }

  changeData(data){
    var DireccionIndexUpdate = this.Direcciones.findIndex(x => x.id == data.id)
    if(DireccionIndexUpdate != null){
      this.Direcciones[DireccionIndexUpdate] = data;
    }else{
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
        console.log('Cliente',this.Cliente);
        console.log('Direcciones', this.Direcciones);
        console.log('Telefonos', this.Telefonos);
        console.log('Correos', this.Emails);
        console.log('Contactos', this.Contactos);
      }
    });
  }

}
