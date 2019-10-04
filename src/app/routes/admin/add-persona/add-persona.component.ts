
import { Component, OnInit, ViewChild } from '@angular/core';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { DatePipe } from '@angular/common';
import { AdminServiceService } from '../../../service/AdminServicios/admin-service.service';
import { ApiConection } from '../../../service/api-conection.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { SettingsService } from '../../../core/settings/settings.service';
import { UploadImgsComponent } from '../upload-imgs/upload-imgs.component';
import { ExcelService } from '../../../service/ExcelService/excel.service';

const swal = require('sweetalert');
@Component({
  selector: 'app-add-persona',
  templateUrl: './add-persona.component.html',
  styleUrls: ['./add-persona.component.scss'],
  providers: [AdminServiceService, DatePipe]

})
export class AddPersonaComponent implements OnInit {
  public errorMessage: any;
  public showFilterRow: boolean;
  public clearFilter = false;
  selected = false;
  public foto: string;

  // Varaibles del paginador
  public page = 1;
  public itemsPerPage = 20;
  public maxSize = 5;
  public numPages = 1;
  public length = 0;

    // scroll
    disabled = false;
    compact = false;
    invertX = false;
    invertY = false;
    shown = 'hover';

  Users: Array<any> = [];
  ListDepas: Array<any> = [];
  ListTipos: Array<any> = [];
  Lideres = [];
  Oficina = [];
  editing = {};
  editingRow = {};
  bandera = false;
  rowAux: any = [];
  name: string;
  filteredData: Array<any> = [];
  dataRowIndex: any = 0;
  dataRow: any;
  editar = false;

  tipoUsuario = this.settings.user['tipoUsuarioId'];

  @ViewChild('uploadImg') someInput: UploadImgsComponent;
  @ViewChild('staticModal') modal;

  public rows: Array<any> = [];
  public columns: Array<any> = [
    { title: 'Clave', className: 'text-center', name: 'clave', filtering: { filterString: '', placeholder: 'Clave' } },
    { title: 'Alias', className: 'text-center', name: 'usuario', filtering: { filterString: '', placeholder: 'Alias' } },
    { title: 'Nombre', className: 'text-center', name: 'nombre', filtering: { filterString: '', placeholder: 'Nombre' } },
    { title: 'Apellido Pat.', className: 'text-center', name: 'apellidoPaterno',
    filtering: { filterString: '', placeholder: 'Apellido Pat.' } },
    { title: 'Apellido Mat', className: 'text-center', name: 'apellidoMaterno',
    filtering: { filterString: '', placeholder: 'Apellido Mat.' } },
    { title: 'Email', className: 'text-center', name: 'email', filtering: { filterString: '', placeholder: 'Email' } },
    { title: 'Depto.', className: 'text-center', name: 'departamento', filtering: { filterString: '', placeholder: 'Depto.' } },
    { title: 'Tipo', className: 'text-center', name: 'tipoUsuario', filtering: { filterString: '', placeholder: 'Tipo' } },
    { title: 'Asignado a:', className: 'text-center', name: 'nombreLider', filtering: { filterString: '', placeholder: 'Lider' } },
    { title: 'Ofc / Suc.', className: 'text-center', name: 'oficina', filtering: { filterString: '', placeholder: 'Ofc / Suc' } },
    { title: 'Activo/Inactivo', className: 'text-center', name: 'activo', filtering: { filterString: '', placeholder: '1 / 0' } },
  ];
    /**
  * configuracion para mensajes de acciones.
  */
 toaster: any;
 toasterConfig: any;
 toasterconfig: ToasterConfig = new ToasterConfig({
   positionClass: 'toast-bottom-right',
   limit: 7,
   tapToDismiss: false,
   showCloseButton: true,
   mouseoverTimerStop: true,
   preventDuplicates: true,
 });

  public config: any = {
    paging: true,
    filtering: { filterString: '' },
    className: ['table-hover mb-0']
  };
  constructor(
    private service: AdminServiceService,
    public fb: FormBuilder,
    public dialog: MatDialog,
    private toasterService: ToasterService,
    private settings: SettingsService,
    private excelService: ExcelService,
    private pipe: DatePipe) {
  }

  ngOnInit() {
    this.getUsuarios();
    this.GetCatalogos();
  }

