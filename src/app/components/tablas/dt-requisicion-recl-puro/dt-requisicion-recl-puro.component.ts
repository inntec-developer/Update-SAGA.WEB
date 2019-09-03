import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { DialogCancelRequiComponent } from '../../../routes/vtas/requisiciones/components/dialog-cancel-requi/dialog-cancel-requi.component';
import { DialogDeleteRequiComponent } from '../../../routes/vtas/requisiciones/components/dialog-delete-requi/dialog-delete-requi.component';
import { DlgFacturaPuroComponent } from '../../dlg-factura-puro/dlg-factura-puro.component';
import { MatDialog } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { PostulateService } from '../../../service/SeguimientoVacante/postulate.service';
import { RequisicionesService } from './../../../service/requisiciones/requisiciones.service';
import { Router } from '@angular/router';
import { SettingsService } from '../../../core/settings/settings.service';

@Component({
  selector: 'app-dt-requisicion-recl-puro',
  templateUrl: './dt-requisicion-recl-puro.component.html',
  styleUrls: ['./dt-requisicion-recl-puro.component.scss'],
  providers: [RequisicionesService]
})
export class DtRequisicionReclPuroComponent implements OnInit {
  public estado: any;
  public mty = [6, 7, 10, 19, 28, 24];
  public gdl = [1, 3, 8, 10, 11, 14, 16, 18, 2, 25, 26, 32];
  public mx = [4, 5, 9, 12, 13, 15, 17, 20, 21, 22, 23, 27, 29, 30, 31];

  public disabled = false;
  public compact = false;
  public invertX = false;
  public invertY = false;
  public shown = 'hover';

  public dataSource = [];
  public Vacantes: number = 0;
  // Varaibles del paginador
  public page: number = 1;
  public itemsPerPage: number = 20;
  public maxSize: number = 5;
  public numPages: number = 1;
  public length: number = 0;

  public showFilterRow: boolean;
  public registros: number;
  public errorMessage: any;
  public element: any = [];

  public requisicionId: any;
  public Vacante: any;
  public RequisicionId: any;
  public estatusId: any;
  public Folio: any;
  public UnidadNegocioId: any;
  public isDurango: boolean;
  public row = [];
  public rowAux: any = [];

  public facturar = false;
  public cancelar = false;
  public borrar = false;
  public autorizar = false;
  public view = false;
  public coment = false;

  constructor(private service: RequisicionesService, private spinner: NgxSpinnerService,
    private _Router: Router,
    private dialog: MatDialog,
    private toasterService: ToasterService,
    private postulacionservice: PostulateService,
    private settings: SettingsService) { }

  public rows: Array<any> = [];
  public columns: Array<any> = [
    { title: 'Folio', sorting: 'desc', className: 'text-success text-center', name: 'folio', filtering: { filterString: '', placeholder: 'Folio' } },
    { title: 'Cliente', className: 'text-info text-center', name: 'cliente', filtering: { filterString: '', placeholder: 'Cliente' } },
    { title: 'Perfil', className: 'text-info text-center', name: 'vBtra', filtering: { filterString: '', placeholder: 'Perfil' } },
    { title: 'No. Vacantes', className: 'text-info text-center', name: 'vacantes', filtering: { filterString: '', placeholder: 'No. Vacantes' } },
    // { title: 'Tipo Recl.', className: 'text-info text-center', name: 'tipoReclutamiento', filtering: { filterString: '', placeholder: 'Tipo' } },
    // { title: 'Sueldo Mínimo', className: 'text-info text-center', name: 'sueldoMinimo', filtering: { filterString: '', placeholder: 'Sueldo Min' } },
    // { title: 'Sueldo Máximo', className: 'text-info text-center', name: 'sueldoMaximo', filtering: { filterString: '', placeholder: 'Sueldo Max' } },
    { title: 'Creación', className: 'text-info text-center', name: 'fch_Creacion', filtering: { filterString: '', placeholder: 'aaaa-mm-dd' } },
    { title: 'Fecha Cump.', className: 'text-info text-center', name: 'fch_Cumplimiento', filtering: { filterString: '', placeholder: 'aaaa-mm-dd' } },
    { title: 'Estatus', className: 'text-info text-center', name: 'estatus', filtering: { filterString: '', placeholder: 'Estatus' } },
    { title: 'Prioridad', className: 'text-info text-center', name: 'prioridad', filtering: { filterString: '', placeholder: 'Prioridad' } },
    { title: 'Propietario', className: 'text-info text-center', name: 'propietario', filtering: { filterString: '', placeholder: 'Propietario' } }
  ];

