import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
import { SettingsService } from '../../../core/settings/settings.service';
import { InfoCandidatoService } from '../../../service/SeguimientoVacante/info-candidato.service';
import { CURPValidator } from '../../../components/dlg-registro-masivo/GenerarCURP';
import { PostulateService } from '../../../service/SeguimientoVacante/postulate.service';
import { RequisicionesService, CandidatosService } from '../../../service';
import { DialogHorariosConteoComponent } from '../../../components/dialog-horarios-conteo/dialog-horarios-conteo.component';
import { SistTicketsService } from '../../../service/SistTickets/sist-tickets.service';
import { ReclutamientoCampoService } from '../../../service/ReclutamientoCampo/reclutamiento-campo.service';
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
  selector: 'app-dlg-editar-candidatos',
  templateUrl: './dlg-editar-candidatos.component.html',
  styleUrls: ['./dlg-editar-candidatos.component.scss'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class DlgEditarCandidatosComponent implements OnInit, AfterViewInit {
  curp = '';
  nom = '';
  ap = '';
  am = '';
  email = '';
  txtPhone = '';
  estados = [];
  estado = '';
  edad = 0;
  fn: Date = new Date();
  rbS: any = 0;
  estadoId = 0;
  date: Date;
  model = { options: '0' };
  modelOpc = { options: '0' };
  valEmail = '';
  txtLada = '';
  valTel = '';
  horario = '';
  horarioId: any;
  tipoMediosId: any;
  contratados: number;
  editEstado = false;
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
  constructor(
    @Inject(MAT_DIALOG_DATA) public dataSource: any,
    private dialog: MatDialogRef<DlgEditarCandidatosComponent>,
    private adapter: DateAdapter<any>,
    private toasterService: ToasterService,
    private settings: SettingsService,
    private dialog2: MatDialog,
    private campoService: ReclutamientoCampoService,
    private postulateservice: PostulateService,
    private Requiservice: RequisicionesService,
    private _service: SistTicketsService
  ) {
    this.adapter.setLocale('es');
   }

  ngOnInit() {
    this.GetEstados();
  }

  ngAfterViewInit() {
    this.curp = this.dataSource.curp;
    this.nom = this.dataSource.nom;
    this.ap = this.dataSource.apellidoPaterno;
    this.am = this.dataSource.apellidoMaterno;
    this.email = this.dataSource.email === null ? 'REGISTRO POR TELEFONO' : this.dataSource.email;
    this.txtLada = this.dataSource.lada === null ? '---' : this.dataSource.lada;
    this.txtPhone = this.dataSource.telefono === null ? '--------' :
     this.dataSource.telefono.substring(this.dataSource.telefono.indexOf('-') + 1, this.dataSource.telefono.length);
    this.model.options = this.dataSource.genero === 'Mujer' ? '2' : '1';
    this.modelOpc.options = this.dataSource.telefono === null ? '1' : '2';
    this.estadoId = this.dataSource.EstadoNacimientoId;
    this.date = new Date(this.dataSource.edad);
    this.validarFecha(this.dataSource.edad);
  }
  GetEstados() {
    this._service.GetEstados().subscribe(data => {
      this.estados = data;
      this.selectEstado(this.dataSource.EstadoNacimientoId);
    });
  }

  EditarCandidato() {

    if (this.modelOpc.options === '1') {
      this.ValidarEmail(this.email);
    } else {
      this.ValidarTelefono();
    }

    if (this.valEmail === '' && this.valTel === '') {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success ml-2',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      });

      swalWithBootstrapButtons.fire({
        title: '¿Estas seguro?',
        text: 'Se modificarán los datos personales del candidato.' +
        ' El proceso puede tardar unos segundos por favor espere.',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '!SI, MODIFICAR!',
        cancelButtonText: '¡NO, CANCELAR!',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          let obj = [];
          let timerInterval;
                      Swal.fire({
                        title: 'Actualizar candidatos',
                        html: 'por favor espere... <strong></strong>.',
                        type: 'warning',
                        showConfirmButton: false,
                        timer: 1000,
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
          const estado = this.estados.filter(item => {
            if (item.id === this.estadoId) {
              return item.estado;
            }
          });
          this.dataSource.curp = this.curp,
            this.dataSource.nombre = this.nom,
            this.dataSource.apellidoPaterno = this.ap,
            this.dataSource.apellidoMaterno = this.am,
            this.dataSource.fechaNac = this.fn.getFullYear().toString() +
             '/' + (this.fn.getMonth() + 1).toString() + '/' + this.fn.getDate().toString(),
            this.dataSource.genero = this.model.options === '2' ? 'Mujer' : 'Hombre',
            this.dataSource.EstadoNacimientoId = this.estadoId,
            this.dataSource.localidad = estado[0].estado,
            this.dataSource.MunicipioNacimientoId = 0,
            this.dataSource.email = this.email.trim(),
            this.dataSource.lada = this.txtLada;
          this.dataSource.telefono = this.txtPhone;
          this.dataSource.opcionRegistro = this.modelOpc.options;
          this.dataSource.Id = this.dataSource.candidatoId;
          obj = this.dataSource;
          obj['email'] = [{ email: this.email.trim() || 'SIN REGISTRO', UsuarioMod: this.settings.user['usuario'] }];
          obj['telefono'] = [{ ClaveLada: this.txtLada,
            telefono: this.txtLada + '-' + this.txtPhone, UsuarioMod: this.settings.user['usuario'], }],
          this.campoService.UpdateContratadosCampo(obj).subscribe(r => {
            if ( r === 200) {
              this.dataSource.nombre = this.nom + ' ' + this.ap + ' ' + this.am;
              this.dataSource.email = this.email;
              this.dataSource.telefono = this.txtLada + '-' + this.txtPhone;
              this.dataSource.edad = this.date;
              this.dialog.close(this.dataSource);
            } else {
              swalWithBootstrapButtons.fire('Error', 'Ocurrió un error al intentar modificar. Por favor intentelo de nuevo', 'error');
            }
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'CANCELADO',
            'No se realizó ningún cambio',
            'error'
          );
        }
      });
    }
  }

  selectEstado(estadoId) {
    const aux = this.estados.filter( e => {
      if(e.id === estadoId) {
        return e;
      }
    });
    if(aux.length > 0) {
    this.estado = aux[0].estado.toUpperCase();
    } else {
      this.estado = 'SIN REGISTRO';
    }
  }
  GenerarCurp(): string {
    const obj = new CURPValidator();
    const clave = this.estados.filter(element => {
      if (element.id === this.estadoId) {
        return element;
      }
    });

    const curp = obj.ValidarCurp(this.nom, this.ap, this.am, this.fn, this.model.options, clave[0].clave, '', true);

    this.curp = curp;
    return curp;
  }

  ValidarEmail(email) {
    this.valTel = '';
    this.valEmail = '';
    const regexpEmail = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$');
    if (regexpEmail.test(email)) {
      this.postulateservice.ValidarEmailCandidato(email).subscribe(data => {
        if (data === 302) {
          this.valEmail = 'el email ' + email + ' ya se encuentra registrado';
          this.email = '';
        }
      });
    } else {
      this.valEmail = 'el email ' + email + ' no tiene el formato correcto';
      this.email = '';
    }
  }

  ValidarTelefono() {
    this.valEmail = '';
    this.valTel = '';
    // var regex = /^[+ 0-9]{5}$/;  valida que solo sean numeros y longitud 5
    const regex = /^[0-9]+$/;

    if (regex.test(this.txtLada) && regex.test(this.txtPhone)) {
      this.postulateservice.ValidarTelCandidato(this.txtLada, this.txtPhone).subscribe(data => {
        if (data === 302) {
          this.valTel = 'El teléfono ' + this.txtLada + '-' + this.txtPhone + ' ya se encuentra registrado';
          this.txtLada = '';
          this.txtPhone = '';
        } 
      });
    } else if (this.modelOpc.options === '2') {
      this.valTel = 'Lada y teléfono son campos necesarios y deben ser númericos';
      this.txtLada = '';
      this.txtPhone = '';
      this.email = 'REGISTRO POR TELEFONO';
    }
  }
  valOpcionReg(val) {

    const regexpEmail = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$');
    const regex = /^[0-9]+$/;

    if (val === 1) {
      if (!regexpEmail.test(this.email)) {
        this.email = '';
      }
      this.txtLada = '---';
      this.txtPhone = '-------';

    } else if (val === 2 && this.txtPhone.length > 0) {
      if (!regex.test(this.txtPhone)) {
        this.txtPhone = '';
        this.txtLada = '';
      }
      this.email = 'REGISTRO POR TELEFONO';

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

  BorrarCampos() {
    this.curp = '';
    this.nom = '';
    this.ap = '';
    this.am = '';
    this.edad = 0;
    this.email = '';
    this.txtPhone = '';
    this.txtLada = '';
    this.rbS = 0;
    this.estadoId = 0;
    this.date = new Date();
    this.model.options = '0';
    this.modelOpc.options = '0';

  }

  close() {
    this.dialog.close(0);
  }

  GetHorarioRequis() {
        this.Requiservice.GetHorariosRequiConteo(this.dataSource.requisicionId).subscribe(result => {
          let aux = result.filter(element => !element.vacantes);

          if (aux.length === 0) {
            aux = [{ id: 0, nombre: 'Los horarios ya están cubiertos' }]
          }

          this.OpenDlgHorarios(aux, 18, 'ENTREVISTA RECLUTAMIENTO', this.dataSource.requisicionId);
        });

  }

  OpenDlgHorarios(data, estatusId, estatus, requi) {
    const dialogDlt = this.dialog2.open(DialogHorariosConteoComponent, {
      width: '45%',
      height: 'auto',
      data: data,
      disableClose: true
    });

    dialogDlt.afterClosed().subscribe(result => {
      if (result !== 0) {
       this.horarioId = result.horarioId;
       this.tipoMediosId = result.mediosId;
      this.horario = result.horario;
      }
    });
  }

  popToast(type, title, body) {
    const toast: Toast = {
      type: type,
      title: title,
      timeout: 4000,
      body: body
    }
    this.toasterService.pop(toast);

  }

}
