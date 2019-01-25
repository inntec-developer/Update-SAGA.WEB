import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CatalogosService } from './../../../../../service/catalogos/catalogos.service';
import { ClientesService } from '../../../../../service/clientes/clientes.service';
import { CompanyValidation } from './company-validation';
import { CustomValidators } from 'ng2-validation';
import { emptyStringGetter } from '@swimlane/ngx-datatable/release/utils';

@Component({
  selector: 'app-nuevo-prospecto',
  templateUrl: './nuevo-prospecto.component.html',
  styleUrls: ['./nuevo-prospecto.component.scss'],
  providers: [CatalogosService, ClientesService]
})
export class NuevoProspectoComponent implements OnInit {

  public formGeneral: FormGroup;
  public formDirecciones: FormGroup;
  public formTelefonos: FormGroup;
  public formContactos: FormGroup;
  
  public addDireccion: boolean = false;

  public giros: any;
  public actividades: any;
  public tamanioEmpresa: any;
  public tipo: any;
  public tipoBase: any;
  public tipoDireccion: any;

  public paises: any;
  public estados: any;
  public municipios: any;
  public colonias: any;

  public isReadonly: boolean = false;
  public maxRat: number = 3;
  public clf: number = 1;
  public overStar: number;
  public percent: number;

  constructor(
    private fb: FormBuilder,
    private _CatalogoService: CatalogosService,
    private _ClienteService: ClientesService,
  ) {
    this.formGeneral = new FormGroup({
      Empresa: new FormControl('', [Validators.required]),
      ValidarEmpresa: new FormControl('', [Validators.required]),
      Giros: new FormControl('', Validators.required),
      Actividades: new FormControl('', Validators.required),
      NoEmpleados: new FormControl('', Validators.required),
      Tamanio: new FormControl('', Validators.required),
      Tipo: new FormControl('', Validators.required),
      TipoBase: new FormControl('', Validators.required)
    });
    this.formDirecciones =  new FormGroup({
      TipoDireccion: new FormControl('',[Validators.required]),
      Paises: new FormControl('', Validators.required),
      Estados: new FormControl('', Validators.required),
      Municipios: new FormControl('', Validators.required),
      Colonias: new FormControl('', Validators.required),
    })

  }

  ngOnInit() {
    this.getCatalogos();
    this.formGeneral = this.fb.group({
      // RazonSocial: this.fb.group({
      Empresa: ['', [Validators.required]],
      ValidarEmpresa: ['', [Validators.required]],
      // }, {validator: CompanyValidation.MachCompany}),
      Giros: ['', Validators.required],
      Actividades: ['', Validators.required],
      NoEmpleados: ['', Validators.required],
      Tamanio: ['', Validators.required],
      Tipo: ['', Validators.required],
      TipoBase: ['', Validators.required],
    }, { validator: CompanyValidation.MachCompany });
    
    this.formDirecciones =  this.fb.group({
      TipoDireccion: ['', [Validators.required]],
      Paises: ['', [Validators.required]],
      Estados: ['', [Validators.required]],
      Municipios: ['', [Validators.required]],
      Colonias: ['', [Validators.required]],
    })
  }

  getCatalogos() {
    this._CatalogoService.getGiroEmp().subscribe(result => {
      this.giros = result;
    });
    this._CatalogoService.getTamanioEmp().subscribe(result => {
      this.tamanioEmpresa = result;
    });
    this._CatalogoService.getTipoEmp().subscribe(result => {
      this.tipo = result;
    });
    this._CatalogoService.getTipoBase().subscribe(result => {
      this.tipoBase = result;
    });
    this._CatalogoService.getTipoDireccion().subscribe(result => {
      this.tipoDireccion = result;
    })
    this._CatalogoService.getPais().subscribe(result => {
      this.paises = result;
    })
   
  }

  getActividades() {
    this.actividades = null;
    this.formGeneral.controls['Actividades'].setValue('');
    let GiroId = this.formGeneral.get('Giros').value;
    this._CatalogoService.getActividadEmp(GiroId).subscribe(result => {
      this.actividades = result;
    });
  }

  getEstados(){
    this.estados = null;
    this.formDirecciones.controls['Estados'].setValue('');
    let PaisId = this.formDirecciones.get('Paises').value;
    this._CatalogoService.getEstado(PaisId).subscribe(result => {
      this.estados = result;
    })
  }

  getMunicipio(){
    this.municipios = null;
    this.formDirecciones.controls['Municipios'].setValue('');
    let EstadoId = this.formDirecciones.get('Estados').value;
    this._CatalogoService.getMunicipio(EstadoId).subscribe(result => {
      this.municipios = result;
    })
  }

  getColonias(){
    this.colonias = null;
    this.formDirecciones.controls['Colonias'].setValue('');
    let MunicipioId = this.formDirecciones.get('Municipios').value;
    this._CatalogoService.getColonias(MunicipioId).subscribe(result => {
      this.colonias = result;
    });
  }

  public hoveringOver(value: number): void {
    this.overStar = value;
    this.percent = 100 * (value / this.maxRat);
  };
  public resetStar(): void {
    this.overStar = void 0;
  }


}