import { Component, OnInit } from '@angular/core';
import { ExamenesService } from '../../../service/Examenes/examenes.service';

@Component({
  selector: 'app-entrevistas',
  templateUrl: './entrevistas.component.html',
  styleUrls: ['./entrevistas.component.scss']
})
export class EntrevistasComponent implements OnInit {
  // scroll
  disabled = false;
  compact = false;
  invertX = false;
  invertY = false;
  shown = 'hover';
  examenes = [];
  element = [];
  verExamen = false;

  // Varaibles del paginador
  public page = 1;
  public itemsPerPage = 20;
  public maxSize = 5;
  public numPages = 1;
  public length = 0;

  public rows: Array<any> = [];
  public columns: Array<any> = [
    { title: 'Nombre Examen', className: 'text-info text-center', name: 'nombre', filtering: { filterString: '', placeholder: 'Nombre' } },
    { title: 'Tipo Examen', className: 'text-info text-center', name: 'tipo', filtering: { filterString: '', placeholder: 'Tipo Examen' } },
    { title: 'Aleatoriedad', className: 'text-info text-center', name: 'ale', filtering: { filterString: '', placeholder: 'Aletoriedad' } },
    { title: 'No. Preguntas', className: 'text-info text-center', name: 'num', filtering: { filterString: '', placeholder: 'Numero' } },
    { title: 'Fecha Modificacion', className: 'text-info text-center', name: 'fch_Modificacion', filtering: { filterString: '', placeholder: 'aaaa-mm-dd' } },
    { title: 'Usuario', className: 'text-info text-center', name: 'usuario', filtering: { filterString: '', placeholder: '0' } },
  ];
  public config: any = {
    paging: true,
    filtering: { filterString: '' },
    className: ['table-hover  mb-0']
  };
  rowAux = [];

  constructor(private _service: ExamenesService) { }

  ngOnInit() {
    this.GetExamenes();
  }

  GetExamenes() {
    this._service.GetExamenesEntrevista().subscribe(data => {
      this.examenes = data;
      this.onChangeTable(this.config);
    });
  }

  public changePage(page: any, data: Array<any> = this.examenes): Array<any> {
    const start = (page.page - 1) * page.itemsPerPage;
    const end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeFilter(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columns.forEach((column: any) => {
      if (column.filtering.filterString !== '') {
        filteredData = filteredData.filter((item: any) => {
          if (item[column.name] != null) {
              return item[column.name].toString().toLowerCase().match(column.filtering.filterString.toLowerCase());
            }
        });
      }
    });

    return filteredData;
  }

  public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
    if (config.filtering) {
      (<any>Object).assign(this.config.filtering, config.filtering);
    }

    this.rows = this.examenes;
    const filteredData = this.changeFilter(this.rows, this.config);
    this.rows = page && config.paging ? this.changePage(page, filteredData) : filteredData;
    this.length = filteredData.length;
  }
  onSelect(row) {
    debugger;
    console.log(row)
    this.element = row;
    row.selected ? row.selected = false : row.selected = true;

    if (this.rowAux.length === 0) {
      this.rowAux = row;
    } else if (row.selected && this.rowAux !== []) {
      const aux = row;
      row = this.rowAux;
      row.selected = false;
      aux.selected = true;
      this.rowAux = aux;
    }
  }

  public refreshTable() {

    this.GetExamenes();
    setTimeout(() => {
      this.columns.forEach(element => {
       (<HTMLInputElement>document.getElementById(element.name)).value = '';
      });
    }, 100);
  }

  public clearfilters(){
    this.columns.forEach(element => {
      element.filtering.filterString = '';
     (<HTMLInputElement>document.getElementById(element.name)).value = '';
    });
    this.onChangeTable(this.config);
  }

}
