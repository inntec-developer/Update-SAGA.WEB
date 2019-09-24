import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ComponentsService } from './../../../../service/Components/components.service';
import { DatePipe } from '@angular/common';
import { ExcelService } from './../../../../service/ExcelService/excel.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SettingsService } from '../../../../core/settings/settings.service';
import { isArray } from 'rxjs/internal/util/isArray';

@Component({
  selector: 'app-grafica-reporte',
  templateUrl: './grafica-reporte.component.html',
  styleUrls: ['./grafica-reporte.component.scss'],
  providers: [ComponentsService,DatePipe ]
})
export class GraficaReporteComponent implements OnInit {

  @Input('EstadoVacante') EstadoVacante: any;

  private UsuarioId: string;
  //scroll
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
  public faltante = 0;
  public bandera = true;
  totalContratados: number = 0;

  constructor(private _ComponentService: ComponentsService, 
              private excelService: ExcelService, 
              private settings: SettingsService,
              private spinner: NgxSpinnerService, 
              private pipe: DatePipe) { }

  public rows: Array<any> = [];
  public columns: Array<any> = [
    { title: 'Folio', sorting: 'desc', className: 'text-success text-center', name: 'folio', filtering: { filterString: '', placeholder: 'Folio' } },
    { title: 'Cliente', className: 'text-info text-center', name: 'cliente', filtering: { filterString: '', placeholder: 'Cliente' } },
    { title: 'Perfil', className: 'text-info text-center', name: 'vBtra', filtering: { filterString: '', placeholder: 'Perfil' } },
    { title: 'Reclutador', className: 'text-info text-center', name: 'reclutadores', filtering: { filterString: '', placeholder: 'Reclutador', columnName: 'reclutadores' } },
    { title: 'Asignación', className: 'text-info text-center', name: 'fch_Asignacion', filtering: { filterString: '', placeholder: 'aaaa-mm-dd' } },
    { title: 'Días Trans', className: 'text-info text-center', name: 'dias', filtering: { filterString: '', placeholder: 'Dias' } },
    { title: 'Estatus', className: 'text-info text-center', name: 'estatus', filtering: { filterString: '', placeholder: 'Estatus' } },
    { title: 'Fecha Estatus', className: 'text-info text-center', name: 'fch_Modificacion', filtering: { filterString: '', placeholder: 'aaaa-mm-dd' } },
    { title: 'Cub/Vac', className: 'text-info text-center', name: 'vacantes', filtering: { filterString: '', placeholder: 'No.' } },
    { title: 'Coordinación', className: 'text-info text-center', name: 'clasesReclutamiento', filtering: { filterString: '', placeholder: 'Coordinación' } },
   
  ];

  ngOnInit() {
    this.UsuarioId = this.settings.user['id'];
    let estado2 = this.EstadoVacante.split(':', 1);
    this.bandera = estado2 == 'Captado'|| estado2 == 'Contratado' || estado2 == 'Masivo'
    || estado2 == 'Operativo' || estado2 == 'Especial'|| estado2 == "diciembre" || estado2 == "noviembre"
    || estado2 == "octubre" || estado2 == "septiembre" || estado2 == "agosto"|| estado2 == "julio"
    || estado2 == "junio" || estado2 == "mayo" || estado2 == "abril" || estado2 == "marzo" 
    || estado2 == "febrero" || estado2 == "enero"?false:true;

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.UsuarioId = this.settings.user['id'];
      this.getRequisiciones();
  }

  getRequisiciones() {
    this.spinner.show();
    var estado = this.EstadoVacante.split(':', 1);
    this._ComponentService.getRequiGraficaPA(estado, this.UsuarioId ).subscribe(data => {
      this.totalPos = 0;
      this.totalContratados = 0;
      this.faltante = 0;

      this.dataSource = data;
      this.dataSource.forEach(r => {
       
          this.totalPos += r.vacantes;
          this.totalContratados += r.contratados;
          
        
        if(r.estatusId == 4)
        {
          r.coordinador = r.reclutadores;
          r.reclutadores = "SIN ASIGNAR";
        }
      });
      this.faltante = this.totalPos - this.totalContratados;
      this.onChangeTable(this.config);
      this.spinner.hide();
    }, error => this.errorMessage = <any>error, function(){
      this.spinner.hide();
    });
  }

  public config: any = {
    paging: true,
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
          if (item[column.name] != null){
            if(!Array.isArray(item[column.name]))
            {
              return item[column.name].toString().toLowerCase().match(column.filtering.filterString.toLowerCase());
            }
            else
            {
              if(item[column.name].length > 0)
              {
                let aux = [];
                aux = item[column.name];
                let mocos = false;
                aux.forEach(element => {
                  if(element.toString().toLowerCase().match(column.filtering.filterString.toLowerCase()))
                  {
                    mocos = true;
                    return;
                  }
                });

                if(mocos)
                {
                  return item[column.name];
                }
              }
              else
              {
                if( 'sin asignar'.match(column.filtering.filterString.toLowerCase()))
                {
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
    this.length =  filteredData.length;
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

  exportAsXLSX()
  {
    if(this.dataSource.length > 0)
    {
      var aux = [];
      var reclutador = "";
      var coordinador = "";
      this.dataSource.forEach(row => {

        if(row.reclutadores.length == 0)
        {
          reclutador = "SIN ASIGNAR";
        }
        else if(row.reclutadores.length > 1)
        {
          if(isArray(row.reclutadores))
          {
            row.reclutadores.forEach(element => {
              reclutador = reclutador + element + ', \n'
            });
          }
          else
          {
            reclutador = row.reclutadores;
          }
        }
        else
        {
          reclutador = row.reclutadores[0];
        }
        var d = this.pipe.transform(new Date(row.fch_Asignacion), 'dd/MM/yyyy');
        var e = this.pipe.transform( new Date(row.fch_Modificacion), 'dd/MM/yyyy');

        if(row.estatusId == 4)
        {
          coordinador = reclutador;
          reclutador = "SIN ASIGNAR"

        }
        else
        {
          coordinador = row.coordinador;
        }
        aux.push({
          FOLIO: row.folio.toString(),
          CLIENTE: row.cliente,
          PERFIL: row.vBtra,
          RECLUTADOR: reclutador,
          'FECHA ASIGNACION': d,//new Date(d.getFullYear() + '-' + (d.getMonth()) + '-' + d.getDate()).toString(),
          'DIAS TRANS.': row.dias,
          ESTATUS: row.estatus,
          'FECHA ESTATUS': e,
          VACANTES: row.vacantes,
          CUBIERTOS: row.contratados,
          COORDINACION: row.clasesReclutamiento
         
        })
        reclutador = "";
      });
      this.excelService.exportAsExcelFile(aux, 'InformacioVacantes'+this.EstadoVacante);
    }
  }
}
