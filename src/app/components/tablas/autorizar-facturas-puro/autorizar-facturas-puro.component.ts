import { Component, OnInit } from '@angular/core';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { DialogCancelRequiComponent } from '../../../routes/vtas/requisiciones/components/dialog-cancel-requi/dialog-cancel-requi.component';
import { MatDialog } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { PostulateService } from './../../../service/SeguimientoVacante/postulate.service';
import { RequisicionesService } from '../../../service';

const swal = require('sweetalert');
@Component({
  selector: 'app-autorizar-facturas-puro',
  templateUrl: './autorizar-facturas-puro.component.html',
  styleUrls: ['./autorizar-facturas-puro.component.scss'],
  providers: [RequisicionesService]
})
export class AutorizarFacturasPuroComponent implements OnInit {
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

  autorizar: boolean = false;
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
    { title: '% Factura', className: 'text-info text-center', name: 'porcentaje', filtering: { filterString: '', placeholder: 'Porcentaje' } },
    { title: 'Monto a cubrir', className: 'text-info text-center', name: 'monto', filtering: { filterString: '', placeholder: 'Monto' } },
    { title: 'Propietario', className: 'text-info text-center', name: 'propietario', filtering: { filterString: '', placeholder: 'Propietario' } }
  ];
  rowAux: any = [];
  element: any = [];
  comment: boolean = false;
  view: boolean = false;
  cancelar: boolean = false;

  constructor(private service: RequisicionesService,
     private postulacionservice: PostulateService, private spinner: NgxSpinnerService, private toasterService: ToasterService, private dialog: MatDialog,) { }

  ngOnInit() {
    this.GetRequisiciones();
  }

  GetRequisiciones() {
    this.service.GetRequisPendientes().subscribe(data => {
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
  }

  public refreshTable() {
    this.GetRequisiciones();
    setTimeout(() => {
      this.columns.forEach(element => {
        (<HTMLInputElement>document.getElementById(element.name)).value = '';
      });
      this.onChangeTable(this.config)
      this.autorizar = false;
      this.comment = false;
      this.view = false;
      this.cancelar = false;
      this.element = null;
    }, 1000);

  }

  public clearfilters() {
    this.columns.forEach(element => {
      element.filtering.filterString = '';
      (<HTMLInputElement>document.getElementById(element.name)).value = '';
    });
    this.onChangeTable(this.config);

  }

  public Autorizar()
  {
      swal({
        title: "¿ESTÁS SEGURO?",
        text: "¡Se enviará a facturar el folio " + this.element.folio + " con porcentaje de " + this.element.porcentaje + "%",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ec2121",
        confirmButtonText: "¡Si, enviar a factura!",
        cancelButtonColor: "#ec2121",
        cancelButtonText: "¡No, cancelar!",
        closeOnConfirm: true,
        closeOnCancel: true
      }, (isConfirm) => {
        window.onkeydown = null;
        window.onfocus = null;
        if (isConfirm)
        {
          this.spinner.show();
          this.postulacionservice.SetProcesoVacante({ estatusId: 44, requisicionId: this.element.requisicionId }).subscribe(data => {
            if (data == 201) {
              this.popToast('success', 'Estatus', 'La requisicion se encuentra en estatus envio a facturar');
              this.SendEmail(this.element.requisicionId);
              this.refreshTable();
              this.spinner.hide();
            }
            else {
              this.popToast('error', 'Estatus', 'Ocurrio un error al intentar actualizar datos');
              this.spinner.hide();
            }
          })

        }
        else {
          swal("Cancelado", "No se realizó ningún cambio", "error");
        }
      });

  }

  public onCellClick(data: any): any {
    data.selected ? data.selected = false : data.selected = true;

    this.element = data;
    this.autorizar = true;
    this.comment = true;
    this.view = true;
    this.cancelar = true;

    if (!data.selected) {
      this.autorizar = false;
      this.comment = false;
      this.view = false;
      this.cancelar = false;
    } else {
      this.autorizar = true;
      this.comment = true;
      this.view = true;
      this.cancelar = true;
    }

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


  SendEmail(requisicionId) {
    this.service.SendEmailRequiPuro(requisicionId).subscribe(email => {
      if (email == 200) {
        this.popToast('success', 'Notificación', 'Se ha notificado por medio de correo electrónico a los usuarios correspondientes.');
      } else {
        this.popToast('error', 'Estatus', 'Ocurrió un error al intentar notificar por correo electrónico los cambios realizados.');
      }
    });
  }

  openDialogCancel() {
    this.element.motivoId = 17;
    this.element['id'] = this.element['requisicionId'];
    let dialogCnc = this.dialog.open(DialogCancelRequiComponent, {
      data: this.element
    });
    var window: Window
    dialogCnc.afterClosed().subscribe(result => {
      if (result == 200) {
        this.refreshTable();
        this.SendEmail(this.element.requisicionId);
        this.autorizar = false;
        this.comment = false;
        this.view = false;
        this.cancelar = false;
        this.element = null;
      }
    })
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
