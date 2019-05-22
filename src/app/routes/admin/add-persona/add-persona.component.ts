import { Component, OnInit, ViewChild } from '@angular/core';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { AdminServiceService } from '../../../service/AdminServicios/admin-service.service';
import { ApiConection } from '../../../service/api-conection.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { SettingsService } from '../../../core/settings/settings.service';
import { UploadImgsComponent } from '../upload-imgs/upload-imgs.component';

@Component({
  selector: 'app-add-persona',
  templateUrl: './add-persona.component.html',
  styleUrls: ['./add-persona.component.scss'],
  providers: [AdminServiceService]

})
export class AddPersonaComponent implements OnInit {

  public errorMessage: any;
  public showFilterRow: boolean;
  public clearFilter: boolean = false;
  selected: boolean = false;
  public foto: string;



  Users: Array<any> = [];
  ListDepas: Array<any> = [];
  ListTipos: Array<any> = [];
  Lideres = [];
  Oficina = [];
  editing = {};
  bandera = false;
  rowAux: any;
  name: string;
  filteredData: Array<any> = [];
  dataRowIndex: any = 0;
  dataRow: any;

  @ViewChild('uploadImg') someInput: UploadImgsComponent;
  @ViewChild('staticModal') modal;

  constructor(
    private service: AdminServiceService,
    public fb: FormBuilder,
    public dialog: MatDialog,
    private toasterService: ToasterService,
    private settings: SettingsService) {
  }

  ngOnInit() {
    this.getUsuarios();
    this.GetCatalogos();
  }

  public rows: Array<any> = [];
  public columns: Array<any> = [
    { title: 'Foto', sorting: 'desc', className: 'text-success text-center', name: 'foto' },
    { title: 'Clave', sorting: 'desc', className: 'text-success text-center', name: 'clave', filtering: { filterString: '', placeholder: 'Clave' } },
    { title: 'Alias', sorting: 'desc', className: 'text-success text-center', name: 'usuario', filtering: { filterString: '', placeholder: 'Alias' } },
    { title: 'Nombre', sorting: 'desc', className: 'text-success text-center', name: 'nombre', filtering: { filterString: '', placeholder: 'Nombre' } },
    { title: 'Apellido Pat.', sorting: 'desc', className: 'text-success text-center', name: 'apellidoPaterno', filtering: { filterString: '', placeholder: 'Apellido Pat.' } },
    { title: 'Apellido Mat', sorting: 'desc', className: 'text-success text-center', name: 'apellidoMaterno', filtering: { filterString: '', placeholder: 'Apellido Mat.' } },
    { title: 'Email', sorting: 'desc', className: 'text-success text-center', name: 'email', filtering: { filterString: '', placeholder: 'Email' } },
    { title: 'Depto.', sorting: 'desc', className: 'text-success text-center', name: 'departamento', filtering: { filterString: '', placeholder: 'Depto.' } },
    { title: 'Tipo', sorting: 'desc', className: 'text-success text-center', name: 'tipoUsuario', filtering: { filterString: '', placeholder: 'Tipo' } },
    { title: 'Asignado a:', sorting: 'desc', className: 'text-success text-center', name: 'nombreLider', filtering: { filterString: '', placeholder: 'Lider' } },
    { title: 'Ofc / Suc.', sorting: 'desc', className: 'text-success text-center', name: 'oficina', filtering: { filterString: '', placeholder: 'Ofc / Suc' } },
    { title: 'Activo', sorting: 'desc', className: 'text-success text-center', name: 'activo', filtering: { filterString: '', placeholder: 'Activo' } },
  ]

  public config: any = {
    paging: true,
    filtering: { filterString: '' },
    className: ['table-hover mb-0']
  }