  ngOnInit() {
    this.spinner.show();
    this.GetRequisicionesPuro();
  }

  // ngAfterViewInit() {
  //   setTimeout(() => {
  //     this.onChangeTable(this.config);
  //   }, 1500);

  // }

  GetRequisicionesPuro() {
    this.service.GetRequiTipoRecl(this.settings.user['id'], 1).subscribe(data => {
      this.dataSource = data;
      this.onChangeTable(this.config);
    })
  }

  public config: any = {
    paging: true,
    //sorting: { columns: this.columns },
    filtering: { filterString: '' },
    className: ['table-hover  mb-0']
  };

  public changePage(page: any, data: Array<any> = this.dataSource): Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeFilter(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.showFilterRow = true;
    this.columns.forEach((column: any) => {
      if (column.filtering.filterString != "") {
        filteredData = filteredData.filter((item: any) => {
          if (item[column.name] != null)
            return item[column.name].toString().toLowerCase().match(column.filtering.filterString.toLowerCase());
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
    let filteredData = this.changeFilter(this.dataSource, this.config);
    this.rows = page && config.paging ? this.changePage(page, filteredData) : filteredData;
    this.length = filteredData.length;
    this.spinner.hide();
  }

  public refreshTable() {
    this.GetRequisicionesPuro();
    setTimeout(() => {
      this.columns.forEach(element => {
        element.filtering.filterString = '';
        (<HTMLInputElement>document.getElementById(element.name)).value = '';
      });
      this.resetSelect();
      this.onChangeTable(this.config)
    }, 1000);
  }

  public clearfilters() {
    this.columns.forEach(element => {
      element.filtering.filterString = '';
      (<HTMLInputElement>document.getElementById(element.name)).value = '';
    });
    this.onChangeTable(this.config);

  }

  public onCellClick(data: any): any {

    data.selected ? data.selected = false : data.selected = true;
    // data.selected ? this.ValidarEstatus(data.estatusId, data.vacantes) : this.ValidarEstatus(0, data.vacantes);


    this.RequisicionId = data.id
    this.estatusId = data.estatusId;
    this.Folio = data.folio;
    this.Vacante = data.vBtra;
    this.element = data;
    this.row = data;

    this.estado = data.estadoId


    if (this.estado == 10) {
      this.isDurango = true;
    }
    else {
      this.isDurango = false;
    }

    if (!this.isDurango) {
      if (this.mty.find(x => x == this.estado)) {
        this.UnidadNegocioId = 3
      }
      if (this.gdl.find(x => x == this.estado)) {
        this.UnidadNegocioId = 1
      }
      if (this.mx.find(x => x == this.estado)) {
        this.UnidadNegocioId = 2
      }
    }
    this.ValidarEstatus(data.estatusId, data.vacantes);


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

  updataStatus(estatusId, estatus) {
    var datos = { estatusId: estatusId, requisicionId: this.RequisicionId }

    this.postulacionservice.SetProcesoVacante(datos).subscribe(data => {
      if (data == 201) {
        var idx = this.rows.findIndex(x => x.id == this.RequisicionId);
        this.rows[idx]['estatus'] = estatus;
        this.rows[idx]['estatusId'] = estatusId;
        this.rows[idx]['estatusId'] = estatusId;
        this.ValidarEstatus(estatusId, 1);
        this.refreshTable();
        this.popToast('success', 'Estatus', 'Los datos se actualizaron con éxito');
        this.SendEmail();
        this.resetSelect();

      }
      else {
        this.autorizar = true;
        this.popToast('error', 'Estatus', 'Ocurrió un error al intentar actualizar los datos');
      }
    });
  }


  ValidarEstatus(estatusId, vacantes) {
    if (this.isDurango && (this.settings['user']['unidadNegocioId'] == 3 || this.settings['user']['unidadNegocioId'] == 1)) {
      this.validation(estatusId, vacantes)
    } else if (this.UnidadNegocioId == this.settings['user']['unidadNegocioId']) {
      this.validation(estatusId, vacantes);
    } else {
      this.view = true;
      this.coment = true;
      this.facturar = false;
      this.cancelar = false;
      this.borrar = false;
      this.autorizar = false;
    }
  }

  validation(estatusId, vacantes) {
    if (vacantes == 0) {
      this.view = true;
      this.coment = true;
      this.facturar = false;
      this.cancelar = false;
      this.borrar = false;
      this.autorizar = false;
    }
    else if (estatusId == 46) {
      this.view = true;
      this.coment = true;
      this.facturar = false;
      this.cancelar = true;
      this.borrar = true;
      this.autorizar = false;
    }
    else if (estatusId == 43) {
      this.view = true;
      this.coment = true;
      this.facturar = true;
      this.cancelar = true;
      this.borrar = true;
      this.autorizar = false;
    }
    else if (estatusId == 44) {
      this.view = true;
      this.coment = true;
      this.facturar = false;
      this.cancelar = true;
      this.borrar = false;
      this.autorizar = true;
    }
    else if (estatusId == 45) {
      this.view = true;
      this.coment = true;
      this.facturar = false;
      this.cancelar = true;
      this.borrar = false;
      this.autorizar = true;
    }
    else if (estatusId == 8) {
      this.view = true;
      this.coment = true;
      this.facturar = false;
      this.cancelar = false;
      this.borrar = true;
      this.autorizar = false;
    }
    else {
      this.view = true;
      this.coment = true;
      this.facturar = false;
      this.cancelar = false;
      this.borrar = false;
      this.autorizar = false;
    }
  }

  openDialogDelete() {
    let dialogDlt = this.dialog.open(DialogDeleteRequiComponent, {
      data: this.element
    });
    var window: Window
    dialogDlt.afterClosed().subscribe(result => {
      if (result == 200) {
        this.refreshTable();
        this.SendEmail();
        this.resetSelect();
      }
    });
  }

  openDialogCancel() {
    this.element.motivoId = 17;
    let dialogCnc = this.dialog.open(DialogCancelRequiComponent, {
      data: this.element
    });
    var window: Window
    dialogCnc.afterClosed().subscribe(result => {
      if (result == 200) {
        // this.updataStatus(8, 'Cancelar')
        this.ValidarEstatus(8, 1);
        this.refreshTable();
        this.SendEmail();
        this.resetSelect();
      }


    })
  }

  openDialogFactura() {
    let dialogDlt = this.dialog.open(DlgFacturaPuroComponent, {
      width: 'auto',
      height: 'auto',
      disableClose: true,
      data: this.row
    });
    var window: Window
    dialogDlt.afterClosed().subscribe(result => {
      if (result != "") {
        if (result.Ok == 200) {

          this.postulacionservice.SetProcesoVacante({ estatusId: result.estatus, requisicionId: this.RequisicionId }).subscribe(data => {

            if (data == 201) {
              this.popToast('success', 'Estatus', 'Los datos se actualizaron con éxito');
              this.refreshTable();
              this.SendEmail();
            }
            else {
              this.popToast('error', 'Estatus', 'Ocurrio un error al intentar actualizar datos');
            }
          })
        }
        else
          this.popToast('error', 'Estatus', 'Ocurrio un error al intentar actualizar datos');
      }
    });
  }

  resetSelect() {
    this.facturar = false;
    this.cancelar = false;
    this.borrar = false;
    this.autorizar = false;
    this.view = false;
    this.coment = false;
  }

  SendEmail() {
    this.service.SendEmailRequiPuro(this.RequisicionId).subscribe(email => {
      if (email == 200) {
        this.popToast('success', 'Notificación', 'Se ha notificado por medio de correo electrónico a los usuarios correspondientes.');
      } else {
        this.popToast('error', 'Estatus', 'Ocurrió un error al intentar notificar por correo electrónico los cambios realizados.');
      }
    });
  }

  /*
  * Creacion de mensajes
  * */
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

}
