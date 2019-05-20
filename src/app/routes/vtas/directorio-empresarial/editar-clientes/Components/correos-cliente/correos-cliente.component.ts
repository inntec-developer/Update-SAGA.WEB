import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { ClientesService } from '../../../../../../service/clientes/clientes.service';
import { SettingsService } from '../../../../../../core/settings/settings.service';

const swal = require('sweetalert');

@Component({
  selector: 'app-correos-cliente',
  templateUrl: './correos-cliente.component.html',
  styleUrls: ['./correos-cliente.component.scss'],
  providers: [ClientesService]
})
export class CorreosClienteComponent implements OnInit {
  @Input('Direcciones') Direcciones: any = [];
  @Input('EntidadId') EntidadId: any;
  @Input('Correos') Correos: any = [];

  public formCorreos: FormGroup;

  public loading: boolean = false;

  public itemsPerPage: number = 5;
  public maxSize: number = 5;
  public showFilterRowC: boolean;

  public addCorreo: boolean;
  public indexCorreos: any;
  public EditCorreo: boolean;
  public textbtnCorreo: string;

  public selectedC: boolean = false;
  public registrosC: number = 0;
  public rowAuxC = [];
  public elementC: any = null;

  public pageC: number = 1;
  public numPagesC: number = 1;
  public lengthC: number = 0;

  public Usuario: string;


  constructor(
    private fb: FormBuilder,
    private _ClienteService: ClientesService,
    private toasterService: ToasterService,
    private settings: SettingsService
  ) {
    this.formCorreos = new FormGroup({
      EmailDireccion: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  ngOnInit() {
    this.Usuario = this.settings.user['usuario'];
    this.showFilterRowC = true;
    this.formCorreos = this.fb.group({
      EmailDireccion: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes.Direcciones && !changes.Direcciones.isFirstChange()) ||
      (changes.Correos && !changes.Correos.isFirstChange())) {
      this.onChangeTableC(this.config);
    };
  }


  AddEmail() {
    let idDireccion = this.formCorreos.get('EmailDireccion').value;
    let idxDireccion = this.Direcciones.findIndex(x => x.id == idDireccion)
    let data = {
      id: '',
      idDE: '',
      direccionId: idDireccion,
      calle: this.Direcciones[idxDireccion]['calle'] + ' No. ' + this.Direcciones[idxDireccion]['numeroExterior'] + ' C.P.' + this.Direcciones[idxDireccion]['codigoPostal'],
      email: this.formCorreos.get('Email').value,
      esPrincipal: false,
      entidadId: this.EntidadId,
      usuario: this.Usuario,
    }

    if (!this.EditCorreo) {
      var exist = this.Correos.find(element => {
        if (element.email == data.email) {
          return true;
        }
        else {
          return false;
        }
      });
      if (!exist) {
        this._ClienteService.addCorreo(data).subscribe(result => {
          if (result != 404) {
            data['id'] = result[1];
            data['idDE'] = result[0];
            this.Correos.push(data);
            this.popToast('success', 'Correos', 'Se agregó con éxito un nuevo correo electrónico.');
            this.cancelarCorreo();
            this.onChangeTableC(this.config);
          }
          else {
            this.popToast('error', 'Correos', 'Algo salio mal, no se puedo registrar el nuevo  correo electrónico.');
            return;
          }
        });
      }
      else {
        this.popToast('info', 'Correo Electrónico', 'El correo electrónico que intenta registrar ya existe.');
        return;
      }
    } else {
      var idEmail = this.Correos[this.indexCorreos]['id'];
      var idDE = this.Correos[this.indexCorreos]['idDE'];
      data.id = idEmail;
      data.idDE = idDE;
      var exist = this.Correos.find(element => {
        if (element.email == data.email
          && element.id != idEmail) {
          return true;
        }
        else {
          return false;
        }
      });
      if (!exist) {
        this._ClienteService.editCorreo(data).subscribe(result => {
          if (result != 404) {
            this.Correos[this.indexCorreos] = data;
            this.popToast('success', 'Correos', 'Se actualizo con éxito el correo electrónico.');
            this.EditCorreo = false;
            this.elementC = null;
            this.cancelarCorreo();
            this.onChangeTableC(this.config);
          }
          else {
            this.popToast('error', 'Correos', 'Algo salio mal, no se pudo actualizar el correo electrónico.');
          }
        });
      }
      else {
        this.popToast('info', 'Correo Electrónico', 'El correo electrónico que intenta actualizar ya existe.');
        return;
      }

    }
  }

  UpEmail() {
    this.addCorreo = true;
    this.EditCorreo = true;
    this.formCorreos.controls['EmailDireccion'].setValue(this.Correos[this.indexCorreos]['direccionId']);
    this.formCorreos.controls['Email'].setValue(this.Correos[this.indexCorreos]['email']);
  }

  sweetalertEliminarCorreo() {
    swal({
      title: 'Estas seguro? ',
      text: 'Para continuar es necesario confirmar la eliminación del correo electrónico.',
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
        this._ClienteService.deleteCorreo(this.elementC.id).subscribe(result => {
          if (result == 200) {
            this.Correos.splice(this.indexCorreos, 1);
            this.onChangeTableC(this.config);
            swal('Direcciones', 'Se elimino el correo electrónico correctamente.', 'success');
          } else {
            swal('Direcciones', 'Algo salio mal al intertar eliminar los registros.', 'error');
          }
        });
      } else {
        swal('Cancelado!', 'No se realizaron modificaciones en los correos electrónicos.', 'error');
      }
    });
  }

  cancelarCorreo() {
    this.formCorreos.reset();
    this.addCorreo = false;
    this.EditCorreo = false;
    //this.elementC = null;
  }

  //#region CONFIGURACION Y ACCIONES TABLA DE TELEFONOS
  public config: any = {
    paging: true,
    filtering: { filterString: '' },
    className: ['table table-sm table-hover mb-0']
  }

  public rowsC: Array<any> = [];
  public columnsC: Array<any> = [
    { title: 'Dirección', sorting: 'desc', className: 'text-success text-center', name: 'calle', filtering: { filterString: '', placeholder: 'Dirección' } },
    { title: 'Email / Correo', sorting: 'desc', className: 'text-success text-center', name: 'email', filtering: { filterString: '', placeholder: 'Email / Correo' } },
    // { title: 'Activo', className: 'text-info text-center', name: 'activo', filtering: { filterString: '', placeholder: 'Activo' } },
  ];

  public changePageC(page: any, data: Array<any> = this.Correos): Array<any> {
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
    this.registrosC = this.Correos.length;
    this.rowsC = this.Correos;
    let filteredData = this.changeFilterC(this.Correos, this.config);
    let sortedData = this.changeSortC(filteredData, this.config);
    this.rowsC = page && config.paging ? this.changePageC(page, sortedData) : sortedData;
    this.lengthC = sortedData.length;
  }

  onCellClickC(data: any, id: any) {
    if (!this.EditCorreo) {
      data.selectedC ? data.selectedC = false : data.selectedC = true;
      this.elementC = data;
      this.indexCorreos = this.Correos.findIndex(x => x.id === id);

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
