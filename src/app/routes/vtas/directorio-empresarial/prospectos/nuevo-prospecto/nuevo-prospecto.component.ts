import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { CatalogosService } from './../../../../../service/catalogos/catalogos.service';
import { ClientesService } from '../../../../../service/clientes/clientes.service';
import { CompanyValidation } from './company-validation';
import { CustomValidators } from 'ng2-validation';
import { config } from 'rxjs';
import { emptyStringGetter } from '@swimlane/ngx-datatable/release/utils';

@Component({
  selector: 'app-nuevo-prospecto',
  templateUrl: './nuevo-prospecto.component.html',
  styleUrls: ['./nuevo-prospecto.component.scss'],
  providers: [CatalogosService, ClientesService]
})
export class NuevoProspectoComponent implements OnInit {

  public itemsPerPage: number = 5;
  public maxSize: number = 5;
  public showFilterRowD: boolean;
  public showFilterRowT: boolean;
  public showFilterRowC: boolean;
  public showFilterRowCn: boolean;

  /* Variables Auxuliares */
  public auxPais: any;
  public auxEstado: any;
  public auxMunicipio: any;
  public auxColonia: any;
  public auxTipoDireccion: any;
  public auxTipoTelefono: any;
  private idAuxD: number = 1;
  private idAuxT: number = 1;
  private idAuxC: number = 1;
  /***************************/

  public formGeneral: FormGroup;
  public formDirecciones: FormGroup;
  public formTelefonos: FormGroup;
  public formCorreos: FormGroup;
  public formContactos: FormGroup;

  public addDireccion: boolean;
  public DireccionesNew: Array<any> = [
    {
      idAux: 1,
      activo: true,
      calle: "Ramon Alcorta",
      codigoPostal: "44970",
      colonia: "Francisco Villa",
      coloniaId: 58798,
      esPrincipal: true,
      estado: "Jalisco",
      estadoId: 14,
      exterior: "1492",
      interior: "",
      municipio: "Guadalajara",
      municipioId: 571,
      pais: "Mexico",
      paisId: 42,
      referencia: "SIN REFERENCIA",
      tipoDireccion: "Fiscal",
      tipoDireccionId: 2,
    },
    {
      idAux: 2,
      activo: true,
      calle: "Fuente de la Alianza",
      codigoPostal: "45615",
      colonia: "Villa Fontana",
      coloniaId: 60595,
      esPrincipal: false,
      estado: "Jalisco",
      estadoId: 14,
      exterior: "124",
      interior: "",
      municipio: "San Pedro Tlaquepaque",
      municipioId: 611,
      pais: "Mexico",
      paisId: 42,
      referencia: "SIN REFERENCIA",
      tipoDireccion: "Sucursal",
      tipoDireccionId: 3,
    }
  ];
  public indexDireccion: any;
  public EditDireccion: boolean;
  public textbtnDirecciones: string;

  public addTelefono: boolean;
  public TelefonosNew: Array<any> = [
    {
      idAux: 1,
      activo: true,
      calle: "Fuente de la Alianza",
      claveLada: "33",
      clavePais: "52",
      esPrincipal: false,
      extencion: "",
      indexDireccion: 1,
      tTelefono: "Recados",
      telefono: "31441648",
      tipoTelefonoId: 3,
      usuarioAlta: "DAL2789",
    },
    {
      idAux: 2,
      activo: true,
      calle: "Fuente de la Alianza",
      claveLada: "33",
      clavePais: "52",
      esPrincipal: false,
      extencion: "",
      indexDireccion: 1,
      tTelefono: "Recados",
      telefono: "31441648",
      tipoTelefonoId: 3,
      usuarioAlta: "DAL2789",
    }
  ];
  public indexTelefonos: any;
  public EditTelefono: boolean;
  public textbtnTelefono: string;
  public esOficina: any;

  public addCorreo: boolean;
  public CorreosNew: Array<any> = [];
  public indexCorreos: any;
  public EditCorreo: boolean;
  textbtnCorreo: string;

