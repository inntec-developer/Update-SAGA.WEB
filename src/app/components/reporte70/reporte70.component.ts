import { Component, OnInit } from '@angular/core';

import { DatePipe } from '@angular/common';
import { ExcelService } from '../../service/ExcelService/excel.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { RequisicionesService } from './../../service/requisiciones/requisiciones.service';

@Component({
  selector: 'app-reporte70',
  templateUrl: './reporte70.component.html',
  styleUrls: ['./reporte70.component.scss'],
  providers:[RequisicionesService, DatePipe]
})
export class Reporte70Component implements OnInit {


  public disabled = false;
  public compact = false;
  public invertX = true;
  public invertY = true;
  public shown = 'hover';

  public rows: Array<any> = [];

  public requisiciones = [];

  // Varaibles del paginador
  public page: number = 1;
  public itemsPerPage: number = 20;
  public maxSize: number = 5;
  public numPages: number = 1;
  public length: number = 0;

  public objsucursal1 : any[];
  public objempresa1 : any[];
  public objsolicit1 : any[];
  public objrecluta1 : any[];
  public objstatus1 : any[];
  public objtipocordi1 : any[];
  public objtiporeclu1 : any[];

  registros: any;
  showFilterRow: boolean;
  constructor(private _service: RequisicionesService, private pipe: DatePipe, private excelService: ExcelService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    // this.spinner.show();
    // this.GetReporte70();
  }

  llamado(oficina,solicitante,reclutador,empresa,estatus,tiporeclu,tipocor){
    document.getElementById('DivReportefil').classList.add('ocultar');
    document.getElementById('Divprincipal').classList.remove('ocultar');
    this.spinner.show();
    this.GetReporte70(oficina,solicitante,reclutador,empresa,estatus,tiporeclu,tipocor);
  }



  public columns: Array<any> = [
    { title: 'Folio', className: 'text-success text-center', name: 'folio', filtering: { filterString: '', placeholder: 'Folio' } },
    { title: 'Fecha Solicitud', className: 'text-info text-center', name: 'fch_Solicitud', filtering: { filterString: '', placeholder: 'dd/mm/yyyy' } },
    { title: 'Empresa', className: 'text-info text-center', name: 'cliente', filtering: { filterString: '', placeholder: 'Empresa' } },
    { width: '4%', title: 'Puesto', className: 'text-info text-center', name: 'vBtra', filtering: { filterString: '', placeholder: 'Puesto' } },
    { title: 'Sueldo', className: 'text-info text-center', name: 'sueldoMaximo', filtering: { filterString: '', placeholder: 'Sueldo' } },
    { title: 'Estado', className: 'text-info text-center', name: 'estado', filtering: { filterString: '', placeholder: 'Estado' } },
    { title: 'Domicilio Trabajo', className: 'text-info text-center', name: 'domicilio_trabajo', filtering: { filterString: '', placeholder: 'Domicilio Trabajo' } },
    { title: 'Reclutador', className: 'text-info text-center', name: 'reclutadores', filtering: { filterString: '', placeholder: 'Reclutador' } },
    { title: 'Sucursal', className: 'text-info text-center', name: 'sucursal', filtering: { filterString: '', placeholder: 'Sucursal' } },
    { title: 'No.', className: 'text-info text-center', name: 'vacantes', filtering: { filterString: '', placeholder: 'No. Vacantes' } },
    { title: 'Enviado', className: 'text-info text-center', name: 'enProcesoEC', filtering: { filterString: '', placeholder: 'Enviado' } },
    { title: 'Aceptado', className: 'text-info text-center', name: 'enProcesoFC', filtering: { filterString: '', placeholder: 'Aceptado' } },
    { title: 'Cubiertos', className: 'text-info text-center', name: 'contratados', filtering: { filterString: '', placeholder: 'Cubiertos' } },
    { title: 'Faltantes', className: 'text-info text-center', name: 'faltantes', filtering: { filterString: '', placeholder: 'Faltantes' } },
    { title: 'Cumplimiento', className: 'text-info text-center', name: 'porcentaje', filtering: { filterString: '', placeholder: 'Cumplimiento' } },
    { title: 'Dias Transcurridos', className: 'text-info text-center', name: 'diasTrans', filtering: { filterString: '', placeholder: 'Dias' } },
    { title: 'Estatus', className: 'text-info text-center', name: 'estatus', filtering: { filterString: '', placeholder: 'Estatus' } },
    // { title: 'Fecha Estatus', className: 'text-info text-center', name: 'fch_Modificacion', filtering: { filterString: '', placeholder: 'dd/mm/yyyy' } },
    { title: 'Tipo Reclutamiento', className: 'text-info text-center', name: 'tipoReclutamiento', filtering: { filterString: '', placeholder: 'Tipo reclutamiento' } },
    { title: 'Coordinación', className: 'text-info text-center', name: 'claseReclutamiento', filtering: { filterString: '', placeholder: 'Coordinación' } },
    { title: 'Com. Sol.', className: 'text-info text-center', name: 'comentarios_solicitante' },
    { title: 'Com. Recl.', className: 'text-info text-center', name: 'comentarios_reclutador' },
    { title: 'Coordinador', className: 'text-info text-center', name: 'coordinador', filtering: { filterString: '', placeholder: 'Coordinador' } },
    { title: 'Com. Coord.', className: 'text-info text-center', name: 'comentarios_coord' },
    { title: 'Solicita', className: 'text-info text-center', name: 'solicita', filtering: { filterString: '', placeholder: 'Solicita' } }
  ];

