import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import { CandidatosService } from '../../../../service/index';
import {DomSanitizer} from '@angular/platform-browser';
import { Filtros } from '../../../../models/recl/candidatos';
import {MatIconRegistry} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';

// Modelos


// Servicios


@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss'],
  providers: [CandidatosService]
})
export class BusquedaComponent implements OnInit {

  IdPais: number;
  IdEstado: number;
  IdMunicipio: number;
  IdColonia: number;
  IdCp: number;
  Idexp: number;
  IdPerfil: number;
  IdGenero: number;
  IdPd: number;
  IdTpLic: number;
  IdNv: number;
  IdIdioma: number;
  Candidatos: any;
  Salario: number;
  Edad: number;
  Reubicacion: number;
  TpVehiculo: number;
  // Decorador para envio de busqueda a tabla de candidatos.
  @Output() filtro: EventEmitter<any> = new EventEmitter<any>();
  // Objeto de filtros de busqueda.
  public Filtros: FormGroup;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private service: CandidatosService){
    // iconRegistry.addSvgIcon(
    //      'find',
    //      sanitizer.bypassSecurityTrustResourceUrl('/assets/img/icon/ic_find_in_page_24px.svg'));
   }

   ngOnInit(){  }

  FiltroPais(event){
    this.IdPais = event;
  }

  FiltroEstado(event){
    this.IdEstado = event;
  }

  FiltroMunicipio(event){
    this.IdMunicipio = event;
  }

  FiltroColonia(event){
    this.IdColonia = event;
  }

  FiltroCp(event){
    this.IdCp = event;
  }

  Filtroareaexp(event){
    this.Idexp = event;
  }

  Filtroperfil(event){
    this.IdPerfil = event;
  }

  FiltroGenero(event){
    this.IdGenero = event;
  }

  FiltroPd(event){
    this.IdPd = event;
  }

  FiltroTpLic(event){
    this.IdTpLic = event;
  }

  FiltroNv(event){
    this.IdNv = event;
  }

  FiltroIdioma(event){
    this.IdIdioma = event;
  }

  FiltroSalario(salario: number){
    this.Salario = salario;
  }

  FiltroEdad(event){
    this.Edad = event;
  }

  FiltroRe(event){
    this.Reubicacion = event;
  }

  FiltroVh(event){
    this.TpVehiculo = event;
  }

  // Busqueda de candidatos segun filtros de busqueda.
  Buscar(){
  let filtroX: Filtros = new Filtros();

    filtroX.IdPais = this.IdPais;
    filtroX.IdEstado = this.IdEstado;
    filtroX.IdMunicipio = this.IdMunicipio;
    filtroX.Cp = this.IdCp;
    filtroX.IdAreaExp = this.Idexp;
    filtroX.IdPerfil = this.IdPerfil;
    filtroX.IdGenero = this.IdGenero;
    filtroX.IdPDiscapacidad = this.IdPd;
    filtroX.IdNvEstudios = this.IdNv;
    filtroX.IdIdiomas = this.IdIdioma;
    filtroX.Salario = this.Salario;
    filtroX.Edad = this.Edad;
    // filtroX.Reubica = this.Reubicacion;
    // filtroX.TpVehiculo = this.TpVehiculo;
    // filtroX.palabraClave = this.FiltroVacantes.get('palabraClave').value;
    this.service.getcandidatos(filtroX)
    .subscribe(data => {
      this.Candidatos = data;
      this.filtro.emit(this.Candidatos); // Envio de filtro a tabla de candidatos.
    })
  }

}