  public addContacto: boolean;
  public ContactosNew: Array<any> = [];
  public indexContacto: any;
  public EditContacto: boolean;
  public textbtnContacto: string;
  public esOficinaContacto: any;

  public giros: any;
  public actividades: any;
  public tamanioEmpresa: any;
  public tipo: any;
  public tipoBase: any;
  public tipoDireccion: any;
  public tipoTelefonos: any;

  public paises: any;
  public estados: any;
  public municipios: any;
  public colonias: any;
  public cp: any;
  public Principal: boolean = false;

  public isReadonly: boolean = false;
  public maxRat: number = 3;
  public clf: number = 1;
  public overStar: number;
  public percent: number;

  public ladaPais: any = 52;
  public PrincipalT: boolean = false;



  constructor(
    private fb: FormBuilder,
    private _CatalogoService: CatalogosService,
    private _ClienteService: ClientesService,
    private toasterService: ToasterService
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
    this.formDirecciones = new FormGroup({
      TipoDireccion: new FormControl('', [Validators.required]),
      CodigoPostal: new FormControl('', [Validators.required, Validators.maxLength(5)]),
      Paises: new FormControl('', Validators.required),
      Estados: new FormControl('', Validators.required),
      Municipios: new FormControl('', Validators.required),
      Colonias: new FormControl('', Validators.required),
      Calle: new FormControl('', Validators.required),
      Exterior: new FormControl('', Validators.required),
      Interior: new FormControl(''),
      Referencia: new FormControl(''),
      Principal: new FormControl(false),
      Activo: new FormControl(true)
    });
    this.formTelefonos = new FormGroup({
      TelDireccion: new FormControl('', [Validators.required]),
      TipoTelefono: new FormControl('', [Validators.required]),
      LadaPais: new FormControl('52', [Validators.required, Validators.maxLength(3)]),
      Lada: new FormControl('', [Validators.required, Validators.maxLength(3)]),
      Numero: new FormControl('', [Validators.required, Validators.maxLength(8)]),
      Extencion: new FormControl(''),
      Principal: new FormControl(false),
      Activo: new FormControl(true)
    });
    this.formCorreos = new FormGroup({
      EmailDireccion: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Activo: new FormControl(true)
    });
    this.formContactos = new FormGroup({
      ContactoDireccion: new FormControl('',[Validators.required]),
      Nombre: new FormControl('',[Validators.required]),
      ApellidoPaterno: new FormControl('',[Validators.required]),
      ApellidoMaterno: new FormControl(''),
      Puesto: new FormControl('',[Validators.required]),
      TipoTelefono: new FormControl('',[Validators.required]),
      LadaPais: new FormControl('52', [Validators.required, Validators.maxLength(3)]),
      Lada: new FormControl('', [Validators.required, Validators.maxLength(3)]),
      Numero: new FormControl('', [Validators.required, Validators.maxLength(8)]),
      Extencion: new FormControl(''),
      Email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  ngOnInit() {
    this.onChangeTableD(this.config);
    this.onChangeTableT(this.config);
    this.idAuxD = this.DireccionesNew.length + 1;
    this.idAuxT = this.TelefonosNew.length + 1;
    this.showFilterRowD = true;
    this.showFilterRowT = true;
    this.showFilterRowC = true;
    this.showFilterRowCn = true;

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

    this.formDirecciones = this.fb.group({
      TipoDireccion: ['', [Validators.required]],
      CodigoPostal: ['', [Validators.required, Validators.maxLength(5)]],
      Paises: ['', [Validators.required]],
      Estados: ['', [Validators.required]],
      Municipios: ['', [Validators.required]],
      Colonias: ['', [Validators.required]],
      Calle: ['', [Validators.required]],
      Exterior: ['', [Validators.required]],
      Interior: [''],
      Referencia: [''],
      Principal: [false],
      Activo: [true]
    });

    this.formTelefonos = this.fb.group({
      TelDireccion: ['', [Validators.required]],
      TipoTelefono: ['', [Validators.required]],
      LadaPais: ['52', [Validators.required, Validators.maxLength(3)]],
      Lada: ['', [Validators.required, Validators.maxLength(3)]],
      Numero: ['', [Validators.required, Validators.maxLength(8)]],
      Extencion: [''],
      Principal: [false],
      Activo: [true]
    });

    this.formCorreos = this.fb.group({
      EmailDireccion: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      Activo: [true]
    });

    this.formContactos = this.fb.group({
      Nombre: ['', [Validators.required]],
      ApellidoPaterno: ['', [Validators.required]],
      ApellidoMaterno: ['', ],
      Puesto: ['', [Validators.required]],
      ContactoDireccion: ['', [Validators.required]],
      TipoTelefono: ['', [Validators.required]],
      LadaPais: ['52', [Validators.required, Validators.maxLength(3)]],
      Lada: ['', [Validators.required, Validators.maxLength(3)]],
      Numero: ['', [Validators.required, Validators.maxLength(8)]],
      Extencion: [''],
      Email: ['', [Validators.required, Validators.email]],
    })
  }

  //#region Servicios GET
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
    });
    this._CatalogoService.getPais().subscribe(result => {
      this.paises = result;
    });
    this._CatalogoService.getTipoTelefono().subscribe(result => {
      this.tipoTelefonos = result;
    });
  }

