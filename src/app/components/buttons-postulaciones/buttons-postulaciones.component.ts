import { PostulateService } from './../../service/SeguimientoVacante/postulate.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-buttons-postulaciones',
  templateUrl: './buttons-postulaciones.component.html',
  styleUrls: ['./buttons-postulaciones.component.scss']
})
export class ButtonsPostulacionesComponent implements OnInit {

  @Input() RequisicionId;
  public dataSource: Array<any> = [];
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
  postulados: any;
  selectedList: any = [];
  constructor(private service: PostulateService) { }

  ngOnInit() {
    this.getpostulados();
  }

  getpostulados() {
    this.service.GetProceso(this.RequisicionId, localStorage.getItem('id')).subscribe(data => {
      console.log(this.RequisicionId)
      this.dataSource = data;
      console.log(this.dataSource)
    }, error => this.errorMessage = <any>error);
  }

  SetProceso(estatusId)
  {
    this.selectedList.forEach(element => {
      element.estatusId = estatusId
    });

    this.service.SetProceso(this.selectedList).subscribe(data => {
      if(data == 201)
      {
        console.log("entro");
      }
    })

  }

  public rows: Array<any> = []
  public columns: Array<any> = [
    { title: 'Nombre Candidato', className: 'text-info', name: 'nombre', filtering: { filterString: '', placeholder: 'Nombre' } },
    { title: 'Área Experiencia', className: 'text-info', name: 'areaExp', filtering: { filterString: '', placeholder: 'Experiencia' } },
    { title: 'Área Interes', className: 'text-info', name: 'areaInt', filtering: { filterString: '', placeholder: 'Interes' } },
    { title: 'Localidad', className: 'text-info', name: 'localidad', filtering: { filterString: '', placeholder: 'Localidad' } },
    { title: 'Sueldo Aceptable', className: 'text-info text-center', name: 'sueldoMinimo', filtering: { filterString: '', placeholder: 'Sueldo aceptable' } },
    { title: 'Fecha Nacimiento', className: 'text-info text-center', name: 'edad', filtering: { filterString: '', placeholder: 'Fecha Nacimiento' } },
    { title: 'CURP', className: 'text-success', name: 'curp', filtering: { filterString: '', placeholder: 'CURP' } },
    { title: 'RFC', className: 'text-success', name: 'rfc', filtering: { filterString: '', placeholder: 'RFC' } },
  ]

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
  }

  public onCellClick(data: any) {

    data.selected ? data.selected = false : data.selected = true; //para poner el backgroun cuando seleccione
    data.selected ? this.selectedList.push({ candidatoId: data.candidatoId }) : this.selectedList.splice(this.selectedList.findIndex(x => x.candidatoId == data.candidatoId), 1); //agrega y quita el row seleccionado
    // let index = this.dataSource.indexOf(data.row);
    // this.element = data;
    // /* add an class 'active' on click */
    // $('#resultDataTable').on('click', 'tr', function (event: any) {
    //   //noinspection TypeScriptUnresolvedFunction
    //   $(this).addClass('selected').siblings().removeClass('selected');
    // });
  }

}