  public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }) {

    if (config.filtering) {
      (<any>Object).assign(this.config.filtering, config.filtering);
    }
    this.rows = this.Users;
    const filteredData = this.changeFilter(this.rows, this.config);
    this.rows = page && config.paging ? this.changePage(page, filteredData) : filteredData;
    this.length = filteredData.length;

  }
  public changePage(page: any, data: Array<any> = this.Users): Array<any> {
    const start = (page.page - 1) * page.itemsPerPage;
    const end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeFilter(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columns.forEach((column: any) => {
      this.clearFilter = true;
      if (column.filtering.filterString !== '') {
        filteredData = filteredData.filter((item: any) => {
          if (item[column.name] != null) {
            return item[column.name].toString().toLowerCase().match(column.filtering.filterString.toLowerCase());
          }
        });
      }
    });
    return filteredData;
  }

  public clearfilters() {
    this.columns.forEach(element => {
        element.filtering.filterString = '';
        (<HTMLInputElement>document.getElementById(element.name)).value = '';
    });
    this.onChangeTable(this.config);
  }

  Borrar() {
    if(this.rowAux) {
      swal({
        title: '¿ESTÁS SEGURO?',
        text: '¡Los datos del usuario' + this.rowAux.nombre + ' ' +
                this.rowAux.apellidoPaterno + ' ' + this.rowAux.apellidoMaterno + ' se borrarán de la base de datos ',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#21a240',
        confirmButtonText: '¡Si, Borrar datos!',
        cancelButtonColor: 'red',
        cancelButtonText: '¡No, cancelar!',
        closeOnConfirm: true,
        closeOnCancel: true
      }, (isConfirm) => {
        window.onkeydown = null;
        window.onfocus = null;
        if (isConfirm) {
          this.service.DeleteUsuario(this.rowAux.entidadId).subscribe(data => {
            if (data === 200) {
              this.popToast('success', 'Actualizar Datos', 'Los datos de usuario se borraron con éxito');
              this.refreshTable();
            } else {
              this.popToast('error', 'Actualizar Datos', 'Ocurrió un error al intentar borrar datos. Esto se debe a que el usuario ya cuenta con algun movimiento en su cuenta');
            }
          });
        } else {
          this.popToast('error', 'Actualizar Datos', 'No se realizó ningun cambio');
        }
      });
    }
  }
  public onCellClick(data: any): any {
    data.selected ? data.selected = false : data.selected = true;

    if (this.rowAux.length == 0) {
      this.rowAux = data;
    }
    else if (data.selected && this.rowAux != []) {
      var aux = data;
      data = this.rowAux;
      data.selected = false;
      aux.selected = true;
      this.rowAux = aux;
    }
  }
  refreshTable() {
    this.columns.forEach(element => {
        element.filtering.filterString = '';
        (<HTMLInputElement>document.getElementById(element.name)).value = '';
    });
    this.rowAux = [];
    this.getUsuarios();
    this.GetCatalogos();
  }

  CrearURL(idP: any) {
    this.name = idP;
  }

  SendEmail(user: any) {
    let u = {
      EntidadId: user.entidadId,
      Clave: user.clave,
      Usuario: user.usuario,
      Nombre: user.nombre,
      ApellidoPaterno: user.apellidoPaterno,
      ApellidoMaterno: user.apellidoMaterno,
      DepartamentoId: user.departamentoId,
      TipoUsuarioId: user.tipoUsuarioId,
      OficinaId: user.oficinaId,
      Foto: user.foto,
      Email: user.email
    }

    this.service.SendEmailRegister(u).subscribe(res => {
      if (res === 201) {
        this.popToast('success', 'Envío de correo', 'El correo se envió con éxito');
      } else {
        this.popToast('error', 'Envío de correo', 'Ocurrio un error al intentar enviar correo');
      }
    });

  }

  closeModal() {
    this.someInput.removeItem();
    this.someInput.selectedFile = null;

    this.modal.hide();
  }

  updateValue(event: any, cell: any, rowIndex: any, entidadId: any) {
    var aux = null;
    var ObjertIndex = this.Users.findIndex(u => u.entidadId === entidadId);
    if (cell === 'tipoUsuarioId') {
      aux = this.ListTipos.find(nt => nt.id == event.target.value);
      this.Users[ObjertIndex]['tipoUsuario'] = aux.tipo;
      this.Users[ObjertIndex]['tipoUsuarioId'] = event.target.value;
      this.editing[rowIndex + '-' + 'tipoUsuario'] = false;
    } else if (cell === 'departamentoId') {
      aux = this.ListDepas.find(nd => nd.id == event.target.value);
      this.Users[ObjertIndex]['departamento'] = aux.nombre;
      this.Users[ObjertIndex]['departamentoId'] = event.target.value;
      this.editing[rowIndex + '-' + 'departamento'] = false;
    } else if (cell === 'lider') {
      aux = this.Lideres.find(nd => nd.liderId == event.target.value);
      this.Users[ObjertIndex]['nombreLider'] = aux.nombreLider;
      this.Users[ObjertIndex]['liderId'] = event.target.value;
      this.editing[rowIndex + '-' + 'lider'] = false;
    } else if (cell === 'oficina') {
      aux = this.Oficina.find(nd => nd.id == event.target.value);
      this.Users[ObjertIndex]['oficina'] = aux.nombre;
      this.Users[ObjertIndex]['oficinaId'] = event.target.value;
      this.editing[rowIndex + '-' + 'oficina'] = false;
    } else if (event.target.value !== '') {
      this.Users[ObjertIndex][cell] = event.target.value;
    }

    this.editing[rowIndex + '-' + cell] = false;
    this.editingRow[rowIndex + '-user'] = true;
    this.Users = [...this.Users];
  }

  updateUser(user: any, rowIndex: any) {
    let u = {
      EntidadId: user.entidadId,
      Clave: user.clave,
      Usuario: user.usuario,
      Nombre: user.nombre,
      ApellidoPaterno: user.apellidoPaterno,
      ApellidoMaterno: user.apellidoMaterno,
      DepartamentoId: user.departamentoId,
      OficinaId: user.oficinaId,
      TipoUsuarioId: user.tipoUsuarioId,
      Foto: user.foto,
      liderId: user.liderId

    };
    if (user.entidadId === this.settings.user['id']) {
      this.settings.user['usuario'] = user.usuario;
    }

    this.service.UpdateUsuario(u)
      .subscribe(data => {
        if (data === 201) {
          this.popToast('success', 'Actualizar Datos', 'Los datos se actualizaron con éxito');
          this.editingRow[rowIndex + '-user'] = false;
          this.onChangeTable(this.config);
        } else {
          this.popToast('error', 'Actualizar Datos', 'Ocurrio un error al intentar actualizar datos');
        }

      });
  }

  Actualizar(value) {
    if(this.rowAux) {
      this.service.UDActivoUsers(this.rowAux.entidadId, value)
        .subscribe(data => {
          if (data === 201) {
            this.popToast('success', 'Actualizar Datos', 'Los datos se actualizaron con éxito');
            value ? this.rowAux.activo = 1 : this.rowAux.activo = 0;
            this.onChangeTable(this.config);
          } else {
            this.popToast('error', 'Actualizar Datos', 'Ocurrió un error al intentar actualizar datos');
          }
        });
    }
  }

  getUsuarios() {
    this.service.getPersonas(this.settings.user['id']).subscribe(e => {
      this.Users = e;
      // this.Users.forEach(item => {
      //   item.foto = ApiConection.ServiceUrlFotoUser + item.clave + '.jpg';
      //   // item.fotoAux = ApiConection.ServiceUrlFotoUser + item.clave + '.jpg';
      //   item.selected = false;
      // });
      this.onChangeTable(this.config);
    });
  }

  GetCatalogos() {
    this.service.getDepas().subscribe(e => {
      this.ListDepas = e;
    })
    this.service.getTipos().subscribe(e => {
      this.ListTipos = e;
    });
    this.service.GetLideres().subscribe(data => {
      this.Lideres = data;
    });
    this.service.GetOficinas().subscribe(data => {
      this.Oficina = data;
    });
  }

  errorImg(entidadId) {
    const index = this.rows.findIndex(u => u.entidadId === entidadId);
    this.rows[index]['foto'] = '/assets/img/user/default.jpg';
  }
  exportAsXLSX() {
    if (this.Users.length > 0) {
      const aux = [];
      this.Users.forEach(row => {
        aux.push({
          CLAVE: row.clave.toString(),
          ALIAS: row.usuario,
          NOMBRE: row.nombre,
          'APELLIDO PATERNO': row.apellidoPaterno,
          'APELLIDO MATERNO': row.apellidoMaterno,
          EMAIL: row.email,
          DEPARTAMENTO: row.departamento,
          'TIPO USUARIO': row.tipoUsuario,
          'ASIGNADO A': row.nombreLider,
          'OFC/SUC': row.oficina,
          ACTIVO: row.activo === 1 ? 'Activo' : 'Inactivo'
        });
      });

      this.excelService.exportAsExcelFile(aux, 'Reporte_Usuarios');
    }
  }


  popToast(type: any, title: any, body: any) {
    const toast: Toast = {
      type: type,
      title: title,
      timeout: 4000,
      body: body
    }
    this.toasterService.pop(toast);

  }
}


