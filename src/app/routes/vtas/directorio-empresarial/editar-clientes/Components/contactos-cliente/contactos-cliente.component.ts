import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { CatalogosService } from '../../../../../../service';
import { ClientesService } from '../../../../../../service/clientes/clientes.service';
import { SettingsService } from '../../../../../../core/settings/settings.service';
import { TelefonosClienteComponent } from '../telefonos-cliente/telefonos-cliente.component';

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

  msg: string = `Las modificaciones en teléfonos y correos eléctronicos se aplican en el momento.`
  showAlert = false;

  onClosed() {
    this.showAlert = true;
  }

  public formContactos: FormGroup;
  public formContactoTelefonos: FormGroup;
  public formContactoCorreo: FormGroup;

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

  public addContactoTelefono: boolean;
  public indexContactoTelefonos: any;
  public EditContactoTelefono: boolean;

  public addContactoCorreo: boolean;
  public indexContactoCorreos: any;
  public EditContactoCorreo: boolean;

  private idAuxCnT: number = 1;
  private idAuxCnC: number = 1;


  /* DECLARACION DE OBJETOS */
  public Telefonos: Array<any> = [];
  public Emails: Array<any> = [];



  constructor(
    private fb: FormBuilder,
    private _CatalogoService: CatalogosService,
    private _ClienteService: ClientesService,
    private toasterService: ToasterService,
    private settings: SettingsService
  ) {
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
  }

  ngOnInit() {
    this.Usuario = this.settings.user['usuario'];
    this.showFilterRowCn = true;
    this.getCatalogos();
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
    this.esOficinaContacto = this.formContactoTelefonos.get('TipoTelefono').value;
  }

  //#region FUNCIONES PARA CONTACTOS
  newContaco() {
    this.addContacto = true;
    this.textbtnContacto = 'Agregar';
    this.Emails = [];
    this.Telefonos = [];
    this.elementCn = null;
    this.elementCnT = null;
    this.elementCnT = null
    this.cancelarContactoTelefono();
    this.cancelarContactoCorreo();
  }

  AddContacto() {

    let idDireccion = this.formContactos.get('ContactoDireccion').value;
    let idxDireccion = this.Direcciones.findIndex(x => x.id == idDireccion);

    this.Telefonos.forEach(element => {
      element['UsuarioAlta'] = this.Usuario;
    });
    this.Emails.forEach(element => {
      element['UsuarioAlta'] = this.Usuario;
    });

    let data = {
      apellidoPaterno: this.formContactos.get('ApellidoPaterno').value,
      apellidoMaterno: this.formContactos.get('ApellidoMaterno').value || '',
      calle: this.Direcciones[idxDireccion]['calle'] + ' No. ' + this.Direcciones[idxDireccion]['numeroExterior'] + ' C.P.' + this.Direcciones[idxDireccion]['codigoPostal'],
      clienteId: this.EntidadId,
      direccionId: idDireccion,
      emails: this.Emails,
      id: '',
      idDCn: '',
      nombre: this.formContactos.get('Nombre').value,
      nombreAux: this.formContactos.get('Nombre').value + ' ' + this.formContactos.get('ApellidoPaterno').value,
      puesto: this.formContactos.get('Puesto').value,
      infoAdicional: this.formContactos.get('InfoAdicional').value,
      telefonos: this.Telefonos,
      tipoEntidadId: 3,
      usuario: this.Usuario,
    }

    if (!this.EditContacto) {
      this._ClienteService.addContacto(data).subscribe(result => {
        if (result != 404) {

          data['id'] = result['id'];
          data['idDCn'] = result['idDCn'];
          data['telefonos'] = result['telefonos'];
          data['emails'] = result['emails'];
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
      data.id = idContacto;
      data.idDCn = idDCn;
      this._ClienteService.editContacto(data).subscribe(result => {
        if (result != 404) {
          this.Contactos[this.indexContacto] = data;
          this.popToast('success', 'Contactos', 'Se actualizo con éxito el contacto.');
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
    this.formContactos.controls['InfoAdicional'].setValue(this.Contactos[this.indexContacto]['infoAdicional']);
    this.getTipoTelefonoContacto();
    this.Telefonos = this.Contactos[this.indexContacto]['telefonos'];
    this.Emails = this.Contactos[this.indexContacto]['emails'];
    this.lengthCnT = this.Telefonos.length;
    this.lengthCnC = this.Emails.length;
    this.rowsCnT = this.changePageCnT({ page: this.pageCnT, itemsPerPage: this.itemsPerPage });
    this.rowsCnC = this.changePageCnC({ page: this.pageCnT, itemsPerPage: this.itemsPerPage });
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
      window.onkeydown = null;
      window.onfocus = null;
      if (isConfirm) {
        window.onkeydown = null;
        window.onfocus = null;
        this._ClienteService.deleteContacto(this.elementCn.id).subscribe(result => {
          if (result == 200) {
            this.Contactos.splice(this.indexContacto, 1);
            this.onChangeTableCn(this.config);
            swal('Contactos', 'Se elimino el contacto correctamente.', 'success');
          } else {
            swal('Contactos', 'Algo salio mal al intertar eliminar los registros.', 'error');
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
    this.formContactos.reset();
    this.showAlert = false;
  }
  //#endregion

  public config: any = {
    paging: true,
    filtering: { filterString: '' },
    className: ['table table-sm table-hover mb-0']
  }

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
    { title: 'Dirección', sorting: 'desc', className: 'text-success text-center', name: 'calle', filtering: { filterString: '', placeholder: 'Dirección' } },
    { title: 'Nombre', sorting: 'desc', className: 'text-success', name: 'nombreAux', filtering: { filterString: '', placeholder: 'Nombre' } },
    { title: 'Puesto', className: 'text-info', name: 'puesto', filtering: { filterString: '', placeholder: 'Puesto' } },
    { title: 'Teléfonos', className: 'text-info', name: 'telefonos', filtering: { filterString: '', placeholder: 'Número' } },
    { title: 'Email / Correo', className: 'text-info', name: 'emails', filtering: { filterString: '', placeholder: 'Email / Correo' } },
    { title: 'Info. Adicional', className: 'text-info', name: 'infoAdicional', filtering: { filterString: '', placeholder: 'Info. Adicional' } },

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
                    if (variable != "id") {
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

  //#region ACCIONES PARA TELEFONOS

  AddContactoTelefono() {

    let tipoTeledonoId = this.formContactoTelefonos.get('TipoTelefono').value;
    if (tipoTeledonoId != 4) {
      this.formContactoTelefonos.controls['Extension'].setValue('');
    }

    this.auxTipoTelefono = this.tipoTelefonos.filter(x => {
      if (x.id == tipoTeledonoId) {
        return x.tipo;
      }
    });
    let telefono = {
      id: '',
      activo: true,
      clavePais: this.formContactoTelefonos.get('LadaPais').value,
      claveLada: this.formContactoTelefonos.get('Lada').value || '',
      esPrincipal: true,
      extension: this.formContactoTelefonos.get('Extension').value || '',
      entidadid: '',
      telefono: this.formContactoTelefonos.get('Numero').value,
      tipoTelefono: this.auxTipoTelefono[0]['tipo'],
      tipoTelefonoId: this.formContactoTelefonos.get('TipoTelefono').value,
      Usuario: this.Usuario
    }

    if (this.elementCn != null) {
      telefono['entidadId'] = this.elementCn['id'];
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
          telefono['Action'] = 'C';
          this._ClienteService.crudTelefonContacto(telefono).subscribe(result => {
            if (result != 404) {
              telefono['id'] = result['id'];
              this.Telefonos.push(telefono);
              this.lengthCnT = this.Telefonos.length;
              this.cancelarContactoTelefono();
              this.rowsCnT = this.changePageCnT({ page: this.pageCnT, itemsPerPage: this.itemsPerPage });
              this.popToast('success', 'Teléfonos Contacto', 'Se agrego con éxito el nuevo teléfono del contacto');
            }
            else {
              this.popToast('error', 'Teléfonos Contacto', 'Algo salio mal, no se pudo registrar el nuevo teléfono del contacto.');
              return;
            }
          });
        }
        else {
          this.popToast('info', 'Teléfonos Contacto', 'El Teléfono que intenta registrar ya existe.');
          return;
        }
      }
      else {
        var idTelefono = this.Telefonos[this.indexContactoTelefonos]['id'];
        telefono.id = idTelefono;
        var exist = this.Telefonos.find(element => {
          if (element.telefono == telefono.telefono
            && element.extension == telefono.extension
            && element.id != idTelefono) {
            return true;
          } else {
            return false;
          }
        });

        if (!exist) {
          telefono['Action'] = 'U';
          this._ClienteService.crudTelefonContacto(telefono).subscribe(result => {
            if (result != 404) {
              this.Telefonos[this.indexContactoTelefonos] = telefono;
              this.popToast('success', 'Teléfono Contacto', 'Se actualizo con éxito el teléfono del contacto');
              this.elementCnT = null;
              this.cancelarContactoTelefono();
              this.rowsCnT = this.changePageCnT({ page: this.pageCnT, itemsPerPage: this.itemsPerPage });
            }
            else {
              this.popToast('error', 'Teléfonos Contacto', 'Algo salio mal, no se pudo actualizar el nuevo teléfono del contacto.');
              return;
            }
          })
        } else {
          this.popToast('info', 'Contacto Teléfonos', 'El Teléfono que intenta actualizar ya existe.');
          return;
        }
      }
    }
    else {
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
          telefono['idAux'] = this.idAuxCnT;
          this.Telefonos.push(telefono);
          this.idAuxCnT++;
          this.lengthCnT = this.Telefonos.length;
        }
        else {
          this.popToast('info', 'Contacto Teléfonos', 'El Teléfono que intenta registrar ya existe.');
          return;
        }

      }
      else {
        var idTelefono = this.Telefonos[this.indexContactoTelefonos]['idAux'];
        telefono['idAux'] = idTelefono;
        var exist = this.Telefonos.find(element => {
          if (element['telefono'] == telefono['telefono']
            && element['extension'] == telefono['extension']
            && element['idAux'] != idTelefono) {
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
  }

  UdContactoTelefono() {

    this.addContactoTelefono = true;
    this.EditContactoTelefono = true;
    this.formContactoTelefonos.controls['TipoTelefono'].setValue(this.Telefonos[this.indexContactoTelefonos]['tipoTelefonoId']);
    this.formContactoTelefonos.controls['LadaPais'].setValue(this.Telefonos[this.indexContactoTelefonos]['clavePais']);
    this.formContactoTelefonos.controls['Lada'].setValue(this.Telefonos[this.indexContactoTelefonos]['claveLada']);
    this.formContactoTelefonos.controls['Numero'].setValue(this.Telefonos[this.indexContactoTelefonos]['telefono']);
    this.formContactoTelefonos.controls['Extension'].setValue(this.Telefonos[this.indexContactoTelefonos]['extension']);
    this.getTipoTelefonoContacto();
  }

  sweetAlertEliminarTelefonoC() {
    swal({
      title: 'Estas seguro? ',
      text: 'Para continuar es necesario confirmar la eliminación del teléfono',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'No, Cancelar',
      closeOnConfirm: true,
      closeOnCancel: true,
      showLoaderOnConfirm: true
    }, (isConfirm) => {
      window.onkeydown = null;
      window.onfocus = null;
      if (isConfirm) {
        if (this.elementCn) {
          this.elementCnT['Action'] = 'D';
          this._ClienteService.crudTelefonContacto(this.elementCnT).subscribe(result => {
            if (result == 200) {
              this.Telefonos.splice(this.indexContactoTelefonos, 1);
              this.rowsCnT = this.changePageCnT({ page: this.pageCnT, itemsPerPage: this.itemsPerPage });
              this.popToast('success','Teléfonos Contacto', 'Se elimino correctamente el teléfono.');
            } else {
              this.popToast('error','Teléfonos Contacto', 'Algo salio mal al intertar eliminar los registros.');
            }
          });
        }
        else {
          this.Telefonos.splice(this.indexContactoTelefonos, 1);
          this.elementCnT = null;
          this.lengthCnT = this.Telefonos.length;
          this.rowsCnT = this.changePageCnT({ page: this.pageCnT, itemsPerPage: this.itemsPerPage });
          this.popToast('success','Teléfono Contacto', 'Se elimino corectamente le correo eléctronico.');
        }
      }
    });
  }


  cancelarContactoTelefono() {
    this.addContactoTelefono = false;
    this.formContactoTelefonos.reset();
    this.EditContactoTelefono = false;
    this.formContactoTelefonos.controls['LadaPais'].setValue(52)
  }
  //#endregion

  //#region ACCIONES PARA CORREO ELECTRONICO
  AddContactoCorreo() {
    let correo = {
      id: '',
      email: this.formContactoCorreo.get('Email').value,
      esPrincipal: false,
      usuario: this.Usuario,
      entidadId: '',
    }

    if (this.elementCn) {
      correo['entidadId'] = this.elementCn['id'];
      if (!this.EditContactoCorreo) {
        let exist = this.Emails.find(element => {
          if (element.email == correo.email)
            return true;
          else
            return false;
        });

        if (!exist) {
          correo['Action'] = 'C'
          this._ClienteService.crudCorreoContacto(correo).subscribe(result => {
            if (result != 404) {
              correo['id'] = result['id'];
              this.Emails.push(correo);
              this.lengthCnC = this.Emails.length;
              this.rowsCnC = this.changePageCnC({ page: this.pageCnC, itemsPerPage: this.itemsPerPage });
              this.popToast('success', 'Correo Eléctronico', 'Se agrego con éxito el nuevo correo eléctronico del contacto.');
              this.cancelarContactoCorreo();
            }
            else {
              this.popToast('error', 'Correo Eléctronico', 'Algo salio mal, no se puedo registrar el correo eléctronico del contacto.');
              return;
            }
          });
        }
        else {
          this.popToast('info', 'Correo Eléctronico', 'El correo eléctronico que intenta registrar ya existe. ');
          return;
        }
      }
      else {
        var idEmail = this.Emails[this.indexContactoCorreos]['id'];
        correo['id'] = idEmail;
        let exist = this.Emails.find(element => {
          if (element['email'] == correo['email']
            && element['id'] != idEmail) {
            return true;
          } else {
            return false;
          }
        });

        if (!exist) {
          correo['Action'] = 'U';
          this._ClienteService.crudCorreoContacto(correo).subscribe(result => {
            if (result != 404) {
              this.Emails[this.indexContactoCorreos] = correo;
              this.popToast('success', 'Correo Eléctronico', 'Se actualizo con éxito el correo eléctronico del contacto')
              this.elementCnC = null;
              this.rowsCnC = this.changePageCnC({ page: this.pageCnC, itemsPerPage: this.itemsPerPage });
              this.cancelarContactoCorreo();
            }
            else {
              this.popToast('error', 'Correo Eléctronico', 'Algo salio mal, no se pudo actualizar el correo eléctronico de contacto')
            }
          });
        }
        else {
          this.popToast('info', 'Correo Eléctronico', 'El correo eléctronico que intenta actualizar ya existe.');
          return;
        }
      }
    }
    else{
      if (!this.EditContactoCorreo) {
        var exist = this.Emails.find(element => {
          if (element['email'] == correo['email']) {
            return true;
          }
          else {
            return false;
          }
        });
        if (!exist) {
          correo['idAux'] = this.idAuxCnC;
          this.Emails.push(correo);
          this.idAuxCnC++;
          this.lengthCnC = this.Emails.length;
        }
        else {
          this.popToast('info', 'Correo Electrónico', 'El correo electrónico que intenta registrar ya existe.');
          return;
        }

      } else {
        var idEmail = this.Emails[this.indexContactoCorreos]['idAux'];
        correo['idAux'] = idEmail;
        var exist = this.Emails.find(element => {
          if (element['email'] == correo['email']
            && element['idAux'] != idEmail) {
            return true;
          }
          else {
            return false;
          }
        });
        if (!exist) {
          this.Emails[this.indexContactoCorreos] = correo;
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


  }

  UdContactoCorreo() {

    this.addContactoCorreo = true;
    this.EditContactoCorreo = true; 11
    this.formContactoCorreo.controls['Email'].setValue(this.Emails[this.indexContactoCorreos]['email']);
  }

  sweetAlertEliminarCorreoC() {
    swal({
      title: 'Estas seguro? ',
      text: 'Para continuar es necesario confirmar la eliminación del correo eléctronico',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'No, Cancelar',
      closeOnConfirm: true,
      closeOnCancel: true,
      showLoaderOnConfirm: true
    }, (isConfirm) => {
      window.onkeydown = null;
      window.onfocus = null;
      if (isConfirm) {
        window.onkeydown = null;
        window.onfocus = null;
        if (this.elementCn) {
          this.elementCnC['Action'] = 'D';
          this._ClienteService.crudCorreoContacto(this.elementCnC).subscribe(result => {
            if (result == 200) {
              this.Emails.splice(this.indexContactoCorreos, 1);
              this.rowsCnC = this.changePageCnC({ page: this.pageCnC, itemsPerPage: this.itemsPerPage });
              this.popToast('success','Correo Eléctronico Contacto', 'Se elimino corectamente le correo eléctronico.');
            } else {
              this.popToast('error','Correo Eléctronico Contacto', 'Algo salio mal al intertar eliminar los registros.');
            }
          });
        }
        else {
          this.Emails.splice(this.indexContactoCorreos, 1);
          this.elementCnC = null;
          this.lengthCnC = this.Telefonos.length;
          this.rowsCnC = this.changePageCnC({ page: this.pageCnT, itemsPerPage: this.itemsPerPage });
          this.popToast('success','Correo Eléctronico Contacto', 'Se elimino corectamente le correo eléctronico.');
        }
      }
    });
  }

  cancelarContactoCorreo() {
    this.addContactoCorreo = false;
    this.formContactoCorreo.reset();
    this.EditContactoCorreo = false;
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

  onCellClickCnT(data: any) {

    if (!this.EditContactoTelefono) {

      data['selectedCnT'] ? data['selectedCnT'] = false : data['selectedCnT'] = true;
      this.elementCnT = data;

      if (this.elementCn) {
        this.indexContactoTelefonos = this.Telefonos.findIndex(x => x['id'] === data['id']);
      }
      else {
        this.indexContactoTelefonos = this.Telefonos.findIndex(x => x['idAux'] === data['idAux']);
      }

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

  onCellClickCnC(data: any) {
    if (!this.EditContactoCorreo) {
      data['selectedCnC'] ? data['selectedCnC'] = false : data['selectedCnC'] = true;
      this.elementCnC = data;

      if (this.elementCn) {
        this.indexContactoCorreos = this.Emails.findIndex(x => x['id'] === data['id']);
      }
      else {
        this.indexContactoCorreos = this.Emails.findIndex(x => x['idAux'] === data['idAux']);
      }

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
