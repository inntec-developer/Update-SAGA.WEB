import { UploadImgsComponent } from '../upload-imgs/upload-imgs.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminServiceService } from '../../../service/AdminServicios/admin-service.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ApiConection } from '../../../service';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';
import { SettingsService } from '../../../core/settings/settings.service';
import { ExcelService } from '../../../service/ExcelService/excel.service';
import { switchAll } from 'rxjs/operators';
const swal = require('sweetalert');
@Component({
  selector: 'app-add-grupo',
  templateUrl: './add-grupo.component.html',
  styleUrls: ['./add-grupo.component.scss'],
  providers:[ AdminServiceService ]
})
export class AddGrupoComponent implements OnInit {

  // @ViewChild('uploadImg') someInput: UploadImgsComponent;
  // @ViewChild('staticModal') modal;
  // @ViewChild('ModalMsg') modalMsg;
    // scroll
    disabled = false;
    compact = false;
    invertX = false;
    invertY = false;
    shown = 'hover';

      // Varaibles del paginador
  public page = 1;
  public itemsPerPage = 20;
  public maxSize = 5;
  public numPages = 1;
  public length = 0;
  formGrupos: FormGroup;
  Grupos: Array<any> = [];
  editing = {};
  editingRow = {};
  name: string;
  rowAux: any = 0;
  dataRow = [];
  dataRowIndex: any = 0;
  UsuariosList = [];
  verMsj = false;
  ListTipos = [];
  filteredData = [];
  tipoUsuario = this.settings.user['tipoUsuarioId'];
agregar = false;
  public rows: Array<any> = [];
  public columns: Array<any> = [
    { title: 'Nombre', className: 'text-center', name: 'nombre', filtering: { filterString: '', placeholder: 'Nombre' } },
    { title: 'Descripción', className: 'text-center', name: 'descripcion', filtering: { filterString: '', placeholder: 'Descripción' } },
    { title: 'Tipo Grupo', className: 'text-center', name: 'tipoGrupo', filtering: { filterString: '', placeholder: 'Tipo Grupo' } },
    { title: 'Usuario Alta', className: 'text-center', name: 'usuarioAlta', filtering: { filterString: '', placeholder: 'Usuario ALta' } },
    { title: 'Activo/Inactivo', className: 'text-center', name: 'activo', filtering: { filterString: '', placeholder: '1 / 0' } },
  ];
  public config: any = {
    paging: true,
    filtering: { filterString: '' },
    className: ['table-hover mb-0']
  };
  constructor(
    public fb: FormBuilder,
    private service: AdminServiceService,
    private toasterService: ToasterService,
    private settings: SettingsService,
    private excelService: ExcelService) {
  }

  ngOnInit() {
    this.getGrupos();
    this.GetTipos();
    // this.formGrupos.controls['Nombre'].reset();
    // this.formGrupos.controls['Descripcion'].reset();
  }

