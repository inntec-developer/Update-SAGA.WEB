import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';
import { emptyStringGetter, id } from '@swimlane/ngx-datatable/release/utils';

import { CatalogosService } from './../../../../../service/catalogos/catalogos.service';
import { ClientesService } from '../../../../../service/clientes/clientes.service';
import { CompanyValidation } from './company-validation';
import { Router } from '@angular/router';
import { SettingsService } from '../../../../../core/settings/settings.service';

@Component({
  selector: 'app-nuevo-prospecto',
  templateUrl: './nuevo-prospecto.component.html',
  styleUrls: ['./nuevo-prospecto.component.scss'],
  providers: [CatalogosService, ClientesService]
})
export class NuevoProspectoComponent implements OnInit {
  // Customs
  public CMNumEmleados: number = 10;
  //#region Variables
  public loading: boolean = false;
  //Edit for columns
  public editingCT = {};

  public itemsPerPage: number = 5;
  public maxSize: number = 5;
  public showFilterRowD: boolean;
  public showFilterRowT: boolean;
  public showFilterRowC: boolean;
  public showFilterRowCn: boolean;

  /* DECLARACION DE OBJETOS */
  public Telefonos: Array<any> = [];
  public Emails: Array<any> = [];

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
  private idAuxCn: number = 1;
  private idAuxCnT: number = 1;
  private idAuxCnC: number = 1;
  /***************************/

  public formGeneral: FormGroup;
  public formDirecciones: FormGroup;
  public formTelefonos: FormGroup;
  public formCorreos: FormGroup;
  public formContactos: FormGroup;
  public formContactoTelefonos: FormGroup;
  public formContactoCorreo: FormGroup;

  public addDireccion: boolean;
  public DireccionesNew: Array<any> = [];
  public indexDireccion: any;
  public EditDireccion: boolean;
  public textbtnDirecciones: string;

  public addTelefono: boolean;
  public TelefonosNew: Array<any> = [];
  public indexTelefonos: any;
  public EditTelefono: boolean;
  public textbtnTelefono: string;
  public esOficina: any;

  public addCorreo: boolean;
  public CorreosNew: Array<any> = [];
  public indexCorreos: any;
  public EditCorreo: boolean;
  public textbtnCorreo: string;

  public addContacto: boolean;
  public ContactosNew: Array<any> = [];
  public indexContacto: any;
  public EditContacto: boolean;
  public textbtnContacto: string;
  public esOficinaContacto: any;

  public addContactoTelefono: boolean;
  public indexContactoTelefonos: any;
  public EditContactoTelefono: boolean;
  public esOficinaCT: any;

