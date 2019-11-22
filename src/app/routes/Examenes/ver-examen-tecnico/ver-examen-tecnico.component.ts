import { ExamenesService } from './../../../service/Examenes/examenes.service';
import { Component, OnInit } from '@angular/core';
import { ToasterConfig, ToasterService, Toast } from 'angular2-toaster';
import { ApiConection } from '../../../service';

@Component({
  selector: 'app-ver-examen-tecnico',
  templateUrl: './ver-examen-tecnico.component.html',
  styleUrls: ['./ver-examen-tecnico.component.scss']
})
export class VerExamenTecnicoComponent implements OnInit {
  // scroll
  disabled = false;
  compact = false;
  invertX = false;
  invertY = false;
  shown = 'hover';

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
  // Varaibles del paginador
  public page = 1;
  public itemsPerPage = 20;
  public maxSize = 5;
  public numPages = 1;
  public length = 0;
  examenes = [];
  public rows: Array<any> = [];
  public columns: Array<any> = [
    { title: 'Tipo Examen', className: 'text-info text-center', name: 'tipo', filtering: { filterString: '', placeholder: 'Tipo Examen' } },
    { title: 'Nombre Examen', className: 'text-info text-center', name: 'examen', filtering: { filterString: '', placeholder: 'Nombre' } },
    { title: 'Descripcion', className: 'text-info text-center',
    name: 'descripcion', filtering: { filterString: '', placeholder: 'Descripcion' } },
    { title: 'No. Preguntas', className: 'text-info text-center',
    name: 'numPreguntas', filtering: { filterString: '', placeholder: 'Numero' } },
    {
      title: 'Fecha Creacion', className: 'text-info text-center',
      name: 'fch_Creacion', filtering: { filterString: '', placeholder: 'aaaa-mm-dd' }
    },
    { title: 'Usuario', className: 'text-info text-center', name: 'usuario', filtering: { filterString: '', placeholder: 'usuario' } },
  ];
  public config: any = {
    paging: true,
    filtering: { filterString: '' },
    className: ['table-hover  mb-0']
  };
  rowAux = [];
  examen: any = [];
  verExamen = false;
  constructor(private service: ExamenesService, private toasterService: ToasterService) { }

  ngOnInit() {
    this.GetCatalogoExamenes();
  }
  GetCatalogoExamenes() {
    this.service.GetAllExamenes().subscribe(data => {
      this.examenes = data;
      this.onChangeTable(this.config);
    });
  }
  GetExamen(ExamenId) {
    this.service.GetExamen(ExamenId).subscribe(data => {
      this.examen = data;
      this.examen.forEach(element => {
        if (element.file !== '') {
          element.file = ApiConection.ServiceUrlImgExamenes + element.file;
        }
        element.respuestas.forEach(e => {
          if (e.file !== '') {
            e.file = ApiConection.ServiceUrlImgExamenes + e.file;
          }
        });
      });
      this.verExamen = true;
    });
  }

  public changePage(page: any, data: Array<any> = this.examenes): Array<any> {
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
            return item[column.name].toString().toLowerCase().match(column.filtering.filterString.toLowerCase());
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

    this.rows = this.examenes;
    const filteredData = this.changeFilter(this.rows, this.config);
    this.rows = page && config.paging ? this.changePage(page, filteredData) : filteredData;
    this.length = filteredData.length;
  }
  onSelect(row) {
    row.selected ? row.selected = false : row.selected = true;

    if (this.rowAux.length === 0) {
      this.rowAux = row;
    } else if (row.selected && this.rowAux !== []) {
      const aux = row;
      row = this.rowAux;
      row.selected = false;
      aux.selected = true;
      this.rowAux = aux;
    }
  }

  public refreshTable() {

    this.GetCatalogoExamenes();
    setTimeout(() => {
      this.columns.forEach(element => {
        element.filtering.filterString = '';
        (<HTMLInputElement>document.getElementById(element.name)).value = '';
      });
    }, 100);
    this.rowAux = [];
  }

  public clearfilters() {
    this.columns.forEach(element => {
      element.filtering.filterString = '';
      (<HTMLInputElement>document.getElementById(element.name)).value = '';
    });
    this.onChangeTable(this.config);
  }

  popToast(type: any, title: any, body: any) {
    const toast: Toast = {
      type: type,
      title: title,
      timeout: 4000,
      body: body
    };
    this.toasterService.pop(toast);

  }
}
