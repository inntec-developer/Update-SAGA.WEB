import { forEach } from '@angular/router/src/utils/collection';
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
    { title: 'Fecha', className: 'text-success text-center', name: 'fecha', filtering: { filterString: '',  placeholder: 'dd/mm/yyyy' } },
    { title: 'Reclutador', className: 'text-info text-center', name: 'reclutador', filtering: { filterString: '', placeholder: 'Reclutador' } },
    { title: 'Turnos Atendidos', className: 'text-info text-center', name: 'total', filtering: { filterString: '', placeholder: 'Atendidos' } },
    { title: 'Turnos con Cita', className: 'text-info text-center', name: 'concita', filtering: { filterString: '', placeholder: 'Con cita' } },
    { title: 'Turnos sin Cita', className: 'text-info text-center', name: 'sincita', filtering: { filterString: '', placeholder: 'Sin cita' } },
    // { title: 'Tiempo entre turnos', className: 'text-info text-center', name: 'tiempo', filtering: { filterString: '', placeholder: 'tiempo' } },
  ];
  registros: any;
  constructor(private _service: SistTicketsService, private pipe: DatePipe, private excelService: ExcelService) { }

  ngOnInit() {
    this.GetReport();
  }

  GetReport()
  {
    this._service.GetRportAtencion().subscribe(data => {
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
            if(col == 'fecha')
            {
              return item[col].toString().toLowerCase().match(column[0].filtering.filterString.toLowerCase());
            }
            else
            {
              let aux = item['datos']; // solo para este reporte
              if(aux.length > 0)
              {
                aux = aux.filter(e => {
                  if(e[col].toString().toLowerCase().match(column[0].filtering.filterString.toLowerCase()))
                  {
                    return e;
                  }
                });

                if(aux.length > 0)
                {
                  item.datos = aux;
                  return item.datos;
                }
              }
            }
        });
      }
    }
    else
    {
      filteredData = this.result

  
    }

   
    return filteredData;
  }

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

        row.datos.forEach(element => {
        aux.push({
          'FECHA': d,
          'RECLUTADOR': element.reclutador,
          'TURNOS ATENDIDOS': element.total,
          'TURNOS CON CITA': element.concita,
          'TURNOS SIN CITA': element.sincita
        })
      });
      });

      this.excelService.exportAsExcelFile(aux, 'Reporte_Turnos_Atendidos');

    }
  }
}
