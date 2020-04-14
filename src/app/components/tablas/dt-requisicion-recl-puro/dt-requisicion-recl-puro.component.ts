import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { DialogCancelRequiComponent } from '../../../routes/vtas/requisiciones/components/dialog-cancel-requi/dialog-cancel-requi.component';
import { DlgFacturaPuroComponent } from '../../dlg-factura-puro/dlg-factura-puro.component';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { PostulateService } from '../../../service/SeguimientoVacante/postulate.service';
import { RequisicionesService } from './../../../service/requisiciones/requisiciones.service';
import { Router } from '@angular/router';
import { SettingsService } from '../../../core/settings/settings.service';
import { ComentarioVacanteComponent } from '../../comentario-vacante/comentario-vacante.component';
const Swal = require('sweetalert2');
@Component({
  selector: 'app-dt-requisicion-recl-puro',
  templateUrl: './dt-requisicion-recl-puro.component.html',
  styleUrls: ['./dt-requisicion-recl-puro.component.scss'],
  providers: [RequisicionesService]
})
export class DtRequisicionReclPuroComponent implements OnInit {
  public estado: any;

  public disabled = false;
  public compact = false;
  public invertX = false;
  public invertY = false;
  public shown = 'shown';

  public dataSource = [];
  public Vacantes = 0;
  // Varaibles del paginador
  public page = 1;
  public itemsPerPage = 20;
  public maxSize = 5;
  public numPages = 1;
  public length = 0;

  public showFilterRow: boolean;
  public registros: number;
  public errorMessage: any;
  public element: any = [];

  public requisicionId: any;
  public Vacante: any;
  public RequisicionId: any;
  public estatusId: any;
  public Folio: any;
   public row = [];
  public rowAux: any = [];

  public facturar = false;
  public cancelar = false;
  public borrar = false;
  public autorizar = false;
  public view = false;
  public coment = false;

  public config: any = {
    paging: true,
    filtering: { filterString: '' },
    className: ['table-hover  mb-0']
  };

  public rows: Array<any> = [];
  public columns: Array<any> = [
    {
      title: 'Folio', sorting: 'desc', className: 'text-success text-center', name: 'folio',
      filtering: { filterString: '', placeholder: 'Folio' }
    },
    { title: 'Cliente', className: 'text-info text-center', name: 'cliente', filtering: { filterString: '', placeholder: 'Cliente' } },
    { title: 'Perfil', className: 'text-info text-center', name: 'vBtra', filtering: { filterString: '', placeholder: 'Perfil' } },
    {
      title: 'No. Vacantes', className: 'text-info text-center', name: 'vacantes',
      filtering: { filterString: '', placeholder: 'No. Vacantes' }
    },
    {
      title: 'Creación', className: 'text-info text-center', name: 'fch_Creacion',
      filtering: { filterString: '', placeholder: 'aaaa-mm-dd' }
    },
    {
      title: 'Fecha Cump.', className: 'text-info text-center', name: 'fch_Cumplimiento',
      filtering: { filterString: '', placeholder: 'aaaa-mm-dd' }
    },
    {
      title: 'Días Transc.', className: 'text-info text-center', name: 'diasTrans',
      filtering: { filterString: '', placeholder: 'Días' }
    },
    {
      title: 'Estatus', className: 'text-info text-center', name: 'estatus',
      filtering: { filterString: '', placeholder: 'Estatus' }
    },
    {
      title: 'Prioridad', className: 'text-info text-center', name: 'prioridad',
      filtering: { filterString: '', placeholder: 'Prioridad' }
    },
    {
      title: 'Coordinador', className: 'text-info text-center', name: 'coordinador',
      filtering: { filterString: '', placeholder: 'Coordinador' }
    },
    {
      title: 'Propietario', className: 'text-info text-center', name: 'propietario',
      filtering: { filterString: '', placeholder: 'Propietario' }
    }
  ];
  totalPos: any;
  totalContratados: any;
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
  constructor(private service: RequisicionesService, private spinner: NgxSpinnerService,
    private _Router: Router,
    private dialog: MatDialog,
    private toasterService: ToasterService,
    private postulacionservice: PostulateService,
    private settings: SettingsService,
    private dlgComent: MatDialog) { }



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
      const n = new Date;
      this.totalPos = 0;
      this.totalContratados = 0;

