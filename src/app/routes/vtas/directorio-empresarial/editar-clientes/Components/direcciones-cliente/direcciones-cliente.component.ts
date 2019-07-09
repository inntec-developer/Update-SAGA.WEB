import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { CatalogosService } from '../../../../../../service';
import { ClientesService } from '../../../../../../service/clientes/clientes.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SettingsService } from '../../../../../../core/settings/settings.service';

const swal = require('sweetalert');

@Component({
  selector: 'app-direcciones-cliente',
  templateUrl: './direcciones-cliente.component.html',
  styleUrls: ['./direcciones-cliente.component.scss'],
  providers: [CatalogosService, ClientesService]
})
export class DireccionesClienteComponent implements OnInit {
  @Input('Direcciones') Direcciones: any = [];
  @Input('EntidadId') EntidadId: any;
  @Output('DataEmitter') DataEmitter: EventEmitter<any[]> = new EventEmitter();
  @Output('DeleteDireccion') DeleteDireccion: EventEmitter<any[]> = new EventEmitter();

  public loading: boolean = false;

  public itemsPerPage: number = 5;
  public maxSize: number = 5;
  public showFilterRowD: boolean;

  public formDirecciones: FormGroup;
  public tipoDireccion: any;
  public paises: any;
  public estados: any;
  public municipios: any;
  public colonias: any;
  public cp: any;
  public Principal: boolean = false;

  public indexDireccion: any;
  public addDireccion: boolean;
  public EditDireccion: boolean;

  public auxColonia: any;
  public auxEstado: any;
  public auxMunicipio: any;
  public auxPais: any;
  public auxTipoDireccion: any;

  public Usuario: any;



  constructor(
    private fb: FormBuilder,
    private _CatalogoService: CatalogosService,
    private _ClienteService: ClientesService,
    private toasterService: ToasterService,
    private spinner: NgxSpinnerService,
    private settings: SettingsService
  ) {
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
  }

