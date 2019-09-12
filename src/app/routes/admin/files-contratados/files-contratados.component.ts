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
  candidatoId: any;
  nom = '';
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
    { title: 'Fecha', className: 'text-primary text-center', name: 'fch_Creacion',
      filtering: { filterString: '', placeholder: 'aaaa-mm-dd' } }
  ];
  element: any = [];
  rowAux: any = [];
  totalCandidatos = 0;
  totalFolios = 0;

  constructor(private service: CandidatosService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.GetContratadosInfo();
  }

  GetContratadosInfo() {
    this.service.GetInfoContratados().subscribe(result => {
      this.totalFolios = result.length;
      this.totalCandidatos = 0;

      this.dataInfoRequi = [];
      result.forEach(element => {
        if (element.info.length > 0) {
        element.info.forEach(item => {
            // row.forEach(item => {
              if (item.length > 0) {
                this.dataInfoRequi.push({
                  candidatoId: item[0].candidatoId,
                  nombre: item[0].nombre,
                  edad: item[0].edad,
                  rfc: item[0].rfc,
                  curp: item[0].curp,
                  nss: item[0].nss,
                  paisNacimiento: item[0].paisNacimiento,
                  estadoNacimiento: item[0].estadoNacimiento,
                  municipioNacimiento: item[0].municipioNacimiento,
                  localidad: item[0].localidad,
                  generoId: item[0].generoId,
                  fch_Creacion: item[0].fch_Creacion,
                  fch_Modificacion: item[0].fch_Modificacion,
                  folio: item[0].folio,
                  vbtra: item[0].vbtra
                });
               }
            // });
        });
      }
      });
      console.log(this.dataInfoRequi)
      this.totalCandidatos = this.dataInfoRequi.length;
      this.onChangeTableInfo(this.config);
    });
  }

  closeModal() {
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

  public onCellClick(data: any): any {

    data.selected ? data.selected = false : data.selected = true;

    this.element = data;

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
