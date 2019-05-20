import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { CatalogosService } from '../../../../../../service';
import { ClientesService } from '../../../../../../service/clientes/clientes.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SettingsService } from '../../../../../../core/settings/settings.service';

const swal = require('sweetalert');

@Component({
  selector: 'app-telefonos-cliente',
  templateUrl: './telefonos-cliente.component.html',
  styleUrls: ['./telefonos-cliente.component.scss'],
  providers: [CatalogosService, ClientesService]
})
export class TelefonosClienteComponent implements OnInit {
  @Input('Direcciones') Direcciones: any = [];
  @Input('EntidadId') EntidadId: any;
  @Input('Telefonos') Telefonos: any = [];

  public formTelefonos: FormGroup;

  public loading: boolean = false;

  public itemsPerPage: number = 5;
  public maxSize: number = 5;
  public showFilterRowT: boolean;

  public indexTelefonos: any;
  public auxTipoTelefono: any;
  public addTelefono: boolean;
  public EditTelefono: boolean;


  public textbtnTelefono: string;
  public esOficina: any;

  public Principal: boolean = false;
  public tipoTelefonos: any;
  public Usuario: string;

  constructor(
    private fb: FormBuilder,
    private _CatalogoService: CatalogosService,
    private _ClienteService: ClientesService,
    private toasterService: ToasterService,
    private settings: SettingsService
  ) {

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
  }

