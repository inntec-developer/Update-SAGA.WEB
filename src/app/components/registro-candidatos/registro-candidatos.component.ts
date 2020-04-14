import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { SistTicketsService } from '../../service/SistTickets/sist-tickets.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { PostulateService } from '../../service/SeguimientoVacante/postulate.service';
import { CURPValidator } from '../dlg-registro-masivo/GenerarCURP';

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


@Component({
  selector: 'app-registro-candidatos',
  templateUrl: './registro-candidatos.component.html',
  styleUrls: ['./registro-candidatos.component.scss'],
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
export class RegistroCandidatosComponent implements OnInit {
  @Output() validarRegistro: EventEmitter<any> = new EventEmitter();
  @Input('extranjero') extranjero;
  nom = '';
  ap = '';
  am = '';
  email = '';
  txtLada = '';
  txtPhone = '';
  estados: any = [];
  municipios: any = [];
  rbM = 0;
  rbH = 0;
  edad = 0;
  fn: Date;
  rbS: any = 0;
  estadoId = 0;
  municipioId = 0;
  opcRegistro1 = 1;
  opcRegistro2 = 0;
  date: Date;
  valEmail = '';
  valTel = '';
  loading = false;
  curp: any;
  constructor(private adapter: DateAdapter<any>, private _service: SistTicketsService, private postulateservice: PostulateService) {
    this.adapter.setLocale('es')

  }

  ngOnInit() {
    this.GetEstados();
  }

  GetEstados() {
    this._service.GetEstados().subscribe(data => {
      this.estados = data;
    });
  }

  GetMunicipio(event) {
    this._service.GetMunicipio(event.target.value).subscribe(data => {
      this.municipios = data;
    });
  }

  validarFecha(event: MatDatepickerInputEvent<Date>) {
    if (event.value != null) {
      var fn = new Date(event.value);
      var date = new Date();
      var edad = date.getFullYear() - fn.getFullYear();

      if (date.getMonth() < fn.getMonth() - 1) {
        edad--;
      }
      if (((fn.getMonth() - 1) == date.getMonth()) && (date < fn)) {
        edad--;
      }
      this.fn = new Date(fn.getFullYear(), fn.getMonth() + 1, fn.getDate());
      this.edad = edad;
    }
  }

  registrar() {
    let opc = 0;

    if (this.opcRegistro1 > 0) {
      this.ValidarEmail(this.email);
      opc = this.opcRegistro1;

    }  else {
      this.ValidarTelefono();
      opc = this.opcRegistro2;
    }
    if (this.valEmail == '' && this.valTel == '') {
      this.loading = true;
      let email = [{ email: this.email.trim(), UsuarioAlta: 'INNTEC' }];
      let candidato = {
        Curp: this.curp,
        Nombre: this.nom,
        ApellidoPaterno: this.ap,
        ApellidoMaterno: this.am,
        Email: email,
        FechaNac: this.fn.getFullYear().toString() + '/' + (this.fn.getMonth()).toString() + '/' + this.fn.getDate().toString(),
        GeneroId: this.rbS,
        EstadoNacimientoId: this.estadoId,
        MunicipioNacimientoId: 0,
        Telefono: [{ ClavePais: 52, ClaveLada: this.txtLada, telefono: this.txtPhone, TipoTelefonoId: 1 }],
        OpcionRegistro: opc

      };

      this._service.RegistrarCandidato(candidato).subscribe(result => {
        this.loading = false;
        this.validarRegistro.emit(result);

      })
    }
  }
  GenerarCurp(): string {
    let obj = new CURPValidator();
    let clave = this.estados.filter(element => {
      if (element.id == this.estadoId) {
        return element;
      }
    });

    const curp = obj.ValidarCurp(this.nom, this.ap, this.am, this.fn, this.rbS, clave[0].clave, '', true);

    this.curp = curp;
    return curp;
  }
  ValidarEmail(email): boolean {
    let regexpEmail = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$');
    if (regexpEmail.test(email)) {
      this.postulateservice.ValidarEmailCandidato(email).subscribe(data => {
        if (data == 302) {
          this.valEmail = 'el email ' + email + ' ya se encuentra registrado';
          this.email = '';

          return false;
        } else {
          this.valEmail = '';

          return true;
        }
      });
    } else {
      this.valEmail = 'el email ' + email + '  no tiene el formato correcto';
      this.email = '';
      return false;
    }
  }
  ValidarTelefono(): boolean {
    // var regex = /^[+ 0-9]{5}$/;  valida que solo sean numeros y longitud 5
    var regex = /^[0-9]+$/;

    if (regex.test(this.txtLada) && regex.test(this.txtPhone)) {
      this.postulateservice.ValidarTelCandidato(this.txtLada, this.txtPhone).subscribe(data => {
        if (data == 302) {
          this.valTel = 'El teléfono ' + this.txtLada + '-' + this.txtPhone + ' ya se encuentra registrado'
          this.txtLada = '';
          this.txtPhone = '';

          return false;
        } else {
          this.valTel = '';
          return true;

        }
      });
    } else if (this.opcRegistro2 == 1) {
      this.valTel = 'Lada y teléfono son campos necesarios y deben ser númericos';
      this.txtLada = '';
      this.txtPhone = '';

      return false;
    }
  }

  valOpcionReg(val) {
    let regexpEmail = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$');
    var regex = /^[0-9]+$/;

    if (val == 1) {
      if (!regexpEmail.test(this.email)) {
        this.email = '';
        this.valEmail = '';

      }

      this.opcRegistro2 = 0;
      this.txtLada = '---';
      this.txtPhone = '-------'
      this.valTel = '';
    }
    else if (val == 2) {
      if (!regex.test(this.txtPhone)) {
        this.txtPhone = '';
        this.txtLada = '';
        this.valTel = '';
      }
      this.opcRegistro1 = 0;
      this.email = 'REGISTRO POR TELEFONO'
      this.valEmail = '';

    }
  }
  BorrarCampos() {
    this.nom = '';
    this.ap = '';
    this.am = '';
    this.edad = 0;
    this.email = '';
    this.txtLada = '';
    this.txtPhone = '';
    this.valTel = '';
    this.municipios = [];
    this.rbH = 0;
    this.rbM = 0;
    this.rbS = 0;
    this.estadoId = 0;
    this.municipioId = 0;
    this.opcRegistro1 = 1;
    this.opcRegistro2 = 0;
    this.GetEstados();
    this.date = new Date();

  }

}
