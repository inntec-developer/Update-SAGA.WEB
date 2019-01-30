import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

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

  /* Variables Auxuliares */
  public auxPais: any;
  public auxEstado: any;
  public auxMunicipio: any;
  public auxColonia: any;
  public auxTipoDireccion: any;
  /***************************/

  public formGeneral: FormGroup;
  public formDirecciones: FormGroup;
  public formTelefonos: FormGroup;
  public formContactos: FormGroup;

  public addDireccion: boolean;
  public DireccionesNew: Array<any> = [];
  public indexDireccion: any;
  public EditDireccion: boolean;

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
  public cp: any;
  public Principal: boolean = false;;

  public isReadonly: boolean = false;
  public maxRat: number = 3;
  public clf: number = 1;
  public overStar: number;
  public percent: number;


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
      CodigoPostal: new FormControl('', [Validators.required]),
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

    this.formDirecciones = this.fb.group({
      TipoDireccion: ['', [Validators.required]],
      CodigoPostal: ['', [Validators.required]],
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

  cancelarDireccion() {
    this.EditDireccion = false;
    this.estados = null;
    this.municipios = null;
    this.colonias = null;
    this.formDirecciones.reset();
  }

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

  AddDireccion() {
    // console.log(this.formDirecciones.get('Paises').value);
    let data = {
      tipoDireccionId: this.formDirecciones.get('TipoDireccion').value,
      tipoDireccion: this.auxTipoDireccion,
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
      referencia: this.formDirecciones.get('Referencia').value || '',
      esPrincipal: this.formDirecciones.get('Principal').value,
      activo: this.formDirecciones.get('Activo').value
    }
    if (data.esPrincipal) {
      this.Principal = data.esPrincipal;
    }
    this.formDirecciones.reset();
    this.formDirecciones.controls['Principal'].setValue(false);
    this.formDirecciones.controls['Activo'].setValue(true);
    this.formDirecciones.controls['CodigoPostal'].setValue('');
    if(!this.EditDireccion){
      this.DireccionesNew.push(data);
    }else{
      this.DireccionesNew[this.indexDireccion] = data;
      this.EditDireccion = false;
    }
    this.onChangeTableD(this.config);
  }

  UpDireccion() {
    debugger;
    this.addDireccion = true;
    this.EditDireccion = true;
    if(this.Principal && this.DireccionesNew[this.indexDireccion]['esPrincipal']){
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

  /* funcion para Clasificación */
  public hoveringOver(value: number): void {
    this.overStar = value;
    this.percent = 100 * (value / this.maxRat);
  };
  public resetStar(): void {
    this.overStar = void 0;
  }
  /******************************************************************************/

  public config: any = {
    paging: true,
    filtering: { filterString: '' },
    className: ['table-hover mb-0']
  }

  /* Configuracion / Acciones para la tabla de Direcciones  */
  public selectedD: boolean = false;
  public registrosD: number;
  public rowAuxD = [];
  public elementD: any = null;
  /* Variables de Paginador */
  public pageD: number = 1;
  public itemsPerPageD: number = 10;
  public maxSizeD: number = 5;
  public numPagesD: number = 1;
  public lengthD: number = 0;

  public rowsD: Array<any> = [];
  public columnsD: Array<any> = [
    { title: 'Tipo Direccion', sorting: 'desc', className: 'text-success text-center', name: 'tipoDireccion' },
    { title: 'Pais', sorting: 'desc', className: 'text-success text-center', name: 'pais' },
    { title: 'Estado', sorting: 'desc', className: 'text-success text-center', name: 'estado' },
    { title: 'Municipio', className: 'text-info text-center', name: 'municipio' },
    { title: 'Colonia', className: 'text-info text-center', name: 'colonia' },
    { title: 'Calle', className: 'text-info text-center', name: 'calle' },
    { title: 'Exterior', className: 'text-info text-center', name: 'exterior' },
    { title: 'Interior', className: 'text-info text-center', name: 'interior' },
    { title: 'Referencia', className: 'text-info text-center', name: 'referencia' },
    { title: 'Principal', className: 'text-info text-center', name: 'esPrincipal' },
    { title: 'Activo', className: 'text-info text-center', name: 'activo' },
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

  public onChangeTableD(config: any, page: any = { page: this.pageD, itemsPerPage: this.itemsPerPageD }): any {
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

  onCellClickD(data: any, index: any) {
    data.selectedD ? data.selectedD = false : data.selectedD = true;
    this.elementD = data;
    this.indexDireccion = index;

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


  /******************************************************************************/

  /* Creacion de mensajes */
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
  }/******************************************************************************/


}