import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { CandidatosService } from '../../service/Candidatos/candidatos.service';
import { Filtros } from '../../models/recl/candidatos';
import { Observable } from 'rxjs';
import { PcondiscapacidadComponent } from '../../routes/recl/candidatos/busqueda/pcondiscapacidad/pcondiscapacidad.component';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-busqueda-candidatos',
  templateUrl: './busqueda-candidatos.component.html',
  styleUrls: ['./busqueda-candidatos.component.scss'],
  providers: [CandidatosService]
})
export class BusquedaCandidatosComponent implements OnInit {
  @Output('filtro') filtro: EventEmitter<any> = new EventEmitter<any>();
  //**************************************************************************** */
  Candidatos: any;
  CodigoPostal: FormControl;
  cp: any;
  // Variables para Paises
  Paises: any[];
  filtropais: any;
  filteredCountry: Observable<any[]>;
  countryCtrl: FormControl;
  // Variables para Estados
  Estados: any[];
  StatesCtrl: FormControl;
  filteredStates: Observable<any[]>;
  filtroestado: any;
  // Variables para Municipios
  Municipios: any[];
  MunicipioCtrl: FormControl;
  filteredMunicipio: Observable<any[]>;
  filtromunicipio: any;
  // Variables para colonias
  Colonias: any[];
  ColoniaCtrl: FormControl;
  filteredColonia: Observable<any[]>;
  filtroColonia: any;
  // Variables Area Experiencia
  Areasexp: any[];
  aresexpCtrl: FormControl;
  filteredareaexp: Observable<any[]>;
  filtroareaexp: any;
  // Variables Perfil
  Perfiles: any[];
  perfilCtrl: FormControl;
  filteredperfil: Observable<any[]>;
  filtroperfil: any;
  // Salario
  salarioCtrl: FormControl;
  salario: any;
  // Variables Genero
  Generos: any[];
  generoCtrl: FormControl;
  filteredgenero: Observable<any[]>;
  filtrogenero: any;
  // Edad
  edadCtrl: FormControl;
  edad: any;
  // reubicar
  checkedCtrl: FormControl;
  checked: boolean;
  // Variables Personas con discapacidad
  pdiscapacidades: any[];
  pdiscapacidadCtrl: FormControl;
  filteredpdiscapacidad: Observable<any[]>;
  filtropd: any;
  // Variables tipo licencia
  tplicencia: any[];
  tplicCtrl: FormControl;
  filteredtplicencia: Observable<any[]>;
  filtrotplic: any;
  // Veiculo Propio
  checkedVCtrl: FormControl;
  checkedV: boolean;
  // Nivel Estudio
  nvestuidios: any;
  nvestudiosCtrl: FormControl;
  filterednvestudios: Observable<any[]>;
  filtronv: any;
  // Variables Idioma
  idiomas: any;
  idiomasCtrl: FormControl;
  filteredidiomas: Observable<any[]>;
  filtroidioma: any;
  loading: boolean;


  constructor(
    private service: CandidatosService
  ) {
    this.countryCtrl = new FormControl();
    this.StatesCtrl = new FormControl();
    this.MunicipioCtrl = new FormControl();
    this.ColoniaCtrl = new FormControl();
    this.CodigoPostal = new FormControl('', Validators.maxLength(7));
    this.aresexpCtrl = new FormControl();
    this.perfilCtrl = new FormControl();
    this.salarioCtrl = new FormControl();
    this.generoCtrl = new FormControl();
    this.edadCtrl = new FormControl();
    this.checkedCtrl = new FormControl();
    this.pdiscapacidadCtrl = new FormControl();
    this.tplicCtrl = new FormControl();
    this.checkedVCtrl = new FormControl();
    this.nvestudiosCtrl = new FormControl();
    this.idiomasCtrl = new FormControl();
  }

  ngOnInit() {
    this.getPais();
    this.cargarAreaExperiencia();
    this.getPerfil();
    this.cargarGenero();
    this.cargarDiscapacidad();
    this.cargarTipoLicencia();
    this.cargarNivelEstudio();
    this.cargarIdiomas();
  }

  // Paises
  getPais() {
    this.service.getpaises().subscribe(data => {
      this.Paises = data.paises;
      this.filteredCountry = this.countryCtrl.valueChanges
        .pipe(startWith(''),
          map(pais => pais ? this.filterCountry(pais) : this.Paises.slice()));
    });
  }
  filterCountry(pais: string) {
    return this.filtropais = this.Paises.filter(country =>
      country.pais.toLowerCase().indexOf(pais.toLowerCase()) === 0);
  }

