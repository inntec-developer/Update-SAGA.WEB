import { ActivatedRoute, Router } from '@angular/router';
import { BodyOutputType, Toast, ToasterConfig, ToasterService } from 'angular2-toaster';
import { Component, Input, OnInit, AfterViewInit } from '@angular/core';

import { DialogdamfoComponent } from '../dialogdamfo/dialogdamfo.component';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { RequisicionesService } from '../../../../../service';
import { SettingsService } from '../../../../../core/settings/settings.service';
import { PerfilReclutamientoService } from '../../../../../service/PerfilReclutamiento/perfil-reclutamiento.service';
import { DlgTransferDamfo290Component } from '../../../../../components/dlg-transfer-damfo290/dlg-transfer-damfo290.component';

declare var $: any;
const swal = require('sweetalert');

@Component({
  selector: 'app-dt-damfo',
  templateUrl: './dt-damfo.component.html',
  styleUrls: ['./dt-damfo.component.scss'],
  providers: [RequisicionesService, PerfilReclutamientoService]
})
export class DtDamfoComponent implements OnInit {
 Perfil290 = true;
  // scroll
  disabled = false;
  compact = false;
  invertX = false;
  invertY = false;
  shown = 'shown';
  ShowModal = false;
  // Varaibales Globales
  public dataSource: Array<any> = [];
  Vacantes = 0;

  // Varaibles del paginador
  public page = 1;
  public itemsPerPage = 20;
  public maxSize = 5;
  public numPages = 1;
  public length = 0;

  showFilterRow: boolean;
  registros: number;
  errorMessage: any;
  element: any = [];
  damfoId: any;

  rowAux = [];
  selected = false;

  isEditable = false;

  public rows: Array<any> = [];
  public columns: Array<any> = [
    {
      title: 'Cliente', className: 'text-success text-center', name: 'cliente',
      filtering: { filterString: '', placeholder: 'Cliente' }
    },
    {
      title: 'Perfil', className: 'text-info text-center', name: 'nombrePerfil',
      filtering: { filterString: '', placeholder: 'Perfil' }
    },
    {
      title: 'No. Vacantes', className: 'text-info text-center', name: 'vacantes',
      filtering: { filterString: '', placeholder: 'No. Vacantes' }
    },
    {
      title: 'Sueldo Mínimo', className: 'text-info text-center', name: 'sueldoMinimo',
      filtering: { filterString: '', placeholder: 'Sueldo Min' }
    },
    {
      title: 'Sueldo Máximo', className: 'text-info text-center', name: 'sueldoMaximo',
      filtering: { filterString: '', placeholder: 'Sueldo Max' }
    },
    {
      title: 'Tipo Recl.', className: 'text-info text-center', name: 'tipoReclutamiento',
      filtering: { filterString: '', placeholder: 'Tipo Recl.' }
    },
    {
      title: 'Clase Recl.', className: 'text-info text-center', name: 'claseReclutamiento',
      filtering: { filterString: '', placeholder: 'Clase Recl.' }
    },
    {
      title: 'Creación', className: 'text-info text-center', name: 'fch_Creacion',
      filtering: { filterString: '', placeholder: 'aaaa-mm-dd' }
    },
    {
      title: 'Usuario', className: 'text-info text-center', name: 'usuarioCreacion',
      filtering: { filterString: '', placeholder: 'Usuario' }
    }
  ];

  public config: any = {
    paging: true,
    // sorting: { columns: this.columns },
    filtering: { filterString: '' },
    className: ['table-hover mb-0']
  };

