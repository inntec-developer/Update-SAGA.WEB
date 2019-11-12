import { SistTicketsService } from './../../../service/SistTickets/sist-tickets.service';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ExcelService } from '../../../service/ExcelService/excel.service';

@Component({
  selector: 'app-reporte-concurrencia',
  templateUrl: './reporte-concurrencia.component.html',
  styleUrls: ['./reporte-concurrencia.component.scss'],
  providers:[ DatePipe]
})
export class ReporteConcurrenciaComponent implements OnInit {

  disabled = false;
  compact = false;
  invertX = false;
  invertY = false;

  shown = 'hover';

  public rows: Array<any> = [];

  reporte = [];

  // Varaibles del paginador
  public page = 1;
  public itemsPerPage = 20;
  public maxSize = 5;
  public numPages = 1;
  public length = 0;

  registros: any;
  showFilterRow = true;
  clearFilter = true;

  public config: any = {
    paging: true,
    filtering: { filterString: '' },
    className: ['table-hover  mb-0']
  };

  public columns: Array<any> = [
    { title: 'Fecha', className: 'text-success text-center', name: 'fecha', filtering: { filterString: '',  placeholder: 'aaaa-mm-dd' } },
    { title: 'Hora Atención', className: 'text-info text-center', name: 'hora', filtering: { filterString: '', placeholder: 'HH:MM' } },
    { title: 'Usuario', className: 'text-info text-center', name: 'usuario', filtering: { filterString: '', placeholder: 'Usuario' } },
    { title: 'Módulo', className: 'text-info text-center', name: 'modulo', filtering: { filterString: '', placeholder: 'Modulo' } },
    { title: 'No. Turno', className: 'text-info text-center', name: 'turno', filtering: { filterString: '', placeholder: 'Turno' } },
    { title: 'Estatus', className: 'text-info text-center', name: 'estatus', filtering: { filterString: '', placeholder: 'Estatus' } },
    { title: 'Tiempo en Atención', className: 'text-info text-center', name: 'tiempo', filtering: { filterString: '', placeholder: 'Tiempo' } }
  ];

  constructor(private _service: SistTicketsService, private pipe: DatePipe, private excelService: ExcelService) { }

  ngOnInit() {
    this.GetReporte();
  }



  GetReporte() {
    this._service.GetConcurrenciaReporte().subscribe(result => {
      const aux = [];
      result.forEach(element => {
        element.datos.forEach(item => {
          aux.push({
            fecha: item.fecha,
            hora: item.hora,
            usuario: item.usuario,
            modulo: item.modulo,
            turno: item.turno,
            estatus: item.estatus,
            tiempo: item.minutos
          });
        });
      });
      this.reporte = aux;


      this.onChangeTable(this.config);
    });
  }

  //#region filtros y paginador


  public changePage(page: any, data: Array<any> = this.reporte): Array<any> {
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

    this.registros = this.reporte.length;
    const filteredData = this.changeFilter(this.reporte, this.config);
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

  this.GetReporte();
}

  public clearfilters() {
    this.columns.forEach(element => {
      element.filtering.filterString = '';
      (<HTMLInputElement>document.getElementById(element.name)).value = '';
    });
    this.onChangeTable(this.config);

  }

  exportAsXLSX() {

    if (this.reporte.length > 0) {
      const aux = [];
      let d: any;
      let h: any;
      this.reporte.forEach(row => {
        if (row.fecha.length > 0) {
          console.log(row.fecha)
          d = this.pipe.transform(new Date(row.fecha), 'yyyy-MM-dd H:mm');
          h = this.pipe.transform(new Date(row.fecha), 'H:mm');
        } else {
          d = '';
          h = '';
        }

        // let estatus = '';
        // row.resumen.forEach(element => {
        //   estatus = estatus + element.estatus + ' ' + this.pipe.transform(new Date(element.fecha), 'yyyy-MM-dd HH:mm') + '\n';
        // });

        aux.push({
          'FECHA TURNO': d,
          'HORA DE ATENCION': h,
          'USUARIO': row.usuario,
          MODULO: row.modulo,
          TURNO: row.turno,
          ESTATUS: row.estatus,
          'TIEMPO EN ATENCION': row.tiempo
        });

      });

      this.excelService.exportAsExcelFile(aux, 'Reporte_Concurrencia_de_Turnos');

    }
  }

}