  public onChangeTable(config: any): any {

    if (config.filtering) {
      (<any>Object).assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      (<any>Object).assign(this.config.sorting, config.sorting);
    }
    this.rows = this.Users;
    let filteredData = this.changeFilter(this.Users, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = sortedData;
  }

  public changeFilter(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columns.forEach((column: any) => {
      this.clearFilter = true;
      if (column.filtering) {
        this.showFilterRow = true;
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
      this.columns.forEach((column: any) => {
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

  public changeSort(data: any, config: any): any {
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

  public clearfilters() {
    this.columns.forEach(element => {
      if (element.name != 'foto') {
        element.filtering.filterString = '';
        (<HTMLInputElement>document.getElementById(element.name)).value = '';
      }
    });
    this.onChangeTable(this.config);
    if (!this.selected) {
    }
  }

  refreshTable() {
    this.columns.forEach(element => {
      if (element.name != 'foto') {
        element.filtering.filterString = '';
        (<HTMLInputElement>document.getElementById(element.name)).value = '';
      }
    });
    this.getUsuarios();
  }

  CrearURL(idP: any) {
    this.name = idP;
  }


  // updateFoto() {
  //   if (this.someInput.StatusCode == 201 || this.someInput.StatusCode == 500) {
  //     this.closeModal();

  //     this.Users[this.rowAux]['foto'] = 'utilerias/img/user/' + this.someInput.name;
  //     this.Users[this.rowAux]['fotoAux'] = this.someInput.image.src;
  //     this.Users = [...this.Users];

  //   }

  // }

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
      if (res == 201) {
        this.popToast('success', 'Envío de correo', 'El correo se envió con éxito');
      }
      else {
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
    if (cell === "tipoUsuarioId") {
      aux = this.ListTipos.find(nt => nt.id == event.target.value);
      this.Users[ObjertIndex]['tipoUsuario'] = aux.tipo;
      this.Users[ObjertIndex]['tipoUsuarioId'] = event.target.value;
      this.editing[rowIndex + '-' + 'tipoUsuario'] = false;
    }
    else if (cell === "departamentoId") {
      aux = this.ListDepas.find(nd => nd.id == event.target.value);
      this.Users[ObjertIndex]['departamento'] = aux.nombre;
      this.Users[ObjertIndex]['departamentoId'] = event.target.value;
      this.editing[rowIndex + '-' + 'departamento'] = false;
    }
    else if (cell === "lider") {
      aux = this.Lideres.find(nd => nd.liderId == event.target.value);
      this.Users[ObjertIndex]['nombreLider'] = aux.nombreLider;
      this.Users[ObjertIndex]['liderId'] = event.target.value;
      this.editing[rowIndex + '-' + 'lider'] = false;
    }
    else if (cell === 'oficina') {
      aux = this.Oficina.find(nd => nd.id == event.target.value);
      this.Users[ObjertIndex]['oficina'] = aux.nombre;
      this.Users[ObjertIndex]['oficinaId'] = event.target.value;
      this.editing[rowIndex + '-' + 'oficina'] = false;
    }
    else if (event.target.value !== '') {
      this.Users[ObjertIndex][cell] = event.target.value;
    }

    this.editing[rowIndex + '-' + cell] = false;
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

    }
    if (user.entidadId === this.settings.user['id']) {
      this.settings.user['usuario'] = user.usuario;
    }

    this.service.UpdateUsuario(u)
      .subscribe(data => {
        if (data == 201) {
          this.popToast('success', 'Actualizar Datos', 'Los datos se actualizaron con éxito');
        }
        else {
          this.popToast('error', 'Actualizar Datos', 'Ocurrio un error al intentar actualizar datos');
        }

      });
  }

  Actualizar($ev: any, id: any) {
    this.service.UDActivoUsers(id, $ev.target.checked)
      .subscribe(data => {
        if (data == 201) {
          this.popToast('success', 'Actualizar Datos', 'Los datos se actualizaron con éxito');
        }
        else {
          this.popToast('error', 'Actualizar Datos', 'Ocurrió un error al intentar actualizar datos');
        }
      });
  }

  getUsuarios() {
    this.service.getPersonas().subscribe(e => {
      this.Users = e;
      this.Users.forEach(item => {
        item.foto = ApiConection.ServiceUrlFotoUser + item.clave + '.jpg';
        // item.fotoAux = ApiConection.ServiceUrlFotoUser + item.clave + '.jpg';
        item.selected = false;
      });
      this.onChangeTable(this.config)
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
    let index = this.rows.findIndex(u => u.entidadId === entidadId);
    this.rows[index]['foto'] = '/assets/img/user/default.jpg';
  }

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

  popToast(type: any, title: any, body: any) {
    var toast: Toast = {
      type: type,
      title: title,
      timeout: 4000,
      body: body
    }
    this.toasterService.pop(toast);

  }
}


