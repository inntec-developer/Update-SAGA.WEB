import { RequisicionesService } from './../../service/requisiciones/requisiciones.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-informe-vacantes',
  templateUrl: './informe-vacantes.component.html',
  styleUrls: ['./informe-vacantes.component.scss']
})
export class InformeVacantesComponent implements OnInit {

   //scroll
   disabled = false;
   compact = false;
   invertX = false;
   invertY = false;
   shown = 'hover';

   public dataInfoRequi: Array<any> = [];
   public pageInfo: number = 1;
   public itemsPerPageInfo: number = 20;
   public maxSizeInfo: number = 5;
   public numPagesInfo: number = 1;
   public lengthInfo: number = 0;
   showFilterRowInfo: boolean = true;
   registrosInfo: number;
   public rowsInfo: Array<any> = [];

   public columnsInfo: Array<any> = [
    { title: 'FOLIO', className: 'text-success text-center', name: 'folio', filtering: { filterString: '', placeholder: 'FOLIO' } },
    { title: 'VACANTE', className: 'text-info text-center', name: 'vBtra', filtering: { filterString: '', placeholder: 'VACANTE' } },
    { title: 'CLIENTE', className: 'text-info text-center', name: 'cliente', filtering: { filterString: '', placeholder: 'CLIENTE' } },
    { title: 'FECHA LIMITE', className: 'text-info text-center', name: 'fch_limite', filtering: { filterString: '', placeholder: 'FECHA LIMITE' } },
    { title: 'ESTATUS', className: 'text-info text-center', name: 'estatus', filtering: { filterString: '', placeholder: 'ESTATUS' } },
    { title: 'CUB/VAC', className: 'text-info text-center', name: 'vacantes', filtering: { filterString: '', placeholder: '# VACANTES' } },
    { title: '% CUMPLIMIENTO', className: 'text-info text-center', name: 'porcentaje', filtering: { filterString: '', placeholder: '% CUMPLIMIENTO' } },
    { title: 'POSTULADOS', className: 'text-info text-center', name: 'postulados', filtering: { filterString: '', placeholder: 'POSTULADOS' } },
    { title: 'ENTREVISTADOS', className: 'text-info text-center', name: 'entrevista', filtering: { filterString: '', placeholder: 'ENTREVISTADOS' } },
    { title: 'ABANDONÓ PROCESO', className: 'text-info text-center', name: 'abandono', filtering: { filterString: '', placeholder: 'ABANDONÓ PROCESO' } },
    { title: 'DESCARTADOS', className: 'text-info text-center', name: 'descartados', filtering: { filterString: '', placeholder: 'DESCARTADOS' } },
    { title: 'ENVIADO CLIENTE', className: 'text-info text-center', name: 'enviados', filtering: { filterString: '', placeholder: 'ENVIADO CLIENTE' } },
    { title: 'RECHAZADOS', className: 'text-info text-center', name: 'rechazados', filtering: { filterString: '', placeholder: 'RECHAZADOS' } },
    { title: 'CUBIERTOS', className: 'text-info text-center', name: 'contratados', filtering: { filterString: '', placeholder: 'CUBIERTOS' } }
  ];

  constructor(private service: RequisicionesService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.getInfoVacantes();
  }

//#region paginador
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
    this.lengthInfo = filteredData.length;
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
  //#endregion

  getInfoVacantes() {
    this.service.GetInformeRequisiciones(sessionStorage.getItem('id')).subscribe(data => {
      this.dataInfoRequi = data;
      this.onChangeTableInfo(this.config);
      setTimeout(() => {
        this.spinner.hide();
       }, 2000);
    });
  }


}