  getTipoTeledono() {
    this.esOficina = this.formTelefonos.get('TipoTelefono').value;
  }

  getTipoTeledonoContacto() {
    this.esOficinaContacto = this.formContactos.get('TipoTelefono').value;
  }


  getActividades() {
    this.actividades = null;
    this.formGeneral.controls['Actividades'].setValue('');
    let GiroId = this.formGeneral.get('Giros').value;
    this._CatalogoService.getActividadEmp(GiroId).subscribe(result => {
      this.actividades = result;
    });
  }

  getEstados() {
    this.estados = null;
    this.formDirecciones.controls['Estados'].setValue('');
    let PaisId = this.formDirecciones.get('Paises').value;
    this._CatalogoService.getEstado(PaisId).subscribe(result => {
      this.estados = result;
    })
  }

  getMunicipio() {
    this.municipios = null;
    this.formDirecciones.controls['Municipios'].setValue('');
    let EstadoId = this.formDirecciones.get('Estados').value;
    this._CatalogoService.getMunicipio(EstadoId).subscribe(result => {
      this.municipios = result;
    })
  }

  getColonias() {
    this.colonias = null;
    this.formDirecciones.controls['Colonias'].setValue('');
    let MunicipioId = this.formDirecciones.get('Municipios').value;
    this._CatalogoService.getColonias(MunicipioId).subscribe(result => {
      this.colonias = result;
    });
  }

  getCodigoPostal(cp: any) {
    this.formDirecciones.controls['CodigoPostal'].setValue(cp);
  }

  //#endregion
  
  //#region Cancelar Acciones 
  cancelarDireccion() {
    this.estados = null;
    this.municipios = null;
    this.colonias = null;
    this.addDireccion = false;
    this.elementD = null;
    this.formDirecciones.reset();
    this.formDirecciones.controls['Activo'].setValue(true);
    this.formDirecciones.controls['Principal'].setValue(false);
    this.formDirecciones.controls['CodigoPostal'].setValue('');
  }

  cancelarTelefono() {
    this.formTelefonos.reset();
    this.addTelefono = false;
    this.elementT = null;
    this.formTelefonos.controls['Activo'].setValue(true);
    this.formTelefonos.controls['Principal'].setValue(false);
    this.formTelefonos.controls['LadaPais'].setValue(52)
  }

  cancelarCorreo() {
    this.formCorreos.reset();
    this.addCorreo = false;
    this.elementC = null;
    this.formCorreos.controls['Activo'].setValue(true);
  }
  cancelarContacto(){
    this.addContacto = false;
    // this.elementCn = null;
    this.formContactos.reset();
    this.formContactos.controls['LadaPais'].setValue(52)

  }

  //#endregion

  showForCP($event: any) {
    // this.cp = this.formDirecciones.get('CodigoPostal').value as String;
    this.cp = $event.target.value;
    if (this.cp.length >= 5) {
      this.BuscarCP(this.cp);

    }
  }