  GetReporte70(oficina,solicitante,reclutador,empresa,estatus,tiporeclu,tipocor)
  {


    this.objsucursal1 = oficina;
    this.objsolicit1 = solicitante;
    this.objrecluta1 = reclutador;
    this.objempresa1 = empresa;
    this.objstatus1 = estatus;
    this.objtiporeclu1 = tiporeclu;
    this.objtipocordi1 = tipocor;

    var ofc = '';
    var sol = '';
    var rec = '';
    var emp = '';
    var est = '';
    let trcu = '';
    let coo = '';

    if(oficina != undefined){
      for (let item of oficina) {
        ofc += item +',';

      }
    }

    if(solicitante != undefined){
      for (let item of solicitante) {
        sol += item +',';

      }
    }

    if(reclutador != undefined){
      for (let item of reclutador) {
        rec += item +',';

      }
    }

    if(empresa != undefined){
      for (let item of empresa) {
        emp += item +',';

      }
    }

    if(estatus != undefined){
      for (let item of estatus) {
        est += item +',';

      }
    }

    if(tiporeclu != undefined){
      for (let item of tiporeclu) {
        trcu += item +',';

      }
    }

    if(tipocor != undefined){
      for (let item of tipocor) {
        coo += item +',';

      }
    }

  ofc = oficina == undefined?'0':ofc;
  sol = solicitante == undefined?'0':sol;
  rec = reclutador == undefined?'0':rec;
  emp = empresa == undefined?'0':emp;
  est = estatus == undefined?'0':est;
  trcu = trcu == undefined?'0':trcu;
  coo = coo == undefined?'0':coo;


      let pal = document.getElementById('palabra');
      let inc = document.getElementById('fechaInicial');
      let fin = document.getElementById('fechaFinal');

      var palabra = pal['value'];
      var inicio = inc['value'];
      var final = fin['value'];
      let tipo = document.getElementById('TipoReporte')['value'];

    this._service.GetReporte70(palabra,ofc,tipo,inicio,final,emp,sol,trcu,coo,est,rec).subscribe(result => {
      this.requisiciones = result;
      this.rows = this.requisiciones.slice(0, this.itemsPerPage);
      this.registros = this.rows.length;
      this.length = this.requisiciones.length;
  this.spinner.hide();
    })
  }

  //#region filtros y paginador
  public config: any = {
    paging: true,
    //sorting: { columns: this.columns },
    filtering: { filterString: '' },
    className: ['table-hover  mb-0']
  };

