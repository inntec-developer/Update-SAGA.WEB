import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReportesService } from '../../../service/Reporte/reportes.service';
import { ExcelService } from '../../../service/ExcelService/excel.service';


@Component({
  selector: 'app-candidatobolsa',
  templateUrl: './candidatobolsa.component.html',
  styleUrls: ['./candidatobolsa.component.scss']
})
export class CandidatobolsaComponent implements OnInit {
  public General : any[];
  public palabra :string;
 
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

  constructor(
    private servicio:ReportesService, 
    private spinner:NgxSpinnerService,
    private Exel: ExcelService,
    
  ) { }

  ngOnInit() {
  }

  Exportar(){
    var obj = [];
   
    this.General.forEach(item => {
      obj.push({
        'NOMBRE': item.nombre,
        'ESTADO': item.estado,
        'EDAD': item.edad,
        'GENERO' : item.genero,
        'ESTATUS' : item.estatus,
        'CURP' : item.curp,
        'RFC' : item.rfc,
      })
     });
     this.Exel.exportAsExcelFile(obj,'Reporte')
  }

  Generar(estado,estatus){
    this.spinner.show();
    document.getElementById('DivCandidato').classList.remove('ocultar');


    var est = '';
    var stus = '';
   
    // let pal = document.getElementById('palabra');
    let inc = document.getElementById('fechaInicial');
    let fin = document.getElementById('fechaFinal');
    let edad = document.getElementById('EdadReporte');
    let genero = document.getElementById('GeneroReporte');

    if(estado != undefined){
      for (let item of estado) {
        est += item +',';
      }
    }

    if(estatus != undefined){
      for (let item of estatus) {
        stus += item +',';
      }
    }

    est = est == undefined?'0':est;
    stus = stus == undefined?'0':stus;
   
    // var palabra = pal['value'];
    var inicio = inc['value'];
    var final = fin['value'];
    var edadC = edad['value'];
    var generoC = genero['value'];
   
    let tipo = document.getElementById('TipoReporte')['value'];
    
    this.servicio.getCandidatos(inicio,final,edadC,generoC,est,stus)
    .subscribe( data => {
    // this.popGenerico(data.mensaje,data.bandera,'Publicacion');
    this.requisiciones = data;
    this.General = data;
    this.onChangeTable(this.config);
    this.spinner.hide();
    
    });
  }


public columns: Array<any> = [
  { title: 'NOMBRE', className: 'text-info text-center', name: 'nombre', filtering: { filterString: '', placeholder: 'nombre' } },
  { title: 'ESTADO', className: 'text-success text-center', name: 'estado', filtering: { filterString: '', placeholder: 'estado' } },
  { title: 'EDAD', className: 'text-success text-center', name: 'edad', filtering: { filterString: '', placeholder: 'edad' } },
  { title: 'GENERO', className: 'text-success text-center', name: 'genero', filtering: { filterString: '', placeholder: 'Genero' } },
  { title: 'ESTATUS', className: 'text-success text-center', name: 'estatus', filtering: { filterString: '', placeholder: 'estatus' } },
  { title: 'CURP', className: 'text-success text-center', name: 'curp', filtering: { filterString: '', placeholder: 'curp' } },
  { title: 'RFC', className: 'text-success text-center', name: 'rfc', filtering: { filterString: '', placeholder: 'rfc' } }
];



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


public refreshTable(estado,estatus) {
  this.Generar(estado,estatus);
}

public clearfilters() {
  this.columns.forEach(element => {
    element.filtering.filterString = '';
    (<HTMLInputElement>document.getElementById(element.name)).value = '';
  });
  this.onChangeTable(this.config);

}

}