  toaster: any;
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right',
    limit: 7, tapToDismiss: false,
    showCloseButton: true,
    mouseoverTimerStop: true,
  });

  constructor(
    private _setting: SettingsService,
    private service: RequisicionesService,
    private _perfillR: PerfilReclutamientoService,
    private dialog: MatDialog,
    private _Router: Router,
    private spinner: NgxSpinnerService,
    private toasterService: ToasterService,
    private activateRoute: ActivatedRoute
  ) {
    this.activateRoute.params.subscribe(params => {
      if (params['perfil290'] != null) {
        this.Perfil290 = Boolean(JSON.parse(params['perfil290']));
      }
    });
  }

  ngOnInit() {
    /** spinner starts on init */
    this.spinner.show();
    this.getDamfo290();
    this.Perfil290 = this.Perfil290 || false;
  }

  getDamfo290() {
    this.service.getDamgo290().subscribe(data => {
      this.dataSource = data;
      this.onChangeTable(this.config);
    }, error => this.errorMessage = <any>error);
  }

  public changePage(page: any, data: Array<any> = this.dataSource): Array<any> {
    const start = (page.page - 1) * page.itemsPerPage;
    const end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeFilter(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.showFilterRow = true;
    this.columns.forEach((column: any) => {
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

    this.registros = this.dataSource.length;
    this.rows = this.dataSource;
    const filteredData = this.changeFilter(this.dataSource, this.config);
    this.rows = page && config.paging ? this.changePage(page, filteredData) : filteredData;
    this.registros = this.rows.length;
    this.length = filteredData.length;
    this.spinner.hide();

  }

  public onCellClick(data: any): any {
    if (data['usuarioAlta'].toUpperCase() === this._setting.user.usuario.toUpperCase()) {
      this.isEditable = true;
    } else {
      this.isEditable = false;
    }
    this.element = data;
    this.damfoId = data.id;

    data.selected ? data.selected = false : data.selected = true;

    if (!data.selected) {
      this.selected = false;
    } else {
      this.selected = true;
    }

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

  /*
  * Funciones para la administracion del 290
  * */
  public refreshTable() {
    this.spinner.show();
    this.getDamfo290();
    this.element = [];
    this.selected = false;
  }

  public clearfilters() {
    this.columns.forEach(element => {
      element.filtering.filterString = '';
      (<HTMLInputElement>document.getElementById(element.name)).value = '';
    });
    this.onChangeTable(this.config);
  }

  showDamfo() {
    // Mandamos la información por medio de la URL sin que esta se muestre en la liga.
    if (this.element.horariosActivos === 0) {
      swal('Ops...!', 'Este formato DAM-FO-290 no cuenta con horarios activos. No es posible visualizarlo.', 'error');
    } else if (this.damfoId) {
      if (!this.Perfil290) {
        this._Router.navigate(['/ventas/visualizarDamfo290', this.damfoId], /*{ skipLocationChange: true }*/);
      } else {
        this._Router.navigate(['/ventas/visualizarDamfo290', this.damfoId, this.Perfil290], /*{ skipLocationChange: true }*/);
      }
    }
  }

  openDialog() {
    if (this.element) {
      if (this.element.horariosActivos > 0) {
        const dialogRef = this.dialog.open(DialogdamfoComponent, {
          width: '50%',
          height: 'auto',
          data: this.element
        });
      } else {
        // Mensaje de Error, en caso de que el damfo no cuente con horarios activos.
        swal('Ops...!', 'Este formato DAM-FO-290 no cuenta con horarios activos. No es posible generar la requisición', 'error');
      }
    }
  }
  openDialogTransfer() {
    const dialogRef = this.dialog.open(DlgTransferDamfo290Component, {
          width: '70%',
          height: 'auto',
          data: this.element
    });
    dialogRef.afterClosed().subscribe(result => {
        this.refreshTable();
    });
  }

  crearPerfil290() {
    this._Router.navigate(['/ventas/formato290']/*,{skipLocationChange: true}*/);
  }

  editar290() {
    this._Router.navigate(['/ventas/formato290', this.damfoId], { skipLocationChange: false });
  }
  /*
  * Creacion de mensajes
  * */
  popToast(type, title, body) {

    const toast: Toast = {
      type: type,
      title: title,
      timeout: 5000,
      body: body
    };
    this.toasterService.pop(toast);
  }
  /**
   * Creacion de Alertas modal
   */
  sweetalertNNotActivatedHours() {
    swal({
      title: 'Estas seguro? ',
      text: 'Este formato DAM-FO-290 no cuenta con horarios activos.',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Si, generar requisición.',
      cancelButtonText: 'No, cancelar',
      closeOnConfirm: false,
      closeOnCancel: false,
    }, (isConfirm) => {
      window.onkeydown = null;
      window.onfocus = null;
      if (isConfirm) {
        swal('Generar Requisicion', '', 'success');
        const dialogRef = this.dialog.open(DialogdamfoComponent, {
          width: '50%',
          height: 'auto',
          data: this.element
        });
      } else {
        swal('Ops...!', 'Este formato DAM-FO-290 no cuenta con horarios activos. :)', 'error');
      }
    });
  }

  clonarFormato290() {
    swal({
      title: 'Clonar Formato 290 -' + this.element['nombrePerfil'] + '?',
      text: 'Este Formato 290 se clonará para realizar modificaciones correspondientes.',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Si, clonar formato',
      cancelButtonText: 'No, cancelar',
      closeOnConfirm: false,
      closeOnCancel: true,
    }, (isConfirm: any) => {
      if (isConfirm) {
        const headers = {
          id: this.element['id']
        };
        const perfil = {
          Headers: headers,
          Action: 'clone'
        };
        this._perfillR.CrudPerfilReclutamiento(perfil).subscribe(x => {
          this.damfoId = x;
          this.editar290();
          swal('Se clonó Formato 290 correctamente', '', 'success');
        });
      }
      window.onkeydown = null;
      window.onfocus = null;
    });
  }

  eliminarFormato290(){
    swal({
      title: 'Eliminar Formato 290 -' + this.element['nombrePerfil'] + '?',
      text: 'Este Formato 290 se eliminará.',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Si, Eliminar formato',
      cancelButtonText: 'No, cancelar',
      closeOnConfirm: false,
      closeOnCancel: true,
    }, (isConfirm: any) => {
      if (isConfirm) {
        const headers = {
          id: this.element['id']
        };
        const perfil = {
          Headers: headers,
          Action: 'delete'
        };
        this._perfillR.CrudPerfilReclutamiento(perfil).subscribe(x => {
          this.damfoId = x;
          this.refreshTable();
          swal('Se eliminó el formato 290 correctamente', '', 'success');
        });
      }
      window.onkeydown = null;
      window.onfocus = null;
    });
  }


}

