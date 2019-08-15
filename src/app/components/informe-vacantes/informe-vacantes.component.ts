import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { RequisicionesService } from './../../service/requisiciones/requisiciones.service';
import { SettingsService } from '../../core/settings/settings.service';
import { ExcelService } from '../../service/ExcelService/excel.service';

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
    { title: 'FECHA LIMITE', className: 'text-info text-center', name: 'fch_limite', filtering: { filterString: '', placeholder: 'aaaa-mm-dd' } },
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
  totalPos: number = 0;
  totalContratados: number = 0;

  constructor(
    private service: RequisicionesService,
    private spinner: NgxSpinnerService,
    private settings: SettingsService,
    private excelService: ExcelService,
    private pipe: DatePipe
    ) { }

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
      if (column.filtering.filterString != "") {
        // this.showFilterRowInfo = true;
        filteredData = filteredData.filter((item: any) => {
          if (item[column.name] != null)
            return item[column.name].toString().toLowerCase().match(column.filtering.filterString.toLowerCase());
        });
      }
    });

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

    setTimeout(() => {
      this.spinner.hide();
     }, 1000);
  }

  //#endregion

  getInfoVacantes() {
    this.service.GetInformeRequisiciones(this.settings.user['id']).subscribe(data => {
      this.dataInfoRequi = data;
      
      this.totalPos = 0;
      this.totalContratados = 0;
      this.dataInfoRequi.forEach(r => {
        if (r.estatusId != 8 && (r.estatusId < 34 || r.estatusId > 37)) {
          this.totalPos += r.vacantes;
          this.totalContratados += r.contratados;

       
        }

      })
      this.onChangeTableInfo(this.config);
    });
  }

  public refreshTable() {
    this.spinner.show();

    setTimeout(() => {
      this.columnsInfo.forEach(element => {
        element.filtering.filterString = '';
        (<HTMLInputElement>document.getElementById(element.name + "_1")).value = '';
      });
      this.spinner.hide();
    }, 1000);
  }

  public clearfilters() {

    // (<HTMLInputElement>document.getElementById('filterInput')).value = '';
    this.columnsInfo.forEach(element => {
      element.filtering.filterString = '';
      (<HTMLInputElement>document.getElementById(element.name + "_1")).value = '';
    });
    this.onChangeTableInfo(this.config);
  }
  exportAsXLSX() {

    if (this.dataInfoRequi.length > 0) {
      var aux = [];
      
      this.dataInfoRequi.forEach(row => {
        
        // var mocos = (d.getFullYear() + '-' + (d.getMonth()) + '-' + d.getDate()).toString()
        var e = this.pipe.transform(new Date(row.fch_limite), 'dd/MM/yyyy');

       
        aux.push({
          FOLIO: row.folio.toString(),
          PUESTO: row.vBtra,
          EMPRESA: row.cliente,
          'FECHA LIMITE': e,
          ESTATUS: row.estatus,
          NO: row.vacantes,
          "% CUMPLIMIENTO": row.porcentaje,
          POSTULADOS: row.postulados,
          ENTREVISTADOS: row.entrevista,
          "ABANDONÓ PROCESO": row.abandono,
          DESCARTADOS: row.descartados,
          "ENVIADO AL CLIENTE": row.enviados,
          RECHAZADOS: row.rechazados,
          CUBIERTOS: row.contratados
        })
      });

      //   })
      // })
      this.excelService.exportAsExcelFile(aux, 'InformeVacantes');
      this.refreshTable();
    }
  }

}
