import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { DialogAssingRequiComponent } from '../dialogs/dialog-assing-requi/dialog-assing-requi.component';
import { DialogShowRequiComponent } from '../dialogs/dialog-show-requi/dialog-show-requi.component';
import { MatDialog } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { RequisicionesService } from '../../../../../../service';
import { ToasterService } from 'angular2-toaster';

declare var $: any;

@Component({
  selector: 'app-dt-vacantes-reclutador',
  templateUrl: './dt-vacantes-reclutador.component.html',
  styleUrls: ['./dt-vacantes-reclutador.component.scss'],
  providers: [RequisicionesService]
})
export class DtVacantesReclutadorComponent implements OnInit {
  public dataSource : Array<any> = [];
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
  element: any = {};

  estatusId: any;
  enProceso: any;
  requi: { folio: any; id: any; };
  vBtra: any;
  id: any;
  folio: any;

  constructor(
    private service: RequisicionesService,
    private dialog: MatDialog,
    private _Router: Router,
    private spinner: NgxSpinnerService,
  ) {}

   ngOnInit() {
    this.spinner.show();
    // setTimeout(() => {
      this.onChangeTable(this.config);
    // }, 300); 
  }

  public rows: Array<any> = [];
  public columns: Array<any> = [
    {title: 'Folio',  className: 'text-info text-center', name:'folio', filtering: { filterString: '', placeholder: 'Folio' } },
    {title: 'Solicita',  className: 'text-info text-center', name:'solicita', filtering: { filterString: '', placeholder: 'Solicita' } },
    {title: 'Cliente',  className: 'text-info text-center', name: 'cliente', filtering: { filterString: '', placeholder: 'Cliente' } },
    {title: 'Perfil',  className: 'text-info text-center', name: 'vBtra', filtering: { filterString: '', placeholder: 'Perfil' }},
    {title: 'No. Vacantes',  className: 'text-info text-center', name: 'vacantes', filtering: { filterString: '', placeholder: 'No. Vacantes' }},
    {title: 'Tipo Recl.',  className: 'text-info text-center', name:'tipoReclutamiento', filtering: { filterString: '', placeholder: 'Tipo' } },
    {title: 'Clase Recl.',  className: 'text-info text-center', name:'claseReclutamiento', filtering: { filterString: '', placeholder: 'Clase' } },
    {title: 'Sueldo Mínimo',  className: 'text-info text-center', name: 'sueldoMinimo', filtering: { filterString: '', placeholder: 'Sueldo Min' }},
    {title: 'Sueldo Máximo',  className: 'text-info text-center', name: 'sueldoMaximo', filtering: { filterString: '', placeholder: 'Sueldo Max' }},
    {title: 'Creación',  className: 'text-info text-center',name:'fch_Creacion', filtering: { filterString: '', placeholder: 'aaaa-mm-dd' }},
    {title: 'Cumplimiento',  className: 'text-info text-center', name:'fch_Cumplimiento', filtering: { filterString: '', placeholder: 'aaaa-mm-dd' }},
    {title: 'Estatus',  className: 'text-info text-center', name: 'estatus', filtering: { filterString: '', placeholder: 'Estatus' }},
    {title: 'Prioridad',  className: 'text-info text-center', name:'prioridad', filtering: { filterString: '', placeholder: 'Prioridad' }},
    {title: 'Postulados',  className: 'text-info text-center', name:'postulados', filtering: { filterString: '', placeholder: 'Postulados' }},
    {title: 'En Proceso',  className: 'text-info text-center', name:'enProceso', filtering: { filterString: '', placeholder: 'Proceso' }},
  ];

  public config: any = {
    paging: true,
    sorting: { columns: this.columns },
    filtering: { filterString: '' },
    className: ['table-striped table-bordered mb-0 d-table-fixed']
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
            // return sort === false ? -1 : 1;
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
              if(item[column.name] != null)
                return item[column.name].toString().match(column.filtering.filterString);
            });
        }
    });

    if (!config.filtering) {
        return filteredData;
    }

    if (config.filtering.columnName) {
        return filteredData.filter((item: any) =>
            item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    let tempArray: Array<any> = [];
    filteredData.forEach((item: any) => {
        let flag = false;
        this.columns.forEach((column: any) => {
          if(item[column.name] == null){
            flag = true;
          }else{
            if (item[column.name].toString().match(this.config.filtering.filterString)) {
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
    this.getVacantes();
    setTimeout(() => {
      this.registros = this.dataSource.length;
      this.rows = this.dataSource;
      let filteredData = this.changeFilter(this.dataSource, this.config);
      let sortedData = this.changeSort(filteredData, this.config);
      this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
      this.length = sortedData.length;
      this.spinner.hide();
    }, 300);
    
  }

  public getVacantes(){
    this.dataSource = [];
    this.service.getRequiReclutador(localStorage.getItem('id')).subscribe(data => {
      data.forEach(x => {
        let solicita = x.solicita.nombre + ' ' + x.solicita.apellidoPaterno;
        let source = {
          id: x.id,
          vBtra: x.vBtra,
          tipoReclutamiento: x.tipoReclutamiento,
          tipoReclutamientoId: x.tipoReclutamientoId,
          claseReclutamiento: x.claseReclutamiento,
          claseReclutamientoId: x.claseReclutamientoId,
          diasEnvio: x.diasEnvio,
          sueldoMinimo: x.sueldoMinimo,
          sueldoMaximo: x.sueldoMaximo,
          fch_Creacion: x.fch_Creacion,
          fch_Cumplimiento: x.fch_Cumplimiento,
          estatus: x.estatus,
          estatusId: x.estatusId,
          prioridad: x.prioridad,
          prioridadId: x.prioridadId,
          cliente: x.cliente,
          vacantes: x.vacantes,
          solicita: solicita, 
          folio: x.folio,
          confidencial: x.confidencial,
          postulados: x.postulados,
          postuladosN: x.postuladosN,
          enProceso: x.enProceso,
        }
        console.log(source);
        this.dataSource.push(source);
      });
    });
  }

  public onCellClick(data: any): any {
    let index = this.dataSource.indexOf(data.row);
    this.estatusId = data.estatusId;
    this.element = data;
    this.vBtra = data.vBtra;
    this.id = data.id;
    this.folio = data.folio;
    this.requi = {
      folio : data.folio,
      id : data.id
    }
    console.log(this.requi);
    /* add an class 'active' on click */
    $('#resultDataTable').on('click', 'tr', function (event: any) {
        //noinspection TypeScriptUnresolvedFunction
        $(this).addClass('selected').siblings().removeClass('selected');
    });
  }

 /*
  * Funciones para la administracion de las requisiciones.
  * */
  openDialogShowRequi(){
      
      let dialogShow = this.dialog.open(DialogShowRequiComponent, {
        width: '1200px',
        height: '700px',
        data: this.requi
      });    
      dialogShow.afterClosed().subscribe(result => {
        this.onChangeTable(this.config);
      });
  }
  openDialogAssingRequi(){
    let dialogAssing = this.dialog.open(DialogAssingRequiComponent, {
      width: '1200px',
      height: 'auto',
      data: this.element
    });   
    dialogAssing.afterClosed().subscribe(result => {
      this.onChangeTable(this.config);
    });
  }

  openDesignVacante(){
    this._Router.navigate(['/reclutamiento/configuracionVacante/', this.id, this.folio, this.vBtra], {skipLocationChange:true});
  }
}

