import { PostulateService } from './../../service/SeguimientoVacante/postulate.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-candidatos-cubiertos-rport',
  templateUrl: './candidatos-cubiertos-rport.component.html',
  styleUrls: ['./candidatos-cubiertos-rport.component.scss']
})
export class CandidatosCubiertosRportComponent implements OnInit {
  @Input() RequisicionId;

  // Varaibles del paginador
  public page = 1;
  public itemsPerPage = 20;
  public maxSize = 5;
  public numPages = 1;
  public length = 0;

  registros: number;
  clearFilter: boolean = false;
  dataSource = [];

  public rows: Array<any> = []
  public columns: Array<any> = [
    { title: 'Horario', className: 'text-info', name: 'horario', filtering: { filterString: '', placeholder: 'Horario' } },
    { title: 'Nombre Candidato', className: 'text-info', name: 'nombre', filtering: { filterString: '', placeholder: 'Nombre' } },
    { title: 'Localidad', className: 'text-info', name: 'localidad', filtering: { filterString: '', placeholder: 'Localidad' } },
    { title: 'Fecha Nacimiento', className: 'text-info text-center', name: 'edad', filtering: { filterString: '', placeholder: 'aaaa-mm-dd' } },
    { title: 'CURP', className: 'text-success', name: 'curp', filtering: { filterString: '', placeholder: 'CURP' } },
    { title: 'RFC', className: 'text-success', name: 'rfc', filtering: { filterString: '', placeholder: 'RFC' } },
    { title: 'NSS', className: 'text-success', name: 'nss', filtering: { filterString: '', placeholder: 'NSS' } },
    { title: 'Sexo', className: 'text-info', name: 'genero', filtering: { filterString: '', placeholder: 'Genero' } }
  ]

  constructor(private _service: PostulateService) { }

  ngOnInit() {
    this.GetCandidatos();
  }

  GetCandidatos()
  {
    this._service.GetCandidatosCubiertos(this.RequisicionId).subscribe(data => {
      debugger;
      data.forEach(element => {
        this.dataSource.push({
          horario: element.horario,
          nombre: element.informacion.nombre,
          localidad: element.informacion.localidad,
          edad: element.informacion.edad,
          curp: element.informacion.curp,
          rfc: element.informacion.rfc,
          nss: element.informacion.nss,
          genero: element.informacion.genero
        });
      });
      this.onChangeTable(this.config);
    })
  }

    //#region filtros y paginacion

    public config: any = {
      paging: true,
      //sorting: { colums: this.columns },
      filtering: { filterString: '' },
      className: ['table-striped mb-0 d-table-fixed']
    }
  
    public changePage(page: any, data: Array<any> = this.dataSource): Array<any> {
      let start = (page.page - 1) * page.itemsPerPage;
      let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
      return data.slice(start, end);
    }
  
   
    public changeFilter(data: any, config: any): any {
      let filteredData: Array<any> = data;
      this.columns.forEach((column: any) => {
        this.clearFilter = true;
        if (column.filtering.filterString != "") {
          filteredData = filteredData.filter((item: any) => {
            if (item[column.name] != null)
              return item[column.name].toString().toLowerCase().match(column.filtering.filterString.toLowerCase());
          });
        }
      });
  
      return filteredData;
    }
  
    public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
  
      if (config.filtering) {
        (<any>Object).assign(this.config.filtering, config.filtering);
      }
  
      this.registros = this.dataSource.length;
      this.rows = this.dataSource;
      let filteredData = this.changeFilter(this.dataSource, this.config);
      this.rows = page && config.paging ? this.changePage(page, filteredData) : filteredData;
      this.length = filteredData.length;
    }
  
    public clearfilters() {
      this.clearFilter = false;
      // (<HTMLInputElement>document.getElementById('filterInput')).value = '';
      this.columns.forEach(element => {
        element.filtering.filterString = '';
        (<HTMLInputElement>document.getElementById(element.name + "_1")).value = '';
      });
      this.onChangeTable(this.config);
    }

    public refreshTable() {
        this.columns.forEach(element => {
         (<HTMLInputElement>document.getElementById(element.name + "_1")).value = '';
        });
        this.GetCandidatos();
      }
   

    
  
    //#endregion
  
}
