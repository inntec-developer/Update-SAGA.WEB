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
    public page: number = 1;
    public itemsPerPage: number = 20;
    public maxSize: number = 5;
    public numPages: number = 1;
    public length: number = 0;
    clearFilter: boolean = true;
  public columns: Array<any> = [
    { title: 'Fecha', className: 'text-success text-center', name: 'fecha', filtering: { filterString: '',  placeholder: 'aaaa-mm-dd' } },
    { title: 'Turnos Generados', className: 'text-info text-center', name: 'total', filtering: { filterString: '', placeholder: 'Turnos generados' } },
    { title: 'Turnos Atendidos', className: 'text-info text-center', name: 'atendidos', filtering: { filterString: '', placeholder: 'Atendidos' } },
    { title: 'Turnos con Cita', className: 'text-info text-center', name: 'concita', filtering: { filterString: '', placeholder: 'Con cita' } },
    { title: 'Turnos sin Cita', className: 'text-info text-center', name: 'sincita', filtering: { filterString: '', placeholder: 'Sin cita' } },
  ];
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
   public config: any = {
    paging: true,
    //sorting: { columns: this.columns },
    filtering: { filterString: '' },
    className: ['table-hover  mb-0']
  };

  public changePage(page: any, data: Array<any> = this.result): Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeFilter(data: any, config: any, col: string): any {
    let filteredData: Array<any> = data;

    var column = this.columns.filter(c => {
        if(c.name == col)
        {
          return c;
        }
      });

    if(column.length > 0)
    {
      if (column[0].filtering) {
        filteredData = filteredData.filter((item: any) => {
          if (item[col] != null)
          {
            if(!Array.isArray(item[col]))
            {
              return item[col].toString().toLowerCase().match(column[0].filtering.filterString.toLowerCase());
            }
            else
            {
              let aux = item[col];
              let bandera = false;
              if(item[col].length > 0)
              {
                item[col].forEach(element => {
                  if(element.estatus.toString().toLowerCase().match(column[0].filtering.filterString.toLowerCase()))
                  {
                    bandera = true;
                    return;
                  }
                });

                if(bandera)
                {
                  return item[col];
                }
              }
              else
              {
                  return item[col];
              }
            }
          }
        });
      }
    }
    else
    {
      filteredData = this.result

      // if (!config.filtering) {
      //   return filteredData;
      // }

      // if (config.filtering.columnName) {
      //   return filteredData.filter((item: any) =>
      //     item[config.filtering.columnName].toLowerCase().match(this.config.filtering.filterString.toLowerCase()));
      // }

      // let tempArray: Array<any> = [];
      // filteredData.forEach((item: any) => {
      //   let flag = false;
      //   this.columns.forEach((column: any) => {
      //     if (item[column.name] == null) {
      //       flag = true;
      //     } else {
      //       if (item[column.name].toString().toLowerCase().match(this.config.filtering.filterString.toLowerCase())) {
      //         flag = true;
      //       }
      //     }
      //   });
      //   if (flag) {

      //     tempArray.push(item);
      //   }
      // });
      // filteredData = tempArray;

    }


    return filteredData;
  }

  // public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }, col: any = ''): any {
  //   if (config.filtering) {
  //     (<any>Object).assign(this.config.filtering, config.filtering);
  //   }

  //   this.rows = this.result;
  //   let filteredData = this.changeFilter(this.result, this.config, col);
  //   this.rows = page && config.paging ? this.changePage(page, filteredData) : filteredData;
  //   this.length = this.rows.length;
  // }

  public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }, col: string = ''): any {
    if (config.filtering) {
      (<any>Object).assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      (<any>Object).assign(this.config.sorting, config.sorting);
    }

    this.registros = this.result.length;
    this.rows = this.result;
    let filteredData = this.changeFilter(this.result, this.config, col);
    // let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, filteredData) : filteredData;
    this.length = filteredData.length;
  }
//#endregion



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
