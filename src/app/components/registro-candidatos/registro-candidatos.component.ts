import { Component, OnInit } from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
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
    console.log(event.target.value)
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

    this.edad = edad;
    console.log(edad);
 
  }

  BorrarCampos()
  {
    this.nom = '';
    this.ap = ''; 
    this.am = '';
    this.email = '';
    this.txtPhone = '';
    this.municipios = [];
    this.rbH = 0;
    this.rbM = 0;
    this.GetEstados();

  }

}
