
import { CURPValidator } from './GenerarCURP';
import { Component, OnInit, Inject } from '@angular/core';
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
import { RequisicionesService } from '../../service';
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

@Component({
  selector: 'app-dlg-registro-masivo',
  templateUrl: './dlg-registro-masivo.component.html',
  styleUrls: ['./dlg-registro-masivo.component.scss'],
  providers: [
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

  curp = '';
  nom = '';
  ap = '';
  am = '';
  email = '';
  txtPhone = '';
  estados: any = [];
  municipios: any = [];
  edad = 0;
  fn: Date = new Date();
  rbS: any = 0;
  estadoId = 0;
  municipioId = 0;
  date: Date;
  editing = {};
  model = { options: '0' };
  modelOpc = { options: '0' };
  valEmail = '';
  public columns: Array<any> = [
    { title: 'Horario', className: 'text-success text-center', name: 'horario', filtering: { filterString: '', placeholder: 'Horario' } },
    { title: 'CURP', className: 'text-success text-center', name: 'curp', filtering: { filterString: '', placeholder: 'CURP' } },
    { title: 'Nombre', className: 'text-center', name: 'nombre', filtering: { filterString: '', placeholder: 'Nombre' } },
    { title: 'Apellido Paterno', className: 'text-center', name: 'apellidoPaterno',
     filtering: { filterString: '', placeholder: 'Apellido Paterno' } },
    { title: 'Apellido Materno', className: 'text-center', name: 'apellidoMaterno',
    filtering: { filterString: '', placeholder: 'Apellido Materno' } },
    { title: 'Fecha Nacimiento', className: 'text-center', name: 'fechaNac', filtering: { filterString: '', placeholder: 'aaaa-mm-dd' } },
    { title: 'Sexo', className: 'text-center', name: 'genero', filtering: { filterString: '', placeholder: 'Sexo' } },
    { title: 'Estado Nac.', className: 'text-center', name: 'estado', filtering: { filterString: '', placeholder: 'Estado' } },
    { title: 'Email', className: 'text-center', name: 'email', filtering: { filterString: '', placeholder: 'Email' } },
    { title: 'Teléfono', className: 'text-center', name: 'telefono', filtering: { filterString: '', placeholder: 'Teléfono' } },
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
  horarioId: any;
  tipoMediosId: any;

  constructor(private postulateservice: PostulateService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialogRef<DlgRegistroMasivoComponent>,
    private adapter: DateAdapter<any>,
    private _service: SistTicketsService,
    private toasterService: ToasterService,
    private settings: SettingsService,
    private spinner: NgxSpinnerService,
    private dialog2: MatDialog,
    private Requiservice: RequisicionesService) {
    this.adapter.setLocale('es');


  }

  //#region paginador
  public config: any = {
    paging: true,
    filtering: { filterString: '' },
    className: ['table-hover mb-0 ']
  };

  public changePage(page: any, data: Array<any> = this.dataSource): Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
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

  //#endregion
  public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
    const filteredData = this.changeFilter(this.dataSource, this.config);
    this.rows = page && config.paging ? this.changePage(page, filteredData) : filteredData;
    this.registros = this.rows.length;
    this.length = filteredData.length;
  }

  public onCellClick(row, rowIndex) {
    row.selected = true;
    this.rowIndex = rowIndex;
    this.curp = row.curp;
    this.nom = row.nombre;
    this.ap = row.apellidoPaterno;
    this.am = row.apellidoMaterno;
    this.email = row.email;
    this.txtLada = row.lada;
    this.txtPhone = row.telefono.substring(row.telefono.indexOf('-') + 1, row.telefono.length);
    // this.municipios = {id: row.MunicipioNacimientoId, municipio: row.municipio};
    this.model.options = row.genero === 'Mujer' ? '2' : '1';
    this.modelOpc.options = row.opcionRegistro;
    this.estadoId = row.EstadoNacimientoId;
    this.date = new Date(row.fechaNac);
    this.validarFecha(this.date);
    this.valOpcionReg(this.modelOpc.options);

    if (this.rowAux.length === 0) {
      this.rowAux = row;
    } else if (this.rowAux !== []) {
      let aux = row;
      row = this.rowAux;
      row.selected = false;
      this.rowAux = aux;
    }

  }

  ngOnInit() {
    this.GetEstados();
  }
  GetEstados() {
    this._service.GetEstados().subscribe(data => {
      this.estados = data;
    });
  }

  GetMunicipio(estadoId) {
    this._service.GetMunicipio(estadoId).subscribe(data => {
      this.municipios = data;
    });
  }

  GenerarCurp(): string {
    const obj = new CURPValidator();
    const clave = this.estados.filter(element => {
      if (element.id.toString() === this.estadoId) {
        return element;
      }
    });

    const curp = obj.ValidarCurp(this.nom, this.ap, this.am, this.fn, this.model.options, clave[0].clave, '', true);

    this.curp = curp;
    return curp;
  }
  AgregarCandidato() {
    if (this.modelOpc.options === '1') {
      this.ValidarEmail(this.email);
    } else {
      this.ValidarTelefono();
    }

    if (this.valEmail === '' && this.valTel === '') {

      const count = this.data.nv - (this.data.contratados + this.dataSource.length + 1);
      if (count < 0) {
        swal('Registro', 'Ya se cubrió el total de vacantes.', 'warning');
      } else {
        // let email = [{ email: this.email.trim(), UsuarioAlta: 'INNTEC' }];

        const estado = this.estados.filter(item => {
          if (item.id.toString() === this.estadoId) {
            return item.estado;
          }
        });

        const candidato = {
          curp: this.curp,
          nombre: this.nom,
          apellidoPaterno: this.ap,
          apellidoMaterno: this.am,
          email: this.email.trim(),
          fechaNac: this.fn.getFullYear().toString() + '/' + (this.fn.getMonth() + 1).toString() + '/' + this.fn.getDate().toString(),
          genero: this.model.options == '2' ? 'Mujer' : 'Hombre',
          EstadoNacimientoId: this.estadoId,
          estado: estado[0].estado,
          lada: this.txtLada,
          telefono: this.txtLada + '-' + this.txtPhone,
          opcionRegistro: this.modelOpc.options,
          horario: this.horario,
          horarioId: this.horarioId,
          tipoMediosId: this.tipoMediosId
        };

        this.dataSource.push(candidato);
        this.onChangeTable(this.config);
        this.BorrarCampos();

        if (count === 0) {
          swal('Vacante cubierta', 'Se cubrió el total de vacantes, no se podrá agregar más candidatos', 'warning');
        }
      }
    }
  }

  EditarCandidato() {
    if (this.modelOpc.options === '1') {
      this.ValidarEmail(this.email);
    } else {
      this.ValidarTelefono();
    } if (this.valEmail === '' && this.valTel === '') {
      const estado = this.estados.filter(item => {
        if (item.id === this.estadoId) {
          return item.estado;
        }
      });

      this.dataSource[this.rowIndex].curp = this.curp,
        this.dataSource[this.rowIndex].nombre = this.nom,
        this.dataSource[this.rowIndex].apellidoPaterno = this.ap,
        this.dataSource[this.rowIndex].apellidoMaterno = this.am,
        this.dataSource[this.rowIndex].email = this.email.trim(),
        this.dataSource[this.rowIndex].fechaNac = this.fn.getFullYear().toString() + '/' + (this.fn.getMonth() + 1).toString() + '/' + this.fn.getDate().toString(),
        this.dataSource[this.rowIndex].genero = this.model.options == '2' ? 'Mujer' : 'Hombre',
        this.dataSource[this.rowIndex].EstadoNacimientoId = this.estadoId,
        this.dataSource[this.rowIndex].estado = estado[0].estado,
        this.dataSource[this.rowIndex].MunicipioNacimientoId = this.municipioId,
        // municipio: municipio[0].municipio,
        this.dataSource[this.rowIndex].lada = this.txtLada;
      this.dataSource[this.rowIndex].telefono = this.txtPhone;
      this.dataSource[this.rowIndex].opcionRegistro = this.modelOpc.options;

      this.onChangeTable(this.config);
      this.BorrarCampos();
    }

  }

  BorrarCandidato(rowIndex) {
    this.dataSource.splice(rowIndex, 1);
    this.onChangeTable(this.config);
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
        } else {
          const x = this.dataSource.findIndex(value => value.email === this.email);
          if (x === -1) {
            this.valEmail = '';
          } else if (this.rowIndex === -1) {
            this.valEmail = 'No se puede repetir email';
            this.email = '';
          }
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
        } else {
          const x = this.dataSource.findIndex(value => value.telefono === this.txtPhone);
          if (x === -1) {
            this.valTel = '';
          } else if (this.rowIndex === -1) {
            this.valEmail = 'No se puede repetir Teléfono';
            this.txtPhone = '';
          }
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
      this.txtPhone = '-------'

    } else if (val === 2 && this.txtPhone.length > 0) {
      if (!regex.test(this.txtPhone)) {
        this.txtPhone = '';
        this.txtLada = '';
      }
      this.email = 'REGISTRO POR TELEFONO';

    }
  }
  registrar() {
    const count = this.data.nv - (this.data.contratados + this.dataSource.length);
    if (count < 0) {
      swal('Registro', 'El total de candidatos es mayor al de las vacantes', 'warning');
    } else {
      swal({
        title: '¿ESTÁS SEGURO?',
        text: '¡Se registrarán (' + this.dataSource.length.toString() + ') candidatos con estatus cubierto para la vacante de ' + this.data.vacante,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#21a240',
        confirmButtonText: '¡Si, registrar candidato(s)!',
        cancelButtonText: '¡No, cancelar!',
        closeOnConfirm: true,
        closeOnCancel: true
      }, (isConfirm) => {
        window.onkeydown = null;
        window.onfocus = null;
        if (isConfirm) {

          this.spinner.show();
          const aux = [];

          this.dataSource.forEach(element => {
            const email = [{ email: element.email.trim() || 'SIN REGISTRO', UsuarioAlta: 'INNTEC' }];

            const candidato = {
              Curp: element.curp,
              Nombre: element.nombre,
              ApellidoPaterno: element.apellidoPaterno,
              ApellidoMaterno: element.apellidoMaterno,
              Email: email,
              FechaNac: element.fechaNac,
              GeneroId: element.genero == 'Mujer' ? 2 : 1,
              EstadoNacimientoId: element.EstadoNacimientoId,
              Telefono: [{ ClavePais: 52, ClaveLada: element.lada, telefono: element.telefono, TipoTelefonoId: 1 }],
              requisicionId: this.data.requisicionId,
              reclutadorId: this.settings.user['id'],
              OpcionRegistro: element.opcionRegistro,
              horarioId: this.horarioId,
              tipoMediosId: this.tipoMediosId,
            };
            aux.push(candidato);
          });
          this.postulateservice.RegistrarCandidatos(aux).subscribe(data => {
            this.spinner.hide();
            if (data !== 417) {
              this.dialog.close(data);
            }

          });

        } else {
          this.spinner.hide();
          swal('Cancelado', 'No se realizó ningún cambio', 'error');
        }
      });
    }

  }
  updateValue($event, cell, rowIndex, g) {

    if (cell === 'estado') {
      const estado = this.estados.filter(item => {
        if (item.id == this.estadoId) {
          return item.estado;
        }
      });

      this.dataSource[rowIndex]['EstadoNacimientoId'] = $event.target.value;
      this.dataSource[rowIndex][cell] = estado[0].estado;
    } else if (cell === 'municipio') {
      const municipio = this.municipios.filter(item => {
        if (item.id === this.municipioId) {
          return item.municipio;
        }
      });
      this.dataSource[rowIndex]['MunicipioNacimientoId'] = $event.target.value;
      this.dataSource[rowIndex][cell] = municipio[0].municipio;
    } else if ($event.target.value !== '') {
      this.dataSource[rowIndex][cell] = $event.target.value;
    }

    this.editing[rowIndex + '-' + cell] = false;
    this.dataSource = [...this.dataSource];
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
    this.municipios = [];
    this.rbS = 0;
    this.estadoId = 0;
    this.municipioId = 0;
    this.GetEstados();
    this.date = new Date();
    this.rowIndex = -1;
    this.model.options = '0';
    this.modelOpc.options = '0';
    this.dataSource.forEach(element => {
      element.selected = false;
    })
    this.rowAux = [];
    this.onChangeTable(this.config);
  }

  close() {
    this.dialog.close(0);
  }

  GetHorarioRequis() {
        this.Requiservice.GetHorariosRequiConteo(this.data.requisicionId).subscribe(result => {
          let aux = result.filter(element => !element.vacantes);

          if (aux.length === 0) {
            aux = [{ id: 0, nombre: 'Los horarios ya están cubiertos' }]
          }

          this.OpenDlgHorarios(aux, 18, 'ENTREVISTA RECLUTAMIENTO', this.data.requisicionId);
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
       this.AgregarCandidato();
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
