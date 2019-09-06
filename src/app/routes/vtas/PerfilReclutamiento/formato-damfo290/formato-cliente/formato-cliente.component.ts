import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { PerfilReclutamientoService } from './../../../../../service/PerfilReclutamiento/perfil-reclutamiento.service';
import { SettingsService } from '../../../../../core/settings/settings.service';

declare var google: any;

@Component({
  selector: 'app-formato-cliente',
  templateUrl: './formato-cliente.component.html',
  styleUrls: ['./formato-cliente.component.scss'],
  providers: [PerfilReclutamientoService]
})
export class FormatoClienteComponent implements OnInit, OnChanges {
  @Input() IdFormato: any;

  public formCliente: FormGroup;
  select: any;
  AuxOptions: any;
  Cliente: any;
  Direcciones: any;
  Telefonos: any;
  Contactos: any;
  isPerfilReclutamiento = true;
  DisableComponente = false;
  options: any;

  TiposReclutamientos = [
    { id: 1, tipoReclutamiento: 'Puro' },
    { id: 2, tipoReclutamiento: 'Subcontratación' },
    { id: 3, tipoReclutamiento: 'Staff' }
  ];

  ClasesReclutamientos = [
    { id: 1, calsesReclutamiento: 'Especializado' },
    { id: 2, calsesReclutamiento: 'Operativo' },
    { id: 3, calsesReclutamiento: 'Masivo' }
  ];

  /*Mensajes del sistema */
  toaster: any;
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right',
    limit: 7,
    tapToDismiss: false,
    showCloseButton: true,
    mouseoverTimerStop: true,
  });


  constructor(
    private toasterService: ToasterService,
    private settings: SettingsService,
    public fb: FormBuilder,
    private _servicePerfilR: PerfilReclutamientoService
  ) {
    this.formCliente = new FormGroup({
      RazonSocial: new FormControl('', [Validators.required]),
      NombreComercial: new FormControl(''),
      RFC: new FormControl(''),
      Giro: new FormControl(''),
      Actividad: new FormControl(''),
      Tipo: new FormControl('', Validators.required),
      Clase: new FormControl('', Validators.required),
    });

  }

  ngOnInit() {
    this.formCliente = this.fb.group({
      RazonSocial: [{ value: '', disabled: this.DisableComponente }],
      NombreComercial: [{ value: '', disabled: true }],
      RFC: [{ value: '', disabled: true }],
      Giro: [{ value: '', disabled: true }],
      Actividad: [{ value: '', disabled: true }],
      Tipo: ['', Validators.required],
      Clase: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.IdFormato != null) {
      this.DisableComponente = true;
      this._servicePerfilR.getClienteId(this.IdFormato).subscribe(data => {
        if (data != null && data !== 404) {
          this.Cliente = data;
          this.formCliente.controls['Tipo'].setValue(this.Cliente['tipo']);
          this.formCliente.controls['Clase'].setValue(this.Cliente['clase']);
          this.formCliente.controls['RazonSocial'].setValue(this.Cliente['razonSocial'].toUpperCase());
          this.formCliente.controls['NombreComercial'].setValue(this.Cliente['nombrecomercial'].toUpperCase());
          this.formCliente.controls['RFC'].setValue(this.Cliente['rfc'].toUpperCase());
          this.formCliente.controls['Giro'].setValue(this.Cliente['giroEmpresa'].toUpperCase());
          this.formCliente.controls['Actividad'].setValue(this.Cliente['actividadEmpresa'].toUpperCase());

          this._servicePerfilR.getInfoCliente(this.Cliente['clienteId']).subscribe(x => {
            this.Direcciones = x['direcciones'];
            this.Telefonos = x['telefonos'];
            this.Contactos = x['contactos'];
          });

        } else {
          this.popToast('error', 'Oops!!', 'Algo salío mal al intentar recuperar la información.');
        }
      });
    }
  }



  filter() {
    const filter = this.formCliente.get('RazonSocial').value;
    if (filter !== '' || filter != null && filter.length > 5) {
      this._servicePerfilR.getClientes(filter).subscribe(data => {
        if (data != null && data.length > 0 && data !== 404) {
          this.options = data;
          this.AuxOptions = this.options.filter(element => {
            return element['razonSocial'].toString().toLowerCase().match(filter.toString().toLowerCase()) ||
              element['rfc'].toString().toLowerCase().match(filter.toString().toLowerCase()) ||
              element['nombrecomercial'].toString().toLowerCase().match(filter.toString().toLowerCase());
          });
        } else {
          this.popToast('error', 'Oops!!', 'No se encontraron resultados con ' + filter + ' intente de nuevo.');
          if (this.Cliente != null) {
            this.formCliente.controls['RazonSocial'].setValue(this.Cliente[0]['razonSocial']);
          }

        }
      });
    }
  }


  selected(event: any) {
    this.select = event['option']['value'];
    this.Cliente = this.AuxOptions.filter(element => {
      return element['razonSocial'].toString().toLowerCase().match(this.select.toString().toLowerCase());
    });
    this.formCliente.controls['NombreComercial'].setValue(this.Cliente[0]['nombrecomercial'].toUpperCase());
    this.formCliente.controls['RFC'].setValue(this.Cliente[0]['rfc'].toUpperCase());
    this.formCliente.controls['Giro'].setValue(this.Cliente[0]['giroEmpresa'].toUpperCase());
    this.formCliente.controls['Actividad'].setValue(this.Cliente[0]['actividadEmpresa'].toUpperCase());
    this._servicePerfilR.getInfoCliente(this.Cliente[0]['id']).subscribe(data => {
      this.Direcciones = data['direcciones'];
      this.Telefonos = data['telefonos'];
      this.Contactos = data['contactos'];
    });
  }

  popToast(type: any, title: any, body: any) {

    const toast: Toast = {
      type: type,
      title: title,
      timeout: 4000,
      body: body
    };
    this.toasterService.pop(toast);
  }
}