  BuscarCP(cp: any) {
    this.formDirecciones.controls['Colonias'].setValue('');
    this.estados = null;
    this.municipios = null;
    this._CatalogoService.getForCP(cp).subscribe(result => {
      if (result.length > 0) {
        this.formDirecciones.controls['Paises'].setValue(result[0]['paisId']);
        this.getEstados();
        setTimeout(() => {
          this.formDirecciones.controls['Estados'].setValue(result[0]['estadoId']);
          this.getMunicipio();
          setTimeout(() => {
            this.formDirecciones.controls['Municipios'].setValue(result[0]['municipioId']);
          }, 50);
        }, 50);
        setTimeout(() => {
          this.colonias = result;
        }, 50);
      }
      else {
        let msg = 'No se encontraron resultados con el C.P. No. ' + this.cp;
        this.popToast('error', 'Dirección', msg);
      }
    })
  }
  //#region FUNCIONES PARA DIRECCION
  AddDireccion() {
    this.auxTipoDireccion = this.tipoDireccion.filter(x => {
      if (x.id == this.formDirecciones.get('TipoDireccion').value) {
        return x.tipoDireccion
      }
    });
    let data = {
      idAux: this.idAuxD,
      tipoDireccionId: this.formDirecciones.get('TipoDireccion').value,
      tipoDireccion: this.auxTipoDireccion[0].tipoDireccion,
      paisId: this.formDirecciones.get('Paises').value,
      pais: this.auxPais,
      estadoId: this.formDirecciones.get('Estados').value,
      estado: this.auxEstado,
      municipioId: this.formDirecciones.get('Municipios').value,
      municipio: this.auxMunicipio,
      coloniaId: this.formDirecciones.get('Colonias').value,
      colonia: this.auxColonia,
      codigoPostal: this.formDirecciones.get('CodigoPostal').value,
      calle: this.formDirecciones.get('Calle').value,
      exterior: this.formDirecciones.get('Exterior').value,
      interior: this.formDirecciones.get('Interior').value || '',
      referencia: this.formDirecciones.get('Referencia').value || 'SIN REFERENCIA',
      esPrincipal: this.formDirecciones.get('Principal').value,
      activo: this.formDirecciones.get('Activo').value
    }
    if (data.esPrincipal) {
      this.Principal = data.esPrincipal;
    }
    this.cancelarDireccion();
    if (!this.EditDireccion) {
      this.DireccionesNew.push(data);
      this.idAuxD++;
    } else {
      this.DireccionesNew[this.indexDireccion] = data;
      this.EditDireccion = false;
    }
    this.onChangeTableD(this.config);
  }

  UpDireccion() {
    this.addDireccion = true;
    this.EditDireccion = true;
    if (this.Principal && this.DireccionesNew[this.indexDireccion]['esPrincipal']) {
      this.Principal = false;
    }
    let cp = this.DireccionesNew[this.indexDireccion]['codigoPostal'] as number;
    this.formDirecciones.controls['TipoDireccion'].setValue(this.DireccionesNew[this.indexDireccion]['tipoDireccionId']);
    this.BuscarCP(cp);
    this.formDirecciones.controls['Colonias'].setValue(this.DireccionesNew[this.indexDireccion]['coloniaId']);
    this.formDirecciones.controls['Calle'].setValue(this.DireccionesNew[this.indexDireccion]['calle']);
    this.formDirecciones.controls['Exterior'].setValue(this.DireccionesNew[this.indexDireccion]['exterior']);
    this.formDirecciones.controls['Interior'].setValue(this.DireccionesNew[this.indexDireccion]['interior']);
    this.formDirecciones.controls['Referencia'].setValue(this.DireccionesNew[this.indexDireccion]['referencia']);
    this.formDirecciones.controls['Principal'].setValue(this.DireccionesNew[this.indexDireccion]['esPrincipal']);
    this.formDirecciones.controls['Activo'].setValue(this.DireccionesNew[this.indexDireccion]['activo']);
  }

  DtDireccion() {
    this.DireccionesNew.splice(this.indexDireccion, 1);
    this.onChangeTableD(this.config);
  }
  //#endregion

