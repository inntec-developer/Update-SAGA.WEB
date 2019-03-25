import { AppComponent } from './../../../app.component';

import { Component, OnInit, Input } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { VacantesService } from '../../../service/TrackingVacantes/vacantes.service';

@Component({
  selector: 'app-vacantes',
  templateUrl: './vacantes.component.html',
  styleUrls: ['./vacantes.component.css'],
  providers: [VacantesService, NgxSpinnerService]
})
export class VacantesComponent implements OnInit {

  @Input() public clienteId;

  //config scroll
  disabled = false;
  compact = false;
  invertX = true;
  invertY = true;
  shown = 'hover';

  //table paginador
  registrosInfo: number;
  public dataInfoRequi: Array<any> = [];
  public rowsInfo: Array<any> = [];
  public pageInfo: number = 1;
  public itemsPerPageInfo: number = 20;
  public maxSizeInfo: number = 5;
  public numPagesInfo: number = 1;
  public lengthInfo: number = 0;
  clearFilter: boolean = false;

  public columnsInfo: Array<any> = [
    { title: 'FOLIO', className: 'text-success text-center', name: 'folio', filtering: { filterString: '', placeholder: 'FOLIO' } },
    { title: 'PERFIL', className: 'text-info text-center', name: 'vBtra', filtering: { filterString: '', placeholder: 'PERFIL' } },
    // { title: 'CLIENTE', className: 'text-info text-center', name: 'cliente', filtering: { filterString: '', placeholder: 'CLIENTE' } },
    { title: 'FECHA LÍMITE', className: 'text-info text-center', name: 'fch_limite', filtering: { filterString: '', placeholder: 'FECHA LIMITE' } },
    { title: 'ESTATUS', className: 'text-info text-center', name: 'estatus', filtering: { filterString: '', placeholder: 'ESTATUS' } },
    { title: '# VACANTES', className: 'text-info text-center', name: 'vacantes', filtering: { filterString: '', placeholder: '# VACANTES' } },
    { title: '% AVANCE', className: 'text-info text-center', name: 'porcentaje', filtering: { filterString: '', placeholder: '% AVANCE' } },
    { title: 'POSTULADOS', className: 'text-info text-center', name: 'postulados', filtering: { filterString: '', placeholder: 'POSTULADOS' } },
    { title: 'ENTREVISTA', className: 'text-info text-center', name: 'entrevista', filtering: { filterString: '', placeholder: 'ENTREVISTA' } },
    { title: 'ABANDONÓ PROCESO', className: 'text-info text-center', name: 'abandono', filtering: { filterString: '', placeholder: 'ABANDONÓ PROCESO' } },
    { title: 'DESCARTADOS', className: 'text-info text-center', name: 'descartados', filtering: { filterString: '', placeholder: 'DESCARTADOS' } },
    { title: 'ENVIADO CLIENTE', className: 'text-info text-center', name: 'enviados', filtering: { filterString: '', placeholder: 'ENVIADO CLIENTE' } },
    { title: 'RECHAZADOS', className: 'text-info text-center', name: 'rechazados', filtering: { filterString: '', placeholder: 'RECHAZADOS' } },
    { title: 'CONTRATADOS', className: 'text-info text-center', name: 'contratados', filtering: { filterString: '', placeholder: 'CONTRATADOS' } }
  ];

  constructor(private service: VacantesService, private spinner: NgxSpinnerService, private _appcomponent: AppComponent) { }

  ngOnInit() {
    this.getInfoVacantes();
  }

  getInfoVacantes() {
    this.service.GetInformeRequisiciones(this.clienteId).subscribe(data => {
      this.dataInfoRequi = data;
      this.rowsInfo= data;
      // this._appcomponent.nombreCliente = this.dataInfoRequi[0].cliente;
      // sessionStorage.setItem('nombreCliente', this.dataInfoRequi[0].cliente)

    });
  }

  public config: any = {
    paging: true,
    //sorting: { columns: this.columns },
    filtering: { filterString: '' },
    className: ['table-hover mb-0 ']
  };

  public changePageInfo(page: any, data: Array<any> = this.dataInfoRequi): Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeFilterInfo(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columnsInfo.forEach((column: any) => {
      this.clearFilter = true;
      if (column.filtering) {
       // this.showFilterRowInfo = true;
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
      this.columnsInfo.forEach((column: any) => {
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

  public onChangeTableInfo(config: any, page: any = { page: this.pageInfo, itemsPerPage: this.itemsPerPageInfo }): any {
    if (config.filtering) {
      (<any>Object).assign(this.config.filtering, config.filtering);
    }

    // if (config.sorting) {
    //   (<any>Object).assign(this.config.sorting, config.sorting);
    // }

    this.registrosInfo = this.dataInfoRequi.length;
    this.rowsInfo = this.dataInfoRequi;
    let filteredData = this.changeFilterInfo(this.dataInfoRequi, this.config);
    //let sortedData = this.changeSort(filteredData, this.config);
    this.rowsInfo = page && config.paging ? this.changePageInfo(page, filteredData) : filteredData;
    this.lengthInfo =  filteredData.length;
    setTimeout(() => {
      this.spinner.hide();
    }, 500);


  }

  public refreshTableInfo() {
    this.getInfoVacantes();  
    setTimeout(() => {
      this.columnsInfo.forEach(element => {
        element.filtering.filterString = '';
        (<HTMLInputElement>document.getElementById(element.name)).value = '';
      });
     let page: any = { page: 1, itemsPerPage: this.itemsPerPageInfo }
      this.onChangeTableInfo(this.config, page);
    }, 400);
  }

  public clearfilters() {

    this.clearFilter = false;
    // (<HTMLInputElement>document.getElementById('filterInput')).value = '';
    this.columnsInfo.forEach(element => {
      element.filtering.filterString = '';
      (<HTMLInputElement>document.getElementById(element.name)).value = '';
    });
    this.onChangeTableInfo(this.config);
   
  }
}
