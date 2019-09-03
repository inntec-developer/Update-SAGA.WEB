import { Component, OnInit } from '@angular/core';

import { DatePipe } from '@angular/common';
import { ExcelService } from '../../../service/ExcelService/excel.service';
import { SistTicketsService } from '../../../service/SistTickets/sist-tickets.service';

@Component({
  selector: 'app-rport-tickets-generados',
  templateUrl: './rport-tickets-generados.component.html',
  styleUrls: ['./rport-tickets-generados.component.scss'],
  providers:[ DatePipe]
})
export class RportTicketsGeneradosComponent implements OnInit {
  result: any = [];
  public rows: Array<any> = [];

  disabled = false;
  compact = false;
  invertX = false;
  invertY = false;
  shown = 'hover';

    // Varaibles del paginador
    public page = 1;
    public itemsPerPage = 20;
    public maxSize = 5;
    public numPages = 1;
    public length = 0;
    clearFilter = true;
  public columns: Array<any> = [
    { title: 'Fecha', className: 'text-success text-center', name: 'fecha', filtering: { filterString: '',  placeholder: 'aaaa-mm-dd' } },
    { title: 'Turnos Generados', className: 'text-info text-center', name: 'total', filtering: { filterString: '', placeholder: 'Turnos generados' } },
    { title: 'Turnos Atendidos', className: 'text-info text-center', name: 'atendidos', filtering: { filterString: '', placeholder: 'Atendidos' } },
    { title: 'Turnos con Cita', className: 'text-info text-center', name: 'concita', filtering: { filterString: '', placeholder: 'Con cita' } },
    { title: 'Turnos sin Cita', className: 'text-info text-center', name: 'sincita', filtering: { filterString: '', placeholder: 'Sin cita' } },
  ];

  public config: any = {
    paging: true,

    filtering: { filterString: '' },
    className: ['table-hover  mb-0']
  };
  registros: any;

  constructor(private _service: SistTicketsService, private pipe: DatePipe, private excelService: ExcelService) { }

  ngOnInit() {
    this.GetTickets();
  }


  GetTickets()
  {
    this._service.GetTicketsGenerados().subscribe(data => {
      this.result = data;
      this.rows = data;

      this.onChangeTable(this.config);
    });

  }

   //#region filtros y paginador


  public changePage(page: any, data: Array<any> = this.result): Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeFilter(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columns.forEach((column: any) => {
      if (column.filtering.filterString !== '') {
        filteredData = filteredData.filter((item: any) => {
          if (item[column.name] != null) {
            if (!Array.isArray(item[column.name])) {
              return item[column.name].toString().toLowerCase().match(column.filtering.filterString.toLowerCase());
            } else {
              if (item[column.name].length > 0) {
                let aux = [];
                aux = item[column.name];
                let mocos = false;

                aux.forEach(element => {
                  if (element.toString().toLowerCase().match(column.filtering.filterString.toLowerCase())) {
                    mocos = true;
                    return;
                  }
                });

                if (mocos) {
                  return item[column.name];
                }
              } else {
                if ('sin asignar'.match(column.filtering.filterString.toLowerCase())) {
                  return item[column.name];
                }
              }
            }
          }
        });
      }
    });

    return filteredData;
  }
  public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }, col: string = ''): any {
    if (config.filtering) {
      (<any>Object).assign(this.config.filtering, config.filtering);
    }
    this.registros = this.result.length;
    this.rows = this.result;
    const filteredData = this.changeFilter(this.result, this.config, col);
    this.rows = page && config.paging ? this.changePage(page, filteredData) : filteredData;
    this.length = filteredData.length;
  }
//#endregion

public refreshTable() {
  setTimeout(() => {
    this.columns.forEach(element => {
     (<HTMLInputElement>document.getElementById(element.name)).value = '';
     element.filtering.filterString = '';
    });
  }, 1000);

  this.GetTickets();
}

  public clearfilters() {
    this.columns.forEach(element => {
      element.filtering.filterString = '';
      (<HTMLInputElement>document.getElementById(element.name)).value = '';
    });
    this.onChangeTable(this.config);

  }

  exportAsXLSX() {

    if (this.result.length > 0) {
      var aux = [];
      this.result.forEach(row => {

        var d = this.pipe.transform(new Date(row.fecha), 'dd/MM/yyyy');

        aux.push({
          'FECHA': d,
          'TURNOS GENERADOS': row.total,
          'TURNOS ATENDIDOS': row.atendidos,
          'TURNOS CON CITA': row.concita,
          'TURNOS SIN CITA': row.sincita
        })

      });

      this.excelService.exportAsExcelFile(aux, 'Reporte_Turnos_Generados');

    }
  }
}