  public addContactoCorreo: boolean;
  public indexContactoCorreos: any;
  public EditContactoCorreo: boolean;

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
  public Usuario: string;
  //#endregion


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _CatalogoService: CatalogosService,
    private _ClienteService: ClientesService,
    private toasterService: ToasterService,
    private settings: SettingsService
  ) {
    // #region FORMULARIO DE DATOS GENERALES
    this.formGeneral = new FormGroup({
      Empresa: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      ValidarEmpresa: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      Giros: new FormControl('', Validators.required),
      Actividades: new FormControl('', Validators.required),
      NoEmpleados: new FormControl('', [Validators.required]),
      Tamanio: new FormControl('', Validators.required),
      Tipo: new FormControl('', Validators.required),
      TipoBase: new FormControl('', Validators.required)
    });
    // #endregion
    // #region FORMULARIO DE DATOS DIRECCIONES
    this.formDirecciones = new FormGroup({
      TipoDireccion: new FormControl('', [Validators.required]),
      CodigoPostal: new FormControl('', [Validators.required, Validators.maxLength(5)]),
      Paises: new FormControl('', Validators.required),
      Estados: new FormControl('', Validators.required),
      Municipios: new FormControl('', Validators.required),
      Colonias: new FormControl('', Validators.required),
      Calle: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      Exterior: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      Interior: new FormControl('', Validators.maxLength(30)),
      Referencia: new FormControl('', Validators.maxLength(500)),
      Principal: new FormControl(false),
      Activo: new FormControl(true)
    });
    // #endregion
    // #region FORMULARIO DE DATOS TELEFONOS
    this.formTelefonos = new FormGroup({
      TelDireccion: new FormControl('', [Validators.required]),
      TipoTelefono: new FormControl('', [Validators.required]),
      LadaPais: new FormControl('52', [Validators.required, Validators.maxLength(3)]),
      Lada: new FormControl('', [Validators.required, Validators.maxLength(3)]),
      Numero: new FormControl('', [Validators.required, Validators.maxLength(8)]),
      Extension: new FormControl(''),
      Principal: new FormControl(false),
      Activo: new FormControl(true)
    });
    // #endregion
    // #region FORMULARIO DE DATOS CORREO
    this.formCorreos = new FormGroup({
      EmailDireccion: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required, Validators.email]),
    });
    // #endregion
    // #region FORMULARIO DE DATOS CONTACTO
    this.formContactos = new FormGroup({
      ContactoDireccion: new FormControl('', [Validators.required]),
      Nombre: new FormControl('', [Validators.required]),
      ApellidoPaterno: new FormControl('', [Validators.required]),
      ApellidoMaterno: new FormControl(''),
      Puesto: new FormControl('', [Validators.required]),
      InfoAdicional: new FormControl('', [Validators.maxLength(250)])
    });

    this.formContactoTelefonos = new FormGroup({
      TipoTelefono: new FormControl('', [Validators.required]),
      LadaPais: new FormControl('52', [Validators.required, Validators.maxLength(3)]),
      Lada: new FormControl('', [Validators.required, Validators.maxLength(3)]),
      Numero: new FormControl('', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]),
      Extension: new FormControl('')
    });

    this.formContactoCorreo = new FormGroup({
      Email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100)])
    });
    // #endregion
  }

  ngOnInit() {
    this.Usuario = this.settings.user['usuario'];
    this.showFilterRowD = true;
    this.showFilterRowT = true;
    this.showFilterRowC = true;
    this.showFilterRowCn = true;

    this.getCatalogos();

    // #region INICIALIZACION DE FORMULARIOS
    this.formGeneral = this.fb.group({
      Empresa: ['', [Validators.required, Validators.maxLength(100)]],
      ValidarEmpresa: ['', [Validators.required, Validators.maxLength(100)]],
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
      Calle: ['', [Validators.required, Validators.maxLength(100)]],
      Exterior: ['', [Validators.required, Validators.maxLength(10)]],
      Interior: ['', Validators.maxLength(30)],
      Referencia: ['', Validators.maxLength(500)],
      Principal: [false],
      Activo: [true]
    });

    this.formTelefonos = this.fb.group({
      TelDireccion: ['', [Validators.required]],
      TipoTelefono: ['', [Validators.required]],
      LadaPais: ['52', [Validators.required, Validators.maxLength(3)]],
      Lada: ['', [Validators.required, Validators.maxLength(3)]],
      Numero: ['', [Validators.required, Validators.maxLength(8)]],
      Extension: [''],
      Principal: [false],
      Activo: [true]
    });

    this.formCorreos = this.fb.group({
      EmailDireccion: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]]
    });

    this.formContactos = this.fb.group({
      Nombre: ['', [Validators.required]],
      ApellidoPaterno: ['', [Validators.required]],
      ApellidoMaterno: ['',],
      Puesto: ['', [Validators.required]],
      ContactoDireccion: ['', [Validators.required]],
      InfoAdicional: ['', [Validators.maxLength(250)]]
    });

    this.formContactoTelefonos = this.fb.group({
      TipoTelefono: ['', [Validators.required]],
      LadaPais: ['52', [Validators.required, Validators.maxLength(3)]],
      Lada: ['', [Validators.required, Validators.maxLength(3)]],
      Numero: ['', [Validators.required, Validators.maxLength(8)]],
      Extension: [''],
    })

    this.formContactoCorreo = this.fb.group({
      Email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]]
    });

    // #endregion
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
  getTipoTelefono() {
    this.esOficina = this.formTelefonos.get('TipoTelefono').value;
  }

  getTipoTelefonoContacto() {
    this.esOficinaContacto = this.formContactoTelefonos.get('TipoTelefono').value;
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

  changeEmpleados() {
    this.formGeneral.controls['Tamanio'].reset();
  }

  validarNoEmpleado() {
    var isValid = true;
    var noEmpleados = this.formGeneral.get('NoEmpleados').value;
    var noEmpleadosId = this.formGeneral.get('Tamanio').value;
    if (noEmpleados >= 1 && noEmpleados <= 9 && noEmpleadosId != 1) {
      isValid = false;
    } else if (noEmpleados >= 10 && noEmpleados <= 49 && noEmpleadosId != 2) {
      isValid = false;
    } else if (noEmpleados >= 50 && noEmpleados <= 249 && noEmpleadosId != 3) {
      isValid = false;
    } else if (noEmpleados >= 250 && noEmpleadosId != 4) {
      isValid = false;
    }
    if (!isValid) {
      let msg = 'El número de empleados no coincide con el tamaño de la empresa. ';
      this.popToast('error', 'Tamaño Empresa', msg);
      this.formGeneral.controls['NoEmpleados'].reset();
      this.formGeneral.controls['Tamanio'].reset();
    }
  }

  //#endregion

  //#region Cancelar Acciones

  cancelarDireccion() {
    this.estados = null;
    this.municipios = null;
    this.colonias = null;
    this.addDireccion = false;
    this.EditDireccion = false;
    this.formDirecciones.reset();
    this.formDirecciones.controls['Activo'].setValue(true);
    this.formDirecciones.controls['Principal'].setValue(false);
    this.formDirecciones.controls['CodigoPostal'].setValue('');
  }

  cancelarTelefono() {
    this.formTelefonos.reset();
    this.addTelefono = false;
    this.EditTelefono = false;
    this.formTelefonos.controls['Activo'].setValue(true);
    this.formTelefonos.controls['Principal'].setValue(false);
    this.formTelefonos.controls['LadaPais'].setValue(52)
  }

  cancelarCorreo() {
    this.formCorreos.reset();
    this.addCorreo = false;
    this.EditCorreo = false;
  }

  cancelarContacto() {
    this.addContacto = false;
    this.EditContacto = false;
    this.formContactos.reset();
    this.Emails = [];
    this.Telefonos = [];
  }

  cancelarContactoTelefono() {
    this.addContactoTelefono = false;
    this.formContactoTelefonos.reset();
    this.EditContactoTelefono = false;
    this.formContactoTelefonos.controls['LadaPais'].setValue(52)
  }

  cancelarContactoCorreo() {
    this.formContactoCorreo.reset();
    this.addContactoCorreo = false;
    this.EditContactoCorreo = false;
  }
  //#endregion

  // #region BUSCAR POR CODIGO POSTAL
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
  //#endregion

  //#region FUNCIONES PARA DIRECCION
  AddDireccion() {
    this.auxTipoDireccion = this.tipoDireccion.filter(x => {
      if (x.id == this.formDirecciones.get('TipoDireccion').value) {
        return x.tipoDireccion
      }
      this.auxPais = this.paises.filter(x => {
        if(x.id == this.formDirecciones.get('Paises').value){
          return x.pais;
        }
      });
      this.auxEstado = this.estados.filter(x => {
        if(x.id == this.formDirecciones.get('Estados').value){
          return x.estado;
        }
      });
      this.auxMunicipio = this.municipios.filter(x => {
        if(x.id == this.formDirecciones.get('Municipios').value){
          return x.municipio;
        }
      });
      this.auxColonia = this.colonias.filter(x => {
        if(x.id == this.formDirecciones.get('Colonias').value){
          return x.colonia;
        }
      });
    });
    let data = {
      idAux: this.idAuxD,
      tipoDireccionId: this.formDirecciones.get('TipoDireccion').value,
      tipoDireccion: this.auxTipoDireccion[0]['tipoDireccion'],
      paisId: this.formDirecciones.get('Paises').value,
      pais: this.auxPais[0]['pais'],
      estadoId: this.formDirecciones.get('Estados').value,
      estado: this.auxEstado[0]['estado'],
      municipioId: this.formDirecciones.get('Municipios').value,
      municipio: this.auxMunicipio[0]['municipio'],
      coloniaId: this.formDirecciones.get('Colonias').value,
      colonia: this.auxColonia[0]['colonia'],
      codigoPostal: this.formDirecciones.get('CodigoPostal').value,
      calle: this.formDirecciones.get('Calle').value,
      numeroExterior: this.formDirecciones.get('Exterior').value,
      numeroInterior: this.formDirecciones.get('Interior').value || '',
      referencia: this.formDirecciones.get('Referencia').value || 'SIN REFERENCIA',
      esPrincipal: this.formDirecciones.get('Principal').value,
      activo: this.formDirecciones.get('Activo').value,
      usuarioAlta: this.Usuario,
      telefonos: [],
      emails: [],
      contactos: []
    }
    if (data.esPrincipal) {
      this.Principal = data.esPrincipal;
    }

    if (!this.EditDireccion) {
      var exist = this.DireccionesNew.find(element => {
        if (element.calle == data.calle
          && element.numeroExterior == data.numeroExterior
          && element.numeroInterior == data.numeroInterior
          && element.codigoPostal == data.codigoPostal) {
          return true;
        }
        else {
          return false;
        }
      });
      if (!exist) {
        this.DireccionesNew.push(data);
        this.idAuxD++;
      }
      else {
        this.popToast('info', 'Direcciones', 'La dirección que intenta registrar ya existe.');
        return;
      }

    } else {
      var idDireccion = this.DireccionesNew[this.indexDireccion]['idAux'];
      data.idAux = idDireccion;
      var exist = this.DireccionesNew.find(element => {
        if (element.calle == data.calle
          && element.numeroExterior == data.numeroExterior
          && element.numeroInterior == data.numeroInterior
          && element.codigoPostal == data.codigoPostal
          && element.idAux != idDireccion) {
          return true;
        }
        else {
          return false;
        }
      });
      if (!exist) {
        this.DireccionesNew[this.indexDireccion] = data;
        if (this.CorreosNew.length > 0) {
          var EmailIndexUpdate = this.CorreosNew.findIndex(x => x.idDireccion == idDireccion)
          this.CorreosNew[EmailIndexUpdate]['calle'] = data.calle;
          this.onChangeTableC(this.config);
        }
        if (this.TelefonosNew.length > 0) {
          var TelefonoIndexUpdate = this.TelefonosNew.findIndex(x => x.idDireccion == idDireccion)
          this.TelefonosNew[TelefonoIndexUpdate]['calle'] = data.calle;
          this.onChangeTableC(this.config);
        }
        if (this.ContactosNew.length > 0) {
          var ContactoIndexUpdate = this.ContactosNew.findIndex(x => x.idDireccion == idDireccion)
          this.ContactosNew[ContactoIndexUpdate]['calle'] = data.calle;
        }
        this.EditDireccion = false;
        this.elementD = null;
      }
      else {
        this.popToast('info', 'Direcciones', 'La dirección que intenta actualizar ya existe.');
        return;
      }
    }
    this.cancelarDireccion();
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
    this.formDirecciones.controls['Exterior'].setValue(this.DireccionesNew[this.indexDireccion]['numeroExterior']);
    this.formDirecciones.controls['Interior'].setValue(this.DireccionesNew[this.indexDireccion]['numeroInterior']);
    this.formDirecciones.controls['Referencia'].setValue(this.DireccionesNew[this.indexDireccion]['referencia']);
    this.formDirecciones.controls['Principal'].setValue(this.DireccionesNew[this.indexDireccion]['esPrincipal']);
    this.formDirecciones.controls['Activo'].setValue(this.DireccionesNew[this.indexDireccion]['activo']);
  }

  DtDireccion() {
    var idDireccion = this.DireccionesNew[this.indexDireccion]['idAux'];

    if (this.DireccionesNew[this.indexDireccion]['esPrincipal'] == true) {
      this.Principal = false;
    }
    this.DireccionesNew.splice(this.indexDireccion, 1);
    if (this.CorreosNew.length > 0) {
      var EmailIndexDelete = this.CorreosNew.findIndex(x => x.idDireccion == idDireccion)
      this.CorreosNew[EmailIndexDelete]['calle'] = 'Sin Registro';
      this.CorreosNew[EmailIndexDelete]['idDireccion'] = 0;
      this.onChangeTableC(this.config);
    }
    if (this.TelefonosNew.length > 0) {
      var TelefonoIndexDelete = this.TelefonosNew.findIndex(x => x.idDireccion == idDireccion)
      if (this.TelefonosNew[TelefonoIndexDelete]['esPrincipal'] == true) {
        this.PrincipalT = false;
      }
      this.TelefonosNew[TelefonoIndexDelete]['calle'] = 'Sin Registro';
      this.TelefonosNew[TelefonoIndexDelete]['idDireccion'] = 0;
      this.onChangeTableC(this.config);
    }
    if (this.ContactosNew.length > 0) {
      var ContactoIndexDelete = this.ContactosNew.findIndex(x => x.idDireccion == idDireccion)
      this.ContactosNew[ContactoIndexDelete]['calle'] = 'Sin Registro';
      this.ContactosNew[ContactoIndexDelete]['idDireccion'] = 0;
      this.onChangeTableC(this.config);
    }
    this.onChangeTableD(this.config);
  }
  //#endregion

  //#region FUNCIONES PARA TELEFONOS
  AddTelefono() {
    let idDireccion = this.formTelefonos.get('TelDireccion').value;
    let idxDireccion = this.DireccionesNew.findIndex(x => x.idAux == idDireccion)
    let tipoTelefonoId = this.formTelefonos.get('TipoTelefono').value;
    this.auxTipoTelefono = this.tipoTelefonos.filter(x => {
      if (x.id == tipoTelefonoId) {
        return x.tipo
      }
    });
    if (tipoTelefonoId != 4) {
      this.formTelefonos.controls['Extension'].setValue('');
    }
    let data = {
      idAux: this.idAuxT,
      idDireccion: idDireccion,
      calle: this.DireccionesNew[idxDireccion]['calle'],
      tTelefono: this.auxTipoTelefono[0].tipo,
      tipoTelefonoId: tipoTelefonoId,
      clavePais: this.formTelefonos.get('LadaPais').value,
      claveLada: this.formTelefonos.get('Lada').value || '',
      extension: this.formTelefonos.get('Extension').value || '',
      telefono: this.formTelefonos.get('Numero').value,
      activo: this.formTelefonos.get('Activo').value,
      esPrincipal: this.formTelefonos.get('Principal').value,
      usuarioAlta: this.Usuario,
    }
    if (data.esPrincipal) {
      this.PrincipalT = data.esPrincipal;
    }

    if (!this.EditTelefono) {
      var exist = this.TelefonosNew.find(element => {
        if (element.telefono == data.telefono
          && element.extension == data.extension) {
          return true;
        } else {
          return false;
        }
      });
      if (!exist) {
        this.TelefonosNew.push(data);
        this.idAuxT++;

      }
      else {
        this.popToast('info', 'Teléfonos', 'El Teléfono que intenta registrar ya existe.');
        return;
      }

    } else {
      var idTelefono = this.TelefonosNew[this.indexTelefonos]['idAux'];
      data.idAux = idTelefono;
      var exist = this.TelefonosNew.find(element => {
        if (element.telefono == data.telefono
          && element.extension == data.extension
          && element.idAux != idTelefono) {
          return true;
        } else {
          return false;
        }
      });
      if (!exist) {
        this.TelefonosNew[this.indexTelefonos] = data;
        this.EditTelefono = false;
        this.elementT = null;
      }
      else {
        this.popToast('info', 'Teléfonos', 'El Teléfono que intenta actualizar ya existe.');
        return;
      }
    }

    this.cancelarTelefono();
    this.onChangeTableT(this.config);
  }

  UpTelefono() {
    this.addTelefono = true;
    this.EditTelefono = true;
    if (this.PrincipalT && this.TelefonosNew[this.indexTelefonos]['esPrincipal']) {
      this.PrincipalT = false;
    }
    this.formTelefonos.controls['TelDireccion'].setValue(this.TelefonosNew[this.indexTelefonos]['idDireccion']);
    this.formTelefonos.controls['TipoTelefono'].setValue(this.TelefonosNew[this.indexTelefonos]['tipoTelefonoId']);
    this.formTelefonos.controls['LadaPais'].setValue(this.TelefonosNew[this.indexTelefonos]['clavePais']);
    this.formTelefonos.controls['Lada'].setValue(this.TelefonosNew[this.indexTelefonos]['claveLada']);
    this.formTelefonos.controls['Numero'].setValue(this.TelefonosNew[this.indexTelefonos]['telefono']);
    this.formTelefonos.controls['Extension'].setValue(this.TelefonosNew[this.indexTelefonos]['extension']);
    this.formTelefonos.controls['Principal'].setValue(this.TelefonosNew[this.indexTelefonos]['esPrincipal']);
    this.formTelefonos.controls['Activo'].setValue(this.TelefonosNew[this.indexTelefonos]['activo']);
  }

  DtTelefono() {
    if (this.TelefonosNew[this.indexTelefonos]['esPrincipal'] == true) {
      this.PrincipalT = false;
    }
    this.TelefonosNew.splice(this.indexTelefonos, 1);
    this.elementT = null;
    this.onChangeTableT(this.config);
  }

  //#endregion

  //#region FUNCIONES PARA EMAILS
  AddEmail() {
    let idDireccion = this.formCorreos.get('EmailDireccion').value;
    let idxDireccion = this.DireccionesNew.findIndex(x => x.idAux == idDireccion)
    let data = {
      idAux: this.idAuxC,
      idDireccion: idDireccion,
      calle: this.DireccionesNew[idxDireccion]['calle'],
      email: this.formCorreos.get('Email').value,
      esPrincipal: false,
      usuarioAlta: this.Usuario,
    }

    if (!this.EditCorreo) {
      var exist = this.CorreosNew.find(element => {
        if (element.email == data.email) {
          return true;
        }
        else {
          return false;
        }
      });
      if (!exist) {
        this.CorreosNew.push(data);
        this.idAuxC++;
      }
      else {
        this.popToast('info', 'Correo Electrónico', 'El correo electrónico que intenta registrar ya existe.');
        return;
      }

    } else {
      var idEmail = this.CorreosNew[this.indexCorreos]['idAux'];
      data.idAux = idEmail;
      var exist = this.CorreosNew.find(element => {
        if (element.email == data.email
          && element.idAux != idEmail) {
          return true;
        }
        else {
          return false;
        }
      });
      if (!exist) {
        this.CorreosNew[this.indexCorreos] = data;
        this.EditCorreo = false;
        this.elementC = null;
      }
      else {
        this.popToast('info', 'Correo Electrónico', 'El correo electrónico que intenta actualizar ya existe.');
        return;
      }
    }

    this.cancelarCorreo();
    this.onChangeTableC(this.config);
  }

  UpEmail() {
    this.addCorreo = true;
    this.EditCorreo = true;
    this.formCorreos.controls['EmailDireccion'].setValue(this.CorreosNew[this.indexCorreos]['idDireccion']);
    this.formCorreos.controls['Email'].setValue(this.CorreosNew[this.indexCorreos]['email']);
  }

  DtEmail() {
    this.CorreosNew.splice(this.indexCorreos, 1);
    this.elementC = null;
    this.onChangeTableC(this.config);
  }

  //#endregion

  //#region FUNCIONES PARA CONTACTOS
  AddContacto() {
    let idDireccion = this.formContactos.get('ContactoDireccion').value;
    let idxDireccion = this.DireccionesNew.findIndex(x => x.idAux == idDireccion)

    let data = {
      idAux: this.idAuxCn,
      idDireccion: idDireccion,
      calle: this.DireccionesNew[idxDireccion]['calle'],
      nombre: this.formContactos.get('Nombre').value,
      apellidoPaterno: this.formContactos.get('ApellidoPaterno').value,
      apellidoMaterno: this.formContactos.get('ApellidoMaterno').value || '',
      nombreAux: this.formContactos.get('Nombre').value + ' ' + this.formContactos.get('ApellidoPaterno').value,
      tipoEntidadId: 3,
      puesto: this.formContactos.get('Puesto').value,
      infoAdicional: this.formContactos.get('InfoAdicional').value,
      usuarioAlta: this.Usuario,
      telefonos: this.Telefonos,
      emails: this.Emails
    }
    if (!this.EditContacto) {
      this.ContactosNew.push(data);
      this.idAuxCn++;
    } else {
      this.ContactosNew[this.indexContacto] = data;
      this.EditContacto = false;
      this.elementCn = null;
    }
    this.cancelarContacto();
    this.onChangeTableCn(this.config);
  }

  UpContactos() {
    this.addContacto = true;
    this.EditContacto = true;
    this.formContactos.controls['ContactoDireccion'].setValue(this.ContactosNew[this.indexContacto]['idDireccion']);
    this.formContactos.controls['Nombre'].setValue(this.ContactosNew[this.indexContacto]['nombre']);
    this.formContactos.controls['ApellidoPaterno'].setValue(this.ContactosNew[this.indexContacto]['apellidoPaterno']);
    this.formContactos.controls['ApellidoMaterno'].setValue(this.ContactosNew[this.indexContacto]['apellidoMaterno']);
    this.formContactos.controls['Puesto'].setValue(this.ContactosNew[this.indexContacto]['puesto']);
    this.formContactos.controls['InfoAdicional'].setValue(this.ContactosNew[this.indexContacto]['infoAdicional']);
    this.Telefonos = this.ContactosNew[this.indexContacto]['telefonos'];
    this.Emails = this.ContactosNew[this.indexContacto]['emails'];
    this.rowsCnT = this.changePageCnT({ page: this.pageCnT, itemsPerPage: this.itemsPerPage });
    this.rowsCnC = this.changePageCnC({ page: this.pageCnT, itemsPerPage: this.itemsPerPage });
  }

  DtContacto() {
    this.ContactosNew.splice(this.indexContacto, 1);
    this.elementCn = null;
    this.onChangeTableCn(this.config);
  }

  AddContactoTelefono() {
    let tipoTelefonoId = this.formContactoTelefonos.get('TipoTelefono').value;

    if (tipoTelefonoId != 4) {
      this.formContactoTelefonos.controls['Extension'].setValue('');
    }
    this.auxTipoTelefono = this.tipoTelefonos.filter(x => {
      if (x.id == tipoTelefonoId) {
        return x.tipo;
      }
    });

    let telefono = {
      idAux: this.idAuxCnT,
      tipoTelefonos: this.auxTipoTelefono[0].tipo,
      tipoTelefonoId: this.formContactoTelefonos.get('TipoTelefono').value,
      clavePais: this.formContactoTelefonos.get('LadaPais').value,
      claveLada: this.formContactoTelefonos.get('Lada').value || '',
      telefono: this.formContactoTelefonos.get('Numero').value,
      extension: this.formContactoTelefonos.get('Extension').value || '',
      activo: true,
      esPrincipal: true,
      UsuarioAlta: this.Usuario,
    }

    if (!this.EditContactoTelefono) {
      var exist = this.Telefonos.find(element => {
        if (element.telefono == telefono.telefono
          && element.extension == telefono.extension) {
          return true;
        } else {
          return false;
        }
      });
      if (!exist) {
        this.Telefonos.push(telefono);
        this.idAuxCnT++;
        this.lengthCnT = this.Telefonos.length;
      }
      else {
        this.popToast('info', 'Contacto Teléfonos', 'El Teléfono que intenta registrar ya existe.');
        return;
      }

    } else {
      var idTelefono = this.Telefonos[this.indexContactoTelefonos]['idAux'];
      telefono.idAux = idTelefono;
      var exist = this.Telefonos.find(element => {
        if (element.telefono == telefono.telefono
          && element.extension == telefono.extension
          && element.idAux != idTelefono) {
          return true;
        } else {
          return false;
        }
      });
      if (!exist) {
        this.Telefonos[this.indexContactoTelefonos] = telefono;
        this.EditContactoTelefono = false;
        this.elementCnT = null;
      }
      else {
        this.popToast('info', 'Contacto Teléfonos', 'El Teléfono que intenta actualizar ya existe.');
        return;
      }
    }
    this.cancelarContactoTelefono();
    this.rowsCnT = this.changePageCnT({ page: this.pageCnT, itemsPerPage: this.itemsPerPage });
  }

  UdContactoTelefono() {
    this.addContactoTelefono = true;
    this.EditContactoTelefono = true;
    this.formContactoTelefonos.controls['TipoTelefono'].setValue(this.Telefonos[this.indexContactoTelefonos]['tipoTelefonoId']);
    this.formContactoTelefonos.controls['LadaPais'].setValue(this.Telefonos[this.indexContactoTelefonos]['clavePais']);
    this.formContactoTelefonos.controls['Lada'].setValue(this.Telefonos[this.indexContactoTelefonos]['claveLada']);
    this.formContactoTelefonos.controls['Numero'].setValue(this.Telefonos[this.indexContactoTelefonos]['telefono']);
    this.formContactoTelefonos.controls['Extension'].setValue(this.Telefonos[this.indexContactoTelefonos]['extension']);
  }

  DtContactoTelefono() {
    this.Telefonos.splice(this.indexContactoTelefonos, 1);
    this.elementCnT = null;
    this.lengthCnT = this.Telefonos.length;
    this.rowsCnT = this.changePageCnT({ page: this.pageCnT, itemsPerPage: this.itemsPerPage });
  }

  AddContactoCorreo() {
    let data = {
      idAux: this.idAuxCnC,
      email: this.formContactoCorreo.get('Email').value,
      esPrincipal: false,
      usuarioAlta: this.Usuario
    }

    if (!this.EditContactoCorreo) {
      var exist = this.Emails.find(element => {
        if (element.email == data.email) {
          return true;
        }
        else {
          return false;
        }
      });
      if (!exist) {
        this.Emails.push(data);
        this.idAuxCnC++;
        this.lengthCnC = this.Emails.length;
      }
      else {
        this.popToast('info', 'Correo Electrónico', 'El correo electrónico que intenta registrar ya existe.');
        return;
      }

    } else {
      var idEmail = this.Emails[this.indexContactoCorreos]['idAux'];
      data.idAux = idEmail;
      var exist = this.Emails.find(element => {
        if (element.email == data.email
          && element.idAux != idEmail) {
          return true;
        }
        else {
          return false;
        }
      });
      if (!exist) {
        this.Emails[this.indexContactoCorreos] = data;
        this.EditContactoCorreo = false;
        this.elementCnC = null;
      }
      else {
        this.popToast('info', 'Correo Electrónico', 'El correo electrónico que intenta actualizar ya existe.');
        return;
      }
    }

    this.cancelarContactoCorreo();
    this.rowsCnC = this.changePageCnC({ page: this.pageCnC, itemsPerPage: this.itemsPerPage });
  }

  UdContactoCorreo() {
    this.addContactoCorreo = true;
    this.EditContactoCorreo = true;
    this.formContactoCorreo.controls['Email'].setValue(this.Emails[this.indexContactoCorreos]['email']);

  }

  DtContactoCorreo() {
    this.Emails.splice(this.indexContactoCorreos, 1);
    this.elementCnC = null;
    this.lengthCnC = this.Telefonos.length;
    this.rowsCnC = this.changePageCnC({ page: this.pageCnT, itemsPerPage: this.itemsPerPage });
  }


  //#endregion

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
  public registrosD: number = 0;
  public rowAuxD = [];
  public elementD: any = null;
  /* Variables de Paginador Direcciones */
  public pageD: number = 1;
  public numPagesD: number = 1;
  public lengthD: number = 0;

  public rowsD: Array<any> = [];
  public columnsD: Array<any> = [
    { title: 'Tipo Dirección', sorting: 'desc', className: 'text-success text-center', name: 'tipoDireccion', filtering: { filterString: '', placeholder: 'Tipo' } },
    { title: 'Código Postal', sorting: 'desc', className: 'text-success text-center', name: 'codigoPostal', filtering: { filterString: '', placeholder: 'C.P.' } },
    { title: 'País', sorting: 'desc', className: 'text-success text-center', name: 'pais', filtering: { filterString: '', placeholder: 'Pias' } },
    { title: 'Estado', sorting: 'desc', className: 'text-success text-center', name: 'estado', filtering: { filterString: '', placeholder: 'Estado' } },
    { title: 'Municipio', className: 'text-info text-center', name: 'municipio', filtering: { filterString: '', placeholder: 'Municipio' } },
    { title: 'Colonia', className: 'text-info text-center', name: 'colonia', filtering: { filterString: '', placeholder: 'Colonia' } },
    { title: 'Calle', className: 'text-info text-center', name: 'calle', filtering: { filterString: '', placeholder: 'Calle' } },
    { title: 'Exterior', className: 'text-info text-center', name: 'numeroExterior', filtering: { filterString: '', placeholder: 'Exterior' } },
    { title: 'Interior', className: 'text-info text-center', name: 'numeroInterior', filtering: { filterString: '', placeholder: 'Interior' } },
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
    if (!this.EditDireccion) {
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
  }
  //#endregion

  //#region CONFIGURACION Y ACCIONES TABLA DE TELEFONOS
  public selectedT: boolean = false;
  public registrosT: number = 0;
  public rowAuxT = [];
  public elementT: any = null;
  /* Variables de Paginador Telefonos */
  public pageT: number = 1;
  public numPagesT: number = 1;
  public lengthT: number = 0;

  public rowsT: Array<any> = [];
  public columnsT: Array<any> = [
    { title: 'Dirección', sorting: 'desc', className: 'text-success text-center', name: 'calle', filtering: { filterString: '', placeholder: 'Dirección' } },
    { title: 'Tipo', sorting: 'desc', className: 'text-success text-center', name: 'tTelefono', filtering: { filterString: '', placeholder: 'Tipo' } },
    { title: 'Número', sorting: 'desc', className: 'text-success text-center', name: 'telefono', filtering: { filterString: '', placeholder: 'Número' } },
    { title: 'Extensión', className: 'text-info text-center', name: 'extension', filtering: { filterString: '', placeholder: 'Extensión' } },
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
    if (!this.EditTelefono) {
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
  }

  //#endregion

  //#region CONFIGURACION Y ACCIONES TABLA DE EMAIL / CORREO ELECTRONICO
  public selectedC: boolean = false;
  public registrosC: number = 0;
  public rowAuxC = [];
  public elementC: any = null;
  /* Variables de Paginador Telefonos */
  public pageC: number = 1;
  public numPagesC: number = 1;
  public lengthC: number = 0;

  public rowsC: Array<any> = [];
  public columnsC: Array<any> = [
    { title: 'Dirección', sorting: 'desc', className: 'text-success text-center', name: 'calle', filtering: { filterString: '', placeholder: 'Dirección' } },
    { title: 'Email / Correo', sorting: 'desc', className: 'text-success text-center', name: 'email', filtering: { filterString: '', placeholder: 'Email / Correo' } },
    // { title: 'Activo', className: 'text-info text-center', name: 'activo', filtering: { filterString: '', placeholder: 'Activo' } },
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
    if (!this.EditCorreo) {
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
  }

  //#endregion

  //#region CONFIGURACION Y ACCIONES TABLA CONTACTOS
  public selectedCn: boolean = false;
  public registrosCn: number = 0;
  public rowAuxCn = [];
  public elementCn: any = null;
  /* Variables de Paginador Telefonos */
  public pageCn: number = 1;
  public numPagesCn: number = 1;
  public lengthCn: number = 0;

  public rowsCn: Array<any> = [];
  public columnsCn: Array<any> = [
    { title: 'Dirección', sorting: 'desc', className: 'text-success', name: 'calle', filtering: { filterString: '', placeholder: 'Dirección' } },
    { title: 'Nombre', sorting: 'desc', className: 'text-success', name: 'nombreAux', filtering: { filterString: '', placeholder: 'Nombre' } },
    { title: 'Puesto', className: 'text-info', name: 'puesto', filtering: { filterString: '', placeholder: 'Puesto' } },
    { title: 'Teléfonos', className: 'text-info', name: 'telefonos', filtering: { filterString: '', placeholder: 'Teléfono' } },
    { title: 'Email / Correo', className: 'text-info', name: 'emails', filtering: { filterString: '', placeholder: 'Email / Correo' } },
    { title: 'Info. Adicional', className: 'text-info', name: 'infoAdicional', filtering: { filterString: '', placeholder: 'Info. Adicional' } },

  ];

  public changePageCn(page: any, data: Array<any> = this.ContactosNew): Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSortCn(data: any, config: any): any {
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

  public changeFilterCn(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columnsCn.forEach((column: any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item: any) => {
          if (item[column.name] != null) {
            if (!Array.isArray(item[column.name])) {
              return item[column.name].toString().toLowerCase().match(column.filtering.filterString.toLowerCase());
            }
            else {
              let aux = item[column.name];
              let mocos = false;
              if (item[column.name].length > 0) {
                item[column.name].forEach(element => {
                  let Objeto = element
                  for (let variable in element) {
                    if (variable != "idAux") {
                      if (Objeto[variable].toString().toLowerCase().match(column.filtering.filterString.toLowerCase())) {
                        mocos = true;
                        return;
                      }
                    }
                  };
                });
                if (mocos) {
                  return item[column.name];
                }
              }
              else {
                return item[column.name];
              }
            }
          }
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
      this.columnsCn.forEach((column: any) => {
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

  public onChangeTableCn(config: any, page: any = { page: this.pageCn, itemsPerPage: this.itemsPerPage }): any {
    if (config.filtering) {
      (<any>Object).assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      (<any>Object).assign(this.config.sorting, config.sorting);
    }
    this.registrosCn = this.ContactosNew.length;
    this.rowsCn = this.ContactosNew;
    let filteredData = this.changeFilterCn(this.ContactosNew, this.config);
    let sortedData = this.changeSortCn(filteredData, this.config);
    this.rowsCn = page && config.paging ? this.changePageCn(page, sortedData) : sortedData;
    this.lengthCn = sortedData.length;
  }

  onCellClickCn(data: any, id: any) {
    if (!this.EditContacto) {
      data.selectedCn ? data.selectedCn = false : data.selectedCn = true;
      this.elementCn = data;
      this.indexContacto = this.ContactosNew.findIndex(x => x.idAux === id);

      if (!data.selectedCn) {
        this.elementCn = null;
        this.selectedCn = false;
      } else {
        this.selectedCn = true;
      }
      if (this.rowAuxCn.length == 0) {
        this.rowAuxCn = data;
      }
      else if (data.selectedCn && this.rowAuxCn != []) {
        let aux = data;
        data = this.rowAuxCn;
        data.selectedCn = false;
        aux.selectedCn = true;
        this.rowAuxCn = aux;
      }
    }
  }

  //#endregion

  //#region CONFIGURACION Y ACCIONES TABLA CONTACTOS TELEFONOS
  public selectedCnT: boolean = false;
  public registrosCnT: number = 0;
  public rowAuxCnT = [];
  public elementCnT: any = null;
  /* Variables de Paginador Telefonos */
  public pageCnT: number = 1;
  public numPagesCnT: number = 1;
  public lengthCnT: number = 0;

  public rowsCnT: Array<any> = [];
  public columnsCnT: Array<any> = [
    { title: 'Tipo Teléfono', className: 'text-info', name: 'tipoTelefonos' },
    { title: 'Número', className: 'text-info', name: 'telefono' }
  ];

  public changePageCnT(page: any, data: Array<any> = this.Telefonos): Array<any> {
    var pageActual = parseInt(page['page']);
    let start = (pageActual - 1) * this.itemsPerPage;
    let end = this.itemsPerPage > -1 ? (start + this.itemsPerPage) : data.length;
    let rows = data.slice(start, end)
    return rows;
  }
  public nextPageCnT(page: any) {
    this.rowsCnT = this.changePageCnT({ page: page.page['page'], itemsPerPage: page.itemsPerPage });
  }

  onCellClickCnT(data: any, id: any) {
    if (!this.EditContactoTelefono) {
      data.selectedCnT ? data.selectedCnT = false : data.selectedCnT = true;
      this.elementCnT = data;
      this.indexContactoTelefonos = this.Telefonos.findIndex(x => x.idAux === id);

      if (!data.selectedCnT) {
        this.elementCnT = null;
        this.selectedCnT = false;
      } else {
        this.selectedCnT = true;
      }
      if (this.rowAuxCnT.length == 0) {
        this.rowAuxCnT = data;
      }
      else if (data.selectedCnT && this.rowAuxCnT != []) {
        let aux = data;
        data = this.rowAuxCnT;
        data.selectedCnT = false;
        aux.selectedCnT = true;
        this.rowAuxCnT = aux;
      }
    }
  }
  //#endregion

  //#region CONFIGURACION Y ACCIONES TABLA CONTACTOS  EMAILS / CORREO ELECTRONICO
  public selectedCnC: boolean = false;
  public registrosCnC: number = 0;
  public rowAuxCnC = [];
  public elementCnC: any = null;
  /* Variables de Paginador Telefonos */
  public pageCnC: number = 1;
  public numPagesCnC: number = 1;
  public lengthCnC: number = 0;

  public rowsCnC: Array<any> = [];
  public columnsCnC: Array<any> = [
    { title: 'Email / Correo', className: 'text-info', name: 'email' }
  ];

  public changePageCnC(page: any, data: Array<any> = this.Emails): Array<any> {
    var pageActual = parseInt(page['page']);
    let start = (pageActual - 1) * this.itemsPerPage;
    let end = this.itemsPerPage > -1 ? (start + this.itemsPerPage) : data.length;
    let rows = data.slice(start, end)
    return rows;
  }
  public nextPageCnC(page: any) {
    this.rowsCnC = this.changePageCnC({ page: page.page['page'], itemsPerPage: page.itemsPerPage });
  }

  onCellClickCnC(data: any, id: any) {
    if (!this.EditContactoCorreo) {
      data.selectedCnC ? data.selectedCnC = false : data.selectedCnC = true;
      this.elementCnC = data;
      this.indexContactoCorreos = this.Emails.findIndex(x => x.idAux === id);

      if (!data.selectedCnC) {
        this.elementCnC = null;
        this.selectedCnC = false;
      } else {
        this.selectedCnC = true;
      }
      if (this.rowAuxCnC.length == 0) {
        this.rowAuxCnC = data;
      }
      else if (data.selectedCnC && this.rowAuxCnC != []) {
        let aux = data;
        data = this.rowAuxCnC;
        data.selectedCnC = false;
        aux.selectedCnC = true;
        this.rowAuxCnC = aux;
      }
    }
  }
  //#endregion

  private GuardarProspecto() {
    this.loading = true;
    var notData = false;
    var msg = 'En la sección ';
    var section = '';
    var DireccionEmail = [];
    var DireccionTelefono = [];
    var DireccionContacto = [];
    this.DireccionesNew.forEach(element => {
      var idAux = element.idAux;
      this.TelefonosNew.forEach(function (telefono: any) {
        if (idAux == telefono.idDireccion) {
          let data = {
            calle: element.calle,
            numeroInterior: element.numeroInterior,
            numeroExterior: element.numeroExterior,
            codigoPostal: element.codigoPostal,
            telefono: telefono.telefono,
            extension: telefono.extension
          }
          DireccionTelefono.push(data);
        } else if (telefono.idDireccion == 0) {
          notData = true;
          msg = msg + 'teléfono, ';
        }
      });
      this.CorreosNew.forEach(function (correo: any) {
        if (idAux == correo.idDireccion) {
          let data = {
            calle: element.calle,
            numeroInterior: element.numeroInterior,
            numeroExterior: element.numeroExterior,
            codigoPostal: element.codigoPostal,
            email: correo.email,
          }
          DireccionEmail.push(data);
        } else if (correo.idDireccion == 0) {
          notData = true;
          msg = msg + 'correo electrónico, ';
        }
      });
      this.ContactosNew.forEach(function (contacto: any) {
        if (idAux == contacto.idDireccion) {
          let data = {
            calle: element.calle,
            numeroInterior: element.numeroInterior,
            numeroExterior: element.numeroExterior,
            codigoPostal: element.codigoPostal,
            nombre: contacto.nombre,
            apellidoPaterno: contacto.apellidoPaterno,
            apellidoMaterno: contacto.apellidoMaterno,
            puesto: contacto.puesto
          }
          DireccionContacto.push(data);
        } else if (contacto.idDireccion == 0) {
          notData = true;
          msg = msg + 'contacto, ';
        }
      });
    });

    if (notData) {
      msg = msg + 'no esta asignado a una dirección, favor de verificarlo para continuer'
      this.popToast('info', 'Sin asignación de Dirección', msg);
      this.loading = false;
      return;
    }


    var prospecto = {
      NombreComercial: this.formGeneral.get('Empresa').value,
      Clasificacion: this.clf,
      esCliete: 0,
      GiroEmpresaId: this.formGeneral.get('Giros').value,
      ActividadEmpresaId: this.formGeneral.get('Actividades').value,
      NumeroEmpleados: this.formGeneral.get('NoEmpleados').value,
      TamanoEmpresaId: this.formGeneral.get('Tamanio').value,
      TipoEmpresaId: this.formGeneral.get('Tipo').value,
      TipoBaseId: this.formGeneral.get('TipoBase').value,
      Direcciones: this.DireccionesNew,
      Telefonos: this.TelefonosNew,
      Emails: this.CorreosNew,
      Contactos: this.ContactosNew,
      Usuario: this.Usuario,
      DireccionEmail: DireccionEmail,
      DireccionTelefono: DireccionTelefono,
      DireccionContacto: DireccionContacto
    }
    this._ClienteService.addProspecto(prospecto).subscribe(element => {
      if (element == 202) {
        let msg = 'Se a Registrado Correctamente el Prospecto' + prospecto['NombreComercial'];
        this.popToast('success', 'Prospectos', msg);
        setTimeout(() => {
          this.loading = false;
          this.router.navigate(['/ventas/directorio'])
        }, 2000);

      }
      else {
        let msg = 'Error al intentar registrar Correctamente el Prospecto' + prospecto['Nombre Comercial'];
        this.popToast('error', 'Prospectos', msg);
        this.loading = false;
      }

    })
  }


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

  //#region FUNCIONAMIENTO DE MODAL Y CONTROL DE MODAL DE SIMILITUDES.
  coincidenciaCliente: boolean = false;
  coincidencias: any;
  cliente: any;

  //Scroll
  disabled = false;
  compact = false;
  invertX = true;
  invertY = true;
  shown = 'hover';

  showModalCoincidencias() {
    this.formGeneral.controls['ValidarEmpresa'].setValue('');
    this.cliente = this.formGeneral.get('Empresa').value.substring(0, 15);
    if (this.cliente.length > 0) {
      var obj = {
        cliente: this.cliente
      };

      this._ClienteService.coincidenciaCliente(obj).subscribe(result => {
        if (result != 404) {
          if (result.length > 0) {
            this.coincidenciaCliente = true;
            this.coincidencias = result;
          }
        }
      });
    }
  }
  //#endregion


}

//#region Codigo Comentado ParaPruebas
// --> Agregar en el ngOnInit()
// this.onChangeTableD(this.config);
// this.onChangeTableT(this.config);
// this.idAuxD = this.DireccionesNew.length + 1;
// this.idAuxT = this.TelefonosNew.length + 1;

// --> Direcciones
// {
//   idAux: 1,
//   activo: true,
//   calle: "Ramon Alcorta",
//   codigoPostal: "44970",
//   colonia: "Francisco Villa",
//   coloniaId: 58798,
//   esPrincipal: true,
//   estado: "Jalisco",
//   estadoId: 14,
//   numeroExterior: "1492",
//   numeroInterior: "",
//   municipio: "Guadalajara",
//   municipioId: 571,
//   pais: "Mexico",
//   paisId: 42,
//   referencia: "SIN REFERENCIA",
//   tipoDireccion: "Fiscal",
//   tipoDireccionId: 2,
//   usuarioAlta: 'DAMSA.NINIGUEZ',
//   telefonos: [],
//   emails: [],
//   contactos: []
// },
// {
//   idAux: 2,
//   activo: true,
//   calle: "Fuente de la Alianza",
//   codigoPostal: "45615",
//   colonia: "Villa Fontana",
//   coloniaId: 60595,
//   esPrincipal: false,
//   estado: "Jalisco",
//   estadoId: 14,
//   numeroExterior: "124",
//   numeroInterior: "",
//   municipio: "San Pedro Tlaquepaque",
//   municipioId: 611,
//   pais: "Mexico",
//   paisId: 42,
//   referencia: "SIN REFERENCIA",
//   tipoDireccion: "Sucursal",
//   tipoDireccionId: 3,
//   usuarioAlta: 'DAMSA.NINIGUEZ',
//   telefonos: [],
//   emails: [],
//   contactos: []
// },
// {
//   idAux: 3,
//   activo: true,
//   calle: "Fuente de la Alianza",
//   codigoPostal: "45615",
//   colonia: "Villa Fontana",
//   coloniaId: 60595,
//   esPrincipal: false,
//   estado: "Jalisco",
//   estadoId: 14,
//   numeroExterior: "126",
//   numeroInterior: "",
//   municipio: "San Pedro Tlaquepaque",
//   municipioId: 611,
//   pais: "Mexico",
//   paisId: 42,
//   referencia: "SIN REFERENCIA",
//   tipoDireccion: "Sucursal",
//   tipoDireccionId: 3,
//   usuarioAlta: 'DAMSA.NINIGUEZ',
//   telefonos: [],
//   emails: [],
//   contactos: []
// },
// {
//   idAux: 4,
//   activo: true,
//   calle: "Fuente de la Alianza",
//   codigoPostal: "45615",
//   colonia: "Villa Fontana",
//   coloniaId: 60595,
//   esPrincipal: false,
//   estado: "Jalisco",
//   estadoId: 14,
//   numeroExterior: "128",
//   numeroInterior: "",
//   municipio: "San Pedro Tlaquepaque",
//   municipioId: 611,
//   pais: "Mexico",
//   paisId: 42,
//   referencia: "SIN REFERENCIA",
//   tipoDireccion: "Sucursal",
//   tipoDireccionId: 3,
//   usuarioAlta: 'DAMSA.NINIGUEZ',
//   telefonos: [],
//   emails: [],
//   contactos: []
// },
// {
//   idAux: 5,
//   activo: true,
//   calle: "Fuente de la Alianza",
//   codigoPostal: "45615",
//   colonia: "Villa Fontana",
//   coloniaId: 60595,
//   esPrincipal: false,
//   estado: "Jalisco",
//   estadoId: 14,
//   numeroExterior: "130",
//   numeroInterior: "",
//   municipio: "San Pedro Tlaquepaque",
//   municipioId: 611,
//   pais: "Mexico",
//   paisId: 42,
//   referencia: "SIN REFERENCIA",
//   tipoDireccion: "Sucursal",
//   tipoDireccionId: 3,
//   usuarioAlta: 'DAMSA.NINIGUEZ',
//   telefonos: [],
//   emails: [],
//   contactos: []
// },
// {
//   idAux: 6,
//   activo: true,
//   calle: "Fuente de la Alianza",
//   codigoPostal: "45615",
//   colonia: "Villa Fontana",
//   coloniaId: 60595,
//   esPrincipal: false,
//   estado: "Jalisco",
//   estadoId: 14,
//   numeroExterior: "132",
//   numeroInterior: "",
//   municipio: "San Pedro Tlaquepaque",
//   municipioId: 611,
//   pais: "Mexico",
//   paisId: 42,
//   referencia: "SIN REFERENCIA",
//   tipoDireccion: "Sucursal",
//   tipoDireccionId: 3,
//   usuarioAlta: 'DAMSA.NINIGUEZ',
//   telefonos: [],
//   emails: [],
//   contactos: []
// }



  //#endregion
