import { ExcelService } from './../../../service/ExcelService/excel.service';
import { Component, OnInit, Input } from '@angular/core';
import { EquiposTrabajoService } from '../../../service/EquiposDeTrabajo/equipos-trabajo.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-tabla-equipos',
  templateUrl: './tabla-equipos.component.html',
  styleUrls: ['./tabla-equipos.component.scss'],
  providers: [DatePipe]
})
export class TablaEquiposComponent implements OnInit {
//scroll
disabled = false;
compact = false;
invertX = false;
invertY = false;
shown = 'hover';

// Variables Globales
public dataSource: Array<any> = [];
@Input('usuarioId') usuarioId: any;
@Input('orden') orden: any;
@Input('flag') flag = 0;
  // Varaibles del paginador
  public page = 1;
  public itemsPerPage = 20;
  public maxSize = 5;
  public numPages = 1;
  public length = 0;

  public rows: Array<any> = [];
  public columns: Array<any> = [
    { title: 'Folio', sorting: 'desc', className: 'text-success text-center', name: 'folio', filtering: { filterString: '', placeholder: 'Folio' } },
    { title: 'Cliente', className: 'text-info text-center', name: 'cliente', filtering: { filterString: '', placeholder: 'Cliente' } },
    { title: 'Perfil', className: 'text-info text-center', name: 'vBtra', filtering: { filterString: '', placeholder: 'Perfil' } },
    { title: 'Fecha Cump.', className: 'text-info text-center', name: 'fch_Cumplimiento', filtering: { filterString: '', placeholder: 'aaaa-mm-dd' } },
    { title: 'Posiciones', className: 'text-info text-center', name: 'vacantes', filtering: { filterString: '', placeholder: '0' } },
    { title: 'Cubiertas', className: 'text-info text-center', name: 'contratados', filtering: { filterString: '', placeholder: '0' } },
    { title: 'Faltantes', className: 'text-info text-center', name: 'faltantes', filtering: { filterString: '', placeholder: '0' } },
    { title: '% Cumpl.', className: 'text-info text-center', name: 'cumplimiento', filtering: { filterString: '', placeholder: '0' } },
    { title: 'Coordinador', className: 'text-info text-center', name: 'coordinador', filtering: { filterString: '', placeholder: 'Coordinador', columnName: 'reclutadores' } },
    { title: 'Reclutador', className: 'text-info text-center', name: 'reclutadores', filtering: { filterString: '', placeholder: 'Reclutador', columnName: 'reclutadores' } },
  ];
  public config: any = {
    paging: true,
    filtering: { filterString: '' },
    className: ['table-hover  mb-0']
  };
  totalPos: number;
  totalContratados: number;

  constructor(private _service: EquiposTrabajoService, private pipe: DatePipe, private excelService: ExcelService) { }

  ngOnInit() {
    if (this.flag === 0) {
      this.getRequisiciones();
    } else {
      this.getRequisicionesClientes();
    }
  }

  getRequisiciones() {
    this._service.GetRportTable(this.usuarioId, this.orden).subscribe( data => {
      this.dataSource = data;

      this.totalPos = 0;
      this.totalContratados = 0;

      this.dataSource.forEach(r => {
        this.totalPos += r.vacantes;
          this.totalContratados += r.contratados;
          if (r.estatusId === 4) {
            r.coordinador = r.reclutadores;
            r.reclutadores = 'SIN ASIGNAR';
          }
      });

      this.onChangeTable(this.config);
    });
  }

  getRequisicionesClientes() {
    this._service.GetRportTableClientes(this.usuarioId, this.orden).subscribe( data => {
      this.dataSource = data;

      this.totalPos = 0;
      this.totalContratados = 0;

      this.dataSource.forEach(r => {
        this.totalPos += r.vacantes;
          this.totalContratados += r.contratados;
          if (r.estatusId === 4) {
            r.coordinador = r.reclutadores;
            r.reclutadores = 'SIN ASIGNAR';
          }
      });

      this.onChangeTable(this.config);
    });
  }

  public changePage(page: any, data: Array<any> = this.dataSource): Array<any> {
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

    this.rows = this.dataSource;
    const filteredData = this.changeFilter(this.rows, this.config);
    this.rows = page && config.paging ? this.changePage(page, filteredData) : filteredData;
    this.length = filteredData.length;
  }

  public refreshTable() {

    this.getRequisiciones();
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

  exportAsXLSX()
  {

    if (this.dataSource.length > 0) {
      const aux = [];
      let reclutador = '';
      let coordinador = '';
      this.dataSource.forEach(row => {
      if (!Array.isArray(row.reclutadores)) {
          reclutador = 'SIN ASIGNAR';
      } else if (row.reclutadores.length > 1) {
        row.reclutadores.forEach(element => {
            reclutador = reclutador + element + ', \n';
        });
      } else {
          reclutador = row.reclutadores[0];
      }
      const d = this.pipe.transform(new Date(row.fch_Cumplimiento), 'dd/MM/yyyy');

      if (row.estatusId === 4) {
        coordinador = reclutador;
        reclutador = 'SIN ASIGNAR';
      } else {
        coordinador = row.coordinador;
      }

      aux.push({
          FOLIO: row.folio.toString(),
          CLIENTE: row.cliente,
          PERFIL: row.vBtra,
          'FECHA CUMPLIMIENTO': d,
          POSICIONES: row.vacantes,
          CUBIERTAS: row.contratados,
          FALTANTES: row.faltantes,
          '% CUMPLIMIENTO': row.cumplimiento,
          COORDINADOR: coordinador,
          RECLUTADOR: reclutador,
        });

        reclutador = '';
      });

      this.excelService.exportAsExcelFile(aux, 'ReporteIndicadores');

    }
  }

}
