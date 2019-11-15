import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { RequisicionesService } from '../../../service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
import { MatDialog } from '@angular/material';
import { DlgRegistroMasivoComponent } from '../../../components/dlg-registro-masivo/dlg-registro-masivo.component';
import { PostulateService } from '../../../service/SeguimientoVacante/postulate.service';
import { ReclutamientoCampoService } from '../../../service/ReclutamientoCampo/reclutamiento-campo.service';
const swal = require('sweetalert');
@Component({
  selector: 'app-vacantes-reclutador',
  templateUrl: './vacantes-reclutador.component.html',
  styleUrls: ['./vacantes-reclutador.component.scss'],
  providers: [RequisicionesService]
})
export class VacantesReclutadorComponent implements OnInit {
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

  public disabled = false;
  public compact = false;
  public shown = 'shown';

  public page = 1;
  public itemsPerPage = 20;
  public maxSize = 5;
  public numPages = 1;
  public length = 0;
  reclutador = '';
  reclutadorId;
  dataSource = [];
  rows = [];
  public columns: Array<any> = [
    { title: 'Folio', className: 'text-info text-center', name: 'folio', filtering: { filterString: '', placeholder: 'Folio' } },
    { title: 'Perfil', className: 'text-info text-center', name: 'vBtra', filtering: { filterString: '', placeholder: 'Perfil' } },
    { title: 'Cliente', className: 'text-info text-center', name: 'cliente', filtering: { filterString: '', placeholder: 'Cliente' } },
    { title: 'Cubiertos/Vacantes', className: 'text-info text-center', name: 'vacantes',
      filtering: { filterString: '', placeholder: 'Cub/vac' } },
    { title: 'Fecha Limite', className: 'text-info text-center', name: 'fch_Cumplimiento',
      filtering: { filterString: '', placeholder: 'aaaa-mm-dd' } }
  ];
  public config: any = {
    paging: true,
    filtering: { filterString: '' },
    className: ['table-hover mb-0 ']
  };
  element: any = [];
  selected = false;
  rowAux = [];
  reporteCandidatos = false;
  totalPos: number;
  totalContratados: number;
  //  checkBox Seccion de impresion
  SelectiedSection = {
    Encabezado: true,
    Horarios: true,
    Cliente: true,
    ExpApt: false,
    Direccion: false,
    Beneficio: false,
    ActObsProd: false,
    Telefono: false,
    Contacto: false,
    DocPrest: false,
    Psicom: false,
    Competencia: false,
    arteRedes: true
  };
  constructor(private _Router: Router,
    private _Route: ActivatedRoute,
    private service: RequisicionesService,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private toasterService: ToasterService,
    private postulateservice: PostulateService,
    private _service: ReclutamientoCampoService
    ) {
    this._Route.queryParams.subscribe(params => {
      if (params['reclutador'] != null) {
        this.reclutador = params['reclutador'];
        this.reclutadorId = params['reclutadorId'];
      }
    });
  }

  ngOnInit() {
    this.spinner.show();
    this.getVacantes();
  }

  getVacantes() {
    this._service.GetRequisReclutadores(this.reclutadorId).subscribe(data => {
      if (data !== 404) {
        this.dataSource = data;
        this.totalPos = 0;
        this.totalContratados = 0;
        this.dataSource.forEach(r => {
          this.totalPos += r.vacantes;
          this.totalContratados += r.contratados;
        });
        this.spinner.hide();
        this.onChangeTable(this.config);
      }
    });
  }

  public changePage(page: any, data: Array<any> = this.dataSource): Array<any> {
    const start = (page.page - 1) * page.itemsPerPage;
    const end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
    this.rows = this.dataSource;
    let filteredData = this.changeFilter(this.rows, this.config);
    filteredData = page && config.paging ? this.changePage(page, filteredData) : filteredData;
    this.length = filteredData.length;
    this.rows = filteredData;
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

  Editar() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        'requisicionId': this.element['id'],
        'reclutador': this.reclutador,
        'reclutadorId': this.reclutadorId,
        'vBtra': this.element['vBtra'],
        'contratados': this.element.contratados,
        'vacantes': this.element.vacantes
      },
      skipLocationChange: true
    };
    this._Router.navigate(['/webcampo/rportCandidatos'], navigationExtras);
  }
  public onCellClick(data: any): any {
    data.selected ? data.selected = false : data.selected = true;
    this.element = data;
    if (!data.selected) {
      this.selected = false;
      this.element = [];
    } else {
      this.selected = true;
    }

    if (this.rowAux.length === 0) {
      this.rowAux = data;
    } else if (data.selected && this.rowAux !== []) {
      const aux = data;
      data = this.rowAux;
      data.selected = false;
      aux.selected = true;
      this.rowAux = aux;
    }
  }

  OpenDialogRegistrar(row){
    const dialogDlt = this.dialog.open(DlgRegistroMasivoComponent, {
    width: '95%',
    height: '95%',
    data: { requisicionId: row.id, folio: row.folio, cliente: row.cliente,
      vacante: row.vBtra, nv: row.vacantes, contratados: row.contratados, reclutador: this.reclutador, reclutadorId: this.reclutadorId },
    disableClose: true

  });

  dialogDlt.afterClosed().subscribe(result => {
    if (result === 417) {
      this.popToast('error', 'Registro Candidatos', 'Ocurrió un error al intentar registrar candidato');
    } else {
      row.contratados += result;
      this.popToast('success', 'Registro Masivo', 'El registro se realizó correctamente');
      this.onChangeTable(this.config);
    }
  });
  }

  public refreshTable() {
    this.spinner.show();
    this.getVacantes();

      this.columns.forEach(element => {
        element.filtering.filterString = '';
        (<HTMLInputElement>document.getElementById(element.name)).value = '';
      });

  }

  public clearfilters() {

    //  (<HTMLInputElement>document.getElementById('filterInput')).value = '';
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
    }
    this.toasterService.pop(toast);

  }




}
