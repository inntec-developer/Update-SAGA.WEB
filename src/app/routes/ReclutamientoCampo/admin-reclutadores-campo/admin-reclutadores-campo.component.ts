import { Component, OnInit } from '@angular/core';
import { ToasterConfig, ToasterService, Toast } from 'angular2-toaster';
import { AdminServiceService } from '../../../service/AdminServicios/admin-service.service';
import { SettingsService } from '../../../core/settings/settings.service';
import { ExcelService } from '../../../service/ExcelService/excel.service';
import { DatePipe } from '@angular/common';
import { ReclutamientoCampoService } from '../../../service/ReclutamientoCampo/reclutamiento-campo.service';

@Component({
  selector: 'app-admin-reclutadores-campo',
  templateUrl: './admin-reclutadores-campo.component.html',
  styleUrls: ['./admin-reclutadores-campo.component.scss'],
  providers: [AdminServiceService, DatePipe]
})
export class AdminReclutadoresCampoComponent implements OnInit {
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

   editing = {};
  editingRow = {};
  reclutadores: Array<any> = [];
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
  rowAux: any = [];
  ListDepas: any = [];
  ListTipos: any = [];
  Lideres: any = [];
  Oficina: any = [];
  constructor(private service: AdminServiceService,
    private _serviceCampo: ReclutamientoCampoService,
    private toasterService: ToasterService,
    private settings: SettingsService,
    private excelService: ExcelService,
    private pipe: DatePipe) { }

  ngOnInit() {
    this.GetReclutadoresCampo();
    this.GetCatalogos();
  }
  GetReclutadoresCampo() {
    this._serviceCampo.GetDtosReclutadoresCampo().subscribe(e => {
      this.reclutadores = e;
      this.onChangeTable(this.config);
    });
  }
  GetCatalogos() {
    this.service.getDepas().subscribe(e => {
      this.ListDepas = e;
    });
    this.service.GetLideres().subscribe(data => {
      this.Lideres = data;
    });
    this.service.GetOficinas().subscribe(data => {
      this.Oficina = data;
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
  updateValue(event: any, cell: any, rowIndex: any, entidadId: any) {
    let aux = null;
    const ObjectIndex = this.reclutadores.findIndex(u => u.entidadId === entidadId);
    if (cell === 'departamentoId') {
      aux = this.ListDepas.find(nd => nd.id === event.target.value);
      this.reclutadores[ObjectIndex]['departamento'] = aux.nombre;
      this.reclutadores[ObjectIndex]['departamentoId'] = event.target.value;
      this.editing[rowIndex + '-' + 'departamento'] = false;
    } else if (cell === 'lider') {
      aux = this.Lideres.find(nd => nd.liderId === event.target.value);
      this.reclutadores[ObjectIndex]['nombreLider'] = aux.nombreLider;
      this.reclutadores[ObjectIndex]['liderId'] = event.target.value;
      this.editing[rowIndex + '-' + 'lider'] = false;
    } else if (cell === 'oficina') {
      aux = this.Oficina.find(nd => nd.id === event.target.value);
      this.reclutadores[ObjectIndex]['oficina'] = aux.nombre;
      this.reclutadores[ObjectIndex]['oficinaId'] = event.target.value;
      this.editing[rowIndex + '-' + 'oficina'] = false;
    } else if (event.target.value !== '') {
      this.reclutadores[ObjectIndex][cell] = event.target.value;
    }

    this.editing[rowIndex + '-' + cell] = false;
    this.editingRow[rowIndex + '-user'] = true;
    this.reclutadores = [...this.reclutadores];
  }
  updateUser(user: any, rowIndex: any) {
    const u = {
      EntidadId: user.entidadId,
      Clave: user.clave,
      Usuario: user.usuario,
      Nombre: user.nombre,
      ApellidoPaterno: user.apellidoPaterno,
      ApellidoMaterno: user.apellidoMaterno,
      DepartamentoId: user.departamentoId,
      OficinaId: user.oficinaId,
      TipoUsuarioId: 15, // reclutador de campo
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
  public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }) {

    if (config.filtering) {
      (<any>Object).assign(this.config.filtering, config.filtering);
    }
    this.rows = this.reclutadores;
    const filteredData = this.changeFilter(this.rows, this.config);
    this.rows = page && config.paging ? this.changePage(page, filteredData) : filteredData;
    this.length = filteredData.length;

  }
  public changePage(page: any, data: Array<any> = this.reclutadores): Array<any> {
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
  public onCellClick(data: any): any {
    data.selected ? data.selected = false : data.selected = true;

    if (this.rowAux.length === 0) {
      this.rowAux = data;
    } else if (data.selected && this.rowAux !== []) {
      const aux = data;
      data = this.rowAux;
      data.selected = false;
      aux.selected = true;
      this.rowAux = aux;
    }
  }

  public clearfilters() {
    this.columns.forEach(element => {
        element.filtering.filterString = '';
        (<HTMLInputElement>document.getElementById(element.name)).value = '';
    });
    this.editingRow = {};
    this.editing = {};
    this.onChangeTable(this.config);

  }

  refreshTable() {
    this.columns.forEach(element => {
        element.filtering.filterString = '';
        (<HTMLInputElement>document.getElementById(element.name)).value = '';
    });
    this.rowAux = [];

    this.GetReclutadoresCampo();

  }

  exportAsXLSX() {
    if (this.reclutadores.length > 0) {
      const aux = [];
      this.reclutadores.forEach(row => {
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
  errorImg(entidadId) {
    const index = this.rows.findIndex(u => u.entidadId === entidadId);
    this.rows[index]['foto'] = '/assets/img/user/default.jpg';
  }
  popToast(type: any, title: any, body: any) {
    const toast: Toast = {
      type: type,
      title: title,
      timeout: 4000,
      body: body
    };
    this.toasterService.pop(toast);

  }
}