  //#region FUNCIONES PARA TELEFONOS
  AddTelefono() {
    let idxDireccion = this.formTelefonos.get('TelDireccion').value;
    let tipoDireccionId = this.formTelefonos.get('TipoTelefono').value;
    this.auxTipoTelefono = this.tipoTelefonos.filter(x => {
      if (x.id == tipoDireccionId) {
        return x.tipo
      }
    });
    if (tipoDireccionId != 4) {
      this.formTelefonos.controls['Extencion'].setValue('');
    }
    let data = {
      idAux: this.idAuxT,
      indexDireccion: idxDireccion,
      calle: this.DireccionesNew[idxDireccion]['calle'],
      tTelefono: this.auxTipoTelefono[0].tipo,
      tipoTelefonoId: tipoDireccionId,
      clavePais: this.formTelefonos.get('LadaPais').value,
      claveLada: this.formTelefonos.get('Lada').value || '',
      extencion: this.formTelefonos.get('Extencion').value || '',
      telefono: this.formTelefonos.get('Numero').value,
      activo: this.formTelefonos.get('Activo').value,
      esPrincipal: this.formTelefonos.get('Principal').value,
      usuarioAlta: sessionStorage.getItem('clave'),
    }
    if (data.esPrincipal) {
      this.PrincipalT = data.esPrincipal;
    }
    this.cancelarTelefono();
    if (!this.EditTelefono) {
      this.TelefonosNew.push(data);
      this.idAuxT++;
    } else {
      this.TelefonosNew[this.indexTelefonos] = data;
      this.EditTelefono = false;
    }
    this.onChangeTableT(this.config);
  }

  UpTelefono() {
    this.addTelefono = true;
    this.EditTelefono = true;
    if (this.PrincipalT && this.TelefonosNew[this.indexTelefonos]['esPrincipal']) {
      this.PrincipalT = false;
    }
    this.formTelefonos.controls['TelDireccion'].setValue(this.TelefonosNew[this.indexTelefonos]['indexDireccion']);
    this.formTelefonos.controls['TipoTelefono'].setValue(this.TelefonosNew[this.indexTelefonos]['tipoTelefonoId']);
    this.formTelefonos.controls['LadaPais'].setValue(this.TelefonosNew[this.indexTelefonos]['clavePais']);
    this.formTelefonos.controls['Lada'].setValue(this.TelefonosNew[this.indexTelefonos]['claveLada']);
    this.formTelefonos.controls['Numero'].setValue(this.TelefonosNew[this.indexTelefonos]['telefono']);
    this.formTelefonos.controls['Extencion'].setValue(this.TelefonosNew[this.indexTelefonos]['extencion']);
    this.formTelefonos.controls['Principal'].setValue(this.TelefonosNew[this.indexTelefonos]['esPrincipal']);
    this.formTelefonos.controls['Activo'].setValue(this.TelefonosNew[this.indexTelefonos]['activo']);
  }

  DtTelefono() {
    this.TelefonosNew.splice(this.indexTelefonos, 1);
    this.elementT = null;
    this.onChangeTableT(this.config);
  }

  //#endregion

  //#region FUNCIONES PARA TELEFONOS
  AddEmail() {
    let idxDireccion = this.formCorreos.get('EmailDireccion').value;
    let data = {
      idAux: this.idAuxC,
      indexDireccion: idxDireccion,
      calle: this.DireccionesNew[idxDireccion]['calle'],
      email: this.formCorreos.get('Email').value,
      activo: this.formCorreos.get('Activo').value,
      esPrincipal: false,
      usuarioAlta: sessionStorage.getItem('clave'),
    }
    this.cancelarCorreo();
    if (!this.EditCorreo) {
      this.CorreosNew.push(data);
      this.idAuxC++;
    } else {
      this.CorreosNew[this.indexCorreos] = data;
      this.EditCorreo = false;
    }
    this.onChangeTableC(this.config);
  }