  public changePage(page: any, data: Array<any> = this.requisiciones): Array<any> {
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
          if (item[column.name] != null )
          {
            if(!Array.isArray(item[column.name]))
            {
              return item[column.name].toString().toLowerCase().match(column.filtering.filterString.toLowerCase());
              // if(item[column.name].length > 0)
              // {
              //   var aux = item[column.name];
              //   aux.filter(r => {
              //     return r.toString().toLowerCase().match(column.filtering.filterString.toLowerCase());
              //   })

              //   return aux;
                // var mocos = Object.keys(aux[0])
              // }
            }
            else
            {
                let aux = item[column.name];
                let mocos = false;
                if(item[column.name].length > 0)
                {
                  item[column.name].forEach(element => {
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
                  return item[column.name];
              }
            }
          }
          else
          {
            return 'sin asignar'
          }
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

    this.registros = this.requisiciones.length;
    this.rows = this.requisiciones;
    let filteredData = this.changeFilter(this.requisiciones, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;


  }
//#endregion

public refreshTable() {
  this.GetReporte70(this.objsucursal1, this.objsolicit1, this.objrecluta1,
    this.objempresa1,this.objstatus1,this.objtiporeclu1,this.objtipocordi1 );
  this.page = 1;
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
    if(this.requisiciones.length > 0)
    {
      var aux = [];
      var comentariosSol = "";
      var comentariosRecl = "";
      var comentariosCoord = "";
      var reclutador = "";
      var fecha = "";
      this.requisiciones.forEach(row => {
        if(row.comentarios_coord.length > 0)
        {
          row.comentarios_coord.forEach(element => {
            comentariosCoord = comentariosCoord + element + '\n'
          });

        }
        else{
          comentariosCoord = "";
        }

        if(row.comentarios_solicitante.length > 0)
        {
          row.comentarios_solicitante.forEach(element => {
              comentariosSol = comentariosSol + element + '\n'
          });

        }
        else{
          comentariosSol = "";
        }

        if(row.comentarios_reclutador.length > 0)
        {
          row.comentarios_reclutador.forEach(element => {
            element.comentario.forEach(el => {
              if(element.fch_Creacion != null)
            {
              fecha =  this.pipe.transform(new Date(element.fch_Creacion), 'dd/MM/yyyy');
            }

              comentariosRecl = comentariosRecl + fecha + ' ' + el.comentario + '\n'
            });
            comentariosRecl = element.reclutador + '\n' + comentariosRecl + '\n';

          });
        }
        else{
          comentariosRecl = "";
        }

        if(row.reclutadores.length == 0)
        {
          reclutador = row.propietario;
        }
        else if(row.reclutadores.length > 1)
        {
          row.reclutadores.forEach(element => {
            reclutador = reclutador + element + '\n'
          });
        }
        else
        {
          reclutador = row.reclutadores[0].reclutador;
        }

        var estatus = row.estatus[row.estatus.length - 1].estatus;
        // row.estatus.forEach(element => {
        //   estatus = estatus + element.estatus + ' ' + this.pipe.transform(new Date(element.fch_Modificacion), 'yyyy-MM-dd') + '\n';
        // });

        if(row.fch_Solicitud != null)
        {
        var d = this.pipe.transform(new Date(row.fch_Solicitud), 'dd/MM/yyyy');
        }
        else
        {
          var d = this.pipe.transform( new Date(), 'dd/MM/yyyy');
        }

        if(row.fch_Modificacion != null)
        {
          var e = this.pipe.transform( new Date(row.fch_Modificacion), 'dd/MM/yyyy');
        }
        else
        {
           var e = this.pipe.transform( new Date(), 'dd/MM/yyyy');
        }





        aux.push({
          FOLIO: row.folio.toString(),
          'FECHA SOLICITUD': d,//new Date(d.getFullYear() + '-' + (d.getMonth()) + '-' + d.getDate()).toString(),
          EMPRESA: row.cliente,
          PUESTO: row.vBtra,
          'SUELDO FINAL':  row.sueldoMaximo.toLocaleString('en-US', {style: 'currency', currency: 'USD'}),
          ESTADO: row.estado,
          'DOMICILIO TRABAJO': row.domicilio_trabajo,
          RECLUTADOR: reclutador,
          SUCURSAL: row.sucursal,
          NO: row.vacantes,
          ENVIADO: row.enProcesoEC,
          ACEPTADO: row.enProcesoFC,
          CONTRATADOS: row.contratados,
          FALTANTES: row.faltantes,
          CUMPLIMIENTO: row.porcentaje,
          'DIAS TRANSCURRIDOS': row.estatus[0].diasTotal,
          ESTATUS: estatus,
          'TIPO RECLUTAMIENTO': row.tipoReclutamiento,
          'COORDINACION': row.claseReclutamiento,
          'COMENTARIOS SOLICITANTE': comentariosSol,
          'COMENTARIOS RECLUTADORES': comentariosRecl,
          COORDINADOR: row.coordinador,
          'COMENTARIOS COORDINADOR': comentariosCoord,
          SOLICITA: row.propietario,
        })
        comentariosSol = "";
        comentariosRecl = "";
        reclutador = "";
      });

      //   })
      // })
      this.excelService.exportAsExcelFile(aux, 'ReporteGeneral');

    }
  }

}