  ngOnInit() {
    this.getCatalogos();
    this.Usuario = this.settings.user['usuario'];
    this.showFilterRowD = true;
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
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.Direcciones && !changes.Direcciones.isFirstChange()) {
      this.Direcciones.forEach(element => {
        if (element['esPrincipal']) {
          this.Principal = true;
        }
      });
      this.onChangeTableD(this.config);
    }
  }

  AddDireccion() {
    this.auxTipoDireccion = this.tipoDireccion.filter(x => {
      if (x.id == this.formDirecciones.get('TipoDireccion').value) {
        return x.tipoDireccion
      }
    });
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

    let data = {
      activo: this.formDirecciones.get('Activo').value,
      calle: this.formDirecciones.get('Calle').value,
      codigoPostal: this.formDirecciones.get('CodigoPostal').value,
      colonia: this.auxColonia[0]['colonia'],
      coloniaId: this.formDirecciones.get('Colonias').value,
      entidadId: this.EntidadId,
      esPrincipal: this.formDirecciones.get('Principal').value,
      estado: this.auxEstado[0]['estado'],
      estadoId: this.formDirecciones.get('Estados').value,
      id: '',
      municipio: this.auxMunicipio[0]['municipio'],
      municipioId: this.formDirecciones.get('Municipios').value,
      numeroExterior: this.formDirecciones.get('Exterior').value,
      numeroInterior: this.formDirecciones.get('Interior').value || '',
      pais: this.auxPais[0]['pais'],
      paisId: this.formDirecciones.get('Paises').value,
      referencia: this.formDirecciones.get('Referencia').value || 'SIN REFERENCIA',
      tipoDireccion: this.auxTipoDireccion[0]['tipoDireccion'],
      tipoDireccionId: this.formDirecciones.get('TipoDireccion').value,
      usuario: this.Usuario,
    }
    if (data.esPrincipal) {
      this.Principal = data.esPrincipal;
    }

    if (!this.EditDireccion) {
      var exist = this.Direcciones.find(element => {
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
        this._ClienteService.addDireccion(data).subscribe(result => {
          if (result != 404) {
            data['id'] = result;
            this.Direcciones.push(data);
            this.DataEmitter.emit(this.Direcciones);
            this.popToast('success', 'Direcciones', 'Se agregó con éxito una nueva dirección.');
            this.cancelarDireccion();
            this.onChangeTableD(this.config);
          }
          else {
            this.popToast('error', 'Direcciones', 'Algo salio mal, no se puedo registrar la nueva dirección.');
            return;
          }
        })
      }
      else {
        this.popToast('info', 'Direcciones', 'La dirección que intenta registrar ya existe.');
        return;
      }
    } else {
      var idDireccion = this.Direcciones[this.indexDireccion]['id'];
      data.id = idDireccion;
      var exist = this.Direcciones.find(element => {
        if (element.calle == data.calle
          && element.numeroExterior == data.numeroExterior
          && element.numeroInterior == data.numeroInterior
          && element.codigoPostal == data.codigoPostal
          && element.id != idDireccion) {
          return true;
        }
        else {
          return false;
        }
      });
      if (!exist) {
        this._ClienteService.editDireccion(data).subscribe(result => {
          if (result != 404) {
            this.Direcciones[this.indexDireccion] = data;
            this.popToast('success', 'Direcciones', 'Se actualizo con éxito la dirección.');
            this.EditDireccion = false;
            this.elementD = null;
            this.cancelarDireccion();
            this.onChangeTableD(this.config);
            this.DataEmitter.emit(this.Direcciones[this.indexDireccion])
          } else {
            this.popToast('error', 'Direcciones', 'Algo salio mal, no se puedo actualizar la dirección.');
            return;
          }
        });
      }
      else {
        this.popToast('info', 'Direcciones', 'La dirección que intenta actualizar ya existe.');
        return;
      }
    }

  }

  UpDireccion() {
    this.addDireccion = true;
    this.EditDireccion = true;
    if (this.Principal && this.Direcciones[this.indexDireccion]['esPrincipal']) {
      this.Principal = false;
    }
    let cp = this.Direcciones[this.indexDireccion]['codigoPostal'] as number;
    this.formDirecciones.controls['TipoDireccion'].setValue(this.Direcciones[this.indexDireccion]['tipoDireccionId']);
    this.BuscarCP(cp);
    this.formDirecciones.controls['Colonias'].setValue(this.Direcciones[this.indexDireccion]['coloniaId']);
    this.formDirecciones.controls['Calle'].setValue(this.Direcciones[this.indexDireccion]['calle']);
    this.formDirecciones.controls['Exterior'].setValue(this.Direcciones[this.indexDireccion]['numeroExterior']);
    this.formDirecciones.controls['Interior'].setValue(this.Direcciones[this.indexDireccion]['numeroInterior']);
    this.formDirecciones.controls['Referencia'].setValue(this.Direcciones[this.indexDireccion]['referencia']);
    this.formDirecciones.controls['Principal'].setValue(this.Direcciones[this.indexDireccion]['esPrincipal']);
    this.formDirecciones.controls['Activo'].setValue(this.Direcciones[this.indexDireccion]['activo']);
  }

  sweetalertEliminarDireccion() {
    swal({
      title: 'Estas seguro? ',
      text: 'Confirme la eliminación de la dirección para continuar.',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'No, Cancelar',
      closeOnConfirm: false,
      closeOnCancel: false,
      showLoaderOnConfirm: true
    }, (isConfirm) => {
      window.onkeydown = null;
      window.onfocus = null;
      if (isConfirm) {
        this._ClienteService.deleteDireccion(this.elementD.id).subscribe(result => {
          if (result == 200) {
            if (this.Direcciones[this.indexDireccion]['esPrincipal'] == true) {
              this.Principal = false;
            }
            this.DeleteDireccion.emit(this.EntidadId);
            this.Direcciones.splice(this.indexDireccion, 1);
            this.onChangeTableD(this.config);
            swal('Direcciones', 'Se eliminó la dirección correctamente..', 'success');
          } else {
            swal('Direcciones', 'Algo salio mal al intertar eliminar los registros.', 'error');
          }
        });
      } else {
        swal('Cancelado!', 'No se realizaron modificaciones en Direcciones', 'error');
      }
    });
  }

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

  public config: any = {
    paging: true,
    filtering: { filterString: '' },
    className: ['table table-sm table-hover mb-0']
  }

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

  public changePageD(page: any, data: Array<any> = this.Direcciones): Array<any> {
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
    this.registrosD = this.Direcciones.length;
    this.rowsD = this.Direcciones;
    let filteredData = this.changeFilterD(this.Direcciones, this.config);
    let sortedData = this.changeSortD(filteredData, this.config);
    this.rowsD = page && config.paging ? this.changePageD(page, sortedData) : sortedData;
    this.lengthD = sortedData.length;
  }

  onCellClickD(data: any, id: any) {
    data.selectedD ? data.selectedD = false : data.selectedD = true;
    this.elementD = data;
    this.indexDireccion = this.Direcciones.findIndex(x => x.id === id);

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

  //#region Servicios GET
  getCatalogos() {
    this._CatalogoService.getTipoDireccion().subscribe(result => {
      this.tipoDireccion = result;
    });
    this._CatalogoService.getPais().subscribe(result => {
      this.paises = result;
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