  UpEmail() {
    this.addCorreo = true;
    this.EditCorreo = true;
    this.formCorreos.controls['EmailDireccion'].setValue(this.CorreosNew[this.indexCorreos]['indexDireccion']);
    this.formCorreos.controls['Email'].setValue(this.CorreosNew[this.indexCorreos]['email']);
    this.formCorreos.controls['Activo'].setValue(this.CorreosNew[this.indexCorreos]['activo']);
  }

  DtEmail() {
    this.CorreosNew.splice(this.indexCorreos, 1);
    this.elementC = null;
    this.onChangeTableC(this.config);
  }


  //#region  FUNCION PARA CLASIFICACION 
  public hoveringOver(value: number): void {
    this.overStar = value;
    this.percent = 100 * (value / this.maxRat);
  };
  public resetStar(): void {
    this.overStar = void 0;
  }
  //#endregion


  public config: any = {
    paging: true,
    filtering: { filterString: '' },
    className: ['table table-sm table-hover mb-0']
  }
  //#region CONFIGURACION Y ACCIONES TABLA DE DIRECCIONES
  /* Configuracion / Acciones para la tabla de Direcciones  */
  public selectedD: boolean = false;
  public registrosD: number;
  public rowAuxD = [];
  public elementD: any = null;
  /* Variables de Paginador Direcciones */
  public pageD: number = 1;
  public numPagesD: number = 1;
  public lengthD: number = 0;

  public rowsD: Array<any> = [];
  public columnsD: Array<any> = [
    { title: 'Tipo Direccion', sorting: 'desc', className: 'text-success text-center', name: 'tipoDireccion', filtering: { filterString: '', placeholder: 'Tipo' } },
    { title: 'Pais', sorting: 'desc', className: 'text-success text-center', name: 'pais', filtering: { filterString: '', placeholder: 'Pias' } },
    { title: 'Estado', sorting: 'desc', className: 'text-success text-center', name: 'estado', filtering: { filterString: '', placeholder: 'Estado' } },
    { title: 'Municipio', className: 'text-info text-center', name: 'municipio', filtering: { filterString: '', placeholder: 'Municipio' } },
    { title: 'Colonia', className: 'text-info text-center', name: 'colonia', filtering: { filterString: '', placeholder: 'Colonia' } },
    { title: 'Calle', className: 'text-info text-center', name: 'calle', filtering: { filterString: '', placeholder: 'Calle' } },
    { title: 'Exterior', className: 'text-info text-center', name: 'exterior', filtering: { filterString: '', placeholder: 'Exterior' } },
    { title: 'Interior', className: 'text-info text-center', name: 'interior', filtering: { filterString: '', placeholder: 'Interior' } },
    { title: 'Referencia', className: 'text-info text-center', name: 'referencia', filtering: { filterString: '', placeholder: 'Referencia' } },
    { title: 'Principal', className: 'text-info text-center', name: 'esPrincipal', filtering: { filterString: '', placeholder: 'Principal' } },
    { title: 'Activo', className: 'text-info text-center', name: 'activo', filtering: { filterString: '', placeholder: 'Activo' } },
  ];

