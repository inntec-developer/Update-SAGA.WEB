import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { CatalogosService } from '../../../../../../service';
import { ClientesService } from '../../../../../../service/clientes/clientes.service';

const swal = require('sweetalert');

@Component({
  selector: 'app-contactos-cliente',
  templateUrl: './contactos-cliente.component.html',
  styleUrls: ['./contactos-cliente.component.scss'],
  providers: [CatalogosService, ClientesService]
})
export class ContactosClienteComponent implements OnInit {
  @Input('Direcciones') Direcciones: any = [];
  @Input('EntidadId') EntidadId: any;
  @Input('Contactos') Contactos: any = [];

  public formContactos: FormGroup;

  public loading: boolean = false;

  public itemsPerPage: number = 5;
  public maxSize: number = 5;
  public showFilterRowCn: boolean;

  public auxTipoTelefono: any;

  public addContacto: boolean;
  public indexContacto: any;
  public EditContacto: boolean;
  public textbtnContacto: string;
  public esOficinaContacto: any;

  public Usuario: string;

  public tipoTelefonos: any;

  /* DECLARACION DE OBJETOS */
  public Telefonos: Array<any> = [];
  public Emails: Array<any> = [];



  constructor(
    private fb: FormBuilder,
    private _CatalogoService: CatalogosService,
    private _ClienteService: ClientesService,
    private toasterService: ToasterService
  ) {
    this.formContactos = new FormGroup({
      ContactoDireccion: new FormControl('', [Validators.required]),
      Nombre: new FormControl('', [Validators.required]),
      ApellidoPaterno: new FormControl('', [Validators.required]),
      ApellidoMaterno: new FormControl(''),
      Puesto: new FormControl('', [Validators.required]),
      TipoTelefono: new FormControl('', [Validators.required]),
      LadaPais: new FormControl('52', [Validators.required, Validators.maxLength(3)]),
      Lada: new FormControl('', [Validators.required, Validators.maxLength(3)]),
      Numero: new FormControl('', [Validators.required, Validators.maxLength(8)]),
      Extension: new FormControl(''),
      Email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  ngOnInit() {
    this.Usuario = sessionStorage.getItem('usuario');
    this.showFilterRowCn = true;
    this.getCatalogos();
    this.formContactos = this.fb.group({
      Nombre: ['', [Validators.required]],
      ApellidoPaterno: ['', [Validators.required]],
      ApellidoMaterno: ['',],
      Puesto: ['', [Validators.required]],
      ContactoDireccion: ['', [Validators.required]],
      TipoTelefono: ['', [Validators.required]],
      LadaPais: ['52', [Validators.required, Validators.maxLength(3)]],
      Lada: ['', [Validators.required, Validators.maxLength(3)]],
      Numero: ['', [Validators.required, Validators.maxLength(8)]],
      Extension: [''],
      Email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes.Direcciones && !changes.Direcciones.isFirstChange()) ||
      (changes.Direcciones && !changes.Direcciones.isFirstChange())) {
      this.onChangeTableCn(this.config);
    }
  }
  getCatalogos() {
    this._CatalogoService.getTipoTelefono().subscribe(result => {
      this.tipoTelefonos = result;
    });
  }

  getTipoTelefonoContacto() {
    this.esOficinaContacto = this.formContactos.get('TipoTelefono').value;
  }

  //#region FUNCIONES PARA CONTACTOS
  AddContacto() {
    let idDireccion = this.formContactos.get('ContactoDireccion').value;
    let idxDireccion = this.Direcciones.findIndex(x => x.id == idDireccion)
    let tipoTelefonoId = this.formContactos.get('TipoTelefono').value;
    this.auxTipoTelefono = this.tipoTelefonos.filter(x => {
      if (x.id == tipoTelefonoId) {
        return x.tipo;
      }
    });
    if (tipoTelefonoId != 4) {
      this.formContactos.controls['Extension'].setValue('');
    }

    let email = {
      id: '',
      email: this.formContactos.get('Email').value,
      entidadId: this.EntidadId,
      esPrincila: false,
      UsuarioAlta: this.Usuario,
    }

    let telefono = {
      id: '',
      activo: true,
      clavePais: this.formContactos.get('LadaPais').value,
      claveLada: this.formContactos.get('Lada').value || '',
      esPrincipal: true,
      extension: this.formContactos.get('Extension').value || '',
      entidadid: this.EntidadId,
      telefono: this.formContactos.get('Numero').value,
      tipoTelefonos: this.auxTipoTelefono[0].tipo,
      tipoTelefonoId: this.formContactos.get('TipoTelefono').value,
      UsuarioAlta: this.Usuario,
    }

    this.Telefonos.push(telefono);
    this.Emails.push(email);

    let data = {
      apellidoPaterno: this.formContactos.get('ApellidoPaterno').value,
      apellidoMaterno: this.formContactos.get('ApellidoMaterno').value || '',
      calle: this.Direcciones[idxDireccion]['calle'] + ' No. '+ this.Direcciones[idxDireccion]['numeroExterior'] + ' C.P.' + this.Direcciones[idxDireccion]['codigoPostal'],
      clienteId: this.EntidadId,
      direccionId: idDireccion,
      emails: this.Emails,
      emailAux: this.formContactos.get('Email').value,
      id: '',
      idDCn: '',
      nombre: this.formContactos.get('Nombre').value,
      nombreAux: this.formContactos.get('Nombre').value + ' ' + this.formContactos.get('ApellidoPaterno').value,
      puesto: this.formContactos.get('Puesto').value,
      telefonos: this.Telefonos,
      telefonoAux: this.formContactos.get('Numero').value,
      tipoEntidadId: 3,
      tipoTelefonoAux: this.auxTipoTelefono[0].tipo,
      usuario: this.Usuario,
    }

    if (!this.EditContacto) {
      this._ClienteService.addContacto(data).subscribe(result => {
        if (result != 404) {
          data['id'] = result[1];
          data['idDCn'] = result[0];
          data['telefonos'][0]['id'] = result[2];
          data['emails'][0]['id'] = result[3]
          this.Contactos.push(data);
          this.popToast('success', 'Contactos', 'Se agrego con éxito el nuevo contacto.');
          this.cancelarContacto();
          this.onChangeTableCn(this.config);
        }
        else {
          this.popToast('error', 'Contactos', 'Algo salio mal, no se pudo registrar el nuevo contacto.');
          return;
        }
      });
    } else {
      var idContacto = this.Contactos[this.indexContacto]['id'];
      var idDCn = this.Contactos[this.indexContacto]['idDCn'];
      var idTelefono = this.Contactos[this.indexContacto]['telefonos'][0]['id'];
      var idEmail = this.Contactos[this.indexContacto]['emails'][0]['id'];
      data.id = idContacto;
      data.idDCn = idDCn;
      data.telefonos[0]['id'] = idTelefono;
      data.emails[0]['id'] = idEmail;
      this._ClienteService.editContacto(data).subscribe(result => {
        if (result != 404) {
          this.Contactos[this.indexContacto] = data;
          this.popToast('success', 'Contactos', 'Se actualizo con éxito el contacto.');
          this.EditContacto = false;
          this.elementCn = null;
          this.cancelarContacto();
          this.onChangeTableCn(this.config);
        } else {
          this.popToast('success', 'Contactos', 'Algo salio mal, no se pudo actualizar el contacto.');
          return;
        }
      });
    }
    this.Telefonos = [];
    this.Emails = [];
  }

  UpContactos() {
    this.addContacto = true;
    this.EditContacto = true;
    this.formContactos.controls['ContactoDireccion'].setValue(this.Contactos[this.indexContacto]['direccionId']);
    this.formContactos.controls['Nombre'].setValue(this.Contactos[this.indexContacto]['nombre']);
    this.formContactos.controls['ApellidoPaterno'].setValue(this.Contactos[this.indexContacto]['apellidoPaterno']);
    this.formContactos.controls['ApellidoMaterno'].setValue(this.Contactos[this.indexContacto]['apellidoMaterno']);
    this.formContactos.controls['Puesto'].setValue(this.Contactos[this.indexContacto]['puesto']);
    this.formContactos.controls['TipoTelefono'].setValue(this.Contactos[this.indexContacto]['telefonos'][0]['tipoTelefonoId']);
    this.getTipoTelefonoContacto();
    this.formContactos.controls['LadaPais'].setValue(this.Contactos[this.indexContacto]['telefonos'][0]['clavePais']);
    this.formContactos.controls['Lada'].setValue(this.Contactos[this.indexContacto]['telefonos'][0]['claveLada']);
    this.formContactos.controls['Numero'].setValue(this.Contactos[this.indexContacto]['telefonos'][0]['telefono']);
    this.formContactos.controls['Extension'].setValue(this.Contactos[this.indexContacto]['telefonos'][0]['extension']);
    this.formContactos.controls['Email'].setValue(this.Contactos[this.indexContacto]['emails'][0]['email']);
  }

  sweetalertEliminarContacto() {
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
      if (isConfirm) {
        this._ClienteService.deleteContacto(this.elementCn.id).subscribe(result => {
          if (result == 200) {
            this.Contactos.splice(this.indexContacto, 1);
            this.onChangeTableCn(this.config);
            swal('Direcciones', 'Se elimino el contacto correctamente.', 'success');
          } else {
            swal('Direcciones', 'Algo salio mal al intertar eliminar los registros.', 'error');
          }
        });
      } else {
        swal('Cancelado!', 'No se realizarón modificaciones den el contacto.', 'error');
      }
    });
  }


  cancelarContacto() {
    this.addContacto = false;
    this.EditContacto = false;
    // this.elementCn = null;
    this.formContactos.reset();
    this.formContactos.controls['LadaPais'].setValue(52)
  }
  //#endregion

  //#region CONFIGURACION Y ACCIONES TABLA CONTACTOS

  public config: any = {
    paging: true,
    filtering: { filterString: '' },
    className: ['table table-sm table-hover mb-0']
  }

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
    { title: 'Dirección', sorting: 'desc', className: 'text-success text-center', name: 'calle', filtering: { filterString: '', placeholder: 'Dirección' } },
    { title: 'Nombre', sorting: 'desc', className: 'text-success', name: 'nombreAux', filtering: { filterString: '', placeholder: 'Nombre' } },
    { title: 'Puesto', className: 'text-info', name: 'puesto', filtering: { filterString: '', placeholder: 'Puesto' } },
    { title: 'Tipo Telefóno', className: 'text-info', name: 'tipoTelefonoAux', filtering: { filterString: '', placeholder: 'Tipo Tel.' } },
    { title: 'Número', className: 'text-info', name: 'telefonoAux', filtering: { filterString: '', placeholder: 'Número' } },
    { title: 'Email / Correo', className: 'text-info', name: 'emailAux', filtering: { filterString: '', placeholder: 'Email / Correo' } },

  ];

  public changePageCn(page: any, data: Array<any> = this.Contactos): Array<any> {
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
    this.registrosCn = this.Contactos.length;
    this.rowsCn = this.Contactos;
    let filteredData = this.changeFilterCn(this.Contactos, this.config);
    let sortedData = this.changeSortCn(filteredData, this.config);
    this.rowsCn = page && config.paging ? this.changePageCn(page, sortedData) : sortedData;
    this.lengthCn = sortedData.length;
  }

  onCellClickCn(data: any, id: any) {
    if (!this.EditContacto) {
      data.selectedCn ? data.selectedCn = false : data.selectedCn = true;
      this.elementCn = data;
      this.indexContacto = this.Contactos.findIndex(x => x.id === id);

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
