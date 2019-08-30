import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReportesService } from '../../../service/Reporte/reportes.service';
import { ExcelService } from '../../../service/ExcelService/excel.service';

@Component({
  selector: 'app-cubierto',
  templateUrl: './cubierto.component.html',
  styleUrls: ['./cubierto.component.scss']
})
export class CubiertoComponent implements OnInit {

  public General : any[];
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

  registros: any;
  showFilterRow: boolean;

  constructor(private servicio:ReportesService, 
              private spinner:NgxSpinnerService,
              private Exel: ExcelService,
            ) { }

  ngOnInit() {
    
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
   return ('');
}

  Exportar(){
    var obj = [];

    this.General.forEach(item => {
      obj.push({
        'FOLIO': item.folio.toString(),
        'CLIENTE': item.empresa,
        'PERFIL' : item.vBtra,
        'FECHA ESTATUS': this.convertDateTime(item.fch_Modificacion),
        'POSICIONES'	: item.numero,
        'CANDIDATOS':item.nombreCandidato == ''?'0':item.nombreCandidato,
        'COMENTARIOS'	: item.listaComentario == ''?'0':item.listaComentario,
        'SOLICITA': item.nombreApellido,
        'COORDINADOR':item.estatusId == 4? item.nombreReclutado == ''?'SIN ASIGNAR':item.nombreReclutado : item.cordinador2 == ''?'SIN ASIGNAR':item.cordinador2,
        'RECLUTADOR'  : item.nombreReclutado == '' || item.estatusId == 4?'SIN ASIGNAR':item.nombreReclutado
      })
     });
     this.Exel.exportAsExcelFile(obj,'Reporte')
  }

  Generar(oficina,solicitante,reclutador,empresa,estatus,tiporeclu,tipocor,usercoo){
    this.LimpiaFiltro(0);
    this.LimpiaFiltro(1);

    this.spinner.show();
    document.getElementById('DivCubiertoReport').classList.remove('ocultar');
  
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

    this.servicio.GetInforme("",ofc,tipo,inicio,final,emp,sol,trcu,coo,est,rec,ucor)
    .subscribe( data => {
    // this.popGenerico(data.mensaje,data.bandera,'Publicacion');
    this.requisiciones = data;
    this.General = data;
    this.onChangeTable(this.config);
    this.spinner.hide();

    });
  }

  LimpiaFiltro(valor){
    if(valor = 0){
      this.columns = [];
    }else{
      this.columns = [
        { title: 'Folio', className: 'text-success text-center', name: 'folio', filtering: { filterString: '', placeholder: 'Folio' } },
        { title: 'Cliente', className: 'text-info text-center', name: 'empresa', filtering: { filterString: '', placeholder: 'Empresa' } },
        { title: 'Perfil', className: 'text-info text-center', name: 'vBtra', filtering: { filterString: '', placeholder: 'Perfil' } },
        { title: 'Fecha Estatus', className: 'text-info text-center', name: 'fch_Modificacion', filtering: { filterString: '', placeholder: 'aaaa-mm-dd' } },
        { title: 'Posiciones', className: 'text-info text-center', name: 'numero', filtering: { filterString: '', placeholder: 'Posiciones' } },
        { title: 'Candidatos', className: 'text-info text-center', name: 'nombreCandidato', filtering: { filterString: '', placeholder: 'Candidatos' } },
        { title: 'Comentarios', className: 'text-info text-center', name: 'listaComentario', filtering: { filterString: '', placeholder: 'Comentarios' } },
        { title: 'Solicita', className: 'text-info text-center', name: 'propietario', filtering: { filterString: '', placeholder: 'Solicita' } },
        { title: 'Coordinador', className: 'text-info text-center', name: 'cordinador2', filtering: { filterString: '', placeholder: 'Coordinador' } },
        { title: 'Reclutador', className: 'text-info text-center', name: 'nombreReclutado', filtering: { filterString: '', placeholder: 'No. Reclutador' } }
        
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