  ngOnInit() {
    this.getCatalogos();
    this.Usuario = this.settings.user['usuario'];
    this.showFilterRowT = true;
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
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes.Direcciones && !changes.Direcciones.isFirstChange()) ||
      (changes.Telefonos && !changes.Telefonos.isFirstChange())) {
      this.Telefonos.forEach(element => {
        if (element['esPrincipal']) {
          this.Principal = true;
        }
      });
      this.onChangeTableT(this.config);
    }
  }

  getCatalogos() {
    this._CatalogoService.getTipoTelefono().subscribe(result => {
      this.tipoTelefonos = result;
    });
  }
  getTipoTelefono() {
    this.esOficina = this.formTelefonos.get('TipoTelefono').value;
  }

  cancelarTelefono() {
    this.formTelefonos.reset();
    this.addTelefono = false;
    this.EditTelefono = false;
    this.esOficina = 1;
    //this.elementT = null;
    this.formTelefonos.controls['Activo'].setValue(true);
    this.formTelefonos.controls['Principal'].setValue(false);
    this.formTelefonos.controls['LadaPais'].setValue(52)
  }

  AddTelefono() {
    let idDireccion = this.formTelefonos.get('TelDireccion').value;
    let idxDireccion = this.Direcciones.findIndex(x => x.id == idDireccion)
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
      activo: this.formTelefonos.get('Activo').value,
      calle: this.Direcciones[idxDireccion]['calle'] + ' No. ' + this.Direcciones[idxDireccion]['numeroExterior'] + ' C.P.' + this.Direcciones[idxDireccion]['codigoPostal'],
      claveLada: this.formTelefonos.get('Lada').value || '',
      clavePais: this.formTelefonos.get('LadaPais').value,
      entidadId: this.EntidadId,
      esPrincipal: this.formTelefonos.get('Principal').value,
      extension: this.formTelefonos.get('Extension').value || '',
      id: '',
      idDT: '',
      direccionId: idDireccion,
      telefono: this.formTelefonos.get('Numero').value,
      tipoTelefonoId: tipoTelefonoId,
      tTelefono: this.auxTipoTelefono[0].tipo,
      usuario: this.Usuario,
    }
    if (data.esPrincipal) {
      this.Principal = data.esPrincipal;
    }

    if (!this.EditTelefono) {
      var exist = this.Telefonos.find(element => {
        if (element.telefono == data.telefono
          && element.extension == data.extension) {
          return true;
        } else {
          return false;
        }
      });
      if (!exist) {
        this._ClienteService.addTelefono(data).subscribe(result => {
          if (result != 404) {
            data['id'] = result[1];
            data['idDT'] = result[0];
            this.Telefonos.push(data);
            this.popToast('success', 'Teléfonos', 'Se agregó con éxito un nuevo teléfono.');
            this.cancelarTelefono();
            this.onChangeTableT(this.config);
          }
          else {
            this.popToast('error', 'Teléfonos', 'Algo salio mal, no se puedo registrar el nuevo teléfono.');
            return;
          }
        });
      }
      else {
        this.popToast('info', 'Teléfonos', 'El Teléfono que intenta registrar ya existe.');
        return;
      }

    } else {
      var idTelefono = this.Telefonos[this.indexTelefonos]['id'];
      var idDT = this.Telefonos[this.indexTelefonos]['idDT'];
      data.id = idTelefono;
      data.idDT = idDT;
      var exist = this.Telefonos.find(element => {
        if (element.telefono == data.telefono
          && element.extension == data.extension
          && element.id != idTelefono) {
          return true;
        } else {
          return false;
        }
      });
      if (!exist) {
        this._ClienteService.editTelefono(data).subscribe(result => {
          if (result != 404) {
            this.Telefonos[this.indexTelefonos] = data;
            this.popToast('success', 'Teléfonos', 'Se actualizo con éxito el teléfono.');
            this.EditTelefono = false;
            this.elementT = null;
            this.cancelarTelefono();
            this.onChangeTableT(this.config);
          }
          else {
            this.popToast('error', 'Teléfonos', 'Algo salio mal, no se puedo actualizar el teléfono.');
            return;
          }
        });
      }
      else {
        this.popToast('info', 'Teléfonos', 'El Teléfono que intenta actualizar ya existe.');
        return;
      }
    }
  }

  UpTelefono() {
    this.addTelefono = true;
    this.EditTelefono = true;
    if (this.Principal && this.Telefonos[this.indexTelefonos]['esPrincipal']) {
      this.Principal = false;
    }
    this.formTelefonos.controls['TelDireccion'].setValue(this.Telefonos[this.indexTelefonos]['direccionId']);
    this.formTelefonos.controls['TipoTelefono'].setValue(this.Telefonos[this.indexTelefonos]['tipoTelefonoId']);
    this.formTelefonos.controls['LadaPais'].setValue(this.Telefonos[this.indexTelefonos]['clavePais']);
    this.formTelefonos.controls['Lada'].setValue(this.Telefonos[this.indexTelefonos]['claveLada']);
    this.formTelefonos.controls['Numero'].setValue(this.Telefonos[this.indexTelefonos]['telefono']);
    this.formTelefonos.controls['Extension'].setValue(this.Telefonos[this.indexTelefonos]['extension']);
    this.formTelefonos.controls['Principal'].setValue(this.Telefonos[this.indexTelefonos]['esPrincipal']);
    this.formTelefonos.controls['Activo'].setValue(this.Telefonos[this.indexTelefonos]['activo']);
    this.getTipoTelefono();
  }

  sweetalertEliminarTelefono() {
    swal({
      title: 'Estas seguro? ',
      text: 'Para continuar es necesario confirmar la eliminación del teléfono',
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
        this._ClienteService.deleteTelefono(this.elementT.id).subscribe(result => {
          if (result == 200) {
            if (this.Telefonos[this.indexTelefonos]['esPrincipal'] == true) {
              this.Principal = false;
            }
            this.Telefonos.splice(this.indexTelefonos, 1);
            this.onChangeTableT(this.config);
            swal('Direcciones', 'Se elimino el teléfono correctamente.', 'success');
          } else {
            swal('Direcciones', 'Algo salio mal al intertar eliminar los registros.', 'error')
          }
        });
      } else {
        swal('Cancelado!', 'No se realizaron modificaciones en los Teléfonos', 'error');
      }
    });
  }

  public config: any = {
    paging: true,
    filtering: { filterString: '' },
    className: ['table table-sm table-hover mb-0']
  }

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
    { title: 'Extensión', className: 'text-info text-center', name: 'extension', filtering: { filterString: '', placeholder: 'Extención' } },
    { title: 'Principal', className: 'text-info text-center', name: 'esPrincipal', filtering: { filterString: '', placeholder: 'Principal' } },
    { title: 'Activo', className: 'text-info text-center', name: 'activo', filtering: { filterString: '', placeholder: 'Activo' } },
  ];

  public changePageT(page: any, data: Array<any> = this.Telefonos): Array<any> {
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
    this.registrosT = this.Telefonos.length;
    this.rowsT = this.Telefonos;
    let filteredData = this.changeFilterT(this.Telefonos, this.config);
    let sortedData = this.changeSortT(filteredData, this.config);
    this.rowsT = page && config.paging ? this.changePageT(page, sortedData) : sortedData;
    this.lengthT = sortedData.length;
  }

  onCellClickT(data: any, id: any) {
    if (!this.EditTelefono) {
      data.selectedT ? data.selectedT = false : data.selectedT = true;
      this.elementT = data;
      this.indexTelefonos = this.Telefonos.findIndex(x => x.id === id);

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
