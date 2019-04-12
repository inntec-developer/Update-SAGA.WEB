import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { MomentDateAdapter} from '@angular/material-moment-adapter';
import { SistTicketsService } from '../../service/SistTickets/sist-tickets.service';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

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
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class RegistroCandidatosComponent implements OnInit {
  @Output() validarRegistro:  EventEmitter<any> = new EventEmitter();
  @Input('extranjero') extranjero;
  nom = '';
  ap = ''; 
  am = '';
  email = '';
  txtPhone = '';
  estados: any = [];
  municipios: any = [];
  rbM = 0;
  rbH = 0;
  edad: number = 0;
  fn: Date;
  rbS: any = 0;
  estadoId = 0;
  municipioId = 0;
  opcRegistro1 = 1;
  opcRegistro2 = 0;
  date: Date;
  constructor(private adapter: DateAdapter<any>, private _service: SistTicketsService) {
    this.adapter.setLocale('es')

   }

  ngOnInit() {
    this.GetEstados();
  }

  GetEstados()
  {
    this._service.GetEstados().subscribe(data => {
      this.estados = data;
    })
  }

  GetMunicipio(event)
  {
    this._service.GetMunicipio(event.target.value).subscribe(data => {
      this.municipios = data;
    })
  }

  validarFecha(event: MatDatepickerInputEvent<Date>) {
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

  registrar()
  {

    let opc = 0;
    if(this.opcRegistro1 > 0)
    {
      opc = this.opcRegistro1;
    }
    else
    {
      opc = this.opcRegistro2;
    }

    let email = [{ email: this.email.trim(), UsuarioAlta: 'INNTEC' }];
    let candidato = {
      
      Nombre: this.nom,
      ApellidoPaterno: this.ap,
      ApellidoMaterno: this.am,
      Email: email,
      FechaNac: this.fn.getFullYear().toString() + '/' + (this.fn.getMonth()).toString() + '/' +  this.fn.getDate().toString(),
      GeneroId: this.rbS,
      EstadoNacimientoId: this.estadoId,
      MunicipioNacimientoId: this.municipioId,
      Telefono: [{ClavePais:52, ClaveLada: this.txtPhone.substring(0,2), telefono: this.txtPhone, TipoTelefonoId: 1}],
      // opcRegistro: opc
      
    };
    this._service.RegistrarCandidato(candidato).subscribe(data => {
      if(data != 417)
      {
        this.BorrarCampos();

      }
      this.validarRegistro.emit(data);
    })

  }
  BorrarCampos()
  {
    this.nom = '';
    this.ap = ''; 
    this.am = '';
    this.edad = 0;
    this.email = '';
    this.txtPhone = '';
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
