import { SettingsService } from './../../core/settings/settings.service';
import { CandidatosService } from './../../service/Candidatos/candidatos.service';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { ExcelService } from '../../service/ExcelService/excel.service';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { CURPValidator } from '../dlg-registro-masivo/GenerarCURP';
import { CatalogosService } from '../../service';
import { DateAdapter } from '@angular/material/core';

const swal = require('sweetalert2');

@Component({
  selector: 'app-editar-contratados',
  templateUrl: './editar-contratados.component.html',
  styleUrls: ['./editar-contratados.component.scss'],
  providers: [CandidatosService, DatePipe]
})
export class EditarContratadosComponent implements OnInit {
  formPersonales: FormGroup;
  data: any = [];

  etiqueta = true;

  fn: Date;
  edad: number;
  editCURP: boolean;
  estados: any;
  dataMedios: any;
  dataSource: any;

  /**
     * configuracion para mensajes de acciones.
     */
  toaster: any;
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right',
    limit: 7,
    tapToDismiss: false,
    showCloseButton: true,
    mouseoverTimerStop: true,
    preventDuplicates: true,
  });
  spinner: boolean;
  estatusId: number;
  reclutador: any;
  constructor(private service: CandidatosService,
    private catalogosService: CatalogosService,
    private excelService: ExcelService,
    private toasterService: ToasterService,
    private _settings: SettingsService,
    //  @Inject(MAT_DIALOG_DATA) public data: any,
    private pipe: DatePipe,
    private formBuilder: FormBuilder,
    private _Route: ActivatedRoute,
    private router: Router,
    private adapter: DateAdapter<any>
  ) {
    this._Route.queryParams.subscribe(params => {
      if (params != null) {
        this.data = params;
        this.estatusId = this.data.estatusId;
      }
    });
    this.reclutador = this._settings.user['nombre'];
    this.adapter.setLocale('es');
    this.formPersonales = this.formBuilder.group({
      apellidoP: ['', Validators.required],
      apellidoM: ['', Validators.required],
      nombre: ['', Validators.required],
      genero: ['', Validators.required],
      fechaNac: ['', Validators.required],
      estadoNac: ['', Validators.required],
      curp: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      cvCurp: [0, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      rfc: [{ value: '', disabled: true }, Validators.required, Validators.minLength(2)],
      cvRFC: ['', Validators.required],
      nss: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.GetEstados();
    this.GetContratadosInfo();
  }

  Regresar() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        id: this.data.id,
        folio: this.data.folio,
        vBtra: this.data.vBtra,
        clienteId: this.data.clienteId,
        enProceso: this.data.enProceso,
        candidatoId: this.data.candidatoId,
        estatusId: this.estatusId,
        requisicionId: this.data.requisicionId,
        horarioId: this.data.horarioId,
        ReclutadorId: this.data.ReclutadorId
      },
      skipLocationChange: true
    };
    this.router.navigate(['/reclutamiento/gestionVacante'], navigationExtras);
  }

  GetEstados() {
    this.catalogosService.getEstado(42).subscribe(data => {
      this.estados = data;
    });
  }
  GetContratadosInfo() {
    let contador = 0;
    this.service.GetContratados(this.data.candidatoId).subscribe(element => {
      this.dataSource = element;

      this.formPersonales.controls.curp.setValue(element.curp.substr(0, 16));
      if (element.curp.length > 16) {
        this.formPersonales.controls.cvCurp.setValue(element.curp.substring(16, element.curp.length));
      }
      if (!element.rfc) {
        this.formPersonales.controls.rfc.setValue(element.curp.substring(0, 10));
      } else {
        this.formPersonales.controls.rfc.setValue(element.rfc.substr(0, 10));
        this.formPersonales.controls.cvRFC.setValue(element.rfc.substring(10, element.rfc.length));
      }
      this.formPersonales.controls.nss.setValue(element.nss);
      this.formPersonales.controls.fechaNac.setValue(element.edad);
      this.validarFecha(element.edad);
      this.formPersonales.controls.nombre.setValue(element.nombre);
      this.formPersonales.controls.apellidoP.setValue(element.apellidoPaterno);
      this.formPersonales.controls.apellidoM.setValue(element.apellidoMaterno);
      if (element.generoId > 0) {
        this.formPersonales.controls.genero.setValue(element.generoId);
      }
      this.formPersonales.controls.estadoNac.setValue(element.estado);
      if (element.fch_Creacion === element.fch_Modificacion) {
        this.editCURP = false;
      } else {
        this.editCURP = true;
        contador++;
      }

      return;
      //  element.editCURP = true;
    });
    contador === this.data.length ? this.etiqueta = false : this.etiqueta = true;

  }

  UpdateData() {
    const estado = this.estados.filter(e => e.clave === this.formPersonales.controls.estadoNac.value);
    const data = {
      candidatoId: this.data.candidatoId,
      curp: this.formPersonales.controls.curp.value + this.formPersonales.controls.cvCurp.value,
      rfc: this.formPersonales.controls.rfc.value + this.formPersonales.controls.cvRFC.value,
      nss: this.formPersonales.controls.nss.value,
      generoId: this.formPersonales.controls.genero.value,
      fechaNacimiento: this.formPersonales.controls.fechaNac.value,
      nombreCandidato: this.formPersonales.controls.nombre.value,
      apellidoPaterno: this.formPersonales.controls.apellidoP.value,
      apellidoMaterno: this.formPersonales.controls.apellidoM.value,
      estatusId: 24,
      //  tipoMediosId: this.dataSource.fuenteReclutamientoId,
      //  departamentoId: this.dataSource.areaReclutamientoId,
      requisicionId: this.data.requisicionId,
      //  paisNacimientoId: this.dataSource.paisNacimiento,
      estadoNacimientoId: estado[0].id,
      //  municipioNacimientoId: this.dataSource.municipioNacimiento,
      ReclutadorId: this._settings.user['id']
    };
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger mr-2'
      },
      buttonsStyling: false
    });
    const html =
      '<h4 class="text-muted">Se actualizará la siguiente información</h4><br/><span class="text-info text-uppercase"> ' +
      data.nombreCandidato + ' ' + data.apellidoPaterno + ' ' + data.apellidoMaterno + '</span>' +
      '<p class="text-muted">CURP <span class="text-success">' + data.curp + '</span></p>' +
      '<p class="text-muted">RFC <span class="text-success">' + data.rfc + '</span></p>' +
      '<p class="text-muted">NSS <span class="text-success">' + data.nss + '</span></p>';
    swalWithBootstrapButtons.fire({
      title: '¿ESTÁS SEGURO?',
      html: html,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'SI, GUARDAR',
      cancelButtonText: 'NO, CANCELAR!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.spinner = true;
        this.service.UpdateContratados(JSON.stringify(data)).subscribe(r => {
          if (r === 201) {
            this.editCURP = true;
            this.estatusId = 24;
            this.Regresar();
          } else {
            this.popToast('error', 'Editar personal cubierto', 'Ocurrió un error al intentar actualizar');

          }
          this.spinner = false;
        });

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'CANCELADO',
          'NO SE REALIZÓ NINGUN CAMBIO',
          'error'
        );
      }
    });


  }
  GenerarCurp($event) {
    if (
      $event != null &&
      this.formPersonales.get('nombre').value.length > 0 &&
      this.formPersonales.get('apellidoP').value.length > 0 &&
      this.formPersonales.get('apellidoM').value.length > 0 &&
      this.formPersonales.get('genero').value > 0
    ) {
      const obj = new CURPValidator();
      const fn = new Date();

      const curp = obj.ValidarCurp(
        this.formPersonales.get('nombre').value,
        this.formPersonales.get('apellidoP').value,
        this.formPersonales.get('apellidoM').value,
        this.formPersonales.get('fechaNac').value,
        this.formPersonales.get('genero').value,
        $event,
        '',
        true);
      this.formPersonales.controls.curp.setValue(curp.substr(0, 16));
      this.formPersonales.controls.rfc.setValue(curp.substr(0, 10));
    } else {
      this.formPersonales.controls.curp.reset();
      this.formPersonales.controls.cvCurp.reset();
      this.formPersonales.controls.rfc.reset();
      this.formPersonales.controls.cvRFC.reset();
      this.formPersonales.controls.cvCurp.markAsUntouched();
      this.formPersonales.controls.cvRFC.markAsUntouched();
    }
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
  errorImg() {
    this.dataSource['foto'] = '/assets/img/user/default-user.png';
  }
  // exportAsXLSX() {
  //   const aux = [];
  //   let flag = true;
  //   const d = this.pipe.transform(new Date, 'yyyy-MM-dd');
  //   const e = this.pipe.transform(new Date(this.dataSource.edad), 'yyyy-MM-dd');
  //       aux.push({
  //         FOLIO: this.data.folio.toString(),
  //         CURP: element.curp,
  //         RFC: element.rfc,
  //         NSS: element.nss,
  //         'FECHA DE NACIMIENTO': e,
  //         NOMBRE: element.nombre,
  //         'APELLIDO PATERNO': element.apellidoPaterno,
  //         'APELLIDO MATERNO': element.apellidoMaterno,
  //         'FUENTE DE RECLUTAMIENTO': element.fuenteReclutamiento,
  //         'AREA RECLUTAMIENTO': element.areaReclutamiento,
  //         SUELDO: element.sueldoMinimo.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
  //         USUARIO: element.usuario,
  //         FECHA: d
  //       });
  //     }
  //   });

  //   if (flag) {
  //     this.excelService.exportAsExcelFile(aux, 'Personal_Contratado');
  //   }

  // }
  NumberValidator(control: AbstractControl): { [key: string]: any } | null {
    if (control.value == null) {
      return { invalidNumber: { valid: false, value: control.value } };
    } else if (control.value.length > 0) {
      const valid = /^\d+$/.test(control.value);
      return valid ? null : { invalidNumber: { valid: false, value: control.value } };
    } else {
      return null;
    }
  }




  popToast(type, title, body) {
    var toast: Toast = {
      type: type,
      title: title,
      timeout: 4000,
      body: body
    }
    this.toasterService.pop(toast);

  }
}
