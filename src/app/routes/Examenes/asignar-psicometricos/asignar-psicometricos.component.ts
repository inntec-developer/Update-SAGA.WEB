import { ExcelService } from './../../../service/ExcelService/excel.service';
import { Component, OnInit } from '@angular/core';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';
import { DatePipe } from '@angular/common';
import { ExamenesService } from './../../../service/Examenes/examenes.service';
import { SettingsService } from '../../../core/settings/settings.service';

@Component({
  selector: 'app-asignar-psicometricos',
  templateUrl: './asignar-psicometricos.component.html',
  styleUrls: ['./asignar-psicometricos.component.scss']
})
export class AsignarPsicometricosComponent implements OnInit {

  // scroll
  public disabled = false;
  public invertX = false;
  public compact = false;
  public invertY = false;
  public shown = 'hover';

  public page = 1;
  public itemsPerPage = 20;
  public maxSize = 5;
  public numPages = 1;
  public length = 0;

  requisiciones = [];
  seleccionados = [];
  listClaves = [];
  clave = '';
  spinner = false;
  clavesRequi = [];
  verClaves = false;
  registros: number;
  filterData = [];
  public columns: Array<any> = [
    { title: 'Folio', className: 'text-success text-center', name: 'folio', filtering: { filterString: '', placeholder: 'Folio' } },
    { title: 'Perfil', className: 'text-center', name: 'vBtra', filtering: { filterString: '', placeholder: 'Perfil' } },
    { title: 'Psicometrico', className: 'text-center', name: 'nombre', filtering: { filterString: '', placeholder: 'Psicometrico' } },
    { title: 'Claves disponibles', className: 'text-center', name: 'claves', filtering: { filterString: '', placeholder: 'Claves' } },
  ];
  public config: any = {
    paging: true,
    filtering: { filterString: '' },
    className: ['table-hover mb-0 ']
  };
  rows = [];
  NumClaves = 0;
  folio: any;
  id: any;
  constructor(
    private _serviceExamen: ExamenesService,
    private toasterService: ToasterService,
    private settings: SettingsService,
    private pipe: DatePipe,
    private excelService: ExcelService) { }

  ngOnInit() {
    this.GetRequisiciones();

  }

  //#region paginador
  public changePage(page: any, data: Array<any> = this.requisiciones): Array<any> {
    const start = (page.page - 1) * page.itemsPerPage;
    const end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeFilter(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columns.forEach((column: any) => {
      if (column.filtering.filterString !== '') {
        filteredData = filteredData.filter((item: any) => {
          if (item[column.name] != null)
          {
            if(!Array.isArray(item[column.name])) {
              return item[column.name].toString().toLowerCase().match(column.filtering.filterString.toLowerCase());
            } else {
              const aux = item[column.name];
              let flag = false;
              if (item[column.name].length > 0) {
                  item[column.name].forEach(element => {
                    if (element.toString().toLowerCase().match(column.filtering.filterString.toLowerCase())) {
                      flag = true;
                      return;
                    }
                  });

                  if (flag) {
                    return item[column.name];
                  }
              } else {
                  return item[column.name];
              }
            }
          } else {
            return 'sin asignar';
          }
        });
      }
    });

    return filteredData;
  }

  //#endregion
  public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
    if (config.filtering) {
      (<any>Object).assign(this.config.filtering, config.filtering);
    }

    const filteredData = this.changeFilter(this.requisiciones, this.config);
    this.rows = page && config.paging ? this.changePage(page, filteredData) : filteredData;
    this.registros = this.rows.length;
    this.length = filteredData.length;

  }
  CloseModal() {
    this.verClaves = false;
  }
  GetRequisiciones() {
    this._serviceExamen.GetRequisicionesPsico().subscribe(data => {
      this.requisiciones = data;
      this.filterData = data;
      this.NumClaves = 0;
      this.requisiciones.forEach(element => {
        this.NumClaves += element.claves;
      });

      this.onChangeTable(this.config);
    });
  }

  GetClaves(row) {
    this._serviceExamen.GetClaves(row.requisicionId).subscribe(data => {
      this.clavesRequi = data;
      this.onSelect(row);
    });
  }

  AgregarClave(clave) {
    if (clave.length === 16) {
      if (this.listClaves.length > 0) {
        const idx = this.listClaves.indexOf(clave);

        if (idx === -1) {
          this.listClaves.push(clave);
        }
      } else {
        this.listClaves.push(clave);
      }

      this.clave = '';
    }

  }

  Agregar() {
    if (this.seleccionados.length > 0) {
      this.spinner = true;
      const aux = [];
      this.listClaves.forEach(item => {
        aux.push({ RequisicionId: this.seleccionados[0].requisicionId, UsuarioId: this.settings.user['id'], Clave: item });
      });

      this._serviceExamen.InsertClaves(aux).subscribe(data => {
        if (data === 200) {
          this.popToast('success', 'Generar Claves', 'Las claves se agregaron con éxito');
          this.seleccionados = [];
          this.listClaves = [];
          this.GetRequisiciones();
          this.spinner = false;

        } else {
          this.popToast('error', 'Generar Claves', 'Ocurrio un error al intentar agregar claves');
          this.spinner = false;
        }
      });
    }
  }

  PopClave(row) {
    this.listClaves = this.listClaves.filter(function (item) {
      if (item !== row) {
        return item;
      }
    });
  }
  onSelect(row) {
    row.selected ? row.selected = false : row.selected = true;
    this.folio = row.folio;
    this.id = row.requisicionId;

    this.requisiciones.filter(function (item) {
      if (item.requisicionId !== row.requisicionId) {
        item.selected = false;
      }
    });

    if (row.selected) {
      if (this.seleccionados.length > 0) {
        this.seleccionados.pop();
        this.seleccionados.push(row)
      } else {
        this.seleccionados.push(row);
      }
    } else {
      this.seleccionados.pop();
    }
  }

  public Search(data: any) {
    const tempArray: Array<any> = [];
    const colFiltar: Array<any> = [{ title: 'folio' }, { title: 'vBtra' }];

    this.filterData.forEach(function (item) {
      let flag = false;
      colFiltar.forEach(function (c) {
        if (item[c.title].toString().toLowerCase().match(data.target.value.toLowerCase())) {
          flag = true;
        }
      });

      if (flag) {
        tempArray.push(item);
      }
    });

    this.requisiciones = tempArray;
  }

  public refreshTable() {
      this.columns.forEach(element => {
       (<HTMLInputElement>document.getElementById(element.name)).value = '';
       element.filtering.filterString = '';
      });
    this.GetRequisiciones();
  }

  public clearfilters() {
    this.columns.forEach(element => {
      element.filtering.filterString = '';
      (<HTMLInputElement>document.getElementById(element.name)).value = '';
    });
    this.onChangeTable(this.config);
  }
  exportAsXLSX() {

    if (this.requisiciones.length > 0) {
      const aux = [];
      let psico = '';
      this.requisiciones.forEach(row => {
        row.psicometricos.forEach(element => {
          psico = psico + ', ' + element.nombre;
        });

        aux.push({
          'FOLIO': row.folio,
          'PERFÍL PSICOMÉTRICO': psico,
          'No. CLAVES GENERADAS': row.claves,
          'CLAVES GENERADAS PARA FOLIO': this.NumClaves
        });

      });

      this.excelService.exportAsExcelFile(aux, 'Reporte_Turnos_Atendidos');

    }
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
