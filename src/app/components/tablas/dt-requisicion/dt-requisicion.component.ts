import { Component, OnInit } from '@angular/core';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { DatePipe } from '@angular/common';
import { DialogActivarRequiComponent } from '../../../routes/vtas/requisiciones/components/dialog-activar-requi/dialog-activar-requi.component';
import { DialogCancelRequiComponent } from '../../../routes/vtas/requisiciones/components/dialog-cancel-requi/dialog-cancel-requi.component';
import { DialogDeleteRequiComponent } from '../../../routes/vtas/requisiciones/components/dialog-delete-requi/dialog-delete-requi.component';
import { ExcelService } from './../../../service/ExcelService/excel.service';
import { MatDialog } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { PostulateService } from '../../../service/SeguimientoVacante/postulate.service';
import { RequisicionesService } from '../../../service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-dt-requisicion',
  templateUrl: './dt-requisicion.component.html',
  styleUrls: ['./dt-requisicion.component.scss'],
  providers: [RequisicionesService, PostulateService, DatePipe]
})

export class DtRequisicionComponent implements OnInit {
  //scroll
  disabled = false;
  compact = false;
  invertX = false;
  invertY = false;
  shown = 'hover';

  // Variables Globales
  public dataSource: Array<any> = [];
  Vacantes: number = 0;

  // Varaibles del paginador
  public page: number = 1;
  public itemsPerPage: number = 20;
  public maxSize: number = 5;
  public numPages: number = 1;
  public length: number = 0;

  selected: boolean = false;
  rowAux = [];


  showFilterRow: boolean;
  registros: number;
  errorMessage: any;
  element: any = [];

  estatusId: any;
  enProceso: any;

  requisicionId: any;

  //
  view: boolean = false;
  coment: boolean = false;
  candidatos: boolean = true;

  // Estatus
  nbc = true; //nueva busqueda candidato
  contratado = true;
  cubierta = true;
  gbc = true; //garantía busqueda candidato
  cc = true; //cubierta por el cliente
  crm = true; //cubierta reclutamiento medios
  cp = true; // cubierta parcialmente
  borrar = true;
  cancelar = true;
  editar = true;
  RequisicionId: any;
  Folio: any;
  Vacante: any;
  comentario: string;

  reporte70 = false;
  totalPos: number = 0;
  constructor(
    private service: RequisicionesService,
    private postulacionservice: PostulateService,
    private dialog: MatDialog,
    private _Router: Router,
    private spinner: NgxSpinnerService,
    private toasterService: ToasterService,
    private excelService: ExcelService,
    private pipe: DatePipe

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
    this.service.getRequisiciones(sessionStorage.getItem('id')).subscribe(data => {
      this.dataSource = data;
  
      this.dataSource.forEach(r => {
        this.totalPos += r.vacantes;
      })

     this.onChangeTable(this.config);
    }, error => this.errorMessage = <any>error);
  }

  public rows: Array<any> = [];
  public columns: Array<any> = [
    { title: 'Folio', sorting: 'desc', className: 'text-success text-center', name: 'folio', filtering: { filterString: '', placeholder: 'Folio' } },
    { title: 'Cliente', className: 'text-info text-center', name: 'cliente', filtering: { filterString: '', placeholder: 'Cliente' } },
    { title: 'Perfil', className: 'text-info text-center', name: 'vBtra', filtering: { filterString: '', placeholder: 'Perfil' } },
    { title: 'Cub/Vac', className: 'text-info text-center', name: 'vacantes', filtering: { filterString: '', placeholder: 'No.' } },
    { title: 'Tipo Recl.', className: 'text-info text-center', name: 'tipoReclutamiento', filtering: { filterString: '', placeholder: 'Tipo' } },
    // { title: 'Sueldo Mínimo', className: 'text-info text-center', name: 'sueldoMinimo', filtering: { filterString: '', placeholder: 'Sueldo Min' } },
    // { title: 'Sueldo Máximo', className: 'text-info text-center', name: 'sueldoMaximo', filtering: { filterString: '', placeholder: 'Sueldo Max' } },
    { title: 'Creación', className: 'text-info text-center', name: 'fch_Creacion', filtering: { filterString: '', placeholder: 'aaaa-mm-dd' } },
    { title: 'Fecha Cump.', className: 'text-info text-center', name: 'fch_Cumplimiento', filtering: { filterString: '', placeholder: 'aaaa-mm-dd' } },
    { title: 'Estatus', className: 'text-info text-center', name: 'estatus', filtering: { filterString: '', placeholder: 'Estatus' } },
    { title: 'Prioridad', className: 'text-info text-center', name: 'prioridad', filtering: { filterString: '', placeholder: 'Prioridad' } },
    { title: 'Propietario', className: 'text-info text-center', name: 'propietario', filtering: { filterString: '', placeholder: 'Propietario' } }
  ];

