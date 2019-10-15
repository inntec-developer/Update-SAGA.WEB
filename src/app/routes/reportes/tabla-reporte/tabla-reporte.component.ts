import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit  } from '@angular/core';
import {ToasterConfig, ToasterService} from 'angular2-toaster';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { $ } from 'protractor';
import { ApiConection } from '../../../service/api-conection.service';
import { ExcelService } from '../../../service/ExcelService/excel.service';
import {Http} from '@angular/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReportesService } from '../../../service/Reporte/reportes.service';
import { SettingsService } from '../../../core/settings/settings.service';



@Component({
  selector: 'app-tabla-reporte',
  templateUrl: './tabla-reporte.component.html',
  styleUrls: ['./tabla-reporte.component.scss'],
  providers:[ReportesService]
})
export class TablaReporteComponent implements OnInit {
   
  private usuario: any;
  @Input('data') valor:any;
  public General : any[];
  public palabra :string;
  public columns: Array<any>;
  disabled = false;
  compact = false;
  invertX = true;
  invertY = true;

  shown = 'hover';

  public rows: Array<any> = [];

  requisiciones = [];

  // Varaibles del paginador
  public page: number = 1;
  public itemsPerPage: number = 20;
  public maxSize: number = 5;
  public numPages: number = 1;
  public length: number = 0;
  public numPosiciones: number = 0;

  registros: any;
  showFilterRow: boolean;


  constructor(
    private Servicio: ReportesService,
    private Exel: ExcelService,
    private spinner: NgxSpinnerService,
    private settings: SettingsService
//    private pipe:DatePipe
  ) { }

  ngOnInit() {
    this.usuario = this.settings.user['id'];
  }
  
  Guardar(valor){
    var dato = valor;
    var p = document.getElementById('palabra');
    var palabra = p['value'];
  }

  

