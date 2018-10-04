import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { DialogActivarRequiComponent } from '../../../routes/vtas/requisiciones/components/dialog-activar-requi/dialog-activar-requi.component';
import { DialogCancelRequiComponent } from '../../../routes/vtas/requisiciones/components/dialog-cancel-requi/dialog-cancel-requi.component';
import { DialogDeleteRequiComponent } from '../../../routes/vtas/requisiciones/components/dialog-delete-requi/dialog-delete-requi.component';
import { MatDialog } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { PostulateService } from '../../../service/SeguimientoVacante/postulate.service';
import { RequisicionesService } from '../../../service';

declare var $: any;

@Component({
  selector: 'app-dt-requisicion',
  templateUrl: './dt-requisicion.component.html',
  styleUrls: ['./dt-requisicion.component.scss'],
  providers: [RequisicionesService, PostulateService]
})

export class DtRequisicionComponent implements OnInit {
  // Variables Globales
  public dataSource: Array<any> = [];
  Vacantes: number = 0;

  // Varaibles del paginador
  public page: number = 1;
  public itemsPerPage: number = 20;
  public maxSize: number = 5;
  public numPages: number = 1;
  public length: number = 0;

  showFilterRow: boolean;
  registros: number;
  errorMessage: any;
  element: any = null;

  estatusId: any;
  enProceso: any;

  requisicionId: any;

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

  constructor(
    private service: RequisicionesService,
    private postulacionservice: PostulateService,
    private dialog: MatDialog,
    private _Router: Router,
    private spinner: NgxSpinnerService,
    private toasterService: ToasterService

  ) { }

