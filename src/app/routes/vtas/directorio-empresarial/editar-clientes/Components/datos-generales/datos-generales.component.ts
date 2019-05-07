import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { CatalogosService } from '../../../../../../service';
import { ClientesService } from '../../../../../../service/clientes/clientes.service';
import { CompanyValidation } from '../../../prospectos/nuevo-prospecto/company-validation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-datos-generales',
  templateUrl: './datos-generales.component.html',
  styleUrls: ['./datos-generales.component.scss'],
  providers: [CatalogosService, ClientesService]
})
export class DatosGeneralesComponent implements OnInit {
  @Input('DatosGenerales') DatosGenerales: any = [];

  public formGeneral: FormGroup;
  private Usuario: string;
  public esCliente: any;
  public ClienteId: any;

  public loading: boolean = false;

  public isReadonly: boolean = false;
  public maxRat: number = 3;
  public clf: number = 1;
  public overStar: number;
  public percent: number;

  public giros: any;
  public actividades: any;
  public tamanioEmpresa: any;
  public tipo: any;
  public tipoBase: any;



  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _CatalogoService: CatalogosService,
    private _ClienteService: ClientesService,
    private toasterService: ToasterService
  ) {
    this.formGeneral = new FormGroup({
      Empresa: new FormControl('', [Validators.required]),
      ValidarEmpresa: new FormControl('', [Validators.required]),
      Giros: new FormControl('', Validators.required),
      Actividades: new FormControl('', Validators.required),
      NoEmpleados: new FormControl('', [Validators.required, Validators.min(1), Validators.max(99999)]),
      Tamanio: new FormControl('', Validators.required),
      Tipo: new FormControl('', Validators.required),
      TipoBase: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.Usuario = sessionStorage.getItem('usuario');
    this.getCatalogos();


  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.DatosGenerales && !changes.DatosGenerales.isFirstChange()) {
      this.ClienteId = this.DatosGenerales['Id'];
      this.esCliente = this.DatosGenerales['esCliente'];
      this.clf = this.DatosGenerales['Clasificacion'];
      if (this.esCliente) {
        this.formGeneral = this.fb.group({
          RazonSocial: ['', [Validators.required]],
          RFC: ['', [Validators.required, Validators.maxLength(12), Validators.minLength(12)]],
          Empresa: ['', [Validators.required]],
          ValidarEmpresa: ['', [Validators.required]],
          Giros: ['', Validators.required],
          Actividades: ['', Validators.required],
          NoEmpleados: ['', Validators.required],
          Tamanio: ['', Validators.required],
          Tipo: ['', Validators.required],
          TipoBase: ['', Validators.required],
        }, { validator: CompanyValidation.MachCompany });
        this.formGeneral.controls['RazonSocial'].setValue(this.DatosGenerales['RazonSocial']);
        this.formGeneral.controls['RFC'].setValue(this.DatosGenerales['RFC']);
        this.formGeneral.controls['Empresa'].setValue(this.DatosGenerales['NombreComercial']);
        this.formGeneral.controls['ValidarEmpresa'].setValue(this.DatosGenerales['NombreComercial']);
        this.formGeneral.controls['Giros'].setValue(this.DatosGenerales['GiroEmpresa']['id'])
        this.getActividades();
        this.formGeneral.controls['Actividades'].setValue(this.DatosGenerales['ActividadEmpresa']['id']);
        this.formGeneral.controls['NoEmpleados'].setValue(this.DatosGenerales['NumeroEmpleados']);
        this.formGeneral.controls['Tamanio'].setValue(this.DatosGenerales['TamanoEmpresa']['id']);
        this.formGeneral.controls['Tipo'].setValue(this.DatosGenerales['TipoEmpresa']['id']);
        this.formGeneral.controls['TipoBase'].setValue(this.DatosGenerales['TipoBase']['id']);
      }
      else {
        this.formGeneral = this.fb.group({
          Empresa: ['', [Validators.required]],
          ValidarEmpresa: ['', [Validators.required]],
          Giros: ['', Validators.required],
          Actividades: ['', Validators.required],
          NoEmpleados: ['', Validators.required],
          Tamanio: ['', Validators.required],
          Tipo: ['', Validators.required],
          TipoBase: ['', Validators.required],
        }, { validator: CompanyValidation.MachCompany });
        this.formGeneral.controls['Empresa'].setValue(this.DatosGenerales['NombreComercial']);
        this.formGeneral.controls['ValidarEmpresa'].setValue(this.DatosGenerales['NombreComercial']);
        this.formGeneral.controls['Giros'].setValue(this.DatosGenerales['GiroEmpresa']['id'])
        this.getActividades();
        this.formGeneral.controls['Actividades'].setValue(this.DatosGenerales['ActividadEmpresa']['id']);
        this.formGeneral.controls['NoEmpleados'].setValue(this.DatosGenerales['NumeroEmpleados']);
        this.formGeneral.controls['Tamanio'].setValue(this.DatosGenerales['TamanoEmpresa']['id']);
        this.formGeneral.controls['Tipo'].setValue(this.DatosGenerales['TipoEmpresa']['id']);
        this.formGeneral.controls['TipoBase'].setValue(this.DatosGenerales['TipoBase']['id']);
      }

      // if(this.DatosGenerales['RFC'] = ""){
      //   this.formGeneral.controls['RazonSocial'].setValue('123456789012');
      // }
      // if(this.DatosGenerales['RazonSocial'] = ""){
      //   this.formGeneral.controls['RazonSocial'].setValue(this.DatosGenerales['NombreComercial']);
      // }
    }
  }

  //#region  FUNCION PARA CLASIFICACION
  public hoveringOver(value: number): void {
    this.overStar = value;
    this.percent = 100 * (value / this.maxRat);
  };
  public resetStar(): void {
    this.overStar = void 0;
  }
  //#endregio

  //#region Servicios GET
  getCatalogos() {
    this._CatalogoService.getGiroEmp().subscribe(result => {
      this.giros = result;
    });
    this._CatalogoService.getTamanioEmp().subscribe(result => {
      this.tamanioEmpresa = result;
    });
    this._CatalogoService.getTipoEmp().subscribe(result => {
      this.tipo = result;
    });
    this._CatalogoService.getTipoBase().subscribe(result => {
      this.tipoBase = result;
    });
  }

  getActividades() {
    this.actividades = null;
    this.formGeneral.controls['Actividades'].setValue('');
    let GiroId = this.formGeneral.get('Giros').value;
    this._CatalogoService.getActividadEmp(GiroId).subscribe(result => {
      this.actividades = result;
    });
  }
  //#endregion

  changeEmpleados(){
    this.formGeneral.controls['Tamanio'].reset();
  }

  validarNoEmpleado() {
    var isValid = true;
    var noEmpleados = this.formGeneral.get('NoEmpleados').value;
    var noEmpleadosId = this.formGeneral.get('Tamanio').value;
    if(noEmpleados >= 1 && noEmpleados <= 9 && noEmpleadosId != 1) {
      isValid = false;
    } else if (noEmpleados >= 10 && noEmpleados <= 49 && noEmpleadosId != 2) {
      isValid = false;
    } else if (noEmpleados >= 50 && noEmpleados <= 249 && noEmpleadosId != 3) {
      isValid = false;
    } else if (noEmpleados >= 250 && noEmpleadosId != 4) {
      isValid = false;
    }
    if (!isValid) {
      let msg = 'El número de empleados no coincide con el tamañano de la empresa. ';
      this.popToast('error', 'Tamaño Empresa', msg);
      this.formGeneral.controls['NoEmpleados'].reset();
      this.formGeneral.controls['Tamanio'].reset();
    }
  }

  Guardar() {
    this.loading = true;
    var Cliente = {
       Id: this.ClienteId,
       RazonSocial: this.esCliente ? this.formGeneral.get('RazonSocial').value : '',
       RFC: this.esCliente ? this.formGeneral.get('RFC').value : '',
       NombreComercial:  this.formGeneral.get('Empresa').value,
       TamanoEmpresa: this.formGeneral.get('Tamanio').value,
       NumeroEmpleados: this.formGeneral.get('NoEmpleados').value,
       GiroEmpresa: this.formGeneral.get('Giros').value,
       ActividadEmpresa: this.formGeneral.get('Actividades').value,
       TipoEmpresa: this.formGeneral.get('Tipo').value,
       TipoBase: this.formGeneral.get('TipoBase').value,
       Clasificacion: this.clf,
       Usuario: this.Usuario,
     };

     this._ClienteService.editInfoGeneral(Cliente).subscribe(result => {
       if(result == 200){
         let msg = 'La Información General se actualizó correctamente';
         this.popToast('success', 'Información General', msg);
         this.loading = false;
       }
       else{
        let msg = 'Ocurrio un error al intentar actualizar la información.';
        this.popToast('error', 'Información General', msg);
        this.loading = false;
       }
     })
   }



   //#region  CREACION DE MENSAJES
  toaster: any;
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right',
    limit: 7, tapToDismiss: false,
    showCloseButton: true,
    mouseoverTimerStop: true,
  });
  popToast(type, title, body) {
    var toast: Toast = {
      type: type,
      title: title,
      timeout: 5000,
      body: body
    }
    this.toasterService.pop(toast);
  }
  //#endregion

}
