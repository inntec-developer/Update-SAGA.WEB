import { EquiposTrabajoService } from './../../../service/EquiposDeTrabajo/equipos-trabajo.service';

import { Component, Input, OnInit } from '@angular/core';

import { AppComponent } from './../../../app.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { VacantesService } from '../../../service/TrackingVacantes/vacantes.service';

@Component({
  selector: 'app-vacantes',
  templateUrl: './vacantes.component.html',
  styleUrls: ['./vacantes.component.css'],
  providers: [VacantesService, NgxSpinnerService]
})
export class VacantesComponent implements OnInit {

  @Input() public clienteId;
  @Input() public flag = 0; // para saber si vengo de tracking o de clientes

  //config scroll
  disabled = false;
  compact = false;
  invertX = true;
  invertY = true;
  shown = 'hover';

  //table paginador
  registrosInfo: number;
  public dataInfoRequi: Array<any> = [];
  public rowsInfo: Array<any> = [];
  public pageInfo: number = 1;
  public itemsPerPageInfo: number = 5;
  public maxSizeInfo: number = 5;
  public numPagesInfo: number = 1;
  public lengthInfo: number = 0;
  clearFilter: boolean = false;

  public columnsInfo: Array<any> = [
    { title: 'FOLIO', className: 'text-success text-center', name: 'folio', filtering: { filterString: '', placeholder: 'FOLIO' } },
    { title: 'PERFIL', className: 'text-info text-center', name: 'vBtra', filtering: { filterString: '', placeholder: 'PERFIL' } },
    // { title: 'CLIENTE', className: 'text-info text-center', name: 'cliente', filtering: { filterString: '', placeholder: 'CLIENTE' } },
    { title: 'FECHA LÍMITE', className: 'text-info text-center', name: 'fch_limite', filtering: { filterString: '', placeholder: 'aaaa-mm-dd'}},
    { title: 'ESTATUS', className: 'text-info text-center', name: 'estatus', filtering: { filterString: '', placeholder: 'ESTATUS' } },
    { title: '# POSICIONES', className: 'text-info text-center', name: 'vacantes', filtering: { filterString: '', placeholder: '0' } },
    { title: '% AVANCE', className: 'text-info text-center', name: 'porcentaje', filtering: { filterString: '', placeholder: '% 0' } },
    { title: 'POSTULADOS', className: 'text-info text-center', name: 'postulados', filtering: { filterString: '', placeholder: '0' } },
    { title: 'ENTREVISTA', className: 'text-info text-center', name: 'entrevista', filtering: { filterString: '', placeholder: '0' } },
    { title: 'ABANDONÓ PROCESO', className: 'text-info text-center', name: 'abandono', filtering: { filterString: '', placeholder: '0' } },
    { title: 'DESCARTADOS', className: 'text-info text-center', name: 'descartados', filtering: { filterString: '', placeholder: '0' } },
    { title: 'ENVIADO CLIENTE', className: 'text-info text-center', name: 'enviados', filtering: { filterString: '', placeholder: '0' } },
    { title: 'RECHAZADOS', className: 'text-info text-center', name: 'rechazados', filtering: { filterString: '', placeholder: '0' } },
    { title: 'CONTRATADOS', className: 'text-info text-center', name: 'contratados', filtering: { filterString: '', placeholder: '0' } }
  ];
  public config: any = {
    paging: true,
    filtering: { filterString: '' },
    className: ['table-hover mb-0 ']
  };
  constructor(private service: VacantesService, private _service: EquiposTrabajoService,
    private spinner: NgxSpinnerService, private _appcomponent: AppComponent) { }

  ngOnInit() {
    if (this.flag === 0) {
    this.getInfoVacantes();
    } else {
      this.getInfoVacantes2();
    }
  }

  getInfoVacantes() {
    this.service.GetInformeRequisiciones(this.clienteId).subscribe(data => {
      this.dataInfoRequi = data;
      this.onChangeTableInfo(this.config);
    });
  }
  getInfoVacantes2() {
    this._service.GetInformeClientes(this.clienteId).subscribe(data => {
      this.dataInfoRequi = data;
    this.onChangeTableInfo(this.config);
    });
  }

  public changePageInfo(page: any, data: Array<any> = this.dataInfoRequi): Array<any> {
    const start = (page.page - 1) * page.itemsPerPage;
    const end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeFilterInfo(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columnsInfo.forEach((column: any) => {
      this.clearFilter = true;
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

  public onChangeTableInfo(config: any, page: any = { page: this.pageInfo, itemsPerPage: this.itemsPerPageInfo }): any {
    if (config.filtering) {
      (<any>Object).assign(this.config.filtering, config.filtering);
    }

    this.registrosInfo = this.dataInfoRequi.length;
    this.rowsInfo = this.dataInfoRequi;
    const filteredData = this.changeFilterInfo(this.dataInfoRequi, this.config);

    this.rowsInfo = page && config.paging ? this.changePageInfo(page, filteredData) : filteredData;
    this.lengthInfo =  filteredData.length;
    setTimeout(() => {
      this.spinner.hide();
    }, 500);


  }

  public refreshTableInfo() {
    this.ngOnInit();
    setTimeout(() => {
      this.columnsInfo.forEach(element => {
        element.filtering.filterString = '';
        (<HTMLInputElement>document.getElementById(element.name)).value = '';
      });

      this.onChangeTableInfo(this.config);
    }, 400);
  }

  public clearfilters() {

    this.clearFilter = false;
    // (<HTMLInputElement>document.getElementById('filterInput')).value = '';
    this.columnsInfo.forEach(element => {
      element.filtering.filterString = '';
      (<HTMLInputElement>document.getElementById(element.name)).value = '';
    });
    this.onChangeTableInfo(this.config);

  }
}
