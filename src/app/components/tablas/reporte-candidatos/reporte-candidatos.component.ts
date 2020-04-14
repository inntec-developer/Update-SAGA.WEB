import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { ComponentsService } from './../../../service/Components/components.service';
import { InfoCandidatoService } from '../../../service/SeguimientoVacante/info-candidato.service';
import { SettingsService } from '../../../core/settings/settings.service';

@Component({
  selector: 'app-reporte-candidatos',
  templateUrl: './reporte-candidatos.component.html',
  styleUrls: ['./reporte-candidatos.component.scss'],
  providers: [ComponentsService]
})
export class ReporteCandidatosComponent implements OnInit {
  @Input('RequisicionId') RequisicionId: any;
  @Input('EstatusId') EstatusId: any;
  @ViewChild('modallib') modal: any;

  public disabled = false;
  public compact = false;
  public invertX = false;
  public invertY = false;
  public shown = 'shown';

  public UsuarioId: string;
  public objLiberar: Array<any> = [];
  public CandidatoId: string;
  public ProcesoCandidatoId: any;
  public auxestatus = true;
  public desapartar = true;
  public loading: boolean;
  public dlgLiberar = false;
  public selected: boolean;
  public candidatos: boolean;
  public rowAux = [];


  // Varaibles del paginador
  public page = 1;
  public itemsPerPage = 20;
  public maxSize = 5;
  public numPages = 1;
  public length = 0;

  public showFilterRow: boolean;
  public dataSource: Array<any> = [];
  public errorMessage: any;
  public registros: number;
  public Liberar: boolean;

  public rows: Array<any> = [];
  public columns: Array<any> = [
    { title: 'Nombre Candidato', className: 'text-info text-center', name: 'nombre', filtering: { filterString: '', placeholder: 'Nombre' } },
    { title: 'Fecha Nacimiento', className: 'text-info text-center', name: 'edad', filtering: { filterString: '', placeholder: 'aaaa-mm-dd' } },
    { title: 'CURP', className: 'text-success text-center', name: 'curp', filtering: { filterString: '', placeholder: 'CURP' } },
    { title: 'RFC', className: 'text-success text-center', name: 'rfc', filtering: { filterString: '', placeholder: 'RFC' } },
    { title: 'NSS', className: 'text-success text-center', name: 'nss', filtering: { filterString: '', placeholder: 'NSS' } },
    { title: 'Estatus', className: 'text-info text-center', name: 'estatus', filtering: { filterString: '', placeholder: 'Estatus' } },
    { title: 'Reclutador', className: 'text-info text-center', name: 'reclutador', filtering: { filterString: '', placeholder: 'Reclutador' } }
  ];

  public config: any = {
    paging: true,
    filtering: { filterString: '' },
    className: ['table-hover  mb-0']
  }
  constructor(
    private dialog: MatDialog,
    private toasterService: ToasterService,
    private _ServiceComponente: ComponentsService,
    private settings: SettingsService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.RequisicionId && changes.RequisicionId.isFirstChange()) {
      this.UsuarioId = this.settings.user['id'];
      this.getCandidatos();
      this.candidatos = false;
      if (this.EstatusId === 34 || this.EstatusId === 35 || this.EstatusId === 36 || this.EstatusId === 37 || this.EstatusId === 39) {
        this.Liberar = false;
      } else {
        this.Liberar = true;
      }
    }
  }

  getCandidatos() {
    this._ServiceComponente.getRPTCandVacante(this.RequisicionId).subscribe(data => {
      this.dataSource = [];
      data.forEach (element => {
        const perfil = {
          id: element.id,
          nombre: element.contratados[0]['nombre'] + ' '
                  + element.contratados[0]['apellidoPaterno']
                  + ' ' + element.contratados[0]['apellidoMaterno'],
          curp: element.contratados[0]['curp'],
          rfc: element.contratados[0]['rfc'],
          nss: element.contratados[0]['nss'], edad: element.contratados[0]['edad'],
          estatus: element.estatus,
          candidatoId: element.candidatoId,
          estatusId: element.estatusId,
          reclutador: element.reclutador
        };
        this.dataSource.push(perfil);
        this.showFilterRow = true;
        this.onChangeTable(this.config);
      }, error => this.errorMessage = <any>error)
    });
  }

  public refresh() {
    this.getCandidatos();
    this.candidatos = false;
    setTimeout(() => {
      this.columns.forEach(element => {
        (<HTMLInputElement>document.getElementById(element.name + '_2')).value = '';
      });
    }, 1000);
  }

  public clearfilters() {
    this.columns.forEach(element => {
      element.filtering.filterString = '';
      (<HTMLInputElement>document.getElementById(element.name + '_2')).value = '';
    });
    this.candidatos = false;
    this.selected = false;
   this.getCandidatos();
  }

  openDialogLiberar() {
    this.objLiberar.push({
      RequisicionId: this.RequisicionId,
      CandidatoId: this.CandidatoId,
      ReclutadorId: this.UsuarioId,
      ProcesoCandidatoId: this.ProcesoCandidatoId,
    })
    this.dlgLiberar = true;
  }

  onClose(value: any) {
    if (value === 200) {
      this.getCandidatos();
      this.desapartar = true;
      this.auxestatus = false;
      this.popToast('warning', 'Liberado', 'El candidato se libero correctamente.');
      this.modal.hide();
      this.dlgLiberar = false;
    } else if (value === 404) {
      const msg = 'Error el intentar liberar el candidato. Consulte al departamento de soporte si el problema persiste.';
      this.desapartar = false;
      this.auxestatus = true;
      this.popToast('error', 'Apartado', msg);
      this.modal.hide();
      this.dlgLiberar = false;
    } else {
      this.modal.hide();
      this.dlgLiberar = false;
    }

  }

  public onCellClick(data: any): any {

    data.selected ? data.selected = false : data.selected = true;
    this.CandidatoId = data.candidatoId;
    this.ProcesoCandidatoId = data.id;
    if (!data.selected) {
      this.selected = false;
      this.candidatos = false;
    } else {
      this.selected = true;
      this.candidatos = true;
    }

    if (this.rowAux.length == 0) {
      this.rowAux = data;
    } else if (data.selected && this.rowAux !== []) {
      const aux = data;
      data = this.rowAux;
      data.selected = false;
      aux.selected = true;
      this.rowAux = aux;
    }
  }

  popToast(type: any, title: any, body: any) {
    var toast: Toast = {
      type: type,
      title: title,
      timeout: 4000,
      body: body
    }
    this.toasterService.pop(toast);
  }

  public changePage(page: any, data: Array<any> = this.dataSource): Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeFilter(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columns.forEach((column: any) => {
      if (column.filtering.filterString !== '') {
        filteredData = filteredData.filter((item: any) => {
          if (item[column.name] !== null) {
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

    this.rows = this.dataSource;
    const filteredData = this.changeFilter(this.dataSource, this.config);
    this.rows = page && config.paging ? this.changePage(page, filteredData) : filteredData;
    this.length = filteredData.length;
    this.registros = this.rows.length;
  }

}
