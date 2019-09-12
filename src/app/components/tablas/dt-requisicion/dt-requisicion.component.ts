import { Component, OnInit } from '@angular/core';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { DatePipe } from '@angular/common';
import { DialogActivarRequiComponent } from '../../../routes/vtas/requisiciones/components/dialog-activar-requi/dialog-activar-requi.component';
import { DialogCancelRequiComponent } from '../../../routes/vtas/requisiciones/components/dialog-cancel-requi/dialog-cancel-requi.component';
import { DialogDeleteRequiComponent } from '../../../routes/vtas/requisiciones/components/dialog-delete-requi/dialog-delete-requi.component';
import { DlgCubiertasComponent } from './../../dlg-cubiertas/dlg-cubiertas.component';
import { DlgTransferComponent } from './../../../routes/vtas/requisiciones/components/dlg-transfer/dlg-transfer.component';
import { ExcelService } from './../../../service/ExcelService/excel.service';
import { MatDialog } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { PostulateService } from '../../../service/SeguimientoVacante/postulate.service';
import { RequisicionesService } from '../../../service';
import { Router } from '@angular/router';
import { SettingsService } from '../../../core/settings/settings.service';

declare var $: any;

@Component({
  selector: 'app-dt-requisicion',
  templateUrl: './dt-requisicion.component.html',
  styleUrls: ['./dt-requisicion.component.scss'],
  providers: [RequisicionesService, PostulateService, DatePipe]
})

export class DtRequisicionComponent implements OnInit {
  public reporteCandidatos = false;

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

  // scroll
  disabled = false;
  compact = false;
  invertX = false;
  invertY = false;
  shown = 'hover';

  // Variables Globales
  public dataSource: Array<any> = [];
  Vacantes = 0;

  // Varaibles del paginador
  public page = 1;
  public itemsPerPage = 20;
  public maxSize = 5;
  public numPages = 1;
  public length = 0;

  selected = false;
  rowAux = [];
  cubiertas = [];

  showFilterRow: boolean;
  registros: number;
  errorMessage: any;
  element: any = [];

  estatusId: any;
  enProceso: any;

  requisicionId: any;

  //
  view = false;
  coment = false;
  candidatos = true;

  // Estatus
  nbc = true; // nueva busqueda candidato
  contratado = true;
  cubierta = true;
  gbc = true; // garantía busqueda candidato
  cc = true; // cubierta por el cliente
  crm = true; // cubierta reclutamiento medios
  cp = true; // cubierta parcialmente
  borrar = true;
  cancelar = true;
  editar = true;
  RequisicionId: any;
  Folio: any;
  Vacante: any;
  comentario: string;

  tipoUsuarioId = this.settings.user['tipoUsuarioId'];
  historial = false;
  totalPos = 0;
  totalContratados = 0;


  public rows: Array<any> = [];
  public columns: Array<any> = [
    {
      title: 'Folio', sorting: 'desc', className: 'text-success text-center',
      name: 'folio', filtering: { filterString: '', placeholder: 'Folio' }
    },
    {
      title: 'Cliente', className: 'text-info text-center',
      name: 'cliente', filtering: { filterString: '', placeholder: 'Cliente' }
    },
    {
      title: 'Perfil', className: 'text-info text-center',
      name: 'vBtra', filtering: { filterString: '', placeholder: 'Perfil' }
    },
    {
      title: 'Cub/Vac', className: 'text-info text-center',
      name: 'vacantes', filtering: { filterString: '', placeholder: 'No.' }
    },
    {
      title: 'Tipo Recl.', className: 'text-info text-center',
      name: 'tipoReclutamiento', filtering: { filterString: '', placeholder: 'Tipo' }
    },
    { title: 'Días Transc.', className: 'text-info text-center', name: 'diasTrans', filtering: { filterString: '', placeholder: 'Días' } },
    { title: 'Rango sueldo', className: 'text-info text-center', name: 'rango',
    filtering: { filterString: '', placeholder: 'Rango sueldo' } },
    {
      title: 'Estatus', className: 'text-info text-center',
      name: 'estatus', filtering: { filterString: '', placeholder: 'Estatus' }
    },
    {
      title: 'Coordinador', className: 'text-info text-center',
      name: 'coordinador', filtering: { filterString: '', placeholder: 'Coordinador', columnName: 'reclutadores' }
    },
    {
      title: 'Solicitante', className: 'text-info text-center',
      name: 'propietario', filtering: { filterString: '', placeholder: 'Solicitante' }
    },
    {
      title: 'Reclutador', className: 'text-info text-center',
      name: 'reclutadores', filtering: { filterString: '', placeholder: 'Reclutador', columnName: 'reclutadores' }
    },
  ];