  public changePageD(page: any, data: Array<any> = this.DireccionesNew): Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSortD(data: any, config: any): any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName: string = void 0;
    let sort: string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous: any, current: any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilterD(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columnsD.forEach((column: any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item: any) => {
          if (item[column.name] != null)
            return item[column.name].toString().toLowerCase().match(column.filtering.filterString.toLowerCase());
        });
      }
    });
    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item: any) =>
        item[config.filtering.columnName].toLowerCase().match(this.config.filtering.filterString.toLowerCase()));
    }

    let tempArray: Array<any> = [];
    filteredData.forEach((item: any) => {
      let flag = false;
      this.columnsD.forEach((column: any) => {
        if (item[column.name] == null) {
          flag = true;
        } else {
          if (item[column.name].toString().toLowerCase().match(this.config.filtering.filterString.toLowerCase())) {
            flag = true;
          }
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;
    return filteredData;
  }

  public onChangeTableD(config: any, page: any = { page: this.pageD, itemsPerPage: this.itemsPerPage }): any {
    if (config.filtering) {
      (<any>Object).assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      (<any>Object).assign(this.config.sorting, config.sorting);
    }
    this.registrosD = this.DireccionesNew.length;
    this.rowsD = this.DireccionesNew;
    let filteredData = this.changeFilterD(this.DireccionesNew, this.config);
    let sortedData = this.changeSortD(filteredData, this.config);
    this.rowsD = page && config.paging ? this.changePageD(page, sortedData) : sortedData;
    this.lengthD = sortedData.length;
  }

  onCellClickD(data: any, id: any) {
    data.selectedD ? data.selectedD = false : data.selectedD = true;
    this.elementD = data;
    this.indexDireccion = this.DireccionesNew.findIndex(x => x.idAux === id);

    if (!data.selectedD) {
      this.elementD = null;
      this.selectedD = false;
    } else {
      this.selectedD = true;
    }
    if (this.rowAuxD.length == 0) {
      this.rowAuxD = data;
    }
    else if (data.selectedD && this.rowAuxD != []) {
      let aux = data;
      data = this.rowAuxD;
      data.selectedD = false;
      aux.selectedD = true;
      this.rowAuxD = aux;
    }
  }
  //#endregion

  //#region CONFIGURACION Y ACCIONES TABLA DE TELEFONOS
  public selectedT: boolean = false;
  public registrosT: number;
  public rowAuxT = [];
  public elementT: any = null;
  /* Variables de Paginador Telefonos */
  public pageT: number = 1;
  public numPagesT: number = 1;
  public lengthT: number = 0;

  public rowsT: Array<any> = [];
  public columnsT: Array<any> = [
    { title: 'Direccion', sorting: 'desc', className: 'text-success text-center', name: 'calle', filtering: { filterString: '', placeholder: 'Dirección' } },
    { title: 'Tipo', sorting: 'desc', className: 'text-success text-center', name: 'tTelefono', filtering: { filterString: '', placeholder: 'Tipo' } },
    { title: 'Número', sorting: 'desc', className: 'text-success text-center', name: 'telefono', filtering: { filterString: '', placeholder: 'Número' } },
    { title: 'Extención', className: 'text-info text-center', name: 'extencion', filtering: { filterString: '', placeholder: 'Extención' } },
    { title: 'Principal', className: 'text-info text-center', name: 'esPrincipal', filtering: { filterString: '', placeholder: 'Principal' } },
    { title: 'Activo', className: 'text-info text-center', name: 'activo', filtering: { filterString: '', placeholder: 'Activo' } },
  ];

  public changePageT(page: any, data: Array<any> = this.TelefonosNew): Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSortT(data: any, config: any): any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName: string = void 0;
    let sort: string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous: any, current: any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilterT(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columnsT.forEach((column: any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item: any) => {
          if (item[column.name] != null)
            return item[column.name].toString().toLowerCase().match(column.filtering.filterString.toLowerCase());
        });
      }
    });
    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item: any) =>
        item[config.filtering.columnName].toLowerCase().match(this.config.filtering.filterString.toLowerCase()));
    }

    let tempArray: Array<any> = [];
    filteredData.forEach((item: any) => {
      let flag = false;
      this.columnsT.forEach((column: any) => {
        if (item[column.name] == null) {
          flag = true;
        } else {
          if (item[column.name].toString().toLowerCase().match(this.config.filtering.filterString.toLowerCase())) {
            flag = true;
          }
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;
    return filteredData;
  }

  public onChangeTableT(config: any, page: any = { page: this.pageT, itemsPerPage: this.itemsPerPage }): any {
    if (config.filtering) {
      (<any>Object).assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      (<any>Object).assign(this.config.sorting, config.sorting);
    }
    this.registrosT = this.TelefonosNew.length;
    this.rowsT = this.TelefonosNew;
    let filteredData = this.changeFilterT(this.TelefonosNew, this.config);
    let sortedData = this.changeSortT(filteredData, this.config);
    this.rowsT = page && config.paging ? this.changePageT(page, sortedData) : sortedData;
    this.lengthT = sortedData.length;
  }

  onCellClickT(data: any, id: any) {
    data.selectedT ? data.selectedT = false : data.selectedT = true;
    this.elementT = data;
    this.indexTelefonos = this.TelefonosNew.findIndex(x => x.idAux === id);

    if (!data.selectedT) {
      this.elementT = null;
      this.selectedT = false;
    } else {
      this.selectedT = true;
    }
    if (this.rowAuxT.length == 0) {
      this.rowAuxT = data;
    }
    else if (data.selectedT && this.rowAuxT != []) {
      let aux = data;
      data = this.rowAuxT;
      data.selectedT = false;
      aux.selectedT = true;
      this.rowAuxT = aux;
    }
  }

  //#endregion

  //#region CONFIGURACION Y ACCIONES TABLA DE EMAIL / CORREO ELECTRONICO
  public selectedC: boolean = false;
  public registrosC: number;
  public rowAuxC = [];
  public elementC: any = null;
  /* Variables de Paginador Telefonos */
  public pageC: number = 1;
  public numPagesC: number = 1;
  public lengthC: number = 0;

  public rowsC: Array<any> = [];
  public columnsC: Array<any> = [
    { title: 'Direccion', sorting: 'desc', className: 'text-success text-center', name: 'calle', filtering: { filterString: '', placeholder: 'Dirección' } },
    { title: 'Email / Correo', sorting: 'desc', className: 'text-success text-center', name: 'email', filtering: { filterString: '', placeholder: 'Email / Correo' } },
    { title: 'Activo', className: 'text-info text-center', name: 'activo', filtering: { filterString: '', placeholder: 'Activo' } },
  ];

  public changePageC(page: any, data: Array<any> = this.CorreosNew): Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSortC(data: any, config: any): any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName: string = void 0;
    let sort: string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous: any, current: any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilterC(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columnsC.forEach((column: any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item: any) => {
          if (item[column.name] != null)
            return item[column.name].toString().toLowerCase().match(column.filtering.filterString.toLowerCase());
        });
      }
    });
    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item: any) =>
        item[config.filtering.columnName].toLowerCase().match(this.config.filtering.filterString.toLowerCase()));
    }

    let tempArray: Array<any> = [];
    filteredData.forEach((item: any) => {
      let flag = false;
      this.columnsC.forEach((column: any) => {
        if (item[column.name] == null) {
          flag = true;
        } else {
          if (item[column.name].toString().toLowerCase().match(this.config.filtering.filterString.toLowerCase())) {
            flag = true;
          }
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;
    return filteredData;
  }

  public onChangeTableC(config: any, page: any = { page: this.pageC, itemsPerPage: this.itemsPerPage }): any {
    if (config.filtering) {
      (<any>Object).assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      (<any>Object).assign(this.config.sorting, config.sorting);
    }
    this.registrosC = this.CorreosNew.length;
    this.rowsC = this.CorreosNew;
    let filteredData = this.changeFilterC(this.CorreosNew, this.config);
    let sortedData = this.changeSortC(filteredData, this.config);
    this.rowsC = page && config.paging ? this.changePageC(page, sortedData) : sortedData;
    this.lengthC = sortedData.length;
  }

  onCellClickC(data: any, id: any) {
    data.selectedC ? data.selectedC = false : data.selectedC = true;
    this.elementC = data;
    this.indexCorreos = this.CorreosNew.findIndex(x => x.idAux === id);

    if (!data.selectedC) {
      this.elementC = null;
      this.selectedC = false;
    } else {
      this.selectedC = true;
    }
    if (this.rowAuxC.length == 0) {
      this.rowAuxC = data;
    }
    else if (data.selectedC && this.rowAuxC != []) {
      let aux = data;
      data = this.rowAuxC;
      data.selectedC = false;
      aux.selectedC = true;
      this.rowAuxC = aux;
    }
  }

  //#endregion


  //#region  CREACION DE MENSAJES
  toaster: any;
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right',
    limit: 7, tapToDismiss: false,
    showCloseButton: true,
    mouseoverTimerStop: true,
  });
  popToast(type, title, body) {
    var toast: Toast = {
      type: type,
      title: title,
      timeout: 5000,
      body: body
    }
    this.toasterService.pop(toast);
  }
  //#endregion
}