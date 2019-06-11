import { CandidatosService } from './../../../service/Candidatos/candidatos.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-files-contratados',
  templateUrl: './files-contratados.component.html',
  styleUrls: ['./files-contratados.component.scss'],
  providers: [CandidatosService]
})
export class FilesContratadosComponent implements OnInit {

  registrosInfo: number;
  filemanager = false;
    //scroll
    public disabled = false;
    public invertX = false;
    public compact = false;
    public invertY = false;
    public shown = 'hover';

  public dataInfoRequi: Array<any> = [];
  public pageInfo: number = 1;
  public itemsPerPageInfo: number = 20;
  public maxSizeInfo: number = 5;
  public numPagesInfo: number = 1;
  public lengthInfo: number = 0;
  clearFilter: boolean = false;

  public rowsInfo: Array<any> = [];
  public columns: Array<any> = [
    { title: 'Folio', className: 'text-primary text-center', name: 'folio', filtering: { filterString: '', placeholder: 'Folio' } },
    { title: 'Vacante', className: 'text-primary text-center', name: 'vbtra', filtering: { filterString: '', placeholder: 'Vacante' } },
    { title: 'CURP', className: 'text-success text-center', name: 'curp', filtering: { filterString: '', placeholder: 'CURP' } },
    { title: 'edad', className: 'text-primary text-center', name: 'edad', filtering: { filterString: '', placeholder: 'aaaa-mm-dd' } },
    { title: 'Nombre', className: 'text-primary text-center', name: 'nombre', filtering: { filterString: '', placeholder: 'Nombre' } },
    { title: 'Fecha', className: 'text-primary text-center', name: 'fch_Creacion', filtering: { filterString: '', placeholder: 'Fecha' } }
  ]

  constructor(private service: CandidatosService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.GetContratadosInfo();
    
  }

  GetContratadosInfo()
  {
    this.service.GetInfoContratados().subscribe(result =>{
      this.dataInfoRequi = result;
      this.onChangeTableInfo(this.config)
    });
  }

  closeModal()
  {
    this.filemanager = false;
  }
  public refreshTableInfo() {
    this.GetContratadosInfo();  
    setTimeout(() => {
      this.columns.forEach(element => {
        element.filtering.filterString = '';
        (<HTMLInputElement>document.getElementById(element.name)).value = '';
      });
     let page: any = { page: 1, itemsPerPage: this.itemsPerPageInfo }
      this.onChangeTableInfo(this.config, page);
    }, 400);
  }

  public onChangeTableInfo(config: any, page: any = { page: this.pageInfo, itemsPerPage: this.itemsPerPageInfo }): any {

    if (config.filtering) {
      (<any>Object).assign(this.config.filtering, config.filtering);
    }

    this.registrosInfo = this.dataInfoRequi.length;
    this.rowsInfo = this.dataInfoRequi;
    let filteredData = this.changeFilterInfo(this.rowsInfo, this.config);
    //let sortedData = this.changeSort(filteredData, this.config);
    this.rowsInfo = page && config.paging ? this.changePageInfo(page, filteredData) : filteredData;
    this.lengthInfo =  filteredData.length;
    setTimeout(() => {
      this.spinner.hide();
    }, 500);

  }

  public changeFilterInfo(data: any, config: any): any {

    let filteredData: Array<any> = data;
    this.columns.forEach((column: any) => {
      this.clearFilter = true;
      if (column.filtering) {
       // this.showFilterRow = true;
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

  
  public clearfilters() {
    this.clearFilter = false;
    // (<HTMLInputElement>document.getElementById('filterInput')).value = '';
    this.columns.forEach(element => {
      element.filtering.filterString = '';
      (<HTMLInputElement>document.getElementById(element.name)).value = '';
    });
    this.onChangeTableInfo(this.config);
  }

}
