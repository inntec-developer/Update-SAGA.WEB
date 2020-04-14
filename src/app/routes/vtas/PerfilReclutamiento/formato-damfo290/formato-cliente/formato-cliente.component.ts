import { DtDireccionComponent } from './../../../../../components/tablas/dt-direccion/dt-direccion.component';
import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
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
  @Input() ctrlContratos: any;

  public formCliente: FormGroup;
  select: any;
  AuxOptions: any;
  Cliente: any;
  Direcciones: any = [];
  Telefonos: any = [];
  Contactos: any = [];
  isPerfilReclutamiento = true;
  DisableComponente = false;
  options: any;

  // { id: 1, tipoReclutamiento: 'Puro' },
  // { id: 2, tipoReclutamiento: 'Subcontratación' },
  // { id: 3, tipoReclutamiento: 'Staff' }
  TiposReclutamientos = [];

  // { id: 1, calsesReclutamiento: 'Especializado' },
  // { id: 2, calsesReclutamiento: 'Operativo' },
  // { id: 3, calsesReclutamiento: 'Masivo' }
  ClasesReclutamientos = [];

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
  verDT = false;


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

    this.GetClasesTiposRecl();
    this.markFormGroupTouched(this.formCliente);

  }
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  selectTipo() {
    this.ctrlContratos.formEncabezado.controls['Contrato'].reset();
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

  GetClasesTiposRecl() {
    this._servicePerfilR.getTiposClasesRecl().subscribe( result => {
      this.TiposReclutamientos = result.tipos;
      this.ClasesReclutamientos = result.clases;
    });
  }
  filter($event) {
    if ( $event.keyCode !== 40 && $event.keyCode !== 38 ) {
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
        }
        // else {
        //   this.popToast('error', 'Oops!!', 'No se encontraron resultados con ' + filter + ' intente de nuevo.');
        //   if (this.Cliente != null) {
        //     this.formCliente.controls['RazonSocial'].setValue(this.Cliente[0]['razonSocial']);
        //   }

        // }
      });
    } else if (filter === '') {
      this.Borrar();
    }
  }
  }


  selected(event: any) {
    this.Direcciones = [];
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

  Borrar() {
    this.AuxOptions = [];
    this.formCliente.controls['RazonSocial'].reset();
    this.formCliente.controls['RazonSocial'].markAsUntouched();
    this.formCliente.controls['NombreComercial'].reset();
    this.formCliente.controls['RFC'].reset();
    this.formCliente.controls['Giro'].reset();
    this.formCliente.controls['Actividad'].reset();
    this.formCliente.controls['Tipo'].reset();
    this.formCliente.controls['Clase'].reset();

    this.Direcciones = [];
    this.Telefonos = [];
    this.Contactos = [];
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