  // Estados
  cargarEstados() {
    if (this.filtropais != null) {
      this.service.getestados(this.filtropais[0].id).subscribe(data => {
        this.Estados = data.estados;
        this.filteredStates = this.StatesCtrl.valueChanges
          .pipe(startWith(''),
            map(estado => estado ? this.filterState(estado) : this.Estados.slice())
          );
      })
    }
  }
  filterState(estado: string) {
    return this.filtroestado = this.Estados.filter(state =>
      state.estado.toLowerCase().indexOf(estado.toLowerCase()) === 0);
  }

  // Muncipios
  cargarMunicipios() {
    if (this.filtroestado != null) {
      this.service.getmunicipios(this.filtroestado[0].id).subscribe(data => {
        this.Municipios = data.municipios;
        this.filteredMunicipio = this.MunicipioCtrl.valueChanges
          .pipe(startWith(''),
            map(municipio => municipio ? this.filterMunicipio(municipio) : this.Municipios.slice())
          );
      })
    }
  }
  filterMunicipio(municipio: string) {
    return this.filtromunicipio = this.Municipios.filter(muni =>
      muni.municipio.toLowerCase().indexOf(municipio.toLowerCase()) === 0);
  }

  // Colonias
  cargarColonias() {
    if (this.filtromunicipio != null) {
      this.service.getcolonias(this.filtromunicipio[0].id)
        .subscribe(data => {
          this.Colonias = data.colonias;
          this.filteredColonia = this.ColoniaCtrl.valueChanges
            .pipe(startWith(''),
              map(colonia => colonia ? this.filterColonia(colonia) : this.Colonias.slice())
            );
        })
    }
  }
  filterColonia(colonia: string) {
    this.filtroColonia = this.Colonias.filter(col =>
      col.colonia.toLowerCase().indexOf(colonia.toLowerCase()) === 0);
    this.cp = this.filtroColonia[0].cp;
    return this.filtroColonia
  }

  // Area Experiencia
  cargarAreaExperiencia() {
    this.service.getareasexp().subscribe(data => {
      this.Areasexp = data;
      this.filteredareaexp = this.aresexpCtrl.valueChanges
        .pipe(startWith(''),
          map(area => area ? this.filterareaexp(area) : this.Areasexp.slice()));
    });
  }
  filterareaexp(area: string) {
    return this.filtroareaexp = this.Areasexp.filter(areaexp =>
      areaexp.areaExperiencia.toLowerCase().indexOf(area.toLowerCase()) === 0);
  }

  // Perfil
  getPerfil() {
    this.service.getperfiles().subscribe(data => {
      this.Perfiles = data;
      this.filteredperfil = this.perfilCtrl.valueChanges
        .pipe(startWith(''),
          map(perfil => perfil ? this.filterperfil(perfil) : this.Perfiles.slice()));
    });
  }
  filterperfil(perfil: string) {
    return this.filtroperfil = this.Perfiles.filter(perfilexp =>
      perfilexp.perfilExperiencia.toLowerCase().indexOf(perfil.toLowerCase()) === 0);
  }

  // Genero
  cargarGenero() {
    this.service.getgeneros().subscribe(data => {
      this.Generos = data;
      this.filteredgenero = this.generoCtrl.valueChanges
        .pipe(startWith(''),
          map(genero => genero ? this.filtergenero(genero) : this.Generos.slice()));
    })
  }
  filtergenero(genero: string) {
    return this.filtrogenero = this.Generos.filter(generos =>
      generos.genero.toLowerCase().indexOf(genero.toLowerCase()) === 0);
  }

  // Persona con discapacidad
  cargarDiscapacidad() {
    this.service.getdiscapacidad().subscribe(data => {
      this.pdiscapacidades = data;
      this.filteredpdiscapacidad = this.pdiscapacidadCtrl.valueChanges
        .pipe(startWith(''),
          map(pdis => pdis ? this.filterpdiscapacidad(pdis) : this.pdiscapacidades.slice()));
    });
  }
  filterpdiscapacidad(pdiscapa: string) {
    return this.filtropd = this.pdiscapacidades.filter(pdisc =>
      pdisc.tipoDiscapacidad.toLowerCase().indexOf(pdiscapa.toLowerCase()) === 0);
  }