  public config: any = {
    paging: true,
    filtering: { filterString: '' },
    className: ['table-hover  mb-0']
  };

  constructor(
    private service: RequisicionesService,
    private postulacionservice: PostulateService,
    private dialog: MatDialog,
    private _Router: Router,
    private spinner: NgxSpinnerService,
    private toasterService: ToasterService,
    private excelService: ExcelService,
    private pipe: DatePipe,
    private settings: SettingsService

  ) { }

  ngOnInit(): void {
    /** spinner starts on init */
    this.spinner.show();
    this.getRequisiciones();

  }

  // ngAfterViewInit() {
  //   setTimeout(() => {
  //     this.onChangeTable(this.config);
  //   }, 1500);

  // }

  getRequisiciones() {
    this.service.getRequisiciones(this.settings.user['id']).subscribe(data => {
      if (data !== 404) {
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
            if (r.estatusId === 4) {
              r.coordinador = r.reclutadores;
              r.reclutadores = 'SIN ASIGNAR';
            }
          }
        });
        this.onChangeTable(this.config);
      } else {
        this.popToast('error',
          'Requisiciones',
          'Algo salió mal al intentar recuperar la información de las requisiciones, intente de nuevo.');
        this.spinner.hide();
      }

    });
  }

  ValidarEstatus(estatusId) {
    this.cubiertas = [];
    if (this.element.vacantes === 0 && estatusId !== 8 && estatusId !== 9) {
      this.gbc = true; // garantía busqueda candidato
      this.cubierta = true;
      this.cc = true; // cubierta por el cliente
      this.crm = true; // cubierta reclutamiento medios
      this.cp = true; // cubierta parcialmente
      this.cancelar = false;
      this.borrar = false;
      this.editar = false;
      this.candidatos = true;
    } else if (estatusId === 1 || estatusId === 4 || estatusId === 46) {
      this.gbc = true; // garantía busqueda candidato
      this.cubierta = false;
      if (this.element.contratados === 0) {
        this.cubiertas.push({ id: 37, descripcion: 'Cubierta por el cliente' },
          { id: 47, descripcion: 'Promoción interna' },
          { id: 48, descripcion: 'Operaciones' });
      } else {
        this.cubiertas.push({ id: 37, descripcion: 'Cubierta por el cliente' });
      }
      this.cc = false; // cubierta por el cliente
      this.crm = true; // cubierta reclutamiento medios
      this.cp = true; // cubierta parcialmente
      this.cancelar = false;
      this.borrar = false;
      this.editar = false;
      this.candidatos = true;

    } else if (estatusId === 8) {// cancelada
      this.gbc = true; // garantía busqueda candidato
      this.cubierta = true;
      this.cc = true; // cubierta por el cliente
      this.crm = true; // cubierta reclutamiento medios
      this.cp = true; // cubierta parcialmente
      this.cancelar = true;
      this.borrar = false;
      this.editar = true;
      this.candidatos = true;
    } else if (estatusId < 34 && estatusId !== 8 && this.element.enProceso > 0 && this.element.contratados === 0) {
      this.gbc = true;
      this.cubierta = false;
      this.cubiertas.push({ id: 37, descripcion: 'Cubierta por el cliente' },
        { id: 47, descripcion: 'Promoción interna' },
        { id: 48, descripcion: 'Operaciones' });
      this.cc = false; // cubierta por el cliente
      this.crm = true; // cubierta reclutamiento medios
      this.cp = true; // cubierta parcialmente
      this.cancelar = false;
      this.borrar = true;
      this.editar = true;
      this.candidatos = true;
    } else if (estatusId < 34 && estatusId !== 8 && this.element.postulados > 0 && this.element.contratados === 0) {
      this.gbc = true;
      this.cubierta = false;
      this.cc = false; // cubierta por el cliente
      this.cubiertas.push({ id: 37, descripcion: 'Cubierta por el cliente' },
        { id: 47, descripcion: 'Promoción interna' },
        { id: 48, descripcion: 'Operaciones' });

      this.crm = true; // cubierta reclutamiento medios
      this.cp = true; // cubierta parcialmente
      this.cancelar = false;
      this.borrar = true;
      this.editar = true;
    } else if (estatusId < 34 && estatusId !== 8 && this.element.vacantes > 0 && this.element.contratados === this.element.vacantes) {
      this.gbc = true; // garantía busqueda candidato
      this.cubierta = false;
      this.cubiertas.push({ id: 34, descripcion: 'Cubierta' }, { id: 36, descripcion: 'Cubierta por medios' });

      this.cc = true; // cubierta por el cliente
      this.crm = false; // cubierta reclutamiento medios
      this.cp = true; // cubierta parcialmente
      this.cancelar = true;
      this.borrar = true;
      this.editar = true;
      this.candidatos = false;
    } else if (estatusId < 34 && estatusId !== 8 && this.element.vacantes > 0
      && (this.element.contratados > 0 && this.element.contratados < this.element.vacantes)) {
      this.gbc = true; // garantía busqueda candidato
      this.cubierta = false;
      this.cc = false; // cubierta por el cliente
      this.cubiertas.push({ id: 35, descripcion: 'Cubierta parcialmente' });

      this.crm = true; // cubierta reclutamiento medios
      this.cp = false; // cubierta parcialmente
      this.cancelar = true;
      this.borrar = true;
      this.editar = true;
      this.candidatos = false;
    } else if (estatusId < 34 && estatusId !== 8 && (this.element.enProceso === 0 || this.element.postulados === 0)) {
      this.gbc = true;
      this.cubierta = false;
      this.cc = false; // cubierta por el cliente
      this.cubiertas.push({ id: 37, descripcion: 'Cubierta por el cliente' },
        { id: 47, descripcion: 'Promoción interna' },
        { id: 48, descripcion: 'Operaciones' });
      this.crm = true; // cubierta reclutamiento medios
      this.cp = true; // cubierta parcialmente
      this.cancelar = false;
      this.borrar = true;
      this.editar = true;
      this.candidatos = false;
    } else if (estatusId >= 34 && estatusId < 37 && this.element.tipoReclutamientoId === 1 && this.element.vacantes > 0) {
      this.gbc = false; // garantía busqueda candidato
      this.cubierta = true;
      this.cc = true; // cubierta por el cliente
      this.crm = true; // cubierta reclutamiento medios
      this.cp = true; // cubierta parcialmente
      this.cancelar = true;
      this.borrar = true;
      this.editar = true;
      this.candidatos = false;
    } else if (estatusId >= 34 && estatusId <= 37 && this.element.tipoReclutamientoId > 1 && this.element.vacantes > 0) {
      this.gbc = true; // garantía busqueda candidato
      this.cubierta = true;
      this.cc = true; // cubierta por el cliente
      this.crm = true; // cubierta reclutamiento medios
      this.cp = true; // cubierta parcialmente
      this.cancelar = true;
      this.borrar = true;
      this.editar = true;
      this.candidatos = true;
      this.candidatos = false;
    } else if (estatusId === 38 && this.element.vacantes > 0 && this.element.contratados === this.element.vacantes) {
      this.gbc = true; // garantía busqueda candidato
      this.cubierta = false;
      this.cubiertas.push({ id: 34, descripcion: 'Cubierta' }, { id: 36, descripcion: 'Cubierta por medios' });
      this.cc = true; // cubierta por el cliente
      this.crm = false; // cubierta reclutamiento medios
      this.cp = true; // cubierta parcialmente
      this.cancelar = true;
      this.borrar = true;
      this.editar = true;
      this.candidatos = false;
    } else if (estatusId === 38 && this.element.vacantes > 0 && this.element.contratados > 0
      && this.element.contratados < this.element.vacantes) {
      this.gbc = true; // garantía busqueda candidato
      this.cubierta = false;
      this.cc = false; // cubierta por el cliente
      this.cubiertas.push({ id: 35, descripcion: 'Cubierta parcialmente' });

      this.crm = true; // cubierta reclutamiento medios
      this.cp = false; // cubierta parcialmente
      this.cancelar = false;
      this.borrar = true;
      this.editar = true;
      this.candidatos = false;
    } else if (estatusId === 46 || estatusId === 44 || estatusId === 43) {
      this.gbc = true; // garantía busqueda candidato
      this.cubierta = true;
      this.cc = true; // cubierta por el cliente
      this.crm = true; // cubierta reclutamiento medios
      this.cp = true; // cubierta parcialmente
      this.cancelar = false;
      this.borrar = false;
      this.editar = false;
      this.candidatos = true;
    } else {
      this.gbc = true; // garantía busqueda candidato
      this.cubierta = true;
      this.cc = true; // cubierta por el cliente
      this.crm = true; // cubierta reclutamiento medios
      this.cp = true; // cubierta parcialmente
      this.cancelar = true;
      this.borrar = true;
      this.editar = true;
      this.candidatos = true;
    }

  }

  public changePage(page: any, data: Array<any> = this.dataSource): Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeFilter(data: any, config: any): any {
    let filteredData: Array<any> = data;

    this.columns.forEach((column: any) => {
      if (column.filtering.filterString != '') {
        this.showFilterRow = true;
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

    this.rows = this.dataSource;
    const filteredData = this.changeFilter(this.rows, this.config);
    this.rows = page && config.paging ? this.changePage(page, filteredData) : filteredData;
    this.registros = this.rows.length;
    this.length = filteredData.length;
    setTimeout(() => {
      this.spinner.hide();
    }, 700);

  }

  public onCellClick(data: any): any {
    data.selected ? data.selected = false : data.selected = true;
    this.RequisicionId = data.id;
    this.estatusId = data.estatusId;
    this.enProceso = data.enProceso;
    this.Folio = data.folio;
    this.Vacante = data.vBtra;
    this.element = data;

    this.ValidarEstatus(data.estatusId);
    if (!data.selected) {
      this.ValidarEstatus(9999)
      this.selected = false;
      this.element = [];
      this._reinciar();
    } else {
      this.selected = true;
      this.view = true;
      this.coment = true;
    }

    if (this.rowAux.length == 0) {
      this.rowAux = data;
    } else if (data.selected && this.rowAux !== []) {
      const aux = data;
      data = this.rowAux;
      data.selected = false;
      aux.selected = true;
      this.rowAux = aux;
    }
  }

  private _reinciar() {
    this.nbc = true; // nueva busqueda candidato
    this.contratado = true;
    this.cubierta = true;
    this.gbc = true; // garantía busqueda candidato
    this.cc = true; // cubierta por el cliente
    this.crm = true; // cubierta reclutamiento medios
    this.cp = true; // cubierta parcialmente
    this.borrar = true;
    this.cancelar = true;
    this.editar = true;
    this.view = false;
    this.coment = false;
    this.candidatos = true;
    this.totalPos = 0;
  }


  /*
  * Funciones para la administracion de las requisiciones.
  * */
  public refreshTable() {
    this.spinner.show();
    setTimeout(() => {
      this.columns.forEach(element => {
        (<HTMLInputElement>document.getElementById(element.name)).value = '';
        element.filtering.filterString = '';
      });
    }, 1000);
    this.estatusId = null;
    this.enProceso = null;
    this.element = [];
    this.ValidarEstatus(9999);
    this.getRequisiciones();
    // this.onChangeTable(this.config);
  }

  public clearfilters() {
    this.columns.forEach(element => {
      element.filtering.filterString = '';
      (<HTMLInputElement>document.getElementById(element.name)).value = '';
    });
    this.onChangeTable(this.config);
    this.estatusId = null;
    this.enProceso = null;
    this.element = [];
  }

  showRequi() {
    this._Router.navigate(['/ventas/visualizarRequisicion/', this.element.id, this.element.folio, this.Vacante, this.element.tipoReclutamientoId], { skipLocationChange: true });
  }

  editRequi() {
    this._Router.navigate(['/ventas/edicionRequisicion/', this.element.id, this.element.folio, this.element.estatusId, this.element.tipoReclutamientoId], { skipLocationChange: true });
  }

  updataStatus(estatusId, estatus) {
    var datos = { estatusId: estatusId, requisicionId: this.element.id }
    var emails = [];
    if (estatusId == 8) {
      var idx = this.rows.findIndex(x => x.id == this.element.id);

      this.rows[idx]['enProcesoN'].forEach(element => {
        emails.push({ requisicionId: this.RequisicionId, vacante: this.Vacante, email: element.email, nombre: element.nombre, candidatoId: element.candidatoId, estatusId: 27 })
      });

      this.rows[idx]['postuladosN'].forEach(element => {
        emails.push({ requisicionId: this.RequisicionId, vacante: this.Vacante, email: element.email, nombre: element.nombre, candidatoId: element.candidatoId, estatusId: 27 })
      })

      if (emails.length > 0) {
        this.postulacionservice.SendEmailsNoContratado(emails).subscribe(data => {
          //this.onChangeTable(this.config);
        });
      }
    }
    else {
      this.postulacionservice.SetProcesoVacante(datos).subscribe(data => {
        if (data == 201) {
          var idx = this.rows.findIndex(x => x.id == this.element.id);
          this.rows[idx]['estatus'] = estatus;
          this.rows[idx]['estatusId'] = estatusId;

          if (estatusId >= 34 && estatusId <= 37) {
            this.rows[idx]['enProcesoN'].forEach(element => {
              if (element.estatusId != 24 && element.estatusId != 42 && element.estatusId != 27 && element.estatusId != 28) {
                emails.push(
                  {
                    requisicionId: this.RequisicionId,
                    vacante: this.Vacante,
                    email: element.email,
                    nombre: element.nombre,
                    candidatoId: element.candidatoId,
                    estatusId: 27
                  }
                );
              }
            });

            this.rows[idx]['postuladosN'].forEach(element => {
              if (element.statusId == 1) {
                emails.push(
                  {
                    requisicionId: this.RequisicionId,
                    vacante: this.Vacante,
                    email: element.email,
                    nombre: element.nombre,
                    candidatoId: element.candidatoId,
                    estatusId: 27
                  }
                );
              }
            })
            if (emails.length > 0) {
              this.postulacionservice.SendEmailsNoContratado(emails).subscribe(data => {
              });
            }
          }

          this.ValidarEstatus(estatusId);

          this.onChangeTable(this.config);
          this.popToast('success', 'Estatus', 'Los datos se actualizaron con éxito');

        }
        else {
          this.popToast('error', 'Estatus', 'Ocurrió un error al intentar actualizar los datos');
        }

      })
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
        if (this.element.tipoReclutamientoId === 1) {
          this.SendEmail();
        }
      }
    });
  }

  openDialogCancel() {
    this.element.motivoId = 17;
    const dialogCnc = this.dialog.open(DialogCancelRequiComponent, {
      data: this.element
    });
    dialogCnc.afterClosed().subscribe(result => {
      if (result === 200) {
        this.updataStatus(8, 'Cancelar');
        this.ValidarEstatus(8);
        this.refreshTable();
        if (this.element.tipoReclutamientoId === 1) {
        }
        this.popToast('success', 'Cancelación', 'La requisicion se cancelo exitosamente, podrás consultarla en el Historico');
      }


    })
  }
  openDialogTransfer() {
    this.element.usuario = 10;
    this.element.depto = 'Vtas'
    let dialogCnc = this.dialog.open(DlgTransferComponent, {
      width: '50%',
      height: '95%',
      data: this.element
    });
    dialogCnc.afterClosed().subscribe(result => {
      if (result) {

        this.refreshTable();
      }
    })
  }
  openDialogCubrir() {
    let dialogCnc = this.dialog.open(DlgCubiertasComponent, {
      width: '35%',
      height: 'auto',
      data: this.cubiertas,
      disableClose: true
    });
    dialogCnc.afterClosed().subscribe(result => {
      if (result != 0) {
        this.updataStatus(result.id, result.descripcion);
        this.ValidarEstatus(result.id);
        this.refreshTable();
      }
    })
  }

  openDialogReActivar() {
    let dialogCnc = this.dialog.open(DialogActivarRequiComponent, {
      width: '25%',
      height: '100%',
      data: this.element
    });
    var window: Window
    dialogCnc.afterClosed().subscribe(result => {
      this.refreshTable();
    })
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

  exportAsXLSX() {
    if (this.dataSource.length > 0) {
      var aux = [];
      var comentarios = '';
      var reclutador = '';
      var coordinador = '';
      this.dataSource.forEach(row => {
        if (row.comentarioReclutador.length > 0) {
          row.comentarioReclutador.forEach(element => {
            comentarios = comentarios +
              element + '\n'
          });
        } else {
          comentarios = '';
        }

        if (!Array.isArray(row.reclutadores)) {
          reclutador = 'SIN ASIGNAR';
        } else if (row.reclutadores.length > 1) {
          row.reclutadores.forEach(element => {
            reclutador = reclutador + element + ', \n'
          });
        } else {
          reclutador = row.reclutadores[0];
        }
        const d = row.diasTrans;
        // var d = this.pipe.transform(new Date(row.fch_Creacion), 'dd/MM/yyyy');
        // var e = this.pipe.transform(new Date(row.fch_Modificacion), 'dd/MM/yyyy');

        if (row.estatusId == 4) {
          coordinador = reclutador;
          reclutador = 'SIN ASIGNAR'

        }
        else {
          coordinador = row.coordinador;
        }
        aux.push({
          FOLIO: row.folio.toString(),
          'DIAS TRANSCURRIDOS': d,
          // SOLICITANTE: row.solicita,
          EMPRESA: row.cliente,
          SUCURSAL: row.sucursal,
          NO: row.vacantes,
          CUBIERTOS: row.contratados,
          PUESTO: row.vBtra,
          SUELDO: row.sueldoMinimo.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) +
                  ' - ' + row.sueldoMaximo.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) ,
          ESTATUS: row.estatus,
          COORDINADOR: coordinador,
          RECLUTADOR: reclutador,
          'COMENTARIOS': comentarios
        });
        comentarios = '';
        reclutador = '';
      });

      //   })
      // })
      this.excelService.exportAsExcelFile(aux, 'Solicitud_de_reporte_para_generar_estadisticos');

    }
  }

  popToast(type, title, body) {
    const toast: Toast = {
      type: type,
      title: title,
      timeout: 5000,
      body: body
    }
    this.toasterService.pop(toast);
  }
}
