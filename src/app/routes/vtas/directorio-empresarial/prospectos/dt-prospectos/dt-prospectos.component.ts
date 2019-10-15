import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { ClientesService } from '../../../../../service/clientes/clientes.service';
import { RFCValidator } from './rfc-validation';
import { Router } from '@angular/router';
import { SettingsService } from '../../../../../core/settings/settings.service';

declare var $: any;

@Component({
  selector: 'app-dt-prospectos',
  templateUrl: './dt-prospectos.component.html',
  styleUrls: ['./dt-prospectos.component.scss'],
  providers: [ClientesService]
})
export class DtProspectosComponent implements OnInit {
  //scroll
  public disabled = false;
  public compact = false;
  public invertX = false;
  public invertY = false;
  public shown = 'hover';
/* Configuración de tabla */
public rows: Array<any> = [];
public columns: Array<any> = [
  { title: 'Nombre Comercial', sorting: 'desc', className: 'text-success text-center', name: 'nombrecomercial', filtering: { filterString: '', placeholder: 'Nombre' } },
  { title: 'Giro', className: 'text-info text-center', name: 'giroEmpresa', filtering: { filterString: '', placeholder: 'Giro' } },
  { title: 'Actividad', className: 'text-info text-center', name: 'actividadEmpresa', filtering: { filterString: '', placeholder: 'Actividad' } },
  { title: 'Tamaño', className: 'text-info text-center', name: 'tamanoEmpresa', filtering: { filterString: '', placeholder: 'Tamaño' } },
  { title: 'Empleados', className: 'text-info text-center', name: 'numeroEmpleados', filtering: { filterString: '', placeholder: 'No. Empleados' } },
  { title: 'Clasificación', className: 'text-info text-center', name: 'clasificacion', filtering: { filterString: '', placeholder: 'Calsificación' } },
  { title: 'TipoEmpresa', className: 'text-info text-center', name: 'tipoEmpresa', filtering: { filterString: '', placeholder: 'Tipo' } },
];

public config: any = {
  paging: true,
  //sorting: { columns: this.columns },
  filtering: { filterString: '' },
  className: ['table-hover  mb-0']
};
  public dataSource: Array<any> = [];
  public errorMessage: any;
  public showFilterRow: boolean;
  public clearFilter: boolean = false;
  public selected: boolean = false;

  /* Formulario para hacer cliente */
  public formCliente: FormGroup;

  /* Variables de Paginador */
  public page: number = 1;
  public itemsPerPage: number = 20;
  public maxSize: number = 5;
  public numPages: number = 1;
  public length: number = 0;

  public registros: number;
  public mouseEvent: boolean;
  public ProspectoId: any;

  public rowAux = [];
  public element: any = null;
  public Usuario: string;
  public Loading: boolean;

  constructor(
    private _service: ClientesService,
    private fb: FormBuilder,
    private toasterService: ToasterService,
    private _Router: Router,
    private settings: SettingsService
  ) {
    this.formCliente = new FormGroup({
      RazonSocial: new FormControl('',[Validators.required, Validators.maxLength(100)]),
      RFC: new FormControl('', [Validators.required, Validators.maxLength(13), Validators.minLength(12)]),
      ValidarRFC: new FormControl('', [Validators.required, Validators.maxLength(13), Validators.minLength(12)])
    });
   }

  ngOnInit() {
    this.Loading = true;
    this.showFilterRow = true;
    this.Usuario = this.settings.user['usuario'];
    this.getProspectos();
    this.formCliente = this.fb.group({
      RazonSocial: ['', [Validators.required, Validators.maxLength(100)]],
      RFC: ['', [Validators.required, Validators.maxLength(13), Validators.minLength(12)]],
      ValidarRFC:  ['', [Validators.required, Validators.maxLength(13), Validators.minLength(12)]]
    }, { validator: RFCValidator.MachRFC })
  }

  // ngAfterViewInit(): void {
  //   setTimeout(() => {
  //     this.onChangeTable(this.config);
  //   }, 1500);
  // }

  getProspectos() {
    this._service.getProspectos().subscribe(data => {
      this.dataSource = data;
      this.onChangeTable(this.config);
    }, error => this.errorMessage = <any>error);
  };

  public changePage(page: any, data: Array<any> = this.dataSource): Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
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

  public changeFilter(data: any, config: any): any {

    let filteredData: Array<any> = data;
    this.columns.forEach((column: any) => {
      this.clearFilter = true;
      if (column.filtering && column.filtering.filterString !== '') {
        filteredData = filteredData.filter((item: any) => {
          if (item[column.name] != null) {
            return item[column.name].toString().toLowerCase().match(column.filtering.filterString.toLowerCase());
          }
        });
      }
    });
    return filteredData;
  }

  public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {

    if (config.filtering) {
      (<any>Object).assign(this.config.filtering, config.filtering);
    }

    this.rows = this.dataSource;
    const filteredData = this.changeFilter(this.dataSource, this.config);
    this.rows = page && config.paging ? this.changePage(page, filteredData) : filteredData;
    this.registros = this.rows.length;
    this.length = filteredData.length;
    this.Loading = false;
  }

  /* Funciones secundarias */
  onCellClick(data: any){
    data.selected ? data.selected = false : data.selected = true;
    this.element = data;

    if (!data.selected) {
      this.element = null;
      this.selected = false;
    } else {
      this.selected = true;
    }
    if (this.rowAux.length == 0) {
      this.rowAux = data;
    } else if (data.selected && this.rowAux != []) {
      var aux = data;
      data = this.rowAux;
      data.selected = false;
      aux.selected = true;
      this.rowAux = aux;
    }
  }

  refreshTable(){
    this.Loading = true;
    this.getProspectos();
    setTimeout(() => {
      this.columns.forEach(element => {
        element.filtering.filterString = '';
      });
      this.onChangeTable(this.config);
    }, 500);
  }

  public clearfilters() {
    this.clearFilter = false;
    this.columns.forEach(element => {
      element.filtering.filterString = '';
      (<HTMLInputElement>document.getElementById(element.name)).value = '';
    });
    this.onChangeTable(this.config);
    if (!this.selected) {
      // this._reinciar();
    }
  }

  createCliente(){
    var cliente = {
      Id: this.element.id,
      RazonSocial: this.formCliente.get('RazonSocial').value,
      RFC: this.formCliente.get('RFC').value,
      Usuario: this.Usuario
    }
    this._service.hacerCliente(cliente).subscribe(result => {
      if(result == 200){
        var msg = 'El prospecto se pasó con éxito a clientes, ir a la sección de clientes para visualizarlo.'
        this.popToast('success', 'Prospecto', msg);
        this.refreshTable();
      }
      else{
        var msg = 'Ocurrio un error al intntar pasar a cliente el prospecto';
        this.popToast('error', 'Prospectos', msg);
      }
    })
  }

  editarProspecto() {
    this._Router.navigate(['/ventas/editarCliente', this.element['id'], 2], { skipLocationChange: true });
  }

  visualizarProspecto() {
    this._Router.navigate(['/ventas/visualizarCliente', this.element['id'], 2], { skipLocationChange: true });
  }



 /*
 * Creacion de mensajes
 */
  toaster: any;
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right',
    limit: 7, tapToDismiss: false,
    showCloseButton: true,
    mouseoverTimerStop: true,
  });
  popToast(type: any, title: any, body: any) {
    var toast: Toast = {
      type: type,
      title: title,
      timeout: 5000,
      body: body
    }
    this.toasterService.pop(toast);
  }
}