  // TipoLicencia
  cargarTipoLicencia() {
    this.service.gettplicencia().subscribe(data => {
      this.tplicencia = data;
      this.filteredtplicencia = this.tplicCtrl.valueChanges
        .pipe(startWith(''),
          map(tp => tp ? this.filtertplicencia(tp) : this.tplicencia.slice()));
    });
  }
  filtertplicencia(tplic: string) {
    return this.filtrotplic = this.tplicencia.filter(tp =>
      tp.descripcion.toLowerCase().indexOf(tplic.toLowerCase()) === 0);
  }

  // Nivel Estudio
  cargarNivelEstudio() {
    this.service.getnivelestudio().subscribe(data => {
        this.nvestuidios = data;
        this.filterednvestudios = this.nvestudiosCtrl.valueChanges
          .pipe(startWith(''),
            map(nv => nv ? this.filternvestudio(nv) : this.nvestuidios.slice()));
      })
  }
  filternvestudio(nvest: string) {
    return this.filtronv = this.nvestuidios.filter(nv =>
      nv.gradoEstudio.toLowerCase().indexOf(nvest.toLowerCase()) === 0);
  }

  // Idiomas
  cargarIdiomas() {
    this.service.getidiomas().subscribe(data => {
      this.idiomas = data;
      this.filteredidiomas = this.idiomasCtrl.valueChanges
        .pipe(startWith(''),
        map(id => id ? this.filterIdioma(id) : this.idiomas.slice()));
    })
  }
  filterIdioma(idiom: string) {
    return this.filtroidioma = this.idiomas.filter(id =>
      id.idioma.toLowerCase().indexOf(idiom.toLowerCase()) === 0);
  }
  
  BusacarMisCandidatos(){
    this.loading = true;
    this.service.getMisCandidatos(localStorage.getItem('id')).subscribe(data =>{
      this.Candidatos = data;
      this.loading = false;
    });
  }

  Buscar() {
    this.loading = true;
    let filtroCandidatos: Filtros = new Filtros();
    filtroCandidatos.IdPais = this.filtropais ? this.filtropais[0].id : null ,
    filtroCandidatos.IdEstado = this.filtroestado ? this.filtroestado[0].id : null,
    filtroCandidatos.IdMunicipio = this.filtromunicipio ? this.filtromunicipio[0].id : null,
    filtroCandidatos.IdColonia = this.filtroColonia ? this.filtroColonia[0].id : null,
    filtroCandidatos.Cp = this.cp,
    filtroCandidatos.IdAreaExp = this.filtroareaexp ? this.filtroareaexp[0].id : null,
    filtroCandidatos.IdPerfil =  this.filtroperfil ?  this.filtroperfil[0].id : null,
    filtroCandidatos.Salario = this.salario  ,
    filtroCandidatos.IdGenero = this.filtrogenero ? this.filtrogenero[0].id : null,
    filtroCandidatos.Edad = this.edad,
    filtroCandidatos.Reubicacion = this.checked,
    filtroCandidatos.IdPDiscapacidad = this.filtropd ? this.filtropd[0].id : null,
    filtroCandidatos.IdTpLicencia = this.filtrotplic ? this.filtrotplic[0].id : null,
    filtroCandidatos.TpVehiculo = this.checkedV,
    filtroCandidatos.IdIdiomas = this.filtroidioma ? this.filtroidioma[0].id : null;
    filtroCandidatos.IdNvEstudios = this.filtronv ? this.filtronv[0].id : null

    this.service.getcandidatos(filtroCandidatos).subscribe( data =>{
      this.Candidatos = data;
      this.filtro.emit(this.Candidatos);
      this.loading = false;
    })
  }

  LimpiarFiltro() {
    this.countryCtrl.reset();
    this.filtropais = null
    this.StatesCtrl.reset();
    this.filtroestado = null
    this.MunicipioCtrl.reset();
    this.filtromunicipio = null
    this.ColoniaCtrl.reset();
    this.filtroColonia = null
    this.cp = null;
    this.aresexpCtrl.reset();
    this.filtroareaexp = null
    this.perfilCtrl.reset();
    this.filtroperfil = null
    this.salario = null;
    this.generoCtrl.reset();
    this.filtrogenero = null
    this.edad = null;
    this.checked = false;
    this.pdiscapacidadCtrl.reset();
    this.filtropd = null
    this.tplicCtrl.reset();
    this.filtrotplic = null
    this.checkedV = false;
    this.nvestudiosCtrl.reset();
    this.filtronv = null
    this.idiomasCtrl.reset();
    this.filtroidioma = null
  }
}