  Generar(oficina,solicitante,reclutador,empresa,estatus,tiporeclu,tipocor,usercoo){
    this.LimpiaFiltro(0);
    this.LimpiaFiltro(1);

    this.spinner.show();
    document.getElementById('DivReportefil').classList.remove('ocultar');
    document.getElementById('Divprincipal').classList.add('ocultar');
    document.getElementById('DivDetalleCordi').classList.add('ocultar');
    document.getElementById('DivDetalleReclu').classList.add('ocultar');
    document.getElementById('DivProacti').classList.add('ocultar');
  var ofc = '';
  var sol = '';
  var rec = '';
  var emp = '';
  var est = '';
  let trcu = '';
  let coo = '';
  let ucor = '';

  if(oficina != undefined){
    for (let item of oficina) {
      ofc += item +',';

    }
  }

  if(usercoo != undefined){
    for (let item of usercoo) {
      ucor += item +',';
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
ucor = ucor == undefined?'0':ucor;


    let pal = document.getElementById('palabra');
    let inc = document.getElementById('fechaInicial');
    let fin = document.getElementById('fechaFinal');

    // var palabra = pal['value'];
    var inicio = inc['value'];
    var final = fin['value'];
    let tipo = document.getElementById('TipoReporte')['value'];
    let usuarios = this.usuario;
    
    this.Servicio.GetInforme("",ofc,tipo,inicio,final,emp,sol,trcu,coo,est,rec,ucor,usuarios)
    .subscribe( data => {
    // this.popGenerico(data.mensaje,data.bandera,'Publicacion');
    this.requisiciones = data;
    this.General = data;
    this.onChangeTable(this.config);
    this.spinner.hide();
    
    this.numPosiciones = 0;
    data.forEach(item2 => {
      this.numPosiciones = this.numPosiciones + item2.numero;
     });
    
    });
  }

  Exportar(){
    var obj = [];

    this.General.forEach(item => {
      obj.push({
        'FOLIO': item.folio.toString(),
        'SOLICITUD': this.convertDateTime(item.fch_Creacion),
        'EMPRESA': item.empresa,
        'PUESTO' : item.vBtra,
        'ESTADO': item.estado,
        
        'NO.'	: item.numero,
        'CUBIERTA':item.cubierta,
        'CUMPLIMIENTO'	: item.porcentaje + '%',
        'ESTATUS': item.estatus,
        'FECHA ESTATUS': this.convertDateTime(item.fch_Modificacion),
        'COORDINACÍON ': item.clasesReclutamiento,
        'COORDINADOR':item.estatusId == 4? item.nombreReclutado == ''?'SIN ASIGNAR':item.nombreReclutado : item.cordinador2 == ''?'SIN ASIGNAR':item.cordinador2,
        'RECLUTADOR'  : item.nombreReclutado == '' || item.estatusId == 4?'SIN ASIGNAR':item.nombreReclutado,
        'SOLICITA': item.nombreApellido,
      })
     });
     this.Exel.exportAsExcelFile(obj,'Reporte')
  }
  convertDateTime(dateTime){
    if(dateTime != undefined){
      var res = dateTime.substring(0, 10);
    //  var result = Date.parse(res);
      var date = res.split("-");
      var yyyy = date[0];
      var mm = date[1];
      var dd = date[2];
      var fecha = dd +'/' + mm+'/' + yyyy
      return (fecha);
    }
   // var date = res.split("-");
   // var yyyy = date[0];
   // var mm = date[1];
   // var dd = date[2];
 // var fecha = yyyy+'-' + mm + dd
//  return new Date(yyyy,mm,dd);
   return ('');
}



LimpiaFiltro(valor){
  if(valor = 0){
    this.columns = [];
  }else{
    this.columns = [
      { title: 'Folio', className: 'text-success text-center', name: 'folio', filtering: { filterString: '', placeholder: 'Folio' } },
      { title: 'Solicitud', className: 'text-success text-center', name: 'fch_Creacion', filtering: { filterString: '', placeholder: 'aaaa-mm-dd' } },
      { title: 'Empresa', className: 'text-info text-center', name: 'empresa', filtering: { filterString: '', placeholder: 'Empresa' } },
      { title: 'Puesto', className: 'text-info text-center', name: 'vBtra', filtering: { filterString: '', placeholder: 'Puesto' } },
      { title: 'Estado', className: 'text-info text-center', name: 'estado', filtering: { filterString: '', placeholder: 'Estado' } },
     
      { title: 'No.', className: 'text-info text-center', name: 'numero' , filtering: { filterString: '', placeholder: 'No. vacante' } },
      { title: 'Cubierta', className: 'text-info text-center', name: 'cubierta' , filtering: { filterString: '', placeholder: 'Cubiertas..' } },
      { title: 'Cumplimiento', className: 'text-info text-center', name: 'porcentaje', filtering: { filterString: '', placeholder: 'Cumplimiento..' } },
      { title: 'Estatus', className: 'text-info text-center', name: 'estatus', filtering: { filterString: '', placeholder: 'Estatus' } },
      { title: 'Fecha Estatus', className: 'text-info text-center', name: 'fch_Modificacion', filtering: { filterString: '', placeholder: 'aaaa-mm-dd' } },
      { title: 'Coordinación', className: 'text-info text-center', name: 'clasesReclutamiento', filtering: { filterString: '', placeholder: 'Coordinacion' } },
      { title: 'Coordinador', className: 'text-info text-center', name: 'cordinador2', filtering: { filterString: '', placeholder: 'Coordinador' } },
      { title: 'Reclutador', className: 'text-info text-center', name: 'nombreReclutado', filtering: { filterString: '', placeholder: 'No. Reclutador' } },
      { title: 'Solicita', className: 'text-info text-center', name: 'propietario', filtering: { filterString: '', placeholder: 'Solicita' } }
    ];
  }
}


 




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

  this.spinner.hide();
}
//#endregion

public refreshTable(oficina,solicitante,reclutador,empresa,estatus,tiporeclu,tipocor,usercoo) {
  this.Generar(oficina,solicitante,reclutador,empresa,estatus,tiporeclu,tipocor,usercoo);
}

public clearfilters() {
  this.columns.forEach(element => {
    element.filtering.filterString = '';
    (<HTMLInputElement>document.getElementById(element.name)).value = '';
  });
  this.onChangeTable(this.config);

}




}
