import { filter } from 'rxjs-compat/operator/filter';
import { SettingsService } from './../../../core/settings/settings.service';
import { CatalogosService } from './../../../service/catalogos/catalogos.service';
import { AdminServiceService } from './../../../service/AdminServicios/admin-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Toast, ToasterService, ToasterConfig } from 'angular2-toaster';
import { DatePipe } from '@angular/common';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
const swal = require('sweetalert2');
@Component({
  selector: 'app-captura-personal',
  templateUrl: './captura-personal.component.html',
  styleUrls: ['./captura-personal.component.scss']
})
export class CapturaPersonalComponent implements OnInit {
  formGenerales: FormGroup;
  formPersonales: FormGroup;
  formLaborales: FormGroup;
  candidatoId: any;
  folio: any;
  dataSource: any = [];
  estados: any;
  municipios: any;
  colonias: any;
  fn: Date;
  edad: number;
  accent = 'accent';
  primary = 'primary';
  // spinner-material
  color = 'accent';
  mode = 'indeterminate';
  value = 60;
  spinner = false;
  bancos: any = [];
  motivos: any = [];
  edocivil: any = [];
  vBtra: any;
  formaPago = [];
  gruposanguineo: any = [];
  escolaridades: any = [];
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
  documentos: any = [];
  spinnerFile = {};
  check = {};
  constructor(
    private service: AdminServiceService,
    private catalogosService: CatalogosService,
    private _Router: Router,
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private settings: SettingsService,
    private pipe: DatePipe,
    private toasterService: ToasterService,
    private adapter: DateAdapter<any>) {
      this.adapter.setLocale('es');
      
    this.activateRoute.params.subscribe(params => {
      if (params['candidatoId'] != null) {
        this.candidatoId = params['candidatoId'];
        this.folio = params['folio'];
        this.vBtra = params['vbtra'];
        this.GetDatosCandidatos();
      }
    });
    this.formGenerales = this.formBuilder.group({
      pais: [{ value: 'MEXICO', disabled: true }],
      estado: ['', Validators.required],
      municipio: ['', Validators.required],
      colonia: ['', Validators.required],
      calle: ['', Validators.required],
      numext: ['', Validators.required],
      numint: [''],
      cp: ['', Validators.required],
      email: [''],
      ladaMov: [''],
      telMov: [''],
      telCasa: [''],
      telRec: [''],
    });
    this.formPersonales = this.formBuilder.group({
      // apellidoP: ['', Validators.required],
      // apellidoM: ['', Validators.required],
      // name: ['', Validators.required],
      genero: [{ value: '', disabled: true }],
      fechaNac: [{ value: '', disabled: true }],
      estadoNac: [{ value: '', disabled: true }],
      curp: [{ value: '', disabled: true }],
      rfc: [{ value: '', disabled: true }],
      nss: [{ value: '', disabled: true }],
      gs: [''],
      edocivil: ['', Validators.required],
      conyuge: [''],
      nompadre: [''],
      nommadre: [''],
      nombeneficiario: [''],
      escolaridad: ['', Validators.required],
      observaciones: ['']
    });
    this.formLaborales = this.formBuilder.group({
      // reclutador: [{value: '', disabled: true}],
      sueldoMin: [{ value: 0, disabled: true }],
      sueldoMax: [{ value: 0, disabled: true }],
      fechaIng: ['', Validators.required],
      formaPago: ['', Validators.required],
      diario: ['', Validators.required],
      turno: ['', Validators.required],
      banco: ['', Validators.required],
      suc: ['', Validators.required],
      sueldoInt: ['', Validators.required],
      cuenta: ['', Validators.required],
      dpto: ['', Validators.required],
      mensual: ['', Validators.required],
      fechaPago: ['', Validators.required],
      puesto: ['', Validators.required],
      clave: [''],
      claveExt: [''],
      motivo: ['', Validators.required],
      // folio: [{ value: this.folio, disabled: true}],
      soporte: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.spinner = true;
    this.GetEstados();
    this.GetBancos();
    this.GetMotContratacion();
    this.GetEstadoCivil();
    this.GetGrupoSanguineo();
    this.GetEscolaridades();
    this.GetFormaPago();
  }

  GetDatosCandidatos() {
    this.service.GetDatosContratados(this.candidatoId).subscribe(data => {
      this.dataSource = data[0];

      this.formPersonales.controls.curp.setValue(this.dataSource.curp);
      if (this.dataSource.rfc.length === 0 || this.dataSource.rfc.toLowerCase() === 'sin registro') {
        this.formPersonales.controls.rfc.setValue(this.dataSource.curp.substring(0, 10));
      } else {
        this.formPersonales.controls.rfc.setValue(this.dataSource.rfc);
      }
      this.formPersonales.controls.nss.setValue(this.dataSource.nss);
      this.formPersonales.controls.estadoNac.setValue(this.dataSource.estadoNacimiento);
      const fn = this.pipe.transform(new Date(this.dataSource.edad), 'dd/MM/yyyy');
      this.formPersonales.controls.fechaNac.setValue(fn);
      this.validarFecha(this.dataSource.edad);
      this.formPersonales.controls.genero.setValue(this.dataSource.genero);
      this.formGenerales.controls.ladaMov.setValue(this.dataSource.lada);
      this.formGenerales.controls.telMov.setValue(this.dataSource.telefono);
      this.formGenerales.controls.email.setValue(this.dataSource.email);

      if (this.dataSource.direccion.length > 0) {
        this.formGenerales.controls.estado.setValue(this.dataSource.direccion[0].estadoId);
        this.GetMunicipios(this.dataSource.direccion[0].estadoId);
        this.formGenerales.controls.municipio.setValue(this.dataSource.direccion[0].municipioId);
        this.GetColonias(this.dataSource.direccion[0].municipioId);
        this.formGenerales.controls.colonia.setValue(this.dataSource.direccion[0].coloniaId);
        this.formGenerales.controls.calle.setValue(this.dataSource.direccion[0].calle);
        this.formGenerales.controls.numext.setValue(this.dataSource.direccion[0].numeroExterior);
        this.formGenerales.controls.numint.setValue(this.dataSource.direccion[0].numeroInterior);
        this.formGenerales.controls.cp.setValue(this.dataSource.direccion[0].cp);
      }

      // this.formLaborales.controls.reclutador.setValue(this.dataSource.reclutador);
      this.formLaborales.controls.puesto.setValue(this.vBtra.toUpperCase());
      this.formLaborales.controls.sueldoMin.setValue(this.dataSource.vacante.sueldoMinimo);
      this.formLaborales.controls.sueldoMax.setValue(this.dataSource.vacante.sueldoMaximo);

      const mensual = (this.dataSource.vacante.sueldoMinimo / 30) * 7;
      this.formLaborales.controls.mensual.setValue(this.round(mensual, 3));
      const diario = this.dataSource.vacante.sueldoMinimo / 30;
      this.formLaborales.controls.diario.setValue(this.round(diario, 3));

      this.GetDocNecesarios();
      this.spinner = false;
    });
  }
  GetEstados() {
    this.catalogosService.getEstado(42).subscribe(data => {
      this.estados = data;
    });
  }
  GetMunicipios(value) {
    this.catalogosService.getMunicipio(value).subscribe(dm => {
      this.municipios = dm;
      console.log(this.municipios);
    });
  }
  GetColonias(value) {
    this.catalogosService.getColonias(value).subscribe(dc => {
      this.colonias = dc;
    });
  }
  GetCP(value) {
    const cp = this.colonias.filter(x => x.id === value);
    this.formGenerales.controls.cp.setValue(cp[0].cp);
  }
  GetBancos() {
    this.catalogosService.GetCatalogoBancos().subscribe(b => {
      this.bancos = b;
    });
  }
  GetMotContratacion() {
    this.catalogosService.GetMotContratacion().subscribe(b => {
      this.motivos = b;
    });
  }
  GetEstadoCivil() {
    this.catalogosService.GetEstadoCivil().subscribe(ec => {
      this.edocivil = ec.filter(x => x.id > 0);
    });
  }
  GetGrupoSanguineo() {
    this.catalogosService.GetGrupoSanguineo().subscribe(gs => {
      this.gruposanguineo = gs;
    });
  }
  GetEscolaridades() {
    this.catalogosService.GetEscolaridades().subscribe(esc => {
      this.escolaridades = esc;
    });
  }
  GetFormaPago() {
    this.catalogosService.GetFormaPago().subscribe(esc => {
      this.formaPago = esc;
    });
  }
  GetDocNecesarios() {
    this.service.GetDocNecesarios(this.dataSource.id).subscribe(docs => {
      this.documentos = docs;
    });
  }
  regresar() {
    this._Router.navigate(
      ['/admin/filesContratados'],
      { skipLocationChange: true }
    );
  }
  validarFecha(fecha) {
    if (fecha != null) {
      const fn = new Date(fecha);
      const date = new Date();
      let edad = date.getFullYear() - fn.getFullYear();

      if (date.getMonth() < fn.getMonth() - 1) {
        edad--;
      }
      if (((fn.getMonth() - 1) === date.getMonth()) && (date < fn)) {
        edad--;
      }
      this.fn = fn;
      this.edad = edad;
    } else {
      this.fn = new Date(fecha);
    }
  }

  GuardarDatos() {

    const dtosGenerales = {
      PaisId: 42,
      EstadoId: this.formGenerales.controls.estado.value,
      MunicipioId: this.formGenerales.controls.municipio.value,
      ColoniaId: this.formGenerales.controls.colonia.value,
      CodigoPostal: this.formGenerales.controls.cp.value,
      Calle: this.formGenerales.controls.calle.value,
      NumeroInterior: this.formGenerales.controls.numint.value,
      NumeroExterior: this.formGenerales.controls.numext.value,
      EstadoCivilId: this.formPersonales.controls.edocivil.value,
      ImgUrl: '',
      email: this.formGenerales.controls.email.value,
      GrupoSanguineoId: this.formPersonales.controls.gs.value === '' ? 1 : this.formPersonales.controls.gs.value
    };

    const dtosPersonales = {
      CandidatoId: this.candidatoId,
      RFC: this.formPersonales.controls.rfc.value,
      NSS: this.formPersonales.controls.nss.value
    };
    const fi = this.pipe.transform(new Date(this.formLaborales.controls.fechaIng.value), 'dd/MM/yyyy');
    const dtosLaborales = {
      FechaIngreso: fi,
      ClaveTurno: this.formLaborales.controls.turno.value,
      ClaveSucursal: this.formLaborales.controls.suc.value,
      NoCuenta: this.formLaborales.controls.cuenta.value,
      Departamento: this.formLaborales.controls.dpto.value,
      FechaFormaPago: this.formLaborales.controls.fechaPago.value,
      Puesto: this.formLaborales.controls.puesto.value,
      ClaveJefe: this.formLaborales.controls.clave.value,
      ClaveExt: this.formLaborales.controls.claveExt.value,
      SoporteFacturacion: this.formLaborales.controls.soporte.value,
      SueldoMensual: this.formLaborales.controls.mensual.value,
      SueldoDiario: this.formLaborales.controls.diario.value,
      SueldoIntegrado: this.formLaborales.controls.sueldoInt.value,
      BancoId: this.formLaborales.controls.banco.value,
      MotivoId: this.formLaborales.controls.motivo.value,
      FormaPagoId: this.formLaborales.controls.formaPago.value

    };

    const dtosExtras = {
      Conyuge: this.formPersonales.controls.conyuge.value.length === 0 ? 'S/R' : this.formPersonales.controls.conyuge.value,
      NomPadre: this.formPersonales.controls.nompadre.value.length === 0 ? 'S/R' : this.formPersonales.controls.nompadre.value,
      NomMadre: this.formPersonales.controls.nommadre.value.length === 0 ? 'S/R' : this.formPersonales.controls.nommadre.value,
      NomBeneficiario: this.formPersonales.controls.nombeneficiario.value.length === 0 ? 'S/R' :
        this.formPersonales.controls.nombeneficiario.value,
      Nacionalidad: 'MEXICANA',
      GradoEstudioId: this.formPersonales.controls.escolaridad.value,
      Observaciones: this.formPersonales.controls.observaciones.value.length === 0 ? 'S/R' :
        this.formPersonales.controls.observaciones.value
    };

    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger mr-2'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: '¿ESTÁS SEGURO?',
      text: 'Se guardarán los cambios para el candidato ' + this.dataSource.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡SI, GUARDAR CAMBIOS!',
      cancelButtonText: 'NO, CANCELAR!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.spinner = true;
        this.service.AgregarDatosContratados({ dtosGenerales, dtosPersonales, dtosLaborales, dtosExtras }).subscribe(r => {
          if (r === 200) {
            this.spinner = false;
            this.formGenerales.reset();
            this.formLaborales.reset();
            this.formPersonales.reset();

            // this.popToast('success', 'CAPTURA PERSONAL',
            //   'La información se guardó con éxito');
            this.spinner = false;
            swal.fire({
              title: 'CAPTURA PERSONAL',
              text: 'La información se guardó con éxito',
              type: 'success',
              onClose: () => {
                this.regresar();
              }
            });
          } else {
            this.spinner = false;
            swal.fire(
              'ERROR',
              'Ocurrió un error al intentar guardar datos por favor inténtelo de nuevo o repórtelo con el administrador',
              'error'
            );
          }
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === swal.DismissReason.cancel
      ) {
        this.spinner = true;
        swalWithBootstrapButtons.fire(
          'CANCELADO',
          'NO SE REALIZÓ NINGUN CAMBIO',
          'error'
        );
      }
    });
  }

  fileChangeListener($event, row, descripcion, id) {
    this.spinnerFile['spFile' + row] = true;
    const file: File = $event.target.files[0];
    const type = file.name.slice(file.name.lastIndexOf('.'), file.name.length);
    const filename = descripcion.replace(/\s/g, '').substring(0, 20);

    this.service.UploadFileDocs(file, this.candidatoId, filename + type).subscribe(result => {
      if (result === 201) {
        const datos = {
          candidatoId: this.candidatoId,
          id: this.dataSource.id,
          documentoId: id,
          usuarioId: this.settings.user['id'],
          descripcion: filename + type
        };
        this.service.ActualizarDocumentacion(datos).subscribe(r => {
          if (r === 200) {
            this.documentos[row].activo = true;
            this.documentos[row].fecha = new Date;
            this.spinnerFile['spFile' + row] = false;
            this.popToast('success', 'CARGAR DOCUMENTOS', 'El archivo ' + descripcion + ' se guardó con éxito');
          } else {
            this.spinnerFile['spFile' + row] = false;
            this.popToast('error', 'CARGAR DOCUMENTOS', 'Ocurrió un error al intentar subir archivo ' + descripcion);
          }
        });
      } else {
        this.spinnerFile['spFile' + row] = false;
        this.popToast('error', 'CARGAR DOCUMENTOS', 'Ocurrió un error al intentar subir archivo ' + descripcion);
      }
    });
  }

  errorImg() {
    this.dataSource['foto'] = '/assets/img/user/default-user.png';
  }
  round(value, precision): any {
    const rounder = Math.pow(10, precision);
    return (Math.round(value * rounder) / rounder).toFixed(precision);
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