  ngOnInit(): void {
    /** spinner starts on init */
    this.spinner.show();
    this.getRequisiciones();

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.onChangeTable(this.config);
    }, 1500);

  }

  getRequisiciones() {
    this.service.getRequisiciones(sessionStorage.getItem('usuario')).subscribe(data => {
      this.dataSource = data;
    }, error => this.errorMessage = <any>error);
  }

  public rows: Array<any> = [];
  public columns: Array<any> = [
    { title: 'Folio', sorting: 'desc', className: 'text-success text-center', name: 'folio', filtering: { filterString: '', placeholder: 'Folio' } },
    { title: 'Cliente', className: 'text-info text-center', name: 'cliente', filtering: { filterString: '', placeholder: 'Cliente' } },
    { title: 'Perfil', className: 'text-info text-center', name: 'vBtra', filtering: { filterString: '', placeholder: 'Perfil' } },
    { title: 'No. Vacantes', className: 'text-info text-center', name: 'vacantes', filtering: { filterString: '', placeholder: 'No. Vacantes' } },
    { title: 'Sueldo Mínimo', className: 'text-info text-center', name: 'sueldoMinimo', filtering: { filterString: '', placeholder: 'Sueldo Min' } },
    { title: 'Sueldo Máximo', className: 'text-info text-center', name: 'sueldoMaximo', filtering: { filterString: '', placeholder: 'Sueldo Max' } },
    { title: 'Creación', className: 'text-info text-center', name: 'fch_Creacion', filtering: { filterString: '', placeholder: 'aaaa-mm-dd' } },
    { title: 'Cumplimiento', className: 'text-info text-center', name: 'fch_Cumplimiento', filtering: { filterString: '', placeholder: 'aaaa-mm-dd' } },
    { title: 'Estatus', className: 'text-info text-center', name: 'estatus', filtering: { filterString: '', placeholder: 'Estatus' } },
    { title: 'Prioridad', className: 'text-info text-center', name: 'prioridad', filtering: { filterString: '', placeholder: 'Prioridad' } },
  ];

  ValidarEstatus(estatusId)
  {
    if(estatusId == 1 || estatusId == 4)
    {
      this.gbc = true; //garantía busqueda candidato
      this.cubierta = true;
      this.cc = true; //cubierta por el cliente
      this.crm = true; //cubierta reclutamiento medios
      this.cp = true; // cubierta parcialmente
      this.cancelar = false;
      this.borrar = false;
      this.editar = false;

    }
    else if(estatusId == 8) //cancelada
    {
      this.gbc = true; //garantía busqueda candidato
      this.cubierta = true;
      this.cc = true; //cubierta por el cliente
      this.crm = true; //cubierta reclutamiento medios
      this.cp = true; // cubierta parcialmente
      this.cancelar = true;
      this.borrar = true;
      this.editar = true;
    }
    else if( estatusId < 34 && this.element.enProceso > 0 && this.element.contratados == 0)
    {
      this.gbc = true;
      this.cubierta = true;
      this.cc = true; //cubierta por el cliente
      this.crm = true; //cubierta reclutamiento medios
      this.cp = true; // cubierta parcialmente
      this.cancelar = false;
      this.borrar = true;
      this.editar = false;
    }
    else if( estatusId < 34 && this.element.postulados > 0 && this.element.contratados == 0)
    {
      this.gbc = true;
      this.cubierta = true;
      this.cc = true; //cubierta por el cliente
      this.crm = true; //cubierta reclutamiento medios
      this.cp = true; // cubierta parcialmente
      this.cancelar = false;
      this.borrar = true;
      this.editar = false
    }
    else if(estatusId < 34 && this.element.contratados == this.element.vacantes )
    {
      this.gbc = true; //garantía busqueda candidato
      this.cubierta = false;
      this.cc = true; //cubierta por el cliente
      this.crm = false; //cubierta reclutamiento medios
      this.cp = true; // cubierta parcialmente
      this.cancelar = true;
      this.borrar = true;
      this.editar = false;
    }
    else if(estatusId < 34 && ( this.element.contratados > 0  && this.element.contratados < this.element.vacantes ) )
    {
      this.gbc = true; //garantía busqueda candidato
      this.cubierta = true;
      this.cc = false; //cubierta por el cliente
      this.crm = true; //cubierta reclutamiento medios
      this.cp = false; // cubierta parcialmente
      this.cancelar = true;
      this.borrar = true;
      this.editar = false;
    }
    else if( estatusId < 34 && (this.element.enProceso == 0 || this.element.postulados == 0))
    {
      this.gbc = true;
      this.cc = true; //cubierta por el cliente
      this.crm = true; //cubierta reclutamiento medios
      this.cp = true; // cubierta parcialmente
      this.cancelar = false;
      this.borrar = true;
      this.editar = false;
    }
    else if(estatusId == 34 || estatusId == 36 && this.element.tipoReclutamientoId == 1)
    {
      this.gbc = false; //garantía busqueda candidato
      this.cubierta = true;
      this.cc = true; //cubierta por el cliente
      this.crm = true; //cubierta reclutamiento medios
      this.cp = true; // cubierta parcialmente
      this.cancelar = true;
      this.borrar = true;
      this.editar = true;
    }
    else if(estatusId == 34 && this.element.tipoReclutamientoId > 1)
    {
      this.gbc = true; //garantía busqueda candidato
      this.cubierta = true;
      this.cc = true; //cubierta por el cliente
      this.crm = true; //cubierta reclutamiento medios
      this.cp = true; // cubierta parcialmente
      this.cancelar = true;
      this.borrar = true;
      this.editar = true;
    }
    else if( estatusId > 34 && estatusId <= 37 )
    {
      this.gbc = true; //garantía busqueda candidato
      this.cubierta = true;
      this.cc = true; //cubierta por el cliente
      this.crm = true; //cubierta reclutamiento medios
      this.cp = true; // cubierta parcialmente
      this.cancelar = true;
      this.borrar = true;
      this.editar = true;
    }
    else if(estatusId == 9999)
    {
      this.gbc = true; //garantía busqueda candidato
      this.cubierta = true;
      this.cc = true; //cubierta por el cliente
      this.crm = true; //cubierta reclutamiento medios
      this.cp = true; // cubierta parcialmente
      this.cancelar = true;
      this.borrar = true;
      this.editar = true;
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
    this.registros = this.dataSource.length;
    this.rows = this.dataSource;
    let filteredData = this.changeFilter(this.dataSource, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
    this.spinner.hide();
  }

  public onCellClick(data: any): any {
    this.RequisicionId = data.id
    this.estatusId = data.estatusId;
    this.enProceso = data.enProceso;
    this.Folio = data.folio;
    this.Vacante = data.vBtra;
    this.element = data;
    
    this.ValidarEstatus(data.estatusId)
    /* add an class 'active' on click */
    $('#resultDataTable').on('click', 'tr', function (event: any) {
      //noinspection TypeScriptUnresolvedFunction
      $(this).addClass('selected').siblings().removeClass('selected');
    });
  }


  /*
  * Funciones para la administracion de las requisiciones.
  * */
  public refreshTable() {
    this.getRequisiciones();
    setTimeout(() => {
      this.columns.forEach(element => {
        element.filtering.filterString = '';
       (<HTMLInputElement>document.getElementById(element.name)).value = '';
      });
      this.onChangeTable(this.config);
      this.estatusId = null;
      this.enProceso = null;
      this.element = null;
      this.ValidarEstatus(9999);
    }, 300);
  }

  public clearfilters(){
    this.columns.forEach(element => {
      element.filtering.filterString = '';
     (<HTMLInputElement>document.getElementById(element.name)).value = '';
    });
    this.onChangeTable(this.config);
    this.estatusId = null;
    this.enProceso = null;
    this.element = null;
  }

  showRequi() {
    this._Router.navigate(['/ventas/visualizarRequisicion/', this.element.id, this.element.folio, this.Vacante], { skipLocationChange: true });
  }

  editRequi() {
    this._Router.navigate(['/ventas/edicionRequisicion/', this.element.id, this.element.folio], { skipLocationChange: true });
  }

  updataStatus(estatusId, estatus)
  {
    debugger;
    var datos = {estatusId: estatusId, requisicionId: this.element.id }
    var emails = [];
    if(estatusId == 8)
    {
      var idx = this.rows.findIndex(x => x.id == this.element.id);
      if (this.rows[idx]['enProceso'] > 0 || this.rows[idx]['Postulados'] > 0) {
        this.rows[idx]['enProcesoN'].forEach(element => {
            emails.push({ requisicionId: this.RequisicionId, vacante: this.Vacante, email: element.email, nombre: element.nombre, candidatoId: element.candidatoId, estatusId: 27 })
        });

        this.rows[idx]['postuladosN'].forEach(element => {
          emails.push({ requisicionId: this.RequisicionId, vacante: this.Vacante, email: element.email, nombre: element.nombre, candidatoId: element.candidatoId, estatusId: 27 })
        })

        this.postulacionservice.SendEmailsNoContratado(emails).subscribe(data => {
          console.log(data)
  

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

          if (this.rows[idx]['enProceso'] > 0 || this.rows[idx]['Postulados'] > 0 && (estatusId >= 34 && estatusId <=37 || estatusId == 8)) {
            this.rows[idx]['enProcesoN'].forEach(element => {
              if(element.estatusId != 24)
              {
                emails.push({ requisicionId: this.RequisicionId, vacante: this.Vacante, email: element.email, nombre: element.nombre, candidatoId: element.candidatoId, estatusId: 27 })
              }
            });

            this.rows[idx]['postuladosN'].forEach(element => {
              if(element.statusId != 5 && element.statusId != 6)
              {
                emails.push({ requisicionId: this.RequisicionId, vacante: this.Vacante, email: element.email, nombre: element.nombre, candidatoId: element.candidatoId, estatusId: 27 })
              }
            })

            this.postulacionservice.SendEmailsNoContratado(emails).subscribe(data => {
              console.log(data)
            });
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
      width: '25%',
      height: 'auto',
      data: this.element
    });
    var window: Window
    dialogDlt.afterClosed().subscribe(result => {
      
      this.refreshTable();
      this.ValidarEstatus(8);
    });
  }

  openDialogCancel() {
    let dialogCnc = this.dialog.open(DialogCancelRequiComponent, {
      width: '25%',
      height: 'auto',
      data: this.element
    });
    var window: Window
    dialogCnc.afterClosed().subscribe(result => {
      if(result == 1)
      {
        this.updataStatus(8, 'Cancelar')
      }
      this.ValidarEstatus(8);
      this.refreshTable();
    })
  }

  openDialogReActivar() {
    let dialogCnc = this.dialog.open(DialogActivarRequiComponent, {
      width: '25%',
      height: 'auto',
      data: this.element
    });
    var window: Window
    dialogCnc.afterClosed().subscribe(result => {
      this.refreshTable();
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
