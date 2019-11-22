import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { ExamenesService } from './../../../service/Examenes/examenes.service';
import { RequisicionesService } from './../../../service/requisiciones/requisiciones.service';
import { ApiConection } from '../../../service/api-conection.service';

@Component({
  selector: 'app-asignar-examen',
  templateUrl: './asignar-examen.component.html',
  styleUrls: ['./asignar-examen.component.scss']
})
export class AsignarExamenComponent implements OnInit {
  // scroll
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
  examenId = 0;
  verExamen = false;

  public page = 1;
  public itemsPerPage = 20;
  public maxSize = 5;
  public numPages = 1;
  public length = 0;

  public columns: Array<any> = [
    { title: 'Folio', className: 'text-success text-center', name: 'folio', filtering: { filterString: '', placeholder: 'Folio' } },
    { title: 'Solicita', className: 'text-center', name: 'solicita', filtering: { filterString: '', placeholder: 'Solicita' } },
    { title: 'Cliente', className: 'text-center', name: 'cliente', filtering: { filterString: '', placeholder: 'Cliente' } },
    { title: 'Perfil', className: 'text-center', name: 'vBtra', filtering: { filterString: '', placeholder: 'Perfil' } },
    { title: 'Creación', className: 'text-center', name: 'fch_Creacion', filtering: { filterString: '', placeholder: 'aaaa-mm-dd' } },
  ];

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
  constructor(private service: ExamenesService, private toasterService: ToasterService, private requiservicio: RequisicionesService) { }
//#region paginador
  public config: any = {
    paging: true,
    filtering: { filterString: '' },
    className: ['table-hover mb-0 ']
  };

  public changePage(page: any, data: Array<any> = this.requisiciones): Array<any> {
    const start = (page.page - 1) * page.itemsPerPage;
    const end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }


  public changeFilter(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columns.forEach((column: any) => {
      if (column.filtering.filterString != "") {
        filteredData = filteredData.filter((item: any) => {
          if (item[column.name] != null) {
            return item[column.name].toString().toLowerCase().match(column.filtering.filterString.toLowerCase());
          }
          });
      }
    });
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

    this.rows = this.requisiciones;
    const filteredData = this.changeFilter(this.requisiciones, this.config);
    this.rows = page && config.paging ? this.changePage(page, filteredData) : filteredData;
    this.length = filteredData.length;

  }
  GetCatalogoExamenes() {
    this.service.GetCatalogo().subscribe(data =>{
      this.catalogo = data;
    });
  }

  GetExamenes(tipoexamenId) {
    this.service.GetExamenes(tipoexamenId).subscribe(data => {
      this.examenes = data;
    });
  }

  GetExamen(ExamenId) {
    this.service.GetExamen(ExamenId).subscribe(data => {
      this.examen = data;
      this.examen.forEach(element => {
        if (element.file !== '') {
          element.file = ApiConection.ServiceUrlImgExamenes + element.file;
        }
      });
    });
  }

  GetRequisiciones() {
    this.service.GetRequisicionesEstatus(4).subscribe(data => {
      this.requisiciones = data;
      this.onChangeTable(this.config);
    });
  }

  GetExamenRequi(requisicionId) {
    this.service.GetExamenRequi(requisicionId).subscribe(data => {
      this.examenRequi = data;
      this.examenRequi.forEach(element => {
        if (element.file !== '') {
          element.file = ApiConection.ServiceUrlImgExamenes + element.file;
        }
      });
      this.verExamen = true;
    });
  }

  AgregarRelacion() {
    if (this.requiselect.length > 0) {
      const relacion = [];
      this.requiselect.forEach(element => {
         relacion.push( {RequisicionId: element.id, ExamenId: this.examenId});
      });

      this.service.InsertRelacion(relacion).subscribe(data => {
        if (data === 200) {
          this.popToast('success', 'Asignar Examen', 'La relación requisición examen se generó con éxito');
          this.requiselect = [];
          this.GetRequisiciones();
          this.se.setValue(0);
          this.ste.setValue(0);
          this.examen = [];
          this.examenes = [];
        }
        else
        {
          this.popToast('error', 'Asignar Examen', 'Ocurrió un error');
        }
      })
    }

  }

  closeModal() {
    this.verExamen = false;
  }
  onSelect(row) {
    if (row.examen) {
      row.selected = false;
    } else {
      row.selected ? row.selected = false : row.selected = true;

      if (row.selected) {
        this.requiselect.push(row);
      } else {
        this.requiselect = this.requiselect.filter(function(item) {
          if (item.folio !== row.folio) {
            return item;
          }
        });
      }
    }
  }
  public refreshTable() {
    this.columns.forEach(element => {
      element.filtering.filterString = '';
      (<HTMLInputElement>document.getElementById(element.name)).value = '';
    });
    this.rows.forEach(e => {
      e.selected = false;
    });
    this.requiselect = [];
    this.onChangeTable(this.config);
}

public clearfilters() {

  this.columns.forEach(element => {
    element.filtering.filterString = '';
    (<HTMLInputElement>document.getElementById(element.name)).value = '';
  });



  this.onChangeTable(this.config);

}

 popToast(type, title, body) {
   const toast: Toast = {
     type: type,
     title: title,
     timeout: 4000,
     body: body
   };
   this.toasterService.pop(toast);

 }
}