  ValidarEstatus(estatusId)
  {
    if(this.element.vacantes == 0 && estatusId != 8 && estatusId != 9 )
    {
      this.gbc = true; //garantía busqueda candidato
      this.cubierta = true;
      this.cc = true; //cubierta por el cliente
      this.crm = true; //cubierta reclutamiento medios
      this.cp = true; // cubierta parcialmente
      this.cancelar = false;
      this.borrar = false;
      this.editar = false;
      this.candidatos = true;
    }
    else if(estatusId == 1 || estatusId == 4 || estatusId == 46)
    {
      this.gbc = true; //garantía busqueda candidato
      this.cubierta = true;
      this.cc = false; //cubierta por el cliente
      this.crm = true; //cubierta reclutamiento medios
      this.cp = true; // cubierta parcialmente
      this.cancelar = false;
      this.borrar = false;
      this.editar = false;
      this.candidatos = true;

    }
    else if(estatusId == 8) //cancelada
    {
      this.gbc = true; //garantía busqueda candidato
      this.cubierta = true;
      this.cc = true; //cubierta por el cliente
      this.crm = true; //cubierta reclutamiento medios
      this.cp = true; // cubierta parcialmente
      this.cancelar = true;
      this.borrar = false;
      this.editar = true;
      this.candidatos = true;
    }
    else if( estatusId < 34 && estatusId != 8 && this.element.enProceso > 0 && this.element.contratados == 0)
    {
      this.gbc = true;
      this.cubierta = true;
      this.cc = false; //cubierta por el cliente
      this.crm = true; //cubierta reclutamiento medios
      this.cp = true; // cubierta parcialmente
      this.cancelar = false;
      this.borrar = true;
      this.editar = true;
      this.candidatos = true;
    }
    else if( estatusId < 34 && estatusId != 8 && this.element.postulados > 0 && this.element.contratados == 0)
    {
      this.gbc = true;
      this.cubierta = true;
      this.cc = false; //cubierta por el cliente
      this.crm = true; //cubierta reclutamiento medios
      this.cp = true; // cubierta parcialmente
      this.cancelar = false;
      this.borrar = true;
      this.editar = true

    }
    else if(estatusId < 34 && estatusId != 8 && this.element.vacantes > 0 && this.element.contratados == this.element.vacantes )
    {
      this.gbc = true; //garantía busqueda candidato
      this.cubierta = false;
      this.cc = true; //cubierta por el cliente
      this.crm = false; //cubierta reclutamiento medios
      this.cp = true; // cubierta parcialmente
      this.cancelar = true;
      this.borrar = true;
      this.editar = true;
      this.candidatos = false;
    }
    else if(estatusId < 34 && estatusId != 8 && this.element.vacantes > 0 && ( this.element.contratados > 0  && this.element.contratados < this.element.vacantes ) )
    {
      this.gbc = true; //garantía busqueda candidato
      this.cubierta = true;
      this.cc = true; //cubierta por el cliente
      this.crm = true; //cubierta reclutamiento medios
      this.cp = false; // cubierta parcialmente
      this.cancelar = true;
      this.borrar = true;
      this.editar = true;
      this.candidatos = false;
    }
    else if( estatusId < 34 && estatusId != 8 && (this.element.enProceso == 0 || this.element.postulados == 0))
    {
      this.gbc = true;
      this.cubierta = true;
      this.cc = false; //cubierta por el cliente
      this.crm = true; //cubierta reclutamiento medios
      this.cp = true; // cubierta parcialmente
      this.cancelar = false;
      this.borrar = true;
      this.editar = true;
      this.candidatos = false;
    }
    else if(estatusId >= 34 && estatusId < 37 && this.element.tipoReclutamientoId == 1 && this.element.vacantes > 0)
    {
      this.gbc = false; //garantía busqueda candidato
      this.cubierta = true;
      this.cc = true; //cubierta por el cliente
      this.crm = true; //cubierta reclutamiento medios
      this.cp = true; // cubierta parcialmente
      this.cancelar = true;
      this.borrar = true;
      this.editar = true;
      this.candidatos = false;
    }
    else if(estatusId >= 34 && estatusId <= 37 && this.element.tipoReclutamientoId > 1 && this.element.vacantes > 0)
    {
      this.gbc = true; //garantía busqueda candidato
      this.cubierta = true;
      this.cc = true; //cubierta por el cliente
      this.crm = true; //cubierta reclutamiento medios
      this.cp = true; // cubierta parcialmente
      this.cancelar = true;
      this.borrar = true;
      this.editar = true;
      this.candidatos = true;
      this.candidatos = false;
    }
    // else if( estatusId > 34 && estatusId <= 37 && this.element.vacantes > 0)
    // {
    //   this.gbc = true; //garantía busqueda candidato
    //   this.cubierta = true;
    //   this.cc = true; //cubierta por el cliente
    //   this.crm = true; //cubierta reclutamiento medios
    //   this.cp = true; // cubierta parcialmente
    //   this.cancelar = true;
    //   this.borrar = true;
    //   this.editar = true;
    // }
    else if(estatusId == 38 && this.element.vacantes > 0 && this.element.contratados == this.element.vacantes)
    {
      this.gbc = true; //garantía busqueda candidato
      this.cubierta = false;
      this.cc = true; //cubierta por el cliente
      this.crm = false; //cubierta reclutamiento medios
      this.cp = true; // cubierta parcialmente
      this.cancelar = true;
      this.borrar = true;
      this.editar = true;
      this.candidatos = false;
    }
    else if(estatusId == 38 && this.element.vacantes > 0 && this.element.contratados > 0 && this.element.contratados <= this.element.vacantes)
    {
      this.gbc = true; //garantía busqueda candidato
      this.cubierta = true;
      this.cc = false; //cubierta por el cliente
      this.crm = true; //cubierta reclutamiento medios
      this.cp = false; // cubierta parcialmente
      this.cancelar = false;
      this.borrar = true;
      this.editar = true;
      this.candidatos = false;
    }
    else if(estatusId == 46 || estatusId == 44 || estatusId == 43 )
    {
      this.gbc = true; //garantía busqueda candidato
      this.cubierta = true;
      this.cc = true; //cubierta por el cliente
      this.crm = true; //cubierta reclutamiento medios
      this.cp = true; // cubierta parcialmente
      this.cancelar = false;
      this.borrar = false;
      this.editar = false;
      this.candidatos = true;
    }
    else
    {
      this.gbc = true; //garantía busqueda candidato
      this.cubierta = true;
      this.cc = true; //cubierta por el cliente
      this.crm = true; //cubierta reclutamiento medios
      this.cp = true; // cubierta parcialmente
      this.cancelar = true;
      this.borrar = true;
      this.editar = true;
      this.candidatos = true;
    }

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

  public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
    if (config.filtering) {
      (<any>Object).assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      (<any>Object).assign(this.config.sorting, config.sorting);
    }

    this.rows = this.dataSource;
    let filteredData = this.changeFilter(this.dataSource, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
    this.registros = this.rows.length;
    this.spinner.hide();
  }

  public onCellClick(data: any): any {
    data.selected ? data.selected = false : data.selected = true;
    this.RequisicionId = data.id
    this.estatusId = data.estatusId;
    this.enProceso = data.enProceso;
    this.Folio = data.folio;
    this.Vacante = data.vBtra;
    this.element = data;

    this.ValidarEstatus(data.estatusId)
    if (!data.selected) {
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
    }
    else if (data.selected && this.rowAux != []) {
      var aux = data;
      data = this.rowAux;
      data.selected = false;
      aux.selected = true;
      this.rowAux = aux;
    }
  }

  private _reinciar() {
    this.nbc = true; //nueva busqueda candidato
    this.contratado = true;
    this.cubierta = true;
    this.gbc = true; //garantía busqueda candidato
    this.cc = true; //cubierta por el cliente
    this.crm = true; //cubierta reclutamiento medios
    this.cp = true; // cubierta parcialmente
    this.borrar = true;
    this.cancelar = true;
    this.editar = true;
    this.view = false;
    this.coment = false;
    this.candidatos = true;
  }


  /*
  * Funciones para la administracion de las requisiciones.
  * */
  public refreshTable() {
    this.getRequisiciones();
    setTimeout(() => {
      this.columns.forEach(element => {
       (<HTMLInputElement>document.getElementById(element.name)).value = '';
      });
      this.estatusId = null;
      this.enProceso = null;
      this.element = [];
      this.ValidarEstatus(9999);
    }, 1000);
  }

  public clearfilters(){
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
    this._Router.navigate(['/ventas/visualizarRequisicion/', this.element.id, this.element.folio, this.Vacante,this.element.tipoReclutamientoId], { skipLocationChange: true });
  }

  editRequi() {
    this._Router.navigate(['/ventas/edicionRequisicion/', this.element.id, this.element.folio, this.element.estatusId, this.element.tipoReclutamientoId], { skipLocationChange: true });
  }

  updataStatus(estatusId, estatus)
  {
    var datos = {estatusId: estatusId, requisicionId: this.element.id }
    var emails = [];
    if(estatusId == 8)
    {
      var idx = this.rows.findIndex(x => x.id == this.element.id);

        this.rows[idx]['enProcesoN'].forEach(element => {
            emails.push({ requisicionId: this.RequisicionId, vacante: this.Vacante, email: element.email, nombre: element.nombre, candidatoId: element.candidatoId, estatusId: 27 })
        });

        this.rows[idx]['postuladosN'].forEach(element => {
          emails.push({ requisicionId: this.RequisicionId, vacante: this.Vacante, email: element.email, nombre: element.nombre, candidatoId: element.candidatoId, estatusId: 27 })
        })

        if(emails.length > 0)
        {
          this.postulacionservice.SendEmailsNoContratado(emails).subscribe(data => {
          //this.onChangeTable(this.config);
          });
        }
    }
    else
    {
      this.postulacionservice.SetProcesoVacante(datos).subscribe(data => {
        if (data == 201) {
          var idx = this.rows.findIndex(x => x.id == this.element.id);
          this.rows[idx]['estatus'] = estatus;
          this.rows[idx]['estatusId'] = estatusId;

          if (estatusId >= 34 && estatusId <=37) {
            this.rows[idx]['enProcesoN'].forEach(element => {
              if(element.estatusId != 24 && element.estatusId != 42 && element.estatusId != 27 && element.estatusId != 28)
              {
                emails.push({ requisicionId: this.RequisicionId, vacante: this.Vacante, email: element.email, nombre: element.nombre, candidatoId: element.candidatoId, estatusId: 27 })
              }
            });

            this.rows[idx]['postuladosN'].forEach(element => {
              if(element.statusId == 1)
              {
                emails.push({ requisicionId: this.RequisicionId, vacante: this.Vacante, email: element.email, nombre: element.nombre, candidatoId: element.candidatoId, estatusId: 27 })
              }
            })
            if(emails.length > 0)
            {
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
      if(result == 200)
      {
        this.refreshTable();
        if(this.element.tipoReclutamientoId === 1){
          this.SendEmail();
        }
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
      if(result == 200)
      {
        this.updataStatus(8, 'Cancelar')
        this.ValidarEstatus(8);
        this.refreshTable();
        if(this.element.tipoReclutamientoId === 1){
          this.SendEmail();
        }
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
        this.popToast('success', 'Noticación', 'Se ha notificado por medio de correo electrónico a los usuarios correspondientes.');
      } else {
        this.popToast('error', 'Estatus', 'Ocurrió un error al intentar notificar por correo electrónico los cambios realizados.');
      }
    });
  }

  exportAsXLSX()
  {

    if(this.dataSource.length > 0)
    {
      var aux = [];
      var comentarios = "";
      var reclutador = "";
      this.dataSource.forEach(row => {
        if(row.comentarioReclutador.length > 0)
        {
          row.comentarioReclutador.forEach(element => {
            comentarios = comentarios +
                          element + '\n'
          });
        }
        else{
          comentarios = "";
        }

        if(row.reclutadores.length == 0)
        {
          reclutador = "SIN ASIGNAR";
        }
        else if(row.reclutadores.length > 1)
        {
          row.reclutadores.forEach(element => {
            reclutador = reclutador + element.reclutador + '\n'
          });
        }
        else
        {
          reclutador = row.reclutadores[0].reclutador;
        }
        var d = this.pipe.transform(new Date(row.fch_Creacion), 'dd/MM/yyyy');
        var e = this.pipe.transform( new Date(row.fch_Modificacion), 'dd/MM/yyyy');

        aux.push({
          FOLIO: row.folio.toString(),
          'FECHA SOLICITUD': d,//new Date(d.getFullYear() + '-' + (d.getMonth()) + '-' + d.getDate()).toString(),
          SOLICITANTE: row.propietario,
          EMPRESA: row.cliente,
          SUCURSAL: row.sucursal,
          NO: row.vacantes,
          CUBIERTOS: row.contratados,
          PUESTO: row.vBtra,
          SUELDO:  row.sueldoMinimo.toLocaleString('en-US', {style: 'currency', currency: 'USD'}),
          ESTATUS: row.estatus,
          'FECHA ESTATUS': e,
          COORDINADOR: row.coordinador,
          RECLUTADOR: reclutador,
          'COMENTARIOS': comentarios
        })
        comentarios = "";
        reclutador = "";
      });

      //   })
      // })
      this.excelService.exportAsExcelFile(aux, 'Solicitud_de_reporte_para_generar_estadisticos');

    }
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
