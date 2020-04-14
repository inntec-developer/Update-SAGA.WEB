import { SettingsService } from './../../../core/settings/settings.service';
import { Component, OnInit } from '@angular/core';
import { ExamenesService } from '../../../service/Examenes/examenes.service';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entrevistas',
  templateUrl: './entrevistas.component.html',
  styleUrls: ['./entrevistas.component.scss']
})
export class EntrevistasComponent implements OnInit {
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


  examenes = [];
  element = [];
  verExamen = false;
  editing = {};
  // Varaibles del paginador
  public page = 1;
  public itemsPerPage = 20;
  public maxSize = 5;
  public numPages = 1;
  public length = 0;
  editar = false;
  public rows: Array<any> = [];
  public columns: Array<any> = [
    { title: 'Nombre', className: 'text-info text-center', name: 'nombre', filtering: { filterString: '', placeholder: 'Nombre' } },
    { title: 'No. Preguntas', className: 'text-info text-center', name: 'num', filtering: { filterString: '', placeholder: 'Numero' } },
    { title: 'Fecha', className: 'text-info text-center',
    name: 'fch_Creacion', filtering: { filterString: '', placeholder: 'aaaa-mm-dd' } },
    { title: 'Usuario', className: 'text-info text-center', name: 'usuario', filtering: { filterString: '', placeholder: 'usuario' } },
  ];
  public config: any = {
    paging: true,
    filtering: { filterString: '' },
    className: ['table-hover  mb-0']
  };
  rowAux = [];

  constructor(private _service: ExamenesService,  private settings: SettingsService,
     private toasterService: ToasterService,
     private _Router: Router) { }

  ngOnInit() {
    this.GetExamenes();
  }

  GetExamenes() {
    this._service.GetExamenesEntrevista().subscribe(data => {
      this.examenes = data;
      this.examenes.forEach(element => {
        const aux = [];
        for (let c = 1; c < element.num; c++) {
          aux.push(c);
        }
        element.numPreguntas = aux;
      });

      this.onChangeTable(this.config);
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
    this.element = row;
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

  cambiarAle(num, examenId, rowIndex) {
    const aux = {examenId: examenId, numPreguntas: num, fch_Modificacion: new Date, usuarioId: this.settings.user['id']};
    this._service.UpdateAlea(aux).subscribe(result => {
      if (result !== 417) {
        this.popToast('success', 'Actualizar Datos', 'los datos se actualizaron con éxito');
        this.editing[rowIndex + '-alea'] = false;
        this.refreshTable();
      } else {
        this.popToast('error', 'Actualizar Datos', 'Ocurrio un error al intentar actualizar');
        this.editing[rowIndex + '-alea'] = false;
      }
    });
  }

  addExamen() {
    this._Router.navigate(['/examenes/addexamen/'], {queryParams: {ruta: 1}, skipLocationChange: true});
  }

  generarEntrevista() {
    this._Router.navigate(['/examenes/generarentrevista/'], { skipLocationChange: true});
  }
  contestarExamen() {
    this._Router.navigate(['/examenes/verentrevista/'], { skipLocationChange: true });
  }

  public refreshTable() {

    this.GetExamenes();
    setTimeout(() => {
      this.columns.forEach(element => {
        element.filtering.filterString = '';
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