  iniciarForms() {
    this.formGrupos = this.fb.group({
      Nombre: ['', [Validators.required]],
      Descripcion: '',
      Activo: 1,
      slcTipos: ['', [Validators.required]],
      });
  }
  public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }) {

    if (config.filtering) {
      (<any>Object).assign(this.config.filtering, config.filtering);
    }
    this.rows = this.Grupos;
    const filteredData = this.changeFilter(this.rows, this.config);
    this.rows = page && config.paging ? this.changePage(page, filteredData) : filteredData;
    this.length = filteredData.length;

  }
  public changePage(page: any, data: Array<any> = this.Grupos): Array<any> {
    const start = (page.page - 1) * page.itemsPerPage;
    const end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeFilter(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columns.forEach((column: any) => {
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

  onSelect(row, rowIndex) {
    row.selected ? row.selected = false : row.selected = true;

    if (this.dataRow.length === 0) {
      this.dataRow = row;
    } else if (row.selected && this.dataRow !== []) {
      const aux = row;
      row = this.dataRow;
      row.selected = false;
      aux.selected = true;
      this.dataRow = aux;
    } else {
      this.dataRow = [];
    }
  }
  CrearURL(idG: any) {
    this.name = idG;
  }
  updateValue($event, cell, rowIndex, g) {
    g.selected = true;
    if ($event.target.value !== '') {
        g[cell] = $event.target.value;
      }
      this.editing[rowIndex + '-' + cell] = false;
      this.editingRow[rowIndex + '-save'] = true;
  }

  UpdateActivo(value) {
    if (this.dataRow) {
      this.dataRow['activo'] = value;
      this.service.UpdateActivo(this.dataRow).subscribe(data => {
        if (data === 200) {
          this.rows[this.dataRowIndex]['activo'] = value;
          this.onChangeTable(this.config);
          this.popToast('success', 'Actualizar Datos', 'Los datos se actualizaron con éxito');
        } else {
          this.popToast('error', 'Actualizar Datos', 'Ocurrió un error al intentar actualizar datos');
        }
      });
   }
  }

  UpdateTipo(event, cell, rowIndex, g) {
    let aux;

    aux = this.ListTipos.find(nt => nt.id === event.target.value);
    g['tipoGrupo'] = aux.tipo;
    g['tipoGrupoId'] = event.target.value;
    this.editing[rowIndex + '-' + 'tipoGrupo'] = false;
    this.editingRow[rowIndex + '-save'] = true;
    this.Grupos = [...this.Grupos];
  }

  closeModal() {
    // this.someInput.removeItem();
    // this.someInput.selectedFile = null;

    // this.modal.hide();
  }

  getGrupos() {
    this.service.getGrupos().subscribe( e => {
        this.Grupos = e;
        this.Grupos.forEach(item => {
          item.fotoAux = item.foto;
          item.selected = false;
          item.activo = item.activo === true ? 1 : 0;
        });

        this.onChangeTable(this.config);
      });
  }

  GetUsuarios(GrupoId : any) {
    this.service.GetUsuarioByGrupo(GrupoId)
    .subscribe(
      e => {
        this.UsuariosList = e;
        this.UsuariosList.forEach(item => {
          item.fotoAux = ApiConection.ServiceUrlFotoUser + item.clave + '.jpg';
        });
      });
  }

  saveData() {
    const grupo = {
      Nombre: this.formGrupos.controls['Nombre'].value,
      Descripcion: this.formGrupos.controls['Descripcion'].value,
      Activo: this.formGrupos.controls['Activo'].value,
      TipoGrupoId: this.formGrupos.controls['slcTipos'].value,
      Foto: 'utilerias/img/user/WorkTeam.jpg'
    };

    this.service.addGrupos(grupo)
    .subscribe( data => {
      if (data === 201) {
        this.formGrupos.controls['Nombre'].reset();
        this.formGrupos.controls['Descripcion'].reset();
        this.agregar = false;
        this.getGrupos();
        this.onChangeTable(this.config);
        this.clearfilters();
        this.popToast('success', 'Actualizar Datos', 'Los datos se agregaron con éxito');
      } else {
        this.agregar = true;
        this.popToast('error', 'Actualizar Datos', 'Ocurrió un error al intentar agregar datos');
      }
    });
  }

  updateFoto() {
    // if(this.someInput.StatusCode === 201 || this.someInput.StatusCode === 500) {
    //   this.closeModal();
    //     this.Grupos[this.rowAux]['foto'] = 'utilerias/img/user/' +  this.someInput.name;
    //     this.Grupos[this.rowAux]['fotoAux'] = this.someInput.image.src;
    //     this.Grupos = [...this.Grupos];
    // }
  }

  updateGrupo(row, rowIndex) {
    const gu = row;
      this.service.UpdateGrupo(gu)
        .subscribe( data => {
          if(data === 201) {
            this.popToast('success', 'Actualizar Datos', 'Los datos se actualizaron con éxito');
            this.editingRow[rowIndex + '-save'] = false;
            this.onChangeTable(this.config);
          } else {
            this.popToast('error', 'Actualizar Datos', 'Ocurrió un error al intentar actualizar datos');
          }
      });
  }

  DeleteGrupo() {
    swal({
      title: '¿ESTÁS SEGURO?',
      text: '¡Los datos del grupo se borrarán de la base de datos ',
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
        const g = this.dataRow;
        this.service.DeleteGrupo(g).subscribe( data => {
          if(data === 201) {
            this.popToast('success', 'Actualizar Datos', 'Los datos se actualizaron con éxito');
            this.refreshTable();
          } else {
            this.popToast('error', 'Actualizar Datos', 'Ocurrió un error al intentar actualizar datos');
          }
        });
      } else {
        swal('ACTUALIZAR DATOS!', 'No se realizó ningun cambio', 'warning');
     }
    });
  }

  GetTipos() {
    this.service.getTipos()
      .subscribe(
        e => {
          this.ListTipos = e;
        });
  }
  public clearfilters() {
    this.columns.forEach(element => {
        element.filtering.filterString = '';
        (<HTMLInputElement>document.getElementById(element.name + 'G')).value = '';
    });
    this.onChangeTable(this.config);
  }
  refreshTable() {
    this.columns.forEach(element => {
        element.filtering.filterString = '';
        (<HTMLInputElement>document.getElementById(element.name + 'G')).value = '';
    });
    this.rowAux = [];
    this.getGrupos();
  }
  exportAsXLSX() {
    if (this.Grupos.length > 0) {
      const aux = [];
      this.Grupos.forEach(row => {
        aux.push({
          NOMBRE: row.nombre,
          DESCRIPCION: row.descripcion,
          'TIPO GRUPO': row.tipoGrupo,
          'USUARIO ALTA': row.usuarioAlta,
          ACTIVO: row.activo === 1 ? 'Activo' : 'Inactivo'
        });
      });

      this.excelService.exportAsExcelFile(aux, 'Reporte_Grupos');
    }
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
  
  popToast(type, title, body) {
    var toast: Toast = {
      type: type,
      title: title,
      timeout: 4000,
      body: body    
    }
    this.toasterService.pop(toast);

  }

}