      this.dataSource.forEach(r => {
        if (r.estatusId !== 8 && (r.estatusId < 34 || r.estatusId > 37)) {
          this.totalPos += r.vacantes;
          this.totalContratados += r.contratados;

          r.rango = r.sueldoMinimo + '-' + r.sueldoMaximo;
          const daux = new Date(r.fch_Creacion);
          let diasTrans = 0;
          while (daux <= n) {
            if (daux.getDay() > 0 && daux.getDay() < 6) {
              diasTrans += 1;
            }
            daux.setDate(daux.getDate() + 1);
          }
          r.diasTrans = diasTrans;
          // if (r.estatusId === 4 || r.estatusId === 43) {
          //   r.coordinador = r.reclutadores;
          //   r.reclutadores = 'SIN ASIGNAR';
          // }
        }
      });
      this.onChangeTable(this.config);
    });
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
      if (column.filtering.filterString !== '') {
        filteredData = filteredData.filter((item: any) => {
          if (item[column.name] != null) {
            if (!Array.isArray(item[column.name])) {
              return item[column.name].toString().toLowerCase().match(column.filtering.filterString.toLowerCase());
            } else {
              if (item[column.name].length > 0) {
                let aux = [];
                aux = item[column.name];
                let flag = false;
                aux.forEach(element => {
                  if (element.toString().toLowerCase().match(column.filtering.filterString.toLowerCase())) {
                    flag = true;
                    return;
                  }
                });

                if (flag) {
                  return item[column.name];
                }
              } else {
                if ('sin asignar'.match(column.filtering.filterString.toLowerCase())) {
                  return item[column.name];
                }
              }
            }
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
    this.length = filteredData.length;
    this.spinner.hide();
  }

  public refreshTable() {
    this.spinner.show();
    this.GetRequisicionesPuro();
    this.columns.forEach(element => {
      element.filtering.filterString = '';
      (<HTMLInputElement>document.getElementById(element.name)).value = '';
    });
    this.resetSelect();
    this.element = [];
    this.rowAux = [];
    // this.onChangeTable(this.config);
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


    this.RequisicionId = data.id;
    this.estatusId = data.estatusId;
    this.Folio = data.folio;
    this.Vacante = data.vBtra;
    this.element = data;
    this.row = data;

    this.estado = data.estadoId;

    // if (this.mty.find(x => x === this.estado)) {
    //   this.UnidadNegocioId = 3;
    // }
    // if (this.gdl.find(x => x === this.estado)) {
    //   this.UnidadNegocioId = 1;
    // }
    // if (this.mx.find(x => x === this.estado)) {
    //   this.UnidadNegocioId = 2;
    // }

    this.ValidarEstatus(data.estatusId, data.vacantes);


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

  updataStatus(estatusId, estatus) {
    const datos = { estatusId: estatusId, requisicionId: this.RequisicionId };

    this.postulacionservice.SetProcesoVacante(datos).subscribe(data => {
      if (data === 201) {
        const idx = this.rows.findIndex(x => x.id === this.RequisicionId);
        this.rows[idx]['estatus'] = estatus;
        this.rows[idx]['estatusId'] = estatusId;

        this.ValidarEstatus(estatusId, 1);
        this.refreshTable();
        this.popToast('success', 'Estatus', 'Los datos se actualizaron con éxito');
        this.SendEmail();
        this.resetSelect();

      } else {
        this.autorizar = true;
        this.popToast('error', 'Estatus', 'Ocurrió un error al intentar actualizar los datos');
      }
    });
  }


  ValidarEstatus(estatusId, vacantes) {
    if (this.element.unidadNegocioId === +this.settings['user']['unidadNegocioId']) {
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
    if (vacantes === 0 || this.element.coordinador.length === 0) {
      this.view = true;
      this.coment = true;
      this.facturar = false;
      this.cancelar = false;
      this.borrar = false;
      this.autorizar = false;
    } else if (estatusId === 46) {
      this.view = true;
      this.coment = true;
      this.facturar = false;
      this.cancelar = true;
      this.borrar = true;
      this.autorizar = false;
    } else if (estatusId === 43) {
      this.view = true;
      this.coment = true;
      this.facturar = true;
      this.cancelar = true;
      this.borrar = true;
      this.autorizar = false;
    } else if (estatusId === 44) {
      this.view = true;
      this.coment = true;
      this.facturar = false;
      this.cancelar = true;
      this.borrar = false;
      this.autorizar = true;
    } else if (estatusId === 45) {
      this.view = true;
      this.coment = true;
      this.facturar = false;
      this.cancelar = true;
      this.borrar = false;
      this.autorizar = true;
    } else if (estatusId === 8) {
      this.view = true;
      this.coment = true;
      this.facturar = false;
      this.cancelar = false;
      this.borrar = true;
      this.autorizar = false;
    } else {
      this.view = true;
      this.coment = true;
      this.facturar = false;
      this.cancelar = false;
      this.borrar = false;
      this.autorizar = false;
    }
  }

  openDialogComentarios() {
    const motivoId = 7;

    const dlgComent = this.dlgComent.open(ComentarioVacanteComponent, {
      width: '85%',
      height: 'auto',
      data: {
        id: this.element.id,
        vBtra: this.element.vBtra,
        folio: this.element.folio,
        motivoId: motivoId
      }
    });
    dlgComent.afterClosed().subscribe(result => {
      // if (result === 200) {
      //   this.popToast('success', 'Comentarios', 'La requisición se canceló exitosamente, podrás consultarla en el histórico');
      // }
    });
  }
  openDialogDelete() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger mr-2'
      },
      buttonsStyling: false
    });

    const html = '<h6 class="text-warning"><strong>SE ELIMINARÁ EL FOLIO <span class="text-success">'
      + this.element.folio + '</span></strong></h6>' +
      '<p><span class="text-muted">CLIENTE</span><br>' + this.element.cliente.toUpperCase() + '</p>' +
      '<p><span class="text-muted">PUESTO</span><br>' + this.element.vBtra.toUpperCase() + '</p>' +
      '   <p><span class="text-muted">TIPO RECLUTAMIENTO </span><br>' + this.element.tipoReclutamiento.toUpperCase() + '</p>' +
      '<p><span class="text-muted mr-2">FECHA CREACI&Oacute;N</span><br>' + this.element.fch_Creacion + '</p>';
    swalWithBootstrapButtons.fire({
      title: '¿ESTÁS SEGURO?',
      html: html,
      showCancelButton: true,
      confirmButtonText: '¡SI, ELIMINAR!',
      cancelButtonText: '¡NO, CANCELAR!',
      reverseButtons: true,
      type: 'error',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: 'ELIMINANDO FOLIO ...',
          text: 'El proceso puede durar varios segundos por favor espere',
          type: 'warning',
          allowEscapeKey: false,
          allowEnterKey: false,
          onOpen: () => {
            Swal.showLoading();
            const infoDeleteRequi = {
              Id: this.element.id,
              UsuarioMod: this.settings.user['usuario']
            };
            this.service.deleteRequisicion(infoDeleteRequi)
              .subscribe(data => {
                if (data === 200) {
                  Swal.hideLoading();
                  Swal.close();
                  this.refreshTable();
                  this.SendEmail();
                  this.resetSelect();
                  this.popToast('success', 'Requisición', 'El folio ' + this.element.folio + ' se eliminó correctamente');
                } else {
                  Swal.hideLoading();
                  this.popToast('danger', 'Requisición', 'Oops!! No se puedo eliminar la requisición ' + this.element.folio);
                }
              });
          },
          allowOutsideClick: () => !Swal.isLoading()
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'CANCELADO',
          'NO SE REALIZÓ NINGÚN CAMBIO',
          'error'
        );
      }
    });
    // const dialogDlt = this.dialog.open(DialogDeleteRequiComponent, {
    //   data: this.element
    // });

    // dialogDlt.afterClosed().subscribe(result => {
    //   if (result === 200) {
    //     this.refreshTable();
    //     this.SendEmail();
    //     this.resetSelect();
    //   }
    // });
  }

  openDialogCancel() {
    this.element.motivoId = 17;
    const dialogCnc = this.dialog.open(DialogCancelRequiComponent, {
      data: this.element
    });

    dialogCnc.afterClosed().subscribe(result => {
      if (result === 200) {
        // this.updataStatus(8, 'Cancelar')
        this.ValidarEstatus(8, 1);
        this.refreshTable();
        this.SendEmail();
        this.resetSelect();
      }


    });
  }

  openDialogFactura() {
    const dialogDlt = this.dialog.open(DlgFacturaPuroComponent, {
      width: 'auto',
      height: 'auto',
      disableClose: true,
      data: this.row
    });

    dialogDlt.afterClosed().subscribe(result => {
      if (result !== '') {
        if (result.Ok === 200) {
          this.postulacionservice.SetProcesoVacante({ estatusId: result.estatus, requisicionId: this.RequisicionId }).subscribe(data => {
            if (data === 201) {
              this.popToast('success', 'Estatus', 'Los datos se actualizaron con éxito');
              this.refreshTable();
              this.SendEmail();
            } else {
              this.popToast('error', 'Estatus', 'Ocurrio un error al intentar actualizar datos');
            }
          });
        } else {
          this.popToast('error', 'Estatus', 'Ocurrio un error al intentar actualizar datos');
        }
      }
    });
  }
  showRequi() {
    const Vacante = this.element.vBtra;
    const puro = 1;
    this._Router.navigate(['/ventas/visualizarRequisicion/',
      this.element.id,
      this.element.folio,
      Vacante,
      this.element.tipoReclutamientoId,
      puro], { skipLocationChange: true }
    );
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


  popToast(type, title, body) {
    const toast: Toast = {
      type: type,
      title: title,
      timeout: 5000,
      body: body
    };
    this.toasterService.pop(toast);
  }

}
