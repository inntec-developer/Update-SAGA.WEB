import { CandidatosService } from './../../../service/Candidatos/candidatos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-files-contratados',
  templateUrl: './files-contratados.component.html',
  styleUrls: ['./files-contratados.component.scss'],
  providers: [CandidatosService]
})
export class FilesContratadosComponent implements OnInit {

  registrosInfo: number;
  public dataInfoRequi: Array<any> = [];
  public pageInfo: number = 1;
  public itemsPerPageInfo: number = 20;
  public maxSizeInfo: number = 5;
  public numPagesInfo: number = 1;
  public lengthInfo: number = 0;
  public rows: Array<any> = []
  public rowsInfo: Array<any> = [];
  public columns: Array<any> = [
    { title: 'Folio', className: 'text-primary', name: 'folio', filtering: { filterString: '', placeholder: 'Folio' } },
    { title: 'Vacante', className: 'text-primary', name: 'folio', filtering: { filterString: '', placeholder: 'Folio' } },
    { title: 'CURP', className: 'text-success', name: 'curp', filtering: { filterString: '', placeholder: 'CURP' } },
    { title: 'rfc', className: 'text-success', name: 'rfc', filtering: { filterString: '', placeholder: 'RFC' } },
    { title: 'nss', className: 'text-success', name: 'nss', filtering: { filterString: '', placeholder: 'NSS' } },
    { title: 'edad', className: 'text-primary', name: 'edad', filtering: { filterString: '', placeholder: 'Edad' } },
    { title: 'Nombre', className: 'text-primary', name: 'nombre', filtering: { filterString: '', placeholder: 'Nombre' } },
    { title: 'Apellido Paterno', className: 'text-primary', name: 'apellidoPaterno', filtering: { filterString: '', placeholder: 'Apellido Paterno' } },
    { title: 'Apellido Materno', className: 'text-primary', name: 'apellidoMaterno', filtering: { filterString: '', placeholder: 'Apellido Materno' } },
    // { title: 'Area de reclutamiento', className: 'text-primary', name: 'areaReclutamiento', filtering: { filterString: '', placeholder: 'Area reclutamiento' } },
    // { title: 'Fuente de reclutamiento', className: 'text-primary', name: 'fuenteReclutamiento', filtering: { filterString: '', placeholder: 'Fuente reclutamiento' } },
    // { title: 'Usuario', className: 'text-primary', name: 'usuario', filtering: { filterString: '', placeholder: 'Usuario' } },
    { title: 'Fecha', className: 'text-primary', name: 'fecha', filtering: { filterString: '', placeholder: 'Fecha' } }
  ]

  constructor(private service: CandidatosService) { }

  ngOnInit() {
    this.GetContratadosInfo();
  }

  GetContratadosInfo()
  {
    this.service.GetInfoContratados().subscribe(result =>{
      this.dataInfoRequi = result;
    });
  }

  public onChangeTableInfo(config: any, page: any = { page: this.pageInfo, itemsPerPage: this.itemsPerPageInfo }): any {
    if (config.filtering) {
      (<any>Object).assign(this.config.filtering, config.filtering);
    }

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

  public config: any = {
    paging: true,
    //sorting: { columns: this.columns },
    filtering: { filterString: '' },
    className: ['table-hover mb-0 ']
  };

  // public configInfo: any = {
  //   paging: true,
  //   //sorting: { columns: this.columns },
  //   filtering: { filterString: '' },
  //   className: ['table-hover mb-0 ']
  // };

  public changePage(page: any, data: Array<any> = this.dataSource): Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changePageInfo(page: any, data: Array<any> = this.dataInfoRequi): Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

}
