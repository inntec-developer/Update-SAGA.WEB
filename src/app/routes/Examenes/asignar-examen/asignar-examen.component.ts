import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { ExamenesService } from './../../../service/Examenes/examenes.service';
import { RequisicionesService } from './../../../service/requisiciones/requisiciones.service';

@Component({
  selector: 'app-asignar-examen',
  templateUrl: './asignar-examen.component.html',
  styleUrls: ['./asignar-examen.component.scss']
})
export class AsignarExamenComponent implements OnInit {
  //scroll
  public disabled = false;
  public invertX = false;
  public compact = false;
  public invertY = false;
  public shown = 'hover';
  
  se = new FormControl('', [Validators.required]);
  ste = new FormControl('', [Validators.required]);
  nom: any;
  tipoId:any;
  catalogo = [];
  examenes = [];
  examen = [];
  examenRequi = [];
  requiselect = [];
  requisiciones = [];
  rows = [];
  registros = 0;
  examenId = 0;
  verExamen = false;
  filterData = [];

  public page: number = 1;
  public itemsPerPage: number = 20;
  public maxSize: number = 5;
  public numPages: number = 1;
  public length: number = 0;

  public columns: Array<any> = [
    { title: 'Folio', className: 'text-success text-center', name: 'folio', filtering: { filterString: '', placeholder: 'Folio' } },
    { title: 'Solicita', className: 'text-center', name: 'solicita', filtering: { filterString: '', placeholder: 'Solicita' } },
    { title: 'Cliente', className: 'text-center', name: 'cliente', filtering: { filterString: '', placeholder: 'Cliente' } },
    { title: 'Perfil', className: 'text-center', name: 'vBtra', filtering: { filterString: '', placeholder: 'Perfil' } },
    { title: 'Creación', className: 'text-center', name: 'fch_Creacion', filtering: { filterString: '', placeholder: 'aaaa-mm-dd' } },
  ];

  constructor(private service: ExamenesService, private toasterService: ToasterService, private requiservicio: RequisicionesService) { }
//#region paginador
  public config: any = {
    paging: true,
    //sorting: { columns: this.columns },
    filtering: { filterString: '' },
    className: ['table-hover mb-0 ']
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
        filteredData = filteredData.filter((item: any) => {
          if (item[column.name] != null)
            return item[column.name].toString().toLowerCase().match(column.filtering.filterString.toLowerCase());
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

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
    //       }|
    //     }
    //   });
    //   if (flag) {

    //     tempArray.push(item);
    //   }
    // });
    // filteredData = tempArray;

    return filteredData;
  }

  //#endregion

  ngOnInit() {
    this.GetCatalogoExamenes();
    this.GetRequisiciones();
  }

  public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
    if (config.filtering) {
      (<any>Object).assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      (<any>Object).assign(this.config.sorting, config.sorting);
    }

    this.rows = this.requisiciones;
    let filteredData = this.changeFilter(this.requisiciones, this.config);
    //let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, filteredData) : filteredData;
    this.registros = this.rows.length;
    this.length = filteredData.length;

  }
  GetCatalogoExamenes()
  {
    this.service.GetCatalogo().subscribe(data =>{
      this.catalogo = data;
    })
  }

  GetExamenes(tipoexamenId)
  {
    this.service.GetExamenes(tipoexamenId).subscribe(data => {
      this.examenes = data;
    })
  }

  GetExamen(ExamenId)
  {
    this.service.GetExamen(ExamenId).subscribe(data => {
      this.examen = data;
    })
  }

  GetRequisiciones()
  {
    this.service.GetRequisicionesEstatus(4).subscribe(data => {
      this.requisiciones = data;
      this.filterData = data;

      this.onChangeTable(this.config)
    })
  }

  GetExamenRequi(requisicionId)
  {
    this.service.GetExamenRequi(requisicionId).subscribe(data => {
      this.examenRequi = data;
      this.verExamen = true;
    })
  }

  AgregarRelacion()
  {
    if(this.requiselect.length > 0)
    {
      var relacion = [];
      this.requiselect.forEach(element => {
         relacion.push( {RequisicionId: element.id, ExamenId: this.examenId});
      });

      this.service.InsertRelacion(relacion).subscribe(data => {
        if(data == 200)
        {
          this.popToast('success', 'Asignar Examen', 'La relacion requisición examen se genero con éxito');
          this.requiselect = [];
          this.GetRequisiciones();
          this.se.setValue(0);
          this.ste.setValue(0);
          this.examen = [];
          this.examenes = [];
        }
        else
        {
          this.popToast('error', 'Asignar Examen', 'Ocurrio un error');
        }
      })
    }

  }

  closeModal()
  {
    this.verExamen = false;
  }
  onSelect(row)
  {
    if(row.examen)
    {
      row.selected = false;
    }
    else
    {
      row.selected ? row.selected = false : row.selected = true;

      if(row.selected)
      {
        this.requiselect.push(row);
      }
      else
      {
        this.requiselect = this.requiselect.filter(function(item)
        {
          if(item.folio !== row.folio)
          {
            return item;
          }
        });
      }
    }

  }
  public Search(data: any) {
    let tempArray: Array<any> = [];
    let colFiltar: Array<any> = [{ title: "folio" }, {title: "vBtra"}];

    this.filterData.forEach(function (item) {
      let flag = false;
      colFiltar.forEach(function (c) {
        if (item[c.title].toString().toLowerCase().match(data.target.value.toLowerCase())) {
          flag = true;
        }
      });

      if (flag) {
        tempArray.push(item)
      }
    });

    this.requisiciones = tempArray;
  }


   /**
  * configuracion para mensajes de acciones.
  */
 toaster: any;
 toasterConfig: any;
 toasterconfig: ToasterConfig = new ToasterConfig({
   positionClass: 'toast-bottom-right',
   limit: 7,
   tapToDismiss: false,
   showCloseButton: true,
   mouseoverTimerStop: true,
   preventDuplicates: true,
 });

 popToast(type, title, body) {
   var toast: Toast = {
     type: type,
     title: title,
     timeout: 4000,
     body: body
   }
   this.toasterService.pop(toast);

 }
}
