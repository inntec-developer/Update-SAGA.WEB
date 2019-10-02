
import { Component, OnInit } from '@angular/core';
import { SistTicketsService } from '../../../service/SistTickets/sist-tickets.service';
import { DatePipe } from '@angular/common';
import { ExcelService } from '../../../service/ExcelService/excel.service';
@Component({
  selector: 'app-rport-atencion-turnos',
  templateUrl: './rport-atencion-turnos.component.html',
  styleUrls: ['./rport-atencion-turnos.component.scss'],
  providers:[ DatePipe]
})
export class RportAtencionTurnosComponent implements OnInit {
  result: any = [];
  public rows: Array<any> = [];

  disabled = false;
  compact = false;
  invertX = false;
  invertY = false;
  shown = 'hover';

    // Varaibles del paginador
    public page: number = 1;
    public itemsPerPage: number = 20;
    public maxSize: number = 5;
    public numPages: number = 1;
    public length: number = 0;
    clearFilter: boolean = true;

  public columns: Array<any> = [
    { title: 'Fecha', className: 'text-success text-center', name: 'fecha', filtering: { filterString: '',  placeholder: 'aaaa-mm-dd' } },
    { title: 'Reclutador', className: 'text-info text-center', name: 'reclutador', filtering: { filterString: '', placeholder: 'Reclutador' } },
    { title: 'Turnos Atendidos', className: 'text-info text-center', name: 'total', filtering: { filterString: '', placeholder: 'Atendidos' } },
    { title: 'Turnos con Cita', className: 'text-info text-center', name: 'concita', filtering: { filterString: '', placeholder: 'Con cita' } },
    { title: 'Turnos sin Cita', className: 'text-info text-center', name: 'sincita', filtering: { filterString: '', placeholder: 'Sin cita' } },
    // { title: 'Tiempo entre turnos', className: 'text-info text-center', name: 'tiempo', filtering: { filterString: '', placeholder: 'tiempo' } },
  ];

  public config: any = {
    paging: true,
    filtering: { filterString: '' },
    className: ['table-hover  mb-0']
  };

  registros: any;
  constructor(private _service: SistTicketsService, private pipe: DatePipe, private excelService: ExcelService) { }

  ngOnInit() {
    this.GetReport();
  }

  GetReport()
  {
    this._service.GetRportAtencion().subscribe(data => {
      const aux = [];

      data.forEach(element => {
        element.datos.forEach(item => {
          aux.push({
            fecha: element.fecha,
            reclutador: item.reclutador,
            total: item.total,
            concita: item.concita,
            sincita: item.sincita
          });
        });
      });
      this.result = aux;
      this.rows = aux;
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

  public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
    if (config.filtering) {
      (<any>Object).assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      (<any>Object).assign(this.config.sorting, config.sorting);
    }

    this.registros = this.result.length;
    this.rows = this.result;
    const filteredData = this.changeFilter(this.result, this.config);
    // let sortedData = this.changeSort(filteredData, this.config);
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

  this.GetReport();
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
      const aux = [];
      this.result.forEach(row => {
        const d = this.pipe.transform(new Date(row.fecha), 'dd/MM/yyyy');

        row.datos.forEach(element => {
        aux.push({
          'FECHA': d,
          'RECLUTADOR': element.reclutador,
          'TURNOS ATENDIDOS': element.total,
          'TURNOS CON CITA': element.concita,
          'TURNOS SIN CITA': element.sincita
        });
      });
      });

      this.excelService.exportAsExcelFile(aux, 'Reporte_Turnos_Atendidos');

    }
  }
}
