import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';
import { RequisicionesService } from './../../../service/requisiciones/requisiciones.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DialogDeleteRequiComponent } from '../../../routes/vtas/requisiciones/components/dialog-delete-requi/dialog-delete-requi.component';
import { MatDialog } from '@angular/material';
import { DialogCancelRequiComponent } from '../../../routes/vtas/requisiciones/components/dialog-cancel-requi/dialog-cancel-requi.component';
import { DlgFacturaPuroComponent } from '../../dlg-factura-puro/dlg-factura-puro.component';
import { PostulateService } from '../../../service/SeguimientoVacante/postulate.service';

@Component({
  selector: 'app-dt-requisicion-recl-puro',
  templateUrl: './dt-requisicion-recl-puro.component.html',
  styleUrls: ['./dt-requisicion-recl-puro.component.scss'],
  providers: [RequisicionesService]
})
export class DtRequisicionReclPuroComponent implements OnInit, AfterViewInit {

  dataSource = [];
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
   element: any = [];

   requisicionId: any;
   Vacante: any;
  RequisicionId: any;
  estatusId: any;
  Folio: any;
  row = [];
  rowAux: any = [];

  facturar = false;
  cancelar = false;
  borrar = false;
  autorizar = false;

  constructor(private service: RequisicionesService, private spinner: NgxSpinnerService,
     private _Router: Router,
     private dialog: MatDialog,
     private toasterService: ToasterService,
     private postulacionservice: PostulateService) { }

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

  ngAfterViewInit() {
    setTimeout(() => {
      this.onChangeTable(this.config);
    }, 1500);

  }

  GetRequisicionesPuro()
  {
    this.service.GetRequiTipoRecl(sessionStorage.getItem('id'), 1).subscribe(data => {
      this.dataSource = data;
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

  public refreshTable() {
    this.GetRequisicionesPuro();
    setTimeout(() => {
      this.columns.forEach(element => {
        element.filtering.filterString = '';
       (<HTMLInputElement>document.getElementById(element.name)).value = '';
      });
      this.onChangeTable(this.config);
    }, 300);
  }

  public clearfilters(){
    this.columns.forEach(element => {
      element.filtering.filterString = '';
     (<HTMLInputElement>document.getElementById(element.name)).value = '';
    });
    this.onChangeTable(this.config);

  }

  public onCellClick(data: any): any {
  
    data.selected ? data.selected = false : data.selected = true;
    this.RequisicionId = data.id
    this.estatusId = data.estatusId;
    this.Folio = data.folio;
    this.Vacante = data.vBtra;
    this.element = data;
    
    this.row = data;

    this.ValidarEstatus(data.estatusId);

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

  updataStatus(estatusId, estatus)
  {
    var datos = {estatusId: estatusId, requisicionId: this.RequisicionId }
   
      this.postulacionservice.SetProcesoVacante(datos).subscribe(data => {
        if (data == 201) {
          var idx = this.rows.findIndex(x => x.id == this.RequisicionId);
          this.rows[idx]['estatus'] = estatus;
          this.rows[idx]['estatusId'] = estatusId;
          
        

          this.ValidarEstatus(estatusId);

          this.refreshTable();
          this.popToast('success', 'Estatus', 'Los datos se actualizaron con éxito');

        }
        else {
          this.popToast('error', 'Estatus', 'Ocurrió un error al intentar actualizar los datos');
        }

      })
  }
  

  ValidarEstatus(estatusId)
  {
    if(estatusId == 43)
    {
      this.facturar = true;
      this.cancelar = true;
      this.borrar = true;
      this.autorizar = false;
    }
    else if(estatusId == 44)
    {
      this.facturar = false;
      this.cancelar = true;
      this.borrar = false;
      this.autorizar = true;
    }
    else if(estatusId == 45)
    {
      this.facturar = false;
      this.cancelar = true;
      this.borrar = false;
      this.autorizar = true;
    }
    else if(estatusId == 8)
    {
      this.facturar = false;
      this.cancelar = false;
      this.borrar = true;
      this.autorizar = false;
    }
    else if(estatusId == 46)
    {
      this.facturar = false;
      this.cancelar = false;
      this.borrar = false;
      this.autorizar = false;
    }
    else if(estatusId == 4)
    {
      this.facturar = true;
      this.cancelar = false;
      this.borrar = false;
      this.autorizar = false;

    }
  }
  showRequi() {
    this._Router.navigate(['/ventas/visualizarRequisicion/', this.element.id, this.element.folio, this.Vacante], { skipLocationChange: true });
  }

  editRequi() {
    this._Router.navigate(['/ventas/edicionRequisicion/', this.element.id, this.element.folio], { skipLocationChange: true });
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
        // this.updataStatus(8, 'Cancelar')
        // this.ValidarEstatus(8);
        this.refreshTable();
      }
      
      
    })
  }

  openDialogFactura() {
    console.log(this.row)
    let dialogDlt = this.dialog.open(DlgFacturaPuroComponent, {
      disableClose: true,
      data: this.row
    });
    var window: Window
    dialogDlt.afterClosed().subscribe(result => {
      if(result.Ok == 200)
      {
        this.postulacionservice.SetProcesoVacante({estatusId: result.estatus, requisicionId: this.RequisicionId}).subscribe(data =>{

          if(data == 201)
          {
            
            this.popToast('success', 'Estatus', 'Los datos se actualizaron con éxito');
            this.refreshTable();


          }
          else
          {
            this.popToast('error', 'Estatus', 'Ocurrio un error al intentar actualizar datos');
          }

        })
       
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
