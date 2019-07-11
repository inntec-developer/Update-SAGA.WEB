import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

import { ComponentsService } from './../../../service/Components/components.service';
import { DatePipe } from '@angular/common';
import { ExcelService } from '../../../service/ExcelService/excel.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SettingsService } from '../../../core/settings/settings.service';
import { isArray } from 'rxjs/internal/util/isArray';

@Component({
  selector: 'app-dt-vacantes-un',
  templateUrl: './dt-vacantes-un.component.html',
  styleUrls: ['./dt-vacantes-un.component.scss'],
  providers: [ComponentsService, DatePipe]
})
export class DtVacantesUNComponent implements OnInit {
  @Input('EstadoVacante') EstadoVacante: any;
  @Input('UnidadNegocio') UnidadNegocio: any;

  private UsuarioId: string;

  //SCROLL
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

  public showFilterRow: boolean;
  public dataSource: Array<any> = [];
  public errorMessage: any;
  public registros: number;

  public totalPos = 0;
  public bandera = true;
  totalContratados: number = 0;


  constructor(
    private _ComponentService: ComponentsService,
    private _excelService: ExcelService,
    private _Settings: SettingsService,
    private _Spinner: NgxSpinnerService,
    private _Pipe: DatePipe
  ) { }

  public rows: Array<any> = [];
  public columns: Array<any> = [
    { title: 'Folio', sorting: 'desc', className: 'text-success text-center', name: 'folio', filtering: { filterString: '', placeholder: 'Folio' } },
    { title: 'Creación', className: 'text-info text-center', name: 'fch_Creacion', filtering: { filterString: '', placeholder: 'aaaa-mm-dd' } },
    { title: 'Fecha Cump.', className: 'text-info text-center', name: 'fch_Cumplimiento', filtering: { filterString: '', placeholder: 'aaaa-mm-dd' } },
    { title: 'Cliente', className: 'text-info text-center', name: 'cliente', filtering: { filterString: '', placeholder: 'Cliente' } },
    { title: 'Perfil', className: 'text-info text-center', name: 'vBtra', filtering: { filterString: '', placeholder: 'Perfil' } },
    { title: 'Cub/Vac', className: 'text-info text-center', name: 'vacantes', filtering: { filterString: '', placeholder: 'No.' } },
    { title: 'Estatus', className: 'text-info text-center', name: 'estatus', filtering: { filterString: '', placeholder: 'Estatus' } },
    { title: 'Coordinador', className: 'text-info text-center', name: 'coordinador', filtering: { filterString: '', placeholder: 'Coordinador', columnName: 'reclutadores' } },
    { title: 'Solicitante', className: 'text-info text-center', name: 'propietario', filtering: { filterString: '', placeholder: 'Solicitante' } },
    { title: 'Reclutador', className: 'text-info text-center', name: 'reclutadores', filtering: { filterString: '', placeholder: 'Reclutador', columnName: 'reclutadores' } },
  ];

  ngOnInit() {
    this.UsuarioId = this._Settings.user['id'];
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.UsuarioId = this._Settings.user['id'];
    // if ((changes.EstadoVacante &&
    //     !changes.EstadoVacante.isFirstChange()) ||
    //     (changes.UnidadNegocio && !changes.UnidadNegocio.isFirstChange())
    //     ) {
    this.getRequisiciones();
    // }
  }

  getRequisiciones() {
    this._Spinner.show();
    var estado = this.EstadoVacante;
    var data = {
      estadoVacante: estado,
      unidadNegocio: this.UnidadNegocio
    }
    this._ComponentService.getRequiUnidadNegocio(data).subscribe(data => {
      if (data != null && data != 404) {
        this.totalPos = 0;
        this.totalContratados = 0;

        this.dataSource = data;
        this.dataSource.forEach(r => {
          if (r.estatusId != 8 && (r.estatusId < 34 || r.estatusId > 37) && this.bandera == true) {
            this.totalPos += r.vacantes;
            this.totalContratados += r.contratados;
          }
          if (this.bandera == false) {
            this.totalPos += r.vacantes;
            this.totalContratados += r.contratados;

          }
          if (r.estatusId == 4) {
            r.coordinador = r.reclutadores;
            r.reclutadores = "SIN ASIGNAR";
          }
        });
        this.onChangeTable(this.config);
        this._Spinner.hide();
      }else{
        this._Spinner.hide();
      }
    }, error => this.errorMessage = <any>error, function () {}
    );
  }

  public config: any = {
    paging: true,
    //sorting: { columns: this.columns },
    filtering: { filterString: '' },
    className: ['table-hover  mb-0']
  };

  public changePage(page: any, data: Array<any> = this.dataSource): Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeFilter(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columns.forEach((column: any) => {
      if (column.filtering.filterString != "") {
        filteredData = filteredData.filter((item: any) => {
          if (item[column.name] != null) {
            if (!Array.isArray(item[column.name])) {
              return item[column.name].toString().toLowerCase().match(column.filtering.filterString.toLowerCase());
            }
            else {
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
              }
              else {
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
    let filteredData = this.changeFilter(this.dataSource, this.config);
    this.rows = page && config.paging ? this.changePage(page, filteredData) : filteredData;
    this.length = filteredData.length;
    this.registros = this.rows.length;
  }

  public refreshTable() {

    this.getRequisiciones();

    setTimeout(() => {
      this.columns.forEach(element => {
        element.filtering.filterString = '';
        (<HTMLInputElement>document.getElementById(element.name)).value = '';
      });
    }, 800);
  }

  public clearfilters() {
    this.columns.forEach(element => {
      element.filtering.filterString = '';
      (<HTMLInputElement>document.getElementById(element.name)).value = '';
    });
    this.onChangeTable(this.config);

  }

  exportAsXLSX() {

    if (this.dataSource.length > 0) {
      var aux = [];
      var reclutador = "";
      var coordinador = "";
      this.dataSource.forEach(row => {

        if (row.reclutadores.length == 0) {
          reclutador = "SIN ASIGNAR";
        }
        else if (row.reclutadores.length > 1) {
          if (isArray(row.reclutadores)) {
            row.reclutadores.forEach(element => {
              reclutador = reclutador + element + ', \n'
            });
          }
          else {
            reclutador = row.reclutadores;
          }
        }
        else {
          reclutador = row.reclutadores[0];
        }
        var d = this._Pipe.transform(new Date(row.fch_Creacion), 'dd/MM/yyyy');
        var e = this._Pipe.transform(new Date(row.fch_Cumplimiento), 'dd/MM/yyyy');

        if (row.estatusId == 4) {
          coordinador = reclutador;
          reclutador = "SIN ASIGNAR"

        }
        else {
          coordinador = row.coordinador;
        }
        aux.push({
          FOLIO: row.folio.toString(),
          'FECHA SOLICITUD': d,//new Date(d.getFullYear() + '-' + (d.getMonth()) + '-' + d.getDate()).toString(),
          'FECHA CUMPLIMIENTO': e,
          CLIENTE: row.cliente,
          PERFIL: row.vBtra,
          VACANTES: row.vacantes,
          CUBIERTOS: row.contratados,
          ESTATUS: row.estatus,
          COORDINADOR: coordinador,
          SOLICITANTE: row.propietario,
          RECLUTADOR: reclutador
        })
        reclutador = "";
      });

      //   })
      // })
      this._excelService.exportAsExcelFile(aux, 'InformacioVacantes' + this.EstadoVacante + this.UnidadNegocio);

    }
  }


}
