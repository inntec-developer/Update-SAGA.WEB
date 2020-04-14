import { filter } from 'rxjs-compat/operator/filter';
import { ReclutamientoCampoService } from './../../service/ReclutamientoCampo/reclutamiento-campo.service';
import { FormGroup, NgForm, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { CURPValidator } from './GenerarCURP';
import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { SistTicketsService } from '../../service/SistTickets/sist-tickets.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PostulateService } from '../../service/SeguimientoVacante/postulate.service';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';
import { SettingsService } from '../../core/settings/settings.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogHorariosConteoComponent } from '../dialog-horarios-conteo/dialog-horarios-conteo.component';
import { RequisicionesService, CandidatosService } from '../../service';
import { InfoCandidatoService } from '../../service/SeguimientoVacante/info-candidato.service';
import { findIndex } from 'rxjs-compat/operator/findIndex';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY/MM/DD',
  },
  display: {

    dateInput: 'YYYY/MM/DD',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'YYYY/MM/DD',
    monthYearA11yLabel: 'MM YYYY',
  },
};
const swal = require('sweetalert');
const Swal = require('sweetalert2');
@Component({
  selector: 'app-dlg-registro-masivo',
  templateUrl: './dlg-registro-masivo.component.html',
  styleUrls: ['./dlg-registro-masivo.component.scss'],
  providers: [CandidatosService,
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class DlgRegistroMasivoComponent implements OnInit {

  // scroll
  public disabled = false;
  public invertX = false;
  public compact = false;
  public invertY = false;
  public shown = 'hover';

  public dataSource: Array<any> = [];
  // Varaibles del paginador
  public page = 1;
  public itemsPerPage = 20;
  public maxSize = 5;
  public numPages = 1;
  public length = 0;
 // spinner-material
 color = 'primary';
 mode = 'indeterminate';
 value = 60;
 spinner = false;

  estados: any = [];
  edad = 0;
  fn: Date = new Date();
  date: Date;
  valEmail = '';
  formRegister: FormGroup;
  editar = false;
  public columns: Array<any> = [
    { title: 'Horario', className: 'text-success text-center', name: 'horario', filtering: { filterString: '', placeholder: 'Horario' } },
    { title: 'CURP', className: 'text-success text-center', name: 'curp', filtering: { filterString: '', placeholder: 'CURP' } },
    { title: 'Nombre', className: 'text-center', name: 'nombre', filtering: { filterString: '', placeholder: 'Nombre' } },
    {
      title: 'Apellido Paterno', className: 'text-center', name: 'apellidoPaterno',
      filtering: { filterString: '', placeholder: 'Apellido Paterno' }
    },
    {
      title: 'Apellido Materno', className: 'text-center', name: 'apellidoMaterno',
      filtering: { filterString: '', placeholder: 'Apellido Materno' }
    },
    { title: 'Fecha Nacimiento', className: 'text-center', name: 'fechaNac', filtering: { filterString: '', placeholder: 'aaaa-mm-dd' } },
    { title: 'Sexo', className: 'text-center', name: 'genero', filtering: { filterString: '', placeholder: 'Sexo' } },
    { title: 'Estado Nac.', className: 'text-center', name: 'estadoNacimiento', filtering: { filterString: '', placeholder: 'Estado' } },
    { title: 'Email', className: 'text-center', name: 'email', filtering: { filterString: '', placeholder: 'Email' } },
    { title: 'Teléfono', className: 'text-center', name: 'telefono', filtering: { filterString: '', placeholder: 'Teléfono' } },
    { title: 'Estatus', className: 'text-center', name: 'estatus', filtering: { filterString: '', placeholder: 'Estatus' } }
  ];
  rows: any[] = [];
  registros = 0;
  rowIndex = -1;
  rowAux = [];
  txtLada = '';
  valTel = '';
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
  horario = '';
  contratados: number;
  tipoUsuario: any;
  data: any = [];
  medios: any;
  horarios: any;
  alertaVacantes = false;
  constructor(private postulateservice: PostulateService,
    private adapter: DateAdapter<any>,
    private _service: SistTicketsService,
    private toasterService: ToasterService,
    private settings: SettingsService,
    private formBuilder: FormBuilder,
    private Requiservice: RequisicionesService,
    private CampoService: ReclutamientoCampoService,
    private candidatosService: InfoCandidatoService,
    private serviceCandidato: CandidatosService,
    private _Route: ActivatedRoute,
    private router: Router) {
    this.adapter.setLocale('es');
    this.tipoUsuario = this.settings.user['tipoUsuarioId'];
    this._Route.queryParams.subscribe(params => {
      if (params != null) {
        this.data = params;
      }
    });

  }

  //#region paginador
  public config: any = {
    paging: true,
    filtering: { filterString: '' },
    className: ['table-hover mb-0 ']
  };

  public changePage(page: any, data: Array<any> = this.dataSource): Array<any> {
    const start = (page.page - 1) * page.itemsPerPage;
    const end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeFilter(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columns.forEach((column: any) => {
      if (column.filtering.filterString !== '') {
        filteredData = filteredData.filter((item: any) => {
          if (item[column.name] !== null) {
            return item[column.name].toString().toLowerCase().match(column.filtering.filterString.toLowerCase());
          }
        });
      }
    });

    return filteredData;
  }

  public clearfilters() {
    this.columns.forEach(element => {
      element.filtering.filterString = '';
      (<HTMLInputElement>document.getElementById(element.name)).value = '';
    });
    this.onChangeTable(this.config);
  }
  public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
    const filteredData = this.changeFilter(this.dataSource, this.config);
    this.rows = page && config.paging ? this.changePage(page, filteredData) : filteredData;
    this.registros = this.rows.length;
    this.length = filteredData.length;
  }
  //#endregion
  public onCellClick(row, rowIndex, f: NgForm) {
    this.formRegister.controls.apellidoP.setValue(row.apellidoPaterno);
    this.formRegister.controls.apellidoM.setValue(row.apellidoMaterno);
    this.formRegister.controls.name.setValue(row.nombre);
    this.formRegister.controls.gender.setValue(row.genero === 'Mujer' ? '2' : '1');
    this.formRegister.controls.dateBirth.setValue(new Date(row.fechaNac));
    this.formRegister.controls.estado.setValue(row.clave);
    this.formRegister.controls.email.setValue(row.email);
    this.formRegister.controls.lada.setValue(row.lada);
    this.formRegister.controls.telefono.setValue(row.telefono);
    this.formRegister.controls.curp.setValue(row.curp);
    this.formRegister.controls.registro.setValue(row.telefono === '' ? '1' : '2');
    this.formRegister.controls.horariosCtrl.setValue(row.horarioId);
    this.formRegister.controls.submedios.setValue(row.tipoMediosId);
    row.selected = true;
    this.rowIndex = rowIndex;

    this.date = new Date(row.fechaNac);
    this.validarFecha(this.date);
    this.formaRegistro(row.telefono === '' ? 1 : 2);

    this.editar = true;
    if (this.rowAux.length === 0) {
      this.rowAux = row;
    } else if (this.rowAux !== []) {
      const aux = row;
      row = this.rowAux;
      row.selected = false;
      this.rowAux = aux;
    }

  }
  ngOnInit() {
    this.formRegister = this.formBuilder.group({
      apellidoP: ['', Validators.required],
      apellidoM: ['', Validators.required],
      name: ['', Validators.required],
      gender: ['', Validators.required],
      dateBirth: ['', Validators.required],
      estado: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      lada: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), this.phoneNumberValidator]],
      curp: ['', Validators.required],
      registro: ['1', Validators.required],
      horariosCtrl: ['', Validators.required],
      submedios: ['', Validators.required]
    });

    this.formRegister.controls.telefono.clearValidators();
    this.formRegister.controls.lada.clearValidators();

    this.GetEstados();
    this.GetMedios();
    this.GetHorarioRequis();
    this.GetCandidatos();
  }
  Regresar() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        'reclutador': this.data.reclutador,
        'reclutadorId': this.data.reclutadorId
      },
      skipLocationChange: true
    };
    if (this.data.campo === "true") {
    this.router.navigate(['/webcampo/reclutadorvacantes'], navigationExtras);
    } else {
      this.router.navigate(['/reclutamiento/vacantesReclutador'], navigationExtras);
    }
  }
  formaRegistro(value) {
    if (value === 2) {
      this.formRegister.controls.email.reset();
      this.formRegister.controls.email.clearValidators();
      this.formRegister.controls.email.setValue('');
      this.formRegister.controls.telefono.setValidators(
        [Validators.required, this.phoneNumberValidator]
      );
      this.formRegister.controls.lada.setValidators(Validators.required);

    } else if (value === 1) {
      this.formRegister.controls.telefono.reset();
      this.formRegister.controls.lada.reset();
      this.formRegister.controls.telefono.clearValidators();
      this.formRegister.controls.lada.clearValidators();
      this.formRegister.controls.telefono.setValue('');
      this.formRegister.controls.lada.setValue('');

      this.formRegister.controls.email.setValidators(
        [Validators.required, Validators.email]
      );
    }
  }
  phoneNumberValidator(control: AbstractControl): { [key: string]: any } | null {
    if (control.value == null) {
      return { invalidNumber: { valid: false, value: control.value } };
    } else if (control.value.length > 0) {
      const valid = /^\d+$/.test(control.value);
      return valid ? null : { invalidNumber: { valid: false, value: control.value } };
    } else {
      return null;
    }
  }
  GetEstados() {
    this._service.GetEstados().subscribe(data => {
      this.estados = data;
    });
  }
  GetHorarioRequis() {
    this.Requiservice.GetHorariosRequiConteo(this.data.requisicionId).subscribe(result => {
      let aux = result.filter(element => !element.vacantes);
      if (aux.length === 0) {
        aux = [{ id: 0, nombre: 'Los horarios ya están cubiertos' }];
      }
      if (this.editar) {
        const idx = aux.findIndex(x => x.id === this.dataSource[this.rowIndex].horarioId);
        aux[idx].mediosId = this.dataSource[this.rowIndex].tipoMediosId;
        aux[idx].editar = true;
      }
      this.horarios = aux;
    });
  }
  GetMedios() {
    this.serviceCandidato.GetMediosRecl().subscribe(result => {
      this.medios = result;
    });
  }
  GenerarCurp($event) {
    if (
      $event != null &&
      this.formRegister.get('name').value.length > 0 &&
      this.formRegister.get('apellidoP').value.length > 0 &&
      this.formRegister.get('apellidoM').value.length > 0 &&
      this.edad > 17 &&
      this.formRegister.get('gender').value > 0
      ) {
      const obj = new CURPValidator();
      const fn = new Date();

      const curp = obj.ValidarCurp(
        this.formRegister.get('name').value,
        this.formRegister.get('apellidoP').value,
        this.formRegister.get('apellidoM').value,
        this.formRegister.get('dateBirth').value,
        this.formRegister.get('gender').value,
        $event,
        '',
        true);
      this.formRegister.controls.curp.setValue(curp);
    } else {
      this.formRegister.controls.curp.reset();
    }
  }
  GetCandidatos() {
    this.spinner = true;
    if (!this.data.campo) {
    this.candidatosService.getCandidatosByVacante(this.data.requisicionId, 12).subscribe(data => {
      this.dataSource = [];
      this.contratados = 0;
      data.forEach(element => {
        this.dataSource.push({
          Id: element.candidatoId,
          candidatoId: element.candidatoId,
          requisicionId: this.data.requisicionId,
          curp: element.datos[0].curp,
          estatus: element.estatus,
          nombre: element.datos[0].nombre,
          apellidoPaterno: element.datos[0].apellidoPaterno,
          apellidoMaterno: element.datos[0].apellidoMaterno,
          email: element.datos[0].email,
          fechaNac: element.datos[0].edad,
          genero: element.datos[0].generoId === 2 ? 'Mujer' : 'Hombre',
          generoId: element.datos[0].generoId,
          EstadoNacimientoId: element.datos[0].estadoNacimientoId,
          estado: element.datos[0].estadoNacimiento,
          clave: element.datos[0].clave,
          lada: element.datos[0].lada,
          telefono: element.datos[0].telefono,
          horario: element.horario,
          horarioId: element.horarioId,
          tipoMediosId: element.tipoMediosId
        });
      });
      if (parseInt(this.data.nv, 10) <= this.dataSource.length) {
        this.alertaVacantes = true;
      }
      this.onChangeTable(this.config);
      this.spinner = false;
    });
  } else {
    this.CampoService.GetCandidatosApartados(this.data.requisicionId, this.settings.user['id']).subscribe(res => {
      this.dataSource = res;
      this.contratados = 0;
      if (parseInt(this.data.nv, 10) <= this.dataSource.length) {
        this.alertaVacantes = true;
      }
      this.onChangeTable(this.config);
      this.spinner = false;
    });
  }
  }
  ValidarFormaRegistro() {
    if (this.formRegister.get('email').value.length > 1) {
      // const regexpEmail = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$');
      // if (regexpEmail.test(email)) {
      this.postulateservice.ValidarEmailCandidato(this.formRegister.get('email').value).subscribe(data => {
        if (data === 302) {
          if (this.editar && this.dataSource[this.rowIndex].email === this.formRegister.get('email').value) {
            this.Registrar();
          } else {
            this.formRegister.controls.email.setErrors({ existEmail: true });
            this.formRegister.controls.email.markAsDirty();
          }
        } else {
          const x = this.dataSource.findIndex(value => value.email === this.formRegister.get('email').value);
          if (x === -1) {
            this.Registrar();
          } else if (this.rowIndex === -1) {
            this.formRegister.controls.email.setErrors({ sameEmail: true });
            this.formRegister.controls.email.markAsDirty();
          }
        }
      });
    } else if (this.formRegister.get('telefono').value.length > 1) {
      this.postulateservice.ValidarTelCandidato(this.formRegister.get('lada').value,
        this.formRegister.get('telefono').value).subscribe(data => {
          if (data === 302) {
            const telefono = this.formRegister.get('lada').value + this.formRegister.get('telefono').value;
            if (this.editar && this.dataSource[this.rowIndex].lada + this.dataSource[this.rowIndex].telefono === telefono) {
              this.Registrar();
            } else {
              this.formRegister.controls.telefono.setErrors({ existNumber: true });
              this.formRegister.controls.telefono.markAsDirty();
            }
          } else {
            const x = this.dataSource.findIndex(value => value.telefono === this.formRegister.get('telefono').value);
            if (x === -1) {
              this.Registrar();
            } else if (this.rowIndex === -1) {
              this.formRegister.controls.telefono.setErrors({ sameTel: true });
              this.formRegister.controls.telefono.markAsDirty();
            }
          }
        });
    }
  }
  Registrar() {
    const aux = this.formRegister.value;
    const estadoId = this.estados.filter(e => {
      return e.clave === aux.estado;
    });
    const fn = new Date(aux.dateBirth);
    const email = [{ email: aux.email || 'SIN REGISTRO', UsuarioAlta: this.settings.user['usuario'], }];
    const candidato = {
      Curp: aux.curp,
      Nombre: aux.name,
      ApellidoPaterno: aux.apellidoP,
      ApellidoMaterno: aux.apellidoM,
      Email: email,
      FechaNac: fn.getFullYear().toString() + '/' + (fn.getMonth() + 1).toString() + '/' + fn.getDate().toString(),
      GeneroId: aux.gender,
      EstadoNacimientoId: estadoId[0].id,
      Telefono: [{
        ClavePais: 52,
        ClaveLada: aux.lada,
        telefono: aux.telefono,
        TipoTelefonoId: 1
      }],
      requisicionId: this.data.requisicionId,
      reclutadorCampoId: this.settings.user['id'],
      reclutadorId: this.data.reclutadorId,
      OpcionRegistro: aux.registro,
      horarioId: aux.horariosCtrl,
      tipoMediosId: aux.submedios,
    };
    if (!this.editar) {
      this.AgregarCandidato(candidato);
    } else {
      this.EditarCandidato(candidato);
    }
  }
  AgregarCandidato(candidato) {
    if (parseInt(this.data.nv, 10) <= this.dataSource.length) {
      this.alertaVacantes = true;
    }
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger mr-2'
        },
        buttonsStyling: false
      });

      swalWithBootstrapButtons.fire({
        title: '¿Estas seguro?',
        text: 'El candidato se registrará con el estatus de apartado para la vacante de  ' + this.data.vacante,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '¡Si, registrar!',
        cancelButtonText: '¡No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          Swal.fire({
            title: 'Registro Masivo',
            html: 'Esto puede tardar varios segundos por favor espere...',
            type: 'warning',
            showConfirmButton: false,
            onBeforeOpen: () => {
              Swal.showLoading();
              if (!this.data.campo) {
                this.postulateservice.RegistrarCandidatos(candidato).subscribe(res => {
                  if (res !== 417) {
                    this.formRegister.reset();
                    this.edad = 0;
                    this.rowIndex = -1;
                    this.formaRegistro(1);
                    this.GetCandidatos();
                    Swal.hideLoading();
                    Swal.close();
                  } else {
                    Swal.fire('ERROR', 'Ocurrió un error al intentar agregar. Por favor intentelo de nuevo', 'error');
                  }
                });
              } else {
                this.CampoService.RegistrarCandidatos(candidato).subscribe(res => {
                  Swal.hideLoading();
                  Swal.close();
                  Swal.fire ({
                    title: 'Registro Candidatos',
                    html: '<p>Candidato: ' + this.formRegister.controls.name.value + ' ' +
                    this.formRegister.controls.apellidoP.value + ' ' +
                    this.formRegister.controls.apellidoM.value + ' </p>' +
                    '<p>Datos para inicio en bolsa de trabajo DAMSA.</p><p> usuario: ' + res['username'] +
                    ' contraseña:' + res['pass'] + '</p>',
                    type: 'success',
                  });
                  this.formRegister.reset();
                  this.rowIndex = -1;
                  this.edad = 0;
                  this.formaRegistro(1);
                  this.GetCandidatos();
                });
              }
            }
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'No se realizó ningun cambio',
            'error'
          );
        }
      });
  }
  cubrirCandidatos() {
    const count = parseInt(this.data.nv, 10) - (parseInt(this.data.contratados, 10) + this.dataSource.length);
    if (count < 0) {
      swal('Registro', 'El total de candidatos es mayor al de las vacantes', 'warning');
    } else {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger mr-2'
        },
        buttonsStyling: false
      });

      swalWithBootstrapButtons.fire({
        title: '¿Estas seguro?',
        text: '¡Se cubrirán (' + this.dataSource.length.toString() + ') candidatos para la vacante de ' + this.data.vacante,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '¡Si, cubrir candidato(s)!',
        cancelButtonText: '¡No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          Swal.fire({
            title: 'Actualizar candidatos a cubiertos',
            html: 'El proceso puede tardar varios segundos por favor espere... ',
            type: 'warning',
            showConfirmButton: false,
            onBeforeOpen: () => {
              Swal.showLoading();
              const datos = [];
              this.dataSource.forEach(r => {
                datos.push({
                  candidatoId: r.candidatoId,
                  estatusId: 24,
                  requisicionId: this.data.requisicionId,
                  horarioId: r.horarioId,
                  ReclutadorId: this.data.reclutadorId,
                  CURP: r.curp,
                  fechaNacimiento: r.fechaNac,
                  Nombre: r.nombre,
                  ApellidoPaterno: r.apellidoPaterno,
                  ApellidoMaterno: r.apellidoMaterno,
                  EstadoNacimientoId: r.EstadoNacimientoId,
                  GeneroId: r.generoId,
                });
              });
              this.postulateservice.CubrirMasivos(datos).subscribe(data => {
                if (data === 200) {
                  Swal.hideLoading();
                  Swal.close();
                  swalWithBootstrapButtons.fire({
                    title: 'Cubrir candidatos',
                    text: 'Los cambios se realizaron con éxito. ¿Deseas enviar notificacion a los candidatos?. ' +
                      'El proceso puede durar varios segundos',
                    type: 'success',
                    showCancelButton: true,
                    confirmButtonText: '¡SI, ENVIAR!',
                    cancelButtonText: 'NO, SALIR!',
                    reverseButtons: true
                  }).then(result2 => {
                    if (result2.value) {
                      const datosCand = [];
                      this.dataSource.forEach(rr => {
                        datosCand.push(rr.candidatoId);
                      });
                      this.postulateservice.SendEmailContratados(datosCand).subscribe(x => {
                      });
                      this.Regresar();
                    } else {
                      this.Regresar();
                    }
                  });
                } else {
                  swalWithBootstrapButtons.fire(
                    'ERROR',
                    'Ocurrió un error al intentar cubrir candidatos. Por favor intentelo de nuevo',
                    'error'
                  );
                }
              });
            },
          });
        } else {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'No se realizó ningun cambio',
            'error'
          );
        }
      });
    }
  }
  EditarCandidato(candidato) {
    let timerInterval;
    Swal.fire({
      title: 'Actualizar candidatos',
      html: 'por favor espere... <strong></strong>.',
      type: 'warning',
      showConfirmButton: false,
      timer: 2000,
      onBeforeOpen: () => {
        Swal.showLoading();
        timerInterval = setInterval(() => {
          Swal.getContent().querySelector('strong')
            .textContent = Swal.getTimerLeft();
        }, 100);
      },
      onClose: () => {
        clearInterval(timerInterval);
      }
    }).then((x) => {
      if (x.dismiss === Swal.DismissReason.timer) {
      }
    });

    const estado = this.estados.filter(e => {
      return e.id === candidato.EstadoNacimientoId;
    });
    const hrs = this.horarios.filter(e => {
      return e.id === candidato.horarioId;
    });

    candidato.Id = this.dataSource[this.rowIndex].candidatoId;
    this.candidatosService.UpdateCandidatoMasivo(candidato).subscribe(r => {
      if (r === 200) {
        this.dataSource[this.rowIndex].curp = candidato.curp;
        this.dataSource[this.rowIndex].nombre = candidato.Nombre;
        this.dataSource[this.rowIndex].apellidoPaterno = candidato.apellidoPaterno;
        this.dataSource[this.rowIndex].apellidoMaterno = candidato.ApellidoMaterno;
        this.dataSource[this.rowIndex].fechaNac = candidato.FechaNac;
        this.dataSource[this.rowIndex].genero = candidato.GeneroId === '2' ? 'Mujer' : 'Hombre';
        this.dataSource[this.rowIndex].EstadoNacimientoId = candidato.EstadoNacimientoId;
        this.dataSource[this.rowIndex].estado = estado[0].estado;
        this.dataSource[this.rowIndex].email = candidato.Email.email;
        this.dataSource[this.rowIndex].lada = this.formRegister.get('lada').value;
        this.dataSource[this.rowIndex].telefono = this.formRegister.get('telefono').value;
        this.dataSource[this.rowIndex].opcionRegistro = candidato.registro;
        this.dataSource[this.rowIndex].horario = hrs[0].nombre;

        this.GetCandidatos();
        this.onChangeTable(this.config);
        this.formRegister.reset();
        this.rowIndex = -1;
        this.edad = 0;
        this.formaRegistro(1);
      } else {
        swal('Error', 'Ocurrió un error al intentar modificar. Por favor intentelo de nuevo', 'error');
      }
    });
  }
  BorrarCandidato(rowIndex) {
    this.dataSource.splice(rowIndex, 1);
    this.onChangeTable(this.config);
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
  BorrarCampos() {
    // this.GetEstados();
    // this.GetHorarioRequis();
    // this.GetMedios();
    this.date = new Date();
    this.edad = 0;
    this.rowIndex = -1;
    this.dataSource.forEach(element => {
      element.selected = false;
    });
    this.formRegister.reset();
    this.rowAux = [];
    this.onChangeTable(this.config);
  }
  popToast(type, title, body) {
    const toast: Toast = {
      type: type,
      title: title,
      timeout: 4000,
      body: body
    };
    this.toasterService.pop(toast);

  }

}
